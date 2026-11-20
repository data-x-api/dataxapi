# Account owner（账号主体）对象

Account owner（账号主体）对象有 10 个字段，由微信公众号的 1 个接口返回。每次调用 $0.1。它是预览结构，之后可能调整。

给机器读：[account_owner schema](https://dataxapi.com/openapi.json#/components/schemas/account_owner)、[openapi.json](https://dataxapi.com/openapi.json)、[对象表（JSON）](https://api.dataxapi.com/v1/catalog/objects)、[llms.txt](https://dataxapi.com/zh/llms.txt)

## 字段

平台给不了的字段不会出现在这条数据里，而是写在 `meta.unavailable` 里。不会用猜的数或 0 顶上。

| 字段 | 类型 | 起始档位 | 说明 |
| --- | --- | --- | --- |
| `name` | 文本 | `compact` | 主体名称：公司、机构的全称；个人主体是个人的名字 |
| `type` | 文本 | `compact` | 主体类型：company 企业，government 政府，media 媒体，individual 个人，other 其他组织：`company`、`government`、`media`、`individual`、`other` |
| `registration_id` | 文本 | `compact` | 主体登记的证照号码（统一社会信用代码、营业执照号或组织机构代码）；平台没给时为 null |
| `country` | 文本 | `standard` | 主体所在的国家或地区，平台的原话 |
| `verification` | 文本 | `compact` | 账号的认证状态：verified 已认证（含个人认证），unverified 未认证，expired 认证过期：`verified`、`unverified`、`expired` |
| `verification_type` | 文本 | `standard` | 认证的种类，平台的原话（如“企业认证”“政府认证”“媒体认证”）；没认证为 null |
| `verified_at` | 时间 | `standard` | 通过认证的日期，写成这个日期的 UTC 零点 |
| `account_id` | 文本 | `compact` | 所查账号的编号：这是它的主体 |
| `account_created_at` | 时间 | `standard` | 所查账号的注册日期，写成这个日期的 UTC 零点 |
| `authorized_services` | 文本列表 | `full` | 所查账号授权过的第三方服务商，平台的原话（公司名） |

## 返回 Account owner（账号主体）的接口

### 微信公众号

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [微信公众号主体信息](https://dataxapi.com/zh/apis/wechat_mp/accounts/owner/get.md) | `GET /v1/wechat_mp/accounts/owner/get` | 账号主体 | $0.1 / 次 |

## 示例

`wechat_mp.accounts.owner.get` 返回的一条，录制于 2026-10-29 09:49 UTC。名字、正文和编号是示例，链接也是；数字是原样。

```jsonc
{
  "name": "阿杰爱折腾",
  "type": "company",
  "registration_id": null,
  "country": "周末的周末露营日常，随手记录一下",
  "verification": "verified",
  "verification_type": "把周末露营从头到尾讲清楚，看完少走弯路",
  "verified_at": "2025-11-13T00:00:00.000Z",
  "account_id": "gh_9ceb787f0519",
  "account_created_at": "2017-12-18T00:00:00.000Z"
}
```

[完整的返回在这个接口的页面上 →](https://dataxapi.com/zh/apis/wechat_mp/accounts/owner/get.md)

## 相关

- [全部接口](https://dataxapi.com/zh/apis/): 目录里写明每个接口返回什么对象、多少钱。

## 其他对象

[Post（内容）对象](https://dataxapi.com/zh/docs/objects/post/)、[Comment（评论）对象](https://dataxapi.com/zh/docs/objects/comment/)、[Account（账号）对象](https://dataxapi.com/zh/docs/objects/account/)、[Trend（热点）对象](https://dataxapi.com/zh/docs/objects/trend/)、[Transcript（逐字稿）对象](https://dataxapi.com/zh/docs/objects/transcript/)、[Creator rates（达人报价）对象](https://dataxapi.com/zh/docs/objects/creator_rates/)、[Community（社区）对象](https://dataxapi.com/zh/docs/objects/community/)、[Product（商品）对象](https://dataxapi.com/zh/docs/objects/product/)、[Review（评价）对象](https://dataxapi.com/zh/docs/objects/review/)、[Keyword index history（关键词指数历史）对象](https://dataxapi.com/zh/docs/objects/keyword_history/)、[Related keyword（关联词）对象](https://dataxapi.com/zh/docs/objects/keyword_related/)、[Keyword audience（关键词人群画像）对象](https://dataxapi.com/zh/docs/objects/keyword_audience/)、[Account recent change（账号近期变化）对象](https://dataxapi.com/zh/docs/objects/account_history/)、[Brand index history（品牌指数历史）对象](https://dataxapi.com/zh/docs/objects/brand_history/)、[Brand index averages（品牌指数均值）对象](https://dataxapi.com/zh/docs/objects/brand_metrics/)、[Creator（达人）对象](https://dataxapi.com/zh/docs/objects/creator/)、[Audience（粉丝画像）对象](https://dataxapi.com/zh/docs/objects/audience/)、[Xingtu creator metrics（星图达人传播数据）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_metrics/)、[Xingtu creator video（星图达人作品）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_post/)、[PGY creator metrics（蒲公英博主数据表现）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_metrics/)、[PGY creator note（蒲公英博主笔记）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_post/)、[PGY note detail（蒲公英笔记详情）对象](https://dataxapi.com/zh/docs/objects/pgy_note/)、[Ad（广告）对象](https://dataxapi.com/zh/docs/objects/ad/)、[Advertiser（广告主）对象](https://dataxapi.com/zh/docs/objects/advertiser/)、[Douyin trend-index creator metrics（巨量算数达人核心指标）对象](https://dataxapi.com/zh/docs/objects/index_creator_metrics/)、[Xingtu creator content keywords（星图达人内容热词）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_keywords/)、[Xingtu creator scores（星图达人指数）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_scores/)、[Xingtu creator content mix（星图达人内容分布）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_content_mix/)、[Xingtu creator conversion（星图达人转化能力）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_conversion/)、[Xingtu campaign（星图营销活动）对象](https://dataxapi.com/zh/docs/objects/xingtu_campaign/)、[Channels collection（视频号合集）对象](https://dataxapi.com/zh/docs/objects/channels_collection/)、[Channels share link（视频号分享链接）对象](https://dataxapi.com/zh/docs/objects/channels_share_link/)、[Topic（话题）对象](https://dataxapi.com/zh/docs/objects/topic/)、[Mini program（小程序）对象](https://dataxapi.com/zh/docs/objects/miniprogram/)、[Follower history（粉丝数变化）对象](https://dataxapi.com/zh/docs/objects/follower_history/)、[PGY creator costs and summary（蒲公英博主合作成本和数据概览）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_costs/)、[PGY creator follower summary（蒲公英博主粉丝概览）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_followers/)、[PGY creator core figures history（蒲公英博主核心数据趋势）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_cost_history/)

---

最后核对于 2026-11-20 07:17 UTC。目录修订号 720fc3ea8dadb865。 [网页版](https://dataxapi.com/zh/docs/objects/account_owner/)
