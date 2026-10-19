# Creator object

4 endpoints on 2 platforms return the Creator object with the same 9 fields, so code written for one platform reads the others unchanged. A call costs $0.0040 to $0.0400. It is a preview structure and may still change.

For machines: [creator schema](https://dataxapi.com/openapi.json#/components/schemas/creator), [openapi.json](https://dataxapi.com/openapi.json), [Object table (JSON)](https://api.dataxapi.com/v1/catalog/objects), [llms.txt](https://dataxapi.com/llms.txt)

A Creator is a creator as a platform's own marketplace for sponsored content lists one: Douyin's Xingtu (星图) or Xiaohongshu's PGY (蒲公英). It carries the marketplace's creator `id`, the name, location, content categories and follower count, and in the full view each marketplace's rates and figures under `ext`.

It is not an Account: `account_id` points to the creator's account on the platform, as the account endpoints take it. Its `id` is what the marketplace's other endpoints take, Creator rates, Audience and the Xingtu and PGY figures, videos and notes among them.

## Fields

A field the platform cannot give is left out of the item and named in `meta.unavailable`. It is never filled with a guess or a zero.

| Field | Type | From view | Description |
| --- | --- | --- | --- |
| `id` | text | `compact` | The creator's ID in the marketplace |
| `account_id` | text | `compact` | ID of the creator's account on the platform, as the platform's account endpoints take it |
| `username` | text | `compact` | Handle |
| `name` | text | `compact` | Display name |
| `avatar_url` | link | `standard` | Avatar |
| `location` | text | `standard` | Where the creator is based, in the platform's words |
| `categories` | list of text | `compact` | Content categories, first level, in the platform's words |
| `subcategories` | list of text | `standard` | Content categories, second level, in the platform's words |
| `metrics` | object | `compact` | Creator counts |
| `metrics.followers` | integer | `compact` | Followers |

## Endpoints that return Creator

### Douyin

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [Douyin Xingtu creator search](https://dataxapi.com/apis/douyin/xingtu/creators/search.md) | `GET /v1/douyin/xingtu/creators/search` | Creator list | $0.0040 / call |
| [Douyin Xingtu creator profile](https://dataxapi.com/apis/douyin/xingtu/creators/get.md) | `GET /v1/douyin/xingtu/creators/get` | Creator | $0.0040 / call |

### Xiaohongshu (RedNote)

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [Xiaohongshu PGY creator search](https://dataxapi.com/apis/xiaohongshu/pgy/creators/search.md) | `GET /v1/xiaohongshu/pgy/creators/search` | Creator list | $0.0400 / call |
| [Xiaohongshu PGY creator detail](https://dataxapi.com/apis/xiaohongshu/pgy/creators/get.md) | `GET /v1/xiaohongshu/pgy/creators/get` | Creator | $0.0400 / call |

## Example

One item from `douyin.xingtu.creators.search`, as recorded 2026-10-12 22:06 UTC. Names, text, IDs and links are examples; the figures are as recorded.

```jsonc
{
  "id": "6811001738597474041",
  "name": "橘子汽水不加冰",
  "avatar_url": "https://p3-pc.douyinpic.com/aweme/100x100/aweme-avatar/tos-cn-avt-0015_49724ca5b7a50c72cbe5.jpeg",
  "location": "北京",
  "categories": ["户外"],
  "subcategories": ["家居好物"],
  "metrics": { "followers": 48169 }
}
```

[The whole response is on the endpoint's page →](https://dataxapi.com/apis/douyin/xingtu/creators/search.md)

## Related

- [Creator search API](https://dataxapi.com/roles/creators-search/): The same action on 2 platforms, with a per-platform field table.
- [Creator profile API](https://dataxapi.com/roles/creators-get/): The same action on 2 platforms, with a per-platform field table.
- [All endpoints](https://dataxapi.com/apis/): The directory lists what every endpoint returns, with its price.

## Other objects

[Post object](https://dataxapi.com/docs/objects/post/), [Comment object](https://dataxapi.com/docs/objects/comment/), [Account object](https://dataxapi.com/docs/objects/account/), [Trend object](https://dataxapi.com/docs/objects/trend/), [Transcript object](https://dataxapi.com/docs/objects/transcript/), [Creator rates object](https://dataxapi.com/docs/objects/creator_rates/), [Community object](https://dataxapi.com/docs/objects/community/), [Product object](https://dataxapi.com/docs/objects/product/), [Review object](https://dataxapi.com/docs/objects/review/), [Keyword index history object](https://dataxapi.com/docs/objects/keyword_history/), [Related keyword object](https://dataxapi.com/docs/objects/keyword_related/), [Keyword audience object](https://dataxapi.com/docs/objects/keyword_audience/), [Account recent change object](https://dataxapi.com/docs/objects/account_history/), [Brand index history object](https://dataxapi.com/docs/objects/brand_history/), [Brand index averages object](https://dataxapi.com/docs/objects/brand_metrics/), [Audience object](https://dataxapi.com/docs/objects/audience/), [Xingtu creator metrics object](https://dataxapi.com/docs/objects/xingtu_creator_metrics/), [Xingtu creator video object](https://dataxapi.com/docs/objects/xingtu_creator_post/), [PGY creator metrics object](https://dataxapi.com/docs/objects/pgy_creator_metrics/), [PGY creator note object](https://dataxapi.com/docs/objects/pgy_creator_post/), [Ad object](https://dataxapi.com/docs/objects/ad/), [Advertiser object](https://dataxapi.com/docs/objects/advertiser/), [Douyin trend-index creator metrics object](https://dataxapi.com/docs/objects/index_creator_metrics/), [Xingtu creator content keywords object](https://dataxapi.com/docs/objects/xingtu_creator_keywords/), [Xingtu creator scores object](https://dataxapi.com/docs/objects/xingtu_creator_scores/), [Xingtu creator content mix object](https://dataxapi.com/docs/objects/xingtu_creator_content_mix/), [Xingtu creator conversion object](https://dataxapi.com/docs/objects/xingtu_creator_conversion/), [Xingtu campaign object](https://dataxapi.com/docs/objects/xingtu_campaign/), [Channels collection object](https://dataxapi.com/docs/objects/channels_collection/), [Topic object](https://dataxapi.com/docs/objects/topic/)

---

Last checked 2026-10-18 19:59 UTC. Catalog revision c48ce454ae6c4c65. [HTML version](https://dataxapi.com/docs/objects/creator/)
