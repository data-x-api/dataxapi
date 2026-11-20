# WeChat Search API

6 endpoints read WeChat Search: posts, accounts, keywords, index, miniprograms. From $0.0200 a call. No WeChat Search login and no cookie; a failed call is free.

> 6 endpoints. How to call, pay and handle errors is the same everywhere: https://dataxapi.com/llms.txt

Generated from catalog revision 720fc3ea8dadb865, price book 19.

## wechat.posts.search

Get a page of WeChat Search results for search terms: Official Account articles and Channels videos mixed, each saying in type whether it is an article or a video; by relevance, newest or hottest, filtered by time posted, or articles only or videos only: title or description, the source account's name, time published, an article's link (with a band of reads on some), a video's likes and saves. WeChat Search gives no account ID. About 20 items a call, 30 at most; $0.0200 per call. Errors and timeouts are not charged.

- Name: WeChat Search articles and videos API
- Request: `GET /v1/wechat/posts/search`
- Parameters: `query` (required), `sort`, `published_within`, `type`, `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/wechat/posts/search.md

## wechat.backup.posts.search

The backup of wechat.posts.search: the same parameters and result, priced on its own. Videos come without saves. About 20 items a call, 30 at most; $0.1 per call. Errors and timeouts are not charged.

- Name: WeChat Search articles and videos (backup) API
- Request: `GET /v1/wechat/backup/posts/search`
- Parameters: `query` (required), `sort`, `published_within`, `type`, `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/wechat/backup/posts/search.md

## wechat.accounts.search

Find WeChat Official Accounts and service accounts for search terms through WeChat Search, closest first, possibly followed by less related ones: original ID, WeChat ID, name, bio, avatar, whether verified, owner, number of original articles. Charged per call; no followers or reads, for estimates of those use wechat_mp.accounts.search. About 8 items a call, 14 at most; $0.0200 per call. Errors and timeouts are not charged.

- Name: WeChat Official Account live search API
- Request: `GET /v1/wechat/accounts/search`
- Parameters: `query` (required), `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/wechat/accounts/search.md

## wechat.index.keywords.history

Get a keyword's WeChat Index over the last 30 days, one figure a day. The WeChat Index is WeChat's score of attention across its search, articles, Moments and more, not a count of searches, and is not comparable with Douyin's or Xiaohongshu's; days are calendar days in China time (UTC+8). Up to 1 items a call; $0.1 per call. Errors and timeouts are not charged.

- Name: WeChat Index API
- Request: `GET /v1/wechat/index/keywords/history`
- Parameters: `keyword` (required), `view`, `fields`
- Whole contract: https://dataxapi.com/apis/wechat/index/keywords/history.md

## wechat.keywords.related

Get the suggestions WeChat Search lists in its search box for a keyword, in the order it lists them, about 10 at a time. The words and their places only, with no index. About 9 items a call, 20 at most; $0.1 per call. Errors and timeouts are not charged.

- Name: WeChat Search suggestions API
- Request: `GET /v1/wechat/keywords/related`
- Parameters: `keyword` (required), `view`, `fields`
- Whole contract: https://dataxapi.com/apis/wechat/keywords/related.md

## wechat.miniprograms.search

Find WeChat mini programs for search terms through WeChat Search, the first page (about 25): name, description, icon, original ID and AppID, the owner's name and whether it is verified, how many used it lately as the platform shows it, and whether it is a mini game. About 25 items a call, 40 at most; $0.1 per call. Errors and timeouts are not charged.

- Name: WeChat mini program search API
- Request: `GET /v1/wechat/miniprograms/search`
- Parameters: `query` (required), `view`, `fields`
- Whole contract: https://dataxapi.com/apis/wechat/miniprograms/search.md
