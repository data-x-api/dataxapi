# Douyin API

38 endpoints read Douyin: videos, hashtags, users, comments, trends, keywords, trend-index, Xingtu. From $0.0020 a call. No Douyin login and no cookie; a failed call is free.

> 38 endpoints. How to call, pay and handle errors is the same everywhere: https://dataxapi.com/llms.txt

Generated from catalog revision 720fc3ea8dadb865, price book 19.

## douyin.comments.replies.list

Get a page of the replies under a Douyin comment, by the comment's ID and its video's ID: text, replier, likes, time posted. Up to 20 items a call; $0.0020 per call. Errors and timeouts are not charged.

- Name: Douyin comment replies API
- Request: `GET /v1/douyin/comments/replies/list`
- Parameters: `id` (required), `post_id` (required), `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/douyin/comments/replies/list.md

## douyin.hashtags.videos.list

Get a page of Douyin videos under a hashtag, by the hashtag's ID, in the platform's order, most liked first or newest first: caption, author, engagement counts, time posted. Up to 10 items a call; $0.0020 per call. Errors, timeouts and objects that do not exist are not charged.

- Name: Douyin hashtag videos API
- Request: `GET /v1/douyin/hashtags/videos/list`
- Parameters: `id` (required), `sort`, `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/douyin/hashtags/videos/list.md

## douyin.index.brands.history

Get a brand's day-by-day search, content and spread indexes on Douyin over a date range, from the platform's own index tool. An index is the platform's score, not a count; days are calendar days in China time (UTC+8). One object a call; $0.0020 per call. Errors and timeouts are not charged.

- Name: Douyin trend-index brand trends API
- Request: `GET /v1/douyin/index/brands/history`
- Parameters: `brand` (required), `since` (required), `until` (required), `view`, `fields`
- Whole contract: https://dataxapi.com/apis/douyin/index/brands/history.md

## douyin.index.brands.metrics

Get the daily averages of a brand's search, content and spread indexes on Douyin over a date range, from the platform's own index tool, with the averages of every brand in its industry and of the industry's top 3, 5, 10, 15 and 30 to hold them against. An index is the platform's score, not a count. One object a call; $0.0020 per call. Errors and timeouts are not charged.

- Name: Douyin trend-index brand comparison API
- Request: `GET /v1/douyin/index/brands/metrics`
- Parameters: `brand` (required), `since` (required), `until` (required), `view`, `fields`
- Whole contract: https://dataxapi.com/apis/douyin/index/brands/metrics.md

## douyin.index.creators.videos.list

Get the videos the platform's own index tool lists as a Douyin account's top videos for a span of up to 30 days, by the account's numeric ID: up to twenty, most liked first, each with caption, link, day published, its engagement counts and followers gained. As recorded, the tool picks from what was published on the last day or two of the span, not from all of it: set the end date to the day you want. One page; no view counts. Up to 20 items a call; $0.0020 per call. Errors and timeouts are not charged.

- Name: Douyin trend-index creator top videos API
- Request: `GET /v1/douyin/index/creators/videos/list`
- Parameters: `id` (required), `since` (required), `until` (required), `view`, `fields`
- Whole contract: https://dataxapi.com/apis/douyin/index/creators/videos/list.md

## douyin.index.creators.audience.get

Get who follows a Douyin account from the platform's own index tool, by the account's numeric ID: the share of each segment by gender, age, province, city, city tier, phone brand and interest. Not limited to marketplace creators; shares only, no head counts. One object a call; $0.0020 per call. Errors and timeouts are not charged.

- Name: Douyin trend-index creator follower profile API
- Request: `GET /v1/douyin/index/creators/audience/get`
- Parameters: `id` (required), `view`, `fields`
- Whole contract: https://dataxapi.com/apis/douyin/index/creators/audience/get.md

## douyin.index.creators.metrics

