# WeChat Search data in your AI

Ask your AI about WeChat Search and it answers with live data: 1 endpoints through 5 MCP tools or one skill package, from $0.0200 a call. Paste one prompt with your key to connect; a failed call is never charged.

- Endpoints: 1 (on WeChat Search, one response shape)
- Price: from $0.0200 (each endpoint at its own price; a failed call is free)
- MCP tools: `find`, `describe`, `call`, `read_more`, `account` (4 of them free, without a key)
- Skill package: [dataxapi-wechat](https://dataxapi.com/skills/dataxapi-wechat.zip)

## Copy this prompt

> Read https://dataxapi.com/agents.md and set up DataXAPI in this agent. My API key is dx_…; use it for every DataXAPI call.

Paste it into your agent. It reads the page the prompt points to and connects itself.

Ask about WeChat Search:

- What are WeChat articles and Channels videos saying about camping this week?

## What to ask about WeChat Search, and the endpoint that answers

Your AI picks the endpoint itself with `find`. These are the ones it lands on, with what each call costs.

| You ask | Endpoint | Price |
| --- | --- | --- |
| What are WeChat articles and Channels videos saying about camping this week? | [WeChat Search articles and videos](https://dataxapi.com/apis/wechat/posts/search/) `wechat.posts.search` | $0.0200 |

## One question, three tool calls

What happens when you ask about WeChat Search: your AI looks the endpoint up for free, reads its parameters for free, and pays for one call.

> What are WeChat articles and Channels videos saying about camping this week?

|  |  |  |
| --- | --- | --- |
| `find({ query: "What are WeChat articles and Channels videos saying about camping this week?", platform: "wechat" })` | Found wechat.posts.search · $0.0200 a call | Free |
| `describe({ ids: ["wechat.posts.search"] })` | Takes query, sort, published_within · up to 20 a page | Free |
| `call({ capability: "wechat.posts.search", query: "咖啡店开业", max_price: "0.02" })` | Up to 20 post objects · compact view | $0.0200 |

3 tool calls · 1 charged · $0.0200. Up to 20 post objects came back in the standard shape. Your AI answers from it and says what the call cost.

## The WeChat Search skill package

For agents that read skills (Claude Code, Codex, Cursor): one SKILL.md that lists the 1 WeChat Search endpoints with their prices, how to call them by MCP, command line or REST, how paging works and which endpoint answers which question.

Tell your AI: Install the DataXAPI skill dataxapi-wechat from https://dataxapi.com/skills/dataxapi-wechat.zip.

## All 1 WeChat Search endpoints your AI can call

Each one is a capability ID your AI passes to `call`. The name leads to the endpoint's page: its parameters, fields and a recorded response.

| Endpoint | Capability ID | Price |
| --- | --- | --- |
| [WeChat Search articles and videos](https://dataxapi.com/apis/wechat/posts/search/) | `wechat.posts.search` | $0.0200 |

[Every WeChat Search price, and what is charged →](https://dataxapi.com/pricing/wechat/) · [WeChat Search API](https://dataxapi.com/apis/wechat/) · [MCP](https://dataxapi.com/mcp/)

## Questions

### What does it cost to ask about WeChat Search?

Finding endpoints, reading their parameters and reading on in a result are free. A call costs $0.0200, each WeChat Search endpoint at its own price. A call that fails is never charged.

### Do I need a WeChat Search account?

No. There is no WeChat Search login and no cookie to hand over: your AI uses your DataXAPI key and nothing else.

### Which AI clients work?

Any client that speaks MCP. Pasting the prompt sets up Claude Code, Cursor, Codex by itself; others take the server's address and your key by hand.

### Do I need the skill package as well as MCP?

No, either is enough. MCP gives your AI the tools; the skill tells an agent that reads skills which endpoint to use and what it costs, before it calls anything.

### Can my AI spend more than I want?

Every key can carry a daily or monthly budget, and every call a `max_price`. When the balance runs out, calls stop; nothing is charged on credit.

## The same in your AI for other platforms

[Douyin](https://dataxapi.com/mcp/douyin/) · [Bilibili](https://dataxapi.com/mcp/bilibili/) · [Kuaishou](https://dataxapi.com/mcp/kuaishou/) · [Telegram](https://dataxapi.com/mcp/telegram/) · [X (Twitter)](https://dataxapi.com/mcp/x/) · [Facebook](https://dataxapi.com/mcp/facebook/) · [Google Ads](https://dataxapi.com/mcp/google/) · [LinkedIn](https://dataxapi.com/mcp/linkedin/) · [Meta Ad Library](https://dataxapi.com/mcp/meta/) · [Threads](https://dataxapi.com/mcp/threads/) · [Instagram](https://dataxapi.com/mcp/instagram/) · [TikTok](https://dataxapi.com/mcp/tiktok/) · [Weibo](https://dataxapi.com/mcp/weibo/) · [Xiaohongshu (RedNote)](https://dataxapi.com/mcp/xiaohongshu/) · [YouTube](https://dataxapi.com/mcp/youtube/) · [WeChat Channels](https://dataxapi.com/mcp/wechat_channels/) · [WeChat Official Accounts](https://dataxapi.com/mcp/wechat_mp/) · [Reddit](https://dataxapi.com/mcp/reddit/) · [Zhihu](https://dataxapi.com/mcp/zhihu/) · [Pinterest](https://dataxapi.com/mcp/pinterest/)

---

Generated from catalog revision c48ce454ae6c4c65, price book 2. [Page](https://dataxapi.com/mcp/wechat/)
