# X (Twitter) data in your AI

Ask your AI about X (Twitter) and it answers with live data: 21 endpoints through 5 MCP tools or one skill package, from $0.0003 a call. Paste one prompt with your key to connect; a failed call is never charged.

- Endpoints: 21 (on X (Twitter), one response shape)
- Price: from $0.0003 (each endpoint at its own price; a failed call is free)
- MCP tools: `find`, `describe`, `call`, `read_more`, `account` (4 of them free, without a key)
- Skill package: [dataxapi-x](https://dataxapi.com/skills/dataxapi-x.zip)

## Copy this prompt

> Read https://dataxapi.com/agents.md and set up DataXAPI in this agent. My API key is dx_…; use it for every DataXAPI call.

Paste it into your agent. It reads the page the prompt points to and connects itself.

Ask about X (Twitter):

- What is trending on X (Twitter) in Japan today?
- Find posts on X about our product launch.
- How many followers does @NASA have on X?

## What to ask about X (Twitter), and the endpoint that answers

Your AI picks the endpoint itself with `find`. These are the ones it lands on, with what each call costs.

| You ask | Endpoint | Price |
| --- | --- | --- |
| What is trending on X (Twitter) in Japan today? | [X trends](https://dataxapi.com/apis/x/trends/list/) `x.trends.list` | $0.0090 |
| Find posts on X about our product launch. | [X post search](https://dataxapi.com/apis/x/posts/search/) `x.posts.search` | $0.0020 |
| How many followers does @NASA have on X? | [X user profile](https://dataxapi.com/apis/x/users/get/) `x.users.get` | $0.0004 per item, at least $0.0004 a call |

## One question, three tool calls

What happens when you ask about X (Twitter): your AI looks the endpoint up for free, reads its parameters for free, and pays for one call.

> What is trending on X (Twitter) in Japan today?

|  |  |  |
| --- | --- | --- |
| `find({ query: "What is trending on X (Twitter) in Japan today?", platform: "x" })` | Found x.trends.list · $0.0090 a call | Free |
| `describe({ ids: ["x.trends.list"] })` | Takes board, region · up to 30 a page | Free |
| `call({ capability: "x.trends.list", max_price: "0.009" })` | Up to 30 trend objects · compact view | $0.0090 |

3 tool calls · 1 charged · $0.0090. Up to 30 trend objects came back in the standard shape. Your AI answers from it and says what the call cost.

## The X (Twitter) skill package

For agents that read skills (Claude Code, Codex, Cursor): one SKILL.md that lists the 21 X (Twitter) endpoints with their prices, how to call them by MCP, command line or REST, how paging works and which endpoint answers which question.

Tell your AI: Install the DataXAPI skill dataxapi-x from https://dataxapi.com/skills/dataxapi-x.zip.

## All 21 X (Twitter) endpoints your AI can call

Each one is a capability ID your AI passes to `call`. The name leads to the endpoint's page: its parameters, fields and a recorded response.

| Endpoint | Capability ID | Price |
| --- | --- | --- |
| [X community posts](https://dataxapi.com/apis/x/communities/posts/list/) | `x.communities.posts.list` | $0.0003 per item, at least $0.0003 a call |
| [X list posts](https://dataxapi.com/apis/x/lists/posts/list/) | `x.lists.posts.list` | $0.0020 |
| [X article detail](https://dataxapi.com/apis/x/posts/article/get/) | `x.posts.article.get` | $0.0020 |
| [X post detail](https://dataxapi.com/apis/x/posts/get/) | `x.posts.get` | $0.0003 |
| [X post quotes](https://dataxapi.com/apis/x/posts/quotes/list/) | `x.posts.quotes.list` | $0.0003 per item, at least $0.0003 a call |
| [X post replies](https://dataxapi.com/apis/x/posts/replies/list/) | `x.posts.replies.list` | $0.0020 |
| [X post retweeters](https://dataxapi.com/apis/x/posts/retweeters/list/) | `x.posts.retweeters.list` | $0.0020 |
| [X post search](https://dataxapi.com/apis/x/posts/search/) | `x.posts.search` | $0.0020 |
| [X thread context](https://dataxapi.com/apis/x/threads/posts/list/) | `x.threads.posts.list` | $0.0003 per item, at least $0.0003 a call |
| [X trends](https://dataxapi.com/apis/x/trends/list/) | `x.trends.list` | $0.0090 |
| [X user followers](https://dataxapi.com/apis/x/users/followers/list/) | `x.users.followers.list` | $0.0001 per item, at least $0.0004 a call |
| [X user following](https://dataxapi.com/apis/x/users/following/list/) | `x.users.following.list` | $0.0001 per item, at least $0.0004 a call |
| [X user profile](https://dataxapi.com/apis/x/users/get/) | `x.users.get` | $0.0004 per item, at least $0.0004 a call |
| [X user mentions](https://dataxapi.com/apis/x/users/mentions/list/) | `x.users.mentions.list` | $0.0003 per item, at least $0.0003 a call |
| [X user posts](https://dataxapi.com/apis/x/users/posts/list/) | `x.users.posts.list` | $0.0020 |
| [X user search](https://dataxapi.com/apis/x/users/search/) | `x.users.search` | $0.0004 per item, at least $0.0004 a call |
| [X community profile](https://dataxapi.com/apis/x/communities/get/) | `x.communities.get` | $0.0004 |
| [X community members](https://dataxapi.com/apis/x/communities/members/list/) | `x.communities.members.list` | $0.0004 per item, at least $0.0004 a call |
| [X list followers](https://dataxapi.com/apis/x/lists/followers/list/) | `x.lists.followers.list` | $0.0004 per item, at least $0.0004 a call |
| [X list members](https://dataxapi.com/apis/x/lists/members/list/) | `x.lists.members.list` | $0.0004 per item, at least $0.0004 a call |
| [X video transcript](https://dataxapi.com/apis/x/posts/transcript/get/) | `x.posts.transcript.get` | $0.0020 |

[Every X (Twitter) price, and what is charged →](https://dataxapi.com/pricing/x/) · [X (Twitter) API](https://dataxapi.com/apis/x/) · [MCP](https://dataxapi.com/mcp/)

## Questions

### What does it cost to ask about X (Twitter)?

Finding endpoints, reading their parameters and reading on in a result are free. A call costs from $0.0003 to $0.0400, each X (Twitter) endpoint at its own price. A call that fails is never charged.

### Do I need a X (Twitter) account?

No. There is no X (Twitter) login and no cookie to hand over: your AI uses your DataXAPI key and nothing else.

### Which AI clients work?

Any client that speaks MCP. Pasting the prompt sets up Claude Code, Cursor, Codex by itself; others take the server's address and your key by hand.

### Do I need the skill package as well as MCP?

No, either is enough. MCP gives your AI the tools; the skill tells an agent that reads skills which endpoint to use and what it costs, before it calls anything.

### Can my AI spend more than I want?

Every key can carry a daily or monthly budget, and every call a `max_price`. When the balance runs out, calls stop; nothing is charged on credit.

## The same in your AI for other platforms

[Douyin](https://dataxapi.com/mcp/douyin/) · [Bilibili](https://dataxapi.com/mcp/bilibili/) · [Kuaishou](https://dataxapi.com/mcp/kuaishou/) · [Telegram](https://dataxapi.com/mcp/telegram/) · [Facebook](https://dataxapi.com/mcp/facebook/) · [Google Ads](https://dataxapi.com/mcp/google/) · [LinkedIn](https://dataxapi.com/mcp/linkedin/) · [Meta Ad Library](https://dataxapi.com/mcp/meta/) · [Threads](https://dataxapi.com/mcp/threads/) · [Instagram](https://dataxapi.com/mcp/instagram/) · [TikTok](https://dataxapi.com/mcp/tiktok/) · [Weibo](https://dataxapi.com/mcp/weibo/) · [Xiaohongshu (RedNote)](https://dataxapi.com/mcp/xiaohongshu/) · [YouTube](https://dataxapi.com/mcp/youtube/) · [WeChat Channels](https://dataxapi.com/mcp/wechat_channels/) · [WeChat Search](https://dataxapi.com/mcp/wechat/) · [WeChat Official Accounts](https://dataxapi.com/mcp/wechat_mp/) · [Reddit](https://dataxapi.com/mcp/reddit/) · [Zhihu](https://dataxapi.com/mcp/zhihu/) · [Pinterest](https://dataxapi.com/mcp/pinterest/)

---

Generated from catalog revision c48ce454ae6c4c65, price book 2. [Page](https://dataxapi.com/mcp/x/)
