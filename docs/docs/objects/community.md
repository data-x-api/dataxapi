# Community object

3 endpoints on 2 platforms return the Community object with the same 8 fields, so code written for one platform reads the others unchanged. A call costs $0.0004 to $0.0020. It is a preview structure and may still change.

For machines: [community schema](https://dataxapi.com/openapi.json#/components/schemas/community), [openapi.json](https://dataxapi.com/openapi.json), [Object table (JSON)](https://api.dataxapi.com/v1/catalog/objects), [llms.txt](https://dataxapi.com/llms.txt)

A Community is a place people join and post in: a subreddit on Reddit, a community on X (Twitter). It has a name, a description and a count of members in `metrics.members`.

Its `id` goes unchanged to the endpoints that get the community and list its posts; on Reddit the ID is the community's name. Its posts come back as Post, and on X its members as Account.

## Fields

A field the platform cannot give is left out of the item and named in `meta.unavailable`. It is never filled with a guess or a zero.

| Field | Type | From view | Description |
| --- | --- | --- | --- |
| `id` | text | `compact` | ID; pass it unchanged to the endpoints that get the community and list its posts |
| `name` | text | `compact` | Name of the community |
| `url` | link | `compact` | Link that opens the community |
| `description` | text | `compact` | What the community says it is about |
| `avatar_url` | link | `standard` | The community's icon |
| `nsfw` | yes/no | `standard` | Whether it is marked not safe for work |
| `created_at` | time | `standard` | When the community was created |
| `metrics` | object | `compact` | Community counts |
| `metrics.members` | integer | `compact` | Members |

## Where each number comes from

The same field name does not always mean the same act on every platform. This table says which of the platform's own numbers goes into the field.

| Field | What it holds there | On |
| --- | --- | --- |
| `id` | The community's name: Reddit locates a community by it, and the community posts endpoint takes the same | Reddit |
| `id` | The community's name; pass it unchanged to the community profile and community posts endpoints | Reddit |
| `name` | The community's name, without the r/; the title its moderators wrote is ext.title | Reddit |
| `name` | The community's name, without the r/ | Reddit |
| `metrics.members` | People subscribed to the community | Reddit |

## What a platform cannot give

A platform stands against a field when none of its endpoints gives it.

| Field | Not available on |
| --- | --- |
| `avatar_url` | X (Twitter) |

One endpoint may still leave out a field another gives: each endpoint's page lists what it cannot give, and every answer says so in `meta.unavailable`.

## Endpoints that return Community

### Reddit

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [Reddit community profile](https://dataxapi.com/apis/reddit/subreddits/get.md) | `GET /v1/reddit/subreddits/get` | Community | $0.0020 / call |
| [Reddit user active communities](https://dataxapi.com/apis/reddit/users/subreddits/list.md) | `GET /v1/reddit/users/subreddits/list` | Community list | $0.0020 / call |

### X (Twitter)

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [X community profile](https://dataxapi.com/apis/x/communities/get.md) | `GET /v1/x/communities/get` | Community | $0.0004 / call |

## Example

One item from `reddit.subreddits.get`, as recorded 2026-10-12 22:02 UTC. Names, text, IDs and links are examples; the figures are as recorded.

```jsonc
{
  "id": "t5_q2zdmb",
  "name": "Weekendhiking",
  "url": "https://www.reddit.com/r/hannahwphoto/",
  "description": "Photos, trails and too much coffee.",
  "avatar_url": "https://styles.redditmedia.com/t5_q9lkec/styles/profileIcon_4x7pgnjzbu4u4.png",
  "nsfw": false,
  "created_at": "2008-05-10T16:54:23.304Z",
  "metrics": { "members": 127858 }
}
```

[The whole response is on the endpoint's page →](https://dataxapi.com/apis/reddit/subreddits/get.md)

## Related

- [Community profile API](https://dataxapi.com/roles/communities-get/): The same action on 2 platforms, with a per-platform field table.
- [All endpoints](https://dataxapi.com/apis/): The directory lists what every endpoint returns, with its price.

## Other objects

[Post object](https://dataxapi.com/docs/objects/post/), [Comment object](https://dataxapi.com/docs/objects/comment/), [Account object](https://dataxapi.com/docs/objects/account/), [Trend object](https://dataxapi.com/docs/objects/trend/), [Transcript object](https://dataxapi.com/docs/objects/transcript/), [Creator rates object](https://dataxapi.com/docs/objects/creator_rates/), [Product object](https://dataxapi.com/docs/objects/product/), [Review object](https://dataxapi.com/docs/objects/review/), [Keyword index history object](https://dataxapi.com/docs/objects/keyword_history/), [Related keyword object](https://dataxapi.com/docs/objects/keyword_related/), [Keyword audience object](https://dataxapi.com/docs/objects/keyword_audience/), [Account recent change object](https://dataxapi.com/docs/objects/account_history/), [Brand index history object](https://dataxapi.com/docs/objects/brand_history/), [Brand index averages object](https://dataxapi.com/docs/objects/brand_metrics/), [Creator object](https://dataxapi.com/docs/objects/creator/), [Audience object](https://dataxapi.com/docs/objects/audience/), [Xingtu creator metrics object](https://dataxapi.com/docs/objects/xingtu_creator_metrics/), [Xingtu creator video object](https://dataxapi.com/docs/objects/xingtu_creator_post/), [PGY creator metrics object](https://dataxapi.com/docs/objects/pgy_creator_metrics/), [PGY creator note object](https://dataxapi.com/docs/objects/pgy_creator_post/), [Ad object](https://dataxapi.com/docs/objects/ad/), [Advertiser object](https://dataxapi.com/docs/objects/advertiser/), [Douyin trend-index creator metrics object](https://dataxapi.com/docs/objects/index_creator_metrics/), [Xingtu creator content keywords object](https://dataxapi.com/docs/objects/xingtu_creator_keywords/), [Xingtu creator scores object](https://dataxapi.com/docs/objects/xingtu_creator_scores/), [Xingtu creator content mix object](https://dataxapi.com/docs/objects/xingtu_creator_content_mix/), [Xingtu creator conversion object](https://dataxapi.com/docs/objects/xingtu_creator_conversion/), [Xingtu campaign object](https://dataxapi.com/docs/objects/xingtu_campaign/), [Channels collection object](https://dataxapi.com/docs/objects/channels_collection/), [Topic object](https://dataxapi.com/docs/objects/topic/)

---

Last checked 2026-10-18 19:59 UTC. Catalog revision c48ce454ae6c4c65. [HTML version](https://dataxapi.com/docs/objects/community/)
