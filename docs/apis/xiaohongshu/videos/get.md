# Xiaohongshu (RedNote) video note with its video and subtitles API

Get one Xiaohongshu video note by ID or link: title, text, author, engagement counts, plus the video file's address, its length, its cover, the Chinese subtitles the platform made (SRT, usable as a transcript) and whether it is a brand partnership note on record. Video notes only; an image note is the note detail's. One object a call; $0.0200 per call. Errors and timeouts are not charged.

- Endpoint: `GET https://api.dataxapi.com/v1/xiaohongshu/videos/get`
- ID: `xiaohongshu.videos.get`
- Also known as: xiaohongshu video download, rednote video url, xiaohongshu video subtitles, xiaohongshu video transcript
- Price: $0.0200 / call
- Live status is not on this page, which is a snapshot. Read it with `GET https://api.dataxapi.com/v1/catalog/status`
- Returns: 1 object, one post object
- Returns the standard post object, the same on every platform
- `id` is in the link: `xiaohongshu.com/explore/<id>`. Or pass the whole link as `url`.
- [Run it in the Playground](https://dataxapi.com/console/playground/?capability=xiaohongshu.videos.get&params=%7B%22id%22%3A%226ac7701f000000001800508c%22%7D)
- In Chinese: [小红书视频笔记详情（视频地址和字幕）API](https://dataxapi.com/zh/apis/xiaohongshu/videos/get/)

## What you get

The first 8 rows of a response recorded 2026-11-06 16:42 UTC.

| Field | Value |
| --- | --- |
| type | video |
| lang | zh-Hans |
| published_at | 2026-10-08 12:01 UTC |
| metrics.likes | 1,328 |
| metrics.comments | 10 |
| metrics.shares | 169 |
| metrics.favorites | 58 |
| is_pinned | false |

## Parameters

| Parameter | Type | required | Description |
| --- | --- | --- | --- |
| `id` | text | give exactly one of `id`, `url` | Note ID, 24 hexadecimal characters. With only a link or a share text, give it as url. Example: `6ac7701f000000001800508c`. |
| `url` | text | give exactly one of `id`, `url` | Link to the note, pasted as it is: the https://www.xiaohongshu.com/explore/… address from the browser, the https://www.xiaohongshu.com/discovery/item/… link the website shares (query parameters such as xsec_token are fine), a whole share text with such a link in it, or the xhslink.com short link the app copies (alone or in its share text). A short link is opened once to see which note it leads to; where it cannot be, paste the note's full link or its ID. Example: `https://www.xiaohongshu.com/explore/6ac7701f000000001800508c?xsec_token=ABx1y2z3`. Full link: `https://www.xiaohongshu.com/explore/6ac7701f000000001800508c?xsec_token=ABx1y2z3`. Share text with a link inside: `周末咖啡探店合集 https://www.xiaohongshu.com/discovery/item/6ac7701f000000001800508c?xsec_token=ABx1y2z3 复制这段文字，打开小红书查看`. |
| `view` | text |  | How much of each item to return. All three cost the same. Values: `compact`, `standard` (default), `full`. |
| `fields` | list of text |  | Return only these fields. Each by its path, such as `author.name`. |

## Returned fields

`data.item` is one post object. Stable: fields are only ever added.

Three views: `compact` (the most used fields, long text cut short), `standard` (the default: every standard field) and `full` (adds `ext`, the platform's own fields). A field is in the view named and in every larger one.

| Field | Type | Description | From view | This endpoint |
| --- | --- | --- | --- | --- |
| `id` | text | ID; pass it unchanged to the get endpoint. | `compact` | Yes |
| `url` | link | Link that opens the post. | `compact` | Yes |
| `type` | text | Content format. Values: `video`, `image`, `text`, `article`. | `compact` | Yes |
| `title` | text | Title. | `compact` | Yes |
| `text` | text | Body text. Long text: the compact view keeps the first 500 characters and says so in `warnings`. | `compact` | Yes |
| `lang` | text | Language of the text. | `standard` | Yes |
| `published_at` | time | When it was published. | `compact` | Yes |
| `author` | object | Author. | `compact` | Yes |
| `author.id` | text | Author's account ID. | `compact` | Yes |
| `author.username` | text | Author's handle. | `compact` | Yes |
| `author.name` | text | Author's display name. | `compact` | Yes |
| `author.avatar_url` | link | Author's avatar. | `standard` | Yes |
| `author.verified` | yes/no | Whether the author is verified. | `standard` | Not provided here |
| `author.followers` | integer | Author's follower count. | `standard` | Not provided here |
| `metrics` | object | Engagement counts. | `compact` | Yes |
| `metrics.likes` | integer | Likes. | `compact` | Yes |
| `metrics.comments` | integer | Comments. | `compact` | Yes |
| `metrics.shares` | integer | Shares. | `compact` | Yes |
| `metrics.favorites` | integer | Saves. | `compact` | Yes |
| `metrics.views` | integer | Views. | `compact` | The platform has none |
| `metrics.reposts` | integer | Reposts. | `compact` | The platform has none |
| `images` | list of link | Image addresses. | `standard` | Yes |
| `hashtags` | list of text | Hashtags, without the #. | `standard` | Yes |
| `mentions` | list of object | Accounts mentioned in the text. | `standard` | Yes |
| `mentions[].id` | text | Account ID. | `standard` | Yes |
| `mentions[].username` | text | Handle. | `standard` | The platform has none |
| `mentions[].name` | text | Display name. | `standard` | Yes |
| `is_pinned` | yes/no | Whether the author pinned it. | `standard` | Yes |
| `post_id` | text | ID of the thread's root post when this is a reply; otherwise null. | `compact` | The platform has none |
| `parent_id` | text | ID of the item it replies to directly; otherwise null. | `compact` | The platform has none |
| `root_id` | text | ID of the first-level reply its thread hangs under. | `compact` | The platform has none |
| `ext.ip_location` | text | IP location as the platform shows it, in English (a province by its pinyin or English name), where the app shows it in Chinese. | `full` | Yes |
| `ext.duration` | number | Length of the video, in seconds. | `full` | Yes |
| `ext.cover_url` | link | Cover of the video. | `full` | Yes |
| `ext.video_url` | link | Address of the video file (the H.264 MP4 the platform plays). | `full` | Yes |
| `ext.subtitle_url` | link | The Chinese subtitles the platform made for the video (an SRT file with timings), usable as its transcript; none where the platform made none. | `full` | Yes |
| `ext.is_sponsored` | yes/no | Whether it is a brand partnership note the platform has on record (报备, marked as a partnership in the app); the brand is not given here. | `full` | Yes |
| `approximate` | list of object | Which numbers of this item are approximate or lower bounds; absent when all are exact. | `compact` | Yes |
| `approximate[].field` | text | Path of the field, such as metrics.views. | `compact` | Yes |
| `approximate[].kind` | text | Approximate, or a lower bound. Values: `approximate`, `lower_bound`. | `compact` | Yes |

A field with no value on an item is `null`. A field this endpoint cannot give is left out and listed in `meta.unavailable`.

Typical size of one item: `compact` 891 B, `standard` 1.3 KB, `full` 1.9 KB (measured on the response recorded 2026-11-06 16:42 UTC).

## Paging

One object per call: there is nothing to page.

## When you are charged

| Case | Charged |
| --- | --- |
| A result with data | $0.0200, once per call |
| Invalid parameters, a failure or a timeout | not charged |
| The most one call can cost | $0.0200 (send `X-Max-Price` to refuse anything above your own limit) |

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
curl -G "https://api.dataxapi.com/v1/xiaohongshu/videos/get" \
  --data-urlencode "id=6ac7701f000000001800508c" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
# pip install dataxapi
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.xiaohongshu.videos.get(id="6ac7701f000000001800508c")
print(result["data"]["item"])
```

### TypeScript

```typescript
// npm i @dataxapi/sdk
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.xiaohongshu.videos.get({ id: "6ac7701f000000001800508c" });
console.log(result.data.item);
```

### CLI

```bash
dataxapi call xiaohongshu.videos.get id=6ac7701f000000001800508c
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

Add this to your MCP client, then ask your agent to call `xiaohongshu.videos.get`.

## Responses

### 200

From a response recorded 2026-11-06 16:42 UTC. Names, text and IDs are examples, and so are the links: none is the recorded one (the page shows no one's personal data); the figures are as recorded. Long lists are cut. The request ID, cursor and balance are made up.

Size as sent: 1.9 KB in the standard view (1.4 KB compact, 2.4 KB full).

```jsonc
{
  "code": "ok",
  "request_id": "2d8eb023-7d56-47bf-93c5-6662b60cdcb0",
  "data": {
    "item": {
      "id": "63b490d20000000030426e76",
      "url": "https://www.xiaohongshu.com/explore/63b490d20000000030426e76",
      "type": "video",
      "title": "实测一个月周末露营，结论有点意外",
      "text": "把周末露营从头到尾讲清楚，看完少走弯路",
      "lang": "zh-Hans",
      "published_at": "2026-10-08T12:01:43.000Z",
      "author": {
        "id": "621f214c000000002500d81d",
        "username": "weekend_lin",
        "name": "小林的周末",
        "avatar_url": "https://sns-avatar-qc.xhscdn.com/avatar/696e16bd0000000043b64a4a.jpg"
      },
      "metrics": {
        "likes": 1328,
        "comments": 10,
        "shares": 169,
        "favorites": 58
      },
      "images": [
        "https://sns-webpic-qc.xhscdn.com/20261018/945b90f952505b9adbaa!nd_dft_wlteh_webp_3"
      ],
      "hashtags": ["周末露营", "周末去哪儿"],
      "mentions": [
        { "id": "63cb9b4400000000303e311b", "name": "橘子汽水不加冰" }
      ],
      "is_pinned": false
    }
  },
  "warnings": [],
  "meta": {
    "capability": "xiaohongshu.videos.get",
    "result_status": "complete",
    "fetched_at": "2026-11-06T16:42:10.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "metrics.views": "platform",
      "metrics.reposts": "platform",
      "author.verified": "capability",
      "author.followers": "capability",
      "mentions.username": "platform",
      "post_id": "platform",
      "parent_id": "platform",
      "root_id": "platform"
    },
    "billing": {
      "amount": "0.02",
      "currency": "USD",
      "balance_after": "9.98"
    }
  }
}
```

### 400

An example written to the specification, not a recorded response.

```json
{
  "code": "invalid_params",
  "request_id": "dc62725b-53a7-44a2-b7b5-f0cb70573e82",
  "message": "A parameter is invalid",
  "message_zh": "参数不合法",
  "charged": false,
  "retry": "after_fix",
  "retry_after_seconds": null,
  "param": null,
  "problems": ["give exactly one of id, url"],
  "docs_url": "https://dataxapi.com/docs/errors#invalid_params"
}
```

### 402

An example written to the specification, not a recorded response.

```json
{
  "code": "insufficient_balance",
  "request_id": "b91b9cba-eba6-4bff-aeaf-39dbd6756961",
  "message": "The balance is too low",
  "message_zh": "余额不足",
  "charged": false,
  "retry": "after_fix",
  "retry_after_seconds": null,
  "param": null,
  "required": "0.02",
  "available": "0",
  "top_up_url": "https://dataxapi.com/console/billing/?amount=10",
  "next_step": "The balance does not cover this call ($0.02). Top up at top_up_url: $10 at least, about 500 calls at this price; Alipay or a card, and the balance never expires. Then send the same request again, unchanged. Nothing was charged for this one.",
  "next_step_zh": "余额不够这次调用（$0.02）。到 top_up_url 充值：最低 $10，按这次的价格约够 500 次；支付宝、银行卡都能付，余额不过期。到账后把同一个请求原样再发一次。这次没有扣钱。",
  "docs_url": "https://dataxapi.com/docs/errors#insufficient_balance"
}
```

### 404

An example written to the specification, not a recorded response.

```json
{
  "code": "not_found",
  "request_id": "737c524e-e09f-4b64-93e4-90f36d4df38a",
  "message": "The object does not exist, is private or was deleted",
  "message_zh": "对象不存在、私密或已删除",
  "charged": true,
  "amount": "0.02",
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
  "request_id": "012e2826-a7e4-461c-bb70-63100df771d5",
  "message": "No result came back this time and nothing was charged; retry shortly",
  "message_zh": "这次没有取到结果，没有扣费，可以稍后重试",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

[This example as a JSON file](https://dataxapi.com/apis/xiaohongshu/videos/get.example.json)

## Use it in your AI

`dataxapi setup` gives the agents on your machine (Claude Code, Codex, Cursor) the DataXAPI MCP server and the base skill. The key is read from DATAXAPI_API_KEY; none is written into a file.

MCP server: `https://api.dataxapi.com/mcp`. The entry for your client is under MCP in the request examples of this page; then ask your agent to call `xiaohongshu.videos.get`.

Or paste this to any AI:

> Read https://dataxapi.com/apis/xiaohongshu/videos/get.md and help me use the DataXAPI endpoint xiaohongshu.videos.get (Xiaohongshu (RedNote) video note with its video and subtitles).

[Open in ChatGPT](https://chatgpt.com/?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fxiaohongshu%2Fvideos%2Fget.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20xiaohongshu.videos.get%20%28Xiaohongshu%20%28RedNote%29%20video%20note%20with%20its%20video%20and%20subtitles%29.) · [Open in Claude](https://claude.ai/new?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fxiaohongshu%2Fvideos%2Fget.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20xiaohongshu.videos.get%20%28Xiaohongshu%20%28RedNote%29%20video%20note%20with%20its%20video%20and%20subtitles%29.)

## Related

Part of DataXAPI's Social media data. The same key also works for: Creators, Ads, E-commerce.

Xiaohongshu (RedNote) endpoints: [Xiaohongshu image search](https://dataxapi.com/apis/xiaohongshu/images/search/), [Xiaohongshu note detail](https://dataxapi.com/apis/xiaohongshu/notes/get/), [Xiaohongshu comment replies](https://dataxapi.com/apis/xiaohongshu/comments/replies/list/), [Xiaohongshu note comments](https://dataxapi.com/apis/xiaohongshu/notes/comments/list/), [Xiaohongshu note search](https://dataxapi.com/apis/xiaohongshu/notes/search/), [Xiaohongshu topic notes](https://dataxapi.com/apis/xiaohongshu/topics/notes/list/), [Xiaohongshu topic detail](https://dataxapi.com/apis/xiaohongshu/topics/get/), [Xiaohongshu trends](https://dataxapi.com/apis/xiaohongshu/trends/list/), [Xiaohongshu user profile](https://dataxapi.com/apis/xiaohongshu/users/get/), [Xiaohongshu user notes](https://dataxapi.com/apis/xiaohongshu/users/notes/list/), [Xiaohongshu user search](https://dataxapi.com/apis/xiaohongshu/users/search/), [Xiaohongshu search suggestions](https://dataxapi.com/apis/xiaohongshu/keywords/related/), [Xiaohongshu video note with its video and subtitles](https://dataxapi.com/apis/xiaohongshu/videos/get/), [Xiaohongshu video transcript (video to text)](https://dataxapi.com/apis/xiaohongshu/videos/transcript/get/), [RedNote (Xiaohongshu) image downloader, originals and live photos](https://dataxapi.com/apis/xiaohongshu/notes/media/get/), [RedNote (Xiaohongshu) video downloader](https://dataxapi.com/apis/xiaohongshu/videos/media/get/)

Xiaohongshu PGY endpoints: [Xiaohongshu PGY keyword search index](https://dataxapi.com/apis/xiaohongshu/pgy/keywords/history/), [Xiaohongshu PGY related keywords](https://dataxapi.com/apis/xiaohongshu/pgy/keywords/related/), [Xiaohongshu PGY creator search](https://dataxapi.com/apis/xiaohongshu/pgy/creators/search/), [Xiaohongshu PGY creator detail](https://dataxapi.com/apis/xiaohongshu/pgy/creators/get/), [Xiaohongshu PGY creator audience profile](https://dataxapi.com/apis/xiaohongshu/pgy/creators/audience/get/), [Xiaohongshu PGY creator metrics](https://dataxapi.com/apis/xiaohongshu/pgy/creators/metrics/), [Xiaohongshu PGY creator notes](https://dataxapi.com/apis/xiaohongshu/pgy/creators/notes/list/), [Xiaohongshu PGY creator follower history](https://dataxapi.com/apis/xiaohongshu/pgy/creators/followers/history/), [Xiaohongshu PGY similar creators](https://dataxapi.com/apis/xiaohongshu/pgy/creators/related/), [Xiaohongshu PGY trending notes](https://dataxapi.com/apis/xiaohongshu/pgy/notes/trending/), [Xiaohongshu PGY creator costs and data summary](https://dataxapi.com/apis/xiaohongshu/pgy/creators/costs/metrics/), [Xiaohongshu PGY creator follower summary](https://dataxapi.com/apis/xiaohongshu/pgy/creators/followers/metrics/), [Xiaohongshu PGY creator core figures history](https://dataxapi.com/apis/xiaohongshu/pgy/creators/costs/history/), [Xiaohongshu PGY note metrics](https://dataxapi.com/apis/xiaohongshu/pgy/notes/get/)

Xiaohongshu Shop endpoints: [Xiaohongshu product detail](https://dataxapi.com/apis/xiaohongshu/shop/products/get/), [Xiaohongshu product reviews](https://dataxapi.com/apis/xiaohongshu/shop/products/reviews/list/), [Xiaohongshu product search](https://dataxapi.com/apis/xiaohongshu/shop/products/search/)

How-to guides and answers: [Xiaohongshu video API: the video file and its subtitles (2026)](https://dataxapi.com/answers/xiaohongshu-video-url-subtitles-api/), [Xiaohongshu video to text: the transcript from the platform's own subtitles (2026)](https://dataxapi.com/answers/xiaohongshu-video-to-text/), [Is there an API that gets a video's file address? Douyin, Xiaohongshu and WeChat Channels (2026)](https://dataxapi.com/answers/video-file-url-api-china/)

Related: [All Xiaohongshu (RedNote) endpoints](https://dataxapi.com/apis/xiaohongshu/), [Social media data](https://dataxapi.com/categories/social/), [The post object's fields](https://dataxapi.com/docs/objects/post/)

## Questions

### How much does the Xiaohongshu (RedNote) video note with its video and subtitles API cost?

$0.0200 per call. The most one call can cost is $0.0200.

### When am I not charged?

Errors and timeouts are not charged.

### What happens if the object does not exist?

The answer is 404 not_found. charged and amount in the body say what this one cost. reason says which: not_found (it does not exist) or private_or_deleted.

---

Last checked 2026-11-28 06:28 UTC. Catalog revision ceced48b38f71468. [HTML version](https://dataxapi.com/apis/xiaohongshu/videos/get/)
