"""The transport: one request to the service and its answer.

The credential, the one envelope or the one error structure every address
answers with, and sending again what the service says may be sent again,
waiting as long as it says. What a request is for (a call, a page of a walk,
a fixed route) is the client's (_runtime.py); nothing here knows.

Standard library only: nothing to install besides the package itself.
"""

from __future__ import annotations

import http.client
import json
import os
import random
import time
import urllib.error
import urllib.parse
import urllib.request
from typing import Any, Dict, List, Mapping, Optional, TypedDict

DEFAULT_BASE_URL = "https://api.dataxapi.com"


# --- errors ----------------------------------------------------------------------------


class _FailedCallRequired(TypedDict):
    capability: str
    params: Dict[str, Any]
    # The options of this very call, the ones the client filled in included:
    # idempotency_key (the key it made), method ("GET" or "POST"), and where
    # the call had them max_price, run, source, end_user.
    options: Dict[str, Any]


class FailedCall(_FailedCallRequired, total=False):
    """What a call that failed is asked for again with.

    The same capability, the same parameters and the options it went under
    are the same call. On every error `call` raises, as `error.call`:

        try:
            page = client.call(capability, params, options=options)
        except (DataXAPIError, APIConnectionError) as error:
            if error.unsettled and error.call:
                # Whether it ran is not known. Under its key it is the same
                # call: the saved result if it settled, never a second charge.
                again = error.call
                page = client.call(again["capability"], again["params"], options=again["options"])

    The guarantee is about the key: the same key, sent again while the
    service keeps the call's result (24 hours), is never charged twice. A
    call sent again without it is another call, charged on its own. The key
    alone does not make a second sending safe in every case: a call that
    failed in a way that may be retried runs anew under its key. So
    `options` carries the rest of what the call went under as well, and is
    passed on as it is: the price cap, the run and the call's place in it,
    the labels, how it is sent.

    This client has no cancellation of its own: interrupting the process
    raises KeyboardInterrupt through it untouched, without a `call`. Give a
    call your own `idempotency_key` when it must be found again after that
    (`calls.by_key`).
    """

    # The request ID of the call, when the service said it could not tell
    # whether the call settled: `calls.get` says what became of it.
    request_id: str


class DataXAPIError(Exception):
    """The service answered with an error.

    One subclass per code is generated from the error table (NotFoundError,
    RateLimitedError, ...).
    """

    def __init__(self, status: int, body: Mapping[str, Any]) -> None:
        problems = body.get("problems") or []
        super().__init__(f"{body['code']}: {body.get('message', '')}" + (f" ({'; '.join(problems)})" if problems else ""))
        self.code: str = body["code"]
        self.status = status
        self.request_id: str = body["request_id"]
        # False: nothing was charged. None: not known (settlement_unknown);
        # look the call up by `request_id` before assuming either.
        self.charged: Optional[bool] = body.get("charged")
        self.retry: str = body["retry"]
        self.retry_after_seconds: Optional[int] = body.get("retry_after_seconds")
        self.param: Optional[str] = body.get("param")
        self.problems: List[str] = list(problems)
        self.reason: Optional[str] = body.get("reason")
        self.body = dict(body)
        # True: a sending of this request may have run without its outcome
        # being learnt: this answer says so, or an earlier try got no answer
        # or was told so, and this later answer need not be about that try.
        # For a call: ask again with `call`, under the same key.
        self.unsettled: bool = self.charged is None or self.code == "call_in_progress"
        self.call: Optional[FailedCall] = None


class APIConnectionError(Exception):
    """No answer of the service's own arrived.

    The connection failed, the request timed out, or something in between
    answered instead. Whether the request ran is not known. For a call,
    `call` is what to ask again with: under the same idempotency key it is
    the same call, not a second one.
    """

    unsettled = True

    def __init__(self, message: str, status: Optional[int] = None) -> None:
        super().__init__(message)
        self.status = status
        self.call: Optional[FailedCall] = None


def _is_error_body(body: Any) -> bool:
    return isinstance(body, dict) and isinstance(body.get("code"), str) and isinstance(body.get("request_id"), str) and isinstance(body.get("retry"), str)


class _NoRedirect(urllib.request.HTTPRedirectHandler):
    # The service never redirects; following one would carry the key elsewhere.
    def redirect_request(self, *args: Any, **kwargs: Any) -> None:
        return None


# --- the transport ---------------------------------------------------------------------


