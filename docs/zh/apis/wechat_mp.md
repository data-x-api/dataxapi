# 微信公众号 API

8 个接口读微信公众号：文章、公众号、评论。一次 $0.0200 起。不用登录微信公众号，不用 Cookie；失败不收费。

也叫：WeChat Official Accounts

## 接口

### 文章 (3)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [微信公众号文章详情](https://dataxapi.com/zh/apis/wechat_mp/articles/get.md) | `GET /v1/wechat_mp/articles/get` | 内容 | $0.0200 / 次 |
| [微信公众号文章评论](https://dataxapi.com/zh/apis/wechat_mp/articles/comments/list.md) | `GET /v1/wechat_mp/articles/comments/list` | 评论列表 | $0.0200 / 次 |
| [微信公众号文章互动数据](https://dataxapi.com/zh/apis/wechat_mp/articles/metrics.md) | `GET /v1/wechat_mp/articles/metrics` | 内容 | $0.0200 / 次 |

### 公众号 (4)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [微信公众号账号搜索](https://dataxapi.com/zh/apis/wechat_mp/accounts/search.md) | `GET /v1/wechat_mp/accounts/search` | 账号列表 | $0.05635 / 条 |
| [微信公众号资料](https://dataxapi.com/zh/apis/wechat_mp/accounts/get.md) | `GET /v1/wechat_mp/accounts/get` | 账号 | $0.0200 / 次 |
| [微信公众号主体信息](https://dataxapi.com/zh/apis/wechat_mp/accounts/owner/get.md) | `GET /v1/wechat_mp/accounts/owner/get` | 账号主体 | $0.1 / 次 |
| [微信公众号文章列表](https://dataxapi.com/zh/apis/wechat_mp/accounts/articles/list.md) | `GET /v1/wechat_mp/accounts/articles/list` | 内容列表 | $0.0200 / 次 |

### 评论 (1)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [微信公众号评论回复](https://dataxapi.com/zh/apis/wechat_mp/comments/replies/list.md) | `GET /v1/wechat_mp/comments/replies/list` | 评论列表 | $0.0200 / 次 |

## 调用前要知道的

- **每页条数**：列表每页 3 到 100 条，各接口不同。4 个列表里有 2 个能翻页：把 `page.next_cursor` 作为 `cursor` 传回，每一页是一次单独的调用。其余只有一页。
- **给不了的字段**：8 个接口里有 7 个填不满它返回的对象。每个接口的页面列出了给不了哪些，每次返回也在 `meta.unavailable` 里再写一遍：缺的字段不会被悄悄写成 0。
- **对象不存在时读起来像空结果**：微信公众号评论回复：对象不存在和对象下面没有东西分不出来，所以返回空结果而不是 404。
- **预览结构**：有 1 个接口返回的是预览结构，字段还可能调整；其余返回统一的结构，所有平台都一样。

## 调用结果不对时先看这里

- **文章只能用链接指定**：文章详情、评论、回复都用文章链接：带 __biz、mid、idx、sn 的长链接，或 /s/ 开头的短链接。返回里文章的 `id` 不能拿来取文章。
- **互动数据要用长链接**：`wechat_mp.articles.metrics` 只收长链接，/s/ 开头的短链接在这里不收。
- **原始编号，不是微信号**：公众号接口用 gh_ 开头的原始编号，文章详情里的 `author.id` 就是它；平时搜号用的微信号不收。
- **“10万+”**：阅读数过了 10 万，平台只显示“10万+”，这时返回 100001，只是个下限。
- **只有精选评论**：评论只有公众号精选出来展示的那些；评论回复只给第一批，没有下一页。

## 常见问题

### 微信公众号 API 怎么收费？

按次收费，没有订阅。一次 $0.0200 到 $0.84525，每个接口的页面写明自己的价格。有 1 个接口按返回的条数计费，每次有最低和最高。拿到数据才扣费，失败不收。

### 需要微信公众号账号或 Cookie 吗？

不需要。你只拿一把 DataXAPI 的 Key：不用登录微信公众号，不用 Cookie，也不用养设备。接口只返回公开可见的数据。

### 数据是实时的吗？

每次调用都当场去微信公众号取，`meta.fetched_at` 写明取到的时间。结果保留 24 小时，带同一个 `Idempotency-Key` 重试不会再扣一次。

### 微信公众号改版了怎么办？

调用失败不管什么原因都不扣费。被暂停的接口返回 `capability_paused`，同样不扣费；`GET /v1/catalog/status` 写着现在哪些能用。

## 怎么做和常见问题

- [如何获取公众号历史文章列表](https://dataxapi.com/zh/guides/wechat-official-account-articles.md)
- [如何获取公众号文章阅读数和点赞数](https://dataxapi.com/zh/guides/wechat-article-reads-and-likes.md)
- [如何获取视频号视频评论](https://dataxapi.com/zh/guides/wechat-channels-video-comments.md)
- [如何获取视频号账号的全部作品](https://dataxapi.com/zh/guides/wechat-channels-user-videos.md)
- [如何用接口查微信搜一搜的结果](https://dataxapi.com/zh/guides/wechat-search-posts.md)
- [公众号文章能用 API 读取吗？](https://dataxapi.com/zh/answers/is-there-an-api-for-wechat-official-account-articles.md)
- [视频号数据怎么获取？](https://dataxapi.com/zh/answers/how-to-get-wechat-channels-data.md)
- [公众号文章链接里的 __biz 是什么？](https://dataxapi.com/zh/answers/wechat-official-account-biz.md)
- [公众号文章链接里的 mid、idx、sn 是什么意思？](https://dataxapi.com/zh/answers/wechat-article-link-mid-idx-sn.md)
- [公众号原始 ID（gh_ 开头）是什么？](https://dataxapi.com/zh/answers/wechat-official-account-original-id.md)
- [视频号的 …@finder 账号编号和 export 编号是什么？](https://dataxapi.com/zh/answers/wechat-channels-finder-id.md)

---

怎么调用、怎么计费、怎么处理报错，所有接口都一样：https://dataxapi.com/zh/llms.txt

最后核对于 2026-11-20 07:17 UTC。目录修订号 720fc3ea8dadb865。 [网页版](https://dataxapi.com/zh/apis/wechat_mp/)
