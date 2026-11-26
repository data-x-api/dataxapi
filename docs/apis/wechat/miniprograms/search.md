# WeChat mini program search API

Find WeChat mini programs for search terms through WeChat Search, the first page (about 25): name, description, icon, original ID and AppID, the owner's name and whether it is verified, how many used it lately as the platform shows it, and whether it is a mini game. About 25 items a call, 40 at most; $0.1 per call. Errors and timeouts are not charged.

- Endpoint: `GET https://api.dataxapi.com/v1/wechat/miniprograms/search`
- ID: `wechat.miniprograms.search`
- Also known as: search wechat mini programs, wechat mini program search, find a wechat mini program, weixin mini app search
- Price: $0.1 / call
- Live status is not on this page, which is a snapshot. Read it with `GET https://api.dataxapi.com/v1/catalog/status`
- Returns: up to 40 a page, everything in one answer, no paging
- Returns mini program, a preview structure that may still change
- [Run it in the Playground](https://dataxapi.com/console/playground/?capability=wechat.miniprograms.search&params=%7B%22query%22%3A%22%E5%A4%96%E5%8D%96%22%7D)
- In Chinese: [微信小程序搜索 API](https://dataxapi.com/zh/apis/wechat/miniprograms/search/)

## What you get

The first 2 rows of a response recorded 2026-10-29 09:50 UTC.

| Field | Value |
| --- | --- |
| owner_verified | true |
| is_game | false |

## Parameters

| Parameter | Type | required | Description |
| --- | --- | --- | --- |
| `query` | text | Yes | Search terms. Example: `外卖`. |
| `view` | text |  | How much of each item to return. All three cost the same. Values: `compact`, `standard` (default), `full`. |
| `fields` | list of text |  | Return only these fields. Each by its path, such as `author.name`. |

## Returned fields

`data.items` is a list of mini program objects. Preview: the structure may change, announced beforehand.

Three views: `compact` (the most used fields, long text cut short), `standard` (the default: every standard field) and `full` (adds `ext`, the platform's own fields). A field is in the view named and in every larger one.

| Field | Type | Description | From view | This endpoint |
| --- | --- | --- | --- | --- |
| `id` | text | Original ID (starting with gh_). | `compact` | Yes |
| `app_id` | text | AppID (starting with wx), used to open or link to the mini program; null where the platform gives none. | `compact` | Yes |
| `name` | text | Name. | `compact` | Yes |
| `description` | text | Description. Long text: the compact view keeps the first 500 characters and says so in `warnings`. | `compact` | Yes |
| `icon_url` | link | Icon. | `standard` | Yes |
| `owner_name` | text | The owner's name: the company or body that runs it. | `compact` | Yes |
| `owner_verified` | yes/no | Whether the owner is verified. | `standard` | Yes |
| `recent_users` | integer | How many people used it lately, as the platform shows it; one shown like 1万+ is a lower bound; null where it shows none. | `standard` | Yes |
| `is_game` | yes/no | Whether it is a mini game. | `standard` | Yes |
| `approximate` | list of object | Which numbers of this item are approximate or lower bounds; absent when all are exact. | `compact` | Yes |
| `approximate[].field` | text | Path of the field, such as metrics.views. | `compact` | Yes |
| `approximate[].kind` | text | Approximate, or a lower bound. Values: `approximate`, `lower_bound`. | `compact` | Yes |

A field with no value on an item is `null`. A field this endpoint cannot give is left out and listed in `meta.unavailable`.

Typical size of one item: `compact` 315 B, `standard` 537 B, `full` 537 B (measured on the response recorded 2026-10-29 09:50 UTC).

## Paging

About 25 items a page, 40 at most. The page size is the platform's; `limit` is not accepted.

Everything comes in one page; no cursor is issued.

## When you are charged

| Case | Charged |
| --- | --- |
| A result with data | $0.1, once per call |
| Invalid parameters, a failure or a timeout | not charged |
| The most one call can cost | $0.1 (send `X-Max-Price` to refuse anything above your own limit) |

Prices as read 2026-11-26 12:17 UTC, under price book 22, in effect since 2026-11-25 13:46 UTC; the Playground reads the price in force before a run.

## Errors

Every error has the same structure: `code`, `message`, `charged`, `retry`, `retry_after_seconds`, `param`, `docs_url`.

| HTTP | Code | Meaning | Charged | Retry |
| --- | --- | --- | --- | --- |
| 400 | `invalid_params` | A parameter is invalid | No | After a fix |
| 400 | `request_not_served` | This combination of parameters cannot be served at present | No | After a fix |
| 400 | `max_price_exceeded` | The most this call could cost is above the limit you set | No | After a fix |
| 401 | `unauthorized` | No credential was sent, or it is invalid, disabled or expired | No | No |
| 402 | `insufficient_balance` | The balance is too low | No | After a fix |
| 402 | `key_budget_exceeded` | This key's spending limit does not cover the call | No | After a fix |
| 402 | `run_budget_exceeded` | This run's amount or call limit does not cover the call | No | No |
| 403 | `account_suspended` | The account is suspended | No | No |
| 403 | `forbidden` | This credential may not use that option | No | No |
| 403 | `key_scope_denied` | This key may not call this endpoint | No | No |
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
curl -G "https://api.dataxapi.com/v1/wechat/miniprograms/search" \
  --data-urlencode "query=外卖" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
# pip install dataxapi
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.wechat.miniprograms.search(query="外卖")
print(result["data"]["items"])
```

### TypeScript

```typescript
// npm i @dataxapi/sdk
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.wechat.miniprograms.search({ query: "外卖" });
console.log(result.data.items);
```

### CLI

```bash
dataxapi call wechat.miniprograms.search 'query=外卖'
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

Add this to your MCP client, then ask your agent to call `wechat.miniprograms.search`.

## Responses

### 200

From a response recorded 2026-10-29 09:50 UTC. Names, text and IDs are examples, and so are the links: none is the recorded one (the page shows no one's personal data); the figures are as recorded. Long lists are cut. The request ID, cursor and balance are made up.

Size as sent: 13.5 KB in the standard view (8.1 KB compact, 13.5 KB full).

```jsonc
{
  "code": "ok",
  "request_id": "1a7bd927-c736-4d0a-8451-3dea14b1f821",
  "data": {
    "items": [
      {
        "id": "1922257064798686",
        "app_id": "1250200079450793",
        "name": "山野咖啡馆",
        "description": "把外卖从头到尾讲清楚，看完少走弯路",
        "icon_url": "https://www.dataxapi.com/examples/1922257064798686",
        "owner_name": "周末的外卖日常，随手记录一下",
        "owner_verified": true,
        "recent_users": null,
        "is_game": false
      },
      // … 24 more
    ]
  },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 25
  },
  "warnings": [],
  "meta": {
    "capability": "wechat.miniprograms.search",
    "result_status": "complete",
    "fetched_at": "2026-10-29T09:50:10.000Z",
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

### Empty

From a recording of 2026-10-29 09:50 UTC, edited by hand to show this case. The request ID and balance are made up.

Size as sent: 409 B in the standard view (409 B compact, 409 B full).

```jsonc
{
  "code": "ok",
  "request_id": "0f508ecc-eeed-4ddf-bfbe-b3bc83a1dc86",
  "data": { "items": [] },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 0
  },
  "warnings": [],
  "meta": {
    "capability": "wechat.miniprograms.search",
    "result_status": "empty",
    "fetched_at": "2026-10-29T09:50:10.000Z",
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
  "request_id": "006199e7-d8a5-402d-b25b-d800ccf72262",
  "message": "A parameter is invalid",
  "message_zh": "参数不合法",
  "charged": false,
  "retry": "after_fix",
  "retry_after_seconds": null,
  "param": null,
  "problems": ["query is required"],
  "docs_url": "https://dataxapi.com/docs/errors#invalid_params"
}
```

### 402

An example written to the specification, not a recorded response.

```json
{
  "code": "insufficient_balance",
  "request_id": "39a3e8a7-9710-4986-9127-4880453b6380",
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

### 502

An example written to the specification, not a recorded response.

```json
{
  "code": "upstream_failed",
  "request_id": "ca79b4ca-4ca1-4798-b99a-9ca39b881449",
  "message": "No result came back this time and nothing was charged; retry shortly",
  "message_zh": "这次没有取到结果，没有扣费，可以稍后重试",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

This recorded response is 15k tokens as the platform's own JSON, 5,100 as DataXAPI's JSON, and 2,427 as an AI reads it through DataXAPI's MCP server: 84% fewer (counted 2026-11-06).

[This example as a JSON file](https://dataxapi.com/apis/wechat/miniprograms/search.example.json)

## Use it in your AI

`dataxapi setup` gives the agents on your machine (Claude Code, Codex, Cursor) the DataXAPI MCP server and the base skill. The key is read from DATAXAPI_API_KEY; none is written into a file.

MCP server: `https://api.dataxapi.com/mcp`. The entry for your client is under MCP in the request examples of this page; then ask your agent to call `wechat.miniprograms.search`.

Or paste this to any AI:

> Read https://dataxapi.com/apis/wechat/miniprograms/search.md and help me use the DataXAPI endpoint wechat.miniprograms.search (WeChat mini program search).

[Open in ChatGPT](https://chatgpt.com/?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fwechat%2Fminiprograms%2Fsearch.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20wechat.miniprograms.search%20%28WeChat%20mini%20program%20search%29.) · [Open in Claude](https://claude.ai/new?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fwechat%2Fminiprograms%2Fsearch.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20wechat.miniprograms.search%20%28WeChat%20mini%20program%20search%29.)

## Related

Part of DataXAPI's Social media data. The same key also works for: Creators, Ads, E-commerce.

More Social media data on other platforms: [Douyin comment replies](https://dataxapi.com/apis/douyin/comments/replies/list/), [Douyin hashtag videos](https://dataxapi.com/apis/douyin/hashtags/videos/list/), [Bilibili comment replies](https://dataxapi.com/apis/bilibili/comments/replies/list/), [Bilibili hot searches](https://dataxapi.com/apis/bilibili/trends/list/), [Bilibili user profile](https://dataxapi.com/apis/bilibili/users/get/), [Bilibili user videos](https://dataxapi.com/apis/bilibili/users/videos/list/), [Bilibili video comments](https://dataxapi.com/apis/bilibili/videos/comments/list/), [Bilibili video detail](https://dataxapi.com/apis/bilibili/videos/get/), [Bilibili video transcript (video to text)](https://dataxapi.com/apis/bilibili/videos/transcript/get/), [Bilibili video search](https://dataxapi.com/apis/bilibili/videos/search/), [Bilibili popular videos](https://dataxapi.com/apis/bilibili/videos/trending/), [Douyin trend-index brand trends](https://dataxapi.com/apis/douyin/index/brands/history/), [Douyin trend-index brand comparison](https://dataxapi.com/apis/douyin/index/brands/metrics/), [Douyin trend-index creator top videos](https://dataxapi.com/apis/douyin/index/creators/videos/list/), [Douyin trend-index keyword audience](https://dataxapi.com/apis/douyin/index/keywords/audience/get/), [Douyin trend-index keyword trends](https://dataxapi.com/apis/douyin/index/keywords/history/), [Douyin trend-index related keywords](https://dataxapi.com/apis/douyin/index/keywords/related/), [Douyin trend-index live hot topics](https://dataxapi.com/apis/douyin/index/trends/list/), [Douyin trend-index keyword hot videos](https://dataxapi.com/apis/douyin/index/videos/search/), [Douyin hot search board](https://dataxapi.com/apis/douyin/trends/list/), [Douyin user profile](https://dataxapi.com/apis/douyin/users/get/), [Douyin creator engagement and follower trends](https://dataxapi.com/apis/douyin/users/history/), [Douyin user search](https://dataxapi.com/apis/douyin/users/search/), [Douyin user videos](https://dataxapi.com/apis/douyin/users/videos/list/), [Douyin video comments](https://dataxapi.com/apis/douyin/videos/comments/list/)

WeChat Search endpoints: [WeChat Search articles and videos](https://dataxapi.com/apis/wechat/posts/search/), [WeChat Search articles and videos (backup)](https://dataxapi.com/apis/wechat/backup/posts/search/), [WeChat Official Account live search](https://dataxapi.com/apis/wechat/accounts/search/), [WeChat Index](https://dataxapi.com/apis/wechat/index/keywords/history/), [WeChat Search suggestions](https://dataxapi.com/apis/wechat/keywords/related/), [WeChat mini program search](https://dataxapi.com/apis/wechat/miniprograms/search/)

How-to guides and answers: [What WeChat data APIs are there? Official Accounts, Channels and WeChat Search (2026)](https://dataxapi.com/answers/wechat-data-apis/)

Related: [All WeChat Search endpoints](https://dataxapi.com/apis/wechat/), [Social media data](https://dataxapi.com/categories/social/), [The mini program object's fields](https://dataxapi.com/docs/objects/miniprogram/)

## Questions

### How much does the WeChat mini program search API cost?

$0.1 per call. The most one call can cost is $0.1.

### When am I not charged?

Errors and timeouts are not charged.

### How many items does one call return, and how do I get the next page?

About 25 items a page, 40 at most. The page size is the platform's; limit is not accepted. Everything comes in one page; no cursor is issued.

---

Last checked 2026-11-26 12:17 UTC. Catalog revision 0051cce45e9530b9. [HTML version](https://dataxapi.com/apis/wechat/miniprograms/search/)
