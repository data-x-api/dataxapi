# WeChat Official Accounts API

8 endpoints read WeChat Official Accounts: articles, accounts, comments. From $0.0200 a call. No WeChat Official Accounts login and no cookie; a failed call is free.

> 8 endpoints. How to call, pay and handle errors is the same everywhere: https://dataxapi.com/llms.txt

Generated from catalog revision 0051cce45e9530b9, price book 22.

## wechat_mp.accounts.articles.list

Get a page of the articles a WeChat Official Account published, newest first: title, digest, link, time published. Each also says whether it was the lead article or one below, its format and cover. The page's articles tab by default; its videos or pictures tab when asked. About 10 items a call, 20 at most; $0.0200 per call. Errors, timeouts and objects that do not exist are not charged.

- Name: WeChat Official Account articles API
- Request: `GET /v1/wechat_mp/accounts/articles/list`
- Parameters: `id` (required), `tab`, `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/wechat_mp/accounts/articles/list.md

## wechat_mp.accounts.get

Get a WeChat Official Account by its original ID: name, IP location, number of original articles, the linked Channels account, whether it is banned. One object a call; $0.0200 per call. Errors, timeouts and objects that do not exist are not charged.

- Name: WeChat Official Account profile API
- Request: `GET /v1/wechat_mp/accounts/get`
- Parameters: `id` (required), `view`, `fields`
- Whole contract: https://dataxapi.com/apis/wechat_mp/accounts/get.md

## wechat_mp.articles.comments.list

Get a page of the featured comments on a WeChat Official Account article by its link: text, commenter, likes, reply count, time posted, IP location, whether it is pinned. About 20 items a call, 100 at most; $0.0200 per call. Errors and timeouts are not charged.

- Name: WeChat Official Account article comments API
- Request: `GET /v1/wechat_mp/articles/comments/list`
- Parameters: `url` (required), `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/wechat_mp/articles/comments/list.md

## wechat_mp.articles.get

Get one WeChat Official Account article by its link: title, text, time published, the account's name and IDs. It also says whether it was the lead article or one below, its format, cover, digest, byline, "read the original" link and the IP location it was posted from. One object a call; $0.0200 per call. Errors and timeouts are not charged.

- Name: WeChat Official Account article detail API
- Request: `GET /v1/wechat_mp/articles/get`
- Parameters: `url` (required), `view`, `fields`
- Whole contract: https://dataxapi.com/apis/wechat_mp/articles/get.md

## wechat_mp.articles.metrics

Get the current counts of a WeChat Official Account article by its long link: reads, likes, recommends, shares, saves, comments. One object a call; $0.0200 per call. Errors and timeouts are not charged.

- Name: WeChat Official Account article stats API
- Request: `GET /v1/wechat_mp/articles/metrics`
- Parameters: `url` (required), `view`, `fields`
- Whole contract: https://dataxapi.com/apis/wechat_mp/articles/metrics.md

## wechat_mp.comments.replies.list

Get the replies under one comment on a WeChat Official Account article, by the comment's ID and the article's link: text, replier, likes, time posted, IP location, which reply each answers. The first batch only; no further pages. About 3 items a call, 20 at most; $0.0200 per call. Errors and timeouts are not charged.

- Name: WeChat Official Account comment replies API
- Request: `GET /v1/wechat_mp/comments/replies/list`
- Parameters: `id` (required), `post_id` (required), `view`, `fields`
- Whole contract: https://dataxapi.com/apis/wechat_mp/comments/replies/list.md

## wechat_mp.accounts.search

Find WeChat Official Accounts by name or keyword, closest first: original ID, WeChat ID, name, avatar, owner, and a third-party database's estimates of active followers, lead-article reads and likes, and articles a week (not official, possibly months old). Charged per account; limit sets how many (5 by default, at most 15). Needing the ID and not the estimates, wechat.accounts.search, charged per call, costs less. About 5 items a call, 15 at most; $0.05635 per item returned, at least $0.0600 and at most $0.84525 a call. Errors and timeouts are not charged.

- Name: WeChat Official Account name search API
- Request: `GET /v1/wechat_mp/accounts/search`
- Parameters: `query` (required), `limit`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/wechat_mp/accounts/search.md

## wechat_mp.accounts.owner.get

Get who a WeChat Official Account is registered to, by its original ID: the owner's name, type, registration number, country, verification status, kind and date, and the account's registration date and authorised third-party services. One object a call; $0.1 per call. Errors and timeouts are not charged.

- Name: WeChat Official Account owner API
- Request: `GET /v1/wechat_mp/accounts/owner/get`
- Parameters: `id` (required), `view`, `fields`
- Whole contract: https://dataxapi.com/apis/wechat_mp/accounts/owner/get.md

## How this differs from WeChat's official Official Account platform

WeChat's developer documents for Official Accounts let an account's own server, or a third-party platform the account authorises, work on that account: publish, manage the comments on its own articles, read its followers. A third-party platform calls with the account's permission set and uses the account's own quota.

From July 2025, accounts of individuals, unverified company accounts and accounts that cannot be verified lose the publishing interfaces, the list of published articles among them. The comment interfaces work only for verified company accounts, on the account's own articles. Daily quotas include 500 calls for the follower list and 100 for the published list, and the server API directory has no interface to search articles or to read another account.

It is built for running your own account. DataXAPI reads any public Official Account's articles by link, an account's article list by its gh_ original ID, an article's reads, likes and featured comments, and WeChat Search results by keyword, with no WeChat account, verification or app of yours.

Read on 2026-10-29 in the platform's own documents:

- [WeChat developer documents: Official Account development guide](https://developers.weixin.qq.com/doc/subscription/guide/dev/)
- [WeChat developer documents: publishing](https://developers.weixin.qq.com/doc/subscription/guide/product/publish.html)
- [WeChat developer documents: comments](https://developers.weixin.qq.com/doc/subscription/guide/product/comments.html)
- [WeChat developer documents: listing comments](https://developers.weixin.qq.com/doc/subscription/api/leaving/api_listcomment.md)
- [WeChat developer documents: server API directory](https://developers.weixin.qq.com/doc/subscription/api/README.md)
- [WeChat developer documents: call limits](https://developers.weixin.qq.com/doc/subscription/guide/dev/api/limit.html)
