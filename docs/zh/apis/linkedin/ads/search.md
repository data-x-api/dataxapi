# LinkedIn 广告库搜索 API

按关键词或公司名搜 LinkedIn 广告库里的广告：广告主、文案、标题、图片和视频素材、落地页、投放起止时间、展示量档位、定向的语言和地区；可限定国家。每次最多 24 条；$0.0020 一次。出错和超时不收费。

- 地址：`GET https://api.dataxapi.com/v1/linkedin/ads/search`
- 编号：`linkedin.ads.search`
- 也叫：搜领英广告、领英广告库搜索、LinkedIn 品牌广告
- 价格：$0.0020 / 次
- 当前状态不写在这一页上（页面是快照），实时读：`GET https://api.dataxapi.com/v1/catalog/status`
- 返回：每页 24 条, 一页，带翻下一页的游标
- 返回广告，预览结构，以后可能调整
- [在 Playground 里跑一次](https://dataxapi.com/zh/console/playground/?capability=linkedin.ads.search&params=%7B%22query%22%3A%22cloud+security%22%7D)
- 英文名：[LinkedIn Ad Library search API](https://dataxapi.com/apis/linkedin/ads/search/)

## 能拿到什么

2026-10-12 22:05 UTC 录下的真实返回，这里是前 1 行。

| 字段 | 值 |
| --- | --- |
| format | image |

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `query` | 文本 | `query`、`advertiser` 里给且只给一个 | 搜索词。示例：`cloud security`。 |
| `advertiser` | 文本 | `query`、`advertiser` 里给且只给一个 | 只看这家公司投的广告，按公司名查，不和 query 一起用；这家公司自己的其他主页（如开发者主页）的广告也可能在里面。示例：`HubSpot`。 |
| `region` | 文本 |  | 只要在这个国家或地区投放的广告，两个字母的代码；不写是全部。示例：`US`。 |
| `cursor` | 文本 |  | 上一页返回的游标。把上一页的 `page.next_cursor` 原样带上。每翻一页按一次调用收费。 |
| `view` | 文本 |  | 返回档位。三档价格相同。取值：`compact`、`standard`（默认）、`full`。 |
| `fields` | 文本列表 |  | 只要这些字段。按路径写，例如 `author.name`。 |

## 返回字段

`data.items` 是广告对象的列表。预览：结构可能调整，改之前会公告。

返回分三档：精简 `compact`（最常用的字段，长文本截短）、标准 `standard`（默认，全部标准字段）、完整 `full`（再加 `ext`，也就是这个平台特有的字段）。字段从表里写的那一档起出现，更大的档位也带。

| 字段 | 类型 | 说明 | 起始档位 | 这个接口 |
| --- | --- | --- | --- | --- |
| `id` | 文本 | 编号，可原样传给取广告详情的接口。 | `compact` | 有 |
| `url` | 链接 | 这条广告在平台广告库里的页面。 | `compact` | 有 |
| `format` | 文本 | 素材形态；other 是平台自己的其他形式。取值：`video`、`image`、`carousel`、`text`、`other`。 | `compact` | 有 |
| `title` | 文本 | 标题。 | `compact` | 有 |
| `text` | 文本 | 文案。长文本：精简档只保留前 500 个字符，并在 `warnings` 里写明。 | `compact` | 有 |
| `landing_url` | 链接 | 点击后去的地址。 | `standard` | 有 |
| `advertiser` | 对象 | 广告主。 | `compact` | 有 |
| `advertiser.id` | 文本 | 广告主编号。 | `compact` | 有 |
| `advertiser.name` | 文本 | 广告主名称。 | `compact` | 有 |
| `advertiser.url` | 链接 | 广告主在平台上的主页。 | `standard` | 有 |
| `advertiser.avatar_url` | 链接 | 广告主的头像或标志。 | `standard` | 有 |
| `images` | 链接列表 | 图片素材的地址。 | `standard` | 有 |
| `videos` | 链接列表 | 视频素材的地址，会过期。 | `full` | 有 |
| `first_shown_at` | 时间 | 开始投放的时间。 | `compact` | 有 |
| `last_shown_at` | 时间 | 最近一次投放的时间；还在投的广告是平台最近一次看到它的时间。 | `compact` | 有 |
| `ext.format_label` | 文本 | 平台自己对这种广告形式的叫法，原文。 | `full` | 有 |
| `ext.cta` | 文本 | 行动按钮上的字。 | `full` | 有 |
| `ext.impressions_range` | 文本 | 总展示量的档位，按平台显示的原文。 | `full` | 有 |
| `ext.targeting_language` | 文本 | 定向的语言，按平台显示的原文。 | `full` | 有 |
| `ext.targeting_location` | 文本 | 定向的地区，按平台显示的原文。 | `full` | 有 |
| `approximate` | 对象列表 | 这一条里哪些数是约数或下限；都是准确值时不出现。 | `compact` | 有 |
| `approximate[].field` | 文本 | 字段的路径，如 metrics.views。 | `compact` | 有 |
| `approximate[].kind` | 文本 | 约数，还是下限。取值：`approximate`、`lower_bound`。 | `compact` | 有 |

某一条本来就没有这个值时，字段给 `null`。这个接口给不了的字段不出现，统一列在 `meta.unavailable`。

每条数据的典型体积：`compact` 547 B、`standard` 1.2 KB、`full` 1.5 KB（按 2026-10-12 22:05 UTC 录下的那次返回量的）。

## 翻页

每页 24 条。每页条数由平台决定，不收 `limit`。

取下一页时把 `page.next_cursor` 作为 `cursor` 带上；游标有效期 1 小时。最后一页的 `page.has_more` 是 false。

## 什么时候收费

| 情况 | 收费 |
| --- | --- |
| 返回了数据 | $0.0020，每次调用收一次 |
| 每翻一页 | 按一次调用另收 |
| 参数不合法、出错、超时 | 不收费 |
| 单次最高扣费 | $0.0020 (带 `X-Max-Price` 可以设自己的上限，超过就不执行) |

价格读取于 2026-11-26 12:17 UTC，按价目版本 22，2026-11-25 13:46 UTC 起生效；在 Playground 里运行前会再读一次当前价格。

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
curl -G "https://api.dataxapi.com/v1/linkedin/ads/search" \
  --data-urlencode "query=cloud security" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
# pip install dataxapi
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.linkedin.ads.search(query="cloud security")
print(result["data"]["items"])
```

### TypeScript

```typescript
// npm i @dataxapi/sdk
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.linkedin.ads.search({ query: "cloud security" });
console.log(result.data.items);
```

### 命令行

```bash
dataxapi call linkedin.ads.search 'query=cloud security'
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

把这段加进你的 MCP 客户端，然后让你的 AI 调用 `linkedin.ads.search`。

## 返回

### 200

取自 2026-10-12 22:05 UTC 录下的真实返回。名字、正文和编号是示例，链接也是，都不是录到的原文（页面不展示任何人的个人信息）；数字是原样。长列表做了截断。请求号、游标和余额是示意。

返回大小：标准档 30.0 KB（精简 13.6 KB，完整 35.6 KB）。

```jsonc
{
  "code": "ok",
  "request_id": "5115919a-b79c-4198-a3ca-f2c2ad6ae77a",
  "data": {
    "items": [
      {
        "id": "545546224",
        "url": "https://www.linkedin.com/ad-library/detail/545546224",
        "format": "image",
        "title": "Start cloud security with the kit made for beginners",
        "text": "Start cloud security with the kit made for beginners",
        "landing_url": null,
        "advertiser": {
          "id": "7312749414938281170",
          "name": "Northside Coffee",
          "url": "https://www.linkedin.com/company/7312749414938281170",
          "avatar_url": "https://media.licdn.com/dms/image/v2/4QOL9_qwEGjahW-F/profile-displayphoto-shrink_100_100/0/"
        },
        "images": [
          "https://media.licdn.com/dms/image/v2/xoZ9_0DLxf0X0wKB/feedshare-shrink_800/0/"
        ],
        "first_shown_at": null,
        "last_shown_at": null
      },
      // … 另有 23 条
    ]
  },
  "page": {
    "next_cursor": "c1.MqG5rNLEjiTQ-EAPTl5xVmx1jzyRRFUmdDHN0S_7",
    "cursor_expires_at": "2026-10-12T23:05:30.000Z",
    "has_more": true,
    "returned": 24
  },
  "warnings": [],
  "meta": {
    "capability": "linkedin.ads.search",
    "result_status": "complete",
    "fetched_at": "2026-10-12T22:05:30.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {},
    "billing": {
      "amount": "0.002",
      "currency": "USD",
      "balance_after": "9.998"
    }
  }
}
```

### 空结果

取自 2026-10-12 22:06 UTC 录下的真实返回。请求号和余额是示意。

返回大小：标准档 402 B（精简 402 B，完整 402 B）。

```jsonc
{
  "code": "ok",
  "request_id": "b02ea8e3-ef9c-4989-9848-3af34071a034",
  "data": { "items": [] },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 0
  },
  "warnings": [],
  "meta": {
    "capability": "linkedin.ads.search",
    "result_status": "empty",
    "fetched_at": "2026-10-12T22:06:09.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {},
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
  "request_id": "4fd294e1-e617-4ea7-a1ae-6d1cd7cd2d7d",
  "message": "A parameter is invalid",
  "message_zh": "参数不合法",
  "charged": false,
  "retry": "after_fix",
  "retry_after_seconds": null,
  "param": null,
  "problems": ["give exactly one of query, advertiser"],
  "docs_url": "https://dataxapi.com/docs/errors#invalid_params"
}
```

### 402

按规范写的示例，不是录下的返回。

```json
{
  "code": "insufficient_balance",
  "request_id": "1c26eab6-c5d4-482c-9fa1-1b7cef74031c",
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
  "request_id": "5f01f1ae-9f0c-4dac-b4b5-875cba66f4a0",
  "message": "No result came back this time and nothing was charged; retry shortly",
  "message_zh": "这次没有取到结果，没有扣费，可以稍后重试",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

这份录制的返回：平台原始 JSON 1.3 万 token，DataXAPI 的 JSON 9,534 token，AI 通过 DataXAPI 的 MCP 读到 3,348 token，少 74%（2026-11-06 统计）。

[这份示例的 JSON 文件](https://dataxapi.com/apis/linkedin/ads/search.example.json)

## 在你的 AI 里用它

`dataxapi setup` 给这台电脑上的 AI 代理（Claude Code、Codex、Cursor）装好 DataXAPI 的 MCP 服务和基础技能。Key 从环境变量 DATAXAPI_API_KEY 读，不写进任何文件。

MCP 服务地址：`https://api.dataxapi.com/mcp`。你的客户端要填的配置在本页请求示例的“MCP”页签里；接好后让你的 AI 调用 `linkedin.ads.search`。

或者把这段话贴给任意一个 AI：

> 读一下 https://dataxapi.com/zh/apis/linkedin/ads/search.md，然后帮我用 DataXAPI 的接口 linkedin.ads.search（LinkedIn 广告库搜索）。

[在 ChatGPT 里打开](https://chatgpt.com/?q=%E8%AF%BB%E4%B8%80%E4%B8%8B%20https%3A%2F%2Fdataxapi.com%2Fzh%2Fapis%2Flinkedin%2Fads%2Fsearch.md%EF%BC%8C%E7%84%B6%E5%90%8E%E5%B8%AE%E6%88%91%E7%94%A8%20DataXAPI%20%E7%9A%84%E6%8E%A5%E5%8F%A3%20linkedin.ads.search%EF%BC%88LinkedIn%20%E5%B9%BF%E5%91%8A%E5%BA%93%E6%90%9C%E7%B4%A2%EF%BC%89%E3%80%82) · [在 Claude 里打开](https://claude.ai/new?q=%E8%AF%BB%E4%B8%80%E4%B8%8B%20https%3A%2F%2Fdataxapi.com%2Fzh%2Fapis%2Flinkedin%2Fads%2Fsearch.md%EF%BC%8C%E7%84%B6%E5%90%8E%E5%B8%AE%E6%88%91%E7%94%A8%20DataXAPI%20%E7%9A%84%E6%8E%A5%E5%8F%A3%20linkedin.ads.search%EF%BC%88LinkedIn%20%E5%B9%BF%E5%91%8A%E5%BA%93%E6%90%9C%E7%B4%A2%EF%BC%89%E3%80%82)

## 相关

这是 DataXAPI 广告数据的一部分。同一把 Key 还能用：社交媒体、达人、电商。

同一件事的其他平台：[Meta 广告库搜索](https://dataxapi.com/zh/apis/meta/ads/search/)、[TikTok 广告库搜索](https://dataxapi.com/zh/apis/tiktok/ads/search/)、[TikTok 创意中心热门广告搜索](https://dataxapi.com/zh/apis/tiktok/creative_center/ads/search/)

其他平台的广告数据：[Google 广告详情](https://dataxapi.com/zh/apis/google/ads/get/)、[Google 广告主的广告](https://dataxapi.com/zh/apis/google/advertisers/ads/list/)、[Meta 广告详情](https://dataxapi.com/zh/apis/meta/ads/get/)、[Meta 广告主的广告](https://dataxapi.com/zh/apis/meta/advertisers/ads/list/)、[TikTok 广告库广告详情](https://dataxapi.com/zh/apis/tiktok/ads/get/)、[TikTok 创意中心热门广告详情](https://dataxapi.com/zh/apis/tiktok/creative_center/ads/get/)、[Google 广告主搜索](https://dataxapi.com/zh/apis/google/advertisers/search/)、[Meta 广告主搜索](https://dataxapi.com/zh/apis/meta/advertisers/search/)

LinkedIn的接口：[LinkedIn 广告详情](https://dataxapi.com/zh/apis/linkedin/ads/get/)、[LinkedIn 广告库搜索](https://dataxapi.com/zh/apis/linkedin/ads/search/)、[LinkedIn 公司主页](https://dataxapi.com/zh/apis/linkedin/companies/get/)、[LinkedIn 公司帖子](https://dataxapi.com/zh/apis/linkedin/companies/posts/list/)、[LinkedIn 帖子详情](https://dataxapi.com/zh/apis/linkedin/posts/get/)、[LinkedIn 帖子搜索](https://dataxapi.com/zh/apis/linkedin/posts/search/)、[LinkedIn 视频字幕](https://dataxapi.com/zh/apis/linkedin/posts/transcript/get/)

怎么做和常见问题：[LinkedIn 广告库 API：按关键词或公司名查广告（2026）](https://dataxapi.com/zh/answers/linkedin-ad-library-api/)

用到这个接口的 Skills：[广告素材拆解](https://dataxapi.com/zh/skills/ads/)

相关：[LinkedIn的全部接口](https://dataxapi.com/zh/apis/linkedin/)、[广告数据](https://dataxapi.com/zh/categories/ads/)、[这件事在 3 个平台上的对照](https://dataxapi.com/zh/roles/ads-search/)、[广告对象的字段](https://dataxapi.com/zh/docs/objects/ad/)

## 常见问题

### LinkedIn 广告库搜索 API 多少钱？

$0.0020 一次。单次最高扣费 $0.0020。

### 什么情况下不收费？

出错和超时不收费。

### 一次返回多少条？怎么翻页？

每页 24 条。每页条数由平台决定，不收 limit。取下一页时把 page.next_cursor 作为 cursor 带上；游标有效期 1 小时。最后一页的 page.has_more 是 false。

---

最后核对于 2026-11-26 12:17 UTC。目录修订号 0051cce45e9530b9。 [网页版](https://dataxapi.com/zh/apis/linkedin/ads/search/)
