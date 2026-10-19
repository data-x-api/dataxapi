# Telegram API

3 endpoints read Telegram: channels, messages. From $0.0020 a call. No Telegram login and no cookie; a failed call is free.

> 3 endpoints. How to call, pay and handle errors is the same everywhere: https://dataxapi.com/llms.txt

Generated from catalog revision c48ce454ae6c4c65, price book 2.

## telegram.channels.get

Get a public Telegram channel by its handle: name, description, subscriber count, verification. One object a call; $0.0020 per call. Errors, timeouts and objects that do not exist are not charged.

- Name: Telegram channel profile API
- Request: `GET /v1/telegram/channels/get`
- Parameters: `username` (required), `view`, `fields`
- Whole contract: https://dataxapi.com/apis/telegram/channels/get.md

## telegram.channels.messages.list

Get a page of a public Telegram channel's messages by its handle, newest first: text, time posted, views, images. Up to 20 items a call; $0.0020 per call. Errors, timeouts and objects that do not exist are not charged; an empty result is charged $0.0020.

- Name: Telegram channel messages API
- Request: `GET /v1/telegram/channels/messages/list`
- Parameters: `username` (required), `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/telegram/channels/messages/list.md

## telegram.messages.get

Get one message of a public Telegram channel by channel handle and message number, or by its link: text, time posted, views, images. One object a call; $0.0020 per call. Errors, timeouts and objects that do not exist are not charged.

- Name: Telegram message detail API
- Request: `GET /v1/telegram/messages/get`
- Parameters: `id`, `url`, `view`, `fields`; give exactly one of id, url
- Whole contract: https://dataxapi.com/apis/telegram/messages/get.md
