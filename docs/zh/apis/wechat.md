# 微信搜一搜 API

6 个接口读微信搜一搜：帖子、公众号、关键词、index、miniprograms。一次 $0.0200 起。不用登录微信搜一搜，不用 Cookie；失败不收费。

也叫：WeChat Search、微信搜索

## 微信搜一搜的 6 个接口，各取什么

- [微信搜一搜综合搜索](https://dataxapi.com/zh/apis/wechat/posts/search.md)：按搜索词在微信搜一搜里取一页结果，公众号文章和视频号视频混在一起，每条用 type 标明是文章还是视频；可按相关、最新或最热排、按发布时间筛，也可只搜文章或只搜视频：标题或文案、来源账号名称、发布时间，文章带链接（有的带阅读数档位），视频带点赞和收藏数。搜一搜不给账号编号。
- [微信搜一搜综合搜索（备用版）](https://dataxapi.com/zh/apis/wechat/backup/posts/search.md)：wechat.posts.search 的备用版：参数和返回相同，另一来源，单独计价。视频不带收藏数。
- [微信公众号实时查找](https://dataxapi.com/zh/apis/wechat/accounts/search.md)：按搜索词在微信搜一搜里找公众号和服务号，最像的排前面，后面可能跟着不太相关的账号：原始编号、微信号、名称、简介、头像、是否认证、主体名称、原创文章数。按次计费；不带粉丝和阅读数，要这些的估计值用 wechat_mp.accounts.search。
- [微信指数](https://dataxapi.com/zh/apis/wechat/index/keywords/history.md)：按关键词取它最近 30 天的微信指数，一天一个数。微信指数是微信综合搜索、文章、朋友圈等算出的热度分，不是搜索次数，不能和抖音、小红书的指数比；日期是中国时间（UTC+8）的自然日。
- [微信搜一搜推荐词](https://dataxapi.com/zh/apis/wechat/keywords/related.md)：按关键词取微信搜一搜在搜索框里给的联想推荐词，按搜一搜列出的顺序排，一次约 10 个。只有词和名次，没有指数。
- [微信小程序搜索](https://dataxapi.com/zh/apis/wechat/miniprograms/search.md)：按搜索词在微信搜一搜里找小程序，取第一页（约 25 个）：名称、简介、图标、原始编号和 AppID、主体名称和是否认证、平台显示的最近使用人数、是否小游戏。

## 接口

### 备用版 (1)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [微信搜一搜综合搜索（备用版）](https://dataxapi.com/zh/apis/wechat/backup/posts/search.md) | `GET /v1/wechat/backup/posts/search` | 内容列表 | $0.1 / 次 |

### 帖子 (1)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [微信搜一搜综合搜索](https://dataxapi.com/zh/apis/wechat/posts/search.md) | `GET /v1/wechat/posts/search` | 内容列表 | $0.0200 / 次 |

### 公众号 (1)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [微信公众号实时查找](https://dataxapi.com/zh/apis/wechat/accounts/search.md) | `GET /v1/wechat/accounts/search` | 账号列表 | $0.0200 / 次 |

### 关键词 (1)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [微信搜一搜推荐词](https://dataxapi.com/zh/apis/wechat/keywords/related.md) | `GET /v1/wechat/keywords/related` | 关联词列表 | $0.1 / 次 |

### Index (1)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [微信指数](https://dataxapi.com/zh/apis/wechat/index/keywords/history.md) | `GET /v1/wechat/index/keywords/history` | 关键词指数历史列表 | $0.1 / 次 |

### Miniprograms (1)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [微信小程序搜索](https://dataxapi.com/zh/apis/wechat/miniprograms/search.md) | `GET /v1/wechat/miniprograms/search` | 小程序列表 | $0.1 / 次 |

## 调用前要知道的

- **每页条数**：列表每页 1 到 40 条，各接口不同。6 个列表里有 3 个能翻页：把 `page.next_cursor` 作为 `cursor` 传回，每一页是一次单独的调用。其余只有一页。
- **给不了的字段**：6 个接口里有 5 个填不满它返回的对象。每个接口的页面列出了给不了哪些，每次返回也在 `meta.unavailable` 里再写一遍：缺的字段不会被悄悄写成 0。
- **对象不存在时读起来像空结果**：微信指数、微信搜一搜推荐词：对象不存在和对象下面没有东西分不出来，所以返回空结果而不是 404。
- **预览结构**：有 3 个接口返回的是预览结构，字段还可能调整；其余返回统一的结构，所有平台都一样。

## 调用结果不对时先看这里

- **文章和视频混在一页**：一页里公众号文章和视频号视频按搜索页的顺序混在一起，每条用 `type` 标明是文章（`article`）还是视频（`video`）。文章有链接和标题，视频两样都没有。
- **编号**：文章的 `id` 由文章链接拼成，和公众号文章列表给的一样，取文章用它的 `url`。视频的 `id` 是搜索结果里的加密编号，原样照给：视频号的接口不收它，以后再搜同一条视频也可能是另一个编号。
- **账号只有名称**：每条结果只给公众号或视频号的名称，不给账号编号。文章不带互动数；视频带卡片上显示的点赞和收藏数。

## 常见问题

### 通过 API 能拿到微信搜一搜的哪些数据？

6 个接口：帖子、公众号、关键词、index、miniprograms。每个接口的页面写明参数、返回字段，并附一份录制的真实返回。

### 怎么调用微信搜一搜 API？

注册拿一把 Key，放进请求头 `Authorization: Bearer <key>`，按接口的地址发请求，比如 `GET https://api.dataxapi.com/v1/wechat/posts/search`。也可以把 DataXAPI 接进 Claude、Cursor 或 ChatGPT（MCP），用一句话让 AI 去调。注册可免费试用，不用绑卡。

### 微信搜一搜接口的返回给 AI 用，占多少 token？

微信搜一搜的 6 个接口各取一份录制的真实返回，平台原始 JSON 合计 6.7 万 token，AI 通过 DataXAPI 的 MCP 读到的只有 1.3 万 token，少 81%；直接调接口拿到的 JSON 也少 71%（2026-11-06 统计）。所有平台同一套字段名，用 fields 还能只取你要的字段。

### 微信搜一搜 API 怎么收费？

按次收费，没有订阅。一次 $0.0200 到 $0.1，每个接口的页面写明自己的价格。拿到数据才扣费，失败不收。

### 需要微信搜一搜账号或 Cookie 吗？

不需要。你只拿一把 DataXAPI 的 Key：不用登录微信搜一搜，不用 Cookie，也不用养设备。接口只返回公开可见的数据。

### 数据是实时的吗？

每次调用都当场去微信搜一搜取，`meta.fetched_at` 写明取到的时间。结果保留 24 小时，带同一个 `Idempotency-Key` 重试不会再扣一次。

### 微信搜一搜改版了怎么办？

调用失败不管什么原因都不扣费。被暂停的接口返回 `capability_paused`，同样不扣费；`GET /v1/catalog/status` 写着现在哪些能用。

## 怎么做和常见问题

- [如何获取公众号历史文章列表](https://dataxapi.com/zh/guides/wechat-official-account-articles.md)
- [如何获取公众号文章阅读数和点赞数](https://dataxapi.com/zh/guides/wechat-article-reads-and-likes.md)
- [如何获取视频号视频评论](https://dataxapi.com/zh/guides/wechat-channels-video-comments.md)
- [如何获取视频号账号的全部作品](https://dataxapi.com/zh/guides/wechat-channels-user-videos.md)
- [如何用接口查微信搜一搜的结果](https://dataxapi.com/zh/guides/wechat-search-posts.md)
- [公众号文章有 API 吗？用 Python 批量取历史文章和阅读数（2026）](https://dataxapi.com/zh/guides/wechat-official-account-api-python.md)
- [视频号有 API 吗？用 Python 取账号作品和评论（2026）](https://dataxapi.com/zh/guides/wechat-channels-api-python.md)
- [公众号文章能用 API 读取吗？](https://dataxapi.com/zh/answers/is-there-an-api-for-wechat-official-account-articles.md)
- [视频号数据怎么获取？](https://dataxapi.com/zh/answers/how-to-get-wechat-channels-data.md)
- [公众号文章链接里的 __biz 是什么？](https://dataxapi.com/zh/answers/wechat-official-account-biz.md)
- [公众号文章链接里的 mid、idx、sn 是什么意思？](https://dataxapi.com/zh/answers/wechat-article-link-mid-idx-sn.md)
- [公众号原始 ID（gh_ 开头）是什么？](https://dataxapi.com/zh/answers/wechat-official-account-original-id.md)
- [视频号的 …@finder 账号编号和 export 编号是什么？](https://dataxapi.com/zh/answers/wechat-channels-finder-id.md)
- [微信数据接口有哪些？公众号、视频号、搜一搜能取什么（2026）](https://dataxapi.com/zh/answers/wechat-data-apis.md)
- [公众号数据 API 有哪些？历史文章、全文、阅读数、评论都能取吗（2026）](https://dataxapi.com/zh/answers/wechat-official-account-data-apis.md)
- [公众号接口报 ret=200013 freq control 怎么办（2026 年 7 月之后）](https://dataxapi.com/zh/answers/wechat-ret-200013-freq-control.md)
- [wechat-article-exporter 停了，还能用什么批量导出公众号文章（2026）](https://dataxapi.com/zh/answers/wechat-article-exporter-alternative.md)
- [公众号历史文章怎么批量导出（2026）](https://dataxapi.com/zh/answers/export-wechat-history-articles.md)
- [DataXAPI 和阿里的 DataX 是一回事吗（2026）](https://dataxapi.com/zh/answers/dataxapi-is-not-datax.md)
- [怎么让 AI 读公众号（ChatGPT、Claude、Codex，2026）](https://dataxapi.com/zh/answers/let-your-ai-read-wechat.md)
- [不开年费，怎么让 AI 每周盯同行的公众号、小红书和抖音（2026）](https://dataxapi.com/zh/answers/track-competitors-with-ai-pay-per-lookup.md)
- [公众号怎么转 RSS（公众号 RSS，2026）](https://dataxapi.com/zh/answers/wechat-official-account-rss.md)
- [wewe-rss 失效了怎么办（2026）](https://dataxapi.com/zh/answers/wewe-rss-not-working.md)
- [监控几十个公众号，有更新推到飞书，怎么做（2026）](https://dataxapi.com/zh/answers/monitor-wechat-accounts-feishu.md)
- [视频号账号全部作品怎么导出（2026）](https://dataxapi.com/zh/answers/export-wechat-channels-account-videos.md)
- [TrendRadar 怎么加公众号、小红书数据（2026）](https://dataxapi.com/zh/answers/trendradar-wechat-xiaohongshu.md)
- [we-mp-rss 容器里发现挖矿程序，公众号 RSS 现在怎么办（2026）](https://dataxapi.com/zh/answers/we-mp-rss-mining-alternative.md)
- [公众号历史读完后，每天只取新文章怎么做：去重和算账（2026）](https://dataxapi.com/zh/answers/wechat-backfill-then-new-articles.md)
- [不写代码，怎么让 AI 帮你取公众号、小红书、抖音数据（可复制的话，2026）](https://dataxapi.com/zh/answers/get-social-data-with-ai-no-code.md)
- [蝉妈妈、千瓜、新榜有 API 吗？想要原始数据怎么办（2026）](https://dataxapi.com/zh/answers/chanmama-qiangua-newrank-api.md)
- [公众号 fakeid 是什么（2026）](https://dataxapi.com/zh/answers/wechat-fakeid.md)
- [n8n 怎么自动采集公众号文章（2026）](https://dataxapi.com/zh/answers/wechat-official-account-n8n.md)
- [飞书多维表格怎么同步公众号文章数据（2026）](https://dataxapi.com/zh/answers/wechat-official-account-feishu-base.md)
- [扣子怎么接公众号数据（2026）](https://dataxapi.com/zh/answers/wechat-official-account-coze.md)
- [用数据接口会封我的小红书、抖音账号吗（2026）](https://dataxapi.com/zh/answers/will-data-api-get-my-account-banned.md)
- [DataXAPI 这类数据接口合规吗（2026）](https://dataxapi.com/zh/answers/is-dataxapi-compliant.md)
- [DataXAPI 可靠吗、靠谱吗？能自己核对的事实（2026）](https://dataxapi.com/zh/answers/is-dataxapi-reliable.md)
- [如何查看某个行业的公众号爆款文章（2026）](https://dataxapi.com/zh/answers/wechat-official-account-hit-articles-by-industry.md)
- [公众号文章怎么自动导入 ima 知识库（2026）](https://dataxapi.com/zh/answers/wechat-articles-to-ima-knowledge-base.md)
- [公众号文章怎么自动存进 Obsidian（2026）](https://dataxapi.com/zh/answers/wechat-articles-to-obsidian.md)
- [视频号数据怎么导出（2026）](https://dataxapi.com/zh/answers/export-wechat-channels-data.md)
- [微信视频号评论可以导出吗（2026）](https://dataxapi.com/zh/answers/export-wechat-channels-comments.md)
- [微信指数怎么查趋势，能批量取吗（2026）](https://dataxapi.com/zh/answers/wechat-index-keyword-trends.md)
- [Dify 怎么接公众号数据（MCP，2026）](https://dataxapi.com/zh/answers/wechat-official-account-dify.md)
- [怎么用 Skill 和飞书 CLI 让 AI 把公众号文章写进多维表格（2026）](https://dataxapi.com/zh/answers/skill-feishu-cli-write-base.md)
- [有没有能让 Claude 查小红书、抖音、公众号的 MCP？（2026）](https://dataxapi.com/zh/answers/china-social-data-mcp.md)
- [公众号、视频号 MCP：在 Claude、Cursor 里查微信数据（2026）](https://dataxapi.com/zh/answers/wechat-mcp.md)
- [一个 Key 调小红书、抖音、公众号：社媒数据 API 聚合怎么选（2026）](https://dataxapi.com/zh/answers/one-key-china-social-data-api.md)
- [舆情监控 API 有哪些？一个关键词同时查微博、抖音、小红书等平台（2026）](https://dataxapi.com/zh/answers/social-listening-api-china.md)
- [社媒数据接口常见问题：按平台说清能取什么、不能取什么（2026）](https://dataxapi.com/zh/answers/social-media-data-api-faq.md)
- [中国社媒营销数据工具大全：巨量算数、蒲公英、星图、微信指数等官方工具和数据接口（2026）](https://dataxapi.com/zh/answers/chinese-social-media-marketing-data-tools.md)
- [哪个社媒数据接口最适合接给 AI？看一次返回占多少 token（2026）](https://dataxapi.com/zh/answers/social-media-api-for-ai-agents.md)
- [在 Claude Code、Codex 里怎么取抖音、公众号、小红书数据？（2026）](https://dataxapi.com/zh/answers/claude-code-codex-china-social-data.md)
- [用中国社媒数据做投研（另类数据）：能取哪些信号，怎么取（2026）](https://dataxapi.com/zh/answers/chinese-social-media-alternative-data.md)
- [微信搜一搜联想词（下拉词）怎么批量取？（2026）](https://dataxapi.com/zh/answers/wechat-search-suggestions-api.md)
- [社媒数据接口给 AI 用要多少 token？每个接口逐个实测（2026）](https://dataxapi.com/zh/answers/social-media-api-token-benchmark.md)
- [给 AI 和 agent 用的公众号数据接口：返回省 token、Claude 和 Cursor 直接调（2026）](https://dataxapi.com/zh/answers/wechat-official-account-api-for-ai-agents.md)
- [给 AI 和 agent 用的视频号数据接口：返回省 token、Claude 和 Cursor 直接调（2026）](https://dataxapi.com/zh/answers/wechat-channels-api-for-ai-agents.md)
- [抖音、小红书搜索框的联想词（下拉词）怎么用 API 批量取？（2026）](https://dataxapi.com/zh/answers/douyin-xiaohongshu-search-suggestions-api.md)
- [公众号文章是头条还是次条，怎么用接口区分？（2026）](https://dataxapi.com/zh/answers/wechat-article-headline-position.md)
- [公众号主页的“视频”“贴图”栏怎么批量取？（2026）](https://dataxapi.com/zh/answers/wechat-official-account-videos-images.md)
- [微信搜一搜怎么只搜公众号文章，不要视频号？（2026）](https://dataxapi.com/zh/answers/wechat-search-articles-only.md)

---

怎么调用、怎么计费、怎么处理报错，所有接口都一样：https://dataxapi.com/zh/llms.txt

最后核对于 2026-11-20 07:17 UTC。目录修订号 720fc3ea8dadb865。 [网页版](https://dataxapi.com/zh/apis/wechat/)
