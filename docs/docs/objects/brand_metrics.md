# Brand index averages object

The Brand index averages object has 9 fields and is returned by 1 endpoint on Douyin. A call costs $0.0020. It is a preview structure and may still change.

For machines: [brand_metrics schema](https://dataxapi.com/openapi.json#/components/schemas/brand_metrics), [openapi.json](https://dataxapi.com/openapi.json), [Object table (JSON)](https://api.dataxapi.com/v1/catalog/objects), [llms.txt](https://dataxapi.com/llms.txt)

Brand index averages is a brand's search, content and spread indexes on Douyin's trend-index (巨量算数), each as a daily average over the dates asked for. `benchmarks` sets them against the average of every brand in its industry and of the industry's top 3, 5, 10, 15 and 30.

It names the brand and its `category` the way Brand index history does, which has the same three indexes day by day. Read the two together: the averages say where a brand stands in its industry, the history when it moved.

## Fields

A field the platform cannot give is left out of the item and named in `meta.unavailable`. It is never filled with a guess or a zero.

| Field | Type | From view | Description |
| --- | --- | --- | --- |
| `brand` | text | `compact` | The brand's name |
| `category` | text | `compact` | The industry the platform files the brand under, in its words |
| `search_index` | integer | `compact` | Daily average of the search index over the period |
| `content_index` | integer | `compact` | Daily average of the content index over the period |
| `spread_index` | integer | `compact` | Daily average of the spread index over the period |
| `benchmarks` | list of object | `compact` | What to hold it against: the average of every brand in the industry, and of its leading brands |
| `benchmarks[].scope` | text | `compact` | Which brands: all of the industry, or its top 3, 5, 10, 15 or 30: `all`, `top3`, `top5`, `top10`, `top15`, `top30` |
| `benchmarks[].search_index` | integer | `compact` | Daily average search index of that group |
| `benchmarks[].content_index` | integer | `compact` | Daily average content index of that group |
| `benchmarks[].spread_index` | integer | `compact` | Daily average spread index of that group |

## Endpoints that return Brand index averages

### Douyin

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [Douyin trend-index brand comparison](https://dataxapi.com/apis/douyin/index/brands/metrics.md) | `GET /v1/douyin/index/brands/metrics` | Brand index averages | $0.0020 / call |

## Example

One item from `douyin.index.brands.metrics`, as recorded 2026-10-12 21:56 UTC. Names, text, IDs and links are examples; the figures are as recorded.

```jsonc
{
  "brand": "泡泡玛特",
  "category": "母婴",
  "search_index": 123594,
  "content_index": 46731,
  "spread_index": 77244,
  "benchmarks": [
    {
      "scope": "top15",
      "search_index": 105282,
      "content_index": 57569,
      "spread_index": 73644
    },
    {
      "scope": "top3",
      "search_index": 114818,
      "content_index": 58925,
      "spread_index": 76682
    },
    // … 4 more
  ]
}
```

[The whole response is on the endpoint's page →](https://dataxapi.com/apis/douyin/index/brands/metrics.md)

## Related

- [All endpoints](https://dataxapi.com/apis/): The directory lists what every endpoint returns, with its price.

## Other objects

[Post object](https://dataxapi.com/docs/objects/post/), [Comment object](https://dataxapi.com/docs/objects/comment/), [Account object](https://dataxapi.com/docs/objects/account/), [Trend object](https://dataxapi.com/docs/objects/trend/), [Transcript object](https://dataxapi.com/docs/objects/transcript/), [Creator rates object](https://dataxapi.com/docs/objects/creator_rates/), [Community object](https://dataxapi.com/docs/objects/community/), [Product object](https://dataxapi.com/docs/objects/product/), [Review object](https://dataxapi.com/docs/objects/review/), [Keyword index history object](https://dataxapi.com/docs/objects/keyword_history/), [Related keyword object](https://dataxapi.com/docs/objects/keyword_related/), [Keyword audience object](https://dataxapi.com/docs/objects/keyword_audience/), [Account recent change object](https://dataxapi.com/docs/objects/account_history/), [Brand index history object](https://dataxapi.com/docs/objects/brand_history/), [Creator object](https://dataxapi.com/docs/objects/creator/), [Audience object](https://dataxapi.com/docs/objects/audience/), [Xingtu creator metrics object](https://dataxapi.com/docs/objects/xingtu_creator_metrics/), [Xingtu creator video object](https://dataxapi.com/docs/objects/xingtu_creator_post/), [PGY creator metrics object](https://dataxapi.com/docs/objects/pgy_creator_metrics/), [PGY creator note object](https://dataxapi.com/docs/objects/pgy_creator_post/), [Ad object](https://dataxapi.com/docs/objects/ad/), [Advertiser object](https://dataxapi.com/docs/objects/advertiser/), [Douyin trend-index creator metrics object](https://dataxapi.com/docs/objects/index_creator_metrics/), [Xingtu creator content keywords object](https://dataxapi.com/docs/objects/xingtu_creator_keywords/), [Xingtu creator scores object](https://dataxapi.com/docs/objects/xingtu_creator_scores/), [Xingtu creator content mix object](https://dataxapi.com/docs/objects/xingtu_creator_content_mix/), [Xingtu creator conversion object](https://dataxapi.com/docs/objects/xingtu_creator_conversion/), [Xingtu campaign object](https://dataxapi.com/docs/objects/xingtu_campaign/), [Channels collection object](https://dataxapi.com/docs/objects/channels_collection/), [Topic object](https://dataxapi.com/docs/objects/topic/)

---

Last checked 2026-10-18 19:59 UTC. Catalog revision c48ce454ae6c4c65. [HTML version](https://dataxapi.com/docs/objects/brand_metrics/)
