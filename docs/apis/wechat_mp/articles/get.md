# WeChat Official Account article detail API

Get one WeChat Official Account article by its link: title, text, time published, the account's name and IDs. One object a call; $0.0200 per call. Errors, timeouts and objects that do not exist are not charged.

- Endpoint: `GET https://api.dataxapi.com/v1/wechat_mp/articles/get`
- ID: `wechat_mp.articles.get`
- Also known as: wechat article, mp article detail
- Price: $0.0200 / call
- Live status is not on this page, which is a snapshot. Read it with `GET https://api.dataxapi.com/v1/catalog/status`
- Returns: 1 object, one post object
- Returns the standard post object, the same on every platform
- [Run it in the Playground](https://dataxapi.com/console/playground/?capability=wechat_mp.articles.get&params=%7B%22url%22%3A%22https%3A%2F%2Fmp.weixin.qq.com%2Fs%3F__biz%3DMjM5MjAxNDM4MA%3D%3D%26mid%3D2667038683%26idx%3D1%26sn%3D0422127e651acd7f6cf6ef7e1cff04bc%22%7D)
- In Chinese: [微信公众号文章详情 API](https://dataxapi.com/zh/apis/wechat_mp/articles/get/)

## What you get

The first 2 rows of a response recorded 2026-10-12 19:03 UTC.

| Field | Value |
| --- | --- |
| type | article |
| published_at | 2026-10-10 09:13 UTC |

## Parameters

| Parameter | Type | required | Description |
| --- | --- | --- | --- |
| `url` | text | Yes | Link to the article: the long link with __biz, mid, idx and sn, or the short /s/ link. Example: `https://mp.weixin.qq.com/s?__biz=MjM5MjAxNDM4MA==&mid=2667038683&idx=1&sn=0422127e651acd7f6cf6ef7e1cff04bc`. Full link: `https://mp.weixin.qq.com/s?__biz=MjM5MjAxNDM4MA==&mid=2667038683&idx=1&sn=0422127e651acd7f6cf6ef7e1cff04bc`. Short link: `https://mp.weixin.qq.com/s/TSNQKkRpN1qbKsT7BvzqIw`. The link has to be opened to learn what it points at, so the result cannot be checked against it. |
| `view` | text |  | How much of each item to return. All three cost the same. Values: `compact`, `standard` (default), `full`. |
| `fields` | list of text |  | Return only these fields. Each by its path, such as `author.name`. |

## Returned fields

`data.item` is one post object. Stable: fields are only ever added.

Three views: `compact` (the most used fields, long text cut short), `standard` (the default: every standard field) and `full` (adds `ext`, the platform's own fields). A field is in the view named and in every larger one.

| Field | Type | Description | From view | This endpoint |
| --- | --- | --- | --- | --- |
| `id` | text | ID; pass it unchanged to the get endpoint. On this platform: Made of the __biz, mid and idx of the article's long link; an article is fetched by its url, not by this. | `compact` | Yes |
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
| `author.followers` | integer | Author's follower count. | `standard` | Not provided here |
| `metrics` | object | Engagement counts. | `compact` | Not provided here |
| `metrics.likes` | integer | Likes. | `compact` | Not provided here |
| `metrics.comments` | integer | Comments. | `compact` | Not provided here |
| `metrics.shares` | integer | Shares. | `compact` | Not provided here |
| `metrics.favorites` | integer | Saves. | `compact` | Not provided here |
| `metrics.views` | integer | Views. | `compact` | Not provided here |
| `metrics.reposts` | integer | Reposts. | `compact` | Not provided here |
| `images` | list of link | Image addresses. | `standard` | Not provided here |
| `hashtags` | list of text | Hashtags, without the #. | `standard` | The platform has none |
| `mentions` | list of object | Accounts mentioned in the text. | `standard` | The platform has none |
| `mentions[].id` | text | Account ID. | `standard` | The platform has none |
| `mentions[].username` | text | Handle. | `standard` | The platform has none |
| `mentions[].name` | text | Display name. | `standard` | The platform has none |
| `is_pinned` | yes/no | Whether the author pinned it. | `standard` | Not provided here |
| `post_id` | text | ID of the thread's root post when this is a reply; otherwise null. | `compact` | The platform has none |
| `parent_id` | text | ID of the item it replies to directly; otherwise null. | `compact` | The platform has none |
| `root_id` | text | ID of the first-level reply its thread hangs under. | `compact` | The platform has none |
| `approximate` | list of object | Which numbers of this item are approximate or lower bounds; absent when all are exact. | `compact` | Yes |
| `approximate[].field` | text | Path of the field, such as metrics.views. | `compact` | Yes |
| `approximate[].kind` | text | Approximate, or a lower bound. Values: `approximate`, `lower_bound`. | `compact` | Yes |

A field with no value on an item is `null`. A field this endpoint cannot give is left out and listed in `meta.unavailable`.

Typical size of one item: `compact` 1.7 KB, `standard` 2.3 KB, `full` 2.3 KB (measured on the response recorded 2026-10-12 19:03 UTC).

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
curl -G "https://api.dataxapi.com/v1/wechat_mp/articles/get" \
  --data-urlencode "url=https://mp.weixin.qq.com/s?__biz=MjM5MjAxNDM4MA==&mid=2667038683&idx=1&sn=0422127e651acd7f6cf6ef7e1cff04bc" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.wechat_mp.articles.get(url="https://mp.weixin.qq.com/s?__biz=MjM5MjAxNDM4MA==&mid=2667038683&idx=1&sn=0422127e651acd7f6cf6ef7e1cff04bc")
print(result["data"]["item"])
```

### TypeScript

```typescript
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.wechat_mp.articles.get({ url: "https://mp.weixin.qq.com/s?__biz=MjM5MjAxNDM4MA==&mid=2667038683&idx=1&sn=0422127e651acd7f6cf6ef7e1cff04bc" });
console.log(result.data.item);
```

### CLI

```bash
dataxapi call wechat_mp.articles.get 'url=https://mp.weixin.qq.com/s?__biz=MjM5MjAxNDM4MA==&mid=2667038683&idx=1&sn=0422127e651acd7f6cf6ef7e1cff04bc'
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

Add this to your MCP client, then ask your agent to call `wechat_mp.articles.get`.

## Responses

### 200

From a response recorded 2026-10-12 19:03 UTC. Names, text and IDs are examples, and so are the links: none is the recorded one (the page shows no one's personal data); the figures are as recorded. Long lists are cut. The request ID, cursor and balance are made up.

Size as sent: 2.9 KB in the standard view (2.4 KB compact, 2.9 KB full).

```jsonc
{
  "code": "ok",
  "request_id": "ea6d90ba-c743-4de0-b6ee-bf22a76e2d0f",
  "data": {
    "item": {
      "id": "2667741100_1",
      "url": "https://mp.weixin.qq.com/s/FeLlyCmjO-KbG27_xPHWlw",
      "type": "article",
      "title": "周末露营入门指南：一篇讲清楚",
      "text": "周末露营这件事，越简单越好",
      "published_at": "2026-10-10T09:13:21.000Z",
      "author": {
        "id": "gh_fd3bca9a4315",
        "username": "aya_living",
        "name": "认真生活的阿雅",
        "avatar_url": "https://wx.qlogo.cn/mmhead/TP60gpehOQj0c0q4rzcuTqqksajtafmfdf2AzWc3/132"
      }
    }
  },
  "warnings": [],
  "meta": {
    "capability": "wechat_mp.articles.get",
    "result_status": "complete",
    "fetched_at": "2026-10-12T19:03:48.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "lang": "capability",
      "author.verified": "capability",
      "author.followers": "capability",
      "metrics": "capability",
      "images": "capability",
      "hashtags": "platform",
      "mentions": "platform",
      "is_pinned": "capability",
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
  "request_id": "ae4060c0-4f7a-47c0-8970-8b65ac2789a5",
  "message": "A parameter is invalid",
  "message_zh": "参数不合法",
  "charged": false,
  "retry": "after_fix",
  "retry_after_seconds": null,
  "param": null,
  "problems": ["url is required"],
  "docs_url": "https://dataxapi.com/docs/errors#invalid_params"
}
```

### 402

An example written to the specification, not a recorded response.

```json
{
  "code": "insufficient_balance",
  "request_id": "eb360808-e604-49b2-85e3-1b60cb43d869",
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
  "request_id": "4cea47e8-21a1-4bc0-b1ee-2cb91ccf433b",
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
  "request_id": "7e042692-264e-4765-b6c8-4087522e0646",
  "message": "The data source failed",
  "message_zh": "数据来源出错",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

[This example as a JSON file](https://dataxapi.com/apis/wechat_mp/articles/get.example.json)

## Use it in your AI

`dataxapi setup` gives the agents on your machine (Claude Code, Codex, Cursor) the DataXAPI MCP server and the base skill. The key is read from DATAXAPI_API_KEY; none is written into a file.

MCP server: `https://api.dataxapi.com/mcp`. The entry for your client is under MCP in the request examples of this page; then ask your agent to call `wechat_mp.articles.get`.

Or paste this to any AI:

> Read https://dataxapi.com/apis/wechat_mp/articles/get.md and help me use the DataXAPI endpoint wechat_mp.articles.get (WeChat Official Account article detail).

[Open in ChatGPT](https://chatgpt.com/?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fwechat_mp%2Farticles%2Fget.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20wechat_mp.articles.get%20%28WeChat%20Official%20Account%20article%20detail%29.) · [Open in Claude](https://claude.ai/new?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fwechat_mp%2Farticles%2Fget.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20wechat_mp.articles.get%20%28WeChat%20Official%20Account%20article%20detail%29.)

## Related

Part of DataXAPI's Social media data. The same key also works for: Creators, Ads, E-commerce.

The same thing on other platforms: [Bilibili video detail](https://dataxapi.com/apis/bilibili/videos/get/), [Douyin video detail](https://dataxapi.com/apis/douyin/videos/get/), [Kuaishou video detail](https://dataxapi.com/apis/kuaishou/videos/get/), [Telegram message detail](https://dataxapi.com/apis/telegram/messages/get/), [X post detail](https://dataxapi.com/apis/x/posts/get/), [Facebook post detail](https://dataxapi.com/apis/facebook/posts/get/), [LinkedIn post detail](https://dataxapi.com/apis/linkedin/posts/get/), [Threads post detail](https://dataxapi.com/apis/threads/posts/get/), [Instagram post detail](https://dataxapi.com/apis/instagram/posts/get/), [TikTok video detail](https://dataxapi.com/apis/tiktok/videos/get/), [Weibo post detail](https://dataxapi.com/apis/weibo/posts/get/), [Xiaohongshu note detail](https://dataxapi.com/apis/xiaohongshu/notes/get/), [YouTube video detail](https://dataxapi.com/apis/youtube/videos/get/), [WeChat Channels video detail](https://dataxapi.com/apis/wechat_channels/videos/get/), [Reddit post detail](https://dataxapi.com/apis/reddit/posts/get/), [Zhihu answer detail](https://dataxapi.com/apis/zhihu/answers/get/), [Zhihu article detail](https://dataxapi.com/apis/zhihu/articles/get/), [Zhihu pin detail](https://dataxapi.com/apis/zhihu/pins/get/), [Zhihu question detail](https://dataxapi.com/apis/zhihu/questions/get/), [Pinterest pin detail](https://dataxapi.com/apis/pinterest/pins/get/)

More Social media data on other platforms: [Douyin hashtag videos](https://dataxapi.com/apis/douyin/hashtags/videos/list/), [Bilibili user videos](https://dataxapi.com/apis/bilibili/users/videos/list/), [Bilibili video search](https://dataxapi.com/apis/bilibili/videos/search/), [Bilibili popular videos](https://dataxapi.com/apis/bilibili/videos/trending/), [Douyin trend-index creator top videos](https://dataxapi.com/apis/douyin/index/creators/videos/list/)

WeChat Official Accounts endpoints: [WeChat Official Account articles](https://dataxapi.com/apis/wechat_mp/accounts/articles/list/), [WeChat Official Account profile](https://dataxapi.com/apis/wechat_mp/accounts/get/), [WeChat Official Account article comments](https://dataxapi.com/apis/wechat_mp/articles/comments/list/), [WeChat Official Account article detail](https://dataxapi.com/apis/wechat_mp/articles/get/), [WeChat Official Account article stats](https://dataxapi.com/apis/wechat_mp/articles/metrics/), [WeChat Official Account comment replies](https://dataxapi.com/apis/wechat_mp/comments/replies/list/)

How-to guides and answers: [How to list a WeChat Official Account's past articles](https://dataxapi.com/guides/wechat-official-account-articles/), [Is there an API for WeChat Official Account articles?](https://dataxapi.com/answers/is-there-an-api-for-wechat-official-account-articles/)

Skills that use this endpoint: [Breaking down a hit](https://dataxapi.com/skills/viral/)

Related: [All WeChat Official Accounts endpoints](https://dataxapi.com/apis/wechat_mp/), [Social media data](https://dataxapi.com/categories/social/), [The same thing on 18 platforms, side by side](https://dataxapi.com/roles/posts-get/), [The post object's fields](https://dataxapi.com/docs/objects/post/)

## Questions

### How much does the WeChat Official Account article detail API cost?

$0.0200 per call. The most one call can cost is $0.0200.

### When am I not charged?

Errors, timeouts and objects that do not exist are not charged.

### What happens if the object does not exist?

The answer is 404 not_found and nothing is charged. reason says which: not_found (it does not exist) or private_or_deleted.

---

Last checked 2026-10-18 19:59 UTC. Catalog revision c48ce454ae6c4c65. [HTML version](https://dataxapi.com/apis/wechat_mp/articles/get/)
