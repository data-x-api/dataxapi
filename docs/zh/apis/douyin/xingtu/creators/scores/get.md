# 抖音星图达人星图指数 API

按星图达人编号取星图给这位抖音达人打的六项指数：星图指数（综合）和传播、种草、转化、合作、性价比五个分项，每项带得分、同类达人的平均分、名次和名次排在前多大比例。每次取一个对象；$0.0080 一次。出错和超时不收费。

- 地址：`GET https://api.dataxapi.com/v1/douyin/xingtu/creators/scores/get`
- 编号：`douyin.xingtu.creators.scores.get`
- 也叫：星图指数、达人传播指数、达人种草指数、达人性价比指数、达人合作指数
- 价格：$0.0080 / 次
- 当前状态不写在这一页上（页面是快照），实时读：`GET https://api.dataxapi.com/v1/catalog/status`
- 返回：1 个对象, 一个星图达人指数对象
- 返回星图达人指数，预览结构，以后可能调整
- [在 Playground 里跑一次](https://dataxapi.com/zh/console/playground/?capability=douyin.xingtu.creators.scores.get&params=%7B%22id%22%3A%226763236383382306828%22%7D)
- 英文名：[Douyin Xingtu creator index scores API](https://dataxapi.com/apis/douyin/xingtu/creators/scores/get/)

## 能拿到什么

2026-10-13 03:26 UTC 录下的真实返回，这里是前 8 行。

| 字段 | 值 |
| --- | --- |
| overall.score | 90.9 |
| overall.average | 56.2 |
| overall.rank | 12 |
| overall.rank_share | 0 |
| reach.score | 98.77 |
| reach.average | 53.08 |
| reach.rank | 232 |
| reach.rank_share | 0.0% |

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | 文本 | 是 | 星图达人编号，一串数字；不是抖音账号编号，从星图达人搜索的结果里取。示例：`6763236383382306828`。 |
| `view` | 文本 |  | 返回档位。三档价格相同。取值：`compact`、`standard`（默认）、`full`。 |
| `fields` | 文本列表 |  | 只要这些字段。按路径写，例如 `author.name`。 |

## 返回字段

`data.item` 是一个星图达人指数对象。预览：结构可能调整，改之前会公告。

返回分三档：精简 `compact`（最常用的字段，长文本截短）、标准 `standard`（默认，全部标准字段）、完整 `full`（再加 `ext`，也就是这个平台特有的字段）。字段从表里写的那一档起出现，更大的档位也带。

| 字段 | 类型 | 说明 | 起始档位 | 这个接口 |
| --- | --- | --- | --- | --- |
| `creator_id` | 文本 | 星图达人编号。 | `compact` | 有 |
| `overall` | 对象 | 星图指数（综合）。 | `compact` | 有 |
| `overall.score` | 数字 | 得分，0 到 100。 | `compact` | 有 |
| `overall.average` | 数字 | 同类达人这一项的平均分。 | `compact` | 有 |
| `overall.rank` | 整数 | 这一项的名次，1 是最高。 | `compact` | 有 |
| `overall.rank_share` | 数字 | 名次排在前多大比例，0 到 1：0.05 是前 5%。保留四位小数，名次在前一百名左右的是 0。 | `compact` | 有 |
| `reach` | 对象 | 传播指数。 | `compact` | 有 |
| `reach.score` | 数字 | 得分，0 到 100。 | `compact` | 有 |
| `reach.average` | 数字 | 同类达人这一项的平均分。 | `compact` | 有 |
| `reach.rank` | 整数 | 这一项的名次，1 是最高。 | `compact` | 有 |
| `reach.rank_share` | 数字 | 名次排在前多大比例，0 到 1：0.05 是前 5%。保留四位小数，名次在前一百名左右的是 0。 | `compact` | 有 |
| `seeding` | 对象 | 种草指数。 | `compact` | 有 |
| `seeding.score` | 数字 | 得分，0 到 100。 | `compact` | 有 |
| `seeding.average` | 数字 | 同类达人这一项的平均分。 | `compact` | 有 |
| `seeding.rank` | 整数 | 这一项的名次，1 是最高。 | `compact` | 有 |
| `seeding.rank_share` | 数字 | 名次排在前多大比例，0 到 1：0.05 是前 5%。保留四位小数，名次在前一百名左右的是 0。 | `compact` | 有 |
| `conversion` | 对象 | 转化指数。 | `compact` | 有 |
| `conversion.score` | 数字 | 得分，0 到 100。 | `compact` | 有 |
| `conversion.average` | 数字 | 同类达人这一项的平均分。 | `compact` | 有 |
| `conversion.rank` | 整数 | 这一项的名次，1 是最高。 | `compact` | 有 |
| `conversion.rank_share` | 数字 | 名次排在前多大比例，0 到 1：0.05 是前 5%。保留四位小数，名次在前一百名左右的是 0。 | `compact` | 有 |
| `cooperation` | 对象 | 合作指数。 | `compact` | 有 |
| `cooperation.score` | 数字 | 得分，0 到 100。 | `compact` | 有 |
| `cooperation.average` | 数字 | 同类达人这一项的平均分。 | `compact` | 有 |
| `cooperation.rank` | 整数 | 这一项的名次，1 是最高。 | `compact` | 有 |
| `cooperation.rank_share` | 数字 | 名次排在前多大比例，0 到 1：0.05 是前 5%。保留四位小数，名次在前一百名左右的是 0。 | `compact` | 有 |
| `value_for_money` | 对象 | 性价比指数。 | `compact` | 有 |
| `value_for_money.score` | 数字 | 得分，0 到 100。 | `compact` | 有 |
| `value_for_money.average` | 数字 | 同类达人这一项的平均分。 | `compact` | 有 |
| `value_for_money.rank` | 整数 | 这一项的名次，1 是最高。 | `compact` | 有 |
| `value_for_money.rank_share` | 数字 | 名次排在前多大比例，0 到 1：0.05 是前 5%。保留四位小数，名次在前一百名左右的是 0。 | `compact` | 有 |
| `approximate` | 对象列表 | 这一条里哪些数是约数或下限；都是准确值时不出现。 | `compact` | 有 |
| `approximate[].field` | 文本 | 字段的路径，如 metrics.views。 | `compact` | 有 |
| `approximate[].kind` | 文本 | 约数，还是下限。取值：`approximate`、`lower_bound`。 | `compact` | 有 |

某一条本来就没有这个值时，字段给 `null`。这个接口给不了的字段不出现，统一列在 `meta.unavailable`。

每条数据的典型体积：`compact` 483 B、`standard` 483 B、`full` 483 B（按 2026-10-13 03:26 UTC 录下的那次返回量的）。

## 翻页

每次取一个对象，不翻页。

## 什么时候收费

| 情况 | 收费 |
| --- | --- |
| 返回了数据 | $0.0080，每次调用收一次 |
| 参数不合法、出错、超时 | 不收费 |
| 单次最高扣费 | $0.0080 (带 `X-Max-Price` 可以设自己的上限，超过就不执行) |

价格读取于 2026-11-21 08:32 UTC，按价目版本 19，2026-11-17 18:04 UTC 起生效；在 Playground 里运行前会再读一次当前价格。

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
curl -G "https://api.dataxapi.com/v1/douyin/xingtu/creators/scores/get" \
  --data-urlencode "id=6763236383382306828" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
# pip install dataxapi
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.douyin.xingtu.creators.scores.get(id="6763236383382306828")
print(result["data"]["item"])
```

### TypeScript

```typescript
// npm i @dataxapi/sdk
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.douyin.xingtu.creators.scores.get({ id: "6763236383382306828" });
console.log(result.data.item);
```

### 命令行

```bash
dataxapi call douyin.xingtu.creators.scores.get id=6763236383382306828
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

把这段加进你的 MCP 客户端，然后让你的 AI 调用 `douyin.xingtu.creators.scores.get`。

## 返回

### 200

取自 2026-10-13 03:26 UTC 录下的真实返回。名字、正文和编号是示例，链接也是，都不是录到的原文（页面不展示任何人的个人信息）；数字是原样。长列表做了截断。请求号、游标和余额是示意。

返回大小：标准档 814 B（精简 814 B，完整 814 B）。

```jsonc
{
  "code": "ok",
  "request_id": "f2d1af74-2a15-4c05-aef0-5bcb35163b02",
  "data": {
    "item": {
      "creator_id": "6119837728404143577",
      "overall": {
        "score": 90.9,
        "average": 56.2,
        "rank": 12,
        "rank_share": 0
      },
      "reach": {
        "score": 98.77,
        "average": 53.08,
        "rank": 232,
        "rank_share": 0.0001
      },
      "seeding": {
        "score": 98.68,
        "average": 53.26,
        "rank": 280,
        "rank_share": 0.0001
      },
      "conversion": {
        "score": 98.92,
        "average": 55.24,
        "rank": 164,
        "rank_share": 0.0001
      },
      "cooperation": {
        "score": 89.49,
        "average": 75.55,
        "rank": 1038,
        "rank_share": 0.0005
      },
      "value_for_money": {
        "score": 68.64,
        "average": 64.09,
        "rank": 50209,
        "rank_share": 0.023
      }
    }
  },
  "warnings": [],
  "meta": {
    "capability": "douyin.xingtu.creators.scores.get",
    "result_status": "complete",
    "fetched_at": "2026-10-13T03:26:38.000Z",
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

### 400

按规范写的示例，不是录下的返回。

```json
{
  "code": "invalid_params",
  "request_id": "b4008802-2387-4a58-8b52-7ab6a8ddd85c",
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
  "request_id": "c136972f-bb16-4945-88fe-2ebe740c804a",
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

### 404

按规范写的示例，不是录下的返回。

```json
{
  "code": "not_found",
  "request_id": "98b4efe0-93e6-47f7-8c29-d115651d73b2",
  "message": "The object does not exist, is private or was deleted",
  "message_zh": "对象不存在、私密或已删除",
  "charged": true,
  "amount": "0.008",
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
  "request_id": "c0af0760-7022-4a90-9007-3cfb2cde24aa",
  "message": "No result came back this time and nothing was charged; retry shortly",
  "message_zh": "这次没有取到结果，没有扣费，可以稍后重试",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

这份录制的返回：平台原始 JSON 550 token，DataXAPI 的 JSON 274 token，AI 通过 DataXAPI 的 MCP 读到 222 token，少 60%（2026-11-06 统计）。

[这份示例的 JSON 文件](https://dataxapi.com/apis/douyin/xingtu/creators/scores/get.example.json)

## 在你的 AI 里用它

`dataxapi setup` 给这台电脑上的 AI 代理（Claude Code、Codex、Cursor）装好 DataXAPI 的 MCP 服务和基础技能。Key 从环境变量 DATAXAPI_API_KEY 读，不写进任何文件。

MCP 服务地址：`https://api.dataxapi.com/mcp`。你的客户端要填的配置在本页请求示例的“MCP”页签里；接好后让你的 AI 调用 `douyin.xingtu.creators.scores.get`。

或者把这段话贴给任意一个 AI：

> 读一下 https://dataxapi.com/zh/apis/douyin/xingtu/creators/scores/get.md，然后帮我用 DataXAPI 的接口 douyin.xingtu.creators.scores.get（抖音星图达人星图指数）。

[在 ChatGPT 里打开](https://chatgpt.com/?q=%E8%AF%BB%E4%B8%80%E4%B8%8B%20https%3A%2F%2Fdataxapi.com%2Fzh%2Fapis%2Fdouyin%2Fxingtu%2Fcreators%2Fscores%2Fget.md%EF%BC%8C%E7%84%B6%E5%90%8E%E5%B8%AE%E6%88%91%E7%94%A8%20DataXAPI%20%E7%9A%84%E6%8E%A5%E5%8F%A3%20douyin.xingtu.creators.scores.get%EF%BC%88%E6%8A%96%E9%9F%B3%E6%98%9F%E5%9B%BE%E8%BE%BE%E4%BA%BA%E6%98%9F%E5%9B%BE%E6%8C%87%E6%95%B0%EF%BC%89%E3%80%82) · [在 Claude 里打开](https://claude.ai/new?q=%E8%AF%BB%E4%B8%80%E4%B8%8B%20https%3A%2F%2Fdataxapi.com%2Fzh%2Fapis%2Fdouyin%2Fxingtu%2Fcreators%2Fscores%2Fget.md%EF%BC%8C%E7%84%B6%E5%90%8E%E5%B8%AE%E6%88%91%E7%94%A8%20DataXAPI%20%E7%9A%84%E6%8E%A5%E5%8F%A3%20douyin.xingtu.creators.scores.get%EF%BC%88%E6%8A%96%E9%9F%B3%E6%98%9F%E5%9B%BE%E8%BE%BE%E4%BA%BA%E6%98%9F%E5%9B%BE%E6%8C%87%E6%95%B0%EF%BC%89%E3%80%82)

## 相关

这是 DataXAPI 达人数据的一部分。同一把 Key 还能用：社交媒体、广告、电商。

抖音星图的接口：[抖音星图达人商业报价](https://dataxapi.com/zh/apis/douyin/xingtu/creators/rates/get/)、[抖音星图达人搜索](https://dataxapi.com/zh/apis/douyin/xingtu/creators/search/)、[抖音星图达人资料](https://dataxapi.com/zh/apis/douyin/xingtu/creators/get/)、[抖音星图达人粉丝画像](https://dataxapi.com/zh/apis/douyin/xingtu/creators/audience/get/)、[抖音星图达人传播数据](https://dataxapi.com/zh/apis/douyin/xingtu/creators/metrics/)、[抖音星图达人作品表现](https://dataxapi.com/zh/apis/douyin/xingtu/creators/videos/list/)、[抖音星图达人内容热词](https://dataxapi.com/zh/apis/douyin/xingtu/creators/keywords/get/)、[抖音星图达人星图指数](https://dataxapi.com/zh/apis/douyin/xingtu/creators/scores/get/)、[抖音星图达人内容分布](https://dataxapi.com/zh/apis/douyin/xingtu/creators/content_mix/get/)、[抖音星图达人转化能力](https://dataxapi.com/zh/apis/douyin/xingtu/creators/conversion/get/)、[抖音星图营销活动日历](https://dataxapi.com/zh/apis/douyin/xingtu/campaigns/list/)、[抖音星图视频数据报告（播放量、完播率）](https://dataxapi.com/zh/apis/douyin/xingtu/videos/get/)

抖音的接口：[抖音评论回复](https://dataxapi.com/zh/apis/douyin/comments/replies/list/)、[抖音话题视频](https://dataxapi.com/zh/apis/douyin/hashtags/videos/list/)、[抖音热榜](https://dataxapi.com/zh/apis/douyin/trends/list/)、[抖音用户资料](https://dataxapi.com/zh/apis/douyin/users/get/)、[抖音达人互动与粉丝趋势](https://dataxapi.com/zh/apis/douyin/users/history/)、[抖音用户搜索](https://dataxapi.com/zh/apis/douyin/users/search/)、[抖音用户视频](https://dataxapi.com/zh/apis/douyin/users/videos/list/)、[抖音视频评论](https://dataxapi.com/zh/apis/douyin/videos/comments/list/)、[抖音视频详情](https://dataxapi.com/zh/apis/douyin/videos/get/)、[抖音视频播放量](https://dataxapi.com/zh/apis/douyin/videos/metrics/)、[抖音相关视频](https://dataxapi.com/zh/apis/douyin/videos/related/)、[抖音视频搜索](https://dataxapi.com/zh/apis/douyin/videos/search/)、[抖音视频榜](https://dataxapi.com/zh/apis/douyin/videos/trending/)、[抖音搜索框联想词](https://dataxapi.com/zh/apis/douyin/keywords/related/)、[抖音用户视频（备用版）](https://dataxapi.com/zh/apis/douyin/backup/users/videos/list/)、[抖音视频搜索（备用版）](https://dataxapi.com/zh/apis/douyin/backup/videos/search/)

抖音巨量算数的接口：[抖音巨量算数品牌指数趋势](https://dataxapi.com/zh/apis/douyin/index/brands/history/)、[抖音巨量算数品牌指数对比](https://dataxapi.com/zh/apis/douyin/index/brands/metrics/)、[抖音巨量算数达人热门视频](https://dataxapi.com/zh/apis/douyin/index/creators/videos/list/)、[抖音巨量算数达人粉丝画像](https://dataxapi.com/zh/apis/douyin/index/creators/audience/get/)、[抖音巨量算数达人核心指标](https://dataxapi.com/zh/apis/douyin/index/creators/metrics/)、[抖音巨量算数关键词人群画像](https://dataxapi.com/zh/apis/douyin/index/keywords/audience/get/)、[抖音巨量算数关键词热度趋势](https://dataxapi.com/zh/apis/douyin/index/keywords/history/)、[抖音巨量算数关联词](https://dataxapi.com/zh/apis/douyin/index/keywords/related/)、[抖音巨量算数实时热点](https://dataxapi.com/zh/apis/douyin/index/trends/list/)、[抖音巨量算数关键词热门视频](https://dataxapi.com/zh/apis/douyin/index/videos/search/)

怎么做和常见问题：[抖音星图是什么？通过 API 能拿到哪些达人数据？](https://dataxapi.com/zh/answers/what-is-douyin-xingtu/)、[抖音星图达人页上的每个数据，API 都能取到吗？逐项对照（2026）](https://dataxapi.com/zh/answers/douyin-xingtu-creator-page-fields/)、[有抖音视频链接，怎么查到作者的星图达人编号和报价？（2026）](https://dataxapi.com/zh/answers/douyin-video-to-xingtu-creator/)、[巨量星图有 API 接口吗？官方接口能查什么，查别的达人怎么办（2026）](https://dataxapi.com/zh/answers/douyin-xingtu-api/)

相关：[抖音星图的全部接口](https://dataxapi.com/zh/apis/douyin/xingtu/)、[抖音的全部接口](https://dataxapi.com/zh/apis/douyin/)、[达人数据](https://dataxapi.com/zh/categories/creator/)、[星图达人指数对象的字段](https://dataxapi.com/zh/docs/objects/xingtu_creator_scores/)

## 常见问题

### 抖音星图达人星图指数 API 多少钱？

$0.0080 一次。单次最高扣费 $0.0080。

### 什么情况下不收费？

出错和超时不收费。

### 对象不存在会怎样？

返回 404 not_found。报错里的 charged 和 amount 写明这次扣了多少。reason 写明是哪一种：not_found（不存在）或 private_or_deleted（私密或已删除）。

---

最后核对于 2026-11-21 08:32 UTC。目录修订号 720fc3ea8dadb865。 [网页版](https://dataxapi.com/zh/apis/douyin/xingtu/creators/scores/get/)
