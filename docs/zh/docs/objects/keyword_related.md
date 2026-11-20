# Related keyword（关联词）对象

3 个平台的 5 个接口都返回 Related keyword（关联词）对象，7 个字段名完全一样，给一个平台写的代码不用改就能读其他平台。每次调用 $0.0020 到 $0.1。它是预览结构，之后可能调整。

给机器读：[keyword_related schema](https://dataxapi.com/openapi.json#/components/schemas/keyword_related)、[openapi.json](https://dataxapi.com/openapi.json)、[对象表（JSON）](https://api.dataxapi.com/v1/catalog/objects)、[llms.txt](https://dataxapi.com/zh/llms.txt)

关联词（Related keyword）是和所查关键词有关联的一个词，带关联方式 `relation`、名次 `rank` 和它自己的搜索指数。抖音给的是和它一起被搜的词、在内容里和它一起出现的词；小红书给的是用户搜它之前和之后还搜的词。

`related_to` 是所查的那个关键词。关联词可以直接拿去当同平台关键词指数历史的关键词。

## 字段

平台给不了的字段不会出现在这条数据里，而是写在 `meta.unavailable` 里。不会用猜的数或 0 顶上。

| 字段 | 类型 | 起始档位 | 说明 |
| --- | --- | --- | --- |
| `keyword` | 文本 | `compact` | 关联词 |
| `related_to` | 文本 | `compact` | 它是哪个词的关联词：所查的那个关键词 |
| `relation` | 文本 | `compact` | 怎么关联的：query 是搜索里一起出现，posts 是内容里一起出现，prior 是人们搜所查的词之前搜的，after 是之后搜的，suggestion 是在搜索框里输入所查的词时平台给的联想词：`query`、`posts`、`prior`、`after`、`suggestion` |
| `rank` | 整数 | `compact` | 在同一种关联里按相关度排第几，从 1 起 |
| `relevance` | 数字 | `compact` | 和所查的词的相关度，0 到 1 |
| `search_index` | 整数 | `compact` | 这个关联词的搜索指数：平台算出的指数，不是搜索次数；平台不给这个词的数时为 null |
| `composite_index` | 整数 | `compact` | 这个关联词的综合指数：平台把相关内容的热度合起来算出的指数，不是次数 |

## 每个数取的是平台上的哪个数

同一个字段名，在不同平台上对应的动作不完全一样。这张表写明这个字段取的是平台自己的哪个数。

| 字段 | 在那里是什么 | 平台 |
| --- | --- | --- |
| `rank` | 平台给的相关度名次，名次之间可能有空缺 | 抖音 |
| `rank` | 在搜索框列出的联想词里排第几，从 1 起；不算所查的词本身 | 抖音、小红书、微信搜一搜 |

## 哪些平台给不了哪些字段

一个平台的所有接口都给不了某个字段时，它才列在那个字段后面。

| 字段 | 给不了的平台 |
| --- | --- |
| `relevance` | 小红书、微信搜一搜 |
| `search_index` | 微信搜一搜 |
| `composite_index` | 小红书、微信搜一搜 |

同一个平台上，可能一个接口给不了、另一个接口能给：每个接口的页面列着它给不了的字段，每次返回也都写在 `meta.unavailable` 里。

## 返回 Related keyword（关联词）的接口

### 抖音

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [抖音巨量算数关联词](https://dataxapi.com/zh/apis/douyin/index/keywords/related.md) | `GET /v1/douyin/index/keywords/related` | 关联词列表 | $0.0020 / 次 |
| [抖音搜索框联想词](https://dataxapi.com/zh/apis/douyin/keywords/related.md) | `GET /v1/douyin/keywords/related` | 关联词列表 | $0.0200 / 次 |

### 小红书

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [小红书蒲公英关联词](https://dataxapi.com/zh/apis/xiaohongshu/pgy/keywords/related.md) | `GET /v1/xiaohongshu/pgy/keywords/related` | 关联词列表 | $0.0400 / 次 |
| [小红书搜索框联想词](https://dataxapi.com/zh/apis/xiaohongshu/keywords/related.md) | `GET /v1/xiaohongshu/keywords/related` | 关联词列表 | $0.0200 / 次 |

### 微信搜一搜

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [微信搜一搜推荐词](https://dataxapi.com/zh/apis/wechat/keywords/related.md) | `GET /v1/wechat/keywords/related` | 关联词列表 | $0.1 / 次 |

## 示例

`douyin.index.keywords.related` 返回的一条，录制于 2026-10-12 21:52 UTC。名字、正文和编号是示例，链接也是；数字是原样。

```jsonc
{
  "keyword": "露营车",
  "related_to": "露营",
  "relation": "query",
  "rank": 2,
  "relevance": 0.07604021617112115,
  "search_index": 669384,
  "composite_index": 190809
}
```

[完整的返回在这个接口的页面上 →](https://dataxapi.com/zh/apis/douyin/index/keywords/related.md)

## 相关

- [全部接口](https://dataxapi.com/zh/apis/): 目录里写明每个接口返回什么对象、多少钱。

## 其他对象

[Post（内容）对象](https://dataxapi.com/zh/docs/objects/post/)、[Comment（评论）对象](https://dataxapi.com/zh/docs/objects/comment/)、[Account（账号）对象](https://dataxapi.com/zh/docs/objects/account/)、[Trend（热点）对象](https://dataxapi.com/zh/docs/objects/trend/)、[Transcript（逐字稿）对象](https://dataxapi.com/zh/docs/objects/transcript/)、[Creator rates（达人报价）对象](https://dataxapi.com/zh/docs/objects/creator_rates/)、[Community（社区）对象](https://dataxapi.com/zh/docs/objects/community/)、[Product（商品）对象](https://dataxapi.com/zh/docs/objects/product/)、[Review（评价）对象](https://dataxapi.com/zh/docs/objects/review/)、[Keyword index history（关键词指数历史）对象](https://dataxapi.com/zh/docs/objects/keyword_history/)、[Keyword audience（关键词人群画像）对象](https://dataxapi.com/zh/docs/objects/keyword_audience/)、[Account recent change（账号近期变化）对象](https://dataxapi.com/zh/docs/objects/account_history/)、[Brand index history（品牌指数历史）对象](https://dataxapi.com/zh/docs/objects/brand_history/)、[Brand index averages（品牌指数均值）对象](https://dataxapi.com/zh/docs/objects/brand_metrics/)、[Creator（达人）对象](https://dataxapi.com/zh/docs/objects/creator/)、[Audience（粉丝画像）对象](https://dataxapi.com/zh/docs/objects/audience/)、[Xingtu creator metrics（星图达人传播数据）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_metrics/)、[Xingtu creator video（星图达人作品）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_post/)、[PGY creator metrics（蒲公英博主数据表现）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_metrics/)、[PGY creator note（蒲公英博主笔记）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_post/)、[PGY note detail（蒲公英笔记详情）对象](https://dataxapi.com/zh/docs/objects/pgy_note/)、[Ad（广告）对象](https://dataxapi.com/zh/docs/objects/ad/)、[Advertiser（广告主）对象](https://dataxapi.com/zh/docs/objects/advertiser/)、[Douyin trend-index creator metrics（巨量算数达人核心指标）对象](https://dataxapi.com/zh/docs/objects/index_creator_metrics/)、[Xingtu creator content keywords（星图达人内容热词）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_keywords/)、[Xingtu creator scores（星图达人指数）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_scores/)、[Xingtu creator content mix（星图达人内容分布）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_content_mix/)、[Xingtu creator conversion（星图达人转化能力）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_conversion/)、[Xingtu campaign（星图营销活动）对象](https://dataxapi.com/zh/docs/objects/xingtu_campaign/)、[Channels collection（视频号合集）对象](https://dataxapi.com/zh/docs/objects/channels_collection/)、[Channels share link（视频号分享链接）对象](https://dataxapi.com/zh/docs/objects/channels_share_link/)、[Topic（话题）对象](https://dataxapi.com/zh/docs/objects/topic/)、[Account owner（账号主体）对象](https://dataxapi.com/zh/docs/objects/account_owner/)、[Mini program（小程序）对象](https://dataxapi.com/zh/docs/objects/miniprogram/)、[Follower history（粉丝数变化）对象](https://dataxapi.com/zh/docs/objects/follower_history/)、[PGY creator costs and summary（蒲公英博主合作成本和数据概览）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_costs/)、[PGY creator follower summary（蒲公英博主粉丝概览）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_followers/)、[PGY creator core figures history（蒲公英博主核心数据趋势）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_cost_history/)

---

最后核对于 2026-11-20 07:17 UTC。目录修订号 720fc3ea8dadb865。 [网页版](https://dataxapi.com/zh/docs/objects/keyword_related/)
