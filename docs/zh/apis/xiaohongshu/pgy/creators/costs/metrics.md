# 小红书蒲公英博主合作成本和数据概览 API

按蒲公英博主编号取这位小红书博主的合作成本：图文和视频的预估 CPM、预估互动单价、预估阅读单价、预估外溢进店单价，每项都带优于多少同行；还有单篇笔记曝光、阅读、互动、外溢进店的中位数，近 30 天粉丝增长率和发布笔记数，邀约 48 小时回复率和“好联系”标记，近 7 天活跃天数和“活跃”标记，蒲公英标的优势，内容类型占比和合作过的行业。可看日常笔记或合作笔记两种口径。每次取一个对象；$0.0400 一次。出错和超时不收费。

- 地址：`GET https://api.dataxapi.com/v1/xiaohongshu/pgy/creators/costs/metrics`
- 编号：`xiaohongshu.pgy.creators.costs.metrics`
- 也叫：小红书蒲公英博主数据概览、蒲公英合作成本、小红书博主 CPM、蒲公英预估 CPM、小红书博主互动单价、小红书博主外溢进店单价、小红书博主阅读单价
- 价格：$0.0400 / 次
- 当前状态不写在这一页上（页面是快照），实时读：`GET https://api.dataxapi.com/v1/catalog/status`
- 返回：1 个对象, 一个蒲公英博主合作成本和数据概览对象
- 返回蒲公英博主合作成本和数据概览，预览结构，以后可能调整
- [在 Playground 里跑一次](https://dataxapi.com/zh/console/playground/?capability=xiaohongshu.pgy.creators.costs.metrics&params=%7B%22id%22%3A%225c0017ef6b58b740c92463fb%22%7D)
- 英文名：[Xiaohongshu PGY creator costs and data summary API](https://dataxapi.com/apis/xiaohongshu/pgy/creators/costs/metrics/)

## 能拿到什么

2026-11-10 09:54 UTC 录下的真实返回，这里是前 2 行。

| share |
| --- |
| 39.5% |
| 39.5% |

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | 文本 | 是 | 蒲公英博主编号，24 位十六进制；从蒲公英博主搜索的结果里取。示例：`5c0017ef6b58b740c92463fb`。 |
| `tab` | 文本 |  | 看哪一类笔记的数：everyday 是日常笔记，sponsored 是合作笔记（商单）；默认 everyday，和蒲公英博主页上的两个分栏一样。取值：`everyday`（默认）、`sponsored`。示例：`sponsored`。 |
| `view` | 文本 |  | 返回档位。三档价格相同。取值：`compact`、`standard`（默认）、`full`。 |
| `fields` | 文本列表 |  | 只要这些字段。按路径写，例如 `author.name`。 |

## 返回字段

`data.item` 是一个蒲公英博主合作成本和数据概览对象。预览：结构可能调整，改之前会公告。

返回分三档：精简 `compact`（最常用的字段，长文本截短）、标准 `standard`（默认，全部标准字段）、完整 `full`（再加 `ext`，也就是这个平台特有的字段）。字段从表里写的那一档起出现，更大的档位也带。

| 字段 | 类型 | 说明 | 起始档位 | 这个接口 |
| --- | --- | --- | --- | --- |
| `creator_id` | 文本 | 蒲公英博主编号。 | `compact` | 有 |
| `date` | 时间 | 数据算到哪一天：中国时间（UTC+8）的一个自然日，写成这个日期的 UTC 零点。 | `compact` | 有 |
| `currency` | 文本 | 下面各项单价的货币。 | `compact` | 有 |
| `image_cpm` | 金额 | 图文笔记的预估 CPM（每千次曝光的花费），人民币元；蒲公英没有估出来时为 null。 | `compact` | 有 |
| `image_cpm_percentile` | 数字 | 图文预估 CPM低于多少同类博主（蒲公英的“优于同行”），0 到 1。 | `standard` | 有 |
| `video_cpm` | 金额 | 视频笔记的预估 CPM（每千次曝光的花费），人民币元；蒲公英没有估出来时为 null。 | `compact` | 有 |
| `video_cpm_percentile` | 数字 | 视频预估 CPM低于多少同类博主（蒲公英的“优于同行”），0 到 1。 | `standard` | 有 |
| `image_cpe` | 金额 | 图文笔记的预估互动单价（每次互动的花费），人民币元；蒲公英没有估出来时为 null。 | `compact` | 有 |
| `image_cpe_percentile` | 数字 | 图文预估互动单价低于多少同类博主（蒲公英的“优于同行”），0 到 1。 | `standard` | 有 |
| `video_cpe` | 金额 | 视频笔记的预估互动单价（每次互动的花费），人民币元；蒲公英没有估出来时为 null。 | `compact` | 有 |
| `video_cpe_percentile` | 数字 | 视频预估互动单价低于多少同类博主（蒲公英的“优于同行”），0 到 1。 | `standard` | 有 |
| `image_read_cost` | 金额 | 图文笔记的预估阅读单价（每次阅读的花费），人民币元；蒲公英没有估出来时为 null。 | `compact` | 有 |
| `image_read_cost_percentile` | 数字 | 图文预估阅读单价低于多少同类博主（蒲公英的“优于同行”），0 到 1。 | `standard` | 有 |
| `video_read_cost` | 金额 | 视频笔记的预估阅读单价（每次阅读的花费），人民币元；蒲公英没有估出来时为 null。 | `compact` | 有 |
| `video_read_cost_percentile` | 数字 | 视频预估阅读单价低于多少同类博主（蒲公英的“优于同行”），0 到 1。 | `standard` | 有 |
| `image_shop_visit_cost` | 金额 | 图文笔记的预估外溢进店单价（笔记带来的每一位进店访客的花费），人民币元；蒲公英没有估出来时为 null。 | `compact` | 有 |
| `image_shop_visit_cost_percentile` | 数字 | 图文预估外溢进店单价低于多少同类博主（蒲公英的“优于同行”），0 到 1。 | `standard` | 有 |
| `video_shop_visit_cost` | 金额 | 视频笔记的预估外溢进店单价（笔记带来的每一位进店访客的花费），人民币元；蒲公英没有估出来时为 null。 | `compact` | 有 |
| `video_shop_visit_cost_percentile` | 数字 | 视频预估外溢进店单价低于多少同类博主（蒲公英的“优于同行”），0 到 1。 | `standard` | 有 |
| `median_impressions` | 整数 | 单篇笔记曝光数的中位数。 | `compact` | 有 |
| `median_impressions_percentile` | 数字 | 曝光中位数超过了多少同类博主，0 到 1。 | `standard` | 有 |
| `median_reads` | 整数 | 单篇笔记阅读数的中位数。 | `compact` | 有 |
| `median_reads_percentile` | 数字 | 阅读中位数超过了多少同类博主，0 到 1。 | `standard` | 有 |
| `median_engagements` | 整数 | 单篇笔记互动数的中位数。 | `compact` | 有 |
| `median_engagements_percentile` | 数字 | 互动中位数超过了多少同类博主，0 到 1。 | `standard` | 有 |
| `median_shop_visits` | 整数 | 单篇笔记带来的外溢进店人数的中位数。 | `compact` | 有 |
| `median_shop_visits_percentile` | 数字 | 外溢进店中位数超过了多少同类博主，0 到 1。 | `standard` | 有 |
| `follower_growth` | 数字 | 近 30 天粉丝增长率：0.037 是涨了 3.7%，掉粉时为负。 | `standard` | 有 |
| `follower_growth_percentile` | 数字 | 近 30 天粉丝增长率超过了多少同类博主，0 到 1。 | `standard` | 有 |
| `invite_reply_rate` | 数字 | 合作邀约在 48 小时内回复的比例，0 到 1。 | `standard` | 有 |
| `easy_to_reach` | 是否 | 蒲公英是否给这位博主标了“好联系”（页面上邀约回复率旁的标记）。 | `standard` | 有 |
| `active_days_7d` | 整数 | 近 7 天里活跃的天数。 | `standard` | 有 |
| `is_active` | 是否 | 蒲公英是否给这位博主标了“活跃”（页面上近 7 天活跃天数旁的标记）。 | `standard` | 有 |
| `notes_30d` | 整数 | 近 30 天发布的笔记数，日常笔记和合作笔记都算（页面上的“发布笔记”），不随 tab 变。 | `standard` | 有 |
| `highlight` | 文本 | 蒲公英给这位博主标的优势，平台的原话（一种博主类型的称号）；没有时为 null。 | `standard` | 有 |
| `highlight_reason` | 文本 | 这个优势的说明，平台的原话（如某项指标排在同行的前百分之几）。 | `standard` | 有 |
| `content_mix` | 对象列表 | 笔记的内容类型占比，占比高的在前。 | `standard` | 有 |
| `content_mix[].category` | 文本 | 内容类型，平台的原话。 | `standard` | 有 |
| `content_mix[].share` | 数字 | 占比，0 到 1。 | `standard` | 有 |
| `industries` | 文本列表 | 合作过的行业，平台的原话。 | `standard` | 有 |
| `approximate` | 对象列表 | 这一条里哪些数是约数或下限；都是准确值时不出现。 | `compact` | 有 |
| `approximate[].field` | 文本 | 字段的路径，如 metrics.views。 | `compact` | 有 |
| `approximate[].kind` | 文本 | 约数，还是下限。取值：`approximate`、`lower_bound`。 | `compact` | 有 |

某一条本来就没有这个值时，字段给 `null`。这个接口给不了的字段不出现，统一列在 `meta.unavailable`。

每条数据的典型体积：`compact` 389 B、`standard` 1.1 KB、`full` 1.1 KB（按 2026-11-10 09:54 UTC 录下的那次返回量的）。

## 翻页

每次取一个对象，不翻页。

## 什么时候收费

| 情况 | 收费 |
| --- | --- |
| 返回了数据 | $0.0400，每次调用收一次 |
| 参数不合法、出错、超时 | 不收费 |
| 单次最高扣费 | $0.0400 (带 `X-Max-Price` 可以设自己的上限，超过就不执行) |

价格读取于 2026-11-26 12:17 UTC，按价目版本 22，2026-11-25 13:46 UTC 起生效；在 Playground 里运行前会再读一次当前价格。

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
curl -G "https://api.dataxapi.com/v1/xiaohongshu/pgy/creators/costs/metrics" \
  --data-urlencode "id=5c0017ef6b58b740c92463fb" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
# pip install dataxapi
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.xiaohongshu.pgy.creators.costs.metrics(id="5c0017ef6b58b740c92463fb")
print(result["data"]["item"])
```

### TypeScript

```typescript
// npm i @dataxapi/sdk
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.xiaohongshu.pgy.creators.costs.metrics({ id: "5c0017ef6b58b740c92463fb" });
console.log(result.data.item);
```

### 命令行

```bash
dataxapi call xiaohongshu.pgy.creators.costs.metrics id=5c0017ef6b58b740c92463fb
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

把这段加进你的 MCP 客户端，然后让你的 AI 调用 `xiaohongshu.pgy.creators.costs.metrics`。

## 返回

### 200

取自 2026-11-10 09:54 UTC 录下的真实返回。名字、正文和编号是示例，链接也是，都不是录到的原文（页面不展示任何人的个人信息）；数字是原样。长列表做了截断。请求号、游标和余额是示意。

返回大小：标准档 1.5 KB（精简 725 B，完整 1.5 KB）。

```jsonc
{
  "code": "ok",
  "request_id": "bb971f60-5fe0-4bb2-b564-1a4e97a63ada",
  "data": {
    "item": {
      "creator_id": "64b916ab000000009bfb830e",
      "date": "2026-11-09T00:00:00Z",
      "currency": "CNY",
      "image_cpm": "1202.709",
      "image_cpm_percentile": 0.0998,
      "video_cpm": "11556.0641",
      "video_cpm_percentile": 0.0188,
      "image_cpe": "572.2222",
      "image_cpe_percentile": 0.0227,
      "video_cpe": "214.5833",
      "video_cpe_percentile": 0.0411,
      "image_read_cost": "25.2377",
      "image_read_cost_percentile": 0.7452,
      "video_read_cost": "76.313",
      "video_read_cost_percentile": 0.7667,
      "image_shop_visit_cost": null,
      "image_shop_visit_cost_percentile": null,
      "video_shop_visit_cost": null,
      "video_shop_visit_cost_percentile": null,
      "median_impressions": 2200,
      "median_impressions_percentile": 0.4551,
      "median_reads": 302,
      "median_reads_percentile": 0.4167,
      "median_engagements": 22,
      "median_engagements_percentile": 0.4319,
      "median_shop_visits": 0,
      "median_shop_visits_percentile": 0,
      "follower_growth": 0.001,
      "follower_growth_percentile": 0.683,
      "invite_reply_rate": 0.375,
      "easy_to_reach": false,
      "active_days_7d": 7,
      "is_active": true,
      "notes_30d": 38,
      "highlight": "周末的周末露营日常，随手记录一下",
      "highlight_reason": "周末露营｜第一次尝试就爱上了，清单放评论区",
      "content_mix": [
        { "category": "周末露营｜第一次尝试就爱上了，清单放评论区", "share": 0.395 },
        { "category": "周末露营这件事，越简单越好", "share": 0.395 }
      ],
      "industries": []
    }
  },
  "warnings": [],
  "meta": {
    "capability": "xiaohongshu.pgy.creators.costs.metrics",
    "result_status": "complete",
    "fetched_at": "2026-11-10T09:54:23.000Z",
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
  "request_id": "784288a1-306a-466e-afbc-f2a691cf902b",
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
  "request_id": "ca5577ef-d28d-4551-9a4a-dd2fd55c92cb",
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
  "request_id": "7db2bd90-e442-4554-8391-1ec7cba882fd",
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
  "request_id": "43171eb8-84c2-4553-a585-01db0a83409a",
  "message": "No result came back this time and nothing was charged; retry shortly",
  "message_zh": "这次没有取到结果，没有扣费，可以稍后重试",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

[这份示例的 JSON 文件](https://dataxapi.com/apis/xiaohongshu/pgy/creators/costs/metrics.example.json)

## 在你的 AI 里用它

`dataxapi setup` 给这台电脑上的 AI 代理（Claude Code、Codex、Cursor）装好 DataXAPI 的 MCP 服务和基础技能。Key 从环境变量 DATAXAPI_API_KEY 读，不写进任何文件。

MCP 服务地址：`https://api.dataxapi.com/mcp`。你的客户端要填的配置在本页请求示例的“MCP”页签里；接好后让你的 AI 调用 `xiaohongshu.pgy.creators.costs.metrics`。

或者把这段话贴给任意一个 AI：

> 读一下 https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/costs/metrics.md，然后帮我用 DataXAPI 的接口 xiaohongshu.pgy.creators.costs.metrics（小红书蒲公英博主合作成本和数据概览）。

[在 ChatGPT 里打开](https://chatgpt.com/?q=%E8%AF%BB%E4%B8%80%E4%B8%8B%20https%3A%2F%2Fdataxapi.com%2Fzh%2Fapis%2Fxiaohongshu%2Fpgy%2Fcreators%2Fcosts%2Fmetrics.md%EF%BC%8C%E7%84%B6%E5%90%8E%E5%B8%AE%E6%88%91%E7%94%A8%20DataXAPI%20%E7%9A%84%E6%8E%A5%E5%8F%A3%20xiaohongshu.pgy.creators.costs.metrics%EF%BC%88%E5%B0%8F%E7%BA%A2%E4%B9%A6%E8%92%B2%E5%85%AC%E8%8B%B1%E5%8D%9A%E4%B8%BB%E5%90%88%E4%BD%9C%E6%88%90%E6%9C%AC%E5%92%8C%E6%95%B0%E6%8D%AE%E6%A6%82%E8%A7%88%EF%BC%89%E3%80%82) · [在 Claude 里打开](https://claude.ai/new?q=%E8%AF%BB%E4%B8%80%E4%B8%8B%20https%3A%2F%2Fdataxapi.com%2Fzh%2Fapis%2Fxiaohongshu%2Fpgy%2Fcreators%2Fcosts%2Fmetrics.md%EF%BC%8C%E7%84%B6%E5%90%8E%E5%B8%AE%E6%88%91%E7%94%A8%20DataXAPI%20%E7%9A%84%E6%8E%A5%E5%8F%A3%20xiaohongshu.pgy.creators.costs.metrics%EF%BC%88%E5%B0%8F%E7%BA%A2%E4%B9%A6%E8%92%B2%E5%85%AC%E8%8B%B1%E5%8D%9A%E4%B8%BB%E5%90%88%E4%BD%9C%E6%88%90%E6%9C%AC%E5%92%8C%E6%95%B0%E6%8D%AE%E6%A6%82%E8%A7%88%EF%BC%89%E3%80%82)

## 相关

这是 DataXAPI 达人数据的一部分。同一把 Key 还能用：社交媒体、广告、电商。

小红书蒲公英的接口：[小红书蒲公英关键词逐日搜索指数](https://dataxapi.com/zh/apis/xiaohongshu/pgy/keywords/history/)、[小红书蒲公英关联词](https://dataxapi.com/zh/apis/xiaohongshu/pgy/keywords/related/)、[小红书蒲公英博主搜索](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/search/)、[小红书蒲公英博主详情](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/get/)、[小红书蒲公英博主粉丝画像](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/audience/get/)、[小红书蒲公英博主数据表现](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/metrics/)、[小红书蒲公英博主笔记](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/notes/list/)、[小红书蒲公英博主粉丝趋势](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/followers/history/)、[小红书蒲公英相似博主](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/related/)、[小红书蒲公英内容广场热门笔记](https://dataxapi.com/zh/apis/xiaohongshu/pgy/notes/trending/)、[小红书蒲公英博主合作成本和数据概览](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/costs/metrics/)、[小红书蒲公英博主粉丝概览](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/followers/metrics/)、[小红书蒲公英博主核心数据趋势](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/costs/history/)、[小红书蒲公英笔记数据](https://dataxapi.com/zh/apis/xiaohongshu/pgy/notes/get/)

小红书的接口：[小红书图片搜索](https://dataxapi.com/zh/apis/xiaohongshu/images/search/)、[小红书笔记详情](https://dataxapi.com/zh/apis/xiaohongshu/notes/get/)、[小红书评论回复](https://dataxapi.com/zh/apis/xiaohongshu/comments/replies/list/)、[小红书笔记评论](https://dataxapi.com/zh/apis/xiaohongshu/notes/comments/list/)、[小红书笔记搜索](https://dataxapi.com/zh/apis/xiaohongshu/notes/search/)、[小红书话题笔记](https://dataxapi.com/zh/apis/xiaohongshu/topics/notes/list/)、[小红书话题详情](https://dataxapi.com/zh/apis/xiaohongshu/topics/get/)、[小红书热点](https://dataxapi.com/zh/apis/xiaohongshu/trends/list/)、[小红书用户资料](https://dataxapi.com/zh/apis/xiaohongshu/users/get/)、[小红书用户笔记](https://dataxapi.com/zh/apis/xiaohongshu/users/notes/list/)、[小红书用户搜索](https://dataxapi.com/zh/apis/xiaohongshu/users/search/)、[小红书搜索框联想词](https://dataxapi.com/zh/apis/xiaohongshu/keywords/related/)、[小红书视频笔记详情（视频地址和字幕）](https://dataxapi.com/zh/apis/xiaohongshu/videos/get/)、[小红书视频转文字（文案提取、逐字稿）](https://dataxapi.com/zh/apis/xiaohongshu/videos/transcript/get/)、[小红书无水印原图和实况图下载地址](https://dataxapi.com/zh/apis/xiaohongshu/notes/media/get/)、[小红书无水印视频下载地址（各档清晰度和字幕）](https://dataxapi.com/zh/apis/xiaohongshu/videos/media/get/)

小红书商城的接口：[小红书商品详情](https://dataxapi.com/zh/apis/xiaohongshu/shop/products/get/)、[小红书商品评价](https://dataxapi.com/zh/apis/xiaohongshu/shop/products/reviews/list/)、[小红书商品搜索](https://dataxapi.com/zh/apis/xiaohongshu/shop/products/search/)

怎么做和常见问题：[怎么查小红书博主的 CPM、互动单价和阅读单价？（2026）](https://dataxapi.com/zh/answers/xiaohongshu-creator-cpm-cost/)、[小红书“外溢进店单价”是什么，怎么查？（2026）](https://dataxapi.com/zh/answers/xiaohongshu-spillover-store-visit-cost/)、[小红书博主的 CPM 每天怎么变？蒲公英核心数据趋势怎么拿（2026）](https://dataxapi.com/zh/answers/xiaohongshu-creator-cpm-trend/)、[MCN 和品牌怎么批量给小红书博主选号、建达人库？（2026）](https://dataxapi.com/zh/answers/xiaohongshu-kol-selection-api/)、[小红书蒲公英达人页上的每个数据，API 都能取到吗？逐项对照（2026）](https://dataxapi.com/zh/answers/xiaohongshu-pgy-creator-page-fields/)、[怎么看小红书博主好不好联系、活不活跃？（2026）](https://dataxapi.com/zh/answers/xiaohongshu-creator-easy-to-reach-active/)、[蒲公英找博主的筛选条件，能用 API 调吗？（2026）](https://dataxapi.com/zh/answers/xiaohongshu-pgy-find-creator-filters-api/)、[小红书美妆护肤博主怎么批量筛：按类目、粉丝、报价、CPM、近期合作行业（2026）](https://dataxapi.com/zh/answers/xiaohongshu-beauty-skincare-creators/)、[小红书蒲公英和星图的区别？两边的达人数据怎么对着看（2026）](https://dataxapi.com/zh/answers/xiaohongshu-pgy-vs-douyin-xingtu/)

相关：[小红书蒲公英的全部接口](https://dataxapi.com/zh/apis/xiaohongshu/pgy/)、[小红书的全部接口](https://dataxapi.com/zh/apis/xiaohongshu/)、[达人数据](https://dataxapi.com/zh/categories/creator/)、[蒲公英博主合作成本和数据概览对象的字段](https://dataxapi.com/zh/docs/objects/pgy_creator_costs/)

## 常见问题

### 小红书蒲公英博主合作成本和数据概览 API 多少钱？

$0.0400 一次。单次最高扣费 $0.0400。

### 什么情况下不收费？

出错和超时不收费。

### 对象不存在会怎样？

返回 404 not_found。报错里的 charged 和 amount 写明这次扣了多少。reason 写明是哪一种：not_found（不存在）或 private_or_deleted（私密或已删除）。

---

最后核对于 2026-11-26 12:17 UTC。目录修订号 0051cce45e9530b9。 [网页版](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/costs/metrics/)
