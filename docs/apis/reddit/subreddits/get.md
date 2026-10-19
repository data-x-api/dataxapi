# Reddit community profile API

Get a Reddit community by its name: description, members, users active and contributions made in the last week, when it was created. One object a call; $0.0020 per call. Errors, timeouts and objects that do not exist are not charged.

- Endpoint: `GET https://api.dataxapi.com/v1/reddit/subreddits/get`
- ID: `reddit.subreddits.get`
- Also known as: subreddit info, subreddit about
- Price: $0.0020 / call
- Live status is not on this page, which is a snapshot. Read it with `GET https://api.dataxapi.com/v1/catalog/status`
- Returns: 1 object, one community object
- Returns community, a preview structure that may still change
- `id` is in the link: `reddit.com/r/<id>/comments/1nnrvkr/`.
- [Run it in the Playground](https://dataxapi.com/console/playground/?capability=reddit.subreddits.get&params=%7B%22id%22%3A%22nasa%22%7D)
- In Chinese: [Reddit 社区资料 API](https://dataxapi.com/zh/apis/reddit/subreddits/get/)

## What you get

The first 3 rows of a response recorded 2026-10-12 22:02 UTC.

| Field | Value |
| --- | --- |
| nsfw | false |
| created_at | 2008-05-10 16:54 UTC |
| metrics.members | 127,858 |

## Parameters

| Parameter | Type | required | Description |
| --- | --- | --- | --- |
| `id` | text | Yes | Community name, without the r/. Example: `nasa`. |
| `view` | text |  | How much of each item to return. All three cost the same. Values: `compact`, `standard` (default), `full`. |
| `fields` | list of text |  | Return only these fields. Each by its path, such as `author.name`. |

## Returned fields

`data.item` is one community object. Preview: the structure may change, announced beforehand.

Three views: `compact` (the most used fields, long text cut short), `standard` (the default: every standard field) and `full` (adds `ext`, the platform's own fields). A field is in the view named and in every larger one.

| Field | Type | Description | From view | This endpoint |
| --- | --- | --- | --- | --- |
| `id` | text | ID; pass it unchanged to the endpoints that get the community and list its posts. On this platform: The community's name: Reddit locates a community by it, and the community posts endpoint takes the same. | `compact` | Yes |
| `name` | text | Name of the community. On this platform: The community's name, without the r/; the title its moderators wrote is ext.title. | `compact` | Yes |
| `url` | link | Link that opens the community. | `compact` | Yes |
| `description` | text | What the community says it is about. Long text: the compact view keeps the first 500 characters and says so in `warnings`. | `compact` | Yes |
| `avatar_url` | link | The community's icon. | `standard` | Yes |
| `nsfw` | yes/no | Whether it is marked not safe for work. | `standard` | Yes |
| `created_at` | time | When the community was created. | `standard` | Yes |
| `metrics` | object | Community counts. | `compact` | Yes |
| `metrics.members` | integer | Members. On this platform: People subscribed to the community. | `compact` | Yes |
| `ext.fullname` | text | The platform's internal ID of the community (it starts with t5_). | `full` | Yes |
| `ext.title` | text | The title its moderators gave the community. | `full` | Yes |
| `ext.type` | text | How open the community is (public, restricted and so on), as the platform words it. | `full` | Yes |
| `ext.weekly_active_users` | integer | Users active in the last week. | `full` | Yes |
| `ext.weekly_contributions` | integer | Posts and comments made in the last week. | `full` | Yes |
| `approximate` | list of object | Which numbers of this item are approximate or lower bounds; absent when all are exact. | `compact` | Yes |
| `approximate[].field` | text | Path of the field, such as metrics.views. | `compact` | Yes |
| `approximate[].kind` | text | Approximate, or a lower bound. Values: `approximate`, `lower_bound`. | `compact` | Yes |

A field with no value on an item is `null`. A field this endpoint cannot give is left out and listed in `meta.unavailable`.

Typical size of one item: `compact` 248 B, `standard` 465 B, `full` 588 B (measured on the response recorded 2026-10-12 22:02 UTC).

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
curl -G "https://api.dataxapi.com/v1/reddit/subreddits/get" \
  --data-urlencode "id=nasa" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.reddit.subreddits.get(id="nasa")
print(result["data"]["item"])
```

### TypeScript

```typescript
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.reddit.subreddits.get({ id: "nasa" });
console.log(result.data.item);
```

### CLI

```bash
dataxapi call reddit.subreddits.get id=nasa
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

Add this to your MCP client, then ask your agent to call `reddit.subreddits.get`.

## Responses

### 200

From a response recorded 2026-10-12 22:02 UTC. Names, text and IDs are examples, and so are the links: none is the recorded one (the page shows no one's personal data); the figures are as recorded. Long lists are cut. The request ID, cursor and balance are made up.

Size as sent: 784 B in the standard view (567 B compact, 907 B full).

```jsonc
{
  "code": "ok",
  "request_id": "fded571b-1116-4e81-ab12-7e679fd21337",
  "data": {
    "item": {
      "id": "t5_q2zdmb",
      "name": "Weekendhiking",
      "url": "https://www.reddit.com/r/hannahwphoto/",
      "description": "Photos, trails and too much coffee.",
      "avatar_url": "https://styles.redditmedia.com/t5_q9lkec/styles/profileIcon_4x7pgnjzbu4u4.png",
      "nsfw": false,
      "created_at": "2008-05-10T16:54:23.304Z",
      "metrics": { "members": 127858 }
    }
  },
  "warnings": [],
  "meta": {
    "capability": "reddit.subreddits.get",
    "result_status": "complete",
    "fetched_at": "2026-10-12T22:02:32.000Z",
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
  "request_id": "3a70ff93-1b29-4895-8374-630ae1083d2e",
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
  "request_id": "cd712b29-ec0e-4956-9335-ce82adeff698",
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
  "request_id": "479a5f8a-bba8-4ecf-ae27-3754b5b1f018",
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
  "request_id": "ec85d1b3-aef7-4e6e-8056-9b108208ccc2",
  "message": "The data source failed",
  "message_zh": "数据来源出错",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

[This example as a JSON file](https://dataxapi.com/apis/reddit/subreddits/get.example.json)

## Use it in your AI

`dataxapi setup` gives the agents on your machine (Claude Code, Codex, Cursor) the DataXAPI MCP server and the base skill. The key is read from DATAXAPI_API_KEY; none is written into a file.

MCP server: `https://api.dataxapi.com/mcp`. The entry for your client is under MCP in the request examples of this page; then ask your agent to call `reddit.subreddits.get`.

Or paste this to any AI:

> Read https://dataxapi.com/apis/reddit/subreddits/get.md and help me use the DataXAPI endpoint reddit.subreddits.get (Reddit community profile).

[Open in ChatGPT](https://chatgpt.com/?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Freddit%2Fsubreddits%2Fget.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20reddit.subreddits.get%20%28Reddit%20community%20profile%29.) · [Open in Claude](https://claude.ai/new?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Freddit%2Fsubreddits%2Fget.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20reddit.subreddits.get%20%28Reddit%20community%20profile%29.)

## Related

Part of DataXAPI's Social media data. The same key also works for: Creators, Ads, E-commerce.

The same thing on other platforms: [X community profile](https://dataxapi.com/apis/x/communities/get/)

More Social media data on other platforms: [Douyin comment replies](https://dataxapi.com/apis/douyin/comments/replies/list/), [Douyin hashtag videos](https://dataxapi.com/apis/douyin/hashtags/videos/list/), [Bilibili comment replies](https://dataxapi.com/apis/bilibili/comments/replies/list/), [Bilibili hot searches](https://dataxapi.com/apis/bilibili/trends/list/), [Bilibili user profile](https://dataxapi.com/apis/bilibili/users/get/), [Bilibili user videos](https://dataxapi.com/apis/bilibili/users/videos/list/), [Bilibili video comments](https://dataxapi.com/apis/bilibili/videos/comments/list/), [Bilibili video detail](https://dataxapi.com/apis/bilibili/videos/get/), [Bilibili video search](https://dataxapi.com/apis/bilibili/videos/search/), [Bilibili popular videos](https://dataxapi.com/apis/bilibili/videos/trending/), [Douyin trend-index brand trends](https://dataxapi.com/apis/douyin/index/brands/history/), [Douyin trend-index brand comparison](https://dataxapi.com/apis/douyin/index/brands/metrics/), [Douyin trend-index creator top videos](https://dataxapi.com/apis/douyin/index/creators/videos/list/), [Douyin trend-index keyword audience](https://dataxapi.com/apis/douyin/index/keywords/audience/get/), [Douyin trend-index keyword trends](https://dataxapi.com/apis/douyin/index/keywords/history/), [Douyin trend-index related keywords](https://dataxapi.com/apis/douyin/index/keywords/related/), [Douyin trend-index live hot topics](https://dataxapi.com/apis/douyin/index/trends/list/), [Douyin trend-index keyword hot videos](https://dataxapi.com/apis/douyin/index/videos/search/), [Douyin hot search board](https://dataxapi.com/apis/douyin/trends/list/)

Reddit endpoints: [Reddit post comments](https://dataxapi.com/apis/reddit/posts/comments/list/), [Reddit post detail](https://dataxapi.com/apis/reddit/posts/get/), [Reddit post search](https://dataxapi.com/apis/reddit/posts/search/), [Reddit popular posts](https://dataxapi.com/apis/reddit/posts/trending/), [Reddit community posts](https://dataxapi.com/apis/reddit/subreddits/posts/list/), [Reddit trending searches](https://dataxapi.com/apis/reddit/trends/list/), [Reddit user profile](https://dataxapi.com/apis/reddit/users/get/), [Reddit user posts](https://dataxapi.com/apis/reddit/users/posts/list/), [Reddit community profile](https://dataxapi.com/apis/reddit/subreddits/get/), [Reddit user active communities](https://dataxapi.com/apis/reddit/users/subreddits/list/), [Reddit video transcript](https://dataxapi.com/apis/reddit/posts/transcript/get/)

Related: [All Reddit endpoints](https://dataxapi.com/apis/reddit/), [Social media data](https://dataxapi.com/categories/social/), [The same thing on 2 platforms, side by side](https://dataxapi.com/roles/communities-get/), [The community object's fields](https://dataxapi.com/docs/objects/community/)

## Questions

### How much does the Reddit community profile API cost?

$0.0020 per call. The most one call can cost is $0.0020.

### When am I not charged?

Errors, timeouts and objects that do not exist are not charged.

### What happens if the object does not exist?

The answer is 404 not_found and nothing is charged. reason says which: not_found (it does not exist) or private_or_deleted.

---

Last checked 2026-10-18 19:59 UTC. Catalog revision c48ce454ae6c4c65. [HTML version](https://dataxapi.com/apis/reddit/subreddits/get/)
