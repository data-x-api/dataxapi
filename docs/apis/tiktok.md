# TikTok API

18 endpoints read TikTok: videos, hashtags, users, comments, ad library, Creative Center, TikTok Shop. From $0.0020 a call. No TikTok login and no cookie; a failed call is free.

> 18 endpoints. How to call, pay and handle errors is the same everywhere: https://dataxapi.com/llms.txt

Generated from catalog revision c48ce454ae6c4c65, price book 2.

## tiktok.ads.search

Search TikTok's public Ads Library (ads shown in Europe) by keyword: advertiser, headline, videos and images, when each was first and last shown, and a bracket of people reached; newest first, 12 ads a page. This is the transparency record of ads, a different set from the Creative Center's Top Ads. Up to 12 items a call; $0.0020 per call. Errors and timeouts are not charged; an empty result is charged $0.0020.

- Name: TikTok Ads Library search API
- Request: `GET /v1/tiktok/ads/search`
- Parameters: `query` (required), `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/tiktok/ads/search.md

## tiktok.ads.get

Get one ad of TikTok's public Ads Library by its ID or link: advertiser, headline, videos and images, landing page, when it was first and last shown, the countries it was shown in and the campaign's objective. One object a call; $0.0020 per call. Errors, timeouts and objects that do not exist are not charged.

- Name: TikTok Ads Library ad detail API
- Request: `GET /v1/tiktok/ads/get`
- Parameters: `id`, `url`, `view`, `fields`; give exactly one of id, url
- Whole contract: https://dataxapi.com/apis/tiktok/ads/get.md

## tiktok.comments.replies.list

Get a page of the replies to a TikTok comment, by the comment's ID and its video's ID, 20 a page: text, replier, likes, time posted, which reply it answers. Up to 20 items a call; $0.0020 per call. Errors and timeouts are not charged; an empty result is charged $0.0020.

- Name: TikTok comment replies API
- Request: `GET /v1/tiktok/comments/replies/list`
- Parameters: `id` (required), `post_id` (required), `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/tiktok/comments/replies/list.md

## tiktok.creative_center.ads.get

Get one Top Ad of TikTok's Creative Center by its ID: the ad's video, caption, brand name, landing page, likes, comments, shares, length, campaign objective and the countries it ran in. One object a call; $0.0020 per call. Errors, timeouts and objects that do not exist are not charged.

- Name: TikTok Creative Center Top Ad detail API
- Request: `GET /v1/tiktok/creative_center/ads/get`
- Parameters: `id` (required), `view`, `fields`
- Whole contract: https://dataxapi.com/apis/tiktok/creative_center/ads/get.md

## tiktok.creative_center.ads.search

Search the Top Ads of TikTok's Creative Center by keyword: the ad's video, caption, brand name, likes, length and campaign objective; one country at a time, over a chosen period, in the Creative Center's own order or by likes. 20 ads a page. This is a showcase of ads that did well, not an ad library: it has no dates. Up to 20 items a call; $0.0020 per call. Errors and timeouts are not charged; an empty result is charged $0.0020.

- Name: TikTok Creative Center Top Ads search API
- Request: `GET /v1/tiktok/creative_center/ads/search`
- Parameters: `query` (required), `region`, `window`, `sort`, `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/tiktok/creative_center/ads/search.md

## tiktok.hashtags.videos.list

Get a page of the TikTok videos under a hashtag, by its name, about 20 a page: caption, author, engagement counts, cover and play address. Up to 20 items a call; $0.0020 per call. Errors, timeouts and objects that do not exist are not charged; an empty result is charged $0.0020.

- Name: TikTok hashtag videos API
- Request: `GET /v1/tiktok/hashtags/videos/list`
- Parameters: `id` (required), `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/tiktok/hashtags/videos/list.md

## tiktok.users.get

Get a TikTok user's profile by handle or ID: name, bio, follower, following and video counts, likes received, verification. One object a call; $0.0020 per call. Errors, timeouts and objects that do not exist are not charged.

- Name: TikTok user profile API
- Request: `GET /v1/tiktok/users/get`
- Parameters: `id`, `username`, `view`, `fields`; give exactly one of id, username
- Whole contract: https://dataxapi.com/apis/tiktok/users/get.md

## tiktok.users.search

Search TikTok accounts by keyword, 30 a page: handle, name, follower, following and video counts, likes received. Up to 30 items a call; $0.0020 per call. Errors and timeouts are not charged; an empty result is charged $0.0020.

