# 知乎 API

16 个接口读知乎：帖子、文章、想法、问题、回答、用户、专栏、评论。一次 $0.0020 起。不用登录知乎，不用 Cookie；失败不收费。

也叫：Zhihu、知乎问答、知乎网

## 知乎的 16 个接口，各取什么

- [知乎回答评论](https://dataxapi.com/zh/apis/zhihu/answers/comments/list.md)：按回答编号取一页知乎评论：正文、评论者、点赞数、回复数、发布时间、IP 属地。
- [知乎回答详情](https://dataxapi.com/zh/apis/zhihu/answers/get.md)：按回答编号或链接取一条知乎回答：所属问题、正文、作者、发布时间。
- [知乎文章详情](https://dataxapi.com/zh/apis/zhihu/articles/get.md)：按文章编号或链接取一篇知乎专栏文章：标题、正文、作者、赞同数、评论数、话题。
- [知乎专栏文章列表](https://dataxapi.com/zh/apis/zhihu/columns/articles/list.md)：按专栏编号取一页知乎专栏里的文章：标题、正文、作者、发布时间、赞同数、评论数。
- [知乎评论回复](https://dataxapi.com/zh/apis/zhihu/comments/replies/list.md)：按一级评论的编号取一页它下面的回复：正文、回复者、点赞数、回复的是哪一条、IP 属地。
- [知乎想法详情](https://dataxapi.com/zh/apis/zhihu/pins/get.md)：按想法编号或链接取一条知乎想法：正文、图片、作者、发布时间、点赞、评论、收藏、转发数。
- [知乎内容搜索](https://dataxapi.com/zh/apis/zhihu/posts/search.md)：按搜索词取一页知乎的回答和文章，可只要其中一种，可按相关、最新或最多赞同排。
- [知乎问题回答](https://dataxapi.com/zh/apis/zhihu/questions/answers/list.md)：按问题编号或链接取该知乎问题下排在最前的 20 条回答：正文、作者、赞同数、评论数、收藏数；不翻页。
- [知乎问题详情](https://dataxapi.com/zh/apis/zhihu/questions/get.md)：按问题编号或链接取一个知乎问题：标题、补充说明、提问时间、回答数、关注数、浏览数。
- [知乎热榜](https://dataxapi.com/zh/apis/zhihu/trends/list.md)：取知乎热榜：上榜的问题、名次、热度（约数）、回答数、关注数、提问时间、摘要和配图；编号可直接用来取问题详情。
- [知乎用户回答](https://dataxapi.com/zh/apis/zhihu/users/answers/list.md)：按主页地址里的用户名取一页该知乎用户写的回答，从最新的开始。
- [知乎用户文章](https://dataxapi.com/zh/apis/zhihu/users/articles/list.md)：按主页地址里的用户名取一页该知乎用户写的专栏文章，从最新的开始。
- [知乎用户粉丝列表](https://dataxapi.com/zh/apis/zhihu/users/followers/list.md)：按主页地址里的用户名取一页关注该知乎用户的账号，每页 20 个：显示名、一句话介绍、头像、是不是机构号、粉丝数、回答数、文章数。
- [知乎用户资料](https://dataxapi.com/zh/apis/zhihu/users/get.md)：按主页地址里的用户名取知乎用户资料：显示名、一句话介绍、是否认证、是不是机构号、粉丝数、回答数、文章数、IP 属地。
- [知乎用户想法](https://dataxapi.com/zh/apis/zhihu/users/pins/list.md)：按主页地址里的用户名取一页该知乎用户发的想法，从最新的开始：正文、图片、发布时间、点赞、评论、收藏、转发数。
- [知乎用户搜索](https://dataxapi.com/zh/apis/zhihu/users/search.md)：按搜索词取一页知乎用户：显示名、是否认证、是不是机构号、粉丝数、回答数、文章数、获得的赞同数、最近一次发内容的时间。一句话介绍要看用户资料。

## 接口

### 帖子 (1)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [知乎内容搜索](https://dataxapi.com/zh/apis/zhihu/posts/search.md) | `GET /v1/zhihu/posts/search` | 内容列表 | $0.0020 / 次 |

### 文章 (1)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [知乎文章详情](https://dataxapi.com/zh/apis/zhihu/articles/get.md) | `GET /v1/zhihu/articles/get` | 内容 | $0.0020 / 次 |

### 想法 (1)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [知乎想法详情](https://dataxapi.com/zh/apis/zhihu/pins/get.md) | `GET /v1/zhihu/pins/get` | 内容 | $0.0020 / 次 |

### 问题 (2)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [知乎问题详情](https://dataxapi.com/zh/apis/zhihu/questions/get.md) | `GET /v1/zhihu/questions/get` | 内容 | $0.0020 / 次 |
| [知乎问题回答](https://dataxapi.com/zh/apis/zhihu/questions/answers/list.md) | `GET /v1/zhihu/questions/answers/list` | 内容列表 | $0.0020 / 次 |

### 回答 (2)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [知乎回答详情](https://dataxapi.com/zh/apis/zhihu/answers/get.md) | `GET /v1/zhihu/answers/get` | 内容 | $0.0020 / 次 |
| [知乎回答评论](https://dataxapi.com/zh/apis/zhihu/answers/comments/list.md) | `GET /v1/zhihu/answers/comments/list` | 评论列表 | $0.0020 / 次 |

### 用户 (6)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [知乎用户搜索](https://dataxapi.com/zh/apis/zhihu/users/search.md) | `GET /v1/zhihu/users/search` | 账号列表 | $0.0020 / 次 |
| [知乎用户资料](https://dataxapi.com/zh/apis/zhihu/users/get.md) | `GET /v1/zhihu/users/get` | 账号 | $0.0020 / 次 |
| [知乎用户回答](https://dataxapi.com/zh/apis/zhihu/users/answers/list.md) | `GET /v1/zhihu/users/answers/list` | 内容列表 | $0.0020 / 次 |
| [知乎用户文章](https://dataxapi.com/zh/apis/zhihu/users/articles/list.md) | `GET /v1/zhihu/users/articles/list` | 内容列表 | $0.0020 / 次 |
| [知乎用户粉丝列表](https://dataxapi.com/zh/apis/zhihu/users/followers/list.md) | `GET /v1/zhihu/users/followers/list` | 账号列表 | $0.0020 / 次 |
| [知乎用户想法](https://dataxapi.com/zh/apis/zhihu/users/pins/list.md) | `GET /v1/zhihu/users/pins/list` | 内容列表 | $0.0020 / 次 |

### 专栏 (1)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [知乎专栏文章列表](https://dataxapi.com/zh/apis/zhihu/columns/articles/list.md) | `GET /v1/zhihu/columns/articles/list` | 内容列表 | $0.0020 / 次 |

### 评论 (1)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [知乎评论回复](https://dataxapi.com/zh/apis/zhihu/comments/replies/list.md) | `GET /v1/zhihu/comments/replies/list` | 评论列表 | $0.0020 / 次 |

### 热榜 (1)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [知乎热榜](https://dataxapi.com/zh/apis/zhihu/trends/list.md) | `GET /v1/zhihu/trends/list` | 热点列表 | $0.0020 / 次 |

## 调用前要知道的

- **每页条数**：列表每页 10 到 50 条，各接口不同。11 个列表里有 9 个能翻页：把 `page.next_cursor` 作为 `cursor` 传回，每一页是一次单独的调用。其余只有一页。
- **给不了的字段**：16 个接口里有 15 个填不满它返回的对象。每个接口的页面列出了给不了哪些，每次返回也在 `meta.unavailable` 里再写一遍：缺的字段不会被悄悄写成 0。
- **对象不存在时读起来像空结果**：知乎回答评论：对象不存在和对象下面没有东西分不出来，所以返回空结果而不是 404。
- **快照**：知乎热榜：榜单是每 10 分钟刷新一次的快照，`meta.fetched_at` 写明是什么时候取的。

## 调用结果不对时先看这里

- **用户用 url_token**：用户用主页地址里的用户名（url_token），比如 zhihuadmin，不是数字编号。
- **问题回答只取前 20 条**：问题下的回答按知乎自己的顺序只给前 20 条，没有下一页。
- **回答详情不带数**：单独取一条回答，不带任何数。问题的回答列表和用户的回答列表里有赞同数和评论数。
- **专栏编号**：专栏编号是专栏地址的最后一段：zhuanlan.zhihu.com/ 后面的词，或者 c_ 开头的那一串。
- **热度是约数**：热榜的热度平台写成“多少万热度”，这里换成那个数乘 10,000，标为约数。榜上每条的编号就是问题编号。

## 常见问题

### 通过 API 能拿到知乎的哪些数据？

16 个接口：帖子、文章、想法、问题、回答、用户、专栏、评论。每个接口的页面写明参数、返回字段，并附一份录制的真实返回。

### 怎么调用知乎 API？

注册拿一把 Key，放进请求头 `Authorization: Bearer <key>`，按接口的地址发请求，比如 `GET https://api.dataxapi.com/v1/zhihu/answers/comments/list`。也可以把 DataXAPI 接进 Claude、Cursor 或 ChatGPT（MCP），用一句话让 AI 去调。注册可免费试用，不用绑卡。

### 知乎接口的返回给 AI 用，占多少 token？

知乎的 16 个接口各取一份录制的真实返回，平台原始 JSON 合计 71.2 万 token，AI 通过 DataXAPI 的 MCP 读到的只有 6.3 万 token，少 91%；直接调接口拿到的 JSON 也少 73%（2026-11-06 统计）。所有平台同一套字段名，用 fields 还能只取你要的字段。

### 知乎 API 怎么收费？

按次收费，没有订阅。16 个接口都是一次 $0.0020。拿到数据才扣费，失败不收。

### 需要知乎账号或 Cookie 吗？

不需要。你只拿一把 DataXAPI 的 Key：不用登录知乎，不用 Cookie，也不用养设备。接口只返回公开可见的数据。

### 数据是实时的吗？

每次调用都当场去知乎取，`meta.fetched_at` 写明取到的时间。知乎热榜：榜单是每 10 分钟刷新一次的快照。结果保留 24 小时，带同一个 `Idempotency-Key` 重试不会再扣一次。

### 知乎改版了怎么办？

调用失败不管什么原因都不扣费。被暂停的接口返回 `capability_paused`，同样不扣费；`GET /v1/catalog/status` 写着现在哪些能用。

## 怎么做和常见问题

- [知乎有 API 吗？用 Python 取问题和回答（2026）](https://dataxapi.com/zh/guides/zhihu-api-python.md)
- [知乎 x-zse-96 是什么（2026）](https://dataxapi.com/zh/answers/zhihu-x-zse-96.md)
- [知乎爬虫爬不了了怎么办（2026）](https://dataxapi.com/zh/answers/zhihu-scraper-not-working.md)
- [怎么让 AI 读知乎、B 站、微博（2026）](https://dataxapi.com/zh/answers/ai-read-zhihu-bilibili-weibo.md)
- [知乎 40362 是什么意思（2026）](https://dataxapi.com/zh/answers/zhihu-40362.md)
- [知乎数据接口有哪些？问题、回答、评论怎么取（2026）](https://dataxapi.com/zh/answers/zhihu-data-apis.md)
- [有没有能让 Claude 查小红书、抖音、公众号的 MCP？（2026）](https://dataxapi.com/zh/answers/china-social-data-mcp.md)
- [知乎 MCP：在 Claude、Cursor 里查知乎问答（2026）](https://dataxapi.com/zh/answers/zhihu-mcp.md)
- [一个 Key 调小红书、抖音、公众号：社媒数据 API 聚合怎么选（2026）](https://dataxapi.com/zh/answers/one-key-china-social-data-api.md)
- [热榜 API：抖音热搜、微博热搜、知乎热榜、B站热门怎么用程序取（2026）](https://dataxapi.com/zh/answers/china-trending-api.md)
- [舆情监控 API 有哪些？一个关键词同时查微博、抖音、小红书等平台（2026）](https://dataxapi.com/zh/answers/social-listening-api-china.md)
- [知乎问题 ID、回答 ID 怎么找（2026）](https://dataxapi.com/zh/answers/zhihu-question-answer-id.md)
- [社媒数据接口常见问题：按平台说清能取什么、不能取什么（2026）](https://dataxapi.com/zh/answers/social-media-data-api-faq.md)
- [给 AI 和 agent 用的知乎数据接口：返回省 token、Claude 和 Cursor 直接调（2026）](https://dataxapi.com/zh/answers/zhihu-api-for-ai-agents.md)
- [怎么批量查账号和评论的 IP 属地？8 个平台 28 个接口逐项对照（2026）](https://dataxapi.com/zh/answers/ip-location-by-platform.md)

---

怎么调用、怎么计费、怎么处理报错，所有接口都一样：https://dataxapi.com/zh/llms.txt

最后核对于 2026-11-20 07:17 UTC。目录修订号 720fc3ea8dadb865。 [网页版](https://dataxapi.com/zh/apis/zhihu/)
