# Xiaohongshu (RedNote) note search API

Search Xiaohongshu notes by terms: title, text, author, engagement counts, images, and a link that opens. Each says whether it is a brand partnership note on record. By relevance, newest, most liked, most commented or most saved; video or image notes only; published in the last day, week or half year. Up to 20 items a call; $0.0200 per call. Errors and timeouts are not charged.

- Endpoint: `GET https://api.dataxapi.com/v1/xiaohongshu/notes/search`
- ID: `xiaohongshu.notes.search`
- Also known as: rednote search, xhs search notes
- Price: $0.0200 / call
- Live status is not on this page, which is a snapshot. Read it with `GET https://api.dataxapi.com/v1/catalog/status`
- Returns: 20 a page, a page, with a cursor for the next
- Returns the standard post object, the same on every platform
- [Run it in the Playground](https://dataxapi.com/console/playground/?capability=xiaohongshu.notes.search&params=%7B%22query%22%3A%22%E5%92%96%E5%95%A1%22%7D)
- In Chinese: [小红书笔记搜索 API](https://dataxapi.com/zh/apis/xiaohongshu/notes/search/)

## What you get

The first 6 rows of a response recorded 2026-10-12 18:43 UTC.

| Field | Value |
| --- | --- |
| type | image |
| published_at | 2026-05-17 05:25 UTC |
| metrics.likes | 48 |
| metrics.comments | 21 |
| metrics.shares | 5 |
| metrics.favorites | 10 |

## Parameters

| Parameter | Type | required | Description |
| --- | --- | --- | --- |
| `query` | text | Yes | Search terms. Example: `咖啡`. |
| `sort` | text |  | Sort order: relevance, newest, most liked, most commented, most saved. Values: `relevance` (default), `latest`, `popular`, `most_comments`, `most_favorites`. Example: `relevance`. |
| `type` | text |  | Video notes only (video) or image notes only (image); both when left out. Values: `video`, `image`. Example: `video`. |
| `published_within` | text |  | Only those published in the last day, week or half year. Values: `day`, `week`, `half_year`. Example: `week`. |
| `cursor` | text |  | Cursor returned by the previous page. Pass `page.next_cursor` of the page before, unchanged. Each page is charged as a call of its own. |
| `view` | text |  | How much of each item to return. All three cost the same. Values: `compact`, `standard` (default), `full`. |
| `fields` | list of text |  | Return only these fields. Each by its path, such as `author.name`. |

## Returned fields

`data.items` is a list of post objects. Stable: fields are only ever added.

Three views: `compact` (the most used fields, long text cut short), `standard` (the default: every standard field) and `full` (adds `ext`, the platform's own fields). A field is in the view named and in every larger one.

| Field | Type | Description | From view | This endpoint |
| --- | --- | --- | --- | --- |
| `id` | text | ID; pass it unchanged to the get endpoint. | `compact` | Yes |
| `url` | link | Link that opens the post. | `compact` | Yes |
| `type` | text | Content format. Values: `video`, `image`, `text`, `article`. | `compact` | Yes |
| `title` | text | Title. On this platform: The title as the result card shows it, without emoji. | `compact` | Yes |
| `text` | text | Body text. On this platform: The excerpt the result card shows, not the whole text; the note itself has all of it. Long text: the compact view keeps the first 500 characters and says so in `warnings`. | `compact` | Yes |
| `lang` | text | Language of the text. | `standard` | Not provided here |
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
| `hashtags` | list of text | Hashtags, without the #. | `standard` | Not provided here |
| `mentions` | list of object | Accounts mentioned in the text. | `standard` | Not provided here |
| `mentions[].id` | text | Account ID. | `standard` | Not provided here |
| `mentions[].username` | text | Handle. | `standard` | Not provided here |
| `mentions[].name` | text | Display name. | `standard` | Not provided here |
| `is_pinned` | yes/no | Whether the author pinned it. | `standard` | Not provided here |
| `post_id` | text | ID of the thread's root post when this is a reply; otherwise null. | `compact` | The platform has none |
| `parent_id` | text | ID of the item it replies to directly; otherwise null. | `compact` | The platform has none |
| `root_id` | text | ID of the first-level reply its thread hangs under. | `compact` | The platform has none |
| `ext.is_sponsored` | yes/no | Whether it is a brand partnership note the platform has on record (报备, marked as a partnership in the app); the brand is not given here. | `full` | Yes |
| `approximate` | list of object | Which numbers of this item are approximate or lower bounds; absent when all are exact. | `compact` | Yes |
| `approximate[].field` | text | Path of the field, such as metrics.views. | `compact` | Yes |
| `approximate[].kind` | text | Approximate, or a lower bound. Values: `approximate`, `lower_bound`. | `compact` | Yes |

A field with no value on an item is `null`. A field this endpoint cannot give is left out and listed in `meta.unavailable`.

Typical size of one item: `compact` 601 B, `standard` 1.4 KB, `full` 1.4 KB (measured on the response recorded 2026-10-12 18:43 UTC).

## Paging

20 items a page. The page size is the platform's; `limit` is not accepted.

For the next page pass `page.next_cursor` as `cursor`; a cursor is valid for 1 hour. `page.has_more` is false on the last page.

## When you are charged

| Case | Charged |
| --- | --- |
| A result with data | $0.0200, once per call |
| Each further page | charged as a call of its own |
| Invalid parameters, a failure or a timeout | not charged |
| The most one call can cost | $0.0200 (send `X-Max-Price` to refuse anything above your own limit) |

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
curl -G "https://api.dataxapi.com/v1/xiaohongshu/notes/search" \
  --data-urlencode "query=咖啡" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
# pip install dataxapi
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.xiaohongshu.notes.search(query="咖啡")
print(result["data"]["items"])
```

### TypeScript

```typescript
// npm i @dataxapi/sdk
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.xiaohongshu.notes.search({ query: "咖啡" });
console.log(result.data.items);
```

### CLI

```bash
dataxapi call xiaohongshu.notes.search 'query=咖啡'
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

Add this to your MCP client, then ask your agent to call `xiaohongshu.notes.search`.

## Responses

### 200

From a response recorded 2026-10-12 18:43 UTC. Names, text and IDs are examples, and so are the links: none is the recorded one (the page shows no one's personal data); the figures are as recorded. Long lists are cut. The request ID, cursor and balance are made up.

Size as sent: 21.5 KB in the standard view (9.5 KB compact, 21.9 KB full).

```jsonc
{
  "code": "ok",
  "request_id": "d2403177-e4f6-4d04-99eb-afce599b4c31",
  "data": {
    "items": [
      {
        "id": "67d5e2be00000000d803d22d",
        "url": "https://www.xiaohongshu.com/explore/67d5e2be00000000d803d22d",
        "type": "image",
        "title": "实测一个月咖啡，结论有点意外",
        "text": "把咖啡从头到尾讲清楚，看完少走弯路",
        "published_at": "2026-05-17T05:25:25.000Z",
        "author": {
          "id": "6130783200000000883b2a1e",
          "username": "coffee_lab_sh",
          "name": "山野咖啡馆",
          "avatar_url": "https://sns-avatar-qc.xhscdn.com/avatar/610f17040000000049dd4887.jpg"
        },
        "metrics": {
          "likes": 48,
          "comments": 21,
          "shares": 5,
          "favorites": 10
        },
        "images": [
          "https://sns-webpic-qc.xhscdn.com/20261010/2d7c7c32da67d3c3d839!nd_dft_wlteh_webp_3"
        ]
      },
      // … 14 more
    ]
  },
  "page": {
    "next_cursor": "c1.Ip12-f4dS4HmSDpdPex7WuLPBr1zJAbdhL_Wj8K0",
    "cursor_expires_at": "2026-10-12T19:43:26.000Z",
    "has_more": true,
    "returned": 15
  },
  "warnings": [],
  "meta": {
    "capability": "xiaohongshu.notes.search",
    "result_status": "complete",
    "fetched_at": "2026-10-12T18:43:26.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "lang": "capability",
      "metrics.views": "platform",
      "metrics.reposts": "platform",
      "author.verified": "capability",
      "author.followers": "capability",
      "hashtags": "capability",
      "mentions": "capability",
      "is_pinned": "capability",
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

### Empty

From a recording of 2026-10-12 18:43 UTC, edited by hand to show this case. The request ID and balance are made up.

Size as sent: 683 B in the standard view (683 B compact, 683 B full).

```jsonc
{
  "code": "ok",
  "request_id": "d50c391b-4bb0-4b40-a910-1e573bd40251",
  "data": { "items": [] },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 0
  },
  "warnings": [],
  "meta": {
    "capability": "xiaohongshu.notes.search",
    "result_status": "empty",
    "fetched_at": "2026-10-12T18:43:26.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "lang": "capability",
      "metrics.views": "platform",
      "metrics.reposts": "platform",
      "author.verified": "capability",
      "author.followers": "capability",
      "hashtags": "capability",
      "mentions": "capability",
      "is_pinned": "capability",
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
  "request_id": "90c9d391-98c1-45b5-86af-c4bc4bb4bb65",
  "message": "A parameter is invalid",
  "message_zh": "参数不合法",
  "charged": false,
  "retry": "after_fix",
  "retry_after_seconds": null,
  "param": null,
  "problems": ["query is required"],
  "docs_url": "https://dataxapi.com/docs/errors#invalid_params"
}
```

### 402

An example written to the specification, not a recorded response.

```json
{
  "code": "insufficient_balance",
  "request_id": "9729da42-b82b-4e7e-bc8b-27b7065bfa93",
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

### 502

An example written to the specification, not a recorded response.

```json
{
  "code": "upstream_failed",
  "request_id": "a20cf208-e56e-406c-bb2a-3db3ffecafe3",
  "message": "No result came back this time and nothing was charged; retry shortly",
  "message_zh": "这次没有取到结果，没有扣费，可以稍后重试",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

This recorded response is 51k tokens as the platform's own JSON, 10k as DataXAPI's JSON, and 3,600 as an AI reads it through DataXAPI's MCP server: 93% fewer (counted 2026-11-06).

[This example as a JSON file](https://dataxapi.com/apis/xiaohongshu/notes/search.example.json)

## Use it in your AI

`dataxapi setup` gives the agents on your machine (Claude Code, Codex, Cursor) the DataXAPI MCP server and the base skill. The key is read from DATAXAPI_API_KEY; none is written into a file.

MCP server: `https://api.dataxapi.com/mcp`. The entry for your client is under MCP in the request examples of this page; then ask your agent to call `xiaohongshu.notes.search`.

Or paste this to any AI:

> Read https://dataxapi.com/apis/xiaohongshu/notes/search.md and help me use the DataXAPI endpoint xiaohongshu.notes.search (Xiaohongshu (RedNote) note search).

[Open in ChatGPT](https://chatgpt.com/?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fxiaohongshu%2Fnotes%2Fsearch.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20xiaohongshu.notes.search%20%28Xiaohongshu%20%28RedNote%29%20note%20search%29.) · [Open in Claude](https://claude.ai/new?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fxiaohongshu%2Fnotes%2Fsearch.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20xiaohongshu.notes.search%20%28Xiaohongshu%20%28RedNote%29%20note%20search%29.)

## Related

Part of DataXAPI's Social media data. The same key also works for: Creators, Ads, E-commerce.

The same thing on other platforms: [Bilibili video search](https://dataxapi.com/apis/bilibili/videos/search/), [Douyin video search](https://dataxapi.com/apis/douyin/videos/search/), [Kuaishou video search](https://dataxapi.com/apis/kuaishou/videos/search/), [LinkedIn post search](https://dataxapi.com/apis/linkedin/posts/search/), [Threads post search](https://dataxapi.com/apis/threads/posts/search/), [TikTok video search](https://dataxapi.com/apis/tiktok/videos/search/), [Weibo realtime search](https://dataxapi.com/apis/weibo/posts/search/), [X post search](https://dataxapi.com/apis/x/posts/search/), [YouTube video search](https://dataxapi.com/apis/youtube/videos/search/), [WeChat Channels video search](https://dataxapi.com/apis/wechat_channels/videos/search/), [WeChat Search articles and videos](https://dataxapi.com/apis/wechat/posts/search/), [WeChat Search articles and videos (backup)](https://dataxapi.com/apis/wechat/backup/posts/search/), [WeChat Channels video search (backup)](https://dataxapi.com/apis/wechat_channels/backup/videos/search/), [Reddit post search](https://dataxapi.com/apis/reddit/posts/search/), [Zhihu content search](https://dataxapi.com/apis/zhihu/posts/search/), [Pinterest pin search](https://dataxapi.com/apis/pinterest/pins/search/), [Douyin video search (backup)](https://dataxapi.com/apis/douyin/backup/videos/search/)

Xiaohongshu (RedNote) endpoints: [Xiaohongshu image search](https://dataxapi.com/apis/xiaohongshu/images/search/), [Xiaohongshu note detail](https://dataxapi.com/apis/xiaohongshu/notes/get/), [Xiaohongshu comment replies](https://dataxapi.com/apis/xiaohongshu/comments/replies/list/), [Xiaohongshu note comments](https://dataxapi.com/apis/xiaohongshu/notes/comments/list/), [Xiaohongshu note search](https://dataxapi.com/apis/xiaohongshu/notes/search/), [Xiaohongshu topic notes](https://dataxapi.com/apis/xiaohongshu/topics/notes/list/), [Xiaohongshu topic detail](https://dataxapi.com/apis/xiaohongshu/topics/get/), [Xiaohongshu trends](https://dataxapi.com/apis/xiaohongshu/trends/list/), [Xiaohongshu user profile](https://dataxapi.com/apis/xiaohongshu/users/get/), [Xiaohongshu user notes](https://dataxapi.com/apis/xiaohongshu/users/notes/list/), [Xiaohongshu user search](https://dataxapi.com/apis/xiaohongshu/users/search/), [Xiaohongshu search suggestions](https://dataxapi.com/apis/xiaohongshu/keywords/related/), [Xiaohongshu video note with its video and subtitles](https://dataxapi.com/apis/xiaohongshu/videos/get/), [Xiaohongshu video transcript (video to text)](https://dataxapi.com/apis/xiaohongshu/videos/transcript/get/), [RedNote (Xiaohongshu) image downloader, originals and live photos](https://dataxapi.com/apis/xiaohongshu/notes/media/get/), [RedNote (Xiaohongshu) video downloader](https://dataxapi.com/apis/xiaohongshu/videos/media/get/)

Xiaohongshu PGY endpoints: [Xiaohongshu PGY keyword search index](https://dataxapi.com/apis/xiaohongshu/pgy/keywords/history/), [Xiaohongshu PGY related keywords](https://dataxapi.com/apis/xiaohongshu/pgy/keywords/related/), [Xiaohongshu PGY creator search](https://dataxapi.com/apis/xiaohongshu/pgy/creators/search/), [Xiaohongshu PGY creator detail](https://dataxapi.com/apis/xiaohongshu/pgy/creators/get/), [Xiaohongshu PGY creator audience profile](https://dataxapi.com/apis/xiaohongshu/pgy/creators/audience/get/), [Xiaohongshu PGY creator metrics](https://dataxapi.com/apis/xiaohongshu/pgy/creators/metrics/), [Xiaohongshu PGY creator notes](https://dataxapi.com/apis/xiaohongshu/pgy/creators/notes/list/), [Xiaohongshu PGY creator follower history](https://dataxapi.com/apis/xiaohongshu/pgy/creators/followers/history/), [Xiaohongshu PGY similar creators](https://dataxapi.com/apis/xiaohongshu/pgy/creators/related/), [Xiaohongshu PGY trending notes](https://dataxapi.com/apis/xiaohongshu/pgy/notes/trending/), [Xiaohongshu PGY creator costs and data summary](https://dataxapi.com/apis/xiaohongshu/pgy/creators/costs/metrics/), [Xiaohongshu PGY creator follower summary](https://dataxapi.com/apis/xiaohongshu/pgy/creators/followers/metrics/), [Xiaohongshu PGY creator core figures history](https://dataxapi.com/apis/xiaohongshu/pgy/creators/costs/history/), [Xiaohongshu PGY note metrics](https://dataxapi.com/apis/xiaohongshu/pgy/notes/get/)

Xiaohongshu Shop endpoints: [Xiaohongshu product detail](https://dataxapi.com/apis/xiaohongshu/shop/products/get/), [Xiaohongshu product reviews](https://dataxapi.com/apis/xiaohongshu/shop/products/reviews/list/), [Xiaohongshu product search](https://dataxapi.com/apis/xiaohongshu/shop/products/search/)

How-to guides and answers: [How to get Xiaohongshu (RedNote) note comments in bulk](https://dataxapi.com/guides/xiaohongshu-note-comments/), [How to search and export Xiaohongshu (RedNote) notes by keyword](https://dataxapi.com/guides/xiaohongshu-search-export-notes/), [Does Xiaohongshu (RedNote) have an API? Get notes and comments with Python (2026)](https://dataxapi.com/guides/xiaohongshu-api-python/), [How do I export Xiaohongshu (RedNote) data?](https://dataxapi.com/answers/export-xiaohongshu-data/), [Can ChatGPT read Xiaohongshu (RedNote)?](https://dataxapi.com/answers/can-chatgpt-read-xiaohongshu/), [What is xsec_token on Xiaohongshu?](https://dataxapi.com/answers/xiaohongshu-xsec-token/), [Which Xiaohongshu data API? The official platform, third-party APIs or your own scraper (2026)](https://dataxapi.com/answers/best-xiaohongshu-data-api/), [Can Xiaohongshu's open platform read notes and comments? (2026)](https://dataxapi.com/answers/xiaohongshu-open-platform-api/), [Is DataXAPI the same as Alibaba's DataX? (2026)](https://dataxapi.com/answers/dataxapi-is-not-datax/), [xiaohongshu-mcp keeps losing its login: is there a Xiaohongshu MCP that needs no login? (2026)](https://dataxapi.com/answers/xiaohongshu-mcp-without-login/), [How do Claude Code, Cursor and Codex read Xiaohongshu without cookies? (2026)](https://dataxapi.com/answers/claude-code-cursor-codex-read-xiaohongshu/), [How do I add a Xiaohongshu or Douyin Skill to my AI? (2026)](https://dataxapi.com/answers/xiaohongshu-douyin-skill/), [How do I export Xiaohongshu comments in bulk to find what users complain about? (2026)](https://dataxapi.com/answers/export-xiaohongshu-comments-pain-points/), [How do I check Xiaohongshu note search rankings in bulk? (2026)](https://dataxapi.com/answers/xiaohongshu-search-rank-tracking/), [BettaFish has no data: how do I feed it public Xiaohongshu and Douyin data? (2026)](https://dataxapi.com/answers/bettafish-data-source/), [How do I add WeChat Official Accounts and Xiaohongshu to TrendRadar? (2026)](https://dataxapi.com/answers/trendradar-wechat-xiaohongshu/), [xiaohongshu-mcp says 300011 Account abnormal, or redirects to rednote abroad: what now? (2026)](https://dataxapi.com/answers/xiaohongshu-mcp-300011/), [MediaCrawler gets blocked on Xiaohongshu with status 461: what do I switch to? (2026)](https://dataxapi.com/answers/mediacrawler-alternative/), [Do Chanmama, Qiangua and Newrank have APIs? What if I want the raw data? (2026)](https://dataxapi.com/answers/chanmama-qiangua-newrank-api/), [Is it legal to collect public Xiaohongshu and Douyin data through a third-party API? (2026)](https://dataxapi.com/answers/is-public-social-data-collection-legal/), [What does status 461 mean on Xiaohongshu? (2026)](https://dataxapi.com/answers/xiaohongshu-461-status-code/), [How do I get Xiaohongshu data into n8n? (2026)](https://dataxapi.com/answers/xiaohongshu-n8n/), [How do I sync Xiaohongshu note data to a Feishu Base? (2026)](https://dataxapi.com/answers/xiaohongshu-feishu-base/), [How do I connect Xiaohongshu data to Dify? (MCP, 2026)](https://dataxapi.com/answers/xiaohongshu-dify/), [Will using a data API get my Xiaohongshu or Douyin account banned? (2026)](https://dataxapi.com/answers/will-data-api-get-my-account-banned/), [Are data APIs like DataXAPI compliant? (2026)](https://dataxapi.com/answers/is-dataxapi-compliant/), [Is DataXAPI legit and reliable? What you can check yourself (2026)](https://dataxapi.com/answers/is-dataxapi-reliable/), [How do I collect hit topic ideas on Xiaohongshu in bulk? (2026)](https://dataxapi.com/answers/xiaohongshu-hit-topic-ideas/), [How do I research products to sell on Xiaohongshu: what sells and what buyers say? (2026)](https://dataxapi.com/answers/xiaohongshu-product-research/), [How do I spot complaints about my brand on Xiaohongshu at low cost? (2026)](https://dataxapi.com/answers/spot-xiaohongshu-brand-complaints/), [My Xiaohongshu scraper keeps getting blocked: what does keeping it up cost against paying per call? (2026)](https://dataxapi.com/answers/xiaohongshu-scraper-blocked-cost/), [What are x-s and x-t on Xiaohongshu? (2026)](https://dataxapi.com/answers/xiaohongshu-x-s-x-t/), [What do Xiaohongshu error codes 300011, 300012 and 300013 mean? (2026)](https://dataxapi.com/answers/xiaohongshu-300011-300013-error-codes/), [How do I connect Xiaohongshu data to Coze (扣子)? (2026)](https://dataxapi.com/answers/xiaohongshu-coze/), [China social data MCP for Claude and Cursor: Xiaohongshu, Douyin, WeChat (2026)](https://dataxapi.com/answers/china-social-data-mcp/), [China social media data API: one key for Xiaohongshu, Douyin, WeChat (2026)](https://dataxapi.com/answers/one-key-china-social-data-api/), [Brand monitoring on Chinese social media: Weibo, Douyin, Xiaohongshu (2026)](https://dataxapi.com/answers/chinese-social-media-brand-monitoring/), [Product reviews and comments from Chinese social media in bulk (2026)](https://dataxapi.com/answers/product-reviews-chinese-social-media/), [Social listening API for China: one keyword across Weibo, Douyin, Xiaohongshu and more (2026)](https://dataxapi.com/answers/social-listening-api-china/), [Chinese social media data API FAQ, platform by platform (2026)](https://dataxapi.com/answers/social-media-data-api-faq/), [Which social media data API is best for AI agents? Count the tokens a response takes (2026)](https://dataxapi.com/answers/social-media-api-for-ai-agents/), [Social media API responses fill the AI's context and burn tokens: what to do](https://dataxapi.com/answers/api-response-too-many-tokens/), [Douyin, WeChat and Xiaohongshu data in Claude Code and Codex (2026)](https://dataxapi.com/answers/claude-code-codex-china-social-data/), [Collecting Weibo comments and Xiaohongshu notes for a thesis, without coding (2026)](https://dataxapi.com/answers/social-media-data-for-thesis-research/), [Chinese social media alternative data for investment research (2026)](https://dataxapi.com/answers/chinese-social-media-alternative-data/), [How many tokens does a social media API response take in an AI? Every endpoint measured (2026)](https://dataxapi.com/answers/social-media-api-token-benchmark/), [Xiaohongshu (RedNote) API for AI agents and LLMs: fewer tokens, called from Claude and Cursor (2026)](https://dataxapi.com/answers/xiaohongshu-api-for-ai-agents/), [Xiaohongshu video API: the video file and its subtitles (2026)](https://dataxapi.com/answers/xiaohongshu-video-url-subtitles-api/), [Xiaohongshu video to text: the transcript from the platform's own subtitles (2026)](https://dataxapi.com/answers/xiaohongshu-video-to-text/), [Xiaohongshu trending notes: getting the viral notes by API (2026)](https://dataxapi.com/answers/xiaohongshu-trending-notes-api/), [How to tell a Xiaohongshu note reported as sponsored (2026)](https://dataxapi.com/answers/xiaohongshu-sponsored-note-detection/)

Skills that use this endpoint: [Keyword search and mentions](https://dataxapi.com/skills/mentions/)

Related: [All Xiaohongshu (RedNote) endpoints](https://dataxapi.com/apis/xiaohongshu/), [Social media data](https://dataxapi.com/categories/social/), [The same thing on 15 platforms, side by side](https://dataxapi.com/roles/posts-search/), [The post object's fields](https://dataxapi.com/docs/objects/post/)

## Questions

### How much does the Xiaohongshu (RedNote) note search API cost?

$0.0200 per call. The most one call can cost is $0.0200.

### When am I not charged?

Errors and timeouts are not charged.

### How many items does one call return, and how do I get the next page?

20 items a page. The page size is the platform's; limit is not accepted. For the next page pass page.next_cursor as cursor; a cursor is valid for 1 hour. page.has_more is false on the last page.

---

Last checked 2026-11-27 06:18 UTC. Catalog revision 0264e2d6dd4ff743. [HTML version](https://dataxapi.com/apis/xiaohongshu/notes/search/)
