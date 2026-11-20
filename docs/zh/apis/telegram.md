# Telegram API

3 个接口读 Telegram：频道、消息。一次 $0.0020 起。不用登录 Telegram，不用 Cookie；失败不收费。

也叫：电报、纸飞机

## Telegram 的 3 个接口，各取什么

- [Telegram 频道资料](https://dataxapi.com/zh/apis/telegram/channels/get.md)：按账号名取公开 Telegram 频道的资料：名称、简介、订阅数、是否认证。
- [Telegram 频道消息](https://dataxapi.com/zh/apis/telegram/channels/messages/list.md)：按账号名取一页公开 Telegram 频道的消息，从最新的开始：正文、发布时间、浏览数、图片。
- [Telegram 单条消息](https://dataxapi.com/zh/apis/telegram/messages/get.md)：按“频道账号名/消息序号”或消息链接取公开 Telegram 频道的一条消息：正文、发布时间、浏览数、图片。

## 接口

### 频道 (2)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [Telegram 频道资料](https://dataxapi.com/zh/apis/telegram/channels/get.md) | `GET /v1/telegram/channels/get` | 账号 | $0.0020 / 次 |
| [Telegram 频道消息](https://dataxapi.com/zh/apis/telegram/channels/messages/list.md) | `GET /v1/telegram/channels/messages/list` | 内容列表 | $0.0020 / 次 |

### 消息 (1)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [Telegram 单条消息](https://dataxapi.com/zh/apis/telegram/messages/get.md) | `GET /v1/telegram/messages/get` | 内容 | $0.0020 / 次 |

## 调用前要知道的

- **每页条数**：列表每页 20 条。每个列表都能翻页：把 `page.next_cursor` 作为 `cursor` 传回，每一页是一次单独的调用。
- **给不了的字段**：3 个接口里有 3 个填不满它返回的对象。每个接口的页面列出了给不了哪些，每次返回也在 `meta.unavailable` 里再写一遍：缺的字段不会被悄悄写成 0。

## 调用结果不对时先看这里

- **只有公开频道**：没有公开页面的账号名，按频道不存在返回。
- **消息编号**：消息编号是频道账号名加消息序号，用 / 连起来，比如 telegram/401。消息列表返回的就是这个写法，可以原样传给取单条消息的接口。
- **浏览数是约数**：浏览数过千以后，是按页面上显示的写法（“2.28M”）换算的，标为约数。
- **没有点赞数和评论数**：消息不带点赞数和评论数；频道也没有数字编号，只认账号名。

## 常见问题

### 通过 API 能拿到 Telegram 的哪些数据？

3 个接口：频道、消息。每个接口的页面写明参数、返回字段，并附一份录制的真实返回。

### 怎么调用 Telegram API？

注册拿一把 Key，放进请求头 `Authorization: Bearer <key>`，按接口的地址发请求，比如 `GET https://api.dataxapi.com/v1/telegram/channels/get`。也可以把 DataXAPI 接进 Claude、Cursor 或 ChatGPT（MCP），用一句话让 AI 去调。注册可免费试用，不用绑卡。

### Telegram 接口的返回给 AI 用，占多少 token？

Telegram 的 3 个接口各取一份录制的真实返回，平台原始 JSON 合计 1.8 万 token，AI 通过 DataXAPI 的 MCP 读到的只有 3,096 token，少 83%；直接调接口拿到的 JSON 也少 76%（2026-11-06 统计）。所有平台同一套字段名，用 fields 还能只取你要的字段。

### Telegram API 怎么收费？

按次收费，没有订阅。3 个接口都是一次 $0.0020。拿到数据才扣费，失败不收。

### 需要 Telegram 账号或 Cookie 吗？

不需要。你只拿一把 DataXAPI 的 Key：不用登录 Telegram，不用 Cookie，也不用养设备。接口只返回公开可见的数据。

### 数据是实时的吗？

每次调用都当场去 Telegram 取，`meta.fetched_at` 写明取到的时间。结果保留 24 小时，带同一个 `Idempotency-Key` 重试不会再扣一次。

### Telegram 改版了怎么办？

调用失败不管什么原因都不扣费。被暂停的接口返回 `capability_paused`，同样不扣费；`GET /v1/catalog/status` 写着现在哪些能用。

---

怎么调用、怎么计费、怎么处理报错，所有接口都一样：https://dataxapi.com/zh/llms.txt

最后核对于 2026-11-20 07:17 UTC。目录修订号 720fc3ea8dadb865。 [网页版](https://dataxapi.com/zh/apis/telegram/)
