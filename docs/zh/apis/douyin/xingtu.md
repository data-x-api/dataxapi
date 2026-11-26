# 抖音星图 API（巨量星图）

13 个接口读抖音星图：达人搜索、报价、粉丝画像、传播和转化。一次 $0.0020 到 $0.0400。不用登录抖音，不用 Cookie；失败不收费。

也叫：Xingtu

## 这组数据是什么

**星图是抖音官方的达人合作平台**，品牌在上面找达人拍商单视频。每位达人在星图上有报价、粉丝画像和各项表现数据，原本要广告主登录后才看得到。

这组接口按星图达人编号读这些数：各种合作形式的报价、粉丝画像、近 30 天或 90 天视频的传播数据、带货视频的转化，以及星图自己打的六项指数。按昵称搜索会返回其他接口要用的达人编号。

搜索还能按粉丝数、预期 CPM 和性别筛，按最低 CPM 排；完整档带植入和定制视频报价、预期 CPM、近 30 天互动率、完播率和播放中位数，以及电商带货等级。视频的星图报告带作者的星图达人编号。

- **星图达人编号**：不是抖音账号编号。搜索接口会返回它；达人资料里的 `account_id` 才是抖音账号接口用的那个。
- **报价是人民币**：`rates[].amount` 是达人自己挂的这种合作形式的报价，单位人民币；没有固定报价时为 `null`。`name` 和 `settlement` 是平台的原话。
- **中位数和比率**：传播数据按近 30 天或 90 天的视频统计：播放中位数，平均点赞、评论、分享，互动率和完播率，并带超过了多少同类达人。
- **是区间，不是精确销售额**：转化数据（销售额、千次播放成交额、点击成本）是平台给的区间文字，不是精确值。
- **六项指数**：星图指数（综合）和传播、种草、转化、合作、性价比五个分项：每项 0 到 100 分，带同类达人的平均分和名次。

更新：当场取，调用那一刻去星图读

## 这 13 个接口

