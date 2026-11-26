# Channels collection（视频号合集）对象

Channels collection（视频号合集）对象有 6 个字段，由微信视频号的 1 个接口返回。每次调用 $0.0200。它是预览结构，之后可能调整。

给机器读：[channels_collection schema](https://dataxapi.com/openapi.json#/components/schemas/channels_collection)、[openapi.json](https://dataxapi.com/openapi.json)、[对象表（JSON）](https://api.dataxapi.com/v1/catalog/objects)、[llms.txt](https://dataxapi.com/zh/llms.txt)

视频号合集（Channels collection）是一个视频号账号把一批视频归在一个名字下的合集，带简介、封面、视频数和最近更新时间。只有视频号有。

用账号编号（`v2_` 开头、`@finder` 结尾，视频的 `author.id` 就是）能取到它的全部公开合集。用合集的 `id` 能取合集里的视频，按合集自己的顺序以内容对象返回。

## 字段

平台给不了的字段不会出现在这条数据里，而是写在 `meta.unavailable` 里。不会用猜的数或 0 顶上。

| 字段 | 类型 | 起始档位 | 说明 |
| --- | --- | --- | --- |
| `id` | 文本 | `compact` | 合集编号，可原样传给取合集里视频的接口 |
| `name` | 文本 | `compact` | 合集的名称 |
| `description` | 文本 | `compact` | 合集的简介；没写则为 null |
| `cover_url` | 链接 | `standard` | 合集封面图地址 |
| `updated_at` | 时间 | `compact` | 合集最近一次更新的时间 |
| `metrics` | 对象 | `compact` | 合集的数字 |
| `metrics.videos` | 整数 | `compact` | 合集里的视频数 |

## 返回 Channels collection（视频号合集）的接口

### 微信视频号

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [微信视频号账号的合集](https://dataxapi.com/zh/apis/wechat_channels/users/collections/list.md) | `GET /v1/wechat_channels/users/collections/list` | 视频号合集列表 | $0.0200 / 次 |

## 示例

`wechat_channels.users.collections.list` 返回的一条，录制于 2026-10-13 03:26 UTC。名字、正文和编号是示例，链接也是；数字是原样。

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

[完整的返回在这个接口的页面上 →](https://dataxapi.com/zh/apis/wechat_channels/users/collections/list.md)

## 相关

- [全部接口](https://dataxapi.com/zh/apis/): 目录里写明每个接口返回什么对象、多少钱。

## 其他对象

[Post（内容）对象](https://dataxapi.com/zh/docs/objects/post/)、[Comment（评论）对象](https://dataxapi.com/zh/docs/objects/comment/)、[Account（账号）对象](https://dataxapi.com/zh/docs/objects/account/)、[Trend（热点）对象](https://dataxapi.com/zh/docs/objects/trend/)、[Transcript（逐字稿）对象](https://dataxapi.com/zh/docs/objects/transcript/)、[Media files（视频和图片文件）对象](https://dataxapi.com/zh/docs/objects/media/)、[Music（音乐）对象](https://dataxapi.com/zh/docs/objects/music/)、[Creator rates（达人报价）对象](https://dataxapi.com/zh/docs/objects/creator_rates/)、[Community（社区）对象](https://dataxapi.com/zh/docs/objects/community/)、[Product（商品）对象](https://dataxapi.com/zh/docs/objects/product/)、[Review（评价）对象](https://dataxapi.com/zh/docs/objects/review/)、[Keyword index history（关键词指数历史）对象](https://dataxapi.com/zh/docs/objects/keyword_history/)、[Related keyword（关联词）对象](https://dataxapi.com/zh/docs/objects/keyword_related/)、[Keyword audience（关键词人群画像）对象](https://dataxapi.com/zh/docs/objects/keyword_audience/)、[Account recent change（账号近期变化）对象](https://dataxapi.com/zh/docs/objects/account_history/)、[Brand index history（品牌指数历史）对象](https://dataxapi.com/zh/docs/objects/brand_history/)、[Brand index averages（品牌指数均值）对象](https://dataxapi.com/zh/docs/objects/brand_metrics/)、[Creator（达人）对象](https://dataxapi.com/zh/docs/objects/creator/)、[Audience（粉丝画像）对象](https://dataxapi.com/zh/docs/objects/audience/)、[Xingtu creator metrics（星图达人传播数据）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_metrics/)、[Xingtu creator video（星图达人作品）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_post/)、[PGY creator metrics（蒲公英博主数据表现）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_metrics/)、[PGY creator note（蒲公英博主笔记）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_post/)、[PGY note detail（蒲公英笔记详情）对象](https://dataxapi.com/zh/docs/objects/pgy_note/)、[Ad（广告）对象](https://dataxapi.com/zh/docs/objects/ad/)、[Advertiser（广告主）对象](https://dataxapi.com/zh/docs/objects/advertiser/)、[Douyin trend-index creator metrics（巨量算数达人核心指标）对象](https://dataxapi.com/zh/docs/objects/index_creator_metrics/)、[Xingtu creator content keywords（星图达人内容热词）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_keywords/)、[Xingtu creator scores（星图达人指数）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_scores/)、[Xingtu creator content mix（星图达人内容分布）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_content_mix/)、[Xingtu creator conversion（星图达人转化能力）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_conversion/)、[Xingtu campaign（星图营销活动）对象](https://dataxapi.com/zh/docs/objects/xingtu_campaign/)、[Channels share link（视频号分享链接）对象](https://dataxapi.com/zh/docs/objects/channels_share_link/)、[Topic（话题）对象](https://dataxapi.com/zh/docs/objects/topic/)、[Account owner（账号主体）对象](https://dataxapi.com/zh/docs/objects/account_owner/)、[Mini program（小程序）对象](https://dataxapi.com/zh/docs/objects/miniprogram/)、[Follower history（粉丝数变化）对象](https://dataxapi.com/zh/docs/objects/follower_history/)、[PGY creator costs and summary（蒲公英博主合作成本和数据概览）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_costs/)、[PGY creator follower summary（蒲公英博主粉丝概览）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_followers/)、[PGY creator core figures history（蒲公英博主核心数据趋势）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_cost_history/)

---

最后核对于 2026-11-26 12:17 UTC。目录修订号 0051cce45e9530b9。 [网页版](https://dataxapi.com/zh/docs/objects/channels_collection/)
