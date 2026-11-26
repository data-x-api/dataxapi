# Weibo post likers API

Get the accounts that most recently liked a Weibo post by post ID, about 50 at a time: name, bio, avatar, verification and its kind, follower and following counts, number of posts, the gender and region their profiles give. About 50 items a call, 100 at most; $0.0020 per call. Errors, timeouts and objects that do not exist are not charged.

- Endpoint: `GET https://api.dataxapi.com/v1/weibo/posts/likers/list`
- ID: `weibo.posts.likers.list`
- Also known as: weibo post likes, who liked a weibo post
- Price: $0.0020 / call
- Live status is not on this page, which is a snapshot. Read it with `GET https://api.dataxapi.com/v1/catalog/status`
- Returns: up to 100 a page, everything in one answer, no paging
- Returns the standard account object, the same on every platform
- `id` is in the link: `m.weibo.cn/detail/<id>`. Or pass the whole link as `url`.
- [Run it in the Playground](https://dataxapi.com/console/playground/?capability=weibo.posts.likers.list&params=%7B%22id%22%3A%225352434046339577%22%7D)
- In Chinese: [微博点赞用户 API](https://dataxapi.com/zh/apis/weibo/posts/likers/list/)

## What you get

The first 5 rows of a response recorded 2026-10-13 03:27 UTC.

| Field | Value |
| --- | --- |
| verified | false |
| created_at | 2016-02-04 09:48 UTC |
| metrics.followers | 94 |
| metrics.following | 135 |
| metrics.posts | 42 |

## Parameters

| Parameter | Type | required | Description |
| --- | --- | --- | --- |
| `id` | text | give exactly one of `id`, `url` | Post ID, a string of digits. With only a link or a share text, give it as url. Example: `5352434046339577`. |
| `url` | text | give exactly one of `id`, `url` | Link to the post, pasted as it is: the site's https://weibo.com/<user>/… (digits or letters after it), the phone site's https://m.weibo.cn/detail/… or /status/…, or a whole share text with one of these in it. Example: `https://m.weibo.cn/detail/5352434046339577`. Full link: `https://m.weibo.cn/detail/5352434046339577`. Share text with a link inside: `看看这条微博 https://m.weibo.cn/detail/5352434046339577 来自微博`. |
| `view` | text |  | How much of each item to return. All three cost the same. Values: `compact`, `standard` (default), `full`. |
| `fields` | list of text |  | Return only these fields. Each by its path, such as `author.name`. |

## Returned fields

`data.items` is a list of account objects. Stable: fields are only ever added.

Three views: `compact` (the most used fields, long text cut short), `standard` (the default: every standard field) and `full` (adds `ext`, the platform's own fields). A field is in the view named and in every larger one.

| Field | Type | Description | From view | This endpoint |
| --- | --- | --- | --- | --- |
| `id` | text | ID. | `compact` | Yes |
| `username` | text | Handle. | `compact` | The platform has none |
| `name` | text | Display name. | `compact` | Yes |
| `url` | link | Link to the profile. | `compact` | Yes |
| `bio` | text | Bio. Long text: the compact view keeps the first 500 characters and says so in `warnings`. | `compact` | Yes |
| `avatar_url` | link | Avatar. | `standard` | Yes |
| `verified` | yes/no | Whether the account is verified. | `standard` | Yes |
| `created_at` | time | When the account was created. | `standard` | Yes |
| `metrics` | object | Account counts. | `compact` | Yes |
| `metrics.followers` | integer | Followers. | `compact` | Yes |
| `metrics.following` | integer | Following. | `compact` | Yes |
| `metrics.posts` | integer | Posts published. | `compact` | Yes |
| `ext.verified_type` | text | Kind of verification: person (an individual, the orange or gold V) or organization (the blue V of a company, a media outlet, a government body and the like); null when not verified. Values: `person`, `organization`. | `full` | Yes |
| `ext.verified_reason` | text | What the verification says, in the platform's words (a brand's 官方微博 or a person's 数码博主, say); null where there is none. | `full` | Yes |
| `ext.gender` | text | Gender as given on the profile: female or male. Values: `female`, `male`. | `full` | Yes |
| `ext.location` | text | The region given on the profile (北京, 广东 深圳, say; 其他 where none was given), not the IP location. | `full` | Yes |
| `approximate` | list of object | Which numbers of this item are approximate or lower bounds; absent when all are exact. | `compact` | Yes |
| `approximate[].field` | text | Path of the field, such as metrics.views. | `compact` | Yes |
| `approximate[].kind` | text | Approximate, or a lower bound. Values: `approximate`, `lower_bound`. | `compact` | Yes |

A field with no value on an item is `null`. A field this endpoint cannot give is left out and listed in `meta.unavailable`.

Typical size of one item: `compact` 174 B, `standard` 381 B, `full` 474 B (measured on the response recorded 2026-10-13 03:27 UTC).

## Paging

About 50 items a page, 100 at most. The page size is the platform's; `limit` is not accepted.

Everything comes in one page; no cursor is issued.

## When you are charged

| Case | Charged |
| --- | --- |
| A result with data | $0.0020, once per call |
| The object does not exist (404) | not charged |
| Invalid parameters, a failure or a timeout | not charged |
| The most one call can cost | $0.0020 (send `X-Max-Price` to refuse anything above your own limit) |

Prices as read 2026-11-26 12:17 UTC, under price book 22, in effect since 2026-11-25 13:46 UTC; the Playground reads the price in force before a run.

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
curl -G "https://api.dataxapi.com/v1/weibo/posts/likers/list" \
  --data-urlencode "id=5352434046339577" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
# pip install dataxapi
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.weibo.posts.likers.list(id="5352434046339577")
print(result["data"]["items"])
```

### TypeScript

```typescript
// npm i @dataxapi/sdk
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.weibo.posts.likers.list({ id: "5352434046339577" });
console.log(result.data.items);
```

### CLI

```bash
dataxapi call weibo.posts.likers.list id=5352434046339577
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

Add this to your MCP client, then ask your agent to call `weibo.posts.likers.list`.

## Responses

### 200

From a response recorded 2026-10-13 03:27 UTC. Names, text and IDs are examples, and so are the links: none is the recorded one (the page shows no one's personal data); the figures are as recorded. Long lists are cut. The request ID, cursor and balance are made up.

Size as sent: 19.0 KB in the standard view (8.9 KB compact, 23.6 KB full).

```jsonc
{
  "code": "ok",
  "request_id": "653535cd-ae78-4542-8627-91bd07eef3f6",
  "data": {
    "items": [
      {
        "id": "7742581401",
        "name": "老周说装备",
        "url": "https://weibo.com/u/7742581401",
        "bio": "只说真话的装备测评，不接硬广",
        "avatar_url": "https://tvax1.sinaimg.cn/crop.0.0.512.512.180/kco75pSBm5n4zQam7maLsd6n.jpg",
        "verified": false,
        "created_at": "2016-02-04T09:48:45.000Z",
        "metrics": { "followers": 94, "following": 135, "posts": 42 }
      },
      // … 49 more
    ]
  },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 50
  },
  "warnings": [],
  "meta": {
    "capability": "weibo.posts.likers.list",
    "result_status": "complete",
    "fetched_at": "2026-10-13T03:27:59.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": { "username": "platform" },
    "billing": {
      "amount": "0.002",
      "currency": "USD",
      "balance_after": "9.998"
    }
  }
}
```

### Empty

From a recording of 2026-10-13 03:27 UTC, edited by hand to show this case. The request ID and balance are made up.

Size as sent: 427 B in the standard view (427 B compact, 427 B full).

```jsonc
{
  "code": "ok",
  "request_id": "74186e63-6463-44f3-8c89-e43063326c9c",
  "data": { "items": [] },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 0
  },
  "warnings": [],
  "meta": {
    "capability": "weibo.posts.likers.list",
    "result_status": "empty",
    "fetched_at": "2026-10-13T03:27:59.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": { "username": "platform" },
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
  "request_id": "05f5f35f-9a1a-478a-976c-6dba5dce5880",
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
  "request_id": "57c79dca-8de8-49a6-a527-ac7882c848e1",
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
  "request_id": "dc188566-3816-4d11-8e2b-eec06d0df2a6",
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
  "request_id": "b4ea746a-9fd0-4734-bb81-01dae7933930",
  "message": "No result came back this time and nothing was charged; retry shortly",
  "message_zh": "这次没有取到结果，没有扣费，可以稍后重试",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

This recorded response is 46k tokens as the platform's own JSON, 7,657 as DataXAPI's JSON, and 2,784 as an AI reads it through DataXAPI's MCP server: 94% fewer (counted 2026-11-06).

[This example as a JSON file](https://dataxapi.com/apis/weibo/posts/likers/list.example.json)

## Use it in your AI

`dataxapi setup` gives the agents on your machine (Claude Code, Codex, Cursor) the DataXAPI MCP server and the base skill. The key is read from DATAXAPI_API_KEY; none is written into a file.

MCP server: `https://api.dataxapi.com/mcp`. The entry for your client is under MCP in the request examples of this page; then ask your agent to call `weibo.posts.likers.list`.

Or paste this to any AI:

> Read https://dataxapi.com/apis/weibo/posts/likers/list.md and help me use the DataXAPI endpoint weibo.posts.likers.list (Weibo post likers).

[Open in ChatGPT](https://chatgpt.com/?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fweibo%2Fposts%2Flikers%2Flist.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20weibo.posts.likers.list%20%28Weibo%20post%20likers%29.) · [Open in Claude](https://claude.ai/new?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fweibo%2Fposts%2Flikers%2Flist.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20weibo.posts.likers.list%20%28Weibo%20post%20likers%29.)

## Related

Part of DataXAPI's Social media data. The same key also works for: Creators, Ads, E-commerce.

More Social media data on other platforms: [Bilibili user profile](https://dataxapi.com/apis/bilibili/users/get/), [Douyin user profile](https://dataxapi.com/apis/douyin/users/get/), [Douyin user search](https://dataxapi.com/apis/douyin/users/search/), [Kuaishou user profile](https://dataxapi.com/apis/kuaishou/users/get/), [Kuaishou user search](https://dataxapi.com/apis/kuaishou/users/search/), [Telegram channel profile](https://dataxapi.com/apis/telegram/channels/get/), [Facebook page profile](https://dataxapi.com/apis/facebook/pages/get/), [LinkedIn company page](https://dataxapi.com/apis/linkedin/companies/get/), [Threads user profile](https://dataxapi.com/apis/threads/users/get/), [Instagram user profile](https://dataxapi.com/apis/instagram/users/get/), [Instagram user search](https://dataxapi.com/apis/instagram/users/search/), [TikTok user profile](https://dataxapi.com/apis/tiktok/users/get/), [TikTok user search](https://dataxapi.com/apis/tiktok/users/search/), [X post retweeters](https://dataxapi.com/apis/x/posts/retweeters/list/), [X user followers](https://dataxapi.com/apis/x/users/followers/list/), [X user following](https://dataxapi.com/apis/x/users/following/list/), [X user profile](https://dataxapi.com/apis/x/users/get/), [X user search](https://dataxapi.com/apis/x/users/search/)

Weibo endpoints: [Weibo comment replies](https://dataxapi.com/apis/weibo/comments/replies/list/), [Weibo post comments](https://dataxapi.com/apis/weibo/posts/comments/list/), [Weibo post detail](https://dataxapi.com/apis/weibo/posts/get/), [Weibo video transcript (video to text)](https://dataxapi.com/apis/weibo/posts/transcript/get/), [Weibo post likers](https://dataxapi.com/apis/weibo/posts/likers/list/), [Weibo realtime search](https://dataxapi.com/apis/weibo/posts/search/), [Weibo hot search board](https://dataxapi.com/apis/weibo/trends/list/), [Weibo user followers](https://dataxapi.com/apis/weibo/users/followers/list/), [Weibo user profile](https://dataxapi.com/apis/weibo/users/get/), [Weibo user posts](https://dataxapi.com/apis/weibo/users/posts/list/), [Weibo user search](https://dataxapi.com/apis/weibo/users/search/), [Weibo video and image downloader](https://dataxapi.com/apis/weibo/posts/media/get/), [Weibo hot search board (backup)](https://dataxapi.com/apis/weibo/backup/trends/list/)

How-to guides and answers: [Weibo data API: posts, comments and trending (2026)](https://dataxapi.com/answers/weibo-data-apis/)

Related: [All Weibo endpoints](https://dataxapi.com/apis/weibo/), [Social media data](https://dataxapi.com/categories/social/), [The account object's fields](https://dataxapi.com/docs/objects/account/)

## Questions

### How much does the Weibo post likers API cost?

$0.0020 per call. The most one call can cost is $0.0020.

### When am I not charged?

Errors, timeouts and objects that do not exist are not charged.

### How many items does one call return, and how do I get the next page?

About 50 items a page, 100 at most. The page size is the platform's; limit is not accepted. Everything comes in one page; no cursor is issued.

### What happens if the object does not exist?

The answer is 404 not_found and nothing is charged. reason says which: not_found (it does not exist) or private_or_deleted.

---

Last checked 2026-11-26 12:17 UTC. Catalog revision 0051cce45e9530b9. [HTML version](https://dataxapi.com/apis/weibo/posts/likers/list/)