Get a Douyin creator's core figures from the platform's own index tool, by the account's numeric ID: new likes, shares and comments a day and the tool's own count of follows a day, on average over the last week and the last month, each as a ratio against the period before. The follows are not the net gain in followers, and come out larger. An account the tool has nothing on (every figure 0) is answered as not found. One object a call; $0.0020 per call. Errors and timeouts are not charged.

- Name: Douyin trend-index creator core metrics API
- Request: `GET /v1/douyin/index/creators/metrics`
- Parameters: `id` (required), `view`, `fields`
- Whole contract: https://dataxapi.com/apis/douyin/index/creators/metrics.md

## douyin.index.keywords.audience.get

Get who is behind a keyword on Douyin over a date range, from the platform's own keyword tool: the share and TGI of each age group, gender, province, city, city tier and interest. One object a call; $0.0020 per call. Errors and timeouts are not charged.

- Name: Douyin trend-index keyword audience API
- Request: `GET /v1/douyin/index/keywords/audience/get`
- Parameters: `keyword` (required), `since` (required), `until` (required), `view`, `fields`
- Whole contract: https://dataxapi.com/apis/douyin/index/keywords/audience/get.md

## douyin.index.keywords.history

Get the day-by-day search index and composite index of a keyword, or of one to five keywords at once, on Douyin over a date range, from 巨量算数 (the Douyin index), with the daily averages of the period, of the one before and of a year earlier. An index is the platform's score of volume, not a count of searches; days are calendar days in China time (UTC+8). About 1 item a call, 5 at most; $0.0060 per call. Errors and timeouts are not charged.

- Name: Douyin trend-index keyword trends API
- Request: `GET or POST /v1/douyin/index/keywords/history`
- Parameters: `keyword`, `keywords`, `since` (required), `until` (required), `view`, `fields`; give exactly one of keywords, keyword
- Whole contract: https://dataxapi.com/apis/douyin/index/keywords/history.md

## douyin.index.keywords.related

Get the keywords related to a keyword on Douyin in one week, from the platform's own keyword tool: those searched together with it and those that appear with it in content, each with its relevance, its place by relevance, its search index and its composite index. An index is the platform's score of volume, not a count of searches. About 170 items a call, 250 at most; $0.0020 per call. Errors and timeouts are not charged.

- Name: Douyin trend-index related keywords API
- Request: `GET /v1/douyin/index/keywords/related`
- Parameters: `keyword` (required), `until` (required), `view`, `fields`
- Whole contract: https://dataxapi.com/apis/douyin/index/keywords/related.md

## douyin.index.trends.list

Get the live topic board or the fastest-rising topic board of Douyin's index tool, about 30 entries each: place, name, topic index, number of related videos, their plays and a category. The topic index is the platform's score of heat, not a count of searches. About 30 items a call, 50 at most; $0.0020 per call. Errors and timeouts are not charged.

- Name: Douyin trend-index live hot topics API
- Request: `GET /v1/douyin/index/trends/list`
- Parameters: `board`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/douyin/index/trends/list.md

## douyin.index.videos.search

Get the roughly 20 high-index videos Douyin's index tool puts forward for a keyword: caption, link, author's display name, likes, video index and category. One page only; the author's ID and the publication time are not given, the video endpoint has them. Up to 20 items a call; $0.0020 per call. Errors and timeouts are not charged.

- Name: Douyin trend-index keyword hot videos API
- Request: `GET /v1/douyin/index/videos/search`
- Parameters: `query` (required), `view`, `fields`
- Whole contract: https://dataxapi.com/apis/douyin/index/videos/search.md

## douyin.trends.list

Get a Douyin hot list: hot searches, rising topics, topic ranking, top search terms or the music chart, with rank and heat. About 50 items a call, 51 at most; $0.0020 per call. Errors and timeouts are not charged.

