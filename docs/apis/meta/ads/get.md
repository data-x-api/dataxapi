# Meta ad detail API

Get one ad of the Meta Ad Library by its library ID or link: advertiser, text, headline, images and videos, landing page, first and last day shown, the platforms it is delivered on, and whether it is still running. One object a call; $0.0020 per call. Errors, timeouts and objects that do not exist are not charged.

- Endpoint: `GET https://api.dataxapi.com/v1/meta/ads/get`
- ID: `meta.ads.get`
- Also known as: facebook ad details, one ad of the facebook ad library, instagram ad details
- Price: $0.0020 / call
- Live status is not on this page, which is a snapshot. Read it with `GET https://api.dataxapi.com/v1/catalog/status`
- Returns: 1 object, one ad object
- Returns ad, a preview structure that may still change
- `id` is in the link: `facebook.com/ads/library/?id=<id>`. Or pass the whole link as `url`.
- [Run it in the Playground](https://dataxapi.com/console/playground/?capability=meta.ads.get&params=%7B%22id%22%3A%221466307095509411%22%7D)
- In Chinese: [Meta 广告详情 API](https://dataxapi.com/zh/apis/meta/ads/get/)

## What you get

The first 3 rows of a response recorded 2026-10-12 21:45 UTC.

| Field | Value |
| --- | --- |
| format | image |
| first_shown_at | 2025-04-07 07:00 UTC |
| last_shown_at | 2026-10-12 07:00 UTC |

## Parameters

| Parameter | Type | required | Description |
| --- | --- | --- | --- |
| `id` | text | give exactly one of `id`, `url` | The ad's Library ID, a string of digits. Example: `1466307095509411`. |
| `url` | text | give exactly one of `id`, `url` | The ad's link in the library, written facebook.com/ads/library/?id= and the ID. Example: `https://www.facebook.com/ads/library/?id=1466307095509411`. Full link: `https://www.facebook.com/ads/library/?id=1466307095509411`. |
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
| `text` | text | Body text. Long text: the compact view keeps the first 500 characters and says so in `warnings`. | `compact` | Yes |
| `landing_url` | link | Where a click on the ad leads. | `standard` | Yes |
| `advertiser` | object | Advertiser. | `compact` | Yes |
| `advertiser.id` | text | Advertiser ID. | `compact` | Yes |
| `advertiser.name` | text | Advertiser's name. | `compact` | Yes |
| `advertiser.url` | link | The advertiser's page on the platform. | `standard` | Yes |
| `advertiser.avatar_url` | link | The advertiser's picture or logo. | `standard` | Yes |
| `images` | list of link | Addresses of the ad's images. | `standard` | Yes |
| `videos` | list of link | Addresses of the ad's videos; they expire. | `full` | Yes |
| `first_shown_at` | time | When the ad was first shown. | `compact` | Yes |
| `last_shown_at` | time | When the ad was last shown; for an ad still running, when the platform last saw it. | `compact` | Yes |
| `ext.format_label` | text | What the platform itself calls this ad format, as it words it (VIDEO, DPA, DCO, say). | `full` | Yes |
| `ext.active` | yes/no | Whether the ad is running now. | `full` | Yes |
| `ext.platforms` | object | Where it is delivered: a yes or no for each platform. | `full` | Yes |
| `ext.platforms.facebook` | yes/no | Whether it is delivered on Facebook. | `full` | Yes |
| `ext.platforms.instagram` | yes/no | Whether it is delivered on Instagram. | `full` | Yes |
| `ext.platforms.messenger` | yes/no | Whether it is delivered on Messenger. | `full` | Yes |
| `ext.platforms.audience_network` | yes/no | Whether it is delivered on the Audience Network (third-party apps and sites). | `full` | Yes |
| `ext.platforms.threads` | yes/no | Whether it is delivered on Threads. | `full` | Yes |
| `ext.platforms.whatsapp` | yes/no | Whether it is delivered on WhatsApp. | `full` | Yes |
| `ext.cta` | text | Text of the call-to-action button. | `full` | Yes |
| `ext.cards` | list of object | Each card of a carousel or of an ad with several versions; empty for an ad of one image or one video. | `full` | Yes |
| `ext.cards[].title` | text | The card's headline. | `full` | Yes |
| `ext.cards[].text` | text | The card's body text. | `full` | Yes |
| `ext.cards[].landing_url` | link | Where a click on the card leads. | `full` | Yes |
| `ext.cards[].image_url` | link | The card's image. | `full` | Yes |
| `ext.cards[].video_url` | link | The card's video; it expires. | `full` | Yes |
| `approximate` | list of object | Which numbers of this item are approximate or lower bounds; absent when all are exact. | `compact` | Yes |
| `approximate[].field` | text | Path of the field, such as metrics.views. | `compact` | Yes |
| `approximate[].kind` | text | Approximate, or a lower bound. Values: `approximate`, `lower_bound`. | `compact` | Yes |

A field with no value on an item is `null`. A field this endpoint cannot give is left out and listed in `meta.unavailable`.

Typical size of one item: `compact` 364 B, `standard` 3.2 KB, `full` 7.2 KB (measured on the response recorded 2026-10-12 21:45 UTC).

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
curl -G "https://api.dataxapi.com/v1/meta/ads/get" \
  --data-urlencode "id=1466307095509411" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.meta.ads.get(id="1466307095509411")
print(result["data"]["item"])
```

### TypeScript

```typescript
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.meta.ads.get({ id: "1466307095509411" });
console.log(result.data.item);
```

### CLI

```bash
dataxapi call meta.ads.get id=1466307095509411
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

Add this to your MCP client, then ask your agent to call `meta.ads.get`.

## Responses

### 200

From a response recorded 2026-10-12 21:45 UTC. Names, text and IDs are examples, and so are the links: none is the recorded one (the page shows no one's personal data); the figures are as recorded. Long lists are cut. The request ID, cursor and balance are made up.

Size as sent: 3.5 KB in the standard view (674 B compact, 7.5 KB full).

```jsonc
{
  "code": "ok",
  "request_id": "f8a22e1e-fee2-4b69-9e5c-446621ff8b56",
  "data": {
    "item": {
      "id": "1058286942402074",
      "url": "https://www.facebook.com/ads/library/?id=1058286942402074",
      "format": "image",
      "title": "Start weekend hiking with the kit made for beginners",
      "text": "Start weekend hiking with the kit made for beginners",
      "landing_url": "https://www.pineandoak-home.com/fall?utm_source=meta",
      "advertiser": {
        "id": "124244511652870",
        "name": "Pine & Oak Home",
        "url": "https://www.facebook.com/profile.php?id=124244511652870",
        "avatar_url": "https://scontent.xx.fbcdn.net/v/t39.30808-1/419991773_116184846204048_n.jpg"
      },
      "images": [
        "https://scontent.xx.fbcdn.net/v/t39.35426-6/433783216_111510700877970_n.jpg",
        "https://scontent.xx.fbcdn.net/v/t39.35426-6/464959343_128562597021179_n.jpg",
        // … 4 more
      ],
      "first_shown_at": "2025-04-07T07:00:00.000Z",
      "last_shown_at": "2026-10-12T07:00:00.000Z"
    }
  },
  "warnings": [],
  "meta": {
    "capability": "meta.ads.get",
    "result_status": "complete",
    "fetched_at": "2026-10-12T21:45:40.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {},
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
  "request_id": "284d074a-e78b-48b1-a2ca-c9121441c15b",
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
  "request_id": "1c9cc475-d6f1-407b-bc29-7716d5460e71",
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
  "request_id": "2e918129-2e36-4b57-bb06-8e6e2e191b9f",
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
  "request_id": "f08bd9cf-da13-44b2-b4f0-40b51d8638e2",
  "message": "The data source failed",
  "message_zh": "数据来源出错",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

[This example as a JSON file](https://dataxapi.com/apis/meta/ads/get.example.json)

## Use it in your AI

`dataxapi setup` gives the agents on your machine (Claude Code, Codex, Cursor) the DataXAPI MCP server and the base skill. The key is read from DATAXAPI_API_KEY; none is written into a file.

MCP server: `https://api.dataxapi.com/mcp`. The entry for your client is under MCP in the request examples of this page; then ask your agent to call `meta.ads.get`.

Or paste this to any AI:

> Read https://dataxapi.com/apis/meta/ads/get.md and help me use the DataXAPI endpoint meta.ads.get (Meta ad detail).

[Open in ChatGPT](https://chatgpt.com/?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fmeta%2Fads%2Fget.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20meta.ads.get%20%28Meta%20ad%20detail%29.) · [Open in Claude](https://claude.ai/new?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fmeta%2Fads%2Fget.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20meta.ads.get%20%28Meta%20ad%20detail%29.)

## Related

Part of DataXAPI's Ads data. The same key also works for: Social media, Creators, E-commerce.

The same thing on other platforms: [Google ad detail](https://dataxapi.com/apis/google/ads/get/), [LinkedIn ad detail](https://dataxapi.com/apis/linkedin/ads/get/), [TikTok Ads Library ad detail](https://dataxapi.com/apis/tiktok/ads/get/), [TikTok Creative Center Top Ad detail](https://dataxapi.com/apis/tiktok/creative_center/ads/get/)

More Ads data on other platforms: [Google advertiser's ads](https://dataxapi.com/apis/google/advertisers/ads/list/), [LinkedIn Ad Library search](https://dataxapi.com/apis/linkedin/ads/search/), [TikTok Ads Library search](https://dataxapi.com/apis/tiktok/ads/search/), [TikTok Creative Center Top Ads search](https://dataxapi.com/apis/tiktok/creative_center/ads/search/), [Google advertiser search](https://dataxapi.com/apis/google/advertisers/search/)

Meta Ad Library endpoints: [Meta ad detail](https://dataxapi.com/apis/meta/ads/get/), [Meta Ad Library search](https://dataxapi.com/apis/meta/ads/search/), [Meta ad video transcript](https://dataxapi.com/apis/meta/ads/transcript/get/), [Meta advertiser's ads](https://dataxapi.com/apis/meta/advertisers/ads/list/), [Meta advertiser search](https://dataxapi.com/apis/meta/advertisers/search/)

Related: [All Meta Ad Library endpoints](https://dataxapi.com/apis/meta/), [Ads data](https://dataxapi.com/categories/ads/), [The same thing on 4 platforms, side by side](https://dataxapi.com/roles/ads-get/), [The ad object's fields](https://dataxapi.com/docs/objects/ad/)

## Questions

### How much does the Meta ad detail API cost?

$0.0020 per call. The most one call can cost is $0.0020.

### When am I not charged?

Errors, timeouts and objects that do not exist are not charged.

### What happens if the object does not exist?

The answer is 404 not_found and nothing is charged. reason says which: not_found (it does not exist) or private_or_deleted.

---

Last checked 2026-10-18 19:59 UTC. Catalog revision c48ce454ae6c4c65. [HTML version](https://dataxapi.com/apis/meta/ads/get/)
