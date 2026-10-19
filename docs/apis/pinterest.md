# Pinterest API

2 endpoints read Pinterest: pins. From $0.0020 a call. No Pinterest login and no cookie; a failed call is free.

> 2 endpoints. How to call, pay and handle errors is the same everywhere: https://dataxapi.com/llms.txt

Generated from catalog revision c48ce454ae6c4c65, price book 2.

## pinterest.pins.get

Get one Pinterest pin by ID or link: title, description, picture, who pinned it and when, reaction, comment and save counts, the page it points to. One object a call; $0.0020 per call. Errors, timeouts and objects that do not exist are not charged.

- Name: Pinterest pin detail API
- Request: `GET /v1/pinterest/pins/get`
- Parameters: `id`, `url`, `view`, `fields`; give exactly one of id, url
- Whole contract: https://dataxapi.com/apis/pinterest/pins/get.md

## pinterest.pins.search

Find Pinterest pins by search terms: title, description, picture, who pinned it and when, the page it points to. No counts, which the pin capability gives. About 20 items a call, 50 at most; $0.0020 per call. Errors and timeouts are not charged; an empty result is charged $0.0020.

- Name: Pinterest pin search API
- Request: `GET /v1/pinterest/pins/search`
- Parameters: `query` (required), `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/pinterest/pins/search.md
