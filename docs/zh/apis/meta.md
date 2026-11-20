# Meta 广告库 API

5 个接口读 Meta 广告库：广告库、广告主。一次 $0.0020 起。不用登录 Meta 广告库，不用 Cookie；失败不收费。

也叫：Meta Ad Library、facebook 广告库

## Meta 广告库的 5 个接口，各取什么

- [Meta 广告详情](https://dataxapi.com/zh/apis/meta/ads/get.md)：按广告库编号或链接取 Meta 广告库里的一条广告：广告主、文案、标题、图片和视频素材、落地页、投放起止时间、投放到哪些平台、是否还在投。
- [Meta 广告库搜索](https://dataxapi.com/zh/apis/meta/ads/search.md)：按关键词搜 Meta 广告库（Facebook、Instagram 等）里正在投放的广告：广告主、文案、标题、图片和视频素材、落地页、投放起止时间；可限定国家、只看图片或视频、按展示量或最新排序。一页 30 条。
- [Meta 广告视频字幕](https://dataxapi.com/zh/apis/meta/ads/transcript/get.md)：按广告库编号或链接取 Meta 广告库里一条视频广告说的话，全文。
- [Meta 广告主的广告](https://dataxapi.com/zh/apis/meta/advertisers/ads/list.md)：按广告主（Facebook 主页）的编号取它在 Meta 广告库里正在投放的广告：文案、标题、图片和视频素材、落地页、投放起止时间；可限定国家、只看图片或视频、按展示量或最新排序。一页 30 条。
- [Meta 广告主搜索](https://dataxapi.com/zh/apis/meta/advertisers/search.md)：按名称在 Meta 广告库里找广告主（Facebook 主页）：编号、名称、头像、类别、主页点赞数、关联的 Instagram 账号。拿到的编号用来取这个广告主的广告。

## 接口

### 广告库 (3)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [Meta 广告库搜索](https://dataxapi.com/zh/apis/meta/ads/search.md) | `GET /v1/meta/ads/search` | 广告列表 | $0.0020 / 次 |
| [Meta 广告详情](https://dataxapi.com/zh/apis/meta/ads/get.md) | `GET /v1/meta/ads/get` | 广告 | $0.0020 / 次 |
| [Meta 广告视频字幕](https://dataxapi.com/zh/apis/meta/ads/transcript/get.md) | `GET /v1/meta/ads/transcript/get` | 逐字稿 | $0.0020 / 次 |

### 广告主 (2)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [Meta 广告主搜索](https://dataxapi.com/zh/apis/meta/advertisers/search.md) | `GET /v1/meta/advertisers/search` | 广告主列表 | $0.0020 / 次 |
| [Meta 广告主的广告](https://dataxapi.com/zh/apis/meta/advertisers/ads/list.md) | `GET /v1/meta/advertisers/ads/list` | 广告列表 | $0.0020 / 次 |

## 调用前要知道的

- **每页条数**：列表每页 15 到 30 条，各接口不同。3 个列表里有 2 个能翻页：把 `page.next_cursor` 作为 `cursor` 传回，每一页是一次单独的调用。其余只有一页。
- **给不了的字段**：5 个接口里有 2 个填不满它返回的对象。每个接口的页面列出了给不了哪些，每次返回也在 `meta.unavailable` 里再写一遍：缺的字段不会被悄悄写成 0。
- **对象不存在时读起来像空结果**：Meta 广告主的广告：对象不存在和对象下面没有东西分不出来，所以返回空结果而不是 404。
- **预览结构**：有 4 个接口返回的是预览结构，字段还可能调整；其余返回统一的结构，所有平台都一样。

## 调用结果不对时先看这里

- **只有在投的广告**：广告搜索和广告主的广告，返回的都是现在正在投放的。
- **广告主编号就是主页编号**：广告主就是一个 Facebook 主页：先用广告主搜索按名称查到编号，再用这个编号取它的广告。
- **广告库编号或链接**：单条广告用广告库编号（Library ID），或者链接 facebook.com/ads/library/?id=编号。
- **空结果不等于不存在**：不存在的广告主和现在没在投广告的广告主，都返回空列表。
- **不是每条广告都有文字稿**：没有视频的广告，或者视频里转不出文字的，按不存在返回，不扣费。

## 常见问题

### 通过 API 能拿到 Meta 广告库的哪些数据？

5 个接口：广告库、广告主。每个接口的页面写明参数、返回字段，并附一份录制的真实返回。

### 怎么调用 Meta 广告库 API？

注册拿一把 Key，放进请求头 `Authorization: Bearer <key>`，按接口的地址发请求，比如 `GET https://api.dataxapi.com/v1/meta/ads/get`。也可以把 DataXAPI 接进 Claude、Cursor 或 ChatGPT（MCP），用一句话让 AI 去调。注册可免费试用，不用绑卡。

### Meta 广告库接口的返回给 AI 用，占多少 token？

Meta 广告库的 5 个接口各取一份录制的真实返回，平台原始 JSON 合计 23.6 万 token，AI 通过 DataXAPI 的 MCP 读到的只有 9,707 token，少 96%；直接调接口拿到的 JSON 也少 61%（2026-11-06 统计）。所有平台同一套字段名，用 fields 还能只取你要的字段。

### Meta 广告库 API 怎么收费？

按次收费，没有订阅。5 个接口都是一次 $0.0020。拿到数据才扣费，失败不收。

### 需要 Meta 广告库账号或 Cookie 吗？

不需要。你只拿一把 DataXAPI 的 Key：不用登录 Meta 广告库，不用 Cookie，也不用养设备。接口只返回公开可见的数据。

### 数据是实时的吗？

每次调用都当场去 Meta 广告库取，`meta.fetched_at` 写明取到的时间。结果保留 24 小时，带同一个 `Idempotency-Key` 重试不会再扣一次。

### Meta 广告库改版了怎么办？

调用失败不管什么原因都不扣费。被暂停的接口返回 `capability_paused`，同样不扣费；`GET /v1/catalog/status` 写着现在哪些能用。

## 怎么做和常见问题

- [Meta 广告库 API：按关键词搜广告、查一个 Facebook 主页投的全部广告（2026）](https://dataxapi.com/zh/answers/meta-ad-library-api.md)

---

怎么调用、怎么计费、怎么处理报错，所有接口都一样：https://dataxapi.com/zh/llms.txt

最后核对于 2026-11-20 07:17 UTC。目录修订号 720fc3ea8dadb865。 [网页版](https://dataxapi.com/zh/apis/meta/)
