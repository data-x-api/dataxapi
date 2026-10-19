# WeChat Channels account collections API

Get every public collection of a WeChat Channels account by the account's ID: name, description, cover, number of videos, when it was last updated. A collection's ID is what the endpoint that lists its videos takes. About 7 items a call, 100 at most; $0.0200 per call. Errors, timeouts and objects that do not exist are not charged; an empty result is charged $0.0200.

- Endpoint: `GET https://api.dataxapi.com/v1/wechat_channels/users/collections/list`
- ID: `wechat_channels.users.collections.list`
- Also known as: wechat channels collections, channels account playlists
- Price: $0.0200 / call
- Live status is not on this page, which is a snapshot. Read it with `GET https://api.dataxapi.com/v1/catalog/status`
- Returns: up to 100 a page, everything in one answer, no paging
- Returns channels collection, a preview structure that may still change
- [Run it in the Playground](https://dataxapi.com/console/playground/?capability=wechat_channels.users.collections.list&params=%7B%22id%22%3A%22v2_060000231003b20faec8c5e5811dc3ddce02ec30b0772029a703e1b9f446ba147658bbcfab81%40finder%22%7D)
- In Chinese: [微信视频号账号的合集 API](https://dataxapi.com/zh/apis/wechat_channels/users/collections/list/)

## What you get

The first 2 rows of a response recorded 2026-10-13 03:26 UTC.

| Field | Value |
| --- | --- |
| updated_at | 2026-10-12 03:59 UTC |
| metrics.videos | 42 |

## Parameters

| Parameter | Type | required | Description |
| --- | --- | --- | --- |
| `id` | text | Yes | The Channels account's ID, starting with v2_ and ending in @finder; a video's author.id is one. Example: `v2_060000231003b20faec8c5e5811dc3ddce02ec30b0772029a703e1b9f446ba147658bbcfab81@finder`. |
| `view` | text |  | How much of each item to return. All three cost the same. Values: `compact`, `standard` (default), `full`. |
| `fields` | list of text |  | Return only these fields. Each by its path, such as `author.name`. |

## Returned fields

`data.items` is a list of channels collection objects. Preview: the structure may change, announced beforehand.

Three views: `compact` (the most used fields, long text cut short), `standard` (the default: every standard field) and `full` (adds `ext`, the platform's own fields). A field is in the view named and in every larger one.

| Field | Type | Description | From view | This endpoint |
| --- | --- | --- | --- | --- |
| `id` | text | The collection's ID; pass it unchanged to the endpoint that lists its videos. | `compact` | Yes |
| `name` | text | Name of the collection. | `compact` | Yes |
| `description` | text | What the collection says it is about; null when it says nothing. Long text: the compact view keeps the first 500 characters and says so in `warnings`. | `compact` | Yes |
| `cover_url` | link | Address of the collection's cover image. | `standard` | Yes |
| `updated_at` | time | When the collection was last updated. | `compact` | Yes |
| `metrics` | object | Collection counts. | `compact` | Yes |
| `metrics.videos` | integer | Videos in the collection. | `compact` | Yes |
| `approximate` | list of object | Which numbers of this item are approximate or lower bounds; absent when all are exact. | `compact` | Yes |
| `approximate[].field` | text | Path of the field, such as metrics.views. | `compact` | Yes |
| `approximate[].kind` | text | Approximate, or a lower bound. Values: `approximate`, `lower_bound`. | `compact` | Yes |

A field with no value on an item is `null`. A field this endpoint cannot give is left out and listed in `meta.unavailable`.

Typical size of one item: `compact` 141 B, `standard` 356 B, `full` 356 B (measured on the response recorded 2026-10-13 03:26 UTC).

## Paging

About 7 items a page, 100 at most. The page size is the platform's; `limit` is not accepted.

Everything comes in one page; no cursor is issued.

## When you are charged

| Case | Charged |
| --- | --- |
| A result with data | $0.0200, once per call |
| An empty result | $0.0200 |
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
curl -G "https://api.dataxapi.com/v1/wechat_channels/users/collections/list" \
  --data-urlencode "id=v2_060000231003b20faec8c5e5811dc3ddce02ec30b0772029a703e1b9f446ba147658bbcfab81@finder" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.wechat_channels.users.collections.list(id="v2_060000231003b20faec8c5e5811dc3ddce02ec30b0772029a703e1b9f446ba147658bbcfab81@finder")
print(result["data"]["items"])
```

### TypeScript

```typescript
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.wechat_channels.users.collections.list({ id: "v2_060000231003b20faec8c5e5811dc3ddce02ec30b0772029a703e1b9f446ba147658bbcfab81@finder" });
console.log(result.data.items);
```

### CLI

```bash
dataxapi call wechat_channels.users.collections.list id=v2_060000231003b20faec8c5e5811dc3ddce02ec30b0772029a703e1b9f446ba147658bbcfab81@finder
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

Add this to your MCP client, then ask your agent to call `wechat_channels.users.collections.list`.

## Responses

### 200

From a response recorded 2026-10-13 03:26 UTC. Names, text and IDs are examples, and so are the links: none is the recorded one (the page shows no one's personal data); the figures are as recorded. Long lists are cut. The request ID, cursor and balance are made up.

Size as sent: 1.1 KB in the standard view (703 B compact, 1.1 KB full).

```jsonc
{
  "code": "ok",
  "request_id": "83573bec-6e72-483d-93c7-6f291120ef7b",
  "data": {
    "items": [
      {
        "id": "14333950278518174787",
        "name": "周末厨房",
        "description": null,
        "cover_url": "https://mmbiz.qpic.cn/mmbiz_jpg/7mFJa9ICgY3VTnOrojq32DWvk8rh3NMhae2Gogia/640",
        "updated_at": "2026-10-12T03:59:02.000Z",
        "metrics": { "videos": 42 }
      },
      // … 1 more
    ]
  },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 2
  },
  "warnings": [],
  "meta": {
    "capability": "wechat_channels.users.collections.list",
    "result_status": "complete",
    "fetched_at": "2026-10-13T03:26:45.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {},
    "billing": {
      "amount": "0.02",
      "currency": "USD",
      "balance_after": "9.98"
    }
  }
}
```

### Empty

From a recording of 2026-10-13 03:26 UTC, edited by hand to show this case. The request ID and balance are made up.

Size as sent: 421 B in the standard view (421 B compact, 421 B full).

```jsonc
{
  "code": "ok",
  "request_id": "0942459e-d7e8-4ef2-88cc-b3e1d64c7d93",
  "data": { "items": [] },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 0
  },
  "warnings": [],
  "meta": {
    "capability": "wechat_channels.users.collections.list",
    "result_status": "empty",
    "fetched_at": "2026-10-13T03:26:45.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {},
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
  "request_id": "13a3496e-af0b-4398-a952-5caf56f95a47",
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
  "request_id": "43706021-785c-4e3d-93b9-d452c99699ea",
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
  "request_id": "338409a7-5580-44e6-bb76-9c6ffb0e3e10",
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
  "request_id": "81980c28-603e-4b30-a547-62848b58988e",
  "message": "The data source failed",
  "message_zh": "数据来源出错",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

[This example as a JSON file](https://dataxapi.com/apis/wechat_channels/users/collections/list.example.json)

## Use it in your AI

`dataxapi setup` gives the agents on your machine (Claude Code, Codex, Cursor) the DataXAPI MCP server and the base skill. The key is read from DATAXAPI_API_KEY; none is written into a file.

MCP server: `https://api.dataxapi.com/mcp`. The entry for your client is under MCP in the request examples of this page; then ask your agent to call `wechat_channels.users.collections.list`.

Or paste this to any AI:

> Read https://dataxapi.com/apis/wechat_channels/users/collections/list.md and help me use the DataXAPI endpoint wechat_channels.users.collections.list (WeChat Channels account collections).

[Open in ChatGPT](https://chatgpt.com/?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fwechat_channels%2Fusers%2Fcollections%2Flist.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20wechat_channels.users.collections.list%20%28WeChat%20Channels%20account%20collections%29.) · [Open in Claude](https://claude.ai/new?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fwechat_channels%2Fusers%2Fcollections%2Flist.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20wechat_channels.users.collections.list%20%28WeChat%20Channels%20account%20collections%29.)

## Related

Part of DataXAPI's Social media data. The same key also works for: Creators, Ads, E-commerce.

More Social media data on other platforms: [Douyin comment replies](https://dataxapi.com/apis/douyin/comments/replies/list/), [Douyin hashtag videos](https://dataxapi.com/apis/douyin/hashtags/videos/list/), [Bilibili comment replies](https://dataxapi.com/apis/bilibili/comments/replies/list/), [Bilibili hot searches](https://dataxapi.com/apis/bilibili/trends/list/), [Bilibili user profile](https://dataxapi.com/apis/bilibili/users/get/), [Bilibili user videos](https://dataxapi.com/apis/bilibili/users/videos/list/), [Bilibili video comments](https://dataxapi.com/apis/bilibili/videos/comments/list/), [Bilibili video detail](https://dataxapi.com/apis/bilibili/videos/get/), [Bilibili video search](https://dataxapi.com/apis/bilibili/videos/search/), [Bilibili popular videos](https://dataxapi.com/apis/bilibili/videos/trending/), [Douyin trend-index brand trends](https://dataxapi.com/apis/douyin/index/brands/history/), [Douyin trend-index brand comparison](https://dataxapi.com/apis/douyin/index/brands/metrics/), [Douyin trend-index creator top videos](https://dataxapi.com/apis/douyin/index/creators/videos/list/), [Douyin trend-index keyword audience](https://dataxapi.com/apis/douyin/index/keywords/audience/get/), [Douyin trend-index keyword trends](https://dataxapi.com/apis/douyin/index/keywords/history/), [Douyin trend-index related keywords](https://dataxapi.com/apis/douyin/index/keywords/related/), [Douyin trend-index live hot topics](https://dataxapi.com/apis/douyin/index/trends/list/), [Douyin trend-index keyword hot videos](https://dataxapi.com/apis/douyin/index/videos/search/), [Douyin hot search board](https://dataxapi.com/apis/douyin/trends/list/), [Douyin user profile](https://dataxapi.com/apis/douyin/users/get/), [Douyin creator engagement and follower trends](https://dataxapi.com/apis/douyin/users/history/), [Douyin user search](https://dataxapi.com/apis/douyin/users/search/), [Douyin user videos](https://dataxapi.com/apis/douyin/users/videos/list/), [Douyin video comments](https://dataxapi.com/apis/douyin/videos/comments/list/)

WeChat Channels endpoints: [WeChat Channels account profile](https://dataxapi.com/apis/wechat_channels/users/get/), [WeChat Channels video detail](https://dataxapi.com/apis/wechat_channels/videos/get/), [WeChat Channels video comments](https://dataxapi.com/apis/wechat_channels/videos/comments/list/), [WeChat Channels account collections](https://dataxapi.com/apis/wechat_channels/users/collections/list/), [WeChat Channels collection videos](https://dataxapi.com/apis/wechat_channels/collections/videos/list/), [WeChat Channels account videos](https://dataxapi.com/apis/wechat_channels/users/videos/list/), [WeChat Channels video search](https://dataxapi.com/apis/wechat_channels/videos/search/)

How-to guides and answers: [How do I get WeChat Channels data?](https://dataxapi.com/answers/how-to-get-wechat-channels-data/)

Related: [All WeChat Channels endpoints](https://dataxapi.com/apis/wechat_channels/), [Social media data](https://dataxapi.com/categories/social/), [The channels collection object's fields](https://dataxapi.com/docs/objects/channels_collection/)

## Questions

### How much does the WeChat Channels account collections API cost?

$0.0200 per call. The most one call can cost is $0.0200.

### When am I not charged?

Errors, timeouts and objects that do not exist are not charged; an empty result is charged $0.0200.

### How many items does one call return, and how do I get the next page?

About 7 items a page, 100 at most. The page size is the platform's; limit is not accepted. Everything comes in one page; no cursor is issued.

### What happens if the object does not exist?

The answer is 404 not_found and nothing is charged. reason says which: not_found (it does not exist) or private_or_deleted.

---

Last checked 2026-10-18 19:59 UTC. Catalog revision c48ce454ae6c4c65. [HTML version](https://dataxapi.com/apis/wechat_channels/users/collections/list/)
