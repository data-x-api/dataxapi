"""The hand-written half of the SDK: everything that is the same for every capability.

The other half (_generated.py) is made from the public catalog and only says
which capabilities there are, what they take and what they return.

Two modules. _transport.py sends one request: the credential, the envelope
or the error, the retries the service allows. This one says what the
requests are:
  - a call of a capability, under an idempotency key of its own: the same
    key sent again, while the service keeps the call's result (24 hours), is
    the same call and is never charged twice;
  - a walk over pages, one call per page, within limits the caller sets;
  - a call by role, and one role across several platforms;
  - the fixed routes: the catalog, a call's record, the account, runs.

Standard library only: nothing to install besides the package itself.
"""

from __future__ import annotations

import urllib.parse
import uuid
from decimal import Decimal
from typing import Any, Dict, Iterator, List, Mapping, Optional, Sequence, TypedDict, Union

from ._transport import APIConnectionError, DataXAPIError, FailedCall, Transport

# --- what comes back -------------------------------------------------------------------


class Page(TypedDict):
    # Pass as `cursor` for the next page; None when there is none.
    next_cursor: Optional[str]
    cursor_expires_at: Optional[str]
    has_more: bool
    returned: int


class Billing(TypedDict):
    # US dollars, as decimal strings.
    amount: str
    currency: str
    balance_after: Optional[str]


class Meta(TypedDict):
    capability: str
    result_status: str
    fetched_at: str
    # From a shared snapshot.
    cached: bool
    # The saved result of an earlier call: nothing was added to the bill.
    replayed: bool
    unavailable: Dict[str, str]
    billing: Billing


class _EnvelopeRequired(TypedDict):
    code: str
    request_id: str
    # {"item": ...} or {"items": [...], "missing": [...]}.
    data: Dict[str, Any]
    warnings: List[Dict[str, Any]]
    meta: Meta


class Envelope(_EnvelopeRequired, total=False):
    """What every capability answers with, exactly as the service sends it."""

    page: Page


class RunRef(TypedDict, total=False):
    id: str
    step: int
    iteration: int


class CallOptions(TypedDict, total=False):
    # Default: a new key per call. Give your own to make a call repeatable
    # across processes: the same key and the same request are the same call
    # for as long as the service keeps its result (24 hours). A call that
    # failed says which key it went under (`error.call`).
    idempotency_key: str
    # The most this call may be charged, in US dollars ("0.01"); a call that
    # could cost more is refused before anything runs.
    max_price: str
    # The run (runs.create) this call belongs to. With a step, the idempotency
    # key is made of the run, the step and the iteration, so the same step
    # sent again is the same call. A walk over pages counts the iteration on
    # from the one given, a page each; a loop over platforms adds the platform.
    run: RunRef
    source: str
    end_user: str
    # How the request is sent ("GET" or "POST"), for whoever knows it from a
    # newer catalog than this client was generated from. Left out: by this
    # client's own table of the parameters that make a POST.
    method: str
    # Seconds one attempt may take, and how many times it is sent again.
    timeout: float
    max_retries: int


class PlatformOutcome(TypedDict):
    platform: str
    # None: the platform has no capability of that role.
    capability: Optional[str]
    result: Optional[Envelope]
    error: Optional[Exception]


# --- errors ----------------------------------------------------------------------------


class UnknownRoleError(Exception):
    """A role no capability of that platform has."""


# The longest idempotency key the service takes.
_KEY_MAX = 255


class KeyTooLongError(Exception):
    """A key the client would have to make longer than the service takes.

    The caller's own key, with the page number or the platform added to tell
    the calls of one walk or one loop apart. Raised before anything is sent.
    """


def _fits(key: str, added: str) -> str:
    if len(key) > _KEY_MAX:
        raise KeyTooLongError(f"the idempotency key would be {len(key)} characters with {added} added to it ({key[:24]}...{key[-12:]}): the service takes {_KEY_MAX} at most, so give a shorter one")
    return key


