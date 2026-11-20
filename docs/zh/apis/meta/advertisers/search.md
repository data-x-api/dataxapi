# Meta 广告主搜索 API

按名称在 Meta 广告库里找广告主（Facebook 主页）：编号、名称、头像、类别、主页点赞数、关联的 Instagram 账号。拿到的编号用来取这个广告主的广告。每次最多 15 条；$0.0020 一次。出错和超时不收费。

- 地址：`GET https://api.dataxapi.com/v1/meta/advertisers/search`
- 编号：`meta.advertisers.search`
- 也叫：搜 Facebook 广告主、查品牌的广告主编号、脸书广告主
- 价格：$0.0020 / 次
- 当前状态不写在这一页上（页面是快照），实时读：`GET https://api.dataxapi.com/v1/catalog/status`
- 返回：每页 15 条, 一次给全，不翻页
- 返回广告主，预览结构，以后可能调整
- [在 Playground 里跑一次](https://dataxapi.com/zh/console/playground/?capability=meta.advertisers.search&params=%7B%22query%22%3A%22puma%22%7D)
- 英文名：[Meta advertiser search API](https://dataxapi.com/apis/meta/advertisers/search/)

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `query` | 文本 | 是 | 广告主或品牌的名称。示例：`puma`。 |
| `view` | 文本 |  | 返回档位。三档价格相同。取值：`compact`、`standard`（默认）、`full`。 |
| `fields` | 文本列表 |  | 只要这些字段。按路径写，例如 `author.name`。 |

## 返回字段

`data.items` 是广告主对象的列表。预览：结构可能调整，改之前会公告。

返回分三档：精简 `compact`（最常用的字段，长文本截短）、标准 `standard`（默认，全部标准字段）、完整 `full`（再加 `ext`，也就是这个平台特有的字段）。字段从表里写的那一档起出现，更大的档位也带。

| 字段 | 类型 | 说明 | 起始档位 | 这个接口 |
| --- | --- | --- | --- | --- |
| `id` | 文本 | 编号，可原样传给“广告主的广告”接口。 | `compact` | 有 |
| `name` | 文本 | 名称。 | `compact` | 有 |
| `avatar_url` | 链接 | 头像或标志。 | `standard` | 有 |
| `region` | 文本 | 广告主登记的国家或地区代码。 | `compact` | 这个接口不提供 |
| `ext.username` | 文本 | Facebook 主页的账号名。 | `full` | 有 |
| `ext.verified` | 是否 | 主页是否有蓝标认证。 | `full` | 有 |
| `ext.category` | 文本 | 主页的类别，按平台显示的原文。 | `full` | 有 |
| `ext.likes` | 整数 | 给主页点赞的人数。 | `full` | 有 |
| `ext.instagram_username` | 文本 | 关联的 Instagram 账号名；没有关联则为 null。 | `full` | 有 |
| `ext.instagram_followers` | 整数 | 关联的 Instagram 账号的粉丝数。 | `full` | 有 |
| `approximate` | 对象列表 | 这一条里哪些数是约数或下限；都是准确值时不出现。 | `compact` | 有 |
| `approximate[].field` | 文本 | 字段的路径，如 metrics.views。 | `compact` | 有 |
| `approximate[].kind` | 文本 | 约数，还是下限。取值：`approximate`、`lower_bound`。 | `compact` | 有 |

某一条本来就没有这个值时，字段给 `null`。这个接口给不了的字段不出现，统一列在 `meta.unavailable`。

每条数据的典型体积：`compact` 46 B、`standard` 476 B、`full` 631 B（按 2026-10-12 21:44 UTC 录下的那次返回量的）。

## 翻页

每页 15 条。每页条数由平台决定，不收 `limit`。

一次给全，不发游标。

## 什么时候收费

| 情况 | 收费 |
| --- | --- |
| 返回了数据 | $0.0020，每次调用收一次 |
| 参数不合法、出错、超时 | 不收费 |
| 单次最高扣费 | $0.0020 (带 `X-Max-Price` 可以设自己的上限，超过就不执行) |

价格读取于 2026-11-20 07:17 UTC，按价目版本 19，2026-11-17 18:04 UTC 起生效；在 Playground 里运行前会再读一次当前价格。

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
curl -G "https://api.dataxapi.com/v1/meta/advertisers/search" \
  --data-urlencode "query=puma" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
# pip install dataxapi
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.meta.advertisers.search(query="puma")
print(result["data"]["items"])
```

### TypeScript

```typescript
// npm i @dataxapi/sdk
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.meta.advertisers.search({ query: "puma" });
console.log(result.data.items);
```

### 命令行

```bash
dataxapi call meta.advertisers.search query=puma
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

把这段加进你的 MCP 客户端，然后让你的 AI 调用 `meta.advertisers.search`。

## 返回

### 200

取自 2026-10-12 21:44 UTC 录下的真实返回。名字、正文和编号是示例，链接也是，都不是录到的原文（页面不展示任何人的个人信息）；数字是原样。长列表做了截断。请求号、游标和余额是示意。

返回大小：标准档 7.4 KB（精简 1.1 KB，完整 9.7 KB）。

```jsonc
{
  "code": "ok",
  "request_id": "f0edf122-e137-45dc-a006-e92f5a4e8d1a",
  "data": {
    "items": [
      {
        "id": "109302004765630",
        "name": "Lumen Outdoor",
        "avatar_url": "https://scontent.xx.fbcdn.net/v/t39.30808-1/487718865_122396809446085_n.jpg"
      },
      // … 另有 14 条
    ]
  },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 15
  },
  "warnings": [],
  "meta": {
    "capability": "meta.advertisers.search",
    "result_status": "complete",
    "fetched_at": "2026-10-12T21:44:03.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": { "region": "capability" },
    "billing": {
      "amount": "0.002",
      "currency": "USD",
      "balance_after": "9.998"
    }
  }
}
```

### 空结果

取自 2026-10-12 21:44 UTC 录下的真实返回。请求号和余额是示意。

返回大小：标准档 427 B（精简 427 B，完整 427 B）。

```jsonc
{
  "code": "ok",
  "request_id": "6ae43f3b-7c31-46c9-a3b4-a0ef7bfadfc4",
  "data": { "items": [] },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 0
  },
  "warnings": [],
  "meta": {
    "capability": "meta.advertisers.search",
    "result_status": "empty",
    "fetched_at": "2026-10-12T21:44:17.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": { "region": "capability" },
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
  "request_id": "b4cb82e4-85e9-46b6-a461-887b6a5a6a6c",
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
  "request_id": "0a2bb60f-173b-4919-beaa-a34c56c1f632",
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

### 502

按规范写的示例，不是录下的返回。

```json
{
  "code": "upstream_failed",
  "request_id": "65c26815-e673-4106-a5e6-b1bfb766381e",
  "message": "No result came back this time and nothing was charged; retry shortly",
  "message_zh": "这次没有取到结果，没有扣费，可以稍后重试",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

这份录制的返回：平台原始 JSON 4,631 token，DataXAPI 的 JSON 3,825 token，AI 通过 DataXAPI 的 MCP 读到 276 token，少 94%（2026-11-06 统计）。

[这份示例的 JSON 文件](https://dataxapi.com/apis/meta/advertisers/search.example.json)

## 在你的 AI 里用它

`dataxapi setup` 给这台电脑上的 AI 代理（Claude Code、Codex、Cursor）装好 DataXAPI 的 MCP 服务和基础技能。Key 从环境变量 DATAXAPI_API_KEY 读，不写进任何文件。

MCP 服务地址：`https://api.dataxapi.com/mcp`。你的客户端要填的配置在本页请求示例的“MCP”页签里；接好后让你的 AI 调用 `meta.advertisers.search`。

或者把这段话贴给任意一个 AI：

> 读一下 https://dataxapi.com/zh/apis/meta/advertisers/search.md，然后帮我用 DataXAPI 的接口 meta.advertisers.search（Meta 广告主搜索）。

[在 ChatGPT 里打开](https://chatgpt.com/?q=%E8%AF%BB%E4%B8%80%E4%B8%8B%20https%3A%2F%2Fdataxapi.com%2Fzh%2Fapis%2Fmeta%2Fadvertisers%2Fsearch.md%EF%BC%8C%E7%84%B6%E5%90%8E%E5%B8%AE%E6%88%91%E7%94%A8%20DataXAPI%20%E7%9A%84%E6%8E%A5%E5%8F%A3%20meta.advertisers.search%EF%BC%88Meta%20%E5%B9%BF%E5%91%8A%E4%B8%BB%E6%90%9C%E7%B4%A2%EF%BC%89%E3%80%82) · [在 Claude 里打开](https://claude.ai/new?q=%E8%AF%BB%E4%B8%80%E4%B8%8B%20https%3A%2F%2Fdataxapi.com%2Fzh%2Fapis%2Fmeta%2Fadvertisers%2Fsearch.md%EF%BC%8C%E7%84%B6%E5%90%8E%E5%B8%AE%E6%88%91%E7%94%A8%20DataXAPI%20%E7%9A%84%E6%8E%A5%E5%8F%A3%20meta.advertisers.search%EF%BC%88Meta%20%E5%B9%BF%E5%91%8A%E4%B8%BB%E6%90%9C%E7%B4%A2%EF%BC%89%E3%80%82)

## 相关

这是 DataXAPI 广告数据的一部分。同一把 Key 还能用：社交媒体、达人、电商。

同一件事的其他平台：[Google 广告主搜索](https://dataxapi.com/zh/apis/google/advertisers/search/)

其他平台的广告数据：[Google 广告详情](https://dataxapi.com/zh/apis/google/ads/get/)、[Google 广告主的广告](https://dataxapi.com/zh/apis/google/advertisers/ads/list/)、[LinkedIn 广告详情](https://dataxapi.com/zh/apis/linkedin/ads/get/)、[LinkedIn 广告库搜索](https://dataxapi.com/zh/apis/linkedin/ads/search/)、[TikTok 广告库搜索](https://dataxapi.com/zh/apis/tiktok/ads/search/)、[TikTok 广告库广告详情](https://dataxapi.com/zh/apis/tiktok/ads/get/)、[TikTok 创意中心热门广告详情](https://dataxapi.com/zh/apis/tiktok/creative_center/ads/get/)、[TikTok 创意中心热门广告搜索](https://dataxapi.com/zh/apis/tiktok/creative_center/ads/search/)

Meta 广告库的接口：[Meta 广告详情](https://dataxapi.com/zh/apis/meta/ads/get/)、[Meta 广告库搜索](https://dataxapi.com/zh/apis/meta/ads/search/)、[Meta 广告视频字幕](https://dataxapi.com/zh/apis/meta/ads/transcript/get/)、[Meta 广告主的广告](https://dataxapi.com/zh/apis/meta/advertisers/ads/list/)、[Meta 广告主搜索](https://dataxapi.com/zh/apis/meta/advertisers/search/)

怎么做和常见问题：[Meta 广告库 API：按关键词搜广告、查一个 Facebook 主页投的全部广告（2026）](https://dataxapi.com/zh/answers/meta-ad-library-api/)

相关：[Meta 广告库的全部接口](https://dataxapi.com/zh/apis/meta/)、[广告数据](https://dataxapi.com/zh/categories/ads/)、[这件事在 2 个平台上的对照](https://dataxapi.com/zh/roles/advertisers-search/)、[广告主对象的字段](https://dataxapi.com/zh/docs/objects/advertiser/)

## 常见问题

### Meta 广告主搜索 API 多少钱？

$0.0020 一次。单次最高扣费 $0.0020。

### 什么情况下不收费？

出错和超时不收费。

### 一次返回多少条？怎么翻页？

每页 15 条。每页条数由平台决定，不收 limit。一次给全，不发游标。

---

最后核对于 2026-11-20 07:17 UTC。目录修订号 720fc3ea8dadb865。 [网页版](https://dataxapi.com/zh/apis/meta/advertisers/search/)
