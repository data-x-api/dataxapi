# Music object

The Music object has 9 fields and is returned by 1 endpoint on Douyin. A call costs $0.0020.

For machines: [music schema](https://dataxapi.com/openapi.json#/components/schemas/music), [openapi.json](https://dataxapi.com/openapi.json), [Object table (JSON)](https://api.dataxapi.com/v1/catalog/objects), [llms.txt](https://dataxapi.com/llms.txt)

## Fields

A field the platform cannot give is left out of the item and named in `meta.unavailable`. It is never filled with a guess or a zero.

| Field | Type | From view | Description |
| --- | --- | --- | --- |
| `id` | text | `compact` | Music ID; pass it unchanged to the music endpoint |
| `title` | text | `compact` | Name of the music |
| `author` | text | `compact` | Author or performer, by the name the platform shows |
| `duration` | number | `compact` | Length, in seconds |
| `audio_url` | link | `compact` | Address of the audio file (mostly an MP3) |
| `cover_url` | link | `standard` | Address of the cover image |
| `is_commercial` | yes/no | `compact` | Whether Douyin marks the music as commercial music (in Douyin's commercial music library); the platform's mark, not a licence to use it |
| `is_original` | yes/no | `standard` | Whether it is a video's original sound rather than a song of the library |
| `users` | integer | `compact` | People who have posted with the music (the platform's count of its uses) |

## Endpoints that return Music

### Douyin

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [Douyin music detail](https://dataxapi.com/apis/douyin/music/get.md) | `GET /v1/douyin/music/get` | Music | $0.0020 / call |

## Example

One item from `douyin.music.get`, as recorded 2026-11-21 09:03 UTC. Names, text, IDs and links are examples; the figures are as recorded.

```jsonc
{
  "id": "7174719555330904443",
  "title": "关于周末露营，我踩过的五个坑",
  "author": "周末的周末露营日常，随手记录一下",
  "duration": 17,
  "audio_url": null,
  "cover_url": "https://p3-pc-sign.douyinpic.com/tos-cn-i-0813/87bc782c22ca5d447e12~tplv-dy-resize.jpeg",
  "is_commercial": false,
  "is_original": false,
  "users": 83
}
```

[The whole response is on the endpoint's page →](https://dataxapi.com/apis/douyin/music/get.md)

## Related

- [All endpoints](https://dataxapi.com/apis/): The directory lists what every endpoint returns, with its price.

## Other objects

[Post object](https://dataxapi.com/docs/objects/post/), [Comment object](https://dataxapi.com/docs/objects/comment/), [Account object](https://dataxapi.com/docs/objects/account/), [Trend object](https://dataxapi.com/docs/objects/trend/), [Transcript object](https://dataxapi.com/docs/objects/transcript/), [Media files object](https://dataxapi.com/docs/objects/media/), [Creator rates object](https://dataxapi.com/docs/objects/creator_rates/), [Community object](https://dataxapi.com/docs/objects/community/), [Product object](https://dataxapi.com/docs/objects/product/), [Review object](https://dataxapi.com/docs/objects/review/), [Keyword index history object](https://dataxapi.com/docs/objects/keyword_history/), [Related keyword object](https://dataxapi.com/docs/objects/keyword_related/), [Keyword audience object](https://dataxapi.com/docs/objects/keyword_audience/), [Account recent change object](https://dataxapi.com/docs/objects/account_history/), [Brand index history object](https://dataxapi.com/docs/objects/brand_history/), [Brand index averages object](https://dataxapi.com/docs/objects/brand_metrics/), [Creator object](https://dataxapi.com/docs/objects/creator/), [Audience object](https://dataxapi.com/docs/objects/audience/), [Xingtu creator metrics object](https://dataxapi.com/docs/objects/xingtu_creator_metrics/), [Xingtu creator video object](https://dataxapi.com/docs/objects/xingtu_creator_post/), [PGY creator metrics object](https://dataxapi.com/docs/objects/pgy_creator_metrics/), [PGY creator note object](https://dataxapi.com/docs/objects/pgy_creator_post/), [PGY note detail object](https://dataxapi.com/docs/objects/pgy_note/), [Ad object](https://dataxapi.com/docs/objects/ad/), [Advertiser object](https://dataxapi.com/docs/objects/advertiser/), [Douyin trend-index creator metrics object](https://dataxapi.com/docs/objects/index_creator_metrics/), [Xingtu creator content keywords object](https://dataxapi.com/docs/objects/xingtu_creator_keywords/), [Xingtu creator scores object](https://dataxapi.com/docs/objects/xingtu_creator_scores/), [Xingtu creator content mix object](https://dataxapi.com/docs/objects/xingtu_creator_content_mix/), [Xingtu creator conversion object](https://dataxapi.com/docs/objects/xingtu_creator_conversion/), [Xingtu campaign object](https://dataxapi.com/docs/objects/xingtu_campaign/), [Channels collection object](https://dataxapi.com/docs/objects/channels_collection/), [Channels share link object](https://dataxapi.com/docs/objects/channels_share_link/), [Topic object](https://dataxapi.com/docs/objects/topic/), [Account owner object](https://dataxapi.com/docs/objects/account_owner/), [Mini program object](https://dataxapi.com/docs/objects/miniprogram/), [Follower history object](https://dataxapi.com/docs/objects/follower_history/), [PGY creator costs and summary object](https://dataxapi.com/docs/objects/pgy_creator_costs/), [PGY creator follower summary object](https://dataxapi.com/docs/objects/pgy_creator_followers/), [PGY creator core figures history object](https://dataxapi.com/docs/objects/pgy_creator_cost_history/)

---

Last checked 2026-11-26 12:17 UTC. Catalog revision 0051cce45e9530b9. [HTML version](https://dataxapi.com/docs/objects/music/)
