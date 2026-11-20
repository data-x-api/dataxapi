# PGY creator metrics object

The PGY creator metrics object has 64 fields and is returned by 1 endpoint on Xiaohongshu (RedNote). A call costs $0.0400. It is a preview structure and may still change.

For machines: [pgy_creator_metrics schema](https://dataxapi.com/openapi.json#/components/schemas/pgy_creator_metrics), [openapi.json](https://dataxapi.com/openapi.json), [Object table (JSON)](https://api.dataxapi.com/v1/catalog/objects), [llms.txt](https://dataxapi.com/llms.txt)

PGY creator metrics is how a Xiaohongshu creator's everyday notes did over the last 30 or 90 days, as PGY (蒲公英) sums it up: median impressions, reads and interactions, the engagement rate, and the share of notes past 100 and 1,000 likes. The `_percentile` fields say what share of comparable creators it exceeds.

`creator_id` is the PGY creator ID from the creator search. The notes one by one are PGY creator notes, and who follows the creator is their Audience.

## Fields

A field the platform cannot give is left out of the item and named in `meta.unavailable`. It is never filled with a guess or a zero.

| Field | Type | From view | Description |
| --- | --- | --- | --- |
| `creator_id` | text | `compact` | PGY creator ID |
| `notes` | integer | `compact` | Notes in the period |
| `median_impressions` | integer | `compact` | Median impressions of a note |
| `median_reads` | integer | `compact` | Median reads of a note |
| `median_engagements` | integer | `compact` | Median interactions of a note |
| `median_likes` | integer | `standard` | Median likes of a note |
| `median_favorites` | integer | `standard` | Median saves of a note |
| `median_comments` | integer | `standard` | Median comments of a note |
| `median_shares` | integer | `standard` | Median shares of a note |
| `engagement_rate` | number | `compact` | Engagement rate, 0 to 1 |
| `video_completion_rate` | number | `standard` | Completion rate of video notes, 0 to 1 |
| `image_3s_read_rate` | number | `standard` | Share of image-note reads that last 3 seconds, 0 to 1 |
| `hundred_like_share` | number | `standard` | Share of notes with 100 likes or more, 0 to 1 |
| `thousand_like_share` | number | `standard` | Share of notes with 1,000 likes or more, 0 to 1 |
| `impressions_percentile` | number | `standard` | Share of comparable creators whose median impressions it exceeds, 0 to 1 |
| `reads_percentile` | number | `standard` | Share of comparable creators whose median reads it exceeds, 0 to 1 |
| `engagements_percentile` | number | `standard` | Share of comparable creators whose median interactions it exceeds, 0 to 1 |
| `video_notes` | integer | `standard` | Video notes in the period (counted in notes too) |
| `video_completion_percentile` | number | `standard` | Share of comparable creators whose video completion rate it exceeds, 0 to 1 |
| `median_follows` | integer | `standard` | Median follows a note brought (new followers gained from it) |
| `traffic_sources` | object | `standard` | Where the period's notes got their traffic: the share of impressions and of reads from each entry point (PGY's traffic sources); each set adds up to 1 |
| `traffic_sources.impressions` | object | `standard` | Shares of the impressions |
| `traffic_sources.impressions.homefeed` | number | `standard` | Share of the impressions from the explore feed, 0 to 1 |
| `traffic_sources.impressions.search` | number | `standard` | Share of the impressions from search, 0 to 1 |
| `traffic_sources.impressions.follow` | number | `standard` | Share of the impressions from the following feed, 0 to 1 |
| `traffic_sources.impressions.detail` | number | `standard` | Share of the impressions from note detail pages, 0 to 1 |
| `traffic_sources.impressions.nearby` | number | `standard` | Share of the impressions from the nearby feed, 0 to 1 |
| `traffic_sources.impressions.other` | number | `standard` | Share of the impressions from anywhere else, 0 to 1 |
| `traffic_sources.reads` | object | `standard` | Shares of the reads |
| `traffic_sources.reads.homefeed` | number | `standard` | Share of the reads from the explore feed, 0 to 1 |
| `traffic_sources.reads.search` | number | `standard` | Share of the reads from search, 0 to 1 |
| `traffic_sources.reads.follow` | number | `standard` | Share of the reads from the following feed, 0 to 1 |
| `traffic_sources.reads.detail` | number | `standard` | Share of the reads from note detail pages, 0 to 1 |
| `traffic_sources.reads.nearby` | number | `standard` | Share of the reads from the nearby feed, 0 to 1 |
| `traffic_sources.reads.other` | number | `standard` | Share of the reads from anywhere else, 0 to 1 |
| `long_term` | object | `full` | Long-term performance (PGY's long-term notes): the notes published in a two-month span about half a year back, whose reads the platform splits into a "recent" part after publication and a "long-term" part after that, each with reads, the standing among peers and where the reads came from. Of the everyday notes with tab=everyday, of the sponsored ones with tab=sponsored. The platform does not say where the two parts divide |
| `long_term.published_from` | time | `full` | First publication day of these notes: a calendar day in China time (UTC+8), written as midnight UTC of its date |
| `long_term.published_to` | time | `full` | Last publication day of these notes, written the same way |
| `long_term.notes` | integer | `full` | Notes published in that span; with 0, everything below is null |
| `long_term.recent_reads` | integer | `full` | Recent reads: a figure of one note, the platform's representative value (of the same order as this endpoint's median reads; the platform does not say whether it is a median or a mean) |
| `long_term.recent_reads_percentile` | number | `full` | Share of comparable creators whose recent reads it exceeds, 0 to 1 |
| `long_term.long_term_reads` | integer | `full` | Long-term reads: a figure of one note, as recent reads |
| `long_term.long_term_reads_percentile` | number | `full` | Share of comparable creators whose long-term reads it exceeds, 0 to 1 |
| `long_term.recent_sources` | object | `full` | Where the recent reads came from, shares adding up to 1 |
| `long_term.recent_sources.homefeed` | number | `full` | Share of the recent reads from the explore feed, 0 to 1 |
| `long_term.recent_sources.search` | number | `full` | Share of the recent reads from search, 0 to 1 |
| `long_term.recent_sources.profile` | number | `full` | Share of the recent reads from the creator's profile page, 0 to 1 |
| `long_term.recent_sources.follow` | number | `full` | Share of the recent reads from the following feed, 0 to 1 |
| `long_term.recent_sources.other` | number | `full` | Share of the recent reads from anywhere else, 0 to 1 |
| `long_term.long_term_sources` | object | `full` | Where the long-term reads came from, shares adding up to 1 |
| `long_term.long_term_sources.homefeed` | number | `full` | Share of the long-term reads from the explore feed, 0 to 1 |
| `long_term.long_term_sources.search` | number | `full` | Share of the long-term reads from search, 0 to 1 |
| `long_term.long_term_sources.profile` | number | `full` | Share of the long-term reads from the creator's profile page, 0 to 1 |
| `long_term.long_term_sources.follow` | number | `full` | Share of the long-term reads from the following feed, 0 to 1 |
| `long_term.long_term_sources.other` | number | `full` | Share of the long-term reads from anywhere else, 0 to 1 |
| `note_list` | list of object | `full` | The period's notes one by one, oldest first; 15 at most (recorded: 15 given of 34 in the period); null when the period has no note |
| `note_list[].id` | text | `full` | Note ID |
| `note_list[].title` | text | `full` | The note's title |
| `note_list[].type` | text | `full` | An image note or a video note: `image`, `video` |
| `note_list[].published_at` | time | `full` | The day it was published; the platform gives the day only, given as the start of that day in China time |
| `note_list[].cover_url` | link | `full` | Address of the cover image |
| `note_list[].impressions` | integer | `full` | Impressions |
| `note_list[].reads` | integer | `full` | Reads |
| `note_list[].engagements` | integer | `full` | Interactions |
| `note_list[].likes` | integer | `full` | Likes |
| `note_list[].favorites` | integer | `full` | Saves |
| `note_list[].impressions_vs_median` | number | `full` | How far the note's impressions are above the creator's median impressions of the period: 1.5 is 150% more, -0.3 is 30% fewer, 0 is the median itself |
| `note_list[].reads_vs_median` | number | `full` | How far the note's reads are above the creator's median reads of the period: 1.5 is 150% more, -0.3 is 30% fewer, 0 is the median itself |
| `note_list[].engagements_vs_median` | number | `full` | How far the note's interactions are above the creator's median interactions of the period: 1.5 is 150% more, -0.3 is 30% fewer, 0 is the median itself |
| `note_list[].likes_vs_median` | number | `full` | How far the note's likes are above the creator's median likes of the period: 1.5 is 150% more, -0.3 is 30% fewer, 0 is the median itself |
| `note_list[].favorites_vs_median` | number | `full` | How far the note's saves are above the creator's median saves of the period: 1.5 is 150% more, -0.3 is 30% fewer, 0 is the median itself |

