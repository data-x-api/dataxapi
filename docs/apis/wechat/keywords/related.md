# WeChat Search suggestions API

Get the suggestions WeChat Search lists in its search box for a keyword, in the order it lists them, about 10 at a time. The words and their places only, with no index. About 9 items a call, 20 at most; $0.1 per call. Errors and timeouts are not charged.

- Endpoint: `GET https://api.dataxapi.com/v1/wechat/keywords/related`
- ID: `wechat.keywords.related`
- Also known as: wechat search suggestions, wechat autocomplete keywords, weixin search suggest, wechat related searches
- Price: $0.1 / call
- Live status is not on this page, which is a snapshot. Read it with `GET https://api.dataxapi.com/v1/catalog/status`
- Returns: up to 20 a page, everything in one answer, no paging
- Returns related keyword, a preview structure that may still change
- [Run it in the Playground](https://dataxapi.com/console/playground/?capability=wechat.keywords.related&params=%7B%22keyword%22%3A%22%E5%92%96%E5%95%A1%22%7D)
- In Chinese: [微信搜一搜推荐词 API](https://dataxapi.com/zh/apis/wechat/keywords/related/)

## What you get

The first 4 rows of a response recorded 2026-10-29 09:50 UTC for 露营地小程序.

| Field | Value |
| --- | --- |
| keyword | 露营地小程序 |
| related_to | 露营 |
| relation | suggestion |
| rank | 1 |

## Parameters

| Parameter | Type | required | Description |
| --- | --- | --- | --- |
| `keyword` | text | Yes | One keyword. Example: `咖啡`. |
| `view` | text |  | How much of each item to return. All three cost the same. Values: `compact`, `standard` (default), `full`. |
| `fields` | list of text |  | Return only these fields. Each by its path, such as `author.name`. |

## Returned fields

`data.items` is a list of related keyword objects. Preview: the structure may change, announced beforehand.

Three views: `compact` (the most used fields, long text cut short), `standard` (the default: every standard field) and `full` (adds `ext`, the platform's own fields). A field is in the view named and in every larger one.

| Field | Type | Description | From view | This endpoint |
| --- | --- | --- | --- | --- |
| `keyword` | text | The related keyword. | `compact` | Yes |
| `related_to` | text | The keyword it is related to: the one asked about. | `compact` | Yes |
| `relation` | text | How it is related: query (searched together with the keyword asked about), posts (appears together with it in content), prior (searched before it), after (searched after it), suggestion (what the platform suggests as the keyword is typed into its search box). Values: `query`, `posts`, `prior`, `after`, `suggestion`. | `compact` | Yes |
| `rank` | integer | Position by relevance among the keywords of the same relation, from 1. On this platform: Place among the suggestions the search box lists, from 1, the keyword asked about itself not counted. | `compact` | Yes |
| `relevance` | number | How closely it is related to the keyword asked about, 0 to 1. | `compact` | The platform has none |
| `search_index` | integer | Search index of the related keyword: the platform's index, not a count of searches; null where the platform gives no figure for the word. | `compact` | The platform has none |
| `composite_index` | integer | Composite index of the related keyword: the platform's index of how much attention content about it drew, not a count. | `compact` | The platform has none |
| `approximate` | list of object | Which numbers of this item are approximate or lower bounds; absent when all are exact. | `compact` | Yes |
| `approximate[].field` | text | Path of the field, such as metrics.views. | `compact` | Yes |
| `approximate[].kind` | text | Approximate, or a lower bound. Values: `approximate`, `lower_bound`. | `compact` | Yes |

A field with no value on an item is `null`. A field this endpoint cannot give is left out and listed in `meta.unavailable`.

Typical size of one item: `compact` 90 B, `standard` 90 B, `full` 90 B (measured on the response recorded 2026-10-29 09:50 UTC).

## Paging

About 9 items a page, 20 at most. The page size is the platform's; `limit` is not accepted.

Everything comes in one page; no cursor is issued.

## When you are charged

| Case | Charged |
| --- | --- |
| A result with data | $0.1, once per call |
| Invalid parameters, a failure or a timeout | not charged |
| The most one call can cost | $0.1 (send `X-Max-Price` to refuse anything above your own limit) |

Prices as read 2026-11-21 08:32 UTC, under price book 19, in effect since 2026-11-17 18:04 UTC; the Playground reads the price in force before a run.

## If the object does not exist

A keyword WeChat Search has no suggestions for returns an empty result, never a not-found error.

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
curl -G "https://api.dataxapi.com/v1/wechat/keywords/related" \
  --data-urlencode "keyword=咖啡" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
# pip install dataxapi
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.wechat.keywords.related(keyword="咖啡")
print(result["data"]["items"])
```

### TypeScript

```typescript
// npm i @dataxapi/sdk
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.wechat.keywords.related({ keyword: "咖啡" });
console.log(result.data.items);
```

### CLI

```bash
dataxapi call wechat.keywords.related 'keyword=咖啡'
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

Add this to your MCP client, then ask your agent to call `wechat.keywords.related`.

## Responses

### 200

From a response recorded 2026-10-29 09:50 UTC. Names, text and IDs are examples, and so are the links: none is the recorded one (the page shows no one's personal data); the figures are as recorded. Long lists are cut. The request ID, cursor and balance are made up.

Size as sent: 1.3 KB in the standard view (1.3 KB compact, 1.3 KB full).

```jsonc
{
  "code": "ok",
  "request_id": "b959d32d-16f5-4907-a8fe-3d74bb6c0b6c",
  "data": {
    "items": [
      {
        "keyword": "露营地小程序",
        "related_to": "露营",
        "relation": "suggestion",
        "rank": 1
      },
      // … 8 more
    ]
  },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 9
  },
  "warnings": [],
  "meta": {
    "capability": "wechat.keywords.related",
    "result_status": "complete",
    "fetched_at": "2026-10-29T09:50:02.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "relevance": "platform",
      "search_index": "platform",
      "composite_index": "platform"
    },
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

Size as sent: 483 B in the standard view (483 B compact, 483 B full).

```jsonc
{
  "code": "ok",
  "request_id": "63423bfc-2b8d-49b4-89a4-05265dcb346f",
  "data": { "items": [] },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 0
  },
  "warnings": [],
  "meta": {
    "capability": "wechat.keywords.related",
    "result_status": "empty",
    "fetched_at": "2026-10-29T09:50:02.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "relevance": "platform",
      "search_index": "platform",
      "composite_index": "platform"
    },
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
  "request_id": "c64c4df2-2697-4fbc-9ff7-c295241f5f30",
  "message": "A parameter is invalid",
  "message_zh": "参数不合法",
  "charged": false,
  "retry": "after_fix",
  "retry_after_seconds": null,
  "param": null,
  "problems": ["keyword is required"],
  "docs_url": "https://dataxapi.com/docs/errors#invalid_params"
}
```

### 402

An example written to the specification, not a recorded response.

```json
{
  "code": "insufficient_balance",
  "request_id": "468a0ab0-801c-41c6-ad6a-a31c0421b82b",
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
  "request_id": "e6172c3a-e952-48d1-a5d6-e885ecefd6e4",
  "message": "No result came back this time and nothing was charged; retry shortly",
  "message_zh": "这次没有取到结果，没有扣费，可以稍后重试",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

[This example as a JSON file](https://dataxapi.com/apis/wechat/keywords/related.example.json)

## Use it in your AI

`dataxapi setup` gives the agents on your machine (Claude Code, Codex, Cursor) the DataXAPI MCP server and the base skill. The key is read from DATAXAPI_API_KEY; none is written into a file.

MCP server: `https://api.dataxapi.com/mcp`. The entry for your client is under MCP in the request examples of this page; then ask your agent to call `wechat.keywords.related`.

Or paste this to any AI:

> Read https://dataxapi.com/apis/wechat/keywords/related.md and help me use the DataXAPI endpoint wechat.keywords.related (WeChat Search suggestions).

[Open in ChatGPT](https://chatgpt.com/?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fwechat%2Fkeywords%2Frelated.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20wechat.keywords.related%20%28WeChat%20Search%20suggestions%29.) · [Open in Claude](https://claude.ai/new?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fwechat%2Fkeywords%2Frelated.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20wechat.keywords.related%20%28WeChat%20Search%20suggestions%29.)

## Related

Part of DataXAPI's Social media data. The same key also works for: Creators, Ads, E-commerce.

More Social media data on other platforms: [Douyin trend-index related keywords](https://dataxapi.com/apis/douyin/index/keywords/related/), [Xiaohongshu PGY related keywords](https://dataxapi.com/apis/xiaohongshu/pgy/keywords/related/), [Douyin search suggestions](https://dataxapi.com/apis/douyin/keywords/related/), [Xiaohongshu search suggestions](https://dataxapi.com/apis/xiaohongshu/keywords/related/), [Douyin comment replies](https://dataxapi.com/apis/douyin/comments/replies/list/), [Douyin hashtag videos](https://dataxapi.com/apis/douyin/hashtags/videos/list/), [Bilibili comment replies](https://dataxapi.com/apis/bilibili/comments/replies/list/), [Bilibili hot searches](https://dataxapi.com/apis/bilibili/trends/list/), [Bilibili user profile](https://dataxapi.com/apis/bilibili/users/get/), [Bilibili user videos](https://dataxapi.com/apis/bilibili/users/videos/list/), [Bilibili video comments](https://dataxapi.com/apis/bilibili/videos/comments/list/), [Bilibili video detail](https://dataxapi.com/apis/bilibili/videos/get/), [Bilibili video search](https://dataxapi.com/apis/bilibili/videos/search/), [Bilibili popular videos](https://dataxapi.com/apis/bilibili/videos/trending/), [Douyin trend-index brand trends](https://dataxapi.com/apis/douyin/index/brands/history/), [Douyin trend-index brand comparison](https://dataxapi.com/apis/douyin/index/brands/metrics/), [Douyin trend-index creator top videos](https://dataxapi.com/apis/douyin/index/creators/videos/list/), [Douyin trend-index keyword audience](https://dataxapi.com/apis/douyin/index/keywords/audience/get/), [Douyin trend-index keyword trends](https://dataxapi.com/apis/douyin/index/keywords/history/), [Douyin trend-index live hot topics](https://dataxapi.com/apis/douyin/index/trends/list/), [Douyin trend-index keyword hot videos](https://dataxapi.com/apis/douyin/index/videos/search/), [Douyin hot search board](https://dataxapi.com/apis/douyin/trends/list/), [Douyin user profile](https://dataxapi.com/apis/douyin/users/get/), [Douyin creator engagement and follower trends](https://dataxapi.com/apis/douyin/users/history/), [Douyin user search](https://dataxapi.com/apis/douyin/users/search/)

WeChat Search endpoints: [WeChat Search articles and videos](https://dataxapi.com/apis/wechat/posts/search/), [WeChat Search articles and videos (backup)](https://dataxapi.com/apis/wechat/backup/posts/search/), [WeChat Official Account live search](https://dataxapi.com/apis/wechat/accounts/search/), [WeChat Index](https://dataxapi.com/apis/wechat/index/keywords/history/), [WeChat Search suggestions](https://dataxapi.com/apis/wechat/keywords/related/), [WeChat mini program search](https://dataxapi.com/apis/wechat/miniprograms/search/)

How-to guides and answers: [What WeChat data APIs are there? Official Accounts, Channels and WeChat Search (2026)](https://dataxapi.com/answers/wechat-data-apis/), [How do I check keyword trends in the WeChat Index, in bulk? (2026)](https://dataxapi.com/answers/wechat-index-keyword-trends/), [WeChat Search autocomplete suggestions API: getting them in bulk (2026)](https://dataxapi.com/answers/wechat-search-suggestions-api/), [Douyin and Xiaohongshu search box suggestions (autocomplete) by API, in bulk (2026)](https://dataxapi.com/answers/douyin-xiaohongshu-search-suggestions-api/)

Related: [All WeChat Search endpoints](https://dataxapi.com/apis/wechat/), [Social media data](https://dataxapi.com/categories/social/), [The related keyword object's fields](https://dataxapi.com/docs/objects/keyword_related/)

## Questions

### How much does the WeChat Search suggestions API cost?

$0.1 per call. The most one call can cost is $0.1.

### When am I not charged?

Errors and timeouts are not charged.

### How many items does one call return, and how do I get the next page?

About 9 items a page, 20 at most. The page size is the platform's; limit is not accepted. Everything comes in one page; no cursor is issued.

### What happens if the object does not exist?

A keyword WeChat Search has no suggestions for returns an empty result, never a not-found error.

---

Last checked 2026-11-21 08:32 UTC. Catalog revision 720fc3ea8dadb865. [HTML version](https://dataxapi.com/apis/wechat/keywords/related/)
