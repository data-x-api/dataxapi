# 微信公众号账号搜索 API

按名字或关键词找公众号，最像的排前面：原始编号、微信号、名称、头像、主体名称，和第三方数据库的预估活跃粉丝、头条平均阅读和点赞、每周发文数（估计值，非官方，可能滞后数月）。按条计费，limit 定条数（默认 5，最多 15）。只要编号不要估计值，用按次计费的 wechat.accounts.search 更省。每次约 5 条，最多 15 条；每返回一条 $0.05635，每次最少 $0.0600、最多 $0.84525。出错和超时不收费。

- 地址：`GET https://api.dataxapi.com/v1/wechat_mp/accounts/search`
- 编号：`wechat_mp.accounts.search`
- 也叫：搜公众号、找公众号、公众号名字查原始ID、公众号粉丝数、公众号有多少粉丝、公众号搜索 API
- 价格：$0.05635 / 条
- 当前状态不写在这一页上（页面是快照），实时读：`GET https://api.dataxapi.com/v1/catalog/status`
- 返回：每页最多 15 条, 一次给全，不翻页
- 返回标准的账号结构，各平台相同
- [在 Playground 里跑一次](https://dataxapi.com/zh/console/playground/?capability=wechat_mp.accounts.search&params=%7B%22query%22%3A%22%E5%92%96%E5%95%A1%22%7D)
- 英文名：[WeChat Official Account name search API](https://dataxapi.com/apis/wechat_mp/accounts/search/)

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `query` | 文本 | 是 | 公众号名称或关键词。示例：`咖啡`。 |
| `limit` | 整数 |  | 每页条数。每页条数，1 到 15。 |
| `view` | 文本 |  | 返回档位。三档价格相同。取值：`compact`、`standard`（默认）、`full`。 |
| `fields` | 文本列表 |  | 只要这些字段。按路径写，例如 `author.name`。 |

## 返回字段

`data.items` 是账号对象的列表。稳定：字段只增不改。

返回分三档：精简 `compact`（最常用的字段，长文本截短）、标准 `standard`（默认，全部标准字段）、完整 `full`（再加 `ext`，也就是这个平台特有的字段）。字段从表里写的那一档起出现，更大的档位也带。

| 字段 | 类型 | 说明 | 起始档位 | 这个接口 |
| --- | --- | --- | --- | --- |
| `id` | 文本 | 编号。 | `compact` | 有 |
| `username` | 文本 | 账号名。在这个平台上：微信号：在微信里搜索添加时输入的那个；没设的为 null。 | `compact` | 有 |
| `name` | 文本 | 显示名。 | `compact` | 有 |
| `url` | 链接 | 主页链接。 | `compact` | 平台没有 |
| `bio` | 文本 | 简介。长文本：精简档只保留前 500 个字符，并在 `warnings` 里写明。 | `compact` | 这个接口不提供 |
| `avatar_url` | 链接 | 头像。 | `standard` | 有 |
| `verified` | 是否 | 是否认证。 | `standard` | 这个接口不提供 |
| `created_at` | 时间 | 账号创建时间。 | `standard` | 这个接口不提供 |
| `metrics` | 对象 | 账号的数字。 | `compact` | 平台没有 |
| `metrics.followers` | 整数 | 粉丝数。 | `compact` | 平台没有 |
| `metrics.following` | 整数 | 关注数。 | `compact` | 平台没有 |
| `metrics.posts` | 整数 | 发布的内容数。 | `compact` | 平台没有 |
| `ext.biz` | 文本 | 公众号的 __biz：它的文章链接里 __biz= 后面那一段。 | `full` | 有 |
| `ext.owner_name` | 文本 | 账号主体的名称（公司、机构）；个人账号和没登记的为 null。 | `full` | 有 |
| `ext.estimated_followers` | 整数 | 预估活跃粉丝数：第三方数据库按文章阅读等推算的估计值，不是平台公布的粉丝数（平台不公开粉丝数），可能滞后数周到数月。 | `full` | 有 |
| `ext.estimated_headline_reads` | 整数 | 预估头条文章平均阅读数：第三方数据库的估计值，可能滞后。 | `full` | 有 |
| `ext.estimated_headline_likes` | 整数 | 预估头条文章平均点赞数：第三方数据库的估计值，可能滞后。 | `full` | 有 |
| `ext.estimated_weekly_articles` | 整数 | 预估每周发文数：第三方数据库记的数，可能滞后。 | `full` | 有 |
| `ext.estimated_last_published_at` | 时间 | 第三方数据库记的最近一次发文时间；数据库没跟上时会比真实的早。 | `full` | 有 |
| `approximate` | 对象列表 | 这一条里哪些数是约数或下限；都是准确值时不出现。 | `compact` | 有 |
| `approximate[].field` | 文本 | 字段的路径，如 metrics.views。 | `compact` | 有 |
| `approximate[].kind` | 文本 | 约数，还是下限。取值：`approximate`、`lower_bound`。 | `compact` | 有 |

某一条本来就没有这个值时，字段给 `null`。这个接口给不了的字段不出现，统一列在 `meta.unavailable`。

每条数据的典型体积：`compact` 67 B、`standard` 174 B、`full` 423 B（按 2026-10-29 09:47 UTC 录下的那次返回量的）。

## 翻页

每页约 5 条，最多 15 条。可以用 `limit` 调。

一次给全，不发游标。

## 什么时候收费

| 情况 | 收费 |
| --- | --- |
| 返回了数据 | 每条有效数据 $0.05635，每次最少 $0.0600 |
| 参数不合法、出错、超时 | 不收费 |
| 单次最高扣费 | $0.84525 (带 `X-Max-Price` 可以设自己的上限，超过就不执行) |

价格读取于 2026-11-26 12:17 UTC，按价目版本 22，2026-11-25 13:46 UTC 起生效；在 Playground 里运行前会再读一次当前价格。

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
curl -G "https://api.dataxapi.com/v1/wechat_mp/accounts/search" \
  --data-urlencode "query=咖啡" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
# pip install dataxapi
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.wechat_mp.accounts.search(query="咖啡")
print(result["data"]["items"])
```

### TypeScript

```typescript
// npm i @dataxapi/sdk
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.wechat_mp.accounts.search({ query: "咖啡" });
console.log(result.data.items);
```

### 命令行

```bash
dataxapi call wechat_mp.accounts.search 'query=咖啡'
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

把这段加进你的 MCP 客户端，然后让你的 AI 调用 `wechat_mp.accounts.search`。

## 返回

### 200

取自 2026-10-29 09:47 UTC 录下的真实返回。名字、正文和编号是示例，链接也是，都不是录到的原文（页面不展示任何人的个人信息）；数字是原样。长列表做了截断。请求号、游标和余额是示意。

返回大小：标准档 1.0 KB（精简 715 B，完整 1.7 KB）。

```jsonc
{
  "code": "ok",
  "request_id": "6a0decec-3648-4ce7-ae73-2a1d2bd7fad5",
  "data": {
    "items": [
      {
        "id": "gh_5f2e34769fdc",
        "username": "aya_living",
        "name": "认真生活的阿雅",
        "avatar_url": "https://wx.qlogo.cn/mmhead/LO7unl2CpHGnNeCMRIFsNNLZ2CsNrwgfzOG5J5d3/132"
      },
      // … 另有 2 条
    ]
  },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 3
  },
  "warnings": [],
  "meta": {
    "capability": "wechat_mp.accounts.search",
    "result_status": "complete",
    "fetched_at": "2026-10-29T09:47:33.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "url": "platform",
      "bio": "capability",
      "verified": "capability",
      "created_at": "capability",
      "metrics": "platform"
    },
    "billing": {
      "amount": "0.16905",
      "currency": "USD",
      "balance_after": "9.83095"
    }
  }
}
```

### 空结果

取自 2026-10-29 09:47 UTC 的录制，为演示这种情况人工改过。请求号和余额是示意。

返回大小：标准档 514 B（精简 514 B，完整 514 B）。

```jsonc
{
  "code": "ok",
  "request_id": "f5225d6d-edcf-4b7b-813a-c9be62ac4f31",
  "data": { "items": [] },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 0
  },
  "warnings": [],
  "meta": {
    "capability": "wechat_mp.accounts.search",
    "result_status": "empty",
    "fetched_at": "2026-10-29T09:47:33.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "url": "platform",
      "bio": "capability",
      "verified": "capability",
      "created_at": "capability",
      "metrics": "platform"
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
  "request_id": "6c25ec6d-a1f6-4579-af75-09577e14374c",
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
  "request_id": "00bd19a2-27d3-4a21-9e7a-ca9b0ebb5374",
  "message": "The balance is too low",
  "message_zh": "余额不足",
  "charged": false,
  "retry": "after_fix",
  "retry_after_seconds": null,
  "param": null,
  "required": "0.84525",
  "available": "0",
  "top_up_url": "https://dataxapi.com/console/billing/?amount=10",
  "next_step": "The balance does not cover this call ($0.84525). Top up at top_up_url: $10 at least, about 11 calls at this price; Alipay or a card, and the balance never expires. Then send the same request again, unchanged. Nothing was charged for this one.",
  "next_step_zh": "余额不够这次调用（$0.84525）。到 top_up_url 充值：最低 $10，按这次的价格约够 11 次；支付宝、银行卡都能付，余额不过期。到账后把同一个请求原样再发一次。这次没有扣钱。",
  "docs_url": "https://dataxapi.com/docs/errors#insufficient_balance"
}
```

### 502

按规范写的示例，不是录下的返回。

```json
{
  "code": "upstream_failed",
  "request_id": "0dd34c81-b40e-4cad-baeb-1a0bb6901dbb",
  "message": "No result came back this time and nothing was charged; retry shortly",
  "message_zh": "这次没有取到结果，没有扣费，可以稍后重试",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

这份录制的返回：平台原始 JSON 509 token，DataXAPI 的 JSON 390 token，AI 通过 DataXAPI 的 MCP 读到 142 token，少 72%（2026-11-06 统计）。

[这份示例的 JSON 文件](https://dataxapi.com/apis/wechat_mp/accounts/search.example.json)

## 在你的 AI 里用它

`dataxapi setup` 给这台电脑上的 AI 代理（Claude Code、Codex、Cursor）装好 DataXAPI 的 MCP 服务和基础技能。Key 从环境变量 DATAXAPI_API_KEY 读，不写进任何文件。

MCP 服务地址：`https://api.dataxapi.com/mcp`。你的客户端要填的配置在本页请求示例的“MCP”页签里；接好后让你的 AI 调用 `wechat_mp.accounts.search`。

或者把这段话贴给任意一个 AI：

> 读一下 https://dataxapi.com/zh/apis/wechat_mp/accounts/search.md，然后帮我用 DataXAPI 的接口 wechat_mp.accounts.search（微信公众号账号搜索）。

[在 ChatGPT 里打开](https://chatgpt.com/?q=%E8%AF%BB%E4%B8%80%E4%B8%8B%20https%3A%2F%2Fdataxapi.com%2Fzh%2Fapis%2Fwechat_mp%2Faccounts%2Fsearch.md%EF%BC%8C%E7%84%B6%E5%90%8E%E5%B8%AE%E6%88%91%E7%94%A8%20DataXAPI%20%E7%9A%84%E6%8E%A5%E5%8F%A3%20wechat_mp.accounts.search%EF%BC%88%E5%BE%AE%E4%BF%A1%E5%85%AC%E4%BC%97%E5%8F%B7%E8%B4%A6%E5%8F%B7%E6%90%9C%E7%B4%A2%EF%BC%89%E3%80%82) · [在 Claude 里打开](https://claude.ai/new?q=%E8%AF%BB%E4%B8%80%E4%B8%8B%20https%3A%2F%2Fdataxapi.com%2Fzh%2Fapis%2Fwechat_mp%2Faccounts%2Fsearch.md%EF%BC%8C%E7%84%B6%E5%90%8E%E5%B8%AE%E6%88%91%E7%94%A8%20DataXAPI%20%E7%9A%84%E6%8E%A5%E5%8F%A3%20wechat_mp.accounts.search%EF%BC%88%E5%BE%AE%E4%BF%A1%E5%85%AC%E4%BC%97%E5%8F%B7%E8%B4%A6%E5%8F%B7%E6%90%9C%E7%B4%A2%EF%BC%89%E3%80%82)

## 相关

这是 DataXAPI 社交媒体数据的一部分。同一把 Key 还能用：达人、广告、电商。

同一件事的其他平台：[抖音用户搜索](https://dataxapi.com/zh/apis/douyin/users/search/)、[快手用户搜索](https://dataxapi.com/zh/apis/kuaishou/users/search/)、[Instagram 用户搜索](https://dataxapi.com/zh/apis/instagram/users/search/)、[TikTok 用户搜索](https://dataxapi.com/zh/apis/tiktok/users/search/)、[微博用户搜索](https://dataxapi.com/zh/apis/weibo/users/search/)、[X 用户搜索](https://dataxapi.com/zh/apis/x/users/search/)、[小红书用户搜索](https://dataxapi.com/zh/apis/xiaohongshu/users/search/)、[YouTube 频道搜索](https://dataxapi.com/zh/apis/youtube/channels/search/)、[微信公众号实时查找](https://dataxapi.com/zh/apis/wechat/accounts/search/)、[微信视频号账号搜索](https://dataxapi.com/zh/apis/wechat_channels/users/search/)、[知乎用户搜索](https://dataxapi.com/zh/apis/zhihu/users/search/)

其他平台的社交媒体数据：[B站用户资料](https://dataxapi.com/zh/apis/bilibili/users/get/)、[抖音用户资料](https://dataxapi.com/zh/apis/douyin/users/get/)、[快手用户资料](https://dataxapi.com/zh/apis/kuaishou/users/get/)、[Telegram 频道资料](https://dataxapi.com/zh/apis/telegram/channels/get/)、[Facebook 主页资料](https://dataxapi.com/zh/apis/facebook/pages/get/)、[LinkedIn 公司主页](https://dataxapi.com/zh/apis/linkedin/companies/get/)、[Threads 用户资料](https://dataxapi.com/zh/apis/threads/users/get/)、[Instagram 用户资料](https://dataxapi.com/zh/apis/instagram/users/get/)、[TikTok 用户资料](https://dataxapi.com/zh/apis/tiktok/users/get/)、[微博点赞用户](https://dataxapi.com/zh/apis/weibo/posts/likers/list/)、[微博用户粉丝列表](https://dataxapi.com/zh/apis/weibo/users/followers/list/)、[微博用户资料](https://dataxapi.com/zh/apis/weibo/users/get/)

微信公众号的接口：[微信公众号文章列表](https://dataxapi.com/zh/apis/wechat_mp/accounts/articles/list/)、[微信公众号资料](https://dataxapi.com/zh/apis/wechat_mp/accounts/get/)、[微信公众号文章评论](https://dataxapi.com/zh/apis/wechat_mp/articles/comments/list/)、[微信公众号文章详情](https://dataxapi.com/zh/apis/wechat_mp/articles/get/)、[微信公众号文章互动数据](https://dataxapi.com/zh/apis/wechat_mp/articles/metrics/)、[微信公众号评论回复](https://dataxapi.com/zh/apis/wechat_mp/comments/replies/list/)、[微信公众号账号搜索](https://dataxapi.com/zh/apis/wechat_mp/accounts/search/)、[微信公众号主体信息](https://dataxapi.com/zh/apis/wechat_mp/accounts/owner/get/)

怎么做和常见问题：[微信数据接口有哪些？公众号、视频号、搜一搜能取什么（2026）](https://dataxapi.com/zh/answers/wechat-data-apis/)、[公众号数据 API 有哪些？历史文章、全文、阅读数、评论都能取吗（2026）](https://dataxapi.com/zh/answers/wechat-official-account-data-apis/)、[如何查看某个行业的公众号爆款文章（2026）](https://dataxapi.com/zh/answers/wechat-official-account-hit-articles-by-industry/)、[给 AI 和 agent 用的公众号数据接口：返回省 token、Claude 和 Cursor 直接调（2026）](https://dataxapi.com/zh/answers/wechat-official-account-api-for-ai-agents/)、[公众号粉丝数能查到吗？怎么拿到估计的活跃粉丝、头条平均阅读和发文频率（2026）](https://dataxapi.com/zh/answers/wechat-official-account-follower-count/)

用到这个接口的 Skills：[找号与达人筛选](https://dataxapi.com/zh/skills/creators/)

相关：[微信公众号的全部接口](https://dataxapi.com/zh/apis/wechat_mp/)、[社交媒体数据](https://dataxapi.com/zh/categories/social/)、[这件事在 12 个平台上的对照](https://dataxapi.com/zh/roles/accounts-search/)、[账号对象的字段](https://dataxapi.com/zh/docs/objects/account/)

## 常见问题

### 微信公众号账号搜索 API 多少钱？

每返回一条 $0.05635，每次最少 $0.0600、最多 $0.84525。单次最高扣费 $0.84525。

### 什么情况下不收费？

出错和超时不收费。

### 一次返回多少条？怎么翻页？

每页约 5 条，最多 15 条。可以用 limit 调。一次给全，不发游标。

---

最后核对于 2026-11-26 12:17 UTC。目录修订号 0051cce45e9530b9。 [网页版](https://dataxapi.com/zh/apis/wechat_mp/accounts/search/)