## Endpoints that return PGY creator metrics

### Xiaohongshu (RedNote)

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [Xiaohongshu PGY creator metrics](https://dataxapi.com/apis/xiaohongshu/pgy/creators/metrics.md) | `GET /v1/xiaohongshu/pgy/creators/metrics` | PGY creator metrics | $0.0400 / call |

## Example

One item from `xiaohongshu.pgy.creators.metrics`, as recorded 2026-10-12 21:53 UTC. Names, text, IDs and links are examples; the figures are as recorded.

```jsonc
{
  "creator_id": "622bd7c00000000007bc9f1a",
  "notes": 34,
  "median_impressions": 3535,
  "median_reads": 533,
  "median_engagements": 12,
  "median_likes": 10,
  "median_favorites": 2,
  "median_comments": 0,
  "median_shares": 3,
  "engagement_rate": 0.032,
  "video_completion_rate": 0.321,
  "image_3s_read_rate": 0.798,
  "hundred_like_share": 0.088,
  "thousand_like_share": 0,
  "impressions_percentile": 0.523,
  "reads_percentile": 0.476,
  "engagements_percentile": 0.333,
  "video_notes": 2,
  "video_completion_percentile": 0,
  "median_follows": 0,
  "traffic_sources": {
    "impressions": {
      "homefeed": 0.619,
      "search": 0.293,
      "follow": 0.036,
      "detail": 0.028,
      "nearby": 0.001,
      "other": 0.023
    },
    "reads": {
      "homefeed": 0.615,
      "search": 0.33,
      "follow": 0.013,
      "detail": 0.008,
      "nearby": 0,
      "other": 0.034
    }
  }
}
```

[The whole response is on the endpoint's page →](https://dataxapi.com/apis/xiaohongshu/pgy/creators/metrics.md)

## Related

- [Creator metrics API](https://dataxapi.com/roles/creators-metrics/): The same action on 2 platforms, with a per-platform field table.
- [All endpoints](https://dataxapi.com/apis/): The directory lists what every endpoint returns, with its price.

## Other objects

[Post object](https://dataxapi.com/docs/objects/post/), [Comment object](https://dataxapi.com/docs/objects/comment/), [Account object](https://dataxapi.com/docs/objects/account/), [Trend object](https://dataxapi.com/docs/objects/trend/), [Transcript object](https://dataxapi.com/docs/objects/transcript/), [Creator rates object](https://dataxapi.com/docs/objects/creator_rates/), [Community object](https://dataxapi.com/docs/objects/community/), [Product object](https://dataxapi.com/docs/objects/product/), [Review object](https://dataxapi.com/docs/objects/review/), [Keyword index history object](https://dataxapi.com/docs/objects/keyword_history/), [Related keyword object](https://dataxapi.com/docs/objects/keyword_related/), [Keyword audience object](https://dataxapi.com/docs/objects/keyword_audience/), [Account recent change object](https://dataxapi.com/docs/objects/account_history/), [Brand index history object](https://dataxapi.com/docs/objects/brand_history/), [Brand index averages object](https://dataxapi.com/docs/objects/brand_metrics/), [Creator object](https://dataxapi.com/docs/objects/creator/), [Audience object](https://dataxapi.com/docs/objects/audience/), [Xingtu creator metrics object](https://dataxapi.com/docs/objects/xingtu_creator_metrics/), [Xingtu creator video object](https://dataxapi.com/docs/objects/xingtu_creator_post/), [PGY creator note object](https://dataxapi.com/docs/objects/pgy_creator_post/), [PGY note detail object](https://dataxapi.com/docs/objects/pgy_note/), [Ad object](https://dataxapi.com/docs/objects/ad/), [Advertiser object](https://dataxapi.com/docs/objects/advertiser/), [Douyin trend-index creator metrics object](https://dataxapi.com/docs/objects/index_creator_metrics/), [Xingtu creator content keywords object](https://dataxapi.com/docs/objects/xingtu_creator_keywords/), [Xingtu creator scores object](https://dataxapi.com/docs/objects/xingtu_creator_scores/), [Xingtu creator content mix object](https://dataxapi.com/docs/objects/xingtu_creator_content_mix/), [Xingtu creator conversion object](https://dataxapi.com/docs/objects/xingtu_creator_conversion/), [Xingtu campaign object](https://dataxapi.com/docs/objects/xingtu_campaign/), [Channels collection object](https://dataxapi.com/docs/objects/channels_collection/), [Channels share link object](https://dataxapi.com/docs/objects/channels_share_link/), [Topic object](https://dataxapi.com/docs/objects/topic/), [Account owner object](https://dataxapi.com/docs/objects/account_owner/), [Mini program object](https://dataxapi.com/docs/objects/miniprogram/), [Follower history object](https://dataxapi.com/docs/objects/follower_history/), [PGY creator costs and summary object](https://dataxapi.com/docs/objects/pgy_creator_costs/), [PGY creator follower summary object](https://dataxapi.com/docs/objects/pgy_creator_followers/), [PGY creator core figures history object](https://dataxapi.com/docs/objects/pgy_creator_cost_history/)

---

Last checked 2026-11-20 07:17 UTC. Catalog revision 720fc3ea8dadb865. [HTML version](https://dataxapi.com/docs/objects/pgy_creator_metrics/)
