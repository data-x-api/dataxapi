# X（推特）列表关注者 API

按列表编号取关注了这个 X 列表的账号，最多 20 个：账号名、显示名、简介、粉丝数、是否认证。只有这一页，不能往后翻。每次最多 20 条；每返回一条 $0.0004，每次最少 $0.0004、最多 $0.0080。出错和超时不收费。

- 地址：`GET https://api.dataxapi.com/v1/x/lists/followers/list`
- 编号：`x.lists.followers.list`
- 也叫：推特列表关注者、关注列表的账号
- 价格：$0.0004 / 条
- 当前状态不写在这一页上（页面是快照），实时读：`GET https://api.dataxapi.com/v1/catalog/status`
- 返回：每页 20 条, 一次给全，不翻页
- 返回标准的账号结构，各平台相同
- [在 Playground 里跑一次](https://dataxapi.com/zh/console/playground/?capability=x.lists.followers.list&params=%7B%22id%22%3A%2284839422%22%7D)
- 英文名：[X list followers API](https://dataxapi.com/apis/x/lists/followers/list/)

## 能拿到什么

2026-10-12 21:37 UTC 录下的真实返回，这里是前 5 行。

| 字段 | 值 |
| --- | --- |
| verified | false |
| created_at | 2023-02-26 14:38 UTC |
| metrics.followers | 17 |
| metrics.following | 94 |
| metrics.posts | 57 |

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | 文本 | 是 | 列表编号，一串数字。示例：`84839422`。 |
| `view` | 文本 |  | 返回档位。三档价格相同。取值：`compact`、`standard`（默认）、`full`。 |
| `fields` | 文本列表 |  | 只要这些字段。按路径写，例如 `author.name`。 |

## 返回字段

`data.items` 是账号对象的列表。稳定：字段只增不改。

返回分三档：精简 `compact`（最常用的字段，长文本截短）、标准 `standard`（默认，全部标准字段）、完整 `full`（再加 `ext`，也就是这个平台特有的字段）。字段从表里写的那一档起出现，更大的档位也带。

| 字段 | 类型 | 说明 | 起始档位 | 这个接口 |
| --- | --- | --- | --- | --- |
| `id` | 文本 | 编号。 | `compact` | 有 |
| `username` | 文本 | 账号名。 | `compact` | 有 |
| `name` | 文本 | 显示名。 | `compact` | 有 |
| `url` | 链接 | 主页链接。 | `compact` | 有 |
| `bio` | 文本 | 简介。长文本：精简档只保留前 500 个字符，并在 `warnings` 里写明。 | `compact` | 有 |
| `avatar_url` | 链接 | 头像。 | `standard` | 有 |
| `verified` | 是否 | 是否认证。在这个平台上：有没有认证标，任何颜色都算：蓝标（付费订阅）、金标（企业）、灰标（政府和官方机构）都是 true，不能当成付费订阅的标志。 | `standard` | 有 |
| `created_at` | 时间 | 账号创建时间。 | `standard` | 有 |
| `metrics` | 对象 | 账号的数字。 | `compact` | 有 |
| `metrics.followers` | 整数 | 粉丝数。 | `compact` | 有 |
| `metrics.following` | 整数 | 关注数。 | `compact` | 有 |
| `metrics.posts` | 整数 | 发布的内容数。 | `compact` | 有 |
| `approximate` | 对象列表 | 这一条里哪些数是约数或下限；都是准确值时不出现。 | `compact` | 有 |
| `approximate[].field` | 文本 | 字段的路径，如 metrics.views。 | `compact` | 有 |
| `approximate[].kind` | 文本 | 约数，还是下限。取值：`approximate`、`lower_bound`。 | `compact` | 有 |

某一条本来就没有这个值时，字段给 `null`。这个接口给不了的字段不出现，统一列在 `meta.unavailable`。

每条数据的典型体积：`compact` 236 B、`standard` 385 B、`full` 385 B（按 2026-10-12 21:37 UTC 录下的那次返回量的）。

## 翻页

每页 20 条。每页条数由平台决定，不收 `limit`。

一次给全，不发游标。

## 什么时候收费

| 情况 | 收费 |
| --- | --- |
| 返回了数据 | 每条有效数据 $0.0004，每次最少 $0.0004 |
| 参数不合法、出错、超时 | 不收费 |
| 单次最高扣费 | $0.0080 (带 `X-Max-Price` 可以设自己的上限，超过就不执行) |

价格读取于 2026-11-28 06:28 UTC，按价目版本 30，2026-11-28 04:43 UTC 起生效；在 Playground 里运行前会再读一次当前价格。

## 对象不存在时

分不清“列表不存在”和“列表没有关注者”：两种情况都返回空结果，不返回 404。

## 常见报错

所有报错都是同一个结构：`code`、`message`、`charged`、`retry`、`retry_after_seconds`、`param`、`docs_url`。

| 状态码 | 代码 | 含义 | 是否扣费 | 能否重试 |
| --- | --- | --- | --- | --- |
| 400 | `invalid_params` | 参数不合法 | 以返回里的 charged 字段为准 | 改了再试 |
| 400 | `request_not_served` | 这种参数组合现在取不了 | 未扣费 | 改了再试 |
| 400 | `max_price_exceeded` | 这次调用的最高价超过了你设的上限 | 未扣费 | 改了再试 |
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
curl -G "https://api.dataxapi.com/v1/x/lists/followers/list" \
  --data-urlencode "id=84839422" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
# pip install dataxapi
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.x.lists.followers.list(id="84839422")
print(result["data"]["items"])
```

### TypeScript

```typescript
// npm i @dataxapi/sdk
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.x.lists.followers.list({ id: "84839422" });
console.log(result.data.items);
```

### 命令行

```bash
dataxapi call x.lists.followers.list id=84839422
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

把这段加进你的 MCP 客户端，然后让你的 AI 调用 `x.lists.followers.list`。

## 返回

### 200

取自 2026-10-12 21:37 UTC 录下的真实返回。名字、正文和编号是示例，链接也是，都不是录到的原文（页面不展示任何人的个人信息）；数字是原样。长列表做了截断。请求号、游标和余额是示意。

返回大小：标准档 7.9 KB（精简 5.0 KB，完整 7.9 KB）。

```jsonc
{
  "code": "ok",
  "request_id": "01b52ab4-39a8-4260-b3db-f2ddde5634c5",
  "data": {
    "items": [
      {
        "id": "150200943895609107",
        "username": "maya_makes",
        "name": "Northside Coffee",
        "url": "https://x.com/maya_makes",
        "bio": null,
        "avatar_url": "https://pbs.twimg.com/profile_images/1824274471146715945/vpuoEzkz_normal.jpg",
        "verified": false,
        "created_at": "2023-02-26T14:38:31.000Z",
        "metrics": { "followers": 17, "following": 94, "posts": 57 }
      },
      // … 另有 19 条
    ]
  },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 20
  },
  "warnings": [],
  "meta": {
    "capability": "x.lists.followers.list",
    "result_status": "complete",
    "fetched_at": "2026-10-12T21:37:50.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {},
    "billing": {
      "amount": "0.008",
      "currency": "USD",
      "balance_after": "9.992"
    }
  }
}
```

### 空结果

取自 2026-10-12 21:39 UTC 录下的真实返回。请求号和余额是示意。

返回大小：标准档 405 B（精简 405 B，完整 405 B）。

```jsonc
{
  "code": "ok",
  "request_id": "4f234e51-b0c2-4dc4-b11f-cc5f3056d157",
  "data": { "items": [] },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 0
  },
  "warnings": [],
  "meta": {
    "capability": "x.lists.followers.list",
    "result_status": "empty",
    "fetched_at": "2026-10-12T21:39:22.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {},
    "billing": {
      "amount": "0.0004",
      "currency": "USD",
      "balance_after": "9.9996"
    }
  }
}
```

### 400

按规范写的示例，不是录下的返回。

```json
{
  "code": "invalid_params",
  "request_id": "d925d8c5-dba5-4f2a-92fa-0cb958f092b4",
  "message": "A parameter is invalid",
  "message_zh": "参数不合法",
  "charged": false,
  "retry": "after_fix",
  "retry_after_seconds": null,
  "param": null,
  "problems": ["id is required"],
  "docs_url": "https://dataxapi.com/docs/errors#invalid_params"
}
```

### 402

按规范写的示例，不是录下的返回。

```json
{
  "code": "insufficient_balance",
  "request_id": "43eb1112-3aff-42e8-9f0d-47a35a7de28e",
  "message": "The balance is too low",
  "message_zh": "余额不足",
  "charged": false,
  "retry": "after_fix",
  "retry_after_seconds": null,
  "param": null,
  "required": "0.008",
  "available": "0",
  "top_up_url": "https://dataxapi.com/console/billing/?amount=10",
  "next_step": "The balance does not cover this call ($0.008). Top up at top_up_url: $10 at least, about 1,250 calls at this price; Alipay or a card, and the balance never expires. Then send the same request again, unchanged. Nothing was charged for this one.",
  "next_step_zh": "余额不够这次调用（$0.008）。到 top_up_url 充值：最低 $10，按这次的价格约够 1,250 次；支付宝、银行卡都能付，余额不过期。到账后把同一个请求原样再发一次。这次没有扣钱。",
  "docs_url": "https://dataxapi.com/docs/errors#insufficient_balance"
}
```

### 502

按规范写的示例，不是录下的返回。

```json
{
  "code": "upstream_failed",
  "request_id": "4b4a5e5f-132c-446f-afc4-d4b023594dd8",
  "message": "No result came back this time and nothing was charged; retry shortly",
  "message_zh": "这次没有取到结果，没有扣费，可以稍后重试",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

这份录制的返回：平台原始 JSON 3,663 token，DataXAPI 的 JSON 2,553 token，AI 通过 DataXAPI 的 MCP 读到 1,511 token，少 59%（2026-11-06 统计）。

[这份示例的 JSON 文件](https://dataxapi.com/apis/x/lists/followers/list.example.json)

## 在你的 AI 里用它

`dataxapi setup` 给这台电脑上的 AI 代理（Claude Code、Codex、Cursor）装好 DataXAPI 的 MCP 服务和基础技能。Key 从环境变量 DATAXAPI_API_KEY 读，不写进任何文件。

MCP 服务地址：`https://api.dataxapi.com/mcp`。你的客户端要填的配置在本页请求示例的“MCP”页签里；接好后让你的 AI 调用 `x.lists.followers.list`。

或者把这段话贴给任意一个 AI：

> 读一下 https://dataxapi.com/zh/apis/x/lists/followers/list.md，然后帮我用 DataXAPI 的接口 x.lists.followers.list（X（推特）列表关注者）。

[在 ChatGPT 里打开](https://chatgpt.com/?q=%E8%AF%BB%E4%B8%80%E4%B8%8B%20https%3A%2F%2Fdataxapi.com%2Fzh%2Fapis%2Fx%2Flists%2Ffollowers%2Flist.md%EF%BC%8C%E7%84%B6%E5%90%8E%E5%B8%AE%E6%88%91%E7%94%A8%20DataXAPI%20%E7%9A%84%E6%8E%A5%E5%8F%A3%20x.lists.followers.list%EF%BC%88X%EF%BC%88%E6%8E%A8%E7%89%B9%EF%BC%89%E5%88%97%E8%A1%A8%E5%85%B3%E6%B3%A8%E8%80%85%EF%BC%89%E3%80%82) · [在 Claude 里打开](https://claude.ai/new?q=%E8%AF%BB%E4%B8%80%E4%B8%8B%20https%3A%2F%2Fdataxapi.com%2Fzh%2Fapis%2Fx%2Flists%2Ffollowers%2Flist.md%EF%BC%8C%E7%84%B6%E5%90%8E%E5%B8%AE%E6%88%91%E7%94%A8%20DataXAPI%20%E7%9A%84%E6%8E%A5%E5%8F%A3%20x.lists.followers.list%EF%BC%88X%EF%BC%88%E6%8E%A8%E7%89%B9%EF%BC%89%E5%88%97%E8%A1%A8%E5%85%B3%E6%B3%A8%E8%80%85%EF%BC%89%E3%80%82)

## 相关

这是 DataXAPI 社交媒体数据的一部分。同一把 Key 还能用：达人、广告、电商。

其他平台的社交媒体数据：[B站用户资料](https://dataxapi.com/zh/apis/bilibili/users/get/)、[抖音用户资料](https://dataxapi.com/zh/apis/douyin/users/get/)、[抖音用户搜索](https://dataxapi.com/zh/apis/douyin/users/search/)、[快手用户资料](https://dataxapi.com/zh/apis/kuaishou/users/get/)、[快手用户搜索](https://dataxapi.com/zh/apis/kuaishou/users/search/)、[Telegram 频道资料](https://dataxapi.com/zh/apis/telegram/channels/get/)、[Facebook 主页资料](https://dataxapi.com/zh/apis/facebook/pages/get/)、[LinkedIn 公司主页](https://dataxapi.com/zh/apis/linkedin/companies/get/)、[Threads 用户资料](https://dataxapi.com/zh/apis/threads/users/get/)、[Instagram 用户资料](https://dataxapi.com/zh/apis/instagram/users/get/)

X 列表的接口：[X 列表帖子](https://dataxapi.com/zh/apis/x/lists/posts/list/)、[X 列表关注者](https://dataxapi.com/zh/apis/x/lists/followers/list/)、[X 列表成员](https://dataxapi.com/zh/apis/x/lists/members/list/)

X 社群的接口：[X 社群帖子](https://dataxapi.com/zh/apis/x/communities/posts/list/)、[X 社群资料](https://dataxapi.com/zh/apis/x/communities/get/)、[X 社群成员](https://dataxapi.com/zh/apis/x/communities/members/list/)

X（推特）的接口：[X 长文详情](https://dataxapi.com/zh/apis/x/posts/article/get/)、[X 帖子详情](https://dataxapi.com/zh/apis/x/posts/get/)、[X 帖子引用列表](https://dataxapi.com/zh/apis/x/posts/quotes/list/)、[X 帖子回复列表](https://dataxapi.com/zh/apis/x/posts/replies/list/)、[X 帖子转推用户](https://dataxapi.com/zh/apis/x/posts/retweeters/list/)、[X 帖子搜索](https://dataxapi.com/zh/apis/x/posts/search/)、[X 帖子对话串](https://dataxapi.com/zh/apis/x/threads/posts/list/)、[X 趋势榜](https://dataxapi.com/zh/apis/x/trends/list/)、[X 用户粉丝列表](https://dataxapi.com/zh/apis/x/users/followers/list/)、[X 用户关注列表](https://dataxapi.com/zh/apis/x/users/following/list/)、[X 用户资料](https://dataxapi.com/zh/apis/x/users/get/)、[X 用户提及](https://dataxapi.com/zh/apis/x/users/mentions/list/)、[X 用户帖子列表](https://dataxapi.com/zh/apis/x/users/posts/list/)、[X 用户搜索](https://dataxapi.com/zh/apis/x/users/search/)、[X 视频字幕](https://dataxapi.com/zh/apis/x/posts/transcript/get/)

相关：[X 列表的全部接口](https://dataxapi.com/zh/apis/x/lists/)、[X（推特）的全部接口](https://dataxapi.com/zh/apis/x/)、[社交媒体数据](https://dataxapi.com/zh/categories/social/)、[账号对象的字段](https://dataxapi.com/zh/docs/objects/account/)

## 常见问题

### X（推特）列表关注者 API 多少钱？

每返回一条 $0.0004，每次最少 $0.0004、最多 $0.0080。单次最高扣费 $0.0080。

### 什么情况下不收费？

出错和超时不收费。

### 一次返回多少条？怎么翻页？

每页 20 条。每页条数由平台决定，不收 limit。一次给全，不发游标。

### 对象不存在会怎样？

分不清“列表不存在”和“列表没有关注者”：两种情况都返回空结果，不返回 404。

---

最后核对于 2026-11-28 06:28 UTC。目录修订号 ceced48b38f71468。 [网页版](https://dataxapi.com/zh/apis/x/lists/followers/list/)
