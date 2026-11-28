# WeChat Index API

Get a keyword's WeChat Index over the last 30 days, one figure a day. The WeChat Index is WeChat's score of attention across its search, articles, Moments and more, not a count of searches, and is not comparable with Douyin's or Xiaohongshu's; days are calendar days in China time (UTC+8). Up to 1 items a call; $0.1 per call. Errors and timeouts are not charged.

- Endpoint: `GET https://api.dataxapi.com/v1/wechat/index/keywords/history`
- ID: `wechat.index.keywords.history`
- Also known as: wechat index, weixin index, wechat keyword index, wechat keyword popularity trend
- Price: $0.1 / call
- Live status is not on this page, which is a snapshot. Read it with `GET https://api.dataxapi.com/v1/catalog/status`
- Returns: 1 a page, everything in one answer, no paging
- Returns keyword index history, a preview structure that may still change
- [Run it in the Playground](https://dataxapi.com/console/playground/?capability=wechat.index.keywords.history&params=%7B%22keyword%22%3A%22%E5%92%96%E5%95%A1%22%7D)
- In Chinese: [微信指数 API](https://dataxapi.com/zh/apis/wechat/index/keywords/history/)

## What you get

The first 7 rows of a response recorded 2026-10-29 09:49 UTC for 露营.

| date | composite_index |
| --- | --- |
| 2026-09-29 | 38,626,358 |
| 2026-09-30 | 35,843,833 |
| 2026-10-01 | 38,536,619 |
| 2026-10-02 | 43,998,859 |
| 2026-10-03 | 51,530,144 |
| 2026-10-04 | 47,706,506 |
| 2026-10-05 | 52,354,075 |

## Parameters

| Parameter | Type | required | Description |
| --- | --- | --- | --- |
| `keyword` | text | Yes | One keyword. Example: `咖啡`. |
| `view` | text |  | How much of each item to return. All three cost the same. Values: `compact`, `standard` (default), `full`. |
| `fields` | list of text |  | Return only these fields. Each by its path, such as `author.name`. |

## Returned fields

`data.items` is a list of keyword index history objects. Preview: the structure may change, announced beforehand.

Three views: `compact` (the most used fields, long text cut short), `standard` (the default: every standard field) and `full` (adds `ext`, the platform's own fields). A field is in the view named and in every larger one.

| Field | Type | Description | From view | This endpoint |
| --- | --- | --- | --- | --- |
| `keyword` | text | The keyword. | `compact` | Yes |
| `points` | list of object | The figures day by day, one entry a day, oldest first. | `compact` | Yes |
| `points[].date` | time | The day: a calendar day in China time (UTC+8), written as midnight UTC of its date (8 a.m. that day in China); passed back as since or until it asks for that same day. | `compact` | Yes |
| `points[].search_index` | integer | Search index of the day: the platform's index of how much the keyword was searched, not a count of searches. | `compact` | The platform has none |
| `points[].composite_index` | integer | Composite index of the day: the platform's index of how much attention content about the keyword drew, not a count. On this platform: The day's WeChat Index. | `compact` | Yes |
| `points[].notes` | integer | Posts about the keyword that day. | `standard` | The platform has none |
| `points[].impressions` | integer | Times those posts were shown that day. | `standard` | The platform has none |
| `points[].views` | integer | Times those posts were read that day. | `standard` | The platform has none |
| `points[].engagements` | integer | Engagements with those posts that day. | `standard` | The platform has none |
| `approximate` | list of object | Which numbers of this item are approximate or lower bounds; absent when all are exact. | `compact` | Yes |
| `approximate[].field` | text | Path of the field, such as metrics.views. | `compact` | Yes |
| `approximate[].kind` | text | Approximate, or a lower bound. Values: `approximate`, `lower_bound`. | `compact` | Yes |

A field with no value on an item is `null`. A field this endpoint cannot give is left out and listed in `meta.unavailable`.

Typical size of one item: `compact` 1.9 KB, `standard` 1.9 KB, `full` 1.9 KB (measured on the response recorded 2026-10-29 09:49 UTC).

## Paging

1 items a page. The page size is the platform's; `limit` is not accepted.

Everything comes in one page; no cursor is issued.

## When you are charged

| Case | Charged |
| --- | --- |
| A result with data | $0.1, once per call |
| Invalid parameters, a failure or a timeout | not charged |
| The most one call can cost | $0.1 (send `X-Max-Price` to refuse anything above your own limit) |

Prices as read 2026-11-28 06:28 UTC, under price book 30, in effect since 2026-11-28 04:43 UTC; the Playground reads the price in force before a run.

## If the object does not exist

A keyword the WeChat Index does not cover returns an empty result, never a not-found error.

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
curl -G "https://api.dataxapi.com/v1/wechat/index/keywords/history" \
  --data-urlencode "keyword=咖啡" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
# pip install dataxapi
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.wechat.index.keywords.history(keyword="咖啡")
print(result["data"]["items"])
```

### TypeScript

```typescript
// npm i @dataxapi/sdk
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.wechat.index.keywords.history({ keyword: "咖啡" });
console.log(result.data.items);
```

### CLI

```bash
dataxapi call wechat.index.keywords.history 'keyword=咖啡'
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

Add this to your MCP client, then ask your agent to call `wechat.index.keywords.history`.

## Responses

### 200

From a response recorded 2026-10-29 09:49 UTC. Names, text and IDs are examples, and so are the links: none is the recorded one (the page shows no one's personal data); the figures are as recorded. Long lists are cut. The request ID, cursor and balance are made up.

Size as sent: 2.4 KB in the standard view (2.4 KB compact, 2.4 KB full).

```jsonc
{
  "code": "ok",
  "request_id": "678d6757-f6b6-4e9d-9159-8f112fd77386",
  "data": {
    "items": [
      {
        "keyword": "露营",
        "points": [
          {
            "date": "2026-09-29T00:00:00.000Z",
            "composite_index": 38626358
          },
          {
            "date": "2026-09-30T00:00:00.000Z",
            "composite_index": 35843833
          },
          {
            "date": "2026-10-01T00:00:00.000Z",
            "composite_index": 38536619
          },
          {
            "date": "2026-10-02T00:00:00.000Z",
            "composite_index": 43998859
          },
          {
            "date": "2026-10-03T00:00:00.000Z",
            "composite_index": 51530144
          },
          {
            "date": "2026-10-04T00:00:00.000Z",
            "composite_index": 47706506
          },
          {
            "date": "2026-10-05T00:00:00.000Z",
            "composite_index": 52354075
          },
          // … 23 more
        ]
      }
    ]
  },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 1
  },
  "warnings": [],
  "meta": {
    "capability": "wechat.index.keywords.history",
    "result_status": "complete",
    "fetched_at": "2026-10-29T09:49:49.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "points.search_index": "platform",
      "points.notes": "platform",
      "points.impressions": "platform",
      "points.views": "platform",
      "points.engagements": "platform"
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

From a recording of 2026-10-29 09:49 UTC, edited by hand to show this case. The request ID and balance are made up.

Size as sent: 560 B in the standard view (560 B compact, 560 B full).

```jsonc
{
  "code": "ok",
  "request_id": "75bac3e2-3fa9-447e-a0b8-96bd48ded2b4",
  "data": { "items": [] },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 0
  },
  "warnings": [],
  "meta": {
    "capability": "wechat.index.keywords.history",
    "result_status": "empty",
    "fetched_at": "2026-10-29T09:49:49.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "points.search_index": "platform",
      "points.notes": "platform",
      "points.impressions": "platform",
      "points.views": "platform",
      "points.engagements": "platform"
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
  "request_id": "334b2f98-2767-4fc9-a18c-47a1b54edc0b",
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
  "request_id": "b54558cd-7df5-484f-8f7f-77b3a06d89bc",
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
  "request_id": "0eea64b3-7f73-4fa4-8725-cccfe381c0c1",
  "message": "No result came back this time and nothing was charged; retry shortly",
  "message_zh": "这次没有取到结果，没有扣费，可以稍后重试",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

[This example as a JSON file](https://dataxapi.com/apis/wechat/index/keywords/history.example.json)

## Use it in your AI

`dataxapi setup` gives the agents on your machine (Claude Code, Codex, Cursor) the DataXAPI MCP server and the base skill. The key is read from DATAXAPI_API_KEY; none is written into a file.

MCP server: `https://api.dataxapi.com/mcp`. The entry for your client is under MCP in the request examples of this page; then ask your agent to call `wechat.index.keywords.history`.

Or paste this to any AI:

> Read https://dataxapi.com/apis/wechat/index/keywords/history.md and help me use the DataXAPI endpoint wechat.index.keywords.history (WeChat Index).

[Open in ChatGPT](https://chatgpt.com/?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fwechat%2Findex%2Fkeywords%2Fhistory.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20wechat.index.keywords.history%20%28WeChat%20Index%29.) · [Open in Claude](https://claude.ai/new?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fwechat%2Findex%2Fkeywords%2Fhistory.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20wechat.index.keywords.history%20%28WeChat%20Index%29.)

## Related

Part of DataXAPI's Social media data. The same key also works for: Creators, Ads, E-commerce.

More Social media data on other platforms: [Douyin trend-index keyword trends](https://dataxapi.com/apis/douyin/index/keywords/history/), [Xiaohongshu PGY keyword search index](https://dataxapi.com/apis/xiaohongshu/pgy/keywords/history/), [Douyin comment replies](https://dataxapi.com/apis/douyin/comments/replies/list/), [Douyin hashtag videos](https://dataxapi.com/apis/douyin/hashtags/videos/list/), [Bilibili comment replies](https://dataxapi.com/apis/bilibili/comments/replies/list/), [Bilibili hot searches](https://dataxapi.com/apis/bilibili/trends/list/), [Bilibili user profile](https://dataxapi.com/apis/bilibili/users/get/), [Bilibili user videos](https://dataxapi.com/apis/bilibili/users/videos/list/), [Bilibili video comments](https://dataxapi.com/apis/bilibili/videos/comments/list/), [Bilibili video detail](https://dataxapi.com/apis/bilibili/videos/get/), [Bilibili video transcript (video to text)](https://dataxapi.com/apis/bilibili/videos/transcript/get/), [Bilibili video search](https://dataxapi.com/apis/bilibili/videos/search/), [Bilibili popular videos](https://dataxapi.com/apis/bilibili/videos/trending/), [Douyin trend-index brand trends](https://dataxapi.com/apis/douyin/index/brands/history/), [Douyin trend-index brand comparison](https://dataxapi.com/apis/douyin/index/brands/metrics/), [Douyin trend-index creator top videos](https://dataxapi.com/apis/douyin/index/creators/videos/list/), [Douyin trend-index keyword audience](https://dataxapi.com/apis/douyin/index/keywords/audience/get/), [Douyin trend-index related keywords](https://dataxapi.com/apis/douyin/index/keywords/related/), [Douyin trend-index live hot topics](https://dataxapi.com/apis/douyin/index/trends/list/), [Douyin trend-index keyword hot videos](https://dataxapi.com/apis/douyin/index/videos/search/), [Douyin hot search board](https://dataxapi.com/apis/douyin/trends/list/), [Douyin user profile](https://dataxapi.com/apis/douyin/users/get/), [Douyin creator engagement and follower trends](https://dataxapi.com/apis/douyin/users/history/), [Douyin user search](https://dataxapi.com/apis/douyin/users/search/), [Douyin user videos](https://dataxapi.com/apis/douyin/users/videos/list/)

WeChat Search endpoints: [WeChat Search articles and videos](https://dataxapi.com/apis/wechat/posts/search/), [WeChat Search articles and videos (backup)](https://dataxapi.com/apis/wechat/backup/posts/search/), [WeChat Official Account live search](https://dataxapi.com/apis/wechat/accounts/search/), [WeChat Index](https://dataxapi.com/apis/wechat/index/keywords/history/), [WeChat Search suggestions](https://dataxapi.com/apis/wechat/keywords/related/), [WeChat mini program search](https://dataxapi.com/apis/wechat/miniprograms/search/)

How-to guides and answers: [What WeChat data APIs are there? Official Accounts, Channels and WeChat Search (2026)](https://dataxapi.com/answers/wechat-data-apis/), [How do I check keyword trends in the WeChat Index, in bulk? (2026)](https://dataxapi.com/answers/wechat-index-keyword-trends/), [Chinese social media marketing data tools: official tools and APIs (2026)](https://dataxapi.com/answers/chinese-social-media-marketing-data-tools/), [Chinese social media alternative data for investment research (2026)](https://dataxapi.com/answers/chinese-social-media-alternative-data/), [WeChat Search autocomplete suggestions API: getting them in bulk (2026)](https://dataxapi.com/answers/wechat-search-suggestions-api/)

Related: [All WeChat Search endpoints](https://dataxapi.com/apis/wechat/), [Social media data](https://dataxapi.com/categories/social/), [The keyword index history object's fields](https://dataxapi.com/docs/objects/keyword_history/)

## Questions

### How much does the WeChat Index API cost?

$0.1 per call. The most one call can cost is $0.1.

### When am I not charged?

Errors and timeouts are not charged.

### How many items does one call return, and how do I get the next page?

1 items a page. The page size is the platform's; limit is not accepted. Everything comes in one page; no cursor is issued.

### What happens if the object does not exist?

A keyword the WeChat Index does not cover returns an empty result, never a not-found error.

---

Last checked 2026-11-28 06:28 UTC. Catalog revision ceced48b38f71468. [HTML version](https://dataxapi.com/apis/wechat/index/keywords/history/)
