# Xiaohongshu (RedNote) PGY creator metrics API

Get how a Xiaohongshu creator's everyday or sponsored notes did over the last 30 or 90 days, by PGY creator ID: notes and video notes, median impressions, reads, interactions and follows, engagement and completion ratios, the share of notes past 100 and 1,000 likes, the standing among comparable creators, and the share of impressions and reads from the explore feed, search, the following feed and other entry points. The full view adds each note's impressions, reads and interactions and how far each is above the median, and long-term notes (published about half a year back): their recent and long-term reads and where those came from. One object a call; $0.0400 per call. Errors and timeouts are not charged.

- Endpoint: `GET https://api.dataxapi.com/v1/xiaohongshu/pgy/creators/metrics`
- ID: `xiaohongshu.pgy.creators.metrics`
- Also known as: rednote creator performance, xiaohongshu engagement metrics, Xiaohongshu PGY creator performance
- Price: $0.0400 / call
- Live status is not on this page, which is a snapshot. Read it with `GET https://api.dataxapi.com/v1/catalog/status`
- Returns: 1 object, one pgy creator metrics object
- Returns pgy creator metrics, a preview structure that may still change
- [Run it in the Playground](https://dataxapi.com/console/playground/?capability=xiaohongshu.pgy.creators.metrics&params=%7B%22id%22%3A%225c0017ef6b58b740c92463fb%22%7D)
- In Chinese: [小红书蒲公英博主数据表现 API](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/metrics/)

## What you get

The first 8 rows of a response recorded 2026-10-12 21:53 UTC.

| Field | Value |
| --- | --- |
| notes | 34 |
| median_impressions | 3,535 |
| median_reads | 533 |
| median_engagements | 12 |
| median_likes | 10 |
| median_favorites | 2 |
| median_comments | 0 |
| median_shares | 3 |

## Parameters

| Parameter | Type | required | Description |
| --- | --- | --- | --- |
| `id` | text | Yes | PGY creator ID, 24 hexadecimal characters; take it from the PGY creator search. Example: `5c0017ef6b58b740c92463fb`. |
| `window` | text |  | The period: the last 30 or the last 90 days. Values: `30d` (default), `90d`. Example: `30d`. |
| `tab` | text |  | Whose figures: everyday for the creator's everyday notes, sponsored for the sponsored ones; everyday by default, as the two tabs of the creator's PGY page. Values: `everyday` (default), `sponsored`. Example: `everyday`. |
| `view` | text |  | How much of each item to return. All three cost the same. Values: `compact`, `standard` (default), `full`. |
| `fields` | list of text |  | Return only these fields. Each by its path, such as `author.name`. |

## Returned fields

`data.item` is one pgy creator metrics object. Preview: the structure may change, announced beforehand.

Three views: `compact` (the most used fields, long text cut short), `standard` (the default: every standard field) and `full` (adds `ext`, the platform's own fields). A field is in the view named and in every larger one.

| Field | Type | Description | From view | This endpoint |
| --- | --- | --- | --- | --- |
| `creator_id` | text | PGY creator ID. | `compact` | Yes |
| `notes` | integer | Notes in the period. | `compact` | Yes |
| `median_impressions` | integer | Median impressions of a note. | `compact` | Yes |
| `median_reads` | integer | Median reads of a note. | `compact` | Yes |
| `median_engagements` | integer | Median interactions of a note. | `compact` | Yes |
| `median_likes` | integer | Median likes of a note. | `standard` | Yes |
| `median_favorites` | integer | Median saves of a note. | `standard` | Yes |
| `median_comments` | integer | Median comments of a note. | `standard` | Yes |
| `median_shares` | integer | Median shares of a note. | `standard` | Yes |
| `engagement_rate` | number | Engagement rate, 0 to 1. | `compact` | Yes |
| `video_completion_rate` | number | Completion rate of video notes, 0 to 1. | `standard` | Yes |
| `image_3s_read_rate` | number | Share of image-note reads that last 3 seconds, 0 to 1. | `standard` | Yes |
| `hundred_like_share` | number | Share of notes with 100 likes or more, 0 to 1. | `standard` | Yes |
| `thousand_like_share` | number | Share of notes with 1,000 likes or more, 0 to 1. | `standard` | Yes |
| `impressions_percentile` | number | Share of comparable creators whose median impressions it exceeds, 0 to 1. | `standard` | Yes |
| `reads_percentile` | number | Share of comparable creators whose median reads it exceeds, 0 to 1. | `standard` | Yes |
| `engagements_percentile` | number | Share of comparable creators whose median interactions it exceeds, 0 to 1. | `standard` | Yes |
| `video_notes` | integer | Video notes in the period (counted in notes too). | `standard` | Yes |
| `video_completion_percentile` | number | Share of comparable creators whose video completion rate it exceeds, 0 to 1. | `standard` | Yes |
| `median_follows` | integer | Median follows a note brought (new followers gained from it). | `standard` | Yes |
| `traffic_sources` | object | Where the period's notes got their traffic: the share of impressions and of reads from each entry point (PGY's traffic sources); each set adds up to 1. | `standard` | Yes |
| `traffic_sources.impressions` | object | Shares of the impressions. | `standard` | Yes |
| `traffic_sources.impressions.homefeed` | number | Share of the impressions from the explore feed, 0 to 1. | `standard` | Yes |
| `traffic_sources.impressions.search` | number | Share of the impressions from search, 0 to 1. | `standard` | Yes |
| `traffic_sources.impressions.follow` | number | Share of the impressions from the following feed, 0 to 1. | `standard` | Yes |
| `traffic_sources.impressions.detail` | number | Share of the impressions from note detail pages, 0 to 1. | `standard` | Yes |
| `traffic_sources.impressions.nearby` | number | Share of the impressions from the nearby feed, 0 to 1. | `standard` | Yes |
| `traffic_sources.impressions.other` | number | Share of the impressions from anywhere else, 0 to 1. | `standard` | Yes |
| `traffic_sources.reads` | object | Shares of the reads. | `standard` | Yes |
| `traffic_sources.reads.homefeed` | number | Share of the reads from the explore feed, 0 to 1. | `standard` | Yes |
| `traffic_sources.reads.search` | number | Share of the reads from search, 0 to 1. | `standard` | Yes |
| `traffic_sources.reads.follow` | number | Share of the reads from the following feed, 0 to 1. | `standard` | Yes |
| `traffic_sources.reads.detail` | number | Share of the reads from note detail pages, 0 to 1. | `standard` | Yes |
| `traffic_sources.reads.nearby` | number | Share of the reads from the nearby feed, 0 to 1. | `standard` | Yes |
| `traffic_sources.reads.other` | number | Share of the reads from anywhere else, 0 to 1. | `standard` | Yes |
| `long_term` | object | Long-term performance (PGY's long-term notes): the notes published in a two-month span about half a year back, whose reads the platform splits into a "recent" part after publication and a "long-term" part after that, each with reads, the standing among peers and where the reads came from. Of the everyday notes with tab=everyday, of the sponsored ones with tab=sponsored. The platform does not say where the two parts divide. | `full` | Yes |
| `long_term.published_from` | time | First publication day of these notes: a calendar day in China time (UTC+8), written as midnight UTC of its date. | `full` | Yes |
| `long_term.published_to` | time | Last publication day of these notes, written the same way. | `full` | Yes |
| `long_term.notes` | integer | Notes published in that span; with 0, everything below is null. | `full` | Yes |
| `long_term.recent_reads` | integer | Recent reads: a figure of one note, the platform's representative value (of the same order as this endpoint's median reads; the platform does not say whether it is a median or a mean). | `full` | Yes |
| `long_term.recent_reads_percentile` | number | Share of comparable creators whose recent reads it exceeds, 0 to 1. | `full` | Yes |
| `long_term.long_term_reads` | integer | Long-term reads: a figure of one note, as recent reads. | `full` | Yes |
| `long_term.long_term_reads_percentile` | number | Share of comparable creators whose long-term reads it exceeds, 0 to 1. | `full` | Yes |
| `long_term.recent_sources` | object | Where the recent reads came from, shares adding up to 1. | `full` | Yes |
| `long_term.recent_sources.homefeed` | number | Share of the recent reads from the explore feed, 0 to 1. | `full` | Yes |
| `long_term.recent_sources.search` | number | Share of the recent reads from search, 0 to 1. | `full` | Yes |
| `long_term.recent_sources.profile` | number | Share of the recent reads from the creator's profile page, 0 to 1. | `full` | Yes |
| `long_term.recent_sources.follow` | number | Share of the recent reads from the following feed, 0 to 1. | `full` | Yes |
| `long_term.recent_sources.other` | number | Share of the recent reads from anywhere else, 0 to 1. | `full` | Yes |
| `long_term.long_term_sources` | object | Where the long-term reads came from, shares adding up to 1. | `full` | Yes |
| `long_term.long_term_sources.homefeed` | number | Share of the long-term reads from the explore feed, 0 to 1. | `full` | Yes |
| `long_term.long_term_sources.search` | number | Share of the long-term reads from search, 0 to 1. | `full` | Yes |
| `long_term.long_term_sources.profile` | number | Share of the long-term reads from the creator's profile page, 0 to 1. | `full` | Yes |
| `long_term.long_term_sources.follow` | number | Share of the long-term reads from the following feed, 0 to 1. | `full` | Yes |
| `long_term.long_term_sources.other` | number | Share of the long-term reads from anywhere else, 0 to 1. | `full` | Yes |
| `note_list` | list of object | The period's notes one by one, oldest first; 15 at most (recorded: 15 given of 34 in the period); null when the period has no note. | `full` | Yes |
| `note_list[].id` | text | Note ID. | `full` | Yes |
| `note_list[].title` | text | The note's title. | `full` | Yes |
| `note_list[].type` | text | An image note or a video note. Values: `image`, `video`. | `full` | Yes |
| `note_list[].published_at` | time | The day it was published; the platform gives the day only, given as the start of that day in China time. | `full` | Yes |
| `note_list[].cover_url` | link | Address of the cover image. | `full` | Yes |
| `note_list[].impressions` | integer | Impressions. | `full` | Yes |
| `note_list[].reads` | integer | Reads. | `full` | Yes |
| `note_list[].engagements` | integer | Interactions. | `full` | Yes |
| `note_list[].likes` | integer | Likes. | `full` | Yes |
| `note_list[].favorites` | integer | Saves. | `full` | Yes |
| `note_list[].impressions_vs_median` | number | How far the note's impressions are above the creator's median impressions of the period: 1.5 is 150% more, -0.3 is 30% fewer, 0 is the median itself. | `full` | Yes |
| `note_list[].reads_vs_median` | number | How far the note's reads are above the creator's median reads of the period: 1.5 is 150% more, -0.3 is 30% fewer, 0 is the median itself. | `full` | Yes |
| `note_list[].engagements_vs_median` | number | How far the note's interactions are above the creator's median interactions of the period: 1.5 is 150% more, -0.3 is 30% fewer, 0 is the median itself. | `full` | Yes |
| `note_list[].likes_vs_median` | number | How far the note's likes are above the creator's median likes of the period: 1.5 is 150% more, -0.3 is 30% fewer, 0 is the median itself. | `full` | Yes |
| `note_list[].favorites_vs_median` | number | How far the note's saves are above the creator's median saves of the period: 1.5 is 150% more, -0.3 is 30% fewer, 0 is the median itself. | `full` | Yes |
| `approximate` | list of object | Which numbers of this item are approximate or lower bounds; absent when all are exact. | `compact` | Yes |
| `approximate[].field` | text | Path of the field, such as metrics.views. | `compact` | Yes |
| `approximate[].kind` | text | Approximate, or a lower bound. Values: `approximate`, `lower_bound`. | `compact` | Yes |

A field with no value on an item is `null`. A field this endpoint cannot give is left out and listed in `meta.unavailable`.

Typical size of one item: `compact` 147 B, `standard` 709 B, `full` 8.1 KB (measured on the response recorded 2026-10-12 21:53 UTC).

## Paging

One object per call: there is nothing to page.

## When you are charged

| Case | Charged |
| --- | --- |
| A result with data | $0.0400, once per call |
| Invalid parameters, a failure or a timeout | not charged |
| The most one call can cost | $0.0400 (send `X-Max-Price` to refuse anything above your own limit) |

Prices as read 2026-11-20 07:17 UTC, under price book 19, in effect since 2026-11-17 18:04 UTC; the Playground reads the price in force before a run.

## If the object does not exist

The answer is 404 `not_found`. `charged` and `amount` in the body say what this one cost. `reason` says which: `not_found` (it does not exist) or `private_or_deleted`.

## Errors

Every error has the same structure: `code`, `message`, `charged`, `retry`, `retry_after_seconds`, `param`, `docs_url`.

| HTTP | Code | Meaning | Charged | Retry |
| --- | --- | --- | --- | --- |
| 400 | `invalid_params` | A parameter is invalid | As the answer's charged field says | After a fix |
| 400 | `request_not_served` | This combination of parameters cannot be served at present | No | After a fix |
| 400 | `max_price_exceeded` | The most this call could cost is above the limit you set | No | After a fix |
| 401 | `unauthorized` | No credential was sent, or it is invalid, disabled or expired | No | No |
| 402 | `insufficient_balance` | The balance is too low | No | After a fix |
| 402 | `key_budget_exceeded` | This key's spending limit does not cover the call | No | After a fix |
| 402 | `run_budget_exceeded` | This run's amount or call limit does not cover the call | No | No |
| 403 | `account_suspended` | The account is suspended | No | No |
| 403 | `forbidden` | This credential may not use that option | No | No |
| 403 | `key_scope_denied` | This key may not call this endpoint | No | No |
| 404 | `not_found` | The object does not exist, is private or was deleted | As the answer's charged field says | No |
| 404 | `run_not_found` | No run under this run ID | No | No |
| 409 | `call_in_progress` | The call under this idempotency key is still running; ask again with the same key shortly | No | With the same idempotency key |
| 409 | `idempotency_conflict` | This idempotency key was used for a different request | No | After a fix |
| 410 | `run_expired` | This run has expired and starts no more calls | No | No |
| 429 | `rate_limited` | Too many requests, or too many calls in progress | No | Yes |
| 429 | `cost_cap_exceeded` | This account's allowance for today is used up | No | Yes |
| 429 | `uncharged_cost_limit` | Too many of this account's calls today returned nothing and were not charged; endpoints of this kind can be called again tomorrow (UTC) | No | Yes |
| 500 | `settlement_unknown` | Whether this call settled is not known; ask again with the same idempotency key, or look it up by request ID | Unknown: look the call up | With the same idempotency key |
| 500 | `internal_error` | The service failed | No | Yes |
| 502 | `upstream_failed` | No result came back this time and nothing was charged; retry shortly | No | Yes |
| 503 | `upstream_busy` | Busy just now; retry shortly | No | Yes |
| 503 | `capability_paused` | This endpoint is paused | No | Yes |
| 503 | `overloaded` | The service is busy; retry shortly | No | Yes |
| 504 | `timeout` | The data did not arrive in time; retry with the same idempotency key | No | Yes |

[All error codes](https://dataxapi.com/docs/errors/)

## Request

The key is read from the environment; no key is ever written into a page.

### cURL

```bash
curl -G "https://api.dataxapi.com/v1/xiaohongshu/pgy/creators/metrics" \
  --data-urlencode "id=5c0017ef6b58b740c92463fb" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
# pip install dataxapi
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.xiaohongshu.pgy.creators.metrics(id="5c0017ef6b58b740c92463fb")
print(result["data"]["item"])
```

### TypeScript

```typescript
// npm i @dataxapi/sdk
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.xiaohongshu.pgy.creators.metrics({ id: "5c0017ef6b58b740c92463fb" });
console.log(result.data.item);
```

### CLI

```bash
dataxapi call xiaohongshu.pgy.creators.metrics id=5c0017ef6b58b740c92463fb
```

### MCP

```json
{
  "mcpServers": {
    "dataxapi": {
      "type": "http",
      "url": "https://api.dataxapi.com/mcp",
      "headers": {
        "Authorization": "Bearer ${DATAXAPI_API_KEY}"
      }
    }
  }
}
```

Add this to your MCP client, then ask your agent to call `xiaohongshu.pgy.creators.metrics`.

## Responses

### 200

From a response recorded 2026-10-12 21:53 UTC. Names, text and IDs are examples, and so are the links: none is the recorded one (the page shows no one's personal data); the figures are as recorded. Long lists are cut. The request ID, cursor and balance are made up.

Size as sent: 1.0 KB in the standard view (477 B compact, 8.5 KB full).

```jsonc
{
  "code": "ok",
  "request_id": "5abe7682-8e5c-465c-b1ca-aaa0992dff54",
  "data": {
    "item": {
      "creator_id": "622bd7c00000000007bc9f1a",
      "notes": 34,
      "median_impressions": 3535,
      "median_reads": 533,
      "median_engagements": 12,
      "median_likes": 10,
      "median_favorites": 2,
      "median_comments": 0,
      "median_shares": 3,
      "engagement_rate": 0.032,
      "video_completion_rate": 0.321,
      "image_3s_read_rate": 0.798,
      "hundred_like_share": 0.088,
      "thousand_like_share": 0,
      "impressions_percentile": 0.523,
      "reads_percentile": 0.476,
      "engagements_percentile": 0.333,
      "video_notes": 2,
      "video_completion_percentile": 0,
      "median_follows": 0,
      "traffic_sources": {
        "impressions": {
          "homefeed": 0.619,
          "search": 0.293,
          "follow": 0.036,
          "detail": 0.028,
          "nearby": 0.001,
          "other": 0.023
        },
        "reads": {
          "homefeed": 0.615,
          "search": 0.33,
          "follow": 0.013,
          "detail": 0.008,
          "nearby": 0,
          "other": 0.034
        }
      }
    }
  },
  "warnings": [],
  "meta": {
    "capability": "xiaohongshu.pgy.creators.metrics",
    "result_status": "complete",
    "fetched_at": "2026-10-12T21:53:24.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {},
    "billing": {
      "amount": "0.04",
      "currency": "USD",
      "balance_after": "9.96"
    }
  }
}
```

### 400

An example written to the specification, not a recorded response.

```json
{
  "code": "invalid_params",
  "request_id": "71bf1074-347c-40b0-a214-c17375a47b2c",
  "message": "A parameter is invalid",
  "message_zh": "参数不合法",
  "charged": false,
  "retry": "after_fix",
  "retry_after_seconds": null,
  "param": null,
  "problems": ["id is required"],
  "docs_url": "https://dataxapi.com/docs/errors#invalid_params"
}
```

### 402

An example written to the specification, not a recorded response.

```json
{
  "code": "insufficient_balance",
  "request_id": "2d837437-2821-451b-b625-cf52227f5cb6",
  "message": "The balance is too low",
  "message_zh": "余额不足",
  "charged": false,
  "retry": "after_fix",
  "retry_after_seconds": null,
  "param": null,
  "required": "0.04",
  "available": "0",
  "top_up_url": "https://dataxapi.com/console/billing/?amount=10",
  "next_step": "Top up at top_up_url, then send the same request again, unchanged. Nothing was charged for this one.",
  "next_step_zh": "到 top_up_url 充值，到账后把同一个请求原样再发一次。这次没有扣钱。",
  "docs_url": "https://dataxapi.com/docs/errors#insufficient_balance"
}
```

### 404

An example written to the specification, not a recorded response.

```json
{
  "code": "not_found",
  "request_id": "2d0716a7-f354-45a5-b7f4-cbc02b0c7967",
  "message": "The object does not exist, is private or was deleted",
  "message_zh": "对象不存在、私密或已删除",
  "charged": true,
  "amount": "0.04",
  "retry": "no",
  "retry_after_seconds": null,
  "param": null,
  "reason": "not_found",
  "docs_url": "https://dataxapi.com/docs/errors#not_found"
}
```

### 502

An example written to the specification, not a recorded response.

```json
{
  "code": "upstream_failed",
  "request_id": "f601305b-20ff-4ee5-99e2-b6da6cb5da86",
  "message": "No result came back this time and nothing was charged; retry shortly",
  "message_zh": "这次没有取到结果，没有扣费，可以稍后重试",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

This recorded response is 3,378 tokens as the platform's own JSON, 238 as DataXAPI's JSON, and 101 as an AI reads it through DataXAPI's MCP server: 97% fewer (counted 2026-11-06).

[This example as a JSON file](https://dataxapi.com/apis/xiaohongshu/pgy/creators/metrics.example.json)

## Use it in your AI

`dataxapi setup` gives the agents on your machine (Claude Code, Codex, Cursor) the DataXAPI MCP server and the base skill. The key is read from DATAXAPI_API_KEY; none is written into a file.

MCP server: `https://api.dataxapi.com/mcp`. The entry for your client is under MCP in the request examples of this page; then ask your agent to call `xiaohongshu.pgy.creators.metrics`.

Or paste this to any AI:

> Read https://dataxapi.com/apis/xiaohongshu/pgy/creators/metrics.md and help me use the DataXAPI endpoint xiaohongshu.pgy.creators.metrics (Xiaohongshu (RedNote) PGY creator metrics).

[Open in ChatGPT](https://chatgpt.com/?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fxiaohongshu%2Fpgy%2Fcreators%2Fmetrics.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20xiaohongshu.pgy.creators.metrics%20%28Xiaohongshu%20%28RedNote%29%20PGY%20creator%20metrics%29.) · [Open in Claude](https://claude.ai/new?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fxiaohongshu%2Fpgy%2Fcreators%2Fmetrics.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20xiaohongshu.pgy.creators.metrics%20%28Xiaohongshu%20%28RedNote%29%20PGY%20creator%20metrics%29.)

## Related

Part of DataXAPI's Creators data. The same key also works for: Social media, Ads, E-commerce.

The same thing on other platforms: [Douyin Xingtu creator metrics](https://dataxapi.com/apis/douyin/xingtu/creators/metrics/)

Xiaohongshu PGY endpoints: [Xiaohongshu PGY keyword search index](https://dataxapi.com/apis/xiaohongshu/pgy/keywords/history/), [Xiaohongshu PGY related keywords](https://dataxapi.com/apis/xiaohongshu/pgy/keywords/related/), [Xiaohongshu PGY creator search](https://dataxapi.com/apis/xiaohongshu/pgy/creators/search/), [Xiaohongshu PGY creator detail](https://dataxapi.com/apis/xiaohongshu/pgy/creators/get/), [Xiaohongshu PGY creator audience profile](https://dataxapi.com/apis/xiaohongshu/pgy/creators/audience/get/), [Xiaohongshu PGY creator metrics](https://dataxapi.com/apis/xiaohongshu/pgy/creators/metrics/), [Xiaohongshu PGY creator notes](https://dataxapi.com/apis/xiaohongshu/pgy/creators/notes/list/), [Xiaohongshu PGY creator follower history](https://dataxapi.com/apis/xiaohongshu/pgy/creators/followers/history/), [Xiaohongshu PGY similar creators](https://dataxapi.com/apis/xiaohongshu/pgy/creators/related/), [Xiaohongshu PGY trending notes](https://dataxapi.com/apis/xiaohongshu/pgy/notes/trending/), [Xiaohongshu PGY creator costs and data summary](https://dataxapi.com/apis/xiaohongshu/pgy/creators/costs/metrics/), [Xiaohongshu PGY creator follower summary](https://dataxapi.com/apis/xiaohongshu/pgy/creators/followers/metrics/), [Xiaohongshu PGY creator core figures history](https://dataxapi.com/apis/xiaohongshu/pgy/creators/costs/history/), [Xiaohongshu PGY note metrics](https://dataxapi.com/apis/xiaohongshu/pgy/notes/get/)

Xiaohongshu (RedNote) endpoints: [Xiaohongshu image search](https://dataxapi.com/apis/xiaohongshu/images/search/), [Xiaohongshu note detail](https://dataxapi.com/apis/xiaohongshu/notes/get/), [Xiaohongshu comment replies](https://dataxapi.com/apis/xiaohongshu/comments/replies/list/), [Xiaohongshu note comments](https://dataxapi.com/apis/xiaohongshu/notes/comments/list/), [Xiaohongshu note search](https://dataxapi.com/apis/xiaohongshu/notes/search/), [Xiaohongshu topic notes](https://dataxapi.com/apis/xiaohongshu/topics/notes/list/), [Xiaohongshu topic detail](https://dataxapi.com/apis/xiaohongshu/topics/get/), [Xiaohongshu trends](https://dataxapi.com/apis/xiaohongshu/trends/list/), [Xiaohongshu user profile](https://dataxapi.com/apis/xiaohongshu/users/get/), [Xiaohongshu user notes](https://dataxapi.com/apis/xiaohongshu/users/notes/list/), [Xiaohongshu user search](https://dataxapi.com/apis/xiaohongshu/users/search/), [Xiaohongshu search suggestions](https://dataxapi.com/apis/xiaohongshu/keywords/related/), [Xiaohongshu video note with its video and subtitles](https://dataxapi.com/apis/xiaohongshu/videos/get/)

Xiaohongshu Shop endpoints: [Xiaohongshu product detail](https://dataxapi.com/apis/xiaohongshu/shop/products/get/), [Xiaohongshu product reviews](https://dataxapi.com/apis/xiaohongshu/shop/products/reviews/list/), [Xiaohongshu product search](https://dataxapi.com/apis/xiaohongshu/shop/products/search/)

How-to guides and answers: [What is CPE on Xiaohongshu PGY and on Douyin Xingtu?](https://dataxapi.com/answers/xiaohongshu-pgy-cpe-vs-xingtu-cpe/), [What is Xiaohongshu PGY?](https://dataxapi.com/answers/what-is-xiaohongshu-pgy/), [How do I collect the numbers of many Xiaohongshu notes after a campaign? (2026)](https://dataxapi.com/answers/collect-xiaohongshu-note-metrics-after-campaign/), [How do I export Xiaohongshu PGY creators in bulk? (2026)](https://dataxapi.com/answers/export-xiaohongshu-pgy-creators/), [Creator (KOL) data from Douyin and Xiaohongshu: profiles, posts and rates (2026)](https://dataxapi.com/answers/douyin-xiaohongshu-creator-data/), [Xiaohongshu creator CPM day by day: PGY's core figures trend (2026)](https://dataxapi.com/answers/xiaohongshu-creator-cpm-trend/), [Choosing Xiaohongshu creators in bulk: building a creator list by API (2026)](https://dataxapi.com/answers/xiaohongshu-kol-selection-api/), [Every figure on a Xiaohongshu PGY creator page: can an API get it? Field by field (2026)](https://dataxapi.com/answers/xiaohongshu-pgy-creator-page-fields/), [Organic and promoted traffic on PGY notes: how to read organic reads alone (2026)](https://dataxapi.com/answers/xiaohongshu-pgy-organic-vs-promoted-reads/), [How to list only a Xiaohongshu creator's sponsored notes (2026)](https://dataxapi.com/answers/xiaohongshu-creator-sponsored-notes/), [Where a Xiaohongshu creator's notes get their traffic: explore, search, following (2026)](https://dataxapi.com/answers/xiaohongshu-note-traffic-sources/)

Related: [All Xiaohongshu PGY endpoints](https://dataxapi.com/apis/xiaohongshu/pgy/), [All Xiaohongshu (RedNote) endpoints](https://dataxapi.com/apis/xiaohongshu/), [Creators data](https://dataxapi.com/categories/creator/), [The same thing on 2 platforms, side by side](https://dataxapi.com/roles/creators-metrics/), [The pgy creator metrics object's fields](https://dataxapi.com/docs/objects/pgy_creator_metrics/)

## Questions

### How much does the Xiaohongshu (RedNote) PGY creator metrics API cost?

$0.0400 per call. The most one call can cost is $0.0400.

### When am I not charged?

Errors and timeouts are not charged.

### What happens if the object does not exist?

The answer is 404 not_found. charged and amount in the body say what this one cost. reason says which: not_found (it does not exist) or private_or_deleted.

---

Last checked 2026-11-20 07:17 UTC. Catalog revision 720fc3ea8dadb865. [HTML version](https://dataxapi.com/apis/xiaohongshu/pgy/creators/metrics/)
