# Xiaohongshu (RedNote) PGY creator costs and data summary API

Get what a Xiaohongshu creator is expected to cost, by PGY creator ID: the estimated CPM, cost per interaction, cost per read and cost per shop visitor of an image note and of a video note, each with the share of comparable creators it beats; the median impressions, reads, interactions and shop visitors of a note, follower growth and notes published over 30 days, the share of invitations answered within 48 hours and the "easy to reach" mark, active days of the last 7 and the "active" mark, the strength PGY marks, the content mix and the industries worked with. Of everyday or of sponsored notes. One object a call; $0.0400 per call. Errors and timeouts are not charged.

- Endpoint: `GET https://api.dataxapi.com/v1/xiaohongshu/pgy/creators/costs/metrics`
- ID: `xiaohongshu.pgy.creators.costs.metrics`
- Also known as: Xiaohongshu PGY creator data summary, xiaohongshu creator cpm, rednote creator cost per engagement, xiaohongshu creator spillover store visit cost
- Price: $0.0400 / call
- Live status is not on this page, which is a snapshot. Read it with `GET https://api.dataxapi.com/v1/catalog/status`
- Returns: 1 object, one pgy creator costs and summary object
- Returns pgy creator costs and summary, a preview structure that may still change
- [Run it in the Playground](https://dataxapi.com/console/playground/?capability=xiaohongshu.pgy.creators.costs.metrics&params=%7B%22id%22%3A%225c0017ef6b58b740c92463fb%22%7D)
- In Chinese: [小红书蒲公英博主合作成本和数据概览 API](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/costs/metrics/)

## What you get

The first 2 rows of a response recorded 2026-11-10 09:54 UTC.

| share |
| --- |
| 39.5% |
| 39.5% |

## Parameters

| Parameter | Type | required | Description |
| --- | --- | --- | --- |
| `id` | text | Yes | PGY creator ID, 24 hexadecimal characters; take it from the PGY creator search. Example: `5c0017ef6b58b740c92463fb`. |
| `tab` | text |  | Whose figures: everyday for the creator's everyday notes, sponsored for the sponsored ones; everyday by default, as the two tabs of the creator's PGY page. Values: `everyday` (default), `sponsored`. Example: `sponsored`. |
| `view` | text |  | How much of each item to return. All three cost the same. Values: `compact`, `standard` (default), `full`. |
| `fields` | list of text |  | Return only these fields. Each by its path, such as `author.name`. |

## Returned fields

`data.item` is one pgy creator costs and summary object. Preview: the structure may change, announced beforehand.

Three views: `compact` (the most used fields, long text cut short), `standard` (the default: every standard field) and `full` (adds `ext`, the platform's own fields). A field is in the view named and in every larger one.

| Field | Type | Description | From view | This endpoint |
| --- | --- | --- | --- | --- |
| `creator_id` | text | PGY creator ID. | `compact` | Yes |
| `date` | time | The day the figures are of: a calendar day in China time (UTC+8), written as midnight UTC of its date. | `compact` | Yes |
| `currency` | text | Currency of the costs below. | `compact` | Yes |
| `image_cpm` | amount | Estimated CPM of an image note (cost of a thousand impressions), in yuan; null where PGY has no estimate. | `compact` | Yes |
| `image_cpm_percentile` | number | Share of comparable creators whose image-note CPM is higher (PGY's "better than peers"), 0 to 1. | `standard` | Yes |
| `video_cpm` | amount | Estimated CPM of a video note (cost of a thousand impressions), in yuan; null where PGY has no estimate. | `compact` | Yes |
| `video_cpm_percentile` | number | Share of comparable creators whose video-note CPM is higher (PGY's "better than peers"), 0 to 1. | `standard` | Yes |
| `image_cpe` | amount | Estimated cost per interaction of an image note, in yuan; null where PGY has no estimate. | `compact` | Yes |
| `image_cpe_percentile` | number | Share of comparable creators whose image-note cost per interaction is higher (PGY's "better than peers"), 0 to 1. | `standard` | Yes |
| `video_cpe` | amount | Estimated cost per interaction of a video note, in yuan; null where PGY has no estimate. | `compact` | Yes |
| `video_cpe_percentile` | number | Share of comparable creators whose video-note cost per interaction is higher (PGY's "better than peers"), 0 to 1. | `standard` | Yes |
| `image_read_cost` | amount | Estimated cost per read of an image note, in yuan; null where PGY has no estimate. | `compact` | Yes |
| `image_read_cost_percentile` | number | Share of comparable creators whose image-note cost per read is higher (PGY's "better than peers"), 0 to 1. | `standard` | Yes |
| `video_read_cost` | amount | Estimated cost per read of a video note, in yuan; null where PGY has no estimate. | `compact` | Yes |
| `video_read_cost_percentile` | number | Share of comparable creators whose video-note cost per read is higher (PGY's "better than peers"), 0 to 1. | `standard` | Yes |
| `image_shop_visit_cost` | amount | Estimated cost per shop visitor an image note brings (PGY's spillover store visits), in yuan; null where PGY has no estimate. | `compact` | Yes |
| `image_shop_visit_cost_percentile` | number | Share of comparable creators whose image-note cost per shop visitor is higher (PGY's "better than peers"), 0 to 1. | `standard` | Yes |
| `video_shop_visit_cost` | amount | Estimated cost per shop visitor a video note brings (PGY's spillover store visits), in yuan; null where PGY has no estimate. | `compact` | Yes |
| `video_shop_visit_cost_percentile` | number | Share of comparable creators whose video-note cost per shop visitor is higher (PGY's "better than peers"), 0 to 1. | `standard` | Yes |
| `median_impressions` | integer | Median impressions of a note. | `compact` | Yes |
| `median_impressions_percentile` | number | Share of comparable creators whose median impressions it exceeds, 0 to 1. | `standard` | Yes |
| `median_reads` | integer | Median reads of a note. | `compact` | Yes |
| `median_reads_percentile` | number | Share of comparable creators whose median reads it exceeds, 0 to 1. | `standard` | Yes |
| `median_engagements` | integer | Median interactions of a note. | `compact` | Yes |
| `median_engagements_percentile` | number | Share of comparable creators whose median interactions it exceeds, 0 to 1. | `standard` | Yes |
| `median_shop_visits` | integer | Median shop visitors a note brings. | `compact` | Yes |
| `median_shop_visits_percentile` | number | Share of comparable creators whose median shop visitors it exceeds, 0 to 1. | `standard` | Yes |
| `follower_growth` | number | Follower growth over the last 30 days: 0.037 is 3.7% more; negative when followers were lost. | `standard` | Yes |
| `follower_growth_percentile` | number | Share of comparable creators whose follower growth it exceeds, 0 to 1. | `standard` | Yes |
| `invite_reply_rate` | number | Share of collaboration invitations answered within 48 hours, 0 to 1. | `standard` | Yes |
| `easy_to_reach` | yes/no | Whether PGY marks the creator "easy to reach" (好联系, the mark beside the invitation reply rate on the page). | `standard` | Yes |
| `active_days_7d` | integer | Days active in the last 7. | `standard` | Yes |
| `is_active` | yes/no | Whether PGY marks the creator "active" (活跃, the mark beside the active days of the last 7 on the page). | `standard` | Yes |
| `notes_30d` | integer | Notes published in the last 30 days, everyday and sponsored alike (the page's "notes published"); the same in either tab. | `standard` | Yes |
| `highlight` | text | The strength PGY marks the creator with, in its words (a title for a kind of creator); null when none. | `standard` | Yes |
| `highlight_reason` | text | PGY's explanation of that strength, in its words (such as which figure ranks in what top share of peers). | `standard` | Yes |
| `content_mix` | list of object | The share of the creator's notes in each content category, largest first. | `standard` | Yes |
| `content_mix[].category` | text | The content category, in the platform's words. | `standard` | Yes |
| `content_mix[].share` | number | The share, 0 to 1. | `standard` | Yes |
| `industries` | list of text | Industries the creator has worked with, in the platform's words. | `standard` | Yes |
| `approximate` | list of object | Which numbers of this item are approximate or lower bounds; absent when all are exact. | `compact` | Yes |
| `approximate[].field` | text | Path of the field, such as metrics.views. | `compact` | Yes |
| `approximate[].kind` | text | Approximate, or a lower bound. Values: `approximate`, `lower_bound`. | `compact` | Yes |

A field with no value on an item is `null`. A field this endpoint cannot give is left out and listed in `meta.unavailable`.

Typical size of one item: `compact` 389 B, `standard` 1.1 KB, `full` 1.1 KB (measured on the response recorded 2026-11-10 09:54 UTC).

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
curl -G "https://api.dataxapi.com/v1/xiaohongshu/pgy/creators/costs/metrics" \
  --data-urlencode "id=5c0017ef6b58b740c92463fb" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
# pip install dataxapi
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.xiaohongshu.pgy.creators.costs.metrics(id="5c0017ef6b58b740c92463fb")
print(result["data"]["item"])
```

### TypeScript

```typescript
// npm i @dataxapi/sdk
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.xiaohongshu.pgy.creators.costs.metrics({ id: "5c0017ef6b58b740c92463fb" });
console.log(result.data.item);
```

### CLI

```bash
dataxapi call xiaohongshu.pgy.creators.costs.metrics id=5c0017ef6b58b740c92463fb
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

Add this to your MCP client, then ask your agent to call `xiaohongshu.pgy.creators.costs.metrics`.

## Responses

### 200

From a response recorded 2026-11-10 09:54 UTC. Names, text and IDs are examples, and so are the links: none is the recorded one (the page shows no one's personal data); the figures are as recorded. Long lists are cut. The request ID, cursor and balance are made up.

Size as sent: 1.5 KB in the standard view (725 B compact, 1.5 KB full).

```jsonc
{
  "code": "ok",
  "request_id": "bb971f60-5fe0-4bb2-b564-1a4e97a63ada",
  "data": {
    "item": {
      "creator_id": "64b916ab000000009bfb830e",
      "date": "2026-11-09T00:00:00Z",
      "currency": "CNY",
      "image_cpm": "1202.709",
      "image_cpm_percentile": 0.0998,
      "video_cpm": "11556.0641",
      "video_cpm_percentile": 0.0188,
      "image_cpe": "572.2222",
      "image_cpe_percentile": 0.0227,
      "video_cpe": "214.5833",
      "video_cpe_percentile": 0.0411,
      "image_read_cost": "25.2377",
      "image_read_cost_percentile": 0.7452,
      "video_read_cost": "76.313",
      "video_read_cost_percentile": 0.7667,
      "image_shop_visit_cost": null,
      "image_shop_visit_cost_percentile": null,
      "video_shop_visit_cost": null,
      "video_shop_visit_cost_percentile": null,
      "median_impressions": 2200,
      "median_impressions_percentile": 0.4551,
      "median_reads": 302,
      "median_reads_percentile": 0.4167,
      "median_engagements": 22,
      "median_engagements_percentile": 0.4319,
      "median_shop_visits": 0,
      "median_shop_visits_percentile": 0,
      "follower_growth": 0.001,
      "follower_growth_percentile": 0.683,
      "invite_reply_rate": 0.375,
      "easy_to_reach": false,
      "active_days_7d": 7,
      "is_active": true,
      "notes_30d": 38,
      "highlight": "周末的周末露营日常，随手记录一下",
      "highlight_reason": "周末露营｜第一次尝试就爱上了，清单放评论区",
      "content_mix": [
        { "category": "周末露营｜第一次尝试就爱上了，清单放评论区", "share": 0.395 },
        { "category": "周末露营这件事，越简单越好", "share": 0.395 }
      ],
      "industries": []
    }
  },
  "warnings": [],
  "meta": {
    "capability": "xiaohongshu.pgy.creators.costs.metrics",
    "result_status": "complete",
    "fetched_at": "2026-11-10T09:54:23.000Z",
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
  "request_id": "784288a1-306a-466e-afbc-f2a691cf902b",
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
  "request_id": "ca5577ef-d28d-4551-9a4a-dd2fd55c92cb",
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
  "request_id": "7db2bd90-e442-4554-8391-1ec7cba882fd",
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
  "request_id": "43171eb8-84c2-4553-a585-01db0a83409a",
  "message": "No result came back this time and nothing was charged; retry shortly",
  "message_zh": "这次没有取到结果，没有扣费，可以稍后重试",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

[This example as a JSON file](https://dataxapi.com/apis/xiaohongshu/pgy/creators/costs/metrics.example.json)

## Use it in your AI

`dataxapi setup` gives the agents on your machine (Claude Code, Codex, Cursor) the DataXAPI MCP server and the base skill. The key is read from DATAXAPI_API_KEY; none is written into a file.

MCP server: `https://api.dataxapi.com/mcp`. The entry for your client is under MCP in the request examples of this page; then ask your agent to call `xiaohongshu.pgy.creators.costs.metrics`.

Or paste this to any AI:

> Read https://dataxapi.com/apis/xiaohongshu/pgy/creators/costs/metrics.md and help me use the DataXAPI endpoint xiaohongshu.pgy.creators.costs.metrics (Xiaohongshu (RedNote) PGY creator costs and data summary).

[Open in ChatGPT](https://chatgpt.com/?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fxiaohongshu%2Fpgy%2Fcreators%2Fcosts%2Fmetrics.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20xiaohongshu.pgy.creators.costs.metrics%20%28Xiaohongshu%20%28RedNote%29%20PGY%20creator%20costs%20and%20data%20summary%29.) · [Open in Claude](https://claude.ai/new?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fxiaohongshu%2Fpgy%2Fcreators%2Fcosts%2Fmetrics.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20xiaohongshu.pgy.creators.costs.metrics%20%28Xiaohongshu%20%28RedNote%29%20PGY%20creator%20costs%20and%20data%20summary%29.)

## Related

Part of DataXAPI's Creators data. The same key also works for: Social media, Ads, E-commerce.

Xiaohongshu PGY endpoints: [Xiaohongshu PGY keyword search index](https://dataxapi.com/apis/xiaohongshu/pgy/keywords/history/), [Xiaohongshu PGY related keywords](https://dataxapi.com/apis/xiaohongshu/pgy/keywords/related/), [Xiaohongshu PGY creator search](https://dataxapi.com/apis/xiaohongshu/pgy/creators/search/), [Xiaohongshu PGY creator detail](https://dataxapi.com/apis/xiaohongshu/pgy/creators/get/), [Xiaohongshu PGY creator audience profile](https://dataxapi.com/apis/xiaohongshu/pgy/creators/audience/get/), [Xiaohongshu PGY creator metrics](https://dataxapi.com/apis/xiaohongshu/pgy/creators/metrics/), [Xiaohongshu PGY creator notes](https://dataxapi.com/apis/xiaohongshu/pgy/creators/notes/list/), [Xiaohongshu PGY creator follower history](https://dataxapi.com/apis/xiaohongshu/pgy/creators/followers/history/), [Xiaohongshu PGY similar creators](https://dataxapi.com/apis/xiaohongshu/pgy/creators/related/), [Xiaohongshu PGY trending notes](https://dataxapi.com/apis/xiaohongshu/pgy/notes/trending/), [Xiaohongshu PGY creator costs and data summary](https://dataxapi.com/apis/xiaohongshu/pgy/creators/costs/metrics/), [Xiaohongshu PGY creator follower summary](https://dataxapi.com/apis/xiaohongshu/pgy/creators/followers/metrics/), [Xiaohongshu PGY creator core figures history](https://dataxapi.com/apis/xiaohongshu/pgy/creators/costs/history/), [Xiaohongshu PGY note metrics](https://dataxapi.com/apis/xiaohongshu/pgy/notes/get/)

Xiaohongshu (RedNote) endpoints: [Xiaohongshu image search](https://dataxapi.com/apis/xiaohongshu/images/search/), [Xiaohongshu note detail](https://dataxapi.com/apis/xiaohongshu/notes/get/), [Xiaohongshu comment replies](https://dataxapi.com/apis/xiaohongshu/comments/replies/list/), [Xiaohongshu note comments](https://dataxapi.com/apis/xiaohongshu/notes/comments/list/), [Xiaohongshu note search](https://dataxapi.com/apis/xiaohongshu/notes/search/), [Xiaohongshu topic notes](https://dataxapi.com/apis/xiaohongshu/topics/notes/list/), [Xiaohongshu topic detail](https://dataxapi.com/apis/xiaohongshu/topics/get/), [Xiaohongshu trends](https://dataxapi.com/apis/xiaohongshu/trends/list/), [Xiaohongshu user profile](https://dataxapi.com/apis/xiaohongshu/users/get/), [Xiaohongshu user notes](https://dataxapi.com/apis/xiaohongshu/users/notes/list/), [Xiaohongshu user search](https://dataxapi.com/apis/xiaohongshu/users/search/), [Xiaohongshu search suggestions](https://dataxapi.com/apis/xiaohongshu/keywords/related/), [Xiaohongshu video note with its video and subtitles](https://dataxapi.com/apis/xiaohongshu/videos/get/), [Xiaohongshu video transcript (video to text)](https://dataxapi.com/apis/xiaohongshu/videos/transcript/get/), [RedNote (Xiaohongshu) image downloader, originals and live photos](https://dataxapi.com/apis/xiaohongshu/notes/media/get/), [RedNote (Xiaohongshu) video downloader](https://dataxapi.com/apis/xiaohongshu/videos/media/get/)

Xiaohongshu Shop endpoints: [Xiaohongshu product detail](https://dataxapi.com/apis/xiaohongshu/shop/products/get/), [Xiaohongshu product reviews](https://dataxapi.com/apis/xiaohongshu/shop/products/reviews/list/), [Xiaohongshu product search](https://dataxapi.com/apis/xiaohongshu/shop/products/search/)

How-to guides and answers: [Xiaohongshu creator CPM, cost per engagement and cost per read: how to look them up (2026)](https://dataxapi.com/answers/xiaohongshu-creator-cpm-cost/), [Xiaohongshu cost per spillover store visit: what it is and how to get it (2026)](https://dataxapi.com/answers/xiaohongshu-spillover-store-visit-cost/), [Xiaohongshu creator CPM day by day: PGY's core figures trend (2026)](https://dataxapi.com/answers/xiaohongshu-creator-cpm-trend/), [Choosing Xiaohongshu creators in bulk: building a creator list by API (2026)](https://dataxapi.com/answers/xiaohongshu-kol-selection-api/), [Every figure on a Xiaohongshu PGY creator page: can an API get it? Field by field (2026)](https://dataxapi.com/answers/xiaohongshu-pgy-creator-page-fields/), [Is a Xiaohongshu creator easy to reach and active? How to check (2026)](https://dataxapi.com/answers/xiaohongshu-creator-easy-to-reach-active/), [Can PGY's find-creator filters be used through an API? (2026)](https://dataxapi.com/answers/xiaohongshu-pgy-find-creator-filters-api/), [Shortlisting Xiaohongshu beauty and skincare creators in bulk by category, followers, rate and CPM (2026)](https://dataxapi.com/answers/xiaohongshu-beauty-skincare-creators/), [Xiaohongshu PGY or Douyin Xingtu: how they differ, and their creator data side by side (2026)](https://dataxapi.com/answers/xiaohongshu-pgy-vs-douyin-xingtu/)

Related: [All Xiaohongshu PGY endpoints](https://dataxapi.com/apis/xiaohongshu/pgy/), [All Xiaohongshu (RedNote) endpoints](https://dataxapi.com/apis/xiaohongshu/), [Creators data](https://dataxapi.com/categories/creator/), [The pgy creator costs and summary object's fields](https://dataxapi.com/docs/objects/pgy_creator_costs/)

## Questions

### How much does the Xiaohongshu (RedNote) PGY creator costs and data summary API cost?

$0.0400 per call. The most one call can cost is $0.0400.

### When am I not charged?

Errors and timeouts are not charged.

### What happens if the object does not exist?

The answer is 404 not_found. charged and amount in the body say what this one cost. reason says which: not_found (it does not exist) or private_or_deleted.

---

Last checked 2026-11-27 06:18 UTC. Catalog revision 0264e2d6dd4ff743. [HTML version](https://dataxapi.com/apis/xiaohongshu/pgy/creators/costs/metrics/)
