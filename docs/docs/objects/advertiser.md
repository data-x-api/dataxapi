# Advertiser object

2 endpoints on 2 platforms return the Advertiser object with the same 4 fields, so code written for one platform reads the others unchanged. A call costs $0.0020. It is a preview structure and may still change.

For machines: [advertiser schema](https://dataxapi.com/openapi.json#/components/schemas/advertiser), [openapi.json](https://dataxapi.com/openapi.json), [Object table (JSON)](https://api.dataxapi.com/v1/catalog/objects), [llms.txt](https://dataxapi.com/llms.txt)

An Advertiser is who runs ads, as a platform's ad library knows them: a Facebook page in the Meta Ad Library, an advertiser in the Google Ads Transparency Center. It has an `id` and a `name`, with a picture on Meta and the `region` it is registered in on Google.

Its `id` goes unchanged to the advertiser's ads endpoint, which returns Ad items whose `advertiser.id` points back. It is not an Account: on Meta, the Facebook page's handle and the linked Instagram account are named under `ext`.

## Fields

A field the platform cannot give is left out of the item and named in `meta.unavailable`. It is never filled with a guess or a zero.

| Field | Type | From view | Description |
| --- | --- | --- | --- |
| `id` | text | `compact` | ID; pass it unchanged to the advertiser's ads endpoint |
| `name` | text | `compact` | Name |
| `avatar_url` | link | `standard` | Picture or logo |
| `region` | text | `compact` | Code of the country or region the advertiser is registered in |

## What a platform cannot give

A platform stands against a field when none of its endpoints gives it.

| Field | Not available on |
| --- | --- |
| `avatar_url` | Google Ads |
| `region` | Meta Ad Library |

One endpoint may still leave out a field another gives: each endpoint's page lists what it cannot give, and every answer says so in `meta.unavailable`.

## Endpoints that return Advertiser

### Google Ads

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [Google advertiser search](https://dataxapi.com/apis/google/advertisers/search.md) | `GET /v1/google/advertisers/search` | Advertiser list | $0.0020 / call |

### Meta Ad Library

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [Meta advertiser search](https://dataxapi.com/apis/meta/advertisers/search.md) | `GET /v1/meta/advertisers/search` | Advertiser list | $0.0020 / call |

## Example

One item from `google.advertisers.search`, as recorded 2026-10-12 21:58 UTC. Names, text, IDs and links are examples; the figures are as recorded.

```jsonc
{
  "id": "AR13721943418898185271",
  "name": "Brightline Studio",
  "region": "US"
}
```

[The whole response is on the endpoint's page →](https://dataxapi.com/apis/google/advertisers/search.md)

## Related

- [Advertiser search API](https://dataxapi.com/roles/advertisers-search/): The same action on 2 platforms, with a per-platform field table.
- [All endpoints](https://dataxapi.com/apis/): The directory lists what every endpoint returns, with its price.

## Other objects

[Post object](https://dataxapi.com/docs/objects/post/), [Comment object](https://dataxapi.com/docs/objects/comment/), [Account object](https://dataxapi.com/docs/objects/account/), [Trend object](https://dataxapi.com/docs/objects/trend/), [Transcript object](https://dataxapi.com/docs/objects/transcript/), [Creator rates object](https://dataxapi.com/docs/objects/creator_rates/), [Community object](https://dataxapi.com/docs/objects/community/), [Product object](https://dataxapi.com/docs/objects/product/), [Review object](https://dataxapi.com/docs/objects/review/), [Keyword index history object](https://dataxapi.com/docs/objects/keyword_history/), [Related keyword object](https://dataxapi.com/docs/objects/keyword_related/), [Keyword audience object](https://dataxapi.com/docs/objects/keyword_audience/), [Account recent change object](https://dataxapi.com/docs/objects/account_history/), [Brand index history object](https://dataxapi.com/docs/objects/brand_history/), [Brand index averages object](https://dataxapi.com/docs/objects/brand_metrics/), [Creator object](https://dataxapi.com/docs/objects/creator/), [Audience object](https://dataxapi.com/docs/objects/audience/), [Xingtu creator metrics object](https://dataxapi.com/docs/objects/xingtu_creator_metrics/), [Xingtu creator video object](https://dataxapi.com/docs/objects/xingtu_creator_post/), [PGY creator metrics object](https://dataxapi.com/docs/objects/pgy_creator_metrics/), [PGY creator note object](https://dataxapi.com/docs/objects/pgy_creator_post/), [Ad object](https://dataxapi.com/docs/objects/ad/), [Douyin trend-index creator metrics object](https://dataxapi.com/docs/objects/index_creator_metrics/), [Xingtu creator content keywords object](https://dataxapi.com/docs/objects/xingtu_creator_keywords/), [Xingtu creator scores object](https://dataxapi.com/docs/objects/xingtu_creator_scores/), [Xingtu creator content mix object](https://dataxapi.com/docs/objects/xingtu_creator_content_mix/), [Xingtu creator conversion object](https://dataxapi.com/docs/objects/xingtu_creator_conversion/), [Xingtu campaign object](https://dataxapi.com/docs/objects/xingtu_campaign/), [Channels collection object](https://dataxapi.com/docs/objects/channels_collection/), [Topic object](https://dataxapi.com/docs/objects/topic/)

---

Last checked 2026-10-18 19:59 UTC. Catalog revision c48ce454ae6c4c65. [HTML version](https://dataxapi.com/docs/objects/advertiser/)
