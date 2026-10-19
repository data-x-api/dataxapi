# YouTube channel videos API

Get a page of a YouTube channel's videos or Shorts by channel ID or handle, newest or most viewed first: title, description, time published, views, likes, length. About 30 items a call, 60 at most; $0.0020 per call. Errors and timeouts are not charged; an empty result is charged $0.0020.

- Endpoint: `GET https://api.dataxapi.com/v1/youtube/channels/videos/list`
- ID: `youtube.channels.videos.list`
- Also known as: channel uploads, youtube shorts, channel video list, YouTube channel Shorts
- Price: $0.0020 / call
- Live status is not on this page, which is a snapshot. Read it with `GET https://api.dataxapi.com/v1/catalog/status`
- Returns: up to 60 a page, a page, with a cursor for the next
- Returns the standard post object, the same on every platform
- [Run it in the Playground](https://dataxapi.com/console/playground/?capability=youtube.channels.videos.list&params=%7B%22id%22%3A%22UC_x5XG1OV2P6uZZ5FSM9Ttw%22%7D)
- In Chinese: [YouTube 频道视频 API](https://dataxapi.com/zh/apis/youtube/channels/videos/list/)

## What you get

The first 4 rows of a response recorded 2026-10-12 18:50 UTC.

| Field | Value |
| --- | --- |
| type | video |
| published_at | 2026-09-30 18:48 UTC |
| metrics.likes | 1,229 |
| metrics.views | 101,185 |

## Parameters

| Parameter | Type | required | Description |
| --- | --- | --- | --- |
| `id` | text | give exactly one of `id`, `username` | Channel ID, starting with UC. Example: `UC_x5XG1OV2P6uZZ5FSM9Ttw`. |
| `username` | text | give exactly one of `id`, `username` | The channel's handle, without the @. Example: `NASA`. |
| `type` | text |  | Regular videos, or Shorts. Values: `video` (default), `short`. Example: `video`. |
| `sort` | text |  | Newest first, or most viewed first. Values: `latest` (default), `popular`. Example: `latest`. |
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
| `title` | text | Title. | `compact` | Yes |
| `text` | text | Body text. On this platform: The video's description. Long text: the compact view keeps the first 500 characters and says so in `warnings`. | `compact` | Yes |
| `lang` | text | Language of the text. | `standard` | Not provided here |
| `published_at` | time | When it was published. | `compact` | Yes |
| `author` | object | Author. | `compact` | Depends on the request |
| `author.id` | text | Author's account ID. | `compact` | Depends on the request |
| `author.username` | text | Author's handle. | `compact` | Depends on the request |
| `author.name` | text | Author's display name. | `compact` | Depends on the request |
| `author.avatar_url` | link | Author's avatar. | `standard` | Depends on the request |
| `author.verified` | yes/no | Whether the author is verified. | `standard` | Not provided here |
| `author.followers` | integer | Author's follower count. | `standard` | Not provided here |
| `metrics` | object | Engagement counts. | `compact` | Yes |
| `metrics.likes` | integer | Likes. | `compact` | Yes |
| `metrics.comments` | integer | Comments. | `compact` | Yes |
| `metrics.shares` | integer | Shares. | `compact` | The platform has none |
| `metrics.favorites` | integer | Saves. | `compact` | The platform has none |
| `metrics.views` | integer | Views. | `compact` | Yes |
| `metrics.reposts` | integer | Reposts. | `compact` | The platform has none |
| `images` | list of link | Image addresses. On this platform: The video's cover. | `standard` | Yes |
| `hashtags` | list of text | Hashtags, without the #. | `standard` | Not provided here |
| `mentions` | list of object | Accounts mentioned in the text. | `standard` | Not provided here |
| `mentions[].id` | text | Account ID. | `standard` | Not provided here |
| `mentions[].username` | text | Handle. | `standard` | Not provided here |
| `mentions[].name` | text | Display name. | `standard` | Not provided here |
| `is_pinned` | yes/no | Whether the author pinned it. | `standard` | The platform has none |
| `post_id` | text | ID of the thread's root post when this is a reply; otherwise null. | `compact` | The platform has none |
| `parent_id` | text | ID of the item it replies to directly; otherwise null. | `compact` | The platform has none |
| `root_id` | text | ID of the first-level reply its thread hangs under. | `compact` | The platform has none |
| `ext.duration` | number | Length of the video, in seconds. | `full` | Yes |
| `approximate` | list of object | Which numbers of this item are approximate or lower bounds; absent when all are exact. | `compact` | Yes |
| `approximate[].field` | text | Path of the field, such as metrics.views. | `compact` | Yes |
| `approximate[].kind` | text | Approximate, or a lower bound. Values: `approximate`, `lower_bound`. | `compact` | Yes |

A field with no value on an item is `null`. A field this endpoint cannot give is left out and listed in `meta.unavailable`.

With `id`, `type=short`, `sort=latest`: `author` not returned.

With `id`, `type=short`, `sort=popular`: `author` not returned.

With `username`, `type=short`, `sort=latest`: `author` not returned.

With `username`, `type=short`, `sort=popular`: `author` not returned.

Typical size of one item: `compact` 817 B, `standard` 1.2 KB, `full` 1.3 KB (measured on the response recorded 2026-10-12 18:50 UTC).

## Paging

About 30 items a page, 60 at most. The page size is the platform's; `limit` is not accepted.

For the next page pass `page.next_cursor` as `cursor`; a cursor is valid for 1 hour. `page.has_more` is false on the last page.

With `id`, `type=short`, `sort=latest`: one page, no cursor.

With `id`, `type=short`, `sort=popular`: one page, no cursor.

With `username`, `type=short`, `sort=latest`: one page, no cursor.

With `username`, `type=short`, `sort=popular`: one page, no cursor.

## When you are charged

| Case | Charged |
| --- | --- |
| A result with data | $0.0020, once per call |
| Each further page | charged as a call of its own |
| An empty result | $0.0020 |
| Invalid parameters, a failure of ours or of the data source, a timeout | not charged |
| The most one call can cost | $0.0020 (send `X-Max-Price` to refuse anything above your own limit) |

Prices as read 2026-10-18 19:59 UTC, under price book 2, in effect since 2026-10-17 11:00 UTC; the Playground reads the price in force before a run.

## If the object does not exist

A channel that does not exist cannot be told from a channel without such videos: both return an empty result, not a 404, and are charged as an empty result is.

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
| 502 | `upstream_failed` | The data source failed | No | Yes |
| 502 | `upstream_changed` | The data source returned an unexpected structure | No | Yes |
| 502 | `upstream_unclear` | The data source's answer could not be interpreted; retry at most once | No | Once |
| 502 | `cursor_unavailable` | The data source this cursor belongs to is unavailable; retry later or start again from the first page | No | Yes |
| 503 | `upstream_busy` | The data source is busy; retry shortly | No | Yes |
| 503 | `capability_paused` | This endpoint is paused | No | Yes |
| 503 | `overloaded` | The service is busy; retry shortly | No | Yes |
| 504 | `timeout` | The data did not arrive in time; retry with the same idempotency key | No | Yes |

[All error codes](https://dataxapi.com/docs/errors/)

## Request

The key is read from the environment; no key is ever written into a page.

### cURL

```bash
curl -G "https://api.dataxapi.com/v1/youtube/channels/videos/list" \
  --data-urlencode "id=UC_x5XG1OV2P6uZZ5FSM9Ttw" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.youtube.channels.videos.list(id="UC_x5XG1OV2P6uZZ5FSM9Ttw")
print(result["data"]["items"])
```

### TypeScript

```typescript
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.youtube.channels.videos.list({ id: "UC_x5XG1OV2P6uZZ5FSM9Ttw" });
console.log(result.data.items);
```

### CLI

```bash
dataxapi call youtube.channels.videos.list id=UC_x5XG1OV2P6uZZ5FSM9Ttw
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

Add this to your MCP client, then ask your agent to call `youtube.channels.videos.list`.

## Responses

### 200

From a response recorded 2026-10-12 18:50 UTC. Names, text and IDs are examples, and so are the links: none is the recorded one (the page shows no one's personal data); the figures are as recorded. Long lists are cut. The request ID, cursor and balance are made up.

Size as sent: 37.8 KB in the standard view (25.8 KB compact, 38.5 KB full).

```jsonc
{
  "code": "ok",
  "request_id": "e09054f3-8ac2-452d-bd5b-05cbe3ac65d4",
  "data": {
    "items": [
      {
        "id": "LUF4CwXNlhx",
        "url": "https://www.youtube.com/watch?v=LUF4CwXNlhx",
        "type": "video",
        "title": "Everything I pack for weekend hiking",
        "text": "Three things nobody tells you about weekend hiking.",
        "published_at": "2026-09-30T18:48:20.000Z",
        "author": {
          "id": "UCbFHDOyK_wkLmNx0FQrcTuk",
          "username": "maya.makes",
          "name": "Northside Coffee",
          "avatar_url": "https://yt3.ggpht.com/lmBPyJ5eGQv9SllCFPKldu6xvY_ZW_0U4qZ5q-Zj=s88-c-k-c0x00ffffff-no-rj"
        },
        "metrics": { "likes": 1229, "comments": null, "views": 101185 },
        "images": ["https://i.ytimg.com/vi/Y5mDpDnE9Um/hqdefault.jpg"]
      },
      // … 29 more
    ]
  },
  "page": {
    "next_cursor": "c1.b9Kp1crLWi_WYUSGUbsr2IxcbW2IZasM4dkK01uQ",
    "cursor_expires_at": "2026-10-12T19:50:05.000Z",
    "has_more": true,
    "returned": 30
  },
  "warnings": [],
  "meta": {
    "capability": "youtube.channels.videos.list",
    "result_status": "complete",
    "fetched_at": "2026-10-12T18:50:05.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "lang": "capability",
      "author.verified": "capability",
      "author.followers": "capability",
      "metrics.shares": "platform",
      "metrics.favorites": "platform",
      "metrics.reposts": "platform",
      "hashtags": "capability",
      "mentions": "capability",
      "is_pinned": "platform",
      "post_id": "platform",
      "parent_id": "platform",
      "root_id": "platform"
    },
    "billing": {
      "amount": "0.002",
      "currency": "USD",
      "balance_after": "9.998"
    }
  }
}
```

### Empty

From a response recorded 2026-10-12 18:50 UTC. The request ID and balance are made up.

Size as sent: 717 B in the standard view (717 B compact, 717 B full).

```jsonc
{
  "code": "ok",
  "request_id": "2e35bade-1b7f-464d-b002-14dd7329d705",
  "data": { "items": [] },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 0
  },
  "warnings": [],
  "meta": {
    "capability": "youtube.channels.videos.list",
    "result_status": "empty",
    "fetched_at": "2026-10-12T18:50:14.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "lang": "capability",
      "author.verified": "capability",
      "author.followers": "capability",
      "metrics.shares": "platform",
      "metrics.favorites": "platform",
      "metrics.reposts": "platform",
      "hashtags": "capability",
      "mentions": "capability",
      "is_pinned": "platform",
      "post_id": "platform",
      "parent_id": "platform",
      "root_id": "platform"
    },
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
  "request_id": "e358e7fd-ba84-41cf-afd2-7df6468a8d6f",
  "message": "A parameter is invalid",
  "message_zh": "参数不合法",
  "charged": false,
  "retry": "after_fix",
  "retry_after_seconds": null,
  "param": null,
  "problems": ["give exactly one of id, username"],
  "docs_url": "https://dataxapi.com/docs/errors#invalid_params"
}
```

### 402

An example written to the specification, not a recorded response.

```json
{
  "code": "insufficient_balance",
  "request_id": "779ba882-96e8-4b0e-b67a-c0e5a5de8a7a",
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

### 502

An example written to the specification, not a recorded response.

```json
{
  "code": "upstream_failed",
  "request_id": "d46700fb-ea03-4481-b0dd-3523826ce33b",
  "message": "The data source failed",
  "message_zh": "数据来源出错",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

[This example as a JSON file](https://dataxapi.com/apis/youtube/channels/videos/list.example.json)

## Use it in your AI

`dataxapi setup` gives the agents on your machine (Claude Code, Codex, Cursor) the DataXAPI MCP server and the base skill. The key is read from DATAXAPI_API_KEY; none is written into a file.

MCP server: `https://api.dataxapi.com/mcp`. The entry for your client is under MCP in the request examples of this page; then ask your agent to call `youtube.channels.videos.list`.

Or paste this to any AI:

> Read https://dataxapi.com/apis/youtube/channels/videos/list.md and help me use the DataXAPI endpoint youtube.channels.videos.list (YouTube channel videos).

[Open in ChatGPT](https://chatgpt.com/?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fyoutube%2Fchannels%2Fvideos%2Flist.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20youtube.channels.videos.list%20%28YouTube%20channel%20videos%29.) · [Open in Claude](https://claude.ai/new?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fyoutube%2Fchannels%2Fvideos%2Flist.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20youtube.channels.videos.list%20%28YouTube%20channel%20videos%29.)

## Related

Part of DataXAPI's Social media data. The same key also works for: Creators, Ads, E-commerce.

The same thing on other platforms: [Bilibili user videos](https://dataxapi.com/apis/bilibili/users/videos/list/), [Douyin user videos](https://dataxapi.com/apis/douyin/users/videos/list/), [Kuaishou user videos](https://dataxapi.com/apis/kuaishou/users/videos/list/), [Telegram channel messages](https://dataxapi.com/apis/telegram/channels/messages/list/), [Facebook page posts](https://dataxapi.com/apis/facebook/pages/posts/list/), [LinkedIn company posts](https://dataxapi.com/apis/linkedin/companies/posts/list/), [Threads user posts](https://dataxapi.com/apis/threads/users/posts/list/), [Instagram user posts](https://dataxapi.com/apis/instagram/users/posts/list/), [TikTok user videos](https://dataxapi.com/apis/tiktok/users/videos/list/), [Weibo user posts](https://dataxapi.com/apis/weibo/users/posts/list/), [X user posts](https://dataxapi.com/apis/x/users/posts/list/), [Xiaohongshu user notes](https://dataxapi.com/apis/xiaohongshu/users/notes/list/), [WeChat Channels account videos](https://dataxapi.com/apis/wechat_channels/users/videos/list/), [WeChat Official Account articles](https://dataxapi.com/apis/wechat_mp/accounts/articles/list/), [Reddit user posts](https://dataxapi.com/apis/reddit/users/posts/list/), [Zhihu user answers](https://dataxapi.com/apis/zhihu/users/answers/list/), [Zhihu user articles](https://dataxapi.com/apis/zhihu/users/articles/list/), [Zhihu user pins](https://dataxapi.com/apis/zhihu/users/pins/list/)

More Social media data on other platforms: [Douyin hashtag videos](https://dataxapi.com/apis/douyin/hashtags/videos/list/), [Bilibili video detail](https://dataxapi.com/apis/bilibili/videos/get/), [Bilibili video search](https://dataxapi.com/apis/bilibili/videos/search/)

YouTube endpoints: [YouTube channel profile](https://dataxapi.com/apis/youtube/channels/get/), [YouTube channel search](https://dataxapi.com/apis/youtube/channels/search/), [YouTube channel videos](https://dataxapi.com/apis/youtube/channels/videos/list/), [YouTube comment replies](https://dataxapi.com/apis/youtube/comments/replies/list/), [YouTube video comments](https://dataxapi.com/apis/youtube/videos/comments/list/), [YouTube video detail](https://dataxapi.com/apis/youtube/videos/get/), [YouTube video search](https://dataxapi.com/apis/youtube/videos/search/), [YouTube video transcript](https://dataxapi.com/apis/youtube/videos/transcript/get/), [YouTube channel posts](https://dataxapi.com/apis/youtube/channels/posts/list/), [YouTube post detail](https://dataxapi.com/apis/youtube/posts/get/)

Skills that use this endpoint: [Competitor account monitoring](https://dataxapi.com/skills/competitors/), [Account check-up](https://dataxapi.com/skills/account-audit/)

Options with a page of their own: [YouTube channel Shorts API](https://dataxapi.com/apis/youtube/channels/videos/list/short/)

Related: [All YouTube endpoints](https://dataxapi.com/apis/youtube/), [Social media data](https://dataxapi.com/categories/social/), [The same thing on 17 platforms, side by side](https://dataxapi.com/roles/accounts-posts-list/), [The post object's fields](https://dataxapi.com/docs/objects/post/)

## Questions

### How much does the YouTube channel videos API cost?

$0.0020 per call. The most one call can cost is $0.0020.

### When am I not charged?

Errors and timeouts are not charged; an empty result is charged $0.0020.

### How many items does one call return, and how do I get the next page?

About 30 items a page, 60 at most. The page size is the platform's; limit is not accepted. For the next page pass page.next_cursor as cursor; a cursor is valid for 1 hour. page.has_more is false on the last page.

### What happens if the object does not exist?

A channel that does not exist cannot be told from a channel without such videos: both return an empty result, not a 404, and are charged as an empty result is.

---

Last checked 2026-10-18 19:59 UTC. Catalog revision c48ce454ae6c4c65. [HTML version](https://dataxapi.com/apis/youtube/channels/videos/list/)
