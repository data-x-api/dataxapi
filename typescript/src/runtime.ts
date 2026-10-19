// The hand-written half of the SDK: everything that is the same for every
// capability. The other half (generated.ts) is made from the public catalog
// and only says which capabilities there are, what they take and return.
//
// Two files (docs/access.md section 四). transport.ts sends one request:
// the credential, the envelope or the error, the retries the service allows.
// This one says what the requests are:
//   - a call of a capability, under an idempotency key of its own: the same
//     key sent again, while the service keeps the call's result (24 hours),
//     is the same call and is never charged twice;
//   - a walk over pages, one call per page, within limits the caller sets;
//   - a call by role, and one role across several platforms;
//   - the fixed routes: the catalog, a call's record, the account, runs.
//
// No dependency, and nothing of Node, so the same files run in a browser
// (the task runner does).
import { DataXAPIError, Transport, type ClientOptions, type FailedCall, type RequestOptions, type TransportTables } from "./transport.js";

export * from "./transport.js";

// --- what comes back -------------------------------------------------------------------

export type View = "compact" | "standard" | "full";

export interface Page {
  // Pass as `cursor` for the next page; null when there is none.
  next_cursor: string | null;
  cursor_expires_at: string | null;
  has_more: boolean;
  returned: number;
}

export type Warning =
  | { code: "items_dropped" | "items_not_requested"; count: number }
  | { code: "fields_unparsed" | "text_truncated"; item: number; fields: string[] };

export interface Missing {
  id: string;
  reason: "not_found" | "invalid";
}

export interface Meta {
  capability: string;
  result_status: "complete" | "partial" | "empty";
  fetched_at: string;
  // From a shared snapshot.
  cached: boolean;
  // The saved result of an earlier call: nothing was added to the bill.
  replayed: boolean;
  unavailable: { [field: string]: string };
  // Amounts are US dollars as decimal strings.
  billing: { amount: string; currency: "USD"; balance_after: string | null };
}

export interface ItemData<T = Record<string, unknown>> {
  item: T | null;
}
export interface ItemsData<T = Record<string, unknown>> {
  items: T[];
  // A batch only: what was asked for and is not among the items.
  missing?: Missing[];
}

// What every capability answers with, exactly as the service sends it.
export interface Envelope<Data = ItemData | ItemsData> {
  code: "ok";
  request_id: string;
  data: Data;
  page?: Page;
  warnings: Warning[];
  meta: Meta;
}

export interface CallReceipt {
  request_id: string;
  capability: string;
  status: "in_progress" | "settled" | "released";
  // null while in progress.
  charged: string | null;
  result_status: string | null;
  error_code: string | null;
  started_at: string;
  finished_at: string | null;
  result_expires_at: string | null;
  entry: string;
  run_id: string | null;
  source: string | null;
  end_user: string | null;
}

// What an idempotency key of the account stands for right now (`calls.byKey`).
//   free           nothing answers for it: a request under it starts a new call
//   in_progress    its call is still running
//   settled        its call settled: `charged` says for how much, and the saved
//                  result is read with `calls.result(request_id)`
//   failed         its call ended without a charge, for good: the same request
//                  under the key answers the same error and starts nothing
//   retryable      its call ended without a charge in a way that may be
//                  retried: the same request under the key starts a new call
//   retry_refused  its last two calls both ended unclear: a third is refused
// Everything but the key and the state is null while the state is free.
export interface KeyStanding {
  idempotency_key: string;
  state: "free" | "in_progress" | "settled" | "failed" | "retryable" | "retry_refused";
  request_id: string | null;
  capability: string | null;
  charged: string | null;
  result_status: string | null;
  error_code: string | null;
  result_expires_at: string | null;
}

