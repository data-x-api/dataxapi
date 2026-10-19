# Keyword index history object

2 endpoints on 2 platforms return the Keyword index history object with the same 8 fields, so code written for one platform reads the others unchanged. A call costs $0.0060 to $0.0400. It is a preview structure and may still change.

For machines: [keyword_history schema](https://dataxapi.com/openapi.json#/components/schemas/keyword_history), [openapi.json](https://dataxapi.com/openapi.json), [Object table (JSON)](https://api.dataxapi.com/v1/catalog/objects), [llms.txt](https://dataxapi.com/llms.txt)

Keyword index history is a keyword's index day by day, from the platform's own keyword tool: Douyin's trend-index (巨量算数) or Xiaohongshu's PGY (蒲公英). Each entry of `points` is one China-time day with its `search_index`, an index and not a count of searches; Douyin adds `composite_index`, Xiaohongshu the day's notes, impressions, reads and engagements.

`keyword` identifies it. Related keyword gives the words to track next, and on Douyin Keyword audience says who is behind the word; the two platforms' indexes are not on one scale, so compare a keyword with itself or with another keyword on the same platform.

## Fields

A field the platform cannot give is left out of the item and named in `meta.unavailable`. It is never filled with a guess or a zero.

| Field | Type | From view | Description |
| --- | --- | --- | --- |
| `keyword` | text | `compact` | The keyword |
| `points` | list of object | `compact` | The figures day by day, one entry a day, oldest first |
| `points[].date` | time | `compact` | The day: a calendar day in China time (UTC+8), written as midnight UTC of its date (8 a.m. that day in China); passed back as since or until it asks for that same day |
| `points[].search_index` | integer | `compact` | Search index of the day: the platform's index of how much the keyword was searched, not a count of searches |
| `points[].composite_index` | integer | `compact` | Composite index of the day: the platform's index of how much attention content about the keyword drew, not a count |
| `points[].notes` | integer | `standard` | Posts about the keyword that day |
| `points[].impressions` | integer | `standard` | Times those posts were shown that day |
| `points[].views` | integer | `standard` | Times those posts were read that day |
| `points[].engagements` | integer | `standard` | Engagements with those posts that day |

## Where each number comes from

The same field name does not always mean the same act on every platform. This table says which of the platform's own numbers goes into the field.

| Field | What it holds there | On |
| --- | --- | --- |
| `keyword` | As the platform writes it: Latin letters in lower case | Douyin |

## What a platform cannot give

A platform stands against a field when none of its endpoints gives it.

| Field | Not available on |
| --- | --- |
| `points[].composite_index` | Xiaohongshu (RedNote) |
| `points[].notes` | Douyin |
| `points[].impressions` | Douyin |
| `points[].views` | Douyin |
| `points[].engagements` | Douyin |

One endpoint may still leave out a field another gives: each endpoint's page lists what it cannot give, and every answer says so in `meta.unavailable`.

## Endpoints that return Keyword index history

### Douyin

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [Douyin trend-index keyword trends](https://dataxapi.com/apis/douyin/index/keywords/history.md) | `GET /v1/douyin/index/keywords/history` | Keyword index history list | $0.0060 / call |

### Xiaohongshu (RedNote)

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [Xiaohongshu PGY keyword search index](https://dataxapi.com/apis/xiaohongshu/pgy/keywords/history.md) | `GET /v1/xiaohongshu/pgy/keywords/history` | Keyword index history | $0.0400 / call |

## Example

One item from `douyin.index.keywords.history`, as recorded 2026-10-12 21:47 UTC. Names, text, IDs and links are examples; the figures are as recorded.

```jsonc
{
  "keyword": "咖啡",
  "points": [
    {
      "date": "2026-09-01T00:00:00Z",
      "search_index": 4542097,
      "composite_index": 1627826
    },
    {
      "date": "2026-09-02T00:00:00Z",
      "search_index": 4430237,
      "composite_index": 1603543
    },
    {
      "date": "2026-09-03T00:00:00Z",
      "search_index": 4439049,
      "composite_index": 1606224
    },
    {
      "date": "2026-09-04T00:00:00Z",
      "search_index": 4590172,
      "composite_index": 1648872
    },
    {
      "date": "2026-09-05T00:00:00Z",
      "search_index": 5608382,
      "composite_index": 1966637
    },
    {
      "date": "2026-09-06T00:00:00Z",
      "search_index": 5341970,
      "composite_index": 1888380
    },
    {
      "date": "2026-09-07T00:00:00Z",
      "search_index": 5098808,
      "composite_index": 1808789
    },
    // … 23 more
  ]
}
```

[The whole response is on the endpoint's page →](https://dataxapi.com/apis/douyin/index/keywords/history.md)

## Related

- [All endpoints](https://dataxapi.com/apis/): The directory lists what every endpoint returns, with its price.

## Other objects

[Post object](https://dataxapi.com/docs/objects/post/), [Comment object](https://dataxapi.com/docs/objects/comment/), [Account object](https://dataxapi.com/docs/objects/account/), [Trend object](https://dataxapi.com/docs/objects/trend/), [Transcript object](https://dataxapi.com/docs/objects/transcript/), [Creator rates object](https://dataxapi.com/docs/objects/creator_rates/), [Community object](https://dataxapi.com/docs/objects/community/), [Product object](https://dataxapi.com/docs/objects/product/), [Review object](https://dataxapi.com/docs/objects/review/), [Related keyword object](https://dataxapi.com/docs/objects/keyword_related/), [Keyword audience object](https://dataxapi.com/docs/objects/keyword_audience/), [Account recent change object](https://dataxapi.com/docs/objects/account_history/), [Brand index history object](https://dataxapi.com/docs/objects/brand_history/), [Brand index averages object](https://dataxapi.com/docs/objects/brand_metrics/), [Creator object](https://dataxapi.com/docs/objects/creator/), [Audience object](https://dataxapi.com/docs/objects/audience/), [Xingtu creator metrics object](https://dataxapi.com/docs/objects/xingtu_creator_metrics/), [Xingtu creator video object](https://dataxapi.com/docs/objects/xingtu_creator_post/), [PGY creator metrics object](https://dataxapi.com/docs/objects/pgy_creator_metrics/), [PGY creator note object](https://dataxapi.com/docs/objects/pgy_creator_post/), [Ad object](https://dataxapi.com/docs/objects/ad/), [Advertiser object](https://dataxapi.com/docs/objects/advertiser/), [Douyin trend-index creator metrics object](https://dataxapi.com/docs/objects/index_creator_metrics/), [Xingtu creator content keywords object](https://dataxapi.com/docs/objects/xingtu_creator_keywords/), [Xingtu creator scores object](https://dataxapi.com/docs/objects/xingtu_creator_scores/), [Xingtu creator content mix object](https://dataxapi.com/docs/objects/xingtu_creator_content_mix/), [Xingtu creator conversion object](https://dataxapi.com/docs/objects/xingtu_creator_conversion/), [Xingtu campaign object](https://dataxapi.com/docs/objects/xingtu_campaign/), [Channels collection object](https://dataxapi.com/docs/objects/channels_collection/), [Topic object](https://dataxapi.com/docs/objects/topic/)

---

Last checked 2026-10-18 19:59 UTC. Catalog revision c48ce454ae6c4c65. [HTML version](https://dataxapi.com/docs/objects/keyword_history/)
