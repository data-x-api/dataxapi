# Bilibili video detail API

Get one Bilibili video by BV number or link: title, description, uploader, views, likes, coins, saves, danmaku count, length, tags, section, IP location, and the cid that subtitles and danmaku are asked for by. One object a call; $0.0020 per call. Errors and timeouts are not charged.

- Endpoint: `GET https://api.dataxapi.com/v1/bilibili/videos/get`
- ID: `bilibili.videos.get`
- Also known as: bilibili video stats
- Price: $0.0020 / call
- Live status is not on this page, which is a snapshot. Read it with `GET https://api.dataxapi.com/v1/catalog/status`
- Returns: 1 object, one post object
- Returns the standard post object, the same on every platform
- `id` is in the link: `bilibili.com/video/<id>`. Or pass the whole link as `url`.
- [No code: try the Bilibili video lookup by link →](https://dataxapi.com/tools/link-bilibili/)
- [Run it in the Playground](https://dataxapi.com/console/playground/?capability=bilibili.videos.get&params=%7B%22id%22%3A%22BV1ECeJ65EZS%22%7D)
- In Chinese: [B站视频详情 API](https://dataxapi.com/zh/apis/bilibili/videos/get/)

## What you get

The first 8 rows of a response recorded 2026-10-12 18:46 UTC.

| Field | Value |
| --- | --- |
| type | video |
| published_at | 2026-10-09 09:00 UTC |
| author.verified | true |
| author.followers | 18,634,892 |
| metrics.likes | 140,338 |
| metrics.comments | 2,707 |
| metrics.shares | 4,696 |
| metrics.favorites | 20,492 |

## Parameters

| Parameter | Type | required | Description |
| --- | --- | --- | --- |
| `id` | text | give exactly one of `id`, `url` | The video's BV number: 12 characters starting with BV1. Example: `BV1ECeJ65EZS`. |
| `url` | text | give exactly one of `id`, `url` | Link to the video, pasted as it is: the www.bilibili.com/video/BV… page, the phone site's m.bilibili.com/video/BV…, or the b23.tv short link the app copies. A short link is opened once to see which video it leads to. Example: `https://www.bilibili.com/video/BV1ECeJ65EZS`. Full link: `https://www.bilibili.com/video/BV1ECeJ65EZS`. |
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
| `lang` | text | Language of the text. | `standard` | Not provided here |
| `published_at` | time | When it was published. | `compact` | Yes |
| `author` | object | Author. | `compact` | Yes |
| `author.id` | text | Author's account ID. | `compact` | Yes |
| `author.username` | text | Author's handle. | `compact` | Not provided here |
| `author.name` | text | Author's display name. | `compact` | Yes |
| `author.avatar_url` | link | Author's avatar. | `standard` | Yes |
| `author.verified` | yes/no | Whether the author is verified. | `standard` | Yes |
| `author.followers` | integer | Author's follower count. | `standard` | Yes |
| `metrics` | object | Engagement counts. | `compact` | Yes |
| `metrics.likes` | integer | Likes. | `compact` | Yes |
| `metrics.comments` | integer | Comments. | `compact` | Yes |
| `metrics.shares` | integer | Shares. | `compact` | Yes |
| `metrics.favorites` | integer | Saves. | `compact` | Yes |
| `metrics.views` | integer | Views. | `compact` | Yes |
| `metrics.reposts` | integer | Reposts. | `compact` | The platform has none |
| `images` | list of link | Image addresses. | `standard` | The platform has none |
| `hashtags` | list of text | Hashtags, without the #. On this platform: The tags shown under the video on its page. | `standard` | Yes |
| `mentions` | list of object | Accounts mentioned in the text. | `standard` | Not provided here |
| `mentions[].id` | text | Account ID. | `standard` | Not provided here |
| `mentions[].username` | text | Handle. | `standard` | Not provided here |
| `mentions[].name` | text | Display name. | `standard` | Not provided here |
| `is_pinned` | yes/no | Whether the author pinned it. | `standard` | Not provided here |
| `post_id` | text | ID of the thread's root post when this is a reply; otherwise null. | `compact` | The platform has none |
| `parent_id` | text | ID of the item it replies to directly; otherwise null. | `compact` | The platform has none |
| `root_id` | text | ID of the first-level reply its thread hangs under. | `compact` | The platform has none |
| `ext.aid` | text | The video's other number (its av number); it names the same video as the BV number. | `full` | Yes |
| `ext.coins` | integer | Coins given. | `full` | Yes |
| `ext.danmaku` | integer | Number of danmaku (comments shown over the video). | `full` | Yes |
| `ext.duration` | number | Length of the video, in seconds. | `full` | Yes |
| `ext.cover_url` | link | Address of the cover image. | `full` | Yes |
| `ext.category` | text | The section the video is filed under, in the platform's words (数码, 美食制作, say). | `full` | Yes |
| `ext.ip_location` | text | IP location as the platform shows it. | `full` | Yes |
| `ext.cid` | text | The number of the video's first part (cid): what subtitles and danmaku are asked for by, with the BV number. | `full` | Yes |
| `ext.parts` | integer | How many parts the video has. | `full` | Yes |
| `approximate` | list of object | Which numbers of this item are approximate or lower bounds; absent when all are exact. | `compact` | Yes |
| `approximate[].field` | text | Path of the field, such as metrics.views. | `compact` | Yes |
| `approximate[].kind` | text | Approximate, or a lower bound. Values: `approximate`, `lower_bound`. | `compact` | Yes |

A field with no value on an item is `null`. A field this endpoint cannot give is left out and listed in `meta.unavailable`.

Typical size of one item: `compact` 660 B, `standard` 883 B, `full` 1.1 KB (measured on the response recorded 2026-10-12 18:46 UTC).

## Paging

One object per call: there is nothing to page.

## When you are charged

| Case | Charged |
| --- | --- |
| A result with data | $0.0020, once per call |
| Invalid parameters, a failure or a timeout | not charged |
| The most one call can cost | $0.0020 (send `X-Max-Price` to refuse anything above your own limit) |

Prices as read 2026-11-21 08:32 UTC, under price book 19, in effect since 2026-11-17 18:04 UTC; the Playground reads the price in force before a run.

## If the object does not exist

The answer is 404 `not_found`. `charged` and `amount` in the body say what this one cost. `reason` says which: `not_found` (it does not exist) or `private_or_deleted`.

## Errors

Every error has the same structure: `code`, `message`, `charged`, `retry`, `retry_after_seconds`, `param`, `docs_url`.

| HTTP | Code | Meaning | Charged | Retry |
| --- | --- | --- | --- | --- |
| 400 | `invalid_params` | A parameter is invalid | As the answer's charged field says | After a fix |
| 400 | `request_not_served` | This combination of parameters cannot be served at present | No | After a fix |
| 400 | `max_price_exceeded` | The most this call could cost is above the limit you set | No | After a fix |
| 401 | `unauthorized` | No credential was sent, or it is invalid, disabled or expired | No | No |
| 402 | `insufficient_balance` | The balance is too low | No | After a fix |
| 402 | `key_budget_exceeded` | This key's spending limit does not cover the call | No | After a fix |
| 402 | `run_budget_exceeded` | This run's amount or call limit does not cover the call | No | No |
| 403 | `account_suspended` | The account is suspended | No | No |
| 403 | `forbidden` | This credential may not use that option | No | No |
| 403 | `key_scope_denied` | This key may not call this endpoint | No | No |
| 404 | `not_found` | The object does not exist, is private or was deleted | As the answer's charged field says | No |
| 404 | `run_not_found` | No run under this run ID | No | No |
| 409 | `call_in_progress` | The call under this idempotency key is still running; ask again with the same key shortly | No | With the same idempotency key |
| 409 | `idempotency_conflict` | This idempotency key was used for a different request | No | After a fix |
| 410 | `run_expired` | This run has expired and starts no more calls | No | No |
| 429 | `rate_limited` | Too many requests, or too many calls in progress | No | Yes |
| 429 | `cost_cap_exceeded` | This account's allowance for today is used up | No | Yes |
| 429 | `uncharged_cost_limit` | Too many of this account's calls today returned nothing and were not charged; endpoints of this kind can be called again tomorrow (UTC) | No | Yes |
| 500 | `settlement_unknown` | Whether this call settled is not known; ask again with the same idempotency key, or look it up by request ID | Unknown: look the call up | With the same idempotency key |
| 500 | `internal_error` | The service failed | No | Yes |
| 502 | `upstream_failed` | No result came back this time and nothing was charged; retry shortly | No | Yes |
| 503 | `upstream_busy` | Busy just now; retry shortly | No | Yes |
| 503 | `capability_paused` | This endpoint is paused | No | Yes |
| 503 | `overloaded` | The service is busy; retry shortly | No | Yes |
| 504 | `timeout` | The data did not arrive in time; retry with the same idempotency key | No | Yes |

[All error codes](https://dataxapi.com/docs/errors/)

## Request

The key is read from the environment; no key is ever written into a page.

### cURL

```bash
curl -G "https://api.dataxapi.com/v1/bilibili/videos/get" \
  --data-urlencode "id=BV1ECeJ65EZS" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
# pip install dataxapi
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.bilibili.videos.get(id="BV1ECeJ65EZS")
print(result["data"]["item"])
```

### TypeScript

```typescript
// npm i @dataxapi/sdk
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.bilibili.videos.get({ id: "BV1ECeJ65EZS" });
console.log(result.data.item);
```

### CLI

```bash
dataxapi call bilibili.videos.get id=BV1ECeJ65EZS
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

Add this to your MCP client, then ask your agent to call `bilibili.videos.get`.

## Responses

### 200

From a response recorded 2026-10-12 18:46 UTC. Names, text and IDs are examples, and so are the links: none is the recorded one (the page shows no one's personal data); the figures are as recorded. Long lists are cut. The request ID, cursor and balance are made up.

Size as sent: 1.4 KB in the standard view (1.2 KB compact, 1.6 KB full).

```jsonc
{
  "code": "ok",
  "request_id": "11fcd89e-b517-43a9-895d-474472dc0ce3",
  "data": {
    "item": {
      "id": "BV1Ac6KEgXUP",
      "url": "https://www.bilibili.com/video/BV1Ac6KEgXUP",
      "type": "video",
      "title": "周末露营入门指南：一篇讲清楚",
      "text": "把周末露营从头到尾讲清楚，看完少走弯路",
      "published_at": "2026-10-09T09:00:00.000Z",
      "author": {
        "id": "496575523",
        "name": "山野咖啡馆",
        "avatar_url": "https://i0.hdslb.com/bfs/face/407bad434152049ca8c90286.jpg",
        "verified": true,
        "followers": 18634892
      },
      "metrics": {
        "likes": 140338,
        "comments": 2707,
        "shares": 4696,
        "favorites": 20492,
        "views": 2166787
      },
      "hashtags": [
        "好物分享",
        "周末露营",
        // … 7 more
      ]
    }
  },
  "warnings": [],
  "meta": {
    "capability": "bilibili.videos.get",
    "result_status": "complete",
    "fetched_at": "2026-10-12T18:46:25.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "lang": "capability",
      "author.username": "capability",
      "metrics.reposts": "platform",
      "images": "platform",
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

### 400

An example written to the specification, not a recorded response.

```json
{
  "code": "invalid_params",
  "request_id": "1a53b13a-5681-4db0-b736-fdd8070b0364",
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
  "request_id": "7b2d44ba-b37c-4049-84e5-35fa64dc6fd3",
  "message": "The balance is too low",
  "message_zh": "余额不足",
  "charged": false,
  "retry": "after_fix",
  "retry_after_seconds": null,
  "param": null,
  "required": "0.002",
  "available": "0",
  "top_up_url": "https://dataxapi.com/console/billing/?amount=10",
  "next_step": "The balance does not cover this call ($0.002). Top up at top_up_url: $10 at least, about 5,000 calls at this price; Alipay or a card, and the balance never expires. Then send the same request again, unchanged. Nothing was charged for this one.",
  "next_step_zh": "余额不够这次调用（$0.002）。到 top_up_url 充值：最低 $10，按这次的价格约够 5,000 次；支付宝、银行卡都能付，余额不过期。到账后把同一个请求原样再发一次。这次没有扣钱。",
  "docs_url": "https://dataxapi.com/docs/errors#insufficient_balance"
}
```

### 404

An example written to the specification, not a recorded response.

```json
{
  "code": "not_found",
  "request_id": "83cc8e9f-a332-420b-8890-5a5028c1f09a",
  "message": "The object does not exist, is private or was deleted",
  "message_zh": "对象不存在、私密或已删除",
  "charged": true,
  "amount": "0.002",
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
  "request_id": "72ea1918-b29b-44c4-9db8-8588b268f1e2",
  "message": "No result came back this time and nothing was charged; retry shortly",
  "message_zh": "这次没有取到结果，没有扣费，可以稍后重试",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

This recorded response is 73k tokens as the platform's own JSON, 398 as DataXAPI's JSON, and 279 as an AI reads it through DataXAPI's MCP server: 100% fewer (counted 2026-11-06).

[This example as a JSON file](https://dataxapi.com/apis/bilibili/videos/get.example.json)

## Use it in your AI

`dataxapi setup` gives the agents on your machine (Claude Code, Codex, Cursor) the DataXAPI MCP server and the base skill. The key is read from DATAXAPI_API_KEY; none is written into a file.

MCP server: `https://api.dataxapi.com/mcp`. The entry for your client is under MCP in the request examples of this page; then ask your agent to call `bilibili.videos.get`.

Or paste this to any AI:

> Read https://dataxapi.com/apis/bilibili/videos/get.md and help me use the DataXAPI endpoint bilibili.videos.get (Bilibili video detail).

[Open in ChatGPT](https://chatgpt.com/?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fbilibili%2Fvideos%2Fget.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20bilibili.videos.get%20%28Bilibili%20video%20detail%29.) · [Open in Claude](https://claude.ai/new?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fbilibili%2Fvideos%2Fget.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20bilibili.videos.get%20%28Bilibili%20video%20detail%29.)

## Related

Part of DataXAPI's Social media data. The same key also works for: Creators, Ads, E-commerce.

The same thing on other platforms: [Douyin video detail](https://dataxapi.com/apis/douyin/videos/get/), [Kuaishou video detail](https://dataxapi.com/apis/kuaishou/videos/get/), [Telegram message detail](https://dataxapi.com/apis/telegram/messages/get/), [X post detail](https://dataxapi.com/apis/x/posts/get/), [Facebook post detail](https://dataxapi.com/apis/facebook/posts/get/), [LinkedIn post detail](https://dataxapi.com/apis/linkedin/posts/get/), [Threads post detail](https://dataxapi.com/apis/threads/posts/get/), [Instagram post detail](https://dataxapi.com/apis/instagram/posts/get/), [TikTok video detail](https://dataxapi.com/apis/tiktok/videos/get/), [Weibo post detail](https://dataxapi.com/apis/weibo/posts/get/), [Xiaohongshu note detail](https://dataxapi.com/apis/xiaohongshu/notes/get/), [YouTube video detail](https://dataxapi.com/apis/youtube/videos/get/), [WeChat Channels video detail](https://dataxapi.com/apis/wechat_channels/videos/get/), [WeChat Official Account article detail](https://dataxapi.com/apis/wechat_mp/articles/get/), [Reddit post detail](https://dataxapi.com/apis/reddit/posts/get/), [Zhihu answer detail](https://dataxapi.com/apis/zhihu/answers/get/), [Zhihu article detail](https://dataxapi.com/apis/zhihu/articles/get/), [Zhihu pin detail](https://dataxapi.com/apis/zhihu/pins/get/), [Zhihu question detail](https://dataxapi.com/apis/zhihu/questions/get/), [Pinterest pin detail](https://dataxapi.com/apis/pinterest/pins/get/)

More Social media data on other platforms: [Douyin hashtag videos](https://dataxapi.com/apis/douyin/hashtags/videos/list/), [Douyin trend-index creator top videos](https://dataxapi.com/apis/douyin/index/creators/videos/list/)

Bilibili endpoints: [Bilibili comment replies](https://dataxapi.com/apis/bilibili/comments/replies/list/), [Bilibili hot searches](https://dataxapi.com/apis/bilibili/trends/list/), [Bilibili user profile](https://dataxapi.com/apis/bilibili/users/get/), [Bilibili user videos](https://dataxapi.com/apis/bilibili/users/videos/list/), [Bilibili video comments](https://dataxapi.com/apis/bilibili/videos/comments/list/), [Bilibili video detail](https://dataxapi.com/apis/bilibili/videos/get/), [Bilibili video search](https://dataxapi.com/apis/bilibili/videos/search/), [Bilibili popular videos](https://dataxapi.com/apis/bilibili/videos/trending/), [Bilibili user videos (backup)](https://dataxapi.com/apis/bilibili/backup/users/videos/list/)

How-to guides and answers: [What are Bilibili's 412 error and wbi? (2026)](https://dataxapi.com/answers/bilibili-412-wbi/), [How do I export Bilibili comments in bulk? (2026)](https://dataxapi.com/answers/export-bilibili-comments/), [What does Bilibili's -352 error mean? (2026)](https://dataxapi.com/answers/bilibili-352-risk-control/), [What does Bilibili's API校验密匙错误 (code -3) mean? (2026)](https://dataxapi.com/answers/bilibili-api-key-error-minus-3/), [Bilibili API: videos, comments and uploader data (2026)](https://dataxapi.com/answers/bilibili-data-apis/), [What are Bilibili BV ids, aids and mids? (2026)](https://dataxapi.com/answers/bilibili-bv-aid-mid/), [Chinese social media data API FAQ, platform by platform (2026)](https://dataxapi.com/answers/social-media-data-api-faq/), [Bilibili API for AI agents and LLMs: fewer tokens, called from Claude and Cursor (2026)](https://dataxapi.com/answers/bilibili-api-for-ai-agents/), [Bilibili video comments, newest first, by API (2026)](https://dataxapi.com/answers/bilibili-comments-newest-first/), [How to read the IP location of accounts and comments in bulk: 28 endpoints on 8 platforms (2026)](https://dataxapi.com/answers/ip-location-by-platform/)

Skills that use this endpoint: [Breaking down a hit](https://dataxapi.com/skills/viral/)

Tools built on this endpoint: [Bilibili video lookup by link: look it up (sign-in)](https://dataxapi.com/tools/link-bilibili/)

Related: [All Bilibili endpoints](https://dataxapi.com/apis/bilibili/), [Social media data](https://dataxapi.com/categories/social/), [The same thing on 18 platforms, side by side](https://dataxapi.com/roles/posts-get/), [The post object's fields](https://dataxapi.com/docs/objects/post/)

## Questions

### How much does the Bilibili video detail API cost?

$0.0020 per call. The most one call can cost is $0.0020.

### When am I not charged?

Errors and timeouts are not charged.

### What happens if the object does not exist?

The answer is 404 not_found. charged and amount in the body say what this one cost. reason says which: not_found (it does not exist) or private_or_deleted.

---

Last checked 2026-11-21 08:32 UTC. Catalog revision 720fc3ea8dadb865. [HTML version](https://dataxapi.com/apis/bilibili/videos/get/)
