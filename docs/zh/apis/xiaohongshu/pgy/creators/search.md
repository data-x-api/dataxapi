# 小红书蒲公英博主搜索 API

按搜索词找蒲公英上的小红书博主（按博主写的内容匹配）：博主编号、昵称、小红书号、所在地、内容类目、粉丝数，完整档另有图文和视频报价、阅读和互动中位数。也可以按蒲公英找博主的筛选条件找，或和搜索词一起用：粉丝数、报价、预估 CPM、日常和合作笔记的阅读与互动中位数、主做图文或视频、博主类目、擅长内容、人设、所在地、性别、粉丝性别和年龄、近期合作行业，可剔除低活跃和掉粉的；按粉丝数、报价、阅读、互动、外溢进店、阅读单价、回复率、涨粉、完播率等排序。一次搜索最多翻到前 5000 位。其他蒲公英接口要的博主编号从这里取。每次最多 20 条；$0.0400 一次。出错和超时不收费。

- 地址：`GET https://api.dataxapi.com/v1/xiaohongshu/pgy/creators/search`
- 编号：`xiaohongshu.pgy.creators.search`
- 也叫：找小红书博主、蒲公英找博主、搜蒲公英达人、蒲公英博主广场筛选、按粉丝数和报价筛小红书博主
- 价格：$0.0400 / 次
- 当前状态不写在这一页上（页面是快照），实时读：`GET https://api.dataxapi.com/v1/catalog/status`
- 返回：每页 20 条, 一页，带翻下一页的游标
- 返回达人，预览结构，以后可能调整
- [在 Playground 里跑一次](https://dataxapi.com/zh/console/playground/?capability=xiaohongshu.pgy.creators.search)
- 英文名：[Xiaohongshu PGY creator search API](https://dataxapi.com/apis/xiaohongshu/pgy/creators/search/)

## 能拿到什么

2026-11-10 22:14 UTC 录下的真实返回，这里是前 1 行。

| 字段 | 值 |
| --- | --- |
| metrics.followers | 340,715 |

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `query` | 文本 |  | 搜索词，按博主笔记的内容匹配；没有博主匹配的词，平台也会给出沾边的博主，不返回空。不填就只按筛选条件找。示例：`咖啡`。 |
| `sort` | 文本 |  | 按什么排：relevance 综合（默认）；most_followers 粉丝最多；lowest_rate、highest_rate 报价最低、最高；most_reads、most_engagements、most_impressions 日常笔记阅读、互动、曝光中位数最高；most_sponsored_reads、most_sponsored_engagements、most_sponsored_impressions 合作笔记的；most_shop_visits 外溢进店最多；lowest_read_cost_image、lowest_read_cost_video 图文、视频预估阅读单价最低；highest_reply_rate 邀约回复率最高；fastest_growth 粉丝涨得最快；most_active_followers 活跃粉丝占比最高；most_thousand_like_notes 千赞笔记占比最高；highest_completion_rate 视频完播率最高。取值：`relevance`（默认）、`most_followers`、`lowest_rate`、`highest_rate`、`most_reads`、`most_engagements`、`most_impressions`、`most_sponsored_reads`、`most_sponsored_engagements`、`most_sponsored_impressions`、`most_shop_visits`、`lowest_read_cost_image`、`lowest_read_cost_video`、`highest_reply_rate`、`fastest_growth`、`most_active_followers`、`most_thousand_like_notes`、`highest_completion_rate`。示例：`lowest_rate`。 |
| `followers_min` | 整数 |  | 粉丝数不少于。示例：`10000`。 |
| `followers_max` | 整数 |  | 粉丝数不多于。示例：`50000`。 |
| `rate_min` | 整数 |  | 报价不低于，人民币元：图文笔记的，type=video 时是视频笔记的。示例：`3000`。 |
| `rate_max` | 整数 |  | 报价不高于，人民币元：图文笔记的，type=video 时是视频笔记的。示例：`8000`。 |
| `cpm_min` | 整数 |  | 预估 CPM 不低于，人民币元：图文笔记的，type=video 时是视频笔记的。示例：`20`。 |
| `cpm_max` | 整数 |  | 预估 CPM 不高于，人民币元：图文笔记的，type=video 时是视频笔记的。示例：`150`。 |
| `median_reads_min` | 整数 |  | 日常笔记阅读数的中位数不少于。示例：`5000`。 |
| `median_engagements_min` | 整数 |  | 日常笔记互动数的中位数不少于。示例：`300`。 |
| `sponsored_median_reads_min` | 整数 |  | 合作笔记阅读数的中位数不少于。示例：`8000`。 |
| `type` | 文本 |  | 主做图文（image）还是视频（video）的博主；不填都要。取值：`image`、`video`。示例：`video`。 |
| `category` | 文本 |  | 博主类目，一级或二级（如“护肤”“面部保养”），照蒲公英的原话写，只收它字典里有的值，别的回 400。示例：`护肤`。 |
| `feature_tag` | 文本 |  | 擅长内容，一级或二级（如“vlog”“探店”），照蒲公英的原话写，只收它字典里有的值，别的回 400。示例：`探店`。 |
| `persona` | 文本 |  | 博主人设，任一层级（如“妈妈”“职业身份”），照蒲公英的原话写，只收它字典里有的值，别的回 400。示例：`妈妈`。 |
| `location` | 文本 |  | 博主所在地，省或市（如“上海”“杭州”），照蒲公英的原话写，只收它字典里有的值，别的回 400。示例：`杭州`。 |
| `gender` | 文本 |  | 博主的性别：female 女、male 男。取值：`female`、`male`。示例：`female`。 |
| `audience_gender` | 文本 |  | 粉丝里女性（female）或男性（male）占多数的博主。取值：`female`、`male`。示例：`female`。 |
| `audience_age` | 文本 |  | 粉丝里占比最高的年龄段：under_18、18_24、25_34、35_44、over_44。取值：`under_18`、`18_24`、`25_34`、`35_44`、`over_44`。示例：`25_34`。 |
| `industry` | 文本 |  | 近期合作过这个行业的博主：beauty 美妆个护、food_drink 食品饮料、mother_baby 母婴、electronics 3C 及电器、household 日用百货、fashion 服装配饰、internet 互联网、local_services 生活服务、home_building 家居建材、auto 汽车。取值：`beauty`、`food_drink`、`mother_baby`、`electronics`、`household`、`fashion`、`internet`、`local_services`、`home_building`、`auto`。示例：`beauty`。 |
| `exclude` | 文本 |  | 剔除哪些博主：low_active 低活跃的、follower_drop 掉粉的、both 两种都剔除。取值：`low_active`、`follower_drop`、`both`。示例：`both`。 |
| `cursor` | 文本 |  | 上一页返回的游标。把上一页的 `page.next_cursor` 原样带上。每翻一页按一次调用收费。 |
| `view` | 文本 |  | 返回档位。三档价格相同。取值：`compact`、`standard`（默认）、`full`。 |
| `fields` | 文本列表 |  | 只要这些字段。按路径写，例如 `author.name`。 |

## 返回字段

`data.items` 是达人对象的列表。预览：结构可能调整，改之前会公告。

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
| `ext.sponsored_notes` | 整数 | 商业合作笔记数。 | `full` | 有 |
| `ext.median_reads` | 整数 | 笔记阅读数的中位数。 | `full` | 有 |
| `ext.median_engagements` | 整数 | 笔记互动数的中位数。 | `full` | 有 |
| `approximate` | 对象列表 | 这一条里哪些数是约数或下限；都是准确值时不出现。 | `compact` | 有 |
| `approximate[].field` | 文本 | 字段的路径，如 metrics.views。 | `compact` | 有 |
| `approximate[].kind` | 文本 | 约数，还是下限。取值：`approximate`、`lower_bound`。 | `compact` | 有 |

某一条本来就没有这个值时，字段给 `null`。这个接口给不了的字段不出现，统一列在 `meta.unavailable`。

每条数据的典型体积：`compact` 182 B、`standard` 381 B、`full` 511 B（按 2026-11-10 22:14 UTC 录下的那次返回量的）。

## 翻页

每页 20 条。每页条数由平台决定，不收 `limit`。

取下一页时把 `page.next_cursor` 作为 `cursor` 带上；游标有效期 1 小时。最后一页的 `page.has_more` 是 false。

一次搜索最多翻到前 5000 位博主（250 页），平台不再往后给，即使总数更多。

## 什么时候收费

| 情况 | 收费 |
| --- | --- |
| 返回了数据 | $0.0400，每次调用收一次 |
| 每翻一页 | 按一次调用另收 |
| 参数不合法、出错、超时 | 不收费 |
| 单次最高扣费 | $0.0400 (带 `X-Max-Price` 可以设自己的上限，超过就不执行) |

价格读取于 2026-11-20 07:17 UTC，按价目版本 19，2026-11-17 18:04 UTC 起生效；在 Playground 里运行前会再读一次当前价格。

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
curl "https://api.dataxapi.com/v1/xiaohongshu/pgy/creators/search" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
# pip install dataxapi
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.xiaohongshu.pgy.creators.search()
print(result["data"]["items"])
```

### TypeScript

```typescript
// npm i @dataxapi/sdk
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.xiaohongshu.pgy.creators.search();
console.log(result.data.items);
```

### 命令行

```bash
dataxapi call xiaohongshu.pgy.creators.search
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

把这段加进你的 MCP 客户端，然后让你的 AI 调用 `xiaohongshu.pgy.creators.search`。

## 返回

### 200

取自 2026-11-10 22:14 UTC 录下的真实返回。名字、正文和编号是示例，链接也是，都不是录到的原文（页面不展示任何人的个人信息）；数字是原样。长列表做了截断。请求号、游标和余额是示意。

返回大小：标准档 7.9 KB（精简 4.0 KB，完整 10.4 KB）。

```jsonc
{
  "code": "ok",
  "request_id": "925f8cc7-d891-4f23-8d87-46f8515c35e9",
  "data": {
    "items": [
      {
        "id": "6acd5beb00000000c8b10386",
        "account_id": "6d5583880000000059f95d40",
        "username": "ajie_diy",
        "name": "阿杰爱折腾",
        "avatar_url": "https://sns-avatar-qc.xhscdn.com/avatar/68d7218800000000a4989fa3.jpg",
        "location": "北京",
        "categories": ["生活"],
        "subcategories": ["咖啡"],
        "metrics": { "followers": 340715 }
      },
      // … 另有 19 条
    ]
  },
  "page": {
    "next_cursor": "c1.tanuG8dT9ozo4D_Rnm44jKf3-2o-wxDT8ESWtMQB",
    "cursor_expires_at": "2026-11-10T23:14:22.000Z",
    "has_more": true,
    "returned": 20
  },
  "warnings": [],
  "meta": {
    "capability": "xiaohongshu.pgy.creators.search",
    "result_status": "complete",
    "fetched_at": "2026-11-10T22:14:22.000Z",
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

### 空结果

取自 2026-10-12 21:55 UTC 的录制，为演示这种情况人工改过。请求号和余额是示意。

返回大小：标准档 414 B（精简 414 B，完整 414 B）。

```jsonc
{
  "code": "ok",
  "request_id": "088700a7-de0f-4ecd-89ad-ccdc650c2936",
  "data": { "items": [] },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 0
  },
  "warnings": [],
  "meta": {
    "capability": "xiaohongshu.pgy.creators.search",
    "result_status": "empty",
    "fetched_at": "2026-10-12T21:55:09.000Z",
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
  "request_id": "90b2b698-697b-490a-b7c3-996f1e4aaa0d",
  "message": "A parameter is invalid",
  "message_zh": "参数不合法",
  "charged": false,
  "retry": "after_fix",
  "retry_after_seconds": null,
  "param": null,
  "problems": [
    "sort must be one of relevance, most_followers, lowest_rate, highest_rate, most_reads, most_engagements, most_impressions, most_sponsored_reads, most_sponsored_engagements, most_sponsored_impressions, most_shop_visits, lowest_read_cost_image, lowest_read_cost_video, highest_reply_rate, fastest_growth, most_active_followers, most_thousand_like_notes, highest_completion_rate"
  ],
  "docs_url": "https://dataxapi.com/docs/errors#invalid_params"
}
```

### 402

按规范写的示例，不是录下的返回。

```json
{
  "code": "insufficient_balance",
  "request_id": "a3c3b411-3410-44d0-a9a2-5a31c11e1bd8",
  "message": "The balance is too low",
  "message_zh": "余额不足",
  "charged": false,
  "retry": "after_fix",
  "retry_after_seconds": null,
  "param": null,
  "required": "0.04",
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
  "request_id": "018a554c-5ba8-41d5-8262-4d617e550f3c",
  "message": "No result came back this time and nothing was charged; retry shortly",
  "message_zh": "这次没有取到结果，没有扣费，可以稍后重试",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

这份录制的返回：平台原始 JSON 2.7 万 token，DataXAPI 的 JSON 2,830 token，AI 通过 DataXAPI 的 MCP 读到 1,416 token，少 95%（2026-11-06 统计）。

[这份示例的 JSON 文件](https://dataxapi.com/apis/xiaohongshu/pgy/creators/search.example.json)

## 在你的 AI 里用它

`dataxapi setup` 给这台电脑上的 AI 代理（Claude Code、Codex、Cursor）装好 DataXAPI 的 MCP 服务和基础技能。Key 从环境变量 DATAXAPI_API_KEY 读，不写进任何文件。

MCP 服务地址：`https://api.dataxapi.com/mcp`。你的客户端要填的配置在本页请求示例的“MCP”页签里；接好后让你的 AI 调用 `xiaohongshu.pgy.creators.search`。

或者把这段话贴给任意一个 AI：

> 读一下 https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/search.md，然后帮我用 DataXAPI 的接口 xiaohongshu.pgy.creators.search（小红书蒲公英博主搜索）。

[在 ChatGPT 里打开](https://chatgpt.com/?q=%E8%AF%BB%E4%B8%80%E4%B8%8B%20https%3A%2F%2Fdataxapi.com%2Fzh%2Fapis%2Fxiaohongshu%2Fpgy%2Fcreators%2Fsearch.md%EF%BC%8C%E7%84%B6%E5%90%8E%E5%B8%AE%E6%88%91%E7%94%A8%20DataXAPI%20%E7%9A%84%E6%8E%A5%E5%8F%A3%20xiaohongshu.pgy.creators.search%EF%BC%88%E5%B0%8F%E7%BA%A2%E4%B9%A6%E8%92%B2%E5%85%AC%E8%8B%B1%E5%8D%9A%E4%B8%BB%E6%90%9C%E7%B4%A2%EF%BC%89%E3%80%82) · [在 Claude 里打开](https://claude.ai/new?q=%E8%AF%BB%E4%B8%80%E4%B8%8B%20https%3A%2F%2Fdataxapi.com%2Fzh%2Fapis%2Fxiaohongshu%2Fpgy%2Fcreators%2Fsearch.md%EF%BC%8C%E7%84%B6%E5%90%8E%E5%B8%AE%E6%88%91%E7%94%A8%20DataXAPI%20%E7%9A%84%E6%8E%A5%E5%8F%A3%20xiaohongshu.pgy.creators.search%EF%BC%88%E5%B0%8F%E7%BA%A2%E4%B9%A6%E8%92%B2%E5%85%AC%E8%8B%B1%E5%8D%9A%E4%B8%BB%E6%90%9C%E7%B4%A2%EF%BC%89%E3%80%82)

## 相关

这是 DataXAPI 达人数据的一部分。同一把 Key 还能用：社交媒体、广告、电商。

同一件事的其他平台：[抖音星图达人搜索](https://dataxapi.com/zh/apis/douyin/xingtu/creators/search/)

小红书蒲公英的接口：[小红书蒲公英关键词逐日搜索指数](https://dataxapi.com/zh/apis/xiaohongshu/pgy/keywords/history/)、[小红书蒲公英关联词](https://dataxapi.com/zh/apis/xiaohongshu/pgy/keywords/related/)、[小红书蒲公英博主搜索](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/search/)、[小红书蒲公英博主详情](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/get/)、[小红书蒲公英博主粉丝画像](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/audience/get/)、[小红书蒲公英博主数据表现](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/metrics/)、[小红书蒲公英博主笔记](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/notes/list/)、[小红书蒲公英博主粉丝趋势](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/followers/history/)、[小红书蒲公英相似博主](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/related/)、[小红书蒲公英内容广场热门笔记](https://dataxapi.com/zh/apis/xiaohongshu/pgy/notes/trending/)、[小红书蒲公英博主合作成本和数据概览](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/costs/metrics/)、[小红书蒲公英博主粉丝概览](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/followers/metrics/)、[小红书蒲公英博主核心数据趋势](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/costs/history/)、[小红书蒲公英笔记数据](https://dataxapi.com/zh/apis/xiaohongshu/pgy/notes/get/)

小红书的接口：[小红书图片搜索](https://dataxapi.com/zh/apis/xiaohongshu/images/search/)、[小红书笔记详情](https://dataxapi.com/zh/apis/xiaohongshu/notes/get/)、[小红书评论回复](https://dataxapi.com/zh/apis/xiaohongshu/comments/replies/list/)、[小红书笔记评论](https://dataxapi.com/zh/apis/xiaohongshu/notes/comments/list/)、[小红书笔记搜索](https://dataxapi.com/zh/apis/xiaohongshu/notes/search/)、[小红书话题笔记](https://dataxapi.com/zh/apis/xiaohongshu/topics/notes/list/)、[小红书话题详情](https://dataxapi.com/zh/apis/xiaohongshu/topics/get/)、[小红书热点](https://dataxapi.com/zh/apis/xiaohongshu/trends/list/)、[小红书用户资料](https://dataxapi.com/zh/apis/xiaohongshu/users/get/)、[小红书用户笔记](https://dataxapi.com/zh/apis/xiaohongshu/users/notes/list/)、[小红书用户搜索](https://dataxapi.com/zh/apis/xiaohongshu/users/search/)、[小红书搜索框联想词](https://dataxapi.com/zh/apis/xiaohongshu/keywords/related/)、[小红书视频笔记详情（视频地址和字幕）](https://dataxapi.com/zh/apis/xiaohongshu/videos/get/)

小红书商城的接口：[小红书商品详情](https://dataxapi.com/zh/apis/xiaohongshu/shop/products/get/)、[小红书商品评价](https://dataxapi.com/zh/apis/xiaohongshu/shop/products/reviews/list/)、[小红书商品搜索](https://dataxapi.com/zh/apis/xiaohongshu/shop/products/search/)

怎么做和常见问题：[如何查小红书蒲公英博主报价和粉丝画像](https://dataxapi.com/zh/guides/xiaohongshu-pgy-creator-rates/)、[小红书数据怎么导出？](https://dataxapi.com/zh/answers/export-xiaohongshu-data/)、[ChatGPT 能读小红书吗？](https://dataxapi.com/zh/answers/can-chatgpt-read-xiaohongshu/)、[小红书蒲公英 CPE 和抖音星图 CPE 有什么不同？](https://dataxapi.com/zh/answers/xiaohongshu-pgy-cpe-vs-xingtu-cpe/)、[小红书蒲公英是什么？通过 API 能拿到哪些博主数据？](https://dataxapi.com/zh/answers/what-is-xiaohongshu-pgy/)、[小红书博主全部笔记怎么导出 Excel（2026）](https://dataxapi.com/zh/answers/export-xiaohongshu-creator-notes-excel/)、[投后怎么批量回收小红书笔记互动数据（2026）](https://dataxapi.com/zh/answers/collect-xiaohongshu-note-metrics-after-campaign/)、[蝉妈妈、千瓜、新榜有 API 吗？想要原始数据怎么办（2026）](https://dataxapi.com/zh/answers/chanmama-qiangua-newrank-api/)、[蒲公英博主怎么批量导出（2026）](https://dataxapi.com/zh/answers/export-xiaohongshu-pgy-creators/)、[抖音、小红书达人数据怎么批量取？KOL 资料、作品和报价（2026）](https://dataxapi.com/zh/answers/douyin-xiaohongshu-creator-data/)、[怎么看一个小红书博主每天的涨粉、掉粉？（2026）](https://dataxapi.com/zh/answers/xiaohongshu-creator-follower-growth/)、[怎么找和某个小红书博主相似的博主？（2026）](https://dataxapi.com/zh/answers/find-similar-xiaohongshu-creators/)、[怎么查小红书博主的 CPM、互动单价和阅读单价？（2026）](https://dataxapi.com/zh/answers/xiaohongshu-creator-cpm-cost/)、[小红书“外溢进店单价”是什么，怎么查？（2026）](https://dataxapi.com/zh/answers/xiaohongshu-spillover-store-visit-cost/)、[MCN 和品牌怎么批量给小红书博主选号、建达人库？（2026）](https://dataxapi.com/zh/answers/xiaohongshu-kol-selection-api/)、[小红书蒲公英达人页上的每个数据，API 都能取到吗？逐项对照（2026）](https://dataxapi.com/zh/answers/xiaohongshu-pgy-creator-page-fields/)、[蒲公英笔记的自然流量和推广流量有什么区别？怎么只看自然阅读（2026）](https://dataxapi.com/zh/answers/xiaohongshu-pgy-organic-vs-promoted-reads/)、[怎么看小红书博主好不好联系、活不活跃？（2026）](https://dataxapi.com/zh/answers/xiaohongshu-creator-easy-to-reach-active/)、[小红书博主笔记的流量来自哪里？发现页、搜索、关注占比怎么查（2026）](https://dataxapi.com/zh/answers/xiaohongshu-note-traffic-sources/)、[蒲公英找博主的筛选条件，能用 API 调吗？（2026）](https://dataxapi.com/zh/answers/xiaohongshu-pgy-find-creator-filters-api/)、[怎么看别人的小红书笔记阅读量？曝光量能查到吗（2026）](https://dataxapi.com/zh/answers/xiaohongshu-note-reads-impressions/)、[蒲公英找博主的类目、擅长内容、人设、所在地能填哪些值？全表（2026）](https://dataxapi.com/zh/answers/xiaohongshu-pgy-filter-values/)、[小红书美妆护肤博主怎么批量筛：按类目、粉丝、报价、CPM、近期合作行业（2026）](https://dataxapi.com/zh/answers/xiaohongshu-beauty-skincare-creators/)、[小红书数码博主怎么批量筛（2026）](https://dataxapi.com/zh/answers/xiaohongshu-tech-creators/)、[小红书蒲公英和星图的区别？两边的达人数据怎么对着看（2026）](https://dataxapi.com/zh/answers/xiaohongshu-pgy-vs-douyin-xingtu/)、[小红书数据怎么采集？官方后台、插件、爬虫、数据接口怎么选（2026）](https://dataxapi.com/zh/answers/how-to-collect-xiaohongshu-data/)

相关：[小红书蒲公英的全部接口](https://dataxapi.com/zh/apis/xiaohongshu/pgy/)、[小红书的全部接口](https://dataxapi.com/zh/apis/xiaohongshu/)、[达人数据](https://dataxapi.com/zh/categories/creator/)、[这件事在 2 个平台上的对照](https://dataxapi.com/zh/roles/creators-search/)、[达人对象的字段](https://dataxapi.com/zh/docs/objects/creator/)

## 常见问题

### 小红书蒲公英博主搜索 API 多少钱？

$0.0400 一次。单次最高扣费 $0.0400。

### 什么情况下不收费？

出错和超时不收费。

### 一次返回多少条？怎么翻页？

每页 20 条。每页条数由平台决定，不收 limit。取下一页时把 page.next_cursor 作为 cursor 带上；游标有效期 1 小时。最后一页的 page.has_more 是 false。

---

最后核对于 2026-11-20 07:17 UTC。目录修订号 720fc3ea8dadb865。 [网页版](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/search/)