- Name: Douyin hot search board API
- Request: `GET /v1/douyin/trends/list`
- Parameters: `board`, `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/douyin/trends/list.md

## douyin.users.get

Get a Douyin user's profile by account ID or profile link: name, handle, bio, follower, following and post counts, total likes, verification; in the full view also what the badge says, whether it is an organisation's or shop's (blue V), whether the profile has a product showcase, whether the account may sell live, and whether it is live now, with the room's ID. One object a call; $0.0020 per call. Errors, timeouts and objects that do not exist are not charged.

- Name: Douyin user profile API
- Request: `GET /v1/douyin/users/get`
- Parameters: `id`, `url`, `view`, `fields`; give exactly one of id, url
- Whole contract: https://dataxapi.com/apis/douyin/users/get.md

## douyin.users.history

Get how a Douyin account's numbers moved over the last 7 or 30 days, by its numeric ID, from the platform's own index tool: net new followers, new likes, comments, shares and posts, each as a ratio against the period before, and the totals now; up to five accounts in one request. It is one period's sum, not a day-by-day series. One object a call; up to 5 in one request with ids; $0.0020 per call. Errors and timeouts are not charged.

- Name: Douyin creator engagement and follower trends API
- Request: `GET or POST /v1/douyin/users/history`
- Parameters: `id`, `ids`, `window`, `view`, `fields`; give exactly one of id, ids
- Whole contract: https://dataxapi.com/apis/douyin/users/history.md

## douyin.users.search

Search Douyin accounts by terms, a page at a time: account ID, display name, avatar, follower count, post count, total likes. Up to 30 items a call; $0.0020 per call. Errors and timeouts are not charged.

- Name: Douyin user search API
- Request: `GET /v1/douyin/users/search`
- Parameters: `query` (required), `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/douyin/users/search.md

## douyin.users.videos.list

Get a page of the videos a Douyin account has posted, newest first: caption, engagement counts, time posted. Up to 20 items a call; $0.0020 per call. Errors and timeouts are not charged.

- Name: Douyin user videos API
- Request: `GET /v1/douyin/users/videos/list`
- Parameters: `id`, `url`, `cursor`, `view`, `fields`; give exactly one of id, url
- Whole contract: https://dataxapi.com/apis/douyin/users/videos/list.md

## douyin.videos.comments.list

Get a page of comments on a Douyin video: text, commenter, likes, reply count, time posted. Up to 20 items a call; $0.0020 per call. Errors and timeouts are not charged.

- Name: Douyin video comments API
- Request: `GET /v1/douyin/videos/comments/list`
- Parameters: `id`, `url`, `cursor`, `view`, `fields`; give exactly one of id, url
- Whole contract: https://dataxapi.com/apis/douyin/videos/comments/list.md

## douyin.videos.get

Get one Douyin video or image post by ID or link: caption, author, engagement counts, time posted. One object a call; $0.0020 per call. Errors and timeouts are not charged.

- Name: Douyin video detail API
- Request: `GET /v1/douyin/videos/get`
- Parameters: `id`, `url`, `view`, `fields`; give exactly one of id, url
- Whole contract: https://dataxapi.com/apis/douyin/videos/get.md

## douyin.videos.metrics

Get a Douyin video's counts as of now, by its ID: plays and likes. One object a call; $0.0020 per call. Errors and timeouts are not charged.

- Name: Douyin video play count API
- Request: `GET /v1/douyin/videos/metrics`
- Parameters: `id`, `url`, `view`, `fields`; give exactly one of id, url
- Whole contract: https://dataxapi.com/apis/douyin/videos/metrics.md

## douyin.videos.related

Get the batch of videos Douyin recommends beside a video, by its ID: caption, author, engagement counts. The recommendations may differ from call to call. About 10 items a call, 20 at most; $0.0020 per call. Errors and timeouts are not charged.

- Name: Douyin related videos API
- Request: `GET /v1/douyin/videos/related`
- Parameters: `id` (required), `view`, `fields`
- Whole contract: https://dataxapi.com/apis/douyin/videos/related.md

## douyin.videos.search

Search Douyin videos by terms, a page at a time, sorted by relevance, newest or most liked and filtered by time posted: caption, author with follower count, engagement counts. About 8 items a call, 20 at most; $0.0200 per call. Errors and timeouts are not charged.

