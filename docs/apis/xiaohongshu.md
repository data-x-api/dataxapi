# Xiaohongshu (RedNote) API

33 endpoints read Xiaohongshu (RedNote): videos, notes, images, topics, users, comments, trends, keywords, PGY, Xiaohongshu Shop. From $0.0200 a call. No Xiaohongshu login and no cookie; a failed call is free.

> 33 endpoints. How to call, pay and handle errors is the same everywhere: https://dataxapi.com/llms.txt

Generated from catalog revision ceced48b38f71468, price book 30.

## xiaohongshu.images.search

Search Xiaohongshu pictures by terms, a page at a time; each result is one picture with the note it belongs to: the picture's address, the note's title, text, author, likes, comments, saves and shares. Shares are not given here (they always read 0, so they are left out); xiaohongshu.notes.get gives a note's shares. Up to 20 items a call; $0.0200 per call. Errors and timeouts are not charged.

- Name: Xiaohongshu (RedNote) image search API
- Request: `GET /v1/xiaohongshu/images/search`
- Parameters: `query` (required), `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/xiaohongshu/images/search.md

## xiaohongshu.notes.get

Get one Xiaohongshu note by ID or link: title, text, author, engagement counts, images. It also says whether it is a brand partnership note on record. One object a call; $0.0200 per call. Errors and timeouts are not charged.

- Name: Xiaohongshu (RedNote) note detail API
- Request: `GET /v1/xiaohongshu/notes/get`
- Parameters: `id`, `url`, `view`, `fields`; give exactly one of id, url
- Whole contract: https://dataxapi.com/apis/xiaohongshu/notes/get.md

## xiaohongshu.comments.replies.list

Get a page of replies to a Xiaohongshu comment, by the comment's ID and its note's ID: text, replier, likes, time posted, which comment it answers. About 5 items a call, 20 at most; $0.0200 per call. Errors and timeouts are not charged.

- Name: Xiaohongshu (RedNote) comment replies API
- Request: `GET /v1/xiaohongshu/comments/replies/list`
- Parameters: `id` (required), `post_id` (required), `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/xiaohongshu/comments/replies/list.md

## xiaohongshu.notes.comments.list

Get a page of top-level comments on a Xiaohongshu note by ID or link, newest first or hottest first: text, commenter, likes, reply count, time posted. About 10 items a call, 20 at most; $0.0200 per call. Errors, timeouts and objects that do not exist are not charged.

- Name: Xiaohongshu (RedNote) note comments API
- Request: `GET /v1/xiaohongshu/notes/comments/list`
- Parameters: `id`, `url`, `sort`, `cursor`, `view`, `fields`; give exactly one of id, url
- Whole contract: https://dataxapi.com/apis/xiaohongshu/notes/comments/list.md

## xiaohongshu.notes.search

Search Xiaohongshu notes by terms: title, text, author, engagement counts, images, and a link that opens. Each says whether it is a brand partnership note on record. By relevance, newest, most liked, most commented or most saved; video or image notes only; published in the last day, week or half year. Up to 20 items a call; $0.0200 per call. Errors and timeouts are not charged.