### 达人 (10)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [抖音星图达人搜索](https://dataxapi.com/zh/apis/douyin/xingtu/creators/search.md) | `GET /v1/douyin/xingtu/creators/search` | 达人列表 | $0.0040 / 次 |
| [抖音星图达人粉丝画像](https://dataxapi.com/zh/apis/douyin/xingtu/creators/audience/get.md) | `GET /v1/douyin/xingtu/creators/audience/get` | 粉丝画像 | $0.0040 / 次 |
| [抖音星图达人内容分布](https://dataxapi.com/zh/apis/douyin/xingtu/creators/content_mix/get.md) | `GET /v1/douyin/xingtu/creators/content_mix/get` | 星图达人内容分布 | $0.0040 / 次 |
| [抖音星图达人转化能力](https://dataxapi.com/zh/apis/douyin/xingtu/creators/conversion/get.md) | `GET /v1/douyin/xingtu/creators/conversion/get` | 星图达人转化能力 | $0.0040 / 次 |
| [抖音星图达人资料](https://dataxapi.com/zh/apis/douyin/xingtu/creators/get.md) | `GET /v1/douyin/xingtu/creators/get` | 达人 | $0.0040 / 次 |
| [抖音星图达人内容热词](https://dataxapi.com/zh/apis/douyin/xingtu/creators/keywords/get.md) | `GET /v1/douyin/xingtu/creators/keywords/get` | 星图达人内容热词 | $0.0020 / 次 |
| [抖音星图达人商业报价](https://dataxapi.com/zh/apis/douyin/xingtu/creators/rates/get.md) | `GET /v1/douyin/xingtu/creators/rates/get` | 达人报价 | $0.0400 / 次 |
| [抖音星图达人星图指数](https://dataxapi.com/zh/apis/douyin/xingtu/creators/scores/get.md) | `GET /v1/douyin/xingtu/creators/scores/get` | 星图达人指数 | $0.0080 / 次 |
| [抖音星图达人传播数据](https://dataxapi.com/zh/apis/douyin/xingtu/creators/metrics.md) | `GET /v1/douyin/xingtu/creators/metrics` | 星图达人传播数据 | $0.0040 / 次 |
| [抖音星图达人作品表现](https://dataxapi.com/zh/apis/douyin/xingtu/creators/videos/list.md) | `GET /v1/douyin/xingtu/creators/videos/list` | 星图达人作品列表 | $0.0040 / 次 |

### 营销活动 (1)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [抖音星图营销活动日历](https://dataxapi.com/zh/apis/douyin/xingtu/campaigns/list.md) | `GET /v1/douyin/xingtu/campaigns/list` | 星图营销活动列表 | $0.0040 / 次 |

### 备用版 (1)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [抖音星图达人粉丝画像（备用版）](https://dataxapi.com/zh/apis/douyin/xingtu/backup/creators/audience/get.md) | `GET /v1/douyin/xingtu/backup/creators/audience/get` | 粉丝画像 | $0.0400 / 次 |

### 视频 (1)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [抖音星图视频数据报告（播放量、完播率）](https://dataxapi.com/zh/apis/douyin/xingtu/videos/get.md) | `GET /v1/douyin/xingtu/videos/get` | 内容 | $0.0040 / 次 |

## 一个典型用法，和它的账单

**给一次投放筛达人。**先按词搜索，再用 `ids` 一次取最多 50 位达人的两档视频报价和预估播放数。完整报价、传播数据和粉丝画像只对留下的 5 位去读。

| 调用 | 次数 | 花费 |
| --- | --- | --- |
| 抖音星图达人搜索 | 1 × $0.0040 | $0.0040 |
| 抖音星图达人资料 | 1 × $0.0040 | $0.0040 |
| 抖音星图达人商业报价 | 5 × $0.0400 | $0.2000 |
| 抖音星图达人传播数据 | 5 × $0.0040 | $0.0200 |
| 抖音星图达人粉丝画像 | 5 × $0.0040 | $0.0200 |
| 合计 17 次调用 |  | $0.2480 |

## 在你的 AI 里用它

> 用 DataXAPI 在星图上搜“露营”相关的抖音达人，把粉丝最多的 5 位的报价和近 30 天播放中位数列出来对比。

## 常见问题

### 多少钱？

按次收费，没有订阅。一次 $0.0020 到 $0.0400，每个接口的页面写明自己的价格。拿到数据才扣费，失败不收。

### 报价是什么货币？

人民币，就是达人在星图上挂的价格，返回里的 `currency` 写明了。DataXAPI 这次调用收的钱按美元计。

### 达人编号就是抖音用户编号吗？

不是。星图有自己的达人编号，搜索接口会返回。达人资料里另带抖音账号编号，可以传给抖音的用户接口。

### 达人没有带货数据怎么办？

没有带货数据的达人，转化能力接口返回 `not_found`，按接口价收费。

### 需要星图或抖音的账号吗？

不需要。你只拿一把 DataXAPI 的 Key：不用登录抖音，不用 Cookie，也不用广告主账号。

## 别处的同类数据

- [小红书蒲公英 API](https://dataxapi.com/zh/apis/xiaohongshu/pgy.md)：小红书的博主合作平台：搜索、报价、粉丝画像和数据表现，用的是同一个达人对象。
- [抖音巨量算数 API](https://dataxapi.com/zh/apis/douyin/index.md)：抖音另一组独有的数据：关键词、品牌和达人的指数。

## 怎么做和常见问题

- [如何查询抖音星图达人报价](https://dataxapi.com/zh/guides/douyin-xingtu-creator-rates.md)
- [小红书蒲公英 CPE 和抖音星图 CPE 有什么不同？](https://dataxapi.com/zh/answers/xiaohongshu-pgy-cpe-vs-xingtu-cpe.md)
- [抖音 sec_uid 是什么？和 uid、抖音号有什么区别？](https://dataxapi.com/zh/answers/douyin-sec-uid.md)
- [抖音星图是什么？通过 API 能拿到哪些达人数据？](https://dataxapi.com/zh/answers/what-is-douyin-xingtu.md)
- [抖音博主所有视频数据怎么导出（2026）](https://dataxapi.com/zh/answers/export-douyin-creator-videos.md)
- [蝉妈妈、千瓜、新榜有 API 吗？想要原始数据怎么办（2026）](https://dataxapi.com/zh/answers/chanmama-qiangua-newrank-api.md)
- [星图怎么批量筛达人、看报价（2026）](https://dataxapi.com/zh/answers/douyin-xingtu-creators-bulk-filter.md)
- [抖音数据接口有哪些？第三方接口和开放平台的区别，能取什么（2026）](https://dataxapi.com/zh/answers/douyin-third-party-data-apis.md)
- [抖音 MCP：在 Claude、Cursor 里查抖音视频和评论（2026）](https://dataxapi.com/zh/answers/douyin-mcp.md)
- [抖音、小红书达人数据怎么批量取？KOL 资料、作品和报价（2026）](https://dataxapi.com/zh/answers/douyin-xiaohongshu-creator-data.md)
- [中国社媒营销数据工具大全：巨量算数、蒲公英、星图、微信指数等官方工具和数据接口（2026）](https://dataxapi.com/zh/answers/chinese-social-media-marketing-data-tools.md)
- [抖音视频的完播率和播放量怎么查？（星图视频报告 API，2026）](https://dataxapi.com/zh/answers/douyin-video-completion-rate.md)
- [抖音星图达人页上的每个数据，API 都能取到吗？逐项对照（2026）](https://dataxapi.com/zh/answers/douyin-xingtu-creator-page-fields.md)
- [星图植入视频和定制视频报价有什么区别？怎么用 API 取（2026）](https://dataxapi.com/zh/answers/douyin-xingtu-integrated-vs-custom-rate.md)
- [星图怎么按 CPM 找达人？筛出 CPM 低的抖音达人（2026）](https://dataxapi.com/zh/answers/douyin-xingtu-find-creators-by-cpm.md)
- [有抖音视频链接，怎么查到作者的星图达人编号和报价？（2026）](https://dataxapi.com/zh/answers/douyin-video-to-xingtu-creator.md)
- [怎么查一个抖音号有没有商品橱窗、能不能直播带货、是不是蓝 V？（2026）](https://dataxapi.com/zh/answers/douyin-account-showcase-live-selling.md)

[抖音 API](https://dataxapi.com/zh/apis/douyin.md)

---

怎么调用、怎么计费、怎么处理报错，所有接口都一样：https://dataxapi.com/zh/llms.txt

最后核对于 2026-11-26 12:17 UTC。目录修订号 0051cce45e9530b9。 [网页版](https://dataxapi.com/zh/apis/douyin/xingtu/)
