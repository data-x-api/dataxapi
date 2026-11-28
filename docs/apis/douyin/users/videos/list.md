# Douyin user videos API

Get a page of the videos a Douyin account has posted, newest first: caption, engagement counts, time posted. Up to 20 items a call; $0.0020 per call. Errors and timeouts are not charged.

- Endpoint: `GET https://api.dataxapi.com/v1/douyin/users/videos/list`
- ID: `douyin.users.videos.list`
- Also known as: douyin user posts, douyin account videos
- Price: $0.0020 / call
- Live status is not on this page, which is a snapshot. Read it with `GET https://api.dataxapi.com/v1/catalog/status`
- Returns: 20 a page, a page, with a cursor for the next
- Returns the standard post object, the same on every platform
- `id` is in the link: `douyin.com/user/<id>`. Or pass the whole link as `url`.
- [Run it in the Playground](https://dataxapi.com/console/playground/?capability=douyin.users.videos.list&params=%7B%22id%22%3A%22MS4wLjABAAAAZ0aPDJzFhBrs0q3wVsp2a9WWrBuAUMsVyygoaO0bCw8%22%7D)
- In Chinese: [抖音用户视频 API](https://dataxapi.com/zh/apis/douyin/users/videos/list/)

## What you get

The first 8 rows of a response recorded 2026-10-29 11:25 UTC.

| Field | Value |
| --- | --- |
| type | video |
| lang | zh |
| published_at | 2026-10-28 13:00 UTC |
| metrics.likes | 9,137 |
| metrics.comments | 822 |
| metrics.shares | 2,501 |
| metrics.favorites | 1,252 |
| is_pinned | false |

## Parameters

| Parameter | Type | required | Description |
| --- | --- | --- | --- |
| `id` | text | give exactly one of `id`, `url` | Account ID (the sec_uid, the string that starts with MS4w). With only a profile link or a share text, give it as url. Example: `MS4wLjABAAAAZ0aPDJzFhBrs0q3wVsp2a9WWrBuAUMsVyygoaO0bCw8`. |
| `url` | text | give exactly one of `id`, `url` | Link to the profile, pasted as it is: the https://www.douyin.com/user/… web link, the page a share opens on a phone, the v.douyin.com short link the app copies, or a whole share text with one of these in it. A short link is opened once to see which account it leads to. Example: `https://www.douyin.com/user/MS4wLjABAAAAZ0aPDJzFhBrs0q3wVsp2a9WWrBuAUMsVyygoaO0bCw8`. Full link: `https://www.douyin.com/user/MS4wLjABAAAAZ0aPDJzFhBrs0q3wVsp2a9WWrBuAUMsVyygoaO0bCw8`. Share text with a link inside: `长按复制此条消息，打开抖音搜索，查看TA的更多作品。 https://www.douyin.com/user/MS4wLjABAAAAZ0aPDJzFhBrs0q3wVsp2a9WWrBuAUMsVyygoaO0bCw8`. |
| `cursor` | text |  | Cursor returned by the previous page. Pass `page.next_cursor` of the page before, unchanged. Each page is charged as a call of its own. |
| `view` | text |  | How much of each item to return. All three cost the same. Values: `compact`, `standard` (default), `full`. |
| `fields` | list of text |  | Return only these fields. Each by its path, such as `author.name`. |

## Returned fields

`data.items` is a list of post objects. Stable: fields are only ever added.

Three views: `compact` (the most used fields, long text cut short), `standard` (the default: every standard field) and `full` (adds `ext`, the platform's own fields). A field is in the view named and in every larger one.

| Field | Type | Description | From view | This endpoint |
| --- | --- | --- | --- | --- |
| `id` | text | ID; pass it unchanged to the get endpoint. | `compact` | Yes |
| `url` | link | Link that opens the post. | `compact` | Yes |
| `type` | text | Content format. Values: `video`, `image`, `text`, `article`. | `compact` | Yes |
| `title` | text | Title. | `compact` | Yes |
| `text` | text | Body text. Long text: the compact view keeps the first 500 characters and says so in `warnings`. | `compact` | Yes |
| `lang` | text | Language of the text. | `standard` | Yes |
| `published_at` | time | When it was published. | `compact` | Yes |
| `author` | object | Author. | `compact` | Yes |
| `author.id` | text | Author's account ID. | `compact` | Yes |
| `author.username` | text | Author's handle. | `compact` | Yes |
| `author.name` | text | Author's display name. | `compact` | Yes |
| `author.avatar_url` | link | Author's avatar. | `standard` | Yes |
| `author.verified` | yes/no | Whether the author is verified. | `standard` | Not provided here |
| `author.followers` | integer | Author's follower count. | `standard` | Not provided here |
| `metrics` | object | Engagement counts. | `compact` | Yes |
| `metrics.likes` | integer | Likes. | `compact` | Yes |
| `metrics.comments` | integer | Comments. | `compact` | Yes |
| `metrics.shares` | integer | Shares. | `compact` | Yes |
| `metrics.favorites` | integer | Saves. | `compact` | Yes |
| `metrics.views` | integer | Views. | `compact` | Not provided here |
| `metrics.reposts` | integer | Reposts. | `compact` | The platform has none |
| `images` | list of link | Image addresses. | `standard` | Yes |
| `hashtags` | list of text | Hashtags, without the #. | `standard` | Yes |
| `mentions` | list of object | Accounts mentioned in the text. | `standard` | Not provided here |
| `mentions[].id` | text | Account ID. | `standard` | Not provided here |
| `mentions[].username` | text | Handle. | `standard` | Not provided here |
| `mentions[].name` | text | Display name. | `standard` | Not provided here |
| `is_pinned` | yes/no | Whether the author pinned it. | `standard` | Yes |
| `post_id` | text | ID of the thread's root post when this is a reply; otherwise null. | `compact` | The platform has none |
| `parent_id` | text | ID of the item it replies to directly; otherwise null. | `compact` | The platform has none |
| `root_id` | text | ID of the first-level reply its thread hangs under. | `compact` | The platform has none |
| `ext.duration` | number | Length of the video, in seconds; an image post has none. | `full` | Yes |
| `ext.cover_url` | link | Address of the cover image. | `full` | Yes |
| `ext.video_url` | link | Address the video plays from: a signed address of the platform's that expires, so use it soon; an image post has none. | `full` | Yes |
| `ext.categories` | list of text | What the platform files the post under, from the first level to the third, in its words (such as 美食 › 美食教程 › 饮品教程, food › food tutorials › drink tutorials); null where it filed it under none. | `full` | Yes |
| `approximate` | list of object | Which numbers of this item are approximate or lower bounds; absent when all are exact. | `compact` | Yes |
| `approximate[].field` | text | Path of the field, such as metrics.views. | `compact` | Yes |
| `approximate[].kind` | text | Approximate, or a lower bound. Values: `approximate`, `lower_bound`. | `compact` | Yes |

A field with no value on an item is `null`. A field this endpoint cannot give is left out and listed in `meta.unavailable`.

Typical size of one item: `compact` 593 B, `standard` 867 B, `full` 1.9 KB (measured on the response recorded 2026-10-29 11:25 UTC).

## Paging

20 items a page. The page size is the platform's; `limit` is not accepted.

For the next page pass `page.next_cursor` as `cursor`; a cursor is valid for 1 hour. `page.has_more` is false on the last page.

## When you are charged

| Case | Charged |
| --- | --- |
| A result with data | $0.0020, once per call |
| Each further page | charged as a call of its own |
| Invalid parameters, a failure or a timeout | not charged |
| The most one call can cost | $0.0020 (send `X-Max-Price` to refuse anything above your own limit) |

Prices as read 2026-11-28 06:28 UTC, under price book 30, in effect since 2026-11-28 04:43 UTC; the Playground reads the price in force before a run.

## If the object does not exist

An account that does not exist cannot be told from an account without videos: both return an empty result, not a 404.

## Errors

Every error has the same structure: `code`, `message`, `charged`, `retry`, `retry_after_seconds`, `param`, `docs_url`.

When this endpoint cannot serve (it fails or times out, or it is paused), its backup version can be called instead: the same parameters and fields, $0.0300 per call; the error names it in `alternative`. Call it with a new idempotency key: [Douyin user videos (backup) API](https://dataxapi.com/apis/douyin/backup/users/videos/list/)

| HTTP | Code | Meaning | Charged | Retry |
| --- | --- | --- | --- | --- |
| 400 | `invalid_params` | A parameter is invalid | No | After a fix |
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
curl -G "https://api.dataxapi.com/v1/douyin/users/videos/list" \
  --data-urlencode "id=MS4wLjABAAAAZ0aPDJzFhBrs0q3wVsp2a9WWrBuAUMsVyygoaO0bCw8" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
# pip install dataxapi
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.douyin.users.videos.list(id="MS4wLjABAAAAZ0aPDJzFhBrs0q3wVsp2a9WWrBuAUMsVyygoaO0bCw8")
print(result["data"]["items"])
```

### TypeScript

```typescript
// npm i @dataxapi/sdk
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.douyin.users.videos.list({ id: "MS4wLjABAAAAZ0aPDJzFhBrs0q3wVsp2a9WWrBuAUMsVyygoaO0bCw8" });
console.log(result.data.items);
```

### CLI

```bash
dataxapi call douyin.users.videos.list id=MS4wLjABAAAAZ0aPDJzFhBrs0q3wVsp2a9WWrBuAUMsVyygoaO0bCw8
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

Add this to your MCP client, then ask your agent to call `douyin.users.videos.list`.

## Responses

### 200

From a response recorded 2026-10-29 11:25 UTC. Names, text and IDs are examples, and so are the links: none is the recorded one (the page shows no one's personal data); the figures are as recorded. Long lists are cut. The request ID, cursor and balance are made up.

Size as sent: 17.6 KB in the standard view (12.2 KB compact, 38.5 KB full).

```jsonc
{
  "code": "ok",
  "request_id": "c2504d6c-2152-4538-a486-725d6f7948f6",
  "data": {
    "items": [
      {
        "id": "7302312618550095845",
        "url": "https://www.douyin.com/video/7302312618550095845",
        "type": "video",
        "title": "关于周末露营，我踩过的五个坑",
        "text": "把周末露营从头到尾讲清楚，看完少走弯路",
        "lang": "zh",
        "published_at": "2026-10-28T13:00:00.000Z",
        "author": {
          "id": "MS4wLjABAAAAISQZJVj44x7UmGOrbYT9MYgZqmQZXyVYh0J_KeP0bY6",
          "username": "orange_soda22",
          "name": "橘子汽水不加冰",
          "avatar_url": "https://p3-pc.douyinpic.com/aweme/100x100/aweme-avatar/tos-cn-avt-0015_edc4afa9b9ce65d8c81c.jpeg"
        },
        "metrics": {
          "likes": 9137,
          "comments": 822,
          "shares": 2501,
          "favorites": 1252
        },
        "images": null,
        "hashtags": [
          "户外生活",
          "好物分享",
          // … 3 more
        ],
        "is_pinned": false
      },
      // … 19 more
    ]
  },
  "page": {
    "next_cursor": "c1.WtpNZgnDx-u92cDS4sHsDBAjGm-hJOPNKEKmB3hJ",
    "cursor_expires_at": "2026-10-29T12:25:19.000Z",
    "has_more": true,
    "returned": 20
  },
  "warnings": [],
  "meta": {
    "capability": "douyin.users.videos.list",
    "result_status": "complete",
    "fetched_at": "2026-10-29T11:25:19.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "metrics.views": "capability",
      "metrics.reposts": "platform",
      "author.verified": "capability",
      "mentions": "capability",
      "post_id": "platform",
      "parent_id": "platform",
      "root_id": "platform",
      "author.followers": "capability"
    },
    "billing": {
      "amount": "0.002",
      "currency": "USD",
      "balance_after": "9.998"
    }
  }
}
```

### Empty

From a response recorded 2026-10-12 18:42 UTC. The request ID and balance are made up.

Size as sent: 616 B in the standard view (616 B compact, 616 B full).

```jsonc
{
  "code": "ok",
  "request_id": "ba07ae80-67b5-489f-80d5-0870bad63601",
  "data": { "items": [] },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 0
  },
  "warnings": [],
  "meta": {
    "capability": "douyin.users.videos.list",
    "result_status": "empty",
    "fetched_at": "2026-10-12T18:42:33.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "metrics.views": "capability",
      "metrics.reposts": "platform",
      "author.verified": "capability",
      "mentions": "capability",
      "post_id": "platform",
      "parent_id": "platform",
      "root_id": "platform",
      "author.followers": "capability"
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
  "request_id": "cb567cc4-cb3e-419e-a781-6b8781d13bfe",
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
  "request_id": "08e33b40-d45f-491a-9b5f-484e9a9ca850",
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

### 502

An example written to the specification, not a recorded response.

```json
{
  "code": "upstream_failed",
  "request_id": "ad73caa2-79c7-4006-a585-a716a49622e1",
  "message": "No result came back this time and nothing was charged; retry shortly",
  "message_zh": "这次没有取到结果，没有扣费，可以稍后重试",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

This recorded response is 584k tokens as the platform's own JSON, 6,740 as DataXAPI's JSON, and 4,597 as an AI reads it through DataXAPI's MCP server: 99% fewer (counted 2026-11-06).

[This example as a JSON file](https://dataxapi.com/apis/douyin/users/videos/list.example.json)

## Use it in your AI

`dataxapi setup` gives the agents on your machine (Claude Code, Codex, Cursor) the DataXAPI MCP server and the base skill. The key is read from DATAXAPI_API_KEY; none is written into a file.

MCP server: `https://api.dataxapi.com/mcp`. The entry for your client is under MCP in the request examples of this page; then ask your agent to call `douyin.users.videos.list`.

Or paste this to any AI:

> Read https://dataxapi.com/apis/douyin/users/videos/list.md and help me use the DataXAPI endpoint douyin.users.videos.list (Douyin user videos).

[Open in ChatGPT](https://chatgpt.com/?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fdouyin%2Fusers%2Fvideos%2Flist.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20douyin.users.videos.list%20%28Douyin%20user%20videos%29.) · [Open in Claude](https://claude.ai/new?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fdouyin%2Fusers%2Fvideos%2Flist.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20douyin.users.videos.list%20%28Douyin%20user%20videos%29.)

## Related

Part of DataXAPI's Social media data. The same key also works for: Creators, Ads, E-commerce.

The same thing on other platforms: [Bilibili user videos](https://dataxapi.com/apis/bilibili/users/videos/list/), [Kuaishou user videos](https://dataxapi.com/apis/kuaishou/users/videos/list/), [Telegram channel messages](https://dataxapi.com/apis/telegram/channels/messages/list/), [Facebook page posts](https://dataxapi.com/apis/facebook/pages/posts/list/), [LinkedIn company posts](https://dataxapi.com/apis/linkedin/companies/posts/list/), [Threads user posts](https://dataxapi.com/apis/threads/users/posts/list/), [Instagram user posts](https://dataxapi.com/apis/instagram/users/posts/list/), [TikTok user videos](https://dataxapi.com/apis/tiktok/users/videos/list/), [Weibo user posts](https://dataxapi.com/apis/weibo/users/posts/list/), [X user posts](https://dataxapi.com/apis/x/users/posts/list/), [Xiaohongshu user notes](https://dataxapi.com/apis/xiaohongshu/users/notes/list/), [YouTube channel videos](https://dataxapi.com/apis/youtube/channels/videos/list/), [WeChat Channels account videos](https://dataxapi.com/apis/wechat_channels/users/videos/list/), [WeChat Official Account articles](https://dataxapi.com/apis/wechat_mp/accounts/articles/list/), [WeChat Channels account videos (backup)](https://dataxapi.com/apis/wechat_channels/backup/users/videos/list/), [Reddit user posts](https://dataxapi.com/apis/reddit/users/posts/list/), [Zhihu user answers](https://dataxapi.com/apis/zhihu/users/answers/list/), [Zhihu user articles](https://dataxapi.com/apis/zhihu/users/articles/list/), [Zhihu user pins](https://dataxapi.com/apis/zhihu/users/pins/list/), [Bilibili user videos (backup)](https://dataxapi.com/apis/bilibili/backup/users/videos/list/), [Douyin user videos (backup)](https://dataxapi.com/apis/douyin/backup/users/videos/list/)

Douyin endpoints: [Douyin comment replies](https://dataxapi.com/apis/douyin/comments/replies/list/), [Douyin hashtag videos](https://dataxapi.com/apis/douyin/hashtags/videos/list/), [Douyin hot search board](https://dataxapi.com/apis/douyin/trends/list/), [Douyin user profile](https://dataxapi.com/apis/douyin/users/get/), [Douyin creator engagement and follower trends](https://dataxapi.com/apis/douyin/users/history/), [Douyin user search](https://dataxapi.com/apis/douyin/users/search/), [Douyin user videos](https://dataxapi.com/apis/douyin/users/videos/list/), [Douyin video comments](https://dataxapi.com/apis/douyin/videos/comments/list/), [Douyin video detail](https://dataxapi.com/apis/douyin/videos/get/), [Douyin video transcript (video to text)](https://dataxapi.com/apis/douyin/videos/transcript/get/), [Douyin video play count](https://dataxapi.com/apis/douyin/videos/metrics/), [Douyin related videos](https://dataxapi.com/apis/douyin/videos/related/), [Douyin video search](https://dataxapi.com/apis/douyin/videos/search/), [Douyin trending videos](https://dataxapi.com/apis/douyin/videos/trending/), [Douyin search suggestions](https://dataxapi.com/apis/douyin/keywords/related/), [Douyin video downloader, no watermark](https://dataxapi.com/apis/douyin/videos/media/get/), [Douyin music detail](https://dataxapi.com/apis/douyin/music/get/), [Douyin user videos (backup)](https://dataxapi.com/apis/douyin/backup/users/videos/list/), [Douyin video search (backup)](https://dataxapi.com/apis/douyin/backup/videos/search/)

Douyin trend-index endpoints: [Douyin trend-index brand trends](https://dataxapi.com/apis/douyin/index/brands/history/), [Douyin trend-index brand comparison](https://dataxapi.com/apis/douyin/index/brands/metrics/), [Douyin trend-index creator top videos](https://dataxapi.com/apis/douyin/index/creators/videos/list/), [Douyin trend-index creator follower profile](https://dataxapi.com/apis/douyin/index/creators/audience/get/), [Douyin trend-index creator core metrics](https://dataxapi.com/apis/douyin/index/creators/metrics/), [Douyin trend-index keyword audience](https://dataxapi.com/apis/douyin/index/keywords/audience/get/), [Douyin trend-index keyword trends](https://dataxapi.com/apis/douyin/index/keywords/history/), [Douyin trend-index related keywords](https://dataxapi.com/apis/douyin/index/keywords/related/), [Douyin trend-index live hot topics](https://dataxapi.com/apis/douyin/index/trends/list/), [Douyin trend-index keyword hot videos](https://dataxapi.com/apis/douyin/index/videos/search/)

Douyin Xingtu endpoints: [Douyin Xingtu creator rate card](https://dataxapi.com/apis/douyin/xingtu/creators/rates/get/), [Douyin Xingtu creator search](https://dataxapi.com/apis/douyin/xingtu/creators/search/), [Douyin Xingtu creator profile](https://dataxapi.com/apis/douyin/xingtu/creators/get/), [Douyin Xingtu creator audience](https://dataxapi.com/apis/douyin/xingtu/creators/audience/get/), [Douyin Xingtu creator metrics](https://dataxapi.com/apis/douyin/xingtu/creators/metrics/), [Douyin Xingtu creator video performance](https://dataxapi.com/apis/douyin/xingtu/creators/videos/list/), [Douyin Xingtu creator content keywords](https://dataxapi.com/apis/douyin/xingtu/creators/keywords/get/), [Douyin Xingtu creator index scores](https://dataxapi.com/apis/douyin/xingtu/creators/scores/get/), [Douyin Xingtu creator content mix](https://dataxapi.com/apis/douyin/xingtu/creators/content_mix/get/), [Douyin Xingtu creator conversion](https://dataxapi.com/apis/douyin/xingtu/creators/conversion/get/), [Douyin Xingtu marketing calendar](https://dataxapi.com/apis/douyin/xingtu/campaigns/list/), [Douyin Xingtu video report: plays and completion rate](https://dataxapi.com/apis/douyin/xingtu/videos/get/), [Douyin Xingtu creator audience (backup)](https://dataxapi.com/apis/douyin/xingtu/backup/creators/audience/get/)

How-to guides and answers: [How do I export Douyin data?](https://dataxapi.com/answers/export-douyin-data/), [What is sec_uid on Douyin, and how is it different from uid and the Douyin ID?](https://dataxapi.com/answers/douyin-sec-uid/), [How can my AI watch competitors each week without an annual plan? (2026)](https://dataxapi.com/answers/track-competitors-with-ai-pay-per-lookup/), [How do I add a Xiaohongshu or Douyin Skill to my AI? (2026)](https://dataxapi.com/answers/xiaohongshu-douyin-skill/), [How do I export all of a Douyin creator's video data? (2026)](https://dataxapi.com/answers/export-douyin-creator-videos/), [How do I export Douyin comments in bulk to find what users want? (2026)](https://dataxapi.com/answers/export-douyin-comments-user-needs/), [What are a_bogus and X-Bogus on Douyin? (2026)](https://dataxapi.com/answers/douyin-a-bogus-x-bogus/), [Which Douyin API should I use for search, accounts and comments? (2026)](https://dataxapi.com/answers/which-douyin-api-to-use/), [How do I use AI to audit and review an account? (2026)](https://dataxapi.com/answers/ai-account-audit-and-review/), [What are verifyFp and s_v_web_id on Douyin? (2026)](https://dataxapi.com/answers/douyin-verifyfp-s-v-web-id/), [Douyin API for developers: third-party Douyin data APIs and what they return (2026)](https://dataxapi.com/answers/douyin-third-party-data-apis/), [Douyin MCP server for Claude and Cursor (2026)](https://dataxapi.com/answers/douyin-mcp/), [Douyin, WeChat and Xiaohongshu data in Claude Code and Codex (2026)](https://dataxapi.com/answers/claude-code-codex-china-social-data/), [Douyin API for AI agents and LLMs: fewer tokens, called from Claude and Cursor (2026)](https://dataxapi.com/answers/douyin-api-for-ai-agents/), [Douyin video download URL: getting a video's play address by API (2026)](https://dataxapi.com/answers/douyin-video-play-url-api/), [How do I collect Douyin data? The creator center, the open platform, scrapers and data APIs (2026)](https://dataxapi.com/answers/how-to-collect-douyin-data/)

Skills that use this endpoint: [Competitor account monitoring](https://dataxapi.com/skills/competitors/), [Account check-up](https://dataxapi.com/skills/account-audit/), [A creator's videos to text](https://dataxapi.com/skills/creator-transcripts/)

Related: [All Douyin endpoints](https://dataxapi.com/apis/douyin/), [Social media data](https://dataxapi.com/categories/social/), [The same thing on 17 platforms, side by side](https://dataxapi.com/roles/accounts-posts-list/), [The post object's fields](https://dataxapi.com/docs/objects/post/)

## Questions

### How much does the Douyin user videos API cost?

$0.0020 per call. The most one call can cost is $0.0020.

### When am I not charged?

Errors and timeouts are not charged.

### How many items does one call return, and how do I get the next page?

20 items a page. The page size is the platform's; limit is not accepted. For the next page pass page.next_cursor as cursor; a cursor is valid for 1 hour. page.has_more is false on the last page.

### What happens if the object does not exist?

An account that does not exist cannot be told from an account without videos: both return an empty result, not a 404.

---

Last checked 2026-11-28 06:28 UTC. Catalog revision ceced48b38f71468. [HTML version](https://dataxapi.com/apis/douyin/users/videos/list/)
