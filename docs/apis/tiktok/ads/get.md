# TikTok Ads Library ad detail API

Get one ad of TikTok's public Ads Library by its ID or link: advertiser, headline, videos and images, landing page, when it was first and last shown, the countries it was shown in and the campaign's objective. One object a call; $0.0020 per call. Errors, timeouts and objects that do not exist are not charged.

- Endpoint: `GET https://api.dataxapi.com/v1/tiktok/ads/get`
- ID: `tiktok.ads.get`
- Also known as: tiktok ad details, one ad of the tiktok ads library
- Price: $0.0020 / call
- Live status is not on this page, which is a snapshot. Read it with `GET https://api.dataxapi.com/v1/catalog/status`
- Returns: 1 object, one ad object
- Returns ad, a preview structure that may still change
- `id` is in the link: `library.tiktok.com/ads/detail/?ad_id=<id>`. Or pass the whole link as `url`.
- [Run it in the Playground](https://dataxapi.com/console/playground/?capability=tiktok.ads.get&params=%7B%22id%22%3A%221871655924410641%22%7D)
- In Chinese: [TikTok 广告库广告详情 API](https://dataxapi.com/zh/apis/tiktok/ads/get/)

## What you get

The first 3 rows of a response recorded 2026-10-12 22:14 UTC.

| Field | Value |
| --- | --- |
| format | video |
| first_shown_at | 2026-10-09 |
| last_shown_at | 2026-10-11 |

## Parameters

| Parameter | Type | required | Description |
| --- | --- | --- | --- |
| `id` | text | give exactly one of `id`, `url` | The ad's ID, a string of digits. Example: `1871655924410641`. |
| `url` | text | give exactly one of `id`, `url` | The ad's link in the library, written library.tiktok.com/ads/detail/?ad_id= and the ID. Example: `https://library.tiktok.com/ads/detail/?ad_id=1871655924410641`. Full link: `https://library.tiktok.com/ads/detail/?ad_id=1871655924410641`. |
| `view` | text |  | How much of each item to return. All three cost the same. Values: `compact`, `standard` (default), `full`. |
| `fields` | list of text |  | Return only these fields. Each by its path, such as `author.name`. |

## Returned fields

`data.item` is one ad object. Preview: the structure may change, announced beforehand.

Three views: `compact` (the most used fields, long text cut short), `standard` (the default: every standard field) and `full` (adds `ext`, the platform's own fields). A field is in the view named and in every larger one.

| Field | Type | Description | From view | This endpoint |
| --- | --- | --- | --- | --- |
| `id` | text | ID; pass it unchanged to the ad's get endpoint. | `compact` | Yes |
| `url` | link | The ad's page in the platform's ad library. | `compact` | Yes |
| `format` | text | Format of the creative; other is a format of the platform's own. Values: `video`, `image`, `carousel`, `text`, `other`. | `compact` | Yes |
| `title` | text | Headline. | `compact` | Yes |
| `text` | text | Body text. Long text: the compact view keeps the first 500 characters and says so in `warnings`. | `compact` | Not provided here |
| `landing_url` | link | Where a click on the ad leads. | `standard` | Yes |
| `advertiser` | object | Advertiser. | `compact` | Yes |
| `advertiser.id` | text | Advertiser ID. | `compact` | Yes |
| `advertiser.name` | text | Advertiser's name. | `compact` | Yes |
| `advertiser.url` | link | The advertiser's page on the platform. | `standard` | The platform has none |
| `advertiser.avatar_url` | link | The advertiser's picture or logo. | `standard` | The platform has none |
| `images` | list of link | Addresses of the ad's images. | `standard` | Yes |
| `videos` | list of link | Addresses of the ad's videos; they expire. | `full` | Yes |
| `first_shown_at` | time | When the ad was first shown. | `compact` | Yes |
| `last_shown_at` | time | When the ad was last shown; for an ad still running, when the platform last saw it. | `compact` | Yes |
| `ext.regions` | list of text | Codes of the countries or regions it was shown in. | `full` | Yes |
| `ext.objective` | text | Campaign objective, as the platform's own code. | `full` | Yes |
| `approximate` | list of object | Which numbers of this item are approximate or lower bounds; absent when all are exact. | `compact` | Yes |
| `approximate[].field` | text | Path of the field, such as metrics.views. | `compact` | Yes |
| `approximate[].kind` | text | Approximate, or a lower bound. Values: `approximate`, `lower_bound`. | `compact` | Yes |

A field with no value on an item is `null`. A field this endpoint cannot give is left out and listed in `meta.unavailable`.

Typical size of one item: `compact` 311 B, `standard` 756 B, `full` 1.5 KB (measured on the response recorded 2026-10-12 22:14 UTC).

## Paging

One object per call: there is nothing to page.

## When you are charged

| Case | Charged |
| --- | --- |
| A result with data | $0.0020, once per call |
| The object does not exist (404) | not charged |
| Invalid parameters, a failure of ours or of the data source, a timeout | not charged |
| The most one call can cost | $0.0020 (send `X-Max-Price` to refuse anything above your own limit) |

Prices as read 2026-10-18 19:59 UTC, under price book 2, in effect since 2026-10-17 11:00 UTC; the Playground reads the price in force before a run.

## If the object does not exist

The answer is 404 `not_found` and nothing is charged. `reason` says which: `not_found` (it does not exist) or `private_or_deleted`.

## Errors

Every error has the same structure: `code`, `message`, `charged`, `retry`, `retry_after_seconds`, `param`, `docs_url`.

| HTTP | Code | Meaning | Charged | Retry |
| --- | --- | --- | --- | --- |
| 400 | `invalid_params` | A parameter is invalid | No | After a fix |
| 400 | `request_not_served` | This combination of parameters cannot be served at present | No | After a fix |
| 400 | `max_price_exceeded` | The most this call could cost is above the limit you set | No | After a fix |
| 401 | `unauthorized` | No credential was sent, or it is invalid, disabled or expired | No | No |
| 402 | `insufficient_balance` | The balance is too low | No | After a fix |
| 402 | `key_budget_exceeded` | This key's spending limit does not cover the call | No | After a fix |
| 402 | `run_budget_exceeded` | This run's amount or call limit does not cover the call | No | No |
| 403 | `account_suspended` | The account is suspended | No | No |
| 403 | `forbidden` | This credential may not use that option | No | No |
| 403 | `key_scope_denied` | This key may not call this endpoint | No | No |
| 404 | `not_found` | The object does not exist, is private or was deleted | No | No |
| 404 | `run_not_found` | No run under this run ID | No | No |
| 409 | `call_in_progress` | The call under this idempotency key is still running; ask again with the same key shortly | No | With the same idempotency key |
| 409 | `idempotency_conflict` | This idempotency key was used for a different request | No | After a fix |
| 410 | `run_expired` | This run has expired and starts no more calls | No | No |
| 429 | `rate_limited` | Too many requests, or too many calls in progress | No | Yes |
| 429 | `cost_cap_exceeded` | This account's allowance for today is used up | No | Yes |
| 429 | `uncharged_cost_limit` | Too many of this account's calls today returned nothing and were not charged; endpoints of this kind can be called again tomorrow (UTC) | No | Yes |
| 500 | `settlement_unknown` | Whether this call settled is not known; ask again with the same idempotency key, or look it up by request ID | Unknown: look the call up | With the same idempotency key |
| 500 | `internal_error` | The service failed | No | Yes |
| 502 | `upstream_failed` | The data source failed | No | Yes |
| 502 | `upstream_changed` | The data source returned an unexpected structure | No | Yes |
| 502 | `upstream_unclear` | The data source's answer could not be interpreted; retry at most once | No | Once |
| 503 | `upstream_busy` | The data source is busy; retry shortly | No | Yes |
| 503 | `capability_paused` | This endpoint is paused | No | Yes |
| 503 | `overloaded` | The service is busy; retry shortly | No | Yes |
| 504 | `timeout` | The data did not arrive in time; retry with the same idempotency key | No | Yes |

[All error codes](https://dataxapi.com/docs/errors/)

## Request

The key is read from the environment; no key is ever written into a page.

### cURL

```bash
curl -G "https://api.dataxapi.com/v1/tiktok/ads/get" \
  --data-urlencode "id=1871655924410641" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.tiktok.ads.get(id="1871655924410641")
print(result["data"]["item"])
```

### TypeScript

```typescript
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.tiktok.ads.get({ id: "1871655924410641" });
console.log(result.data.item);
```

### CLI

```bash
dataxapi call tiktok.ads.get id=1871655924410641
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

Add this to your MCP client, then ask your agent to call `tiktok.ads.get`.

## Responses

### 200

From a response recorded 2026-10-12 22:14 UTC. Names, text and IDs are examples, and so are the links: none is the recorded one (the page shows no one's personal data); the figures are as recorded. Long lists are cut. The request ID, cursor and balance are made up.

Size as sent: 1.1 KB in the standard view (705 B compact, 1.9 KB full).

```jsonc
{
  "code": "ok",
  "request_id": "3d50ccf7-9949-4da8-93fe-e3f69e907254",
  "data": {
    "item": {
      "id": "1827957127393428",
      "url": "https://library.tiktok.com/ads/detail/?ad_id=1827957127393428",
      "format": "video",
      "title": "Start weekend hiking with the kit made for beginners",
      "landing_url": "https://www.northside-roasters.com/fall?utm_source=tiktok",
      "advertiser": {
        "id": "7512826933420916016",
        "name": "Pine & Oak Home"
      },
      "images": [
        "https://p16-sign-va.tiktokcdn.com/tos-maliva-p-0068/d28963cc7f8ae338adda~c5_720x720.jpeg"
      ],
      "first_shown_at": "2026-10-09T00:00:00.000Z",
      "last_shown_at": "2026-10-11T00:00:00.000Z"
    }
  },
  "warnings": [],
  "meta": {
    "capability": "tiktok.ads.get",
    "result_status": "complete",
    "fetched_at": "2026-10-12T22:14:29.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "text": "capability",
      "advertiser.url": "platform",
      "advertiser.avatar_url": "platform"
    },
    "billing": {
      "amount": "0.002",
      "currency": "USD",
      "balance_after": "9.998"
    }
  }
}
```

### 400

An example written to the specification, not a recorded response.

```json
{
  "code": "invalid_params",
  "request_id": "eb249859-8719-408c-b1a0-d9fffb03da74",
  "message": "A parameter is invalid",
  "message_zh": "参数不合法",
  "charged": false,
  "retry": "after_fix",
  "retry_after_seconds": null,
  "param": null,
  "problems": ["give exactly one of id, url"],
  "docs_url": "https://dataxapi.com/docs/errors#invalid_params"
}
```

### 402

An example written to the specification, not a recorded response.

```json
{
  "code": "insufficient_balance",
  "request_id": "65e419be-6419-40d8-8247-63a42f6f53a5",
  "message": "The balance is too low",
  "message_zh": "余额不足",
  "charged": false,
  "retry": "after_fix",
  "retry_after_seconds": null,
  "param": null,
  "required": "0.002",
  "available": "0",
  "docs_url": "https://dataxapi.com/docs/errors#insufficient_balance"
}
```

### 404

An example written to the specification, not a recorded response.

```json
{
  "code": "not_found",
  "request_id": "6d547caf-5870-42aa-a69c-7cb5636ffbc1",
  "message": "The object does not exist, is private or was deleted",
  "message_zh": "对象不存在、私密或已删除",
  "charged": false,
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
  "request_id": "2e17dfd2-f4c4-4b33-ad2f-137051f2cee2",
  "message": "The data source failed",
  "message_zh": "数据来源出错",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

[This example as a JSON file](https://dataxapi.com/apis/tiktok/ads/get.example.json)

## Use it in your AI

`dataxapi setup` gives the agents on your machine (Claude Code, Codex, Cursor) the DataXAPI MCP server and the base skill. The key is read from DATAXAPI_API_KEY; none is written into a file.

MCP server: `https://api.dataxapi.com/mcp`. The entry for your client is under MCP in the request examples of this page; then ask your agent to call `tiktok.ads.get`.

Or paste this to any AI:

> Read https://dataxapi.com/apis/tiktok/ads/get.md and help me use the DataXAPI endpoint tiktok.ads.get (TikTok Ads Library ad detail).

[Open in ChatGPT](https://chatgpt.com/?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Ftiktok%2Fads%2Fget.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20tiktok.ads.get%20%28TikTok%20Ads%20Library%20ad%20detail%29.) · [Open in Claude](https://claude.ai/new?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Ftiktok%2Fads%2Fget.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20tiktok.ads.get%20%28TikTok%20Ads%20Library%20ad%20detail%29.)

## Related

Part of DataXAPI's Ads data. The same key also works for: Social media, Creators, E-commerce.

The same thing on other platforms: [Google ad detail](https://dataxapi.com/apis/google/ads/get/), [LinkedIn ad detail](https://dataxapi.com/apis/linkedin/ads/get/), [Meta ad detail](https://dataxapi.com/apis/meta/ads/get/), [TikTok Creative Center Top Ad detail](https://dataxapi.com/apis/tiktok/creative_center/ads/get/)

More Ads data on other platforms: [Google advertiser's ads](https://dataxapi.com/apis/google/advertisers/ads/list/), [LinkedIn Ad Library search](https://dataxapi.com/apis/linkedin/ads/search/), [Meta Ad Library search](https://dataxapi.com/apis/meta/ads/search/), [Meta advertiser's ads](https://dataxapi.com/apis/meta/advertisers/ads/list/), [Google advertiser search](https://dataxapi.com/apis/google/advertisers/search/), [Meta advertiser search](https://dataxapi.com/apis/meta/advertisers/search/)

TikTok endpoints: [TikTok Ads Library search](https://dataxapi.com/apis/tiktok/ads/search/), [TikTok Ads Library ad detail](https://dataxapi.com/apis/tiktok/ads/get/), [TikTok comment replies](https://dataxapi.com/apis/tiktok/comments/replies/list/), [TikTok hashtag videos](https://dataxapi.com/apis/tiktok/hashtags/videos/list/), [TikTok user profile](https://dataxapi.com/apis/tiktok/users/get/), [TikTok user search](https://dataxapi.com/apis/tiktok/users/search/), [TikTok user videos](https://dataxapi.com/apis/tiktok/users/videos/list/), [TikTok video comments](https://dataxapi.com/apis/tiktok/videos/comments/list/), [TikTok video detail](https://dataxapi.com/apis/tiktok/videos/get/), [TikTok video search](https://dataxapi.com/apis/tiktok/videos/search/), [TikTok video transcript](https://dataxapi.com/apis/tiktok/videos/transcript/get/), [TikTok user followers](https://dataxapi.com/apis/tiktok/users/followers/list/)

TikTok Creative Center endpoints: [TikTok Creative Center Top Ad detail](https://dataxapi.com/apis/tiktok/creative_center/ads/get/), [TikTok Creative Center Top Ads search](https://dataxapi.com/apis/tiktok/creative_center/ads/search/)

TikTok Shop endpoints: [TikTok Shop product detail](https://dataxapi.com/apis/tiktok/shop/products/get/), [TikTok Shop product reviews](https://dataxapi.com/apis/tiktok/shop/products/reviews/list/), [TikTok Shop product search](https://dataxapi.com/apis/tiktok/shop/products/search/), [TikTok Shop seller products](https://dataxapi.com/apis/tiktok/shop/sellers/products/list/)

Related: [All TikTok endpoints](https://dataxapi.com/apis/tiktok/), [Ads data](https://dataxapi.com/categories/ads/), [The same thing on 4 platforms, side by side](https://dataxapi.com/roles/ads-get/), [The ad object's fields](https://dataxapi.com/docs/objects/ad/)

## Questions

### How much does the TikTok Ads Library ad detail API cost?

$0.0020 per call. The most one call can cost is $0.0020.

### When am I not charged?

Errors, timeouts and objects that do not exist are not charged.

### What happens if the object does not exist?

The answer is 404 not_found and nothing is charged. reason says which: not_found (it does not exist) or private_or_deleted.

---

Last checked 2026-10-18 19:59 UTC. Catalog revision c48ce454ae6c4c65. [HTML version](https://dataxapi.com/apis/tiktok/ads/get/)
