# Xingtu creator video object

The Xingtu creator video object has 10 fields and is returned by 1 endpoint on Douyin. A call costs $0.0040. It is a preview structure and may still change.

For machines: [xingtu_creator_post schema](https://dataxapi.com/openapi.json#/components/schemas/xingtu_creator_post), [openapi.json](https://dataxapi.com/openapi.json), [Object table (JSON)](https://api.dataxapi.com/v1/catalog/objects), [llms.txt](https://dataxapi.com/llms.txt)

A Xingtu creator video is one video of a Douyin creator as Xingtu (星图) lists it on the creator's page, newest first: caption, length, views, likes, comments, and the completion and engagement rates advertisers read. It is a structure of its own, not a Post.

Its `id` is the Douyin video ID, so the Douyin video endpoints take it unchanged. The list is asked for by Xingtu creator ID.

## Fields

A field the platform cannot give is left out of the item and named in `meta.unavailable`. It is never filled with a guess or a zero.

| Field | Type | From view | Description |
| --- | --- | --- | --- |
| `id` | text | `compact` | Video ID, the one the Douyin video endpoints take |
| `url` | link | `compact` | Link to the video |
| `title` | text | `compact` | The video's caption |
| `published_at` | time | `compact` | When it was published |
| `duration` | number | `standard` | Length of the video, in seconds |
| `metrics` | object | `compact` | The video's figures |
| `metrics.views` | integer | `compact` | Views |
| `metrics.likes` | integer | `compact` | Likes |
| `metrics.comments` | integer | `compact` | Comments |
| `metrics.completion_rate` | number | `compact` | Completion rate, 0 to 1 |
| `metrics.engagement_rate` | number | `compact` | Engagement rate, 0 to 1 |

## Endpoints that return Xingtu creator video

### Douyin

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [Douyin Xingtu creator video performance](https://dataxapi.com/apis/douyin/xingtu/creators/videos/list.md) | `GET /v1/douyin/xingtu/creators/videos/list` | Xingtu creator video list | $0.0040 / call |

## Example

One item from `douyin.xingtu.creators.videos.list`, as recorded 2026-10-12 22:08 UTC. Names, text, IDs and links are examples; the figures are as recorded.

```jsonc
{
  "id": "7202901412163322322",
  "url": "https://www.douyin.com/video/7202901412163322322",
  "title": "周末露营装备清单，新手照着买就行",
  "published_at": "2026-10-09T09:00:01.000Z",
  "duration": 222.207,
  "metrics": {
    "views": 96840,
    "likes": 1370,
    "comments": 91,
    "completion_rate": 0.020132,
    "engagement_rate": 0.02032
  }
}
```

[The whole response is on the endpoint's page →](https://dataxapi.com/apis/douyin/xingtu/creators/videos/list.md)

## Related

- [Creator posts API](https://dataxapi.com/roles/creators-posts-list/): The same action on 2 platforms, with a per-platform field table.
- [All endpoints](https://dataxapi.com/apis/): The directory lists what every endpoint returns, with its price.

## Other objects

[Post object](https://dataxapi.com/docs/objects/post/), [Comment object](https://dataxapi.com/docs/objects/comment/), [Account object](https://dataxapi.com/docs/objects/account/), [Trend object](https://dataxapi.com/docs/objects/trend/), [Transcript object](https://dataxapi.com/docs/objects/transcript/), [Creator rates object](https://dataxapi.com/docs/objects/creator_rates/), [Community object](https://dataxapi.com/docs/objects/community/), [Product object](https://dataxapi.com/docs/objects/product/), [Review object](https://dataxapi.com/docs/objects/review/), [Keyword index history object](https://dataxapi.com/docs/objects/keyword_history/), [Related keyword object](https://dataxapi.com/docs/objects/keyword_related/), [Keyword audience object](https://dataxapi.com/docs/objects/keyword_audience/), [Account recent change object](https://dataxapi.com/docs/objects/account_history/), [Brand index history object](https://dataxapi.com/docs/objects/brand_history/), [Brand index averages object](https://dataxapi.com/docs/objects/brand_metrics/), [Creator object](https://dataxapi.com/docs/objects/creator/), [Audience object](https://dataxapi.com/docs/objects/audience/), [Xingtu creator metrics object](https://dataxapi.com/docs/objects/xingtu_creator_metrics/), [PGY creator metrics object](https://dataxapi.com/docs/objects/pgy_creator_metrics/), [PGY creator note object](https://dataxapi.com/docs/objects/pgy_creator_post/), [Ad object](https://dataxapi.com/docs/objects/ad/), [Advertiser object](https://dataxapi.com/docs/objects/advertiser/), [Douyin trend-index creator metrics object](https://dataxapi.com/docs/objects/index_creator_metrics/), [Xingtu creator content keywords object](https://dataxapi.com/docs/objects/xingtu_creator_keywords/), [Xingtu creator scores object](https://dataxapi.com/docs/objects/xingtu_creator_scores/), [Xingtu creator content mix object](https://dataxapi.com/docs/objects/xingtu_creator_content_mix/), [Xingtu creator conversion object](https://dataxapi.com/docs/objects/xingtu_creator_conversion/), [Xingtu campaign object](https://dataxapi.com/docs/objects/xingtu_campaign/), [Channels collection object](https://dataxapi.com/docs/objects/channels_collection/), [Topic object](https://dataxapi.com/docs/objects/topic/)

---

Last checked 2026-10-18 19:59 UTC. Catalog revision c48ce454ae6c4c65. [HTML version](https://dataxapi.com/docs/objects/xingtu_creator_post/)
