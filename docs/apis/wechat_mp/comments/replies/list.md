# WeChat Official Account comment replies API

Get the replies under one comment on a WeChat Official Account article, by the comment's ID and the article's link: text, replier, likes, time posted, IP location, which reply each answers. The first batch only; no further pages. About 3 items a call, 20 at most; $0.0200 per call. Errors, timeouts and objects that do not exist are not charged; an empty result is charged $0.0200.

- Endpoint: `GET https://api.dataxapi.com/v1/wechat_mp/comments/replies/list`
- ID: `wechat_mp.comments.replies.list`
- Also known as: wechat comment replies, mp article comment replies
- Price: $0.0200 / call
- Live status is not on this page, which is a snapshot. Read it with `GET https://api.dataxapi.com/v1/catalog/status`
- Returns: up to 20 a page, everything in one answer, no paging
- Returns the standard comment object, the same on every platform
- [Run it in the Playground](https://dataxapi.com/console/playground/?capability=wechat_mp.comments.replies.list&params=%7B%22id%22%3A%224898789068743115328%22%2C%22post_id%22%3A%22https%3A%2F%2Fmp.weixin.qq.com%2Fs%3F__biz%3DMjM5MjAxNDM4MA%3D%3D%26mid%3D2667039128%26idx%3D1%26sn%3Dd0caf3b8df75fe7376f7c379eda6128f%22%7D)
- In Chinese: [微信公众号评论回复 API](https://dataxapi.com/zh/apis/wechat_mp/comments/replies/list/)

## What you get

The first 2 rows of a response recorded 2026-10-12 22:03 UTC.

| Field | Value |
| --- | --- |
| published_at | 2026-10-12 13:12 UTC |
| metrics.likes | 7 |

## Parameters

| Parameter | Type | required | Description |
| --- | --- | --- | --- |
| `id` | text | Yes | The comment's ID, a string of digits: the id a comment list gives. Example: `4898789068743115328`. |
| `post_id` | text | Yes | Link to the article the comment is on (a WeChat Official Account article is named only by its link): the long link with __biz, mid, idx and sn, or the short /s/ link. Example: `https://mp.weixin.qq.com/s?__biz=MjM5MjAxNDM4MA==&mid=2667039128&idx=1&sn=d0caf3b8df75fe7376f7c379eda6128f`. |
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
| `metrics.comments` | integer | Replies. | `compact` | The platform has none |
| `post_id` | text | ID of the post it is under. | `compact` | Not provided here |
| `parent_id` | text | ID of the comment it replies to directly; null for a top-level comment. | `compact` | Yes |
| `root_id` | text | ID of the top-level comment of its thread; null for a top-level comment. | `compact` | Yes |
| `ext.ip_location` | text | IP location as the platform shows it. | `full` | Yes |
| `approximate` | list of object | Which numbers of this item are approximate or lower bounds; absent when all are exact. | `compact` | Yes |
| `approximate[].field` | text | Path of the field, such as metrics.views. | `compact` | Yes |
| `approximate[].kind` | text | Approximate, or a lower bound. Values: `approximate`, `lower_bound`. | `compact` | Yes |

A field with no value on an item is `null`. A field this endpoint cannot give is left out and listed in `meta.unavailable`.

Typical size of one item: `compact` 358 B, `standard` 530 B, `full` 561 B (measured on the response recorded 2026-10-12 22:03 UTC).

## Paging

About 3 items a page, 20 at most. The page size is the platform's; `limit` is not accepted.

Everything comes in one page; no cursor is issued.

## When you are charged

| Case | Charged |
| --- | --- |
| A result with data | $0.0200, once per call |
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
| 410 | `run_expired` | This run has expired and starts no more calls | No | No |
| 429 | `rate_limited` | Too many requests, or too many calls in progress | No | Yes |
| 429 | `cost_cap_exceeded` | This account's allowance for today is used up | No | Yes |
| 429 | `uncharged_cost_limit` | Too many of this account's calls today returned nothing and were not charged; endpoints of this kind can be called again tomorrow (UTC) | No | Yes |
| 500 | `settlement_unknown` | Whether this call settled is not known; ask again with the same idempotency key, or look it up by request ID | Unknown: look the call up | With the same idempotency key |
| 500 | `internal_error` | The service failed | No | Yes |
| 502 | `upstream_failed` | The data source failed | No | Yes |
| 502 | `upstream_changed` | The data source returned an unexpected structure | No | Yes |
| 502 | `upstream_unclear` | The data source's answer could not be interpreted; retry at most once | No | Once |
| 503 | `upstream_busy` | The data source is busy; retry shortly | No | Yes |
| 503 | `capability_paused` | This endpoint is paused | No | Yes |
| 503 | `overloaded` | The service is busy; retry shortly | No | Yes |
| 504 | `timeout` | The data did not arrive in time; retry with the same idempotency key | No | Yes |

[All error codes](https://dataxapi.com/docs/errors/)

## Request

The key is read from the environment; no key is ever written into a page.

### cURL

```bash
curl -G "https://api.dataxapi.com/v1/wechat_mp/comments/replies/list" \
  --data-urlencode "id=4898789068743115328" \
  --data-urlencode "post_id=https://mp.weixin.qq.com/s?__biz=MjM5MjAxNDM4MA==&mid=2667039128&idx=1&sn=d0caf3b8df75fe7376f7c379eda6128f" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.wechat_mp.comments.replies.list(id="4898789068743115328", post_id="https://mp.weixin.qq.com/s?__biz=MjM5MjAxNDM4MA==&mid=2667039128&idx=1&sn=d0caf3b8df75fe7376f7c379eda6128f")
print(result["data"]["items"])
```

### TypeScript

```typescript
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.wechat_mp.comments.replies.list({ id: "4898789068743115328", post_id: "https://mp.weixin.qq.com/s?__biz=MjM5MjAxNDM4MA==&mid=2667039128&idx=1&sn=d0caf3b8df75fe7376f7c379eda6128f" });
console.log(result.data.items);
```

### CLI

```bash
dataxapi call wechat_mp.comments.replies.list id=4898789068743115328 'post_id=https://mp.weixin.qq.com/s?__biz=MjM5MjAxNDM4MA==&mid=2667039128&idx=1&sn=d0caf3b8df75fe7376f7c379eda6128f'
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

Add this to your MCP client, then ask your agent to call `wechat_mp.comments.replies.list`.

## Responses

### 200

From a response recorded 2026-10-12 22:03 UTC. Names, text and IDs are examples, and so are the links: none is the recorded one (the page shows no one's personal data); the figures are as recorded. Long lists are cut. The request ID, cursor and balance are made up.

Size as sent: 2.6 KB in the standard view (1.9 KB compact, 2.7 KB full).

```jsonc
{
  "code": "ok",
  "request_id": "94022079-6c1e-4296-8534-facf04553008",
  "data": {
    "items": [
      {
        "id": "4667891604168185340",
        "text": "收藏了，周末就去试试",
        "published_at": "2026-10-12T13:12:57.000Z",
        "author": {
          "id": "gh_d81fd6f91c9b",
          "name": "南边的风",
          "avatar_url": "https://wx.qlogo.cn/mmhead/voy6zAv2Hrx7Tvmlr3Gzl87zUUVG7Pcx2nzZrn0f/132"
        },
        "metrics": { "likes": 7 },
        "parent_id": "4996176482345452248",
        "root_id": "4374678575963478567"
      },
      // … 3 more
    ]
  },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 4
  },
  "warnings": [],
  "meta": {
    "capability": "wechat_mp.comments.replies.list",
    "result_status": "complete",
    "fetched_at": "2026-10-12T22:03:02.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "url": "platform",
      "author.username": "platform",
      "metrics.comments": "platform",
      "post_id": "capability"
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

From a response recorded 2026-10-12 22:04 UTC. The request ID and balance are made up.

Size as sent: 512 B in the standard view (512 B compact, 512 B full).

```jsonc
{
  "code": "ok",
  "request_id": "a06016e6-dca1-405e-bac7-f71b5d5f879c",
  "data": { "items": [] },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 0
  },
  "warnings": [],
  "meta": {
    "capability": "wechat_mp.comments.replies.list",
    "result_status": "empty",
    "fetched_at": "2026-10-12T22:04:35.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "url": "platform",
      "author.username": "platform",
      "metrics.comments": "platform",
      "post_id": "capability"
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
  "request_id": "d0969e73-f41f-452e-82cb-145dc749f9e4",
  "message": "A parameter is invalid",
  "message_zh": "参数不合法",
  "charged": false,
  "retry": "after_fix",
  "retry_after_seconds": null,
  "param": null,
  "problems": ["id is required", "post_id is required"],
  "docs_url": "https://dataxapi.com/docs/errors#invalid_params"
}
```

### 402

An example written to the specification, not a recorded response.

```json
{
  "code": "insufficient_balance",
  "request_id": "50ca6d28-1402-41c1-a73f-07d7843d8601",
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
  "request_id": "0c9a5a4f-f9ea-4001-8f5b-b3d6ef0abf05",
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
  "request_id": "0539f564-f074-4fce-9c67-8ed43c33034c",
  "message": "The data source failed",
  "message_zh": "数据来源出错",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

[This example as a JSON file](https://dataxapi.com/apis/wechat_mp/comments/replies/list.example.json)

## Use it in your AI

`dataxapi setup` gives the agents on your machine (Claude Code, Codex, Cursor) the DataXAPI MCP server and the base skill. The key is read from DATAXAPI_API_KEY; none is written into a file.

MCP server: `https://api.dataxapi.com/mcp`. The entry for your client is under MCP in the request examples of this page; then ask your agent to call `wechat_mp.comments.replies.list`.

Or paste this to any AI:

> Read https://dataxapi.com/apis/wechat_mp/comments/replies/list.md and help me use the DataXAPI endpoint wechat_mp.comments.replies.list (WeChat Official Account comment replies).

[Open in ChatGPT](https://chatgpt.com/?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fwechat_mp%2Fcomments%2Freplies%2Flist.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20wechat_mp.comments.replies.list%20%28WeChat%20Official%20Account%20comment%20replies%29.) · [Open in Claude](https://claude.ai/new?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fwechat_mp%2Fcomments%2Freplies%2Flist.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20wechat_mp.comments.replies.list%20%28WeChat%20Official%20Account%20comment%20replies%29.)

## Related

Part of DataXAPI's Social media data. The same key also works for: Creators, Ads, E-commerce.

More Social media data on other platforms: [Douyin comment replies](https://dataxapi.com/apis/douyin/comments/replies/list/), [Bilibili comment replies](https://dataxapi.com/apis/bilibili/comments/replies/list/), [Bilibili video comments](https://dataxapi.com/apis/bilibili/videos/comments/list/), [Douyin video comments](https://dataxapi.com/apis/douyin/videos/comments/list/), [Kuaishou comment replies](https://dataxapi.com/apis/kuaishou/comments/replies/list/), [Kuaishou video comments](https://dataxapi.com/apis/kuaishou/videos/comments/list/), [Facebook post comments](https://dataxapi.com/apis/facebook/posts/comments/list/), [Instagram comment replies](https://dataxapi.com/apis/instagram/comments/replies/list/), [Instagram post comments](https://dataxapi.com/apis/instagram/posts/comments/list/), [TikTok comment replies](https://dataxapi.com/apis/tiktok/comments/replies/list/), [TikTok video comments](https://dataxapi.com/apis/tiktok/videos/comments/list/), [Weibo comment replies](https://dataxapi.com/apis/weibo/comments/replies/list/), [Weibo post comments](https://dataxapi.com/apis/weibo/posts/comments/list/), [Xiaohongshu comment replies](https://dataxapi.com/apis/xiaohongshu/comments/replies/list/), [Xiaohongshu note comments](https://dataxapi.com/apis/xiaohongshu/notes/comments/list/), [YouTube comment replies](https://dataxapi.com/apis/youtube/comments/replies/list/), [YouTube video comments](https://dataxapi.com/apis/youtube/videos/comments/list/), [WeChat Channels video comments](https://dataxapi.com/apis/wechat_channels/videos/comments/list/), [Reddit post comments](https://dataxapi.com/apis/reddit/posts/comments/list/), [Zhihu answer comments](https://dataxapi.com/apis/zhihu/answers/comments/list/), [Zhihu comment replies](https://dataxapi.com/apis/zhihu/comments/replies/list/), [Douyin hashtag videos](https://dataxapi.com/apis/douyin/hashtags/videos/list/), [Bilibili hot searches](https://dataxapi.com/apis/bilibili/trends/list/), [Bilibili user profile](https://dataxapi.com/apis/bilibili/users/get/), [Bilibili user videos](https://dataxapi.com/apis/bilibili/users/videos/list/)

WeChat Official Accounts endpoints: [WeChat Official Account articles](https://dataxapi.com/apis/wechat_mp/accounts/articles/list/), [WeChat Official Account profile](https://dataxapi.com/apis/wechat_mp/accounts/get/), [WeChat Official Account article comments](https://dataxapi.com/apis/wechat_mp/articles/comments/list/), [WeChat Official Account article detail](https://dataxapi.com/apis/wechat_mp/articles/get/), [WeChat Official Account article stats](https://dataxapi.com/apis/wechat_mp/articles/metrics/), [WeChat Official Account comment replies](https://dataxapi.com/apis/wechat_mp/comments/replies/list/)

Related: [All WeChat Official Accounts endpoints](https://dataxapi.com/apis/wechat_mp/), [Social media data](https://dataxapi.com/categories/social/), [The comment object's fields](https://dataxapi.com/docs/objects/comment/)

## Questions

### How much does the WeChat Official Account comment replies API cost?

$0.0200 per call. The most one call can cost is $0.0200.

### When am I not charged?

Errors, timeouts and objects that do not exist are not charged; an empty result is charged $0.0200.

### How many items does one call return, and how do I get the next page?

About 3 items a page, 20 at most. The page size is the platform's; limit is not accepted. Everything comes in one page; no cursor is issued.

### What happens if the object does not exist?

The answer is 404 not_found and nothing is charged. reason says which: not_found (it does not exist) or private_or_deleted.

---

Last checked 2026-10-18 19:59 UTC. Catalog revision c48ce454ae6c4c65. [HTML version](https://dataxapi.com/apis/wechat_mp/comments/replies/list/)
