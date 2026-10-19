# Data API catalog

Posts, comments, accounts, trends, creator rate cards and ad libraries: 207 endpoints on 21 platforms, one key, one response shape. From $0.0003 a call, each endpoint at its own price, and a failed call is free.

## [Douyin API](https://dataxapi.com/apis/douyin.md)

34 endpoints · from $0.0020

### Videos (6)

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [Douyin video search](https://dataxapi.com/apis/douyin/videos/search.md) | `GET /v1/douyin/videos/search` | Post list | $0.0200 / call |
| [Douyin video detail](https://dataxapi.com/apis/douyin/videos/get.md) | `GET /v1/douyin/videos/get` | Post | $0.0020 / call |
| [Douyin video comments](https://dataxapi.com/apis/douyin/videos/comments/list.md) | `GET /v1/douyin/videos/comments/list` | Comment list | $0.0020 / call |
| [Douyin video play count](https://dataxapi.com/apis/douyin/videos/metrics.md) | `GET /v1/douyin/videos/metrics` | Post | $0.0020 / call |
| [Douyin related videos](https://dataxapi.com/apis/douyin/videos/related.md) | `GET /v1/douyin/videos/related` | Post list | $0.0020 / call |
| [Douyin trending videos](https://dataxapi.com/apis/douyin/videos/trending.md) | `GET /v1/douyin/videos/trending` | Post list | $0.0020 / call |

### Hashtags (1)

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [Douyin hashtag videos](https://dataxapi.com/apis/douyin/hashtags/videos/list.md) | `GET /v1/douyin/hashtags/videos/list` | Post list | $0.0020 / call |

### Users (4)

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [Douyin user search](https://dataxapi.com/apis/douyin/users/search.md) | `GET /v1/douyin/users/search` | Account list | $0.0020 / call |
| [Douyin user profile](https://dataxapi.com/apis/douyin/users/get.md) | `GET /v1/douyin/users/get` | Account | $0.0020 / call |
| [Douyin creator engagement and follower trends](https://dataxapi.com/apis/douyin/users/history.md) | `GET /v1/douyin/users/history` | Account recent change | $0.0020 / call |
| [Douyin user videos](https://dataxapi.com/apis/douyin/users/videos/list.md) | `GET /v1/douyin/users/videos/list` | Post list | $0.0020 / call |

### Comments (1)

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [Douyin comment replies](https://dataxapi.com/apis/douyin/comments/replies/list.md) | `GET /v1/douyin/comments/replies/list` | Comment list | $0.0020 / call |

### Trends (1)

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [Douyin hot search board](https://dataxapi.com/apis/douyin/trends/list.md) | `GET /v1/douyin/trends/list` | Trend list | $0.0020 / call |

### [trend-index](https://dataxapi.com/apis/douyin/index.md) (10)

Douyin's official index tool (巨量算数, Juliang Suanshu): day-by-day keyword and brand indexes, who searches a keyword, related keywords, live hot topics and creator figures.

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [Douyin trend-index keyword hot videos](https://dataxapi.com/apis/douyin/index/videos/search.md) | `GET /v1/douyin/index/videos/search` | Post list | $0.0020 / call |
| [Douyin trend-index creator follower profile](https://dataxapi.com/apis/douyin/index/creators/audience/get.md) | `GET /v1/douyin/index/creators/audience/get` | Audience | $0.0020 / call |
| [Douyin trend-index keyword audience](https://dataxapi.com/apis/douyin/index/keywords/audience/get.md) | `GET /v1/douyin/index/keywords/audience/get` | Keyword audience | $0.0020 / call |
| [Douyin trend-index brand trends](https://dataxapi.com/apis/douyin/index/brands/history.md) | `GET /v1/douyin/index/brands/history` | Brand index history | $0.0020 / call |
| [Douyin trend-index brand comparison](https://dataxapi.com/apis/douyin/index/brands/metrics.md) | `GET /v1/douyin/index/brands/metrics` | Brand index averages | $0.0020 / call |
| [Douyin trend-index creator core metrics](https://dataxapi.com/apis/douyin/index/creators/metrics.md) | `GET /v1/douyin/index/creators/metrics` | Douyin trend-index creator metrics | $0.0020 / call |
| [Douyin trend-index creator top videos](https://dataxapi.com/apis/douyin/index/creators/videos/list.md) | `GET /v1/douyin/index/creators/videos/list` | Post list | $0.0020 / call |
| [Douyin trend-index keyword trends](https://dataxapi.com/apis/douyin/index/keywords/history.md) | `GET /v1/douyin/index/keywords/history` | Keyword index history list | $0.0060 / call |
| [Douyin trend-index related keywords](https://dataxapi.com/apis/douyin/index/keywords/related.md) | `GET /v1/douyin/index/keywords/related` | Related keyword list | $0.0020 / call |
| [Douyin trend-index live hot topics](https://dataxapi.com/apis/douyin/index/trends/list.md) | `GET /v1/douyin/index/trends/list` | Trend list | $0.0020 / call |

### [Xingtu](https://dataxapi.com/apis/douyin/xingtu.md) (11)

Douyin's official creator marketplace (星图): creator search, rate cards, audience profiles, reach and conversion figures.

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [Douyin Xingtu creator search](https://dataxapi.com/apis/douyin/xingtu/creators/search.md) | `GET /v1/douyin/xingtu/creators/search` | Creator list | $0.0040 / call |
| [Douyin Xingtu creator audience](https://dataxapi.com/apis/douyin/xingtu/creators/audience/get.md) | `GET /v1/douyin/xingtu/creators/audience/get` | Audience | $0.0040 / call |
| [Douyin Xingtu creator content mix](https://dataxapi.com/apis/douyin/xingtu/creators/content_mix/get.md) | `GET /v1/douyin/xingtu/creators/content_mix/get` | Xingtu creator content mix | $0.0040 / call |
| [Douyin Xingtu creator conversion](https://dataxapi.com/apis/douyin/xingtu/creators/conversion/get.md) | `GET /v1/douyin/xingtu/creators/conversion/get` | Xingtu creator conversion | $0.0040 / call |
| [Douyin Xingtu creator profile](https://dataxapi.com/apis/douyin/xingtu/creators/get.md) | `GET /v1/douyin/xingtu/creators/get` | Creator | $0.0040 / call |
| [Douyin Xingtu creator content keywords](https://dataxapi.com/apis/douyin/xingtu/creators/keywords/get.md) | `GET /v1/douyin/xingtu/creators/keywords/get` | Xingtu creator content keywords | $0.0020 / call |
| [Douyin Xingtu creator rate card](https://dataxapi.com/apis/douyin/xingtu/creators/rates/get.md) | `GET /v1/douyin/xingtu/creators/rates/get` | Creator rates | $0.0400 / call |
| [Douyin Xingtu creator index scores](https://dataxapi.com/apis/douyin/xingtu/creators/scores/get.md) | `GET /v1/douyin/xingtu/creators/scores/get` | Xingtu creator scores | $0.0080 / call |
| [Douyin Xingtu marketing calendar](https://dataxapi.com/apis/douyin/xingtu/campaigns/list.md) | `GET /v1/douyin/xingtu/campaigns/list` | Xingtu campaign list | $0.0040 / call |
| [Douyin Xingtu creator metrics](https://dataxapi.com/apis/douyin/xingtu/creators/metrics.md) | `GET /v1/douyin/xingtu/creators/metrics` | Xingtu creator metrics | $0.0040 / call |
| [Douyin Xingtu creator video performance](https://dataxapi.com/apis/douyin/xingtu/creators/videos/list.md) | `GET /v1/douyin/xingtu/creators/videos/list` | Xingtu creator video list | $0.0040 / call |

## [Bilibili API](https://dataxapi.com/apis/bilibili.md)

8 endpoints · from $0.0020

### Videos (4)

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [Bilibili video search](https://dataxapi.com/apis/bilibili/videos/search.md) | `GET /v1/bilibili/videos/search` | Post list | $0.0020 / call |
| [Bilibili video detail](https://dataxapi.com/apis/bilibili/videos/get.md) | `GET /v1/bilibili/videos/get` | Post | $0.0020 / call |
| [Bilibili video comments](https://dataxapi.com/apis/bilibili/videos/comments/list.md) | `GET /v1/bilibili/videos/comments/list` | Comment list | $0.0020 / call |
| [Bilibili popular videos](https://dataxapi.com/apis/bilibili/videos/trending.md) | `GET /v1/bilibili/videos/trending` | Post list | $0.0020 / call |

### Users (2)

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [Bilibili user profile](https://dataxapi.com/apis/bilibili/users/get.md) | `GET /v1/bilibili/users/get` | Account | $0.0020 / call |
| [Bilibili user videos](https://dataxapi.com/apis/bilibili/users/videos/list.md) | `GET /v1/bilibili/users/videos/list` | Post list | $0.0020 / call |

### Comments (1)

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [Bilibili comment replies](https://dataxapi.com/apis/bilibili/comments/replies/list.md) | `GET /v1/bilibili/comments/replies/list` | Comment list | $0.0020 / call |

### Trends (1)

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [Bilibili hot searches](https://dataxapi.com/apis/bilibili/trends/list.md) | `GET /v1/bilibili/trends/list` | Trend list | $0.0020 / call |

## [Kuaishou API](https://dataxapi.com/apis/kuaishou.md)

8 endpoints · from $0.0020

### Videos (3)

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [Kuaishou video search](https://dataxapi.com/apis/kuaishou/videos/search.md) | `GET /v1/kuaishou/videos/search` | Post list | $0.0200 / call |
| [Kuaishou video detail](https://dataxapi.com/apis/kuaishou/videos/get.md) | `GET /v1/kuaishou/videos/get` | Post | $0.0020 / call |
| [Kuaishou video comments](https://dataxapi.com/apis/kuaishou/videos/comments/list.md) | `GET /v1/kuaishou/videos/comments/list` | Comment list | $0.0020 / call |

### Users (3)

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [Kuaishou user search](https://dataxapi.com/apis/kuaishou/users/search.md) | `GET /v1/kuaishou/users/search` | Account list | $0.0200 / call |
| [Kuaishou user profile](https://dataxapi.com/apis/kuaishou/users/get.md) | `GET /v1/kuaishou/users/get` | Account | $0.0200 / call |
| [Kuaishou user videos](https://dataxapi.com/apis/kuaishou/users/videos/list.md) | `GET /v1/kuaishou/users/videos/list` | Post list | $0.0200 / call |

### Comments (1)

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [Kuaishou comment replies](https://dataxapi.com/apis/kuaishou/comments/replies/list.md) | `GET /v1/kuaishou/comments/replies/list` | Comment list | $0.0020 / call |

### Trends (1)

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [Kuaishou hot list](https://dataxapi.com/apis/kuaishou/trends/list.md) | `GET /v1/kuaishou/trends/list` | Trend list | $0.0020 / call |

## [Telegram API](https://dataxapi.com/apis/telegram.md)

3 endpoints · from $0.0020

### Channels (2)

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [Telegram channel profile](https://dataxapi.com/apis/telegram/channels/get.md) | `GET /v1/telegram/channels/get` | Account | $0.0020 / call |
| [Telegram channel messages](https://dataxapi.com/apis/telegram/channels/messages/list.md) | `GET /v1/telegram/channels/messages/list` | Post list | $0.0020 / call |

### Messages (1)

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [Telegram message detail](https://dataxapi.com/apis/telegram/messages/get.md) | `GET /v1/telegram/messages/get` | Post | $0.0020 / call |

## [X (Twitter) API](https://dataxapi.com/apis/x.md)

21 endpoints · from $0.0003

### Posts (7)

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [X post search](https://dataxapi.com/apis/x/posts/search.md) | `GET /v1/x/posts/search` | Post list | $0.0020 / call |
| [X article detail](https://dataxapi.com/apis/x/posts/article/get.md) | `GET /v1/x/posts/article/get` | Post | $0.0020 / call |
| [X post detail](https://dataxapi.com/apis/x/posts/get.md) | `GET /v1/x/posts/get` | Post | $0.0003 / call |
| [X video transcript](https://dataxapi.com/apis/x/posts/transcript/get.md) | `GET /v1/x/posts/transcript/get` | Transcript | $0.0020 / call |
| [X post quotes](https://dataxapi.com/apis/x/posts/quotes/list.md) | `GET /v1/x/posts/quotes/list` | Post list | $0.0003 / item |
| [X post replies](https://dataxapi.com/apis/x/posts/replies/list.md) | `GET /v1/x/posts/replies/list` | Post list | $0.0020 / call |
| [X post retweeters](https://dataxapi.com/apis/x/posts/retweeters/list.md) | `GET /v1/x/posts/retweeters/list` | Account list | $0.0020 / call |

### Users (6)

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [X user search](https://dataxapi.com/apis/x/users/search.md) | `GET /v1/x/users/search` | Account list | $0.0004 / item |
| [X user profile](https://dataxapi.com/apis/x/users/get.md) | `GET /v1/x/users/get` | Account | $0.0004 / item |
| [X user followers](https://dataxapi.com/apis/x/users/followers/list.md) | `GET /v1/x/users/followers/list` | Account list | $0.0001 / item |
| [X user following](https://dataxapi.com/apis/x/users/following/list.md) | `GET /v1/x/users/following/list` | Account list | $0.0001 / item |
| [X user mentions](https://dataxapi.com/apis/x/users/mentions/list.md) | `GET /v1/x/users/mentions/list` | Post list | $0.0003 / item |
| [X user posts](https://dataxapi.com/apis/x/users/posts/list.md) | `GET /v1/x/users/posts/list` | Post list | $0.0020 / call |

### Threads (1)

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [X thread context](https://dataxapi.com/apis/x/threads/posts/list.md) | `GET /v1/x/threads/posts/list` | Post list | $0.0003 / item |

### Trends (1)

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [X trends](https://dataxapi.com/apis/x/trends/list.md) | `GET /v1/x/trends/list` | Trend list | $0.0090 / call |

### [X Communities](https://dataxapi.com/apis/x/communities.md) (3)

Communities on X: a community's profile, its posts and its members.

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [X community profile](https://dataxapi.com/apis/x/communities/get.md) | `GET /v1/x/communities/get` | Community | $0.0004 / call |
| [X community members](https://dataxapi.com/apis/x/communities/members/list.md) | `GET /v1/x/communities/members/list` | Account list | $0.0004 / item |
| [X community posts](https://dataxapi.com/apis/x/communities/posts/list.md) | `GET /v1/x/communities/posts/list` | Post list | $0.0003 / item |

### [X Lists](https://dataxapi.com/apis/x/lists.md) (3)

Lists on X: the posts of a list, its members and its followers.

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [X list followers](https://dataxapi.com/apis/x/lists/followers/list.md) | `GET /v1/x/lists/followers/list` | Account list | $0.0004 / item |
| [X list members](https://dataxapi.com/apis/x/lists/members/list.md) | `GET /v1/x/lists/members/list` | Account list | $0.0004 / item |
| [X list posts](https://dataxapi.com/apis/x/lists/posts/list.md) | `GET /v1/x/lists/posts/list` | Post list | $0.0020 / call |

## [Facebook API](https://dataxapi.com/apis/facebook.md)

4 endpoints · from $0.0020

### Posts (2)

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [Facebook post detail](https://dataxapi.com/apis/facebook/posts/get.md) | `GET /v1/facebook/posts/get` | Post | $0.0020 / call |
| [Facebook post comments](https://dataxapi.com/apis/facebook/posts/comments/list.md) | `GET /v1/facebook/posts/comments/list` | Comment list | $0.0020 / call |

### Pages (2)

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [Facebook page profile](https://dataxapi.com/apis/facebook/pages/get.md) | `GET /v1/facebook/pages/get` | Account | $0.0020 / call |
| [Facebook page posts](https://dataxapi.com/apis/facebook/pages/posts/list.md) | `GET /v1/facebook/pages/posts/list` | Post list | $0.0020 / call |

## [Google Ads API](https://dataxapi.com/apis/google.md)

3 endpoints · from $0.0020

### Ad library (1)

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [Google ad detail](https://dataxapi.com/apis/google/ads/get.md) | `GET /v1/google/ads/get` | Ad | $0.0020 / call |

### Advertisers (2)

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [Google advertiser search](https://dataxapi.com/apis/google/advertisers/search.md) | `GET /v1/google/advertisers/search` | Advertiser list | $0.0020 / call |
| [Google advertiser's ads](https://dataxapi.com/apis/google/advertisers/ads/list.md) | `GET /v1/google/advertisers/ads/list` | Ad list | $0.0020 / call |

## [LinkedIn API](https://dataxapi.com/apis/linkedin.md)

7 endpoints · from $0.0020

### Posts (3)

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [LinkedIn post search](https://dataxapi.com/apis/linkedin/posts/search.md) | `GET /v1/linkedin/posts/search` | Post list | $0.0020 / call |
| [LinkedIn post detail](https://dataxapi.com/apis/linkedin/posts/get.md) | `GET /v1/linkedin/posts/get` | Post | $0.0020 / call |
| [LinkedIn video transcript](https://dataxapi.com/apis/linkedin/posts/transcript/get.md) | `GET /v1/linkedin/posts/transcript/get` | Transcript | $0.0020 / call |

### Companies (2)

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [LinkedIn company page](https://dataxapi.com/apis/linkedin/companies/get.md) | `GET /v1/linkedin/companies/get` | Account | $0.0020 / call |
| [LinkedIn company posts](https://dataxapi.com/apis/linkedin/companies/posts/list.md) | `GET /v1/linkedin/companies/posts/list` | Post list | $0.0020 / call |

### Ad library (2)

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [LinkedIn Ad Library search](https://dataxapi.com/apis/linkedin/ads/search.md) | `GET /v1/linkedin/ads/search` | Ad list | $0.0020 / call |
| [LinkedIn ad detail](https://dataxapi.com/apis/linkedin/ads/get.md) | `GET /v1/linkedin/ads/get` | Ad | $0.0020 / call |

## [Meta Ad Library API](https://dataxapi.com/apis/meta.md)

5 endpoints · from $0.0020

### Ad library (3)

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [Meta Ad Library search](https://dataxapi.com/apis/meta/ads/search.md) | `GET /v1/meta/ads/search` | Ad list | $0.0020 / call |
| [Meta ad detail](https://dataxapi.com/apis/meta/ads/get.md) | `GET /v1/meta/ads/get` | Ad | $0.0020 / call |
| [Meta ad video transcript](https://dataxapi.com/apis/meta/ads/transcript/get.md) | `GET /v1/meta/ads/transcript/get` | Transcript | $0.0020 / call |

### Advertisers (2)

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [Meta advertiser search](https://dataxapi.com/apis/meta/advertisers/search.md) | `GET /v1/meta/advertisers/search` | Advertiser list | $0.0020 / call |
| [Meta advertiser's ads](https://dataxapi.com/apis/meta/advertisers/ads/list.md) | `GET /v1/meta/advertisers/ads/list` | Ad list | $0.0020 / call |

## [Threads API](https://dataxapi.com/apis/threads.md)

4 endpoints · from $0.0020

### Posts (2)

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [Threads post search](https://dataxapi.com/apis/threads/posts/search.md) | `GET /v1/threads/posts/search` | Post list | $0.0020 / call |
| [Threads post detail](https://dataxapi.com/apis/threads/posts/get.md) | `GET /v1/threads/posts/get` | Post | $0.0020 / call |

### Users (2)

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [Threads user profile](https://dataxapi.com/apis/threads/users/get.md) | `GET /v1/threads/users/get` | Account | $0.0020 / call |
| [Threads user posts](https://dataxapi.com/apis/threads/users/posts/list.md) | `GET /v1/threads/users/posts/list` | Post list | $0.0020 / call |

## [Instagram API](https://dataxapi.com/apis/instagram.md)

8 endpoints · from $0.0020

### Posts (3)

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [Instagram post detail](https://dataxapi.com/apis/instagram/posts/get.md) | `GET /v1/instagram/posts/get` | Post | $0.0020 / call |
| [Instagram video transcript](https://dataxapi.com/apis/instagram/posts/transcript/get.md) | `GET /v1/instagram/posts/transcript/get` | Transcript | $0.0020 / call |
| [Instagram post comments](https://dataxapi.com/apis/instagram/posts/comments/list.md) | `GET /v1/instagram/posts/comments/list` | Comment list | $0.0020 / call |

### Hashtags (1)

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [Instagram hashtag posts](https://dataxapi.com/apis/instagram/hashtags/posts/list.md) | `GET /v1/instagram/hashtags/posts/list` | Post list | $0.0020 / call |

### Users (3)

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [Instagram user search](https://dataxapi.com/apis/instagram/users/search.md) | `GET /v1/instagram/users/search` | Account list | $0.0040 / call |
| [Instagram user profile](https://dataxapi.com/apis/instagram/users/get.md) | `GET /v1/instagram/users/get` | Account | $0.0020 / call |
| [Instagram user posts](https://dataxapi.com/apis/instagram/users/posts/list.md) | `GET /v1/instagram/users/posts/list` | Post list | $0.0020 / call |

### Comments (1)

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [Instagram comment replies](https://dataxapi.com/apis/instagram/comments/replies/list.md) | `GET /v1/instagram/comments/replies/list` | Comment list | $0.0020 / call |

## [TikTok API](https://dataxapi.com/apis/tiktok.md)

18 endpoints · from $0.0020

### Videos (4)

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [TikTok video search](https://dataxapi.com/apis/tiktok/videos/search.md) | `GET /v1/tiktok/videos/search` | Post list | $0.0020 / call |
| [TikTok video detail](https://dataxapi.com/apis/tiktok/videos/get.md) | `GET /v1/tiktok/videos/get` | Post | $0.0020 / call |
| [TikTok video transcript](https://dataxapi.com/apis/tiktok/videos/transcript/get.md) | `GET /v1/tiktok/videos/transcript/get` | Transcript | $0.0020 / call |
| [TikTok video comments](https://dataxapi.com/apis/tiktok/videos/comments/list.md) | `GET /v1/tiktok/videos/comments/list` | Comment list | $0.0020 / call |

### Hashtags (1)

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [TikTok hashtag videos](https://dataxapi.com/apis/tiktok/hashtags/videos/list.md) | `GET /v1/tiktok/hashtags/videos/list` | Post list | $0.0020 / call |

### Users (4)

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [TikTok user search](https://dataxapi.com/apis/tiktok/users/search.md) | `GET /v1/tiktok/users/search` | Account list | $0.0020 / call |
| [TikTok user profile](https://dataxapi.com/apis/tiktok/users/get.md) | `GET /v1/tiktok/users/get` | Account | $0.0020 / call |
| [TikTok user followers](https://dataxapi.com/apis/tiktok/users/followers/list.md) | `GET /v1/tiktok/users/followers/list` | Account list | $0.0020 / call |
| [TikTok user videos](https://dataxapi.com/apis/tiktok/users/videos/list.md) | `GET /v1/tiktok/users/videos/list` | Post list | $0.0020 / call |

### Comments (1)

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [TikTok comment replies](https://dataxapi.com/apis/tiktok/comments/replies/list.md) | `GET /v1/tiktok/comments/replies/list` | Comment list | $0.0020 / call |

### Ad library (2)

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [TikTok Ads Library search](https://dataxapi.com/apis/tiktok/ads/search.md) | `GET /v1/tiktok/ads/search` | Ad list | $0.0020 / call |
| [TikTok Ads Library ad detail](https://dataxapi.com/apis/tiktok/ads/get.md) | `GET /v1/tiktok/ads/get` | Ad | $0.0020 / call |

### [Creative Center](https://dataxapi.com/apis/tiktok/creative_center.md) (2)

The Top Ads of TikTok's Creative Center: search the ads running on the list and read one ad with its performance figures.

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [TikTok Creative Center Top Ads search](https://dataxapi.com/apis/tiktok/creative_center/ads/search.md) | `GET /v1/tiktok/creative_center/ads/search` | Ad list | $0.0020 / call |
| [TikTok Creative Center Top Ad detail](https://dataxapi.com/apis/tiktok/creative_center/ads/get.md) | `GET /v1/tiktok/creative_center/ads/get` | Ad | $0.0020 / call |

### [TikTok Shop](https://dataxapi.com/apis/tiktok/shop.md) (4)

Public product data of TikTok Shop: product search, product details, buyer reviews and a seller's products.

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [TikTok Shop product search](https://dataxapi.com/apis/tiktok/shop/products/search.md) | `GET /v1/tiktok/shop/products/search` | Product list | $0.0020 / call |
| [TikTok Shop product detail](https://dataxapi.com/apis/tiktok/shop/products/get.md) | `GET /v1/tiktok/shop/products/get` | Product | $0.0020 / call |
| [TikTok Shop product reviews](https://dataxapi.com/apis/tiktok/shop/products/reviews/list.md) | `GET /v1/tiktok/shop/products/reviews/list` | Review list | $0.0020 / call |
| [TikTok Shop seller products](https://dataxapi.com/apis/tiktok/shop/sellers/products/list.md) | `GET /v1/tiktok/shop/sellers/products/list` | Product list | $0.0020 / call |

## [Weibo API](https://dataxapi.com/apis/weibo.md)

10 endpoints · from $0.0020

### Posts (4)

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [Weibo realtime search](https://dataxapi.com/apis/weibo/posts/search.md) | `GET /v1/weibo/posts/search` | Post list | $0.0020 / call |
| [Weibo post detail](https://dataxapi.com/apis/weibo/posts/get.md) | `GET /v1/weibo/posts/get` | Post | $0.0020 / call |
| [Weibo post comments](https://dataxapi.com/apis/weibo/posts/comments/list.md) | `GET /v1/weibo/posts/comments/list` | Comment list | $0.0020 / call |
| [Weibo post likers](https://dataxapi.com/apis/weibo/posts/likers/list.md) | `GET /v1/weibo/posts/likers/list` | Account list | $0.0020 / call |

### Users (4)

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [Weibo user search](https://dataxapi.com/apis/weibo/users/search.md) | `GET /v1/weibo/users/search` | Account list | $0.0020 / call |
| [Weibo user profile](https://dataxapi.com/apis/weibo/users/get.md) | `GET /v1/weibo/users/get` | Account | $0.0020 / call |
| [Weibo user followers](https://dataxapi.com/apis/weibo/users/followers/list.md) | `GET /v1/weibo/users/followers/list` | Account list | $0.0020 / call |
| [Weibo user posts](https://dataxapi.com/apis/weibo/users/posts/list.md) | `GET /v1/weibo/users/posts/list` | Post list | $0.0020 / call |

### Comments (1)

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [Weibo comment replies](https://dataxapi.com/apis/weibo/comments/replies/list.md) | `GET /v1/weibo/comments/replies/list` | Comment list | $0.0020 / call |

### Trends (1)

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [Weibo hot search board](https://dataxapi.com/apis/weibo/trends/list.md) | `GET /v1/weibo/trends/list` | Trend list | $0.0020 / call |

## [Xiaohongshu (RedNote) API](https://dataxapi.com/apis/xiaohongshu.md)

21 endpoints · from $0.0200

### Notes (3)

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [Xiaohongshu note search](https://dataxapi.com/apis/xiaohongshu/notes/search.md) | `GET /v1/xiaohongshu/notes/search` | Post list | $0.0200 / call |
| [Xiaohongshu note detail](https://dataxapi.com/apis/xiaohongshu/notes/get.md) | `GET /v1/xiaohongshu/notes/get` | Post | $0.0200 / call |
| [Xiaohongshu note comments](https://dataxapi.com/apis/xiaohongshu/notes/comments/list.md) | `GET /v1/xiaohongshu/notes/comments/list` | Comment list | $0.0200 / call |

### Images (1)

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [Xiaohongshu image search](https://dataxapi.com/apis/xiaohongshu/images/search.md) | `GET /v1/xiaohongshu/images/search` | Post list | $0.0200 / call |

### Topics (2)

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [Xiaohongshu topic detail](https://dataxapi.com/apis/xiaohongshu/topics/get.md) | `GET /v1/xiaohongshu/topics/get` | Topic | $0.0200 / call |
| [Xiaohongshu topic notes](https://dataxapi.com/apis/xiaohongshu/topics/notes/list.md) | `GET /v1/xiaohongshu/topics/notes/list` | Post list | $0.0200 / call |

### Users (3)

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [Xiaohongshu user search](https://dataxapi.com/apis/xiaohongshu/users/search.md) | `GET /v1/xiaohongshu/users/search` | Account list | $0.0200 / call |
| [Xiaohongshu user profile](https://dataxapi.com/apis/xiaohongshu/users/get.md) | `GET /v1/xiaohongshu/users/get` | Account | $0.0200 / call |
| [Xiaohongshu user notes](https://dataxapi.com/apis/xiaohongshu/users/notes/list.md) | `GET /v1/xiaohongshu/users/notes/list` | Post list | $0.0200 / call |

### Comments (1)

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [Xiaohongshu comment replies](https://dataxapi.com/apis/xiaohongshu/comments/replies/list.md) | `GET /v1/xiaohongshu/comments/replies/list` | Comment list | $0.0200 / call |

### Trends (1)

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [Xiaohongshu trends](https://dataxapi.com/apis/xiaohongshu/trends/list.md) | `GET /v1/xiaohongshu/trends/list` | Trend list | $0.0200 / call |

### [PGY](https://dataxapi.com/apis/xiaohongshu/pgy.md) (7)

Xiaohongshu's official creator marketplace (蒲公英, PGY): creator search, rate cards, audience profiles and performance figures, plus keyword search indexes.

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [Xiaohongshu PGY creator search](https://dataxapi.com/apis/xiaohongshu/pgy/creators/search.md) | `GET /v1/xiaohongshu/pgy/creators/search` | Creator list | $0.0400 / call |
| [Xiaohongshu PGY creator audience profile](https://dataxapi.com/apis/xiaohongshu/pgy/creators/audience/get.md) | `GET /v1/xiaohongshu/pgy/creators/audience/get` | Audience | $0.0400 / call |
| [Xiaohongshu PGY creator detail](https://dataxapi.com/apis/xiaohongshu/pgy/creators/get.md) | `GET /v1/xiaohongshu/pgy/creators/get` | Creator | $0.0400 / call |
| [Xiaohongshu PGY creator metrics](https://dataxapi.com/apis/xiaohongshu/pgy/creators/metrics.md) | `GET /v1/xiaohongshu/pgy/creators/metrics` | PGY creator metrics | $0.0400 / call |
| [Xiaohongshu PGY creator notes](https://dataxapi.com/apis/xiaohongshu/pgy/creators/notes/list.md) | `GET /v1/xiaohongshu/pgy/creators/notes/list` | PGY creator note list | $0.0400 / call |
| [Xiaohongshu PGY keyword search index](https://dataxapi.com/apis/xiaohongshu/pgy/keywords/history.md) | `GET /v1/xiaohongshu/pgy/keywords/history` | Keyword index history | $0.0400 / call |
| [Xiaohongshu PGY related keywords](https://dataxapi.com/apis/xiaohongshu/pgy/keywords/related.md) | `GET /v1/xiaohongshu/pgy/keywords/related` | Related keyword list | $0.0400 / call |

### [Xiaohongshu Shop](https://dataxapi.com/apis/xiaohongshu/shop.md) (3)

Public product data of Xiaohongshu's shop: product search, product details and buyer reviews.

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [Xiaohongshu product search](https://dataxapi.com/apis/xiaohongshu/shop/products/search.md) | `GET /v1/xiaohongshu/shop/products/search` | Product list | $0.0200 / call |
| [Xiaohongshu product detail](https://dataxapi.com/apis/xiaohongshu/shop/products/get.md) | `GET /v1/xiaohongshu/shop/products/get` | Product | $0.0200 / call |
| [Xiaohongshu product reviews](https://dataxapi.com/apis/xiaohongshu/shop/products/reviews/list.md) | `GET /v1/xiaohongshu/shop/products/reviews/list` | Review list | $0.0200 / call |

## [YouTube API](https://dataxapi.com/apis/youtube.md)

10 endpoints · from $0.0020

### Videos (4)

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [YouTube video search](https://dataxapi.com/apis/youtube/videos/search.md) | `GET /v1/youtube/videos/search` | Post list | $0.0020 / call |
| [YouTube video detail](https://dataxapi.com/apis/youtube/videos/get.md) | `GET /v1/youtube/videos/get` | Post | $0.0020 / call |
| [YouTube video transcript](https://dataxapi.com/apis/youtube/videos/transcript/get.md) | `GET /v1/youtube/videos/transcript/get` | Transcript | $0.0020 / call |
| [YouTube video comments](https://dataxapi.com/apis/youtube/videos/comments/list.md) | `GET /v1/youtube/videos/comments/list` | Comment list | $0.0020 / call |

### Posts (1)

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [YouTube post detail](https://dataxapi.com/apis/youtube/posts/get.md) | `GET /v1/youtube/posts/get` | Post | $0.0020 / call |

### Channels (4)

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [YouTube channel search](https://dataxapi.com/apis/youtube/channels/search.md) | `GET /v1/youtube/channels/search` | Account list | $0.0020 / call |
| [YouTube channel profile](https://dataxapi.com/apis/youtube/channels/get.md) | `GET /v1/youtube/channels/get` | Account | $0.0020 / call |
| [YouTube channel posts](https://dataxapi.com/apis/youtube/channels/posts/list.md) | `GET /v1/youtube/channels/posts/list` | Post list | $0.0020 / call |
| [YouTube channel videos](https://dataxapi.com/apis/youtube/channels/videos/list.md) | `GET /v1/youtube/channels/videos/list` | Post list | $0.0020 / call |

### Comments (1)

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [YouTube comment replies](https://dataxapi.com/apis/youtube/comments/replies/list.md) | `GET /v1/youtube/comments/replies/list` | Comment list | $0.0020 / call |

## [WeChat Channels API](https://dataxapi.com/apis/wechat_channels.md)

7 endpoints · from $0.0200

### Videos (3)

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [WeChat Channels video search](https://dataxapi.com/apis/wechat_channels/videos/search.md) | `GET /v1/wechat_channels/videos/search` | Post list | $0.0200 / call |
| [WeChat Channels video detail](https://dataxapi.com/apis/wechat_channels/videos/get.md) | `GET /v1/wechat_channels/videos/get` | Post | $0.0200 / call |
| [WeChat Channels video comments](https://dataxapi.com/apis/wechat_channels/videos/comments/list.md) | `GET /v1/wechat_channels/videos/comments/list` | Comment list | $0.0200 / call |

### Users (3)

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [WeChat Channels account profile](https://dataxapi.com/apis/wechat_channels/users/get.md) | `GET /v1/wechat_channels/users/get` | Account | $0.0200 / call |
| [WeChat Channels account collections](https://dataxapi.com/apis/wechat_channels/users/collections/list.md) | `GET /v1/wechat_channels/users/collections/list` | Channels collection list | $0.0200 / call |
| [WeChat Channels account videos](https://dataxapi.com/apis/wechat_channels/users/videos/list.md) | `GET /v1/wechat_channels/users/videos/list` | Post list | $0.0200 / call |

### Collections (1)

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [WeChat Channels collection videos](https://dataxapi.com/apis/wechat_channels/collections/videos/list.md) | `GET /v1/wechat_channels/collections/videos/list` | Post list | $0.0200 / call |

## [WeChat Search API](https://dataxapi.com/apis/wechat.md)

1 endpoint · from $0.0200

### Posts (1)

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [WeChat Search articles and videos](https://dataxapi.com/apis/wechat/posts/search.md) | `GET /v1/wechat/posts/search` | Post list | $0.0200 / call |

## [WeChat Official Accounts API](https://dataxapi.com/apis/wechat_mp.md)

6 endpoints · from $0.0200

### Articles (3)

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [WeChat Official Account article detail](https://dataxapi.com/apis/wechat_mp/articles/get.md) | `GET /v1/wechat_mp/articles/get` | Post | $0.0200 / call |
| [WeChat Official Account article comments](https://dataxapi.com/apis/wechat_mp/articles/comments/list.md) | `GET /v1/wechat_mp/articles/comments/list` | Comment list | $0.0200 / call |
| [WeChat Official Account article stats](https://dataxapi.com/apis/wechat_mp/articles/metrics.md) | `GET /v1/wechat_mp/articles/metrics` | Post | $0.0200 / call |

### Accounts (2)

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [WeChat Official Account profile](https://dataxapi.com/apis/wechat_mp/accounts/get.md) | `GET /v1/wechat_mp/accounts/get` | Account | $0.0200 / call |
| [WeChat Official Account articles](https://dataxapi.com/apis/wechat_mp/accounts/articles/list.md) | `GET /v1/wechat_mp/accounts/articles/list` | Post list | $0.0200 / call |

### Comments (1)

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [WeChat Official Account comment replies](https://dataxapi.com/apis/wechat_mp/comments/replies/list.md) | `GET /v1/wechat_mp/comments/replies/list` | Comment list | $0.0200 / call |

## [Reddit API](https://dataxapi.com/apis/reddit.md)

11 endpoints · from $0.0020

### Posts (5)

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [Reddit post search](https://dataxapi.com/apis/reddit/posts/search.md) | `GET /v1/reddit/posts/search` | Post list | $0.0020 / call |
| [Reddit post detail](https://dataxapi.com/apis/reddit/posts/get.md) | `GET /v1/reddit/posts/get` | Post | $0.0020 / call |
| [Reddit video transcript](https://dataxapi.com/apis/reddit/posts/transcript/get.md) | `GET /v1/reddit/posts/transcript/get` | Transcript | $0.0020 / call |
| [Reddit post comments](https://dataxapi.com/apis/reddit/posts/comments/list.md) | `GET /v1/reddit/posts/comments/list` | Comment list | $0.0020 / call |
| [Reddit popular posts](https://dataxapi.com/apis/reddit/posts/trending.md) | `GET /v1/reddit/posts/trending` | Post list | $0.0020 / call |

### Users (3)

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [Reddit user profile](https://dataxapi.com/apis/reddit/users/get.md) | `GET /v1/reddit/users/get` | Account | $0.0020 / call |
| [Reddit user posts](https://dataxapi.com/apis/reddit/users/posts/list.md) | `GET /v1/reddit/users/posts/list` | Post list | $0.0020 / call |
| [Reddit user active communities](https://dataxapi.com/apis/reddit/users/subreddits/list.md) | `GET /v1/reddit/users/subreddits/list` | Community list | $0.0020 / call |

### Communities (2)

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [Reddit community profile](https://dataxapi.com/apis/reddit/subreddits/get.md) | `GET /v1/reddit/subreddits/get` | Community | $0.0020 / call |
| [Reddit community posts](https://dataxapi.com/apis/reddit/subreddits/posts/list.md) | `GET /v1/reddit/subreddits/posts/list` | Post list | $0.0020 / call |

### Trends (1)

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [Reddit trending searches](https://dataxapi.com/apis/reddit/trends/list.md) | `GET /v1/reddit/trends/list` | Trend list | $0.0020 / call |

## [Zhihu API](https://dataxapi.com/apis/zhihu.md)

16 endpoints · from $0.0020

### Posts (1)

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [Zhihu content search](https://dataxapi.com/apis/zhihu/posts/search.md) | `GET /v1/zhihu/posts/search` | Post list | $0.0020 / call |

### Articles (1)

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [Zhihu article detail](https://dataxapi.com/apis/zhihu/articles/get.md) | `GET /v1/zhihu/articles/get` | Post | $0.0020 / call |

### Pins (想法) (1)

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [Zhihu pin detail](https://dataxapi.com/apis/zhihu/pins/get.md) | `GET /v1/zhihu/pins/get` | Post | $0.0020 / call |

### Questions (2)

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [Zhihu question detail](https://dataxapi.com/apis/zhihu/questions/get.md) | `GET /v1/zhihu/questions/get` | Post | $0.0020 / call |
| [Zhihu question answers](https://dataxapi.com/apis/zhihu/questions/answers/list.md) | `GET /v1/zhihu/questions/answers/list` | Post list | $0.0020 / call |

### Answers (2)

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [Zhihu answer detail](https://dataxapi.com/apis/zhihu/answers/get.md) | `GET /v1/zhihu/answers/get` | Post | $0.0020 / call |
| [Zhihu answer comments](https://dataxapi.com/apis/zhihu/answers/comments/list.md) | `GET /v1/zhihu/answers/comments/list` | Comment list | $0.0020 / call |

### Users (6)

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [Zhihu user search](https://dataxapi.com/apis/zhihu/users/search.md) | `GET /v1/zhihu/users/search` | Account list | $0.0020 / call |
| [Zhihu user profile](https://dataxapi.com/apis/zhihu/users/get.md) | `GET /v1/zhihu/users/get` | Account | $0.0020 / call |
| [Zhihu user answers](https://dataxapi.com/apis/zhihu/users/answers/list.md) | `GET /v1/zhihu/users/answers/list` | Post list | $0.0020 / call |
| [Zhihu user articles](https://dataxapi.com/apis/zhihu/users/articles/list.md) | `GET /v1/zhihu/users/articles/list` | Post list | $0.0020 / call |
| [Zhihu user followers](https://dataxapi.com/apis/zhihu/users/followers/list.md) | `GET /v1/zhihu/users/followers/list` | Account list | $0.0020 / call |
| [Zhihu user pins](https://dataxapi.com/apis/zhihu/users/pins/list.md) | `GET /v1/zhihu/users/pins/list` | Post list | $0.0020 / call |

### Columns (1)

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [Zhihu column articles](https://dataxapi.com/apis/zhihu/columns/articles/list.md) | `GET /v1/zhihu/columns/articles/list` | Post list | $0.0020 / call |

### Comments (1)

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [Zhihu comment replies](https://dataxapi.com/apis/zhihu/comments/replies/list.md) | `GET /v1/zhihu/comments/replies/list` | Comment list | $0.0020 / call |

### Trends (1)

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [Zhihu hot list](https://dataxapi.com/apis/zhihu/trends/list.md) | `GET /v1/zhihu/trends/list` | Trend list | $0.0020 / call |

## [Pinterest API](https://dataxapi.com/apis/pinterest.md)

2 endpoints · from $0.0020

### Pins (2)

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [Pinterest pin search](https://dataxapi.com/apis/pinterest/pins/search.md) | `GET /v1/pinterest/pins/search` | Post list | $0.0020 / call |
| [Pinterest pin detail](https://dataxapi.com/apis/pinterest/pins/get.md) | `GET /v1/pinterest/pins/get` | Post | $0.0020 / call |

---

How to call, pay and handle errors is the same everywhere: https://dataxapi.com/llms.txt

Last checked 2026-10-18 19:59 UTC. Catalog revision c48ce454ae6c4c65. [HTML version](https://dataxapi.com/apis/)
