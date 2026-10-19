# Xingtu campaign object

The Xingtu campaign object has 10 fields and is returned by 1 endpoint on Douyin. A call costs $0.0040. It is a preview structure and may still change.

For machines: [xingtu_campaign schema](https://dataxapi.com/openapi.json#/components/schemas/xingtu_campaign), [openapi.json](https://dataxapi.com/openapi.json), [Object table (JSON)](https://api.dataxapi.com/v1/catalog/objects), [llms.txt](https://dataxapi.com/llms.txt)

A Xingtu campaign is one entry on the marketing calendar of Xingtu (星图): a platform event, an e-commerce or seasonal moment, a creative or industry campaign that brands and creators can join. It has its `stage` and the dates its sign-up opens and closes and the campaign runs.

It stands alone: no creator or account points to it. The calendar is read over a span of time with `since` and `until`, all at once with no paging.

## Fields

A field the platform cannot give is left out of the item and named in `meta.unavailable`. It is never filled with a guess or a zero.

| Field | Type | From view | Description |
| --- | --- | --- | --- |
| `id` | text | `compact` | Campaign ID |
| `name` | text | `compact` | Name of the campaign |
| `description` | text | `compact` | What the campaign is |
| `category` | text | `compact` | Kind of campaign: a platform event, an e-commerce moment, a seasonal or mood moment, creative marketing, an industry campaign: `platform_event`, `ecommerce`, `seasonal`, `creative`, `industry` |
| `stage` | text | `compact` | How far along the campaign is: being prepared, open for sign-up, live, ended: `preparing`, `open`, `live`, `ended` |
| `signup_starts_at` | time | `compact` | When sign-up opens |
| `signup_ends_at` | time | `compact` | When sign-up closes |
| `starts_at` | time | `compact` | When the campaign starts |
| `ends_at` | time | `compact` | When the campaign ends |
| `image_url` | link | `standard` | The campaign's main image |

## Endpoints that return Xingtu campaign

### Douyin

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [Douyin Xingtu marketing calendar](https://dataxapi.com/apis/douyin/xingtu/campaigns/list.md) | `GET /v1/douyin/xingtu/campaigns/list` | Xingtu campaign list | $0.0040 / call |

## Example

One item from `douyin.xingtu.campaigns.list`, as recorded 2026-10-13 03:26 UTC. Names, text, IDs and links are examples; the figures are as recorded.

```jsonc
{
  "id": "7632957782936535670",
  "name": "周末露营季节限定合作",
  "description": "周末的周末露营日常，随手记录一下",
  "category": "ecommerce",
  "stage": "open",
  "signup_starts_at": "2026-09-29T02:29:20.000Z",
  "signup_ends_at": "2026-10-31T02:29:20.000Z",
  "starts_at": "2026-10-10T02:29:04.000Z",
  "ends_at": "2026-11-20T02:29:04.000Z",
  "image_url": "https://p3-pc-sign.douyinpic.com/tos-cn-i-0813/a5ac1ffb2df94f6c3a16~tplv-dy-resize.jpeg"
}
```

[The whole response is on the endpoint's page →](https://dataxapi.com/apis/douyin/xingtu/campaigns/list.md)

## Related

- [All endpoints](https://dataxapi.com/apis/): The directory lists what every endpoint returns, with its price.

## Other objects

[Post object](https://dataxapi.com/docs/objects/post/), [Comment object](https://dataxapi.com/docs/objects/comment/), [Account object](https://dataxapi.com/docs/objects/account/), [Trend object](https://dataxapi.com/docs/objects/trend/), [Transcript object](https://dataxapi.com/docs/objects/transcript/), [Creator rates object](https://dataxapi.com/docs/objects/creator_rates/), [Community object](https://dataxapi.com/docs/objects/community/), [Product object](https://dataxapi.com/docs/objects/product/), [Review object](https://dataxapi.com/docs/objects/review/), [Keyword index history object](https://dataxapi.com/docs/objects/keyword_history/), [Related keyword object](https://dataxapi.com/docs/objects/keyword_related/), [Keyword audience object](https://dataxapi.com/docs/objects/keyword_audience/), [Account recent change object](https://dataxapi.com/docs/objects/account_history/), [Brand index history object](https://dataxapi.com/docs/objects/brand_history/), [Brand index averages object](https://dataxapi.com/docs/objects/brand_metrics/), [Creator object](https://dataxapi.com/docs/objects/creator/), [Audience object](https://dataxapi.com/docs/objects/audience/), [Xingtu creator metrics object](https://dataxapi.com/docs/objects/xingtu_creator_metrics/), [Xingtu creator video object](https://dataxapi.com/docs/objects/xingtu_creator_post/), [PGY creator metrics object](https://dataxapi.com/docs/objects/pgy_creator_metrics/), [PGY creator note object](https://dataxapi.com/docs/objects/pgy_creator_post/), [Ad object](https://dataxapi.com/docs/objects/ad/), [Advertiser object](https://dataxapi.com/docs/objects/advertiser/), [Douyin trend-index creator metrics object](https://dataxapi.com/docs/objects/index_creator_metrics/), [Xingtu creator content keywords object](https://dataxapi.com/docs/objects/xingtu_creator_keywords/), [Xingtu creator scores object](https://dataxapi.com/docs/objects/xingtu_creator_scores/), [Xingtu creator content mix object](https://dataxapi.com/docs/objects/xingtu_creator_content_mix/), [Xingtu creator conversion object](https://dataxapi.com/docs/objects/xingtu_creator_conversion/), [Channels collection object](https://dataxapi.com/docs/objects/channels_collection/), [Topic object](https://dataxapi.com/docs/objects/topic/)

---

Last checked 2026-10-18 19:59 UTC. Catalog revision c48ce454ae6c4c65. [HTML version](https://dataxapi.com/docs/objects/xingtu_campaign/)
