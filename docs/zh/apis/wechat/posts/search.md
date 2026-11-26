# 微信搜一搜综合搜索 API

按搜索词在微信搜一搜里取一页结果，公众号文章和视频号视频混在一起，每条用 type 标明是文章还是视频；可按相关、最新或最热排、按发布时间筛，也可只搜文章或只搜视频：标题或文案、来源账号名称、发布时间，文章带链接（有的带阅读数档位），视频带点赞和收藏数。搜一搜不给账号编号。每次约 20 条，最多 30 条；$0.0200 一次。出错和超时不收费。

- 地址：`GET https://api.dataxapi.com/v1/wechat/posts/search`
- 编号：`wechat.posts.search`
- 也叫：微信搜一搜、搜一搜、搜一搜综合、微信全网搜索、微信搜文章、搜公众号文章
- 价格：$0.0200 / 次
- 当前状态不写在这一页上（页面是快照），实时读：`GET https://api.dataxapi.com/v1/catalog/status`
- 返回：每页最多 30 条, 一页，带翻下一页的游标
- 返回标准的内容结构，各平台相同
- [在 Playground 里跑一次](https://dataxapi.com/zh/console/playground/?capability=wechat.posts.search&params=%7B%22query%22%3A%22%E5%92%96%E5%95%A1%E5%BA%97%E5%BC%80%E4%B8%9A%22%7D)
- 英文名：[WeChat Search articles and videos API](https://dataxapi.com/apis/wechat/posts/search/)

## 能拿到什么

2026-10-17 10:16 UTC 录下的真实返回，这里是前 4 行。

| 字段 | 值 |
| --- | --- |
| type | video |
| published_at | 2026-10-15 06:55 UTC |
| metrics.likes | 1 |
| metrics.favorites | 3 |

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `query` | 文本 | 是 | 搜索词。示例：`咖啡店开业`。 |
| `sort` | 文本 |  | 按相关、按发布时间（新的在前）或按热度排。取值：`relevance`（默认）、`latest`、`popular`。示例：`relevance`。 |
| `published_within` | 文本 |  | 只要最近一天、一周或半年里发布的。取值：`day`、`week`、`half_year`。示例：`week`。 |
| `type` | 文本 |  | 只要公众号文章（article）或只要视频号视频（video）；不写则两种混在一起。取值：`article`、`video`。示例：`article`。 |
| `cursor` | 文本 |  | 上一页返回的游标。把上一页的 `page.next_cursor` 原样带上。每翻一页按一次调用收费。 |
| `view` | 文本 |  | 返回档位。三档价格相同。取值：`compact`、`standard`（默认）、`full`。 |
| `fields` | 文本列表 |  | 只要这些字段。按路径写，例如 `author.name`。 |

## 返回字段

`data.items` 是内容对象的列表。稳定：字段只增不改。

返回分三档：精简 `compact`（最常用的字段，长文本截短）、标准 `standard`（默认，全部标准字段）、完整 `full`（再加 `ext`，也就是这个平台特有的字段）。字段从表里写的那一档起出现，更大的档位也带。

| 字段 | 类型 | 说明 | 起始档位 | 这个接口 |
| --- | --- | --- | --- | --- |
| `id` | 文本 | 编号，可原样传给取详情的接口。在这个平台上：文章：由文章长链接里的 __biz、mid、idx 拼成，和公众号文章列表给的相同，取文章要用 url；视频：搜一搜给这条视频的加密编号（export/ 开头），原样照给，不是视频号作品详情要的数字编号，同一条视频在以后的搜索里不保证还是这个编号。 | `compact` | 有 |
| `url` | 链接 | 能直接打开的链接。在这个平台上：文章的链接；视频号视频没有网页链接，为 null。 | `compact` | 有 |
| `type` | 文本 | 内容形态。取值：`video`、`image`、`text`、`article`。 | `compact` | 有 |
| `title` | 文本 | 标题。在这个平台上：文章的标题，去掉了关键词高亮；视频没有单独的标题，为 null。 | `compact` | 有 |
| `text` | 文本 | 正文。在这个平台上：文章的摘要（不是全文）或视频的文案，去掉了关键词高亮。长文本：精简档只保留前 500 个字符，并在 `warnings` 里写明。 | `compact` | 有 |
| `lang` | 文本 | 正文的语言。 | `standard` | 这个接口不提供 |
| `published_at` | 时间 | 发布时间。 | `compact` | 有 |
| `author` | 对象 | 作者。 | `compact` | 有 |
| `author.id` | 文本 | 作者的账号编号。 | `compact` | 这个接口不提供 |
| `author.username` | 文本 | 作者的账号名。 | `compact` | 这个接口不提供 |
| `author.name` | 文本 | 作者的显示名。在这个平台上：公众号或视频号的名称；搜一搜不给账号编号。 | `compact` | 有 |
| `author.avatar_url` | 链接 | 作者头像。在这个平台上：视频号的头像；文章的结果不带头像，为 null。 | `standard` | 有 |
| `author.verified` | 是否 | 作者是否认证。 | `standard` | 这个接口不提供 |
| `author.followers` | 整数 | 作者的粉丝数。 | `standard` | 这个接口不提供 |
| `metrics` | 对象 | 互动数。 | `compact` | 有 |
| `metrics.likes` | 整数 | 点赞数。在这个平台上：视频卡片上显示的点赞数，“1.4万”这类是约数，“10万+”是下限，没显示数时为 null；文章的结果不带点赞数，为 null（有的文章卡片显示阅读数档位，见 ext.reads_label）。 | `compact` | 有 |
| `metrics.comments` | 整数 | 评论数。 | `compact` | 这个接口不提供 |
| `metrics.shares` | 整数 | 分享数。 | `compact` | 这个接口不提供 |
| `metrics.favorites` | 整数 | 收藏数。在这个平台上：视频卡片上显示的另一个数，和视频号作品列表的收藏数是同一个数，约数、下限和 null 同点赞数；文章为 null。 | `compact` | 有 |
| `metrics.views` | 整数 | 播放或阅读数。 | `compact` | 这个接口不提供 |
| `metrics.reposts` | 整数 | 转发数。 | `compact` | 这个接口不提供 |
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
| `ext.duration` | 数字 | 视频时长，秒；文章则为 null。 | `full` | 有 |
| `ext.cover_url` | 链接 | 封面图：视频的封面或文章的头图。 | `full` | 有 |
| `ext.reads_label` | 文本 | 文章卡片上显示的阅读数档位，平台的原话，如“阅读 N万+”：是档位不是精确数；卡片没显示和视频为 null。 | `full` | 有 |
| `approximate` | 对象列表 | 这一条里哪些数是约数或下限；都是准确值时不出现。 | `compact` | 有 |
| `approximate[].field` | 文本 | 字段的路径，如 metrics.views。 | `compact` | 有 |
| `approximate[].kind` | 文本 | 约数，还是下限。取值：`approximate`、`lower_bound`。 | `compact` | 有 |

某一条本来就没有这个值时，字段给 `null`。这个接口给不了的字段不出现，统一列在 `meta.unavailable`。

每条数据的典型体积：`compact` 546 B、`standard` 653 B、`full` 1.0 KB（按 2026-10-17 10:16 UTC 录下的那次返回量的）。

## 翻页

每页约 20 条，最多 30 条。每页条数由平台决定，不收 `limit`。

取下一页时把 `page.next_cursor` 作为 `cursor` 带上；游标有效期 1 小时。最后一页的 `page.has_more` 是 false。

## 什么时候收费

| 情况 | 收费 |
| --- | --- |
| 返回了数据 | $0.0200，每次调用收一次 |
| 每翻一页 | 按一次调用另收 |
| 参数不合法、出错、超时 | 不收费 |
| 单次最高扣费 | $0.0200 (带 `X-Max-Price` 可以设自己的上限，超过就不执行) |

价格读取于 2026-11-26 12:17 UTC，按价目版本 22，2026-11-25 13:46 UTC 起生效；在 Playground 里运行前会再读一次当前价格。

## 常见报错

所有报错都是同一个结构：`code`、`message`、`charged`、`retry`、`retry_after_seconds`、`param`、`docs_url`。

这个接口取不到数据时（出错、超时或接口暂停），可以改调它的备用版：参数和返回相同，$0.1 一次；这时报错里的 `alternative` 会写明。重试请换一个新的幂等键： [微信搜一搜综合搜索（备用版）API](https://dataxapi.com/zh/apis/wechat/backup/posts/search/)

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
curl -G "https://api.dataxapi.com/v1/wechat/posts/search" \
  --data-urlencode "query=咖啡店开业" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
# pip install dataxapi
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.wechat.posts.search(query="咖啡店开业")
print(result["data"]["items"])
```

### TypeScript

```typescript
// npm i @dataxapi/sdk
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.wechat.posts.search({ query: "咖啡店开业" });
console.log(result.data.items);
```

### 命令行

```bash
dataxapi call wechat.posts.search 'query=咖啡店开业'
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

把这段加进你的 MCP 客户端，然后让你的 AI 调用 `wechat.posts.search`。

## 返回

### 200

取自 2026-10-17 10:16 UTC 录下的真实返回。名字、正文和编号是示例，链接也是，都不是录到的原文（页面不展示任何人的个人信息）；数字是原样。长列表做了截断。请求号、游标和余额是示意。

返回大小：标准档 13.6 KB（精简 11.5 KB，完整 21.0 KB）。

```jsonc
{
  "code": "ok",
  "request_id": "f99e115c-779f-40c2-8f31-aa264bce80dd",
  "data": {
    "items": [
      {
        "id": "1565947629032858",
        "url": null,
        "type": "video",
        "title": null,
        "text": "咖啡店开业｜第一次尝试就爱上了，清单放评论区",
        "published_at": "2026-10-15T06:55:50.000Z",
        "author": {
          "name": "橘子汽水不加冰",
          "avatar_url": "https://wx.qlogo.cn/mmhead/G9OFE9nvQizvdtoFhYPbPgJwNlPo1GOTzMZ7Yb1e/132"
        },
        "metrics": { "likes": 1, "favorites": 3 }
      },
      // … 另有 19 条
    ]
  },
  "page": {
    "next_cursor": "c1.qgwIcUU3N03dRsj5WCHQWiriygBg_3bRP0gIll8U",
    "cursor_expires_at": "2026-10-17T11:16:20.000Z",
    "has_more": true,
    "returned": 20
  },
  "warnings": [],
  "meta": {
    "capability": "wechat.posts.search",
    "result_status": "complete",
    "fetched_at": "2026-10-17T10:16:20.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "lang": "capability",
      "author.id": "capability",
      "author.username": "capability",
      "author.verified": "capability",
      "author.followers": "capability",
      "metrics.comments": "capability",
      "metrics.shares": "capability",
      "metrics.views": "capability",
      "metrics.reposts": "capability",
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

取自 2026-10-17 10:16 UTC 的录制，为演示这种情况人工改过。请求号和余额是示意。

返回大小：标准档 822 B（精简 822 B，完整 822 B）。

```jsonc
{
  "code": "ok",
  "request_id": "49b03542-9ca4-4bfb-9f9c-6fad4bb74545",
  "data": { "items": [] },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 0
  },
  "warnings": [],
  "meta": {
    "capability": "wechat.posts.search",
    "result_status": "empty",
    "fetched_at": "2026-10-17T10:16:20.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "lang": "capability",
      "author.id": "capability",
      "author.username": "capability",
      "author.verified": "capability",
      "author.followers": "capability",
      "metrics.comments": "capability",
      "metrics.shares": "capability",
      "metrics.views": "capability",
      "metrics.reposts": "capability",
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
  "request_id": "a4345739-6e1f-4b7a-ae5a-b0885506b28c",
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
  "request_id": "c656050e-dd53-4086-8ddc-b0474da4f0a8",
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
  "request_id": "38c1cf6b-12f4-45c1-aca0-bba63457bcbf",
  "message": "No result came back this time and nothing was charged; retry shortly",
  "message_zh": "这次没有取到结果，没有扣费，可以稍后重试",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

[这份示例的 JSON 文件](https://dataxapi.com/apis/wechat/posts/search.example.json)

## 在你的 AI 里用它

`dataxapi setup` 给这台电脑上的 AI 代理（Claude Code、Codex、Cursor）装好 DataXAPI 的 MCP 服务和基础技能。Key 从环境变量 DATAXAPI_API_KEY 读，不写进任何文件。

MCP 服务地址：`https://api.dataxapi.com/mcp`。你的客户端要填的配置在本页请求示例的“MCP”页签里；接好后让你的 AI 调用 `wechat.posts.search`。

或者把这段话贴给任意一个 AI：

> 读一下 https://dataxapi.com/zh/apis/wechat/posts/search.md，然后帮我用 DataXAPI 的接口 wechat.posts.search（微信搜一搜综合搜索）。

[在 ChatGPT 里打开](https://chatgpt.com/?q=%E8%AF%BB%E4%B8%80%E4%B8%8B%20https%3A%2F%2Fdataxapi.com%2Fzh%2Fapis%2Fwechat%2Fposts%2Fsearch.md%EF%BC%8C%E7%84%B6%E5%90%8E%E5%B8%AE%E6%88%91%E7%94%A8%20DataXAPI%20%E7%9A%84%E6%8E%A5%E5%8F%A3%20wechat.posts.search%EF%BC%88%E5%BE%AE%E4%BF%A1%E6%90%9C%E4%B8%80%E6%90%9C%E7%BB%BC%E5%90%88%E6%90%9C%E7%B4%A2%EF%BC%89%E3%80%82) · [在 Claude 里打开](https://claude.ai/new?q=%E8%AF%BB%E4%B8%80%E4%B8%8B%20https%3A%2F%2Fdataxapi.com%2Fzh%2Fapis%2Fwechat%2Fposts%2Fsearch.md%EF%BC%8C%E7%84%B6%E5%90%8E%E5%B8%AE%E6%88%91%E7%94%A8%20DataXAPI%20%E7%9A%84%E6%8E%A5%E5%8F%A3%20wechat.posts.search%EF%BC%88%E5%BE%AE%E4%BF%A1%E6%90%9C%E4%B8%80%E6%90%9C%E7%BB%BC%E5%90%88%E6%90%9C%E7%B4%A2%EF%BC%89%E3%80%82)

## 相关

这是 DataXAPI 社交媒体数据的一部分。同一把 Key 还能用：达人、广告、电商。

同一件事的其他平台：[B站视频搜索](https://dataxapi.com/zh/apis/bilibili/videos/search/)、[抖音视频搜索](https://dataxapi.com/zh/apis/douyin/videos/search/)、[快手视频搜索](https://dataxapi.com/zh/apis/kuaishou/videos/search/)、[LinkedIn 帖子搜索](https://dataxapi.com/zh/apis/linkedin/posts/search/)、[Threads 帖子搜索](https://dataxapi.com/zh/apis/threads/posts/search/)、[TikTok 视频搜索](https://dataxapi.com/zh/apis/tiktok/videos/search/)、[微博实时搜索](https://dataxapi.com/zh/apis/weibo/posts/search/)、[X 帖子搜索](https://dataxapi.com/zh/apis/x/posts/search/)、[小红书笔记搜索](https://dataxapi.com/zh/apis/xiaohongshu/notes/search/)、[YouTube 视频搜索](https://dataxapi.com/zh/apis/youtube/videos/search/)、[微信搜一搜视频号视频搜索](https://dataxapi.com/zh/apis/wechat_channels/videos/search/)、[微信搜一搜综合搜索（备用版）](https://dataxapi.com/zh/apis/wechat/backup/posts/search/)、[微信搜一搜视频号视频搜索（备用版）](https://dataxapi.com/zh/apis/wechat_channels/backup/videos/search/)、[Reddit 帖子搜索](https://dataxapi.com/zh/apis/reddit/posts/search/)、[知乎内容搜索](https://dataxapi.com/zh/apis/zhihu/posts/search/)、[Pinterest 图钉搜索](https://dataxapi.com/zh/apis/pinterest/pins/search/)、[抖音视频搜索（备用版）](https://dataxapi.com/zh/apis/douyin/backup/videos/search/)

其他平台的社交媒体数据：[抖音话题视频](https://dataxapi.com/zh/apis/douyin/hashtags/videos/list/)、[B站用户投稿](https://dataxapi.com/zh/apis/bilibili/users/videos/list/)、[B站视频详情](https://dataxapi.com/zh/apis/bilibili/videos/get/)、[B站综合热门](https://dataxapi.com/zh/apis/bilibili/videos/trending/)、[抖音巨量算数达人热门视频](https://dataxapi.com/zh/apis/douyin/index/creators/videos/list/)、[抖音巨量算数关键词热门视频](https://dataxapi.com/zh/apis/douyin/index/videos/search/)、[抖音用户视频](https://dataxapi.com/zh/apis/douyin/users/videos/list/)、[抖音视频详情](https://dataxapi.com/zh/apis/douyin/videos/get/)、[抖音视频播放量](https://dataxapi.com/zh/apis/douyin/videos/metrics/)

微信搜一搜的接口：[微信搜一搜综合搜索](https://dataxapi.com/zh/apis/wechat/posts/search/)、[微信搜一搜综合搜索（备用版）](https://dataxapi.com/zh/apis/wechat/backup/posts/search/)、[微信公众号实时查找](https://dataxapi.com/zh/apis/wechat/accounts/search/)、[微信指数](https://dataxapi.com/zh/apis/wechat/index/keywords/history/)、[微信搜一搜推荐词](https://dataxapi.com/zh/apis/wechat/keywords/related/)、[微信小程序搜索](https://dataxapi.com/zh/apis/wechat/miniprograms/search/)

怎么做和常见问题：[如何用接口查微信搜一搜的结果](https://dataxapi.com/zh/guides/wechat-search-posts/)、[公众号原始 ID（gh_ 开头）是什么？](https://dataxapi.com/zh/answers/wechat-official-account-original-id/)

用到这个接口的 Skills：[关键词搜索与提及](https://dataxapi.com/zh/skills/mentions/)

相关：[微信搜一搜的全部接口](https://dataxapi.com/zh/apis/wechat/)、[社交媒体数据](https://dataxapi.com/zh/categories/social/)、[这件事在 15 个平台上的对照](https://dataxapi.com/zh/roles/posts-search/)、[内容对象的字段](https://dataxapi.com/zh/docs/objects/post/)

## 常见问题

### 微信搜一搜综合搜索 API 多少钱？

$0.0200 一次。单次最高扣费 $0.0200。

### 什么情况下不收费？

出错和超时不收费。

### 一次返回多少条？怎么翻页？

每页约 20 条，最多 30 条。每页条数由平台决定，不收 limit。取下一页时把 page.next_cursor 作为 cursor 带上；游标有效期 1 小时。最后一页的 page.has_more 是 false。

---

最后核对于 2026-11-26 12:17 UTC。目录修订号 0051cce45e9530b9。 [网页版](https://dataxapi.com/zh/apis/wechat/posts/search/)