# --- helpers ---------------------------------------------------------------------------


# Dollar amounts are decimal strings on the wire and whole micro-dollars here.
def _micros(amount: str) -> int:
    return int(Decimal(amount) * 1_000_000)


def _dollars(micros: int) -> str:
    text = format(Decimal(micros) / 1_000_000, "f")
    return text.rstrip("0").rstrip(".") if "." in text else text


def _given(params: Optional[Mapping[str, Any]], named: Mapping[str, Any]) -> Dict[str, Any]:
    return {name: value for name, value in {**(params or {}), **named}.items() if value is not None}


def _run_key(run: Optional[Mapping[str, Any]]) -> Optional[str]:
    """The key the run gives a step: the same step and iteration is the same call."""
    return f"run:{run['id']}:{run['step']}:{run.get('iteration', 0)}" if run and "step" in run else None


# --- the client ------------------------------------------------------------------------


class Client:
    def __init__(
        self,
        api_key: Optional[str] = None,
        *,
        tables: Mapping[str, Any],
        base_url: Optional[str] = None,
        timeout: float = 65.0,
        max_retries: int = 2,
        retry_delay: float = 0.5,
        max_retry_wait: float = 60.0,
        source: Optional[str] = None,
        end_user: Optional[str] = None,
        entry: str = "sdk",
    ) -> None:
        """
        api_key         an API key; default the environment variable the
                        generated half names. The catalog can be read
                        without one.
        timeout         seconds one attempt may take. The service gives up on
                        its own within 60.
        max_retries     how many times a request that may be retried is sent again.
        retry_delay     the first wait, in seconds, when the service names
                        none; doubles each time.
        max_retry_wait  a wait the service asks for that is longer than this
                        is not waited out: the error is raised, with
                        `retry_after_seconds` on it.
        source, end_user  labels recorded on every call for the usage figures.
        entry           "cli" when the command line is the one calling.
        """
        self._tables = tables
        # The catalog revision the generated half was made from.
        self.revision: str = tables["revision"]
        self._transport = Transport(api_key, tables=tables, base_url=base_url, timeout=timeout, max_retries=max_retries, retry_delay=retry_delay, max_retry_wait=max_retry_wait)
        self._source = source
        self._end_user = end_user
        self._entry = entry
        self.catalog = _Catalog(self)
        self.calls = _Calls(self)
        self.runs = _Runs(self)

    def _send(self, method: str, path: str, **more: Any) -> Any:
        return self._transport.send(method, path, **more)

    def _told(self, method: str, path: str, **more: Any) -> Any:
        return self._transport.told(method, path, **more)

    # --- capabilities ------------------------------------------------------------------

    def call(self, capability: str, params: Optional[Mapping[str, Any]] = None, /, *, options: Optional[CallOptions] = None, **named: Any) -> Envelope:
        """Calls a capability by its ID. One call is one page and is charged on its own.

        Parameters are given as a mapping, as keyword arguments, or both; one
        that is None is left out. An error it raises carries what the same
        call is asked again with (`error.call`, see FailedCall).
        """
        given = _given(params, named)
        options = options or {}
        run = options.get("run")
        # Reads are GET; a request with a list of IDs or terms is a POST.
        post = options["method"] == "POST" if "method" in options else any(name in self._tables["body_params"] for name in given)
        key = options.get("idempotency_key") or _run_key(run) or str(uuid.uuid4())
        # The call as it is sent, which is what an error that ends it carries.
        sent: Dict[str, Any] = {"idempotency_key": key, "method": "POST" if post else "GET"}
        if "max_price" in options:
            sent["max_price"] = options["max_price"]
        if run:
            sent["run"] = dict(run)
        headers = {"Idempotency-Key": key, "X-Entry": self._entry}
        if "max_price" in options:
            headers["X-Max-Price"] = options["max_price"]
        if run:
            headers["X-Run-Id"] = run["id"]
            if "step" in run:
                headers["X-Run-Step"] = str(run["step"])
            if "iteration" in run:
                headers["X-Run-Iteration"] = str(run["iteration"])
        source = options.get("source", self._source)
        end_user = options.get("end_user", self._end_user)
        if source is not None:
            headers["X-Source"] = sent["source"] = source
        if end_user is not None:
            headers["X-End-User"] = sent["end_user"] = end_user
        path = "/v1/" + "/".join(urllib.parse.quote(part, safe="") for part in capability.split("."))
        return self._send(
            sent["method"],
            path,
            body=given if post else None,
            query=None if post else given,
            headers=headers,
            safe=True,
            timeout=options.get("timeout"),
            max_retries=options.get("max_retries"),
            call={"capability": capability, "params": given, "options": sent},
        )

    def pages(
        self,
        capability: str,
        params: Optional[Mapping[str, Any]] = None,
        /,
        *,
        options: Optional[CallOptions] = None,
        max_pages: Optional[int] = None,
        max_items: Optional[int] = None,
        max_spend: Optional[str] = None,
        **named: Any,
    ) -> Iterator[Envelope]:
        """Walks the pages of a list: one call per page, each under its own
        idempotency key, until `page.has_more` is false or a limit is reached.

        A key of the caller's has the page's number added; as a step of a
        run each page is an iteration, counted on from the one given. Either
        way the same walk again is the same calls.

        Each page is charged on its own. `max_items=0` asks for nothing.
        `max_spend` is in US dollars over the whole walk: a page that could
        take the total past it is not fetched (the service refuses it before
        charging). A walk gone through again under the same key or run is
        the same walk: a page that comes back from its saved result counts
        for what it was charged the first time (read off its record), so the
        limit holds over every time. A walk that stopped at a limit ends on
        a page whose `page["has_more"]` is still true. An expired cursor is
        raised as the service says it (`cursor_expired`).
        """
        if max_items is not None and max_items <= 0:
            return
        given = _given(params, named)
        base: CallOptions = dict(options or {})  # type: ignore[assignment]
        own = base.get("idempotency_key")

        def key_of(index: int) -> Optional[str]:
            return None if own is None else _fits(f"{own}:{index}", "the page number")

        # The longest key the walk is known to come to, before its first page is sent.
        key_of(max(max_pages or 1, 1) - 1)
        run = base.get("run")
        stepped = run if run and "step" in run else None
        cursor = given.pop("cursor", None)
        spent = items = index = 0
        while max_pages is None or index < max_pages:
            page_options: CallOptions = dict(base)  # type: ignore[assignment]
            capped = False
            if max_spend is not None:
                # What is left of the budget is this page's price cap.
                left = _micros(max_spend) - spent
                if left <= 0:
                    return
                if "max_price" not in base or _micros(base["max_price"]) > left:
                    page_options["max_price"] = _dollars(left)
                    capped = True
            key = key_of(index)
            if key is not None:
                page_options["idempotency_key"] = key
            if stepped:
                page_options["run"] = {**stepped, "iteration": stepped.get("iteration", 0) + index}  # type: ignore[typeddict-item]
            try:
                page = self.call(capability, {**given, **({} if cursor is None else {"cursor": cursor})}, options=page_options)
            except DataXAPIError as error:
                if capped and error.code == "max_price_exceeded":
                    return
                raise
            yield page
            # A saved result adds nothing to the bill now; what the page was
            # charged the first time is on its record, and counts all the same.
            replayed = max_spend is not None and page["meta"]["replayed"]
            spent += _micros((self.calls.get(page["request_id"])["charged"] or "0") if replayed else page["meta"]["billing"]["amount"])
            paging = page.get("page")
            items += paging["returned"] if paging else 0
            if not paging or not paging["has_more"] or paging["next_cursor"] is None:
                return
            if max_items is not None and items >= max_items:
                return
            cursor = paging["next_cursor"]
            index += 1

    def items(
        self,
        capability: str,
        params: Optional[Mapping[str, Any]] = None,
        /,
        *,
        options: Optional[CallOptions] = None,
        max_pages: Optional[int] = None,
        max_items: Optional[int] = None,
        max_spend: Optional[str] = None,
        **named: Any,
    ) -> Iterator[Dict[str, Any]]:
        """The items of a list, page after page, no more than `max_items` of them."""
        count = 0
        for page in self.pages(capability, params, options=options, max_pages=max_pages, max_items=max_items, max_spend=max_spend, **named):
            for item in page["data"].get("items") or []:
                if max_items is not None and count >= max_items:
                    return
                count += 1
                yield item

    # --- by role -----------------------------------------------------------------------

    def capability_for(self, role: str, platform: str, type: Optional[str] = None) -> str:
        """The capability that plays a role on a platform.

        The role has the same name on every platform, so switching platform
        changes one argument. `type` tells apart two capabilities of one
        platform with the same role.
        """
        roles = self._tables["roles"]
        platforms = roles.get(role)
        if platforms is None:
            raise UnknownRoleError(f"no role {role}; the roles are {', '.join(roles)}")
        found = platforms.get(platform)
        if found is None:
            raise UnknownRoleError(f"{platform} has no {role}; it is on {', '.join(platforms)}")
        if isinstance(found, str):
            return found
        if type is None or type not in found:
            raise UnknownRoleError(f"{platform} has several {role}: say which type, one of {', '.join(found)}")
        return found[type]

    def call_by_role(
        self, role: str, platform: str, params: Optional[Mapping[str, Any]] = None, /, *, type: Optional[str] = None, options: Optional[CallOptions] = None, **named: Any
    ) -> Envelope:
        return self.call(self.capability_for(role, platform, type), params, options=options, **named)

    def across_platforms(
        self,
        role: str,
        platforms: Sequence[str],
        params: Optional[Mapping[str, Any]] = None,
        /,
        *,
        type: Optional[str] = None,
        options: Optional[CallOptions] = None,
        **named: Any,
    ) -> List[PlatformOutcome]:
        """One role on several platforms: a call per platform, one after another,
        each charged and keyed on its own.

        A key of the caller's, or the key a run gives the step, has the
        platform added. A platform that fails, or has no such capability,
        does not stop the others: every platform gets an outcome, with
        `result` or `error`.
        """
        base: CallOptions = dict(options or {})  # type: ignore[assignment]
        shared = base.get("idempotency_key") or _run_key(base.get("run"))
        keys = {platform: None if shared is None else _fits(f"{shared}:{platform}", "the platform") for platform in platforms}
        outcomes: List[PlatformOutcome] = []
        for platform in platforms:
            capability: Optional[str] = None
            try:
                capability = self.capability_for(role, platform, type)
                each: CallOptions = dict(base)  # type: ignore[assignment]
                if keys[platform] is not None:
                    each["idempotency_key"] = keys[platform]  # type: ignore[typeddict-item]
                outcomes.append({"platform": platform, "capability": capability, "result": self.call(capability, params, options=each, **named), "error": None})
            except (DataXAPIError, APIConnectionError, UnknownRoleError) as error:
                outcomes.append({"platform": platform, "capability": capability, "result": None, "error": error})
        return outcomes

    # --- the fixed routes: free, and but for the catalog with the credential -----------

    def account(self) -> Dict[str, Any]:
        """The balance, this key's budget and scopes, the rate limits."""
        return self._told("GET", "/v1/account")

    def usage(self, *, group_by: Union[str, Sequence[str], None] = None, **filters: Optional[str]) -> Dict[str, Any]:
        """The account's finished calls, counted and summed by what is asked for.

        Filters: since, until, capability, key_id, source, end_user.
        group_by: one or more of day, capability, key_id, entry, source, end_user.
        """
        return self._told("GET", "/v1/usage", query={**filters, "group_by": group_by})

    def usage_csv(self, *, group_by: Union[str, Sequence[str], None] = None, **filters: Optional[str]) -> str:
        """The same rows as a CSV file."""
        return self._send("GET", "/v1/usage", query={**filters, "group_by": group_by, "format": "csv"}, safe=True, text=True)


