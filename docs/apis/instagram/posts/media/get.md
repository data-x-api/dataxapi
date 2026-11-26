# Instagram video and photo downloader API

Give an Instagram post or reel by shortcode or link and get the address of every file it has: the video and its still, or each picture and video of a carousel, numbered in order, with width, height and when each address expires; once they have, another call gives new ones. One object a call; $0.0020 per call. Errors, timeouts and objects that do not exist are not charged.

- Endpoint: `GET https://api.dataxapi.com/v1/instagram/posts/media/get`
- ID: `instagram.posts.media.get`
- Also known as: instagram video downloader, instagram reel downloader, instagram photo downloader, instagram carousel download, download instagram video
- Price: $0.0020 / call
- Live status is not on this page, which is a snapshot. Read it with `GET https://api.dataxapi.com/v1/catalog/status`
- Returns: 1 object, one media files object
- Returns the standard media files object, the same on every platform
- `id` is in the link: `instagram.com/p/<id>/`. Or pass the whole link as `url`.
- [Run it in the Playground](https://dataxapi.com/console/playground/?capability=instagram.posts.media.get&params=%7B%22id%22%3A%22DeCPVhERA8e%22%7D)
- In Chinese: [Instagram 视频和图片下载地址 API](https://dataxapi.com/zh/apis/instagram/posts/media/get/)

## What you get

The first 2 rows of a response recorded 2026-10-12 18:57 UTC.

| Field | Value |
| --- | --- |
| type | video |
| duration | 27.56 |

## Parameters

| Parameter | Type | required | Description |
| --- | --- | --- | --- |
| `id` | text | give exactly one of `id`, `url` | The post's shortcode: the part of its link after /p/ or /reel/. Example: `DeCPVhERA8e`. |
| `url` | text | give exactly one of `id`, `url` | Web link to the post or reel. Example: `https://www.instagram.com/p/DeCPVhERA8e/`. Full link: `https://www.instagram.com/p/DeCPVhERA8e/`. |
| `view` | text |  | How much of each item to return. All three cost the same. Values: `compact`, `standard` (default), `full`. |
| `fields` | list of text |  | Return only these fields. Each by its path, such as `author.name`. |

## Returned fields

`data.item` is one media files object. Stable: fields are only ever added.

Three views: `compact` (the most used fields, long text cut short), `standard` (the default: every standard field) and `full` (adds `ext`, the platform's own fields). A field is in the view named and in every larger one.

| Field | Type | Description | From view | This endpoint |
| --- | --- | --- | --- | --- |
| `post_id` | text | ID of the post the files belong to: the same as the detail endpoint's id. | `compact` | Yes |
| `type` | text | Content format: video, or image (a picture post or photo set). Values: `video`, `image`. | `compact` | Yes |
| `title` | text | Title; the caption where the platform has no separate title. | `compact` | Yes |
| `author` | object | Author. | `compact` | Yes |
| `author.id` | text | Author's account ID. | `compact` | Yes |
| `author.name` | text | Author's display name. | `compact` | Yes |
| `duration` | number | Length of the video, in seconds; a picture post has none. | `compact` | Yes |
| `files` | list of object | Every file, one entry each: the video in each quality, the audio, the cover, each picture, the subtitles. | `compact` | Yes |
| `files[].kind` | text | What the file is: video, audio (the background music, or a sound track served apart from the picture), cover, image (a picture of the post), subtitle. Values: `video`, `audio`, `cover`, `image`, `subtitle`. | `compact` | Yes |
| `files[].index` | integer | Place of a picture in the post, from 1; null for other files. | `compact` | Yes |
| `files[].quality` | text | Quality, as the platform names it or by the short side in pixels, such as 720p or 1080p; null where there is none. | `compact` | Not provided here |
| `files[].width` | integer | Width, in pixels. | `compact` | Yes |
| `files[].height` | integer | Height, in pixels. | `compact` | Yes |
| `files[].codec` | text | Codec, such as h264, h265, h266, av1 or aac; ByteDance's own BVC2 (Douyin, TikTok) is bytevc2, which many players cannot play, so pick an h264 or h265 file for a common format; null where the platform does not say. Values: `h264`, `h265`, `h266`, `av1`, `aac`, `bytevc2`. | `compact` | Not provided here |
| `files[].bitrate` | integer | Bit rate, in bits a second. | `compact` | Not provided here |
| `files[].size` | integer | File size, in bytes. | `compact` | Not provided here |
| `files[].format` | text | File format: mp4, m4s (Bilibili's separate picture and sound streams), mp3, m4a, jpeg, png, webp, heic, gif, kvif (Kuaishou's image format) or srt; null where the address does not say. Values: `mp4`, `m4s`, `mp3`, `m4a`, `jpeg`, `png`, `webp`, `heic`, `gif`, `kvif`, `srt`. | `compact` | Yes |
| `files[].duration` | number | Length of an audio or video file, in seconds. | `compact` | Yes |
| `files[].title` | text | Name of the background music; null for other files. | `compact` | The platform has none |
| `files[].lang` | text | Language code of the subtitles, such as zh-CN or en-US. | `compact` | The platform has none |
| `files[].watermark` | yes/no | Whether the file carries the platform's watermark. | `compact` | Not provided here |
| `files[].url` | link | Address of the file. | `compact` | Yes |
| `files[].backup_urls` | list of link | Other addresses of the same file, for when the main one fails. | `standard` | Not provided here |
| `files[].expires_at` | time | When the address expires, as its signature says; null where the signature does not say. Once it has, call again for new addresses. | `compact` | Yes |
| `files[].headers` | object | Request headers the address has to be fetched with, keyed by the header's name in lower case; absent on platforms whose addresses need none. | `compact` | Not provided here |
| `files[].headers.referer` | text | The Referer to send. | `compact` | Not provided here |
| `files[].stable_url` | link | The platform's play address, which redirects to the file's address of the moment and lasts longer than url; null where there is none. | `compact` | The platform has none |
| `files[].live` | object | The video of a live photo; null for a picture that is not one. | `compact` | The platform has none |
| `files[].live.url` | link | Address of the live photo's video. | `compact` | The platform has none |
| `files[].live.duration` | number | Length of the live photo's video, in seconds. | `compact` | The platform has none |
| `decrypt` | object | How to decrypt the files, where they are encrypted; null where they are not. | `compact` | The platform has none |
| `decrypt.method` | text | The method. isaac64_xor_head: seed ISAAC64 with key, take each 64-bit output as 8 big-endian bytes for a key stream as long as bytes says, and XOR it over the start of the file; the rest is left as it is. Values: `isaac64_xor_head`. | `compact` | The platform has none |
| `decrypt.key` | text | The key, good only for the addresses of the same answer. | `compact` | The platform has none |
| `decrypt.bytes` | integer | How many bytes at the start of the file are encrypted. | `compact` | The platform has none |
| `approximate` | list of object | Which numbers of this item are approximate or lower bounds; absent when all are exact. | `compact` | Yes |
| `approximate[].field` | text | Path of the field, such as metrics.views. | `compact` | Yes |
| `approximate[].kind` | text | Approximate, or a lower bound. Values: `approximate`, `lower_bound`. | `compact` | Yes |

A field with no value on an item is `null`. A field this endpoint cannot give is left out and listed in `meta.unavailable`.

Typical size of one item: `compact` 2.2 KB, `standard` 2.2 KB, `full` 2.2 KB (measured on the response recorded 2026-10-12 18:57 UTC).

## Paging

One object per call: there is nothing to page.

## When you are charged

| Case | Charged |
| --- | --- |
| A result with data | $0.0020, once per call |
| The object does not exist (404) | not charged |
| Invalid parameters, a failure or a timeout | not charged |
| The most one call can cost | $0.0020 (send `X-Max-Price` to refuse anything above your own limit) |

Prices as read 2026-11-26 12:17 UTC, under price book 22, in effect since 2026-11-25 13:46 UTC; the Playground reads the price in force before a run.

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
curl -G "https://api.dataxapi.com/v1/instagram/posts/media/get" \
  --data-urlencode "id=DeCPVhERA8e" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
# pip install dataxapi
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.instagram.posts.media.get(id="DeCPVhERA8e")
print(result["data"]["item"])
```

### TypeScript

```typescript
// npm i @dataxapi/sdk
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.instagram.posts.media.get({ id: "DeCPVhERA8e" });
console.log(result.data.item);
```

### CLI

```bash
dataxapi call instagram.posts.media.get id=DeCPVhERA8e
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

Add this to your MCP client, then ask your agent to call `instagram.posts.media.get`.

## Responses

### 200

From a response recorded 2026-10-12 18:57 UTC. Names, text and IDs are examples, and so are the links: none is the recorded one (the page shows no one's personal data); the figures are as recorded. Long lists are cut. The request ID, cursor and balance are made up.

Size as sent: 2.9 KB in the standard view (2.9 KB compact, 2.9 KB full).

```jsonc
{
  "code": "ok",
  "request_id": "34ba1b24-ab2d-4c3b-abc3-b9910e6189a4",
  "data": {
    "item": {
      "post_id": "DQyQdFkFFJn",
      "type": "video",
      "title": "Weekend hiking: a beginner's guide in 8 minutes",
      "author": { "id": "53202780662", "name": "Trail & Lens" },
      "duration": 27.56,
      "files": [
        {
          "kind": "video",
          "index": null,
          "width": null,
          "height": null,
          "format": "mp4",
          "duration": 27.56,
          "url": "https://www.instagram.com/p/DBtKGomgavY/",
          "expires_at": "2026-10-14T06:05:50.000Z"
        },
        {
          "kind": "cover",
          "index": null,
          "width": null,
          "height": null,
          "format": "jpeg",
          "duration": null,
          "url": "https://www.instagram.com/p/DN4CeLwOyrY/",
          "expires_at": "2026-10-17T05:27:31.000Z"
        }
      ]
    }
  },
  "warnings": [],
  "meta": {
    "capability": "instagram.posts.media.get",
    "result_status": "complete",
    "fetched_at": "2026-10-12T18:57:02.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "files.quality": "capability",
      "files.codec": "capability",
      "files.bitrate": "capability",
      "files.size": "capability",
      "files.title": "platform",
      "files.lang": "platform",
      "files.watermark": "capability",
      "files.backup_urls": "capability",
      "files.headers": "capability",
      "files.stable_url": "platform",
      "files.live": "platform",
      "decrypt": "platform"
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
  "request_id": "37db45d9-1d83-4529-a7e4-bfe41757b57c",
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
  "request_id": "c393ebff-8873-4cf5-a5d2-428ea38dd923",
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
  "request_id": "e2f9a88d-b8af-4f1a-84ef-6f811347b594",
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
  "request_id": "4782a041-82a5-4e3a-b9cb-d84df7a25c2e",
  "message": "No result came back this time and nothing was charged; retry shortly",
  "message_zh": "这次没有取到结果，没有扣费，可以稍后重试",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

[This example as a JSON file](https://dataxapi.com/apis/instagram/posts/media/get.example.json)

## Use it in your AI

`dataxapi setup` gives the agents on your machine (Claude Code, Codex, Cursor) the DataXAPI MCP server and the base skill. The key is read from DATAXAPI_API_KEY; none is written into a file.

MCP server: `https://api.dataxapi.com/mcp`. The entry for your client is under MCP in the request examples of this page; then ask your agent to call `instagram.posts.media.get`.

Or paste this to any AI:

> Read https://dataxapi.com/apis/instagram/posts/media/get.md and help me use the DataXAPI endpoint instagram.posts.media.get (Instagram video and photo downloader).

[Open in ChatGPT](https://chatgpt.com/?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Finstagram%2Fposts%2Fmedia%2Fget.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20instagram.posts.media.get%20%28Instagram%20video%20and%20photo%20downloader%29.) · [Open in Claude](https://claude.ai/new?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Finstagram%2Fposts%2Fmedia%2Fget.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20instagram.posts.media.get%20%28Instagram%20video%20and%20photo%20downloader%29.)

## Related

Part of DataXAPI's Social media data. The same key also works for: Creators, Ads, E-commerce.

The same thing on other platforms: [Douyin video downloader, no watermark](https://dataxapi.com/apis/douyin/videos/media/get/), [RedNote (Xiaohongshu) image downloader, originals and live photos](https://dataxapi.com/apis/xiaohongshu/notes/media/get/), [RedNote (Xiaohongshu) video downloader](https://dataxapi.com/apis/xiaohongshu/videos/media/get/), [Kuaishou video downloader](https://dataxapi.com/apis/kuaishou/videos/media/get/), [Weibo video and image downloader](https://dataxapi.com/apis/weibo/posts/media/get/), [WeChat Channels video download](https://dataxapi.com/apis/wechat_channels/videos/media/get/), [TikTok video downloader, no watermark](https://dataxapi.com/apis/tiktok/videos/media/get/), [Bilibili video downloader](https://dataxapi.com/apis/bilibili/videos/media/get/)

More Social media data on other platforms: [Douyin comment replies](https://dataxapi.com/apis/douyin/comments/replies/list/), [Douyin hashtag videos](https://dataxapi.com/apis/douyin/hashtags/videos/list/), [Bilibili comment replies](https://dataxapi.com/apis/bilibili/comments/replies/list/), [Bilibili hot searches](https://dataxapi.com/apis/bilibili/trends/list/), [Bilibili user profile](https://dataxapi.com/apis/bilibili/users/get/), [Bilibili user videos](https://dataxapi.com/apis/bilibili/users/videos/list/), [Bilibili video comments](https://dataxapi.com/apis/bilibili/videos/comments/list/), [Bilibili video detail](https://dataxapi.com/apis/bilibili/videos/get/), [Bilibili video transcript (video to text)](https://dataxapi.com/apis/bilibili/videos/transcript/get/), [Bilibili video search](https://dataxapi.com/apis/bilibili/videos/search/), [Bilibili popular videos](https://dataxapi.com/apis/bilibili/videos/trending/), [Douyin trend-index brand trends](https://dataxapi.com/apis/douyin/index/brands/history/), [Douyin trend-index brand comparison](https://dataxapi.com/apis/douyin/index/brands/metrics/), [Douyin trend-index creator top videos](https://dataxapi.com/apis/douyin/index/creators/videos/list/)

Instagram endpoints: [Instagram comment replies](https://dataxapi.com/apis/instagram/comments/replies/list/), [Instagram hashtag posts](https://dataxapi.com/apis/instagram/hashtags/posts/list/), [Instagram post comments](https://dataxapi.com/apis/instagram/posts/comments/list/), [Instagram post detail](https://dataxapi.com/apis/instagram/posts/get/), [Instagram video transcript](https://dataxapi.com/apis/instagram/posts/transcript/get/), [Instagram user profile](https://dataxapi.com/apis/instagram/users/get/), [Instagram user posts](https://dataxapi.com/apis/instagram/users/posts/list/), [Instagram user search](https://dataxapi.com/apis/instagram/users/search/), [Instagram video and photo downloader](https://dataxapi.com/apis/instagram/posts/media/get/)

Related: [All Instagram endpoints](https://dataxapi.com/apis/instagram/), [Social media data](https://dataxapi.com/categories/social/), [The same thing on 8 platforms, side by side](https://dataxapi.com/roles/media-get/), [The media files object's fields](https://dataxapi.com/docs/objects/media/)

## Questions

### How much does the Instagram video and photo downloader API cost?

$0.0020 per call. The most one call can cost is $0.0020.

### When am I not charged?

Errors, timeouts and objects that do not exist are not charged.

### What happens if the object does not exist?

The answer is 404 not_found and nothing is charged. reason says which: not_found (it does not exist) or private_or_deleted.

### How much for 100 posts?

By the call, whatever the length of the video or the number of files: $0.0020 a call, so 100 posts cost 100 times $0.0020. Asking again for new addresses is another call at the same price.

### The address gives 403 or has expired. What now?

Every address says when it expires (expires_at). Once it has, call again for new addresses, and download soon after the call.

### What does a carousel give?

Each picture and each video of it in order, numbered by index, with width and height; a video comes with its still as a cover.

### How do I get the files of every post of an account?

List the account's posts with instagram.users.posts.list, a page at a time, then call instagram.posts.media.get once for each post's id. In an AI agent that is one sentence: "Download every photo and video of @nasa's last 12 Instagram posts with DataXAPI."

### How do I use it in ChatGPT or Claude?

Connect DataXAPI once (one prompt with your key, on the agents page), then ask in plain words, pasting the link as it is. The agent calls instagram.posts.media.get and each call is charged $0.0020.

---

Last checked 2026-11-26 12:17 UTC. Catalog revision 0051cce45e9530b9. [HTML version](https://dataxapi.com/apis/instagram/posts/media/get/)
