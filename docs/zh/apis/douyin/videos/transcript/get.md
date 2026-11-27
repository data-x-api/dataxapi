# 抖音视频转文字（文案提取、逐字稿）API

给一条抖音视频的链接、分享文案或编号，返回视频里说的话：全文、每一句的起止时间和现成的 SRT 字幕，连同标题、作者和时长；可以区分说话人。每次收费，识别语音的另按视频分钟数收，没人说话不收。5 分钟以内的视频直接返回文字；超过 5 分钟、2 小时以内的先回一个凭证（job），过一会儿带着它再调这个接口取文字，按实际分钟数收，只在取到文字时收。每次取一个对象；每次 $0.0020；识别的视频另加每分钟 $0.0038，不足一分钟按一分钟；用平台字幕的不加；5 分钟以内的视频每次最多 $0.0210，更长的按实际分钟数收，最长 2 小时。出错、超时、对象不存在都不收费。

- 地址：`GET https://api.dataxapi.com/v1/douyin/videos/transcript/get`
- 编号：`douyin.videos.transcript.get`
- 也叫：抖音视频转文字、抖音文案提取、提取抖音文案、抖音逐字稿、抖音口播文案、抖音字幕、抖音视频字幕提取、抖音语音转文字
- 价格：$0.0020 / 次，识别另按分钟
- 当前状态不写在这一页上（页面是快照），实时读：`GET https://api.dataxapi.com/v1/catalog/status`
- 返回：1 个对象, 一个逐字稿对象
- 返回标准的逐字稿结构，各平台相同
- `id` 就在链接里：`douyin.com/video/<id>`。也可以把整条链接传给 `url`。
- [不写代码：用「抖音视频转文字（文案提取）」直接查 →](https://dataxapi.com/zh/tools/douyin-transcript/)
- [在 Playground 里跑一次](https://dataxapi.com/zh/console/playground/?capability=douyin.videos.transcript.get&params=%7B%22id%22%3A%227694940173372575014%22%7D)
- 英文名：[Douyin video transcript (video to text) API](https://dataxapi.com/apis/douyin/videos/transcript/get/)

## 能拿到什么

2026-11-21 10:00 UTC 录下的真实返回，这里是前 2 行。

| start | end |
| --- | --- |
| 0.12 | 1.88 |
| 2.88 | 16.35 |

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | 文本 | `id`、`url`、`job` 里给且只给一个 | 视频编号，一串数字。手里只有链接或分享口令时，填到 url。示例：`7694940173372575014`。 |
| `url` | 文本 | `id`、`url`、`job` 里给且只给一个 | 视频链接，原样粘贴即可：网页链接 https://www.douyin.com/video/…、带 modal_id 的网页链接、手机分享页链接、App 复制出来的 v.douyin.com 短链接，或含这些链接的整段分享口令（“复制打开抖音，看看……”）。短链接由我们打开一次，看它跳到哪条视频。示例：`https://www.douyin.com/video/7694940173372575014`。长链接：`https://www.douyin.com/video/7694940173372575014`。带链接的分享文案：`7.69 复制打开抖音，看看【示例的作品】 https://www.douyin.com/video/7694940173372575014 复制此链接，打开Dou音搜索，直接观看视频！`。 |
| `speakers` | 文本 |  | 要不要区分说话人：yes 在每一段标出是谁说的（1、2…），no 不分。取值：`yes`、`no`（默认）。示例：`no`。 |
| `job` | 文本 | `id`、`url`、`job` 里给且只给一个 | 长视频（超过 5 分钟、2 小时以内），或一次调用里没识别完的视频，按链接调用时返回的 job：过一会儿带着它再调这个接口取文字，提交后 24 小时内有效。和 id、url 三样给一样；带 job 时 speakers 按提交时的。示例：`tr_047_DyExampleJob00000000`。 |
| `view` | 文本 |  | 返回档位。三档价格相同。取值：`compact`、`standard`（默认）、`full`。 |
| `fields` | 文本列表 |  | 只要这些字段。按路径写，例如 `author.name`。 |

## 返回字段

`data.item` 是一个逐字稿对象。稳定：字段只增不改。

返回分三档：精简 `compact`（最常用的字段，长文本截短）、标准 `standard`（默认，全部标准字段）、完整 `full`（再加 `ext`，也就是这个平台特有的字段）。字段从表里写的那一档起出现，更大的档位也带。

| 字段 | 类型 | 说明 | 起始档位 | 这个接口 |
| --- | --- | --- | --- | --- |
| `post_id` | 文本 | 所属内容的编号。 | `compact` | 有 |
| `status` | 文本 | done 是文字已经在这里；processing 是长视频还在识别，文字还没有：过 retry_after_seconds 秒后带着 job 再调同一个接口取。取值：`done`、`processing`。 | `compact` | 有 |
| `job` | 文本 | 长视频的凭证：带着它再调同一个接口取文字，提交后 24 小时内有效；只在 processing 时有。 | `compact` | 有 |
| `retry_after_seconds` | 整数 | 建议多少秒后再来取；只在 processing 时有。 | `compact` | 有 |
| `lang` | 文本 | 语言代码。 | `compact` | 这个接口不提供 |
| `text` | 文本 | 全文。长文本：精简档只保留前 500 个字符，并在 `warnings` 里写明。 | `compact` | 有 |
| `segments` | 对象列表 | 带时间的分段。 | `standard` | 有 |
| `segments[].start` | 数字 | 开始时间，秒。 | `standard` | 有 |
| `segments[].end` | 数字 | 结束时间，秒。 | `standard` | 有 |
| `segments[].text` | 文本 | 这一段的文字。 | `standard` | 有 |
| `segments[].speaker` | 文本 | 这一段是谁说的（1、2…，同一个人同一个号）；没要求区分说话人时为 null。 | `standard` | 有 |
| `segments[].words` | 对象列表 | 这一段里每个字（词）的时间。 | `full` | 有 |
| `segments[].words[].start` | 数字 | 开始时间，秒。 | `full` | 有 |
| `segments[].words[].end` | 数字 | 结束时间，秒。 | `full` | 有 |
| `segments[].words[].text` | 文本 | 这个字（词）。 | `full` | 有 |
| `duration` | 数字 | 转写的音视频时长，秒；按分钟计费的接口按它收费。 | `standard` | 有 |
| `post` | 对象 | 这段话所在的内容：标题、文案、作者、时长、发布时间、点赞和评论数，平台有什么给什么。 | `standard` | 有 |
| `post.title` | 文本 | 标题；没有标题的平台没有。 | `standard` | 有 |
| `post.text` | 文本 | 文案或简介。长文本：精简档只保留前 500 个字符，并在 `warnings` 里写明。 | `standard` | 有 |
| `post.url` | 链接 | 内容的链接。 | `standard` | 有 |
| `post.published_at` | 时间 | 发布时间。 | `standard` | 有 |
| `post.duration` | 数字 | 平台写的视频时长，秒。 | `standard` | 有 |
| `post.author` | 对象 | 作者。 | `standard` | 有 |
| `post.author.id` | 文本 | 作者编号。 | `standard` | 有 |
| `post.author.name` | 文本 | 作者的名字。 | `standard` | 有 |
| `post.metrics` | 对象 | 互动数。 | `standard` | 有 |
| `post.metrics.likes` | 整数 | 点赞数。 | `standard` | 有 |
| `post.metrics.comments` | 整数 | 评论数。 | `standard` | 有 |
| `ext.source` | 文本 | 文字从哪来：platform_subtitle 是平台自己给视频生成的字幕，speech_recognition 是我们把视频里的话识别成的文字。取值：`platform_subtitle`、`speech_recognition`。 | `full` | 有 |
| `ext.srt` | 文本 | 现成的 SRT 字幕文本，按分段生成，可直接存成 .srt 文件。长文本：精简档只保留前 500 个字符，并在 `warnings` 里写明。 | `full` | 有 |
| `ext.charged_in` | 文本 | 长视频的文字已经在这次调用里收过费（它的请求号）：同一个 job 再取一次，这一次不收费；第一次取到时没有。 | `full` | 有 |
| `approximate` | 对象列表 | 这一条里哪些数是约数或下限；都是准确值时不出现。 | `compact` | 有 |
| `approximate[].field` | 文本 | 字段的路径，如 metrics.views。 | `compact` | 有 |
| `approximate[].kind` | 文本 | 约数，还是下限。取值：`approximate`、`lower_bound`。 | `compact` | 有 |

某一条本来就没有这个值时，字段给 `null`。这个接口给不了的字段不出现，统一列在 `meta.unavailable`。

每条数据的典型体积：`compact` 184 B、`standard` 899 B、`full` 2.5 KB（按 2026-11-21 10:00 UTC 录下的那次返回量的）。

## 翻页

每次取一个对象，不翻页。

## 什么时候收费

| 情况 | 收费 |
| --- | --- |
| 返回了数据 | 每次 $0.0020；识别的视频另加每分钟 $0.0038，不足一分钟按一分钟；用平台字幕的不加 |
| 对象不存在（404） | 不收费 |
| 参数不合法、出错、超时 | 不收费 |
| 单次最高扣费（5 分钟以内的视频） | $0.0210 (更长的视频按实际分钟数收，最长 2 小时；带 `X-Max-Price` 可以设自己的上限，超过就不执行) |

价格读取于 2026-11-27 06:18 UTC，按价目版本 23，2026-11-27 06:13 UTC 起生效；在 Playground 里运行前会再读一次当前价格。

## 对象不存在时

返回 404 `not_found`，不收费。`reason` 写明是哪一种：`not_found`（不存在）或 `private_or_deleted`（私密或已删除）。

## 常见报错

所有报错都是同一个结构：`code`、`message`、`charged`、`retry`、`retry_after_seconds`、`param`、`docs_url`。

| 状态码 | 代码 | 含义 | 是否扣费 | 能否重试 |
| --- | --- | --- | --- | --- |
| 400 | `invalid_params` | 参数不合法 | 未扣费 | 改了再试 |
| 400 | `request_not_served` | 这种参数组合现在取不了 | 未扣费 | 改了再试 |
| 400 | `max_price_exceeded` | 这次调用的最高价超过了你设的上限 | 未扣费 | 改了再试 |
| 401 | `unauthorized` | 没有带凭证，或凭证无效、已停用、已过期 | 未扣费 | 不能 |
| 402 | `insufficient_balance` | 余额不足 | 未扣费 | 改了再试 |
| 402 | `key_budget_exceeded` | 超出这把 Key 的金额上限 | 未扣费 | 改了再试 |
| 402 | `run_budget_exceeded` | 超出这一轮任务的金额或次数上限 | 未扣费 | 不能 |
| 403 | `account_suspended` | 账户已停用 | 未扣费 | 不能 |
| 403 | `forbidden` | 这个凭证不能带这个选项 | 未扣费 | 不能 |
| 403 | `key_scope_denied` | 这把 Key 不能调用这个接口 | 未扣费 | 不能 |
| 404 | `not_found` | 对象不存在、私密或已删除 | 未扣费 | 不能 |
| 404 | `run_not_found` | 没有这个运行编号 | 未扣费 | 不能 |
| 409 | `call_in_progress` | 这个幂等键的调用还在执行，稍后用同一个键再取 | 未扣费 | 只能用同一个幂等键 |
| 409 | `idempotency_conflict` | 这个幂等键已用于另一个请求 | 未扣费 | 改了再试 |
| 410 | `run_expired` | 这一轮任务已到期，不能再发起调用 | 未扣费 | 不能 |
| 429 | `rate_limited` | 请求过快或同时进行的调用过多 | 未扣费 | 能 |
| 429 | `cost_cap_exceeded` | 这个账户今天的额度已用完 | 未扣费 | 能 |
| 429 | `uncharged_cost_limit` | 这个账户今天没取到数据、也没扣费的调用太多，这类接口到明天（UTC）再调 | 未扣费 | 能 |
| 500 | `settlement_unknown` | 这次调用的结算状态未知，请用同一个幂等键或请求号查询 | 待确认：按请求号查询 | 只能用同一个幂等键 |
| 500 | `internal_error` | 服务内部出错 | 未扣费 | 能 |
| 502 | `upstream_failed` | 这次没有取到结果，没有扣费，可以稍后重试 | 未扣费 | 能 |
| 503 | `upstream_busy` | 现在请求较多，请稍后重试 | 未扣费 | 能 |
| 503 | `capability_paused` | 这个接口已暂停 | 未扣费 | 能 |
| 503 | `overloaded` | 服务繁忙，请稍后重试 | 未扣费 | 能 |
| 504 | `timeout` | 没有在时限内取到数据，可以用同一个幂等键重试 | 未扣费 | 能 |

[全部错误码](https://dataxapi.com/zh/docs/errors/)

## 请求

代码里的 Key 从环境变量读，不把真 Key 写进页面。

### cURL

```bash
curl -G "https://api.dataxapi.com/v1/douyin/videos/transcript/get" \
  --data-urlencode "id=7694940173372575014" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
# pip install dataxapi
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.douyin.videos.transcript.get(id="7694940173372575014")
print(result["data"]["item"])
```

### TypeScript

```typescript
// npm i @dataxapi/sdk
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.douyin.videos.transcript.get({ id: "7694940173372575014" });
console.log(result.data.item);
```

### 命令行

```bash
dataxapi call douyin.videos.transcript.get id=7694940173372575014
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

把这段加进你的 MCP 客户端，然后让你的 AI 调用 `douyin.videos.transcript.get`。

## 返回

### 200

取自 2026-11-21 10:00 UTC 录下的真实返回。名字、正文和编号是示例，链接也是，都不是录到的原文（页面不展示任何人的个人信息）；数字是原样。长列表做了截断。请求号、游标和余额是示意。

返回大小：标准档 1.3 KB（精简 620 B，完整 3.0 KB）。

```jsonc
{
  "code": "ok",
  "request_id": "981ec7b2-2bd6-4c0c-aefd-5184c7fd8efc",
  "data": {
    "item": {
      "post_id": "7400223379711935208",
      "status": "done",
      "text": "大家好，今天带大家看一下我这次周末露营带的东西。先说结论：轻、能装进一个包、不怕摔。下面一件一件说。",
      "segments": [
        {
          "start": 0.12,
          "end": 1.88,
          "text": "大家好，今天带大家看一下我这次周末露营带的东西。",
          "speaker": null
        },
        {
          "start": 2.88,
          "end": 16.35,
          "text": "先说结论：轻、能装进一个包、不怕摔。",
          "speaker": null
        }
      ],
      "duration": 17.464,
      "post": {
        "title": null,
        "text": "大家好，今天带大家看一下我这次周末露营带的东西。先说结论：轻、能装进一个包、不怕摔。下面一件一件说。",
        "url": "https://www.douyin.com/video/7059639574940863060",
        "published_at": "2026-10-10T07:37:57.000Z",
        "duration": 17.62,
        "author": {
          "id": "MS4wLjABAAAA5osZKUYSgIElSWIf6St6vTo5p-aQp9nyiQCET_xOkSb",
          "name": "阿杰爱折腾"
        },
        "metrics": { "likes": 178410, "comments": 109 }
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
    "capability": "douyin.videos.transcript.get",
    "result_status": "complete",
    "fetched_at": "2026-11-21T10:00:18.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": { "lang": "capability" },
    "billing": {
      "amount": "0.0058",
      "currency": "USD",
      "balance_after": "9.9942"
    }
  }
}
```

### 400

按规范写的示例，不是录下的返回。

```json
{
  "code": "invalid_params",
  "request_id": "ec4e0959-4fe7-46aa-a2ad-83524f01ca6f",
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

按规范写的示例，不是录下的返回。

```json
{
  "code": "insufficient_balance",
  "request_id": "c7253c66-20e8-49b4-8548-0c326e0160ee",
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

按规范写的示例，不是录下的返回。

```json
{
  "code": "not_found",
  "request_id": "0036392a-049f-47d2-aafc-05ad0736dba1",
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

按规范写的示例，不是录下的返回。

```json
{
  "code": "upstream_failed",
  "request_id": "74075c20-305b-41ea-a9b4-87456a511fb0",
  "message": "No result came back this time and nothing was charged; retry shortly",
  "message_zh": "这次没有取到结果，没有扣费，可以稍后重试",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

[这份示例的 JSON 文件](https://dataxapi.com/apis/douyin/videos/transcript/get.example.json)

## 在你的 AI 里用它

`dataxapi setup` 给这台电脑上的 AI 代理（Claude Code、Codex、Cursor）装好 DataXAPI 的 MCP 服务和基础技能。Key 从环境变量 DATAXAPI_API_KEY 读，不写进任何文件。

MCP 服务地址：`https://api.dataxapi.com/mcp`。你的客户端要填的配置在本页请求示例的“MCP”页签里；接好后让你的 AI 调用 `douyin.videos.transcript.get`。

或者把这段话贴给任意一个 AI：

> 读一下 https://dataxapi.com/zh/apis/douyin/videos/transcript/get.md，然后帮我用 DataXAPI 的接口 douyin.videos.transcript.get（抖音视频转文字（文案提取、逐字稿））。

[在 ChatGPT 里打开](https://chatgpt.com/?q=%E8%AF%BB%E4%B8%80%E4%B8%8B%20https%3A%2F%2Fdataxapi.com%2Fzh%2Fapis%2Fdouyin%2Fvideos%2Ftranscript%2Fget.md%EF%BC%8C%E7%84%B6%E5%90%8E%E5%B8%AE%E6%88%91%E7%94%A8%20DataXAPI%20%E7%9A%84%E6%8E%A5%E5%8F%A3%20douyin.videos.transcript.get%EF%BC%88%E6%8A%96%E9%9F%B3%E8%A7%86%E9%A2%91%E8%BD%AC%E6%96%87%E5%AD%97%EF%BC%88%E6%96%87%E6%A1%88%E6%8F%90%E5%8F%96%E3%80%81%E9%80%90%E5%AD%97%E7%A8%BF%EF%BC%89%EF%BC%89%E3%80%82) · [在 Claude 里打开](https://claude.ai/new?q=%E8%AF%BB%E4%B8%80%E4%B8%8B%20https%3A%2F%2Fdataxapi.com%2Fzh%2Fapis%2Fdouyin%2Fvideos%2Ftranscript%2Fget.md%EF%BC%8C%E7%84%B6%E5%90%8E%E5%B8%AE%E6%88%91%E7%94%A8%20DataXAPI%20%E7%9A%84%E6%8E%A5%E5%8F%A3%20douyin.videos.transcript.get%EF%BC%88%E6%8A%96%E9%9F%B3%E8%A7%86%E9%A2%91%E8%BD%AC%E6%96%87%E5%AD%97%EF%BC%88%E6%96%87%E6%A1%88%E6%8F%90%E5%8F%96%E3%80%81%E9%80%90%E5%AD%97%E7%A8%BF%EF%BC%89%EF%BC%89%E3%80%82)

## 相关

这是 DataXAPI 社交媒体数据的一部分。同一把 Key 还能用：达人、广告、电商。

同一件事的其他平台：[B站视频转文字（文案提取、逐字稿）](https://dataxapi.com/zh/apis/bilibili/videos/transcript/get/)、[快手视频转文字（文案提取、逐字稿）](https://dataxapi.com/zh/apis/kuaishou/videos/transcript/get/)、[Meta 广告视频字幕](https://dataxapi.com/zh/apis/meta/ads/transcript/get/)、[Instagram 视频字幕](https://dataxapi.com/zh/apis/instagram/posts/transcript/get/)、[TikTok 视频字幕](https://dataxapi.com/zh/apis/tiktok/videos/transcript/get/)、[微博视频转文字（文案提取、逐字稿）](https://dataxapi.com/zh/apis/weibo/posts/transcript/get/)、[YouTube 视频字幕](https://dataxapi.com/zh/apis/youtube/videos/transcript/get/)、[LinkedIn 视频字幕](https://dataxapi.com/zh/apis/linkedin/posts/transcript/get/)、[Reddit 视频字幕](https://dataxapi.com/zh/apis/reddit/posts/transcript/get/)、[X 视频字幕](https://dataxapi.com/zh/apis/x/posts/transcript/get/)、[小红书视频转文字（文案提取、逐字稿）](https://dataxapi.com/zh/apis/xiaohongshu/videos/transcript/get/)、[视频号视频转文字（逐字稿）](https://dataxapi.com/zh/apis/wechat_channels/videos/transcript/get/)

抖音的接口：[抖音评论回复](https://dataxapi.com/zh/apis/douyin/comments/replies/list/)、[抖音话题视频](https://dataxapi.com/zh/apis/douyin/hashtags/videos/list/)、[抖音热榜](https://dataxapi.com/zh/apis/douyin/trends/list/)、[抖音用户资料](https://dataxapi.com/zh/apis/douyin/users/get/)、[抖音达人互动与粉丝趋势](https://dataxapi.com/zh/apis/douyin/users/history/)、[抖音用户搜索](https://dataxapi.com/zh/apis/douyin/users/search/)、[抖音用户视频](https://dataxapi.com/zh/apis/douyin/users/videos/list/)、[抖音视频评论](https://dataxapi.com/zh/apis/douyin/videos/comments/list/)、[抖音视频详情](https://dataxapi.com/zh/apis/douyin/videos/get/)、[抖音视频转文字（文案提取、逐字稿）](https://dataxapi.com/zh/apis/douyin/videos/transcript/get/)、[抖音视频播放量](https://dataxapi.com/zh/apis/douyin/videos/metrics/)、[抖音相关视频](https://dataxapi.com/zh/apis/douyin/videos/related/)、[抖音视频搜索](https://dataxapi.com/zh/apis/douyin/videos/search/)、[抖音视频榜](https://dataxapi.com/zh/apis/douyin/videos/trending/)、[抖音搜索框联想词](https://dataxapi.com/zh/apis/douyin/keywords/related/)、[抖音无水印视频和图片下载地址](https://dataxapi.com/zh/apis/douyin/videos/media/get/)、[抖音音乐详情（背景音乐 MP3 和使用人数）](https://dataxapi.com/zh/apis/douyin/music/get/)、[抖音用户视频（备用版）](https://dataxapi.com/zh/apis/douyin/backup/users/videos/list/)、[抖音视频搜索（备用版）](https://dataxapi.com/zh/apis/douyin/backup/videos/search/)

抖音巨量算数的接口：[抖音巨量算数品牌指数趋势](https://dataxapi.com/zh/apis/douyin/index/brands/history/)、[抖音巨量算数品牌指数对比](https://dataxapi.com/zh/apis/douyin/index/brands/metrics/)、[抖音巨量算数达人热门视频](https://dataxapi.com/zh/apis/douyin/index/creators/videos/list/)、[抖音巨量算数达人粉丝画像](https://dataxapi.com/zh/apis/douyin/index/creators/audience/get/)、[抖音巨量算数达人核心指标](https://dataxapi.com/zh/apis/douyin/index/creators/metrics/)、[抖音巨量算数关键词人群画像](https://dataxapi.com/zh/apis/douyin/index/keywords/audience/get/)、[抖音巨量算数关键词热度趋势](https://dataxapi.com/zh/apis/douyin/index/keywords/history/)、[抖音巨量算数关联词](https://dataxapi.com/zh/apis/douyin/index/keywords/related/)、[抖音巨量算数实时热点](https://dataxapi.com/zh/apis/douyin/index/trends/list/)、[抖音巨量算数关键词热门视频](https://dataxapi.com/zh/apis/douyin/index/videos/search/)

抖音星图的接口：[抖音星图达人商业报价](https://dataxapi.com/zh/apis/douyin/xingtu/creators/rates/get/)、[抖音星图达人搜索](https://dataxapi.com/zh/apis/douyin/xingtu/creators/search/)、[抖音星图达人资料](https://dataxapi.com/zh/apis/douyin/xingtu/creators/get/)、[抖音星图达人粉丝画像](https://dataxapi.com/zh/apis/douyin/xingtu/creators/audience/get/)、[抖音星图达人传播数据](https://dataxapi.com/zh/apis/douyin/xingtu/creators/metrics/)、[抖音星图达人作品表现](https://dataxapi.com/zh/apis/douyin/xingtu/creators/videos/list/)、[抖音星图达人内容热词](https://dataxapi.com/zh/apis/douyin/xingtu/creators/keywords/get/)、[抖音星图达人星图指数](https://dataxapi.com/zh/apis/douyin/xingtu/creators/scores/get/)、[抖音星图达人内容分布](https://dataxapi.com/zh/apis/douyin/xingtu/creators/content_mix/get/)、[抖音星图达人转化能力](https://dataxapi.com/zh/apis/douyin/xingtu/creators/conversion/get/)、[抖音星图营销活动日历](https://dataxapi.com/zh/apis/douyin/xingtu/campaigns/list/)、[抖音星图视频数据报告（播放量、完播率）](https://dataxapi.com/zh/apis/douyin/xingtu/videos/get/)、[抖音星图达人粉丝画像（备用版）](https://dataxapi.com/zh/apis/douyin/xingtu/backup/creators/audience/get/)

怎么做和常见问题：[抖音视频的播放地址（下载链接）怎么用 API 拿到？（2026）](https://dataxapi.com/zh/answers/douyin-video-play-url-api/)、[有没有能提取视频链接的接口？抖音、小红书、视频号拿视频文件地址（2026）](https://dataxapi.com/zh/answers/video-file-url-api-china/)

用到这个接口的 Skills：[爆款拆解](https://dataxapi.com/zh/skills/viral/)、[视频转文字](https://dataxapi.com/zh/skills/transcripts/)、[博主视频转文字](https://dataxapi.com/zh/skills/creator-transcripts/)

用这个接口做的工具：[抖音视频转文字（文案提取）：在线查询（要登录）](https://dataxapi.com/zh/tools/douyin-transcript/)

相关：[抖音的全部接口](https://dataxapi.com/zh/apis/douyin/)、[社交媒体数据](https://dataxapi.com/zh/categories/social/)、[这件事在 13 个平台上的对照](https://dataxapi.com/zh/roles/transcripts-get/)、[逐字稿对象的字段](https://dataxapi.com/zh/docs/objects/transcript/)

## 常见问题

### 抖音视频转文字（文案提取、逐字稿） API 多少钱？

每次 $0.0020；识别的视频另加每分钟 $0.0038，不足一分钟按一分钟；用平台字幕的不加；5 分钟以内的视频每次最多 $0.0210，更长的按实际分钟数收，最长 2 小时。

### 什么情况下不收费？

出错、超时、对象不存在都不收费。

### 对象不存在会怎样？

返回 404 not_found，不收费。reason 写明是哪一种：not_found（不存在）或 private_or_deleted（私密或已删除）。

### 按次收费还是按时长收费？转 100 条抖音视频多少钱？

两样都有：每次 $0.0020；识别的视频另加每分钟 $0.0038，不足一分钟按一分钟；用平台字幕的不加。识别一条 40 秒的视频是 $0.0020 + $0.0038，61 秒的是 $0.0020 + 2 × $0.0038。识别 100 条 1 分钟以内的视频是 100 × ($0.0020 + $0.0038)。每次扣了多少写在返回的 meta.billing 里；调用前最多占用 $0.0020 加 5 分钟的钱。没有订阅，没有月最低消费。

### 有没有时间戳和 SRT 字幕？

有。除了全文，segments 给每一句和它的起止时间（秒）；完整档（view=full）再加每个字的时间和 ext.srt，现成的 SRT 字幕，可以直接存成 .srt 文件。加 speakers=yes 时每一段标出是谁说的（1、2…）。同时给内容的标题或文案、作者、发布时间、点赞和评论数，duration 是转写的时长。

### 超过 5 分钟的视频和批量怎么办？

5 分钟以内的视频一次调用直接返回文字。超过 5 分钟、2 小时以内的视频，调用会马上回一个凭证（job），过一会儿带着它再调这个接口取文字，按实际分钟数收费，只在取到文字时收；一次调用里没识别完的短视频也这样回 job。超过 2 小时的暂不支持。要转很多条就一条调一次，用 SDK 或命令行循环调，每条按自己的分钟数收费。

### 失败和没人说话收不收费？

不收。视频里没人说话（只有音乐或静音）、不是视频的内容、已删除或私密的、超过 2 小时的，以及任何出错和超时，都不收费，只有拿到文字才扣钱，长视频在取到文字时扣。

### 怎么在 AI 里用？

先接入 DataXAPI（在“给 AI 代理”页复制一段带 Key 的提示词，贴给你的 AI），然后直接用中文问：“用 DataXAPI 把这条抖音视频转成文字”，再贴上链接或分享文案。它会调用 douyin.videos.transcript.get，每次扣 $0.0020，识别的视频另加每分钟 $0.0038。

---

最后核对于 2026-11-27 06:18 UTC。目录修订号 0264e2d6dd4ff743。 [网页版](https://dataxapi.com/zh/apis/douyin/videos/transcript/get/)
