# PGY note detail（蒲公英笔记详情）对象

PGY note detail（蒲公英笔记详情）对象有 21 个字段，由小红书的 1 个接口返回。每次调用 $0.0400。它是预览结构，之后可能调整。

给机器读：[pgy_note schema](https://dataxapi.com/openapi.json#/components/schemas/pgy_note)、[openapi.json](https://dataxapi.com/openapi.json)、[对象表（JSON）](https://api.dataxapi.com/v1/catalog/objects)、[llms.txt](https://dataxapi.com/zh/llms.txt)

## 字段

平台给不了的字段不会出现在这条数据里，而是写在 `meta.unavailable` 里。不会用猜的数或 0 顶上。

| 字段 | 类型 | 起始档位 | 说明 |
| --- | --- | --- | --- |
| `id` | 文本 | `compact` | 笔记编号 |
| `url` | 链接 | `compact` | 笔记链接，带平台给的访问令牌，能直接打开 |
| `type` | 文本 | `compact` | 图文还是视频：`image`、`video` |
| `title` | 文本 | `compact` | 笔记标题 |
| `text` | 文本 | `standard` | 笔记正文 |
| `published_at` | 时间 | `compact` | 发布时间 |
| `images` | 链接列表 | `standard` | 图片地址，按笔记里的顺序 |
| `creator_id` | 文本 | `compact` | 博主的蒲公英博主编号，可直接用于其他蒲公英博主接口 |
| `creator_name` | 文本 | `compact` | 博主昵称 |
| `brand` | 文本 | `compact` | 这篇笔记报备的合作品牌，平台的原话；不是报备的合作笔记时为 null |
| `brand_id` | 文本 | `standard` | 报备品牌的小红书账号编号；没有时为 null |
| `metrics` | 对象 | `compact` | 蒲公英给这篇笔记的数 |
| `metrics.impressions` | 整数 | `compact` | 曝光数 |
| `metrics.views` | 整数 | `compact` | 阅读数 |
| `metrics.likes` | 整数 | `compact` | 点赞数 |
| `metrics.favorites` | 整数 | `compact` | 收藏数 |
| `metrics.comments` | 整数 | `compact` | 评论数 |
| `metrics.shares` | 整数 | `compact` | 分享数 |
| `metrics.follows` | 整数 | `compact` | 这篇笔记带来的涨粉数 |
| `component_clicks` | 对象 | `standard` | 品牌在笔记里挂的组件各自的点击率档位（蒲公英的“组件点击”）；整篇没有这项数据时为 null |
| `component_clicks.comment_area` | 文本 | `standard` | 评论区组件的点击率档位：normal 正常（0–2%）、high 较高（2%–10%）、very_high 极高（10% 以上），蒲公英的分档；这篇笔记没挂这个组件时为 null：`normal`、`high`、`very_high` |
| `component_clicks.content` | 文本 | `standard` | 正文组件的点击率档位：normal 正常（0–2%）、high 较高（2%–10%）、very_high 极高（10% 以上），蒲公英的分档；这篇笔记没挂这个组件时为 null：`normal`、`high`、`very_high` |
| `component_clicks.note_bottom` | 文本 | `standard` | 笔记底部组件的点击率档位：normal 正常（0–2%）、high 较高（2%–10%）、very_high 极高（10% 以上），蒲公英的分档；这篇笔记没挂这个组件时为 null：`normal`、`high`、`very_high` |

## 返回 PGY note detail（蒲公英笔记详情）的接口

### 小红书

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [小红书蒲公英笔记数据](https://dataxapi.com/zh/apis/xiaohongshu/pgy/notes/get.md) | `GET /v1/xiaohongshu/pgy/notes/get` | 蒲公英笔记详情 | $0.0400 / 次 |

## 示例

`xiaohongshu.pgy.notes.get` 返回的一条，录制于 2026-11-10 19:33 UTC。名字、正文和编号是示例，链接也是；数字是原样。

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
    // … 另有 13 条
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

[完整的返回在这个接口的页面上 →](https://dataxapi.com/zh/apis/xiaohongshu/pgy/notes/get.md)

## 相关

- [全部接口](https://dataxapi.com/zh/apis/): 目录里写明每个接口返回什么对象、多少钱。

## 其他对象

[Post（内容）对象](https://dataxapi.com/zh/docs/objects/post/)、[Comment（评论）对象](https://dataxapi.com/zh/docs/objects/comment/)、[Account（账号）对象](https://dataxapi.com/zh/docs/objects/account/)、[Trend（热点）对象](https://dataxapi.com/zh/docs/objects/trend/)、[Transcript（逐字稿）对象](https://dataxapi.com/zh/docs/objects/transcript/)、[Creator rates（达人报价）对象](https://dataxapi.com/zh/docs/objects/creator_rates/)、[Community（社区）对象](https://dataxapi.com/zh/docs/objects/community/)、[Product（商品）对象](https://dataxapi.com/zh/docs/objects/product/)、[Review（评价）对象](https://dataxapi.com/zh/docs/objects/review/)、[Keyword index history（关键词指数历史）对象](https://dataxapi.com/zh/docs/objects/keyword_history/)、[Related keyword（关联词）对象](https://dataxapi.com/zh/docs/objects/keyword_related/)、[Keyword audience（关键词人群画像）对象](https://dataxapi.com/zh/docs/objects/keyword_audience/)、[Account recent change（账号近期变化）对象](https://dataxapi.com/zh/docs/objects/account_history/)、[Brand index history（品牌指数历史）对象](https://dataxapi.com/zh/docs/objects/brand_history/)、[Brand index averages（品牌指数均值）对象](https://dataxapi.com/zh/docs/objects/brand_metrics/)、[Creator（达人）对象](https://dataxapi.com/zh/docs/objects/creator/)、[Audience（粉丝画像）对象](https://dataxapi.com/zh/docs/objects/audience/)、[Xingtu creator metrics（星图达人传播数据）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_metrics/)、[Xingtu creator video（星图达人作品）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_post/)、[PGY creator metrics（蒲公英博主数据表现）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_metrics/)、[PGY creator note（蒲公英博主笔记）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_post/)、[Ad（广告）对象](https://dataxapi.com/zh/docs/objects/ad/)、[Advertiser（广告主）对象](https://dataxapi.com/zh/docs/objects/advertiser/)、[Douyin trend-index creator metrics（巨量算数达人核心指标）对象](https://dataxapi.com/zh/docs/objects/index_creator_metrics/)、[Xingtu creator content keywords（星图达人内容热词）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_keywords/)、[Xingtu creator scores（星图达人指数）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_scores/)、[Xingtu creator content mix（星图达人内容分布）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_content_mix/)、[Xingtu creator conversion（星图达人转化能力）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_conversion/)、[Xingtu campaign（星图营销活动）对象](https://dataxapi.com/zh/docs/objects/xingtu_campaign/)、[Channels collection（视频号合集）对象](https://dataxapi.com/zh/docs/objects/channels_collection/)、[Channels share link（视频号分享链接）对象](https://dataxapi.com/zh/docs/objects/channels_share_link/)、[Topic（话题）对象](https://dataxapi.com/zh/docs/objects/topic/)、[Account owner（账号主体）对象](https://dataxapi.com/zh/docs/objects/account_owner/)、[Mini program（小程序）对象](https://dataxapi.com/zh/docs/objects/miniprogram/)、[Follower history（粉丝数变化）对象](https://dataxapi.com/zh/docs/objects/follower_history/)、[PGY creator costs and summary（蒲公英博主合作成本和数据概览）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_costs/)、[PGY creator follower summary（蒲公英博主粉丝概览）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_followers/)、[PGY creator core figures history（蒲公英博主核心数据趋势）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_cost_history/)

---

最后核对于 2026-11-20 07:17 UTC。目录修订号 720fc3ea8dadb865。 [网页版](https://dataxapi.com/zh/docs/objects/pgy_note/)
