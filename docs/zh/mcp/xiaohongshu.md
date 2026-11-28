# 在 AI 里用小红书数据

问 AI 小红书上的事，它用实时数据回答：33 个接口，通过 5 个 MCP 工具或一个技能包（Skill），一次 $0.0200 起。贴一段带 Key 的提示词就接好，失败的调用不收费。

更新于 2026-11-21

- 接口：33 (小红书，同一种返回格式)
- 价格：$0.0200 起 (按接口各自的标价；失败不收费)
- MCP 工具：`find`, `describe`, `call`, `read_more`, `account` (其中 4 个免费，不用 Key)
- 技能包：[dataxapi-xiaohongshu](https://dataxapi.com/skills/dataxapi-xiaohongshu.zip)

## 复制这段提示词

> 读 https://dataxapi.com/agents.md，在这个 agent 里帮我接好 DataXAPI。我的 API Key 是 dx_…，之后所有 DataXAPI 的调用都用它。

贴给你的 agent. 它会去读提示词指向的那一页，自己接好。

问小红书上的事：

- 搜小红书上测评防晒霜的笔记。
- 蒲公英上有哪些写家居的博主？
- 这篇小红书笔记下面的评论在说什么？

## 问小红书什么，由哪个接口回答

你的 AI 会自己挑接口，拿不准时用 `find` 找。下面是它会找到的那个，和一次调用的价格。

| 你问 | 接口 | 价格 |
| --- | --- | --- |
| 搜小红书上测评防晒霜的笔记。 | [小红书笔记搜索](https://dataxapi.com/zh/apis/xiaohongshu/notes/search/) `xiaohongshu.notes.search` | $0.0200 |
| 蒲公英上有哪些写家居的博主？ | [小红书蒲公英博主搜索](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/search/) `xiaohongshu.pgy.creators.search` | $0.0400 |
| 这篇小红书笔记下面的评论在说什么？ | [小红书笔记评论](https://dataxapi.com/zh/apis/xiaohongshu/notes/comments/list/) `xiaohongshu.notes.comments.list` | $0.0200 |

## 一句问话，两次工具调用

问一句小红书上的事时发生了什么：AI 免费找到接口，只为一次调用付钱。从清单里一眼看得出该用哪个接口时，连找都省了。

> 搜小红书上测评防晒霜的笔记。

|  |  |  |
| --- | --- | --- |
| `find({ query: "搜小红书上测评防晒霜的笔记。", platform: "xiaohongshu" })` | 找到 xiaohongshu.notes.search · 一次 $0.0200 | 免费 |
| `call({ capability: "xiaohongshu.notes.search", query: "咖啡", max_price: "0.02" })` | 最多 20 条内容 · 精简档 | $0.0200 |

2 次工具调用 · 1 次扣费 · $0.0200. 拿到最多 20 条内容，都是标准格式。AI 据此回答，并说明这次花了多少。

## 小红书技能包

给会读技能的 agent（Claude Code、Codex、Cursor）：一个 SKILL.md，列出小红书的 33 个接口和价格，怎么用 MCP、命令行或 REST 调用，怎么翻页，以及哪个接口回答哪类问题。

对你的 AI 说：帮我从 https://dataxapi.com/skills/dataxapi-xiaohongshu.zip 装上 DataXAPI 技能 dataxapi-xiaohongshu。

## AI 能调的小红书接口，全部 33 个

每一个都是 AI 传给 `call` 的接口编号。点名字进接口页：参数、字段和一份录好的返回。

| 接口 | 接口编号 | 价格 |
| --- | --- | --- |
| [小红书图片搜索](https://dataxapi.com/zh/apis/xiaohongshu/images/search/) | `xiaohongshu.images.search` | $0.0200 |
| [小红书笔记详情](https://dataxapi.com/zh/apis/xiaohongshu/notes/get/) | `xiaohongshu.notes.get` | $0.0200 |
| [小红书评论回复](https://dataxapi.com/zh/apis/xiaohongshu/comments/replies/list/) | `xiaohongshu.comments.replies.list` | $0.0200 |
| [小红书笔记评论](https://dataxapi.com/zh/apis/xiaohongshu/notes/comments/list/) | `xiaohongshu.notes.comments.list` | $0.0200 |
| [小红书笔记搜索](https://dataxapi.com/zh/apis/xiaohongshu/notes/search/) | `xiaohongshu.notes.search` | $0.0200 |
| [小红书蒲公英关键词逐日搜索指数](https://dataxapi.com/zh/apis/xiaohongshu/pgy/keywords/history/) | `xiaohongshu.pgy.keywords.history` | $0.0400 |
| [小红书蒲公英关联词](https://dataxapi.com/zh/apis/xiaohongshu/pgy/keywords/related/) | `xiaohongshu.pgy.keywords.related` | $0.0400 |
| [小红书话题笔记](https://dataxapi.com/zh/apis/xiaohongshu/topics/notes/list/) | `xiaohongshu.topics.notes.list` | $0.0200 |
| [小红书话题详情](https://dataxapi.com/zh/apis/xiaohongshu/topics/get/) | `xiaohongshu.topics.get` | $0.0200 |
| [小红书热点](https://dataxapi.com/zh/apis/xiaohongshu/trends/list/) | `xiaohongshu.trends.list` | $0.0200 |
| [小红书用户资料](https://dataxapi.com/zh/apis/xiaohongshu/users/get/) | `xiaohongshu.users.get` | $0.0200 |
| [小红书用户笔记](https://dataxapi.com/zh/apis/xiaohongshu/users/notes/list/) | `xiaohongshu.users.notes.list` | $0.0200 |
| [小红书用户搜索](https://dataxapi.com/zh/apis/xiaohongshu/users/search/) | `xiaohongshu.users.search` | $0.0200 |
| [小红书商品详情](https://dataxapi.com/zh/apis/xiaohongshu/shop/products/get/) | `xiaohongshu.shop.products.get` | $0.0200 |
| [小红书商品评价](https://dataxapi.com/zh/apis/xiaohongshu/shop/products/reviews/list/) | `xiaohongshu.shop.products.reviews.list` | $0.0200 |
| [小红书商品搜索](https://dataxapi.com/zh/apis/xiaohongshu/shop/products/search/) | `xiaohongshu.shop.products.search` | $0.0200 |
| [小红书蒲公英博主搜索](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/search/) | `xiaohongshu.pgy.creators.search` | $0.0400 |
| [小红书蒲公英博主详情](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/get/) | `xiaohongshu.pgy.creators.get` | $0.0400 |
| [小红书蒲公英博主粉丝画像](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/audience/get/) | `xiaohongshu.pgy.creators.audience.get` | $0.0400 |
| [小红书蒲公英博主数据表现](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/metrics/) | `xiaohongshu.pgy.creators.metrics` | $0.0400 |
| [小红书蒲公英博主笔记](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/notes/list/) | `xiaohongshu.pgy.creators.notes.list` | $0.0400 |
| [小红书搜索框联想词](https://dataxapi.com/zh/apis/xiaohongshu/keywords/related/) | `xiaohongshu.keywords.related` | $0.0200 |
| [小红书视频笔记详情（视频地址和字幕）](https://dataxapi.com/zh/apis/xiaohongshu/videos/get/) | `xiaohongshu.videos.get` | $0.0200 |
| [小红书视频转文字（文案提取、逐字稿）](https://dataxapi.com/zh/apis/xiaohongshu/videos/transcript/get/) | `xiaohongshu.videos.transcript.get` | 每次 $0.0200，识别的视频另加每分钟 $0.0038 |
| [小红书蒲公英博主粉丝趋势](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/followers/history/) | `xiaohongshu.pgy.creators.followers.history` | $0.0400 |
| [小红书蒲公英相似博主](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/related/) | `xiaohongshu.pgy.creators.related` | $0.0400 |
| [小红书蒲公英内容广场热门笔记](https://dataxapi.com/zh/apis/xiaohongshu/pgy/notes/trending/) | `xiaohongshu.pgy.notes.trending` | $0.0400 |
| [小红书蒲公英博主合作成本和数据概览](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/costs/metrics/) | `xiaohongshu.pgy.creators.costs.metrics` | $0.0400 |
| [小红书蒲公英博主粉丝概览](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/followers/metrics/) | `xiaohongshu.pgy.creators.followers.metrics` | $0.0400 |
| [小红书蒲公英博主核心数据趋势](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/costs/history/) | `xiaohongshu.pgy.creators.costs.history` | $0.0400 |
| [小红书蒲公英笔记数据](https://dataxapi.com/zh/apis/xiaohongshu/pgy/notes/get/) | `xiaohongshu.pgy.notes.get` | $0.0400 |
| [小红书无水印原图和实况图下载地址](https://dataxapi.com/zh/apis/xiaohongshu/notes/media/get/) | `xiaohongshu.notes.media.get` | $0.0200 |
| [小红书无水印视频下载地址（各档清晰度和字幕）](https://dataxapi.com/zh/apis/xiaohongshu/videos/media/get/) | `xiaohongshu.videos.media.get` | $0.0200 |

[小红书的全部价格和扣费规则 →](https://dataxapi.com/zh/pricing/xiaohongshu/) · [小红书 API](https://dataxapi.com/zh/apis/xiaohongshu/) · [MCP 服务](https://dataxapi.com/zh/mcp/)

## 常见问题

### 在 AI 里问小红书要花多少钱？

找接口、看参数、接着读已有结果都免费。一次调用 $0.0200 到 $0.0400，小红书的每个接口各有标价。失败的调用不收费。

### 需要小红书账号吗？

不需要。不用登录小红书，也不用交 Cookie：AI 只用你的 DataXAPI Key。

### 哪些 AI 客户端能用？

支持 MCP 的都能用。贴上那段提示词，Claude Code、Cursor、Codex 会自己接好；其他客户端手动填服务地址和 Key。

### 有了 MCP 还要装技能包吗？

二选一就够。MCP 给 AI 工具；技能包告诉会读技能的 agent 该用哪个接口、花多少钱，在它调用之前。

### AI 会不会花超？

每把 Key 可以设每天或每月的预算，每次调用可以带 `max_price`。余额用完调用就停，不会赊账。

## 其他平台也能这样接进 AI

[抖音](https://dataxapi.com/zh/mcp/douyin/) · [B站](https://dataxapi.com/zh/mcp/bilibili/) · [快手](https://dataxapi.com/zh/mcp/kuaishou/) · [Telegram](https://dataxapi.com/zh/mcp/telegram/) · [X（推特）](https://dataxapi.com/zh/mcp/x/) · [Facebook](https://dataxapi.com/zh/mcp/facebook/) · [Google 广告](https://dataxapi.com/zh/mcp/google/) · [LinkedIn](https://dataxapi.com/zh/mcp/linkedin/) · [Meta 广告库](https://dataxapi.com/zh/mcp/meta/) · [Threads](https://dataxapi.com/zh/mcp/threads/) · [Instagram](https://dataxapi.com/zh/mcp/instagram/) · [TikTok](https://dataxapi.com/zh/mcp/tiktok/) · [微博](https://dataxapi.com/zh/mcp/weibo/) · [YouTube](https://dataxapi.com/zh/mcp/youtube/) · [微信视频号](https://dataxapi.com/zh/mcp/wechat_channels/) · [微信搜一搜](https://dataxapi.com/zh/mcp/wechat/) · [微信公众号](https://dataxapi.com/zh/mcp/wechat_mp/) · [Reddit](https://dataxapi.com/zh/mcp/reddit/) · [知乎](https://dataxapi.com/zh/mcp/zhihu/) · [Pinterest](https://dataxapi.com/zh/mcp/pinterest/)

---

按目录修订号 ceced48b38f71468、价目版本 30生成。 [网页版](https://dataxapi.com/zh/mcp/xiaohongshu/)
