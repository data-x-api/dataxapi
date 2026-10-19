# X (Twitter) API

21 endpoints read X (Twitter): posts, users, threads, trends, X Communities, X Lists. From $0.0003 a call. No X login and no cookie; a failed call is free.

> 21 endpoints. How to call, pay and handle errors is the same everywhere: https://dataxapi.com/llms.txt

Generated from catalog revision c48ce454ae6c4c65, price book 2.

## x.communities.posts.list

Get a page of the posts in an X community by the community's ID. Up to 20 items a call; $0.0003 per item returned, at least $0.0003 and at most $0.0060 a call. Errors and timeouts are not charged; an empty result is charged $0.0003.

- Name: X community posts API
- Request: `GET /v1/x/communities/posts/list`
- Parameters: `id` (required), `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/x/communities/posts/list.md

## x.lists.posts.list

Get a page of the posts on an X list's timeline by the list's ID, newest first, about 100 a page. Up to 100 items a call; $0.0020 per call. Errors and timeouts are not charged; an empty result is charged $0.0020.

- Name: X list posts API
- Request: `GET /v1/x/lists/posts/list`
- Parameters: `id` (required), `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/x/lists/posts/list.md

## x.posts.article.get

Get the long-form article attached to an X post by the post's ID: title, full text, author, time published, and its like, reply and view counts. One object a call; $0.0020 per call. Errors, timeouts and objects that do not exist are not charged.

- Name: X article detail API
- Request: `GET /v1/x/posts/article/get`
- Parameters: `id` (required), `view`, `fields`
- Whole contract: https://dataxapi.com/apis/x/posts/article/get.md

## x.posts.get

Get one X post by ID or link: text, author, time posted, and its like, reply, retweet, quote, bookmark and view counts. One object a call; $0.0003 per call. Errors, timeouts and objects that do not exist are not charged.

- Name: X post detail API
- Request: `GET /v1/x/posts/get`
- Parameters: `id`, `url`, `view`, `fields`; give exactly one of id, url
- Whole contract: https://dataxapi.com/apis/x/posts/get.md

## x.posts.quotes.list

Get a page of the X posts that quote a post, newest first or most popular first. Up to 20 items a call; $0.0003 per item returned, at least $0.0003 and at most $0.0060 a call. Errors and timeouts are not charged; an empty result is charged $0.0003.

- Name: X post quotes API
- Request: `GET /v1/x/posts/quotes/list`
- Parameters: `id` (required), `sort`, `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/x/posts/quotes/list.md

## x.posts.replies.list

Get a page of the replies under an X post by its ID, in the platform's order of relevance; a reply on X is itself a post and is returned as one. About 35 items a call, 60 at most; $0.0020 per call. Errors and timeouts are not charged; an empty result is charged $0.0020.

- Name: X post replies API
- Request: `GET /v1/x/posts/replies/list`
- Parameters: `id` (required), `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/x/posts/replies/list.md

## x.posts.retweeters.list

Get a page of the accounts that retweeted an X post, by the post's ID: handle, name, bio, follower count. Up to 100 items a call; $0.0020 per call. Errors and timeouts are not charged; an empty result is charged $0.0020.

- Name: X post retweeters API
- Request: `GET /v1/x/posts/retweeters/list`
- Parameters: `id` (required), `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/x/posts/retweeters/list.md

## x.posts.search

Find X posts by search terms, most popular or newest first; the terms may use X's own search operators, such as from:handle. Up to 20 items a call; $0.0020 per call. Errors and timeouts are not charged; an empty result is charged $0.0020.

- Name: X post search API
- Request: `GET /v1/x/posts/search`
- Parameters: `query` (required), `sort`, `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/x/posts/search.md

## x.threads.posts.list

Get the posts of an X thread by the ID of any post in it: the root post, the author's follow-ups and the replies among them. About 20 items a call, 50 at most; $0.0003 per item returned, at least $0.0003 and at most $0.0150 a call. Errors and timeouts are not charged; an empty result is charged $0.0003.

- Name: X thread context API
- Request: `GET /v1/x/threads/posts/list`
- Parameters: `id` (required), `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/x/threads/posts/list.md

## x.trends.list

Get the top 30 of what is trending on X now, with rank: worldwide, or in one country. Up to 30 items a call; $0.0090 per call. Errors and timeouts are not charged; an empty result is free.

- Name: X trends API
- Request: `GET /v1/x/trends/list`
- Parameters: `board`, `region`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/x/trends/list.md

## x.users.followers.list

Get a page of the accounts following an X user, up to 200 a page, newest followers first. Up to 200 items a call; $0.0001 per item returned, at least $0.0004 and at most $0.0200 a call. Errors and timeouts are not charged; an empty result is charged $0.0004.

- Name: X user followers API
- Request: `GET /v1/x/users/followers/list`
- Parameters: `username` (required), `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/x/users/followers/list.md

