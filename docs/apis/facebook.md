# Facebook API

4 endpoints read Facebook: posts, pages. From $0.0020 a call. No Facebook login and no cookie; a failed call is free.

> 4 endpoints. How to call, pay and handle errors is the same everywhere: https://dataxapi.com/llms.txt

Generated from catalog revision c48ce454ae6c4c65, price book 2.

## facebook.pages.get

Get a public Facebook page by handle, ID or link: name, intro, follower count, likes, category, website, creation date. One object a call; $0.0020 per call. Errors, timeouts and objects that do not exist are not charged.

- Name: Facebook page profile API
- Request: `GET /v1/facebook/pages/get`
- Parameters: `id`, `username`, `url`, `view`, `fields`; give exactly one of id, username, url
- Whole contract: https://dataxapi.com/apis/facebook/pages/get.md

## facebook.pages.posts.list

Get a page of the posts a Facebook page published, by page ID, handle or link: text, time, reaction count, comment count, images; shares and views come from the post capability. Three posts a page, with older pages behind a cursor. Up to 3 items a call; $0.0020 per call. Errors, timeouts and objects that do not exist are not charged; an empty result is charged $0.0020.

- Name: Facebook page posts API
- Request: `GET /v1/facebook/pages/posts/list`
- Parameters: `id`, `username`, `url`, `cursor`, `view`, `fields`; give exactly one of id, username, url
- Whole contract: https://dataxapi.com/apis/facebook/pages/posts/list.md

## facebook.posts.comments.list

Get a page of the comments on a Facebook post or reel by the post's ID: text, commenter, reactions, reply count, time posted. Up to 10 items a call; $0.0020 per call. Errors, timeouts and objects that do not exist are not charged; an empty result is charged $0.0020.

- Name: Facebook post comments API
- Request: `GET /v1/facebook/posts/comments/list`
- Parameters: `id` (required), `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/facebook/posts/comments/list.md

## facebook.posts.get

Get one Facebook post or reel by its link: text, author, time, reaction count, comment count, shares, views, images. One object a call; $0.0020 per call. Errors, timeouts and objects that do not exist are not charged.

- Name: Facebook post detail API
- Request: `GET /v1/facebook/posts/get`
- Parameters: `url` (required), `view`, `fields`
- Whole contract: https://dataxapi.com/apis/facebook/posts/get.md
