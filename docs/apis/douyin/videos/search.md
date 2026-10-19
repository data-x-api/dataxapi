# Douyin video search API

Search Douyin videos by terms, a page at a time, sorted by relevance, newest or most liked and filtered by time posted: caption, author with follower count, engagement counts. About 8 items a call, 20 at most; $0.0200 per call. Errors and timeouts are not charged; an empty result is charged $0.0200.

- Endpoint: `GET https://api.dataxapi.com/v1/douyin/videos/search`
- ID: `douyin.videos.search`
- Also known as: douyin search, search douyin videos, Douyin general search
- Price: $0.0200 / call
- Live status is not on this page, which is a snapshot. Read it with `GET https://api.dataxapi.com/v1/catalog/status`
- Returns: up to 20 a page, a page, with a cursor for the next
- Returns the standard post object, the same on every platform
- [Run it in the Playground](https://dataxapi.com/console/playground/?capability=douyin.videos.search&params=%7B%22query%22%3A%22%E9%9C%B2%E8%90%A5%22%7D)
- In Chinese: [抖音视频搜索 API](https://dataxapi.com/zh/apis/douyin/videos/search/)

## What you get

The first 8 rows of a response recorded 2026-10-12 19:01 UTC.

| Field | Value |
| --- | --- |
| type | video |
| lang | zh |
| published_at | 2026-09-11 01:32 UTC |
| author.followers | 2,525 |
| metrics.likes | 96,505 |
| metrics.comments | 2,219 |
| metrics.shares | 60,467 |
| metrics.favorites | 7,038 |

## Parameters

| Parameter | Type | required | Description |
| --- | --- | --- | --- |
| `query` | text | Yes | Search terms. Example: `露营`. |
| `sort` | text |  | Order: the platform's ranking, newest first, most liked first. Douyin does not serve most liked within a day; with that pair, a day's results come with each page in order of likes. Values: `relevance` (default), `latest`, `popular`. Example: `relevance`. |
| `published_within` | text |  | Only videos posted within the last day, week or half year; any time when left out. Values: `day`, `week`, `half_year`. Example: `week`. |
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
| `lang` | text | Language of the text. | `standard` | Yes |
| `published_at` | time | When it was published. | `compact` | Yes |
| `author` | object | Author. | `compact` | Yes |
| `author.id` | text | Author's account ID. | `compact` | Yes |
| `author.username` | text | Author's handle. | `compact` | Yes |
| `author.name` | text | Author's display name. | `compact` | Yes |
| `author.avatar_url` | link | Author's avatar. | `standard` | Yes |
| `author.verified` | yes/no | Whether the author is verified. | `standard` | Not provided here |
| `author.followers` | integer | Author's follower count. | `standard` | Yes |
| `metrics` | object | Engagement counts. | `compact` | Yes |
| `metrics.likes` | integer | Likes. | `compact` | Yes |
| `metrics.comments` | integer | Comments. | `compact` | Yes |
| `metrics.shares` | integer | Shares. | `compact` | Yes |
| `metrics.favorites` | integer | Saves. | `compact` | Yes |
| `metrics.views` | integer | Views. | `compact` | Not provided here |
| `metrics.reposts` | integer | Reposts. | `compact` | The platform has none |
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
| `approximate` | list of object | Which numbers of this item are approximate or lower bounds; absent when all are exact. | `compact` | Yes |
| `approximate[].field` | text | Path of the field, such as metrics.views. | `compact` | Yes |
| `approximate[].kind` | text | Approximate, or a lower bound. Values: `approximate`, `lower_bound`. | `compact` | Yes |

A field with no value on an item is `null`. A field this endpoint cannot give is left out and listed in `meta.unavailable`.

Typical size of one item: `compact` 570 B, `standard` 826 B, `full` 826 B (measured on the response recorded 2026-10-12 19:01 UTC).

## Paging

About 8 items a page, 20 at most. The page size is the platform's; `limit` is not accepted.

For the next page pass `page.next_cursor` as `cursor`; a cursor is valid for 1 hour. `page.has_more` is false on the last page.

## When you are charged

| Case | Charged |
| --- | --- |
| A result with data | $0.0200, once per call |
| Each further page | charged as a call of its own |
| An empty result | $0.0200 |
| Invalid parameters, a failure of ours or of the data source, a timeout | not charged |
| The most one call can cost | $0.0200 (send `X-Max-Price` to refuse anything above your own limit) |

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
curl -G "https://api.dataxapi.com/v1/douyin/videos/search" \
  --data-urlencode "query=露营" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.douyin.videos.search(query="露营")
print(result["data"]["items"])
```

### TypeScript

```typescript
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.douyin.videos.search({ query: "露营" });
console.log(result.data.items);
```

### CLI

```bash
dataxapi call douyin.videos.search 'query=露营'
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

Add this to your MCP client, then ask your agent to call `douyin.videos.search`.

## Responses

### 200

From a response recorded 2026-10-12 19:01 UTC. Names, text and IDs are examples, and so are the links: none is the recorded one (the page shows no one's personal data); the figures are as recorded. Long lists are cut. The request ID, cursor and balance are made up.

Size as sent: 6.3 KB in the standard view (4.5 KB compact, 6.3 KB full).

```jsonc
{
  "code": "ok",
  "request_id": "c4c779e7-8730-415a-ab8b-2439d70fb51a",
  "data": {
    "items": [
      {
        "id": "7732320280216651754",
        "url": "https://www.douyin.com/video/7732320280216651754",
        "type": "video",
        "title": null,
        "text": "周末的露营日常，随手记录一下",
        "lang": "zh",
        "published_at": "2026-09-11T01:32:11.000Z",
        "author": {
          "id": "MS4wLjABAAAAWo9vAvyTzp3sb2-krZmkriyZuGbWt-p4togQvkClUpj",
          "username": "weekend_lin",
          "name": "小林的周末",
          "avatar_url": "https://p3-pc.douyinpic.com/aweme/100x100/aweme-avatar/tos-cn-avt-0015_ec931a72ca043f30fa7e.jpeg",
          "followers": 2525
        },
        "metrics": {
          "likes": 96505,
          "comments": 2219,
          "shares": 60467,
          "favorites": 7038
        },
        "images": null,
        "hashtags": ["户外生活", "好物分享"]
      },
      // … 6 more
    ]
  },
  "page": {
    "next_cursor": "c1.ts-YHxldZuVXCxH6Gev5iQGlxtlGILU8V8n9tjjp",
    "cursor_expires_at": "2026-10-12T20:01:55.000Z",
    "has_more": true,
    "returned": 7
  },
  "warnings": [],
  "meta": {
    "capability": "douyin.videos.search",
    "result_status": "complete",
    "fetched_at": "2026-10-12T19:01:55.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "metrics.views": "capability",
      "metrics.reposts": "platform",
      "author.verified": "capability",
      "mentions": "capability",
      "post_id": "platform",
      "parent_id": "platform",
      "root_id": "platform",
      "is_pinned": "capability"
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

From a recording of 2026-10-12 19:01 UTC, edited by hand to show this case. The request ID and balance are made up.

Size as sent: 605 B in the standard view (605 B compact, 605 B full).

```jsonc
{
  "code": "ok",
  "request_id": "151c9fde-5ad5-4873-a657-ffd3b2c55e92",
  "data": { "items": [] },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 0
  },
  "warnings": [],
  "meta": {
    "capability": "douyin.videos.search",
    "result_status": "empty",
    "fetched_at": "2026-10-12T19:01:55.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "metrics.views": "capability",
      "metrics.reposts": "platform",
      "author.verified": "capability",
      "mentions": "capability",
      "post_id": "platform",
      "parent_id": "platform",
      "root_id": "platform",
      "is_pinned": "capability"
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
  "request_id": "03ff01a5-e70b-475b-b653-ff53e31ef2a7",
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
  "request_id": "06774065-9ad2-4720-8172-2a419b482fe5",
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

### 502

An example written to the specification, not a recorded response.

```json
{
  "code": "upstream_failed",
  "request_id": "0cd0ee01-ff3c-4ff3-a746-c690689f6c9d",
  "message": "The data source failed",
  "message_zh": "数据来源出错",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

[This example as a JSON file](https://dataxapi.com/apis/douyin/videos/search.example.json)

## Use it in your AI

`dataxapi setup` gives the agents on your machine (Claude Code, Codex, Cursor) the DataXAPI MCP server and the base skill. The key is read from DATAXAPI_API_KEY; none is written into a file.

MCP server: `https://api.dataxapi.com/mcp`. The entry for your client is under MCP in the request examples of this page; then ask your agent to call `douyin.videos.search`.

Or paste this to any AI:

> Read https://dataxapi.com/apis/douyin/videos/search.md and help me use the DataXAPI endpoint douyin.videos.search (Douyin video search).

[Open in ChatGPT](https://chatgpt.com/?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fdouyin%2Fvideos%2Fsearch.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20douyin.videos.search%20%28Douyin%20video%20search%29.) · [Open in Claude](https://claude.ai/new?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fdouyin%2Fvideos%2Fsearch.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20douyin.videos.search%20%28Douyin%20video%20search%29.)

## Related

Part of DataXAPI's Social media data. The same key also works for: Creators, Ads, E-commerce.

The same thing on other platforms: [Bilibili video search](https://dataxapi.com/apis/bilibili/videos/search/), [Kuaishou video search](https://dataxapi.com/apis/kuaishou/videos/search/), [LinkedIn post search](https://dataxapi.com/apis/linkedin/posts/search/), [Threads post search](https://dataxapi.com/apis/threads/posts/search/), [TikTok video search](https://dataxapi.com/apis/tiktok/videos/search/), [Weibo realtime search](https://dataxapi.com/apis/weibo/posts/search/), [X post search](https://dataxapi.com/apis/x/posts/search/), [Xiaohongshu note search](https://dataxapi.com/apis/xiaohongshu/notes/search/), [YouTube video search](https://dataxapi.com/apis/youtube/videos/search/), [WeChat Channels video search](https://dataxapi.com/apis/wechat_channels/videos/search/), [WeChat Search articles and videos](https://dataxapi.com/apis/wechat/posts/search/), [Reddit post search](https://dataxapi.com/apis/reddit/posts/search/), [Zhihu content search](https://dataxapi.com/apis/zhihu/posts/search/), [Pinterest pin search](https://dataxapi.com/apis/pinterest/pins/search/)

Douyin endpoints: [Douyin comment replies](https://dataxapi.com/apis/douyin/comments/replies/list/), [Douyin hashtag videos](https://dataxapi.com/apis/douyin/hashtags/videos/list/), [Douyin hot search board](https://dataxapi.com/apis/douyin/trends/list/), [Douyin user profile](https://dataxapi.com/apis/douyin/users/get/), [Douyin creator engagement and follower trends](https://dataxapi.com/apis/douyin/users/history/), [Douyin user search](https://dataxapi.com/apis/douyin/users/search/), [Douyin user videos](https://dataxapi.com/apis/douyin/users/videos/list/), [Douyin video comments](https://dataxapi.com/apis/douyin/videos/comments/list/), [Douyin video detail](https://dataxapi.com/apis/douyin/videos/get/), [Douyin video play count](https://dataxapi.com/apis/douyin/videos/metrics/), [Douyin related videos](https://dataxapi.com/apis/douyin/videos/related/), [Douyin video search](https://dataxapi.com/apis/douyin/videos/search/), [Douyin trending videos](https://dataxapi.com/apis/douyin/videos/trending/)

Douyin trend-index endpoints: [Douyin trend-index brand trends](https://dataxapi.com/apis/douyin/index/brands/history/), [Douyin trend-index brand comparison](https://dataxapi.com/apis/douyin/index/brands/metrics/), [Douyin trend-index creator top videos](https://dataxapi.com/apis/douyin/index/creators/videos/list/), [Douyin trend-index creator follower profile](https://dataxapi.com/apis/douyin/index/creators/audience/get/), [Douyin trend-index creator core metrics](https://dataxapi.com/apis/douyin/index/creators/metrics/), [Douyin trend-index keyword audience](https://dataxapi.com/apis/douyin/index/keywords/audience/get/), [Douyin trend-index keyword trends](https://dataxapi.com/apis/douyin/index/keywords/history/), [Douyin trend-index related keywords](https://dataxapi.com/apis/douyin/index/keywords/related/), [Douyin trend-index live hot topics](https://dataxapi.com/apis/douyin/index/trends/list/), [Douyin trend-index keyword hot videos](https://dataxapi.com/apis/douyin/index/videos/search/)

Douyin Xingtu endpoints: [Douyin Xingtu creator rate card](https://dataxapi.com/apis/douyin/xingtu/creators/rates/get/), [Douyin Xingtu creator search](https://dataxapi.com/apis/douyin/xingtu/creators/search/), [Douyin Xingtu creator profile](https://dataxapi.com/apis/douyin/xingtu/creators/get/), [Douyin Xingtu creator audience](https://dataxapi.com/apis/douyin/xingtu/creators/audience/get/), [Douyin Xingtu creator metrics](https://dataxapi.com/apis/douyin/xingtu/creators/metrics/), [Douyin Xingtu creator video performance](https://dataxapi.com/apis/douyin/xingtu/creators/videos/list/), [Douyin Xingtu creator content keywords](https://dataxapi.com/apis/douyin/xingtu/creators/keywords/get/), [Douyin Xingtu creator index scores](https://dataxapi.com/apis/douyin/xingtu/creators/scores/get/), [Douyin Xingtu creator content mix](https://dataxapi.com/apis/douyin/xingtu/creators/content_mix/get/), [Douyin Xingtu creator conversion](https://dataxapi.com/apis/douyin/xingtu/creators/conversion/get/), [Douyin Xingtu marketing calendar](https://dataxapi.com/apis/douyin/xingtu/campaigns/list/)

How-to guides and answers: [How to export Douyin video comments in bulk](https://dataxapi.com/guides/douyin-video-comments/), [How do I export Douyin data?](https://dataxapi.com/answers/export-douyin-data/)

Skills that use this endpoint: [Keyword search and mentions](https://dataxapi.com/skills/mentions/)

Related: [All Douyin endpoints](https://dataxapi.com/apis/douyin/), [Social media data](https://dataxapi.com/categories/social/), [The same thing on 15 platforms, side by side](https://dataxapi.com/roles/posts-search/), [The post object's fields](https://dataxapi.com/docs/objects/post/)

## Questions

### How much does the Douyin video search API cost?

$0.0200 per call. The most one call can cost is $0.0200.

### When am I not charged?

Errors and timeouts are not charged; an empty result is charged $0.0200.

### How many items does one call return, and how do I get the next page?

About 8 items a page, 20 at most. The page size is the platform's; limit is not accepted. For the next page pass page.next_cursor as cursor; a cursor is valid for 1 hour. page.has_more is false on the last page.

---

Last checked 2026-10-18 19:59 UTC. Catalog revision c48ce454ae6c4c65. [HTML version](https://dataxapi.com/apis/douyin/videos/search/)
