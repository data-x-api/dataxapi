# DataXAPI for Python

[DataXAPI](https://dataxapi.com) is market data infrastructure for developers and AI agents: 204 endpoints across 20
platforms (Douyin, Xiaohongshu (RedNote), TikTok, WeChat, X, YouTube and more) behind one key and one response
shape, paid per call from $0.0003, with failed calls free and $0.10 of free credit on sign-up. Social media is the
largest category; creator rate cards, ad libraries and shop products are the others. Figures as of version 1.0.0
(October 2026); the live catalog is at [dataxapi.com/apis](https://dataxapi.com/apis/).

`dataxapi` is the Python client: every endpoint is a method, generated from the catalog, with its price in its
docstring.

## Install

```sh
pip install dataxapi
```

Python 3.9 or later; standard library only.

Version 1 is a new client for the new interface. Code written for `dataxapi` 0.x does not carry over: see the
[guide](https://dataxapi.com/docs/sdk/).

## Quick start

Make a key in the [console](https://dataxapi.com/console/keys/) and put it in the environment variable
`DATAXAPI_API_KEY`.

```python
from dataxapi import DataXAPI
dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.douyin.videos.comments.list(id="7694940173372575014")
```

`result["data"]["items"]` is the page of comments; `result["meta"]["billing"]["amount"]` is what the call was charged.

One call is one page, charged on its own. Every call goes out under an idempotency key the SDK makes, so its own
retries are never charged twice. `dx.call(id, params, options={"max_price": ...})` calls by ID and is refused before
it runs if it could cost more. `dx.pages(…)` and `dx.items(…)` walk pages within limits on pages, items and money.

## Connect an AI agent

Paste this into Claude Code, Codex, Cursor or any agent that can read a web page, with your own key in it:

```text
Read https://dataxapi.com/agents.md and set up DataXAPI in this agent. My API key is dx_…; use it for every DataXAPI call.
```

Or add the MCP server yourself: `https://api.dataxapi.com/mcp` (streamable HTTP), with the header
`Authorization: Bearer <your key>`; clients that sign in by OAuth (ChatGPT, Claude) need only the address. Five tools:
`find`, `describe`, `call`, `read_more`, `account`. `npx dataxapi setup` writes the MCP entry and the base skill for
Claude Code, Codex and Cursor. Setup guides: [dataxapi.com/mcp](https://dataxapi.com/mcp/).

## Platforms and example endpoints

| Platform | Example endpoints |
|---|---|
| Douyin API (抖音) | `douyin.videos.search`, `douyin.videos.comments.list`, `douyin.users.get`; 巨量算数 keyword index `douyin.index.keywords.history`; 星图 rate card `douyin.xingtu.creators.rates.get` |
| Xiaohongshu (RedNote) API (小红书) | `xiaohongshu.notes.search`, `xiaohongshu.notes.comments.list`, `xiaohongshu.users.get`; 蒲公英 creators `xiaohongshu.pgy.creators.get` |
| TikTok API | `tiktok.videos.search`, `tiktok.videos.transcript.get`, `tiktok.shop.products.reviews.list`, `tiktok.creative_center.ads.search` |
| WeChat (微信公众号, 视频号) | `wechat_mp.accounts.articles.list`, `wechat_mp.articles.metrics`, `wechat_channels.videos.comments.list` |
| Kuaishou, Bilibili, Weibo, Zhihu | `kuaishou.videos.search`, `bilibili.videos.get`, `weibo.trends.list`, `zhihu.questions.answers.list` |
| X, YouTube, Instagram, Reddit | `x.posts.search`, `youtube.videos.transcript.get`, `instagram.users.posts.list`, `reddit.posts.comments.list` |
| Facebook, Threads, LinkedIn, Telegram, Pinterest | `facebook.pages.posts.list`, `threads.posts.search`, `linkedin.companies.posts.list`, `telegram.channels.messages.list`, `pinterest.pins.search` |
| Ad libraries | `meta.ads.search`, `google.advertisers.ads.list`, `linkedin.ads.search`, `tiktok.ads.search` |

Every platform answers in the same shape: the same parameters, paging, errors and fields. A field a platform cannot
give is listed as missing, not silently dropped.

## Links

- Pricing: [dataxapi.com/pricing](https://dataxapi.com/pricing/) (every endpoint's price, as a file: [prices.json](https://dataxapi.com/prices.json))
- Docs: [dataxapi.com/docs](https://dataxapi.com/docs/); this SDK: [dataxapi.com/docs/sdk](https://dataxapi.com/docs/sdk/)
- All endpoints: [dataxapi.com/apis](https://dataxapi.com/apis/); for agents: [llms.txt](https://dataxapi.com/llms.txt), [openapi.json](https://dataxapi.com/openapi.json)
- MCP server: [dataxapi.com/mcp](https://dataxapi.com/mcp/); Skills: [dataxapi.com/skills](https://dataxapi.com/skills/)
- The TypeScript SDK is `@dataxapi/sdk` on npm; the command line is `dataxapi` on npm (`npx dataxapi --help`).
- 中文：[dataxapi.com/zh](https://dataxapi.com/zh/)

## Licence

MIT
