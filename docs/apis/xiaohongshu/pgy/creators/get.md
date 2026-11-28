# Xiaohongshu (RedNote) PGY creator detail API

Get a Xiaohongshu creator's profile on PGY by creator ID: name, handle, location, content categories, followers, and in the full view what an image note and a video note cost, the least a note costs and whether each is open, sponsored notes in all and in the last 30 days, median reads and interactions, gender, content and persona tags, industries worked with, the agency (MCN) and likes and saves in all. One object a call; $0.0400 per call. Errors and timeouts are not charged.

- Endpoint: `GET https://api.dataxapi.com/v1/xiaohongshu/pgy/creators/get`
- ID: `xiaohongshu.pgy.creators.get`
- Also known as: rednote creator profile, xiaohongshu influencer pricing, Xiaohongshu PGY creator profile
- Price: $0.0400 / call
- Live status is not on this page, which is a snapshot. Read it with `GET https://api.dataxapi.com/v1/catalog/status`
- Returns: 1 object, one creator object
- Returns creator, a preview structure that may still change
- [Run it in the Playground](https://dataxapi.com/console/playground/?capability=xiaohongshu.pgy.creators.get&params=%7B%22id%22%3A%225c0017ef6b58b740c92463fb%22%7D)
- In Chinese: [小红书蒲公英博主详情 API](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/get/)

## What you get

The first row of a response recorded 2026-10-12 21:51 UTC.

| Field | Value |
| --- | --- |
| metrics.followers | 11,043 |

## Parameters

| Parameter | Type | required | Description |
| --- | --- | --- | --- |
| `id` | text | Yes | PGY creator ID, 24 hexadecimal characters; take it from the PGY creator search. Example: `5c0017ef6b58b740c92463fb`. |
| `view` | text |  | How much of each item to return. All three cost the same. Values: `compact`, `standard` (default), `full`. |
| `fields` | list of text |  | Return only these fields. Each by its path, such as `author.name`. |

## Returned fields

`data.item` is one creator object. Preview: the structure may change, announced beforehand.

Three views: `compact` (the most used fields, long text cut short), `standard` (the default: every standard field) and `full` (adds `ext`, the platform's own fields). A field is in the view named and in every larger one.

| Field | Type | Description | From view | This endpoint |
| --- | --- | --- | --- | --- |
| `id` | text | The creator's ID in the marketplace. | `compact` | Yes |
| `account_id` | text | ID of the creator's account on the platform, as the platform's account endpoints take it. | `compact` | Yes |
| `username` | text | Handle. | `compact` | Yes |
| `name` | text | Display name. | `compact` | Yes |
| `avatar_url` | link | Avatar. | `standard` | Yes |
| `location` | text | Where the creator is based, in the platform's words. | `standard` | Yes |
| `categories` | list of text | Content categories, first level, in the platform's words. | `compact` | Yes |
| `subcategories` | list of text | Content categories, second level, in the platform's words. | `standard` | Yes |
| `metrics` | object | Creator counts. | `compact` | Yes |
| `metrics.followers` | integer | Followers. | `compact` | Yes |
| `ext.rate_image_note` | amount | Rate for an image note, in yuan. | `full` | Yes |
| `ext.rate_video_note` | amount | Rate for a video note, in yuan. | `full` | Yes |
| `ext.rate_lowest` | amount | The lowest rate PGY gives (the lower of the image-note and video-note rates), in yuan. | `full` | Yes |
| `ext.sponsored_notes` | integer | Number of sponsored notes. | `full` | Yes |
| `ext.median_reads` | integer | Median reads of a note. | `full` | Yes |
| `ext.median_engagements` | integer | Median interactions of a note. | `full` | Yes |
| `ext.gender` | text | The creator's gender: female or male; null where the platform says unknown. Values: `female`, `male`. | `full` | Yes |
| `ext.feature_tags` | list of text | Content feature tags, in the platform's words (such as unboxing, reviews). | `full` | Yes |
| `ext.personal_tags` | list of text | Persona tags, in the platform's words (such as tech fan, mother). | `full` | Yes |
| `ext.industries` | list of text | Industries the creator has worked with, in the platform's words. | `full` | Yes |
| `ext.agency` | text | Name of the agency (MCN) the creator is signed to; null when there is none. | `full` | Yes |
| `ext.likes_and_favorites` | integer | Likes and saves the creator's notes have received in all, as the profile's likes-and-saves count. | `full` | Yes |
| `ext.accepts_sponsorship` | yes/no | Whether the creator currently takes sponsored work on PGY. | `full` | Yes |
| `ext.accepts_image_notes` | yes/no | Whether the creator takes sponsored image notes. | `full` | Yes |
| `ext.accepts_video_notes` | yes/no | Whether the creator takes sponsored video notes. | `full` | Yes |
| `ext.sponsored_notes_30d` | integer | Sponsored notes published in the last 30 days. | `full` | Yes |
| `ext.travel_areas` | list of text | The travel areas the creator lists on PGY, in the platform's words (a province, or a province and a city). | `full` | Yes |
| `approximate` | list of object | Which numbers of this item are approximate or lower bounds; absent when all are exact. | `compact` | Yes |
| `approximate[].field` | text | Path of the field, such as metrics.views. | `compact` | Yes |
| `approximate[].kind` | text | Approximate, or a lower bound. Values: `approximate`, `lower_bound`. | `compact` | Yes |

A field with no value on an item is `null`. A field this endpoint cannot give is left out and listed in `meta.unavailable`.

Typical size of one item: `compact` 180 B, `standard` 347 B, `full` 747 B (measured on the response recorded 2026-10-12 21:51 UTC).

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
curl -G "https://api.dataxapi.com/v1/xiaohongshu/pgy/creators/get" \
  --data-urlencode "id=5c0017ef6b58b740c92463fb" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
# pip install dataxapi
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.xiaohongshu.pgy.creators.get(id="5c0017ef6b58b740c92463fb")
print(result["data"]["item"])
```

### TypeScript

```typescript
// npm i @dataxapi/sdk
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.xiaohongshu.pgy.creators.get({ id: "5c0017ef6b58b740c92463fb" });
console.log(result.data.item);
```

### CLI

```bash
dataxapi call xiaohongshu.pgy.creators.get id=5c0017ef6b58b740c92463fb
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

Add this to your MCP client, then ask your agent to call `xiaohongshu.pgy.creators.get`.

## Responses

### 200

From a response recorded 2026-10-12 21:51 UTC. Names, text and IDs are examples, and so are the links: none is the recorded one (the page shows no one's personal data); the figures are as recorded. Long lists are cut. The request ID, cursor and balance are made up.

Size as sent: 673 B in the standard view (506 B compact, 1.0 KB full).

```jsonc
{
  "code": "ok",
  "request_id": "d4c40875-85f1-4408-8a36-1d006e97e0a2",
  "data": {
    "item": {
      "id": "6209fd5f00000000f4cd2191",
      "account_id": "6c6b1973000000002a5c263e",
      "username": "aya_living",
      "name": "认真生活的阿雅",
      "avatar_url": "https://sns-avatar-qc.xhscdn.com/avatar/66c033a300000000ab81d78c.jpg",
      "location": "北京",
      "categories": ["生活"],
      "subcategories": ["咖啡"],
      "metrics": { "followers": 11043 }
    }
  },
  "warnings": [],
  "meta": {
    "capability": "xiaohongshu.pgy.creators.get",
    "result_status": "complete",
    "fetched_at": "2026-10-12T21:51:54.000Z",
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
  "request_id": "df2a67ea-d407-4833-8137-52b0312e9c25",
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
  "request_id": "31b5a500-0735-41a6-a9b3-547cc3ae26be",
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
  "request_id": "839c4c91-d676-4780-ab19-8eda335bbcaf",
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
  "request_id": "6a99eb30-4f9e-47c1-9dc1-7aacf08418ea",
  "message": "No result came back this time and nothing was charged; retry shortly",
  "message_zh": "这次没有取到结果，没有扣费，可以稍后重试",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

This recorded response is 1,114 tokens as the platform's own JSON, 224 as DataXAPI's JSON, and 115 as an AI reads it through DataXAPI's MCP server: 90% fewer (counted 2026-11-06).

[This example as a JSON file](https://dataxapi.com/apis/xiaohongshu/pgy/creators/get.example.json)

## Use it in your AI

`dataxapi setup` gives the agents on your machine (Claude Code, Codex, Cursor) the DataXAPI MCP server and the base skill. The key is read from DATAXAPI_API_KEY; none is written into a file.

MCP server: `https://api.dataxapi.com/mcp`. The entry for your client is under MCP in the request examples of this page; then ask your agent to call `xiaohongshu.pgy.creators.get`.

Or paste this to any AI:

> Read https://dataxapi.com/apis/xiaohongshu/pgy/creators/get.md and help me use the DataXAPI endpoint xiaohongshu.pgy.creators.get (Xiaohongshu (RedNote) PGY creator detail).

[Open in ChatGPT](https://chatgpt.com/?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fxiaohongshu%2Fpgy%2Fcreators%2Fget.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20xiaohongshu.pgy.creators.get%20%28Xiaohongshu%20%28RedNote%29%20PGY%20creator%20detail%29.) · [Open in Claude](https://claude.ai/new?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fxiaohongshu%2Fpgy%2Fcreators%2Fget.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20xiaohongshu.pgy.creators.get%20%28Xiaohongshu%20%28RedNote%29%20PGY%20creator%20detail%29.)

## Related

Part of DataXAPI's Creators data. The same key also works for: Social media, Ads, E-commerce.

The same thing on other platforms: [Douyin Xingtu creator profile](https://dataxapi.com/apis/douyin/xingtu/creators/get/)

Xiaohongshu PGY endpoints: [Xiaohongshu PGY keyword search index](https://dataxapi.com/apis/xiaohongshu/pgy/keywords/history/), [Xiaohongshu PGY related keywords](https://dataxapi.com/apis/xiaohongshu/pgy/keywords/related/), [Xiaohongshu PGY creator search](https://dataxapi.com/apis/xiaohongshu/pgy/creators/search/), [Xiaohongshu PGY creator detail](https://dataxapi.com/apis/xiaohongshu/pgy/creators/get/), [Xiaohongshu PGY creator audience profile](https://dataxapi.com/apis/xiaohongshu/pgy/creators/audience/get/), [Xiaohongshu PGY creator metrics](https://dataxapi.com/apis/xiaohongshu/pgy/creators/metrics/), [Xiaohongshu PGY creator notes](https://dataxapi.com/apis/xiaohongshu/pgy/creators/notes/list/), [Xiaohongshu PGY creator follower history](https://dataxapi.com/apis/xiaohongshu/pgy/creators/followers/history/), [Xiaohongshu PGY similar creators](https://dataxapi.com/apis/xiaohongshu/pgy/creators/related/), [Xiaohongshu PGY trending notes](https://dataxapi.com/apis/xiaohongshu/pgy/notes/trending/), [Xiaohongshu PGY creator costs and data summary](https://dataxapi.com/apis/xiaohongshu/pgy/creators/costs/metrics/), [Xiaohongshu PGY creator follower summary](https://dataxapi.com/apis/xiaohongshu/pgy/creators/followers/metrics/), [Xiaohongshu PGY creator core figures history](https://dataxapi.com/apis/xiaohongshu/pgy/creators/costs/history/), [Xiaohongshu PGY note metrics](https://dataxapi.com/apis/xiaohongshu/pgy/notes/get/)

Xiaohongshu (RedNote) endpoints: [Xiaohongshu image search](https://dataxapi.com/apis/xiaohongshu/images/search/), [Xiaohongshu note detail](https://dataxapi.com/apis/xiaohongshu/notes/get/), [Xiaohongshu comment replies](https://dataxapi.com/apis/xiaohongshu/comments/replies/list/), [Xiaohongshu note comments](https://dataxapi.com/apis/xiaohongshu/notes/comments/list/), [Xiaohongshu note search](https://dataxapi.com/apis/xiaohongshu/notes/search/), [Xiaohongshu topic notes](https://dataxapi.com/apis/xiaohongshu/topics/notes/list/), [Xiaohongshu topic detail](https://dataxapi.com/apis/xiaohongshu/topics/get/), [Xiaohongshu trends](https://dataxapi.com/apis/xiaohongshu/trends/list/), [Xiaohongshu user profile](https://dataxapi.com/apis/xiaohongshu/users/get/), [Xiaohongshu user notes](https://dataxapi.com/apis/xiaohongshu/users/notes/list/), [Xiaohongshu user search](https://dataxapi.com/apis/xiaohongshu/users/search/), [Xiaohongshu search suggestions](https://dataxapi.com/apis/xiaohongshu/keywords/related/), [Xiaohongshu video note with its video and subtitles](https://dataxapi.com/apis/xiaohongshu/videos/get/), [Xiaohongshu video transcript (video to text)](https://dataxapi.com/apis/xiaohongshu/videos/transcript/get/), [RedNote (Xiaohongshu) image downloader, originals and live photos](https://dataxapi.com/apis/xiaohongshu/notes/media/get/), [RedNote (Xiaohongshu) video downloader](https://dataxapi.com/apis/xiaohongshu/videos/media/get/)

Xiaohongshu Shop endpoints: [Xiaohongshu product detail](https://dataxapi.com/apis/xiaohongshu/shop/products/get/), [Xiaohongshu product reviews](https://dataxapi.com/apis/xiaohongshu/shop/products/reviews/list/), [Xiaohongshu product search](https://dataxapi.com/apis/xiaohongshu/shop/products/search/)

How-to guides and answers: [Creator (KOL) data from Douyin and Xiaohongshu: profiles, posts and rates (2026)](https://dataxapi.com/answers/douyin-xiaohongshu-creator-data/), [Chinese social media marketing data tools: official tools and APIs (2026)](https://dataxapi.com/answers/chinese-social-media-marketing-data-tools/), [Xiaohongshu creator follower growth: followers day by day (2026)](https://dataxapi.com/answers/xiaohongshu-creator-follower-growth/), [How to find Xiaohongshu creators similar to one you like (2026)](https://dataxapi.com/answers/find-similar-xiaohongshu-creators/), [Xiaohongshu trending notes: getting the viral notes by API (2026)](https://dataxapi.com/answers/xiaohongshu-trending-notes-api/), [Xiaohongshu creator CPM, cost per engagement and cost per read: how to look them up (2026)](https://dataxapi.com/answers/xiaohongshu-creator-cpm-cost/), [Are a Xiaohongshu creator's followers real? Active, reading and buying followers (2026)](https://dataxapi.com/answers/xiaohongshu-creator-follower-quality/), [Choosing Xiaohongshu creators in bulk: building a creator list by API (2026)](https://dataxapi.com/answers/xiaohongshu-kol-selection-api/), [Every figure on a Xiaohongshu PGY creator page: can an API get it? Field by field (2026)](https://dataxapi.com/answers/xiaohongshu-pgy-creator-page-fields/), [How to list only a Xiaohongshu creator's sponsored notes (2026)](https://dataxapi.com/answers/xiaohongshu-creator-sponsored-notes/), [Is a Xiaohongshu creator easy to reach and active? How to check (2026)](https://dataxapi.com/answers/xiaohongshu-creator-easy-to-reach-active/), [Can PGY's find-creator filters be used through an API? (2026)](https://dataxapi.com/answers/xiaohongshu-pgy-find-creator-filters-api/), [Which values do PGY's creator filters take for category, feature, persona and location? The full list (2026)](https://dataxapi.com/answers/xiaohongshu-pgy-filter-values/), [Which creators has a competitor paid on Xiaohongshu? Working back from reported sponsored notes (2026)](https://dataxapi.com/answers/xiaohongshu-competitor-sponsored-creators/), [Shortlisting Xiaohongshu beauty and skincare creators in bulk by category, followers, rate and CPM (2026)](https://dataxapi.com/answers/xiaohongshu-beauty-skincare-creators/), [Xiaohongshu PGY or Douyin Xingtu: how they differ, and their creator data side by side (2026)](https://dataxapi.com/answers/xiaohongshu-pgy-vs-douyin-xingtu/)

Related: [All Xiaohongshu PGY endpoints](https://dataxapi.com/apis/xiaohongshu/pgy/), [All Xiaohongshu (RedNote) endpoints](https://dataxapi.com/apis/xiaohongshu/), [Creators data](https://dataxapi.com/categories/creator/), [The same thing on 2 platforms, side by side](https://dataxapi.com/roles/creators-get/), [The creator object's fields](https://dataxapi.com/docs/objects/creator/)

## Questions

### How much does the Xiaohongshu (RedNote) PGY creator detail API cost?

$0.0400 per call. The most one call can cost is $0.0400.

### When am I not charged?

Errors and timeouts are not charged.

### What happens if the object does not exist?

The answer is 404 not_found. charged and amount in the body say what this one cost. reason says which: not_found (it does not exist) or private_or_deleted.

---

Last checked 2026-11-28 06:28 UTC. Catalog revision ceced48b38f71468. [HTML version](https://dataxapi.com/apis/xiaohongshu/pgy/creators/get/)
