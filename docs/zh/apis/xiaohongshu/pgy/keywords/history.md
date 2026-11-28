# 小红书蒲公英关键词逐日搜索指数 API

按一个关键词取它在小红书上最近约三个月逐日的搜索指数（蒲公英），并带每天和这个词有关的笔记数、曝光数、阅读数和互动数。时间范围由平台定，不能选；搜索指数是平台算出的指数，不是搜索次数；日期是中国时间（UTC+8）的自然日。每次取一个对象；$0.0400 一次。出错和超时不收费。

- 地址：`GET https://api.dataxapi.com/v1/xiaohongshu/pgy/keywords/history`
- 编号：`xiaohongshu.pgy.keywords.history`
- 也叫：小红书关键词指数、小红书搜索指数、蒲公英关键词趋势、小红书关键词热度
- 价格：$0.0400 / 次
- 当前状态不写在这一页上（页面是快照），实时读：`GET https://api.dataxapi.com/v1/catalog/status`
- 返回：1 个对象, 一个关键词指数历史对象
- 返回关键词指数历史，预览结构，以后可能调整
- [在 Playground 里跑一次](https://dataxapi.com/zh/console/playground/?capability=xiaohongshu.pgy.keywords.history&params=%7B%22keyword%22%3A%22%E9%9D%A2%E8%86%9C%22%7D)
- 英文名：[Xiaohongshu PGY keyword search index API](https://dataxapi.com/apis/xiaohongshu/pgy/keywords/history/)

## 能拿到什么

2026-10-12 21:42 UTC 录下的真实返回（露营），这里是前 7 行。

| date | search_index | notes | impressions | views | engagements |
| --- | --- | --- | --- | --- | --- |
| 2026-07-13 | 8,876 | 33,361 | 25,229,649 | 4,523,846 | 188,216 |
| 2026-07-14 | 8,762 | 33,750 | 24,457,001 | 4,743,520 | 197,829 |
| 2026-07-15 | 9,077 | 33,603 | 24,578,646 | 4,554,487 | 210,434 |
| 2026-07-16 | 9,328 | 34,232 | 28,302,245 | 4,819,305 | 220,431 |
| 2026-07-17 | 11,233 | 34,532 | 32,434,694 | 5,831,644 | 278,646 |
| 2026-07-18 | 12,636 | 34,772 | 35,466,179 | 6,122,704 | 279,193 |
| 2026-07-19 | 11,490 | 35,368 | 37,495,492 | 8,187,198 | 302,141 |

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `keyword` | 文本 | 是 | 一个关键词。示例：`面膜`。 |
| `view` | 文本 |  | 返回档位。三档价格相同。取值：`compact`、`standard`（默认）、`full`。 |
| `fields` | 文本列表 |  | 只要这些字段。按路径写，例如 `author.name`。 |

## 返回字段

`data.item` 是一个关键词指数历史对象。预览：结构可能调整，改之前会公告。

返回分三档：精简 `compact`（最常用的字段，长文本截短）、标准 `standard`（默认，全部标准字段）、完整 `full`（再加 `ext`，也就是这个平台特有的字段）。字段从表里写的那一档起出现，更大的档位也带。

| 字段 | 类型 | 说明 | 起始档位 | 这个接口 |
| --- | --- | --- | --- | --- |
| `keyword` | 文本 | 关键词。 | `compact` | 有 |
| `points` | 对象列表 | 逐日的数，一天一项，从早到晚。 | `compact` | 有 |
| `points[].date` | 时间 | 日期：中国时间（UTC+8）的一个自然日，写成这个日期的 UTC 零点（北京时间当天 8 点）；原样传给 since、until 取的就是这一天。 | `compact` | 有 |
| `points[].search_index` | 整数 | 这一天的搜索指数：平台按搜索热度算出的指数，不是搜索次数。在这个平台上：平台没有公布算法。同一个词的历史值不会被重新换算，可以跨日比较；不同词之间不保证是同一刻度。 | `compact` | 有 |
| `points[].composite_index` | 整数 | 这一天的综合指数：平台把这个词相关内容的热度合起来算出的指数，不是次数。 | `compact` | 平台没有 |
| `points[].notes` | 整数 | 这一天和这个词有关的内容数。在这个平台上：不等于当天新发布的笔记数：同一篇笔记会被计入多天。 | `standard` | 有 |
| `points[].impressions` | 整数 | 这些内容这一天的曝光数。 | `standard` | 有 |
| `points[].views` | 整数 | 这些内容这一天的阅读数。 | `standard` | 有 |
| `points[].engagements` | 整数 | 这些内容这一天的互动数。在这个平台上：这一天的点赞、收藏、评论之和，不含分享和关注。 | `standard` | 有 |
| `approximate` | 对象列表 | 这一条里哪些数是约数或下限；都是准确值时不出现。 | `compact` | 有 |
| `approximate[].field` | 文本 | 字段的路径，如 metrics.views。 | `compact` | 有 |
| `approximate[].kind` | 文本 | 约数，还是下限。取值：`approximate`、`lower_bound`。 | `compact` | 有 |

某一条本来就没有这个值时，字段给 `null`。这个接口给不了的字段不出现，统一列在 `meta.unavailable`。

每条数据的典型体积：`compact` 4.8 KB、`standard` 11.4 KB、`full` 11.4 KB（按 2026-10-12 21:42 UTC 录下的那次返回量的）。

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
curl -G "https://api.dataxapi.com/v1/xiaohongshu/pgy/keywords/history" \
  --data-urlencode "keyword=面膜" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
# pip install dataxapi
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.xiaohongshu.pgy.keywords.history(keyword="面膜")
print(result["data"]["item"])
```

### TypeScript

```typescript
// npm i @dataxapi/sdk
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.xiaohongshu.pgy.keywords.history({ keyword: "面膜" });
console.log(result.data.item);
```

### 命令行

```bash
dataxapi call xiaohongshu.pgy.keywords.history 'keyword=面膜'
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

把这段加进你的 MCP 客户端，然后让你的 AI 调用 `xiaohongshu.pgy.keywords.history`。

## 返回

### 200

取自 2026-10-12 21:42 UTC 录下的真实返回。名字、正文和编号是示例，链接也是，都不是录到的原文（页面不展示任何人的个人信息）；数字是原样。长列表做了截断。请求号、游标和余额是示意。

返回大小：标准档 11.8 KB（精简 5.1 KB，完整 11.8 KB）。

```jsonc
{
  "code": "ok",
  "request_id": "5303d79c-7963-4548-a038-ec91bd3cae60",
  "data": {
    "item": {
      "keyword": "露营",
      "points": [
        {
          "date": "2026-07-13T00:00:00Z",
          "search_index": 8876,
          "notes": 33361,
          "impressions": 25229649,
          "views": 4523846,
          "engagements": 188216
        },
        {
          "date": "2026-07-14T00:00:00Z",
          "search_index": 8762,
          "notes": 33750,
          "impressions": 24457001,
          "views": 4743520,
          "engagements": 197829
        },
        {
          "date": "2026-07-15T00:00:00Z",
          "search_index": 9077,
          "notes": 33603,
          "impressions": 24578646,
          "views": 4554487,
          "engagements": 210434
        },
        {
          "date": "2026-07-16T00:00:00Z",
          "search_index": 9328,
          "notes": 34232,
          "impressions": 28302245,
          "views": 4819305,
          "engagements": 220431
        },
        {
          "date": "2026-07-17T00:00:00Z",
          "search_index": 11233,
          "notes": 34532,
          "impressions": 32434694,
          "views": 5831644,
          "engagements": 278646
        },
        {
          "date": "2026-07-18T00:00:00Z",
          "search_index": 12636,
          "notes": 34772,
          "impressions": 35466179,
          "views": 6122704,
          "engagements": 279193
        },
        {
          "date": "2026-07-19T00:00:00Z",
          "search_index": 11490,
          "notes": 35368,
          "impressions": 37495492,
          "views": 8187198,
          "engagements": 302141
        },
        // … 另有 85 条
      ]
    }
  },
  "warnings": [],
  "meta": {
    "capability": "xiaohongshu.pgy.keywords.history",
    "result_status": "complete",
    "fetched_at": "2026-10-12T21:42:12.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": { "points.composite_index": "platform" },
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
  "request_id": "05447f33-5c1e-4e26-a3f2-0e3fe95cd56a",
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
  "request_id": "f34e784f-5648-4640-8569-b371231bde51",
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
  "request_id": "d251cb91-d202-489a-9b3f-c4efc56c5c2d",
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
  "request_id": "9e81ec0e-db4c-450b-ae69-6ff0901d76a2",
  "message": "No result came back this time and nothing was charged; retry shortly",
  "message_zh": "这次没有取到结果，没有扣费，可以稍后重试",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

[这份示例的 JSON 文件](https://dataxapi.com/apis/xiaohongshu/pgy/keywords/history.example.json)

## 在你的 AI 里用它

`dataxapi setup` 给这台电脑上的 AI 代理（Claude Code、Codex、Cursor）装好 DataXAPI 的 MCP 服务和基础技能。Key 从环境变量 DATAXAPI_API_KEY 读，不写进任何文件。

MCP 服务地址：`https://api.dataxapi.com/mcp`。你的客户端要填的配置在本页请求示例的“MCP”页签里；接好后让你的 AI 调用 `xiaohongshu.pgy.keywords.history`。

或者把这段话贴给任意一个 AI：

> 读一下 https://dataxapi.com/zh/apis/xiaohongshu/pgy/keywords/history.md，然后帮我用 DataXAPI 的接口 xiaohongshu.pgy.keywords.history（小红书蒲公英关键词逐日搜索指数）。

[在 ChatGPT 里打开](https://chatgpt.com/?q=%E8%AF%BB%E4%B8%80%E4%B8%8B%20https%3A%2F%2Fdataxapi.com%2Fzh%2Fapis%2Fxiaohongshu%2Fpgy%2Fkeywords%2Fhistory.md%EF%BC%8C%E7%84%B6%E5%90%8E%E5%B8%AE%E6%88%91%E7%94%A8%20DataXAPI%20%E7%9A%84%E6%8E%A5%E5%8F%A3%20xiaohongshu.pgy.keywords.history%EF%BC%88%E5%B0%8F%E7%BA%A2%E4%B9%A6%E8%92%B2%E5%85%AC%E8%8B%B1%E5%85%B3%E9%94%AE%E8%AF%8D%E9%80%90%E6%97%A5%E6%90%9C%E7%B4%A2%E6%8C%87%E6%95%B0%EF%BC%89%E3%80%82) · [在 Claude 里打开](https://claude.ai/new?q=%E8%AF%BB%E4%B8%80%E4%B8%8B%20https%3A%2F%2Fdataxapi.com%2Fzh%2Fapis%2Fxiaohongshu%2Fpgy%2Fkeywords%2Fhistory.md%EF%BC%8C%E7%84%B6%E5%90%8E%E5%B8%AE%E6%88%91%E7%94%A8%20DataXAPI%20%E7%9A%84%E6%8E%A5%E5%8F%A3%20xiaohongshu.pgy.keywords.history%EF%BC%88%E5%B0%8F%E7%BA%A2%E4%B9%A6%E8%92%B2%E5%85%AC%E8%8B%B1%E5%85%B3%E9%94%AE%E8%AF%8D%E9%80%90%E6%97%A5%E6%90%9C%E7%B4%A2%E6%8C%87%E6%95%B0%EF%BC%89%E3%80%82)

## 相关

这是 DataXAPI 社交媒体数据的一部分。同一把 Key 还能用：达人、广告、电商。

小红书蒲公英的接口：[小红书蒲公英关键词逐日搜索指数](https://dataxapi.com/zh/apis/xiaohongshu/pgy/keywords/history/)、[小红书蒲公英关联词](https://dataxapi.com/zh/apis/xiaohongshu/pgy/keywords/related/)、[小红书蒲公英博主搜索](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/search/)、[小红书蒲公英博主详情](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/get/)、[小红书蒲公英博主粉丝画像](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/audience/get/)、[小红书蒲公英博主数据表现](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/metrics/)、[小红书蒲公英博主笔记](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/notes/list/)、[小红书蒲公英博主粉丝趋势](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/followers/history/)、[小红书蒲公英相似博主](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/related/)、[小红书蒲公英内容广场热门笔记](https://dataxapi.com/zh/apis/xiaohongshu/pgy/notes/trending/)、[小红书蒲公英博主合作成本和数据概览](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/costs/metrics/)、[小红书蒲公英博主粉丝概览](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/followers/metrics/)、[小红书蒲公英博主核心数据趋势](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/costs/history/)、[小红书蒲公英笔记数据](https://dataxapi.com/zh/apis/xiaohongshu/pgy/notes/get/)

小红书的接口：[小红书图片搜索](https://dataxapi.com/zh/apis/xiaohongshu/images/search/)、[小红书笔记详情](https://dataxapi.com/zh/apis/xiaohongshu/notes/get/)、[小红书评论回复](https://dataxapi.com/zh/apis/xiaohongshu/comments/replies/list/)、[小红书笔记评论](https://dataxapi.com/zh/apis/xiaohongshu/notes/comments/list/)、[小红书笔记搜索](https://dataxapi.com/zh/apis/xiaohongshu/notes/search/)、[小红书话题笔记](https://dataxapi.com/zh/apis/xiaohongshu/topics/notes/list/)、[小红书话题详情](https://dataxapi.com/zh/apis/xiaohongshu/topics/get/)、[小红书热点](https://dataxapi.com/zh/apis/xiaohongshu/trends/list/)、[小红书用户资料](https://dataxapi.com/zh/apis/xiaohongshu/users/get/)、[小红书用户笔记](https://dataxapi.com/zh/apis/xiaohongshu/users/notes/list/)、[小红书用户搜索](https://dataxapi.com/zh/apis/xiaohongshu/users/search/)、[小红书搜索框联想词](https://dataxapi.com/zh/apis/xiaohongshu/keywords/related/)、[小红书视频笔记详情（视频地址和字幕）](https://dataxapi.com/zh/apis/xiaohongshu/videos/get/)、[小红书视频转文字（文案提取、逐字稿）](https://dataxapi.com/zh/apis/xiaohongshu/videos/transcript/get/)、[小红书无水印原图和实况图下载地址](https://dataxapi.com/zh/apis/xiaohongshu/notes/media/get/)、[小红书无水印视频下载地址（各档清晰度和字幕）](https://dataxapi.com/zh/apis/xiaohongshu/videos/media/get/)

小红书商城的接口：[小红书商品详情](https://dataxapi.com/zh/apis/xiaohongshu/shop/products/get/)、[小红书商品评价](https://dataxapi.com/zh/apis/xiaohongshu/shop/products/reviews/list/)、[小红书商品搜索](https://dataxapi.com/zh/apis/xiaohongshu/shop/products/search/)

怎么做和常见问题：[如何查小红书蒲公英关键词的搜索指数和关联词](https://dataxapi.com/zh/guides/xiaohongshu-pgy-keywords/)、[小红书蒲公英是什么？通过 API 能拿到哪些博主数据？](https://dataxapi.com/zh/answers/what-is-xiaohongshu-pgy/)

相关：[小红书蒲公英的全部接口](https://dataxapi.com/zh/apis/xiaohongshu/pgy/)、[小红书的全部接口](https://dataxapi.com/zh/apis/xiaohongshu/)、[社交媒体数据](https://dataxapi.com/zh/categories/social/)、[关键词指数历史对象的字段](https://dataxapi.com/zh/docs/objects/keyword_history/)

## 常见问题

### 小红书蒲公英关键词逐日搜索指数 API 多少钱？

$0.0400 一次。单次最高扣费 $0.0400。

### 什么情况下不收费？

出错和超时不收费。

### 对象不存在会怎样？

返回 404 not_found。报错里的 charged 和 amount 写明这次扣了多少。reason 写明是哪一种：not_found（不存在）或 private_or_deleted（私密或已删除）。

---

最后核对于 2026-11-28 06:28 UTC。目录修订号 ceced48b38f71468。 [网页版](https://dataxapi.com/zh/apis/xiaohongshu/pgy/keywords/history/)