- Name: Xiaohongshu (RedNote) note search API
- Request: `GET /v1/xiaohongshu/notes/search`
- Parameters: `query` (required), `sort`, `type`, `published_within`, `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/xiaohongshu/notes/search.md

## xiaohongshu.pgy.keywords.history

Get a keyword's day-by-day search index on Xiaohongshu over about the last three months, from the platform's creator marketplace, with each day's notes about the keyword and how often they were shown, read and engaged with. The platform sets the period; it cannot be chosen. The search index is the platform's index, not a count of searches; days are calendar days in China time (UTC+8). One object a call; $0.0400 per call. Errors and timeouts are not charged.

- Name: Xiaohongshu (RedNote) PGY keyword search index API
- Request: `GET /v1/xiaohongshu/pgy/keywords/history`
- Parameters: `keyword` (required), `view`, `fields`
- Whole contract: https://dataxapi.com/apis/xiaohongshu/pgy/keywords/history.md

## xiaohongshu.pgy.keywords.related

Get what people search on Xiaohongshu before and after a keyword, from the platform's creator marketplace, each with its place by relevance, its search index, the notes about it and their reads: for expanding a seed keyword. The search index is the platform's index, not a count of searches; for a word the platform gives no figures for, these are null. About 98 items a call, 120 at most; $0.0400 per call. Errors and timeouts are not charged.

- Name: Xiaohongshu (RedNote) PGY related keywords API
- Request: `GET /v1/xiaohongshu/pgy/keywords/related`
- Parameters: `keyword` (required), `view`, `fields`
- Whole contract: https://dataxapi.com/apis/xiaohongshu/pgy/keywords/related.md

## xiaohongshu.topics.notes.list

Get the trending notes under a Xiaohongshu topic by its page ID: title, text, author, engagement counts, images, hashtags. Up to 10 items a call; $0.0200 per call. Errors and timeouts are not charged.

- Name: Xiaohongshu (RedNote) topic notes API
- Request: `GET /v1/xiaohongshu/topics/notes/list`
- Parameters: `id` (required), `view`, `fields`
- Whole contract: https://dataxapi.com/apis/xiaohongshu/topics/notes/list.md

## xiaohongshu.topics.get

Get one Xiaohongshu topic by its page ID: name, description, views, the discussion count the page shows, share link. One object a call; $0.0200 per call. Errors and timeouts are not charged.

- Name: Xiaohongshu (RedNote) topic detail API
- Request: `GET /v1/xiaohongshu/topics/get`
- Parameters: `id` (required), `view`, `fields`
- Whole contract: https://dataxapi.com/apis/xiaohongshu/topics/get.md

## xiaohongshu.trends.list

Get the hot topics Xiaohongshu suggests to creators: name and the platform's heat score. Up to 20 items a call; $0.0200 per call. Errors and timeouts are not charged.

- Name: Xiaohongshu (RedNote) trends API
- Request: `GET /v1/xiaohongshu/trends/list`
- Parameters: `board`, `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/xiaohongshu/trends/list.md

## xiaohongshu.users.get

Get a Xiaohongshu account by user ID or profile link: name, handle, bio, follower, following and note counts, verification, and the gender and region its profile shows. One object a call; $0.0200 per call. Errors, timeouts and objects that do not exist are not charged.

- Name: Xiaohongshu (RedNote) user profile API
- Request: `GET /v1/xiaohongshu/users/get`
- Parameters: `id`, `url`, `view`, `fields`; give exactly one of id, url
- Whole contract: https://dataxapi.com/apis/xiaohongshu/users/get.md

## xiaohongshu.users.notes.list

Get a page of the notes a Xiaohongshu account posted, by user ID or profile link: title, text, engagement counts, images, whether pinned. About 20 items a call, 30 at most; $0.0200 per call. Errors, timeouts and objects that do not exist are not charged.

- Name: Xiaohongshu (RedNote) user notes API
- Request: `GET /v1/xiaohongshu/users/notes/list`
- Parameters: `id`, `url`, `cursor`, `view`, `fields`; give exactly one of id, url
- Whole contract: https://dataxapi.com/apis/xiaohongshu/users/notes/list.md

## xiaohongshu.users.search

Search Xiaohongshu accounts by terms: user ID, handle, name, avatar, verification. Up to 20 items a call; $0.0200 per call. Errors and timeouts are not charged.

