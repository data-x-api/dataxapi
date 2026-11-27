# 在 AI 里用 Telegram 数据

问 AI Telegram 上的事，它用实时数据回答：3 个接口，通过 5 个 MCP 工具或一个技能包（Skill），一次 $0.0020 起。贴一段带 Key 的提示词就接好，失败的调用不收费。

更新于 2026-11-06

- 接口：3 (Telegram，同一种返回格式)
- 价格：$0.0020 起 (按接口各自的标价；失败不收费)
- MCP 工具：`find`, `describe`, `call`, `read_more`, `account` (其中 4 个免费，不用 Key)
- 技能包：[dataxapi-telegram](https://dataxapi.com/skills/dataxapi-telegram.zip)

## 复制这段提示词

> 读 https://dataxapi.com/agents.md，在这个 agent 里帮我接好 DataXAPI。我的 API Key 是 dx_…，之后所有 DataXAPI 的调用都用它。

贴给你的 agent. 它会去读提示词指向的那一页，自己接好。

问 Telegram 上的事：

- 这个 Telegram 频道最近发了什么？
- 这个 Telegram 频道有多少订阅者？
- 取这条 Telegram 消息的正文。

## 问 Telegram 什么，由哪个接口回答

你的 AI 会自己挑接口，拿不准时用 `find` 找。下面是它会找到的那个，和一次调用的价格。

| 你问 | 接口 | 价格 |
| --- | --- | --- |
| 这个 Telegram 频道最近发了什么？ | [Telegram 频道消息](https://dataxapi.com/zh/apis/telegram/channels/messages/list/) `telegram.channels.messages.list` | $0.0020 |
| 这个 Telegram 频道有多少订阅者？ | [Telegram 频道资料](https://dataxapi.com/zh/apis/telegram/channels/get/) `telegram.channels.get` | $0.0020 |
| 取这条 Telegram 消息的正文。 | [Telegram 单条消息](https://dataxapi.com/zh/apis/telegram/messages/get/) `telegram.messages.get` | $0.0020 |

## 一句问话，两次工具调用

问一句 Telegram 上的事时发生了什么：AI 免费找到接口，只为一次调用付钱。从清单里一眼看得出该用哪个接口时，连找都省了。

> 这个 Telegram 频道最近发了什么？

|  |  |  |
| --- | --- | --- |
| `find({ query: "这个 Telegram 频道最近发了什么？", platform: "telegram" })` | 找到 telegram.channels.messages.list · 一次 $0.0020 | 免费 |
| `call({ capability: "telegram.channels.messages.list", username: "telegram", max_price: "0.002" })` | 最多 20 条内容 · 精简档 | $0.0020 |

2 次工具调用 · 1 次扣费 · $0.0020. 拿到最多 20 条内容，都是标准格式。AI 据此回答，并说明这次花了多少。

## Telegram 技能包

给会读技能的 agent（Claude Code、Codex、Cursor）：一个 SKILL.md，列出 Telegram 的 3 个接口和价格，怎么用 MCP、命令行或 REST 调用，怎么翻页，以及哪个接口回答哪类问题。

对你的 AI 说：帮我从 https://dataxapi.com/skills/dataxapi-telegram.zip 装上 DataXAPI 技能 dataxapi-telegram。

## AI 能调的 Telegram 接口，全部 3 个

每一个都是 AI 传给 `call` 的接口编号。点名字进接口页：参数、字段和一份录好的返回。

| 接口 | 接口编号 | 价格 |
| --- | --- | --- |
| [Telegram 频道资料](https://dataxapi.com/zh/apis/telegram/channels/get/) | `telegram.channels.get` | $0.0020 |
| [Telegram 频道消息](https://dataxapi.com/zh/apis/telegram/channels/messages/list/) | `telegram.channels.messages.list` | $0.0020 |
| [Telegram 单条消息](https://dataxapi.com/zh/apis/telegram/messages/get/) | `telegram.messages.get` | $0.0020 |

[Telegram 的全部价格和扣费规则 →](https://dataxapi.com/zh/pricing/telegram/) · [Telegram API](https://dataxapi.com/zh/apis/telegram/) · [MCP 服务](https://dataxapi.com/zh/mcp/)

## 常见问题

### 在 AI 里问 Telegram 要花多少钱？

找接口、看参数、接着读已有结果都免费。一次调用 $0.0020，Telegram 的每个接口各有标价。失败的调用不收费。

### 需要 Telegram 账号吗？

不需要。不用登录 Telegram，也不用交 Cookie：AI 只用你的 DataXAPI Key。

### 哪些 AI 客户端能用？

支持 MCP 的都能用。贴上那段提示词，Claude Code、Cursor、Codex 会自己接好；其他客户端手动填服务地址和 Key。

### 有了 MCP 还要装技能包吗？

二选一就够。MCP 给 AI 工具；技能包告诉会读技能的 agent 该用哪个接口、花多少钱，在它调用之前。

### AI 会不会花超？

每把 Key 可以设每天或每月的预算，每次调用可以带 `max_price`。余额用完调用就停，不会赊账。

## 其他平台也能这样接进 AI

[抖音](https://dataxapi.com/zh/mcp/douyin/) · [B站](https://dataxapi.com/zh/mcp/bilibili/) · [快手](https://dataxapi.com/zh/mcp/kuaishou/) · [X（推特）](https://dataxapi.com/zh/mcp/x/) · [Facebook](https://dataxapi.com/zh/mcp/facebook/) · [Google 广告](https://dataxapi.com/zh/mcp/google/) · [LinkedIn](https://dataxapi.com/zh/mcp/linkedin/) · [Meta 广告库](https://dataxapi.com/zh/mcp/meta/) · [Threads](https://dataxapi.com/zh/mcp/threads/) · [Instagram](https://dataxapi.com/zh/mcp/instagram/) · [TikTok](https://dataxapi.com/zh/mcp/tiktok/) · [微博](https://dataxapi.com/zh/mcp/weibo/) · [小红书](https://dataxapi.com/zh/mcp/xiaohongshu/) · [YouTube](https://dataxapi.com/zh/mcp/youtube/) · [微信视频号](https://dataxapi.com/zh/mcp/wechat_channels/) · [微信搜一搜](https://dataxapi.com/zh/mcp/wechat/) · [微信公众号](https://dataxapi.com/zh/mcp/wechat_mp/) · [Reddit](https://dataxapi.com/zh/mcp/reddit/) · [知乎](https://dataxapi.com/zh/mcp/zhihu/) · [Pinterest](https://dataxapi.com/zh/mcp/pinterest/)

---

按目录修订号 0264e2d6dd4ff743、价目版本 23生成。 [网页版](https://dataxapi.com/zh/mcp/telegram/)
