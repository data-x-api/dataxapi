# Pinterest API

2 个接口读 Pinterest：图钉。一次 $0.0020 起。不用登录 Pinterest，不用 Cookie；失败不收费。

也叫：拼趣

## Pinterest 的 2 个接口，各取什么

- [Pinterest 图钉详情](https://dataxapi.com/zh/apis/pinterest/pins/get.md)：按图钉编号或链接取一个 Pinterest 图钉：标题、描述、图片、发布者、发布时间、心情数、评论数、保存数、指向的网页。
- [Pinterest 图钉搜索](https://dataxapi.com/zh/apis/pinterest/pins/search.md)：按搜索词找 Pinterest 图钉：标题、描述、图片、发布者、发布时间、指向的网页。不带互动数，互动数用图钉详情取。

## 接口

### 图钉 (2)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [Pinterest 图钉搜索](https://dataxapi.com/zh/apis/pinterest/pins/search.md) | `GET /v1/pinterest/pins/search` | 内容列表 | $0.0020 / 次 |
| [Pinterest 图钉详情](https://dataxapi.com/zh/apis/pinterest/pins/get.md) | `GET /v1/pinterest/pins/get` | 内容 | $0.0020 / 次 |

## 调用前要知道的

- **每页条数**：列表每页 20 到 50 条，各接口不同。每个列表都能翻页：把 `page.next_cursor` 作为 `cursor` 传回，每一页是一次单独的调用。
- **给不了的字段**：2 个接口里有 2 个填不满它返回的对象。每个接口的页面列出了给不了哪些，每次返回也在 `meta.unavailable` 里再写一遍：缺的字段不会被悄悄写成 0。

## 调用结果不对时先看这里

- **图钉编号和链接**：图钉用一串数字的编号，或者链接 pinterest.com/pin/编号；pin.it 短链不收。
- **搜索不带数**：搜出来的图钉不带任何数；要心情、评论、收藏数，按图钉再取一次详情。
- **两种收藏数**：`metrics.favorites` 是这一个图钉被转存的次数；`ext.saves` 是同一内容所有副本的保存总数，评论数也是所有副本加在一起的。
- **一页可能不满**：既没标题也没描述的图钉会被去掉，相关搜索之类的区块也会去掉，所以一页可能比平时少。

## 常见问题

### 通过 API 能拿到 Pinterest 的哪些数据？

2 个接口：图钉。每个接口的页面写明参数、返回字段，并附一份录制的真实返回。

### 怎么调用 Pinterest API？

注册拿一把 Key，放进请求头 `Authorization: Bearer <key>`，按接口的地址发请求，比如 `GET https://api.dataxapi.com/v1/pinterest/pins/get`。也可以把 DataXAPI 接进 Claude、Cursor 或 ChatGPT（MCP），用一句话让 AI 去调。注册可免费试用，不用绑卡。

### Pinterest 接口的返回给 AI 用，占多少 token？

Pinterest 的 2 个接口各取一份录制的真实返回，平台原始 JSON 合计 4.3 万 token，AI 通过 DataXAPI 的 MCP 读到的只有 2,557 token，少 94%；直接调接口拿到的 JSON 也少 90%（2026-11-06 统计）。所有平台同一套字段名，用 fields 还能只取你要的字段。

### Pinterest API 怎么收费？

按次收费，没有订阅。2 个接口都是一次 $0.0020。拿到数据才扣费，失败不收。

### 需要 Pinterest 账号或 Cookie 吗？

不需要。你只拿一把 DataXAPI 的 Key：不用登录 Pinterest，不用 Cookie，也不用养设备。接口只返回公开可见的数据。

### 数据是实时的吗？

每次调用都当场去 Pinterest 取，`meta.fetched_at` 写明取到的时间。结果保留 24 小时，带同一个 `Idempotency-Key` 重试不会再扣一次。

### Pinterest 改版了怎么办？

调用失败不管什么原因都不扣费。被暂停的接口返回 `capability_paused`，同样不扣费；`GET /v1/catalog/status` 写着现在哪些能用。

---

怎么调用、怎么计费、怎么处理报错，所有接口都一样：https://dataxapi.com/zh/llms.txt

最后核对于 2026-11-20 07:17 UTC。目录修订号 720fc3ea8dadb865。 [网页版](https://dataxapi.com/zh/apis/pinterest/)
