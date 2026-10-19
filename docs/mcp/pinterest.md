# Pinterest data in your AI

Ask your AI about Pinterest and it answers with live data: 2 endpoints through 5 MCP tools or one skill package, from $0.0020 a call. Paste one prompt with your key to connect; a failed call is never charged.

- Endpoints: 2 (on Pinterest, one response shape)
- Price: from $0.0020 (each endpoint at its own price; a failed call is free)
- MCP tools: `find`, `describe`, `call`, `read_more`, `account` (4 of them free, without a key)
- Skill package: [dataxapi-pinterest](https://dataxapi.com/skills/dataxapi-pinterest.zip)

## Copy this prompt

> Read https://dataxapi.com/agents.md and set up DataXAPI in this agent. My API key is dx_…; use it for every DataXAPI call.

Paste it into your agent. It reads the page the prompt points to and connects itself.

Ask about Pinterest:

- Find Pinterest pins for “minimalist kitchen”.
- What does this pin show, and where does it link?

## What to ask about Pinterest, and the endpoint that answers

Your AI picks the endpoint itself with `find`. These are the ones it lands on, with what each call costs.

| You ask | Endpoint | Price |
| --- | --- | --- |
| Find Pinterest pins for “minimalist kitchen”. | [Pinterest pin search](https://dataxapi.com/apis/pinterest/pins/search/) `pinterest.pins.search` | $0.0020 |
| What does this pin show, and where does it link? | [Pinterest pin detail](https://dataxapi.com/apis/pinterest/pins/get/) `pinterest.pins.get` | $0.0020 |

## One question, three tool calls

What happens when you ask about Pinterest: your AI looks the endpoint up for free, reads its parameters for free, and pays for one call.

> Find Pinterest pins for “minimalist kitchen”.

|  |  |  |
| --- | --- | --- |
| `find({ query: "Find Pinterest pins for “minimalist kitchen”.", platform: "pinterest" })` | Found pinterest.pins.search · $0.0020 a call | Free |
| `describe({ ids: ["pinterest.pins.search"] })` | Takes query · up to 20 a page | Free |
| `call({ capability: "pinterest.pins.search", query: "mid century living room", max_price: "0.002" })` | Up to 20 post objects · compact view | $0.0020 |

3 tool calls · 1 charged · $0.0020. Up to 20 post objects came back in the standard shape. Your AI answers from it and says what the call cost.

## The Pinterest skill package

For agents that read skills (Claude Code, Codex, Cursor): one SKILL.md that lists the 2 Pinterest endpoints with their prices, how to call them by MCP, command line or REST, how paging works and which endpoint answers which question.

Tell your AI: Install the DataXAPI skill dataxapi-pinterest from https://dataxapi.com/skills/dataxapi-pinterest.zip.

## All 2 Pinterest endpoints your AI can call

Each one is a capability ID your AI passes to `call`. The name leads to the endpoint's page: its parameters, fields and a recorded response.

| Endpoint | Capability ID | Price |
| --- | --- | --- |
| [Pinterest pin detail](https://dataxapi.com/apis/pinterest/pins/get/) | `pinterest.pins.get` | $0.0020 |
| [Pinterest pin search](https://dataxapi.com/apis/pinterest/pins/search/) | `pinterest.pins.search` | $0.0020 |

[Every Pinterest price, and what is charged →](https://dataxapi.com/pricing/pinterest/) · [Pinterest API](https://dataxapi.com/apis/pinterest/) · [MCP](https://dataxapi.com/mcp/)

## Questions

### What does it cost to ask about Pinterest?

Finding endpoints, reading their parameters and reading on in a result are free. A call costs $0.0020, each Pinterest endpoint at its own price. A call that fails is never charged.

### Do I need a Pinterest account?

No. There is no Pinterest login and no cookie to hand over: your AI uses your DataXAPI key and nothing else.

### Which AI clients work?

Any client that speaks MCP. Pasting the prompt sets up Claude Code, Cursor, Codex by itself; others take the server's address and your key by hand.

### Do I need the skill package as well as MCP?

No, either is enough. MCP gives your AI the tools; the skill tells an agent that reads skills which endpoint to use and what it costs, before it calls anything.

### Can my AI spend more than I want?

Every key can carry a daily or monthly budget, and every call a `max_price`. When the balance runs out, calls stop; nothing is charged on credit.

## The same in your AI for other platforms

[Douyin](https://dataxapi.com/mcp/douyin/) · [Bilibili](https://dataxapi.com/mcp/bilibili/) · [Kuaishou](https://dataxapi.com/mcp/kuaishou/) · [Telegram](https://dataxapi.com/mcp/telegram/) · [X (Twitter)](https://dataxapi.com/mcp/x/) · [Facebook](https://dataxapi.com/mcp/facebook/) · [Google Ads](https://dataxapi.com/mcp/google/) · [LinkedIn](https://dataxapi.com/mcp/linkedin/) · [Meta Ad Library](https://dataxapi.com/mcp/meta/) · [Threads](https://dataxapi.com/mcp/threads/) · [Instagram](https://dataxapi.com/mcp/instagram/) · [TikTok](https://dataxapi.com/mcp/tiktok/) · [Weibo](https://dataxapi.com/mcp/weibo/) · [Xiaohongshu (RedNote)](https://dataxapi.com/mcp/xiaohongshu/) · [YouTube](https://dataxapi.com/mcp/youtube/) · [WeChat Channels](https://dataxapi.com/mcp/wechat_channels/) · [WeChat Search](https://dataxapi.com/mcp/wechat/) · [WeChat Official Accounts](https://dataxapi.com/mcp/wechat_mp/) · [Reddit](https://dataxapi.com/mcp/reddit/) · [Zhihu](https://dataxapi.com/mcp/zhihu/)

---

Generated from catalog revision c48ce454ae6c4c65, price book 2. [Page](https://dataxapi.com/mcp/pinterest/)
