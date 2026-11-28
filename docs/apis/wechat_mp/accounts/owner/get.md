# WeChat Official Account owner API

Get who a WeChat Official Account is registered to, by its original ID: the owner's name, type, registration number, country, verification status, kind and date, and the account's registration date and authorised third-party services. One object a call; $0.1 per call. Errors and timeouts are not charged.

- Endpoint: `GET https://api.dataxapi.com/v1/wechat_mp/accounts/owner/get`
- ID: `wechat_mp.accounts.owner.get`
- Also known as: wechat official account owner, company behind a wechat official account, wechat mp verified entity, who runs a wechat official account
- Price: $0.1 / call
- Live status is not on this page, which is a snapshot. Read it with `GET https://api.dataxapi.com/v1/catalog/status`
- Returns: 1 object, one account owner object
- Returns account owner, a preview structure that may still change
- [Run it in the Playground](https://dataxapi.com/console/playground/?capability=wechat_mp.accounts.owner.get&params=%7B%22id%22%3A%22gh_3707d9541c3f%22%7D)
- In Chinese: [微信公众号主体信息 API](https://dataxapi.com/zh/apis/wechat_mp/accounts/owner/get/)

## What you get

The first 4 rows of a response recorded 2026-10-29 09:49 UTC.

| Field | Value |
| --- | --- |
| type | company |
| verification | verified |
| verified_at | 2025-11-13 |
| account_created_at | 2017-12-18 |

## Parameters

| Parameter | Type | required | Description |
| --- | --- | --- | --- |
| `id` | text | Yes | The account's original ID, starting with gh_; not knowing it, search the name with wechat_mp.accounts.search and take id. Example: `gh_3707d9541c3f`. |
| `view` | text |  | How much of each item to return. All three cost the same. Values: `compact`, `standard` (default), `full`. |
| `fields` | list of text |  | Return only these fields. Each by its path, such as `author.name`. |

## Returned fields

`data.item` is one account owner object. Preview: the structure may change, announced beforehand.

Three views: `compact` (the most used fields, long text cut short), `standard` (the default: every standard field) and `full` (adds `ext`, the platform's own fields). A field is in the view named and in every larger one.

| Field | Type | Description | From view | This endpoint |
| --- | --- | --- | --- | --- |
| `name` | text | The owner's name: the full name of a company or body, or a person's name for a personal owner. | `compact` | Yes |
| `type` | text | What the owner is: company, government, media, individual, or other (another kind of organisation). Values: `company`, `government`, `media`, `individual`, `other`. | `compact` | Yes |
| `registration_id` | text | The number the owner is registered under (unified social credit code, business licence or organisation code); null where the platform gives none. | `compact` | Yes |
| `country` | text | The owner's country or region, in the platform's words. | `standard` | Yes |
| `verification` | text | The account's verification: verified (a personal verification included), unverified, or expired. Values: `verified`, `unverified`, `expired`. | `compact` | Yes |
| `verification_type` | text | The kind of verification, in the platform's words (such as 企业认证, company verification); null when not verified. | `standard` | Yes |
| `verified_at` | time | The date the verification was granted, written as midnight UTC of that date. | `standard` | Yes |
| `account_id` | text | ID of the account asked about: this is its owner. | `compact` | Yes |
| `account_created_at` | time | The date the account asked about was registered, written as midnight UTC of that date. | `standard` | Yes |
| `authorized_services` | list of text | Third-party services the account asked about has authorised, in the platform's words (company names). | `full` | Yes |
| `approximate` | list of object | Which numbers of this item are approximate or lower bounds; absent when all are exact. | `compact` | Yes |
| `approximate[].field` | text | Path of the field, such as metrics.views. | `compact` | Yes |
| `approximate[].kind` | text | Approximate, or a lower bound. Values: `approximate`, `lower_bound`. | `compact` | Yes |

A field with no value on an item is `null`. A field this endpoint cannot give is left out and listed in `meta.unavailable`.

Typical size of one item: `compact` 146 B, `standard` 289 B, `full` 529 B (measured on the response recorded 2026-10-29 09:49 UTC).

## Paging

One object per call: there is nothing to page.

## When you are charged

| Case | Charged |
| --- | --- |
| A result with data | $0.1, once per call |
| Invalid parameters, a failure or a timeout | not charged |
| The most one call can cost | $0.1 (send `X-Max-Price` to refuse anything above your own limit) |

Prices as read 2026-11-28 06:28 UTC, under price book 30, in effect since 2026-11-28 04:43 UTC; the Playground reads the price in force before a run.

## If the object does not exist

The answer is 404 `not_found`. `charged` and `amount` in the body say what this one cost. `reason` says which: `not_found` (it does not exist) or `private_or_deleted`.

## Errors

Every error has the same structure: `code`, `message`, `charged`, `retry`, `retry_after_seconds`, `param`, `docs_url`.

| HTTP | Code | Meaning | Charged | Retry |
| --- | --- | --- | --- | --- |
| 400 | `invalid_params` | A parameter is invalid | As the answer's charged field says | After a fix |
| 400 | `request_not_served` | This combination of parameters cannot be served at present | No | After a fix |
| 400 | `max_price_exceeded` | The most this call could cost is above the limit you set | No | After a fix |
| 401 | `unauthorized` | No credential was sent, or it is invalid, disabled or expired | No | No |
| 402 | `insufficient_balance` | The balance is too low | No | After a fix |
| 402 | `key_budget_exceeded` | This key's spending limit does not cover the call | No | After a fix |
| 402 | `run_budget_exceeded` | This run's amount or call limit does not cover the call | No | No |
| 403 | `account_suspended` | The account is suspended | No | No |
| 403 | `forbidden` | This credential may not use that option | No | No |
| 403 | `key_scope_denied` | This key may not call this endpoint | No | No |
| 404 | `not_found` | The object does not exist, is private or was deleted | As the answer's charged field says | No |
| 404 | `run_not_found` | No run under this run ID | No | No |
| 409 | `call_in_progress` | The call under this idempotency key is still running; ask again with the same key shortly | No | With the same idempotency key |
| 409 | `idempotency_conflict` | This idempotency key was used for a different request | No | After a fix |
| 410 | `run_expired` | This run has expired and starts no more calls | No | No |
| 429 | `rate_limited` | Too many requests, or too many calls in progress | No | Yes |
| 429 | `cost_cap_exceeded` | This account's allowance for today is used up | No | Yes |
| 429 | `uncharged_cost_limit` | Too many of this account's calls today returned nothing and were not charged; endpoints of this kind can be called again tomorrow (UTC) | No | Yes |
| 500 | `settlement_unknown` | Whether this call settled is not known; ask again with the same idempotency key, or look it up by request ID | Unknown: look the call up | With the same idempotency key |
| 500 | `internal_error` | The service failed | No | Yes |
| 502 | `upstream_failed` | No result came back this time and nothing was charged; retry shortly | No | Yes |
| 503 | `upstream_busy` | Busy just now; retry shortly | No | Yes |
| 503 | `capability_paused` | This endpoint is paused | No | Yes |
| 503 | `overloaded` | The service is busy; retry shortly | No | Yes |
| 504 | `timeout` | The data did not arrive in time; retry with the same idempotency key | No | Yes |

[All error codes](https://dataxapi.com/docs/errors/)

## Request

The key is read from the environment; no key is ever written into a page.

### cURL

```bash
curl -G "https://api.dataxapi.com/v1/wechat_mp/accounts/owner/get" \
  --data-urlencode "id=gh_3707d9541c3f" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
# pip install dataxapi
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.wechat_mp.accounts.owner.get(id="gh_3707d9541c3f")
print(result["data"]["item"])
```

### TypeScript

```typescript
// npm i @dataxapi/sdk
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.wechat_mp.accounts.owner.get({ id: "gh_3707d9541c3f" });
console.log(result.data.item);
```

### CLI

```bash
dataxapi call wechat_mp.accounts.owner.get id=gh_3707d9541c3f
```

### MCP

```json
{
  "mcpServers": {
    "dataxapi": {
      "type": "http",
      "url": "https://api.dataxapi.com/mcp",
      "headers": {
        "Authorization": "Bearer ${DATAXAPI_API_KEY}"
      }
    }
  }
}
```

Add this to your MCP client, then ask your agent to call `wechat_mp.accounts.owner.get`.

## Responses

### 200

From a response recorded 2026-10-29 09:49 UTC. Names, text and IDs are examples, and so are the links: none is the recorded one (the page shows no one's personal data); the figures are as recorded. Long lists are cut. The request ID, cursor and balance are made up.

Size as sent: 615 B in the standard view (472 B compact, 855 B full).

```jsonc
{
  "code": "ok",
  "request_id": "846a6dc4-e6a2-4a09-80d3-0c5e77f965f9",
  "data": {
    "item": {
      "name": "阿杰爱折腾",
      "type": "company",
      "registration_id": null,
      "country": "周末的周末露营日常，随手记录一下",
      "verification": "verified",
      "verification_type": "把周末露营从头到尾讲清楚，看完少走弯路",
      "verified_at": "2025-11-13T00:00:00.000Z",
      "account_id": "gh_9ceb787f0519",
      "account_created_at": "2017-12-18T00:00:00.000Z"
    }
  },
  "warnings": [],
  "meta": {
    "capability": "wechat_mp.accounts.owner.get",
    "result_status": "complete",
    "fetched_at": "2026-10-29T09:49:21.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {},
    "billing": {
      "amount": "0.1",
      "currency": "USD",
      "balance_after": "9.9"
    }
  }
}
```

### 400

An example written to the specification, not a recorded response.

```json
{
  "code": "invalid_params",
  "request_id": "e618e669-db60-4bf8-a896-c416cba358c6",
  "message": "A parameter is invalid",
  "message_zh": "参数不合法",
  "charged": false,
  "retry": "after_fix",
  "retry_after_seconds": null,
  "param": null,
  "problems": ["id is required"],
  "docs_url": "https://dataxapi.com/docs/errors#invalid_params"
}
```

### 402

An example written to the specification, not a recorded response.

```json
{
  "code": "insufficient_balance",
  "request_id": "8051b141-d90e-48d0-a498-716ac8ddf8b1",
  "message": "The balance is too low",
  "message_zh": "余额不足",
  "charged": false,
  "retry": "after_fix",
  "retry_after_seconds": null,
  "param": null,
  "required": "0.1",
  "available": "0",
  "top_up_url": "https://dataxapi.com/console/billing/?amount=10",
  "next_step": "The balance does not cover this call ($0.1). Top up at top_up_url: $10 at least, about 100 calls at this price; Alipay or a card, and the balance never expires. Then send the same request again, unchanged. Nothing was charged for this one.",
  "next_step_zh": "余额不够这次调用（$0.1）。到 top_up_url 充值：最低 $10，按这次的价格约够 100 次；支付宝、银行卡都能付，余额不过期。到账后把同一个请求原样再发一次。这次没有扣钱。",
  "docs_url": "https://dataxapi.com/docs/errors#insufficient_balance"
}
```

### 404

An example written to the specification, not a recorded response.

```json
{
  "code": "not_found",
  "request_id": "6426922b-96f1-4538-984f-639bc4f5200d",
  "message": "The object does not exist, is private or was deleted",
  "message_zh": "对象不存在、私密或已删除",
  "charged": true,
  "amount": "0.1",
  "retry": "no",
  "retry_after_seconds": null,
  "param": null,
  "reason": "not_found",
  "docs_url": "https://dataxapi.com/docs/errors#not_found"
}
```

### 502

An example written to the specification, not a recorded response.

```json
{
  "code": "upstream_failed",
  "request_id": "c468ca80-5554-4841-9e65-1220bb2d0549",
  "message": "No result came back this time and nothing was charged; retry shortly",
  "message_zh": "这次没有取到结果，没有扣费，可以稍后重试",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

This recorded response is 262 tokens as the platform's own JSON, 186 as DataXAPI's JSON, and 85 as an AI reads it through DataXAPI's MCP server: 68% fewer (counted 2026-11-06).

[This example as a JSON file](https://dataxapi.com/apis/wechat_mp/accounts/owner/get.example.json)

## Use it in your AI

`dataxapi setup` gives the agents on your machine (Claude Code, Codex, Cursor) the DataXAPI MCP server and the base skill. The key is read from DATAXAPI_API_KEY; none is written into a file.

MCP server: `https://api.dataxapi.com/mcp`. The entry for your client is under MCP in the request examples of this page; then ask your agent to call `wechat_mp.accounts.owner.get`.

Or paste this to any AI:

> Read https://dataxapi.com/apis/wechat_mp/accounts/owner/get.md and help me use the DataXAPI endpoint wechat_mp.accounts.owner.get (WeChat Official Account owner).

[Open in ChatGPT](https://chatgpt.com/?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fwechat_mp%2Faccounts%2Fowner%2Fget.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20wechat_mp.accounts.owner.get%20%28WeChat%20Official%20Account%20owner%29.) · [Open in Claude](https://claude.ai/new?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fwechat_mp%2Faccounts%2Fowner%2Fget.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20wechat_mp.accounts.owner.get%20%28WeChat%20Official%20Account%20owner%29.)

## Related

Part of DataXAPI's Social media data. The same key also works for: Creators, Ads, E-commerce.

More Social media data on other platforms: [Douyin comment replies](https://dataxapi.com/apis/douyin/comments/replies/list/), [Douyin hashtag videos](https://dataxapi.com/apis/douyin/hashtags/videos/list/), [Bilibili comment replies](https://dataxapi.com/apis/bilibili/comments/replies/list/), [Bilibili hot searches](https://dataxapi.com/apis/bilibili/trends/list/), [Bilibili user profile](https://dataxapi.com/apis/bilibili/users/get/), [Bilibili user videos](https://dataxapi.com/apis/bilibili/users/videos/list/), [Bilibili video comments](https://dataxapi.com/apis/bilibili/videos/comments/list/), [Bilibili video detail](https://dataxapi.com/apis/bilibili/videos/get/), [Bilibili video transcript (video to text)](https://dataxapi.com/apis/bilibili/videos/transcript/get/), [Bilibili video search](https://dataxapi.com/apis/bilibili/videos/search/), [Bilibili popular videos](https://dataxapi.com/apis/bilibili/videos/trending/), [Douyin trend-index brand trends](https://dataxapi.com/apis/douyin/index/brands/history/), [Douyin trend-index brand comparison](https://dataxapi.com/apis/douyin/index/brands/metrics/), [Douyin trend-index creator top videos](https://dataxapi.com/apis/douyin/index/creators/videos/list/), [Douyin trend-index keyword audience](https://dataxapi.com/apis/douyin/index/keywords/audience/get/), [Douyin trend-index keyword trends](https://dataxapi.com/apis/douyin/index/keywords/history/), [Douyin trend-index related keywords](https://dataxapi.com/apis/douyin/index/keywords/related/), [Douyin trend-index live hot topics](https://dataxapi.com/apis/douyin/index/trends/list/), [Douyin trend-index keyword hot videos](https://dataxapi.com/apis/douyin/index/videos/search/), [Douyin hot search board](https://dataxapi.com/apis/douyin/trends/list/), [Douyin user profile](https://dataxapi.com/apis/douyin/users/get/), [Douyin creator engagement and follower trends](https://dataxapi.com/apis/douyin/users/history/), [Douyin user search](https://dataxapi.com/apis/douyin/users/search/)

WeChat Official Accounts endpoints: [WeChat Official Account articles](https://dataxapi.com/apis/wechat_mp/accounts/articles/list/), [WeChat Official Account profile](https://dataxapi.com/apis/wechat_mp/accounts/get/), [WeChat Official Account article comments](https://dataxapi.com/apis/wechat_mp/articles/comments/list/), [WeChat Official Account article detail](https://dataxapi.com/apis/wechat_mp/articles/get/), [WeChat Official Account article stats](https://dataxapi.com/apis/wechat_mp/articles/metrics/), [WeChat Official Account comment replies](https://dataxapi.com/apis/wechat_mp/comments/replies/list/), [WeChat Official Account name search](https://dataxapi.com/apis/wechat_mp/accounts/search/), [WeChat Official Account owner](https://dataxapi.com/apis/wechat_mp/accounts/owner/get/)

How-to guides and answers: [What WeChat data APIs are there? Official Accounts, Channels and WeChat Search (2026)](https://dataxapi.com/answers/wechat-data-apis/), [Which APIs get WeChat Official Account data: past articles, full text, reads, comments? (2026)](https://dataxapi.com/answers/wechat-official-account-data-apis/), [Every figure on a WeChat Official Account article and profile: can an API get it? Field by field (2026)](https://dataxapi.com/answers/wechat-official-account-page-fields/), [Which company is behind a WeChat Official Account? Owner, verification and registration date (2026)](https://dataxapi.com/answers/wechat-official-account-owner/)

Related: [All WeChat Official Accounts endpoints](https://dataxapi.com/apis/wechat_mp/), [Social media data](https://dataxapi.com/categories/social/), [The account owner object's fields](https://dataxapi.com/docs/objects/account_owner/)

## Questions

### How much does the WeChat Official Account owner API cost?

$0.1 per call. The most one call can cost is $0.1.

### When am I not charged?

Errors and timeouts are not charged.

### What happens if the object does not exist?

The answer is 404 not_found. charged and amount in the body say what this one cost. reason says which: not_found (it does not exist) or private_or_deleted.

---

Last checked 2026-11-28 06:28 UTC. Catalog revision ceced48b38f71468. [HTML version](https://dataxapi.com/apis/wechat_mp/accounts/owner/get/)
