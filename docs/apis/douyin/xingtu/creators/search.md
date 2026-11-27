# Douyin Xingtu creator search API

Search Douyin creators on Xingtu by words in their name, filtered by followers, expected CPM (in yuan) and gender, or ordered by expected CPM, lowest first:Xingtu creator ID, name, location, content categories, followers; in the full view also what an integrated and a custom video cost, expected CPMs (in yuan), expected views, the last 30 days' interaction and completion ratios and median views, the e-commerce level, gender and content labels. The creator ID the other Xingtu endpoints take comes from here. Up to 20 items a call; $0.0040 per call. Errors and timeouts are not charged.

- Endpoint: `GET https://api.dataxapi.com/v1/douyin/xingtu/creators/search`
- ID: `douyin.xingtu.creators.search`
- Also known as: find douyin influencers, xingtu kol search, xingtu creator cpm
- Price: $0.0040 / call
- Live status is not on this page, which is a snapshot. Read it with `GET https://api.dataxapi.com/v1/catalog/status`
- Returns: 20 a page, a page, with a cursor for the next
- Returns creator, a preview structure that may still change
- [Run it in the Playground](https://dataxapi.com/console/playground/?capability=douyin.xingtu.creators.search&params=%7B%22query%22%3A%22%E7%BE%8E%E9%A3%9F%22%7D)
- In Chinese: [抖音星图达人搜索 API](https://dataxapi.com/zh/apis/douyin/xingtu/creators/search/)

## What you get

The first row of a response recorded 2026-10-12 22:06 UTC.

| Field | Value |
| --- | --- |
| metrics.followers | 48,169 |

## Parameters

| Parameter | Type | required | Description |
| --- | --- | --- | --- |
| `query` | text | Yes | Search terms, matched against creators' names. Example: `美食`. |
| `followers_min` | integer |  | At least this many followers. Example: `100000`. |
| `followers_max` | integer |  | At most this many followers. Example: `1000000`. |
| `cpm_min` | integer |  | Expected cost per thousand views of an integrated video (ext.cpm_integrated) at least this, in yuan. Example: `10`. |
| `cpm_max` | integer |  | Expected cost per thousand views of an integrated video (ext.cpm_integrated) at most this, in yuan: 50 is no more than 50 yuan a thousand views. Example: `50`. |
| `gender` | text |  | Only female or only male creators. Values: `female`, `male`. Example: `female`. |
| `sort` | text |  | Order: relevance, the platform's own ranking (the default); lowest_cpm, by expected CPM, lowest first. The platform orders by the figure in ext.cpm_promoted, so the order may differ from that of ext.cpm_integrated. Values: `relevance` (default), `lowest_cpm`. Example: `lowest_cpm`. |
| `cursor` | text |  | Cursor returned by the previous page. Pass `page.next_cursor` of the page before, unchanged. Each page is charged as a call of its own. |
| `view` | text |  | How much of each item to return. All three cost the same. Values: `compact`, `standard` (default), `full`. |
| `fields` | list of text |  | Return only these fields. Each by its path, such as `author.name`. |

## Returned fields

`data.items` is a list of creator objects. Preview: the structure may change, announced beforehand.

Three views: `compact` (the most used fields, long text cut short), `standard` (the default: every standard field) and `full` (adds `ext`, the platform's own fields). A field is in the view named and in every larger one.

| Field | Type | Description | From view | This endpoint |
| --- | --- | --- | --- | --- |
| `id` | text | The creator's ID in the marketplace. | `compact` | Yes |
| `account_id` | text | ID of the creator's account on the platform, as the platform's account endpoints take it. | `compact` | Not provided here |
| `username` | text | Handle. | `compact` | Not provided here |
| `name` | text | Display name. | `compact` | Yes |
| `avatar_url` | link | Avatar. | `standard` | Yes |
| `location` | text | Where the creator is based, in the platform's words. | `standard` | Yes |
| `categories` | list of text | Content categories, first level, in the platform's words. | `compact` | Yes |
| `subcategories` | list of text | Content categories, second level, in the platform's words. | `standard` | Yes |
| `metrics` | object | Creator counts. | `compact` | Yes |
| `metrics.followers` | integer | Followers. | `compact` | Yes |
| `ext.uid` | text | The numeric ID (uid) of the creator's Douyin account; not the ID the account endpoints take. | `full` | Yes |
| `ext.rate_integrated` | amount | Rate for an integrated video (植入视频: the brand placed in the creator's own content), in yuan. | `full` | Yes |
| `ext.rate_custom` | amount | Rate for a custom video (定制视频: a video made for the brand), in yuan. | `full` | Yes |
| `ext.expected_views` | integer | Views the platform expects of one video. | `full` | Yes |
| `ext.cpm_integrated` | amount | Expected cost per thousand views (CPM) of an integrated video, in yuan: the integrated rate over the views the platform expects, times 1000; null without a rate or an estimate. | `full` | Yes |
| `ext.cpm_custom` | amount | Expected cost per thousand views (CPM) of a custom video, in yuan, worked out the same way; null where there is none. | `full` | Yes |
| `ext.cpm_promoted` | amount | Xingtu's other expected cost per thousand views of an integrated video, in yuan: the same rate over the platform's promotion view estimate (not expected_views), times 1000, above or below cpm_integrated; it is what the search's CPM order (sort=lowest_cpm) goes by; null where there is none. | `full` | Yes |
| `ext.interaction_rate_30d` | number | Interaction rate of the last 30 days' videos, 0 to 1 (0.0085 is 0.85%); null where the platform has none. | `full` | Yes |
| `ext.completion_rate_30d` | number | Completion rate of the last 30 days' videos, 0 to 1; null where the platform has none. | `full` | Yes |
| `ext.views_median_30d` | number | Median views of the last 30 days' videos (ending in .5 where the number of videos is even); null where the platform has none. | `full` | Yes |
| `ext.ecommerce_level` | text | Xingtu's e-commerce (selling) level, L0 to L6, in the platform's words; null where there is none. | `full` | Yes |
| `ext.gender` | text | The creator's gender: female or male; null where the platform gives none. Values: `female`, `male`. | `full` | Yes |
| `ext.content_labels` | list of text | Theme labels Xingtu gives the creator's content, in the platform's words (the last 180 days', in search results); null where there are none. | `full` | Yes |
| `approximate` | list of object | Which numbers of this item are approximate or lower bounds; absent when all are exact. | `compact` | Yes |
| `approximate[].field` | text | Path of the field, such as metrics.views. | `compact` | Yes |
| `approximate[].kind` | text | Approximate, or a lower bound. Values: `approximate`, `lower_bound`. | `compact` | Yes |

A field with no value on an item is `null`. A field this endpoint cannot give is left out and listed in `meta.unavailable`.

Typical size of one item: `compact` 115 B, `standard` 310 B, `full` 618 B (measured on the response recorded 2026-10-12 22:06 UTC).

## Paging

20 items a page. The page size is the platform's; `limit` is not accepted.

For the next page pass `page.next_cursor` as `cursor`; a cursor is valid for 1 hour. `page.has_more` is false on the last page.

## When you are charged

| Case | Charged |
| --- | --- |
| A result with data | $0.0040, once per call |
| Each further page | charged as a call of its own |
| Invalid parameters, a failure or a timeout | not charged |
| The most one call can cost | $0.0040 (send `X-Max-Price` to refuse anything above your own limit) |

Prices as read 2026-11-27 06:18 UTC, under price book 23, in effect since 2026-11-27 06:13 UTC; the Playground reads the price in force before a run.

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
curl -G "https://api.dataxapi.com/v1/douyin/xingtu/creators/search" \
  --data-urlencode "query=美食" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
# pip install dataxapi
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.douyin.xingtu.creators.search(query="美食")
print(result["data"]["items"])
```

### TypeScript

```typescript
// npm i @dataxapi/sdk
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.douyin.xingtu.creators.search({ query: "美食" });
console.log(result.data.items);
```

### CLI

```bash
dataxapi call douyin.xingtu.creators.search 'query=美食'
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

Add this to your MCP client, then ask your agent to call `douyin.xingtu.creators.search`.

## Responses

### 200

From a response recorded 2026-10-12 22:06 UTC. Names, text and IDs are examples, and so are the links: none is the recorded one (the page shows no one's personal data); the figures are as recorded. Long lists are cut. The request ID, cursor and balance are made up.

Size as sent: 6.5 KB in the standard view (2.7 KB compact, 12.6 KB full).

```jsonc
{
  "code": "ok",
  "request_id": "868ddbde-b3c7-4d7f-b06d-9222e36252a7",
  "data": {
    "items": [
      {
        "id": "6811001738597474041",
        "name": "橘子汽水不加冰",
        "avatar_url": "https://p3-pc.douyinpic.com/aweme/100x100/aweme-avatar/tos-cn-avt-0015_49724ca5b7a50c72cbe5.jpeg",
        "location": "北京",
        "categories": ["户外"],
        "subcategories": ["家居好物"],
        "metrics": { "followers": 48169 }
      },
      // … 19 more
    ]
  },
  "page": {
    "next_cursor": "c1.Xg3q38In7offq-5CuKi-UcARHThe6dxGEKhgaR5D",
    "cursor_expires_at": "2026-10-12T23:06:50.000Z",
    "has_more": true,
    "returned": 20
  },
  "warnings": [],
  "meta": {
    "capability": "douyin.xingtu.creators.search",
    "result_status": "complete",
    "fetched_at": "2026-10-12T22:06:50.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": { "account_id": "capability", "username": "capability" },
    "billing": {
      "amount": "0.004",
      "currency": "USD",
      "balance_after": "9.996"
    }
  }
}
```

### Empty

From a response recorded 2026-10-12 21:49 UTC. The request ID and balance are made up.

Size as sent: 461 B in the standard view (461 B compact, 461 B full).

```jsonc
{
  "code": "ok",
  "request_id": "74610c81-b415-41c4-895f-93b810786fa1",
  "data": { "items": [] },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 0
  },
  "warnings": [],
  "meta": {
    "capability": "douyin.xingtu.creators.search",
    "result_status": "empty",
    "fetched_at": "2026-10-12T21:49:31.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": { "account_id": "capability", "username": "capability" },
    "billing": {
      "amount": "0.004",
      "currency": "USD",
      "balance_after": "9.996"
    }
  }
}
```

### 400

An example written to the specification, not a recorded response.

```json
{
  "code": "invalid_params",
  "request_id": "10d1fdde-11bc-4fe3-b01d-ee59754c9c94",
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
  "request_id": "093ef1b0-637a-4ca7-a7cf-bee67e042469",
  "message": "The balance is too low",
  "message_zh": "余额不足",
  "charged": false,
  "retry": "after_fix",
  "retry_after_seconds": null,
  "param": null,
  "required": "0.004",
  "available": "0",
  "top_up_url": "https://dataxapi.com/console/billing/?amount=10",
  "next_step": "The balance does not cover this call ($0.004). Top up at top_up_url: $10 at least, about 2,500 calls at this price; Alipay or a card, and the balance never expires. Then send the same request again, unchanged. Nothing was charged for this one.",
  "next_step_zh": "余额不够这次调用（$0.004）。到 top_up_url 充值：最低 $10，按这次的价格约够 2,500 次；支付宝、银行卡都能付，余额不过期。到账后把同一个请求原样再发一次。这次没有扣钱。",
  "docs_url": "https://dataxapi.com/docs/errors#insufficient_balance"
}
```

### 502

An example written to the specification, not a recorded response.

```json
{
  "code": "upstream_failed",
  "request_id": "8a721a18-346a-442c-8dd0-c1a791ea03eb",
  "message": "No result came back this time and nothing was charged; retry shortly",
  "message_zh": "这次没有取到结果，没有扣费，可以稍后重试",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

This recorded response is 29k tokens as the platform's own JSON, 2,302 as DataXAPI's JSON, and 771 as an AI reads it through DataXAPI's MCP server: 97% fewer (counted 2026-11-06).

[This example as a JSON file](https://dataxapi.com/apis/douyin/xingtu/creators/search.example.json)

## Use it in your AI

`dataxapi setup` gives the agents on your machine (Claude Code, Codex, Cursor) the DataXAPI MCP server and the base skill. The key is read from DATAXAPI_API_KEY; none is written into a file.

MCP server: `https://api.dataxapi.com/mcp`. The entry for your client is under MCP in the request examples of this page; then ask your agent to call `douyin.xingtu.creators.search`.

Or paste this to any AI:

> Read https://dataxapi.com/apis/douyin/xingtu/creators/search.md and help me use the DataXAPI endpoint douyin.xingtu.creators.search (Douyin Xingtu creator search).

[Open in ChatGPT](https://chatgpt.com/?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fdouyin%2Fxingtu%2Fcreators%2Fsearch.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20douyin.xingtu.creators.search%20%28Douyin%20Xingtu%20creator%20search%29.) · [Open in Claude](https://claude.ai/new?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fdouyin%2Fxingtu%2Fcreators%2Fsearch.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20douyin.xingtu.creators.search%20%28Douyin%20Xingtu%20creator%20search%29.)

## Related

Part of DataXAPI's Creators data. The same key also works for: Social media, Ads, E-commerce.

The same thing on other platforms: [Xiaohongshu PGY creator search](https://dataxapi.com/apis/xiaohongshu/pgy/creators/search/)

Douyin Xingtu endpoints: [Douyin Xingtu creator rate card](https://dataxapi.com/apis/douyin/xingtu/creators/rates/get/), [Douyin Xingtu creator search](https://dataxapi.com/apis/douyin/xingtu/creators/search/), [Douyin Xingtu creator profile](https://dataxapi.com/apis/douyin/xingtu/creators/get/), [Douyin Xingtu creator audience](https://dataxapi.com/apis/douyin/xingtu/creators/audience/get/), [Douyin Xingtu creator metrics](https://dataxapi.com/apis/douyin/xingtu/creators/metrics/), [Douyin Xingtu creator video performance](https://dataxapi.com/apis/douyin/xingtu/creators/videos/list/), [Douyin Xingtu creator content keywords](https://dataxapi.com/apis/douyin/xingtu/creators/keywords/get/), [Douyin Xingtu creator index scores](https://dataxapi.com/apis/douyin/xingtu/creators/scores/get/), [Douyin Xingtu creator content mix](https://dataxapi.com/apis/douyin/xingtu/creators/content_mix/get/), [Douyin Xingtu creator conversion](https://dataxapi.com/apis/douyin/xingtu/creators/conversion/get/), [Douyin Xingtu marketing calendar](https://dataxapi.com/apis/douyin/xingtu/campaigns/list/), [Douyin Xingtu video report: plays and completion rate](https://dataxapi.com/apis/douyin/xingtu/videos/get/), [Douyin Xingtu creator audience (backup)](https://dataxapi.com/apis/douyin/xingtu/backup/creators/audience/get/)

Douyin endpoints: [Douyin comment replies](https://dataxapi.com/apis/douyin/comments/replies/list/), [Douyin hashtag videos](https://dataxapi.com/apis/douyin/hashtags/videos/list/), [Douyin hot search board](https://dataxapi.com/apis/douyin/trends/list/), [Douyin user profile](https://dataxapi.com/apis/douyin/users/get/), [Douyin creator engagement and follower trends](https://dataxapi.com/apis/douyin/users/history/), [Douyin user search](https://dataxapi.com/apis/douyin/users/search/), [Douyin user videos](https://dataxapi.com/apis/douyin/users/videos/list/), [Douyin video comments](https://dataxapi.com/apis/douyin/videos/comments/list/), [Douyin video detail](https://dataxapi.com/apis/douyin/videos/get/), [Douyin video transcript (video to text)](https://dataxapi.com/apis/douyin/videos/transcript/get/), [Douyin video play count](https://dataxapi.com/apis/douyin/videos/metrics/), [Douyin related videos](https://dataxapi.com/apis/douyin/videos/related/), [Douyin video search](https://dataxapi.com/apis/douyin/videos/search/), [Douyin trending videos](https://dataxapi.com/apis/douyin/videos/trending/), [Douyin search suggestions](https://dataxapi.com/apis/douyin/keywords/related/), [Douyin video downloader, no watermark](https://dataxapi.com/apis/douyin/videos/media/get/), [Douyin music detail](https://dataxapi.com/apis/douyin/music/get/), [Douyin user videos (backup)](https://dataxapi.com/apis/douyin/backup/users/videos/list/), [Douyin video search (backup)](https://dataxapi.com/apis/douyin/backup/videos/search/)

Douyin trend-index endpoints: [Douyin trend-index brand trends](https://dataxapi.com/apis/douyin/index/brands/history/), [Douyin trend-index brand comparison](https://dataxapi.com/apis/douyin/index/brands/metrics/), [Douyin trend-index creator top videos](https://dataxapi.com/apis/douyin/index/creators/videos/list/), [Douyin trend-index creator follower profile](https://dataxapi.com/apis/douyin/index/creators/audience/get/), [Douyin trend-index creator core metrics](https://dataxapi.com/apis/douyin/index/creators/metrics/), [Douyin trend-index keyword audience](https://dataxapi.com/apis/douyin/index/keywords/audience/get/), [Douyin trend-index keyword trends](https://dataxapi.com/apis/douyin/index/keywords/history/), [Douyin trend-index related keywords](https://dataxapi.com/apis/douyin/index/keywords/related/), [Douyin trend-index live hot topics](https://dataxapi.com/apis/douyin/index/trends/list/), [Douyin trend-index keyword hot videos](https://dataxapi.com/apis/douyin/index/videos/search/)

How-to guides and answers: [How to look up a Douyin creator's Xingtu rate card](https://dataxapi.com/guides/douyin-xingtu-creator-rates/), [What is Douyin Xingtu?](https://dataxapi.com/answers/what-is-douyin-xingtu/), [How do I export all of a Douyin creator's video data? (2026)](https://dataxapi.com/answers/export-douyin-creator-videos/), [Do Chanmama, Qiangua and Newrank have APIs? What if I want the raw data? (2026)](https://dataxapi.com/answers/chanmama-qiangua-newrank-api/), [How do I filter Xingtu creators in bulk and see their rates? (2026)](https://dataxapi.com/answers/douyin-xingtu-creators-bulk-filter/), [Douyin API for developers: third-party Douyin data APIs and what they return (2026)](https://dataxapi.com/answers/douyin-third-party-data-apis/), [Douyin MCP server for Claude and Cursor (2026)](https://dataxapi.com/answers/douyin-mcp/), [Creator (KOL) data from Douyin and Xiaohongshu: profiles, posts and rates (2026)](https://dataxapi.com/answers/douyin-xiaohongshu-creator-data/), [Every figure on a Douyin Xingtu creator page: can an API get it? Field by field (2026)](https://dataxapi.com/answers/douyin-xingtu-creator-page-fields/), [Xingtu integrated and custom video rates: the difference, and getting them by API (2026)](https://dataxapi.com/answers/douyin-xingtu-integrated-vs-custom-rate/), [Finding Xingtu creators by CPM: the Douyin creators that cost least a thousand views (2026)](https://dataxapi.com/answers/douyin-xingtu-find-creators-by-cpm/), [Does a Douyin account have a shop showcase, sell live, or carry a business badge? (2026)](https://dataxapi.com/answers/douyin-account-showcase-live-selling/), [Xiaohongshu PGY or Douyin Xingtu: how they differ, and their creator data side by side (2026)](https://dataxapi.com/answers/xiaohongshu-pgy-vs-douyin-xingtu/), [What does a Douyin creator with 1 million followers charge on Xingtu? Checking rates by follower band (2026)](https://dataxapi.com/answers/douyin-xingtu-rates-by-followers/), [Does Douyin Xingtu have an API? What the official one reads, and how to read any creator (2026)](https://dataxapi.com/answers/douyin-xingtu-api/)

Related: [All Douyin Xingtu endpoints](https://dataxapi.com/apis/douyin/xingtu/), [All Douyin endpoints](https://dataxapi.com/apis/douyin/), [Creators data](https://dataxapi.com/categories/creator/), [The same thing on 2 platforms, side by side](https://dataxapi.com/roles/creators-search/), [The creator object's fields](https://dataxapi.com/docs/objects/creator/)

## Questions

### How much does the Douyin Xingtu creator search API cost?

$0.0040 per call. The most one call can cost is $0.0040.

### When am I not charged?

Errors and timeouts are not charged.

### How many items does one call return, and how do I get the next page?

20 items a page. The page size is the platform's; limit is not accepted. For the next page pass page.next_cursor as cursor; a cursor is valid for 1 hour. page.has_more is false on the last page.

---

Last checked 2026-11-27 06:18 UTC. Catalog revision 0264e2d6dd4ff743. [HTML version](https://dataxapi.com/apis/douyin/xingtu/creators/search/)