- Name: Xiaohongshu (RedNote) user search API
- Request: `GET /v1/xiaohongshu/users/search`
- Parameters: `query` (required), `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/xiaohongshu/users/search.md

## xiaohongshu.shop.products.get

Get a product of Xiaohongshu's shop by its ID: title, current and original price in yuan, pictures, rating, reviews, shop. What is seen is the product's page in the app's version for a region abroad (the region may differ from one call to the next): promotions and whether it can be bought may not be what a user in China sees. One object a call; $0.0200 per call. Errors and timeouts are not charged.

- Name: Xiaohongshu (RedNote) product detail API
- Request: `GET /v1/xiaohongshu/shop/products/get`
- Parameters: `id` (required), `view`, `fields`
- Whole contract: https://dataxapi.com/apis/xiaohongshu/shop/products/get.md

## xiaohongshu.shop.products.reviews.list

Get the first page of buyers' reviews of a product of Xiaohongshu's shop by the product's ID: text, rating, variant bought, pictures, likes. About 12 items a call, 20 at most; $0.0200 per call. Errors and timeouts are not charged.

- Name: Xiaohongshu (RedNote) product reviews API
- Request: `GET /v1/xiaohongshu/shop/products/reviews/list`
- Parameters: `id` (required), `view`, `fields`
- Whole contract: https://dataxapi.com/apis/xiaohongshu/shop/products/reviews/list.md

## xiaohongshu.shop.products.search

Search the products of Xiaohongshu's shop by terms: title, current and original price in yuan, units sold, picture, shop. What is seen is the shop of the app's version for a region abroad (the region may differ from one call to the next): promotions and whether an item can be bought may not be what a user in China sees. Up to 20 items a call; $0.0200 per call. Errors and timeouts are not charged.

- Name: Xiaohongshu (RedNote) product search API
- Request: `GET /v1/xiaohongshu/shop/products/search`
- Parameters: `query` (required), `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/xiaohongshu/shop/products/search.md

## xiaohongshu.pgy.creators.search

Find Xiaohongshu creators on PGY by search terms, by the filters of PGY's creator square, or both: followers, the price of a sponsored note, estimated CPM, median reads and interactions of everyday and sponsored notes, image or video creators, content category, content feature, persona, where they are, gender, followers' gender and age, industry worked with lately; leaving out the inactive and those losing followers; ordered by followers, price, reads, interactions, shop visits, cost per read, invitations answered, growth, completion and more. Each with creator ID, name, handle, location, content categories and followers, and in the full view prices and medians. A search goes as far as its first 5,000 creators. The creator ID the other PGY endpoints take comes from here. Up to 20 items a call; $0.0400 per call. Errors and timeouts are not charged.

- Name: Xiaohongshu (RedNote) PGY creator search API
- Request: `GET /v1/xiaohongshu/pgy/creators/search`
- Parameters: `query`, `sort`, `followers_min`, `followers_max`, `rate_min`, `rate_max`, `cpm_min`, `cpm_max`, `median_reads_min`, `median_engagements_min`, `sponsored_median_reads_min`, `type`, `category`, `feature_tag`, `persona`, `location`, `gender`, `audience_gender`, `audience_age`, `industry`, `exclude`, `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/xiaohongshu/pgy/creators/search.md

## xiaohongshu.pgy.creators.get

Get a Xiaohongshu creator's profile on PGY by creator ID: name, handle, location, content categories, followers, and in the full view what an image note and a video note cost, the least a note costs and whether each is open, sponsored notes in all and in the last 30 days, median reads and interactions, gender, content and persona tags, industries worked with, the agency (MCN) and likes and saves in all. One object a call; $0.0400 per call. Errors and timeouts are not charged.

- Name: Xiaohongshu (RedNote) PGY creator detail API
- Request: `GET /v1/xiaohongshu/pgy/creators/get`
- Parameters: `id` (required), `view`, `fields`
- Whole contract: https://dataxapi.com/apis/xiaohongshu/pgy/creators/get.md

## xiaohongshu.pgy.creators.audience.get

Get who follows a Xiaohongshu creator, by PGY creator ID: the share of each segment by gender, age, province, city, interest and device, and the day the figures are of. One object a call; $0.0400 per call. Errors and timeouts are not charged.

- Name: Xiaohongshu (RedNote) PGY creator audience profile API
- Request: `GET /v1/xiaohongshu/pgy/creators/audience/get`
- Parameters: `id` (required), `view`, `fields`
- Whole contract: https://dataxapi.com/apis/xiaohongshu/pgy/creators/audience/get.md

## xiaohongshu.pgy.creators.metrics

Get how a Xiaohongshu creator's everyday or sponsored notes did over the last 30 or 90 days, by PGY creator ID: notes and video notes, median impressions, reads, interactions and follows, engagement and completion ratios, the share of notes past 100 and 1,000 likes, the standing among comparable creators, and the share of impressions and reads from the explore feed, search, the following feed and other entry points. The full view adds each note's impressions, reads and interactions and how far each is above the median, and long-term notes (published about half a year back): their recent and long-term reads and where those came from. One object a call; $0.0400 per call. Errors and timeouts are not charged.

- Name: Xiaohongshu (RedNote) PGY creator metrics API
- Request: `GET /v1/xiaohongshu/pgy/creators/metrics`
- Parameters: `id` (required), `window`, `tab`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/xiaohongshu/pgy/creators/metrics.md

## xiaohongshu.pgy.creators.notes.list

Get a page of a Xiaohongshu creator's notes by PGY creator ID (PGY's note cases), with the figures PGY gives for each: reads, likes, saves, shop visitors, whether it was sponsored and for which brand, and whether paid promotion sent it traffic. Sponsored, cross-domain sponsored, image or video notes alone; newest, most read or most engaged first; by content feature or category; reads of organic traffic alone. Up to 8 items a call; $0.0400 per call. Errors and timeouts are not charged.

- Name: Xiaohongshu (RedNote) PGY creator notes API
- Request: `GET /v1/xiaohongshu/pgy/creators/notes/list`
- Parameters: `id` (required), `tab`, `type`, `sort`, `traffic`, `feature_tag`, `category`, `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/xiaohongshu/pgy/creators/notes/list.md

