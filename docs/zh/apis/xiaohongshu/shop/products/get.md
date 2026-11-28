# 小红书商品详情 API

按商品编号取小红书商城的一件商品：标题、现价和原价（人民币）、图片、评分、评价数、店铺。看到的是 App 海外地区版本的商品页（地区每次可能不同），促销和能不能买可能和国内用户看到的不一样。每次取一个对象；$0.0200 一次。出错和超时不收费。

- 地址：`GET https://api.dataxapi.com/v1/xiaohongshu/shop/products/get`
- 编号：`xiaohongshu.shop.products.get`
- 也叫：小红书商城商品详情、小红书商品信息
- 价格：$0.0200 / 次
- 当前状态不写在这一页上（页面是快照），实时读：`GET https://api.dataxapi.com/v1/catalog/status`
- 返回：1 个对象, 一个商品对象
- 返回商品，预览结构，以后可能调整
- [在 Playground 里跑一次](https://dataxapi.com/zh/console/playground/?capability=xiaohongshu.shop.products.get&params=%7B%22id%22%3A%2267bc0378a2e72600153d3ed1%22%7D)
- 英文名：[Xiaohongshu product detail API](https://dataxapi.com/apis/xiaohongshu/shop/products/get/)

## 能拿到什么

2026-10-12 21:55 UTC 录下的真实返回，这里是前 4 行。

| 字段 | 值 |
| --- | --- |
| price | 17.9 |
| rating | 4.5 |
| metrics.sold | 4,027 |
| metrics.reviews | 431 |

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | 文本 | 是 | 商品编号，24 位十六进制字符。示例：`67bc0378a2e72600153d3ed1`。 |
| `view` | 文本 |  | 返回档位。三档价格相同。取值：`compact`、`standard`（默认）、`full`。 |
| `fields` | 文本列表 |  | 只要这些字段。按路径写，例如 `author.name`。 |

## 返回字段

`data.item` 是一个商品对象。预览：结构可能调整，改之前会公告。

返回分三档：精简 `compact`（最常用的字段，长文本截短）、标准 `standard`（默认，全部标准字段）、完整 `full`（再加 `ext`，也就是这个平台特有的字段）。字段从表里写的那一档起出现，更大的档位也带。

| 字段 | 类型 | 说明 | 起始档位 | 这个接口 |
| --- | --- | --- | --- | --- |
| `id` | 文本 | 编号，可原样传给取商品详情和取商品评价的接口。 | `compact` | 有 |
| `url` | 链接 | 能直接打开的链接。 | `compact` | 这个接口不提供 |
| `title` | 文本 | 商品标题。 | `compact` | 有 |
| `description` | 文本 | 商品详情里的文字说明。长文本：精简档只保留前 500 个字符，并在 `warnings` 里写明。 | `standard` | 有 |
| `price` | 金额 | 现价；有多个规格时是最低的那一档。 | `compact` | 有 |
| `original_price` | 金额 | 打折前的价格；没有折扣时为 null。 | `standard` | 有 |
| `currency` | 文本 | 价格的货币，ISO 4217 代码。 | `compact` | 有 |
| `images` | 链接列表 | 商品图片地址。 | `standard` | 有 |
| `rating` | 数字 | 买家评分，满分 5。 | `compact` | 有 |
| `metrics` | 对象 | 商品的数字。 | `compact` | 有 |
| `metrics.sold` | 整数 | 已售件数。在这个平台上：商品页上显示的已售件数。 | `compact` | 有 |
| `metrics.reviews` | 整数 | 评价数。 | `compact` | 有 |
| `shop` | 对象 | 卖这件商品的店铺。 | `compact` | 有 |
| `shop.id` | 文本 | 店铺编号。 | `compact` | 有 |
| `shop.name` | 文本 | 店铺名。 | `compact` | 有 |
| `approximate` | 对象列表 | 这一条里哪些数是约数或下限；都是准确值时不出现。 | `compact` | 有 |
| `approximate[].field` | 文本 | 字段的路径，如 metrics.views。 | `compact` | 有 |
| `approximate[].kind` | 文本 | 约数，还是下限。取值：`approximate`、`lower_bound`。 | `compact` | 有 |

某一条本来就没有这个值时，字段给 `null`。这个接口给不了的字段不出现，统一列在 `meta.unavailable`。

每条数据的典型体积：`compact` 300 B、`standard` 1.1 KB、`full` 1.1 KB（按 2026-10-12 21:55 UTC 录下的那次返回量的）。

## 翻页

每次取一个对象，不翻页。

## 什么时候收费

| 情况 | 收费 |
| --- | --- |
| 返回了数据 | $0.0200，每次调用收一次 |
| 参数不合法、出错、超时 | 不收费 |
| 单次最高扣费 | $0.0200 (带 `X-Max-Price` 可以设自己的上限，超过就不执行) |

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
curl -G "https://api.dataxapi.com/v1/xiaohongshu/shop/products/get" \
  --data-urlencode "id=67bc0378a2e72600153d3ed1" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
# pip install dataxapi
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.xiaohongshu.shop.products.get(id="67bc0378a2e72600153d3ed1")
print(result["data"]["item"])
```

### TypeScript

```typescript
// npm i @dataxapi/sdk
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.xiaohongshu.shop.products.get({ id: "67bc0378a2e72600153d3ed1" });
console.log(result.data.item);
```

### 命令行

```bash
dataxapi call xiaohongshu.shop.products.get id=67bc0378a2e72600153d3ed1
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

把这段加进你的 MCP 客户端，然后让你的 AI 调用 `xiaohongshu.shop.products.get`。

## 返回

### 200

取自 2026-10-12 21:55 UTC 录下的真实返回。名字、正文和编号是示例，链接也是，都不是录到的原文（页面不展示任何人的个人信息）；数字是原样。长列表做了截断。请求号、游标和余额是示意。

返回大小：标准档 1.5 KB（精简 645 B，完整 1.5 KB）。

```jsonc
{
  "code": "ok",
  "request_id": "1deb2e76-7322-4918-a5e0-b18111bf4772",
  "data": {
    "item": {
      "id": "61280e9f00000000b1c12631",
      "title": "周末露营装备清单，新手照着买就行",
      "description": null,
      "price": "17.9",
      "original_price": null,
      "currency": "CNY",
      "images": [
        "https://sns-webpic-qc.xhscdn.com/20261011/886cd39c621a888591a7!nd_dft_wlteh_webp_3",
        "https://sns-webpic-qc.xhscdn.com/20261018/d5d5dfe06aaea95a9211!nd_dft_wlteh_webp_3",
        // … 另有 4 条
      ],
      "rating": 4.5,
      "metrics": { "sold": 4027, "reviews": 431 },
      "shop": { "id": "684e7ef900000000e094235d", "name": "轻山户外旗舰店" }
    }
  },
  "warnings": [],
  "meta": {
    "capability": "xiaohongshu.shop.products.get",
    "result_status": "complete",
    "fetched_at": "2026-10-12T21:55:33.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": { "url": "capability" },
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
  "request_id": "812f8da9-b603-4b93-b65f-bad9f25d5d6d",
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
  "request_id": "57e11d15-334a-49bd-abde-f1d2a09d0173",
  "message": "The balance is too low",
  "message_zh": "余额不足",
  "charged": false,
  "retry": "after_fix",
  "retry_after_seconds": null,
  "param": null,
  "required": "0.02",
  "available": "0",
  "top_up_url": "https://dataxapi.com/console/billing/?amount=10",
  "next_step": "The balance does not cover this call ($0.02). Top up at top_up_url: $10 at least, about 500 calls at this price; Alipay or a card, and the balance never expires. Then send the same request again, unchanged. Nothing was charged for this one.",
  "next_step_zh": "余额不够这次调用（$0.02）。到 top_up_url 充值：最低 $10，按这次的价格约够 500 次；支付宝、银行卡都能付，余额不过期。到账后把同一个请求原样再发一次。这次没有扣钱。",
  "docs_url": "https://dataxapi.com/docs/errors#insufficient_balance"
}
```

### 404

按规范写的示例，不是录下的返回。

```json
{
  "code": "not_found",
  "request_id": "89267e72-7f95-450e-b4aa-6c2b8b4f1faa",
  "message": "The object does not exist, is private or was deleted",
  "message_zh": "对象不存在、私密或已删除",
  "charged": true,
  "amount": "0.02",
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
  "request_id": "5057b37b-d0d7-4d37-8bc1-5c467f32d87e",
  "message": "No result came back this time and nothing was charged; retry shortly",
  "message_zh": "这次没有取到结果，没有扣费，可以稍后重试",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

这份录制的返回：平台原始 JSON 2.2 万 token，DataXAPI 的 JSON 626 token，AI 通过 DataXAPI 的 MCP 读到 168 token，少 99%（2026-11-06 统计）。

[这份示例的 JSON 文件](https://dataxapi.com/apis/xiaohongshu/shop/products/get.example.json)

## 在你的 AI 里用它

`dataxapi setup` 给这台电脑上的 AI 代理（Claude Code、Codex、Cursor）装好 DataXAPI 的 MCP 服务和基础技能。Key 从环境变量 DATAXAPI_API_KEY 读，不写进任何文件。

MCP 服务地址：`https://api.dataxapi.com/mcp`。你的客户端要填的配置在本页请求示例的“MCP”页签里；接好后让你的 AI 调用 `xiaohongshu.shop.products.get`。

或者把这段话贴给任意一个 AI：

> 读一下 https://dataxapi.com/zh/apis/xiaohongshu/shop/products/get.md，然后帮我用 DataXAPI 的接口 xiaohongshu.shop.products.get（小红书商品详情）。

[在 ChatGPT 里打开](https://chatgpt.com/?q=%E8%AF%BB%E4%B8%80%E4%B8%8B%20https%3A%2F%2Fdataxapi.com%2Fzh%2Fapis%2Fxiaohongshu%2Fshop%2Fproducts%2Fget.md%EF%BC%8C%E7%84%B6%E5%90%8E%E5%B8%AE%E6%88%91%E7%94%A8%20DataXAPI%20%E7%9A%84%E6%8E%A5%E5%8F%A3%20xiaohongshu.shop.products.get%EF%BC%88%E5%B0%8F%E7%BA%A2%E4%B9%A6%E5%95%86%E5%93%81%E8%AF%A6%E6%83%85%EF%BC%89%E3%80%82) · [在 Claude 里打开](https://claude.ai/new?q=%E8%AF%BB%E4%B8%80%E4%B8%8B%20https%3A%2F%2Fdataxapi.com%2Fzh%2Fapis%2Fxiaohongshu%2Fshop%2Fproducts%2Fget.md%EF%BC%8C%E7%84%B6%E5%90%8E%E5%B8%AE%E6%88%91%E7%94%A8%20DataXAPI%20%E7%9A%84%E6%8E%A5%E5%8F%A3%20xiaohongshu.shop.products.get%EF%BC%88%E5%B0%8F%E7%BA%A2%E4%B9%A6%E5%95%86%E5%93%81%E8%AF%A6%E6%83%85%EF%BC%89%E3%80%82)

## 相关

这是 DataXAPI 电商数据的一部分。同一把 Key 还能用：社交媒体、达人、广告。

同一件事的其他平台：[TikTok Shop 商品详情](https://dataxapi.com/zh/apis/tiktok/shop/products/get/)

小红书商城的接口：[小红书商品详情](https://dataxapi.com/zh/apis/xiaohongshu/shop/products/get/)、[小红书商品评价](https://dataxapi.com/zh/apis/xiaohongshu/shop/products/reviews/list/)、[小红书商品搜索](https://dataxapi.com/zh/apis/xiaohongshu/shop/products/search/)

小红书的接口：[小红书图片搜索](https://dataxapi.com/zh/apis/xiaohongshu/images/search/)、[小红书笔记详情](https://dataxapi.com/zh/apis/xiaohongshu/notes/get/)、[小红书评论回复](https://dataxapi.com/zh/apis/xiaohongshu/comments/replies/list/)、[小红书笔记评论](https://dataxapi.com/zh/apis/xiaohongshu/notes/comments/list/)、[小红书笔记搜索](https://dataxapi.com/zh/apis/xiaohongshu/notes/search/)、[小红书话题笔记](https://dataxapi.com/zh/apis/xiaohongshu/topics/notes/list/)、[小红书话题详情](https://dataxapi.com/zh/apis/xiaohongshu/topics/get/)、[小红书热点](https://dataxapi.com/zh/apis/xiaohongshu/trends/list/)、[小红书用户资料](https://dataxapi.com/zh/apis/xiaohongshu/users/get/)、[小红书用户笔记](https://dataxapi.com/zh/apis/xiaohongshu/users/notes/list/)、[小红书用户搜索](https://dataxapi.com/zh/apis/xiaohongshu/users/search/)、[小红书搜索框联想词](https://dataxapi.com/zh/apis/xiaohongshu/keywords/related/)、[小红书视频笔记详情（视频地址和字幕）](https://dataxapi.com/zh/apis/xiaohongshu/videos/get/)、[小红书视频转文字（文案提取、逐字稿）](https://dataxapi.com/zh/apis/xiaohongshu/videos/transcript/get/)、[小红书无水印原图和实况图下载地址](https://dataxapi.com/zh/apis/xiaohongshu/notes/media/get/)、[小红书无水印视频下载地址（各档清晰度和字幕）](https://dataxapi.com/zh/apis/xiaohongshu/videos/media/get/)

小红书蒲公英的接口：[小红书蒲公英关键词逐日搜索指数](https://dataxapi.com/zh/apis/xiaohongshu/pgy/keywords/history/)、[小红书蒲公英关联词](https://dataxapi.com/zh/apis/xiaohongshu/pgy/keywords/related/)、[小红书蒲公英博主搜索](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/search/)、[小红书蒲公英博主详情](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/get/)、[小红书蒲公英博主粉丝画像](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/audience/get/)、[小红书蒲公英博主数据表现](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/metrics/)、[小红书蒲公英博主笔记](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/notes/list/)、[小红书蒲公英博主粉丝趋势](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/followers/history/)、[小红书蒲公英相似博主](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/related/)、[小红书蒲公英内容广场热门笔记](https://dataxapi.com/zh/apis/xiaohongshu/pgy/notes/trending/)、[小红书蒲公英博主合作成本和数据概览](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/costs/metrics/)、[小红书蒲公英博主粉丝概览](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/followers/metrics/)、[小红书蒲公英博主核心数据趋势](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/costs/history/)、[小红书蒲公英笔记数据](https://dataxapi.com/zh/apis/xiaohongshu/pgy/notes/get/)

相关：[小红书商城的全部接口](https://dataxapi.com/zh/apis/xiaohongshu/shop/)、[小红书的全部接口](https://dataxapi.com/zh/apis/xiaohongshu/)、[电商数据](https://dataxapi.com/zh/categories/commerce/)、[这件事在 2 个平台上的对照](https://dataxapi.com/zh/roles/products-get/)、[商品对象的字段](https://dataxapi.com/zh/docs/objects/product/)

## 常见问题

### 小红书商品详情 API 多少钱？

$0.0200 一次。单次最高扣费 $0.0200。

### 什么情况下不收费？

出错和超时不收费。

### 对象不存在会怎样？

返回 404 not_found。报错里的 charged 和 amount 写明这次扣了多少。reason 写明是哪一种：not_found（不存在）或 private_or_deleted（私密或已删除）。

---

最后核对于 2026-11-28 06:28 UTC。目录修订号 ceced48b38f71468。 [网页版](https://dataxapi.com/zh/apis/xiaohongshu/shop/products/get/)
