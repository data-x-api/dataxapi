# Bilibili API

8 endpoints read Bilibili: videos, users, comments, trends. From $0.0020 a call. No Bilibili login and no cookie; a failed call is free.

> 8 endpoints. How to call, pay and handle errors is the same everywhere: https://dataxapi.com/llms.txt

Generated from catalog revision c48ce454ae6c4c65, price book 2.

## bilibili.comments.replies.list

Get a page of replies to a Bilibili comment, by the comment's ID and its video's BV number: text, replier, likes, what it answers, time posted. Up to 20 items a call; $0.0020 per call. Errors, timeouts and objects that do not exist are not charged; an empty result is charged $0.0020.

- Name: Bilibili comment replies API
- Request: `GET /v1/bilibili/comments/replies/list`
- Parameters: `id` (required), `post_id` (required), `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/bilibili/comments/replies/list.md

## bilibili.trends.list

Get Bilibili's current hot search terms, up to 50, with rank and heat. Up to 50 items a call; $0.0020 per call. Errors and timeouts are not charged; an empty result is charged $0.0020.

- Name: Bilibili hot searches API
- Request: `GET /v1/bilibili/trends/list`
- Parameters: `board`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/bilibili/trends/list.md

## bilibili.users.get

Get a Bilibili user's profile by user number: name, bio, avatar, verification, follower and following counts, number of videos. One object a call; $0.0020 per call. Errors, timeouts and objects that do not exist are not charged.

- Name: Bilibili user profile API
- Request: `GET /v1/bilibili/users/get`
- Parameters: `id` (required), `view`, `fields`
- Whole contract: https://dataxapi.com/apis/bilibili/users/get.md

## bilibili.users.videos.list

Get a page of the videos a Bilibili user uploaded, newest first: title, description, views, comments, danmaku count, length, time published. Up to 30 items a call; $0.0020 per call. Errors and timeouts are not charged; an empty result is charged $0.0020.

- Name: Bilibili user videos API
- Request: `GET /v1/bilibili/users/videos/list`
- Parameters: `id` (required), `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/bilibili/users/videos/list.md

## bilibili.videos.comments.list

Get a page of comments on a Bilibili video by BV number, most liked first: text, commenter, likes, reply count, time posted. Up to 20 items a call; $0.0020 per call. Errors, timeouts and objects that do not exist are not charged; an empty result is charged $0.0020.

- Name: Bilibili video comments API
- Request: `GET /v1/bilibili/videos/comments/list`
- Parameters: `id` (required), `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/bilibili/videos/comments/list.md

## bilibili.videos.get

Get one Bilibili video by BV number or link: title, description, uploader, views, likes, coins, saves, danmaku count, length. One object a call; $0.0020 per call. Errors, timeouts and objects that do not exist are not charged.

- Name: Bilibili video detail API
- Request: `GET /v1/bilibili/videos/get`
- Parameters: `id`, `url`, `view`, `fields`; give exactly one of id, url
- Whole contract: https://dataxapi.com/apis/bilibili/videos/get.md

## bilibili.videos.search

Get a page of Bilibili videos for search terms, by relevance, newest or most played: title, uploader, views, likes, saves, comments, length. Up to 20 items a call; $0.0020 per call. Errors and timeouts are not charged; an empty result is charged $0.0020.

- Name: Bilibili video search API
- Request: `GET /v1/bilibili/videos/search`
- Parameters: `query` (required), `sort`, `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/bilibili/videos/search.md

## bilibili.videos.trending

Get a page of Bilibili's popular videos: title, description, uploader, views, likes, coins, saves, danmaku count, length. Up to 20 items a call; $0.0020 per call. Errors and timeouts are not charged; an empty result is charged $0.0020.

- Name: Bilibili popular videos API
- Request: `GET /v1/bilibili/videos/trending`
- Parameters: `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/bilibili/videos/trending.md
