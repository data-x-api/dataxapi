# 抖音星图达人资料 API

按星图达人编号取这位抖音达人在星图上的资料：昵称、所在地、内容类目、粉丝数、性别；取一个时带抖音账号编号、抖音号、签约机构和内容标签，一次取多个（最多 50 个）时带植入和定制视频报价、预期 CPM（元）和预估播放数。每次取一个对象；带 `ids` 一次最多取 50 个；$0.0040 一次。出错、超时、对象不存在都不收费。

- 地址：`GET / POST https://api.dataxapi.com/v1/douyin/xingtu/creators/get`
- 编号：`douyin.xingtu.creators.get`
- 也叫：星图达人信息、星图达人详情、抖音达人资料、抖音星图达人批量基础信息、抖音星图达人基础信息
- 价格：$0.0040 / 次
- 当前状态不写在这一页上（页面是快照），实时读：`GET https://api.dataxapi.com/v1/catalog/status`
- 返回：1 个对象, 一次一个，一个请求最多 50 个
- 返回达人，预览结构，以后可能调整
- [在 Playground 里跑一次](https://dataxapi.com/zh/console/playground/?capability=douyin.xingtu.creators.get&params=%7B%22id%22%3A%226763236383382306828%22%7D)
- 英文名：[Douyin Xingtu creator profile API](https://dataxapi.com/apis/douyin/xingtu/creators/get/)

## 能拿到什么

2026-10-12 21:48 UTC 录下的真实返回，这里是前 1 行。

| 字段 | 值 |
| --- | --- |
| metrics.followers | 25,909,243 |

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | 文本 | `id`、`ids` 里给且只给一个 | 星图达人编号，一串数字；不是抖音账号编号，从星图达人搜索的结果里取。示例：`6763236383382306828`。 |
| `ids` | 文本列表 | `id`、`ids` 里给且只给一个 | 多个星图达人编号，每个是一串数字。示例：`["6763236383382306828","6816144920949030920"]`。一次最多 50 个。 |
| `view` | 文本 |  | 返回档位。三档价格相同。取值：`compact`、`standard`（默认）、`full`。 |
| `fields` | 文本列表 |  | 只要这些字段。按路径写，例如 `author.name`。 |

带 `ids` 的请求用 POST，参数放在 JSON 请求体里；其余请求用 GET。

## 返回字段

`data.item` 是一个达人对象。预览：结构可能调整，改之前会公告。带 `ids` 时返回 `data.items`，没取到的列在 `data.missing`。

返回分三档：精简 `compact`（最常用的字段，长文本截短）、标准 `standard`（默认，全部标准字段）、完整 `full`（再加 `ext`，也就是这个平台特有的字段）。字段从表里写的那一档起出现，更大的档位也带。

| 字段 | 类型 | 说明 | 起始档位 | 这个接口 |
| --- | --- | --- | --- | --- |
| `id` | 文本 | 达人在这个营销市场里的编号。 | `compact` | 有 |
| `account_id` | 文本 | 这位达人的平台账号编号，可传给同平台的账号接口。 | `compact` | 看请求形式 |
| `username` | 文本 | 账号名。 | `compact` | 看请求形式 |
| `name` | 文本 | 显示名。 | `compact` | 有 |
| `avatar_url` | 链接 | 头像。 | `standard` | 有 |
| `location` | 文本 | 所在地，平台的原话。 | `standard` | 有 |
| `categories` | 文本列表 | 内容类目（一级），平台的原话。 | `compact` | 有 |
| `subcategories` | 文本列表 | 内容类目（二级），平台的原话。 | `standard` | 有 |
| `metrics` | 对象 | 达人的数字。 | `compact` | 有 |
| `metrics.followers` | 整数 | 粉丝数。 | `compact` | 有 |
| `ext.uid` | 文本 | 这位达人的抖音账号的数字编号（uid）；不是账号接口用的那个编号。 | `full` | 有 |
| `ext.rate_integrated` | 金额 | 植入视频（品牌植入达人自己的内容）的报价，人民币元。 | `full` | 看请求形式 |
| `ext.rate_custom` | 金额 | 定制视频（为品牌专门做的视频）的报价，人民币元。 | `full` | 看请求形式 |
| `ext.expected_views` | 整数 | 平台预估的单条视频播放数。 | `full` | 看请求形式 |
| `ext.agency` | 文本 | 签约的机构（MCN）名称；没有则为 null。 | `full` | 看请求形式 |
| `ext.cpm_integrated` | 金额 | 植入视频的预期千次播放成本（CPM），人民币元：植入视频报价除以平台预估播放数再乘 1000；没设报价或平台没预估时为 null。 | `full` | 看请求形式 |
| `ext.cpm_custom` | 金额 | 定制视频的预期千次播放成本（CPM），人民币元，算法同上；没有时为 null。 | `full` | 看请求形式 |
| `ext.gender` | 文本 | 达人的性别：female 女、male 男；平台没写时为 null。取值：`female`、`male`。 | `full` | 有 |
| `ext.content_labels` | 文本列表 | 星图给达人内容打的主题标签，平台的原话（搜索结果里是近 180 天的）；没有时为 null。 | `full` | 看请求形式 |
| `approximate` | 对象列表 | 这一条里哪些数是约数或下限；都是准确值时不出现。 | `compact` | 有 |
| `approximate[].field` | 文本 | 字段的路径，如 metrics.views。 | `compact` | 有 |
| `approximate[].kind` | 文本 | 约数，还是下限。取值：`approximate`、`lower_bound`。 | `compact` | 有 |

某一条本来就没有这个值时，字段给 `null`。这个接口给不了的字段不出现，统一列在 `meta.unavailable`。

带 `id` 时：不返回 `ext.rate_integrated`、`ext.rate_custom`、`ext.expected_views`、`ext.cpm_integrated`、`ext.cpm_custom`。

带 `ids` 时：不返回 `account_id`、`username`、`ext.agency`、`ext.content_labels`。

每条数据的典型体积：`compact` 207 B、`standard` 404 B、`full` 642 B（按 2026-10-12 21:48 UTC 录下的那次返回量的）。

## 翻页

每次取一个对象，不翻页。

带 `ids` 一次最多取 50 个，没有下一页。

## 什么时候收费

| 情况 | 收费 |
| --- | --- |
| 返回了数据 | $0.0040，每次调用收一次 |
| 批量里有的编号没取到 | 照收一次 |
| 对象不存在（404） | 不收费 |
| 参数不合法、出错、超时 | 不收费 |
| 单次最高扣费 | $0.0040 (带 `X-Max-Price` 可以设自己的上限，超过就不执行) |

价格读取于 2026-11-26 12:17 UTC，按价目版本 22，2026-11-25 13:46 UTC 起生效；在 Playground 里运行前会再读一次当前价格。

## 对象不存在时

返回 404 `not_found`，不收费。`reason` 写明是哪一种：`not_found`（不存在）或 `private_or_deleted`（私密或已删除）。

带 `ids` 时，没取到的编号列在 `data.missing` 并写明原因，其余照常返回；一个都没取到时返回空结果，不收费。

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
curl -G "https://api.dataxapi.com/v1/douyin/xingtu/creators/get" \
  --data-urlencode "id=6763236383382306828" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
# pip install dataxapi
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.douyin.xingtu.creators.get(id="6763236383382306828")
print(result["data"]["item"])
```

### TypeScript

```typescript
// npm i @dataxapi/sdk
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.douyin.xingtu.creators.get({ id: "6763236383382306828" });
console.log(result.data.item);
```

### 命令行

```bash
dataxapi call douyin.xingtu.creators.get id=6763236383382306828
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

把这段加进你的 MCP 客户端，然后让你的 AI 调用 `douyin.xingtu.creators.get`。

## 返回

### 200

取自 2026-10-12 21:48 UTC 录下的真实返回。名字、正文和编号是示例，链接也是，都不是录到的原文（页面不展示任何人的个人信息）；数字是原样。长列表做了截断。请求号、游标和余额是示意。

返回大小：标准档 891 B（精简 694 B，完整 1.1 KB）。

```jsonc
{
  "code": "ok",
  "request_id": "7da537c3-ee29-439f-812a-b788a7033351",
  "data": {
    "item": {
      "id": "6367626425854791347",
      "account_id": "MS4wLjABAAAAH4HW-XkkFSpuOU1jJkqdwmVxtCUI4xHqsaj-BRLqnEH",
      "username": "lemon_drop_cc",
      "name": "一颗柠檬糖",
      "avatar_url": "https://p3-pc.douyinpic.com/aweme/100x100/aweme-avatar/tos-cn-avt-0015_c479f0c578bc25e22839.jpeg",
      "location": null,
      "categories": ["旅行"],
      "subcategories": ["露营"],
      "metrics": { "followers": 25909243 }
    }
  },
  "warnings": [],
  "meta": {
    "capability": "douyin.xingtu.creators.get",
    "result_status": "complete",
    "fetched_at": "2026-10-12T21:48:52.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "ext.rate_integrated": "capability",
      "ext.rate_custom": "capability",
      "ext.expected_views": "capability",
      "ext.cpm_integrated": "capability",
      "ext.cpm_custom": "capability"
    },
    "billing": {
      "amount": "0.004",
      "currency": "USD",
      "balance_after": "9.996"
    }
  }
}
```

### 空结果

这是带 `ids` 的请求的返回。

取自 2026-10-12 21:48 UTC 录下的真实返回。请求号和余额是示意。

返回大小：标准档 547 B（精简 547 B，完整 547 B）。

```jsonc
{
  "code": "ok",
  "request_id": "cc13eb0f-d5fb-457c-b64a-0aafc8082330",
  "data": {
    "items": [],
    "missing": [
      { "id": "6906943020864613909", "reason": "not_found" },
      { "id": "6378621704197376231", "reason": "not_found" }
    ]
  },
  "warnings": [],
  "meta": {
    "capability": "douyin.xingtu.creators.get",
    "result_status": "empty",
    "fetched_at": "2026-10-12T21:48:50.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "account_id": "capability",
      "username": "capability",
      "ext.agency": "capability",
      "ext.content_labels": "capability"
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
  "request_id": "33e8fa67-cb61-4c90-9749-36e962f2db0b",
  "message": "A parameter is invalid",
  "message_zh": "参数不合法",
  "charged": false,
  "retry": "after_fix",
  "retry_after_seconds": null,
  "param": null,
  "problems": ["give exactly one of id, ids"],
  "docs_url": "https://dataxapi.com/docs/errors#invalid_params"
}
```

### 402

按规范写的示例，不是录下的返回。

```json
{
  "code": "insufficient_balance",
  "request_id": "bebc97c7-df2f-4d0a-920e-2bd9990cd2ae",
  "message": "The balance is too low",
  "message_zh": "余额不足",
  "charged": false,
  "retry": "after_fix",
  "retry_after_seconds": null,
  "param": null,
  "required": "0.004",
  "available": "0",
  "top_up_url": "https://dataxapi.com/console/billing/?amount=10",
  "next_step": "The balance does not cover this call ($0.004). Top up at top_up_url: $10 at least, about 2,500 calls at this price; Alipay or a card, and the balance never expires. Then send the same request again, unchanged. Nothing was charged for this one.",
  "next_step_zh": "余额不够这次调用（$0.004）。到 top_up_url 充值：最低 $10，按这次的价格约够 2,500 次；支付宝、银行卡都能付，余额不过期。到账后把同一个请求原样再发一次。这次没有扣钱。",
  "docs_url": "https://dataxapi.com/docs/errors#insufficient_balance"
}
```

### 404

按规范写的示例，不是录下的返回。

```json
{
  "code": "not_found",
  "request_id": "3e8179ef-73b5-4e35-83bd-1d00a30eb879",
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
  "request_id": "ba21cefc-47c1-4044-b0b2-914b0549257c",
  "message": "No result came back this time and nothing was charged; retry shortly",
  "message_zh": "这次没有取到结果，没有扣费，可以稍后重试",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

这份录制的返回：平台原始 JSON 1,376 token，DataXAPI 的 JSON 289 token，AI 通过 DataXAPI 的 MCP 读到 151 token，少 89%（2026-11-06 统计）。

[这份示例的 JSON 文件](https://dataxapi.com/apis/douyin/xingtu/creators/get.example.json)

## 在你的 AI 里用它

`dataxapi setup` 给这台电脑上的 AI 代理（Claude Code、Codex、Cursor）装好 DataXAPI 的 MCP 服务和基础技能。Key 从环境变量 DATAXAPI_API_KEY 读，不写进任何文件。

MCP 服务地址：`https://api.dataxapi.com/mcp`。你的客户端要填的配置在本页请求示例的“MCP”页签里；接好后让你的 AI 调用 `douyin.xingtu.creators.get`。

或者把这段话贴给任意一个 AI：

> 读一下 https://dataxapi.com/zh/apis/douyin/xingtu/creators/get.md，然后帮我用 DataXAPI 的接口 douyin.xingtu.creators.get（抖音星图达人资料）。

[在 ChatGPT 里打开](https://chatgpt.com/?q=%E8%AF%BB%E4%B8%80%E4%B8%8B%20https%3A%2F%2Fdataxapi.com%2Fzh%2Fapis%2Fdouyin%2Fxingtu%2Fcreators%2Fget.md%EF%BC%8C%E7%84%B6%E5%90%8E%E5%B8%AE%E6%88%91%E7%94%A8%20DataXAPI%20%E7%9A%84%E6%8E%A5%E5%8F%A3%20douyin.xingtu.creators.get%EF%BC%88%E6%8A%96%E9%9F%B3%E6%98%9F%E5%9B%BE%E8%BE%BE%E4%BA%BA%E8%B5%84%E6%96%99%EF%BC%89%E3%80%82) · [在 Claude 里打开](https://claude.ai/new?q=%E8%AF%BB%E4%B8%80%E4%B8%8B%20https%3A%2F%2Fdataxapi.com%2Fzh%2Fapis%2Fdouyin%2Fxingtu%2Fcreators%2Fget.md%EF%BC%8C%E7%84%B6%E5%90%8E%E5%B8%AE%E6%88%91%E7%94%A8%20DataXAPI%20%E7%9A%84%E6%8E%A5%E5%8F%A3%20douyin.xingtu.creators.get%EF%BC%88%E6%8A%96%E9%9F%B3%E6%98%9F%E5%9B%BE%E8%BE%BE%E4%BA%BA%E8%B5%84%E6%96%99%EF%BC%89%E3%80%82)

## 相关

这是 DataXAPI 达人数据的一部分。同一把 Key 还能用：社交媒体、广告、电商。

同一件事的其他平台：[小红书蒲公英博主详情](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/get/)

抖音星图的接口：[抖音星图达人商业报价](https://dataxapi.com/zh/apis/douyin/xingtu/creators/rates/get/)、[抖音星图达人搜索](https://dataxapi.com/zh/apis/douyin/xingtu/creators/search/)、[抖音星图达人资料](https://dataxapi.com/zh/apis/douyin/xingtu/creators/get/)、[抖音星图达人粉丝画像](https://dataxapi.com/zh/apis/douyin/xingtu/creators/audience/get/)、[抖音星图达人传播数据](https://dataxapi.com/zh/apis/douyin/xingtu/creators/metrics/)、[抖音星图达人作品表现](https://dataxapi.com/zh/apis/douyin/xingtu/creators/videos/list/)、[抖音星图达人内容热词](https://dataxapi.com/zh/apis/douyin/xingtu/creators/keywords/get/)、[抖音星图达人星图指数](https://dataxapi.com/zh/apis/douyin/xingtu/creators/scores/get/)、[抖音星图达人内容分布](https://dataxapi.com/zh/apis/douyin/xingtu/creators/content_mix/get/)、[抖音星图达人转化能力](https://dataxapi.com/zh/apis/douyin/xingtu/creators/conversion/get/)、[抖音星图营销活动日历](https://dataxapi.com/zh/apis/douyin/xingtu/campaigns/list/)、[抖音星图视频数据报告（播放量、完播率）](https://dataxapi.com/zh/apis/douyin/xingtu/videos/get/)、[抖音星图达人粉丝画像（备用版）](https://dataxapi.com/zh/apis/douyin/xingtu/backup/creators/audience/get/)

抖音的接口：[抖音评论回复](https://dataxapi.com/zh/apis/douyin/comments/replies/list/)、[抖音话题视频](https://dataxapi.com/zh/apis/douyin/hashtags/videos/list/)、[抖音热榜](https://dataxapi.com/zh/apis/douyin/trends/list/)、[抖音用户资料](https://dataxapi.com/zh/apis/douyin/users/get/)、[抖音达人互动与粉丝趋势](https://dataxapi.com/zh/apis/douyin/users/history/)、[抖音用户搜索](https://dataxapi.com/zh/apis/douyin/users/search/)、[抖音用户视频](https://dataxapi.com/zh/apis/douyin/users/videos/list/)、[抖音视频评论](https://dataxapi.com/zh/apis/douyin/videos/comments/list/)、[抖音视频详情](https://dataxapi.com/zh/apis/douyin/videos/get/)、[抖音视频转文字（文案提取、逐字稿）](https://dataxapi.com/zh/apis/douyin/videos/transcript/get/)、[抖音视频播放量](https://dataxapi.com/zh/apis/douyin/videos/metrics/)、[抖音相关视频](https://dataxapi.com/zh/apis/douyin/videos/related/)、[抖音视频搜索](https://dataxapi.com/zh/apis/douyin/videos/search/)、[抖音视频榜](https://dataxapi.com/zh/apis/douyin/videos/trending/)、[抖音搜索框联想词](https://dataxapi.com/zh/apis/douyin/keywords/related/)、[抖音无水印视频和图片下载地址](https://dataxapi.com/zh/apis/douyin/videos/media/get/)、[抖音音乐详情（背景音乐 MP3 和使用人数）](https://dataxapi.com/zh/apis/douyin/music/get/)、[抖音用户视频（备用版）](https://dataxapi.com/zh/apis/douyin/backup/users/videos/list/)、[抖音视频搜索（备用版）](https://dataxapi.com/zh/apis/douyin/backup/videos/search/)

抖音巨量算数的接口：[抖音巨量算数品牌指数趋势](https://dataxapi.com/zh/apis/douyin/index/brands/history/)、[抖音巨量算数品牌指数对比](https://dataxapi.com/zh/apis/douyin/index/brands/metrics/)、[抖音巨量算数达人热门视频](https://dataxapi.com/zh/apis/douyin/index/creators/videos/list/)、[抖音巨量算数达人粉丝画像](https://dataxapi.com/zh/apis/douyin/index/creators/audience/get/)、[抖音巨量算数达人核心指标](https://dataxapi.com/zh/apis/douyin/index/creators/metrics/)、[抖音巨量算数关键词人群画像](https://dataxapi.com/zh/apis/douyin/index/keywords/audience/get/)、[抖音巨量算数关键词热度趋势](https://dataxapi.com/zh/apis/douyin/index/keywords/history/)、[抖音巨量算数关联词](https://dataxapi.com/zh/apis/douyin/index/keywords/related/)、[抖音巨量算数实时热点](https://dataxapi.com/zh/apis/douyin/index/trends/list/)、[抖音巨量算数关键词热门视频](https://dataxapi.com/zh/apis/douyin/index/videos/search/)

怎么做和常见问题：[抖音 sec_uid 是什么？和 uid、抖音号有什么区别？](https://dataxapi.com/zh/answers/douyin-sec-uid/)、[抖音星图是什么？通过 API 能拿到哪些达人数据？](https://dataxapi.com/zh/answers/what-is-douyin-xingtu/)、[星图怎么批量筛达人、看报价（2026）](https://dataxapi.com/zh/answers/douyin-xingtu-creators-bulk-filter/)、[抖音星图达人页上的每个数据，API 都能取到吗？逐项对照（2026）](https://dataxapi.com/zh/answers/douyin-xingtu-creator-page-fields/)、[星图植入视频和定制视频报价有什么区别？怎么用 API 取（2026）](https://dataxapi.com/zh/answers/douyin-xingtu-integrated-vs-custom-rate/)、[小红书蒲公英和星图的区别？两边的达人数据怎么对着看（2026）](https://dataxapi.com/zh/answers/xiaohongshu-pgy-vs-douyin-xingtu/)、[100 万粉丝的星图报价怎么查？按粉丝段批量查抖音达人报价（2026）](https://dataxapi.com/zh/answers/douyin-xingtu-rates-by-followers/)、[巨量星图有 API 接口吗？官方接口能查什么，查别的达人怎么办（2026）](https://dataxapi.com/zh/answers/douyin-xingtu-api/)

相关：[抖音星图的全部接口](https://dataxapi.com/zh/apis/douyin/xingtu/)、[抖音的全部接口](https://dataxapi.com/zh/apis/douyin/)、[达人数据](https://dataxapi.com/zh/categories/creator/)、[这件事在 2 个平台上的对照](https://dataxapi.com/zh/roles/creators-get/)、[达人对象的字段](https://dataxapi.com/zh/docs/objects/creator/)

## 常见问题

### 抖音星图达人资料 API 多少钱？

$0.0040 一次。单次最高扣费 $0.0040。

### 什么情况下不收费？

出错、超时、对象不存在都不收费。

### 能一次取多个吗？

带 ids 一次最多取 50 个，没有下一页。

### 对象不存在会怎样？

返回 404 not_found，不收费。reason 写明是哪一种：not_found（不存在）或 private_or_deleted（私密或已删除）。带 ids 时，没取到的编号列在 data.missing 并写明原因，其余照常返回；一个都没取到时返回空结果，不收费。

---

最后核对于 2026-11-26 12:17 UTC。目录修订号 0051cce45e9530b9。 [网页版](https://dataxapi.com/zh/apis/douyin/xingtu/creators/get/)
