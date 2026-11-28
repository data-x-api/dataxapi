# 小红书蒲公英博主核心数据趋势 API

按蒲公英博主编号取这位小红书博主最近 30 天或 90 天每天的核心数据：CPM、CPE（互动单价）、CPV（阅读单价）、外溢进店单价，和单篇笔记曝光、阅读、互动、外溢进店人数的中位数，以及整段的汇总。可看日常笔记或合作笔记两种口径，看博主的投放性价比是在变好还是变差。每次取一个对象；$0.0400 一次。出错和超时不收费。

- 地址：`GET https://api.dataxapi.com/v1/xiaohongshu/pgy/creators/costs/history`
- 编号：`xiaohongshu.pgy.creators.costs.history`
- 也叫：小红书蒲公英博主核心数据、蒲公英 CPM 趋势、小红书博主每日 CPM、小红书博主 CPE 趋势
- 价格：$0.0400 / 次
- 当前状态不写在这一页上（页面是快照），实时读：`GET https://api.dataxapi.com/v1/catalog/status`
- 返回：1 个对象, 一个蒲公英博主核心数据趋势对象
- 返回蒲公英博主核心数据趋势，预览结构，以后可能调整
- [在 Playground 里跑一次](https://dataxapi.com/zh/console/playground/?capability=xiaohongshu.pgy.creators.costs.history&params=%7B%22id%22%3A%225c0017ef6b58b740c92463fb%22%7D)
- 英文名：[Xiaohongshu PGY creator core figures history API](https://dataxapi.com/apis/xiaohongshu/pgy/creators/costs/history/)

## 能拿到什么

2026-11-10 09:54 UTC 录下的真实返回，这里是前 2 行。

| date | cpm | cpe | cpv | median_impressions | median_reads | median_engagements | median_shop_visits |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 2026-10-11 | 4.4683 | 0.8324 | 0.0108 | 6,713,899 | 6,511,479 | 36,041 | 0 |
| 2026-10-12 | 4.1886 | 0.5148 | 0.0104 | 7,162,338 | 6,749,230 | 58,279 | 0 |

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | 文本 | 是 | 蒲公英博主编号，24 位十六进制；从蒲公英博主搜索的结果里取。示例：`5c0017ef6b58b740c92463fb`。 |
| `window` | 文本 |  | 统计周期：近 30 天或近 90 天，默认 30d。取值：`30d`（默认）、`90d`。示例：`30d`。 |
| `tab` | 文本 |  | 看哪一类笔记的数：everyday 是日常笔记，sponsored 是合作笔记（商单）；默认 everyday，和蒲公英博主页上的两个分栏一样。取值：`everyday`（默认）、`sponsored`。示例：`everyday`。 |
| `view` | 文本 |  | 返回档位。三档价格相同。取值：`compact`、`standard`（默认）、`full`。 |
| `fields` | 文本列表 |  | 只要这些字段。按路径写，例如 `author.name`。 |

## 返回字段

`data.item` 是一个蒲公英博主核心数据趋势对象。预览：结构可能调整，改之前会公告。

返回分三档：精简 `compact`（最常用的字段，长文本截短）、标准 `standard`（默认，全部标准字段）、完整 `full`（再加 `ext`，也就是这个平台特有的字段）。字段从表里写的那一档起出现，更大的档位也带。

| 字段 | 类型 | 说明 | 起始档位 | 这个接口 |
| --- | --- | --- | --- | --- |
| `creator_id` | 文本 | 蒲公英博主编号。 | `compact` | 有 |
| `days` | 整数 | 统计的是最近多少天。 | `compact` | 有 |
| `currency` | 文本 | 各项花费的货币。 | `compact` | 有 |
| `date` | 时间 | 整段的数算到哪一天：中国时间（UTC+8）的一个自然日，写成这个日期的 UTC 零点。 | `compact` | 有 |
| `cpm` | 金额 | CPM：每千次曝光的花费，人民币元；没有时为 null。 | `compact` | 有 |
| `cpe` | 金额 | CPE：每次互动的花费，人民币元；没有时为 null。 | `compact` | 有 |
| `cpv` | 金额 | CPV：每次阅读的花费，人民币元，蒲公英趋势图上的算法；没有时为 null。 | `compact` | 有 |
| `shop_visit_cost` | 金额 | 外溢进店单价：笔记带来的每一位进店访客的花费，人民币元；没有时为 null。 | `compact` | 有 |
| `median_impressions` | 整数 | 单篇笔记曝光数的中位数。 | `compact` | 有 |
| `median_reads` | 整数 | 单篇笔记阅读数的中位数。 | `compact` | 有 |
| `median_engagements` | 整数 | 单篇笔记互动数的中位数。 | `compact` | 有 |
| `median_shop_visits` | 整数 | 单篇笔记带来的外溢进店人数的中位数；没有外溢进店的笔记算 0。 | `compact` | 有 |
| `points` | 对象列表 | 逐日的数，一天一项，从早到晚：每一项是蒲公英那一天算出的数。 | `compact` | 有 |
| `points[].date` | 时间 | 日期：中国时间（UTC+8）的一个自然日，写成这个日期的 UTC 零点。 | `compact` | 有 |
| `points[].cpm` | 金额 | CPM：每千次曝光的花费，人民币元；没有时为 null。 | `compact` | 有 |
| `points[].cpe` | 金额 | CPE：每次互动的花费，人民币元；没有时为 null。 | `compact` | 有 |
| `points[].cpv` | 金额 | CPV：每次阅读的花费，人民币元，蒲公英趋势图上的算法；没有时为 null。 | `compact` | 有 |
| `points[].shop_visit_cost` | 金额 | 外溢进店单价：笔记带来的每一位进店访客的花费，人民币元；没有时为 null。 | `compact` | 有 |
| `points[].median_impressions` | 整数 | 单篇笔记曝光数的中位数。 | `compact` | 有 |
| `points[].median_reads` | 整数 | 单篇笔记阅读数的中位数。 | `compact` | 有 |
| `points[].median_engagements` | 整数 | 单篇笔记互动数的中位数。 | `compact` | 有 |
| `points[].median_shop_visits` | 整数 | 单篇笔记带来的外溢进店人数的中位数；没有外溢进店的笔记算 0。 | `compact` | 有 |
| `approximate` | 对象列表 | 这一条里哪些数是约数或下限；都是准确值时不出现。 | `compact` | 有 |
| `approximate[].field` | 文本 | 字段的路径，如 metrics.views。 | `compact` | 有 |
| `approximate[].kind` | 文本 | 约数，还是下限。取值：`approximate`、`lower_bound`。 | `compact` | 有 |

某一条本来就没有这个值时，字段给 `null`。这个接口给不了的字段不出现，统一列在 `meta.unavailable`。

每条数据的典型体积：`compact` 6.2 KB、`standard` 6.2 KB、`full` 6.2 KB（按 2026-11-10 09:54 UTC 录下的那次返回量的）。

## 翻页

每次取一个对象，不翻页。

## 什么时候收费

| 情况 | 收费 |
| --- | --- |
| 返回了数据 | $0.0400，每次调用收一次 |
| 参数不合法、出错、超时 | 不收费 |
| 单次最高扣费 | $0.0400 (带 `X-Max-Price` 可以设自己的上限，超过就不执行) |

价格读取于 2026-11-28 06:28 UTC，按价目版本 30，2026-11-28 04:43 UTC 起生效；在 Playground 里运行前会再读一次当前价格。

## 对象不存在时

返回 404 `not_found`。报错里的 `charged` 和 `amount` 写明这次扣了多少。`reason` 写明是哪一种：`not_found`（不存在）或 `private_or_deleted`（私密或已删除）。

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
| 404 | `not_found` | 对象不存在、私密或已删除 | 以返回里的 charged 字段为准 | 不能 |
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
curl -G "https://api.dataxapi.com/v1/xiaohongshu/pgy/creators/costs/history" \
  --data-urlencode "id=5c0017ef6b58b740c92463fb" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
# pip install dataxapi
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.xiaohongshu.pgy.creators.costs.history(id="5c0017ef6b58b740c92463fb")
print(result["data"]["item"])
```

### TypeScript

```typescript
// npm i @dataxapi/sdk
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.xiaohongshu.pgy.creators.costs.history({ id: "5c0017ef6b58b740c92463fb" });
console.log(result.data.item);
```

### 命令行

```bash
dataxapi call xiaohongshu.pgy.creators.costs.history id=5c0017ef6b58b740c92463fb
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

把这段加进你的 MCP 客户端，然后让你的 AI 调用 `xiaohongshu.pgy.creators.costs.history`。

## 返回

### 200

取自 2026-11-10 09:54 UTC 录下的真实返回。名字、正文和编号是示例，链接也是，都不是录到的原文（页面不展示任何人的个人信息）；数字是原样。长列表做了截断。请求号、游标和余额是示意。

返回大小：标准档 6.5 KB（精简 6.5 KB，完整 6.5 KB）。

```jsonc
{
  "code": "ok",
  "request_id": "71c96749-f3f4-4d85-9452-3a5438bfa3ad",
  "data": {
    "item": {
      "creator_id": "6db7d6c4000000008ff2aa80",
      "days": 30,
      "currency": "CNY",
      "date": "2026-11-09T00:00:00Z",
      "cpm": "6.2482",
      "cpe": "0.8591",
      "cpv": "0.0153",
      "shop_visit_cost": null,
      "median_impressions": 4801380,
      "median_reads": 4570345,
      "median_engagements": 34920,
      "median_shop_visits": 0,
      "points": [
        {
          "date": "2026-10-11T00:00:00Z",
          "cpm": "4.4683",
          "cpe": "0.8324",
          "cpv": "0.0108",
          "shop_visit_cost": null,
          "median_impressions": 6713899,
          "median_reads": 6511479,
          "median_engagements": 36041,
          "median_shop_visits": 0
        },
        {
          "date": "2026-10-12T00:00:00Z",
          "cpm": "4.1886",
          "cpe": "0.5148",
          "cpv": "0.0104",
          "shop_visit_cost": null,
          "median_impressions": 7162338,
          "median_reads": 6749230,
          "median_engagements": 58279,
          "median_shop_visits": 0
        },
        // … 另有 28 条
      ]
    }
  },
  "warnings": [],
  "meta": {
    "capability": "xiaohongshu.pgy.creators.costs.history",
    "result_status": "complete",
    "fetched_at": "2026-11-10T09:54:34.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {},
    "billing": {
      "amount": "0.04",
      "currency": "USD",
      "balance_after": "9.96"
    }
  }
}
```

### 400

按规范写的示例，不是录下的返回。

```json
{
  "code": "invalid_params",
  "request_id": "21d26ffa-bd05-4652-99e6-ee5ccac9bc10",
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
  "request_id": "e1da7d40-e24f-4b81-aa5a-1d818a19fe38",
  "message": "The balance is too low",
  "message_zh": "余额不足",
  "charged": false,
  "retry": "after_fix",
  "retry_after_seconds": null,
  "param": null,
  "required": "0.04",
  "available": "0",
  "top_up_url": "https://dataxapi.com/console/billing/?amount=10",
  "next_step": "The balance does not cover this call ($0.04). Top up at top_up_url: $10 at least, about 250 calls at this price; Alipay or a card, and the balance never expires. Then send the same request again, unchanged. Nothing was charged for this one.",
  "next_step_zh": "余额不够这次调用（$0.04）。到 top_up_url 充值：最低 $10，按这次的价格约够 250 次；支付宝、银行卡都能付，余额不过期。到账后把同一个请求原样再发一次。这次没有扣钱。",
  "docs_url": "https://dataxapi.com/docs/errors#insufficient_balance"
}
```

### 404

按规范写的示例，不是录下的返回。

```json
{
  "code": "not_found",
  "request_id": "1c4a2d62-ed26-4322-a11a-d2e92641135e",
  "message": "The object does not exist, is private or was deleted",
  "message_zh": "对象不存在、私密或已删除",
  "charged": true,
  "amount": "0.04",
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
  "request_id": "2fd160d5-d54a-43c1-ba68-daa49122d658",
  "message": "No result came back this time and nothing was charged; retry shortly",
  "message_zh": "这次没有取到结果，没有扣费，可以稍后重试",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

[这份示例的 JSON 文件](https://dataxapi.com/apis/xiaohongshu/pgy/creators/costs/history.example.json)

## 在你的 AI 里用它

`dataxapi setup` 给这台电脑上的 AI 代理（Claude Code、Codex、Cursor）装好 DataXAPI 的 MCP 服务和基础技能。Key 从环境变量 DATAXAPI_API_KEY 读，不写进任何文件。

MCP 服务地址：`https://api.dataxapi.com/mcp`。你的客户端要填的配置在本页请求示例的“MCP”页签里；接好后让你的 AI 调用 `xiaohongshu.pgy.creators.costs.history`。

或者把这段话贴给任意一个 AI：

> 读一下 https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/costs/history.md，然后帮我用 DataXAPI 的接口 xiaohongshu.pgy.creators.costs.history（小红书蒲公英博主核心数据趋势）。

[在 ChatGPT 里打开](https://chatgpt.com/?q=%E8%AF%BB%E4%B8%80%E4%B8%8B%20https%3A%2F%2Fdataxapi.com%2Fzh%2Fapis%2Fxiaohongshu%2Fpgy%2Fcreators%2Fcosts%2Fhistory.md%EF%BC%8C%E7%84%B6%E5%90%8E%E5%B8%AE%E6%88%91%E7%94%A8%20DataXAPI%20%E7%9A%84%E6%8E%A5%E5%8F%A3%20xiaohongshu.pgy.creators.costs.history%EF%BC%88%E5%B0%8F%E7%BA%A2%E4%B9%A6%E8%92%B2%E5%85%AC%E8%8B%B1%E5%8D%9A%E4%B8%BB%E6%A0%B8%E5%BF%83%E6%95%B0%E6%8D%AE%E8%B6%8B%E5%8A%BF%EF%BC%89%E3%80%82) · [在 Claude 里打开](https://claude.ai/new?q=%E8%AF%BB%E4%B8%80%E4%B8%8B%20https%3A%2F%2Fdataxapi.com%2Fzh%2Fapis%2Fxiaohongshu%2Fpgy%2Fcreators%2Fcosts%2Fhistory.md%EF%BC%8C%E7%84%B6%E5%90%8E%E5%B8%AE%E6%88%91%E7%94%A8%20DataXAPI%20%E7%9A%84%E6%8E%A5%E5%8F%A3%20xiaohongshu.pgy.creators.costs.history%EF%BC%88%E5%B0%8F%E7%BA%A2%E4%B9%A6%E8%92%B2%E5%85%AC%E8%8B%B1%E5%8D%9A%E4%B8%BB%E6%A0%B8%E5%BF%83%E6%95%B0%E6%8D%AE%E8%B6%8B%E5%8A%BF%EF%BC%89%E3%80%82)

## 相关

这是 DataXAPI 达人数据的一部分。同一把 Key 还能用：社交媒体、广告、电商。

小红书蒲公英的接口：[小红书蒲公英关键词逐日搜索指数](https://dataxapi.com/zh/apis/xiaohongshu/pgy/keywords/history/)、[小红书蒲公英关联词](https://dataxapi.com/zh/apis/xiaohongshu/pgy/keywords/related/)、[小红书蒲公英博主搜索](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/search/)、[小红书蒲公英博主详情](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/get/)、[小红书蒲公英博主粉丝画像](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/audience/get/)、[小红书蒲公英博主数据表现](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/metrics/)、[小红书蒲公英博主笔记](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/notes/list/)、[小红书蒲公英博主粉丝趋势](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/followers/history/)、[小红书蒲公英相似博主](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/related/)、[小红书蒲公英内容广场热门笔记](https://dataxapi.com/zh/apis/xiaohongshu/pgy/notes/trending/)、[小红书蒲公英博主合作成本和数据概览](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/costs/metrics/)、[小红书蒲公英博主粉丝概览](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/followers/metrics/)、[小红书蒲公英博主核心数据趋势](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/costs/history/)、[小红书蒲公英笔记数据](https://dataxapi.com/zh/apis/xiaohongshu/pgy/notes/get/)

小红书的接口：[小红书图片搜索](https://dataxapi.com/zh/apis/xiaohongshu/images/search/)、[小红书笔记详情](https://dataxapi.com/zh/apis/xiaohongshu/notes/get/)、[小红书评论回复](https://dataxapi.com/zh/apis/xiaohongshu/comments/replies/list/)、[小红书笔记评论](https://dataxapi.com/zh/apis/xiaohongshu/notes/comments/list/)、[小红书笔记搜索](https://dataxapi.com/zh/apis/xiaohongshu/notes/search/)、[小红书话题笔记](https://dataxapi.com/zh/apis/xiaohongshu/topics/notes/list/)、[小红书话题详情](https://dataxapi.com/zh/apis/xiaohongshu/topics/get/)、[小红书热点](https://dataxapi.com/zh/apis/xiaohongshu/trends/list/)、[小红书用户资料](https://dataxapi.com/zh/apis/xiaohongshu/users/get/)、[小红书用户笔记](https://dataxapi.com/zh/apis/xiaohongshu/users/notes/list/)、[小红书用户搜索](https://dataxapi.com/zh/apis/xiaohongshu/users/search/)、[小红书搜索框联想词](https://dataxapi.com/zh/apis/xiaohongshu/keywords/related/)、[小红书视频笔记详情（视频地址和字幕）](https://dataxapi.com/zh/apis/xiaohongshu/videos/get/)、[小红书视频转文字（文案提取、逐字稿）](https://dataxapi.com/zh/apis/xiaohongshu/videos/transcript/get/)、[小红书无水印原图和实况图下载地址](https://dataxapi.com/zh/apis/xiaohongshu/notes/media/get/)、[小红书无水印视频下载地址（各档清晰度和字幕）](https://dataxapi.com/zh/apis/xiaohongshu/videos/media/get/)

小红书商城的接口：[小红书商品详情](https://dataxapi.com/zh/apis/xiaohongshu/shop/products/get/)、[小红书商品评价](https://dataxapi.com/zh/apis/xiaohongshu/shop/products/reviews/list/)、[小红书商品搜索](https://dataxapi.com/zh/apis/xiaohongshu/shop/products/search/)

怎么做和常见问题：[怎么查小红书博主的 CPM、互动单价和阅读单价？（2026）](https://dataxapi.com/zh/answers/xiaohongshu-creator-cpm-cost/)、[小红书“外溢进店单价”是什么，怎么查？（2026）](https://dataxapi.com/zh/answers/xiaohongshu-spillover-store-visit-cost/)、[小红书博主的 CPM 每天怎么变？蒲公英核心数据趋势怎么拿（2026）](https://dataxapi.com/zh/answers/xiaohongshu-creator-cpm-trend/)、[小红书蒲公英达人页上的每个数据，API 都能取到吗？逐项对照（2026）](https://dataxapi.com/zh/answers/xiaohongshu-pgy-creator-page-fields/)

相关：[小红书蒲公英的全部接口](https://dataxapi.com/zh/apis/xiaohongshu/pgy/)、[小红书的全部接口](https://dataxapi.com/zh/apis/xiaohongshu/)、[达人数据](https://dataxapi.com/zh/categories/creator/)、[蒲公英博主核心数据趋势对象的字段](https://dataxapi.com/zh/docs/objects/pgy_creator_cost_history/)

## 常见问题

### 小红书蒲公英博主核心数据趋势 API 多少钱？

$0.0400 一次。单次最高扣费 $0.0400。

### 什么情况下不收费？

出错和超时不收费。

### 对象不存在会怎样？

返回 404 not_found。报错里的 charged 和 amount 写明这次扣了多少。reason 写明是哪一种：not_found（不存在）或 private_or_deleted（私密或已删除）。

---

最后核对于 2026-11-28 06:28 UTC。目录修订号 ceced48b38f71468。 [网页版](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/costs/history/)
