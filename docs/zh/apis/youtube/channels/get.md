# YouTube 频道资料 API

按频道编号或账号名取 YouTube 频道资料：名称、简介、订阅数、视频数、总播放数、是否认证、创建日期，“关于”里列的链接（官网、其他社交账号）和频道关键词。每次取一个对象；$0.0020 一次。出错、超时、对象不存在都不收费。

- 地址：`GET https://api.dataxapi.com/v1/youtube/channels/get`
- 编号：`youtube.channels.get`
- 也叫：油管频道、频道信息、订阅数
- 价格：$0.0020 / 次
- 当前状态不写在这一页上（页面是快照），实时读：`GET https://api.dataxapi.com/v1/catalog/status`
- 返回：1 个对象, 一个账号对象
- 返回标准的账号结构，各平台相同
- [在 Playground 里跑一次](https://dataxapi.com/zh/console/playground/?capability=youtube.channels.get&params=%7B%22id%22%3A%22UC_x5XG1OV2P6uZZ5FSM9Ttw%22%7D)
- 英文名：[YouTube channel profile API](https://dataxapi.com/apis/youtube/channels/get/)

## 能拿到什么

2026-10-12 18:49 UTC 录下的真实返回，这里是前 4 行。

| 字段 | 值 |
| --- | --- |
| verified | true |
| created_at | 2008-06-03 |
| metrics.followers | 15,100,000 |
| metrics.posts | 6,187 |

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | 文本 | `id`、`username` 里给且只给一个 | 频道编号，UC 开头。示例：`UC_x5XG1OV2P6uZZ5FSM9Ttw`。 |
| `username` | 文本 | `id`、`username` 里给且只给一个 | 频道的账号名，不带 @。示例：`NASA`。 |
| `view` | 文本 |  | 返回档位。三档价格相同。取值：`compact`、`standard`（默认）、`full`。 |
| `fields` | 文本列表 |  | 只要这些字段。按路径写，例如 `author.name`。 |

## 返回字段

`data.item` 是一个账号对象。稳定：字段只增不改。

返回分三档：精简 `compact`（最常用的字段，长文本截短）、标准 `standard`（默认，全部标准字段）、完整 `full`（再加 `ext`，也就是这个平台特有的字段）。字段从表里写的那一档起出现，更大的档位也带。

| 字段 | 类型 | 说明 | 起始档位 | 这个接口 |
| --- | --- | --- | --- | --- |
| `id` | 文本 | 编号。 | `compact` | 有 |
| `username` | 文本 | 账号名。 | `compact` | 有 |
| `name` | 文本 | 显示名。 | `compact` | 有 |
| `url` | 链接 | 主页链接。 | `compact` | 有 |
| `bio` | 文本 | 简介。长文本：精简档只保留前 500 个字符，并在 `warnings` 里写明。 | `compact` | 有 |
| `avatar_url` | 链接 | 头像。 | `standard` | 有 |
| `verified` | 是否 | 是否认证。 | `standard` | 有 |
| `created_at` | 时间 | 账号创建时间。 | `standard` | 有 |
| `metrics` | 对象 | 账号的数字。 | `compact` | 有 |
| `metrics.followers` | 整数 | 粉丝数。在这个平台上：订阅数，平台只显示三位有效数字。 | `compact` | 有 |
| `metrics.following` | 整数 | 关注数。 | `compact` | 平台没有 |
| `metrics.posts` | 整数 | 发布的内容数。在这个平台上：视频数。 | `compact` | 有 |
| `ext.views` | 整数 | 频道全部视频的总播放数。 | `full` | 有 |
| `ext.links` | 链接列表 | 频道“关于”里列出的链接（官网、其他社交账号等），按页面上的顺序；没有为空列表。 | `full` | 有 |
| `ext.keywords` | 文本列表 | 频道给自己设的关键词，页面上不显示；没有为空列表。 | `full` | 有 |
| `approximate` | 对象列表 | 这一条里哪些数是约数或下限；都是准确值时不出现。 | `compact` | 有 |
| `approximate[].field` | 文本 | 字段的路径，如 metrics.views。 | `compact` | 有 |
| `approximate[].kind` | 文本 | 约数，还是下限。取值：`approximate`、`lower_bound`。 | `compact` | 有 |

某一条本来就没有这个值时，字段给 `null`。这个接口给不了的字段不出现，统一列在 `meta.unavailable`。

每条数据的典型体积：`compact` 628 B、`standard` 834 B、`full` 1.3 KB（按 2026-10-12 18:49 UTC 录下的那次返回量的）。

## 翻页

每次取一个对象，不翻页。

## 什么时候收费

| 情况 | 收费 |
| --- | --- |
| 返回了数据 | $0.0020，每次调用收一次 |
| 对象不存在（404） | 不收费 |
| 参数不合法、出错、超时 | 不收费 |
| 单次最高扣费 | $0.0020 (带 `X-Max-Price` 可以设自己的上限，超过就不执行) |

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
curl -G "https://api.dataxapi.com/v1/youtube/channels/get" \
  --data-urlencode "id=UC_x5XG1OV2P6uZZ5FSM9Ttw" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
# pip install dataxapi
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.youtube.channels.get(id="UC_x5XG1OV2P6uZZ5FSM9Ttw")
print(result["data"]["item"])
```

### TypeScript

```typescript
// npm i @dataxapi/sdk
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.youtube.channels.get({ id: "UC_x5XG1OV2P6uZZ5FSM9Ttw" });
console.log(result.data.item);
```

### 命令行

```bash
dataxapi call youtube.channels.get id=UC_x5XG1OV2P6uZZ5FSM9Ttw
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

把这段加进你的 MCP 客户端，然后让你的 AI 调用 `youtube.channels.get`。

## 返回

### 200

取自 2026-10-12 18:49 UTC 录下的真实返回。名字、正文和编号是示例，链接也是，都不是录到的原文（页面不展示任何人的个人信息）；数字是原样。长列表做了截断。请求号、游标和余额是示意。

返回大小：标准档 1.2 KB（精简 976 B，完整 1.6 KB）。

```jsonc
{
  "code": "ok",
  "request_id": "0d2e3cd6-57be-429d-b9b3-3b72ebe36f24",
  "data": {
    "item": {
      "id": "UC5dUJCSQsru60jC9GHUAqQO",
      "username": "fieldnotes_studio",
      "name": "Field Notes Studio",
      "url": "https://www.youtube.com/channel/UC5dUJCSQsru60jC9GHUAqQO",
      "bio": "Making things and sharing the process.",
      "avatar_url": "https://yt3.ggpht.com/gJg_Y9LQdWAqTy2hKjaxT2M_tr0D5rxdZ1NJ0RbY=s88-c-k-c0x00ffffff-no-rj",
      "verified": true,
      "created_at": "2008-06-03T00:00:00.000Z",
      "metrics": { "followers": 15100000, "posts": 6187 },
      "approximate": [
        { "field": "metrics.followers", "kind": "approximate" }
      ]
    }
  },
  "warnings": [],
  "meta": {
    "capability": "youtube.channels.get",
    "result_status": "complete",
    "fetched_at": "2026-10-12T18:49:49.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": { "metrics.following": "platform" },
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
  "request_id": "f9fa8b10-1ba3-4901-92b5-071e0e1306a8",
  "message": "A parameter is invalid",
  "message_zh": "参数不合法",
  "charged": false,
  "retry": "after_fix",
  "retry_after_seconds": null,
  "param": null,
  "problems": ["give exactly one of id, username"],
  "docs_url": "https://dataxapi.com/docs/errors#invalid_params"
}
```

### 402

按规范写的示例，不是录下的返回。

```json
{
  "code": "insufficient_balance",
  "request_id": "63886355-d44a-4653-a130-84ea4dca463d",
  "message": "The balance is too low",
  "message_zh": "余额不足",
  "charged": false,
  "retry": "after_fix",
  "retry_after_seconds": null,
  "param": null,
  "required": "0.002",
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
  "request_id": "6c979882-2f7f-4493-a590-f0422a08a18d",
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
  "request_id": "d90e82df-dcb5-42c1-830b-a379626413c1",
  "message": "No result came back this time and nothing was charged; retry shortly",
  "message_zh": "这次没有取到结果，没有扣费，可以稍后重试",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

这份录制的返回：平台原始 JSON 1,140 token，DataXAPI 的 JSON 360 token，AI 通过 DataXAPI 的 MCP 读到 214 token，少 81%（2026-11-06 统计）。

[这份示例的 JSON 文件](https://dataxapi.com/apis/youtube/channels/get.example.json)

## 在你的 AI 里用它

`dataxapi setup` 给这台电脑上的 AI 代理（Claude Code、Codex、Cursor）装好 DataXAPI 的 MCP 服务和基础技能。Key 从环境变量 DATAXAPI_API_KEY 读，不写进任何文件。

MCP 服务地址：`https://api.dataxapi.com/mcp`。你的客户端要填的配置在本页请求示例的“MCP”页签里；接好后让你的 AI 调用 `youtube.channels.get`。

或者把这段话贴给任意一个 AI：

> 读一下 https://dataxapi.com/zh/apis/youtube/channels/get.md，然后帮我用 DataXAPI 的接口 youtube.channels.get（YouTube 频道资料）。

[在 ChatGPT 里打开](https://chatgpt.com/?q=%E8%AF%BB%E4%B8%80%E4%B8%8B%20https%3A%2F%2Fdataxapi.com%2Fzh%2Fapis%2Fyoutube%2Fchannels%2Fget.md%EF%BC%8C%E7%84%B6%E5%90%8E%E5%B8%AE%E6%88%91%E7%94%A8%20DataXAPI%20%E7%9A%84%E6%8E%A5%E5%8F%A3%20youtube.channels.get%EF%BC%88YouTube%20%E9%A2%91%E9%81%93%E8%B5%84%E6%96%99%EF%BC%89%E3%80%82) · [在 Claude 里打开](https://claude.ai/new?q=%E8%AF%BB%E4%B8%80%E4%B8%8B%20https%3A%2F%2Fdataxapi.com%2Fzh%2Fapis%2Fyoutube%2Fchannels%2Fget.md%EF%BC%8C%E7%84%B6%E5%90%8E%E5%B8%AE%E6%88%91%E7%94%A8%20DataXAPI%20%E7%9A%84%E6%8E%A5%E5%8F%A3%20youtube.channels.get%EF%BC%88YouTube%20%E9%A2%91%E9%81%93%E8%B5%84%E6%96%99%EF%BC%89%E3%80%82)

## 相关

这是 DataXAPI 社交媒体数据的一部分。同一把 Key 还能用：达人、广告、电商。

同一件事的其他平台：[B站用户资料](https://dataxapi.com/zh/apis/bilibili/users/get/)、[抖音用户资料](https://dataxapi.com/zh/apis/douyin/users/get/)、[快手用户资料](https://dataxapi.com/zh/apis/kuaishou/users/get/)、[Telegram 频道资料](https://dataxapi.com/zh/apis/telegram/channels/get/)、[Facebook 主页资料](https://dataxapi.com/zh/apis/facebook/pages/get/)、[LinkedIn 公司主页](https://dataxapi.com/zh/apis/linkedin/companies/get/)、[Threads 用户资料](https://dataxapi.com/zh/apis/threads/users/get/)、[Instagram 用户资料](https://dataxapi.com/zh/apis/instagram/users/get/)、[TikTok 用户资料](https://dataxapi.com/zh/apis/tiktok/users/get/)、[微博用户资料](https://dataxapi.com/zh/apis/weibo/users/get/)、[X 用户资料](https://dataxapi.com/zh/apis/x/users/get/)、[小红书用户资料](https://dataxapi.com/zh/apis/xiaohongshu/users/get/)、[微信视频号账号资料](https://dataxapi.com/zh/apis/wechat_channels/users/get/)、[微信公众号资料](https://dataxapi.com/zh/apis/wechat_mp/accounts/get/)、[微信视频号账号资料（备用版）](https://dataxapi.com/zh/apis/wechat_channels/backup/users/get/)、[Reddit 用户资料](https://dataxapi.com/zh/apis/reddit/users/get/)、[知乎用户资料](https://dataxapi.com/zh/apis/zhihu/users/get/)

其他平台的社交媒体数据：[抖音用户搜索](https://dataxapi.com/zh/apis/douyin/users/search/)、[快手用户搜索](https://dataxapi.com/zh/apis/kuaishou/users/search/)、[Instagram 用户搜索](https://dataxapi.com/zh/apis/instagram/users/search/)、[TikTok 用户搜索](https://dataxapi.com/zh/apis/tiktok/users/search/)

YouTube的接口：[YouTube 频道资料](https://dataxapi.com/zh/apis/youtube/channels/get/)、[YouTube 频道搜索](https://dataxapi.com/zh/apis/youtube/channels/search/)、[YouTube 频道视频](https://dataxapi.com/zh/apis/youtube/channels/videos/list/)、[YouTube 评论回复](https://dataxapi.com/zh/apis/youtube/comments/replies/list/)、[YouTube 视频评论](https://dataxapi.com/zh/apis/youtube/videos/comments/list/)、[YouTube 视频详情](https://dataxapi.com/zh/apis/youtube/videos/get/)、[YouTube 视频搜索](https://dataxapi.com/zh/apis/youtube/videos/search/)、[YouTube 视频字幕](https://dataxapi.com/zh/apis/youtube/videos/transcript/get/)、[YouTube 频道帖子](https://dataxapi.com/zh/apis/youtube/channels/posts/list/)、[YouTube 帖子详情](https://dataxapi.com/zh/apis/youtube/posts/get/)

用到这个接口的 Skills：[账号体检](https://dataxapi.com/zh/skills/account-audit/)

相关：[YouTube的全部接口](https://dataxapi.com/zh/apis/youtube/)、[社交媒体数据](https://dataxapi.com/zh/categories/social/)、[这件事在 17 个平台上的对照](https://dataxapi.com/zh/roles/accounts-get/)、[账号对象的字段](https://dataxapi.com/zh/docs/objects/account/)

## 常见问题

### YouTube 频道资料 API 多少钱？

$0.0020 一次。单次最高扣费 $0.0020。

### 什么情况下不收费？

出错、超时、对象不存在都不收费。

### 对象不存在会怎样？

返回 404 not_found，不收费。reason 写明是哪一种：not_found（不存在）或 private_or_deleted（私密或已删除）。

---

最后核对于 2026-11-20 07:17 UTC。目录修订号 720fc3ea8dadb865。 [网页版](https://dataxapi.com/zh/apis/youtube/channels/get/)
