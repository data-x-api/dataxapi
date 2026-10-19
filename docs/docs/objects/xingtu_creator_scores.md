# Xingtu creator scores object

The Xingtu creator scores object has 25 fields and is returned by 1 endpoint on Douyin. A call costs $0.0080. It is a preview structure and may still change.

For machines: [xingtu_creator_scores schema](https://dataxapi.com/openapi.json#/components/schemas/xingtu_creator_scores), [openapi.json](https://dataxapi.com/openapi.json), [Object table (JSON)](https://api.dataxapi.com/v1/catalog/objects), [llms.txt](https://dataxapi.com/llms.txt)

Xingtu creator scores are the six scores Xingtu (星图) gives a Douyin creator: overall, reach, seeding, conversion, cooperation and value for money. Each is 0 to 100, with the `average` of comparable creators, the `rank` and `rank_share`, how far from the top that rank is.

`creator_id` is the Xingtu creator ID. The scores are Xingtu's own numbers and compare creators on Xingtu only; Xingtu creator metrics and Xingtu creator conversion give the figures on reach and on selling.

## Fields

A field the platform cannot give is left out of the item and named in `meta.unavailable`. It is never filled with a guess or a zero.

| Field | Type | From view | Description |
| --- | --- | --- | --- |
| `creator_id` | text | `compact` | Xingtu creator ID |
| `overall` | object | `compact` | The overall Xingtu score |
| `overall.score` | number | `compact` | The score, 0 to 100 |
| `overall.average` | number | `compact` | Average of comparable creators on this score |
| `overall.rank` | integer | `compact` | Rank on this score, 1 being the highest |
| `overall.rank_share` | number | `compact` | How far from the top the rank is, 0 to 1: 0.05 is the top 5% |
| `reach` | object | `compact` | Reach score |
| `reach.score` | number | `compact` | The score, 0 to 100 |
| `reach.average` | number | `compact` | Average of comparable creators on this score |
| `reach.rank` | integer | `compact` | Rank on this score, 1 being the highest |
| `reach.rank_share` | number | `compact` | How far from the top the rank is, 0 to 1: 0.05 is the top 5% |
| `seeding` | object | `compact` | Seeding score: how well the creator's videos raise interest in products |
| `seeding.score` | number | `compact` | The score, 0 to 100 |
| `seeding.average` | number | `compact` | Average of comparable creators on this score |
| `seeding.rank` | integer | `compact` | Rank on this score, 1 being the highest |
| `seeding.rank_share` | number | `compact` | How far from the top the rank is, 0 to 1: 0.05 is the top 5% |
| `conversion` | object | `compact` | Conversion score |
| `conversion.score` | number | `compact` | The score, 0 to 100 |
| `conversion.average` | number | `compact` | Average of comparable creators on this score |
| `conversion.rank` | integer | `compact` | Rank on this score, 1 being the highest |
| `conversion.rank_share` | number | `compact` | How far from the top the rank is, 0 to 1: 0.05 is the top 5% |
| `cooperation` | object | `compact` | Cooperation score |
| `cooperation.score` | number | `compact` | The score, 0 to 100 |
| `cooperation.average` | number | `compact` | Average of comparable creators on this score |
| `cooperation.rank` | integer | `compact` | Rank on this score, 1 being the highest |
| `cooperation.rank_share` | number | `compact` | How far from the top the rank is, 0 to 1: 0.05 is the top 5% |
| `value_for_money` | object | `compact` | Value-for-money score |
| `value_for_money.score` | number | `compact` | The score, 0 to 100 |
| `value_for_money.average` | number | `compact` | Average of comparable creators on this score |
| `value_for_money.rank` | integer | `compact` | Rank on this score, 1 being the highest |
| `value_for_money.rank_share` | number | `compact` | How far from the top the rank is, 0 to 1: 0.05 is the top 5% |

## Endpoints that return Xingtu creator scores

### Douyin

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [Douyin Xingtu creator index scores](https://dataxapi.com/apis/douyin/xingtu/creators/scores/get.md) | `GET /v1/douyin/xingtu/creators/scores/get` | Xingtu creator scores | $0.0080 / call |

## Example

One item from `douyin.xingtu.creators.scores.get`, as recorded 2026-10-13 03:26 UTC. Names, text, IDs and links are examples; the figures are as recorded.

```jsonc
{
  "creator_id": "6119837728404143577",
  "overall": { "score": 90.9, "average": 56.2, "rank": 12, "rank_share": 0 },
  "reach": {
    "score": 98.77,
    "average": 53.08,
    "rank": 232,
    "rank_share": 0.0001
  },
  "seeding": {
    "score": 98.68,
    "average": 53.26,
    "rank": 280,
    "rank_share": 0.0001
  },
  "conversion": {
    "score": 98.92,
    "average": 55.24,
    "rank": 164,
    "rank_share": 0.0001
  },
  "cooperation": {
    "score": 89.49,
    "average": 75.55,
    "rank": 1038,
    "rank_share": 0.0005
  },
  "value_for_money": {
    "score": 68.64,
    "average": 64.09,
    "rank": 50209,
    "rank_share": 0.023
  }
}
```

[The whole response is on the endpoint's page →](https://dataxapi.com/apis/douyin/xingtu/creators/scores/get.md)

## Related

- [All endpoints](https://dataxapi.com/apis/): The directory lists what every endpoint returns, with its price.

## Other objects

[Post object](https://dataxapi.com/docs/objects/post/), [Comment object](https://dataxapi.com/docs/objects/comment/), [Account object](https://dataxapi.com/docs/objects/account/), [Trend object](https://dataxapi.com/docs/objects/trend/), [Transcript object](https://dataxapi.com/docs/objects/transcript/), [Creator rates object](https://dataxapi.com/docs/objects/creator_rates/), [Community object](https://dataxapi.com/docs/objects/community/), [Product object](https://dataxapi.com/docs/objects/product/), [Review object](https://dataxapi.com/docs/objects/review/), [Keyword index history object](https://dataxapi.com/docs/objects/keyword_history/), [Related keyword object](https://dataxapi.com/docs/objects/keyword_related/), [Keyword audience object](https://dataxapi.com/docs/objects/keyword_audience/), [Account recent change object](https://dataxapi.com/docs/objects/account_history/), [Brand index history object](https://dataxapi.com/docs/objects/brand_history/), [Brand index averages object](https://dataxapi.com/docs/objects/brand_metrics/), [Creator object](https://dataxapi.com/docs/objects/creator/), [Audience object](https://dataxapi.com/docs/objects/audience/), [Xingtu creator metrics object](https://dataxapi.com/docs/objects/xingtu_creator_metrics/), [Xingtu creator video object](https://dataxapi.com/docs/objects/xingtu_creator_post/), [PGY creator metrics object](https://dataxapi.com/docs/objects/pgy_creator_metrics/), [PGY creator note object](https://dataxapi.com/docs/objects/pgy_creator_post/), [Ad object](https://dataxapi.com/docs/objects/ad/), [Advertiser object](https://dataxapi.com/docs/objects/advertiser/), [Douyin trend-index creator metrics object](https://dataxapi.com/docs/objects/index_creator_metrics/), [Xingtu creator content keywords object](https://dataxapi.com/docs/objects/xingtu_creator_keywords/), [Xingtu creator content mix object](https://dataxapi.com/docs/objects/xingtu_creator_content_mix/), [Xingtu creator conversion object](https://dataxapi.com/docs/objects/xingtu_creator_conversion/), [Xingtu campaign object](https://dataxapi.com/docs/objects/xingtu_campaign/), [Channels collection object](https://dataxapi.com/docs/objects/channels_collection/), [Topic object](https://dataxapi.com/docs/objects/topic/)

---

Last checked 2026-10-18 19:59 UTC. Catalog revision c48ce454ae6c4c65. [HTML version](https://dataxapi.com/docs/objects/xingtu_creator_scores/)
