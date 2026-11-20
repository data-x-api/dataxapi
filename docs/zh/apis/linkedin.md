# LinkedIn API

7 个接口读 LinkedIn：帖子、公司、广告库。一次 $0.0020 起。不用登录 LinkedIn，不用 Cookie；失败不收费。

也叫：领英

## LinkedIn 的 7 个接口，各取什么

- [LinkedIn 广告详情](https://dataxapi.com/zh/apis/linkedin/ads/get.md)：按编号或链接取 LinkedIn 广告库里的一条广告：广告主、文案、标题、图片和视频素材、落地页、投放起止时间、展示量档位、定向的语言和地区。
- [LinkedIn 广告库搜索](https://dataxapi.com/zh/apis/linkedin/ads/search.md)：按关键词或公司名搜 LinkedIn 广告库里的广告：广告主、文案、标题、图片和视频素材、落地页、投放起止时间、展示量档位、定向的语言和地区；可限定国家。
- [LinkedIn 公司主页](https://dataxapi.com/zh/apis/linkedin/companies/get.md)：按公司的账号名或链接取 LinkedIn 公司主页：名称、简介、员工数、行业、规模、公司类型、总部、网站。
- [LinkedIn 公司帖子](https://dataxapi.com/zh/apis/linkedin/companies/posts/list.md)：按公司的账号名或链接取 LinkedIn 公司主页上公开展示的最近帖子（最多 10 条）：编号、链接、正文、发布时间。不带作者和互动数，互动数用帖子详情取；只有这一页，不能往前翻。
- [LinkedIn 帖子详情](https://dataxapi.com/zh/apis/linkedin/posts/get.md)：按帖子编号或链接取一条 LinkedIn 帖子：正文、作者、发布时间、点赞（全部心情）数、评论数、图片。
- [LinkedIn 帖子搜索](https://dataxapi.com/zh/apis/linkedin/posts/search.md)：按搜索词找公开的 LinkedIn 帖子：正文、作者、发布时间、点赞（全部心情）数、评论数；可限定最近多久之内发布。结果来自网页搜索引擎对 LinkedIn 的收录，不是 LinkedIn 站内搜索，不保证全。
- [LinkedIn 视频字幕](https://dataxapi.com/zh/apis/linkedin/posts/transcript/get.md)：按帖子编号或链接取 LinkedIn 帖子里的视频说的话，全文。只有平台自己为视频公开了文字稿的帖子才有，多数视频没有。

## 接口

### 帖子 (3)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [LinkedIn 帖子搜索](https://dataxapi.com/zh/apis/linkedin/posts/search.md) | `GET /v1/linkedin/posts/search` | 内容列表 | $0.0020 / 次 |
| [LinkedIn 帖子详情](https://dataxapi.com/zh/apis/linkedin/posts/get.md) | `GET /v1/linkedin/posts/get` | 内容 | $0.0020 / 次 |
| [LinkedIn 视频字幕](https://dataxapi.com/zh/apis/linkedin/posts/transcript/get.md) | `GET /v1/linkedin/posts/transcript/get` | 逐字稿 | $0.0020 / 次 |

### 公司 (2)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [LinkedIn 公司主页](https://dataxapi.com/zh/apis/linkedin/companies/get.md) | `GET /v1/linkedin/companies/get` | 账号 | $0.0020 / 次 |
| [LinkedIn 公司帖子](https://dataxapi.com/zh/apis/linkedin/companies/posts/list.md) | `GET /v1/linkedin/companies/posts/list` | 内容列表 | $0.0020 / 次 |

### 广告库 (2)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [LinkedIn 广告库搜索](https://dataxapi.com/zh/apis/linkedin/ads/search.md) | `GET /v1/linkedin/ads/search` | 广告列表 | $0.0020 / 次 |
| [LinkedIn 广告详情](https://dataxapi.com/zh/apis/linkedin/ads/get.md) | `GET /v1/linkedin/ads/get` | 广告 | $0.0020 / 次 |

## 调用前要知道的

- **每页条数**：列表每页 10 到 24 条，各接口不同。3 个列表里有 2 个能翻页：把 `page.next_cursor` 作为 `cursor` 传回，每一页是一次单独的调用。其余只有一页。
- **给不了的字段**：7 个接口里有 5 个填不满它返回的对象。每个接口的页面列出了给不了哪些，每次返回也在 `meta.unavailable` 里再写一遍：缺的字段不会被悄悄写成 0。
- **预览结构**：有 2 个接口返回的是预览结构，字段还可能调整；其余返回统一的结构，所有平台都一样。

## 调用结果不对时先看这里

- **帖子编号是 activity 编号**：linkedin.com/posts/…-activity-编号-… 和 /feed/update/urn:li:activity:编号 两种链接里都有它，都能直接传。
- **公司用账号名**：公司用主页链接里 /company/ 后面那一段。不给关注人数。
- **公司帖子：10 条，不带数**：公司帖子是它公开展示的最近几条，最多 10 条，不带作者、不带数，也没有更早的页。要心情数和评论数，按帖子再取一次详情。
- **帖子搜索搜不全**：帖子搜索走的是网页搜索引擎收录的 LinkedIn 内容，不是 LinkedIn 自己的搜索，会漏。什么都没搜到的不扣费。
- **多数视频没有文字稿**：只有 LinkedIn 随视频发布了文字稿的才取得到；其余按不存在返回，不扣费。

## 常见问题

### 通过 API 能拿到 LinkedIn 的哪些数据？

7 个接口：帖子、公司、广告库。每个接口的页面写明参数、返回字段，并附一份录制的真实返回。

### 怎么调用 LinkedIn API？

注册拿一把 Key，放进请求头 `Authorization: Bearer <key>`，按接口的地址发请求，比如 `GET https://api.dataxapi.com/v1/linkedin/ads/get`。也可以把 DataXAPI 接进 Claude、Cursor 或 ChatGPT（MCP），用一句话让 AI 去调。注册可免费试用，不用绑卡。

### LinkedIn 接口的返回给 AI 用，占多少 token？

LinkedIn 的 7 个接口各取一份录制的真实返回，平台原始 JSON 合计 3.7 万 token，AI 通过 DataXAPI 的 MCP 读到的只有 8,290 token，少 77%；直接调接口拿到的 JSON 也少 41%（2026-11-06 统计）。所有平台同一套字段名，用 fields 还能只取你要的字段。

### LinkedIn API 怎么收费？

按次收费，没有订阅。7 个接口都是一次 $0.0020。拿到数据才扣费，失败不收。

### 需要 LinkedIn 账号或 Cookie 吗？

不需要。你只拿一把 DataXAPI 的 Key：不用登录 LinkedIn，不用 Cookie，也不用养设备。接口只返回公开可见的数据。

### 数据是实时的吗？

每次调用都当场去 LinkedIn 取，`meta.fetched_at` 写明取到的时间。结果保留 24 小时，带同一个 `Idempotency-Key` 重试不会再扣一次。

### LinkedIn 改版了怎么办？

调用失败不管什么原因都不扣费。被暂停的接口返回 `capability_paused`，同样不扣费；`GET /v1/catalog/status` 写着现在哪些能用。

## 怎么做和常见问题

- [LinkedIn 广告库 API：按关键词或公司名查广告（2026）](https://dataxapi.com/zh/answers/linkedin-ad-library-api.md)

---

怎么调用、怎么计费、怎么处理报错，所有接口都一样：https://dataxapi.com/zh/llms.txt

最后核对于 2026-11-20 07:17 UTC。目录修订号 720fc3ea8dadb865。 [网页版](https://dataxapi.com/zh/apis/linkedin/)
