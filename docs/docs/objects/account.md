# Account object

36 endpoints on 17 platforms return the Account object with the same 11 fields, so code written for one platform reads the others unchanged. A call costs $0.0004 to $0.0400.

For machines: [account schema](https://dataxapi.com/openapi.json#/components/schemas/account), [openapi.json](https://dataxapi.com/openapi.json), [Object table (JSON)](https://api.dataxapi.com/v1/catalog/objects), [llms.txt](https://dataxapi.com/llms.txt)

An Account is a user, a channel, a page or an official account on a platform: handle, display name, bio, and its counts of followers, following and posts. Profiles, user searches and the lists of followers, likers, retweeters and members all return it.

The `author` of a post or a comment points to an account by its `id` and `username`. A creator on Xingtu (星图) or PGY (蒲公英) is a separate object, Creator, which points to its account with `account_id`.

## Fields

A field the platform cannot give is left out of the item and named in `meta.unavailable`. It is never filled with a guess or a zero.

| Field | Type | From view | Description |
| --- | --- | --- | --- |
| `id` | text | `compact` | ID |
| `username` | text | `compact` | Handle |
| `name` | text | `compact` | Display name |
| `url` | link | `compact` | Link to the profile |
| `bio` | text | `compact` | Bio |
| `avatar_url` | link | `standard` | Avatar |
| `verified` | yes/no | `standard` | Whether the account is verified |
| `created_at` | time | `standard` | When the account was created |
| `metrics` | object | `compact` | Account counts |
| `metrics.followers` | integer | `compact` | Followers |
| `metrics.following` | integer | `compact` | Following |
| `metrics.posts` | integer | `compact` | Posts published |

## Where each number comes from

The same field name does not always mean the same act on every platform. This table says which of the platform's own numbers goes into the field.

| Field | What it holds there | On |
| --- | --- | --- |
| `created_at` | The day the page was created; no time of day | Facebook |
| `metrics.followers` | Subscribers | Telegram |
| `metrics.followers` | People who follow the page; from a thousand up the platform gives a rounded figure | Facebook |
| `metrics.followers` | Subscribers, which the platform shows to three significant figures | YouTube |
| `metrics.posts` | Videos uploaded | Bilibili |
| `metrics.posts` | Videos | YouTube |

## What a platform cannot give

A platform stands against a field when none of its endpoints gives it.

| Field | Not available on |
| --- | --- |
| `id` | Telegram |
| `username` | Weibo, WeChat Channels, WeChat Official Accounts |
| `url` | Kuaishou, WeChat Channels, WeChat Official Accounts |
| `bio` | WeChat Official Accounts |
| `avatar_url` | WeChat Official Accounts |
| `verified` | Facebook, LinkedIn, WeChat Channels, WeChat Official Accounts, Zhihu |
| `created_at` | Bilibili, Douyin, Kuaishou, Telegram, LinkedIn, Threads, Instagram, Xiaohongshu (RedNote), WeChat Channels, WeChat Official Accounts, Zhihu |
| `metrics.followers` | LinkedIn, WeChat Channels, WeChat Official Accounts, Reddit |
| `metrics.following` | Telegram, Facebook, LinkedIn, Threads, YouTube, WeChat Channels, WeChat Official Accounts, Reddit, Zhihu |
| `metrics.posts` | Telegram, Facebook, LinkedIn, Threads, Instagram, WeChat Official Accounts, Zhihu |

One endpoint may still leave out a field another gives: each endpoint's page lists what it cannot give, and every answer says so in `meta.unavailable`.

## Endpoints that return Account

### Bilibili

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [Bilibili user profile](https://dataxapi.com/apis/bilibili/users/get.md) | `GET /v1/bilibili/users/get` | Account | $0.0020 / call |

### Douyin

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [Douyin user profile](https://dataxapi.com/apis/douyin/users/get.md) | `GET /v1/douyin/users/get` | Account | $0.0020 / call |
| [Douyin user search](https://dataxapi.com/apis/douyin/users/search.md) | `GET /v1/douyin/users/search` | Account list | $0.0020 / call |

### Kuaishou

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [Kuaishou user profile](https://dataxapi.com/apis/kuaishou/users/get.md) | `GET /v1/kuaishou/users/get` | Account | $0.0200 / call |
| [Kuaishou user search](https://dataxapi.com/apis/kuaishou/users/search.md) | `GET /v1/kuaishou/users/search` | Account list | $0.0200 / call |

### Telegram

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [Telegram channel profile](https://dataxapi.com/apis/telegram/channels/get.md) | `GET /v1/telegram/channels/get` | Account | $0.0020 / call |

### Facebook

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [Facebook page profile](https://dataxapi.com/apis/facebook/pages/get.md) | `GET /v1/facebook/pages/get` | Account | $0.0020 / call |

### LinkedIn

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [LinkedIn company page](https://dataxapi.com/apis/linkedin/companies/get.md) | `GET /v1/linkedin/companies/get` | Account | $0.0020 / call |

### Threads

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [Threads user profile](https://dataxapi.com/apis/threads/users/get.md) | `GET /v1/threads/users/get` | Account | $0.0020 / call |

### Instagram

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [Instagram user profile](https://dataxapi.com/apis/instagram/users/get.md) | `GET /v1/instagram/users/get` | Account | $0.0020 / call |
| [Instagram user search](https://dataxapi.com/apis/instagram/users/search.md) | `GET /v1/instagram/users/search` | Account list | $0.0040 / call |

### TikTok

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [TikTok user profile](https://dataxapi.com/apis/tiktok/users/get.md) | `GET /v1/tiktok/users/get` | Account | $0.0020 / call |
| [TikTok user search](https://dataxapi.com/apis/tiktok/users/search.md) | `GET /v1/tiktok/users/search` | Account list | $0.0020 / call |
| [TikTok user followers](https://dataxapi.com/apis/tiktok/users/followers/list.md) | `GET /v1/tiktok/users/followers/list` | Account list | $0.0020 / call |

### Weibo

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [Weibo post likers](https://dataxapi.com/apis/weibo/posts/likers/list.md) | `GET /v1/weibo/posts/likers/list` | Account list | $0.0020 / call |
| [Weibo user followers](https://dataxapi.com/apis/weibo/users/followers/list.md) | `GET /v1/weibo/users/followers/list` | Account list | $0.0020 / call |
| [Weibo user profile](https://dataxapi.com/apis/weibo/users/get.md) | `GET /v1/weibo/users/get` | Account | $0.0020 / call |
| [Weibo user search](https://dataxapi.com/apis/weibo/users/search.md) | `GET /v1/weibo/users/search` | Account list | $0.0020 / call |

### X (Twitter)

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [X post retweeters](https://dataxapi.com/apis/x/posts/retweeters/list.md) | `GET /v1/x/posts/retweeters/list` | Account list | $0.0020 / call |
| [X user followers](https://dataxapi.com/apis/x/users/followers/list.md) | `GET /v1/x/users/followers/list` | Account list | $0.0001 / item |
| [X user following](https://dataxapi.com/apis/x/users/following/list.md) | `GET /v1/x/users/following/list` | Account list | $0.0001 / item |
| [X user profile](https://dataxapi.com/apis/x/users/get.md) | `GET /v1/x/users/get` | Account | $0.0004 / item |
| [X user search](https://dataxapi.com/apis/x/users/search.md) | `GET /v1/x/users/search` | Account list | $0.0004 / item |
| [X community members](https://dataxapi.com/apis/x/communities/members/list.md) | `GET /v1/x/communities/members/list` | Account list | $0.0004 / item |
| [X list followers](https://dataxapi.com/apis/x/lists/followers/list.md) | `GET /v1/x/lists/followers/list` | Account list | $0.0004 / item |
| [X list members](https://dataxapi.com/apis/x/lists/members/list.md) | `GET /v1/x/lists/members/list` | Account list | $0.0004 / item |

### Xiaohongshu (RedNote)

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [Xiaohongshu user profile](https://dataxapi.com/apis/xiaohongshu/users/get.md) | `GET /v1/xiaohongshu/users/get` | Account | $0.0200 / call |
| [Xiaohongshu user search](https://dataxapi.com/apis/xiaohongshu/users/search.md) | `GET /v1/xiaohongshu/users/search` | Account list | $0.0200 / call |

### YouTube

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [YouTube channel profile](https://dataxapi.com/apis/youtube/channels/get.md) | `GET /v1/youtube/channels/get` | Account | $0.0020 / call |
| [YouTube channel search](https://dataxapi.com/apis/youtube/channels/search.md) | `GET /v1/youtube/channels/search` | Account list | $0.0020 / call |

### WeChat Channels

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [WeChat Channels account profile](https://dataxapi.com/apis/wechat_channels/users/get.md) | `GET /v1/wechat_channels/users/get` | Account | $0.0200 / call |

### WeChat Official Accounts

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [WeChat Official Account profile](https://dataxapi.com/apis/wechat_mp/accounts/get.md) | `GET /v1/wechat_mp/accounts/get` | Account | $0.0200 / call |

### Reddit

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [Reddit user profile](https://dataxapi.com/apis/reddit/users/get.md) | `GET /v1/reddit/users/get` | Account | $0.0020 / call |

### Zhihu

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [Zhihu user followers](https://dataxapi.com/apis/zhihu/users/followers/list.md) | `GET /v1/zhihu/users/followers/list` | Account list | $0.0020 / call |
| [Zhihu user profile](https://dataxapi.com/apis/zhihu/users/get.md) | `GET /v1/zhihu/users/get` | Account | $0.0020 / call |
| [Zhihu user search](https://dataxapi.com/apis/zhihu/users/search.md) | `GET /v1/zhihu/users/search` | Account list | $0.0020 / call |

## Example

One item from `bilibili.users.get`, as recorded 2026-10-12 18:43 UTC. Names, text, IDs and links are examples; the figures are as recorded.

```jsonc
{
  "id": "396928023",
  "username": null,
  "name": "橘子汽水不加冰",
  "url": "https://space.bilibili.com/396928023",
  "bio": "只说真话的装备测评，不接硬广",
  "avatar_url": "https://i0.hdslb.com/bfs/face/9c13ec3ca22ca7b557313d2b.jpg",
  "verified": true,
  "metrics": { "followers": 18634887, "following": 686, "posts": 933 }
}
```

[The whole response is on the endpoint's page →](https://dataxapi.com/apis/bilibili/users/get.md)

## Related

- [Account profile API](https://dataxapi.com/roles/accounts-get/): The same action on 17 platforms, with a per-platform field table.
- [Account search API](https://dataxapi.com/roles/accounts-search/): The same action on 9 platforms, with a per-platform field table.
- [Followers API](https://dataxapi.com/roles/accounts-followers-list/): The same action on 4 platforms, with a per-platform field table.
- [All endpoints](https://dataxapi.com/apis/): The directory lists what every endpoint returns, with its price.

## Other objects

[Post object](https://dataxapi.com/docs/objects/post/), [Comment object](https://dataxapi.com/docs/objects/comment/), [Trend object](https://dataxapi.com/docs/objects/trend/), [Transcript object](https://dataxapi.com/docs/objects/transcript/), [Creator rates object](https://dataxapi.com/docs/objects/creator_rates/), [Community object](https://dataxapi.com/docs/objects/community/), [Product object](https://dataxapi.com/docs/objects/product/), [Review object](https://dataxapi.com/docs/objects/review/), [Keyword index history object](https://dataxapi.com/docs/objects/keyword_history/), [Related keyword object](https://dataxapi.com/docs/objects/keyword_related/), [Keyword audience object](https://dataxapi.com/docs/objects/keyword_audience/), [Account recent change object](https://dataxapi.com/docs/objects/account_history/), [Brand index history object](https://dataxapi.com/docs/objects/brand_history/), [Brand index averages object](https://dataxapi.com/docs/objects/brand_metrics/), [Creator object](https://dataxapi.com/docs/objects/creator/), [Audience object](https://dataxapi.com/docs/objects/audience/), [Xingtu creator metrics object](https://dataxapi.com/docs/objects/xingtu_creator_metrics/), [Xingtu creator video object](https://dataxapi.com/docs/objects/xingtu_creator_post/), [PGY creator metrics object](https://dataxapi.com/docs/objects/pgy_creator_metrics/), [PGY creator note object](https://dataxapi.com/docs/objects/pgy_creator_post/), [Ad object](https://dataxapi.com/docs/objects/ad/), [Advertiser object](https://dataxapi.com/docs/objects/advertiser/), [Douyin trend-index creator metrics object](https://dataxapi.com/docs/objects/index_creator_metrics/), [Xingtu creator content keywords object](https://dataxapi.com/docs/objects/xingtu_creator_keywords/), [Xingtu creator scores object](https://dataxapi.com/docs/objects/xingtu_creator_scores/), [Xingtu creator content mix object](https://dataxapi.com/docs/objects/xingtu_creator_content_mix/), [Xingtu creator conversion object](https://dataxapi.com/docs/objects/xingtu_creator_conversion/), [Xingtu campaign object](https://dataxapi.com/docs/objects/xingtu_campaign/), [Channels collection object](https://dataxapi.com/docs/objects/channels_collection/), [Topic object](https://dataxapi.com/docs/objects/topic/)

---

Last checked 2026-10-18 19:59 UTC. Catalog revision c48ce454ae6c4c65. [HTML version](https://dataxapi.com/docs/objects/account/)
