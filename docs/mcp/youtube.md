# YouTube data in your AI

Ask your AI about YouTube and it answers with live data: 10 endpoints through 5 MCP tools or one skill package, from $0.0020 a call. Paste one prompt with your key to connect; a failed call is never charged.

- Endpoints: 10 (on YouTube, one response shape)
- Price: from $0.0020 (each endpoint at its own price; a failed call is free)
- MCP tools: `find`, `describe`, `call`, `read_more`, `account` (4 of them free, without a key)
- Skill package: [dataxapi-youtube](https://dataxapi.com/skills/dataxapi-youtube.zip)

## Copy this prompt

> Read https://dataxapi.com/agents.md and set up DataXAPI in this agent. My API key is dx_…; use it for every DataXAPI call.

Paste it into your agent. It reads the page the prompt points to and connects itself.

Ask about YouTube:

- Get the transcript of this YouTube video and sum it up.
- What do the comments under this YouTube review say?
- List this YouTube channel's latest uploads with their views.

## What to ask about YouTube, and the endpoint that answers

Your AI picks the endpoint itself with `find`. These are the ones it lands on, with what each call costs.

| You ask | Endpoint | Price |
| --- | --- | --- |
| Get the transcript of this YouTube video and sum it up. | [YouTube video transcript](https://dataxapi.com/apis/youtube/videos/transcript/get/) `youtube.videos.transcript.get` | $0.0020 |
| What do the comments under this YouTube review say? | [YouTube video comments](https://dataxapi.com/apis/youtube/videos/comments/list/) `youtube.videos.comments.list` | $0.0020 |
| List this YouTube channel's latest uploads with their views. | [YouTube channel videos](https://dataxapi.com/apis/youtube/channels/videos/list/) `youtube.channels.videos.list` | $0.0020 |

## One question, three tool calls

What happens when you ask about YouTube: your AI looks the endpoint up for free, reads its parameters for free, and pays for one call.

> Get the transcript of this YouTube video and sum it up.

|  |  |  |
| --- | --- | --- |
| `find({ query: "Get the transcript of this YouTube video and sum it up.", platform: "youtube" })` | Found youtube.videos.transcript.get · $0.0020 a call | Free |
| `describe({ ids: ["youtube.videos.transcript.get"] })` | Takes id, url · returns one object | Free |
| `call({ capability: "youtube.videos.transcript.get", id: "dQw4w9WgXcQ", max_price: "0.002" })` | One transcript object · compact view | $0.0020 |

3 tool calls · 1 charged · $0.0020. One transcript object came back in the standard shape. Your AI answers from it and says what the call cost.

## The YouTube skill package

For agents that read skills (Claude Code, Codex, Cursor): one SKILL.md that lists the 10 YouTube endpoints with their prices, how to call them by MCP, command line or REST, how paging works and which endpoint answers which question.

Tell your AI: Install the DataXAPI skill dataxapi-youtube from https://dataxapi.com/skills/dataxapi-youtube.zip.

## All 10 YouTube endpoints your AI can call

Each one is a capability ID your AI passes to `call`. The name leads to the endpoint's page: its parameters, fields and a recorded response.

| Endpoint | Capability ID | Price |
| --- | --- | --- |
| [YouTube channel profile](https://dataxapi.com/apis/youtube/channels/get/) | `youtube.channels.get` | $0.0020 |
| [YouTube channel search](https://dataxapi.com/apis/youtube/channels/search/) | `youtube.channels.search` | $0.0020 |
| [YouTube channel videos](https://dataxapi.com/apis/youtube/channels/videos/list/) | `youtube.channels.videos.list` | $0.0020 |
| [YouTube comment replies](https://dataxapi.com/apis/youtube/comments/replies/list/) | `youtube.comments.replies.list` | $0.0020 |
| [YouTube video comments](https://dataxapi.com/apis/youtube/videos/comments/list/) | `youtube.videos.comments.list` | $0.0020 |
| [YouTube video detail](https://dataxapi.com/apis/youtube/videos/get/) | `youtube.videos.get` | $0.0020 |
| [YouTube video search](https://dataxapi.com/apis/youtube/videos/search/) | `youtube.videos.search` | $0.0020 |
| [YouTube video transcript](https://dataxapi.com/apis/youtube/videos/transcript/get/) | `youtube.videos.transcript.get` | $0.0020 |
| [YouTube channel posts](https://dataxapi.com/apis/youtube/channels/posts/list/) | `youtube.channels.posts.list` | $0.0020 |
| [YouTube post detail](https://dataxapi.com/apis/youtube/posts/get/) | `youtube.posts.get` | $0.0020 |

[Every YouTube price, and what is charged →](https://dataxapi.com/pricing/youtube/) · [YouTube API](https://dataxapi.com/apis/youtube/) · [MCP](https://dataxapi.com/mcp/)

## Questions

### What does it cost to ask about YouTube?

Finding endpoints, reading their parameters and reading on in a result are free. A call costs $0.0020, each YouTube endpoint at its own price. A call that fails is never charged.

### Do I need a YouTube account?

No. There is no YouTube login and no cookie to hand over: your AI uses your DataXAPI key and nothing else.

### Which AI clients work?

Any client that speaks MCP. Pasting the prompt sets up Claude Code, Cursor, Codex by itself; others take the server's address and your key by hand.

### Do I need the skill package as well as MCP?

No, either is enough. MCP gives your AI the tools; the skill tells an agent that reads skills which endpoint to use and what it costs, before it calls anything.

### Can my AI spend more than I want?

Every key can carry a daily or monthly budget, and every call a `max_price`. When the balance runs out, calls stop; nothing is charged on credit.

## The same in your AI for other platforms

[Douyin](https://dataxapi.com/mcp/douyin/) · [Bilibili](https://dataxapi.com/mcp/bilibili/) · [Kuaishou](https://dataxapi.com/mcp/kuaishou/) · [Telegram](https://dataxapi.com/mcp/telegram/) · [X (Twitter)](https://dataxapi.com/mcp/x/) · [Facebook](https://dataxapi.com/mcp/facebook/) · [Google Ads](https://dataxapi.com/mcp/google/) · [LinkedIn](https://dataxapi.com/mcp/linkedin/) · [Meta Ad Library](https://dataxapi.com/mcp/meta/) · [Threads](https://dataxapi.com/mcp/threads/) · [Instagram](https://dataxapi.com/mcp/instagram/) · [TikTok](https://dataxapi.com/mcp/tiktok/) · [Weibo](https://dataxapi.com/mcp/weibo/) · [Xiaohongshu (RedNote)](https://dataxapi.com/mcp/xiaohongshu/) · [WeChat Channels](https://dataxapi.com/mcp/wechat_channels/) · [WeChat Search](https://dataxapi.com/mcp/wechat/) · [WeChat Official Accounts](https://dataxapi.com/mcp/wechat_mp/) · [Reddit](https://dataxapi.com/mcp/reddit/) · [Zhihu](https://dataxapi.com/mcp/zhihu/) · [Pinterest](https://dataxapi.com/mcp/pinterest/)

---

Generated from catalog revision c48ce454ae6c4c65, price book 2. [Page](https://dataxapi.com/mcp/youtube/)
