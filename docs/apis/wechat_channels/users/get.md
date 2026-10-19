# WeChat Channels account profile API

Get a WeChat Channels account by its ID: name, signature, avatar, IP location, number of videos. One object a call; $0.0200 per call. Errors, timeouts and objects that do not exist are not charged.

- Endpoint: `GET https://api.dataxapi.com/v1/wechat_channels/users/get`
- ID: `wechat_channels.users.get`
- Also known as: wechat channels profile, channels account info
- Price: $0.0200 / call
- Live status is not on this page, which is a snapshot. Read it with `GET https://api.dataxapi.com/v1/catalog/status`
- Returns: 1 object, one account object
- Returns the standard account object, the same on every platform
- [Run it in the Playground](https://dataxapi.com/console/playground/?capability=wechat_channels.users.get&params=%7B%22id%22%3A%22v2_060000231003b20faec8c5e5811dc3ddce02ec30b0772029a703e1b9f446ba147658bbcfab81%40finder%22%7D)
- In Chinese: [微信视频号账号资料 API](https://dataxapi.com/zh/apis/wechat_channels/users/get/)

## What you get

The first row of a response recorded 2026-10-12 19:03 UTC.

| Field | Value |
| --- | --- |
| metrics.posts | 12,415 |

## Parameters

| Parameter | Type | required | Description |
| --- | --- | --- | --- |
| `id` | text | Yes | The Channels account's ID, starting with v2_ and ending in @finder; a video's author.id is one. Example: `v2_060000231003b20faec8c5e5811dc3ddce02ec30b0772029a703e1b9f446ba147658bbcfab81@finder`. |
| `view` | text |  | How much of each item to return. All three cost the same. Values: `compact`, `standard` (default), `full`. |
| `fields` | list of text |  | Return only these fields. Each by its path, such as `author.name`. |

## Returned fields

`data.item` is one account object. Stable: fields are only ever added.

Three views: `compact` (the most used fields, long text cut short), `standard` (the default: every standard field) and `full` (adds `ext`, the platform's own fields). A field is in the view named and in every larger one.

| Field | Type | Description | From view | This endpoint |
| --- | --- | --- | --- | --- |
| `id` | text | ID. | `compact` | Yes |
| `username` | text | Handle. | `compact` | The platform has none |
| `name` | text | Display name. | `compact` | Yes |
| `url` | link | Link to the profile. | `compact` | The platform has none |
| `bio` | text | Bio. Long text: the compact view keeps the first 500 characters and says so in `warnings`. | `compact` | Yes |
| `avatar_url` | link | Avatar. | `standard` | Yes |
| `verified` | yes/no | Whether the account is verified. | `standard` | Not provided here |
| `created_at` | time | When the account was created. | `standard` | Not provided here |
| `metrics` | object | Account counts. | `compact` | Yes |
| `metrics.followers` | integer | Followers. | `compact` | Not provided here |
| `metrics.following` | integer | Following. | `compact` | The platform has none |
| `metrics.posts` | integer | Posts published. | `compact` | Yes |
| `ext.ip_location` | text | IP location as the platform shows it. | `full` | Yes |
| `approximate` | list of object | Which numbers of this item are approximate or lower bounds; absent when all are exact. | `compact` | Yes |
| `approximate[].field` | text | Path of the field, such as metrics.views. | `compact` | Yes |
| `approximate[].kind` | text | Approximate, or a lower bound. Values: `approximate`, `lower_bound`. | `compact` | Yes |

A field with no value on an item is `null`. A field this endpoint cannot give is left out and listed in `meta.unavailable`.

Typical size of one item: `compact` 187 B, `standard` 336 B, `full` 368 B (measured on the response recorded 2026-10-12 19:03 UTC).

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
curl -G "https://api.dataxapi.com/v1/wechat_channels/users/get" \
  --data-urlencode "id=v2_060000231003b20faec8c5e5811dc3ddce02ec30b0772029a703e1b9f446ba147658bbcfab81@finder" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.wechat_channels.users.get(id="v2_060000231003b20faec8c5e5811dc3ddce02ec30b0772029a703e1b9f446ba147658bbcfab81@finder")
print(result["data"]["item"])
```

### TypeScript

```typescript
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.wechat_channels.users.get({ id: "v2_060000231003b20faec8c5e5811dc3ddce02ec30b0772029a703e1b9f446ba147658bbcfab81@finder" });
console.log(result.data.item);
```

### CLI

```bash
dataxapi call wechat_channels.users.get id=v2_060000231003b20faec8c5e5811dc3ddce02ec30b0772029a703e1b9f446ba147658bbcfab81@finder
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

Add this to your MCP client, then ask your agent to call `wechat_channels.users.get`.

## Responses

### 200

From a response recorded 2026-10-12 19:03 UTC. Names, text and IDs are examples, and so are the links: none is the recorded one (the page shows no one's personal data); the figures are as recorded. Long lists are cut. The request ID, cursor and balance are made up.

Size as sent: 811 B in the standard view (662 B compact, 843 B full).

```jsonc
{
  "code": "ok",
  "request_id": "d6d6f66b-c375-4a2f-9949-11fe1b2c1052",
  "data": {
    "item": {
      "id": "v2_060000231003b20fadaab9d0dce2d5f0e671a9d94276bb814c12ed4aa5cc522c32e4b8f9bc@finder",
      "name": "阿杰爱折腾",
      "bio": "记录生活里的小确幸｜合作请私信",
      "avatar_url": "https://wx.qlogo.cn/mmhead/hycpkY259bVagZ2jedv2eNX0gku55yt0HATagxPX/132",
      "metrics": { "posts": 12415 }
    }
  },
  "warnings": [],
  "meta": {
    "capability": "wechat_channels.users.get",
    "result_status": "complete",
    "fetched_at": "2026-10-12T19:03:55.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "username": "platform",
      "url": "platform",
      "verified": "capability",
      "created_at": "capability",
      "metrics.followers": "capability",
      "metrics.following": "platform"
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
  "request_id": "3f7a1ba1-6f0f-4509-ba3b-5f76c95a058d",
  "message": "A parameter is invalid",
  "message_zh": "参数不合法",
  "charged": false,
  "retry": "after_fix",
  "retry_after_seconds": null,
  "param": null,
  "problems": ["id is required"],
  "docs_url": "https://dataxapi.com/docs/errors#invalid_params"
}
```

### 402

An example written to the specification, not a recorded response.

```json
{
  "code": "insufficient_balance",
  "request_id": "08b04777-409c-485b-8a80-902c83c22561",
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
  "request_id": "a15b5119-e4f6-4634-be94-7cf5053f8930",
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
  "request_id": "c6341a0d-551c-4502-8d6f-8a2dd8a07a7e",
  "message": "The data source failed",
  "message_zh": "数据来源出错",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

[This example as a JSON file](https://dataxapi.com/apis/wechat_channels/users/get.example.json)

## Use it in your AI

`dataxapi setup` gives the agents on your machine (Claude Code, Codex, Cursor) the DataXAPI MCP server and the base skill. The key is read from DATAXAPI_API_KEY; none is written into a file.

MCP server: `https://api.dataxapi.com/mcp`. The entry for your client is under MCP in the request examples of this page; then ask your agent to call `wechat_channels.users.get`.

Or paste this to any AI:

> Read https://dataxapi.com/apis/wechat_channels/users/get.md and help me use the DataXAPI endpoint wechat_channels.users.get (WeChat Channels account profile).

[Open in ChatGPT](https://chatgpt.com/?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fwechat_channels%2Fusers%2Fget.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20wechat_channels.users.get%20%28WeChat%20Channels%20account%20profile%29.) · [Open in Claude](https://claude.ai/new?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fwechat_channels%2Fusers%2Fget.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20wechat_channels.users.get%20%28WeChat%20Channels%20account%20profile%29.)

## Related

Part of DataXAPI's Social media data. The same key also works for: Creators, Ads, E-commerce.

The same thing on other platforms: [Bilibili user profile](https://dataxapi.com/apis/bilibili/users/get/), [Douyin user profile](https://dataxapi.com/apis/douyin/users/get/), [Kuaishou user profile](https://dataxapi.com/apis/kuaishou/users/get/), [Telegram channel profile](https://dataxapi.com/apis/telegram/channels/get/), [Facebook page profile](https://dataxapi.com/apis/facebook/pages/get/), [LinkedIn company page](https://dataxapi.com/apis/linkedin/companies/get/), [Threads user profile](https://dataxapi.com/apis/threads/users/get/), [Instagram user profile](https://dataxapi.com/apis/instagram/users/get/), [TikTok user profile](https://dataxapi.com/apis/tiktok/users/get/), [Weibo user profile](https://dataxapi.com/apis/weibo/users/get/), [X user profile](https://dataxapi.com/apis/x/users/get/), [Xiaohongshu user profile](https://dataxapi.com/apis/xiaohongshu/users/get/), [YouTube channel profile](https://dataxapi.com/apis/youtube/channels/get/), [WeChat Official Account profile](https://dataxapi.com/apis/wechat_mp/accounts/get/), [Reddit user profile](https://dataxapi.com/apis/reddit/users/get/), [Zhihu user profile](https://dataxapi.com/apis/zhihu/users/get/)

More Social media data on other platforms: [Douyin user search](https://dataxapi.com/apis/douyin/users/search/), [Kuaishou user search](https://dataxapi.com/apis/kuaishou/users/search/), [Instagram user search](https://dataxapi.com/apis/instagram/users/search/), [TikTok user search](https://dataxapi.com/apis/tiktok/users/search/), [Weibo post likers](https://dataxapi.com/apis/weibo/posts/likers/list/), [Weibo user followers](https://dataxapi.com/apis/weibo/users/followers/list/), [Weibo user search](https://dataxapi.com/apis/weibo/users/search/), [X post retweeters](https://dataxapi.com/apis/x/posts/retweeters/list/)

WeChat Channels endpoints: [WeChat Channels account profile](https://dataxapi.com/apis/wechat_channels/users/get/), [WeChat Channels video detail](https://dataxapi.com/apis/wechat_channels/videos/get/), [WeChat Channels video comments](https://dataxapi.com/apis/wechat_channels/videos/comments/list/), [WeChat Channels account collections](https://dataxapi.com/apis/wechat_channels/users/collections/list/), [WeChat Channels collection videos](https://dataxapi.com/apis/wechat_channels/collections/videos/list/), [WeChat Channels account videos](https://dataxapi.com/apis/wechat_channels/users/videos/list/), [WeChat Channels video search](https://dataxapi.com/apis/wechat_channels/videos/search/)

How-to guides and answers: [How do I get WeChat Channels data?](https://dataxapi.com/answers/how-to-get-wechat-channels-data/)

Skills that use this endpoint: [Account check-up](https://dataxapi.com/skills/account-audit/)

Related: [All WeChat Channels endpoints](https://dataxapi.com/apis/wechat_channels/), [Social media data](https://dataxapi.com/categories/social/), [The same thing on 17 platforms, side by side](https://dataxapi.com/roles/accounts-get/), [The account object's fields](https://dataxapi.com/docs/objects/account/)

## Questions

### How much does the WeChat Channels account profile API cost?

$0.0200 per call. The most one call can cost is $0.0200.

### When am I not charged?

Errors, timeouts and objects that do not exist are not charged.

### What happens if the object does not exist?

The answer is 404 not_found and nothing is charged. reason says which: not_found (it does not exist) or private_or_deleted.

---

Last checked 2026-10-18 19:59 UTC. Catalog revision c48ce454ae6c4c65. [HTML version](https://dataxapi.com/apis/wechat_channels/users/get/)
