# Threads API

4 个接口读 Threads：帖子、用户。一次 $0.0020 起。不用登录 Threads，不用 Cookie；失败不收费。

## Threads 的 4 个接口，各取什么

- [Threads 帖子详情](https://dataxapi.com/zh/apis/threads/posts/get.md)：按帖子代码或链接取一条 Threads 帖子：正文、作者、发布时间、点赞、回复、转发、图片。
- [Threads 帖子搜索](https://dataxapi.com/zh/apis/threads/posts/search.md)：按搜索词找 Threads 帖子：正文、作者、发布时间、点赞、回复、转发；可限定发布日期。只有一页结果。
- [Threads 用户资料](https://dataxapi.com/zh/apis/threads/users/get.md)：按账号名取 Threads 用户资料：显示名、简介、粉丝数、是否认证、头像。
- [Threads 用户帖子](https://dataxapi.com/zh/apis/threads/users/posts/list.md)：按账号名取一个 Threads 用户最近发的帖子：正文、发布时间、点赞、回复、转发、图片。只有最近的一页，不能往前翻。

## 接口

### 帖子 (2)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [Threads 帖子搜索](https://dataxapi.com/zh/apis/threads/posts/search.md) | `GET /v1/threads/posts/search` | 内容列表 | $0.0020 / 次 |
| [Threads 帖子详情](https://dataxapi.com/zh/apis/threads/posts/get.md) | `GET /v1/threads/posts/get` | 内容 | $0.0020 / 次 |

### 用户 (2)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [Threads 用户资料](https://dataxapi.com/zh/apis/threads/users/get.md) | `GET /v1/threads/users/get` | 账号 | $0.0020 / 次 |
| [Threads 用户帖子](https://dataxapi.com/zh/apis/threads/users/posts/list.md) | `GET /v1/threads/users/posts/list` | 内容列表 | $0.0020 / 次 |

## 调用前要知道的

- **每页条数**：列表每页 15 到 30 条，各接口不同。每个列表只有一页，没有下一页可取。
- **给不了的字段**：4 个接口里有 4 个填不满它返回的对象。每个接口的页面列出了给不了哪些，每次返回也在 `meta.unavailable` 里再写一遍：缺的字段不会被悄悄写成 0。

## 调用结果不对时先看这里

- **帖子代码**：帖子用链接最后那一段代码：threads.com/@账号名/post/代码 或 threads.com/t/代码。
- **只有一页**：搜索和用户帖子都只返回一页：平台对未登录的访问只给这么多。
- **日期按 UTC 算**：`since` 和 `until` 按 UTC 日期筛，不看几点几分。
- **不存在和不公开分不清**：不存在的和不公开的帖子、账号，得到的是同一个结果：按不存在返回，不扣费。
- **没有收藏数，浏览数也少**：帖子都不带收藏数；搜索结果和用户帖子也不带浏览数。

## 常见问题

### 通过 API 能拿到 Threads 的哪些数据？

4 个接口：帖子、用户。每个接口的页面写明参数、返回字段，并附一份录制的真实返回。

### 怎么调用 Threads API？

注册拿一把 Key，放进请求头 `Authorization: Bearer <key>`，按接口的地址发请求，比如 `GET https://api.dataxapi.com/v1/threads/posts/get`。也可以把 DataXAPI 接进 Claude、Cursor 或 ChatGPT（MCP），用一句话让 AI 去调。注册可免费试用，不用绑卡。

### Threads 接口的返回给 AI 用，占多少 token？

Threads 的 4 个接口各取一份录制的真实返回，平台原始 JSON 合计 35 万 token，AI 通过 DataXAPI 的 MCP 读到的只有 5,186 token，少 99%；直接调接口拿到的 JSON 也少 92%（2026-11-06 统计）。所有平台同一套字段名，用 fields 还能只取你要的字段。

### Threads API 怎么收费？

按次收费，没有订阅。4 个接口都是一次 $0.0020。拿到数据才扣费，失败不收。

### 需要 Threads 账号或 Cookie 吗？

不需要。你只拿一把 DataXAPI 的 Key：不用登录 Threads，不用 Cookie，也不用养设备。接口只返回公开可见的数据。

### 数据是实时的吗？

每次调用都当场去 Threads 取，`meta.fetched_at` 写明取到的时间。结果保留 24 小时，带同一个 `Idempotency-Key` 重试不会再扣一次。

### Threads 改版了怎么办？

调用失败不管什么原因都不扣费。被暂停的接口返回 `capability_paused`，同样不扣费；`GET /v1/catalog/status` 写着现在哪些能用。

---

怎么调用、怎么计费、怎么处理报错，所有接口都一样：https://dataxapi.com/zh/llms.txt

最后核对于 2026-11-20 07:17 UTC。目录修订号 720fc3ea8dadb865。 [网页版](https://dataxapi.com/zh/apis/threads/)
