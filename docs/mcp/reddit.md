# Reddit data in your AI

Ask your AI about Reddit and it answers with live data: 11 endpoints through 5 MCP tools or one skill package, from $0.0020 a call. Paste one prompt with your key to connect; a failed call is never charged.

- Endpoints: 11 (on Reddit, one response shape)
- Price: from $0.0020 (each endpoint at its own price; a failed call is free)
- MCP tools: `find`, `describe`, `call`, `read_more`, `account` (4 of them free, without a key)
- Skill package: [dataxapi-reddit](https://dataxapi.com/skills/dataxapi-reddit.zip)

## Copy this prompt

> Read https://dataxapi.com/agents.md and set up DataXAPI in this agent. My API key is dx_…; use it for every DataXAPI call.

Paste it into your agent. It reads the page the prompt points to and connects itself.

Ask about Reddit:

- What do people on Reddit say about standing desks?
- Show the latest posts in r/skincare.
- Read the comment thread under this Reddit post.

## What to ask about Reddit, and the endpoint that answers

Your AI picks the endpoint itself with `find`. These are the ones it lands on, with what each call costs.

| You ask | Endpoint | Price |
| --- | --- | --- |
| What do people on Reddit say about standing desks? | [Reddit post search](https://dataxapi.com/apis/reddit/posts/search/) `reddit.posts.search` | $0.0020 |
| Show the latest posts in r/skincare. | [Reddit community posts](https://dataxapi.com/apis/reddit/subreddits/posts/list/) `reddit.subreddits.posts.list` | $0.0020 |
| Read the comment thread under this Reddit post. | [Reddit post comments](https://dataxapi.com/apis/reddit/posts/comments/list/) `reddit.posts.comments.list` | $0.0020 |

## One question, three tool calls

What happens when you ask about Reddit: your AI looks the endpoint up for free, reads its parameters for free, and pays for one call.

> What do people on Reddit say about standing desks?

|  |  |  |
| --- | --- | --- |
| `find({ query: "What do people on Reddit say about standing desks?", platform: "reddit" })` | Found reddit.posts.search · $0.0020 a call | Free |
| `describe({ ids: ["reddit.posts.search"] })` | Takes query, sort, published_within · up to 7 a page | Free |
| `call({ capability: "reddit.posts.search", query: "saturn rings", max_price: "0.002" })` | Up to 7 post objects · compact view | $0.0020 |

3 tool calls · 1 charged · $0.0020. Up to 7 post objects came back in the standard shape. Your AI answers from it and says what the call cost.

## The Reddit skill package

For agents that read skills (Claude Code, Codex, Cursor): one SKILL.md that lists the 11 Reddit endpoints with their prices, how to call them by MCP, command line or REST, how paging works and which endpoint answers which question.

Tell your AI: Install the DataXAPI skill dataxapi-reddit from https://dataxapi.com/skills/dataxapi-reddit.zip.

## All 11 Reddit endpoints your AI can call

Each one is a capability ID your AI passes to `call`. The name leads to the endpoint's page: its parameters, fields and a recorded response.

| Endpoint | Capability ID | Price |
| --- | --- | --- |
| [Reddit post comments](https://dataxapi.com/apis/reddit/posts/comments/list/) | `reddit.posts.comments.list` | $0.0020 |
| [Reddit post detail](https://dataxapi.com/apis/reddit/posts/get/) | `reddit.posts.get` | $0.0020 |
| [Reddit post search](https://dataxapi.com/apis/reddit/posts/search/) | `reddit.posts.search` | $0.0020 |
| [Reddit popular posts](https://dataxapi.com/apis/reddit/posts/trending/) | `reddit.posts.trending` | $0.0020 |
| [Reddit community posts](https://dataxapi.com/apis/reddit/subreddits/posts/list/) | `reddit.subreddits.posts.list` | $0.0020 |
| [Reddit trending searches](https://dataxapi.com/apis/reddit/trends/list/) | `reddit.trends.list` | $0.0020 |
| [Reddit user profile](https://dataxapi.com/apis/reddit/users/get/) | `reddit.users.get` | $0.0020 |
| [Reddit user posts](https://dataxapi.com/apis/reddit/users/posts/list/) | `reddit.users.posts.list` | $0.0020 |
| [Reddit community profile](https://dataxapi.com/apis/reddit/subreddits/get/) | `reddit.subreddits.get` | $0.0020 |
| [Reddit user active communities](https://dataxapi.com/apis/reddit/users/subreddits/list/) | `reddit.users.subreddits.list` | $0.0020 |
| [Reddit video transcript](https://dataxapi.com/apis/reddit/posts/transcript/get/) | `reddit.posts.transcript.get` | $0.0020 |

[Every Reddit price, and what is charged →](https://dataxapi.com/pricing/reddit/) · [Reddit API](https://dataxapi.com/apis/reddit/) · [MCP](https://dataxapi.com/mcp/)

## Questions

### What does it cost to ask about Reddit?

Finding endpoints, reading their parameters and reading on in a result are free. A call costs $0.0020, each Reddit endpoint at its own price. A call that fails is never charged.

### Do I need a Reddit account?

No. There is no Reddit login and no cookie to hand over: your AI uses your DataXAPI key and nothing else.

### Which AI clients work?

Any client that speaks MCP. Pasting the prompt sets up Claude Code, Cursor, Codex by itself; others take the server's address and your key by hand.

### Do I need the skill package as well as MCP?

No, either is enough. MCP gives your AI the tools; the skill tells an agent that reads skills which endpoint to use and what it costs, before it calls anything.

### Can my AI spend more than I want?

Every key can carry a daily or monthly budget, and every call a `max_price`. When the balance runs out, calls stop; nothing is charged on credit.

## The same in your AI for other platforms

[Douyin](https://dataxapi.com/mcp/douyin/) · [Bilibili](https://dataxapi.com/mcp/bilibili/) · [Kuaishou](https://dataxapi.com/mcp/kuaishou/) · [Telegram](https://dataxapi.com/mcp/telegram/) · [X (Twitter)](https://dataxapi.com/mcp/x/) · [Facebook](https://dataxapi.com/mcp/facebook/) · [Google Ads](https://dataxapi.com/mcp/google/) · [LinkedIn](https://dataxapi.com/mcp/linkedin/) · [Meta Ad Library](https://dataxapi.com/mcp/meta/) · [Threads](https://dataxapi.com/mcp/threads/) · [Instagram](https://dataxapi.com/mcp/instagram/) · [TikTok](https://dataxapi.com/mcp/tiktok/) · [Weibo](https://dataxapi.com/mcp/weibo/) · [Xiaohongshu (RedNote)](https://dataxapi.com/mcp/xiaohongshu/) · [YouTube](https://dataxapi.com/mcp/youtube/) · [WeChat Channels](https://dataxapi.com/mcp/wechat_channels/) · [WeChat Search](https://dataxapi.com/mcp/wechat/) · [WeChat Official Accounts](https://dataxapi.com/mcp/wechat_mp/) · [Zhihu](https://dataxapi.com/mcp/zhihu/) · [Pinterest](https://dataxapi.com/mcp/pinterest/)

---

Generated from catalog revision c48ce454ae6c4c65, price book 2. [Page](https://dataxapi.com/mcp/reddit/)
