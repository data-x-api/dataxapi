# Trend object

9 endpoints on 8 platforms return the Trend object with the same 4 fields, so code written for one platform reads the others unchanged. A call costs $0.0020 to $0.0200.

For machines: [trend schema](https://dataxapi.com/openapi.json#/components/schemas/trend), [openapi.json](https://dataxapi.com/openapi.json), [Object table (JSON)](https://api.dataxapi.com/v1/catalog/objects), [llms.txt](https://dataxapi.com/llms.txt)

A Trend is one entry on a platform's hot list: a search term, a topic or a question, with its `rank` and the platform's own `heat` score where the platform gives them. Every platform's hot list comes back as this one object; where a platform has several lists, `board` picks one.

A trend has no ID on every platform: its `name` is what identifies it, and it can go as `query` to a search of the same platform to read what is behind it. On Zhihu an entry's `id` is its question's.

## Fields

A field the platform cannot give is left out of the item and named in `meta.unavailable`. It is never filled with a guess or a zero.

| Field | Type | From view | Description |
| --- | --- | --- | --- |
| `id` | text | `compact` | The platform's ID for the entry |
| `name` | text | `compact` | Name of the entry |
| `rank` | integer | `compact` | Position on the board, from 1; a pinned entry has none |
| `heat` | integer | `compact` | The platform's heat score |

## Where each number comes from

The same field name does not always mean the same act on every platform. This table says which of the platform's own numbers goes into the field.

| Field | What it holds there | On |
| --- | --- | --- |
| `heat` | The topic index of Douyin's index tool | Douyin |

## What a platform cannot give

A platform stands against a field when none of its endpoints gives it.

| Field | Not available on |
| --- | --- |
| `id` | Bilibili, Weibo, X (Twitter), Reddit |
| `rank` | Xiaohongshu (RedNote) |
| `heat` | X (Twitter), Reddit |

One endpoint may still leave out a field another gives: each endpoint's page lists what it cannot give, and every answer says so in `meta.unavailable`.

## Endpoints that return Trend

### Bilibili

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [Bilibili hot searches](https://dataxapi.com/apis/bilibili/trends/list.md) | `GET /v1/bilibili/trends/list` | Trend list | $0.0020 / call |

### Douyin

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [Douyin trend-index live hot topics](https://dataxapi.com/apis/douyin/index/trends/list.md) | `GET /v1/douyin/index/trends/list` | Trend list | $0.0020 / call |
| [Douyin hot search board](https://dataxapi.com/apis/douyin/trends/list.md) | `GET /v1/douyin/trends/list` | Trend list | $0.0020 / call |

### Kuaishou

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [Kuaishou hot list](https://dataxapi.com/apis/kuaishou/trends/list.md) | `GET /v1/kuaishou/trends/list` | Trend list | $0.0020 / call |

### Weibo

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [Weibo hot search board](https://dataxapi.com/apis/weibo/trends/list.md) | `GET /v1/weibo/trends/list` | Trend list | $0.0020 / call |

### X (Twitter)

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [X trends](https://dataxapi.com/apis/x/trends/list.md) | `GET /v1/x/trends/list` | Trend list | $0.0090 / call |

### Xiaohongshu (RedNote)

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [Xiaohongshu trends](https://dataxapi.com/apis/xiaohongshu/trends/list.md) | `GET /v1/xiaohongshu/trends/list` | Trend list | $0.0200 / call |

### Reddit

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [Reddit trending searches](https://dataxapi.com/apis/reddit/trends/list.md) | `GET /v1/reddit/trends/list` | Trend list | $0.0020 / call |

### Zhihu

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [Zhihu hot list](https://dataxapi.com/apis/zhihu/trends/list.md) | `GET /v1/zhihu/trends/list` | Trend list | $0.0020 / call |

## Example

One item from `bilibili.trends.list`, as recorded 2026-10-12 18:42 UTC. Names, text, IDs and links are examples; the figures are as recorded.

```jsonc
{ "name": "国庆周末露营去哪儿", "rank": 1, "heat": 2038305 }
```

[The whole response is on the endpoint's page →](https://dataxapi.com/apis/bilibili/trends/list.md)

## Related

- [Trending topics API](https://dataxapi.com/roles/trends-list/): The same action on 8 platforms, with a per-platform field table.
- [All endpoints](https://dataxapi.com/apis/): The directory lists what every endpoint returns, with its price.

## Other objects

[Post object](https://dataxapi.com/docs/objects/post/), [Comment object](https://dataxapi.com/docs/objects/comment/), [Account object](https://dataxapi.com/docs/objects/account/), [Transcript object](https://dataxapi.com/docs/objects/transcript/), [Creator rates object](https://dataxapi.com/docs/objects/creator_rates/), [Community object](https://dataxapi.com/docs/objects/community/), [Product object](https://dataxapi.com/docs/objects/product/), [Review object](https://dataxapi.com/docs/objects/review/), [Keyword index history object](https://dataxapi.com/docs/objects/keyword_history/), [Related keyword object](https://dataxapi.com/docs/objects/keyword_related/), [Keyword audience object](https://dataxapi.com/docs/objects/keyword_audience/), [Account recent change object](https://dataxapi.com/docs/objects/account_history/), [Brand index history object](https://dataxapi.com/docs/objects/brand_history/), [Brand index averages object](https://dataxapi.com/docs/objects/brand_metrics/), [Creator object](https://dataxapi.com/docs/objects/creator/), [Audience object](https://dataxapi.com/docs/objects/audience/), [Xingtu creator metrics object](https://dataxapi.com/docs/objects/xingtu_creator_metrics/), [Xingtu creator video object](https://dataxapi.com/docs/objects/xingtu_creator_post/), [PGY creator metrics object](https://dataxapi.com/docs/objects/pgy_creator_metrics/), [PGY creator note object](https://dataxapi.com/docs/objects/pgy_creator_post/), [Ad object](https://dataxapi.com/docs/objects/ad/), [Advertiser object](https://dataxapi.com/docs/objects/advertiser/), [Douyin trend-index creator metrics object](https://dataxapi.com/docs/objects/index_creator_metrics/), [Xingtu creator content keywords object](https://dataxapi.com/docs/objects/xingtu_creator_keywords/), [Xingtu creator scores object](https://dataxapi.com/docs/objects/xingtu_creator_scores/), [Xingtu creator content mix object](https://dataxapi.com/docs/objects/xingtu_creator_content_mix/), [Xingtu creator conversion object](https://dataxapi.com/docs/objects/xingtu_creator_conversion/), [Xingtu campaign object](https://dataxapi.com/docs/objects/xingtu_campaign/), [Channels collection object](https://dataxapi.com/docs/objects/channels_collection/), [Topic object](https://dataxapi.com/docs/objects/topic/)

---

Last checked 2026-10-18 19:59 UTC. Catalog revision c48ce454ae6c4c65. [HTML version](https://dataxapi.com/docs/objects/trend/)
