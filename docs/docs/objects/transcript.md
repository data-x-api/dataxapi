# Transcript object

7 endpoints on 7 platforms return the Transcript object with the same 6 fields, so code written for one platform reads the others unchanged. A call costs $0.0020.

For machines: [transcript schema](https://dataxapi.com/openapi.json#/components/schemas/transcript), [openapi.json](https://dataxapi.com/openapi.json), [Object table (JSON)](https://api.dataxapi.com/v1/catalog/objects), [llms.txt](https://dataxapi.com/llms.txt)

A Transcript is what is said in a video, as text. TikTok, YouTube and Reddit also give it in timed `segments`, each with its `start` and `end` in seconds; the others give one text.

It has no ID of its own: `post_id` names the post it belongs to, the same ID the post endpoints take. A Meta Ad Library video belongs to an ad, and there `post_id` is the ad's library ID.

## Fields

A field the platform cannot give is left out of the item and named in `meta.unavailable`. It is never filled with a guess or a zero.

| Field | Type | From view | Description |
| --- | --- | --- | --- |
| `post_id` | text | `compact` | ID of the post it belongs to |
| `lang` | text | `compact` | Language code |
| `text` | text | `compact` | The whole text |
| `segments` | list of object | `standard` | Timed segments |
| `segments[].start` | number | `standard` | Start, in seconds |
| `segments[].end` | number | `standard` | End, in seconds |
| `segments[].text` | text | `standard` | Text of the segment |

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
| `lang` | Meta Ad Library, Instagram, TikTok, LinkedIn, X (Twitter) |
| `segments[].start` | Meta Ad Library, Instagram, LinkedIn, X (Twitter) |
| `segments[].end` | Meta Ad Library, Instagram, LinkedIn, X (Twitter) |
| `segments[].text` | Meta Ad Library, Instagram, LinkedIn, X (Twitter) |

One endpoint may still leave out a field another gives: each endpoint's page lists what it cannot give, and every answer says so in `meta.unavailable`.

## Endpoints that return Transcript

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

## Example

One item from `meta.ads.transcript.get`, as recorded 2026-10-12 21:49 UTC. Names, text, IDs and links are examples; the figures are as recorded.

```jsonc
{
  "post_id": "1060625109666930",
  "text": "Hey everyone, today I am going through what I packed for weekend hiking. Short version: light, fits in one bag, hard to break. Let's go piece by piece."
}
```

[The whole response is on the endpoint's page →](https://dataxapi.com/apis/meta/ads/transcript/get.md)

## Related

- [Video transcript API](https://dataxapi.com/roles/transcripts-get/): The same action on 7 platforms, with a per-platform field table.
- [All endpoints](https://dataxapi.com/apis/): The directory lists what every endpoint returns, with its price.

## Other objects

[Post object](https://dataxapi.com/docs/objects/post/), [Comment object](https://dataxapi.com/docs/objects/comment/), [Account object](https://dataxapi.com/docs/objects/account/), [Trend object](https://dataxapi.com/docs/objects/trend/), [Creator rates object](https://dataxapi.com/docs/objects/creator_rates/), [Community object](https://dataxapi.com/docs/objects/community/), [Product object](https://dataxapi.com/docs/objects/product/), [Review object](https://dataxapi.com/docs/objects/review/), [Keyword index history object](https://dataxapi.com/docs/objects/keyword_history/), [Related keyword object](https://dataxapi.com/docs/objects/keyword_related/), [Keyword audience object](https://dataxapi.com/docs/objects/keyword_audience/), [Account recent change object](https://dataxapi.com/docs/objects/account_history/), [Brand index history object](https://dataxapi.com/docs/objects/brand_history/), [Brand index averages object](https://dataxapi.com/docs/objects/brand_metrics/), [Creator object](https://dataxapi.com/docs/objects/creator/), [Audience object](https://dataxapi.com/docs/objects/audience/), [Xingtu creator metrics object](https://dataxapi.com/docs/objects/xingtu_creator_metrics/), [Xingtu creator video object](https://dataxapi.com/docs/objects/xingtu_creator_post/), [PGY creator metrics object](https://dataxapi.com/docs/objects/pgy_creator_metrics/), [PGY creator note object](https://dataxapi.com/docs/objects/pgy_creator_post/), [Ad object](https://dataxapi.com/docs/objects/ad/), [Advertiser object](https://dataxapi.com/docs/objects/advertiser/), [Douyin trend-index creator metrics object](https://dataxapi.com/docs/objects/index_creator_metrics/), [Xingtu creator content keywords object](https://dataxapi.com/docs/objects/xingtu_creator_keywords/), [Xingtu creator scores object](https://dataxapi.com/docs/objects/xingtu_creator_scores/), [Xingtu creator content mix object](https://dataxapi.com/docs/objects/xingtu_creator_content_mix/), [Xingtu creator conversion object](https://dataxapi.com/docs/objects/xingtu_creator_conversion/), [Xingtu campaign object](https://dataxapi.com/docs/objects/xingtu_campaign/), [Channels collection object](https://dataxapi.com/docs/objects/channels_collection/), [Topic object](https://dataxapi.com/docs/objects/topic/)

---

Last checked 2026-10-18 19:59 UTC. Catalog revision c48ce454ae6c4c65. [HTML version](https://dataxapi.com/docs/objects/transcript/)
