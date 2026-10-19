# Zhihu data in your AI

Ask your AI about Zhihu and it answers with live data: 16 endpoints through 5 MCP tools or one skill package, from $0.0020 a call. Paste one prompt with your key to connect; a failed call is never charged.

- Endpoints: 16 (on Zhihu, one response shape)
- Price: from $0.0020 (each endpoint at its own price; a failed call is free)
- MCP tools: `find`, `describe`, `call`, `read_more`, `account` (4 of them free, without a key)
- Skill package: [dataxapi-zhihu](https://dataxapi.com/skills/dataxapi-zhihu.zip)

## Copy this prompt

> Read https://dataxapi.com/agents.md and set up DataXAPI in this agent. My API key is dx_…; use it for every DataXAPI call.

Paste it into your agent. It reads the page the prompt points to and connects itself.

Ask about Zhihu:

- What is on the Zhihu hot list today?
- Read the answers to this Zhihu question.
- Search Zhihu for discussions of air purifiers.

## What to ask about Zhihu, and the endpoint that answers

Your AI picks the endpoint itself with `find`. These are the ones it lands on, with what each call costs.

| You ask | Endpoint | Price |
| --- | --- | --- |
| What is on the Zhihu hot list today? | [Zhihu hot list](https://dataxapi.com/apis/zhihu/trends/list/) `zhihu.trends.list` | $0.0020 |
| Read the answers to this Zhihu question. | [Zhihu question answers](https://dataxapi.com/apis/zhihu/questions/answers/list/) `zhihu.questions.answers.list` | $0.0020 |
| Search Zhihu for discussions of air purifiers. | [Zhihu content search](https://dataxapi.com/apis/zhihu/posts/search/) `zhihu.posts.search` | $0.0020 |

## One question, three tool calls

What happens when you ask about Zhihu: your AI looks the endpoint up for free, reads its parameters for free, and pays for one call.

> What is on the Zhihu hot list today?

|  |  |  |
| --- | --- | --- |
| `find({ query: "What is on the Zhihu hot list today?", platform: "zhihu" })` | Found zhihu.trends.list · $0.0020 a call | Free |
| `describe({ ids: ["zhihu.trends.list"] })` | Takes board · up to 30 a page | Free |
| `call({ capability: "zhihu.trends.list", max_price: "0.002" })` | Up to 30 trend objects · compact view | $0.0020 |

3 tool calls · 1 charged · $0.0020. Up to 30 trend objects came back in the standard shape. Your AI answers from it and says what the call cost.

## The Zhihu skill package

For agents that read skills (Claude Code, Codex, Cursor): one SKILL.md that lists the 16 Zhihu endpoints with their prices, how to call them by MCP, command line or REST, how paging works and which endpoint answers which question.

Tell your AI: Install the DataXAPI skill dataxapi-zhihu from https://dataxapi.com/skills/dataxapi-zhihu.zip.

## All 16 Zhihu endpoints your AI can call

Each one is a capability ID your AI passes to `call`. The name leads to the endpoint's page: its parameters, fields and a recorded response.

| Endpoint | Capability ID | Price |
| --- | --- | --- |
| [Zhihu answer comments](https://dataxapi.com/apis/zhihu/answers/comments/list/) | `zhihu.answers.comments.list` | $0.0020 |
| [Zhihu answer detail](https://dataxapi.com/apis/zhihu/answers/get/) | `zhihu.answers.get` | $0.0020 |
| [Zhihu article detail](https://dataxapi.com/apis/zhihu/articles/get/) | `zhihu.articles.get` | $0.0020 |
| [Zhihu column articles](https://dataxapi.com/apis/zhihu/columns/articles/list/) | `zhihu.columns.articles.list` | $0.0020 |
| [Zhihu comment replies](https://dataxapi.com/apis/zhihu/comments/replies/list/) | `zhihu.comments.replies.list` | $0.0020 |
| [Zhihu pin detail](https://dataxapi.com/apis/zhihu/pins/get/) | `zhihu.pins.get` | $0.0020 |
| [Zhihu content search](https://dataxapi.com/apis/zhihu/posts/search/) | `zhihu.posts.search` | $0.0020 |
| [Zhihu question answers](https://dataxapi.com/apis/zhihu/questions/answers/list/) | `zhihu.questions.answers.list` | $0.0020 |
| [Zhihu question detail](https://dataxapi.com/apis/zhihu/questions/get/) | `zhihu.questions.get` | $0.0020 |
| [Zhihu hot list](https://dataxapi.com/apis/zhihu/trends/list/) | `zhihu.trends.list` | $0.0020 |
| [Zhihu user answers](https://dataxapi.com/apis/zhihu/users/answers/list/) | `zhihu.users.answers.list` | $0.0020 |
| [Zhihu user articles](https://dataxapi.com/apis/zhihu/users/articles/list/) | `zhihu.users.articles.list` | $0.0020 |
| [Zhihu user followers](https://dataxapi.com/apis/zhihu/users/followers/list/) | `zhihu.users.followers.list` | $0.0020 |
| [Zhihu user profile](https://dataxapi.com/apis/zhihu/users/get/) | `zhihu.users.get` | $0.0020 |
| [Zhihu user pins](https://dataxapi.com/apis/zhihu/users/pins/list/) | `zhihu.users.pins.list` | $0.0020 |
| [Zhihu user search](https://dataxapi.com/apis/zhihu/users/search/) | `zhihu.users.search` | $0.0020 |

[Every Zhihu price, and what is charged →](https://dataxapi.com/pricing/zhihu/) · [Zhihu API](https://dataxapi.com/apis/zhihu/) · [MCP](https://dataxapi.com/mcp/)

## Questions

### What does it cost to ask about Zhihu?

Finding endpoints, reading their parameters and reading on in a result are free. A call costs $0.0020, each Zhihu endpoint at its own price. A call that fails is never charged.

### Do I need a Zhihu account?

No. There is no Zhihu login and no cookie to hand over: your AI uses your DataXAPI key and nothing else.

### Which AI clients work?

Any client that speaks MCP. Pasting the prompt sets up Claude Code, Cursor, Codex by itself; others take the server's address and your key by hand.

### Do I need the skill package as well as MCP?

No, either is enough. MCP gives your AI the tools; the skill tells an agent that reads skills which endpoint to use and what it costs, before it calls anything.

### Can my AI spend more than I want?

Every key can carry a daily or monthly budget, and every call a `max_price`. When the balance runs out, calls stop; nothing is charged on credit.

## The same in your AI for other platforms

[Douyin](https://dataxapi.com/mcp/douyin/) · [Bilibili](https://dataxapi.com/mcp/bilibili/) · [Kuaishou](https://dataxapi.com/mcp/kuaishou/) · [Telegram](https://dataxapi.com/mcp/telegram/) · [X (Twitter)](https://dataxapi.com/mcp/x/) · [Facebook](https://dataxapi.com/mcp/facebook/) · [Google Ads](https://dataxapi.com/mcp/google/) · [LinkedIn](https://dataxapi.com/mcp/linkedin/) · [Meta Ad Library](https://dataxapi.com/mcp/meta/) · [Threads](https://dataxapi.com/mcp/threads/) · [Instagram](https://dataxapi.com/mcp/instagram/) · [TikTok](https://dataxapi.com/mcp/tiktok/) · [Weibo](https://dataxapi.com/mcp/weibo/) · [Xiaohongshu (RedNote)](https://dataxapi.com/mcp/xiaohongshu/) · [YouTube](https://dataxapi.com/mcp/youtube/) · [WeChat Channels](https://dataxapi.com/mcp/wechat_channels/) · [WeChat Search](https://dataxapi.com/mcp/wechat/) · [WeChat Official Accounts](https://dataxapi.com/mcp/wechat_mp/) · [Reddit](https://dataxapi.com/mcp/reddit/) · [Pinterest](https://dataxapi.com/mcp/pinterest/)

---

Generated from catalog revision c48ce454ae6c4c65, price book 2. [Page](https://dataxapi.com/mcp/zhihu/)
