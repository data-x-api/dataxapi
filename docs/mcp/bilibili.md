# Bilibili data in your AI

Ask your AI about Bilibili and it answers with live data: 11 endpoints through 5 MCP tools or one skill package, from $0.0020 a call. Paste one prompt with your key to connect; a failed call is never charged.

Updated 2026-11-21

- Endpoints: 11 (on Bilibili, one response shape)
- Price: from $0.0020 (each endpoint at its own price; a failed call is free)
- MCP tools: `find`, `describe`, `call`, `read_more`, `account` (4 of them free, without a key)
- Skill package: [dataxapi-bilibili](https://dataxapi.com/skills/dataxapi-bilibili.zip)

## Copy this prompt

> Read https://dataxapi.com/agents.md and set up DataXAPI in this agent. My API key is dx_…; use it for every DataXAPI call.

Paste it into your agent. It reads the page the prompt points to and connects itself.

Ask about Bilibili:

- Find B站 (Bilibili) videos that review the new phone.
- What is on Bilibili's hot search right now?
- What do the comments on this Bilibili video say?

## What to ask about Bilibili, and the endpoint that answers

Your AI picks the endpoint itself, looking it up with `find` when it is not sure. These are the ones it lands on, with what each call costs.

| You ask | Endpoint | Price |
| --- | --- | --- |
| Find B站 (Bilibili) videos that review the new phone. | [Bilibili video search](https://dataxapi.com/apis/bilibili/videos/search/) `bilibili.videos.search` | $0.0020 |
| What is on Bilibili's hot search right now? | [Bilibili hot searches](https://dataxapi.com/apis/bilibili/trends/list/) `bilibili.trends.list` | $0.0020 |
| What do the comments on this Bilibili video say? | [Bilibili video comments](https://dataxapi.com/apis/bilibili/videos/comments/list/) `bilibili.videos.comments.list` | $0.0020 |

## One question, two tool calls

What happens when you ask about Bilibili: your AI looks the endpoint up for free, then pays for one call. When the endpoint is plain from the list, it skips the lookup.

> Find B站 (Bilibili) videos that review the new phone.

|  |  |  |
| --- | --- | --- |
| `find({ query: "Find B站 (Bilibili) videos that review the new phone.", platform: "bilibili" })` | Found bilibili.videos.search · $0.0020 a call | Free |
| `call({ capability: "bilibili.videos.search", query: "机械键盘", max_price: "0.002" })` | Up to 20 post objects · compact view | $0.0020 |

2 tool calls · 1 charged · $0.0020. Up to 20 post objects came back in the standard shape. Your AI answers from it and says what the call cost.

## The Bilibili skill package

For agents that read skills (Claude Code, Codex, Cursor): one SKILL.md that lists the 11 Bilibili endpoints with their prices, how to call them by MCP, command line or REST, how paging works and which endpoint answers which question.

Tell your AI: Install the DataXAPI skill dataxapi-bilibili from https://dataxapi.com/skills/dataxapi-bilibili.zip.

## All 11 Bilibili endpoints your AI can call

Each one is a capability ID your AI passes to `call`. The name leads to the endpoint's page: its parameters, fields and a recorded response.

| Endpoint | Capability ID | Price |
| --- | --- | --- |
| [Bilibili comment replies](https://dataxapi.com/apis/bilibili/comments/replies/list/) | `bilibili.comments.replies.list` | $0.0020 |
| [Bilibili hot searches](https://dataxapi.com/apis/bilibili/trends/list/) | `bilibili.trends.list` | $0.0020 |
| [Bilibili user profile](https://dataxapi.com/apis/bilibili/users/get/) | `bilibili.users.get` | $0.0020 |
| [Bilibili user videos](https://dataxapi.com/apis/bilibili/users/videos/list/) | `bilibili.users.videos.list` | $0.0020 |
| [Bilibili video comments](https://dataxapi.com/apis/bilibili/videos/comments/list/) | `bilibili.videos.comments.list` | $0.0020 |
| [Bilibili video detail](https://dataxapi.com/apis/bilibili/videos/get/) | `bilibili.videos.get` | $0.0020 |
| [Bilibili video transcript (video to text)](https://dataxapi.com/apis/bilibili/videos/transcript/get/) | `bilibili.videos.transcript.get` | $0.0040 a call, plus $0.0038 a minute when the speech is recognised |
| [Bilibili video search](https://dataxapi.com/apis/bilibili/videos/search/) | `bilibili.videos.search` | $0.0020 |
| [Bilibili popular videos](https://dataxapi.com/apis/bilibili/videos/trending/) | `bilibili.videos.trending` | $0.0020 |
| [Bilibili video downloader](https://dataxapi.com/apis/bilibili/videos/media/get/) | `bilibili.videos.media.get` | $0.0020 |
| [Bilibili user videos (backup)](https://dataxapi.com/apis/bilibili/backup/users/videos/list/) | `bilibili.backup.users.videos.list` | $0.0300 |

[Every Bilibili price, and what is charged →](https://dataxapi.com/pricing/bilibili/) · [Bilibili API](https://dataxapi.com/apis/bilibili/) · [MCP](https://dataxapi.com/mcp/)

## Questions

### What does it cost to ask about Bilibili?

Finding endpoints, reading their parameters and reading on in a result are free. A call costs from $0.0020 to $0.0300, each Bilibili endpoint at its own price. A call that fails is never charged.

### Do I need a Bilibili account?

No. There is no Bilibili login and no cookie to hand over: your AI uses your DataXAPI key and nothing else.

### Which AI clients work?

Any client that speaks MCP. Pasting the prompt sets up Claude Code, Cursor, Codex by itself; others take the server's address and your key by hand.

### Do I need the skill package as well as MCP?

No, either is enough. MCP gives your AI the tools; the skill tells an agent that reads skills which endpoint to use and what it costs, before it calls anything.

### Can my AI spend more than I want?

Every key can carry a daily or monthly budget, and every call a `max_price`. When the balance runs out, calls stop; nothing is charged on credit.

## The same in your AI for other platforms

[Douyin](https://dataxapi.com/mcp/douyin/) · [Kuaishou](https://dataxapi.com/mcp/kuaishou/) · [Telegram](https://dataxapi.com/mcp/telegram/) · [X (Twitter)](https://dataxapi.com/mcp/x/) · [Facebook](https://dataxapi.com/mcp/facebook/) · [Google Ads](https://dataxapi.com/mcp/google/) · [LinkedIn](https://dataxapi.com/mcp/linkedin/) · [Meta Ad Library](https://dataxapi.com/mcp/meta/) · [Threads](https://dataxapi.com/mcp/threads/) · [Instagram](https://dataxapi.com/mcp/instagram/) · [TikTok](https://dataxapi.com/mcp/tiktok/) · [Weibo](https://dataxapi.com/mcp/weibo/) · [Xiaohongshu (RedNote)](https://dataxapi.com/mcp/xiaohongshu/) · [YouTube](https://dataxapi.com/mcp/youtube/) · [WeChat Channels](https://dataxapi.com/mcp/wechat_channels/) · [WeChat Search](https://dataxapi.com/mcp/wechat/) · [WeChat Official Accounts](https://dataxapi.com/mcp/wechat_mp/) · [Reddit](https://dataxapi.com/mcp/reddit/) · [Zhihu](https://dataxapi.com/mcp/zhihu/) · [Pinterest](https://dataxapi.com/mcp/pinterest/)

---

Generated from catalog revision ceced48b38f71468, price book 30. [Page](https://dataxapi.com/mcp/bilibili/)
