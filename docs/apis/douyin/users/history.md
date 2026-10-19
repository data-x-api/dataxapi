# Douyin creator engagement and follower trends API

Get how a Douyin account's numbers moved over the last 7 or 30 days, by its numeric ID, from the platform's own index tool: net new followers, new likes, comments, shares and posts, each as a ratio against the period before, and the totals now; up to five accounts in one request. It is one period's sum, not a day-by-day series. One object a call; up to 5 in one request with `ids`; $0.0020 per call. Errors, timeouts and objects that do not exist are not charged; an empty result is free.

- Endpoint: `GET / POST https://api.dataxapi.com/v1/douyin/users/history`
- ID: `douyin.users.history`
- Also known as: douyin follower growth, douyin account growth, douyin creator trend compare, douyin account recent change
- Price: $0.0020 / call
- Live status is not on this page, which is a snapshot. Read it with `GET https://api.dataxapi.com/v1/catalog/status`
- Returns: 1 object, one each, up to 5 in one request
- Returns account recent change, a preview structure that may still change
- [Run it in the Playground](https://dataxapi.com/console/playground/?capability=douyin.users.history&params=%7B%22id%22%3A%2266598046050%22%7D)
- In Chinese: [抖音达人互动与粉丝趋势 API](https://dataxapi.com/zh/apis/douyin/users/history/)

## What you get

The first 8 rows of a response recorded 2026-10-12 21:54 UTC.

| Field | Value |
| --- | --- |
| days | 30 |
| gained.followers | 661,489 |
| gained.likes | 255,080,710 |
| gained.comments | 48,099 |
| gained.shares | 38,207,194 |
| gained.posts | 437 |
| change.followers | 0.73 |
| change.likes | 0.23 |

## Parameters

| Parameter | Type | required | Description |
| --- | --- | --- | --- |
| `id` | text | give exactly one of `id`, `ids` | The account's numeric Douyin ID (uid), a string of digits; not the token starting with MS4w that the profile endpoint takes. Example: `66598046050`. |
| `ids` | list of text | give exactly one of `id`, `ids` | Up to five numeric Douyin account IDs (uid), each a string of digits. If one of them does not exist, the whole batch fails. Example: `["66598046050","104255897823"]`. At most 5 in one request. |
| `window` | text |  | How many of the most recent days to count: 7 or 30. Values: `7d` (default), `30d`. Example: `7d`. |
| `view` | text |  | How much of each item to return. All three cost the same. Values: `compact`, `standard` (default), `full`. |
| `fields` | list of text |  | Return only these fields. Each by its path, such as `author.name`. |

A request with `ids` is a POST with a JSON body; every other request is a GET.

## Returned fields

`data.item` is one account recent change object. Preview: the structure may change, announced beforehand. With `ids` the answer is `data.items`, and what was not found is listed in `data.missing`.

Three views: `compact` (the most used fields, long text cut short), `standard` (the default: every standard field) and `full` (adds `ext`, the platform's own fields). A field is in the view named and in every larger one.

| Field | Type | Description | From view | This endpoint |
| --- | --- | --- | --- | --- |
| `id` | text | The account's numeric ID (Douyin's uid): the one the request gave. | `compact` | Yes |
| `name` | text | Display name. | `compact` | Yes |
| `url` | link | Link to the profile; pass it unchanged to the account endpoint. | `compact` | Yes |
| `avatar_url` | link | Avatar. | `standard` | Yes |
| `days` | integer | How many of the most recent days the figures cover. | `compact` | Yes |
| `gained` | object | What was gained over the period. | `compact` | Yes |
| `gained.followers` | integer | Net new followers; negative when followers were lost. | `compact` | Yes |
| `gained.likes` | integer | New likes. | `compact` | Yes |
| `gained.comments` | integer | New comments. | `compact` | Yes |
| `gained.shares` | integer | New shares. | `compact` | Yes |
| `gained.posts` | integer | Posts published. | `compact` | Yes |
| `change` | object | Change against the period of the same length before it, as a ratio: 0.3 is 30% more, -0.5 is half as much. | `compact` | Yes |
| `change.followers` | number | Change in net new followers. | `compact` | Yes |
| `change.likes` | number | Change in new likes. | `compact` | Yes |
| `change.comments` | number | Change in new comments. | `compact` | Yes |
| `change.shares` | number | Change in new shares. | `compact` | Yes |
| `change.posts` | number | Change in posts published. | `compact` | Yes |
| `totals` | object | The account's totals as of now. | `standard` | Yes |
| `totals.followers` | integer | Followers. | `standard` | Yes |
| `totals.likes` | integer | Likes received in all. | `standard` | Yes |
| `totals.posts` | integer | Posts. | `standard` | Yes |
| `approximate` | list of object | Which numbers of this item are approximate or lower bounds; absent when all are exact. | `compact` | Yes |
| `approximate[].field` | text | Path of the field, such as metrics.views. | `compact` | Yes |
| `approximate[].kind` | text | Approximate, or a lower bound. Values: `approximate`, `lower_bound`. | `compact` | Yes |

A field with no value on an item is `null`. A field this endpoint cannot give is left out and listed in `meta.unavailable`.

Typical size of one item: `compact` 387 B, `standard` 593 B, `full` 593 B (measured on the response recorded 2026-10-12 21:54 UTC).

## Paging

One object per call: there is nothing to page.

Up to 5 objects come back in one call with `ids`; there is no next page.

## When you are charged

| Case | Charged |
| --- | --- |
| A result with data | $0.0020, once per call |
| A batch where some IDs are not found | once, as any call |
| An empty result | not charged |
| The object does not exist (404) | not charged |
| Invalid parameters, a failure of ours or of the data source, a timeout | not charged |
| The most one call can cost | $0.0020 (send `X-Max-Price` to refuse anything above your own limit) |

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
curl -G "https://api.dataxapi.com/v1/douyin/users/history" \
  --data-urlencode "id=66598046050" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.douyin.users.history(id="66598046050")
print(result["data"]["item"])
```

### TypeScript

```typescript
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.douyin.users.history({ id: "66598046050" });
console.log(result.data.item);
```

### CLI

```bash
dataxapi call douyin.users.history id=66598046050
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

Add this to your MCP client, then ask your agent to call `douyin.users.history`.

## Responses

### 200

From a response recorded 2026-10-12 21:54 UTC. Names, text and IDs are examples, and so are the links: none is the recorded one (the page shows no one's personal data); the figures are as recorded. Long lists are cut. The request ID, cursor and balance are made up.

Size as sent: 911 B in the standard view (705 B compact, 911 B full).

```jsonc
{
  "code": "ok",
  "request_id": "76f21d2b-218b-47ce-855e-19fb2cc51fdc",
  "data": {
    "item": {
      "id": "65485320678",
      "name": "阿杰爱折腾",
      "url": "https://www.douyin.com/user/65485320678",
      "avatar_url": "https://p3-pc.douyinpic.com/aweme/100x100/aweme-avatar/tos-cn-avt-0015_2ed168d1dc1b7e7b888e.jpeg",
      "days": 30,
      "gained": {
        "followers": 661489,
        "likes": 255080710,
        "comments": 48099,
        "shares": 38207194,
        "posts": 437
      },
      "change": {
        "followers": 0.7285514941831903,
        "likes": 0.2256968601585644,
        "comments": -0.12905153369789593,
        "shares": 0.04085150466802108,
        "posts": -0.126
      },
      "totals": {
        "followers": 203357430,
        "likes": 19128275335,
        "posts": 12381
      }
    }
  },
  "warnings": [],
  "meta": {
    "capability": "douyin.users.history",
    "result_status": "complete",
    "fetched_at": "2026-10-12T21:54:08.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {},
    "billing": {
      "amount": "0.002",
      "currency": "USD",
      "balance_after": "9.998"
    }
  }
}
```

### Empty

The answer to a request with `ids`.

From a recording of 2026-10-12 21:53 UTC, edited by hand to show this case. The request ID and balance are made up.

Size as sent: 417 B in the standard view (417 B compact, 417 B full).

```jsonc
{
  "code": "ok",
  "request_id": "539ac011-d5c1-4213-986f-51a7d85ef2a8",
  "data": {
    "items": [],
    "missing": [
      { "id": "63447420393", "reason": "not_found" },
      { "id": "62668992497", "reason": "not_found" }
    ]
  },
  "warnings": [],
  "meta": {
    "capability": "douyin.users.history",
    "result_status": "empty",
    "fetched_at": "2026-10-12T21:53:26.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {},
    "billing": { "amount": "0", "currency": "USD", "balance_after": "10" }
  }
}
```

### 400

An example written to the specification, not a recorded response.

```json
{
  "code": "invalid_params",
  "request_id": "8e3c53d1-d7a1-44b9-bf3c-d5598d7202ed",
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
  "request_id": "786f1902-6145-48a3-b925-ef5823d82389",
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
  "request_id": "c4084ffe-4c8f-4b30-a251-2db7d6ccf31f",
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
  "request_id": "ebb28860-6161-42a3-9912-91e3418b443b",
  "message": "The data source failed",
  "message_zh": "数据来源出错",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

[This example as a JSON file](https://dataxapi.com/apis/douyin/users/history.example.json)

## Use it in your AI

`dataxapi setup` gives the agents on your machine (Claude Code, Codex, Cursor) the DataXAPI MCP server and the base skill. The key is read from DATAXAPI_API_KEY; none is written into a file.

MCP server: `https://api.dataxapi.com/mcp`. The entry for your client is under MCP in the request examples of this page; then ask your agent to call `douyin.users.history`.

Or paste this to any AI:

> Read https://dataxapi.com/apis/douyin/users/history.md and help me use the DataXAPI endpoint douyin.users.history (Douyin creator engagement and follower trends).

[Open in ChatGPT](https://chatgpt.com/?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fdouyin%2Fusers%2Fhistory.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20douyin.users.history%20%28Douyin%20creator%20engagement%20and%20follower%20trends%29.) · [Open in Claude](https://claude.ai/new?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fdouyin%2Fusers%2Fhistory.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20douyin.users.history%20%28Douyin%20creator%20engagement%20and%20follower%20trends%29.)

## Related

Part of DataXAPI's Social media data. The same key also works for: Creators, Ads, E-commerce.

Douyin endpoints: [Douyin comment replies](https://dataxapi.com/apis/douyin/comments/replies/list/), [Douyin hashtag videos](https://dataxapi.com/apis/douyin/hashtags/videos/list/), [Douyin hot search board](https://dataxapi.com/apis/douyin/trends/list/), [Douyin user profile](https://dataxapi.com/apis/douyin/users/get/), [Douyin creator engagement and follower trends](https://dataxapi.com/apis/douyin/users/history/), [Douyin user search](https://dataxapi.com/apis/douyin/users/search/), [Douyin user videos](https://dataxapi.com/apis/douyin/users/videos/list/), [Douyin video comments](https://dataxapi.com/apis/douyin/videos/comments/list/), [Douyin video detail](https://dataxapi.com/apis/douyin/videos/get/), [Douyin video play count](https://dataxapi.com/apis/douyin/videos/metrics/), [Douyin related videos](https://dataxapi.com/apis/douyin/videos/related/), [Douyin video search](https://dataxapi.com/apis/douyin/videos/search/), [Douyin trending videos](https://dataxapi.com/apis/douyin/videos/trending/)

Douyin trend-index endpoints: [Douyin trend-index brand trends](https://dataxapi.com/apis/douyin/index/brands/history/), [Douyin trend-index brand comparison](https://dataxapi.com/apis/douyin/index/brands/metrics/), [Douyin trend-index creator top videos](https://dataxapi.com/apis/douyin/index/creators/videos/list/), [Douyin trend-index creator follower profile](https://dataxapi.com/apis/douyin/index/creators/audience/get/), [Douyin trend-index creator core metrics](https://dataxapi.com/apis/douyin/index/creators/metrics/), [Douyin trend-index keyword audience](https://dataxapi.com/apis/douyin/index/keywords/audience/get/), [Douyin trend-index keyword trends](https://dataxapi.com/apis/douyin/index/keywords/history/), [Douyin trend-index related keywords](https://dataxapi.com/apis/douyin/index/keywords/related/), [Douyin trend-index live hot topics](https://dataxapi.com/apis/douyin/index/trends/list/), [Douyin trend-index keyword hot videos](https://dataxapi.com/apis/douyin/index/videos/search/)

Douyin Xingtu endpoints: [Douyin Xingtu creator rate card](https://dataxapi.com/apis/douyin/xingtu/creators/rates/get/), [Douyin Xingtu creator search](https://dataxapi.com/apis/douyin/xingtu/creators/search/), [Douyin Xingtu creator profile](https://dataxapi.com/apis/douyin/xingtu/creators/get/), [Douyin Xingtu creator audience](https://dataxapi.com/apis/douyin/xingtu/creators/audience/get/), [Douyin Xingtu creator metrics](https://dataxapi.com/apis/douyin/xingtu/creators/metrics/), [Douyin Xingtu creator video performance](https://dataxapi.com/apis/douyin/xingtu/creators/videos/list/), [Douyin Xingtu creator content keywords](https://dataxapi.com/apis/douyin/xingtu/creators/keywords/get/), [Douyin Xingtu creator index scores](https://dataxapi.com/apis/douyin/xingtu/creators/scores/get/), [Douyin Xingtu creator content mix](https://dataxapi.com/apis/douyin/xingtu/creators/content_mix/get/), [Douyin Xingtu creator conversion](https://dataxapi.com/apis/douyin/xingtu/creators/conversion/get/), [Douyin Xingtu marketing calendar](https://dataxapi.com/apis/douyin/xingtu/campaigns/list/)

Related: [All Douyin endpoints](https://dataxapi.com/apis/douyin/), [Social media data](https://dataxapi.com/categories/social/), [The account recent change object's fields](https://dataxapi.com/docs/objects/account_history/)

## Questions

### How much does the Douyin creator engagement and follower trends API cost?

$0.0020 per call. The most one call can cost is $0.0020.

### When am I not charged?

Errors, timeouts and objects that do not exist are not charged; an empty result is free.

### Can I fetch several in one request?

Up to 5 objects come back in one call with ids; there is no next page.

### What happens if the object does not exist?

The answer is 404 not_found and nothing is charged. reason says which: not_found (it does not exist) or private_or_deleted. With ids, each ID that was not found is listed in data.missing with the reason, and the rest come back; when none is found the result is empty and nothing is charged.

---

Last checked 2026-10-18 19:59 UTC. Catalog revision c48ce454ae6c4c65. [HTML version](https://dataxapi.com/apis/douyin/users/history/)
