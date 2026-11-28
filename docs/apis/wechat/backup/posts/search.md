# WeChat Search articles and videos (backup) API

The backup of wechat.posts.search: the same parameters and result, priced on its own. Videos come without saves. About 20 items a call, 30 at most; $0.1 per call. Errors and timeouts are not charged.

- Endpoint: `GET https://api.dataxapi.com/v1/wechat/backup/posts/search`
- ID: `wechat.backup.posts.search`
- Also known as: search wechat backup
- Price: $0.1 / call
- Live status is not on this page, which is a snapshot. Read it with `GET https://api.dataxapi.com/v1/catalog/status`
- Returns: up to 30 a page, a page, with a cursor for the next
- Returns the standard post object, the same on every platform
- [Run it in the Playground](https://dataxapi.com/console/playground/?capability=wechat.backup.posts.search&params=%7B%22query%22%3A%22%E5%92%96%E5%95%A1%E5%BA%97%E5%BC%80%E4%B8%9A%22%7D)
- In Chinese: [微信搜一搜综合搜索（备用版）API](https://dataxapi.com/zh/apis/wechat/backup/posts/search/)

## What you get

The first 3 rows of a response recorded 2026-10-29 09:53 UTC.

| Field | Value |
| --- | --- |
| type | video |
| published_at | 2026-10-27 03:24 UTC |
| metrics.likes | 22 |

## Parameters

| Parameter | Type | required | Description |
| --- | --- | --- | --- |
| `query` | text | Yes | Search terms. Example: `咖啡店开业`. |
| `sort` | text |  | By relevance, by time published (newest first) or by how hot. Values: `relevance` (default), `latest`, `popular`. Example: `relevance`. |
| `published_within` | text |  | Only those published in the last day, week or half year. Values: `day`, `week`, `half_year`. Example: `week`. |
| `type` | text |  | Official Account articles only (article) or Channels videos only (video); both mixed when left out. Values: `article`, `video`. Example: `article`. |
| `cursor` | text |  | Cursor returned by the previous page. Pass `page.next_cursor` of the page before, unchanged. Each page is charged as a call of its own. |
| `view` | text |  | How much of each item to return. All three cost the same. Values: `compact`, `standard` (default), `full`. |
| `fields` | list of text |  | Return only these fields. Each by its path, such as `author.name`. |

## Returned fields

`data.items` is a list of post objects. Stable: fields are only ever added.

Three views: `compact` (the most used fields, long text cut short), `standard` (the default: every standard field) and `full` (adds `ext`, the platform's own fields). A field is in the view named and in every larger one.

| Field | Type | Description | From view | This endpoint |
| --- | --- | --- | --- | --- |
| `id` | text | ID; pass it unchanged to the get endpoint. On this platform: An article: made of the __biz, mid and idx of its long link, the same as the Official Account article list gives, and an article is fetched by its url; a video: the encrypted ID WeChat Search gives it (starting with export/), as given, not the numeric ID the Channels video endpoint takes, and not promised to be the same for the same video in a later search. | `compact` | Yes |
| `url` | link | Link that opens the post. On this platform: The article's link; a Channels video has no web link, so null. | `compact` | Yes |
| `type` | text | Content format. Values: `video`, `image`, `text`, `article`. | `compact` | Yes |
| `title` | text | Title. On this platform: The article's title, without the keyword highlighting; a video has no title apart from its description, so null. | `compact` | Yes |
| `text` | text | Body text. On this platform: An article's digest (not its whole text) or a video's description, without the keyword highlighting. Long text: the compact view keeps the first 500 characters and says so in `warnings`. | `compact` | Yes |
| `lang` | text | Language of the text. | `standard` | Not provided here |
| `published_at` | time | When it was published. | `compact` | Yes |
| `author` | object | Author. | `compact` | Yes |
| `author.id` | text | Author's account ID. | `compact` | Not provided here |
| `author.username` | text | Author's handle. | `compact` | Not provided here |
| `author.name` | text | Author's display name. On this platform: The name of the Official Account or Channels account; WeChat Search gives no account ID. | `compact` | Yes |
| `author.avatar_url` | link | Author's avatar. On this platform: The Channels account's avatar; an article's result has none, so null. | `standard` | Yes |
| `author.verified` | yes/no | Whether the author is verified. | `standard` | Not provided here |
| `author.followers` | integer | Author's follower count. | `standard` | Not provided here |
| `metrics` | object | Engagement counts. | `compact` | Yes |
| `metrics.likes` | integer | Likes. On this platform: The likes a video's card shows, one written like 1.4万 approximate and 10万+ a lower bound, null when the card shows no count; an article's result has no likes, so null (some article cards show a band of reads: ext.reads_label). | `compact` | Yes |
| `metrics.comments` | integer | Comments. | `compact` | Not provided here |
| `metrics.shares` | integer | Shares. | `compact` | Not provided here |
| `metrics.favorites` | integer | Saves. | `compact` | Not provided here |
| `metrics.views` | integer | Views. | `compact` | Not provided here |
| `metrics.reposts` | integer | Reposts. | `compact` | Not provided here |
| `images` | list of link | Image addresses. | `standard` | Not provided here |
| `hashtags` | list of text | Hashtags, without the #. | `standard` | Not provided here |
| `mentions` | list of object | Accounts mentioned in the text. | `standard` | Not provided here |
| `mentions[].id` | text | Account ID. | `standard` | Not provided here |
| `mentions[].username` | text | Handle. | `standard` | Not provided here |
| `mentions[].name` | text | Display name. | `standard` | Not provided here |
| `is_pinned` | yes/no | Whether the author pinned it. | `standard` | Not provided here |
| `post_id` | text | ID of the thread's root post when this is a reply; otherwise null. | `compact` | The platform has none |
| `parent_id` | text | ID of the item it replies to directly; otherwise null. | `compact` | The platform has none |
| `root_id` | text | ID of the first-level reply its thread hangs under. | `compact` | The platform has none |
| `ext.duration` | number | Length of the video, in seconds; null for an article. | `full` | Yes |
| `ext.cover_url` | link | Cover image: a video's cover or an article's header image. | `full` | Yes |
| `ext.reads_label` | text | The band of reads an article's card shows, in the platform's words, such as 阅读 N万+ (reads N0k+): a band, not an exact count; null where the card shows none, and for a video. | `full` | Yes |
| `approximate` | list of object | Which numbers of this item are approximate or lower bounds; absent when all are exact. | `compact` | Yes |
| `approximate[].field` | text | Path of the field, such as metrics.views. | `compact` | Yes |
| `approximate[].kind` | text | Approximate, or a lower bound. Values: `approximate`, `lower_bound`. | `compact` | Yes |

A field with no value on an item is `null`. A field this endpoint cannot give is left out and listed in `meta.unavailable`.

Typical size of one item: `compact` 572 B, `standard` 682 B, `full` 1.0 KB (measured on the response recorded 2026-10-29 09:53 UTC).

## Paging

About 20 items a page, 30 at most. The page size is the platform's; `limit` is not accepted.

For the next page pass `page.next_cursor` as `cursor`; a cursor is valid for 1 hour. `page.has_more` is false on the last page.

## When you are charged

| Case | Charged |
| --- | --- |
| A result with data | $0.1, once per call |
| Each further page | charged as a call of its own |
| Invalid parameters, a failure or a timeout | not charged |
| The most one call can cost | $0.1 (send `X-Max-Price` to refuse anything above your own limit) |

Prices as read 2026-11-28 06:28 UTC, under price book 30, in effect since 2026-11-28 04:43 UTC; the Playground reads the price in force before a run.

## Errors

Every error has the same structure: `code`, `message`, `charged`, `retry`, `retry_after_seconds`, `param`, `docs_url`.

This is a backup version: the same parameters and fields as the original, at its own price. The original is the one to call first: [WeChat Search articles and videos API](https://dataxapi.com/apis/wechat/posts/search/)

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
curl -G "https://api.dataxapi.com/v1/wechat/backup/posts/search" \
  --data-urlencode "query=咖啡店开业" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
# pip install dataxapi
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.wechat.backup.posts.search(query="咖啡店开业")
print(result["data"]["items"])
```

### TypeScript

```typescript
// npm i @dataxapi/sdk
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.wechat.backup.posts.search({ query: "咖啡店开业" });
console.log(result.data.items);
```

### CLI

```bash
dataxapi call wechat.backup.posts.search 'query=咖啡店开业'
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

Add this to your MCP client, then ask your agent to call `wechat.backup.posts.search`.

## Responses

### 200

From a response recorded 2026-10-29 09:53 UTC. Names, text and IDs are examples, and so are the links: none is the recorded one (the page shows no one's personal data); the figures are as recorded. Long lists are cut. The request ID, cursor and balance are made up.

Size as sent: 13.5 KB in the standard view (11.5 KB compact, 20.6 KB full).

```jsonc
{
  "code": "ok",
  "request_id": "7b818f16-8ee4-4efb-bcf0-44e533c075f4",
  "data": {
    "items": [
      {
        "id": "1019201022230064",
        "url": null,
        "type": "video",
        "title": null,
        "text": "咖啡店开业｜第一次尝试就爱上了，清单放评论区",
        "published_at": "2026-10-27T03:24:23.000Z",
        "author": {
          "name": "橘子汽水不加冰",
          "avatar_url": "https://wx.qlogo.cn/mmhead/oDPqGongfeaX1nIr5P08bWxMtxRrLlkqyu3l9TTX/132"
        },
        "metrics": { "likes": 22 }
      },
      // … 18 more
    ]
  },
  "page": {
    "next_cursor": "c1.mfSb-r-6po9iu-2lkexCsvDCDgeMXPtZ68U2OZwY",
    "cursor_expires_at": "2026-10-29T10:53:59.000Z",
    "has_more": true,
    "returned": 19
  },
  "warnings": [],
  "meta": {
    "capability": "wechat.backup.posts.search",
    "result_status": "complete",
    "fetched_at": "2026-10-29T09:53:59.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "lang": "capability",
      "author.id": "capability",
      "author.username": "capability",
      "author.verified": "capability",
      "author.followers": "capability",
      "metrics.comments": "capability",
      "metrics.shares": "capability",
      "metrics.views": "capability",
      "metrics.reposts": "capability",
      "images": "capability",
      "hashtags": "capability",
      "mentions": "capability",
      "is_pinned": "capability",
      "post_id": "platform",
      "parent_id": "platform",
      "root_id": "platform",
      "metrics.favorites": "capability"
    },
    "billing": {
      "amount": "0.1",
      "currency": "USD",
      "balance_after": "9.9"
    }
  }
}
```

### Empty

From a recording of 2026-10-29 09:53 UTC, edited by hand to show this case. The request ID and balance are made up.

Size as sent: 862 B in the standard view (862 B compact, 862 B full).

```jsonc
{
  "code": "ok",
  "request_id": "180526c2-d4b1-4aba-b0ce-2e35fab3412e",
  "data": { "items": [] },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 0
  },
  "warnings": [],
  "meta": {
    "capability": "wechat.backup.posts.search",
    "result_status": "empty",
    "fetched_at": "2026-10-29T09:53:59.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "lang": "capability",
      "author.id": "capability",
      "author.username": "capability",
      "author.verified": "capability",
      "author.followers": "capability",
      "metrics.comments": "capability",
      "metrics.shares": "capability",
      "metrics.views": "capability",
      "metrics.reposts": "capability",
      "images": "capability",
      "hashtags": "capability",
      "mentions": "capability",
      "is_pinned": "capability",
      "post_id": "platform",
      "parent_id": "platform",
      "root_id": "platform",
      "metrics.favorites": "capability"
    },
    "billing": {
      "amount": "0.1",
      "currency": "USD",
      "balance_after": "9.9"
    }
  }
}
```

### 400

An example written to the specification, not a recorded response.

```json
{
  "code": "invalid_params",
  "request_id": "64caf1ae-531e-4d11-811b-06df81ffe4d6",
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
  "request_id": "063ff74e-88ec-4cd4-b92c-3e5193b3417a",
  "message": "The balance is too low",
  "message_zh": "余额不足",
  "charged": false,
  "retry": "after_fix",
  "retry_after_seconds": null,
  "param": null,
  "required": "0.1",
  "available": "0",
  "top_up_url": "https://dataxapi.com/console/billing/?amount=10",
  "next_step": "The balance does not cover this call ($0.1). Top up at top_up_url: $10 at least, about 100 calls at this price; Alipay or a card, and the balance never expires. Then send the same request again, unchanged. Nothing was charged for this one.",
  "next_step_zh": "余额不够这次调用（$0.1）。到 top_up_url 充值：最低 $10，按这次的价格约够 100 次；支付宝、银行卡都能付，余额不过期。到账后把同一个请求原样再发一次。这次没有扣钱。",
  "docs_url": "https://dataxapi.com/docs/errors#insufficient_balance"
}
```

### 502

An example written to the specification, not a recorded response.

```json
{
  "code": "upstream_failed",
  "request_id": "c57d1430-bc02-417c-9bb2-a4c96264b2f2",
  "message": "No result came back this time and nothing was charged; retry shortly",
  "message_zh": "这次没有取到结果，没有扣费，可以稍后重试",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

This recorded response is 25k tokens as the platform's own JSON, 5,477 as DataXAPI's JSON, and 4,290 as an AI reads it through DataXAPI's MCP server: 83% fewer (counted 2026-11-06).

[This example as a JSON file](https://dataxapi.com/apis/wechat/backup/posts/search.example.json)

## Use it in your AI

`dataxapi setup` gives the agents on your machine (Claude Code, Codex, Cursor) the DataXAPI MCP server and the base skill. The key is read from DATAXAPI_API_KEY; none is written into a file.

MCP server: `https://api.dataxapi.com/mcp`. The entry for your client is under MCP in the request examples of this page; then ask your agent to call `wechat.backup.posts.search`.

Or paste this to any AI:

> Read https://dataxapi.com/apis/wechat/backup/posts/search.md and help me use the DataXAPI endpoint wechat.backup.posts.search (WeChat Search articles and videos (backup)).

[Open in ChatGPT](https://chatgpt.com/?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fwechat%2Fbackup%2Fposts%2Fsearch.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20wechat.backup.posts.search%20%28WeChat%20Search%20articles%20and%20videos%20%28backup%29%29.) · [Open in Claude](https://claude.ai/new?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fwechat%2Fbackup%2Fposts%2Fsearch.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20wechat.backup.posts.search%20%28WeChat%20Search%20articles%20and%20videos%20%28backup%29%29.)

## Related

Part of DataXAPI's Social media data. The same key also works for: Creators, Ads, E-commerce.

The same thing on other platforms: [Bilibili video search](https://dataxapi.com/apis/bilibili/videos/search/), [Douyin video search](https://dataxapi.com/apis/douyin/videos/search/), [Kuaishou video search](https://dataxapi.com/apis/kuaishou/videos/search/), [LinkedIn post search](https://dataxapi.com/apis/linkedin/posts/search/), [Threads post search](https://dataxapi.com/apis/threads/posts/search/), [TikTok video search](https://dataxapi.com/apis/tiktok/videos/search/), [Weibo realtime search](https://dataxapi.com/apis/weibo/posts/search/), [X post search](https://dataxapi.com/apis/x/posts/search/), [Xiaohongshu note search](https://dataxapi.com/apis/xiaohongshu/notes/search/), [YouTube video search](https://dataxapi.com/apis/youtube/videos/search/), [WeChat Channels video search](https://dataxapi.com/apis/wechat_channels/videos/search/), [WeChat Search articles and videos](https://dataxapi.com/apis/wechat/posts/search/), [WeChat Channels video search (backup)](https://dataxapi.com/apis/wechat_channels/backup/videos/search/), [Reddit post search](https://dataxapi.com/apis/reddit/posts/search/), [Zhihu content search](https://dataxapi.com/apis/zhihu/posts/search/), [Pinterest pin search](https://dataxapi.com/apis/pinterest/pins/search/), [Douyin video search (backup)](https://dataxapi.com/apis/douyin/backup/videos/search/)

More Social media data on other platforms: [Douyin hashtag videos](https://dataxapi.com/apis/douyin/hashtags/videos/list/), [Bilibili user videos](https://dataxapi.com/apis/bilibili/users/videos/list/), [Bilibili video detail](https://dataxapi.com/apis/bilibili/videos/get/), [Bilibili popular videos](https://dataxapi.com/apis/bilibili/videos/trending/), [Douyin trend-index creator top videos](https://dataxapi.com/apis/douyin/index/creators/videos/list/), [Douyin trend-index keyword hot videos](https://dataxapi.com/apis/douyin/index/videos/search/), [Douyin user videos](https://dataxapi.com/apis/douyin/users/videos/list/), [Douyin video detail](https://dataxapi.com/apis/douyin/videos/get/), [Douyin video play count](https://dataxapi.com/apis/douyin/videos/metrics/)

WeChat Search endpoints: [WeChat Search articles and videos](https://dataxapi.com/apis/wechat/posts/search/), [WeChat Search articles and videos (backup)](https://dataxapi.com/apis/wechat/backup/posts/search/), [WeChat Official Account live search](https://dataxapi.com/apis/wechat/accounts/search/), [WeChat Index](https://dataxapi.com/apis/wechat/index/keywords/history/), [WeChat Search suggestions](https://dataxapi.com/apis/wechat/keywords/related/), [WeChat mini program search](https://dataxapi.com/apis/wechat/miniprograms/search/)

How-to guides and answers: [What WeChat data APIs are there? Official Accounts, Channels and WeChat Search (2026)](https://dataxapi.com/answers/wechat-data-apis/)

Related: [All WeChat Search endpoints](https://dataxapi.com/apis/wechat/), [Social media data](https://dataxapi.com/categories/social/), [The same thing on 15 platforms, side by side](https://dataxapi.com/roles/posts-search/), [The post object's fields](https://dataxapi.com/docs/objects/post/)

## Questions

### How much does the WeChat Search articles and videos (backup) API cost?

$0.1 per call. The most one call can cost is $0.1.

### When am I not charged?

Errors and timeouts are not charged.

### How many items does one call return, and how do I get the next page?

About 20 items a page, 30 at most. The page size is the platform's; limit is not accepted. For the next page pass page.next_cursor as cursor; a cursor is valid for 1 hour. page.has_more is false on the last page.

---

Last checked 2026-11-28 06:28 UTC. Catalog revision ceced48b38f71468. [HTML version](https://dataxapi.com/apis/wechat/backup/posts/search/)
