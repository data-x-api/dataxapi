# 微信视频号 API

17 个接口读微信视频号：视频、用户、合集、评论。一次 $0.0150 起。不用登录微信视频号，不用 Cookie；失败不收费。

也叫：WeChat Channels

## 微信视频号的 17 个接口，各取什么

- [微信视频号账号资料](https://dataxapi.com/zh/apis/wechat_channels/users/get.md)：按视频号账号编号取资料：名称、简介、头像、IP 属地、作品数。
- [微信视频号作品详情](https://dataxapi.com/zh/apis/wechat_channels/videos/get.md)：按作品编号、搜索结果的 export/ 编号或分享链接取一条视频号作品：文案、作者、发布时间、点赞、评论、转发、收藏数，以及视频文件地址和解密密钥。
- [微信视频号作品评论](https://dataxapi.com/zh/apis/wechat_channels/videos/comments/list.md)：按作品编号取一页视频号作品的一级评论：正文、评论者、点赞数、发布时间、IP 属地。
- [微信视频号作品分享链接](https://dataxapi.com/zh/apis/wechat_channels/videos/share_link/get.md)：按作品编号生成一条能在微信里打开的分享链接（weixin.qq.com/sph/ 开头）。同一作品每次生成的链接不同，旧链接仍然指向这个作品；链接不能用编号拼出来。
- [微信视频号账号的合集](https://dataxapi.com/zh/apis/wechat_channels/users/collections/list.md)：按视频号账号编号取这个账号公开的全部合集：名称、简介、封面、视频数、最近更新时间。合集编号可以传给取合集里视频的接口。
- [微信视频号合集里的视频](https://dataxapi.com/zh/apis/wechat_channels/collections/videos/list.md)：按合集编号取一页视频号合集里的视频，按合集自己的顺序（从最早的开始），每页 20 条：文案、作者、发布时间、点赞、评论、转发、收藏数。
- [微信视频号用户作品](https://dataxapi.com/zh/apis/wechat_channels/users/videos/list.md)：按视频号账号编号取一页它发布的视频，从新到旧：文案、发布时间、点赞、评论、转发、收藏数、视频时长。
- [微信搜一搜视频号视频搜索](https://dataxapi.com/zh/apis/wechat_channels/videos/search.md)：按搜索词在微信搜一搜里取一页视频号视频，可按相关、最新或最热排、按发布时间筛：文案、发布账号的名称和头像、发布时间、点赞和收藏数、时长、封面。搜一搜不给账号编号，作品编号是 export/ 开头的加密编号：传给 wechat_channels.videos.get 的 export_id 可换出数字编号、视频文件地址和解密密钥，会过期，要尽快用。
- [微信视频号账号资料（备用版）](https://dataxapi.com/zh/apis/wechat_channels/backup/users/get.md)：wechat_channels.users.get 的备用版：参数和返回相同，另一来源，单独计价。不给作品数。
- [微信视频号用户作品（备用版）](https://dataxapi.com/zh/apis/wechat_channels/backup/users/videos/list.md)：wechat_channels.users.videos.list 的备用版：参数和返回相同，另一来源，单独计价。
- [微信搜一搜视频号视频搜索（备用版）](https://dataxapi.com/zh/apis/wechat_channels/backup/videos/search.md)：wechat_channels.videos.search 的备用版：参数和返回相同，另一来源，单独计价。不带收藏数。
- [微信视频号账号搜索](https://dataxapi.com/zh/apis/wechat_channels/users/search.md)：按名称找视频号账号：名称要一字不差，同名的都返回。给账号编号、名称、简介、头像、是否认证和认证信息；账号编号可以传给视频号的资料、作品列表、直播回放等接口。
- [微信视频号作品互动数据](https://dataxapi.com/zh/apis/wechat_channels/videos/metrics.md)：按作品编号取视频号作品最近的数字：点赞、评论、转发、收藏，带作品文案和发布账号。数字不是调用这一刻的，可能是几个小时前的，返回里写明是什么时候取的。比取整个作品详情便宜。
- [微信视频号评论回复](https://dataxapi.com/zh/apis/wechat_channels/comments/replies/list.md)：按评论编号和作品编号取一页视频号评论下面的回复（二级评论）：正文、回复者、点赞数、发布时间、IP 属地、回复的是哪一条。一页约 10 条，可翻页。
- [微信视频号直播回放](https://dataxapi.com/zh/apis/wechat_channels/users/live_replays/list.md)：按视频号账号编号取它的直播回放，从新到旧，只给第一页（实测一页最多 48 条）：标题、开播时间、时长、封面，以及回放视频的点赞、评论、转发、收藏数（是回放这条视频的数，不是直播间的观看、在线或点赞人数）。
- [视频号视频下载（文件地址和解密）](https://dataxapi.com/zh/apis/wechat_channels/videos/media/get.md)：给一条视频号作品的编号、分享链接或搜索结果的 export/ 编号，返回视频文件地址（带宽高、大小、时长）、封面，以及解密方法和密钥：视频号的文件只有开头 131072 字节加了密，按 decrypt 给的方法解开就是能播放的 MP4。地址和密钥要用同一次返回的那一对，不用带请求头；地址失效了再调一次即可。
- [视频号视频转文字（逐字稿）](https://dataxapi.com/zh/apis/wechat_channels/videos/transcript/get.md)：给一条视频号作品的分享链接、编号或搜索结果的 export/ 编号，返回视频里说的话：全文、每一句的起止时间和现成的 SRT 字幕，连同文案、作者和时长；可以区分说话人。视频号文件的解密由我们完成，不用自己处理。每次收费，识别语音的另按视频分钟数收，没人说话不收。5 分钟以内的视频直接返回文字；超过 5 分钟、2 小时以内的先回一个凭证（job），过一会儿带着它再调这个接口取文字，按实际分钟数收，只在取到文字时收。

## 接口

### 备用版 (3)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [微信搜一搜视频号视频搜索（备用版）](https://dataxapi.com/zh/apis/wechat_channels/backup/videos/search.md) | `GET /v1/wechat_channels/backup/videos/search` | 内容列表 | $0.1 / 次 |
| [微信视频号账号资料（备用版）](https://dataxapi.com/zh/apis/wechat_channels/backup/users/get.md) | `GET /v1/wechat_channels/backup/users/get` | 账号 | $0.0300 / 次 |
| [微信视频号用户作品（备用版）](https://dataxapi.com/zh/apis/wechat_channels/backup/users/videos/list.md) | `GET /v1/wechat_channels/backup/users/videos/list` | 内容列表 | $0.0600 / 次 |

### 视频 (7)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [微信搜一搜视频号视频搜索](https://dataxapi.com/zh/apis/wechat_channels/videos/search.md) | `GET /v1/wechat_channels/videos/search` | 内容列表 | $0.0200 / 次 |
| [微信视频号作品详情](https://dataxapi.com/zh/apis/wechat_channels/videos/get.md) | `GET /v1/wechat_channels/videos/get` | 内容 | $0.0200 / 次 |
| [视频号视频下载（文件地址和解密）](https://dataxapi.com/zh/apis/wechat_channels/videos/media/get.md) | `GET /v1/wechat_channels/videos/media/get` | 视频和图片文件 | $0.0200 / 次 |
| [微信视频号作品分享链接](https://dataxapi.com/zh/apis/wechat_channels/videos/share_link/get.md) | `GET /v1/wechat_channels/videos/share_link/get` | 视频号分享链接 | $0.0200 / 次 |
| [视频号视频转文字（逐字稿）](https://dataxapi.com/zh/apis/wechat_channels/videos/transcript/get.md) | `GET /v1/wechat_channels/videos/transcript/get` | 逐字稿 | $0.0200 / 次 |
| [微信视频号作品评论](https://dataxapi.com/zh/apis/wechat_channels/videos/comments/list.md) | `GET /v1/wechat_channels/videos/comments/list` | 评论列表 | $0.0200 / 次 |
| [微信视频号作品互动数据](https://dataxapi.com/zh/apis/wechat_channels/videos/metrics.md) | `GET /v1/wechat_channels/videos/metrics` | 内容 | $0.0150 / 次 |

### 用户 (5)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [微信视频号账号搜索](https://dataxapi.com/zh/apis/wechat_channels/users/search.md) | `GET /v1/wechat_channels/users/search` | 账号列表 | $0.0600 / 次 |
| [微信视频号账号资料](https://dataxapi.com/zh/apis/wechat_channels/users/get.md) | `GET /v1/wechat_channels/users/get` | 账号 | $0.0200 / 次 |
| [微信视频号账号的合集](https://dataxapi.com/zh/apis/wechat_channels/users/collections/list.md) | `GET /v1/wechat_channels/users/collections/list` | 视频号合集列表 | $0.0200 / 次 |
| [微信视频号直播回放](https://dataxapi.com/zh/apis/wechat_channels/users/live_replays/list.md) | `GET /v1/wechat_channels/users/live_replays/list` | 内容列表 | $0.0200 / 次 |
| [微信视频号用户作品](https://dataxapi.com/zh/apis/wechat_channels/users/videos/list.md) | `GET /v1/wechat_channels/users/videos/list` | 内容列表 | $0.0200 / 次 |

### 合集 (1)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [微信视频号合集里的视频](https://dataxapi.com/zh/apis/wechat_channels/collections/videos/list.md) | `GET /v1/wechat_channels/collections/videos/list` | 内容列表 | $0.0200 / 次 |

### 评论 (1)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [微信视频号评论回复](https://dataxapi.com/zh/apis/wechat_channels/comments/replies/list.md) | `GET /v1/wechat_channels/comments/replies/list` | 评论列表 | $0.0150 / 次 |

## 调用前要知道的

- **每页条数**：列表每页 1 到 100 条，各接口不同。10 个列表里有 7 个能翻页：把 `page.next_cursor` 作为 `cursor` 传回，每一页是一次单独的调用。其余只有一页。
- **给不了的字段**：17 个接口里有 15 个填不满它返回的对象。每个接口的页面列出了给不了哪些，每次返回也在 `meta.unavailable` 里再写一遍：缺的字段不会被悄悄写成 0。
- **对象不存在时读起来像空结果**：微信视频号评论回复、微信视频号直播回放：对象不存在和对象下面没有东西分不出来，所以返回空结果而不是 404。
- **预览结构**：有 2 个接口返回的是预览结构，字段还可能调整；其余返回统一的结构，所有平台都一样。

## 调用结果不对时先看这里

- **账号编号**：视频号账号编号是 v2_ 开头、@finder 结尾的一长串，作品详情里的 `author.id` 就是它。
- **账号作品的两种取法**：作品编号是一串数字，从作品列表里取。`wechat_channels.users.videos.list` 按从新到旧列出账号的作品；按合集取，就先取账号的合集，再取合集里的视频，按合集自己的顺序，最早的在前。
- **搜索结果的编号不一样**：`wechat_channels.videos.search` 走的是微信搜一搜：作品带的是搜索结果的加密编号（export/ 开头），作品详情和评论接口不收，以后再搜也不保证不变；账号只给名称。
- **没有粉丝数和播放量**：不给粉丝数：有些账号把数隐藏了，显示的是 0。作品也不带播放量。
- **说不清，不算不存在**：编号不存在时，以及当天刚发的作品有时也一样，返回里没有数据，也不说原因。这种情况按 `upstream_failed` 返回，不扣费，可以再试一次。
- **评论者是匿名编号**：评论者用的是平台为评论区编的匿名编号，对应不到账号。

## 常见问题

### 通过 API 能拿到微信视频号的哪些数据？

17 个接口：视频、用户、合集、评论。每个接口的页面写明参数、返回字段，并附一份录制的真实返回。

### 怎么调用微信视频号 API？

注册拿一把 Key，放进请求头 `Authorization: Bearer <key>`，按接口的地址发请求，比如 `GET https://api.dataxapi.com/v1/wechat_channels/users/get`。也可以把 DataXAPI 接进 Claude、Cursor 或 ChatGPT（MCP），用一句话让 AI 去调。注册可免费试用，不用绑卡。

### 微信视频号接口的返回给 AI 用，占多少 token？

微信视频号的 15 个接口各取一份录制的真实返回，平台原始 JSON 合计 23.1 万 token，AI 通过 DataXAPI 的 MCP 读到的只有 3.5 万 token，少 85%；直接调接口拿到的 JSON 也少 82%（2026-11-06 统计）。所有平台同一套字段名，用 fields 还能只取你要的字段。

### 微信视频号 API 怎么收费？

按次收费，没有订阅。一次 $0.0150 到 $0.1，每个接口的页面写明自己的价格。拿到数据才扣费，失败不收。

### 需要微信视频号账号或 Cookie 吗？

不需要。你只拿一把 DataXAPI 的 Key：不用登录微信视频号，不用 Cookie，也不用养设备。接口只返回公开可见的数据。

### 数据是实时的吗？

每次调用都当场去微信视频号取，`meta.fetched_at` 写明取到的时间。结果保留 24 小时，带同一个 `Idempotency-Key` 重试不会再扣一次。

### 微信视频号改版了怎么办？

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

最后核对于 2026-11-26 12:17 UTC。目录修订号 0051cce45e9530b9。 [网页版](https://dataxapi.com/zh/apis/wechat_channels/)