export interface KeyBudget {
  limit: string | null;
  spent: string;
  remaining: string | null;
}
export interface AccountStanding {
  balance: string;
  currency: "USD";
  key: { id: string; prefix: string; name: string | null; purpose: string; scopes: string[] | null; expires_at: string | null; budget: { daily: KeyBudget; monthly: KeyBudget; total: KeyBudget } } | null;
  rate: { tier: string; per_minute: number; concurrent: number };
}

// What one kind of request costs. Amounts are dollars as decimal strings.
export interface Quote {
  per: "call" | "item";
  price: string;
  // Per item only: the least a call that is charged at all costs.
  minimum?: string;
  // The most one call can be charged.
  max_charge: string;
  // What a call that finds nothing is charged: "0" where it is free.
  charge_when_empty: string;
}
export interface Pricing extends Quote {
  // Parameter values priced on their own.
  variants?: (Quote & { param: string; value: string })[];
}
type Names = { zh: string; en: string };
// One match of the catalog's search. A capability carries what a call of it
// needs: what it must be given, its price, a request with its parameters filled in.
export interface CatalogMatch {
  type: string;
  id: string;
  url: string;
  name: Names;
  summary?: Names;
  path?: string;
  methods?: ("GET" | "POST")[];
  required?: string[];
  one_of?: string[];
  pricing?: Pricing | null;
  example?: { method: "GET" | "POST"; path: string; params: { [name: string]: string | number | string[] } };
}
export interface CatalogSearch {
  revision: string;
  prices: { version: string | null; effective_at: string | null; currency: "USD" };
  // Best first, five at most. Empty: the catalog has nothing that is this.
  matches: CatalogMatch[];
  // The platforms the request was read as being about.
  platforms: string[];
  // Words of the request that nothing in the catalog has.
  unknown: string[];
  // With no match on a platform that was named: everything that platform has.
  nearest: { id: string; name: Names; summary?: Names }[];
  namespaces: { [key: string]: Names };
  live: { as_of: string; status: { [id: string]: string } };
}

export interface UsageParams {
  since?: string;
  until?: string;
  capability?: string;
  key_id?: string;
  source?: string;
  end_user?: string;
  // One or more of day, capability, key_id, entry, source, end_user.
  group_by?: string | readonly string[];
}
export interface UsageReport {
  since: string;
  until: string | null;
  group_by: string[];
  rows: ({ [group: string]: string | number | null } & { calls: number; settled: number; charged: string })[];
  total: { calls: number; settled: number; charged: string };
}

export interface RunParams {
  task_id: string;
  task_revision: string;
  max_amount: string;
  max_calls: number;
  ttl_seconds?: number;
  // Internal accounts only: reserve the whole operation's upstream cost.
  max_cost?: string;
}
export interface RunBudget {
  run_id: string;
  task_id: string;
  task_revision: string;
  max_amount: string;
  settled: string;
  held: string;
  remaining_amount: string;
  max_calls: number;
  calls_used: number;
  remaining_calls: number;
  expires_at: string;
  expired: boolean;
}

// A role no capability of that platform has.
export class UnknownRoleError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UnknownRoleError";
  }
}

// --- options ---------------------------------------------------------------------------

export interface CallOptions extends RequestOptions {
  // Default: a new key per call. Give your own to make a call repeatable
  // across processes: the same key and the same request are the same call
  // for as long as the service keeps its result (24 hours). A call that
  // failed says which key it went under (`error.call`).
  idempotencyKey?: string;
  // The most this call may be charged, in US dollars ("0.01"); a call that
  // could cost more is refused before anything runs.
  maxPrice?: string;
  // The run (runs.create) this call belongs to. With a step, the idempotency
  // key is made of the run, the step and the iteration, so the same step sent
  // again is the same call. A walk over pages counts the iteration on from
  // the one given, a page each; a loop over platforms adds the platform.
  run?: { id: string; step?: number; iteration?: number };
  source?: string;
  endUser?: string;
  // How the request is sent, for whoever knows it from a newer catalog than
  // this client was generated from (the command line reads the service's).
  // Left out: by this client's own table of the parameters that make a POST.
  method?: "GET" | "POST";
}

