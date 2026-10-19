# Xingtu creator metrics object

The Xingtu creator metrics object has 15 fields and is returned by 1 endpoint on Douyin. A call costs $0.0040. It is a preview structure and may still change.

For machines: [xingtu_creator_metrics schema](https://dataxapi.com/openapi.json#/components/schemas/xingtu_creator_metrics), [openapi.json](https://dataxapi.com/openapi.json), [Object table (JSON)](https://api.dataxapi.com/v1/catalog/objects), [llms.txt](https://dataxapi.com/llms.txt)

Xingtu creator metrics is how a Douyin creator's videos did over the last 30 or 90 days, as Xingtu (星图) sums it up: median views, average likes, comments and shares, engagement and completion rates. It also gives what a thousand views (`cpm_21_60s`, `cpm_over_60s`) and one interaction are expected to cost, in `currency`.

`creator_id` is the Xingtu creator ID from the creator search. Read it beside Creator rates for what the creator charges and Xingtu creator scores for how Xingtu ranks them.

## Fields

A field the platform cannot give is left out of the item and named in `meta.unavailable`. It is never filled with a guess or a zero.

| Field | Type | From view | Description |
| --- | --- | --- | --- |
| `creator_id` | text | `compact` | Xingtu creator ID |
| `videos` | integer | `compact` | Videos in the period |
| `median_views` | integer | `compact` | Median views of a video |
| `average_likes` | integer | `compact` | Average likes of a video |
| `average_comments` | integer | `compact` | Average comments of a video |
| `average_shares` | integer | `compact` | Average shares of a video |
| `engagement_rate` | number | `compact` | Engagement rate, 0 to 1 |
| `engagement_rate_percentile` | number | `standard` | Share of comparable creators whose engagement rate it exceeds, 0 to 1 |
| `completion_rate` | number | `compact` | Completion rate, 0 to 1 |
| `completion_rate_percentile` | number | `standard` | Share of comparable creators whose completion rate it exceeds, 0 to 1 |
| `currency` | text | `compact` | Currency of the amounts below |
| `cpm_21_60s` | amount | `compact` | Expected cost per thousand views of a 21 to 60 second video |
| `cpm_over_60s` | amount | `compact` | Expected cost per thousand views of a video over 60 seconds |
| `cpe_21_60s` | amount | `compact` | Expected cost per interaction of a 21 to 60 second video |
| `cpe_over_60s` | amount | `compact` | Expected cost per interaction of a video over 60 seconds |

## Endpoints that return Xingtu creator metrics

### Douyin

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [Douyin Xingtu creator metrics](https://dataxapi.com/apis/douyin/xingtu/creators/metrics.md) | `GET /v1/douyin/xingtu/creators/metrics` | Xingtu creator metrics | $0.0040 / call |

## Example

One item from `douyin.xingtu.creators.metrics`, as recorded 2026-10-12 21:49 UTC. Names, text, IDs and links are examples; the figures are as recorded.

```jsonc
{
  "creator_id": "6660491594420292860",
  "videos": 763,
  "median_views": 237059,
  "average_likes": 11712,
  "average_comments": 993,
  "average_shares": 938,
  "engagement_rate": 0.0148,
  "engagement_rate_percentile": 0.512,
  "completion_rate": 0.2377,
  "completion_rate_percentile": 0.7391,
  "currency": "CNY",
  "cpm_21_60s": "537.29",
  "cpm_over_60s": "2238.73",
  "cpe_21_60s": "36.92",
  "cpe_over_60s": "153.84"
}
```

[The whole response is on the endpoint's page →](https://dataxapi.com/apis/douyin/xingtu/creators/metrics.md)

## Related

- [Creator metrics API](https://dataxapi.com/roles/creators-metrics/): The same action on 2 platforms, with a per-platform field table.
- [All endpoints](https://dataxapi.com/apis/): The directory lists what every endpoint returns, with its price.

## Other objects

[Post object](https://dataxapi.com/docs/objects/post/), [Comment object](https://dataxapi.com/docs/objects/comment/), [Account object](https://dataxapi.com/docs/objects/account/), [Trend object](https://dataxapi.com/docs/objects/trend/), [Transcript object](https://dataxapi.com/docs/objects/transcript/), [Creator rates object](https://dataxapi.com/docs/objects/creator_rates/), [Community object](https://dataxapi.com/docs/objects/community/), [Product object](https://dataxapi.com/docs/objects/product/), [Review object](https://dataxapi.com/docs/objects/review/), [Keyword index history object](https://dataxapi.com/docs/objects/keyword_history/), [Related keyword object](https://dataxapi.com/docs/objects/keyword_related/), [Keyword audience object](https://dataxapi.com/docs/objects/keyword_audience/), [Account recent change object](https://dataxapi.com/docs/objects/account_history/), [Brand index history object](https://dataxapi.com/docs/objects/brand_history/), [Brand index averages object](https://dataxapi.com/docs/objects/brand_metrics/), [Creator object](https://dataxapi.com/docs/objects/creator/), [Audience object](https://dataxapi.com/docs/objects/audience/), [Xingtu creator video object](https://dataxapi.com/docs/objects/xingtu_creator_post/), [PGY creator metrics object](https://dataxapi.com/docs/objects/pgy_creator_metrics/), [PGY creator note object](https://dataxapi.com/docs/objects/pgy_creator_post/), [Ad object](https://dataxapi.com/docs/objects/ad/), [Advertiser object](https://dataxapi.com/docs/objects/advertiser/), [Douyin trend-index creator metrics object](https://dataxapi.com/docs/objects/index_creator_metrics/), [Xingtu creator content keywords object](https://dataxapi.com/docs/objects/xingtu_creator_keywords/), [Xingtu creator scores object](https://dataxapi.com/docs/objects/xingtu_creator_scores/), [Xingtu creator content mix object](https://dataxapi.com/docs/objects/xingtu_creator_content_mix/), [Xingtu creator conversion object](https://dataxapi.com/docs/objects/xingtu_creator_conversion/), [Xingtu campaign object](https://dataxapi.com/docs/objects/xingtu_campaign/), [Channels collection object](https://dataxapi.com/docs/objects/channels_collection/), [Topic object](https://dataxapi.com/docs/objects/topic/)

---

Last checked 2026-10-18 19:59 UTC. Catalog revision c48ce454ae6c4c65. [HTML version](https://dataxapi.com/docs/objects/xingtu_creator_metrics/)
