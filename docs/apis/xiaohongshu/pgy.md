# Xiaohongshu PGY API (蒲公英)

14 endpoints read Xiaohongshu PGY (蒲公英): creator search, rate cards, audience profiles, performance, keyword search index. $0.0400 a call. No Xiaohongshu login and no cookie; a failed call is free.

Also known as: 小红书蒲公英, 小红书博主, 小红书博主合作平台

## What this data is

**蒲公英 (PGY) is Xiaohongshu's official creator marketplace**, where brands book creators for sponsored notes. It holds each creator's rates for an image note and a video note, their audience profile and how their notes perform, and it has a keyword search index of its own.

The creator endpoints read creators by PGY creator ID, which search returns. Two read keywords: a keyword's day-by-day search index over about the last three months, and what people search before and after it.

The creator endpoints also read what a creator's PGY page shows beyond that: the costs (estimated CPM, cost per interaction, per read and per shop visitor of an image and a video note, each against peers), the core figures day by day, the follower summary (active, engaged, reading and buying followers), whether the creator is easy to reach and active, where reads come from and the long-term notes, and the note cases by sponsored, image or video, most read and organic traffic; by note ID, one note's impressions, reads, interactions, follows and the brand it was reported for.

- **Rates in yuan**: In the full view, `ext.rate_image_note` and `ext.rate_video_note` are the creator's listed prices for an image note and a video note, in CNY.
- **Medians over 30 or 90 days**: Performance is of everyday notes by default, of sponsored notes with `tab=sponsored`: median impressions, reads and interactions, the engagement rate, the share of notes past 100 and 1,000 likes, and the share of comparable creators it exceeds.
- **Shares, not head counts**: The audience profile gives the share of each segment by gender, age, province, city, interest and device, with the day the figures are of in `measured_at`.
- **A search index, not a count**: The keyword index is the platform's own index. The platform sets the period (about three months) and it cannot be chosen; days are calendar days in China time.
- **Sponsored or not**: A creator's notes say whether each was sponsored and, when it was, for which brand.

Updates: Live, read from PGY at the moment of the call

## The 14 endpoints

