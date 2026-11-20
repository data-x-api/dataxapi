# 小红书蒲公英 API（小红书博主）

14 个接口读小红书蒲公英：博主搜索、报价、粉丝画像、数据表现、关键词搜索指数。一次 $0.0400。不用登录小红书，不用 Cookie；失败不收费。

也叫：PGY、小红书博主合作平台

## 这组数据是什么

**蒲公英是小红书官方的博主合作平台**，品牌在上面找博主做商业笔记。它有每位博主的图文和视频报价、粉丝画像、笔记的数据表现，还有自己的关键词搜索指数。

博主类接口按蒲公英博主编号读博主，编号由搜索接口返回。两个接口读关键词：一个词最近约三个月逐日的搜索指数，以及用户搜它之前和之后还会搜的词。

按博主编号的接口还能读到博主页上的更多数据：合作成本（图文和视频的预估 CPM、互动单价、阅读单价、外溢进店单价，各带优于多少同行）、核心数据逐日趋势、粉丝概览（活跃、互动、阅读、购买粉丝）、好不好联系和活不活跃、流量来源和长效笔记，以及可按合作、图文或视频、阅读最多、自然流量筛选的笔记案例；按笔记编号能读单篇笔记的曝光、阅读、互动、涨粉和报备品牌。

- **报价是人民币**：完整档里的 `ext.rate_image_note` 和 `ext.rate_video_note` 是博主挂的图文和视频报价，单位人民币。
- **近 30 或 90 天的中位数**：数据表现默认统计日常笔记，传 `tab=sponsored` 统计合作笔记：曝光、阅读、互动的中位数，互动率，点赞过百和过千的笔记占比，以及超过了多少同类博主。
- **是占比，不是人数**：粉丝画像给的是性别、年龄、省份、城市、兴趣、设备各段的占比，`measured_at` 写明是哪一天的数据。
- **是搜索指数，不是次数**：关键词指数是平台算出的指数。时间范围由平台定（约三个月），不能选；日期是中国时间的自然日。
- **是否商业合作**：博主笔记列表里写明每篇是不是商业合作，是的话还有合作品牌。

更新：当场取，调用那一刻去蒲公英读

## 这 14 个接口

