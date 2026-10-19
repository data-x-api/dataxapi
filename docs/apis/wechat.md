# WeChat Search API

1 endpoint reads WeChat Search: posts. From $0.0200 a call. No WeChat Search login and no cookie; a failed call is free.

> 1 endpoint. How to call, pay and handle errors is the same everywhere: https://dataxapi.com/llms.txt

Generated from catalog revision c48ce454ae6c4c65, price book 2.

## wechat.posts.search

Get a page of WeChat Search results for search terms: Official Account articles and Channels videos mixed, each saying in type whether it is an article or a video; by relevance, newest or hottest, filtered by time posted: title or description, the source account's name, time published, an article's link, a video's likes and saves. WeChat Search gives no account ID. About 20 items a call, 30 at most; $0.0200 per call. Errors and timeouts are not charged; an empty result is charged $0.0200.

- Name: WeChat Search articles and videos API
- Request: `GET /v1/wechat/posts/search`
- Parameters: `query` (required), `sort`, `published_within`, `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/wechat/posts/search.md
