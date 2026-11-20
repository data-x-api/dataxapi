# 在 AI 里用抖音数据

问 AI 抖音上的事，它用实时数据回答：38 个接口，通过 5 个 MCP 工具或一个技能包（Skill），一次 $0.0020 起。贴一段带 Key 的提示词就接好，失败的调用不收费。

更新于 2026-11-10

- 接口：38 (抖音，同一种返回格式)
- 价格：$0.0020 起 (按接口各自的标价；失败不收费)
- MCP 工具：`find`, `describe`, `call`, `read_more`, `account` (其中 4 个免费，不用 Key)
- 技能包：[dataxapi-douyin](https://dataxapi.com/skills/dataxapi-douyin.zip)

## 复制这段提示词

> 读 https://dataxapi.com/agents.md，在这个 agent 里帮我接好 DataXAPI。我的 API Key 是 dx_…，之后所有 DataXAPI 的调用都用它。

贴给你的 agent. 它会去读提示词指向的那一页，自己接好。

问抖音上的事：

- 抖音热搜榜现在前几名是什么？
- “露营”这个词在巨量算数上近 30 天的热度怎么走？
- 这个达人在星图上接一条视频报价多少？
- 这条抖音视频的评论区在说什么？

## 问抖音什么，由哪个接口回答

你的 AI 会自己挑接口，拿不准时用 `find` 找。下面是它会找到的那个，和一次调用的价格。

| 你问 | 接口 | 价格 |
| --- | --- | --- |
| 抖音热搜榜现在前几名是什么？ | [抖音热榜](https://dataxapi.com/zh/apis/douyin/trends/list/) `douyin.trends.list` | $0.0020 |
| “露营”这个词在巨量算数上近 30 天的热度怎么走？ | [抖音巨量算数关键词热度趋势](https://dataxapi.com/zh/apis/douyin/index/keywords/history/) `douyin.index.keywords.history` | $0.0060 |
| 这个达人在星图上接一条视频报价多少？ | [抖音星图达人商业报价](https://dataxapi.com/zh/apis/douyin/xingtu/creators/rates/get/) `douyin.xingtu.creators.rates.get` | $0.0400 |
| 这条抖音视频的评论区在说什么？ | [抖音视频评论](https://dataxapi.com/zh/apis/douyin/videos/comments/list/) `douyin.videos.comments.list` | $0.0020 |

## 一句问话，两次工具调用

问一句抖音上的事时发生了什么：AI 免费找到接口，只为一次调用付钱。从清单里一眼看得出该用哪个接口时，连找都省了。

> 抖音热搜榜现在前几名是什么？

|  |  |  |
| --- | --- | --- |
| `find({ query: "抖音热搜榜现在前几名是什么？", platform: "douyin" })` | 找到 douyin.trends.list · 一次 $0.0020 | 免费 |
| `call({ capability: "douyin.trends.list", max_price: "0.002" })` | 最多 50 条热点 · 精简档 | $0.0020 |

2 次工具调用 · 1 次扣费 · $0.0020. 拿到最多 50 条热点，都是标准格式。AI 据此回答，并说明这次花了多少。

## 抖音技能包

给会读技能的 agent（Claude Code、Codex、Cursor）：一个 SKILL.md，列出抖音的 38 个接口和价格，怎么用 MCP、命令行或 REST 调用，怎么翻页，以及哪个接口回答哪类问题。

对你的 AI 说：帮我从 https://dataxapi.com/skills/dataxapi-douyin.zip 装上 DataXAPI 技能 dataxapi-douyin。

## AI 能调的抖音接口，全部 38 个

每一个都是 AI 传给 `call` 的接口编号。点名字进接口页：参数、字段和一份录好的返回。

| 接口 | 接口编号 | 价格 |
| --- | --- | --- |
| [抖音评论回复](https://dataxapi.com/zh/apis/douyin/comments/replies/list/) | `douyin.comments.replies.list` | $0.0020 |
| [抖音话题视频](https://dataxapi.com/zh/apis/douyin/hashtags/videos/list/) | `douyin.hashtags.videos.list` | $0.0020 |
| [抖音巨量算数品牌指数趋势](https://dataxapi.com/zh/apis/douyin/index/brands/history/) | `douyin.index.brands.history` | $0.0020 |
| [抖音巨量算数品牌指数对比](https://dataxapi.com/zh/apis/douyin/index/brands/metrics/) | `douyin.index.brands.metrics` | $0.0020 |
| [抖音巨量算数达人热门视频](https://dataxapi.com/zh/apis/douyin/index/creators/videos/list/) | `douyin.index.creators.videos.list` | $0.0020 |
| [抖音巨量算数达人粉丝画像](https://dataxapi.com/zh/apis/douyin/index/creators/audience/get/) | `douyin.index.creators.audience.get` | $0.0020 |
| [抖音巨量算数达人核心指标](https://dataxapi.com/zh/apis/douyin/index/creators/metrics/) | `douyin.index.creators.metrics` | $0.0020 |
| [抖音巨量算数关键词人群画像](https://dataxapi.com/zh/apis/douyin/index/keywords/audience/get/) | `douyin.index.keywords.audience.get` | $0.0020 |
| [抖音巨量算数关键词热度趋势](https://dataxapi.com/zh/apis/douyin/index/keywords/history/) | `douyin.index.keywords.history` | $0.0060 |
| [抖音巨量算数关联词](https://dataxapi.com/zh/apis/douyin/index/keywords/related/) | `douyin.index.keywords.related` | $0.0020 |
| [抖音巨量算数实时热点](https://dataxapi.com/zh/apis/douyin/index/trends/list/) | `douyin.index.trends.list` | $0.0020 |
| [抖音巨量算数关键词热门视频](https://dataxapi.com/zh/apis/douyin/index/videos/search/) | `douyin.index.videos.search` | $0.0020 |
| [抖音热榜](https://dataxapi.com/zh/apis/douyin/trends/list/) | `douyin.trends.list` | $0.0020 |
| [抖音用户资料](https://dataxapi.com/zh/apis/douyin/users/get/) | `douyin.users.get` | $0.0020 |
| [抖音达人互动与粉丝趋势](https://dataxapi.com/zh/apis/douyin/users/history/) | `douyin.users.history` | $0.0020 |
| [抖音用户搜索](https://dataxapi.com/zh/apis/douyin/users/search/) | `douyin.users.search` | $0.0020 |
| [抖音用户视频](https://dataxapi.com/zh/apis/douyin/users/videos/list/) | `douyin.users.videos.list` | $0.0020 |
| [抖音视频评论](https://dataxapi.com/zh/apis/douyin/videos/comments/list/) | `douyin.videos.comments.list` | $0.0020 |
| [抖音视频详情](https://dataxapi.com/zh/apis/douyin/videos/get/) | `douyin.videos.get` | $0.0020 |
| [抖音视频播放量](https://dataxapi.com/zh/apis/douyin/videos/metrics/) | `douyin.videos.metrics` | $0.0020 |
| [抖音相关视频](https://dataxapi.com/zh/apis/douyin/videos/related/) | `douyin.videos.related` | $0.0020 |
| [抖音视频搜索](https://dataxapi.com/zh/apis/douyin/videos/search/) | `douyin.videos.search` | $0.0200 |
| [抖音视频榜](https://dataxapi.com/zh/apis/douyin/videos/trending/) | `douyin.videos.trending` | $0.0020 |
| [抖音星图达人商业报价](https://dataxapi.com/zh/apis/douyin/xingtu/creators/rates/get/) | `douyin.xingtu.creators.rates.get` | $0.0400 |
| [抖音星图达人搜索](https://dataxapi.com/zh/apis/douyin/xingtu/creators/search/) | `douyin.xingtu.creators.search` | $0.0040 |
| [抖音星图达人资料](https://dataxapi.com/zh/apis/douyin/xingtu/creators/get/) | `douyin.xingtu.creators.get` | $0.0040 |
| [抖音星图达人粉丝画像](https://dataxapi.com/zh/apis/douyin/xingtu/creators/audience/get/) | `douyin.xingtu.creators.audience.get` | $0.0040 |
| [抖音星图达人传播数据](https://dataxapi.com/zh/apis/douyin/xingtu/creators/metrics/) | `douyin.xingtu.creators.metrics` | $0.0040 |
| [抖音星图达人作品表现](https://dataxapi.com/zh/apis/douyin/xingtu/creators/videos/list/) | `douyin.xingtu.creators.videos.list` | $0.0040 |
| [抖音星图达人内容热词](https://dataxapi.com/zh/apis/douyin/xingtu/creators/keywords/get/) | `douyin.xingtu.creators.keywords.get` | $0.0020 |
| [抖音星图达人星图指数](https://dataxapi.com/zh/apis/douyin/xingtu/creators/scores/get/) | `douyin.xingtu.creators.scores.get` | $0.0080 |
| [抖音星图达人内容分布](https://dataxapi.com/zh/apis/douyin/xingtu/creators/content_mix/get/) | `douyin.xingtu.creators.content_mix.get` | $0.0040 |
| [抖音星图达人转化能力](https://dataxapi.com/zh/apis/douyin/xingtu/creators/conversion/get/) | `douyin.xingtu.creators.conversion.get` | $0.0040 |
| [抖音星图营销活动日历](https://dataxapi.com/zh/apis/douyin/xingtu/campaigns/list/) | `douyin.xingtu.campaigns.list` | $0.0040 |
| [抖音星图视频数据报告（播放量、完播率）](https://dataxapi.com/zh/apis/douyin/xingtu/videos/get/) | `douyin.xingtu.videos.get` | $0.0040 |
| [抖音搜索框联想词](https://dataxapi.com/zh/apis/douyin/keywords/related/) | `douyin.keywords.related` | $0.0200 |
| [抖音用户视频（备用版）](https://dataxapi.com/zh/apis/douyin/backup/users/videos/list/) | `douyin.backup.users.videos.list` | $0.0300 |
| [抖音视频搜索（备用版）](https://dataxapi.com/zh/apis/douyin/backup/videos/search/) | `douyin.backup.videos.search` | $0.0300 |

[抖音的全部价格和扣费规则 →](https://dataxapi.com/zh/pricing/douyin/) · [抖音 API](https://dataxapi.com/zh/apis/douyin/) · [MCP 服务](https://dataxapi.com/zh/mcp/)

## 常见问题

### 在 AI 里问抖音要花多少钱？

找接口、看参数、接着读已有结果都免费。一次调用 $0.0020 到 $0.0400，抖音的每个接口各有标价。失败的调用不收费。

### 需要抖音账号吗？

不需要。不用登录抖音，也不用交 Cookie：AI 只用你的 DataXAPI Key。

### 哪些 AI 客户端能用？

支持 MCP 的都能用。贴上那段提示词，Claude Code、Cursor、Codex 会自己接好；其他客户端手动填服务地址和 Key。

### 有了 MCP 还要装技能包吗？

二选一就够。MCP 给 AI 工具；技能包告诉会读技能的 agent 该用哪个接口、花多少钱，在它调用之前。

### AI 会不会花超？

每把 Key 可以设每天或每月的预算，每次调用可以带 `max_price`。余额用完调用就停，不会赊账。

## 其他平台也能这样接进 AI

[B站](https://dataxapi.com/zh/mcp/bilibili/) · [快手](https://dataxapi.com/zh/mcp/kuaishou/) · [Telegram](https://dataxapi.com/zh/mcp/telegram/) · [X（推特）](https://dataxapi.com/zh/mcp/x/) · [Facebook](https://dataxapi.com/zh/mcp/facebook/) · [Google 广告](https://dataxapi.com/zh/mcp/google/) · [LinkedIn](https://dataxapi.com/zh/mcp/linkedin/) · [Meta 广告库](https://dataxapi.com/zh/mcp/meta/) · [Threads](https://dataxapi.com/zh/mcp/threads/) · [Instagram](https://dataxapi.com/zh/mcp/instagram/) · [TikTok](https://dataxapi.com/zh/mcp/tiktok/) · [微博](https://dataxapi.com/zh/mcp/weibo/) · [小红书](https://dataxapi.com/zh/mcp/xiaohongshu/) · [YouTube](https://dataxapi.com/zh/mcp/youtube/) · [微信视频号](https://dataxapi.com/zh/mcp/wechat_channels/) · [微信搜一搜](https://dataxapi.com/zh/mcp/wechat/) · [微信公众号](https://dataxapi.com/zh/mcp/wechat_mp/) · [Reddit](https://dataxapi.com/zh/mcp/reddit/) · [知乎](https://dataxapi.com/zh/mcp/zhihu/) · [Pinterest](https://dataxapi.com/zh/mcp/pinterest/)

---

按目录修订号 720fc3ea8dadb865、价目版本 19生成。 [网页版](https://dataxapi.com/zh/mcp/douyin/)
