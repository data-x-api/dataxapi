# Douyin trend-index API (巨量算数)

10 endpoints read Douyin trend-index (巨量算数): keyword trends, related keywords, audiences, brand indexes, live hot topics. From $0.0020 to $0.0060 a call. No Douyin login and no cookie; a failed call is free.

Also known as: 抖音指数, 算数指数, 巨量指数, 巨量引擎指数, ocean insights, ocean engine index

## What this data is

**巨量算数 (Juliang Suanshu) is Douyin's own index tool.** Day by day it scores how much a keyword is searched and how much attention content about it draws, and it does the same for brands and creators. Marketers in China read it the way others read a search-trends chart: is a topic rising, when does it peak, who cares about it.

These endpoints read the figures the tool shows and return them in DataXAPI's one response shape, so the code that reads a keyword on Douyin also reads it on Xiaohongshu.

- **An index, not a count**: An index is the platform's own score. It is not a number of searches. Compare a keyword with itself over time, or with another keyword on Douyin.
- **Two indexes**: `search_index` follows how much the keyword is searched; `composite_index` follows how much attention content about it draws. A brand has three: search, content and spread.
- **A day or two late**: The platform publishes a day's figure a day or two later. A day without a figure yet comes back as `null`, never as 0.
- **China-time days**: A day is a calendar day in UTC+8, written as midnight UTC of its date: `2026-09-01` means 1 September in Beijing.
- **TGI**: In a keyword's audience, TGI says how much a group leans to the keyword: 100 is the platform's average, above 100 leans more.

Updates: Daily, published a day or two late, China time

## The 10 endpoints

### Keywords (3)

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [Douyin trend-index keyword audience](https://dataxapi.com/apis/douyin/index/keywords/audience/get.md) | `GET /v1/douyin/index/keywords/audience/get` | Keyword audience | $0.0020 / call |
| [Douyin trend-index keyword trends](https://dataxapi.com/apis/douyin/index/keywords/history.md) | `GET /v1/douyin/index/keywords/history` | Keyword index history list | $0.0060 / call |
| [Douyin trend-index related keywords](https://dataxapi.com/apis/douyin/index/keywords/related.md) | `GET /v1/douyin/index/keywords/related` | Related keyword list | $0.0020 / call |

### Brands (2)

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [Douyin trend-index brand trends](https://dataxapi.com/apis/douyin/index/brands/history.md) | `GET /v1/douyin/index/brands/history` | Brand index history | $0.0020 / call |
| [Douyin trend-index brand comparison](https://dataxapi.com/apis/douyin/index/brands/metrics.md) | `GET /v1/douyin/index/brands/metrics` | Brand index averages | $0.0020 / call |

### Creators (3)

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [Douyin trend-index creator follower profile](https://dataxapi.com/apis/douyin/index/creators/audience/get.md) | `GET /v1/douyin/index/creators/audience/get` | Audience | $0.0020 / call |
| [Douyin trend-index creator core metrics](https://dataxapi.com/apis/douyin/index/creators/metrics.md) | `GET /v1/douyin/index/creators/metrics` | Douyin trend-index creator metrics | $0.0020 / call |
| [Douyin trend-index creator top videos](https://dataxapi.com/apis/douyin/index/creators/videos/list.md) | `GET /v1/douyin/index/creators/videos/list` | Post list | $0.0020 / call |

### Videos (1)

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [Douyin trend-index keyword hot videos](https://dataxapi.com/apis/douyin/index/videos/search.md) | `GET /v1/douyin/index/videos/search` | Post list | $0.0020 / call |

### Trends (1)

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [Douyin trend-index live hot topics](https://dataxapi.com/apis/douyin/index/trends/list.md) | `GET /v1/douyin/index/trends/list` | Trend list | $0.0020 / call |

## A typical use, with its bill

**Track five keywords every week.** One call returns the day-by-day index of all five: one to five keywords cost the same call. Once a month a second call lists the words searched together with your main keyword, so the watch list stays current.

| Call | Times | Cost |
| --- | --- | --- |
| Douyin trend-index keyword trends | 52 × $0.0060 | $0.3120 |
| Douyin trend-index related keywords | 12 × $0.0020 | $0.0240 |
| In all, 64 calls |  | $0.3360 |

## Use it in your AI

> Use DataXAPI to get the last 30 days of the Douyin trend index (巨量算数) for “露营”, “露营咖啡” and “户外电源”, and tell me which is rising fastest.

## Questions

### How much does it cost?

Per call, no subscription. From $0.0020 to $0.0060 a call; each endpoint's page shows its own price. You are charged when data comes back; a failed call costs nothing.

### Where does the data come from?

From 巨量算数 (Juliang Suanshu), Douyin's own index tool, which many call the Douyin index (抖音指数): the same figures its pages show for a keyword, a brand or a creator. No Douyin account and no advertiser account are needed.

### How long a range can I ask for?

Any run of whole China-time days from `since` to `until`; the price of a call does not depend on the range. Each keyword also comes with the daily averages of the period, of the period before and of the same period a year earlier.

### How many keywords can one call take?

Keyword trends take one to five keywords a call, at one price: five keywords cost the same as one. Audiences and related keywords take one keyword a call.

### How do I use it in ChatGPT or Claude?

Connect DataXAPI once with one prompt that has your key in it (on the agents page), then ask in plain words, for example: “Get the Douyin index of 咖啡 for September 2026 with DataXAPI.” The agent finds the endpoint, calls it and pays per call from your balance.

### Is the index a number of searches?

No. It is the platform's own score of how much a keyword is searched or watched. Use it to compare a keyword with itself over time, or with another keyword on Douyin. Do not add it to numbers from other platforms.

### How fresh is it?

The platform publishes each day a day or two late. A call reads the tool at that moment and `meta.fetched_at` says when; days not published yet come back as `null`. The two hot-topic boards are snapshots a few minutes old.

### What if the index does not cover my keyword?

A keyword the index does not cover is left out of the answer. When none of the keywords asked for has figures, the result is empty, not a not-found error, and is charged as an empty result is.

### Do I need a trend-index or Douyin account?

No. You hold one DataXAPI key: no Douyin login, no cookie, no advertiser account.

## The same kind of data elsewhere

- [Xiaohongshu PGY API](https://dataxapi.com/apis/xiaohongshu/pgy.md): Xiaohongshu's keyword search index and related keywords return the same structure, so one piece of code reads both.
- [Douyin Xingtu API](https://dataxapi.com/apis/douyin/xingtu.md): The other Douyin-only family: what creators charge, who follows them, how they convert.

## How-to guides and answers

- [How to get Douyin keyword trends in bulk](https://dataxapi.com/guides/douyin-keyword-trends.md)
- [How do I export Douyin data?](https://dataxapi.com/answers/export-douyin-data.md)

[Douyin API](https://dataxapi.com/apis/douyin.md)

---

How to call, pay and handle errors is the same everywhere: https://dataxapi.com/llms.txt

Last checked 2026-10-18 19:59 UTC. Catalog revision c48ce454ae6c4c65. [HTML version](https://dataxapi.com/apis/douyin/index/)