class _Catalog:
    def __init__(self, client: Client) -> None:
        self._client = client

    def get(self) -> Dict[str, Any]:
        """The whole catalog: capabilities, objects, parameters, errors, prices in force."""
        return self._client._told("GET", "/v1/catalog")

    def capabilities(self) -> Dict[str, Any]:
        return self._client._told("GET", "/v1/catalog/capabilities")

    def capability(self, capability: str) -> Dict[str, Any]:
        """One capability's whole contract, and whether it is up right now."""
        return self._client._told("GET", "/v1/catalog/capabilities/" + urllib.parse.quote(capability, safe=""))

    def status(self) -> Dict[str, Any]:
        return self._client._told("GET", "/v1/catalog/status")

    def search(self, query: Optional[str] = None, *, platform: Optional[str] = None, category: Optional[str] = None) -> Dict[str, Any]:
        """Which capability, from a need in words (Chinese or English), a platform
        by any of its names, or both: at most five, best first. A platform alone
        lists everything it has."""
        return self._client._told("GET", "/v1/catalog/search", query={"query": query, "platform": platform, "category": category})


class _Calls:
    def __init__(self, client: Client) -> None:
        self._client = client

    def get(self, request_id: str, *, timeout: Optional[float] = None, max_retries: Optional[int] = None) -> Dict[str, Any]:
        """What became of a call and what it was charged: the way to settle a
        `settlement_unknown`."""
        return self._client._told("GET", "/v1/calls/" + urllib.parse.quote(request_id, safe=""), timeout=timeout, max_retries=max_retries)

    def by_key(self, idempotency_key: str, *, timeout: Optional[float] = None, max_retries: Optional[int] = None) -> Dict[str, Any]:
        """What an idempotency key stands for right now. Asking starts nothing.

        `state` is one of: free (nothing answers for it: a request under it
        starts a new call), in_progress, settled (`charged` says for how
        much; the saved result is read with `calls.result(request_id)`),
        failed (ended without a charge, for good), retryable (ended without
        a charge in a way that may be retried: the same request under the
        key starts a new call), retry_refused (its last two calls both ended
        unclear: a third is refused).
        """
        return self._client._told("GET", "/v1/calls", query={"idempotency_key": idempotency_key}, timeout=timeout, max_retries=max_retries)

    def result(self, request_id: str, *, view: Optional[str] = None, fields: Optional[Sequence[str]] = None) -> Envelope:
        """The saved result of a call again, in any view, for 24 hours; not charged."""
        return self._client._send("GET", "/v1/calls/" + urllib.parse.quote(request_id, safe="") + "/result", query={"view": view, "fields": fields}, safe=True)


class _Runs:
    def __init__(self, client: Client) -> None:
        self._client = client

    def create(self, *, task_id: str, task_revision: str, max_amount: str, max_calls: int, ttl_seconds: Optional[int] = None, max_cost: Optional[str] = None) -> Dict[str, Any]:
        """Opens the budget of one run of a task.

        Calls that name it (`run` in the call options) are held to its amount
        and call limits by the service. `max_cost` is for internal accounts.
        """
        body = {"task_id": task_id, "task_revision": task_revision, "max_amount": max_amount, "max_calls": max_calls, "ttl_seconds": ttl_seconds, "max_cost": max_cost}
        return self._client._told("POST", "/v1/runs", body={name: value for name, value in body.items() if value is not None})

    def get(self, run_id: str) -> Dict[str, Any]:
        return self._client._told("GET", "/v1/runs/" + urllib.parse.quote(run_id, safe=""))

    def release(self, run_id: str) -> Dict[str, Any]:
        """Internal accounts only: gives back what the run reserved and did not use."""
        return self._client._told("POST", "/v1/runs/" + urllib.parse.quote(run_id, safe="") + "/release")
