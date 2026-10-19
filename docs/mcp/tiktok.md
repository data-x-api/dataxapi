# TikTok data in your AI

Ask your AI about TikTok and it answers with live data: 18 endpoints through 5 MCP tools or one skill package, from $0.0020 a call. Paste one prompt with your key to connect; a failed call is never charged.

- Endpoints: 18 (on TikTok, one response shape)
- Price: from $0.0020 (each endpoint at its own price; a failed call is free)
- MCP tools: `find`, `describe`, `call`, `read_more`, `account` (4 of them free, without a key)
- Skill package: [dataxapi-tiktok](https://dataxapi.com/skills/dataxapi-tiktok.zip)

## Copy this prompt

> Read https://dataxapi.com/agents.md and set up DataXAPI in this agent. My API key is dx_…; use it for every DataXAPI call.

Paste it into your agent. It reads the page the prompt points to and connects itself.

Ask about TikTok:

- Find TikTok videos about camping coffee.
- What are people saying in the comments of this TikTok video?
- Which TikTok Shop products come up for “portable blender”?
- Get the transcript of this TikTok video.

## What to ask about TikTok, and the endpoint that answers

Your AI picks the endpoint itself with `find`. These are the ones it lands on, with what each call costs.

| You ask | Endpoint | Price |
| --- | --- | --- |
| Find TikTok videos about camping coffee. | [TikTok video search](https://dataxapi.com/apis/tiktok/videos/search/) `tiktok.videos.search` | $0.0020 |
| What are people saying in the comments of this TikTok video? | [TikTok video comments](https://dataxapi.com/apis/tiktok/videos/comments/list/) `tiktok.videos.comments.list` | $0.0020 |
| Which TikTok Shop products come up for “portable blender”? | [TikTok Shop product search](https://dataxapi.com/apis/tiktok/shop/products/search/) `tiktok.shop.products.search` | $0.0020 |
| Get the transcript of this TikTok video. | [TikTok video transcript](https://dataxapi.com/apis/tiktok/videos/transcript/get/) `tiktok.videos.transcript.get` | $0.0020 |

## One question, three tool calls

What happens when you ask about TikTok: your AI looks the endpoint up for free, reads its parameters for free, and pays for one call.

> Find TikTok videos about camping coffee.

|  |  |  |
| --- | --- | --- |
| `find({ query: "Find TikTok videos about camping coffee.", platform: "tiktok" })` | Found tiktok.videos.search · $0.0020 a call | Free |
| `describe({ ids: ["tiktok.videos.search"] })` | Takes query, sort, published_within · up to 30 a page | Free |
| `call({ capability: "tiktok.videos.search", query: "space station", max_price: "0.002" })` | Up to 30 post objects · compact view | $0.0020 |

3 tool calls · 1 charged · $0.0020. Up to 30 post objects came back in the standard shape. Your AI answers from it and says what the call cost.

## The TikTok skill package

For agents that read skills (Claude Code, Codex, Cursor): one SKILL.md that lists the 18 TikTok endpoints with their prices, how to call them by MCP, command line or REST, how paging works and which endpoint answers which question.

Tell your AI: Install the DataXAPI skill dataxapi-tiktok from https://dataxapi.com/skills/dataxapi-tiktok.zip.

## All 18 TikTok endpoints your AI can call

Each one is a capability ID your AI passes to `call`. The name leads to the endpoint's page: its parameters, fields and a recorded response.

| Endpoint | Capability ID | Price |
| --- | --- | --- |
| [TikTok Ads Library search](https://dataxapi.com/apis/tiktok/ads/search/) | `tiktok.ads.search` | $0.0020 |
| [TikTok Ads Library ad detail](https://dataxapi.com/apis/tiktok/ads/get/) | `tiktok.ads.get` | $0.0020 |
| [TikTok comment replies](https://dataxapi.com/apis/tiktok/comments/replies/list/) | `tiktok.comments.replies.list` | $0.0020 |
| [TikTok Creative Center Top Ad detail](https://dataxapi.com/apis/tiktok/creative_center/ads/get/) | `tiktok.creative_center.ads.get` | $0.0020 |
| [TikTok Creative Center Top Ads search](https://dataxapi.com/apis/tiktok/creative_center/ads/search/) | `tiktok.creative_center.ads.search` | $0.0020 |
| [TikTok hashtag videos](https://dataxapi.com/apis/tiktok/hashtags/videos/list/) | `tiktok.hashtags.videos.list` | $0.0020 |
| [TikTok user profile](https://dataxapi.com/apis/tiktok/users/get/) | `tiktok.users.get` | $0.0020 |
| [TikTok user search](https://dataxapi.com/apis/tiktok/users/search/) | `tiktok.users.search` | $0.0020 |
| [TikTok user videos](https://dataxapi.com/apis/tiktok/users/videos/list/) | `tiktok.users.videos.list` | $0.0020 |
| [TikTok video comments](https://dataxapi.com/apis/tiktok/videos/comments/list/) | `tiktok.videos.comments.list` | $0.0020 |
| [TikTok video detail](https://dataxapi.com/apis/tiktok/videos/get/) | `tiktok.videos.get` | $0.0020 |
| [TikTok video search](https://dataxapi.com/apis/tiktok/videos/search/) | `tiktok.videos.search` | $0.0020 |
| [TikTok video transcript](https://dataxapi.com/apis/tiktok/videos/transcript/get/) | `tiktok.videos.transcript.get` | $0.0020 |
| [TikTok Shop product detail](https://dataxapi.com/apis/tiktok/shop/products/get/) | `tiktok.shop.products.get` | $0.0020 |
| [TikTok Shop product reviews](https://dataxapi.com/apis/tiktok/shop/products/reviews/list/) | `tiktok.shop.products.reviews.list` | $0.0020 |
| [TikTok Shop product search](https://dataxapi.com/apis/tiktok/shop/products/search/) | `tiktok.shop.products.search` | $0.0020 |
| [TikTok Shop seller products](https://dataxapi.com/apis/tiktok/shop/sellers/products/list/) | `tiktok.shop.sellers.products.list` | $0.0020 |
| [TikTok user followers](https://dataxapi.com/apis/tiktok/users/followers/list/) | `tiktok.users.followers.list` | $0.0020 |

[Every TikTok price, and what is charged →](https://dataxapi.com/pricing/tiktok/) · [TikTok API](https://dataxapi.com/apis/tiktok/) · [MCP](https://dataxapi.com/mcp/)

## Questions

### What does it cost to ask about TikTok?

Finding endpoints, reading their parameters and reading on in a result are free. A call costs $0.0020, each TikTok endpoint at its own price. A call that fails is never charged.

### Do I need a TikTok account?

No. There is no TikTok login and no cookie to hand over: your AI uses your DataXAPI key and nothing else.

### Which AI clients work?

Any client that speaks MCP. Pasting the prompt sets up Claude Code, Cursor, Codex by itself; others take the server's address and your key by hand.

### Do I need the skill package as well as MCP?

No, either is enough. MCP gives your AI the tools; the skill tells an agent that reads skills which endpoint to use and what it costs, before it calls anything.

### Can my AI spend more than I want?

Every key can carry a daily or monthly budget, and every call a `max_price`. When the balance runs out, calls stop; nothing is charged on credit.

## The same in your AI for other platforms

[Douyin](https://dataxapi.com/mcp/douyin/) · [Bilibili](https://dataxapi.com/mcp/bilibili/) · [Kuaishou](https://dataxapi.com/mcp/kuaishou/) · [Telegram](https://dataxapi.com/mcp/telegram/) · [X (Twitter)](https://dataxapi.com/mcp/x/) · [Facebook](https://dataxapi.com/mcp/facebook/) · [Google Ads](https://dataxapi.com/mcp/google/) · [LinkedIn](https://dataxapi.com/mcp/linkedin/) · [Meta Ad Library](https://dataxapi.com/mcp/meta/) · [Threads](https://dataxapi.com/mcp/threads/) · [Instagram](https://dataxapi.com/mcp/instagram/) · [Weibo](https://dataxapi.com/mcp/weibo/) · [Xiaohongshu (RedNote)](https://dataxapi.com/mcp/xiaohongshu/) · [YouTube](https://dataxapi.com/mcp/youtube/) · [WeChat Channels](https://dataxapi.com/mcp/wechat_channels/) · [WeChat Search](https://dataxapi.com/mcp/wechat/) · [WeChat Official Accounts](https://dataxapi.com/mcp/wechat_mp/) · [Reddit](https://dataxapi.com/mcp/reddit/) · [Zhihu](https://dataxapi.com/mcp/zhihu/) · [Pinterest](https://dataxapi.com/mcp/pinterest/)

---

Generated from catalog revision c48ce454ae6c4c65, price book 2. [Page](https://dataxapi.com/mcp/tiktok/)
