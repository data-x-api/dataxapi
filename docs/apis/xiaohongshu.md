# Xiaohongshu (RedNote) API

21 endpoints read Xiaohongshu (RedNote): notes, images, topics, users, comments, trends, PGY, Xiaohongshu Shop. From $0.0200 a call. No Xiaohongshu login and no cookie; a failed call is free.

> 21 endpoints. How to call, pay and handle errors is the same everywhere: https://dataxapi.com/llms.txt

Generated from catalog revision c48ce454ae6c4c65, price book 2.

## xiaohongshu.images.search

Search Xiaohongshu pictures by terms, a page at a time; each result is one picture with the note it belongs to: the picture's address, the note's title, text, author, likes, comments, saves and shares. Up to 20 items a call; $0.0200 per call. Errors and timeouts are not charged; an empty result is charged $0.0200.

- Name: Xiaohongshu (RedNote) image search API
- Request: `GET /v1/xiaohongshu/images/search`
- Parameters: `query` (required), `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/xiaohongshu/images/search.md

## xiaohongshu.notes.get

Get one Xiaohongshu note by ID or link: title, text, author, engagement counts, images. One object a call; $0.0200 per call. Errors, timeouts and objects that do not exist are not charged.

- Name: Xiaohongshu (RedNote) note detail API
- Request: `GET /v1/xiaohongshu/notes/get`
- Parameters: `id`, `url`, `view`, `fields`; give exactly one of id, url
- Whole contract: https://dataxapi.com/apis/xiaohongshu/notes/get.md

## xiaohongshu.comments.replies.list

Get a page of replies to a Xiaohongshu comment, by the comment's ID and its note's ID: text, replier, likes, time posted, which comment it answers. About 5 items a call, 20 at most; $0.0200 per call. Errors and timeouts are not charged; an empty result is charged $0.0200.

- Name: Xiaohongshu (RedNote) comment replies API
- Request: `GET /v1/xiaohongshu/comments/replies/list`
- Parameters: `id` (required), `post_id` (required), `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/xiaohongshu/comments/replies/list.md

## xiaohongshu.notes.comments.list

Get a page of top-level comments on a Xiaohongshu note by ID or link, newest first: text, commenter, likes, reply count, time posted. About 10 items a call, 20 at most; $0.0200 per call. Errors, timeouts and objects that do not exist are not charged; an empty result is charged $0.0200.

- Name: Xiaohongshu (RedNote) note comments API
- Request: `GET /v1/xiaohongshu/notes/comments/list`
- Parameters: `id`, `url`, `cursor`, `view`, `fields`; give exactly one of id, url
- Whole contract: https://dataxapi.com/apis/xiaohongshu/notes/comments/list.md

## xiaohongshu.notes.search

Search Xiaohongshu notes by terms: title, text, author, engagement counts, images, and a link that opens. Up to 20 items a call; $0.0200 per call. Errors and timeouts are not charged; an empty result is charged $0.0200.

