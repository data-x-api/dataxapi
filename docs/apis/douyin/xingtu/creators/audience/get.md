# Douyin Xingtu creator audience API

Get who follows a Douyin creator, by Xingtu creator ID: followers and share in each segment by gender, age, province, city, city tier, interest, device, consumer group, purchase category and purchase amount. One object a call; $0.0040 per call. Errors, timeouts and objects that do not exist are not charged.

- Endpoint: `GET https://api.dataxapi.com/v1/douyin/xingtu/creators/audience/get`
- ID: `douyin.xingtu.creators.audience.get`
- Also known as: creator audience demographics, xingtu follower profile
- Price: $0.0040 / call
- Live status is not on this page, which is a snapshot. Read it with `GET https://api.dataxapi.com/v1/catalog/status`
- Returns: 1 object, one audience object
- Returns audience, a preview structure that may still change
- [Run it in the Playground](https://dataxapi.com/console/playground/?capability=douyin.xingtu.creators.audience.get&params=%7B%22id%22%3A%226763236383382306828%22%7D)
- In Chinese: [抖音星图达人粉丝画像 API](https://dataxapi.com/zh/apis/douyin/xingtu/creators/audience/get/)

## What you get

The first 8 rows of a response recorded 2026-10-12 21:49 UTC.

| Field | name | share | count |
| --- | --- | --- | --- |
| gender | male | 80.8% | 20,914,248 |
| gender | female | 19.2% | 4,956,855 |
| age | 18-23 | 2.6% | 669,976 |
| age | 24-30 | 11.3% | 2,887,501 |
| province | 福建 | 3.5% | 845,507 |
| province | 香港 | 0.2% | 37,654 |
| city | 北京 | 14.7% | 751,515 |
| city | 上海 | 12.2% | 624,177 |

## Parameters

| Parameter | Type | required | Description |
| --- | --- | --- | --- |
| `id` | text | Yes | Xingtu creator ID, a string of digits; not the Douyin account ID: take it from the Xingtu creator search. Example: `6763236383382306828`. |
| `view` | text |  | How much of each item to return. All three cost the same. Values: `compact`, `standard` (default), `full`. |
| `fields` | list of text |  | Return only these fields. Each by its path, such as `author.name`. |

## Returned fields

`data.item` is one audience object. Preview: the structure may change, announced beforehand.

Three views: `compact` (the most used fields, long text cut short), `standard` (the default: every standard field) and `full` (adds `ext`, the platform's own fields). A field is in the view named and in every larger one.

| Field | Type | Description | From view | This endpoint |
| --- | --- | --- | --- | --- |
| `creator_id` | text | Creator ID. | `compact` | Yes |
| `measured_at` | time | The day the figures are of, given as the start of that day in China time. | `compact` | Not provided here |
| `gender` | list of object | By gender. | `compact` | Yes |
| `gender[].name` | text | Name of the segment, in the platform's words (the two genders come in lower-case English). | `compact` | Yes |
| `gender[].share` | number | The segment's share of the segments listed, 0 to 1. On this platform: The platform gives a count for each segment only; the share is that count over the total of the segments listed (cities list the top ten only). | `compact` | Yes |
| `gender[].count` | integer | Followers in the segment. | `compact` | Yes |
| `age` | list of object | By age group. | `compact` | Yes |
| `age[].name` | text | Name of the segment, in the platform's words (the two genders come in lower-case English). | `compact` | Yes |
| `age[].share` | number | The segment's share of the segments listed, 0 to 1. On this platform: The platform gives a count for each segment only; the share is that count over the total of the segments listed (cities list the top ten only). | `compact` | Yes |
| `age[].count` | integer | Followers in the segment. | `compact` | Yes |
| `province` | list of object | By province. | `compact` | Yes |
| `province[].name` | text | Name of the segment, in the platform's words (the two genders come in lower-case English). | `compact` | Yes |
| `province[].share` | number | The segment's share of the segments listed, 0 to 1. On this platform: The platform gives a count for each segment only; the share is that count over the total of the segments listed (cities list the top ten only). | `compact` | Yes |
| `province[].count` | integer | Followers in the segment. | `compact` | Yes |
| `city` | list of object | By city, the largest only. | `compact` | Yes |
| `city[].name` | text | Name of the segment, in the platform's words (the two genders come in lower-case English). | `compact` | Yes |
| `city[].share` | number | The segment's share of the segments listed, 0 to 1. On this platform: The platform gives a count for each segment only; the share is that count over the total of the segments listed (cities list the top ten only). | `compact` | Yes |
| `city[].count` | integer | Followers in the segment. | `compact` | Yes |
| `interest` | list of object | By interest. | `compact` | Yes |
| `interest[].name` | text | Name of the segment, in the platform's words (the two genders come in lower-case English). | `compact` | Yes |
| `interest[].share` | number | The segment's share of the segments listed, 0 to 1. On this platform: The platform gives a count for each segment only; the share is that count over the total of the segments listed (cities list the top ten only). | `compact` | Yes |
| `interest[].count` | integer | Followers in the segment. | `compact` | Yes |
| `device` | list of object | By phone brand. | `compact` | Yes |
| `device[].name` | text | Name of the segment, in the platform's words (the two genders come in lower-case English). | `compact` | Yes |
| `device[].share` | number | The segment's share of the segments listed, 0 to 1. On this platform: The platform gives a count for each segment only; the share is that count over the total of the segments listed (cities list the top ten only). | `compact` | Yes |
| `device[].count` | integer | Followers in the segment. | `compact` | Yes |
| `city_tier` | list of object | By city tier. | `compact` | Yes |
| `city_tier[].name` | text | Name of the segment, in the platform's words (the two genders come in lower-case English). | `compact` | Yes |
| `city_tier[].share` | number | The segment's share of the segments listed, 0 to 1. On this platform: The platform gives a count for each segment only; the share is that count over the total of the segments listed (cities list the top ten only). | `compact` | Yes |
| `city_tier[].count` | integer | Followers in the segment. | `compact` | Yes |
| `crowd` | list of object | By the consumer groups the platform sorts people into. | `compact` | Yes |
| `crowd[].name` | text | Name of the segment, in the platform's words (the two genders come in lower-case English). | `compact` | Yes |
| `crowd[].share` | number | The segment's share of the segments listed, 0 to 1. On this platform: The platform gives a count for each segment only; the share is that count over the total of the segments listed (cities list the top ten only). | `compact` | Yes |
| `crowd[].count` | integer | Followers in the segment. | `compact` | Yes |
| `purchase_category` | list of object | By the category of goods bought. | `compact` | Yes |
| `purchase_category[].name` | text | Name of the segment, in the platform's words (the two genders come in lower-case English). | `compact` | Yes |
| `purchase_category[].share` | number | The segment's share of the segments listed, 0 to 1. On this platform: The platform gives a count for each segment only; the share is that count over the total of the segments listed (cities list the top ten only). | `compact` | Yes |
| `purchase_category[].count` | integer | Followers in the segment. | `compact` | Yes |
| `purchase_amount` | list of object | By the amount spent on an order. | `compact` | Yes |
| `purchase_amount[].name` | text | Name of the segment, in the platform's words (the two genders come in lower-case English). | `compact` | Yes |
| `purchase_amount[].share` | number | The segment's share of the segments listed, 0 to 1. On this platform: The platform gives a count for each segment only; the share is that count over the total of the segments listed (cities list the top ten only). | `compact` | Yes |
| `purchase_amount[].count` | integer | Followers in the segment. | `compact` | Yes |
| `approximate` | list of object | Which numbers of this item are approximate or lower bounds; absent when all are exact. | `compact` | Yes |
| `approximate[].field` | text | Path of the field, such as metrics.views. | `compact` | Yes |
| `approximate[].kind` | text | Approximate, or a lower bound. Values: `approximate`, `lower_bound`. | `compact` | Yes |

A field with no value on an item is `null`. A field this endpoint cannot give is left out and listed in `meta.unavailable`.

Typical size of one item: `compact` 5.7 KB, `standard` 5.7 KB, `full` 5.7 KB (measured on the response recorded 2026-10-12 21:49 UTC).

## Paging

One object per call: there is nothing to page.

## When you are charged

| Case | Charged |
| --- | --- |
| A result with data | $0.0040, once per call |
| The object does not exist (404) | not charged |
| Invalid parameters, a failure of ours or of the data source, a timeout | not charged |
| The most one call can cost | $0.0040 (send `X-Max-Price` to refuse anything above your own limit) |

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
curl -G "https://api.dataxapi.com/v1/douyin/xingtu/creators/audience/get" \
  --data-urlencode "id=6763236383382306828" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.douyin.xingtu.creators.audience.get(id="6763236383382306828")
print(result["data"]["item"])
```

### TypeScript

```typescript
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.douyin.xingtu.creators.audience.get({ id: "6763236383382306828" });
console.log(result.data.item);
```

### CLI

```bash
dataxapi call douyin.xingtu.creators.audience.get id=6763236383382306828
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

Add this to your MCP client, then ask your agent to call `douyin.xingtu.creators.audience.get`.

## Responses

### 200

From a response recorded 2026-10-12 21:49 UTC. Names, text and IDs are examples, and so are the links: none is the recorded one (the page shows no one's personal data); the figures are as recorded. Long lists are cut. The request ID, cursor and balance are made up.

Size as sent: 6.1 KB in the standard view (6.1 KB compact, 6.1 KB full).

```jsonc
{
  "code": "ok",
  "request_id": "25005e75-4c98-42d9-a6dd-afe2a7b8a879",
  "data": {
    "item": {
      "creator_id": "66673485511",
      "gender": [
        { "name": "male", "share": 0.8084018682929753, "count": 20914248 },
        { "name": "female", "share": 0.19159813170702464, "count": 4956855 }
      ],
      "age": [
        { "name": "18-23", "share": 0.02613169810130031, "count": 669976 },
        { "name": "24-30", "share": 0.11262389160089727, "count": 2887501 },
        // … 3 more
      ],
      "province": [
        { "name": "福建", "share": 0.034598226662216194, "count": 845507 },
        { "name": "香港", "share": 0.001540805252634323, "count": 37654 },
        // … 32 more
      ],
      "city": [
        { "name": "北京", "share": 0.14657726964471665, "count": 751515 },
        { "name": "上海", "share": 0.12174096383309756, "count": 624177 },
        // … 8 more
      ],
      "interest": [
        { "name": "二次元", "share": 0.022866163075920397, "count": 471117 },
        { "name": "随拍", "share": 0.5770495394947144, "count": 11889089 },
        // … 6 more
      ],
      "device": [
        { "name": "其他", "share": 0.1350657086683392, "count": 3500022 },
        { "name": "华为", "share": 0.24915854592413617, "count": 6456564 },
        // … 6 more
      ],
      "city_tier": [
        { "name": "二线", "share": 0.18540551970015773, "count": 4530677 },
        { "name": "五线", "share": 0.10928394606430417, "count": 2670526 },
        // … 3 more
      ],
      "crowd": [
        { "name": "Z世代", "share": 0.015066702484682015, "count": 328216 },
        { "name": "资深中产", "share": 0.16493764562162405, "count": 3593034 },
        // … 6 more
      ],
      "purchase_category": [
        { "name": "其他", "share": 0.35668521581357804, "count": 3854685 },
        { "name": "服饰内衣", "share": 0.20722439582025148, "count": 2239467 },
        // … 4 more
      ],
      "purchase_amount": [
        { "name": "50-100", "share": 0.23128677093645555, "count": 2497497 },
        { "name": "0-50", "share": 0.3880473446209439, "count": 4190240 },
        // … 3 more
      ]
    }
  },
  "warnings": [],
  "meta": {
    "capability": "douyin.xingtu.creators.audience.get",
    "result_status": "complete",
    "fetched_at": "2026-10-12T21:49:33.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": { "measured_at": "capability" },
    "billing": {
      "amount": "0.004",
      "currency": "USD",
      "balance_after": "9.996"
    }
  }
}
```

### 400

An example written to the specification, not a recorded response.

```json
{
  "code": "invalid_params",
  "request_id": "84e17cdf-951f-46a4-9cf9-544f87b3f63a",
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
  "request_id": "233b31e1-1cb8-4e03-ac48-a727fc15ecf0",
  "message": "The balance is too low",
  "message_zh": "余额不足",
  "charged": false,
  "retry": "after_fix",
  "retry_after_seconds": null,
  "param": null,
  "required": "0.004",
  "available": "0",
  "docs_url": "https://dataxapi.com/docs/errors#insufficient_balance"
}
```

### 404

An example written to the specification, not a recorded response.

```json
{
  "code": "not_found",
  "request_id": "e7f6c3b0-c019-47e5-baf7-b9b48f6c486b",
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
  "request_id": "6415391d-3fbb-40cc-a859-cd0f6c2c674c",
  "message": "The data source failed",
  "message_zh": "数据来源出错",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

[This example as a JSON file](https://dataxapi.com/apis/douyin/xingtu/creators/audience/get.example.json)

## Use it in your AI

`dataxapi setup` gives the agents on your machine (Claude Code, Codex, Cursor) the DataXAPI MCP server and the base skill. The key is read from DATAXAPI_API_KEY; none is written into a file.

MCP server: `https://api.dataxapi.com/mcp`. The entry for your client is under MCP in the request examples of this page; then ask your agent to call `douyin.xingtu.creators.audience.get`.

Or paste this to any AI:

> Read https://dataxapi.com/apis/douyin/xingtu/creators/audience/get.md and help me use the DataXAPI endpoint douyin.xingtu.creators.audience.get (Douyin Xingtu creator audience).

[Open in ChatGPT](https://chatgpt.com/?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fdouyin%2Fxingtu%2Fcreators%2Faudience%2Fget.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20douyin.xingtu.creators.audience.get%20%28Douyin%20Xingtu%20creator%20audience%29.) · [Open in Claude](https://claude.ai/new?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fdouyin%2Fxingtu%2Fcreators%2Faudience%2Fget.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20douyin.xingtu.creators.audience.get%20%28Douyin%20Xingtu%20creator%20audience%29.)

## Related

Part of DataXAPI's Creators data. The same key also works for: Social media, Ads, E-commerce.

The same thing on other platforms: [Xiaohongshu PGY creator audience profile](https://dataxapi.com/apis/xiaohongshu/pgy/creators/audience/get/)

Douyin Xingtu endpoints: [Douyin Xingtu creator rate card](https://dataxapi.com/apis/douyin/xingtu/creators/rates/get/), [Douyin Xingtu creator search](https://dataxapi.com/apis/douyin/xingtu/creators/search/), [Douyin Xingtu creator profile](https://dataxapi.com/apis/douyin/xingtu/creators/get/), [Douyin Xingtu creator audience](https://dataxapi.com/apis/douyin/xingtu/creators/audience/get/), [Douyin Xingtu creator metrics](https://dataxapi.com/apis/douyin/xingtu/creators/metrics/), [Douyin Xingtu creator video performance](https://dataxapi.com/apis/douyin/xingtu/creators/videos/list/), [Douyin Xingtu creator content keywords](https://dataxapi.com/apis/douyin/xingtu/creators/keywords/get/), [Douyin Xingtu creator index scores](https://dataxapi.com/apis/douyin/xingtu/creators/scores/get/), [Douyin Xingtu creator content mix](https://dataxapi.com/apis/douyin/xingtu/creators/content_mix/get/), [Douyin Xingtu creator conversion](https://dataxapi.com/apis/douyin/xingtu/creators/conversion/get/), [Douyin Xingtu marketing calendar](https://dataxapi.com/apis/douyin/xingtu/campaigns/list/)

Douyin endpoints: [Douyin comment replies](https://dataxapi.com/apis/douyin/comments/replies/list/), [Douyin hashtag videos](https://dataxapi.com/apis/douyin/hashtags/videos/list/), [Douyin hot search board](https://dataxapi.com/apis/douyin/trends/list/), [Douyin user profile](https://dataxapi.com/apis/douyin/users/get/), [Douyin creator engagement and follower trends](https://dataxapi.com/apis/douyin/users/history/), [Douyin user search](https://dataxapi.com/apis/douyin/users/search/), [Douyin user videos](https://dataxapi.com/apis/douyin/users/videos/list/), [Douyin video comments](https://dataxapi.com/apis/douyin/videos/comments/list/), [Douyin video detail](https://dataxapi.com/apis/douyin/videos/get/), [Douyin video play count](https://dataxapi.com/apis/douyin/videos/metrics/), [Douyin related videos](https://dataxapi.com/apis/douyin/videos/related/), [Douyin video search](https://dataxapi.com/apis/douyin/videos/search/), [Douyin trending videos](https://dataxapi.com/apis/douyin/videos/trending/)

Douyin trend-index endpoints: [Douyin trend-index brand trends](https://dataxapi.com/apis/douyin/index/brands/history/), [Douyin trend-index brand comparison](https://dataxapi.com/apis/douyin/index/brands/metrics/), [Douyin trend-index creator top videos](https://dataxapi.com/apis/douyin/index/creators/videos/list/), [Douyin trend-index creator follower profile](https://dataxapi.com/apis/douyin/index/creators/audience/get/), [Douyin trend-index creator core metrics](https://dataxapi.com/apis/douyin/index/creators/metrics/), [Douyin trend-index keyword audience](https://dataxapi.com/apis/douyin/index/keywords/audience/get/), [Douyin trend-index keyword trends](https://dataxapi.com/apis/douyin/index/keywords/history/), [Douyin trend-index related keywords](https://dataxapi.com/apis/douyin/index/keywords/related/), [Douyin trend-index live hot topics](https://dataxapi.com/apis/douyin/index/trends/list/), [Douyin trend-index keyword hot videos](https://dataxapi.com/apis/douyin/index/videos/search/)

Related: [All Douyin Xingtu endpoints](https://dataxapi.com/apis/douyin/xingtu/), [All Douyin endpoints](https://dataxapi.com/apis/douyin/), [Creators data](https://dataxapi.com/categories/creator/), [The same thing on 2 platforms, side by side](https://dataxapi.com/roles/creators-audience-get/), [The audience object's fields](https://dataxapi.com/docs/objects/audience/)

## Questions

### How much does the Douyin Xingtu creator audience API cost?

$0.0040 per call. The most one call can cost is $0.0040.

### When am I not charged?

Errors, timeouts and objects that do not exist are not charged.

### What happens if the object does not exist?

The answer is 404 not_found and nothing is charged. reason says which: not_found (it does not exist) or private_or_deleted.

---

Last checked 2026-10-18 19:59 UTC. Catalog revision c48ce454ae6c4c65. [HTML version](https://dataxapi.com/apis/douyin/xingtu/creators/audience/get/)
