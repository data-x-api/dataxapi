# RedNote (Xiaohongshu) video downloader API

Give a RedNote (Xiaohongshu) video note by ID, link or share text and get the address of every file of its video, without watermark: each quality in each codec (H.264, H.265 and the like) with its width, height, bit rate and size and backup addresses, the cover, and the subtitle files the platform made (SRT, by language). The addresses need no headers; once one stops working, another call gives new ones. Video notes only; an image note's pictures are xiaohongshu.notes.media.get's. One object a call; $0.0200 per call. Errors and timeouts are not charged.

- Endpoint: `GET https://api.dataxapi.com/v1/xiaohongshu/videos/media/get`
- ID: `xiaohongshu.videos.media.get`
- Also known as: rednote video downloader, xiaohongshu video downloader, rednote video no watermark, xiaohongshu mp4
- Price: $0.0200 / call
- Live status is not on this page, which is a snapshot. Read it with `GET https://api.dataxapi.com/v1/catalog/status`
- Returns: 1 object, one media files object
- Returns the standard media files object, the same on every platform
- `id` is in the link: `xiaohongshu.com/explore/<id>`. Or pass the whole link as `url`.
- [Run it in the Playground](https://dataxapi.com/console/playground/?capability=xiaohongshu.videos.media.get&params=%7B%22id%22%3A%226ac7701f000000001800508c%22%7D)
- In Chinese: [小红书无水印视频下载地址（各档清晰度和字幕）API](https://dataxapi.com/zh/apis/xiaohongshu/videos/media/get/)

## What you get

The first 2 rows of a response recorded 2026-11-06 16:42 UTC.

| kind | quality | width | height | codec | bitrate | size | format | duration | watermark |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| video | 720p | 720 | 1,280 | h264 | 2,336,329 | 24,901,764 | mp4 | 85.27 | false |
| video | 720p | 720 | 1,280 | h265 | 956,555 | 10,195,443 | mp4 | 85.27 | false |

## Parameters

| Parameter | Type | required | Description |
| --- | --- | --- | --- |
| `id` | text | give exactly one of `id`, `url` | Note ID, 24 hexadecimal characters. With only a link or a share text, give it as url. Example: `6ac7701f000000001800508c`. |
| `url` | text | give exactly one of `id`, `url` | Link to the note, pasted as it is: the https://www.xiaohongshu.com/explore/… address from the browser, the https://www.xiaohongshu.com/discovery/item/… link the website shares (query parameters such as xsec_token are fine), a whole share text with such a link in it, or the xhslink.com short link the app copies (alone or in its share text). A short link is opened once to see which note it leads to; where it cannot be, paste the note's full link or its ID. Example: `https://www.xiaohongshu.com/explore/6ac7701f000000001800508c?xsec_token=ABx1y2z3`. Full link: `https://www.xiaohongshu.com/explore/6ac7701f000000001800508c?xsec_token=ABx1y2z3`. Share text with a link inside: `周末咖啡探店合集 https://www.xiaohongshu.com/discovery/item/6ac7701f000000001800508c?xsec_token=ABx1y2z3 复制这段文字，打开小红书查看`. |
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
| `files[].index` | integer | Place of a picture in the post, from 1; null for other files. | `compact` | The platform has none |
| `files[].quality` | text | Quality, as the platform names it or by the short side in pixels, such as 720p or 1080p; null where there is none. | `compact` | Yes |
| `files[].width` | integer | Width, in pixels. | `compact` | Yes |
| `files[].height` | integer | Height, in pixels. | `compact` | Yes |
| `files[].codec` | text | Codec, such as h264, h265, h266, av1 or aac; ByteDance's own BVC2 (Douyin, TikTok) is bytevc2, which many players cannot play, so pick an h264 or h265 file for a common format; null where the platform does not say. Values: `h264`, `h265`, `h266`, `av1`, `aac`, `bytevc2`. | `compact` | Yes |
| `files[].bitrate` | integer | Bit rate, in bits a second. | `compact` | Yes |
| `files[].size` | integer | File size, in bytes. | `compact` | Yes |
| `files[].format` | text | File format: mp4, m4s (Bilibili's separate picture and sound streams), mp3, m4a, jpeg, png, webp, heic, gif, kvif (Kuaishou's image format) or srt; null where the address does not say. Values: `mp4`, `m4s`, `mp3`, `m4a`, `jpeg`, `png`, `webp`, `heic`, `gif`, `kvif`, `srt`. | `compact` | Yes |
| `files[].duration` | number | Length of an audio or video file, in seconds. | `compact` | Yes |
| `files[].title` | text | Name of the background music; null for other files. | `compact` | The platform has none |
| `files[].lang` | text | Language code of the subtitles, such as zh-CN or en-US. | `compact` | Yes |
| `files[].watermark` | yes/no | Whether the file carries the platform's watermark. | `compact` | Yes |
| `files[].url` | link | Address of the file. | `compact` | Yes |
| `files[].backup_urls` | list of link | Other addresses of the same file, for when the main one fails. | `standard` | Yes |
| `files[].expires_at` | time | When the address expires, as its signature says; null where the signature does not say. Once it has, call again for new addresses. | `compact` | Not provided here |
| `files[].headers` | object | Request headers the address has to be fetched with, keyed by the header's name in lower case; absent on platforms whose addresses need none. | `compact` | The platform has none |
| `files[].headers.referer` | text | The Referer to send. | `compact` | The platform has none |
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

Typical size of one item: `compact` 1.9 KB, `standard` 2.6 KB, `full` 2.6 KB (measured on the response recorded 2026-11-06 16:42 UTC).

## Paging

One object per call: there is nothing to page.

## When you are charged

| Case | Charged |
| --- | --- |
| A result with data | $0.0200, once per call |
| Invalid parameters, a failure or a timeout | not charged |
| The most one call can cost | $0.0200 (send `X-Max-Price` to refuse anything above your own limit) |

Prices as read 2026-11-28 06:28 UTC, under price book 30, in effect since 2026-11-28 04:43 UTC; the Playground reads the price in force before a run.

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
curl -G "https://api.dataxapi.com/v1/xiaohongshu/videos/media/get" \
  --data-urlencode "id=6ac7701f000000001800508c" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
# pip install dataxapi
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.xiaohongshu.videos.media.get(id="6ac7701f000000001800508c")
print(result["data"]["item"])
```

### TypeScript

```typescript
// npm i @dataxapi/sdk
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.xiaohongshu.videos.media.get({ id: "6ac7701f000000001800508c" });
console.log(result.data.item);
```

### CLI

```bash
dataxapi call xiaohongshu.videos.media.get id=6ac7701f000000001800508c
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

Add this to your MCP client, then ask your agent to call `xiaohongshu.videos.media.get`.

## Responses

### 200

From a response recorded 2026-11-06 16:42 UTC. Names, text and IDs are examples, and so are the links: none is the recorded one (the page shows no one's personal data); the figures are as recorded. Long lists are cut. The request ID, cursor and balance are made up.

Size as sent: 3.1 KB in the standard view (2.4 KB compact, 3.1 KB full).

```jsonc
{
  "code": "ok",
  "request_id": "3ec4992d-dda6-42cb-9ef4-dc7747932788",
  "data": {
    "item": {
      "post_id": "6611b329000000001a2828ff",
      "type": "video",
      "title": "关于周末露营，我踩过的五个坑",
      "author": { "id": "6d819c8a00000000b2088b38", "name": "小林的周末" },
      "duration": 85,
      "files": [
        {
          "kind": "video",
          "quality": "720p",
          "width": 720,
          "height": 1280,
          "codec": "h264",
          "bitrate": 2336329,
          "size": 24901764,
          "format": "mp4",
          "duration": 85.268,
          "lang": null,
          "watermark": false,
          "url": "https://www.xiaohongshu.com/explore/6b6461f800000000777633d7",
          "backup_urls": [
            "https://www.xiaohongshu.com/explore/6593898400000000e555c826",
            "https://www.xiaohongshu.com/explore/664aafcc00000000cc397d5b"
          ]
        },
        {
          "kind": "video",
          "quality": "720p",
          "width": 720,
          "height": 1280,
          "codec": "h265",
          "bitrate": 956555,
          "size": 10195443,
          "format": "mp4",
          "duration": 85.268,
          "lang": null,
          "watermark": false,
          "url": "https://www.xiaohongshu.com/explore/62954f2900000000862c7fec",
          "backup_urls": [
            "https://www.xiaohongshu.com/explore/6525f4d100000000ecd3a15a",
            "https://www.xiaohongshu.com/explore/6ba7148d00000000dd92957b"
          ]
        },
        // … 4 more
      ]
    }
  },
  "warnings": [],
  "meta": {
    "capability": "xiaohongshu.videos.media.get",
    "result_status": "complete",
    "fetched_at": "2026-11-06T16:42:10.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "files.index": "platform",
      "files.title": "platform",
      "files.expires_at": "capability",
      "files.headers": "platform",
      "files.stable_url": "platform",
      "files.live": "platform",
      "decrypt": "platform"
    },
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
  "request_id": "8f157387-14bb-4a59-9262-5c968ac0ce73",
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
  "request_id": "0cff72d3-1c92-423f-99bf-58c7ba4a5670",
  "message": "The balance is too low",
  "message_zh": "余额不足",
  "charged": false,
  "retry": "after_fix",
  "retry_after_seconds": null,
  "param": null,
  "required": "0.02",
  "available": "0",
  "top_up_url": "https://dataxapi.com/console/billing/?amount=10",
  "next_step": "The balance does not cover this call ($0.02). Top up at top_up_url: $10 at least, about 500 calls at this price; Alipay or a card, and the balance never expires. Then send the same request again, unchanged. Nothing was charged for this one.",
  "next_step_zh": "余额不够这次调用（$0.02）。到 top_up_url 充值：最低 $10，按这次的价格约够 500 次；支付宝、银行卡都能付，余额不过期。到账后把同一个请求原样再发一次。这次没有扣钱。",
  "docs_url": "https://dataxapi.com/docs/errors#insufficient_balance"
}
```

### 404

An example written to the specification, not a recorded response.

```json
{
  "code": "not_found",
  "request_id": "18163da5-e7ff-443a-abc9-20acefe0e895",
  "message": "The object does not exist, is private or was deleted",
  "message_zh": "对象不存在、私密或已删除",
  "charged": true,
  "amount": "0.02",
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
  "request_id": "ba1441b7-b9b4-42ae-9b18-4d0f7fb703bc",
  "message": "No result came back this time and nothing was charged; retry shortly",
  "message_zh": "这次没有取到结果，没有扣费，可以稍后重试",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

[This example as a JSON file](https://dataxapi.com/apis/xiaohongshu/videos/media/get.example.json)

## Use it in your AI

`dataxapi setup` gives the agents on your machine (Claude Code, Codex, Cursor) the DataXAPI MCP server and the base skill. The key is read from DATAXAPI_API_KEY; none is written into a file.

MCP server: `https://api.dataxapi.com/mcp`. The entry for your client is under MCP in the request examples of this page; then ask your agent to call `xiaohongshu.videos.media.get`.

Or paste this to any AI:

> Read https://dataxapi.com/apis/xiaohongshu/videos/media/get.md and help me use the DataXAPI endpoint xiaohongshu.videos.media.get (RedNote (Xiaohongshu) video downloader).

[Open in ChatGPT](https://chatgpt.com/?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fxiaohongshu%2Fvideos%2Fmedia%2Fget.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20xiaohongshu.videos.media.get%20%28RedNote%20%28Xiaohongshu%29%20video%20downloader%29.) · [Open in Claude](https://claude.ai/new?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fxiaohongshu%2Fvideos%2Fmedia%2Fget.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20xiaohongshu.videos.media.get%20%28RedNote%20%28Xiaohongshu%29%20video%20downloader%29.)

## Related

Part of DataXAPI's Social media data. The same key also works for: Creators, Ads, E-commerce.

The same thing on other platforms: [Douyin video downloader, no watermark](https://dataxapi.com/apis/douyin/videos/media/get/), [RedNote (Xiaohongshu) image downloader, originals and live photos](https://dataxapi.com/apis/xiaohongshu/notes/media/get/), [Kuaishou video downloader](https://dataxapi.com/apis/kuaishou/videos/media/get/), [Weibo video and image downloader](https://dataxapi.com/apis/weibo/posts/media/get/), [WeChat Channels video download](https://dataxapi.com/apis/wechat_channels/videos/media/get/), [TikTok video downloader, no watermark](https://dataxapi.com/apis/tiktok/videos/media/get/), [Instagram video and photo downloader](https://dataxapi.com/apis/instagram/posts/media/get/), [Bilibili video downloader](https://dataxapi.com/apis/bilibili/videos/media/get/)

Xiaohongshu (RedNote) endpoints: [Xiaohongshu image search](https://dataxapi.com/apis/xiaohongshu/images/search/), [Xiaohongshu note detail](https://dataxapi.com/apis/xiaohongshu/notes/get/), [Xiaohongshu comment replies](https://dataxapi.com/apis/xiaohongshu/comments/replies/list/), [Xiaohongshu note comments](https://dataxapi.com/apis/xiaohongshu/notes/comments/list/), [Xiaohongshu note search](https://dataxapi.com/apis/xiaohongshu/notes/search/), [Xiaohongshu topic notes](https://dataxapi.com/apis/xiaohongshu/topics/notes/list/), [Xiaohongshu topic detail](https://dataxapi.com/apis/xiaohongshu/topics/get/), [Xiaohongshu trends](https://dataxapi.com/apis/xiaohongshu/trends/list/), [Xiaohongshu user profile](https://dataxapi.com/apis/xiaohongshu/users/get/), [Xiaohongshu user notes](https://dataxapi.com/apis/xiaohongshu/users/notes/list/), [Xiaohongshu user search](https://dataxapi.com/apis/xiaohongshu/users/search/), [Xiaohongshu search suggestions](https://dataxapi.com/apis/xiaohongshu/keywords/related/), [Xiaohongshu video note with its video and subtitles](https://dataxapi.com/apis/xiaohongshu/videos/get/), [Xiaohongshu video transcript (video to text)](https://dataxapi.com/apis/xiaohongshu/videos/transcript/get/), [RedNote (Xiaohongshu) image downloader, originals and live photos](https://dataxapi.com/apis/xiaohongshu/notes/media/get/), [RedNote (Xiaohongshu) video downloader](https://dataxapi.com/apis/xiaohongshu/videos/media/get/)

Xiaohongshu PGY endpoints: [Xiaohongshu PGY keyword search index](https://dataxapi.com/apis/xiaohongshu/pgy/keywords/history/), [Xiaohongshu PGY related keywords](https://dataxapi.com/apis/xiaohongshu/pgy/keywords/related/), [Xiaohongshu PGY creator search](https://dataxapi.com/apis/xiaohongshu/pgy/creators/search/), [Xiaohongshu PGY creator detail](https://dataxapi.com/apis/xiaohongshu/pgy/creators/get/), [Xiaohongshu PGY creator audience profile](https://dataxapi.com/apis/xiaohongshu/pgy/creators/audience/get/), [Xiaohongshu PGY creator metrics](https://dataxapi.com/apis/xiaohongshu/pgy/creators/metrics/), [Xiaohongshu PGY creator notes](https://dataxapi.com/apis/xiaohongshu/pgy/creators/notes/list/), [Xiaohongshu PGY creator follower history](https://dataxapi.com/apis/xiaohongshu/pgy/creators/followers/history/), [Xiaohongshu PGY similar creators](https://dataxapi.com/apis/xiaohongshu/pgy/creators/related/), [Xiaohongshu PGY trending notes](https://dataxapi.com/apis/xiaohongshu/pgy/notes/trending/), [Xiaohongshu PGY creator costs and data summary](https://dataxapi.com/apis/xiaohongshu/pgy/creators/costs/metrics/), [Xiaohongshu PGY creator follower summary](https://dataxapi.com/apis/xiaohongshu/pgy/creators/followers/metrics/), [Xiaohongshu PGY creator core figures history](https://dataxapi.com/apis/xiaohongshu/pgy/creators/costs/history/), [Xiaohongshu PGY note metrics](https://dataxapi.com/apis/xiaohongshu/pgy/notes/get/)

Xiaohongshu Shop endpoints: [Xiaohongshu product detail](https://dataxapi.com/apis/xiaohongshu/shop/products/get/), [Xiaohongshu product reviews](https://dataxapi.com/apis/xiaohongshu/shop/products/reviews/list/), [Xiaohongshu product search](https://dataxapi.com/apis/xiaohongshu/shop/products/search/)

How-to guides and answers: [Xiaohongshu video API: the video file and its subtitles (2026)](https://dataxapi.com/answers/xiaohongshu-video-url-subtitles-api/), [Xiaohongshu video to text: the transcript from the platform's own subtitles (2026)](https://dataxapi.com/answers/xiaohongshu-video-to-text/), [Is there an API that gets a video's file address? Douyin, Xiaohongshu and WeChat Channels (2026)](https://dataxapi.com/answers/video-file-url-api-china/)

Related: [All Xiaohongshu (RedNote) endpoints](https://dataxapi.com/apis/xiaohongshu/), [Social media data](https://dataxapi.com/categories/social/), [The same thing on 8 platforms, side by side](https://dataxapi.com/roles/media-get/), [The media files object's fields](https://dataxapi.com/docs/objects/media/)

## Questions

### How much does the RedNote (Xiaohongshu) video downloader API cost?

$0.0200 per call. The most one call can cost is $0.0200.

### When am I not charged?

Errors and timeouts are not charged.

### What happens if the object does not exist?

The answer is 404 not_found. charged and amount in the body say what this one cost. reason says which: not_found (it does not exist) or private_or_deleted.

### How much for 100 posts?

By the call, whatever the length of the video or the number of files: $0.0200 a call, so 100 posts cost 100 times $0.0200. Asking again for new addresses is another call at the same price.

### The address gives 403 or has expired. What now?

Fetch the address as it is: no header or cookie is needed. Each file also has backup addresses on the platform's other hosts (backup_urls); once none opens, call again for new addresses.

### Which quality is the highest? Are there subtitles?

Every quality the platform encoded, in each codec (H.264, H.265 and the like), each with its width and height: the largest is the highest it has. The subtitles the platform made come as SRT files by language, where it made them. The files carry no watermark.

### How do I get the files of every post of an account?

List the account's posts with xiaohongshu.users.notes.list, a page at a time, then call xiaohongshu.videos.media.get once for each post's id. In an AI agent that is one sentence: "Download the videos of this RedNote account's last 20 notes with DataXAPI."

### How do I use it in ChatGPT or Claude?

Connect DataXAPI once (one prompt with your key, on the agents page), then ask in plain words, pasting the link as it is. The agent calls xiaohongshu.videos.media.get and each call is charged $0.0200.

---

Last checked 2026-11-28 06:28 UTC. Catalog revision ceced48b38f71468. [HTML version](https://dataxapi.com/apis/xiaohongshu/videos/media/get/)
