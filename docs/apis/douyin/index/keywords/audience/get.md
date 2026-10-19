# Douyin trend-index keyword audience API

Get who is behind a keyword on Douyin over a date range, from the platform's own keyword tool: the share and TGI of each age group, gender, province, city, city tier and interest. One object a call; $0.0020 per call. Errors, timeouts and objects that do not exist are not charged.

- Endpoint: `GET https://api.dataxapi.com/v1/douyin/index/keywords/audience/get`
- ID: `douyin.index.keywords.audience.get`
- Also known as: douyin keyword demographics, douyin keyword portrait, who searches a keyword on douyin
- Price: $0.0020 / call
- Live status is not on this page, which is a snapshot. Read it with `GET https://api.dataxapi.com/v1/catalog/status`
- Returns: 1 object, one keyword audience object
- Returns keyword audience, a preview structure that may still change
- [Run it in the Playground](https://dataxapi.com/console/playground/?capability=douyin.index.keywords.audience.get&params=%7B%22keyword%22%3A%22%E5%92%96%E5%95%A1%22%2C%22since%22%3A%222026-09-01T00%3A00%3A00Z%22%2C%22until%22%3A%222026-09-30T00%3A00%3A00Z%22%7D)
- In Chinese: [抖音巨量算数关键词人群画像 API](https://dataxapi.com/zh/apis/douyin/index/keywords/audience/get/)

## What you get

The first 8 rows of a response recorded 2026-10-12 21:50 UTC for 咖啡.

| Field | label | share | tgi |
| --- | --- | --- | --- |
| age | 18-23 | 19.7% | 174.17 |
| age | 24-30 | 22.3% | 173.72 |
| gender | 男 | 47.0% | 98.27 |
| gender | 女 | 53.0% | 101.59 |
| province | 北京 | 2.2% | 120.01 |
| province | 天津 | 1.2% | 105.43 |
| city | 上海 | 2.5% | 125.4 |
| city | 广州 | 2.4% | 117.79 |

## Parameters

| Parameter | Type | required | Description |
| --- | --- | --- | --- |
| `keyword` | text | Yes | One keyword; letter case does not matter. Example: `咖啡`. |
| `since` | time | Yes | The first day counted: the China-time (UTC+8) calendar day this moment falls on. Example: `2026-09-01T00:00:00Z`. |
| `until` | time | Yes | The last day counted, read the same way; the platform publishes a day or two late. Example: `2026-09-30T00:00:00Z`. |
| `view` | text |  | How much of each item to return. All three cost the same. Values: `compact`, `standard` (default), `full`. |
| `fields` | list of text |  | Return only these fields. Each by its path, such as `author.name`. |

## Returned fields

`data.item` is one keyword audience object. Preview: the structure may change, announced beforehand.

Three views: `compact` (the most used fields, long text cut short), `standard` (the default: every standard field) and `full` (adds `ext`, the platform's own fields). A field is in the view named and in every larger one.

| Field | Type | Description | From view | This endpoint |
| --- | --- | --- | --- | --- |
| `keyword` | text | The keyword. | `compact` | Yes |
| `age` | list of object | By age group. | `compact` | Yes |
| `age[].label` | text | Name of the group, in the platform's words. | `compact` | Yes |
| `age[].share` | number | Share of the audience in this group, 0 to 1. | `compact` | Yes |
| `age[].tgi` | number | TGI: how much this group leans to the keyword; 100 is the platform's average, above 100 leans more. | `compact` | Yes |
| `gender` | list of object | By gender. | `compact` | Yes |
| `gender[].label` | text | Name of the group, in the platform's words. | `compact` | Yes |
| `gender[].share` | number | Share of the audience in this group, 0 to 1. | `compact` | Yes |
| `gender[].tgi` | number | TGI: how much this group leans to the keyword; 100 is the platform's average, above 100 leans more. | `compact` | Yes |
| `province` | list of object | By province. | `compact` | Yes |
| `province[].label` | text | Name of the group, in the platform's words. | `compact` | Yes |
| `province[].share` | number | Share of the audience in this group, 0 to 1. | `compact` | Yes |
| `province[].tgi` | number | TGI: how much this group leans to the keyword; 100 is the platform's average, above 100 leans more. | `compact` | Yes |
| `city` | list of object | By city: the cities with the largest shares, as the platform lists them; they do not add up to 1. | `compact` | Yes |
| `city[].label` | text | Name of the group, in the platform's words. | `compact` | Yes |
| `city[].share` | number | Share of the audience in this group, 0 to 1. | `compact` | Yes |
| `city[].tgi` | number | TGI: how much this group leans to the keyword; 100 is the platform's average, above 100 leans more. | `compact` | Yes |
| `city_tier` | list of object | By city tier. | `compact` | Yes |
| `city_tier[].label` | text | Name of the group, in the platform's words. | `compact` | Yes |
| `city_tier[].share` | number | Share of the audience in this group, 0 to 1. | `compact` | Yes |
| `city_tier[].tgi` | number | TGI: how much this group leans to the keyword; 100 is the platform's average, above 100 leans more. | `compact` | Yes |
| `interest` | list of object | By interest; the shares do not add up to 1. | `compact` | Yes |
| `interest[].label` | text | Name of the group, in the platform's words. | `compact` | Yes |
| `interest[].share` | number | Share of the audience in this group, 0 to 1. | `compact` | Yes |
| `interest[].tgi` | number | TGI: how much this group leans to the keyword; 100 is the platform's average, above 100 leans more. | `compact` | Yes |
| `approximate` | list of object | Which numbers of this item are approximate or lower bounds; absent when all are exact. | `compact` | Yes |
| `approximate[].field` | text | Path of the field, such as metrics.views. | `compact` | Yes |
| `approximate[].kind` | text | Approximate, or a lower bound. Values: `approximate`, `lower_bound`. | `compact` | Yes |

A field with no value on an item is `null`. A field this endpoint cannot give is left out and listed in `meta.unavailable`.

Typical size of one item: `compact` 6.4 KB, `standard` 6.4 KB, `full` 6.4 KB (measured on the response recorded 2026-10-12 21:50 UTC).

## Paging

One object per call: there is nothing to page.

## When you are charged

| Case | Charged |
| --- | --- |
| A result with data | $0.0020, once per call |
| The object does not exist (404) | not charged |
| Invalid parameters, a failure of ours or of the data source, a timeout | not charged |
| The most one call can cost | $0.0020 (send `X-Max-Price` to refuse anything above your own limit) |

Prices as read 2026-10-18 19:59 UTC, under price book 2, in effect since 2026-10-17 11:00 UTC; the Playground reads the price in force before a run.

## If the object does not exist

The answer is 404 `not_found` and nothing is charged. `reason` says which: `not_found` (it does not exist) or `private_or_deleted`.

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
| 404 | `not_found` | The object does not exist, is private or was deleted | No | No |
| 404 | `run_not_found` | No run under this run ID | No | No |
| 409 | `call_in_progress` | The call under this idempotency key is still running; ask again with the same key shortly | No | With the same idempotency key |
| 409 | `idempotency_conflict` | This idempotency key was used for a different request | No | After a fix |
| 410 | `run_expired` | This run has expired and starts no more calls | No | No |
| 429 | `rate_limited` | Too many requests, or too many calls in progress | No | Yes |
| 429 | `cost_cap_exceeded` | This account's allowance for today is used up | No | Yes |
| 429 | `uncharged_cost_limit` | Too many of this account's calls today returned nothing and were not charged; endpoints of this kind can be called again tomorrow (UTC) | No | Yes |
| 500 | `settlement_unknown` | Whether this call settled is not known; ask again with the same idempotency key, or look it up by request ID | Unknown: look the call up | With the same idempotency key |
| 500 | `internal_error` | The service failed | No | Yes |
| 502 | `upstream_failed` | The data source failed | No | Yes |
| 502 | `upstream_changed` | The data source returned an unexpected structure | No | Yes |
| 502 | `upstream_unclear` | The data source's answer could not be interpreted; retry at most once | No | Once |
| 503 | `upstream_busy` | The data source is busy; retry shortly | No | Yes |
| 503 | `capability_paused` | This endpoint is paused | No | Yes |
| 503 | `overloaded` | The service is busy; retry shortly | No | Yes |
| 504 | `timeout` | The data did not arrive in time; retry with the same idempotency key | No | Yes |

[All error codes](https://dataxapi.com/docs/errors/)

## Request

The key is read from the environment; no key is ever written into a page.

### cURL

```bash
curl -G "https://api.dataxapi.com/v1/douyin/index/keywords/audience/get" \
  --data-urlencode "keyword=咖啡" \
  --data-urlencode "since=2026-09-01T00:00:00Z" \
  --data-urlencode "until=2026-09-30T00:00:00Z" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.douyin.index.keywords.audience.get(keyword="咖啡", since="2026-09-01T00:00:00Z", until="2026-09-30T00:00:00Z")
print(result["data"]["item"])
```

### TypeScript

```typescript
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.douyin.index.keywords.audience.get({ keyword: "咖啡", since: "2026-09-01T00:00:00Z", until: "2026-09-30T00:00:00Z" });
console.log(result.data.item);
```

### CLI

```bash
dataxapi call douyin.index.keywords.audience.get 'keyword=咖啡' since=2026-09-01T00:00:00Z until=2026-09-30T00:00:00Z
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

Add this to your MCP client, then ask your agent to call `douyin.index.keywords.audience.get`.

## Responses

### 200

From a response recorded 2026-10-12 21:50 UTC. Names, text and IDs are examples, and so are the links: none is the recorded one (the page shows no one's personal data); the figures are as recorded. Long lists are cut. The request ID, cursor and balance are made up.

Size as sent: 6.7 KB in the standard view (6.7 KB compact, 6.7 KB full).

```jsonc
{
  "code": "ok",
  "request_id": "e05f9d23-d8dd-4f0f-9084-3f4ca55d0dbb",
  "data": {
    "item": {
      "keyword": "咖啡",
      "age": [
        { "label": "18-23", "share": 0.1968, "tgi": 174.17389307762207 },
        { "label": "24-30", "share": 0.2233, "tgi": 173.71695132383041 },
        // … 3 more
      ],
      "gender": [
        { "label": "男", "share": 0.47, "tgi": 98.27023904973254 },
        { "label": "女", "share": 0.53, "tgi": 101.58569115669054 }
      ],
      "province": [
        { "label": "北京", "share": 0.0221, "tgi": 120.01085780496312 },
        { "label": "天津", "share": 0.0121, "tgi": 105.42964416985868 },
        // … 32 more
      ],
      "city": [
        { "label": "上海", "share": 0.0245, "tgi": 125.4042968127423 },
        { "label": "广州", "share": 0.0237, "tgi": 117.79286978677968 },
        // … 28 more
      ],
      "city_tier": [
        {
          "label": "一线城市",
          "share": 0.08856723771604946,
          "tgi": 114.35574144488798
        },
        {
          "label": "新一线城市",
          "share": 0.19688659709388875,
          "tgi": 103.66957853814951
        },
        // … 5 more
      ],
      "interest": [
        {
          "label": "时尚",
          "share": 0.15486799847286528,
          "tgi": 111.80033780828992
        },
        {
          "label": "美食",
          "share": 0.10207902382205732,
          "tgi": 113.58111661037135
        },
        // … 23 more
      ]
    }
  },
  "warnings": [],
  "meta": {
    "capability": "douyin.index.keywords.audience.get",
    "result_status": "complete",
    "fetched_at": "2026-10-12T21:50:52.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {},
    "billing": {
      "amount": "0.002",
      "currency": "USD",
      "balance_after": "9.998"
    }
  }
}
```

### 400

An example written to the specification, not a recorded response.

```json
{
  "code": "invalid_params",
  "request_id": "4862bba3-7baf-440d-b3e2-6b6c1fcde04a",
  "message": "A parameter is invalid",
  "message_zh": "参数不合法",
  "charged": false,
  "retry": "after_fix",
  "retry_after_seconds": null,
  "param": null,
  "problems": [
    "keyword is required",
    "since is required",
    "until is required"
  ],
  "docs_url": "https://dataxapi.com/docs/errors#invalid_params"
}
```

### 402

An example written to the specification, not a recorded response.

```json
{
  "code": "insufficient_balance",
  "request_id": "2998e2a5-de0d-4c84-a7ca-d2e38d32852d",
  "message": "The balance is too low",
  "message_zh": "余额不足",
  "charged": false,
  "retry": "after_fix",
  "retry_after_seconds": null,
  "param": null,
  "required": "0.002",
  "available": "0",
  "docs_url": "https://dataxapi.com/docs/errors#insufficient_balance"
}
```

### 404

An example written to the specification, not a recorded response.

```json
{
  "code": "not_found",
  "request_id": "4670d123-3c10-4f65-b80c-fd5f926f8130",
  "message": "The object does not exist, is private or was deleted",
  "message_zh": "对象不存在、私密或已删除",
  "charged": false,
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
  "request_id": "d9318d4b-b591-4b4f-a530-15c46ed9d84f",
  "message": "The data source failed",
  "message_zh": "数据来源出错",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

[This example as a JSON file](https://dataxapi.com/apis/douyin/index/keywords/audience/get.example.json)

## Use it in your AI

`dataxapi setup` gives the agents on your machine (Claude Code, Codex, Cursor) the DataXAPI MCP server and the base skill. The key is read from DATAXAPI_API_KEY; none is written into a file.

MCP server: `https://api.dataxapi.com/mcp`. The entry for your client is under MCP in the request examples of this page; then ask your agent to call `douyin.index.keywords.audience.get`.

Or paste this to any AI:

> Read https://dataxapi.com/apis/douyin/index/keywords/audience/get.md and help me use the DataXAPI endpoint douyin.index.keywords.audience.get (Douyin trend-index keyword audience).

[Open in ChatGPT](https://chatgpt.com/?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fdouyin%2Findex%2Fkeywords%2Faudience%2Fget.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20douyin.index.keywords.audience.get%20%28Douyin%20trend-index%20keyword%20audience%29.) · [Open in Claude](https://claude.ai/new?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fdouyin%2Findex%2Fkeywords%2Faudience%2Fget.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20douyin.index.keywords.audience.get%20%28Douyin%20trend-index%20keyword%20audience%29.)

## Related

Part of DataXAPI's Social media data. The same key also works for: Creators, Ads, E-commerce.

Douyin trend-index endpoints: [Douyin trend-index brand trends](https://dataxapi.com/apis/douyin/index/brands/history/), [Douyin trend-index brand comparison](https://dataxapi.com/apis/douyin/index/brands/metrics/), [Douyin trend-index creator top videos](https://dataxapi.com/apis/douyin/index/creators/videos/list/), [Douyin trend-index creator follower profile](https://dataxapi.com/apis/douyin/index/creators/audience/get/), [Douyin trend-index creator core metrics](https://dataxapi.com/apis/douyin/index/creators/metrics/), [Douyin trend-index keyword audience](https://dataxapi.com/apis/douyin/index/keywords/audience/get/), [Douyin trend-index keyword trends](https://dataxapi.com/apis/douyin/index/keywords/history/), [Douyin trend-index related keywords](https://dataxapi.com/apis/douyin/index/keywords/related/), [Douyin trend-index live hot topics](https://dataxapi.com/apis/douyin/index/trends/list/), [Douyin trend-index keyword hot videos](https://dataxapi.com/apis/douyin/index/videos/search/)

Douyin endpoints: [Douyin comment replies](https://dataxapi.com/apis/douyin/comments/replies/list/), [Douyin hashtag videos](https://dataxapi.com/apis/douyin/hashtags/videos/list/), [Douyin hot search board](https://dataxapi.com/apis/douyin/trends/list/), [Douyin user profile](https://dataxapi.com/apis/douyin/users/get/), [Douyin creator engagement and follower trends](https://dataxapi.com/apis/douyin/users/history/), [Douyin user search](https://dataxapi.com/apis/douyin/users/search/), [Douyin user videos](https://dataxapi.com/apis/douyin/users/videos/list/), [Douyin video comments](https://dataxapi.com/apis/douyin/videos/comments/list/), [Douyin video detail](https://dataxapi.com/apis/douyin/videos/get/), [Douyin video play count](https://dataxapi.com/apis/douyin/videos/metrics/), [Douyin related videos](https://dataxapi.com/apis/douyin/videos/related/), [Douyin video search](https://dataxapi.com/apis/douyin/videos/search/), [Douyin trending videos](https://dataxapi.com/apis/douyin/videos/trending/)

Douyin Xingtu endpoints: [Douyin Xingtu creator rate card](https://dataxapi.com/apis/douyin/xingtu/creators/rates/get/), [Douyin Xingtu creator search](https://dataxapi.com/apis/douyin/xingtu/creators/search/), [Douyin Xingtu creator profile](https://dataxapi.com/apis/douyin/xingtu/creators/get/), [Douyin Xingtu creator audience](https://dataxapi.com/apis/douyin/xingtu/creators/audience/get/), [Douyin Xingtu creator metrics](https://dataxapi.com/apis/douyin/xingtu/creators/metrics/), [Douyin Xingtu creator video performance](https://dataxapi.com/apis/douyin/xingtu/creators/videos/list/), [Douyin Xingtu creator content keywords](https://dataxapi.com/apis/douyin/xingtu/creators/keywords/get/), [Douyin Xingtu creator index scores](https://dataxapi.com/apis/douyin/xingtu/creators/scores/get/), [Douyin Xingtu creator content mix](https://dataxapi.com/apis/douyin/xingtu/creators/content_mix/get/), [Douyin Xingtu creator conversion](https://dataxapi.com/apis/douyin/xingtu/creators/conversion/get/), [Douyin Xingtu marketing calendar](https://dataxapi.com/apis/douyin/xingtu/campaigns/list/)

Related: [All Douyin trend-index endpoints](https://dataxapi.com/apis/douyin/index/), [All Douyin endpoints](https://dataxapi.com/apis/douyin/), [Social media data](https://dataxapi.com/categories/social/), [The keyword audience object's fields](https://dataxapi.com/docs/objects/keyword_audience/)

## Questions

### How much does the Douyin trend-index keyword audience API cost?

$0.0020 per call. The most one call can cost is $0.0020.

### When am I not charged?

Errors, timeouts and objects that do not exist are not charged.

### What happens if the object does not exist?

The answer is 404 not_found and nothing is charged. reason says which: not_found (it does not exist) or private_or_deleted.

### Where do the figures come from?

From 巨量算数 (Juliang Suanshu, the Douyin index): who is behind the keyword over the dates asked for: the share of each age group, gender, province, city, city tier and interest, each with its TGI (100 is the platform's average).

### How do I use it in ChatGPT or Claude?

Connect DataXAPI once (one prompt with your key, on the agents page), then ask in plain words: "Who searches 咖啡 on Douyin? Use DataXAPI." The agent calls douyin.index.keywords.audience.get, $0.0020 a call.

---

Last checked 2026-10-18 19:59 UTC. Catalog revision c48ce454ae6c4c65. [HTML version](https://dataxapi.com/apis/douyin/index/keywords/audience/get/)
