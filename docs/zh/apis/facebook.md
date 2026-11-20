# Facebook API

4 个接口读 Facebook：帖子、主页。一次 $0.0020 起。不用登录 Facebook，不用 Cookie；失败不收费。

也叫：脸书、脸谱

## Facebook 的 4 个接口，各取什么

- [Facebook 主页资料](https://dataxapi.com/zh/apis/facebook/pages/get.md)：按主页的账号名、编号或链接取 Facebook 公共主页资料：名称、简介、粉丝数、点赞数、类别、网站、创建日期，以及它在 Meta 广告库里的编号（查它投的广告要用）。
- [Facebook 主页帖子](https://dataxapi.com/zh/apis/facebook/pages/posts/list.md)：按主页的编号、账号名或链接取一页 Facebook 主页发的帖子：正文、发布时间、点赞（全部心情）数、评论数、图片；分享数和播放数用帖子详情取。一页 3 条，可往前翻。
- [Facebook 帖子评论](https://dataxapi.com/zh/apis/facebook/posts/comments/list.md)：按帖子编号取一页 Facebook 帖子或 Reel 下的评论：正文、评论者、心情数、回复数、发布时间。
- [Facebook 帖子详情](https://dataxapi.com/zh/apis/facebook/posts/get.md)：按链接取一条 Facebook 帖子或 Reel：正文、作者、发布时间、点赞（全部心情）数、评论数、分享数、播放数、图片。

## 接口

### 帖子 (2)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [Facebook 帖子详情](https://dataxapi.com/zh/apis/facebook/posts/get.md) | `GET /v1/facebook/posts/get` | 内容 | $0.0020 / 次 |
| [Facebook 帖子评论](https://dataxapi.com/zh/apis/facebook/posts/comments/list.md) | `GET /v1/facebook/posts/comments/list` | 评论列表 | $0.0020 / 次 |

### 主页 (2)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [Facebook 主页资料](https://dataxapi.com/zh/apis/facebook/pages/get.md) | `GET /v1/facebook/pages/get` | 账号 | $0.0020 / 次 |
| [Facebook 主页帖子](https://dataxapi.com/zh/apis/facebook/pages/posts/list.md) | `GET /v1/facebook/pages/posts/list` | 内容列表 | $0.0020 / 次 |

## 调用前要知道的

- **每页条数**：列表每页 3 到 10 条，各接口不同。每个列表都能翻页：把 `page.next_cursor` 作为 `cursor` 传回，每一页是一次单独的调用。
- **给不了的字段**：4 个接口里有 4 个填不满它返回的对象。每个接口的页面列出了给不了哪些，每次返回也在 `meta.unavailable` 里再写一遍：缺的字段不会被悄悄写成 0。

## 调用结果不对时先看这里

- **每页 3 条**：主页帖子每页 3 条，这是平台对未登录访问的限制；更早的用游标往后翻。用主页编号比用账号名快。
- **帖子用链接，评论用编号**：帖子详情用链接（facebook.com/主页/posts/… 或 /reel/…），主页帖子列表返回的链接可以原样传。取评论用帖子的数字编号，从帖子列表或帖子详情里取。
- **分享数和播放数看详情**：主页帖子列表不带分享数和播放数，帖子详情里有；播放数只有视频才有。
- **心情总数和约数**：`metrics.likes` 是所有心情加起来的总数。主页关注人数过千以后，平台只给约数。

## 常见问题

### 通过 API 能拿到 Facebook 的哪些数据？

4 个接口：帖子、主页。每个接口的页面写明参数、返回字段，并附一份录制的真实返回。

### 怎么调用 Facebook API？

注册拿一把 Key，放进请求头 `Authorization: Bearer <key>`，按接口的地址发请求，比如 `GET https://api.dataxapi.com/v1/facebook/pages/get`。也可以把 DataXAPI 接进 Claude、Cursor 或 ChatGPT（MCP），用一句话让 AI 去调。注册可免费试用，不用绑卡。

### Facebook 接口的返回给 AI 用，占多少 token？

Facebook 的 4 个接口各取一份录制的真实返回，平台原始 JSON 合计 1.6 万 token，AI 通过 DataXAPI 的 MCP 读到的只有 2,716 token，少 83%；直接调接口拿到的 JSON 也少 58%（2026-11-06 统计）。所有平台同一套字段名，用 fields 还能只取你要的字段。

### Facebook API 怎么收费？

按次收费，没有订阅。4 个接口都是一次 $0.0020。拿到数据才扣费，失败不收。

### 需要 Facebook 账号或 Cookie 吗？

不需要。你只拿一把 DataXAPI 的 Key：不用登录 Facebook，不用 Cookie，也不用养设备。接口只返回公开可见的数据。

### 数据是实时的吗？

每次调用都当场去 Facebook 取，`meta.fetched_at` 写明取到的时间。结果保留 24 小时，带同一个 `Idempotency-Key` 重试不会再扣一次。

### Facebook 改版了怎么办？

调用失败不管什么原因都不扣费。被暂停的接口返回 `capability_paused`，同样不扣费；`GET /v1/catalog/status` 写着现在哪些能用。

## 怎么做和常见问题

- [Meta 广告库 API：按关键词搜广告、查一个 Facebook 主页投的全部广告（2026）](https://dataxapi.com/zh/answers/meta-ad-library-api.md)

---

怎么调用、怎么计费、怎么处理报错，所有接口都一样：https://dataxapi.com/zh/llms.txt

最后核对于 2026-11-20 07:17 UTC。目录修订号 720fc3ea8dadb865。 [网页版](https://dataxapi.com/zh/apis/facebook/)
