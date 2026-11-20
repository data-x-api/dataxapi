# LinkedIn 广告详情 API

按编号或链接取 LinkedIn 广告库里的一条广告：广告主、文案、标题、图片和视频素材、落地页、投放起止时间、展示量档位、定向的语言和地区。每次取一个对象；$0.0020 一次。出错和超时不收费。

- 地址：`GET https://api.dataxapi.com/v1/linkedin/ads/get`
- 编号：`linkedin.ads.get`
- 也叫：领英广告详情、领英广告库单条广告
- 价格：$0.0020 / 次
- 当前状态不写在这一页上（页面是快照），实时读：`GET https://api.dataxapi.com/v1/catalog/status`
- 返回：1 个对象, 一个广告对象
- 返回广告，预览结构，以后可能调整
- `id` 就在链接里：`linkedin.com/ad-library/detail/<id>`。也可以把整条链接传给 `url`。
- [在 Playground 里跑一次](https://dataxapi.com/zh/console/playground/?capability=linkedin.ads.get&params=%7B%22id%22%3A%221588761774%22%7D)
- 英文名：[LinkedIn ad detail API](https://dataxapi.com/apis/linkedin/ads/get/)

## 能拿到什么

2026-10-12 22:06 UTC 录下的真实返回，这里是前 3 行。

| 字段 | 值 |
| --- | --- |
| format | image |
| first_shown_at | 2026-10-10 |
| last_shown_at | 2026-10-12 |

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | 文本 | `id`、`url` 里给且只给一个 | 广告编号，一串数字，即广告库链接末尾那一段。示例：`1588761774`。 |
| `url` | 文本 | `id`、`url` 里给且只给一个 | 广告在广告库里的链接：linkedin.com/ad-library/detail/编号 的写法。示例：`https://www.linkedin.com/ad-library/detail/1588761774`。长链接：`https://www.linkedin.com/ad-library/detail/1588761774`。 |
| `view` | 文本 |  | 返回档位。三档价格相同。取值：`compact`、`standard`（默认）、`full`。 |
| `fields` | 文本列表 |  | 只要这些字段。按路径写，例如 `author.name`。 |

## 返回字段

`data.item` 是一个广告对象。预览：结构可能调整，改之前会公告。

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

每条数据的典型体积：`compact` 776 B、`standard` 1.8 KB、`full` 2.1 KB（按 2026-10-12 22:06 UTC 录下的那次返回量的）。

## 翻页

每次取一个对象，不翻页。

## 什么时候收费

| 情况 | 收费 |
| --- | --- |
| 返回了数据 | $0.0020，每次调用收一次 |
| 参数不合法、出错、超时 | 不收费 |
| 单次最高扣费 | $0.0020 (带 `X-Max-Price` 可以设自己的上限，超过就不执行) |

价格读取于 2026-11-20 07:17 UTC，按价目版本 19，2026-11-17 18:04 UTC 起生效；在 Playground 里运行前会再读一次当前价格。

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
curl -G "https://api.dataxapi.com/v1/linkedin/ads/get" \
  --data-urlencode "id=1588761774" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
# pip install dataxapi
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.linkedin.ads.get(id="1588761774")
print(result["data"]["item"])
```

### TypeScript

```typescript
// npm i @dataxapi/sdk
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.linkedin.ads.get({ id: "1588761774" });
console.log(result.data.item);
```

### 命令行

```bash
dataxapi call linkedin.ads.get id=1588761774
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

把这段加进你的 MCP 客户端，然后让你的 AI 调用 `linkedin.ads.get`。

## 返回

### 200

取自 2026-10-12 22:06 UTC 录下的真实返回。名字、正文和编号是示例，链接也是，都不是录到的原文（页面不展示任何人的个人信息）；数字是原样。长列表做了截断。请求号、游标和余额是示意。

返回大小：标准档 2.1 KB（精简 1.1 KB，完整 2.4 KB）。

```jsonc
{
  "code": "ok",
  "request_id": "d846e11e-eeb1-4293-bb25-f8f2847869cd",
  "data": {
    "item": {
      "id": "544442535",
      "url": "https://www.linkedin.com/ad-library/detail/544442535",
      "format": "image",
      "title": null,
      "text": "Weekend hiking essentials, 20% off this week only",
      "landing_url": null,
      "advertiser": {
        "id": "7138786220829374691",
        "name": "Pine & Oak Home",
        "url": "https://www.linkedin.com/company/7138786220829374691",
        "avatar_url": "https://media.licdn.com/dms/image/v2/nqf2u5ivrjmt6lSY/profile-displayphoto-shrink_100_100/0/"
      },
      "images": [
        "https://media.licdn.com/dms/image/v2/GsAXOPXiJ7lIPRuY/feedshare-shrink_800/0/"
      ],
      "first_shown_at": "2026-10-10T00:00:00.000Z",
      "last_shown_at": "2026-10-12T00:00:00.000Z"
    }
  },
  "warnings": [],
  "meta": {
    "capability": "linkedin.ads.get",
    "result_status": "complete",
    "fetched_at": "2026-10-12T22:06:03.000Z",
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
  "request_id": "5180ca26-5b68-4ff3-b758-a646a50832db",
  "message": "A parameter is invalid",
  "message_zh": "参数不合法",
  "charged": false,
  "retry": "after_fix",
  "retry_after_seconds": null,
  "param": null,
  "problems": ["give exactly one of id, url"],
  "docs_url": "https://dataxapi.com/docs/errors#invalid_params"
}
```

### 402

按规范写的示例，不是录下的返回。

```json
{
  "code": "insufficient_balance",
  "request_id": "2e0d1fd8-b841-4560-8e74-b43e1397e8bf",
  "message": "The balance is too low",
  "message_zh": "余额不足",
  "charged": false,
  "retry": "after_fix",
  "retry_after_seconds": null,
  "param": null,
  "required": "0.002",
  "available": "0",
  "top_up_url": "https://dataxapi.com/console/billing/?amount=10",
  "next_step": "Top up at top_up_url, then send the same request again, unchanged. Nothing was charged for this one.",
  "next_step_zh": "到 top_up_url 充值，到账后把同一个请求原样再发一次。这次没有扣钱。",
  "docs_url": "https://dataxapi.com/docs/errors#insufficient_balance"
}
```

### 404

按规范写的示例，不是录下的返回。

```json
{
  "code": "not_found",
  "request_id": "beffceae-cb17-4ff0-985e-6522df006120",
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
  "request_id": "023e61ad-a82d-4064-895f-be381c42f57e",
  "message": "No result came back this time and nothing was charged; retry shortly",
  "message_zh": "这次没有取到结果，没有扣费，可以稍后重试",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

这份录制的返回：平台原始 JSON 712 token，DataXAPI 的 JSON 636 token，AI 通过 DataXAPI 的 MCP 读到 255 token，少 64%（2026-11-06 统计）。

[这份示例的 JSON 文件](https://dataxapi.com/apis/linkedin/ads/get.example.json)

## 在你的 AI 里用它

`dataxapi setup` 给这台电脑上的 AI 代理（Claude Code、Codex、Cursor）装好 DataXAPI 的 MCP 服务和基础技能。Key 从环境变量 DATAXAPI_API_KEY 读，不写进任何文件。

MCP 服务地址：`https://api.dataxapi.com/mcp`。你的客户端要填的配置在本页请求示例的“MCP”页签里；接好后让你的 AI 调用 `linkedin.ads.get`。

或者把这段话贴给任意一个 AI：

> 读一下 https://dataxapi.com/zh/apis/linkedin/ads/get.md，然后帮我用 DataXAPI 的接口 linkedin.ads.get（LinkedIn 广告详情）。

[在 ChatGPT 里打开](https://chatgpt.com/?q=%E8%AF%BB%E4%B8%80%E4%B8%8B%20https%3A%2F%2Fdataxapi.com%2Fzh%2Fapis%2Flinkedin%2Fads%2Fget.md%EF%BC%8C%E7%84%B6%E5%90%8E%E5%B8%AE%E6%88%91%E7%94%A8%20DataXAPI%20%E7%9A%84%E6%8E%A5%E5%8F%A3%20linkedin.ads.get%EF%BC%88LinkedIn%20%E5%B9%BF%E5%91%8A%E8%AF%A6%E6%83%85%EF%BC%89%E3%80%82) · [在 Claude 里打开](https://claude.ai/new?q=%E8%AF%BB%E4%B8%80%E4%B8%8B%20https%3A%2F%2Fdataxapi.com%2Fzh%2Fapis%2Flinkedin%2Fads%2Fget.md%EF%BC%8C%E7%84%B6%E5%90%8E%E5%B8%AE%E6%88%91%E7%94%A8%20DataXAPI%20%E7%9A%84%E6%8E%A5%E5%8F%A3%20linkedin.ads.get%EF%BC%88LinkedIn%20%E5%B9%BF%E5%91%8A%E8%AF%A6%E6%83%85%EF%BC%89%E3%80%82)

## 相关

这是 DataXAPI 广告数据的一部分。同一把 Key 还能用：社交媒体、达人、电商。

同一件事的其他平台：[Google 广告详情](https://dataxapi.com/zh/apis/google/ads/get/)、[Meta 广告详情](https://dataxapi.com/zh/apis/meta/ads/get/)、[TikTok 广告库广告详情](https://dataxapi.com/zh/apis/tiktok/ads/get/)、[TikTok 创意中心热门广告详情](https://dataxapi.com/zh/apis/tiktok/creative_center/ads/get/)

其他平台的广告数据：[Google 广告主的广告](https://dataxapi.com/zh/apis/google/advertisers/ads/list/)、[Meta 广告库搜索](https://dataxapi.com/zh/apis/meta/ads/search/)、[Meta 广告主的广告](https://dataxapi.com/zh/apis/meta/advertisers/ads/list/)、[TikTok 广告库搜索](https://dataxapi.com/zh/apis/tiktok/ads/search/)、[TikTok 创意中心热门广告搜索](https://dataxapi.com/zh/apis/tiktok/creative_center/ads/search/)、[Google 广告主搜索](https://dataxapi.com/zh/apis/google/advertisers/search/)、[Meta 广告主搜索](https://dataxapi.com/zh/apis/meta/advertisers/search/)

LinkedIn的接口：[LinkedIn 广告详情](https://dataxapi.com/zh/apis/linkedin/ads/get/)、[LinkedIn 广告库搜索](https://dataxapi.com/zh/apis/linkedin/ads/search/)、[LinkedIn 公司主页](https://dataxapi.com/zh/apis/linkedin/companies/get/)、[LinkedIn 公司帖子](https://dataxapi.com/zh/apis/linkedin/companies/posts/list/)、[LinkedIn 帖子详情](https://dataxapi.com/zh/apis/linkedin/posts/get/)、[LinkedIn 帖子搜索](https://dataxapi.com/zh/apis/linkedin/posts/search/)、[LinkedIn 视频字幕](https://dataxapi.com/zh/apis/linkedin/posts/transcript/get/)

怎么做和常见问题：[LinkedIn 广告库 API：按关键词或公司名查广告（2026）](https://dataxapi.com/zh/answers/linkedin-ad-library-api/)

相关：[LinkedIn的全部接口](https://dataxapi.com/zh/apis/linkedin/)、[广告数据](https://dataxapi.com/zh/categories/ads/)、[这件事在 4 个平台上的对照](https://dataxapi.com/zh/roles/ads-get/)、[广告对象的字段](https://dataxapi.com/zh/docs/objects/ad/)

## 常见问题

### LinkedIn 广告详情 API 多少钱？

$0.0020 一次。单次最高扣费 $0.0020。

### 什么情况下不收费？

出错和超时不收费。

### 对象不存在会怎样？

返回 404 not_found。报错里的 charged 和 amount 写明这次扣了多少。reason 写明是哪一种：not_found（不存在）或 private_or_deleted（私密或已删除）。

---

最后核对于 2026-11-20 07:17 UTC。目录修订号 720fc3ea8dadb865。 [网页版](https://dataxapi.com/zh/apis/linkedin/ads/get/)
