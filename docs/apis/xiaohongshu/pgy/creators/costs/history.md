# Xiaohongshu (RedNote) PGY creator core figures history API

Get a Xiaohongshu creator's core figures for each of the last 30 or 90 days, by PGY creator ID: CPM, CPE (cost per interaction), CPV (cost per read), cost per shop visitor, and the median impressions, reads, interactions and shop visitors of a note, with the same figures for the whole period. Of everyday or of sponsored notes: shows whether a creator is getting better or worse value. One object a call; $0.0400 per call. Errors and timeouts are not charged.

- Endpoint: `GET https://api.dataxapi.com/v1/xiaohongshu/pgy/creators/costs/history`
- ID: `xiaohongshu.pgy.creators.costs.history`
- Also known as: Xiaohongshu PGY creator core trend, xiaohongshu creator daily cpm, rednote creator cpe history
- Price: $0.0400 / call
- Live status is not on this page, which is a snapshot. Read it with `GET https://api.dataxapi.com/v1/catalog/status`
- Returns: 1 object, one pgy creator core figures history object
- Returns pgy creator core figures history, a preview structure that may still change
- [Run it in the Playground](https://dataxapi.com/console/playground/?capability=xiaohongshu.pgy.creators.costs.history&params=%7B%22id%22%3A%225c0017ef6b58b740c92463fb%22%7D)
- In Chinese: [小红书蒲公英博主核心数据趋势 API](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/costs/history/)

## What you get

The first 2 rows of a response recorded 2026-11-10 09:54 UTC.

| date | cpm | cpe | cpv | median_impressions | median_reads | median_engagements | median_shop_visits |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 2026-10-11 | 4.4683 | 0.8324 | 0.0108 | 6,713,899 | 6,511,479 | 36,041 | 0 |
| 2026-10-12 | 4.1886 | 0.5148 | 0.0104 | 7,162,338 | 6,749,230 | 58,279 | 0 |

## Parameters

| Parameter | Type | required | Description |
| --- | --- | --- | --- |
| `id` | text | Yes | PGY creator ID, 24 hexadecimal characters; take it from the PGY creator search. Example: `5c0017ef6b58b740c92463fb`. |
| `window` | text |  | The period: the last 30 or the last 90 days; 30d by default. Values: `30d` (default), `90d`. Example: `30d`. |
| `tab` | text |  | Whose figures: everyday for the creator's everyday notes, sponsored for the sponsored ones; everyday by default, as the two tabs of the creator's PGY page. Values: `everyday` (default), `sponsored`. Example: `everyday`. |
| `view` | text |  | How much of each item to return. All three cost the same. Values: `compact`, `standard` (default), `full`. |
| `fields` | list of text |  | Return only these fields. Each by its path, such as `author.name`. |

## Returned fields

`data.item` is one pgy creator core figures history object. Preview: the structure may change, announced beforehand.

Three views: `compact` (the most used fields, long text cut short), `standard` (the default: every standard field) and `full` (adds `ext`, the platform's own fields). A field is in the view named and in every larger one.

| Field | Type | Description | From view | This endpoint |
| --- | --- | --- | --- | --- |
| `creator_id` | text | PGY creator ID. | `compact` | Yes |
| `days` | integer | How many of the most recent days the figures cover. | `compact` | Yes |
| `currency` | text | Currency of the costs. | `compact` | Yes |
| `date` | time | The day the period's figures run to: a calendar day in China time (UTC+8), written as midnight UTC of its date. | `compact` | Yes |
| `cpm` | amount | CPM: the cost of a thousand impressions, in yuan; null where there is none. | `compact` | Yes |
| `cpe` | amount | CPE: the cost of one interaction, in yuan; null where there is none. | `compact` | Yes |
| `cpv` | amount | CPV: the cost of one read, in yuan, as PGY's trend chart works it out; null where there is none. | `compact` | Yes |
| `shop_visit_cost` | amount | Cost per shop visitor a note brings (PGY's spillover store visits), in yuan; null where there is none. | `compact` | Yes |
| `median_impressions` | integer | Median impressions of a note. | `compact` | Yes |
| `median_reads` | integer | Median reads of a note. | `compact` | Yes |
| `median_engagements` | integer | Median interactions of a note. | `compact` | Yes |
| `median_shop_visits` | integer | Median shop visitors a note brings (PGY's spillover store visits); a note that brought none counts as 0. | `compact` | Yes |
| `points` | list of object | The figures day by day, one entry a day, oldest first: each the figures PGY worked out that day. | `compact` | Yes |
| `points[].date` | time | The day: a calendar day in China time (UTC+8), written as midnight UTC of its date. | `compact` | Yes |
| `points[].cpm` | amount | CPM: the cost of a thousand impressions, in yuan; null where there is none. | `compact` | Yes |
| `points[].cpe` | amount | CPE: the cost of one interaction, in yuan; null where there is none. | `compact` | Yes |
| `points[].cpv` | amount | CPV: the cost of one read, in yuan, as PGY's trend chart works it out; null where there is none. | `compact` | Yes |
| `points[].shop_visit_cost` | amount | Cost per shop visitor a note brings (PGY's spillover store visits), in yuan; null where there is none. | `compact` | Yes |
| `points[].median_impressions` | integer | Median impressions of a note. | `compact` | Yes |
| `points[].median_reads` | integer | Median reads of a note. | `compact` | Yes |
| `points[].median_engagements` | integer | Median interactions of a note. | `compact` | Yes |
| `points[].median_shop_visits` | integer | Median shop visitors a note brings (PGY's spillover store visits); a note that brought none counts as 0. | `compact` | Yes |
| `approximate` | list of object | Which numbers of this item are approximate or lower bounds; absent when all are exact. | `compact` | Yes |
| `approximate[].field` | text | Path of the field, such as metrics.views. | `compact` | Yes |
| `approximate[].kind` | text | Approximate, or a lower bound. Values: `approximate`, `lower_bound`. | `compact` | Yes |

A field with no value on an item is `null`. A field this endpoint cannot give is left out and listed in `meta.unavailable`.

Typical size of one item: `compact` 6.2 KB, `standard` 6.2 KB, `full` 6.2 KB (measured on the response recorded 2026-11-10 09:54 UTC).

## Paging

One object per call: there is nothing to page.

## When you are charged

| Case | Charged |
| --- | --- |
| A result with data | $0.0400, once per call |
| Invalid parameters, a failure or a timeout | not charged |
| The most one call can cost | $0.0400 (send `X-Max-Price` to refuse anything above your own limit) |

Prices as read 2026-11-27 06:18 UTC, under price book 23, in effect since 2026-11-27 06:13 UTC; the Playground reads the price in force before a run.

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
curl -G "https://api.dataxapi.com/v1/xiaohongshu/pgy/creators/costs/history" \
  --data-urlencode "id=5c0017ef6b58b740c92463fb" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
# pip install dataxapi
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.xiaohongshu.pgy.creators.costs.history(id="5c0017ef6b58b740c92463fb")
print(result["data"]["item"])
```

### TypeScript

```typescript
// npm i @dataxapi/sdk
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.xiaohongshu.pgy.creators.costs.history({ id: "5c0017ef6b58b740c92463fb" });
console.log(result.data.item);
```

### CLI

```bash
dataxapi call xiaohongshu.pgy.creators.costs.history id=5c0017ef6b58b740c92463fb
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

Add this to your MCP client, then ask your agent to call `xiaohongshu.pgy.creators.costs.history`.

## Responses

### 200

From a response recorded 2026-11-10 09:54 UTC. Names, text and IDs are examples, and so are the links: none is the recorded one (the page shows no one's personal data); the figures are as recorded. Long lists are cut. The request ID, cursor and balance are made up.

Size as sent: 6.5 KB in the standard view (6.5 KB compact, 6.5 KB full).

```jsonc
{
  "code": "ok",
  "request_id": "71c96749-f3f4-4d85-9452-3a5438bfa3ad",
  "data": {
    "item": {
      "creator_id": "6db7d6c4000000008ff2aa80",
      "days": 30,
      "currency": "CNY",
      "date": "2026-11-09T00:00:00Z",
      "cpm": "6.2482",
      "cpe": "0.8591",
      "cpv": "0.0153",
      "shop_visit_cost": null,
      "median_impressions": 4801380,
      "median_reads": 4570345,
      "median_engagements": 34920,
      "median_shop_visits": 0,
      "points": [
        {
          "date": "2026-10-11T00:00:00Z",
          "cpm": "4.4683",
          "cpe": "0.8324",
          "cpv": "0.0108",
          "shop_visit_cost": null,
          "median_impressions": 6713899,
          "median_reads": 6511479,
          "median_engagements": 36041,
          "median_shop_visits": 0
        },
        {
          "date": "2026-10-12T00:00:00Z",
          "cpm": "4.1886",
          "cpe": "0.5148",
          "cpv": "0.0104",
          "shop_visit_cost": null,
          "median_impressions": 7162338,
          "median_reads": 6749230,
          "median_engagements": 58279,
          "median_shop_visits": 0
        },
        // … 28 more
      ]
    }
  },
  "warnings": [],
  "meta": {
    "capability": "xiaohongshu.pgy.creators.costs.history",
    "result_status": "complete",
    "fetched_at": "2026-11-10T09:54:34.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {},
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
  "request_id": "21d26ffa-bd05-4652-99e6-ee5ccac9bc10",
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
  "request_id": "e1da7d40-e24f-4b81-aa5a-1d818a19fe38",
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
  "request_id": "1c4a2d62-ed26-4322-a11a-d2e92641135e",
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
  "request_id": "2fd160d5-d54a-43c1-ba68-daa49122d658",
  "message": "No result came back this time and nothing was charged; retry shortly",
  "message_zh": "这次没有取到结果，没有扣费，可以稍后重试",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

[This example as a JSON file](https://dataxapi.com/apis/xiaohongshu/pgy/creators/costs/history.example.json)

## Use it in your AI

`dataxapi setup` gives the agents on your machine (Claude Code, Codex, Cursor) the DataXAPI MCP server and the base skill. The key is read from DATAXAPI_API_KEY; none is written into a file.

MCP server: `https://api.dataxapi.com/mcp`. The entry for your client is under MCP in the request examples of this page; then ask your agent to call `xiaohongshu.pgy.creators.costs.history`.

Or paste this to any AI:

> Read https://dataxapi.com/apis/xiaohongshu/pgy/creators/costs/history.md and help me use the DataXAPI endpoint xiaohongshu.pgy.creators.costs.history (Xiaohongshu (RedNote) PGY creator core figures history).

[Open in ChatGPT](https://chatgpt.com/?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fxiaohongshu%2Fpgy%2Fcreators%2Fcosts%2Fhistory.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20xiaohongshu.pgy.creators.costs.history%20%28Xiaohongshu%20%28RedNote%29%20PGY%20creator%20core%20figures%20history%29.) · [Open in Claude](https://claude.ai/new?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fxiaohongshu%2Fpgy%2Fcreators%2Fcosts%2Fhistory.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20xiaohongshu.pgy.creators.costs.history%20%28Xiaohongshu%20%28RedNote%29%20PGY%20creator%20core%20figures%20history%29.)

## Related

Part of DataXAPI's Creators data. The same key also works for: Social media, Ads, E-commerce.

Xiaohongshu PGY endpoints: [Xiaohongshu PGY keyword search index](https://dataxapi.com/apis/xiaohongshu/pgy/keywords/history/), [Xiaohongshu PGY related keywords](https://dataxapi.com/apis/xiaohongshu/pgy/keywords/related/), [Xiaohongshu PGY creator search](https://dataxapi.com/apis/xiaohongshu/pgy/creators/search/), [Xiaohongshu PGY creator detail](https://dataxapi.com/apis/xiaohongshu/pgy/creators/get/), [Xiaohongshu PGY creator audience profile](https://dataxapi.com/apis/xiaohongshu/pgy/creators/audience/get/), [Xiaohongshu PGY creator metrics](https://dataxapi.com/apis/xiaohongshu/pgy/creators/metrics/), [Xiaohongshu PGY creator notes](https://dataxapi.com/apis/xiaohongshu/pgy/creators/notes/list/), [Xiaohongshu PGY creator follower history](https://dataxapi.com/apis/xiaohongshu/pgy/creators/followers/history/), [Xiaohongshu PGY similar creators](https://dataxapi.com/apis/xiaohongshu/pgy/creators/related/), [Xiaohongshu PGY trending notes](https://dataxapi.com/apis/xiaohongshu/pgy/notes/trending/), [Xiaohongshu PGY creator costs and data summary](https://dataxapi.com/apis/xiaohongshu/pgy/creators/costs/metrics/), [Xiaohongshu PGY creator follower summary](https://dataxapi.com/apis/xiaohongshu/pgy/creators/followers/metrics/), [Xiaohongshu PGY creator core figures history](https://dataxapi.com/apis/xiaohongshu/pgy/creators/costs/history/), [Xiaohongshu PGY note metrics](https://dataxapi.com/apis/xiaohongshu/pgy/notes/get/)

Xiaohongshu (RedNote) endpoints: [Xiaohongshu image search](https://dataxapi.com/apis/xiaohongshu/images/search/), [Xiaohongshu note detail](https://dataxapi.com/apis/xiaohongshu/notes/get/), [Xiaohongshu comment replies](https://dataxapi.com/apis/xiaohongshu/comments/replies/list/), [Xiaohongshu note comments](https://dataxapi.com/apis/xiaohongshu/notes/comments/list/), [Xiaohongshu note search](https://dataxapi.com/apis/xiaohongshu/notes/search/), [Xiaohongshu topic notes](https://dataxapi.com/apis/xiaohongshu/topics/notes/list/), [Xiaohongshu topic detail](https://dataxapi.com/apis/xiaohongshu/topics/get/), [Xiaohongshu trends](https://dataxapi.com/apis/xiaohongshu/trends/list/), [Xiaohongshu user profile](https://dataxapi.com/apis/xiaohongshu/users/get/), [Xiaohongshu user notes](https://dataxapi.com/apis/xiaohongshu/users/notes/list/), [Xiaohongshu user search](https://dataxapi.com/apis/xiaohongshu/users/search/), [Xiaohongshu search suggestions](https://dataxapi.com/apis/xiaohongshu/keywords/related/), [Xiaohongshu video note with its video and subtitles](https://dataxapi.com/apis/xiaohongshu/videos/get/), [Xiaohongshu video transcript (video to text)](https://dataxapi.com/apis/xiaohongshu/videos/transcript/get/), [RedNote (Xiaohongshu) image downloader, originals and live photos](https://dataxapi.com/apis/xiaohongshu/notes/media/get/), [RedNote (Xiaohongshu) video downloader](https://dataxapi.com/apis/xiaohongshu/videos/media/get/)

Xiaohongshu Shop endpoints: [Xiaohongshu product detail](https://dataxapi.com/apis/xiaohongshu/shop/products/get/), [Xiaohongshu product reviews](https://dataxapi.com/apis/xiaohongshu/shop/products/reviews/list/), [Xiaohongshu product search](https://dataxapi.com/apis/xiaohongshu/shop/products/search/)

How-to guides and answers: [Xiaohongshu creator CPM, cost per engagement and cost per read: how to look them up (2026)](https://dataxapi.com/answers/xiaohongshu-creator-cpm-cost/), [Xiaohongshu cost per spillover store visit: what it is and how to get it (2026)](https://dataxapi.com/answers/xiaohongshu-spillover-store-visit-cost/), [Xiaohongshu creator CPM day by day: PGY's core figures trend (2026)](https://dataxapi.com/answers/xiaohongshu-creator-cpm-trend/), [Every figure on a Xiaohongshu PGY creator page: can an API get it? Field by field (2026)](https://dataxapi.com/answers/xiaohongshu-pgy-creator-page-fields/)

Related: [All Xiaohongshu PGY endpoints](https://dataxapi.com/apis/xiaohongshu/pgy/), [All Xiaohongshu (RedNote) endpoints](https://dataxapi.com/apis/xiaohongshu/), [Creators data](https://dataxapi.com/categories/creator/), [The pgy creator core figures history object's fields](https://dataxapi.com/docs/objects/pgy_creator_cost_history/)

## Questions

### How much does the Xiaohongshu (RedNote) PGY creator core figures history API cost?

$0.0400 per call. The most one call can cost is $0.0400.

### When am I not charged?

Errors and timeouts are not charged.

### What happens if the object does not exist?

The answer is 404 not_found. charged and amount in the body say what this one cost. reason says which: not_found (it does not exist) or private_or_deleted.

---

Last checked 2026-11-27 06:18 UTC. Catalog revision 0264e2d6dd4ff743. [HTML version](https://dataxapi.com/apis/xiaohongshu/pgy/creators/costs/history/)
