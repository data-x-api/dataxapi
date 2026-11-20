# 小红书笔记评论 API

按笔记编号或链接取一页小红书一级评论，按时间从新到旧，也可按最热：正文、评论者、点赞数、回复数、发布时间。每次约 10 条，最多 20 条；$0.0200 一次。出错、超时、对象不存在都不收费。

- 地址：`GET https://api.dataxapi.com/v1/xiaohongshu/notes/comments/list`
- 编号：`xiaohongshu.notes.comments.list`
- 也叫：小红书评论区、笔记评论列表
- 价格：$0.0200 / 次
- 当前状态不写在这一页上（页面是快照），实时读：`GET https://api.dataxapi.com/v1/catalog/status`
- 返回：每页最多 20 条, 一页，带翻下一页的游标
- 返回标准的评论结构，各平台相同
- `id` 就在链接里：`xiaohongshu.com/explore/<id>`。也可以把整条链接传给 `url`。
- [在 Playground 里跑一次](https://dataxapi.com/zh/console/playground/?capability=xiaohongshu.notes.comments.list&params=%7B%22id%22%3A%226a9c5884000000002b002d95%22%7D)
- 英文名：[Xiaohongshu note comments API](https://dataxapi.com/apis/xiaohongshu/notes/comments/list/)

## 能拿到什么

2026-10-12 18:43 UTC 录下的真实返回，这里是前 3 行。

| 字段 | 值 |
| --- | --- |
| published_at | 2026-10-11 13:28 UTC |
| metrics.likes | 0 |
| metrics.comments | 0 |

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | 文本 | `id`、`url` 里给且只给一个 | 笔记编号，24 位十六进制。手里只有链接或分享文案时，填到 url。示例：`6a9c5884000000002b002d95`。 |
| `url` | 文本 | `id`、`url` 里给且只给一个 | 笔记链接，原样粘贴即可：浏览器地址栏里的 https://www.xiaohongshu.com/explore/…、网页版分享出的 https://www.xiaohongshu.com/discovery/item/…（后面带 xsec_token 等参数也行）、含这类链接的整段分享文案，或 App 复制出来的 xhslink.com 短链接（连同分享文案一起贴也行）。短链接由我们打开一次，看它跳到哪篇笔记；打不开时请贴完整的笔记链接或笔记编号。示例：`https://www.xiaohongshu.com/explore/6a9c5884000000002b002d95?xsec_token=ABx1y2z3`。长链接：`https://www.xiaohongshu.com/explore/6a9c5884000000002b002d95?xsec_token=ABx1y2z3`。带链接的分享文案：`周末咖啡探店合集 https://www.xiaohongshu.com/discovery/item/6a9c5884000000002b002d95?xsec_token=ABx1y2z3 复制这段文字，打开小红书查看`。 |
| `sort` | 文本 |  | 按时间从新到旧（默认），或按最热（点赞最多的在前）。取值：`latest`（默认）、`popular`。示例：`latest`。 |
| `cursor` | 文本 |  | 上一页返回的游标。把上一页的 `page.next_cursor` 原样带上。每翻一页按一次调用收费。 |
| `view` | 文本 |  | 返回档位。三档价格相同。取值：`compact`、`standard`（默认）、`full`。 |
| `fields` | 文本列表 |  | 只要这些字段。按路径写，例如 `author.name`。 |

## 返回字段

`data.items` 是评论对象的列表。稳定：字段只增不改。

返回分三档：精简 `compact`（最常用的字段，长文本截短）、标准 `standard`（默认，全部标准字段）、完整 `full`（再加 `ext`，也就是这个平台特有的字段）。字段从表里写的那一档起出现，更大的档位也带。

| 字段 | 类型 | 说明 | 起始档位 | 这个接口 |
| --- | --- | --- | --- | --- |
| `id` | 文本 | 编号。 | `compact` | 有 |
| `url` | 链接 | 能直接打开的链接。 | `compact` | 平台没有 |
| `text` | 文本 | 正文。长文本：精简档只保留前 500 个字符，并在 `warnings` 里写明。 | `compact` | 有 |
| `published_at` | 时间 | 发布时间。 | `compact` | 有 |
| `author` | 对象 | 评论者。 | `compact` | 有 |
| `author.id` | 文本 | 评论者的账号编号。 | `compact` | 有 |
| `author.username` | 文本 | 评论者的账号名。 | `compact` | 有 |
| `author.name` | 文本 | 评论者的显示名。 | `compact` | 有 |
| `author.avatar_url` | 链接 | 评论者头像。 | `standard` | 有 |
| `metrics` | 对象 | 互动数。 | `compact` | 有 |
| `metrics.likes` | 整数 | 点赞数。 | `compact` | 有 |
| `metrics.comments` | 整数 | 回复数。 | `compact` | 有 |
| `post_id` | 文本 | 所属内容的编号。 | `compact` | 有 |
| `parent_id` | 文本 | 它直接回复的那条评论的编号；一级评论为 null。 | `compact` | 有 |
| `root_id` | 文本 | 所在回复串的一级评论编号；一级评论为 null。 | `compact` | 有 |
| `ext.ip_location` | 文本 | 平台显示的 IP 属地，给的是英文写法（省份的拼音或英文名），App 里显示的是中文。 | `full` | 可能没有 |
| `approximate` | 对象列表 | 这一条里哪些数是约数或下限；都是准确值时不出现。 | `compact` | 有 |
| `approximate[].field` | 文本 | 字段的路径，如 metrics.views。 | `compact` | 有 |
| `approximate[].kind` | 文本 | 约数，还是下限。取值：`approximate`、`lower_bound`。 | `compact` | 有 |

某一条本来就没有这个值时，字段给 `null`。这个接口给不了的字段不出现，统一列在 `meta.unavailable`。

带 `id`, `sort=latest` 时：`ext.ip_location` 可能没有；每次返回的 `meta.unavailable` 写明这一次给不了哪些。

带 `id`, `sort=popular` 时：`ext.ip_location` 可能没有；每次返回的 `meta.unavailable` 写明这一次给不了哪些。

带 `url`, `sort=latest` 时：`ext.ip_location` 可能没有；每次返回的 `meta.unavailable` 写明这一次给不了哪些。

带 `url`, `sort=popular` 时：`ext.ip_location` 可能没有；每次返回的 `meta.unavailable` 写明这一次给不了哪些。

每条数据的典型体积：`compact` 356 B、`standard` 486 B、`full` 519 B（按 2026-10-12 18:43 UTC 录下的那次返回量的）。

## 翻页

每页约 10 条，最多 20 条。每页条数由平台决定，不收 `limit`。

取下一页时把 `page.next_cursor` 作为 `cursor` 带上；游标有效期 1 小时。最后一页的 `page.has_more` 是 false。

## 什么时候收费

| 情况 | 收费 |
| --- | --- |
| 返回了数据 | $0.0200，每次调用收一次 |
| 每翻一页 | 按一次调用另收 |
| 对象不存在（404） | 不收费 |
| 参数不合法、出错、超时 | 不收费 |
| 单次最高扣费 | $0.0200 (带 `X-Max-Price` 可以设自己的上限，超过就不执行) |

价格读取于 2026-11-20 07:17 UTC，按价目版本 19，2026-11-17 18:04 UTC 起生效；在 Playground 里运行前会再读一次当前价格。

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
curl -G "https://api.dataxapi.com/v1/xiaohongshu/notes/comments/list" \
  --data-urlencode "id=6a9c5884000000002b002d95" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
# pip install dataxapi
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.xiaohongshu.notes.comments.list(id="6a9c5884000000002b002d95")
print(result["data"]["items"])
```

### TypeScript

```typescript
// npm i @dataxapi/sdk
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.xiaohongshu.notes.comments.list({ id: "6a9c5884000000002b002d95" });
console.log(result.data.items);
```

### 命令行

```bash
dataxapi call xiaohongshu.notes.comments.list id=6a9c5884000000002b002d95
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

把这段加进你的 MCP 客户端，然后让你的 AI 调用 `xiaohongshu.notes.comments.list`。

## 返回

### 200

取自 2026-10-12 18:43 UTC 录下的真实返回。名字、正文和编号是示例，链接也是，都不是录到的原文（页面不展示任何人的个人信息）；数字是原样。长列表做了截断。请求号、游标和余额是示意。

返回大小：标准档 5.2 KB（精简 3.9 KB，完整 5.5 KB）。

```jsonc
{
  "code": "ok",
  "request_id": "fd58d135-ef6e-4271-869d-fbb8d27199ce",
  "data": {
    "items": [
      {
        "id": "68d0607400000000edd345fe",
        "text": "我上次也踩了这个坑哈哈",
        "published_at": "2026-10-11T13:28:37.000Z",
        "author": {
          "id": "6da35157000000005fdd7a79",
          "username": "nanfeng_0721",
          "name": "南边的风",
          "avatar_url": "https://sns-avatar-qc.xhscdn.com/avatar/65250da200000000167ab981.jpg"
        },
        "metrics": { "likes": 0, "comments": 0 },
        "post_id": "6696eaf60000000000904fc3",
        "parent_id": null,
        "root_id": null
      },
      // … 另有 9 条
    ]
  },
  "page": {
    "next_cursor": "c1.lk7Qsam6A9ERrgAE_Wv8XIQJG0N-AN_z2Xy0yA78",
    "cursor_expires_at": "2026-10-12T19:43:50.000Z",
    "has_more": true,
    "returned": 10
  },
  "warnings": [],
  "meta": {
    "capability": "xiaohongshu.notes.comments.list",
    "result_status": "complete",
    "fetched_at": "2026-10-12T18:43:50.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": { "url": "platform" },
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

返回大小：标准档 430 B（精简 430 B，完整 430 B）。

```jsonc
{
  "code": "ok",
  "request_id": "33bfcf14-e912-4809-b7f1-507247ed4f7c",
  "data": { "items": [] },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 0
  },
  "warnings": [],
  "meta": {
    "capability": "xiaohongshu.notes.comments.list",
    "result_status": "empty",
    "fetched_at": "2026-10-12T18:43:50.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": { "url": "platform" },
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
  "request_id": "e75837d4-d67f-44d4-b14e-31c5da125c4f",
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
  "request_id": "df3a96cd-12de-478b-8713-1efa36c1ec27",
  "message": "The balance is too low",
  "message_zh": "余额不足",
  "charged": false,
  "retry": "after_fix",
  "retry_after_seconds": null,
  "param": null,
  "required": "0.02",
  "available": "0",
  "top_up_url": "https://dataxapi.com/console/billing/?amount=10",
  "next_step": "Top up at top_up_url, then send the same request again, unchanged. Nothing was charged for this one.",
  "next_step_zh": "到 top_up_url 充值，到账后把同一个请求原样再发一次。这次没有扣钱。",
  "docs_url": "https://dataxapi.com/docs/errors#insufficient_balance"
}
```

### 404

按规范写的示例，不是录下的返回。

```json
{
  "code": "not_found",
  "request_id": "95681e44-c620-41c7-8433-2bbfdafd15fd",
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
  "request_id": "cd021006-e945-4566-bcc2-67e88f9382d9",
  "message": "No result came back this time and nothing was charged; retry shortly",
  "message_zh": "这次没有取到结果，没有扣费，可以稍后重试",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

这份录制的返回：平台原始 JSON 4,683 token，DataXAPI 的 JSON 2,042 token，AI 通过 DataXAPI 的 MCP 读到 1,461 token，少 69%（2026-11-06 统计）。

[这份示例的 JSON 文件](https://dataxapi.com/apis/xiaohongshu/notes/comments/list.example.json)

## 在你的 AI 里用它

`dataxapi setup` 给这台电脑上的 AI 代理（Claude Code、Codex、Cursor）装好 DataXAPI 的 MCP 服务和基础技能。Key 从环境变量 DATAXAPI_API_KEY 读，不写进任何文件。

MCP 服务地址：`https://api.dataxapi.com/mcp`。你的客户端要填的配置在本页请求示例的“MCP”页签里；接好后让你的 AI 调用 `xiaohongshu.notes.comments.list`。

或者把这段话贴给任意一个 AI：

> 读一下 https://dataxapi.com/zh/apis/xiaohongshu/notes/comments/list.md，然后帮我用 DataXAPI 的接口 xiaohongshu.notes.comments.list（小红书笔记评论）。

[在 ChatGPT 里打开](https://chatgpt.com/?q=%E8%AF%BB%E4%B8%80%E4%B8%8B%20https%3A%2F%2Fdataxapi.com%2Fzh%2Fapis%2Fxiaohongshu%2Fnotes%2Fcomments%2Flist.md%EF%BC%8C%E7%84%B6%E5%90%8E%E5%B8%AE%E6%88%91%E7%94%A8%20DataXAPI%20%E7%9A%84%E6%8E%A5%E5%8F%A3%20xiaohongshu.notes.comments.list%EF%BC%88%E5%B0%8F%E7%BA%A2%E4%B9%A6%E7%AC%94%E8%AE%B0%E8%AF%84%E8%AE%BA%EF%BC%89%E3%80%82) · [在 Claude 里打开](https://claude.ai/new?q=%E8%AF%BB%E4%B8%80%E4%B8%8B%20https%3A%2F%2Fdataxapi.com%2Fzh%2Fapis%2Fxiaohongshu%2Fnotes%2Fcomments%2Flist.md%EF%BC%8C%E7%84%B6%E5%90%8E%E5%B8%AE%E6%88%91%E7%94%A8%20DataXAPI%20%E7%9A%84%E6%8E%A5%E5%8F%A3%20xiaohongshu.notes.comments.list%EF%BC%88%E5%B0%8F%E7%BA%A2%E4%B9%A6%E7%AC%94%E8%AE%B0%E8%AF%84%E8%AE%BA%EF%BC%89%E3%80%82)

## 相关

这是 DataXAPI 社交媒体数据的一部分。同一把 Key 还能用：达人、广告、电商。

同一件事的其他平台：[B站视频评论](https://dataxapi.com/zh/apis/bilibili/videos/comments/list/)、[抖音视频评论](https://dataxapi.com/zh/apis/douyin/videos/comments/list/)、[快手作品评论](https://dataxapi.com/zh/apis/kuaishou/videos/comments/list/)、[Facebook 帖子评论](https://dataxapi.com/zh/apis/facebook/posts/comments/list/)、[Instagram 帖子评论](https://dataxapi.com/zh/apis/instagram/posts/comments/list/)、[TikTok 视频评论](https://dataxapi.com/zh/apis/tiktok/videos/comments/list/)、[微博评论](https://dataxapi.com/zh/apis/weibo/posts/comments/list/)、[X 帖子回复列表](https://dataxapi.com/zh/apis/x/posts/replies/list/)、[YouTube 视频评论](https://dataxapi.com/zh/apis/youtube/videos/comments/list/)、[微信视频号作品评论](https://dataxapi.com/zh/apis/wechat_channels/videos/comments/list/)、[Reddit 帖子评论](https://dataxapi.com/zh/apis/reddit/posts/comments/list/)、[知乎回答评论](https://dataxapi.com/zh/apis/zhihu/answers/comments/list/)

小红书的接口：[小红书图片搜索](https://dataxapi.com/zh/apis/xiaohongshu/images/search/)、[小红书笔记详情](https://dataxapi.com/zh/apis/xiaohongshu/notes/get/)、[小红书评论回复](https://dataxapi.com/zh/apis/xiaohongshu/comments/replies/list/)、[小红书笔记评论](https://dataxapi.com/zh/apis/xiaohongshu/notes/comments/list/)、[小红书笔记搜索](https://dataxapi.com/zh/apis/xiaohongshu/notes/search/)、[小红书话题笔记](https://dataxapi.com/zh/apis/xiaohongshu/topics/notes/list/)、[小红书话题详情](https://dataxapi.com/zh/apis/xiaohongshu/topics/get/)、[小红书热点](https://dataxapi.com/zh/apis/xiaohongshu/trends/list/)、[小红书用户资料](https://dataxapi.com/zh/apis/xiaohongshu/users/get/)、[小红书用户笔记](https://dataxapi.com/zh/apis/xiaohongshu/users/notes/list/)、[小红书用户搜索](https://dataxapi.com/zh/apis/xiaohongshu/users/search/)、[小红书搜索框联想词](https://dataxapi.com/zh/apis/xiaohongshu/keywords/related/)、[小红书视频笔记详情（视频地址和字幕）](https://dataxapi.com/zh/apis/xiaohongshu/videos/get/)

小红书蒲公英的接口：[小红书蒲公英关键词逐日搜索指数](https://dataxapi.com/zh/apis/xiaohongshu/pgy/keywords/history/)、[小红书蒲公英关联词](https://dataxapi.com/zh/apis/xiaohongshu/pgy/keywords/related/)、[小红书蒲公英博主搜索](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/search/)、[小红书蒲公英博主详情](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/get/)、[小红书蒲公英博主粉丝画像](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/audience/get/)、[小红书蒲公英博主数据表现](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/metrics/)、[小红书蒲公英博主笔记](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/notes/list/)、[小红书蒲公英博主粉丝趋势](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/followers/history/)、[小红书蒲公英相似博主](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/related/)、[小红书蒲公英内容广场热门笔记](https://dataxapi.com/zh/apis/xiaohongshu/pgy/notes/trending/)、[小红书蒲公英博主合作成本和数据概览](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/costs/metrics/)、[小红书蒲公英博主粉丝概览](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/followers/metrics/)、[小红书蒲公英博主核心数据趋势](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/costs/history/)、[小红书蒲公英笔记数据](https://dataxapi.com/zh/apis/xiaohongshu/pgy/notes/get/)

小红书商城的接口：[小红书商品详情](https://dataxapi.com/zh/apis/xiaohongshu/shop/products/get/)、[小红书商品评价](https://dataxapi.com/zh/apis/xiaohongshu/shop/products/reviews/list/)、[小红书商品搜索](https://dataxapi.com/zh/apis/xiaohongshu/shop/products/search/)

怎么做和常见问题：[如何批量获取小红书笔记评论](https://dataxapi.com/zh/guides/xiaohongshu-note-comments/)、[小红书有 API 吗？用 Python 拉取笔记和评论（2026）](https://dataxapi.com/zh/guides/xiaohongshu-api-python/)、[小红书数据怎么导出？](https://dataxapi.com/zh/answers/export-xiaohongshu-data/)、[ChatGPT 能读小红书吗？](https://dataxapi.com/zh/answers/can-chatgpt-read-xiaohongshu/)、[小红书 xsec_token 是什么？](https://dataxapi.com/zh/answers/xiaohongshu-xsec-token/)、[小红书笔记编号和 xhslink 短链接是什么？](https://dataxapi.com/zh/answers/xiaohongshu-note-id-and-xhslink/)、[小红书数据接口哪个好？官方开放平台、第三方接口、自己爬怎么选（2026）](https://dataxapi.com/zh/answers/best-xiaohongshu-data-api/)、[小红书开放平台能拿到笔记和评论吗（2026）](https://dataxapi.com/zh/answers/xiaohongshu-open-platform-api/)、[xiaohongshu-mcp 登录老失效，有不用登录的小红书 MCP 吗（2026）](https://dataxapi.com/zh/answers/xiaohongshu-mcp-without-login/)、[Claude Code、Cursor、Codex 怎么读小红书，不用 Cookie（2026）](https://dataxapi.com/zh/answers/claude-code-cursor-codex-read-xiaohongshu/)、[小红书 Skill、抖音 Skill 怎么接（2026）](https://dataxapi.com/zh/answers/xiaohongshu-douyin-skill/)、[小红书笔记评论怎么批量导出，分析用户痛点（2026）](https://dataxapi.com/zh/answers/export-xiaohongshu-comments-pain-points/)、[BettaFish 没有数据怎么办：怎么接小红书、抖音的公开数据（2026）](https://dataxapi.com/zh/answers/bettafish-data-source/)、[小红书 MCP 报 300011 账号异常、海外服务器跳 rednote 怎么办（2026）](https://dataxapi.com/zh/answers/xiaohongshu-mcp-300011/)、[不写代码，怎么让 AI 帮你取公众号、小红书、抖音数据（可复制的话，2026）](https://dataxapi.com/zh/answers/get-social-data-with-ai-no-code/)、[MediaCrawler 抓小红书被封、报 461，换什么（2026）](https://dataxapi.com/zh/answers/mediacrawler-alternative/)、[小红书接口返回 461 是什么意思（2026）](https://dataxapi.com/zh/answers/xiaohongshu-461-status-code/)、[n8n 怎么接小红书数据（2026）](https://dataxapi.com/zh/answers/xiaohongshu-n8n/)、[Dify 怎么接小红书数据（MCP，2026）](https://dataxapi.com/zh/answers/xiaohongshu-dify/)、[怎么低成本发现小红书上关于自己品牌的负面（2026）](https://dataxapi.com/zh/answers/spot-xiaohongshu-brand-complaints/)、[小红书爬虫总被封，自己维护和按次调用各要花多少（2026）](https://dataxapi.com/zh/answers/xiaohongshu-scraper-blocked-cost/)、[小红书 x-s、x-t 是什么（2026）](https://dataxapi.com/zh/answers/xiaohongshu-x-s-x-t/)、[小红书 300011、300012、300013 错误码是什么意思（2026）](https://dataxapi.com/zh/answers/xiaohongshu-300011-300013-error-codes/)、[扣子怎么接小红书数据（2026）](https://dataxapi.com/zh/answers/xiaohongshu-coze/)、[中文社媒品牌监测怎么做？微博、抖音、小红书一起查（2026）](https://dataxapi.com/zh/answers/chinese-social-media-brand-monitoring/)、[用户口碑怎么批量取？小红书、抖音评论和电商评价（2026）](https://dataxapi.com/zh/answers/product-reviews-chinese-social-media/)、[在 Claude Code、Codex 里怎么取抖音、公众号、小红书数据？（2026）](https://dataxapi.com/zh/answers/claude-code-codex-china-social-data/)、[写论文要采集微博评论、小红书笔记，不会写代码怎么办？（2026）](https://dataxapi.com/zh/answers/social-media-data-for-thesis-research/)、[给 AI 和 agent 用的小红书数据接口：返回省 token、Claude 和 Cursor 直接调（2026）](https://dataxapi.com/zh/answers/xiaohongshu-api-for-ai-agents/)、[小红书蒲公英达人页上的每个数据，API 都能取到吗？逐项对照（2026）](https://dataxapi.com/zh/answers/xiaohongshu-pgy-creator-page-fields/)

用到这个接口的 Skills：[评论与口碑](https://dataxapi.com/zh/skills/comments/)

相关：[小红书的全部接口](https://dataxapi.com/zh/apis/xiaohongshu/)、[社交媒体数据](https://dataxapi.com/zh/categories/social/)、[这件事在 13 个平台上的对照](https://dataxapi.com/zh/roles/posts-comments-list/)、[评论对象的字段](https://dataxapi.com/zh/docs/objects/comment/)

## 常见问题

### 小红书笔记评论 API 多少钱？

$0.0200 一次。单次最高扣费 $0.0200。

### 什么情况下不收费？

出错、超时、对象不存在都不收费。

### 一次返回多少条？怎么翻页？

每页约 10 条，最多 20 条。每页条数由平台决定，不收 limit。取下一页时把 page.next_cursor 作为 cursor 带上；游标有效期 1 小时。最后一页的 page.has_more 是 false。

### 对象不存在会怎样？

返回 404 not_found，不收费。reason 写明是哪一种：not_found（不存在）或 private_or_deleted（私密或已删除）。

---

最后核对于 2026-11-20 07:17 UTC。目录修订号 720fc3ea8dadb865。 [网页版](https://dataxapi.com/zh/apis/xiaohongshu/notes/comments/list/)
