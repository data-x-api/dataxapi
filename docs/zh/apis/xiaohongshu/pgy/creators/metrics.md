# 小红书蒲公英博主数据表现 API

按蒲公英博主编号取这位小红书博主近 30 天或 90 天日常笔记或合作笔记的数据表现：笔记数和视频笔记数，曝光、阅读、互动、涨粉的中位数，互动率，完播率，点赞过百和过千的笔记占比，和超过了多少同类博主；曝光和阅读来自发现页、搜索、关注页等入口的占比。完整档另有逐篇笔记的曝光、阅读、互动和比中位数高出多少，以及长效笔记（约半年前发布的笔记）近期和长效阅读的数和来源。每次取一个对象；$0.0400 一次。出错和超时不收费。

- 地址：`GET https://api.dataxapi.com/v1/xiaohongshu/pgy/creators/metrics`
- 编号：`xiaohongshu.pgy.creators.metrics`
- 也叫：蒲公英数据表现、博主阅读中位数、博主互动率、小红书蒲公英博主表现概览
- 价格：$0.0400 / 次
- 当前状态不写在这一页上（页面是快照），实时读：`GET https://api.dataxapi.com/v1/catalog/status`
- 返回：1 个对象, 一个蒲公英博主数据表现对象
- 返回蒲公英博主数据表现，预览结构，以后可能调整
- [在 Playground 里跑一次](https://dataxapi.com/zh/console/playground/?capability=xiaohongshu.pgy.creators.metrics&params=%7B%22id%22%3A%225c0017ef6b58b740c92463fb%22%7D)
- 英文名：[Xiaohongshu PGY creator metrics API](https://dataxapi.com/apis/xiaohongshu/pgy/creators/metrics/)

## 能拿到什么

2026-10-12 21:53 UTC 录下的真实返回，这里是前 8 行。

| 字段 | 值 |
| --- | --- |
| notes | 34 |
| median_impressions | 3,535 |
| median_reads | 533 |
| median_engagements | 12 |
| median_likes | 10 |
| median_favorites | 2 |
| median_comments | 0 |
| median_shares | 3 |

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | 文本 | 是 | 蒲公英博主编号，24 位十六进制；从蒲公英博主搜索的结果里取。示例：`5c0017ef6b58b740c92463fb`。 |
| `window` | 文本 |  | 统计周期：近 30 天或近 90 天。取值：`30d`（默认）、`90d`。示例：`30d`。 |
| `tab` | 文本 |  | 看哪一类笔记的数：everyday 是日常笔记，sponsored 是合作笔记（商单）；默认 everyday，和蒲公英博主页上的两个分栏一样。取值：`everyday`（默认）、`sponsored`。示例：`everyday`。 |
| `view` | 文本 |  | 返回档位。三档价格相同。取值：`compact`、`standard`（默认）、`full`。 |
| `fields` | 文本列表 |  | 只要这些字段。按路径写，例如 `author.name`。 |

## 返回字段

`data.item` 是一个蒲公英博主数据表现对象。预览：结构可能调整，改之前会公告。

返回分三档：精简 `compact`（最常用的字段，长文本截短）、标准 `standard`（默认，全部标准字段）、完整 `full`（再加 `ext`，也就是这个平台特有的字段）。字段从表里写的那一档起出现，更大的档位也带。

| 字段 | 类型 | 说明 | 起始档位 | 这个接口 |
| --- | --- | --- | --- | --- |
| `creator_id` | 文本 | 蒲公英博主编号。 | `compact` | 有 |
| `notes` | 整数 | 统计周期内的笔记数。 | `compact` | 有 |
| `median_impressions` | 整数 | 曝光数的中位数。 | `compact` | 有 |
| `median_reads` | 整数 | 阅读数的中位数。 | `compact` | 有 |
| `median_engagements` | 整数 | 互动数的中位数。 | `compact` | 有 |
| `median_likes` | 整数 | 点赞数的中位数。 | `standard` | 有 |
| `median_favorites` | 整数 | 收藏数的中位数。 | `standard` | 有 |
| `median_comments` | 整数 | 评论数的中位数。 | `standard` | 有 |
| `median_shares` | 整数 | 分享数的中位数。 | `standard` | 有 |
| `engagement_rate` | 数字 | 互动率，0 到 1。 | `compact` | 有 |
| `video_completion_rate` | 数字 | 视频笔记的完播率，0 到 1。 | `standard` | 有 |
| `image_3s_read_rate` | 数字 | 图文笔记的 3 秒阅读率，0 到 1。 | `standard` | 有 |
| `hundred_like_share` | 数字 | 点赞过百的笔记占比，0 到 1。 | `standard` | 有 |
| `thousand_like_share` | 数字 | 点赞过千的笔记占比，0 到 1。 | `standard` | 有 |
| `impressions_percentile` | 数字 | 曝光中位数超过了多少同类博主，0 到 1。 | `standard` | 有 |
| `reads_percentile` | 数字 | 阅读中位数超过了多少同类博主，0 到 1。 | `standard` | 有 |
| `engagements_percentile` | 数字 | 互动中位数超过了多少同类博主，0 到 1。 | `standard` | 有 |
| `video_notes` | 整数 | 统计周期内的视频笔记数（含在 notes 里）。 | `standard` | 有 |
| `video_completion_percentile` | 数字 | 视频完播率超过了多少同类博主，0 到 1。 | `standard` | 有 |
| `median_follows` | 整数 | 单篇笔记带来的涨粉数的中位数。 | `standard` | 有 |
| `traffic_sources` | 对象 | 统计周期内这些笔记的流量从哪里来：曝光和阅读各自来自哪个入口的占比（蒲公英的“流量来源”），每组加起来是 1。 | `standard` | 有 |
| `traffic_sources.impressions` | 对象 | 曝光的来源占比。 | `standard` | 有 |
| `traffic_sources.impressions.homefeed` | 数字 | 曝光来自发现页（首页推荐）的占比，0 到 1。 | `standard` | 有 |
| `traffic_sources.impressions.search` | 数字 | 曝光来自搜索的占比，0 到 1。 | `standard` | 有 |
| `traffic_sources.impressions.follow` | 数字 | 曝光来自关注页的占比，0 到 1。 | `standard` | 有 |
| `traffic_sources.impressions.detail` | 数字 | 曝光来自笔记详情页的占比，0 到 1。 | `standard` | 有 |
| `traffic_sources.impressions.nearby` | 数字 | 曝光来自附近的占比，0 到 1。 | `standard` | 有 |
| `traffic_sources.impressions.other` | 数字 | 曝光来自其他入口的占比，0 到 1。 | `standard` | 有 |
| `traffic_sources.reads` | 对象 | 阅读的来源占比。 | `standard` | 有 |
| `traffic_sources.reads.homefeed` | 数字 | 阅读来自发现页（首页推荐）的占比，0 到 1。 | `standard` | 有 |
| `traffic_sources.reads.search` | 数字 | 阅读来自搜索的占比，0 到 1。 | `standard` | 有 |
| `traffic_sources.reads.follow` | 数字 | 阅读来自关注页的占比，0 到 1。 | `standard` | 有 |
| `traffic_sources.reads.detail` | 数字 | 阅读来自笔记详情页的占比，0 到 1。 | `standard` | 有 |
| `traffic_sources.reads.nearby` | 数字 | 阅读来自附近的占比，0 到 1。 | `standard` | 有 |
| `traffic_sources.reads.other` | 数字 | 阅读来自其他入口的占比，0 到 1。 | `standard` | 有 |
| `long_term` | 对象 | 长效表现（蒲公英的“长效笔记”）：大约半年前一段两个月里发布的笔记，平台把它们的阅读分成发布后“近期”和之后“长效”两段，各给阅读数、超过同行多少和阅读来源占比。tab=everyday 时是日常笔记的，tab=sponsored 时是合作笔记的。两段怎么划分平台没有说明。 | `full` | 有 |
| `long_term.published_from` | 时间 | 这批笔记的发布日期从哪天起：中国时间（UTC+8）的一个自然日，写成这个日期的 UTC 零点。 | `full` | 有 |
| `long_term.published_to` | 时间 | 这批笔记的发布日期到哪天止，写法同上。 | `full` | 有 |
| `long_term.notes` | 整数 | 这段时间发布的笔记数；为 0 时下面各项都是 null。 | `full` | 有 |
| `long_term.recent_reads` | 整数 | 近期阅读：单篇笔记的数，平台给的代表值（和本接口的阅读中位数同一量级，平台没说是中位数还是平均数）。 | `full` | 有 |
| `long_term.recent_reads_percentile` | 数字 | 近期阅读超过了多少同类博主，0 到 1。 | `full` | 有 |
| `long_term.long_term_reads` | 整数 | 长效阅读：单篇笔记的数，口径同近期阅读。 | `full` | 有 |
| `long_term.long_term_reads_percentile` | 数字 | 长效阅读超过了多少同类博主，0 到 1。 | `full` | 有 |
| `long_term.recent_sources` | 对象 | 近期阅读的来源占比，加起来是 1。 | `full` | 有 |
| `long_term.recent_sources.homefeed` | 数字 | 近期阅读来自发现页的占比，0 到 1。 | `full` | 有 |
| `long_term.recent_sources.search` | 数字 | 近期阅读来自搜索的占比，0 到 1。 | `full` | 有 |
| `long_term.recent_sources.profile` | 数字 | 近期阅读来自博主主页的占比，0 到 1。 | `full` | 有 |
| `long_term.recent_sources.follow` | 数字 | 近期阅读来自关注页的占比，0 到 1。 | `full` | 有 |
| `long_term.recent_sources.other` | 数字 | 近期阅读来自其他入口的占比，0 到 1。 | `full` | 有 |
| `long_term.long_term_sources` | 对象 | 长效阅读的来源占比，加起来是 1。 | `full` | 有 |
| `long_term.long_term_sources.homefeed` | 数字 | 长效阅读来自发现页的占比，0 到 1。 | `full` | 有 |
| `long_term.long_term_sources.search` | 数字 | 长效阅读来自搜索的占比，0 到 1。 | `full` | 有 |
| `long_term.long_term_sources.profile` | 数字 | 长效阅读来自博主主页的占比，0 到 1。 | `full` | 有 |
| `long_term.long_term_sources.follow` | 数字 | 长效阅读来自关注页的占比，0 到 1。 | `full` | 有 |
| `long_term.long_term_sources.other` | 数字 | 长效阅读来自其他入口的占比，0 到 1。 | `full` | 有 |
| `note_list` | 对象列表 | 统计周期内的笔记逐篇的数，按发布日期从早到晚；最多 15 篇（实测：周期内 34 篇时给了 15 篇），周期内没有笔记时为 null。 | `full` | 有 |
| `note_list[].id` | 文本 | 笔记编号。 | `full` | 有 |
| `note_list[].title` | 文本 | 笔记标题。 | `full` | 有 |
| `note_list[].type` | 文本 | 图文还是视频。取值：`image`、`video`。 | `full` | 有 |
| `note_list[].published_at` | 时间 | 发布日期（平台只给到日，按北京时间那一天的零点给）。 | `full` | 有 |
| `note_list[].cover_url` | 链接 | 封面图地址。 | `full` | 有 |
| `note_list[].impressions` | 整数 | 曝光数。 | `full` | 有 |
| `note_list[].reads` | 整数 | 阅读数。 | `full` | 有 |
| `note_list[].engagements` | 整数 | 互动数。 | `full` | 有 |
| `note_list[].likes` | 整数 | 点赞数。 | `full` | 有 |
| `note_list[].favorites` | 整数 | 收藏数。 | `full` | 有 |
| `note_list[].impressions_vs_median` | 数字 | 这篇的曝光数比这位博主本期的曝光中位数高出多少：1.5 是高出 150%，-0.3 是低 30%，0 是正好等于中位数。 | `full` | 有 |
| `note_list[].reads_vs_median` | 数字 | 这篇的阅读数比这位博主本期的阅读中位数高出多少：1.5 是高出 150%，-0.3 是低 30%，0 是正好等于中位数。 | `full` | 有 |
| `note_list[].engagements_vs_median` | 数字 | 这篇的互动数比这位博主本期的互动中位数高出多少：1.5 是高出 150%，-0.3 是低 30%，0 是正好等于中位数。 | `full` | 有 |
| `note_list[].likes_vs_median` | 数字 | 这篇的点赞数比这位博主本期的点赞中位数高出多少：1.5 是高出 150%，-0.3 是低 30%，0 是正好等于中位数。 | `full` | 有 |
| `note_list[].favorites_vs_median` | 数字 | 这篇的收藏数比这位博主本期的收藏中位数高出多少：1.5 是高出 150%，-0.3 是低 30%，0 是正好等于中位数。 | `full` | 有 |
| `approximate` | 对象列表 | 这一条里哪些数是约数或下限；都是准确值时不出现。 | `compact` | 有 |
| `approximate[].field` | 文本 | 字段的路径，如 metrics.views。 | `compact` | 有 |
| `approximate[].kind` | 文本 | 约数，还是下限。取值：`approximate`、`lower_bound`。 | `compact` | 有 |

某一条本来就没有这个值时，字段给 `null`。这个接口给不了的字段不出现，统一列在 `meta.unavailable`。

每条数据的典型体积：`compact` 147 B、`standard` 709 B、`full` 8.1 KB（按 2026-10-12 21:53 UTC 录下的那次返回量的）。

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
curl -G "https://api.dataxapi.com/v1/xiaohongshu/pgy/creators/metrics" \
  --data-urlencode "id=5c0017ef6b58b740c92463fb" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
# pip install dataxapi
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.xiaohongshu.pgy.creators.metrics(id="5c0017ef6b58b740c92463fb")
print(result["data"]["item"])
```

### TypeScript

```typescript
// npm i @dataxapi/sdk
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.xiaohongshu.pgy.creators.metrics({ id: "5c0017ef6b58b740c92463fb" });
console.log(result.data.item);
```

### 命令行

```bash
dataxapi call xiaohongshu.pgy.creators.metrics id=5c0017ef6b58b740c92463fb
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

把这段加进你的 MCP 客户端，然后让你的 AI 调用 `xiaohongshu.pgy.creators.metrics`。

## 返回

### 200

取自 2026-10-12 21:53 UTC 录下的真实返回。名字、正文和编号是示例，链接也是，都不是录到的原文（页面不展示任何人的个人信息）；数字是原样。长列表做了截断。请求号、游标和余额是示意。

返回大小：标准档 1.0 KB（精简 477 B，完整 8.5 KB）。

```jsonc
{
  "code": "ok",
  "request_id": "5abe7682-8e5c-465c-b1ca-aaa0992dff54",
  "data": {
    "item": {
      "creator_id": "622bd7c00000000007bc9f1a",
      "notes": 34,
      "median_impressions": 3535,
      "median_reads": 533,
      "median_engagements": 12,
      "median_likes": 10,
      "median_favorites": 2,
      "median_comments": 0,
      "median_shares": 3,
      "engagement_rate": 0.032,
      "video_completion_rate": 0.321,
      "image_3s_read_rate": 0.798,
      "hundred_like_share": 0.088,
      "thousand_like_share": 0,
      "impressions_percentile": 0.523,
      "reads_percentile": 0.476,
      "engagements_percentile": 0.333,
      "video_notes": 2,
      "video_completion_percentile": 0,
      "median_follows": 0,
      "traffic_sources": {
        "impressions": {
          "homefeed": 0.619,
          "search": 0.293,
          "follow": 0.036,
          "detail": 0.028,
          "nearby": 0.001,
          "other": 0.023
        },
        "reads": {
          "homefeed": 0.615,
          "search": 0.33,
          "follow": 0.013,
          "detail": 0.008,
          "nearby": 0,
          "other": 0.034
        }
      }
    }
  },
  "warnings": [],
  "meta": {
    "capability": "xiaohongshu.pgy.creators.metrics",
    "result_status": "complete",
    "fetched_at": "2026-10-12T21:53:24.000Z",
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
  "request_id": "71bf1074-347c-40b0-a214-c17375a47b2c",
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
  "request_id": "2d837437-2821-451b-b625-cf52227f5cb6",
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
  "request_id": "2d0716a7-f354-45a5-b7f4-cbc02b0c7967",
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
  "request_id": "f601305b-20ff-4ee5-99e2-b6da6cb5da86",
  "message": "No result came back this time and nothing was charged; retry shortly",
  "message_zh": "这次没有取到结果，没有扣费，可以稍后重试",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

这份录制的返回：平台原始 JSON 3,378 token，DataXAPI 的 JSON 238 token，AI 通过 DataXAPI 的 MCP 读到 101 token，少 97%（2026-11-06 统计）。

[这份示例的 JSON 文件](https://dataxapi.com/apis/xiaohongshu/pgy/creators/metrics.example.json)

## 在你的 AI 里用它

`dataxapi setup` 给这台电脑上的 AI 代理（Claude Code、Codex、Cursor）装好 DataXAPI 的 MCP 服务和基础技能。Key 从环境变量 DATAXAPI_API_KEY 读，不写进任何文件。

MCP 服务地址：`https://api.dataxapi.com/mcp`。你的客户端要填的配置在本页请求示例的“MCP”页签里；接好后让你的 AI 调用 `xiaohongshu.pgy.creators.metrics`。

或者把这段话贴给任意一个 AI：

> 读一下 https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/metrics.md，然后帮我用 DataXAPI 的接口 xiaohongshu.pgy.creators.metrics（小红书蒲公英博主数据表现）。

[在 ChatGPT 里打开](https://chatgpt.com/?q=%E8%AF%BB%E4%B8%80%E4%B8%8B%20https%3A%2F%2Fdataxapi.com%2Fzh%2Fapis%2Fxiaohongshu%2Fpgy%2Fcreators%2Fmetrics.md%EF%BC%8C%E7%84%B6%E5%90%8E%E5%B8%AE%E6%88%91%E7%94%A8%20DataXAPI%20%E7%9A%84%E6%8E%A5%E5%8F%A3%20xiaohongshu.pgy.creators.metrics%EF%BC%88%E5%B0%8F%E7%BA%A2%E4%B9%A6%E8%92%B2%E5%85%AC%E8%8B%B1%E5%8D%9A%E4%B8%BB%E6%95%B0%E6%8D%AE%E8%A1%A8%E7%8E%B0%EF%BC%89%E3%80%82) · [在 Claude 里打开](https://claude.ai/new?q=%E8%AF%BB%E4%B8%80%E4%B8%8B%20https%3A%2F%2Fdataxapi.com%2Fzh%2Fapis%2Fxiaohongshu%2Fpgy%2Fcreators%2Fmetrics.md%EF%BC%8C%E7%84%B6%E5%90%8E%E5%B8%AE%E6%88%91%E7%94%A8%20DataXAPI%20%E7%9A%84%E6%8E%A5%E5%8F%A3%20xiaohongshu.pgy.creators.metrics%EF%BC%88%E5%B0%8F%E7%BA%A2%E4%B9%A6%E8%92%B2%E5%85%AC%E8%8B%B1%E5%8D%9A%E4%B8%BB%E6%95%B0%E6%8D%AE%E8%A1%A8%E7%8E%B0%EF%BC%89%E3%80%82)

## 相关

这是 DataXAPI 达人数据的一部分。同一把 Key 还能用：社交媒体、广告、电商。

同一件事的其他平台：[抖音星图达人传播数据](https://dataxapi.com/zh/apis/douyin/xingtu/creators/metrics/)

小红书蒲公英的接口：[小红书蒲公英关键词逐日搜索指数](https://dataxapi.com/zh/apis/xiaohongshu/pgy/keywords/history/)、[小红书蒲公英关联词](https://dataxapi.com/zh/apis/xiaohongshu/pgy/keywords/related/)、[小红书蒲公英博主搜索](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/search/)、[小红书蒲公英博主详情](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/get/)、[小红书蒲公英博主粉丝画像](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/audience/get/)、[小红书蒲公英博主数据表现](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/metrics/)、[小红书蒲公英博主笔记](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/notes/list/)、[小红书蒲公英博主粉丝趋势](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/followers/history/)、[小红书蒲公英相似博主](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/related/)、[小红书蒲公英内容广场热门笔记](https://dataxapi.com/zh/apis/xiaohongshu/pgy/notes/trending/)、[小红书蒲公英博主合作成本和数据概览](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/costs/metrics/)、[小红书蒲公英博主粉丝概览](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/followers/metrics/)、[小红书蒲公英博主核心数据趋势](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/costs/history/)、[小红书蒲公英笔记数据](https://dataxapi.com/zh/apis/xiaohongshu/pgy/notes/get/)

小红书的接口：[小红书图片搜索](https://dataxapi.com/zh/apis/xiaohongshu/images/search/)、[小红书笔记详情](https://dataxapi.com/zh/apis/xiaohongshu/notes/get/)、[小红书评论回复](https://dataxapi.com/zh/apis/xiaohongshu/comments/replies/list/)、[小红书笔记评论](https://dataxapi.com/zh/apis/xiaohongshu/notes/comments/list/)、[小红书笔记搜索](https://dataxapi.com/zh/apis/xiaohongshu/notes/search/)、[小红书话题笔记](https://dataxapi.com/zh/apis/xiaohongshu/topics/notes/list/)、[小红书话题详情](https://dataxapi.com/zh/apis/xiaohongshu/topics/get/)、[小红书热点](https://dataxapi.com/zh/apis/xiaohongshu/trends/list/)、[小红书用户资料](https://dataxapi.com/zh/apis/xiaohongshu/users/get/)、[小红书用户笔记](https://dataxapi.com/zh/apis/xiaohongshu/users/notes/list/)、[小红书用户搜索](https://dataxapi.com/zh/apis/xiaohongshu/users/search/)、[小红书搜索框联想词](https://dataxapi.com/zh/apis/xiaohongshu/keywords/related/)、[小红书视频笔记详情（视频地址和字幕）](https://dataxapi.com/zh/apis/xiaohongshu/videos/get/)、[小红书视频转文字（文案提取、逐字稿）](https://dataxapi.com/zh/apis/xiaohongshu/videos/transcript/get/)、[小红书无水印原图和实况图下载地址](https://dataxapi.com/zh/apis/xiaohongshu/notes/media/get/)、[小红书无水印视频下载地址（各档清晰度和字幕）](https://dataxapi.com/zh/apis/xiaohongshu/videos/media/get/)

小红书商城的接口：[小红书商品详情](https://dataxapi.com/zh/apis/xiaohongshu/shop/products/get/)、[小红书商品评价](https://dataxapi.com/zh/apis/xiaohongshu/shop/products/reviews/list/)、[小红书商品搜索](https://dataxapi.com/zh/apis/xiaohongshu/shop/products/search/)

怎么做和常见问题：[小红书蒲公英 CPE 和抖音星图 CPE 有什么不同？](https://dataxapi.com/zh/answers/xiaohongshu-pgy-cpe-vs-xingtu-cpe/)、[小红书蒲公英是什么？通过 API 能拿到哪些博主数据？](https://dataxapi.com/zh/answers/what-is-xiaohongshu-pgy/)、[投后怎么批量回收小红书笔记互动数据（2026）](https://dataxapi.com/zh/answers/collect-xiaohongshu-note-metrics-after-campaign/)、[蒲公英博主怎么批量导出（2026）](https://dataxapi.com/zh/answers/export-xiaohongshu-pgy-creators/)、[抖音、小红书达人数据怎么批量取？KOL 资料、作品和报价（2026）](https://dataxapi.com/zh/answers/douyin-xiaohongshu-creator-data/)、[小红书博主的 CPM 每天怎么变？蒲公英核心数据趋势怎么拿（2026）](https://dataxapi.com/zh/answers/xiaohongshu-creator-cpm-trend/)、[MCN 和品牌怎么批量给小红书博主选号、建达人库？（2026）](https://dataxapi.com/zh/answers/xiaohongshu-kol-selection-api/)、[小红书蒲公英达人页上的每个数据，API 都能取到吗？逐项对照（2026）](https://dataxapi.com/zh/answers/xiaohongshu-pgy-creator-page-fields/)、[蒲公英笔记的自然流量和推广流量有什么区别？怎么只看自然阅读（2026）](https://dataxapi.com/zh/answers/xiaohongshu-pgy-organic-vs-promoted-reads/)、[怎么只看一个小红书博主的合作笔记（商单）？（2026）](https://dataxapi.com/zh/answers/xiaohongshu-creator-sponsored-notes/)、[小红书博主笔记的流量来自哪里？发现页、搜索、关注占比怎么查（2026）](https://dataxapi.com/zh/answers/xiaohongshu-note-traffic-sources/)

相关：[小红书蒲公英的全部接口](https://dataxapi.com/zh/apis/xiaohongshu/pgy/)、[小红书的全部接口](https://dataxapi.com/zh/apis/xiaohongshu/)、[达人数据](https://dataxapi.com/zh/categories/creator/)、[这件事在 2 个平台上的对照](https://dataxapi.com/zh/roles/creators-metrics/)、[蒲公英博主数据表现对象的字段](https://dataxapi.com/zh/docs/objects/pgy_creator_metrics/)

## 常见问题

### 小红书蒲公英博主数据表现 API 多少钱？

$0.0400 一次。单次最高扣费 $0.0400。

### 什么情况下不收费？

出错和超时不收费。

### 对象不存在会怎样？

返回 404 not_found。报错里的 charged 和 amount 写明这次扣了多少。reason 写明是哪一种：not_found（不存在）或 private_or_deleted（私密或已删除）。

---

最后核对于 2026-11-27 06:18 UTC。目录修订号 0264e2d6dd4ff743。 [网页版](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/metrics/)