## xiaohongshu.keywords.related

Get the suggestions Xiaohongshu's search box lists as a keyword is typed into it (autocomplete), in the order it lists them, about 10 at a time. The words and their places only, with no index. About 10 items a call, 20 at most; $0.0200 per call. Errors and timeouts are not charged.

- Name: Xiaohongshu (RedNote) search suggestions API
- Request: `GET /v1/xiaohongshu/keywords/related`
- Parameters: `keyword` (required), `view`, `fields`
- Whole contract: https://dataxapi.com/apis/xiaohongshu/keywords/related.md

## xiaohongshu.videos.get

Get one Xiaohongshu video note by ID or link: title, text, author, engagement counts, plus the video file's address, its length, its cover, the Chinese subtitles the platform made (SRT, usable as a transcript) and whether it is a brand partnership note on record. Video notes only; an image note is the note detail's. One object a call; $0.0200 per call. Errors and timeouts are not charged.

- Name: Xiaohongshu (RedNote) video note with its video and subtitles API
- Request: `GET /v1/xiaohongshu/videos/get`
- Parameters: `id`, `url`, `view`, `fields`; give exactly one of id, url
- Whole contract: https://dataxapi.com/apis/xiaohongshu/videos/get.md

## xiaohongshu.videos.transcript.get

