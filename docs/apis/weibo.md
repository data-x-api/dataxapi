# Weibo API

10 endpoints read Weibo: posts, users, comments, trends. From $0.0020 a call. No Weibo login and no cookie; a failed call is free.

> 10 endpoints. How to call, pay and handle errors is the same everywhere: https://dataxapi.com/llms.txt

Generated from catalog revision c48ce454ae6c4c65, price book 2.

## weibo.comments.replies.list

Get a page of replies to a Weibo comment by comment ID: text, replier, likes, what it answers, time posted, IP location. Up to 20 items a call; $0.0020 per call. Errors, timeouts and objects that do not exist are not charged; an empty result is charged $0.0020.

- Name: Weibo comment replies API
- Request: `GET /v1/weibo/comments/replies/list`
- Parameters: `id` (required), `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/weibo/comments/replies/list.md

## weibo.posts.comments.list

Get a page of comments on a Weibo post by post ID: text, commenter, likes, reply count, time posted, IP location. Up to 20 items a call; $0.0020 per call. Errors, timeouts and objects that do not exist are not charged; an empty result is charged $0.0020.

- Name: Weibo post comments API
- Request: `GET /v1/weibo/posts/comments/list`
- Parameters: `id` (required), `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/weibo/posts/comments/list.md

## weibo.posts.get

Get one Weibo post by ID: the whole text (of a long post too), author, likes, comments, reposts, reads, pictures, topics. One object a call; $0.0020 per call. Errors, timeouts and objects that do not exist are not charged.

- Name: Weibo post detail API
- Request: `GET /v1/weibo/posts/get`
- Parameters: `id` (required), `view`, `fields`
- Whole contract: https://dataxapi.com/apis/weibo/posts/get.md

## weibo.posts.likers.list

Get the accounts that most recently liked a Weibo post by post ID, about 50 at a time: name, bio, avatar, verification, follower and following counts, number of posts. About 50 items a call, 100 at most; $0.0020 per call. Errors, timeouts and objects that do not exist are not charged; an empty result is charged $0.0020.

- Name: Weibo post likers API
- Request: `GET /v1/weibo/posts/likers/list`
- Parameters: `id` (required), `view`, `fields`
- Whole contract: https://dataxapi.com/apis/weibo/posts/likers/list.md

## weibo.posts.search

Get a page of Weibo posts for search terms, newest first: text (a long post is cut short here), author and follower count, likes, comments, reposts, pictures, topics. About 10 items a call, 20 at most; $0.0020 per call. Errors and timeouts are not charged; an empty result is charged $0.0020.

- Name: Weibo realtime search API
- Request: `GET /v1/weibo/posts/search`
- Parameters: `query` (required), `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/weibo/posts/search.md

## weibo.trends.list

Get Weibo's current hot search list, 50 terms, with rank and heat. About 50 items a call, 51 at most; $0.0020 per call. Errors and timeouts are not charged; an empty result is charged $0.0020.

- Name: Weibo hot search board API
- Request: `GET /v1/weibo/trends/list`
- Parameters: `board`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/weibo/trends/list.md

## weibo.users.followers.list

Get a page of the accounts following a Weibo user, 20 a page: name, bio, avatar, verification, follower and following counts, number of posts, when the account was opened. Up to 20 items a call; $0.0020 per call. Errors, timeouts and objects that do not exist are not charged; an empty result is charged $0.0020.

- Name: Weibo user followers API
- Request: `GET /v1/weibo/users/followers/list`
- Parameters: `id` (required), `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/weibo/users/followers/list.md

## weibo.users.get

Get a Weibo user's profile by user ID: name, bio, avatar, verification, follower and following counts, number of posts. One object a call; $0.0020 per call. Errors, timeouts and objects that do not exist are not charged.

- Name: Weibo user profile API
- Request: `GET /v1/weibo/users/get`
- Parameters: `id` (required), `view`, `fields`
- Whole contract: https://dataxapi.com/apis/weibo/users/get.md

## weibo.users.posts.list

Get a page of the posts on a Weibo user's profile (their own and their reposts) by user ID, newest first: text (a long post is cut short here), likes, comments, reposts, pictures, topics, whether pinned. About 20 items a call, 25 at most; $0.0020 per call. Errors, timeouts and objects that do not exist are not charged; an empty result is charged $0.0020.

- Name: Weibo user posts API
- Request: `GET /v1/weibo/users/posts/list`
- Parameters: `id` (required), `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/weibo/users/posts/list.md

## weibo.users.search

Get a page of Weibo users for search terms: ID, name, avatar, profile link. Up to 20 items a call; $0.0020 per call. Errors and timeouts are not charged; an empty result is charged $0.0020.

- Name: Weibo user search API
- Request: `GET /v1/weibo/users/search`
- Parameters: `query` (required), `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/weibo/users/search.md
