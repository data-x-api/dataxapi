# Ad object

11 endpoints on 4 platforms return the Ad object with the same 14 fields, so code written for one platform reads the others unchanged. A call costs $0.0020. It is a preview structure and may still change.

For machines: [ad schema](https://dataxapi.com/openapi.json#/components/schemas/ad), [openapi.json](https://dataxapi.com/openapi.json), [Object table (JSON)](https://api.dataxapi.com/v1/catalog/objects), [llms.txt](https://dataxapi.com/llms.txt)

An Ad is one ad as a platform's public ad library, or TikTok's Creative Center showcase, lists it: format, headline, text, images and videos, where it leads and who ran it, and in the libraries when it was first and last shown. Nothing in its standard fields says what the ad cost; impression ranges, engagement counts and targeting, where a platform gives them, are under `ext`.

`advertiser` names who ran it, with an `id` on the libraries that keep one, and an Advertiser found by name leads to its ads. What is said in a Meta Ad Library ad's video is its Transcript.

## Fields

A field the platform cannot give is left out of the item and named in `meta.unavailable`. It is never filled with a guess or a zero.

| Field | Type | From view | Description |
| --- | --- | --- | --- |
| `id` | text | `compact` | ID; pass it unchanged to the ad's get endpoint |
| `url` | link | `compact` | The ad's page in the platform's ad library |
| `format` | text | `compact` | Format of the creative; other is a format of the platform's own: `video`, `image`, `carousel`, `text`, `other` |
| `title` | text | `compact` | Headline |
| `text` | text | `compact` | Body text |
| `landing_url` | link | `standard` | Where a click on the ad leads |
| `advertiser` | object | `compact` | Advertiser |
| `advertiser.id` | text | `compact` | Advertiser ID |
| `advertiser.name` | text | `compact` | Advertiser's name |
| `advertiser.url` | link | `standard` | The advertiser's page on the platform |
| `advertiser.avatar_url` | link | `standard` | The advertiser's picture or logo |
| `images` | list of link | `standard` | Addresses of the ad's images |
| `videos` | list of link | `full` | Addresses of the ad's videos; they expire |
| `first_shown_at` | time | `compact` | When the ad was first shown |
| `last_shown_at` | time | `compact` | When the ad was last shown; for an ad still running, when the platform last saw it |

## What a platform cannot give

A platform stands against a field when none of its endpoints gives it.

| Field | Not available on |
| --- | --- |
| `advertiser.url` | Google Ads, TikTok |
| `advertiser.avatar_url` | Google Ads, TikTok |

One endpoint may still leave out a field another gives: each endpoint's page lists what it cannot give, and every answer says so in `meta.unavailable`.

## Endpoints that return Ad

### Google Ads

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [Google ad detail](https://dataxapi.com/apis/google/ads/get.md) | `GET /v1/google/ads/get` | Ad | $0.0020 / call |
| [Google advertiser's ads](https://dataxapi.com/apis/google/advertisers/ads/list.md) | `GET /v1/google/advertisers/ads/list` | Ad list | $0.0020 / call |

### LinkedIn

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [LinkedIn ad detail](https://dataxapi.com/apis/linkedin/ads/get.md) | `GET /v1/linkedin/ads/get` | Ad | $0.0020 / call |
| [LinkedIn Ad Library search](https://dataxapi.com/apis/linkedin/ads/search.md) | `GET /v1/linkedin/ads/search` | Ad list | $0.0020 / call |

### Meta Ad Library

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [Meta ad detail](https://dataxapi.com/apis/meta/ads/get.md) | `GET /v1/meta/ads/get` | Ad | $0.0020 / call |
| [Meta Ad Library search](https://dataxapi.com/apis/meta/ads/search.md) | `GET /v1/meta/ads/search` | Ad list | $0.0020 / call |
| [Meta advertiser's ads](https://dataxapi.com/apis/meta/advertisers/ads/list.md) | `GET /v1/meta/advertisers/ads/list` | Ad list | $0.0020 / call |

### TikTok

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [TikTok Ads Library search](https://dataxapi.com/apis/tiktok/ads/search.md) | `GET /v1/tiktok/ads/search` | Ad list | $0.0020 / call |
| [TikTok Ads Library ad detail](https://dataxapi.com/apis/tiktok/ads/get.md) | `GET /v1/tiktok/ads/get` | Ad | $0.0020 / call |
| [TikTok Creative Center Top Ad detail](https://dataxapi.com/apis/tiktok/creative_center/ads/get.md) | `GET /v1/tiktok/creative_center/ads/get` | Ad | $0.0020 / call |
| [TikTok Creative Center Top Ads search](https://dataxapi.com/apis/tiktok/creative_center/ads/search.md) | `GET /v1/tiktok/creative_center/ads/search` | Ad list | $0.0020 / call |

## Example

One item from `google.ads.get`, as recorded 2026-10-12 21:59 UTC. Names, text, IDs and links are examples; the figures are as recorded.

```jsonc
{
  "id": "AR16957588921303948228/CR14623979096670259597",
  "url": "https://adstransparency.google.com/advertiser/AR16957588921303948228/creative/CR14623979096670259597",
  "format": "text",
  "title": "Weekend hiking essentials, 20% off this week only",
  "text": "Weekend hiking essentials, 20% off this week only",
  "landing_url": null,
  "advertiser": { "id": "AR12673385717193703136" },
  "images": [
    "https://tpc.googlesyndication.com/simgad/10334992425704947224",
    "https://tpc.googlesyndication.com/simgad/13598759742669398477",
    // … 1 more
  ],
  "first_shown_at": "2024-05-06T00:00:00.000Z",
  "last_shown_at": "2026-10-12T21:34:42.000Z"
}
```

[The whole response is on the endpoint's page →](https://dataxapi.com/apis/google/ads/get.md)

## Related

- [Ad detail API](https://dataxapi.com/roles/ads-get/): The same action on 4 platforms, with a per-platform field table.
- [Ad library search API](https://dataxapi.com/roles/ads-search/): The same action on 3 platforms, with a per-platform field table.
- [Advertiser ads API](https://dataxapi.com/roles/advertisers-ads-list/): The same action on 2 platforms, with a per-platform field table.
- [All endpoints](https://dataxapi.com/apis/): The directory lists what every endpoint returns, with its price.

## Other objects

[Post object](https://dataxapi.com/docs/objects/post/), [Comment object](https://dataxapi.com/docs/objects/comment/), [Account object](https://dataxapi.com/docs/objects/account/), [Trend object](https://dataxapi.com/docs/objects/trend/), [Transcript object](https://dataxapi.com/docs/objects/transcript/), [Creator rates object](https://dataxapi.com/docs/objects/creator_rates/), [Community object](https://dataxapi.com/docs/objects/community/), [Product object](https://dataxapi.com/docs/objects/product/), [Review object](https://dataxapi.com/docs/objects/review/), [Keyword index history object](https://dataxapi.com/docs/objects/keyword_history/), [Related keyword object](https://dataxapi.com/docs/objects/keyword_related/), [Keyword audience object](https://dataxapi.com/docs/objects/keyword_audience/), [Account recent change object](https://dataxapi.com/docs/objects/account_history/), [Brand index history object](https://dataxapi.com/docs/objects/brand_history/), [Brand index averages object](https://dataxapi.com/docs/objects/brand_metrics/), [Creator object](https://dataxapi.com/docs/objects/creator/), [Audience object](https://dataxapi.com/docs/objects/audience/), [Xingtu creator metrics object](https://dataxapi.com/docs/objects/xingtu_creator_metrics/), [Xingtu creator video object](https://dataxapi.com/docs/objects/xingtu_creator_post/), [PGY creator metrics object](https://dataxapi.com/docs/objects/pgy_creator_metrics/), [PGY creator note object](https://dataxapi.com/docs/objects/pgy_creator_post/), [Advertiser object](https://dataxapi.com/docs/objects/advertiser/), [Douyin trend-index creator metrics object](https://dataxapi.com/docs/objects/index_creator_metrics/), [Xingtu creator content keywords object](https://dataxapi.com/docs/objects/xingtu_creator_keywords/), [Xingtu creator scores object](https://dataxapi.com/docs/objects/xingtu_creator_scores/), [Xingtu creator content mix object](https://dataxapi.com/docs/objects/xingtu_creator_content_mix/), [Xingtu creator conversion object](https://dataxapi.com/docs/objects/xingtu_creator_conversion/), [Xingtu campaign object](https://dataxapi.com/docs/objects/xingtu_campaign/), [Channels collection object](https://dataxapi.com/docs/objects/channels_collection/), [Topic object](https://dataxapi.com/docs/objects/topic/)

---

Last checked 2026-10-18 19:59 UTC. Catalog revision c48ce454ae6c4c65. [HTML version](https://dataxapi.com/docs/objects/ad/)