### Keywords (2)

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [Xiaohongshu PGY keyword search index](https://dataxapi.com/apis/xiaohongshu/pgy/keywords/history.md) | `GET /v1/xiaohongshu/pgy/keywords/history` | Keyword index history | $0.0400 / call |
| [Xiaohongshu PGY related keywords](https://dataxapi.com/apis/xiaohongshu/pgy/keywords/related.md) | `GET /v1/xiaohongshu/pgy/keywords/related` | Related keyword list | $0.0400 / call |

### Creators (10)

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [Xiaohongshu PGY creator search](https://dataxapi.com/apis/xiaohongshu/pgy/creators/search.md) | `GET /v1/xiaohongshu/pgy/creators/search` | Creator list | $0.0400 / call |
| [Xiaohongshu PGY creator audience profile](https://dataxapi.com/apis/xiaohongshu/pgy/creators/audience/get.md) | `GET /v1/xiaohongshu/pgy/creators/audience/get` | Audience | $0.0400 / call |
| [Xiaohongshu PGY creator detail](https://dataxapi.com/apis/xiaohongshu/pgy/creators/get.md) | `GET /v1/xiaohongshu/pgy/creators/get` | Creator | $0.0400 / call |
| [Xiaohongshu PGY creator core figures history](https://dataxapi.com/apis/xiaohongshu/pgy/creators/costs/history.md) | `GET /v1/xiaohongshu/pgy/creators/costs/history` | PGY creator core figures history | $0.0400 / call |
| [Xiaohongshu PGY creator costs and data summary](https://dataxapi.com/apis/xiaohongshu/pgy/creators/costs/metrics.md) | `GET /v1/xiaohongshu/pgy/creators/costs/metrics` | PGY creator costs and summary | $0.0400 / call |
| [Xiaohongshu PGY creator follower history](https://dataxapi.com/apis/xiaohongshu/pgy/creators/followers/history.md) | `GET /v1/xiaohongshu/pgy/creators/followers/history` | Follower history | $0.0400 / call |
| [Xiaohongshu PGY creator follower summary](https://dataxapi.com/apis/xiaohongshu/pgy/creators/followers/metrics.md) | `GET /v1/xiaohongshu/pgy/creators/followers/metrics` | PGY creator follower summary | $0.0400 / call |
| [Xiaohongshu PGY creator metrics](https://dataxapi.com/apis/xiaohongshu/pgy/creators/metrics.md) | `GET /v1/xiaohongshu/pgy/creators/metrics` | PGY creator metrics | $0.0400 / call |
| [Xiaohongshu PGY creator notes](https://dataxapi.com/apis/xiaohongshu/pgy/creators/notes/list.md) | `GET /v1/xiaohongshu/pgy/creators/notes/list` | PGY creator note list | $0.0400 / call |
| [Xiaohongshu PGY similar creators](https://dataxapi.com/apis/xiaohongshu/pgy/creators/related.md) | `GET /v1/xiaohongshu/pgy/creators/related` | Creator list | $0.0400 / call |

### Notes (2)

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [Xiaohongshu PGY note metrics](https://dataxapi.com/apis/xiaohongshu/pgy/notes/get.md) | `GET /v1/xiaohongshu/pgy/notes/get` | PGY note detail | $0.0400 / call |
| [Xiaohongshu PGY trending notes](https://dataxapi.com/apis/xiaohongshu/pgy/notes/trending.md) | `GET /v1/xiaohongshu/pgy/notes/trending` | Post list | $0.0400 / call |

## A typical use, with its bill

**Vet creators before a seeding campaign.** One search in the full view already returns, for 20 creators, the two rates and the median reads and interactions. Read the audience profile and the recent notes only for the five you keep.

| Call | Times | Cost |
| --- | --- | --- |
| Xiaohongshu PGY creator search | 1 × $0.0400 | $0.0400 |
| Xiaohongshu PGY creator audience profile | 5 × $0.0400 | $0.2000 |
| Xiaohongshu PGY creator notes | 5 × $0.0400 | $0.2000 |
| In all, 11 calls |  | $0.4400 |

## Use it in your AI

> Use DataXAPI to find Xiaohongshu creators on PGY (蒲公英) who write about “咖啡”, list their image-note rates and median reads, then show the audience profile of the top five.

## Questions

### How much does it cost?

Per call, no subscription. All 14 endpoints cost $0.0400 a call. You are charged when data comes back; a failed call costs nothing.

### What currency are the rates in?

Chinese yuan, as the creator lists them on PGY. What DataXAPI charges for the call is in US dollars.

### Can I choose the period of the keyword index?

No. The platform returns about the last three months, day by day, with each day's notes about the keyword and how often they were shown, read and engaged with.

### Where does the creator ID come from?

From the search endpoint. It is PGY's own ID for the creator, and the other four creator endpoints take it.

### Do I need a PGY or Xiaohongshu account?

No. You hold one DataXAPI key: no Xiaohongshu login, no cookie, no advertiser account.

## The same kind of data elsewhere

- [Douyin Xingtu API](https://dataxapi.com/apis/douyin/xingtu.md): Douyin's creator marketplace: search, rate cards, audience, reach and conversion.
- [Douyin trend-index API](https://dataxapi.com/apis/douyin/index.md): Douyin's keyword index returns the same structure as PGY's, so one piece of code reads both.

## How-to guides and answers

- [How to look up Xiaohongshu (RedNote) PGY creator rates and audience](https://dataxapi.com/guides/xiaohongshu-pgy-creator-rates.md)
- [How to get a keyword's search index and related keywords on Xiaohongshu PGY](https://dataxapi.com/guides/xiaohongshu-pgy-keywords.md)
- [How do I export Xiaohongshu (RedNote) data?](https://dataxapi.com/answers/export-xiaohongshu-data.md)
- [Can ChatGPT read Xiaohongshu (RedNote)?](https://dataxapi.com/answers/can-chatgpt-read-xiaohongshu.md)
- [What is CPE on Xiaohongshu PGY and on Douyin Xingtu?](https://dataxapi.com/answers/xiaohongshu-pgy-cpe-vs-xingtu-cpe.md)
- [What is Xiaohongshu PGY?](https://dataxapi.com/answers/what-is-xiaohongshu-pgy.md)

[Xiaohongshu (RedNote) API](https://dataxapi.com/apis/xiaohongshu.md)

---

How to call, pay and handle errors is the same everywhere: https://dataxapi.com/llms.txt

Last checked 2026-11-20 07:17 UTC. Catalog revision 720fc3ea8dadb865. [HTML version](https://dataxapi.com/apis/xiaohongshu/pgy/)
