# WeChat Official Account low-follower viral articles API

Get the day's list of WeChat Official Account articles read far beyond their account's usual readership, from the last 3, 7 or 30 days, ranked, with reads, likes, recommends, shares, comments and how many times the usual reads they got. Up to 50 items a call; $0.0600 per call. Errors and timeouts are not charged.

- Endpoint: `GET https://api.dataxapi.com/v1/wechat_mp/articles/trending`
- ID: `wechat_mp.articles.trending`
- Also known as: wechat viral articles, wechat low follower viral articles, wechat official account trending articles
- Price: $0.0600 / call
- Live status is not on this page, which is a snapshot. Read it with `GET https://api.dataxapi.com/v1/catalog/status`
- Returns: 50 a page, a page, with a cursor for the next
- Returns the standard post object, the same on every platform
- [Run it in the Playground](https://dataxapi.com/console/playground/?capability=wechat_mp.articles.trending&params=%7B%22until%22%3A%222026-11-27T00%3A00%3A00Z%22%7D)
- In Chinese: [微信公众号低粉爆文榜 API](https://dataxapi.com/zh/apis/wechat_mp/articles/trending/)

## What you get

The first 6 rows of a response recorded 2026-11-28 03:44 UTC.

| Field | Value |
| --- | --- |
| type | article |
| published_at | 2026-11-26 06:30 UTC |
| metrics.likes | 6,066 |
| metrics.comments | 445 |
| metrics.shares | 13,581 |
| metrics.views | 100,001 |

## Parameters

| Parameter | Type | required | Description |
| --- | --- | --- | --- |
| `window` | text |  | Which articles: those published in the 3, 7 or 30 days up to the list's day. Values: `3d`, `7d` (default), `30d`. Example: `7d`. |
| `until` | time |  | Which day's list (China time): the list is made by the day; left out, yesterday's. Some days' lists were not kept, and those are empty. Example: `2026-11-27T00:00:00Z`. |
| `cursor` | text |  | Cursor returned by the previous page. Pass `page.next_cursor` of the page before, unchanged. Each page is charged as a call of its own. |
| `view` | text |  | How much of each item to return. All three cost the same. Values: `compact`, `standard` (default), `full`. |
| `fields` | list of text |  | Return only these fields. Each by its path, such as `author.name`. |

## Returned fields

`data.items` is a list of post objects. Stable: fields are only ever added.

Three views: `compact` (the most used fields, long text cut short), `standard` (the default: every standard field) and `full` (adds `ext`, the platform's own fields). A field is in the view named and in every larger one.

| Field | Type | Description | From view | This endpoint |
| --- | --- | --- | --- | --- |
| `id` | text | ID; pass it unchanged to the get endpoint. On this platform: Made of the __biz, mid and idx of the article's long link; an article is fetched by its url, not by this. | `compact` | Yes |
| `url` | link | Link that opens the post. | `compact` | Yes |
| `type` | text | Content format. Values: `video`, `image`, `text`, `article`. | `compact` | Yes |
| `title` | text | Title. | `compact` | Yes |
| `text` | text | Body text. Long text: the compact view keeps the first 500 characters and says so in `warnings`. | `compact` | Not provided here |
| `lang` | text | Language of the text. | `standard` | Not provided here |
| `published_at` | time | When it was published. | `compact` | Yes |
| `author` | object | Author. | `compact` | Yes |
| `author.id` | text | Author's account ID. | `compact` | Not provided here |
| `author.username` | text | Author's handle. | `compact` | Not provided here |
| `author.name` | text | Author's display name. | `compact` | Yes |
| `author.avatar_url` | link | Author's avatar. | `standard` | Yes |
| `author.verified` | yes/no | Whether the author is verified. | `standard` | Not provided here |
| `author.followers` | integer | Author's follower count. | `standard` | The platform has none |
| `metrics` | object | Engagement counts. | `compact` | Yes |
| `metrics.likes` | integer | Likes. | `compact` | Yes |
| `metrics.comments` | integer | Comments. | `compact` | Yes |
| `metrics.shares` | integer | Shares. | `compact` | Yes |
| `metrics.favorites` | integer | Saves. | `compact` | Not provided here |
| `metrics.views` | integer | Views. On this platform: Reads; above 100,000 the platform says only "100k+", and this is a lower bound. | `compact` | Yes |
| `metrics.reposts` | integer | Reposts. | `compact` | The platform has none |
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
| `ext.rank` | integer | Its place on the list, 1 the first. | `full` | Yes |
| `ext.recommends` | integer | Recommends (formerly "wow"). | `full` | Yes |
| `ext.position` | integer | Its place in the push it went out in: 1 is the lead article, 2 and on the ones below it. | `full` | Yes |
| `ext.account_category` | text | The account's category, in the list's words (教育 education, 汽车 cars, 其他 other, say). | `full` | Yes |
| `ext.usual_reads` | integer | What an article of the account is usually read: the baseline the list computes from its articles of the last 90 days. | `full` | Yes |
| `ext.reads_multiple` | number | How many times its account's usual reads this article got (reads over usual_reads). | `full` | Yes |
| `ext.viral_score` | number | The list's score, from popularity and the multiple of the usual reads; the list is ranked by it, highest first. | `full` | Yes |
| `ext.ip_location` | text | Where the article was posted from, as its page shows it: the province, or the country for one posted from abroad. | `full` | Yes |
| `approximate` | list of object | Which numbers of this item are approximate or lower bounds; absent when all are exact. | `compact` | Yes |
| `approximate[].field` | text | Path of the field, such as metrics.views. | `compact` | Yes |
| `approximate[].kind` | text | Approximate, or a lower bound. Values: `approximate`, `lower_bound`. | `compact` | Yes |

A field with no value on an item is `null`. A field this endpoint cannot give is left out and listed in `meta.unavailable`.

Typical size of one item: `compact` 446 B, `standard` 565 B, `full` 728 B (measured on the response recorded 2026-11-28 03:44 UTC).

## Paging

50 items a page. The page size is the platform's; `limit` is not accepted.

For the next page pass `page.next_cursor` as `cursor`; a cursor is valid for 1 hour. `page.has_more` is false on the last page.

Answers come from a shared snapshot refreshed every 15 minutes; `meta.cached` says so and `meta.fetched_at` is when it was taken.

## When you are charged

| Case | Charged |
| --- | --- |
| A result with data | $0.0600, once per call |
| Each further page | charged as a call of its own |
| Invalid parameters, a failure or a timeout | not charged |
| The most one call can cost | $0.0600 (send `X-Max-Price` to refuse anything above your own limit) |

Prices as read 2026-11-28 06:28 UTC, under price book 30, in effect since 2026-11-28 04:43 UTC; the Playground reads the price in force before a run.

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
curl -G "https://api.dataxapi.com/v1/wechat_mp/articles/trending" \
  --data-urlencode "until=2026-11-27T00:00:00Z" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
# pip install dataxapi
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.wechat_mp.articles.trending(until="2026-11-27T00:00:00Z")
print(result["data"]["items"])
```

### TypeScript

```typescript
// npm i @dataxapi/sdk
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.wechat_mp.articles.trending({ until: "2026-11-27T00:00:00Z" });
console.log(result.data.items);
```

### CLI

```bash
dataxapi call wechat_mp.articles.trending until=2026-11-27T00:00:00Z
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

Add this to your MCP client, then ask your agent to call `wechat_mp.articles.trending`.

## Responses

### 200

From a response recorded 2026-11-28 03:44 UTC. Names, text and IDs are examples, and so are the links: none is the recorded one (the page shows no one's personal data); the figures are as recorded. Long lists are cut. The request ID, cursor and balance are made up.

Size as sent: 28.4 KB in the standard view (22.6 KB compact, 36.4 KB full).

```jsonc
{
  "code": "ok",
  "request_id": "f9b41190-2135-4d5b-9d0d-ebe70562d5a7",
  "data": {
    "items": [
      {
        "id": "2683318202_1",
        "url": "https://mp.weixin.qq.com/s/XcjmgSiBk5FSsSP-oxOtO4",
        "type": "article",
        "title": "关于周末露营，我踩过的五个坑",
        "published_at": "2026-11-26T06:30:00.000Z",
        "author": {
          "name": "小林的周末",
          "avatar_url": "https://wx.qlogo.cn/mmhead/DbnwsxIiZhiFvIvvTvCp1T7Fo8qx5xgE2wEqF9NH/132"
        },
        "metrics": {
          "likes": 6066,
          "comments": 445,
          "shares": 13581,
          "views": 100001
        },
        "approximate": [
          { "field": "metrics.views", "kind": "lower_bound" }
        ]
      },
      // … 49 more
    ]
  },
  "page": {
    "next_cursor": "c1.GIH-T-wJgwWgjdFAz1aCy_nq54AmHmRirht2-NNr",
    "cursor_expires_at": "2026-11-28T04:44:40.000Z",
    "has_more": true,
    "returned": 50
  },
  "warnings": [],
  "meta": {
    "capability": "wechat_mp.articles.trending",
    "result_status": "complete",
    "fetched_at": "2026-11-28T03:44:40.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "text": "capability",
      "lang": "capability",
      "author.id": "capability",
      "author.username": "capability",
      "author.verified": "capability",
      "author.followers": "platform",
      "metrics.favorites": "capability",
      "metrics.reposts": "platform",
      "images": "capability",
      "hashtags": "platform",
      "mentions": "platform",
      "is_pinned": "capability",
      "post_id": "platform",
      "parent_id": "platform",
      "root_id": "platform"
    },
    "billing": {
      "amount": "0.06",
      "currency": "USD",
      "balance_after": "9.94"
    }
  }
}
```

### Empty

From a response recorded 2026-11-28 03:44 UTC. The request ID and balance are made up.

Size as sent: 784 B in the standard view (784 B compact, 784 B full).

```jsonc
{
  "code": "ok",
  "request_id": "abfb085d-43d3-4374-9103-6018920b5fcd",
  "data": { "items": [] },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 0
  },
  "warnings": [],
  "meta": {
    "capability": "wechat_mp.articles.trending",
    "result_status": "empty",
    "fetched_at": "2026-11-28T03:44:52.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "text": "capability",
      "lang": "capability",
      "author.id": "capability",
      "author.username": "capability",
      "author.verified": "capability",
      "author.followers": "platform",
      "metrics.favorites": "capability",
      "metrics.reposts": "platform",
      "images": "capability",
      "hashtags": "platform",
      "mentions": "platform",
      "is_pinned": "capability",
      "post_id": "platform",
      "parent_id": "platform",
      "root_id": "platform"
    },
    "billing": {
      "amount": "0.06",
      "currency": "USD",
      "balance_after": "9.94"
    }
  }
}
```

### 400

An example written to the specification, not a recorded response.

```json
{
  "code": "invalid_params",
  "request_id": "3ff2fd2a-3f17-45d5-a98c-ccd9086db4a2",
  "message": "A parameter is invalid",
  "message_zh": "参数不合法",
  "charged": false,
  "retry": "after_fix",
  "retry_after_seconds": null,
  "param": null,
  "problems": ["window must be one of 3d, 7d, 30d"],
  "docs_url": "https://dataxapi.com/docs/errors#invalid_params"
}
```

### 402

An example written to the specification, not a recorded response.

```json
{
  "code": "insufficient_balance",
  "request_id": "97fc6af8-a297-41b6-be4d-e4efb1d9b472",
  "message": "The balance is too low",
  "message_zh": "余额不足",
  "charged": false,
  "retry": "after_fix",
  "retry_after_seconds": null,
  "param": null,
  "required": "0.06",
  "available": "0",
  "top_up_url": "https://dataxapi.com/console/billing/?amount=10",
  "next_step": "The balance does not cover this call ($0.06). Top up at top_up_url: $10 at least, about 166 calls at this price; Alipay or a card, and the balance never expires. Then send the same request again, unchanged. Nothing was charged for this one.",
  "next_step_zh": "余额不够这次调用（$0.06）。到 top_up_url 充值：最低 $10，按这次的价格约够 166 次；支付宝、银行卡都能付，余额不过期。到账后把同一个请求原样再发一次。这次没有扣钱。",
  "docs_url": "https://dataxapi.com/docs/errors#insufficient_balance"
}
```

### 502

An example written to the specification, not a recorded response.

```json
{
  "code": "upstream_failed",
  "request_id": "5d5c7b88-f3f9-4b89-821a-03859d75fb2d",
  "message": "No result came back this time and nothing was charged; retry shortly",
  "message_zh": "这次没有取到结果，没有扣费，可以稍后重试",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

[This example as a JSON file](https://dataxapi.com/apis/wechat_mp/articles/trending.example.json)

## Use it in your AI

`dataxapi setup` gives the agents on your machine (Claude Code, Codex, Cursor) the DataXAPI MCP server and the base skill. The key is read from DATAXAPI_API_KEY; none is written into a file.

MCP server: `https://api.dataxapi.com/mcp`. The entry for your client is under MCP in the request examples of this page; then ask your agent to call `wechat_mp.articles.trending`.

Or paste this to any AI:

> Read https://dataxapi.com/apis/wechat_mp/articles/trending.md and help me use the DataXAPI endpoint wechat_mp.articles.trending (WeChat Official Account low-follower viral articles).

[Open in ChatGPT](https://chatgpt.com/?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fwechat_mp%2Farticles%2Ftrending.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20wechat_mp.articles.trending%20%28WeChat%20Official%20Account%20low-follower%20viral%20articles%29.) · [Open in Claude](https://claude.ai/new?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fwechat_mp%2Farticles%2Ftrending.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20wechat_mp.articles.trending%20%28WeChat%20Official%20Account%20low-follower%20viral%20articles%29.)

## Related

Part of DataXAPI's Social media data. The same key also works for: Creators, Ads, E-commerce.

The same thing on other platforms: [Bilibili popular videos](https://dataxapi.com/apis/bilibili/videos/trending/), [Douyin trending videos](https://dataxapi.com/apis/douyin/videos/trending/), [Reddit popular posts](https://dataxapi.com/apis/reddit/posts/trending/)

More Social media data on other platforms: [Douyin hashtag videos](https://dataxapi.com/apis/douyin/hashtags/videos/list/), [Bilibili user videos](https://dataxapi.com/apis/bilibili/users/videos/list/), [Bilibili video detail](https://dataxapi.com/apis/bilibili/videos/get/), [Bilibili video search](https://dataxapi.com/apis/bilibili/videos/search/), [Douyin trend-index creator top videos](https://dataxapi.com/apis/douyin/index/creators/videos/list/), [Douyin trend-index keyword hot videos](https://dataxapi.com/apis/douyin/index/videos/search/), [Douyin user videos](https://dataxapi.com/apis/douyin/users/videos/list/), [Douyin video detail](https://dataxapi.com/apis/douyin/videos/get/), [Douyin video play count](https://dataxapi.com/apis/douyin/videos/metrics/), [Douyin related videos](https://dataxapi.com/apis/douyin/videos/related/), [Douyin video search](https://dataxapi.com/apis/douyin/videos/search/), [Kuaishou user videos](https://dataxapi.com/apis/kuaishou/users/videos/list/), [Kuaishou video detail](https://dataxapi.com/apis/kuaishou/videos/get/), [Kuaishou video search](https://dataxapi.com/apis/kuaishou/videos/search/), [Telegram channel messages](https://dataxapi.com/apis/telegram/channels/messages/list/), [Telegram message detail](https://dataxapi.com/apis/telegram/messages/get/), [X community posts](https://dataxapi.com/apis/x/communities/posts/list/), [X list posts](https://dataxapi.com/apis/x/lists/posts/list/), [X article detail](https://dataxapi.com/apis/x/posts/article/get/)

WeChat Official Accounts endpoints: [WeChat Official Account articles](https://dataxapi.com/apis/wechat_mp/accounts/articles/list/), [WeChat Official Account profile](https://dataxapi.com/apis/wechat_mp/accounts/get/), [WeChat Official Account article comments](https://dataxapi.com/apis/wechat_mp/articles/comments/list/), [WeChat Official Account article detail](https://dataxapi.com/apis/wechat_mp/articles/get/), [WeChat Official Account article stats](https://dataxapi.com/apis/wechat_mp/articles/metrics/), [WeChat Official Account comment replies](https://dataxapi.com/apis/wechat_mp/comments/replies/list/), [WeChat Official Account name search](https://dataxapi.com/apis/wechat_mp/accounts/search/), [WeChat Official Account owner](https://dataxapi.com/apis/wechat_mp/accounts/owner/get/)

Related: [All WeChat Official Accounts endpoints](https://dataxapi.com/apis/wechat_mp/), [Social media data](https://dataxapi.com/categories/social/), [The same thing on 3 platforms, side by side](https://dataxapi.com/roles/posts-trending/), [The post object's fields](https://dataxapi.com/docs/objects/post/)

## Questions

### How much does the WeChat Official Account low-follower viral articles API cost?

$0.0600 per call. The most one call can cost is $0.0600.

### When am I not charged?

Errors and timeouts are not charged.

### How many items does one call return, and how do I get the next page?

50 items a page. The page size is the platform's; limit is not accepted. For the next page pass page.next_cursor as cursor; a cursor is valid for 1 hour. page.has_more is false on the last page.

---

Last checked 2026-11-28 06:28 UTC. Catalog revision ceced48b38f71468. [HTML version](https://dataxapi.com/apis/wechat_mp/articles/trending/)
