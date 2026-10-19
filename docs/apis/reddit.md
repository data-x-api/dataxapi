# Reddit API

11 endpoints read Reddit: posts, users, communities, trends. From $0.0020 a call. No Reddit login and no cookie; a failed call is free.

> 11 endpoints. How to call, pay and handle errors is the same everywhere: https://dataxapi.com/llms.txt

Generated from catalog revision c48ce454ae6c4c65, price book 2.

## reddit.posts.comments.list

Get a page of comments on a Reddit post by ID or link: text, commenter, score, reply count, time posted, with the first levels of replies. About 8 items a call, 200 at most; $0.0020 per call. Errors, timeouts and objects that do not exist are not charged; an empty result is charged $0.0020.

- Name: Reddit post comments API
- Request: `GET /v1/reddit/posts/comments/list`
- Parameters: `id`, `url`, `sort`, `cursor`, `view`, `fields`; give exactly one of id, url
- Whole contract: https://dataxapi.com/apis/reddit/posts/comments/list.md

## reddit.posts.get

Get one Reddit post by ID or link: title, text, author, community, score, comment count. One object a call; $0.0020 per call. Errors, timeouts and objects that do not exist are not charged.

- Name: Reddit post detail API
- Request: `GET /v1/reddit/posts/get`
- Parameters: `id`, `url`, `view`, `fields`; give exactly one of id, url
- Whole contract: https://dataxapi.com/apis/reddit/posts/get.md

## reddit.posts.search

Get a page of Reddit posts matching a search, by relevance, newest or top score, optionally within a period. About 7 items a call, 25 at most; $0.0020 per call. Errors and timeouts are not charged; an empty result is charged $0.0020.

- Name: Reddit post search API
- Request: `GET /v1/reddit/posts/search`
- Parameters: `query` (required), `sort`, `published_within`, `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/reddit/posts/search.md

## reddit.posts.trending

Get a page of the posts on Reddit's Popular feed: title, text, author, community, score, comment count. About 7 items a call, 25 at most; $0.0020 per call. Errors and timeouts are not charged; an empty result is charged $0.0020.

- Name: Reddit popular posts API
- Request: `GET /v1/reddit/posts/trending`
- Parameters: `board`, `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/reddit/posts/trending.md

## reddit.subreddits.posts.list

Get a page of the posts of a Reddit community by its name, hot, newest or top score first. Up to 25 items a call; $0.0020 per call. Errors and timeouts are not charged; an empty result is charged $0.0020.

- Name: Reddit community posts API
- Request: `GET /v1/reddit/subreddits/posts/list`
- Parameters: `id` (required), `sort`, `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/reddit/subreddits/posts/list.md

## reddit.trends.list

Get the searches trending on Reddit today, ranked in the order the platform lists them. About 6 items a call, 20 at most; $0.0020 per call. Errors and timeouts are not charged; an empty result is charged $0.0020.

- Name: Reddit trending searches API
- Request: `GET /v1/reddit/trends/list`
- Parameters: `board`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/reddit/trends/list.md

## reddit.users.get

Get a Reddit user's public profile by username: display name, bio, when it was created, karma, post and comment counts. One object a call; $0.0020 per call. Errors, timeouts and objects that do not exist are not charged.

- Name: Reddit user profile API
- Request: `GET /v1/reddit/users/get`
- Parameters: `username` (required), `view`, `fields`
- Whole contract: https://dataxapi.com/apis/reddit/users/get.md

## reddit.users.posts.list

Get a page of the posts a Reddit user has made, newest first. Up to 25 items a call; $0.0020 per call. Errors, timeouts and objects that do not exist are not charged; an empty result is charged $0.0020.

- Name: Reddit user posts API
- Request: `GET /v1/reddit/users/posts/list`
- Parameters: `username` (required), `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/reddit/users/posts/list.md

## reddit.subreddits.get

Get a Reddit community by its name: description, members, users active and contributions made in the last week, when it was created. One object a call; $0.0020 per call. Errors, timeouts and objects that do not exist are not charged.

- Name: Reddit community profile API
- Request: `GET /v1/reddit/subreddits/get`
- Parameters: `id` (required), `view`, `fields`
- Whole contract: https://dataxapi.com/apis/reddit/subreddits/get.md

## reddit.users.subreddits.list

Get the communities a Reddit user is active in by username: each one's name, members and icon, all in one page (215 of them were recorded for one account). About 40 items a call, 500 at most; $0.0020 per call. Errors, timeouts and objects that do not exist are not charged; an empty result is charged $0.0020.

- Name: Reddit user active communities API
- Request: `GET /v1/reddit/users/subreddits/list`
- Parameters: `username` (required), `view`, `fields`
- Whole contract: https://dataxapi.com/apis/reddit/users/subreddits/list.md

## reddit.posts.transcript.get

Get what is said in the video of a Reddit post by ID or link: the captions Reddit makes for a video it hosts, as the whole text and timed segments. One object a call; $0.0020 per call. Errors, timeouts and objects that do not exist are not charged.

- Name: Reddit video transcript API
- Request: `GET /v1/reddit/posts/transcript/get`
- Parameters: `id`, `url`, `view`, `fields`; give exactly one of id, url
- Whole contract: https://dataxapi.com/apis/reddit/posts/transcript/get.md
