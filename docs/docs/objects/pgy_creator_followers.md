# PGY creator follower summary object

The PGY creator follower summary object has 16 fields and is returned by 1 endpoint on Xiaohongshu (RedNote). A call costs $0.0400. It is a preview structure and may still change.

For machines: [pgy_creator_followers schema](https://dataxapi.com/openapi.json#/components/schemas/pgy_creator_followers), [openapi.json](https://dataxapi.com/openapi.json), [Object table (JSON)](https://api.dataxapi.com/v1/catalog/objects), [llms.txt](https://dataxapi.com/llms.txt)

## Fields

A field the platform cannot give is left out of the item and named in `meta.unavailable`. It is never filled with a guess or a zero.

| Field | Type | From view | Description |
| --- | --- | --- | --- |
| `creator_id` | text | `compact` | PGY creator ID |
| `followers` | integer | `compact` | Followers |
| `gained` | integer | `compact` | Net followers gained over the last 30 days; negative when followers were lost |
| `growth` | number | `compact` | Follower growth over the last 30 days: 0.008 is 0.8% more; negative when followers were lost |
| `growth_percentile` | number | `standard` | Share of comparable creators whose follower growth it exceeds, 0 to 1 |
| `active_followers` | integer | `compact` | Active followers: followers active on Xiaohongshu in the last 28 days |
| `active_share` | number | `compact` | Active followers as a share of all followers, 0 to 1 |
| `active_percentile` | number | `standard` | Share of comparable creators whose share of active followers it exceeds, 0 to 1 |
| `engaged_followers` | integer | `compact` | Engaged followers: followers who interacted with the creator's notes in the last 30 days |
| `engaged_share` | number | `compact` | Engaged followers as a share of all followers, 0 to 1 |
| `engaged_percentile` | number | `standard` | Share of comparable creators whose share of engaged followers it exceeds, 0 to 1 |
| `reading_followers` | integer | `compact` | Reading followers: followers who read the creator's notes in the last 30 days |
| `reading_share` | number | `compact` | Reading followers as a share of all followers, 0 to 1 |
| `reading_percentile` | number | `standard` | Share of comparable creators whose share of reading followers it exceeds, 0 to 1 |
| `buying_followers` | integer | `compact` | Buying followers: followers who bought something on Xiaohongshu in the last 30 days |
| `buying_share` | number | `compact` | Buying followers as a share of all followers, 0 to 1 |

## Endpoints that return PGY creator follower summary

### Xiaohongshu (RedNote)

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [Xiaohongshu PGY creator follower summary](https://dataxapi.com/apis/xiaohongshu/pgy/creators/followers/metrics.md) | `GET /v1/xiaohongshu/pgy/creators/followers/metrics` | PGY creator follower summary | $0.0400 / call |

## Example

One item from `xiaohongshu.pgy.creators.followers.metrics`, as recorded 2026-11-10 09:54 UTC. Names, text, IDs and links are examples; the figures are as recorded.

```jsonc
{
  "creator_id": "636dd0de0000000011c5a60b",
  "followers": 248737,
  "gained": 8966,
  "growth": 0.037,
  "growth_percentile": 0.936,
  "active_followers": 193190,
  "active_share": 0.777,
  "active_percentile": 0.909,
  "engaged_followers": 15180,
  "engaged_share": 0.061,
  "engaged_percentile": 0.946,
  "reading_followers": 115890,
  "reading_share": 0.466,
  "reading_percentile": 0.988,
  "buying_followers": 45706,
  "buying_share": 0.184
}
```

[The whole response is on the endpoint's page →](https://dataxapi.com/apis/xiaohongshu/pgy/creators/followers/metrics.md)

## Related

- [All endpoints](https://dataxapi.com/apis/): The directory lists what every endpoint returns, with its price.

## Other objects

[Post object](https://dataxapi.com/docs/objects/post/), [Comment object](https://dataxapi.com/docs/objects/comment/), [Account object](https://dataxapi.com/docs/objects/account/), [Trend object](https://dataxapi.com/docs/objects/trend/), [Transcript object](https://dataxapi.com/docs/objects/transcript/), [Media files object](https://dataxapi.com/docs/objects/media/), [Music object](https://dataxapi.com/docs/objects/music/), [Creator rates object](https://dataxapi.com/docs/objects/creator_rates/), [Community object](https://dataxapi.com/docs/objects/community/), [Product object](https://dataxapi.com/docs/objects/product/), [Review object](https://dataxapi.com/docs/objects/review/), [Keyword index history object](https://dataxapi.com/docs/objects/keyword_history/), [Related keyword object](https://dataxapi.com/docs/objects/keyword_related/), [Keyword audience object](https://dataxapi.com/docs/objects/keyword_audience/), [Account recent change object](https://dataxapi.com/docs/objects/account_history/), [Brand index history object](https://dataxapi.com/docs/objects/brand_history/), [Brand index averages object](https://dataxapi.com/docs/objects/brand_metrics/), [Creator object](https://dataxapi.com/docs/objects/creator/), [Audience object](https://dataxapi.com/docs/objects/audience/), [Xingtu creator metrics object](https://dataxapi.com/docs/objects/xingtu_creator_metrics/), [Xingtu creator video object](https://dataxapi.com/docs/objects/xingtu_creator_post/), [PGY creator metrics object](https://dataxapi.com/docs/objects/pgy_creator_metrics/), [PGY creator note object](https://dataxapi.com/docs/objects/pgy_creator_post/), [PGY note detail object](https://dataxapi.com/docs/objects/pgy_note/), [Ad object](https://dataxapi.com/docs/objects/ad/), [Advertiser object](https://dataxapi.com/docs/objects/advertiser/), [Douyin trend-index creator metrics object](https://dataxapi.com/docs/objects/index_creator_metrics/), [Xingtu creator content keywords object](https://dataxapi.com/docs/objects/xingtu_creator_keywords/), [Xingtu creator scores object](https://dataxapi.com/docs/objects/xingtu_creator_scores/), [Xingtu creator content mix object](https://dataxapi.com/docs/objects/xingtu_creator_content_mix/), [Xingtu creator conversion object](https://dataxapi.com/docs/objects/xingtu_creator_conversion/), [Xingtu campaign object](https://dataxapi.com/docs/objects/xingtu_campaign/), [Channels collection object](https://dataxapi.com/docs/objects/channels_collection/), [Channels share link object](https://dataxapi.com/docs/objects/channels_share_link/), [Topic object](https://dataxapi.com/docs/objects/topic/), [Account owner object](https://dataxapi.com/docs/objects/account_owner/), [Mini program object](https://dataxapi.com/docs/objects/miniprogram/), [Follower history object](https://dataxapi.com/docs/objects/follower_history/), [PGY creator costs and summary object](https://dataxapi.com/docs/objects/pgy_creator_costs/), [PGY creator core figures history object](https://dataxapi.com/docs/objects/pgy_creator_cost_history/)

---

Last checked 2026-11-26 12:17 UTC. Catalog revision 0051cce45e9530b9. [HTML version](https://dataxapi.com/docs/objects/pgy_creator_followers/)
