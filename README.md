# DataXAPI: market data API for AI agents

[DataXAPI](https://dataxapi.com) is the market data layer for AI: public data from Douyin, Xiaohongshu (RedNote),
TikTok, WeChat, X, YouTube and more, read live by your AI and your code with one key and one response shape. Paid per
call from $0.0003; failed calls are free. New accounts can try it free: up to 333 calls, no card. Social media is the
largest category; creator rate cards (星图, 蒲公英), keyword indexes (巨量算数), ad libraries and shop products are the
others. The live catalog is at [dataxapi.com/apis](https://dataxapi.com/apis/).

This repository holds the source of the two SDKs and the documents agents read. It is a mirror: it is overwritten from
our main repository at every release. Questions and bugs: open an issue.

| | Install | Source here |
|---|---|---|
| TypeScript SDK | `npm install @dataxapi/sdk` | `typescript/` |
| Python SDK | `pip install dataxapi` | `python/` |
| Command line | `npx dataxapi --help` | published on npm as one file |
| MCP server | `https://api.dataxapi.com/mcp` | hosted |
| Agent Skills | `npx skills add data-x-api/skills` | [data-x-api/skills](https://github.com/data-x-api/skills) |

## Quick start

TypeScript:

```ts
import { DataXAPI } from "@dataxapi/sdk";
const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.douyin.videos.comments.list({ id: "7694940173372575014" });
```

Python:

```python
from dataxapi import DataXAPI
dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.douyin.videos.comments.list(id="7694940173372575014")
```

HTTP: `GET https://api.dataxapi.com/v1/douyin/videos/comments/list?id=7694940173372575014` with
`Authorization: Bearer $DATAXAPI_API_KEY`. An endpoint's path is its ID with the dots as slashes, under `/v1`.

Make a key in the [console](https://dataxapi.com/console/keys/). Every result carries what the call was charged
(`meta.billing.amount`, in US dollars). One call is one page; a next page is a new call.

## Connect an AI agent

Paste this into your agent, with your own key in it:

```text
Read https://dataxapi.com/agents.md and set up DataXAPI in this agent. My API key is dx_…; use it for every DataXAPI call.
```

Or add the MCP server: `https://api.dataxapi.com/mcp` (streamable HTTP), header `Authorization: Bearer <your key>`;
ChatGPT and Claude connect by OAuth with the address alone. Five tools: `find` and `describe` (free, no key), `call`
(charged), `read_more` and `account` (free). Guides for each client: [dataxapi.com/mcp](https://dataxapi.com/mcp/).

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

Every endpoint, with its parameters, fields, price and a recorded example answer: `docs/apis/` here, or
[dataxapi.com/apis](https://dataxapi.com/apis/).

## What is in `docs/`

| File | What it is |
|---|---|
| `docs/agents.md` | What an agent reads to set itself up |
| `docs/llms.txt`, `docs/llms-full.txt` | The index for language models; every endpoint on a line |
| `docs/openapi.json` | The interface description |
| `docs/apis.md`, `docs/apis/` | Every platform and every endpoint, one Markdown page each |
| `docs/docs/objects/` | The shared objects: post, comment, account, creator, ad, product… |
| `docs/mcp.md`, `docs/mcp/`, `docs/mcp-tools.json` | The MCP server, per platform, and its tool list |
| `docs/prices.json` | Every endpoint's unit, price and what an empty result is charged |

## Links

[Pricing](https://dataxapi.com/pricing/) · [Docs](https://dataxapi.com/docs/) · [All endpoints](https://dataxapi.com/apis/) ·
[MCP](https://dataxapi.com/mcp/) · [Skills](https://dataxapi.com/skills/) · [Status](https://dataxapi.com/status/) ·
[Changelog](https://dataxapi.com/changelog/) · [中文](https://dataxapi.com/zh/)

## 中文

DataXAPI 是给 AI 的市场数据层：抖音、小红书、TikTok、微信公众号和视频号、快手、B站、微博、知乎、X、YouTube 等平台的公开市场数据，你的 AI 和代码用一把 Key、同一种返回结构实时取回，按次付费，一次 $0.0003 起；调用失败不收费。新账户免费试用，最多 333 次，不用绑卡。社媒是最大的品类，另有星图和蒲公英的达人报价、巨量算数的关键词指数、广告库和电商商品。接进 AI：把上面那段提示词（换成你自己的 Key）贴给你的 agent。中文文档：[dataxapi.com/zh/docs](https://dataxapi.com/zh/docs/)。

## Licence

MIT