- Name: Xiaohongshu (RedNote) note search API
- Request: `GET /v1/xiaohongshu/notes/search`
- Parameters: `query` (required), `sort`, `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/xiaohongshu/notes/search.md

## xiaohongshu.pgy.keywords.history

Get a keyword's day-by-day search index on Xiaohongshu over about the last three months, from the platform's creator marketplace, with each day's notes about the keyword and how often they were shown, read and engaged with. The platform sets the period; it cannot be chosen. The search index is the platform's index, not a count of searches; days are calendar days in China time (UTC+8). One object a call; $0.0400 per call. Errors, timeouts and objects that do not exist are not charged.

- Name: Xiaohongshu (RedNote) PGY keyword search index API
- Request: `GET /v1/xiaohongshu/pgy/keywords/history`
- Parameters: `keyword` (required), `view`, `fields`
- Whole contract: https://dataxapi.com/apis/xiaohongshu/pgy/keywords/history.md

## xiaohongshu.pgy.keywords.related

Get what people search on Xiaohongshu before and after a keyword, from the platform's creator marketplace, each with its place by relevance, its search index, the notes about it and their reads: for expanding a seed keyword. The search index is the platform's index, not a count of searches; for a word the platform gives no figures for, these are null. About 98 items a call, 120 at most; $0.0400 per call. Errors and timeouts are not charged; an empty result is charged $0.0400.

- Name: Xiaohongshu (RedNote) PGY related keywords API
- Request: `GET /v1/xiaohongshu/pgy/keywords/related`
- Parameters: `keyword` (required), `view`, `fields`
- Whole contract: https://dataxapi.com/apis/xiaohongshu/pgy/keywords/related.md

## xiaohongshu.topics.notes.list

Get the trending notes under a Xiaohongshu topic by its page ID: title, text, author, engagement counts, images, hashtags. Up to 10 items a call; $0.0200 per call. Errors and timeouts are not charged; an empty result is charged $0.0200.

- Name: Xiaohongshu (RedNote) topic notes API
- Request: `GET /v1/xiaohongshu/topics/notes/list`
- Parameters: `id` (required), `view`, `fields`
- Whole contract: https://dataxapi.com/apis/xiaohongshu/topics/notes/list.md

## xiaohongshu.topics.get

Get one Xiaohongshu topic by its page ID: name, description, views, the discussion count the page shows, share link. One object a call; $0.0200 per call. Errors, timeouts and objects that do not exist are not charged.

- Name: Xiaohongshu (RedNote) topic detail API
- Request: `GET /v1/xiaohongshu/topics/get`
- Parameters: `id` (required), `view`, `fields`
- Whole contract: https://dataxapi.com/apis/xiaohongshu/topics/get.md

## xiaohongshu.trends.list

Get the hot topics Xiaohongshu suggests to creators: name and the platform's heat score. Up to 20 items a call; $0.0200 per call. Errors and timeouts are not charged; an empty result is charged $0.0200.

- Name: Xiaohongshu (RedNote) trends API
- Request: `GET /v1/xiaohongshu/trends/list`
- Parameters: `board`, `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/xiaohongshu/trends/list.md

## xiaohongshu.users.get

Get a Xiaohongshu account by user ID or profile link: name, handle, bio, follower, following and note counts, verification. One object a call; $0.0200 per call. Errors, timeouts and objects that do not exist are not charged.

- Name: Xiaohongshu (RedNote) user profile API
- Request: `GET /v1/xiaohongshu/users/get`
- Parameters: `id`, `url`, `view`, `fields`; give exactly one of id, url
- Whole contract: https://dataxapi.com/apis/xiaohongshu/users/get.md

## xiaohongshu.users.notes.list

Get a page of the notes a Xiaohongshu account posted, by user ID or profile link: title, text, engagement counts, images, whether pinned. About 20 items a call, 30 at most; $0.0200 per call. Errors, timeouts and objects that do not exist are not charged; an empty result is charged $0.0200.

- Name: Xiaohongshu (RedNote) user notes API
- Request: `GET /v1/xiaohongshu/users/notes/list`
- Parameters: `id`, `url`, `cursor`, `view`, `fields`; give exactly one of id, url
- Whole contract: https://dataxapi.com/apis/xiaohongshu/users/notes/list.md

## xiaohongshu.users.search

Search Xiaohongshu accounts by terms: user ID, handle, name, avatar, verification. Up to 20 items a call; $0.0200 per call. Errors and timeouts are not charged; an empty result is charged $0.0200.

