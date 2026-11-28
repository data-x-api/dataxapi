# 知乎搜索框联想词 API

按关键词取知乎搜索框里输入这个词时给的联想词（下拉补全），按知乎列出的顺序排，一次约 10 个。只有词和名次，没有指数。每次约 10 条，最多 20 条；$0.0020 一次。出错和超时不收费。

- 地址：`GET https://api.dataxapi.com/v1/zhihu/keywords/related`
- 编号：`zhihu.keywords.related`
- 也叫：知乎联想词、知乎下拉词、知乎搜索下拉框、知乎搜索推荐词、知乎搜索预测词、知乎自动补全
- 价格：$0.0020 / 次
- 当前状态不写在这一页上（页面是快照），实时读：`GET https://api.dataxapi.com/v1/catalog/status`
- 返回：每页最多 20 条, 一次给全，不翻页
- 返回关联词，预览结构，以后可能调整
- [在 Playground 里跑一次](https://dataxapi.com/zh/console/playground/?capability=zhihu.keywords.related&params=%7B%22keyword%22%3A%22%E9%9C%B2%E8%90%A5%22%7D)
- 英文名：[Zhihu search suggestions API](https://dataxapi.com/apis/zhihu/keywords/related/)

## 能拿到什么

2026-11-28 04:06 UTC 录下的真实返回（露营惊蛇），这里是前 4 行。

| 字段 | 值 |
| --- | --- |
| keyword | 露营惊蛇 |
| related_to | 露营 |
| relation | suggestion |
| rank | 1 |

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `keyword` | 文本 | 是 | 一个关键词。示例：`露营`。 |
| `view` | 文本 |  | 返回档位。三档价格相同。取值：`compact`、`standard`（默认）、`full`。 |
| `fields` | 文本列表 |  | 只要这些字段。按路径写，例如 `author.name`。 |

## 返回字段

`data.items` 是关联词对象的列表。预览：结构可能调整，改之前会公告。

返回分三档：精简 `compact`（最常用的字段，长文本截短）、标准 `standard`（默认，全部标准字段）、完整 `full`（再加 `ext`，也就是这个平台特有的字段）。字段从表里写的那一档起出现，更大的档位也带。

| 字段 | 类型 | 说明 | 起始档位 | 这个接口 |
| --- | --- | --- | --- | --- |
| `keyword` | 文本 | 关联词。 | `compact` | 有 |
| `related_to` | 文本 | 它是哪个词的关联词：所查的那个关键词。 | `compact` | 有 |
| `relation` | 文本 | 怎么关联的：query 是搜索里一起出现，posts 是内容里一起出现，prior 是人们搜所查的词之前搜的，after 是之后搜的，suggestion 是在搜索框里输入所查的词时平台给的联想词。取值：`query`、`posts`、`prior`、`after`、`suggestion`。 | `compact` | 有 |
| `rank` | 整数 | 在同一种关联里按相关度排第几，从 1 起。在这个平台上：在搜索框列出的联想词里排第几，从 1 起；不算所查的词本身。 | `compact` | 有 |
| `relevance` | 数字 | 和所查的词的相关度，0 到 1。 | `compact` | 平台没有 |
| `search_index` | 整数 | 这个关联词的搜索指数：平台算出的指数，不是搜索次数；平台不给这个词的数时为 null。 | `compact` | 平台没有 |
| `composite_index` | 整数 | 这个关联词的综合指数：平台把相关内容的热度合起来算出的指数，不是次数。 | `compact` | 平台没有 |
| `approximate` | 对象列表 | 这一条里哪些数是约数或下限；都是准确值时不出现。 | `compact` | 有 |
| `approximate[].field` | 文本 | 字段的路径，如 metrics.views。 | `compact` | 有 |
| `approximate[].kind` | 文本 | 约数，还是下限。取值：`approximate`、`lower_bound`。 | `compact` | 有 |

某一条本来就没有这个值时，字段给 `null`。这个接口给不了的字段不出现，统一列在 `meta.unavailable`。

每条数据的典型体积：`compact` 86 B、`standard` 86 B、`full` 86 B（按 2026-11-28 04:06 UTC 录下的那次返回量的）。

## 翻页

每页约 10 条，最多 20 条。每页条数由平台决定，不收 `limit`。

一次给全，不发游标。

## 什么时候收费

| 情况 | 收费 |
| --- | --- |
| 返回了数据 | $0.0020，每次调用收一次 |
| 参数不合法、出错、超时 | 不收费 |
| 单次最高扣费 | $0.0020 (带 `X-Max-Price` 可以设自己的上限，超过就不执行) |

价格读取于 2026-11-28 06:28 UTC，按价目版本 30，2026-11-28 04:43 UTC 起生效；在 Playground 里运行前会再读一次当前价格。

## 对象不存在时

知乎没有联想词的词返回空结果，不报“不存在”。

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
curl -G "https://api.dataxapi.com/v1/zhihu/keywords/related" \
  --data-urlencode "keyword=露营" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
# pip install dataxapi
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.zhihu.keywords.related(keyword="露营")
print(result["data"]["items"])
```

### TypeScript

```typescript
// npm i @dataxapi/sdk
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.zhihu.keywords.related({ keyword: "露营" });
console.log(result.data.items);
```

### 命令行

```bash
dataxapi call zhihu.keywords.related 'keyword=露营'
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

把这段加进你的 MCP 客户端，然后让你的 AI 调用 `zhihu.keywords.related`。

## 返回

### 200

取自 2026-11-28 04:06 UTC 录下的真实返回。名字、正文和编号是示例，链接也是，都不是录到的原文（页面不展示任何人的个人信息）；数字是原样。长列表做了截断。请求号、游标和余额是示意。

返回大小：标准档 1.3 KB（精简 1.3 KB，完整 1.3 KB）。

```jsonc
{
  "code": "ok",
  "request_id": "0aa78e0f-f7ad-41df-895d-884077fdea3f",
  "data": {
    "items": [
      {
        "keyword": "露营惊蛇",
        "related_to": "露营",
        "relation": "suggestion",
        "rank": 1
      },
      // … 另有 9 条
    ]
  },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 10
  },
  "warnings": [],
  "meta": {
    "capability": "zhihu.keywords.related",
    "result_status": "complete",
    "fetched_at": "2026-11-28T04:06:41.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "relevance": "platform",
      "search_index": "platform",
      "composite_index": "platform"
    },
    "billing": {
      "amount": "0.002",
      "currency": "USD",
      "balance_after": "9.998"
    }
  }
}
```

### 空结果

取自 2026-11-28 04:06 UTC 录下的真实返回。请求号和余额是示意。

返回大小：标准档 482 B（精简 482 B，完整 482 B）。

```jsonc
{
  "code": "ok",
  "request_id": "2ccf758b-fd9a-405e-9d9f-858b8a150892",
  "data": { "items": [] },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 0
  },
  "warnings": [],
  "meta": {
    "capability": "zhihu.keywords.related",
    "result_status": "empty",
    "fetched_at": "2026-11-28T04:06:42.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "relevance": "platform",
      "search_index": "platform",
      "composite_index": "platform"
    },
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
  "request_id": "112d94d2-5e11-4aea-b00f-9e4df131c2fb",
  "message": "A parameter is invalid",
  "message_zh": "参数不合法",
  "charged": false,
  "retry": "after_fix",
  "retry_after_seconds": null,
  "param": null,
  "problems": ["keyword is required"],
  "docs_url": "https://dataxapi.com/docs/errors#invalid_params"
}
```

### 402

按规范写的示例，不是录下的返回。

```json
{
  "code": "insufficient_balance",
  "request_id": "79de135b-70ac-445a-b217-496dde084d1a",
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
  "request_id": "045d0fce-2f01-4af3-bcc0-12f1d2199cc7",
  "message": "No result came back this time and nothing was charged; retry shortly",
  "message_zh": "这次没有取到结果，没有扣费，可以稍后重试",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

[这份示例的 JSON 文件](https://dataxapi.com/apis/zhihu/keywords/related.example.json)

## 在你的 AI 里用它

`dataxapi setup` 给这台电脑上的 AI 代理（Claude Code、Codex、Cursor）装好 DataXAPI 的 MCP 服务和基础技能。Key 从环境变量 DATAXAPI_API_KEY 读，不写进任何文件。

MCP 服务地址：`https://api.dataxapi.com/mcp`。你的客户端要填的配置在本页请求示例的“MCP”页签里；接好后让你的 AI 调用 `zhihu.keywords.related`。

或者把这段话贴给任意一个 AI：

> 读一下 https://dataxapi.com/zh/apis/zhihu/keywords/related.md，然后帮我用 DataXAPI 的接口 zhihu.keywords.related（知乎搜索框联想词）。

[在 ChatGPT 里打开](https://chatgpt.com/?q=%E8%AF%BB%E4%B8%80%E4%B8%8B%20https%3A%2F%2Fdataxapi.com%2Fzh%2Fapis%2Fzhihu%2Fkeywords%2Frelated.md%EF%BC%8C%E7%84%B6%E5%90%8E%E5%B8%AE%E6%88%91%E7%94%A8%20DataXAPI%20%E7%9A%84%E6%8E%A5%E5%8F%A3%20zhihu.keywords.related%EF%BC%88%E7%9F%A5%E4%B9%8E%E6%90%9C%E7%B4%A2%E6%A1%86%E8%81%94%E6%83%B3%E8%AF%8D%EF%BC%89%E3%80%82) · [在 Claude 里打开](https://claude.ai/new?q=%E8%AF%BB%E4%B8%80%E4%B8%8B%20https%3A%2F%2Fdataxapi.com%2Fzh%2Fapis%2Fzhihu%2Fkeywords%2Frelated.md%EF%BC%8C%E7%84%B6%E5%90%8E%E5%B8%AE%E6%88%91%E7%94%A8%20DataXAPI%20%E7%9A%84%E6%8E%A5%E5%8F%A3%20zhihu.keywords.related%EF%BC%88%E7%9F%A5%E4%B9%8E%E6%90%9C%E7%B4%A2%E6%A1%86%E8%81%94%E6%83%B3%E8%AF%8D%EF%BC%89%E3%80%82)

## 相关

这是 DataXAPI 社交媒体数据的一部分。同一把 Key 还能用：达人、广告、电商。

其他平台的社交媒体数据：[抖音巨量算数关联词](https://dataxapi.com/zh/apis/douyin/index/keywords/related/)、[小红书蒲公英关联词](https://dataxapi.com/zh/apis/xiaohongshu/pgy/keywords/related/)、[微信搜一搜推荐词](https://dataxapi.com/zh/apis/wechat/keywords/related/)、[抖音搜索框联想词](https://dataxapi.com/zh/apis/douyin/keywords/related/)、[小红书搜索框联想词](https://dataxapi.com/zh/apis/xiaohongshu/keywords/related/)、[抖音评论回复](https://dataxapi.com/zh/apis/douyin/comments/replies/list/)、[抖音话题视频](https://dataxapi.com/zh/apis/douyin/hashtags/videos/list/)、[B站评论回复](https://dataxapi.com/zh/apis/bilibili/comments/replies/list/)、[B站热搜榜](https://dataxapi.com/zh/apis/bilibili/trends/list/)、[B站用户资料](https://dataxapi.com/zh/apis/bilibili/users/get/)、[B站用户投稿](https://dataxapi.com/zh/apis/bilibili/users/videos/list/)、[B站视频评论](https://dataxapi.com/zh/apis/bilibili/videos/comments/list/)、[B站视频详情](https://dataxapi.com/zh/apis/bilibili/videos/get/)、[B站视频转文字（文案提取、逐字稿）](https://dataxapi.com/zh/apis/bilibili/videos/transcript/get/)

知乎的接口：[知乎回答评论](https://dataxapi.com/zh/apis/zhihu/answers/comments/list/)、[知乎回答详情](https://dataxapi.com/zh/apis/zhihu/answers/get/)、[知乎文章详情](https://dataxapi.com/zh/apis/zhihu/articles/get/)、[知乎专栏文章列表](https://dataxapi.com/zh/apis/zhihu/columns/articles/list/)、[知乎评论回复](https://dataxapi.com/zh/apis/zhihu/comments/replies/list/)、[知乎想法详情](https://dataxapi.com/zh/apis/zhihu/pins/get/)、[知乎内容搜索](https://dataxapi.com/zh/apis/zhihu/posts/search/)、[知乎问题回答](https://dataxapi.com/zh/apis/zhihu/questions/answers/list/)、[知乎问题详情](https://dataxapi.com/zh/apis/zhihu/questions/get/)、[知乎热榜](https://dataxapi.com/zh/apis/zhihu/trends/list/)、[知乎用户回答](https://dataxapi.com/zh/apis/zhihu/users/answers/list/)、[知乎用户文章](https://dataxapi.com/zh/apis/zhihu/users/articles/list/)、[知乎用户粉丝列表](https://dataxapi.com/zh/apis/zhihu/users/followers/list/)、[知乎用户资料](https://dataxapi.com/zh/apis/zhihu/users/get/)、[知乎用户想法](https://dataxapi.com/zh/apis/zhihu/users/pins/list/)、[知乎用户搜索](https://dataxapi.com/zh/apis/zhihu/users/search/)

相关：[知乎的全部接口](https://dataxapi.com/zh/apis/zhihu/)、[社交媒体数据](https://dataxapi.com/zh/categories/social/)、[关联词对象的字段](https://dataxapi.com/zh/docs/objects/keyword_related/)

## 常见问题

### 知乎搜索框联想词 API 多少钱？

$0.0020 一次。单次最高扣费 $0.0020。

### 什么情况下不收费？

出错和超时不收费。

### 一次返回多少条？怎么翻页？

每页约 10 条，最多 20 条。每页条数由平台决定，不收 limit。一次给全，不发游标。

### 对象不存在会怎样？

知乎没有联想词的词返回空结果，不报“不存在”。

---

最后核对于 2026-11-28 06:28 UTC。目录修订号 ceced48b38f71468。 [网页版](https://dataxapi.com/zh/apis/zhihu/keywords/related/)
