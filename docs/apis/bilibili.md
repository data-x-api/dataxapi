# Bilibili API

9 endpoints read Bilibili: videos, users, comments, trends. From $0.0020 a call. No Bilibili login and no cookie; a failed call is free.

> 9 endpoints. How to call, pay and handle errors is the same everywhere: https://dataxapi.com/llms.txt

Generated from catalog revision 720fc3ea8dadb865, price book 19.

## bilibili.comments.replies.list

Get a page of replies to a Bilibili comment, by the comment's ID and its video's BV number: text, replier, likes, what it answers, time posted. Up to 20 items a call; $0.0020 per call. Errors and timeouts are not charged.

- Name: Bilibili comment replies API
- Request: `GET /v1/bilibili/comments/replies/list`
- Parameters: `id` (required), `post_id` (required), `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/bilibili/comments/replies/list.md

## bilibili.trends.list

Get Bilibili's current hot search terms, up to 50, with rank, heat and the words the list shows for each. Up to 50 items a call; $0.0020 per call. Errors and timeouts are not charged.

- Name: Bilibili hot searches API
- Request: `GET /v1/bilibili/trends/list`
- Parameters: `board`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/bilibili/trends/list.md

## bilibili.users.get

Get a Bilibili user's profile by user number: name, bio, avatar, verification and what it says, follower and following counts, number of videos, likes received in all, account level, live room link. One object a call; $0.0020 per call. Errors and timeouts are not charged.

- Name: Bilibili user profile API
- Request: `GET /v1/bilibili/users/get`
- Parameters: `id` (required), `view`, `fields`
- Whole contract: https://dataxapi.com/apis/bilibili/users/get.md

## bilibili.users.videos.list

Get a page of the videos a Bilibili user uploaded, newest first: title, description, views, comments, danmaku count, length, time published. Up to 30 items a call; $0.0020 per call. Errors and timeouts are not charged.

- Name: Bilibili user videos API
- Request: `GET /v1/bilibili/users/videos/list`
- Parameters: `id` (required), `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/bilibili/users/videos/list.md

## bilibili.videos.comments.list

Get a page of comments on a Bilibili video by BV number, top or newest first: text, commenter and their level, likes, reply count, time posted. Up to 20 items a call; $0.0020 per call. Errors and timeouts are not charged.

- Name: Bilibili video comments API
- Request: `GET /v1/bilibili/videos/comments/list`
- Parameters: `id` (required), `sort`, `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/bilibili/videos/comments/list.md

## bilibili.videos.get

Get one Bilibili video by BV number or link: title, description, uploader, views, likes, coins, saves, danmaku count, length, tags, section, IP location, and the cid that subtitles and danmaku are asked for by. One object a call; $0.0020 per call. Errors and timeouts are not charged.

- Name: Bilibili video detail API
- Request: `GET /v1/bilibili/videos/get`
- Parameters: `id`, `url`, `view`, `fields`; give exactly one of id, url
- Whole contract: https://dataxapi.com/apis/bilibili/videos/get.md

## bilibili.videos.search

Get a page of Bilibili videos for search terms, by relevance, newest or most played: title, uploader, views, likes, saves, comments, length. Up to 20 items a call; $0.0020 per call. Errors and timeouts are not charged.

- Name: Bilibili video search API
- Request: `GET /v1/bilibili/videos/search`
- Parameters: `query` (required), `sort`, `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/bilibili/videos/search.md

## bilibili.videos.trending

Get a page of Bilibili's popular videos: title, description, uploader, views, likes, coins, saves, danmaku count, length, section, IP location, why it is recommended. Up to 20 items a call; $0.0020 per call. Errors and timeouts are not charged.

- Name: Bilibili popular videos API
- Request: `GET /v1/bilibili/videos/trending`
- Parameters: `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/bilibili/videos/trending.md

## bilibili.backup.users.videos.list

The backup of Bilibili user videos, to call when the original cannot serve: the same parameters and result (without the description and the comment count), at a higher price. Up to 30 items a call; $0.0300 per call. Errors and timeouts are not charged.

- Name: Bilibili user videos (backup) API
- Request: `GET /v1/bilibili/backup/users/videos/list`
- Parameters: `id` (required), `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/bilibili/backup/users/videos/list.md

## How this differs from Bilibili's official open platform

Bilibili's open platform lists its scopes as USER_INFO, USER_DATA, ARC_BASE, ARC_DATA, ATC_DATA and LIVE_ROOM_DATA: the authorising user's own profile, data, videos, articles and live room. None of them is a search.

It is built for an app a creator uses on their own channel. DataXAPI reads public Bilibili videos by keyword, any video's details and comments, any account's videos and the trending lists, with no app review and no Bilibili account of yours.

Read on 2026-10-29 in the platform's own documents:

- [Bilibili Open Platform: scope list](https://member.bilibili.com/arcopen/user/config/scopetype)
