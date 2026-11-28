# Xiaohongshu (RedNote) PGY creator audience profile API

Get who follows a Xiaohongshu creator, by PGY creator ID: the share of each segment by gender, age, province, city, interest and device, and the day the figures are of. One object a call; $0.0400 per call. Errors and timeouts are not charged.

- Endpoint: `GET https://api.dataxapi.com/v1/xiaohongshu/pgy/creators/audience/get`
- ID: `xiaohongshu.pgy.creators.audience.get`
- Also known as: rednote creator audience, xiaohongshu audience demographics, Xiaohongshu PGY audience profile
- Price: $0.0400 / call
- Live status is not on this page, which is a snapshot. Read it with `GET https://api.dataxapi.com/v1/catalog/status`
- Returns: 1 object, one audience object
- Returns audience, a preview structure that may still change
- [Run it in the Playground](https://dataxapi.com/console/playground/?capability=xiaohongshu.pgy.creators.audience.get&params=%7B%22id%22%3A%225c0017ef6b58b740c92463fb%22%7D)
- In Chinese: [小红书蒲公英博主粉丝画像 API](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/audience/get/)

## What you get

The first 8 rows of a response recorded 2026-10-12 21:53 UTC.

| Field | name | share |
| --- | --- | --- |
| gender | male | 27.8% |
| gender | female | 72.2% |
| age | <18 | 0.9% |
| age | 18-24 | 10.2% |
| province | 浙江 | 32.2% |
| province | 江苏 | 24.7% |
| city | 温州 | 23.6% |
| city | 徐州 | 18.1% |

## Parameters

| Parameter | Type | required | Description |
| --- | --- | --- | --- |
| `id` | text | Yes | PGY creator ID, 24 hexadecimal characters; take it from the PGY creator search. Example: `5c0017ef6b58b740c92463fb`. |
| `view` | text |  | How much of each item to return. All three cost the same. Values: `compact`, `standard` (default), `full`. |
| `fields` | list of text |  | Return only these fields. Each by its path, such as `author.name`. |

## Returned fields

`data.item` is one audience object. Preview: the structure may change, announced beforehand.

Three views: `compact` (the most used fields, long text cut short), `standard` (the default: every standard field) and `full` (adds `ext`, the platform's own fields). A field is in the view named and in every larger one.

| Field | Type | Description | From view | This endpoint |
| --- | --- | --- | --- | --- |
| `creator_id` | text | Creator ID. | `compact` | Yes |
| `measured_at` | time | The day the figures are of, given as the start of that day in China time. | `compact` | Yes |
| `gender` | list of object | By gender. | `compact` | Yes |
| `gender[].name` | text | Name of the segment, in the platform's words (the two genders come in lower-case English). | `compact` | Yes |
| `gender[].share` | number | The segment's share of the segments listed, 0 to 1. | `compact` | Yes |
| `gender[].count` | integer | Followers in the segment. | `compact` | Not provided here |
| `age` | list of object | By age group. | `compact` | Yes |
| `age[].name` | text | Name of the segment, in the platform's words (the two genders come in lower-case English). | `compact` | Yes |
| `age[].share` | number | The segment's share of the segments listed, 0 to 1. | `compact` | Yes |
| `age[].count` | integer | Followers in the segment. | `compact` | Not provided here |
| `province` | list of object | By province. | `compact` | Yes |
| `province[].name` | text | Name of the segment, in the platform's words (the two genders come in lower-case English). | `compact` | Yes |
| `province[].share` | number | The segment's share of the segments listed, 0 to 1. | `compact` | Yes |
| `province[].count` | integer | Followers in the segment. | `compact` | Not provided here |
| `city` | list of object | By city, the largest only. | `compact` | Yes |
| `city[].name` | text | Name of the segment, in the platform's words (the two genders come in lower-case English). | `compact` | Yes |
| `city[].share` | number | The segment's share of the segments listed, 0 to 1. | `compact` | Yes |
| `city[].count` | integer | Followers in the segment. | `compact` | Not provided here |
| `interest` | list of object | By interest. | `compact` | Yes |
| `interest[].name` | text | Name of the segment, in the platform's words (the two genders come in lower-case English). | `compact` | Yes |
| `interest[].share` | number | The segment's share of the segments listed, 0 to 1. | `compact` | Yes |
| `interest[].count` | integer | Followers in the segment. | `compact` | Not provided here |
| `device` | list of object | By phone brand. | `compact` | Yes |
| `device[].name` | text | Name of the segment, in the platform's words (the two genders come in lower-case English). | `compact` | Yes |
| `device[].share` | number | The segment's share of the segments listed, 0 to 1. | `compact` | Yes |
| `device[].count` | integer | Followers in the segment. | `compact` | Not provided here |
| `city_tier` | list of object | By city tier. | `compact` | The platform has none |
| `city_tier[].name` | text | Name of the segment, in the platform's words (the two genders come in lower-case English). | `compact` | The platform has none |
| `city_tier[].share` | number | The segment's share of the segments listed, 0 to 1. | `compact` | The platform has none |
| `city_tier[].count` | integer | Followers in the segment. | `compact` | The platform has none |
| `crowd` | list of object | By the consumer groups the platform sorts people into. | `compact` | The platform has none |
| `crowd[].name` | text | Name of the segment, in the platform's words (the two genders come in lower-case English). | `compact` | The platform has none |
| `crowd[].share` | number | The segment's share of the segments listed, 0 to 1. | `compact` | The platform has none |
| `crowd[].count` | integer | Followers in the segment. | `compact` | The platform has none |
| `purchase_category` | list of object | By the category of goods bought. | `compact` | The platform has none |
| `purchase_category[].name` | text | Name of the segment, in the platform's words (the two genders come in lower-case English). | `compact` | The platform has none |
| `purchase_category[].share` | number | The segment's share of the segments listed, 0 to 1. | `compact` | The platform has none |
| `purchase_category[].count` | integer | Followers in the segment. | `compact` | The platform has none |
| `purchase_amount` | list of object | By the amount spent on an order. | `compact` | The platform has none |
| `purchase_amount[].name` | text | Name of the segment, in the platform's words (the two genders come in lower-case English). | `compact` | The platform has none |
| `purchase_amount[].share` | number | The segment's share of the segments listed, 0 to 1. | `compact` | The platform has none |
| `purchase_amount[].count` | integer | Followers in the segment. | `compact` | The platform has none |
| `approximate` | list of object | Which numbers of this item are approximate or lower bounds; absent when all are exact. | `compact` | Yes |
| `approximate[].field` | text | Path of the field, such as metrics.views. | `compact` | Yes |
| `approximate[].kind` | text | Approximate, or a lower bound. Values: `approximate`, `lower_bound`. | `compact` | Yes |

A field with no value on an item is `null`. A field this endpoint cannot give is left out and listed in `meta.unavailable`.

Typical size of one item: `compact` 3.9 KB, `standard` 3.9 KB, `full` 3.9 KB (measured on the response recorded 2026-10-12 21:53 UTC).

## Paging

One object per call: there is nothing to page.

## When you are charged

| Case | Charged |
| --- | --- |
| A result with data | $0.0400, once per call |
| Invalid parameters, a failure or a timeout | not charged |
| The most one call can cost | $0.0400 (send `X-Max-Price` to refuse anything above your own limit) |

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
curl -G "https://api.dataxapi.com/v1/xiaohongshu/pgy/creators/audience/get" \
  --data-urlencode "id=5c0017ef6b58b740c92463fb" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
# pip install dataxapi
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.xiaohongshu.pgy.creators.audience.get(id="5c0017ef6b58b740c92463fb")
print(result["data"]["item"])
```

### TypeScript

```typescript
// npm i @dataxapi/sdk
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.xiaohongshu.pgy.creators.audience.get({ id: "5c0017ef6b58b740c92463fb" });
console.log(result.data.item);
```

### CLI

```bash
dataxapi call xiaohongshu.pgy.creators.audience.get id=5c0017ef6b58b740c92463fb
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

Add this to your MCP client, then ask your agent to call `xiaohongshu.pgy.creators.audience.get`.

## Responses

### 200

From a response recorded 2026-10-12 21:53 UTC. Names, text and IDs are examples, and so are the links: none is the recorded one (the page shows no one's personal data); the figures are as recorded. Long lists are cut. The request ID, cursor and balance are made up.

Size as sent: 4.5 KB in the standard view (4.5 KB compact, 4.5 KB full).

```jsonc
{
  "code": "ok",
  "request_id": "2d7a912b-3bcf-4ee6-ac5b-131dc3a9a989",
  "data": {
    "item": {
      "creator_id": "63a117400000000061166ea6",
      "measured_at": "2026-10-10T16:00:00.000Z",
      "gender": [
        { "name": "male", "share": 0.27827228950824456 },
        { "name": "female", "share": 0.7217277104917554 }
      ],
      "age": [
        { "name": "<18", "share": 0.009193054136874362 },
        { "name": "18-24", "share": 0.10156135998832627 },
        // … 3 more
      ],
      "province": [
        { "name": "浙江", "share": 0.3215255771842463 },
        { "name": "江苏", "share": 0.24728383884110458 },
        // … 34 more
      ],
      "city": [
        { "name": "温州", "share": 0.2359665006790403 },
        { "name": "徐州", "share": 0.1805115436849253 },
        // … 8 more
      ],
      "interest": [
        { "name": "美食", "share": 0.15246001214820815 },
        { "name": "旅游", "share": 0.1216170614834312 },
        // … 18 more
      ],
      "device": [
        { "name": "苹果", "share": 0.756649688737974 },
        { "name": "小米", "share": 0.0622524052065648 },
        // … 8 more
      ]
    }
  },
  "warnings": [],
  "meta": {
    "capability": "xiaohongshu.pgy.creators.audience.get",
    "result_status": "complete",
    "fetched_at": "2026-10-12T21:53:02.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "gender.count": "capability",
      "age.count": "capability",
      "province.count": "capability",
      "city.count": "capability",
      "interest.count": "capability",
      "device.count": "capability",
      "city_tier": "platform",
      "crowd": "platform",
      "purchase_category": "platform",
      "purchase_amount": "platform"
    },
    "billing": {
      "amount": "0.04",
      "currency": "USD",
      "balance_after": "9.96"
    }
  }
}
```

### 400

An example written to the specification, not a recorded response.

```json
{
  "code": "invalid_params",
  "request_id": "485ea950-4f43-48f0-8d64-3993a2781cc4",
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
  "request_id": "a43ea66b-091b-4d16-9069-452a651317f5",
  "message": "The balance is too low",
  "message_zh": "余额不足",
  "charged": false,
  "retry": "after_fix",
  "retry_after_seconds": null,
  "param": null,
  "required": "0.04",
  "available": "0",
  "top_up_url": "https://dataxapi.com/console/billing/?amount=10",
  "next_step": "The balance does not cover this call ($0.04). Top up at top_up_url: $10 at least, about 250 calls at this price; Alipay or a card, and the balance never expires. Then send the same request again, unchanged. Nothing was charged for this one.",
  "next_step_zh": "余额不够这次调用（$0.04）。到 top_up_url 充值：最低 $10，按这次的价格约够 250 次；支付宝、银行卡都能付，余额不过期。到账后把同一个请求原样再发一次。这次没有扣钱。",
  "docs_url": "https://dataxapi.com/docs/errors#insufficient_balance"
}
```

### 404

An example written to the specification, not a recorded response.

```json
{
  "code": "not_found",
  "request_id": "d3997e3c-8aca-43f0-af0b-6dfafffecfaa",
  "message": "The object does not exist, is private or was deleted",
  "message_zh": "对象不存在、私密或已删除",
  "charged": true,
  "amount": "0.04",
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
  "request_id": "fdc7dfe3-0ba8-48c2-b04e-9acdce91567a",
  "message": "No result came back this time and nothing was charged; retry shortly",
  "message_zh": "这次没有取到结果，没有扣费，可以稍后重试",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

[This example as a JSON file](https://dataxapi.com/apis/xiaohongshu/pgy/creators/audience/get.example.json)

## Use it in your AI

`dataxapi setup` gives the agents on your machine (Claude Code, Codex, Cursor) the DataXAPI MCP server and the base skill. The key is read from DATAXAPI_API_KEY; none is written into a file.

MCP server: `https://api.dataxapi.com/mcp`. The entry for your client is under MCP in the request examples of this page; then ask your agent to call `xiaohongshu.pgy.creators.audience.get`.

Or paste this to any AI:

> Read https://dataxapi.com/apis/xiaohongshu/pgy/creators/audience/get.md and help me use the DataXAPI endpoint xiaohongshu.pgy.creators.audience.get (Xiaohongshu (RedNote) PGY creator audience profile).

[Open in ChatGPT](https://chatgpt.com/?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fxiaohongshu%2Fpgy%2Fcreators%2Faudience%2Fget.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20xiaohongshu.pgy.creators.audience.get%20%28Xiaohongshu%20%28RedNote%29%20PGY%20creator%20audience%20profile%29.) · [Open in Claude](https://claude.ai/new?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fxiaohongshu%2Fpgy%2Fcreators%2Faudience%2Fget.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20xiaohongshu.pgy.creators.audience.get%20%28Xiaohongshu%20%28RedNote%29%20PGY%20creator%20audience%20profile%29.)

## Related

Part of DataXAPI's Creators data. The same key also works for: Social media, Ads, E-commerce.

The same thing on other platforms: [Douyin Xingtu creator audience](https://dataxapi.com/apis/douyin/xingtu/creators/audience/get/), [Douyin Xingtu creator audience (backup)](https://dataxapi.com/apis/douyin/xingtu/backup/creators/audience/get/)

Xiaohongshu PGY endpoints: [Xiaohongshu PGY keyword search index](https://dataxapi.com/apis/xiaohongshu/pgy/keywords/history/), [Xiaohongshu PGY related keywords](https://dataxapi.com/apis/xiaohongshu/pgy/keywords/related/), [Xiaohongshu PGY creator search](https://dataxapi.com/apis/xiaohongshu/pgy/creators/search/), [Xiaohongshu PGY creator detail](https://dataxapi.com/apis/xiaohongshu/pgy/creators/get/), [Xiaohongshu PGY creator audience profile](https://dataxapi.com/apis/xiaohongshu/pgy/creators/audience/get/), [Xiaohongshu PGY creator metrics](https://dataxapi.com/apis/xiaohongshu/pgy/creators/metrics/), [Xiaohongshu PGY creator notes](https://dataxapi.com/apis/xiaohongshu/pgy/creators/notes/list/), [Xiaohongshu PGY creator follower history](https://dataxapi.com/apis/xiaohongshu/pgy/creators/followers/history/), [Xiaohongshu PGY similar creators](https://dataxapi.com/apis/xiaohongshu/pgy/creators/related/), [Xiaohongshu PGY trending notes](https://dataxapi.com/apis/xiaohongshu/pgy/notes/trending/), [Xiaohongshu PGY creator costs and data summary](https://dataxapi.com/apis/xiaohongshu/pgy/creators/costs/metrics/), [Xiaohongshu PGY creator follower summary](https://dataxapi.com/apis/xiaohongshu/pgy/creators/followers/metrics/), [Xiaohongshu PGY creator core figures history](https://dataxapi.com/apis/xiaohongshu/pgy/creators/costs/history/), [Xiaohongshu PGY note metrics](https://dataxapi.com/apis/xiaohongshu/pgy/notes/get/)

Xiaohongshu (RedNote) endpoints: [Xiaohongshu image search](https://dataxapi.com/apis/xiaohongshu/images/search/), [Xiaohongshu note detail](https://dataxapi.com/apis/xiaohongshu/notes/get/), [Xiaohongshu comment replies](https://dataxapi.com/apis/xiaohongshu/comments/replies/list/), [Xiaohongshu note comments](https://dataxapi.com/apis/xiaohongshu/notes/comments/list/), [Xiaohongshu note search](https://dataxapi.com/apis/xiaohongshu/notes/search/), [Xiaohongshu topic notes](https://dataxapi.com/apis/xiaohongshu/topics/notes/list/), [Xiaohongshu topic detail](https://dataxapi.com/apis/xiaohongshu/topics/get/), [Xiaohongshu trends](https://dataxapi.com/apis/xiaohongshu/trends/list/), [Xiaohongshu user profile](https://dataxapi.com/apis/xiaohongshu/users/get/), [Xiaohongshu user notes](https://dataxapi.com/apis/xiaohongshu/users/notes/list/), [Xiaohongshu user search](https://dataxapi.com/apis/xiaohongshu/users/search/), [Xiaohongshu search suggestions](https://dataxapi.com/apis/xiaohongshu/keywords/related/), [Xiaohongshu video note with its video and subtitles](https://dataxapi.com/apis/xiaohongshu/videos/get/), [Xiaohongshu video transcript (video to text)](https://dataxapi.com/apis/xiaohongshu/videos/transcript/get/), [RedNote (Xiaohongshu) image downloader, originals and live photos](https://dataxapi.com/apis/xiaohongshu/notes/media/get/), [RedNote (Xiaohongshu) video downloader](https://dataxapi.com/apis/xiaohongshu/videos/media/get/)

Xiaohongshu Shop endpoints: [Xiaohongshu product detail](https://dataxapi.com/apis/xiaohongshu/shop/products/get/), [Xiaohongshu product reviews](https://dataxapi.com/apis/xiaohongshu/shop/products/reviews/list/), [Xiaohongshu product search](https://dataxapi.com/apis/xiaohongshu/shop/products/search/)

How-to guides and answers: [How to look up Xiaohongshu (RedNote) PGY creator rates and audience](https://dataxapi.com/guides/xiaohongshu-pgy-creator-rates/), [What is Xiaohongshu PGY?](https://dataxapi.com/answers/what-is-xiaohongshu-pgy/), [How do I export Xiaohongshu PGY creators in bulk? (2026)](https://dataxapi.com/answers/export-xiaohongshu-pgy-creators/), [Creator (KOL) data from Douyin and Xiaohongshu: profiles, posts and rates (2026)](https://dataxapi.com/answers/douyin-xiaohongshu-creator-data/), [Xiaohongshu creator follower growth: followers day by day (2026)](https://dataxapi.com/answers/xiaohongshu-creator-follower-growth/), [Are a Xiaohongshu creator's followers real? Active, reading and buying followers (2026)](https://dataxapi.com/answers/xiaohongshu-creator-follower-quality/), [Choosing Xiaohongshu creators in bulk: building a creator list by API (2026)](https://dataxapi.com/answers/xiaohongshu-kol-selection-api/), [Every figure on a Xiaohongshu PGY creator page: can an API get it? Field by field (2026)](https://dataxapi.com/answers/xiaohongshu-pgy-creator-page-fields/), [How to shortlist Xiaohongshu tech and gadget creators in bulk (2026)](https://dataxapi.com/answers/xiaohongshu-tech-creators/), [Xiaohongshu PGY or Douyin Xingtu: how they differ, and their creator data side by side (2026)](https://dataxapi.com/answers/xiaohongshu-pgy-vs-douyin-xingtu/)

Related: [All Xiaohongshu PGY endpoints](https://dataxapi.com/apis/xiaohongshu/pgy/), [All Xiaohongshu (RedNote) endpoints](https://dataxapi.com/apis/xiaohongshu/), [Creators data](https://dataxapi.com/categories/creator/), [The same thing on 2 platforms, side by side](https://dataxapi.com/roles/creators-audience-get/), [The audience object's fields](https://dataxapi.com/docs/objects/audience/)

## Questions

### How much does the Xiaohongshu (RedNote) PGY creator audience profile API cost?

$0.0400 per call. The most one call can cost is $0.0400.

### When am I not charged?

Errors and timeouts are not charged.

### What happens if the object does not exist?

The answer is 404 not_found. charged and amount in the body say what this one cost. reason says which: not_found (it does not exist) or private_or_deleted.

---

Last checked 2026-11-28 06:28 UTC. Catalog revision ceced48b38f71468. [HTML version](https://dataxapi.com/apis/xiaohongshu/pgy/creators/audience/get/)
