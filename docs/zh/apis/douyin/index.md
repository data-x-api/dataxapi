# 抖音巨量算数 API（抖音指数）

10 个接口读抖音巨量算数：关键词热度趋势、关联词、人群画像、品牌指数、实时热点。一次 $0.0020 到 $0.0060。不用登录抖音，不用 Cookie；失败不收费。

也叫：trend-index、算数指数、巨量指数、巨量引擎指数

## 这组数据是什么

**巨量算数是抖音官方的指数平台。**它逐日给出一个关键词被搜索的热度，以及相关内容受关注的热度；品牌和达人也有同样的指数。做市场的人用它看一个话题是不是在涨、什么时候到顶、是谁在关心。

这组接口读的就是这个平台上看到的数，用 DataXAPI 的统一格式返回。同一段代码读完抖音上的一个词，也能读它在小红书上的指数。

- **是指数，不是次数**：指数是平台自己算的热度分，不是搜索次数。它适合和自己的过去比，或者和抖音上另一个词比。
- **两种指数**：`search_index` 看这个词被搜得多不多；`composite_index` 看相关内容受不受关注。品牌有三种：搜索、内容、传播。
- **晚一到两天**：平台每天的数要晚一到两天才出。还没出数的日子返回 `null`，不会写成 0。
- **按中国时间算一天**：一天是中国时间（UTC+8）的一个自然日，写成这个日期的 UTC 零点：`2026-09-01` 就是北京时间 9 月 1 日。
- **TGI**：关键词人群画像里的 TGI 是这一组人对这个词的偏好：100 是全平台平均，高于 100 是更偏好。

更新：每天，平台晚一到两天出数，按中国时间

## 这 10 个接口

