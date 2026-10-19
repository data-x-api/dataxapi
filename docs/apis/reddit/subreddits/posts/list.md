# Reddit community posts API

Get a page of the posts of a Reddit community by its name, hot, newest or top score first. Up to 25 items a call; $0.0020 per call. Errors and timeouts are not charged; an empty result is charged $0.0020.

- Endpoint: `GET https://api.dataxapi.com/v1/reddit/subreddits/posts/list`
- ID: `reddit.subreddits.posts.list`
- Also known as: subreddit posts, subreddit feed
- Price: $0.0020 / call
- Live status is not on this page, which is a snapshot. Read it with `GET https://api.dataxapi.com/v1/catalog/status`
- Returns: 25 a page, a page, with a cursor for the next
- Returns the standard post object, the same on every platform
- `id` is in the link: `reddit.com/r/<id>/comments/1nnrvkr/`.
- [Run it in the Playground](https://dataxapi.com/console/playground/?capability=reddit.subreddits.posts.list&params=%7B%22id%22%3A%22nasa%22%7D)
- In Chinese: [Reddit 社区帖子 API](https://dataxapi.com/zh/apis/reddit/subreddits/posts/list/)

## What you get

The first 2 rows of a response recorded 2026-10-12 18:46 UTC.

| Field | Value |
| --- | --- |
| published_at | 2026-10-11 22:55 UTC |
| metrics.comments | 30 |

## Parameters

| Parameter | Type | required | Description |
| --- | --- | --- | --- |
| `id` | text | Yes | Community name, without the r/. Example: `nasa`. |
| `sort` | text |  | Hot, newest first, or top score first. Values: `hot` (default), `latest`, `popular`. Example: `hot`. |
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
| `title` | text | Title. | `compact` | Yes |
| `text` | text | Body text. Long text: the compact view keeps the first 500 characters and says so in `warnings`. | `compact` | Yes |
| `lang` | text | Language of the text. | `standard` | Not provided here |
| `published_at` | time | When it was published. | `compact` | Yes |
| `author` | object | Author. | `compact` | Yes |
| `author.id` | text | Author's account ID. | `compact` | Yes |
| `author.username` | text | Author's handle. | `compact` | Yes |
| `author.name` | text | Author's display name. | `compact` | The platform has none |
| `author.avatar_url` | link | Author's avatar. | `standard` | Not provided here |
| `author.verified` | yes/no | Whether the author is verified. | `standard` | Not provided here |
| `author.followers` | integer | Author's follower count. | `standard` | Not provided here |
| `metrics` | object | Engagement counts. | `compact` | Yes |
| `metrics.likes` | integer | Likes. | `compact` | The platform has none |
| `metrics.comments` | integer | Comments. | `compact` | Yes |
| `metrics.shares` | integer | Shares. | `compact` | Not provided here |
| `metrics.favorites` | integer | Saves. | `compact` | The platform has none |
| `metrics.views` | integer | Views. | `compact` | Not provided here |
| `metrics.reposts` | integer | Reposts. | `compact` | The platform has none |
| `images` | list of link | Image addresses. | `standard` | Not provided here |
| `hashtags` | list of text | Hashtags, without the #. | `standard` | The platform has none |
| `mentions` | list of object | Accounts mentioned in the text. | `standard` | Not provided here |
| `mentions[].id` | text | Account ID. | `standard` | Not provided here |
| `mentions[].username` | text | Handle. | `standard` | Not provided here |
| `mentions[].name` | text | Display name. | `standard` | Not provided here |
| `is_pinned` | yes/no | Whether the author pinned it. | `standard` | Not provided here |
| `post_id` | text | ID of the thread's root post when this is a reply; otherwise null. | `compact` | The platform has none |
| `parent_id` | text | ID of the item it replies to directly; otherwise null. | `compact` | The platform has none |
| `root_id` | text | ID of the first-level reply its thread hangs under. | `compact` | The platform has none |
| `ext.score` | integer | Score: upvotes less downvotes, not a count of likes. | `full` | Yes |
| `ext.upvote_ratio` | number | Share of the votes that are upvotes, 0 to 1. | `full` | Yes |
| `ext.subreddit` | text | Name of the community it is in, without the r/; null for a post on its author's profile. | `full` | Yes |
| `ext.link` | link | Address a link post points to; null for a text post. | `full` | Yes |
| `ext.nsfw` | yes/no | Whether it is marked not safe for work. | `full` | Yes |
| `approximate` | list of object | Which numbers of this item are approximate or lower bounds; absent when all are exact. | `compact` | Yes |
| `approximate[].field` | text | Path of the field, such as metrics.views. | `compact` | Yes |
| `approximate[].kind` | text | Approximate, or a lower bound. Values: `approximate`, `lower_bound`. | `compact` | Yes |

A field with no value on an item is `null`. A field this endpoint cannot give is left out and listed in `meta.unavailable`.

Typical size of one item: `compact` 415 B, `standard` 434 B, `full` 584 B (measured on the response recorded 2026-10-12 18:46 UTC).

## Paging

25 items a page. The page size is the platform's; `limit` is not accepted.

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

A community that does not exist cannot be told from a community without posts: both return an empty result, not a 404, and are charged as an empty result is.

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
curl -G "https://api.dataxapi.com/v1/reddit/subreddits/posts/list" \
  --data-urlencode "id=nasa" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.reddit.subreddits.posts.list(id="nasa")
print(result["data"]["items"])
```

### TypeScript

```typescript
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.reddit.subreddits.posts.list({ id: "nasa" });
console.log(result.data.items);
```

### CLI

```bash
dataxapi call reddit.subreddits.posts.list id=nasa
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

Add this to your MCP client, then ask your agent to call `reddit.subreddits.posts.list`.

## Responses

### 200

From a response recorded 2026-10-12 18:46 UTC. Names, text and IDs are examples, and so are the links: none is the recorded one (the page shows no one's personal data); the figures are as recorded. Long lists are cut. The request ID, cursor and balance are made up.

Size as sent: 10.6 KB in the standard view (10.3 KB compact, 14.0 KB full).

```jsonc
{
  "code": "ok",
  "request_id": "8aca9fc8-1dcf-4376-b3b7-53b23410d633",
  "data": {
    "items": [
      {
        "id": "t3_kzt94p0",
        "url": "https://www.reddit.com/r/CampingGear/comments/kzt94p0/",
        "title": "Everything I pack for weekend hiking",
        "text": null,
        "published_at": "2026-10-11T22:55:35.000Z",
        "author": { "id": "t2_r16o43qe", "username": "northside_coffee" },
        "metrics": { "comments": 30 }
      },
      // … 22 more
    ]
  },
  "page": {
    "next_cursor": "c1.hRcxbGrCtdeZGY8TMmrXkaAVa7PZGXqRn3jxs2Eq",
    "cursor_expires_at": "2026-10-12T19:46:27.000Z",
    "has_more": true,
    "returned": 23
  },
  "warnings": [],
  "meta": {
    "capability": "reddit.subreddits.posts.list",
    "result_status": "complete",
    "fetched_at": "2026-10-12T18:46:27.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "metrics.likes": "platform",
      "metrics.favorites": "platform",
      "metrics.views": "capability",
      "metrics.reposts": "platform",
      "author.name": "platform",
      "author.verified": "capability",
      "author.followers": "capability",
      "hashtags": "platform",
      "mentions": "capability",
      "post_id": "platform",
      "parent_id": "platform",
      "root_id": "platform",
      "type": "capability",
      "lang": "capability",
      "author.avatar_url": "capability",
      "metrics.shares": "capability",
      "images": "capability",
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

From a response recorded 2026-10-12 18:46 UTC. The request ID and balance are made up.

Size as sent: 875 B in the standard view (875 B compact, 875 B full).

```jsonc
{
  "code": "ok",
  "request_id": "0021118c-922a-454d-a0a1-12afd39f388e",
  "data": { "items": [] },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 0
  },
  "warnings": [],
  "meta": {
    "capability": "reddit.subreddits.posts.list",
    "result_status": "empty",
    "fetched_at": "2026-10-12T18:46:29.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "metrics.likes": "platform",
      "metrics.favorites": "platform",
      "metrics.views": "capability",
      "metrics.reposts": "platform",
      "author.name": "platform",
      "author.verified": "capability",
      "author.followers": "capability",
      "hashtags": "platform",
      "mentions": "capability",
      "post_id": "platform",
      "parent_id": "platform",
      "root_id": "platform",
      "type": "capability",
      "lang": "capability",
      "author.avatar_url": "capability",
      "metrics.shares": "capability",
      "images": "capability",
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
  "request_id": "b3b08825-07c2-41da-9485-dd6a95c70eb6",
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
  "request_id": "122e264c-e5c3-4f7b-9233-a9c3aa0eedf4",
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
  "request_id": "b7217dd4-506b-48b5-8888-ac2a66fad055",
  "message": "The data source failed",
  "message_zh": "数据来源出错",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

[This example as a JSON file](https://dataxapi.com/apis/reddit/subreddits/posts/list.example.json)

## Use it in your AI

`dataxapi setup` gives the agents on your machine (Claude Code, Codex, Cursor) the DataXAPI MCP server and the base skill. The key is read from DATAXAPI_API_KEY; none is written into a file.

MCP server: `https://api.dataxapi.com/mcp`. The entry for your client is under MCP in the request examples of this page; then ask your agent to call `reddit.subreddits.posts.list`.

Or paste this to any AI:

> Read https://dataxapi.com/apis/reddit/subreddits/posts/list.md and help me use the DataXAPI endpoint reddit.subreddits.posts.list (Reddit community posts).

[Open in ChatGPT](https://chatgpt.com/?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Freddit%2Fsubreddits%2Fposts%2Flist.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20reddit.subreddits.posts.list%20%28Reddit%20community%20posts%29.) · [Open in Claude](https://claude.ai/new?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Freddit%2Fsubreddits%2Fposts%2Flist.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20reddit.subreddits.posts.list%20%28Reddit%20community%20posts%29.)

## Related

Part of DataXAPI's Social media data. The same key also works for: Creators, Ads, E-commerce.

The same thing on other platforms: [X community posts](https://dataxapi.com/apis/x/communities/posts/list/)

More Social media data on other platforms: [Douyin hashtag videos](https://dataxapi.com/apis/douyin/hashtags/videos/list/), [Bilibili user videos](https://dataxapi.com/apis/bilibili/users/videos/list/), [Bilibili video detail](https://dataxapi.com/apis/bilibili/videos/get/), [Bilibili video search](https://dataxapi.com/apis/bilibili/videos/search/), [Bilibili popular videos](https://dataxapi.com/apis/bilibili/videos/trending/), [Douyin trend-index creator top videos](https://dataxapi.com/apis/douyin/index/creators/videos/list/), [Douyin trend-index keyword hot videos](https://dataxapi.com/apis/douyin/index/videos/search/), [Douyin user videos](https://dataxapi.com/apis/douyin/users/videos/list/), [Douyin video detail](https://dataxapi.com/apis/douyin/videos/get/), [Douyin video play count](https://dataxapi.com/apis/douyin/videos/metrics/), [Douyin related videos](https://dataxapi.com/apis/douyin/videos/related/), [Douyin video search](https://dataxapi.com/apis/douyin/videos/search/), [Douyin trending videos](https://dataxapi.com/apis/douyin/videos/trending/), [Kuaishou user videos](https://dataxapi.com/apis/kuaishou/users/videos/list/), [Kuaishou video detail](https://dataxapi.com/apis/kuaishou/videos/get/), [Kuaishou video search](https://dataxapi.com/apis/kuaishou/videos/search/), [Telegram channel messages](https://dataxapi.com/apis/telegram/channels/messages/list/), [Telegram message detail](https://dataxapi.com/apis/telegram/messages/get/), [X list posts](https://dataxapi.com/apis/x/lists/posts/list/)

Reddit endpoints: [Reddit post comments](https://dataxapi.com/apis/reddit/posts/comments/list/), [Reddit post detail](https://dataxapi.com/apis/reddit/posts/get/), [Reddit post search](https://dataxapi.com/apis/reddit/posts/search/), [Reddit popular posts](https://dataxapi.com/apis/reddit/posts/trending/), [Reddit community posts](https://dataxapi.com/apis/reddit/subreddits/posts/list/), [Reddit trending searches](https://dataxapi.com/apis/reddit/trends/list/), [Reddit user profile](https://dataxapi.com/apis/reddit/users/get/), [Reddit user posts](https://dataxapi.com/apis/reddit/users/posts/list/), [Reddit community profile](https://dataxapi.com/apis/reddit/subreddits/get/), [Reddit user active communities](https://dataxapi.com/apis/reddit/users/subreddits/list/), [Reddit video transcript](https://dataxapi.com/apis/reddit/posts/transcript/get/)

Related: [All Reddit endpoints](https://dataxapi.com/apis/reddit/), [Social media data](https://dataxapi.com/categories/social/), [The same thing on 2 platforms, side by side](https://dataxapi.com/roles/communities-posts-list/), [The post object's fields](https://dataxapi.com/docs/objects/post/)

## Questions

### How much does the Reddit community posts API cost?

$0.0020 per call. The most one call can cost is $0.0020.

### When am I not charged?

Errors and timeouts are not charged; an empty result is charged $0.0020.

### How many items does one call return, and how do I get the next page?

25 items a page. The page size is the platform's; limit is not accepted. For the next page pass page.next_cursor as cursor; a cursor is valid for 1 hour. page.has_more is false on the last page.

### What happens if the object does not exist?

A community that does not exist cannot be told from a community without posts: both return an empty result, not a 404, and are charged as an empty result is.

---

Last checked 2026-10-18 19:59 UTC. Catalog revision c48ce454ae6c4c65. [HTML version](https://dataxapi.com/apis/reddit/subreddits/posts/list/)
