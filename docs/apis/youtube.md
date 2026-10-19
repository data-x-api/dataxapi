# YouTube API

10 endpoints read YouTube: videos, posts, channels, comments. From $0.0020 a call. No YouTube login and no cookie; a failed call is free.

> 10 endpoints. How to call, pay and handle errors is the same everywhere: https://dataxapi.com/llms.txt

Generated from catalog revision c48ce454ae6c4c65, price book 2.

## youtube.channels.get

Get a YouTube channel by ID or handle: name, description, subscriber count, video count, total views, verification, the day it was created. One object a call; $0.0020 per call. Errors, timeouts and objects that do not exist are not charged.

- Name: YouTube channel profile API
- Request: `GET /v1/youtube/channels/get`
- Parameters: `id`, `username`, `view`, `fields`; give exactly one of id, username
- Whole contract: https://dataxapi.com/apis/youtube/channels/get.md

## youtube.channels.search

Find YouTube channels by search terms: name, handle, description, subscriber count, verification. About 20 items a call, 40 at most; $0.0020 per call. Errors and timeouts are not charged; an empty result is charged $0.0020.

- Name: YouTube channel search API
- Request: `GET /v1/youtube/channels/search`
- Parameters: `query` (required), `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/youtube/channels/search.md

## youtube.channels.videos.list

Get a page of a YouTube channel's videos or Shorts by channel ID or handle, newest or most viewed first: title, description, time published, views, likes, length. About 30 items a call, 60 at most; $0.0020 per call. Errors and timeouts are not charged; an empty result is charged $0.0020.

- Name: YouTube channel videos API
- Request: `GET /v1/youtube/channels/videos/list`
- Parameters: `id`, `username`, `type`, `sort`, `cursor`, `view`, `fields`; give exactly one of id, username
- Whole contract: https://dataxapi.com/apis/youtube/channels/videos/list.md

## youtube.comments.replies.list

Get a page of the replies to a YouTube comment, by the replies token the comment list gives: text, replier, likes. About 10 items a call, 50 at most; $0.0020 per call. Errors and timeouts are not charged; an empty result is charged $0.0020.

- Name: YouTube comment replies API
- Request: `GET /v1/youtube/comments/replies/list`
- Parameters: `id` (required), `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/youtube/comments/replies/list.md

## youtube.videos.comments.list

Get a page of comments on a YouTube video by ID or link, top or newest first: text, commenter, likes, reply count, and the token that gets a comment's replies. Up to 20 items a call; $0.0020 per call. Errors, timeouts and objects that do not exist are not charged; an empty result is charged $0.0020.

- Name: YouTube video comments API
- Request: `GET /v1/youtube/videos/comments/list`
- Parameters: `id`, `url`, `sort`, `cursor`, `view`, `fields`; give exactly one of id, url
- Whole contract: https://dataxapi.com/apis/youtube/videos/comments/list.md

## youtube.videos.get

Get one YouTube video by ID or link: title, description, channel, time published, view, like and comment counts, length. One object a call; $0.0020 per call. Errors, timeouts and objects that do not exist are not charged.

- Name: YouTube video detail API
- Request: `GET /v1/youtube/videos/get`
- Parameters: `id`, `url`, `view`, `fields`; give exactly one of id, url
- Whole contract: https://dataxapi.com/apis/youtube/videos/get.md

## youtube.videos.search

Find YouTube videos by search terms, by relevance or by views, within a time window: title, channel, views, length. About 20 items a call, 100 at most; $0.0020 per call. Errors and timeouts are not charged; an empty result is charged $0.0020.

- Name: YouTube video search API
- Request: `GET /v1/youtube/videos/search`
- Parameters: `query` (required), `sort`, `published_within`, `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/youtube/videos/search.md

## youtube.videos.transcript.get

Get the transcript of a YouTube video by ID or link: the whole text and timed segments. One object a call; $0.0020 per call. Errors, timeouts and objects that do not exist are not charged.

- Name: YouTube video transcript API
- Request: `GET /v1/youtube/videos/transcript/get`
- Parameters: `id`, `url`, `view`, `fields`; give exactly one of id, url
- Whole contract: https://dataxapi.com/apis/youtube/videos/transcript/get.md

## youtube.channels.posts.list

Get a page of the posts on a YouTube channel's Posts tab (once Community) by channel ID or handle, newest first: text, pictures, likes, the video a post carries. About 10 items a call, 20 at most; $0.0020 per call. Errors and timeouts are not charged; an empty result is charged $0.0020.

- Name: YouTube channel posts API
- Request: `GET /v1/youtube/channels/posts/list`
- Parameters: `id`, `username`, `cursor`, `view`, `fields`; give exactly one of id, username
- Whole contract: https://dataxapi.com/apis/youtube/channels/posts/list.md

## youtube.posts.get

Get one YouTube channel post (once a Community post) by ID or link: text, channel, pictures, likes, the video it carries. One object a call; $0.0020 per call. Errors, timeouts and objects that do not exist are not charged.

- Name: YouTube post detail API
- Request: `GET /v1/youtube/posts/get`
- Parameters: `id`, `url`, `view`, `fields`; give exactly one of id, url
- Whole contract: https://dataxapi.com/apis/youtube/posts/get.md
