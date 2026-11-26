# PGY creator costs and summary（蒲公英博主合作成本和数据概览）对象

PGY creator costs and summary（蒲公英博主合作成本和数据概览）对象有 39 个字段，由小红书的 1 个接口返回。每次调用 $0.0400。它是预览结构，之后可能调整。

给机器读：[pgy_creator_costs schema](https://dataxapi.com/openapi.json#/components/schemas/pgy_creator_costs)、[openapi.json](https://dataxapi.com/openapi.json)、[对象表（JSON）](https://api.dataxapi.com/v1/catalog/objects)、[llms.txt](https://dataxapi.com/zh/llms.txt)

## 字段

平台给不了的字段不会出现在这条数据里，而是写在 `meta.unavailable` 里。不会用猜的数或 0 顶上。

| 字段 | 类型 | 起始档位 | 说明 |
| --- | --- | --- | --- |
| `creator_id` | 文本 | `compact` | 蒲公英博主编号 |
| `date` | 时间 | `compact` | 数据算到哪一天：中国时间（UTC+8）的一个自然日，写成这个日期的 UTC 零点 |
| `currency` | 文本 | `compact` | 下面各项单价的货币 |
| `image_cpm` | 金额 | `compact` | 图文笔记的预估 CPM（每千次曝光的花费），人民币元；蒲公英没有估出来时为 null |
| `image_cpm_percentile` | 数字 | `standard` | 图文预估 CPM低于多少同类博主（蒲公英的“优于同行”），0 到 1 |
| `video_cpm` | 金额 | `compact` | 视频笔记的预估 CPM（每千次曝光的花费），人民币元；蒲公英没有估出来时为 null |
| `video_cpm_percentile` | 数字 | `standard` | 视频预估 CPM低于多少同类博主（蒲公英的“优于同行”），0 到 1 |
| `image_cpe` | 金额 | `compact` | 图文笔记的预估互动单价（每次互动的花费），人民币元；蒲公英没有估出来时为 null |
| `image_cpe_percentile` | 数字 | `standard` | 图文预估互动单价低于多少同类博主（蒲公英的“优于同行”），0 到 1 |
| `video_cpe` | 金额 | `compact` | 视频笔记的预估互动单价（每次互动的花费），人民币元；蒲公英没有估出来时为 null |
| `video_cpe_percentile` | 数字 | `standard` | 视频预估互动单价低于多少同类博主（蒲公英的“优于同行”），0 到 1 |
| `image_read_cost` | 金额 | `compact` | 图文笔记的预估阅读单价（每次阅读的花费），人民币元；蒲公英没有估出来时为 null |
| `image_read_cost_percentile` | 数字 | `standard` | 图文预估阅读单价低于多少同类博主（蒲公英的“优于同行”），0 到 1 |
| `video_read_cost` | 金额 | `compact` | 视频笔记的预估阅读单价（每次阅读的花费），人民币元；蒲公英没有估出来时为 null |
| `video_read_cost_percentile` | 数字 | `standard` | 视频预估阅读单价低于多少同类博主（蒲公英的“优于同行”），0 到 1 |
| `image_shop_visit_cost` | 金额 | `compact` | 图文笔记的预估外溢进店单价（笔记带来的每一位进店访客的花费），人民币元；蒲公英没有估出来时为 null |
| `image_shop_visit_cost_percentile` | 数字 | `standard` | 图文预估外溢进店单价低于多少同类博主（蒲公英的“优于同行”），0 到 1 |
| `video_shop_visit_cost` | 金额 | `compact` | 视频笔记的预估外溢进店单价（笔记带来的每一位进店访客的花费），人民币元；蒲公英没有估出来时为 null |
| `video_shop_visit_cost_percentile` | 数字 | `standard` | 视频预估外溢进店单价低于多少同类博主（蒲公英的“优于同行”），0 到 1 |
| `median_impressions` | 整数 | `compact` | 单篇笔记曝光数的中位数 |
| `median_impressions_percentile` | 数字 | `standard` | 曝光中位数超过了多少同类博主，0 到 1 |
| `median_reads` | 整数 | `compact` | 单篇笔记阅读数的中位数 |
| `median_reads_percentile` | 数字 | `standard` | 阅读中位数超过了多少同类博主，0 到 1 |
| `median_engagements` | 整数 | `compact` | 单篇笔记互动数的中位数 |
| `median_engagements_percentile` | 数字 | `standard` | 互动中位数超过了多少同类博主，0 到 1 |
| `median_shop_visits` | 整数 | `compact` | 单篇笔记带来的外溢进店人数的中位数 |
| `median_shop_visits_percentile` | 数字 | `standard` | 外溢进店中位数超过了多少同类博主，0 到 1 |
| `follower_growth` | 数字 | `standard` | 近 30 天粉丝增长率：0.037 是涨了 3.7%，掉粉时为负 |
| `follower_growth_percentile` | 数字 | `standard` | 近 30 天粉丝增长率超过了多少同类博主，0 到 1 |
| `invite_reply_rate` | 数字 | `standard` | 合作邀约在 48 小时内回复的比例，0 到 1 |
| `easy_to_reach` | 是否 | `standard` | 蒲公英是否给这位博主标了“好联系”（页面上邀约回复率旁的标记） |
| `active_days_7d` | 整数 | `standard` | 近 7 天里活跃的天数 |
| `is_active` | 是否 | `standard` | 蒲公英是否给这位博主标了“活跃”（页面上近 7 天活跃天数旁的标记） |
| `notes_30d` | 整数 | `standard` | 近 30 天发布的笔记数，日常笔记和合作笔记都算（页面上的“发布笔记”），不随 tab 变 |
| `highlight` | 文本 | `standard` | 蒲公英给这位博主标的优势，平台的原话（一种博主类型的称号）；没有时为 null |
| `highlight_reason` | 文本 | `standard` | 这个优势的说明，平台的原话（如某项指标排在同行的前百分之几） |
| `content_mix` | 对象列表 | `standard` | 笔记的内容类型占比，占比高的在前 |
| `content_mix[].category` | 文本 | `standard` | 内容类型，平台的原话 |
| `content_mix[].share` | 数字 | `standard` | 占比，0 到 1 |
| `industries` | 文本列表 | `standard` | 合作过的行业，平台的原话 |

## 返回 PGY creator costs and summary（蒲公英博主合作成本和数据概览）的接口

### 小红书

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [小红书蒲公英博主合作成本和数据概览](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/costs/metrics.md) | `GET /v1/xiaohongshu/pgy/creators/costs/metrics` | 蒲公英博主合作成本和数据概览 | $0.0400 / 次 |

## 示例

`xiaohongshu.pgy.creators.costs.metrics` 返回的一条，录制于 2026-11-10 09:54 UTC。名字、正文和编号是示例，链接也是；数字是原样。

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

[完整的返回在这个接口的页面上 →](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/costs/metrics.md)

## 相关

- [全部接口](https://dataxapi.com/zh/apis/): 目录里写明每个接口返回什么对象、多少钱。

## 其他对象

[Post（内容）对象](https://dataxapi.com/zh/docs/objects/post/)、[Comment（评论）对象](https://dataxapi.com/zh/docs/objects/comment/)、[Account（账号）对象](https://dataxapi.com/zh/docs/objects/account/)、[Trend（热点）对象](https://dataxapi.com/zh/docs/objects/trend/)、[Transcript（逐字稿）对象](https://dataxapi.com/zh/docs/objects/transcript/)、[Media files（视频和图片文件）对象](https://dataxapi.com/zh/docs/objects/media/)、[Music（音乐）对象](https://dataxapi.com/zh/docs/objects/music/)、[Creator rates（达人报价）对象](https://dataxapi.com/zh/docs/objects/creator_rates/)、[Community（社区）对象](https://dataxapi.com/zh/docs/objects/community/)、[Product（商品）对象](https://dataxapi.com/zh/docs/objects/product/)、[Review（评价）对象](https://dataxapi.com/zh/docs/objects/review/)、[Keyword index history（关键词指数历史）对象](https://dataxapi.com/zh/docs/objects/keyword_history/)、[Related keyword（关联词）对象](https://dataxapi.com/zh/docs/objects/keyword_related/)、[Keyword audience（关键词人群画像）对象](https://dataxapi.com/zh/docs/objects/keyword_audience/)、[Account recent change（账号近期变化）对象](https://dataxapi.com/zh/docs/objects/account_history/)、[Brand index history（品牌指数历史）对象](https://dataxapi.com/zh/docs/objects/brand_history/)、[Brand index averages（品牌指数均值）对象](https://dataxapi.com/zh/docs/objects/brand_metrics/)、[Creator（达人）对象](https://dataxapi.com/zh/docs/objects/creator/)、[Audience（粉丝画像）对象](https://dataxapi.com/zh/docs/objects/audience/)、[Xingtu creator metrics（星图达人传播数据）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_metrics/)、[Xingtu creator video（星图达人作品）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_post/)、[PGY creator metrics（蒲公英博主数据表现）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_metrics/)、[PGY creator note（蒲公英博主笔记）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_post/)、[PGY note detail（蒲公英笔记详情）对象](https://dataxapi.com/zh/docs/objects/pgy_note/)、[Ad（广告）对象](https://dataxapi.com/zh/docs/objects/ad/)、[Advertiser（广告主）对象](https://dataxapi.com/zh/docs/objects/advertiser/)、[Douyin trend-index creator metrics（巨量算数达人核心指标）对象](https://dataxapi.com/zh/docs/objects/index_creator_metrics/)、[Xingtu creator content keywords（星图达人内容热词）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_keywords/)、[Xingtu creator scores（星图达人指数）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_scores/)、[Xingtu creator content mix（星图达人内容分布）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_content_mix/)、[Xingtu creator conversion（星图达人转化能力）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_conversion/)、[Xingtu campaign（星图营销活动）对象](https://dataxapi.com/zh/docs/objects/xingtu_campaign/)、[Channels collection（视频号合集）对象](https://dataxapi.com/zh/docs/objects/channels_collection/)、[Channels share link（视频号分享链接）对象](https://dataxapi.com/zh/docs/objects/channels_share_link/)、[Topic（话题）对象](https://dataxapi.com/zh/docs/objects/topic/)、[Account owner（账号主体）对象](https://dataxapi.com/zh/docs/objects/account_owner/)、[Mini program（小程序）对象](https://dataxapi.com/zh/docs/objects/miniprogram/)、[Follower history（粉丝数变化）对象](https://dataxapi.com/zh/docs/objects/follower_history/)、[PGY creator follower summary（蒲公英博主粉丝概览）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_followers/)、[PGY creator core figures history（蒲公英博主核心数据趋势）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_cost_history/)

---

最后核对于 2026-11-26 12:17 UTC。目录修订号 0051cce45e9530b9。 [网页版](https://dataxapi.com/zh/docs/objects/pgy_creator_costs/)
