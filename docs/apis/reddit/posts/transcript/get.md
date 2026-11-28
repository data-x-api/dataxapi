# Reddit video transcript API

Get what is said in the video of a Reddit post by ID or link: the captions Reddit makes for a video it hosts, as the whole text and timed segments. One object a call; $0.0020 per call. Errors, timeouts and objects that do not exist are not charged.

- Endpoint: `GET https://api.dataxapi.com/v1/reddit/posts/transcript/get`
- ID: `reddit.posts.transcript.get`
- Also known as: reddit video to text, reddit video captions
- Price: $0.0020 / call
- Live status is not on this page, which is a snapshot. Read it with `GET https://api.dataxapi.com/v1/catalog/status`
- Returns: 1 object, one transcript object
- Returns the standard transcript object, the same on every platform
- [Run it in the Playground](https://dataxapi.com/console/playground/?capability=reddit.posts.transcript.get&params=%7B%22id%22%3A%22t3_1gea6yx%22%7D)
- In Chinese: [Reddit 视频字幕 API](https://dataxapi.com/zh/apis/reddit/posts/transcript/get/)

## What you get

The first 2 rows of a response recorded 2026-10-12 21:52 UTC.

| start | end |
| --- | --- |
| 7.1 | 14.36 |
| 15.3 | 22.4 |

## Parameters

| Parameter | Type | required | Description |
| --- | --- | --- | --- |
| `id` | text | give exactly one of `id`, `url` | Post ID, with its t3_ prefix. Example: `t3_1gea6yx`. |
| `url` | text | give exactly one of `id`, `url` | Link to the post, pasted as it is: the https://www.reddit.com/r/<community>/comments/… web link (phone or old site too), a redd.it short link, or the /r/<community>/s/… link the app shares. A share link is opened once to see which post it leads to. Example: `https://www.reddit.com/comments/1gea6yx/`. Full link: `https://www.reddit.com/comments/1gea6yx/`. Share text with a link inside: `Look at this https://www.reddit.com/comments/1gea6yx/ via the app`. |
| `view` | text |  | How much of each item to return. All three cost the same. Values: `compact`, `standard` (default), `full`. |
| `fields` | list of text |  | Return only these fields. Each by its path, such as `author.name`. |

## Returned fields

`data.item` is one transcript object. Stable: fields are only ever added.

Three views: `compact` (the most used fields, long text cut short), `standard` (the default: every standard field) and `full` (adds `ext`, the platform's own fields). A field is in the view named and in every larger one.

| Field | Type | Description | From view | This endpoint |
| --- | --- | --- | --- | --- |
| `post_id` | text | ID of the post it belongs to. | `compact` | Yes |
| `status` | text | done: the text is here; processing: a long video is still being recognised and there is no text yet: call the same endpoint with job after retry_after_seconds seconds. Values: `done`, `processing`. | `compact` | Not provided here |
| `job` | text | A long video's job: call the same endpoint with it for the text, within 24 hours of submitting; only while processing. | `compact` | Not provided here |
| `retry_after_seconds` | integer | About how many seconds to wait before asking again; only while processing. | `compact` | Not provided here |
| `lang` | text | Language code. On this platform: The language of the captions file read. | `compact` | Yes |
| `text` | text | The whole text. Long text: the compact view keeps the first 500 characters and says so in `warnings`. | `compact` | Yes |
| `segments` | list of object | Timed segments. | `standard` | Yes |
| `segments[].start` | number | Start, in seconds. | `standard` | Yes |
| `segments[].end` | number | End, in seconds. | `standard` | Yes |
| `segments[].text` | text | Text of the segment. | `standard` | Yes |
| `segments[].speaker` | text | Who said the segment (1, 2…, one number a person); null where telling speakers apart was not asked for. | `standard` | Not provided here |
| `segments[].words` | list of object | The timing of each word (character) of the segment. | `full` | Not provided here |
| `segments[].words[].start` | number | Start, in seconds. | `full` | Not provided here |
| `segments[].words[].end` | number | End, in seconds. | `full` | Not provided here |
| `segments[].words[].text` | text | The word (character). | `full` | Not provided here |
| `duration` | number | Length of what was transcribed, in seconds; what an endpoint billed by the minute charges by. | `standard` | Not provided here |
| `post` | object | The post the words are from: title, caption, author, length, time posted, likes and comments, as far as the platform gives them. | `standard` | Not provided here |
| `post.title` | text | Title; none on a platform without titles. | `standard` | Not provided here |
| `post.text` | text | Caption or description. Long text: the compact view keeps the first 500 characters and says so in `warnings`. | `standard` | Not provided here |
| `post.url` | link | Link to the post. | `standard` | Not provided here |
| `post.published_at` | time | Time posted. | `standard` | Not provided here |
| `post.duration` | number | Length of the video as the platform gives it, in seconds. | `standard` | Not provided here |
| `post.author` | object | Author. | `standard` | Not provided here |
| `post.author.id` | text | Author's ID. | `standard` | Not provided here |
| `post.author.name` | text | Author's name. | `standard` | Not provided here |
| `post.metrics` | object | Engagement counts. | `standard` | Not provided here |
| `post.metrics.likes` | integer | Likes. | `standard` | Not provided here |
| `post.metrics.comments` | integer | Comments. | `standard` | Not provided here |
| `approximate` | list of object | Which numbers of this item are approximate or lower bounds; absent when all are exact. | `compact` | Yes |
| `approximate[].field` | text | Path of the field, such as metrics.views. | `compact` | Yes |
| `approximate[].kind` | text | Approximate, or a lower bound. Values: `approximate`, `lower_bound`. | `compact` | Yes |

A field with no value on an item is `null`. A field this endpoint cannot give is left out and listed in `meta.unavailable`.

Typical size of one item: `compact` 175 B, `standard` 386 B, `full` 386 B (measured on the response recorded 2026-10-12 21:52 UTC).

## Paging

One object per call: there is nothing to page.

## When you are charged

| Case | Charged |
| --- | --- |
| A result with data | $0.0020, once per call |
| The object does not exist (404) | not charged |
| Invalid parameters, a failure or a timeout | not charged |
| The most one call can cost | $0.0020 (send `X-Max-Price` to refuse anything above your own limit) |

Prices as read 2026-11-28 06:28 UTC, under price book 30, in effect since 2026-11-28 04:43 UTC; the Playground reads the price in force before a run.

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
curl -G "https://api.dataxapi.com/v1/reddit/posts/transcript/get" \
  --data-urlencode "id=t3_1gea6yx" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
# pip install dataxapi
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.reddit.posts.transcript.get(id="t3_1gea6yx")
print(result["data"]["item"])
```

### TypeScript

```typescript
// npm i @dataxapi/sdk
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.reddit.posts.transcript.get({ id: "t3_1gea6yx" });
console.log(result.data.item);
```

### CLI

```bash
dataxapi call reddit.posts.transcript.get id=t3_1gea6yx
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

Add this to your MCP client, then ask your agent to call `reddit.posts.transcript.get`.

## Responses

### 200

From a response recorded 2026-10-12 21:52 UTC. Names, text and IDs are examples, and so are the links: none is the recorded one (the page shows no one's personal data); the figures are as recorded. Long lists are cut. The request ID, cursor and balance are made up.

Size as sent: 892 B in the standard view (681 B compact, 892 B full).

```jsonc
{
  "code": "ok",
  "request_id": "2dbe23f8-9d9e-44fb-85f3-e853f69abdf2",
  "data": {
    "item": {
      "post_id": "t3_wn8lv2e",
      "lang": "en",
      "text": "Hey everyone, today I am going through what I packed for weekend hiking. Short version: light, fits in one bag, hard to break. Let's go piece by piece.",
      "segments": [
        {
          "start": 7.1,
          "end": 14.36,
          "text": "Hey everyone, today I am going through what I packed for weekend hiking."
        },
        {
          "start": 15.3,
          "end": 22.4,
          "text": "Short version: light, fits in one bag, hard to break."
        }
      ]
    }
  },
  "warnings": [],
  "meta": {
    "capability": "reddit.posts.transcript.get",
    "result_status": "complete",
    "fetched_at": "2026-10-12T21:52:57.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "segments.speaker": "capability",
      "segments.words": "capability",
      "duration": "capability",
      "post": "capability",
      "status": "capability",
      "job": "capability",
      "retry_after_seconds": "capability"
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
  "request_id": "537024dc-33d9-442d-8b02-023108d86a4c",
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
  "request_id": "5c5e7ac4-c188-4e13-a262-d82bf0564192",
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
  "request_id": "d942683e-882c-4fbe-8851-763964c91314",
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
  "request_id": "ab6a2597-1872-483d-a48e-cea761a32d04",
  "message": "No result came back this time and nothing was charged; retry shortly",
  "message_zh": "这次没有取到结果，没有扣费，可以稍后重试",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

This recorded response is 1,386 tokens as the platform's own JSON, 225 as DataXAPI's JSON, and 103 as an AI reads it through DataXAPI's MCP server: 93% fewer (counted 2026-11-06).

[This example as a JSON file](https://dataxapi.com/apis/reddit/posts/transcript/get.example.json)

## Use it in your AI

`dataxapi setup` gives the agents on your machine (Claude Code, Codex, Cursor) the DataXAPI MCP server and the base skill. The key is read from DATAXAPI_API_KEY; none is written into a file.

MCP server: `https://api.dataxapi.com/mcp`. The entry for your client is under MCP in the request examples of this page; then ask your agent to call `reddit.posts.transcript.get`.

Or paste this to any AI:

> Read https://dataxapi.com/apis/reddit/posts/transcript/get.md and help me use the DataXAPI endpoint reddit.posts.transcript.get (Reddit video transcript).

[Open in ChatGPT](https://chatgpt.com/?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Freddit%2Fposts%2Ftranscript%2Fget.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20reddit.posts.transcript.get%20%28Reddit%20video%20transcript%29.) · [Open in Claude](https://claude.ai/new?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Freddit%2Fposts%2Ftranscript%2Fget.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20reddit.posts.transcript.get%20%28Reddit%20video%20transcript%29.)

## Related

Part of DataXAPI's Social media data. The same key also works for: Creators, Ads, E-commerce.

The same thing on other platforms: [Bilibili video transcript (video to text)](https://dataxapi.com/apis/bilibili/videos/transcript/get/), [Douyin video transcript (video to text)](https://dataxapi.com/apis/douyin/videos/transcript/get/), [Kuaishou video transcript (video to text)](https://dataxapi.com/apis/kuaishou/videos/transcript/get/), [Meta ad video transcript](https://dataxapi.com/apis/meta/ads/transcript/get/), [Instagram video transcript](https://dataxapi.com/apis/instagram/posts/transcript/get/), [TikTok video transcript](https://dataxapi.com/apis/tiktok/videos/transcript/get/), [Weibo video transcript (video to text)](https://dataxapi.com/apis/weibo/posts/transcript/get/), [YouTube video transcript](https://dataxapi.com/apis/youtube/videos/transcript/get/), [LinkedIn video transcript](https://dataxapi.com/apis/linkedin/posts/transcript/get/), [X video transcript](https://dataxapi.com/apis/x/posts/transcript/get/), [Xiaohongshu video transcript (video to text)](https://dataxapi.com/apis/xiaohongshu/videos/transcript/get/), [WeChat Channels video transcript](https://dataxapi.com/apis/wechat_channels/videos/transcript/get/)

More Social media data on other platforms: [Douyin comment replies](https://dataxapi.com/apis/douyin/comments/replies/list/), [Douyin hashtag videos](https://dataxapi.com/apis/douyin/hashtags/videos/list/), [Bilibili comment replies](https://dataxapi.com/apis/bilibili/comments/replies/list/), [Bilibili hot searches](https://dataxapi.com/apis/bilibili/trends/list/), [Bilibili user profile](https://dataxapi.com/apis/bilibili/users/get/), [Bilibili user videos](https://dataxapi.com/apis/bilibili/users/videos/list/), [Bilibili video comments](https://dataxapi.com/apis/bilibili/videos/comments/list/), [Bilibili video detail](https://dataxapi.com/apis/bilibili/videos/get/)

Reddit endpoints: [Reddit post comments](https://dataxapi.com/apis/reddit/posts/comments/list/), [Reddit post detail](https://dataxapi.com/apis/reddit/posts/get/), [Reddit post search](https://dataxapi.com/apis/reddit/posts/search/), [Reddit popular posts](https://dataxapi.com/apis/reddit/posts/trending/), [Reddit community posts](https://dataxapi.com/apis/reddit/subreddits/posts/list/), [Reddit trending searches](https://dataxapi.com/apis/reddit/trends/list/), [Reddit user profile](https://dataxapi.com/apis/reddit/users/get/), [Reddit user posts](https://dataxapi.com/apis/reddit/users/posts/list/), [Reddit community profile](https://dataxapi.com/apis/reddit/subreddits/get/), [Reddit user active communities](https://dataxapi.com/apis/reddit/users/subreddits/list/), [Reddit video transcript](https://dataxapi.com/apis/reddit/posts/transcript/get/)

Skills that use this endpoint: [Breaking down a hit](https://dataxapi.com/skills/viral/), [Videos to text](https://dataxapi.com/skills/transcripts/), [A creator's videos to text](https://dataxapi.com/skills/creator-transcripts/)

Related: [All Reddit endpoints](https://dataxapi.com/apis/reddit/), [Social media data](https://dataxapi.com/categories/social/), [The same thing on 13 platforms, side by side](https://dataxapi.com/roles/transcripts-get/), [The transcript object's fields](https://dataxapi.com/docs/objects/transcript/)

## Questions

### How much does the Reddit video transcript API cost?

$0.0020 per call. The most one call can cost is $0.0020.

### When am I not charged?

Errors, timeouts and objects that do not exist are not charged.

### What happens if the object does not exist?

The answer is 404 not_found and nothing is charged. reason says which: not_found (it does not exist) or private_or_deleted.

---

Last checked 2026-11-28 06:28 UTC. Catalog revision ceced48b38f71468. [HTML version](https://dataxapi.com/apis/reddit/posts/transcript/get/)
