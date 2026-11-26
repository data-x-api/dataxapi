# Xiaohongshu (RedNote) PGY creator notes API

Get a page of a Xiaohongshu creator's notes by PGY creator ID (PGY's note cases), with the figures PGY gives for each: reads, likes, saves, shop visitors, whether it was sponsored and for which brand, and whether paid promotion sent it traffic. Sponsored, cross-domain sponsored, image or video notes alone; newest, most read or most engaged first; by content feature or category; reads of organic traffic alone. Up to 8 items a call; $0.0400 per call. Errors and timeouts are not charged.

- Endpoint: `GET https://api.dataxapi.com/v1/xiaohongshu/pgy/creators/notes/list`
- ID: `xiaohongshu.pgy.creators.notes.list`
- Also known as: rednote creator posts, xiaohongshu sponsored notes, pgy note cases
- Price: $0.0400 / call
- Live status is not on this page, which is a snapshot. Read it with `GET https://api.dataxapi.com/v1/catalog/status`
- Returns: 8 a page, a page, with a cursor for the next
- Returns pgy creator note, a preview structure that may still change
- [Run it in the Playground](https://dataxapi.com/console/playground/?capability=xiaohongshu.pgy.creators.notes.list&params=%7B%22id%22%3A%225c0017ef6b58b740c92463fb%22%7D)
- In Chinese: [小红书蒲公英博主笔记 API](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/notes/list/)

## What you get

The first 8 rows of a response recorded 2026-10-12 21:53 UTC.

| Field | Value |
| --- | --- |
| type | video |
| published_at | 2026-10-09 16:00 UTC |
| is_sponsored | false |
| is_promoted | false |
| metrics.views | 75 |
| metrics.likes | 5 |
| metrics.favorites | 1 |
| metrics.shop_visits | 0 |

## Parameters

| Parameter | Type | required | Description |
| --- | --- | --- | --- |
| `id` | text | Yes | PGY creator ID, 24 hexadecimal characters; take it from the PGY creator search. Example: `5c0017ef6b58b740c92463fb`. |
| `tab` | text |  | Which notes: all; sponsored, the sponsored notes alone (the page's 合作); cross_domain, the cross-domain sponsored notes alone (the page's 跨域合作, those with shop visitors). all by default. Values: `all` (default), `sponsored`, `cross_domain`. Example: `sponsored`. |
| `type` | text |  | Image notes (image) or video notes (video) alone; both when left out. Only with tab=all. Values: `image`, `video`. Example: `video`. |
| `sort` | text |  | Order: latest, newest first (the default); most_read, most read first; most_engaged, most interactions first. Values: `latest` (default), `most_read`, `most_engaged`. Example: `most_read`. |
| `traffic` | text |  | Which traffic reads count: all, promoted traffic included (the default); organic, organic traffic alone. It changes the reads only (recorded: 12,462 against 11,428 for one note); likes and saves stay the same. Values: `all` (default), `organic`. Example: `organic`. |
| `feature_tag` | text |  | Only notes with this content feature tag, written as in the creator detail's ext.feature_tags (such as vlog); a misspelt tag is no error, it finds nothing. Example: `vlog`. |
| `category` | text |  | Only notes of this content category, written as in the creator detail's categories or subcategories (such as 家居家装); a misspelt category is no error, it finds nothing. Example: `美妆`. |
| `cursor` | text |  | Cursor returned by the previous page. Pass `page.next_cursor` of the page before, unchanged. Each page is charged as a call of its own. |
| `view` | text |  | How much of each item to return. All three cost the same. Values: `compact`, `standard` (default), `full`. |
| `fields` | list of text |  | Return only these fields. Each by its path, such as `author.name`. |

`tab=sponsored` and `type` cannot be given together.

`tab=cross_domain` and `type` cannot be given together.

## Returned fields

`data.items` is a list of pgy creator note objects. Preview: the structure may change, announced beforehand.

Three views: `compact` (the most used fields, long text cut short), `standard` (the default: every standard field) and `full` (adds `ext`, the platform's own fields). A field is in the view named and in every larger one.

| Field | Type | Description | From view | This endpoint |
| --- | --- | --- | --- | --- |
| `id` | text | Note ID. | `compact` | Yes |
| `title` | text | The note's title. | `compact` | Yes |
| `type` | text | An image note or a video note. Values: `image`, `video`. | `compact` | Yes |
| `published_at` | time | The day it was published; the platform gives the day only, given as the start of that day in China time. | `compact` | Yes |
| `cover_url` | link | Address of the cover image. | `standard` | Yes |
| `is_sponsored` | yes/no | Whether it is a sponsored note: one with a brand it was made for (brand). | `compact` | Yes |
| `brand` | text | The brand it was made for, in the platform's words; null when it is not sponsored. | `compact` | Yes |
| `is_promoted` | yes/no | Whether paid promotion has sent traffic to the note (PGY marks it 含推广流量, "includes promoted traffic"). It is not whether the note is sponsored: a sponsored note may have none, an everyday note may have some. | `compact` | Yes |
| `metrics` | object | The note's figures. | `compact` | Yes |
| `metrics.views` | integer | Reads. | `compact` | Yes |
| `metrics.likes` | integer | Likes. | `compact` | Yes |
| `metrics.favorites` | integer | Saves. | `compact` | Yes |
| `metrics.shop_visits` | integer | Shop visitors the note brought (PGY's spillover store visits); only cross-domain sponsored notes have any, others give 0. | `standard` | Yes |
| `approximate` | list of object | Which numbers of this item are approximate or lower bounds; absent when all are exact. | `compact` | Yes |
| `approximate[].field` | text | Path of the field, such as metrics.views. | `compact` | Yes |
| `approximate[].kind` | text | Approximate, or a lower bound. Values: `approximate`, `lower_bound`. | `compact` | Yes |

A field with no value on an item is `null`. A field this endpoint cannot give is left out and listed in `meta.unavailable`.

Typical size of one item: `compact` 257 B, `standard` 391 B, `full` 391 B (measured on the response recorded 2026-10-12 21:53 UTC).

## Paging

8 items a page. The page size is the platform's; `limit` is not accepted.

For the next page pass `page.next_cursor` as `cursor`; a cursor is valid for 1 hour. `page.has_more` is false on the last page.

## When you are charged

| Case | Charged |
| --- | --- |
| A result with data | $0.0400, once per call |
| Each further page | charged as a call of its own |
| Invalid parameters, a failure or a timeout | not charged |
| The most one call can cost | $0.0400 (send `X-Max-Price` to refuse anything above your own limit) |

Prices as read 2026-11-26 12:17 UTC, under price book 22, in effect since 2026-11-25 13:46 UTC; the Playground reads the price in force before a run.

## If the object does not exist

A creator that does not exist cannot be told from a creator without notes: both return an empty result, not a 404.

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
curl -G "https://api.dataxapi.com/v1/xiaohongshu/pgy/creators/notes/list" \
  --data-urlencode "id=5c0017ef6b58b740c92463fb" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
# pip install dataxapi
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.xiaohongshu.pgy.creators.notes.list(id="5c0017ef6b58b740c92463fb")
print(result["data"]["items"])
```

### TypeScript

```typescript
// npm i @dataxapi/sdk
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.xiaohongshu.pgy.creators.notes.list({ id: "5c0017ef6b58b740c92463fb" });
console.log(result.data.items);
```

### CLI

```bash
dataxapi call xiaohongshu.pgy.creators.notes.list id=5c0017ef6b58b740c92463fb
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

Add this to your MCP client, then ask your agent to call `xiaohongshu.pgy.creators.notes.list`.

## Responses

### 200

From a response recorded 2026-10-12 21:53 UTC. Names, text and IDs are examples, and so are the links: none is the recorded one (the page shows no one's personal data); the figures are as recorded. Long lists are cut. The request ID, cursor and balance are made up.

Size as sent: 3.5 KB in the standard view (2.5 KB compact, 3.5 KB full).

```jsonc
{
  "code": "ok",
  "request_id": "bdb3a41f-7fe2-4640-adb7-0452e71839a0",
  "data": {
    "items": [
      {
        "id": "61ee962b00000000afb45a20",
        "title": "周末露营入门指南：一篇讲清楚",
        "type": "video",
        "published_at": "2026-10-09T16:00:00.000Z",
        "cover_url": "https://sns-webpic-qc.xhscdn.com/20261012/f8dcf3e698e1b1893a9f!nd_dft_wlteh_webp_3",
        "is_sponsored": false,
        "brand": null,
        "is_promoted": false,
        "metrics": {
          "views": 75,
          "likes": 5,
          "favorites": 1,
          "shop_visits": 0
        }
      },
      // … 7 more
    ]
  },
  "page": {
    "next_cursor": "c1.91LZucGby4XD8ETXsFWH_WXrXeIvfgCrZJxxMuwx",
    "cursor_expires_at": "2026-10-12T22:53:52.000Z",
    "has_more": true,
    "returned": 8
  },
  "warnings": [],
  "meta": {
    "capability": "xiaohongshu.pgy.creators.notes.list",
    "result_status": "complete",
    "fetched_at": "2026-10-12T21:53:52.000Z",
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

From a response recorded 2026-10-12 21:53 UTC. The request ID and balance are made up.

Size as sent: 418 B in the standard view (418 B compact, 418 B full).

```jsonc
{
  "code": "ok",
  "request_id": "158c1a13-e8b8-40cd-ad0d-c12632ee04c4",
  "data": { "items": [] },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 0
  },
  "warnings": [],
  "meta": {
    "capability": "xiaohongshu.pgy.creators.notes.list",
    "result_status": "empty",
    "fetched_at": "2026-10-12T21:53:54.000Z",
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
  "request_id": "6bb04556-2c98-4672-b7dc-b7500c95d4c9",
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
  "request_id": "a20237a4-3252-4660-8fb0-19cdc4bbf148",
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
  "request_id": "b758171d-01f2-4d08-9c93-b5c72dae326b",
  "message": "No result came back this time and nothing was charged; retry shortly",
  "message_zh": "这次没有取到结果，没有扣费，可以稍后重试",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

[This example as a JSON file](https://dataxapi.com/apis/xiaohongshu/pgy/creators/notes/list.example.json)

## Use it in your AI

`dataxapi setup` gives the agents on your machine (Claude Code, Codex, Cursor) the DataXAPI MCP server and the base skill. The key is read from DATAXAPI_API_KEY; none is written into a file.

MCP server: `https://api.dataxapi.com/mcp`. The entry for your client is under MCP in the request examples of this page; then ask your agent to call `xiaohongshu.pgy.creators.notes.list`.

Or paste this to any AI:

> Read https://dataxapi.com/apis/xiaohongshu/pgy/creators/notes/list.md and help me use the DataXAPI endpoint xiaohongshu.pgy.creators.notes.list (Xiaohongshu (RedNote) PGY creator notes).

[Open in ChatGPT](https://chatgpt.com/?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fxiaohongshu%2Fpgy%2Fcreators%2Fnotes%2Flist.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20xiaohongshu.pgy.creators.notes.list%20%28Xiaohongshu%20%28RedNote%29%20PGY%20creator%20notes%29.) · [Open in Claude](https://claude.ai/new?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fxiaohongshu%2Fpgy%2Fcreators%2Fnotes%2Flist.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20xiaohongshu.pgy.creators.notes.list%20%28Xiaohongshu%20%28RedNote%29%20PGY%20creator%20notes%29.)

## Related

Part of DataXAPI's Creators data. The same key also works for: Social media, Ads, E-commerce.

The same thing on other platforms: [Douyin Xingtu creator video performance](https://dataxapi.com/apis/douyin/xingtu/creators/videos/list/)

Xiaohongshu PGY endpoints: [Xiaohongshu PGY keyword search index](https://dataxapi.com/apis/xiaohongshu/pgy/keywords/history/), [Xiaohongshu PGY related keywords](https://dataxapi.com/apis/xiaohongshu/pgy/keywords/related/), [Xiaohongshu PGY creator search](https://dataxapi.com/apis/xiaohongshu/pgy/creators/search/), [Xiaohongshu PGY creator detail](https://dataxapi.com/apis/xiaohongshu/pgy/creators/get/), [Xiaohongshu PGY creator audience profile](https://dataxapi.com/apis/xiaohongshu/pgy/creators/audience/get/), [Xiaohongshu PGY creator metrics](https://dataxapi.com/apis/xiaohongshu/pgy/creators/metrics/), [Xiaohongshu PGY creator notes](https://dataxapi.com/apis/xiaohongshu/pgy/creators/notes/list/), [Xiaohongshu PGY creator follower history](https://dataxapi.com/apis/xiaohongshu/pgy/creators/followers/history/), [Xiaohongshu PGY similar creators](https://dataxapi.com/apis/xiaohongshu/pgy/creators/related/), [Xiaohongshu PGY trending notes](https://dataxapi.com/apis/xiaohongshu/pgy/notes/trending/), [Xiaohongshu PGY creator costs and data summary](https://dataxapi.com/apis/xiaohongshu/pgy/creators/costs/metrics/), [Xiaohongshu PGY creator follower summary](https://dataxapi.com/apis/xiaohongshu/pgy/creators/followers/metrics/), [Xiaohongshu PGY creator core figures history](https://dataxapi.com/apis/xiaohongshu/pgy/creators/costs/history/), [Xiaohongshu PGY note metrics](https://dataxapi.com/apis/xiaohongshu/pgy/notes/get/)

Xiaohongshu (RedNote) endpoints: [Xiaohongshu image search](https://dataxapi.com/apis/xiaohongshu/images/search/), [Xiaohongshu note detail](https://dataxapi.com/apis/xiaohongshu/notes/get/), [Xiaohongshu comment replies](https://dataxapi.com/apis/xiaohongshu/comments/replies/list/), [Xiaohongshu note comments](https://dataxapi.com/apis/xiaohongshu/notes/comments/list/), [Xiaohongshu note search](https://dataxapi.com/apis/xiaohongshu/notes/search/), [Xiaohongshu topic notes](https://dataxapi.com/apis/xiaohongshu/topics/notes/list/), [Xiaohongshu topic detail](https://dataxapi.com/apis/xiaohongshu/topics/get/), [Xiaohongshu trends](https://dataxapi.com/apis/xiaohongshu/trends/list/), [Xiaohongshu user profile](https://dataxapi.com/apis/xiaohongshu/users/get/), [Xiaohongshu user notes](https://dataxapi.com/apis/xiaohongshu/users/notes/list/), [Xiaohongshu user search](https://dataxapi.com/apis/xiaohongshu/users/search/), [Xiaohongshu search suggestions](https://dataxapi.com/apis/xiaohongshu/keywords/related/), [Xiaohongshu video note with its video and subtitles](https://dataxapi.com/apis/xiaohongshu/videos/get/), [Xiaohongshu video transcript (video to text)](https://dataxapi.com/apis/xiaohongshu/videos/transcript/get/), [RedNote (Xiaohongshu) image downloader, originals and live photos](https://dataxapi.com/apis/xiaohongshu/notes/media/get/), [RedNote (Xiaohongshu) video downloader](https://dataxapi.com/apis/xiaohongshu/videos/media/get/)

Xiaohongshu Shop endpoints: [Xiaohongshu product detail](https://dataxapi.com/apis/xiaohongshu/shop/products/get/), [Xiaohongshu product reviews](https://dataxapi.com/apis/xiaohongshu/shop/products/reviews/list/), [Xiaohongshu product search](https://dataxapi.com/apis/xiaohongshu/shop/products/search/)

How-to guides and answers: [What is Xiaohongshu PGY?](https://dataxapi.com/answers/what-is-xiaohongshu-pgy/), [How do I export all of a Xiaohongshu creator's notes to Excel? (2026)](https://dataxapi.com/answers/export-xiaohongshu-creator-notes-excel/), [How do I collect the numbers of many Xiaohongshu notes after a campaign? (2026)](https://dataxapi.com/answers/collect-xiaohongshu-note-metrics-after-campaign/), [How do I sync Xiaohongshu note data to a Feishu Base? (2026)](https://dataxapi.com/answers/xiaohongshu-feishu-base/), [How do I export Xiaohongshu PGY creators in bulk? (2026)](https://dataxapi.com/answers/export-xiaohongshu-pgy-creators/), [Every figure on a Xiaohongshu PGY creator page: can an API get it? Field by field (2026)](https://dataxapi.com/answers/xiaohongshu-pgy-creator-page-fields/), [Organic and promoted traffic on PGY notes: how to read organic reads alone (2026)](https://dataxapi.com/answers/xiaohongshu-pgy-organic-vs-promoted-reads/), [How to list only a Xiaohongshu creator's sponsored notes (2026)](https://dataxapi.com/answers/xiaohongshu-creator-sponsored-notes/), [A Xiaohongshu sponsored note's campaign figures (impressions, reads, follows) by API (2026)](https://dataxapi.com/answers/xiaohongshu-sponsored-note-campaign-report/), [Where a Xiaohongshu creator's notes get their traffic: explore, search, following (2026)](https://dataxapi.com/answers/xiaohongshu-note-traffic-sources/), [How to tell a Xiaohongshu note reported as sponsored (2026)](https://dataxapi.com/answers/xiaohongshu-sponsored-note-detection/), [Can you see the reads and impressions of someone else's Xiaohongshu note? (2026)](https://dataxapi.com/answers/xiaohongshu-note-reads-impressions/), [Which creators has a competitor paid on Xiaohongshu? Working back from reported sponsored notes (2026)](https://dataxapi.com/answers/xiaohongshu-competitor-sponsored-creators/), [How to shortlist Xiaohongshu tech and gadget creators in bulk (2026)](https://dataxapi.com/answers/xiaohongshu-tech-creators/)

Related: [All Xiaohongshu PGY endpoints](https://dataxapi.com/apis/xiaohongshu/pgy/), [All Xiaohongshu (RedNote) endpoints](https://dataxapi.com/apis/xiaohongshu/), [Creators data](https://dataxapi.com/categories/creator/), [The same thing on 2 platforms, side by side](https://dataxapi.com/roles/creators-posts-list/), [The pgy creator note object's fields](https://dataxapi.com/docs/objects/pgy_creator_post/)

## Questions

### How much does the Xiaohongshu (RedNote) PGY creator notes API cost?

$0.0400 per call. The most one call can cost is $0.0400.

### When am I not charged?

Errors and timeouts are not charged.

### How many items does one call return, and how do I get the next page?

8 items a page. The page size is the platform's; limit is not accepted. For the next page pass page.next_cursor as cursor; a cursor is valid for 1 hour. page.has_more is false on the last page.

### What happens if the object does not exist?

A creator that does not exist cannot be told from a creator without notes: both return an empty result, not a 404.

---

Last checked 2026-11-26 12:17 UTC. Catalog revision 0051cce45e9530b9. [HTML version](https://dataxapi.com/apis/xiaohongshu/pgy/creators/notes/list/)