- Name: Douyin video search API
- Request: `GET /v1/douyin/videos/search`
- Parameters: `query` (required), `sort`, `published_within`, `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/douyin/videos/search.md

## douyin.videos.trending

Get a Douyin video board for the last day: breakouts from small accounts, highest like rate, highest completion rate or highest follow rate, with plays, likes and the author's follower count. About 9 items a call, 10 at most; $0.0020 per call. Errors and timeouts are not charged.

- Name: Douyin trending videos API
- Request: `GET /v1/douyin/videos/trending`
- Parameters: `board`, `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/douyin/videos/trending.md

## douyin.xingtu.creators.rates.get

Get what a Douyin creator charges on Xingtu for each kind of sponsored work, and how it is settled. One object a call; $0.0400 per call. Errors, timeouts and objects that do not exist are not charged.

- Name: Douyin Xingtu creator rate card API
- Request: `GET /v1/douyin/xingtu/creators/rates/get`
- Parameters: `id` (required), `view`, `fields`
- Whole contract: https://dataxapi.com/apis/douyin/xingtu/creators/rates/get.md

## douyin.xingtu.creators.search

Search Douyin creators on Xingtu by words in their name, filtered by followers, expected CPM (in yuan) and gender, or ordered by expected CPM, lowest first:Xingtu creator ID, name, location, content categories, followers; in the full view also what an integrated and a custom video cost, expected CPMs (in yuan), expected views, the last 30 days' interaction and completion ratios and median views, the e-commerce level, gender and content labels. The creator ID the other Xingtu endpoints take comes from here. Up to 20 items a call; $0.0040 per call. Errors and timeouts are not charged.

- Name: Douyin Xingtu creator search API
- Request: `GET /v1/douyin/xingtu/creators/search`
- Parameters: `query` (required), `followers_min`, `followers_max`, `cpm_min`, `cpm_max`, `gender`, `sort`, `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/douyin/xingtu/creators/search.md

## douyin.xingtu.creators.get

Get a Douyin creator's profile on Xingtu by Xingtu creator ID: name, location, content categories, followers, gender; one ID also gives the Douyin account ID, handle, agency and content labels, several IDs (up to 50) give what an integrated and a custom video cost, their expected CPMs (in yuan) and the views expected of a video instead. One object a call; up to 50 in one request with ids; $0.0040 per call. Errors, timeouts and objects that do not exist are not charged.

- Name: Douyin Xingtu creator profile API
- Request: `GET or POST /v1/douyin/xingtu/creators/get`
- Parameters: `id`, `ids`, `view`, `fields`; give exactly one of id, ids
- Whole contract: https://dataxapi.com/apis/douyin/xingtu/creators/get.md

## douyin.xingtu.creators.audience.get

Get who follows a Douyin creator, by Xingtu creator ID: followers and share in each segment by gender, age, province, city, city tier, interest, device, consumer group, purchase category and purchase amount. One object a call; $0.0040 per call. Errors and timeouts are not charged.

- Name: Douyin Xingtu creator audience API
- Request: `GET /v1/douyin/xingtu/creators/audience/get`
- Parameters: `id` (required), `view`, `fields`
- Whole contract: https://dataxapi.com/apis/douyin/xingtu/creators/audience/get.md

## douyin.xingtu.creators.metrics

Get how a Douyin creator's videos did over the last 30 or 90 days, by Xingtu creator ID: videos, median views, average likes, comments and shares, engagement and completion ratios, expected cost per thousand views and per interaction (in yuan). The figures are of all the videos: the platform gives none for the sponsored ones alone. One object a call; $0.0040 per call. Errors and timeouts are not charged.

- Name: Douyin Xingtu creator metrics API
- Request: `GET /v1/douyin/xingtu/creators/metrics`
- Parameters: `id` (required), `window`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/douyin/xingtu/creators/metrics.md

## douyin.xingtu.creators.videos.list

Get a page of a Douyin creator's videos by Xingtu creator ID, newest first, with the figures Xingtu gives for each: views, likes, completion and engagement ratios, length. Sponsored and everyday videos come together: the platform neither marks which are sponsored nor gives the sponsored ones alone. Up to 20 items a call; $0.0040 per call. Errors and timeouts are not charged.

- Name: Douyin Xingtu creator video performance API
- Request: `GET /v1/douyin/xingtu/creators/videos/list`
- Parameters: `id` (required), `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/douyin/xingtu/creators/videos/list.md

