# Audience object

3 endpoints on 2 platforms return the Audience object with the same 32 fields, so code written for one platform reads the others unchanged. A call costs $0.0020 to $0.0400. It is a preview structure and may still change.

For machines: [audience schema](https://dataxapi.com/openapi.json#/components/schemas/audience), [openapi.json](https://dataxapi.com/openapi.json), [Object table (JSON)](https://api.dataxapi.com/v1/catalog/objects), [llms.txt](https://dataxapi.com/llms.txt)

An Audience is who follows a creator, broken down by gender, age, province, city, interest and device, each segment with its `share` from 0 to 1. Xingtu (星图) also gives a head count per segment and breaks followers down by city tier, consumer group, category bought and amount spent per order.

`creator_id` names whose followers they are: the Xingtu or PGY (蒲公英) creator ID, or, from Douyin's trend-index (巨量算数), the account's numeric Douyin ID (uid), which reads any account and not only marketplace creators. On PGY, `measured_at` says which day the figures are of.

## Fields

A field the platform cannot give is left out of the item and named in `meta.unavailable`. It is never filled with a guess or a zero.

| Field | Type | From view | Description |
| --- | --- | --- | --- |
| `creator_id` | text | `compact` | Creator ID |
| `measured_at` | time | `compact` | The day the figures are of, given as the start of that day in China time |
| `gender` | list of object | `compact` | By gender |
| `gender[].name` | text | `compact` | Name of the segment, in the platform's words (the two genders come in lower-case English) |
| `gender[].share` | number | `compact` | The segment's share of the segments listed, 0 to 1 |
| `gender[].count` | integer | `compact` | Followers in the segment |
| `age` | list of object | `compact` | By age group |
| `age[].name` | text | `compact` | Name of the segment, in the platform's words (the two genders come in lower-case English) |
| `age[].share` | number | `compact` | The segment's share of the segments listed, 0 to 1 |
| `age[].count` | integer | `compact` | Followers in the segment |
| `province` | list of object | `compact` | By province |
| `province[].name` | text | `compact` | Name of the segment, in the platform's words (the two genders come in lower-case English) |
| `province[].share` | number | `compact` | The segment's share of the segments listed, 0 to 1 |
| `province[].count` | integer | `compact` | Followers in the segment |
| `city` | list of object | `compact` | By city, the largest only |
| `city[].name` | text | `compact` | Name of the segment, in the platform's words (the two genders come in lower-case English) |
| `city[].share` | number | `compact` | The segment's share of the segments listed, 0 to 1 |
| `city[].count` | integer | `compact` | Followers in the segment |
| `interest` | list of object | `compact` | By interest |
| `interest[].name` | text | `compact` | Name of the segment, in the platform's words (the two genders come in lower-case English) |
| `interest[].share` | number | `compact` | The segment's share of the segments listed, 0 to 1 |
| `interest[].count` | integer | `compact` | Followers in the segment |
| `device` | list of object | `compact` | By phone brand |
| `device[].name` | text | `compact` | Name of the segment, in the platform's words (the two genders come in lower-case English) |
| `device[].share` | number | `compact` | The segment's share of the segments listed, 0 to 1 |
| `device[].count` | integer | `compact` | Followers in the segment |
| `city_tier` | list of object | `compact` | By city tier |
| `city_tier[].name` | text | `compact` | Name of the segment, in the platform's words (the two genders come in lower-case English) |
| `city_tier[].share` | number | `compact` | The segment's share of the segments listed, 0 to 1 |
| `city_tier[].count` | integer | `compact` | Followers in the segment |
| `crowd` | list of object | `compact` | By the consumer groups the platform sorts people into |
| `crowd[].name` | text | `compact` | Name of the segment, in the platform's words (the two genders come in lower-case English) |
| `crowd[].share` | number | `compact` | The segment's share of the segments listed, 0 to 1 |
| `crowd[].count` | integer | `compact` | Followers in the segment |
| `purchase_category` | list of object | `compact` | By the category of goods bought |
| `purchase_category[].name` | text | `compact` | Name of the segment, in the platform's words (the two genders come in lower-case English) |
| `purchase_category[].share` | number | `compact` | The segment's share of the segments listed, 0 to 1 |
| `purchase_category[].count` | integer | `compact` | Followers in the segment |
| `purchase_amount` | list of object | `compact` | By the amount spent on an order |
| `purchase_amount[].name` | text | `compact` | Name of the segment, in the platform's words (the two genders come in lower-case English) |
| `purchase_amount[].share` | number | `compact` | The segment's share of the segments listed, 0 to 1 |
| `purchase_amount[].count` | integer | `compact` | Followers in the segment |

## Where each number comes from

The same field name does not always mean the same act on every platform. This table says which of the platform's own numbers goes into the field.

| Field | What it holds there | On |
| --- | --- | --- |
| `gender.share` | The platform gives a count for each segment only; the share is that count over the total of the segments listed (cities list the top ten only) | Douyin |
| `age.share` | The platform gives a count for each segment only; the share is that count over the total of the segments listed (cities list the top ten only) | Douyin |
| `province.share` | The platform gives a count for each segment only; the share is that count over the total of the segments listed (cities list the top ten only) | Douyin |
| `city` | Here it is every city the platform gives (over two hundred), not the largest only | Douyin |
| `city.share` | The platform gives a count for each segment only; the share is that count over the total of the segments listed (cities list the top ten only) | Douyin |
| `interest.share` | The platform gives a count for each segment only; the share is that count over the total of the segments listed (cities list the top ten only) | Douyin |
| `device.share` | The platform gives a count for each segment only; the share is that count over the total of the segments listed (cities list the top ten only) | Douyin |
| `city_tier.share` | The platform gives a count for each segment only; the share is that count over the total of the segments listed (cities list the top ten only) | Douyin |
| `crowd.share` | The platform gives a count for each segment only; the share is that count over the total of the segments listed (cities list the top ten only) | Douyin |
| `purchase_category.share` | The platform gives a count for each segment only; the share is that count over the total of the segments listed (cities list the top ten only) | Douyin |
| `purchase_amount.share` | The platform gives a count for each segment only; the share is that count over the total of the segments listed (cities list the top ten only) | Douyin |

## What a platform cannot give

A platform stands against a field when none of its endpoints gives it.

| Field | Not available on |
| --- | --- |
| `measured_at` | Douyin |
| `gender[].count` | Xiaohongshu (RedNote) |
| `age[].count` | Xiaohongshu (RedNote) |
| `province[].count` | Xiaohongshu (RedNote) |
| `city[].count` | Xiaohongshu (RedNote) |
| `interest[].count` | Xiaohongshu (RedNote) |
| `device[].count` | Xiaohongshu (RedNote) |
| `city_tier[].name` | Xiaohongshu (RedNote) |
| `city_tier[].share` | Xiaohongshu (RedNote) |
| `city_tier[].count` | Xiaohongshu (RedNote) |
| `crowd[].name` | Xiaohongshu (RedNote) |
| `crowd[].share` | Xiaohongshu (RedNote) |
| `crowd[].count` | Xiaohongshu (RedNote) |
| `purchase_category[].name` | Xiaohongshu (RedNote) |
| `purchase_category[].share` | Xiaohongshu (RedNote) |
| `purchase_category[].count` | Xiaohongshu (RedNote) |
| `purchase_amount[].name` | Xiaohongshu (RedNote) |
| `purchase_amount[].share` | Xiaohongshu (RedNote) |
| `purchase_amount[].count` | Xiaohongshu (RedNote) |

One endpoint may still leave out a field another gives: each endpoint's page lists what it cannot give, and every answer says so in `meta.unavailable`.

## Endpoints that return Audience

### Douyin

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [Douyin trend-index creator follower profile](https://dataxapi.com/apis/douyin/index/creators/audience/get.md) | `GET /v1/douyin/index/creators/audience/get` | Audience | $0.0020 / call |
| [Douyin Xingtu creator audience](https://dataxapi.com/apis/douyin/xingtu/creators/audience/get.md) | `GET /v1/douyin/xingtu/creators/audience/get` | Audience | $0.0040 / call |

### Xiaohongshu (RedNote)

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [Xiaohongshu PGY creator audience profile](https://dataxapi.com/apis/xiaohongshu/pgy/creators/audience/get.md) | `GET /v1/xiaohongshu/pgy/creators/audience/get` | Audience | $0.0400 / call |

## Example

One item from `douyin.index.creators.audience.get`, as recorded 2026-10-13 03:25 UTC. Names, text, IDs and links are examples; the figures are as recorded.

```jsonc
{
  "creator_id": "65888655493",
  "gender": [
    { "name": "male", "share": 0.8084029405057243 },
    { "name": "female", "share": 0.1915970594942758 }
  ],
  "age": [
    { "name": "31-40", "share": 0.3573003477857061 },
    { "name": "41-50", "share": 0.2595408957167182 },
    // … 3 more
  ],
  "province": [
    { "name": "广东", "share": 0.14160949971558792 },
    { "name": "江苏", "share": 0.07285886667660696 },
    // … 32 more
  ],
  "city": [
    { "name": "北京", "share": 0.03281000167057653 },
    { "name": "上海", "share": 0.027333702606498388 },
    // … 249 more
  ],
  "interest": [
    { "name": "随拍", "share": 0.04880862874319531 },
    { "name": "未分类（垂直度不足）", "share": 0.045695193136280836 },
    // … 40 more
  ],
  "device": [
    { "name": "华为", "share": 0.30586610757827787 },
    { "name": "苹果", "share": 0.22449642440387466 },
    // … 5 more
  ],
  "city_tier": [
    { "name": "三线", "share": 0.22936908477712395 },
    { "name": "新一线", "share": 0.20041213759459334 },
    // … 7 more
  ]
}
```

[The whole response is on the endpoint's page →](https://dataxapi.com/apis/douyin/index/creators/audience/get.md)

## Related

- [Creator audience API](https://dataxapi.com/roles/creators-audience-get/): The same action on 2 platforms, with a per-platform field table.
- [All endpoints](https://dataxapi.com/apis/): The directory lists what every endpoint returns, with its price.

## Other objects

[Post object](https://dataxapi.com/docs/objects/post/), [Comment object](https://dataxapi.com/docs/objects/comment/), [Account object](https://dataxapi.com/docs/objects/account/), [Trend object](https://dataxapi.com/docs/objects/trend/), [Transcript object](https://dataxapi.com/docs/objects/transcript/), [Creator rates object](https://dataxapi.com/docs/objects/creator_rates/), [Community object](https://dataxapi.com/docs/objects/community/), [Product object](https://dataxapi.com/docs/objects/product/), [Review object](https://dataxapi.com/docs/objects/review/), [Keyword index history object](https://dataxapi.com/docs/objects/keyword_history/), [Related keyword object](https://dataxapi.com/docs/objects/keyword_related/), [Keyword audience object](https://dataxapi.com/docs/objects/keyword_audience/), [Account recent change object](https://dataxapi.com/docs/objects/account_history/), [Brand index history object](https://dataxapi.com/docs/objects/brand_history/), [Brand index averages object](https://dataxapi.com/docs/objects/brand_metrics/), [Creator object](https://dataxapi.com/docs/objects/creator/), [Xingtu creator metrics object](https://dataxapi.com/docs/objects/xingtu_creator_metrics/), [Xingtu creator video object](https://dataxapi.com/docs/objects/xingtu_creator_post/), [PGY creator metrics object](https://dataxapi.com/docs/objects/pgy_creator_metrics/), [PGY creator note object](https://dataxapi.com/docs/objects/pgy_creator_post/), [Ad object](https://dataxapi.com/docs/objects/ad/), [Advertiser object](https://dataxapi.com/docs/objects/advertiser/), [Douyin trend-index creator metrics object](https://dataxapi.com/docs/objects/index_creator_metrics/), [Xingtu creator content keywords object](https://dataxapi.com/docs/objects/xingtu_creator_keywords/), [Xingtu creator scores object](https://dataxapi.com/docs/objects/xingtu_creator_scores/), [Xingtu creator content mix object](https://dataxapi.com/docs/objects/xingtu_creator_content_mix/), [Xingtu creator conversion object](https://dataxapi.com/docs/objects/xingtu_creator_conversion/), [Xingtu campaign object](https://dataxapi.com/docs/objects/xingtu_campaign/), [Channels collection object](https://dataxapi.com/docs/objects/channels_collection/), [Topic object](https://dataxapi.com/docs/objects/topic/)

---

Last checked 2026-10-18 19:59 UTC. Catalog revision c48ce454ae6c4c65. [HTML version](https://dataxapi.com/docs/objects/audience/)