class Transport:
    def __init__(
        self,
        api_key: Optional[str],
        *,
        tables: Mapping[str, Any],
        base_url: Optional[str],
        timeout: float,
        max_retries: int,
        retry_delay: float,
        max_retry_wait: float,
    ) -> None:
        # The environment variables are the ones the generated half names.
        env = tables["env"]
        self._errors = tables["errors"]
        self._api_key = api_key if api_key is not None else os.environ.get(env["apiKey"])
        self._base_url = (base_url or os.environ.get(env["baseUrl"]) or DEFAULT_BASE_URL).rstrip("/")
        self._timeout = timeout
        self._max_retries = max_retries
        self._retry_delay = retry_delay
        self._max_retry_wait = max_retry_wait
        self._opener = urllib.request.build_opener(_NoRedirect)

    def send(
        self,
        method: str,
        path: str,
        *,
        query: Optional[Mapping[str, Any]] = None,
        body: Optional[Mapping[str, Any]] = None,
        headers: Optional[Mapping[str, str]] = None,
        safe: bool,
        text: bool = False,
        timeout: Optional[float] = None,
        max_retries: Optional[int] = None,
        call: Optional[FailedCall] = None,
    ) -> Any:
        """One request, sent again while the service says it may be.

        `safe`: sent again under what it already carries, it is the same
        request (a read that is free, or a call under an idempotency key).
        Only such a request is sent again when no answer arrived. `call`:
        the call this request is; an error raised for it carries it.
        """
        url = self._base_url + path
        pairs = [(name, ",".join(value) if isinstance(value, (list, tuple)) else str(value)) for name, value in (query or {}).items() if value is not None]
        if pairs:
            url += "?" + urllib.parse.urlencode(pairs)
        sent = dict(headers or {})
        if self._api_key is not None:
            sent["Authorization"] = f"Bearer {self._api_key}"
        data = None
        if body is not None:
            sent["Content-Type"] = "application/json"
            data = json.dumps(body).encode("utf-8")
        retries = self._max_retries if max_retries is None else max_retries
        # "once" is one more try in all, however many are left.
        tried_once = False
        # Set once a try may have run without its outcome being learnt, with
        # the request ID the service named if it named one. A later try's
        # refusal does not undo it: the error that ends the request says so.
        doubt: Optional[Dict[str, str]] = None
        attempt = 0
        while True:
            wait: Optional[float] = None
            failure: Any
            try:
                request = urllib.request.Request(url, data=data, headers=sent, method=method)
                try:
                    with self._opener.open(request, timeout=self._timeout if timeout is None else timeout) as response:
                        status, raw, answered = response.status, response.read(), response.headers
                except urllib.error.HTTPError as error:
                    status, raw, answered = error.code, error.read(), error.headers
                decoded = raw.decode("utf-8", errors="replace")
                ok = 200 <= status < 300
                if ok and text:
                    return decoded
                try:
                    parsed = json.loads(decoded)
                except ValueError:
                    parsed = None
                if ok and isinstance(parsed, dict) and parsed.get("code") == "ok":
                    return parsed
                if _is_error_body(parsed):
                    failure = self._errors.get(parsed["code"], DataXAPIError)(status, parsed)
                    # The service's own word on this answer, which can be
                    # stricter than the code's usual one.
                    retry = parsed["retry"]
                    again = retry == "yes" or (retry == "once" and not tried_once) or (retry == "same_key" and safe)
                    tried_once = tried_once or retry == "once"
                    if parsed.get("retry_after_seconds") is not None:
                        wait = float(parsed["retry_after_seconds"])
                else:
                    # Not the service's words: a gateway in between.
                    failure = APIConnectionError(f"HTTP {status} without a DataXAPI body", status)
                    again = safe and (status >= 500 or status == 429)
                    asked = answered.get("Retry-After") if answered is not None else None
                    if asked is not None and asked.isdigit() and int(asked) > 0:
                        wait = float(asked)
            except (OSError, http.client.HTTPException) as error:
                failure = APIConnectionError(f"no answer from {self._base_url}: {error}")
                failure.__cause__ = error
                again = safe
            if failure.unsettled:
                doubt = dict(doubt or {})
                if isinstance(failure, DataXAPIError) and failure.charged is None:
                    doubt["request_id"] = failure.request_id
            # Raised when it may not be sent again, when the tries are used
            # up, and when the service asks for a longer wait than the caller
            # allows.
            if not again or attempt >= retries or (wait is not None and wait > self._max_retry_wait):
                if isinstance(failure, DataXAPIError):
                    failure.unsettled = doubt is not None
                if call is not None:
                    failure.call = {**call, **(doubt or {})}  # type: ignore[typeddict-item]
                raise failure
            time.sleep(wait if wait is not None else min(8.0, self._retry_delay * 2**attempt) * (0.5 + random.random() / 2))
            attempt += 1

    def told(self, method: str, path: str, **more: Any) -> Any:
        """A fixed route: its data, out of the envelope's frame."""
        return self.send(method, path, safe=method == "GET", **more)["data"]
