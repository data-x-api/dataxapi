# Xiaohongshu (RedNote) PGY note metrics API

Get the figures PGY shows a brand for one Xiaohongshu note, by note ID: impressions, reads, likes, saves, comments, shares and the follows it brought, the brand it was reported for, the click-through band of the brand's components (comment area, text, bottom), and its title, text, pictures, time published and creator ID. For closing a sponsored note's campaign and checking what a creator delivered. PGY keeps figures for its creators' notes only; a note it has none for (such as a brand's own) is a 404. One object a call; $0.0400 per call. Errors and timeouts are not charged.

- Endpoint: `GET https://api.dataxapi.com/v1/xiaohongshu/pgy/notes/get`
- ID: `xiaohongshu.pgy.notes.get`
- Also known as: xiaohongshu note impressions, rednote sponsored note report
- Price: $0.0400 / call
- Live status is not on this page, which is a snapshot. Read it with `GET https://api.dataxapi.com/v1/catalog/status`
- Returns: 1 object, one pgy note detail object
- Returns pgy note detail, a preview structure that may still change
- [Run it in the Playground](https://dataxapi.com/console/playground/?capability=xiaohongshu.pgy.notes.get&params=%7B%22id%22%3A%226a20edfa0000000021020951%22%7D)
- In Chinese: [小红书蒲公英笔记数据 API](https://dataxapi.com/zh/apis/xiaohongshu/pgy/notes/get/)

## What you get

The first 8 rows of a response recorded 2026-11-10 19:33 UTC.

| Field | Value |
| --- | --- |
| type | image |
| published_at | 2026-11-06 08:58 UTC |
| metrics.impressions | 24,405 |
| metrics.views | 4,482 |
| metrics.likes | 203 |
| metrics.favorites | 171 |
| metrics.comments | 46 |
| metrics.shares | 36 |

## Parameters

| Parameter | Type | required | Description |
| --- | --- | --- | --- |
| `id` | text | Yes | Note ID, 24 hexadecimal characters: the part after explore/ in a Xiaohongshu note link, or an id the PGY creator notes endpoint returns. Example: `6a20edfa0000000021020951`. |
| `view` | text |  | How much of each item to return. All three cost the same. Values: `compact`, `standard` (default), `full`. |
| `fields` | list of text |  | Return only these fields. Each by its path, such as `author.name`. |

## Returned fields

`data.item` is one pgy note detail object. Preview: the structure may change, announced beforehand.

Three views: `compact` (the most used fields, long text cut short), `standard` (the default: every standard field) and `full` (adds `ext`, the platform's own fields). A field is in the view named and in every larger one.

| Field | Type | Description | From view | This endpoint |
| --- | --- | --- | --- | --- |
| `id` | text | Note ID. | `compact` | Yes |
| `url` | link | Link to the note, with the access token the platform gives, so it opens as it is. | `compact` | Yes |
| `type` | text | An image note or a video note. Values: `image`, `video`. | `compact` | Yes |
| `title` | text | The note's title. | `compact` | Yes |
| `text` | text | The note's text. Long text: the compact view keeps the first 500 characters and says so in `warnings`. | `standard` | Yes |
| `published_at` | time | When it was published. | `compact` | Yes |
| `images` | list of link | Addresses of the pictures, in the note's order. | `standard` | Yes |
| `creator_id` | text | The creator's PGY creator ID, as the other PGY creator endpoints take it. | `compact` | Yes |
| `creator_name` | text | The creator's name. | `compact` | Yes |
| `brand` | text | The brand the note was reported as sponsored by, in the platform's words; null when it is no reported sponsored note. | `compact` | Yes |
| `brand_id` | text | The Xiaohongshu account ID of that brand; null when there is none. | `standard` | Yes |
| `metrics` | object | The figures PGY gives for the note. | `compact` | Yes |
| `metrics.impressions` | integer | Impressions. | `compact` | Yes |
| `metrics.views` | integer | Reads. | `compact` | Yes |
| `metrics.likes` | integer | Likes. | `compact` | Yes |
| `metrics.favorites` | integer | Saves. | `compact` | Yes |
| `metrics.comments` | integer | Comments. | `compact` | Yes |
| `metrics.shares` | integer | Shares. | `compact` | Yes |
| `metrics.follows` | integer | Follows the note brought (new followers gained from it). | `compact` | Yes |
| `component_clicks` | object | The click-through band of each component the brand put in the note (PGY's component clicks); null when the note has no such figures. | `standard` | Yes |
| `component_clicks.comment_area` | text | Click-through band of the comment-area component: normal (0-2%), high (2-10%) or very_high (over 10%), as PGY grades it; null when the note carries no such component. Values: `normal`, `high`, `very_high`. | `standard` | Yes |
| `component_clicks.content` | text | Click-through band of the in-text component: normal (0-2%), high (2-10%) or very_high (over 10%), as PGY grades it; null when the note carries no such component. Values: `normal`, `high`, `very_high`. | `standard` | Yes |
| `component_clicks.note_bottom` | text | Click-through band of the component at the bottom of the note: normal (0-2%), high (2-10%) or very_high (over 10%), as PGY grades it; null when the note carries no such component. Values: `normal`, `high`, `very_high`. | `standard` | Yes |
| `approximate` | list of object | Which numbers of this item are approximate or lower bounds; absent when all are exact. | `compact` | Yes |
| `approximate[].field` | text | Path of the field, such as metrics.views. | `compact` | Yes |
| `approximate[].kind` | text | Approximate, or a lower bound. Values: `approximate`, `lower_bound`. | `compact` | Yes |

A field with no value on an item is `null`. A field this endpoint cannot give is left out and listed in `meta.unavailable`.

Typical size of one item: `compact` 523 B, `standard` 4.3 KB, `full` 4.3 KB (measured on the response recorded 2026-11-10 19:33 UTC).

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
curl -G "https://api.dataxapi.com/v1/xiaohongshu/pgy/notes/get" \
  --data-urlencode "id=6a20edfa0000000021020951" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
# pip install dataxapi
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.xiaohongshu.pgy.notes.get(id="6a20edfa0000000021020951")
print(result["data"]["item"])
```

### TypeScript

```typescript
// npm i @dataxapi/sdk
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.xiaohongshu.pgy.notes.get({ id: "6a20edfa0000000021020951" });
console.log(result.data.item);
```

### CLI

```bash
dataxapi call xiaohongshu.pgy.notes.get id=6a20edfa0000000021020951
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

Add this to your MCP client, then ask your agent to call `xiaohongshu.pgy.notes.get`.

## Responses

### 200

From a response recorded 2026-11-10 19:33 UTC. Names, text and IDs are examples, and so are the links: none is the recorded one (the page shows no one's personal data); the figures are as recorded. Long lists are cut. The request ID, cursor and balance are made up.

Size as sent: 4.6 KB in the standard view (846 B compact, 4.6 KB full).

```jsonc
{
  "code": "ok",
  "request_id": "12cc3ae7-48f8-485e-87d9-88a012e11bed",
  "data": {
    "item": {
      "id": "6aa68ad700000000cc4e240a",
      "url": "https://www.xiaohongshu.com/explore/6aa68ad700000000cc4e240a",
      "type": "image",
      "title": "关于周末露营，我踩过的五个坑",
      "text": "周末的周末露营日常，随手记录一下",
      "published_at": "2026-11-06T08:58:31.000Z",
      "images": [
        "https://sns-webpic-qc.xhscdn.com/20261013/8f1dc0a9ba488c20db59!nd_dft_wlteh_webp_3",
        "https://sns-webpic-qc.xhscdn.com/20261013/13bf10108e7eae003580!nd_dft_wlteh_webp_3",
        // … 13 more
      ],
      "creator_id": "6a72df4700000000f893a8a0",
      "creator_name": "周末露营这件事，越简单越好",
      "brand": "把周末露营从头到尾讲清楚，看完少走弯路",
      "brand_id": "6659928c00000000428fe21c",
      "metrics": {
        "impressions": 24405,
        "views": 4482,
        "likes": 203,
        "favorites": 171,
        "comments": 46,
        "shares": 36,
        "follows": 22
      },
      "component_clicks": {
        "comment_area": "normal",
        "content": null,
        "note_bottom": null
      }
    }
  },
  "warnings": [],
  "meta": {
    "capability": "xiaohongshu.pgy.notes.get",
    "result_status": "complete",
    "fetched_at": "2026-11-10T19:33:48.000Z",
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
  "request_id": "2b90ab16-4783-4657-b552-a125bc03f0d3",
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
  "request_id": "2de90d17-32e7-4060-a459-742e14d440ef",
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
  "request_id": "cf0eb586-f730-4e54-9636-0a5ec8e90774",
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
  "request_id": "07b9cde9-affb-4875-bf24-870476d7273d",
  "message": "No result came back this time and nothing was charged; retry shortly",
  "message_zh": "这次没有取到结果，没有扣费，可以稍后重试",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

[This example as a JSON file](https://dataxapi.com/apis/xiaohongshu/pgy/notes/get.example.json)

## Use it in your AI

`dataxapi setup` gives the agents on your machine (Claude Code, Codex, Cursor) the DataXAPI MCP server and the base skill. The key is read from DATAXAPI_API_KEY; none is written into a file.

MCP server: `https://api.dataxapi.com/mcp`. The entry for your client is under MCP in the request examples of this page; then ask your agent to call `xiaohongshu.pgy.notes.get`.

Or paste this to any AI:

> Read https://dataxapi.com/apis/xiaohongshu/pgy/notes/get.md and help me use the DataXAPI endpoint xiaohongshu.pgy.notes.get (Xiaohongshu (RedNote) PGY note metrics).

[Open in ChatGPT](https://chatgpt.com/?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fxiaohongshu%2Fpgy%2Fnotes%2Fget.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20xiaohongshu.pgy.notes.get%20%28Xiaohongshu%20%28RedNote%29%20PGY%20note%20metrics%29.) · [Open in Claude](https://claude.ai/new?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fxiaohongshu%2Fpgy%2Fnotes%2Fget.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20xiaohongshu.pgy.notes.get%20%28Xiaohongshu%20%28RedNote%29%20PGY%20note%20metrics%29.)

## Related

Part of DataXAPI's Creators data. The same key also works for: Social media, Ads, E-commerce.

Xiaohongshu PGY endpoints: [Xiaohongshu PGY keyword search index](https://dataxapi.com/apis/xiaohongshu/pgy/keywords/history/), [Xiaohongshu PGY related keywords](https://dataxapi.com/apis/xiaohongshu/pgy/keywords/related/), [Xiaohongshu PGY creator search](https://dataxapi.com/apis/xiaohongshu/pgy/creators/search/), [Xiaohongshu PGY creator detail](https://dataxapi.com/apis/xiaohongshu/pgy/creators/get/), [Xiaohongshu PGY creator audience profile](https://dataxapi.com/apis/xiaohongshu/pgy/creators/audience/get/), [Xiaohongshu PGY creator metrics](https://dataxapi.com/apis/xiaohongshu/pgy/creators/metrics/), [Xiaohongshu PGY creator notes](https://dataxapi.com/apis/xiaohongshu/pgy/creators/notes/list/), [Xiaohongshu PGY creator follower history](https://dataxapi.com/apis/xiaohongshu/pgy/creators/followers/history/), [Xiaohongshu PGY similar creators](https://dataxapi.com/apis/xiaohongshu/pgy/creators/related/), [Xiaohongshu PGY trending notes](https://dataxapi.com/apis/xiaohongshu/pgy/notes/trending/), [Xiaohongshu PGY creator costs and data summary](https://dataxapi.com/apis/xiaohongshu/pgy/creators/costs/metrics/), [Xiaohongshu PGY creator follower summary](https://dataxapi.com/apis/xiaohongshu/pgy/creators/followers/metrics/), [Xiaohongshu PGY creator core figures history](https://dataxapi.com/apis/xiaohongshu/pgy/creators/costs/history/), [Xiaohongshu PGY note metrics](https://dataxapi.com/apis/xiaohongshu/pgy/notes/get/)

Xiaohongshu (RedNote) endpoints: [Xiaohongshu image search](https://dataxapi.com/apis/xiaohongshu/images/search/), [Xiaohongshu note detail](https://dataxapi.com/apis/xiaohongshu/notes/get/), [Xiaohongshu comment replies](https://dataxapi.com/apis/xiaohongshu/comments/replies/list/), [Xiaohongshu note comments](https://dataxapi.com/apis/xiaohongshu/notes/comments/list/), [Xiaohongshu note search](https://dataxapi.com/apis/xiaohongshu/notes/search/), [Xiaohongshu topic notes](https://dataxapi.com/apis/xiaohongshu/topics/notes/list/), [Xiaohongshu topic detail](https://dataxapi.com/apis/xiaohongshu/topics/get/), [Xiaohongshu trends](https://dataxapi.com/apis/xiaohongshu/trends/list/), [Xiaohongshu user profile](https://dataxapi.com/apis/xiaohongshu/users/get/), [Xiaohongshu user notes](https://dataxapi.com/apis/xiaohongshu/users/notes/list/), [Xiaohongshu user search](https://dataxapi.com/apis/xiaohongshu/users/search/), [Xiaohongshu search suggestions](https://dataxapi.com/apis/xiaohongshu/keywords/related/), [Xiaohongshu video note with its video and subtitles](https://dataxapi.com/apis/xiaohongshu/videos/get/), [Xiaohongshu video transcript (video to text)](https://dataxapi.com/apis/xiaohongshu/videos/transcript/get/), [RedNote (Xiaohongshu) image downloader, originals and live photos](https://dataxapi.com/apis/xiaohongshu/notes/media/get/), [RedNote (Xiaohongshu) video downloader](https://dataxapi.com/apis/xiaohongshu/videos/media/get/)

Xiaohongshu Shop endpoints: [Xiaohongshu product detail](https://dataxapi.com/apis/xiaohongshu/shop/products/get/), [Xiaohongshu product reviews](https://dataxapi.com/apis/xiaohongshu/shop/products/reviews/list/), [Xiaohongshu product search](https://dataxapi.com/apis/xiaohongshu/shop/products/search/)

How-to guides and answers: [How do I collect the numbers of many Xiaohongshu notes after a campaign? (2026)](https://dataxapi.com/answers/collect-xiaohongshu-note-metrics-after-campaign/), [Every figure on a Xiaohongshu PGY creator page: can an API get it? Field by field (2026)](https://dataxapi.com/answers/xiaohongshu-pgy-creator-page-fields/), [How to list only a Xiaohongshu creator's sponsored notes (2026)](https://dataxapi.com/answers/xiaohongshu-creator-sponsored-notes/), [A Xiaohongshu sponsored note's campaign figures (impressions, reads, follows) by API (2026)](https://dataxapi.com/answers/xiaohongshu-sponsored-note-campaign-report/), [How to tell a Xiaohongshu note reported as sponsored (2026)](https://dataxapi.com/answers/xiaohongshu-sponsored-note-detection/), [Can you see the reads and impressions of someone else's Xiaohongshu note? (2026)](https://dataxapi.com/answers/xiaohongshu-note-reads-impressions/), [Which creators has a competitor paid on Xiaohongshu? Working back from reported sponsored notes (2026)](https://dataxapi.com/answers/xiaohongshu-competitor-sponsored-creators/)

Related: [All Xiaohongshu PGY endpoints](https://dataxapi.com/apis/xiaohongshu/pgy/), [All Xiaohongshu (RedNote) endpoints](https://dataxapi.com/apis/xiaohongshu/), [Creators data](https://dataxapi.com/categories/creator/), [The pgy note detail object's fields](https://dataxapi.com/docs/objects/pgy_note/)

## Questions

### How much does the Xiaohongshu (RedNote) PGY note metrics API cost?

$0.0400 per call. The most one call can cost is $0.0400.

### When am I not charged?

Errors and timeouts are not charged.

### What happens if the object does not exist?

The answer is 404 not_found. charged and amount in the body say what this one cost. reason says which: not_found (it does not exist) or private_or_deleted.

---

Last checked 2026-11-28 06:28 UTC. Catalog revision ceced48b38f71468. [HTML version](https://dataxapi.com/apis/xiaohongshu/pgy/notes/get/)
