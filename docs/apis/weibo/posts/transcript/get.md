# Weibo video transcript (video to text) API

Give a Weibo video post's link, share text or ID and get what is said in its video: the whole text, each sentence with its start and end time, and ready SRT subtitles, with the post's text, author and length; speakers can be told apart. Charged a call, plus by the minute of video when its speech is recognised; nothing when nobody speaks. A video of up to 5 minutes comes back as text; one over 5 minutes and up to 2 hours is answered at once with a job: call again with it a little later for the text, charged by its actual minutes and only when the text is delivered. One object a call; $0.0020 a call, plus $0.0038 a minute when the speech is recognised (a part minute counts as one); none when the platform's own captions are used; at most $0.0210 a call for a video of up to 5 minutes, a longer one, up to 2 hours, by its actual minutes. Errors, timeouts and objects that do not exist are not charged.

- Endpoint: `GET https://api.dataxapi.com/v1/weibo/posts/transcript/get`
- ID: `weibo.posts.transcript.get`
- Also known as: weibo transcript, weibo video to text, weibo speech to text
- Price: $0.0020 / call, plus each minute recognised
- Live status is not on this page, which is a snapshot. Read it with `GET https://api.dataxapi.com/v1/catalog/status`
- Returns: 1 object, one transcript object
- Returns the standard transcript object, the same on every platform
- `id` is in the link: `m.weibo.cn/detail/<id>`. Or pass the whole link as `url`.
- [No code: try the Weibo video to text →](https://dataxapi.com/tools/weibo-transcript/)
- [Run it in the Playground](https://dataxapi.com/console/playground/?capability=weibo.posts.transcript.get&params=%7B%22id%22%3A%225352571897120856%22%7D)
- In Chinese: [微博视频转文字（文案提取、逐字稿）API](https://dataxapi.com/zh/apis/weibo/posts/transcript/get/)

## What you get

The first 2 rows of a response recorded 2026-11-21 10:01 UTC.

| start | end |
| --- | --- |
| 4.06 | 6.02 |
| 6.66 | 11.06 |

## Parameters

| Parameter | Type | required | Description |
| --- | --- | --- | --- |
| `id` | text | give exactly one of `id`, `url`, `job` | Post ID, a string of digits. With only a link or a share text, give it as url. Example: `5352571897120856`. |
| `url` | text | give exactly one of `id`, `url`, `job` | Link to the post, pasted as it is: the site's https://weibo.com/<user>/… (digits or letters after it), the phone site's https://m.weibo.cn/detail/… or /status/…, or a whole share text with one of these in it. Example: `https://m.weibo.cn/detail/5352571897120856`. Full link: `https://m.weibo.cn/detail/5352571897120856`. Share text with a link inside: `看看这条微博 https://m.weibo.cn/detail/5352571897120856 来自微博`. |
| `speakers` | text |  | Whether to tell speakers apart: yes marks who said each segment (1, 2…), no does not. Values: `yes`, `no` (default). Example: `no`. |
| `job` | text | give exactly one of `id`, `url`, `job` | The job a call with a long video's link (over 5 minutes, up to 2 hours), or with one whose recognition did not finish within the call, answered with: call this endpoint with it a little later for the text, within 24 hours of submitting. Give one of id, url and job; with job, speakers is as it was when submitted. Example: `tr_047_WbExampleJob00000000`. |
| `view` | text |  | How much of each item to return. All three cost the same. Values: `compact`, `standard` (default), `full`. |
| `fields` | list of text |  | Return only these fields. Each by its path, such as `author.name`. |

## Returned fields

`data.item` is one transcript object. Stable: fields are only ever added.

Three views: `compact` (the most used fields, long text cut short), `standard` (the default: every standard field) and `full` (adds `ext`, the platform's own fields). A field is in the view named and in every larger one.

| Field | Type | Description | From view | This endpoint |
| --- | --- | --- | --- | --- |
| `post_id` | text | ID of the post it belongs to. | `compact` | Yes |
| `status` | text | done: the text is here; processing: a long video is still being recognised and there is no text yet: call the same endpoint with job after retry_after_seconds seconds. Values: `done`, `processing`. | `compact` | Yes |
| `job` | text | A long video's job: call the same endpoint with it for the text, within 24 hours of submitting; only while processing. | `compact` | Yes |
| `retry_after_seconds` | integer | About how many seconds to wait before asking again; only while processing. | `compact` | Yes |
| `lang` | text | Language code. | `compact` | Not provided here |
| `text` | text | The whole text. Long text: the compact view keeps the first 500 characters and says so in `warnings`. | `compact` | Yes |
| `segments` | list of object | Timed segments. | `standard` | Yes |
| `segments[].start` | number | Start, in seconds. | `standard` | Yes |
| `segments[].end` | number | End, in seconds. | `standard` | Yes |
| `segments[].text` | text | Text of the segment. | `standard` | Yes |
| `segments[].speaker` | text | Who said the segment (1, 2…, one number a person); null where telling speakers apart was not asked for. | `standard` | Yes |
| `segments[].words` | list of object | The timing of each word (character) of the segment. | `full` | Yes |
| `segments[].words[].start` | number | Start, in seconds. | `full` | Yes |
| `segments[].words[].end` | number | End, in seconds. | `full` | Yes |
| `segments[].words[].text` | text | The word (character). | `full` | Yes |
| `duration` | number | Length of what was transcribed, in seconds; what an endpoint billed by the minute charges by. | `standard` | Yes |
| `post` | object | The post the words are from: title, caption, author, length, time posted, likes and comments, as far as the platform gives them. | `standard` | Yes |
| `post.title` | text | Title; none on a platform without titles. | `standard` | The platform has none |
| `post.text` | text | Caption or description. Long text: the compact view keeps the first 500 characters and says so in `warnings`. | `standard` | Yes |
| `post.url` | link | Link to the post. | `standard` | Yes |
| `post.published_at` | time | Time posted. | `standard` | Yes |
| `post.duration` | number | Length of the video as the platform gives it, in seconds. | `standard` | Yes |
| `post.author` | object | Author. | `standard` | Yes |
| `post.author.id` | text | Author's ID. | `standard` | Yes |
| `post.author.name` | text | Author's name. | `standard` | Yes |
| `post.metrics` | object | Engagement counts. | `standard` | Yes |
| `post.metrics.likes` | integer | Likes. | `standard` | Yes |
| `post.metrics.comments` | integer | Comments. | `standard` | Yes |
| `ext.source` | text | Where the text came from: platform_subtitle is the subtitles the platform made for the video, speech_recognition is the speech in the video recognised as text. Values: `platform_subtitle`, `speech_recognition`. | `full` | Yes |
| `ext.srt` | text | Ready SRT subtitles made from the segments, to save as an .srt file as it is. Long text: the compact view keeps the first 500 characters and says so in `warnings`. | `full` | Yes |
| `ext.charged_in` | text | The call a long video's text was charged in (its request ID): fetched again with the same job, this time is not charged; none the first time it is fetched. | `full` | Yes |
| `approximate` | list of object | Which numbers of this item are approximate or lower bounds; absent when all are exact. | `compact` | Yes |
| `approximate[].field` | text | Path of the field, such as metrics.views. | `compact` | Yes |
| `approximate[].kind` | text | Approximate, or a lower bound. Values: `approximate`, `lower_bound`. | `compact` | Yes |

A field with no value on an item is `null`. A field this endpoint cannot give is left out and listed in `meta.unavailable`.

Typical size of one item: `compact` 1.4 KB, `standard` 5.4 KB, `full` 30.4 KB (measured on the response recorded 2026-11-21 10:01 UTC).

## Paging

One object per call: there is nothing to page.

## When you are charged

| Case | Charged |
| --- | --- |
| A result with data | $0.0020 a call, plus $0.0038 a minute when the speech is recognised (a part minute counts as one); none when the platform's own captions are used |
| The object does not exist (404) | not charged |
| Invalid parameters, a failure or a timeout | not charged |
| The most one call can cost, a video of up to 5 minutes | $0.0210 (a longer video, up to 2 hours, by its actual minutes; send `X-Max-Price` to refuse anything above your own limit) |

Prices as read 2026-11-27 06:18 UTC, under price book 23, in effect since 2026-11-27 06:13 UTC; the Playground reads the price in force before a run.

## If the object does not exist

The answer is 404 `not_found` and nothing is charged. `reason` says which: `not_found` (it does not exist) or `private_or_deleted`.

## Errors

Every error has the same structure: `code`, `message`, `charged`, `retry`, `retry_after_seconds`, `param`, `docs_url`.

| HTTP | Code | Meaning | Charged | Retry |
| --- | --- | --- | --- | --- |
| 400 | `invalid_params` | A parameter is invalid | No | After a fix |
| 400 | `request_not_served` | This combination of parameters cannot be served at present | No | After a fix |
| 400 | `max_price_exceeded` | The most this call could cost is above the limit you set | No | After a fix |
| 401 | `unauthorized` | No credential was sent, or it is invalid, disabled or expired | No | No |
| 402 | `insufficient_balance` | The balance is too low | No | After a fix |
| 402 | `key_budget_exceeded` | This key's spending limit does not cover the call | No | After a fix |
| 402 | `run_budget_exceeded` | This run's amount or call limit does not cover the call | No | No |
| 403 | `account_suspended` | The account is suspended | No | No |
| 403 | `forbidden` | This credential may not use that option | No | No |
| 403 | `key_scope_denied` | This key may not call this endpoint | No | No |
| 404 | `not_found` | The object does not exist, is private or was deleted | No | No |
| 404 | `run_not_found` | No run under this run ID | No | No |
| 409 | `call_in_progress` | The call under this idempotency key is still running; ask again with the same key shortly | No | With the same idempotency key |
| 409 | `idempotency_conflict` | This idempotency key was used for a different request | No | After a fix |
| 410 | `run_expired` | This run has expired and starts no more calls | No | No |
| 429 | `rate_limited` | Too many requests, or too many calls in progress | No | Yes |
| 429 | `cost_cap_exceeded` | This account's allowance for today is used up | No | Yes |
| 429 | `uncharged_cost_limit` | Too many of this account's calls today returned nothing and were not charged; endpoints of this kind can be called again tomorrow (UTC) | No | Yes |
| 500 | `settlement_unknown` | Whether this call settled is not known; ask again with the same idempotency key, or look it up by request ID | Unknown: look the call up | With the same idempotency key |
| 500 | `internal_error` | The service failed | No | Yes |
| 502 | `upstream_failed` | No result came back this time and nothing was charged; retry shortly | No | Yes |
| 503 | `upstream_busy` | Busy just now; retry shortly | No | Yes |
| 503 | `capability_paused` | This endpoint is paused | No | Yes |
| 503 | `overloaded` | The service is busy; retry shortly | No | Yes |
| 504 | `timeout` | The data did not arrive in time; retry with the same idempotency key | No | Yes |

[All error codes](https://dataxapi.com/docs/errors/)

## Request

The key is read from the environment; no key is ever written into a page.

### cURL

```bash
curl -G "https://api.dataxapi.com/v1/weibo/posts/transcript/get" \
  --data-urlencode "id=5352571897120856" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
# pip install dataxapi
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.weibo.posts.transcript.get(id="5352571897120856")
print(result["data"]["item"])
```

### TypeScript

```typescript
// npm i @dataxapi/sdk
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.weibo.posts.transcript.get({ id: "5352571897120856" });
console.log(result.data.item);
```

### CLI

```bash
dataxapi call weibo.posts.transcript.get id=5352571897120856
```

### MCP

```json
{
  "mcpServers": {
    "dataxapi": {
      "type": "http",
      "url": "https://api.dataxapi.com/mcp",
      "headers": {
        "Authorization": "Bearer ${DATAXAPI_API_KEY}"
      }
    }
  }
}
```

Add this to your MCP client, then ask your agent to call `weibo.posts.transcript.get`.

## Responses

### 200

From a response recorded 2026-11-21 10:01 UTC. Names, text and IDs are examples, and so are the links: none is the recorded one (the page shows no one's personal data); the figures are as recorded. Long lists are cut. The request ID, cursor and balance are made up.

Size as sent: 5.8 KB in the standard view (1.9 KB compact, 30.8 KB full).

```jsonc
{
  "code": "ok",
  "request_id": "61dbfc39-05de-422a-9c0a-38d35013064a",
  "data": {
    "item": {
      "post_id": "5279970061603008",
      "status": "done",
      "text": "大家好，今天带大家看一下我这次周末露营带的东西。先说结论：轻、能装进一个包、不怕摔。下面一件一件说。",
      "segments": [
        {
          "start": 4.06,
          "end": 6.02,
          "text": "大家好，今天带大家看一下我这次周末露营带的东西。",
          "speaker": null
        },
        {
          "start": 6.66,
          "end": 11.06,
          "text": "先说结论：轻、能装进一个包、不怕摔。",
          "speaker": null
        },
        // … 23 more
      ],
      "duration": 142.526,
      "post": {
        "text": "大家好，今天带大家看一下我这次周末露营带的东西。先说结论：轻、能装进一个包、不怕摔。下面一件一件说。",
        "url": "https://weibo.com/6405759273/27bYn5lfB",
        "published_at": "2026-10-12T03:42:49.000Z",
        "duration": 142,
        "author": { "id": "6723717040", "name": "认真生活的阿雅" },
        "metrics": { "likes": 71, "comments": 4 }
      }
    }
  },
  "warnings": [
    {
      "code": "fields_unparsed",
      "item": 0,
      "fields": ["job", "retry_after_seconds", "ext.charged_in"]
    }
  ],
  "meta": {
    "capability": "weibo.posts.transcript.get",
    "result_status": "complete",
    "fetched_at": "2026-11-21T10:01:42.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": { "lang": "capability", "post.title": "platform" },
    "billing": {
      "amount": "0.0134",
      "currency": "USD",
      "balance_after": "9.9866"
    }
  }
}
```

### 400

An example written to the specification, not a recorded response.

```json
{
  "code": "invalid_params",
  "request_id": "38aa54aa-89d6-4cba-9897-1b676de168ce",
  "message": "A parameter is invalid",
  "message_zh": "参数不合法",
  "charged": false,
  "retry": "after_fix",
  "retry_after_seconds": null,
  "param": null,
  "problems": ["give exactly one of id, url, job"],
  "docs_url": "https://dataxapi.com/docs/errors#invalid_params"
}
```

### 402

An example written to the specification, not a recorded response.

```json
{
  "code": "insufficient_balance",
  "request_id": "2834515a-d3a1-4df6-bb86-01fcdba9e541",
  "message": "The balance is too low",
  "message_zh": "余额不足",
  "charged": false,
  "retry": "after_fix",
  "retry_after_seconds": null,
  "param": null,
  "required": "0.021",
  "available": "0",
  "top_up_url": "https://dataxapi.com/console/billing/?amount=10",
  "next_step": "The balance does not cover this call ($0.021). Top up at top_up_url: $10 at least, about 476 calls at this price; Alipay or a card, and the balance never expires. Then send the same request again, unchanged. Nothing was charged for this one.",
  "next_step_zh": "余额不够这次调用（$0.021）。到 top_up_url 充值：最低 $10，按这次的价格约够 476 次；支付宝、银行卡都能付，余额不过期。到账后把同一个请求原样再发一次。这次没有扣钱。",
  "docs_url": "https://dataxapi.com/docs/errors#insufficient_balance"
}
```

### 404

An example written to the specification, not a recorded response.

```json
{
  "code": "not_found",
  "request_id": "bcf9bf32-11dd-40ab-90bb-14f5e2fa07a3",
  "message": "The object does not exist, is private or was deleted",
  "message_zh": "对象不存在、私密或已删除",
  "charged": false,
  "retry": "no",
  "retry_after_seconds": null,
  "param": null,
  "reason": "not_found",
  "docs_url": "https://dataxapi.com/docs/errors#not_found"
}
```

### 502

An example written to the specification, not a recorded response.

```json
{
  "code": "upstream_failed",
  "request_id": "22d610da-1bc3-4887-8bc6-1056f0f9e257",
  "message": "No result came back this time and nothing was charged; retry shortly",
  "message_zh": "这次没有取到结果，没有扣费，可以稍后重试",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

[This example as a JSON file](https://dataxapi.com/apis/weibo/posts/transcript/get.example.json)

## Use it in your AI

`dataxapi setup` gives the agents on your machine (Claude Code, Codex, Cursor) the DataXAPI MCP server and the base skill. The key is read from DATAXAPI_API_KEY; none is written into a file.

MCP server: `https://api.dataxapi.com/mcp`. The entry for your client is under MCP in the request examples of this page; then ask your agent to call `weibo.posts.transcript.get`.

Or paste this to any AI:

> Read https://dataxapi.com/apis/weibo/posts/transcript/get.md and help me use the DataXAPI endpoint weibo.posts.transcript.get (Weibo video transcript (video to text)).

[Open in ChatGPT](https://chatgpt.com/?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fweibo%2Fposts%2Ftranscript%2Fget.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20weibo.posts.transcript.get%20%28Weibo%20video%20transcript%20%28video%20to%20text%29%29.) · [Open in Claude](https://claude.ai/new?q=Read%20https%3A%2F%2Fdataxapi.com%2Fapis%2Fweibo%2Fposts%2Ftranscript%2Fget.md%20and%20help%20me%20use%20the%20DataXAPI%20endpoint%20weibo.posts.transcript.get%20%28Weibo%20video%20transcript%20%28video%20to%20text%29%29.)

## Related

Part of DataXAPI's Social media data. The same key also works for: Creators, Ads, E-commerce.

The same thing on other platforms: [Bilibili video transcript (video to text)](https://dataxapi.com/apis/bilibili/videos/transcript/get/), [Douyin video transcript (video to text)](https://dataxapi.com/apis/douyin/videos/transcript/get/), [Kuaishou video transcript (video to text)](https://dataxapi.com/apis/kuaishou/videos/transcript/get/), [Meta ad video transcript](https://dataxapi.com/apis/meta/ads/transcript/get/), [Instagram video transcript](https://dataxapi.com/apis/instagram/posts/transcript/get/), [TikTok video transcript](https://dataxapi.com/apis/tiktok/videos/transcript/get/), [YouTube video transcript](https://dataxapi.com/apis/youtube/videos/transcript/get/), [LinkedIn video transcript](https://dataxapi.com/apis/linkedin/posts/transcript/get/), [Reddit video transcript](https://dataxapi.com/apis/reddit/posts/transcript/get/), [X video transcript](https://dataxapi.com/apis/x/posts/transcript/get/), [Xiaohongshu video transcript (video to text)](https://dataxapi.com/apis/xiaohongshu/videos/transcript/get/), [WeChat Channels video transcript](https://dataxapi.com/apis/wechat_channels/videos/transcript/get/)

More Social media data on other platforms: [Douyin comment replies](https://dataxapi.com/apis/douyin/comments/replies/list/), [Douyin hashtag videos](https://dataxapi.com/apis/douyin/hashtags/videos/list/), [Bilibili comment replies](https://dataxapi.com/apis/bilibili/comments/replies/list/), [Bilibili hot searches](https://dataxapi.com/apis/bilibili/trends/list/), [Bilibili user profile](https://dataxapi.com/apis/bilibili/users/get/), [Bilibili user videos](https://dataxapi.com/apis/bilibili/users/videos/list/)

Weibo endpoints: [Weibo comment replies](https://dataxapi.com/apis/weibo/comments/replies/list/), [Weibo post comments](https://dataxapi.com/apis/weibo/posts/comments/list/), [Weibo post detail](https://dataxapi.com/apis/weibo/posts/get/), [Weibo video transcript (video to text)](https://dataxapi.com/apis/weibo/posts/transcript/get/), [Weibo post likers](https://dataxapi.com/apis/weibo/posts/likers/list/), [Weibo realtime search](https://dataxapi.com/apis/weibo/posts/search/), [Weibo hot search board](https://dataxapi.com/apis/weibo/trends/list/), [Weibo user followers](https://dataxapi.com/apis/weibo/users/followers/list/), [Weibo user profile](https://dataxapi.com/apis/weibo/users/get/), [Weibo user posts](https://dataxapi.com/apis/weibo/users/posts/list/), [Weibo user search](https://dataxapi.com/apis/weibo/users/search/), [Weibo video and image downloader](https://dataxapi.com/apis/weibo/posts/media/get/), [Weibo hot search board (backup)](https://dataxapi.com/apis/weibo/backup/trends/list/)

Skills that use this endpoint: [Breaking down a hit](https://dataxapi.com/skills/viral/), [Videos to text](https://dataxapi.com/skills/transcripts/), [A creator's videos to text](https://dataxapi.com/skills/creator-transcripts/)

Tools built on this endpoint: [Weibo video to text: look it up (sign-in)](https://dataxapi.com/tools/weibo-transcript/)

Related: [All Weibo endpoints](https://dataxapi.com/apis/weibo/), [Social media data](https://dataxapi.com/categories/social/), [The same thing on 13 platforms, side by side](https://dataxapi.com/roles/transcripts-get/), [The transcript object's fields](https://dataxapi.com/docs/objects/transcript/)

## Questions

### How much does the Weibo video transcript (video to text) API cost?

$0.0020 a call, plus $0.0038 a minute when the speech is recognised (a part minute counts as one); none when the platform's own captions are used; at most $0.0210 a call for a video of up to 5 minutes, a longer one, up to 2 hours, by its actual minutes.

### When am I not charged?

Errors, timeouts and objects that do not exist are not charged.

### What happens if the object does not exist?

The answer is 404 not_found and nothing is charged. reason says which: not_found (it does not exist) or private_or_deleted.

### Is it charged per call or by the length, and what do 100 Weibo videos cost?

Both: $0.0020 a call, plus $0.0038 a minute when the speech is recognised (a part minute counts as one); none when the platform's own captions are used. A recognised 40-second video is $0.0020 plus $0.0038, a 61-second one $0.0020 plus twice $0.0038. 100 recognised videos of a minute or less come to 100 times ($0.0020 + $0.0038). What a call was charged is in meta.billing of its answer; a call holds at most $0.0020 and 5 minutes before it runs. No subscription, no monthly minimum.

### Does it give timestamps and SRT subtitles?

Yes. Besides the whole text, segments gives each sentence with its start and end in seconds; the full view adds the timing of each word and ext.srt, ready SRT subtitles to save as an .srt file. With speakers=yes each segment says who said it (1, 2…). Along with them come the post's title or caption, author, time posted, likes and comments, and the length transcribed in duration. Only a post with a video is transcribed; a post of text or pictures has no speech to turn into text and is answered as not there, free of charge.

### What about videos over 5 minutes, and many videos at once?

A video of up to 5 minutes comes back as text in the same call. One over 5 minutes and up to 2 hours is answered at once with a job: call this endpoint again with the job a little later for the text, charged by its actual minutes and only when the text is delivered. A short video whose recognition does not finish within the call is answered with a job the same way. Videos over 2 hours are not supported yet. For many videos, make one call each: from the SDKs or the command line in a loop, each charged by its own minutes.

### Is a failure, or a video where nobody speaks, charged?

No. A video in which nobody speaks (music or silence only), a post that is not a video, a deleted or private one, one over 2 hours, and any error or timeout are all free: only a transcript that comes back is charged, a long video's when its text is collected.

### How do I use it in ChatGPT or Claude?

Connect DataXAPI once (one prompt with your key, on the agents page), then ask in plain words: "Turn the video of this Weibo post into text with DataXAPI" and paste its link or share text. The agent calls weibo.posts.transcript.get; each call is charged $0.0020, plus $0.0038 a minute when the speech is recognised.

---

Last checked 2026-11-27 06:18 UTC. Catalog revision 0264e2d6dd4ff743. [HTML version](https://dataxapi.com/apis/weibo/posts/transcript/get/)
