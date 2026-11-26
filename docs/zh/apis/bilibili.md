# B站 API

11 个接口读 B站：视频、用户、评论、热榜。一次 $0.0020 起。不用登录 B站，不用 Cookie；失败不收费。

也叫：Bilibili、哔哩哔哩、小破站

## B站的 11 个接口，各取什么

- [B站评论回复](https://dataxapi.com/zh/apis/bilibili/comments/replies/list.md)：按评论编号和它所在视频的 BV 号取一页回复：正文、回复者、点赞数、回复的是哪一条、发布时间。
- [B站热搜榜](https://dataxapi.com/zh/apis/bilibili/trends/list.md)：取 B 站当前的热搜词榜，最多 50 个词，带名次、热度和榜单上显示的那句话。
- [B站用户资料](https://dataxapi.com/zh/apis/bilibili/users/get.md)：按用户编号取 B 站用户资料：昵称、签名、头像、是否认证和认证说明、粉丝数、关注数、投稿视频数、累计获赞、账号等级、直播间链接。
- [B站用户投稿](https://dataxapi.com/zh/apis/bilibili/users/videos/list.md)：按用户编号取一页 B 站用户投稿的视频，新的在前：标题、简介、播放数、评论数、弹幕数、时长、发布时间。
- [B站视频评论](https://dataxapi.com/zh/apis/bilibili/videos/comments/list.md)：按 BV 号取一页 B 站视频评论，可按热门或最新排：正文、评论者和他的等级、点赞数、回复数、发布时间。
- [B站视频详情](https://dataxapi.com/zh/apis/bilibili/videos/get.md)：按 BV 号或链接取一个 B 站视频：标题、简介、UP 主、播放、点赞、投币、收藏、弹幕数、时长、标签、分区、IP 属地，以及取字幕和弹幕要用的 cid。
- [B站视频转文字（文案提取、逐字稿）](https://dataxapi.com/zh/apis/bilibili/videos/transcript/get.md)：给一个 B 站视频的链接或 BV 号，返回视频里说的话：全文、每一句的起止时间和现成的 SRT 字幕，连同标题、UP 主和时长；可以区分说话人。多 P 视频转第一 P。每次收费，识别语音的另按视频分钟数收，没人说话不收。5 分钟以内的视频直接返回文字；超过 5 分钟、2 小时以内的先回一个凭证（job），过一会儿带着它再调这个接口取文字，按实际分钟数收，只在取到文字时收。
- [B站视频搜索](https://dataxapi.com/zh/apis/bilibili/videos/search.md)：按搜索词取一页 B 站视频，可按相关度、最新或播放最多排：标题、UP 主、播放、点赞、收藏、评论数、时长。
- [B站综合热门](https://dataxapi.com/zh/apis/bilibili/videos/trending.md)：取一页 B 站综合热门视频：标题、简介、UP 主、播放、点赞、投币、收藏、弹幕数、时长、分区、IP 属地、推荐理由。
- [B 站视频和音频下载地址](https://dataxapi.com/zh/apis/bilibili/videos/media/get.md)：给一个 B 站视频的 BV 号或链接，返回视频的各档清晰度和音频的各档音质，分开给（带宽高、编码、码率、备用地址和过期时间）；每个地址都要带请求头 Referer: https://www.bilibili.com 去取，音视频用 ffmpeg 合成一个文件，过期了再调一次即可。
- [B站用户投稿（备用版）](https://dataxapi.com/zh/apis/bilibili/backup/users/videos/list.md)：B站用户投稿的备用版，原接口取不到时改调：参数和返回相同（不含简介和评论数），价格更高。

## 接口

### 备用版 (1)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [B站用户投稿（备用版）](https://dataxapi.com/zh/apis/bilibili/backup/users/videos/list.md) | `GET /v1/bilibili/backup/users/videos/list` | 内容列表 | $0.0300 / 次 |

### 视频 (6)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [B站视频搜索](https://dataxapi.com/zh/apis/bilibili/videos/search.md) | `GET /v1/bilibili/videos/search` | 内容列表 | $0.0020 / 次 |
| [B站视频详情](https://dataxapi.com/zh/apis/bilibili/videos/get.md) | `GET /v1/bilibili/videos/get` | 内容 | $0.0020 / 次 |
| [B 站视频和音频下载地址](https://dataxapi.com/zh/apis/bilibili/videos/media/get.md) | `GET /v1/bilibili/videos/media/get` | 视频和图片文件 | $0.0020 / 次 |
| [B站视频转文字（文案提取、逐字稿）](https://dataxapi.com/zh/apis/bilibili/videos/transcript/get.md) | `GET /v1/bilibili/videos/transcript/get` | 逐字稿 | $0.0040 / 次 |
| [B站视频评论](https://dataxapi.com/zh/apis/bilibili/videos/comments/list.md) | `GET /v1/bilibili/videos/comments/list` | 评论列表 | $0.0020 / 次 |
| [B站综合热门](https://dataxapi.com/zh/apis/bilibili/videos/trending.md) | `GET /v1/bilibili/videos/trending` | 内容列表 | $0.0020 / 次 |

### 用户 (2)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [B站用户资料](https://dataxapi.com/zh/apis/bilibili/users/get.md) | `GET /v1/bilibili/users/get` | 账号 | $0.0020 / 次 |
| [B站用户投稿](https://dataxapi.com/zh/apis/bilibili/users/videos/list.md) | `GET /v1/bilibili/users/videos/list` | 内容列表 | $0.0020 / 次 |

### 评论 (1)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [B站评论回复](https://dataxapi.com/zh/apis/bilibili/comments/replies/list.md) | `GET /v1/bilibili/comments/replies/list` | 评论列表 | $0.0020 / 次 |

### 热榜 (1)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [B站热搜榜](https://dataxapi.com/zh/apis/bilibili/trends/list.md) | `GET /v1/bilibili/trends/list` | 热点列表 | $0.0020 / 次 |

## 调用前要知道的

- **每页条数**：列表每页 20 到 50 条，各接口不同。7 个列表里有 6 个能翻页：把 `page.next_cursor` 作为 `cursor` 传回，每一页是一次单独的调用。其余只有一页。
- **给不了的字段**：11 个接口里有 11 个填不满它返回的对象。每个接口的页面列出了给不了哪些，每次返回也在 `meta.unavailable` 里再写一遍：缺的字段不会被悄悄写成 0。
- **对象不存在时读起来像空结果**：B站用户投稿、B站用户投稿（备用版）：对象不存在和对象下面没有东西分不出来，所以返回空结果而不是 404。
- **快照**：B站热搜榜、B站综合热门：榜单是每 10 分钟刷新一次的快照，`meta.fetched_at` 写明是什么时候取的。

## 调用结果不对时先看这里

- **BV 号**：视频用 BV 号（BV1 开头，共 12 位），或者视频页链接（bilibili.com/video/BV…）；App 复制出来的 b23.tv 短链也收。
- **用户编号 mid**：用户用空间链接 space.bilibili.com/ 后面那串数字。
- **取回复要两个编号**：取评论回复要带评论编号和视频的 BV 号，评论列表返回的 `id` 和 `post_id` 就是这两个。
- **投稿列表的数不全**：用户投稿列表只有播放、评论和弹幕数，没有点赞、投币、收藏和分享；这些要看视频详情。
- **空结果不等于不存在**：不存在的用户编号取投稿，返回空列表。

## 常见问题

### B站有官方 API 吗？

有。B 站开放平台列出的权限是 USER_INFO、USER_DATA、ARC_BASE、ARC_DATA、ATC_DATA 和 LIVE_ROOM_DATA，对应授权用户自己的资料、数据、视频、专栏和直播间，其中没有搜索。

### 通过 API 能拿到 B站的哪些数据？

11 个接口：视频、用户、评论、热榜。每个接口的页面写明参数、返回字段，并附一份录制的真实返回。

### 怎么调用 B站 API？

注册拿一把 Key，放进请求头 `Authorization: Bearer <key>`，按接口的地址发请求，比如 `GET https://api.dataxapi.com/v1/bilibili/comments/replies/list`。也可以把 DataXAPI 接进 Claude、Cursor 或 ChatGPT（MCP），用一句话让 AI 去调。注册可免费试用，不用绑卡。

### B站接口的返回给 AI 用，占多少 token？

B站的 9 个接口各取一份录制的真实返回，平台原始 JSON 合计 47.7 万 token，AI 通过 DataXAPI 的 MCP 读到的只有 2.1 万 token，少 96%；直接调接口拿到的 JSON 也少 95%（2026-11-06 统计）。所有平台同一套字段名，用 fields 还能只取你要的字段。

### B站 API 怎么收费？

按次收费，没有订阅。一次 $0.0020 到 $0.0300，每个接口的页面写明自己的价格。拿到数据才扣费，失败不收。

### 需要 B站账号或 Cookie 吗？

不需要。你只拿一把 DataXAPI 的 Key：不用登录 B站，不用 Cookie，也不用养设备。接口只返回公开可见的数据。

### 数据是实时的吗？

每次调用都当场去 B站取，`meta.fetched_at` 写明取到的时间。B站热搜榜、B站综合热门：榜单是每 10 分钟刷新一次的快照。结果保留 24 小时，带同一个 `Idempotency-Key` 重试不会再扣一次。

### B站改版了怎么办？

调用失败不管什么原因都不扣费。被暂停的接口返回 `capability_paused`，同样不扣费；`GET /v1/catalog/status` 写着现在哪些能用。

## 怎么做和常见问题

- [B站有 API 吗？用 Python 拉取视频和评论（2026）](https://dataxapi.com/zh/guides/bilibili-api-python.md)
- [B 站 412 和 wbi 是什么（2026）](https://dataxapi.com/zh/answers/bilibili-412-wbi.md)
- [B 站评论怎么批量导出（2026）](https://dataxapi.com/zh/answers/export-bilibili-comments.md)
- [怎么让 AI 读知乎、B 站、微博（2026）](https://dataxapi.com/zh/answers/ai-read-zhihu-bilibili-weibo.md)
- [B 站 -352 风控校验失败是什么意思（2026）](https://dataxapi.com/zh/answers/bilibili-352-risk-control.md)
- [B 站 API 校验密匙错误（-3）是什么意思（2026）](https://dataxapi.com/zh/answers/bilibili-api-key-error-minus-3.md)
- [B站 API 有哪些？视频、评论、UP 主数据怎么取（2026）](https://dataxapi.com/zh/answers/bilibili-data-apis.md)
- [有没有能让 Claude 查小红书、抖音、公众号的 MCP？（2026）](https://dataxapi.com/zh/answers/china-social-data-mcp.md)
- [B站 MCP：在 Claude、Cursor 里查 B站视频和评论（2026）](https://dataxapi.com/zh/answers/bilibili-mcp.md)
- [一个 Key 调小红书、抖音、公众号：社媒数据 API 聚合怎么选（2026）](https://dataxapi.com/zh/answers/one-key-china-social-data-api.md)
- [热榜 API：抖音热搜、微博热搜、知乎热榜、B站热门怎么用程序取（2026）](https://dataxapi.com/zh/answers/china-trending-api.md)
- [舆情监控 API 有哪些？一个关键词同时查微博、抖音、小红书等平台（2026）](https://dataxapi.com/zh/answers/social-listening-api-china.md)
- [B站 BV 号、av 号、mid 是什么？怎么从链接里拿（2026）](https://dataxapi.com/zh/answers/bilibili-bv-aid-mid.md)
- [社媒数据接口常见问题：按平台说清能取什么、不能取什么（2026）](https://dataxapi.com/zh/answers/social-media-data-api-faq.md)
- [社媒数据接口给 AI 用要多少 token？每个接口逐个实测（2026）](https://dataxapi.com/zh/answers/social-media-api-token-benchmark.md)
- [给 AI 和 agent 用的B站数据接口：返回省 token、Claude 和 Cursor 直接调（2026）](https://dataxapi.com/zh/answers/bilibili-api-for-ai-agents.md)
- [B 站视频评论怎么按最新时间取？（2026）](https://dataxapi.com/zh/answers/bilibili-comments-newest-first.md)
- [怎么批量查账号和评论的 IP 属地？8 个平台 28 个接口逐项对照（2026）](https://dataxapi.com/zh/answers/ip-location-by-platform.md)

---

怎么调用、怎么计费、怎么处理报错，所有接口都一样：https://dataxapi.com/zh/llms.txt

最后核对于 2026-11-26 12:17 UTC。目录修订号 0051cce45e9530b9。 [网页版](https://dataxapi.com/zh/apis/bilibili/)
