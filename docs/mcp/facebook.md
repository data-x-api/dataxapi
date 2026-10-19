# Facebook data in your AI

Ask your AI about Facebook and it answers with live data: 4 endpoints through 5 MCP tools or one skill package, from $0.0020 a call. Paste one prompt with your key to connect; a failed call is never charged.

- Endpoints: 4 (on Facebook, one response shape)
- Price: from $0.0020 (each endpoint at its own price; a failed call is free)
- MCP tools: `find`, `describe`, `call`, `read_more`, `account` (4 of them free, without a key)
- Skill package: [dataxapi-facebook](https://dataxapi.com/skills/dataxapi-facebook.zip)

## Copy this prompt

> Read https://dataxapi.com/agents.md and set up DataXAPI in this agent. My API key is dx_…; use it for every DataXAPI call.

Paste it into your agent. It reads the page the prompt points to and connects itself.

Ask about Facebook:

- What has this Facebook page posted lately?
- How many followers does this Facebook page have?
- What are people commenting on this Facebook post?

## What to ask about Facebook, and the endpoint that answers

Your AI picks the endpoint itself with `find`. These are the ones it lands on, with what each call costs.

| You ask | Endpoint | Price |
| --- | --- | --- |
| What has this Facebook page posted lately? | [Facebook page posts](https://dataxapi.com/apis/facebook/pages/posts/list/) `facebook.pages.posts.list` | $0.0020 |
| How many followers does this Facebook page have? | [Facebook page profile](https://dataxapi.com/apis/facebook/pages/get/) `facebook.pages.get` | $0.0020 |
| What are people commenting on this Facebook post? | [Facebook post comments](https://dataxapi.com/apis/facebook/posts/comments/list/) `facebook.posts.comments.list` | $0.0020 |

## One question, three tool calls

What happens when you ask about Facebook: your AI looks the endpoint up for free, reads its parameters for free, and pays for one call.

> What has this Facebook page posted lately?

|  |  |  |
| --- | --- | --- |
| `find({ query: "What has this Facebook page posted lately?", platform: "facebook" })` | Found facebook.pages.posts.list · $0.0020 a call | Free |
| `describe({ ids: ["facebook.pages.posts.list"] })` | Takes id, username, url · up to 3 a page | Free |
| `call({ capability: "facebook.pages.posts.list", id: "100044561550831", max_price: "0.002" })` | Up to 3 post objects · compact view | $0.0020 |

3 tool calls · 1 charged · $0.0020. Up to 3 post objects came back in the standard shape. Your AI answers from it and says what the call cost.

## The Facebook skill package

For agents that read skills (Claude Code, Codex, Cursor): one SKILL.md that lists the 4 Facebook endpoints with their prices, how to call them by MCP, command line or REST, how paging works and which endpoint answers which question.

Tell your AI: Install the DataXAPI skill dataxapi-facebook from https://dataxapi.com/skills/dataxapi-facebook.zip.

## All 4 Facebook endpoints your AI can call

Each one is a capability ID your AI passes to `call`. The name leads to the endpoint's page: its parameters, fields and a recorded response.

| Endpoint | Capability ID | Price |
| --- | --- | --- |
| [Facebook page profile](https://dataxapi.com/apis/facebook/pages/get/) | `facebook.pages.get` | $0.0020 |
| [Facebook page posts](https://dataxapi.com/apis/facebook/pages/posts/list/) | `facebook.pages.posts.list` | $0.0020 |
| [Facebook post comments](https://dataxapi.com/apis/facebook/posts/comments/list/) | `facebook.posts.comments.list` | $0.0020 |
| [Facebook post detail](https://dataxapi.com/apis/facebook/posts/get/) | `facebook.posts.get` | $0.0020 |

[Every Facebook price, and what is charged →](https://dataxapi.com/pricing/facebook/) · [Facebook API](https://dataxapi.com/apis/facebook/) · [MCP](https://dataxapi.com/mcp/)

## Questions

### What does it cost to ask about Facebook?

Finding endpoints, reading their parameters and reading on in a result are free. A call costs $0.0020, each Facebook endpoint at its own price. A call that fails is never charged.

### Do I need a Facebook account?

No. There is no Facebook login and no cookie to hand over: your AI uses your DataXAPI key and nothing else.

### Which AI clients work?

Any client that speaks MCP. Pasting the prompt sets up Claude Code, Cursor, Codex by itself; others take the server's address and your key by hand.

### Do I need the skill package as well as MCP?

No, either is enough. MCP gives your AI the tools; the skill tells an agent that reads skills which endpoint to use and what it costs, before it calls anything.

### Can my AI spend more than I want?

Every key can carry a daily or monthly budget, and every call a `max_price`. When the balance runs out, calls stop; nothing is charged on credit.

## The same in your AI for other platforms

[Douyin](https://dataxapi.com/mcp/douyin/) · [Bilibili](https://dataxapi.com/mcp/bilibili/) · [Kuaishou](https://dataxapi.com/mcp/kuaishou/) · [Telegram](https://dataxapi.com/mcp/telegram/) · [X (Twitter)](https://dataxapi.com/mcp/x/) · [Google Ads](https://dataxapi.com/mcp/google/) · [LinkedIn](https://dataxapi.com/mcp/linkedin/) · [Meta Ad Library](https://dataxapi.com/mcp/meta/) · [Threads](https://dataxapi.com/mcp/threads/) · [Instagram](https://dataxapi.com/mcp/instagram/) · [TikTok](https://dataxapi.com/mcp/tiktok/) · [Weibo](https://dataxapi.com/mcp/weibo/) · [Xiaohongshu (RedNote)](https://dataxapi.com/mcp/xiaohongshu/) · [YouTube](https://dataxapi.com/mcp/youtube/) · [WeChat Channels](https://dataxapi.com/mcp/wechat_channels/) · [WeChat Search](https://dataxapi.com/mcp/wechat/) · [WeChat Official Accounts](https://dataxapi.com/mcp/wechat_mp/) · [Reddit](https://dataxapi.com/mcp/reddit/) · [Zhihu](https://dataxapi.com/mcp/zhihu/) · [Pinterest](https://dataxapi.com/mcp/pinterest/)

---

Generated from catalog revision c48ce454ae6c4c65, price book 2. [Page](https://dataxapi.com/mcp/facebook/)
