# Douyin Xingtu creator profile API

Get a Douyin creator's profile on Xingtu by Xingtu creator ID: name, location, content categories, followers; one ID also gives the Douyin account ID and handle, several IDs (up to 50) give what a video of each of two lengths costs and the views expected of one instead. One object a call; up to 50 in one request with `ids`; $0.0040 per call. Errors, timeouts and objects that do not exist are not charged; an empty result is free.

- Endpoint: `GET / POST https://api.dataxapi.com/v1/douyin/xingtu/creators/get`
- ID: `douyin.xingtu.creators.get`
- Also known as: xingtu kol profile, douyin influencer profile, Douyin Xingtu creator batch info
- Price: $0.0040 / call
- Live status is not on this page, which is a snapshot. Read it with `GET https://api.dataxapi.com/v1/catalog/status`
- Returns: 1 object, one each, up to 50 in one request
- Returns creator, a preview structure that may still change
- [Run it in the Playground](https://dataxapi.com/console/playground/?capability=douyin.xingtu.creators.get&params=%7B%22id%22%3A%226763236383382306828%22%7D)
- In Chinese: [抖音星图达人资料 API](https://dataxapi.com/zh/apis/douyin/xingtu/creators/get/)

## What you get

The first row of a response recorded 2026-10-12 21:48 UTC.

| Field | Value |
| --- | --- |
| metrics.followers | 25,909,243 |

## Parameters

| Parameter | Type | required | Description |
| --- | --- | --- | --- |
| `id` | text | give exactly one of `id`, `ids` | Xingtu creator ID, a string of digits; not the Douyin account ID: take it from the Xingtu creator search. Example: `6763236383382306828`. |
| `ids` | list of text | give exactly one of `id`, `ids` | Several Xingtu creator IDs, each a string of digits. Example: `["6763236383382306828","6816144920949030920"]`. At most 50 in one request. |
| `view` | text |  | How much of each item to return. All three cost the same. Values: `compact`, `standard` (default), `full`. |
| `fields` | list of text |  | Return only these fields. Each by its path, such as `author.name`. |

A request with `ids` is a POST with a JSON body; every other request is a GET.

## Returned fields

`data.item` is one creator object. Preview: the structure may change, announced beforehand. With `ids` the answer is `data.items`, and what was not found is listed in `data.missing`.

Three views: `compact` (the most used fields, long text cut short), `standard` (the default: every standard field) and `full` (adds `ext`, the platform's own fields). A field is in the view named and in every larger one.

| Field | Type | Description | From view | This endpoint |
| --- | --- | --- | --- | --- |
| `id` | text | The creator's ID in the marketplace. | `compact` | Yes |
| `account_id` | text | ID of the creator's account on the platform, as the platform's account endpoints take it. | `compact` | Depends on the request |
| `username` | text | Handle. | `compact` | Depends on the request |
| `name` | text | Display name. | `compact` | Yes |
| `avatar_url` | link | Avatar. | `standard` | Yes |
| `location` | text | Where the creator is based, in the platform's words. | `standard` | Yes |
| `categories` | list of text | Content categories, first level, in the platform's words. | `compact` | Yes |
| `subcategories` | list of text | Content categories, second level, in the platform's words. | `standard` | Yes |
| `metrics` | object | Creator counts. | `compact` | Yes |
| `metrics.followers` | integer | Followers. | `compact` | Yes |
| `ext.uid` | text | The numeric ID (uid) of the creator's Douyin account; not the ID the account endpoints take. | `full` | Yes |
| `ext.rate_21_60s` | amount | Rate for a 21 to 60 second video, in yuan. | `full` | Depends on the request |
| `ext.rate_over_60s` | amount | Rate for a video over 60 seconds, in yuan. | `full` | Depends on the request |
| `ext.expected_views` | integer | Views the platform expects of one video. | `full` | Depends on the request |
| `ext.agency` | text | Name of the agency (MCN) the creator is signed to; null when there is none. | `full` | Depends on the request |
| `approximate` | list of object | Which numbers of this item are approximate or lower bounds; absent when all are exact. | `compact` | Yes |
| `approximate[].field` | text | Path of the field, such as metrics.views. | `compact` | Yes |
| `approximate[].kind` | text | Approximate, or a lower bound. Values: `approximate`, `lower_bound`. | `compact` | Yes |

A field with no value on an item is `null`. A field this endpoint cannot give is left out and listed in `meta.unavailable`.

With `id`: `ext.rate_21_60s`, `ext.rate_over_60s`, `ext.expected_views` not returned.

With `ids`: `account_id`, `username`, `ext.agency` not returned.

Typical size of one item: `compact` 207 B, `standard` 404 B, `full` 446 B (measured on the response recorded 2026-10-12 21:48 UTC).

## Paging

One object per call: there is nothing to page.

Up to 50 objects come back in one call with `ids`; there is no next page.

## When you are charged

| Case | Charged |
| --- | --- |
| A result with data | $0.0040, once per call |
| A batch where some IDs are not found | once, as any call |
| An empty result | not charged |
| The object does not exist (404) | not charged |
| Invalid parameters, a failure of ours or of the data source, a timeout | not charged |
| The most one call can cost | $0.0040 (send `X-Max-Price` to refuse anything above your own limit) |

Prices as read 2026-10-18 19:59 UTC, under price book 2, in effect since 2026-10-17 11:00 UTC; the Playground reads the price in force before a run.

## If the object does not exist

The answer is 404 `not_found` and nothing is charged. `reason` says which: `not_found` (it does not exist) or `private_or_deleted`.

With `ids`, each ID that was not found is listed in `data.missing` with the reason, and the rest come back; when none is found the result is empty and nothing is charged.

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
curl -G "https://api.dataxapi.com/v1/douyin/xingtu/creators/get" \
  --data-urlencode "id=6763236383382306828" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.douyin.xingtu.creators.get(id="6763236383382306828")
print(result["data"]["item"])
```

### TypeScript

```typescript
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.douyin.xingtu.creators.get({ id: "6763236383382306828" });
console.log(result.data.item);
```

### CLI

```bash
dataxapi call douyin.xingtu.creators.get id=6763236383382306828
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

Add this to your MCP client, then ask your agent to call `douyin.xingtu.creators.get`.

## Responses

### 200

From a response recorded 2026-10-12 21:48 UTC. Names, text and IDs are examples, and so are the links: none is the recorded one (the page shows no one's personal data); the figures are as recorded. Long lists are cut. The request ID, cursor and balance are made up.

Size as sent: 825 B in the standard view (628 B compact, 867 B full).

```jsonc
{
  "code": "ok",
  "request_id": "7da537c3-ee29-439f-812a-b788a7033351",
  "data": {
    "item": {
      "id": "6367626425854791347",
      "account_id": "MS4wLjABAAAAH4HW-XkkFSpuOU1jJkqdwmVxtCUI4xHqsaj-BRLqnEH",
      "username": "lemon_drop_cc",
      "name": "一颗柠檬糖",
      "avatar_url": "https://p3-pc.douyinpic.com/aweme/100x100/aweme-avatar/tos-cn-avt-0015_c479f0c578bc25e22839.jpeg",
      "location": null,
      "categories": ["旅行"],
      "subcategories": ["露营"],
      "metrics": { "followers": 25909243 }
    }
  },
  "warnings": [],
  "meta": {
    "capability": "douyin.xingtu.creators.get",
    "result_status": "complete",
    "fetched_at": "2026-10-12T21:48:52.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "ext.rate_21_60s": "capability",
      "ext.rate_over_60s": "capability",
      "ext.expected_views": "capability"
    },
    "billing": {
      "amount": "0.004",
      "currency": "USD",
      "balance_after": "9.996"
    }
  }
}
```

### Empty

The answer to a request with `ids`.

From a response recorded 2026-10-12 21:48 UTC. The request ID and balance are made up.

Size as sent: 513 B in the standard view (513 B compact, 513 B full).

```jsonc
{
  "code": "ok",
  "request_id": "cc13eb0f-d5fb-457c-b64a-0aafc8082330",
  "data": {
    "items": [],
    "missing": [
      { "id": "6906943020864613909", "reason": "not_found" },
      { "id": "6378621704197376231", "reason": "not_found" }
    ]
  },
  "warnings": [],
  "meta": {
    "capability": "douyin.xingtu.creators.get",
    "result_status": "empty",
    "fetched_at": "2026-10-12T21:48:50.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "account_id": "capability",
      "username": "capability",
      "ext.agency": "capability"
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
  "request_id": "33e8fa67-cb61-4c90-9749-36e962f2db0b",
  "message": "A parameter is invalid",
  "message_zh": "参数不合法",
  "charged": false,
  "retry": "after_fix",
  "retry_after_seconds": null,
  "param": null,
  "problems": ["give exactly one of id, ids"],
  "docs_url": "https://dataxapi.com/docs/errors#invalid_params"
}
```

### 402

An example written to the specification, not a recorded response.

```json
{
  "code": "insufficient_balance",
  "request_id": "bebc97c7-df2f-4d0a-920e-2bd9990cd2ae",
  "message": "The balance is too low",
  "message_zh": "余额不足",
  "charged": false,
  "retry": "after_fix",
  "retry_after_seconds": null,
  "param": null,
  "required": "0.004",
  "available": "0",
  "docs_url": "https://dataxapi.com/docs/errors#insufficient_balance"
}
```

### 404

An example written to the specification, not a recorded response.

```json
{
  "code": "not_found",
  "request_id": "3e8179ef-73b5-4e35-83bd-1d00a30eb879",
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
  "request_id": "ba21cefc-47c1-4044-b0b2-914b0549257c",
  "message": "The data source failed",
  "message_zh": "数据来源出错",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

[This example as a JSON file](https://dataxapi.com/apis/douyin/xingtu/creators/get.example.json)

## Use it in your AI

`dataxapi setup` gives the agents on your machine (Claude Code, Codex, Cursor) the DataXAPI MCP server and the base skill. The key is read from DATAXAPI_API_KEY; none is written into a file.

MCP server: `https://api.dataxapi.com/mcp`. The entry for your client is under MCP in the request examples of this page; then ask your agent to call `douyin.xingtu.creators.get`.

Or paste this to any AI:

> Read https://dataxapi.com/apis/douyin/xingtu/creators/get.md and help me use the DataXAPI endpoint douyin.xingtu.creators.get (Douyin Xingtu creator profile).

[Open in ChatGPT](https://chatgpt.com/?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fdouyin%2Fxingtu%2Fcreators%2Fget.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20douyin.xingtu.creators.get%20%28Douyin%20Xingtu%20creator%20profile%29.) · [Open in Claude](https://claude.ai/new?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fdouyin%2Fxingtu%2Fcreators%2Fget.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20douyin.xingtu.creators.get%20%28Douyin%20Xingtu%20creator%20profile%29.)

## Related

Part of DataXAPI's Creators data. The same key also works for: Social media, Ads, E-commerce.

The same thing on other platforms: [Xiaohongshu PGY creator detail](https://dataxapi.com/apis/xiaohongshu/pgy/creators/get/)

Douyin Xingtu endpoints: [Douyin Xingtu creator rate card](https://dataxapi.com/apis/douyin/xingtu/creators/rates/get/), [Douyin Xingtu creator search](https://dataxapi.com/apis/douyin/xingtu/creators/search/), [Douyin Xingtu creator profile](https://dataxapi.com/apis/douyin/xingtu/creators/get/), [Douyin Xingtu creator audience](https://dataxapi.com/apis/douyin/xingtu/creators/audience/get/), [Douyin Xingtu creator metrics](https://dataxapi.com/apis/douyin/xingtu/creators/metrics/), [Douyin Xingtu creator video performance](https://dataxapi.com/apis/douyin/xingtu/creators/videos/list/), [Douyin Xingtu creator content keywords](https://dataxapi.com/apis/douyin/xingtu/creators/keywords/get/), [Douyin Xingtu creator index scores](https://dataxapi.com/apis/douyin/xingtu/creators/scores/get/), [Douyin Xingtu creator content mix](https://dataxapi.com/apis/douyin/xingtu/creators/content_mix/get/), [Douyin Xingtu creator conversion](https://dataxapi.com/apis/douyin/xingtu/creators/conversion/get/), [Douyin Xingtu marketing calendar](https://dataxapi.com/apis/douyin/xingtu/campaigns/list/)

Douyin endpoints: [Douyin comment replies](https://dataxapi.com/apis/douyin/comments/replies/list/), [Douyin hashtag videos](https://dataxapi.com/apis/douyin/hashtags/videos/list/), [Douyin hot search board](https://dataxapi.com/apis/douyin/trends/list/), [Douyin user profile](https://dataxapi.com/apis/douyin/users/get/), [Douyin creator engagement and follower trends](https://dataxapi.com/apis/douyin/users/history/), [Douyin user search](https://dataxapi.com/apis/douyin/users/search/), [Douyin user videos](https://dataxapi.com/apis/douyin/users/videos/list/), [Douyin video comments](https://dataxapi.com/apis/douyin/videos/comments/list/), [Douyin video detail](https://dataxapi.com/apis/douyin/videos/get/), [Douyin video play count](https://dataxapi.com/apis/douyin/videos/metrics/), [Douyin related videos](https://dataxapi.com/apis/douyin/videos/related/), [Douyin video search](https://dataxapi.com/apis/douyin/videos/search/), [Douyin trending videos](https://dataxapi.com/apis/douyin/videos/trending/)

Douyin trend-index endpoints: [Douyin trend-index brand trends](https://dataxapi.com/apis/douyin/index/brands/history/), [Douyin trend-index brand comparison](https://dataxapi.com/apis/douyin/index/brands/metrics/), [Douyin trend-index creator top videos](https://dataxapi.com/apis/douyin/index/creators/videos/list/), [Douyin trend-index creator follower profile](https://dataxapi.com/apis/douyin/index/creators/audience/get/), [Douyin trend-index creator core metrics](https://dataxapi.com/apis/douyin/index/creators/metrics/), [Douyin trend-index keyword audience](https://dataxapi.com/apis/douyin/index/keywords/audience/get/), [Douyin trend-index keyword trends](https://dataxapi.com/apis/douyin/index/keywords/history/), [Douyin trend-index related keywords](https://dataxapi.com/apis/douyin/index/keywords/related/), [Douyin trend-index live hot topics](https://dataxapi.com/apis/douyin/index/trends/list/), [Douyin trend-index keyword hot videos](https://dataxapi.com/apis/douyin/index/videos/search/)

Related: [All Douyin Xingtu endpoints](https://dataxapi.com/apis/douyin/xingtu/), [All Douyin endpoints](https://dataxapi.com/apis/douyin/), [Creators data](https://dataxapi.com/categories/creator/), [The same thing on 2 platforms, side by side](https://dataxapi.com/roles/creators-get/), [The creator object's fields](https://dataxapi.com/docs/objects/creator/)

## Questions

### How much does the Douyin Xingtu creator profile API cost?

$0.0040 per call. The most one call can cost is $0.0040.

### When am I not charged?

Errors, timeouts and objects that do not exist are not charged; an empty result is free.

### Can I fetch several in one request?

Up to 50 objects come back in one call with ids; there is no next page.

### What happens if the object does not exist?

The answer is 404 not_found and nothing is charged. reason says which: not_found (it does not exist) or private_or_deleted. With ids, each ID that was not found is listed in data.missing with the reason, and the rest come back; when none is found the result is empty and nothing is charged.

---

Last checked 2026-10-18 19:59 UTC. Catalog revision c48ce454ae6c4c65. [HTML version](https://dataxapi.com/apis/douyin/xingtu/creators/get/)
