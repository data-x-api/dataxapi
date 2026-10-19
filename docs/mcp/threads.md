# Threads data in your AI

Ask your AI about Threads and it answers with live data: 4 endpoints through 5 MCP tools or one skill package, from $0.0020 a call. Paste one prompt with your key to connect; a failed call is never charged.

- Endpoints: 4 (on Threads, one response shape)
- Price: from $0.0020 (each endpoint at its own price; a failed call is free)
- MCP tools: `find`, `describe`, `call`, `read_more`, `account` (4 of them free, without a key)
- Skill package: [dataxapi-threads](https://dataxapi.com/skills/dataxapi-threads.zip)

## Copy this prompt

> Read https://dataxapi.com/agents.md and set up DataXAPI in this agent. My API key is dx_…; use it for every DataXAPI call.

Paste it into your agent. It reads the page the prompt points to and connects itself.

Ask about Threads:

- Find Threads posts that mention our brand.
- What has this account posted on Threads lately?
- How many followers does this Threads account have?

## What to ask about Threads, and the endpoint that answers

Your AI picks the endpoint itself with `find`. These are the ones it lands on, with what each call costs.

| You ask | Endpoint | Price |
| --- | --- | --- |
| Find Threads posts that mention our brand. | [Threads post search](https://dataxapi.com/apis/threads/posts/search/) `threads.posts.search` | $0.0020 |
| What has this account posted on Threads lately? | [Threads user posts](https://dataxapi.com/apis/threads/users/posts/list/) `threads.users.posts.list` | $0.0020 |
| How many followers does this Threads account have? | [Threads user profile](https://dataxapi.com/apis/threads/users/get/) `threads.users.get` | $0.0020 |

## One question, three tool calls

What happens when you ask about Threads: your AI looks the endpoint up for free, reads its parameters for free, and pays for one call.

> Find Threads posts that mention our brand.

|  |  |  |
| --- | --- | --- |
| `find({ query: "Find Threads posts that mention our brand.", platform: "threads" })` | Found threads.posts.search · $0.0020 a call | Free |
| `describe({ ids: ["threads.posts.search"] })` | Takes query, since, until · up to 20 a page | Free |
| `call({ capability: "threads.posts.search", query: "nasa", max_price: "0.002" })` | Up to 20 post objects · compact view | $0.0020 |

3 tool calls · 1 charged · $0.0020. Up to 20 post objects came back in the standard shape. Your AI answers from it and says what the call cost.

## The Threads skill package

For agents that read skills (Claude Code, Codex, Cursor): one SKILL.md that lists the 4 Threads endpoints with their prices, how to call them by MCP, command line or REST, how paging works and which endpoint answers which question.

Tell your AI: Install the DataXAPI skill dataxapi-threads from https://dataxapi.com/skills/dataxapi-threads.zip.

## All 4 Threads endpoints your AI can call

Each one is a capability ID your AI passes to `call`. The name leads to the endpoint's page: its parameters, fields and a recorded response.

| Endpoint | Capability ID | Price |
| --- | --- | --- |
| [Threads post detail](https://dataxapi.com/apis/threads/posts/get/) | `threads.posts.get` | $0.0020 |
| [Threads post search](https://dataxapi.com/apis/threads/posts/search/) | `threads.posts.search` | $0.0020 |
| [Threads user profile](https://dataxapi.com/apis/threads/users/get/) | `threads.users.get` | $0.0020 |
| [Threads user posts](https://dataxapi.com/apis/threads/users/posts/list/) | `threads.users.posts.list` | $0.0020 |

[Every Threads price, and what is charged →](https://dataxapi.com/pricing/threads/) · [Threads API](https://dataxapi.com/apis/threads/) · [MCP](https://dataxapi.com/mcp/)

## Questions

### What does it cost to ask about Threads?

Finding endpoints, reading their parameters and reading on in a result are free. A call costs $0.0020, each Threads endpoint at its own price. A call that fails is never charged.

### Do I need a Threads account?

No. There is no Threads login and no cookie to hand over: your AI uses your DataXAPI key and nothing else.

### Which AI clients work?

Any client that speaks MCP. Pasting the prompt sets up Claude Code, Cursor, Codex by itself; others take the server's address and your key by hand.

### Do I need the skill package as well as MCP?

No, either is enough. MCP gives your AI the tools; the skill tells an agent that reads skills which endpoint to use and what it costs, before it calls anything.

### Can my AI spend more than I want?

Every key can carry a daily or monthly budget, and every call a `max_price`. When the balance runs out, calls stop; nothing is charged on credit.

## The same in your AI for other platforms

[Douyin](https://dataxapi.com/mcp/douyin/) · [Bilibili](https://dataxapi.com/mcp/bilibili/) · [Kuaishou](https://dataxapi.com/mcp/kuaishou/) · [Telegram](https://dataxapi.com/mcp/telegram/) · [X (Twitter)](https://dataxapi.com/mcp/x/) · [Facebook](https://dataxapi.com/mcp/facebook/) · [Google Ads](https://dataxapi.com/mcp/google/) · [LinkedIn](https://dataxapi.com/mcp/linkedin/) · [Meta Ad Library](https://dataxapi.com/mcp/meta/) · [Instagram](https://dataxapi.com/mcp/instagram/) · [TikTok](https://dataxapi.com/mcp/tiktok/) · [Weibo](https://dataxapi.com/mcp/weibo/) · [Xiaohongshu (RedNote)](https://dataxapi.com/mcp/xiaohongshu/) · [YouTube](https://dataxapi.com/mcp/youtube/) · [WeChat Channels](https://dataxapi.com/mcp/wechat_channels/) · [WeChat Search](https://dataxapi.com/mcp/wechat/) · [WeChat Official Accounts](https://dataxapi.com/mcp/wechat_mp/) · [Reddit](https://dataxapi.com/mcp/reddit/) · [Zhihu](https://dataxapi.com/mcp/zhihu/) · [Pinterest](https://dataxapi.com/mcp/pinterest/)

---

Generated from catalog revision c48ce454ae6c4c65, price book 2. [Page](https://dataxapi.com/mcp/threads/)
