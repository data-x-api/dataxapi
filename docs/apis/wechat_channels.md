# WeChat Channels API

15 endpoints read WeChat Channels: videos, users, collections, comments. From $0.0150 a call. No WeChat Channels login and no cookie; a failed call is free.

> 15 endpoints. How to call, pay and handle errors is the same everywhere: https://dataxapi.com/llms.txt

Generated from catalog revision 720fc3ea8dadb865, price book 19.

## wechat_channels.users.get

Get a WeChat Channels account by its ID: name, signature, avatar, IP location, number of videos. One object a call; $0.0200 per call. Errors, timeouts and objects that do not exist are not charged.

- Name: WeChat Channels account profile API
- Request: `GET /v1/wechat_channels/users/get`
- Parameters: `id` (required), `view`, `fields`
- Whole contract: https://dataxapi.com/apis/wechat_channels/users/get.md

## wechat_channels.videos.get

Get one WeChat Channels video by its ID, a search result's export/ ID or its share link: description, author, time published, likes, comments, forwards, saves, and the video file's address with the key that decrypts it. One object a call; $0.0200 per call. Errors and timeouts are not charged.

- Name: WeChat Channels video detail API
- Request: `GET /v1/wechat_channels/videos/get`
- Parameters: `id`, `url`, `export_id`, `view`, `fields`; give exactly one of id, url, export_id
- Whole contract: https://dataxapi.com/apis/wechat_channels/videos/get.md

## wechat_channels.videos.comments.list

Get a page of top-level comments on a WeChat Channels video by its ID: text, commenter, likes, time posted, IP location. About 24 items a call, 30 at most; $0.0200 per call. Errors and timeouts are not charged.

- Name: WeChat Channels video comments API
- Request: `GET /v1/wechat_channels/videos/comments/list`
- Parameters: `id` (required), `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/wechat_channels/videos/comments/list.md

## wechat_channels.videos.share_link.get

Make a link that opens a WeChat Channels video in WeChat, by the video's ID (it starts with weixin.qq.com/sph/). Each call makes a different link for the same video, and an older one still leads to it; a link cannot be built from the ID. One object a call; $0.0200 per call. Errors and timeouts are not charged.

- Name: WeChat Channels video share link API
- Request: `GET /v1/wechat_channels/videos/share_link/get`
- Parameters: `id` (required), `view`, `fields`
- Whole contract: https://dataxapi.com/apis/wechat_channels/videos/share_link/get.md

## wechat_channels.users.collections.list

Get every public collection of a WeChat Channels account by the account's ID: name, description, cover, number of videos, when it was last updated. A collection's ID is what the endpoint that lists its videos takes. About 7 items a call, 100 at most; $0.0200 per call. Errors and timeouts are not charged.

- Name: WeChat Channels account collections API
- Request: `GET /v1/wechat_channels/users/collections/list`
- Parameters: `id` (required), `view`, `fields`
- Whole contract: https://dataxapi.com/apis/wechat_channels/users/collections/list.md

## wechat_channels.collections.videos.list

Get a page of the videos in a WeChat Channels collection by the collection's ID, in the collection's own order (oldest first), 20 a page: description, author, time published, likes, comments, forwards, saves. About 20 items a call, 30 at most; $0.0200 per call. Errors and timeouts are not charged.

- Name: WeChat Channels collection videos API
- Request: `GET /v1/wechat_channels/collections/videos/list`
- Parameters: `id` (required), `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/wechat_channels/collections/videos/list.md

## wechat_channels.users.videos.list

Get a page of the videos a WeChat Channels account published, newest first, by the account's ID: description, time published, likes, comments, forwards, saves, length. About 15 items a call, 30 at most; $0.0200 per call. Errors and timeouts are not charged.

