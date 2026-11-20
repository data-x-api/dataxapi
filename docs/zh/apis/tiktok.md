# TikTok API

18 个接口读 TikTok：视频、话题、用户、评论、广告库、创意中心、TikTok Shop。一次 $0.0020 起。不用登录 TikTok，不用 Cookie；失败不收费。

也叫：抖音国际版、抖音海外版

## TikTok 的 18 个接口，各取什么

- [TikTok 广告库搜索](https://dataxapi.com/zh/apis/tiktok/ads/search.md)：按关键词或广告主名字搜 TikTok 公开广告库（欧洲地区投放的广告）：广告主、标题、视频和图片素材、首次和最近一次展示的时间、触达人数档位；最新的在前，一页 12 条。这是广告透明度记录，和创意中心的热门广告是两份数据。
- [TikTok 广告库广告详情](https://dataxapi.com/zh/apis/tiktok/ads/get.md)：按编号或链接取 TikTok 公开广告库里的一条广告：广告主、标题、视频和图片素材、落地页、首次和最近一次展示的时间、投放的国家、投放目标。
- [TikTok 评论回复](https://dataxapi.com/zh/apis/tiktok/comments/replies/list.md)：按评论编号和它所在的视频编号取一页回复，每页 20 条：正文、回复者、点赞数、发布时间、回复的是哪一条。
- [TikTok 创意中心热门广告详情](https://dataxapi.com/zh/apis/tiktok/creative_center/ads/get.md)：按编号取 TikTok 创意中心的一条热门广告（Top Ads）：广告视频、文案、品牌名、落地页、点赞数、评论数、分享数、时长、投放目标、行业代号、投放的国家。
- [TikTok 创意中心热门广告搜索](https://dataxapi.com/zh/apis/tiktok/creative_center/ads/search.md)：按关键词搜 TikTok 创意中心的热门广告（Top Ads）：广告视频、文案、品牌名、点赞数、时长、投放目标；一次看一个国家，可选统计周期，按推荐或点赞数排序。一页 20 条。这是表现好的广告素材展示，不是广告库：没有投放时间。
- [TikTok 话题作品](https://dataxapi.com/zh/apis/tiktok/hashtags/videos/list.md)：按话题名取一页带这个话题的 TikTok 视频，每页约 20 条：文案、作者、互动数、封面和播放地址。
- [TikTok 用户资料](https://dataxapi.com/zh/apis/tiktok/users/get.md)：按账号名或编号取 TikTok 用户资料：显示名、简介、粉丝数、关注数、作品数、获赞数、是否认证。
- [TikTok 用户搜索](https://dataxapi.com/zh/apis/tiktok/users/search.md)：按关键词搜索 TikTok 账号，每页 30 个：账号名、显示名、粉丝数、关注数、作品数、获赞数。
- [TikTok 用户作品](https://dataxapi.com/zh/apis/tiktok/users/videos/list.md)：按账号名取一页 TikTok 用户发布的视频，每页 10 条：文案、互动数、发布时间、封面和播放地址，可按最新或最热排。
- [TikTok 视频评论](https://dataxapi.com/zh/apis/tiktok/videos/comments/list.md)：按视频编号或链接取一页 TikTok 评论，每页 50 条：正文、评论者和评论者账号的国家或地区、点赞数、回复数、发布时间。
- [TikTok 视频详情](https://dataxapi.com/zh/apis/tiktok/videos/get.md)：按视频编号或链接取一条 TikTok 视频：文案、作者、点赞评论分享收藏播放数、封面和播放地址。
- [TikTok 视频搜索](https://dataxapi.com/zh/apis/tiktok/videos/search.md)：按关键词搜索 TikTok 视频，每页 30 条，可按相关度、点赞数或发布时间排，可限定发布时间。
- [TikTok 视频字幕](https://dataxapi.com/zh/apis/tiktok/videos/transcript/get.md)：按视频编号或链接取 TikTok 视频里说的话：全文和带时间的分段，可用 lang 指定字幕语言。
- [TikTok Shop 商品详情](https://dataxapi.com/zh/apis/tiktok/shop/products/get.md)：按商品编号取 TikTok Shop 美国站的一件商品：标题、文字说明、图片、评分、评价数、已售件数，店铺和它的评分、粉丝数、在售商品数，商品页上显示的价格和运费。页面价比店铺列表和搜索里的价格高约一个运费，列表价用商品搜索取。
- [TikTok Shop 商品评价](https://dataxapi.com/zh/apis/tiktok/shop/products/reviews/list.md)：按商品编号取 TikTok Shop 美国站这件商品排在最前的 10 条买家评价：正文、评分、时间、买的规格、晒图。
- [TikTok Shop 商品搜索](https://dataxapi.com/zh/apis/tiktok/shop/products/search.md)：按搜索词取 TikTok Shop 美国站的商品：标题、现价和原价、评分、已售件数、店铺。
- [TikTok Shop 店铺商品](https://dataxapi.com/zh/apis/tiktok/shop/sellers/products/list.md)：按店铺编号取一页这家 TikTok Shop 美国站店铺在售的商品：标题、现价和原价、评分、评价数、已售件数。
- [TikTok 用户粉丝列表](https://dataxapi.com/zh/apis/tiktok/users/followers/list.md)：按账号名取一页关注该 TikTok 用户的账号，每页 50 个，从最新关注的开始：账号名、显示名、简介、粉丝数、关注数、作品数、获赞数，以及账号的国家或地区和语言，可看粉丝分布。

## 接口

### 视频 (4)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [TikTok 视频搜索](https://dataxapi.com/zh/apis/tiktok/videos/search.md) | `GET /v1/tiktok/videos/search` | 内容列表 | $0.0020 / 次 |
| [TikTok 视频详情](https://dataxapi.com/zh/apis/tiktok/videos/get.md) | `GET /v1/tiktok/videos/get` | 内容 | $0.0020 / 次 |
| [TikTok 视频字幕](https://dataxapi.com/zh/apis/tiktok/videos/transcript/get.md) | `GET /v1/tiktok/videos/transcript/get` | 逐字稿 | $0.0020 / 次 |
| [TikTok 视频评论](https://dataxapi.com/zh/apis/tiktok/videos/comments/list.md) | `GET /v1/tiktok/videos/comments/list` | 评论列表 | $0.0020 / 次 |

### 话题 (1)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [TikTok 话题作品](https://dataxapi.com/zh/apis/tiktok/hashtags/videos/list.md) | `GET /v1/tiktok/hashtags/videos/list` | 内容列表 | $0.0020 / 次 |

### 用户 (4)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [TikTok 用户搜索](https://dataxapi.com/zh/apis/tiktok/users/search.md) | `GET /v1/tiktok/users/search` | 账号列表 | $0.0020 / 次 |
| [TikTok 用户资料](https://dataxapi.com/zh/apis/tiktok/users/get.md) | `GET /v1/tiktok/users/get` | 账号 | $0.0020 / 次 |
| [TikTok 用户粉丝列表](https://dataxapi.com/zh/apis/tiktok/users/followers/list.md) | `GET /v1/tiktok/users/followers/list` | 账号列表 | $0.0020 / 次 |
| [TikTok 用户作品](https://dataxapi.com/zh/apis/tiktok/users/videos/list.md) | `GET /v1/tiktok/users/videos/list` | 内容列表 | $0.0020 / 次 |

### 评论 (1)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [TikTok 评论回复](https://dataxapi.com/zh/apis/tiktok/comments/replies/list.md) | `GET /v1/tiktok/comments/replies/list` | 评论列表 | $0.0020 / 次 |

### 广告库 (2)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [TikTok 广告库搜索](https://dataxapi.com/zh/apis/tiktok/ads/search.md) | `GET /v1/tiktok/ads/search` | 广告列表 | $0.0020 / 次 |
| [TikTok 广告库广告详情](https://dataxapi.com/zh/apis/tiktok/ads/get.md) | `GET /v1/tiktok/ads/get` | 广告 | $0.0020 / 次 |

### [创意中心](https://dataxapi.com/zh/apis/tiktok/creative_center.md) (2)

TikTok 创意中心的热门广告（Top Ads）：搜索榜单上投放中的广告，读单条广告的详情和表现。

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [TikTok 创意中心热门广告搜索](https://dataxapi.com/zh/apis/tiktok/creative_center/ads/search.md) | `GET /v1/tiktok/creative_center/ads/search` | 广告列表 | $0.0020 / 次 |
| [TikTok 创意中心热门广告详情](https://dataxapi.com/zh/apis/tiktok/creative_center/ads/get.md) | `GET /v1/tiktok/creative_center/ads/get` | 广告 | $0.0020 / 次 |

### [TikTok Shop](https://dataxapi.com/zh/apis/tiktok/shop.md) (4)

TikTok Shop 的公开商品数据：商品搜索、商品详情、买家评价和店铺在售商品。

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [TikTok Shop 商品搜索](https://dataxapi.com/zh/apis/tiktok/shop/products/search.md) | `GET /v1/tiktok/shop/products/search` | 商品列表 | $0.0020 / 次 |
| [TikTok Shop 商品详情](https://dataxapi.com/zh/apis/tiktok/shop/products/get.md) | `GET /v1/tiktok/shop/products/get` | 商品 | $0.0020 / 次 |
| [TikTok Shop 商品评价](https://dataxapi.com/zh/apis/tiktok/shop/products/reviews/list.md) | `GET /v1/tiktok/shop/products/reviews/list` | 评价列表 | $0.0020 / 次 |
| [TikTok Shop 店铺商品](https://dataxapi.com/zh/apis/tiktok/shop/sellers/products/list.md) | `GET /v1/tiktok/shop/sellers/products/list` | 商品列表 | $0.0020 / 次 |

## 调用前要知道的

- **每页条数**：列表每页 10 到 60 条，各接口不同。12 个列表里有 10 个能翻页：把 `page.next_cursor` 作为 `cursor` 传回，每一页是一次单独的调用。其余只有一页。
- **给不了的字段**：18 个接口里有 16 个填不满它返回的对象。每个接口的页面列出了给不了哪些，每次返回也在 `meta.unavailable` 里再写一遍：缺的字段不会被悄悄写成 0。
- **对象不存在时读起来像空结果**：TikTok 评论回复、TikTok 视频评论、TikTok Shop 商品评价：对象不存在和对象下面没有东西分不出来，所以返回空结果而不是 404。
- **预览结构**：有 8 个接口返回的是预览结构，字段还可能调整；其余返回统一的结构，所有平台都一样。

## 调用结果不对时先看这里

- **账号用账号名**：用户作品和粉丝用不带 @ 的账号名；话题作品用不带 # 的话题名。
- **只收长链接**：视频相关的接口用视频编号或长链接（tiktok.com/@账号名/video/编号），短链不收。
- **广告库和热门广告是两回事**：广告库是在欧洲投放过的广告的公开记录；热门广告是表现好的广告榜单，一次看一个国家（不写是美国），没有投放日期。
- **商城：美国站，只有第一页**：商城接口只覆盖美国站。商品详情不带价格，价格看商品搜索。商品搜索和商品评价都只给第一页，评价是前 10 条。
- **不是每条视频都有字幕**：没有字幕的视频按不存在返回，不扣费；不存在的视频编号也是同样的结果。

## 常见问题

### 通过 API 能拿到 TikTok 的哪些数据？

18 个接口：视频、话题、用户、评论、广告库、创意中心、TikTok Shop。每个接口的页面写明参数、返回字段，并附一份录制的真实返回。

### 怎么调用 TikTok API？

注册拿一把 Key，放进请求头 `Authorization: Bearer <key>`，按接口的地址发请求，比如 `GET https://api.dataxapi.com/v1/tiktok/ads/search`。也可以把 DataXAPI 接进 Claude、Cursor 或 ChatGPT（MCP），用一句话让 AI 去调。注册可免费试用，不用绑卡。

### TikTok 接口的返回给 AI 用，占多少 token？

TikTok 的 18 个接口各取一份录制的真实返回，平台原始 JSON 合计 228.6 万 token，AI 通过 DataXAPI 的 MCP 读到的只有 3.5 万 token，少 98%；直接调接口拿到的 JSON 也少 97%（2026-11-06 统计）。所有平台同一套字段名，用 fields 还能只取你要的字段。

### TikTok API 怎么收费？

按次收费，没有订阅。18 个接口都是一次 $0.0020。拿到数据才扣费，失败不收。

### 需要 TikTok 账号或 Cookie 吗？

不需要。你只拿一把 DataXAPI 的 Key：不用登录 TikTok，不用 Cookie，也不用养设备。接口只返回公开可见的数据。

### 数据是实时的吗？

每次调用都当场去 TikTok 取，`meta.fetched_at` 写明取到的时间。结果保留 24 小时，带同一个 `Idempotency-Key` 重试不会再扣一次。

### TikTok 改版了怎么办？

调用失败不管什么原因都不扣费。被暂停的接口返回 `capability_paused`，同样不扣费；`GET /v1/catalog/status` 写着现在哪些能用。

## 怎么做和常见问题

- [如何用 Python 批量获取 TikTok 评论](https://dataxapi.com/zh/guides/tiktok-comments-python.md)
- [如何把 TikTok 视频转成文字](https://dataxapi.com/zh/guides/tiktok-video-transcript.md)
- [如何搜索 TikTok Shop 商品并获取评价](https://dataxapi.com/zh/guides/tiktok-shop-product-reviews.md)
- [ChatGPT 能读 TikTok 吗？](https://dataxapi.com/zh/answers/can-chatgpt-read-tiktok.md)
- [TikTok 评论怎么导出 CSV（2026）](https://dataxapi.com/zh/answers/export-tiktok-comments-csv.md)
- [TikTok 广告资料库怎么批量查（2026）](https://dataxapi.com/zh/answers/tiktok-ad-library-bulk-search.md)
- [社媒接口返回太长，AI 上下文被塞满、token 烧得快怎么办？](https://dataxapi.com/zh/answers/api-response-too-many-tokens.md)
- [社媒数据接口给 AI 用要多少 token？每个接口逐个实测（2026）](https://dataxapi.com/zh/answers/social-media-api-token-benchmark.md)
- [给 AI 和 agent 用的TikTok数据接口：返回省 token、Claude 和 Cursor 直接调（2026）](https://dataxapi.com/zh/answers/tiktok-api-for-ai-agents.md)
- [TikTok 账号的粉丝来自哪些国家？粉丝国家和语言分布怎么查（2026）](https://dataxapi.com/zh/answers/tiktok-follower-countries.md)
- [不要卖家授权，怎么用 API 取 TikTok Shop 的商品数据？（2026）](https://dataxapi.com/zh/answers/tiktok-shop-product-data-api.md)

---

怎么调用、怎么计费、怎么处理报错，所有接口都一样：https://dataxapi.com/zh/llms.txt

最后核对于 2026-11-20 07:17 UTC。目录修订号 720fc3ea8dadb865。 [网页版](https://dataxapi.com/zh/apis/tiktok/)
