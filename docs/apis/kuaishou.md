# Kuaishou API

8 endpoints read Kuaishou: videos, users, comments, trends. From $0.0020 a call. No Kuaishou login and no cookie; a failed call is free.

> 8 endpoints. How to call, pay and handle errors is the same everywhere: https://dataxapi.com/llms.txt

Generated from catalog revision 720fc3ea8dadb865, price book 19.

## kuaishou.comments.replies.list

Get a page of the replies under a Kuaishou comment, by the comment's ID and its video's ID: text, replier, likes, time posted, IP location. About 12 items a call, 20 at most; $0.0020 per call. Errors and timeouts are not charged.

- Name: Kuaishou comment replies API
- Request: `GET /v1/kuaishou/comments/replies/list`
- Parameters: `id` (required), `post_id` (required), `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/kuaishou/comments/replies/list.md

## kuaishou.trends.list

Get Kuaishou's hot list: 50 trending terms and whatever the platform pins above them, with rank and heat. About 51 items a call, 60 at most; $0.0020 per call. Errors and timeouts are not charged.

- Name: Kuaishou hot list API
- Request: `GET /v1/kuaishou/trends/list`
- Parameters: `view`, `fields`
- Whole contract: https://dataxapi.com/apis/kuaishou/trends/list.md

## kuaishou.users.get

Get a Kuaishou user's profile by user ID: name, handle, bio, follower, following and post counts, total likes, verification; in the full view also what the badge says, the IP location, gender, and whether the profile has a Kuaishou store. One object a call; $0.0200 per call. Errors, timeouts and objects that do not exist are not charged.

- Name: Kuaishou user profile API
- Request: `GET /v1/kuaishou/users/get`
- Parameters: `id` (required), `view`, `fields`
- Whole contract: https://dataxapi.com/apis/kuaishou/users/get.md

## kuaishou.users.search

Search Kuaishou accounts by terms, a page at a time, with only verified accounts or only those live now, by gender, or ordered by followers: user ID, display name, handle, bio, follower count, verification. Up to 20 items a call; $0.0200 per call. Errors and timeouts are not charged.

- Name: Kuaishou user search API
- Request: `GET /v1/kuaishou/users/search`
- Parameters: `query` (required), `filter`, `gender`, `sort`, `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/kuaishou/users/search.md

## kuaishou.users.videos.list

Get a page of the videos a Kuaishou account has posted, newest or most popular first: caption, play and engagement counts, time posted. Up to 20 items a call; $0.0200 per call. Errors and timeouts are not charged.

- Name: Kuaishou user videos API
- Request: `GET /v1/kuaishou/users/videos/list`
- Parameters: `id` (required), `sort`, `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/kuaishou/users/videos/list.md

## kuaishou.videos.comments.list

Get a page of top-level comments on a Kuaishou video: text, commenter, likes, time posted, IP location. Up to 40 items a call; $0.0020 per call. Errors and timeouts are not charged.

- Name: Kuaishou video comments API
- Request: `GET /v1/kuaishou/videos/comments/list`
- Parameters: `id`, `url`, `cursor`, `view`, `fields`; give exactly one of id, url
- Whole contract: https://dataxapi.com/apis/kuaishou/videos/comments/list.md

## kuaishou.videos.get

Get one Kuaishou video by ID or link: caption, author, play and engagement counts, time posted. One object a call; $0.0020 per call. Errors, timeouts and objects that do not exist are not charged.

- Name: Kuaishou video detail API
- Request: `GET /v1/kuaishou/videos/get`
- Parameters: `id`, `url`, `view`, `fields`; give exactly one of id, url
- Whole contract: https://dataxapi.com/apis/kuaishou/videos/get.md

## kuaishou.videos.search

Search Kuaishou posts by terms, a page at a time, sorted newest or most liked first and filtered by time posted and video length: caption, author, play and engagement counts, time posted, whether it is a video or a photo set, and a video's length. About 10 items a call, 20 at most; $0.0200 per call. Errors and timeouts are not charged.

- Name: Kuaishou video search API
- Request: `GET /v1/kuaishou/videos/search`
- Parameters: `query` (required), `sort`, `published_within`, `duration`, `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/kuaishou/videos/search.md

## How this differs from Kuaishou's official open platform

Kuaishou Open Platform asks for qualification certification first, with company, legal representative and admin details, reviewed before you can create an app. Its video interfaces (/openapi/photo/list and /openapi/photo/info, scope user_video_info) read the authorising user's own videos, up to 200 a page, and its user information needs that user's authorisation too. We found no comment or search interface in its documents.

It is built for an app whose users sign in with Kuaishou and work with their own account. DataXAPI reads public Kuaishou videos and accounts by keyword, and any video's details and comments or any account's videos by ID, with no app review and no Kuaishou account of yours.

Read on 2026-10-29 in the platform's own documents:

- [Kuaishou Open Platform: getting started](https://open.kuaishou.com/platformDocs/newGuide/entry)
- [Kuaishou Open Platform: the user's videos](https://open.kuaishou.com/platformDocs/openAbility/contentManagement/searchForVideos)
- [Kuaishou Open Platform: user information](https://open.kuaishou.com/platformDocs/openAbility/userInformation/publicInformation)
