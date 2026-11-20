# 小红书商品评价 API

按商品编号取小红书商城这件商品排在最前的一页买家评价：正文、评分、买的规格、晒图、点赞数。每次约 12 条，最多 20 条；$0.0200 一次。出错和超时不收费。

- 地址：`GET https://api.dataxapi.com/v1/xiaohongshu/shop/products/reviews/list`
- 编号：`xiaohongshu.shop.products.reviews.list`
- 也叫：小红书商城评价、小红书买家评价、小红书商品评论
- 价格：$0.0200 / 次
- 当前状态不写在这一页上（页面是快照），实时读：`GET https://api.dataxapi.com/v1/catalog/status`
- 返回：每页最多 20 条, 一次给全，不翻页
- 返回评价，预览结构，以后可能调整
- [在 Playground 里跑一次](https://dataxapi.com/zh/console/playground/?capability=xiaohongshu.shop.products.reviews.list&params=%7B%22id%22%3A%2267bc0378a2e72600153d3ed1%22%7D)
- 英文名：[Xiaohongshu product reviews API](https://dataxapi.com/apis/xiaohongshu/shop/products/reviews/list/)

## 能拿到什么

2026-10-12 21:56 UTC 录下的真实返回，这里是前 1 行。

| 字段 | 值 |
| --- | --- |
| rating | 5 |

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | 文本 | 是 | 商品编号，24 位十六进制字符。示例：`67bc0378a2e72600153d3ed1`。 |
| `view` | 文本 |  | 返回档位。三档价格相同。取值：`compact`、`standard`（默认）、`full`。 |
| `fields` | 文本列表 |  | 只要这些字段。按路径写，例如 `author.name`。 |

## 返回字段

`data.items` 是评价对象的列表。预览：结构可能调整，改之前会公告。

返回分三档：精简 `compact`（最常用的字段，长文本截短）、标准 `standard`（默认，全部标准字段）、完整 `full`（再加 `ext`，也就是这个平台特有的字段）。字段从表里写的那一档起出现，更大的档位也带。

| 字段 | 类型 | 说明 | 起始档位 | 这个接口 |
| --- | --- | --- | --- | --- |
| `id` | 文本 | 编号。 | `compact` | 有 |
| `product_id` | 文本 | 所评商品的编号。 | `compact` | 这个接口不提供 |
| `text` | 文本 | 评价正文；只打分没写字的评价为 null。长文本：精简档只保留前 500 个字符，并在 `warnings` 里写明。 | `compact` | 有 |
| `rating` | 数字 | 买家给商品的评分，满分 5。 | `compact` | 有 |
| `published_at` | 时间 | 评价时间。 | `compact` | 这个接口不提供 |
| `author` | 对象 | 评价者。 | `compact` | 有 |
| `author.id` | 文本 | 评价者的账号编号。 | `compact` | 有 |
| `author.name` | 文本 | 评价者的显示名，按平台展示的样子（可能已打码）。 | `compact` | 有 |
| `author.avatar_url` | 链接 | 评价者头像。 | `standard` | 有 |
| `images` | 链接列表 | 买家晒的图片地址。 | `standard` | 有 |
| `variant` | 文本 | 买的是哪个规格，按平台的原文。 | `standard` | 有 |
| `ext.likes` | 整数 | 这条评价得到的点赞数。 | `full` | 有 |
| `ext.date_shown` | 文本 | 评价时间，按平台显示的原样：日期、不带年份的月日，或“几小时前”。 | `full` | 有 |
| `approximate` | 对象列表 | 这一条里哪些数是约数或下限；都是准确值时不出现。 | `compact` | 有 |
| `approximate[].field` | 文本 | 字段的路径，如 metrics.views。 | `compact` | 有 |
| `approximate[].kind` | 文本 | 约数，还是下限。取值：`approximate`、`lower_bound`。 | `compact` | 有 |

某一条本来就没有这个值时，字段给 `null`。这个接口给不了的字段不出现，统一列在 `meta.unavailable`。

每条数据的典型体积：`compact` 253 B、`standard` 875 B、`full` 919 B（按 2026-10-12 21:56 UTC 录下的那次返回量的）。

## 翻页

每页约 12 条，最多 20 条。每页条数由平台决定，不收 `limit`。

一次给全，不发游标。

## 什么时候收费

| 情况 | 收费 |
| --- | --- |
| 返回了数据 | $0.0200，每次调用收一次 |
| 参数不合法、出错、超时 | 不收费 |
| 单次最高扣费 | $0.0200 (带 `X-Max-Price` 可以设自己的上限，超过就不执行) |

价格读取于 2026-11-20 07:17 UTC，按价目版本 19，2026-11-17 18:04 UTC 起生效；在 Playground 里运行前会再读一次当前价格。

## 对象不存在时

分不清“商品不存在”和“商品还没有评价”：两种情况都返回空结果，不返回 404。

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
curl -G "https://api.dataxapi.com/v1/xiaohongshu/shop/products/reviews/list" \
  --data-urlencode "id=67bc0378a2e72600153d3ed1" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
# pip install dataxapi
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.xiaohongshu.shop.products.reviews.list(id="67bc0378a2e72600153d3ed1")
print(result["data"]["items"])
```

### TypeScript

```typescript
// npm i @dataxapi/sdk
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.xiaohongshu.shop.products.reviews.list({ id: "67bc0378a2e72600153d3ed1" });
console.log(result.data.items);
```

### 命令行

```bash
dataxapi call xiaohongshu.shop.products.reviews.list id=67bc0378a2e72600153d3ed1
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

把这段加进你的 MCP 客户端，然后让你的 AI 调用 `xiaohongshu.shop.products.reviews.list`。

## 返回

### 200

取自 2026-10-12 21:56 UTC 录下的真实返回。名字、正文和编号是示例，链接也是，都不是录到的原文（页面不展示任何人的个人信息）；数字是原样。长列表做了截断。请求号、游标和余额是示意。

返回大小：标准档 10.7 KB（精简 3.4 KB，完整 11.2 KB）。

```jsonc
{
  "code": "ok",
  "request_id": "d0413b94-0cf0-4b8d-b191-e077facdb98a",
  "data": {
    "items": [
      {
        "id": "6743a055000000007486bb6c",
        "text": "物流很快，尺寸刚好",
        "rating": 5,
        "author": {
          "id": "6193fe4200000000427b731a",
          "name": "老周说装备",
          "avatar_url": "https://sns-avatar-qc.xhscdn.com/avatar/629422d7000000007adfc018.jpg"
        },
        "images": [
          "https://sns-webpic-qc.xhscdn.com/20261010/1ad5f88bb20385a581bb!nd_dft_wlteh_webp_3",
          "https://sns-webpic-qc.xhscdn.com/20261012/065d15acb35b018030de!nd_dft_wlteh_webp_3",
          // … 另有 3 条
        ],
        "variant": "颜色：燕麦色；尺码：M"
      },
      // … 另有 11 条
    ]
  },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 12
  },
  "warnings": [],
  "meta": {
    "capability": "xiaohongshu.shop.products.reviews.list",
    "result_status": "complete",
    "fetched_at": "2026-10-12T21:56:31.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "product_id": "capability",
      "published_at": "capability"
    },
    "billing": {
      "amount": "0.02",
      "currency": "USD",
      "balance_after": "9.98"
    }
  }
}
```

### 空结果

取自 2026-10-12 21:56 UTC 录下的真实返回。请求号和余额是示意。

返回大小：标准档 474 B（精简 474 B，完整 474 B）。

```jsonc
{
  "code": "ok",
  "request_id": "500fd530-a960-41ac-a371-ed730d5666de",
  "data": { "items": [] },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 0
  },
  "warnings": [],
  "meta": {
    "capability": "xiaohongshu.shop.products.reviews.list",
    "result_status": "empty",
    "fetched_at": "2026-10-12T21:56:33.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "product_id": "capability",
      "published_at": "capability"
    },
    "billing": {
      "amount": "0.02",
      "currency": "USD",
      "balance_after": "9.98"
    }
  }
}
```

### 400

按规范写的示例，不是录下的返回。

```json
{
  "code": "invalid_params",
  "request_id": "a95b5452-6b9d-4132-8e59-aa5a6600b71f",
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
  "request_id": "342742d9-8a99-4a67-b1ae-071e365e4f63",
  "message": "The balance is too low",
  "message_zh": "余额不足",
  "charged": false,
  "retry": "after_fix",
  "retry_after_seconds": null,
  "param": null,
  "required": "0.02",
  "available": "0",
  "top_up_url": "https://dataxapi.com/console/billing/?amount=10",
  "next_step": "Top up at top_up_url, then send the same request again, unchanged. Nothing was charged for this one.",
  "next_step_zh": "到 top_up_url 充值，到账后把同一个请求原样再发一次。这次没有扣钱。",
  "docs_url": "https://dataxapi.com/docs/errors#insufficient_balance"
}
```

### 502

按规范写的示例，不是录下的返回。

```json
{
  "code": "upstream_failed",
  "request_id": "2a8c8811-0805-43bb-89d9-529ef1ca11c1",
  "message": "No result came back this time and nothing was charged; retry shortly",
  "message_zh": "这次没有取到结果，没有扣费，可以稍后重试",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

这份录制的返回：平台原始 JSON 1.6 万 token，DataXAPI 的 JSON 4,436 token，AI 通过 DataXAPI 的 MCP 读到 1,093 token，少 93%（2026-11-06 统计）。

[这份示例的 JSON 文件](https://dataxapi.com/apis/xiaohongshu/shop/products/reviews/list.example.json)

## 在你的 AI 里用它

`dataxapi setup` 给这台电脑上的 AI 代理（Claude Code、Codex、Cursor）装好 DataXAPI 的 MCP 服务和基础技能。Key 从环境变量 DATAXAPI_API_KEY 读，不写进任何文件。

MCP 服务地址：`https://api.dataxapi.com/mcp`。你的客户端要填的配置在本页请求示例的“MCP”页签里；接好后让你的 AI 调用 `xiaohongshu.shop.products.reviews.list`。

或者把这段话贴给任意一个 AI：

> 读一下 https://dataxapi.com/zh/apis/xiaohongshu/shop/products/reviews/list.md，然后帮我用 DataXAPI 的接口 xiaohongshu.shop.products.reviews.list（小红书商品评价）。

[在 ChatGPT 里打开](https://chatgpt.com/?q=%E8%AF%BB%E4%B8%80%E4%B8%8B%20https%3A%2F%2Fdataxapi.com%2Fzh%2Fapis%2Fxiaohongshu%2Fshop%2Fproducts%2Freviews%2Flist.md%EF%BC%8C%E7%84%B6%E5%90%8E%E5%B8%AE%E6%88%91%E7%94%A8%20DataXAPI%20%E7%9A%84%E6%8E%A5%E5%8F%A3%20xiaohongshu.shop.products.reviews.list%EF%BC%88%E5%B0%8F%E7%BA%A2%E4%B9%A6%E5%95%86%E5%93%81%E8%AF%84%E4%BB%B7%EF%BC%89%E3%80%82) · [在 Claude 里打开](https://claude.ai/new?q=%E8%AF%BB%E4%B8%80%E4%B8%8B%20https%3A%2F%2Fdataxapi.com%2Fzh%2Fapis%2Fxiaohongshu%2Fshop%2Fproducts%2Freviews%2Flist.md%EF%BC%8C%E7%84%B6%E5%90%8E%E5%B8%AE%E6%88%91%E7%94%A8%20DataXAPI%20%E7%9A%84%E6%8E%A5%E5%8F%A3%20xiaohongshu.shop.products.reviews.list%EF%BC%88%E5%B0%8F%E7%BA%A2%E4%B9%A6%E5%95%86%E5%93%81%E8%AF%84%E4%BB%B7%EF%BC%89%E3%80%82)

## 相关

这是 DataXAPI 电商数据的一部分。同一把 Key 还能用：社交媒体、达人、广告。

同一件事的其他平台：[TikTok Shop 商品评价](https://dataxapi.com/zh/apis/tiktok/shop/products/reviews/list/)

小红书商城的接口：[小红书商品详情](https://dataxapi.com/zh/apis/xiaohongshu/shop/products/get/)、[小红书商品评价](https://dataxapi.com/zh/apis/xiaohongshu/shop/products/reviews/list/)、[小红书商品搜索](https://dataxapi.com/zh/apis/xiaohongshu/shop/products/search/)

小红书的接口：[小红书图片搜索](https://dataxapi.com/zh/apis/xiaohongshu/images/search/)、[小红书笔记详情](https://dataxapi.com/zh/apis/xiaohongshu/notes/get/)、[小红书评论回复](https://dataxapi.com/zh/apis/xiaohongshu/comments/replies/list/)、[小红书笔记评论](https://dataxapi.com/zh/apis/xiaohongshu/notes/comments/list/)、[小红书笔记搜索](https://dataxapi.com/zh/apis/xiaohongshu/notes/search/)、[小红书话题笔记](https://dataxapi.com/zh/apis/xiaohongshu/topics/notes/list/)、[小红书话题详情](https://dataxapi.com/zh/apis/xiaohongshu/topics/get/)、[小红书热点](https://dataxapi.com/zh/apis/xiaohongshu/trends/list/)、[小红书用户资料](https://dataxapi.com/zh/apis/xiaohongshu/users/get/)、[小红书用户笔记](https://dataxapi.com/zh/apis/xiaohongshu/users/notes/list/)、[小红书用户搜索](https://dataxapi.com/zh/apis/xiaohongshu/users/search/)、[小红书搜索框联想词](https://dataxapi.com/zh/apis/xiaohongshu/keywords/related/)、[小红书视频笔记详情（视频地址和字幕）](https://dataxapi.com/zh/apis/xiaohongshu/videos/get/)

小红书蒲公英的接口：[小红书蒲公英关键词逐日搜索指数](https://dataxapi.com/zh/apis/xiaohongshu/pgy/keywords/history/)、[小红书蒲公英关联词](https://dataxapi.com/zh/apis/xiaohongshu/pgy/keywords/related/)、[小红书蒲公英博主搜索](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/search/)、[小红书蒲公英博主详情](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/get/)、[小红书蒲公英博主粉丝画像](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/audience/get/)、[小红书蒲公英博主数据表现](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/metrics/)、[小红书蒲公英博主笔记](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/notes/list/)、[小红书蒲公英博主粉丝趋势](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/followers/history/)、[小红书蒲公英相似博主](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/related/)、[小红书蒲公英内容广场热门笔记](https://dataxapi.com/zh/apis/xiaohongshu/pgy/notes/trending/)、[小红书蒲公英博主合作成本和数据概览](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/costs/metrics/)、[小红书蒲公英博主粉丝概览](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/followers/metrics/)、[小红书蒲公英博主核心数据趋势](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/costs/history/)、[小红书蒲公英笔记数据](https://dataxapi.com/zh/apis/xiaohongshu/pgy/notes/get/)

怎么做和常见问题：[小红书选品怎么查：哪些单品卖得好、买家怎么说（2026）](https://dataxapi.com/zh/answers/xiaohongshu-product-research/)、[用户口碑怎么批量取？小红书、抖音评论和电商评价（2026）](https://dataxapi.com/zh/answers/product-reviews-chinese-social-media/)、[用中国社媒数据做投研（另类数据）：能取哪些信号，怎么取（2026）](https://dataxapi.com/zh/answers/chinese-social-media-alternative-data/)

用到这个接口的 Skills：[商品与评价](https://dataxapi.com/zh/skills/products/)

相关：[小红书商城的全部接口](https://dataxapi.com/zh/apis/xiaohongshu/shop/)、[小红书的全部接口](https://dataxapi.com/zh/apis/xiaohongshu/)、[电商数据](https://dataxapi.com/zh/categories/commerce/)、[这件事在 2 个平台上的对照](https://dataxapi.com/zh/roles/products-reviews-list/)、[评价对象的字段](https://dataxapi.com/zh/docs/objects/review/)

## 常见问题

### 小红书商品评价 API 多少钱？

$0.0200 一次。单次最高扣费 $0.0200。

### 什么情况下不收费？

出错和超时不收费。

### 一次返回多少条？怎么翻页？

每页约 12 条，最多 20 条。每页条数由平台决定，不收 limit。一次给全，不发游标。

### 对象不存在会怎样？

分不清“商品不存在”和“商品还没有评价”：两种情况都返回空结果，不返回 404。

---

最后核对于 2026-11-20 07:17 UTC。目录修订号 720fc3ea8dadb865。 [网页版](https://dataxapi.com/zh/apis/xiaohongshu/shop/products/reviews/list/)
