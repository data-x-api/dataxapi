# Google Ads API

3 endpoints read Google Ads: ad library, advertisers. From $0.0020 a call. No Google Ads login and no cookie; a failed call is free.

> 3 endpoints. How to call, pay and handle errors is the same everywhere: https://dataxapi.com/llms.txt

Generated from catalog revision c48ce454ae6c4c65, price book 2.

## google.ads.get

Get one ad of the Google Ads Transparency Center by its ID or link: format, headline, description, landing page, images and videos, when it was first and last shown, the countries or regions it was shown in, and the range of total impressions where the center publishes it. One object a call; $0.0020 per call. Errors, timeouts and objects that do not exist are not charged.

- Name: Google ad detail API
- Request: `GET /v1/google/ads/get`
- Parameters: `id`, `url`, `view`, `fields`; give exactly one of id, url
- Whole contract: https://dataxapi.com/apis/google/ads/get.md

## google.advertisers.ads.list

Get an advertiser's ads from the Google Ads Transparency Center, by the advertiser's ID: format (text, image, video), when each was first and last shown, and a picture of it; can be limited to a country and to one format. 40 ads a page; what an ad says and where it leads come from the Google ad capability. Up to 40 items a call; $0.0020 per call. Errors and timeouts are not charged; an empty result is charged $0.0020.

- Name: Google advertiser's ads API
- Request: `GET /v1/google/advertisers/ads/list`
- Parameters: `id` (required), `region`, `type`, `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/google/advertisers/ads/list.md

## google.advertisers.search

Find advertisers in the Google Ads Transparency Center by name: ID, name, the country or region they are registered in, and the center's estimate of how many ads they have. The ID is what the advertiser's ads are asked for by. Up to 10 items a call; $0.0020 per call. Errors and timeouts are not charged; an empty result is charged $0.0020.

- Name: Google advertiser search API
- Request: `GET /v1/google/advertisers/search`
- Parameters: `query` (required), `region`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/google/advertisers/search.md
