# X community profile API

Get an X community by its ID: name, description, members, moderators, how people join, when it was created. One object a call; $0.0004 per call. Errors, timeouts and objects that do not exist are not charged.

- Endpoint: `GET https://api.dataxapi.com/v1/x/communities/get`
- ID: `x.communities.get`
- Also known as: twitter community info, x community details, X community detail
- Price: $0.0004 / call
- Live status is not on this page, which is a snapshot. Read it with `GET https://api.dataxapi.com/v1/catalog/status`
- Returns: 1 object, one community object
- Returns community, a preview structure that may still change
- [Run it in the Playground](https://dataxapi.com/console/playground/?capability=x.communities.get&params=%7B%22id%22%3A%221493446837214187523%22%7D)
- In Chinese: [X 社群资料 API](https://dataxapi.com/zh/apis/x/communities/get/)

## What you get

The first 3 rows of a response recorded 2026-10-12 21:39 UTC.

| Field | Value |
| --- | --- |
| nsfw | false |
| created_at | 2022-02-15 04:47 UTC |
| metrics.members | 268,685 |

## Parameters

| Parameter | Type | required | Description |
| --- | --- | --- | --- |
| `id` | text | Yes | Community ID, a string of digits. Example: `1493446837214187523`. |
| `view` | text |  | How much of each item to return. All three cost the same. Values: `compact`, `standard` (default), `full`. |
| `fields` | list of text |  | Return only these fields. Each by its path, such as `author.name`. |

## Returned fields

`data.item` is one community object. Preview: the structure may change, announced beforehand.

Three views: `compact` (the most used fields, long text cut short), `standard` (the default: every standard field) and `full` (adds `ext`, the platform's own fields). A field is in the view named and in every larger one.

| Field | Type | Description | From view | This endpoint |
| --- | --- | --- | --- | --- |
| `id` | text | ID; pass it unchanged to the endpoints that get the community and list its posts. | `compact` | Yes |
| `name` | text | Name of the community. | `compact` | Yes |
| `url` | link | Link that opens the community. | `compact` | Yes |
| `description` | text | What the community says it is about. Long text: the compact view keeps the first 500 characters and says so in `warnings`. | `compact` | Yes |
| `avatar_url` | link | The community's icon. | `standard` | The platform has none |
| `nsfw` | yes/no | Whether it is marked not safe for work. | `standard` | Yes |
| `created_at` | time | When the community was created. | `standard` | Yes |
| `metrics` | object | Community counts. | `compact` | Yes |
| `metrics.members` | integer | Members. | `compact` | Yes |
| `ext.moderators` | integer | Number of moderators. | `full` | Yes |
| `ext.join_policy` | text | How people join, as the platform words it (Open, for one). | `full` | Yes |
| `ext.topic` | text | The community's main topic; null when none is set. | `full` | Yes |
| `ext.cover_url` | link | The community's banner image. | `full` | Yes |
| `approximate` | list of object | Which numbers of this item are approximate or lower bounds; absent when all are exact. | `compact` | Yes |
| `approximate[].field` | text | Path of the field, such as metrics.views. | `compact` | Yes |
| `approximate[].kind` | text | Approximate, or a lower bound. Values: `approximate`, `lower_bound`. | `compact` | Yes |

A field with no value on an item is `null`. A field this endpoint cannot give is left out and listed in `meta.unavailable`.

Typical size of one item: `compact` 260 B, `standard` 313 B, `full` 491 B (measured on the response recorded 2026-10-12 21:39 UTC).

## Paging

One object per call: there is nothing to page.

## When you are charged

| Case | Charged |
| --- | --- |
| A result with data | $0.0004, once per call |
| The object does not exist (404) | not charged |
| Invalid parameters, a failure of ours or of the data source, a timeout | not charged |
| The most one call can cost | $0.0004 (send `X-Max-Price` to refuse anything above your own limit) |

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
curl -G "https://api.dataxapi.com/v1/x/communities/get" \
  --data-urlencode "id=1493446837214187523" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.x.communities.get(id="1493446837214187523")
print(result["data"]["item"])
```

### TypeScript

```typescript
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.x.communities.get({ id: "1493446837214187523" });
console.log(result.data.item);
```

### CLI

```bash
dataxapi call x.communities.get id=1493446837214187523
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

Add this to your MCP client, then ask your agent to call `x.communities.get`.

## Responses

### 200

From a response recorded 2026-10-12 21:39 UTC. Names, text and IDs are examples, and so are the links: none is the recorded one (the page shows no one's personal data); the figures are as recorded. Long lists are cut. The request ID, cursor and balance are made up.

Size as sent: 651 B in the standard view (598 B compact, 829 B full).

```jsonc
{
  "code": "ok",
  "request_id": "7e1508ca-5774-4c9e-8cd7-7cea0122a06e",
  "data": {
    "item": {
      "id": "1880166407908944826",
      "name": "Gear talk",
      "url": "https://x.com/i/communities/1880166407908944826",
      "description": "Photos, trails and too much coffee.",
      "nsfw": false,
      "created_at": "2022-02-15T04:47:27.000Z",
      "metrics": { "members": 268685 }
    }
  },
  "warnings": [],
  "meta": {
    "capability": "x.communities.get",
    "result_status": "complete",
    "fetched_at": "2026-10-12T21:39:16.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": { "avatar_url": "platform" },
    "billing": {
      "amount": "0.0004",
      "currency": "USD",
      "balance_after": "9.9996"
    }
  }
}
```

### 400

An example written to the specification, not a recorded response.

```json
{
  "code": "invalid_params",
  "request_id": "5b6c48a9-7184-4d4b-9bce-dabd52869156",
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
  "request_id": "8cc64183-2caf-4503-9bd7-9852fc12614b",
  "message": "The balance is too low",
  "message_zh": "余额不足",
  "charged": false,
  "retry": "after_fix",
  "retry_after_seconds": null,
  "param": null,
  "required": "0.0004",
  "available": "0",
  "docs_url": "https://dataxapi.com/docs/errors#insufficient_balance"
}
```

### 404

An example written to the specification, not a recorded response.

```json
{
  "code": "not_found",
  "request_id": "869bdf9b-26d2-4b81-b6a2-80fefb604ac1",
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
  "request_id": "ba0078b0-c353-457c-9d20-839ead06ecfc",
  "message": "The data source failed",
  "message_zh": "数据来源出错",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

[This example as a JSON file](https://dataxapi.com/apis/x/communities/get.example.json)

## Use it in your AI

`dataxapi setup` gives the agents on your machine (Claude Code, Codex, Cursor) the DataXAPI MCP server and the base skill. The key is read from DATAXAPI_API_KEY; none is written into a file.

MCP server: `https://api.dataxapi.com/mcp`. The entry for your client is under MCP in the request examples of this page; then ask your agent to call `x.communities.get`.

Or paste this to any AI:

> Read https://dataxapi.com/apis/x/communities/get.md and help me use the DataXAPI endpoint x.communities.get (X community profile).

[Open in ChatGPT](https://chatgpt.com/?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fx%2Fcommunities%2Fget.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20x.communities.get%20%28X%20community%20profile%29.) · [Open in Claude](https://claude.ai/new?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fx%2Fcommunities%2Fget.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20x.communities.get%20%28X%20community%20profile%29.)

## Related

Part of DataXAPI's Social media data. The same key also works for: Creators, Ads, E-commerce.

The same thing on other platforms: [Reddit community profile](https://dataxapi.com/apis/reddit/subreddits/get/)

More Social media data on other platforms: [Reddit user active communities](https://dataxapi.com/apis/reddit/users/subreddits/list/), [Douyin comment replies](https://dataxapi.com/apis/douyin/comments/replies/list/), [Douyin hashtag videos](https://dataxapi.com/apis/douyin/hashtags/videos/list/), [Bilibili comment replies](https://dataxapi.com/apis/bilibili/comments/replies/list/), [Bilibili hot searches](https://dataxapi.com/apis/bilibili/trends/list/), [Bilibili user profile](https://dataxapi.com/apis/bilibili/users/get/), [Bilibili user videos](https://dataxapi.com/apis/bilibili/users/videos/list/), [Bilibili video comments](https://dataxapi.com/apis/bilibili/videos/comments/list/), [Bilibili video detail](https://dataxapi.com/apis/bilibili/videos/get/)

X Communities endpoints: [X community posts](https://dataxapi.com/apis/x/communities/posts/list/), [X community profile](https://dataxapi.com/apis/x/communities/get/), [X community members](https://dataxapi.com/apis/x/communities/members/list/)

X Lists endpoints: [X list posts](https://dataxapi.com/apis/x/lists/posts/list/), [X list followers](https://dataxapi.com/apis/x/lists/followers/list/), [X list members](https://dataxapi.com/apis/x/lists/members/list/)

X (Twitter) endpoints: [X article detail](https://dataxapi.com/apis/x/posts/article/get/), [X post detail](https://dataxapi.com/apis/x/posts/get/), [X post quotes](https://dataxapi.com/apis/x/posts/quotes/list/), [X post replies](https://dataxapi.com/apis/x/posts/replies/list/), [X post retweeters](https://dataxapi.com/apis/x/posts/retweeters/list/), [X post search](https://dataxapi.com/apis/x/posts/search/), [X thread context](https://dataxapi.com/apis/x/threads/posts/list/), [X trends](https://dataxapi.com/apis/x/trends/list/), [X user followers](https://dataxapi.com/apis/x/users/followers/list/), [X user following](https://dataxapi.com/apis/x/users/following/list/), [X user profile](https://dataxapi.com/apis/x/users/get/), [X user mentions](https://dataxapi.com/apis/x/users/mentions/list/), [X user posts](https://dataxapi.com/apis/x/users/posts/list/), [X user search](https://dataxapi.com/apis/x/users/search/), [X video transcript](https://dataxapi.com/apis/x/posts/transcript/get/)

Related: [All X Communities endpoints](https://dataxapi.com/apis/x/communities/), [All X (Twitter) endpoints](https://dataxapi.com/apis/x/), [Social media data](https://dataxapi.com/categories/social/), [The same thing on 2 platforms, side by side](https://dataxapi.com/roles/communities-get/), [The community object's fields](https://dataxapi.com/docs/objects/community/)

## Questions

### How much does the X community profile API cost?

$0.0004 per call. The most one call can cost is $0.0004.

### When am I not charged?

Errors, timeouts and objects that do not exist are not charged.

### What happens if the object does not exist?

The answer is 404 not_found and nothing is charged. reason says which: not_found (it does not exist) or private_or_deleted.

---

Last checked 2026-10-18 19:59 UTC. Catalog revision c48ce454ae6c4c65. [HTML version](https://dataxapi.com/apis/x/communities/get/)
