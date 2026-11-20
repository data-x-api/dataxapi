# TikTok 创意中心 API（TikTok 热门广告）

2 个接口读 TikTok 创意中心：热门广告搜索、广告详情和表现。一次 $0.0020。不用登录 TikTok，不用 Cookie；失败不收费。

也叫：Creative Center

## 这组数据是什么

**TikTok 创意中心的热门广告（Top Ads）是表现好的广告素材展示，一次看一个国家。**按关键词搜最近 7 天、30 天或 180 天的热门广告，按创意中心的推荐顺序或点赞数排；再按编号读单条广告的落地页、评论数、分享数和投放的国家。

它不是广告库：热门广告没有投放时间，也没有广告主编号，只有部分广告带品牌名。TikTok 广告库是在欧洲投放过的广告的公开记录，是另一批广告、另一套编号，用 TikTok 的广告接口读。

- **点赞、评论、分享**：广告视频的互动数，完整档里在 `ext`。搜索只给点赞数；按编号读单条广告时还有评论数和分享数。
- **统计周期和国家**：`window` 是榜单统计的周期：`7d`、`30d` 或 `180d`，不写是 180 天。`region` 是两个字母的国家代码，不写是美国。
- **投放目标**：`ext.objective` 是投放目标，写的是平台自己的代号。
- **视频地址会过期**：`videos` 和 `ext.cover_url` 是带签名的地址，每次返回都会重新签发，会过期；要留存就自己把文件存下来。

## 这 2 个接口

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [TikTok 创意中心热门广告搜索](https://dataxapi.com/zh/apis/tiktok/creative_center/ads/search.md) | `GET /v1/tiktok/creative_center/ads/search` | 广告列表 | $0.0020 / 次 |
| [TikTok 创意中心热门广告详情](https://dataxapi.com/zh/apis/tiktok/creative_center/ads/get.md) | `GET /v1/tiktok/creative_center/ads/get` | 广告 | $0.0020 / 次 |

## 一个典型用法，和它的账单

**收集一个行业投放中的广告。**读 5 页热门广告，再对值得研究的 10 条读详情和表现数据。

| 调用 | 次数 | 花费 |
| --- | --- | --- |
| TikTok 创意中心热门广告搜索 | 5 × $0.0020 | $0.0100 |
| TikTok 创意中心热门广告详情 | 10 × $0.0020 | $0.0200 |
| 合计 15 次调用 |  | $0.0300 |

## 在你的 AI 里用它

> 用 DataXAPI 搜 TikTok 创意中心的热门广告，告诉我榜单前 10 条投放中的广告有什么共同点。

## 常见问题

### 多少钱？

按次收费，没有订阅。2 个接口都是一次 $0.0020。拿到数据才扣费，失败不收。

### 热门广告有投放时间吗？

没有。创意中心不给时间，所以不返回 `first_shown_at` 和 `last_shown_at`。要看投放时间，用 TikTok 广告库，它记的是在欧洲投放过的广告。

### 广告主是谁？

`advertiser.name` 是创意中心显示的品牌名，很多广告没有。没有广告主编号、主页链接和头像。

### 广告编号从哪来？

从搜索来：每条结果的 `id` 是一串数字，可以原样传给广告详情。不存在的编号返回 `not_found`，按接口价收费。

### 需要创意中心或 TikTok 的账号吗？

不需要。你只拿一把 DataXAPI 的 Key：不用登录 TikTok，不用 Cookie，也不用广告主账号。

## 怎么做和常见问题

- [TikTok 广告资料库怎么批量查（2026）](https://dataxapi.com/zh/answers/tiktok-ad-library-bulk-search.md)

[TikTok API](https://dataxapi.com/zh/apis/tiktok.md)

---

怎么调用、怎么计费、怎么处理报错，所有接口都一样：https://dataxapi.com/zh/llms.txt

最后核对于 2026-11-20 07:17 UTC。目录修订号 720fc3ea8dadb865。 [网页版](https://dataxapi.com/zh/apis/tiktok/creative_center/)
