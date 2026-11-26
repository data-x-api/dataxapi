# Channels collection object

The Channels collection object has 6 fields and is returned by 1 endpoint on WeChat Channels. A call costs $0.0200. It is a preview structure and may still change.

For machines: [channels_collection schema](https://dataxapi.com/openapi.json#/components/schemas/channels_collection), [openapi.json](https://dataxapi.com/openapi.json), [Object table (JSON)](https://api.dataxapi.com/v1/catalog/objects), [llms.txt](https://dataxapi.com/llms.txt)

A Channels collection is a group of videos a WeChat Channels (视频号) account has put under one name, with its description, cover, number of videos and when it was last updated. Only WeChat Channels has it.

An account's ID, the one that starts with `v2_` and ends in `@finder` (a video's `author.id`), lists all its public collections. A collection's `id` lists its videos, which come back as Post in the collection's own order.

## Fields

A field the platform cannot give is left out of the item and named in `meta.unavailable`. It is never filled with a guess or a zero.

| Field | Type | From view | Description |
| --- | --- | --- | --- |
| `id` | text | `compact` | The collection's ID; pass it unchanged to the endpoint that lists its videos |
| `name` | text | `compact` | Name of the collection |
| `description` | text | `compact` | What the collection says it is about; null when it says nothing |
| `cover_url` | link | `standard` | Address of the collection's cover image |
| `updated_at` | time | `compact` | When the collection was last updated |
| `metrics` | object | `compact` | Collection counts |
| `metrics.videos` | integer | `compact` | Videos in the collection |

## Endpoints that return Channels collection

### WeChat Channels

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [WeChat Channels account collections](https://dataxapi.com/apis/wechat_channels/users/collections/list.md) | `GET /v1/wechat_channels/users/collections/list` | Channels collection list | $0.0200 / call |

## Example

One item from `wechat_channels.users.collections.list`, as recorded 2026-10-13 03:26 UTC. Names, text, IDs and links are examples; the figures are as recorded.

```jsonc
{
  "id": "14333950278518174787",
  "name": "周末厨房",
  "description": null,
  "cover_url": "https://mmbiz.qpic.cn/mmbiz_jpg/7mFJa9ICgY3VTnOrojq32DWvk8rh3NMhae2Gogia/640",
  "updated_at": "2026-10-12T03:59:02.000Z",
  "metrics": { "videos": 42 }
}
```

[The whole response is on the endpoint's page →](https://dataxapi.com/apis/wechat_channels/users/collections/list.md)

## Related

- [All endpoints](https://dataxapi.com/apis/): The directory lists what every endpoint returns, with its price.

## Other objects

[Post object](https://dataxapi.com/docs/objects/post/), [Comment object](https://dataxapi.com/docs/objects/comment/), [Account object](https://dataxapi.com/docs/objects/account/), [Trend object](https://dataxapi.com/docs/objects/trend/), [Transcript object](https://dataxapi.com/docs/objects/transcript/), [Media files object](https://dataxapi.com/docs/objects/media/), [Music object](https://dataxapi.com/docs/objects/music/), [Creator rates object](https://dataxapi.com/docs/objects/creator_rates/), [Community object](https://dataxapi.com/docs/objects/community/), [Product object](https://dataxapi.com/docs/objects/product/), [Review object](https://dataxapi.com/docs/objects/review/), [Keyword index history object](https://dataxapi.com/docs/objects/keyword_history/), [Related keyword object](https://dataxapi.com/docs/objects/keyword_related/), [Keyword audience object](https://dataxapi.com/docs/objects/keyword_audience/), [Account recent change object](https://dataxapi.com/docs/objects/account_history/), [Brand index history object](https://dataxapi.com/docs/objects/brand_history/), [Brand index averages object](https://dataxapi.com/docs/objects/brand_metrics/), [Creator object](https://dataxapi.com/docs/objects/creator/), [Audience object](https://dataxapi.com/docs/objects/audience/), [Xingtu creator metrics object](https://dataxapi.com/docs/objects/xingtu_creator_metrics/), [Xingtu creator video object](https://dataxapi.com/docs/objects/xingtu_creator_post/), [PGY creator metrics object](https://dataxapi.com/docs/objects/pgy_creator_metrics/), [PGY creator note object](https://dataxapi.com/docs/objects/pgy_creator_post/), [PGY note detail object](https://dataxapi.com/docs/objects/pgy_note/), [Ad object](https://dataxapi.com/docs/objects/ad/), [Advertiser object](https://dataxapi.com/docs/objects/advertiser/), [Douyin trend-index creator metrics object](https://dataxapi.com/docs/objects/index_creator_metrics/), [Xingtu creator content keywords object](https://dataxapi.com/docs/objects/xingtu_creator_keywords/), [Xingtu creator scores object](https://dataxapi.com/docs/objects/xingtu_creator_scores/), [Xingtu creator content mix object](https://dataxapi.com/docs/objects/xingtu_creator_content_mix/), [Xingtu creator conversion object](https://dataxapi.com/docs/objects/xingtu_creator_conversion/), [Xingtu campaign object](https://dataxapi.com/docs/objects/xingtu_campaign/), [Channels share link object](https://dataxapi.com/docs/objects/channels_share_link/), [Topic object](https://dataxapi.com/docs/objects/topic/), [Account owner object](https://dataxapi.com/docs/objects/account_owner/), [Mini program object](https://dataxapi.com/docs/objects/miniprogram/), [Follower history object](https://dataxapi.com/docs/objects/follower_history/), [PGY creator costs and summary object](https://dataxapi.com/docs/objects/pgy_creator_costs/), [PGY creator follower summary object](https://dataxapi.com/docs/objects/pgy_creator_followers/), [PGY creator core figures history object](https://dataxapi.com/docs/objects/pgy_creator_cost_history/)

---

Last checked 2026-11-26 12:17 UTC. Catalog revision 0051cce45e9530b9. [HTML version](https://dataxapi.com/docs/objects/channels_collection/)
