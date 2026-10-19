# Telegram channel profile API

Get a public Telegram channel by its handle: name, description, subscriber count, verification. One object a call; $0.0020 per call. Errors, timeouts and objects that do not exist are not charged.

- Endpoint: `GET https://api.dataxapi.com/v1/telegram/channels/get`
- ID: `telegram.channels.get`
- Also known as: telegram channel info, tg channel
- Price: $0.0020 / call
- Live status is not on this page, which is a snapshot. Read it with `GET https://api.dataxapi.com/v1/catalog/status`
- Returns: 1 object, one account object
- Returns the standard account object, the same on every platform
- `username` is in the link: `t.me/<username>/401`.
- [Run it in the Playground](https://dataxapi.com/console/playground/?capability=telegram.channels.get&params=%7B%22username%22%3A%22telegram%22%7D)
- In Chinese: [Telegram 频道资料 API](https://dataxapi.com/zh/apis/telegram/channels/get/)

## What you get

The first 2 rows of a response recorded 2026-10-12 19:04 UTC.

| Field | Value |
| --- | --- |
| verified | true |
| metrics.followers | 10,816,949 |

## Parameters

| Parameter | Type | required | Description |
| --- | --- | --- | --- |
| `username` | text | Yes | The channel's handle, without the @. Example: `telegram`. |
| `view` | text |  | How much of each item to return. All three cost the same. Values: `compact`, `standard` (default), `full`. |
| `fields` | list of text |  | Return only these fields. Each by its path, such as `author.name`. |

## Returned fields

`data.item` is one account object. Stable: fields are only ever added.

Three views: `compact` (the most used fields, long text cut short), `standard` (the default: every standard field) and `full` (adds `ext`, the platform's own fields). A field is in the view named and in every larger one.

| Field | Type | Description | From view | This endpoint |
| --- | --- | --- | --- | --- |
| `id` | text | ID. | `compact` | The platform has none |
| `username` | text | Handle. | `compact` | Yes |
| `name` | text | Display name. | `compact` | Yes |
| `url` | link | Link to the profile. | `compact` | Yes |
| `bio` | text | Bio. Long text: the compact view keeps the first 500 characters and says so in `warnings`. | `compact` | Yes |
| `avatar_url` | link | Avatar. | `standard` | Yes |
| `verified` | yes/no | Whether the account is verified. | `standard` | Yes |
| `created_at` | time | When the account was created. | `standard` | Not provided here |
| `metrics` | object | Account counts. | `compact` | Yes |
| `metrics.followers` | integer | Followers. On this platform: Subscribers. | `compact` | Yes |
| `metrics.following` | integer | Following. | `compact` | The platform has none |
| `metrics.posts` | integer | Posts published. | `compact` | Not provided here |
| `approximate` | list of object | Which numbers of this item are approximate or lower bounds; absent when all are exact. | `compact` | Yes |
| `approximate[].field` | text | Path of the field, such as metrics.views. | `compact` | Yes |
| `approximate[].kind` | text | Approximate, or a lower bound. Values: `approximate`, `lower_bound`. | `compact` | Yes |

A field with no value on an item is `null`. A field this endpoint cannot give is left out and listed in `meta.unavailable`.

Typical size of one item: `compact` 202 B, `standard` 609 B, `full` 609 B (measured on the response recorded 2026-10-12 19:04 UTC).

## Paging

One object per call: there is nothing to page.

## When you are charged

| Case | Charged |
| --- | --- |
| A result with data | $0.0020, once per call |
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
curl -G "https://api.dataxapi.com/v1/telegram/channels/get" \
  --data-urlencode "username=telegram" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.telegram.channels.get(username="telegram")
print(result["data"]["item"])
```

### TypeScript

```typescript
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.telegram.channels.get({ username: "telegram" });
console.log(result.data.item);
```

### CLI

```bash
dataxapi call telegram.channels.get username=telegram
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

Add this to your MCP client, then ask your agent to call `telegram.channels.get`.

## Responses

### 200

From a response recorded 2026-10-12 19:04 UTC. Names, text and IDs are examples, and so are the links: none is the recorded one (the page shows no one's personal data); the figures are as recorded. Long lists are cut. The request ID, cursor and balance are made up.

Size as sent: 1.0 KB in the standard view (622 B compact, 1.0 KB full).

```jsonc
{
  "code": "ok",
  "request_id": "d284a88b-7dbb-4ad7-bac7-00d642b832aa",
  "data": {
    "item": {
      "username": "northside_coffee",
      "name": "Leo Park",
      "url": "https://t.me/1159438273",
      "bio": "Based in Portland. Mostly outside.",
      "avatar_url": "https://cdn4.telesco.pe/file/0RCU-heCrTsxKZb11Ho1inlKt7V1YOeT.jpg",
      "verified": true,
      "metrics": { "followers": 10816949 }
    }
  },
  "warnings": [],
  "meta": {
    "capability": "telegram.channels.get",
    "result_status": "complete",
    "fetched_at": "2026-10-12T19:04:43.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "id": "platform",
      "created_at": "capability",
      "metrics.following": "platform",
      "metrics.posts": "capability"
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
  "request_id": "31ce0658-faf5-4297-8138-8f6f0fcbcf16",
  "message": "A parameter is invalid",
  "message_zh": "参数不合法",
  "charged": false,
  "retry": "after_fix",
  "retry_after_seconds": null,
  "param": null,
  "problems": ["username is required"],
  "docs_url": "https://dataxapi.com/docs/errors#invalid_params"
}
```

### 402

An example written to the specification, not a recorded response.

```json
{
  "code": "insufficient_balance",
  "request_id": "e95813eb-b690-4d5d-b9be-5a1695439b2e",
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
  "request_id": "84b061f1-7f74-4f8a-b714-6f0e3ef2534e",
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
  "request_id": "cf29c3c3-aad7-4e63-844f-a00870c89f6d",
  "message": "The data source failed",
  "message_zh": "数据来源出错",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

[This example as a JSON file](https://dataxapi.com/apis/telegram/channels/get.example.json)

## Use it in your AI

`dataxapi setup` gives the agents on your machine (Claude Code, Codex, Cursor) the DataXAPI MCP server and the base skill. The key is read from DATAXAPI_API_KEY; none is written into a file.

MCP server: `https://api.dataxapi.com/mcp`. The entry for your client is under MCP in the request examples of this page; then ask your agent to call `telegram.channels.get`.

Or paste this to any AI:

> Read https://dataxapi.com/apis/telegram/channels/get.md and help me use the DataXAPI endpoint telegram.channels.get (Telegram channel profile).

[Open in ChatGPT](https://chatgpt.com/?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Ftelegram%2Fchannels%2Fget.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20telegram.channels.get%20%28Telegram%20channel%20profile%29.) · [Open in Claude](https://claude.ai/new?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Ftelegram%2Fchannels%2Fget.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20telegram.channels.get%20%28Telegram%20channel%20profile%29.)

## Related

Part of DataXAPI's Social media data. The same key also works for: Creators, Ads, E-commerce.

The same thing on other platforms: [Bilibili user profile](https://dataxapi.com/apis/bilibili/users/get/), [Douyin user profile](https://dataxapi.com/apis/douyin/users/get/), [Kuaishou user profile](https://dataxapi.com/apis/kuaishou/users/get/), [Facebook page profile](https://dataxapi.com/apis/facebook/pages/get/), [LinkedIn company page](https://dataxapi.com/apis/linkedin/companies/get/), [Threads user profile](https://dataxapi.com/apis/threads/users/get/), [Instagram user profile](https://dataxapi.com/apis/instagram/users/get/), [TikTok user profile](https://dataxapi.com/apis/tiktok/users/get/), [Weibo user profile](https://dataxapi.com/apis/weibo/users/get/), [X user profile](https://dataxapi.com/apis/x/users/get/), [Xiaohongshu user profile](https://dataxapi.com/apis/xiaohongshu/users/get/), [YouTube channel profile](https://dataxapi.com/apis/youtube/channels/get/), [WeChat Channels account profile](https://dataxapi.com/apis/wechat_channels/users/get/), [WeChat Official Account profile](https://dataxapi.com/apis/wechat_mp/accounts/get/), [Reddit user profile](https://dataxapi.com/apis/reddit/users/get/), [Zhihu user profile](https://dataxapi.com/apis/zhihu/users/get/)

More Social media data on other platforms: [Douyin user search](https://dataxapi.com/apis/douyin/users/search/), [Kuaishou user search](https://dataxapi.com/apis/kuaishou/users/search/), [Instagram user search](https://dataxapi.com/apis/instagram/users/search/), [TikTok user search](https://dataxapi.com/apis/tiktok/users/search/), [Weibo post likers](https://dataxapi.com/apis/weibo/posts/likers/list/), [Weibo user followers](https://dataxapi.com/apis/weibo/users/followers/list/), [Weibo user search](https://dataxapi.com/apis/weibo/users/search/), [X post retweeters](https://dataxapi.com/apis/x/posts/retweeters/list/), [X user followers](https://dataxapi.com/apis/x/users/followers/list/), [X user following](https://dataxapi.com/apis/x/users/following/list/), [X user search](https://dataxapi.com/apis/x/users/search/), [Xiaohongshu user search](https://dataxapi.com/apis/xiaohongshu/users/search/)

Telegram endpoints: [Telegram channel profile](https://dataxapi.com/apis/telegram/channels/get/), [Telegram channel messages](https://dataxapi.com/apis/telegram/channels/messages/list/), [Telegram message detail](https://dataxapi.com/apis/telegram/messages/get/)

Skills that use this endpoint: [Account check-up](https://dataxapi.com/skills/account-audit/)

Related: [All Telegram endpoints](https://dataxapi.com/apis/telegram/), [Social media data](https://dataxapi.com/categories/social/), [The same thing on 17 platforms, side by side](https://dataxapi.com/roles/accounts-get/), [The account object's fields](https://dataxapi.com/docs/objects/account/)

## Questions

### How much does the Telegram channel profile API cost?

$0.0020 per call. The most one call can cost is $0.0020.

### When am I not charged?

Errors, timeouts and objects that do not exist are not charged.

### What happens if the object does not exist?

The answer is 404 not_found and nothing is charged. reason says which: not_found (it does not exist) or private_or_deleted.

---

Last checked 2026-10-18 19:59 UTC. Catalog revision c48ce454ae6c4c65. [HTML version](https://dataxapi.com/apis/telegram/channels/get/)
