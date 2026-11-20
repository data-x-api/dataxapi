# X（推特）社群资料 API

按社群编号取 X 社群的资料：名称、简介、成员数、管理员人数、加入方式、创建时间。每次取一个对象；$0.0004 一次。出错、超时、对象不存在都不收费。

- 地址：`GET https://api.dataxapi.com/v1/x/communities/get`
- 编号：`x.communities.get`
- 也叫：推特社群资料、X 社群详情
- 价格：$0.0004 / 次
- 当前状态不写在这一页上（页面是快照），实时读：`GET https://api.dataxapi.com/v1/catalog/status`
- 返回：1 个对象, 一个社区对象
- 返回社区，预览结构，以后可能调整
- [在 Playground 里跑一次](https://dataxapi.com/zh/console/playground/?capability=x.communities.get&params=%7B%22id%22%3A%221493446837214187523%22%7D)
- 英文名：[X community profile API](https://dataxapi.com/apis/x/communities/get/)

## 能拿到什么

2026-10-12 21:39 UTC 录下的真实返回，这里是前 3 行。

| 字段 | 值 |
| --- | --- |
| nsfw | false |
| created_at | 2022-02-15 04:47 UTC |
| metrics.members | 268,685 |

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | 文本 | 是 | 社群编号，一串数字。示例：`1493446837214187523`。 |
| `view` | 文本 |  | 返回档位。三档价格相同。取值：`compact`、`standard`（默认）、`full`。 |
| `fields` | 文本列表 |  | 只要这些字段。按路径写，例如 `author.name`。 |

## 返回字段

`data.item` 是一个社区对象。预览：结构可能调整，改之前会公告。

返回分三档：精简 `compact`（最常用的字段，长文本截短）、标准 `standard`（默认，全部标准字段）、完整 `full`（再加 `ext`，也就是这个平台特有的字段）。字段从表里写的那一档起出现，更大的档位也带。

| 字段 | 类型 | 说明 | 起始档位 | 这个接口 |
| --- | --- | --- | --- | --- |
| `id` | 文本 | 编号，可原样传给取社区资料和取社区帖子的接口。 | `compact` | 有 |
| `name` | 文本 | 社区的名称。 | `compact` | 有 |
| `url` | 链接 | 能直接打开的链接。 | `compact` | 有 |
| `description` | 文本 | 社区的简介。长文本：精简档只保留前 500 个字符，并在 `warnings` 里写明。 | `compact` | 有 |
| `avatar_url` | 链接 | 社区的图标。 | `standard` | 平台没有 |
| `nsfw` | 是否 | 是否标为成人内容。 | `standard` | 有 |
| `created_at` | 时间 | 社区创建时间。 | `standard` | 有 |
| `metrics` | 对象 | 社区的数字。 | `compact` | 有 |
| `metrics.members` | 整数 | 成员数。 | `compact` | 有 |
| `ext.moderators` | 整数 | 管理员人数。 | `full` | 有 |
| `ext.join_policy` | 文本 | 加入方式，按平台的原文（如 Open）。 | `full` | 有 |
| `ext.topic` | 文本 | 社群的主话题；没有设置则为 null。 | `full` | 有 |
| `ext.cover_url` | 链接 | 社群的横幅图。 | `full` | 有 |
| `approximate` | 对象列表 | 这一条里哪些数是约数或下限；都是准确值时不出现。 | `compact` | 有 |
| `approximate[].field` | 文本 | 字段的路径，如 metrics.views。 | `compact` | 有 |
| `approximate[].kind` | 文本 | 约数，还是下限。取值：`approximate`、`lower_bound`。 | `compact` | 有 |

某一条本来就没有这个值时，字段给 `null`。这个接口给不了的字段不出现，统一列在 `meta.unavailable`。

每条数据的典型体积：`compact` 260 B、`standard` 313 B、`full` 491 B（按 2026-10-12 21:39 UTC 录下的那次返回量的）。

## 翻页

每次取一个对象，不翻页。

## 什么时候收费

| 情况 | 收费 |
| --- | --- |
| 返回了数据 | $0.0004，每次调用收一次 |
| 对象不存在（404） | 不收费 |
| 参数不合法、出错、超时 | 不收费 |
| 单次最高扣费 | $0.0004 (带 `X-Max-Price` 可以设自己的上限，超过就不执行) |

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
curl -G "https://api.dataxapi.com/v1/x/communities/get" \
  --data-urlencode "id=1493446837214187523" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
# pip install dataxapi
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.x.communities.get(id="1493446837214187523")
print(result["data"]["item"])
```

### TypeScript

```typescript
// npm i @dataxapi/sdk
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.x.communities.get({ id: "1493446837214187523" });
console.log(result.data.item);
```

### 命令行

```bash
dataxapi call x.communities.get id=1493446837214187523
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

把这段加进你的 MCP 客户端，然后让你的 AI 调用 `x.communities.get`。

## 返回

### 200

取自 2026-10-12 21:39 UTC 录下的真实返回。名字、正文和编号是示例，链接也是，都不是录到的原文（页面不展示任何人的个人信息）；数字是原样。长列表做了截断。请求号、游标和余额是示意。

返回大小：标准档 651 B（精简 598 B，完整 829 B）。

```jsonc
{
  "code": "ok",
  "request_id": "7e1508ca-5774-4c9e-8cd7-7cea0122a06e",
  "data": {
    "item": {
      "id": "1880166407908944826",
      "name": "Gear talk",
      "url": "https://x.com/i/communities/1880166407908944826",
      "description": "Photos, trails and too much coffee.",
      "nsfw": false,
      "created_at": "2022-02-15T04:47:27.000Z",
      "metrics": { "members": 268685 }
    }
  },
  "warnings": [],
  "meta": {
    "capability": "x.communities.get",
    "result_status": "complete",
    "fetched_at": "2026-10-12T21:39:16.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": { "avatar_url": "platform" },
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
  "request_id": "5b6c48a9-7184-4d4b-9bce-dabd52869156",
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
  "request_id": "8cc64183-2caf-4503-9bd7-9852fc12614b",
  "message": "The balance is too low",
  "message_zh": "余额不足",
  "charged": false,
  "retry": "after_fix",
  "retry_after_seconds": null,
  "param": null,
  "required": "0.0004",
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
  "request_id": "869bdf9b-26d2-4b81-b6a2-80fefb604ac1",
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
  "request_id": "ba0078b0-c353-457c-9d20-839ead06ecfc",
  "message": "No result came back this time and nothing was charged; retry shortly",
  "message_zh": "这次没有取到结果，没有扣费，可以稍后重试",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

这份录制的返回：平台原始 JSON 2,110 token，DataXAPI 的 JSON 195 token，AI 通过 DataXAPI 的 MCP 读到 122 token，少 94%（2026-11-06 统计）。

[这份示例的 JSON 文件](https://dataxapi.com/apis/x/communities/get.example.json)

## 在你的 AI 里用它

`dataxapi setup` 给这台电脑上的 AI 代理（Claude Code、Codex、Cursor）装好 DataXAPI 的 MCP 服务和基础技能。Key 从环境变量 DATAXAPI_API_KEY 读，不写进任何文件。

MCP 服务地址：`https://api.dataxapi.com/mcp`。你的客户端要填的配置在本页请求示例的“MCP”页签里；接好后让你的 AI 调用 `x.communities.get`。

或者把这段话贴给任意一个 AI：

> 读一下 https://dataxapi.com/zh/apis/x/communities/get.md，然后帮我用 DataXAPI 的接口 x.communities.get（X（推特）社群资料）。

[在 ChatGPT 里打开](https://chatgpt.com/?q=%E8%AF%BB%E4%B8%80%E4%B8%8B%20https%3A%2F%2Fdataxapi.com%2Fzh%2Fapis%2Fx%2Fcommunities%2Fget.md%EF%BC%8C%E7%84%B6%E5%90%8E%E5%B8%AE%E6%88%91%E7%94%A8%20DataXAPI%20%E7%9A%84%E6%8E%A5%E5%8F%A3%20x.communities.get%EF%BC%88X%EF%BC%88%E6%8E%A8%E7%89%B9%EF%BC%89%E7%A4%BE%E7%BE%A4%E8%B5%84%E6%96%99%EF%BC%89%E3%80%82) · [在 Claude 里打开](https://claude.ai/new?q=%E8%AF%BB%E4%B8%80%E4%B8%8B%20https%3A%2F%2Fdataxapi.com%2Fzh%2Fapis%2Fx%2Fcommunities%2Fget.md%EF%BC%8C%E7%84%B6%E5%90%8E%E5%B8%AE%E6%88%91%E7%94%A8%20DataXAPI%20%E7%9A%84%E6%8E%A5%E5%8F%A3%20x.communities.get%EF%BC%88X%EF%BC%88%E6%8E%A8%E7%89%B9%EF%BC%89%E7%A4%BE%E7%BE%A4%E8%B5%84%E6%96%99%EF%BC%89%E3%80%82)

## 相关

这是 DataXAPI 社交媒体数据的一部分。同一把 Key 还能用：达人、广告、电商。

同一件事的其他平台：[Reddit 社区资料](https://dataxapi.com/zh/apis/reddit/subreddits/get/)

其他平台的社交媒体数据：[Reddit 用户活跃社区](https://dataxapi.com/zh/apis/reddit/users/subreddits/list/)、[抖音评论回复](https://dataxapi.com/zh/apis/douyin/comments/replies/list/)、[抖音话题视频](https://dataxapi.com/zh/apis/douyin/hashtags/videos/list/)、[B站评论回复](https://dataxapi.com/zh/apis/bilibili/comments/replies/list/)、[B站热搜榜](https://dataxapi.com/zh/apis/bilibili/trends/list/)、[B站用户资料](https://dataxapi.com/zh/apis/bilibili/users/get/)、[B站用户投稿](https://dataxapi.com/zh/apis/bilibili/users/videos/list/)、[B站视频评论](https://dataxapi.com/zh/apis/bilibili/videos/comments/list/)、[B站视频详情](https://dataxapi.com/zh/apis/bilibili/videos/get/)

X 社群的接口：[X 社群帖子](https://dataxapi.com/zh/apis/x/communities/posts/list/)、[X 社群资料](https://dataxapi.com/zh/apis/x/communities/get/)、[X 社群成员](https://dataxapi.com/zh/apis/x/communities/members/list/)

X 列表的接口：[X 列表帖子](https://dataxapi.com/zh/apis/x/lists/posts/list/)、[X 列表关注者](https://dataxapi.com/zh/apis/x/lists/followers/list/)、[X 列表成员](https://dataxapi.com/zh/apis/x/lists/members/list/)

X（推特）的接口：[X 长文详情](https://dataxapi.com/zh/apis/x/posts/article/get/)、[X 帖子详情](https://dataxapi.com/zh/apis/x/posts/get/)、[X 帖子引用列表](https://dataxapi.com/zh/apis/x/posts/quotes/list/)、[X 帖子回复列表](https://dataxapi.com/zh/apis/x/posts/replies/list/)、[X 帖子转推用户](https://dataxapi.com/zh/apis/x/posts/retweeters/list/)、[X 帖子搜索](https://dataxapi.com/zh/apis/x/posts/search/)、[X 帖子对话串](https://dataxapi.com/zh/apis/x/threads/posts/list/)、[X 趋势榜](https://dataxapi.com/zh/apis/x/trends/list/)、[X 用户粉丝列表](https://dataxapi.com/zh/apis/x/users/followers/list/)、[X 用户关注列表](https://dataxapi.com/zh/apis/x/users/following/list/)、[X 用户资料](https://dataxapi.com/zh/apis/x/users/get/)、[X 用户提及](https://dataxapi.com/zh/apis/x/users/mentions/list/)、[X 用户帖子列表](https://dataxapi.com/zh/apis/x/users/posts/list/)、[X 用户搜索](https://dataxapi.com/zh/apis/x/users/search/)、[X 视频字幕](https://dataxapi.com/zh/apis/x/posts/transcript/get/)

相关：[X 社群的全部接口](https://dataxapi.com/zh/apis/x/communities/)、[X（推特）的全部接口](https://dataxapi.com/zh/apis/x/)、[社交媒体数据](https://dataxapi.com/zh/categories/social/)、[这件事在 2 个平台上的对照](https://dataxapi.com/zh/roles/communities-get/)、[社区对象的字段](https://dataxapi.com/zh/docs/objects/community/)

## 常见问题

### X（推特）社群资料 API 多少钱？

$0.0004 一次。单次最高扣费 $0.0004。

### 什么情况下不收费？

出错、超时、对象不存在都不收费。

### 对象不存在会怎样？

返回 404 not_found，不收费。reason 写明是哪一种：not_found（不存在）或 private_or_deleted（私密或已删除）。

---

最后核对于 2026-11-20 07:17 UTC。目录修订号 720fc3ea8dadb865。 [网页版](https://dataxapi.com/zh/apis/x/communities/get/)
