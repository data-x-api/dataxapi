# Brand index history object

The Brand index history object has 6 fields and is returned by 1 endpoint on Douyin. A call costs $0.0020. It is a preview structure and may still change.

For machines: [brand_history schema](https://dataxapi.com/openapi.json#/components/schemas/brand_history), [openapi.json](https://dataxapi.com/openapi.json), [Object table (JSON)](https://api.dataxapi.com/v1/catalog/objects), [llms.txt](https://dataxapi.com/llms.txt)

Brand index history is a brand's three indexes day by day on Douyin's trend-index (巨量算数): `search_index`, `content_index` and `spread_index`. They are the platform's scores, not counts, and each day is a calendar day in China time.

`brand` is the brand's name as the index spells it, and `category` the industry the platform files it under. Brand index averages gives the same three indexes averaged over a period, beside the leading brands of its industry.

## Fields

A field the platform cannot give is left out of the item and named in `meta.unavailable`. It is never filled with a guess or a zero.

| Field | Type | From view | Description |
| --- | --- | --- | --- |
| `brand` | text | `compact` | The brand's name |
| `category` | text | `compact` | The industry the platform files the brand under, in its words |
| `points` | list of object | `compact` | The indexes day by day, one entry a day, oldest first |
| `points[].date` | time | `compact` | The day: a calendar day in China time (UTC+8), written as midnight UTC of its date (8 a.m. that day in China); passed back as since or until it asks for that same day |
| `points[].search_index` | integer | `compact` | Search index: how much the brand was searched, not a count of searches |
| `points[].content_index` | integer | `compact` | Content index: how much content about the brand there was, not a count of posts |
| `points[].spread_index` | integer | `compact` | Spread index: how far that content travelled, not a count |

## Endpoints that return Brand index history

### Douyin

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [Douyin trend-index brand trends](https://dataxapi.com/apis/douyin/index/brands/history.md) | `GET /v1/douyin/index/brands/history` | Brand index history | $0.0020 / call |

## Example

One item from `douyin.index.brands.history`, as recorded 2026-10-12 21:56 UTC. Names, text, IDs and links are examples; the figures are as recorded.

```jsonc
{
  "brand": "泡泡玛特",
  "category": "母婴",
  "points": [
    {
      "date": "2026-09-01T00:00:00Z",
      "search_index": 121864,
      "content_index": 41224,
      "spread_index": 75601
    },
    {
      "date": "2026-09-02T00:00:00Z",
      "search_index": 122413,
      "content_index": 46057,
      "spread_index": 77637
    },
    {
      "date": "2026-09-03T00:00:00Z",
      "search_index": 122213,
      "content_index": 45504,
      "spread_index": 77642
    },
    {
      "date": "2026-09-04T00:00:00Z",
      "search_index": 122205,
      "content_index": 54042,
      "spread_index": 78337
    },
    {
      "date": "2026-09-05T00:00:00Z",
      "search_index": 124682,
      "content_index": 42229,
      "spread_index": 77377
    },
    {
      "date": "2026-09-06T00:00:00Z",
      "search_index": 124155,
      "content_index": 42738,
      "spread_index": 76569
    },
    {
      "date": "2026-09-07T00:00:00Z",
      "search_index": 121751,
      "content_index": 41525,
      "spread_index": 76108
    },
    // … 23 more
  ]
}
```

[The whole response is on the endpoint's page →](https://dataxapi.com/apis/douyin/index/brands/history.md)

## Related

- [All endpoints](https://dataxapi.com/apis/): The directory lists what every endpoint returns, with its price.

## Other objects

[Post object](https://dataxapi.com/docs/objects/post/), [Comment object](https://dataxapi.com/docs/objects/comment/), [Account object](https://dataxapi.com/docs/objects/account/), [Trend object](https://dataxapi.com/docs/objects/trend/), [Transcript object](https://dataxapi.com/docs/objects/transcript/), [Creator rates object](https://dataxapi.com/docs/objects/creator_rates/), [Community object](https://dataxapi.com/docs/objects/community/), [Product object](https://dataxapi.com/docs/objects/product/), [Review object](https://dataxapi.com/docs/objects/review/), [Keyword index history object](https://dataxapi.com/docs/objects/keyword_history/), [Related keyword object](https://dataxapi.com/docs/objects/keyword_related/), [Keyword audience object](https://dataxapi.com/docs/objects/keyword_audience/), [Account recent change object](https://dataxapi.com/docs/objects/account_history/), [Brand index averages object](https://dataxapi.com/docs/objects/brand_metrics/), [Creator object](https://dataxapi.com/docs/objects/creator/), [Audience object](https://dataxapi.com/docs/objects/audience/), [Xingtu creator metrics object](https://dataxapi.com/docs/objects/xingtu_creator_metrics/), [Xingtu creator video object](https://dataxapi.com/docs/objects/xingtu_creator_post/), [PGY creator metrics object](https://dataxapi.com/docs/objects/pgy_creator_metrics/), [PGY creator note object](https://dataxapi.com/docs/objects/pgy_creator_post/), [Ad object](https://dataxapi.com/docs/objects/ad/), [Advertiser object](https://dataxapi.com/docs/objects/advertiser/), [Douyin trend-index creator metrics object](https://dataxapi.com/docs/objects/index_creator_metrics/), [Xingtu creator content keywords object](https://dataxapi.com/docs/objects/xingtu_creator_keywords/), [Xingtu creator scores object](https://dataxapi.com/docs/objects/xingtu_creator_scores/), [Xingtu creator content mix object](https://dataxapi.com/docs/objects/xingtu_creator_content_mix/), [Xingtu creator conversion object](https://dataxapi.com/docs/objects/xingtu_creator_conversion/), [Xingtu campaign object](https://dataxapi.com/docs/objects/xingtu_campaign/), [Channels collection object](https://dataxapi.com/docs/objects/channels_collection/), [Topic object](https://dataxapi.com/docs/objects/topic/)

---

Last checked 2026-10-18 19:59 UTC. Catalog revision c48ce454ae6c4c65. [HTML version](https://dataxapi.com/docs/objects/brand_history/)
