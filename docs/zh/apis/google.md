# Google 广告 API

3 个接口读 Google 广告：广告库、广告主。一次 $0.0020 起。不用登录 Google 广告，不用 Cookie；失败不收费。

也叫：Google Ads、谷歌、谷歌广告、谷歌广告透明度中心

## Google 广告的 3 个接口，各取什么

- [Google 广告详情](https://dataxapi.com/zh/apis/google/ads/get.md)：按编号或链接取 Google 广告透明度中心里的一条广告：形态、标题、描述、落地页、图片和视频素材、首次和最近一次展示的时间、展示过的国家或地区、总展示量区间（平台公布时）。
- [Google 广告主的广告](https://dataxapi.com/zh/apis/google/advertisers/ads/list.md)：按广告主编号取它在 Google 广告透明度中心里的广告：形态（文字、图片、视频）、首次和最近一次展示的时间、广告截图；可限定国家、只看一种形态。一页 40 条；文案和落地页用“Google 广告详情”取。
- [Google 广告主搜索](https://dataxapi.com/zh/apis/google/advertisers/search.md)：按名称在 Google 广告透明度中心找广告主：编号、名称、登记的国家或地区、平台估计的广告数。拿到的编号用来取这个广告主的广告。

## 接口

### 广告库 (1)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [Google 广告详情](https://dataxapi.com/zh/apis/google/ads/get.md) | `GET /v1/google/ads/get` | 广告 | $0.0020 / 次 |

### 广告主 (2)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [Google 广告主搜索](https://dataxapi.com/zh/apis/google/advertisers/search.md) | `GET /v1/google/advertisers/search` | 广告主列表 | $0.0020 / 次 |
| [Google 广告主的广告](https://dataxapi.com/zh/apis/google/advertisers/ads/list.md) | `GET /v1/google/advertisers/ads/list` | 广告列表 | $0.0020 / 次 |

## 调用前要知道的

- **每页条数**：列表每页 10 到 40 条，各接口不同。2 个列表里有 1 个能翻页：把 `page.next_cursor` 作为 `cursor` 传回，每一页是一次单独的调用。其余只有一页。
- **给不了的字段**：3 个接口里有 3 个填不满它返回的对象。每个接口的页面列出了给不了哪些，每次返回也在 `meta.unavailable` 里再写一遍：缺的字段不会被悄悄写成 0。
- **对象不存在时读起来像空结果**：Google 广告主的广告：对象不存在和对象下面没有东西分不出来，所以返回空结果而不是 404。

## 调用结果不对时先看这里

- **广告主编号**：广告主编号是 AR 加一串数字，用广告主搜索按名称查，不写地区时在美国查。
- **广告编号**：广告编号是广告主编号和素材编号用 / 连起来（AR…/CR…），和它的链接 adstransparency.google.com/advertiser/AR…/creative/CR… 对得上。
- **广告列表里没有的**：广告主的广告列表只有形态、投放日期和一张图；广告说了什么、链到哪里、视频，都要看单条广告详情。
- **透明度中心没给的**：透明度中心没公布展示量的，区间是 null。广告只写了个域名当落地页的，原样留在 `ext.variations` 里。
- **空结果不等于不存在**：不存在的广告主编号取广告，返回空列表。

## 常见问题

### 通过 API 能拿到 Google 广告的哪些数据？

3 个接口：广告库、广告主。每个接口的页面写明参数、返回字段，并附一份录制的真实返回。

### 怎么调用 Google 广告 API？

注册拿一把 Key，放进请求头 `Authorization: Bearer <key>`，按接口的地址发请求，比如 `GET https://api.dataxapi.com/v1/google/ads/get`。也可以把 DataXAPI 接进 Claude、Cursor 或 ChatGPT（MCP），用一句话让 AI 去调。注册可免费试用，不用绑卡。

### Google 广告 API 怎么收费？

按次收费，没有订阅。3 个接口都是一次 $0.0020。拿到数据才扣费，失败不收。

### 需要 Google 广告账号或 Cookie 吗？

不需要。你只拿一把 DataXAPI 的 Key：不用登录 Google 广告，不用 Cookie，也不用养设备。接口只返回公开可见的数据。

### 数据是实时的吗？

每次调用都当场去 Google 广告取，`meta.fetched_at` 写明取到的时间。结果保留 24 小时，带同一个 `Idempotency-Key` 重试不会再扣一次。

### Google 广告改版了怎么办？

调用失败不管什么原因都不扣费。被暂停的接口返回 `capability_paused`，同样不扣费；`GET /v1/catalog/status` 写着现在哪些能用。

## 怎么做和常见问题

- [Google 广告透明度中心 API：查一个广告主的广告、文案和投放地区（2026）](https://dataxapi.com/zh/answers/google-ads-transparency-center-api.md)

---

怎么调用、怎么计费、怎么处理报错，所有接口都一样：https://dataxapi.com/zh/llms.txt

最后核对于 2026-11-20 07:17 UTC。目录修订号 720fc3ea8dadb865。 [网页版](https://dataxapi.com/zh/apis/google/)
