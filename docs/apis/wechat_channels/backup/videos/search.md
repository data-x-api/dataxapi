# WeChat Channels video search (backup) API

The backup of wechat_channels.videos.search: the same parameters and result, priced on its own. No saves. About 10 items a call, 20 at most; $0.1 per call. Errors and timeouts are not charged.

- Endpoint: `GET https://api.dataxapi.com/v1/wechat_channels/backup/videos/search`
- ID: `wechat_channels.backup.videos.search`
- Also known as: search wechat channels backup
- Price: $0.1 / call
- Live status is not on this page, which is a snapshot. Read it with `GET https://api.dataxapi.com/v1/catalog/status`
- Returns: up to 20 a page, a page, with a cursor for the next
- Returns the standard post object, the same on every platform
- [Run it in the Playground](https://dataxapi.com/console/playground/?capability=wechat_channels.backup.videos.search&params=%7B%22query%22%3A%22%E9%9C%B2%E8%90%A5%E8%A3%85%E5%A4%87%E6%8E%A8%E8%8D%90%22%7D)
- In Chinese: [微信搜一搜视频号视频搜索（备用版）API](https://dataxapi.com/zh/apis/wechat_channels/backup/videos/search/)

## What you get

The first 3 rows of a response recorded 2026-10-29 09:56 UTC.

| Field | Value |
| --- | --- |
| type | video |
| published_at | 2026-10-28 23:53 UTC |
| metrics.likes | 41 |

## Parameters

| Parameter | Type | required | Description |
| --- | --- | --- | --- |
| `query` | text | Yes | Search terms. Example: `露营装备推荐`. |
| `sort` | text |  | By relevance, by time published (newest first) or by how hot. Values: `relevance` (default), `latest`, `popular`. Example: `latest`. |
| `published_within` | text |  | Only those published in the last day, week or half year. Values: `day`, `week`, `half_year`. Example: `week`. |
| `cursor` | text |  | Cursor returned by the previous page. Pass `page.next_cursor` of the page before, unchanged. Each page is charged as a call of its own. |
| `view` | text |  | How much of each item to return. All three cost the same. Values: `compact`, `standard` (default), `full`. |
| `fields` | list of text |  | Return only these fields. Each by its path, such as `author.name`. |

## Returned fields

`data.items` is a list of post objects. Stable: fields are only ever added.

Three views: `compact` (the most used fields, long text cut short), `standard` (the default: every standard field) and `full` (adds `ext`, the platform's own fields). A field is in the view named and in every larger one.

| Field | Type | Description | From view | This endpoint |
| --- | --- | --- | --- | --- |
| `id` | text | ID; pass it unchanged to the get endpoint. On this platform: The encrypted ID WeChat Search gives the video (starting with export/), as given: not the numeric ID the Channels video and comment endpoints take, and not promised to be the same for the same video in a later search. | `compact` | Yes |
| `url` | link | Link that opens the post. | `compact` | The platform has none |
| `type` | text | Content format. Values: `video`, `image`, `text`, `article`. | `compact` | Yes |
| `title` | text | Title. | `compact` | The platform has none |
| `text` | text | Body text. On this platform: The video's description, without the keyword highlighting. Long text: the compact view keeps the first 500 characters and says so in `warnings`. | `compact` | Yes |
| `lang` | text | Language of the text. | `standard` | Not provided here |
| `published_at` | time | When it was published. | `compact` | Yes |
| `author` | object | Author. | `compact` | Yes |
| `author.id` | text | Author's account ID. | `compact` | Not provided here |
| `author.username` | text | Author's handle. | `compact` | The platform has none |
| `author.name` | text | Author's display name. On this platform: The account's name; WeChat Search gives no account ID. | `compact` | Yes |
| `author.avatar_url` | link | Author's avatar. | `standard` | Yes |
| `author.verified` | yes/no | Whether the author is verified. | `standard` | Not provided here |
| `author.followers` | integer | Author's follower count. | `standard` | Not provided here |
| `metrics` | object | Engagement counts. | `compact` | Yes |
| `metrics.likes` | integer | Likes. On this platform: The likes the card shows; one written like 1.4万 is approximate and 10万+ a lower bound; null when the card shows no count. | `compact` | Yes |
| `metrics.comments` | integer | Comments. | `compact` | Not provided here |
| `metrics.shares` | integer | Shares. | `compact` | Not provided here |
| `metrics.favorites` | integer | Saves. | `compact` | Not provided here |
| `metrics.views` | integer | Views. | `compact` | Not provided here |
| `metrics.reposts` | integer | Reposts. | `compact` | The platform has none |
| `images` | list of link | Image addresses. | `standard` | Not provided here |
| `hashtags` | list of text | Hashtags, without the #. | `standard` | Not provided here |
| `mentions` | list of object | Accounts mentioned in the text. | `standard` | Not provided here |
| `mentions[].id` | text | Account ID. | `standard` | Not provided here |
| `mentions[].username` | text | Handle. | `standard` | Not provided here |
| `mentions[].name` | text | Display name. | `standard` | Not provided here |
| `is_pinned` | yes/no | Whether the author pinned it. | `standard` | Not provided here |
| `post_id` | text | ID of the thread's root post when this is a reply; otherwise null. | `compact` | The platform has none |
| `parent_id` | text | ID of the item it replies to directly; otherwise null. | `compact` | The platform has none |
| `root_id` | text | ID of the first-level reply its thread hangs under. | `compact` | The platform has none |
| `ext.duration` | number | Length of the video, in seconds. | `full` | Yes |
| `ext.cover_url` | link | Cover of the video. | `full` | Yes |
| `approximate` | list of object | Which numbers of this item are approximate or lower bounds; absent when all are exact. | `compact` | Yes |
| `approximate[].field` | text | Path of the field, such as metrics.views. | `compact` | Yes |
| `approximate[].kind` | text | Approximate, or a lower bound. Values: `approximate`, `lower_bound`. | `compact` | Yes |

A field with no value on an item is `null`. A field this endpoint cannot give is left out and listed in `meta.unavailable`.

Typical size of one item: `compact` 481 B, `standard` 667 B, `full` 1.2 KB (measured on the response recorded 2026-10-29 09:56 UTC).

## Paging

About 10 items a page, 20 at most. The page size is the platform's; `limit` is not accepted.

For the next page pass `page.next_cursor` as `cursor`; a cursor is valid for 1 hour. `page.has_more` is false on the last page.

## When you are charged

| Case | Charged |
| --- | --- |
| A result with data | $0.1, once per call |
| Each further page | charged as a call of its own |
| Invalid parameters, a failure or a timeout | not charged |
| The most one call can cost | $0.1 (send `X-Max-Price` to refuse anything above your own limit) |

Prices as read 2026-11-26 12:17 UTC, under price book 22, in effect since 2026-11-25 13:46 UTC; the Playground reads the price in force before a run.

## Errors

Every error has the same structure: `code`, `message`, `charged`, `retry`, `retry_after_seconds`, `param`, `docs_url`.

This is a backup version: the same parameters and fields as the original, at its own price. The original is the one to call first: [WeChat Channels video search API](https://dataxapi.com/apis/wechat_channels/videos/search/)

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
curl -G "https://api.dataxapi.com/v1/wechat_channels/backup/videos/search" \
  --data-urlencode "query=露营装备推荐" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
# pip install dataxapi
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.wechat_channels.backup.videos.search(query="露营装备推荐")
print(result["data"]["items"])
```

### TypeScript

```typescript
// npm i @dataxapi/sdk
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.wechat_channels.backup.videos.search({ query: "露营装备推荐" });
console.log(result.data.items);
```

### CLI

```bash
dataxapi call wechat_channels.backup.videos.search 'query=露营装备推荐'
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

Add this to your MCP client, then ask your agent to call `wechat_channels.backup.videos.search`.

## Responses

### 200

From a response recorded 2026-10-29 09:56 UTC. Names, text and IDs are examples, and so are the links: none is the recorded one (the page shows no one's personal data); the figures are as recorded. Long lists are cut. The request ID, cursor and balance are made up.

Size as sent: 8.7 KB in the standard view (6.6 KB compact, 14.7 KB full).

```jsonc
{
  "code": "ok",
  "request_id": "e77fcd41-84c1-49cd-962f-29ca0a98ff91",
  "data": {
    "items": [
      {
        "id": "14018294186535559743",
        "type": "video",
        "text": "周末的露营装备推荐日常，随手记录一下",
        "published_at": "2026-10-28T23:53:21.000Z",
        "author": {
          "name": "老周说装备",
          "avatar_url": "https://wx.qlogo.cn/mmhead/MMxxDfrOjxrmy41MdRZ4tYAdMwFfc8Gau2RBmFlx/132"
        },
        "metrics": { "likes": 41 }
      },
      // … 11 more
    ]
  },
  "page": {
    "next_cursor": "c1.A3ZrRBndzOAesOvdT9TwzWwpPb4DNOe9zuYXlU-O",
    "cursor_expires_at": "2026-10-29T10:56:00.000Z",
    "has_more": true,
    "returned": 12
  },
  "warnings": [],
  "meta": {
    "capability": "wechat_channels.backup.videos.search",
    "result_status": "complete",
    "fetched_at": "2026-10-29T09:56:00.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "url": "platform",
      "title": "platform",
      "lang": "capability",
      "author.id": "capability",
      "author.username": "platform",
      "author.verified": "capability",
      "author.followers": "capability",
      "metrics.comments": "capability",
      "metrics.shares": "capability",
      "metrics.views": "capability",
      "metrics.reposts": "platform",
      "images": "capability",
      "hashtags": "capability",
      "mentions": "capability",
      "is_pinned": "capability",
      "post_id": "platform",
      "parent_id": "platform",
      "root_id": "platform",
      "metrics.favorites": "capability"
    },
    "billing": {
      "amount": "0.1",
      "currency": "USD",
      "balance_after": "9.9"
    }
  }
}
```

### Empty

From a recording of 2026-10-29 09:56 UTC, edited by hand to show this case. The request ID and balance are made up.

Size as sent: 904 B in the standard view (904 B compact, 904 B full).

```jsonc
{
  "code": "ok",
  "request_id": "0a399a64-820c-482f-9cc4-bcb6c5a6a0de",
  "data": { "items": [] },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 0
  },
  "warnings": [],
  "meta": {
    "capability": "wechat_channels.backup.videos.search",
    "result_status": "empty",
    "fetched_at": "2026-10-29T09:56:00.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "url": "platform",
      "title": "platform",
      "lang": "capability",
      "author.id": "capability",
      "author.username": "platform",
      "author.verified": "capability",
      "author.followers": "capability",
      "metrics.comments": "capability",
      "metrics.shares": "capability",
      "metrics.views": "capability",
      "metrics.reposts": "platform",
      "images": "capability",
      "hashtags": "capability",
      "mentions": "capability",
      "is_pinned": "capability",
      "post_id": "platform",
      "parent_id": "platform",
      "root_id": "platform",
      "metrics.favorites": "capability"
    },
    "billing": {
      "amount": "0.1",
      "currency": "USD",
      "balance_after": "9.9"
    }
  }
}
```

### 400

An example written to the specification, not a recorded response.

```json
{
  "code": "invalid_params",
  "request_id": "d463c603-409d-4763-abde-4a623e6353c2",
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
  "request_id": "5277d3c1-5f1c-462b-beac-28c3451e4fa6",
  "message": "The balance is too low",
  "message_zh": "余额不足",
  "charged": false,
  "retry": "after_fix",
  "retry_after_seconds": null,
  "param": null,
  "required": "0.1",
  "available": "0",
  "top_up_url": "https://dataxapi.com/console/billing/?amount=10",
  "next_step": "The balance does not cover this call ($0.1). Top up at top_up_url: $10 at least, about 100 calls at this price; Alipay or a card, and the balance never expires. Then send the same request again, unchanged. Nothing was charged for this one.",
  "next_step_zh": "余额不够这次调用（$0.1）。到 top_up_url 充值：最低 $10，按这次的价格约够 100 次；支付宝、银行卡都能付，余额不过期。到账后把同一个请求原样再发一次。这次没有扣钱。",
  "docs_url": "https://dataxapi.com/docs/errors#insufficient_balance"
}
```

### 502

An example written to the specification, not a recorded response.

```json
{
  "code": "upstream_failed",
  "request_id": "30724099-6431-4b9d-bafa-6bc584b11ee4",
  "message": "No result came back this time and nothing was charged; retry shortly",
  "message_zh": "这次没有取到结果，没有扣费，可以稍后重试",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

This recorded response is 22k tokens as the platform's own JSON, 3,571 as DataXAPI's JSON, and 2,239 as an AI reads it through DataXAPI's MCP server: 90% fewer (counted 2026-11-06).

[This example as a JSON file](https://dataxapi.com/apis/wechat_channels/backup/videos/search.example.json)

## Use it in your AI

`dataxapi setup` gives the agents on your machine (Claude Code, Codex, Cursor) the DataXAPI MCP server and the base skill. The key is read from DATAXAPI_API_KEY; none is written into a file.

MCP server: `https://api.dataxapi.com/mcp`. The entry for your client is under MCP in the request examples of this page; then ask your agent to call `wechat_channels.backup.videos.search`.

Or paste this to any AI:

> Read https://dataxapi.com/apis/wechat_channels/backup/videos/search.md and help me use the DataXAPI endpoint wechat_channels.backup.videos.search (WeChat Channels video search (backup)).

[Open in ChatGPT](https://chatgpt.com/?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fwechat_channels%2Fbackup%2Fvideos%2Fsearch.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20wechat_channels.backup.videos.search%20%28WeChat%20Channels%20video%20search%20%28backup%29%29.) · [Open in Claude](https://claude.ai/new?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fwechat_channels%2Fbackup%2Fvideos%2Fsearch.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20wechat_channels.backup.videos.search%20%28WeChat%20Channels%20video%20search%20%28backup%29%29.)

## Related

Part of DataXAPI's Social media data. The same key also works for: Creators, Ads, E-commerce.

The same thing on other platforms: [Bilibili video search](https://dataxapi.com/apis/bilibili/videos/search/), [Douyin video search](https://dataxapi.com/apis/douyin/videos/search/), [Kuaishou video search](https://dataxapi.com/apis/kuaishou/videos/search/), [LinkedIn post search](https://dataxapi.com/apis/linkedin/posts/search/), [Threads post search](https://dataxapi.com/apis/threads/posts/search/), [TikTok video search](https://dataxapi.com/apis/tiktok/videos/search/), [Weibo realtime search](https://dataxapi.com/apis/weibo/posts/search/), [X post search](https://dataxapi.com/apis/x/posts/search/), [Xiaohongshu note search](https://dataxapi.com/apis/xiaohongshu/notes/search/), [YouTube video search](https://dataxapi.com/apis/youtube/videos/search/), [WeChat Channels video search](https://dataxapi.com/apis/wechat_channels/videos/search/), [WeChat Search articles and videos](https://dataxapi.com/apis/wechat/posts/search/), [WeChat Search articles and videos (backup)](https://dataxapi.com/apis/wechat/backup/posts/search/), [Reddit post search](https://dataxapi.com/apis/reddit/posts/search/), [Zhihu content search](https://dataxapi.com/apis/zhihu/posts/search/), [Pinterest pin search](https://dataxapi.com/apis/pinterest/pins/search/), [Douyin video search (backup)](https://dataxapi.com/apis/douyin/backup/videos/search/)

WeChat Channels endpoints: [WeChat Channels account profile](https://dataxapi.com/apis/wechat_channels/users/get/), [WeChat Channels video detail](https://dataxapi.com/apis/wechat_channels/videos/get/), [WeChat Channels video comments](https://dataxapi.com/apis/wechat_channels/videos/comments/list/), [WeChat Channels video share link](https://dataxapi.com/apis/wechat_channels/videos/share_link/get/), [WeChat Channels account collections](https://dataxapi.com/apis/wechat_channels/users/collections/list/), [WeChat Channels collection videos](https://dataxapi.com/apis/wechat_channels/collections/videos/list/), [WeChat Channels account videos](https://dataxapi.com/apis/wechat_channels/users/videos/list/), [WeChat Channels video search](https://dataxapi.com/apis/wechat_channels/videos/search/), [WeChat Channels account profile (backup)](https://dataxapi.com/apis/wechat_channels/backup/users/get/), [WeChat Channels account videos (backup)](https://dataxapi.com/apis/wechat_channels/backup/users/videos/list/), [WeChat Channels video search (backup)](https://dataxapi.com/apis/wechat_channels/backup/videos/search/), [WeChat Channels account search](https://dataxapi.com/apis/wechat_channels/users/search/), [WeChat Channels video stats](https://dataxapi.com/apis/wechat_channels/videos/metrics/), [WeChat Channels comment replies](https://dataxapi.com/apis/wechat_channels/comments/replies/list/), [WeChat Channels live replays](https://dataxapi.com/apis/wechat_channels/users/live_replays/list/), [WeChat Channels video download](https://dataxapi.com/apis/wechat_channels/videos/media/get/), [WeChat Channels video transcript](https://dataxapi.com/apis/wechat_channels/videos/transcript/get/)

How-to guides and answers: [What WeChat data APIs are there? Official Accounts, Channels and WeChat Search (2026)](https://dataxapi.com/answers/wechat-data-apis/)

Related: [All WeChat Channels endpoints](https://dataxapi.com/apis/wechat_channels/), [Social media data](https://dataxapi.com/categories/social/), [The same thing on 15 platforms, side by side](https://dataxapi.com/roles/posts-search/), [The post object's fields](https://dataxapi.com/docs/objects/post/)

## Questions

### How much does the WeChat Channels video search (backup) API cost?

$0.1 per call. The most one call can cost is $0.1.

### When am I not charged?

Errors and timeouts are not charged.

### How many items does one call return, and how do I get the next page?

About 10 items a page, 20 at most. The page size is the platform's; limit is not accepted. For the next page pass page.next_cursor as cursor; a cursor is valid for 1 hour. page.has_more is false on the last page.

---

Last checked 2026-11-26 12:17 UTC. Catalog revision 0051cce45e9530b9. [HTML version](https://dataxapi.com/apis/wechat_channels/backup/videos/search/)