## douyin.xingtu.creators.keywords.get

Get the words Xingtu takes from a few of a Douyin creator's recent videos, by Xingtu creator ID: about twenty, each with how many times it was counted (usually single digits). They often come from one or two videos, which may be a sponsored one: a news outlet's account was found to return nothing but skincare words. They do not stand for the creator's content as a whole; for that, use the Xingtu content mix endpoint. One object a call; $0.0020 per call. Errors and timeouts are not charged.

- Name: Douyin Xingtu creator content keywords API
- Request: `GET /v1/douyin/xingtu/creators/keywords/get`
- Parameters: `id` (required), `view`, `fields`
- Whole contract: https://dataxapi.com/apis/douyin/xingtu/creators/keywords/get.md

## douyin.xingtu.creators.scores.get

Get the six scores Xingtu gives a Douyin creator, by Xingtu creator ID: the overall Xingtu score and those for reach, seeding, conversion, cooperation and value for money, each with the score, the average of comparable creators, the rank and how far from the top that rank is. One object a call; $0.0080 per call. Errors and timeouts are not charged.

- Name: Douyin Xingtu creator index scores API
- Request: `GET /v1/douyin/xingtu/creators/scores/get`
- Parameters: `id` (required), `view`, `fields`
- Whole contract: https://dataxapi.com/apis/douyin/xingtu/creators/scores/get.md

## douyin.xingtu.creators.content_mix.get

Get what a Douyin creator's recent videos are about, by Xingtu creator ID: the number of videos in each of the marketplace's content categories and their share. It shows whether the creator keeps to one subject. One object a call; $0.0040 per call. Errors and timeouts are not charged.

- Name: Douyin Xingtu creator content mix API
- Request: `GET /v1/douyin/xingtu/creators/content_mix/get`
- Parameters: `id` (required), `view`, `fields`
- Whole contract: https://dataxapi.com/apis/douyin/xingtu/creators/content_mix/get.md

## douyin.xingtu.creators.conversion.get

Get how well a Douyin creator's product videos sell, by Xingtu creator ID: videos counted, their median views, products recommended, the bands that sales, sales per thousand views, product price, cost per click, product-link clicks and click rate fall in, and the categories of goods. A band is the platform's text, not an exact figure; for most creators tried, a seller of e-commerce level L4 among them, every band was empty (null), and a creator with no selling figures is answered as not found. One object a call; $0.0040 per call. Errors and timeouts are not charged.

- Name: Douyin Xingtu creator conversion API
- Request: `GET /v1/douyin/xingtu/creators/conversion/get`
- Parameters: `id` (required), `view`, `fields`
- Whole contract: https://dataxapi.com/apis/douyin/xingtu/creators/conversion/get.md

## douyin.xingtu.campaigns.list

Get the campaigns on Xingtu's marketing calendar over a span of time: platform events, e-commerce and seasonal moments, creative and industry campaigns, each with its name, description, kind, stage, sign-up period and running period. All at once, no paging. About 40 items a call, 200 at most; $0.0040 per call. Errors and timeouts are not charged.

- Name: Douyin Xingtu marketing calendar API
- Request: `GET /v1/douyin/xingtu/campaigns/list`
- Parameters: `since` (required), `until` (required), `view`, `fields`
- Whole contract: https://dataxapi.com/apis/douyin/xingtu/campaigns/list.md

## douyin.xingtu.videos.get

