# Keyword audience（关键词人群画像）对象

Keyword audience（关键词人群画像）对象有 19 个字段，由抖音的 1 个接口返回。每次调用 $0.0020。它是预览结构，之后可能调整。

给机器读：[keyword_audience schema](https://dataxapi.com/openapi.json#/components/schemas/keyword_audience)、[openapi.json](https://dataxapi.com/openapi.json)、[对象表（JSON）](https://api.dataxapi.com/v1/catalog/objects)、[llms.txt](https://dataxapi.com/zh/llms.txt)

关键词人群画像（Keyword audience）是搜这个词、看相关内容的是哪些人，按年龄、性别、省份、城市、城市等级、兴趣分。每一组带占比 `share` 和 `tgi`：100 是全平台平均，高于 100 是更偏好这个词。

靠 `keyword` 认它；数据来自抖音巨量算数所查的那段日期，和同一个词的指数历史配着看。达人的粉丝是另一个对象“粉丝画像”。

## 字段

平台给不了的字段不会出现在这条数据里，而是写在 `meta.unavailable` 里。不会用猜的数或 0 顶上。

| 字段 | 类型 | 起始档位 | 说明 |
| --- | --- | --- | --- |
| `keyword` | 文本 | `compact` | 关键词 |
| `age` | 对象列表 | `compact` | 按年龄段分 |
| `age[].label` | 文本 | `compact` | 这一组的名称，平台的原话 |
| `age[].share` | 数字 | `compact` | 这一组占的比例，0 到 1 |
| `age[].tgi` | 数字 | `compact` | TGI：这一组对这个词的偏好，100 是全平台平均，高于 100 是更偏好 |
| `gender` | 对象列表 | `compact` | 按性别分 |
| `gender[].label` | 文本 | `compact` | 这一组的名称，平台的原话 |
| `gender[].share` | 数字 | `compact` | 这一组占的比例，0 到 1 |
| `gender[].tgi` | 数字 | `compact` | TGI：这一组对这个词的偏好，100 是全平台平均，高于 100 是更偏好 |
| `province` | 对象列表 | `compact` | 按省份分 |
| `province[].label` | 文本 | `compact` | 这一组的名称，平台的原话 |
| `province[].share` | 数字 | `compact` | 这一组占的比例，0 到 1 |
| `province[].tgi` | 数字 | `compact` | TGI：这一组对这个词的偏好，100 是全平台平均，高于 100 是更偏好 |
| `city` | 对象列表 | `compact` | 按城市分：平台给出的占比最高的一批城市，各项加起来不到 1 |
| `city[].label` | 文本 | `compact` | 这一组的名称，平台的原话 |
| `city[].share` | 数字 | `compact` | 这一组占的比例，0 到 1 |
| `city[].tgi` | 数字 | `compact` | TGI：这一组对这个词的偏好，100 是全平台平均，高于 100 是更偏好 |
| `city_tier` | 对象列表 | `compact` | 按城市等级分 |
| `city_tier[].label` | 文本 | `compact` | 这一组的名称，平台的原话 |
| `city_tier[].share` | 数字 | `compact` | 这一组占的比例，0 到 1 |
| `city_tier[].tgi` | 数字 | `compact` | TGI：这一组对这个词的偏好，100 是全平台平均，高于 100 是更偏好 |
| `interest` | 对象列表 | `compact` | 按兴趣分类分；各项加起来不等于 1 |
| `interest[].label` | 文本 | `compact` | 这一组的名称，平台的原话 |
| `interest[].share` | 数字 | `compact` | 这一组占的比例，0 到 1 |
| `interest[].tgi` | 数字 | `compact` | TGI：这一组对这个词的偏好，100 是全平台平均，高于 100 是更偏好 |

## 返回 Keyword audience（关键词人群画像）的接口

### 抖音

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [抖音巨量算数关键词人群画像](https://dataxapi.com/zh/apis/douyin/index/keywords/audience/get.md) | `GET /v1/douyin/index/keywords/audience/get` | 关键词人群画像 | $0.0020 / 次 |

## 示例

`douyin.index.keywords.audience.get` 返回的一条，录制于 2026-10-12 21:50 UTC。名字、正文和编号是示例，链接也是；数字是原样。

```jsonc
{
  "keyword": "咖啡",
  "age": [
    { "label": "18-23", "share": 0.1968, "tgi": 174.17389307762207 },
    { "label": "24-30", "share": 0.2233, "tgi": 173.71695132383041 },
    // … 另有 3 条
  ],
  "gender": [
    { "label": "男", "share": 0.47, "tgi": 98.27023904973254 },
    { "label": "女", "share": 0.53, "tgi": 101.58569115669054 }
  ],
  "province": [
    { "label": "北京", "share": 0.0221, "tgi": 120.01085780496312 },
    { "label": "天津", "share": 0.0121, "tgi": 105.42964416985868 },
    // … 另有 32 条
  ],
  "city": [
    { "label": "上海", "share": 0.0245, "tgi": 125.4042968127423 },
    { "label": "广州", "share": 0.0237, "tgi": 117.79286978677968 },
    // … 另有 28 条
  ],
  "city_tier": [
    {
      "label": "一线城市",
      "share": 0.08856723771604946,
      "tgi": 114.35574144488798
    },
    {
      "label": "新一线城市",
      "share": 0.19688659709388875,
      "tgi": 103.66957853814951
    },
    // … 另有 5 条
  ],
  "interest": [
    {
      "label": "时尚",
      "share": 0.15486799847286528,
      "tgi": 111.80033780828992
    },
    {
      "label": "美食",
      "share": 0.10207902382205732,
      "tgi": 113.58111661037135
    },
    // … 另有 23 条
  ]
}
```

[完整的返回在这个接口的页面上 →](https://dataxapi.com/zh/apis/douyin/index/keywords/audience/get.md)

## 相关

- [全部接口](https://dataxapi.com/zh/apis/): 目录里写明每个接口返回什么对象、多少钱。

## 其他对象

[Post（内容）对象](https://dataxapi.com/zh/docs/objects/post/)、[Comment（评论）对象](https://dataxapi.com/zh/docs/objects/comment/)、[Account（账号）对象](https://dataxapi.com/zh/docs/objects/account/)、[Trend（热点）对象](https://dataxapi.com/zh/docs/objects/trend/)、[Transcript（逐字稿）对象](https://dataxapi.com/zh/docs/objects/transcript/)、[Media files（视频和图片文件）对象](https://dataxapi.com/zh/docs/objects/media/)、[Music（音乐）对象](https://dataxapi.com/zh/docs/objects/music/)、[Creator rates（达人报价）对象](https://dataxapi.com/zh/docs/objects/creator_rates/)、[Community（社区）对象](https://dataxapi.com/zh/docs/objects/community/)、[Product（商品）对象](https://dataxapi.com/zh/docs/objects/product/)、[Review（评价）对象](https://dataxapi.com/zh/docs/objects/review/)、[Keyword index history（关键词指数历史）对象](https://dataxapi.com/zh/docs/objects/keyword_history/)、[Related keyword（关联词）对象](https://dataxapi.com/zh/docs/objects/keyword_related/)、[Account recent change（账号近期变化）对象](https://dataxapi.com/zh/docs/objects/account_history/)、[Brand index history（品牌指数历史）对象](https://dataxapi.com/zh/docs/objects/brand_history/)、[Brand index averages（品牌指数均值）对象](https://dataxapi.com/zh/docs/objects/brand_metrics/)、[Creator（达人）对象](https://dataxapi.com/zh/docs/objects/creator/)、[Audience（粉丝画像）对象](https://dataxapi.com/zh/docs/objects/audience/)、[Xingtu creator metrics（星图达人传播数据）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_metrics/)、[Xingtu creator video（星图达人作品）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_post/)、[PGY creator metrics（蒲公英博主数据表现）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_metrics/)、[PGY creator note（蒲公英博主笔记）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_post/)、[PGY note detail（蒲公英笔记详情）对象](https://dataxapi.com/zh/docs/objects/pgy_note/)、[Ad（广告）对象](https://dataxapi.com/zh/docs/objects/ad/)、[Advertiser（广告主）对象](https://dataxapi.com/zh/docs/objects/advertiser/)、[Douyin trend-index creator metrics（巨量算数达人核心指标）对象](https://dataxapi.com/zh/docs/objects/index_creator_metrics/)、[Xingtu creator content keywords（星图达人内容热词）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_keywords/)、[Xingtu creator scores（星图达人指数）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_scores/)、[Xingtu creator content mix（星图达人内容分布）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_content_mix/)、[Xingtu creator conversion（星图达人转化能力）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_conversion/)、[Xingtu campaign（星图营销活动）对象](https://dataxapi.com/zh/docs/objects/xingtu_campaign/)、[Channels collection（视频号合集）对象](https://dataxapi.com/zh/docs/objects/channels_collection/)、[Channels share link（视频号分享链接）对象](https://dataxapi.com/zh/docs/objects/channels_share_link/)、[Topic（话题）对象](https://dataxapi.com/zh/docs/objects/topic/)、[Account owner（账号主体）对象](https://dataxapi.com/zh/docs/objects/account_owner/)、[Mini program（小程序）对象](https://dataxapi.com/zh/docs/objects/miniprogram/)、[Follower history（粉丝数变化）对象](https://dataxapi.com/zh/docs/objects/follower_history/)、[PGY creator costs and summary（蒲公英博主合作成本和数据概览）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_costs/)、[PGY creator follower summary（蒲公英博主粉丝概览）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_followers/)、[PGY creator core figures history（蒲公英博主核心数据趋势）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_cost_history/)

---

最后核对于 2026-11-26 12:17 UTC。目录修订号 0051cce45e9530b9。 [网页版](https://dataxapi.com/zh/docs/objects/keyword_audience/)
