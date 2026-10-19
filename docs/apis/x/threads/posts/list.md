# X thread context API

Get the posts of an X thread by the ID of any post in it: the root post, the author's follow-ups and the replies among them. About 20 items a call, 50 at most; $0.0003 per item returned, at least $0.0003 and at most $0.0150 a call. Errors and timeouts are not charged; an empty result is charged $0.0003.

- Endpoint: `GET https://api.dataxapi.com/v1/x/threads/posts/list`
- ID: `x.threads.posts.list`
- Also known as: twitter thread, thread context, conversation, X thread posts
- Price: $0.0003 / item
- Live status is not on this page, which is a snapshot. Read it with `GET https://api.dataxapi.com/v1/catalog/status`
- Returns: up to 50 a page, a page, with a cursor for the next
- Returns the standard post object, the same on every platform
- `id` is in the link: `x.com/i/status/<id>`.
- [Run it in the Playground](https://dataxapi.com/console/playground/?capability=x.threads.posts.list&params=%7B%22id%22%3A%222108198226532708497%22%7D)
- In Chinese: [X 帖子对话串 API](https://dataxapi.com/zh/apis/x/threads/posts/list/)

## What you get

The first 8 rows of a response recorded 2026-10-12 18:46 UTC.

| Field | Value |
| --- | --- |
| type | video |
| lang | en |
| published_at | 2026-10-08 14:10 UTC |
| author.verified | true |
| author.followers | 932,621 |
| metrics.likes | 155 |
| metrics.comments | 7 |
| metrics.favorites | 11 |

## Parameters

| Parameter | Type | required | Description |
| --- | --- | --- | --- |
| `id` | text | Yes | ID of any post in the thread. Example: `2108198226532708497`. |
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
| `author.followers` | integer | Author's follower count. | `standard` | Yes |
| `metrics` | object | Engagement counts. | `compact` | Yes |
| `metrics.likes` | integer | Likes. | `compact` | Yes |
| `metrics.comments` | integer | Comments. On this platform: Replies. | `compact` | Yes |
| `metrics.shares` | integer | Shares. | `compact` | The platform has none |
| `metrics.favorites` | integer | Saves. On this platform: Bookmarks. | `compact` | Yes |
| `metrics.views` | integer | Views. | `compact` | Yes |
| `metrics.reposts` | integer | Reposts. On this platform: Retweets; quotes are counted apart, in ext.quotes. | `compact` | Yes |
| `images` | list of link | Image addresses. | `standard` | Yes |
| `hashtags` | list of text | Hashtags, without the #. | `standard` | Yes |
| `mentions` | list of object | Accounts mentioned in the text. | `standard` | Yes |
| `mentions[].id` | text | Account ID. | `standard` | Yes |
| `mentions[].username` | text | Handle. | `standard` | Yes |
| `mentions[].name` | text | Display name. | `standard` | Yes |
| `is_pinned` | yes/no | Whether the author pinned it. | `standard` | Not provided here |
| `post_id` | text | ID of the thread's root post when this is a reply; otherwise null. | `compact` | Yes |
| `parent_id` | text | ID of the item it replies to directly; otherwise null. | `compact` | Yes |
| `root_id` | text | ID of the first-level reply its thread hangs under. | `compact` | The platform has none |
| `ext.quotes` | integer | Times it was quoted. | `full` | Yes |
| `approximate` | list of object | Which numbers of this item are approximate or lower bounds; absent when all are exact. | `compact` | Yes |
| `approximate[].field` | text | Path of the field, such as metrics.views. | `compact` | Yes |
| `approximate[].kind` | text | Approximate, or a lower bound. Values: `approximate`, `lower_bound`. | `compact` | Yes |

A field with no value on an item is `null`. A field this endpoint cannot give is left out and listed in `meta.unavailable`.

Typical size of one item: `compact` 570 B, `standard` 856 B, `full` 875 B (measured on the response recorded 2026-10-12 18:46 UTC).

## Paging

About 20 items a page, 50 at most. The page size is the platform's; `limit` is not accepted.

For the next page pass `page.next_cursor` as `cursor`; a cursor is valid for 1 hour. `page.has_more` is false on the last page.

## When you are charged

| Case | Charged |
| --- | --- |
| A result with data | $0.0003 for each valid item returned, at least $0.0003 a call |
| Each further page | charged as a call of its own |
| An empty result | $0.0003 |
| Invalid parameters, a failure of ours or of the data source, a timeout | not charged |
| The most one call can cost | $0.0150 (send `X-Max-Price` to refuse anything above your own limit) |

Prices as read 2026-10-18 19:59 UTC, under price book 2, in effect since 2026-10-17 11:00 UTC; the Playground reads the price in force before a run.

## If the object does not exist

A post that does not exist cannot be told from a post with no thread: both return an empty result, not a 404, and are charged as an empty result is.

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
curl -G "https://api.dataxapi.com/v1/x/threads/posts/list" \
  --data-urlencode "id=2108198226532708497" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.x.threads.posts.list(id="2108198226532708497")
print(result["data"]["items"])
```

### TypeScript

```typescript
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.x.threads.posts.list({ id: "2108198226532708497" });
console.log(result.data.items);
```

### CLI

```bash
dataxapi call x.threads.posts.list id=2108198226532708497
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

Add this to your MCP client, then ask your agent to call `x.threads.posts.list`.

## Responses

### 200

From a response recorded 2026-10-12 18:46 UTC. Names, text and IDs are examples, and so are the links: none is the recorded one (the page shows no one's personal data); the figures are as recorded. Long lists are cut. The request ID, cursor and balance are made up.

Size as sent: 6.3 KB in the standard view (4.4 KB compact, 6.5 KB full).

```jsonc
{
  "code": "ok",
  "request_id": "600112c4-7f73-41ea-81d8-cc36f84c268e",
  "data": {
    "items": [
      {
        "id": "1859350100658821016",
        "url": "https://x.com/i/status/1859350100658821016",
        "type": "video",
        "text": "Three things nobody tells you about weekend hiking.",
        "lang": "en",
        "published_at": "2026-10-08T14:10:00.000Z",
        "author": {
          "id": "179587263547156385",
          "username": "priya_reads",
          "name": "Priya R.",
          "avatar_url": "https://pbs.twimg.com/profile_images/1863965201067965315/bGgkaSLR_normal.jpg",
          "verified": true,
          "followers": 932621
        },
        "metrics": {
          "likes": 155,
          "comments": 7,
          "favorites": 11,
          "views": 10637,
          "reposts": 40
        },
        "images": [],
        "hashtags": [],
        "mentions": [
          {
            "id": "150813090063153821",
            "username": "leopark_films",
            "name": "Trail & Lens"
          }
        ],
        "post_id": null,
        "parent_id": null
      },
      // … 6 more
    ]
  },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 7
  },
  "warnings": [],
  "meta": {
    "capability": "x.threads.posts.list",
    "result_status": "complete",
    "fetched_at": "2026-10-12T18:46:24.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "title": "platform",
      "metrics.shares": "platform",
      "is_pinned": "capability",
      "root_id": "platform"
    },
    "billing": {
      "amount": "0.0021",
      "currency": "USD",
      "balance_after": "9.9979"
    }
  }
}
```

### Empty

From a response recorded 2026-10-12 18:46 UTC. The request ID and balance are made up.

Size as sent: 495 B in the standard view (495 B compact, 495 B full).

```jsonc
{
  "code": "ok",
  "request_id": "4fa3db93-30e9-4740-82c0-311c0d5b1036",
  "data": { "items": [] },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 0
  },
  "warnings": [],
  "meta": {
    "capability": "x.threads.posts.list",
    "result_status": "empty",
    "fetched_at": "2026-10-12T18:46:25.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "title": "platform",
      "metrics.shares": "platform",
      "is_pinned": "capability",
      "root_id": "platform"
    },
    "billing": {
      "amount": "0.0003",
      "currency": "USD",
      "balance_after": "9.9997"
    }
  }
}
```

### 400

An example written to the specification, not a recorded response.

```json
{
  "code": "invalid_params",
  "request_id": "f6b24093-8de1-4064-a2dc-d396e9d95f77",
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
  "request_id": "88e6cc7d-6e7a-4513-83e7-cb2dc8180023",
  "message": "The balance is too low",
  "message_zh": "余额不足",
  "charged": false,
  "retry": "after_fix",
  "retry_after_seconds": null,
  "param": null,
  "required": "0.015",
  "available": "0",
  "docs_url": "https://dataxapi.com/docs/errors#insufficient_balance"
}
```

### 502

An example written to the specification, not a recorded response.

```json
{
  "code": "upstream_failed",
  "request_id": "2f5a34b9-b6e6-4da2-93e5-c1cdd48cf251",
  "message": "The data source failed",
  "message_zh": "数据来源出错",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

[This example as a JSON file](https://dataxapi.com/apis/x/threads/posts/list.example.json)

## Use it in your AI

`dataxapi setup` gives the agents on your machine (Claude Code, Codex, Cursor) the DataXAPI MCP server and the base skill. The key is read from DATAXAPI_API_KEY; none is written into a file.

MCP server: `https://api.dataxapi.com/mcp`. The entry for your client is under MCP in the request examples of this page; then ask your agent to call `x.threads.posts.list`.

Or paste this to any AI:

> Read https://dataxapi.com/apis/x/threads/posts/list.md and help me use the DataXAPI endpoint x.threads.posts.list (X thread context).

[Open in ChatGPT](https://chatgpt.com/?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fx%2Fthreads%2Fposts%2Flist.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20x.threads.posts.list%20%28X%20thread%20context%29.) · [Open in Claude](https://claude.ai/new?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fx%2Fthreads%2Fposts%2Flist.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20x.threads.posts.list%20%28X%20thread%20context%29.)

## Related

Part of DataXAPI's Social media data. The same key also works for: Creators, Ads, E-commerce.

More Social media data on other platforms: [Douyin hashtag videos](https://dataxapi.com/apis/douyin/hashtags/videos/list/), [Bilibili user videos](https://dataxapi.com/apis/bilibili/users/videos/list/), [Bilibili video detail](https://dataxapi.com/apis/bilibili/videos/get/), [Bilibili video search](https://dataxapi.com/apis/bilibili/videos/search/), [Bilibili popular videos](https://dataxapi.com/apis/bilibili/videos/trending/), [Douyin trend-index creator top videos](https://dataxapi.com/apis/douyin/index/creators/videos/list/), [Douyin trend-index keyword hot videos](https://dataxapi.com/apis/douyin/index/videos/search/), [Douyin user videos](https://dataxapi.com/apis/douyin/users/videos/list/), [Douyin video detail](https://dataxapi.com/apis/douyin/videos/get/), [Douyin video play count](https://dataxapi.com/apis/douyin/videos/metrics/)

X (Twitter) endpoints: [X article detail](https://dataxapi.com/apis/x/posts/article/get/), [X post detail](https://dataxapi.com/apis/x/posts/get/), [X post quotes](https://dataxapi.com/apis/x/posts/quotes/list/), [X post replies](https://dataxapi.com/apis/x/posts/replies/list/), [X post retweeters](https://dataxapi.com/apis/x/posts/retweeters/list/), [X post search](https://dataxapi.com/apis/x/posts/search/), [X thread context](https://dataxapi.com/apis/x/threads/posts/list/), [X trends](https://dataxapi.com/apis/x/trends/list/), [X user followers](https://dataxapi.com/apis/x/users/followers/list/), [X user following](https://dataxapi.com/apis/x/users/following/list/), [X user profile](https://dataxapi.com/apis/x/users/get/), [X user mentions](https://dataxapi.com/apis/x/users/mentions/list/), [X user posts](https://dataxapi.com/apis/x/users/posts/list/), [X user search](https://dataxapi.com/apis/x/users/search/), [X video transcript](https://dataxapi.com/apis/x/posts/transcript/get/)

X Communities endpoints: [X community posts](https://dataxapi.com/apis/x/communities/posts/list/), [X community profile](https://dataxapi.com/apis/x/communities/get/), [X community members](https://dataxapi.com/apis/x/communities/members/list/)

X Lists endpoints: [X list posts](https://dataxapi.com/apis/x/lists/posts/list/), [X list followers](https://dataxapi.com/apis/x/lists/followers/list/), [X list members](https://dataxapi.com/apis/x/lists/members/list/)

Related: [All X (Twitter) endpoints](https://dataxapi.com/apis/x/), [Social media data](https://dataxapi.com/categories/social/), [The post object's fields](https://dataxapi.com/docs/objects/post/)

## Questions

### How much does the X thread context API cost?

$0.0003 per item returned, at least $0.0003 and at most $0.0150 a call. The most one call can cost is $0.0150.

### When am I not charged?

Errors and timeouts are not charged; an empty result is charged $0.0003.

### How many items does one call return, and how do I get the next page?

About 20 items a page, 50 at most. The page size is the platform's; limit is not accepted. For the next page pass page.next_cursor as cursor; a cursor is valid for 1 hour. page.has_more is false on the last page.

### What happens if the object does not exist?

A post that does not exist cannot be told from a post with no thread: both return an empty result, not a 404, and are charged as an empty result is.

---

Last checked 2026-10-18 19:59 UTC. Catalog revision c48ce454ae6c4c65. [HTML version](https://dataxapi.com/apis/x/threads/posts/list/)
