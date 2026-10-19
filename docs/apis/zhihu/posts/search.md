# Zhihu content search API

Get a page of Zhihu answers and articles matching a search; either kind alone, by relevance, newest or most upvoted. About 18 items a call, 20 at most; $0.0020 per call. Errors and timeouts are not charged; an empty result is charged $0.0020.

- Endpoint: `GET https://api.dataxapi.com/v1/zhihu/posts/search`
- ID: `zhihu.posts.search`
- Also known as: search zhihu, zhihu search answers
- Price: $0.0020 / call
- Live status is not on this page, which is a snapshot. Read it with `GET https://api.dataxapi.com/v1/catalog/status`
- Returns: up to 20 a page, a page, with a cursor for the next
- Returns the standard post object, the same on every platform
- [Run it in the Playground](https://dataxapi.com/console/playground/?capability=zhihu.posts.search&params=%7B%22query%22%3A%22%E5%92%96%E5%95%A1%E6%9C%BA%E6%8E%A8%E8%8D%90%22%7D)
- In Chinese: [知乎内容搜索 API](https://dataxapi.com/zh/apis/zhihu/posts/search/)

## What you get

The first 6 rows of a response recorded 2026-10-12 19:18 UTC.

| Field | Value |
| --- | --- |
| type | article |
| published_at | 2026-03-03 08:11 UTC |
| author.followers | 10,699 |
| metrics.likes | 224 |
| metrics.comments | 3 |
| metrics.favorites | 0 |

## Parameters

| Parameter | Type | required | Description |
| --- | --- | --- | --- |
| `query` | text | Yes | Search terms. Example: `咖啡机推荐`. |
| `type` | text |  | Answers only, or articles only; both when left out. Values: `answer`, `article`. Example: `answer`. |
| `sort` | text |  | By relevance, newest first, or most upvoted first. Values: `relevance` (default), `latest`, `popular`. Example: `relevance`. |
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
| `text` | text | Body text. Long text: the compact view keeps the first 500 characters and says so in `warnings`. | `compact` | Yes |
| `lang` | text | Language of the text. | `standard` | Not provided here |
| `published_at` | time | When it was published. | `compact` | Yes |
| `author` | object | Author. | `compact` | Yes |
| `author.id` | text | Author's account ID. | `compact` | Yes |
| `author.username` | text | Author's handle. | `compact` | Yes |
| `author.name` | text | Author's display name. | `compact` | Yes |
| `author.avatar_url` | link | Author's avatar. | `standard` | Yes |
| `author.verified` | yes/no | Whether the author is verified. | `standard` | Not provided here |
| `author.followers` | integer | Author's follower count. | `standard` | Yes |
| `metrics` | object | Engagement counts. | `compact` | Yes |
| `metrics.likes` | integer | Likes. On this platform: Upvotes. | `compact` | Yes |
| `metrics.comments` | integer | Comments. | `compact` | Yes |
| `metrics.shares` | integer | Shares. | `compact` | The platform has none |
| `metrics.favorites` | integer | Saves. | `compact` | Yes |
| `metrics.views` | integer | Views. | `compact` | Not provided here |
| `metrics.reposts` | integer | Reposts. | `compact` | The platform has none |
| `images` | list of link | Image addresses. | `standard` | Not provided here |
| `hashtags` | list of text | Hashtags, without the #. | `standard` | The platform has none |
| `mentions` | list of object | Accounts mentioned in the text. | `standard` | Not provided here |
| `mentions[].id` | text | Account ID. | `standard` | Not provided here |
| `mentions[].username` | text | Handle. | `standard` | Not provided here |
| `mentions[].name` | text | Display name. | `standard` | Not provided here |
| `is_pinned` | yes/no | Whether the author pinned it. | `standard` | Not provided here |
| `post_id` | text | ID of the thread's root post when this is a reply; otherwise null. | `compact` | Yes |
| `parent_id` | text | ID of the item it replies to directly; otherwise null. | `compact` | Yes |
| `root_id` | text | ID of the first-level reply its thread hangs under. | `compact` | The platform has none |
| `approximate` | list of object | Which numbers of this item are approximate or lower bounds; absent when all are exact. | `compact` | Yes |
| `approximate[].field` | text | Path of the field, such as metrics.views. | `compact` | Yes |
| `approximate[].kind` | text | Approximate, or a lower bound. Values: `approximate`, `lower_bound`. | `compact` | Yes |

A field with no value on an item is `null`. A field this endpoint cannot give is left out and listed in `meta.unavailable`.

Typical size of one item: `compact` 1.8 KB, `standard` 10.6 KB, `full` 10.6 KB (measured on the response recorded 2026-10-12 19:18 UTC).

## Paging

About 18 items a page, 20 at most. The page size is the platform's; `limit` is not accepted.

For the next page pass `page.next_cursor` as `cursor`; a cursor is valid for 1 hour. `page.has_more` is false on the last page.

## When you are charged

| Case | Charged |
| --- | --- |
| A result with data | $0.0020, once per call |
| Each further page | charged as a call of its own |
| An empty result | $0.0020 |
| Invalid parameters, a failure of ours or of the data source, a timeout | not charged |
| The most one call can cost | $0.0020 (send `X-Max-Price` to refuse anything above your own limit) |

Prices as read 2026-10-18 19:59 UTC, under price book 2, in effect since 2026-10-17 11:00 UTC; the Playground reads the price in force before a run.

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
curl -G "https://api.dataxapi.com/v1/zhihu/posts/search" \
  --data-urlencode "query=咖啡机推荐" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.zhihu.posts.search(query="咖啡机推荐")
print(result["data"]["items"])
```

### TypeScript

```typescript
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.zhihu.posts.search({ query: "咖啡机推荐" });
console.log(result.data.items);
```

### CLI

```bash
dataxapi call zhihu.posts.search 'query=咖啡机推荐'
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

Add this to your MCP client, then ask your agent to call `zhihu.posts.search`.

## Responses

### 200

From a response recorded 2026-10-12 19:18 UTC. Names, text and IDs are examples, and so are the links: none is the recorded one (the page shows no one's personal data); the figures are as recorded. Long lists are cut. The request ID, cursor and balance are made up.

Size as sent: 180.6 KB in the standard view (31.9 KB compact, 180.6 KB full).

```jsonc
{
  "code": "ok",
  "request_id": "87ee6f95-7dde-47c6-8b04-4ec1594169d0",
  "data": {
    "items": [
      {
        "id": "3250756632",
        "url": "https://www.zhihu.com/answer/3250756632",
        "type": "article",
        "title": "咖啡机推荐入门指南：一篇讲清楚",
        "text": "咖啡机推荐这件事，越简单越好",
        "published_at": "2026-03-03T08:11:12.000Z",
        "author": {
          "id": "cbf102a15e966bc955fc8f2b452b62fa",
          "username": "laozhou_gear",
          "name": "老周说装备",
          "avatar_url": "https://picx.zhimg.com/v2-671ebb705befb9d2492d_l.jpg",
          "followers": 10699
        },
        "metrics": { "likes": 224, "comments": 3, "favorites": 0 },
        "post_id": null,
        "parent_id": null
      },
      // … 16 more
    ]
  },
  "page": {
    "next_cursor": "c1.Km3J8vP9d1xw85c8i-GQVxvJL7XKz0me6b3X34wR",
    "cursor_expires_at": "2026-10-12T20:18:45.000Z",
    "has_more": true,
    "returned": 17
  },
  "warnings": [],
  "meta": {
    "capability": "zhihu.posts.search",
    "result_status": "complete",
    "fetched_at": "2026-10-12T19:18:45.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "lang": "capability",
      "author.verified": "capability",
      "metrics.shares": "platform",
      "metrics.views": "capability",
      "metrics.reposts": "platform",
      "images": "capability",
      "hashtags": "platform",
      "mentions": "capability",
      "is_pinned": "capability",
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

From a recording of 2026-10-12 19:18 UTC, edited by hand to show this case. The request ID and balance are made up.

Size as sent: 651 B in the standard view (651 B compact, 651 B full).

```jsonc
{
  "code": "ok",
  "request_id": "15382efd-b6f4-4024-a3f9-7df9b0c9661e",
  "data": { "items": [] },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 0
  },
  "warnings": [],
  "meta": {
    "capability": "zhihu.posts.search",
    "result_status": "empty",
    "fetched_at": "2026-10-12T19:18:45.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "lang": "capability",
      "author.verified": "capability",
      "metrics.shares": "platform",
      "metrics.views": "capability",
      "metrics.reposts": "platform",
      "images": "capability",
      "hashtags": "platform",
      "mentions": "capability",
      "is_pinned": "capability",
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
  "request_id": "4cfc2ced-c59a-41ba-b115-459f7013991a",
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
  "request_id": "04eda068-9894-483e-b265-44ea0cd09555",
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
  "request_id": "c67e3684-d92d-4981-843c-41ff2b3bdf1a",
  "message": "The data source failed",
  "message_zh": "数据来源出错",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

[This example as a JSON file](https://dataxapi.com/apis/zhihu/posts/search.example.json)

## Use it in your AI

`dataxapi setup` gives the agents on your machine (Claude Code, Codex, Cursor) the DataXAPI MCP server and the base skill. The key is read from DATAXAPI_API_KEY; none is written into a file.

MCP server: `https://api.dataxapi.com/mcp`. The entry for your client is under MCP in the request examples of this page; then ask your agent to call `zhihu.posts.search`.

Or paste this to any AI:

> Read https://dataxapi.com/apis/zhihu/posts/search.md and help me use the DataXAPI endpoint zhihu.posts.search (Zhihu content search).

[Open in ChatGPT](https://chatgpt.com/?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fzhihu%2Fposts%2Fsearch.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20zhihu.posts.search%20%28Zhihu%20content%20search%29.) · [Open in Claude](https://claude.ai/new?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fzhihu%2Fposts%2Fsearch.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20zhihu.posts.search%20%28Zhihu%20content%20search%29.)

## Related

Part of DataXAPI's Social media data. The same key also works for: Creators, Ads, E-commerce.

The same thing on other platforms: [Bilibili video search](https://dataxapi.com/apis/bilibili/videos/search/), [Douyin video search](https://dataxapi.com/apis/douyin/videos/search/), [Kuaishou video search](https://dataxapi.com/apis/kuaishou/videos/search/), [LinkedIn post search](https://dataxapi.com/apis/linkedin/posts/search/), [Threads post search](https://dataxapi.com/apis/threads/posts/search/), [TikTok video search](https://dataxapi.com/apis/tiktok/videos/search/), [Weibo realtime search](https://dataxapi.com/apis/weibo/posts/search/), [X post search](https://dataxapi.com/apis/x/posts/search/), [Xiaohongshu note search](https://dataxapi.com/apis/xiaohongshu/notes/search/), [YouTube video search](https://dataxapi.com/apis/youtube/videos/search/), [WeChat Channels video search](https://dataxapi.com/apis/wechat_channels/videos/search/), [WeChat Search articles and videos](https://dataxapi.com/apis/wechat/posts/search/), [Reddit post search](https://dataxapi.com/apis/reddit/posts/search/), [Pinterest pin search](https://dataxapi.com/apis/pinterest/pins/search/)

More Social media data on other platforms: [Douyin hashtag videos](https://dataxapi.com/apis/douyin/hashtags/videos/list/)

Zhihu endpoints: [Zhihu answer comments](https://dataxapi.com/apis/zhihu/answers/comments/list/), [Zhihu answer detail](https://dataxapi.com/apis/zhihu/answers/get/), [Zhihu article detail](https://dataxapi.com/apis/zhihu/articles/get/), [Zhihu column articles](https://dataxapi.com/apis/zhihu/columns/articles/list/), [Zhihu comment replies](https://dataxapi.com/apis/zhihu/comments/replies/list/), [Zhihu pin detail](https://dataxapi.com/apis/zhihu/pins/get/), [Zhihu content search](https://dataxapi.com/apis/zhihu/posts/search/), [Zhihu question answers](https://dataxapi.com/apis/zhihu/questions/answers/list/), [Zhihu question detail](https://dataxapi.com/apis/zhihu/questions/get/), [Zhihu hot list](https://dataxapi.com/apis/zhihu/trends/list/), [Zhihu user answers](https://dataxapi.com/apis/zhihu/users/answers/list/), [Zhihu user articles](https://dataxapi.com/apis/zhihu/users/articles/list/), [Zhihu user followers](https://dataxapi.com/apis/zhihu/users/followers/list/), [Zhihu user profile](https://dataxapi.com/apis/zhihu/users/get/), [Zhihu user pins](https://dataxapi.com/apis/zhihu/users/pins/list/), [Zhihu user search](https://dataxapi.com/apis/zhihu/users/search/)

Skills that use this endpoint: [Keyword search and mentions](https://dataxapi.com/skills/mentions/)

Related: [All Zhihu endpoints](https://dataxapi.com/apis/zhihu/), [Social media data](https://dataxapi.com/categories/social/), [The same thing on 15 platforms, side by side](https://dataxapi.com/roles/posts-search/), [The post object's fields](https://dataxapi.com/docs/objects/post/)

## Questions

### How much does the Zhihu content search API cost?

$0.0020 per call. The most one call can cost is $0.0020.

### When am I not charged?

Errors and timeouts are not charged; an empty result is charged $0.0020.

### How many items does one call return, and how do I get the next page?

About 18 items a page, 20 at most. The page size is the platform's; limit is not accepted. For the next page pass page.next_cursor as cursor; a cursor is valid for 1 hour. page.has_more is false on the last page.

---

Last checked 2026-10-18 19:59 UTC. Catalog revision c48ce454ae6c4c65. [HTML version](https://dataxapi.com/apis/zhihu/posts/search/)
