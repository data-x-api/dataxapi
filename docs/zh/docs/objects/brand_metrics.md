# Brand index averages（品牌指数均值）对象

Brand index averages（品牌指数均值）对象有 9 个字段，由抖音的 1 个接口返回。每次调用 $0.0020。它是预览结构，之后可能调整。

给机器读：[brand_metrics schema](https://dataxapi.com/openapi.json#/components/schemas/brand_metrics)、[openapi.json](https://dataxapi.com/openapi.json)、[对象表（JSON）](https://api.dataxapi.com/v1/catalog/objects)、[llms.txt](https://dataxapi.com/zh/llms.txt)

品牌指数均值（Brand index averages）是一个品牌在抖音巨量算数上的搜索、内容、传播三个指数，在所查日期内的日均值。`benchmarks` 给出同行业全部品牌，以及行业前 3、5、10、15、30 名的平均值作参照。

品牌名和 `category` 的写法和品牌指数历史一样，后者给的是同样三个指数的逐日数。两个一起看：均值说明品牌在行业里排在哪，历史说明它什么时候涨跌。

## 字段

平台给不了的字段不会出现在这条数据里，而是写在 `meta.unavailable` 里。不会用猜的数或 0 顶上。

| 字段 | 类型 | 起始档位 | 说明 |
| --- | --- | --- | --- |
| `brand` | 文本 | `compact` | 品牌名 |
| `category` | 文本 | `compact` | 平台把这个品牌归在哪个行业，平台的原话 |
| `search_index` | 整数 | `compact` | 这段时间搜索指数的日均值 |
| `content_index` | 整数 | `compact` | 这段时间内容指数的日均值 |
| `spread_index` | 整数 | `compact` | 这段时间传播指数的日均值 |
| `benchmarks` | 对象列表 | `compact` | 同行业的参照值：行业里全部品牌的平均，和排在前几名的品牌的平均 |
| `benchmarks[].scope` | 文本 | `compact` | 参照的范围：行业全部品牌，或行业前 3、5、10、15、30 名：`all`、`top3`、`top5`、`top10`、`top15`、`top30` |
| `benchmarks[].search_index` | 整数 | `compact` | 这个范围的搜索指数日均值 |
| `benchmarks[].content_index` | 整数 | `compact` | 这个范围的内容指数日均值 |
| `benchmarks[].spread_index` | 整数 | `compact` | 这个范围的传播指数日均值 |

## 返回 Brand index averages（品牌指数均值）的接口

### 抖音

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [抖音巨量算数品牌指数对比](https://dataxapi.com/zh/apis/douyin/index/brands/metrics.md) | `GET /v1/douyin/index/brands/metrics` | 品牌指数均值 | $0.0020 / 次 |

## 示例

`douyin.index.brands.metrics` 返回的一条，录制于 2026-10-12 21:56 UTC。名字、正文和编号是示例，链接也是；数字是原样。

```jsonc
{
  "brand": "泡泡玛特",
  "category": "母婴",
  "search_index": 123594,
  "content_index": 46731,
  "spread_index": 77244,
  "benchmarks": [
    {
      "scope": "top15",
      "search_index": 105282,
      "content_index": 57569,
      "spread_index": 73644
    },
    {
      "scope": "top3",
      "search_index": 114818,
      "content_index": 58925,
      "spread_index": 76682
    },
    // … 另有 4 条
  ]
}
```

[完整的返回在这个接口的页面上 →](https://dataxapi.com/zh/apis/douyin/index/brands/metrics.md)

## 相关

- [全部接口](https://dataxapi.com/zh/apis/): 目录里写明每个接口返回什么对象、多少钱。

## 其他对象

[Post（内容）对象](https://dataxapi.com/zh/docs/objects/post/)、[Comment（评论）对象](https://dataxapi.com/zh/docs/objects/comment/)、[Account（账号）对象](https://dataxapi.com/zh/docs/objects/account/)、[Trend（热点）对象](https://dataxapi.com/zh/docs/objects/trend/)、[Transcript（逐字稿）对象](https://dataxapi.com/zh/docs/objects/transcript/)、[Media files（视频和图片文件）对象](https://dataxapi.com/zh/docs/objects/media/)、[Music（音乐）对象](https://dataxapi.com/zh/docs/objects/music/)、[Creator rates（达人报价）对象](https://dataxapi.com/zh/docs/objects/creator_rates/)、[Community（社区）对象](https://dataxapi.com/zh/docs/objects/community/)、[Product（商品）对象](https://dataxapi.com/zh/docs/objects/product/)、[Review（评价）对象](https://dataxapi.com/zh/docs/objects/review/)、[Keyword index history（关键词指数历史）对象](https://dataxapi.com/zh/docs/objects/keyword_history/)、[Related keyword（关联词）对象](https://dataxapi.com/zh/docs/objects/keyword_related/)、[Keyword audience（关键词人群画像）对象](https://dataxapi.com/zh/docs/objects/keyword_audience/)、[Account recent change（账号近期变化）对象](https://dataxapi.com/zh/docs/objects/account_history/)、[Brand index history（品牌指数历史）对象](https://dataxapi.com/zh/docs/objects/brand_history/)、[Creator（达人）对象](https://dataxapi.com/zh/docs/objects/creator/)、[Audience（粉丝画像）对象](https://dataxapi.com/zh/docs/objects/audience/)、[Xingtu creator metrics（星图达人传播数据）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_metrics/)、[Xingtu creator video（星图达人作品）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_post/)、[PGY creator metrics（蒲公英博主数据表现）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_metrics/)、[PGY creator note（蒲公英博主笔记）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_post/)、[PGY note detail（蒲公英笔记详情）对象](https://dataxapi.com/zh/docs/objects/pgy_note/)、[Ad（广告）对象](https://dataxapi.com/zh/docs/objects/ad/)、[Advertiser（广告主）对象](https://dataxapi.com/zh/docs/objects/advertiser/)、[Douyin trend-index creator metrics（巨量算数达人核心指标）对象](https://dataxapi.com/zh/docs/objects/index_creator_metrics/)、[Xingtu creator content keywords（星图达人内容热词）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_keywords/)、[Xingtu creator scores（星图达人指数）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_scores/)、[Xingtu creator content mix（星图达人内容分布）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_content_mix/)、[Xingtu creator conversion（星图达人转化能力）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_conversion/)、[Xingtu campaign（星图营销活动）对象](https://dataxapi.com/zh/docs/objects/xingtu_campaign/)、[Channels collection（视频号合集）对象](https://dataxapi.com/zh/docs/objects/channels_collection/)、[Channels share link（视频号分享链接）对象](https://dataxapi.com/zh/docs/objects/channels_share_link/)、[Topic（话题）对象](https://dataxapi.com/zh/docs/objects/topic/)、[Account owner（账号主体）对象](https://dataxapi.com/zh/docs/objects/account_owner/)、[Mini program（小程序）对象](https://dataxapi.com/zh/docs/objects/miniprogram/)、[Follower history（粉丝数变化）对象](https://dataxapi.com/zh/docs/objects/follower_history/)、[PGY creator costs and summary（蒲公英博主合作成本和数据概览）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_costs/)、[PGY creator follower summary（蒲公英博主粉丝概览）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_followers/)、[PGY creator core figures history（蒲公英博主核心数据趋势）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_cost_history/)

---

最后核对于 2026-11-26 12:17 UTC。目录修订号 0051cce45e9530b9。 [网页版](https://dataxapi.com/zh/docs/objects/brand_metrics/)
