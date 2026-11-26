# TikTok Shop 商品详情 API

按商品编号取 TikTok Shop 美国站的一件商品：标题、文字说明、图片、评分、评价数、已售件数，店铺和它的评分、粉丝数、在售商品数，商品页上显示的价格和运费。页面价比店铺列表和搜索里的价格高约一个运费，列表价用商品搜索取。每次取一个对象；$0.0020 一次。出错和超时不收费。

- 地址：`GET https://api.dataxapi.com/v1/tiktok/shop/products/get`
- 编号：`tiktok.shop.products.get`
- 也叫：TikTok 商城商品详情、TikTok 小店商品信息
- 价格：$0.0020 / 次
- 当前状态不写在这一页上（页面是快照），实时读：`GET https://api.dataxapi.com/v1/catalog/status`
- 返回：1 个对象, 一个商品对象
- 返回商品，预览结构，以后可能调整
- [在 Playground 里跑一次](https://dataxapi.com/zh/console/playground/?capability=tiktok.shop.products.get&params=%7B%22id%22%3A%221732488007561286228%22%7D)
- 英文名：[TikTok Shop product detail API](https://dataxapi.com/apis/tiktok/shop/products/get/)

## 能拿到什么

2026-10-12 21:46 UTC 录下的真实返回，这里是前 3 行。

| 字段 | 值 |
| --- | --- |
| rating | 4.1 |
| metrics.sold | 233 |
| metrics.reviews | 18 |

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | 文本 | 是 | 商品编号，一串数字（商品链接最后一段）。示例：`1732488007561286228`。 |
| `view` | 文本 |  | 返回档位。三档价格相同。取值：`compact`、`standard`（默认）、`full`。 |
| `fields` | 文本列表 |  | 只要这些字段。按路径写，例如 `author.name`。 |

## 返回字段

`data.item` 是一个商品对象。预览：结构可能调整，改之前会公告。

返回分三档：精简 `compact`（最常用的字段，长文本截短）、标准 `standard`（默认，全部标准字段）、完整 `full`（再加 `ext`，也就是这个平台特有的字段）。字段从表里写的那一档起出现，更大的档位也带。

| 字段 | 类型 | 说明 | 起始档位 | 这个接口 |
| --- | --- | --- | --- | --- |
| `id` | 文本 | 编号，可原样传给取商品详情和取商品评价的接口。 | `compact` | 有 |
| `url` | 链接 | 能直接打开的链接。 | `compact` | 有 |
| `title` | 文本 | 商品标题。 | `compact` | 有 |
| `description` | 文本 | 商品详情里的文字说明。长文本：精简档只保留前 500 个字符，并在 `warnings` 里写明。 | `standard` | 有 |
| `price` | 金额 | 现价；有多个规格时是最低的那一档。 | `compact` | 这个接口不提供 |
| `original_price` | 金额 | 打折前的价格；没有折扣时为 null。 | `standard` | 这个接口不提供 |
| `currency` | 文本 | 价格的货币，ISO 4217 代码。 | `compact` | 有 |
| `images` | 链接列表 | 商品图片地址。 | `standard` | 有 |
| `rating` | 数字 | 买家评分，满分 5。 | `compact` | 有 |
| `metrics` | 对象 | 商品的数字。 | `compact` | 有 |
| `metrics.sold` | 整数 | 已售件数。 | `compact` | 有 |
| `metrics.reviews` | 整数 | 评价数。 | `compact` | 有 |
| `shop` | 对象 | 卖这件商品的店铺。 | `compact` | 有 |
| `shop.id` | 文本 | 店铺编号。 | `compact` | 有 |
| `shop.name` | 文本 | 店铺名。 | `compact` | 有 |
| `ext.page_price` | 金额 | 商品页上显示的价格（最低的规格），按 currency 计。实测比同一件商品在店铺列表和搜索里的价格高出约一个运费（页面 30.99，列表 25，运费 5.99），买家实付以下单页为准。 | `full` | 有 |
| `ext.shipping_fee` | 金额 | 商品页上显示的标准运费，按 currency 计。 | `full` | 有 |
| `ext.shop_rating` | 数字 | 店铺评分，满分 5。 | `full` | 有 |
| `ext.shop_followers` | 整数 | 店铺的粉丝数。 | `full` | 有 |
| `ext.shop_products` | 整数 | 店铺在售的商品数。 | `full` | 有 |
| `approximate` | 对象列表 | 这一条里哪些数是约数或下限；都是准确值时不出现。 | `compact` | 有 |
| `approximate[].field` | 文本 | 字段的路径，如 metrics.views。 | `compact` | 有 |
| `approximate[].kind` | 文本 | 约数，还是下限。取值：`approximate`、`lower_bound`。 | `compact` | 有 |

某一条本来就没有这个值时，字段给 `null`。这个接口给不了的字段不出现，统一列在 `meta.unavailable`。

每条数据的典型体积：`compact` 468 B、`standard` 1.5 KB、`full` 1.6 KB（按 2026-10-12 21:46 UTC 录下的那次返回量的）。

## 翻页

每次取一个对象，不翻页。

## 什么时候收费

| 情况 | 收费 |
| --- | --- |
| 返回了数据 | $0.0020，每次调用收一次 |
| 参数不合法、出错、超时 | 不收费 |
| 单次最高扣费 | $0.0020 (带 `X-Max-Price` 可以设自己的上限，超过就不执行) |

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
curl -G "https://api.dataxapi.com/v1/tiktok/shop/products/get" \
  --data-urlencode "id=1732488007561286228" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
# pip install dataxapi
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.tiktok.shop.products.get(id="1732488007561286228")
print(result["data"]["item"])
```

### TypeScript

```typescript
// npm i @dataxapi/sdk
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.tiktok.shop.products.get({ id: "1732488007561286228" });
console.log(result.data.item);
```

### 命令行

```bash
dataxapi call tiktok.shop.products.get id=1732488007561286228
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

把这段加进你的 MCP 客户端，然后让你的 AI 调用 `tiktok.shop.products.get`。

## 返回

### 200

取自 2026-10-12 21:46 UTC 录下的真实返回。名字、正文和编号是示例，链接也是，都不是录到的原文（页面不展示任何人的个人信息）；数字是原样。长列表做了截断。请求号、游标和余额是示意。

返回大小：标准档 1.9 KB（精简 840 B，完整 2.0 KB）。

```jsonc
{
  "code": "ok",
  "request_id": "10817c84-2293-4e0e-91a0-a61f8c3664e2",
  "data": {
    "item": {
      "id": "1716954397711561377",
      "url": "https://shop.tiktok.com/view/product/1716954397711561377",
      "title": "I tried weekend hiking for 30 days. Here is what happened",
      "description": "My honest take on weekend hiking, a month in.",
      "currency": "USD",
      "images": [
        "https://p16-sign-va.tiktokcdn.com/tos-maliva-p-0068/c864758cf8a90105a3d1~c5_720x720.jpeg",
        "https://p16-sign-va.tiktokcdn.com/tos-maliva-p-0068/2061b170200b03e40ffe~c5_720x720.jpeg",
        // … 另有 1 条
      ],
      "rating": 4.1,
      "metrics": { "sold": 233, "reviews": 18 },
      "shop": { "id": "1748001744684903334", "name": "Lumen Outdoor Store" }
    }
  },
  "warnings": [],
  "meta": {
    "capability": "tiktok.shop.products.get",
    "result_status": "complete",
    "fetched_at": "2026-10-12T21:46:17.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": { "price": "capability", "original_price": "capability" },
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
  "request_id": "3a467cfc-c969-43fe-895a-8cd38bd39c09",
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
  "request_id": "25b4970a-2c83-4bdb-a435-c1fe0cee8357",
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

### 404

按规范写的示例，不是录下的返回。

```json
{
  "code": "not_found",
  "request_id": "d12c6def-4be4-4636-a4c6-226efe0ebd4f",
  "message": "The object does not exist, is private or was deleted",
  "message_zh": "对象不存在、私密或已删除",
  "charged": true,
  "amount": "0.002",
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
  "request_id": "2cee852e-2386-4a47-b6d3-0ad73ee687db",
  "message": "No result came back this time and nothing was charged; retry shortly",
  "message_zh": "这次没有取到结果，没有扣费，可以稍后重试",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

这份录制的返回：平台原始 JSON 8,095 token，DataXAPI 的 JSON 653 token，AI 通过 DataXAPI 的 MCP 读到 177 token，少 98%（2026-11-06 统计）。

[这份示例的 JSON 文件](https://dataxapi.com/apis/tiktok/shop/products/get.example.json)

## 在你的 AI 里用它

`dataxapi setup` 给这台电脑上的 AI 代理（Claude Code、Codex、Cursor）装好 DataXAPI 的 MCP 服务和基础技能。Key 从环境变量 DATAXAPI_API_KEY 读，不写进任何文件。

MCP 服务地址：`https://api.dataxapi.com/mcp`。你的客户端要填的配置在本页请求示例的“MCP”页签里；接好后让你的 AI 调用 `tiktok.shop.products.get`。

或者把这段话贴给任意一个 AI：

> 读一下 https://dataxapi.com/zh/apis/tiktok/shop/products/get.md，然后帮我用 DataXAPI 的接口 tiktok.shop.products.get（TikTok Shop 商品详情）。

[在 ChatGPT 里打开](https://chatgpt.com/?q=%E8%AF%BB%E4%B8%80%E4%B8%8B%20https%3A%2F%2Fdataxapi.com%2Fzh%2Fapis%2Ftiktok%2Fshop%2Fproducts%2Fget.md%EF%BC%8C%E7%84%B6%E5%90%8E%E5%B8%AE%E6%88%91%E7%94%A8%20DataXAPI%20%E7%9A%84%E6%8E%A5%E5%8F%A3%20tiktok.shop.products.get%EF%BC%88TikTok%20Shop%20%E5%95%86%E5%93%81%E8%AF%A6%E6%83%85%EF%BC%89%E3%80%82) · [在 Claude 里打开](https://claude.ai/new?q=%E8%AF%BB%E4%B8%80%E4%B8%8B%20https%3A%2F%2Fdataxapi.com%2Fzh%2Fapis%2Ftiktok%2Fshop%2Fproducts%2Fget.md%EF%BC%8C%E7%84%B6%E5%90%8E%E5%B8%AE%E6%88%91%E7%94%A8%20DataXAPI%20%E7%9A%84%E6%8E%A5%E5%8F%A3%20tiktok.shop.products.get%EF%BC%88TikTok%20Shop%20%E5%95%86%E5%93%81%E8%AF%A6%E6%83%85%EF%BC%89%E3%80%82)

## 相关

这是 DataXAPI 电商数据的一部分。同一把 Key 还能用：社交媒体、达人、广告。

同一件事的其他平台：[小红书商品详情](https://dataxapi.com/zh/apis/xiaohongshu/shop/products/get/)

其他平台的电商数据：[小红书商品搜索](https://dataxapi.com/zh/apis/xiaohongshu/shop/products/search/)、[小红书商品评价](https://dataxapi.com/zh/apis/xiaohongshu/shop/products/reviews/list/)

TikTok Shop的接口：[TikTok Shop 商品详情](https://dataxapi.com/zh/apis/tiktok/shop/products/get/)、[TikTok Shop 商品评价](https://dataxapi.com/zh/apis/tiktok/shop/products/reviews/list/)、[TikTok Shop 商品搜索](https://dataxapi.com/zh/apis/tiktok/shop/products/search/)、[TikTok Shop 店铺商品](https://dataxapi.com/zh/apis/tiktok/shop/sellers/products/list/)

TikTok的接口：[TikTok 广告库搜索](https://dataxapi.com/zh/apis/tiktok/ads/search/)、[TikTok 广告库广告详情](https://dataxapi.com/zh/apis/tiktok/ads/get/)、[TikTok 评论回复](https://dataxapi.com/zh/apis/tiktok/comments/replies/list/)、[TikTok 话题作品](https://dataxapi.com/zh/apis/tiktok/hashtags/videos/list/)、[TikTok 用户资料](https://dataxapi.com/zh/apis/tiktok/users/get/)、[TikTok 用户搜索](https://dataxapi.com/zh/apis/tiktok/users/search/)、[TikTok 用户作品](https://dataxapi.com/zh/apis/tiktok/users/videos/list/)、[TikTok 视频评论](https://dataxapi.com/zh/apis/tiktok/videos/comments/list/)、[TikTok 视频详情](https://dataxapi.com/zh/apis/tiktok/videos/get/)、[TikTok 视频搜索](https://dataxapi.com/zh/apis/tiktok/videos/search/)、[TikTok 视频字幕](https://dataxapi.com/zh/apis/tiktok/videos/transcript/get/)、[TikTok 用户粉丝列表](https://dataxapi.com/zh/apis/tiktok/users/followers/list/)、[TikTok 无水印视频下载地址](https://dataxapi.com/zh/apis/tiktok/videos/media/get/)

TikTok 创意中心的接口：[TikTok 创意中心热门广告详情](https://dataxapi.com/zh/apis/tiktok/creative_center/ads/get/)、[TikTok 创意中心热门广告搜索](https://dataxapi.com/zh/apis/tiktok/creative_center/ads/search/)

怎么做和常见问题：[不要卖家授权，怎么用 API 取 TikTok Shop 的商品数据？（2026）](https://dataxapi.com/zh/answers/tiktok-shop-product-data-api/)

相关：[TikTok Shop的全部接口](https://dataxapi.com/zh/apis/tiktok/shop/)、[TikTok的全部接口](https://dataxapi.com/zh/apis/tiktok/)、[电商数据](https://dataxapi.com/zh/categories/commerce/)、[这件事在 2 个平台上的对照](https://dataxapi.com/zh/roles/products-get/)、[商品对象的字段](https://dataxapi.com/zh/docs/objects/product/)

## 常见问题

### TikTok Shop 商品详情 API 多少钱？

$0.0020 一次。单次最高扣费 $0.0020。

### 什么情况下不收费？

出错和超时不收费。

### 对象不存在会怎样？

返回 404 not_found。报错里的 charged 和 amount 写明这次扣了多少。reason 写明是哪一种：not_found（不存在）或 private_or_deleted（私密或已删除）。

---

最后核对于 2026-11-26 12:17 UTC。目录修订号 0051cce45e9530b9。 [网页版](https://dataxapi.com/zh/apis/tiktok/shop/products/get/)
