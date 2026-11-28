# 抖音巨量算数关联词 API

按一个关键词取它在抖音上某一周的关联词（巨量算数）：搜索里一起出现的词和内容里一起出现的词，各带相关度、相关度名次、搜索指数和综合指数。指数是平台算出的热度分，不是搜索次数。每次约 170 条，最多 250 条；$0.0020 一次。出错和超时不收费。

- 地址：`GET https://api.dataxapi.com/v1/douyin/index/keywords/related`
- 编号：`douyin.index.keywords.related`
- 也叫：抖音关联词、巨量算数关联分析、抖音相关搜索词、抖音拓词
- 价格：$0.0020 / 次
- 当前状态不写在这一页上（页面是快照），实时读：`GET https://api.dataxapi.com/v1/catalog/status`
- 返回：每页最多 250 条, 一次给全，不翻页
- 返回关联词，预览结构，以后可能调整
- [在 Playground 里跑一次](https://dataxapi.com/zh/console/playground/?capability=douyin.index.keywords.related&params=%7B%22keyword%22%3A%22%E9%9C%B2%E8%90%A5%22%2C%22until%22%3A%222026-10-04T00%3A00%3A00Z%22%7D)
- 英文名：[Douyin trend-index related keywords API](https://dataxapi.com/apis/douyin/index/keywords/related/)

## 能拿到什么

2026-10-12 21:52 UTC 录下的真实返回（露营车），这里是前 7 行。

| 字段 | 值 |
| --- | --- |
| keyword | 露营车 |
| related_to | 露营 |
| relation | query |
| rank | 2 |
| relevance | 0.08 |
| search_index | 669,384 |
| composite_index | 190,809 |

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `keyword` | 文本 | 是 | 一个关键词，不分大小写。示例：`露营`。 |
| `until` | 时间 |  | 要哪一周：关联词按周出（周一到周日，中国时间），取在这一天或之前结束的最近一个整周。最新一周通常在下周初出数，还没出数时返回空；不写时取 7 天前，也就是已经出数的最近一个整周。示例：`2026-10-04T00:00:00Z`。 |
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
| `rank` | 整数 | 在同一种关联里按相关度排第几，从 1 起。在这个平台上：平台给的相关度名次，名次之间可能有空缺。 | `compact` | 有 |
| `relevance` | 数字 | 和所查的词的相关度，0 到 1。 | `compact` | 有 |
| `search_index` | 整数 | 这个关联词的搜索指数：平台算出的指数，不是搜索次数；平台不给这个词的数时为 null。 | `compact` | 有 |
| `composite_index` | 整数 | 这个关联词的综合指数：平台把相关内容的热度合起来算出的指数，不是次数。 | `compact` | 有 |
| `ext.relevance_change` | 数字 | 相关度比上一周的变化比例：0.1 是高了一成；这一周新出现的关联词为 null。 | `full` | 有 |
| `ext.is_new` | 是否 | 是否这一周新出现的关联词。 | `full` | 有 |
| `approximate` | 对象列表 | 这一条里哪些数是约数或下限；都是准确值时不出现。 | `compact` | 有 |
| `approximate[].field` | 文本 | 字段的路径，如 metrics.views。 | `compact` | 有 |
| `approximate[].kind` | 文本 | 约数，还是下限。取值：`approximate`、`lower_bound`。 | `compact` | 有 |

某一条本来就没有这个值时，字段给 `null`。这个接口给不了的字段不出现，统一列在 `meta.unavailable`。

每条数据的典型体积：`compact` 155 B、`standard` 155 B、`full` 204 B（按 2026-10-12 21:52 UTC 录下的那次返回量的）。

## 翻页

每页约 170 条，最多 250 条。每页条数由平台决定，不收 `limit`。

一次给全，不发游标。

## 什么时候收费

| 情况 | 收费 |
| --- | --- |
| 返回了数据 | $0.0020，每次调用收一次 |
| 参数不合法、出错、超时 | 不收费 |
| 单次最高扣费 | $0.0020 (带 `X-Max-Price` 可以设自己的上限，超过就不执行) |

价格读取于 2026-11-28 06:28 UTC，按价目版本 30，2026-11-28 04:43 UTC 起生效；在 Playground 里运行前会再读一次当前价格。

## 对象不存在时

平台没收录的关键词，和这一周没有关联词或还没出数的关键词一样，返回空结果，不报“不存在”。

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
curl -G "https://api.dataxapi.com/v1/douyin/index/keywords/related" \
  --data-urlencode "keyword=露营" \
  --data-urlencode "until=2026-10-04T00:00:00Z" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
# pip install dataxapi
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.douyin.index.keywords.related(keyword="露营", until="2026-10-04T00:00:00Z")
print(result["data"]["items"])
```

### TypeScript

```typescript
// npm i @dataxapi/sdk
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.douyin.index.keywords.related({ keyword: "露营", until: "2026-10-04T00:00:00Z" });
console.log(result.data.items);
```

### 命令行

```bash
dataxapi call douyin.index.keywords.related 'keyword=露营' until=2026-10-04T00:00:00Z
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

把这段加进你的 MCP 客户端，然后让你的 AI 调用 `douyin.index.keywords.related`。

## 返回

### 200

取自 2026-10-12 21:52 UTC 录下的真实返回。名字、正文和编号是示例，链接也是，都不是录到的原文（页面不展示任何人的个人信息）；数字是原样。长列表做了截断。请求号、游标和余额是示意。

返回大小：标准档 26.6 KB（精简 26.6 KB，完整 34.9 KB）。

```jsonc
{
  "code": "ok",
  "request_id": "c0ec3319-99cf-4ec1-8441-1e77af9db440",
  "data": {
    "items": [
      {
        "keyword": "露营车",
        "related_to": "露营",
        "relation": "query",
        "rank": 2,
        "relevance": 0.07604021617112115,
        "search_index": 669384,
        "composite_index": 190809
      },
      // … 另有 172 条
    ]
  },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 173
  },
  "warnings": [],
  "meta": {
    "capability": "douyin.index.keywords.related",
    "result_status": "complete",
    "fetched_at": "2026-10-12T21:52:26.000Z",
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

取自 2026-10-12 21:52 UTC 录下的真实返回。请求号和余额是示意。

返回大小：标准档 412 B（精简 412 B，完整 412 B）。

```jsonc
{
  "code": "ok",
  "request_id": "6effcad3-d2c9-41ac-8941-5e1c6e798e10",
  "data": { "items": [] },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 0
  },
  "warnings": [],
  "meta": {
    "capability": "douyin.index.keywords.related",
    "result_status": "empty",
    "fetched_at": "2026-10-12T21:52:28.000Z",
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
  "request_id": "a860bf7f-51fc-4b67-8674-2a2b3f2b6592",
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
  "request_id": "7222da1a-163b-4a1f-91f5-781a4ef64442",
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
  "request_id": "e2784f4e-cc60-414f-b718-96a7b08b667d",
  "message": "No result came back this time and nothing was charged; retry shortly",
  "message_zh": "这次没有取到结果，没有扣费，可以稍后重试",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

这份录制的返回：平台原始 JSON 3.7 万 token，DataXAPI 的 JSON 8,123 token，AI 通过 DataXAPI 的 MCP 读到 8,222 token，少 78%（2026-11-06 统计）。

[这份示例的 JSON 文件](https://dataxapi.com/apis/douyin/index/keywords/related.example.json)

## 在你的 AI 里用它

`dataxapi setup` 给这台电脑上的 AI 代理（Claude Code、Codex、Cursor）装好 DataXAPI 的 MCP 服务和基础技能。Key 从环境变量 DATAXAPI_API_KEY 读，不写进任何文件。

MCP 服务地址：`https://api.dataxapi.com/mcp`。你的客户端要填的配置在本页请求示例的“MCP”页签里；接好后让你的 AI 调用 `douyin.index.keywords.related`。

或者把这段话贴给任意一个 AI：

> 读一下 https://dataxapi.com/zh/apis/douyin/index/keywords/related.md，然后帮我用 DataXAPI 的接口 douyin.index.keywords.related（抖音巨量算数关联词）。

[在 ChatGPT 里打开](https://chatgpt.com/?q=%E8%AF%BB%E4%B8%80%E4%B8%8B%20https%3A%2F%2Fdataxapi.com%2Fzh%2Fapis%2Fdouyin%2Findex%2Fkeywords%2Frelated.md%EF%BC%8C%E7%84%B6%E5%90%8E%E5%B8%AE%E6%88%91%E7%94%A8%20DataXAPI%20%E7%9A%84%E6%8E%A5%E5%8F%A3%20douyin.index.keywords.related%EF%BC%88%E6%8A%96%E9%9F%B3%E5%B7%A8%E9%87%8F%E7%AE%97%E6%95%B0%E5%85%B3%E8%81%94%E8%AF%8D%EF%BC%89%E3%80%82) · [在 Claude 里打开](https://claude.ai/new?q=%E8%AF%BB%E4%B8%80%E4%B8%8B%20https%3A%2F%2Fdataxapi.com%2Fzh%2Fapis%2Fdouyin%2Findex%2Fkeywords%2Frelated.md%EF%BC%8C%E7%84%B6%E5%90%8E%E5%B8%AE%E6%88%91%E7%94%A8%20DataXAPI%20%E7%9A%84%E6%8E%A5%E5%8F%A3%20douyin.index.keywords.related%EF%BC%88%E6%8A%96%E9%9F%B3%E5%B7%A8%E9%87%8F%E7%AE%97%E6%95%B0%E5%85%B3%E8%81%94%E8%AF%8D%EF%BC%89%E3%80%82)

## 相关

这是 DataXAPI 社交媒体数据的一部分。同一把 Key 还能用：达人、广告、电商。

抖音巨量算数的接口：[抖音巨量算数品牌指数趋势](https://dataxapi.com/zh/apis/douyin/index/brands/history/)、[抖音巨量算数品牌指数对比](https://dataxapi.com/zh/apis/douyin/index/brands/metrics/)、[抖音巨量算数达人热门视频](https://dataxapi.com/zh/apis/douyin/index/creators/videos/list/)、[抖音巨量算数达人粉丝画像](https://dataxapi.com/zh/apis/douyin/index/creators/audience/get/)、[抖音巨量算数达人核心指标](https://dataxapi.com/zh/apis/douyin/index/creators/metrics/)、[抖音巨量算数关键词人群画像](https://dataxapi.com/zh/apis/douyin/index/keywords/audience/get/)、[抖音巨量算数关键词热度趋势](https://dataxapi.com/zh/apis/douyin/index/keywords/history/)、[抖音巨量算数关联词](https://dataxapi.com/zh/apis/douyin/index/keywords/related/)、[抖音巨量算数实时热点](https://dataxapi.com/zh/apis/douyin/index/trends/list/)、[抖音巨量算数关键词热门视频](https://dataxapi.com/zh/apis/douyin/index/videos/search/)

抖音的接口：[抖音评论回复](https://dataxapi.com/zh/apis/douyin/comments/replies/list/)、[抖音话题视频](https://dataxapi.com/zh/apis/douyin/hashtags/videos/list/)、[抖音热榜](https://dataxapi.com/zh/apis/douyin/trends/list/)、[抖音用户资料](https://dataxapi.com/zh/apis/douyin/users/get/)、[抖音达人互动与粉丝趋势](https://dataxapi.com/zh/apis/douyin/users/history/)、[抖音用户搜索](https://dataxapi.com/zh/apis/douyin/users/search/)、[抖音用户视频](https://dataxapi.com/zh/apis/douyin/users/videos/list/)、[抖音视频评论](https://dataxapi.com/zh/apis/douyin/videos/comments/list/)、[抖音视频详情](https://dataxapi.com/zh/apis/douyin/videos/get/)、[抖音视频转文字（文案提取、逐字稿）](https://dataxapi.com/zh/apis/douyin/videos/transcript/get/)、[抖音视频播放量](https://dataxapi.com/zh/apis/douyin/videos/metrics/)、[抖音相关视频](https://dataxapi.com/zh/apis/douyin/videos/related/)、[抖音视频搜索](https://dataxapi.com/zh/apis/douyin/videos/search/)、[抖音视频榜](https://dataxapi.com/zh/apis/douyin/videos/trending/)、[抖音搜索框联想词](https://dataxapi.com/zh/apis/douyin/keywords/related/)、[抖音无水印视频和图片下载地址](https://dataxapi.com/zh/apis/douyin/videos/media/get/)、[抖音音乐详情（背景音乐 MP3 和使用人数）](https://dataxapi.com/zh/apis/douyin/music/get/)、[抖音用户视频（备用版）](https://dataxapi.com/zh/apis/douyin/backup/users/videos/list/)、[抖音视频搜索（备用版）](https://dataxapi.com/zh/apis/douyin/backup/videos/search/)

抖音星图的接口：[抖音星图达人商业报价](https://dataxapi.com/zh/apis/douyin/xingtu/creators/rates/get/)、[抖音星图达人搜索](https://dataxapi.com/zh/apis/douyin/xingtu/creators/search/)、[抖音星图达人资料](https://dataxapi.com/zh/apis/douyin/xingtu/creators/get/)、[抖音星图达人粉丝画像](https://dataxapi.com/zh/apis/douyin/xingtu/creators/audience/get/)、[抖音星图达人传播数据](https://dataxapi.com/zh/apis/douyin/xingtu/creators/metrics/)、[抖音星图达人作品表现](https://dataxapi.com/zh/apis/douyin/xingtu/creators/videos/list/)、[抖音星图达人内容热词](https://dataxapi.com/zh/apis/douyin/xingtu/creators/keywords/get/)、[抖音星图达人星图指数](https://dataxapi.com/zh/apis/douyin/xingtu/creators/scores/get/)、[抖音星图达人内容分布](https://dataxapi.com/zh/apis/douyin/xingtu/creators/content_mix/get/)、[抖音星图达人转化能力](https://dataxapi.com/zh/apis/douyin/xingtu/creators/conversion/get/)、[抖音星图营销活动日历](https://dataxapi.com/zh/apis/douyin/xingtu/campaigns/list/)、[抖音星图视频数据报告（播放量、完播率）](https://dataxapi.com/zh/apis/douyin/xingtu/videos/get/)、[抖音星图达人粉丝画像（备用版）](https://dataxapi.com/zh/apis/douyin/xingtu/backup/creators/audience/get/)

怎么做和常见问题：[如何批量获取抖音关键词热度趋势](https://dataxapi.com/zh/guides/douyin-keyword-trends/)、[抖音搜索指数等于搜索次数吗？](https://dataxapi.com/zh/answers/douyin-search-index-vs-search-count/)、[巨量算数关键词指数是什么、能拿到什么？](https://dataxapi.com/zh/answers/what-is-douyin-keyword-index-ocean-engine/)、[投放前怎么看抖音、小红书的关键词热度（2026）](https://dataxapi.com/zh/answers/douyin-xiaohongshu-keyword-heat/)、[抖音、小红书搜索框的联想词（下拉词）怎么用 API 批量取？（2026）](https://dataxapi.com/zh/answers/douyin-xiaohongshu-search-suggestions-api/)、[抖音上搜某个词的都是什么人？关键词人群画像（年龄、性别、地域、兴趣、TGI）怎么查（2026）](https://dataxapi.com/zh/answers/douyin-keyword-audience/)

相关：[抖音巨量算数的全部接口](https://dataxapi.com/zh/apis/douyin/index/)、[抖音的全部接口](https://dataxapi.com/zh/apis/douyin/)、[社交媒体数据](https://dataxapi.com/zh/categories/social/)、[关联词对象的字段](https://dataxapi.com/zh/docs/objects/keyword_related/)

## 常见问题

### 抖音巨量算数关联词 API 多少钱？

$0.0020 一次。单次最高扣费 $0.0020。

### 什么情况下不收费？

出错和超时不收费。

### 一次返回多少条？怎么翻页？

每页约 170 条，最多 250 条。每页条数由平台决定，不收 limit。一次给全，不发游标。

### 对象不存在会怎样？

平台没收录的关键词，和这一周没有关联词或还没出数的关键词一样，返回空结果，不报“不存在”。

### 关联词从哪来？

来自抖音官方的巨量算数（抖音指数），按周算（中国时间周一到周日）。until 选的是在这一天或之前结束的最近一个整周；最新一周通常在下周初出数。

---

最后核对于 2026-11-28 06:28 UTC。目录修订号 ceced48b38f71468。 [网页版](https://dataxapi.com/zh/apis/douyin/index/keywords/related/)
