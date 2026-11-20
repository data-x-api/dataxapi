# PGY note detail object

The PGY note detail object has 21 fields and is returned by 1 endpoint on Xiaohongshu (RedNote). A call costs $0.0400. It is a preview structure and may still change.

For machines: [pgy_note schema](https://dataxapi.com/openapi.json#/components/schemas/pgy_note), [openapi.json](https://dataxapi.com/openapi.json), [Object table (JSON)](https://api.dataxapi.com/v1/catalog/objects), [llms.txt](https://dataxapi.com/llms.txt)

## Fields

A field the platform cannot give is left out of the item and named in `meta.unavailable`. It is never filled with a guess or a zero.

| Field | Type | From view | Description |
| --- | --- | --- | --- |
| `id` | text | `compact` | Note ID |
| `url` | link | `compact` | Link to the note, with the access token the platform gives, so it opens as it is |
| `type` | text | `compact` | An image note or a video note: `image`, `video` |
| `title` | text | `compact` | The note's title |
| `text` | text | `standard` | The note's text |
| `published_at` | time | `compact` | When it was published |
| `images` | list of link | `standard` | Addresses of the pictures, in the note's order |
| `creator_id` | text | `compact` | The creator's PGY creator ID, as the other PGY creator endpoints take it |
| `creator_name` | text | `compact` | The creator's name |
| `brand` | text | `compact` | The brand the note was reported as sponsored by, in the platform's words; null when it is no reported sponsored note |
| `brand_id` | text | `standard` | The Xiaohongshu account ID of that brand; null when there is none |
| `metrics` | object | `compact` | The figures PGY gives for the note |
| `metrics.impressions` | integer | `compact` | Impressions |
| `metrics.views` | integer | `compact` | Reads |
| `metrics.likes` | integer | `compact` | Likes |
| `metrics.favorites` | integer | `compact` | Saves |
| `metrics.comments` | integer | `compact` | Comments |
| `metrics.shares` | integer | `compact` | Shares |
| `metrics.follows` | integer | `compact` | Follows the note brought (new followers gained from it) |
| `component_clicks` | object | `standard` | The click-through band of each component the brand put in the note (PGY's component clicks); null when the note has no such figures |
| `component_clicks.comment_area` | text | `standard` | Click-through band of the comment-area component: normal (0-2%), high (2-10%) or very_high (over 10%), as PGY grades it; null when the note carries no such component: `normal`, `high`, `very_high` |
| `component_clicks.content` | text | `standard` | Click-through band of the in-text component: normal (0-2%), high (2-10%) or very_high (over 10%), as PGY grades it; null when the note carries no such component: `normal`, `high`, `very_high` |
| `component_clicks.note_bottom` | text | `standard` | Click-through band of the component at the bottom of the note: normal (0-2%), high (2-10%) or very_high (over 10%), as PGY grades it; null when the note carries no such component: `normal`, `high`, `very_high` |

## Endpoints that return PGY note detail

### Xiaohongshu (RedNote)

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [Xiaohongshu PGY note metrics](https://dataxapi.com/apis/xiaohongshu/pgy/notes/get.md) | `GET /v1/xiaohongshu/pgy/notes/get` | PGY note detail | $0.0400 / call |

## Example

One item from `xiaohongshu.pgy.notes.get`, as recorded 2026-11-10 19:33 UTC. Names, text, IDs and links are examples; the figures are as recorded.

```jsonc
{
  "id": "6aa68ad700000000cc4e240a",
  "url": "https://www.xiaohongshu.com/explore/6aa68ad700000000cc4e240a",
  "type": "image",
  "title": "关于周末露营，我踩过的五个坑",
  "text": "周末的周末露营日常，随手记录一下",
  "published_at": "2026-11-06T08:58:31.000Z",
  "images": [
    "https://sns-webpic-qc.xhscdn.com/20261013/8f1dc0a9ba488c20db59!nd_dft_wlteh_webp_3",
    "https://sns-webpic-qc.xhscdn.com/20261013/13bf10108e7eae003580!nd_dft_wlteh_webp_3",
    // … 13 more
  ],
  "creator_id": "6a72df4700000000f893a8a0",
  "creator_name": "周末露营这件事，越简单越好",
  "brand": "把周末露营从头到尾讲清楚，看完少走弯路",
  "brand_id": "6659928c00000000428fe21c",
  "metrics": {
    "impressions": 24405,
    "views": 4482,
    "likes": 203,
    "favorites": 171,
    "comments": 46,
    "shares": 36,
    "follows": 22
  },
  "component_clicks": {
    "comment_area": "normal",
    "content": null,
    "note_bottom": null
  }
}
```

[The whole response is on the endpoint's page →](https://dataxapi.com/apis/xiaohongshu/pgy/notes/get.md)

## Related

- [All endpoints](https://dataxapi.com/apis/): The directory lists what every endpoint returns, with its price.

## Other objects

[Post object](https://dataxapi.com/docs/objects/post/), [Comment object](https://dataxapi.com/docs/objects/comment/), [Account object](https://dataxapi.com/docs/objects/account/), [Trend object](https://dataxapi.com/docs/objects/trend/), [Transcript object](https://dataxapi.com/docs/objects/transcript/), [Creator rates object](https://dataxapi.com/docs/objects/creator_rates/), [Community object](https://dataxapi.com/docs/objects/community/), [Product object](https://dataxapi.com/docs/objects/product/), [Review object](https://dataxapi.com/docs/objects/review/), [Keyword index history object](https://dataxapi.com/docs/objects/keyword_history/), [Related keyword object](https://dataxapi.com/docs/objects/keyword_related/), [Keyword audience object](https://dataxapi.com/docs/objects/keyword_audience/), [Account recent change object](https://dataxapi.com/docs/objects/account_history/), [Brand index history object](https://dataxapi.com/docs/objects/brand_history/), [Brand index averages object](https://dataxapi.com/docs/objects/brand_metrics/), [Creator object](https://dataxapi.com/docs/objects/creator/), [Audience object](https://dataxapi.com/docs/objects/audience/), [Xingtu creator metrics object](https://dataxapi.com/docs/objects/xingtu_creator_metrics/), [Xingtu creator video object](https://dataxapi.com/docs/objects/xingtu_creator_post/), [PGY creator metrics object](https://dataxapi.com/docs/objects/pgy_creator_metrics/), [PGY creator note object](https://dataxapi.com/docs/objects/pgy_creator_post/), [Ad object](https://dataxapi.com/docs/objects/ad/), [Advertiser object](https://dataxapi.com/docs/objects/advertiser/), [Douyin trend-index creator metrics object](https://dataxapi.com/docs/objects/index_creator_metrics/), [Xingtu creator content keywords object](https://dataxapi.com/docs/objects/xingtu_creator_keywords/), [Xingtu creator scores object](https://dataxapi.com/docs/objects/xingtu_creator_scores/), [Xingtu creator content mix object](https://dataxapi.com/docs/objects/xingtu_creator_content_mix/), [Xingtu creator conversion object](https://dataxapi.com/docs/objects/xingtu_creator_conversion/), [Xingtu campaign object](https://dataxapi.com/docs/objects/xingtu_campaign/), [Channels collection object](https://dataxapi.com/docs/objects/channels_collection/), [Channels share link object](https://dataxapi.com/docs/objects/channels_share_link/), [Topic object](https://dataxapi.com/docs/objects/topic/), [Account owner object](https://dataxapi.com/docs/objects/account_owner/), [Mini program object](https://dataxapi.com/docs/objects/miniprogram/), [Follower history object](https://dataxapi.com/docs/objects/follower_history/), [PGY creator costs and summary object](https://dataxapi.com/docs/objects/pgy_creator_costs/), [PGY creator follower summary object](https://dataxapi.com/docs/objects/pgy_creator_followers/), [PGY creator core figures history object](https://dataxapi.com/docs/objects/pgy_creator_cost_history/)

---

Last checked 2026-11-20 07:17 UTC. Catalog revision 720fc3ea8dadb865. [HTML version](https://dataxapi.com/docs/objects/pgy_note/)
