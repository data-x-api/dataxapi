# YouTube API

10 个接口读 YouTube：视频、帖子、频道、评论。一次 $0.0020 起。不用登录 YouTube，不用 Cookie；失败不收费。

也叫：油管

## YouTube 的 10 个接口，各取什么

- [YouTube 频道资料](https://dataxapi.com/zh/apis/youtube/channels/get.md)：按频道编号或账号名取 YouTube 频道资料：名称、简介、订阅数、视频数、总播放数、是否认证、创建日期，“关于”里列的链接（官网、其他社交账号）和频道关键词。
- [YouTube 频道搜索](https://dataxapi.com/zh/apis/youtube/channels/search.md)：按搜索词找 YouTube 频道：名称、账号名、简介、订阅数、是否认证。
- [YouTube 频道视频](https://dataxapi.com/zh/apis/youtube/channels/videos/list.md)：按频道编号或账号名取一页该 YouTube 频道的视频或 Shorts，可按最新或最热排：标题、简介、发布时间、播放数、点赞数、时长。
- [YouTube 评论回复](https://dataxapi.com/zh/apis/youtube/comments/replies/list.md)：用评论列表给的回复标识，取一页这条 YouTube 评论下的回复：正文、回复者、点赞数。
- [YouTube 视频评论](https://dataxapi.com/zh/apis/youtube/videos/comments/list.md)：按视频编号或链接取一页 YouTube 评论，可按热门或最新排：正文、评论者、点赞数、回复数，以及取回复用的标识。
- [YouTube 视频详情](https://dataxapi.com/zh/apis/youtube/videos/get.md)：按视频编号或链接取一个 YouTube 视频：标题、简介、频道、发布时间、播放数、点赞数、评论数、时长，作者设的标签、分类、章节。
- [YouTube 视频搜索](https://dataxapi.com/zh/apis/youtube/videos/search.md)：按搜索词找 YouTube 视频，可按相关或播放数排、按发布时间筛：标题、频道、播放数、时长。
- [YouTube 视频字幕](https://dataxapi.com/zh/apis/youtube/videos/transcript/get.md)：按视频编号或链接取 YouTube 视频的字幕全文和带时间的分段，可用 lang 指定字幕语言。
- [YouTube 频道帖子](https://dataxapi.com/zh/apis/youtube/channels/posts/list.md)：按频道编号或账号名取一页该 YouTube 频道“帖子”栏（原“社区”）里的帖子，从最新的开始：正文、图片、点赞数、附带的视频。
- [YouTube 帖子详情](https://dataxapi.com/zh/apis/youtube/posts/get.md)：按帖子编号或链接取一条 YouTube 频道帖子（原“社区”帖）：正文、频道、图片、点赞数、附带的视频。

## 接口

### 视频 (4)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [YouTube 视频搜索](https://dataxapi.com/zh/apis/youtube/videos/search.md) | `GET /v1/youtube/videos/search` | 内容列表 | $0.0020 / 次 |
| [YouTube 视频详情](https://dataxapi.com/zh/apis/youtube/videos/get.md) | `GET /v1/youtube/videos/get` | 内容 | $0.0020 / 次 |
| [YouTube 视频字幕](https://dataxapi.com/zh/apis/youtube/videos/transcript/get.md) | `GET /v1/youtube/videos/transcript/get` | 逐字稿 | $0.0020 / 次 |
| [YouTube 视频评论](https://dataxapi.com/zh/apis/youtube/videos/comments/list.md) | `GET /v1/youtube/videos/comments/list` | 评论列表 | $0.0020 / 次 |

### 帖子 (1)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [YouTube 帖子详情](https://dataxapi.com/zh/apis/youtube/posts/get.md) | `GET /v1/youtube/posts/get` | 内容 | $0.0020 / 次 |

### 频道 (4)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [YouTube 频道搜索](https://dataxapi.com/zh/apis/youtube/channels/search.md) | `GET /v1/youtube/channels/search` | 账号列表 | $0.0020 / 次 |
| [YouTube 频道资料](https://dataxapi.com/zh/apis/youtube/channels/get.md) | `GET /v1/youtube/channels/get` | 账号 | $0.0020 / 次 |
| [YouTube 频道帖子](https://dataxapi.com/zh/apis/youtube/channels/posts/list.md) | `GET /v1/youtube/channels/posts/list` | 内容列表 | $0.0020 / 次 |
| [YouTube 频道视频](https://dataxapi.com/zh/apis/youtube/channels/videos/list.md) | `GET /v1/youtube/channels/videos/list` | 内容列表 | $0.0020 / 次 |

### 评论 (1)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [YouTube 评论回复](https://dataxapi.com/zh/apis/youtube/comments/replies/list.md) | `GET /v1/youtube/comments/replies/list` | 评论列表 | $0.0020 / 次 |

## 调用前要知道的

- **每页条数**：列表每页 10 到 100 条，各接口不同。每个列表都能翻页：把 `page.next_cursor` 作为 `cursor` 传回，每一页是一次单独的调用。
- **给不了的字段**：10 个接口里有 9 个填不满它返回的对象。每个接口的页面列出了给不了哪些，每次返回也在 `meta.unavailable` 里再写一遍：缺的字段不会被悄悄写成 0。
- **对象不存在时读起来像空结果**：YouTube 频道视频、YouTube 评论回复、YouTube 频道帖子：对象不存在和对象下面没有东西分不出来，所以返回空结果而不是 404。

## 调用结果不对时先看这里

- **频道编号或账号名**：频道用编号（UC 开头）或不带 @ 的账号名。取帖子分栏时，不存在的账号名返回 404；不存在的频道编号返回空列表。
- **取回复要用回复标识**：取评论回复用视频评论接口返回的 `ext.replies_token`（完整档才有），不是评论编号；传评论编号会被拒。
- **Shorts 只有一页**：用 `type=short` 取频道的 Shorts，只有一页，没有下一页，每条也不带频道信息。
- **有些数是约数**：订阅数只有三位有效数字，和 YouTube 页面上显示的一样；评论和帖子的点赞数过千就是约数。视频搜索不带点赞数、简介和准确的发布时间。
- **没字幕就没有文字稿**：没有字幕的视频按不存在返回，不扣费。watch、shorts、embed、live、youtu.be 这几种链接都能用。

## 常见问题

### 通过 API 能拿到 YouTube 的哪些数据？

10 个接口：视频、帖子、频道、评论。每个接口的页面写明参数、返回字段，并附一份录制的真实返回。

### 怎么调用 YouTube API？

注册拿一把 Key，放进请求头 `Authorization: Bearer <key>`，按接口的地址发请求，比如 `GET https://api.dataxapi.com/v1/youtube/channels/get`。也可以把 DataXAPI 接进 Claude、Cursor 或 ChatGPT（MCP），用一句话让 AI 去调。注册可免费试用，不用绑卡。

### YouTube 接口的返回给 AI 用，占多少 token？

YouTube 的 10 个接口各取一份录制的真实返回，平台原始 JSON 合计 5.3 万 token，AI 通过 DataXAPI 的 MCP 读到的只有 1.8 万 token，少 66%；直接调接口拿到的 JSON 也少 37%（2026-11-06 统计）。所有平台同一套字段名，用 fields 还能只取你要的字段。

### YouTube API 怎么收费？

按次收费，没有订阅。10 个接口都是一次 $0.0020。拿到数据才扣费，失败不收。

### 需要 YouTube 账号或 Cookie 吗？

不需要。你只拿一把 DataXAPI 的 Key：不用登录 YouTube，不用 Cookie，也不用养设备。接口只返回公开可见的数据。

### 数据是实时的吗？

每次调用都当场去 YouTube 取，`meta.fetched_at` 写明取到的时间。结果保留 24 小时，带同一个 `Idempotency-Key` 重试不会再扣一次。

### YouTube 改版了怎么办？

调用失败不管什么原因都不扣费。被暂停的接口返回 `capability_paused`，同样不扣费；`GET /v1/catalog/status` 写着现在哪些能用。

---

怎么调用、怎么计费、怎么处理报错，所有接口都一样：https://dataxapi.com/zh/llms.txt

最后核对于 2026-11-20 07:17 UTC。目录修订号 720fc3ea8dadb865。 [网页版](https://dataxapi.com/zh/apis/youtube/)