- Name: WeChat Channels account videos API
- Request: `GET /v1/wechat_channels/users/videos/list`
- Parameters: `id` (required), `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/wechat_channels/users/videos/list.md

## wechat_channels.videos.search

Get a page of WeChat Channels videos for search terms through WeChat Search, by relevance, newest or hottest, filtered by time posted: description, the account's name and avatar, time published, likes and saves, length, cover. WeChat Search gives no account ID, and a video's ID is an encrypted one starting with export/: given as export_id to wechat_channels.videos.get it yields the numeric ID, the video file's address and the key that decrypts it; it expires, so use it soon. About 10 items a call, 20 at most; $0.0200 per call. Errors and timeouts are not charged.

- Name: WeChat Channels video search API
- Request: `GET /v1/wechat_channels/videos/search`
- Parameters: `query` (required), `sort`, `published_within`, `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/wechat_channels/videos/search.md

## wechat_channels.backup.users.get

The backup of wechat_channels.users.get: the same parameters and result, priced on its own. No number of videos. One object a call; $0.0300 per call. Errors and timeouts are not charged.

- Name: WeChat Channels account profile (backup) API
- Request: `GET /v1/wechat_channels/backup/users/get`
- Parameters: `id` (required), `view`, `fields`
- Whole contract: https://dataxapi.com/apis/wechat_channels/backup/users/get.md

## wechat_channels.backup.users.videos.list

The backup of wechat_channels.users.videos.list: the same parameters and result, priced on its own. About 15 items a call, 30 at most; $0.0600 per call. Errors and timeouts are not charged.

- Name: WeChat Channels account videos (backup) API
- Request: `GET /v1/wechat_channels/backup/users/videos/list`
- Parameters: `id` (required), `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/wechat_channels/backup/users/videos/list.md

## wechat_channels.backup.videos.search

The backup of wechat_channels.videos.search: the same parameters and result, priced on its own. No saves. About 10 items a call, 20 at most; $0.1 per call. Errors and timeouts are not charged.

- Name: WeChat Channels video search (backup) API
- Request: `GET /v1/wechat_channels/backup/videos/search`
- Parameters: `query` (required), `sort`, `published_within`, `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/wechat_channels/backup/videos/search.md

## wechat_channels.users.search

Find WeChat Channels accounts by name: the name has to match exactly, and every account of that name is returned, with its ID, name, signature, avatar, whether it is verified and what the verification says. The ID can be passed to the Channels profile, video list, live replay and other endpoints. About 1 item a call, 20 at most; $0.0600 per call. Errors and timeouts are not charged.

- Name: WeChat Channels account search API
- Request: `GET /v1/wechat_channels/users/search`
- Parameters: `query` (required), `view`, `fields`
- Whole contract: https://dataxapi.com/apis/wechat_channels/users/search.md

## wechat_channels.videos.metrics

Get the latest counts of a WeChat Channels video by its ID: likes, comments, shares, saves, with its description and account. They are not read at the moment of the call and may be a few hours old; the answer says when they were taken. Cheaper than the whole video. One object a call; $0.0150 per call. Errors and timeouts are not charged.

- Name: WeChat Channels video stats API
- Request: `GET /v1/wechat_channels/videos/metrics`
- Parameters: `id` (required), `view`, `fields`
- Whole contract: https://dataxapi.com/apis/wechat_channels/videos/metrics.md

## wechat_channels.comments.replies.list

Get a page of the replies under a comment on a WeChat Channels video, by the comment's and the video's IDs: text, replier, likes, time posted, IP location, which reply each answers. About 10 a page, with further pages. About 10 items a call, 20 at most; $0.0150 per call. Errors and timeouts are not charged.

- Name: WeChat Channels comment replies API
- Request: `GET /v1/wechat_channels/comments/replies/list`
- Parameters: `id` (required), `post_id` (required), `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/wechat_channels/comments/replies/list.md

## wechat_channels.users.live_replays.list

Get the replays of a WeChat Channels account's live streams by the account's ID, newest first, the first page only (up to 48 seen on one): title, time, length, cover, and the replay video's likes, comments, forwards and saves (the counts of the replay as a video, not the stream's viewers or the likes in its room). About 10 items a call, 50 at most; $0.0200 per call. Errors and timeouts are not charged.

- Name: WeChat Channels live replays API
- Request: `GET /v1/wechat_channels/users/live_replays/list`
- Parameters: `id` (required), `view`, `fields`
- Whole contract: https://dataxapi.com/apis/wechat_channels/users/live_replays/list.md
