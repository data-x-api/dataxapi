// The transport: one request to the service and its answer. The credential,
// the one envelope or the one error structure every address answers with,
// and sending again what the service says may be sent again, waiting as long
// as it says. What a request is for (a call, a page of a walk, a fixed
// route) is the client's (runtime.ts); nothing here knows.
//
// No dependency, and nothing of Node: built-in `fetch`, so the same file
// runs in a browser (the task runner does).

// --- errors ----------------------------------------------------------------------------

export type Retry = "no" | "yes" | "once" | "after_fix" | "same_key";

export interface ErrorBody {
  code: string;
  request_id: string;
  message: string;
  message_zh: string;
  charged: boolean | null;
  retry: Retry;
  retry_after_seconds: number | null;
  param: string | null;
  problems?: string[];
  reason?: string;
  required?: string;
  available?: string;
  docs_url: string;
}

// What a call that failed is asked for again with: the same capability, the
// same parameters and the options it went under are the same call. On every
// error `call` throws, the caller's own cancellation included, as `error.call`:
//
//   try {
//     page = await client.call(id, params, options);
//   } catch (error) {
//     if ((error instanceof DataXAPIError || error instanceof APIConnectionError) && error.unsettled && error.call) {
//       // Whether it ran is not known. Under its key it is the same call:
//       // the saved result if it settled, never a second charge.
//       page = await client.call(error.call.capability, error.call.params, error.call.options);
//     }
//   }
//
// The guarantee is about the key: the same key, sent again while the service
// keeps the call's result (24 hours), is never charged twice. A call sent
// again without it is another call, charged on its own. The key alone does
// not make a second sending safe in every case: a call that failed in a way
// that may be retried runs anew under its key. So `options` carries the rest
// of what the call went under as well, and is passed on as it is: the price
// cap, the run and the call's place in it, the labels, how it is sent.
export interface FailedCall {
  capability: string;
  params: { [name: string]: unknown };
  // The options of this very call, the ones the client filled in included:
  // the key it made, the labels it was created with, GET or POST.
  options: {
    idempotencyKey: string;
    method: "GET" | "POST";
    maxPrice?: string;
    run?: { id: string; step?: number; iteration?: number };
    source?: string;
    endUser?: string;
  };
  // The request ID of the call, when the service said it could not tell
  // whether the call settled: `calls.get` says what became of it.
  requestId?: string;
}

// The service answered with an error. One subclass per code is generated
// from the error table (`NotFoundError`, `RateLimitedError`, ...).
export class DataXAPIError extends Error {
  readonly code: string;
  readonly status: number;
  readonly requestId: string;
  // false: nothing was charged. null: not known (settlement_unknown); look
  // the call up by `requestId` before assuming either.
  readonly charged: boolean | null;
  readonly retry: Retry;
  readonly retryAfterSeconds: number | null;
  readonly param: string | null;
  readonly problems: string[];
  readonly reason: string | undefined;
  readonly body: ErrorBody;
  // true: a sending of this request may have run without its outcome being
  // learnt: this answer says so, or an earlier try got no answer or was told
  // so, and this later answer need not be about that try. For a call: ask
  // again with `call`, under the same key.
  unsettled: boolean;
  call?: FailedCall;

  constructor(status: number, body: ErrorBody) {
    super(`${body.code}: ${body.message}${body.problems?.length ? ` (${body.problems.join("; ")})` : ""}`);
    this.name = new.target.name;
    this.code = body.code;
    this.status = status;
    this.requestId = body.request_id;
    this.charged = body.charged;
    this.retry = body.retry;
    this.retryAfterSeconds = body.retry_after_seconds;
    this.param = body.param;
    this.problems = body.problems ?? [];
    this.reason = body.reason;
    this.body = body;
    this.unsettled = body.charged === null || body.code === "call_in_progress";
  }
}

// No answer of the service's own arrived: the connection failed, the request
// timed out, or something in between answered instead. Whether the request
// ran is not known. For a call, `call` is what to ask again with: under the
// same idempotency key it is the same call, not a second one.
export class APIConnectionError extends Error {
  readonly status: number | undefined;
  unsettled = true;
  call?: FailedCall;
  constructor(message: string, options: { cause?: unknown; status?: number } = {}) {
    super(message, options.cause === undefined ? undefined : { cause: options.cause });
    this.name = "APIConnectionError";
    this.status = options.status;
  }
}

// The caller's own signal ended the request. It ends like any other request
// that got no answer: `call` says which call it was, and `unsettled` whether
// a sending of it may have run (false only when nothing was sent, or every
// try that was sent was refused outright). `cause` is the signal's reason.
export class RequestAbortedError extends APIConnectionError {
  constructor(cause: unknown) {
    super("the request was cancelled by its signal", { cause });
    this.name = "RequestAbortedError";
  }
}

