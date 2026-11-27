# Douyin trend-index creator core metrics API

Get a Douyin creator's core figures from the platform's own index tool, by the account's numeric ID: new likes, shares and comments a day and the tool's own count of follows a day, on average over the last week and the last month, each as a ratio against the period before. The follows are not the net gain in followers, and come out larger. An account the tool has nothing on (every figure 0) is answered as not found. One object a call; $0.0020 per call. Errors and timeouts are not charged.

- Endpoint: `GET https://api.dataxapi.com/v1/douyin/index/creators/metrics`
- ID: `douyin.index.creators.metrics`
- Also known as: douyin creator daily averages, douyin index creator core metrics, douyin creator growth
- Price: $0.0020 / call
- Live status is not on this page, which is a snapshot. Read it with `GET https://api.dataxapi.com/v1/catalog/status`
- Returns: 1 object, one douyin trend-index creator metrics object
- Returns douyin trend-index creator metrics, a preview structure that may still change
- [Run it in the Playground](https://dataxapi.com/console/playground/?capability=douyin.index.creators.metrics&params=%7B%22id%22%3A%2266598046050%22%7D)
- In Chinese: [抖音巨量算数达人核心指标 API](https://dataxapi.com/zh/apis/douyin/index/creators/metrics/)

## What you get

The first 8 rows of a response recorded 2026-10-13 03:24 UTC.

| Field | Value |
| --- | --- |
| average_7d.likes | 157,100.71 |
| average_7d.follows | 3,588 |
| average_7d.shares | 14,715.43 |
| average_7d.comments | 3,879.86 |
| average_30d.likes | 300,077.7 |
| average_30d.follows | 6,233.6 |
| average_30d.shares | 17,969.83 |
| average_30d.comments | 7,351.47 |

## Parameters

| Parameter | Type | required | Description |
| --- | --- | --- | --- |
| `id` | text | Yes | The account's numeric Douyin ID (uid), a string of digits; not the token starting with MS4w that the profile endpoint takes. Nor is it the Douyin handle (username, often digits too): the uid is ext.uid in what douyin.users.get returns with view=full. Accounts with very few followers have no such data (a few hundred followers failed, over thirty thousand worked when tried), and retrying does not help. Example: `66598046050`. |
| `view` | text |  | How much of each item to return. All three cost the same. Values: `compact`, `standard` (default), `full`. |
| `fields` | list of text |  | Return only these fields. Each by its path, such as `author.name`. |

## Returned fields

`data.item` is one douyin trend-index creator metrics object. Preview: the structure may change, announced beforehand.

Three views: `compact` (the most used fields, long text cut short), `standard` (the default: every standard field) and `full` (adds `ext`, the platform's own fields). A field is in the view named and in every larger one.

| Field | Type | Description | From view | This endpoint |
| --- | --- | --- | --- | --- |
| `creator_id` | text | The account's numeric ID (Douyin's uid): the one the request gave. | `compact` | Yes |
| `average_7d` | object | Daily averages over the last week. | `compact` | Yes |
| `average_7d.likes` | number | New likes a day, on average over the last week. | `compact` | Yes |
| `average_7d.follows` | number | Follows a day, on average over the last week, as the platform counts them: not the net gain in followers: the same platform's like figure comes to 2 to 10 times the net daily gain, and is above 0 for an account that lost followers. The platform does not say how it is counted: use it for trends and to compare accounts, not as a net gain. | `compact` | Yes |
| `average_7d.shares` | number | New shares a day, on average over the last week. | `compact` | Yes |
| `average_7d.comments` | number | New comments a day, on average over the last week. | `compact` | Yes |
| `average_30d` | object | Daily averages over the last month. | `compact` | Yes |
| `average_30d.likes` | number | New likes a day, on average over the last month. | `compact` | Yes |
| `average_30d.follows` | number | Follows a day, on average over the last month, as the platform counts them; as above, not the net gain in followers. | `compact` | Yes |
| `average_30d.shares` | number | New shares a day, on average over the last month. | `compact` | Yes |
| `average_30d.comments` | number | New comments a day, on average over the last month. | `compact` | Yes |
| `change_7d` | object | The last week's daily averages against the week before, as a ratio: 0.3 is 30% more, -0.5 is half as much. | `compact` | Yes |
| `change_7d.likes` | number | Change in new likes a day. | `compact` | Yes |
| `change_7d.follows` | number | Change in follows a day (as the platform counts them, not the net gain). | `compact` | Yes |
| `change_7d.shares` | number | Change in new shares a day. | `compact` | Yes |
| `change_7d.comments` | number | Change in new comments a day. | `compact` | Yes |
| `change_30d` | object | The last month's daily averages against the month before, written the same way. | `compact` | Yes |
| `change_30d.likes` | number | Change in new likes a day. | `compact` | Yes |
| `change_30d.follows` | number | Change in follows a day (as the platform counts them, not the net gain). | `compact` | Yes |
| `change_30d.shares` | number | Change in new shares a day. | `compact` | Yes |
| `change_30d.comments` | number | Change in new comments a day. | `compact` | Yes |
| `approximate` | list of object | Which numbers of this item are approximate or lower bounds; absent when all are exact. | `compact` | Yes |
| `approximate[].field` | text | Path of the field, such as metrics.views. | `compact` | Yes |
| `approximate[].kind` | text | Approximate, or a lower bound. Values: `approximate`, `lower_bound`. | `compact` | Yes |

A field with no value on an item is `null`. A field this endpoint cannot give is left out and listed in `meta.unavailable`.

Typical size of one item: `compact` 518 B, `standard` 518 B, `full` 518 B (measured on the response recorded 2026-10-13 03:24 UTC).

## Paging

One object per call: there is nothing to page.

## When you are charged

| Case | Charged |
| --- | --- |
| A result with data | $0.0020, once per call |
| Invalid parameters, a failure or a timeout | not charged |
| The most one call can cost | $0.0020 (send `X-Max-Price` to refuse anything above your own limit) |

Prices as read 2026-11-27 06:18 UTC, under price book 23, in effect since 2026-11-27 06:13 UTC; the Playground reads the price in force before a run.

## If the object does not exist

The answer is 404 `not_found`. `charged` and `amount` in the body say what this one cost. `reason` says which: `not_found` (it does not exist) or `private_or_deleted`.

## Errors

Every error has the same structure: `code`, `message`, `charged`, `retry`, `retry_after_seconds`, `param`, `docs_url`.

| HTTP | Code | Meaning | Charged | Retry |
| --- | --- | --- | --- | --- |
| 400 | `invalid_params` | A parameter is invalid | As the answer's charged field says | After a fix |
| 400 | `request_not_served` | This combination of parameters cannot be served at present | No | After a fix |
| 400 | `max_price_exceeded` | The most this call could cost is above the limit you set | No | After a fix |
| 401 | `unauthorized` | No credential was sent, or it is invalid, disabled or expired | No | No |
| 402 | `insufficient_balance` | The balance is too low | No | After a fix |
| 402 | `key_budget_exceeded` | This key's spending limit does not cover the call | No | After a fix |
| 402 | `run_budget_exceeded` | This run's amount or call limit does not cover the call | No | No |
| 403 | `account_suspended` | The account is suspended | No | No |
| 403 | `forbidden` | This credential may not use that option | No | No |
| 403 | `key_scope_denied` | This key may not call this endpoint | No | No |
| 404 | `not_found` | The object does not exist, is private or was deleted | As the answer's charged field says | No |
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
curl -G "https://api.dataxapi.com/v1/douyin/index/creators/metrics" \
  --data-urlencode "id=66598046050" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
# pip install dataxapi
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.douyin.index.creators.metrics(id="66598046050")
print(result["data"]["item"])
```

### TypeScript

```typescript
// npm i @dataxapi/sdk
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.douyin.index.creators.metrics({ id: "66598046050" });
console.log(result.data.item);
```

### CLI

```bash
dataxapi call douyin.index.creators.metrics id=66598046050
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

Add this to your MCP client, then ask your agent to call `douyin.index.creators.metrics`.

## Responses

### 200

From a response recorded 2026-10-13 03:24 UTC. Names, text and IDs are examples, and so are the links: none is the recorded one (the page shows no one's personal data); the figures are as recorded. Long lists are cut. The request ID, cursor and balance are made up.

Size as sent: 845 B in the standard view (845 B compact, 845 B full).

```jsonc
{
  "code": "ok",
  "request_id": "1aa3d06c-7ce1-486b-ad2e-5fa3fdf7449d",
  "data": {
    "item": {
      "creator_id": "62430445852",
      "average_7d": {
        "likes": 157100.7142857143,
        "follows": 3588,
        "shares": 14715.42857142857,
        "comments": 3879.8571428571427
      },
      "average_30d": {
        "likes": 300077.7,
        "follows": 6233.6,
        "shares": 17969.833333333332,
        "comments": 7351.466666666666
      },
      "change_7d": {
        "likes": -0.20028666505711482,
        "follows": -0.1607298001737619,
        "shares": 0.8577740905729795,
        "comments": -0.28813692598028945
      },
      "change_30d": {
        "likes": -0.12000717497205526,
        "follows": -0.1316211058123174,
        "shares": -0.1697698557902584,
        "comments": -0.23841359186421957
      }
    }
  },
  "warnings": [],
  "meta": {
    "capability": "douyin.index.creators.metrics",
    "result_status": "complete",
    "fetched_at": "2026-10-13T03:24:56.000Z",
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

### 400

An example written to the specification, not a recorded response.

```json
{
  "code": "invalid_params",
  "request_id": "d25a2d05-7e8c-48c7-baa8-9bf81406b6eb",
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
  "request_id": "3aadf25d-37a1-4d9e-a4ee-5abaafcec30e",
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
  "request_id": "87504d99-7e40-42be-92c3-0db84f2a56e9",
  "message": "The object does not exist, is private or was deleted",
  "message_zh": "对象不存在、私密或已删除",
  "charged": true,
  "amount": "0.002",
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
  "request_id": "9e2c4c99-3290-4de9-84ab-b0c566b9d1a5",
  "message": "No result came back this time and nothing was charged; retry shortly",
  "message_zh": "这次没有取到结果，没有扣费，可以稍后重试",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

This recorded response is 544 tokens as the platform's own JSON, 294 as DataXAPI's JSON, and 242 as an AI reads it through DataXAPI's MCP server: 56% fewer (counted 2026-11-06).

[This example as a JSON file](https://dataxapi.com/apis/douyin/index/creators/metrics.example.json)

## Use it in your AI

`dataxapi setup` gives the agents on your machine (Claude Code, Codex, Cursor) the DataXAPI MCP server and the base skill. The key is read from DATAXAPI_API_KEY; none is written into a file.

MCP server: `https://api.dataxapi.com/mcp`. The entry for your client is under MCP in the request examples of this page; then ask your agent to call `douyin.index.creators.metrics`.

Or paste this to any AI:

> Read https://dataxapi.com/apis/douyin/index/creators/metrics.md and help me use the DataXAPI endpoint douyin.index.creators.metrics (Douyin trend-index creator core metrics).

[Open in ChatGPT](https://chatgpt.com/?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fdouyin%2Findex%2Fcreators%2Fmetrics.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20douyin.index.creators.metrics%20%28Douyin%20trend-index%20creator%20core%20metrics%29.) · [Open in Claude](https://claude.ai/new?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fdouyin%2Findex%2Fcreators%2Fmetrics.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20douyin.index.creators.metrics%20%28Douyin%20trend-index%20creator%20core%20metrics%29.)

## Related

Part of DataXAPI's Creators data. The same key also works for: Social media, Ads, E-commerce.

Douyin trend-index endpoints: [Douyin trend-index brand trends](https://dataxapi.com/apis/douyin/index/brands/history/), [Douyin trend-index brand comparison](https://dataxapi.com/apis/douyin/index/brands/metrics/), [Douyin trend-index creator top videos](https://dataxapi.com/apis/douyin/index/creators/videos/list/), [Douyin trend-index creator follower profile](https://dataxapi.com/apis/douyin/index/creators/audience/get/), [Douyin trend-index creator core metrics](https://dataxapi.com/apis/douyin/index/creators/metrics/), [Douyin trend-index keyword audience](https://dataxapi.com/apis/douyin/index/keywords/audience/get/), [Douyin trend-index keyword trends](https://dataxapi.com/apis/douyin/index/keywords/history/), [Douyin trend-index related keywords](https://dataxapi.com/apis/douyin/index/keywords/related/), [Douyin trend-index live hot topics](https://dataxapi.com/apis/douyin/index/trends/list/), [Douyin trend-index keyword hot videos](https://dataxapi.com/apis/douyin/index/videos/search/)

Douyin endpoints: [Douyin comment replies](https://dataxapi.com/apis/douyin/comments/replies/list/), [Douyin hashtag videos](https://dataxapi.com/apis/douyin/hashtags/videos/list/), [Douyin hot search board](https://dataxapi.com/apis/douyin/trends/list/), [Douyin user profile](https://dataxapi.com/apis/douyin/users/get/), [Douyin creator engagement and follower trends](https://dataxapi.com/apis/douyin/users/history/), [Douyin user search](https://dataxapi.com/apis/douyin/users/search/), [Douyin user videos](https://dataxapi.com/apis/douyin/users/videos/list/), [Douyin video comments](https://dataxapi.com/apis/douyin/videos/comments/list/), [Douyin video detail](https://dataxapi.com/apis/douyin/videos/get/), [Douyin video transcript (video to text)](https://dataxapi.com/apis/douyin/videos/transcript/get/), [Douyin video play count](https://dataxapi.com/apis/douyin/videos/metrics/), [Douyin related videos](https://dataxapi.com/apis/douyin/videos/related/), [Douyin video search](https://dataxapi.com/apis/douyin/videos/search/), [Douyin trending videos](https://dataxapi.com/apis/douyin/videos/trending/), [Douyin search suggestions](https://dataxapi.com/apis/douyin/keywords/related/), [Douyin video downloader, no watermark](https://dataxapi.com/apis/douyin/videos/media/get/), [Douyin music detail](https://dataxapi.com/apis/douyin/music/get/), [Douyin user videos (backup)](https://dataxapi.com/apis/douyin/backup/users/videos/list/), [Douyin video search (backup)](https://dataxapi.com/apis/douyin/backup/videos/search/)

Douyin Xingtu endpoints: [Douyin Xingtu creator rate card](https://dataxapi.com/apis/douyin/xingtu/creators/rates/get/), [Douyin Xingtu creator search](https://dataxapi.com/apis/douyin/xingtu/creators/search/), [Douyin Xingtu creator profile](https://dataxapi.com/apis/douyin/xingtu/creators/get/), [Douyin Xingtu creator audience](https://dataxapi.com/apis/douyin/xingtu/creators/audience/get/), [Douyin Xingtu creator metrics](https://dataxapi.com/apis/douyin/xingtu/creators/metrics/), [Douyin Xingtu creator video performance](https://dataxapi.com/apis/douyin/xingtu/creators/videos/list/), [Douyin Xingtu creator content keywords](https://dataxapi.com/apis/douyin/xingtu/creators/keywords/get/), [Douyin Xingtu creator index scores](https://dataxapi.com/apis/douyin/xingtu/creators/scores/get/), [Douyin Xingtu creator content mix](https://dataxapi.com/apis/douyin/xingtu/creators/content_mix/get/), [Douyin Xingtu creator conversion](https://dataxapi.com/apis/douyin/xingtu/creators/conversion/get/), [Douyin Xingtu marketing calendar](https://dataxapi.com/apis/douyin/xingtu/campaigns/list/), [Douyin Xingtu video report: plays and completion rate](https://dataxapi.com/apis/douyin/xingtu/videos/get/), [Douyin Xingtu creator audience (backup)](https://dataxapi.com/apis/douyin/xingtu/backup/creators/audience/get/)

How-to guides and answers: [What is sec_uid on Douyin, and how is it different from uid and the Douyin ID?](https://dataxapi.com/answers/douyin-sec-uid/), [How do I convert a Douyin sec_uid to a uid, and back? (2026)](https://dataxapi.com/answers/douyin-sec-uid-to-uid/)

Related: [All Douyin trend-index endpoints](https://dataxapi.com/apis/douyin/index/), [All Douyin endpoints](https://dataxapi.com/apis/douyin/), [Creators data](https://dataxapi.com/categories/creator/), [The douyin trend-index creator metrics object's fields](https://dataxapi.com/docs/objects/index_creator_metrics/)

## Questions

### How much does the Douyin trend-index creator core metrics API cost?

$0.0020 per call. The most one call can cost is $0.0020.

### When am I not charged?

Errors and timeouts are not charged.

### What happens if the object does not exist?

The answer is 404 not_found. charged and amount in the body say what this one cost. reason says which: not_found (it does not exist) or private_or_deleted.

---

Last checked 2026-11-27 06:18 UTC. Catalog revision 0264e2d6dd4ff743. [HTML version](https://dataxapi.com/apis/douyin/index/creators/metrics/)
