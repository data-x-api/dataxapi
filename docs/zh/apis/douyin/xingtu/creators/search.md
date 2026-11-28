# 抖音星图达人搜索 API

按昵称里的词搜索星图上的抖音达人，可按粉丝数、预期 CPM（元）、性别筛选，按预期 CPM 从低到高排：星图达人编号、昵称、所在地、内容类目、粉丝数；完整档另有植入和定制视频报价、预期 CPM（元）、预估播放数、近 30 天互动率、完播率和播放中位数、电商带货等级、性别和内容标签。其他星图接口要的达人编号从这里取。每次最多 20 条；$0.0040 一次。出错和超时不收费。

- 地址：`GET https://api.dataxapi.com/v1/douyin/xingtu/creators/search`
- 编号：`douyin.xingtu.creators.search`
- 也叫：找抖音达人、星图找达人、搜星图达人、星图达人CPM、星图达人筛选
- 价格：$0.0040 / 次
- 当前状态不写在这一页上（页面是快照），实时读：`GET https://api.dataxapi.com/v1/catalog/status`
- 返回：每页 20 条, 一页，带翻下一页的游标
- 返回达人，预览结构，以后可能调整
- [在 Playground 里跑一次](https://dataxapi.com/zh/console/playground/?capability=douyin.xingtu.creators.search&params=%7B%22query%22%3A%22%E7%BE%8E%E9%A3%9F%22%7D)
- 英文名：[Douyin Xingtu creator search API](https://dataxapi.com/apis/douyin/xingtu/creators/search/)

## 能拿到什么

2026-10-12 22:06 UTC 录下的真实返回，这里是前 1 行。

| 字段 | 值 |
| --- | --- |
| metrics.followers | 48,169 |

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `query` | 文本 | 是 | 搜索词，按达人昵称匹配。示例：`美食`。 |
| `followers_min` | 整数 |  | 粉丝数不少于。示例：`100000`。 |
| `followers_max` | 整数 |  | 粉丝数不多于。示例：`1000000`。 |
| `cpm_min` | 整数 |  | 植入视频的预期千次播放成本（ext.cpm_integrated）不低于，人民币元。示例：`10`。 |
| `cpm_max` | 整数 |  | 植入视频的预期千次播放成本（ext.cpm_integrated）不高于，人民币元，例如 50 是每千次播放不超过 50 元。示例：`50`。 |
| `gender` | 文本 |  | 只要女性或男性达人。取值：`female`、`male`。示例：`female`。 |
| `sort` | 文本 |  | 排序：relevance 平台的综合排序（默认）；lowest_cpm 按预期 CPM 从低到高，平台排的是 ext.cpm_promoted 那个口径，和 ext.cpm_integrated 的顺序不一定一样。取值：`relevance`（默认）、`lowest_cpm`。示例：`lowest_cpm`。 |
| `cursor` | 文本 |  | 上一页返回的游标。把上一页的 `page.next_cursor` 原样带上。每翻一页按一次调用收费。 |
| `view` | 文本 |  | 返回档位。三档价格相同。取值：`compact`、`standard`（默认）、`full`。 |
| `fields` | 文本列表 |  | 只要这些字段。按路径写，例如 `author.name`。 |

## 返回字段

`data.items` 是达人对象的列表。预览：结构可能调整，改之前会公告。

返回分三档：精简 `compact`（最常用的字段，长文本截短）、标准 `standard`（默认，全部标准字段）、完整 `full`（再加 `ext`，也就是这个平台特有的字段）。字段从表里写的那一档起出现，更大的档位也带。

| 字段 | 类型 | 说明 | 起始档位 | 这个接口 |
| --- | --- | --- | --- | --- |
| `id` | 文本 | 达人在这个营销市场里的编号。 | `compact` | 有 |
| `account_id` | 文本 | 这位达人的平台账号编号，可传给同平台的账号接口。 | `compact` | 这个接口不提供 |
| `username` | 文本 | 账号名。 | `compact` | 这个接口不提供 |
| `name` | 文本 | 显示名。 | `compact` | 有 |
| `avatar_url` | 链接 | 头像。 | `standard` | 有 |
| `location` | 文本 | 所在地，平台的原话。 | `standard` | 有 |
| `categories` | 文本列表 | 内容类目（一级），平台的原话。 | `compact` | 有 |
| `subcategories` | 文本列表 | 内容类目（二级），平台的原话。 | `standard` | 有 |
| `metrics` | 对象 | 达人的数字。 | `compact` | 有 |
| `metrics.followers` | 整数 | 粉丝数。 | `compact` | 有 |
| `ext.uid` | 文本 | 这位达人的抖音账号的数字编号（uid）；不是账号接口用的那个编号。 | `full` | 有 |
| `ext.rate_integrated` | 金额 | 植入视频（品牌植入达人自己的内容）的报价，人民币元。 | `full` | 有 |
| `ext.rate_custom` | 金额 | 定制视频（为品牌专门做的视频）的报价，人民币元。 | `full` | 有 |
| `ext.expected_views` | 整数 | 平台预估的单条视频播放数。 | `full` | 有 |
| `ext.cpm_integrated` | 金额 | 植入视频的预期千次播放成本（CPM），人民币元：植入视频报价除以平台预估播放数再乘 1000；没设报价或平台没预估时为 null。 | `full` | 有 |
| `ext.cpm_custom` | 金额 | 定制视频的预期千次播放成本（CPM），人民币元，算法同上；没有时为 null。 | `full` | 有 |
| `ext.cpm_promoted` | 金额 | 星图另一种口径的植入视频预期千次播放成本，人民币元：同一份报价，除以平台的“推广预估播放数”（不是 expected_views）再乘 1000，和 cpm_integrated 可高可低；搜索按 CPM 排序（sort=lowest_cpm）排的就是这个数；没有时为 null。 | `full` | 有 |
| `ext.interaction_rate_30d` | 数字 | 近 30 天视频的互动率，0 到 1（0.0085 是 0.85%）；平台没算时为 null。 | `full` | 有 |
| `ext.completion_rate_30d` | 数字 | 近 30 天视频的完播率，0 到 1；平台没算时为 null。 | `full` | 有 |
| `ext.views_median_30d` | 数字 | 近 30 天视频播放数的中位数（视频数是偶数时可能带 .5）；平台没算时为 null。 | `full` | 有 |
| `ext.ecommerce_level` | 文本 | 星图给的电商带货等级，L0 到 L6，平台的原话；没有时为 null。 | `full` | 有 |
| `ext.gender` | 文本 | 达人的性别：female 女、male 男；平台没写时为 null。取值：`female`、`male`。 | `full` | 有 |
| `ext.content_labels` | 文本列表 | 星图给达人内容打的主题标签，平台的原话（搜索结果里是近 180 天的）；没有时为 null。 | `full` | 有 |
| `approximate` | 对象列表 | 这一条里哪些数是约数或下限；都是准确值时不出现。 | `compact` | 有 |
| `approximate[].field` | 文本 | 字段的路径，如 metrics.views。 | `compact` | 有 |
| `approximate[].kind` | 文本 | 约数，还是下限。取值：`approximate`、`lower_bound`。 | `compact` | 有 |

某一条本来就没有这个值时，字段给 `null`。这个接口给不了的字段不出现，统一列在 `meta.unavailable`。

每条数据的典型体积：`compact` 115 B、`standard` 310 B、`full` 618 B（按 2026-10-12 22:06 UTC 录下的那次返回量的）。

## 翻页

每页 20 条。每页条数由平台决定，不收 `limit`。

取下一页时把 `page.next_cursor` 作为 `cursor` 带上；游标有效期 1 小时。最后一页的 `page.has_more` 是 false。

## 什么时候收费

| 情况 | 收费 |
| --- | --- |
| 返回了数据 | $0.0040，每次调用收一次 |
| 每翻一页 | 按一次调用另收 |
| 参数不合法、出错、超时 | 不收费 |
| 单次最高扣费 | $0.0040 (带 `X-Max-Price` 可以设自己的上限，超过就不执行) |

价格读取于 2026-11-28 06:28 UTC，按价目版本 30，2026-11-28 04:43 UTC 起生效；在 Playground 里运行前会再读一次当前价格。

## 常见报错

所有报错都是同一个结构：`code`、`message`、`charged`、`retry`、`retry_after_seconds`、`param`、`docs_url`。

| 状态码 | 代码 | 含义 | 是否扣费 | 能否重试 |
| --- | --- | --- | --- | --- |
| 400 | `invalid_params` | 参数不合法 | 未扣费 | 改了再试 |
| 400 | `request_not_served` | 这种参数组合现在取不了 | 未扣费 | 改了再试 |
| 400 | `max_price_exceeded` | 这次调用的最高价超过了你设的上限 | 未扣费 | 改了再试 |
| 400 | `cursor_invalid` | 游标不存在 | 未扣费 | 不能 |
| 400 | `cursor_mismatch` | 游标不是用这个接口和这组参数取得的 | 未扣费 | 改了再试 |
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
| 410 | `cursor_expired` | 游标已过期，请从第一页重新开始 | 未扣费 | 不能 |
| 410 | `run_expired` | 这一轮任务已到期，不能再发起调用 | 未扣费 | 不能 |
| 429 | `rate_limited` | 请求过快或同时进行的调用过多 | 未扣费 | 能 |
| 429 | `cost_cap_exceeded` | 这个账户今天的额度已用完 | 未扣费 | 能 |
| 429 | `uncharged_cost_limit` | 这个账户今天没取到数据、也没扣费的调用太多，这类接口到明天（UTC）再调 | 未扣费 | 能 |
| 500 | `settlement_unknown` | 这次调用的结算状态未知，请用同一个幂等键或请求号查询 | 待确认：按请求号查询 | 只能用同一个幂等键 |
| 500 | `internal_error` | 服务内部出错 | 未扣费 | 能 |
| 502 | `upstream_failed` | 这次没有取到结果，没有扣费，可以稍后重试 | 未扣费 | 能 |
| 502 | `cursor_unavailable` | 这个游标现在不可用，稍后重试或从第一页重新开始 | 未扣费 | 能 |
| 503 | `upstream_busy` | 现在请求较多，请稍后重试 | 未扣费 | 能 |
| 503 | `capability_paused` | 这个接口已暂停 | 未扣费 | 能 |
| 503 | `overloaded` | 服务繁忙，请稍后重试 | 未扣费 | 能 |
| 504 | `timeout` | 没有在时限内取到数据，可以用同一个幂等键重试 | 未扣费 | 能 |

[全部错误码](https://dataxapi.com/zh/docs/errors/)

## 请求

代码里的 Key 从环境变量读，不把真 Key 写进页面。

### cURL

```bash
curl -G "https://api.dataxapi.com/v1/douyin/xingtu/creators/search" \
  --data-urlencode "query=美食" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
# pip install dataxapi
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.douyin.xingtu.creators.search(query="美食")
print(result["data"]["items"])
```

### TypeScript

```typescript
// npm i @dataxapi/sdk
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.douyin.xingtu.creators.search({ query: "美食" });
console.log(result.data.items);
```

### 命令行

```bash
dataxapi call douyin.xingtu.creators.search 'query=美食'
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

把这段加进你的 MCP 客户端，然后让你的 AI 调用 `douyin.xingtu.creators.search`。

## 返回

### 200

取自 2026-10-12 22:06 UTC 录下的真实返回。名字、正文和编号是示例，链接也是，都不是录到的原文（页面不展示任何人的个人信息）；数字是原样。长列表做了截断。请求号、游标和余额是示意。

返回大小：标准档 6.5 KB（精简 2.7 KB，完整 12.6 KB）。

```jsonc
{
  "code": "ok",
  "request_id": "868ddbde-b3c7-4d7f-b06d-9222e36252a7",
  "data": {
    "items": [
      {
        "id": "6811001738597474041",
        "name": "橘子汽水不加冰",
        "avatar_url": "https://p3-pc.douyinpic.com/aweme/100x100/aweme-avatar/tos-cn-avt-0015_49724ca5b7a50c72cbe5.jpeg",
        "location": "北京",
        "categories": ["户外"],
        "subcategories": ["家居好物"],
        "metrics": { "followers": 48169 }
      },
      // … 另有 19 条
    ]
  },
  "page": {
    "next_cursor": "c1.Xg3q38In7offq-5CuKi-UcARHThe6dxGEKhgaR5D",
    "cursor_expires_at": "2026-10-12T23:06:50.000Z",
    "has_more": true,
    "returned": 20
  },
  "warnings": [],
  "meta": {
    "capability": "douyin.xingtu.creators.search",
    "result_status": "complete",
    "fetched_at": "2026-10-12T22:06:50.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": { "account_id": "capability", "username": "capability" },
    "billing": {
      "amount": "0.004",
      "currency": "USD",
      "balance_after": "9.996"
    }
  }
}
```

### 空结果

取自 2026-10-12 21:49 UTC 录下的真实返回。请求号和余额是示意。

返回大小：标准档 461 B（精简 461 B，完整 461 B）。

```jsonc
{
  "code": "ok",
  "request_id": "74610c81-b415-41c4-895f-93b810786fa1",
  "data": { "items": [] },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 0
  },
  "warnings": [],
  "meta": {
    "capability": "douyin.xingtu.creators.search",
    "result_status": "empty",
    "fetched_at": "2026-10-12T21:49:31.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": { "account_id": "capability", "username": "capability" },
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
  "request_id": "10d1fdde-11bc-4fe3-b01d-ee59754c9c94",
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
  "request_id": "093ef1b0-637a-4ca7-a7cf-bee67e042469",
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

### 502

按规范写的示例，不是录下的返回。

```json
{
  "code": "upstream_failed",
  "request_id": "8a721a18-346a-442c-8dd0-c1a791ea03eb",
  "message": "No result came back this time and nothing was charged; retry shortly",
  "message_zh": "这次没有取到结果，没有扣费，可以稍后重试",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

这份录制的返回：平台原始 JSON 2.9 万 token，DataXAPI 的 JSON 2,302 token，AI 通过 DataXAPI 的 MCP 读到 771 token，少 97%（2026-11-06 统计）。

[这份示例的 JSON 文件](https://dataxapi.com/apis/douyin/xingtu/creators/search.example.json)

## 在你的 AI 里用它

`dataxapi setup` 给这台电脑上的 AI 代理（Claude Code、Codex、Cursor）装好 DataXAPI 的 MCP 服务和基础技能。Key 从环境变量 DATAXAPI_API_KEY 读，不写进任何文件。

MCP 服务地址：`https://api.dataxapi.com/mcp`。你的客户端要填的配置在本页请求示例的“MCP”页签里；接好后让你的 AI 调用 `douyin.xingtu.creators.search`。

或者把这段话贴给任意一个 AI：

> 读一下 https://dataxapi.com/zh/apis/douyin/xingtu/creators/search.md，然后帮我用 DataXAPI 的接口 douyin.xingtu.creators.search（抖音星图达人搜索）。

[在 ChatGPT 里打开](https://chatgpt.com/?q=%E8%AF%BB%E4%B8%80%E4%B8%8B%20https%3A%2F%2Fdataxapi.com%2Fzh%2Fapis%2Fdouyin%2Fxingtu%2Fcreators%2Fsearch.md%EF%BC%8C%E7%84%B6%E5%90%8E%E5%B8%AE%E6%88%91%E7%94%A8%20DataXAPI%20%E7%9A%84%E6%8E%A5%E5%8F%A3%20douyin.xingtu.creators.search%EF%BC%88%E6%8A%96%E9%9F%B3%E6%98%9F%E5%9B%BE%E8%BE%BE%E4%BA%BA%E6%90%9C%E7%B4%A2%EF%BC%89%E3%80%82) · [在 Claude 里打开](https://claude.ai/new?q=%E8%AF%BB%E4%B8%80%E4%B8%8B%20https%3A%2F%2Fdataxapi.com%2Fzh%2Fapis%2Fdouyin%2Fxingtu%2Fcreators%2Fsearch.md%EF%BC%8C%E7%84%B6%E5%90%8E%E5%B8%AE%E6%88%91%E7%94%A8%20DataXAPI%20%E7%9A%84%E6%8E%A5%E5%8F%A3%20douyin.xingtu.creators.search%EF%BC%88%E6%8A%96%E9%9F%B3%E6%98%9F%E5%9B%BE%E8%BE%BE%E4%BA%BA%E6%90%9C%E7%B4%A2%EF%BC%89%E3%80%82)

## 相关

这是 DataXAPI 达人数据的一部分。同一把 Key 还能用：社交媒体、广告、电商。

同一件事的其他平台：[小红书蒲公英博主搜索](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/search/)

抖音星图的接口：[抖音星图达人商业报价](https://dataxapi.com/zh/apis/douyin/xingtu/creators/rates/get/)、[抖音星图达人搜索](https://dataxapi.com/zh/apis/douyin/xingtu/creators/search/)、[抖音星图达人资料](https://dataxapi.com/zh/apis/douyin/xingtu/creators/get/)、[抖音星图达人粉丝画像](https://dataxapi.com/zh/apis/douyin/xingtu/creators/audience/get/)、[抖音星图达人传播数据](https://dataxapi.com/zh/apis/douyin/xingtu/creators/metrics/)、[抖音星图达人作品表现](https://dataxapi.com/zh/apis/douyin/xingtu/creators/videos/list/)、[抖音星图达人内容热词](https://dataxapi.com/zh/apis/douyin/xingtu/creators/keywords/get/)、[抖音星图达人星图指数](https://dataxapi.com/zh/apis/douyin/xingtu/creators/scores/get/)、[抖音星图达人内容分布](https://dataxapi.com/zh/apis/douyin/xingtu/creators/content_mix/get/)、[抖音星图达人转化能力](https://dataxapi.com/zh/apis/douyin/xingtu/creators/conversion/get/)、[抖音星图营销活动日历](https://dataxapi.com/zh/apis/douyin/xingtu/campaigns/list/)、[抖音星图视频数据报告（播放量、完播率）](https://dataxapi.com/zh/apis/douyin/xingtu/videos/get/)、[抖音星图达人粉丝画像（备用版）](https://dataxapi.com/zh/apis/douyin/xingtu/backup/creators/audience/get/)

抖音的接口：[抖音评论回复](https://dataxapi.com/zh/apis/douyin/comments/replies/list/)、[抖音话题视频](https://dataxapi.com/zh/apis/douyin/hashtags/videos/list/)、[抖音热榜](https://dataxapi.com/zh/apis/douyin/trends/list/)、[抖音用户资料](https://dataxapi.com/zh/apis/douyin/users/get/)、[抖音达人互动与粉丝趋势](https://dataxapi.com/zh/apis/douyin/users/history/)、[抖音用户搜索](https://dataxapi.com/zh/apis/douyin/users/search/)、[抖音用户视频](https://dataxapi.com/zh/apis/douyin/users/videos/list/)、[抖音视频评论](https://dataxapi.com/zh/apis/douyin/videos/comments/list/)、[抖音视频详情](https://dataxapi.com/zh/apis/douyin/videos/get/)、[抖音视频转文字（文案提取、逐字稿）](https://dataxapi.com/zh/apis/douyin/videos/transcript/get/)、[抖音视频播放量](https://dataxapi.com/zh/apis/douyin/videos/metrics/)、[抖音相关视频](https://dataxapi.com/zh/apis/douyin/videos/related/)、[抖音视频搜索](https://dataxapi.com/zh/apis/douyin/videos/search/)、[抖音视频榜](https://dataxapi.com/zh/apis/douyin/videos/trending/)、[抖音搜索框联想词](https://dataxapi.com/zh/apis/douyin/keywords/related/)、[抖音无水印视频和图片下载地址](https://dataxapi.com/zh/apis/douyin/videos/media/get/)、[抖音音乐详情（背景音乐 MP3 和使用人数）](https://dataxapi.com/zh/apis/douyin/music/get/)、[抖音用户视频（备用版）](https://dataxapi.com/zh/apis/douyin/backup/users/videos/list/)、[抖音视频搜索（备用版）](https://dataxapi.com/zh/apis/douyin/backup/videos/search/)

抖音巨量算数的接口：[抖音巨量算数品牌指数趋势](https://dataxapi.com/zh/apis/douyin/index/brands/history/)、[抖音巨量算数品牌指数对比](https://dataxapi.com/zh/apis/douyin/index/brands/metrics/)、[抖音巨量算数达人热门视频](https://dataxapi.com/zh/apis/douyin/index/creators/videos/list/)、[抖音巨量算数达人粉丝画像](https://dataxapi.com/zh/apis/douyin/index/creators/audience/get/)、[抖音巨量算数达人核心指标](https://dataxapi.com/zh/apis/douyin/index/creators/metrics/)、[抖音巨量算数关键词人群画像](https://dataxapi.com/zh/apis/douyin/index/keywords/audience/get/)、[抖音巨量算数关键词热度趋势](https://dataxapi.com/zh/apis/douyin/index/keywords/history/)、[抖音巨量算数关联词](https://dataxapi.com/zh/apis/douyin/index/keywords/related/)、[抖音巨量算数实时热点](https://dataxapi.com/zh/apis/douyin/index/trends/list/)、[抖音巨量算数关键词热门视频](https://dataxapi.com/zh/apis/douyin/index/videos/search/)

怎么做和常见问题：[如何查询抖音星图达人报价](https://dataxapi.com/zh/guides/douyin-xingtu-creator-rates/)、[抖音星图是什么？通过 API 能拿到哪些达人数据？](https://dataxapi.com/zh/answers/what-is-douyin-xingtu/)、[抖音博主所有视频数据怎么导出（2026）](https://dataxapi.com/zh/answers/export-douyin-creator-videos/)、[蝉妈妈、千瓜、新榜有 API 吗？想要原始数据怎么办（2026）](https://dataxapi.com/zh/answers/chanmama-qiangua-newrank-api/)、[星图怎么批量筛达人、看报价（2026）](https://dataxapi.com/zh/answers/douyin-xingtu-creators-bulk-filter/)、[抖音数据接口有哪些？第三方接口和开放平台的区别，能取什么（2026）](https://dataxapi.com/zh/answers/douyin-third-party-data-apis/)、[抖音 MCP：在 Claude、Cursor 里查抖音视频和评论（2026）](https://dataxapi.com/zh/answers/douyin-mcp/)、[抖音、小红书达人数据怎么批量取？KOL 资料、作品和报价（2026）](https://dataxapi.com/zh/answers/douyin-xiaohongshu-creator-data/)、[抖音星图达人页上的每个数据，API 都能取到吗？逐项对照（2026）](https://dataxapi.com/zh/answers/douyin-xingtu-creator-page-fields/)、[星图植入视频和定制视频报价有什么区别？怎么用 API 取（2026）](https://dataxapi.com/zh/answers/douyin-xingtu-integrated-vs-custom-rate/)、[星图怎么按 CPM 找达人？筛出 CPM 低的抖音达人（2026）](https://dataxapi.com/zh/answers/douyin-xingtu-find-creators-by-cpm/)、[怎么查一个抖音号有没有商品橱窗、能不能直播带货、是不是蓝 V？（2026）](https://dataxapi.com/zh/answers/douyin-account-showcase-live-selling/)、[小红书蒲公英和星图的区别？两边的达人数据怎么对着看（2026）](https://dataxapi.com/zh/answers/xiaohongshu-pgy-vs-douyin-xingtu/)、[100 万粉丝的星图报价怎么查？按粉丝段批量查抖音达人报价（2026）](https://dataxapi.com/zh/answers/douyin-xingtu-rates-by-followers/)、[巨量星图有 API 接口吗？官方接口能查什么，查别的达人怎么办（2026）](https://dataxapi.com/zh/answers/douyin-xingtu-api/)

相关：[抖音星图的全部接口](https://dataxapi.com/zh/apis/douyin/xingtu/)、[抖音的全部接口](https://dataxapi.com/zh/apis/douyin/)、[达人数据](https://dataxapi.com/zh/categories/creator/)、[这件事在 2 个平台上的对照](https://dataxapi.com/zh/roles/creators-search/)、[达人对象的字段](https://dataxapi.com/zh/docs/objects/creator/)

## 常见问题

### 抖音星图达人搜索 API 多少钱？

$0.0040 一次。单次最高扣费 $0.0040。

### 什么情况下不收费？

出错和超时不收费。

### 一次返回多少条？怎么翻页？

每页 20 条。每页条数由平台决定，不收 limit。取下一页时把 page.next_cursor 作为 cursor 带上；游标有效期 1 小时。最后一页的 page.has_more 是 false。

---

最后核对于 2026-11-28 06:28 UTC。目录修订号 ceced48b38f71468。 [网页版](https://dataxapi.com/zh/apis/douyin/xingtu/creators/search/)