Get Xingtu's report on one Douyin video by ID or link: plays and engagement counts, plus the completion rate, interaction rate, length, the author's followers and the author's Xingtu creator ID (to look up the creator's rates and metrics next). Only for videos Xingtu covers (mostly its creators'). One object a call; $0.0040 per call. Errors and timeouts are not charged.

- Name: Douyin Xingtu video report: plays and completion rate API
- Request: `GET /v1/douyin/xingtu/videos/get`
- Parameters: `id`, `url`, `view`, `fields`; give exactly one of id, url
- Whole contract: https://dataxapi.com/apis/douyin/xingtu/videos/get.md

## douyin.keywords.related

Get the suggestions Douyin's search box lists as a keyword is typed into it (autocomplete), in the order it lists them, about 10 at a time. The words and their places only, with no index. About 10 items a call, 20 at most; $0.0200 per call. Errors and timeouts are not charged.

- Name: Douyin search suggestions API
- Request: `GET /v1/douyin/keywords/related`
- Parameters: `keyword` (required), `view`, `fields`
- Whole contract: https://dataxapi.com/apis/douyin/keywords/related.md

## douyin.backup.users.videos.list

The backup of Douyin user videos, to call when the original cannot serve: the same parameters and result, at a higher price. Up to 20 items a call; $0.0300 per call. Errors and timeouts are not charged.

- Name: Douyin user videos (backup) API
- Request: `GET /v1/douyin/backup/users/videos/list`
- Parameters: `id`, `url`, `cursor`, `view`, `fields`; give exactly one of id, url
- Whole contract: https://dataxapi.com/apis/douyin/backup/users/videos/list.md

## douyin.backup.videos.search

The backup of Douyin video search, to call when the original cannot serve: the same parameters and result, at a higher price. About 8 items a call, 20 at most; $0.0300 per call. Errors and timeouts are not charged.

- Name: Douyin video search (backup) API
- Request: `GET /v1/douyin/backup/videos/search`
- Parameters: `query` (required), `sort`, `published_within`, `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/douyin/backup/videos/search.md

## How this differs from Douyin's official open platform

Douyin Open Platform is for organisations: companies, sole proprietors, government bodies, public institutions and social organisations can join, a company with its business licence. An individual can build only mini programs and mini games, not a mobile or website app. A website needs an ICP filing under the same organisation, each ability is applied for in the console and reviewed in 5 to 7 working days, and it comes with a default quota.

What it reads is the data of a Douyin user who authorises your app: scopes such as user_info, fans.data.bind and posting.behavior cover that user's own profile, fans and posts, and the fan list returns up to 5,000 fans. Its keyword search of videos (aweme.dy.video_search) is marked an experimental ability that is not open at present, with a daily average quota of 1,000 calls.

It is built for an app that signs people in with Douyin, works with their own account and helps them post. DataXAPI reads public Douyin data instead: videos by keyword, any account's profile and videos, and the comments under a video, by ID or link. There is no app to register or review, and no Douyin account of yours is used.

Read on 2026-10-29 in the platform's own documents:

- [Douyin Open Platform: joining as a developer](https://developer.open-douyin.com/docs/resource/zh-CN/developer/join/join-into-developer-platform)
- [Douyin Open Platform: publishing an app](https://developer.open-douyin.com/docs/resource/zh-CN/dop/develop/app-mgmt/pub-app)
- [Douyin Open Platform: applying for abilities](https://developer.open-douyin.com/docs/resource/zh-CN/dop/ability/common-solution)
- [Douyin Open Platform: fan list](https://developer.open-douyin.com/docs/resource/zh-CN/dop/develop/openapi/account-management/user-data/get-fans-list)
- [Douyin Open Platform: keyword search ability](https://developer.open-douyin.com/docs/resource/zh-CN/dop/ability/search-management/item-search)
- [Douyin Open Platform: video search](https://developer.open-douyin.com/docs/resource/zh-CN/dop/develop/openapi/douyin-search-capability/aweme-dy-video-search)
