# LinkedIn API

7 endpoints read LinkedIn: posts, companies, ad library. From $0.0020 a call. No LinkedIn login and no cookie; a failed call is free.

> 7 endpoints. How to call, pay and handle errors is the same everywhere: https://dataxapi.com/llms.txt

Generated from catalog revision c48ce454ae6c4c65, price book 2.

## linkedin.ads.get

Get one ad of the LinkedIn Ad Library by its ID or link: advertiser, text, headline, images and videos, landing page, first and last day shown, bracket of impressions, the languages and locations targeted. One object a call; $0.0020 per call. Errors, timeouts and objects that do not exist are not charged.

- Name: LinkedIn ad detail API
- Request: `GET /v1/linkedin/ads/get`
- Parameters: `id`, `url`, `view`, `fields`; give exactly one of id, url
- Whole contract: https://dataxapi.com/apis/linkedin/ads/get.md

## linkedin.ads.search

Search the ads of the LinkedIn Ad Library by keyword: advertiser, text, headline, images and videos, landing page, first and last day shown, bracket of impressions, the languages and locations targeted; can be limited to a country. Up to 24 items a call; $0.0020 per call. Errors and timeouts are not charged; an empty result is charged $0.0020.

- Name: LinkedIn Ad Library search API
- Request: `GET /v1/linkedin/ads/search`
- Parameters: `query` (required), `region`, `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/linkedin/ads/search.md

## linkedin.companies.get

Get a LinkedIn company page by handle or link: name, description, employee count, industry, size, kind of company, headquarters, website. One object a call; $0.0020 per call. Errors, timeouts and objects that do not exist are not charged.

- Name: LinkedIn company page API
- Request: `GET /v1/linkedin/companies/get`
- Parameters: `username`, `url`, `view`, `fields`; give exactly one of username, url
- Whole contract: https://dataxapi.com/apis/linkedin/companies/get.md

## linkedin.companies.posts.list

Get the latest posts a LinkedIn company page shows publicly (up to 10), by handle or link: ID, link, text, time. No author and no counts, which the post capability gives; this page only, with no older page. Up to 10 items a call; $0.0020 per call. Errors, timeouts and objects that do not exist are not charged; an empty result is charged $0.0020.

- Name: LinkedIn company posts API
- Request: `GET /v1/linkedin/companies/posts/list`
- Parameters: `username`, `url`, `view`, `fields`; give exactly one of username, url
- Whole contract: https://dataxapi.com/apis/linkedin/companies/posts/list.md

## linkedin.posts.get

Get one LinkedIn post by its activity ID or link: text, author, time, reaction count, comment count, images. One object a call; $0.0020 per call. Errors, timeouts and objects that do not exist are not charged.

- Name: LinkedIn post detail API
- Request: `GET /v1/linkedin/posts/get`
- Parameters: `id`, `url`, `view`, `fields`; give exactly one of id, url
- Whole contract: https://dataxapi.com/apis/linkedin/posts/get.md

## linkedin.posts.search

Find public LinkedIn posts by search terms: text, author, time, reaction count, comment count; can be limited to a recent period. Results come from a web search engine's index of LinkedIn, not LinkedIn's own search, and are not complete. Up to 10 items a call; $0.0020 per call. Errors and timeouts are not charged; an empty result is free.

- Name: LinkedIn post search API
- Request: `GET /v1/linkedin/posts/search`
- Parameters: `query` (required), `published_within`, `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/linkedin/posts/search.md

## linkedin.posts.transcript.get

Get what is said in the video of a LinkedIn post by its activity ID or link, as one text. Only where LinkedIn itself publishes a transcript with the video; most videos have none. One object a call; $0.0020 per call. Errors, timeouts and objects that do not exist are not charged.

- Name: LinkedIn video transcript API
- Request: `GET /v1/linkedin/posts/transcript/get`
- Parameters: `id`, `url`, `view`, `fields`; give exactly one of id, url
- Whole contract: https://dataxapi.com/apis/linkedin/posts/transcript/get.md
