# 抖音星图达人粉丝画像 API

按星图达人编号取这位抖音达人的粉丝画像：性别、年龄、省份、城市、城市等级、兴趣、设备、人群、消费品类和消费金额各段的粉丝数和占比。每次取一个对象；$0.0040 一次。出错和超时不收费。

- 地址：`GET https://api.dataxapi.com/v1/douyin/xingtu/creators/audience/get`
- 编号：`douyin.xingtu.creators.audience.get`
- 也叫：达人粉丝画像、星图粉丝分布、抖音达人受众
- 价格：$0.0040 / 次
- 当前状态不写在这一页上（页面是快照），实时读：`GET https://api.dataxapi.com/v1/catalog/status`
- 返回：1 个对象, 一个粉丝画像对象
- 返回粉丝画像，预览结构，以后可能调整
- [在 Playground 里跑一次](https://dataxapi.com/zh/console/playground/?capability=douyin.xingtu.creators.audience.get&params=%7B%22id%22%3A%226763236383382306828%22%7D)
- 英文名：[Douyin Xingtu creator audience API](https://dataxapi.com/apis/douyin/xingtu/creators/audience/get/)

## 能拿到什么

2026-10-12 21:49 UTC 录下的真实返回，这里是前 8 行。

| 字段 | name | share | count |
| --- | --- | --- | --- |
| gender | male | 80.8% | 20,914,248 |
| gender | female | 19.2% | 4,956,855 |
| age | 18-23 | 2.6% | 669,976 |
| age | 24-30 | 11.3% | 2,887,501 |
| province | 福建 | 3.5% | 845,507 |
| province | 香港 | 0.2% | 37,654 |
| city | 北京 | 14.7% | 751,515 |
| city | 上海 | 12.2% | 624,177 |

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | 文本 | 是 | 星图达人编号，一串数字；不是抖音账号编号，从星图达人搜索的结果里取。示例：`6763236383382306828`。 |
| `view` | 文本 |  | 返回档位。三档价格相同。取值：`compact`、`standard`（默认）、`full`。 |
| `fields` | 文本列表 |  | 只要这些字段。按路径写，例如 `author.name`。 |

## 返回字段

`data.item` 是一个粉丝画像对象。预览：结构可能调整，改之前会公告。

返回分三档：精简 `compact`（最常用的字段，长文本截短）、标准 `standard`（默认，全部标准字段）、完整 `full`（再加 `ext`，也就是这个平台特有的字段）。字段从表里写的那一档起出现，更大的档位也带。

| 字段 | 类型 | 说明 | 起始档位 | 这个接口 |
| --- | --- | --- | --- | --- |
| `creator_id` | 文本 | 达人编号。 | `compact` | 有 |
| `measured_at` | 时间 | 这份画像是哪一天的数据（按北京时间那一天的零点给）。 | `compact` | 这个接口不提供 |
| `gender` | 对象列表 | 按性别分。 | `compact` | 有 |
| `gender[].name` | 文本 | 这一段的名称，平台的原话（性别的两段平台给的是英文小写）。 | `compact` | 有 |
| `gender[].share` | 数字 | 这一段占所列各段的比例，0 到 1。在这个平台上：平台只给各段的粉丝数；占比是这一段的粉丝数除以所列各段的合计（城市只列前十个）。 | `compact` | 有 |
| `gender[].count` | 整数 | 这一段的粉丝数。 | `compact` | 有 |
| `age` | 对象列表 | 按年龄段分。 | `compact` | 有 |
| `age[].name` | 文本 | 这一段的名称，平台的原话（性别的两段平台给的是英文小写）。 | `compact` | 有 |
| `age[].share` | 数字 | 这一段占所列各段的比例，0 到 1。在这个平台上：平台只给各段的粉丝数；占比是这一段的粉丝数除以所列各段的合计（城市只列前十个）。 | `compact` | 有 |
| `age[].count` | 整数 | 这一段的粉丝数。 | `compact` | 有 |
| `province` | 对象列表 | 按省份分。 | `compact` | 有 |
| `province[].name` | 文本 | 这一段的名称，平台的原话（性别的两段平台给的是英文小写）。 | `compact` | 有 |
| `province[].share` | 数字 | 这一段占所列各段的比例，0 到 1。在这个平台上：平台只给各段的粉丝数；占比是这一段的粉丝数除以所列各段的合计（城市只列前十个）。 | `compact` | 有 |
| `province[].count` | 整数 | 这一段的粉丝数。 | `compact` | 有 |
| `city` | 对象列表 | 按城市分，只列粉丝最多的几个。 | `compact` | 有 |
| `city[].name` | 文本 | 这一段的名称，平台的原话（性别的两段平台给的是英文小写）。 | `compact` | 有 |
| `city[].share` | 数字 | 这一段占所列各段的比例，0 到 1。在这个平台上：平台只给各段的粉丝数；占比是这一段的粉丝数除以所列各段的合计（城市只列前十个）。 | `compact` | 有 |
| `city[].count` | 整数 | 这一段的粉丝数。 | `compact` | 有 |
| `interest` | 对象列表 | 按兴趣分。 | `compact` | 有 |
| `interest[].name` | 文本 | 这一段的名称，平台的原话（性别的两段平台给的是英文小写）。 | `compact` | 有 |
| `interest[].share` | 数字 | 这一段占所列各段的比例，0 到 1。在这个平台上：平台只给各段的粉丝数；占比是这一段的粉丝数除以所列各段的合计（城市只列前十个）。 | `compact` | 有 |
| `interest[].count` | 整数 | 这一段的粉丝数。 | `compact` | 有 |
| `device` | 对象列表 | 按手机品牌分。 | `compact` | 有 |
| `device[].name` | 文本 | 这一段的名称，平台的原话（性别的两段平台给的是英文小写）。 | `compact` | 有 |
| `device[].share` | 数字 | 这一段占所列各段的比例，0 到 1。在这个平台上：平台只给各段的粉丝数；占比是这一段的粉丝数除以所列各段的合计（城市只列前十个）。 | `compact` | 有 |
| `device[].count` | 整数 | 这一段的粉丝数。 | `compact` | 有 |
| `city_tier` | 对象列表 | 按城市等级分。 | `compact` | 有 |
| `city_tier[].name` | 文本 | 这一段的名称，平台的原话（性别的两段平台给的是英文小写）。 | `compact` | 有 |
| `city_tier[].share` | 数字 | 这一段占所列各段的比例，0 到 1。在这个平台上：平台只给各段的粉丝数；占比是这一段的粉丝数除以所列各段的合计（城市只列前十个）。 | `compact` | 有 |
| `city_tier[].count` | 整数 | 这一段的粉丝数。 | `compact` | 有 |
| `crowd` | 对象列表 | 按平台划分的消费人群分。 | `compact` | 有 |
| `crowd[].name` | 文本 | 这一段的名称，平台的原话（性别的两段平台给的是英文小写）。 | `compact` | 有 |
| `crowd[].share` | 数字 | 这一段占所列各段的比例，0 到 1。在这个平台上：平台只给各段的粉丝数；占比是这一段的粉丝数除以所列各段的合计（城市只列前十个）。 | `compact` | 有 |
| `crowd[].count` | 整数 | 这一段的粉丝数。 | `compact` | 有 |
| `purchase_category` | 对象列表 | 按购买的品类分。 | `compact` | 有 |
| `purchase_category[].name` | 文本 | 这一段的名称，平台的原话（性别的两段平台给的是英文小写）。 | `compact` | 有 |
| `purchase_category[].share` | 数字 | 这一段占所列各段的比例，0 到 1。在这个平台上：平台只给各段的粉丝数；占比是这一段的粉丝数除以所列各段的合计（城市只列前十个）。 | `compact` | 有 |
| `purchase_category[].count` | 整数 | 这一段的粉丝数。 | `compact` | 有 |
| `purchase_amount` | 对象列表 | 按每单的消费金额分。 | `compact` | 有 |
| `purchase_amount[].name` | 文本 | 这一段的名称，平台的原话（性别的两段平台给的是英文小写）。 | `compact` | 有 |
| `purchase_amount[].share` | 数字 | 这一段占所列各段的比例，0 到 1。在这个平台上：平台只给各段的粉丝数；占比是这一段的粉丝数除以所列各段的合计（城市只列前十个）。 | `compact` | 有 |
| `purchase_amount[].count` | 整数 | 这一段的粉丝数。 | `compact` | 有 |
| `approximate` | 对象列表 | 这一条里哪些数是约数或下限；都是准确值时不出现。 | `compact` | 有 |
| `approximate[].field` | 文本 | 字段的路径，如 metrics.views。 | `compact` | 有 |
| `approximate[].kind` | 文本 | 约数，还是下限。取值：`approximate`、`lower_bound`。 | `compact` | 有 |

某一条本来就没有这个值时，字段给 `null`。这个接口给不了的字段不出现，统一列在 `meta.unavailable`。

每条数据的典型体积：`compact` 5.7 KB、`standard` 5.7 KB、`full` 5.7 KB（按 2026-10-12 21:49 UTC 录下的那次返回量的）。

## 翻页

每次取一个对象，不翻页。

## 什么时候收费

| 情况 | 收费 |
| --- | --- |
| 返回了数据 | $0.0040，每次调用收一次 |
| 参数不合法、出错、超时 | 不收费 |
| 单次最高扣费 | $0.0040 (带 `X-Max-Price` 可以设自己的上限，超过就不执行) |

价格读取于 2026-11-20 07:17 UTC，按价目版本 19，2026-11-17 18:04 UTC 起生效；在 Playground 里运行前会再读一次当前价格。

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
curl -G "https://api.dataxapi.com/v1/douyin/xingtu/creators/audience/get" \
  --data-urlencode "id=6763236383382306828" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
# pip install dataxapi
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.douyin.xingtu.creators.audience.get(id="6763236383382306828")
print(result["data"]["item"])
```

### TypeScript

```typescript
// npm i @dataxapi/sdk
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.douyin.xingtu.creators.audience.get({ id: "6763236383382306828" });
console.log(result.data.item);
```

### 命令行

```bash
dataxapi call douyin.xingtu.creators.audience.get id=6763236383382306828
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

把这段加进你的 MCP 客户端，然后让你的 AI 调用 `douyin.xingtu.creators.audience.get`。

## 返回

### 200

取自 2026-10-12 21:49 UTC 录下的真实返回。名字、正文和编号是示例，链接也是，都不是录到的原文（页面不展示任何人的个人信息）；数字是原样。长列表做了截断。请求号、游标和余额是示意。

返回大小：标准档 6.1 KB（精简 6.1 KB，完整 6.1 KB）。

```jsonc
{
  "code": "ok",
  "request_id": "25005e75-4c98-42d9-a6dd-afe2a7b8a879",
  "data": {
    "item": {
      "creator_id": "66673485511",
      "gender": [
        { "name": "male", "share": 0.8084018682929753, "count": 20914248 },
        { "name": "female", "share": 0.19159813170702464, "count": 4956855 }
      ],
      "age": [
        { "name": "18-23", "share": 0.02613169810130031, "count": 669976 },
        { "name": "24-30", "share": 0.11262389160089727, "count": 2887501 },
        // … 另有 3 条
      ],
      "province": [
        { "name": "福建", "share": 0.034598226662216194, "count": 845507 },
        { "name": "香港", "share": 0.001540805252634323, "count": 37654 },
        // … 另有 32 条
      ],
      "city": [
        { "name": "北京", "share": 0.14657726964471665, "count": 751515 },
        { "name": "上海", "share": 0.12174096383309756, "count": 624177 },
        // … 另有 8 条
      ],
      "interest": [
        { "name": "二次元", "share": 0.022866163075920397, "count": 471117 },
        { "name": "随拍", "share": 0.5770495394947144, "count": 11889089 },
        // … 另有 6 条
      ],
      "device": [
        { "name": "其他", "share": 0.1350657086683392, "count": 3500022 },
        { "name": "华为", "share": 0.24915854592413617, "count": 6456564 },
        // … 另有 6 条
      ],
      "city_tier": [
        { "name": "二线", "share": 0.18540551970015773, "count": 4530677 },
        { "name": "五线", "share": 0.10928394606430417, "count": 2670526 },
        // … 另有 3 条
      ],
      "crowd": [
        { "name": "Z世代", "share": 0.015066702484682015, "count": 328216 },
        { "name": "资深中产", "share": 0.16493764562162405, "count": 3593034 },
        // … 另有 6 条
      ],
      "purchase_category": [
        { "name": "其他", "share": 0.35668521581357804, "count": 3854685 },
        { "name": "服饰内衣", "share": 0.20722439582025148, "count": 2239467 },
        // … 另有 4 条
      ],
      "purchase_amount": [
        { "name": "50-100", "share": 0.23128677093645555, "count": 2497497 },
        { "name": "0-50", "share": 0.3880473446209439, "count": 4190240 },
        // … 另有 3 条
      ]
    }
  },
  "warnings": [],
  "meta": {
    "capability": "douyin.xingtu.creators.audience.get",
    "result_status": "complete",
    "fetched_at": "2026-10-12T21:49:33.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": { "measured_at": "capability" },
    "billing": {
      "amount": "0.004",
      "currency": "USD",
      "balance_after": "9.996"
    }
  }
}
```

### 400

按规范写的示例，不是录下的返回。

```json
{
  "code": "invalid_params",
  "request_id": "84e17cdf-951f-46a4-9cf9-544f87b3f63a",
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
  "request_id": "233b31e1-1cb8-4e03-ac48-a727fc15ecf0",
  "message": "The balance is too low",
  "message_zh": "余额不足",
  "charged": false,
  "retry": "after_fix",
  "retry_after_seconds": null,
  "param": null,
  "required": "0.004",
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
  "request_id": "e7f6c3b0-c019-47e5-baf7-b9b48f6c486b",
  "message": "The object does not exist, is private or was deleted",
  "message_zh": "对象不存在、私密或已删除",
  "charged": true,
  "amount": "0.004",
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
  "request_id": "6415391d-3fbb-40cc-a859-cd0f6c2c674c",
  "message": "No result came back this time and nothing was charged; retry shortly",
  "message_zh": "这次没有取到结果，没有扣费，可以稍后重试",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

[这份示例的 JSON 文件](https://dataxapi.com/apis/douyin/xingtu/creators/audience/get.example.json)

## 在你的 AI 里用它

`dataxapi setup` 给这台电脑上的 AI 代理（Claude Code、Codex、Cursor）装好 DataXAPI 的 MCP 服务和基础技能。Key 从环境变量 DATAXAPI_API_KEY 读，不写进任何文件。

MCP 服务地址：`https://api.dataxapi.com/mcp`。你的客户端要填的配置在本页请求示例的“MCP”页签里；接好后让你的 AI 调用 `douyin.xingtu.creators.audience.get`。

或者把这段话贴给任意一个 AI：

> 读一下 https://dataxapi.com/zh/apis/douyin/xingtu/creators/audience/get.md，然后帮我用 DataXAPI 的接口 douyin.xingtu.creators.audience.get（抖音星图达人粉丝画像）。

[在 ChatGPT 里打开](https://chatgpt.com/?q=%E8%AF%BB%E4%B8%80%E4%B8%8B%20https%3A%2F%2Fdataxapi.com%2Fzh%2Fapis%2Fdouyin%2Fxingtu%2Fcreators%2Faudience%2Fget.md%EF%BC%8C%E7%84%B6%E5%90%8E%E5%B8%AE%E6%88%91%E7%94%A8%20DataXAPI%20%E7%9A%84%E6%8E%A5%E5%8F%A3%20douyin.xingtu.creators.audience.get%EF%BC%88%E6%8A%96%E9%9F%B3%E6%98%9F%E5%9B%BE%E8%BE%BE%E4%BA%BA%E7%B2%89%E4%B8%9D%E7%94%BB%E5%83%8F%EF%BC%89%E3%80%82) · [在 Claude 里打开](https://claude.ai/new?q=%E8%AF%BB%E4%B8%80%E4%B8%8B%20https%3A%2F%2Fdataxapi.com%2Fzh%2Fapis%2Fdouyin%2Fxingtu%2Fcreators%2Faudience%2Fget.md%EF%BC%8C%E7%84%B6%E5%90%8E%E5%B8%AE%E6%88%91%E7%94%A8%20DataXAPI%20%E7%9A%84%E6%8E%A5%E5%8F%A3%20douyin.xingtu.creators.audience.get%EF%BC%88%E6%8A%96%E9%9F%B3%E6%98%9F%E5%9B%BE%E8%BE%BE%E4%BA%BA%E7%B2%89%E4%B8%9D%E7%94%BB%E5%83%8F%EF%BC%89%E3%80%82)

## 相关

这是 DataXAPI 达人数据的一部分。同一把 Key 还能用：社交媒体、广告、电商。

同一件事的其他平台：[小红书蒲公英博主粉丝画像](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/audience/get/)

抖音星图的接口：[抖音星图达人商业报价](https://dataxapi.com/zh/apis/douyin/xingtu/creators/rates/get/)、[抖音星图达人搜索](https://dataxapi.com/zh/apis/douyin/xingtu/creators/search/)、[抖音星图达人资料](https://dataxapi.com/zh/apis/douyin/xingtu/creators/get/)、[抖音星图达人粉丝画像](https://dataxapi.com/zh/apis/douyin/xingtu/creators/audience/get/)、[抖音星图达人传播数据](https://dataxapi.com/zh/apis/douyin/xingtu/creators/metrics/)、[抖音星图达人作品表现](https://dataxapi.com/zh/apis/douyin/xingtu/creators/videos/list/)、[抖音星图达人内容热词](https://dataxapi.com/zh/apis/douyin/xingtu/creators/keywords/get/)、[抖音星图达人星图指数](https://dataxapi.com/zh/apis/douyin/xingtu/creators/scores/get/)、[抖音星图达人内容分布](https://dataxapi.com/zh/apis/douyin/xingtu/creators/content_mix/get/)、[抖音星图达人转化能力](https://dataxapi.com/zh/apis/douyin/xingtu/creators/conversion/get/)、[抖音星图营销活动日历](https://dataxapi.com/zh/apis/douyin/xingtu/campaigns/list/)、[抖音星图视频数据报告（播放量、完播率）](https://dataxapi.com/zh/apis/douyin/xingtu/videos/get/)

抖音的接口：[抖音评论回复](https://dataxapi.com/zh/apis/douyin/comments/replies/list/)、[抖音话题视频](https://dataxapi.com/zh/apis/douyin/hashtags/videos/list/)、[抖音热榜](https://dataxapi.com/zh/apis/douyin/trends/list/)、[抖音用户资料](https://dataxapi.com/zh/apis/douyin/users/get/)、[抖音达人互动与粉丝趋势](https://dataxapi.com/zh/apis/douyin/users/history/)、[抖音用户搜索](https://dataxapi.com/zh/apis/douyin/users/search/)、[抖音用户视频](https://dataxapi.com/zh/apis/douyin/users/videos/list/)、[抖音视频评论](https://dataxapi.com/zh/apis/douyin/videos/comments/list/)、[抖音视频详情](https://dataxapi.com/zh/apis/douyin/videos/get/)、[抖音视频播放量](https://dataxapi.com/zh/apis/douyin/videos/metrics/)、[抖音相关视频](https://dataxapi.com/zh/apis/douyin/videos/related/)、[抖音视频搜索](https://dataxapi.com/zh/apis/douyin/videos/search/)、[抖音视频榜](https://dataxapi.com/zh/apis/douyin/videos/trending/)、[抖音搜索框联想词](https://dataxapi.com/zh/apis/douyin/keywords/related/)、[抖音用户视频（备用版）](https://dataxapi.com/zh/apis/douyin/backup/users/videos/list/)、[抖音视频搜索（备用版）](https://dataxapi.com/zh/apis/douyin/backup/videos/search/)

抖音巨量算数的接口：[抖音巨量算数品牌指数趋势](https://dataxapi.com/zh/apis/douyin/index/brands/history/)、[抖音巨量算数品牌指数对比](https://dataxapi.com/zh/apis/douyin/index/brands/metrics/)、[抖音巨量算数达人热门视频](https://dataxapi.com/zh/apis/douyin/index/creators/videos/list/)、[抖音巨量算数达人粉丝画像](https://dataxapi.com/zh/apis/douyin/index/creators/audience/get/)、[抖音巨量算数达人核心指标](https://dataxapi.com/zh/apis/douyin/index/creators/metrics/)、[抖音巨量算数关键词人群画像](https://dataxapi.com/zh/apis/douyin/index/keywords/audience/get/)、[抖音巨量算数关键词热度趋势](https://dataxapi.com/zh/apis/douyin/index/keywords/history/)、[抖音巨量算数关联词](https://dataxapi.com/zh/apis/douyin/index/keywords/related/)、[抖音巨量算数实时热点](https://dataxapi.com/zh/apis/douyin/index/trends/list/)、[抖音巨量算数关键词热门视频](https://dataxapi.com/zh/apis/douyin/index/videos/search/)

怎么做和常见问题：[抖音星图是什么？通过 API 能拿到哪些达人数据？](https://dataxapi.com/zh/answers/what-is-douyin-xingtu/)、[星图怎么批量筛达人、看报价（2026）](https://dataxapi.com/zh/answers/douyin-xingtu-creators-bulk-filter/)、[抖音、小红书达人数据怎么批量取？KOL 资料、作品和报价（2026）](https://dataxapi.com/zh/answers/douyin-xiaohongshu-creator-data/)、[抖音星图达人页上的每个数据，API 都能取到吗？逐项对照（2026）](https://dataxapi.com/zh/answers/douyin-xingtu-creator-page-fields/)、[有抖音视频链接，怎么查到作者的星图达人编号和报价？（2026）](https://dataxapi.com/zh/answers/douyin-video-to-xingtu-creator/)、[小红书蒲公英和星图的区别？两边的达人数据怎么对着看（2026）](https://dataxapi.com/zh/answers/xiaohongshu-pgy-vs-douyin-xingtu/)、[巨量星图有 API 接口吗？官方接口能查什么，查别的达人怎么办（2026）](https://dataxapi.com/zh/answers/douyin-xingtu-api/)

相关：[抖音星图的全部接口](https://dataxapi.com/zh/apis/douyin/xingtu/)、[抖音的全部接口](https://dataxapi.com/zh/apis/douyin/)、[达人数据](https://dataxapi.com/zh/categories/creator/)、[这件事在 2 个平台上的对照](https://dataxapi.com/zh/roles/creators-audience-get/)、[粉丝画像对象的字段](https://dataxapi.com/zh/docs/objects/audience/)

## 常见问题

### 抖音星图达人粉丝画像 API 多少钱？

$0.0040 一次。单次最高扣费 $0.0040。

### 什么情况下不收费？

出错和超时不收费。

### 对象不存在会怎样？

返回 404 not_found。报错里的 charged 和 amount 写明这次扣了多少。reason 写明是哪一种：not_found（不存在）或 private_or_deleted（私密或已删除）。

---

最后核对于 2026-11-20 07:17 UTC。目录修订号 720fc3ea8dadb865。 [网页版](https://dataxapi.com/zh/apis/douyin/xingtu/creators/audience/get/)
