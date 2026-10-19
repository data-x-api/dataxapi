# Meta Ad Library data in your AI

Ask your AI about Meta Ad Library and it answers with live data: 5 endpoints through 5 MCP tools or one skill package, from $0.0020 a call. Paste one prompt with your key to connect; a failed call is never charged.

- Endpoints: 5 (on Meta Ad Library, one response shape)
- Price: from $0.0020 (each endpoint at its own price; a failed call is free)
- MCP tools: `find`, `describe`, `call`, `read_more`, `account` (4 of them free, without a key)
- Skill package: [dataxapi-meta](https://dataxapi.com/skills/dataxapi-meta.zip)

## Copy this prompt

> Read https://dataxapi.com/agents.md and set up DataXAPI in this agent. My API key is dx_…; use it for every DataXAPI call.

Paste it into your agent. It reads the page the prompt points to and connects itself.

Ask about Meta Ad Library:

- Which ads is this brand running on Facebook and Instagram?
- Search the Meta Ad Library for protein powder ads.
- Transcribe the video of this Meta ad.

## What to ask about Meta Ad Library, and the endpoint that answers

Your AI picks the endpoint itself with `find`. These are the ones it lands on, with what each call costs.

| You ask | Endpoint | Price |
| --- | --- | --- |
| Which ads is this brand running on Facebook and Instagram? | [Meta advertiser's ads](https://dataxapi.com/apis/meta/advertisers/ads/list/) `meta.advertisers.ads.list` | $0.0020 |
| Search the Meta Ad Library for protein powder ads. | [Meta Ad Library search](https://dataxapi.com/apis/meta/ads/search/) `meta.ads.search` | $0.0020 |
| Transcribe the video of this Meta ad. | [Meta ad video transcript](https://dataxapi.com/apis/meta/ads/transcript/get/) `meta.ads.transcript.get` | $0.0020 |

## One question, three tool calls

What happens when you ask about Meta Ad Library: your AI looks the endpoint up for free, reads its parameters for free, and pays for one call.

> Which ads is this brand running on Facebook and Instagram?

|  |  |  |
| --- | --- | --- |
| `find({ query: "Which ads is this brand running on Facebook and Instagram?", platform: "meta" })` | Found meta.advertisers.ads.list · $0.0020 a call | Free |
| `describe({ ids: ["meta.advertisers.ads.list"] })` | Takes id, region, sort, type · up to 30 a page | Free |
| `call({ capability: "meta.advertisers.ads.list", id: "182162001806727", max_price: "0.002" })` | Up to 30 ad objects · compact view | $0.0020 |

3 tool calls · 1 charged · $0.0020. Up to 30 ad objects came back in the standard shape. Your AI answers from it and says what the call cost.

## The Meta Ad Library skill package

For agents that read skills (Claude Code, Codex, Cursor): one SKILL.md that lists the 5 Meta Ad Library endpoints with their prices, how to call them by MCP, command line or REST, how paging works and which endpoint answers which question.

Tell your AI: Install the DataXAPI skill dataxapi-meta from https://dataxapi.com/skills/dataxapi-meta.zip.

## All 5 Meta Ad Library endpoints your AI can call

Each one is a capability ID your AI passes to `call`. The name leads to the endpoint's page: its parameters, fields and a recorded response.

| Endpoint | Capability ID | Price |
| --- | --- | --- |
| [Meta ad detail](https://dataxapi.com/apis/meta/ads/get/) | `meta.ads.get` | $0.0020 |
| [Meta Ad Library search](https://dataxapi.com/apis/meta/ads/search/) | `meta.ads.search` | $0.0020 |
| [Meta ad video transcript](https://dataxapi.com/apis/meta/ads/transcript/get/) | `meta.ads.transcript.get` | $0.0020 |
| [Meta advertiser's ads](https://dataxapi.com/apis/meta/advertisers/ads/list/) | `meta.advertisers.ads.list` | $0.0020 |
| [Meta advertiser search](https://dataxapi.com/apis/meta/advertisers/search/) | `meta.advertisers.search` | $0.0020 |

[Every Meta Ad Library price, and what is charged →](https://dataxapi.com/pricing/meta/) · [Meta Ad Library API](https://dataxapi.com/apis/meta/) · [MCP](https://dataxapi.com/mcp/)

## Questions

### What does it cost to ask about Meta Ad Library?

Finding endpoints, reading their parameters and reading on in a result are free. A call costs $0.0020, each Meta Ad Library endpoint at its own price. A call that fails is never charged.

### Do I need a Meta Ad Library account?

No. There is no Meta Ad Library login and no cookie to hand over: your AI uses your DataXAPI key and nothing else.

### Which AI clients work?

Any client that speaks MCP. Pasting the prompt sets up Claude Code, Cursor, Codex by itself; others take the server's address and your key by hand.

### Do I need the skill package as well as MCP?

No, either is enough. MCP gives your AI the tools; the skill tells an agent that reads skills which endpoint to use and what it costs, before it calls anything.

### Can my AI spend more than I want?

Every key can carry a daily or monthly budget, and every call a `max_price`. When the balance runs out, calls stop; nothing is charged on credit.

## The same in your AI for other platforms

[Douyin](https://dataxapi.com/mcp/douyin/) · [Bilibili](https://dataxapi.com/mcp/bilibili/) · [Kuaishou](https://dataxapi.com/mcp/kuaishou/) · [Telegram](https://dataxapi.com/mcp/telegram/) · [X (Twitter)](https://dataxapi.com/mcp/x/) · [Facebook](https://dataxapi.com/mcp/facebook/) · [Google Ads](https://dataxapi.com/mcp/google/) · [LinkedIn](https://dataxapi.com/mcp/linkedin/) · [Threads](https://dataxapi.com/mcp/threads/) · [Instagram](https://dataxapi.com/mcp/instagram/) · [TikTok](https://dataxapi.com/mcp/tiktok/) · [Weibo](https://dataxapi.com/mcp/weibo/) · [Xiaohongshu (RedNote)](https://dataxapi.com/mcp/xiaohongshu/) · [YouTube](https://dataxapi.com/mcp/youtube/) · [WeChat Channels](https://dataxapi.com/mcp/wechat_channels/) · [WeChat Search](https://dataxapi.com/mcp/wechat/) · [WeChat Official Accounts](https://dataxapi.com/mcp/wechat_mp/) · [Reddit](https://dataxapi.com/mcp/reddit/) · [Zhihu](https://dataxapi.com/mcp/zhihu/) · [Pinterest](https://dataxapi.com/mcp/pinterest/)

---

Generated from catalog revision c48ce454ae6c4c65, price book 2. [Page](https://dataxapi.com/mcp/meta/)
