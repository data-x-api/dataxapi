# Account owner object

The Account owner object has 10 fields and is returned by 1 endpoint on WeChat Official Accounts. A call costs $0.1. It is a preview structure and may still change.

For machines: [account_owner schema](https://dataxapi.com/openapi.json#/components/schemas/account_owner), [openapi.json](https://dataxapi.com/openapi.json), [Object table (JSON)](https://api.dataxapi.com/v1/catalog/objects), [llms.txt](https://dataxapi.com/llms.txt)

## Fields

A field the platform cannot give is left out of the item and named in `meta.unavailable`. It is never filled with a guess or a zero.

| Field | Type | From view | Description |
| --- | --- | --- | --- |
| `name` | text | `compact` | The owner's name: the full name of a company or body, or a person's name for a personal owner |
| `type` | text | `compact` | What the owner is: company, government, media, individual, or other (another kind of organisation): `company`, `government`, `media`, `individual`, `other` |
| `registration_id` | text | `compact` | The number the owner is registered under (unified social credit code, business licence or organisation code); null where the platform gives none |
| `country` | text | `standard` | The owner's country or region, in the platform's words |
| `verification` | text | `compact` | The account's verification: verified (a personal verification included), unverified, or expired: `verified`, `unverified`, `expired` |
| `verification_type` | text | `standard` | The kind of verification, in the platform's words (such as 企业认证, company verification); null when not verified |
| `verified_at` | time | `standard` | The date the verification was granted, written as midnight UTC of that date |
| `account_id` | text | `compact` | ID of the account asked about: this is its owner |
| `account_created_at` | time | `standard` | The date the account asked about was registered, written as midnight UTC of that date |
| `authorized_services` | list of text | `full` | Third-party services the account asked about has authorised, in the platform's words (company names) |

## Endpoints that return Account owner

### WeChat Official Accounts

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [WeChat Official Account owner](https://dataxapi.com/apis/wechat_mp/accounts/owner/get.md) | `GET /v1/wechat_mp/accounts/owner/get` | Account owner | $0.1 / call |

## Example

One item from `wechat_mp.accounts.owner.get`, as recorded 2026-10-29 09:49 UTC. Names, text, IDs and links are examples; the figures are as recorded.

```jsonc
{
  "name": "阿杰爱折腾",
  "type": "company",
  "registration_id": null,
  "country": "周末的周末露营日常，随手记录一下",
  "verification": "verified",
  "verification_type": "把周末露营从头到尾讲清楚，看完少走弯路",
  "verified_at": "2025-11-13T00:00:00.000Z",
  "account_id": "gh_9ceb787f0519",
  "account_created_at": "2017-12-18T00:00:00.000Z"
}
```

[The whole response is on the endpoint's page →](https://dataxapi.com/apis/wechat_mp/accounts/owner/get.md)

## Related

- [All endpoints](https://dataxapi.com/apis/): The directory lists what every endpoint returns, with its price.

## Other objects

[Post object](https://dataxapi.com/docs/objects/post/), [Comment object](https://dataxapi.com/docs/objects/comment/), [Account object](https://dataxapi.com/docs/objects/account/), [Trend object](https://dataxapi.com/docs/objects/trend/), [Transcript object](https://dataxapi.com/docs/objects/transcript/), [Creator rates object](https://dataxapi.com/docs/objects/creator_rates/), [Community object](https://dataxapi.com/docs/objects/community/), [Product object](https://dataxapi.com/docs/objects/product/), [Review object](https://dataxapi.com/docs/objects/review/), [Keyword index history object](https://dataxapi.com/docs/objects/keyword_history/), [Related keyword object](https://dataxapi.com/docs/objects/keyword_related/), [Keyword audience object](https://dataxapi.com/docs/objects/keyword_audience/), [Account recent change object](https://dataxapi.com/docs/objects/account_history/), [Brand index history object](https://dataxapi.com/docs/objects/brand_history/), [Brand index averages object](https://dataxapi.com/docs/objects/brand_metrics/), [Creator object](https://dataxapi.com/docs/objects/creator/), [Audience object](https://dataxapi.com/docs/objects/audience/), [Xingtu creator metrics object](https://dataxapi.com/docs/objects/xingtu_creator_metrics/), [Xingtu creator video object](https://dataxapi.com/docs/objects/xingtu_creator_post/), [PGY creator metrics object](https://dataxapi.com/docs/objects/pgy_creator_metrics/), [PGY creator note object](https://dataxapi.com/docs/objects/pgy_creator_post/), [PGY note detail object](https://dataxapi.com/docs/objects/pgy_note/), [Ad object](https://dataxapi.com/docs/objects/ad/), [Advertiser object](https://dataxapi.com/docs/objects/advertiser/), [Douyin trend-index creator metrics object](https://dataxapi.com/docs/objects/index_creator_metrics/), [Xingtu creator content keywords object](https://dataxapi.com/docs/objects/xingtu_creator_keywords/), [Xingtu creator scores object](https://dataxapi.com/docs/objects/xingtu_creator_scores/), [Xingtu creator content mix object](https://dataxapi.com/docs/objects/xingtu_creator_content_mix/), [Xingtu creator conversion object](https://dataxapi.com/docs/objects/xingtu_creator_conversion/), [Xingtu campaign object](https://dataxapi.com/docs/objects/xingtu_campaign/), [Channels collection object](https://dataxapi.com/docs/objects/channels_collection/), [Channels share link object](https://dataxapi.com/docs/objects/channels_share_link/), [Topic object](https://dataxapi.com/docs/objects/topic/), [Mini program object](https://dataxapi.com/docs/objects/miniprogram/), [Follower history object](https://dataxapi.com/docs/objects/follower_history/), [PGY creator costs and summary object](https://dataxapi.com/docs/objects/pgy_creator_costs/), [PGY creator follower summary object](https://dataxapi.com/docs/objects/pgy_creator_followers/), [PGY creator core figures history object](https://dataxapi.com/docs/objects/pgy_creator_cost_history/)

---

Last checked 2026-11-20 07:17 UTC. Catalog revision 720fc3ea8dadb865. [HTML version](https://dataxapi.com/docs/objects/account_owner/)
