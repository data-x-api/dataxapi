# 微博 API

11 个接口读微博：帖子、用户、评论、热榜。一次 $0.0020 起。不用登录微博，不用 Cookie；失败不收费。

也叫：Weibo、新浪微博

## 微博的 11 个接口，各取什么

- [微博评论回复](https://dataxapi.com/zh/apis/weibo/comments/replies/list.md)：按评论编号取一页回复：正文、回复者、点赞数、回复的是哪一条、发布时间、IP 属地。
- [微博评论](https://dataxapi.com/zh/apis/weibo/posts/comments/list.md)：按微博编号取一页评论：正文、评论者、点赞数、回复数、发布时间、IP 属地。
- [微博详情](https://dataxapi.com/zh/apis/weibo/posts/get.md)：按微博编号取一条微博：全文（长微博也是全文）、作者、点赞、评论、转发、阅读数（视频微博是播放数）、图片、话题、IP 属地。
- [微博点赞用户](https://dataxapi.com/zh/apis/weibo/posts/likers/list.md)：按微博编号取最近给这条微博点赞的账号，一次约 50 个：昵称、简介、头像、是否认证和认证类型、粉丝数、关注数、微博数，资料里填的性别和地区。
- [微博实时搜索](https://dataxapi.com/zh/apis/weibo/posts/search.md)：按搜索词取一页微博，新发的在前：正文（长微博在这里是截短的）、作者和粉丝数、点赞、评论、转发数、视频播放数、图片、话题。
- [微博热搜榜](https://dataxapi.com/zh/apis/weibo/trends/list.md)：取微博当前的热搜榜，50 个词，带名次、热度和标签（新、热等）。
- [微博用户粉丝列表](https://dataxapi.com/zh/apis/weibo/users/followers/list.md)：按用户编号取一页关注该微博用户的账号，每页 20 个：昵称、简介、头像、是否认证和认证类型、粉丝数、关注数、微博数、注册时间，资料里填的性别和地区。
- [微博用户资料](https://dataxapi.com/zh/apis/weibo/users/get.md)：按用户编号取微博用户资料：昵称、简介、头像、是否认证和认证说明、粉丝数、关注数、微博数，主页上的转评赞总数、获赞总数，性别和地区。
- [微博用户微博](https://dataxapi.com/zh/apis/weibo/users/posts/list.md)：按用户编号取一页该用户主页上的微博（原创和转发），新的在前：正文（长微博在这里是截短的）、点赞、评论、转发数、视频播放数、图片、话题、IP 属地、是否置顶。
- [微博用户搜索](https://dataxapi.com/zh/apis/weibo/users/search.md)：按搜索词取一页微博用户：编号、昵称、头像、主页链接。
- [微博热搜榜（备用版）](https://dataxapi.com/zh/apis/weibo/backup/trends/list.md)：微博热搜榜的备用版，原接口取不到时改调：参数和返回相同，价格更高。

## 接口

### 备用版 (1)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [微博热搜榜（备用版）](https://dataxapi.com/zh/apis/weibo/backup/trends/list.md) | `GET /v1/weibo/backup/trends/list` | 热点列表 | $0.0300 / 次 |

### 帖子 (4)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [微博实时搜索](https://dataxapi.com/zh/apis/weibo/posts/search.md) | `GET /v1/weibo/posts/search` | 内容列表 | $0.0020 / 次 |
| [微博详情](https://dataxapi.com/zh/apis/weibo/posts/get.md) | `GET /v1/weibo/posts/get` | 内容 | $0.0020 / 次 |
| [微博评论](https://dataxapi.com/zh/apis/weibo/posts/comments/list.md) | `GET /v1/weibo/posts/comments/list` | 评论列表 | $0.0020 / 次 |
| [微博点赞用户](https://dataxapi.com/zh/apis/weibo/posts/likers/list.md) | `GET /v1/weibo/posts/likers/list` | 账号列表 | $0.0020 / 次 |

### 用户 (4)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [微博用户搜索](https://dataxapi.com/zh/apis/weibo/users/search.md) | `GET /v1/weibo/users/search` | 账号列表 | $0.0020 / 次 |
| [微博用户资料](https://dataxapi.com/zh/apis/weibo/users/get.md) | `GET /v1/weibo/users/get` | 账号 | $0.0020 / 次 |
| [微博用户粉丝列表](https://dataxapi.com/zh/apis/weibo/users/followers/list.md) | `GET /v1/weibo/users/followers/list` | 账号列表 | $0.0020 / 次 |
| [微博用户微博](https://dataxapi.com/zh/apis/weibo/users/posts/list.md) | `GET /v1/weibo/users/posts/list` | 内容列表 | $0.0020 / 次 |

### 评论 (1)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [微博评论回复](https://dataxapi.com/zh/apis/weibo/comments/replies/list.md) | `GET /v1/weibo/comments/replies/list` | 评论列表 | $0.0020 / 次 |

### 热榜 (1)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [微博热搜榜](https://dataxapi.com/zh/apis/weibo/trends/list.md) | `GET /v1/weibo/trends/list` | 热点列表 | $0.0020 / 次 |

## 调用前要知道的

- **每页条数**：列表每页 10 到 100 条，各接口不同。9 个列表里有 6 个能翻页：把 `page.next_cursor` 作为 `cursor` 传回，每一页是一次单独的调用。其余只有一页。
- **给不了的字段**：11 个接口里有 11 个填不满它返回的对象。每个接口的页面列出了给不了哪些，每次返回也在 `meta.unavailable` 里再写一遍：缺的字段不会被悄悄写成 0。
- **快照**：微博热搜榜、微博热搜榜（备用版）：榜单是每 10 分钟刷新一次的快照，`meta.fetched_at` 写明是什么时候取的。

## 调用结果不对时先看这里

- **用户编号 uid**：用户用主页链接 weibo.com/u/ 后面那串数字。
- **列表里长微博会被截断**：搜索结果和用户微博列表里，长微博只有前一截；全文用微博详情取。
- **点赞用户只有最近一批**：`weibo.posts.likers.list` 只返回最近点赞的五十个左右，没有下一页。
- **广告会被去掉**：搜索结果去掉了混在里面的广告微博；热搜榜去掉了广告位和置顶在榜单上面的那条。
- **阅读数和粉丝数**：阅读数只有显示阅读数的微博才有，而且只在微博详情里；原创的视频微博给的是播放数；其余是 null。用户搜索不带粉丝数，要看用户资料。

## 常见问题

### 微博有官方 API 吗？

有。微博开放平台列出的读取接口围绕授权用户：statuses/user_timeline 返回授权用户发的微博，comments/show 注明只返回授权用户的评论。话题搜索（2/search/topics）标为要授权的高级接口，已不在主列表里。未审核的应用只能授权 15 个测试账号，超出标准限额要走商业接口。

### 通过 API 能拿到微博的哪些数据？

11 个接口：帖子、用户、评论、热榜。每个接口的页面写明参数、返回字段，并附一份录制的真实返回。

### 怎么调用微博 API？

注册拿一把 Key，放进请求头 `Authorization: Bearer <key>`，按接口的地址发请求，比如 `GET https://api.dataxapi.com/v1/weibo/comments/replies/list`。也可以把 DataXAPI 接进 Claude、Cursor 或 ChatGPT（MCP），用一句话让 AI 去调。注册可免费试用，不用绑卡。

### 微博接口的返回给 AI 用，占多少 token？

微博的 11 个接口各取一份录制的真实返回，平台原始 JSON 合计 55.1 万 token，AI 通过 DataXAPI 的 MCP 读到的只有 1.7 万 token，少 97%；直接调接口拿到的 JSON 也少 94%（2026-11-06 统计）。所有平台同一套字段名，用 fields 还能只取你要的字段。

### 微博 API 怎么收费？

按次收费，没有订阅。一次 $0.0020 到 $0.0300，每个接口的页面写明自己的价格。拿到数据才扣费，失败不收。

### 需要微博账号或 Cookie 吗？

不需要。你只拿一把 DataXAPI 的 Key：不用登录微博，不用 Cookie，也不用养设备。接口只返回公开可见的数据。

### 数据是实时的吗？

每次调用都当场去微博取，`meta.fetched_at` 写明取到的时间。微博热搜榜、微博热搜榜（备用版）：榜单是每 10 分钟刷新一次的快照。结果保留 24 小时，带同一个 `Idempotency-Key` 重试不会再扣一次。

### 微博改版了怎么办？

调用失败不管什么原因都不扣费。被暂停的接口返回 `capability_paused`，同样不扣费；`GET /v1/catalog/status` 写着现在哪些能用。

## 怎么做和常见问题

- [微博有 API 吗？用 Python 搜微博、取评论（2026）](https://dataxapi.com/zh/guides/weibo-api-python.md)
- [微博爬虫被封之后怎么办（2026）](https://dataxapi.com/zh/answers/weibo-scraper-blocked.md)
- [怎么让 AI 读知乎、B 站、微博（2026）](https://dataxapi.com/zh/answers/ai-read-zhihu-bilibili-weibo.md)
- [微博 432 错误是什么意思（2026）](https://dataxapi.com/zh/answers/weibo-432-client-error.md)
- [微博数据接口哪里有？帖子、评论、热搜怎么取（2026）](https://dataxapi.com/zh/answers/weibo-data-apis.md)
- [有没有能让 Claude 查小红书、抖音、公众号的 MCP？（2026）](https://dataxapi.com/zh/answers/china-social-data-mcp.md)
- [微博 MCP：在 Claude、Cursor 里查微博和热搜（2026）](https://dataxapi.com/zh/answers/weibo-mcp.md)
- [一个 Key 调小红书、抖音、公众号：社媒数据 API 聚合怎么选（2026）](https://dataxapi.com/zh/answers/one-key-china-social-data-api.md)
- [中文社媒品牌监测怎么做？微博、抖音、小红书一起查（2026）](https://dataxapi.com/zh/answers/chinese-social-media-brand-monitoring.md)
- [热榜 API：抖音热搜、微博热搜、知乎热榜、B站热门怎么用程序取（2026）](https://dataxapi.com/zh/answers/china-trending-api.md)
- [舆情监控 API 有哪些？一个关键词同时查微博、抖音、小红书等平台（2026）](https://dataxapi.com/zh/answers/social-listening-api-china.md)
- [微博 mid、uid、bid 是什么？怎么从链接里拿（2026）](https://dataxapi.com/zh/answers/weibo-mid-uid-bid.md)
- [社媒数据接口常见问题：按平台说清能取什么、不能取什么（2026）](https://dataxapi.com/zh/answers/social-media-data-api-faq.md)
- [中国社媒营销数据工具大全：巨量算数、蒲公英、星图、微信指数等官方工具和数据接口（2026）](https://dataxapi.com/zh/answers/chinese-social-media-marketing-data-tools.md)
- [哪个社媒数据接口最适合接给 AI？看一次返回占多少 token（2026）](https://dataxapi.com/zh/answers/social-media-api-for-ai-agents.md)
- [社媒接口返回太长，AI 上下文被塞满、token 烧得快怎么办？](https://dataxapi.com/zh/answers/api-response-too-many-tokens.md)
- [写论文要采集微博评论、小红书笔记，不会写代码怎么办？（2026）](https://dataxapi.com/zh/answers/social-media-data-for-thesis-research.md)
- [用中国社媒数据做投研（另类数据）：能取哪些信号，怎么取（2026）](https://dataxapi.com/zh/answers/chinese-social-media-alternative-data.md)
- [社媒数据接口给 AI 用要多少 token？每个接口逐个实测（2026）](https://dataxapi.com/zh/answers/social-media-api-token-benchmark.md)
- [给 AI 和 agent 用的微博数据接口：返回省 token、Claude 和 Cursor 直接调（2026）](https://dataxapi.com/zh/answers/weibo-api-for-ai-agents.md)
- [微博视频的播放量怎么用 API 取？（2026）](https://dataxapi.com/zh/answers/weibo-video-play-count.md)

---

怎么调用、怎么计费、怎么处理报错，所有接口都一样：https://dataxapi.com/zh/llms.txt

最后核对于 2026-11-20 07:17 UTC。目录修订号 720fc3ea8dadb865。 [网页版](https://dataxapi.com/zh/apis/weibo/)
