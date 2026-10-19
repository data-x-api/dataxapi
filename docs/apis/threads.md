# Threads API

4 endpoints read Threads: posts, users. From $0.0020 a call. No Threads login and no cookie; a failed call is free.

> 4 endpoints. How to call, pay and handle errors is the same everywhere: https://dataxapi.com/llms.txt

Generated from catalog revision c48ce454ae6c4c65, price book 2.

## threads.posts.get

Get one Threads post by its code or link: text, author, time, likes, replies, reposts, images. One object a call; $0.0020 per call. Errors, timeouts and objects that do not exist are not charged.

- Name: Threads post detail API
- Request: `GET /v1/threads/posts/get`
- Parameters: `id`, `url`, `view`, `fields`; give exactly one of id, url
- Whole contract: https://dataxapi.com/apis/threads/posts/get.md

## threads.posts.search

Find Threads posts by search terms: text, author, time, likes, replies, reposts; can be limited by publication date. One page of results. Up to 20 items a call; $0.0020 per call. Errors and timeouts are not charged; an empty result is charged $0.0020.

- Name: Threads post search API
- Request: `GET /v1/threads/posts/search`
- Parameters: `query` (required), `since`, `until`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/threads/posts/search.md

## threads.users.get

Get a Threads user's profile by handle: name, bio, follower count, verification, avatar. One object a call; $0.0020 per call. Errors, timeouts and objects that do not exist are not charged.

- Name: Threads user profile API
- Request: `GET /v1/threads/users/get`
- Parameters: `username` (required), `view`, `fields`
- Whole contract: https://dataxapi.com/apis/threads/users/get.md

## threads.users.posts.list

Get a Threads user's latest posts by handle: text, time, likes, replies, reposts, images. The most recent page only; there is no older page. About 15 items a call, 30 at most; $0.0020 per call. Errors, timeouts and objects that do not exist are not charged; an empty result is charged $0.0020.

- Name: Threads user posts API
- Request: `GET /v1/threads/users/posts/list`
- Parameters: `username` (required), `view`, `fields`
- Whole contract: https://dataxapi.com/apis/threads/users/posts/list.md
