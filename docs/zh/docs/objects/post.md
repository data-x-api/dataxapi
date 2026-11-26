# Post（内容）对象

19 个平台的 92 个接口都返回 Post（内容）对象，28 个字段名完全一样，给一个平台写的代码不用改就能读其他平台。每次调用 $0.0003 到 $0.1。

给机器读：[post schema](https://dataxapi.com/openapi.json#/components/schemas/post)、[openapi.json](https://dataxapi.com/openapi.json)、[对象表（JSON）](https://api.dataxapi.com/v1/catalog/objects)、[llms.txt](https://dataxapi.com/zh/llms.txt)

内容（Post）是平台上发布的一条东西：一条视频、一篇笔记、一条推文、一篇文章、频道里的一条消息。各平台的内容用同一套字段返回，`text`、`author`、`published_at` 和 `metrics` 里的点赞数，在抖音和 YouTube 上都是同一个位置。

`author` 是发这条内容的账号，带 `id` 和 `username`；它下面的评论用 `post_id` 指回它，视频的逐字稿也是。X 上的回复本身就是一条内容，`post_id`、`parent_id`、`root_id` 写明它挂在哪个回复串里。

## 字段

平台给不了的字段不会出现在这条数据里，而是写在 `meta.unavailable` 里。不会用猜的数或 0 顶上。

| 字段 | 类型 | 起始档位 | 说明 |
| --- | --- | --- | --- |
| `id` | 文本 | `compact` | 编号，可原样传给取详情的接口 |
| `url` | 链接 | `compact` | 能直接打开的链接 |
| `type` | 文本 | `compact` | 内容形态：`video`、`image`、`text`、`article` |
| `title` | 文本 | `compact` | 标题 |
| `text` | 文本 | `compact` | 正文 |
| `lang` | 文本 | `standard` | 正文的语言 |
| `published_at` | 时间 | `compact` | 发布时间 |
| `author` | 对象 | `compact` | 作者 |
| `author.id` | 文本 | `compact` | 作者的账号编号 |
| `author.username` | 文本 | `compact` | 作者的账号名 |
| `author.name` | 文本 | `compact` | 作者的显示名 |
| `author.avatar_url` | 链接 | `standard` | 作者头像 |
| `author.verified` | 是否 | `standard` | 作者是否认证 |
| `author.followers` | 整数 | `standard` | 作者的粉丝数 |
| `metrics` | 对象 | `compact` | 互动数 |
| `metrics.likes` | 整数 | `compact` | 点赞数 |
| `metrics.comments` | 整数 | `compact` | 评论数 |
| `metrics.shares` | 整数 | `compact` | 分享数 |
| `metrics.favorites` | 整数 | `compact` | 收藏数 |
| `metrics.views` | 整数 | `compact` | 播放或阅读数 |
| `metrics.reposts` | 整数 | `compact` | 转发数 |
| `images` | 链接列表 | `standard` | 图片地址 |
| `hashtags` | 文本列表 | `standard` | 话题标签，不带 # |
| `mentions` | 对象列表 | `standard` | 正文里提及的账号 |
| `mentions[].id` | 文本 | `standard` | 账号编号 |
| `mentions[].username` | 文本 | `standard` | 账号名 |
| `mentions[].name` | 文本 | `standard` | 显示名 |
| `is_pinned` | 是否 | `standard` | 是否被作者置顶 |
| `post_id` | 文本 | `compact` | 它回复的那条内容所在的主帖编号；不是回复则为 null |
| `parent_id` | 文本 | `compact` | 它直接回复的那一条的编号；不是回复则为 null |
| `root_id` | 文本 | `compact` | 所在回复串里第一层那一条的编号 |

## 每个数取的是平台上的哪个数

同一个字段名，在不同平台上对应的动作不完全一样。这张表写明这个字段取的是平台自己的哪个数。

| 字段 | 在那里是什么 | 平台 |
| --- | --- | --- |
| `id` | 频道账号名加消息序号，如 telegram/401，可原样传给取单条消息的接口 | Telegram |
| `id` | 搜一搜给这条视频的加密编号（export/ 开头），原样照给：不是视频号作品详情、评论接口要的数字编号，同一条视频在以后的搜索里不保证还是这个编号 | 微信视频号 |
| `id` | 文章：由文章长链接里的 __biz、mid、idx 拼成，和公众号文章列表给的相同，取文章要用 url；视频：搜一搜给这条视频的加密编号（export/ 开头），原样照给，不是视频号作品详情要的数字编号，同一条视频在以后的搜索里不保证还是这个编号 | 微信搜一搜 |
| `id` | 由文章长链接里的 __biz、mid、idx 拼成；取文章要用 url，不能用它 | 微信公众号 |
| `id` | 由所给长链接里的 __biz、mid、idx 拼成 | 微信公众号 |
| `url` | 作者主页上打开这条视频的链接 | 抖音 |
| `url` | 文章的链接；视频号视频没有网页链接，为 null | 微信搜一搜 |
| `type` | 附带视频的帖子是 video，只有图片的是 image，其余是 text | YouTube |
| `title` | 搜索结果卡片上的标题，不带表情符号 | 小红书 |
| `title` | 文章的标题，去掉了关键词高亮；视频没有单独的标题，为 null | 微信搜一搜 |
| `text` | 搜索结果卡片上的正文摘录，不是全文；完整正文用笔记详情取 | 小红书 |
| `text` | 正文的前 100 个字；完整正文用笔记详情取 | 小红书 |
| `text` | 视频简介 | YouTube |
| `text` | 视频的文案，去掉了关键词高亮 | 微信视频号 |
| `text` | 文章的摘要（不是全文）或视频的文案，去掉了关键词高亮 | 微信搜一搜 |
| `text` | 文章的摘要，不是全文 | 微信公众号 |
| `text` | 图钉的描述 | Pinterest |
| `published_at` | 平台只给发布的日期（中国时间的自然日），写成这一天的 UTC 零点，不是发布的时刻 | 抖音 |
| `author.username` | 消息所在频道的账号名 | Telegram |
| `author.name` | 发布账号的名称；搜一搜不给账号编号 | 微信视频号 |
| `author.name` | 公众号或视频号的名称；搜一搜不给账号编号 | 微信搜一搜 |
| `author.avatar_url` | 视频号的头像；文章的结果不带头像，为 null | 微信搜一搜 |
| `author.verified` | 有没有认证标，任何颜色都算：蓝标（付费订阅）、金标（企业）、灰标（政府和官方机构）都是 true，不能当成付费订阅的标志 | X（推特） |
| `author.verified` | 发布者是否有平台的认证标记；没有时为 null | Pinterest |
| `author.followers` | 作者的关注者数 | LinkedIn |
| `metrics.likes` | 全部心情（赞、大爱、哈哈等）的总数 | Facebook |
| `metrics.likes` | 全部心情（赞、庆祝、支持等）的总数 | LinkedIn |
| `metrics.likes` | 点赞数；一千以上平台只显示约数 | YouTube |
| `metrics.likes` | 卡片上显示的点赞数；“1.4万”这类是约数，“10万+”是下限；卡片没显示数时为 null | 微信视频号 |
| `metrics.likes` | 视频卡片上显示的点赞数，“1.4万”这类是约数，“10万+”是下限，没显示数时为 null；文章的结果不带点赞数，为 null（有的文章卡片显示阅读数档位，见 ext.reads_label） | 微信搜一搜 |
| `metrics.likes` | 赞同数 | 知乎 |
| `metrics.likes` | 全部心情（赞等）的总数 | Pinterest |
| `metrics.comments` | 回复数 | X（推特） |
| `metrics.comments` | 直接回复数 | Threads |
| `metrics.comments` | 同一内容（含别人转存的副本）下的评论总数 | Pinterest |
| `metrics.shares` | 分享（发送给别人）的次数 | Threads |
| `metrics.favorites` | 书签数 | X（推特） |
| `metrics.favorites` | 卡片上显示的另一个数，和视频号作品列表的收藏数是同一个数；约数、下限和 null 同点赞数 | 微信视频号 |
| `metrics.favorites` | 收藏数；10 万以上时平台只给“10万+”，这里是下限 | 微信视频号 |
| `metrics.favorites` | 视频卡片上显示的另一个数，和视频号作品列表的收藏数是同一个数，约数、下限和 null 同点赞数；文章为 null | 微信搜一搜 |
| `metrics.favorites` | 这一个图钉被转存的次数；同一内容的保存总数在 ext.saves | Pinterest |
| `metrics.views` | 播放数；按热门排就是按它排。搜索结果里的播放数可能滞后，比视频详情的小 | B站 |
| `metrics.views` | 浏览数；一千以上平台只显示约数 | Telegram |
| `metrics.views` | 视频的播放数；不是视频的帖子为 null | Facebook |
| `metrics.views` | 阅读数；原创的视频微博给的是播放（观看）次数。不显示阅读数的微博、转发视频的微博为 null | 微博 |
| `metrics.views` | 视频微博的播放（观看）次数；其他微博为 null，阅读数只有微博详情给；转发视频的微博也为 null（那个数是原视频的） | 微博 |
| `metrics.views` | 阅读数；超过 10 万时平台只给“10万+”，这里是下限 | 微信公众号 |
| `metrics.reposts` | 转推数；引用另计，在 ext.quotes | X（推特） |
| `metrics.reposts` | 转发数；引用另计，在 ext.quotes | Threads |
| `metrics.reposts` | 转发数 | 微博、知乎 |
| `images` | 搜到的那一张图片，原图地址，会过期；笔记的其余图片用笔记详情取 | 小红书 |
| `images` | 视频封面 | YouTube |
| `images` | 图钉的原图 | Pinterest |
| `hashtags` | 视频页下方的标签 | B站 |
| `hashtags` | 帖子的话题标签，一条帖子最多一个 | Threads |
| `post_id` | 所在对话的主帖编号 | X（推特） |
| `ext.video_url` | 视频号的视频文件是加密的：只有开头 131072 字节加了密。用 ext.decode_key 作种子跑 ISAAC64 随机数，每个 64 位数按大端拆成 8 个字节，得到 131072 字节的密钥流，和文件开头逐字节异或，其余部分不动，就是能播放的 MP4。地址和密钥每次返回都不同，要用同一次返回的那一对 | 微信视频号 |

## 哪些平台给不了哪些字段

一个平台的所有接口都给不了某个字段时，它才列在那个字段后面。

| 字段 | 给不了的平台 |
| --- | --- |
| `url` | 微信视频号 |
| `type` | LinkedIn |
| `title` | 快手、Telegram、Facebook、LinkedIn、Threads、Instagram、TikTok、微博、微信视频号 |
| `lang` | B站、快手、Telegram、Facebook、LinkedIn、Instagram、微博、YouTube、微信视频号、微信搜一搜、微信公众号、知乎、Pinterest |
| `author.id` | Telegram、LinkedIn、微信搜一搜 |
| `author.username` | B站、微博、微信视频号、微信搜一搜 |
| `author.name` | Reddit |
| `author.avatar_url` | Telegram |
| `author.verified` | 抖音、Telegram、LinkedIn、TikTok、小红书、YouTube、微信视频号、微信搜一搜、微信公众号、Reddit、知乎 |
| `author.followers` | 快手、Telegram、Facebook、Threads、Instagram、YouTube、微信视频号、微信搜一搜、微信公众号、Reddit |
| `metrics.likes` | Telegram、Reddit |
| `metrics.comments` | Telegram、微信搜一搜 |
| `metrics.shares` | Telegram、X（推特）、LinkedIn、Instagram、微博、YouTube、微信搜一搜、知乎 |
| `metrics.favorites` | Telegram、Facebook、LinkedIn、Threads、Instagram、微博、YouTube、Reddit |
| `metrics.views` | LinkedIn、微信视频号、微信搜一搜、Reddit、Pinterest |
| `metrics.reposts` | 抖音、B站、快手、Telegram、Facebook、LinkedIn、Instagram、TikTok、小红书、YouTube、微信视频号、微信搜一搜、微信公众号、Reddit、Pinterest |
| `images` | B站、快手、TikTok、微信视频号、微信搜一搜、微信公众号 |
| `hashtags` | 快手、Telegram、Facebook、LinkedIn、Instagram、YouTube、微信视频号、微信搜一搜、微信公众号、Reddit、Pinterest |
| `mentions[].id` | 抖音、B站、快手、Telegram、Facebook、LinkedIn、Threads、Instagram、微博、YouTube、微信视频号、微信搜一搜、微信公众号、Reddit、知乎、Pinterest |
| `mentions[].username` | 抖音、B站、快手、Telegram、Facebook、LinkedIn、Threads、Instagram、TikTok、微博、小红书、YouTube、微信视频号、微信搜一搜、微信公众号、Reddit、知乎、Pinterest |
| `mentions[].name` | 抖音、B站、快手、Telegram、Facebook、LinkedIn、Threads、Instagram、TikTok、微博、YouTube、微信视频号、微信搜一搜、微信公众号、Reddit、知乎、Pinterest |
| `is_pinned` | B站、快手、Telegram、X（推特）、Facebook、LinkedIn、Instagram、YouTube、微信视频号、微信搜一搜、微信公众号、Pinterest |
| `post_id` | 抖音、B站、快手、Telegram、Facebook、LinkedIn、Threads、Instagram、TikTok、微博、小红书、YouTube、微信视频号、微信搜一搜、微信公众号、Reddit、Pinterest |
| `parent_id` | 抖音、B站、快手、Telegram、Facebook、LinkedIn、Threads、Instagram、TikTok、微博、小红书、YouTube、微信视频号、微信搜一搜、微信公众号、Reddit、Pinterest |
| `root_id` | 抖音、B站、快手、Telegram、X（推特）、Facebook、LinkedIn、Threads、Instagram、TikTok、微博、小红书、YouTube、微信视频号、微信搜一搜、微信公众号、Reddit、知乎、Pinterest |

同一个平台上，可能一个接口给不了、另一个接口能给：每个接口的页面列着它给不了的字段，每次返回也都写在 `meta.unavailable` 里。

## 返回 Post（内容）的接口

### 抖音

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [抖音话题视频](https://dataxapi.com/zh/apis/douyin/hashtags/videos/list.md) | `GET /v1/douyin/hashtags/videos/list` | 内容列表 | $0.0020 / 次 |
| [抖音巨量算数达人热门视频](https://dataxapi.com/zh/apis/douyin/index/creators/videos/list.md) | `GET /v1/douyin/index/creators/videos/list` | 内容列表 | $0.0020 / 次 |
| [抖音巨量算数关键词热门视频](https://dataxapi.com/zh/apis/douyin/index/videos/search.md) | `GET /v1/douyin/index/videos/search` | 内容列表 | $0.0020 / 次 |
| [抖音用户视频](https://dataxapi.com/zh/apis/douyin/users/videos/list.md) | `GET /v1/douyin/users/videos/list` | 内容列表 | $0.0020 / 次 |
| [抖音视频详情](https://dataxapi.com/zh/apis/douyin/videos/get.md) | `GET /v1/douyin/videos/get` | 内容 | $0.0020 / 次 |
| [抖音视频播放量](https://dataxapi.com/zh/apis/douyin/videos/metrics.md) | `GET /v1/douyin/videos/metrics` | 内容 | $0.0020 / 次 |
| [抖音相关视频](https://dataxapi.com/zh/apis/douyin/videos/related.md) | `GET /v1/douyin/videos/related` | 内容列表 | $0.0020 / 次 |
| [抖音视频搜索](https://dataxapi.com/zh/apis/douyin/videos/search.md) | `GET /v1/douyin/videos/search` | 内容列表 | $0.0200 / 次 |
| [抖音视频榜](https://dataxapi.com/zh/apis/douyin/videos/trending.md) | `GET /v1/douyin/videos/trending` | 内容列表 | $0.0020 / 次 |
| [抖音星图视频数据报告（播放量、完播率）](https://dataxapi.com/zh/apis/douyin/xingtu/videos/get.md) | `GET /v1/douyin/xingtu/videos/get` | 内容 | $0.0040 / 次 |
| [抖音用户视频（备用版）](https://dataxapi.com/zh/apis/douyin/backup/users/videos/list.md) | `GET /v1/douyin/backup/users/videos/list` | 内容列表 | $0.0300 / 次 |
| [抖音视频搜索（备用版）](https://dataxapi.com/zh/apis/douyin/backup/videos/search.md) | `GET /v1/douyin/backup/videos/search` | 内容列表 | $0.0300 / 次 |

### B站

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [B站用户投稿](https://dataxapi.com/zh/apis/bilibili/users/videos/list.md) | `GET /v1/bilibili/users/videos/list` | 内容列表 | $0.0020 / 次 |
| [B站视频详情](https://dataxapi.com/zh/apis/bilibili/videos/get.md) | `GET /v1/bilibili/videos/get` | 内容 | $0.0020 / 次 |
| [B站视频搜索](https://dataxapi.com/zh/apis/bilibili/videos/search.md) | `GET /v1/bilibili/videos/search` | 内容列表 | $0.0020 / 次 |
| [B站综合热门](https://dataxapi.com/zh/apis/bilibili/videos/trending.md) | `GET /v1/bilibili/videos/trending` | 内容列表 | $0.0020 / 次 |
| [B站用户投稿（备用版）](https://dataxapi.com/zh/apis/bilibili/backup/users/videos/list.md) | `GET /v1/bilibili/backup/users/videos/list` | 内容列表 | $0.0300 / 次 |

### 快手

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [快手用户作品](https://dataxapi.com/zh/apis/kuaishou/users/videos/list.md) | `GET /v1/kuaishou/users/videos/list` | 内容列表 | $0.0200 / 次 |
| [快手作品详情](https://dataxapi.com/zh/apis/kuaishou/videos/get.md) | `GET /v1/kuaishou/videos/get` | 内容 | $0.0020 / 次 |
| [快手视频搜索](https://dataxapi.com/zh/apis/kuaishou/videos/search.md) | `GET /v1/kuaishou/videos/search` | 内容列表 | $0.0200 / 次 |

### Telegram

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [Telegram 频道消息](https://dataxapi.com/zh/apis/telegram/channels/messages/list.md) | `GET /v1/telegram/channels/messages/list` | 内容列表 | $0.0020 / 次 |
| [Telegram 单条消息](https://dataxapi.com/zh/apis/telegram/messages/get.md) | `GET /v1/telegram/messages/get` | 内容 | $0.0020 / 次 |

### X（推特）

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [X 社群帖子](https://dataxapi.com/zh/apis/x/communities/posts/list.md) | `GET /v1/x/communities/posts/list` | 内容列表 | $0.0003 / 条 |
| [X 列表帖子](https://dataxapi.com/zh/apis/x/lists/posts/list.md) | `GET /v1/x/lists/posts/list` | 内容列表 | $0.0020 / 次 |
| [X 长文详情](https://dataxapi.com/zh/apis/x/posts/article/get.md) | `GET /v1/x/posts/article/get` | 内容 | $0.0020 / 次 |
| [X 帖子详情](https://dataxapi.com/zh/apis/x/posts/get.md) | `GET /v1/x/posts/get` | 内容 | $0.0003 / 次 |
| [X 帖子引用列表](https://dataxapi.com/zh/apis/x/posts/quotes/list.md) | `GET /v1/x/posts/quotes/list` | 内容列表 | $0.0003 / 条 |
| [X 帖子回复列表](https://dataxapi.com/zh/apis/x/posts/replies/list.md) | `GET /v1/x/posts/replies/list` | 内容列表 | $0.0020 / 次 |
| [X 帖子搜索](https://dataxapi.com/zh/apis/x/posts/search.md) | `GET /v1/x/posts/search` | 内容列表 | $0.0020 / 次 |
| [X 帖子对话串](https://dataxapi.com/zh/apis/x/threads/posts/list.md) | `GET /v1/x/threads/posts/list` | 内容列表 | $0.0003 / 条 |
| [X 用户提及](https://dataxapi.com/zh/apis/x/users/mentions/list.md) | `GET /v1/x/users/mentions/list` | 内容列表 | $0.0003 / 条 |
| [X 用户帖子列表](https://dataxapi.com/zh/apis/x/users/posts/list.md) | `GET /v1/x/users/posts/list` | 内容列表 | $0.0020 / 次 |

### Facebook

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [Facebook 主页帖子](https://dataxapi.com/zh/apis/facebook/pages/posts/list.md) | `GET /v1/facebook/pages/posts/list` | 内容列表 | $0.0020 / 次 |
| [Facebook 帖子详情](https://dataxapi.com/zh/apis/facebook/posts/get.md) | `GET /v1/facebook/posts/get` | 内容 | $0.0020 / 次 |

### LinkedIn

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [LinkedIn 公司帖子](https://dataxapi.com/zh/apis/linkedin/companies/posts/list.md) | `GET /v1/linkedin/companies/posts/list` | 内容列表 | $0.0020 / 次 |
| [LinkedIn 帖子详情](https://dataxapi.com/zh/apis/linkedin/posts/get.md) | `GET /v1/linkedin/posts/get` | 内容 | $0.0020 / 次 |
| [LinkedIn 帖子搜索](https://dataxapi.com/zh/apis/linkedin/posts/search.md) | `GET /v1/linkedin/posts/search` | 内容列表 | $0.0020 / 次 |

### Threads

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [Threads 帖子详情](https://dataxapi.com/zh/apis/threads/posts/get.md) | `GET /v1/threads/posts/get` | 内容 | $0.0020 / 次 |
| [Threads 帖子搜索](https://dataxapi.com/zh/apis/threads/posts/search.md) | `GET /v1/threads/posts/search` | 内容列表 | $0.0020 / 次 |
| [Threads 用户帖子](https://dataxapi.com/zh/apis/threads/users/posts/list.md) | `GET /v1/threads/users/posts/list` | 内容列表 | $0.0020 / 次 |

### Instagram

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [Instagram 话题帖子](https://dataxapi.com/zh/apis/instagram/hashtags/posts/list.md) | `GET /v1/instagram/hashtags/posts/list` | 内容列表 | $0.0020 / 次 |
| [Instagram 帖子详情](https://dataxapi.com/zh/apis/instagram/posts/get.md) | `GET /v1/instagram/posts/get` | 内容 | $0.0020 / 次 |
| [Instagram 用户帖子](https://dataxapi.com/zh/apis/instagram/users/posts/list.md) | `GET /v1/instagram/users/posts/list` | 内容列表 | $0.0020 / 次 |

### TikTok

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [TikTok 话题作品](https://dataxapi.com/zh/apis/tiktok/hashtags/videos/list.md) | `GET /v1/tiktok/hashtags/videos/list` | 内容列表 | $0.0020 / 次 |
| [TikTok 用户作品](https://dataxapi.com/zh/apis/tiktok/users/videos/list.md) | `GET /v1/tiktok/users/videos/list` | 内容列表 | $0.0020 / 次 |
| [TikTok 视频详情](https://dataxapi.com/zh/apis/tiktok/videos/get.md) | `GET /v1/tiktok/videos/get` | 内容 | $0.0020 / 次 |
| [TikTok 视频搜索](https://dataxapi.com/zh/apis/tiktok/videos/search.md) | `GET /v1/tiktok/videos/search` | 内容列表 | $0.0020 / 次 |

### 微博

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [微博详情](https://dataxapi.com/zh/apis/weibo/posts/get.md) | `GET /v1/weibo/posts/get` | 内容 | $0.0020 / 次 |
| [微博实时搜索](https://dataxapi.com/zh/apis/weibo/posts/search.md) | `GET /v1/weibo/posts/search` | 内容列表 | $0.0020 / 次 |
| [微博用户微博](https://dataxapi.com/zh/apis/weibo/users/posts/list.md) | `GET /v1/weibo/users/posts/list` | 内容列表 | $0.0020 / 次 |

### 小红书

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [小红书图片搜索](https://dataxapi.com/zh/apis/xiaohongshu/images/search.md) | `GET /v1/xiaohongshu/images/search` | 内容列表 | $0.0200 / 次 |
| [小红书笔记详情](https://dataxapi.com/zh/apis/xiaohongshu/notes/get.md) | `GET /v1/xiaohongshu/notes/get` | 内容 | $0.0200 / 次 |
| [小红书笔记搜索](https://dataxapi.com/zh/apis/xiaohongshu/notes/search.md) | `GET /v1/xiaohongshu/notes/search` | 内容列表 | $0.0200 / 次 |
| [小红书话题笔记](https://dataxapi.com/zh/apis/xiaohongshu/topics/notes/list.md) | `GET /v1/xiaohongshu/topics/notes/list` | 内容列表 | $0.0200 / 次 |
| [小红书用户笔记](https://dataxapi.com/zh/apis/xiaohongshu/users/notes/list.md) | `GET /v1/xiaohongshu/users/notes/list` | 内容列表 | $0.0200 / 次 |
| [小红书视频笔记详情（视频地址和字幕）](https://dataxapi.com/zh/apis/xiaohongshu/videos/get.md) | `GET /v1/xiaohongshu/videos/get` | 内容 | $0.0200 / 次 |
| [小红书蒲公英内容广场热门笔记](https://dataxapi.com/zh/apis/xiaohongshu/pgy/notes/trending.md) | `GET /v1/xiaohongshu/pgy/notes/trending` | 内容列表 | $0.0400 / 次 |

### YouTube

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [YouTube 频道视频](https://dataxapi.com/zh/apis/youtube/channels/videos/list.md) | `GET /v1/youtube/channels/videos/list` | 内容列表 | $0.0020 / 次 |
| [YouTube 视频详情](https://dataxapi.com/zh/apis/youtube/videos/get.md) | `GET /v1/youtube/videos/get` | 内容 | $0.0020 / 次 |
| [YouTube 视频搜索](https://dataxapi.com/zh/apis/youtube/videos/search.md) | `GET /v1/youtube/videos/search` | 内容列表 | $0.0020 / 次 |
| [YouTube 频道帖子](https://dataxapi.com/zh/apis/youtube/channels/posts/list.md) | `GET /v1/youtube/channels/posts/list` | 内容列表 | $0.0020 / 次 |
| [YouTube 帖子详情](https://dataxapi.com/zh/apis/youtube/posts/get.md) | `GET /v1/youtube/posts/get` | 内容 | $0.0020 / 次 |

### 微信视频号

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [微信视频号作品详情](https://dataxapi.com/zh/apis/wechat_channels/videos/get.md) | `GET /v1/wechat_channels/videos/get` | 内容 | $0.0200 / 次 |
| [微信视频号合集里的视频](https://dataxapi.com/zh/apis/wechat_channels/collections/videos/list.md) | `GET /v1/wechat_channels/collections/videos/list` | 内容列表 | $0.0200 / 次 |
| [微信视频号用户作品](https://dataxapi.com/zh/apis/wechat_channels/users/videos/list.md) | `GET /v1/wechat_channels/users/videos/list` | 内容列表 | $0.0200 / 次 |
| [微信搜一搜视频号视频搜索](https://dataxapi.com/zh/apis/wechat_channels/videos/search.md) | `GET /v1/wechat_channels/videos/search` | 内容列表 | $0.0200 / 次 |
| [微信视频号用户作品（备用版）](https://dataxapi.com/zh/apis/wechat_channels/backup/users/videos/list.md) | `GET /v1/wechat_channels/backup/users/videos/list` | 内容列表 | $0.0600 / 次 |
| [微信搜一搜视频号视频搜索（备用版）](https://dataxapi.com/zh/apis/wechat_channels/backup/videos/search.md) | `GET /v1/wechat_channels/backup/videos/search` | 内容列表 | $0.1 / 次 |
| [微信视频号作品互动数据](https://dataxapi.com/zh/apis/wechat_channels/videos/metrics.md) | `GET /v1/wechat_channels/videos/metrics` | 内容 | $0.0150 / 次 |
| [微信视频号直播回放](https://dataxapi.com/zh/apis/wechat_channels/users/live_replays/list.md) | `GET /v1/wechat_channels/users/live_replays/list` | 内容列表 | $0.0200 / 次 |

### 微信搜一搜

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [微信搜一搜综合搜索](https://dataxapi.com/zh/apis/wechat/posts/search.md) | `GET /v1/wechat/posts/search` | 内容列表 | $0.0200 / 次 |
| [微信搜一搜综合搜索（备用版）](https://dataxapi.com/zh/apis/wechat/backup/posts/search.md) | `GET /v1/wechat/backup/posts/search` | 内容列表 | $0.1 / 次 |

### 微信公众号

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [微信公众号文章列表](https://dataxapi.com/zh/apis/wechat_mp/accounts/articles/list.md) | `GET /v1/wechat_mp/accounts/articles/list` | 内容列表 | $0.0200 / 次 |
| [微信公众号文章详情](https://dataxapi.com/zh/apis/wechat_mp/articles/get.md) | `GET /v1/wechat_mp/articles/get` | 内容 | $0.0200 / 次 |
| [微信公众号文章互动数据](https://dataxapi.com/zh/apis/wechat_mp/articles/metrics.md) | `GET /v1/wechat_mp/articles/metrics` | 内容 | $0.0200 / 次 |

### Reddit

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [Reddit 帖子详情](https://dataxapi.com/zh/apis/reddit/posts/get.md) | `GET /v1/reddit/posts/get` | 内容 | $0.0020 / 次 |
| [Reddit 帖子搜索](https://dataxapi.com/zh/apis/reddit/posts/search.md) | `GET /v1/reddit/posts/search` | 内容列表 | $0.0020 / 次 |
| [Reddit 热门帖子](https://dataxapi.com/zh/apis/reddit/posts/trending.md) | `GET /v1/reddit/posts/trending` | 内容列表 | $0.0020 / 次 |
| [Reddit 社区帖子](https://dataxapi.com/zh/apis/reddit/subreddits/posts/list.md) | `GET /v1/reddit/subreddits/posts/list` | 内容列表 | $0.0020 / 次 |
| [Reddit 用户帖子](https://dataxapi.com/zh/apis/reddit/users/posts/list.md) | `GET /v1/reddit/users/posts/list` | 内容列表 | $0.0020 / 次 |

### 知乎

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [知乎回答详情](https://dataxapi.com/zh/apis/zhihu/answers/get.md) | `GET /v1/zhihu/answers/get` | 内容 | $0.0020 / 次 |
| [知乎文章详情](https://dataxapi.com/zh/apis/zhihu/articles/get.md) | `GET /v1/zhihu/articles/get` | 内容 | $0.0020 / 次 |
| [知乎专栏文章列表](https://dataxapi.com/zh/apis/zhihu/columns/articles/list.md) | `GET /v1/zhihu/columns/articles/list` | 内容列表 | $0.0020 / 次 |
| [知乎想法详情](https://dataxapi.com/zh/apis/zhihu/pins/get.md) | `GET /v1/zhihu/pins/get` | 内容 | $0.0020 / 次 |
| [知乎内容搜索](https://dataxapi.com/zh/apis/zhihu/posts/search.md) | `GET /v1/zhihu/posts/search` | 内容列表 | $0.0020 / 次 |
| [知乎问题回答](https://dataxapi.com/zh/apis/zhihu/questions/answers/list.md) | `GET /v1/zhihu/questions/answers/list` | 内容列表 | $0.0020 / 次 |
| [知乎问题详情](https://dataxapi.com/zh/apis/zhihu/questions/get.md) | `GET /v1/zhihu/questions/get` | 内容 | $0.0020 / 次 |
| [知乎用户回答](https://dataxapi.com/zh/apis/zhihu/users/answers/list.md) | `GET /v1/zhihu/users/answers/list` | 内容列表 | $0.0020 / 次 |
| [知乎用户文章](https://dataxapi.com/zh/apis/zhihu/users/articles/list.md) | `GET /v1/zhihu/users/articles/list` | 内容列表 | $0.0020 / 次 |
| [知乎用户想法](https://dataxapi.com/zh/apis/zhihu/users/pins/list.md) | `GET /v1/zhihu/users/pins/list` | 内容列表 | $0.0020 / 次 |

### Pinterest

| 接口 | 路径 | 返回 | 价格 |
| --- | --- | --- | --- |
| [Pinterest 图钉详情](https://dataxapi.com/zh/apis/pinterest/pins/get.md) | `GET /v1/pinterest/pins/get` | 内容 | $0.0020 / 次 |
| [Pinterest 图钉搜索](https://dataxapi.com/zh/apis/pinterest/pins/search.md) | `GET /v1/pinterest/pins/search` | 内容列表 | $0.0020 / 次 |

## 示例

`douyin.hashtags.videos.list` 返回的一条，录制于 2026-10-12 18:42 UTC。名字、正文和编号是示例，链接也是；数字是原样。

```jsonc
{
  "id": "7963545807100437923",
  "url": "https://www.douyin.com/video/7963545807100437923",
  "type": "video",
  "title": null,
  "text": "周末的周末露营日常，随手记录一下",
  "lang": "zh",
  "published_at": "2026-10-12T07:11:10.000Z",
  "author": {
    "id": "MS4wLjABAAAABGZA0lkiz3H7A-lxzB5Grql28u6Ykbup22O6ze_0pro",
    "username": "orange_soda22",
    "name": "橘子汽水不加冰",
    "avatar_url": "https://p3-pc.douyinpic.com/aweme/100x100/aweme-avatar/tos-cn-avt-0015_9aa5b7cd5493d4d36c71.jpeg"
  },
  "metrics": {
    "likes": 11911,
    "comments": 190,
    "shares": 131,
    "favorites": 1081
  },
  "images": null,
  "hashtags": [
    "周末去哪儿",
    "户外生活",
    // … 另有 3 条
  ]
}
```

[完整的返回在这个接口的页面上 →](https://dataxapi.com/zh/apis/douyin/hashtags/videos/list.md)

## 相关

- [内容详情 API](https://dataxapi.com/zh/roles/posts-get/): 同一种动作在 18 个平台上的接口，带各平台的字段对照。
- [账号作品列表 API](https://dataxapi.com/zh/roles/accounts-posts-list/): 同一种动作在 17 个平台上的接口，带各平台的字段对照。
- [内容搜索 API](https://dataxapi.com/zh/roles/posts-search/): 同一种动作在 15 个平台上的接口，带各平台的字段对照。
- [评论 API](https://dataxapi.com/zh/roles/posts-comments-list/): 同一种动作在 13 个平台上的接口，带各平台的字段对照。
- [话题下的内容 API](https://dataxapi.com/zh/roles/topics-posts-list/): 同一种动作在 4 个平台上的接口，带各平台的字段对照。
- [热门内容榜 API](https://dataxapi.com/zh/roles/posts-trending/): 同一种动作在 3 个平台上的接口，带各平台的字段对照。
- [内容互动数据 API](https://dataxapi.com/zh/roles/posts-metrics/): 同一种动作在 3 个平台上的接口，带各平台的字段对照。
- [社区帖子 API](https://dataxapi.com/zh/roles/communities-posts-list/): 同一种动作在 2 个平台上的接口，带各平台的字段对照。
- [全部接口](https://dataxapi.com/zh/apis/): 目录里写明每个接口返回什么对象、多少钱。

## 其他对象

[Comment（评论）对象](https://dataxapi.com/zh/docs/objects/comment/)、[Account（账号）对象](https://dataxapi.com/zh/docs/objects/account/)、[Trend（热点）对象](https://dataxapi.com/zh/docs/objects/trend/)、[Transcript（逐字稿）对象](https://dataxapi.com/zh/docs/objects/transcript/)、[Media files（视频和图片文件）对象](https://dataxapi.com/zh/docs/objects/media/)、[Music（音乐）对象](https://dataxapi.com/zh/docs/objects/music/)、[Creator rates（达人报价）对象](https://dataxapi.com/zh/docs/objects/creator_rates/)、[Community（社区）对象](https://dataxapi.com/zh/docs/objects/community/)、[Product（商品）对象](https://dataxapi.com/zh/docs/objects/product/)、[Review（评价）对象](https://dataxapi.com/zh/docs/objects/review/)、[Keyword index history（关键词指数历史）对象](https://dataxapi.com/zh/docs/objects/keyword_history/)、[Related keyword（关联词）对象](https://dataxapi.com/zh/docs/objects/keyword_related/)、[Keyword audience（关键词人群画像）对象](https://dataxapi.com/zh/docs/objects/keyword_audience/)、[Account recent change（账号近期变化）对象](https://dataxapi.com/zh/docs/objects/account_history/)、[Brand index history（品牌指数历史）对象](https://dataxapi.com/zh/docs/objects/brand_history/)、[Brand index averages（品牌指数均值）对象](https://dataxapi.com/zh/docs/objects/brand_metrics/)、[Creator（达人）对象](https://dataxapi.com/zh/docs/objects/creator/)、[Audience（粉丝画像）对象](https://dataxapi.com/zh/docs/objects/audience/)、[Xingtu creator metrics（星图达人传播数据）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_metrics/)、[Xingtu creator video（星图达人作品）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_post/)、[PGY creator metrics（蒲公英博主数据表现）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_metrics/)、[PGY creator note（蒲公英博主笔记）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_post/)、[PGY note detail（蒲公英笔记详情）对象](https://dataxapi.com/zh/docs/objects/pgy_note/)、[Ad（广告）对象](https://dataxapi.com/zh/docs/objects/ad/)、[Advertiser（广告主）对象](https://dataxapi.com/zh/docs/objects/advertiser/)、[Douyin trend-index creator metrics（巨量算数达人核心指标）对象](https://dataxapi.com/zh/docs/objects/index_creator_metrics/)、[Xingtu creator content keywords（星图达人内容热词）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_keywords/)、[Xingtu creator scores（星图达人指数）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_scores/)、[Xingtu creator content mix（星图达人内容分布）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_content_mix/)、[Xingtu creator conversion（星图达人转化能力）对象](https://dataxapi.com/zh/docs/objects/xingtu_creator_conversion/)、[Xingtu campaign（星图营销活动）对象](https://dataxapi.com/zh/docs/objects/xingtu_campaign/)、[Channels collection（视频号合集）对象](https://dataxapi.com/zh/docs/objects/channels_collection/)、[Channels share link（视频号分享链接）对象](https://dataxapi.com/zh/docs/objects/channels_share_link/)、[Topic（话题）对象](https://dataxapi.com/zh/docs/objects/topic/)、[Account owner（账号主体）对象](https://dataxapi.com/zh/docs/objects/account_owner/)、[Mini program（小程序）对象](https://dataxapi.com/zh/docs/objects/miniprogram/)、[Follower history（粉丝数变化）对象](https://dataxapi.com/zh/docs/objects/follower_history/)、[PGY creator costs and summary（蒲公英博主合作成本和数据概览）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_costs/)、[PGY creator follower summary（蒲公英博主粉丝概览）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_followers/)、[PGY creator core figures history（蒲公英博主核心数据趋势）对象](https://dataxapi.com/zh/docs/objects/pgy_creator_cost_history/)

---

最后核对于 2026-11-26 12:17 UTC。目录修订号 0051cce45e9530b9。 [网页版](https://dataxapi.com/zh/docs/objects/post/)