Give a Xiaohongshu video note's link, share text or ID and get what is said in it: the whole text, each sentence with its start and end time, and ready SRT subtitles, with the title, author and length; the platform's own subtitles where it made them, the speech recognised where it did not, and speakers can be told apart. Charged a call, plus by the minute of video when its speech is recognised (not when the platform's subtitles are used); nothing when nobody speaks. A video of up to 5 minutes comes back as text; one over 5 minutes and up to 2 hours is answered at once with a job: call again with it a little later for the text, charged by its actual minutes and only when the text is delivered. One object a call; $0.0200 a call, plus $0.0038 a minute when the speech is recognised (a part minute counts as one); none when the platform's own captions are used; at most $0.0390 a call for a video of up to 5 minutes, a longer one, up to 2 hours, by its actual minutes. Errors, timeouts and objects that do not exist are not charged.

- Name: Xiaohongshu (RedNote) video transcript (video to text) API
- Request: `GET /v1/xiaohongshu/videos/transcript/get`
- Parameters: `id`, `url`, `speakers`, `job`, `view`, `fields`; give exactly one of id, url, job
- Whole contract: https://dataxapi.com/apis/xiaohongshu/videos/transcript/get.md

## xiaohongshu.pgy.creators.followers.history

Get a Xiaohongshu creator's follower count for each of the last 30 or 60 days, by PGY creator ID, with the net gain over the period and that gain as a share. Shows whether a creator is growing, or lost or bought followers all at once. One object a call; $0.0400 per call. Errors and timeouts are not charged.

- Name: Xiaohongshu (RedNote) PGY creator follower history API
- Request: `GET /v1/xiaohongshu/pgy/creators/followers/history`
- Parameters: `id` (required), `window`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/xiaohongshu/pgy/creators/followers/history.md

## xiaohongshu.pgy.creators.related

Give a PGY creator ID and get the Xiaohongshu creators PGY recommends as similar: creator ID, name, handle, location, content categories, followers, and in the full view what a note with them costs and median reads and interactions. Four a call (PGY shows four a page), usually a handful to a few dozen in all, page by page. Up to 4 items a call; $0.0400 per call. Errors and timeouts are not charged.

- Name: Xiaohongshu (RedNote) PGY similar creators API
- Request: `GET /v1/xiaohongshu/pgy/creators/related`
- Parameters: `id` (required), `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/xiaohongshu/pgy/creators/related.md

## xiaohongshu.pgy.notes.trending

Get the trending notes of PGY's content square: eight boards such as Xiaohongshu hot, product seeding, e-commerce promotion and PGY sponsored, the whole board or the notes about some words, over the last 3, 7, 14 or 30 days, image or video notes only if wanted. Each note with its title, time published, reads, likes, saves, comments and pictures, and the creator's ID, name and followers. No ID needed: a way to find what is working and what to post about. Up to 34 items a call; $0.0400 per call. Errors and timeouts are not charged.

- Name: Xiaohongshu (RedNote) PGY trending notes API
- Request: `GET /v1/xiaohongshu/pgy/notes/trending`
- Parameters: `board`, `query`, `window`, `type`, `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/xiaohongshu/pgy/notes/trending.md

## xiaohongshu.pgy.creators.costs.metrics

Get what a Xiaohongshu creator is expected to cost, by PGY creator ID: the estimated CPM, cost per interaction, cost per read and cost per shop visitor of an image note and of a video note, each with the share of comparable creators it beats; the median impressions, reads, interactions and shop visitors of a note, follower growth and notes published over 30 days, the share of invitations answered within 48 hours and the "easy to reach" mark, active days of the last 7 and the "active" mark, the strength PGY marks, the content mix and the industries worked with. Of everyday or of sponsored notes. One object a call; $0.0400 per call. Errors and timeouts are not charged.

- Name: Xiaohongshu (RedNote) PGY creator costs and data summary API
- Request: `GET /v1/xiaohongshu/pgy/creators/costs/metrics`
- Parameters: `id` (required), `tab`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/xiaohongshu/pgy/creators/costs/metrics.md

## xiaohongshu.pgy.creators.followers.metrics

Get how much a Xiaohongshu creator's followers are worth, by PGY creator ID: followers and the net gain over 30 days, how many are active, engaged, reading and buying, each as a share of all followers and against comparable creators. Shows whether the followers really read and buy. One object a call; $0.0400 per call. Errors and timeouts are not charged.

- Name: Xiaohongshu (RedNote) PGY creator follower summary API
- Request: `GET /v1/xiaohongshu/pgy/creators/followers/metrics`
- Parameters: `id` (required), `view`, `fields`
- Whole contract: https://dataxapi.com/apis/xiaohongshu/pgy/creators/followers/metrics.md

## xiaohongshu.pgy.creators.costs.history

Get a Xiaohongshu creator's core figures for each of the last 30 or 90 days, by PGY creator ID: CPM, CPE (cost per interaction), CPV (cost per read), cost per shop visitor, and the median impressions, reads, interactions and shop visitors of a note, with the same figures for the whole period. Of everyday or of sponsored notes: shows whether a creator is getting better or worse value. One object a call; $0.0400 per call. Errors and timeouts are not charged.

- Name: Xiaohongshu (RedNote) PGY creator core figures history API
- Request: `GET /v1/xiaohongshu/pgy/creators/costs/history`
- Parameters: `id` (required), `window`, `tab`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/xiaohongshu/pgy/creators/costs/history.md

## xiaohongshu.pgy.notes.get

Get the figures PGY shows a brand for one Xiaohongshu note, by note ID: impressions, reads, likes, saves, comments, shares and the follows it brought, the brand it was reported for, the click-through band of the brand's components (comment area, text, bottom), and its title, text, pictures, time published and creator ID. For closing a sponsored note's campaign and checking what a creator delivered. PGY keeps figures for its creators' notes only; a note it has none for (such as a brand's own) is a 404. One object a call; $0.0400 per call. Errors and timeouts are not charged.

