# 抖音巨量算数关键词热度趋势 API

按一个关键词或一次 1 到 5 个关键词，加起止日期，取每个词在抖音上逐日的搜索指数和综合指数（巨量算数，也就是抖音指数），带本期、上期和去年同期的日均值。指数是平台算出的热度分，不是搜索次数；日期是中国时间（UTC+8）的自然日。每次约 1 条，最多 5 条；$0.0060 一次。出错和超时不收费。

- 地址：`GET / POST https://api.dataxapi.com/v1/douyin/index/keywords/history`
- 编号：`douyin.index.keywords.history`
- 也叫：巨量算数 API、抖音指数 API、巨量指数、关键词热度 API、抖音关键词指数、巨量算数关键词趋势、抖音搜索指数、抖音关键词热度、抖音指数、抖音巨量算数关键词指数解读
- 价格：$0.0060 / 次
- 当前状态不写在这一页上（页面是快照），实时读：`GET https://api.dataxapi.com/v1/catalog/status`
- 返回：每页最多 5 条, 一次给全，不翻页
- 返回关键词指数历史，预览结构，以后可能调整
- [不写代码：用「抖音指数查询（巨量算数）」直接查 →](https://dataxapi.com/zh/tools/douyin-index/)
- [在 Playground 里跑一次](https://dataxapi.com/zh/console/playground/?capability=douyin.index.keywords.history&params=%7B%22since%22%3A%222026-09-01T00%3A00%3A00Z%22%2C%22until%22%3A%222026-09-30T00%3A00%3A00Z%22%2C%22keywords%22%3A%5B%22%E5%92%96%E5%95%A1%22%2C%22CityWalk%22%5D%7D)
- 英文名：[Douyin trend-index keyword trends API](https://dataxapi.com/apis/douyin/index/keywords/history/)

## 能拿到什么

2026-10-12 21:47 UTC 录下的真实返回（咖啡），这里是前 7 行。

| date | search_index | composite_index |
| --- | --- | --- |
| 2026-09-01 | 4,542,097 | 1,627,826 |
| 2026-09-02 | 4,430,237 | 1,603,543 |
| 2026-09-03 | 4,439,049 | 1,606,224 |
| 2026-09-04 | 4,590,172 | 1,648,872 |
| 2026-09-05 | 5,608,382 | 1,966,637 |
| 2026-09-06 | 5,341,970 | 1,888,380 |
| 2026-09-07 | 5,098,808 | 1,808,789 |

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `keyword` | 文本 | `keywords`、`keyword` 里给且只给一个 | 一个关键词，不超过 50 个字符、不含逗号，不分大小写。示例：`咖啡`。 |
| `keywords` | 文本列表 | `keywords`、`keyword` 里给且只给一个 | 1 到 5 个关键词，每个不超过 50 个字符、不含逗号，不分大小写；每个有数的词返回一条，平台没收录的词不在返回里。示例：`["咖啡","CityWalk"]`。 |
| `since` | 时间 | 是 | 从哪一天起（含）：取这个时刻所在的中国时间（UTC+8）自然日，写 2026-09-01 就是 9 月 1 日。示例：`2026-09-01T00:00:00Z`。 |
| `until` | 时间 | 是 | 到哪一天止（含），取法同上。平台的数通常晚一到两天出：还没出数的日子，指数为 null。示例：`2026-09-30T00:00:00Z`。 |
| `view` | 文本 |  | 返回档位。三档价格相同。取值：`compact`、`standard`（默认）、`full`。 |
| `fields` | 文本列表 |  | 只要这些字段。按路径写，例如 `author.name`。 |

带 `keywords` 的请求用 POST，参数放在 JSON 请求体里；其余请求用 GET。

## 返回字段

`data.items` 是关键词指数历史对象的列表。预览：结构可能调整，改之前会公告。

返回分三档：精简 `compact`（最常用的字段，长文本截短）、标准 `standard`（默认，全部标准字段）、完整 `full`（再加 `ext`，也就是这个平台特有的字段）。字段从表里写的那一档起出现，更大的档位也带。

| 字段 | 类型 | 说明 | 起始档位 | 这个接口 |
| --- | --- | --- | --- | --- |
| `keyword` | 文本 | 关键词。在这个平台上：平台的写法：英文一律小写。 | `compact` | 有 |
| `points` | 对象列表 | 逐日的数，一天一项，从早到晚。 | `compact` | 有 |
| `points[].date` | 时间 | 日期：中国时间（UTC+8）的一个自然日，写成这个日期的 UTC 零点（北京时间当天 8 点）；原样传给 since、until 取的就是这一天。 | `compact` | 有 |
| `points[].search_index` | 整数 | 这一天的搜索指数：平台按搜索热度算出的指数，不是搜索次数。 | `compact` | 有 |
| `points[].composite_index` | 整数 | 这一天的综合指数：平台把这个词相关内容的热度合起来算出的指数，不是次数。 | `compact` | 有 |
| `points[].notes` | 整数 | 这一天和这个词有关的内容数。 | `standard` | 平台没有 |
| `points[].impressions` | 整数 | 这些内容这一天的曝光数。 | `standard` | 平台没有 |
| `points[].views` | 整数 | 这些内容这一天的阅读数。 | `standard` | 平台没有 |
| `points[].engagements` | 整数 | 这些内容这一天的互动数。 | `standard` | 平台没有 |
| `ext.composite_average` | 整数 | 所查时间段内综合指数的日均值。 | `full` | 有 |
| `ext.search_average` | 整数 | 所查时间段内搜索指数的日均值。 | `full` | 有 |
| `ext.previous_composite_average` | 整数 | 上一个同样长的时间段的综合指数日均值。 | `full` | 有 |
| `ext.previous_search_average` | 整数 | 上一个同样长的时间段的搜索指数日均值。 | `full` | 有 |
| `ext.year_ago_composite_average` | 整数 | 去年同期的综合指数日均值。 | `full` | 有 |
| `ext.year_ago_search_average` | 整数 | 去年同期的搜索指数日均值。 | `full` | 有 |
| `approximate` | 对象列表 | 这一条里哪些数是约数或下限；都是准确值时不出现。 | `compact` | 有 |
| `approximate[].field` | 文本 | 字段的路径，如 metrics.views。 | `compact` | 有 |
| `approximate[].kind` | 文本 | 约数，还是下限。取值：`approximate`、`lower_bound`。 | `compact` | 有 |

某一条本来就没有这个值时，字段给 `null`。这个接口给不了的字段不出现，统一列在 `meta.unavailable`。

每条数据的典型体积：`compact` 2.3 KB、`standard` 2.3 KB、`full` 2.5 KB（按 2026-10-12 21:47 UTC 录下的那次返回量的）。

## 翻页

每页约 1 条，最多 5 条。每页条数由平台决定，不收 `limit`。

一次给全，不发游标。

## 什么时候收费

| 情况 | 收费 |
| --- | --- |
| 返回了数据 | $0.0060，每次调用收一次 |
| 参数不合法、出错、超时 | 不收费 |
| 单次最高扣费 | $0.0060 (带 `X-Max-Price` 可以设自己的上限，超过就不执行) |

价格读取于 2026-11-26 12:17 UTC，按价目版本 22，2026-11-25 13:46 UTC 起生效；在 Playground 里运行前会再读一次当前价格。

## 对象不存在时

平台没收录的关键词不在返回里；要的词一个都没有数时返回空结果，不报“不存在”。只查平台还没出数的日子也是空结果。

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
curl "https://api.dataxapi.com/v1/douyin/index/keywords/history" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"since":"2026-09-01T00:00:00Z","until":"2026-09-30T00:00:00Z","keywords":["咖啡","CityWalk"]}'
```

### Python

```python
# pip install dataxapi
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.douyin.index.keywords.history(since="2026-09-01T00:00:00Z", until="2026-09-30T00:00:00Z", keywords=["咖啡", "CityWalk"])
print(result["data"]["items"])
```

### TypeScript

```typescript
// npm i @dataxapi/sdk
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.douyin.index.keywords.history({ since: "2026-09-01T00:00:00Z", until: "2026-09-30T00:00:00Z", keywords: ["咖啡", "CityWalk"] });
console.log(result.data.items);
```

### 命令行

```bash
dataxapi call douyin.index.keywords.history since=2026-09-01T00:00:00Z until=2026-09-30T00:00:00Z 'keywords=咖啡,CityWalk'
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

把这段加进你的 MCP 客户端，然后让你的 AI 调用 `douyin.index.keywords.history`。

## 返回

### 200

取自 2026-10-12 21:47 UTC 录下的真实返回。名字、正文和编号是示例，链接也是，都不是录到的原文（页面不展示任何人的个人信息）；数字是原样。长列表做了截断。请求号、游标和余额是示意。

返回大小：标准档 5.2 KB（精简 5.2 KB，完整 5.6 KB）。

```jsonc
{
  "code": "ok",
  "request_id": "53564b2f-0976-4ff1-bacd-8f35e1e89865",
  "data": {
    "items": [
      {
        "keyword": "咖啡",
        "points": [
          {
            "date": "2026-09-01T00:00:00Z",
            "search_index": 4542097,
            "composite_index": 1627826
          },
          {
            "date": "2026-09-02T00:00:00Z",
            "search_index": 4430237,
            "composite_index": 1603543
          },
          {
            "date": "2026-09-03T00:00:00Z",
            "search_index": 4439049,
            "composite_index": 1606224
          },
          {
            "date": "2026-09-04T00:00:00Z",
            "search_index": 4590172,
            "composite_index": 1648872
          },
          {
            "date": "2026-09-05T00:00:00Z",
            "search_index": 5608382,
            "composite_index": 1966637
          },
          {
            "date": "2026-09-06T00:00:00Z",
            "search_index": 5341970,
            "composite_index": 1888380
          },
          {
            "date": "2026-09-07T00:00:00Z",
            "search_index": 5098808,
            "composite_index": 1808789
          },
          // … 另有 23 条
        ]
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
    "capability": "douyin.index.keywords.history",
    "result_status": "complete",
    "fetched_at": "2026-10-12T21:47:47.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "points.notes": "platform",
      "points.impressions": "platform",
      "points.views": "platform",
      "points.engagements": "platform"
    },
    "billing": {
      "amount": "0.006",
      "currency": "USD",
      "balance_after": "9.994"
    }
  }
}
```

### 空结果

取自 2026-10-12 21:47 UTC 录下的真实返回。请求号和余额是示意。

返回大小：标准档 527 B（精简 527 B，完整 527 B）。

```jsonc
{
  "code": "ok",
  "request_id": "2f84dceb-a3e5-448e-906d-070c3e66e29d",
  "data": { "items": [] },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 0
  },
  "warnings": [],
  "meta": {
    "capability": "douyin.index.keywords.history",
    "result_status": "empty",
    "fetched_at": "2026-10-12T21:47:49.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "points.notes": "platform",
      "points.impressions": "platform",
      "points.views": "platform",
      "points.engagements": "platform"
    },
    "billing": {
      "amount": "0.006",
      "currency": "USD",
      "balance_after": "9.994"
    }
  }
}
```

### 400

按规范写的示例，不是录下的返回。

```json
{
  "code": "invalid_params",
  "request_id": "7aa5e633-6853-4495-bdd5-ee8237f29858",
  "message": "A parameter is invalid",
  "message_zh": "参数不合法",
  "charged": false,
  "retry": "after_fix",
  "retry_after_seconds": null,
  "param": null,
  "problems": [
    "since is required",
    "until is required",
    "give exactly one of keywords, keyword"
  ],
  "docs_url": "https://dataxapi.com/docs/errors#invalid_params"
}
```

### 402

按规范写的示例，不是录下的返回。

```json
{
  "code": "insufficient_balance",
  "request_id": "8109c4b5-bc65-4098-b3b9-b3b798b91b4b",
  "message": "The balance is too low",
  "message_zh": "余额不足",
  "charged": false,
  "retry": "after_fix",
  "retry_after_seconds": null,
  "param": null,
  "required": "0.006",
  "available": "0",
  "top_up_url": "https://dataxapi.com/console/billing/?amount=10",
  "next_step": "The balance does not cover this call ($0.006). Top up at top_up_url: $10 at least, about 1,666 calls at this price; Alipay or a card, and the balance never expires. Then send the same request again, unchanged. Nothing was charged for this one.",
  "next_step_zh": "余额不够这次调用（$0.006）。到 top_up_url 充值：最低 $10，按这次的价格约够 1,666 次；支付宝、银行卡都能付，余额不过期。到账后把同一个请求原样再发一次。这次没有扣钱。",
  "docs_url": "https://dataxapi.com/docs/errors#insufficient_balance"
}
```

### 502

按规范写的示例，不是录下的返回。

```json
{
  "code": "upstream_failed",
  "request_id": "ec0fdfc5-5746-4982-a84c-473e3b02679a",
  "message": "No result came back this time and nothing was charged; retry shortly",
  "message_zh": "这次没有取到结果，没有扣费，可以稍后重试",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

[这份示例的 JSON 文件](https://dataxapi.com/apis/douyin/index/keywords/history.example.json)

## 在你的 AI 里用它

`dataxapi setup` 给这台电脑上的 AI 代理（Claude Code、Codex、Cursor）装好 DataXAPI 的 MCP 服务和基础技能。Key 从环境变量 DATAXAPI_API_KEY 读，不写进任何文件。

MCP 服务地址：`https://api.dataxapi.com/mcp`。你的客户端要填的配置在本页请求示例的“MCP”页签里；接好后让你的 AI 调用 `douyin.index.keywords.history`。

或者把这段话贴给任意一个 AI：

> 读一下 https://dataxapi.com/zh/apis/douyin/index/keywords/history.md，然后帮我用 DataXAPI 的接口 douyin.index.keywords.history（抖音巨量算数关键词热度趋势）。

[在 ChatGPT 里打开](https://chatgpt.com/?q=%E8%AF%BB%E4%B8%80%E4%B8%8B%20https%3A%2F%2Fdataxapi.com%2Fzh%2Fapis%2Fdouyin%2Findex%2Fkeywords%2Fhistory.md%EF%BC%8C%E7%84%B6%E5%90%8E%E5%B8%AE%E6%88%91%E7%94%A8%20DataXAPI%20%E7%9A%84%E6%8E%A5%E5%8F%A3%20douyin.index.keywords.history%EF%BC%88%E6%8A%96%E9%9F%B3%E5%B7%A8%E9%87%8F%E7%AE%97%E6%95%B0%E5%85%B3%E9%94%AE%E8%AF%8D%E7%83%AD%E5%BA%A6%E8%B6%8B%E5%8A%BF%EF%BC%89%E3%80%82) · [在 Claude 里打开](https://claude.ai/new?q=%E8%AF%BB%E4%B8%80%E4%B8%8B%20https%3A%2F%2Fdataxapi.com%2Fzh%2Fapis%2Fdouyin%2Findex%2Fkeywords%2Fhistory.md%EF%BC%8C%E7%84%B6%E5%90%8E%E5%B8%AE%E6%88%91%E7%94%A8%20DataXAPI%20%E7%9A%84%E6%8E%A5%E5%8F%A3%20douyin.index.keywords.history%EF%BC%88%E6%8A%96%E9%9F%B3%E5%B7%A8%E9%87%8F%E7%AE%97%E6%95%B0%E5%85%B3%E9%94%AE%E8%AF%8D%E7%83%AD%E5%BA%A6%E8%B6%8B%E5%8A%BF%EF%BC%89%E3%80%82)

## 相关

这是 DataXAPI 社交媒体数据的一部分。同一把 Key 还能用：达人、广告、电商。

抖音巨量算数的接口：[抖音巨量算数品牌指数趋势](https://dataxapi.com/zh/apis/douyin/index/brands/history/)、[抖音巨量算数品牌指数对比](https://dataxapi.com/zh/apis/douyin/index/brands/metrics/)、[抖音巨量算数达人热门视频](https://dataxapi.com/zh/apis/douyin/index/creators/videos/list/)、[抖音巨量算数达人粉丝画像](https://dataxapi.com/zh/apis/douyin/index/creators/audience/get/)、[抖音巨量算数达人核心指标](https://dataxapi.com/zh/apis/douyin/index/creators/metrics/)、[抖音巨量算数关键词人群画像](https://dataxapi.com/zh/apis/douyin/index/keywords/audience/get/)、[抖音巨量算数关键词热度趋势](https://dataxapi.com/zh/apis/douyin/index/keywords/history/)、[抖音巨量算数关联词](https://dataxapi.com/zh/apis/douyin/index/keywords/related/)、[抖音巨量算数实时热点](https://dataxapi.com/zh/apis/douyin/index/trends/list/)、[抖音巨量算数关键词热门视频](https://dataxapi.com/zh/apis/douyin/index/videos/search/)

抖音的接口：[抖音评论回复](https://dataxapi.com/zh/apis/douyin/comments/replies/list/)、[抖音话题视频](https://dataxapi.com/zh/apis/douyin/hashtags/videos/list/)、[抖音热榜](https://dataxapi.com/zh/apis/douyin/trends/list/)、[抖音用户资料](https://dataxapi.com/zh/apis/douyin/users/get/)、[抖音达人互动与粉丝趋势](https://dataxapi.com/zh/apis/douyin/users/history/)、[抖音用户搜索](https://dataxapi.com/zh/apis/douyin/users/search/)、[抖音用户视频](https://dataxapi.com/zh/apis/douyin/users/videos/list/)、[抖音视频评论](https://dataxapi.com/zh/apis/douyin/videos/comments/list/)、[抖音视频详情](https://dataxapi.com/zh/apis/douyin/videos/get/)、[抖音视频转文字（文案提取、逐字稿）](https://dataxapi.com/zh/apis/douyin/videos/transcript/get/)、[抖音视频播放量](https://dataxapi.com/zh/apis/douyin/videos/metrics/)、[抖音相关视频](https://dataxapi.com/zh/apis/douyin/videos/related/)、[抖音视频搜索](https://dataxapi.com/zh/apis/douyin/videos/search/)、[抖音视频榜](https://dataxapi.com/zh/apis/douyin/videos/trending/)、[抖音搜索框联想词](https://dataxapi.com/zh/apis/douyin/keywords/related/)、[抖音无水印视频和图片下载地址](https://dataxapi.com/zh/apis/douyin/videos/media/get/)、[抖音音乐详情（背景音乐 MP3 和使用人数）](https://dataxapi.com/zh/apis/douyin/music/get/)、[抖音用户视频（备用版）](https://dataxapi.com/zh/apis/douyin/backup/users/videos/list/)、[抖音视频搜索（备用版）](https://dataxapi.com/zh/apis/douyin/backup/videos/search/)

抖音星图的接口：[抖音星图达人商业报价](https://dataxapi.com/zh/apis/douyin/xingtu/creators/rates/get/)、[抖音星图达人搜索](https://dataxapi.com/zh/apis/douyin/xingtu/creators/search/)、[抖音星图达人资料](https://dataxapi.com/zh/apis/douyin/xingtu/creators/get/)、[抖音星图达人粉丝画像](https://dataxapi.com/zh/apis/douyin/xingtu/creators/audience/get/)、[抖音星图达人传播数据](https://dataxapi.com/zh/apis/douyin/xingtu/creators/metrics/)、[抖音星图达人作品表现](https://dataxapi.com/zh/apis/douyin/xingtu/creators/videos/list/)、[抖音星图达人内容热词](https://dataxapi.com/zh/apis/douyin/xingtu/creators/keywords/get/)、[抖音星图达人星图指数](https://dataxapi.com/zh/apis/douyin/xingtu/creators/scores/get/)、[抖音星图达人内容分布](https://dataxapi.com/zh/apis/douyin/xingtu/creators/content_mix/get/)、[抖音星图达人转化能力](https://dataxapi.com/zh/apis/douyin/xingtu/creators/conversion/get/)、[抖音星图营销活动日历](https://dataxapi.com/zh/apis/douyin/xingtu/campaigns/list/)、[抖音星图视频数据报告（播放量、完播率）](https://dataxapi.com/zh/apis/douyin/xingtu/videos/get/)、[抖音星图达人粉丝画像（备用版）](https://dataxapi.com/zh/apis/douyin/xingtu/backup/creators/audience/get/)

怎么做和常见问题：[如何批量获取抖音关键词热度趋势](https://dataxapi.com/zh/guides/douyin-keyword-trends/)、[抖音数据怎么导出？](https://dataxapi.com/zh/answers/export-douyin-data/)、[抖音搜索指数等于搜索次数吗？](https://dataxapi.com/zh/answers/douyin-search-index-vs-search-count/)、[巨量算数关键词指数是什么、能拿到什么？](https://dataxapi.com/zh/answers/what-is-douyin-keyword-index-ocean-engine/)

用这个接口做的工具：[抖音指数查询（巨量算数）：在线查询（要登录）](https://dataxapi.com/zh/tools/douyin-index/)

相关：[抖音巨量算数的全部接口](https://dataxapi.com/zh/apis/douyin/index/)、[抖音的全部接口](https://dataxapi.com/zh/apis/douyin/)、[社交媒体数据](https://dataxapi.com/zh/categories/social/)、[关键词指数历史对象的字段](https://dataxapi.com/zh/docs/objects/keyword_history/)

## 常见问题

### 抖音巨量算数关键词热度趋势 API 多少钱？

$0.0060 一次。单次最高扣费 $0.0060。

### 什么情况下不收费？

出错和超时不收费。

### 一次返回多少条？怎么翻页？

每页约 1 条，最多 5 条。每页条数由平台决定，不收 limit。一次给全，不发游标。

### 对象不存在会怎样？

平台没收录的关键词不在返回里；要的词一个都没有数时返回空结果，不报“不存在”。只查平台还没出数的日子也是空结果。

### 数据从哪来？

来自抖音官方的指数工具巨量算数（也叫抖音指数）：就是它给这个词的搜索指数和综合指数，按天给。不用抖音账号，也不用广告主账号。

### 多久更新一次？

每天一个数，按中国时间（UTC+8）的自然日算。平台的数通常晚一到两天出：还没出数的日子，指数是 null。

### 能查多长时间范围？

since 到 until 之间的任意整天，两头都算；时间段长短不影响价格。示例查的是 2026 年 9 月整月。每个词还附带本期、上期和去年同期的日均值。

### 一次能查几个词？

用 keyword 查一个，用 keywords 一次查 1 到 5 个（POST）。按次收费，一次 $0.0060，查 5 个词和查 1 个词同价。巨量算数没收录的词不在返回里。

### 怎么在 AI 里用？

先接入 DataXAPI（在“给 AI 代理”页复制一段带 Key 的提示词，贴给你的 AI），然后直接用中文问：“用 DataXAPI 查‘咖啡’2026 年 9 月在抖音巨量算数上的搜索指数。”它会调用 douyin.index.keywords.history，每次扣 $0.0060。

---

最后核对于 2026-11-26 12:17 UTC。目录修订号 0051cce45e9530b9。 [网页版](https://dataxapi.com/zh/apis/douyin/index/keywords/history/)