// When walking pages stops although there are more. Each page is its own
// call, charged on its own; a walk that stopped at a limit ends on a page
// whose `page.has_more` is still true.
export interface PageLimits {
  maxPages?: number;
  // 0: nothing is asked for.
  maxItems?: number;
  // In US dollars, over the whole walk. A page that could take the total past
  // it is not fetched: the service refuses it before charging. A walk gone
  // through again under the same key or run is the same walk: a page that
  // comes back from its saved result counts for what it was charged the
  // first time (read off its record), so the limit holds over every time.
  maxSpend?: string;
}

// What the generated half hands over.
export interface Tables extends TransportTables {
  revision: string;
  // Parameters that make a request a POST with a JSON body.
  bodyParams: readonly string[];
  // role -> platform -> capability, or type -> capability.
  roles: { readonly [role: string]: { readonly [platform: string]: string | { readonly [type: string]: string } } };
}

export type CapabilityMap = { [id: string]: { params: object; data: object } };
type RoleMap = Tables["roles"];
type IdsOf<V> = V extends string ? V : V[keyof V];

export interface PlatformOutcome<Data = ItemData | ItemsData> {
  platform: string;
  // null: the platform has no capability of that role.
  capability: string | null;
  result?: Envelope<Data>;
  error?: Error;
}

// --- helpers ---------------------------------------------------------------------------

// Dollar amounts are decimal strings on the wire and whole micro-dollars here.
const toMicros = (amount: string): number => Math.round(Number(amount) * 1_000_000);
const fromMicros = (micros: number): string => (micros / 1_000_000).toFixed(6).replace(/\.?0+$/, "");

// The longest idempotency key the service takes.
const KEY_MAX = 255;

// A key the client would have to make longer than the service takes: the
// caller's own, with the page number or the platform added to tell the calls
// of one walk or one loop apart. Thrown before anything is sent.
export class KeyTooLongError extends Error {
  constructor(key: string, added: string) {
    super(`the idempotency key would be ${key.length} characters with ${added} added to it (${key.slice(0, 24)}...${key.slice(-12)}): the service takes ${KEY_MAX} at most, so give a shorter one`);
    this.name = "KeyTooLongError";
  }
}
const fits = (key: string, added: string): string => {
  if (key.length > KEY_MAX) throw new KeyTooLongError(key, added);
  return key;
};

// The key the run gives a step: the same step and iteration is the same call.
export const runKeyOf = (run: { id: string; step: number; iteration?: number }): string => `run:${run.id}:${run.step}:${run.iteration ?? 0}`;
const runKey = (run: CallOptions["run"]): string | undefined => (run?.step === undefined ? undefined : runKeyOf({ ...run, step: run.step }));

// --- the client ------------------------------------------------------------------------

export class Client<C extends CapabilityMap = CapabilityMap, R extends RoleMap = RoleMap> {
  // The catalog revision the generated half was made from.
  readonly revision: string;
  readonly #tables: Tables;
  readonly #transport: Transport;

  constructor(options: ClientOptions, tables: Tables) {
    this.#tables = tables;
    this.revision = tables.revision;
    this.#transport = new Transport(options, tables);
  }

  // --- capabilities ----------------------------------------------------------------------

