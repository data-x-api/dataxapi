# Xiaohongshu (RedNote) data in your AI

Ask your AI about Xiaohongshu (RedNote) and it answers with live data: 21 endpoints through 5 MCP tools or one skill package, from $0.0200 a call. Paste one prompt with your key to connect; a failed call is never charged.

- Endpoints: 21 (on Xiaohongshu (RedNote), one response shape)
- Price: from $0.0200 (each endpoint at its own price; a failed call is free)
- MCP tools: `find`, `describe`, `call`, `read_more`, `account` (4 of them free, without a key)
- Skill package: [dataxapi-xiaohongshu](https://dataxapi.com/skills/dataxapi-xiaohongshu.zip)

## Copy this prompt

> Read https://dataxapi.com/agents.md and set up DataXAPI in this agent. My API key is dx_…; use it for every DataXAPI call.

Paste it into your agent. It reads the page the prompt points to and connects itself.

Ask about Xiaohongshu (RedNote):

- Find Xiaohongshu (RedNote) notes that review sunscreen.
- Which PGY (蒲公英) creators write about home decor?
- What do the comments on this Xiaohongshu note say?

## What to ask about Xiaohongshu (RedNote), and the endpoint that answers

Your AI picks the endpoint itself with `find`. These are the ones it lands on, with what each call costs.

| You ask | Endpoint | Price |
| --- | --- | --- |
| Find Xiaohongshu (RedNote) notes that review sunscreen. | [Xiaohongshu note search](https://dataxapi.com/apis/xiaohongshu/notes/search/) `xiaohongshu.notes.search` | $0.0200 |
| Which PGY (蒲公英) creators write about home decor? | [Xiaohongshu PGY creator search](https://dataxapi.com/apis/xiaohongshu/pgy/creators/search/) `xiaohongshu.pgy.creators.search` | $0.0400 |
| What do the comments on this Xiaohongshu note say? | [Xiaohongshu note comments](https://dataxapi.com/apis/xiaohongshu/notes/comments/list/) `xiaohongshu.notes.comments.list` | $0.0200 |

## One question, three tool calls

What happens when you ask about Xiaohongshu (RedNote): your AI looks the endpoint up for free, reads its parameters for free, and pays for one call.

> Find Xiaohongshu (RedNote) notes that review sunscreen.

|  |  |  |
| --- | --- | --- |
| `find({ query: "Find Xiaohongshu (RedNote) notes that review sunscreen.", platform: "xiaohongshu" })` | Found xiaohongshu.notes.search · $0.0200 a call | Free |
| `describe({ ids: ["xiaohongshu.notes.search"] })` | Takes query, sort · up to 20 a page | Free |
| `call({ capability: "xiaohongshu.notes.search", query: "咖啡", max_price: "0.02" })` | Up to 20 post objects · compact view | $0.0200 |

3 tool calls · 1 charged · $0.0200. Up to 20 post objects came back in the standard shape. Your AI answers from it and says what the call cost.

## The Xiaohongshu (RedNote) skill package

For agents that read skills (Claude Code, Codex, Cursor): one SKILL.md that lists the 21 Xiaohongshu (RedNote) endpoints with their prices, how to call them by MCP, command line or REST, how paging works and which endpoint answers which question.

Tell your AI: Install the DataXAPI skill dataxapi-xiaohongshu from https://dataxapi.com/skills/dataxapi-xiaohongshu.zip.

## All 21 Xiaohongshu (RedNote) endpoints your AI can call

Each one is a capability ID your AI passes to `call`. The name leads to the endpoint's page: its parameters, fields and a recorded response.

| Endpoint | Capability ID | Price |
| --- | --- | --- |
| [Xiaohongshu image search](https://dataxapi.com/apis/xiaohongshu/images/search/) | `xiaohongshu.images.search` | $0.0200 |
| [Xiaohongshu note detail](https://dataxapi.com/apis/xiaohongshu/notes/get/) | `xiaohongshu.notes.get` | $0.0200 |
| [Xiaohongshu comment replies](https://dataxapi.com/apis/xiaohongshu/comments/replies/list/) | `xiaohongshu.comments.replies.list` | $0.0200 |
| [Xiaohongshu note comments](https://dataxapi.com/apis/xiaohongshu/notes/comments/list/) | `xiaohongshu.notes.comments.list` | $0.0200 |
| [Xiaohongshu note search](https://dataxapi.com/apis/xiaohongshu/notes/search/) | `xiaohongshu.notes.search` | $0.0200 |
| [Xiaohongshu PGY keyword search index](https://dataxapi.com/apis/xiaohongshu/pgy/keywords/history/) | `xiaohongshu.pgy.keywords.history` | $0.0400 |
| [Xiaohongshu PGY related keywords](https://dataxapi.com/apis/xiaohongshu/pgy/keywords/related/) | `xiaohongshu.pgy.keywords.related` | $0.0400 |
| [Xiaohongshu topic notes](https://dataxapi.com/apis/xiaohongshu/topics/notes/list/) | `xiaohongshu.topics.notes.list` | $0.0200 |
| [Xiaohongshu topic detail](https://dataxapi.com/apis/xiaohongshu/topics/get/) | `xiaohongshu.topics.get` | $0.0200 |
| [Xiaohongshu trends](https://dataxapi.com/apis/xiaohongshu/trends/list/) | `xiaohongshu.trends.list` | $0.0200 |
| [Xiaohongshu user profile](https://dataxapi.com/apis/xiaohongshu/users/get/) | `xiaohongshu.users.get` | $0.0200 |
| [Xiaohongshu user notes](https://dataxapi.com/apis/xiaohongshu/users/notes/list/) | `xiaohongshu.users.notes.list` | $0.0200 |
| [Xiaohongshu user search](https://dataxapi.com/apis/xiaohongshu/users/search/) | `xiaohongshu.users.search` | $0.0200 |
| [Xiaohongshu product detail](https://dataxapi.com/apis/xiaohongshu/shop/products/get/) | `xiaohongshu.shop.products.get` | $0.0200 |
| [Xiaohongshu product reviews](https://dataxapi.com/apis/xiaohongshu/shop/products/reviews/list/) | `xiaohongshu.shop.products.reviews.list` | $0.0200 |
| [Xiaohongshu product search](https://dataxapi.com/apis/xiaohongshu/shop/products/search/) | `xiaohongshu.shop.products.search` | $0.0200 |
| [Xiaohongshu PGY creator search](https://dataxapi.com/apis/xiaohongshu/pgy/creators/search/) | `xiaohongshu.pgy.creators.search` | $0.0400 |
| [Xiaohongshu PGY creator detail](https://dataxapi.com/apis/xiaohongshu/pgy/creators/get/) | `xiaohongshu.pgy.creators.get` | $0.0400 |
| [Xiaohongshu PGY creator audience profile](https://dataxapi.com/apis/xiaohongshu/pgy/creators/audience/get/) | `xiaohongshu.pgy.creators.audience.get` | $0.0400 |
| [Xiaohongshu PGY creator metrics](https://dataxapi.com/apis/xiaohongshu/pgy/creators/metrics/) | `xiaohongshu.pgy.creators.metrics` | $0.0400 |
| [Xiaohongshu PGY creator notes](https://dataxapi.com/apis/xiaohongshu/pgy/creators/notes/list/) | `xiaohongshu.pgy.creators.notes.list` | $0.0400 |

[Every Xiaohongshu (RedNote) price, and what is charged →](https://dataxapi.com/pricing/xiaohongshu/) · [Xiaohongshu (RedNote) API](https://dataxapi.com/apis/xiaohongshu/) · [MCP](https://dataxapi.com/mcp/)

## Questions

### What does it cost to ask about Xiaohongshu (RedNote)?

Finding endpoints, reading their parameters and reading on in a result are free. A call costs from $0.0200 to $0.0400, each Xiaohongshu (RedNote) endpoint at its own price. A call that fails is never charged.

### Do I need a Xiaohongshu (RedNote) account?

No. There is no Xiaohongshu (RedNote) login and no cookie to hand over: your AI uses your DataXAPI key and nothing else.

### Which AI clients work?

Any client that speaks MCP. Pasting the prompt sets up Claude Code, Cursor, Codex by itself; others take the server's address and your key by hand.

### Do I need the skill package as well as MCP?

No, either is enough. MCP gives your AI the tools; the skill tells an agent that reads skills which endpoint to use and what it costs, before it calls anything.

### Can my AI spend more than I want?

Every key can carry a daily or monthly budget, and every call a `max_price`. When the balance runs out, calls stop; nothing is charged on credit.

## The same in your AI for other platforms

[Douyin](https://dataxapi.com/mcp/douyin/) · [Bilibili](https://dataxapi.com/mcp/bilibili/) · [Kuaishou](https://dataxapi.com/mcp/kuaishou/) · [Telegram](https://dataxapi.com/mcp/telegram/) · [X (Twitter)](https://dataxapi.com/mcp/x/) · [Facebook](https://dataxapi.com/mcp/facebook/) · [Google Ads](https://dataxapi.com/mcp/google/) · [LinkedIn](https://dataxapi.com/mcp/linkedin/) · [Meta Ad Library](https://dataxapi.com/mcp/meta/) · [Threads](https://dataxapi.com/mcp/threads/) · [Instagram](https://dataxapi.com/mcp/instagram/) · [TikTok](https://dataxapi.com/mcp/tiktok/) · [Weibo](https://dataxapi.com/mcp/weibo/) · [YouTube](https://dataxapi.com/mcp/youtube/) · [WeChat Channels](https://dataxapi.com/mcp/wechat_channels/) · [WeChat Search](https://dataxapi.com/mcp/wechat/) · [WeChat Official Accounts](https://dataxapi.com/mcp/wechat_mp/) · [Reddit](https://dataxapi.com/mcp/reddit/) · [Zhihu](https://dataxapi.com/mcp/zhihu/) · [Pinterest](https://dataxapi.com/mcp/pinterest/)

---

Generated from catalog revision c48ce454ae6c4c65, price book 2. [Page](https://dataxapi.com/mcp/xiaohongshu/)
