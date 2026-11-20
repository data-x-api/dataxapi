# Account recent change（账号近期变化）对象

Account recent change（账号近期变化）对象有 18 个字段，由抖音的 1 个接口返回。每次调用 $0.0020。它是预览结构，之后可能调整。

给机器读：[account_history schema](https://dataxapi.com/openapi.json#/components/schemas/account_history)、[openapi.json](https://dataxapi.com/openapi.json)、[对象表（JSON）](https://api.dataxapi.com/v1/catalog/objects)、[llms.txt](https://dataxapi.com/zh/llms.txt)

账号近期变化（Account recent change）是一个抖音账号最近 7 天或 30 天的数字变化：净增粉丝、新增点赞、评论、分享和作品数，每项带和上一个同样长的时间段相比的变化比例。它是巨量算数给的一段时间的合计，不是逐日序列。

`id` 是抖音账号的数字编号（uid），不是账号资料接口用的那个；`url` 是主页链接，可以原样传给账号资料接口。一次请求用 `ids` 最多带 5 个账号。

## 字段

平台给不了的字段不会出现在这条数据里，而是写在 `meta.unavailable` 里。不会用猜的数或 0 顶上。

| 字段 | 类型 | 起始档位 | 说明 |
| --- | --- | --- | --- |
| `id` | 文本 | `compact` | 账号的数字编号（抖音的 uid），就是请求里给的那个 |
| `name` | 文本 | `compact` | 显示名 |
| `url` | 链接 | `compact` | 主页链接，可原样传给取账号资料的接口 |
| `avatar_url` | 链接 | `standard` | 头像 |
| `days` | 整数 | `compact` | 统计的是最近多少天 |
| `gained` | 对象 | `compact` | 这段时间里新增的数 |
| `gained.followers` | 整数 | `compact` | 净增粉丝数，掉粉时为负 |
| `gained.likes` | 整数 | `compact` | 新增点赞数 |
| `gained.comments` | 整数 | `compact` | 新增评论数 |
| `gained.shares` | 整数 | `compact` | 新增分享数 |
| `gained.posts` | 整数 | `compact` | 新发布的内容数 |
| `change` | 对象 | `compact` | 和上一个同样长的时间段相比的变化比例：0.3 是多了三成，-0.5 是少了一半 |
| `change.followers` | 数字 | `compact` | 净增粉丝数的变化比例 |
| `change.likes` | 数字 | `compact` | 新增点赞数的变化比例 |
| `change.comments` | 数字 | `compact` | 新增评论数的变化比例 |
| `change.shares` | 数字 | `compact` | 新增分享数的变化比例 |
| `change.posts` | 数字 | `compact` | 新发布内容数的变化比例 |
| `totals` | 对象 | `standard` | 账号现在的总数 |
| `totals.followers` | 整数 | `standard` | 粉丝数 |
| `totals.likes` | 整数 | `standard` | 获赞总数 |
| `totals.posts` | 整数 | `standard` | 作品数 |

## 返回 Account recent change（账号近期变化）的接口

### 抖音

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [抖音达人互动与粉丝趋势](https://dataxapi.com/zh/apis/douyin/users/history.md) | `GET /v1/douyin/users/history` | 账号近期变化 | $0.0020 / 次 |

## 示例

`douyin.users.history` 返回的一条，录制于 2026-11-10 16:08 UTC。名字、正文和编号是示例，链接也是；数字是原样。

```jsonc
{
  "id": "65485320678",
  "name": "阿杰爱折腾",
  "url": "https://www.douyin.com/user/65485320678",
  "avatar_url": "https://p3-pc.douyinpic.com/aweme/100x100/aweme-avatar/tos-cn-avt-0015_2ed168d1dc1b7e7b888e.jpeg",
  "days": 7,
  "gained": {
    "followers": 25775,
    "likes": 44642258,
    "comments": 9070,
    "shares": 8492843,
    "posts": 113
  },
  "change": {
    "followers": -0.6828902203466984,
    "likes": -0.002293290777394352,
    "comments": -0.01914134313831513,
    "shares": 0.1320249692562833,
    "posts": 0.08653846153846154
  },
  "totals": { "followers": 203665423, "likes": 19308421610, "posts": 12694 }
}
```

[完整的返回在这个接口的页面上 →](https://dataxapi.com/zh/apis/douyin/users/history.md)

## 相关

- [全部接口](https://dataxapi.com/zh/apis/): 目录里写明每个接口返回什么对象、多少钱。

## 其他对象

[Post（内容）对象](https://dataxapi.com/zh/docs/objects/post/)、[Comment（评论）对象](https://dataxapi.com/zh/docs/objects/comment/)、[Account（账号）对象](https://dataxapi.com/zh/docs/objects/account/)、[Trend（热点）对象](https://dataxapi.com/zh/docs/objects/trend/)、[Transcript（逐字稿）对象](https://dataxapi.com/zh/docs/objects/transcript/)、[Creator rates（达人报价）对象](https://dataxapi.com/zh/docs/objects/creator_rates/)、[Community（社区）对象](https://dataxapi.com/zh/docs/objects/community/)、[Product（商品）对象](https://dataxapi.com/zh/docs/objects/product/)、[Review（评价）对象](https://dataxapi.com/zh/docs/objects/review/)、[Keyword index history（关键词指数历史）对象](https://dataxapi.com/zh/docs/objects/keyword_history/)、[Related keyword（关联词）对象](https://dataxapi.com/zh/docs/objects/keyword_related/)、[Keyword audience（关键词人群画像）对象](https://dataxapi.com/zh/docs/objects/keyword_audience/)、[Brand index history（品牌指数历史）对象](https://dataxapi.com/zh/docs/objects/brand_history/)、[Brand index averages（品牌指数均值）对象](https://dataxapi.com/zh/docs/objects/brand_metrics/)、[Creator（达人）对象](https://dataxapi.com/zh/docs/objects/creator/)、[Audience（粉丝画像）对象](https://dataxapi.com/zh/docs/objects/audience/)、[Xingtu creator metrics（星图达人传播数据）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_metrics/)、[Xingtu creator video（星图达人作品）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_post/)、[PGY creator metrics（蒲公英博主数据表现）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_metrics/)、[PGY creator note（蒲公英博主笔记）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_post/)、[PGY note detail（蒲公英笔记详情）对象](https://dataxapi.com/zh/docs/objects/pgy_note/)、[Ad（广告）对象](https://dataxapi.com/zh/docs/objects/ad/)、[Advertiser（广告主）对象](https://dataxapi.com/zh/docs/objects/advertiser/)、[Douyin trend-index creator metrics（巨量算数达人核心指标）对象](https://dataxapi.com/zh/docs/objects/index_creator_metrics/)、[Xingtu creator content keywords（星图达人内容热词）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_keywords/)、[Xingtu creator scores（星图达人指数）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_scores/)、[Xingtu creator content mix（星图达人内容分布）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_content_mix/)、[Xingtu creator conversion（星图达人转化能力）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_conversion/)、[Xingtu campaign（星图营销活动）对象](https://dataxapi.com/zh/docs/objects/xingtu_campaign/)、[Channels collection（视频号合集）对象](https://dataxapi.com/zh/docs/objects/channels_collection/)、[Channels share link（视频号分享链接）对象](https://dataxapi.com/zh/docs/objects/channels_share_link/)、[Topic（话题）对象](https://dataxapi.com/zh/docs/objects/topic/)、[Account owner（账号主体）对象](https://dataxapi.com/zh/docs/objects/account_owner/)、[Mini program（小程序）对象](https://dataxapi.com/zh/docs/objects/miniprogram/)、[Follower history（粉丝数变化）对象](https://dataxapi.com/zh/docs/objects/follower_history/)、[PGY creator costs and summary（蒲公英博主合作成本和数据概览）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_costs/)、[PGY creator follower summary（蒲公英博主粉丝概览）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_followers/)、[PGY creator core figures history（蒲公英博主核心数据趋势）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_cost_history/)

---

最后核对于 2026-11-20 07:17 UTC。目录修订号 720fc3ea8dadb865。 [网页版](https://dataxapi.com/zh/docs/objects/account_history/)