- Name: TikTok user search API
- Request: `GET /v1/tiktok/users/search`
- Parameters: `query` (required), `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/tiktok/users/search.md

## tiktok.users.videos.list

Get a page of the videos a TikTok user posted, by handle, 10 a page: caption, engagement counts, time posted, cover and play address; newest or most popular first. Up to 10 items a call; $0.0020 per call. Errors, timeouts and objects that do not exist are not charged; an empty result is charged $0.0020.

- Name: TikTok user videos API
- Request: `GET /v1/tiktok/users/videos/list`
- Parameters: `username` (required), `sort`, `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/tiktok/users/videos/list.md

## tiktok.videos.comments.list

Get a page of comments on a TikTok video by ID or link, 50 a page: text, commenter, likes, reply count, time posted. Up to 50 items a call; $0.0020 per call. Errors and timeouts are not charged; an empty result is charged $0.0020.

- Name: TikTok video comments API
- Request: `GET /v1/tiktok/videos/comments/list`
- Parameters: `id`, `url`, `cursor`, `view`, `fields`; give exactly one of id, url
- Whole contract: https://dataxapi.com/apis/tiktok/videos/comments/list.md

## tiktok.videos.get

Get one TikTok video by ID or link: caption, author, like, comment, share, favorite and play counts, cover and play address. One object a call; $0.0020 per call. Errors, timeouts and objects that do not exist are not charged.

- Name: TikTok video detail API
- Request: `GET /v1/tiktok/videos/get`
- Parameters: `id`, `url`, `view`, `fields`; give exactly one of id, url
- Whole contract: https://dataxapi.com/apis/tiktok/videos/get.md

## tiktok.videos.search

Search TikTok videos by keyword, 30 a page; sort by relevance, likes or time posted, and limit how recently they were posted. Up to 30 items a call; $0.0020 per call. Errors and timeouts are not charged; an empty result is charged $0.0020.

- Name: TikTok video search API
- Request: `GET /v1/tiktok/videos/search`
- Parameters: `query` (required), `sort`, `published_within`, `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/tiktok/videos/search.md

## tiktok.videos.transcript.get

Get what is said in a TikTok video by ID or link: the whole text and timed segments. One object a call; $0.0020 per call. Errors, timeouts and objects that do not exist are not charged.

- Name: TikTok video transcript API
- Request: `GET /v1/tiktok/videos/transcript/get`
- Parameters: `id`, `url`, `view`, `fields`; give exactly one of id, url
- Whole contract: https://dataxapi.com/apis/tiktok/videos/transcript/get.md

## tiktok.shop.products.get

Get a TikTok Shop product in the United States by its ID: title, description, pictures, rating, reviews, units sold, shop; its price comes from the product search. One object a call; $0.0020 per call. Errors, timeouts and objects that do not exist are not charged.

- Name: TikTok Shop product detail API
- Request: `GET /v1/tiktok/shop/products/get`
- Parameters: `id` (required), `view`, `fields`
- Whole contract: https://dataxapi.com/apis/tiktok/shop/products/get.md

## tiktok.shop.products.reviews.list

Get the first 10 buyers' reviews of a TikTok Shop product in the United States by the product's ID: text, rating, time, variant bought, pictures. Up to 10 items a call; $0.0020 per call. Errors and timeouts are not charged; an empty result is charged $0.0020.

- Name: TikTok Shop product reviews API
- Request: `GET /v1/tiktok/shop/products/reviews/list`
- Parameters: `id` (required), `view`, `fields`
- Whole contract: https://dataxapi.com/apis/tiktok/shop/products/reviews/list.md

## tiktok.shop.products.search

Search the products of TikTok Shop in the United States by terms: title, current and original price, rating, units sold, shop. About 48 items a call, 60 at most; $0.0020 per call. Errors and timeouts are not charged; an empty result is charged $0.0020.

- Name: TikTok Shop product search API
- Request: `GET /v1/tiktok/shop/products/search`
- Parameters: `query` (required), `view`, `fields`
- Whole contract: https://dataxapi.com/apis/tiktok/shop/products/search.md

## tiktok.shop.sellers.products.list

Get a page of the products a TikTok Shop seller in the United States has on sale by the seller's ID: title, current and original price, rating, reviews, units sold. Up to 20 items a call; $0.0020 per call. Errors, timeouts and objects that do not exist are not charged; an empty result is charged $0.0020.

- Name: TikTok Shop seller products API
- Request: `GET /v1/tiktok/shop/sellers/products/list`
- Parameters: `id` (required), `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/tiktok/shop/sellers/products/list.md

## tiktok.users.followers.list

Get a page of the accounts following a TikTok user, by handle, 50 a page, newest followers first: handle, name, bio, follower, following and video counts, likes received. Up to 50 items a call; $0.0020 per call. Errors, timeouts and objects that do not exist are not charged; an empty result is charged $0.0020.

- Name: TikTok user followers API
- Request: `GET /v1/tiktok/users/followers/list`
- Parameters: `username` (required), `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/tiktok/users/followers/list.md
