# WeChat Channels API

7 endpoints read WeChat Channels: videos, users, collections. From $0.0200 a call. No WeChat Channels login and no cookie; a failed call is free.

> 7 endpoints. How to call, pay and handle errors is the same everywhere: https://dataxapi.com/llms.txt

Generated from catalog revision c48ce454ae6c4c65, price book 2.

## wechat_channels.users.get

Get a WeChat Channels account by its ID: name, signature, avatar, IP location, number of videos. One object a call; $0.0200 per call. Errors, timeouts and objects that do not exist are not charged.

- Name: WeChat Channels account profile API
- Request: `GET /v1/wechat_channels/users/get`
- Parameters: `id` (required), `view`, `fields`
- Whole contract: https://dataxapi.com/apis/wechat_channels/users/get.md

## wechat_channels.videos.get

Get one WeChat Channels video by its ID: description, author, time published, likes, comments, forwards, saves. One object a call; $0.0200 per call. Errors, timeouts and objects that do not exist are not charged.

- Name: WeChat Channels video detail API
- Request: `GET /v1/wechat_channels/videos/get`
- Parameters: `id` (required), `view`, `fields`
- Whole contract: https://dataxapi.com/apis/wechat_channels/videos/get.md

## wechat_channels.videos.comments.list

Get a page of top-level comments on a WeChat Channels video by its ID: text, commenter, likes, time posted, IP location. About 24 items a call, 30 at most; $0.0200 per call. Errors, timeouts and objects that do not exist are not charged; an empty result is charged $0.0200.

- Name: WeChat Channels video comments API
- Request: `GET /v1/wechat_channels/videos/comments/list`
- Parameters: `id` (required), `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/wechat_channels/videos/comments/list.md

## wechat_channels.users.collections.list

Get every public collection of a WeChat Channels account by the account's ID: name, description, cover, number of videos, when it was last updated. A collection's ID is what the endpoint that lists its videos takes. About 7 items a call, 100 at most; $0.0200 per call. Errors, timeouts and objects that do not exist are not charged; an empty result is charged $0.0200.

- Name: WeChat Channels account collections API
- Request: `GET /v1/wechat_channels/users/collections/list`
- Parameters: `id` (required), `view`, `fields`
- Whole contract: https://dataxapi.com/apis/wechat_channels/users/collections/list.md

## wechat_channels.collections.videos.list

Get a page of the videos in a WeChat Channels collection by the collection's ID, in the collection's own order (oldest first), 20 a page: description, author, time published, likes, comments, forwards, saves. About 20 items a call, 30 at most; $0.0200 per call. Errors, timeouts and objects that do not exist are not charged; an empty result is charged $0.0200.

- Name: WeChat Channels collection videos API
- Request: `GET /v1/wechat_channels/collections/videos/list`
- Parameters: `id` (required), `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/wechat_channels/collections/videos/list.md

## wechat_channels.users.videos.list

Get a page of the videos a WeChat Channels account published, newest first, by the account's ID: description, time published, likes, comments, forwards, saves. About 15 items a call, 30 at most; $0.0200 per call. Errors, timeouts and objects that do not exist are not charged; an empty result is charged $0.0200.

- Name: WeChat Channels account videos API
- Request: `GET /v1/wechat_channels/users/videos/list`
- Parameters: `id` (required), `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/wechat_channels/users/videos/list.md

## wechat_channels.videos.search

Get a page of WeChat Channels videos for search terms through WeChat Search, by relevance, newest or hottest, filtered by time posted: description, the account's name and avatar, time published, likes and saves, length, cover. WeChat Search gives no account ID, and a video's ID is the encrypted one of the search result, which the Channels video endpoint does not take. About 10 items a call, 20 at most; $0.0200 per call. Errors and timeouts are not charged; an empty result is charged $0.0200.

- Name: WeChat Channels video search API
- Request: `GET /v1/wechat_channels/videos/search`
- Parameters: `query` (required), `sort`, `published_within`, `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/wechat_channels/videos/search.md
