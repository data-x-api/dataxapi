# Douyin video comments API

Get a page of comments on a Douyin video: text, commenter, likes, reply count, time posted. Up to 20 items a call; $0.0020 per call. Errors and timeouts are not charged.

- Endpoint: `GET https://api.dataxapi.com/v1/douyin/videos/comments/list`
- ID: `douyin.videos.comments.list`
- Also known as: douyin comment list
- Price: $0.0020 / call
- Live status is not on this page, which is a snapshot. Read it with `GET https://api.dataxapi.com/v1/catalog/status`
- Returns: 20 a page, a page, with a cursor for the next
- Returns the standard comment object, the same on every platform
- `id` is in the link: `douyin.com/video/<id>`. Or pass the whole link as `url`.
- [Run it in the Playground](https://dataxapi.com/console/playground/?capability=douyin.videos.comments.list&params=%7B%22id%22%3A%227694940173372575014%22%7D)
- In Chinese: [抖音视频评论 API](https://dataxapi.com/zh/apis/douyin/videos/comments/list/)

## What you get

The first 3 rows of a response recorded 2026-10-16 18:31 UTC.

| Field | Value |
| --- | --- |
| published_at | 2026-10-10 07:45 UTC |
| metrics.likes | 11,209 |
| metrics.comments | 1 |

## Parameters

| Parameter | Type | required | Description |
| --- | --- | --- | --- |
| `id` | text | give exactly one of `id`, `url` | Video ID, a string of digits. With only a link or a share text, give it as url. Example: `7694940173372575014`. |
| `url` | text | give exactly one of `id`, `url` | Link to the video, pasted as it is: the https://www.douyin.com/video/… web link, a web link with modal_id in it, the page a share opens on a phone, the v.douyin.com short link the app copies, or a whole share text with one of these in it. A short link is opened once to see which video it leads to. Example: `https://www.douyin.com/video/7694940173372575014`. Full link: `https://www.douyin.com/video/7694940173372575014`. Share text with a link inside: `7.69 复制打开抖音，看看【示例的作品】 https://www.douyin.com/video/7694940173372575014 复制此链接，打开Dou音搜索，直接观看视频！`. |
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
| `metrics.comments` | integer | Replies. | `compact` | Yes |
| `post_id` | text | ID of the post it is under. | `compact` | Yes |
| `parent_id` | text | ID of the comment it replies to directly; null for a top-level comment. | `compact` | Yes |
| `root_id` | text | ID of the top-level comment of its thread; null for a top-level comment. | `compact` | Yes |
| `ext.ip_location` | text | IP location as the platform shows it. | `full` | Yes |
| `approximate` | list of object | Which numbers of this item are approximate or lower bounds; absent when all are exact. | `compact` | Yes |
| `approximate[].field` | text | Path of the field, such as metrics.views. | `compact` | Yes |
| `approximate[].kind` | text | Approximate, or a lower bound. Values: `approximate`, `lower_bound`. | `compact` | Yes |

A field with no value on an item is `null`. A field this endpoint cannot give is left out and listed in `meta.unavailable`.

Typical size of one item: `compact` 365 B, `standard` 521 B, `full` 553 B (measured on the response recorded 2026-10-16 18:31 UTC).

## Paging

20 items a page. The page size is the platform's; `limit` is not accepted.

For the next page pass `page.next_cursor` as `cursor`; a cursor is valid for 1 hour. `page.has_more` is false on the last page.

## When you are charged

| Case | Charged |
| --- | --- |
| A result with data | $0.0020, once per call |
| Each further page | charged as a call of its own |
| Invalid parameters, a failure or a timeout | not charged |
| The most one call can cost | $0.0020 (send `X-Max-Price` to refuse anything above your own limit) |

Prices as read 2026-11-28 06:28 UTC, under price book 30, in effect since 2026-11-28 04:43 UTC; the Playground reads the price in force before a run.

## If the object does not exist

A video that does not exist cannot be told from a video without comments: both return an empty result, not a 404.

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
| 502 | `upstream_failed` | No result came back this time and nothing was charged; retry shortly | No | Yes |
| 502 | `cursor_unavailable` | This cursor is unavailable just now; retry later or start again from the first page | No | Yes |
| 503 | `upstream_busy` | Busy just now; retry shortly | No | Yes |
| 503 | `capability_paused` | This endpoint is paused | No | Yes |
| 503 | `overloaded` | The service is busy; retry shortly | No | Yes |
| 504 | `timeout` | The data did not arrive in time; retry with the same idempotency key | No | Yes |

[All error codes](https://dataxapi.com/docs/errors/)

## Request

The key is read from the environment; no key is ever written into a page.

### cURL

```bash
curl -G "https://api.dataxapi.com/v1/douyin/videos/comments/list" \
  --data-urlencode "id=7694940173372575014" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
# pip install dataxapi
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.douyin.videos.comments.list(id="7694940173372575014")
print(result["data"]["items"])
```

### TypeScript

```typescript
// npm i @dataxapi/sdk
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.douyin.videos.comments.list({ id: "7694940173372575014" });
console.log(result.data.items);
```

### CLI

```bash
dataxapi call douyin.videos.comments.list id=7694940173372575014
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

Add this to your MCP client, then ask your agent to call `douyin.videos.comments.list`.

## Responses

### 200

From a response recorded 2026-10-16 18:31 UTC. Names, text and IDs are examples, and so are the links: none is the recorded one (the page shows no one's personal data); the figures are as recorded. Long lists are cut. The request ID, cursor and balance are made up.

Size as sent: 10.6 KB in the standard view (7.6 KB compact, 11.2 KB full).

```jsonc
{
  "code": "ok",
  "request_id": "d42da88d-b7ed-4b0d-9190-4b171bfc73ad",
  "data": {
    "items": [
      {
        "id": "7544703737319021316",
        "text": "拍得好舒服，看了好几遍",
        "published_at": "2026-10-10T07:45:43.000Z",
        "author": {
          "id": "MS4wLjABAAAASYaIbhAX0MPyFQ_-aWJ7QWUFF8a5fMOppwdnFl0eOFd",
          "username": "nanfeng_0721",
          "name": "南边的风",
          "avatar_url": "https://p3-pc.douyinpic.com/aweme/100x100/aweme-avatar/tos-cn-avt-0015_ec3a5fcd08ca5afb5397.jpeg"
        },
        "metrics": { "likes": 11209, "comments": 1 },
        "post_id": "7654977487690830406",
        "parent_id": null,
        "root_id": null
      },
      // … 19 more
    ]
  },
  "page": {
    "next_cursor": "c1.WJBi7NXZjb_3e9vNCUTP2jkcLJBy9Nk7njwbaUrK",
    "cursor_expires_at": "2026-10-16T19:31:05.000Z",
    "has_more": true,
    "returned": 20
  },
  "warnings": [],
  "meta": {
    "capability": "douyin.videos.comments.list",
    "result_status": "complete",
    "fetched_at": "2026-10-16T18:31:05.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": { "url": "platform" },
    "billing": {
      "amount": "0.002",
      "currency": "USD",
      "balance_after": "9.998"
    }
  }
}
```

### Empty

From a response recorded 2026-10-16 18:31 UTC. The request ID and balance are made up.

Size as sent: 426 B in the standard view (426 B compact, 426 B full).

```jsonc
{
  "code": "ok",
  "request_id": "a7aca082-536c-4bb4-bd39-6212e8499c00",
  "data": { "items": [] },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 0
  },
  "warnings": [],
  "meta": {
    "capability": "douyin.videos.comments.list",
    "result_status": "empty",
    "fetched_at": "2026-10-16T18:31:31.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": { "url": "platform" },
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
  "request_id": "ce62b803-7e36-4875-ad86-c744b3393e88",
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
  "request_id": "5bdb6d4c-f90e-4a94-affd-0a2d2697798d",
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

### 502

An example written to the specification, not a recorded response.

```json
{
  "code": "upstream_failed",
  "request_id": "6c715717-f66c-4f79-bb30-df7c5bab8aad",
  "message": "No result came back this time and nothing was charged; retry shortly",
  "message_zh": "这次没有取到结果，没有扣费，可以稍后重试",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

This recorded response is 23k tokens as the platform's own JSON, 4,403 as DataXAPI's JSON, and 2,978 as an AI reads it through DataXAPI's MCP server: 87% fewer (counted 2026-11-06).

[This example as a JSON file](https://dataxapi.com/apis/douyin/videos/comments/list.example.json)

## Use it in your AI

`dataxapi setup` gives the agents on your machine (Claude Code, Codex, Cursor) the DataXAPI MCP server and the base skill. The key is read from DATAXAPI_API_KEY; none is written into a file.

MCP server: `https://api.dataxapi.com/mcp`. The entry for your client is under MCP in the request examples of this page; then ask your agent to call `douyin.videos.comments.list`.

Or paste this to any AI:

> Read https://dataxapi.com/apis/douyin/videos/comments/list.md and help me use the DataXAPI endpoint douyin.videos.comments.list (Douyin video comments).

[Open in ChatGPT](https://chatgpt.com/?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fdouyin%2Fvideos%2Fcomments%2Flist.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20douyin.videos.comments.list%20%28Douyin%20video%20comments%29.) · [Open in Claude](https://claude.ai/new?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fdouyin%2Fvideos%2Fcomments%2Flist.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20douyin.videos.comments.list%20%28Douyin%20video%20comments%29.)

## Related

Part of DataXAPI's Social media data. The same key also works for: Creators, Ads, E-commerce.

The same thing on other platforms: [Bilibili video comments](https://dataxapi.com/apis/bilibili/videos/comments/list/), [Kuaishou video comments](https://dataxapi.com/apis/kuaishou/videos/comments/list/), [Facebook post comments](https://dataxapi.com/apis/facebook/posts/comments/list/), [Instagram post comments](https://dataxapi.com/apis/instagram/posts/comments/list/), [TikTok video comments](https://dataxapi.com/apis/tiktok/videos/comments/list/), [Weibo post comments](https://dataxapi.com/apis/weibo/posts/comments/list/), [X post replies](https://dataxapi.com/apis/x/posts/replies/list/), [Xiaohongshu note comments](https://dataxapi.com/apis/xiaohongshu/notes/comments/list/), [YouTube video comments](https://dataxapi.com/apis/youtube/videos/comments/list/), [WeChat Channels video comments](https://dataxapi.com/apis/wechat_channels/videos/comments/list/), [Reddit post comments](https://dataxapi.com/apis/reddit/posts/comments/list/), [Zhihu answer comments](https://dataxapi.com/apis/zhihu/answers/comments/list/)

Douyin endpoints: [Douyin comment replies](https://dataxapi.com/apis/douyin/comments/replies/list/), [Douyin hashtag videos](https://dataxapi.com/apis/douyin/hashtags/videos/list/), [Douyin hot search board](https://dataxapi.com/apis/douyin/trends/list/), [Douyin user profile](https://dataxapi.com/apis/douyin/users/get/), [Douyin creator engagement and follower trends](https://dataxapi.com/apis/douyin/users/history/), [Douyin user search](https://dataxapi.com/apis/douyin/users/search/), [Douyin user videos](https://dataxapi.com/apis/douyin/users/videos/list/), [Douyin video comments](https://dataxapi.com/apis/douyin/videos/comments/list/), [Douyin video detail](https://dataxapi.com/apis/douyin/videos/get/), [Douyin video transcript (video to text)](https://dataxapi.com/apis/douyin/videos/transcript/get/), [Douyin video play count](https://dataxapi.com/apis/douyin/videos/metrics/), [Douyin related videos](https://dataxapi.com/apis/douyin/videos/related/), [Douyin video search](https://dataxapi.com/apis/douyin/videos/search/), [Douyin trending videos](https://dataxapi.com/apis/douyin/videos/trending/), [Douyin search suggestions](https://dataxapi.com/apis/douyin/keywords/related/), [Douyin video downloader, no watermark](https://dataxapi.com/apis/douyin/videos/media/get/), [Douyin music detail](https://dataxapi.com/apis/douyin/music/get/), [Douyin user videos (backup)](https://dataxapi.com/apis/douyin/backup/users/videos/list/), [Douyin video search (backup)](https://dataxapi.com/apis/douyin/backup/videos/search/)

Douyin trend-index endpoints: [Douyin trend-index brand trends](https://dataxapi.com/apis/douyin/index/brands/history/), [Douyin trend-index brand comparison](https://dataxapi.com/apis/douyin/index/brands/metrics/), [Douyin trend-index creator top videos](https://dataxapi.com/apis/douyin/index/creators/videos/list/), [Douyin trend-index creator follower profile](https://dataxapi.com/apis/douyin/index/creators/audience/get/), [Douyin trend-index creator core metrics](https://dataxapi.com/apis/douyin/index/creators/metrics/), [Douyin trend-index keyword audience](https://dataxapi.com/apis/douyin/index/keywords/audience/get/), [Douyin trend-index keyword trends](https://dataxapi.com/apis/douyin/index/keywords/history/), [Douyin trend-index related keywords](https://dataxapi.com/apis/douyin/index/keywords/related/), [Douyin trend-index live hot topics](https://dataxapi.com/apis/douyin/index/trends/list/), [Douyin trend-index keyword hot videos](https://dataxapi.com/apis/douyin/index/videos/search/)

Douyin Xingtu endpoints: [Douyin Xingtu creator rate card](https://dataxapi.com/apis/douyin/xingtu/creators/rates/get/), [Douyin Xingtu creator search](https://dataxapi.com/apis/douyin/xingtu/creators/search/), [Douyin Xingtu creator profile](https://dataxapi.com/apis/douyin/xingtu/creators/get/), [Douyin Xingtu creator audience](https://dataxapi.com/apis/douyin/xingtu/creators/audience/get/), [Douyin Xingtu creator metrics](https://dataxapi.com/apis/douyin/xingtu/creators/metrics/), [Douyin Xingtu creator video performance](https://dataxapi.com/apis/douyin/xingtu/creators/videos/list/), [Douyin Xingtu creator content keywords](https://dataxapi.com/apis/douyin/xingtu/creators/keywords/get/), [Douyin Xingtu creator index scores](https://dataxapi.com/apis/douyin/xingtu/creators/scores/get/), [Douyin Xingtu creator content mix](https://dataxapi.com/apis/douyin/xingtu/creators/content_mix/get/), [Douyin Xingtu creator conversion](https://dataxapi.com/apis/douyin/xingtu/creators/conversion/get/), [Douyin Xingtu marketing calendar](https://dataxapi.com/apis/douyin/xingtu/campaigns/list/), [Douyin Xingtu video report: plays and completion rate](https://dataxapi.com/apis/douyin/xingtu/videos/get/), [Douyin Xingtu creator audience (backup)](https://dataxapi.com/apis/douyin/xingtu/backup/creators/audience/get/)

How-to guides and answers: [How to export Douyin video comments in bulk](https://dataxapi.com/guides/douyin-video-comments/), [Does Douyin have an API? Get videos and comments with Python (2026)](https://dataxapi.com/guides/douyin-api-python/), [How do I export Douyin data?](https://dataxapi.com/answers/export-douyin-data/), [What are aweme_id and modal_id on Douyin, and what is a v.douyin.com link?](https://dataxapi.com/answers/douyin-aweme-id-modal-id/), [Can Douyin's open platform read other people's videos and comments? (2026)](https://dataxapi.com/answers/douyin-open-platform-api/), [How do I add a Xiaohongshu or Douyin Skill to my AI? (2026)](https://dataxapi.com/answers/xiaohongshu-douyin-skill/), [How do I export Douyin comments in bulk to find what users want? (2026)](https://dataxapi.com/answers/export-douyin-comments-user-needs/), [BettaFish has no data: how do I feed it public Xiaohongshu and Douyin data? (2026)](https://dataxapi.com/answers/bettafish-data-source/), [How do I find Douyin videos that took off from small accounts, and can I pull them in bulk? (2026)](https://dataxapi.com/answers/douyin-low-fan-viral-videos/), [What are a_bogus and X-Bogus on Douyin? (2026)](https://dataxapi.com/answers/douyin-a-bogus-x-bogus/), [What is msToken on Douyin? (2026)](https://dataxapi.com/answers/douyin-mstoken/), [Which Douyin API should I use for search, accounts and comments? (2026)](https://dataxapi.com/answers/which-douyin-api-to-use/), [What is ttwid on Douyin? (2026)](https://dataxapi.com/answers/douyin-ttwid/), [What are verifyFp and s_v_web_id on Douyin? (2026)](https://dataxapi.com/answers/douyin-verifyfp-s-v-web-id/), [Douyin API for developers: third-party Douyin data APIs and what they return (2026)](https://dataxapi.com/answers/douyin-third-party-data-apis/), [China social data MCP for Claude and Cursor: Xiaohongshu, Douyin, WeChat (2026)](https://dataxapi.com/answers/china-social-data-mcp/), [Douyin MCP server for Claude and Cursor (2026)](https://dataxapi.com/answers/douyin-mcp/), [Brand monitoring on Chinese social media: Weibo, Douyin, Xiaohongshu (2026)](https://dataxapi.com/answers/chinese-social-media-brand-monitoring/), [Product reviews and comments from Chinese social media in bulk (2026)](https://dataxapi.com/answers/product-reviews-chinese-social-media/), [Which social media data API is best for AI agents? Count the tokens a response takes (2026)](https://dataxapi.com/answers/social-media-api-for-ai-agents/), [Social media API responses fill the AI's context and burn tokens: what to do](https://dataxapi.com/answers/api-response-too-many-tokens/), [Douyin API for AI agents and LLMs: fewer tokens, called from Claude and Cursor (2026)](https://dataxapi.com/answers/douyin-api-for-ai-agents/)

Skills that use this endpoint: [Comments and word of mouth](https://dataxapi.com/skills/comments/)

Related: [All Douyin endpoints](https://dataxapi.com/apis/douyin/), [Social media data](https://dataxapi.com/categories/social/), [The same thing on 13 platforms, side by side](https://dataxapi.com/roles/posts-comments-list/), [The comment object's fields](https://dataxapi.com/docs/objects/comment/)

## Questions

### How much does the Douyin video comments API cost?

$0.0020 per call. The most one call can cost is $0.0020.

### When am I not charged?

Errors and timeouts are not charged.

### How many items does one call return, and how do I get the next page?

20 items a page. The page size is the platform's; limit is not accepted. For the next page pass page.next_cursor as cursor; a cursor is valid for 1 hour. page.has_more is false on the last page.

### What happens if the object does not exist?

A video that does not exist cannot be told from a video without comments: both return an empty result, not a 404.

---

Last checked 2026-11-28 06:28 UTC. Catalog revision ceced48b38f71468. [HTML version](https://dataxapi.com/apis/douyin/videos/comments/list/)
