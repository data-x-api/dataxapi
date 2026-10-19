# Facebook post comments API

Get a page of the comments on a Facebook post or reel by the post's ID: text, commenter, reactions, reply count, time posted. Up to 10 items a call; $0.0020 per call. Errors, timeouts and objects that do not exist are not charged; an empty result is charged $0.0020.

- Endpoint: `GET https://api.dataxapi.com/v1/facebook/posts/comments/list`
- ID: `facebook.posts.comments.list`
- Also known as: facebook comment list, comments on a facebook post, fb reel comments
- Price: $0.0020 / call
- Live status is not on this page, which is a snapshot. Read it with `GET https://api.dataxapi.com/v1/catalog/status`
- Returns: 10 a page, a page, with a cursor for the next
- Returns the standard comment object, the same on every platform
- [Run it in the Playground](https://dataxapi.com/console/playground/?capability=facebook.posts.comments.list&params=%7B%22id%22%3A%221650176549811048%22%7D)
- In Chinese: [Facebook 帖子评论 API](https://dataxapi.com/zh/apis/facebook/posts/comments/list/)

## What you get

The first 3 rows of a response recorded 2026-10-12 19:17 UTC.

| Field | Value |
| --- | --- |
| published_at | 2026-10-08 14:48 UTC |
| metrics.likes | 10 |
| metrics.comments | 2 |

## Parameters

| Parameter | Type | required | Description |
| --- | --- | --- | --- |
| `id` | text | Yes | Post ID, a string of digits: the id returned by the page's post list and by the post itself. Example: `1650176549811048`. |
| `cursor` | text |  | Cursor returned by the previous page. Pass `page.next_cursor` of the page before, unchanged. Each page is charged as a call of its own. |
| `view` | text |  | How much of each item to return. All three cost the same. Values: `compact`, `standard` (default), `full`. |
| `fields` | list of text |  | Return only these fields. Each by its path, such as `author.name`. |

## Returned fields

`data.items` is a list of comment objects. Stable: fields are only ever added.

Three views: `compact` (the most used fields, long text cut short), `standard` (the default: every standard field) and `full` (adds `ext`, the platform's own fields). A field is in the view named and in every larger one.

| Field | Type | Description | From view | This endpoint |
| --- | --- | --- | --- | --- |
| `id` | text | ID. | `compact` | Yes |
| `url` | link | Link that opens the comment. | `compact` | Not provided here |
| `text` | text | Text. Long text: the compact view keeps the first 500 characters and says so in `warnings`. | `compact` | Yes |
| `published_at` | time | When it was posted. | `compact` | Yes |
| `author` | object | Commenter. | `compact` | Yes |
| `author.id` | text | Commenter's account ID. | `compact` | Yes |
| `author.username` | text | Commenter's handle. | `compact` | Not provided here |
| `author.name` | text | Commenter's display name. | `compact` | Yes |
| `author.avatar_url` | link | Commenter's avatar. | `standard` | Yes |
| `metrics` | object | Engagement counts. | `compact` | Yes |
| `metrics.likes` | integer | Likes. On this platform: All reactions together (like, love, haha and the rest). | `compact` | Yes |
| `metrics.comments` | integer | Replies. | `compact` | Yes |
| `post_id` | text | ID of the post it is under. | `compact` | Yes |
| `parent_id` | text | ID of the comment it replies to directly; null for a top-level comment. | `compact` | Not provided here |
| `root_id` | text | ID of the top-level comment of its thread; null for a top-level comment. | `compact` | Not provided here |
| `approximate` | list of object | Which numbers of this item are approximate or lower bounds; absent when all are exact. | `compact` | Yes |
| `approximate[].field` | text | Path of the field, such as metrics.views. | `compact` | Yes |
| `approximate[].kind` | text | Approximate, or a lower bound. Values: `approximate`, `lower_bound`. | `compact` | Yes |

A field with no value on an item is `null`. A field this endpoint cannot give is left out and listed in `meta.unavailable`.

Typical size of one item: `compact` 370 B, `standard` 808 B, `full` 808 B (measured on the response recorded 2026-10-12 19:17 UTC).

## Paging

10 items a page. The page size is the platform's; `limit` is not accepted.

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
curl -G "https://api.dataxapi.com/v1/facebook/posts/comments/list" \
  --data-urlencode "id=1650176549811048" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.facebook.posts.comments.list(id="1650176549811048")
print(result["data"]["items"])
```

### TypeScript

```typescript
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.facebook.posts.comments.list({ id: "1650176549811048" });
console.log(result.data.items);
```

### CLI

```bash
dataxapi call facebook.posts.comments.list id=1650176549811048
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

Add this to your MCP client, then ask your agent to call `facebook.posts.comments.list`.

## Responses

### 200

From a response recorded 2026-10-12 19:17 UTC. Names, text and IDs are examples, and so are the links: none is the recorded one (the page shows no one's personal data); the figures are as recorded. Long lists are cut. The request ID, cursor and balance are made up.

Size as sent: 8.4 KB in the standard view (4.1 KB compact, 8.4 KB full).

```jsonc
{
  "code": "ok",
  "request_id": "2cc66079-e8c1-4da6-92e7-6fb3e3805077",
  "data": {
    "items": [
      {
        "id": "1167999110680454",
        "text": "Saving this for the weekend.",
        "published_at": "2026-10-08T14:48:35.000Z",
        "author": {
          "id": "100025817007044",
          "name": "Maya Chen",
          "avatar_url": "https://scontent.xx.fbcdn.net/v/t39.30808-1/444198745_151536834206961_n.jpg"
        },
        "metrics": { "likes": 10, "comments": 2 },
        "post_id": "1149355011576297"
      },
      // … 9 more
    ]
  },
  "page": {
    "next_cursor": "c1.zTRVdLLd7PfGYD7fFbzjJXawUalGq5r3T9gS_ild",
    "cursor_expires_at": "2026-10-12T20:17:10.000Z",
    "has_more": true,
    "returned": 10
  },
  "warnings": [],
  "meta": {
    "capability": "facebook.posts.comments.list",
    "result_status": "complete",
    "fetched_at": "2026-10-12T19:17:10.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "url": "capability",
      "author.username": "capability",
      "parent_id": "capability",
      "root_id": "capability"
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

From a recording of 2026-10-12 19:17 UTC, edited by hand to show this case. The request ID and balance are made up.

Size as sent: 508 B in the standard view (508 B compact, 508 B full).

```jsonc
{
  "code": "ok",
  "request_id": "c7066fc2-7c18-486c-a788-05492fa400f8",
  "data": { "items": [] },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 0
  },
  "warnings": [],
  "meta": {
    "capability": "facebook.posts.comments.list",
    "result_status": "empty",
    "fetched_at": "2026-10-12T19:17:10.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "url": "capability",
      "author.username": "capability",
      "parent_id": "capability",
      "root_id": "capability"
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
  "request_id": "2c3ea5d7-9fdf-4086-8881-9ff159ea9dc7",
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
  "request_id": "33f22f62-0c2c-4d69-bc71-ece8ab61b17f",
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
  "request_id": "0ca7b512-b597-4713-a706-bd1f24f530eb",
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
  "request_id": "6cb5bcc8-cd6a-4194-8d35-71bb8c150777",
  "message": "The data source failed",
  "message_zh": "数据来源出错",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

[This example as a JSON file](https://dataxapi.com/apis/facebook/posts/comments/list.example.json)

## Use it in your AI

`dataxapi setup` gives the agents on your machine (Claude Code, Codex, Cursor) the DataXAPI MCP server and the base skill. The key is read from DATAXAPI_API_KEY; none is written into a file.

MCP server: `https://api.dataxapi.com/mcp`. The entry for your client is under MCP in the request examples of this page; then ask your agent to call `facebook.posts.comments.list`.

Or paste this to any AI:

> Read https://dataxapi.com/apis/facebook/posts/comments/list.md and help me use the DataXAPI endpoint facebook.posts.comments.list (Facebook post comments).

[Open in ChatGPT](https://chatgpt.com/?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Ffacebook%2Fposts%2Fcomments%2Flist.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20facebook.posts.comments.list%20%28Facebook%20post%20comments%29.) · [Open in Claude](https://claude.ai/new?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Ffacebook%2Fposts%2Fcomments%2Flist.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20facebook.posts.comments.list%20%28Facebook%20post%20comments%29.)

## Related

Part of DataXAPI's Social media data. The same key also works for: Creators, Ads, E-commerce.

The same thing on other platforms: [Bilibili video comments](https://dataxapi.com/apis/bilibili/videos/comments/list/), [Douyin video comments](https://dataxapi.com/apis/douyin/videos/comments/list/), [Kuaishou video comments](https://dataxapi.com/apis/kuaishou/videos/comments/list/), [Instagram post comments](https://dataxapi.com/apis/instagram/posts/comments/list/), [TikTok video comments](https://dataxapi.com/apis/tiktok/videos/comments/list/), [Weibo post comments](https://dataxapi.com/apis/weibo/posts/comments/list/), [X post replies](https://dataxapi.com/apis/x/posts/replies/list/), [Xiaohongshu note comments](https://dataxapi.com/apis/xiaohongshu/notes/comments/list/), [YouTube video comments](https://dataxapi.com/apis/youtube/videos/comments/list/), [WeChat Channels video comments](https://dataxapi.com/apis/wechat_channels/videos/comments/list/), [Reddit post comments](https://dataxapi.com/apis/reddit/posts/comments/list/), [Zhihu answer comments](https://dataxapi.com/apis/zhihu/answers/comments/list/)

More Social media data on other platforms: [Douyin comment replies](https://dataxapi.com/apis/douyin/comments/replies/list/), [Bilibili comment replies](https://dataxapi.com/apis/bilibili/comments/replies/list/), [Kuaishou comment replies](https://dataxapi.com/apis/kuaishou/comments/replies/list/), [Instagram comment replies](https://dataxapi.com/apis/instagram/comments/replies/list/), [TikTok comment replies](https://dataxapi.com/apis/tiktok/comments/replies/list/), [Weibo comment replies](https://dataxapi.com/apis/weibo/comments/replies/list/), [Xiaohongshu comment replies](https://dataxapi.com/apis/xiaohongshu/comments/replies/list/), [YouTube comment replies](https://dataxapi.com/apis/youtube/comments/replies/list/), [WeChat Official Account article comments](https://dataxapi.com/apis/wechat_mp/articles/comments/list/), [WeChat Official Account comment replies](https://dataxapi.com/apis/wechat_mp/comments/replies/list/), [Zhihu comment replies](https://dataxapi.com/apis/zhihu/comments/replies/list/), [Douyin hashtag videos](https://dataxapi.com/apis/douyin/hashtags/videos/list/), [Bilibili hot searches](https://dataxapi.com/apis/bilibili/trends/list/), [Bilibili user profile](https://dataxapi.com/apis/bilibili/users/get/), [Bilibili user videos](https://dataxapi.com/apis/bilibili/users/videos/list/)

Facebook endpoints: [Facebook page profile](https://dataxapi.com/apis/facebook/pages/get/), [Facebook page posts](https://dataxapi.com/apis/facebook/pages/posts/list/), [Facebook post comments](https://dataxapi.com/apis/facebook/posts/comments/list/), [Facebook post detail](https://dataxapi.com/apis/facebook/posts/get/)

Skills that use this endpoint: [Comments and word of mouth](https://dataxapi.com/skills/comments/)

Related: [All Facebook endpoints](https://dataxapi.com/apis/facebook/), [Social media data](https://dataxapi.com/categories/social/), [The same thing on 13 platforms, side by side](https://dataxapi.com/roles/posts-comments-list/), [The comment object's fields](https://dataxapi.com/docs/objects/comment/)

## Questions

### How much does the Facebook post comments API cost?

$0.0020 per call. The most one call can cost is $0.0020.

### When am I not charged?

Errors, timeouts and objects that do not exist are not charged; an empty result is charged $0.0020.

### How many items does one call return, and how do I get the next page?

10 items a page. The page size is the platform's; limit is not accepted. For the next page pass page.next_cursor as cursor; a cursor is valid for 1 hour. page.has_more is false on the last page.

### What happens if the object does not exist?

The answer is 404 not_found and nothing is charged. reason says which: not_found (it does not exist) or private_or_deleted.

---

Last checked 2026-10-18 19:59 UTC. Catalog revision c48ce454ae6c4c65. [HTML version](https://dataxapi.com/apis/facebook/posts/comments/list/)
