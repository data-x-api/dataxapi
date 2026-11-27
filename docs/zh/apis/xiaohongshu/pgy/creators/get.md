# 小红书蒲公英博主详情 API

按蒲公英博主编号取这位小红书博主在蒲公英上的资料：昵称、小红书号、所在地、内容类目、粉丝数，完整档另有图文和视频报价、最低报价、接不接图文和视频合作、商业笔记数和近 30 天合作笔记数、阅读和互动中位数、性别、内容特征和人设标签、合作过的行业、签约机构（MCN）、获赞与收藏。每次取一个对象；$0.0400 一次。出错和超时不收费。

- 地址：`GET https://api.dataxapi.com/v1/xiaohongshu/pgy/creators/get`
- 编号：`xiaohongshu.pgy.creators.get`
- 也叫：蒲公英达人详情、蒲公英达人报价、小红书博主报价
- 价格：$0.0400 / 次
- 当前状态不写在这一页上（页面是快照），实时读：`GET https://api.dataxapi.com/v1/catalog/status`
- 返回：1 个对象, 一个达人对象
- 返回达人，预览结构，以后可能调整
- [在 Playground 里跑一次](https://dataxapi.com/zh/console/playground/?capability=xiaohongshu.pgy.creators.get&params=%7B%22id%22%3A%225c0017ef6b58b740c92463fb%22%7D)
- 英文名：[Xiaohongshu PGY creator detail API](https://dataxapi.com/apis/xiaohongshu/pgy/creators/get/)

## 能拿到什么

2026-10-12 21:51 UTC 录下的真实返回，这里是前 1 行。

| 字段 | 值 |
| --- | --- |
| metrics.followers | 11,043 |

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | 文本 | 是 | 蒲公英博主编号，24 位十六进制；从蒲公英博主搜索的结果里取。示例：`5c0017ef6b58b740c92463fb`。 |
| `view` | 文本 |  | 返回档位。三档价格相同。取值：`compact`、`standard`（默认）、`full`。 |
| `fields` | 文本列表 |  | 只要这些字段。按路径写，例如 `author.name`。 |

## 返回字段

`data.item` 是一个达人对象。预览：结构可能调整，改之前会公告。

返回分三档：精简 `compact`（最常用的字段，长文本截短）、标准 `standard`（默认，全部标准字段）、完整 `full`（再加 `ext`，也就是这个平台特有的字段）。字段从表里写的那一档起出现，更大的档位也带。

| 字段 | 类型 | 说明 | 起始档位 | 这个接口 |
| --- | --- | --- | --- | --- |
| `id` | 文本 | 达人在这个营销市场里的编号。 | `compact` | 有 |
| `account_id` | 文本 | 这位达人的平台账号编号，可传给同平台的账号接口。 | `compact` | 有 |
| `username` | 文本 | 账号名。 | `compact` | 有 |
| `name` | 文本 | 显示名。 | `compact` | 有 |
| `avatar_url` | 链接 | 头像。 | `standard` | 有 |
| `location` | 文本 | 所在地，平台的原话。 | `standard` | 有 |
| `categories` | 文本列表 | 内容类目（一级），平台的原话。 | `compact` | 有 |
| `subcategories` | 文本列表 | 内容类目（二级），平台的原话。 | `standard` | 有 |
| `metrics` | 对象 | 达人的数字。 | `compact` | 有 |
| `metrics.followers` | 整数 | 粉丝数。 | `compact` | 有 |
| `ext.rate_image_note` | 金额 | 图文笔记的报价，人民币元。 | `full` | 有 |
| `ext.rate_video_note` | 金额 | 视频笔记的报价，人民币元。 | `full` | 有 |
| `ext.rate_lowest` | 金额 | 蒲公英给的最低报价（图文和视频报价里低的那个），人民币元。 | `full` | 有 |
| `ext.sponsored_notes` | 整数 | 商业合作笔记数。 | `full` | 有 |
| `ext.median_reads` | 整数 | 笔记阅读数的中位数。 | `full` | 有 |
| `ext.median_engagements` | 整数 | 笔记互动数的中位数。 | `full` | 有 |
| `ext.gender` | 文本 | 博主的性别：female 女、male 男；平台写“未知”时为 null。取值：`female`、`male`。 | `full` | 有 |
| `ext.feature_tags` | 文本列表 | 内容特征标签，平台的原话，如“开箱”“测评”。 | `full` | 有 |
| `ext.personal_tags` | 文本列表 | 人设标签，平台的原话，如“数码爱好者”“妈妈”。 | `full` | 有 |
| `ext.industries` | 文本列表 | 合作过的行业，平台的原话。 | `full` | 有 |
| `ext.agency` | 文本 | 签约的机构（MCN）名称；没有则为 null。 | `full` | 有 |
| `ext.likes_and_favorites` | 整数 | 笔记获得的赞和收藏合计，即主页上的“获赞与收藏”。 | `full` | 有 |
| `ext.accepts_sponsorship` | 是否 | 现在是否在蒲公英上接合作。 | `full` | 有 |
| `ext.accepts_image_notes` | 是否 | 是否接图文笔记合作。 | `full` | 有 |
| `ext.accepts_video_notes` | 是否 | 是否接视频笔记合作。 | `full` | 有 |
| `ext.sponsored_notes_30d` | 整数 | 近 30 天发布的合作笔记数。 | `full` | 有 |
| `ext.travel_areas` | 文本列表 | 博主在蒲公英资料里填的出行地区，平台的原话（省，或“省 市”）。 | `full` | 有 |
| `approximate` | 对象列表 | 这一条里哪些数是约数或下限；都是准确值时不出现。 | `compact` | 有 |
| `approximate[].field` | 文本 | 字段的路径，如 metrics.views。 | `compact` | 有 |
| `approximate[].kind` | 文本 | 约数，还是下限。取值：`approximate`、`lower_bound`。 | `compact` | 有 |

某一条本来就没有这个值时，字段给 `null`。这个接口给不了的字段不出现，统一列在 `meta.unavailable`。

每条数据的典型体积：`compact` 180 B、`standard` 347 B、`full` 747 B（按 2026-10-12 21:51 UTC 录下的那次返回量的）。

## 翻页

每次取一个对象，不翻页。

## 什么时候收费

| 情况 | 收费 |
| --- | --- |
| 返回了数据 | $0.0400，每次调用收一次 |
| 参数不合法、出错、超时 | 不收费 |
| 单次最高扣费 | $0.0400 (带 `X-Max-Price` 可以设自己的上限，超过就不执行) |

价格读取于 2026-11-27 06:18 UTC，按价目版本 23，2026-11-27 06:13 UTC 起生效；在 Playground 里运行前会再读一次当前价格。

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
curl -G "https://api.dataxapi.com/v1/xiaohongshu/pgy/creators/get" \
  --data-urlencode "id=5c0017ef6b58b740c92463fb" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
# pip install dataxapi
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.xiaohongshu.pgy.creators.get(id="5c0017ef6b58b740c92463fb")
print(result["data"]["item"])
```

### TypeScript

```typescript
// npm i @dataxapi/sdk
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.xiaohongshu.pgy.creators.get({ id: "5c0017ef6b58b740c92463fb" });
console.log(result.data.item);
```

### 命令行

```bash
dataxapi call xiaohongshu.pgy.creators.get id=5c0017ef6b58b740c92463fb
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

把这段加进你的 MCP 客户端，然后让你的 AI 调用 `xiaohongshu.pgy.creators.get`。

## 返回

### 200

取自 2026-10-12 21:51 UTC 录下的真实返回。名字、正文和编号是示例，链接也是，都不是录到的原文（页面不展示任何人的个人信息）；数字是原样。长列表做了截断。请求号、游标和余额是示意。

返回大小：标准档 673 B（精简 506 B，完整 1.0 KB）。

```jsonc
{
  "code": "ok",
  "request_id": "d4c40875-85f1-4408-8a36-1d006e97e0a2",
  "data": {
    "item": {
      "id": "6209fd5f00000000f4cd2191",
      "account_id": "6c6b1973000000002a5c263e",
      "username": "aya_living",
      "name": "认真生活的阿雅",
      "avatar_url": "https://sns-avatar-qc.xhscdn.com/avatar/66c033a300000000ab81d78c.jpg",
      "location": "北京",
      "categories": ["生活"],
      "subcategories": ["咖啡"],
      "metrics": { "followers": 11043 }
    }
  },
  "warnings": [],
  "meta": {
    "capability": "xiaohongshu.pgy.creators.get",
    "result_status": "complete",
    "fetched_at": "2026-10-12T21:51:54.000Z",
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
  "request_id": "df2a67ea-d407-4833-8137-52b0312e9c25",
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
  "request_id": "31b5a500-0735-41a6-a9b3-547cc3ae26be",
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
  "request_id": "839c4c91-d676-4780-ab19-8eda335bbcaf",
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
  "request_id": "6a99eb30-4f9e-47c1-9dc1-7aacf08418ea",
  "message": "No result came back this time and nothing was charged; retry shortly",
  "message_zh": "这次没有取到结果，没有扣费，可以稍后重试",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

这份录制的返回：平台原始 JSON 1,114 token，DataXAPI 的 JSON 224 token，AI 通过 DataXAPI 的 MCP 读到 115 token，少 90%（2026-11-06 统计）。

[这份示例的 JSON 文件](https://dataxapi.com/apis/xiaohongshu/pgy/creators/get.example.json)

## 在你的 AI 里用它

`dataxapi setup` 给这台电脑上的 AI 代理（Claude Code、Codex、Cursor）装好 DataXAPI 的 MCP 服务和基础技能。Key 从环境变量 DATAXAPI_API_KEY 读，不写进任何文件。

MCP 服务地址：`https://api.dataxapi.com/mcp`。你的客户端要填的配置在本页请求示例的“MCP”页签里；接好后让你的 AI 调用 `xiaohongshu.pgy.creators.get`。

或者把这段话贴给任意一个 AI：

> 读一下 https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/get.md，然后帮我用 DataXAPI 的接口 xiaohongshu.pgy.creators.get（小红书蒲公英博主详情）。

[在 ChatGPT 里打开](https://chatgpt.com/?q=%E8%AF%BB%E4%B8%80%E4%B8%8B%20https%3A%2F%2Fdataxapi.com%2Fzh%2Fapis%2Fxiaohongshu%2Fpgy%2Fcreators%2Fget.md%EF%BC%8C%E7%84%B6%E5%90%8E%E5%B8%AE%E6%88%91%E7%94%A8%20DataXAPI%20%E7%9A%84%E6%8E%A5%E5%8F%A3%20xiaohongshu.pgy.creators.get%EF%BC%88%E5%B0%8F%E7%BA%A2%E4%B9%A6%E8%92%B2%E5%85%AC%E8%8B%B1%E5%8D%9A%E4%B8%BB%E8%AF%A6%E6%83%85%EF%BC%89%E3%80%82) · [在 Claude 里打开](https://claude.ai/new?q=%E8%AF%BB%E4%B8%80%E4%B8%8B%20https%3A%2F%2Fdataxapi.com%2Fzh%2Fapis%2Fxiaohongshu%2Fpgy%2Fcreators%2Fget.md%EF%BC%8C%E7%84%B6%E5%90%8E%E5%B8%AE%E6%88%91%E7%94%A8%20DataXAPI%20%E7%9A%84%E6%8E%A5%E5%8F%A3%20xiaohongshu.pgy.creators.get%EF%BC%88%E5%B0%8F%E7%BA%A2%E4%B9%A6%E8%92%B2%E5%85%AC%E8%8B%B1%E5%8D%9A%E4%B8%BB%E8%AF%A6%E6%83%85%EF%BC%89%E3%80%82)

## 相关

这是 DataXAPI 达人数据的一部分。同一把 Key 还能用：社交媒体、广告、电商。

同一件事的其他平台：[抖音星图达人资料](https://dataxapi.com/zh/apis/douyin/xingtu/creators/get/)

小红书蒲公英的接口：[小红书蒲公英关键词逐日搜索指数](https://dataxapi.com/zh/apis/xiaohongshu/pgy/keywords/history/)、[小红书蒲公英关联词](https://dataxapi.com/zh/apis/xiaohongshu/pgy/keywords/related/)、[小红书蒲公英博主搜索](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/search/)、[小红书蒲公英博主详情](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/get/)、[小红书蒲公英博主粉丝画像](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/audience/get/)、[小红书蒲公英博主数据表现](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/metrics/)、[小红书蒲公英博主笔记](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/notes/list/)、[小红书蒲公英博主粉丝趋势](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/followers/history/)、[小红书蒲公英相似博主](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/related/)、[小红书蒲公英内容广场热门笔记](https://dataxapi.com/zh/apis/xiaohongshu/pgy/notes/trending/)、[小红书蒲公英博主合作成本和数据概览](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/costs/metrics/)、[小红书蒲公英博主粉丝概览](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/followers/metrics/)、[小红书蒲公英博主核心数据趋势](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/costs/history/)、[小红书蒲公英笔记数据](https://dataxapi.com/zh/apis/xiaohongshu/pgy/notes/get/)

小红书的接口：[小红书图片搜索](https://dataxapi.com/zh/apis/xiaohongshu/images/search/)、[小红书笔记详情](https://dataxapi.com/zh/apis/xiaohongshu/notes/get/)、[小红书评论回复](https://dataxapi.com/zh/apis/xiaohongshu/comments/replies/list/)、[小红书笔记评论](https://dataxapi.com/zh/apis/xiaohongshu/notes/comments/list/)、[小红书笔记搜索](https://dataxapi.com/zh/apis/xiaohongshu/notes/search/)、[小红书话题笔记](https://dataxapi.com/zh/apis/xiaohongshu/topics/notes/list/)、[小红书话题详情](https://dataxapi.com/zh/apis/xiaohongshu/topics/get/)、[小红书热点](https://dataxapi.com/zh/apis/xiaohongshu/trends/list/)、[小红书用户资料](https://dataxapi.com/zh/apis/xiaohongshu/users/get/)、[小红书用户笔记](https://dataxapi.com/zh/apis/xiaohongshu/users/notes/list/)、[小红书用户搜索](https://dataxapi.com/zh/apis/xiaohongshu/users/search/)、[小红书搜索框联想词](https://dataxapi.com/zh/apis/xiaohongshu/keywords/related/)、[小红书视频笔记详情（视频地址和字幕）](https://dataxapi.com/zh/apis/xiaohongshu/videos/get/)、[小红书视频转文字（文案提取、逐字稿）](https://dataxapi.com/zh/apis/xiaohongshu/videos/transcript/get/)、[小红书无水印原图和实况图下载地址](https://dataxapi.com/zh/apis/xiaohongshu/notes/media/get/)、[小红书无水印视频下载地址（各档清晰度和字幕）](https://dataxapi.com/zh/apis/xiaohongshu/videos/media/get/)

小红书商城的接口：[小红书商品详情](https://dataxapi.com/zh/apis/xiaohongshu/shop/products/get/)、[小红书商品评价](https://dataxapi.com/zh/apis/xiaohongshu/shop/products/reviews/list/)、[小红书商品搜索](https://dataxapi.com/zh/apis/xiaohongshu/shop/products/search/)

怎么做和常见问题：[抖音、小红书达人数据怎么批量取？KOL 资料、作品和报价（2026）](https://dataxapi.com/zh/answers/douyin-xiaohongshu-creator-data/)、[中国社媒营销数据工具大全：巨量算数、蒲公英、星图、微信指数等官方工具和数据接口（2026）](https://dataxapi.com/zh/answers/chinese-social-media-marketing-data-tools/)、[怎么看一个小红书博主每天的涨粉、掉粉？（2026）](https://dataxapi.com/zh/answers/xiaohongshu-creator-follower-growth/)、[怎么找和某个小红书博主相似的博主？（2026）](https://dataxapi.com/zh/answers/find-similar-xiaohongshu-creators/)、[小红书爆款笔记榜怎么用 API 拿到？（2026）](https://dataxapi.com/zh/answers/xiaohongshu-trending-notes-api/)、[怎么查小红书博主的 CPM、互动单价和阅读单价？（2026）](https://dataxapi.com/zh/answers/xiaohongshu-creator-cpm-cost/)、[怎么看小红书博主的粉丝是不是真粉？活跃、阅读、购买粉丝怎么查（2026）](https://dataxapi.com/zh/answers/xiaohongshu-creator-follower-quality/)、[MCN 和品牌怎么批量给小红书博主选号、建达人库？（2026）](https://dataxapi.com/zh/answers/xiaohongshu-kol-selection-api/)、[小红书蒲公英达人页上的每个数据，API 都能取到吗？逐项对照（2026）](https://dataxapi.com/zh/answers/xiaohongshu-pgy-creator-page-fields/)、[怎么只看一个小红书博主的合作笔记（商单）？（2026）](https://dataxapi.com/zh/answers/xiaohongshu-creator-sponsored-notes/)、[怎么看小红书博主好不好联系、活不活跃？（2026）](https://dataxapi.com/zh/answers/xiaohongshu-creator-easy-to-reach-active/)、[蒲公英找博主的筛选条件，能用 API 调吗？（2026）](https://dataxapi.com/zh/answers/xiaohongshu-pgy-find-creator-filters-api/)、[蒲公英找博主的类目、擅长内容、人设、所在地能填哪些值？全表（2026）](https://dataxapi.com/zh/answers/xiaohongshu-pgy-filter-values/)、[竞品在小红书找了哪些博主投放？用报备合作笔记反查（2026）](https://dataxapi.com/zh/answers/xiaohongshu-competitor-sponsored-creators/)、[小红书美妆护肤博主怎么批量筛：按类目、粉丝、报价、CPM、近期合作行业（2026）](https://dataxapi.com/zh/answers/xiaohongshu-beauty-skincare-creators/)、[小红书蒲公英和星图的区别？两边的达人数据怎么对着看（2026）](https://dataxapi.com/zh/answers/xiaohongshu-pgy-vs-douyin-xingtu/)

相关：[小红书蒲公英的全部接口](https://dataxapi.com/zh/apis/xiaohongshu/pgy/)、[小红书的全部接口](https://dataxapi.com/zh/apis/xiaohongshu/)、[达人数据](https://dataxapi.com/zh/categories/creator/)、[这件事在 2 个平台上的对照](https://dataxapi.com/zh/roles/creators-get/)、[达人对象的字段](https://dataxapi.com/zh/docs/objects/creator/)

## 常见问题

### 小红书蒲公英博主详情 API 多少钱？

$0.0400 一次。单次最高扣费 $0.0400。

### 什么情况下不收费？

出错和超时不收费。

### 对象不存在会怎样？

返回 404 not_found。报错里的 charged 和 amount 写明这次扣了多少。reason 写明是哪一种：not_found（不存在）或 private_or_deleted（私密或已删除）。

---

最后核对于 2026-11-27 06:18 UTC。目录修订号 0264e2d6dd4ff743。 [网页版](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/get/)
