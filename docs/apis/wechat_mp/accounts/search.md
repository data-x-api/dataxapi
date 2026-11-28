# WeChat Official Account name search API

Find WeChat Official Accounts by name or keyword, closest first: original ID, WeChat ID, name, avatar, owner, and a third-party database's estimates of active followers, lead-article reads and likes, and articles a week (not official, possibly months old). Charged per account; limit sets how many (5 by default, at most 15). Needing the ID and not the estimates, wechat.accounts.search, charged per call, costs less. About 5 items a call, 15 at most; $0.05635 per item returned, at least $0.0600 and at most $0.84525 a call. Errors and timeouts are not charged.

- Endpoint: `GET https://api.dataxapi.com/v1/wechat_mp/accounts/search`
- ID: `wechat_mp.accounts.search`
- Also known as: search wechat official accounts, find wechat official account by name, wechat mp account search, wechat official account followers
- Price: $0.05635 / item
- Live status is not on this page, which is a snapshot. Read it with `GET https://api.dataxapi.com/v1/catalog/status`
- Returns: up to 15 a page, everything in one answer, no paging
- Returns the standard account object, the same on every platform
- [Run it in the Playground](https://dataxapi.com/console/playground/?capability=wechat_mp.accounts.search&params=%7B%22query%22%3A%22%E5%92%96%E5%95%A1%22%7D)
- In Chinese: [微信公众号账号搜索 API](https://dataxapi.com/zh/apis/wechat_mp/accounts/search/)

## Parameters

| Parameter | Type | required | Description |
| --- | --- | --- | --- |
| `query` | text | Yes | The account's name, or a keyword. Example: `咖啡`. |
| `limit` | integer |  | Items per page. Items per page, 1 to 15. |
| `view` | text |  | How much of each item to return. All three cost the same. Values: `compact`, `standard` (default), `full`. |
| `fields` | list of text |  | Return only these fields. Each by its path, such as `author.name`. |

## Returned fields

`data.items` is a list of account objects. Stable: fields are only ever added.

Three views: `compact` (the most used fields, long text cut short), `standard` (the default: every standard field) and `full` (adds `ext`, the platform's own fields). A field is in the view named and in every larger one.

| Field | Type | Description | From view | This endpoint |
| --- | --- | --- | --- | --- |
| `id` | text | ID. | `compact` | Yes |
| `username` | text | Handle. On this platform: The WeChat ID people type to find the account; null where none is set. | `compact` | Yes |
| `name` | text | Display name. | `compact` | Yes |
| `url` | link | Link to the profile. | `compact` | The platform has none |
| `bio` | text | Bio. Long text: the compact view keeps the first 500 characters and says so in `warnings`. | `compact` | Not provided here |
| `avatar_url` | link | Avatar. | `standard` | Yes |
| `verified` | yes/no | Whether the account is verified. | `standard` | Not provided here |
| `created_at` | time | When the account was created. | `standard` | Not provided here |
| `metrics` | object | Account counts. | `compact` | The platform has none |
| `metrics.followers` | integer | Followers. | `compact` | The platform has none |
| `metrics.following` | integer | Following. | `compact` | The platform has none |
| `metrics.posts` | integer | Posts published. | `compact` | The platform has none |
| `ext.biz` | text | The account's __biz: what follows __biz= in the links of its articles. | `full` | Yes |
| `ext.owner_name` | text | Name of the account's owner (a company or body); null for a personal account and where none is on record. | `full` | Yes |
| `ext.estimated_followers` | integer | Estimated active followers: a third-party database's estimate from reads and the like, not a follower count the platform publishes (it publishes none), and possibly weeks to months old. | `full` | Yes |
| `ext.estimated_headline_reads` | integer | Estimated average reads of the account's lead articles: a third-party database's estimate, possibly out of date. | `full` | Yes |
| `ext.estimated_headline_likes` | integer | Estimated average likes of the account's lead articles: a third-party database's estimate, possibly out of date. | `full` | Yes |
| `ext.estimated_weekly_articles` | integer | Estimated articles a week: as a third-party database counts them, possibly out of date. | `full` | Yes |
| `ext.estimated_last_published_at` | time | When the account last published, as a third-party database has it; earlier than the truth when the database has not caught up. | `full` | Yes |
| `approximate` | list of object | Which numbers of this item are approximate or lower bounds; absent when all are exact. | `compact` | Yes |
| `approximate[].field` | text | Path of the field, such as metrics.views. | `compact` | Yes |
| `approximate[].kind` | text | Approximate, or a lower bound. Values: `approximate`, `lower_bound`. | `compact` | Yes |

A field with no value on an item is `null`. A field this endpoint cannot give is left out and listed in `meta.unavailable`.

Typical size of one item: `compact` 67 B, `standard` 174 B, `full` 423 B (measured on the response recorded 2026-10-29 09:47 UTC).

## Paging

About 5 items a page, 15 at most. Set it with `limit`.

Everything comes in one page; no cursor is issued.

## When you are charged

| Case | Charged |
| --- | --- |
| A result with data | $0.05635 for each valid item returned, at least $0.0600 a call |
| Invalid parameters, a failure or a timeout | not charged |
| The most one call can cost | $0.84525 (send `X-Max-Price` to refuse anything above your own limit) |

Prices as read 2026-11-28 06:28 UTC, under price book 30, in effect since 2026-11-28 04:43 UTC; the Playground reads the price in force before a run.

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
curl -G "https://api.dataxapi.com/v1/wechat_mp/accounts/search" \
  --data-urlencode "query=咖啡" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
# pip install dataxapi
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.wechat_mp.accounts.search(query="咖啡")
print(result["data"]["items"])
```

### TypeScript

```typescript
// npm i @dataxapi/sdk
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.wechat_mp.accounts.search({ query: "咖啡" });
console.log(result.data.items);
```

### CLI

```bash
dataxapi call wechat_mp.accounts.search 'query=咖啡'
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

Add this to your MCP client, then ask your agent to call `wechat_mp.accounts.search`.

## Responses

### 200

From a response recorded 2026-10-29 09:47 UTC. Names, text and IDs are examples, and so are the links: none is the recorded one (the page shows no one's personal data); the figures are as recorded. Long lists are cut. The request ID, cursor and balance are made up.

Size as sent: 1.0 KB in the standard view (715 B compact, 1.7 KB full).

```jsonc
{
  "code": "ok",
  "request_id": "6a0decec-3648-4ce7-ae73-2a1d2bd7fad5",
  "data": {
    "items": [
      {
        "id": "gh_5f2e34769fdc",
        "username": "aya_living",
        "name": "认真生活的阿雅",
        "avatar_url": "https://wx.qlogo.cn/mmhead/LO7unl2CpHGnNeCMRIFsNNLZ2CsNrwgfzOG5J5d3/132"
      },
      // … 2 more
    ]
  },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 3
  },
  "warnings": [],
  "meta": {
    "capability": "wechat_mp.accounts.search",
    "result_status": "complete",
    "fetched_at": "2026-10-29T09:47:33.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "url": "platform",
      "bio": "capability",
      "verified": "capability",
      "created_at": "capability",
      "metrics": "platform"
    },
    "billing": {
      "amount": "0.16905",
      "currency": "USD",
      "balance_after": "9.83095"
    }
  }
}
```

### Empty

From a recording of 2026-10-29 09:47 UTC, edited by hand to show this case. The request ID and balance are made up.

Size as sent: 514 B in the standard view (514 B compact, 514 B full).

```jsonc
{
  "code": "ok",
  "request_id": "f5225d6d-edcf-4b7b-813a-c9be62ac4f31",
  "data": { "items": [] },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 0
  },
  "warnings": [],
  "meta": {
    "capability": "wechat_mp.accounts.search",
    "result_status": "empty",
    "fetched_at": "2026-10-29T09:47:33.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "url": "platform",
      "bio": "capability",
      "verified": "capability",
      "created_at": "capability",
      "metrics": "platform"
    },
    "billing": { "amount": "0", "currency": "USD", "balance_after": "10" }
  }
}
```

### 400

An example written to the specification, not a recorded response.

```json
{
  "code": "invalid_params",
  "request_id": "6c25ec6d-a1f6-4579-af75-09577e14374c",
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
  "request_id": "00bd19a2-27d3-4a21-9e7a-ca9b0ebb5374",
  "message": "The balance is too low",
  "message_zh": "余额不足",
  "charged": false,
  "retry": "after_fix",
  "retry_after_seconds": null,
  "param": null,
  "required": "0.84525",
  "available": "0",
  "top_up_url": "https://dataxapi.com/console/billing/?amount=10",
  "next_step": "The balance does not cover this call ($0.84525). Top up at top_up_url: $10 at least, about 11 calls at this price; Alipay or a card, and the balance never expires. Then send the same request again, unchanged. Nothing was charged for this one.",
  "next_step_zh": "余额不够这次调用（$0.84525）。到 top_up_url 充值：最低 $10，按这次的价格约够 11 次；支付宝、银行卡都能付，余额不过期。到账后把同一个请求原样再发一次。这次没有扣钱。",
  "docs_url": "https://dataxapi.com/docs/errors#insufficient_balance"
}
```

### 502

An example written to the specification, not a recorded response.

```json
{
  "code": "upstream_failed",
  "request_id": "0dd34c81-b40e-4cad-baeb-1a0bb6901dbb",
  "message": "No result came back this time and nothing was charged; retry shortly",
  "message_zh": "这次没有取到结果，没有扣费，可以稍后重试",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

This recorded response is 509 tokens as the platform's own JSON, 390 as DataXAPI's JSON, and 142 as an AI reads it through DataXAPI's MCP server: 72% fewer (counted 2026-11-06).

[This example as a JSON file](https://dataxapi.com/apis/wechat_mp/accounts/search.example.json)

## Use it in your AI

`dataxapi setup` gives the agents on your machine (Claude Code, Codex, Cursor) the DataXAPI MCP server and the base skill. The key is read from DATAXAPI_API_KEY; none is written into a file.

MCP server: `https://api.dataxapi.com/mcp`. The entry for your client is under MCP in the request examples of this page; then ask your agent to call `wechat_mp.accounts.search`.

Or paste this to any AI:

> Read https://dataxapi.com/apis/wechat_mp/accounts/search.md and help me use the DataXAPI endpoint wechat_mp.accounts.search (WeChat Official Account name search).

[Open in ChatGPT](https://chatgpt.com/?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fwechat_mp%2Faccounts%2Fsearch.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20wechat_mp.accounts.search%20%28WeChat%20Official%20Account%20name%20search%29.) · [Open in Claude](https://claude.ai/new?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fwechat_mp%2Faccounts%2Fsearch.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20wechat_mp.accounts.search%20%28WeChat%20Official%20Account%20name%20search%29.)

## Related

Part of DataXAPI's Social media data. The same key also works for: Creators, Ads, E-commerce.

The same thing on other platforms: [Douyin user search](https://dataxapi.com/apis/douyin/users/search/), [Kuaishou user search](https://dataxapi.com/apis/kuaishou/users/search/), [Instagram user search](https://dataxapi.com/apis/instagram/users/search/), [TikTok user search](https://dataxapi.com/apis/tiktok/users/search/), [Weibo user search](https://dataxapi.com/apis/weibo/users/search/), [X user search](https://dataxapi.com/apis/x/users/search/), [Xiaohongshu user search](https://dataxapi.com/apis/xiaohongshu/users/search/), [YouTube channel search](https://dataxapi.com/apis/youtube/channels/search/), [WeChat Official Account live search](https://dataxapi.com/apis/wechat/accounts/search/), [WeChat Channels account search](https://dataxapi.com/apis/wechat_channels/users/search/), [Zhihu user search](https://dataxapi.com/apis/zhihu/users/search/)

More Social media data on other platforms: [Bilibili user profile](https://dataxapi.com/apis/bilibili/users/get/), [Douyin user profile](https://dataxapi.com/apis/douyin/users/get/), [Kuaishou user profile](https://dataxapi.com/apis/kuaishou/users/get/), [Telegram channel profile](https://dataxapi.com/apis/telegram/channels/get/), [Facebook page profile](https://dataxapi.com/apis/facebook/pages/get/), [LinkedIn company page](https://dataxapi.com/apis/linkedin/companies/get/), [Threads user profile](https://dataxapi.com/apis/threads/users/get/), [Instagram user profile](https://dataxapi.com/apis/instagram/users/get/), [TikTok user profile](https://dataxapi.com/apis/tiktok/users/get/), [Weibo post likers](https://dataxapi.com/apis/weibo/posts/likers/list/), [Weibo user followers](https://dataxapi.com/apis/weibo/users/followers/list/), [Weibo user profile](https://dataxapi.com/apis/weibo/users/get/)

WeChat Official Accounts endpoints: [WeChat Official Account articles](https://dataxapi.com/apis/wechat_mp/accounts/articles/list/), [WeChat Official Account profile](https://dataxapi.com/apis/wechat_mp/accounts/get/), [WeChat Official Account article comments](https://dataxapi.com/apis/wechat_mp/articles/comments/list/), [WeChat Official Account article detail](https://dataxapi.com/apis/wechat_mp/articles/get/), [WeChat Official Account article stats](https://dataxapi.com/apis/wechat_mp/articles/metrics/), [WeChat Official Account comment replies](https://dataxapi.com/apis/wechat_mp/comments/replies/list/), [WeChat Official Account name search](https://dataxapi.com/apis/wechat_mp/accounts/search/), [WeChat Official Account owner](https://dataxapi.com/apis/wechat_mp/accounts/owner/get/)

How-to guides and answers: [What WeChat data APIs are there? Official Accounts, Channels and WeChat Search (2026)](https://dataxapi.com/answers/wechat-data-apis/), [Which APIs get WeChat Official Account data: past articles, full text, reads, comments? (2026)](https://dataxapi.com/answers/wechat-official-account-data-apis/), [How do I find an industry's hit articles on WeChat Official Accounts? (2026)](https://dataxapi.com/answers/wechat-official-account-hit-articles-by-industry/), [WeChat Official Account API for AI agents and LLMs: fewer tokens, called from Claude and Cursor (2026)](https://dataxapi.com/answers/wechat-official-account-api-for-ai-agents/), [WeChat Official Account follower count: estimated followers, lead-article reads and posting rate (2026)](https://dataxapi.com/answers/wechat-official-account-follower-count/)

Skills that use this endpoint: [Finding accounts and creators](https://dataxapi.com/skills/creators/)

Related: [All WeChat Official Accounts endpoints](https://dataxapi.com/apis/wechat_mp/), [Social media data](https://dataxapi.com/categories/social/), [The same thing on 12 platforms, side by side](https://dataxapi.com/roles/accounts-search/), [The account object's fields](https://dataxapi.com/docs/objects/account/)

## Questions

### How much does the WeChat Official Account name search API cost?

$0.05635 per item returned, at least $0.0600 and at most $0.84525 a call. The most one call can cost is $0.84525.

### When am I not charged?

Errors and timeouts are not charged.

### How many items does one call return, and how do I get the next page?

About 5 items a page, 15 at most. Set it with limit. Everything comes in one page; no cursor is issued.

---

Last checked 2026-11-28 06:28 UTC. Catalog revision ceced48b38f71468. [HTML version](https://dataxapi.com/apis/wechat_mp/accounts/search/)
