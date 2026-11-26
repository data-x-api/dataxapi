# 在 AI 里用微信视频号数据

问 AI 微信视频号上的事，它用实时数据回答：17 个接口，通过 5 个 MCP 工具或一个技能包（Skill），一次 $0.0150 起。贴一段带 Key 的提示词就接好，失败的调用不收费。

更新于 2026-11-21

- 接口：17 (微信视频号，同一种返回格式)
- 价格：$0.0150 起 (按接口各自的标价；失败不收费)
- MCP 工具：`find`, `describe`, `call`, `read_more`, `account` (其中 4 个免费，不用 Key)
- 技能包：[dataxapi-wechat-channels](https://dataxapi.com/skills/dataxapi-wechat-channels.zip)

## 复制这段提示词

> 读 https://dataxapi.com/agents.md，在这个 agent 里帮我接好 DataXAPI。我的 API Key 是 dx_…，之后所有 DataXAPI 的调用都用它。

贴给你的 agent. 它会去读提示词指向的那一页，自己接好。

问微信视频号上的事：

- 这个视频号发什么内容，有多少粉丝？
- 这条视频号视频有多少点赞和评论？
- 这条视频号视频下面观众在说什么？

## 问微信视频号什么，由哪个接口回答

你的 AI 会自己挑接口，拿不准时用 `find` 找。下面是它会找到的那个，和一次调用的价格。

| 你问 | 接口 | 价格 |
| --- | --- | --- |
| 这个视频号发什么内容，有多少粉丝？ | [微信视频号账号资料](https://dataxapi.com/zh/apis/wechat_channels/users/get/) `wechat_channels.users.get` | $0.0200 |
| 这条视频号视频有多少点赞和评论？ | [微信视频号作品详情](https://dataxapi.com/zh/apis/wechat_channels/videos/get/) `wechat_channels.videos.get` | $0.0200 |
| 这条视频号视频下面观众在说什么？ | [微信视频号作品评论](https://dataxapi.com/zh/apis/wechat_channels/videos/comments/list/) `wechat_channels.videos.comments.list` | $0.0200 |

## 一句问话，两次工具调用

问一句微信视频号上的事时发生了什么：AI 免费找到接口，只为一次调用付钱。从清单里一眼看得出该用哪个接口时，连找都省了。

> 这个视频号发什么内容，有多少粉丝？

|  |  |  |
| --- | --- | --- |
| `find({ query: "这个视频号发什么内容，有多少粉丝？", platform: "wechat_channels" })` | 找到 wechat_channels.users.get · 一次 $0.0200 | 免费 |
| `call({ capability: "wechat_channels.users.get", id: "v2_060000231003b20faec8c5e5811dc3ddce02ec30b0772029a703e1b9f446ba147658bbcfab81@finder", max_price: "0.02" })` | 一条账号 · 精简档 | $0.0200 |

2 次工具调用 · 1 次扣费 · $0.0200. 拿到一条账号，都是标准格式。AI 据此回答，并说明这次花了多少。

## 微信视频号技能包

给会读技能的 agent（Claude Code、Codex、Cursor）：一个 SKILL.md，列出微信视频号的 17 个接口和价格，怎么用 MCP、命令行或 REST 调用，怎么翻页，以及哪个接口回答哪类问题。

对你的 AI 说：帮我从 https://dataxapi.com/skills/dataxapi-wechat-channels.zip 装上 DataXAPI 技能 dataxapi-wechat-channels。

## AI 能调的微信视频号接口，全部 17 个

每一个都是 AI 传给 `call` 的接口编号。点名字进接口页：参数、字段和一份录好的返回。

| 接口 | 接口编号 | 价格 |
| --- | --- | --- |
| [微信视频号账号资料](https://dataxapi.com/zh/apis/wechat_channels/users/get/) | `wechat_channels.users.get` | $0.0200 |
| [微信视频号作品详情](https://dataxapi.com/zh/apis/wechat_channels/videos/get/) | `wechat_channels.videos.get` | $0.0200 |
| [微信视频号作品评论](https://dataxapi.com/zh/apis/wechat_channels/videos/comments/list/) | `wechat_channels.videos.comments.list` | $0.0200 |
| [微信视频号作品分享链接](https://dataxapi.com/zh/apis/wechat_channels/videos/share_link/get/) | `wechat_channels.videos.share_link.get` | $0.0200 |
| [微信视频号账号的合集](https://dataxapi.com/zh/apis/wechat_channels/users/collections/list/) | `wechat_channels.users.collections.list` | $0.0200 |
| [微信视频号合集里的视频](https://dataxapi.com/zh/apis/wechat_channels/collections/videos/list/) | `wechat_channels.collections.videos.list` | $0.0200 |
| [微信视频号用户作品](https://dataxapi.com/zh/apis/wechat_channels/users/videos/list/) | `wechat_channels.users.videos.list` | $0.0200 |
| [微信搜一搜视频号视频搜索](https://dataxapi.com/zh/apis/wechat_channels/videos/search/) | `wechat_channels.videos.search` | $0.0200 |
| [微信视频号账号资料（备用版）](https://dataxapi.com/zh/apis/wechat_channels/backup/users/get/) | `wechat_channels.backup.users.get` | $0.0300 |
| [微信视频号用户作品（备用版）](https://dataxapi.com/zh/apis/wechat_channels/backup/users/videos/list/) | `wechat_channels.backup.users.videos.list` | $0.0600 |
| [微信搜一搜视频号视频搜索（备用版）](https://dataxapi.com/zh/apis/wechat_channels/backup/videos/search/) | `wechat_channels.backup.videos.search` | $0.1 |
| [微信视频号账号搜索](https://dataxapi.com/zh/apis/wechat_channels/users/search/) | `wechat_channels.users.search` | $0.0600 |
| [微信视频号作品互动数据](https://dataxapi.com/zh/apis/wechat_channels/videos/metrics/) | `wechat_channels.videos.metrics` | $0.0150 |
| [微信视频号评论回复](https://dataxapi.com/zh/apis/wechat_channels/comments/replies/list/) | `wechat_channels.comments.replies.list` | $0.0150 |
| [微信视频号直播回放](https://dataxapi.com/zh/apis/wechat_channels/users/live_replays/list/) | `wechat_channels.users.live_replays.list` | $0.0200 |
| [视频号视频下载（文件地址和解密）](https://dataxapi.com/zh/apis/wechat_channels/videos/media/get/) | `wechat_channels.videos.media.get` | $0.0200 |
| [视频号视频转文字（逐字稿）](https://dataxapi.com/zh/apis/wechat_channels/videos/transcript/get/) | `wechat_channels.videos.transcript.get` | 每次 $0.0200，识别的视频另加每分钟 $0.0038 |

[微信视频号的全部价格和扣费规则 →](https://dataxapi.com/zh/pricing/wechat_channels/) · [微信视频号 API](https://dataxapi.com/zh/apis/wechat_channels/) · [MCP 服务](https://dataxapi.com/zh/mcp/)

## 常见问题

### 在 AI 里问微信视频号要花多少钱？

找接口、看参数、接着读已有结果都免费。一次调用 $0.0150 到 $0.1，微信视频号的每个接口各有标价。失败的调用不收费。

### 需要微信视频号账号吗？

不需要。不用登录微信视频号，也不用交 Cookie：AI 只用你的 DataXAPI Key。

### 哪些 AI 客户端能用？

支持 MCP 的都能用。贴上那段提示词，Claude Code、Cursor、Codex 会自己接好；其他客户端手动填服务地址和 Key。

### 有了 MCP 还要装技能包吗？

二选一就够。MCP 给 AI 工具；技能包告诉会读技能的 agent 该用哪个接口、花多少钱，在它调用之前。

### AI 会不会花超？

每把 Key 可以设每天或每月的预算，每次调用可以带 `max_price`。余额用完调用就停，不会赊账。

## 其他平台也能这样接进 AI

[抖音](https://dataxapi.com/zh/mcp/douyin/) · [B站](https://dataxapi.com/zh/mcp/bilibili/) · [快手](https://dataxapi.com/zh/mcp/kuaishou/) · [Telegram](https://dataxapi.com/zh/mcp/telegram/) · [X（推特）](https://dataxapi.com/zh/mcp/x/) · [Facebook](https://dataxapi.com/zh/mcp/facebook/) · [Google 广告](https://dataxapi.com/zh/mcp/google/) · [LinkedIn](https://dataxapi.com/zh/mcp/linkedin/) · [Meta 广告库](https://dataxapi.com/zh/mcp/meta/) · [Threads](https://dataxapi.com/zh/mcp/threads/) · [Instagram](https://dataxapi.com/zh/mcp/instagram/) · [TikTok](https://dataxapi.com/zh/mcp/tiktok/) · [微博](https://dataxapi.com/zh/mcp/weibo/) · [小红书](https://dataxapi.com/zh/mcp/xiaohongshu/) · [YouTube](https://dataxapi.com/zh/mcp/youtube/) · [微信搜一搜](https://dataxapi.com/zh/mcp/wechat/) · [微信公众号](https://dataxapi.com/zh/mcp/wechat_mp/) · [Reddit](https://dataxapi.com/zh/mcp/reddit/) · [知乎](https://dataxapi.com/zh/mcp/zhihu/) · [Pinterest](https://dataxapi.com/zh/mcp/pinterest/)

---

按目录修订号 0051cce45e9530b9、价目版本 22生成。 [网页版](https://dataxapi.com/zh/mcp/wechat_channels/)
