# Meta Ad Library API

5 endpoints read Meta Ad Library: ad library, advertisers. From $0.0020 a call. No Meta Ad Library login and no cookie; a failed call is free.

> 5 endpoints. How to call, pay and handle errors is the same everywhere: https://dataxapi.com/llms.txt

Generated from catalog revision c48ce454ae6c4c65, price book 2.

## meta.ads.get

Get one ad of the Meta Ad Library by its library ID or link: advertiser, text, headline, images and videos, landing page, first and last day shown, the platforms it is delivered on, and whether it is still running. One object a call; $0.0020 per call. Errors, timeouts and objects that do not exist are not charged.

- Name: Meta ad detail API
- Request: `GET /v1/meta/ads/get`
- Parameters: `id`, `url`, `view`, `fields`; give exactly one of id, url
- Whole contract: https://dataxapi.com/apis/meta/ads/get.md

## meta.ads.search

Search the ads running now in the Meta Ad Library (Facebook, Instagram and Meta's other apps) by keyword: advertiser, text, headline, images and videos, landing page, first and last day shown; can be limited to a country and to image or video ads, sorted by impressions or newest first. 30 ads a page. Up to 30 items a call; $0.0020 per call. Errors and timeouts are not charged; an empty result is charged $0.0020.

- Name: Meta Ad Library search API
- Request: `GET /v1/meta/ads/search`
- Parameters: `query` (required), `region`, `sort`, `type`, `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/meta/ads/search.md

## meta.ads.transcript.get

Get what is said in the video of a Meta Ad Library ad by its library ID or link, as one text. One object a call; $0.0020 per call. Errors, timeouts and objects that do not exist are not charged.

- Name: Meta ad video transcript API
- Request: `GET /v1/meta/ads/transcript/get`
- Parameters: `id`, `url`, `view`, `fields`; give exactly one of id, url
- Whole contract: https://dataxapi.com/apis/meta/ads/transcript/get.md

## meta.advertisers.ads.list

Get the ads an advertiser (a Facebook page) is running now in the Meta Ad Library, by the page's ID: text, headline, images and videos, landing page, first and last day shown; can be limited to a country and to image or video ads, sorted by impressions or newest first. 30 ads a page. Up to 30 items a call; $0.0020 per call. Errors and timeouts are not charged; an empty result is charged $0.0020.

- Name: Meta advertiser's ads API
- Request: `GET /v1/meta/advertisers/ads/list`
- Parameters: `id` (required), `region`, `sort`, `type`, `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/meta/advertisers/ads/list.md

## meta.advertisers.search

Find advertisers (Facebook pages) in the Meta Ad Library by name: ID, name, picture, category, page likes, the linked Instagram account. The ID is what the advertiser's ads are asked for by. Up to 15 items a call; $0.0020 per call. Errors and timeouts are not charged; an empty result is charged $0.0020.

- Name: Meta advertiser search API
- Request: `GET /v1/meta/advertisers/search`
- Parameters: `query` (required), `view`, `fields`
- Whole contract: https://dataxapi.com/apis/meta/advertisers/search.md
