# 快手热榜 API

取快手热榜：50 个热点词连同平台置顶的条目，带名次和热度。每次约 51 条，最多 60 条；$0.0020 一次。出错和超时不收费。

- 地址：`GET https://api.dataxapi.com/v1/kuaishou/trends/list`
- 编号：`kuaishou.trends.list`
- 也叫：快手热搜、快手热点
- 价格：$0.0020 / 次
- 当前状态不写在这一页上（页面是快照），实时读：`GET https://api.dataxapi.com/v1/catalog/status`
- 返回：每页最多 60 条, 一次给全，不翻页
- 返回标准的热点结构，各平台相同
- [在 Playground 里跑一次](https://dataxapi.com/zh/console/playground/?capability=kuaishou.trends.list)
- 英文名：[Kuaishou hot list API](https://dataxapi.com/apis/kuaishou/trends/list/)

## 能拿到什么

2026-10-12 18:52 UTC 录下的真实返回，这里是前 1 行。

| 字段 | 值 |
| --- | --- |
| heat | 13,084,448 |

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `view` | 文本 |  | 返回档位。三档价格相同。取值：`compact`、`standard`（默认）、`full`。 |
| `fields` | 文本列表 |  | 只要这些字段。按路径写，例如 `author.name`。 |

## 返回字段

`data.items` 是热点对象的列表。稳定：字段只增不改。

返回分三档：精简 `compact`（最常用的字段，长文本截短）、标准 `standard`（默认，全部标准字段）、完整 `full`（再加 `ext`，也就是这个平台特有的字段）。字段从表里写的那一档起出现，更大的档位也带。

| 字段 | 类型 | 说明 | 起始档位 | 这个接口 |
| --- | --- | --- | --- | --- |
| `id` | 文本 | 平台给这个热点的编号。 | `compact` | 有 |
| `name` | 文本 | 热点的名称。 | `compact` | 有 |
| `rank` | 整数 | 榜上的名次，从 1 起；置顶条没有名次。 | `compact` | 有 |
| `heat` | 整数 | 平台给的热度值。 | `compact` | 有 |
| `approximate` | 对象列表 | 这一条里哪些数是约数或下限；都是准确值时不出现。 | `compact` | 有 |
| `approximate[].field` | 文本 | 字段的路径，如 metrics.views。 | `compact` | 有 |
| `approximate[].kind` | 文本 | 约数，还是下限。取值：`approximate`、`lower_bound`。 | `compact` | 有 |

某一条本来就没有这个值时，字段给 `null`。这个接口给不了的字段不出现，统一列在 `meta.unavailable`。

每条数据的典型体积：`compact` 87 B、`standard` 87 B、`full` 87 B（按 2026-10-12 18:52 UTC 录下的那次返回量的）。

## 翻页

每页约 51 条，最多 60 条。每页条数由平台决定，不收 `limit`。

一次给全，不发游标。

结果来自共享快照，每 10 分钟更新一次；`meta.cached` 会标明，`meta.fetched_at` 是取数时间。

## 什么时候收费

| 情况 | 收费 |
| --- | --- |
| 返回了数据 | $0.0020，每次调用收一次 |
| 参数不合法、出错、超时 | 不收费 |
| 单次最高扣费 | $0.0020 (带 `X-Max-Price` 可以设自己的上限，超过就不执行) |

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
curl "https://api.dataxapi.com/v1/kuaishou/trends/list" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
# pip install dataxapi
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.kuaishou.trends.list()
print(result["data"]["items"])
```

### TypeScript

```typescript
// npm i @dataxapi/sdk
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.kuaishou.trends.list();
console.log(result.data.items);
```

### 命令行

```bash
dataxapi call kuaishou.trends.list
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

把这段加进你的 MCP 客户端，然后让你的 AI 调用 `kuaishou.trends.list`。

## 返回

### 200

取自 2026-10-12 18:52 UTC 录下的真实返回。名字、正文和编号是示例，链接也是，都不是录到的原文（页面不展示任何人的个人信息）；数字是原样。长列表做了截断。请求号、游标和余额是示意。

返回大小：标准档 4.7 KB（精简 4.7 KB，完整 4.7 KB）。

```jsonc
{
  "code": "ok",
  "request_id": "bebdfa5e-0a46-44be-bdbb-bb97ebc94061",
  "data": {
    "items": [
      {
        "id": "987286756762",
        "name": "周末露营怎么玩",
        "rank": null,
        "heat": 13084448
      },
      // … 另有 50 条
    ]
  },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 51
  },
  "warnings": [],
  "meta": {
    "capability": "kuaishou.trends.list",
    "result_status": "complete",
    "fetched_at": "2026-10-12T18:52:45.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {},
    "billing": {
      "amount": "0.002",
      "currency": "USD",
      "balance_after": "9.998"
    }
  }
}
```

### 空结果

取自 2026-10-12 18:52 UTC 的录制，为演示这种情况人工改过。请求号和余额是示意。

返回大小：标准档 403 B（精简 403 B，完整 403 B）。

```jsonc
{
  "code": "ok",
  "request_id": "62b6fe60-95c8-4aa0-9241-36a5cb652a40",
  "data": { "items": [] },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 0
  },
  "warnings": [],
  "meta": {
    "capability": "kuaishou.trends.list",
    "result_status": "empty",
    "fetched_at": "2026-10-12T18:52:45.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {},
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
  "request_id": "6e91b2cc-458c-447a-bce7-8c94db34fadb",
  "message": "A parameter is invalid",
  "message_zh": "参数不合法",
  "charged": false,
  "retry": "after_fix",
  "retry_after_seconds": null,
  "param": null,
  "problems": [
    "other is not a parameter of kuaishou.trends.list; it takes "
  ],
  "docs_url": "https://dataxapi.com/docs/errors#invalid_params"
}
```

### 402

按规范写的示例，不是录下的返回。

```json
{
  "code": "insufficient_balance",
  "request_id": "f92d6109-caf2-4b35-93e2-be5ee8c2cfd6",
  "message": "The balance is too low",
  "message_zh": "余额不足",
  "charged": false,
  "retry": "after_fix",
  "retry_after_seconds": null,
  "param": null,
  "required": "0.002",
  "available": "0",
  "top_up_url": "https://dataxapi.com/console/billing/?amount=10",
  "next_step": "The balance does not cover this call ($0.002). Top up at top_up_url: $10 at least, about 5,000 calls at this price; Alipay or a card, and the balance never expires. Then send the same request again, unchanged. Nothing was charged for this one.",
  "next_step_zh": "余额不够这次调用（$0.002）。到 top_up_url 充值：最低 $10，按这次的价格约够 5,000 次；支付宝、银行卡都能付，余额不过期。到账后把同一个请求原样再发一次。这次没有扣钱。",
  "docs_url": "https://dataxapi.com/docs/errors#insufficient_balance"
}
```

### 502

按规范写的示例，不是录下的返回。

```json
{
  "code": "upstream_failed",
  "request_id": "cfd74188-8b37-4b6d-b9e7-668ef18d2f04",
  "message": "No result came back this time and nothing was charged; retry shortly",
  "message_zh": "这次没有取到结果，没有扣费，可以稍后重试",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

这份录制的返回：平台原始 JSON 3,451 token，DataXAPI 的 JSON 1,645 token，AI 通过 DataXAPI 的 MCP 读到 1,622 token，少 53%（2026-11-06 统计）。

[这份示例的 JSON 文件](https://dataxapi.com/apis/kuaishou/trends/list.example.json)

## 在你的 AI 里用它

`dataxapi setup` 给这台电脑上的 AI 代理（Claude Code、Codex、Cursor）装好 DataXAPI 的 MCP 服务和基础技能。Key 从环境变量 DATAXAPI_API_KEY 读，不写进任何文件。

MCP 服务地址：`https://api.dataxapi.com/mcp`。你的客户端要填的配置在本页请求示例的“MCP”页签里；接好后让你的 AI 调用 `kuaishou.trends.list`。

或者把这段话贴给任意一个 AI：

> 读一下 https://dataxapi.com/zh/apis/kuaishou/trends/list.md，然后帮我用 DataXAPI 的接口 kuaishou.trends.list（快手热榜）。

[在 ChatGPT 里打开](https://chatgpt.com/?q=%E8%AF%BB%E4%B8%80%E4%B8%8B%20https%3A%2F%2Fdataxapi.com%2Fzh%2Fapis%2Fkuaishou%2Ftrends%2Flist.md%EF%BC%8C%E7%84%B6%E5%90%8E%E5%B8%AE%E6%88%91%E7%94%A8%20DataXAPI%20%E7%9A%84%E6%8E%A5%E5%8F%A3%20kuaishou.trends.list%EF%BC%88%E5%BF%AB%E6%89%8B%E7%83%AD%E6%A6%9C%EF%BC%89%E3%80%82) · [在 Claude 里打开](https://claude.ai/new?q=%E8%AF%BB%E4%B8%80%E4%B8%8B%20https%3A%2F%2Fdataxapi.com%2Fzh%2Fapis%2Fkuaishou%2Ftrends%2Flist.md%EF%BC%8C%E7%84%B6%E5%90%8E%E5%B8%AE%E6%88%91%E7%94%A8%20DataXAPI%20%E7%9A%84%E6%8E%A5%E5%8F%A3%20kuaishou.trends.list%EF%BC%88%E5%BF%AB%E6%89%8B%E7%83%AD%E6%A6%9C%EF%BC%89%E3%80%82)

## 相关

这是 DataXAPI 社交媒体数据的一部分。同一把 Key 还能用：达人、广告、电商。

同一件事的其他平台：[B站热搜榜](https://dataxapi.com/zh/apis/bilibili/trends/list/)、[抖音热榜](https://dataxapi.com/zh/apis/douyin/trends/list/)、[微博热搜榜](https://dataxapi.com/zh/apis/weibo/trends/list/)、[X 趋势榜](https://dataxapi.com/zh/apis/x/trends/list/)、[小红书热点](https://dataxapi.com/zh/apis/xiaohongshu/trends/list/)、[Reddit 趋势搜索词](https://dataxapi.com/zh/apis/reddit/trends/list/)、[知乎热榜](https://dataxapi.com/zh/apis/zhihu/trends/list/)、[微博热搜榜（备用版）](https://dataxapi.com/zh/apis/weibo/backup/trends/list/)

其他平台的社交媒体数据：[抖音巨量算数实时热点](https://dataxapi.com/zh/apis/douyin/index/trends/list/)、[抖音评论回复](https://dataxapi.com/zh/apis/douyin/comments/replies/list/)、[抖音话题视频](https://dataxapi.com/zh/apis/douyin/hashtags/videos/list/)、[B站评论回复](https://dataxapi.com/zh/apis/bilibili/comments/replies/list/)、[B站用户资料](https://dataxapi.com/zh/apis/bilibili/users/get/)、[B站用户投稿](https://dataxapi.com/zh/apis/bilibili/users/videos/list/)、[B站视频评论](https://dataxapi.com/zh/apis/bilibili/videos/comments/list/)、[B站视频详情](https://dataxapi.com/zh/apis/bilibili/videos/get/)、[B站视频转文字（文案提取、逐字稿）](https://dataxapi.com/zh/apis/bilibili/videos/transcript/get/)、[B站视频搜索](https://dataxapi.com/zh/apis/bilibili/videos/search/)、[B站综合热门](https://dataxapi.com/zh/apis/bilibili/videos/trending/)、[抖音巨量算数品牌指数趋势](https://dataxapi.com/zh/apis/douyin/index/brands/history/)、[抖音巨量算数品牌指数对比](https://dataxapi.com/zh/apis/douyin/index/brands/metrics/)

快手的接口：[快手评论回复](https://dataxapi.com/zh/apis/kuaishou/comments/replies/list/)、[快手热榜](https://dataxapi.com/zh/apis/kuaishou/trends/list/)、[快手用户资料](https://dataxapi.com/zh/apis/kuaishou/users/get/)、[快手用户搜索](https://dataxapi.com/zh/apis/kuaishou/users/search/)、[快手用户作品](https://dataxapi.com/zh/apis/kuaishou/users/videos/list/)、[快手作品评论](https://dataxapi.com/zh/apis/kuaishou/videos/comments/list/)、[快手作品详情](https://dataxapi.com/zh/apis/kuaishou/videos/get/)、[快手视频转文字（文案提取、逐字稿）](https://dataxapi.com/zh/apis/kuaishou/videos/transcript/get/)、[快手视频搜索](https://dataxapi.com/zh/apis/kuaishou/videos/search/)、[快手视频和图集下载地址](https://dataxapi.com/zh/apis/kuaishou/videos/media/get/)

怎么做和常见问题：[快手数据接口有哪些？视频、用户、评论怎么取（2026）](https://dataxapi.com/zh/answers/kuaishou-data-apis/)、[快手 MCP：在 Claude、Cursor 里查快手数据（2026）](https://dataxapi.com/zh/answers/kuaishou-mcp/)、[热榜 API：抖音热搜、微博热搜、知乎热榜、B站热门怎么用程序取（2026）](https://dataxapi.com/zh/answers/china-trending-api/)

用到这个接口的 Skills：[热点与选题](https://dataxapi.com/zh/skills/trends/)

用这个接口做的工具：[快手热榜](https://dataxapi.com/zh/tools/hot-search/kuaishou/)

相关：[快手的全部接口](https://dataxapi.com/zh/apis/kuaishou/)、[社交媒体数据](https://dataxapi.com/zh/categories/social/)、[这件事在 8 个平台上的对照](https://dataxapi.com/zh/roles/trends-list/)、[热点对象的字段](https://dataxapi.com/zh/docs/objects/trend/)

## 常见问题

### 快手热榜 API 多少钱？

$0.0020 一次。单次最高扣费 $0.0020。

### 什么情况下不收费？

出错和超时不收费。

### 一次返回多少条？怎么翻页？

每页约 51 条，最多 60 条。每页条数由平台决定，不收 limit。一次给全，不发游标。

---

最后核对于 2026-11-26 12:17 UTC。目录修订号 0051cce45e9530b9。 [网页版](https://dataxapi.com/zh/apis/kuaishou/trends/list/)
