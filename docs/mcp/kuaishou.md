# Kuaishou data in your AI

Ask your AI about Kuaishou and it answers with live data: 8 endpoints through 5 MCP tools or one skill package, from $0.0020 a call. Paste one prompt with your key to connect; a failed call is never charged.

- Endpoints: 8 (on Kuaishou, one response shape)
- Price: from $0.0020 (each endpoint at its own price; a failed call is free)
- MCP tools: `find`, `describe`, `call`, `read_more`, `account` (4 of them free, without a key)
- Skill package: [dataxapi-kuaishou](https://dataxapi.com/skills/dataxapi-kuaishou.zip)

## Copy this prompt

> Read https://dataxapi.com/agents.md and set up DataXAPI in this agent. My API key is dx_…; use it for every DataXAPI call.

Paste it into your agent. It reads the page the prompt points to and connects itself.

Ask about Kuaishou:

- What is on the Kuaishou hot list right now?
- Find Kuaishou videos about farm produce.
- What are viewers saying under this Kuaishou video?

## What to ask about Kuaishou, and the endpoint that answers

Your AI picks the endpoint itself with `find`. These are the ones it lands on, with what each call costs.

| You ask | Endpoint | Price |
| --- | --- | --- |
| What is on the Kuaishou hot list right now? | [Kuaishou hot list](https://dataxapi.com/apis/kuaishou/trends/list/) `kuaishou.trends.list` | $0.0020 |
| Find Kuaishou videos about farm produce. | [Kuaishou video search](https://dataxapi.com/apis/kuaishou/videos/search/) `kuaishou.videos.search` | $0.0200 |
| What are viewers saying under this Kuaishou video? | [Kuaishou video comments](https://dataxapi.com/apis/kuaishou/videos/comments/list/) `kuaishou.videos.comments.list` | $0.0020 |

## One question, three tool calls

What happens when you ask about Kuaishou: your AI looks the endpoint up for free, reads its parameters for free, and pays for one call.

> What is on the Kuaishou hot list right now?

|  |  |  |
| --- | --- | --- |
| `find({ query: "What is on the Kuaishou hot list right now?", platform: "kuaishou" })` | Found kuaishou.trends.list · $0.0020 a call | Free |
| `describe({ ids: ["kuaishou.trends.list"] })` | Takes no parameters · up to 51 a page | Free |
| `call({ capability: "kuaishou.trends.list", max_price: "0.002" })` | Up to 51 trend objects · compact view | $0.0020 |

3 tool calls · 1 charged · $0.0020. Up to 51 trend objects came back in the standard shape. Your AI answers from it and says what the call cost.

## The Kuaishou skill package

For agents that read skills (Claude Code, Codex, Cursor): one SKILL.md that lists the 8 Kuaishou endpoints with their prices, how to call them by MCP, command line or REST, how paging works and which endpoint answers which question.

Tell your AI: Install the DataXAPI skill dataxapi-kuaishou from https://dataxapi.com/skills/dataxapi-kuaishou.zip.

## All 8 Kuaishou endpoints your AI can call

Each one is a capability ID your AI passes to `call`. The name leads to the endpoint's page: its parameters, fields and a recorded response.

| Endpoint | Capability ID | Price |
| --- | --- | --- |
| [Kuaishou comment replies](https://dataxapi.com/apis/kuaishou/comments/replies/list/) | `kuaishou.comments.replies.list` | $0.0020 |
| [Kuaishou hot list](https://dataxapi.com/apis/kuaishou/trends/list/) | `kuaishou.trends.list` | $0.0020 |
| [Kuaishou user profile](https://dataxapi.com/apis/kuaishou/users/get/) | `kuaishou.users.get` | $0.0200 |
| [Kuaishou user search](https://dataxapi.com/apis/kuaishou/users/search/) | `kuaishou.users.search` | $0.0200 |
| [Kuaishou user videos](https://dataxapi.com/apis/kuaishou/users/videos/list/) | `kuaishou.users.videos.list` | $0.0200 |
| [Kuaishou video comments](https://dataxapi.com/apis/kuaishou/videos/comments/list/) | `kuaishou.videos.comments.list` | $0.0020 |
| [Kuaishou video detail](https://dataxapi.com/apis/kuaishou/videos/get/) | `kuaishou.videos.get` | $0.0020 |
| [Kuaishou video search](https://dataxapi.com/apis/kuaishou/videos/search/) | `kuaishou.videos.search` | $0.0200 |

[Every Kuaishou price, and what is charged →](https://dataxapi.com/pricing/kuaishou/) · [Kuaishou API](https://dataxapi.com/apis/kuaishou/) · [MCP](https://dataxapi.com/mcp/)

## Questions

### What does it cost to ask about Kuaishou?

Finding endpoints, reading their parameters and reading on in a result are free. A call costs from $0.0020 to $0.0200, each Kuaishou endpoint at its own price. A call that fails is never charged.

### Do I need a Kuaishou account?

No. There is no Kuaishou login and no cookie to hand over: your AI uses your DataXAPI key and nothing else.

### Which AI clients work?

Any client that speaks MCP. Pasting the prompt sets up Claude Code, Cursor, Codex by itself; others take the server's address and your key by hand.

### Do I need the skill package as well as MCP?

No, either is enough. MCP gives your AI the tools; the skill tells an agent that reads skills which endpoint to use and what it costs, before it calls anything.

### Can my AI spend more than I want?

Every key can carry a daily or monthly budget, and every call a `max_price`. When the balance runs out, calls stop; nothing is charged on credit.

## The same in your AI for other platforms

[Douyin](https://dataxapi.com/mcp/douyin/) · [Bilibili](https://dataxapi.com/mcp/bilibili/) · [Telegram](https://dataxapi.com/mcp/telegram/) · [X (Twitter)](https://dataxapi.com/mcp/x/) · [Facebook](https://dataxapi.com/mcp/facebook/) · [Google Ads](https://dataxapi.com/mcp/google/) · [LinkedIn](https://dataxapi.com/mcp/linkedin/) · [Meta Ad Library](https://dataxapi.com/mcp/meta/) · [Threads](https://dataxapi.com/mcp/threads/) · [Instagram](https://dataxapi.com/mcp/instagram/) · [TikTok](https://dataxapi.com/mcp/tiktok/) · [Weibo](https://dataxapi.com/mcp/weibo/) · [Xiaohongshu (RedNote)](https://dataxapi.com/mcp/xiaohongshu/) · [YouTube](https://dataxapi.com/mcp/youtube/) · [WeChat Channels](https://dataxapi.com/mcp/wechat_channels/) · [WeChat Search](https://dataxapi.com/mcp/wechat/) · [WeChat Official Accounts](https://dataxapi.com/mcp/wechat_mp/) · [Reddit](https://dataxapi.com/mcp/reddit/) · [Zhihu](https://dataxapi.com/mcp/zhihu/) · [Pinterest](https://dataxapi.com/mcp/pinterest/)

---

Generated from catalog revision c48ce454ae6c4c65, price book 2. [Page](https://dataxapi.com/mcp/kuaishou/)