### 关键词 (3)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [抖音巨量算数关键词人群画像](https://dataxapi.com/zh/apis/douyin/index/keywords/audience/get.md) | `GET /v1/douyin/index/keywords/audience/get` | 关键词人群画像 | $0.0020 / 次 |
| [抖音巨量算数关键词热度趋势](https://dataxapi.com/zh/apis/douyin/index/keywords/history.md) | `GET /v1/douyin/index/keywords/history` | 关键词指数历史列表 | $0.0060 / 次 |
| [抖音巨量算数关联词](https://dataxapi.com/zh/apis/douyin/index/keywords/related.md) | `GET /v1/douyin/index/keywords/related` | 关联词列表 | $0.0020 / 次 |

### 品牌 (2)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [抖音巨量算数品牌指数趋势](https://dataxapi.com/zh/apis/douyin/index/brands/history.md) | `GET /v1/douyin/index/brands/history` | 品牌指数历史 | $0.0020 / 次 |
| [抖音巨量算数品牌指数对比](https://dataxapi.com/zh/apis/douyin/index/brands/metrics.md) | `GET /v1/douyin/index/brands/metrics` | 品牌指数均值 | $0.0020 / 次 |

### 达人 (3)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [抖音巨量算数达人粉丝画像](https://dataxapi.com/zh/apis/douyin/index/creators/audience/get.md) | `GET /v1/douyin/index/creators/audience/get` | 粉丝画像 | $0.0020 / 次 |
| [抖音巨量算数达人核心指标](https://dataxapi.com/zh/apis/douyin/index/creators/metrics.md) | `GET /v1/douyin/index/creators/metrics` | 巨量算数达人核心指标 | $0.0020 / 次 |
| [抖音巨量算数达人热门视频](https://dataxapi.com/zh/apis/douyin/index/creators/videos/list.md) | `GET /v1/douyin/index/creators/videos/list` | 内容列表 | $0.0020 / 次 |

### 视频 (1)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [抖音巨量算数关键词热门视频](https://dataxapi.com/zh/apis/douyin/index/videos/search.md) | `GET /v1/douyin/index/videos/search` | 内容列表 | $0.0020 / 次 |

### 热榜 (1)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [抖音巨量算数实时热点](https://dataxapi.com/zh/apis/douyin/index/trends/list.md) | `GET /v1/douyin/index/trends/list` | 热点列表 | $0.0020 / 次 |

## 一个典型用法，和它的账单

**每周盯五个关键词。**一次调用就拿到五个词逐日的指数：一次带 1 到 5 个词，价格一样。每个月再调一次关联词，看大家在这个词旁边还搜什么，让盯的词表跟得上。

| 调用 | 次数 | 花费 |
| --- | --- | --- |
| 抖音巨量算数关键词热度趋势 | 52 × $0.0060 | $0.3120 |
| 抖音巨量算数关联词 | 12 × $0.0020 | $0.0240 |
| 合计 64 次调用 |  | $0.3360 |

## 在你的 AI 里用它

> 用 DataXAPI 查“露营”“露营咖啡”“户外电源”最近 30 天在抖音巨量算数上的搜索指数，告诉我哪个涨得最快。

## 常见问题

### 多少钱？

按次收费，没有订阅。一次 $0.0020 到 $0.0060，每个接口的页面写明自己的价格。拿到数据才扣费，失败不收。

### 数据从哪来？

来自抖音官方的指数工具巨量算数，也就是大家常说的抖音指数：关键词、品牌、达人的数和它页面上显示的一样。不用抖音账号，也不用广告主账号。

### 能查多长时间范围？

`since` 到 `until` 之间任意整天（按中国时间），时间段长短不影响价格。每个词还附带本期、上期和去年同期的日均值。

### 一次能查几个词？

关键词热度趋势一次 1 到 5 个词，按次收费：查 5 个词和查 1 个同价。人群画像和关联词一次查一个词。

### 怎么在 AI 里用？

先用一段带 Key 的提示词把 DataXAPI 接进你的 AI（在“给 AI 代理”页），然后直接问，比如：“用 DataXAPI 查‘咖啡’2026 年 9 月的抖音指数。”它会自己找到接口、调用，按次从余额里扣。

### 指数是搜索次数吗？

不是。它是平台按搜索和关注的热度算出来的分。适合拿一个词和自己的过去比，或者和抖音上另一个词比，不要和别的平台的数相加。

### 数据有多新？

平台每天的数晚一到两天出。每次调用都是当场去读，`meta.fetched_at` 写明读到的时间；还没出数的日子返回 `null`。两个热点榜是几分钟前的快照。

### 平台没收录我的关键词怎么办？

平台没收录的词不在返回里。

### 需要巨量算数或抖音的账号吗？

不需要。你只拿一把 DataXAPI 的 Key：不用登录抖音，不用 Cookie，也不用广告主账号。

## 别处的同类数据

- [小红书蒲公英 API](https://dataxapi.com/zh/apis/xiaohongshu/pgy.md)：小红书的关键词搜索指数和关联词返回同一种结构，一段代码两边都能读。
- [抖音星图 API](https://dataxapi.com/zh/apis/douyin/xingtu.md)：抖音另一组独有的数据：达人报价、粉丝画像、转化能力。

## 怎么做和常见问题

- [如何批量获取抖音关键词热度趋势](https://dataxapi.com/zh/guides/douyin-keyword-trends.md)
- [抖音数据怎么导出？](https://dataxapi.com/zh/answers/export-douyin-data.md)
- [抖音 sec_uid 是什么？和 uid、抖音号有什么区别？](https://dataxapi.com/zh/answers/douyin-sec-uid.md)
- [抖音搜索指数等于搜索次数吗？](https://dataxapi.com/zh/answers/douyin-search-index-vs-search-count.md)
- [巨量算数关键词指数是什么、能拿到什么？](https://dataxapi.com/zh/answers/what-is-douyin-keyword-index-ocean-engine.md)

[抖音 API](https://dataxapi.com/zh/apis/douyin.md)

---

怎么调用、怎么计费、怎么处理报错，所有接口都一样：https://dataxapi.com/zh/llms.txt

最后核对于 2026-11-20 07:17 UTC。目录修订号 720fc3ea8dadb865。 [网页版](https://dataxapi.com/zh/apis/douyin/index/)
