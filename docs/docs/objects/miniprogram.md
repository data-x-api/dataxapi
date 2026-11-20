# Mini program object

The Mini program object has 9 fields and is returned by 1 endpoint on WeChat Search. A call costs $0.1. It is a preview structure and may still change.

For machines: [miniprogram schema](https://dataxapi.com/openapi.json#/components/schemas/miniprogram), [openapi.json](https://dataxapi.com/openapi.json), [Object table (JSON)](https://api.dataxapi.com/v1/catalog/objects), [llms.txt](https://dataxapi.com/llms.txt)

## Fields

A field the platform cannot give is left out of the item and named in `meta.unavailable`. It is never filled with a guess or a zero.

| Field | Type | From view | Description |
| --- | --- | --- | --- |
| `id` | text | `compact` | Original ID (starting with gh_) |
| `app_id` | text | `compact` | AppID (starting with wx), used to open or link to the mini program; null where the platform gives none |
| `name` | text | `compact` | Name |
| `description` | text | `compact` | Description |
| `icon_url` | link | `standard` | Icon |
| `owner_name` | text | `compact` | The owner's name: the company or body that runs it |
| `owner_verified` | yes/no | `standard` | Whether the owner is verified |
| `recent_users` | integer | `standard` | How many people used it lately, as the platform shows it; one shown like 1万+ is a lower bound; null where it shows none |
| `is_game` | yes/no | `standard` | Whether it is a mini game |

## Endpoints that return Mini program

### WeChat Search

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [WeChat mini program search](https://dataxapi.com/apis/wechat/miniprograms/search.md) | `GET /v1/wechat/miniprograms/search` | Mini program list | $0.1 / call |

## Example

One item from `wechat.miniprograms.search`, as recorded 2026-10-29 09:50 UTC. Names, text, IDs and links are examples; the figures are as recorded.

```jsonc
{
  "id": "1922257064798686",
  "app_id": "1250200079450793",
  "name": "山野咖啡馆",
  "description": "把外卖从头到尾讲清楚，看完少走弯路",
  "icon_url": "https://www.dataxapi.com/examples/1922257064798686",
  "owner_name": "周末的外卖日常，随手记录一下",
  "owner_verified": true,
  "recent_users": null,
  "is_game": false
}
```

[The whole response is on the endpoint's page →](https://dataxapi.com/apis/wechat/miniprograms/search.md)

## Related

- [All endpoints](https://dataxapi.com/apis/): The directory lists what every endpoint returns, with its price.

## Other objects

[Post object](https://dataxapi.com/docs/objects/post/), [Comment object](https://dataxapi.com/docs/objects/comment/), [Account object](https://dataxapi.com/docs/objects/account/), [Trend object](https://dataxapi.com/docs/objects/trend/), [Transcript object](https://dataxapi.com/docs/objects/transcript/), [Creator rates object](https://dataxapi.com/docs/objects/creator_rates/), [Community object](https://dataxapi.com/docs/objects/community/), [Product object](https://dataxapi.com/docs/objects/product/), [Review object](https://dataxapi.com/docs/objects/review/), [Keyword index history object](https://dataxapi.com/docs/objects/keyword_history/), [Related keyword object](https://dataxapi.com/docs/objects/keyword_related/), [Keyword audience object](https://dataxapi.com/docs/objects/keyword_audience/), [Account recent change object](https://dataxapi.com/docs/objects/account_history/), [Brand index history object](https://dataxapi.com/docs/objects/brand_history/), [Brand index averages object](https://dataxapi.com/docs/objects/brand_metrics/), [Creator object](https://dataxapi.com/docs/objects/creator/), [Audience object](https://dataxapi.com/docs/objects/audience/), [Xingtu creator metrics object](https://dataxapi.com/docs/objects/xingtu_creator_metrics/), [Xingtu creator video object](https://dataxapi.com/docs/objects/xingtu_creator_post/), [PGY creator metrics object](https://dataxapi.com/docs/objects/pgy_creator_metrics/), [PGY creator note object](https://dataxapi.com/docs/objects/pgy_creator_post/), [PGY note detail object](https://dataxapi.com/docs/objects/pgy_note/), [Ad object](https://dataxapi.com/docs/objects/ad/), [Advertiser object](https://dataxapi.com/docs/objects/advertiser/), [Douyin trend-index creator metrics object](https://dataxapi.com/docs/objects/index_creator_metrics/), [Xingtu creator content keywords object](https://dataxapi.com/docs/objects/xingtu_creator_keywords/), [Xingtu creator scores object](https://dataxapi.com/docs/objects/xingtu_creator_scores/), [Xingtu creator content mix object](https://dataxapi.com/docs/objects/xingtu_creator_content_mix/), [Xingtu creator conversion object](https://dataxapi.com/docs/objects/xingtu_creator_conversion/), [Xingtu campaign object](https://dataxapi.com/docs/objects/xingtu_campaign/), [Channels collection object](https://dataxapi.com/docs/objects/channels_collection/), [Channels share link object](https://dataxapi.com/docs/objects/channels_share_link/), [Topic object](https://dataxapi.com/docs/objects/topic/), [Account owner object](https://dataxapi.com/docs/objects/account_owner/), [Follower history object](https://dataxapi.com/docs/objects/follower_history/), [PGY creator costs and summary object](https://dataxapi.com/docs/objects/pgy_creator_costs/), [PGY creator follower summary object](https://dataxapi.com/docs/objects/pgy_creator_followers/), [PGY creator core figures history object](https://dataxapi.com/docs/objects/pgy_creator_cost_history/)

---

Last checked 2026-11-20 07:17 UTC. Catalog revision 720fc3ea8dadb865. [HTML version](https://dataxapi.com/docs/objects/miniprogram/)
