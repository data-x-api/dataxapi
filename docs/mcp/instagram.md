# Instagram data in your AI

Ask your AI about Instagram and it answers with live data: 8 endpoints through 5 MCP tools or one skill package, from $0.0020 a call. Paste one prompt with your key to connect; a failed call is never charged.

- Endpoints: 8 (on Instagram, one response shape)
- Price: from $0.0020 (each endpoint at its own price; a failed call is free)
- MCP tools: `find`, `describe`, `call`, `read_more`, `account` (4 of them free, without a key)
- Skill package: [dataxapi-instagram](https://dataxapi.com/skills/dataxapi-instagram.zip)

## Copy this prompt

> Read https://dataxapi.com/agents.md and set up DataXAPI in this agent. My API key is dx_…; use it for every DataXAPI call.

Paste it into your agent. It reads the page the prompt points to and connects itself.

Ask about Instagram:

- How many followers does this Instagram account have?
- What has this brand posted on Instagram lately?
- Which posts are under #matcha on Instagram?

## What to ask about Instagram, and the endpoint that answers

Your AI picks the endpoint itself with `find`. These are the ones it lands on, with what each call costs.

| You ask | Endpoint | Price |
| --- | --- | --- |
| How many followers does this Instagram account have? | [Instagram user profile](https://dataxapi.com/apis/instagram/users/get/) `instagram.users.get` | $0.0020 |
| What has this brand posted on Instagram lately? | [Instagram user posts](https://dataxapi.com/apis/instagram/users/posts/list/) `instagram.users.posts.list` | $0.0020 |
| Which posts are under #matcha on Instagram? | [Instagram hashtag posts](https://dataxapi.com/apis/instagram/hashtags/posts/list/) `instagram.hashtags.posts.list` | $0.0020 |

## One question, three tool calls

What happens when you ask about Instagram: your AI looks the endpoint up for free, reads its parameters for free, and pays for one call.

> How many followers does this Instagram account have?

|  |  |  |
| --- | --- | --- |
| `find({ query: "How many followers does this Instagram account have?", platform: "instagram" })` | Found instagram.users.get · $0.0020 a call | Free |
| `describe({ ids: ["instagram.users.get"] })` | Takes username · returns one object | Free |
| `call({ capability: "instagram.users.get", username: "nasa", max_price: "0.002" })` | One account object · compact view | $0.0020 |

3 tool calls · 1 charged · $0.0020. One account object came back in the standard shape. Your AI answers from it and says what the call cost.

## The Instagram skill package

For agents that read skills (Claude Code, Codex, Cursor): one SKILL.md that lists the 8 Instagram endpoints with their prices, how to call them by MCP, command line or REST, how paging works and which endpoint answers which question.

Tell your AI: Install the DataXAPI skill dataxapi-instagram from https://dataxapi.com/skills/dataxapi-instagram.zip.

## All 8 Instagram endpoints your AI can call

Each one is a capability ID your AI passes to `call`. The name leads to the endpoint's page: its parameters, fields and a recorded response.

| Endpoint | Capability ID | Price |
| --- | --- | --- |
| [Instagram comment replies](https://dataxapi.com/apis/instagram/comments/replies/list/) | `instagram.comments.replies.list` | $0.0020 |
| [Instagram hashtag posts](https://dataxapi.com/apis/instagram/hashtags/posts/list/) | `instagram.hashtags.posts.list` | $0.0020 |
| [Instagram post comments](https://dataxapi.com/apis/instagram/posts/comments/list/) | `instagram.posts.comments.list` | $0.0020 |
| [Instagram post detail](https://dataxapi.com/apis/instagram/posts/get/) | `instagram.posts.get` | $0.0020 |
| [Instagram video transcript](https://dataxapi.com/apis/instagram/posts/transcript/get/) | `instagram.posts.transcript.get` | $0.0020 |
| [Instagram user profile](https://dataxapi.com/apis/instagram/users/get/) | `instagram.users.get` | $0.0020 |
| [Instagram user posts](https://dataxapi.com/apis/instagram/users/posts/list/) | `instagram.users.posts.list` | $0.0020 |
| [Instagram user search](https://dataxapi.com/apis/instagram/users/search/) | `instagram.users.search` | $0.0040 |

[Every Instagram price, and what is charged →](https://dataxapi.com/pricing/instagram/) · [Instagram API](https://dataxapi.com/apis/instagram/) · [MCP](https://dataxapi.com/mcp/)

## Questions

### What does it cost to ask about Instagram?

Finding endpoints, reading their parameters and reading on in a result are free. A call costs from $0.0020 to $0.0040, each Instagram endpoint at its own price. A call that fails is never charged.

### Do I need a Instagram account?

No. There is no Instagram login and no cookie to hand over: your AI uses your DataXAPI key and nothing else.

### Which AI clients work?

Any client that speaks MCP. Pasting the prompt sets up Claude Code, Cursor, Codex by itself; others take the server's address and your key by hand.

### Do I need the skill package as well as MCP?

No, either is enough. MCP gives your AI the tools; the skill tells an agent that reads skills which endpoint to use and what it costs, before it calls anything.

### Can my AI spend more than I want?

Every key can carry a daily or monthly budget, and every call a `max_price`. When the balance runs out, calls stop; nothing is charged on credit.

## The same in your AI for other platforms

[Douyin](https://dataxapi.com/mcp/douyin/) · [Bilibili](https://dataxapi.com/mcp/bilibili/) · [Kuaishou](https://dataxapi.com/mcp/kuaishou/) · [Telegram](https://dataxapi.com/mcp/telegram/) · [X (Twitter)](https://dataxapi.com/mcp/x/) · [Facebook](https://dataxapi.com/mcp/facebook/) · [Google Ads](https://dataxapi.com/mcp/google/) · [LinkedIn](https://dataxapi.com/mcp/linkedin/) · [Meta Ad Library](https://dataxapi.com/mcp/meta/) · [Threads](https://dataxapi.com/mcp/threads/) · [TikTok](https://dataxapi.com/mcp/tiktok/) · [Weibo](https://dataxapi.com/mcp/weibo/) · [Xiaohongshu (RedNote)](https://dataxapi.com/mcp/xiaohongshu/) · [YouTube](https://dataxapi.com/mcp/youtube/) · [WeChat Channels](https://dataxapi.com/mcp/wechat_channels/) · [WeChat Search](https://dataxapi.com/mcp/wechat/) · [WeChat Official Accounts](https://dataxapi.com/mcp/wechat_mp/) · [Reddit](https://dataxapi.com/mcp/reddit/) · [Zhihu](https://dataxapi.com/mcp/zhihu/) · [Pinterest](https://dataxapi.com/mcp/pinterest/)

---

Generated from catalog revision c48ce454ae6c4c65, price book 2. [Page](https://dataxapi.com/mcp/instagram/)
