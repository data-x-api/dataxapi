# Advertiser（广告主）对象

2 个平台的 2 个接口都返回 Advertiser（广告主）对象，4 个字段名完全一样，给一个平台写的代码不用改就能读其他平台。每次调用 $0.0020。它是预览结构，之后可能调整。

给机器读：[advertiser schema](https://dataxapi.com/openapi.json#/components/schemas/advertiser)、[openapi.json](https://dataxapi.com/openapi.json)、[对象表（JSON）](https://api.dataxapi.com/v1/catalog/objects)、[llms.txt](https://dataxapi.com/zh/llms.txt)

广告主（Advertiser）是投广告的一方，按平台广告库的记录：Meta 广告库里是一个 Facebook 主页，Google 广告透明度中心里是一个广告主。它有 `id` 和 `name`，Meta 还给头像，Google 还给登记的国家或地区 `region`。

`id` 可以原样传给“广告主的广告”接口，返回的广告用 `advertiser.id` 指回它。它不是账号：Meta 上对应的 Facebook 主页账号名和关联的 Instagram 账号写在 `ext`。

## 字段

平台给不了的字段不会出现在这条数据里，而是写在 `meta.unavailable` 里。不会用猜的数或 0 顶上。

| 字段 | 类型 | 起始档位 | 说明 |
| --- | --- | --- | --- |
| `id` | 文本 | `compact` | 编号，可原样传给“广告主的广告”接口 |
| `name` | 文本 | `compact` | 名称 |
| `avatar_url` | 链接 | `standard` | 头像或标志 |
| `region` | 文本 | `compact` | 广告主登记的国家或地区代码 |

## 哪些平台给不了哪些字段

一个平台的所有接口都给不了某个字段时，它才列在那个字段后面。

| 字段 | 给不了的平台 |
| --- | --- |
| `avatar_url` | Google 广告 |
| `region` | Meta 广告库 |

同一个平台上，可能一个接口给不了、另一个接口能给：每个接口的页面列着它给不了的字段，每次返回也都写在 `meta.unavailable` 里。

## 返回 Advertiser（广告主）的接口

### Google 广告

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [Google 广告主搜索](https://dataxapi.com/zh/apis/google/advertisers/search.md) | `GET /v1/google/advertisers/search` | 广告主列表 | $0.0020 / 次 |

### Meta 广告库

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [Meta 广告主搜索](https://dataxapi.com/zh/apis/meta/advertisers/search.md) | `GET /v1/meta/advertisers/search` | 广告主列表 | $0.0020 / 次 |

## 示例

`google.advertisers.search` 返回的一条，录制于 2026-10-12 21:58 UTC。名字、正文和编号是示例，链接也是；数字是原样。

```jsonc
{
  "id": "AR13721943418898185271",
  "name": "Brightline Studio",
  "region": "US"
}
```

[完整的返回在这个接口的页面上 →](https://dataxapi.com/zh/apis/google/advertisers/search.md)

## 相关

- [广告主搜索 API](https://dataxapi.com/zh/roles/advertisers-search/): 同一种动作在 2 个平台上的接口，带各平台的字段对照。
- [全部接口](https://dataxapi.com/zh/apis/): 目录里写明每个接口返回什么对象、多少钱。

## 其他对象

[Post（内容）对象](https://dataxapi.com/zh/docs/objects/post/)、[Comment（评论）对象](https://dataxapi.com/zh/docs/objects/comment/)、[Account（账号）对象](https://dataxapi.com/zh/docs/objects/account/)、[Trend（热点）对象](https://dataxapi.com/zh/docs/objects/trend/)、[Transcript（逐字稿）对象](https://dataxapi.com/zh/docs/objects/transcript/)、[Media files（视频和图片文件）对象](https://dataxapi.com/zh/docs/objects/media/)、[Music（音乐）对象](https://dataxapi.com/zh/docs/objects/music/)、[Creator rates（达人报价）对象](https://dataxapi.com/zh/docs/objects/creator_rates/)、[Community（社区）对象](https://dataxapi.com/zh/docs/objects/community/)、[Product（商品）对象](https://dataxapi.com/zh/docs/objects/product/)、[Review（评价）对象](https://dataxapi.com/zh/docs/objects/review/)、[Keyword index history（关键词指数历史）对象](https://dataxapi.com/zh/docs/objects/keyword_history/)、[Related keyword（关联词）对象](https://dataxapi.com/zh/docs/objects/keyword_related/)、[Keyword audience（关键词人群画像）对象](https://dataxapi.com/zh/docs/objects/keyword_audience/)、[Account recent change（账号近期变化）对象](https://dataxapi.com/zh/docs/objects/account_history/)、[Brand index history（品牌指数历史）对象](https://dataxapi.com/zh/docs/objects/brand_history/)、[Brand index averages（品牌指数均值）对象](https://dataxapi.com/zh/docs/objects/brand_metrics/)、[Creator（达人）对象](https://dataxapi.com/zh/docs/objects/creator/)、[Audience（粉丝画像）对象](https://dataxapi.com/zh/docs/objects/audience/)、[Xingtu creator metrics（星图达人传播数据）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_metrics/)、[Xingtu creator video（星图达人作品）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_post/)、[PGY creator metrics（蒲公英博主数据表现）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_metrics/)、[PGY creator note（蒲公英博主笔记）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_post/)、[PGY note detail（蒲公英笔记详情）对象](https://dataxapi.com/zh/docs/objects/pgy_note/)、[Ad（广告）对象](https://dataxapi.com/zh/docs/objects/ad/)、[Douyin trend-index creator metrics（巨量算数达人核心指标）对象](https://dataxapi.com/zh/docs/objects/index_creator_metrics/)、[Xingtu creator content keywords（星图达人内容热词）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_keywords/)、[Xingtu creator scores（星图达人指数）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_scores/)、[Xingtu creator content mix（星图达人内容分布）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_content_mix/)、[Xingtu creator conversion（星图达人转化能力）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_conversion/)、[Xingtu campaign（星图营销活动）对象](https://dataxapi.com/zh/docs/objects/xingtu_campaign/)、[Channels collection（视频号合集）对象](https://dataxapi.com/zh/docs/objects/channels_collection/)、[Channels share link（视频号分享链接）对象](https://dataxapi.com/zh/docs/objects/channels_share_link/)、[Topic（话题）对象](https://dataxapi.com/zh/docs/objects/topic/)、[Account owner（账号主体）对象](https://dataxapi.com/zh/docs/objects/account_owner/)、[Mini program（小程序）对象](https://dataxapi.com/zh/docs/objects/miniprogram/)、[Follower history（粉丝数变化）对象](https://dataxapi.com/zh/docs/objects/follower_history/)、[PGY creator costs and summary（蒲公英博主合作成本和数据概览）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_costs/)、[PGY creator follower summary（蒲公英博主粉丝概览）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_followers/)、[PGY creator core figures history（蒲公英博主核心数据趋势）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_cost_history/)

---

最后核对于 2026-11-26 12:17 UTC。目录修订号 0051cce45e9530b9。 [网页版](https://dataxapi.com/zh/docs/objects/advertiser/)
