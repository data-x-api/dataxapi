# Zhihu API

16 endpoints read Zhihu: posts, articles, pins (想法), questions, answers, users, columns, comments. From $0.0020 a call. No Zhihu login and no cookie; a failed call is free.

> 16 endpoints. How to call, pay and handle errors is the same everywhere: https://dataxapi.com/llms.txt

Generated from catalog revision c48ce454ae6c4c65, price book 2.

## zhihu.answers.comments.list

Get a page of comments on a Zhihu answer: text, commenter, likes, reply count, time posted. About 10 items a call, 20 at most; $0.0020 per call. Errors and timeouts are not charged; an empty result is charged $0.0020.

- Name: Zhihu answer comments API
- Request: `GET /v1/zhihu/answers/comments/list`
- Parameters: `id` (required), `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/zhihu/answers/comments/list.md

## zhihu.answers.get

Get one Zhihu answer by ID or link: its question, text, author, time posted. One object a call; $0.0020 per call. Errors, timeouts and objects that do not exist are not charged.

- Name: Zhihu answer detail API
- Request: `GET /v1/zhihu/answers/get`
- Parameters: `id`, `url`, `view`, `fields`; give exactly one of id, url
- Whole contract: https://dataxapi.com/apis/zhihu/answers/get.md

## zhihu.articles.get

Get one Zhihu column article by ID or link: title, text, author, upvotes, comment count. One object a call; $0.0020 per call. Errors, timeouts and objects that do not exist are not charged.

- Name: Zhihu article detail API
- Request: `GET /v1/zhihu/articles/get`
- Parameters: `id`, `url`, `view`, `fields`; give exactly one of id, url
- Whole contract: https://dataxapi.com/apis/zhihu/articles/get.md

## zhihu.columns.articles.list

Get a page of the articles in a Zhihu column by the column's ID: title, text, author, time published, upvotes, comment count. Up to 20 items a call; $0.0020 per call. Errors, timeouts and objects that do not exist are not charged; an empty result is charged $0.0020.

- Name: Zhihu column articles API
- Request: `GET /v1/zhihu/columns/articles/list`
- Parameters: `id` (required), `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/zhihu/columns/articles/list.md

## zhihu.comments.replies.list

Get a page of the replies under a top-level Zhihu comment: text, replier, likes, which comment each answers. Up to 20 items a call; $0.0020 per call. Errors, timeouts and objects that do not exist are not charged; an empty result is charged $0.0020.

- Name: Zhihu comment replies API
- Request: `GET /v1/zhihu/comments/replies/list`
- Parameters: `id` (required), `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/zhihu/comments/replies/list.md

## zhihu.pins.get

Get one Zhihu pin (short post) by ID or link: text, pictures, author, time posted, likes, comments, saves, reposts. One object a call; $0.0020 per call. Errors, timeouts and objects that do not exist are not charged.

- Name: Zhihu pin detail API
- Request: `GET /v1/zhihu/pins/get`
- Parameters: `id`, `url`, `view`, `fields`; give exactly one of id, url
- Whole contract: https://dataxapi.com/apis/zhihu/pins/get.md

## zhihu.posts.search

Get a page of Zhihu answers and articles matching a search; either kind alone, by relevance, newest or most upvoted. About 18 items a call, 20 at most; $0.0020 per call. Errors and timeouts are not charged; an empty result is charged $0.0020.

- Name: Zhihu content search API
- Request: `GET /v1/zhihu/posts/search`
- Parameters: `query` (required), `type`, `sort`, `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/zhihu/posts/search.md

## zhihu.questions.answers.list

Get the first 20 answers to a Zhihu question by ID or link, in Zhihu's own order: text, author, upvotes, comment and save counts. One page only. Up to 20 items a call; $0.0020 per call. Errors, timeouts and objects that do not exist are not charged; an empty result is charged $0.0020.

- Name: Zhihu question answers API
- Request: `GET /v1/zhihu/questions/answers/list`
- Parameters: `id`, `url`, `view`, `fields`; give exactly one of id, url
- Whole contract: https://dataxapi.com/apis/zhihu/questions/answers/list.md

## zhihu.questions.get

Get one Zhihu question by ID or link: title, details, when it was asked, answer, follower and view counts. One object a call; $0.0020 per call. Errors, timeouts and objects that do not exist are not charged.

- Name: Zhihu question detail API
- Request: `GET /v1/zhihu/questions/get`
- Parameters: `id`, `url`, `view`, `fields`; give exactly one of id, url
- Whole contract: https://dataxapi.com/apis/zhihu/questions/get.md

## zhihu.trends.list

Get Zhihu's hot list: the questions on it, their rank, heat (approximate) and answer count; an entry's ID is its question's. About 30 items a call, 50 at most; $0.0020 per call. Errors and timeouts are not charged; an empty result is charged $0.0020.

- Name: Zhihu hot list API
- Request: `GET /v1/zhihu/trends/list`
- Parameters: `board`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/zhihu/trends/list.md

## zhihu.users.answers.list

Get a page of the answers a Zhihu user has written, newest first. About 20 items a call, 40 at most; $0.0020 per call. Errors, timeouts and objects that do not exist are not charged; an empty result is charged $0.0020.

- Name: Zhihu user answers API
- Request: `GET /v1/zhihu/users/answers/list`
- Parameters: `username` (required), `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/zhihu/users/answers/list.md

## zhihu.users.articles.list

Get a page of the column articles a Zhihu user has written, newest first. Up to 20 items a call; $0.0020 per call. Errors, timeouts and objects that do not exist are not charged; an empty result is charged $0.0020.

- Name: Zhihu user articles API
- Request: `GET /v1/zhihu/users/articles/list`
- Parameters: `username` (required), `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/zhihu/users/articles/list.md

## zhihu.users.followers.list

Get a page of the accounts following a Zhihu user, 20 a page: name, headline, avatar, follower count, answer and article counts. Up to 20 items a call; $0.0020 per call. Errors, timeouts and objects that do not exist are not charged; an empty result is charged $0.0020.

- Name: Zhihu user followers API
- Request: `GET /v1/zhihu/users/followers/list`
- Parameters: `username` (required), `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/zhihu/users/followers/list.md

## zhihu.users.get

Get a Zhihu user's profile by the handle in its address: name, headline, follower count, answer and article counts. One object a call; $0.0020 per call. Errors, timeouts and objects that do not exist are not charged.

- Name: Zhihu user profile API
- Request: `GET /v1/zhihu/users/get`
- Parameters: `username` (required), `view`, `fields`
- Whole contract: https://dataxapi.com/apis/zhihu/users/get.md

## zhihu.users.pins.list

Get a page of the pins (short posts) a Zhihu user has posted, newest first: text, pictures, time posted, likes, comments, saves, reposts. Up to 20 items a call; $0.0020 per call. Errors, timeouts and objects that do not exist are not charged; an empty result is charged $0.0020.

- Name: Zhihu user pins API
- Request: `GET /v1/zhihu/users/pins/list`
- Parameters: `username` (required), `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/zhihu/users/pins/list.md

## zhihu.users.search

Get a page of Zhihu users matching a search: name, headline, follower count, answer and article counts. Up to 20 items a call; $0.0020 per call. Errors and timeouts are not charged; an empty result is charged $0.0020.

- Name: Zhihu user search API
- Request: `GET /v1/zhihu/users/search`
- Parameters: `query` (required), `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/zhihu/users/search.md