  // Calls a capability by its ID. One call is one page and is charged on its
  // own. An error it throws, a cancellation by `options.signal` included,
  // carries what the same call is asked again with (`error.call`, see FailedCall).
  call<K extends keyof C & string>(id: K, params: C[K]["params"], options: CallOptions = {}): Promise<Envelope<C[K]["data"]>> {
    const given = Object.fromEntries(Object.entries(params as { [name: string]: unknown }).filter(([, value]) => value !== undefined));
    // Reads are GET; a request with a list of IDs or terms is a POST.
    const post = options.method === undefined ? Object.keys(given).some((name) => this.#tables.bodyParams.includes(name)) : options.method === "POST";
    const { run } = options;
    const { entry, source: fromClient, endUser: forClient } = this.#transport.options;
    const [source, endUser] = [options.source ?? fromClient, options.endUser ?? forClient];
    // The call as it is sent, which is what an error that ends it carries.
    const call: FailedCall = {
      capability: id,
      params: given,
      options: {
        idempotencyKey: options.idempotencyKey ?? runKey(run) ?? crypto.randomUUID(),
        method: post ? "POST" : "GET",
        ...(options.maxPrice === undefined ? {} : { maxPrice: options.maxPrice }),
        ...(run === undefined ? {} : { run: { ...run } }),
        ...(source === undefined ? {} : { source }),
        ...(endUser === undefined ? {} : { endUser }),
      },
    };
    return this.#transport.send({
      method: call.options.method,
      path: `/v1/${id.split(".").map(encodeURIComponent).join("/")}`,
      ...(post ? { body: given } : { query: given }),
      headers: {
        "idempotency-key": call.options.idempotencyKey,
        "x-entry": entry,
        ...(options.maxPrice === undefined ? {} : { "x-max-price": options.maxPrice }),
        ...(run === undefined ? {} : { "x-run-id": run.id }),
        ...(run?.step === undefined ? {} : { "x-run-step": String(run.step) }),
        ...(run?.iteration === undefined ? {} : { "x-run-iteration": String(run.iteration) }),
        ...(source === undefined ? {} : { "x-source": source }),
        ...(endUser === undefined ? {} : { "x-end-user": endUser }),
      },
      safe: true,
      options,
      call,
    });
  }

  // Walks the pages of a list: one call per page, each under its own
  // idempotency key, until `page.has_more` is false or a limit is reached.
  // A key of the caller's has the page's number added; as a step of a run
  // each page is an iteration, counted on from the one given. Either way the
  // same walk again is the same calls. An expired cursor is thrown as the
  // service says it (`cursor_expired`).
  async *pages<K extends keyof C & string>(id: K, params: C[K]["params"], options: CallOptions & PageLimits = {}): AsyncGenerator<Envelope<C[K]["data"]>, void, void> {
    const { maxPages, maxItems, maxSpend, ...call } = options;
    if (maxItems !== undefined && maxItems <= 0) return;
    const keyOf = (index: number): string | undefined => (call.idempotencyKey === undefined ? undefined : fits(`${call.idempotencyKey}:${index}`, "the page number"));
    // The longest key the walk is known to come to, before its first page is sent.
    keyOf(Math.max(maxPages ?? 1, 1) - 1);
    const stepped = call.run?.step === undefined ? undefined : call.run;
    let cursor = (params as { cursor?: string }).cursor;
    let [spent, items] = [0, 0];
    for (let index = 0; maxPages === undefined || index < maxPages; index += 1) {
      // What is left of the budget is this page's price cap: the service
      // refuses a page that could cost more, before charging anything.
      const left = maxSpend === undefined ? undefined : toMicros(maxSpend) - spent;
      if (left !== undefined && left <= 0) return;
      const capped = left !== undefined && (call.maxPrice === undefined || toMicros(call.maxPrice) > left);
      const key = keyOf(index);
      let page: Envelope<C[K]["data"]>;
      try {
        page = await this.call(id, { ...params, ...(cursor === undefined ? {} : { cursor }) }, {
          ...call,
          ...(capped ? { maxPrice: fromMicros(left) } : {}),
          ...(key === undefined ? {} : { idempotencyKey: key }),
          ...(stepped ? { run: { ...stepped, iteration: (stepped.iteration ?? 0) + index } } : {}),
        });
      } catch (error) {
        if (capped && error instanceof DataXAPIError && error.code === "max_price_exceeded") return;
        throw error;
      }
      yield page;
      // A saved result adds nothing to the bill now; what the page was
      // charged the first time is on its record, and counts all the same.
      spent += toMicros(maxSpend !== undefined && page.meta.replayed ? ((await this.calls.get(page.request_id)).charged ?? "0") : page.meta.billing.amount);
      items += page.page?.returned ?? 0;
      if (!page.page?.has_more || page.page.next_cursor === null) return;
      if (maxItems !== undefined && items >= maxItems) return;
      cursor = page.page.next_cursor;
    }
  }

  // The items of a list, page after page, no more than `maxItems` of them.
  async *items<K extends keyof C & string>(id: K, params: C[K]["params"], options: CallOptions & PageLimits = {}): AsyncGenerator<C[K]["data"] extends ItemsData<infer T> ? T : Record<string, unknown>, void, void> {
    let count = 0;
    for await (const page of this.pages(id, params, options)) {
      for (const item of (page.data as ItemsData).items ?? []) {
        if (options.maxItems !== undefined && count >= options.maxItems) return;
        count += 1;
        yield item as never;
      }
    }
  }

  // --- by role ---------------------------------------------------------------------------

  // The capability that plays a role on a platform: the same role name on
  // every platform, so switching platform changes one argument. `type` tells
  // apart two capabilities of one platform with the same role.
  capabilityFor<Role extends keyof R & string, Platform extends keyof R[Role] & string>(role: Role, platform: Platform, type?: string): IdsOf<R[Role][Platform]> & keyof C & string;
  capabilityFor(role: string, platform: string, type?: string): string;
  capabilityFor(role: string, platform: string, type?: string): string {
    const platforms = this.#tables.roles[role];
    if (!platforms) throw new UnknownRoleError(`no role ${role}; the roles are ${Object.keys(this.#tables.roles).join(", ")}`);
    const found = platforms[platform];
    if (found === undefined) throw new UnknownRoleError(`${platform} has no ${role}; it is on ${Object.keys(platforms).join(", ")}`);
    if (typeof found === "string") return found;
    const id = type === undefined ? undefined : found[type];
    if (id === undefined) throw new UnknownRoleError(`${platform} has several ${role}: say which type, one of ${Object.keys(found).join(", ")}`);
    return id;
  }

  callByRole<Role extends keyof R & string, Platform extends keyof R[Role] & string>(
    role: Role,
    platform: Platform,
    params: C[IdsOf<R[Role][Platform]> & keyof C]["params"],
    options: CallOptions & { type?: string } = {},
  ): Promise<Envelope<C[IdsOf<R[Role][Platform]> & keyof C]["data"]>> {
    const { type, ...call } = options;
    return this.call(this.capabilityFor(role, platform, type), params, call);
  }

  // One role on several platforms: a call per platform, one after another,
  // each charged and keyed on its own: a key of the caller's, or the key a
  // run gives the step, has the platform added. A platform that fails, or
  // has no such capability, does not stop the others: every platform gets an
  // outcome.
  async acrossPlatforms<Role extends keyof R & string>(role: Role, platforms: readonly (keyof R[Role] & string)[], params: object, options: CallOptions & { type?: string } = {}): Promise<PlatformOutcome[]> {
    const { type, ...call } = options;
    const shared = call.idempotencyKey ?? runKey(call.run);
    const keys = new Map(platforms.map((platform) => [platform as string, shared === undefined ? undefined : fits(`${shared}:${platform}`, "the platform")]));
    const outcomes: PlatformOutcome[] = [];
    for (const platform of platforms) {
      let capability: string | null = null;
      try {
        capability = this.capabilityFor(role as string, platform, type);
        const key = keys.get(platform);
        const result = await this.call(capability as keyof C & string, params as never, { ...call, ...(key === undefined ? {} : { idempotencyKey: key }) });
        outcomes.push({ platform, capability, result: result as Envelope });
      } catch (error) {
        if (call.signal?.aborted) throw error;
        outcomes.push({ platform, capability, error: error instanceof Error ? error : new Error(String(error)) });
      }
    }
    return outcomes;
  }

  // --- the fixed routes: free, and but for the catalog with the credential ---------------

  readonly catalog = {
    // The whole catalog: capabilities, objects, parameters, errors, prices in force.
    get: (): Promise<{ revision: string; [name: string]: unknown }> => this.#transport.told("GET", "/v1/catalog"),
    capabilities: (): Promise<{ revision: string; capabilities: { id: string; [name: string]: unknown }[]; live: { as_of: string; status: { [id: string]: string } }; [name: string]: unknown }> =>
      this.#transport.told("GET", "/v1/catalog/capabilities"),
    // One capability's whole contract, and whether it is up right now.
    capability: (id: string): Promise<{ revision: string; capability: { id: string; [name: string]: unknown }; live: { as_of: string; status?: string }; [name: string]: unknown }> =>
      this.#transport.told("GET", `/v1/catalog/capabilities/${encodeURIComponent(id)}`),
    status: (): Promise<{ live: { as_of: string; status: { [id: string]: string } } }> => this.#transport.told("GET", "/v1/catalog/status"),
    // Which capability, from a need in words (Chinese or English), a platform
    // by any of its names, or both: at most five, best first. A platform alone
    // lists everything it has.
    search: (params: { query?: string; platform?: string; category?: string }): Promise<CatalogSearch> => this.#transport.told("GET", "/v1/catalog/search", { query: params }),
  };

  readonly calls = {
    // What became of a call and what it was charged: the way to settle a
    // `settlement_unknown`.
    get: (requestId: string, options: RequestOptions = {}): Promise<CallReceipt> => this.#transport.told("GET", `/v1/calls/${encodeURIComponent(requestId)}`, { options }),
    // What an idempotency key stands for right now: nothing, a call still
    // running, one that settled, one that failed. Asking starts nothing.
    byKey: (idempotencyKey: string, options: RequestOptions = {}): Promise<KeyStanding> => this.#transport.told("GET", "/v1/calls", { query: { idempotency_key: idempotencyKey }, options }),
    // The saved result of a call again, in any view, for 24 hours; not charged.
    result: <Data = ItemData | ItemsData>(requestId: string, params: { view?: View; fields?: readonly string[] } = {}, options: RequestOptions = {}): Promise<Envelope<Data>> =>
      this.#transport.send({ method: "GET", path: `/v1/calls/${encodeURIComponent(requestId)}/result`, query: params, safe: true, options }),
  };

  readonly runs = {
    // Opens the budget of one run of a task. Calls that name it (`run` in
    // the call options) are held to its amount and call limits by the service.
    create: (params: RunParams): Promise<{ run_id: string; expires_at: string }> => this.#transport.told("POST", "/v1/runs", { body: params }),
    get: (runId: string): Promise<RunBudget> => this.#transport.told("GET", `/v1/runs/${encodeURIComponent(runId)}`),
    // Internal accounts only: gives back what the run reserved and did not use.
    release: (runId: string): Promise<{ run_id: string; released: string }> => this.#transport.told("POST", `/v1/runs/${encodeURIComponent(runId)}/release`),
  };

  // The balance, this key's budget and scopes, the rate limits.
  account(): Promise<AccountStanding> {
    return this.#transport.told("GET", "/v1/account");
  }

  // The account's finished calls, counted and summed by what is asked for.
  usage(params: UsageParams = {}): Promise<UsageReport> {
    return this.#transport.told("GET", "/v1/usage", { query: { ...params } });
  }
  // The same rows as a CSV file.
  usageCsv(params: UsageParams = {}): Promise<string> {
    return this.#transport.send({ method: "GET", path: "/v1/usage", query: { ...params, format: "csv" }, safe: true, text: true });
  }
}
