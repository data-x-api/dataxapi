# 在 AI 里用 Meta 广告库数据

问 AI Meta 广告库上的事，它用实时数据回答：5 个接口，通过 5 个 MCP 工具或一个技能包（Skill），一次 $0.0020 起。贴一段带 Key 的提示词就接好，失败的调用不收费。

更新于 2026-11-06

- 接口：5 (Meta 广告库，同一种返回格式)
- 价格：$0.0020 起 (按接口各自的标价；失败不收费)
- MCP 工具：`find`, `describe`, `call`, `read_more`, `account` (其中 4 个免费，不用 Key)
- 技能包：[dataxapi-meta](https://dataxapi.com/skills/dataxapi-meta.zip)

## 复制这段提示词

> 读 https://dataxapi.com/agents.md，在这个 agent 里帮我接好 DataXAPI。我的 API Key 是 dx_…，之后所有 DataXAPI 的调用都用它。

贴给你的 agent. 它会去读提示词指向的那一页，自己接好。

问 Meta 广告库上的事：

- 这个品牌在 Facebook 和 Instagram 上投了哪些广告？
- 在 Meta 广告库里搜蛋白粉的广告。
- 把这条 Meta 广告视频的台词转成文字。

## 问 Meta 广告库什么，由哪个接口回答

你的 AI 会自己挑接口，拿不准时用 `find` 找。下面是它会找到的那个，和一次调用的价格。

| 你问 | 接口 | 价格 |
| --- | --- | --- |
| 这个品牌在 Facebook 和 Instagram 上投了哪些广告？ | [Meta 广告主的广告](https://dataxapi.com/zh/apis/meta/advertisers/ads/list/) `meta.advertisers.ads.list` | $0.0020 |
| 在 Meta 广告库里搜蛋白粉的广告。 | [Meta 广告库搜索](https://dataxapi.com/zh/apis/meta/ads/search/) `meta.ads.search` | $0.0020 |
| 把这条 Meta 广告视频的台词转成文字。 | [Meta 广告视频字幕](https://dataxapi.com/zh/apis/meta/ads/transcript/get/) `meta.ads.transcript.get` | $0.0020 |

## 一句问话，两次工具调用

问一句 Meta 广告库上的事时发生了什么：AI 免费找到接口，只为一次调用付钱。从清单里一眼看得出该用哪个接口时，连找都省了。

> 这个品牌在 Facebook 和 Instagram 上投了哪些广告？

|  |  |  |
| --- | --- | --- |
| `find({ query: "这个品牌在 Facebook 和 Instagram 上投了哪些广告？", platform: "meta" })` | 找到 meta.advertisers.ads.list · 一次 $0.0020 | 免费 |
| `call({ capability: "meta.advertisers.ads.list", id: "182162001806727", max_price: "0.002" })` | 最多 30 条广告 · 精简档 | $0.0020 |

2 次工具调用 · 1 次扣费 · $0.0020. 拿到最多 30 条广告，都是标准格式。AI 据此回答，并说明这次花了多少。

## Meta 广告库技能包

给会读技能的 agent（Claude Code、Codex、Cursor）：一个 SKILL.md，列出 Meta 广告库的 5 个接口和价格，怎么用 MCP、命令行或 REST 调用，怎么翻页，以及哪个接口回答哪类问题。

对你的 AI 说：帮我从 https://dataxapi.com/skills/dataxapi-meta.zip 装上 DataXAPI 技能 dataxapi-meta。

## AI 能调的 Meta 广告库接口，全部 5 个

每一个都是 AI 传给 `call` 的接口编号。点名字进接口页：参数、字段和一份录好的返回。

| 接口 | 接口编号 | 价格 |
| --- | --- | --- |
| [Meta 广告详情](https://dataxapi.com/zh/apis/meta/ads/get/) | `meta.ads.get` | $0.0020 |
| [Meta 广告库搜索](https://dataxapi.com/zh/apis/meta/ads/search/) | `meta.ads.search` | $0.0020 |
| [Meta 广告视频字幕](https://dataxapi.com/zh/apis/meta/ads/transcript/get/) | `meta.ads.transcript.get` | $0.0020 |
| [Meta 广告主的广告](https://dataxapi.com/zh/apis/meta/advertisers/ads/list/) | `meta.advertisers.ads.list` | $0.0020 |
| [Meta 广告主搜索](https://dataxapi.com/zh/apis/meta/advertisers/search/) | `meta.advertisers.search` | $0.0020 |

[Meta 广告库的全部价格和扣费规则 →](https://dataxapi.com/zh/pricing/meta/) · [Meta 广告库 API](https://dataxapi.com/zh/apis/meta/) · [MCP 服务](https://dataxapi.com/zh/mcp/)

## 常见问题

### 在 AI 里问 Meta 广告库要花多少钱？

找接口、看参数、接着读已有结果都免费。一次调用 $0.0020，Meta 广告库的每个接口各有标价。失败的调用不收费。

### 需要 Meta 广告库账号吗？

不需要。不用登录 Meta 广告库，也不用交 Cookie：AI 只用你的 DataXAPI Key。

### 哪些 AI 客户端能用？

支持 MCP 的都能用。贴上那段提示词，Claude Code、Cursor、Codex 会自己接好；其他客户端手动填服务地址和 Key。

### 有了 MCP 还要装技能包吗？

二选一就够。MCP 给 AI 工具；技能包告诉会读技能的 agent 该用哪个接口、花多少钱，在它调用之前。

### AI 会不会花超？

每把 Key 可以设每天或每月的预算，每次调用可以带 `max_price`。余额用完调用就停，不会赊账。

## 其他平台也能这样接进 AI

[抖音](https://dataxapi.com/zh/mcp/douyin/) · [B站](https://dataxapi.com/zh/mcp/bilibili/) · [快手](https://dataxapi.com/zh/mcp/kuaishou/) · [Telegram](https://dataxapi.com/zh/mcp/telegram/) · [X（推特）](https://dataxapi.com/zh/mcp/x/) · [Facebook](https://dataxapi.com/zh/mcp/facebook/) · [Google 广告](https://dataxapi.com/zh/mcp/google/) · [LinkedIn](https://dataxapi.com/zh/mcp/linkedin/) · [Threads](https://dataxapi.com/zh/mcp/threads/) · [Instagram](https://dataxapi.com/zh/mcp/instagram/) · [TikTok](https://dataxapi.com/zh/mcp/tiktok/) · [微博](https://dataxapi.com/zh/mcp/weibo/) · [小红书](https://dataxapi.com/zh/mcp/xiaohongshu/) · [YouTube](https://dataxapi.com/zh/mcp/youtube/) · [微信视频号](https://dataxapi.com/zh/mcp/wechat_channels/) · [微信搜一搜](https://dataxapi.com/zh/mcp/wechat/) · [微信公众号](https://dataxapi.com/zh/mcp/wechat_mp/) · [Reddit](https://dataxapi.com/zh/mcp/reddit/) · [知乎](https://dataxapi.com/zh/mcp/zhihu/) · [Pinterest](https://dataxapi.com/zh/mcp/pinterest/)

---

按目录修订号 ceced48b38f71468、价目版本 30生成。 [网页版](https://dataxapi.com/zh/mcp/meta/)
