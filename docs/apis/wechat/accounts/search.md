# WeChat Official Account live search API

Find WeChat Official Accounts and service accounts for search terms through WeChat Search, closest first, possibly followed by less related ones: original ID, WeChat ID, name, bio, avatar, whether verified, owner, number of original articles. Charged per call; no followers or reads, for estimates of those use wechat_mp.accounts.search. About 8 items a call, 14 at most; $0.0200 per call. Errors and timeouts are not charged.

- Endpoint: `GET https://api.dataxapi.com/v1/wechat/accounts/search`
- ID: `wechat.accounts.search`
- Also known as: find a wechat official account's id, wechat official account id lookup
- Price: $0.0200 / call
- Live status is not on this page, which is a snapshot. Read it with `GET https://api.dataxapi.com/v1/catalog/status`
- Returns: up to 14 a page, a page, with a cursor for the next
- Returns the standard account object, the same on every platform
- [Run it in the Playground](https://dataxapi.com/console/playground/?capability=wechat.accounts.search&params=%7B%22query%22%3A%2236%E6%B0%AA%22%7D)
- In Chinese: [微信公众号实时查找 API](https://dataxapi.com/zh/apis/wechat/accounts/search/)

## What you get

The first row of a response recorded 2026-11-02 11:25 UTC.

| Field | Value |
| --- | --- |
| verified | true |

## Parameters

| Parameter | Type | required | Description |
| --- | --- | --- | --- |
| `query` | text | Yes | The account's name, or a keyword. Example: `36氪`. |
| `cursor` | text |  | Cursor returned by the previous page. Pass `page.next_cursor` of the page before, unchanged. Each page is charged as a call of its own. |
| `view` | text |  | How much of each item to return. All three cost the same. Values: `compact`, `standard` (default), `full`. |
| `fields` | list of text |  | Return only these fields. Each by its path, such as `author.name`. |

## Returned fields

`data.items` is a list of account objects. Stable: fields are only ever added.

Three views: `compact` (the most used fields, long text cut short), `standard` (the default: every standard field) and `full` (adds `ext`, the platform's own fields). A field is in the view named and in every larger one.

| Field | Type | Description | From view | This endpoint |
| --- | --- | --- | --- | --- |
| `id` | text | ID. On this platform: The account's original ID, mostly starting with gh_ but not always; it can be passed as it is to wechat_mp.accounts.articles.list and wechat_mp.accounts.get. | `compact` | Yes |
| `username` | text | Handle. On this platform: The WeChat ID people type to find the account; null where none is set. | `compact` | Yes |
| `name` | text | Display name. | `compact` | Yes |
| `url` | link | Link to the profile. | `compact` | The platform has none |
| `bio` | text | Bio. Long text: the compact view keeps the first 500 characters and says so in `warnings`. | `compact` | Yes |
| `avatar_url` | link | Avatar. | `standard` | Yes |
| `verified` | yes/no | Whether the account is verified. | `standard` | Yes |
| `created_at` | time | When the account was created. | `standard` | Not provided here |
| `metrics` | object | Account counts. | `compact` | Not provided here |
| `metrics.followers` | integer | Followers. | `compact` | Not provided here |
| `metrics.following` | integer | Following. | `compact` | Not provided here |
| `metrics.posts` | integer | Posts published. | `compact` | Not provided here |
| `ext.owner_name` | text | Name of the account's owner (a company or body); null where none is shown. | `full` | Yes |
| `ext.original_articles` | integer | Number of original articles as the platform shows it; null for a service account and where none is shown. | `full` | Yes |
| `approximate` | list of object | Which numbers of this item are approximate or lower bounds; absent when all are exact. | `compact` | Yes |
| `approximate[].field` | text | Path of the field, such as metrics.views. | `compact` | Yes |
| `approximate[].kind` | text | Approximate, or a lower bound. Values: `approximate`, `lower_bound`. | `compact` | Yes |

A field with no value on an item is `null`. A field this endpoint cannot give is left out and listed in `meta.unavailable`.

Typical size of one item: `compact` 167 B, `standard` 335 B, `full` 422 B (measured on the response recorded 2026-11-02 11:25 UTC).

## Paging

About 8 items a page, 14 at most. The page size is the platform's; `limit` is not accepted.

For the next page pass `page.next_cursor` as `cursor`; a cursor is valid for 1 hour. `page.has_more` is false on the last page.

## When you are charged

| Case | Charged |
| --- | --- |
| A result with data | $0.0200, once per call |
| Each further page | charged as a call of its own |
| Invalid parameters, a failure or a timeout | not charged |
| The most one call can cost | $0.0200 (send `X-Max-Price` to refuse anything above your own limit) |

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
curl -G "https://api.dataxapi.com/v1/wechat/accounts/search" \
  --data-urlencode "query=36氪" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
# pip install dataxapi
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.wechat.accounts.search(query="36氪")
print(result["data"]["items"])
```

### TypeScript

```typescript
// npm i @dataxapi/sdk
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.wechat.accounts.search({ query: "36氪" });
console.log(result.data.items);
```

### CLI

```bash
dataxapi call wechat.accounts.search 'query=36氪'
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

Add this to your MCP client, then ask your agent to call `wechat.accounts.search`.

## Responses

### 200

From a response recorded 2026-11-02 11:25 UTC. Names, text and IDs are examples, and so are the links: none is the recorded one (the page shows no one's personal data); the figures are as recorded. Long lists are cut. The request ID, cursor and balance are made up.

Size as sent: 4.1 KB in the standard view (2.3 KB compact, 5.0 KB full).

```jsonc
{
  "code": "ok",
  "request_id": "86788fb5-4235-48ac-b9c6-23292e637c65",
  "data": {
    "items": [
      {
        "id": "1047168840907789",
        "username": "nanfeng_0721",
        "name": "南边的风",
        "bio": "在上海，周末都在山里",
        "avatar_url": "https://wx.qlogo.cn/mmhead/xjoBFsBvyPoDjvS4DO1qBnMkqIePSAETki44ma9I/132",
        "verified": true
      },
      // … 10 more
    ]
  },
  "page": {
    "next_cursor": "c1.Ew51uWdKdB0gdItoicfGl1FUa3rXNGNkJvKajjh3",
    "cursor_expires_at": "2026-11-02T12:25:07.000Z",
    "has_more": true,
    "returned": 11
  },
  "warnings": [],
  "meta": {
    "capability": "wechat.accounts.search",
    "result_status": "complete",
    "fetched_at": "2026-11-02T11:25:07.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "url": "platform",
      "created_at": "capability",
      "metrics": "capability"
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

From a recording of 2026-11-02 11:25 UTC, edited by hand to show this case. The request ID and balance are made up.

Size as sent: 470 B in the standard view (470 B compact, 470 B full).

```jsonc
{
  "code": "ok",
  "request_id": "28a5b7f5-264d-4dc0-92e6-d6f0bf7894e4",
  "data": { "items": [] },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 0
  },
  "warnings": [],
  "meta": {
    "capability": "wechat.accounts.search",
    "result_status": "empty",
    "fetched_at": "2026-11-02T11:25:07.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "url": "platform",
      "created_at": "capability",
      "metrics": "capability"
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
  "request_id": "ce7d6a10-6d4e-442d-9ae8-fdc84db25ebc",
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
  "request_id": "a3dede4b-1293-4bfb-8c20-7cf3dbe2d8a2",
  "message": "The balance is too low",
  "message_zh": "余额不足",
  "charged": false,
  "retry": "after_fix",
  "retry_after_seconds": null,
  "param": null,
  "required": "0.02",
  "available": "0",
  "top_up_url": "https://dataxapi.com/console/billing/?amount=10",
  "next_step": "The balance does not cover this call ($0.02). Top up at top_up_url: $10 at least, about 500 calls at this price; Alipay or a card, and the balance never expires. Then send the same request again, unchanged. Nothing was charged for this one.",
  "next_step_zh": "余额不够这次调用（$0.02）。到 top_up_url 充值：最低 $10，按这次的价格约够 500 次；支付宝、银行卡都能付，余额不过期。到账后把同一个请求原样再发一次。这次没有扣钱。",
  "docs_url": "https://dataxapi.com/docs/errors#insufficient_balance"
}
```

### 502

An example written to the specification, not a recorded response.

```json
{
  "code": "upstream_failed",
  "request_id": "eaf625a6-e01b-4535-b941-8dc5df648c4f",
  "message": "No result came back this time and nothing was charged; retry shortly",
  "message_zh": "这次没有取到结果，没有扣费，可以稍后重试",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

This recorded response is 12k tokens as the platform's own JSON, 1,687 as DataXAPI's JSON, and 684 as an AI reads it through DataXAPI's MCP server: 94% fewer (counted 2026-11-06).

[This example as a JSON file](https://dataxapi.com/apis/wechat/accounts/search.example.json)

## Use it in your AI

`dataxapi setup` gives the agents on your machine (Claude Code, Codex, Cursor) the DataXAPI MCP server and the base skill. The key is read from DATAXAPI_API_KEY; none is written into a file.

MCP server: `https://api.dataxapi.com/mcp`. The entry for your client is under MCP in the request examples of this page; then ask your agent to call `wechat.accounts.search`.

Or paste this to any AI:

> Read https://dataxapi.com/apis/wechat/accounts/search.md and help me use the DataXAPI endpoint wechat.accounts.search (WeChat Official Account live search).

[Open in ChatGPT](https://chatgpt.com/?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fwechat%2Faccounts%2Fsearch.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20wechat.accounts.search%20%28WeChat%20Official%20Account%20live%20search%29.) · [Open in Claude](https://claude.ai/new?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fwechat%2Faccounts%2Fsearch.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20wechat.accounts.search%20%28WeChat%20Official%20Account%20live%20search%29.)

## Related

Part of DataXAPI's Social media data. The same key also works for: Creators, Ads, E-commerce.

The same thing on other platforms: [Douyin user search](https://dataxapi.com/apis/douyin/users/search/), [Kuaishou user search](https://dataxapi.com/apis/kuaishou/users/search/), [Instagram user search](https://dataxapi.com/apis/instagram/users/search/), [TikTok user search](https://dataxapi.com/apis/tiktok/users/search/), [Weibo user search](https://dataxapi.com/apis/weibo/users/search/), [X user search](https://dataxapi.com/apis/x/users/search/), [Xiaohongshu user search](https://dataxapi.com/apis/xiaohongshu/users/search/), [YouTube channel search](https://dataxapi.com/apis/youtube/channels/search/), [WeChat Official Account name search](https://dataxapi.com/apis/wechat_mp/accounts/search/), [WeChat Channels account search](https://dataxapi.com/apis/wechat_channels/users/search/), [Zhihu user search](https://dataxapi.com/apis/zhihu/users/search/)

More Social media data on other platforms: [Bilibili user profile](https://dataxapi.com/apis/bilibili/users/get/), [Douyin user profile](https://dataxapi.com/apis/douyin/users/get/), [Kuaishou user profile](https://dataxapi.com/apis/kuaishou/users/get/), [Telegram channel profile](https://dataxapi.com/apis/telegram/channels/get/), [Facebook page profile](https://dataxapi.com/apis/facebook/pages/get/), [LinkedIn company page](https://dataxapi.com/apis/linkedin/companies/get/), [Threads user profile](https://dataxapi.com/apis/threads/users/get/), [Instagram user profile](https://dataxapi.com/apis/instagram/users/get/), [TikTok user profile](https://dataxapi.com/apis/tiktok/users/get/), [Weibo post likers](https://dataxapi.com/apis/weibo/posts/likers/list/), [Weibo user followers](https://dataxapi.com/apis/weibo/users/followers/list/), [Weibo user profile](https://dataxapi.com/apis/weibo/users/get/), [X post retweeters](https://dataxapi.com/apis/x/posts/retweeters/list/), [X user followers](https://dataxapi.com/apis/x/users/followers/list/)

WeChat Search endpoints: [WeChat Search articles and videos](https://dataxapi.com/apis/wechat/posts/search/), [WeChat Search articles and videos (backup)](https://dataxapi.com/apis/wechat/backup/posts/search/), [WeChat Official Account live search](https://dataxapi.com/apis/wechat/accounts/search/), [WeChat Index](https://dataxapi.com/apis/wechat/index/keywords/history/), [WeChat Search suggestions](https://dataxapi.com/apis/wechat/keywords/related/), [WeChat mini program search](https://dataxapi.com/apis/wechat/miniprograms/search/)

How-to guides and answers: [WeChat Official Account articles API in Python: history and reads (third-party, 2026)](https://dataxapi.com/guides/wechat-official-account-api-python/), [What WeChat data APIs are there? Official Accounts, Channels and WeChat Search (2026)](https://dataxapi.com/answers/wechat-data-apis/), [WeChat returns ret=200013 freq control when listing an account's articles: what now? (2026)](https://dataxapi.com/answers/wechat-ret-200013-freq-control/), [wechat-article-exporter has stopped: what else exports WeChat articles in bulk? (2026)](https://dataxapi.com/answers/wechat-article-exporter-alternative/), [How do I export a WeChat Official Account's past articles in bulk? (2026)](https://dataxapi.com/answers/export-wechat-history-articles/), [How do I let my AI read WeChat Official Accounts? (ChatGPT, Claude, Codex, 2026)](https://dataxapi.com/answers/let-your-ai-read-wechat/), [How do I turn a WeChat Official Account into RSS? (2026)](https://dataxapi.com/answers/wechat-official-account-rss/), [wewe-rss has stopped working: what now? (2026)](https://dataxapi.com/answers/wewe-rss-not-working/), [How do I watch dozens of WeChat Official Accounts and push updates to Feishu? (2026)](https://dataxapi.com/answers/monitor-wechat-accounts-feishu/), [How do I add WeChat Official Accounts and Xiaohongshu to TrendRadar? (2026)](https://dataxapi.com/answers/trendradar-wechat-xiaohongshu/), [A miner turned up in a we-mp-rss container: what now for WeChat RSS? (2026)](https://dataxapi.com/answers/we-mp-rss-mining-alternative/), [What is fakeid for a WeChat Official Account? (2026)](https://dataxapi.com/answers/wechat-fakeid/), [How do I collect WeChat Official Account articles in n8n? (2026)](https://dataxapi.com/answers/wechat-official-account-n8n/), [How do I connect WeChat Official Account data to Coze (扣子)? (2026)](https://dataxapi.com/answers/wechat-official-account-coze/), [How do I send WeChat Official Account articles to an ima knowledge base automatically? (2026)](https://dataxapi.com/answers/wechat-articles-to-ima-knowledge-base/), [How do I save WeChat Official Account articles to Obsidian automatically? (2026)](https://dataxapi.com/answers/wechat-articles-to-obsidian/), [How do I connect WeChat Official Account data to Dify? (MCP, 2026)](https://dataxapi.com/answers/wechat-official-account-dify/), [WeChat MCP server: Official Accounts and Channels in Claude and Cursor (2026)](https://dataxapi.com/answers/wechat-mcp/), [Getting a WeChat account's Videos and Pictures tabs in bulk (2026)](https://dataxapi.com/answers/wechat-official-account-videos-images/), [WeChat Official Account follower count: estimated followers, lead-article reads and posting rate (2026)](https://dataxapi.com/answers/wechat-official-account-follower-count/), [Which company is behind a WeChat Official Account? Owner, verification and registration date (2026)](https://dataxapi.com/answers/wechat-official-account-owner/), [How does WorkBuddy get WeChat, Douyin and Xiaohongshu data? Connect one MCP server (2026)](https://dataxapi.com/answers/workbuddy-social-media-data/), [How do I get the comments on someone else's WeChat article? Featured comments and replies by link (2026)](https://dataxapi.com/answers/wechat-official-account-comments-api/), [Is there an API for a WeChat article's read count? Reads, likes, recommends and shares by its link (2026)](https://dataxapi.com/answers/wechat-article-read-count-api/), [How do I collect WeChat Official Account data? Past articles, reads and comments in bulk (2026)](https://dataxapi.com/answers/how-to-collect-wechat-official-account-data/)

Skills that use this endpoint: [Finding accounts and creators](https://dataxapi.com/skills/creators/)

Related: [All WeChat Search endpoints](https://dataxapi.com/apis/wechat/), [Social media data](https://dataxapi.com/categories/social/), [The same thing on 12 platforms, side by side](https://dataxapi.com/roles/accounts-search/), [The account object's fields](https://dataxapi.com/docs/objects/account/)

## Questions

### How much does the WeChat Official Account live search API cost?

$0.0200 per call. The most one call can cost is $0.0200.

### When am I not charged?

Errors and timeouts are not charged.

### How many items does one call return, and how do I get the next page?

About 8 items a page, 14 at most. The page size is the platform's; limit is not accepted. For the next page pass page.next_cursor as cursor; a cursor is valid for 1 hour. page.has_more is false on the last page.

---

Last checked 2026-11-27 06:18 UTC. Catalog revision 0264e2d6dd4ff743. [HTML version](https://dataxapi.com/apis/wechat/accounts/search/)
