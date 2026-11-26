# Audience（粉丝画像）对象

2 个平台的 4 个接口都返回 Audience（粉丝画像）对象，32 个字段名完全一样，给一个平台写的代码不用改就能读其他平台。每次调用 $0.0020 到 $0.0400。它是预览结构，之后可能调整。

给机器读：[audience schema](https://dataxapi.com/openapi.json#/components/schemas/audience)、[openapi.json](https://dataxapi.com/openapi.json)、[对象表（JSON）](https://api.dataxapi.com/v1/catalog/objects)、[llms.txt](https://dataxapi.com/zh/llms.txt)

粉丝画像（Audience）是一位达人的粉丝都是谁，按性别、年龄、省份、城市、兴趣、手机品牌分，每一段带 0 到 1 的占比 `share`。星图还给每一段的粉丝数，并另按城市等级、消费人群、购买品类和每单消费金额分。

`creator_id` 说明是谁的粉丝：星图或蒲公英的达人编号；来自巨量算数的，则是抖音账号的数字编号（uid），不限于商业合作平台上的达人。蒲公英的画像用 `measured_at` 写明是哪一天的数据。

## 字段

平台给不了的字段不会出现在这条数据里，而是写在 `meta.unavailable` 里。不会用猜的数或 0 顶上。

| 字段 | 类型 | 起始档位 | 说明 |
| --- | --- | --- | --- |
| `creator_id` | 文本 | `compact` | 达人编号 |
| `measured_at` | 时间 | `compact` | 这份画像是哪一天的数据（按北京时间那一天的零点给） |
| `gender` | 对象列表 | `compact` | 按性别分 |
| `gender[].name` | 文本 | `compact` | 这一段的名称，平台的原话（性别的两段平台给的是英文小写） |
| `gender[].share` | 数字 | `compact` | 这一段占所列各段的比例，0 到 1 |
| `gender[].count` | 整数 | `compact` | 这一段的粉丝数 |
| `age` | 对象列表 | `compact` | 按年龄段分 |
| `age[].name` | 文本 | `compact` | 这一段的名称，平台的原话（性别的两段平台给的是英文小写） |
| `age[].share` | 数字 | `compact` | 这一段占所列各段的比例，0 到 1 |
| `age[].count` | 整数 | `compact` | 这一段的粉丝数 |
| `province` | 对象列表 | `compact` | 按省份分 |
| `province[].name` | 文本 | `compact` | 这一段的名称，平台的原话（性别的两段平台给的是英文小写） |
| `province[].share` | 数字 | `compact` | 这一段占所列各段的比例，0 到 1 |
| `province[].count` | 整数 | `compact` | 这一段的粉丝数 |
| `city` | 对象列表 | `compact` | 按城市分，只列粉丝最多的几个 |
| `city[].name` | 文本 | `compact` | 这一段的名称，平台的原话（性别的两段平台给的是英文小写） |
| `city[].share` | 数字 | `compact` | 这一段占所列各段的比例，0 到 1 |
| `city[].count` | 整数 | `compact` | 这一段的粉丝数 |
| `interest` | 对象列表 | `compact` | 按兴趣分 |
| `interest[].name` | 文本 | `compact` | 这一段的名称，平台的原话（性别的两段平台给的是英文小写） |
| `interest[].share` | 数字 | `compact` | 这一段占所列各段的比例，0 到 1 |
| `interest[].count` | 整数 | `compact` | 这一段的粉丝数 |
| `device` | 对象列表 | `compact` | 按手机品牌分 |
| `device[].name` | 文本 | `compact` | 这一段的名称，平台的原话（性别的两段平台给的是英文小写） |
| `device[].share` | 数字 | `compact` | 这一段占所列各段的比例，0 到 1 |
| `device[].count` | 整数 | `compact` | 这一段的粉丝数 |
| `city_tier` | 对象列表 | `compact` | 按城市等级分 |
| `city_tier[].name` | 文本 | `compact` | 这一段的名称，平台的原话（性别的两段平台给的是英文小写） |
| `city_tier[].share` | 数字 | `compact` | 这一段占所列各段的比例，0 到 1 |
| `city_tier[].count` | 整数 | `compact` | 这一段的粉丝数 |
| `crowd` | 对象列表 | `compact` | 按平台划分的消费人群分 |
| `crowd[].name` | 文本 | `compact` | 这一段的名称，平台的原话（性别的两段平台给的是英文小写） |
| `crowd[].share` | 数字 | `compact` | 这一段占所列各段的比例，0 到 1 |
| `crowd[].count` | 整数 | `compact` | 这一段的粉丝数 |
| `purchase_category` | 对象列表 | `compact` | 按购买的品类分 |
| `purchase_category[].name` | 文本 | `compact` | 这一段的名称，平台的原话（性别的两段平台给的是英文小写） |
| `purchase_category[].share` | 数字 | `compact` | 这一段占所列各段的比例，0 到 1 |
| `purchase_category[].count` | 整数 | `compact` | 这一段的粉丝数 |
| `purchase_amount` | 对象列表 | `compact` | 按每单的消费金额分 |
| `purchase_amount[].name` | 文本 | `compact` | 这一段的名称，平台的原话（性别的两段平台给的是英文小写） |
| `purchase_amount[].share` | 数字 | `compact` | 这一段占所列各段的比例，0 到 1 |
| `purchase_amount[].count` | 整数 | `compact` | 这一段的粉丝数 |

## 每个数取的是平台上的哪个数

同一个字段名，在不同平台上对应的动作不完全一样。这张表写明这个字段取的是平台自己的哪个数。

| 字段 | 在那里是什么 | 平台 |
| --- | --- | --- |
| `gender.share` | 平台只给各段的粉丝数；占比是这一段的粉丝数除以所列各段的合计（城市只列前十个） | 抖音 |
| `age.share` | 平台只给各段的粉丝数；占比是这一段的粉丝数除以所列各段的合计（城市只列前十个） | 抖音 |
| `province.share` | 平台只给各段的粉丝数；占比是这一段的粉丝数除以所列各段的合计（城市只列前十个） | 抖音 |
| `city` | 这里列的是平台给的全部城市（两百多个），不只是粉丝最多的几个 | 抖音 |
| `city.share` | 平台只给各段的粉丝数；占比是这一段的粉丝数除以所列各段的合计（城市只列前十个） | 抖音 |
| `interest.share` | 平台只给各段的粉丝数；占比是这一段的粉丝数除以所列各段的合计（城市只列前十个） | 抖音 |
| `device.share` | 平台只给各段的粉丝数；占比是这一段的粉丝数除以所列各段的合计（城市只列前十个） | 抖音 |
| `city_tier.share` | 平台只给各段的粉丝数；占比是这一段的粉丝数除以所列各段的合计（城市只列前十个） | 抖音 |
| `crowd.share` | 平台只给各段的粉丝数；占比是这一段的粉丝数除以所列各段的合计（城市只列前十个） | 抖音 |
| `purchase_category.share` | 平台只给各段的粉丝数；占比是这一段的粉丝数除以所列各段的合计（城市只列前十个） | 抖音 |
| `purchase_amount.share` | 平台只给各段的粉丝数；占比是这一段的粉丝数除以所列各段的合计（城市只列前十个） | 抖音 |

## 哪些平台给不了哪些字段

一个平台的所有接口都给不了某个字段时，它才列在那个字段后面。

| 字段 | 给不了的平台 |
| --- | --- |
| `measured_at` | 抖音 |
| `gender[].count` | 小红书 |
| `age[].count` | 小红书 |
| `province[].count` | 小红书 |
| `city[].count` | 小红书 |
| `interest[].count` | 小红书 |
| `device[].count` | 小红书 |
| `city_tier[].name` | 小红书 |
| `city_tier[].share` | 小红书 |
| `city_tier[].count` | 小红书 |
| `crowd[].name` | 小红书 |
| `crowd[].share` | 小红书 |
| `crowd[].count` | 小红书 |
| `purchase_category[].name` | 小红书 |
| `purchase_category[].share` | 小红书 |
| `purchase_category[].count` | 小红书 |
| `purchase_amount[].name` | 小红书 |
| `purchase_amount[].share` | 小红书 |
| `purchase_amount[].count` | 小红书 |

同一个平台上，可能一个接口给不了、另一个接口能给：每个接口的页面列着它给不了的字段，每次返回也都写在 `meta.unavailable` 里。

## 返回 Audience（粉丝画像）的接口

### 抖音

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [抖音巨量算数达人粉丝画像](https://dataxapi.com/zh/apis/douyin/index/creators/audience/get.md) | `GET /v1/douyin/index/creators/audience/get` | 粉丝画像 | $0.0020 / 次 |
| [抖音星图达人粉丝画像](https://dataxapi.com/zh/apis/douyin/xingtu/creators/audience/get.md) | `GET /v1/douyin/xingtu/creators/audience/get` | 粉丝画像 | $0.0040 / 次 |
| [抖音星图达人粉丝画像（备用版）](https://dataxapi.com/zh/apis/douyin/xingtu/backup/creators/audience/get.md) | `GET /v1/douyin/xingtu/backup/creators/audience/get` | 粉丝画像 | $0.0400 / 次 |

### 小红书

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [小红书蒲公英博主粉丝画像](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/audience/get.md) | `GET /v1/xiaohongshu/pgy/creators/audience/get` | 粉丝画像 | $0.0400 / 次 |

## 示例

`douyin.index.creators.audience.get` 返回的一条，录制于 2026-10-13 03:25 UTC。名字、正文和编号是示例，链接也是；数字是原样。

```jsonc
{
  "creator_id": "65888655493",
  "gender": [
    { "name": "male", "share": 0.8084029405057243 },
    { "name": "female", "share": 0.1915970594942758 }
  ],
  "age": [
    { "name": "31-40", "share": 0.3573003477857061 },
    { "name": "41-50", "share": 0.2595408957167182 },
    // … 另有 3 条
  ],
  "province": [
    { "name": "广东", "share": 0.14160949971558792 },
    { "name": "江苏", "share": 0.07285886667660696 },
    // … 另有 32 条
  ],
  "city": [
    { "name": "北京", "share": 0.03281000167057653 },
    { "name": "上海", "share": 0.027333702606498388 },
    // … 另有 249 条
  ],
  "interest": [
    { "name": "随拍", "share": 0.04880862874319531 },
    { "name": "未分类（垂直度不足）", "share": 0.045695193136280836 },
    // … 另有 40 条
  ],
  "device": [
    { "name": "华为", "share": 0.30586610757827787 },
    { "name": "苹果", "share": 0.22449642440387466 },
    // … 另有 5 条
  ],
  "city_tier": [
    { "name": "三线", "share": 0.22936908477712395 },
    { "name": "新一线", "share": 0.20041213759459334 },
    // … 另有 7 条
  ]
}
```

[完整的返回在这个接口的页面上 →](https://dataxapi.com/zh/apis/douyin/index/creators/audience/get.md)

## 相关

- [达人粉丝画像 API](https://dataxapi.com/zh/roles/creators-audience-get/): 同一种动作在 2 个平台上的接口，带各平台的字段对照。
- [全部接口](https://dataxapi.com/zh/apis/): 目录里写明每个接口返回什么对象、多少钱。

## 其他对象

[Post（内容）对象](https://dataxapi.com/zh/docs/objects/post/)、[Comment（评论）对象](https://dataxapi.com/zh/docs/objects/comment/)、[Account（账号）对象](https://dataxapi.com/zh/docs/objects/account/)、[Trend（热点）对象](https://dataxapi.com/zh/docs/objects/trend/)、[Transcript（逐字稿）对象](https://dataxapi.com/zh/docs/objects/transcript/)、[Media files（视频和图片文件）对象](https://dataxapi.com/zh/docs/objects/media/)、[Music（音乐）对象](https://dataxapi.com/zh/docs/objects/music/)、[Creator rates（达人报价）对象](https://dataxapi.com/zh/docs/objects/creator_rates/)、[Community（社区）对象](https://dataxapi.com/zh/docs/objects/community/)、[Product（商品）对象](https://dataxapi.com/zh/docs/objects/product/)、[Review（评价）对象](https://dataxapi.com/zh/docs/objects/review/)、[Keyword index history（关键词指数历史）对象](https://dataxapi.com/zh/docs/objects/keyword_history/)、[Related keyword（关联词）对象](https://dataxapi.com/zh/docs/objects/keyword_related/)、[Keyword audience（关键词人群画像）对象](https://dataxapi.com/zh/docs/objects/keyword_audience/)、[Account recent change（账号近期变化）对象](https://dataxapi.com/zh/docs/objects/account_history/)、[Brand index history（品牌指数历史）对象](https://dataxapi.com/zh/docs/objects/brand_history/)、[Brand index averages（品牌指数均值）对象](https://dataxapi.com/zh/docs/objects/brand_metrics/)、[Creator（达人）对象](https://dataxapi.com/zh/docs/objects/creator/)、[Xingtu creator metrics（星图达人传播数据）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_metrics/)、[Xingtu creator video（星图达人作品）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_post/)、[PGY creator metrics（蒲公英博主数据表现）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_metrics/)、[PGY creator note（蒲公英博主笔记）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_post/)、[PGY note detail（蒲公英笔记详情）对象](https://dataxapi.com/zh/docs/objects/pgy_note/)、[Ad（广告）对象](https://dataxapi.com/zh/docs/objects/ad/)、[Advertiser（广告主）对象](https://dataxapi.com/zh/docs/objects/advertiser/)、[Douyin trend-index creator metrics（巨量算数达人核心指标）对象](https://dataxapi.com/zh/docs/objects/index_creator_metrics/)、[Xingtu creator content keywords（星图达人内容热词）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_keywords/)、[Xingtu creator scores（星图达人指数）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_scores/)、[Xingtu creator content mix（星图达人内容分布）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_content_mix/)、[Xingtu creator conversion（星图达人转化能力）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_conversion/)、[Xingtu campaign（星图营销活动）对象](https://dataxapi.com/zh/docs/objects/xingtu_campaign/)、[Channels collection（视频号合集）对象](https://dataxapi.com/zh/docs/objects/channels_collection/)、[Channels share link（视频号分享链接）对象](https://dataxapi.com/zh/docs/objects/channels_share_link/)、[Topic（话题）对象](https://dataxapi.com/zh/docs/objects/topic/)、[Account owner（账号主体）对象](https://dataxapi.com/zh/docs/objects/account_owner/)、[Mini program（小程序）对象](https://dataxapi.com/zh/docs/objects/miniprogram/)、[Follower history（粉丝数变化）对象](https://dataxapi.com/zh/docs/objects/follower_history/)、[PGY creator costs and summary（蒲公英博主合作成本和数据概览）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_costs/)、[PGY creator follower summary（蒲公英博主粉丝概览）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_followers/)、[PGY creator core figures history（蒲公英博主核心数据趋势）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_cost_history/)

---

最后核对于 2026-11-26 12:17 UTC。目录修订号 0051cce45e9530b9。 [网页版](https://dataxapi.com/zh/docs/objects/audience/)
