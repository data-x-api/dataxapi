# TikTok hashtag videos API

Get a page of the TikTok videos under a hashtag, by its name, about 20 a page: caption, author, engagement counts, cover and play address. Up to 20 items a call; $0.0020 per call. Errors, timeouts and objects that do not exist are not charged; an empty result is charged $0.0020.

- Endpoint: `GET https://api.dataxapi.com/v1/tiktok/hashtags/videos/list`
- ID: `tiktok.hashtags.videos.list`
- Also known as: tiktok tag videos, tiktok challenge videos, TikTok hashtag detail
- Price: $0.0020 / call
- Live status is not on this page, which is a snapshot. Read it with `GET https://api.dataxapi.com/v1/catalog/status`
- Returns: 20 a page, a page, with a cursor for the next
- Returns the standard post object, the same on every platform
- `id` is in the link: `tiktok.com/@<id>/video/7665840565958872333`.
- [Run it in the Playground](https://dataxapi.com/console/playground/?capability=tiktok.hashtags.videos.list&params=%7B%22id%22%3A%22nasa%22%7D)
- In Chinese: [TikTok 话题作品 API](https://dataxapi.com/zh/apis/tiktok/hashtags/videos/list/)

## What you get

The first 8 rows of a response recorded 2026-10-12 18:47 UTC.

| Field | Value |
| --- | --- |
| type | video |
| lang | en |
| published_at | 2026-10-06 15:16 UTC |
| metrics.likes | 10,289 |
| metrics.comments | 101 |
| metrics.shares | 364 |
| metrics.favorites | 852 |
| metrics.views | 86,424 |

## Parameters

| Parameter | Type | required | Description |
| --- | --- | --- | --- |
| `id` | text | Yes | Name of the hashtag, without the #. Example: `nasa`. |
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
| `title` | text | Title. | `compact` | The platform has none |
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
| `metrics.views` | integer | Views. | `compact` | Yes |
| `metrics.reposts` | integer | Reposts. | `compact` | Not provided here |
| `images` | list of link | Image addresses. | `standard` | Not provided here |
| `hashtags` | list of text | Hashtags, without the #. | `standard` | Yes |
| `mentions` | list of object | Accounts mentioned in the text. | `standard` | Yes |
| `mentions[].id` | text | Account ID. | `standard` | Yes |
| `mentions[].username` | text | Handle. | `standard` | Not provided here |
| `mentions[].name` | text | Display name. | `standard` | Not provided here |
| `is_pinned` | yes/no | Whether the author pinned it. | `standard` | Not provided here |
| `post_id` | text | ID of the thread's root post when this is a reply; otherwise null. | `compact` | The platform has none |
| `parent_id` | text | ID of the item it replies to directly; otherwise null. | `compact` | The platform has none |
| `root_id` | text | ID of the first-level reply its thread hangs under. | `compact` | The platform has none |
| `ext.duration` | number | Length of the video, in seconds. | `full` | Yes |
| `ext.cover_url` | link | Cover of the video. | `full` | Yes |
| `ext.video_url` | link | Address the video plays from; it expires. | `full` | Yes |
| `approximate` | list of object | Which numbers of this item are approximate or lower bounds; absent when all are exact. | `compact` | Yes |
| `approximate[].field` | text | Path of the field, such as metrics.views. | `compact` | Yes |
| `approximate[].kind` | text | Approximate, or a lower bound. Values: `approximate`, `lower_bound`. | `compact` | Yes |

A field with no value on an item is `null`. A field this endpoint cannot give is left out and listed in `meta.unavailable`.

Typical size of one item: `compact` 418 B, `standard` 820 B, `full` 1.6 KB (measured on the response recorded 2026-10-12 18:47 UTC).

## Paging

20 items a page. The page size is the platform's; `limit` is not accepted.

For the next page pass `page.next_cursor` as `cursor`; a cursor is valid for 1 hour. `page.has_more` is false on the last page.

## When you are charged

| Case | Charged |
| --- | --- |
| A result with data | $0.0020, once per call |
| Each further page | charged as a call of its own |
| An empty result | $0.0020 |
| The object does not exist (404) | not charged |
| Invalid parameters, a failure of ours or of the data source, a timeout | not charged |
| The most one call can cost | $0.0020 (send `X-Max-Price` to refuse anything above your own limit) |

Prices as read 2026-10-18 19:59 UTC, under price book 2, in effect since 2026-10-17 11:00 UTC; the Playground reads the price in force before a run.

## If the object does not exist

The answer is 404 `not_found` and nothing is charged. `reason` says which: `not_found` (it does not exist) or `private_or_deleted`.

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
| 404 | `not_found` | The object does not exist, is private or was deleted | No | No |
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
curl -G "https://api.dataxapi.com/v1/tiktok/hashtags/videos/list" \
  --data-urlencode "id=nasa" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.tiktok.hashtags.videos.list(id="nasa")
print(result["data"]["items"])
```

### TypeScript

```typescript
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.tiktok.hashtags.videos.list({ id: "nasa" });
console.log(result.data.items);
```

### CLI

```bash
dataxapi call tiktok.hashtags.videos.list id=nasa
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

Add this to your MCP client, then ask your agent to call `tiktok.hashtags.videos.list`.

## Responses

### 200

From a response recorded 2026-10-12 18:47 UTC. Names, text and IDs are examples, and so are the links: none is the recorded one (the page shows no one's personal data); the figures are as recorded. Long lists are cut. The request ID, cursor and balance are made up.

Size as sent: 16.7 KB in the standard view (8.9 KB compact, 32.2 KB full).

```jsonc
{
  "code": "ok",
  "request_id": "50ec8aaf-c050-45b9-8fcb-acb5f088bc1b",
  "data": {
    "items": [
      {
        "id": "7324847345040857368",
        "url": "https://www.tiktok.com/@hannah.w.photo/video/7324847345040857368",
        "type": "video",
        "text": "Weekend hiking from last night, no filter. Settings in the comments.",
        "lang": "en",
        "published_at": "2026-10-06T15:16:22.000Z",
        "author": {
          "id": "6049772375495468810",
          "username": "hannah.w.photo",
          "name": "Hannah Weiss",
          "avatar_url": "https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/523134e9dfaaa0b34294~c5_100x100.jpeg"
        },
        "metrics": {
          "likes": 10289,
          "comments": 101,
          "shares": 364,
          "favorites": 852,
          "views": 86424
        },
        "hashtags": [
          "outdoors",
          "weekendvibes",
          // … 3 more
        ],
        "mentions": []
      },
      // … 19 more
    ]
  },
  "page": {
    "next_cursor": "c1.aH3rQNPZ35OeJCGvbKD-WcLhqH5C0uy6GEFhmeCy",
    "cursor_expires_at": "2026-10-12T19:47:19.000Z",
    "has_more": true,
    "returned": 20
  },
  "warnings": [],
  "meta": {
    "capability": "tiktok.hashtags.videos.list",
    "result_status": "complete",
    "fetched_at": "2026-10-12T18:47:19.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "title": "platform",
      "images": "capability",
      "author.verified": "capability",
      "metrics.reposts": "capability",
      "mentions.username": "capability",
      "mentions.name": "capability",
      "post_id": "platform",
      "parent_id": "platform",
      "root_id": "platform",
      "author.followers": "capability",
      "is_pinned": "capability"
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

From a recording of 2026-10-12 18:47 UTC, edited by hand to show this case. The request ID and balance are made up.

Size as sent: 696 B in the standard view (696 B compact, 696 B full).

```jsonc
{
  "code": "ok",
  "request_id": "94d02ad8-e519-46ef-b2f5-4ff47388744c",
  "data": { "items": [] },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 0
  },
  "warnings": [],
  "meta": {
    "capability": "tiktok.hashtags.videos.list",
    "result_status": "empty",
    "fetched_at": "2026-10-12T18:47:19.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "title": "platform",
      "images": "capability",
      "author.verified": "capability",
      "metrics.reposts": "capability",
      "mentions.username": "capability",
      "mentions.name": "capability",
      "post_id": "platform",
      "parent_id": "platform",
      "root_id": "platform",
      "author.followers": "capability",
      "is_pinned": "capability"
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
  "request_id": "d474b366-4448-4c8e-8261-c319f1d541ba",
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
  "request_id": "6684e5f2-e058-4327-823b-9e4ede51a8ed",
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

### 404

An example written to the specification, not a recorded response.

```json
{
  "code": "not_found",
  "request_id": "c7b536ce-9313-45bd-a3a2-8b69e7c4e7fa",
  "message": "The object does not exist, is private or was deleted",
  "message_zh": "对象不存在、私密或已删除",
  "charged": false,
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
  "request_id": "599b8701-2665-4f3e-98f2-c8c2f9f57845",
  "message": "The data source failed",
  "message_zh": "数据来源出错",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

[This example as a JSON file](https://dataxapi.com/apis/tiktok/hashtags/videos/list.example.json)

## Use it in your AI

`dataxapi setup` gives the agents on your machine (Claude Code, Codex, Cursor) the DataXAPI MCP server and the base skill. The key is read from DATAXAPI_API_KEY; none is written into a file.

MCP server: `https://api.dataxapi.com/mcp`. The entry for your client is under MCP in the request examples of this page; then ask your agent to call `tiktok.hashtags.videos.list`.

Or paste this to any AI:

> Read https://dataxapi.com/apis/tiktok/hashtags/videos/list.md and help me use the DataXAPI endpoint tiktok.hashtags.videos.list (TikTok hashtag videos).

[Open in ChatGPT](https://chatgpt.com/?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Ftiktok%2Fhashtags%2Fvideos%2Flist.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20tiktok.hashtags.videos.list%20%28TikTok%20hashtag%20videos%29.) · [Open in Claude](https://claude.ai/new?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Ftiktok%2Fhashtags%2Fvideos%2Flist.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20tiktok.hashtags.videos.list%20%28TikTok%20hashtag%20videos%29.)

## Related

Part of DataXAPI's Social media data. The same key also works for: Creators, Ads, E-commerce.

The same thing on other platforms: [Douyin hashtag videos](https://dataxapi.com/apis/douyin/hashtags/videos/list/), [Instagram hashtag posts](https://dataxapi.com/apis/instagram/hashtags/posts/list/), [Xiaohongshu topic notes](https://dataxapi.com/apis/xiaohongshu/topics/notes/list/)

More Social media data on other platforms: [Bilibili user videos](https://dataxapi.com/apis/bilibili/users/videos/list/), [Bilibili video detail](https://dataxapi.com/apis/bilibili/videos/get/), [Bilibili video search](https://dataxapi.com/apis/bilibili/videos/search/), [Bilibili popular videos](https://dataxapi.com/apis/bilibili/videos/trending/), [Douyin trend-index creator top videos](https://dataxapi.com/apis/douyin/index/creators/videos/list/), [Douyin trend-index keyword hot videos](https://dataxapi.com/apis/douyin/index/videos/search/), [Douyin user videos](https://dataxapi.com/apis/douyin/users/videos/list/), [Douyin video detail](https://dataxapi.com/apis/douyin/videos/get/), [Douyin video play count](https://dataxapi.com/apis/douyin/videos/metrics/), [Douyin related videos](https://dataxapi.com/apis/douyin/videos/related/)

TikTok endpoints: [TikTok Ads Library search](https://dataxapi.com/apis/tiktok/ads/search/), [TikTok Ads Library ad detail](https://dataxapi.com/apis/tiktok/ads/get/), [TikTok comment replies](https://dataxapi.com/apis/tiktok/comments/replies/list/), [TikTok hashtag videos](https://dataxapi.com/apis/tiktok/hashtags/videos/list/), [TikTok user profile](https://dataxapi.com/apis/tiktok/users/get/), [TikTok user search](https://dataxapi.com/apis/tiktok/users/search/), [TikTok user videos](https://dataxapi.com/apis/tiktok/users/videos/list/), [TikTok video comments](https://dataxapi.com/apis/tiktok/videos/comments/list/), [TikTok video detail](https://dataxapi.com/apis/tiktok/videos/get/), [TikTok video search](https://dataxapi.com/apis/tiktok/videos/search/), [TikTok video transcript](https://dataxapi.com/apis/tiktok/videos/transcript/get/), [TikTok user followers](https://dataxapi.com/apis/tiktok/users/followers/list/)

TikTok Creative Center endpoints: [TikTok Creative Center Top Ad detail](https://dataxapi.com/apis/tiktok/creative_center/ads/get/), [TikTok Creative Center Top Ads search](https://dataxapi.com/apis/tiktok/creative_center/ads/search/)

TikTok Shop endpoints: [TikTok Shop product detail](https://dataxapi.com/apis/tiktok/shop/products/get/), [TikTok Shop product reviews](https://dataxapi.com/apis/tiktok/shop/products/reviews/list/), [TikTok Shop product search](https://dataxapi.com/apis/tiktok/shop/products/search/), [TikTok Shop seller products](https://dataxapi.com/apis/tiktok/shop/sellers/products/list/)

Related: [All TikTok endpoints](https://dataxapi.com/apis/tiktok/), [Social media data](https://dataxapi.com/categories/social/), [The same thing on 4 platforms, side by side](https://dataxapi.com/roles/topics-posts-list/), [The post object's fields](https://dataxapi.com/docs/objects/post/)

## Questions

### How much does the TikTok hashtag videos API cost?

$0.0020 per call. The most one call can cost is $0.0020.

### When am I not charged?

Errors, timeouts and objects that do not exist are not charged; an empty result is charged $0.0020.

### How many items does one call return, and how do I get the next page?

20 items a page. The page size is the platform's; limit is not accepted. For the next page pass page.next_cursor as cursor; a cursor is valid for 1 hour. page.has_more is false on the last page.

### What happens if the object does not exist?

The answer is 404 not_found and nothing is charged. reason says which: not_found (it does not exist) or private_or_deleted.

---

Last checked 2026-10-18 19:59 UTC. Catalog revision c48ce454ae6c4c65. [HTML version](https://dataxapi.com/apis/tiktok/hashtags/videos/list/)
