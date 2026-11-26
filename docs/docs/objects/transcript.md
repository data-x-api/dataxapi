# Transcript object

13 endpoints on 13 platforms return the Transcript object with the same 23 fields, so code written for one platform reads the others unchanged. A call costs $0.0020 to $0.0390.

For machines: [transcript schema](https://dataxapi.com/openapi.json#/components/schemas/transcript), [openapi.json](https://dataxapi.com/openapi.json), [Object table (JSON)](https://api.dataxapi.com/v1/catalog/objects), [llms.txt](https://dataxapi.com/llms.txt)

A Transcript is what is said in a video, as text. TikTok, YouTube and Reddit also give it in timed `segments`, each with its `start` and `end` in seconds; the others give one text.

It has no ID of its own: `post_id` names the post it belongs to, the same ID the post endpoints take. A Meta Ad Library video belongs to an ad, and there `post_id` is the ad's library ID.

## Fields

A field the platform cannot give is left out of the item and named in `meta.unavailable`. It is never filled with a guess or a zero.

| Field | Type | From view | Description |
| --- | --- | --- | --- |
| `post_id` | text | `compact` | ID of the post it belongs to |
| `status` | text | `compact` | done: the text is here; processing: a long video is still being recognised and there is no text yet: call the same endpoint with job after retry_after_seconds seconds: `done`, `processing` |
| `job` | text | `compact` | A long video's job: call the same endpoint with it for the text, within 24 hours of submitting; only while processing |
| `retry_after_seconds` | integer | `compact` | About how many seconds to wait before asking again; only while processing |
| `lang` | text | `compact` | Language code |
| `text` | text | `compact` | The whole text |
| `segments` | list of object | `standard` | Timed segments |
| `segments[].start` | number | `standard` | Start, in seconds |
| `segments[].end` | number | `standard` | End, in seconds |
| `segments[].text` | text | `standard` | Text of the segment |
| `segments[].speaker` | text | `standard` | Who said the segment (1, 2…, one number a person); null where telling speakers apart was not asked for |
| `segments[].words` | list of object | `full` | The timing of each word (character) of the segment |
| `segments[].words[].start` | number | `full` | Start, in seconds |
| `segments[].words[].end` | number | `full` | End, in seconds |
| `segments[].words[].text` | text | `full` | The word (character) |
| `duration` | number | `standard` | Length of what was transcribed, in seconds; what an endpoint billed by the minute charges by |
| `post` | object | `standard` | The post the words are from: title, caption, author, length, time posted, likes and comments, as far as the platform gives them |
| `post.title` | text | `standard` | Title; none on a platform without titles |
| `post.text` | text | `standard` | Caption or description |
| `post.url` | link | `standard` | Link to the post |
| `post.published_at` | time | `standard` | Time posted |
| `post.duration` | number | `standard` | Length of the video as the platform gives it, in seconds |
| `post.author` | object | `standard` | Author |
| `post.author.id` | text | `standard` | Author's ID |
| `post.author.name` | text | `standard` | Author's name |
| `post.metrics` | object | `standard` | Engagement counts |
| `post.metrics.likes` | integer | `standard` | Likes |
| `post.metrics.comments` | integer | `standard` | Comments |

## Where each number comes from

The same field name does not always mean the same act on every platform. This table says which of the platform's own numbers goes into the field.

| Field | What it holds there | On |
| --- | --- | --- |
| `post_id` | Library ID of the ad it belongs to | Meta Ad Library |
| `lang` | The language of the captions file read | Reddit |

## What a platform cannot give

A platform stands against a field when none of its endpoints gives it.

| Field | Not available on |
| --- | --- |
| `status` | Meta Ad Library, Instagram, TikTok, YouTube, LinkedIn, Reddit, X (Twitter) |
| `job` | Meta Ad Library, Instagram, TikTok, YouTube, LinkedIn, Reddit, X (Twitter) |
| `retry_after_seconds` | Meta Ad Library, Instagram, TikTok, YouTube, LinkedIn, Reddit, X (Twitter) |
| `lang` | Bilibili, Douyin, Kuaishou, Meta Ad Library, Instagram, TikTok, Weibo, LinkedIn, X (Twitter), Xiaohongshu (RedNote), WeChat Channels |
| `segments[].start` | Meta Ad Library, Instagram, LinkedIn, X (Twitter) |
| `segments[].end` | Meta Ad Library, Instagram, LinkedIn, X (Twitter) |
| `segments[].text` | Meta Ad Library, Instagram, LinkedIn, X (Twitter) |
| `segments[].speaker` | Meta Ad Library, Instagram, TikTok, YouTube, LinkedIn, Reddit, X (Twitter) |
| `segments[].words[].start` | Meta Ad Library, Instagram, TikTok, YouTube, LinkedIn, Reddit, X (Twitter) |
| `segments[].words[].end` | Meta Ad Library, Instagram, TikTok, YouTube, LinkedIn, Reddit, X (Twitter) |
| `segments[].words[].text` | Meta Ad Library, Instagram, TikTok, YouTube, LinkedIn, Reddit, X (Twitter) |
| `duration` | Meta Ad Library, Instagram, TikTok, YouTube, LinkedIn, Reddit, X (Twitter) |
| `post.title` | Kuaishou, Meta Ad Library, Instagram, TikTok, Weibo, YouTube, LinkedIn, Reddit, X (Twitter), WeChat Channels |
| `post.text` | Meta Ad Library, Instagram, TikTok, YouTube, LinkedIn, Reddit, X (Twitter) |
| `post.url` | Meta Ad Library, Instagram, TikTok, YouTube, LinkedIn, Reddit, X (Twitter), WeChat Channels |
| `post.published_at` | Meta Ad Library, Instagram, TikTok, YouTube, LinkedIn, Reddit, X (Twitter) |
| `post.duration` | Meta Ad Library, Instagram, TikTok, YouTube, LinkedIn, Reddit, X (Twitter) |
| `post.author.id` | Meta Ad Library, Instagram, TikTok, YouTube, LinkedIn, Reddit, X (Twitter) |
| `post.author.name` | Meta Ad Library, Instagram, TikTok, YouTube, LinkedIn, Reddit, X (Twitter) |
| `post.metrics.likes` | Meta Ad Library, Instagram, TikTok, YouTube, LinkedIn, Reddit, X (Twitter) |
| `post.metrics.comments` | Meta Ad Library, Instagram, TikTok, YouTube, LinkedIn, Reddit, X (Twitter) |

One endpoint may still leave out a field another gives: each endpoint's page lists what it cannot give, and every answer says so in `meta.unavailable`.

## Endpoints that return Transcript

### Bilibili

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [Bilibili video transcript (video to text)](https://dataxapi.com/apis/bilibili/videos/transcript/get.md) | `GET /v1/bilibili/videos/transcript/get` | Transcript | $0.0040 / call |

### Douyin

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [Douyin video transcript (video to text)](https://dataxapi.com/apis/douyin/videos/transcript/get.md) | `GET /v1/douyin/videos/transcript/get` | Transcript | $0.0020 / call |

### Kuaishou

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [Kuaishou video transcript (video to text)](https://dataxapi.com/apis/kuaishou/videos/transcript/get.md) | `GET /v1/kuaishou/videos/transcript/get` | Transcript | $0.0020 / call |

### Meta Ad Library

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [Meta ad video transcript](https://dataxapi.com/apis/meta/ads/transcript/get.md) | `GET /v1/meta/ads/transcript/get` | Transcript | $0.0020 / call |

### Instagram

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [Instagram video transcript](https://dataxapi.com/apis/instagram/posts/transcript/get.md) | `GET /v1/instagram/posts/transcript/get` | Transcript | $0.0020 / call |

### TikTok

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [TikTok video transcript](https://dataxapi.com/apis/tiktok/videos/transcript/get.md) | `GET /v1/tiktok/videos/transcript/get` | Transcript | $0.0020 / call |

### Weibo

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [Weibo video transcript (video to text)](https://dataxapi.com/apis/weibo/posts/transcript/get.md) | `GET /v1/weibo/posts/transcript/get` | Transcript | $0.0020 / call |

### YouTube

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [YouTube video transcript](https://dataxapi.com/apis/youtube/videos/transcript/get.md) | `GET /v1/youtube/videos/transcript/get` | Transcript | $0.0020 / call |

### LinkedIn

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [LinkedIn video transcript](https://dataxapi.com/apis/linkedin/posts/transcript/get.md) | `GET /v1/linkedin/posts/transcript/get` | Transcript | $0.0020 / call |

### Reddit

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [Reddit video transcript](https://dataxapi.com/apis/reddit/posts/transcript/get.md) | `GET /v1/reddit/posts/transcript/get` | Transcript | $0.0020 / call |

### X (Twitter)

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [X video transcript](https://dataxapi.com/apis/x/posts/transcript/get.md) | `GET /v1/x/posts/transcript/get` | Transcript | $0.0020 / call |

### Xiaohongshu (RedNote)

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [Xiaohongshu video transcript (video to text)](https://dataxapi.com/apis/xiaohongshu/videos/transcript/get.md) | `GET /v1/xiaohongshu/videos/transcript/get` | Transcript | $0.0200 / call |

### WeChat Channels

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [WeChat Channels video transcript](https://dataxapi.com/apis/wechat_channels/videos/transcript/get.md) | `GET /v1/wechat_channels/videos/transcript/get` | Transcript | $0.0200 / call |

## Example

One item from `bilibili.videos.transcript.get`, as recorded 2026-11-21 10:04 UTC. Names, text, IDs and links are examples; the figures are as recorded.

```jsonc
{
  "post_id": "BV1ocQZhyYDM",
  "status": "done",
  "text": "大家好，今天带大家看一下我这次周末露营带的东西。先说结论：轻、能装进一个包、不怕摔。下面一件一件说。",
  "segments": [
    {
      "start": 0.59,
      "end": 3.35,
      "text": "大家好，今天带大家看一下我这次周末露营带的东西。",
      "speaker": null
    },
    {
      "start": 3.55,
      "end": 5.15,
      "text": "先说结论：轻、能装进一个包、不怕摔。",
      "speaker": null
    },
    // … 43 more
  ],
  "duration": 142.613,
  "post": {
    "title": "周末露营入门指南：一篇讲清楚",
    "text": "大家好，今天带大家看一下我这次周末露营带的东西。先说结论：轻、能装进一个包、不怕摔。下面一件一件说。",
    "url": "https://www.bilibili.com/video/216745778776",
    "published_at": "2026-09-16T03:30:00.000Z",
    "duration": 143,
    "author": { "id": "370998947", "name": "阿杰爱折腾" },
    "metrics": { "likes": 7530, "comments": 1073 }
  }
}
```

[The whole response is on the endpoint's page →](https://dataxapi.com/apis/bilibili/videos/transcript/get.md)

## Related

- [Video transcript API](https://dataxapi.com/roles/transcripts-get/): The same action on 13 platforms, with a per-platform field table.
- [All endpoints](https://dataxapi.com/apis/): The directory lists what every endpoint returns, with its price.

## Other objects

[Post object](https://dataxapi.com/docs/objects/post/), [Comment object](https://dataxapi.com/docs/objects/comment/), [Account object](https://dataxapi.com/docs/objects/account/), [Trend object](https://dataxapi.com/docs/objects/trend/), [Media files object](https://dataxapi.com/docs/objects/media/), [Music object](https://dataxapi.com/docs/objects/music/), [Creator rates object](https://dataxapi.com/docs/objects/creator_rates/), [Community object](https://dataxapi.com/docs/objects/community/), [Product object](https://dataxapi.com/docs/objects/product/), [Review object](https://dataxapi.com/docs/objects/review/), [Keyword index history object](https://dataxapi.com/docs/objects/keyword_history/), [Related keyword object](https://dataxapi.com/docs/objects/keyword_related/), [Keyword audience object](https://dataxapi.com/docs/objects/keyword_audience/), [Account recent change object](https://dataxapi.com/docs/objects/account_history/), [Brand index history object](https://dataxapi.com/docs/objects/brand_history/), [Brand index averages object](https://dataxapi.com/docs/objects/brand_metrics/), [Creator object](https://dataxapi.com/docs/objects/creator/), [Audience object](https://dataxapi.com/docs/objects/audience/), [Xingtu creator metrics object](https://dataxapi.com/docs/objects/xingtu_creator_metrics/), [Xingtu creator video object](https://dataxapi.com/docs/objects/xingtu_creator_post/), [PGY creator metrics object](https://dataxapi.com/docs/objects/pgy_creator_metrics/), [PGY creator note object](https://dataxapi.com/docs/objects/pgy_creator_post/), [PGY note detail object](https://dataxapi.com/docs/objects/pgy_note/), [Ad object](https://dataxapi.com/docs/objects/ad/), [Advertiser object](https://dataxapi.com/docs/objects/advertiser/), [Douyin trend-index creator metrics object](https://dataxapi.com/docs/objects/index_creator_metrics/), [Xingtu creator content keywords object](https://dataxapi.com/docs/objects/xingtu_creator_keywords/), [Xingtu creator scores object](https://dataxapi.com/docs/objects/xingtu_creator_scores/), [Xingtu creator content mix object](https://dataxapi.com/docs/objects/xingtu_creator_content_mix/), [Xingtu creator conversion object](https://dataxapi.com/docs/objects/xingtu_creator_conversion/), [Xingtu campaign object](https://dataxapi.com/docs/objects/xingtu_campaign/), [Channels collection object](https://dataxapi.com/docs/objects/channels_collection/), [Channels share link object](https://dataxapi.com/docs/objects/channels_share_link/), [Topic object](https://dataxapi.com/docs/objects/topic/), [Account owner object](https://dataxapi.com/docs/objects/account_owner/), [Mini program object](https://dataxapi.com/docs/objects/miniprogram/), [Follower history object](https://dataxapi.com/docs/objects/follower_history/), [PGY creator costs and summary object](https://dataxapi.com/docs/objects/pgy_creator_costs/), [PGY creator follower summary object](https://dataxapi.com/docs/objects/pgy_creator_followers/), [PGY creator core figures history object](https://dataxapi.com/docs/objects/pgy_creator_cost_history/)

---

Last checked 2026-11-26 12:17 UTC. Catalog revision 0051cce45e9530b9. [HTML version](https://dataxapi.com/docs/objects/transcript/)