// --- options ---------------------------------------------------------------------------

export interface ClientOptions {
  // An API key (or, in the browser, a login token). Default: the environment
  // variable the generated half names. The catalog can be read without one.
  apiKey?: string;
  baseUrl?: string;
  // How long one attempt may take. The service gives up on its own within 60 s.
  timeoutMs?: number;
  // How many times a request that may be retried is sent again.
  maxRetries?: number;
  // The first wait between attempts when the service names none; doubles each time.
  retryDelayMs?: number;
  // A wait the service asks for that is longer than this is not waited out:
  // the error is thrown, with `retryAfterSeconds` on it.
  maxRetryWaitMs?: number;
  // Labels recorded on every call for the usage figures: where it comes from
  // (a skill, a task, a product) and which of your own users it is for.
  source?: string;
  endUser?: string;
  // The command line, built on this client, says so here.
  entry?: "sdk" | "cli";
  fetch?: typeof fetch;
}

// What one request may be told apart from the client's own settings.
export interface RequestOptions {
  timeoutMs?: number;
  maxRetries?: number;
  signal?: AbortSignal;
}

export interface Sent {
  method: "GET" | "POST";
  path: string;
  query?: { [name: string]: unknown };
  body?: unknown;
  headers?: { [name: string]: string };
  // Sent again under what it already carries, it is the same request: a read
  // that is free, or a call under an idempotency key. Only such a request is
  // sent again when no answer arrived.
  safe: boolean;
  // The answer is a file, not the envelope.
  text?: boolean;
  options?: RequestOptions;
  // The call this request is: an error thrown for it carries it.
  call?: FailedCall;
}

// What the generated half says of the environment and the error table.
export interface TransportTables {
  // The environment variables the key and the service's address are read from.
  env: { readonly apiKey: string; readonly baseUrl: string };
  errors: { readonly [code: string]: new (status: number, body: ErrorBody) => DataXAPIError };
}

const DEFAULT_BASE_URL = "https://api.dataxapi.com";

const sleep = (ms: number, signal: AbortSignal | undefined): Promise<void> =>
  new Promise((resolve, reject) => {
    if (signal?.aborted) return reject(signal.reason);
    const timer = setTimeout(() => {
      signal?.removeEventListener("abort", stop);
      resolve();
    }, ms);
    const stop = (): void => {
      clearTimeout(timer);
      reject(signal?.reason);
    };
    signal?.addEventListener("abort", stop, { once: true });
  });

const isErrorBody = (body: unknown): body is ErrorBody =>
  typeof body === "object" && body !== null && typeof (body as ErrorBody).code === "string" && typeof (body as ErrorBody).request_id === "string" && typeof (body as ErrorBody).retry === "string";

// --- the transport ---------------------------------------------------------------------

export class Transport {
  readonly options: Required<Pick<ClientOptions, "baseUrl" | "timeoutMs" | "maxRetries" | "retryDelayMs" | "maxRetryWaitMs" | "entry">> & Pick<ClientOptions, "apiKey" | "source" | "endUser">;
  readonly #errors: TransportTables["errors"];
  readonly #fetch: typeof fetch;

  constructor(options: ClientOptions, tables: TransportTables) {
    const env = (globalThis as { process?: { env?: { [name: string]: string | undefined } } }).process?.env;
    this.#errors = tables.errors;
    this.#fetch = options.fetch ?? ((input, init) => fetch(input, init));
    const apiKey = options.apiKey ?? env?.[tables.env.apiKey];
    this.options = {
      baseUrl: (options.baseUrl ?? env?.[tables.env.baseUrl] ?? DEFAULT_BASE_URL).replace(/\/+$/, ""),
      timeoutMs: options.timeoutMs ?? 65_000,
      maxRetries: options.maxRetries ?? 2,
      retryDelayMs: options.retryDelayMs ?? 500,
      maxRetryWaitMs: options.maxRetryWaitMs ?? 60_000,
      entry: options.entry ?? "sdk",
      ...(apiKey === undefined ? {} : { apiKey }),
      ...(options.source === undefined ? {} : { source: options.source }),
      ...(options.endUser === undefined ? {} : { endUser: options.endUser }),
    };
  }

