# Instagram API

8 个接口读 Instagram：帖子、话题、用户、评论。一次 $0.0020 起。不用登录 Instagram，不用 Cookie；失败不收费。

## Instagram 的 8 个接口，各取什么

- [Instagram 评论回复](https://dataxapi.com/zh/apis/instagram/comments/replies/list.md)：按评论编号和它所在的帖子短码取一页回复：正文、回复者、发布时间。
- [Instagram 话题帖子](https://dataxapi.com/zh/apis/instagram/hashtags/posts/list.md)：按话题名取一页带这个话题的最新 Instagram 帖子，每页约 33 条：文案、作者编号、点赞评论数、发布时间、图片。
- [Instagram 帖子评论](https://dataxapi.com/zh/apis/instagram/posts/comments/list.md)：按帖子短码或链接取一页 Instagram 评论，每页约 15 条，最新在前：正文、评论者、点赞数、发布时间。
- [Instagram 帖子详情](https://dataxapi.com/zh/apis/instagram/posts/get.md)：按帖子短码或链接取一条 Instagram 帖子或 Reel：文案、作者、点赞评论播放数、图片和视频地址，联名帖的其他作者。
- [Instagram 视频字幕](https://dataxapi.com/zh/apis/instagram/posts/transcript/get.md)：按帖子短码或链接取 Instagram Reel 或视频帖里说的话，全文；只支持两分钟以内的视频。
- [Instagram 用户资料](https://dataxapi.com/zh/apis/instagram/users/get.md)：按账号名取 Instagram 用户资料：显示名、简介、粉丝数、关注数、是否认证、是否私密，主页上的网站和链接。
- [Instagram 用户帖子](https://dataxapi.com/zh/apis/instagram/users/posts/list.md)：按账号名取一页 Instagram 用户发布的帖子，每页 12 条，可只要 Reels：文案、点赞评论播放数、发布时间、图片和视频地址，联名帖的其他作者。
- [Instagram 用户搜索](https://dataxapi.com/zh/apis/instagram/users/search.md)：按关键词搜索 Instagram 账号，一次约 50 个，不翻页：账号名、显示名、头像、是否认证、是否私密。

## 接口

### 帖子 (3)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [Instagram 帖子详情](https://dataxapi.com/zh/apis/instagram/posts/get.md) | `GET /v1/instagram/posts/get` | 内容 | $0.0020 / 次 |
| [Instagram 视频字幕](https://dataxapi.com/zh/apis/instagram/posts/transcript/get.md) | `GET /v1/instagram/posts/transcript/get` | 逐字稿 | $0.0020 / 次 |
| [Instagram 帖子评论](https://dataxapi.com/zh/apis/instagram/posts/comments/list.md) | `GET /v1/instagram/posts/comments/list` | 评论列表 | $0.0020 / 次 |

### 话题 (1)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [Instagram 话题帖子](https://dataxapi.com/zh/apis/instagram/hashtags/posts/list.md) | `GET /v1/instagram/hashtags/posts/list` | 内容列表 | $0.0020 / 次 |

### 用户 (3)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [Instagram 用户搜索](https://dataxapi.com/zh/apis/instagram/users/search.md) | `GET /v1/instagram/users/search` | 账号列表 | $0.0040 / 次 |
| [Instagram 用户资料](https://dataxapi.com/zh/apis/instagram/users/get.md) | `GET /v1/instagram/users/get` | 账号 | $0.0020 / 次 |
| [Instagram 用户帖子](https://dataxapi.com/zh/apis/instagram/users/posts/list.md) | `GET /v1/instagram/users/posts/list` | 内容列表 | $0.0020 / 次 |

### 评论 (1)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [Instagram 评论回复](https://dataxapi.com/zh/apis/instagram/comments/replies/list.md) | `GET /v1/instagram/comments/replies/list` | 评论列表 | $0.0020 / 次 |

## 调用前要知道的

- **每页条数**：列表每页 12 到 50 条，各接口不同。5 个列表里有 4 个能翻页：把 `page.next_cursor` 作为 `cursor` 传回，每一页是一次单独的调用。其余只有一页。
- **给不了的字段**：8 个接口里有 8 个填不满它返回的对象。每个接口的页面列出了给不了哪些，每次返回也在 `meta.unavailable` 里再写一遍：缺的字段不会被悄悄写成 0。
- **对象不存在时读起来像空结果**：Instagram 用户帖子：对象不存在和对象下面没有东西分不出来，所以返回空结果而不是 404。

## 调用结果不对时先看这里

- **帖子用短码**：帖子和 Reel 用短码，就是链接里 /p/ 或 /reel/ 后面那一段。取评论回复要带评论编号和这个短码。
- **账号用账号名**：用户资料和用户帖子用不带 @ 的账号名。用户资料不给帖子数。
- **账号名不存在时**：取全部帖子时，不存在的账号名返回空列表；只取 Reels 时返回出错，不扣费。
- **评论的字段少**：评论和回复不带评论者的昵称，也不写在哪条帖子下；回复没有点赞数。
- **转文字限两分钟**：超过两分钟的视频按参数不合法拒绝；没人说话的 Reel 按不存在返回。两种都不扣费。

## 常见问题

### 通过 API 能拿到 Instagram 的哪些数据？

8 个接口：帖子、话题、用户、评论。每个接口的页面写明参数、返回字段，并附一份录制的真实返回。

### 怎么调用 Instagram API？

注册拿一把 Key，放进请求头 `Authorization: Bearer <key>`，按接口的地址发请求，比如 `GET https://api.dataxapi.com/v1/instagram/comments/replies/list`。也可以把 DataXAPI 接进 Claude、Cursor 或 ChatGPT（MCP），用一句话让 AI 去调。注册可免费试用，不用绑卡。

### Instagram 接口的返回给 AI 用，占多少 token？

Instagram 的 8 个接口各取一份录制的真实返回，平台原始 JSON 合计 54.4 万 token，AI 通过 DataXAPI 的 MCP 读到的只有 1.3 万 token，少 98%；直接调接口拿到的 JSON 也少 89%（2026-11-06 统计）。所有平台同一套字段名，用 fields 还能只取你要的字段。

### Instagram API 怎么收费？

按次收费，没有订阅。一次 $0.0020 到 $0.0040，每个接口的页面写明自己的价格。拿到数据才扣费，失败不收。

### 需要 Instagram 账号或 Cookie 吗？

不需要。你只拿一把 DataXAPI 的 Key：不用登录 Instagram，不用 Cookie，也不用养设备。接口只返回公开可见的数据。

### 数据是实时的吗？

每次调用都当场去 Instagram 取，`meta.fetched_at` 写明取到的时间。结果保留 24 小时，带同一个 `Idempotency-Key` 重试不会再扣一次。

### Instagram 改版了怎么办？

调用失败不管什么原因都不扣费。被暂停的接口返回 `capability_paused`，同样不扣费；`GET /v1/catalog/status` 写着现在哪些能用。

---

怎么调用、怎么计费、怎么处理报错，所有接口都一样：https://dataxapi.com/zh/llms.txt

最后核对于 2026-11-20 07:17 UTC。目录修订号 720fc3ea8dadb865。 [网页版](https://dataxapi.com/zh/apis/instagram/)
