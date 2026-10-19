# Keyword audience object

The Keyword audience object has 19 fields and is returned by 1 endpoint on Douyin. A call costs $0.0020. It is a preview structure and may still change.

For machines: [keyword_audience schema](https://dataxapi.com/openapi.json#/components/schemas/keyword_audience), [openapi.json](https://dataxapi.com/openapi.json), [Object table (JSON)](https://api.dataxapi.com/v1/catalog/objects), [llms.txt](https://dataxapi.com/llms.txt)

Keyword audience is who searches a keyword and watches content about it, by age, gender, province, city, city tier and interest. Each group has its `share` and a `tgi`: 100 is the platform's average, above 100 leans more to the word.

`keyword` identifies it; it comes from Douyin's trend-index (巨量算数) over the dates asked for, beside the same keyword's index history. A creator's followers are another object, Audience.

## Fields

A field the platform cannot give is left out of the item and named in `meta.unavailable`. It is never filled with a guess or a zero.

| Field | Type | From view | Description |
| --- | --- | --- | --- |
| `keyword` | text | `compact` | The keyword |
| `age` | list of object | `compact` | By age group |
| `age[].label` | text | `compact` | Name of the group, in the platform's words |
| `age[].share` | number | `compact` | Share of the audience in this group, 0 to 1 |
| `age[].tgi` | number | `compact` | TGI: how much this group leans to the keyword; 100 is the platform's average, above 100 leans more |
| `gender` | list of object | `compact` | By gender |
| `gender[].label` | text | `compact` | Name of the group, in the platform's words |
| `gender[].share` | number | `compact` | Share of the audience in this group, 0 to 1 |
| `gender[].tgi` | number | `compact` | TGI: how much this group leans to the keyword; 100 is the platform's average, above 100 leans more |
| `province` | list of object | `compact` | By province |
| `province[].label` | text | `compact` | Name of the group, in the platform's words |
| `province[].share` | number | `compact` | Share of the audience in this group, 0 to 1 |
| `province[].tgi` | number | `compact` | TGI: how much this group leans to the keyword; 100 is the platform's average, above 100 leans more |
| `city` | list of object | `compact` | By city: the cities with the largest shares, as the platform lists them; they do not add up to 1 |
| `city[].label` | text | `compact` | Name of the group, in the platform's words |
| `city[].share` | number | `compact` | Share of the audience in this group, 0 to 1 |
| `city[].tgi` | number | `compact` | TGI: how much this group leans to the keyword; 100 is the platform's average, above 100 leans more |
| `city_tier` | list of object | `compact` | By city tier |
| `city_tier[].label` | text | `compact` | Name of the group, in the platform's words |
| `city_tier[].share` | number | `compact` | Share of the audience in this group, 0 to 1 |
| `city_tier[].tgi` | number | `compact` | TGI: how much this group leans to the keyword; 100 is the platform's average, above 100 leans more |
| `interest` | list of object | `compact` | By interest; the shares do not add up to 1 |
| `interest[].label` | text | `compact` | Name of the group, in the platform's words |
| `interest[].share` | number | `compact` | Share of the audience in this group, 0 to 1 |
| `interest[].tgi` | number | `compact` | TGI: how much this group leans to the keyword; 100 is the platform's average, above 100 leans more |

## Endpoints that return Keyword audience

### Douyin

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [Douyin trend-index keyword audience](https://dataxapi.com/apis/douyin/index/keywords/audience/get.md) | `GET /v1/douyin/index/keywords/audience/get` | Keyword audience | $0.0020 / call |

## Example

One item from `douyin.index.keywords.audience.get`, as recorded 2026-10-12 21:50 UTC. Names, text, IDs and links are examples; the figures are as recorded.

```jsonc
{
  "keyword": "咖啡",
  "age": [
    { "label": "18-23", "share": 0.1968, "tgi": 174.17389307762207 },
    { "label": "24-30", "share": 0.2233, "tgi": 173.71695132383041 },
    // … 3 more
  ],
  "gender": [
    { "label": "男", "share": 0.47, "tgi": 98.27023904973254 },
    { "label": "女", "share": 0.53, "tgi": 101.58569115669054 }
  ],
  "province": [
    { "label": "北京", "share": 0.0221, "tgi": 120.01085780496312 },
    { "label": "天津", "share": 0.0121, "tgi": 105.42964416985868 },
    // … 32 more
  ],
  "city": [
    { "label": "上海", "share": 0.0245, "tgi": 125.4042968127423 },
    { "label": "广州", "share": 0.0237, "tgi": 117.79286978677968 },
    // … 28 more
  ],
  "city_tier": [
    {
      "label": "一线城市",
      "share": 0.08856723771604946,
      "tgi": 114.35574144488798
    },
    {
      "label": "新一线城市",
      "share": 0.19688659709388875,
      "tgi": 103.66957853814951
    },
    // … 5 more
  ],
  "interest": [
    {
      "label": "时尚",
      "share": 0.15486799847286528,
      "tgi": 111.80033780828992
    },
    {
      "label": "美食",
      "share": 0.10207902382205732,
      "tgi": 113.58111661037135
    },
    // … 23 more
  ]
}
```

[The whole response is on the endpoint's page →](https://dataxapi.com/apis/douyin/index/keywords/audience/get.md)

## Related

- [All endpoints](https://dataxapi.com/apis/): The directory lists what every endpoint returns, with its price.

## Other objects

[Post object](https://dataxapi.com/docs/objects/post/), [Comment object](https://dataxapi.com/docs/objects/comment/), [Account object](https://dataxapi.com/docs/objects/account/), [Trend object](https://dataxapi.com/docs/objects/trend/), [Transcript object](https://dataxapi.com/docs/objects/transcript/), [Creator rates object](https://dataxapi.com/docs/objects/creator_rates/), [Community object](https://dataxapi.com/docs/objects/community/), [Product object](https://dataxapi.com/docs/objects/product/), [Review object](https://dataxapi.com/docs/objects/review/), [Keyword index history object](https://dataxapi.com/docs/objects/keyword_history/), [Related keyword object](https://dataxapi.com/docs/objects/keyword_related/), [Account recent change object](https://dataxapi.com/docs/objects/account_history/), [Brand index history object](https://dataxapi.com/docs/objects/brand_history/), [Brand index averages object](https://dataxapi.com/docs/objects/brand_metrics/), [Creator object](https://dataxapi.com/docs/objects/creator/), [Audience object](https://dataxapi.com/docs/objects/audience/), [Xingtu creator metrics object](https://dataxapi.com/docs/objects/xingtu_creator_metrics/), [Xingtu creator video object](https://dataxapi.com/docs/objects/xingtu_creator_post/), [PGY creator metrics object](https://dataxapi.com/docs/objects/pgy_creator_metrics/), [PGY creator note object](https://dataxapi.com/docs/objects/pgy_creator_post/), [Ad object](https://dataxapi.com/docs/objects/ad/), [Advertiser object](https://dataxapi.com/docs/objects/advertiser/), [Douyin trend-index creator metrics object](https://dataxapi.com/docs/objects/index_creator_metrics/), [Xingtu creator content keywords object](https://dataxapi.com/docs/objects/xingtu_creator_keywords/), [Xingtu creator scores object](https://dataxapi.com/docs/objects/xingtu_creator_scores/), [Xingtu creator content mix object](https://dataxapi.com/docs/objects/xingtu_creator_content_mix/), [Xingtu creator conversion object](https://dataxapi.com/docs/objects/xingtu_creator_conversion/), [Xingtu campaign object](https://dataxapi.com/docs/objects/xingtu_campaign/), [Channels collection object](https://dataxapi.com/docs/objects/channels_collection/), [Topic object](https://dataxapi.com/docs/objects/topic/)

---

Last checked 2026-10-18 19:59 UTC. Catalog revision c48ce454ae6c4c65. [HTML version](https://dataxapi.com/docs/objects/keyword_audience/)
