# 微信搜一搜视频号视频搜索 API

按搜索词在微信搜一搜里取一页视频号视频，可按相关、最新或最热排、按发布时间筛：文案、发布账号的名称和头像、发布时间、点赞和收藏数、时长、封面。搜一搜不给账号编号，作品编号是 export/ 开头的加密编号：传给 wechat_channels.videos.get 的 export_id 可换出数字编号、视频文件地址和解密密钥，会过期，要尽快用。每次约 10 条，最多 20 条；$0.0200 一次。出错和超时不收费。

- 地址：`GET https://api.dataxapi.com/v1/wechat_channels/videos/search`
- 编号：`wechat_channels.videos.search`
- 也叫：搜视频号、视频号搜索、搜一搜视频号
- 价格：$0.0200 / 次
- 当前状态不写在这一页上（页面是快照），实时读：`GET https://api.dataxapi.com/v1/catalog/status`
- 返回：每页最多 20 条, 一页，带翻下一页的游标
- 返回标准的内容结构，各平台相同
- [在 Playground 里跑一次](https://dataxapi.com/zh/console/playground/?capability=wechat_channels.videos.search&params=%7B%22query%22%3A%22%E9%9C%B2%E8%90%A5%E8%A3%85%E5%A4%87%E6%8E%A8%E8%8D%90%22%7D)
- 英文名：[WeChat Channels video search API](https://dataxapi.com/apis/wechat_channels/videos/search/)

## 能拿到什么

2026-10-17 10:18 UTC 录下的真实返回，这里是前 4 行。

| 字段 | 值 |
| --- | --- |
| type | video |
| published_at | 2026-10-15 06:55 UTC |
| metrics.likes | 1 |
| metrics.favorites | 3 |

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `query` | 文本 | 是 | 搜索词。示例：`露营装备推荐`。 |
| `sort` | 文本 |  | 按相关、按发布时间（新的在前）或按热度排。取值：`relevance`（默认）、`latest`、`popular`。示例：`latest`。 |
| `published_within` | 文本 |  | 只要最近一天、一周或半年里发布的。取值：`day`、`week`、`half_year`。示例：`week`。 |
| `cursor` | 文本 |  | 上一页返回的游标。把上一页的 `page.next_cursor` 原样带上。每翻一页按一次调用收费。 |
| `view` | 文本 |  | 返回档位。三档价格相同。取值：`compact`、`standard`（默认）、`full`。 |
| `fields` | 文本列表 |  | 只要这些字段。按路径写，例如 `author.name`。 |

## 返回字段

`data.items` 是内容对象的列表。稳定：字段只增不改。

返回分三档：精简 `compact`（最常用的字段，长文本截短）、标准 `standard`（默认，全部标准字段）、完整 `full`（再加 `ext`，也就是这个平台特有的字段）。字段从表里写的那一档起出现，更大的档位也带。

| 字段 | 类型 | 说明 | 起始档位 | 这个接口 |
| --- | --- | --- | --- | --- |
| `id` | 文本 | 编号，可原样传给取详情的接口。在这个平台上：搜一搜给这条视频的加密编号（export/ 开头），原样照给：不是视频号作品详情、评论接口要的数字编号，同一条视频在以后的搜索里不保证还是这个编号。 | `compact` | 有 |
| `url` | 链接 | 能直接打开的链接。 | `compact` | 平台没有 |
| `type` | 文本 | 内容形态。取值：`video`、`image`、`text`、`article`。 | `compact` | 有 |
| `title` | 文本 | 标题。 | `compact` | 平台没有 |
| `text` | 文本 | 正文。在这个平台上：视频的文案，去掉了关键词高亮。长文本：精简档只保留前 500 个字符，并在 `warnings` 里写明。 | `compact` | 有 |
| `lang` | 文本 | 正文的语言。 | `standard` | 这个接口不提供 |
| `published_at` | 时间 | 发布时间。 | `compact` | 有 |
| `author` | 对象 | 作者。 | `compact` | 有 |
| `author.id` | 文本 | 作者的账号编号。 | `compact` | 这个接口不提供 |
| `author.username` | 文本 | 作者的账号名。 | `compact` | 平台没有 |
| `author.name` | 文本 | 作者的显示名。在这个平台上：发布账号的名称；搜一搜不给账号编号。 | `compact` | 有 |
| `author.avatar_url` | 链接 | 作者头像。 | `standard` | 有 |
| `author.verified` | 是否 | 作者是否认证。 | `standard` | 这个接口不提供 |
| `author.followers` | 整数 | 作者的粉丝数。 | `standard` | 这个接口不提供 |
| `metrics` | 对象 | 互动数。 | `compact` | 有 |
| `metrics.likes` | 整数 | 点赞数。在这个平台上：卡片上显示的点赞数；“1.4万”这类是约数，“10万+”是下限；卡片没显示数时为 null。 | `compact` | 有 |
| `metrics.comments` | 整数 | 评论数。 | `compact` | 这个接口不提供 |
| `metrics.shares` | 整数 | 分享数。 | `compact` | 这个接口不提供 |
| `metrics.favorites` | 整数 | 收藏数。在这个平台上：卡片上显示的另一个数，和视频号作品列表的收藏数是同一个数；约数、下限和 null 同点赞数。 | `compact` | 有 |
| `metrics.views` | 整数 | 播放或阅读数。 | `compact` | 这个接口不提供 |
| `metrics.reposts` | 整数 | 转发数。 | `compact` | 平台没有 |
| `images` | 链接列表 | 图片地址。 | `standard` | 这个接口不提供 |
| `hashtags` | 文本列表 | 话题标签，不带 #。 | `standard` | 这个接口不提供 |
| `mentions` | 对象列表 | 正文里提及的账号。 | `standard` | 这个接口不提供 |
| `mentions[].id` | 文本 | 账号编号。 | `standard` | 这个接口不提供 |
| `mentions[].username` | 文本 | 账号名。 | `standard` | 这个接口不提供 |
| `mentions[].name` | 文本 | 显示名。 | `standard` | 这个接口不提供 |
| `is_pinned` | 是否 | 是否被作者置顶。 | `standard` | 这个接口不提供 |
| `post_id` | 文本 | 它回复的那条内容所在的主帖编号；不是回复则为 null。 | `compact` | 平台没有 |
| `parent_id` | 文本 | 它直接回复的那一条的编号；不是回复则为 null。 | `compact` | 平台没有 |
| `root_id` | 文本 | 所在回复串里第一层那一条的编号。 | `compact` | 平台没有 |
| `ext.duration` | 数字 | 视频时长，秒。 | `full` | 有 |
| `ext.cover_url` | 链接 | 视频封面。 | `full` | 有 |
| `approximate` | 对象列表 | 这一条里哪些数是约数或下限；都是准确值时不出现。 | `compact` | 有 |
| `approximate[].field` | 文本 | 字段的路径，如 metrics.views。 | `compact` | 有 |
| `approximate[].kind` | 文本 | 约数，还是下限。取值：`approximate`、`lower_bound`。 | `compact` | 有 |

某一条本来就没有这个值时，字段给 `null`。这个接口给不了的字段不出现，统一列在 `meta.unavailable`。

每条数据的典型体积：`compact` 339 B、`standard` 537 B、`full` 1.0 KB（按 2026-10-17 10:18 UTC 录下的那次返回量的）。

## 翻页

每页约 10 条，最多 20 条。每页条数由平台决定，不收 `limit`。

取下一页时把 `page.next_cursor` 作为 `cursor` 带上；游标有效期 1 小时。最后一页的 `page.has_more` 是 false。

## 什么时候收费

| 情况 | 收费 |
| --- | --- |
| 返回了数据 | $0.0200，每次调用收一次 |
| 每翻一页 | 按一次调用另收 |
| 参数不合法、出错、超时 | 不收费 |
| 单次最高扣费 | $0.0200 (带 `X-Max-Price` 可以设自己的上限，超过就不执行) |

价格读取于 2026-11-28 06:28 UTC，按价目版本 30，2026-11-28 04:43 UTC 起生效；在 Playground 里运行前会再读一次当前价格。

## 常见报错

所有报错都是同一个结构：`code`、`message`、`charged`、`retry`、`retry_after_seconds`、`param`、`docs_url`。

这个接口取不到数据时（出错、超时或接口暂停），可以改调它的备用版：参数和返回相同，$0.1 一次；这时报错里的 `alternative` 会写明。重试请换一个新的幂等键： [微信搜一搜视频号视频搜索（备用版）API](https://dataxapi.com/zh/apis/wechat_channels/backup/videos/search/)

| 状态码 | 代码 | 含义 | 是否扣费 | 能否重试 |
| --- | --- | --- | --- | --- |
| 400 | `invalid_params` | 参数不合法 | 未扣费 | 改了再试 |
| 400 | `request_not_served` | 这种参数组合现在取不了 | 未扣费 | 改了再试 |
| 400 | `max_price_exceeded` | 这次调用的最高价超过了你设的上限 | 未扣费 | 改了再试 |
| 400 | `cursor_invalid` | 游标不存在 | 未扣费 | 不能 |
| 400 | `cursor_mismatch` | 游标不是用这个接口和这组参数取得的 | 未扣费 | 改了再试 |
| 401 | `unauthorized` | 没有带凭证，或凭证无效、已停用、已过期 | 未扣费 | 不能 |
| 402 | `insufficient_balance` | 余额不足 | 未扣费 | 改了再试 |
| 402 | `key_budget_exceeded` | 超出这把 Key 的金额上限 | 未扣费 | 改了再试 |
| 402 | `run_budget_exceeded` | 超出这一轮任务的金额或次数上限 | 未扣费 | 不能 |
| 403 | `account_suspended` | 账户已停用 | 未扣费 | 不能 |
| 403 | `forbidden` | 这个凭证不能带这个选项 | 未扣费 | 不能 |
| 403 | `key_scope_denied` | 这把 Key 不能调用这个接口 | 未扣费 | 不能 |
| 404 | `run_not_found` | 没有这个运行编号 | 未扣费 | 不能 |
| 409 | `call_in_progress` | 这个幂等键的调用还在执行，稍后用同一个键再取 | 未扣费 | 只能用同一个幂等键 |
| 409 | `idempotency_conflict` | 这个幂等键已用于另一个请求 | 未扣费 | 改了再试 |
| 410 | `cursor_expired` | 游标已过期，请从第一页重新开始 | 未扣费 | 不能 |
| 410 | `run_expired` | 这一轮任务已到期，不能再发起调用 | 未扣费 | 不能 |
| 429 | `rate_limited` | 请求过快或同时进行的调用过多 | 未扣费 | 能 |
| 429 | `cost_cap_exceeded` | 这个账户今天的额度已用完 | 未扣费 | 能 |
| 429 | `uncharged_cost_limit` | 这个账户今天没取到数据、也没扣费的调用太多，这类接口到明天（UTC）再调 | 未扣费 | 能 |
| 500 | `settlement_unknown` | 这次调用的结算状态未知，请用同一个幂等键或请求号查询 | 待确认：按请求号查询 | 只能用同一个幂等键 |
| 500 | `internal_error` | 服务内部出错 | 未扣费 | 能 |
| 502 | `upstream_failed` | 这次没有取到结果，没有扣费，可以稍后重试 | 未扣费 | 能 |
| 502 | `cursor_unavailable` | 这个游标现在不可用，稍后重试或从第一页重新开始 | 未扣费 | 能 |
| 503 | `upstream_busy` | 现在请求较多，请稍后重试 | 未扣费 | 能 |
| 503 | `capability_paused` | 这个接口已暂停 | 未扣费 | 能 |
| 503 | `overloaded` | 服务繁忙，请稍后重试 | 未扣费 | 能 |
| 504 | `timeout` | 没有在时限内取到数据，可以用同一个幂等键重试 | 未扣费 | 能 |

[全部错误码](https://dataxapi.com/zh/docs/errors/)

## 请求

代码里的 Key 从环境变量读，不把真 Key 写进页面。

### cURL

```bash
curl -G "https://api.dataxapi.com/v1/wechat_channels/videos/search" \
  --data-urlencode "query=露营装备推荐" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
# pip install dataxapi
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.wechat_channels.videos.search(query="露营装备推荐")
print(result["data"]["items"])
```

### TypeScript

```typescript
// npm i @dataxapi/sdk
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.wechat_channels.videos.search({ query: "露营装备推荐" });
console.log(result.data.items);
```

### 命令行

```bash
dataxapi call wechat_channels.videos.search 'query=露营装备推荐'
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

把这段加进你的 MCP 客户端，然后让你的 AI 调用 `wechat_channels.videos.search`。

## 返回

### 200

取自 2026-10-17 10:18 UTC 录下的真实返回。名字、正文和编号是示例，链接也是，都不是录到的原文（页面不展示任何人的个人信息）；数字是原样。长列表做了截断。请求号、游标和余额是示意。

返回大小：标准档 6.1 KB（精简 4.2 KB，完整 11.3 KB）。

```jsonc
{
  "code": "ok",
  "request_id": "428f16de-fcb5-4a67-80d6-4591a014e773",
  "data": {
    "items": [
      {
        "id": "14309109949391530795",
        "type": "video",
        "text": "把露营装备推荐从头到尾讲清楚，看完少走弯路",
        "published_at": "2026-10-15T06:55:50.000Z",
        "author": {
          "name": "认真生活的阿雅",
          "avatar_url": "https://wx.qlogo.cn/mmhead/U9lsySZppJ82NT46wHmKbw7exWhIUajYTcH524Q4/132"
        },
        "metrics": { "likes": 1, "favorites": 3 }
      },
      // … 另有 9 条
    ]
  },
  "page": {
    "next_cursor": "c1.Za3nSdcW_ai9PKkWUC-5crH5fut0BvKaXg75Pjjy",
    "cursor_expires_at": "2026-10-17T11:18:01.000Z",
    "has_more": true,
    "returned": 10
  },
  "warnings": [],
  "meta": {
    "capability": "wechat_channels.videos.search",
    "result_status": "complete",
    "fetched_at": "2026-10-17T10:18:01.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "url": "platform",
      "title": "platform",
      "lang": "capability",
      "author.id": "capability",
      "author.username": "platform",
      "author.verified": "capability",
      "author.followers": "capability",
      "metrics.comments": "capability",
      "metrics.shares": "capability",
      "metrics.views": "capability",
      "metrics.reposts": "platform",
      "images": "capability",
      "hashtags": "capability",
      "mentions": "capability",
      "is_pinned": "capability",
      "post_id": "platform",
      "parent_id": "platform",
      "root_id": "platform"
    },
    "billing": {
      "amount": "0.02",
      "currency": "USD",
      "balance_after": "9.98"
    }
  }
}
```

### 空结果

取自 2026-10-17 10:18 UTC 的录制，为演示这种情况人工改过。请求号和余额是示意。

返回大小：标准档 864 B（精简 864 B，完整 864 B）。

```jsonc
{
  "code": "ok",
  "request_id": "759f6e69-ff74-40d6-88d3-a5d60f58dfc4",
  "data": { "items": [] },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 0
  },
  "warnings": [],
  "meta": {
    "capability": "wechat_channels.videos.search",
    "result_status": "empty",
    "fetched_at": "2026-10-17T10:18:01.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "url": "platform",
      "title": "platform",
      "lang": "capability",
      "author.id": "capability",
      "author.username": "platform",
      "author.verified": "capability",
      "author.followers": "capability",
      "metrics.comments": "capability",
      "metrics.shares": "capability",
      "metrics.views": "capability",
      "metrics.reposts": "platform",
      "images": "capability",
      "hashtags": "capability",
      "mentions": "capability",
      "is_pinned": "capability",
      "post_id": "platform",
      "parent_id": "platform",
      "root_id": "platform"
    },
    "billing": {
      "amount": "0.02",
      "currency": "USD",
      "balance_after": "9.98"
    }
  }
}
```

### 400

按规范写的示例，不是录下的返回。

```json
{
  "code": "invalid_params",
  "request_id": "099c3bb1-9380-4456-9949-d9fc4b697ac5",
  "message": "A parameter is invalid",
  "message_zh": "参数不合法",
  "charged": false,
  "retry": "after_fix",
  "retry_after_seconds": null,
  "param": null,
  "problems": ["query is required"],
  "docs_url": "https://dataxapi.com/docs/errors#invalid_params"
}
```

### 402

按规范写的示例，不是录下的返回。

```json
{
  "code": "insufficient_balance",
  "request_id": "53de3f15-dd33-4ab9-a8bc-ee29696b44f1",
  "message": "The balance is too low",
  "message_zh": "余额不足",
  "charged": false,
  "retry": "after_fix",
  "retry_after_seconds": null,
  "param": null,
  "required": "0.02",
  "available": "0",
  "top_up_url": "https://dataxapi.com/console/billing/?amount=10",
  "next_step": "The balance does not cover this call ($0.02). Top up at top_up_url: $10 at least, about 500 calls at this price; Alipay or a card, and the balance never expires. Then send the same request again, unchanged. Nothing was charged for this one.",
  "next_step_zh": "余额不够这次调用（$0.02）。到 top_up_url 充值：最低 $10，按这次的价格约够 500 次；支付宝、银行卡都能付，余额不过期。到账后把同一个请求原样再发一次。这次没有扣钱。",
  "docs_url": "https://dataxapi.com/docs/errors#insufficient_balance"
}
```

### 502

按规范写的示例，不是录下的返回。

```json
{
  "code": "upstream_failed",
  "request_id": "dd702628-ffca-46d8-ac95-f1cfeb67ce04",
  "message": "No result came back this time and nothing was charged; retry shortly",
  "message_zh": "这次没有取到结果，没有扣费，可以稍后重试",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

这份录制的返回：平台原始 JSON 8,252 token，DataXAPI 的 JSON 2,668 token，AI 通过 DataXAPI 的 MCP 读到 1,476 token，少 82%（2026-11-06 统计）。

[这份示例的 JSON 文件](https://dataxapi.com/apis/wechat_channels/videos/search.example.json)

## 在你的 AI 里用它

`dataxapi setup` 给这台电脑上的 AI 代理（Claude Code、Codex、Cursor）装好 DataXAPI 的 MCP 服务和基础技能。Key 从环境变量 DATAXAPI_API_KEY 读，不写进任何文件。

MCP 服务地址：`https://api.dataxapi.com/mcp`。你的客户端要填的配置在本页请求示例的“MCP”页签里；接好后让你的 AI 调用 `wechat_channels.videos.search`。

或者把这段话贴给任意一个 AI：

> 读一下 https://dataxapi.com/zh/apis/wechat_channels/videos/search.md，然后帮我用 DataXAPI 的接口 wechat_channels.videos.search（微信搜一搜视频号视频搜索）。

[在 ChatGPT 里打开](https://chatgpt.com/?q=%E8%AF%BB%E4%B8%80%E4%B8%8B%20https%3A%2F%2Fdataxapi.com%2Fzh%2Fapis%2Fwechat_channels%2Fvideos%2Fsearch.md%EF%BC%8C%E7%84%B6%E5%90%8E%E5%B8%AE%E6%88%91%E7%94%A8%20DataXAPI%20%E7%9A%84%E6%8E%A5%E5%8F%A3%20wechat_channels.videos.search%EF%BC%88%E5%BE%AE%E4%BF%A1%E6%90%9C%E4%B8%80%E6%90%9C%E8%A7%86%E9%A2%91%E5%8F%B7%E8%A7%86%E9%A2%91%E6%90%9C%E7%B4%A2%EF%BC%89%E3%80%82) · [在 Claude 里打开](https://claude.ai/new?q=%E8%AF%BB%E4%B8%80%E4%B8%8B%20https%3A%2F%2Fdataxapi.com%2Fzh%2Fapis%2Fwechat_channels%2Fvideos%2Fsearch.md%EF%BC%8C%E7%84%B6%E5%90%8E%E5%B8%AE%E6%88%91%E7%94%A8%20DataXAPI%20%E7%9A%84%E6%8E%A5%E5%8F%A3%20wechat_channels.videos.search%EF%BC%88%E5%BE%AE%E4%BF%A1%E6%90%9C%E4%B8%80%E6%90%9C%E8%A7%86%E9%A2%91%E5%8F%B7%E8%A7%86%E9%A2%91%E6%90%9C%E7%B4%A2%EF%BC%89%E3%80%82)

## 相关

这是 DataXAPI 社交媒体数据的一部分。同一把 Key 还能用：达人、广告、电商。

同一件事的其他平台：[B站视频搜索](https://dataxapi.com/zh/apis/bilibili/videos/search/)、[抖音视频搜索](https://dataxapi.com/zh/apis/douyin/videos/search/)、[快手视频搜索](https://dataxapi.com/zh/apis/kuaishou/videos/search/)、[LinkedIn 帖子搜索](https://dataxapi.com/zh/apis/linkedin/posts/search/)、[Threads 帖子搜索](https://dataxapi.com/zh/apis/threads/posts/search/)、[TikTok 视频搜索](https://dataxapi.com/zh/apis/tiktok/videos/search/)、[微博实时搜索](https://dataxapi.com/zh/apis/weibo/posts/search/)、[X 帖子搜索](https://dataxapi.com/zh/apis/x/posts/search/)、[小红书笔记搜索](https://dataxapi.com/zh/apis/xiaohongshu/notes/search/)、[YouTube 视频搜索](https://dataxapi.com/zh/apis/youtube/videos/search/)、[微信搜一搜综合搜索](https://dataxapi.com/zh/apis/wechat/posts/search/)、[微信搜一搜综合搜索（备用版）](https://dataxapi.com/zh/apis/wechat/backup/posts/search/)、[微信搜一搜视频号视频搜索（备用版）](https://dataxapi.com/zh/apis/wechat_channels/backup/videos/search/)、[Reddit 帖子搜索](https://dataxapi.com/zh/apis/reddit/posts/search/)、[知乎内容搜索](https://dataxapi.com/zh/apis/zhihu/posts/search/)、[Pinterest 图钉搜索](https://dataxapi.com/zh/apis/pinterest/pins/search/)、[抖音视频搜索（备用版）](https://dataxapi.com/zh/apis/douyin/backup/videos/search/)

微信视频号的接口：[微信视频号账号资料](https://dataxapi.com/zh/apis/wechat_channels/users/get/)、[微信视频号作品详情](https://dataxapi.com/zh/apis/wechat_channels/videos/get/)、[微信视频号作品评论](https://dataxapi.com/zh/apis/wechat_channels/videos/comments/list/)、[微信视频号作品分享链接](https://dataxapi.com/zh/apis/wechat_channels/videos/share_link/get/)、[微信视频号账号的合集](https://dataxapi.com/zh/apis/wechat_channels/users/collections/list/)、[微信视频号合集里的视频](https://dataxapi.com/zh/apis/wechat_channels/collections/videos/list/)、[微信视频号用户作品](https://dataxapi.com/zh/apis/wechat_channels/users/videos/list/)、[微信搜一搜视频号视频搜索](https://dataxapi.com/zh/apis/wechat_channels/videos/search/)、[微信视频号账号资料（备用版）](https://dataxapi.com/zh/apis/wechat_channels/backup/users/get/)、[微信视频号用户作品（备用版）](https://dataxapi.com/zh/apis/wechat_channels/backup/users/videos/list/)、[微信搜一搜视频号视频搜索（备用版）](https://dataxapi.com/zh/apis/wechat_channels/backup/videos/search/)、[微信视频号账号搜索](https://dataxapi.com/zh/apis/wechat_channels/users/search/)、[微信视频号作品互动数据](https://dataxapi.com/zh/apis/wechat_channels/videos/metrics/)、[微信视频号评论回复](https://dataxapi.com/zh/apis/wechat_channels/comments/replies/list/)、[微信视频号直播回放](https://dataxapi.com/zh/apis/wechat_channels/users/live_replays/list/)、[视频号视频下载（文件地址和解密）](https://dataxapi.com/zh/apis/wechat_channels/videos/media/get/)、[视频号视频转文字（逐字稿）](https://dataxapi.com/zh/apis/wechat_channels/videos/transcript/get/)

怎么做和常见问题：[视频号数据怎么获取？](https://dataxapi.com/zh/answers/how-to-get-wechat-channels-data/)、[视频号的 …@finder 账号编号和 export 编号是什么？](https://dataxapi.com/zh/answers/wechat-channels-finder-id/)、[微信数据接口有哪些？公众号、视频号、搜一搜能取什么（2026）](https://dataxapi.com/zh/answers/wechat-data-apis/)、[给 AI 和 agent 用的视频号数据接口：返回省 token、Claude 和 Cursor 直接调（2026）](https://dataxapi.com/zh/answers/wechat-channels-api-for-ai-agents/)

用到这个接口的 Skills：[关键词搜索与提及](https://dataxapi.com/zh/skills/mentions/)

相关：[微信视频号的全部接口](https://dataxapi.com/zh/apis/wechat_channels/)、[社交媒体数据](https://dataxapi.com/zh/categories/social/)、[这件事在 15 个平台上的对照](https://dataxapi.com/zh/roles/posts-search/)、[内容对象的字段](https://dataxapi.com/zh/docs/objects/post/)

## 常见问题

### 微信搜一搜视频号视频搜索 API 多少钱？

$0.0200 一次。单次最高扣费 $0.0200。

### 什么情况下不收费？

出错和超时不收费。

### 一次返回多少条？怎么翻页？

每页约 10 条，最多 20 条。每页条数由平台决定，不收 limit。取下一页时把 page.next_cursor 作为 cursor 带上；游标有效期 1 小时。最后一页的 page.has_more 是 false。

---

最后核对于 2026-11-28 06:28 UTC。目录修订号 ceced48b38f71468。 [网页版](https://dataxapi.com/zh/apis/wechat_channels/videos/search/)
