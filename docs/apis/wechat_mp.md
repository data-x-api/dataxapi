# WeChat Official Accounts API

6 endpoints read WeChat Official Accounts: articles, accounts, comments. From $0.0200 a call. No WeChat Official Accounts login and no cookie; a failed call is free.

> 6 endpoints. How to call, pay and handle errors is the same everywhere: https://dataxapi.com/llms.txt

Generated from catalog revision c48ce454ae6c4c65, price book 2.

## wechat_mp.accounts.articles.list

Get a page of the articles a WeChat Official Account published, newest first: title, digest, link, time published. About 10 items a call, 20 at most; $0.0200 per call. Errors, timeouts and objects that do not exist are not charged; an empty result is charged $0.0200.

- Name: WeChat Official Account articles API
- Request: `GET /v1/wechat_mp/accounts/articles/list`
- Parameters: `id` (required), `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/wechat_mp/accounts/articles/list.md

## wechat_mp.accounts.get

Get a WeChat Official Account by its original ID: name, IP location, number of original articles, the linked Channels account. One object a call; $0.0200 per call. Errors, timeouts and objects that do not exist are not charged.

- Name: WeChat Official Account profile API
- Request: `GET /v1/wechat_mp/accounts/get`
- Parameters: `id` (required), `view`, `fields`
- Whole contract: https://dataxapi.com/apis/wechat_mp/accounts/get.md

## wechat_mp.articles.comments.list

Get a page of the featured comments on a WeChat Official Account article by its link: text, commenter, likes, reply count, time posted, IP location. Up to 20 items a call; $0.0200 per call. Errors, timeouts and objects that do not exist are not charged; an empty result is charged $0.0200.

- Name: WeChat Official Account article comments API
- Request: `GET /v1/wechat_mp/articles/comments/list`
- Parameters: `url` (required), `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/wechat_mp/articles/comments/list.md

## wechat_mp.articles.get

Get one WeChat Official Account article by its link: title, text, time published, the account's name and IDs. One object a call; $0.0200 per call. Errors, timeouts and objects that do not exist are not charged.

- Name: WeChat Official Account article detail API
- Request: `GET /v1/wechat_mp/articles/get`
- Parameters: `url` (required), `view`, `fields`
- Whole contract: https://dataxapi.com/apis/wechat_mp/articles/get.md

## wechat_mp.articles.metrics

Get the current counts of a WeChat Official Account article by its long link: reads, likes, recommends, shares, saves, comments. One object a call; $0.0200 per call. Errors, timeouts and objects that do not exist are not charged.

- Name: WeChat Official Account article stats API
- Request: `GET /v1/wechat_mp/articles/metrics`
- Parameters: `url` (required), `view`, `fields`
- Whole contract: https://dataxapi.com/apis/wechat_mp/articles/metrics.md

## wechat_mp.comments.replies.list

Get the replies under one comment on a WeChat Official Account article, by the comment's ID and the article's link: text, replier, likes, time posted, IP location, which reply each answers. The first batch only; no further pages. About 3 items a call, 20 at most; $0.0200 per call. Errors, timeouts and objects that do not exist are not charged; an empty result is charged $0.0200.

- Name: WeChat Official Account comment replies API
- Request: `GET /v1/wechat_mp/comments/replies/list`
- Parameters: `id` (required), `post_id` (required), `view`, `fields`
- Whole contract: https://dataxapi.com/apis/wechat_mp/comments/replies/list.md
