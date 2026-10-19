# Creator rates object

The Creator rates object has 6 fields and is returned by 1 endpoint on Douyin. A call costs $0.0400. It is a preview structure and may still change.

For machines: [creator_rates schema](https://dataxapi.com/openapi.json#/components/schemas/creator_rates), [openapi.json](https://dataxapi.com/openapi.json), [Object table (JSON)](https://api.dataxapi.com/v1/catalog/objects), [llms.txt](https://dataxapi.com/llms.txt)

Creator rates is what a creator charges for each kind of sponsored work, as the platform's own creator marketplace lists it: today Douyin's Xingtu (星图). Each entry of `rates` gives the kind of work and how it is settled in the platform's words, the `amount` (`null` where the kind has no fixed rate) and whether the creator takes that work now, in `open`.

`creator_id` is the Xingtu creator ID that the creator search returns, the one every other Xingtu creator endpoint takes, and `currency` says what the amounts are in. Xiaohongshu's PGY (蒲公英) rates are not this object: they sit on the Creator itself, in `ext.rate_image_note` and `ext.rate_video_note`.

## Fields

A field the platform cannot give is left out of the item and named in `meta.unavailable`. It is never filled with a guess or a zero.

| Field | Type | From view | Description |
| --- | --- | --- | --- |
| `creator_id` | text | `compact` | Creator ID |
| `currency` | text | `compact` | Currency of the rates |
| `rates` | list of object | `compact` | Rate for each kind of sponsored work |
| `rates[].name` | text | `compact` | Kind of work, in the platform's words |
| `rates[].amount` | amount | `compact` | The rate; null when this kind has no fixed rate |
| `rates[].settlement` | text | `compact` | How it is settled, in the platform's words |
| `rates[].open` | yes/no | `compact` | Whether the creator takes this kind of work now |

## Endpoints that return Creator rates

### Douyin

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [Douyin Xingtu creator rate card](https://dataxapi.com/apis/douyin/xingtu/creators/rates/get.md) | `GET /v1/douyin/xingtu/creators/rates/get` | Creator rates | $0.0400 / call |

## Example

One item from `douyin.xingtu.creators.rates.get`, as recorded 2026-10-10 14:02 UTC. Names, text, IDs and links are examples; the figures are as recorded.

```jsonc
{
  "creator_id": "6187694769211204659",
  "currency": "CNY",
  "rates": [
    {
      "name": "植入视频",
      "amount": "400000",
      "settlement": "固定价格",
      "open": true
    },
    {
      "name": "定制视频",
      "amount": "500000",
      "settlement": "固定价格",
      "open": true
    },
    // … 4 more
  ]
}
```

[The whole response is on the endpoint's page →](https://dataxapi.com/apis/douyin/xingtu/creators/rates/get.md)

## Related

- [All endpoints](https://dataxapi.com/apis/): The directory lists what every endpoint returns, with its price.

## Other objects

[Post object](https://dataxapi.com/docs/objects/post/), [Comment object](https://dataxapi.com/docs/objects/comment/), [Account object](https://dataxapi.com/docs/objects/account/), [Trend object](https://dataxapi.com/docs/objects/trend/), [Transcript object](https://dataxapi.com/docs/objects/transcript/), [Community object](https://dataxapi.com/docs/objects/community/), [Product object](https://dataxapi.com/docs/objects/product/), [Review object](https://dataxapi.com/docs/objects/review/), [Keyword index history object](https://dataxapi.com/docs/objects/keyword_history/), [Related keyword object](https://dataxapi.com/docs/objects/keyword_related/), [Keyword audience object](https://dataxapi.com/docs/objects/keyword_audience/), [Account recent change object](https://dataxapi.com/docs/objects/account_history/), [Brand index history object](https://dataxapi.com/docs/objects/brand_history/), [Brand index averages object](https://dataxapi.com/docs/objects/brand_metrics/), [Creator object](https://dataxapi.com/docs/objects/creator/), [Audience object](https://dataxapi.com/docs/objects/audience/), [Xingtu creator metrics object](https://dataxapi.com/docs/objects/xingtu_creator_metrics/), [Xingtu creator video object](https://dataxapi.com/docs/objects/xingtu_creator_post/), [PGY creator metrics object](https://dataxapi.com/docs/objects/pgy_creator_metrics/), [PGY creator note object](https://dataxapi.com/docs/objects/pgy_creator_post/), [Ad object](https://dataxapi.com/docs/objects/ad/), [Advertiser object](https://dataxapi.com/docs/objects/advertiser/), [Douyin trend-index creator metrics object](https://dataxapi.com/docs/objects/index_creator_metrics/), [Xingtu creator content keywords object](https://dataxapi.com/docs/objects/xingtu_creator_keywords/), [Xingtu creator scores object](https://dataxapi.com/docs/objects/xingtu_creator_scores/), [Xingtu creator content mix object](https://dataxapi.com/docs/objects/xingtu_creator_content_mix/), [Xingtu creator conversion object](https://dataxapi.com/docs/objects/xingtu_creator_conversion/), [Xingtu campaign object](https://dataxapi.com/docs/objects/xingtu_campaign/), [Channels collection object](https://dataxapi.com/docs/objects/channels_collection/), [Topic object](https://dataxapi.com/docs/objects/topic/)

---

Last checked 2026-10-18 19:59 UTC. Catalog revision c48ce454ae6c4c65. [HTML version](https://dataxapi.com/docs/objects/creator_rates/)