## x.users.following.list

Get a page of the accounts an X user follows, up to 200 a page. Up to 200 items a call; $0.0001 per item returned, at least $0.0004 and at most $0.0200 a call. Errors and timeouts are not charged; an empty result is charged $0.0004.

- Name: X user following API
- Request: `GET /v1/x/users/following/list`
- Parameters: `username` (required), `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/x/users/following/list.md

## x.users.get

Get an X user's profile by handle or ID: name, bio, follower and following counts, verification; up to 100 IDs in one request. One object a call; up to 100 in one request with ids; $0.0004 per item returned, at least $0.0004 and at most $0.0400 a call. Errors, timeouts and objects that do not exist are not charged; an empty result is free.

- Name: X user profile API
- Request: `GET or POST /v1/x/users/get`
- Parameters: `id`, `username`, `ids`, `view`, `fields`; give exactly one of id, username, ids
- Whole contract: https://dataxapi.com/apis/x/users/get.md

## x.users.mentions.list

Get a page of the posts that mention an X user, newest first. Up to 20 items a call; $0.0003 per item returned, at least $0.0003 and at most $0.0060 a call. Errors and timeouts are not charged; an empty result is charged $0.0003.

- Name: X user mentions API
- Request: `GET /v1/x/users/mentions/list`
- Parameters: `username` (required), `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/x/users/mentions/list.md

## x.users.posts.list

Get a page of the posts on an X user's profile by handle, newest first; tab chooses the posts, replies or media tab. About 20 items a call, 60 at most; $0.0020 per call. Errors and timeouts are not charged; an empty result is charged $0.0020.

- Name: X user posts API
- Request: `GET /v1/x/users/posts/list`
- Parameters: `username` (required), `tab`, `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/x/users/posts/list.md

## x.users.search

Find X accounts by search terms, about 20 a page: handle, name, bio, follower count, verification. Up to 20 items a call; $0.0004 per item returned, at least $0.0004 and at most $0.0080 a call. Errors and timeouts are not charged; an empty result is charged $0.0004.

- Name: X user search API
- Request: `GET /v1/x/users/search`
- Parameters: `query` (required), `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/x/users/search.md

## x.communities.get

Get an X community by its ID: name, description, members, moderators, how people join, when it was created. One object a call; $0.0004 per call. Errors, timeouts and objects that do not exist are not charged.

- Name: X community profile API
- Request: `GET /v1/x/communities/get`
- Parameters: `id` (required), `view`, `fields`
- Whole contract: https://dataxapi.com/apis/x/communities/get.md

## x.communities.members.list

Get a page of the accounts that have joined an X community, by the community's ID, about 20 a page: handle, name, bio, follower count, verification. Up to 20 items a call; $0.0004 per item returned, at least $0.0004 and at most $0.0080 a call. Errors and timeouts are not charged; an empty result is charged $0.0004.

- Name: X community members API
- Request: `GET /v1/x/communities/members/list`
- Parameters: `id` (required), `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/x/communities/members/list.md

## x.lists.followers.list

Get accounts that follow an X list, by the list's ID, up to 20: handle, name, bio, follower count, verification. This page only, with no further page. Up to 20 items a call; $0.0004 per item returned, at least $0.0004 and at most $0.0080 a call. Errors and timeouts are not charged; an empty result is charged $0.0004.

- Name: X list followers API
- Request: `GET /v1/x/lists/followers/list`
- Parameters: `id` (required), `view`, `fields`
- Whole contract: https://dataxapi.com/apis/x/lists/followers/list.md

## x.lists.members.list

Get a page of the accounts an X list is made of, by the list's ID, 20 a page: handle, name, bio, follower count, verification. Up to 20 items a call; $0.0004 per item returned, at least $0.0004 and at most $0.0080 a call. Errors and timeouts are not charged; an empty result is charged $0.0004.

- Name: X list members API
- Request: `GET /v1/x/lists/members/list`
- Parameters: `id` (required), `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/x/lists/members/list.md

## x.posts.transcript.get

Get what is said in the video of an X post by ID or link, as one text; videos up to two minutes long. One object a call; $0.0020 per call. Errors, timeouts and objects that do not exist are not charged.

- Name: X video transcript API
- Request: `GET /v1/x/posts/transcript/get`
- Parameters: `id`, `url`, `view`, `fields`; give exactly one of id, url
- Whole contract: https://dataxapi.com/apis/x/posts/transcript/get.md
