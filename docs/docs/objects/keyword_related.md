# Related keyword object

2 endpoints on 2 platforms return the Related keyword object with the same 7 fields, so code written for one platform reads the others unchanged. A call costs $0.0020 to $0.0400. It is a preview structure and may still change.

For machines: [keyword_related schema](https://dataxapi.com/openapi.json#/components/schemas/keyword_related), [openapi.json](https://dataxapi.com/openapi.json), [Object table (JSON)](https://api.dataxapi.com/v1/catalog/objects), [llms.txt](https://dataxapi.com/llms.txt)

A Related keyword is one word linked to the keyword asked about, with how it is linked (`relation`), its `rank` and its search index. On Douyin it is a word searched together with the keyword or seen with it in content; on Xiaohongshu, what people search before and after it.

`related_to` is the keyword asked about. A related word can go straight back in as the keyword of Keyword index history on the same platform.

## Fields

A field the platform cannot give is left out of the item and named in `meta.unavailable`. It is never filled with a guess or a zero.

| Field | Type | From view | Description |
| --- | --- | --- | --- |
| `keyword` | text | `compact` | The related keyword |
| `related_to` | text | `compact` | The keyword it is related to: the one asked about |
| `relation` | text | `compact` | How it is related: query (searched together with the keyword asked about), posts (appears together with it in content), prior (searched before it), after (searched after it): `query`, `posts`, `prior`, `after` |
| `rank` | integer | `compact` | Position by relevance among the keywords of the same relation, from 1 |
| `relevance` | number | `compact` | How closely it is related to the keyword asked about, 0 to 1 |
| `search_index` | integer | `compact` | Search index of the related keyword: the platform's index, not a count of searches; null where the platform gives no figure for the word |
| `composite_index` | integer | `compact` | Composite index of the related keyword: the platform's index of how much attention content about it drew, not a count |

## Where each number comes from

The same field name does not always mean the same act on every platform. This table says which of the platform's own numbers goes into the field.

| Field | What it holds there | On |
| --- | --- | --- |
| `rank` | The platform's own place by relevance; places may have gaps between them | Douyin |

## What a platform cannot give

A platform stands against a field when none of its endpoints gives it.

| Field | Not available on |
| --- | --- |
| `relevance` | Xiaohongshu (RedNote) |
| `composite_index` | Xiaohongshu (RedNote) |

One endpoint may still leave out a field another gives: each endpoint's page lists what it cannot give, and every answer says so in `meta.unavailable`.

## Endpoints that return Related keyword

### Douyin

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [Douyin trend-index related keywords](https://dataxapi.com/apis/douyin/index/keywords/related.md) | `GET /v1/douyin/index/keywords/related` | Related keyword list | $0.0020 / call |

### Xiaohongshu (RedNote)

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [Xiaohongshu PGY related keywords](https://dataxapi.com/apis/xiaohongshu/pgy/keywords/related.md) | `GET /v1/xiaohongshu/pgy/keywords/related` | Related keyword list | $0.0400 / call |

## Example

One item from `douyin.index.keywords.related`, as recorded 2026-10-12 21:52 UTC. Names, text, IDs and links are examples; the figures are as recorded.

```jsonc
{
  "keyword": "露营车",
  "related_to": "露营",
  "relation": "query",
  "rank": 2,
  "relevance": 0.07604021617112115,
  "search_index": 669384,
  "composite_index": 190809
}
```

[The whole response is on the endpoint's page →](https://dataxapi.com/apis/douyin/index/keywords/related.md)

## Related

- [All endpoints](https://dataxapi.com/apis/): The directory lists what every endpoint returns, with its price.

## Other objects

[Post object](https://dataxapi.com/docs/objects/post/), [Comment object](https://dataxapi.com/docs/objects/comment/), [Account object](https://dataxapi.com/docs/objects/account/), [Trend object](https://dataxapi.com/docs/objects/trend/), [Transcript object](https://dataxapi.com/docs/objects/transcript/), [Creator rates object](https://dataxapi.com/docs/objects/creator_rates/), [Community object](https://dataxapi.com/docs/objects/community/), [Product object](https://dataxapi.com/docs/objects/product/), [Review object](https://dataxapi.com/docs/objects/review/), [Keyword index history object](https://dataxapi.com/docs/objects/keyword_history/), [Keyword audience object](https://dataxapi.com/docs/objects/keyword_audience/), [Account recent change object](https://dataxapi.com/docs/objects/account_history/), [Brand index history object](https://dataxapi.com/docs/objects/brand_history/), [Brand index averages object](https://dataxapi.com/docs/objects/brand_metrics/), [Creator object](https://dataxapi.com/docs/objects/creator/), [Audience object](https://dataxapi.com/docs/objects/audience/), [Xingtu creator metrics object](https://dataxapi.com/docs/objects/xingtu_creator_metrics/), [Xingtu creator video object](https://dataxapi.com/docs/objects/xingtu_creator_post/), [PGY creator metrics object](https://dataxapi.com/docs/objects/pgy_creator_metrics/), [PGY creator note object](https://dataxapi.com/docs/objects/pgy_creator_post/), [Ad object](https://dataxapi.com/docs/objects/ad/), [Advertiser object](https://dataxapi.com/docs/objects/advertiser/), [Douyin trend-index creator metrics object](https://dataxapi.com/docs/objects/index_creator_metrics/), [Xingtu creator content keywords object](https://dataxapi.com/docs/objects/xingtu_creator_keywords/), [Xingtu creator scores object](https://dataxapi.com/docs/objects/xingtu_creator_scores/), [Xingtu creator content mix object](https://dataxapi.com/docs/objects/xingtu_creator_content_mix/), [Xingtu creator conversion object](https://dataxapi.com/docs/objects/xingtu_creator_conversion/), [Xingtu campaign object](https://dataxapi.com/docs/objects/xingtu_campaign/), [Channels collection object](https://dataxapi.com/docs/objects/channels_collection/), [Topic object](https://dataxapi.com/docs/objects/topic/)

---

Last checked 2026-10-18 19:59 UTC. Catalog revision c48ce454ae6c4c65. [HTML version](https://dataxapi.com/docs/objects/keyword_related/)
