# Media files object

9 endpoints on 8 platforms return the Media files object with the same 29 fields, so code written for one platform reads the others unchanged. A call costs $0.0020 to $0.0200.

For machines: [media schema](https://dataxapi.com/openapi.json#/components/schemas/media), [openapi.json](https://dataxapi.com/openapi.json), [Object table (JSON)](https://api.dataxapi.com/v1/catalog/objects), [llms.txt](https://dataxapi.com/llms.txt)

## Fields

A field the platform cannot give is left out of the item and named in `meta.unavailable`. It is never filled with a guess or a zero.

| Field | Type | From view | Description |
| --- | --- | --- | --- |
| `post_id` | text | `compact` | ID of the post the files belong to: the same as the detail endpoint's id |
| `type` | text | `compact` | Content format: video, or image (a picture post or photo set): `video`, `image` |
| `title` | text | `compact` | Title; the caption where the platform has no separate title |
| `author` | object | `compact` | Author |
| `author.id` | text | `compact` | Author's account ID |
| `author.name` | text | `compact` | Author's display name |
| `duration` | number | `compact` | Length of the video, in seconds; a picture post has none |
| `files` | list of object | `compact` | Every file, one entry each: the video in each quality, the audio, the cover, each picture, the subtitles |
| `files[].kind` | text | `compact` | What the file is: video, audio (the background music, or a sound track served apart from the picture), cover, image (a picture of the post), subtitle: `video`, `audio`, `cover`, `image`, `subtitle` |
| `files[].index` | integer | `compact` | Place of a picture in the post, from 1; null for other files |
| `files[].quality` | text | `compact` | Quality, as the platform names it or by the short side in pixels, such as 720p or 1080p; null where there is none |
| `files[].width` | integer | `compact` | Width, in pixels |
| `files[].height` | integer | `compact` | Height, in pixels |
| `files[].codec` | text | `compact` | Codec, such as h264, h265, h266, av1 or aac; ByteDance's own BVC2 (Douyin, TikTok) is bytevc2, which many players cannot play, so pick an h264 or h265 file for a common format; null where the platform does not say: `h264`, `h265`, `h266`, `av1`, `aac`, `bytevc2` |
| `files[].bitrate` | integer | `compact` | Bit rate, in bits a second |
| `files[].size` | integer | `compact` | File size, in bytes |
| `files[].format` | text | `compact` | File format: mp4, m4s (Bilibili's separate picture and sound streams), mp3, m4a, jpeg, png, webp, heic, gif, kvif (Kuaishou's image format) or srt; null where the address does not say: `mp4`, `m4s`, `mp3`, `m4a`, `jpeg`, `png`, `webp`, `heic`, `gif`, `kvif`, `srt` |
| `files[].duration` | number | `compact` | Length of an audio or video file, in seconds |
| `files[].title` | text | `compact` | Name of the background music; null for other files |
| `files[].lang` | text | `compact` | Language code of the subtitles, such as zh-CN or en-US |
| `files[].watermark` | yes/no | `compact` | Whether the file carries the platform's watermark |
| `files[].url` | link | `compact` | Address of the file |
| `files[].backup_urls` | list of link | `standard` | Other addresses of the same file, for when the main one fails |
| `files[].expires_at` | time | `compact` | When the address expires, as its signature says; null where the signature does not say. Once it has, call again for new addresses |
| `files[].headers` | object | `compact` | Request headers the address has to be fetched with, keyed by the header's name in lower case; absent on platforms whose addresses need none |
| `files[].headers.referer` | text | `compact` | The Referer to send |
| `files[].stable_url` | link | `compact` | The platform's play address, which redirects to the file's address of the moment and lasts longer than url; null where there is none |
| `files[].live` | object | `compact` | The video of a live photo; null for a picture that is not one |
| `files[].live.url` | link | `compact` | Address of the live photo's video |
| `files[].live.duration` | number | `compact` | Length of the live photo's video, in seconds |
| `decrypt` | object | `compact` | How to decrypt the files, where they are encrypted; null where they are not |
| `decrypt.method` | text | `compact` | The method. isaac64_xor_head: seed ISAAC64 with key, take each 64-bit output as 8 big-endian bytes for a key stream as long as bytes says, and XOR it over the start of the file; the rest is left as it is: `isaac64_xor_head` |
| `decrypt.key` | text | `compact` | The key, good only for the addresses of the same answer |
| `decrypt.bytes` | integer | `compact` | How many bytes at the start of the file are encrypted |

## What a platform cannot give

A platform stands against a field when none of its endpoints gives it.

| Field | Not available on |
| --- | --- |
| `title` | Bilibili |
| `author.id` | Bilibili |
| `author.name` | Bilibili |
| `files[].index` | WeChat Channels, Bilibili |
| `files[].quality` | Instagram |
| `files[].codec` | Kuaishou, WeChat Channels, Instagram |
| `files[].bitrate` | WeChat Channels, Instagram |
| `files[].size` | Instagram, Bilibili |
| `files[].duration` | Bilibili |
| `files[].title` | Xiaohongshu (RedNote), Kuaishou, Weibo, WeChat Channels, Instagram, Bilibili |
| `files[].lang` | Douyin, Kuaishou, Weibo, WeChat Channels, TikTok, Instagram, Bilibili |
| `files[].watermark` | Kuaishou, WeChat Channels, Instagram, Bilibili |
| `files[].backup_urls` | Weibo, WeChat Channels, Instagram |
| `files[].expires_at` | Xiaohongshu (RedNote), Kuaishou, WeChat Channels |
| `files[].headers.referer` | Douyin, Xiaohongshu (RedNote), Kuaishou, Weibo, WeChat Channels, TikTok, Instagram |
| `files[].stable_url` | Xiaohongshu (RedNote), Kuaishou, Weibo, WeChat Channels, TikTok, Instagram, Bilibili |
| `files[].live.url` | Kuaishou, Weibo, WeChat Channels, TikTok, Instagram, Bilibili |
| `files[].live.duration` | Kuaishou, Weibo, WeChat Channels, TikTok, Instagram, Bilibili |
| `decrypt.method` | Douyin, Xiaohongshu (RedNote), Kuaishou, Weibo, TikTok, Instagram, Bilibili |
| `decrypt.key` | Douyin, Xiaohongshu (RedNote), Kuaishou, Weibo, TikTok, Instagram, Bilibili |
| `decrypt.bytes` | Douyin, Xiaohongshu (RedNote), Kuaishou, Weibo, TikTok, Instagram, Bilibili |

One endpoint may still leave out a field another gives: each endpoint's page lists what it cannot give, and every answer says so in `meta.unavailable`.

## Endpoints that return Media files

### Douyin

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [Douyin video downloader, no watermark](https://dataxapi.com/apis/douyin/videos/media/get.md) | `GET /v1/douyin/videos/media/get` | Media files | $0.0020 / call |

### Xiaohongshu (RedNote)

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [RedNote (Xiaohongshu) image downloader, originals and live photos](https://dataxapi.com/apis/xiaohongshu/notes/media/get.md) | `GET /v1/xiaohongshu/notes/media/get` | Media files | $0.0200 / call |
| [RedNote (Xiaohongshu) video downloader](https://dataxapi.com/apis/xiaohongshu/videos/media/get.md) | `GET /v1/xiaohongshu/videos/media/get` | Media files | $0.0200 / call |

### Kuaishou

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [Kuaishou video downloader](https://dataxapi.com/apis/kuaishou/videos/media/get.md) | `GET /v1/kuaishou/videos/media/get` | Media files | $0.0020 / call |

### Weibo

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [Weibo video and image downloader](https://dataxapi.com/apis/weibo/posts/media/get.md) | `GET /v1/weibo/posts/media/get` | Media files | $0.0020 / call |

### WeChat Channels

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [WeChat Channels video download](https://dataxapi.com/apis/wechat_channels/videos/media/get.md) | `GET /v1/wechat_channels/videos/media/get` | Media files | $0.0200 / call |

### TikTok

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [TikTok video downloader, no watermark](https://dataxapi.com/apis/tiktok/videos/media/get.md) | `GET /v1/tiktok/videos/media/get` | Media files | $0.0020 / call |

### Instagram

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [Instagram video and photo downloader](https://dataxapi.com/apis/instagram/posts/media/get.md) | `GET /v1/instagram/posts/media/get` | Media files | $0.0020 / call |

### Bilibili

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [Bilibili video downloader](https://dataxapi.com/apis/bilibili/videos/media/get.md) | `GET /v1/bilibili/videos/media/get` | Media files | $0.0020 / call |

## Example

One item from `douyin.videos.media.get`, as recorded 2026-10-12 18:41 UTC. Names, text, IDs and links are examples; the figures are as recorded.

```jsonc
{
  "post_id": "7833109286609086520",
  "type": "video",
  "title": "关于周末露营，我踩过的五个坑",
  "author": {
    "id": "MS4wLjABAAAAym-ezULCocGd6O4LOtyemCC70xSavR-Fz9TkEy9fr5y",
    "name": "一颗柠檬糖"
  },
  "duration": 17.62,
  "files": [
    {
      "kind": "video",
      "index": null,
      "quality": "720p",
      "width": 720,
      "height": 1280,
      "codec": "bytevc2",
      "bitrate": 660528,
      "size": 1454980,
      "format": "mp4",
      "duration": 17.62,
      "title": null,
      "watermark": false,
      "url": "https://www.douyin.com/video/7532013836158439430",
      "backup_urls": ["https://www.douyin.com/video/7103843412149753325"],
      "expires_at": "2026-10-12T23:42:12.000Z",
      "stable_url": "https://www.douyin.com/video/7379017266167968009",
      "live": null
    },
    {
      "kind": "video",
      "index": null,
      "quality": "720p",
      "width": 720,
      "height": 1280,
      "codec": "bytevc2",
      "bitrate": 560639,
      "size": 1234949,
      "format": "mp4",
      "duration": 17.62,
      "title": null,
      "watermark": false,
      "url": "https://www.douyin.com/video/7218692493584648804",
      "backup_urls": ["https://www.douyin.com/video/7806649436349130471"],
      "expires_at": "2026-10-12T23:42:12.000Z",
      "stable_url": "https://www.douyin.com/video/7069581524645027774",
      "live": null
    },
    // … 6 more
  ]
}
```

[The whole response is on the endpoint's page →](https://dataxapi.com/apis/douyin/videos/media/get.md)

## Related

- [Media files API](https://dataxapi.com/roles/media-get/): The same action on 8 platforms, with a per-platform field table.
- [All endpoints](https://dataxapi.com/apis/): The directory lists what every endpoint returns, with its price.

## Other objects

[Post object](https://dataxapi.com/docs/objects/post/), [Comment object](https://dataxapi.com/docs/objects/comment/), [Account object](https://dataxapi.com/docs/objects/account/), [Trend object](https://dataxapi.com/docs/objects/trend/), [Transcript object](https://dataxapi.com/docs/objects/transcript/), [Music object](https://dataxapi.com/docs/objects/music/), [Creator rates object](https://dataxapi.com/docs/objects/creator_rates/), [Community object](https://dataxapi.com/docs/objects/community/), [Product object](https://dataxapi.com/docs/objects/product/), [Review object](https://dataxapi.com/docs/objects/review/), [Keyword index history object](https://dataxapi.com/docs/objects/keyword_history/), [Related keyword object](https://dataxapi.com/docs/objects/keyword_related/), [Keyword audience object](https://dataxapi.com/docs/objects/keyword_audience/), [Account recent change object](https://dataxapi.com/docs/objects/account_history/), [Brand index history object](https://dataxapi.com/docs/objects/brand_history/), [Brand index averages object](https://dataxapi.com/docs/objects/brand_metrics/), [Creator object](https://dataxapi.com/docs/objects/creator/), [Audience object](https://dataxapi.com/docs/objects/audience/), [Xingtu creator metrics object](https://dataxapi.com/docs/objects/xingtu_creator_metrics/), [Xingtu creator video object](https://dataxapi.com/docs/objects/xingtu_creator_post/), [PGY creator metrics object](https://dataxapi.com/docs/objects/pgy_creator_metrics/), [PGY creator note object](https://dataxapi.com/docs/objects/pgy_creator_post/), [PGY note detail object](https://dataxapi.com/docs/objects/pgy_note/), [Ad object](https://dataxapi.com/docs/objects/ad/), [Advertiser object](https://dataxapi.com/docs/objects/advertiser/), [Douyin trend-index creator metrics object](https://dataxapi.com/docs/objects/index_creator_metrics/), [Xingtu creator content keywords object](https://dataxapi.com/docs/objects/xingtu_creator_keywords/), [Xingtu creator scores object](https://dataxapi.com/docs/objects/xingtu_creator_scores/), [Xingtu creator content mix object](https://dataxapi.com/docs/objects/xingtu_creator_content_mix/), [Xingtu creator conversion object](https://dataxapi.com/docs/objects/xingtu_creator_conversion/), [Xingtu campaign object](https://dataxapi.com/docs/objects/xingtu_campaign/), [Channels collection object](https://dataxapi.com/docs/objects/channels_collection/), [Channels share link object](https://dataxapi.com/docs/objects/channels_share_link/), [Topic object](https://dataxapi.com/docs/objects/topic/), [Account owner object](https://dataxapi.com/docs/objects/account_owner/), [Mini program object](https://dataxapi.com/docs/objects/miniprogram/), [Follower history object](https://dataxapi.com/docs/objects/follower_history/), [PGY creator costs and summary object](https://dataxapi.com/docs/objects/pgy_creator_costs/), [PGY creator follower summary object](https://dataxapi.com/docs/objects/pgy_creator_followers/), [PGY creator core figures history object](https://dataxapi.com/docs/objects/pgy_creator_cost_history/)

---

Last checked 2026-11-26 12:17 UTC. Catalog revision 0051cce45e9530b9. [HTML version](https://dataxapi.com/docs/objects/media/)
