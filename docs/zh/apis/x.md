# X（推特）API

21 个接口读 X（推特）：帖子、用户、对话串、热榜、X 社群、X 列表。一次 $0.0003 起。不用登录 X，不用 Cookie；失败不收费。

也叫：X (Twitter)

## X 的 21 个接口，各取什么

- [X 社群帖子](https://dataxapi.com/zh/apis/x/communities/posts/list.md)：按社群编号取一页这个 X 社群里的帖子。
- [X 列表帖子](https://dataxapi.com/zh/apis/x/lists/posts/list.md)：按列表编号取一页这个 X 列表时间线上的帖子，从最新的开始，每页约 100 条。
- [X 长文详情](https://dataxapi.com/zh/apis/x/posts/article/get.md)：按帖子编号取这条 X 帖子附带的长文：标题、全文、作者、发布时间、点赞、回复和浏览数。
- [X 帖子详情](https://dataxapi.com/zh/apis/x/posts/get.md)：按帖子编号或链接取一条 X 帖子：正文、作者、发布时间、点赞、回复、转推、引用、书签和浏览数。
- [X 帖子引用列表](https://dataxapi.com/zh/apis/x/posts/quotes/list.md)：按帖子编号取一页引用它的 X 帖子，可按时间或按热门排。
- [X 帖子回复列表](https://dataxapi.com/zh/apis/x/posts/replies/list.md)：按帖子编号取一页这条 X 帖子下面的回复，按平台的相关度排；X 的回复本身是帖子，按帖子返回。
- [X 帖子转推用户](https://dataxapi.com/zh/apis/x/posts/retweeters/list.md)：按帖子编号取一页转推了这条 X 帖子的账号：账号名、显示名、简介、粉丝数。
- [X 帖子搜索](https://dataxapi.com/zh/apis/x/posts/search.md)：按搜索词找 X 帖子，可按热门或最新排；搜索词里可以用 X 自己的搜索语法，如 from:账号名。
- [X 帖子对话串](https://dataxapi.com/zh/apis/x/threads/posts/list.md)：按对话串里任意一条帖子的编号，取这条对话串的帖子：主帖、作者的续帖和其中的回复。
- [X 趋势榜](https://dataxapi.com/zh/apis/x/trends/list.md)：取 X 当前的趋势榜前 30 条，带名次；可以取全球的，也可以取某个国家的。
- [X 用户粉丝列表](https://dataxapi.com/zh/apis/x/users/followers/list.md)：按账号名取一页关注该 X 用户的账号，每页最多 200 个，从最新关注的开始。
- [X 用户关注列表](https://dataxapi.com/zh/apis/x/users/following/list.md)：按账号名取一页该 X 用户关注的账号，每页最多 200 个。
- [X 用户资料](https://dataxapi.com/zh/apis/x/users/get.md)：按账号名或编号取 X 用户资料：显示名、简介、粉丝数、关注数、是否有认证标和是哪种（企业金标、政府灰标）、自填的地点、网站；可一次传最多 100 个编号。
- [X 用户提及](https://dataxapi.com/zh/apis/x/users/mentions/list.md)：按账号名取一页提及该 X 用户的帖子，从最新的开始。
- [X 用户帖子列表](https://dataxapi.com/zh/apis/x/users/posts/list.md)：按账号名取一页该 X 用户主页上的帖子，从最新的开始；用 tab 选帖子、回复或媒体分栏。帖子分栏里有这个账号的转推，ext.is_retweet 标出来，并给原帖编号和原帖作者编号。
- [X 用户搜索](https://dataxapi.com/zh/apis/x/users/search.md)：按搜索词找 X 账号，每页约 20 个：账号名、显示名、简介、粉丝数、是否认证。
- [X 社群资料](https://dataxapi.com/zh/apis/x/communities/get.md)：按社群编号取 X 社群的资料：名称、简介、成员数、管理员人数、加入方式、创建时间。
- [X 社群成员](https://dataxapi.com/zh/apis/x/communities/members/list.md)：按社群编号取一页加入了这个 X 社群的账号，每页约 20 个：账号名、显示名、简介、粉丝数、是否认证。
- [X 列表关注者](https://dataxapi.com/zh/apis/x/lists/followers/list.md)：按列表编号取关注了这个 X 列表的账号，最多 20 个：账号名、显示名、简介、粉丝数、是否认证。只有这一页，不能往后翻。
- [X 列表成员](https://dataxapi.com/zh/apis/x/lists/members/list.md)：按列表编号取一页这个 X 列表收录的账号，每页 20 个：账号名、显示名、简介、粉丝数、是否认证。
- [X 视频字幕](https://dataxapi.com/zh/apis/x/posts/transcript/get.md)：按帖子编号或链接取 X 帖子里的视频说的话，全文；只支持两分钟以内的视频。

## 接口

### 帖子 (7)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [X 帖子搜索](https://dataxapi.com/zh/apis/x/posts/search.md) | `GET /v1/x/posts/search` | 内容列表 | $0.0020 / 次 |
| [X 长文详情](https://dataxapi.com/zh/apis/x/posts/article/get.md) | `GET /v1/x/posts/article/get` | 内容 | $0.0020 / 次 |
| [X 帖子详情](https://dataxapi.com/zh/apis/x/posts/get.md) | `GET /v1/x/posts/get` | 内容 | $0.0003 / 次 |
| [X 视频字幕](https://dataxapi.com/zh/apis/x/posts/transcript/get.md) | `GET /v1/x/posts/transcript/get` | 逐字稿 | $0.0020 / 次 |
| [X 帖子引用列表](https://dataxapi.com/zh/apis/x/posts/quotes/list.md) | `GET /v1/x/posts/quotes/list` | 内容列表 | $0.0003 / 条 |
| [X 帖子回复列表](https://dataxapi.com/zh/apis/x/posts/replies/list.md) | `GET /v1/x/posts/replies/list` | 内容列表 | $0.0020 / 次 |
| [X 帖子转推用户](https://dataxapi.com/zh/apis/x/posts/retweeters/list.md) | `GET /v1/x/posts/retweeters/list` | 账号列表 | $0.0020 / 次 |

### 用户 (6)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [X 用户搜索](https://dataxapi.com/zh/apis/x/users/search.md) | `GET /v1/x/users/search` | 账号列表 | $0.0004 / 条 |
| [X 用户资料](https://dataxapi.com/zh/apis/x/users/get.md) | `GET /v1/x/users/get` | 账号 | $0.0004 / 条 |
| [X 用户粉丝列表](https://dataxapi.com/zh/apis/x/users/followers/list.md) | `GET /v1/x/users/followers/list` | 账号列表 | $0.0001 / 条 |
| [X 用户关注列表](https://dataxapi.com/zh/apis/x/users/following/list.md) | `GET /v1/x/users/following/list` | 账号列表 | $0.0001 / 条 |
| [X 用户提及](https://dataxapi.com/zh/apis/x/users/mentions/list.md) | `GET /v1/x/users/mentions/list` | 内容列表 | $0.0003 / 条 |
| [X 用户帖子列表](https://dataxapi.com/zh/apis/x/users/posts/list.md) | `GET /v1/x/users/posts/list` | 内容列表 | $0.0020 / 次 |

### 对话串 (1)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [X 帖子对话串](https://dataxapi.com/zh/apis/x/threads/posts/list.md) | `GET /v1/x/threads/posts/list` | 内容列表 | $0.0003 / 条 |

### 热榜 (1)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [X 趋势榜](https://dataxapi.com/zh/apis/x/trends/list.md) | `GET /v1/x/trends/list` | 热点列表 | $0.0090 / 次 |

### [X 社群](https://dataxapi.com/zh/apis/x/communities.md) (3)

X 的社群（Communities）：社群资料、社群里的帖子和成员。

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [X 社群资料](https://dataxapi.com/zh/apis/x/communities/get.md) | `GET /v1/x/communities/get` | 社区 | $0.0004 / 次 |
| [X 社群成员](https://dataxapi.com/zh/apis/x/communities/members/list.md) | `GET /v1/x/communities/members/list` | 账号列表 | $0.0004 / 条 |
| [X 社群帖子](https://dataxapi.com/zh/apis/x/communities/posts/list.md) | `GET /v1/x/communities/posts/list` | 内容列表 | $0.0003 / 条 |

### [X 列表](https://dataxapi.com/zh/apis/x/lists.md) (3)

X 的列表（Lists）：列表里的帖子、成员和关注者。

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [X 列表关注者](https://dataxapi.com/zh/apis/x/lists/followers/list.md) | `GET /v1/x/lists/followers/list` | 账号列表 | $0.0004 / 条 |
| [X 列表成员](https://dataxapi.com/zh/apis/x/lists/members/list.md) | `GET /v1/x/lists/members/list` | 账号列表 | $0.0004 / 条 |
| [X 列表帖子](https://dataxapi.com/zh/apis/x/lists/posts/list.md) | `GET /v1/x/lists/posts/list` | 内容列表 | $0.0020 / 次 |

## 调用前要知道的

- **每页条数**：列表每页 20 到 200 条，各接口不同。16 个列表里有 14 个能翻页：把 `page.next_cursor` 作为 `cursor` 传回，每一页是一次单独的调用。其余只有一页。
- **给不了的字段**：21 个接口里有 16 个填不满它返回的对象。每个接口的页面列出了给不了哪些，每次返回也在 `meta.unavailable` 里再写一遍：缺的字段不会被悄悄写成 0。
- **对象不存在时读起来像空结果**：X 社群帖子、X 列表帖子、X 帖子引用列表、X 帖子回复列表、X 帖子转推用户、X 帖子对话串、X 用户粉丝列表、X 用户关注列表、X 用户提及、X 用户帖子列表、X 社群成员、X 列表关注者、X 列表成员：对象不存在和对象下面没有东西分不出来，所以返回空结果而不是 404。
- **一次取多个**：用 `ids` 一次请求可以取多个：X 用户资料（最多 100 个）。
- **预览结构**：有 1 个接口返回的是预览结构，字段还可能调整；其余返回统一的结构，所有平台都一样。
- **快照**：X 趋势榜：榜单是每 5 分钟刷新一次的快照，`meta.fetched_at` 写明是什么时候取的。

## 调用结果不对时先看这里

- **账号名还是编号**：粉丝、关注、提及和用户帖子用 `username`，就是不带 @ 的账号名；用户资料可以用账号名、编号，或者一次最多 100 个 `ids`。
- **账号或帖子不存在时**：粉丝、关注、提及、引用、转推这几个，对象不存在时返回空列表。用户帖子、帖子回复、列表帖子则返回 `upstream_failed`，不扣费，可以再试一次。
- **几个数各是什么**：`metrics.comments` 是回复数，`metrics.favorites` 是书签数，`metrics.reposts` 是转推数；引用另算，在 `ext.quotes`。
- **列表关注者只有一页**：`x.lists.followers.list` 最多返回 20 个账号，没有下一页。
- **视频转文字限两分钟**：超过两分钟的视频按参数不合法拒绝；没人说话的视频、没有视频的帖子、不存在的帖子，都按不存在返回。两种都不扣费。

## 常见问题

### 通过 API 能拿到 X 的哪些数据？

21 个接口：帖子、用户、对话串、热榜、X 社群、X 列表。每个接口的页面写明参数、返回字段，并附一份录制的真实返回。

### 怎么调用 X（推特）API？

注册拿一把 Key，放进请求头 `Authorization: Bearer <key>`，按接口的地址发请求，比如 `GET https://api.dataxapi.com/v1/x/communities/posts/list`。也可以把 DataXAPI 接进 Claude、Cursor 或 ChatGPT（MCP），用一句话让 AI 去调。注册可免费试用，不用绑卡。

### X 接口的返回给 AI 用，占多少 token？

X 的 21 个接口各取一份录制的真实返回，平台原始 JSON 合计 24.7 万 token，AI 通过 DataXAPI 的 MCP 读到的只有 6 万 token，少 76%；直接调接口拿到的 JSON 也少 61%（2026-11-06 统计）。所有平台同一套字段名，用 fields 还能只取你要的字段。

### X（推特）API 怎么收费？

按次收费，没有订阅。一次 $0.0003 到 $0.0400，每个接口的页面写明自己的价格。有 11 个接口按返回的条数计费，每次有最低和最高。拿到数据才扣费，失败不收。

### 需要 X 账号或 Cookie 吗？

不需要。你只拿一把 DataXAPI 的 Key：不用登录 X，不用 Cookie，也不用养设备。接口只返回公开可见的数据。

### 数据是实时的吗？

每次调用都当场去 X 取，`meta.fetched_at` 写明取到的时间。X 趋势榜：榜单是每 5 分钟刷新一次的快照。结果保留 24 小时，带同一个 `Idempotency-Key` 重试不会再扣一次。

### X 改版了怎么办？

调用失败不管什么原因都不扣费。被暂停的接口返回 `capability_paused`，同样不扣费；`GET /v1/catalog/status` 写着现在哪些能用。

## 怎么做和常见问题

- [如何按关键词搜索 X（推特）帖子](https://dataxapi.com/zh/guides/x-search-posts-by-keyword.md)
- [如何获取 X（推特）各国热门话题](https://dataxapi.com/zh/guides/x-trends-by-country.md)
- [如何批量获取一条推文的回复](https://dataxapi.com/zh/guides/x-post-replies.md)
- [怎么查某个国家的 X 热搜？](https://dataxapi.com/zh/answers/how-to-get-x-trends-for-a-country.md)
- [盯推特账号，X 官方 API 太贵怎么办（2026）](https://dataxapi.com/zh/answers/watch-x-accounts-official-api-too-expensive.md)
- [给 AI 和 agent 用的X（推特）数据接口：返回省 token、Claude 和 Cursor 直接调（2026）](https://dataxapi.com/zh/answers/x-twitter-api-for-ai-agents.md)
- [怎么只取一个 X（推特）账号自己发的帖子，不要转推？（2026）](https://dataxapi.com/zh/answers/x-own-posts-without-retweets.md)

---

怎么调用、怎么计费、怎么处理报错，所有接口都一样：https://dataxapi.com/zh/llms.txt

最后核对于 2026-11-20 07:17 UTC。目录修订号 720fc3ea8dadb865。 [网页版](https://dataxapi.com/zh/apis/x/)
