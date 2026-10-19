# Xiaohongshu (RedNote) user notes API

Get a page of the notes a Xiaohongshu account posted, by user ID or profile link: title, text, engagement counts, images, whether pinned. About 20 items a call, 30 at most; $0.0200 per call. Errors, timeouts and objects that do not exist are not charged; an empty result is charged $0.0200.

- Endpoint: `GET https://api.dataxapi.com/v1/xiaohongshu/users/notes/list`
- ID: `xiaohongshu.users.notes.list`
- Also known as: rednote user posts, xhs user notes
- Price: $0.0200 / call
- Live status is not on this page, which is a snapshot. Read it with `GET https://api.dataxapi.com/v1/catalog/status`
- Returns: up to 30 a page, a page, with a cursor for the next
- Returns the standard post object, the same on every platform
- `id` is in the link: `xiaohongshu.com/user/profile/<id>`. Or pass the whole link as `url`.
- [Run it in the Playground](https://dataxapi.com/console/playground/?capability=xiaohongshu.users.notes.list&params=%7B%22id%22%3A%2263bed214000000002702b862%22%7D)
- In Chinese: [小红书用户笔记 API](https://dataxapi.com/zh/apis/xiaohongshu/users/notes/list/)

## What you get

The first 7 rows of a response recorded 2026-10-12 19:13 UTC.

| Field | Value |
| --- | --- |
| type | video |
| published_at | 2026-10-12 01:00 UTC |
| metrics.likes | 8 |
| metrics.comments | 0 |
| metrics.shares | 0 |
| metrics.favorites | 2 |
| is_pinned | false |

## Parameters

| Parameter | Type | required | Description |
| --- | --- | --- | --- |
| `id` | text | give exactly one of `id`, `url` | User ID, 24 hexadecimal characters. With only a profile link, give it as url. Example: `63bed214000000002702b862`. |
| `url` | text | give exactly one of `id`, `url` | Link to the profile, pasted as it is: https://www.xiaohongshu.com/user/profile/… (query parameters such as xsec_token are fine), a whole share text with such a link in it, or the xhslink.com short link the app copies. A short link is opened once to see which profile it leads to; where it cannot be, paste the profile's full link or the user ID. Example: `https://www.xiaohongshu.com/user/profile/63bed214000000002702b862?xsec_token=ABx1y2z3`. Full link: `https://www.xiaohongshu.com/user/profile/63bed214000000002702b862?xsec_token=ABx1y2z3`. Share text with a link inside: `周末咖啡探店合集 https://www.xiaohongshu.com/user/profile/63bed214000000002702b862?xsec_token=ABx1y2z3 复制这段文字，打开小红书查看`. |
| `cursor` | text |  | Cursor returned by the previous page. Pass `page.next_cursor` of the page before, unchanged. Each page is charged as a call of its own. |
| `view` | text |  | How much of each item to return. All three cost the same. Values: `compact`, `standard` (default), `full`. |
| `fields` | list of text |  | Return only these fields. Each by its path, such as `author.name`. |

## Returned fields

`data.items` is a list of post objects. Stable: fields are only ever added.

Three views: `compact` (the most used fields, long text cut short), `standard` (the default: every standard field) and `full` (adds `ext`, the platform's own fields). A field is in the view named and in every larger one.

| Field | Type | Description | From view | This endpoint |
| --- | --- | --- | --- | --- |
| `id` | text | ID; pass it unchanged to the get endpoint. | `compact` | Yes |
| `url` | link | Link that opens the post. | `compact` | Not provided here |
| `type` | text | Content format. Values: `video`, `image`, `text`, `article`. | `compact` | Yes |
| `title` | text | Title. | `compact` | Yes |
| `text` | text | Body text. On this platform: The first 100 characters of the text; the note itself has all of it. Long text: the compact view keeps the first 500 characters and says so in `warnings`. | `compact` | Yes |
| `lang` | text | Language of the text. | `standard` | Not provided here |
| `published_at` | time | When it was published. | `compact` | Yes |
| `author` | object | Author. | `compact` | Yes |
| `author.id` | text | Author's account ID. | `compact` | Yes |
| `author.username` | text | Author's handle. | `compact` | Not provided here |
| `author.name` | text | Author's display name. | `compact` | Yes |
| `author.avatar_url` | link | Author's avatar. | `standard` | Yes |
| `author.verified` | yes/no | Whether the author is verified. | `standard` | Not provided here |
| `author.followers` | integer | Author's follower count. | `standard` | Not provided here |
| `metrics` | object | Engagement counts. | `compact` | Yes |
| `metrics.likes` | integer | Likes. | `compact` | Yes |
| `metrics.comments` | integer | Comments. | `compact` | Yes |
| `metrics.shares` | integer | Shares. | `compact` | Yes |
| `metrics.favorites` | integer | Saves. | `compact` | Yes |
| `metrics.views` | integer | Views. | `compact` | The platform has none |
| `metrics.reposts` | integer | Reposts. | `compact` | The platform has none |
| `images` | list of link | Image addresses. | `standard` | Yes |
| `hashtags` | list of text | Hashtags, without the #. | `standard` | Not provided here |
| `mentions` | list of object | Accounts mentioned in the text. | `standard` | Yes |
| `mentions[].id` | text | Account ID. | `standard` | Yes |
| `mentions[].username` | text | Handle. | `standard` | The platform has none |
| `mentions[].name` | text | Display name. | `standard` | Yes |
| `is_pinned` | yes/no | Whether the author pinned it. | `standard` | Yes |
| `post_id` | text | ID of the thread's root post when this is a reply; otherwise null. | `compact` | The platform has none |
| `parent_id` | text | ID of the item it replies to directly; otherwise null. | `compact` | The platform has none |
| `root_id` | text | ID of the first-level reply its thread hangs under. | `compact` | The platform has none |
| `approximate` | list of object | Which numbers of this item are approximate or lower bounds; absent when all are exact. | `compact` | Yes |
| `approximate[].field` | text | Path of the field, such as metrics.views. | `compact` | Yes |
| `approximate[].kind` | text | Approximate, or a lower bound. Values: `approximate`, `lower_bound`. | `compact` | Yes |

A field with no value on an item is `null`. A field this endpoint cannot give is left out and listed in `meta.unavailable`.

Typical size of one item: `compact` 568 B, `standard` 965 B, `full` 965 B (measured on the response recorded 2026-10-12 19:13 UTC).

## Paging

About 20 items a page, 30 at most. The page size is the platform's; `limit` is not accepted.

For the next page pass `page.next_cursor` as `cursor`; a cursor is valid for 1 hour. `page.has_more` is false on the last page.

## When you are charged

| Case | Charged |
| --- | --- |
| A result with data | $0.0200, once per call |
| Each further page | charged as a call of its own |
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
curl -G "https://api.dataxapi.com/v1/xiaohongshu/users/notes/list" \
  --data-urlencode "id=63bed214000000002702b862" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.xiaohongshu.users.notes.list(id="63bed214000000002702b862")
print(result["data"]["items"])
```

### TypeScript

```typescript
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.xiaohongshu.users.notes.list({ id: "63bed214000000002702b862" });
console.log(result.data.items);
```

### CLI

```bash
dataxapi call xiaohongshu.users.notes.list id=63bed214000000002702b862
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

Add this to your MCP client, then ask your agent to call `xiaohongshu.users.notes.list`.

## Responses

### 200

From a response recorded 2026-10-12 19:13 UTC. Names, text and IDs are examples, and so are the links: none is the recorded one (the page shows no one's personal data); the figures are as recorded. Long lists are cut. The request ID, cursor and balance are made up.

Size as sent: 19.6 KB in the standard view (11.8 KB compact, 19.6 KB full).

```jsonc
{
  "code": "ok",
  "request_id": "207ddb09-2a0d-4ff5-8cd3-9ddce35b46a5",
  "data": {
    "items": [
      {
        "id": "676ed1bc00000000d870f54e",
        "type": "video",
        "title": "实测一个月周末露营，结论有点意外",
        "text": "周末的周末露营日常，随手记录一下",
        "published_at": "2026-10-12T01:00:27.000Z",
        "author": {
          "id": "6998fff50000000046ca2f74",
          "name": "南边的风",
          "avatar_url": "https://sns-avatar-qc.xhscdn.com/avatar/6412ba1a00000000ff300cc2.jpg"
        },
        "metrics": {
          "likes": 8,
          "comments": 0,
          "shares": 0,
          "favorites": 2
        },
        "images": [
          "https://sns-webpic-qc.xhscdn.com/20261019/e38ec1fd03381eaef493!nd_dft_wlteh_webp_3"
        ],
        "mentions": [],
        "is_pinned": false
      },
      // … 19 more
    ]
  },
  "page": {
    "next_cursor": "c1.LwegQikqZdn9JGQkwTrpD-r4Bc3_yNoolTMdaIit",
    "cursor_expires_at": "2026-10-12T20:13:48.000Z",
    "has_more": true,
    "returned": 20
  },
  "warnings": [],
  "meta": {
    "capability": "xiaohongshu.users.notes.list",
    "result_status": "complete",
    "fetched_at": "2026-10-12T19:13:48.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "url": "capability",
      "lang": "capability",
      "author.username": "capability",
      "author.verified": "capability",
      "author.followers": "capability",
      "metrics.views": "platform",
      "metrics.reposts": "platform",
      "hashtags": "capability",
      "mentions.username": "platform",
      "post_id": "platform",
      "parent_id": "platform",
      "root_id": "platform"
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

From a recording of 2026-10-12 19:13 UTC, edited by hand to show this case. The request ID and balance are made up.

Size as sent: 719 B in the standard view (719 B compact, 719 B full).

```jsonc
{
  "code": "ok",
  "request_id": "7f88b9ae-c4d7-400e-8a67-85b6e5a5b8c8",
  "data": { "items": [] },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 0
  },
  "warnings": [],
  "meta": {
    "capability": "xiaohongshu.users.notes.list",
    "result_status": "empty",
    "fetched_at": "2026-10-12T19:13:48.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "url": "capability",
      "lang": "capability",
      "author.username": "capability",
      "author.verified": "capability",
      "author.followers": "capability",
      "metrics.views": "platform",
      "metrics.reposts": "platform",
      "hashtags": "capability",
      "mentions.username": "platform",
      "post_id": "platform",
      "parent_id": "platform",
      "root_id": "platform"
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
  "request_id": "790cf3f4-b638-46e9-bf3d-df90a96ed2c1",
  "message": "A parameter is invalid",
  "message_zh": "参数不合法",
  "charged": false,
  "retry": "after_fix",
  "retry_after_seconds": null,
  "param": null,
  "problems": ["give exactly one of id, url"],
  "docs_url": "https://dataxapi.com/docs/errors#invalid_params"
}
```

### 402

An example written to the specification, not a recorded response.

```json
{
  "code": "insufficient_balance",
  "request_id": "13b59347-259c-4812-933c-3e13c6da1048",
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
  "request_id": "d45c03c2-850a-4852-a53c-60141f37e3b1",
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
  "request_id": "cef8ef2c-e5f2-463c-9182-1281f154a185",
  "message": "The data source failed",
  "message_zh": "数据来源出错",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

[This example as a JSON file](https://dataxapi.com/apis/xiaohongshu/users/notes/list.example.json)

## Use it in your AI

`dataxapi setup` gives the agents on your machine (Claude Code, Codex, Cursor) the DataXAPI MCP server and the base skill. The key is read from DATAXAPI_API_KEY; none is written into a file.

MCP server: `https://api.dataxapi.com/mcp`. The entry for your client is under MCP in the request examples of this page; then ask your agent to call `xiaohongshu.users.notes.list`.

Or paste this to any AI:

> Read https://dataxapi.com/apis/xiaohongshu/users/notes/list.md and help me use the DataXAPI endpoint xiaohongshu.users.notes.list (Xiaohongshu (RedNote) user notes).

[Open in ChatGPT](https://chatgpt.com/?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fxiaohongshu%2Fusers%2Fnotes%2Flist.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20xiaohongshu.users.notes.list%20%28Xiaohongshu%20%28RedNote%29%20user%20notes%29.) · [Open in Claude](https://claude.ai/new?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fxiaohongshu%2Fusers%2Fnotes%2Flist.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20xiaohongshu.users.notes.list%20%28Xiaohongshu%20%28RedNote%29%20user%20notes%29.)

## Related

Part of DataXAPI's Social media data. The same key also works for: Creators, Ads, E-commerce.

The same thing on other platforms: [Bilibili user videos](https://dataxapi.com/apis/bilibili/users/videos/list/), [Douyin user videos](https://dataxapi.com/apis/douyin/users/videos/list/), [Kuaishou user videos](https://dataxapi.com/apis/kuaishou/users/videos/list/), [Telegram channel messages](https://dataxapi.com/apis/telegram/channels/messages/list/), [Facebook page posts](https://dataxapi.com/apis/facebook/pages/posts/list/), [LinkedIn company posts](https://dataxapi.com/apis/linkedin/companies/posts/list/), [Threads user posts](https://dataxapi.com/apis/threads/users/posts/list/), [Instagram user posts](https://dataxapi.com/apis/instagram/users/posts/list/), [TikTok user videos](https://dataxapi.com/apis/tiktok/users/videos/list/), [Weibo user posts](https://dataxapi.com/apis/weibo/users/posts/list/), [X user posts](https://dataxapi.com/apis/x/users/posts/list/), [YouTube channel videos](https://dataxapi.com/apis/youtube/channels/videos/list/), [WeChat Channels account videos](https://dataxapi.com/apis/wechat_channels/users/videos/list/), [WeChat Official Account articles](https://dataxapi.com/apis/wechat_mp/accounts/articles/list/), [Reddit user posts](https://dataxapi.com/apis/reddit/users/posts/list/), [Zhihu user answers](https://dataxapi.com/apis/zhihu/users/answers/list/), [Zhihu user articles](https://dataxapi.com/apis/zhihu/users/articles/list/), [Zhihu user pins](https://dataxapi.com/apis/zhihu/users/pins/list/)

Xiaohongshu (RedNote) endpoints: [Xiaohongshu image search](https://dataxapi.com/apis/xiaohongshu/images/search/), [Xiaohongshu note detail](https://dataxapi.com/apis/xiaohongshu/notes/get/), [Xiaohongshu comment replies](https://dataxapi.com/apis/xiaohongshu/comments/replies/list/), [Xiaohongshu note comments](https://dataxapi.com/apis/xiaohongshu/notes/comments/list/), [Xiaohongshu note search](https://dataxapi.com/apis/xiaohongshu/notes/search/), [Xiaohongshu topic notes](https://dataxapi.com/apis/xiaohongshu/topics/notes/list/), [Xiaohongshu topic detail](https://dataxapi.com/apis/xiaohongshu/topics/get/), [Xiaohongshu trends](https://dataxapi.com/apis/xiaohongshu/trends/list/), [Xiaohongshu user profile](https://dataxapi.com/apis/xiaohongshu/users/get/), [Xiaohongshu user notes](https://dataxapi.com/apis/xiaohongshu/users/notes/list/), [Xiaohongshu user search](https://dataxapi.com/apis/xiaohongshu/users/search/)

Xiaohongshu PGY endpoints: [Xiaohongshu PGY keyword search index](https://dataxapi.com/apis/xiaohongshu/pgy/keywords/history/), [Xiaohongshu PGY related keywords](https://dataxapi.com/apis/xiaohongshu/pgy/keywords/related/), [Xiaohongshu PGY creator search](https://dataxapi.com/apis/xiaohongshu/pgy/creators/search/), [Xiaohongshu PGY creator detail](https://dataxapi.com/apis/xiaohongshu/pgy/creators/get/), [Xiaohongshu PGY creator audience profile](https://dataxapi.com/apis/xiaohongshu/pgy/creators/audience/get/), [Xiaohongshu PGY creator metrics](https://dataxapi.com/apis/xiaohongshu/pgy/creators/metrics/), [Xiaohongshu PGY creator notes](https://dataxapi.com/apis/xiaohongshu/pgy/creators/notes/list/)

Xiaohongshu Shop endpoints: [Xiaohongshu product detail](https://dataxapi.com/apis/xiaohongshu/shop/products/get/), [Xiaohongshu product reviews](https://dataxapi.com/apis/xiaohongshu/shop/products/reviews/list/), [Xiaohongshu product search](https://dataxapi.com/apis/xiaohongshu/shop/products/search/)

How-to guides and answers: [How do I export Xiaohongshu (RedNote) data?](https://dataxapi.com/answers/export-xiaohongshu-data/)

Skills that use this endpoint: [Competitor account monitoring](https://dataxapi.com/skills/competitors/), [Account check-up](https://dataxapi.com/skills/account-audit/)

Related: [All Xiaohongshu (RedNote) endpoints](https://dataxapi.com/apis/xiaohongshu/), [Social media data](https://dataxapi.com/categories/social/), [The same thing on 17 platforms, side by side](https://dataxapi.com/roles/accounts-posts-list/), [The post object's fields](https://dataxapi.com/docs/objects/post/)

## Questions

### How much does the Xiaohongshu (RedNote) user notes API cost?

$0.0200 per call. The most one call can cost is $0.0200.

### When am I not charged?

Errors, timeouts and objects that do not exist are not charged; an empty result is charged $0.0200.

### How many items does one call return, and how do I get the next page?

About 20 items a page, 30 at most. The page size is the platform's; limit is not accepted. For the next page pass page.next_cursor as cursor; a cursor is valid for 1 hour. page.has_more is false on the last page.

### What happens if the object does not exist?

The answer is 404 not_found and nothing is charged. reason says which: not_found (it does not exist) or private_or_deleted.

---

Last checked 2026-10-18 19:59 UTC. Catalog revision c48ce454ae6c4c65. [HTML version](https://dataxapi.com/apis/xiaohongshu/users/notes/list/)
