# PGY creator follower summary（蒲公英博主粉丝概览）对象

PGY creator follower summary（蒲公英博主粉丝概览）对象有 16 个字段，由小红书的 1 个接口返回。每次调用 $0.0400。它是预览结构，之后可能调整。

给机器读：[pgy_creator_followers schema](https://dataxapi.com/openapi.json#/components/schemas/pgy_creator_followers)、[openapi.json](https://dataxapi.com/openapi.json)、[对象表（JSON）](https://api.dataxapi.com/v1/catalog/objects)、[llms.txt](https://dataxapi.com/zh/llms.txt)

## 字段

平台给不了的字段不会出现在这条数据里，而是写在 `meta.unavailable` 里。不会用猜的数或 0 顶上。

| 字段 | 类型 | 起始档位 | 说明 |
| --- | --- | --- | --- |
| `creator_id` | 文本 | `compact` | 蒲公英博主编号 |
| `followers` | 整数 | `compact` | 粉丝数 |
| `gained` | 整数 | `compact` | 近 30 天粉丝净增多少，掉粉时为负 |
| `growth` | 数字 | `compact` | 近 30 天粉丝增长率：0.008 是涨了 0.8%，掉粉时为负 |
| `growth_percentile` | 数字 | `standard` | 粉丝增长率超过了多少同类博主，0 到 1 |
| `active_followers` | 整数 | `compact` | 活跃粉丝数：近 28 天在小红书上活跃过的粉丝 |
| `active_share` | 数字 | `compact` | 活跃粉丝占全部粉丝的比例，0 到 1 |
| `active_percentile` | 数字 | `standard` | 活跃粉丝占比超过了多少同类博主，0 到 1 |
| `engaged_followers` | 整数 | `compact` | 互动粉丝数：近 30 天和这位博主的笔记有过互动的粉丝 |
| `engaged_share` | 数字 | `compact` | 互动粉丝占全部粉丝的比例，0 到 1 |
| `engaged_percentile` | 数字 | `standard` | 互动粉丝占比超过了多少同类博主，0 到 1 |
| `reading_followers` | 整数 | `compact` | 阅读粉丝数：近 30 天读过这位博主笔记的粉丝 |
| `reading_share` | 数字 | `compact` | 阅读粉丝占全部粉丝的比例，0 到 1 |
| `reading_percentile` | 数字 | `standard` | 阅读粉丝占比超过了多少同类博主，0 到 1 |
| `buying_followers` | 整数 | `compact` | 购买粉丝数：近 30 天在小红书上买过东西的粉丝 |
| `buying_share` | 数字 | `compact` | 购买粉丝占全部粉丝的比例，0 到 1 |

## 返回 PGY creator follower summary（蒲公英博主粉丝概览）的接口

### 小红书

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [小红书蒲公英博主粉丝概览](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/followers/metrics.md) | `GET /v1/xiaohongshu/pgy/creators/followers/metrics` | 蒲公英博主粉丝概览 | $0.0400 / 次 |

## 示例

`xiaohongshu.pgy.creators.followers.metrics` 返回的一条，录制于 2026-11-10 09:54 UTC。名字、正文和编号是示例，链接也是；数字是原样。

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

[完整的返回在这个接口的页面上 →](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/followers/metrics.md)

## 相关

- [全部接口](https://dataxapi.com/zh/apis/): 目录里写明每个接口返回什么对象、多少钱。

## 其他对象

[Post（内容）对象](https://dataxapi.com/zh/docs/objects/post/)、[Comment（评论）对象](https://dataxapi.com/zh/docs/objects/comment/)、[Account（账号）对象](https://dataxapi.com/zh/docs/objects/account/)、[Trend（热点）对象](https://dataxapi.com/zh/docs/objects/trend/)、[Transcript（逐字稿）对象](https://dataxapi.com/zh/docs/objects/transcript/)、[Media files（视频和图片文件）对象](https://dataxapi.com/zh/docs/objects/media/)、[Music（音乐）对象](https://dataxapi.com/zh/docs/objects/music/)、[Creator rates（达人报价）对象](https://dataxapi.com/zh/docs/objects/creator_rates/)、[Community（社区）对象](https://dataxapi.com/zh/docs/objects/community/)、[Product（商品）对象](https://dataxapi.com/zh/docs/objects/product/)、[Review（评价）对象](https://dataxapi.com/zh/docs/objects/review/)、[Keyword index history（关键词指数历史）对象](https://dataxapi.com/zh/docs/objects/keyword_history/)、[Related keyword（关联词）对象](https://dataxapi.com/zh/docs/objects/keyword_related/)、[Keyword audience（关键词人群画像）对象](https://dataxapi.com/zh/docs/objects/keyword_audience/)、[Account recent change（账号近期变化）对象](https://dataxapi.com/zh/docs/objects/account_history/)、[Brand index history（品牌指数历史）对象](https://dataxapi.com/zh/docs/objects/brand_history/)、[Brand index averages（品牌指数均值）对象](https://dataxapi.com/zh/docs/objects/brand_metrics/)、[Creator（达人）对象](https://dataxapi.com/zh/docs/objects/creator/)、[Audience（粉丝画像）对象](https://dataxapi.com/zh/docs/objects/audience/)、[Xingtu creator metrics（星图达人传播数据）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_metrics/)、[Xingtu creator video（星图达人作品）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_post/)、[PGY creator metrics（蒲公英博主数据表现）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_metrics/)、[PGY creator note（蒲公英博主笔记）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_post/)、[PGY note detail（蒲公英笔记详情）对象](https://dataxapi.com/zh/docs/objects/pgy_note/)、[Ad（广告）对象](https://dataxapi.com/zh/docs/objects/ad/)、[Advertiser（广告主）对象](https://dataxapi.com/zh/docs/objects/advertiser/)、[Douyin trend-index creator metrics（巨量算数达人核心指标）对象](https://dataxapi.com/zh/docs/objects/index_creator_metrics/)、[Xingtu creator content keywords（星图达人内容热词）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_keywords/)、[Xingtu creator scores（星图达人指数）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_scores/)、[Xingtu creator content mix（星图达人内容分布）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_content_mix/)、[Xingtu creator conversion（星图达人转化能力）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_conversion/)、[Xingtu campaign（星图营销活动）对象](https://dataxapi.com/zh/docs/objects/xingtu_campaign/)、[Channels collection（视频号合集）对象](https://dataxapi.com/zh/docs/objects/channels_collection/)、[Channels share link（视频号分享链接）对象](https://dataxapi.com/zh/docs/objects/channels_share_link/)、[Topic（话题）对象](https://dataxapi.com/zh/docs/objects/topic/)、[Account owner（账号主体）对象](https://dataxapi.com/zh/docs/objects/account_owner/)、[Mini program（小程序）对象](https://dataxapi.com/zh/docs/objects/miniprogram/)、[Follower history（粉丝数变化）对象](https://dataxapi.com/zh/docs/objects/follower_history/)、[PGY creator costs and summary（蒲公英博主合作成本和数据概览）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_costs/)、[PGY creator core figures history（蒲公英博主核心数据趋势）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_cost_history/)

---

最后核对于 2026-11-26 12:17 UTC。目录修订号 0051cce45e9530b9。 [网页版](https://dataxapi.com/zh/docs/objects/pgy_creator_followers/)