- Name: Xiaohongshu (RedNote) PGY note metrics API
- Request: `GET /v1/xiaohongshu/pgy/notes/get`
- Parameters: `id` (required), `view`, `fields`
- Whole contract: https://dataxapi.com/apis/xiaohongshu/pgy/notes/get.md

## xiaohongshu.notes.media.get

Give a RedNote (Xiaohongshu) image note by ID, link or share text and get each picture's address without watermark, at the largest size the platform keeps, with its width, height and format, and for a live photo the address of its video. The addresses need no headers; once they expire, another call gives new ones. Image notes only; a video note's files are xiaohongshu.videos.media.get's. One object a call; $0.0200 per call. Errors and timeouts are not charged.

- Name: RedNote (Xiaohongshu) image downloader, originals and live photos API
- Request: `GET /v1/xiaohongshu/notes/media/get`
- Parameters: `id`, `url`, `view`, `fields`; give exactly one of id, url
- Whole contract: https://dataxapi.com/apis/xiaohongshu/notes/media/get.md

## xiaohongshu.videos.media.get

Give a RedNote (Xiaohongshu) video note by ID, link or share text and get the address of every file of its video, without watermark: each quality in each codec (H.264, H.265 and the like) with its width, height, bit rate and size and backup addresses, the cover, and the subtitle files the platform made (SRT, by language). The addresses need no headers; once one stops working, another call gives new ones. Video notes only; an image note's pictures are xiaohongshu.notes.media.get's. One object a call; $0.0200 per call. Errors and timeouts are not charged.

- Name: RedNote (Xiaohongshu) video downloader API
- Request: `GET /v1/xiaohongshu/videos/media/get`
- Parameters: `id`, `url`, `view`, `fields`; give exactly one of id, url
- Whole contract: https://dataxapi.com/apis/xiaohongshu/videos/media/get.md

## How this differs from Xiaohongshu's official open platform

Xiaohongshu's open platform is for e-commerce: its documents cover orders, after-sales, products, inventory, logistics and finance, and none covers notes, comments or search. An app needs a qualification review first; a merchant's own app is bound to the shop's main account, the shop may not be an individual's, and only the shop's main account can authorise it. A new service provider gets 100 calls a second per app and 200 per method by default.

Its commercial open platform, for ads and the PGY creator marketplace, asks for a business licence number and a verified company admin. As its own page text puts it, the PGY API is open to clients with annual spend over 5 million yuan, for creators' rates and post-campaign data.

It is built for running a shop or ad accounts. DataXAPI reads Xiaohongshu's public notes, comments and accounts by keyword, ID or link, and PGY creators' rates, audiences and figures, with no app review, no shop and no Xiaohongshu account of yours.

Read on 2026-10-29 in the platform's own documents:

- [Xiaohongshu Open Platform: document list](https://open.xiaohongshu.com/api/doc/listNew)
- [Xiaohongshu commercial open platform](https://ad-market.xiaohongshu.com/)
