# Zhihu question answers API

Get the first 20 answers to a Zhihu question by ID or link, in Zhihu's own order: text, author, upvotes, comment and save counts. One page only. Up to 20 items a call; $0.0020 per call. Errors, timeouts and objects that do not exist are not charged; an empty result is charged $0.0020.

- Endpoint: `GET https://api.dataxapi.com/v1/zhihu/questions/answers/list`
- ID: `zhihu.questions.answers.list`
- Also known as: answers to a zhihu question, zhihu answer list
- Price: $0.0020 / call
- Live status is not on this page, which is a snapshot. Read it with `GET https://api.dataxapi.com/v1/catalog/status`
- Returns: 20 a page, everything in one answer, no paging
- Returns the standard post object, the same on every platform
- `id` is in the link: `zhihu.com/question/<id>`. Or pass the whole link as `url`.
- [Run it in the Playground](https://dataxapi.com/console/playground/?capability=zhihu.questions.answers.list&params=%7B%22id%22%3A%2255043447%22%7D)
- In Chinese: [知乎问题回答 API](https://dataxapi.com/zh/apis/zhihu/questions/answers/list/)

## What you get

The first 6 rows of a response recorded 2026-10-12 19:18 UTC.

| Field | Value |
| --- | --- |
| type | text |
| published_at | 2017-01-23 02:28 UTC |
| author.followers | 3,641 |
| metrics.likes | 228 |
| metrics.comments | 34 |
| metrics.favorites | 698 |

## Parameters

| Parameter | Type | required | Description |
| --- | --- | --- | --- |
| `id` | text | give exactly one of `id`, `url` | Question ID, a string of digits. Example: `55043447`. |
| `url` | text | give exactly one of `id`, `url` | Web link to the question. Example: `https://zhihu.com/question/55043447`. Full link: `https://zhihu.com/question/55043447`. |
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
| `lang` | text | Language of the text. | `standard` | Not provided here |
| `published_at` | time | When it was published. | `compact` | Yes |
| `author` | object | Author. | `compact` | Yes |
| `author.id` | text | Author's account ID. | `compact` | Yes |
| `author.username` | text | Author's handle. | `compact` | Yes |
| `author.name` | text | Author's display name. | `compact` | Yes |
| `author.avatar_url` | link | Author's avatar. | `standard` | Yes |
| `author.verified` | yes/no | Whether the author is verified. | `standard` | Not provided here |
| `author.followers` | integer | Author's follower count. | `standard` | Yes |
| `metrics` | object | Engagement counts. | `compact` | Yes |
| `metrics.likes` | integer | Likes. On this platform: Upvotes. | `compact` | Yes |
| `metrics.comments` | integer | Comments. | `compact` | Yes |
| `metrics.shares` | integer | Shares. | `compact` | The platform has none |
| `metrics.favorites` | integer | Saves. | `compact` | Yes |
| `metrics.views` | integer | Views. | `compact` | Not provided here |
| `metrics.reposts` | integer | Reposts. | `compact` | The platform has none |
| `images` | list of link | Image addresses. | `standard` | Not provided here |
| `hashtags` | list of text | Hashtags, without the #. | `standard` | The platform has none |
| `mentions` | list of object | Accounts mentioned in the text. | `standard` | Not provided here |
| `mentions[].id` | text | Account ID. | `standard` | Not provided here |
| `mentions[].username` | text | Handle. | `standard` | Not provided here |
| `mentions[].name` | text | Display name. | `standard` | Not provided here |
| `is_pinned` | yes/no | Whether the author pinned it. | `standard` | Not provided here |
| `post_id` | text | ID of the thread's root post when this is a reply; otherwise null. | `compact` | Yes |
| `parent_id` | text | ID of the item it replies to directly; otherwise null. | `compact` | Yes |
| `root_id` | text | ID of the first-level reply its thread hangs under. | `compact` | The platform has none |
| `approximate` | list of object | Which numbers of this item are approximate or lower bounds; absent when all are exact. | `compact` | Yes |
| `approximate[].field` | text | Path of the field, such as metrics.views. | `compact` | Yes |
| `approximate[].kind` | text | Approximate, or a lower bound. Values: `approximate`, `lower_bound`. | `compact` | Yes |

A field with no value on an item is `null`. A field this endpoint cannot give is left out and listed in `meta.unavailable`.

Typical size of one item: `compact` 1.8 KB, `standard` 4.4 KB, `full` 4.4 KB (measured on the response recorded 2026-10-12 19:18 UTC).

## Paging

20 items a page. The page size is the platform's; `limit` is not accepted.

Everything comes in one page; no cursor is issued.

## When you are charged

| Case | Charged |
| --- | --- |
| A result with data | $0.0020, once per call |
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
curl -G "https://api.dataxapi.com/v1/zhihu/questions/answers/list" \
  --data-urlencode "id=55043447" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.zhihu.questions.answers.list(id="55043447")
print(result["data"]["items"])
```

### TypeScript

```typescript
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.zhihu.questions.answers.list({ id: "55043447" });
console.log(result.data.items);
```

### CLI

```bash
dataxapi call zhihu.questions.answers.list id=55043447
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

Add this to your MCP client, then ask your agent to call `zhihu.questions.answers.list`.

## Responses

### 200

From a response recorded 2026-10-12 19:18 UTC. Names, text and IDs are examples, and so are the links: none is the recorded one (the page shows no one's personal data); the figures are as recorded. Long lists are cut. The request ID, cursor and balance are made up.

Size as sent: 84.3 KB in the standard view (35.4 KB compact, 84.3 KB full).

```jsonc
{
  "code": "ok",
  "request_id": "c2cb7ef3-9556-40a0-972e-f9fbc9adc683",
  "data": {
    "items": [
      {
        "id": "3612004169",
        "url": "https://www.zhihu.com/answer/3612004169",
        "type": "text",
        "title": "周末露营入门指南：一篇讲清楚",
        "text": "周末露营｜第一次尝试就爱上了，清单放评论区",
        "published_at": "2017-01-23T02:28:14.000Z",
        "author": {
          "id": "f0065006fdb4498cad8c271c2752c668",
          "username": "aya_living",
          "name": "认真生活的阿雅",
          "avatar_url": "https://picx.zhimg.com/v2-514ec9961cf32ad9a5ba_l.jpg",
          "followers": 3641
        },
        "metrics": { "likes": 228, "comments": 34, "favorites": 698 },
        "post_id": "3675879886",
        "parent_id": "3901580217"
      },
      // … 18 more
    ]
  },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 19
  },
  "warnings": [
    { "code": "items_dropped", "count": 1 }
  ],
  "meta": {
    "capability": "zhihu.questions.answers.list",
    "result_status": "complete",
    "fetched_at": "2026-10-12T19:18:39.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "lang": "capability",
      "author.verified": "capability",
      "metrics.shares": "platform",
      "metrics.views": "capability",
      "metrics.reposts": "platform",
      "images": "capability",
      "hashtags": "platform",
      "mentions": "capability",
      "is_pinned": "capability",
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

From a recording of 2026-10-12 19:18 UTC, edited by hand to show this case. The request ID and balance are made up.

Size as sent: 661 B in the standard view (661 B compact, 661 B full).

```jsonc
{
  "code": "ok",
  "request_id": "769403f1-5443-475b-a4a2-f91119d02524",
  "data": { "items": [] },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 0
  },
  "warnings": [],
  "meta": {
    "capability": "zhihu.questions.answers.list",
    "result_status": "empty",
    "fetched_at": "2026-10-12T19:18:39.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "lang": "capability",
      "author.verified": "capability",
      "metrics.shares": "platform",
      "metrics.views": "capability",
      "metrics.reposts": "platform",
      "images": "capability",
      "hashtags": "platform",
      "mentions": "capability",
      "is_pinned": "capability",
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

### 400

An example written to the specification, not a recorded response.

```json
{
  "code": "invalid_params",
  "request_id": "b648a4b1-07a2-4006-ab95-66ad8a120584",
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
  "request_id": "780fb832-216c-40d1-ac03-4b0f63353f35",
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
  "request_id": "e97278ac-be92-4d67-9377-7aa4e3a6a484",
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
  "request_id": "82998b6c-e622-40b2-9a46-de5348f5a793",
  "message": "The data source failed",
  "message_zh": "数据来源出错",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

[This example as a JSON file](https://dataxapi.com/apis/zhihu/questions/answers/list.example.json)

## Use it in your AI

`dataxapi setup` gives the agents on your machine (Claude Code, Codex, Cursor) the DataXAPI MCP server and the base skill. The key is read from DATAXAPI_API_KEY; none is written into a file.

MCP server: `https://api.dataxapi.com/mcp`. The entry for your client is under MCP in the request examples of this page; then ask your agent to call `zhihu.questions.answers.list`.

Or paste this to any AI:

> Read https://dataxapi.com/apis/zhihu/questions/answers/list.md and help me use the DataXAPI endpoint zhihu.questions.answers.list (Zhihu question answers).

[Open in ChatGPT](https://chatgpt.com/?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fzhihu%2Fquestions%2Fanswers%2Flist.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20zhihu.questions.answers.list%20%28Zhihu%20question%20answers%29.) · [Open in Claude](https://claude.ai/new?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fzhihu%2Fquestions%2Fanswers%2Flist.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20zhihu.questions.answers.list%20%28Zhihu%20question%20answers%29.)

## Related

Part of DataXAPI's Social media data. The same key also works for: Creators, Ads, E-commerce.

More Social media data on other platforms: [Douyin hashtag videos](https://dataxapi.com/apis/douyin/hashtags/videos/list/), [Bilibili user videos](https://dataxapi.com/apis/bilibili/users/videos/list/), [Bilibili video detail](https://dataxapi.com/apis/bilibili/videos/get/), [Bilibili video search](https://dataxapi.com/apis/bilibili/videos/search/), [Bilibili popular videos](https://dataxapi.com/apis/bilibili/videos/trending/), [Douyin trend-index creator top videos](https://dataxapi.com/apis/douyin/index/creators/videos/list/), [Douyin trend-index keyword hot videos](https://dataxapi.com/apis/douyin/index/videos/search/), [Douyin user videos](https://dataxapi.com/apis/douyin/users/videos/list/), [Douyin video detail](https://dataxapi.com/apis/douyin/videos/get/), [Douyin video play count](https://dataxapi.com/apis/douyin/videos/metrics/), [Douyin related videos](https://dataxapi.com/apis/douyin/videos/related/), [Douyin video search](https://dataxapi.com/apis/douyin/videos/search/), [Douyin trending videos](https://dataxapi.com/apis/douyin/videos/trending/), [Kuaishou user videos](https://dataxapi.com/apis/kuaishou/users/videos/list/), [Kuaishou video detail](https://dataxapi.com/apis/kuaishou/videos/get/)

Zhihu endpoints: [Zhihu answer comments](https://dataxapi.com/apis/zhihu/answers/comments/list/), [Zhihu answer detail](https://dataxapi.com/apis/zhihu/answers/get/), [Zhihu article detail](https://dataxapi.com/apis/zhihu/articles/get/), [Zhihu column articles](https://dataxapi.com/apis/zhihu/columns/articles/list/), [Zhihu comment replies](https://dataxapi.com/apis/zhihu/comments/replies/list/), [Zhihu pin detail](https://dataxapi.com/apis/zhihu/pins/get/), [Zhihu content search](https://dataxapi.com/apis/zhihu/posts/search/), [Zhihu question answers](https://dataxapi.com/apis/zhihu/questions/answers/list/), [Zhihu question detail](https://dataxapi.com/apis/zhihu/questions/get/), [Zhihu hot list](https://dataxapi.com/apis/zhihu/trends/list/), [Zhihu user answers](https://dataxapi.com/apis/zhihu/users/answers/list/), [Zhihu user articles](https://dataxapi.com/apis/zhihu/users/articles/list/), [Zhihu user followers](https://dataxapi.com/apis/zhihu/users/followers/list/), [Zhihu user profile](https://dataxapi.com/apis/zhihu/users/get/), [Zhihu user pins](https://dataxapi.com/apis/zhihu/users/pins/list/), [Zhihu user search](https://dataxapi.com/apis/zhihu/users/search/)

Related: [All Zhihu endpoints](https://dataxapi.com/apis/zhihu/), [Social media data](https://dataxapi.com/categories/social/), [The post object's fields](https://dataxapi.com/docs/objects/post/)

## Questions

### How much does the Zhihu question answers API cost?

$0.0020 per call. The most one call can cost is $0.0020.

### When am I not charged?

Errors, timeouts and objects that do not exist are not charged; an empty result is charged $0.0020.

### How many items does one call return, and how do I get the next page?

20 items a page. The page size is the platform's; limit is not accepted. Everything comes in one page; no cursor is issued.

### What happens if the object does not exist?

The answer is 404 not_found and nothing is charged. reason says which: not_found (it does not exist) or private_or_deleted.

---

Last checked 2026-10-18 19:59 UTC. Catalog revision c48ce454ae6c4c65. [HTML version](https://dataxapi.com/apis/zhihu/questions/answers/list/)
