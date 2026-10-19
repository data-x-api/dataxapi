# PGY creator metrics object

The PGY creator metrics object has 17 fields and is returned by 1 endpoint on Xiaohongshu (RedNote). A call costs $0.0400. It is a preview structure and may still change.

For machines: [pgy_creator_metrics schema](https://dataxapi.com/openapi.json#/components/schemas/pgy_creator_metrics), [openapi.json](https://dataxapi.com/openapi.json), [Object table (JSON)](https://api.dataxapi.com/v1/catalog/objects), [llms.txt](https://dataxapi.com/llms.txt)

PGY creator metrics is how a Xiaohongshu creator's everyday notes did over the last 30 or 90 days, as PGY (蒲公英) sums it up: median impressions, reads and interactions, the engagement rate, and the share of notes past 100 and 1,000 likes. The `_percentile` fields say what share of comparable creators it exceeds.

`creator_id` is the PGY creator ID from the creator search. The notes one by one are PGY creator notes, and who follows the creator is their Audience.

## Fields

A field the platform cannot give is left out of the item and named in `meta.unavailable`. It is never filled with a guess or a zero.

| Field | Type | From view | Description |
| --- | --- | --- | --- |
| `creator_id` | text | `compact` | PGY creator ID |
| `notes` | integer | `compact` | Notes in the period |
| `median_impressions` | integer | `compact` | Median impressions of a note |
| `median_reads` | integer | `compact` | Median reads of a note |
| `median_engagements` | integer | `compact` | Median interactions of a note |
| `median_likes` | integer | `standard` | Median likes of a note |
| `median_favorites` | integer | `standard` | Median saves of a note |
| `median_comments` | integer | `standard` | Median comments of a note |
| `median_shares` | integer | `standard` | Median shares of a note |
| `engagement_rate` | number | `compact` | Engagement rate, 0 to 1 |
| `video_completion_rate` | number | `standard` | Completion rate of video notes, 0 to 1 |
| `image_3s_read_rate` | number | `standard` | Share of image-note reads that last 3 seconds, 0 to 1 |
| `hundred_like_share` | number | `standard` | Share of notes with 100 likes or more, 0 to 1 |
| `thousand_like_share` | number | `standard` | Share of notes with 1,000 likes or more, 0 to 1 |
| `impressions_percentile` | number | `standard` | Share of comparable creators whose median impressions it exceeds, 0 to 1 |
| `reads_percentile` | number | `standard` | Share of comparable creators whose median reads it exceeds, 0 to 1 |
| `engagements_percentile` | number | `standard` | Share of comparable creators whose median interactions it exceeds, 0 to 1 |

## Endpoints that return PGY creator metrics

### Xiaohongshu (RedNote)

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [Xiaohongshu PGY creator metrics](https://dataxapi.com/apis/xiaohongshu/pgy/creators/metrics.md) | `GET /v1/xiaohongshu/pgy/creators/metrics` | PGY creator metrics | $0.0400 / call |

## Example

One item from `xiaohongshu.pgy.creators.metrics`, as recorded 2026-10-12 21:53 UTC. Names, text, IDs and links are examples; the figures are as recorded.

```jsonc
{
  "creator_id": "622bd7c00000000007bc9f1a",
  "notes": 34,
  "median_impressions": 3535,
  "median_reads": 533,
  "median_engagements": 12,
  "median_likes": 10,
  "median_favorites": 2,
  "median_comments": 0,
  "median_shares": 3,
  "engagement_rate": 0.032,
  "video_completion_rate": 0.321,
  "image_3s_read_rate": 0.798,
  "hundred_like_share": 0.088,
  "thousand_like_share": 0,
  "impressions_percentile": 0.523,
  "reads_percentile": 0.476,
  "engagements_percentile": 0.333
}
```

[The whole response is on the endpoint's page →](https://dataxapi.com/apis/xiaohongshu/pgy/creators/metrics.md)

## Related

- [Creator metrics API](https://dataxapi.com/roles/creators-metrics/): The same action on 2 platforms, with a per-platform field table.
- [All endpoints](https://dataxapi.com/apis/): The directory lists what every endpoint returns, with its price.

## Other objects

[Post object](https://dataxapi.com/docs/objects/post/), [Comment object](https://dataxapi.com/docs/objects/comment/), [Account object](https://dataxapi.com/docs/objects/account/), [Trend object](https://dataxapi.com/docs/objects/trend/), [Transcript object](https://dataxapi.com/docs/objects/transcript/), [Creator rates object](https://dataxapi.com/docs/objects/creator_rates/), [Community object](https://dataxapi.com/docs/objects/community/), [Product object](https://dataxapi.com/docs/objects/product/), [Review object](https://dataxapi.com/docs/objects/review/), [Keyword index history object](https://dataxapi.com/docs/objects/keyword_history/), [Related keyword object](https://dataxapi.com/docs/objects/keyword_related/), [Keyword audience object](https://dataxapi.com/docs/objects/keyword_audience/), [Account recent change object](https://dataxapi.com/docs/objects/account_history/), [Brand index history object](https://dataxapi.com/docs/objects/brand_history/), [Brand index averages object](https://dataxapi.com/docs/objects/brand_metrics/), [Creator object](https://dataxapi.com/docs/objects/creator/), [Audience object](https://dataxapi.com/docs/objects/audience/), [Xingtu creator metrics object](https://dataxapi.com/docs/objects/xingtu_creator_metrics/), [Xingtu creator video object](https://dataxapi.com/docs/objects/xingtu_creator_post/), [PGY creator note object](https://dataxapi.com/docs/objects/pgy_creator_post/), [Ad object](https://dataxapi.com/docs/objects/ad/), [Advertiser object](https://dataxapi.com/docs/objects/advertiser/), [Douyin trend-index creator metrics object](https://dataxapi.com/docs/objects/index_creator_metrics/), [Xingtu creator content keywords object](https://dataxapi.com/docs/objects/xingtu_creator_keywords/), [Xingtu creator scores object](https://dataxapi.com/docs/objects/xingtu_creator_scores/), [Xingtu creator content mix object](https://dataxapi.com/docs/objects/xingtu_creator_content_mix/), [Xingtu creator conversion object](https://dataxapi.com/docs/objects/xingtu_creator_conversion/), [Xingtu campaign object](https://dataxapi.com/docs/objects/xingtu_campaign/), [Channels collection object](https://dataxapi.com/docs/objects/channels_collection/), [Topic object](https://dataxapi.com/docs/objects/topic/)

---

Last checked 2026-10-18 19:59 UTC. Catalog revision c48ce454ae6c4c65. [HTML version](https://dataxapi.com/docs/objects/pgy_creator_metrics/)
