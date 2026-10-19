# Douyin comment replies API

Get a page of the replies under a Douyin comment, by the comment's ID and its video's ID: text, replier, likes, time posted. Up to 20 items a call; $0.0020 per call. Errors and timeouts are not charged; an empty result is charged $0.0020.

- Endpoint: `GET https://api.dataxapi.com/v1/douyin/comments/replies/list`
- ID: `douyin.comments.replies.list`
- Also known as: douyin replies, douyin sub comments
- Price: $0.0020 / call
- Live status is not on this page, which is a snapshot. Read it with `GET https://api.dataxapi.com/v1/catalog/status`
- Returns: 20 a page, a page, with a cursor for the next
- Returns the standard comment object, the same on every platform
- [Run it in the Playground](https://dataxapi.com/console/playground/?capability=douyin.comments.replies.list&params=%7B%22id%22%3A%227655660369926603557%22%2C%22post_id%22%3A%227655283400210664719%22%7D)
- In Chinese: [抖音评论回复 API](https://dataxapi.com/zh/apis/douyin/comments/replies/list/)

## What you get

The first 2 rows of a response recorded 2026-10-12 18:59 UTC.

| Field | Value |
| --- | --- |
| published_at | 2026-06-26 11:50 UTC |
| metrics.likes | 2,308 |

## Parameters

| Parameter | Type | required | Description |
| --- | --- | --- | --- |
| `id` | text | Yes | Comment ID (a top-level comment). Example: `7655660369926603557`. |
| `post_id` | text | Yes | ID of the video the comment is under. Example: `7655283400210664719`. |
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
| `author.username` | text | Commenter's handle. | `compact` | Yes |
| `author.name` | text | Commenter's display name. | `compact` | Yes |
| `author.avatar_url` | link | Commenter's avatar. | `standard` | Yes |
| `metrics` | object | Engagement counts. | `compact` | Yes |
| `metrics.likes` | integer | Likes. | `compact` | Yes |
| `metrics.comments` | integer | Replies. | `compact` | The platform has none |
| `post_id` | text | ID of the post it is under. | `compact` | Yes |
| `parent_id` | text | ID of the comment it replies to directly; null for a top-level comment. | `compact` | Yes |
| `root_id` | text | ID of the top-level comment of its thread; null for a top-level comment. | `compact` | Yes |
| `ext.ip_location` | text | IP location as the platform shows it. | `full` | Yes |
| `approximate` | list of object | Which numbers of this item are approximate or lower bounds; absent when all are exact. | `compact` | Yes |
| `approximate[].field` | text | Path of the field, such as metrics.views. | `compact` | Yes |
| `approximate[].kind` | text | Approximate, or a lower bound. Values: `approximate`, `lower_bound`. | `compact` | Yes |

A field with no value on an item is `null`. A field this endpoint cannot give is left out and listed in `meta.unavailable`.

Typical size of one item: `compact` 355 B, `standard` 499 B, `full` 530 B (measured on the response recorded 2026-10-12 18:59 UTC).

## Paging

20 items a page. The page size is the platform's; `limit` is not accepted.

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

A comment that does not exist cannot be told from a comment without replies: both return an empty result, not a 404, and are charged as an empty result is.

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
curl -G "https://api.dataxapi.com/v1/douyin/comments/replies/list" \
  --data-urlencode "id=7655660369926603557" \
  --data-urlencode "post_id=7655283400210664719" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.douyin.comments.replies.list(id="7655660369926603557", post_id="7655283400210664719")
print(result["data"]["items"])
```

### TypeScript

```typescript
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.douyin.comments.replies.list({ id: "7655660369926603557", post_id: "7655283400210664719" });
console.log(result.data.items);
```

### CLI

```bash
dataxapi call douyin.comments.replies.list id=7655660369926603557 post_id=7655283400210664719
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

Add this to your MCP client, then ask your agent to call `douyin.comments.replies.list`.

## Responses

### 200

From a response recorded 2026-10-12 18:59 UTC. Names, text and IDs are examples, and so are the links: none is the recorded one (the page shows no one's personal data); the figures are as recorded. Long lists are cut. The request ID, cursor and balance are made up.

Size as sent: 10.2 KB in the standard view (7.4 KB compact, 10.8 KB full).

```jsonc
{
  "code": "ok",
  "request_id": "c6f871dc-f926-49f9-b383-d8541be44b5f",
  "data": {
    "items": [
      {
        "id": "7281542808761380598",
        "text": "第三个建议太实用了！",
        "published_at": "2026-06-26T11:50:22.000Z",
        "author": {
          "id": "MS4wLjABAAAA_p_ZcarAlfQSUXheWfou6Urggj6nSw5RWztBuPbTGeE",
          "username": "nanfeng_0721",
          "name": "南边的风",
          "avatar_url": "https://p3-pc.douyinpic.com/aweme/100x100/aweme-avatar/tos-cn-avt-0015_40a6ed26a1d5485803fe.jpeg"
        },
        "metrics": { "likes": 2308 },
        "post_id": "7235042234252823683",
        "parent_id": "7808984148800124107",
        "root_id": "7288185174927937448"
      },
      // … 19 more
    ]
  },
  "page": {
    "next_cursor": "c1.p2cQ0s_d9x_R4AqMMpd5I1gJ1SR4-Ep_ZmuWuU3t",
    "cursor_expires_at": "2026-10-12T19:59:36.000Z",
    "has_more": true,
    "returned": 20
  },
  "warnings": [],
  "meta": {
    "capability": "douyin.comments.replies.list",
    "result_status": "complete",
    "fetched_at": "2026-10-12T18:59:36.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": { "url": "platform", "metrics.comments": "platform" },
    "billing": {
      "amount": "0.002",
      "currency": "USD",
      "balance_after": "9.998"
    }
  }
}
```

### Empty

From a response recorded 2026-10-12 18:43 UTC. The request ID and balance are made up.

Size as sent: 457 B in the standard view (457 B compact, 457 B full).

```jsonc
{
  "code": "ok",
  "request_id": "37ae46b8-0d9b-44d2-9462-5e1eb24f01d2",
  "data": { "items": [] },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 0
  },
  "warnings": [],
  "meta": {
    "capability": "douyin.comments.replies.list",
    "result_status": "empty",
    "fetched_at": "2026-10-12T18:43:00.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": { "url": "platform", "metrics.comments": "platform" },
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
  "request_id": "3fbe21d7-1369-453e-9eed-6a8463a936f7",
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
  "request_id": "c7f4b5f0-0754-4030-bc20-2f24b8725d6d",
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
  "request_id": "bd384e0e-3c06-4c93-aeb9-bf6c19105457",
  "message": "The data source failed",
  "message_zh": "数据来源出错",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

[This example as a JSON file](https://dataxapi.com/apis/douyin/comments/replies/list.example.json)

## Use it in your AI

`dataxapi setup` gives the agents on your machine (Claude Code, Codex, Cursor) the DataXAPI MCP server and the base skill. The key is read from DATAXAPI_API_KEY; none is written into a file.

MCP server: `https://api.dataxapi.com/mcp`. The entry for your client is under MCP in the request examples of this page; then ask your agent to call `douyin.comments.replies.list`.

Or paste this to any AI:

> Read https://dataxapi.com/apis/douyin/comments/replies/list.md and help me use the DataXAPI endpoint douyin.comments.replies.list (Douyin comment replies).

[Open in ChatGPT](https://chatgpt.com/?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fdouyin%2Fcomments%2Freplies%2Flist.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20douyin.comments.replies.list%20%28Douyin%20comment%20replies%29.) · [Open in Claude](https://claude.ai/new?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fdouyin%2Fcomments%2Freplies%2Flist.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20douyin.comments.replies.list%20%28Douyin%20comment%20replies%29.)

## Related

Part of DataXAPI's Social media data. The same key also works for: Creators, Ads, E-commerce.

The same thing on other platforms: [Bilibili comment replies](https://dataxapi.com/apis/bilibili/comments/replies/list/), [Kuaishou comment replies](https://dataxapi.com/apis/kuaishou/comments/replies/list/), [Instagram comment replies](https://dataxapi.com/apis/instagram/comments/replies/list/), [TikTok comment replies](https://dataxapi.com/apis/tiktok/comments/replies/list/), [Weibo comment replies](https://dataxapi.com/apis/weibo/comments/replies/list/), [Xiaohongshu comment replies](https://dataxapi.com/apis/xiaohongshu/comments/replies/list/), [YouTube comment replies](https://dataxapi.com/apis/youtube/comments/replies/list/), [Zhihu comment replies](https://dataxapi.com/apis/zhihu/comments/replies/list/)

Douyin endpoints: [Douyin comment replies](https://dataxapi.com/apis/douyin/comments/replies/list/), [Douyin hashtag videos](https://dataxapi.com/apis/douyin/hashtags/videos/list/), [Douyin hot search board](https://dataxapi.com/apis/douyin/trends/list/), [Douyin user profile](https://dataxapi.com/apis/douyin/users/get/), [Douyin creator engagement and follower trends](https://dataxapi.com/apis/douyin/users/history/), [Douyin user search](https://dataxapi.com/apis/douyin/users/search/), [Douyin user videos](https://dataxapi.com/apis/douyin/users/videos/list/), [Douyin video comments](https://dataxapi.com/apis/douyin/videos/comments/list/), [Douyin video detail](https://dataxapi.com/apis/douyin/videos/get/), [Douyin video play count](https://dataxapi.com/apis/douyin/videos/metrics/), [Douyin related videos](https://dataxapi.com/apis/douyin/videos/related/), [Douyin video search](https://dataxapi.com/apis/douyin/videos/search/), [Douyin trending videos](https://dataxapi.com/apis/douyin/videos/trending/)

Douyin trend-index endpoints: [Douyin trend-index brand trends](https://dataxapi.com/apis/douyin/index/brands/history/), [Douyin trend-index brand comparison](https://dataxapi.com/apis/douyin/index/brands/metrics/), [Douyin trend-index creator top videos](https://dataxapi.com/apis/douyin/index/creators/videos/list/), [Douyin trend-index creator follower profile](https://dataxapi.com/apis/douyin/index/creators/audience/get/), [Douyin trend-index creator core metrics](https://dataxapi.com/apis/douyin/index/creators/metrics/), [Douyin trend-index keyword audience](https://dataxapi.com/apis/douyin/index/keywords/audience/get/), [Douyin trend-index keyword trends](https://dataxapi.com/apis/douyin/index/keywords/history/), [Douyin trend-index related keywords](https://dataxapi.com/apis/douyin/index/keywords/related/), [Douyin trend-index live hot topics](https://dataxapi.com/apis/douyin/index/trends/list/), [Douyin trend-index keyword hot videos](https://dataxapi.com/apis/douyin/index/videos/search/)

Douyin Xingtu endpoints: [Douyin Xingtu creator rate card](https://dataxapi.com/apis/douyin/xingtu/creators/rates/get/), [Douyin Xingtu creator search](https://dataxapi.com/apis/douyin/xingtu/creators/search/), [Douyin Xingtu creator profile](https://dataxapi.com/apis/douyin/xingtu/creators/get/), [Douyin Xingtu creator audience](https://dataxapi.com/apis/douyin/xingtu/creators/audience/get/), [Douyin Xingtu creator metrics](https://dataxapi.com/apis/douyin/xingtu/creators/metrics/), [Douyin Xingtu creator video performance](https://dataxapi.com/apis/douyin/xingtu/creators/videos/list/), [Douyin Xingtu creator content keywords](https://dataxapi.com/apis/douyin/xingtu/creators/keywords/get/), [Douyin Xingtu creator index scores](https://dataxapi.com/apis/douyin/xingtu/creators/scores/get/), [Douyin Xingtu creator content mix](https://dataxapi.com/apis/douyin/xingtu/creators/content_mix/get/), [Douyin Xingtu creator conversion](https://dataxapi.com/apis/douyin/xingtu/creators/conversion/get/), [Douyin Xingtu marketing calendar](https://dataxapi.com/apis/douyin/xingtu/campaigns/list/)

How-to guides and answers: [How to export Douyin video comments in bulk](https://dataxapi.com/guides/douyin-video-comments/)

Related: [All Douyin endpoints](https://dataxapi.com/apis/douyin/), [Social media data](https://dataxapi.com/categories/social/), [The same thing on 9 platforms, side by side](https://dataxapi.com/roles/comments-replies-list/), [The comment object's fields](https://dataxapi.com/docs/objects/comment/)

## Questions

### How much does the Douyin comment replies API cost?

$0.0020 per call. The most one call can cost is $0.0020.

### When am I not charged?

Errors and timeouts are not charged; an empty result is charged $0.0020.

### How many items does one call return, and how do I get the next page?

20 items a page. The page size is the platform's; limit is not accepted. For the next page pass page.next_cursor as cursor; a cursor is valid for 1 hour. page.has_more is false on the last page.

### What happens if the object does not exist?

A comment that does not exist cannot be told from a comment without replies: both return an empty result, not a 404, and are charged as an empty result is.

---

Last checked 2026-10-18 19:59 UTC. Catalog revision c48ce454ae6c4c65. [HTML version](https://dataxapi.com/apis/douyin/comments/replies/list/)
