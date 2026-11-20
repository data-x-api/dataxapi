# PGY creator metrics（蒲公英博主数据表现）对象

PGY creator metrics（蒲公英博主数据表现）对象有 64 个字段，由小红书的 1 个接口返回。每次调用 $0.0400。它是预览结构，之后可能调整。

给机器读：[pgy_creator_metrics schema](https://dataxapi.com/openapi.json#/components/schemas/pgy_creator_metrics)、[openapi.json](https://dataxapi.com/openapi.json)、[对象表（JSON）](https://api.dataxapi.com/v1/catalog/objects)、[llms.txt](https://dataxapi.com/zh/llms.txt)

蒲公英博主数据表现（PGY creator metrics）是一位小红书博主近 30 天或 90 天日常笔记的表现，按蒲公英的统计：曝光、阅读、互动的中位数，互动率，点赞过百和过千的笔记占比。带 `_percentile` 的字段是超过了多少同类博主。

`creator_id` 是蒲公英博主搜索返回的博主编号。逐篇的笔记看蒲公英博主笔记，粉丝是谁看粉丝画像。

## 字段

平台给不了的字段不会出现在这条数据里，而是写在 `meta.unavailable` 里。不会用猜的数或 0 顶上。

| 字段 | 类型 | 起始档位 | 说明 |
| --- | --- | --- | --- |
| `creator_id` | 文本 | `compact` | 蒲公英博主编号 |
| `notes` | 整数 | `compact` | 统计周期内的笔记数 |
| `median_impressions` | 整数 | `compact` | 曝光数的中位数 |
| `median_reads` | 整数 | `compact` | 阅读数的中位数 |
| `median_engagements` | 整数 | `compact` | 互动数的中位数 |
| `median_likes` | 整数 | `standard` | 点赞数的中位数 |
| `median_favorites` | 整数 | `standard` | 收藏数的中位数 |
| `median_comments` | 整数 | `standard` | 评论数的中位数 |
| `median_shares` | 整数 | `standard` | 分享数的中位数 |
| `engagement_rate` | 数字 | `compact` | 互动率，0 到 1 |
| `video_completion_rate` | 数字 | `standard` | 视频笔记的完播率，0 到 1 |
| `image_3s_read_rate` | 数字 | `standard` | 图文笔记的 3 秒阅读率，0 到 1 |
| `hundred_like_share` | 数字 | `standard` | 点赞过百的笔记占比，0 到 1 |
| `thousand_like_share` | 数字 | `standard` | 点赞过千的笔记占比，0 到 1 |
| `impressions_percentile` | 数字 | `standard` | 曝光中位数超过了多少同类博主，0 到 1 |
| `reads_percentile` | 数字 | `standard` | 阅读中位数超过了多少同类博主，0 到 1 |
| `engagements_percentile` | 数字 | `standard` | 互动中位数超过了多少同类博主，0 到 1 |
| `video_notes` | 整数 | `standard` | 统计周期内的视频笔记数（含在 notes 里） |
| `video_completion_percentile` | 数字 | `standard` | 视频完播率超过了多少同类博主，0 到 1 |
| `median_follows` | 整数 | `standard` | 单篇笔记带来的涨粉数的中位数 |
| `traffic_sources` | 对象 | `standard` | 统计周期内这些笔记的流量从哪里来：曝光和阅读各自来自哪个入口的占比（蒲公英的“流量来源”），每组加起来是 1 |
| `traffic_sources.impressions` | 对象 | `standard` | 曝光的来源占比 |
| `traffic_sources.impressions.homefeed` | 数字 | `standard` | 曝光来自发现页（首页推荐）的占比，0 到 1 |
| `traffic_sources.impressions.search` | 数字 | `standard` | 曝光来自搜索的占比，0 到 1 |
| `traffic_sources.impressions.follow` | 数字 | `standard` | 曝光来自关注页的占比，0 到 1 |
| `traffic_sources.impressions.detail` | 数字 | `standard` | 曝光来自笔记详情页的占比，0 到 1 |
| `traffic_sources.impressions.nearby` | 数字 | `standard` | 曝光来自附近的占比，0 到 1 |
| `traffic_sources.impressions.other` | 数字 | `standard` | 曝光来自其他入口的占比，0 到 1 |
| `traffic_sources.reads` | 对象 | `standard` | 阅读的来源占比 |
| `traffic_sources.reads.homefeed` | 数字 | `standard` | 阅读来自发现页（首页推荐）的占比，0 到 1 |
| `traffic_sources.reads.search` | 数字 | `standard` | 阅读来自搜索的占比，0 到 1 |
| `traffic_sources.reads.follow` | 数字 | `standard` | 阅读来自关注页的占比，0 到 1 |
| `traffic_sources.reads.detail` | 数字 | `standard` | 阅读来自笔记详情页的占比，0 到 1 |
| `traffic_sources.reads.nearby` | 数字 | `standard` | 阅读来自附近的占比，0 到 1 |
| `traffic_sources.reads.other` | 数字 | `standard` | 阅读来自其他入口的占比，0 到 1 |
| `long_term` | 对象 | `full` | 长效表现（蒲公英的“长效笔记”）：大约半年前一段两个月里发布的笔记，平台把它们的阅读分成发布后“近期”和之后“长效”两段，各给阅读数、超过同行多少和阅读来源占比。tab=everyday 时是日常笔记的，tab=sponsored 时是合作笔记的。两段怎么划分平台没有说明 |
| `long_term.published_from` | 时间 | `full` | 这批笔记的发布日期从哪天起：中国时间（UTC+8）的一个自然日，写成这个日期的 UTC 零点 |
| `long_term.published_to` | 时间 | `full` | 这批笔记的发布日期到哪天止，写法同上 |
| `long_term.notes` | 整数 | `full` | 这段时间发布的笔记数；为 0 时下面各项都是 null |
| `long_term.recent_reads` | 整数 | `full` | 近期阅读：单篇笔记的数，平台给的代表值（和本接口的阅读中位数同一量级，平台没说是中位数还是平均数） |
| `long_term.recent_reads_percentile` | 数字 | `full` | 近期阅读超过了多少同类博主，0 到 1 |
| `long_term.long_term_reads` | 整数 | `full` | 长效阅读：单篇笔记的数，口径同近期阅读 |
| `long_term.long_term_reads_percentile` | 数字 | `full` | 长效阅读超过了多少同类博主，0 到 1 |
| `long_term.recent_sources` | 对象 | `full` | 近期阅读的来源占比，加起来是 1 |
| `long_term.recent_sources.homefeed` | 数字 | `full` | 近期阅读来自发现页的占比，0 到 1 |
| `long_term.recent_sources.search` | 数字 | `full` | 近期阅读来自搜索的占比，0 到 1 |
| `long_term.recent_sources.profile` | 数字 | `full` | 近期阅读来自博主主页的占比，0 到 1 |
| `long_term.recent_sources.follow` | 数字 | `full` | 近期阅读来自关注页的占比，0 到 1 |
| `long_term.recent_sources.other` | 数字 | `full` | 近期阅读来自其他入口的占比，0 到 1 |
| `long_term.long_term_sources` | 对象 | `full` | 长效阅读的来源占比，加起来是 1 |
| `long_term.long_term_sources.homefeed` | 数字 | `full` | 长效阅读来自发现页的占比，0 到 1 |
| `long_term.long_term_sources.search` | 数字 | `full` | 长效阅读来自搜索的占比，0 到 1 |
| `long_term.long_term_sources.profile` | 数字 | `full` | 长效阅读来自博主主页的占比，0 到 1 |
| `long_term.long_term_sources.follow` | 数字 | `full` | 长效阅读来自关注页的占比，0 到 1 |
| `long_term.long_term_sources.other` | 数字 | `full` | 长效阅读来自其他入口的占比，0 到 1 |
| `note_list` | 对象列表 | `full` | 统计周期内的笔记逐篇的数，按发布日期从早到晚；最多 15 篇（实测：周期内 34 篇时给了 15 篇），周期内没有笔记时为 null |
| `note_list[].id` | 文本 | `full` | 笔记编号 |
| `note_list[].title` | 文本 | `full` | 笔记标题 |
| `note_list[].type` | 文本 | `full` | 图文还是视频：`image`、`video` |
| `note_list[].published_at` | 时间 | `full` | 发布日期（平台只给到日，按北京时间那一天的零点给） |
| `note_list[].cover_url` | 链接 | `full` | 封面图地址 |
| `note_list[].impressions` | 整数 | `full` | 曝光数 |
| `note_list[].reads` | 整数 | `full` | 阅读数 |
| `note_list[].engagements` | 整数 | `full` | 互动数 |
| `note_list[].likes` | 整数 | `full` | 点赞数 |
| `note_list[].favorites` | 整数 | `full` | 收藏数 |
| `note_list[].impressions_vs_median` | 数字 | `full` | 这篇的曝光数比这位博主本期的曝光中位数高出多少：1.5 是高出 150%，-0.3 是低 30%，0 是正好等于中位数 |
| `note_list[].reads_vs_median` | 数字 | `full` | 这篇的阅读数比这位博主本期的阅读中位数高出多少：1.5 是高出 150%，-0.3 是低 30%，0 是正好等于中位数 |
| `note_list[].engagements_vs_median` | 数字 | `full` | 这篇的互动数比这位博主本期的互动中位数高出多少：1.5 是高出 150%，-0.3 是低 30%，0 是正好等于中位数 |
| `note_list[].likes_vs_median` | 数字 | `full` | 这篇的点赞数比这位博主本期的点赞中位数高出多少：1.5 是高出 150%，-0.3 是低 30%，0 是正好等于中位数 |
| `note_list[].favorites_vs_median` | 数字 | `full` | 这篇的收藏数比这位博主本期的收藏中位数高出多少：1.5 是高出 150%，-0.3 是低 30%，0 是正好等于中位数 |

## 返回 PGY creator metrics（蒲公英博主数据表现）的接口

### 小红书

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [小红书蒲公英博主数据表现](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/metrics.md) | `GET /v1/xiaohongshu/pgy/creators/metrics` | 蒲公英博主数据表现 | $0.0400 / 次 |

## 示例

`xiaohongshu.pgy.creators.metrics` 返回的一条，录制于 2026-10-12 21:53 UTC。名字、正文和编号是示例，链接也是；数字是原样。

```jsonc
{
  "creator_id": "622bd7c00000000007bc9f1a",
  "notes": 34,
  "median_impressions": 3535,
  "median_reads": 533,
  "median_engagements": 12,
  "median_likes": 10,
  "median_favorites": 2,
  "median_comments": 0,
  "median_shares": 3,
  "engagement_rate": 0.032,
  "video_completion_rate": 0.321,
  "image_3s_read_rate": 0.798,
  "hundred_like_share": 0.088,
  "thousand_like_share": 0,
  "impressions_percentile": 0.523,
  "reads_percentile": 0.476,
  "engagements_percentile": 0.333,
  "video_notes": 2,
  "video_completion_percentile": 0,
  "median_follows": 0,
  "traffic_sources": {
    "impressions": {
      "homefeed": 0.619,
      "search": 0.293,
      "follow": 0.036,
      "detail": 0.028,
      "nearby": 0.001,
      "other": 0.023
    },
    "reads": {
      "homefeed": 0.615,
      "search": 0.33,
      "follow": 0.013,
      "detail": 0.008,
      "nearby": 0,
      "other": 0.034
    }
  }
}
```

[完整的返回在这个接口的页面上 →](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/metrics.md)

## 相关

- [达人数据表现 API](https://dataxapi.com/zh/roles/creators-metrics/): 同一种动作在 2 个平台上的接口，带各平台的字段对照。
- [全部接口](https://dataxapi.com/zh/apis/): 目录里写明每个接口返回什么对象、多少钱。

## 其他对象

[Post（内容）对象](https://dataxapi.com/zh/docs/objects/post/)、[Comment（评论）对象](https://dataxapi.com/zh/docs/objects/comment/)、[Account（账号）对象](https://dataxapi.com/zh/docs/objects/account/)、[Trend（热点）对象](https://dataxapi.com/zh/docs/objects/trend/)、[Transcript（逐字稿）对象](https://dataxapi.com/zh/docs/objects/transcript/)、[Creator rates（达人报价）对象](https://dataxapi.com/zh/docs/objects/creator_rates/)、[Community（社区）对象](https://dataxapi.com/zh/docs/objects/community/)、[Product（商品）对象](https://dataxapi.com/zh/docs/objects/product/)、[Review（评价）对象](https://dataxapi.com/zh/docs/objects/review/)、[Keyword index history（关键词指数历史）对象](https://dataxapi.com/zh/docs/objects/keyword_history/)、[Related keyword（关联词）对象](https://dataxapi.com/zh/docs/objects/keyword_related/)、[Keyword audience（关键词人群画像）对象](https://dataxapi.com/zh/docs/objects/keyword_audience/)、[Account recent change（账号近期变化）对象](https://dataxapi.com/zh/docs/objects/account_history/)、[Brand index history（品牌指数历史）对象](https://dataxapi.com/zh/docs/objects/brand_history/)、[Brand index averages（品牌指数均值）对象](https://dataxapi.com/zh/docs/objects/brand_metrics/)、[Creator（达人）对象](https://dataxapi.com/zh/docs/objects/creator/)、[Audience（粉丝画像）对象](https://dataxapi.com/zh/docs/objects/audience/)、[Xingtu creator metrics（星图达人传播数据）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_metrics/)、[Xingtu creator video（星图达人作品）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_post/)、[PGY creator note（蒲公英博主笔记）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_post/)、[PGY note detail（蒲公英笔记详情）对象](https://dataxapi.com/zh/docs/objects/pgy_note/)、[Ad（广告）对象](https://dataxapi.com/zh/docs/objects/ad/)、[Advertiser（广告主）对象](https://dataxapi.com/zh/docs/objects/advertiser/)、[Douyin trend-index creator metrics（巨量算数达人核心指标）对象](https://dataxapi.com/zh/docs/objects/index_creator_metrics/)、[Xingtu creator content keywords（星图达人内容热词）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_keywords/)、[Xingtu creator scores（星图达人指数）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_scores/)、[Xingtu creator content mix（星图达人内容分布）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_content_mix/)、[Xingtu creator conversion（星图达人转化能力）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_conversion/)、[Xingtu campaign（星图营销活动）对象](https://dataxapi.com/zh/docs/objects/xingtu_campaign/)、[Channels collection（视频号合集）对象](https://dataxapi.com/zh/docs/objects/channels_collection/)、[Channels share link（视频号分享链接）对象](https://dataxapi.com/zh/docs/objects/channels_share_link/)、[Topic（话题）对象](https://dataxapi.com/zh/docs/objects/topic/)、[Account owner（账号主体）对象](https://dataxapi.com/zh/docs/objects/account_owner/)、[Mini program（小程序）对象](https://dataxapi.com/zh/docs/objects/miniprogram/)、[Follower history（粉丝数变化）对象](https://dataxapi.com/zh/docs/objects/follower_history/)、[PGY creator costs and summary（蒲公英博主合作成本和数据概览）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_costs/)、[PGY creator follower summary（蒲公英博主粉丝概览）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_followers/)、[PGY creator core figures history（蒲公英博主核心数据趋势）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_cost_history/)

---

最后核对于 2026-11-20 07:17 UTC。目录修订号 720fc3ea8dadb865。 [网页版](https://dataxapi.com/zh/docs/objects/pgy_creator_metrics/)
