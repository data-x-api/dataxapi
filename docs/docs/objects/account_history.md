# Account recent change object

The Account recent change object has 18 fields and is returned by 1 endpoint on Douyin. A call costs $0.0020. It is a preview structure and may still change.

For machines: [account_history schema](https://dataxapi.com/openapi.json#/components/schemas/account_history), [openapi.json](https://dataxapi.com/openapi.json), [Object table (JSON)](https://api.dataxapi.com/v1/catalog/objects), [llms.txt](https://dataxapi.com/llms.txt)

Account recent change is how a Douyin account's numbers moved over the last 7 or 30 days: net new followers, new likes, comments, shares and posts, each beside its change against the period before. It is one period's sum from Douyin's trend-index (巨量算数), not a day-by-day series.

`id` is the account's numeric Douyin ID (uid), not the ID the profile endpoint takes, and `url` is the profile link, which that endpoint takes unchanged. Up to five accounts go in one request with `ids`.

## Fields

A field the platform cannot give is left out of the item and named in `meta.unavailable`. It is never filled with a guess or a zero.

| Field | Type | From view | Description |
| --- | --- | --- | --- |
| `id` | text | `compact` | The account's numeric ID (Douyin's uid): the one the request gave |
| `name` | text | `compact` | Display name |
| `url` | link | `compact` | Link to the profile; pass it unchanged to the account endpoint |
| `avatar_url` | link | `standard` | Avatar |
| `days` | integer | `compact` | How many of the most recent days the figures cover |
| `gained` | object | `compact` | What was gained over the period |
| `gained.followers` | integer | `compact` | Net new followers; negative when followers were lost |
| `gained.likes` | integer | `compact` | New likes |
| `gained.comments` | integer | `compact` | New comments |
| `gained.shares` | integer | `compact` | New shares |
| `gained.posts` | integer | `compact` | Posts published |
| `change` | object | `compact` | Change against the period of the same length before it, as a ratio: 0.3 is 30% more, -0.5 is half as much |
| `change.followers` | number | `compact` | Change in net new followers |
| `change.likes` | number | `compact` | Change in new likes |
| `change.comments` | number | `compact` | Change in new comments |
| `change.shares` | number | `compact` | Change in new shares |
| `change.posts` | number | `compact` | Change in posts published |
| `totals` | object | `standard` | The account's totals as of now |
| `totals.followers` | integer | `standard` | Followers |
| `totals.likes` | integer | `standard` | Likes received in all |
| `totals.posts` | integer | `standard` | Posts |

## Endpoints that return Account recent change

### Douyin

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [Douyin creator engagement and follower trends](https://dataxapi.com/apis/douyin/users/history.md) | `GET /v1/douyin/users/history` | Account recent change | $0.0020 / call |

## Example

One item from `douyin.users.history`, as recorded 2026-10-12 21:54 UTC. Names, text, IDs and links are examples; the figures are as recorded.

```jsonc
{
  "id": "65485320678",
  "name": "阿杰爱折腾",
  "url": "https://www.douyin.com/user/65485320678",
  "avatar_url": "https://p3-pc.douyinpic.com/aweme/100x100/aweme-avatar/tos-cn-avt-0015_2ed168d1dc1b7e7b888e.jpeg",
  "days": 30,
  "gained": {
    "followers": 661489,
    "likes": 255080710,
    "comments": 48099,
    "shares": 38207194,
    "posts": 437
  },
  "change": {
    "followers": 0.7285514941831903,
    "likes": 0.2256968601585644,
    "comments": -0.12905153369789593,
    "shares": 0.04085150466802108,
    "posts": -0.126
  },
  "totals": { "followers": 203357430, "likes": 19128275335, "posts": 12381 }
}
```

[The whole response is on the endpoint's page →](https://dataxapi.com/apis/douyin/users/history.md)

## Related

- [All endpoints](https://dataxapi.com/apis/): The directory lists what every endpoint returns, with its price.

## Other objects

[Post object](https://dataxapi.com/docs/objects/post/), [Comment object](https://dataxapi.com/docs/objects/comment/), [Account object](https://dataxapi.com/docs/objects/account/), [Trend object](https://dataxapi.com/docs/objects/trend/), [Transcript object](https://dataxapi.com/docs/objects/transcript/), [Creator rates object](https://dataxapi.com/docs/objects/creator_rates/), [Community object](https://dataxapi.com/docs/objects/community/), [Product object](https://dataxapi.com/docs/objects/product/), [Review object](https://dataxapi.com/docs/objects/review/), [Keyword index history object](https://dataxapi.com/docs/objects/keyword_history/), [Related keyword object](https://dataxapi.com/docs/objects/keyword_related/), [Keyword audience object](https://dataxapi.com/docs/objects/keyword_audience/), [Brand index history object](https://dataxapi.com/docs/objects/brand_history/), [Brand index averages object](https://dataxapi.com/docs/objects/brand_metrics/), [Creator object](https://dataxapi.com/docs/objects/creator/), [Audience object](https://dataxapi.com/docs/objects/audience/), [Xingtu creator metrics object](https://dataxapi.com/docs/objects/xingtu_creator_metrics/), [Xingtu creator video object](https://dataxapi.com/docs/objects/xingtu_creator_post/), [PGY creator metrics object](https://dataxapi.com/docs/objects/pgy_creator_metrics/), [PGY creator note object](https://dataxapi.com/docs/objects/pgy_creator_post/), [Ad object](https://dataxapi.com/docs/objects/ad/), [Advertiser object](https://dataxapi.com/docs/objects/advertiser/), [Douyin trend-index creator metrics object](https://dataxapi.com/docs/objects/index_creator_metrics/), [Xingtu creator content keywords object](https://dataxapi.com/docs/objects/xingtu_creator_keywords/), [Xingtu creator scores object](https://dataxapi.com/docs/objects/xingtu_creator_scores/), [Xingtu creator content mix object](https://dataxapi.com/docs/objects/xingtu_creator_content_mix/), [Xingtu creator conversion object](https://dataxapi.com/docs/objects/xingtu_creator_conversion/), [Xingtu campaign object](https://dataxapi.com/docs/objects/xingtu_campaign/), [Channels collection object](https://dataxapi.com/docs/objects/channels_collection/), [Topic object](https://dataxapi.com/docs/objects/topic/)

---

Last checked 2026-10-18 19:59 UTC. Catalog revision c48ce454ae6c4c65. [HTML version](https://dataxapi.com/docs/objects/account_history/)
