# 小红书用户笔记 API

按用户编号或主页链接取一页该账号发布的小红书笔记：标题、正文、互动数、图片、是否置顶。每次约 20 条，最多 30 条；$0.0200 一次。出错、超时、对象不存在都不收费。

- 地址：`GET https://api.dataxapi.com/v1/xiaohongshu/users/notes/list`
- 编号：`xiaohongshu.users.notes.list`
- 也叫：小红书博主笔记、账号发布的笔记、小红书博主最近发的笔记
- 价格：$0.0200 / 次
- 当前状态不写在这一页上（页面是快照），实时读：`GET https://api.dataxapi.com/v1/catalog/status`
- 返回：每页最多 30 条, 一页，带翻下一页的游标
- 返回标准的内容结构，各平台相同
- `id` 就在链接里：`xiaohongshu.com/user/profile/<id>`。也可以把整条链接传给 `url`。
- [在 Playground 里跑一次](https://dataxapi.com/zh/console/playground/?capability=xiaohongshu.users.notes.list&params=%7B%22id%22%3A%2263bed214000000002702b862%22%7D)
- 英文名：[Xiaohongshu user notes API](https://dataxapi.com/apis/xiaohongshu/users/notes/list/)

## 能拿到什么

2026-10-12 19:13 UTC 录下的真实返回，这里是前 7 行。

| 字段 | 值 |
| --- | --- |
| type | video |
| published_at | 2026-10-12 01:00 UTC |
| metrics.likes | 8 |
| metrics.comments | 0 |
| metrics.shares | 0 |
| metrics.favorites | 2 |
| is_pinned | false |

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | 文本 | `id`、`url` 里给且只给一个 | 用户编号，24 位十六进制。手里只有主页链接时，填到 url。示例：`63bed214000000002702b862`。 |
| `url` | 文本 | `id`、`url` 里给且只给一个 | 用户主页链接，原样粘贴即可：https://www.xiaohongshu.com/user/profile/…（后面带 xsec_token 等参数也行）、含这种链接的整段分享文案，或 App 复制出来的 xhslink.com 短链接。短链接由我们打开一次，看它跳到哪个主页；打不开时请贴完整的主页链接或用户编号。示例：`https://www.xiaohongshu.com/user/profile/63bed214000000002702b862?xsec_token=ABx1y2z3`。长链接：`https://www.xiaohongshu.com/user/profile/63bed214000000002702b862?xsec_token=ABx1y2z3`。带链接的分享文案：`周末咖啡探店合集 https://www.xiaohongshu.com/user/profile/63bed214000000002702b862?xsec_token=ABx1y2z3 复制这段文字，打开小红书查看`。 |
| `cursor` | 文本 |  | 上一页返回的游标。把上一页的 `page.next_cursor` 原样带上。每翻一页按一次调用收费。 |
| `view` | 文本 |  | 返回档位。三档价格相同。取值：`compact`、`standard`（默认）、`full`。 |
| `fields` | 文本列表 |  | 只要这些字段。按路径写，例如 `author.name`。 |

## 返回字段

`data.items` 是内容对象的列表。稳定：字段只增不改。

返回分三档：精简 `compact`（最常用的字段，长文本截短）、标准 `standard`（默认，全部标准字段）、完整 `full`（再加 `ext`，也就是这个平台特有的字段）。字段从表里写的那一档起出现，更大的档位也带。

| 字段 | 类型 | 说明 | 起始档位 | 这个接口 |
| --- | --- | --- | --- | --- |
| `id` | 文本 | 编号，可原样传给取详情的接口。 | `compact` | 有 |
| `url` | 链接 | 能直接打开的链接。 | `compact` | 这个接口不提供 |
| `type` | 文本 | 内容形态。取值：`video`、`image`、`text`、`article`。 | `compact` | 有 |
| `title` | 文本 | 标题。 | `compact` | 有 |
| `text` | 文本 | 正文。在这个平台上：正文的前 100 个字；完整正文用笔记详情取。长文本：精简档只保留前 500 个字符，并在 `warnings` 里写明。 | `compact` | 有 |
| `lang` | 文本 | 正文的语言。 | `standard` | 这个接口不提供 |
| `published_at` | 时间 | 发布时间。 | `compact` | 有 |
| `author` | 对象 | 作者。 | `compact` | 有 |
| `author.id` | 文本 | 作者的账号编号。 | `compact` | 有 |
| `author.username` | 文本 | 作者的账号名。 | `compact` | 这个接口不提供 |
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
| `mentions` | 对象列表 | 正文里提及的账号。 | `standard` | 有 |
| `mentions[].id` | 文本 | 账号编号。 | `standard` | 有 |
| `mentions[].username` | 文本 | 账号名。 | `standard` | 平台没有 |
| `mentions[].name` | 文本 | 显示名。 | `standard` | 有 |
| `is_pinned` | 是否 | 是否被作者置顶。 | `standard` | 有 |
| `post_id` | 文本 | 它回复的那条内容所在的主帖编号；不是回复则为 null。 | `compact` | 平台没有 |
| `parent_id` | 文本 | 它直接回复的那一条的编号；不是回复则为 null。 | `compact` | 平台没有 |
| `root_id` | 文本 | 所在回复串里第一层那一条的编号。 | `compact` | 平台没有 |
| `approximate` | 对象列表 | 这一条里哪些数是约数或下限；都是准确值时不出现。 | `compact` | 有 |
| `approximate[].field` | 文本 | 字段的路径，如 metrics.views。 | `compact` | 有 |
| `approximate[].kind` | 文本 | 约数，还是下限。取值：`approximate`、`lower_bound`。 | `compact` | 有 |

某一条本来就没有这个值时，字段给 `null`。这个接口给不了的字段不出现，统一列在 `meta.unavailable`。

每条数据的典型体积：`compact` 568 B、`standard` 914 B、`full` 914 B（按 2026-10-12 19:13 UTC 录下的那次返回量的）。

## 翻页

每页约 20 条，最多 30 条。每页条数由平台决定，不收 `limit`。

取下一页时把 `page.next_cursor` 作为 `cursor` 带上；游标有效期 1 小时。最后一页的 `page.has_more` 是 false。

## 什么时候收费

| 情况 | 收费 |
| --- | --- |
| 返回了数据 | $0.0200，每次调用收一次 |
| 每翻一页 | 按一次调用另收 |
| 对象不存在（404） | 不收费 |
| 参数不合法、出错、超时 | 不收费 |
| 单次最高扣费 | $0.0200 (带 `X-Max-Price` 可以设自己的上限，超过就不执行) |

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
| 400 | `cursor_invalid` | 游标不存在 | 未扣费 | 不能 |
| 400 | `cursor_mismatch` | 游标不是用这个接口和这组参数取得的 | 未扣费 | 改了再试 |
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
curl -G "https://api.dataxapi.com/v1/xiaohongshu/users/notes/list" \
  --data-urlencode "id=63bed214000000002702b862" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
# pip install dataxapi
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.xiaohongshu.users.notes.list(id="63bed214000000002702b862")
print(result["data"]["items"])
```

### TypeScript

```typescript
// npm i @dataxapi/sdk
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.xiaohongshu.users.notes.list({ id: "63bed214000000002702b862" });
console.log(result.data.items);
```

### 命令行

```bash
dataxapi call xiaohongshu.users.notes.list id=63bed214000000002702b862
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

把这段加进你的 MCP 客户端，然后让你的 AI 调用 `xiaohongshu.users.notes.list`。

## 返回

### 200

取自 2026-10-12 19:13 UTC 录下的真实返回。名字、正文和编号是示例，链接也是，都不是录到的原文（页面不展示任何人的个人信息）；数字是原样。长列表做了截断。请求号、游标和余额是示意。

返回大小：标准档 18.6 KB（精简 11.8 KB，完整 18.6 KB）。

```jsonc
{
  "code": "ok",
  "request_id": "207ddb09-2a0d-4ff5-8cd3-9ddce35b46a5",
  "data": {
    "items": [
      {
        "id": "676ed1bc00000000d870f54e",
        "type": "video",
        "title": "实测一个月周末露营，结论有点意外",
        "text": "周末的周末露营日常，随手记录一下",
        "published_at": "2026-10-12T01:00:27.000Z",
        "author": {
          "id": "6998fff50000000046ca2f74",
          "name": "南边的风",
          "avatar_url": "https://sns-avatar-qc.xhscdn.com/avatar/6412ba1a00000000ff300cc2.jpg"
        },
        "metrics": {
          "likes": 8,
          "comments": 0,
          "shares": 0,
          "favorites": 2
        },
        "images": [
          "https://sns-webpic-qc.xhscdn.com/20261019/e38ec1fd03381eaef493!nd_dft_wlteh_webp_3"
        ],
        "mentions": [],
        "is_pinned": false
      },
      // … 另有 19 条
    ]
  },
  "page": {
    "next_cursor": "c1.LwegQikqZdn9JGQkwTrpD-r4Bc3_yNoolTMdaIit",
    "cursor_expires_at": "2026-10-12T20:13:48.000Z",
    "has_more": true,
    "returned": 20
  },
  "warnings": [],
  "meta": {
    "capability": "xiaohongshu.users.notes.list",
    "result_status": "complete",
    "fetched_at": "2026-10-12T19:13:48.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "url": "capability",
      "lang": "capability",
      "author.username": "capability",
      "author.verified": "capability",
      "author.followers": "capability",
      "metrics.views": "platform",
      "metrics.reposts": "platform",
      "hashtags": "capability",
      "mentions.username": "platform",
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

取自 2026-10-12 19:13 UTC 的录制，为演示这种情况人工改过。请求号和余额是示意。

返回大小：标准档 719 B（精简 719 B，完整 719 B）。

```jsonc
{
  "code": "ok",
  "request_id": "7f88b9ae-c4d7-400e-8a67-85b6e5a5b8c8",
  "data": { "items": [] },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 0
  },
  "warnings": [],
  "meta": {
    "capability": "xiaohongshu.users.notes.list",
    "result_status": "empty",
    "fetched_at": "2026-10-12T19:13:48.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "url": "capability",
      "lang": "capability",
      "author.username": "capability",
      "author.verified": "capability",
      "author.followers": "capability",
      "metrics.views": "platform",
      "metrics.reposts": "platform",
      "hashtags": "capability",
      "mentions.username": "platform",
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
  "request_id": "790cf3f4-b638-46e9-bf3d-df90a96ed2c1",
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
  "request_id": "13b59347-259c-4812-933c-3e13c6da1048",
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

### 404

按规范写的示例，不是录下的返回。

```json
{
  "code": "not_found",
  "request_id": "d45c03c2-850a-4852-a53c-60141f37e3b1",
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
  "request_id": "cef8ef2c-e5f2-463c-9182-1281f154a185",
  "message": "No result came back this time and nothing was charged; retry shortly",
  "message_zh": "这次没有取到结果，没有扣费，可以稍后重试",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

这份录制的返回：平台原始 JSON 4.9 万 token，DataXAPI 的 JSON 7,269 token，AI 通过 DataXAPI 的 MCP 读到 4,132 token，少 92%（2026-11-06 统计）。

[这份示例的 JSON 文件](https://dataxapi.com/apis/xiaohongshu/users/notes/list.example.json)

## 在你的 AI 里用它

`dataxapi setup` 给这台电脑上的 AI 代理（Claude Code、Codex、Cursor）装好 DataXAPI 的 MCP 服务和基础技能。Key 从环境变量 DATAXAPI_API_KEY 读，不写进任何文件。

MCP 服务地址：`https://api.dataxapi.com/mcp`。你的客户端要填的配置在本页请求示例的“MCP”页签里；接好后让你的 AI 调用 `xiaohongshu.users.notes.list`。

或者把这段话贴给任意一个 AI：

> 读一下 https://dataxapi.com/zh/apis/xiaohongshu/users/notes/list.md，然后帮我用 DataXAPI 的接口 xiaohongshu.users.notes.list（小红书用户笔记）。

[在 ChatGPT 里打开](https://chatgpt.com/?q=%E8%AF%BB%E4%B8%80%E4%B8%8B%20https%3A%2F%2Fdataxapi.com%2Fzh%2Fapis%2Fxiaohongshu%2Fusers%2Fnotes%2Flist.md%EF%BC%8C%E7%84%B6%E5%90%8E%E5%B8%AE%E6%88%91%E7%94%A8%20DataXAPI%20%E7%9A%84%E6%8E%A5%E5%8F%A3%20xiaohongshu.users.notes.list%EF%BC%88%E5%B0%8F%E7%BA%A2%E4%B9%A6%E7%94%A8%E6%88%B7%E7%AC%94%E8%AE%B0%EF%BC%89%E3%80%82) · [在 Claude 里打开](https://claude.ai/new?q=%E8%AF%BB%E4%B8%80%E4%B8%8B%20https%3A%2F%2Fdataxapi.com%2Fzh%2Fapis%2Fxiaohongshu%2Fusers%2Fnotes%2Flist.md%EF%BC%8C%E7%84%B6%E5%90%8E%E5%B8%AE%E6%88%91%E7%94%A8%20DataXAPI%20%E7%9A%84%E6%8E%A5%E5%8F%A3%20xiaohongshu.users.notes.list%EF%BC%88%E5%B0%8F%E7%BA%A2%E4%B9%A6%E7%94%A8%E6%88%B7%E7%AC%94%E8%AE%B0%EF%BC%89%E3%80%82)

## 相关

这是 DataXAPI 社交媒体数据的一部分。同一把 Key 还能用：达人、广告、电商。

同一件事的其他平台：[B站用户投稿](https://dataxapi.com/zh/apis/bilibili/users/videos/list/)、[抖音用户视频](https://dataxapi.com/zh/apis/douyin/users/videos/list/)、[快手用户作品](https://dataxapi.com/zh/apis/kuaishou/users/videos/list/)、[Telegram 频道消息](https://dataxapi.com/zh/apis/telegram/channels/messages/list/)、[Facebook 主页帖子](https://dataxapi.com/zh/apis/facebook/pages/posts/list/)、[LinkedIn 公司帖子](https://dataxapi.com/zh/apis/linkedin/companies/posts/list/)、[Threads 用户帖子](https://dataxapi.com/zh/apis/threads/users/posts/list/)、[Instagram 用户帖子](https://dataxapi.com/zh/apis/instagram/users/posts/list/)、[TikTok 用户作品](https://dataxapi.com/zh/apis/tiktok/users/videos/list/)、[微博用户微博](https://dataxapi.com/zh/apis/weibo/users/posts/list/)、[X 用户帖子列表](https://dataxapi.com/zh/apis/x/users/posts/list/)、[YouTube 频道视频](https://dataxapi.com/zh/apis/youtube/channels/videos/list/)、[微信视频号用户作品](https://dataxapi.com/zh/apis/wechat_channels/users/videos/list/)、[微信公众号文章列表](https://dataxapi.com/zh/apis/wechat_mp/accounts/articles/list/)、[微信视频号用户作品（备用版）](https://dataxapi.com/zh/apis/wechat_channels/backup/users/videos/list/)、[Reddit 用户帖子](https://dataxapi.com/zh/apis/reddit/users/posts/list/)、[知乎用户回答](https://dataxapi.com/zh/apis/zhihu/users/answers/list/)、[知乎用户文章](https://dataxapi.com/zh/apis/zhihu/users/articles/list/)、[知乎用户想法](https://dataxapi.com/zh/apis/zhihu/users/pins/list/)、[B站用户投稿（备用版）](https://dataxapi.com/zh/apis/bilibili/backup/users/videos/list/)、[抖音用户视频（备用版）](https://dataxapi.com/zh/apis/douyin/backup/users/videos/list/)

小红书的接口：[小红书图片搜索](https://dataxapi.com/zh/apis/xiaohongshu/images/search/)、[小红书笔记详情](https://dataxapi.com/zh/apis/xiaohongshu/notes/get/)、[小红书评论回复](https://dataxapi.com/zh/apis/xiaohongshu/comments/replies/list/)、[小红书笔记评论](https://dataxapi.com/zh/apis/xiaohongshu/notes/comments/list/)、[小红书笔记搜索](https://dataxapi.com/zh/apis/xiaohongshu/notes/search/)、[小红书话题笔记](https://dataxapi.com/zh/apis/xiaohongshu/topics/notes/list/)、[小红书话题详情](https://dataxapi.com/zh/apis/xiaohongshu/topics/get/)、[小红书热点](https://dataxapi.com/zh/apis/xiaohongshu/trends/list/)、[小红书用户资料](https://dataxapi.com/zh/apis/xiaohongshu/users/get/)、[小红书用户笔记](https://dataxapi.com/zh/apis/xiaohongshu/users/notes/list/)、[小红书用户搜索](https://dataxapi.com/zh/apis/xiaohongshu/users/search/)、[小红书搜索框联想词](https://dataxapi.com/zh/apis/xiaohongshu/keywords/related/)、[小红书视频笔记详情（视频地址和字幕）](https://dataxapi.com/zh/apis/xiaohongshu/videos/get/)、[小红书视频转文字（文案提取、逐字稿）](https://dataxapi.com/zh/apis/xiaohongshu/videos/transcript/get/)、[小红书无水印原图和实况图下载地址](https://dataxapi.com/zh/apis/xiaohongshu/notes/media/get/)、[小红书无水印视频下载地址（各档清晰度和字幕）](https://dataxapi.com/zh/apis/xiaohongshu/videos/media/get/)

小红书蒲公英的接口：[小红书蒲公英关键词逐日搜索指数](https://dataxapi.com/zh/apis/xiaohongshu/pgy/keywords/history/)、[小红书蒲公英关联词](https://dataxapi.com/zh/apis/xiaohongshu/pgy/keywords/related/)、[小红书蒲公英博主搜索](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/search/)、[小红书蒲公英博主详情](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/get/)、[小红书蒲公英博主粉丝画像](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/audience/get/)、[小红书蒲公英博主数据表现](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/metrics/)、[小红书蒲公英博主笔记](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/notes/list/)、[小红书蒲公英博主粉丝趋势](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/followers/history/)、[小红书蒲公英相似博主](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/related/)、[小红书蒲公英内容广场热门笔记](https://dataxapi.com/zh/apis/xiaohongshu/pgy/notes/trending/)、[小红书蒲公英博主合作成本和数据概览](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/costs/metrics/)、[小红书蒲公英博主粉丝概览](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/followers/metrics/)、[小红书蒲公英博主核心数据趋势](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/costs/history/)、[小红书蒲公英笔记数据](https://dataxapi.com/zh/apis/xiaohongshu/pgy/notes/get/)

小红书商城的接口：[小红书商品详情](https://dataxapi.com/zh/apis/xiaohongshu/shop/products/get/)、[小红书商品评价](https://dataxapi.com/zh/apis/xiaohongshu/shop/products/reviews/list/)、[小红书商品搜索](https://dataxapi.com/zh/apis/xiaohongshu/shop/products/search/)

怎么做和常见问题：[小红书数据怎么导出？](https://dataxapi.com/zh/answers/export-xiaohongshu-data/)、[小红书笔记编号和 xhslink 短链接是什么？](https://dataxapi.com/zh/answers/xiaohongshu-note-id-and-xhslink/)、[小红书数据接口哪个好？官方开放平台、第三方接口、自己爬怎么选（2026）](https://dataxapi.com/zh/answers/best-xiaohongshu-data-api/)、[不开年费，怎么让 AI 每周盯同行的公众号、小红书和抖音（2026）](https://dataxapi.com/zh/answers/track-competitors-with-ai-pay-per-lookup/)、[xiaohongshu-mcp 登录老失效，有不用登录的小红书 MCP 吗（2026）](https://dataxapi.com/zh/answers/xiaohongshu-mcp-without-login/)、[Claude Code、Cursor、Codex 怎么读小红书，不用 Cookie（2026）](https://dataxapi.com/zh/answers/claude-code-cursor-codex-read-xiaohongshu/)、[小红书 Skill、抖音 Skill 怎么接（2026）](https://dataxapi.com/zh/answers/xiaohongshu-douyin-skill/)、[小红书博主全部笔记怎么导出 Excel（2026）](https://dataxapi.com/zh/answers/export-xiaohongshu-creator-notes-excel/)、[TrendRadar 怎么加公众号、小红书数据（2026）](https://dataxapi.com/zh/answers/trendradar-wechat-xiaohongshu/)、[MediaCrawler 抓小红书被封、报 461，换什么（2026）](https://dataxapi.com/zh/answers/mediacrawler-alternative/)、[蝉妈妈、千瓜、新榜有 API 吗？想要原始数据怎么办（2026）](https://dataxapi.com/zh/answers/chanmama-qiangua-newrank-api/)、[怎么用 AI 给账号做诊断和复盘（2026）](https://dataxapi.com/zh/answers/ai-account-audit-and-review/)、[蒲公英博主怎么批量导出（2026）](https://dataxapi.com/zh/answers/export-xiaohongshu-pgy-creators/)、[小红书 x-s、x-t 是什么（2026）](https://dataxapi.com/zh/answers/xiaohongshu-x-s-x-t/)、[小红书 300011、300012、300013 错误码是什么意思（2026）](https://dataxapi.com/zh/answers/xiaohongshu-300011-300013-error-codes/)、[给 AI 和 agent 用的小红书数据接口：返回省 token、Claude 和 Cursor 直接调（2026）](https://dataxapi.com/zh/answers/xiaohongshu-api-for-ai-agents/)、[小红书视频怎么转文字？用平台字幕直接拿文字稿（2026）](https://dataxapi.com/zh/answers/xiaohongshu-video-to-text/)、[小红书数据怎么采集？官方后台、插件、爬虫、数据接口怎么选（2026）](https://dataxapi.com/zh/answers/how-to-collect-xiaohongshu-data/)

用到这个接口的 Skills：[竞品账号监测](https://dataxapi.com/zh/skills/competitors/)、[账号体检](https://dataxapi.com/zh/skills/account-audit/)、[博主视频转文字](https://dataxapi.com/zh/skills/creator-transcripts/)

相关：[小红书的全部接口](https://dataxapi.com/zh/apis/xiaohongshu/)、[社交媒体数据](https://dataxapi.com/zh/categories/social/)、[这件事在 17 个平台上的对照](https://dataxapi.com/zh/roles/accounts-posts-list/)、[内容对象的字段](https://dataxapi.com/zh/docs/objects/post/)

## 常见问题

### 小红书用户笔记 API 多少钱？

$0.0200 一次。单次最高扣费 $0.0200。

### 什么情况下不收费？

出错、超时、对象不存在都不收费。

### 一次返回多少条？怎么翻页？

每页约 20 条，最多 30 条。每页条数由平台决定，不收 limit。取下一页时把 page.next_cursor 作为 cursor 带上；游标有效期 1 小时。最后一页的 page.has_more 是 false。

### 对象不存在会怎样？

返回 404 not_found，不收费。reason 写明是哪一种：not_found（不存在）或 private_or_deleted（私密或已删除）。

---

最后核对于 2026-11-27 06:18 UTC。目录修订号 0264e2d6dd4ff743。 [网页版](https://dataxapi.com/zh/apis/xiaohongshu/users/notes/list/)
