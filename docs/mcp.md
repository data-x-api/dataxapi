# DataXAPI MCP server: market data in your AI, connected with one prompt

Copy one prompt with your key in it, paste it into your agent, and ask. It reads one page and sets itself up: 5 tools, 207 endpoints on 21 platforms, from $0.0003 a call, and a failed call is never charged.

## Copy this prompt

> Read https://dataxapi.com/agents.md and set up DataXAPI in this agent. My API key is dx_…; use it for every DataXAPI call.

Paste it into your agent. It reads the page the prompt points to and connects itself. Setup steps for Claude Code, Cursor, Codex, n8n, Cherry Studio.

Now ask something:

- What is trending on Douyin, Weibo and B站 right now?
- What did @trailbrew post on TikTok this week, and which video took off?
- What are people praising and complaining about under this video?
- Which coffee creators on Douyin and TikTok are worth a brief?
- What ads are running for “running shoes” on Meta and TikTok?

## The 5 tools your AI gets

Your AI can search and read the whole catalog before you have an account. Only `call` is charged, and only when data comes back.

| Tool | What it does | Key | Cost |
| --- | --- | --- | --- |
| `find` | Finds the endpoint for a question. Up to 5 matches, each with its price and a ready-made call. | no key | Free |
| `describe` | Reads up to 5 endpoints in full: parameters, fields, price. Also what an endpoint cannot return, and the most one call can cost. | no key | Free |
| `call` | Runs one endpoint and returns one page of data. The answer carries the charge, your balance and how to get the next page. | needs a key | from $0.0003, at the endpoint's own price; nothing if the call fails |
| `read_more` | Re-reads a result for 24 hours. The rest of a long answer, or the same result in another view. | needs a key | Free |
| `account` | Balance, usage and receipts. Also this key's budget, and which endpoints are up (that part needs no key). | needs a key | Free |

## What a session looks like

You ask in plain words. The AI does the rest by itself, and tells you what it spent.

- **It searches before it calls.** No endpoint names to remember.
- **It sees the price first.** And can set the most it will pay for the call.
- **It gets an answer that fits.** Compact by default and cut at about 20 KB; `read_more` reads the rest at no charge.
- **It shows the bill.** Three tool calls, one charged.

> Which TikTok videos about camping coffee got the most likes this week?

|  |  |  |
| --- | --- | --- |
| `find({ query: "search tiktok videos by keyword" })` | Found tiktok.videos.search · $0.0020 a call | Free |
| `describe({ ids: ["tiktok.videos.search"] })` | Takes query, sort, published_within · returns 30 posts a page | Free |
| `call({ capability: "tiktok.videos.search", query: "camping coffee", sort: "popular", published_within: "week", max_price: "0.01" })` | 30 posts · compact view | $0.0020 |

3 tool calls · 1 charged · $0.0020

## You set the limits

An AI that can spend needs a ceiling. There are three, and the server enforces them.

- **A spend limit on every key.** Give your AI its own key with a daily, monthly or total budget. When it is used up, calls stop. Nothing else on your account is touched.
- **A ceiling on every call.** With `max_price`, a call that could cost more is refused before anything is charged. A call that is sent twice with the same `idempotency_key` is charged once.
- **Read-only, public data.** DataXAPI reads what anyone can see on the platform. It cannot post, message, sign in to an account or change anything.
- 4 of 5 tools marked readOnly.

## Prefer to do it by hand?

Setup steps for each client. They all end at the same address: `https://api.dataxapi.com/mcp`

- [Setup steps for Claude Code](https://dataxapi.com/integrations/claude-code/) (1 command)
- [Setup steps for Cursor](https://dataxapi.com/integrations/cursor/) (1 command)
- [Setup steps for Codex](https://dataxapi.com/integrations/codex/) (1 command)
- [Setup steps for n8n](https://dataxapi.com/integrations/n8n/) (4 fields)
- [Setup steps for Cherry Studio](https://dataxapi.com/integrations/cherry-studio/) (4 fields)

Any MCP client: One address and one header. A client that can read the environment takes the key from there; nothing has to be written into a file. Endpoint: `https://api.dataxapi.com/mcp`; Header: `Authorization: Bearer <key>`.

Or one command, which writes the entry for Claude Code, Cursor, Codex and installs the base skill: `dataxapi setup`

[What an agent reads to set itself up](https://dataxapi.com/agents/) · [Skills](https://dataxapi.com/skills/)

## Questions

### What does it cost?

Connecting is free. Searching the catalog, reading an endpoint, re-reading a result and checking your account are free. A call costs the endpoint's listed price, from $0.0003, and nothing if it fails.

### Do I need to install anything?

No. It is a remote server at one address. `dataxapi setup` only writes the entry into your client's configuration (Claude Code, Cursor, Codex) and installs the base skill; the prompt lets your agent do that for you.

### Can my AI spend money without asking me?

`call` is not marked read-only, so a client that asks before running such tools will ask. Either way, the key's budget is the hard stop.

### Will new platforms need a new server?

No. The 5 tools stay the same; a new endpoint shows up in `find` the day it ships.

### What if an answer is too long for the context?

An answer is cut at about 20 KB, on an item boundary, and says how to read on. `read_more` reads the rest for 24 hours at no charge.

### Does it work in ChatGPT, Claude?

Yes, on the web and in the desktop apps: add a custom connector with the address https://api.dataxapi.com/mcp. No key is typed in: you are asked to sign in to DataXAPI and approve, and there you choose the key its calls are charged through and that key's spending limit. ChatGPT: Settings → Apps & Connectors → turn on developer mode under Advanced → Create a connector: the MCP address, with OAuth as its authentication. Claude: On the web or in the desktop app: Settings → Connectors → Add custom connector, with the MCP address.

---

Generated from catalog revision c48ce454ae6c4c65, price book 2. [Page](https://dataxapi.com/mcp/)
