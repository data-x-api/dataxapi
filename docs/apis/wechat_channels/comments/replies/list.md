# WeChat Channels comment replies API

Get a page of the replies under a comment on a WeChat Channels video, by the comment's and the video's IDs: text, replier, likes, time posted, IP location, which reply each answers. About 10 a page, with further pages. About 10 items a call, 20 at most; $0.0150 per call. Errors and timeouts are not charged.

- Endpoint: `GET https://api.dataxapi.com/v1/wechat_channels/comments/replies/list`
- ID: `wechat_channels.comments.replies.list`
- Also known as: wechat channels comment replies, channels second-level comments, wechat channels reply thread
- Price: $0.0150 / call
- Live status is not on this page, which is a snapshot. Read it with `GET https://api.dataxapi.com/v1/catalog/status`
- Returns: up to 20 a page, a page, with a cursor for the next
- Returns the standard comment object, the same on every platform
- [Run it in the Playground](https://dataxapi.com/console/playground/?capability=wechat_channels.comments.replies.list&params=%7B%22id%22%3A%2214462557903411284138%22%2C%22post_id%22%3A%2214462543356698040491%22%7D)
- In Chinese: [微信视频号评论回复 API](https://dataxapi.com/zh/apis/wechat_channels/comments/replies/list/)

## What you get

The first 2 rows of a response recorded 2026-10-29 10:24 UTC.

| Field | Value |
| --- | --- |
| published_at | 2024-08-26 06:23 UTC |
| metrics.likes | 0 |

## Parameters

| Parameter | Type | required | Description |
| --- | --- | --- | --- |
| `id` | text | Yes | The comment's ID, a string of digits: the id a Channels video's comments give. Example: `14462557903411284138`. |
| `post_id` | text | Yes | ID of the video the comment is on, a string of digits. Example: `14462543356698040491`. |
| `cursor` | text |  | Cursor returned by the previous page. Pass `page.next_cursor` of the page before, unchanged. Each page is charged as a call of its own. |
| `view` | text |  | How much of each item to return. All three cost the same. Values: `compact`, `standard` (default), `full`. |
| `fields` | list of text |  | Return only these fields. Each by its path, such as `author.name`. |

## Returned fields

`data.items` is a list of comment objects. Stable: fields are only ever added.

Three views: `compact` (the most used fields, long text cut short), `standard` (the default: every standard field) and `full` (adds `ext`, the platform's own fields). A field is in the view named and in every larger one.

| Field | Type | Description | From view | This endpoint |
| --- | --- | --- | --- | --- |
| `id` | text | ID. | `compact` | Yes |
| `url` | link | Link that opens the comment. | `compact` | The platform has none |
| `text` | text | Text. Long text: the compact view keeps the first 500 characters and says so in `warnings`. | `compact` | Yes |
| `published_at` | time | When it was posted. | `compact` | Yes |
| `author` | object | Commenter. | `compact` | Yes |
| `author.id` | text | Commenter's account ID. | `compact` | Yes |
| `author.username` | text | Commenter's handle. | `compact` | The platform has none |
| `author.name` | text | Commenter's display name. | `compact` | Yes |
| `author.avatar_url` | link | Commenter's avatar. | `standard` | Yes |
| `metrics` | object | Engagement counts. | `compact` | Yes |
| `metrics.likes` | integer | Likes. | `compact` | Yes |
| `metrics.comments` | integer | Replies. | `compact` | Not provided here |
| `post_id` | text | ID of the post it is under. | `compact` | Yes |
| `parent_id` | text | ID of the comment it replies to directly; null for a top-level comment. | `compact` | Yes |
| `root_id` | text | ID of the top-level comment of its thread; null for a top-level comment. | `compact` | Yes |
| `ext.ip_location` | text | IP location as the platform shows it. | `full` | Yes |
| `approximate` | list of object | Which numbers of this item are approximate or lower bounds; absent when all are exact. | `compact` | Yes |
| `approximate[].field` | text | Path of the field, such as metrics.views. | `compact` | Yes |
| `approximate[].kind` | text | Approximate, or a lower bound. Values: `approximate`, `lower_bound`. | `compact` | Yes |

A field with no value on an item is `null`. A field this endpoint cannot give is left out and listed in `meta.unavailable`.

Typical size of one item: `compact` 495 B, `standard` 659 B, `full` 692 B (measured on the response recorded 2026-10-29 10:24 UTC).

## Paging

About 10 items a page, 20 at most. The page size is the platform's; `limit` is not accepted.

For the next page pass `page.next_cursor` as `cursor`; a cursor is valid for 1 hour. `page.has_more` is false on the last page.

## When you are charged

| Case | Charged |
| --- | --- |
| A result with data | $0.0150, once per call |
| Each further page | charged as a call of its own |
| Invalid parameters, a failure or a timeout | not charged |
| The most one call can cost | $0.0150 (send `X-Max-Price` to refuse anything above your own limit) |

Prices as read 2026-11-26 12:17 UTC, under price book 22, in effect since 2026-11-25 13:46 UTC; the Playground reads the price in force before a run.

## If the object does not exist

A comment that does not exist cannot be told from one with no replies: both return an empty result, not a 404.

## Errors

Every error has the same structure: `code`, `message`, `charged`, `retry`, `retry_after_seconds`, `param`, `docs_url`.

| HTTP | Code | Meaning | Charged | Retry |
| --- | --- | --- | --- | --- |
| 400 | `invalid_params` | A parameter is invalid | As the answer's charged field says | After a fix |
| 400 | `request_not_served` | This combination of parameters cannot be served at present | No | After a fix |
| 400 | `max_price_exceeded` | The most this call could cost is above the limit you set | No | After a fix |
| 400 | `cursor_invalid` | The cursor does not exist | No | No |
| 400 | `cursor_mismatch` | The cursor was issued for another endpoint or other parameters | No | After a fix |
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
| 410 | `cursor_expired` | The cursor expired; start again from the first page | No | No |
| 410 | `run_expired` | This run has expired and starts no more calls | No | No |
| 429 | `rate_limited` | Too many requests, or too many calls in progress | No | Yes |
| 429 | `cost_cap_exceeded` | This account's allowance for today is used up | No | Yes |
| 429 | `uncharged_cost_limit` | Too many of this account's calls today returned nothing and were not charged; endpoints of this kind can be called again tomorrow (UTC) | No | Yes |
| 500 | `settlement_unknown` | Whether this call settled is not known; ask again with the same idempotency key, or look it up by request ID | Unknown: look the call up | With the same idempotency key |
| 500 | `internal_error` | The service failed | No | Yes |
| 502 | `upstream_failed` | No result came back this time and nothing was charged; retry shortly | No | Yes |
| 502 | `cursor_unavailable` | This cursor is unavailable just now; retry later or start again from the first page | No | Yes |
| 503 | `upstream_busy` | Busy just now; retry shortly | No | Yes |
| 503 | `capability_paused` | This endpoint is paused | No | Yes |
| 503 | `overloaded` | The service is busy; retry shortly | No | Yes |
| 504 | `timeout` | The data did not arrive in time; retry with the same idempotency key | No | Yes |

[All error codes](https://dataxapi.com/docs/errors/)

## Request

The key is read from the environment; no key is ever written into a page.

### cURL

```bash
curl -G "https://api.dataxapi.com/v1/wechat_channels/comments/replies/list" \
  --data-urlencode "id=14462557903411284138" \
  --data-urlencode "post_id=14462543356698040491" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
# pip install dataxapi
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.wechat_channels.comments.replies.list(id="14462557903411284138", post_id="14462543356698040491")
print(result["data"]["items"])
```

### TypeScript

```typescript
// npm i @dataxapi/sdk
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.wechat_channels.comments.replies.list({ id: "14462557903411284138", post_id: "14462543356698040491" });
console.log(result.data.items);
```

### CLI

```bash
dataxapi call wechat_channels.comments.replies.list id=14462557903411284138 post_id=14462543356698040491
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

Add this to your MCP client, then ask your agent to call `wechat_channels.comments.replies.list`.

## Responses

### 200

From a response recorded 2026-10-29 10:24 UTC. Names, text and IDs are examples, and so are the links: none is the recorded one (the page shows no one's personal data); the figures are as recorded. Long lists are cut. The request ID, cursor and balance are made up.

Size as sent: 7.0 KB in the standard view (5.4 KB compact, 7.3 KB full).

```jsonc
{
  "code": "ok",
  "request_id": "e9e409b6-e3cb-40fd-bf06-f1e23b6951db",
  "data": {
    "items": [
      {
        "id": "14637250366481393914",
        "text": "拍得好舒服，看了好几遍",
        "published_at": "2024-08-26T06:23:47.000Z",
        "author": {
          "id": "v2_060000231003b20f818ebb37f3934b23cd6adfb68a6297cb5488ef806b68a722a98880cdbd@finder",
          "name": "橘子汽水不加冰",
          "avatar_url": "https://wx.qlogo.cn/mmhead/hzQ8JbeeKJYZXQg9gAmQlG2JMofVtupH1UYlR8dn/132"
        },
        "metrics": { "likes": 0 },
        "post_id": "14195646620945421409",
        "parent_id": "14144696566634760031",
        "root_id": "14205951470598170649"
      },
      // … 9 more
    ]
  },
  "page": {
    "next_cursor": "c1.V_d5NAsponq-DBpVgSaPOsjyvg-_YBtjuRfJBU8T",
    "cursor_expires_at": "2026-10-29T11:24:58.000Z",
    "has_more": true,
    "returned": 10
  },
  "warnings": [],
  "meta": {
    "capability": "wechat_channels.comments.replies.list",
    "result_status": "complete",
    "fetched_at": "2026-10-29T10:24:58.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "url": "platform",
      "author.username": "platform",
      "metrics.comments": "capability"
    },
    "billing": {
      "amount": "0.015",
      "currency": "USD",
      "balance_after": "9.985"
    }
  }
}
```

### Empty

From a response recorded 2026-10-29 09:51 UTC. The request ID and balance are made up.

Size as sent: 497 B in the standard view (497 B compact, 497 B full).

```jsonc
{
  "code": "ok",
  "request_id": "51ef5a46-6e96-494f-8db8-77db0c1266c0",
  "data": { "items": [] },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 0
  },
  "warnings": [],
  "meta": {
    "capability": "wechat_channels.comments.replies.list",
    "result_status": "empty",
    "fetched_at": "2026-10-29T09:51:41.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "url": "platform",
      "author.username": "platform",
      "metrics.comments": "capability"
    },
    "billing": {
      "amount": "0.015",
      "currency": "USD",
      "balance_after": "9.985"
    }
  }
}
```

### 400

An example written to the specification, not a recorded response.

```json
{
  "code": "invalid_params",
  "request_id": "fd34a1e2-3ccc-4c56-82ce-0fce01ef9ce2",
  "message": "A parameter is invalid",
  "message_zh": "参数不合法",
  "charged": false,
  "retry": "after_fix",
  "retry_after_seconds": null,
  "param": null,
  "problems": ["id is required", "post_id is required"],
  "docs_url": "https://dataxapi.com/docs/errors#invalid_params"
}
```

### 402

An example written to the specification, not a recorded response.

```json
{
  "code": "insufficient_balance",
  "request_id": "8c86cf50-7e5e-4ee3-b754-73e9be32f311",
  "message": "The balance is too low",
  "message_zh": "余额不足",
  "charged": false,
  "retry": "after_fix",
  "retry_after_seconds": null,
  "param": null,
  "required": "0.015",
  "available": "0",
  "top_up_url": "https://dataxapi.com/console/billing/?amount=10",
  "next_step": "The balance does not cover this call ($0.015). Top up at top_up_url: $10 at least, about 666 calls at this price; Alipay or a card, and the balance never expires. Then send the same request again, unchanged. Nothing was charged for this one.",
  "next_step_zh": "余额不够这次调用（$0.015）。到 top_up_url 充值：最低 $10，按这次的价格约够 666 次；支付宝、银行卡都能付，余额不过期。到账后把同一个请求原样再发一次。这次没有扣钱。",
  "docs_url": "https://dataxapi.com/docs/errors#insufficient_balance"
}
```

### 502

An example written to the specification, not a recorded response.

```json
{
  "code": "upstream_failed",
  "request_id": "d7aa1ce7-2506-47b7-99db-c59da1a77d29",
  "message": "No result came back this time and nothing was charged; retry shortly",
  "message_zh": "这次没有取到结果，没有扣费，可以稍后重试",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

This recorded response is 7,111 tokens as the platform's own JSON, 3,118 as DataXAPI's JSON, and 2,157 as an AI reads it through DataXAPI's MCP server: 70% fewer (counted 2026-11-06).

[This example as a JSON file](https://dataxapi.com/apis/wechat_channels/comments/replies/list.example.json)

## Use it in your AI

`dataxapi setup` gives the agents on your machine (Claude Code, Codex, Cursor) the DataXAPI MCP server and the base skill. The key is read from DATAXAPI_API_KEY; none is written into a file.

MCP server: `https://api.dataxapi.com/mcp`. The entry for your client is under MCP in the request examples of this page; then ask your agent to call `wechat_channels.comments.replies.list`.

Or paste this to any AI:

> Read https://dataxapi.com/apis/wechat_channels/comments/replies/list.md and help me use the DataXAPI endpoint wechat_channels.comments.replies.list (WeChat Channels comment replies).

[Open in ChatGPT](https://chatgpt.com/?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fwechat_channels%2Fcomments%2Freplies%2Flist.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20wechat_channels.comments.replies.list%20%28WeChat%20Channels%20comment%20replies%29.) · [Open in Claude](https://claude.ai/new?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fwechat_channels%2Fcomments%2Freplies%2Flist.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20wechat_channels.comments.replies.list%20%28WeChat%20Channels%20comment%20replies%29.)

## Related

Part of DataXAPI's Social media data. The same key also works for: Creators, Ads, E-commerce.

The same thing on other platforms: [Douyin comment replies](https://dataxapi.com/apis/douyin/comments/replies/list/), [Bilibili comment replies](https://dataxapi.com/apis/bilibili/comments/replies/list/), [Kuaishou comment replies](https://dataxapi.com/apis/kuaishou/comments/replies/list/), [Instagram comment replies](https://dataxapi.com/apis/instagram/comments/replies/list/), [TikTok comment replies](https://dataxapi.com/apis/tiktok/comments/replies/list/), [Weibo comment replies](https://dataxapi.com/apis/weibo/comments/replies/list/), [Xiaohongshu comment replies](https://dataxapi.com/apis/xiaohongshu/comments/replies/list/), [YouTube comment replies](https://dataxapi.com/apis/youtube/comments/replies/list/), [Zhihu comment replies](https://dataxapi.com/apis/zhihu/comments/replies/list/)

More Social media data on other platforms: [Bilibili video comments](https://dataxapi.com/apis/bilibili/videos/comments/list/), [Douyin video comments](https://dataxapi.com/apis/douyin/videos/comments/list/), [Kuaishou video comments](https://dataxapi.com/apis/kuaishou/videos/comments/list/), [Facebook post comments](https://dataxapi.com/apis/facebook/posts/comments/list/), [Instagram post comments](https://dataxapi.com/apis/instagram/posts/comments/list/)

WeChat Channels endpoints: [WeChat Channels account profile](https://dataxapi.com/apis/wechat_channels/users/get/), [WeChat Channels video detail](https://dataxapi.com/apis/wechat_channels/videos/get/), [WeChat Channels video comments](https://dataxapi.com/apis/wechat_channels/videos/comments/list/), [WeChat Channels video share link](https://dataxapi.com/apis/wechat_channels/videos/share_link/get/), [WeChat Channels account collections](https://dataxapi.com/apis/wechat_channels/users/collections/list/), [WeChat Channels collection videos](https://dataxapi.com/apis/wechat_channels/collections/videos/list/), [WeChat Channels account videos](https://dataxapi.com/apis/wechat_channels/users/videos/list/), [WeChat Channels video search](https://dataxapi.com/apis/wechat_channels/videos/search/), [WeChat Channels account profile (backup)](https://dataxapi.com/apis/wechat_channels/backup/users/get/), [WeChat Channels account videos (backup)](https://dataxapi.com/apis/wechat_channels/backup/users/videos/list/), [WeChat Channels video search (backup)](https://dataxapi.com/apis/wechat_channels/backup/videos/search/), [WeChat Channels account search](https://dataxapi.com/apis/wechat_channels/users/search/), [WeChat Channels video stats](https://dataxapi.com/apis/wechat_channels/videos/metrics/), [WeChat Channels comment replies](https://dataxapi.com/apis/wechat_channels/comments/replies/list/), [WeChat Channels live replays](https://dataxapi.com/apis/wechat_channels/users/live_replays/list/), [WeChat Channels video download](https://dataxapi.com/apis/wechat_channels/videos/media/get/), [WeChat Channels video transcript](https://dataxapi.com/apis/wechat_channels/videos/transcript/get/)

How-to guides and answers: [What WeChat data APIs are there? Official Accounts, Channels and WeChat Search (2026)](https://dataxapi.com/answers/wechat-data-apis/), [Can WeChat Channels comments be exported? (2026)](https://dataxapi.com/answers/export-wechat-channels-comments/), [How do I collect WeChat Channels data? The Channels assistant, WeChat Search and data APIs (2026)](https://dataxapi.com/answers/how-to-collect-wechat-channels-data/)

Related: [All WeChat Channels endpoints](https://dataxapi.com/apis/wechat_channels/), [Social media data](https://dataxapi.com/categories/social/), [The same thing on 10 platforms, side by side](https://dataxapi.com/roles/comments-replies-list/), [The comment object's fields](https://dataxapi.com/docs/objects/comment/)

## Questions

### How much does the WeChat Channels comment replies API cost?

$0.0150 per call. The most one call can cost is $0.0150.

### When am I not charged?

Errors and timeouts are not charged.

### How many items does one call return, and how do I get the next page?

About 10 items a page, 20 at most. The page size is the platform's; limit is not accepted. For the next page pass page.next_cursor as cursor; a cursor is valid for 1 hour. page.has_more is false on the last page.

### What happens if the object does not exist?

A comment that does not exist cannot be told from one with no replies: both return an empty result, not a 404.

---

Last checked 2026-11-26 12:17 UTC. Catalog revision 0051cce45e9530b9. [HTML version](https://dataxapi.com/apis/wechat_channels/comments/replies/list/)
