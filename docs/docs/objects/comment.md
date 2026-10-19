# Comment object

23 endpoints on 13 platforms return the Comment object with the same 13 fields, so code written for one platform reads the others unchanged. A call costs $0.0020 to $0.0200.

For machines: [comment schema](https://dataxapi.com/openapi.json#/components/schemas/comment), [openapi.json](https://dataxapi.com/openapi.json), [Object table (JSON)](https://api.dataxapi.com/v1/catalog/objects), [llms.txt](https://dataxapi.com/llms.txt)

A Comment is what someone wrote under a post: its text, who wrote it, when, and its likes and reply count. A reply to a comment is a comment too, read with each platform's replies endpoint.

`post_id` is the post it is under; `parent_id` is the comment it answers directly and `root_id` the top-level comment of its thread, both `null` on a top-level comment. It shares these fields and `author`, `text` and `metrics` with Post, so an X (Twitter) reply, which comes back as a post, reads as a comment too; a buyer's review of a product is a Review, not a comment.

## Fields

A field the platform cannot give is left out of the item and named in `meta.unavailable`. It is never filled with a guess or a zero.

| Field | Type | From view | Description |
| --- | --- | --- | --- |
| `id` | text | `compact` | ID |
| `url` | link | `compact` | Link that opens the comment |
| `text` | text | `compact` | Text |
| `published_at` | time | `compact` | When it was posted |
| `author` | object | `compact` | Commenter |
| `author.id` | text | `compact` | Commenter's account ID |
| `author.username` | text | `compact` | Commenter's handle |
| `author.name` | text | `compact` | Commenter's display name |
| `author.avatar_url` | link | `standard` | Commenter's avatar |
| `metrics` | object | `compact` | Engagement counts |
| `metrics.likes` | integer | `compact` | Likes |
| `metrics.comments` | integer | `compact` | Replies |
| `post_id` | text | `compact` | ID of the post it is under |
| `parent_id` | text | `compact` | ID of the comment it replies to directly; null for a top-level comment |
| `root_id` | text | `compact` | ID of the top-level comment of its thread; null for a top-level comment |

## Where each number comes from

The same field name does not always mean the same act on every platform. This table says which of the platform's own numbers goes into the field.

| Field | What it holds there | On |
| --- | --- | --- |
| `metrics.likes` | All reactions together (like, love, haha and the rest) | Facebook |
| `metrics.likes` | Likes; from a thousand up the platform shows a rounded number | YouTube |

## What a platform cannot give

A platform stands against a field when none of its endpoints gives it.

| Field | Not available on |
| --- | --- |
| `url` | Douyin, Bilibili, Kuaishou, Facebook, Instagram, TikTok, Weibo, Xiaohongshu (RedNote), YouTube, WeChat Channels, WeChat Official Accounts, Zhihu |
| `published_at` | YouTube |
| `author.username` | Kuaishou, Facebook, Weibo, WeChat Channels, WeChat Official Accounts |
| `author.name` | Instagram, Reddit |
| `metrics.likes` | Reddit |
| `metrics.comments` | Kuaishou, Instagram, WeChat Channels |
| `post_id` | Kuaishou, Instagram, YouTube, WeChat Official Accounts, Zhihu |
| `parent_id` | Facebook |
| `root_id` | Facebook |

One endpoint may still leave out a field another gives: each endpoint's page lists what it cannot give, and every answer says so in `meta.unavailable`.

## Endpoints that return Comment

### Douyin

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [Douyin comment replies](https://dataxapi.com/apis/douyin/comments/replies/list.md) | `GET /v1/douyin/comments/replies/list` | Comment list | $0.0020 / call |
| [Douyin video comments](https://dataxapi.com/apis/douyin/videos/comments/list.md) | `GET /v1/douyin/videos/comments/list` | Comment list | $0.0020 / call |

### Bilibili

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [Bilibili comment replies](https://dataxapi.com/apis/bilibili/comments/replies/list.md) | `GET /v1/bilibili/comments/replies/list` | Comment list | $0.0020 / call |
| [Bilibili video comments](https://dataxapi.com/apis/bilibili/videos/comments/list.md) | `GET /v1/bilibili/videos/comments/list` | Comment list | $0.0020 / call |

### Kuaishou

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [Kuaishou comment replies](https://dataxapi.com/apis/kuaishou/comments/replies/list.md) | `GET /v1/kuaishou/comments/replies/list` | Comment list | $0.0020 / call |
| [Kuaishou video comments](https://dataxapi.com/apis/kuaishou/videos/comments/list.md) | `GET /v1/kuaishou/videos/comments/list` | Comment list | $0.0020 / call |

### Facebook

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [Facebook post comments](https://dataxapi.com/apis/facebook/posts/comments/list.md) | `GET /v1/facebook/posts/comments/list` | Comment list | $0.0020 / call |

### Instagram

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [Instagram comment replies](https://dataxapi.com/apis/instagram/comments/replies/list.md) | `GET /v1/instagram/comments/replies/list` | Comment list | $0.0020 / call |
| [Instagram post comments](https://dataxapi.com/apis/instagram/posts/comments/list.md) | `GET /v1/instagram/posts/comments/list` | Comment list | $0.0020 / call |

### TikTok

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [TikTok comment replies](https://dataxapi.com/apis/tiktok/comments/replies/list.md) | `GET /v1/tiktok/comments/replies/list` | Comment list | $0.0020 / call |
| [TikTok video comments](https://dataxapi.com/apis/tiktok/videos/comments/list.md) | `GET /v1/tiktok/videos/comments/list` | Comment list | $0.0020 / call |

### Weibo

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [Weibo comment replies](https://dataxapi.com/apis/weibo/comments/replies/list.md) | `GET /v1/weibo/comments/replies/list` | Comment list | $0.0020 / call |
| [Weibo post comments](https://dataxapi.com/apis/weibo/posts/comments/list.md) | `GET /v1/weibo/posts/comments/list` | Comment list | $0.0020 / call |

### Xiaohongshu (RedNote)

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [Xiaohongshu comment replies](https://dataxapi.com/apis/xiaohongshu/comments/replies/list.md) | `GET /v1/xiaohongshu/comments/replies/list` | Comment list | $0.0200 / call |
| [Xiaohongshu note comments](https://dataxapi.com/apis/xiaohongshu/notes/comments/list.md) | `GET /v1/xiaohongshu/notes/comments/list` | Comment list | $0.0200 / call |

### YouTube

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [YouTube comment replies](https://dataxapi.com/apis/youtube/comments/replies/list.md) | `GET /v1/youtube/comments/replies/list` | Comment list | $0.0020 / call |
| [YouTube video comments](https://dataxapi.com/apis/youtube/videos/comments/list.md) | `GET /v1/youtube/videos/comments/list` | Comment list | $0.0020 / call |

### WeChat Channels

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [WeChat Channels video comments](https://dataxapi.com/apis/wechat_channels/videos/comments/list.md) | `GET /v1/wechat_channels/videos/comments/list` | Comment list | $0.0200 / call |

### WeChat Official Accounts

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [WeChat Official Account article comments](https://dataxapi.com/apis/wechat_mp/articles/comments/list.md) | `GET /v1/wechat_mp/articles/comments/list` | Comment list | $0.0200 / call |
| [WeChat Official Account comment replies](https://dataxapi.com/apis/wechat_mp/comments/replies/list.md) | `GET /v1/wechat_mp/comments/replies/list` | Comment list | $0.0200 / call |

### Reddit

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [Reddit post comments](https://dataxapi.com/apis/reddit/posts/comments/list.md) | `GET /v1/reddit/posts/comments/list` | Comment list | $0.0020 / call |

### Zhihu

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [Zhihu answer comments](https://dataxapi.com/apis/zhihu/answers/comments/list.md) | `GET /v1/zhihu/answers/comments/list` | Comment list | $0.0020 / call |
| [Zhihu comment replies](https://dataxapi.com/apis/zhihu/comments/replies/list.md) | `GET /v1/zhihu/comments/replies/list` | Comment list | $0.0020 / call |

## Example

One item from `douyin.comments.replies.list`, as recorded 2026-10-12 18:59 UTC. Names, text, IDs and links are examples; the figures are as recorded.

```jsonc
{
  "id": "7281542808761380598",
  "text": "第三个建议太实用了！",
  "published_at": "2026-06-26T11:50:22.000Z",
  "author": {
    "id": "MS4wLjABAAAA_p_ZcarAlfQSUXheWfou6Urggj6nSw5RWztBuPbTGeE",
    "username": "nanfeng_0721",
    "name": "南边的风",
    "avatar_url": "https://p3-pc.douyinpic.com/aweme/100x100/aweme-avatar/tos-cn-avt-0015_40a6ed26a1d5485803fe.jpeg"
  },
  "metrics": { "likes": 2308 },
  "post_id": "7235042234252823683",
  "parent_id": "7808984148800124107",
  "root_id": "7288185174927937448"
}
```

[The whole response is on the endpoint's page →](https://dataxapi.com/apis/douyin/comments/replies/list.md)

## Related

- [Comments API](https://dataxapi.com/roles/posts-comments-list/): The same action on 13 platforms, with a per-platform field table.
- [Comment replies API](https://dataxapi.com/roles/comments-replies-list/): The same action on 9 platforms, with a per-platform field table.
- [All endpoints](https://dataxapi.com/apis/): The directory lists what every endpoint returns, with its price.

## Other objects

[Post object](https://dataxapi.com/docs/objects/post/), [Account object](https://dataxapi.com/docs/objects/account/), [Trend object](https://dataxapi.com/docs/objects/trend/), [Transcript object](https://dataxapi.com/docs/objects/transcript/), [Creator rates object](https://dataxapi.com/docs/objects/creator_rates/), [Community object](https://dataxapi.com/docs/objects/community/), [Product object](https://dataxapi.com/docs/objects/product/), [Review object](https://dataxapi.com/docs/objects/review/), [Keyword index history object](https://dataxapi.com/docs/objects/keyword_history/), [Related keyword object](https://dataxapi.com/docs/objects/keyword_related/), [Keyword audience object](https://dataxapi.com/docs/objects/keyword_audience/), [Account recent change object](https://dataxapi.com/docs/objects/account_history/), [Brand index history object](https://dataxapi.com/docs/objects/brand_history/), [Brand index averages object](https://dataxapi.com/docs/objects/brand_metrics/), [Creator object](https://dataxapi.com/docs/objects/creator/), [Audience object](https://dataxapi.com/docs/objects/audience/), [Xingtu creator metrics object](https://dataxapi.com/docs/objects/xingtu_creator_metrics/), [Xingtu creator video object](https://dataxapi.com/docs/objects/xingtu_creator_post/), [PGY creator metrics object](https://dataxapi.com/docs/objects/pgy_creator_metrics/), [PGY creator note object](https://dataxapi.com/docs/objects/pgy_creator_post/), [Ad object](https://dataxapi.com/docs/objects/ad/), [Advertiser object](https://dataxapi.com/docs/objects/advertiser/), [Douyin trend-index creator metrics object](https://dataxapi.com/docs/objects/index_creator_metrics/), [Xingtu creator content keywords object](https://dataxapi.com/docs/objects/xingtu_creator_keywords/), [Xingtu creator scores object](https://dataxapi.com/docs/objects/xingtu_creator_scores/), [Xingtu creator content mix object](https://dataxapi.com/docs/objects/xingtu_creator_content_mix/), [Xingtu creator conversion object](https://dataxapi.com/docs/objects/xingtu_creator_conversion/), [Xingtu campaign object](https://dataxapi.com/docs/objects/xingtu_campaign/), [Channels collection object](https://dataxapi.com/docs/objects/channels_collection/), [Topic object](https://dataxapi.com/docs/objects/topic/)

---

Last checked 2026-10-18 19:59 UTC. Catalog revision c48ce454ae6c4c65. [HTML version](https://dataxapi.com/docs/objects/comment/)
