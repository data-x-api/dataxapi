# PGY creator core figures history object

The PGY creator core figures history object has 21 fields and is returned by 1 endpoint on Xiaohongshu (RedNote). A call costs $0.0400. It is a preview structure and may still change.

For machines: [pgy_creator_cost_history schema](https://dataxapi.com/openapi.json#/components/schemas/pgy_creator_cost_history), [openapi.json](https://dataxapi.com/openapi.json), [Object table (JSON)](https://api.dataxapi.com/v1/catalog/objects), [llms.txt](https://dataxapi.com/llms.txt)

## Fields

A field the platform cannot give is left out of the item and named in `meta.unavailable`. It is never filled with a guess or a zero.

| Field | Type | From view | Description |
| --- | --- | --- | --- |
| `creator_id` | text | `compact` | PGY creator ID |
| `days` | integer | `compact` | How many of the most recent days the figures cover |
| `currency` | text | `compact` | Currency of the costs |
| `date` | time | `compact` | The day the period's figures run to: a calendar day in China time (UTC+8), written as midnight UTC of its date |
| `cpm` | amount | `compact` | CPM: the cost of a thousand impressions, in yuan; null where there is none |
| `cpe` | amount | `compact` | CPE: the cost of one interaction, in yuan; null where there is none |
| `cpv` | amount | `compact` | CPV: the cost of one read, in yuan, as PGY's trend chart works it out; null where there is none |
| `shop_visit_cost` | amount | `compact` | Cost per shop visitor a note brings (PGY's spillover store visits), in yuan; null where there is none |
| `median_impressions` | integer | `compact` | Median impressions of a note |
| `median_reads` | integer | `compact` | Median reads of a note |
| `median_engagements` | integer | `compact` | Median interactions of a note |
| `median_shop_visits` | integer | `compact` | Median shop visitors a note brings (PGY's spillover store visits); a note that brought none counts as 0 |
| `points` | list of object | `compact` | The figures day by day, one entry a day, oldest first: each the figures PGY worked out that day |
| `points[].date` | time | `compact` | The day: a calendar day in China time (UTC+8), written as midnight UTC of its date |
| `points[].cpm` | amount | `compact` | CPM: the cost of a thousand impressions, in yuan; null where there is none |
| `points[].cpe` | amount | `compact` | CPE: the cost of one interaction, in yuan; null where there is none |
| `points[].cpv` | amount | `compact` | CPV: the cost of one read, in yuan, as PGY's trend chart works it out; null where there is none |
| `points[].shop_visit_cost` | amount | `compact` | Cost per shop visitor a note brings (PGY's spillover store visits), in yuan; null where there is none |
| `points[].median_impressions` | integer | `compact` | Median impressions of a note |
| `points[].median_reads` | integer | `compact` | Median reads of a note |
| `points[].median_engagements` | integer | `compact` | Median interactions of a note |
| `points[].median_shop_visits` | integer | `compact` | Median shop visitors a note brings (PGY's spillover store visits); a note that brought none counts as 0 |

## Endpoints that return PGY creator core figures history

### Xiaohongshu (RedNote)

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [Xiaohongshu PGY creator core figures history](https://dataxapi.com/apis/xiaohongshu/pgy/creators/costs/history.md) | `GET /v1/xiaohongshu/pgy/creators/costs/history` | PGY creator core figures history | $0.0400 / call |

## Example

One item from `xiaohongshu.pgy.creators.costs.history`, as recorded 2026-11-10 09:54 UTC. Names, text, IDs and links are examples; the figures are as recorded.

```jsonc
{
  "creator_id": "6db7d6c4000000008ff2aa80",
  "days": 30,
  "currency": "CNY",
  "date": "2026-11-09T00:00:00Z",
  "cpm": "6.2482",
  "cpe": "0.8591",
  "cpv": "0.0153",
  "shop_visit_cost": null,
  "median_impressions": 4801380,
  "median_reads": 4570345,
  "median_engagements": 34920,
  "median_shop_visits": 0,
  "points": [
    {
      "date": "2026-10-11T00:00:00Z",
      "cpm": "4.4683",
      "cpe": "0.8324",
      "cpv": "0.0108",
      "shop_visit_cost": null,
      "median_impressions": 6713899,
      "median_reads": 6511479,
      "median_engagements": 36041,
      "median_shop_visits": 0
    },
    {
      "date": "2026-10-12T00:00:00Z",
      "cpm": "4.1886",
      "cpe": "0.5148",
      "cpv": "0.0104",
      "shop_visit_cost": null,
      "median_impressions": 7162338,
      "median_reads": 6749230,
      "median_engagements": 58279,
      "median_shop_visits": 0
    },
    // … 28 more
  ]
}
```

[The whole response is on the endpoint's page →](https://dataxapi.com/apis/xiaohongshu/pgy/creators/costs/history.md)

## Related

- [All endpoints](https://dataxapi.com/apis/): The directory lists what every endpoint returns, with its price.

## Other objects

[Post object](https://dataxapi.com/docs/objects/post/), [Comment object](https://dataxapi.com/docs/objects/comment/), [Account object](https://dataxapi.com/docs/objects/account/), [Trend object](https://dataxapi.com/docs/objects/trend/), [Transcript object](https://dataxapi.com/docs/objects/transcript/), [Creator rates object](https://dataxapi.com/docs/objects/creator_rates/), [Community object](https://dataxapi.com/docs/objects/community/), [Product object](https://dataxapi.com/docs/objects/product/), [Review object](https://dataxapi.com/docs/objects/review/), [Keyword index history object](https://dataxapi.com/docs/objects/keyword_history/), [Related keyword object](https://dataxapi.com/docs/objects/keyword_related/), [Keyword audience object](https://dataxapi.com/docs/objects/keyword_audience/), [Account recent change object](https://dataxapi.com/docs/objects/account_history/), [Brand index history object](https://dataxapi.com/docs/objects/brand_history/), [Brand index averages object](https://dataxapi.com/docs/objects/brand_metrics/), [Creator object](https://dataxapi.com/docs/objects/creator/), [Audience object](https://dataxapi.com/docs/objects/audience/), [Xingtu creator metrics object](https://dataxapi.com/docs/objects/xingtu_creator_metrics/), [Xingtu creator video object](https://dataxapi.com/docs/objects/xingtu_creator_post/), [PGY creator metrics object](https://dataxapi.com/docs/objects/pgy_creator_metrics/), [PGY creator note object](https://dataxapi.com/docs/objects/pgy_creator_post/), [PGY note detail object](https://dataxapi.com/docs/objects/pgy_note/), [Ad object](https://dataxapi.com/docs/objects/ad/), [Advertiser object](https://dataxapi.com/docs/objects/advertiser/), [Douyin trend-index creator metrics object](https://dataxapi.com/docs/objects/index_creator_metrics/), [Xingtu creator content keywords object](https://dataxapi.com/docs/objects/xingtu_creator_keywords/), [Xingtu creator scores object](https://dataxapi.com/docs/objects/xingtu_creator_scores/), [Xingtu creator content mix object](https://dataxapi.com/docs/objects/xingtu_creator_content_mix/), [Xingtu creator conversion object](https://dataxapi.com/docs/objects/xingtu_creator_conversion/), [Xingtu campaign object](https://dataxapi.com/docs/objects/xingtu_campaign/), [Channels collection object](https://dataxapi.com/docs/objects/channels_collection/), [Channels share link object](https://dataxapi.com/docs/objects/channels_share_link/), [Topic object](https://dataxapi.com/docs/objects/topic/), [Account owner object](https://dataxapi.com/docs/objects/account_owner/), [Mini program object](https://dataxapi.com/docs/objects/miniprogram/), [Follower history object](https://dataxapi.com/docs/objects/follower_history/), [PGY creator costs and summary object](https://dataxapi.com/docs/objects/pgy_creator_costs/), [PGY creator follower summary object](https://dataxapi.com/docs/objects/pgy_creator_followers/)

---

Last checked 2026-11-20 07:17 UTC. Catalog revision 720fc3ea8dadb865. [HTML version](https://dataxapi.com/docs/objects/pgy_creator_cost_history/)