- Name: Xiaohongshu (RedNote) user search API
- Request: `GET /v1/xiaohongshu/users/search`
- Parameters: `query` (required), `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/xiaohongshu/users/search.md

## xiaohongshu.shop.products.get

Get a product of Xiaohongshu's shop by its ID: title, current and original price in yuan, pictures, rating, reviews, shop. One object a call; $0.0200 per call. Errors, timeouts and objects that do not exist are not charged.

- Name: Xiaohongshu (RedNote) product detail API
- Request: `GET /v1/xiaohongshu/shop/products/get`
- Parameters: `id` (required), `view`, `fields`
- Whole contract: https://dataxapi.com/apis/xiaohongshu/shop/products/get.md

## xiaohongshu.shop.products.reviews.list

Get the first page of buyers' reviews of a product of Xiaohongshu's shop by the product's ID: text, rating, variant bought, pictures, likes. About 12 items a call, 20 at most; $0.0200 per call. Errors and timeouts are not charged; an empty result is charged $0.0200.

- Name: Xiaohongshu (RedNote) product reviews API
- Request: `GET /v1/xiaohongshu/shop/products/reviews/list`
- Parameters: `id` (required), `view`, `fields`
- Whole contract: https://dataxapi.com/apis/xiaohongshu/shop/products/reviews/list.md

## xiaohongshu.shop.products.search

Search the products of Xiaohongshu's shop by terms: title, current and original price in yuan, units sold, picture, shop. Up to 20 items a call; $0.0200 per call. Errors and timeouts are not charged; an empty result is charged $0.0200.

- Name: Xiaohongshu (RedNote) product search API
- Request: `GET /v1/xiaohongshu/shop/products/search`
- Parameters: `query` (required), `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/xiaohongshu/shop/products/search.md

## xiaohongshu.pgy.creators.search

Search Xiaohongshu creators on PGY by terms, matched against what they write about: creator ID, name, handle, location, content categories, followers, and in the full view what an image note and a video note cost and median reads and interactions. The creator ID the other PGY endpoints take comes from here. Up to 20 items a call; $0.0400 per call. Errors and timeouts are not charged; an empty result is charged $0.0400.

- Name: Xiaohongshu (RedNote) PGY creator search API
- Request: `GET /v1/xiaohongshu/pgy/creators/search`
- Parameters: `query` (required), `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/xiaohongshu/pgy/creators/search.md

## xiaohongshu.pgy.creators.get

Get a Xiaohongshu creator's profile on PGY by creator ID: name, handle, location, content categories, followers, and in the full view what an image note and a video note cost, the number of sponsored notes and median reads and interactions. One object a call; $0.0400 per call. Errors, timeouts and objects that do not exist are not charged.

- Name: Xiaohongshu (RedNote) PGY creator detail API
- Request: `GET /v1/xiaohongshu/pgy/creators/get`
- Parameters: `id` (required), `view`, `fields`
- Whole contract: https://dataxapi.com/apis/xiaohongshu/pgy/creators/get.md

## xiaohongshu.pgy.creators.audience.get

Get who follows a Xiaohongshu creator, by PGY creator ID: the share of each segment by gender, age, province, city, interest and device, and the day the figures are of. One object a call; $0.0400 per call. Errors, timeouts and objects that do not exist are not charged.

- Name: Xiaohongshu (RedNote) PGY creator audience profile API
- Request: `GET /v1/xiaohongshu/pgy/creators/audience/get`
- Parameters: `id` (required), `view`, `fields`
- Whole contract: https://dataxapi.com/apis/xiaohongshu/pgy/creators/audience/get.md

## xiaohongshu.pgy.creators.metrics

Get how a Xiaohongshu creator's everyday notes did over the last 30 or 90 days, by PGY creator ID: notes, median impressions, reads and interactions, engagement and completion ratios, the share of notes past 100 and 1,000 likes, and the standing among comparable creators. One object a call; $0.0400 per call. Errors, timeouts and objects that do not exist are not charged.

- Name: Xiaohongshu (RedNote) PGY creator metrics API
- Request: `GET /v1/xiaohongshu/pgy/creators/metrics`
- Parameters: `id` (required), `window`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/xiaohongshu/pgy/creators/metrics.md

## xiaohongshu.pgy.creators.notes.list

Get a page of a Xiaohongshu creator's notes by PGY creator ID, newest first, with the figures PGY gives for each: reads, likes, saves, whether it was sponsored and for which brand. Up to 8 items a call; $0.0400 per call. Errors and timeouts are not charged; an empty result is charged $0.0400.

- Name: Xiaohongshu (RedNote) PGY creator notes API
- Request: `GET /v1/xiaohongshu/pgy/creators/notes/list`
- Parameters: `id` (required), `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/xiaohongshu/pgy/creators/notes/list.md
