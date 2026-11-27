# Xiaohongshu (RedNote) PGY creator search API

Find Xiaohongshu creators on PGY by search terms, by the filters of PGY's creator square, or both: followers, the price of a sponsored note, estimated CPM, median reads and interactions of everyday and sponsored notes, image or video creators, content category, content feature, persona, where they are, gender, followers' gender and age, industry worked with lately; leaving out the inactive and those losing followers; ordered by followers, price, reads, interactions, shop visits, cost per read, invitations answered, growth, completion and more. Each with creator ID, name, handle, location, content categories and followers, and in the full view prices and medians. A search goes as far as its first 5,000 creators. The creator ID the other PGY endpoints take comes from here. Up to 20 items a call; $0.0400 per call. Errors and timeouts are not charged.

- Endpoint: `GET https://api.dataxapi.com/v1/xiaohongshu/pgy/creators/search`
- ID: `xiaohongshu.pgy.creators.search`
- Also known as: find xiaohongshu influencers, rednote creator search, filter xiaohongshu creators by followers and price
- Price: $0.0400 / call
- Live status is not on this page, which is a snapshot. Read it with `GET https://api.dataxapi.com/v1/catalog/status`
- Returns: 20 a page, a page, with a cursor for the next
- Returns creator, a preview structure that may still change
- [Run it in the Playground](https://dataxapi.com/console/playground/?capability=xiaohongshu.pgy.creators.search)
- In Chinese: [小红书蒲公英博主搜索 API](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/search/)

## What you get

The first row of a response recorded 2026-11-10 22:14 UTC.

| Field | Value |
| --- | --- |
| metrics.followers | 340,715 |

## Parameters

| Parameter | Type | required | Description |
| --- | --- | --- | --- |
| `query` | text |  | Search terms, matched against what creators' notes are about; for terms no creator matches the platform still returns loosely related creators, not an empty result. Leave out to find by the filters alone. Example: `咖啡`. |
| `sort` | text |  | Order: relevance (the default); most_followers; lowest_rate, highest_rate; most_reads, most_engagements, most_impressions (medians of everyday notes); most_sponsored_reads, most_sponsored_engagements, most_sponsored_impressions; most_shop_visits; lowest_read_cost_image, lowest_read_cost_video (estimated cost per read); highest_reply_rate; fastest_growth; most_active_followers; most_thousand_like_notes; highest_completion_rate (of videos). Values: `relevance` (default), `most_followers`, `lowest_rate`, `highest_rate`, `most_reads`, `most_engagements`, `most_impressions`, `most_sponsored_reads`, `most_sponsored_engagements`, `most_sponsored_impressions`, `most_shop_visits`, `lowest_read_cost_image`, `lowest_read_cost_video`, `highest_reply_rate`, `fastest_growth`, `most_active_followers`, `most_thousand_like_notes`, `highest_completion_rate`. Example: `lowest_rate`. |
| `followers_min` | integer |  | At least this many followers. Example: `10000`. |
| `followers_max` | integer |  | At most this many followers. Example: `50000`. |
| `rate_min` | integer |  | Rate at least this, in yuan: of an image note, or of a video note with type=video. Example: `3000`. |
| `rate_max` | integer |  | Rate at most this, in yuan: of an image note, or of a video note with type=video. Example: `8000`. |
| `cpm_min` | integer |  | Estimated CPM at least this, in yuan: of an image note, or of a video note with type=video. Example: `20`. |
| `cpm_max` | integer |  | Estimated CPM at most this, in yuan: of an image note, or of a video note with type=video. Example: `150`. |
| `median_reads_min` | integer |  | Median reads of everyday notes at least this. Example: `5000`. |
| `median_engagements_min` | integer |  | Median interactions of everyday notes at least this. Example: `300`. |
| `sponsored_median_reads_min` | integer |  | Median reads of sponsored notes at least this. Example: `8000`. |
| `type` | text |  | Creators mostly of image notes (image) or of video notes (video); both when left out. Values: `image`, `video`. Example: `video`. |
| `category` | text |  | Content category, top or second level (such as 护肤 or 面部保养), in PGY's own words; only a value of its dictionary is taken, anything else is a 400. Example: `护肤`. |
| `feature_tag` | text |  | Content feature, top or second level (such as vlog or 探店), in PGY's own words; only a value of its dictionary is taken, anything else is a 400. Example: `探店`. |
| `persona` | text |  | Persona, any level (such as 妈妈 or 职业身份), in PGY's own words; only a value of its dictionary is taken, anything else is a 400. Example: `妈妈`. |
| `location` | text |  | Where the creator is, a province or a city (such as 上海 or 杭州), in PGY's own words; only a value of its dictionary is taken, anything else is a 400. Example: `杭州`. |
| `gender` | text |  | The creator's gender: female or male. Values: `female`, `male`. Example: `female`. |
| `audience_gender` | text |  | Creators whose followers are mostly women (female) or men (male). Values: `female`, `male`. Example: `female`. |
| `audience_age` | text |  | The age band most of the followers are in: under_18, 18_24, 25_34, 35_44, over_44. Values: `under_18`, `18_24`, `25_34`, `35_44`, `over_44`. Example: `25_34`. |
| `industry` | text |  | Creators who worked with this industry lately: beauty, food_drink, mother_baby, electronics, household, fashion, internet, local_services, home_building, auto. Values: `beauty`, `food_drink`, `mother_baby`, `electronics`, `household`, `fashion`, `internet`, `local_services`, `home_building`, `auto`. Example: `beauty`. |
| `exclude` | text |  | Creators to leave out: low_active, the inactive; follower_drop, those losing followers; both. Values: `low_active`, `follower_drop`, `both`. Example: `both`. |
| `cursor` | text |  | Cursor returned by the previous page. Pass `page.next_cursor` of the page before, unchanged. Each page is charged as a call of its own. |
| `view` | text |  | How much of each item to return. All three cost the same. Values: `compact`, `standard` (default), `full`. |
| `fields` | list of text |  | Return only these fields. Each by its path, such as `author.name`. |

## Returned fields

`data.items` is a list of creator objects. Preview: the structure may change, announced beforehand.

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
| `ext.sponsored_notes` | integer | Number of sponsored notes. | `full` | Yes |
| `ext.median_reads` | integer | Median reads of a note. | `full` | Yes |
| `ext.median_engagements` | integer | Median interactions of a note. | `full` | Yes |
| `approximate` | list of object | Which numbers of this item are approximate or lower bounds; absent when all are exact. | `compact` | Yes |
| `approximate[].field` | text | Path of the field, such as metrics.views. | `compact` | Yes |
| `approximate[].kind` | text | Approximate, or a lower bound. Values: `approximate`, `lower_bound`. | `compact` | Yes |

A field with no value on an item is `null`. A field this endpoint cannot give is left out and listed in `meta.unavailable`.

Typical size of one item: `compact` 182 B, `standard` 381 B, `full` 511 B (measured on the response recorded 2026-11-10 22:14 UTC).

## Paging

20 items a page. The page size is the platform's; `limit` is not accepted.

For the next page pass `page.next_cursor` as `cursor`; a cursor is valid for 1 hour. `page.has_more` is false on the last page.

A search goes as far as its first 5,000 creators (250 pages): the platform gives no more, whatever the total says.

## When you are charged

| Case | Charged |
| --- | --- |
| A result with data | $0.0400, once per call |
| Each further page | charged as a call of its own |
| Invalid parameters, a failure or a timeout | not charged |
| The most one call can cost | $0.0400 (send `X-Max-Price` to refuse anything above your own limit) |

Prices as read 2026-11-27 06:18 UTC, under price book 23, in effect since 2026-11-27 06:13 UTC; the Playground reads the price in force before a run.

## Errors

Every error has the same structure: `code`, `message`, `charged`, `retry`, `retry_after_seconds`, `param`, `docs_url`.

| HTTP | Code | Meaning | Charged | Retry |
| --- | --- | --- | --- | --- |
| 400 | `invalid_params` | A parameter is invalid | No | After a fix |
| 400 | `request_not_served` | This combination of parameters cannot be served at present | No | After a fix |
| 400 | `max_price_exceeded` | The most this call could cost is above the limit you set | No | After a fix |
| 400 | `cursor_invalid` | The cursor does not exist | No | No |
| 400 | `cursor_mismatch` | The cursor was issued for another endpoint or other parameters | No | After a fix |
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
| 410 | `cursor_expired` | The cursor expired; start again from the first page | No | No |
| 410 | `run_expired` | This run has expired and starts no more calls | No | No |
| 429 | `rate_limited` | Too many requests, or too many calls in progress | No | Yes |
| 429 | `cost_cap_exceeded` | This account's allowance for today is used up | No | Yes |
| 429 | `uncharged_cost_limit` | Too many of this account's calls today returned nothing and were not charged; endpoints of this kind can be called again tomorrow (UTC) | No | Yes |
| 500 | `settlement_unknown` | Whether this call settled is not known; ask again with the same idempotency key, or look it up by request ID | Unknown: look the call up | With the same idempotency key |
| 500 | `internal_error` | The service failed | No | Yes |
| 502 | `upstream_failed` | No result came back this time and nothing was charged; retry shortly | No | Yes |
| 502 | `cursor_unavailable` | This cursor is unavailable just now; retry later or start again from the first page | No | Yes |
| 503 | `upstream_busy` | Busy just now; retry shortly | No | Yes |
| 503 | `capability_paused` | This endpoint is paused | No | Yes |
| 503 | `overloaded` | The service is busy; retry shortly | No | Yes |
| 504 | `timeout` | The data did not arrive in time; retry with the same idempotency key | No | Yes |

[All error codes](https://dataxapi.com/docs/errors/)

## Request

The key is read from the environment; no key is ever written into a page.

### cURL

```bash
curl "https://api.dataxapi.com/v1/xiaohongshu/pgy/creators/search" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
# pip install dataxapi
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.xiaohongshu.pgy.creators.search()
print(result["data"]["items"])
```

### TypeScript

```typescript
// npm i @dataxapi/sdk
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.xiaohongshu.pgy.creators.search();
console.log(result.data.items);
```

### CLI

```bash
dataxapi call xiaohongshu.pgy.creators.search
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

Add this to your MCP client, then ask your agent to call `xiaohongshu.pgy.creators.search`.

## Responses

### 200

From a response recorded 2026-11-10 22:14 UTC. Names, text and IDs are examples, and so are the links: none is the recorded one (the page shows no one's personal data); the figures are as recorded. Long lists are cut. The request ID, cursor and balance are made up.

Size as sent: 7.9 KB in the standard view (4.0 KB compact, 10.4 KB full).

```jsonc
{
  "code": "ok",
  "request_id": "925f8cc7-d891-4f23-8d87-46f8515c35e9",
  "data": {
    "items": [
      {
        "id": "6acd5beb00000000c8b10386",
        "account_id": "6d5583880000000059f95d40",
        "username": "ajie_diy",
        "name": "阿杰爱折腾",
        "avatar_url": "https://sns-avatar-qc.xhscdn.com/avatar/68d7218800000000a4989fa3.jpg",
        "location": "北京",
        "categories": ["生活"],
        "subcategories": ["咖啡"],
        "metrics": { "followers": 340715 }
      },
      // … 19 more
    ]
  },
  "page": {
    "next_cursor": "c1.tanuG8dT9ozo4D_Rnm44jKf3-2o-wxDT8ESWtMQB",
    "cursor_expires_at": "2026-11-10T23:14:22.000Z",
    "has_more": true,
    "returned": 20
  },
  "warnings": [],
  "meta": {
    "capability": "xiaohongshu.pgy.creators.search",
    "result_status": "complete",
    "fetched_at": "2026-11-10T22:14:22.000Z",
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

### Empty

From a recording of 2026-10-12 21:55 UTC, edited by hand to show this case. The request ID and balance are made up.

Size as sent: 414 B in the standard view (414 B compact, 414 B full).

```jsonc
{
  "code": "ok",
  "request_id": "088700a7-de0f-4ecd-89ad-ccdc650c2936",
  "data": { "items": [] },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 0
  },
  "warnings": [],
  "meta": {
    "capability": "xiaohongshu.pgy.creators.search",
    "result_status": "empty",
    "fetched_at": "2026-10-12T21:55:09.000Z",
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
  "request_id": "90b2b698-697b-490a-b7c3-996f1e4aaa0d",
  "message": "A parameter is invalid",
  "message_zh": "参数不合法",
  "charged": false,
  "retry": "after_fix",
  "retry_after_seconds": null,
  "param": null,
  "problems": [
    "sort must be one of relevance, most_followers, lowest_rate, highest_rate, most_reads, most_engagements, most_impressions, most_sponsored_reads, most_sponsored_engagements, most_sponsored_impressions, most_shop_visits, lowest_read_cost_image, lowest_read_cost_video, highest_reply_rate, fastest_growth, most_active_followers, most_thousand_like_notes, highest_completion_rate"
  ],
  "docs_url": "https://dataxapi.com/docs/errors#invalid_params"
}
```

### 402

An example written to the specification, not a recorded response.

```json
{
  "code": "insufficient_balance",
  "request_id": "a3c3b411-3410-44d0-a9a2-5a31c11e1bd8",
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

### 502

An example written to the specification, not a recorded response.

```json
{
  "code": "upstream_failed",
  "request_id": "018a554c-5ba8-41d5-8262-4d617e550f3c",
  "message": "No result came back this time and nothing was charged; retry shortly",
  "message_zh": "这次没有取到结果，没有扣费，可以稍后重试",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

This recorded response is 27k tokens as the platform's own JSON, 2,830 as DataXAPI's JSON, and 1,416 as an AI reads it through DataXAPI's MCP server: 95% fewer (counted 2026-11-06).

[This example as a JSON file](https://dataxapi.com/apis/xiaohongshu/pgy/creators/search.example.json)

## Use it in your AI

`dataxapi setup` gives the agents on your machine (Claude Code, Codex, Cursor) the DataXAPI MCP server and the base skill. The key is read from DATAXAPI_API_KEY; none is written into a file.

MCP server: `https://api.dataxapi.com/mcp`. The entry for your client is under MCP in the request examples of this page; then ask your agent to call `xiaohongshu.pgy.creators.search`.

Or paste this to any AI:

> Read https://dataxapi.com/apis/xiaohongshu/pgy/creators/search.md and help me use the DataXAPI endpoint xiaohongshu.pgy.creators.search (Xiaohongshu (RedNote) PGY creator search).

[Open in ChatGPT](https://chatgpt.com/?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fxiaohongshu%2Fpgy%2Fcreators%2Fsearch.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20xiaohongshu.pgy.creators.search%20%28Xiaohongshu%20%28RedNote%29%20PGY%20creator%20search%29.) · [Open in Claude](https://claude.ai/new?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fxiaohongshu%2Fpgy%2Fcreators%2Fsearch.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20xiaohongshu.pgy.creators.search%20%28Xiaohongshu%20%28RedNote%29%20PGY%20creator%20search%29.)

## Related

Part of DataXAPI's Creators data. The same key also works for: Social media, Ads, E-commerce.

The same thing on other platforms: [Douyin Xingtu creator search](https://dataxapi.com/apis/douyin/xingtu/creators/search/)

Xiaohongshu PGY endpoints: [Xiaohongshu PGY keyword search index](https://dataxapi.com/apis/xiaohongshu/pgy/keywords/history/), [Xiaohongshu PGY related keywords](https://dataxapi.com/apis/xiaohongshu/pgy/keywords/related/), [Xiaohongshu PGY creator search](https://dataxapi.com/apis/xiaohongshu/pgy/creators/search/), [Xiaohongshu PGY creator detail](https://dataxapi.com/apis/xiaohongshu/pgy/creators/get/), [Xiaohongshu PGY creator audience profile](https://dataxapi.com/apis/xiaohongshu/pgy/creators/audience/get/), [Xiaohongshu PGY creator metrics](https://dataxapi.com/apis/xiaohongshu/pgy/creators/metrics/), [Xiaohongshu PGY creator notes](https://dataxapi.com/apis/xiaohongshu/pgy/creators/notes/list/), [Xiaohongshu PGY creator follower history](https://dataxapi.com/apis/xiaohongshu/pgy/creators/followers/history/), [Xiaohongshu PGY similar creators](https://dataxapi.com/apis/xiaohongshu/pgy/creators/related/), [Xiaohongshu PGY trending notes](https://dataxapi.com/apis/xiaohongshu/pgy/notes/trending/), [Xiaohongshu PGY creator costs and data summary](https://dataxapi.com/apis/xiaohongshu/pgy/creators/costs/metrics/), [Xiaohongshu PGY creator follower summary](https://dataxapi.com/apis/xiaohongshu/pgy/creators/followers/metrics/), [Xiaohongshu PGY creator core figures history](https://dataxapi.com/apis/xiaohongshu/pgy/creators/costs/history/), [Xiaohongshu PGY note metrics](https://dataxapi.com/apis/xiaohongshu/pgy/notes/get/)

Xiaohongshu (RedNote) endpoints: [Xiaohongshu image search](https://dataxapi.com/apis/xiaohongshu/images/search/), [Xiaohongshu note detail](https://dataxapi.com/apis/xiaohongshu/notes/get/), [Xiaohongshu comment replies](https://dataxapi.com/apis/xiaohongshu/comments/replies/list/), [Xiaohongshu note comments](https://dataxapi.com/apis/xiaohongshu/notes/comments/list/), [Xiaohongshu note search](https://dataxapi.com/apis/xiaohongshu/notes/search/), [Xiaohongshu topic notes](https://dataxapi.com/apis/xiaohongshu/topics/notes/list/), [Xiaohongshu topic detail](https://dataxapi.com/apis/xiaohongshu/topics/get/), [Xiaohongshu trends](https://dataxapi.com/apis/xiaohongshu/trends/list/), [Xiaohongshu user profile](https://dataxapi.com/apis/xiaohongshu/users/get/), [Xiaohongshu user notes](https://dataxapi.com/apis/xiaohongshu/users/notes/list/), [Xiaohongshu user search](https://dataxapi.com/apis/xiaohongshu/users/search/), [Xiaohongshu search suggestions](https://dataxapi.com/apis/xiaohongshu/keywords/related/), [Xiaohongshu video note with its video and subtitles](https://dataxapi.com/apis/xiaohongshu/videos/get/), [Xiaohongshu video transcript (video to text)](https://dataxapi.com/apis/xiaohongshu/videos/transcript/get/), [RedNote (Xiaohongshu) image downloader, originals and live photos](https://dataxapi.com/apis/xiaohongshu/notes/media/get/), [RedNote (Xiaohongshu) video downloader](https://dataxapi.com/apis/xiaohongshu/videos/media/get/)

Xiaohongshu Shop endpoints: [Xiaohongshu product detail](https://dataxapi.com/apis/xiaohongshu/shop/products/get/), [Xiaohongshu product reviews](https://dataxapi.com/apis/xiaohongshu/shop/products/reviews/list/), [Xiaohongshu product search](https://dataxapi.com/apis/xiaohongshu/shop/products/search/)

How-to guides and answers: [How to look up Xiaohongshu (RedNote) PGY creator rates and audience](https://dataxapi.com/guides/xiaohongshu-pgy-creator-rates/), [How do I export Xiaohongshu (RedNote) data?](https://dataxapi.com/answers/export-xiaohongshu-data/), [Can ChatGPT read Xiaohongshu (RedNote)?](https://dataxapi.com/answers/can-chatgpt-read-xiaohongshu/), [What is CPE on Xiaohongshu PGY and on Douyin Xingtu?](https://dataxapi.com/answers/xiaohongshu-pgy-cpe-vs-xingtu-cpe/), [What is Xiaohongshu PGY?](https://dataxapi.com/answers/what-is-xiaohongshu-pgy/), [How do I export all of a Xiaohongshu creator's notes to Excel? (2026)](https://dataxapi.com/answers/export-xiaohongshu-creator-notes-excel/), [How do I collect the numbers of many Xiaohongshu notes after a campaign? (2026)](https://dataxapi.com/answers/collect-xiaohongshu-note-metrics-after-campaign/), [Do Chanmama, Qiangua and Newrank have APIs? What if I want the raw data? (2026)](https://dataxapi.com/answers/chanmama-qiangua-newrank-api/), [How do I export Xiaohongshu PGY creators in bulk? (2026)](https://dataxapi.com/answers/export-xiaohongshu-pgy-creators/), [Creator (KOL) data from Douyin and Xiaohongshu: profiles, posts and rates (2026)](https://dataxapi.com/answers/douyin-xiaohongshu-creator-data/), [Xiaohongshu creator follower growth: followers day by day (2026)](https://dataxapi.com/answers/xiaohongshu-creator-follower-growth/), [How to find Xiaohongshu creators similar to one you like (2026)](https://dataxapi.com/answers/find-similar-xiaohongshu-creators/), [Xiaohongshu creator CPM, cost per engagement and cost per read: how to look them up (2026)](https://dataxapi.com/answers/xiaohongshu-creator-cpm-cost/), [Xiaohongshu cost per spillover store visit: what it is and how to get it (2026)](https://dataxapi.com/answers/xiaohongshu-spillover-store-visit-cost/), [Choosing Xiaohongshu creators in bulk: building a creator list by API (2026)](https://dataxapi.com/answers/xiaohongshu-kol-selection-api/), [Every figure on a Xiaohongshu PGY creator page: can an API get it? Field by field (2026)](https://dataxapi.com/answers/xiaohongshu-pgy-creator-page-fields/), [Organic and promoted traffic on PGY notes: how to read organic reads alone (2026)](https://dataxapi.com/answers/xiaohongshu-pgy-organic-vs-promoted-reads/), [Is a Xiaohongshu creator easy to reach and active? How to check (2026)](https://dataxapi.com/answers/xiaohongshu-creator-easy-to-reach-active/), [Where a Xiaohongshu creator's notes get their traffic: explore, search, following (2026)](https://dataxapi.com/answers/xiaohongshu-note-traffic-sources/), [Can PGY's find-creator filters be used through an API? (2026)](https://dataxapi.com/answers/xiaohongshu-pgy-find-creator-filters-api/), [Can you see the reads and impressions of someone else's Xiaohongshu note? (2026)](https://dataxapi.com/answers/xiaohongshu-note-reads-impressions/), [Which values do PGY's creator filters take for category, feature, persona and location? The full list (2026)](https://dataxapi.com/answers/xiaohongshu-pgy-filter-values/), [Shortlisting Xiaohongshu beauty and skincare creators in bulk by category, followers, rate and CPM (2026)](https://dataxapi.com/answers/xiaohongshu-beauty-skincare-creators/), [How to shortlist Xiaohongshu tech and gadget creators in bulk (2026)](https://dataxapi.com/answers/xiaohongshu-tech-creators/), [Xiaohongshu PGY or Douyin Xingtu: how they differ, and their creator data side by side (2026)](https://dataxapi.com/answers/xiaohongshu-pgy-vs-douyin-xingtu/), [How do I collect Xiaohongshu data? The official back ends, plugins, scrapers and data APIs (2026)](https://dataxapi.com/answers/how-to-collect-xiaohongshu-data/)

Related: [All Xiaohongshu PGY endpoints](https://dataxapi.com/apis/xiaohongshu/pgy/), [All Xiaohongshu (RedNote) endpoints](https://dataxapi.com/apis/xiaohongshu/), [Creators data](https://dataxapi.com/categories/creator/), [The same thing on 2 platforms, side by side](https://dataxapi.com/roles/creators-search/), [The creator object's fields](https://dataxapi.com/docs/objects/creator/)

## Questions

### How much does the Xiaohongshu (RedNote) PGY creator search API cost?

$0.0400 per call. The most one call can cost is $0.0400.

### When am I not charged?

Errors and timeouts are not charged.

### How many items does one call return, and how do I get the next page?

20 items a page. The page size is the platform's; limit is not accepted. For the next page pass page.next_cursor as cursor; a cursor is valid for 1 hour. page.has_more is false on the last page.

---

Last checked 2026-11-27 06:18 UTC. Catalog revision 0264e2d6dd4ff743. [HTML version](https://dataxapi.com/apis/xiaohongshu/pgy/creators/search/)
