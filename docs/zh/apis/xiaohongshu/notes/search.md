# 小红书笔记搜索 API

按搜索词取一页小红书笔记：标题、正文、作者、互动数、图片，链接带访问令牌可直接打开；标明哪条是报备过的品牌合作笔记。可按综合、最新、最多点赞、最多评论、最多收藏排，可只要视频或图文笔记、只要一天、一周或半年内发布的。每次最多 20 条；$0.0200 一次。出错和超时不收费。

- 地址：`GET https://api.dataxapi.com/v1/xiaohongshu/notes/search`
- 编号：`xiaohongshu.notes.search`
- 也叫：搜小红书、小红书关键词搜索
- 价格：$0.0200 / 次
- 当前状态不写在这一页上（页面是快照），实时读：`GET https://api.dataxapi.com/v1/catalog/status`
- 返回：每页 20 条, 一页，带翻下一页的游标
- 返回标准的内容结构，各平台相同
- [在 Playground 里跑一次](https://dataxapi.com/zh/console/playground/?capability=xiaohongshu.notes.search&params=%7B%22query%22%3A%22%E5%92%96%E5%95%A1%22%7D)
- 英文名：[Xiaohongshu note search API](https://dataxapi.com/apis/xiaohongshu/notes/search/)

## 能拿到什么

2026-10-12 18:43 UTC 录下的真实返回，这里是前 6 行。

| 字段 | 值 |
| --- | --- |
| type | image |
| published_at | 2026-05-17 05:25 UTC |
| metrics.likes | 48 |
| metrics.comments | 21 |
| metrics.shares | 5 |
| metrics.favorites | 10 |

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `query` | 文本 | 是 | 搜索词。示例：`咖啡`。 |
| `sort` | 文本 |  | 排序：综合、最新、最热（最多点赞）、最多评论、最多收藏。取值：`relevance`（默认）、`latest`、`popular`、`most_comments`、`most_favorites`。示例：`relevance`。 |
| `type` | 文本 |  | 只要视频笔记（video）或只要图文笔记（image）；不写则都要。取值：`video`、`image`。示例：`video`。 |
| `published_within` | 文本 |  | 只要最近一天、一周或半年里发布的。取值：`day`、`week`、`half_year`。示例：`week`。 |
| `cursor` | 文本 |  | 上一页返回的游标。把上一页的 `page.next_cursor` 原样带上。每翻一页按一次调用收费。 |
| `view` | 文本 |  | 返回档位。三档价格相同。取值：`compact`、`standard`（默认）、`full`。 |
| `fields` | 文本列表 |  | 只要这些字段。按路径写，例如 `author.name`。 |

## 返回字段

`data.items` 是内容对象的列表。稳定：字段只增不改。

返回分三档：精简 `compact`（最常用的字段，长文本截短）、标准 `standard`（默认，全部标准字段）、完整 `full`（再加 `ext`，也就是这个平台特有的字段）。字段从表里写的那一档起出现，更大的档位也带。

| 字段 | 类型 | 说明 | 起始档位 | 这个接口 |
| --- | --- | --- | --- | --- |
| `id` | 文本 | 编号，可原样传给取详情的接口。 | `compact` | 有 |
| `url` | 链接 | 能直接打开的链接。 | `compact` | 有 |
| `type` | 文本 | 内容形态。取值：`video`、`image`、`text`、`article`。 | `compact` | 有 |
| `title` | 文本 | 标题。在这个平台上：搜索结果卡片上的标题，不带表情符号。 | `compact` | 有 |
| `text` | 文本 | 正文。在这个平台上：搜索结果卡片上的正文摘录，不是全文；完整正文用笔记详情取。长文本：精简档只保留前 500 个字符，并在 `warnings` 里写明。 | `compact` | 有 |
| `lang` | 文本 | 正文的语言。 | `standard` | 这个接口不提供 |
| `published_at` | 时间 | 发布时间。 | `compact` | 有 |
| `author` | 对象 | 作者。 | `compact` | 有 |
| `author.id` | 文本 | 作者的账号编号。 | `compact` | 有 |
| `author.username` | 文本 | 作者的账号名。 | `compact` | 有 |
| `author.name` | 文本 | 作者的显示名。 | `compact` | 有 |
| `author.avatar_url` | 链接 | 作者头像。 | `standard` | 有 |
| `author.verified` | 是否 | 作者是否认证。 | `standard` | 这个接口不提供 |
| `author.followers` | 整数 | 作者的粉丝数。 | `standard` | 这个接口不提供 |
| `metrics` | 对象 | 互动数。 | `compact` | 有 |
| `metrics.likes` | 整数 | 点赞数。 | `compact` | 有 |
| `metrics.comments` | 整数 | 评论数。 | `compact` | 有 |
| `metrics.shares` | 整数 | 分享数。 | `compact` | 有 |
| `metrics.favorites` | 整数 | 收藏数。 | `compact` | 有 |
| `metrics.views` | 整数 | 播放或阅读数。 | `compact` | 平台没有 |
| `metrics.reposts` | 整数 | 转发数。 | `compact` | 平台没有 |
| `images` | 链接列表 | 图片地址。 | `standard` | 有 |
| `hashtags` | 文本列表 | 话题标签，不带 #。 | `standard` | 这个接口不提供 |
| `mentions` | 对象列表 | 正文里提及的账号。 | `standard` | 这个接口不提供 |
| `mentions[].id` | 文本 | 账号编号。 | `standard` | 这个接口不提供 |
| `mentions[].username` | 文本 | 账号名。 | `standard` | 这个接口不提供 |
| `mentions[].name` | 文本 | 显示名。 | `standard` | 这个接口不提供 |
| `is_pinned` | 是否 | 是否被作者置顶。 | `standard` | 这个接口不提供 |
| `post_id` | 文本 | 它回复的那条内容所在的主帖编号；不是回复则为 null。 | `compact` | 平台没有 |
| `parent_id` | 文本 | 它直接回复的那一条的编号；不是回复则为 null。 | `compact` | 平台没有 |
| `root_id` | 文本 | 所在回复串里第一层那一条的编号。 | `compact` | 平台没有 |
| `ext.is_sponsored` | 是否 | 是不是在平台报备过的品牌合作笔记（App 里标“合作”的那种）；合作的品牌名这里拿不到。 | `full` | 有 |
| `approximate` | 对象列表 | 这一条里哪些数是约数或下限；都是准确值时不出现。 | `compact` | 有 |
| `approximate[].field` | 文本 | 字段的路径，如 metrics.views。 | `compact` | 有 |
| `approximate[].kind` | 文本 | 约数，还是下限。取值：`approximate`、`lower_bound`。 | `compact` | 有 |

某一条本来就没有这个值时，字段给 `null`。这个接口给不了的字段不出现，统一列在 `meta.unavailable`。

每条数据的典型体积：`compact` 601 B、`standard` 1.4 KB、`full` 1.4 KB（按 2026-10-12 18:43 UTC 录下的那次返回量的）。

## 翻页

每页 20 条。每页条数由平台决定，不收 `limit`。

取下一页时把 `page.next_cursor` 作为 `cursor` 带上；游标有效期 1 小时。最后一页的 `page.has_more` 是 false。

## 什么时候收费

| 情况 | 收费 |
| --- | --- |
| 返回了数据 | $0.0200，每次调用收一次 |
| 每翻一页 | 按一次调用另收 |
| 参数不合法、出错、超时 | 不收费 |
| 单次最高扣费 | $0.0200 (带 `X-Max-Price` 可以设自己的上限，超过就不执行) |

价格读取于 2026-11-27 06:18 UTC，按价目版本 23，2026-11-27 06:13 UTC 起生效；在 Playground 里运行前会再读一次当前价格。

## 常见报错

所有报错都是同一个结构：`code`、`message`、`charged`、`retry`、`retry_after_seconds`、`param`、`docs_url`。

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
curl -G "https://api.dataxapi.com/v1/xiaohongshu/notes/search" \
  --data-urlencode "query=咖啡" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
# pip install dataxapi
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.xiaohongshu.notes.search(query="咖啡")
print(result["data"]["items"])
```

### TypeScript

```typescript
// npm i @dataxapi/sdk
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.xiaohongshu.notes.search({ query: "咖啡" });
console.log(result.data.items);
```

### 命令行

```bash
dataxapi call xiaohongshu.notes.search 'query=咖啡'
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

把这段加进你的 MCP 客户端，然后让你的 AI 调用 `xiaohongshu.notes.search`。

## 返回

### 200

取自 2026-10-12 18:43 UTC 录下的真实返回。名字、正文和编号是示例，链接也是，都不是录到的原文（页面不展示任何人的个人信息）；数字是原样。长列表做了截断。请求号、游标和余额是示意。

返回大小：标准档 21.5 KB（精简 9.5 KB，完整 21.9 KB）。

```jsonc
{
  "code": "ok",
  "request_id": "d2403177-e4f6-4d04-99eb-afce599b4c31",
  "data": {
    "items": [
      {
        "id": "67d5e2be00000000d803d22d",
        "url": "https://www.xiaohongshu.com/explore/67d5e2be00000000d803d22d",
        "type": "image",
        "title": "实测一个月咖啡，结论有点意外",
        "text": "把咖啡从头到尾讲清楚，看完少走弯路",
        "published_at": "2026-05-17T05:25:25.000Z",
        "author": {
          "id": "6130783200000000883b2a1e",
          "username": "coffee_lab_sh",
          "name": "山野咖啡馆",
          "avatar_url": "https://sns-avatar-qc.xhscdn.com/avatar/610f17040000000049dd4887.jpg"
        },
        "metrics": {
          "likes": 48,
          "comments": 21,
          "shares": 5,
          "favorites": 10
        },
        "images": [
          "https://sns-webpic-qc.xhscdn.com/20261010/2d7c7c32da67d3c3d839!nd_dft_wlteh_webp_3"
        ]
      },
      // … 另有 14 条
    ]
  },
  "page": {
    "next_cursor": "c1.Ip12-f4dS4HmSDpdPex7WuLPBr1zJAbdhL_Wj8K0",
    "cursor_expires_at": "2026-10-12T19:43:26.000Z",
    "has_more": true,
    "returned": 15
  },
  "warnings": [],
  "meta": {
    "capability": "xiaohongshu.notes.search",
    "result_status": "complete",
    "fetched_at": "2026-10-12T18:43:26.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "lang": "capability",
      "metrics.views": "platform",
      "metrics.reposts": "platform",
      "author.verified": "capability",
      "author.followers": "capability",
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

取自 2026-10-12 18:43 UTC 的录制，为演示这种情况人工改过。请求号和余额是示意。

返回大小：标准档 683 B（精简 683 B，完整 683 B）。

```jsonc
{
  "code": "ok",
  "request_id": "d50c391b-4bb0-4b40-a910-1e573bd40251",
  "data": { "items": [] },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 0
  },
  "warnings": [],
  "meta": {
    "capability": "xiaohongshu.notes.search",
    "result_status": "empty",
    "fetched_at": "2026-10-12T18:43:26.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "lang": "capability",
      "metrics.views": "platform",
      "metrics.reposts": "platform",
      "author.verified": "capability",
      "author.followers": "capability",
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
  "request_id": "90c9d391-98c1-45b5-86af-c4bc4bb4bb65",
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
  "request_id": "9729da42-b82b-4e7e-bc8b-27b7065bfa93",
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
  "request_id": "a20cf208-e56e-406c-bb2a-3db3ffecafe3",
  "message": "No result came back this time and nothing was charged; retry shortly",
  "message_zh": "这次没有取到结果，没有扣费，可以稍后重试",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

这份录制的返回：平台原始 JSON 5.1 万 token，DataXAPI 的 JSON 1 万 token，AI 通过 DataXAPI 的 MCP 读到 3,600 token，少 93%（2026-11-06 统计）。

[这份示例的 JSON 文件](https://dataxapi.com/apis/xiaohongshu/notes/search.example.json)

## 在你的 AI 里用它

`dataxapi setup` 给这台电脑上的 AI 代理（Claude Code、Codex、Cursor）装好 DataXAPI 的 MCP 服务和基础技能。Key 从环境变量 DATAXAPI_API_KEY 读，不写进任何文件。

MCP 服务地址：`https://api.dataxapi.com/mcp`。你的客户端要填的配置在本页请求示例的“MCP”页签里；接好后让你的 AI 调用 `xiaohongshu.notes.search`。

或者把这段话贴给任意一个 AI：

> 读一下 https://dataxapi.com/zh/apis/xiaohongshu/notes/search.md，然后帮我用 DataXAPI 的接口 xiaohongshu.notes.search（小红书笔记搜索）。

[在 ChatGPT 里打开](https://chatgpt.com/?q=%E8%AF%BB%E4%B8%80%E4%B8%8B%20https%3A%2F%2Fdataxapi.com%2Fzh%2Fapis%2Fxiaohongshu%2Fnotes%2Fsearch.md%EF%BC%8C%E7%84%B6%E5%90%8E%E5%B8%AE%E6%88%91%E7%94%A8%20DataXAPI%20%E7%9A%84%E6%8E%A5%E5%8F%A3%20xiaohongshu.notes.search%EF%BC%88%E5%B0%8F%E7%BA%A2%E4%B9%A6%E7%AC%94%E8%AE%B0%E6%90%9C%E7%B4%A2%EF%BC%89%E3%80%82) · [在 Claude 里打开](https://claude.ai/new?q=%E8%AF%BB%E4%B8%80%E4%B8%8B%20https%3A%2F%2Fdataxapi.com%2Fzh%2Fapis%2Fxiaohongshu%2Fnotes%2Fsearch.md%EF%BC%8C%E7%84%B6%E5%90%8E%E5%B8%AE%E6%88%91%E7%94%A8%20DataXAPI%20%E7%9A%84%E6%8E%A5%E5%8F%A3%20xiaohongshu.notes.search%EF%BC%88%E5%B0%8F%E7%BA%A2%E4%B9%A6%E7%AC%94%E8%AE%B0%E6%90%9C%E7%B4%A2%EF%BC%89%E3%80%82)

## 相关

这是 DataXAPI 社交媒体数据的一部分。同一把 Key 还能用：达人、广告、电商。

同一件事的其他平台：[B站视频搜索](https://dataxapi.com/zh/apis/bilibili/videos/search/)、[抖音视频搜索](https://dataxapi.com/zh/apis/douyin/videos/search/)、[快手视频搜索](https://dataxapi.com/zh/apis/kuaishou/videos/search/)、[LinkedIn 帖子搜索](https://dataxapi.com/zh/apis/linkedin/posts/search/)、[Threads 帖子搜索](https://dataxapi.com/zh/apis/threads/posts/search/)、[TikTok 视频搜索](https://dataxapi.com/zh/apis/tiktok/videos/search/)、[微博实时搜索](https://dataxapi.com/zh/apis/weibo/posts/search/)、[X 帖子搜索](https://dataxapi.com/zh/apis/x/posts/search/)、[YouTube 视频搜索](https://dataxapi.com/zh/apis/youtube/videos/search/)、[微信搜一搜视频号视频搜索](https://dataxapi.com/zh/apis/wechat_channels/videos/search/)、[微信搜一搜综合搜索](https://dataxapi.com/zh/apis/wechat/posts/search/)、[微信搜一搜综合搜索（备用版）](https://dataxapi.com/zh/apis/wechat/backup/posts/search/)、[微信搜一搜视频号视频搜索（备用版）](https://dataxapi.com/zh/apis/wechat_channels/backup/videos/search/)、[Reddit 帖子搜索](https://dataxapi.com/zh/apis/reddit/posts/search/)、[知乎内容搜索](https://dataxapi.com/zh/apis/zhihu/posts/search/)、[Pinterest 图钉搜索](https://dataxapi.com/zh/apis/pinterest/pins/search/)、[抖音视频搜索（备用版）](https://dataxapi.com/zh/apis/douyin/backup/videos/search/)

小红书的接口：[小红书图片搜索](https://dataxapi.com/zh/apis/xiaohongshu/images/search/)、[小红书笔记详情](https://dataxapi.com/zh/apis/xiaohongshu/notes/get/)、[小红书评论回复](https://dataxapi.com/zh/apis/xiaohongshu/comments/replies/list/)、[小红书笔记评论](https://dataxapi.com/zh/apis/xiaohongshu/notes/comments/list/)、[小红书笔记搜索](https://dataxapi.com/zh/apis/xiaohongshu/notes/search/)、[小红书话题笔记](https://dataxapi.com/zh/apis/xiaohongshu/topics/notes/list/)、[小红书话题详情](https://dataxapi.com/zh/apis/xiaohongshu/topics/get/)、[小红书热点](https://dataxapi.com/zh/apis/xiaohongshu/trends/list/)、[小红书用户资料](https://dataxapi.com/zh/apis/xiaohongshu/users/get/)、[小红书用户笔记](https://dataxapi.com/zh/apis/xiaohongshu/users/notes/list/)、[小红书用户搜索](https://dataxapi.com/zh/apis/xiaohongshu/users/search/)、[小红书搜索框联想词](https://dataxapi.com/zh/apis/xiaohongshu/keywords/related/)、[小红书视频笔记详情（视频地址和字幕）](https://dataxapi.com/zh/apis/xiaohongshu/videos/get/)、[小红书视频转文字（文案提取、逐字稿）](https://dataxapi.com/zh/apis/xiaohongshu/videos/transcript/get/)、[小红书无水印原图和实况图下载地址](https://dataxapi.com/zh/apis/xiaohongshu/notes/media/get/)、[小红书无水印视频下载地址（各档清晰度和字幕）](https://dataxapi.com/zh/apis/xiaohongshu/videos/media/get/)

小红书蒲公英的接口：[小红书蒲公英关键词逐日搜索指数](https://dataxapi.com/zh/apis/xiaohongshu/pgy/keywords/history/)、[小红书蒲公英关联词](https://dataxapi.com/zh/apis/xiaohongshu/pgy/keywords/related/)、[小红书蒲公英博主搜索](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/search/)、[小红书蒲公英博主详情](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/get/)、[小红书蒲公英博主粉丝画像](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/audience/get/)、[小红书蒲公英博主数据表现](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/metrics/)、[小红书蒲公英博主笔记](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/notes/list/)、[小红书蒲公英博主粉丝趋势](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/followers/history/)、[小红书蒲公英相似博主](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/related/)、[小红书蒲公英内容广场热门笔记](https://dataxapi.com/zh/apis/xiaohongshu/pgy/notes/trending/)、[小红书蒲公英博主合作成本和数据概览](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/costs/metrics/)、[小红书蒲公英博主粉丝概览](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/followers/metrics/)、[小红书蒲公英博主核心数据趋势](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/costs/history/)、[小红书蒲公英笔记数据](https://dataxapi.com/zh/apis/xiaohongshu/pgy/notes/get/)

小红书商城的接口：[小红书商品详情](https://dataxapi.com/zh/apis/xiaohongshu/shop/products/get/)、[小红书商品评价](https://dataxapi.com/zh/apis/xiaohongshu/shop/products/reviews/list/)、[小红书商品搜索](https://dataxapi.com/zh/apis/xiaohongshu/shop/products/search/)

怎么做和常见问题：[如何批量获取小红书笔记评论](https://dataxapi.com/zh/guides/xiaohongshu-note-comments/)、[如何按关键词搜索并导出小红书笔记](https://dataxapi.com/zh/guides/xiaohongshu-search-export-notes/)、[小红书有 API 吗？用 Python 拉取笔记和评论（2026）](https://dataxapi.com/zh/guides/xiaohongshu-api-python/)、[小红书数据怎么导出？](https://dataxapi.com/zh/answers/export-xiaohongshu-data/)、[ChatGPT 能读小红书吗？](https://dataxapi.com/zh/answers/can-chatgpt-read-xiaohongshu/)、[小红书 xsec_token 是什么？](https://dataxapi.com/zh/answers/xiaohongshu-xsec-token/)、[小红书数据接口哪个好？官方开放平台、第三方接口、自己爬怎么选（2026）](https://dataxapi.com/zh/answers/best-xiaohongshu-data-api/)、[小红书开放平台能拿到笔记和评论吗（2026）](https://dataxapi.com/zh/answers/xiaohongshu-open-platform-api/)、[DataXAPI 和阿里的 DataX 是一回事吗（2026）](https://dataxapi.com/zh/answers/dataxapi-is-not-datax/)、[xiaohongshu-mcp 登录老失效，有不用登录的小红书 MCP 吗（2026）](https://dataxapi.com/zh/answers/xiaohongshu-mcp-without-login/)、[Claude Code、Cursor、Codex 怎么读小红书，不用 Cookie（2026）](https://dataxapi.com/zh/answers/claude-code-cursor-codex-read-xiaohongshu/)、[小红书 Skill、抖音 Skill 怎么接（2026）](https://dataxapi.com/zh/answers/xiaohongshu-douyin-skill/)、[小红书笔记评论怎么批量导出，分析用户痛点（2026）](https://dataxapi.com/zh/answers/export-xiaohongshu-comments-pain-points/)、[小红书笔记搜索排名怎么批量查（2026）](https://dataxapi.com/zh/answers/xiaohongshu-search-rank-tracking/)、[BettaFish 没有数据怎么办：怎么接小红书、抖音的公开数据（2026）](https://dataxapi.com/zh/answers/bettafish-data-source/)、[TrendRadar 怎么加公众号、小红书数据（2026）](https://dataxapi.com/zh/answers/trendradar-wechat-xiaohongshu/)、[小红书 MCP 报 300011 账号异常、海外服务器跳 rednote 怎么办（2026）](https://dataxapi.com/zh/answers/xiaohongshu-mcp-300011/)、[MediaCrawler 抓小红书被封、报 461，换什么（2026）](https://dataxapi.com/zh/answers/mediacrawler-alternative/)、[蝉妈妈、千瓜、新榜有 API 吗？想要原始数据怎么办（2026）](https://dataxapi.com/zh/answers/chanmama-qiangua-newrank-api/)、[用第三方接口采集小红书、抖音的公开数据合法吗（2026）](https://dataxapi.com/zh/answers/is-public-social-data-collection-legal/)、[小红书接口返回 461 是什么意思（2026）](https://dataxapi.com/zh/answers/xiaohongshu-461-status-code/)、[n8n 怎么接小红书数据（2026）](https://dataxapi.com/zh/answers/xiaohongshu-n8n/)、[飞书多维表格怎么同步小红书笔记数据（2026）](https://dataxapi.com/zh/answers/xiaohongshu-feishu-base/)、[Dify 怎么接小红书数据（MCP，2026）](https://dataxapi.com/zh/answers/xiaohongshu-dify/)、[用数据接口会封我的小红书、抖音账号吗（2026）](https://dataxapi.com/zh/answers/will-data-api-get-my-account-banned/)、[DataXAPI 这类数据接口合规吗（2026）](https://dataxapi.com/zh/answers/is-dataxapi-compliant/)、[DataXAPI 可靠吗、靠谱吗？能自己核对的事实（2026）](https://dataxapi.com/zh/answers/is-dataxapi-reliable/)、[小红书爆款选题怎么批量找（2026）](https://dataxapi.com/zh/answers/xiaohongshu-hit-topic-ideas/)、[小红书选品怎么查：哪些单品卖得好、买家怎么说（2026）](https://dataxapi.com/zh/answers/xiaohongshu-product-research/)、[怎么低成本发现小红书上关于自己品牌的负面（2026）](https://dataxapi.com/zh/answers/spot-xiaohongshu-brand-complaints/)、[小红书爬虫总被封，自己维护和按次调用各要花多少（2026）](https://dataxapi.com/zh/answers/xiaohongshu-scraper-blocked-cost/)、[小红书 x-s、x-t 是什么（2026）](https://dataxapi.com/zh/answers/xiaohongshu-x-s-x-t/)、[小红书 300011、300012、300013 错误码是什么意思（2026）](https://dataxapi.com/zh/answers/xiaohongshu-300011-300013-error-codes/)、[扣子怎么接小红书数据（2026）](https://dataxapi.com/zh/answers/xiaohongshu-coze/)、[有没有能让 Claude 查小红书、抖音、公众号的 MCP？（2026）](https://dataxapi.com/zh/answers/china-social-data-mcp/)、[一个 Key 调小红书、抖音、公众号：社媒数据 API 聚合怎么选（2026）](https://dataxapi.com/zh/answers/one-key-china-social-data-api/)、[中文社媒品牌监测怎么做？微博、抖音、小红书一起查（2026）](https://dataxapi.com/zh/answers/chinese-social-media-brand-monitoring/)、[用户口碑怎么批量取？小红书、抖音评论和电商评价（2026）](https://dataxapi.com/zh/answers/product-reviews-chinese-social-media/)、[舆情监控 API 有哪些？一个关键词同时查微博、抖音、小红书等平台（2026）](https://dataxapi.com/zh/answers/social-listening-api-china/)、[社媒数据接口常见问题：按平台说清能取什么、不能取什么（2026）](https://dataxapi.com/zh/answers/social-media-data-api-faq/)、[哪个社媒数据接口最适合接给 AI？看一次返回占多少 token（2026）](https://dataxapi.com/zh/answers/social-media-api-for-ai-agents/)、[社媒接口返回太长，AI 上下文被塞满、token 烧得快怎么办？](https://dataxapi.com/zh/answers/api-response-too-many-tokens/)、[在 Claude Code、Codex 里怎么取抖音、公众号、小红书数据？（2026）](https://dataxapi.com/zh/answers/claude-code-codex-china-social-data/)、[写论文要采集微博评论、小红书笔记，不会写代码怎么办？（2026）](https://dataxapi.com/zh/answers/social-media-data-for-thesis-research/)、[用中国社媒数据做投研（另类数据）：能取哪些信号，怎么取（2026）](https://dataxapi.com/zh/answers/chinese-social-media-alternative-data/)、[社媒数据接口给 AI 用要多少 token？每个接口逐个实测（2026）](https://dataxapi.com/zh/answers/social-media-api-token-benchmark/)、[给 AI 和 agent 用的小红书数据接口：返回省 token、Claude 和 Cursor 直接调（2026）](https://dataxapi.com/zh/answers/xiaohongshu-api-for-ai-agents/)、[小红书视频怎么用 API 拿到视频地址和字幕？（2026）](https://dataxapi.com/zh/answers/xiaohongshu-video-url-subtitles-api/)、[小红书视频怎么转文字？用平台字幕直接拿文字稿（2026）](https://dataxapi.com/zh/answers/xiaohongshu-video-to-text/)、[小红书爆款笔记榜怎么用 API 拿到？（2026）](https://dataxapi.com/zh/answers/xiaohongshu-trending-notes-api/)、[小红书报备的品牌合作笔记怎么识别？（2026）](https://dataxapi.com/zh/answers/xiaohongshu-sponsored-note-detection/)

用到这个接口的 Skills：[关键词搜索与提及](https://dataxapi.com/zh/skills/mentions/)

相关：[小红书的全部接口](https://dataxapi.com/zh/apis/xiaohongshu/)、[社交媒体数据](https://dataxapi.com/zh/categories/social/)、[这件事在 15 个平台上的对照](https://dataxapi.com/zh/roles/posts-search/)、[内容对象的字段](https://dataxapi.com/zh/docs/objects/post/)

## 常见问题

### 小红书笔记搜索 API 多少钱？

$0.0200 一次。单次最高扣费 $0.0200。

### 什么情况下不收费？

出错和超时不收费。

### 一次返回多少条？怎么翻页？

每页 20 条。每页条数由平台决定，不收 limit。取下一页时把 page.next_cursor 作为 cursor 带上；游标有效期 1 小时。最后一页的 page.has_more 是 false。

---

最后核对于 2026-11-27 06:18 UTC。目录修订号 0264e2d6dd4ff743。 [网页版](https://dataxapi.com/zh/apis/xiaohongshu/notes/search/)
