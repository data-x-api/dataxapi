# 数据 API 目录

内容、评论、账号、热榜、达人报价和广告库：21 个平台、237 个接口，一把 Key，一种返回格式。一次 $0.0003 起，每个接口各有标价；失败不收费。

## [抖音 API](https://dataxapi.com/zh/apis/douyin.md)

38 个接口 · $0.0020 起

### 备用版 (2)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [抖音视频搜索（备用版）](https://dataxapi.com/zh/apis/douyin/backup/videos/search.md) | `GET /v1/douyin/backup/videos/search` | 内容列表 | $0.0300 / 次 |
| [抖音用户视频（备用版）](https://dataxapi.com/zh/apis/douyin/backup/users/videos/list.md) | `GET /v1/douyin/backup/users/videos/list` | 内容列表 | $0.0300 / 次 |

### 视频 (6)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [抖音视频搜索](https://dataxapi.com/zh/apis/douyin/videos/search.md) | `GET /v1/douyin/videos/search` | 内容列表 | $0.0200 / 次 |
| [抖音视频详情](https://dataxapi.com/zh/apis/douyin/videos/get.md) | `GET /v1/douyin/videos/get` | 内容 | $0.0020 / 次 |
| [抖音视频评论](https://dataxapi.com/zh/apis/douyin/videos/comments/list.md) | `GET /v1/douyin/videos/comments/list` | 评论列表 | $0.0020 / 次 |
| [抖音视频播放量](https://dataxapi.com/zh/apis/douyin/videos/metrics.md) | `GET /v1/douyin/videos/metrics` | 内容 | $0.0020 / 次 |
| [抖音相关视频](https://dataxapi.com/zh/apis/douyin/videos/related.md) | `GET /v1/douyin/videos/related` | 内容列表 | $0.0020 / 次 |
| [抖音视频榜](https://dataxapi.com/zh/apis/douyin/videos/trending.md) | `GET /v1/douyin/videos/trending` | 内容列表 | $0.0020 / 次 |

### 话题 (1)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [抖音话题视频](https://dataxapi.com/zh/apis/douyin/hashtags/videos/list.md) | `GET /v1/douyin/hashtags/videos/list` | 内容列表 | $0.0020 / 次 |

### 用户 (4)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [抖音用户搜索](https://dataxapi.com/zh/apis/douyin/users/search.md) | `GET /v1/douyin/users/search` | 账号列表 | $0.0020 / 次 |
| [抖音用户资料](https://dataxapi.com/zh/apis/douyin/users/get.md) | `GET /v1/douyin/users/get` | 账号 | $0.0020 / 次 |
| [抖音达人互动与粉丝趋势](https://dataxapi.com/zh/apis/douyin/users/history.md) | `GET /v1/douyin/users/history` | 账号近期变化 | $0.0020 / 次 |
| [抖音用户视频](https://dataxapi.com/zh/apis/douyin/users/videos/list.md) | `GET /v1/douyin/users/videos/list` | 内容列表 | $0.0020 / 次 |

### 评论 (1)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [抖音评论回复](https://dataxapi.com/zh/apis/douyin/comments/replies/list.md) | `GET /v1/douyin/comments/replies/list` | 评论列表 | $0.0020 / 次 |

### 热榜 (1)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [抖音热榜](https://dataxapi.com/zh/apis/douyin/trends/list.md) | `GET /v1/douyin/trends/list` | 热点列表 | $0.0020 / 次 |

### 关键词 (1)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [抖音搜索框联想词](https://dataxapi.com/zh/apis/douyin/keywords/related.md) | `GET /v1/douyin/keywords/related` | 关联词列表 | $0.0200 / 次 |

### [巨量算数](https://dataxapi.com/zh/apis/douyin/index.md) (10)

抖音官方的指数工具：关键词和品牌的逐日指数、搜索人群画像、关联词、实时热点和达人指标。

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [抖音巨量算数关键词热门视频](https://dataxapi.com/zh/apis/douyin/index/videos/search.md) | `GET /v1/douyin/index/videos/search` | 内容列表 | $0.0020 / 次 |
| [抖音巨量算数达人粉丝画像](https://dataxapi.com/zh/apis/douyin/index/creators/audience/get.md) | `GET /v1/douyin/index/creators/audience/get` | 粉丝画像 | $0.0020 / 次 |
| [抖音巨量算数关键词人群画像](https://dataxapi.com/zh/apis/douyin/index/keywords/audience/get.md) | `GET /v1/douyin/index/keywords/audience/get` | 关键词人群画像 | $0.0020 / 次 |
| [抖音巨量算数品牌指数趋势](https://dataxapi.com/zh/apis/douyin/index/brands/history.md) | `GET /v1/douyin/index/brands/history` | 品牌指数历史 | $0.0020 / 次 |
| [抖音巨量算数品牌指数对比](https://dataxapi.com/zh/apis/douyin/index/brands/metrics.md) | `GET /v1/douyin/index/brands/metrics` | 品牌指数均值 | $0.0020 / 次 |
| [抖音巨量算数达人核心指标](https://dataxapi.com/zh/apis/douyin/index/creators/metrics.md) | `GET /v1/douyin/index/creators/metrics` | 巨量算数达人核心指标 | $0.0020 / 次 |
| [抖音巨量算数达人热门视频](https://dataxapi.com/zh/apis/douyin/index/creators/videos/list.md) | `GET /v1/douyin/index/creators/videos/list` | 内容列表 | $0.0020 / 次 |
| [抖音巨量算数关键词热度趋势](https://dataxapi.com/zh/apis/douyin/index/keywords/history.md) | `GET /v1/douyin/index/keywords/history` | 关键词指数历史列表 | $0.0060 / 次 |
| [抖音巨量算数关联词](https://dataxapi.com/zh/apis/douyin/index/keywords/related.md) | `GET /v1/douyin/index/keywords/related` | 关联词列表 | $0.0020 / 次 |
| [抖音巨量算数实时热点](https://dataxapi.com/zh/apis/douyin/index/trends/list.md) | `GET /v1/douyin/index/trends/list` | 热点列表 | $0.0020 / 次 |

### [星图](https://dataxapi.com/zh/apis/douyin/xingtu.md) (12)

抖音官方的达人合作平台：达人搜索、报价、粉丝画像、传播和转化数据。

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [抖音星图达人搜索](https://dataxapi.com/zh/apis/douyin/xingtu/creators/search.md) | `GET /v1/douyin/xingtu/creators/search` | 达人列表 | $0.0040 / 次 |
| [抖音星图达人粉丝画像](https://dataxapi.com/zh/apis/douyin/xingtu/creators/audience/get.md) | `GET /v1/douyin/xingtu/creators/audience/get` | 粉丝画像 | $0.0040 / 次 |
| [抖音星图达人内容分布](https://dataxapi.com/zh/apis/douyin/xingtu/creators/content_mix/get.md) | `GET /v1/douyin/xingtu/creators/content_mix/get` | 星图达人内容分布 | $0.0040 / 次 |
| [抖音星图达人转化能力](https://dataxapi.com/zh/apis/douyin/xingtu/creators/conversion/get.md) | `GET /v1/douyin/xingtu/creators/conversion/get` | 星图达人转化能力 | $0.0040 / 次 |
| [抖音星图达人资料](https://dataxapi.com/zh/apis/douyin/xingtu/creators/get.md) | `GET /v1/douyin/xingtu/creators/get` | 达人 | $0.0040 / 次 |
| [抖音星图达人内容热词](https://dataxapi.com/zh/apis/douyin/xingtu/creators/keywords/get.md) | `GET /v1/douyin/xingtu/creators/keywords/get` | 星图达人内容热词 | $0.0020 / 次 |
| [抖音星图达人商业报价](https://dataxapi.com/zh/apis/douyin/xingtu/creators/rates/get.md) | `GET /v1/douyin/xingtu/creators/rates/get` | 达人报价 | $0.0400 / 次 |
| [抖音星图达人星图指数](https://dataxapi.com/zh/apis/douyin/xingtu/creators/scores/get.md) | `GET /v1/douyin/xingtu/creators/scores/get` | 星图达人指数 | $0.0080 / 次 |
| [抖音星图视频数据报告（播放量、完播率）](https://dataxapi.com/zh/apis/douyin/xingtu/videos/get.md) | `GET /v1/douyin/xingtu/videos/get` | 内容 | $0.0040 / 次 |
| [抖音星图营销活动日历](https://dataxapi.com/zh/apis/douyin/xingtu/campaigns/list.md) | `GET /v1/douyin/xingtu/campaigns/list` | 星图营销活动列表 | $0.0040 / 次 |
| [抖音星图达人传播数据](https://dataxapi.com/zh/apis/douyin/xingtu/creators/metrics.md) | `GET /v1/douyin/xingtu/creators/metrics` | 星图达人传播数据 | $0.0040 / 次 |
| [抖音星图达人作品表现](https://dataxapi.com/zh/apis/douyin/xingtu/creators/videos/list.md) | `GET /v1/douyin/xingtu/creators/videos/list` | 星图达人作品列表 | $0.0040 / 次 |

## [B站 API](https://dataxapi.com/zh/apis/bilibili.md)

9 个接口 · $0.0020 起

### 备用版 (1)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [B站用户投稿（备用版）](https://dataxapi.com/zh/apis/bilibili/backup/users/videos/list.md) | `GET /v1/bilibili/backup/users/videos/list` | 内容列表 | $0.0300 / 次 |

### 视频 (4)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [B站视频搜索](https://dataxapi.com/zh/apis/bilibili/videos/search.md) | `GET /v1/bilibili/videos/search` | 内容列表 | $0.0020 / 次 |
| [B站视频详情](https://dataxapi.com/zh/apis/bilibili/videos/get.md) | `GET /v1/bilibili/videos/get` | 内容 | $0.0020 / 次 |
| [B站视频评论](https://dataxapi.com/zh/apis/bilibili/videos/comments/list.md) | `GET /v1/bilibili/videos/comments/list` | 评论列表 | $0.0020 / 次 |
| [B站综合热门](https://dataxapi.com/zh/apis/bilibili/videos/trending.md) | `GET /v1/bilibili/videos/trending` | 内容列表 | $0.0020 / 次 |

### 用户 (2)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [B站用户资料](https://dataxapi.com/zh/apis/bilibili/users/get.md) | `GET /v1/bilibili/users/get` | 账号 | $0.0020 / 次 |
| [B站用户投稿](https://dataxapi.com/zh/apis/bilibili/users/videos/list.md) | `GET /v1/bilibili/users/videos/list` | 内容列表 | $0.0020 / 次 |

### 评论 (1)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [B站评论回复](https://dataxapi.com/zh/apis/bilibili/comments/replies/list.md) | `GET /v1/bilibili/comments/replies/list` | 评论列表 | $0.0020 / 次 |

### 热榜 (1)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [B站热搜榜](https://dataxapi.com/zh/apis/bilibili/trends/list.md) | `GET /v1/bilibili/trends/list` | 热点列表 | $0.0020 / 次 |

## [快手 API](https://dataxapi.com/zh/apis/kuaishou.md)

8 个接口 · $0.0020 起

### 视频 (3)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [快手视频搜索](https://dataxapi.com/zh/apis/kuaishou/videos/search.md) | `GET /v1/kuaishou/videos/search` | 内容列表 | $0.0200 / 次 |
| [快手作品详情](https://dataxapi.com/zh/apis/kuaishou/videos/get.md) | `GET /v1/kuaishou/videos/get` | 内容 | $0.0020 / 次 |
| [快手作品评论](https://dataxapi.com/zh/apis/kuaishou/videos/comments/list.md) | `GET /v1/kuaishou/videos/comments/list` | 评论列表 | $0.0020 / 次 |

### 用户 (3)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [快手用户搜索](https://dataxapi.com/zh/apis/kuaishou/users/search.md) | `GET /v1/kuaishou/users/search` | 账号列表 | $0.0200 / 次 |
| [快手用户资料](https://dataxapi.com/zh/apis/kuaishou/users/get.md) | `GET /v1/kuaishou/users/get` | 账号 | $0.0200 / 次 |
| [快手用户作品](https://dataxapi.com/zh/apis/kuaishou/users/videos/list.md) | `GET /v1/kuaishou/users/videos/list` | 内容列表 | $0.0200 / 次 |

### 评论 (1)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [快手评论回复](https://dataxapi.com/zh/apis/kuaishou/comments/replies/list.md) | `GET /v1/kuaishou/comments/replies/list` | 评论列表 | $0.0020 / 次 |

### 热榜 (1)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [快手热榜](https://dataxapi.com/zh/apis/kuaishou/trends/list.md) | `GET /v1/kuaishou/trends/list` | 热点列表 | $0.0020 / 次 |

## [Telegram API](https://dataxapi.com/zh/apis/telegram.md)

3 个接口 · $0.0020 起

### 频道 (2)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [Telegram 频道资料](https://dataxapi.com/zh/apis/telegram/channels/get.md) | `GET /v1/telegram/channels/get` | 账号 | $0.0020 / 次 |
| [Telegram 频道消息](https://dataxapi.com/zh/apis/telegram/channels/messages/list.md) | `GET /v1/telegram/channels/messages/list` | 内容列表 | $0.0020 / 次 |

### 消息 (1)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [Telegram 单条消息](https://dataxapi.com/zh/apis/telegram/messages/get.md) | `GET /v1/telegram/messages/get` | 内容 | $0.0020 / 次 |

## [X（推特）API](https://dataxapi.com/zh/apis/x.md)

21 个接口 · $0.0003 起

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

## [Facebook API](https://dataxapi.com/zh/apis/facebook.md)

4 个接口 · $0.0020 起

### 帖子 (2)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [Facebook 帖子详情](https://dataxapi.com/zh/apis/facebook/posts/get.md) | `GET /v1/facebook/posts/get` | 内容 | $0.0020 / 次 |
| [Facebook 帖子评论](https://dataxapi.com/zh/apis/facebook/posts/comments/list.md) | `GET /v1/facebook/posts/comments/list` | 评论列表 | $0.0020 / 次 |

### 主页 (2)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [Facebook 主页资料](https://dataxapi.com/zh/apis/facebook/pages/get.md) | `GET /v1/facebook/pages/get` | 账号 | $0.0020 / 次 |
| [Facebook 主页帖子](https://dataxapi.com/zh/apis/facebook/pages/posts/list.md) | `GET /v1/facebook/pages/posts/list` | 内容列表 | $0.0020 / 次 |

## [Google 广告 API](https://dataxapi.com/zh/apis/google.md)

3 个接口 · $0.0020 起

### 广告库 (1)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [Google 广告详情](https://dataxapi.com/zh/apis/google/ads/get.md) | `GET /v1/google/ads/get` | 广告 | $0.0020 / 次 |

### 广告主 (2)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [Google 广告主搜索](https://dataxapi.com/zh/apis/google/advertisers/search.md) | `GET /v1/google/advertisers/search` | 广告主列表 | $0.0020 / 次 |
| [Google 广告主的广告](https://dataxapi.com/zh/apis/google/advertisers/ads/list.md) | `GET /v1/google/advertisers/ads/list` | 广告列表 | $0.0020 / 次 |

## [LinkedIn API](https://dataxapi.com/zh/apis/linkedin.md)

7 个接口 · $0.0020 起

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

## [Meta 广告库 API](https://dataxapi.com/zh/apis/meta.md)

5 个接口 · $0.0020 起

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

## [Threads API](https://dataxapi.com/zh/apis/threads.md)

4 个接口 · $0.0020 起

### 帖子 (2)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [Threads 帖子搜索](https://dataxapi.com/zh/apis/threads/posts/search.md) | `GET /v1/threads/posts/search` | 内容列表 | $0.0020 / 次 |
| [Threads 帖子详情](https://dataxapi.com/zh/apis/threads/posts/get.md) | `GET /v1/threads/posts/get` | 内容 | $0.0020 / 次 |

### 用户 (2)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [Threads 用户资料](https://dataxapi.com/zh/apis/threads/users/get.md) | `GET /v1/threads/users/get` | 账号 | $0.0020 / 次 |
| [Threads 用户帖子](https://dataxapi.com/zh/apis/threads/users/posts/list.md) | `GET /v1/threads/users/posts/list` | 内容列表 | $0.0020 / 次 |

## [Instagram API](https://dataxapi.com/zh/apis/instagram.md)

8 个接口 · $0.0020 起

### 帖子 (3)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [Instagram 帖子详情](https://dataxapi.com/zh/apis/instagram/posts/get.md) | `GET /v1/instagram/posts/get` | 内容 | $0.0020 / 次 |
| [Instagram 视频字幕](https://dataxapi.com/zh/apis/instagram/posts/transcript/get.md) | `GET /v1/instagram/posts/transcript/get` | 逐字稿 | $0.0020 / 次 |
| [Instagram 帖子评论](https://dataxapi.com/zh/apis/instagram/posts/comments/list.md) | `GET /v1/instagram/posts/comments/list` | 评论列表 | $0.0020 / 次 |

### 话题 (1)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [Instagram 话题帖子](https://dataxapi.com/zh/apis/instagram/hashtags/posts/list.md) | `GET /v1/instagram/hashtags/posts/list` | 内容列表 | $0.0020 / 次 |

### 用户 (3)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [Instagram 用户搜索](https://dataxapi.com/zh/apis/instagram/users/search.md) | `GET /v1/instagram/users/search` | 账号列表 | $0.0040 / 次 |
| [Instagram 用户资料](https://dataxapi.com/zh/apis/instagram/users/get.md) | `GET /v1/instagram/users/get` | 账号 | $0.0020 / 次 |
| [Instagram 用户帖子](https://dataxapi.com/zh/apis/instagram/users/posts/list.md) | `GET /v1/instagram/users/posts/list` | 内容列表 | $0.0020 / 次 |

### 评论 (1)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [Instagram 评论回复](https://dataxapi.com/zh/apis/instagram/comments/replies/list.md) | `GET /v1/instagram/comments/replies/list` | 评论列表 | $0.0020 / 次 |

## [TikTok API](https://dataxapi.com/zh/apis/tiktok.md)

18 个接口 · $0.0020 起

### 视频 (4)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [TikTok 视频搜索](https://dataxapi.com/zh/apis/tiktok/videos/search.md) | `GET /v1/tiktok/videos/search` | 内容列表 | $0.0020 / 次 |
| [TikTok 视频详情](https://dataxapi.com/zh/apis/tiktok/videos/get.md) | `GET /v1/tiktok/videos/get` | 内容 | $0.0020 / 次 |
| [TikTok 视频字幕](https://dataxapi.com/zh/apis/tiktok/videos/transcript/get.md) | `GET /v1/tiktok/videos/transcript/get` | 逐字稿 | $0.0020 / 次 |
| [TikTok 视频评论](https://dataxapi.com/zh/apis/tiktok/videos/comments/list.md) | `GET /v1/tiktok/videos/comments/list` | 评论列表 | $0.0020 / 次 |

### 话题 (1)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [TikTok 话题作品](https://dataxapi.com/zh/apis/tiktok/hashtags/videos/list.md) | `GET /v1/tiktok/hashtags/videos/list` | 内容列表 | $0.0020 / 次 |

### 用户 (4)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [TikTok 用户搜索](https://dataxapi.com/zh/apis/tiktok/users/search.md) | `GET /v1/tiktok/users/search` | 账号列表 | $0.0020 / 次 |
| [TikTok 用户资料](https://dataxapi.com/zh/apis/tiktok/users/get.md) | `GET /v1/tiktok/users/get` | 账号 | $0.0020 / 次 |
| [TikTok 用户粉丝列表](https://dataxapi.com/zh/apis/tiktok/users/followers/list.md) | `GET /v1/tiktok/users/followers/list` | 账号列表 | $0.0020 / 次 |
| [TikTok 用户作品](https://dataxapi.com/zh/apis/tiktok/users/videos/list.md) | `GET /v1/tiktok/users/videos/list` | 内容列表 | $0.0020 / 次 |

### 评论 (1)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [TikTok 评论回复](https://dataxapi.com/zh/apis/tiktok/comments/replies/list.md) | `GET /v1/tiktok/comments/replies/list` | 评论列表 | $0.0020 / 次 |

### 广告库 (2)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [TikTok 广告库搜索](https://dataxapi.com/zh/apis/tiktok/ads/search.md) | `GET /v1/tiktok/ads/search` | 广告列表 | $0.0020 / 次 |
| [TikTok 广告库广告详情](https://dataxapi.com/zh/apis/tiktok/ads/get.md) | `GET /v1/tiktok/ads/get` | 广告 | $0.0020 / 次 |

### [创意中心](https://dataxapi.com/zh/apis/tiktok/creative_center.md) (2)

TikTok 创意中心的热门广告（Top Ads）：搜索榜单上投放中的广告，读单条广告的详情和表现。

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [TikTok 创意中心热门广告搜索](https://dataxapi.com/zh/apis/tiktok/creative_center/ads/search.md) | `GET /v1/tiktok/creative_center/ads/search` | 广告列表 | $0.0020 / 次 |
| [TikTok 创意中心热门广告详情](https://dataxapi.com/zh/apis/tiktok/creative_center/ads/get.md) | `GET /v1/tiktok/creative_center/ads/get` | 广告 | $0.0020 / 次 |

### [TikTok Shop](https://dataxapi.com/zh/apis/tiktok/shop.md) (4)

TikTok Shop 的公开商品数据：商品搜索、商品详情、买家评价和店铺在售商品。

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [TikTok Shop 商品搜索](https://dataxapi.com/zh/apis/tiktok/shop/products/search.md) | `GET /v1/tiktok/shop/products/search` | 商品列表 | $0.0020 / 次 |
| [TikTok Shop 商品详情](https://dataxapi.com/zh/apis/tiktok/shop/products/get.md) | `GET /v1/tiktok/shop/products/get` | 商品 | $0.0020 / 次 |
| [TikTok Shop 商品评价](https://dataxapi.com/zh/apis/tiktok/shop/products/reviews/list.md) | `GET /v1/tiktok/shop/products/reviews/list` | 评价列表 | $0.0020 / 次 |
| [TikTok Shop 店铺商品](https://dataxapi.com/zh/apis/tiktok/shop/sellers/products/list.md) | `GET /v1/tiktok/shop/sellers/products/list` | 商品列表 | $0.0020 / 次 |

## [微博 API](https://dataxapi.com/zh/apis/weibo.md)

11 个接口 · $0.0020 起

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

## [小红书 API](https://dataxapi.com/zh/apis/xiaohongshu.md)

30 个接口 · $0.0200 起

### 视频 (1)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [小红书视频笔记详情（视频地址和字幕）](https://dataxapi.com/zh/apis/xiaohongshu/videos/get.md) | `GET /v1/xiaohongshu/videos/get` | 内容 | $0.0200 / 次 |

### 笔记 (3)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [小红书笔记搜索](https://dataxapi.com/zh/apis/xiaohongshu/notes/search.md) | `GET /v1/xiaohongshu/notes/search` | 内容列表 | $0.0200 / 次 |
| [小红书笔记详情](https://dataxapi.com/zh/apis/xiaohongshu/notes/get.md) | `GET /v1/xiaohongshu/notes/get` | 内容 | $0.0200 / 次 |
| [小红书笔记评论](https://dataxapi.com/zh/apis/xiaohongshu/notes/comments/list.md) | `GET /v1/xiaohongshu/notes/comments/list` | 评论列表 | $0.0200 / 次 |

### 图片 (1)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [小红书图片搜索](https://dataxapi.com/zh/apis/xiaohongshu/images/search.md) | `GET /v1/xiaohongshu/images/search` | 内容列表 | $0.0200 / 次 |

### 话题 (2)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [小红书话题详情](https://dataxapi.com/zh/apis/xiaohongshu/topics/get.md) | `GET /v1/xiaohongshu/topics/get` | 话题 | $0.0200 / 次 |
| [小红书话题笔记](https://dataxapi.com/zh/apis/xiaohongshu/topics/notes/list.md) | `GET /v1/xiaohongshu/topics/notes/list` | 内容列表 | $0.0200 / 次 |

### 用户 (3)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [小红书用户搜索](https://dataxapi.com/zh/apis/xiaohongshu/users/search.md) | `GET /v1/xiaohongshu/users/search` | 账号列表 | $0.0200 / 次 |
| [小红书用户资料](https://dataxapi.com/zh/apis/xiaohongshu/users/get.md) | `GET /v1/xiaohongshu/users/get` | 账号 | $0.0200 / 次 |
| [小红书用户笔记](https://dataxapi.com/zh/apis/xiaohongshu/users/notes/list.md) | `GET /v1/xiaohongshu/users/notes/list` | 内容列表 | $0.0200 / 次 |

### 评论 (1)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [小红书评论回复](https://dataxapi.com/zh/apis/xiaohongshu/comments/replies/list.md) | `GET /v1/xiaohongshu/comments/replies/list` | 评论列表 | $0.0200 / 次 |

### 热榜 (1)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [小红书热点](https://dataxapi.com/zh/apis/xiaohongshu/trends/list.md) | `GET /v1/xiaohongshu/trends/list` | 热点列表 | $0.0200 / 次 |

### 关键词 (1)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [小红书搜索框联想词](https://dataxapi.com/zh/apis/xiaohongshu/keywords/related.md) | `GET /v1/xiaohongshu/keywords/related` | 关联词列表 | $0.0200 / 次 |

### [蒲公英](https://dataxapi.com/zh/apis/xiaohongshu/pgy.md) (14)

小红书官方的博主合作平台：博主搜索、报价、粉丝画像和数据表现，以及关键词搜索指数。

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [小红书蒲公英博主搜索](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/search.md) | `GET /v1/xiaohongshu/pgy/creators/search` | 达人列表 | $0.0400 / 次 |
| [小红书蒲公英博主粉丝画像](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/audience/get.md) | `GET /v1/xiaohongshu/pgy/creators/audience/get` | 粉丝画像 | $0.0400 / 次 |
| [小红书蒲公英博主详情](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/get.md) | `GET /v1/xiaohongshu/pgy/creators/get` | 达人 | $0.0400 / 次 |
| [小红书蒲公英笔记数据](https://dataxapi.com/zh/apis/xiaohongshu/pgy/notes/get.md) | `GET /v1/xiaohongshu/pgy/notes/get` | 蒲公英笔记详情 | $0.0400 / 次 |
| [小红书蒲公英博主核心数据趋势](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/costs/history.md) | `GET /v1/xiaohongshu/pgy/creators/costs/history` | 蒲公英博主核心数据趋势 | $0.0400 / 次 |
| [小红书蒲公英博主合作成本和数据概览](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/costs/metrics.md) | `GET /v1/xiaohongshu/pgy/creators/costs/metrics` | 蒲公英博主合作成本和数据概览 | $0.0400 / 次 |
| [小红书蒲公英博主粉丝趋势](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/followers/history.md) | `GET /v1/xiaohongshu/pgy/creators/followers/history` | 粉丝数变化 | $0.0400 / 次 |
| [小红书蒲公英博主粉丝概览](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/followers/metrics.md) | `GET /v1/xiaohongshu/pgy/creators/followers/metrics` | 蒲公英博主粉丝概览 | $0.0400 / 次 |
| [小红书蒲公英博主数据表现](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/metrics.md) | `GET /v1/xiaohongshu/pgy/creators/metrics` | 蒲公英博主数据表现 | $0.0400 / 次 |
| [小红书蒲公英博主笔记](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/notes/list.md) | `GET /v1/xiaohongshu/pgy/creators/notes/list` | 蒲公英博主笔记列表 | $0.0400 / 次 |
| [小红书蒲公英相似博主](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/related.md) | `GET /v1/xiaohongshu/pgy/creators/related` | 达人列表 | $0.0400 / 次 |
| [小红书蒲公英关键词逐日搜索指数](https://dataxapi.com/zh/apis/xiaohongshu/pgy/keywords/history.md) | `GET /v1/xiaohongshu/pgy/keywords/history` | 关键词指数历史 | $0.0400 / 次 |
| [小红书蒲公英关联词](https://dataxapi.com/zh/apis/xiaohongshu/pgy/keywords/related.md) | `GET /v1/xiaohongshu/pgy/keywords/related` | 关联词列表 | $0.0400 / 次 |
| [小红书蒲公英内容广场热门笔记](https://dataxapi.com/zh/apis/xiaohongshu/pgy/notes/trending.md) | `GET /v1/xiaohongshu/pgy/notes/trending` | 内容列表 | $0.0400 / 次 |

### [小红书商城](https://dataxapi.com/zh/apis/xiaohongshu/shop.md) (3)

小红书商城的公开商品数据：商品搜索、商品详情和买家评价。

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [小红书商品搜索](https://dataxapi.com/zh/apis/xiaohongshu/shop/products/search.md) | `GET /v1/xiaohongshu/shop/products/search` | 商品列表 | $0.0200 / 次 |
| [小红书商品详情](https://dataxapi.com/zh/apis/xiaohongshu/shop/products/get.md) | `GET /v1/xiaohongshu/shop/products/get` | 商品 | $0.0200 / 次 |
| [小红书商品评价](https://dataxapi.com/zh/apis/xiaohongshu/shop/products/reviews/list.md) | `GET /v1/xiaohongshu/shop/products/reviews/list` | 评价列表 | $0.0200 / 次 |

## [YouTube API](https://dataxapi.com/zh/apis/youtube.md)

10 个接口 · $0.0020 起

### 视频 (4)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [YouTube 视频搜索](https://dataxapi.com/zh/apis/youtube/videos/search.md) | `GET /v1/youtube/videos/search` | 内容列表 | $0.0020 / 次 |
| [YouTube 视频详情](https://dataxapi.com/zh/apis/youtube/videos/get.md) | `GET /v1/youtube/videos/get` | 内容 | $0.0020 / 次 |
| [YouTube 视频字幕](https://dataxapi.com/zh/apis/youtube/videos/transcript/get.md) | `GET /v1/youtube/videos/transcript/get` | 逐字稿 | $0.0020 / 次 |
| [YouTube 视频评论](https://dataxapi.com/zh/apis/youtube/videos/comments/list.md) | `GET /v1/youtube/videos/comments/list` | 评论列表 | $0.0020 / 次 |

### 帖子 (1)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [YouTube 帖子详情](https://dataxapi.com/zh/apis/youtube/posts/get.md) | `GET /v1/youtube/posts/get` | 内容 | $0.0020 / 次 |

### 频道 (4)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [YouTube 频道搜索](https://dataxapi.com/zh/apis/youtube/channels/search.md) | `GET /v1/youtube/channels/search` | 账号列表 | $0.0020 / 次 |
| [YouTube 频道资料](https://dataxapi.com/zh/apis/youtube/channels/get.md) | `GET /v1/youtube/channels/get` | 账号 | $0.0020 / 次 |
| [YouTube 频道帖子](https://dataxapi.com/zh/apis/youtube/channels/posts/list.md) | `GET /v1/youtube/channels/posts/list` | 内容列表 | $0.0020 / 次 |
| [YouTube 频道视频](https://dataxapi.com/zh/apis/youtube/channels/videos/list.md) | `GET /v1/youtube/channels/videos/list` | 内容列表 | $0.0020 / 次 |

### 评论 (1)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [YouTube 评论回复](https://dataxapi.com/zh/apis/youtube/comments/replies/list.md) | `GET /v1/youtube/comments/replies/list` | 评论列表 | $0.0020 / 次 |

## [微信视频号 API](https://dataxapi.com/zh/apis/wechat_channels.md)

15 个接口 · $0.0150 起

### 备用版 (3)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [微信搜一搜视频号视频搜索（备用版）](https://dataxapi.com/zh/apis/wechat_channels/backup/videos/search.md) | `GET /v1/wechat_channels/backup/videos/search` | 内容列表 | $0.1 / 次 |
| [微信视频号账号资料（备用版）](https://dataxapi.com/zh/apis/wechat_channels/backup/users/get.md) | `GET /v1/wechat_channels/backup/users/get` | 账号 | $0.0300 / 次 |
| [微信视频号用户作品（备用版）](https://dataxapi.com/zh/apis/wechat_channels/backup/users/videos/list.md) | `GET /v1/wechat_channels/backup/users/videos/list` | 内容列表 | $0.0600 / 次 |

### 视频 (5)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [微信搜一搜视频号视频搜索](https://dataxapi.com/zh/apis/wechat_channels/videos/search.md) | `GET /v1/wechat_channels/videos/search` | 内容列表 | $0.0200 / 次 |
| [微信视频号作品详情](https://dataxapi.com/zh/apis/wechat_channels/videos/get.md) | `GET /v1/wechat_channels/videos/get` | 内容 | $0.0200 / 次 |
| [微信视频号作品分享链接](https://dataxapi.com/zh/apis/wechat_channels/videos/share_link/get.md) | `GET /v1/wechat_channels/videos/share_link/get` | 视频号分享链接 | $0.0200 / 次 |
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

## [微信搜一搜 API](https://dataxapi.com/zh/apis/wechat.md)

6 个接口 · $0.0200 起

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

## [微信公众号 API](https://dataxapi.com/zh/apis/wechat_mp.md)

8 个接口 · $0.0200 起

### 文章 (3)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [微信公众号文章详情](https://dataxapi.com/zh/apis/wechat_mp/articles/get.md) | `GET /v1/wechat_mp/articles/get` | 内容 | $0.0200 / 次 |
| [微信公众号文章评论](https://dataxapi.com/zh/apis/wechat_mp/articles/comments/list.md) | `GET /v1/wechat_mp/articles/comments/list` | 评论列表 | $0.0200 / 次 |
| [微信公众号文章互动数据](https://dataxapi.com/zh/apis/wechat_mp/articles/metrics.md) | `GET /v1/wechat_mp/articles/metrics` | 内容 | $0.0200 / 次 |

### 公众号 (4)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [微信公众号账号搜索](https://dataxapi.com/zh/apis/wechat_mp/accounts/search.md) | `GET /v1/wechat_mp/accounts/search` | 账号列表 | $0.05635 / 条 |
| [微信公众号资料](https://dataxapi.com/zh/apis/wechat_mp/accounts/get.md) | `GET /v1/wechat_mp/accounts/get` | 账号 | $0.0200 / 次 |
| [微信公众号主体信息](https://dataxapi.com/zh/apis/wechat_mp/accounts/owner/get.md) | `GET /v1/wechat_mp/accounts/owner/get` | 账号主体 | $0.1 / 次 |
| [微信公众号文章列表](https://dataxapi.com/zh/apis/wechat_mp/accounts/articles/list.md) | `GET /v1/wechat_mp/accounts/articles/list` | 内容列表 | $0.0200 / 次 |

### 评论 (1)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [微信公众号评论回复](https://dataxapi.com/zh/apis/wechat_mp/comments/replies/list.md) | `GET /v1/wechat_mp/comments/replies/list` | 评论列表 | $0.0200 / 次 |

## [Reddit API](https://dataxapi.com/zh/apis/reddit.md)

11 个接口 · $0.0020 起

### 帖子 (5)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [Reddit 帖子搜索](https://dataxapi.com/zh/apis/reddit/posts/search.md) | `GET /v1/reddit/posts/search` | 内容列表 | $0.0020 / 次 |
| [Reddit 帖子详情](https://dataxapi.com/zh/apis/reddit/posts/get.md) | `GET /v1/reddit/posts/get` | 内容 | $0.0020 / 次 |
| [Reddit 视频字幕](https://dataxapi.com/zh/apis/reddit/posts/transcript/get.md) | `GET /v1/reddit/posts/transcript/get` | 逐字稿 | $0.0020 / 次 |
| [Reddit 帖子评论](https://dataxapi.com/zh/apis/reddit/posts/comments/list.md) | `GET /v1/reddit/posts/comments/list` | 评论列表 | $0.0020 / 次 |
| [Reddit 热门帖子](https://dataxapi.com/zh/apis/reddit/posts/trending.md) | `GET /v1/reddit/posts/trending` | 内容列表 | $0.0020 / 次 |

### 用户 (3)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [Reddit 用户资料](https://dataxapi.com/zh/apis/reddit/users/get.md) | `GET /v1/reddit/users/get` | 账号 | $0.0020 / 次 |
| [Reddit 用户帖子](https://dataxapi.com/zh/apis/reddit/users/posts/list.md) | `GET /v1/reddit/users/posts/list` | 内容列表 | $0.0020 / 次 |
| [Reddit 用户活跃社区](https://dataxapi.com/zh/apis/reddit/users/subreddits/list.md) | `GET /v1/reddit/users/subreddits/list` | 社区列表 | $0.0020 / 次 |

### 社区 (2)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [Reddit 社区资料](https://dataxapi.com/zh/apis/reddit/subreddits/get.md) | `GET /v1/reddit/subreddits/get` | 社区 | $0.0020 / 次 |
| [Reddit 社区帖子](https://dataxapi.com/zh/apis/reddit/subreddits/posts/list.md) | `GET /v1/reddit/subreddits/posts/list` | 内容列表 | $0.0020 / 次 |

### 热榜 (1)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [Reddit 趋势搜索词](https://dataxapi.com/zh/apis/reddit/trends/list.md) | `GET /v1/reddit/trends/list` | 热点列表 | $0.0020 / 次 |

## [知乎 API](https://dataxapi.com/zh/apis/zhihu.md)

16 个接口 · $0.0020 起

### 帖子 (1)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [知乎内容搜索](https://dataxapi.com/zh/apis/zhihu/posts/search.md) | `GET /v1/zhihu/posts/search` | 内容列表 | $0.0020 / 次 |

### 文章 (1)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [知乎文章详情](https://dataxapi.com/zh/apis/zhihu/articles/get.md) | `GET /v1/zhihu/articles/get` | 内容 | $0.0020 / 次 |

### 想法 (1)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [知乎想法详情](https://dataxapi.com/zh/apis/zhihu/pins/get.md) | `GET /v1/zhihu/pins/get` | 内容 | $0.0020 / 次 |

### 问题 (2)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [知乎问题详情](https://dataxapi.com/zh/apis/zhihu/questions/get.md) | `GET /v1/zhihu/questions/get` | 内容 | $0.0020 / 次 |
| [知乎问题回答](https://dataxapi.com/zh/apis/zhihu/questions/answers/list.md) | `GET /v1/zhihu/questions/answers/list` | 内容列表 | $0.0020 / 次 |

### 回答 (2)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [知乎回答详情](https://dataxapi.com/zh/apis/zhihu/answers/get.md) | `GET /v1/zhihu/answers/get` | 内容 | $0.0020 / 次 |
| [知乎回答评论](https://dataxapi.com/zh/apis/zhihu/answers/comments/list.md) | `GET /v1/zhihu/answers/comments/list` | 评论列表 | $0.0020 / 次 |

### 用户 (6)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [知乎用户搜索](https://dataxapi.com/zh/apis/zhihu/users/search.md) | `GET /v1/zhihu/users/search` | 账号列表 | $0.0020 / 次 |
| [知乎用户资料](https://dataxapi.com/zh/apis/zhihu/users/get.md) | `GET /v1/zhihu/users/get` | 账号 | $0.0020 / 次 |
| [知乎用户回答](https://dataxapi.com/zh/apis/zhihu/users/answers/list.md) | `GET /v1/zhihu/users/answers/list` | 内容列表 | $0.0020 / 次 |
| [知乎用户文章](https://dataxapi.com/zh/apis/zhihu/users/articles/list.md) | `GET /v1/zhihu/users/articles/list` | 内容列表 | $0.0020 / 次 |
| [知乎用户粉丝列表](https://dataxapi.com/zh/apis/zhihu/users/followers/list.md) | `GET /v1/zhihu/users/followers/list` | 账号列表 | $0.0020 / 次 |
| [知乎用户想法](https://dataxapi.com/zh/apis/zhihu/users/pins/list.md) | `GET /v1/zhihu/users/pins/list` | 内容列表 | $0.0020 / 次 |

### 专栏 (1)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [知乎专栏文章列表](https://dataxapi.com/zh/apis/zhihu/columns/articles/list.md) | `GET /v1/zhihu/columns/articles/list` | 内容列表 | $0.0020 / 次 |

### 评论 (1)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [知乎评论回复](https://dataxapi.com/zh/apis/zhihu/comments/replies/list.md) | `GET /v1/zhihu/comments/replies/list` | 评论列表 | $0.0020 / 次 |

### 热榜 (1)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [知乎热榜](https://dataxapi.com/zh/apis/zhihu/trends/list.md) | `GET /v1/zhihu/trends/list` | 热点列表 | $0.0020 / 次 |

## [Pinterest API](https://dataxapi.com/zh/apis/pinterest.md)

2 个接口 · $0.0020 起

### 图钉 (2)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [Pinterest 图钉搜索](https://dataxapi.com/zh/apis/pinterest/pins/search.md) | `GET /v1/pinterest/pins/search` | 内容列表 | $0.0020 / 次 |
| [Pinterest 图钉详情](https://dataxapi.com/zh/apis/pinterest/pins/get.md) | `GET /v1/pinterest/pins/get` | 内容 | $0.0020 / 次 |

---

怎么调用、怎么计费、怎么处理报错，所有接口都一样：https://dataxapi.com/zh/llms.txt

最后核对于 2026-11-20 07:17 UTC。目录修订号 720fc3ea8dadb865。 [网页版](https://dataxapi.com/zh/apis/)
