# 快手视频和图集下载地址 API

给一条快手视频或图集的编号、链接或分享文字，返回它的全部文件地址：视频的各档清晰度（带宽高、码率、大小和备用地址）和封面；图集给每张图片和配的音乐。地址不用带请求头，取不到了再调一次即可。每次取一个对象；$0.0020 一次。出错、超时、对象不存在都不收费。

- 地址：`GET https://api.dataxapi.com/v1/kuaishou/videos/media/get`
- 编号：`kuaishou.videos.media.get`
- 也叫：快手视频下载、快手视频下载地址、快手视频解析、快手图集下载、快手视频 mp4
- 价格：$0.0020 / 次
- 当前状态不写在这一页上（页面是快照），实时读：`GET https://api.dataxapi.com/v1/catalog/status`
- 返回：1 个对象, 一个视频和图片文件对象
- 返回标准的视频和图片文件结构，各平台相同
- `id` 就在链接里：`kuaishou.com/short-video/<id>`。也可以把整条链接传给 `url`。
- [在 Playground 里跑一次](https://dataxapi.com/zh/console/playground/?capability=kuaishou.videos.media.get&params=%7B%22id%22%3A%223x5pf8ia4zc76tc%22%7D)
- 英文名：[Kuaishou video downloader API](https://dataxapi.com/apis/kuaishou/videos/media/get/)

## 能拿到什么

2026-10-12 18:51 UTC 录下的真实返回，这里是前 2 行。

| 字段 | 值 |
| --- | --- |
| type | video |
| duration | 64.56 |

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | 文本 | `id`、`url` 里给且只给一个 | 作品编号：作品网页链接里 3x 开头的那一段。手里只有链接或分享文字时，填到 url。示例：`3x5pf8ia4zc76tc`。 |
| `url` | 文本 | `id`、`url` 里给且只给一个 | 视频链接，原样粘贴即可：网页链接 https://www.kuaishou.com/short-video/…、App 复制出来的 v.kuaishou.com 短链接，或含这些链接的整段分享文字（“……点击链接，打开【快手】直接观看！”）。短链接由我们打开一次，看它跳到哪条视频。示例：`https://www.kuaishou.com/short-video/3x5pf8ia4zc76tc`。长链接：`https://www.kuaishou.com/short-video/3x5pf8ia4zc76tc`。带链接的分享文案：`【示例】看看这个作品 https://www.kuaishou.com/short-video/3x5pf8ia4zc76tc 点击链接，打开【快手】直接观看！`。 |
| `view` | 文本 |  | 返回档位。三档价格相同。取值：`compact`、`standard`（默认）、`full`。 |
| `fields` | 文本列表 |  | 只要这些字段。按路径写，例如 `author.name`。 |

## 返回字段

`data.item` 是一个视频和图片文件对象。稳定：字段只增不改。

返回分三档：精简 `compact`（最常用的字段，长文本截短）、标准 `standard`（默认，全部标准字段）、完整 `full`（再加 `ext`，也就是这个平台特有的字段）。字段从表里写的那一档起出现，更大的档位也带。

| 字段 | 类型 | 说明 | 起始档位 | 这个接口 |
| --- | --- | --- | --- | --- |
| `post_id` | 文本 | 所属内容的编号，和详情接口的 id 是同一个。 | `compact` | 有 |
| `type` | 文本 | 内容形态：video 视频，image 图文（图集）。取值：`video`、`image`。 | `compact` | 有 |
| `title` | 文本 | 标题；平台没有单独标题的给文案。 | `compact` | 有 |
| `author` | 对象 | 作者。 | `compact` | 有 |
| `author.id` | 文本 | 作者的账号编号。 | `compact` | 有 |
| `author.name` | 文本 | 作者的显示名。 | `compact` | 有 |
| `duration` | 数字 | 视频时长，秒；图文没有。 | `compact` | 有 |
| `files` | 对象列表 | 全部文件，每个一项：视频各档、音频、封面、每张图片、字幕。 | `compact` | 有 |
| `files[].kind` | 文本 | 文件是什么：video 视频，audio 音频（背景音乐，或和画面分开给的音轨），cover 封面，image 图片，subtitle 字幕。取值：`video`、`audio`、`cover`、`image`、`subtitle`。 | `compact` | 有 |
| `files[].index` | 整数 | 图片在帖子里的序号，从 1 起；别的文件为 null。 | `compact` | 有 |
| `files[].quality` | 文本 | 清晰度，平台的叫法或短边像素，如 720p、1080p；没有时为 null。 | `compact` | 有 |
| `files[].width` | 整数 | 宽，像素。 | `compact` | 有 |
| `files[].height` | 整数 | 高，像素。 | `compact` | 有 |
| `files[].codec` | 文本 | 编码，如 h264、h265、h266、av1、aac；抖音和 TikTok 自研的 BVC2 写作 bytevc2，不少播放器放不了，要通用格式就挑 h264 或 h265 那档；平台没说时为 null。取值：`h264`、`h265`、`h266`、`av1`、`aac`、`bytevc2`。 | `compact` | 这个接口不提供 |
| `files[].bitrate` | 整数 | 码率，比特每秒。 | `compact` | 有 |
| `files[].size` | 整数 | 文件大小，字节。 | `compact` | 有 |
| `files[].format` | 文本 | 文件格式：mp4、m4s（B 站分开的音视频流）、mp3、m4a、jpeg、png、webp、heic、gif、kvif（快手的图片格式）、srt；地址里看不出时为 null。取值：`mp4`、`m4s`、`mp3`、`m4a`、`jpeg`、`png`、`webp`、`heic`、`gif`、`kvif`、`srt`。 | `compact` | 有 |
| `files[].duration` | 数字 | 音频或视频文件的时长，秒。 | `compact` | 有 |
| `files[].title` | 文本 | 背景音乐的名字；别的文件为 null。 | `compact` | 这个接口不提供 |
| `files[].lang` | 文本 | 字幕的语言代码，如 zh-CN、en-US。 | `compact` | 平台没有 |
| `files[].watermark` | 是否 | 文件上有没有平台水印。 | `compact` | 这个接口不提供 |
| `files[].url` | 链接 | 文件地址。 | `compact` | 有 |
| `files[].backup_urls` | 链接列表 | 同一个文件的其他地址，主地址取不到时用。 | `standard` | 有 |
| `files[].expires_at` | 时间 | 地址什么时候过期（按地址签名里写的时间）；签名里看不出时为 null。过期了再调一次接口拿新地址。 | `compact` | 这个接口不提供 |
| `files[].headers` | 对象 | 取这个地址要带的请求头，键是小写的请求头名；不用带请求头的平台没有这个字段。 | `compact` | 平台没有 |
| `files[].headers.referer` | 文本 | 要带的 Referer。 | `compact` | 平台没有 |
| `files[].stable_url` | 链接 | 平台的播放跳转地址：打开后跳到当时的文件地址，比 url 用得久；没有时为 null。 | `compact` | 平台没有 |
| `files[].live` | 对象 | 实况图（Live Photo）的那段视频；不是实况图为 null。 | `compact` | 平台没有 |
| `files[].live.url` | 链接 | 实况视频的地址。 | `compact` | 平台没有 |
| `files[].live.duration` | 数字 | 实况视频的时长，秒。 | `compact` | 平台没有 |
| `decrypt` | 对象 | 文件是加密的时候，怎么解密；不用解密时为 null。 | `compact` | 平台没有 |
| `decrypt.method` | 文本 | 解密方法。isaac64_xor_head：用 key 作种子跑 ISAAC64 随机数，每个 64 位数按大端拆成 8 个字节，得到 bytes 个字节的密钥流，和文件开头逐字节异或，其余部分不动。取值：`isaac64_xor_head`。 | `compact` | 平台没有 |
| `decrypt.key` | 文本 | 密钥，只对同一次返回的地址有效。 | `compact` | 平台没有 |
| `decrypt.bytes` | 整数 | 文件开头加了密的字节数。 | `compact` | 平台没有 |
| `approximate` | 对象列表 | 这一条里哪些数是约数或下限；都是准确值时不出现。 | `compact` | 有 |
| `approximate[].field` | 文本 | 字段的路径，如 metrics.views。 | `compact` | 有 |
| `approximate[].kind` | 文本 | 约数，还是下限。取值：`approximate`、`lower_bound`。 | `compact` | 有 |

某一条本来就没有这个值时，字段给 `null`。这个接口给不了的字段不出现，统一列在 `meta.unavailable`。

每条数据的典型体积：`compact` 1.3 KB、`standard` 2.0 KB、`full` 2.0 KB（按 2026-10-12 18:51 UTC 录下的那次返回量的）。

## 翻页

每次取一个对象，不翻页。

## 什么时候收费

| 情况 | 收费 |
| --- | --- |
| 返回了数据 | $0.0020，每次调用收一次 |
| 对象不存在（404） | 不收费 |
| 参数不合法、出错、超时 | 不收费 |
| 单次最高扣费 | $0.0020 (带 `X-Max-Price` 可以设自己的上限，超过就不执行) |

价格读取于 2026-11-28 06:28 UTC，按价目版本 30，2026-11-28 04:43 UTC 起生效；在 Playground 里运行前会再读一次当前价格。

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
curl -G "https://api.dataxapi.com/v1/kuaishou/videos/media/get" \
  --data-urlencode "id=3x5pf8ia4zc76tc" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
# pip install dataxapi
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.kuaishou.videos.media.get(id="3x5pf8ia4zc76tc")
print(result["data"]["item"])
```

### TypeScript

```typescript
// npm i @dataxapi/sdk
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.kuaishou.videos.media.get({ id: "3x5pf8ia4zc76tc" });
console.log(result.data.item);
```

### 命令行

```bash
dataxapi call kuaishou.videos.media.get id=3x5pf8ia4zc76tc
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

把这段加进你的 MCP 客户端，然后让你的 AI 调用 `kuaishou.videos.media.get`。

## 返回

### 200

取自 2026-10-12 18:51 UTC 录下的真实返回。名字、正文和编号是示例，链接也是，都不是录到的原文（页面不展示任何人的个人信息）；数字是原样。长列表做了截断。请求号、游标和余额是示意。

返回大小：标准档 2.6 KB（精简 1.8 KB，完整 2.6 KB）。

```jsonc
{
  "code": "ok",
  "request_id": "24538541-486a-4124-8dee-68e7cc0df3d0",
  "data": {
    "item": {
      "post_id": "3xscfnvt50h9q8m",
      "type": "video",
      "title": "实测一个月周末露营，结论有点意外",
      "author": { "id": "3xhrkhp30pxw54", "name": "南边的风" },
      "duration": 64.56,
      "files": [
        {
          "kind": "video",
          "index": null,
          "quality": "720p",
          "width": 720,
          "height": 960,
          "bitrate": 691000,
          "size": 5584683,
          "format": "mp4",
          "duration": 64.56,
          "url": "https://www.kuaishou.com/short-video/903859892922",
          "backup_urls": [
            "https://www.kuaishou.com/short-video/986122423583"
          ]
        },
        {
          "kind": "cover",
          "index": null,
          "quality": null,
          "width": null,
          "height": null,
          "bitrate": null,
          "size": null,
          "format": "kvif",
          "duration": null,
          "url": "https://www.kuaishou.com/short-video/973235708608",
          "backup_urls": [
            "https://www.kuaishou.com/short-video/900096130109"
          ]
        }
      ]
    }
  },
  "warnings": [],
  "meta": {
    "capability": "kuaishou.videos.media.get",
    "result_status": "complete",
    "fetched_at": "2026-10-12T18:51:00.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "files.codec": "capability",
      "files.title": "capability",
      "files.lang": "platform",
      "files.watermark": "capability",
      "files.expires_at": "capability",
      "files.headers": "platform",
      "files.stable_url": "platform",
      "files.live": "platform",
      "decrypt": "platform"
    },
    "billing": {
      "amount": "0.002",
      "currency": "USD",
      "balance_after": "9.998"
    }
  }
}
```

### 400

按规范写的示例，不是录下的返回。

```json
{
  "code": "invalid_params",
  "request_id": "2342106c-aa1d-40cc-bc50-96a378ed88fb",
  "message": "A parameter is invalid",
  "message_zh": "参数不合法",
  "charged": false,
  "retry": "after_fix",
  "retry_after_seconds": null,
  "param": null,
  "problems": ["give exactly one of id, url"],
  "docs_url": "https://dataxapi.com/docs/errors#invalid_params"
}
```

### 402

按规范写的示例，不是录下的返回。

```json
{
  "code": "insufficient_balance",
  "request_id": "0529ee28-1909-4608-a82e-6ff7cbd078d1",
  "message": "The balance is too low",
  "message_zh": "余额不足",
  "charged": false,
  "retry": "after_fix",
  "retry_after_seconds": null,
  "param": null,
  "required": "0.002",
  "available": "0",
  "top_up_url": "https://dataxapi.com/console/billing/?amount=10",
  "next_step": "The balance does not cover this call ($0.002). Top up at top_up_url: $10 at least, about 5,000 calls at this price; Alipay or a card, and the balance never expires. Then send the same request again, unchanged. Nothing was charged for this one.",
  "next_step_zh": "余额不够这次调用（$0.002）。到 top_up_url 充值：最低 $10，按这次的价格约够 5,000 次；支付宝、银行卡都能付，余额不过期。到账后把同一个请求原样再发一次。这次没有扣钱。",
  "docs_url": "https://dataxapi.com/docs/errors#insufficient_balance"
}
```

### 404

按规范写的示例，不是录下的返回。

```json
{
  "code": "not_found",
  "request_id": "584017ce-b282-4d32-9755-95a1afdca94d",
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
  "request_id": "fe3cdab1-8592-4040-925f-18f8d18787d0",
  "message": "No result came back this time and nothing was charged; retry shortly",
  "message_zh": "这次没有取到结果，没有扣费，可以稍后重试",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

[这份示例的 JSON 文件](https://dataxapi.com/apis/kuaishou/videos/media/get.example.json)

## 在你的 AI 里用它

`dataxapi setup` 给这台电脑上的 AI 代理（Claude Code、Codex、Cursor）装好 DataXAPI 的 MCP 服务和基础技能。Key 从环境变量 DATAXAPI_API_KEY 读，不写进任何文件。

MCP 服务地址：`https://api.dataxapi.com/mcp`。你的客户端要填的配置在本页请求示例的“MCP”页签里；接好后让你的 AI 调用 `kuaishou.videos.media.get`。

或者把这段话贴给任意一个 AI：

> 读一下 https://dataxapi.com/zh/apis/kuaishou/videos/media/get.md，然后帮我用 DataXAPI 的接口 kuaishou.videos.media.get（快手视频和图集下载地址）。

[在 ChatGPT 里打开](https://chatgpt.com/?q=%E8%AF%BB%E4%B8%80%E4%B8%8B%20https%3A%2F%2Fdataxapi.com%2Fzh%2Fapis%2Fkuaishou%2Fvideos%2Fmedia%2Fget.md%EF%BC%8C%E7%84%B6%E5%90%8E%E5%B8%AE%E6%88%91%E7%94%A8%20DataXAPI%20%E7%9A%84%E6%8E%A5%E5%8F%A3%20kuaishou.videos.media.get%EF%BC%88%E5%BF%AB%E6%89%8B%E8%A7%86%E9%A2%91%E5%92%8C%E5%9B%BE%E9%9B%86%E4%B8%8B%E8%BD%BD%E5%9C%B0%E5%9D%80%EF%BC%89%E3%80%82) · [在 Claude 里打开](https://claude.ai/new?q=%E8%AF%BB%E4%B8%80%E4%B8%8B%20https%3A%2F%2Fdataxapi.com%2Fzh%2Fapis%2Fkuaishou%2Fvideos%2Fmedia%2Fget.md%EF%BC%8C%E7%84%B6%E5%90%8E%E5%B8%AE%E6%88%91%E7%94%A8%20DataXAPI%20%E7%9A%84%E6%8E%A5%E5%8F%A3%20kuaishou.videos.media.get%EF%BC%88%E5%BF%AB%E6%89%8B%E8%A7%86%E9%A2%91%E5%92%8C%E5%9B%BE%E9%9B%86%E4%B8%8B%E8%BD%BD%E5%9C%B0%E5%9D%80%EF%BC%89%E3%80%82)

## 相关

这是 DataXAPI 社交媒体数据的一部分。同一把 Key 还能用：达人、广告、电商。

同一件事的其他平台：[抖音无水印视频和图片下载地址](https://dataxapi.com/zh/apis/douyin/videos/media/get/)、[小红书无水印原图和实况图下载地址](https://dataxapi.com/zh/apis/xiaohongshu/notes/media/get/)、[小红书无水印视频下载地址（各档清晰度和字幕）](https://dataxapi.com/zh/apis/xiaohongshu/videos/media/get/)、[微博视频和图片下载地址](https://dataxapi.com/zh/apis/weibo/posts/media/get/)、[视频号视频下载（文件地址和解密）](https://dataxapi.com/zh/apis/wechat_channels/videos/media/get/)、[TikTok 无水印视频下载地址](https://dataxapi.com/zh/apis/tiktok/videos/media/get/)、[Instagram 视频和图片下载地址](https://dataxapi.com/zh/apis/instagram/posts/media/get/)、[B 站视频和音频下载地址](https://dataxapi.com/zh/apis/bilibili/videos/media/get/)

其他平台的社交媒体数据：[抖音评论回复](https://dataxapi.com/zh/apis/douyin/comments/replies/list/)、[抖音话题视频](https://dataxapi.com/zh/apis/douyin/hashtags/videos/list/)、[B站评论回复](https://dataxapi.com/zh/apis/bilibili/comments/replies/list/)、[B站热搜榜](https://dataxapi.com/zh/apis/bilibili/trends/list/)、[B站用户资料](https://dataxapi.com/zh/apis/bilibili/users/get/)、[B站用户投稿](https://dataxapi.com/zh/apis/bilibili/users/videos/list/)、[B站视频评论](https://dataxapi.com/zh/apis/bilibili/videos/comments/list/)、[B站视频详情](https://dataxapi.com/zh/apis/bilibili/videos/get/)、[B站视频转文字（文案提取、逐字稿）](https://dataxapi.com/zh/apis/bilibili/videos/transcript/get/)、[B站视频搜索](https://dataxapi.com/zh/apis/bilibili/videos/search/)、[B站综合热门](https://dataxapi.com/zh/apis/bilibili/videos/trending/)、[抖音巨量算数品牌指数趋势](https://dataxapi.com/zh/apis/douyin/index/brands/history/)、[抖音巨量算数品牌指数对比](https://dataxapi.com/zh/apis/douyin/index/brands/metrics/)

快手的接口：[快手评论回复](https://dataxapi.com/zh/apis/kuaishou/comments/replies/list/)、[快手热榜](https://dataxapi.com/zh/apis/kuaishou/trends/list/)、[快手用户资料](https://dataxapi.com/zh/apis/kuaishou/users/get/)、[快手用户搜索](https://dataxapi.com/zh/apis/kuaishou/users/search/)、[快手用户作品](https://dataxapi.com/zh/apis/kuaishou/users/videos/list/)、[快手作品评论](https://dataxapi.com/zh/apis/kuaishou/videos/comments/list/)、[快手作品详情](https://dataxapi.com/zh/apis/kuaishou/videos/get/)、[快手视频转文字（文案提取、逐字稿）](https://dataxapi.com/zh/apis/kuaishou/videos/transcript/get/)、[快手视频搜索](https://dataxapi.com/zh/apis/kuaishou/videos/search/)、[快手视频和图集下载地址](https://dataxapi.com/zh/apis/kuaishou/videos/media/get/)

相关：[快手的全部接口](https://dataxapi.com/zh/apis/kuaishou/)、[社交媒体数据](https://dataxapi.com/zh/categories/social/)、[这件事在 8 个平台上的对照](https://dataxapi.com/zh/roles/media-get/)、[视频和图片文件对象的字段](https://dataxapi.com/zh/docs/objects/media/)

## 常见问题

### 快手视频和图集下载地址 API 多少钱？

$0.0020 一次。单次最高扣费 $0.0020。

### 什么情况下不收费？

出错、超时、对象不存在都不收费。

### 对象不存在会怎样？

返回 404 not_found，不收费。reason 写明是哪一种：not_found（不存在）或 private_or_deleted（私密或已删除）。

### 按次还是按时长收费？100 条要多少钱？

按次收费，和视频多长、有几个文件无关：一次 $0.0020，100 条就是 100 次的钱。地址过期后再调一次拿新地址，同样按一次算。

### 地址打不开（403）或过期了怎么办？

地址原样取就行，不用带请求头，也不用 Cookie。每个文件都带备用地址（backup_urls）；都打不开了就再调一次拿新地址。

### 图集给什么？

按顺序给每张图片，带宽高，另给配的音乐。图片是快手自己的图片格式（kvif）。

### 怎么批量下载一个博主的全部作品？

先用 kuaishou.users.videos.list 一页一页列出这个账号的作品，再拿每条作品的 id 调一次 kuaishou.videos.media.get。在 AI 里一句话就行：“用 DataXAPI 把这个快手账号最近 30 条视频的下载地址拿下来。”

### 怎么在 AI 里用？

先接入 DataXAPI（在“给 AI 代理”页复制一段带 Key 的提示词，贴给你的 AI），然后直接用中文问，链接原样贴进去就行。它会调用 kuaishou.videos.media.get，每次扣 $0.0020。

---

最后核对于 2026-11-28 06:28 UTC。目录修订号 ceced48b38f71468。 [网页版](https://dataxapi.com/zh/apis/kuaishou/videos/media/get/)
