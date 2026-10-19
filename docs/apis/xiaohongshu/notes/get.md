# Xiaohongshu (RedNote) note detail API

Get one Xiaohongshu note by ID or link: title, text, author, engagement counts, images. One object a call; $0.0200 per call. Errors, timeouts and objects that do not exist are not charged.

- Endpoint: `GET https://api.dataxapi.com/v1/xiaohongshu/notes/get`
- ID: `xiaohongshu.notes.get`
- Also known as: note detail, rednote post
- Price: $0.0200 / call
- Live status is not on this page, which is a snapshot. Read it with `GET https://api.dataxapi.com/v1/catalog/status`
- Returns: 1 object, one post object
- Returns the standard post object, the same on every platform
- `id` is in the link: `xiaohongshu.com/explore/<id>`. Or pass the whole link as `url`.
- [Run it in the Playground](https://dataxapi.com/console/playground/?capability=xiaohongshu.notes.get&params=%7B%22id%22%3A%226ac76250000000000a021233%22%7D)
- In Chinese: [小红书笔记详情 API](https://dataxapi.com/zh/apis/xiaohongshu/notes/get/)

## What you get

The first 8 rows of a response recorded 2026-10-10 12:46 UTC.

| Field | Value |
| --- | --- |
| type | image |
| lang | zh-Hans |
| published_at | 2026-10-09 01:00 UTC |
| metrics.likes | 927 |
| metrics.comments | 122 |
| metrics.shares | 256 |
| metrics.favorites | 59 |
| is_pinned | false |

## Parameters

| Parameter | Type | required | Description |
| --- | --- | --- | --- |
| `id` | text | give exactly one of `id`, `url` | Note ID, 24 hexadecimal characters. With only a link or a share text, give it as url. Example: `6ac76250000000000a021233`. |
| `url` | text | give exactly one of `id`, `url` | Link to the note, pasted as it is: the https://www.xiaohongshu.com/explore/… address from the browser, the https://www.xiaohongshu.com/discovery/item/… link the website shares (query parameters such as xsec_token are fine), a whole share text with such a link in it, or the xhslink.com short link the app copies (alone or in its share text). A short link is opened once to see which note it leads to; where it cannot be, paste the note's full link or its ID. Example: `https://www.xiaohongshu.com/explore/6ac76250000000000a021233?xsec_token=ABx1y2z3`. Full link: `https://www.xiaohongshu.com/explore/6ac76250000000000a021233?xsec_token=ABx1y2z3`. Share text with a link inside: `周末咖啡探店合集 https://www.xiaohongshu.com/discovery/item/6ac76250000000000a021233?xsec_token=ABx1y2z3 复制这段文字，打开小红书查看`. |
| `view` | text |  | How much of each item to return. All three cost the same. Values: `compact`, `standard` (default), `full`. |
| `fields` | list of text |  | Return only these fields. Each by its path, such as `author.name`. |

## Returned fields

`data.item` is one post object. Stable: fields are only ever added.

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
| `author.followers` | integer | Author's follower count. | `standard` | Not provided here |
| `metrics` | object | Engagement counts. | `compact` | Yes |
| `metrics.likes` | integer | Likes. | `compact` | Yes |
| `metrics.comments` | integer | Comments. | `compact` | Yes |
| `metrics.shares` | integer | Shares. | `compact` | Yes |
| `metrics.favorites` | integer | Saves. | `compact` | Yes |
| `metrics.views` | integer | Views. | `compact` | The platform has none |
| `metrics.reposts` | integer | Reposts. | `compact` | The platform has none |
| `images` | list of link | Image addresses. | `standard` | Yes |
| `hashtags` | list of text | Hashtags, without the #. | `standard` | Yes |
| `mentions` | list of object | Accounts mentioned in the text. | `standard` | Yes |
| `mentions[].id` | text | Account ID. | `standard` | Yes |
| `mentions[].username` | text | Handle. | `standard` | The platform has none |
| `mentions[].name` | text | Display name. | `standard` | Yes |
| `is_pinned` | yes/no | Whether the author pinned it. | `standard` | Yes |
| `post_id` | text | ID of the thread's root post when this is a reply; otherwise null. | `compact` | The platform has none |
| `parent_id` | text | ID of the item it replies to directly; otherwise null. | `compact` | The platform has none |
| `root_id` | text | ID of the first-level reply its thread hangs under. | `compact` | The platform has none |
| `ext.ip_location` | text | IP location as the platform shows it. | `full` | Yes |
| `approximate` | list of object | Which numbers of this item are approximate or lower bounds; absent when all are exact. | `compact` | Yes |
| `approximate[].field` | text | Path of the field, such as metrics.views. | `compact` | Yes |
| `approximate[].kind` | text | Approximate, or a lower bound. Values: `approximate`, `lower_bound`. | `compact` | Yes |

A field with no value on an item is `null`. A field this endpoint cannot give is left out and listed in `meta.unavailable`.

Typical size of one item: `compact` 903 B, `standard` 3.0 KB, `full` 3.1 KB (measured on the response recorded 2026-10-10 12:46 UTC).

## Paging

One object per call: there is nothing to page.

## When you are charged

| Case | Charged |
| --- | --- |
| A result with data | $0.0200, once per call |
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
curl -G "https://api.dataxapi.com/v1/xiaohongshu/notes/get" \
  --data-urlencode "id=6ac76250000000000a021233" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.xiaohongshu.notes.get(id="6ac76250000000000a021233")
print(result["data"]["item"])
```

### TypeScript

```typescript
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.xiaohongshu.notes.get({ id: "6ac76250000000000a021233" });
console.log(result.data.item);
```

### CLI

```bash
dataxapi call xiaohongshu.notes.get id=6ac76250000000000a021233
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

Add this to your MCP client, then ask your agent to call `xiaohongshu.notes.get`.

## Responses

### 200

From a response recorded 2026-10-10 12:46 UTC. Names, text and IDs are examples, and so are the links: none is the recorded one (the page shows no one's personal data); the figures are as recorded. Long lists are cut. The request ID, cursor and balance are made up.

Size as sent: 3.6 KB in the standard view (1.4 KB compact, 3.6 KB full).

```jsonc
{
  "code": "ok",
  "request_id": "f71a940b-5096-4ae5-8062-eb8542c0840d",
  "data": {
    "item": {
      "id": "64e3473100000000d2df6d97",
      "url": "https://www.xiaohongshu.com/explore/64e3473100000000d2df6d97",
      "type": "image",
      "title": "周末露营装备清单，新手照着买就行",
      "text": "周末露营｜第一次尝试就爱上了，清单放评论区",
      "lang": "zh-Hans",
      "published_at": "2026-10-09T01:00:34.000Z",
      "author": {
        "id": "61a2711e000000007b58eefa",
        "username": "aya_living",
        "name": "认真生活的阿雅",
        "avatar_url": "https://sns-avatar-qc.xhscdn.com/avatar/61177eaf00000000f2be6e0c.jpg"
      },
      "metrics": {
        "likes": 927,
        "comments": 122,
        "shares": 256,
        "favorites": 59
      },
      "images": [
        "https://sns-webpic-qc.xhscdn.com/20261013/beb7fc7264c0ffc27302!nd_dft_wlteh_webp_3",
        "https://sns-webpic-qc.xhscdn.com/20261012/355cf1169dfdc76d1395!nd_dft_wlteh_webp_3",
        // … 7 more
      ],
      "hashtags": [
        "户外生活",
        "好物分享",
        // … 3 more
      ],
      "mentions": [],
      "is_pinned": false
    }
  },
  "warnings": [],
  "meta": {
    "capability": "xiaohongshu.notes.get",
    "result_status": "complete",
    "fetched_at": "2026-10-10T12:46:15.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "metrics.views": "platform",
      "metrics.reposts": "platform",
      "author.verified": "capability",
      "author.followers": "capability",
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
  "request_id": "295833a2-02b3-450c-8d2a-0317912366ff",
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
  "request_id": "f76411e1-c54a-477f-b1e7-c680ade10764",
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
  "request_id": "92a3c24c-08f2-4a78-8042-6526fd288c71",
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
  "request_id": "08ca0ea5-88fe-446f-90d7-d9ee934f9ca4",
  "message": "The data source failed",
  "message_zh": "数据来源出错",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

[This example as a JSON file](https://dataxapi.com/apis/xiaohongshu/notes/get.example.json)

## Use it in your AI

`dataxapi setup` gives the agents on your machine (Claude Code, Codex, Cursor) the DataXAPI MCP server and the base skill. The key is read from DATAXAPI_API_KEY; none is written into a file.

MCP server: `https://api.dataxapi.com/mcp`. The entry for your client is under MCP in the request examples of this page; then ask your agent to call `xiaohongshu.notes.get`.

Or paste this to any AI:

> Read https://dataxapi.com/apis/xiaohongshu/notes/get.md and help me use the DataXAPI endpoint xiaohongshu.notes.get (Xiaohongshu (RedNote) note detail).

[Open in ChatGPT](https://chatgpt.com/?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fxiaohongshu%2Fnotes%2Fget.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20xiaohongshu.notes.get%20%28Xiaohongshu%20%28RedNote%29%20note%20detail%29.) · [Open in Claude](https://claude.ai/new?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fxiaohongshu%2Fnotes%2Fget.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20xiaohongshu.notes.get%20%28Xiaohongshu%20%28RedNote%29%20note%20detail%29.)

## Related

Part of DataXAPI's Social media data. The same key also works for: Creators, Ads, E-commerce.

The same thing on other platforms: [Bilibili video detail](https://dataxapi.com/apis/bilibili/videos/get/), [Douyin video detail](https://dataxapi.com/apis/douyin/videos/get/), [Kuaishou video detail](https://dataxapi.com/apis/kuaishou/videos/get/), [Telegram message detail](https://dataxapi.com/apis/telegram/messages/get/), [X post detail](https://dataxapi.com/apis/x/posts/get/), [Facebook post detail](https://dataxapi.com/apis/facebook/posts/get/), [LinkedIn post detail](https://dataxapi.com/apis/linkedin/posts/get/), [Threads post detail](https://dataxapi.com/apis/threads/posts/get/), [Instagram post detail](https://dataxapi.com/apis/instagram/posts/get/), [TikTok video detail](https://dataxapi.com/apis/tiktok/videos/get/), [Weibo post detail](https://dataxapi.com/apis/weibo/posts/get/), [YouTube video detail](https://dataxapi.com/apis/youtube/videos/get/), [WeChat Channels video detail](https://dataxapi.com/apis/wechat_channels/videos/get/), [WeChat Official Account article detail](https://dataxapi.com/apis/wechat_mp/articles/get/), [Reddit post detail](https://dataxapi.com/apis/reddit/posts/get/), [Zhihu answer detail](https://dataxapi.com/apis/zhihu/answers/get/), [Zhihu article detail](https://dataxapi.com/apis/zhihu/articles/get/), [Zhihu pin detail](https://dataxapi.com/apis/zhihu/pins/get/), [Zhihu question detail](https://dataxapi.com/apis/zhihu/questions/get/), [Pinterest pin detail](https://dataxapi.com/apis/pinterest/pins/get/)

Xiaohongshu (RedNote) endpoints: [Xiaohongshu image search](https://dataxapi.com/apis/xiaohongshu/images/search/), [Xiaohongshu note detail](https://dataxapi.com/apis/xiaohongshu/notes/get/), [Xiaohongshu comment replies](https://dataxapi.com/apis/xiaohongshu/comments/replies/list/), [Xiaohongshu note comments](https://dataxapi.com/apis/xiaohongshu/notes/comments/list/), [Xiaohongshu note search](https://dataxapi.com/apis/xiaohongshu/notes/search/), [Xiaohongshu topic notes](https://dataxapi.com/apis/xiaohongshu/topics/notes/list/), [Xiaohongshu topic detail](https://dataxapi.com/apis/xiaohongshu/topics/get/), [Xiaohongshu trends](https://dataxapi.com/apis/xiaohongshu/trends/list/), [Xiaohongshu user profile](https://dataxapi.com/apis/xiaohongshu/users/get/), [Xiaohongshu user notes](https://dataxapi.com/apis/xiaohongshu/users/notes/list/), [Xiaohongshu user search](https://dataxapi.com/apis/xiaohongshu/users/search/)

Xiaohongshu PGY endpoints: [Xiaohongshu PGY keyword search index](https://dataxapi.com/apis/xiaohongshu/pgy/keywords/history/), [Xiaohongshu PGY related keywords](https://dataxapi.com/apis/xiaohongshu/pgy/keywords/related/), [Xiaohongshu PGY creator search](https://dataxapi.com/apis/xiaohongshu/pgy/creators/search/), [Xiaohongshu PGY creator detail](https://dataxapi.com/apis/xiaohongshu/pgy/creators/get/), [Xiaohongshu PGY creator audience profile](https://dataxapi.com/apis/xiaohongshu/pgy/creators/audience/get/), [Xiaohongshu PGY creator metrics](https://dataxapi.com/apis/xiaohongshu/pgy/creators/metrics/), [Xiaohongshu PGY creator notes](https://dataxapi.com/apis/xiaohongshu/pgy/creators/notes/list/)

Xiaohongshu Shop endpoints: [Xiaohongshu product detail](https://dataxapi.com/apis/xiaohongshu/shop/products/get/), [Xiaohongshu product reviews](https://dataxapi.com/apis/xiaohongshu/shop/products/reviews/list/), [Xiaohongshu product search](https://dataxapi.com/apis/xiaohongshu/shop/products/search/)

How-to guides and answers: [How to search and export Xiaohongshu (RedNote) notes by keyword](https://dataxapi.com/guides/xiaohongshu-search-export-notes/), [How do I export Xiaohongshu (RedNote) data?](https://dataxapi.com/answers/export-xiaohongshu-data/), [Can ChatGPT read Xiaohongshu (RedNote)?](https://dataxapi.com/answers/can-chatgpt-read-xiaohongshu/)

Skills that use this endpoint: [Breaking down a hit](https://dataxapi.com/skills/viral/)

Related: [All Xiaohongshu (RedNote) endpoints](https://dataxapi.com/apis/xiaohongshu/), [Social media data](https://dataxapi.com/categories/social/), [The same thing on 18 platforms, side by side](https://dataxapi.com/roles/posts-get/), [The post object's fields](https://dataxapi.com/docs/objects/post/)

## Questions

### How much does the Xiaohongshu (RedNote) note detail API cost?

$0.0200 per call. The most one call can cost is $0.0200.

### When am I not charged?

Errors, timeouts and objects that do not exist are not charged.

### What happens if the object does not exist?

The answer is 404 not_found and nothing is charged. reason says which: not_found (it does not exist) or private_or_deleted.

---

Last checked 2026-10-18 19:59 UTC. Catalog revision c48ce454ae6c4c65. [HTML version](https://dataxapi.com/apis/xiaohongshu/notes/get/)
