# 微信视频号账号搜索 API

按名称找视频号账号：名称要一字不差，同名的都返回。给账号编号、名称、简介、头像、是否认证和认证信息；账号编号可以传给视频号的资料、作品列表、直播回放等接口。每次约 1 条，最多 20 条；$0.0600 一次。出错和超时不收费。

- 地址：`GET https://api.dataxapi.com/v1/wechat_channels/users/search`
- 编号：`wechat_channels.users.search`
- 也叫：搜视频号、找视频号账号、视频号名字查ID、视频号账号查询、视频号博主搜索、按名字查视频号
- 价格：$0.0600 / 次
- 当前状态不写在这一页上（页面是快照），实时读：`GET https://api.dataxapi.com/v1/catalog/status`
- 返回：每页最多 20 条, 一次给全，不翻页
- 返回标准的账号结构，各平台相同
- [在 Playground 里跑一次](https://dataxapi.com/zh/console/playground/?capability=wechat_channels.users.search&params=%7B%22query%22%3A%22%E5%A4%AE%E8%A7%86%E6%96%B0%E9%97%BB%22%7D)
- 英文名：[WeChat Channels account search API](https://dataxapi.com/apis/wechat_channels/users/search/)

## 能拿到什么

2026-10-29 10:19 UTC 录下的真实返回，这里是前 1 行。

| 字段 | 值 |
| --- | --- |
| verified | false |

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `query` | 文本 | 是 | 视频号的名称，一字不差。示例：`央视新闻`。 |
| `view` | 文本 |  | 返回档位。三档价格相同。取值：`compact`、`standard`（默认）、`full`。 |
| `fields` | 文本列表 |  | 只要这些字段。按路径写，例如 `author.name`。 |

## 返回字段

`data.items` 是账号对象的列表。稳定：字段只增不改。

返回分三档：精简 `compact`（最常用的字段，长文本截短）、标准 `standard`（默认，全部标准字段）、完整 `full`（再加 `ext`，也就是这个平台特有的字段）。字段从表里写的那一档起出现，更大的档位也带。

| 字段 | 类型 | 说明 | 起始档位 | 这个接口 |
| --- | --- | --- | --- | --- |
| `id` | 文本 | 编号。 | `compact` | 有 |
| `username` | 文本 | 账号名。 | `compact` | 平台没有 |
| `name` | 文本 | 显示名。 | `compact` | 有 |
| `url` | 链接 | 主页链接。 | `compact` | 平台没有 |
| `bio` | 文本 | 简介。长文本：精简档只保留前 500 个字符，并在 `warnings` 里写明。 | `compact` | 有 |
| `avatar_url` | 链接 | 头像。 | `standard` | 有 |
| `verified` | 是否 | 是否认证。 | `standard` | 有 |
| `created_at` | 时间 | 账号创建时间。 | `standard` | 这个接口不提供 |
| `metrics` | 对象 | 账号的数字。 | `compact` | 这个接口不提供 |
| `metrics.followers` | 整数 | 粉丝数。 | `compact` | 这个接口不提供 |
| `metrics.following` | 整数 | 关注数。 | `compact` | 这个接口不提供 |
| `metrics.posts` | 整数 | 发布的内容数。 | `compact` | 这个接口不提供 |
| `ext.verification` | 文本 | 认证信息，平台的原话：企业、机构认证的是主体名称，个人认证的是身份或职业；没认证为 null。 | `full` | 有 |
| `approximate` | 对象列表 | 这一条里哪些数是约数或下限；都是准确值时不出现。 | `compact` | 有 |
| `approximate[].field` | 文本 | 字段的路径，如 metrics.views。 | `compact` | 有 |
| `approximate[].kind` | 文本 | 约数，还是下限。取值：`approximate`、`lower_bound`。 | `compact` | 有 |

某一条本来就没有这个值时，字段给 `null`。这个接口给不了的字段不出现，统一列在 `meta.unavailable`。

每条数据的典型体积：`compact` 131 B、`standard` 253 B、`full` 281 B（按 2026-10-29 10:19 UTC 录下的那次返回量的）。

## 翻页

每页约 1 条，最多 20 条。每页条数由平台决定，不收 `limit`。

一次给全，不发游标。

## 什么时候收费

| 情况 | 收费 |
| --- | --- |
| 返回了数据 | $0.0600，每次调用收一次 |
| 参数不合法、出错、超时 | 不收费 |
| 单次最高扣费 | $0.0600 (带 `X-Max-Price` 可以设自己的上限，超过就不执行) |

价格读取于 2026-11-28 06:28 UTC，按价目版本 30，2026-11-28 04:43 UTC 起生效；在 Playground 里运行前会再读一次当前价格。

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
curl -G "https://api.dataxapi.com/v1/wechat_channels/users/search" \
  --data-urlencode "query=央视新闻" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
# pip install dataxapi
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.wechat_channels.users.search(query="央视新闻")
print(result["data"]["items"])
```

### TypeScript

```typescript
// npm i @dataxapi/sdk
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.wechat_channels.users.search({ query: "央视新闻" });
console.log(result.data.items);
```

### 命令行

```bash
dataxapi call wechat_channels.users.search 'query=央视新闻'
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

把这段加进你的 MCP 客户端，然后让你的 AI 调用 `wechat_channels.users.search`。

## 返回

### 200

取自 2026-10-29 10:19 UTC 录下的真实返回。名字、正文和编号是示例，链接也是，都不是录到的原文（页面不展示任何人的个人信息）；数字是原样。长列表做了截断。请求号、游标和余额是示意。

返回大小：标准档 1.0 KB（精简 760 B，完整 1.0 KB）。

```jsonc
{
  "code": "ok",
  "request_id": "9b4ae98e-ff1c-4be2-a081-de7a4c417320",
  "data": {
    "items": [
      {
        "id": "v2_060000231003b20f05a99829d60f183968442cbbd75213164b2ee52fc0a0ade5678bd240c0@finder",
        "name": "山野咖啡馆",
        "bio": "记录生活里的小确幸｜合作请私信",
        "avatar_url": "https://wx.qlogo.cn/mmhead/sYXnQFwJZb0xiPhE5pI7TE9SVTvf0TcvVbc0dzgM/132",
        "verified": false
      },
      // … 另有 1 条
    ]
  },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 2
  },
  "warnings": [],
  "meta": {
    "capability": "wechat_channels.users.search",
    "result_status": "complete",
    "fetched_at": "2026-10-29T10:19:50.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "username": "platform",
      "url": "platform",
      "created_at": "capability",
      "metrics": "capability"
    },
    "billing": {
      "amount": "0.06",
      "currency": "USD",
      "balance_after": "9.94"
    }
  }
}
```

### 空结果

取自 2026-10-29 09:50 UTC 录下的真实返回。请求号和余额是示意。

返回大小：标准档 498 B（精简 498 B，完整 498 B）。

```jsonc
{
  "code": "ok",
  "request_id": "ed373f65-f881-4538-8c0d-835d00321267",
  "data": { "items": [] },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 0
  },
  "warnings": [],
  "meta": {
    "capability": "wechat_channels.users.search",
    "result_status": "empty",
    "fetched_at": "2026-10-29T09:50:40.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "username": "platform",
      "url": "platform",
      "created_at": "capability",
      "metrics": "capability"
    },
    "billing": { "amount": "0", "currency": "USD", "balance_after": "10" }
  }
}
```

### 400

按规范写的示例，不是录下的返回。

```json
{
  "code": "invalid_params",
  "request_id": "7699238c-700a-463b-bffd-8c060e082c13",
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
  "request_id": "a04b8a29-e128-4698-bef6-af6019fb7bc6",
  "message": "The balance is too low",
  "message_zh": "余额不足",
  "charged": false,
  "retry": "after_fix",
  "retry_after_seconds": null,
  "param": null,
  "required": "0.06",
  "available": "0",
  "top_up_url": "https://dataxapi.com/console/billing/?amount=10",
  "next_step": "The balance does not cover this call ($0.06). Top up at top_up_url: $10 at least, about 166 calls at this price; Alipay or a card, and the balance never expires. Then send the same request again, unchanged. Nothing was charged for this one.",
  "next_step_zh": "余额不够这次调用（$0.06）。到 top_up_url 充值：最低 $10，按这次的价格约够 166 次；支付宝、银行卡都能付，余额不过期。到账后把同一个请求原样再发一次。这次没有扣钱。",
  "docs_url": "https://dataxapi.com/docs/errors#insufficient_balance"
}
```

### 502

按规范写的示例，不是录下的返回。

```json
{
  "code": "upstream_failed",
  "request_id": "e0590fff-b421-4f38-9d62-c97c6e8d4393",
  "message": "No result came back this time and nothing was charged; retry shortly",
  "message_zh": "这次没有取到结果，没有扣费，可以稍后重试",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

这份录制的返回：平台原始 JSON 593 token，DataXAPI 的 JSON 387 token，AI 通过 DataXAPI 的 MCP 读到 191 token，少 68%（2026-11-06 统计）。

[这份示例的 JSON 文件](https://dataxapi.com/apis/wechat_channels/users/search.example.json)

## 在你的 AI 里用它

`dataxapi setup` 给这台电脑上的 AI 代理（Claude Code、Codex、Cursor）装好 DataXAPI 的 MCP 服务和基础技能。Key 从环境变量 DATAXAPI_API_KEY 读，不写进任何文件。

MCP 服务地址：`https://api.dataxapi.com/mcp`。你的客户端要填的配置在本页请求示例的“MCP”页签里；接好后让你的 AI 调用 `wechat_channels.users.search`。

或者把这段话贴给任意一个 AI：

> 读一下 https://dataxapi.com/zh/apis/wechat_channels/users/search.md，然后帮我用 DataXAPI 的接口 wechat_channels.users.search（微信视频号账号搜索）。

[在 ChatGPT 里打开](https://chatgpt.com/?q=%E8%AF%BB%E4%B8%80%E4%B8%8B%20https%3A%2F%2Fdataxapi.com%2Fzh%2Fapis%2Fwechat_channels%2Fusers%2Fsearch.md%EF%BC%8C%E7%84%B6%E5%90%8E%E5%B8%AE%E6%88%91%E7%94%A8%20DataXAPI%20%E7%9A%84%E6%8E%A5%E5%8F%A3%20wechat_channels.users.search%EF%BC%88%E5%BE%AE%E4%BF%A1%E8%A7%86%E9%A2%91%E5%8F%B7%E8%B4%A6%E5%8F%B7%E6%90%9C%E7%B4%A2%EF%BC%89%E3%80%82) · [在 Claude 里打开](https://claude.ai/new?q=%E8%AF%BB%E4%B8%80%E4%B8%8B%20https%3A%2F%2Fdataxapi.com%2Fzh%2Fapis%2Fwechat_channels%2Fusers%2Fsearch.md%EF%BC%8C%E7%84%B6%E5%90%8E%E5%B8%AE%E6%88%91%E7%94%A8%20DataXAPI%20%E7%9A%84%E6%8E%A5%E5%8F%A3%20wechat_channels.users.search%EF%BC%88%E5%BE%AE%E4%BF%A1%E8%A7%86%E9%A2%91%E5%8F%B7%E8%B4%A6%E5%8F%B7%E6%90%9C%E7%B4%A2%EF%BC%89%E3%80%82)

## 相关

这是 DataXAPI 社交媒体数据的一部分。同一把 Key 还能用：达人、广告、电商。

同一件事的其他平台：[抖音用户搜索](https://dataxapi.com/zh/apis/douyin/users/search/)、[快手用户搜索](https://dataxapi.com/zh/apis/kuaishou/users/search/)、[Instagram 用户搜索](https://dataxapi.com/zh/apis/instagram/users/search/)、[TikTok 用户搜索](https://dataxapi.com/zh/apis/tiktok/users/search/)、[微博用户搜索](https://dataxapi.com/zh/apis/weibo/users/search/)、[X 用户搜索](https://dataxapi.com/zh/apis/x/users/search/)、[小红书用户搜索](https://dataxapi.com/zh/apis/xiaohongshu/users/search/)、[YouTube 频道搜索](https://dataxapi.com/zh/apis/youtube/channels/search/)、[微信公众号实时查找](https://dataxapi.com/zh/apis/wechat/accounts/search/)、[微信公众号账号搜索](https://dataxapi.com/zh/apis/wechat_mp/accounts/search/)、[知乎用户搜索](https://dataxapi.com/zh/apis/zhihu/users/search/)

其他平台的社交媒体数据：[B站用户资料](https://dataxapi.com/zh/apis/bilibili/users/get/)、[抖音用户资料](https://dataxapi.com/zh/apis/douyin/users/get/)、[快手用户资料](https://dataxapi.com/zh/apis/kuaishou/users/get/)

微信视频号的接口：[微信视频号账号资料](https://dataxapi.com/zh/apis/wechat_channels/users/get/)、[微信视频号作品详情](https://dataxapi.com/zh/apis/wechat_channels/videos/get/)、[微信视频号作品评论](https://dataxapi.com/zh/apis/wechat_channels/videos/comments/list/)、[微信视频号作品分享链接](https://dataxapi.com/zh/apis/wechat_channels/videos/share_link/get/)、[微信视频号账号的合集](https://dataxapi.com/zh/apis/wechat_channels/users/collections/list/)、[微信视频号合集里的视频](https://dataxapi.com/zh/apis/wechat_channels/collections/videos/list/)、[微信视频号用户作品](https://dataxapi.com/zh/apis/wechat_channels/users/videos/list/)、[微信搜一搜视频号视频搜索](https://dataxapi.com/zh/apis/wechat_channels/videos/search/)、[微信视频号账号资料（备用版）](https://dataxapi.com/zh/apis/wechat_channels/backup/users/get/)、[微信视频号用户作品（备用版）](https://dataxapi.com/zh/apis/wechat_channels/backup/users/videos/list/)、[微信搜一搜视频号视频搜索（备用版）](https://dataxapi.com/zh/apis/wechat_channels/backup/videos/search/)、[微信视频号账号搜索](https://dataxapi.com/zh/apis/wechat_channels/users/search/)、[微信视频号作品互动数据](https://dataxapi.com/zh/apis/wechat_channels/videos/metrics/)、[微信视频号评论回复](https://dataxapi.com/zh/apis/wechat_channels/comments/replies/list/)、[微信视频号直播回放](https://dataxapi.com/zh/apis/wechat_channels/users/live_replays/list/)、[视频号视频下载（文件地址和解密）](https://dataxapi.com/zh/apis/wechat_channels/videos/media/get/)、[视频号视频转文字（逐字稿）](https://dataxapi.com/zh/apis/wechat_channels/videos/transcript/get/)

怎么做和常见问题：[视频号有 API 吗？用 Python 取账号作品和评论（2026）](https://dataxapi.com/zh/guides/wechat-channels-api-python/)、[微信数据接口有哪些？公众号、视频号、搜一搜能取什么（2026）](https://dataxapi.com/zh/answers/wechat-data-apis/)、[视频号账号全部作品怎么导出（2026）](https://dataxapi.com/zh/answers/export-wechat-channels-account-videos/)、[视频号数据怎么导出（2026）](https://dataxapi.com/zh/answers/export-wechat-channels-data/)、[微信视频号评论可以导出吗（2026）](https://dataxapi.com/zh/answers/export-wechat-channels-comments/)、[公众号关联的视频号怎么查？同一家的公众号和视频号一起盯（2026）](https://dataxapi.com/zh/answers/wechat-official-account-linked-channels/)、[视频号数据怎么采集？视频号助手、搜一搜、数据接口怎么选（2026）](https://dataxapi.com/zh/answers/how-to-collect-wechat-channels-data/)

用到这个接口的 Skills：[找号与达人筛选](https://dataxapi.com/zh/skills/creators/)

相关：[微信视频号的全部接口](https://dataxapi.com/zh/apis/wechat_channels/)、[社交媒体数据](https://dataxapi.com/zh/categories/social/)、[这件事在 12 个平台上的对照](https://dataxapi.com/zh/roles/accounts-search/)、[账号对象的字段](https://dataxapi.com/zh/docs/objects/account/)

## 常见问题

### 微信视频号账号搜索 API 多少钱？

$0.0600 一次。单次最高扣费 $0.0600。

### 什么情况下不收费？

出错和超时不收费。

### 一次返回多少条？怎么翻页？

每页约 1 条，最多 20 条。每页条数由平台决定，不收 limit。一次给全，不发游标。

---

最后核对于 2026-11-28 06:28 UTC。目录修订号 ceced48b38f71468。 [网页版](https://dataxapi.com/zh/apis/wechat_channels/users/search/)
