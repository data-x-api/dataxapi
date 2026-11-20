# Reddit API

11 个接口读 Reddit：帖子、用户、社区、热榜。一次 $0.0020 起。不用登录 Reddit，不用 Cookie；失败不收费。

也叫：红迪

## Reddit 的 11 个接口，各取什么

- [Reddit 帖子评论](https://dataxapi.com/zh/apis/reddit/posts/comments/list.md)：按帖子编号或链接取一页 Reddit 评论：正文、评论者、得分、回复数、发布时间，含前几层回复。
- [Reddit 帖子详情](https://dataxapi.com/zh/apis/reddit/posts/get.md)：按帖子编号或链接取一条 Reddit 帖子：标题、正文、作者、所在社区、得分、评论数。
- [Reddit 帖子搜索](https://dataxapi.com/zh/apis/reddit/posts/search.md)：按搜索词取一页 Reddit 帖子，可按相关、最新或最高分排，可限定发布时间。
- [Reddit 热门帖子](https://dataxapi.com/zh/apis/reddit/posts/trending.md)：取一页 Reddit 全站热门帖子（Popular）：标题、正文、作者、所在社区、得分、评论数。
- [Reddit 社区帖子](https://dataxapi.com/zh/apis/reddit/subreddits/posts/list.md)：按社区名取一页该 Reddit 社区的帖子，可按热门、最新或最高分排。最高分默认是最近一天里的，用 window 可改成最近一周、一个月、一年或历来最高。
- [Reddit 趋势搜索词](https://dataxapi.com/zh/apis/reddit/trends/list.md)：取 Reddit 当天的趋势搜索词，按平台给出的先后排名次。
- [Reddit 用户资料](https://dataxapi.com/zh/apis/reddit/users/get.md)：按用户名取 Reddit 用户的公开资料：显示名、简介、注册时间、Karma、发帖数和评论数。
- [Reddit 用户帖子](https://dataxapi.com/zh/apis/reddit/users/posts/list.md)：按用户名取一页该 Reddit 用户发布的帖子，从最新的开始。
- [Reddit 社区资料](https://dataxapi.com/zh/apis/reddit/subreddits/get.md)：按社区名取 Reddit 社区的资料：简介、成员数、最近一周的活跃用户数和发帖评论数、创建时间。
- [Reddit 用户活跃社区](https://dataxapi.com/zh/apis/reddit/users/subreddits/list.md)：按用户名取这个 Reddit 用户活跃的社区：社区名、成员数、图标，一次给全（录到过一次 215 个）。
- [Reddit 视频字幕](https://dataxapi.com/zh/apis/reddit/posts/transcript/get.md)：按帖子编号或链接取 Reddit 帖子里的视频说的话：平台为它自己托管的视频生成的字幕，全文和带时间的分段。

## 接口

### 帖子 (5)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [Reddit 帖子搜索](https://dataxapi.com/zh/apis/reddit/posts/search.md) | `GET /v1/reddit/posts/search` | 内容列表 | $0.0020 / 次 |
| [Reddit 帖子详情](https://dataxapi.com/zh/apis/reddit/posts/get.md) | `GET /v1/reddit/posts/get` | 内容 | $0.0020 / 次 |
| [Reddit 视频字幕](https://dataxapi.com/zh/apis/reddit/posts/transcript/get.md) | `GET /v1/reddit/posts/transcript/get` | 逐字稿 | $0.0020 / 次 |
| [Reddit 帖子评论](https://dataxapi.com/zh/apis/reddit/posts/comments/list.md) | `GET /v1/reddit/posts/comments/list` | 评论列表 | $0.0020 / 次 |
| [Reddit 热门帖子](https://dataxapi.com/zh/apis/reddit/posts/trending.md) | `GET /v1/reddit/posts/trending` | 内容列表 | $0.0020 / 次 |

### 用户 (3)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [Reddit 用户资料](https://dataxapi.com/zh/apis/reddit/users/get.md) | `GET /v1/reddit/users/get` | 账号 | $0.0020 / 次 |
| [Reddit 用户帖子](https://dataxapi.com/zh/apis/reddit/users/posts/list.md) | `GET /v1/reddit/users/posts/list` | 内容列表 | $0.0020 / 次 |
| [Reddit 用户活跃社区](https://dataxapi.com/zh/apis/reddit/users/subreddits/list.md) | `GET /v1/reddit/users/subreddits/list` | 社区列表 | $0.0020 / 次 |

### 社区 (2)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [Reddit 社区资料](https://dataxapi.com/zh/apis/reddit/subreddits/get.md) | `GET /v1/reddit/subreddits/get` | 社区 | $0.0020 / 次 |
| [Reddit 社区帖子](https://dataxapi.com/zh/apis/reddit/subreddits/posts/list.md) | `GET /v1/reddit/subreddits/posts/list` | 内容列表 | $0.0020 / 次 |

### 热榜 (1)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [Reddit 趋势搜索词](https://dataxapi.com/zh/apis/reddit/trends/list.md) | `GET /v1/reddit/trends/list` | 热点列表 | $0.0020 / 次 |

## 调用前要知道的

- **每页条数**：列表每页 6 到 500 条，各接口不同。7 个列表里有 5 个能翻页：把 `page.next_cursor` 作为 `cursor` 传回，每一页是一次单独的调用。其余只有一页。
- **给不了的字段**：11 个接口里有 9 个填不满它返回的对象。每个接口的页面列出了给不了哪些，每次返回也在 `meta.unavailable` 里再写一遍：缺的字段不会被悄悄写成 0。
- **对象不存在时读起来像空结果**：Reddit 社区帖子：对象不存在和对象下面没有东西分不出来，所以返回空结果而不是 404。
- **预览结构**：有 2 个接口返回的是预览结构，字段还可能调整；其余返回统一的结构，所有平台都一样。
- **快照**：Reddit 趋势搜索词：榜单是每 10 分钟刷新一次的快照，`meta.fetched_at` 写明是什么时候取的。

## 调用结果不对时先看这里

- **帖子编号带 t3_**：帖子编号要带 t3_ 前缀，也可以直接传帖子链接（reddit.com/r/社区/comments/编号/）。
- **评论一页页取**：一页是几条一级评论，连着它们的前几层回复；游标取的是下一批一级评论。Reddit 折叠起来的更深的回复不展开。
- **还没公开的分数**：Reddit 还在隐藏分数的评论，分数返回 null，不是 1。
- **社区和用户都用名字**：社区用不带 r/ 的社区名，用户用不带 u/ 的用户名。不存在的社区取帖子返回空列表。
- **只有 Reddit 托管的视频**：只有 Reddit 自己托管并生成了字幕的视频才有文字稿。从别的网站嵌入的视频、没有字幕的视频，都按不存在返回，不扣费。

## 常见问题

### 通过 API 能拿到 Reddit 的哪些数据？

11 个接口：帖子、用户、社区、热榜。每个接口的页面写明参数、返回字段，并附一份录制的真实返回。

### 怎么调用 Reddit API？

注册拿一把 Key，放进请求头 `Authorization: Bearer <key>`，按接口的地址发请求，比如 `GET https://api.dataxapi.com/v1/reddit/posts/comments/list`。也可以把 DataXAPI 接进 Claude、Cursor 或 ChatGPT（MCP），用一句话让 AI 去调。注册可免费试用，不用绑卡。

### Reddit 接口的返回给 AI 用，占多少 token？

Reddit 的 11 个接口各取一份录制的真实返回，平台原始 JSON 合计 16.9 万 token，AI 通过 DataXAPI 的 MCP 读到的只有 1.4 万 token，少 92%；直接调接口拿到的 JSON 也少 84%（2026-11-06 统计）。所有平台同一套字段名，用 fields 还能只取你要的字段。

### Reddit API 怎么收费？

按次收费，没有订阅。11 个接口都是一次 $0.0020。拿到数据才扣费，失败不收。

### 需要 Reddit 账号或 Cookie 吗？

不需要。你只拿一把 DataXAPI 的 Key：不用登录 Reddit，不用 Cookie，也不用养设备。接口只返回公开可见的数据。

### 数据是实时的吗？

每次调用都当场去 Reddit 取，`meta.fetched_at` 写明取到的时间。Reddit 趋势搜索词：榜单是每 10 分钟刷新一次的快照。结果保留 24 小时，带同一个 `Idempotency-Key` 重试不会再扣一次。

### Reddit 改版了怎么办？

调用失败不管什么原因都不扣费。被暂停的接口返回 `capability_paused`，同样不扣费；`GET /v1/catalog/status` 写着现在哪些能用。

## 怎么做和常见问题

- [GummySearch 12 月 1 日彻底关停，Reddit 研究用什么替代（2026）](https://dataxapi.com/zh/answers/gummysearch-alternative-reddit.md)
- [怎么用 API 取一个 Reddit 社区历来或今年最高分的帖子？（2026）](https://dataxapi.com/zh/answers/reddit-top-posts-all-time.md)

---

怎么调用、怎么计费、怎么处理报错，所有接口都一样：https://dataxapi.com/zh/llms.txt

最后核对于 2026-11-20 07:17 UTC。目录修订号 720fc3ea8dadb865。 [网页版](https://dataxapi.com/zh/apis/reddit/)
