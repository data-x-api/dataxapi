# 抖音 API

38 个接口读抖音：视频、话题、用户、评论、热榜、关键词、巨量算数、星图。一次 $0.0020 起。不用登录抖音，不用 Cookie；失败不收费。

也叫：Douyin、抖音短视频

## 接口

### 备用版 (2)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [抖音视频搜索（备用版）](https://dataxapi.com/zh/apis/douyin/backup/videos/search.md) | `GET /v1/douyin/backup/videos/search` | 内容列表 | $0.0300 / 次 |
| [抖音用户视频（备用版）](https://dataxapi.com/zh/apis/douyin/backup/users/videos/list.md) | `GET /v1/douyin/backup/users/videos/list` | 内容列表 | $0.0300 / 次 |

### 视频 (6)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [抖音视频搜索](https://dataxapi.com/zh/apis/douyin/videos/search.md) | `GET /v1/douyin/videos/search` | 内容列表 | $0.0200 / 次 |
| [抖音视频详情](https://dataxapi.com/zh/apis/douyin/videos/get.md) | `GET /v1/douyin/videos/get` | 内容 | $0.0020 / 次 |
| [抖音视频评论](https://dataxapi.com/zh/apis/douyin/videos/comments/list.md) | `GET /v1/douyin/videos/comments/list` | 评论列表 | $0.0020 / 次 |
| [抖音视频播放量](https://dataxapi.com/zh/apis/douyin/videos/metrics.md) | `GET /v1/douyin/videos/metrics` | 内容 | $0.0020 / 次 |
| [抖音相关视频](https://dataxapi.com/zh/apis/douyin/videos/related.md) | `GET /v1/douyin/videos/related` | 内容列表 | $0.0020 / 次 |
| [抖音视频榜](https://dataxapi.com/zh/apis/douyin/videos/trending.md) | `GET /v1/douyin/videos/trending` | 内容列表 | $0.0020 / 次 |

### 话题 (1)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [抖音话题视频](https://dataxapi.com/zh/apis/douyin/hashtags/videos/list.md) | `GET /v1/douyin/hashtags/videos/list` | 内容列表 | $0.0020 / 次 |

### 用户 (4)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [抖音用户搜索](https://dataxapi.com/zh/apis/douyin/users/search.md) | `GET /v1/douyin/users/search` | 账号列表 | $0.0020 / 次 |
| [抖音用户资料](https://dataxapi.com/zh/apis/douyin/users/get.md) | `GET /v1/douyin/users/get` | 账号 | $0.0020 / 次 |
| [抖音达人互动与粉丝趋势](https://dataxapi.com/zh/apis/douyin/users/history.md) | `GET /v1/douyin/users/history` | 账号近期变化 | $0.0020 / 次 |
| [抖音用户视频](https://dataxapi.com/zh/apis/douyin/users/videos/list.md) | `GET /v1/douyin/users/videos/list` | 内容列表 | $0.0020 / 次 |

### 评论 (1)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [抖音评论回复](https://dataxapi.com/zh/apis/douyin/comments/replies/list.md) | `GET /v1/douyin/comments/replies/list` | 评论列表 | $0.0020 / 次 |

### 热榜 (1)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [抖音热榜](https://dataxapi.com/zh/apis/douyin/trends/list.md) | `GET /v1/douyin/trends/list` | 热点列表 | $0.0020 / 次 |

### 关键词 (1)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [抖音搜索框联想词](https://dataxapi.com/zh/apis/douyin/keywords/related.md) | `GET /v1/douyin/keywords/related` | 关联词列表 | $0.0200 / 次 |

### [巨量算数](https://dataxapi.com/zh/apis/douyin/index.md) (10)

抖音官方的指数工具：关键词和品牌的逐日指数、搜索人群画像、关联词、实时热点和达人指标。

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [抖音巨量算数关键词热门视频](https://dataxapi.com/zh/apis/douyin/index/videos/search.md) | `GET /v1/douyin/index/videos/search` | 内容列表 | $0.0020 / 次 |
| [抖音巨量算数达人粉丝画像](https://dataxapi.com/zh/apis/douyin/index/creators/audience/get.md) | `GET /v1/douyin/index/creators/audience/get` | 粉丝画像 | $0.0020 / 次 |
| [抖音巨量算数关键词人群画像](https://dataxapi.com/zh/apis/douyin/index/keywords/audience/get.md) | `GET /v1/douyin/index/keywords/audience/get` | 关键词人群画像 | $0.0020 / 次 |
| [抖音巨量算数品牌指数趋势](https://dataxapi.com/zh/apis/douyin/index/brands/history.md) | `GET /v1/douyin/index/brands/history` | 品牌指数历史 | $0.0020 / 次 |
| [抖音巨量算数品牌指数对比](https://dataxapi.com/zh/apis/douyin/index/brands/metrics.md) | `GET /v1/douyin/index/brands/metrics` | 品牌指数均值 | $0.0020 / 次 |
| [抖音巨量算数达人核心指标](https://dataxapi.com/zh/apis/douyin/index/creators/metrics.md) | `GET /v1/douyin/index/creators/metrics` | 巨量算数达人核心指标 | $0.0020 / 次 |
| [抖音巨量算数达人热门视频](https://dataxapi.com/zh/apis/douyin/index/creators/videos/list.md) | `GET /v1/douyin/index/creators/videos/list` | 内容列表 | $0.0020 / 次 |
| [抖音巨量算数关键词热度趋势](https://dataxapi.com/zh/apis/douyin/index/keywords/history.md) | `GET /v1/douyin/index/keywords/history` | 关键词指数历史列表 | $0.0060 / 次 |
| [抖音巨量算数关联词](https://dataxapi.com/zh/apis/douyin/index/keywords/related.md) | `GET /v1/douyin/index/keywords/related` | 关联词列表 | $0.0020 / 次 |
| [抖音巨量算数实时热点](https://dataxapi.com/zh/apis/douyin/index/trends/list.md) | `GET /v1/douyin/index/trends/list` | 热点列表 | $0.0020 / 次 |

### [星图](https://dataxapi.com/zh/apis/douyin/xingtu.md) (12)

抖音官方的达人合作平台：达人搜索、报价、粉丝画像、传播和转化数据。

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
| [抖音星图视频数据报告（播放量、完播率）](https://dataxapi.com/zh/apis/douyin/xingtu/videos/get.md) | `GET /v1/douyin/xingtu/videos/get` | 内容 | $0.0040 / 次 |
| [抖音星图营销活动日历](https://dataxapi.com/zh/apis/douyin/xingtu/campaigns/list.md) | `GET /v1/douyin/xingtu/campaigns/list` | 星图营销活动列表 | $0.0040 / 次 |
| [抖音星图达人传播数据](https://dataxapi.com/zh/apis/douyin/xingtu/creators/metrics.md) | `GET /v1/douyin/xingtu/creators/metrics` | 星图达人传播数据 | $0.0040 / 次 |
| [抖音星图达人作品表现](https://dataxapi.com/zh/apis/douyin/xingtu/creators/videos/list.md) | `GET /v1/douyin/xingtu/creators/videos/list` | 星图达人作品列表 | $0.0040 / 次 |

## 调用前要知道的

- **每页条数**：列表每页 1 到 250 条，各接口不同。20 个列表里有 12 个能翻页：把 `page.next_cursor` 作为 `cursor` 传回，每一页是一次单独的调用。其余只有一页。
- **给不了的字段**：38 个接口里有 22 个填不满它返回的对象。每个接口的页面列出了给不了哪些，每次返回也在 `meta.unavailable` 里再写一遍：缺的字段不会被悄悄写成 0。
- **对象不存在时读起来像空结果**：抖音评论回复、抖音巨量算数达人热门视频、抖音巨量算数关键词热度趋势、抖音巨量算数关联词、抖音用户视频、抖音视频评论、抖音相关视频、抖音星图达人作品表现、抖音搜索框联想词、抖音用户视频（备用版）：对象不存在和对象下面没有东西分不出来，所以返回空结果而不是 404。
- **一次取多个**：用 `ids` 一次请求可以取多个：抖音达人互动与粉丝趋势（最多 5 个）、抖音星图达人资料（最多 50 个）。
- **预览结构**：有 20 个接口返回的是预览结构，字段还可能调整；其余返回统一的结构，所有平台都一样。
- **快照**：抖音巨量算数实时热点、抖音热榜、抖音视频榜：榜单是每 10 分钟刷新一次的快照，`meta.fetched_at` 写明是什么时候取的。

## 调用结果不对时先看这里

- **两种账号编号**：账号资料和账号作品用 sec_uid，就是主页链接 douyin.com/user/ 后面 MS4w 开头的那一串。巨量算数里查账号的接口用的是数字编号（uid），两种不能混用。
- **星图达人编号**：星图的接口用星图达人编号，不是抖音账号编号，从星图达人搜索的结果里取。按一个编号取星图达人资料，能顺带拿到他的抖音账号编号。
- **播放量在哪取**：视频详情、视频搜索和账号作品列表都不带播放量。要播放量，用 `douyin.videos.metrics` 按视频编号取（连点赞数一起）；视频榜单上也有播放量。
- **空结果不等于不存在**：不存在的视频取评论、不存在的账号取作品，都返回空列表。相关视频接口不核对编号：不存在的视频编号照样返回一批和它无关的推荐，或者空结果。
- **一个编号不对，整批取不到**：`douyin.users.history` 一次最多带 5 个数字编号；其中有一个不存在，整批都取不到。

## 常见问题

### 抖音 API 怎么收费？

按次收费，没有订阅。一次 $0.0020 到 $0.0400，每个接口的页面写明自己的价格。拿到数据才扣费，失败不收。

### 需要抖音账号或 Cookie 吗？

不需要。你只拿一把 DataXAPI 的 Key：不用登录抖音，不用 Cookie，也不用养设备。接口只返回公开可见的数据。

### 数据是实时的吗？

每次调用都当场去抖音取，`meta.fetched_at` 写明取到的时间。抖音巨量算数实时热点、抖音热榜、抖音视频榜：榜单是每 10 分钟刷新一次的快照。结果保留 24 小时，带同一个 `Idempotency-Key` 重试不会再扣一次。

### 抖音改版了怎么办？

调用失败不管什么原因都不扣费。被暂停的接口返回 `capability_paused`，同样不扣费；`GET /v1/catalog/status` 写着现在哪些能用。

## 怎么做和常见问题

- [如何批量获取抖音关键词热度趋势](https://dataxapi.com/zh/guides/douyin-keyword-trends.md)
- [如何批量导出抖音视频评论](https://dataxapi.com/zh/guides/douyin-video-comments.md)
- [如何查询抖音星图达人报价](https://dataxapi.com/zh/guides/douyin-xingtu-creator-rates.md)
- [抖音数据怎么导出？](https://dataxapi.com/zh/answers/export-douyin-data.md)
- [小红书蒲公英 CPE 和抖音星图 CPE 有什么不同？](https://dataxapi.com/zh/answers/xiaohongshu-pgy-cpe-vs-xingtu-cpe.md)
- [抖音 sec_uid 是什么？和 uid、抖音号有什么区别？](https://dataxapi.com/zh/answers/douyin-sec-uid.md)
- [抖音 aweme_id、modal_id 是什么？v.douyin.com 短链接怎么用？](https://dataxapi.com/zh/answers/douyin-aweme-id-modal-id.md)
- [抖音搜索指数等于搜索次数吗？](https://dataxapi.com/zh/answers/douyin-search-index-vs-search-count.md)
- [巨量算数关键词指数是什么、能拿到什么？](https://dataxapi.com/zh/answers/what-is-douyin-keyword-index-ocean-engine.md)
- [抖音星图是什么？通过 API 能拿到哪些达人数据？](https://dataxapi.com/zh/answers/what-is-douyin-xingtu.md)

---

怎么调用、怎么计费、怎么处理报错，所有接口都一样：https://dataxapi.com/zh/llms.txt

最后核对于 2026-11-20 07:17 UTC。目录修订号 720fc3ea8dadb865。 [网页版](https://dataxapi.com/zh/apis/douyin/)
