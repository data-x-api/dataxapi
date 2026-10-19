# Telegram data in your AI

Ask your AI about Telegram and it answers with live data: 3 endpoints through 5 MCP tools or one skill package, from $0.0020 a call. Paste one prompt with your key to connect; a failed call is never charged.

- Endpoints: 3 (on Telegram, one response shape)
- Price: from $0.0020 (each endpoint at its own price; a failed call is free)
- MCP tools: `find`, `describe`, `call`, `read_more`, `account` (4 of them free, without a key)
- Skill package: [dataxapi-telegram](https://dataxapi.com/skills/dataxapi-telegram.zip)

## Copy this prompt

> Read https://dataxapi.com/agents.md and set up DataXAPI in this agent. My API key is dx_…; use it for every DataXAPI call.

Paste it into your agent. It reads the page the prompt points to and connects itself.

Ask about Telegram:

- What has this Telegram channel posted lately?
- How many subscribers does this Telegram channel have?
- Get the text of this Telegram message.

## What to ask about Telegram, and the endpoint that answers

Your AI picks the endpoint itself with `find`. These are the ones it lands on, with what each call costs.

| You ask | Endpoint | Price |
| --- | --- | --- |
| What has this Telegram channel posted lately? | [Telegram channel messages](https://dataxapi.com/apis/telegram/channels/messages/list/) `telegram.channels.messages.list` | $0.0020 |
| How many subscribers does this Telegram channel have? | [Telegram channel profile](https://dataxapi.com/apis/telegram/channels/get/) `telegram.channels.get` | $0.0020 |
| Get the text of this Telegram message. | [Telegram message detail](https://dataxapi.com/apis/telegram/messages/get/) `telegram.messages.get` | $0.0020 |

## One question, three tool calls

What happens when you ask about Telegram: your AI looks the endpoint up for free, reads its parameters for free, and pays for one call.

> What has this Telegram channel posted lately?

|  |  |  |
| --- | --- | --- |
| `find({ query: "What has this Telegram channel posted lately?", platform: "telegram" })` | Found telegram.channels.messages.list · $0.0020 a call | Free |
| `describe({ ids: ["telegram.channels.messages.list"] })` | Takes username · up to 20 a page | Free |
| `call({ capability: "telegram.channels.messages.list", username: "telegram", max_price: "0.002" })` | Up to 20 post objects · compact view | $0.0020 |

3 tool calls · 1 charged · $0.0020. Up to 20 post objects came back in the standard shape. Your AI answers from it and says what the call cost.

## The Telegram skill package

For agents that read skills (Claude Code, Codex, Cursor): one SKILL.md that lists the 3 Telegram endpoints with their prices, how to call them by MCP, command line or REST, how paging works and which endpoint answers which question.

Tell your AI: Install the DataXAPI skill dataxapi-telegram from https://dataxapi.com/skills/dataxapi-telegram.zip.

## All 3 Telegram endpoints your AI can call

Each one is a capability ID your AI passes to `call`. The name leads to the endpoint's page: its parameters, fields and a recorded response.

| Endpoint | Capability ID | Price |
| --- | --- | --- |
| [Telegram channel profile](https://dataxapi.com/apis/telegram/channels/get/) | `telegram.channels.get` | $0.0020 |
| [Telegram channel messages](https://dataxapi.com/apis/telegram/channels/messages/list/) | `telegram.channels.messages.list` | $0.0020 |
| [Telegram message detail](https://dataxapi.com/apis/telegram/messages/get/) | `telegram.messages.get` | $0.0020 |

[Every Telegram price, and what is charged →](https://dataxapi.com/pricing/telegram/) · [Telegram API](https://dataxapi.com/apis/telegram/) · [MCP](https://dataxapi.com/mcp/)

## Questions

### What does it cost to ask about Telegram?

Finding endpoints, reading their parameters and reading on in a result are free. A call costs $0.0020, each Telegram endpoint at its own price. A call that fails is never charged.

### Do I need a Telegram account?

No. There is no Telegram login and no cookie to hand over: your AI uses your DataXAPI key and nothing else.

### Which AI clients work?

Any client that speaks MCP. Pasting the prompt sets up Claude Code, Cursor, Codex by itself; others take the server's address and your key by hand.

### Do I need the skill package as well as MCP?

No, either is enough. MCP gives your AI the tools; the skill tells an agent that reads skills which endpoint to use and what it costs, before it calls anything.

### Can my AI spend more than I want?

Every key can carry a daily or monthly budget, and every call a `max_price`. When the balance runs out, calls stop; nothing is charged on credit.

## The same in your AI for other platforms

[Douyin](https://dataxapi.com/mcp/douyin/) · [Bilibili](https://dataxapi.com/mcp/bilibili/) · [Kuaishou](https://dataxapi.com/mcp/kuaishou/) · [X (Twitter)](https://dataxapi.com/mcp/x/) · [Facebook](https://dataxapi.com/mcp/facebook/) · [Google Ads](https://dataxapi.com/mcp/google/) · [LinkedIn](https://dataxapi.com/mcp/linkedin/) · [Meta Ad Library](https://dataxapi.com/mcp/meta/) · [Threads](https://dataxapi.com/mcp/threads/) · [Instagram](https://dataxapi.com/mcp/instagram/) · [TikTok](https://dataxapi.com/mcp/tiktok/) · [Weibo](https://dataxapi.com/mcp/weibo/) · [Xiaohongshu (RedNote)](https://dataxapi.com/mcp/xiaohongshu/) · [YouTube](https://dataxapi.com/mcp/youtube/) · [WeChat Channels](https://dataxapi.com/mcp/wechat_channels/) · [WeChat Search](https://dataxapi.com/mcp/wechat/) · [WeChat Official Accounts](https://dataxapi.com/mcp/wechat_mp/) · [Reddit](https://dataxapi.com/mcp/reddit/) · [Zhihu](https://dataxapi.com/mcp/zhihu/) · [Pinterest](https://dataxapi.com/mcp/pinterest/)

---

Generated from catalog revision c48ce454ae6c4c65, price book 2. [Page](https://dataxapi.com/mcp/telegram/)
