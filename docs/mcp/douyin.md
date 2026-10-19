# Douyin data in your AI

Ask your AI about Douyin and it answers with live data: 34 endpoints through 5 MCP tools or one skill package, from $0.0020 a call. Paste one prompt with your key to connect; a failed call is never charged.

- Endpoints: 34 (on Douyin, one response shape)
- Price: from $0.0020 (each endpoint at its own price; a failed call is free)
- MCP tools: `find`, `describe`, `call`, `read_more`, `account` (4 of them free, without a key)
- Skill package: [dataxapi-douyin](https://dataxapi.com/skills/dataxapi-douyin.zip)

## Copy this prompt

> Read https://dataxapi.com/agents.md and set up DataXAPI in this agent. My API key is dx_…; use it for every DataXAPI call.

Paste it into your agent. It reads the page the prompt points to and connects itself.

Ask about Douyin:

- What is on Douyin's hot search board right now?
- How has the 巨量算数 (trend-index) heat of “camping” moved over the last 30 days?
- What does this creator charge on 星图 (Xingtu) for one video?
- What are people saying in the comments of this Douyin video?

## What to ask about Douyin, and the endpoint that answers

Your AI picks the endpoint itself with `find`. These are the ones it lands on, with what each call costs.

| You ask | Endpoint | Price |
| --- | --- | --- |
| What is on Douyin's hot search board right now? | [Douyin hot search board](https://dataxapi.com/apis/douyin/trends/list/) `douyin.trends.list` | $0.0020 |
| How has the 巨量算数 (trend-index) heat of “camping” moved over the last 30 days? | [Douyin trend-index keyword trends](https://dataxapi.com/apis/douyin/index/keywords/history/) `douyin.index.keywords.history` | $0.0060 |
| What does this creator charge on 星图 (Xingtu) for one video? | [Douyin Xingtu creator rate card](https://dataxapi.com/apis/douyin/xingtu/creators/rates/get/) `douyin.xingtu.creators.rates.get` | $0.0400 |
| What are people saying in the comments of this Douyin video? | [Douyin video comments](https://dataxapi.com/apis/douyin/videos/comments/list/) `douyin.videos.comments.list` | $0.0020 |

## One question, three tool calls

What happens when you ask about Douyin: your AI looks the endpoint up for free, reads its parameters for free, and pays for one call.

> What is on Douyin's hot search board right now?

|  |  |  |
| --- | --- | --- |
| `find({ query: "What is on Douyin's hot search board right now?", platform: "douyin" })` | Found douyin.trends.list · $0.0020 a call | Free |
| `describe({ ids: ["douyin.trends.list"] })` | Takes board · up to 50 a page | Free |
| `call({ capability: "douyin.trends.list", max_price: "0.002" })` | Up to 50 trend objects · compact view | $0.0020 |

3 tool calls · 1 charged · $0.0020. Up to 50 trend objects came back in the standard shape. Your AI answers from it and says what the call cost.

## The Douyin skill package

For agents that read skills (Claude Code, Codex, Cursor): one SKILL.md that lists the 34 Douyin endpoints with their prices, how to call them by MCP, command line or REST, how paging works and which endpoint answers which question.

Tell your AI: Install the DataXAPI skill dataxapi-douyin from https://dataxapi.com/skills/dataxapi-douyin.zip.

## All 34 Douyin endpoints your AI can call

Each one is a capability ID your AI passes to `call`. The name leads to the endpoint's page: its parameters, fields and a recorded response.

| Endpoint | Capability ID | Price |
| --- | --- | --- |
| [Douyin comment replies](https://dataxapi.com/apis/douyin/comments/replies/list/) | `douyin.comments.replies.list` | $0.0020 |
| [Douyin hashtag videos](https://dataxapi.com/apis/douyin/hashtags/videos/list/) | `douyin.hashtags.videos.list` | $0.0020 |
| [Douyin trend-index brand trends](https://dataxapi.com/apis/douyin/index/brands/history/) | `douyin.index.brands.history` | $0.0020 |
| [Douyin trend-index brand comparison](https://dataxapi.com/apis/douyin/index/brands/metrics/) | `douyin.index.brands.metrics` | $0.0020 |
| [Douyin trend-index creator top videos](https://dataxapi.com/apis/douyin/index/creators/videos/list/) | `douyin.index.creators.videos.list` | $0.0020 |
| [Douyin trend-index creator follower profile](https://dataxapi.com/apis/douyin/index/creators/audience/get/) | `douyin.index.creators.audience.get` | $0.0020 |
| [Douyin trend-index creator core metrics](https://dataxapi.com/apis/douyin/index/creators/metrics/) | `douyin.index.creators.metrics` | $0.0020 |
| [Douyin trend-index keyword audience](https://dataxapi.com/apis/douyin/index/keywords/audience/get/) | `douyin.index.keywords.audience.get` | $0.0020 |
| [Douyin trend-index keyword trends](https://dataxapi.com/apis/douyin/index/keywords/history/) | `douyin.index.keywords.history` | $0.0060 |
| [Douyin trend-index related keywords](https://dataxapi.com/apis/douyin/index/keywords/related/) | `douyin.index.keywords.related` | $0.0020 |
| [Douyin trend-index live hot topics](https://dataxapi.com/apis/douyin/index/trends/list/) | `douyin.index.trends.list` | $0.0020 |
| [Douyin trend-index keyword hot videos](https://dataxapi.com/apis/douyin/index/videos/search/) | `douyin.index.videos.search` | $0.0020 |
| [Douyin hot search board](https://dataxapi.com/apis/douyin/trends/list/) | `douyin.trends.list` | $0.0020 |
| [Douyin user profile](https://dataxapi.com/apis/douyin/users/get/) | `douyin.users.get` | $0.0020 |
| [Douyin creator engagement and follower trends](https://dataxapi.com/apis/douyin/users/history/) | `douyin.users.history` | $0.0020 |
| [Douyin user search](https://dataxapi.com/apis/douyin/users/search/) | `douyin.users.search` | $0.0020 |
| [Douyin user videos](https://dataxapi.com/apis/douyin/users/videos/list/) | `douyin.users.videos.list` | $0.0020 |
| [Douyin video comments](https://dataxapi.com/apis/douyin/videos/comments/list/) | `douyin.videos.comments.list` | $0.0020 |
| [Douyin video detail](https://dataxapi.com/apis/douyin/videos/get/) | `douyin.videos.get` | $0.0020 |
| [Douyin video play count](https://dataxapi.com/apis/douyin/videos/metrics/) | `douyin.videos.metrics` | $0.0020 |
| [Douyin related videos](https://dataxapi.com/apis/douyin/videos/related/) | `douyin.videos.related` | $0.0020 |
| [Douyin video search](https://dataxapi.com/apis/douyin/videos/search/) | `douyin.videos.search` | $0.0200 |
| [Douyin trending videos](https://dataxapi.com/apis/douyin/videos/trending/) | `douyin.videos.trending` | $0.0020 |
| [Douyin Xingtu creator rate card](https://dataxapi.com/apis/douyin/xingtu/creators/rates/get/) | `douyin.xingtu.creators.rates.get` | $0.0400 |
| [Douyin Xingtu creator search](https://dataxapi.com/apis/douyin/xingtu/creators/search/) | `douyin.xingtu.creators.search` | $0.0040 |
| [Douyin Xingtu creator profile](https://dataxapi.com/apis/douyin/xingtu/creators/get/) | `douyin.xingtu.creators.get` | $0.0040 |
| [Douyin Xingtu creator audience](https://dataxapi.com/apis/douyin/xingtu/creators/audience/get/) | `douyin.xingtu.creators.audience.get` | $0.0040 |
| [Douyin Xingtu creator metrics](https://dataxapi.com/apis/douyin/xingtu/creators/metrics/) | `douyin.xingtu.creators.metrics` | $0.0040 |
| [Douyin Xingtu creator video performance](https://dataxapi.com/apis/douyin/xingtu/creators/videos/list/) | `douyin.xingtu.creators.videos.list` | $0.0040 |
| [Douyin Xingtu creator content keywords](https://dataxapi.com/apis/douyin/xingtu/creators/keywords/get/) | `douyin.xingtu.creators.keywords.get` | $0.0020 |
| [Douyin Xingtu creator index scores](https://dataxapi.com/apis/douyin/xingtu/creators/scores/get/) | `douyin.xingtu.creators.scores.get` | $0.0080 |
| [Douyin Xingtu creator content mix](https://dataxapi.com/apis/douyin/xingtu/creators/content_mix/get/) | `douyin.xingtu.creators.content_mix.get` | $0.0040 |
| [Douyin Xingtu creator conversion](https://dataxapi.com/apis/douyin/xingtu/creators/conversion/get/) | `douyin.xingtu.creators.conversion.get` | $0.0040 |
| [Douyin Xingtu marketing calendar](https://dataxapi.com/apis/douyin/xingtu/campaigns/list/) | `douyin.xingtu.campaigns.list` | $0.0040 |

[Every Douyin price, and what is charged →](https://dataxapi.com/pricing/douyin/) · [Douyin API](https://dataxapi.com/apis/douyin/) · [MCP](https://dataxapi.com/mcp/)

## Questions

### What does it cost to ask about Douyin?

Finding endpoints, reading their parameters and reading on in a result are free. A call costs from $0.0020 to $0.0400, each Douyin endpoint at its own price. A call that fails is never charged.

### Do I need a Douyin account?

No. There is no Douyin login and no cookie to hand over: your AI uses your DataXAPI key and nothing else.

### Which AI clients work?

Any client that speaks MCP. Pasting the prompt sets up Claude Code, Cursor, Codex by itself; others take the server's address and your key by hand.

### Do I need the skill package as well as MCP?

No, either is enough. MCP gives your AI the tools; the skill tells an agent that reads skills which endpoint to use and what it costs, before it calls anything.

### Can my AI spend more than I want?

Every key can carry a daily or monthly budget, and every call a `max_price`. When the balance runs out, calls stop; nothing is charged on credit.

## The same in your AI for other platforms

[Bilibili](https://dataxapi.com/mcp/bilibili/) · [Kuaishou](https://dataxapi.com/mcp/kuaishou/) · [Telegram](https://dataxapi.com/mcp/telegram/) · [X (Twitter)](https://dataxapi.com/mcp/x/) · [Facebook](https://dataxapi.com/mcp/facebook/) · [Google Ads](https://dataxapi.com/mcp/google/) · [LinkedIn](https://dataxapi.com/mcp/linkedin/) · [Meta Ad Library](https://dataxapi.com/mcp/meta/) · [Threads](https://dataxapi.com/mcp/threads/) · [Instagram](https://dataxapi.com/mcp/instagram/) · [TikTok](https://dataxapi.com/mcp/tiktok/) · [Weibo](https://dataxapi.com/mcp/weibo/) · [Xiaohongshu (RedNote)](https://dataxapi.com/mcp/xiaohongshu/) · [YouTube](https://dataxapi.com/mcp/youtube/) · [WeChat Channels](https://dataxapi.com/mcp/wechat_channels/) · [WeChat Search](https://dataxapi.com/mcp/wechat/) · [WeChat Official Accounts](https://dataxapi.com/mcp/wechat_mp/) · [Reddit](https://dataxapi.com/mcp/reddit/) · [Zhihu](https://dataxapi.com/mcp/zhihu/) · [Pinterest](https://dataxapi.com/mcp/pinterest/)

---

Generated from catalog revision c48ce454ae6c4c65, price book 2. [Page](https://dataxapi.com/mcp/douyin/)
