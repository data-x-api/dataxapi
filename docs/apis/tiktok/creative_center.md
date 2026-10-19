# TikTok Creative Center API (创意中心)

2 endpoints read TikTok Creative Center (创意中心): Top Ads search, ad details and performance. $0.0020 a call. No TikTok login and no cookie; a failed call is free.

Also known as: TikTok 创意中心, tiktok top ads, TikTok 热门广告

## What this data is

**Top Ads in TikTok's Creative Center are a showcase of ads that did well, one country at a time.** Search them by keyword over the last 7, 30 or 180 days, in the Creative Center's own order or by likes, then read one ad for its landing page, comments, shares and the countries it ran in.

It is not an ad library: a Top Ad has no dates and no advertiser ID, only a brand name on some. TikTok's Ads Library, the record of ads shown in Europe, is a different set of ads with IDs of its own, read by the TikTok ads endpoints.

- **Likes, comments, shares**: The engagement on the ad's video, under `ext` in the full view. The search gives likes; one ad read by its ID adds comments and shares.
- **Period and country**: `window` is the period the list covers: `7d`, `30d` or `180d`, 180 days when left out. `region` is the two-letter code of the country, the United States when left out.
- **Objective**: `ext.objective` is the campaign objective, as the platform's own code.
- **Video addresses expire**: `videos` and `ext.cover_url` are signed addresses, issued anew with every answer; they expire, so save a file you want to keep.

## The 2 endpoints

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [TikTok Creative Center Top Ads search](https://dataxapi.com/apis/tiktok/creative_center/ads/search.md) | `GET /v1/tiktok/creative_center/ads/search` | Ad list | $0.0020 / call |
| [TikTok Creative Center Top Ad detail](https://dataxapi.com/apis/tiktok/creative_center/ads/get.md) | `GET /v1/tiktok/creative_center/ads/get` | Ad | $0.0020 / call |

## A typical use, with its bill

**Collect the ads running in an industry.** Read five pages of Top Ads, then open the ten worth studying for their details and performance figures.

| Call | Times | Cost |
| --- | --- | --- |
| TikTok Creative Center Top Ads search | 5 × $0.0020 | $0.0100 |
| TikTok Creative Center Top Ad detail | 10 × $0.0020 | $0.0200 |
| In all, 15 calls |  | $0.0300 |

## Use it in your AI

> Use DataXAPI to search the TikTok Creative Center Top Ads and tell me what the first ten ads of the list have in common.

## Questions

### How much does it cost?

Per call, no subscription. All 2 endpoints cost $0.0020 a call. You are charged when data comes back; a failed call costs nothing.

### Does a Top Ad say when it ran?

No. The Creative Center gives no dates, so `first_shown_at` and `last_shown_at` are not returned. For when an ad was shown, TikTok's Ads Library has them, for ads shown in Europe.

### Who is the advertiser?

`advertiser.name` is the brand name the Creative Center shows, and many ads have none. There is no advertiser ID, link or logo.

### Where does an ad's ID come from?

From the search: each result's `id` is a string of digits that goes unchanged to the ad detail. An ID nobody has is answered `not_found`, which is not charged.

### Do I need a Creative Center or TikTok account?

No. You hold one DataXAPI key: no TikTok login, no cookie, no advertiser account.

[TikTok API](https://dataxapi.com/apis/tiktok.md)

---

How to call, pay and handle errors is the same everywhere: https://dataxapi.com/llms.txt

Last checked 2026-10-18 19:59 UTC. Catalog revision c48ce454ae6c4c65. [HTML version](https://dataxapi.com/apis/tiktok/creative_center/)
