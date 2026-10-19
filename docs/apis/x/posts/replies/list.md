# X post replies API

Get a page of the replies under an X post by its ID, in the platform's order of relevance; a reply on X is itself a post and is returned as one. About 35 items a call, 60 at most; $0.0020 per call. Errors and timeouts are not charged; an empty result is charged $0.0020.

- Endpoint: `GET https://api.dataxapi.com/v1/x/posts/replies/list`
- ID: `x.posts.replies.list`
- Also known as: tweet replies, twitter comments
- Price: $0.0020 / call
- Live status is not on this page, which is a snapshot. Read it with `GET https://api.dataxapi.com/v1/catalog/status`
- Returns: up to 60 a page, a page, with a cursor for the next
- Returns the standard post object, the same on every platform
- `id` is in the link: `x.com/i/status/<id>`.
- [Run it in the Playground](https://dataxapi.com/console/playground/?capability=x.posts.replies.list&params=%7B%22id%22%3A%222108198226532708497%22%7D)
- In Chinese: [X 帖子回复列表 API](https://dataxapi.com/zh/apis/x/posts/replies/list/)

## What you get

The first 8 rows of a response recorded 2026-10-12 19:11 UTC.

| Field | Value |
| --- | --- |
| type | text |
| lang | en |
| published_at | 2026-10-08 14:10 UTC |
| author.verified | true |
| metrics.likes | 14 |
| metrics.comments | 1 |
| metrics.favorites | 1 |
| metrics.views | 1,419 |

## Parameters

| Parameter | Type | required | Description |
| --- | --- | --- | --- |
| `id` | text | Yes | Post ID, a string of digits. Example: `2108198226532708497`. |
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
| `author.verified` | yes/no | Whether the author is verified. | `standard` | Yes |
| `author.followers` | integer | Author's follower count. | `standard` | Not provided here |
| `metrics` | object | Engagement counts. | `compact` | Yes |
| `metrics.likes` | integer | Likes. | `compact` | Yes |
| `metrics.comments` | integer | Comments. On this platform: Replies. | `compact` | Yes |
| `metrics.shares` | integer | Shares. | `compact` | The platform has none |
| `metrics.favorites` | integer | Saves. On this platform: Bookmarks. | `compact` | Yes |
| `metrics.views` | integer | Views. | `compact` | Yes |
| `metrics.reposts` | integer | Reposts. On this platform: Retweets; quotes are counted apart, in ext.quotes. | `compact` | Yes |
| `images` | list of link | Image addresses. | `standard` | Not provided here |
| `hashtags` | list of text | Hashtags, without the #. | `standard` | Yes |
| `mentions` | list of object | Accounts mentioned in the text. | `standard` | Yes |
| `mentions[].id` | text | Account ID. | `standard` | Yes |
| `mentions[].username` | text | Handle. | `standard` | Yes |
| `mentions[].name` | text | Display name. | `standard` | Yes |
| `is_pinned` | yes/no | Whether the author pinned it. | `standard` | Not provided here |
| `post_id` | text | ID of the thread's root post when this is a reply; otherwise null. On this platform: ID of the conversation's root post. | `compact` | Yes |
| `parent_id` | text | ID of the item it replies to directly; otherwise null. | `compact` | Not provided here |
| `root_id` | text | ID of the first-level reply its thread hangs under. | `compact` | The platform has none |
| `ext.quotes` | integer | Times it was quoted. | `full` | Yes |
| `approximate` | list of object | Which numbers of this item are approximate or lower bounds; absent when all are exact. | `compact` | Yes |
| `approximate[].field` | text | Path of the field, such as metrics.views. | `compact` | Yes |
| `approximate[].kind` | text | Approximate, or a lower bound. Values: `approximate`, `lower_bound`. | `compact` | Yes |

A field with no value on an item is `null`. A field this endpoint cannot give is left out and listed in `meta.unavailable`.

Typical size of one item: `compact` 523 B, `standard` 780 B, `full` 799 B (measured on the response recorded 2026-10-12 19:11 UTC).

## Paging

About 35 items a page, 60 at most. The page size is the platform's; `limit` is not accepted.

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

## If the object does not exist

A post that does not exist is not answered with a 404: the source only says the request failed, without saying why, so it is reported as an upstream error that may be retried once and is not charged.

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
curl -G "https://api.dataxapi.com/v1/x/posts/replies/list" \
  --data-urlencode "id=2108198226532708497" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.x.posts.replies.list(id="2108198226532708497")
print(result["data"]["items"])
```

### TypeScript

```typescript
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.x.posts.replies.list({ id: "2108198226532708497" });
console.log(result.data.items);
```

### CLI

```bash
dataxapi call x.posts.replies.list id=2108198226532708497
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

Add this to your MCP client, then ask your agent to call `x.posts.replies.list`.

## Responses

### 200

From a response recorded 2026-10-12 19:11 UTC. Names, text and IDs are examples, and so are the links: none is the recorded one (the page shows no one's personal data); the figures are as recorded. Long lists are cut. The request ID, cursor and balance are made up.

Size as sent: 5.1 KB in the standard view (3.6 KB compact, 5.2 KB full).

```jsonc
{
  "code": "ok",
  "request_id": "8d1c41ef-9476-4956-bef0-7cbcb9a72fe5",
  "data": {
    "items": [
      {
        "id": "1852059004504439503",
        "url": "https://x.com/i/status/1852059004504439503",
        "type": "text",
        "text": "My honest take on weekend hiking, a month in.",
        "lang": "en",
        "published_at": "2026-10-08T14:10:01.000Z",
        "author": {
          "id": "185515870194801997",
          "username": "trail_and_lens",
          "name": "Maya Chen",
          "avatar_url": "https://pbs.twimg.com/profile_images/1839650090733403766/2e9uy1Sn_normal.jpg",
          "verified": true
        },
        "metrics": {
          "likes": 14,
          "comments": 1,
          "favorites": 1,
          "views": 1419,
          "reposts": 3
        },
        "hashtags": [],
        "mentions": [
          {
            "id": "120227434360127747",
            "username": "maya_makes",
            "name": "Northside Coffee"
          }
        ],
        "post_id": "1811536513306299064"
      },
      // … 5 more
    ]
  },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 6
  },
  "warnings": [],
  "meta": {
    "capability": "x.posts.replies.list",
    "result_status": "complete",
    "fetched_at": "2026-10-12T19:11:03.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "title": "platform",
      "metrics.shares": "platform",
      "is_pinned": "capability",
      "root_id": "platform",
      "author.followers": "capability",
      "images": "capability",
      "parent_id": "capability"
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

From a recording of 2026-10-12 19:12 UTC, edited by hand to show this case. The request ID and balance are made up.

Size as sent: 574 B in the standard view (574 B compact, 574 B full).

```jsonc
{
  "code": "ok",
  "request_id": "dd3af289-a4e0-417f-a56a-3eb4d1113607",
  "data": { "items": [] },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 0
  },
  "warnings": [],
  "meta": {
    "capability": "x.posts.replies.list",
    "result_status": "empty",
    "fetched_at": "2026-10-12T19:12:06.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "title": "platform",
      "metrics.shares": "platform",
      "is_pinned": "capability",
      "root_id": "platform",
      "author.followers": "capability",
      "images": "capability",
      "parent_id": "capability"
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
  "request_id": "944f2a9f-5cdb-4d8b-acb1-be2e90c657aa",
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
  "request_id": "29a27475-7267-438e-8cd6-3576bf998d67",
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
  "request_id": "3bc4bb0e-a9c8-4c84-b913-bb4926ce68dc",
  "message": "The data source failed",
  "message_zh": "数据来源出错",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

[This example as a JSON file](https://dataxapi.com/apis/x/posts/replies/list.example.json)

## Use it in your AI

`dataxapi setup` gives the agents on your machine (Claude Code, Codex, Cursor) the DataXAPI MCP server and the base skill. The key is read from DATAXAPI_API_KEY; none is written into a file.

MCP server: `https://api.dataxapi.com/mcp`. The entry for your client is under MCP in the request examples of this page; then ask your agent to call `x.posts.replies.list`.

Or paste this to any AI:

> Read https://dataxapi.com/apis/x/posts/replies/list.md and help me use the DataXAPI endpoint x.posts.replies.list (X post replies).

[Open in ChatGPT](https://chatgpt.com/?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fx%2Fposts%2Freplies%2Flist.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20x.posts.replies.list%20%28X%20post%20replies%29.) · [Open in Claude](https://claude.ai/new?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fx%2Fposts%2Freplies%2Flist.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20x.posts.replies.list%20%28X%20post%20replies%29.)

## Related

Part of DataXAPI's Social media data. The same key also works for: Creators, Ads, E-commerce.

The same thing on other platforms: [Bilibili video comments](https://dataxapi.com/apis/bilibili/videos/comments/list/), [Douyin video comments](https://dataxapi.com/apis/douyin/videos/comments/list/), [Kuaishou video comments](https://dataxapi.com/apis/kuaishou/videos/comments/list/), [Facebook post comments](https://dataxapi.com/apis/facebook/posts/comments/list/), [Instagram post comments](https://dataxapi.com/apis/instagram/posts/comments/list/), [TikTok video comments](https://dataxapi.com/apis/tiktok/videos/comments/list/), [Weibo post comments](https://dataxapi.com/apis/weibo/posts/comments/list/), [Xiaohongshu note comments](https://dataxapi.com/apis/xiaohongshu/notes/comments/list/), [YouTube video comments](https://dataxapi.com/apis/youtube/videos/comments/list/), [WeChat Channels video comments](https://dataxapi.com/apis/wechat_channels/videos/comments/list/), [Reddit post comments](https://dataxapi.com/apis/reddit/posts/comments/list/), [Zhihu answer comments](https://dataxapi.com/apis/zhihu/answers/comments/list/)

X (Twitter) endpoints: [X article detail](https://dataxapi.com/apis/x/posts/article/get/), [X post detail](https://dataxapi.com/apis/x/posts/get/), [X post quotes](https://dataxapi.com/apis/x/posts/quotes/list/), [X post replies](https://dataxapi.com/apis/x/posts/replies/list/), [X post retweeters](https://dataxapi.com/apis/x/posts/retweeters/list/), [X post search](https://dataxapi.com/apis/x/posts/search/), [X thread context](https://dataxapi.com/apis/x/threads/posts/list/), [X trends](https://dataxapi.com/apis/x/trends/list/), [X user followers](https://dataxapi.com/apis/x/users/followers/list/), [X user following](https://dataxapi.com/apis/x/users/following/list/), [X user profile](https://dataxapi.com/apis/x/users/get/), [X user mentions](https://dataxapi.com/apis/x/users/mentions/list/), [X user posts](https://dataxapi.com/apis/x/users/posts/list/), [X user search](https://dataxapi.com/apis/x/users/search/), [X video transcript](https://dataxapi.com/apis/x/posts/transcript/get/)

X Communities endpoints: [X community posts](https://dataxapi.com/apis/x/communities/posts/list/), [X community profile](https://dataxapi.com/apis/x/communities/get/), [X community members](https://dataxapi.com/apis/x/communities/members/list/)

X Lists endpoints: [X list posts](https://dataxapi.com/apis/x/lists/posts/list/), [X list followers](https://dataxapi.com/apis/x/lists/followers/list/), [X list members](https://dataxapi.com/apis/x/lists/members/list/)

How-to guides and answers: [How to get replies to an X (Twitter) post](https://dataxapi.com/guides/x-post-replies/)

Skills that use this endpoint: [Comments and word of mouth](https://dataxapi.com/skills/comments/)

Related: [All X (Twitter) endpoints](https://dataxapi.com/apis/x/), [Social media data](https://dataxapi.com/categories/social/), [The same thing on 13 platforms, side by side](https://dataxapi.com/roles/posts-comments-list/), [The post object's fields](https://dataxapi.com/docs/objects/post/)

## Questions

### How much does the X post replies API cost?

$0.0020 per call. The most one call can cost is $0.0020.

### When am I not charged?

Errors and timeouts are not charged; an empty result is charged $0.0020.

### How many items does one call return, and how do I get the next page?

About 35 items a page, 60 at most. The page size is the platform's; limit is not accepted. For the next page pass page.next_cursor as cursor; a cursor is valid for 1 hour. page.has_more is false on the last page.

### What happens if the object does not exist?

A post that does not exist is not answered with a 404: the source only says the request failed, without saying why, so it is reported as an upstream error that may be retried once and is not charged.

---

Last checked 2026-10-18 19:59 UTC. Catalog revision c48ce454ae6c4c65. [HTML version](https://dataxapi.com/apis/x/posts/replies/list/)
