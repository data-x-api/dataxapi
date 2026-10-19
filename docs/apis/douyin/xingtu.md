# Douyin Xingtu API (星图)

11 endpoints read Douyin Xingtu (星图): creator search, rate cards, audience profiles, reach and conversion. From $0.0020 to $0.0400 a call. No Douyin login and no cookie; a failed call is free.

Also known as: 巨量星图, 抖音星图

## What this data is

**星图 (Xingtu) is Douyin's official creator marketplace**, where brands book creators for sponsored videos. For each creator it holds a rate card, an audience profile and performance figures that it shows to advertisers who have signed in.

These endpoints read them by Xingtu creator ID: what a creator charges for each kind of sponsored work, who follows them, how their videos did over the last 30 or 90 days, how their product videos sell, and the six scores Xingtu itself gives. Search by name returns the creator ID the others take.

- **Xingtu creator ID**: Not the Douyin account ID. Search returns it; on a creator's profile, `account_id` is the one the Douyin account endpoints take.
- **Rates in yuan**: `rates[].amount` is the creator's own listed price for that kind of work, in CNY; it is `null` where the kind has no fixed rate. `name` and `settlement` are the platform's own words.
- **Medians and rates**: Reach figures are per video over the last 30 or 90 days: median views, average likes, comments and shares, engagement and completion rates, each with the share of comparable creators it exceeds.
- **Bands, not exact sales**: Conversion figures (sales, sales per thousand views, click cost) are the bands the platform shows, as its own text, not exact numbers.
- **Six scores**: The overall Xingtu score and those for reach, seeding, conversion, cooperation and value for money: each 0 to 100, with the average of comparable creators and the rank.

Updates: Live, read from Xingtu at the moment of the call

## The 11 endpoints

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [Douyin Xingtu creator search](https://dataxapi.com/apis/douyin/xingtu/creators/search.md) | `GET /v1/douyin/xingtu/creators/search` | Creator list | $0.0040 / call |
| [Douyin Xingtu creator audience](https://dataxapi.com/apis/douyin/xingtu/creators/audience/get.md) | `GET /v1/douyin/xingtu/creators/audience/get` | Audience | $0.0040 / call |
| [Douyin Xingtu creator content mix](https://dataxapi.com/apis/douyin/xingtu/creators/content_mix/get.md) | `GET /v1/douyin/xingtu/creators/content_mix/get` | Xingtu creator content mix | $0.0040 / call |
| [Douyin Xingtu creator conversion](https://dataxapi.com/apis/douyin/xingtu/creators/conversion/get.md) | `GET /v1/douyin/xingtu/creators/conversion/get` | Xingtu creator conversion | $0.0040 / call |
| [Douyin Xingtu creator profile](https://dataxapi.com/apis/douyin/xingtu/creators/get.md) | `GET /v1/douyin/xingtu/creators/get` | Creator | $0.0040 / call |
| [Douyin Xingtu creator content keywords](https://dataxapi.com/apis/douyin/xingtu/creators/keywords/get.md) | `GET /v1/douyin/xingtu/creators/keywords/get` | Xingtu creator content keywords | $0.0020 / call |
| [Douyin Xingtu creator rate card](https://dataxapi.com/apis/douyin/xingtu/creators/rates/get.md) | `GET /v1/douyin/xingtu/creators/rates/get` | Creator rates | $0.0400 / call |
| [Douyin Xingtu creator index scores](https://dataxapi.com/apis/douyin/xingtu/creators/scores/get.md) | `GET /v1/douyin/xingtu/creators/scores/get` | Xingtu creator scores | $0.0080 / call |
| [Douyin Xingtu creator metrics](https://dataxapi.com/apis/douyin/xingtu/creators/metrics.md) | `GET /v1/douyin/xingtu/creators/metrics` | Xingtu creator metrics | $0.0040 / call |
| [Douyin Xingtu creator video performance](https://dataxapi.com/apis/douyin/xingtu/creators/videos/list.md) | `GET /v1/douyin/xingtu/creators/videos/list` | Xingtu creator video list | $0.0040 / call |
| [Douyin Xingtu marketing calendar](https://dataxapi.com/apis/douyin/xingtu/campaigns/list.md) | `GET /v1/douyin/xingtu/campaigns/list` | Xingtu campaign list | $0.0040 / call |

## A typical use, with its bill

**Shortlist creators for a campaign.** Search by a word, then one call with `ids` returns the two video rates and the expected views of up to 50 creators at once. Read the full rate card, the reach figures and the audience only for the five you keep.

| Call | Times | Cost |
| --- | --- | --- |
| Douyin Xingtu creator search | 1 × $0.0040 | $0.0040 |
| Douyin Xingtu creator profile | 1 × $0.0040 | $0.0040 |
| Douyin Xingtu creator rate card | 5 × $0.0400 | $0.2000 |
| Douyin Xingtu creator metrics | 5 × $0.0040 | $0.0200 |
| Douyin Xingtu creator audience | 5 × $0.0040 | $0.0200 |
| In all, 17 calls |  | $0.2480 |

## Use it in your AI

> Use DataXAPI to find Douyin creators on Xingtu (星图) for “露营”, then compare the rate cards and 30-day median views of the five with the most followers.

## Questions

### How much does it cost?

Per call, no subscription. From $0.0020 to $0.0400 a call; each endpoint's page shows its own price. You are charged when data comes back; a failed call costs nothing.

### What currency are the rates in?

Chinese yuan, as the creator lists them on Xingtu; the answer says so in `currency`. What DataXAPI charges for the call is in US dollars.

### Is the creator ID the Douyin user ID?

No. Xingtu has its own creator ID, which the search endpoint returns. A creator's profile also gives the Douyin account ID, to pass to the Douyin user endpoints.

### What if a creator has no selling figures?

The conversion endpoint answers `not_found` for a creator without selling figures, and that is not charged.

### Do I need a Xingtu or Douyin account?

No. You hold one DataXAPI key: no Douyin login, no cookie, no advertiser account.

## The same kind of data elsewhere

- [Xiaohongshu PGY API](https://dataxapi.com/apis/xiaohongshu/pgy.md): Xiaohongshu's creator marketplace: search, rates, audience and performance, in the same Creator object.
- [Douyin trend-index API](https://dataxapi.com/apis/douyin/index.md): The other Douyin-only family: keyword, brand and creator indexes.

## How-to guides and answers

- [How to look up a Douyin creator's Xingtu rate card](https://dataxapi.com/guides/douyin-xingtu-creator-rates.md)

[Douyin API](https://dataxapi.com/apis/douyin.md)

---

How to call, pay and handle errors is the same everywhere: https://dataxapi.com/llms.txt

Last checked 2026-10-18 19:59 UTC. Catalog revision c48ce454ae6c4c65. [HTML version](https://dataxapi.com/apis/douyin/xingtu/)
