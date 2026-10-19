# WeChat Channels video comments API

Get a page of top-level comments on a WeChat Channels video by its ID: text, commenter, likes, time posted, IP location. About 24 items a call, 30 at most; $0.0200 per call. Errors, timeouts and objects that do not exist are not charged; an empty result is charged $0.0200.

- Endpoint: `GET https://api.dataxapi.com/v1/wechat_channels/videos/comments/list`
- ID: `wechat_channels.videos.comments.list`
- Also known as: wechat channels comment list, channels video comments
- Price: $0.0200 / call
- Live status is not on this page, which is a snapshot. Read it with `GET https://api.dataxapi.com/v1/catalog/status`
- Returns: up to 30 a page, a page, with a cursor for the next
- Returns the standard comment object, the same on every platform
- [Run it in the Playground](https://dataxapi.com/console/playground/?capability=wechat_channels.videos.comments.list&params=%7B%22id%22%3A%2214559898883113486609%22%7D)
- In Chinese: [微信视频号作品评论 API](https://dataxapi.com/zh/apis/wechat_channels/videos/comments/list/)

## What you get

The first 2 rows of a response recorded 2026-10-13 03:25 UTC.

| Field | Value |
| --- | --- |
| published_at | 2024-12-31 20:01 UTC |
| metrics.likes | 349 |

## Parameters

| Parameter | Type | required | Description |
| --- | --- | --- | --- |
| `id` | text | Yes | The video's ID, a string of digits: the id a video list or a video gives. Example: `14559898883113486609`. |
| `cursor` | text |  | Cursor returned by the previous page. Pass `page.next_cursor` of the page before, unchanged. Each page is charged as a call of its own. |
| `view` | text |  | How much of each item to return. All three cost the same. Values: `compact`, `standard` (default), `full`. |
| `fields` | list of text |  | Return only these fields. Each by its path, such as `author.name`. |

## Returned fields

`data.items` is a list of comment objects. Stable: fields are only ever added.

Three views: `compact` (the most used fields, long text cut short), `standard` (the default: every standard field) and `full` (adds `ext`, the platform's own fields). A field is in the view named and in every larger one.

| Field | Type | Description | From view | This endpoint |
| --- | --- | --- | --- | --- |
| `id` | text | ID. | `compact` | Yes |
| `url` | link | Link that opens the comment. | `compact` | The platform has none |
| `text` | text | Text. Long text: the compact view keeps the first 500 characters and says so in `warnings`. | `compact` | Yes |
| `published_at` | time | When it was posted. | `compact` | Yes |
| `author` | object | Commenter. | `compact` | Yes |
| `author.id` | text | Commenter's account ID. | `compact` | Yes |
| `author.username` | text | Commenter's handle. | `compact` | The platform has none |
| `author.name` | text | Commenter's display name. | `compact` | Yes |
| `author.avatar_url` | link | Commenter's avatar. | `standard` | Yes |
| `metrics` | object | Engagement counts. | `compact` | Yes |
| `metrics.likes` | integer | Likes. | `compact` | Yes |
| `metrics.comments` | integer | Replies. | `compact` | Not provided here |
| `post_id` | text | ID of the post it is under. | `compact` | Yes |
| `parent_id` | text | ID of the comment it replies to directly; null for a top-level comment. | `compact` | Yes |
| `root_id` | text | ID of the top-level comment of its thread; null for a top-level comment. | `compact` | Yes |
| `ext.ip_location` | text | IP location as the platform shows it. | `full` | Yes |
| `approximate` | list of object | Which numbers of this item are approximate or lower bounds; absent when all are exact. | `compact` | Yes |
| `approximate[].field` | text | Path of the field, such as metrics.views. | `compact` | Yes |
| `approximate[].kind` | text | Approximate, or a lower bound. Values: `approximate`, `lower_bound`. | `compact` | Yes |

A field with no value on an item is `null`. A field this endpoint cannot give is left out and listed in `meta.unavailable`.

Typical size of one item: `compact` 468 B, `standard` 635 B, `full` 667 B (measured on the response recorded 2026-10-13 03:25 UTC).

## Paging

About 24 items a page, 30 at most. The page size is the platform's; `limit` is not accepted.

For the next page pass `page.next_cursor` as `cursor`; a cursor is valid for 1 hour. `page.has_more` is false on the last page.

## When you are charged

| Case | Charged |
| --- | --- |
| A result with data | $0.0200, once per call |
| Each further page | charged as a call of its own |
| An empty result | $0.0200 |
| The object does not exist (404) | not charged |
| Invalid parameters, a failure of ours or of the data source, a timeout | not charged |
| The most one call can cost | $0.0200 (send `X-Max-Price` to refuse anything above your own limit) |

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
curl -G "https://api.dataxapi.com/v1/wechat_channels/videos/comments/list" \
  --data-urlencode "id=14559898883113486609" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.wechat_channels.videos.comments.list(id="14559898883113486609")
print(result["data"]["items"])
```

### TypeScript

```typescript
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.wechat_channels.videos.comments.list({ id: "14559898883113486609" });
console.log(result.data.items);
```

### CLI

```bash
dataxapi call wechat_channels.videos.comments.list id=14559898883113486609
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

Add this to your MCP client, then ask your agent to call `wechat_channels.videos.comments.list`.

## Responses

### 200

From a response recorded 2026-10-13 03:25 UTC. Names, text and IDs are examples, and so are the links: none is the recorded one (the page shows no one's personal data); the figures are as recorded. Long lists are cut. The request ID, cursor and balance are made up.

Size as sent: 14.2 KB in the standard view (10.6 KB compact, 14.9 KB full).

```jsonc
{
  "code": "ok",
  "request_id": "4936e536-b2a8-46ef-9132-0ad7b1d40233",
  "data": {
    "items": [
      {
        "id": "14599225504823757671",
        "text": "第三个建议太实用了！",
        "published_at": "2024-12-31T20:01:33.000Z",
        "author": {
          "id": "v2_060000231003b20fa4351d5400566796ed36158bb99b591533bcfe49e950522f0446689d86@finder",
          "name": "山野咖啡馆",
          "avatar_url": "https://wx.qlogo.cn/mmhead/kIZxpOrIhPoPPWoaXrILQ45F4oZTzTPtQa6ADu6x/132"
        },
        "metrics": { "likes": 349 },
        "post_id": "14752989122976584035",
        "parent_id": null,
        "root_id": null
      },
      // … 21 more
    ]
  },
  "page": {
    "next_cursor": "c1.SUxO2elUiHjFkB53f7ECZr8FM9MFD0eQZJ1J-6Rh",
    "cursor_expires_at": "2026-10-13T04:25:36.000Z",
    "has_more": true,
    "returned": 22
  },
  "warnings": [
    { "code": "items_dropped", "count": 2 }
  ],
  "meta": {
    "capability": "wechat_channels.videos.comments.list",
    "result_status": "complete",
    "fetched_at": "2026-10-13T03:25:36.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "url": "platform",
      "author.username": "platform",
      "metrics.comments": "capability"
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

From a recording of 2026-10-13 03:25 UTC, edited by hand to show this case. The request ID and balance are made up.

Size as sent: 496 B in the standard view (496 B compact, 496 B full).

```jsonc
{
  "code": "ok",
  "request_id": "09772434-2305-487c-b9c9-6dc709abc40e",
  "data": { "items": [] },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 0
  },
  "warnings": [],
  "meta": {
    "capability": "wechat_channels.videos.comments.list",
    "result_status": "empty",
    "fetched_at": "2026-10-13T03:25:36.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "url": "platform",
      "author.username": "platform",
      "metrics.comments": "capability"
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
  "request_id": "439bc948-d09a-478b-a8bd-fd5fc0402527",
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
  "request_id": "9e8a22f3-02f2-4db5-9b97-ca8aa8d651ab",
  "message": "The balance is too low",
  "message_zh": "余额不足",
  "charged": false,
  "retry": "after_fix",
  "retry_after_seconds": null,
  "param": null,
  "required": "0.02",
  "available": "0",
  "docs_url": "https://dataxapi.com/docs/errors#insufficient_balance"
}
```

### 404

An example written to the specification, not a recorded response.

```json
{
  "code": "not_found",
  "request_id": "37f15937-a7e7-446a-866d-9a452d99cd5b",
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
  "request_id": "8a3cec84-54ee-4780-90ef-9893b4a79da9",
  "message": "The data source failed",
  "message_zh": "数据来源出错",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

[This example as a JSON file](https://dataxapi.com/apis/wechat_channels/videos/comments/list.example.json)

## Use it in your AI

`dataxapi setup` gives the agents on your machine (Claude Code, Codex, Cursor) the DataXAPI MCP server and the base skill. The key is read from DATAXAPI_API_KEY; none is written into a file.

MCP server: `https://api.dataxapi.com/mcp`. The entry for your client is under MCP in the request examples of this page; then ask your agent to call `wechat_channels.videos.comments.list`.

Or paste this to any AI:

> Read https://dataxapi.com/apis/wechat_channels/videos/comments/list.md and help me use the DataXAPI endpoint wechat_channels.videos.comments.list (WeChat Channels video comments).

[Open in ChatGPT](https://chatgpt.com/?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fwechat_channels%2Fvideos%2Fcomments%2Flist.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20wechat_channels.videos.comments.list%20%28WeChat%20Channels%20video%20comments%29.) · [Open in Claude](https://claude.ai/new?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fwechat_channels%2Fvideos%2Fcomments%2Flist.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20wechat_channels.videos.comments.list%20%28WeChat%20Channels%20video%20comments%29.)

## Related

Part of DataXAPI's Social media data. The same key also works for: Creators, Ads, E-commerce.

The same thing on other platforms: [Bilibili video comments](https://dataxapi.com/apis/bilibili/videos/comments/list/), [Douyin video comments](https://dataxapi.com/apis/douyin/videos/comments/list/), [Kuaishou video comments](https://dataxapi.com/apis/kuaishou/videos/comments/list/), [Facebook post comments](https://dataxapi.com/apis/facebook/posts/comments/list/), [Instagram post comments](https://dataxapi.com/apis/instagram/posts/comments/list/), [TikTok video comments](https://dataxapi.com/apis/tiktok/videos/comments/list/), [Weibo post comments](https://dataxapi.com/apis/weibo/posts/comments/list/), [X post replies](https://dataxapi.com/apis/x/posts/replies/list/), [Xiaohongshu note comments](https://dataxapi.com/apis/xiaohongshu/notes/comments/list/), [YouTube video comments](https://dataxapi.com/apis/youtube/videos/comments/list/), [Reddit post comments](https://dataxapi.com/apis/reddit/posts/comments/list/), [Zhihu answer comments](https://dataxapi.com/apis/zhihu/answers/comments/list/)

More Social media data on other platforms: [Douyin comment replies](https://dataxapi.com/apis/douyin/comments/replies/list/), [Bilibili comment replies](https://dataxapi.com/apis/bilibili/comments/replies/list/), [Kuaishou comment replies](https://dataxapi.com/apis/kuaishou/comments/replies/list/), [Instagram comment replies](https://dataxapi.com/apis/instagram/comments/replies/list/), [TikTok comment replies](https://dataxapi.com/apis/tiktok/comments/replies/list/), [Weibo comment replies](https://dataxapi.com/apis/weibo/comments/replies/list/), [Xiaohongshu comment replies](https://dataxapi.com/apis/xiaohongshu/comments/replies/list/), [YouTube comment replies](https://dataxapi.com/apis/youtube/comments/replies/list/), [WeChat Official Account article comments](https://dataxapi.com/apis/wechat_mp/articles/comments/list/), [WeChat Official Account comment replies](https://dataxapi.com/apis/wechat_mp/comments/replies/list/), [Zhihu comment replies](https://dataxapi.com/apis/zhihu/comments/replies/list/), [Douyin hashtag videos](https://dataxapi.com/apis/douyin/hashtags/videos/list/)

WeChat Channels endpoints: [WeChat Channels account profile](https://dataxapi.com/apis/wechat_channels/users/get/), [WeChat Channels video detail](https://dataxapi.com/apis/wechat_channels/videos/get/), [WeChat Channels video comments](https://dataxapi.com/apis/wechat_channels/videos/comments/list/), [WeChat Channels account collections](https://dataxapi.com/apis/wechat_channels/users/collections/list/), [WeChat Channels collection videos](https://dataxapi.com/apis/wechat_channels/collections/videos/list/), [WeChat Channels account videos](https://dataxapi.com/apis/wechat_channels/users/videos/list/), [WeChat Channels video search](https://dataxapi.com/apis/wechat_channels/videos/search/)

How-to guides and answers: [How to get WeChat Channels video comments](https://dataxapi.com/guides/wechat-channels-video-comments/), [How do I get WeChat Channels data?](https://dataxapi.com/answers/how-to-get-wechat-channels-data/)

Skills that use this endpoint: [Comments and word of mouth](https://dataxapi.com/skills/comments/)

Related: [All WeChat Channels endpoints](https://dataxapi.com/apis/wechat_channels/), [Social media data](https://dataxapi.com/categories/social/), [The same thing on 13 platforms, side by side](https://dataxapi.com/roles/posts-comments-list/), [The comment object's fields](https://dataxapi.com/docs/objects/comment/)

## Questions

### How much does the WeChat Channels video comments API cost?

$0.0200 per call. The most one call can cost is $0.0200.

### When am I not charged?

Errors, timeouts and objects that do not exist are not charged; an empty result is charged $0.0200.

### How many items does one call return, and how do I get the next page?

About 24 items a page, 30 at most. The page size is the platform's; limit is not accepted. For the next page pass page.next_cursor as cursor; a cursor is valid for 1 hour. page.has_more is false on the last page.

### What happens if the object does not exist?

The answer is 404 not_found and nothing is charged. reason says which: not_found (it does not exist) or private_or_deleted.

---

Last checked 2026-10-18 19:59 UTC. Catalog revision c48ce454ae6c4c65. [HTML version](https://dataxapi.com/apis/wechat_channels/videos/comments/list/)
