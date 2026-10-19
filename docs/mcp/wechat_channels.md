# WeChat Channels data in your AI

Ask your AI about WeChat Channels and it answers with live data: 7 endpoints through 5 MCP tools or one skill package, from $0.0200 a call. Paste one prompt with your key to connect; a failed call is never charged.

- Endpoints: 7 (on WeChat Channels, one response shape)
- Price: from $0.0200 (each endpoint at its own price; a failed call is free)
- MCP tools: `find`, `describe`, `call`, `read_more`, `account` (4 of them free, without a key)
- Skill package: [dataxapi-wechat-channels](https://dataxapi.com/skills/dataxapi-wechat-channels.zip)

## Copy this prompt

> Read https://dataxapi.com/agents.md and set up DataXAPI in this agent. My API key is dx_…; use it for every DataXAPI call.

Paste it into your agent. It reads the page the prompt points to and connects itself.

Ask about WeChat Channels:

- What does this WeChat Channels account post, and how many followers does it have?
- How many likes and comments did this Channels video get?
- What are viewers saying under this Channels video?

## What to ask about WeChat Channels, and the endpoint that answers

Your AI picks the endpoint itself with `find`. These are the ones it lands on, with what each call costs.

| You ask | Endpoint | Price |
| --- | --- | --- |
| What does this WeChat Channels account post, and how many followers does it have? | [WeChat Channels account profile](https://dataxapi.com/apis/wechat_channels/users/get/) `wechat_channels.users.get` | $0.0200 |
| How many likes and comments did this Channels video get? | [WeChat Channels video detail](https://dataxapi.com/apis/wechat_channels/videos/get/) `wechat_channels.videos.get` | $0.0200 |
| What are viewers saying under this Channels video? | [WeChat Channels video comments](https://dataxapi.com/apis/wechat_channels/videos/comments/list/) `wechat_channels.videos.comments.list` | $0.0200 |

## One question, three tool calls

What happens when you ask about WeChat Channels: your AI looks the endpoint up for free, reads its parameters for free, and pays for one call.

> What does this WeChat Channels account post, and how many followers does it have?

|  |  |  |
| --- | --- | --- |
| `find({ query: "What does this WeChat Channels account post, and how many followers does it have?", platform: "wechat_channels" })` | Found wechat_channels.users.get · $0.0200 a call | Free |
| `describe({ ids: ["wechat_channels.users.get"] })` | Takes id · returns one object | Free |
| `call({ capability: "wechat_channels.users.get", id: "v2_060000231003b20faec8c5e5811dc3ddce02ec30b0772029a703e1b9f446ba147658bbcfab81@finder", max_price: "0.02" })` | One account object · compact view | $0.0200 |

3 tool calls · 1 charged · $0.0200. One account object came back in the standard shape. Your AI answers from it and says what the call cost.

## The WeChat Channels skill package

For agents that read skills (Claude Code, Codex, Cursor): one SKILL.md that lists the 7 WeChat Channels endpoints with their prices, how to call them by MCP, command line or REST, how paging works and which endpoint answers which question.

Tell your AI: Install the DataXAPI skill dataxapi-wechat-channels from https://dataxapi.com/skills/dataxapi-wechat-channels.zip.

## All 7 WeChat Channels endpoints your AI can call

Each one is a capability ID your AI passes to `call`. The name leads to the endpoint's page: its parameters, fields and a recorded response.

| Endpoint | Capability ID | Price |
| --- | --- | --- |
| [WeChat Channels account profile](https://dataxapi.com/apis/wechat_channels/users/get/) | `wechat_channels.users.get` | $0.0200 |
| [WeChat Channels video detail](https://dataxapi.com/apis/wechat_channels/videos/get/) | `wechat_channels.videos.get` | $0.0200 |
| [WeChat Channels video comments](https://dataxapi.com/apis/wechat_channels/videos/comments/list/) | `wechat_channels.videos.comments.list` | $0.0200 |
| [WeChat Channels account collections](https://dataxapi.com/apis/wechat_channels/users/collections/list/) | `wechat_channels.users.collections.list` | $0.0200 |
| [WeChat Channels collection videos](https://dataxapi.com/apis/wechat_channels/collections/videos/list/) | `wechat_channels.collections.videos.list` | $0.0200 |
| [WeChat Channels account videos](https://dataxapi.com/apis/wechat_channels/users/videos/list/) | `wechat_channels.users.videos.list` | $0.0200 |
| [WeChat Channels video search](https://dataxapi.com/apis/wechat_channels/videos/search/) | `wechat_channels.videos.search` | $0.0200 |

[Every WeChat Channels price, and what is charged →](https://dataxapi.com/pricing/wechat_channels/) · [WeChat Channels API](https://dataxapi.com/apis/wechat_channels/) · [MCP](https://dataxapi.com/mcp/)

## Questions

### What does it cost to ask about WeChat Channels?

Finding endpoints, reading their parameters and reading on in a result are free. A call costs $0.0200, each WeChat Channels endpoint at its own price. A call that fails is never charged.

### Do I need a WeChat Channels account?

No. There is no WeChat Channels login and no cookie to hand over: your AI uses your DataXAPI key and nothing else.

### Which AI clients work?

Any client that speaks MCP. Pasting the prompt sets up Claude Code, Cursor, Codex by itself; others take the server's address and your key by hand.

### Do I need the skill package as well as MCP?

No, either is enough. MCP gives your AI the tools; the skill tells an agent that reads skills which endpoint to use and what it costs, before it calls anything.

### Can my AI spend more than I want?

Every key can carry a daily or monthly budget, and every call a `max_price`. When the balance runs out, calls stop; nothing is charged on credit.

## The same in your AI for other platforms

[Douyin](https://dataxapi.com/mcp/douyin/) · [Bilibili](https://dataxapi.com/mcp/bilibili/) · [Kuaishou](https://dataxapi.com/mcp/kuaishou/) · [Telegram](https://dataxapi.com/mcp/telegram/) · [X (Twitter)](https://dataxapi.com/mcp/x/) · [Facebook](https://dataxapi.com/mcp/facebook/) · [Google Ads](https://dataxapi.com/mcp/google/) · [LinkedIn](https://dataxapi.com/mcp/linkedin/) · [Meta Ad Library](https://dataxapi.com/mcp/meta/) · [Threads](https://dataxapi.com/mcp/threads/) · [Instagram](https://dataxapi.com/mcp/instagram/) · [TikTok](https://dataxapi.com/mcp/tiktok/) · [Weibo](https://dataxapi.com/mcp/weibo/) · [Xiaohongshu (RedNote)](https://dataxapi.com/mcp/xiaohongshu/) · [YouTube](https://dataxapi.com/mcp/youtube/) · [WeChat Search](https://dataxapi.com/mcp/wechat/) · [WeChat Official Accounts](https://dataxapi.com/mcp/wechat_mp/) · [Reddit](https://dataxapi.com/mcp/reddit/) · [Zhihu](https://dataxapi.com/mcp/zhihu/) · [Pinterest](https://dataxapi.com/mcp/pinterest/)

---

Generated from catalog revision c48ce454ae6c4c65, price book 2. [Page](https://dataxapi.com/mcp/wechat_channels/)
