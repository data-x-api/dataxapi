# 快手 API

8 个接口读快手：视频、用户、评论、热榜。一次 $0.0020 起。不用登录快手，不用 Cookie；失败不收费。

也叫：Kuaishou、快手短视频

## 快手的 8 个接口，各取什么

- [快手评论回复](https://dataxapi.com/zh/apis/kuaishou/comments/replies/list.md)：按评论编号和它所在的作品编号取一页这条评论下的回复：正文、回复者、点赞数、发布时间、IP 属地。
- [快手热榜](https://dataxapi.com/zh/apis/kuaishou/trends/list.md)：取快手热榜：50 个热点词连同平台置顶的条目，带名次和热度。
- [快手用户资料](https://dataxapi.com/zh/apis/kuaishou/users/get.md)：按用户编号取快手用户资料：显示名、快手号、简介、粉丝数、关注数、作品数、获赞总数、是否认证；完整档另有认证说明、IP 属地、性别、主页有没有快手小店。
- [快手用户搜索](https://dataxapi.com/zh/apis/kuaishou/users/search.md)：按搜索词取一页快手账号，可只看认证账号或正在直播的账号、按性别筛选、按粉丝数排序：用户编号、显示名、快手号、简介、粉丝数、是否认证。
- [快手用户作品](https://dataxapi.com/zh/apis/kuaishou/users/videos/list.md)：按用户编号取一页这个快手账号发布的视频，按最新或最热门排序：文案、播放数、互动数、发布时间。
- [快手作品评论](https://dataxapi.com/zh/apis/kuaishou/videos/comments/list.md)：按作品编号取一页快手视频的一级评论：正文、评论者、点赞数、发布时间、IP 属地。
- [快手作品详情](https://dataxapi.com/zh/apis/kuaishou/videos/get.md)：按作品编号或链接取一条快手视频：文案、作者、播放数、互动数、发布时间。
- [快手视频搜索](https://dataxapi.com/zh/apis/kuaishou/videos/search.md)：按搜索词取一页快手作品，可按最新或最多点赞排序、按发布时间和视频时长筛选：文案、作者、播放数、互动数、发布时间、是视频还是图集，视频带时长。

## 接口

### 视频 (3)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [快手视频搜索](https://dataxapi.com/zh/apis/kuaishou/videos/search.md) | `GET /v1/kuaishou/videos/search` | 内容列表 | $0.0200 / 次 |
| [快手作品详情](https://dataxapi.com/zh/apis/kuaishou/videos/get.md) | `GET /v1/kuaishou/videos/get` | 内容 | $0.0020 / 次 |
| [快手作品评论](https://dataxapi.com/zh/apis/kuaishou/videos/comments/list.md) | `GET /v1/kuaishou/videos/comments/list` | 评论列表 | $0.0020 / 次 |

### 用户 (3)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [快手用户搜索](https://dataxapi.com/zh/apis/kuaishou/users/search.md) | `GET /v1/kuaishou/users/search` | 账号列表 | $0.0200 / 次 |
| [快手用户资料](https://dataxapi.com/zh/apis/kuaishou/users/get.md) | `GET /v1/kuaishou/users/get` | 账号 | $0.0200 / 次 |
| [快手用户作品](https://dataxapi.com/zh/apis/kuaishou/users/videos/list.md) | `GET /v1/kuaishou/users/videos/list` | 内容列表 | $0.0200 / 次 |

### 评论 (1)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [快手评论回复](https://dataxapi.com/zh/apis/kuaishou/comments/replies/list.md) | `GET /v1/kuaishou/comments/replies/list` | 评论列表 | $0.0020 / 次 |

### 热榜 (1)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [快手热榜](https://dataxapi.com/zh/apis/kuaishou/trends/list.md) | `GET /v1/kuaishou/trends/list` | 热点列表 | $0.0020 / 次 |

## 调用前要知道的

- **每页条数**：列表每页 10 到 60 条，各接口不同。6 个列表里有 5 个能翻页：把 `page.next_cursor` 作为 `cursor` 传回，每一页是一次单独的调用。其余只有一页。
- **给不了的字段**：8 个接口里有 7 个填不满它返回的对象。每个接口的页面列出了给不了哪些，每次返回也在 `meta.unavailable` 里再写一遍：缺的字段不会被悄悄写成 0。
- **对象不存在时读起来像空结果**：快手评论回复、快手用户作品、快手作品评论：对象不存在和对象下面没有东西分不出来，所以返回空结果而不是 404。
- **快照**：快手热榜：榜单是每 10 分钟刷新一次的快照，`meta.fetched_at` 写明是什么时候取的。

## 调用结果不对时先看这里

- **作品编号是 3x 开头的那段**：作品编号是作品网页链接里 3x 开头的那一段（kuaishou.com/short-video/3x…），详情、评论、回复都用它。
- **用户编号是一串数字**：用户资料和用户作品用一串数字的用户编号，不是用户自己起的快手号。
- **取回复要两个编号**：取评论回复要带评论编号和它所在作品的 3x 编号。回复里不写它挂在哪条评论下，评论也不带回复数。
- **空结果不等于不存在**：不存在的作品取评论、不存在的用户取作品、不存在的评论取回复，都返回空列表。
- **按最热排单独计价**：用户作品按最热排（`sort=popular`）单独定价，而且不一定带收藏数，没带时这个字段是 null。

## 常见问题

### 快手有官方 API 吗？

有。快手开放平台要先做资质认证，填公司、法人和管理员信息，审核通过才能建应用。视频接口（/openapi/photo/list 和 /openapi/photo/info，权限 user_video_info）读的是授权用户自己的视频，一页最多 200 条，用户信息也要本人授权。我们在它的文档里没有找到评论或搜索接口。

### 通过 API 能拿到快手的哪些数据？

8 个接口：视频、用户、评论、热榜。每个接口的页面写明参数、返回字段，并附一份录制的真实返回。

### 怎么调用快手 API？

注册拿一把 Key，放进请求头 `Authorization: Bearer <key>`，按接口的地址发请求，比如 `GET https://api.dataxapi.com/v1/kuaishou/comments/replies/list`。也可以把 DataXAPI 接进 Claude、Cursor 或 ChatGPT（MCP），用一句话让 AI 去调。注册可免费试用，不用绑卡。

### 快手接口的返回给 AI 用，占多少 token？

快手的 8 个接口各取一份录制的真实返回，平台原始 JSON 合计 27.1 万 token，AI 通过 DataXAPI 的 MCP 读到的只有 1.2 万 token，少 95%；直接调接口拿到的 JSON 也少 93%（2026-11-06 统计）。所有平台同一套字段名，用 fields 还能只取你要的字段。

### 快手 API 怎么收费？

按次收费，没有订阅。一次 $0.0020 到 $0.0200，每个接口的页面写明自己的价格。拿到数据才扣费，失败不收。

### 需要快手账号或 Cookie 吗？

不需要。你只拿一把 DataXAPI 的 Key：不用登录快手，不用 Cookie，也不用养设备。接口只返回公开可见的数据。

### 数据是实时的吗？

每次调用都当场去快手取，`meta.fetched_at` 写明取到的时间。快手热榜：榜单是每 10 分钟刷新一次的快照。结果保留 24 小时，带同一个 `Idempotency-Key` 重试不会再扣一次。

### 快手改版了怎么办？

调用失败不管什么原因都不扣费。被暂停的接口返回 `capability_paused`，同样不扣费；`GET /v1/catalog/status` 写着现在哪些能用。

## 怎么做和常见问题

- [快手有 API 吗？用 Python 拉取视频和评论（2026）](https://dataxapi.com/zh/guides/kuaishou-api-python.md)
- [快手 did、kww 是什么（2026）](https://dataxapi.com/zh/answers/kuaishou-did-kww.md)
- [快手数据接口有哪些？视频、用户、评论怎么取（2026）](https://dataxapi.com/zh/answers/kuaishou-data-apis.md)
- [快手 MCP：在 Claude、Cursor 里查快手数据（2026）](https://dataxapi.com/zh/answers/kuaishou-mcp.md)
- [一个 Key 调小红书、抖音、公众号：社媒数据 API 聚合怎么选（2026）](https://dataxapi.com/zh/answers/one-key-china-social-data-api.md)
- [热榜 API：抖音热搜、微博热搜、知乎热榜、B站热门怎么用程序取（2026）](https://dataxapi.com/zh/answers/china-trending-api.md)
- [舆情监控 API 有哪些？一个关键词同时查微博、抖音、小红书等平台（2026）](https://dataxapi.com/zh/answers/social-listening-api-china.md)
- [快手作品 ID、用户 ID 怎么找？短链接怎么转（2026）](https://dataxapi.com/zh/answers/kuaishou-video-user-id.md)
- [社媒数据接口常见问题：按平台说清能取什么、不能取什么（2026）](https://dataxapi.com/zh/answers/social-media-data-api-faq.md)
- [哪个社媒数据接口最适合接给 AI？看一次返回占多少 token（2026）](https://dataxapi.com/zh/answers/social-media-api-for-ai-agents.md)
- [给 AI 和 agent 用的快手数据接口：返回省 token、Claude 和 Cursor 直接调（2026）](https://dataxapi.com/zh/answers/kuaishou-api-for-ai-agents.md)
- [快手作品是视频还是图集，接口怎么区分？（2026）](https://dataxapi.com/zh/answers/kuaishou-photo-set-vs-video.md)
- [怎么批量查账号和评论的 IP 属地？8 个平台 28 个接口逐项对照（2026）](https://dataxapi.com/zh/answers/ip-location-by-platform.md)
- [快手达人怎么找？按粉丝数排、只看认证或正在直播的账号、按性别筛（2026）](https://dataxapi.com/zh/answers/kuaishou-find-creators.md)

---

怎么调用、怎么计费、怎么处理报错，所有接口都一样：https://dataxapi.com/zh/llms.txt

最后核对于 2026-11-20 07:17 UTC。目录修订号 720fc3ea8dadb865。 [网页版](https://dataxapi.com/zh/apis/kuaishou/)