  // One request, sent again while the service says it may be. Answers with
  // the parsed body of a success; throws DataXAPIError for an error the
  // service sent and APIConnectionError when no answer of its own arrived.
  async send<T>(sent: Sent): Promise<T> {
    const url = new URL(this.options.baseUrl + sent.path);
    for (const [name, value] of Object.entries(sent.query ?? {})) {
      if (value !== undefined) url.searchParams.set(name, Array.isArray(value) ? value.join(",") : String(value));
    }
    const headers: { [name: string]: string } = { ...sent.headers };
    if (this.options.apiKey !== undefined) headers.authorization = `Bearer ${this.options.apiKey}`;
    if (sent.body !== undefined) headers["content-type"] = "application/json";
    const signal = sent.options?.signal;
    const maxRetries = sent.options?.maxRetries ?? this.options.maxRetries;
    // "once" is one more try in all, however many are left.
    let triedOnce = false;
    // Set once a try may have run without its outcome being learnt, with the
    // request ID the service named if it named one. A later try's refusal
    // does not undo it: the error that ends the request says so.
    let doubt: { requestId?: string } | undefined;
    // THE way out for every error that ends the request, a cancellation too:
    // whether a sending may have run, and the call it was.
    const ended = <E extends DataXAPIError | APIConnectionError>(failure: E): E => {
      if (failure instanceof DataXAPIError || failure instanceof RequestAbortedError) failure.unsettled = doubt !== undefined;
      if (sent.call) failure.call = { ...sent.call, ...(doubt?.requestId === undefined ? {} : { requestId: doubt.requestId }) };
      return failure;
    };

    for (let attempt = 0; ; attempt += 1) {
      let failure: DataXAPIError | APIConnectionError;
      let again: boolean;
      let waitMs: number | undefined;
      // Cancelled before this try was sent.
      if (signal?.aborted) throw ended(new RequestAbortedError(signal.reason));
      try {
        const limit = AbortSignal.timeout(sent.options?.timeoutMs ?? this.options.timeoutMs);
        const response = await this.#fetch(url, {
          method: sent.method,
          headers,
          signal: signal ? AbortSignal.any([signal, limit]) : limit,
          // The service never redirects; following one would carry the key elsewhere.
          redirect: "manual",
          ...(sent.body === undefined ? {} : { body: JSON.stringify(sent.body) }),
        });
        const text = await response.text();
        if (response.ok && sent.text) return text as T;
        let body: unknown;
        try {
          body = JSON.parse(text);
        } catch {
          body = undefined;
        }
        if (response.ok && typeof body === "object" && body !== null && (body as { code?: unknown }).code === "ok") return body as T;
        if (isErrorBody(body)) {
          failure = new (this.#errors[body.code] ?? DataXAPIError)(response.status, body);
          // The service's own word on this answer, which can be stricter
          // than the code's usual one (an unclear answer the second time).
          again = body.retry === "yes" || (body.retry === "once" && !triedOnce) || (body.retry === "same_key" && sent.safe);
          triedOnce ||= body.retry === "once";
          if (body.retry_after_seconds !== null) waitMs = body.retry_after_seconds * 1000;
        } else {
          // Not the service's words: a gateway in between.
          failure = new APIConnectionError(`HTTP ${response.status} without a DataXAPI body`, { status: response.status });
          again = sent.safe && (response.status >= 500 || response.status === 429);
          const wait = Number(response.headers.get("retry-after"));
          if (Number.isFinite(wait) && wait > 0) waitMs = wait * 1000;
        }
      } catch (error) {
        // The caller's own cancellation is not a failure to retry. The try
        // was sent, and nothing says it did not run.
        if (signal?.aborted) {
          doubt = { ...doubt };
          throw ended(new RequestAbortedError(signal.reason));
        }
        failure = new APIConnectionError(`no answer from ${url.origin}: ${error instanceof Error ? error.message : String(error)}`, { cause: error });
        again = sent.safe;
      }
      if (failure.unsettled) doubt = { ...doubt, ...(failure instanceof DataXAPIError && failure.charged === null ? { requestId: failure.requestId } : {}) };
      // Thrown when it may not be sent again, when the tries are used up, and
      // when the service asks for a longer wait than the caller allows.
      if (!again || attempt >= maxRetries || (waitMs !== undefined && waitMs > this.options.maxRetryWaitMs)) throw ended(failure);
      // Cancelled in the wait: the same way out.
      await sleep(waitMs ?? Math.min(8_000, this.options.retryDelayMs * 2 ** attempt) * (0.5 + Math.random() / 2), signal).catch((reason: unknown) => {
        throw ended(new RequestAbortedError(reason));
      });
    }
  }

  // A fixed route: its data, out of the envelope's frame.
  async told<T>(method: "GET" | "POST", path: string, more: Partial<Sent> = {}): Promise<T> {
    return (await this.send<{ data: T }>({ method, path, safe: method === "GET", ...more })).data;
  }
}
