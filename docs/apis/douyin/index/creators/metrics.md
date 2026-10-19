# Douyin trend-index creator core metrics API

Get a Douyin creator's core figures from the platform's own index tool, by the account's numeric ID: new likes, followers, shares and comments a day on average over the last week and the last month, each as a ratio against the period before. An account the tool has nothing on (every figure 0) is answered as not found. One object a call; $0.0020 per call. Errors, timeouts and objects that do not exist are not charged.

- Endpoint: `GET https://api.dataxapi.com/v1/douyin/index/creators/metrics`
- ID: `douyin.index.creators.metrics`
- Also known as: douyin creator daily averages, douyin index creator core metrics, douyin creator growth
- Price: $0.0020 / call
- Live status is not on this page, which is a snapshot. Read it with `GET https://api.dataxapi.com/v1/catalog/status`
- Returns: 1 object, one douyin trend-index creator metrics object
- Returns douyin trend-index creator metrics, a preview structure that may still change
- [Run it in the Playground](https://dataxapi.com/console/playground/?capability=douyin.index.creators.metrics&params=%7B%22id%22%3A%2266598046050%22%7D)
- In Chinese: [抖音巨量算数达人核心指标 API](https://dataxapi.com/zh/apis/douyin/index/creators/metrics/)

## What you get

The first 8 rows of a response recorded 2026-10-13 03:24 UTC.

| Field | Value |
| --- | --- |
| average_7d.likes | 157,100.71 |
| average_7d.followers | 3,588 |
| average_7d.shares | 14,715.43 |
| average_7d.comments | 3,879.86 |
| average_30d.likes | 300,077.7 |
| average_30d.followers | 6,233.6 |
| average_30d.shares | 17,969.83 |
| average_30d.comments | 7,351.47 |

## Parameters

| Parameter | Type | required | Description |
| --- | --- | --- | --- |
| `id` | text | Yes | The account's numeric Douyin ID (uid), a string of digits; not the token starting with MS4w that the profile endpoint takes. Example: `66598046050`. |
| `view` | text |  | How much of each item to return. All three cost the same. Values: `compact`, `standard` (default), `full`. |
| `fields` | list of text |  | Return only these fields. Each by its path, such as `author.name`. |

## Returned fields

`data.item` is one douyin trend-index creator metrics object. Preview: the structure may change, announced beforehand.

Three views: `compact` (the most used fields, long text cut short), `standard` (the default: every standard field) and `full` (adds `ext`, the platform's own fields). A field is in the view named and in every larger one.

| Field | Type | Description | From view | This endpoint |
| --- | --- | --- | --- | --- |
| `creator_id` | text | The account's numeric ID (Douyin's uid): the one the request gave. | `compact` | Yes |
| `average_7d` | object | Daily averages over the last week. | `compact` | Yes |
| `average_7d.likes` | number | New likes a day, on average over the last week. | `compact` | Yes |
| `average_7d.followers` | number | New followers a day, on average over the last week. | `compact` | Yes |
| `average_7d.shares` | number | New shares a day, on average over the last week. | `compact` | Yes |
| `average_7d.comments` | number | New comments a day, on average over the last week. | `compact` | Yes |
| `average_30d` | object | Daily averages over the last month. | `compact` | Yes |
| `average_30d.likes` | number | New likes a day, on average over the last month. | `compact` | Yes |
| `average_30d.followers` | number | New followers a day, on average over the last month. | `compact` | Yes |
| `average_30d.shares` | number | New shares a day, on average over the last month. | `compact` | Yes |
| `average_30d.comments` | number | New comments a day, on average over the last month. | `compact` | Yes |
| `change_7d` | object | The last week's daily averages against the week before, as a ratio: 0.3 is 30% more, -0.5 is half as much. | `compact` | Yes |
| `change_7d.likes` | number | Change in new likes a day. | `compact` | Yes |
| `change_7d.followers` | number | Change in new followers a day. | `compact` | Yes |
| `change_7d.shares` | number | Change in new shares a day. | `compact` | Yes |
| `change_7d.comments` | number | Change in new comments a day. | `compact` | Yes |
| `change_30d` | object | The last month's daily averages against the month before, written the same way. | `compact` | Yes |
| `change_30d.likes` | number | Change in new likes a day. | `compact` | Yes |
| `change_30d.followers` | number | Change in new followers a day. | `compact` | Yes |
| `change_30d.shares` | number | Change in new shares a day. | `compact` | Yes |
| `change_30d.comments` | number | Change in new comments a day. | `compact` | Yes |
| `approximate` | list of object | Which numbers of this item are approximate or lower bounds; absent when all are exact. | `compact` | Yes |
| `approximate[].field` | text | Path of the field, such as metrics.views. | `compact` | Yes |
| `approximate[].kind` | text | Approximate, or a lower bound. Values: `approximate`, `lower_bound`. | `compact` | Yes |

A field with no value on an item is `null`. A field this endpoint cannot give is left out and listed in `meta.unavailable`.

Typical size of one item: `compact` 526 B, `standard` 526 B, `full` 526 B (measured on the response recorded 2026-10-13 03:24 UTC).

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
curl -G "https://api.dataxapi.com/v1/douyin/index/creators/metrics" \
  --data-urlencode "id=66598046050" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.douyin.index.creators.metrics(id="66598046050")
print(result["data"]["item"])
```

### TypeScript

```typescript
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.douyin.index.creators.metrics({ id: "66598046050" });
console.log(result.data.item);
```

### CLI

```bash
dataxapi call douyin.index.creators.metrics id=66598046050
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

Add this to your MCP client, then ask your agent to call `douyin.index.creators.metrics`.

## Responses

### 200

From a response recorded 2026-10-13 03:24 UTC. Names, text and IDs are examples, and so are the links: none is the recorded one (the page shows no one's personal data); the figures are as recorded. Long lists are cut. The request ID, cursor and balance are made up.

Size as sent: 853 B in the standard view (853 B compact, 853 B full).

```jsonc
{
  "code": "ok",
  "request_id": "1aa3d06c-7ce1-486b-ad2e-5fa3fdf7449d",
  "data": {
    "item": {
      "creator_id": "62430445852",
      "average_7d": {
        "likes": 157100.7142857143,
        "followers": 3588,
        "shares": 14715.42857142857,
        "comments": 3879.8571428571427
      },
      "average_30d": {
        "likes": 300077.7,
        "followers": 6233.6,
        "shares": 17969.833333333332,
        "comments": 7351.466666666666
      },
      "change_7d": {
        "likes": -0.20028666505711482,
        "followers": -0.1607298001737619,
        "shares": 0.8577740905729795,
        "comments": -0.28813692598028945
      },
      "change_30d": {
        "likes": -0.12000717497205526,
        "followers": -0.1316211058123174,
        "shares": -0.1697698557902584,
        "comments": -0.23841359186421957
      }
    }
  },
  "warnings": [],
  "meta": {
    "capability": "douyin.index.creators.metrics",
    "result_status": "complete",
    "fetched_at": "2026-10-13T03:24:56.000Z",
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
  "request_id": "d25a2d05-7e8c-48c7-baa8-9bf81406b6eb",
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
  "request_id": "3aadf25d-37a1-4d9e-a4ee-5abaafcec30e",
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
  "request_id": "87504d99-7e40-42be-92c3-0db84f2a56e9",
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
  "request_id": "9e2c4c99-3290-4de9-84ab-b0c566b9d1a5",
  "message": "The data source failed",
  "message_zh": "数据来源出错",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

[This example as a JSON file](https://dataxapi.com/apis/douyin/index/creators/metrics.example.json)

## Use it in your AI

`dataxapi setup` gives the agents on your machine (Claude Code, Codex, Cursor) the DataXAPI MCP server and the base skill. The key is read from DATAXAPI_API_KEY; none is written into a file.

MCP server: `https://api.dataxapi.com/mcp`. The entry for your client is under MCP in the request examples of this page; then ask your agent to call `douyin.index.creators.metrics`.

Or paste this to any AI:

> Read https://dataxapi.com/apis/douyin/index/creators/metrics.md and help me use the DataXAPI endpoint douyin.index.creators.metrics (Douyin trend-index creator core metrics).

[Open in ChatGPT](https://chatgpt.com/?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fdouyin%2Findex%2Fcreators%2Fmetrics.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20douyin.index.creators.metrics%20%28Douyin%20trend-index%20creator%20core%20metrics%29.) · [Open in Claude](https://claude.ai/new?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fdouyin%2Findex%2Fcreators%2Fmetrics.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20douyin.index.creators.metrics%20%28Douyin%20trend-index%20creator%20core%20metrics%29.)

## Related

Part of DataXAPI's Creators data. The same key also works for: Social media, Ads, E-commerce.

Douyin trend-index endpoints: [Douyin trend-index brand trends](https://dataxapi.com/apis/douyin/index/brands/history/), [Douyin trend-index brand comparison](https://dataxapi.com/apis/douyin/index/brands/metrics/), [Douyin trend-index creator top videos](https://dataxapi.com/apis/douyin/index/creators/videos/list/), [Douyin trend-index creator follower profile](https://dataxapi.com/apis/douyin/index/creators/audience/get/), [Douyin trend-index creator core metrics](https://dataxapi.com/apis/douyin/index/creators/metrics/), [Douyin trend-index keyword audience](https://dataxapi.com/apis/douyin/index/keywords/audience/get/), [Douyin trend-index keyword trends](https://dataxapi.com/apis/douyin/index/keywords/history/), [Douyin trend-index related keywords](https://dataxapi.com/apis/douyin/index/keywords/related/), [Douyin trend-index live hot topics](https://dataxapi.com/apis/douyin/index/trends/list/), [Douyin trend-index keyword hot videos](https://dataxapi.com/apis/douyin/index/videos/search/)

Douyin endpoints: [Douyin comment replies](https://dataxapi.com/apis/douyin/comments/replies/list/), [Douyin hashtag videos](https://dataxapi.com/apis/douyin/hashtags/videos/list/), [Douyin hot search board](https://dataxapi.com/apis/douyin/trends/list/), [Douyin user profile](https://dataxapi.com/apis/douyin/users/get/), [Douyin creator engagement and follower trends](https://dataxapi.com/apis/douyin/users/history/), [Douyin user search](https://dataxapi.com/apis/douyin/users/search/), [Douyin user videos](https://dataxapi.com/apis/douyin/users/videos/list/), [Douyin video comments](https://dataxapi.com/apis/douyin/videos/comments/list/), [Douyin video detail](https://dataxapi.com/apis/douyin/videos/get/), [Douyin video play count](https://dataxapi.com/apis/douyin/videos/metrics/), [Douyin related videos](https://dataxapi.com/apis/douyin/videos/related/), [Douyin video search](https://dataxapi.com/apis/douyin/videos/search/), [Douyin trending videos](https://dataxapi.com/apis/douyin/videos/trending/)

Douyin Xingtu endpoints: [Douyin Xingtu creator rate card](https://dataxapi.com/apis/douyin/xingtu/creators/rates/get/), [Douyin Xingtu creator search](https://dataxapi.com/apis/douyin/xingtu/creators/search/), [Douyin Xingtu creator profile](https://dataxapi.com/apis/douyin/xingtu/creators/get/), [Douyin Xingtu creator audience](https://dataxapi.com/apis/douyin/xingtu/creators/audience/get/), [Douyin Xingtu creator metrics](https://dataxapi.com/apis/douyin/xingtu/creators/metrics/), [Douyin Xingtu creator video performance](https://dataxapi.com/apis/douyin/xingtu/creators/videos/list/), [Douyin Xingtu creator content keywords](https://dataxapi.com/apis/douyin/xingtu/creators/keywords/get/), [Douyin Xingtu creator index scores](https://dataxapi.com/apis/douyin/xingtu/creators/scores/get/), [Douyin Xingtu creator content mix](https://dataxapi.com/apis/douyin/xingtu/creators/content_mix/get/), [Douyin Xingtu creator conversion](https://dataxapi.com/apis/douyin/xingtu/creators/conversion/get/), [Douyin Xingtu marketing calendar](https://dataxapi.com/apis/douyin/xingtu/campaigns/list/)

Related: [All Douyin trend-index endpoints](https://dataxapi.com/apis/douyin/index/), [All Douyin endpoints](https://dataxapi.com/apis/douyin/), [Creators data](https://dataxapi.com/categories/creator/), [The douyin trend-index creator metrics object's fields](https://dataxapi.com/docs/objects/index_creator_metrics/)

## Questions

### How much does the Douyin trend-index creator core metrics API cost?

$0.0020 per call. The most one call can cost is $0.0020.

### When am I not charged?

Errors, timeouts and objects that do not exist are not charged.

### What happens if the object does not exist?

The answer is 404 not_found and nothing is charged. reason says which: not_found (it does not exist) or private_or_deleted.

---

Last checked 2026-10-18 19:59 UTC. Catalog revision c48ce454ae6c4c65. [HTML version](https://dataxapi.com/apis/douyin/index/creators/metrics/)
