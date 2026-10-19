# Instagram API

8 endpoints read Instagram: posts, hashtags, users, comments. From $0.0020 a call. No Instagram login and no cookie; a failed call is free.

> 8 endpoints. How to call, pay and handle errors is the same everywhere: https://dataxapi.com/llms.txt

Generated from catalog revision c48ce454ae6c4c65, price book 2.

## instagram.comments.replies.list

Get a page of the replies to an Instagram comment, by the comment's ID and its post's shortcode: text, replier, time posted. Up to 15 items a call; $0.0020 per call. Errors, timeouts and objects that do not exist are not charged; an empty result is charged $0.0020.

- Name: Instagram comment replies API
- Request: `GET /v1/instagram/comments/replies/list`
- Parameters: `id` (required), `post_id` (required), `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/instagram/comments/replies/list.md

## instagram.hashtags.posts.list

Get a page of the newest Instagram posts under a hashtag, by its name, about 33 a page: caption, author's ID, like and comment counts, time posted, image. About 33 items a call, 35 at most; $0.0020 per call. Errors, timeouts and objects that do not exist are not charged; an empty result is charged $0.0020.

- Name: Instagram hashtag posts API
- Request: `GET /v1/instagram/hashtags/posts/list`
- Parameters: `id` (required), `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/instagram/hashtags/posts/list.md

## instagram.posts.comments.list

Get a page of comments on an Instagram post or reel by shortcode or link, about 15 a page, newest first: text, commenter, likes, time posted. Up to 15 items a call; $0.0020 per call. Errors, timeouts and objects that do not exist are not charged; an empty result is charged $0.0020.

- Name: Instagram post comments API
- Request: `GET /v1/instagram/posts/comments/list`
- Parameters: `id`, `url`, `cursor`, `view`, `fields`; give exactly one of id, url
- Whole contract: https://dataxapi.com/apis/instagram/posts/comments/list.md

## instagram.posts.get

Get one Instagram post or reel by shortcode or link: caption, author, like, comment and play counts, image and video addresses. One object a call; $0.0020 per call. Errors, timeouts and objects that do not exist are not charged.

- Name: Instagram post detail API
- Request: `GET /v1/instagram/posts/get`
- Parameters: `id`, `url`, `view`, `fields`; give exactly one of id, url
- Whole contract: https://dataxapi.com/apis/instagram/posts/get.md

## instagram.posts.transcript.get

Get what is said in an Instagram reel or video post by shortcode or link, as one text; videos up to two minutes long. One object a call; $0.0020 per call. Errors, timeouts and objects that do not exist are not charged.

- Name: Instagram video transcript API
- Request: `GET /v1/instagram/posts/transcript/get`
- Parameters: `id`, `url`, `view`, `fields`; give exactly one of id, url
- Whole contract: https://dataxapi.com/apis/instagram/posts/transcript/get.md

## instagram.users.get

Get an Instagram user's profile by handle: name, bio, follower and following counts, verification, whether it is private. One object a call; $0.0020 per call. Errors, timeouts and objects that do not exist are not charged.

- Name: Instagram user profile API
- Request: `GET /v1/instagram/users/get`
- Parameters: `username` (required), `view`, `fields`
- Whole contract: https://dataxapi.com/apis/instagram/users/get.md

## instagram.users.posts.list

Get a page of what an Instagram user posted, by handle, 12 a page, or its reels only: caption, like, comment and play counts, time posted, image and video addresses. Up to 12 items a call; $0.0020 per call. Errors and timeouts are not charged; an empty result is charged $0.0020.

- Name: Instagram user posts API
- Request: `GET /v1/instagram/users/posts/list`
- Parameters: `username` (required), `type`, `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/instagram/users/posts/list.md

## instagram.users.search

Search Instagram accounts by keyword, about 50 in one answer and no further pages: handle, name, avatar, verification, whether it is private. Up to 50 items a call; $0.0040 per call. Errors and timeouts are not charged; an empty result is charged $0.0040.

- Name: Instagram user search API
- Request: `GET /v1/instagram/users/search`
- Parameters: `query` (required), `view`, `fields`
- Whole contract: https://dataxapi.com/apis/instagram/users/search.md
