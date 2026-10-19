# Douyin trend-index creator metrics object

The Douyin trend-index creator metrics object has 17 fields and is returned by 1 endpoint on Douyin. A call costs $0.0020. It is a preview structure and may still change.

For machines: [index_creator_metrics schema](https://dataxapi.com/openapi.json#/components/schemas/index_creator_metrics), [openapi.json](https://dataxapi.com/openapi.json), [Object table (JSON)](https://api.dataxapi.com/v1/catalog/objects), [llms.txt](https://dataxapi.com/llms.txt)

Douyin trend-index creator metrics is how much a Douyin account gained a day, on average, over the last week and the last month, as Douyin's trend-index (巨量算数) sums it up: new likes, followers, shares and comments. `change_7d` and `change_30d` set each against the period before, as a ratio.

`creator_id` is the account's numeric Douyin ID (uid): not a Xingtu creator ID and not the token the profile endpoint takes. The same uid reads the account's Audience and its top videos from the trend-index.

## Fields

A field the platform cannot give is left out of the item and named in `meta.unavailable`. It is never filled with a guess or a zero.

| Field | Type | From view | Description |
| --- | --- | --- | --- |
| `creator_id` | text | `compact` | The account's numeric ID (Douyin's uid): the one the request gave |
| `average_7d` | object | `compact` | Daily averages over the last week |
| `average_7d.likes` | number | `compact` | New likes a day, on average over the last week |
| `average_7d.followers` | number | `compact` | New followers a day, on average over the last week |
| `average_7d.shares` | number | `compact` | New shares a day, on average over the last week |
| `average_7d.comments` | number | `compact` | New comments a day, on average over the last week |
| `average_30d` | object | `compact` | Daily averages over the last month |
| `average_30d.likes` | number | `compact` | New likes a day, on average over the last month |
| `average_30d.followers` | number | `compact` | New followers a day, on average over the last month |
| `average_30d.shares` | number | `compact` | New shares a day, on average over the last month |
| `average_30d.comments` | number | `compact` | New comments a day, on average over the last month |
| `change_7d` | object | `compact` | The last week's daily averages against the week before, as a ratio: 0.3 is 30% more, -0.5 is half as much |
| `change_7d.likes` | number | `compact` | Change in new likes a day |
| `change_7d.followers` | number | `compact` | Change in new followers a day |
| `change_7d.shares` | number | `compact` | Change in new shares a day |
| `change_7d.comments` | number | `compact` | Change in new comments a day |
| `change_30d` | object | `compact` | The last month's daily averages against the month before, written the same way |
| `change_30d.likes` | number | `compact` | Change in new likes a day |
| `change_30d.followers` | number | `compact` | Change in new followers a day |
| `change_30d.shares` | number | `compact` | Change in new shares a day |
| `change_30d.comments` | number | `compact` | Change in new comments a day |

## Endpoints that return Douyin trend-index creator metrics

### Douyin

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [Douyin trend-index creator core metrics](https://dataxapi.com/apis/douyin/index/creators/metrics.md) | `GET /v1/douyin/index/creators/metrics` | Douyin trend-index creator metrics | $0.0020 / call |

## Example

One item from `douyin.index.creators.metrics`, as recorded 2026-10-13 03:24 UTC. Names, text, IDs and links are examples; the figures are as recorded.

```jsonc
{
  "creator_id": "62430445852",
  "average_7d": {
    "likes": 157100.7142857143,
    "followers": 3588,
    "shares": 14715.42857142857,
    "comments": 3879.8571428571427
  },
  "average_30d": {
    "likes": 300077.7,
    "followers": 6233.6,
    "shares": 17969.833333333332,
    "comments": 7351.466666666666
  },
  "change_7d": {
    "likes": -0.20028666505711482,
    "followers": -0.1607298001737619,
    "shares": 0.8577740905729795,
    "comments": -0.28813692598028945
  },
  "change_30d": {
    "likes": -0.12000717497205526,
    "followers": -0.1316211058123174,
    "shares": -0.1697698557902584,
    "comments": -0.23841359186421957
  }
}
```

[The whole response is on the endpoint's page →](https://dataxapi.com/apis/douyin/index/creators/metrics.md)

## Related

- [All endpoints](https://dataxapi.com/apis/): The directory lists what every endpoint returns, with its price.

## Other objects

[Post object](https://dataxapi.com/docs/objects/post/), [Comment object](https://dataxapi.com/docs/objects/comment/), [Account object](https://dataxapi.com/docs/objects/account/), [Trend object](https://dataxapi.com/docs/objects/trend/), [Transcript object](https://dataxapi.com/docs/objects/transcript/), [Creator rates object](https://dataxapi.com/docs/objects/creator_rates/), [Community object](https://dataxapi.com/docs/objects/community/), [Product object](https://dataxapi.com/docs/objects/product/), [Review object](https://dataxapi.com/docs/objects/review/), [Keyword index history object](https://dataxapi.com/docs/objects/keyword_history/), [Related keyword object](https://dataxapi.com/docs/objects/keyword_related/), [Keyword audience object](https://dataxapi.com/docs/objects/keyword_audience/), [Account recent change object](https://dataxapi.com/docs/objects/account_history/), [Brand index history object](https://dataxapi.com/docs/objects/brand_history/), [Brand index averages object](https://dataxapi.com/docs/objects/brand_metrics/), [Creator object](https://dataxapi.com/docs/objects/creator/), [Audience object](https://dataxapi.com/docs/objects/audience/), [Xingtu creator metrics object](https://dataxapi.com/docs/objects/xingtu_creator_metrics/), [Xingtu creator video object](https://dataxapi.com/docs/objects/xingtu_creator_post/), [PGY creator metrics object](https://dataxapi.com/docs/objects/pgy_creator_metrics/), [PGY creator note object](https://dataxapi.com/docs/objects/pgy_creator_post/), [Ad object](https://dataxapi.com/docs/objects/ad/), [Advertiser object](https://dataxapi.com/docs/objects/advertiser/), [Xingtu creator content keywords object](https://dataxapi.com/docs/objects/xingtu_creator_keywords/), [Xingtu creator scores object](https://dataxapi.com/docs/objects/xingtu_creator_scores/), [Xingtu creator content mix object](https://dataxapi.com/docs/objects/xingtu_creator_content_mix/), [Xingtu creator conversion object](https://dataxapi.com/docs/objects/xingtu_creator_conversion/), [Xingtu campaign object](https://dataxapi.com/docs/objects/xingtu_campaign/), [Channels collection object](https://dataxapi.com/docs/objects/channels_collection/), [Topic object](https://dataxapi.com/docs/objects/topic/)

---

Last checked 2026-10-18 19:59 UTC. Catalog revision c48ce454ae6c4c65. [HTML version](https://dataxapi.com/docs/objects/index_creator_metrics/)
