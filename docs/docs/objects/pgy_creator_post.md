# PGY creator note object

The PGY creator note object has 10 fields and is returned by 1 endpoint on Xiaohongshu (RedNote). A call costs $0.0400. It is a preview structure and may still change.

For machines: [pgy_creator_post schema](https://dataxapi.com/openapi.json#/components/schemas/pgy_creator_post), [openapi.json](https://dataxapi.com/openapi.json), [Object table (JSON)](https://api.dataxapi.com/v1/catalog/objects), [llms.txt](https://dataxapi.com/llms.txt)

A PGY creator note is one note of a Xiaohongshu creator as PGY (蒲公英) lists it on the creator's page, newest first: title, image or video, day published, reads, likes and saves. `is_sponsored` and `brand` say whether it was a sponsored note and for which brand.

It is a structure of its own, not a Post, and the list is asked for by PGY creator ID. `published_at` is a day only, given as the start of that day in China time.

## Fields

A field the platform cannot give is left out of the item and named in `meta.unavailable`. It is never filled with a guess or a zero.

| Field | Type | From view | Description |
| --- | --- | --- | --- |
| `id` | text | `compact` | Note ID |
| `title` | text | `compact` | The note's title |
| `type` | text | `compact` | An image note or a video note: `image`, `video` |
| `published_at` | time | `compact` | The day it was published; the platform gives the day only, given as the start of that day in China time |
| `cover_url` | link | `standard` | Address of the cover image |
| `is_sponsored` | yes/no | `compact` | Whether it is a sponsored note |
| `brand` | text | `compact` | The brand it was made for, in the platform's words; null when it is not sponsored |
| `metrics` | object | `compact` | The note's figures |
| `metrics.views` | integer | `compact` | Reads |
| `metrics.likes` | integer | `compact` | Likes |
| `metrics.favorites` | integer | `compact` | Saves |

## Endpoints that return PGY creator note

### Xiaohongshu (RedNote)

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [Xiaohongshu PGY creator notes](https://dataxapi.com/apis/xiaohongshu/pgy/creators/notes/list.md) | `GET /v1/xiaohongshu/pgy/creators/notes/list` | PGY creator note list | $0.0400 / call |

## Example

One item from `xiaohongshu.pgy.creators.notes.list`, as recorded 2026-10-12 21:53 UTC. Names, text, IDs and links are examples; the figures are as recorded.

```jsonc
{
  "id": "61ee962b00000000afb45a20",
  "title": "周末露营入门指南：一篇讲清楚",
  "type": "video",
  "published_at": "2026-10-09T16:00:00.000Z",
  "cover_url": "https://sns-webpic-qc.xhscdn.com/20261012/f8dcf3e698e1b1893a9f!nd_dft_wlteh_webp_3",
  "is_sponsored": false,
  "brand": null,
  "metrics": { "views": 75, "likes": 5, "favorites": 1 }
}
```

[The whole response is on the endpoint's page →](https://dataxapi.com/apis/xiaohongshu/pgy/creators/notes/list.md)

## Related

- [Creator posts API](https://dataxapi.com/roles/creators-posts-list/): The same action on 2 platforms, with a per-platform field table.
- [All endpoints](https://dataxapi.com/apis/): The directory lists what every endpoint returns, with its price.

## Other objects

[Post object](https://dataxapi.com/docs/objects/post/), [Comment object](https://dataxapi.com/docs/objects/comment/), [Account object](https://dataxapi.com/docs/objects/account/), [Trend object](https://dataxapi.com/docs/objects/trend/), [Transcript object](https://dataxapi.com/docs/objects/transcript/), [Creator rates object](https://dataxapi.com/docs/objects/creator_rates/), [Community object](https://dataxapi.com/docs/objects/community/), [Product object](https://dataxapi.com/docs/objects/product/), [Review object](https://dataxapi.com/docs/objects/review/), [Keyword index history object](https://dataxapi.com/docs/objects/keyword_history/), [Related keyword object](https://dataxapi.com/docs/objects/keyword_related/), [Keyword audience object](https://dataxapi.com/docs/objects/keyword_audience/), [Account recent change object](https://dataxapi.com/docs/objects/account_history/), [Brand index history object](https://dataxapi.com/docs/objects/brand_history/), [Brand index averages object](https://dataxapi.com/docs/objects/brand_metrics/), [Creator object](https://dataxapi.com/docs/objects/creator/), [Audience object](https://dataxapi.com/docs/objects/audience/), [Xingtu creator metrics object](https://dataxapi.com/docs/objects/xingtu_creator_metrics/), [Xingtu creator video object](https://dataxapi.com/docs/objects/xingtu_creator_post/), [PGY creator metrics object](https://dataxapi.com/docs/objects/pgy_creator_metrics/), [Ad object](https://dataxapi.com/docs/objects/ad/), [Advertiser object](https://dataxapi.com/docs/objects/advertiser/), [Douyin trend-index creator metrics object](https://dataxapi.com/docs/objects/index_creator_metrics/), [Xingtu creator content keywords object](https://dataxapi.com/docs/objects/xingtu_creator_keywords/), [Xingtu creator scores object](https://dataxapi.com/docs/objects/xingtu_creator_scores/), [Xingtu creator content mix object](https://dataxapi.com/docs/objects/xingtu_creator_content_mix/), [Xingtu creator conversion object](https://dataxapi.com/docs/objects/xingtu_creator_conversion/), [Xingtu campaign object](https://dataxapi.com/docs/objects/xingtu_campaign/), [Channels collection object](https://dataxapi.com/docs/objects/channels_collection/), [Topic object](https://dataxapi.com/docs/objects/topic/)

---

Last checked 2026-10-18 19:59 UTC. Catalog revision c48ce454ae6c4c65. [HTML version](https://dataxapi.com/docs/objects/pgy_creator_post/)
