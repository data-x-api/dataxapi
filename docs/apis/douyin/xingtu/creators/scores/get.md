# Douyin Xingtu creator index scores API

Get the six scores Xingtu gives a Douyin creator, by Xingtu creator ID: the overall Xingtu score and those for reach, seeding, conversion, cooperation and value for money, each with the score, the average of comparable creators, the rank and how far from the top that rank is. One object a call; $0.0080 per call. Errors, timeouts and objects that do not exist are not charged.

- Endpoint: `GET https://api.dataxapi.com/v1/douyin/xingtu/creators/scores/get`
- ID: `douyin.xingtu.creators.scores.get`
- Also known as: xingtu index, xingtu link index, creator score ranking, Douyin Xingtu creator index, Douyin Xingtu creator scores
- Price: $0.0080 / call
- Live status is not on this page, which is a snapshot. Read it with `GET https://api.dataxapi.com/v1/catalog/status`
- Returns: 1 object, one xingtu creator scores object
- Returns xingtu creator scores, a preview structure that may still change
- [Run it in the Playground](https://dataxapi.com/console/playground/?capability=douyin.xingtu.creators.scores.get&params=%7B%22id%22%3A%226763236383382306828%22%7D)
- In Chinese: [抖音星图达人星图指数 API](https://dataxapi.com/zh/apis/douyin/xingtu/creators/scores/get/)

## What you get

The first 8 rows of a response recorded 2026-10-13 03:26 UTC.

| Field | Value |
| --- | --- |
| overall.score | 90.9 |
| overall.average | 56.2 |
| overall.rank | 12 |
| overall.rank_share | 0 |
| reach.score | 98.77 |
| reach.average | 53.08 |
| reach.rank | 232 |
| reach.rank_share | 0.0% |

## Parameters

| Parameter | Type | required | Description |
| --- | --- | --- | --- |
| `id` | text | Yes | Xingtu creator ID, a string of digits; not the Douyin account ID: take it from the Xingtu creator search. Example: `6763236383382306828`. |
| `view` | text |  | How much of each item to return. All three cost the same. Values: `compact`, `standard` (default), `full`. |
| `fields` | list of text |  | Return only these fields. Each by its path, such as `author.name`. |

## Returned fields

`data.item` is one xingtu creator scores object. Preview: the structure may change, announced beforehand.

Three views: `compact` (the most used fields, long text cut short), `standard` (the default: every standard field) and `full` (adds `ext`, the platform's own fields). A field is in the view named and in every larger one.

| Field | Type | Description | From view | This endpoint |
| --- | --- | --- | --- | --- |
| `creator_id` | text | Xingtu creator ID. | `compact` | Yes |
| `overall` | object | The overall Xingtu score. | `compact` | Yes |
| `overall.score` | number | The score, 0 to 100. | `compact` | Yes |
| `overall.average` | number | Average of comparable creators on this score. | `compact` | Yes |
| `overall.rank` | integer | Rank on this score, 1 being the highest. | `compact` | Yes |
| `overall.rank_share` | number | How far from the top the rank is, 0 to 1: 0.05 is the top 5%. | `compact` | Yes |
| `reach` | object | Reach score. | `compact` | Yes |
| `reach.score` | number | The score, 0 to 100. | `compact` | Yes |
| `reach.average` | number | Average of comparable creators on this score. | `compact` | Yes |
| `reach.rank` | integer | Rank on this score, 1 being the highest. | `compact` | Yes |
| `reach.rank_share` | number | How far from the top the rank is, 0 to 1: 0.05 is the top 5%. | `compact` | Yes |
| `seeding` | object | Seeding score: how well the creator's videos raise interest in products. | `compact` | Yes |
| `seeding.score` | number | The score, 0 to 100. | `compact` | Yes |
| `seeding.average` | number | Average of comparable creators on this score. | `compact` | Yes |
| `seeding.rank` | integer | Rank on this score, 1 being the highest. | `compact` | Yes |
| `seeding.rank_share` | number | How far from the top the rank is, 0 to 1: 0.05 is the top 5%. | `compact` | Yes |
| `conversion` | object | Conversion score. | `compact` | Yes |
| `conversion.score` | number | The score, 0 to 100. | `compact` | Yes |
| `conversion.average` | number | Average of comparable creators on this score. | `compact` | Yes |
| `conversion.rank` | integer | Rank on this score, 1 being the highest. | `compact` | Yes |
| `conversion.rank_share` | number | How far from the top the rank is, 0 to 1: 0.05 is the top 5%. | `compact` | Yes |
| `cooperation` | object | Cooperation score. | `compact` | Yes |
| `cooperation.score` | number | The score, 0 to 100. | `compact` | Yes |
| `cooperation.average` | number | Average of comparable creators on this score. | `compact` | Yes |
| `cooperation.rank` | integer | Rank on this score, 1 being the highest. | `compact` | Yes |
| `cooperation.rank_share` | number | How far from the top the rank is, 0 to 1: 0.05 is the top 5%. | `compact` | Yes |
| `value_for_money` | object | Value-for-money score. | `compact` | Yes |
| `value_for_money.score` | number | The score, 0 to 100. | `compact` | Yes |
| `value_for_money.average` | number | Average of comparable creators on this score. | `compact` | Yes |
| `value_for_money.rank` | integer | Rank on this score, 1 being the highest. | `compact` | Yes |
| `value_for_money.rank_share` | number | How far from the top the rank is, 0 to 1: 0.05 is the top 5%. | `compact` | Yes |
| `approximate` | list of object | Which numbers of this item are approximate or lower bounds; absent when all are exact. | `compact` | Yes |
| `approximate[].field` | text | Path of the field, such as metrics.views. | `compact` | Yes |
| `approximate[].kind` | text | Approximate, or a lower bound. Values: `approximate`, `lower_bound`. | `compact` | Yes |

A field with no value on an item is `null`. A field this endpoint cannot give is left out and listed in `meta.unavailable`.

Typical size of one item: `compact` 483 B, `standard` 483 B, `full` 483 B (measured on the response recorded 2026-10-13 03:26 UTC).

## Paging

One object per call: there is nothing to page.

## When you are charged

| Case | Charged |
| --- | --- |
| A result with data | $0.0080, once per call |
| The object does not exist (404) | not charged |
| Invalid parameters, a failure of ours or of the data source, a timeout | not charged |
| The most one call can cost | $0.0080 (send `X-Max-Price` to refuse anything above your own limit) |

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
curl -G "https://api.dataxapi.com/v1/douyin/xingtu/creators/scores/get" \
  --data-urlencode "id=6763236383382306828" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.douyin.xingtu.creators.scores.get(id="6763236383382306828")
print(result["data"]["item"])
```

### TypeScript

```typescript
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.douyin.xingtu.creators.scores.get({ id: "6763236383382306828" });
console.log(result.data.item);
```

### CLI

```bash
dataxapi call douyin.xingtu.creators.scores.get id=6763236383382306828
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

Add this to your MCP client, then ask your agent to call `douyin.xingtu.creators.scores.get`.

## Responses

### 200

From a response recorded 2026-10-13 03:26 UTC. Names, text and IDs are examples, and so are the links: none is the recorded one (the page shows no one's personal data); the figures are as recorded. Long lists are cut. The request ID, cursor and balance are made up.

Size as sent: 814 B in the standard view (814 B compact, 814 B full).

```jsonc
{
  "code": "ok",
  "request_id": "f2d1af74-2a15-4c05-aef0-5bcb35163b02",
  "data": {
    "item": {
      "creator_id": "6119837728404143577",
      "overall": {
        "score": 90.9,
        "average": 56.2,
        "rank": 12,
        "rank_share": 0
      },
      "reach": {
        "score": 98.77,
        "average": 53.08,
        "rank": 232,
        "rank_share": 0.0001
      },
      "seeding": {
        "score": 98.68,
        "average": 53.26,
        "rank": 280,
        "rank_share": 0.0001
      },
      "conversion": {
        "score": 98.92,
        "average": 55.24,
        "rank": 164,
        "rank_share": 0.0001
      },
      "cooperation": {
        "score": 89.49,
        "average": 75.55,
        "rank": 1038,
        "rank_share": 0.0005
      },
      "value_for_money": {
        "score": 68.64,
        "average": 64.09,
        "rank": 50209,
        "rank_share": 0.023
      }
    }
  },
  "warnings": [],
  "meta": {
    "capability": "douyin.xingtu.creators.scores.get",
    "result_status": "complete",
    "fetched_at": "2026-10-13T03:26:38.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {},
    "billing": {
      "amount": "0.008",
      "currency": "USD",
      "balance_after": "9.992"
    }
  }
}
```

### 400

An example written to the specification, not a recorded response.

```json
{
  "code": "invalid_params",
  "request_id": "b4008802-2387-4a58-8b52-7ab6a8ddd85c",
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
  "request_id": "c136972f-bb16-4945-88fe-2ebe740c804a",
  "message": "The balance is too low",
  "message_zh": "余额不足",
  "charged": false,
  "retry": "after_fix",
  "retry_after_seconds": null,
  "param": null,
  "required": "0.008",
  "available": "0",
  "docs_url": "https://dataxapi.com/docs/errors#insufficient_balance"
}
```

### 404

An example written to the specification, not a recorded response.

```json
{
  "code": "not_found",
  "request_id": "98b4efe0-93e6-47f7-8c29-d115651d73b2",
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
  "request_id": "c0af0760-7022-4a90-9007-3cfb2cde24aa",
  "message": "The data source failed",
  "message_zh": "数据来源出错",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

[This example as a JSON file](https://dataxapi.com/apis/douyin/xingtu/creators/scores/get.example.json)

## Use it in your AI

`dataxapi setup` gives the agents on your machine (Claude Code, Codex, Cursor) the DataXAPI MCP server and the base skill. The key is read from DATAXAPI_API_KEY; none is written into a file.

MCP server: `https://api.dataxapi.com/mcp`. The entry for your client is under MCP in the request examples of this page; then ask your agent to call `douyin.xingtu.creators.scores.get`.

Or paste this to any AI:

> Read https://dataxapi.com/apis/douyin/xingtu/creators/scores/get.md and help me use the DataXAPI endpoint douyin.xingtu.creators.scores.get (Douyin Xingtu creator index scores).

[Open in ChatGPT](https://chatgpt.com/?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fdouyin%2Fxingtu%2Fcreators%2Fscores%2Fget.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20douyin.xingtu.creators.scores.get%20%28Douyin%20Xingtu%20creator%20index%20scores%29.) · [Open in Claude](https://claude.ai/new?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fdouyin%2Fxingtu%2Fcreators%2Fscores%2Fget.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20douyin.xingtu.creators.scores.get%20%28Douyin%20Xingtu%20creator%20index%20scores%29.)

## Related

Part of DataXAPI's Creators data. The same key also works for: Social media, Ads, E-commerce.

Douyin Xingtu endpoints: [Douyin Xingtu creator rate card](https://dataxapi.com/apis/douyin/xingtu/creators/rates/get/), [Douyin Xingtu creator search](https://dataxapi.com/apis/douyin/xingtu/creators/search/), [Douyin Xingtu creator profile](https://dataxapi.com/apis/douyin/xingtu/creators/get/), [Douyin Xingtu creator audience](https://dataxapi.com/apis/douyin/xingtu/creators/audience/get/), [Douyin Xingtu creator metrics](https://dataxapi.com/apis/douyin/xingtu/creators/metrics/), [Douyin Xingtu creator video performance](https://dataxapi.com/apis/douyin/xingtu/creators/videos/list/), [Douyin Xingtu creator content keywords](https://dataxapi.com/apis/douyin/xingtu/creators/keywords/get/), [Douyin Xingtu creator index scores](https://dataxapi.com/apis/douyin/xingtu/creators/scores/get/), [Douyin Xingtu creator content mix](https://dataxapi.com/apis/douyin/xingtu/creators/content_mix/get/), [Douyin Xingtu creator conversion](https://dataxapi.com/apis/douyin/xingtu/creators/conversion/get/), [Douyin Xingtu marketing calendar](https://dataxapi.com/apis/douyin/xingtu/campaigns/list/)

Douyin endpoints: [Douyin comment replies](https://dataxapi.com/apis/douyin/comments/replies/list/), [Douyin hashtag videos](https://dataxapi.com/apis/douyin/hashtags/videos/list/), [Douyin hot search board](https://dataxapi.com/apis/douyin/trends/list/), [Douyin user profile](https://dataxapi.com/apis/douyin/users/get/), [Douyin creator engagement and follower trends](https://dataxapi.com/apis/douyin/users/history/), [Douyin user search](https://dataxapi.com/apis/douyin/users/search/), [Douyin user videos](https://dataxapi.com/apis/douyin/users/videos/list/), [Douyin video comments](https://dataxapi.com/apis/douyin/videos/comments/list/), [Douyin video detail](https://dataxapi.com/apis/douyin/videos/get/), [Douyin video play count](https://dataxapi.com/apis/douyin/videos/metrics/), [Douyin related videos](https://dataxapi.com/apis/douyin/videos/related/), [Douyin video search](https://dataxapi.com/apis/douyin/videos/search/), [Douyin trending videos](https://dataxapi.com/apis/douyin/videos/trending/)

Douyin trend-index endpoints: [Douyin trend-index brand trends](https://dataxapi.com/apis/douyin/index/brands/history/), [Douyin trend-index brand comparison](https://dataxapi.com/apis/douyin/index/brands/metrics/), [Douyin trend-index creator top videos](https://dataxapi.com/apis/douyin/index/creators/videos/list/), [Douyin trend-index creator follower profile](https://dataxapi.com/apis/douyin/index/creators/audience/get/), [Douyin trend-index creator core metrics](https://dataxapi.com/apis/douyin/index/creators/metrics/), [Douyin trend-index keyword audience](https://dataxapi.com/apis/douyin/index/keywords/audience/get/), [Douyin trend-index keyword trends](https://dataxapi.com/apis/douyin/index/keywords/history/), [Douyin trend-index related keywords](https://dataxapi.com/apis/douyin/index/keywords/related/), [Douyin trend-index live hot topics](https://dataxapi.com/apis/douyin/index/trends/list/), [Douyin trend-index keyword hot videos](https://dataxapi.com/apis/douyin/index/videos/search/)

Related: [All Douyin Xingtu endpoints](https://dataxapi.com/apis/douyin/xingtu/), [All Douyin endpoints](https://dataxapi.com/apis/douyin/), [Creators data](https://dataxapi.com/categories/creator/), [The xingtu creator scores object's fields](https://dataxapi.com/docs/objects/xingtu_creator_scores/)

## Questions

### How much does the Douyin Xingtu creator index scores API cost?

$0.0080 per call. The most one call can cost is $0.0080.

### When am I not charged?

Errors, timeouts and objects that do not exist are not charged.

### What happens if the object does not exist?

The answer is 404 not_found and nothing is charged. reason says which: not_found (it does not exist) or private_or_deleted.

---

Last checked 2026-10-18 19:59 UTC. Catalog revision c48ce454ae6c4c65. [HTML version](https://dataxapi.com/apis/douyin/xingtu/creators/scores/get/)
