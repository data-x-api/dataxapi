# Meta 广告主的广告 API

按广告主（Facebook 主页）的编号取它在 Meta 广告库里正在投放的广告：文案、标题、图片和视频素材、落地页、投放起止时间；可限定国家、只看图片或视频、按展示量或最新排序。一页 30 条。每次最多 30 条；$0.0020 一次。出错和超时不收费。

- 地址：`GET https://api.dataxapi.com/v1/meta/advertisers/ads/list`
- 编号：`meta.advertisers.ads.list`
- 也叫：某个品牌的 Facebook 广告、脸书主页在投的广告、品牌在投广告
- 价格：$0.0020 / 次
- 当前状态不写在这一页上（页面是快照），实时读：`GET https://api.dataxapi.com/v1/catalog/status`
- 返回：每页 30 条, 一页，带翻下一页的游标
- 返回广告，预览结构，以后可能调整
- [在 Playground 里跑一次](https://dataxapi.com/zh/console/playground/?capability=meta.advertisers.ads.list&params=%7B%22id%22%3A%22182162001806727%22%7D)
- 英文名：[Meta advertiser's ads API](https://dataxapi.com/apis/meta/advertisers/ads/list/)

## 能拿到什么

2026-10-12 21:44 UTC 录下的真实返回，这里是前 3 行。

| 字段 | 值 |
| --- | --- |
| format | image |
| first_shown_at | 2025-04-07 07:00 UTC |
| last_shown_at | 2026-10-12 07:00 UTC |

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | 文本 | 是 | 广告主的编号，即主页在广告库里的编号，一串数字；用“Meta 广告主搜索”按名称查，或取 Facebook 主页资料的 ext.ad_library_id（主页资料的 id 是另一个数）。示例：`182162001806727`。 |
| `region` | 文本 |  | 只要在这个国家或地区投放的广告，两个字母的代码；不写是全部。示例：`US`。 |
| `sort` | 文本 |  | 按展示量从高到低，或最新的在前。取值：`popular`（默认）、`latest`。示例：`popular`。 |
| `type` | 文本 |  | 只要图片广告或视频广告；不写是全部。取值：`image`、`video`。示例：`video`。 |
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
| `ext.format_label` | 文本 | 平台自己对这种广告形式的叫法，原文（如 VIDEO、DPA、DCO）。 | `full` | 有 |
| `ext.active` | 是否 | 现在是否还在投放。 | `full` | 有 |
| `ext.platforms` | 对象 | 投放到哪些平台，每个平台一个是或否。 | `full` | 有 |
| `ext.platforms.facebook` | 是否 | 是否投放到 Facebook。 | `full` | 有 |
| `ext.platforms.instagram` | 是否 | 是否投放到 Instagram。 | `full` | 有 |
| `ext.platforms.messenger` | 是否 | 是否投放到 Messenger。 | `full` | 有 |
| `ext.platforms.audience_network` | 是否 | 是否投放到 Audience Network（第三方应用和网站）。 | `full` | 有 |
| `ext.platforms.threads` | 是否 | 是否投放到 Threads。 | `full` | 有 |
| `ext.platforms.whatsapp` | 是否 | 是否投放到 WhatsApp。 | `full` | 有 |
| `ext.cta` | 文本 | 行动按钮上的字。 | `full` | 有 |
| `ext.cards` | 对象列表 | 多图轮播或多版本广告的每一张；单图、单视频广告为空。 | `full` | 有 |
| `ext.cards[].title` | 文本 | 这一张的标题。 | `full` | 有 |
| `ext.cards[].text` | 文本 | 这一张的文案。 | `full` | 有 |
| `ext.cards[].landing_url` | 链接 | 这一张点击后去的地址。 | `full` | 有 |
| `ext.cards[].image_url` | 链接 | 这一张的图片。 | `full` | 有 |
| `ext.cards[].video_url` | 链接 | 这一张的视频，会过期。 | `full` | 有 |
| `approximate` | 对象列表 | 这一条里哪些数是约数或下限；都是准确值时不出现。 | `compact` | 有 |
| `approximate[].field` | 文本 | 字段的路径，如 metrics.views。 | `compact` | 有 |
| `approximate[].kind` | 文本 | 约数，还是下限。取值：`approximate`、`lower_bound`。 | `compact` | 有 |

某一条本来就没有这个值时，字段给 `null`。这个接口给不了的字段不出现，统一列在 `meta.unavailable`。

每条数据的典型体积：`compact` 387 B、`standard` 3.2 KB、`full` 7.4 KB（按 2026-10-12 21:44 UTC 录下的那次返回量的）。

## 翻页

每页 30 条。每页条数由平台决定，不收 `limit`。

取下一页时把 `page.next_cursor` 作为 `cursor` 带上；游标有效期 1 小时。最后一页的 `page.has_more` 是 false。

## 什么时候收费

| 情况 | 收费 |
| --- | --- |
| 返回了数据 | $0.0020，每次调用收一次 |
| 每翻一页 | 按一次调用另收 |
| 参数不合法、出错、超时 | 不收费 |
| 单次最高扣费 | $0.0020 (带 `X-Max-Price` 可以设自己的上限，超过就不执行) |

价格读取于 2026-11-20 07:17 UTC，按价目版本 19，2026-11-17 18:04 UTC 起生效；在 Playground 里运行前会再读一次当前价格。

## 对象不存在时

分不清“广告主不存在”和“广告主现在没有在投的广告”：两种情况都返回空结果，不返回 404。

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
curl -G "https://api.dataxapi.com/v1/meta/advertisers/ads/list" \
  --data-urlencode "id=182162001806727" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
# pip install dataxapi
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.meta.advertisers.ads.list(id="182162001806727")
print(result["data"]["items"])
```

### TypeScript

```typescript
// npm i @dataxapi/sdk
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.meta.advertisers.ads.list({ id: "182162001806727" });
console.log(result.data.items);
```

### 命令行

```bash
dataxapi call meta.advertisers.ads.list id=182162001806727
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

把这段加进你的 MCP 客户端，然后让你的 AI 调用 `meta.advertisers.ads.list`。

## 返回

### 200

取自 2026-10-12 21:44 UTC 录下的真实返回。名字、正文和编号是示例，链接也是，都不是录到的原文（页面不展示任何人的个人信息）；数字是原样。长列表做了截断。请求号、游标和余额是示意。

返回大小：标准档 97.2 KB（精简 11.8 KB，完整 222.5 KB）。

```jsonc
{
  "code": "ok",
  "request_id": "e668eb1d-037c-4aa8-a619-d97577b4018d",
  "data": {
    "items": [
      {
        "id": "1366273623732556",
        "url": "https://www.facebook.com/ads/library/?id=1366273623732556",
        "format": "image",
        "title": "Weekend hiking essentials, 20% off this week only",
        "text": "Weekend hiking essentials, 20% off this week only",
        "landing_url": "https://www.northside-roasters.com/new?utm_source=meta",
        "advertiser": {
          "id": "163608278941038",
          "name": "Northside Coffee",
          "url": "https://www.facebook.com/profile.php?id=163608278941038",
          "avatar_url": "https://scontent.xx.fbcdn.net/v/t39.30808-1/442435085_118101354893229_n.jpg"
        },
        "images": [
          "https://scontent.xx.fbcdn.net/v/t39.35426-6/457089164_132879709605097_n.jpg",
          "https://scontent.xx.fbcdn.net/v/t39.35426-6/495655475_123700917496493_n.jpg",
          // … 另有 4 条
        ],
        "first_shown_at": "2025-04-07T07:00:00.000Z",
        "last_shown_at": "2026-10-12T07:00:00.000Z"
      },
      // … 另有 29 条
    ]
  },
  "page": {
    "next_cursor": "c1.TODjSo-a2u-2vYIvOrK_MLKKlXvkiTJkQul7_7Fg",
    "cursor_expires_at": "2026-10-12T22:44:28.000Z",
    "has_more": true,
    "returned": 30
  },
  "warnings": [],
  "meta": {
    "capability": "meta.advertisers.ads.list",
    "result_status": "complete",
    "fetched_at": "2026-10-12T21:44:28.000Z",
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

取自 2026-10-12 21:44 UTC 录下的真实返回。请求号和余额是示意。

返回大小：标准档 408 B（精简 408 B，完整 408 B）。

```jsonc
{
  "code": "ok",
  "request_id": "0448d31a-da7f-4c38-998b-d53f348bb6c7",
  "data": { "items": [] },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 0
  },
  "warnings": [],
  "meta": {
    "capability": "meta.advertisers.ads.list",
    "result_status": "empty",
    "fetched_at": "2026-10-12T21:44:31.000Z",
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
  "request_id": "b855b573-607a-4d46-8449-99f25c1b04c9",
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
  "request_id": "bc09bfe1-beb6-4d51-8b11-8d965d4cbb8b",
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

### 502

按规范写的示例，不是录下的返回。

```json
{
  "code": "upstream_failed",
  "request_id": "d60bd44a-741b-49c3-8056-e9052f21a5f1",
  "message": "No result came back this time and nothing was charged; retry shortly",
  "message_zh": "这次没有取到结果，没有扣费，可以稍后重试",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

这份录制的返回：平台原始 JSON 13.2 万 token，DataXAPI 的 JSON 5.2 万 token，AI 通过 DataXAPI 的 MCP 读到 3,736 token，少 97%（2026-11-06 统计）。

[这份示例的 JSON 文件](https://dataxapi.com/apis/meta/advertisers/ads/list.example.json)

## 在你的 AI 里用它

`dataxapi setup` 给这台电脑上的 AI 代理（Claude Code、Codex、Cursor）装好 DataXAPI 的 MCP 服务和基础技能。Key 从环境变量 DATAXAPI_API_KEY 读，不写进任何文件。

MCP 服务地址：`https://api.dataxapi.com/mcp`。你的客户端要填的配置在本页请求示例的“MCP”页签里；接好后让你的 AI 调用 `meta.advertisers.ads.list`。

或者把这段话贴给任意一个 AI：

> 读一下 https://dataxapi.com/zh/apis/meta/advertisers/ads/list.md，然后帮我用 DataXAPI 的接口 meta.advertisers.ads.list（Meta 广告主的广告）。

[在 ChatGPT 里打开](https://chatgpt.com/?q=%E8%AF%BB%E4%B8%80%E4%B8%8B%20https%3A%2F%2Fdataxapi.com%2Fzh%2Fapis%2Fmeta%2Fadvertisers%2Fads%2Flist.md%EF%BC%8C%E7%84%B6%E5%90%8E%E5%B8%AE%E6%88%91%E7%94%A8%20DataXAPI%20%E7%9A%84%E6%8E%A5%E5%8F%A3%20meta.advertisers.ads.list%EF%BC%88Meta%20%E5%B9%BF%E5%91%8A%E4%B8%BB%E7%9A%84%E5%B9%BF%E5%91%8A%EF%BC%89%E3%80%82) · [在 Claude 里打开](https://claude.ai/new?q=%E8%AF%BB%E4%B8%80%E4%B8%8B%20https%3A%2F%2Fdataxapi.com%2Fzh%2Fapis%2Fmeta%2Fadvertisers%2Fads%2Flist.md%EF%BC%8C%E7%84%B6%E5%90%8E%E5%B8%AE%E6%88%91%E7%94%A8%20DataXAPI%20%E7%9A%84%E6%8E%A5%E5%8F%A3%20meta.advertisers.ads.list%EF%BC%88Meta%20%E5%B9%BF%E5%91%8A%E4%B8%BB%E7%9A%84%E5%B9%BF%E5%91%8A%EF%BC%89%E3%80%82)

## 相关

这是 DataXAPI 广告数据的一部分。同一把 Key 还能用：社交媒体、达人、电商。

同一件事的其他平台：[Google 广告主的广告](https://dataxapi.com/zh/apis/google/advertisers/ads/list/)

其他平台的广告数据：[Google 广告详情](https://dataxapi.com/zh/apis/google/ads/get/)、[LinkedIn 广告详情](https://dataxapi.com/zh/apis/linkedin/ads/get/)、[LinkedIn 广告库搜索](https://dataxapi.com/zh/apis/linkedin/ads/search/)、[TikTok 广告库搜索](https://dataxapi.com/zh/apis/tiktok/ads/search/)、[TikTok 广告库广告详情](https://dataxapi.com/zh/apis/tiktok/ads/get/)、[TikTok 创意中心热门广告详情](https://dataxapi.com/zh/apis/tiktok/creative_center/ads/get/)、[TikTok 创意中心热门广告搜索](https://dataxapi.com/zh/apis/tiktok/creative_center/ads/search/)、[Google 广告主搜索](https://dataxapi.com/zh/apis/google/advertisers/search/)

Meta 广告库的接口：[Meta 广告详情](https://dataxapi.com/zh/apis/meta/ads/get/)、[Meta 广告库搜索](https://dataxapi.com/zh/apis/meta/ads/search/)、[Meta 广告视频字幕](https://dataxapi.com/zh/apis/meta/ads/transcript/get/)、[Meta 广告主的广告](https://dataxapi.com/zh/apis/meta/advertisers/ads/list/)、[Meta 广告主搜索](https://dataxapi.com/zh/apis/meta/advertisers/search/)

怎么做和常见问题：[Meta 广告库 API：按关键词搜广告、查一个 Facebook 主页投的全部广告（2026）](https://dataxapi.com/zh/answers/meta-ad-library-api/)

相关：[Meta 广告库的全部接口](https://dataxapi.com/zh/apis/meta/)、[广告数据](https://dataxapi.com/zh/categories/ads/)、[这件事在 2 个平台上的对照](https://dataxapi.com/zh/roles/advertisers-ads-list/)、[广告对象的字段](https://dataxapi.com/zh/docs/objects/ad/)

## 常见问题

### Meta 广告主的广告 API 多少钱？

$0.0020 一次。单次最高扣费 $0.0020。

### 什么情况下不收费？

出错和超时不收费。

### 一次返回多少条？怎么翻页？

每页 30 条。每页条数由平台决定，不收 limit。取下一页时把 page.next_cursor 作为 cursor 带上；游标有效期 1 小时。最后一页的 page.has_more 是 false。

### 对象不存在会怎样？

分不清“广告主不存在”和“广告主现在没有在投的广告”：两种情况都返回空结果，不返回 404。

---

最后核对于 2026-11-20 07:17 UTC。目录修订号 720fc3ea8dadb865。 [网页版](https://dataxapi.com/zh/apis/meta/advertisers/ads/list/)
