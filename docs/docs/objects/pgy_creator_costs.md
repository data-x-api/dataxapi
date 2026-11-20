# PGY creator costs and summary object

The PGY creator costs and summary object has 39 fields and is returned by 1 endpoint on Xiaohongshu (RedNote). A call costs $0.0400. It is a preview structure and may still change.

For machines: [pgy_creator_costs schema](https://dataxapi.com/openapi.json#/components/schemas/pgy_creator_costs), [openapi.json](https://dataxapi.com/openapi.json), [Object table (JSON)](https://api.dataxapi.com/v1/catalog/objects), [llms.txt](https://dataxapi.com/llms.txt)

## Fields

A field the platform cannot give is left out of the item and named in `meta.unavailable`. It is never filled with a guess or a zero.

| Field | Type | From view | Description |
| --- | --- | --- | --- |
| `creator_id` | text | `compact` | PGY creator ID |
| `date` | time | `compact` | The day the figures are of: a calendar day in China time (UTC+8), written as midnight UTC of its date |
| `currency` | text | `compact` | Currency of the costs below |
| `image_cpm` | amount | `compact` | Estimated CPM of an image note (cost of a thousand impressions), in yuan; null where PGY has no estimate |
| `image_cpm_percentile` | number | `standard` | Share of comparable creators whose image-note CPM is higher (PGY's "better than peers"), 0 to 1 |
| `video_cpm` | amount | `compact` | Estimated CPM of a video note (cost of a thousand impressions), in yuan; null where PGY has no estimate |
| `video_cpm_percentile` | number | `standard` | Share of comparable creators whose video-note CPM is higher (PGY's "better than peers"), 0 to 1 |
| `image_cpe` | amount | `compact` | Estimated cost per interaction of an image note, in yuan; null where PGY has no estimate |
| `image_cpe_percentile` | number | `standard` | Share of comparable creators whose image-note cost per interaction is higher (PGY's "better than peers"), 0 to 1 |
| `video_cpe` | amount | `compact` | Estimated cost per interaction of a video note, in yuan; null where PGY has no estimate |
| `video_cpe_percentile` | number | `standard` | Share of comparable creators whose video-note cost per interaction is higher (PGY's "better than peers"), 0 to 1 |
| `image_read_cost` | amount | `compact` | Estimated cost per read of an image note, in yuan; null where PGY has no estimate |
| `image_read_cost_percentile` | number | `standard` | Share of comparable creators whose image-note cost per read is higher (PGY's "better than peers"), 0 to 1 |
| `video_read_cost` | amount | `compact` | Estimated cost per read of a video note, in yuan; null where PGY has no estimate |
| `video_read_cost_percentile` | number | `standard` | Share of comparable creators whose video-note cost per read is higher (PGY's "better than peers"), 0 to 1 |
| `image_shop_visit_cost` | amount | `compact` | Estimated cost per shop visitor an image note brings (PGY's spillover store visits), in yuan; null where PGY has no estimate |
| `image_shop_visit_cost_percentile` | number | `standard` | Share of comparable creators whose image-note cost per shop visitor is higher (PGY's "better than peers"), 0 to 1 |
| `video_shop_visit_cost` | amount | `compact` | Estimated cost per shop visitor a video note brings (PGY's spillover store visits), in yuan; null where PGY has no estimate |
| `video_shop_visit_cost_percentile` | number | `standard` | Share of comparable creators whose video-note cost per shop visitor is higher (PGY's "better than peers"), 0 to 1 |
| `median_impressions` | integer | `compact` | Median impressions of a note |
| `median_impressions_percentile` | number | `standard` | Share of comparable creators whose median impressions it exceeds, 0 to 1 |
| `median_reads` | integer | `compact` | Median reads of a note |
| `median_reads_percentile` | number | `standard` | Share of comparable creators whose median reads it exceeds, 0 to 1 |
| `median_engagements` | integer | `compact` | Median interactions of a note |
| `median_engagements_percentile` | number | `standard` | Share of comparable creators whose median interactions it exceeds, 0 to 1 |
| `median_shop_visits` | integer | `compact` | Median shop visitors a note brings |
| `median_shop_visits_percentile` | number | `standard` | Share of comparable creators whose median shop visitors it exceeds, 0 to 1 |
| `follower_growth` | number | `standard` | Follower growth over the last 30 days: 0.037 is 3.7% more; negative when followers were lost |
| `follower_growth_percentile` | number | `standard` | Share of comparable creators whose follower growth it exceeds, 0 to 1 |
| `invite_reply_rate` | number | `standard` | Share of collaboration invitations answered within 48 hours, 0 to 1 |
| `easy_to_reach` | yes/no | `standard` | Whether PGY marks the creator "easy to reach" (好联系, the mark beside the invitation reply rate on the page) |
| `active_days_7d` | integer | `standard` | Days active in the last 7 |
| `is_active` | yes/no | `standard` | Whether PGY marks the creator "active" (活跃, the mark beside the active days of the last 7 on the page) |
| `notes_30d` | integer | `standard` | Notes published in the last 30 days, everyday and sponsored alike (the page's "notes published"); the same in either tab |
| `highlight` | text | `standard` | The strength PGY marks the creator with, in its words (a title for a kind of creator); null when none |
| `highlight_reason` | text | `standard` | PGY's explanation of that strength, in its words (such as which figure ranks in what top share of peers) |
| `content_mix` | list of object | `standard` | The share of the creator's notes in each content category, largest first |
| `content_mix[].category` | text | `standard` | The content category, in the platform's words |
| `content_mix[].share` | number | `standard` | The share, 0 to 1 |
| `industries` | list of text | `standard` | Industries the creator has worked with, in the platform's words |

## Endpoints that return PGY creator costs and summary

### Xiaohongshu (RedNote)

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [Xiaohongshu PGY creator costs and data summary](https://dataxapi.com/apis/xiaohongshu/pgy/creators/costs/metrics.md) | `GET /v1/xiaohongshu/pgy/creators/costs/metrics` | PGY creator costs and summary | $0.0400 / call |

## Example

One item from `xiaohongshu.pgy.creators.costs.metrics`, as recorded 2026-11-10 09:54 UTC. Names, text, IDs and links are examples; the figures are as recorded.

```jsonc
{
  "creator_id": "64b916ab000000009bfb830e",
  "date": "2026-11-09T00:00:00Z",
  "currency": "CNY",
  "image_cpm": "1202.709",
  "image_cpm_percentile": 0.0998,
  "video_cpm": "11556.0641",
  "video_cpm_percentile": 0.0188,
  "image_cpe": "572.2222",
  "image_cpe_percentile": 0.0227,
  "video_cpe": "214.5833",
  "video_cpe_percentile": 0.0411,
  "image_read_cost": "25.2377",
  "image_read_cost_percentile": 0.7452,
  "video_read_cost": "76.313",
  "video_read_cost_percentile": 0.7667,
  "image_shop_visit_cost": null,
  "image_shop_visit_cost_percentile": null,
  "video_shop_visit_cost": null,
  "video_shop_visit_cost_percentile": null,
  "median_impressions": 2200,
  "median_impressions_percentile": 0.4551,
  "median_reads": 302,
  "median_reads_percentile": 0.4167,
  "median_engagements": 22,
  "median_engagements_percentile": 0.4319,
  "median_shop_visits": 0,
  "median_shop_visits_percentile": 0,
  "follower_growth": 0.001,
  "follower_growth_percentile": 0.683,
  "invite_reply_rate": 0.375,
  "easy_to_reach": false,
  "active_days_7d": 7,
  "is_active": true,
  "notes_30d": 38,
  "highlight": "周末的周末露营日常，随手记录一下",
  "highlight_reason": "周末露营｜第一次尝试就爱上了，清单放评论区",
  "content_mix": [
    { "category": "周末露营｜第一次尝试就爱上了，清单放评论区", "share": 0.395 },
    { "category": "周末露营这件事，越简单越好", "share": 0.395 }
  ],
  "industries": []
}
```

[The whole response is on the endpoint's page →](https://dataxapi.com/apis/xiaohongshu/pgy/creators/costs/metrics.md)

## Related

- [All endpoints](https://dataxapi.com/apis/): The directory lists what every endpoint returns, with its price.

## Other objects

[Post object](https://dataxapi.com/docs/objects/post/), [Comment object](https://dataxapi.com/docs/objects/comment/), [Account object](https://dataxapi.com/docs/objects/account/), [Trend object](https://dataxapi.com/docs/objects/trend/), [Transcript object](https://dataxapi.com/docs/objects/transcript/), [Creator rates object](https://dataxapi.com/docs/objects/creator_rates/), [Community object](https://dataxapi.com/docs/objects/community/), [Product object](https://dataxapi.com/docs/objects/product/), [Review object](https://dataxapi.com/docs/objects/review/), [Keyword index history object](https://dataxapi.com/docs/objects/keyword_history/), [Related keyword object](https://dataxapi.com/docs/objects/keyword_related/), [Keyword audience object](https://dataxapi.com/docs/objects/keyword_audience/), [Account recent change object](https://dataxapi.com/docs/objects/account_history/), [Brand index history object](https://dataxapi.com/docs/objects/brand_history/), [Brand index averages object](https://dataxapi.com/docs/objects/brand_metrics/), [Creator object](https://dataxapi.com/docs/objects/creator/), [Audience object](https://dataxapi.com/docs/objects/audience/), [Xingtu creator metrics object](https://dataxapi.com/docs/objects/xingtu_creator_metrics/), [Xingtu creator video object](https://dataxapi.com/docs/objects/xingtu_creator_post/), [PGY creator metrics object](https://dataxapi.com/docs/objects/pgy_creator_metrics/), [PGY creator note object](https://dataxapi.com/docs/objects/pgy_creator_post/), [PGY note detail object](https://dataxapi.com/docs/objects/pgy_note/), [Ad object](https://dataxapi.com/docs/objects/ad/), [Advertiser object](https://dataxapi.com/docs/objects/advertiser/), [Douyin trend-index creator metrics object](https://dataxapi.com/docs/objects/index_creator_metrics/), [Xingtu creator content keywords object](https://dataxapi.com/docs/objects/xingtu_creator_keywords/), [Xingtu creator scores object](https://dataxapi.com/docs/objects/xingtu_creator_scores/), [Xingtu creator content mix object](https://dataxapi.com/docs/objects/xingtu_creator_content_mix/), [Xingtu creator conversion object](https://dataxapi.com/docs/objects/xingtu_creator_conversion/), [Xingtu campaign object](https://dataxapi.com/docs/objects/xingtu_campaign/), [Channels collection object](https://dataxapi.com/docs/objects/channels_collection/), [Channels share link object](https://dataxapi.com/docs/objects/channels_share_link/), [Topic object](https://dataxapi.com/docs/objects/topic/), [Account owner object](https://dataxapi.com/docs/objects/account_owner/), [Mini program object](https://dataxapi.com/docs/objects/miniprogram/), [Follower history object](https://dataxapi.com/docs/objects/follower_history/), [PGY creator follower summary object](https://dataxapi.com/docs/objects/pgy_creator_followers/), [PGY creator core figures history object](https://dataxapi.com/docs/objects/pgy_creator_cost_history/)

---

Last checked 2026-11-20 07:17 UTC. Catalog revision 720fc3ea8dadb865. [HTML version](https://dataxapi.com/docs/objects/pgy_creator_costs/)
