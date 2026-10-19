# LinkedIn post search API

Find public LinkedIn posts by search terms: text, author, time, reaction count, comment count; can be limited to a recent period. Results come from a web search engine's index of LinkedIn, not LinkedIn's own search, and are not complete. Up to 10 items a call; $0.0020 per call. Errors and timeouts are not charged; an empty result is free.

- Endpoint: `GET https://api.dataxapi.com/v1/linkedin/posts/search`
- ID: `linkedin.posts.search`
- Also known as: search linkedin posts, linkedin keyword search, find posts on linkedin
- Price: $0.0020 / call
- Live status is not on this page, which is a snapshot. Read it with `GET https://api.dataxapi.com/v1/catalog/status`
- Returns: 10 a page, a page, with a cursor for the next
- Returns the standard post object, the same on every platform
- [Run it in the Playground](https://dataxapi.com/console/playground/?capability=linkedin.posts.search&params=%7B%22query%22%3A%22ai+agents%22%7D)
- In Chinese: [LinkedIn 帖子搜索 API](https://dataxapi.com/zh/apis/linkedin/posts/search/)

## What you get

The first 4 rows of a response recorded 2026-10-12 19:00 UTC.

| Field | Value |
| --- | --- |
| published_at | 2025-07-06 15:55 UTC |
| author.followers | 237,136 |
| metrics.likes | 404 |
| metrics.comments | 74 |

## Parameters

| Parameter | Type | required | Description |
| --- | --- | --- | --- |
| `query` | text | Yes | Search terms. Example: `ai agents`. |
| `published_within` | text |  | Only posts published within this recent period (as the search engine dates them). Values: `day`, `week`, `month`, `year`. Example: `week`. |
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
| `type` | text | Content format. Values: `video`, `image`, `text`, `article`. | `compact` | Not provided here |
| `title` | text | Title. | `compact` | Not provided here |
| `text` | text | Body text. Long text: the compact view keeps the first 500 characters and says so in `warnings`. | `compact` | Yes |
| `lang` | text | Language of the text. | `standard` | Not provided here |
| `published_at` | time | When it was published. | `compact` | Yes |
| `author` | object | Author. | `compact` | Yes |
| `author.id` | text | Author's account ID. | `compact` | Not provided here |
| `author.username` | text | Author's handle. | `compact` | Yes |
| `author.name` | text | Author's display name. | `compact` | Yes |
| `author.avatar_url` | link | Author's avatar. | `standard` | Yes |
| `author.verified` | yes/no | Whether the author is verified. | `standard` | Not provided here |
| `author.followers` | integer | Author's follower count. On this platform: The author's follower count. | `standard` | Yes |
| `metrics` | object | Engagement counts. | `compact` | Yes |
| `metrics.likes` | integer | Likes. On this platform: All reactions together (like, celebrate, support and the rest). | `compact` | Yes |
| `metrics.comments` | integer | Comments. | `compact` | Yes |
| `metrics.shares` | integer | Shares. | `compact` | Not provided here |
| `metrics.favorites` | integer | Saves. | `compact` | The platform has none |
| `metrics.views` | integer | Views. | `compact` | Not provided here |
| `metrics.reposts` | integer | Reposts. | `compact` | Not provided here |
| `images` | list of link | Image addresses. | `standard` | Yes |
| `hashtags` | list of text | Hashtags, without the #. | `standard` | Not provided here |
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

Typical size of one item: `compact` 776 B, `standard` 2.4 KB, `full` 2.4 KB (measured on the response recorded 2026-10-12 19:00 UTC).

## Paging

10 items a page. The page size is the platform's; `limit` is not accepted.

For the next page pass `page.next_cursor` as `cursor`; a cursor is valid for 1 hour. `page.has_more` is false on the last page.

## When you are charged

| Case | Charged |
| --- | --- |
| A result with data | $0.0020, once per call |
| Each further page | charged as a call of its own |
| An empty result | not charged |
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
curl -G "https://api.dataxapi.com/v1/linkedin/posts/search" \
  --data-urlencode "query=ai agents" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.linkedin.posts.search(query="ai agents")
print(result["data"]["items"])
```

### TypeScript

```typescript
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.linkedin.posts.search({ query: "ai agents" });
console.log(result.data.items);
```

### CLI

```bash
dataxapi call linkedin.posts.search 'query=ai agents'
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

Add this to your MCP client, then ask your agent to call `linkedin.posts.search`.

## Responses

### 200

From a response recorded 2026-10-12 19:00 UTC. Names, text and IDs are examples, and so are the links: none is the recorded one (the page shows no one's personal data); the figures are as recorded. Long lists are cut. The request ID, cursor and balance are made up.

Size as sent: 24.6 KB in the standard view (8.8 KB compact, 24.6 KB full).

```jsonc
{
  "code": "ok",
  "request_id": "31e7c390-8677-479d-9789-e894edffebc5",
  "data": {
    "items": [
      {
        "id": "7746367938891236722",
        "url": "https://www.linkedin.com/feed/update/urn:li:activity:7746367938891236722",
        "text": "My honest take on ai agents, a month in.",
        "published_at": "2025-07-06T15:55:27.089Z",
        "author": {
          "username": "fieldnotes_studio",
          "name": "Field Notes Studio",
          "avatar_url": "https://media.licdn.com/dms/image/v2/nhOgVxi5Ro8e7Q5e/profile-displayphoto-shrink_100_100/0/",
          "followers": 237136
        },
        "metrics": { "likes": 404, "comments": 74 },
        "images": [
          "https://media.licdn.com/dms/image/v2/TxgG00Xt_GhfRtT1/feedshare-shrink_800/0/",
          "https://media.licdn.com/dms/image/v2/KeBZgF4hgJnZo2l9/feedshare-shrink_800/0/",
          // … 11 more
        ]
      },
      // … 9 more
    ]
  },
  "page": {
    "next_cursor": "c1.uZZ4-Kat5BWrnBm-xU1hzA6XluT7DQag81tXGfc4",
    "cursor_expires_at": "2026-10-12T20:00:44.000Z",
    "has_more": true,
    "returned": 10
  },
  "warnings": [],
  "meta": {
    "capability": "linkedin.posts.search",
    "result_status": "complete",
    "fetched_at": "2026-10-12T19:00:44.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "type": "capability",
      "title": "capability",
      "lang": "capability",
      "author.id": "capability",
      "author.verified": "capability",
      "metrics.shares": "capability",
      "metrics.favorites": "platform",
      "metrics.views": "capability",
      "metrics.reposts": "capability",
      "hashtags": "capability",
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

From a response recorded 2026-10-12 19:04 UTC. The request ID and balance are made up.

Size as sent: 779 B in the standard view (779 B compact, 779 B full).

```jsonc
{
  "code": "ok",
  "request_id": "52b582bf-5569-4ecb-bd58-ab8d2c9e5246",
  "data": { "items": [] },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 0
  },
  "warnings": [],
  "meta": {
    "capability": "linkedin.posts.search",
    "result_status": "empty",
    "fetched_at": "2026-10-12T19:04:55.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "type": "capability",
      "title": "capability",
      "lang": "capability",
      "author.id": "capability",
      "author.verified": "capability",
      "metrics.shares": "capability",
      "metrics.favorites": "platform",
      "metrics.views": "capability",
      "metrics.reposts": "capability",
      "hashtags": "capability",
      "mentions": "capability",
      "is_pinned": "capability",
      "post_id": "platform",
      "parent_id": "platform",
      "root_id": "platform"
    },
    "billing": { "amount": "0", "currency": "USD", "balance_after": "10" }
  }
}
```

### 400

An example written to the specification, not a recorded response.

```json
{
  "code": "invalid_params",
  "request_id": "29a95d24-7e38-461c-93f3-2e25cd024c51",
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
  "request_id": "eb758d53-4a95-4e54-b7fb-dddcbb20b306",
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
  "request_id": "92f91177-d48c-4a8c-887d-a130731ba272",
  "message": "The data source failed",
  "message_zh": "数据来源出错",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

[This example as a JSON file](https://dataxapi.com/apis/linkedin/posts/search.example.json)

## Use it in your AI

`dataxapi setup` gives the agents on your machine (Claude Code, Codex, Cursor) the DataXAPI MCP server and the base skill. The key is read from DATAXAPI_API_KEY; none is written into a file.

MCP server: `https://api.dataxapi.com/mcp`. The entry for your client is under MCP in the request examples of this page; then ask your agent to call `linkedin.posts.search`.

Or paste this to any AI:

> Read https://dataxapi.com/apis/linkedin/posts/search.md and help me use the DataXAPI endpoint linkedin.posts.search (LinkedIn post search).

[Open in ChatGPT](https://chatgpt.com/?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Flinkedin%2Fposts%2Fsearch.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20linkedin.posts.search%20%28LinkedIn%20post%20search%29.) · [Open in Claude](https://claude.ai/new?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Flinkedin%2Fposts%2Fsearch.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20linkedin.posts.search%20%28LinkedIn%20post%20search%29.)

## Related

Part of DataXAPI's Social media data. The same key also works for: Creators, Ads, E-commerce.

The same thing on other platforms: [Bilibili video search](https://dataxapi.com/apis/bilibili/videos/search/), [Douyin video search](https://dataxapi.com/apis/douyin/videos/search/), [Kuaishou video search](https://dataxapi.com/apis/kuaishou/videos/search/), [Threads post search](https://dataxapi.com/apis/threads/posts/search/), [TikTok video search](https://dataxapi.com/apis/tiktok/videos/search/), [Weibo realtime search](https://dataxapi.com/apis/weibo/posts/search/), [X post search](https://dataxapi.com/apis/x/posts/search/), [Xiaohongshu note search](https://dataxapi.com/apis/xiaohongshu/notes/search/), [YouTube video search](https://dataxapi.com/apis/youtube/videos/search/), [WeChat Channels video search](https://dataxapi.com/apis/wechat_channels/videos/search/), [WeChat Search articles and videos](https://dataxapi.com/apis/wechat/posts/search/), [Reddit post search](https://dataxapi.com/apis/reddit/posts/search/), [Zhihu content search](https://dataxapi.com/apis/zhihu/posts/search/), [Pinterest pin search](https://dataxapi.com/apis/pinterest/pins/search/)

More Social media data on other platforms: [Douyin hashtag videos](https://dataxapi.com/apis/douyin/hashtags/videos/list/), [Bilibili user videos](https://dataxapi.com/apis/bilibili/users/videos/list/), [Bilibili video detail](https://dataxapi.com/apis/bilibili/videos/get/), [Bilibili popular videos](https://dataxapi.com/apis/bilibili/videos/trending/), [Douyin trend-index creator top videos](https://dataxapi.com/apis/douyin/index/creators/videos/list/), [Douyin trend-index keyword hot videos](https://dataxapi.com/apis/douyin/index/videos/search/), [Douyin user videos](https://dataxapi.com/apis/douyin/users/videos/list/), [Douyin video detail](https://dataxapi.com/apis/douyin/videos/get/), [Douyin video play count](https://dataxapi.com/apis/douyin/videos/metrics/), [Douyin related videos](https://dataxapi.com/apis/douyin/videos/related/)

LinkedIn endpoints: [LinkedIn ad detail](https://dataxapi.com/apis/linkedin/ads/get/), [LinkedIn Ad Library search](https://dataxapi.com/apis/linkedin/ads/search/), [LinkedIn company page](https://dataxapi.com/apis/linkedin/companies/get/), [LinkedIn company posts](https://dataxapi.com/apis/linkedin/companies/posts/list/), [LinkedIn post detail](https://dataxapi.com/apis/linkedin/posts/get/), [LinkedIn post search](https://dataxapi.com/apis/linkedin/posts/search/), [LinkedIn video transcript](https://dataxapi.com/apis/linkedin/posts/transcript/get/)

Skills that use this endpoint: [Keyword search and mentions](https://dataxapi.com/skills/mentions/)

Related: [All LinkedIn endpoints](https://dataxapi.com/apis/linkedin/), [Social media data](https://dataxapi.com/categories/social/), [The same thing on 15 platforms, side by side](https://dataxapi.com/roles/posts-search/), [The post object's fields](https://dataxapi.com/docs/objects/post/)

## Questions

### How much does the LinkedIn post search API cost?

$0.0020 per call. The most one call can cost is $0.0020.

### When am I not charged?

Errors and timeouts are not charged; an empty result is free.

### How many items does one call return, and how do I get the next page?

10 items a page. The page size is the platform's; limit is not accepted. For the next page pass page.next_cursor as cursor; a cursor is valid for 1 hour. page.has_more is false on the last page.

---

Last checked 2026-10-18 19:59 UTC. Catalog revision c48ce454ae6c4c65. [HTML version](https://dataxapi.com/apis/linkedin/posts/search/)
