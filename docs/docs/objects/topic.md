# Topic object

The Topic object has 6 fields and is returned by 1 endpoint on Xiaohongshu (RedNote). A call costs $0.0200. It is a preview structure and may still change.

For machines: [topic schema](https://dataxapi.com/openapi.json#/components/schemas/topic), [openapi.json](https://dataxapi.com/openapi.json), [Object table (JSON)](https://api.dataxapi.com/v1/catalog/objects), [llms.txt](https://dataxapi.com/llms.txt)

A Topic is the page that gathers the posts made under one hashtag or subject, with its name, its description and how often it was viewed. It comes from the topic pages of Xiaohongshu (RedNote), which add the discussion count the page shows in `ext.discussions`.

Its `id`, the topic page ID of 24 hexadecimal characters, goes unchanged to the endpoint that lists the trending notes under it, which come back as Post. A Trend on a hot list is something else: an entry of a board, identified by its name.

## Fields

A field the platform cannot give is left out of the item and named in `meta.unavailable`. It is never filled with a guess or a zero.

| Field | Type | From view | Description |
| --- | --- | --- | --- |
| `id` | text | `compact` | ID; pass it unchanged to the endpoints that get the topic and list the posts under it |
| `name` | text | `compact` | Name of the topic |
| `url` | link | `compact` | Link that opens the topic |
| `description` | text | `compact` | What the topic says it is about; null when it says nothing |
| `metrics` | object | `compact` | Topic counts |
| `metrics.views` | integer | `compact` | Views of the topic |
| `metrics.posts` | integer | `compact` | Posts under the topic |

## What a platform cannot give

A platform stands against a field when none of its endpoints gives it.

| Field | Not available on |
| --- | --- |
| `metrics.posts` | Xiaohongshu (RedNote) |

One endpoint may still leave out a field another gives: each endpoint's page lists what it cannot give, and every answer says so in `meta.unavailable`.

## Endpoints that return Topic

### Xiaohongshu (RedNote)

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [Xiaohongshu topic detail](https://dataxapi.com/apis/xiaohongshu/topics/get.md) | `GET /v1/xiaohongshu/topics/get` | Topic | $0.0200 / call |

## Example

One item from `xiaohongshu.topics.get`, as recorded 2026-10-13 03:28 UTC. Names, text, IDs and links are examples; the figures are as recorded.

```jsonc
{
  "id": "6ba8911100000000e0fbcdfc",
  "name": "周末露营装备推荐",
  "url": "https://www.xiaohongshu.com/page/topics/6ba8911100000000e0fbcdfc",
  "description": null,
  "metrics": { "views": 8553318142 }
}
```

[The whole response is on the endpoint's page →](https://dataxapi.com/apis/xiaohongshu/topics/get.md)

## Related

- [All endpoints](https://dataxapi.com/apis/): The directory lists what every endpoint returns, with its price.

## Other objects

[Post object](https://dataxapi.com/docs/objects/post/), [Comment object](https://dataxapi.com/docs/objects/comment/), [Account object](https://dataxapi.com/docs/objects/account/), [Trend object](https://dataxapi.com/docs/objects/trend/), [Transcript object](https://dataxapi.com/docs/objects/transcript/), [Creator rates object](https://dataxapi.com/docs/objects/creator_rates/), [Community object](https://dataxapi.com/docs/objects/community/), [Product object](https://dataxapi.com/docs/objects/product/), [Review object](https://dataxapi.com/docs/objects/review/), [Keyword index history object](https://dataxapi.com/docs/objects/keyword_history/), [Related keyword object](https://dataxapi.com/docs/objects/keyword_related/), [Keyword audience object](https://dataxapi.com/docs/objects/keyword_audience/), [Account recent change object](https://dataxapi.com/docs/objects/account_history/), [Brand index history object](https://dataxapi.com/docs/objects/brand_history/), [Brand index averages object](https://dataxapi.com/docs/objects/brand_metrics/), [Creator object](https://dataxapi.com/docs/objects/creator/), [Audience object](https://dataxapi.com/docs/objects/audience/), [Xingtu creator metrics object](https://dataxapi.com/docs/objects/xingtu_creator_metrics/), [Xingtu creator video object](https://dataxapi.com/docs/objects/xingtu_creator_post/), [PGY creator metrics object](https://dataxapi.com/docs/objects/pgy_creator_metrics/), [PGY creator note object](https://dataxapi.com/docs/objects/pgy_creator_post/), [Ad object](https://dataxapi.com/docs/objects/ad/), [Advertiser object](https://dataxapi.com/docs/objects/advertiser/), [Douyin trend-index creator metrics object](https://dataxapi.com/docs/objects/index_creator_metrics/), [Xingtu creator content keywords object](https://dataxapi.com/docs/objects/xingtu_creator_keywords/), [Xingtu creator scores object](https://dataxapi.com/docs/objects/xingtu_creator_scores/), [Xingtu creator content mix object](https://dataxapi.com/docs/objects/xingtu_creator_content_mix/), [Xingtu creator conversion object](https://dataxapi.com/docs/objects/xingtu_creator_conversion/), [Xingtu campaign object](https://dataxapi.com/docs/objects/xingtu_campaign/), [Channels collection object](https://dataxapi.com/docs/objects/channels_collection/)

---

Last checked 2026-10-18 19:59 UTC. Catalog revision c48ce454ae6c4c65. [HTML version](https://dataxapi.com/docs/objects/topic/)