### 关键词 (2)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [小红书蒲公英关键词逐日搜索指数](https://dataxapi.com/zh/apis/xiaohongshu/pgy/keywords/history.md) | `GET /v1/xiaohongshu/pgy/keywords/history` | 关键词指数历史 | $0.0400 / 次 |
| [小红书蒲公英关联词](https://dataxapi.com/zh/apis/xiaohongshu/pgy/keywords/related.md) | `GET /v1/xiaohongshu/pgy/keywords/related` | 关联词列表 | $0.0400 / 次 |

### 博主 (10)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [小红书蒲公英博主搜索](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/search.md) | `GET /v1/xiaohongshu/pgy/creators/search` | 达人列表 | $0.0400 / 次 |
| [小红书蒲公英博主粉丝画像](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/audience/get.md) | `GET /v1/xiaohongshu/pgy/creators/audience/get` | 粉丝画像 | $0.0400 / 次 |
| [小红书蒲公英博主详情](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/get.md) | `GET /v1/xiaohongshu/pgy/creators/get` | 达人 | $0.0400 / 次 |
| [小红书蒲公英博主核心数据趋势](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/costs/history.md) | `GET /v1/xiaohongshu/pgy/creators/costs/history` | 蒲公英博主核心数据趋势 | $0.0400 / 次 |
| [小红书蒲公英博主合作成本和数据概览](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/costs/metrics.md) | `GET /v1/xiaohongshu/pgy/creators/costs/metrics` | 蒲公英博主合作成本和数据概览 | $0.0400 / 次 |
| [小红书蒲公英博主粉丝趋势](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/followers/history.md) | `GET /v1/xiaohongshu/pgy/creators/followers/history` | 粉丝数变化 | $0.0400 / 次 |
| [小红书蒲公英博主粉丝概览](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/followers/metrics.md) | `GET /v1/xiaohongshu/pgy/creators/followers/metrics` | 蒲公英博主粉丝概览 | $0.0400 / 次 |
| [小红书蒲公英博主数据表现](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/metrics.md) | `GET /v1/xiaohongshu/pgy/creators/metrics` | 蒲公英博主数据表现 | $0.0400 / 次 |
| [小红书蒲公英博主笔记](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/notes/list.md) | `GET /v1/xiaohongshu/pgy/creators/notes/list` | 蒲公英博主笔记列表 | $0.0400 / 次 |
| [小红书蒲公英相似博主](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/related.md) | `GET /v1/xiaohongshu/pgy/creators/related` | 达人列表 | $0.0400 / 次 |

### 笔记 (2)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [小红书蒲公英笔记数据](https://dataxapi.com/zh/apis/xiaohongshu/pgy/notes/get.md) | `GET /v1/xiaohongshu/pgy/notes/get` | 蒲公英笔记详情 | $0.0400 / 次 |
| [小红书蒲公英内容广场热门笔记](https://dataxapi.com/zh/apis/xiaohongshu/pgy/notes/trending.md) | `GET /v1/xiaohongshu/pgy/notes/trending` | 内容列表 | $0.0400 / 次 |

## 一个典型用法，和它的账单

**种草投放前筛博主。**一次搜索用完整档，就能拿到 20 位博主的两档报价、阅读和互动中位数。粉丝画像和近期笔记只对留下的 5 位去读。

| 调用 | 次数 | 花费 |
| --- | --- | --- |
| 小红书蒲公英博主搜索 | 1 × $0.0400 | $0.0400 |
| 小红书蒲公英博主粉丝画像 | 5 × $0.0400 | $0.2000 |
| 小红书蒲公英博主笔记 | 5 × $0.0400 | $0.2000 |
| 合计 11 次调用 |  | $0.4400 |

## 在你的 AI 里用它

> 用 DataXAPI 在蒲公英上找写“咖啡”的小红书博主，列出图文报价和阅读中位数，再看前 5 位的粉丝画像。

## 常见问题

### 多少钱？

按次收费，没有订阅。14 个接口都是一次 $0.0400。拿到数据才扣费，失败不收。

### 报价是什么货币？

人民币，就是博主在蒲公英上挂的价格。DataXAPI 这次调用收的钱按美元计。

### 关键词指数的时间范围能选吗？

不能。平台固定给最近约三个月逐日的数，并带每天和这个词有关的笔记数、曝光数、阅读数和互动数。

### 博主编号从哪来？

从搜索接口来。它是蒲公英给博主的编号，其余四个博主接口都用它。

### 需要蒲公英或小红书的账号吗？

不需要。你只拿一把 DataXAPI 的 Key：不用登录小红书，不用 Cookie，也不用广告主账号。

## 别处的同类数据

- [抖音星图 API](https://dataxapi.com/zh/apis/douyin/xingtu.md)：抖音的达人合作平台：搜索、报价、粉丝画像、传播和转化。
- [抖音巨量算数 API](https://dataxapi.com/zh/apis/douyin/index.md)：抖音的关键词指数和蒲公英的结构一样，一段代码两边都能读。

## 怎么做和常见问题

- [如何查小红书蒲公英博主报价和粉丝画像](https://dataxapi.com/zh/guides/xiaohongshu-pgy-creator-rates.md)
- [如何查小红书蒲公英关键词的搜索指数和关联词](https://dataxapi.com/zh/guides/xiaohongshu-pgy-keywords.md)
- [小红书数据怎么导出？](https://dataxapi.com/zh/answers/export-xiaohongshu-data.md)
- [ChatGPT 能读小红书吗？](https://dataxapi.com/zh/answers/can-chatgpt-read-xiaohongshu.md)
- [小红书蒲公英 CPE 和抖音星图 CPE 有什么不同？](https://dataxapi.com/zh/answers/xiaohongshu-pgy-cpe-vs-xingtu-cpe.md)
- [小红书蒲公英是什么？通过 API 能拿到哪些博主数据？](https://dataxapi.com/zh/answers/what-is-xiaohongshu-pgy.md)

[小红书 API](https://dataxapi.com/zh/apis/xiaohongshu.md)

---

怎么调用、怎么计费、怎么处理报错，所有接口都一样：https://dataxapi.com/zh/llms.txt

最后核对于 2026-11-20 07:17 UTC。目录修订号 720fc3ea8dadb865。 [网页版](https://dataxapi.com/zh/apis/xiaohongshu/pgy/)
