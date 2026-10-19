# Weibo realtime search API

Get a page of Weibo posts for search terms, newest first: text (a long post is cut short here), author and follower count, likes, comments, reposts, pictures, topics. About 10 items a call, 20 at most; $0.0020 per call. Errors and timeouts are not charged; an empty result is charged $0.0020.

- Endpoint: `GET https://api.dataxapi.com/v1/weibo/posts/search`
- ID: `weibo.posts.search`
- Also known as: search weibo, weibo keyword search
- Price: $0.0020 / call
- Live status is not on this page, which is a snapshot. Read it with `GET https://api.dataxapi.com/v1/catalog/status`
- Returns: up to 20 a page, a page, with a cursor for the next
- Returns the standard post object, the same on every platform
- [Run it in the Playground](https://dataxapi.com/console/playground/?capability=weibo.posts.search&params=%7B%22query%22%3A%22%E6%96%B0%E8%83%BD%E6%BA%90%E6%B1%BD%E8%BD%A6%22%7D)
- In Chinese: [微博实时搜索 API](https://dataxapi.com/zh/apis/weibo/posts/search/)

## What you get

The first 7 rows of a response recorded 2026-10-12 19:03 UTC.

| Field | Value |
| --- | --- |
| type | image |
| published_at | 2026-10-12 18:01 UTC |
| author.verified | false |
| author.followers | 2,568 |
| metrics.likes | 0 |
| metrics.comments | 3 |
| metrics.reposts | 0 |

## Parameters

| Parameter | Type | required | Description |
| --- | --- | --- | --- |
| `query` | text | Yes | Search terms. Example: `新能源汽车`. |
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
| `lang` | text | Language of the text. | `standard` | Not provided here |
| `published_at` | time | When it was published. | `compact` | Yes |
| `author` | object | Author. | `compact` | Yes |
| `author.id` | text | Author's account ID. | `compact` | Yes |
| `author.username` | text | Author's handle. | `compact` | The platform has none |
| `author.name` | text | Author's display name. | `compact` | Yes |
| `author.avatar_url` | link | Author's avatar. | `standard` | Yes |
| `author.verified` | yes/no | Whether the author is verified. | `standard` | Yes |
| `author.followers` | integer | Author's follower count. | `standard` | Yes |
| `metrics` | object | Engagement counts. | `compact` | Yes |
| `metrics.likes` | integer | Likes. | `compact` | Yes |
| `metrics.comments` | integer | Comments. | `compact` | Yes |
| `metrics.shares` | integer | Shares. | `compact` | The platform has none |
| `metrics.favorites` | integer | Saves. | `compact` | Not provided here |
| `metrics.views` | integer | Views. | `compact` | Not provided here |
| `metrics.reposts` | integer | Reposts. On this platform: Reposts. | `compact` | Yes |
| `images` | list of link | Image addresses. | `standard` | Yes |
| `hashtags` | list of text | Hashtags, without the #. | `standard` | Yes |
| `mentions` | list of object | Accounts mentioned in the text. | `standard` | Not provided here |
| `mentions[].id` | text | Account ID. | `standard` | Not provided here |
| `mentions[].username` | text | Handle. | `standard` | Not provided here |
| `mentions[].name` | text | Display name. | `standard` | Not provided here |
| `is_pinned` | yes/no | Whether the author pinned it. | `standard` | Not provided here |
| `post_id` | text | ID of the thread's root post when this is a reply; otherwise null. | `compact` | The platform has none |
| `parent_id` | text | ID of the item it replies to directly; otherwise null. | `compact` | The platform has none |
| `root_id` | text | ID of the first-level reply its thread hangs under. | `compact` | The platform has none |
| `ext.text_truncated` | yes/no | Whether the text is cut short: a long post comes with its beginning only in lists and search; get the post for the whole. | `full` | Yes |
| `ext.ip_location` | text | IP location as the platform shows it. | `full` | Yes |
| `ext.reposted_id` | text | ID of the post it reposts; null when it is not a repost. | `full` | Yes |
| `approximate` | list of object | Which numbers of this item are approximate or lower bounds; absent when all are exact. | `compact` | Yes |
| `approximate[].field` | text | Path of the field, such as metrics.views. | `compact` | Yes |
| `approximate[].kind` | text | Approximate, or a lower bound. Values: `approximate`, `lower_bound`. | `compact` | Yes |

A field with no value on an item is `null`. A field this endpoint cannot give is left out and listed in `meta.unavailable`.

Typical size of one item: `compact` 445 B, `standard` 734 B, `full` 807 B (measured on the response recorded 2026-10-12 19:03 UTC).

## Paging

About 10 items a page, 20 at most. The page size is the platform's; `limit` is not accepted.

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
curl -G "https://api.dataxapi.com/v1/weibo/posts/search" \
  --data-urlencode "query=新能源汽车" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.weibo.posts.search(query="新能源汽车")
print(result["data"]["items"])
```

### TypeScript

```typescript
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.weibo.posts.search({ query: "新能源汽车" });
console.log(result.data.items);
```

### CLI

```bash
dataxapi call weibo.posts.search 'query=新能源汽车'
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

Add this to your MCP client, then ask your agent to call `weibo.posts.search`.

## Responses

### 200

From a response recorded 2026-10-12 19:03 UTC. Names, text and IDs are examples, and so are the links: none is the recorded one (the page shows no one's personal data); the figures are as recorded. Long lists are cut. The request ID, cursor and balance are made up.

Size as sent: 7.1 KB in the standard view (4.6 KB compact, 7.8 KB full).

```jsonc
{
  "code": "ok",
  "request_id": "814a139c-cdb8-4a40-ac78-d5eea33f4a49",
  "data": {
    "items": [
      {
        "id": "5236052452850013",
        "url": "https://weibo.com/6203910512/imMkNQ4Yv",
        "type": "image",
        "text": "周末的新能源汽车日常，随手记录一下",
        "published_at": "2026-10-12T18:01:10.000Z",
        "author": {
          "id": "6779824410",
          "name": "山野咖啡馆",
          "avatar_url": "https://tvax1.sinaimg.cn/crop.0.0.512.512.180/E3e34Zyl6RyCChKcvEs7K6EZ.jpg",
          "verified": false,
          "followers": 2568
        },
        "metrics": { "likes": 0, "comments": 3, "reposts": 0 },
        "images": [
          "https://tvax1.sinaimg.cn/large/zhuR7jHU35sRnwVn0Z3jHZz1.jpg",
          "https://tvax1.sinaimg.cn/large/OovUGuApFODFZj7FAMuTAB4S.jpg",
          // … 2 more
        ],
        "hashtags": null
      },
      // … 8 more
    ]
  },
  "page": {
    "next_cursor": "c1.Zaf7tnLyz10UhVmeSCiY-wqUpL2K-Pv9eZq__BRv",
    "cursor_expires_at": "2026-10-12T20:03:07.000Z",
    "has_more": true,
    "returned": 9
  },
  "warnings": [],
  "meta": {
    "capability": "weibo.posts.search",
    "result_status": "complete",
    "fetched_at": "2026-10-12T19:03:07.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "title": "platform",
      "lang": "capability",
      "author.username": "platform",
      "metrics.shares": "platform",
      "metrics.favorites": "capability",
      "metrics.views": "capability",
      "mentions": "capability",
      "is_pinned": "capability",
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

From a response recorded 2026-10-12 19:03 UTC. The request ID and balance are made up.

Size as sent: 672 B in the standard view (672 B compact, 672 B full).

```jsonc
{
  "code": "ok",
  "request_id": "15aea410-9c4f-4671-b96f-fea7bc757e21",
  "data": { "items": [] },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 0
  },
  "warnings": [],
  "meta": {
    "capability": "weibo.posts.search",
    "result_status": "empty",
    "fetched_at": "2026-10-12T19:03:10.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "title": "platform",
      "lang": "capability",
      "author.username": "platform",
      "metrics.shares": "platform",
      "metrics.favorites": "capability",
      "metrics.views": "capability",
      "mentions": "capability",
      "is_pinned": "capability",
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
  "request_id": "f14ee8b4-a6af-4add-ba51-14956801b8b1",
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
  "request_id": "22e1c1f0-07d3-423b-81c6-c864b560cb37",
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
  "request_id": "73b5514b-a6ae-4dc7-a16c-c174227debd4",
  "message": "The data source failed",
  "message_zh": "数据来源出错",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

[This example as a JSON file](https://dataxapi.com/apis/weibo/posts/search.example.json)

## Use it in your AI

`dataxapi setup` gives the agents on your machine (Claude Code, Codex, Cursor) the DataXAPI MCP server and the base skill. The key is read from DATAXAPI_API_KEY; none is written into a file.

MCP server: `https://api.dataxapi.com/mcp`. The entry for your client is under MCP in the request examples of this page; then ask your agent to call `weibo.posts.search`.

Or paste this to any AI:

> Read https://dataxapi.com/apis/weibo/posts/search.md and help me use the DataXAPI endpoint weibo.posts.search (Weibo realtime search).

[Open in ChatGPT](https://chatgpt.com/?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fweibo%2Fposts%2Fsearch.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20weibo.posts.search%20%28Weibo%20realtime%20search%29.) · [Open in Claude](https://claude.ai/new?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fweibo%2Fposts%2Fsearch.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20weibo.posts.search%20%28Weibo%20realtime%20search%29.)

## Related

Part of DataXAPI's Social media data. The same key also works for: Creators, Ads, E-commerce.

The same thing on other platforms: [Bilibili video search](https://dataxapi.com/apis/bilibili/videos/search/), [Douyin video search](https://dataxapi.com/apis/douyin/videos/search/), [Kuaishou video search](https://dataxapi.com/apis/kuaishou/videos/search/), [LinkedIn post search](https://dataxapi.com/apis/linkedin/posts/search/), [Threads post search](https://dataxapi.com/apis/threads/posts/search/), [TikTok video search](https://dataxapi.com/apis/tiktok/videos/search/), [X post search](https://dataxapi.com/apis/x/posts/search/), [Xiaohongshu note search](https://dataxapi.com/apis/xiaohongshu/notes/search/), [YouTube video search](https://dataxapi.com/apis/youtube/videos/search/), [WeChat Channels video search](https://dataxapi.com/apis/wechat_channels/videos/search/), [WeChat Search articles and videos](https://dataxapi.com/apis/wechat/posts/search/), [Reddit post search](https://dataxapi.com/apis/reddit/posts/search/), [Zhihu content search](https://dataxapi.com/apis/zhihu/posts/search/), [Pinterest pin search](https://dataxapi.com/apis/pinterest/pins/search/)

More Social media data on other platforms: [Douyin hashtag videos](https://dataxapi.com/apis/douyin/hashtags/videos/list/), [Bilibili user videos](https://dataxapi.com/apis/bilibili/users/videos/list/), [Bilibili video detail](https://dataxapi.com/apis/bilibili/videos/get/), [Bilibili popular videos](https://dataxapi.com/apis/bilibili/videos/trending/), [Douyin trend-index creator top videos](https://dataxapi.com/apis/douyin/index/creators/videos/list/), [Douyin trend-index keyword hot videos](https://dataxapi.com/apis/douyin/index/videos/search/), [Douyin user videos](https://dataxapi.com/apis/douyin/users/videos/list/)

Weibo endpoints: [Weibo comment replies](https://dataxapi.com/apis/weibo/comments/replies/list/), [Weibo post comments](https://dataxapi.com/apis/weibo/posts/comments/list/), [Weibo post detail](https://dataxapi.com/apis/weibo/posts/get/), [Weibo post likers](https://dataxapi.com/apis/weibo/posts/likers/list/), [Weibo realtime search](https://dataxapi.com/apis/weibo/posts/search/), [Weibo hot search board](https://dataxapi.com/apis/weibo/trends/list/), [Weibo user followers](https://dataxapi.com/apis/weibo/users/followers/list/), [Weibo user profile](https://dataxapi.com/apis/weibo/users/get/), [Weibo user posts](https://dataxapi.com/apis/weibo/users/posts/list/), [Weibo user search](https://dataxapi.com/apis/weibo/users/search/)

Skills that use this endpoint: [Keyword search and mentions](https://dataxapi.com/skills/mentions/)

Related: [All Weibo endpoints](https://dataxapi.com/apis/weibo/), [Social media data](https://dataxapi.com/categories/social/), [The same thing on 15 platforms, side by side](https://dataxapi.com/roles/posts-search/), [The post object's fields](https://dataxapi.com/docs/objects/post/)

## Questions

### How much does the Weibo realtime search API cost?

$0.0020 per call. The most one call can cost is $0.0020.

### When am I not charged?

Errors and timeouts are not charged; an empty result is charged $0.0020.

### How many items does one call return, and how do I get the next page?

About 10 items a page, 20 at most. The page size is the platform's; limit is not accepted. For the next page pass page.next_cursor as cursor; a cursor is valid for 1 hour. page.has_more is false on the last page.

---

Last checked 2026-10-18 19:59 UTC. Catalog revision c48ce454ae6c4c65. [HTML version](https://dataxapi.com/apis/weibo/posts/search/)
