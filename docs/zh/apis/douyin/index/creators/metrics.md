# 抖音巨量算数达人核心指标 API

按抖音账号的数字编号取巨量算数给的达人核心指标：最近一周和最近一个月平均每天新增的点赞、分享、评论数和平台口径的涨粉数，以及各自和上一个周期相比的变化比例。涨粉数不是粉丝净增，比按粉丝增减算出来的大。平台没有数据的账号（各项全是 0）返回“不存在”。每次取一个对象；$0.0020 一次。出错和超时不收费。

- 地址：`GET https://api.dataxapi.com/v1/douyin/index/creators/metrics`
- 编号：`douyin.index.creators.metrics`
- 也叫：巨量算数达人指标、达人日均涨粉、达人日均点赞、抖音达人核心数据
- 价格：$0.0020 / 次
- 当前状态不写在这一页上（页面是快照），实时读：`GET https://api.dataxapi.com/v1/catalog/status`
- 返回：1 个对象, 一个巨量算数达人核心指标对象
- 返回巨量算数达人核心指标，预览结构，以后可能调整
- [在 Playground 里跑一次](https://dataxapi.com/zh/console/playground/?capability=douyin.index.creators.metrics&params=%7B%22id%22%3A%2266598046050%22%7D)
- 英文名：[Douyin trend-index creator core metrics API](https://dataxapi.com/apis/douyin/index/creators/metrics/)

## 能拿到什么

2026-10-13 03:24 UTC 录下的真实返回，这里是前 8 行。

| 字段 | 值 |
| --- | --- |
| average_7d.likes | 157,100.71 |
| average_7d.follows | 3,588 |
| average_7d.shares | 14,715.43 |
| average_7d.comments | 3,879.86 |
| average_30d.likes | 300,077.7 |
| average_30d.follows | 6,233.6 |
| average_30d.shares | 17,969.83 |
| average_30d.comments | 7,351.47 |

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | 文本 | 是 | 抖音账号的数字编号（uid），一串数字；不是账号资料接口用的那种以 MS4w 开头的编号。也不是抖音号（username，常常也是一串数字）：uid 在 douyin.users.get（加 view=full）返回的 ext.uid 里。粉丝很少的账号没有这份数据（实测几百粉丝的取不到、三万粉丝以上的取得到），这时重试也取不到。示例：`66598046050`。 |
| `view` | 文本 |  | 返回档位。三档价格相同。取值：`compact`、`standard`（默认）、`full`。 |
| `fields` | 文本列表 |  | 只要这些字段。按路径写，例如 `author.name`。 |

## 返回字段

`data.item` 是一个巨量算数达人核心指标对象。预览：结构可能调整，改之前会公告。

返回分三档：精简 `compact`（最常用的字段，长文本截短）、标准 `standard`（默认，全部标准字段）、完整 `full`（再加 `ext`，也就是这个平台特有的字段）。字段从表里写的那一档起出现，更大的档位也带。

| 字段 | 类型 | 说明 | 起始档位 | 这个接口 |
| --- | --- | --- | --- | --- |
| `creator_id` | 文本 | 账号的数字编号（抖音的 uid），就是请求里给的那个。 | `compact` | 有 |
| `average_7d` | 对象 | 最近一周的日均值。 | `compact` | 有 |
| `average_7d.likes` | 数字 | 最近一周平均每天新增的点赞数。 | `compact` | 有 |
| `average_7d.follows` | 数字 | 最近一周平均每天的涨粉数，平台的口径，不是粉丝净增：同一平台给的同类数字比按粉丝净增算出来的日均数大 2 到 10 倍，粉丝净减的账号也是正数。平台没说明怎么算，适合看趋势、比账号，别当净增用。 | `compact` | 有 |
| `average_7d.shares` | 数字 | 最近一周平均每天新增的分享数。 | `compact` | 有 |
| `average_7d.comments` | 数字 | 最近一周平均每天新增的评论数。 | `compact` | 有 |
| `average_30d` | 对象 | 最近一个月的日均值。 | `compact` | 有 |
| `average_30d.likes` | 数字 | 最近一个月平均每天新增的点赞数。 | `compact` | 有 |
| `average_30d.follows` | 数字 | 最近一个月平均每天的涨粉数，平台的口径，同上：不是粉丝净增。 | `compact` | 有 |
| `average_30d.shares` | 数字 | 最近一个月平均每天新增的分享数。 | `compact` | 有 |
| `average_30d.comments` | 数字 | 最近一个月平均每天新增的评论数。 | `compact` | 有 |
| `change_7d` | 对象 | 最近一周的日均值和上一周相比的变化比例：0.3 是多了三成，-0.5 是少了一半。 | `compact` | 有 |
| `change_7d.likes` | 数字 | 日均新增点赞数的变化比例。 | `compact` | 有 |
| `change_7d.follows` | 数字 | 日均涨粉数（平台的口径，不是粉丝净增）的变化比例。 | `compact` | 有 |
| `change_7d.shares` | 数字 | 日均新增分享数的变化比例。 | `compact` | 有 |
| `change_7d.comments` | 数字 | 日均新增评论数的变化比例。 | `compact` | 有 |
| `change_30d` | 对象 | 最近一个月的日均值和上一个月相比的变化比例，写法同上。 | `compact` | 有 |
| `change_30d.likes` | 数字 | 日均新增点赞数的变化比例。 | `compact` | 有 |
| `change_30d.follows` | 数字 | 日均涨粉数（平台的口径，不是粉丝净增）的变化比例。 | `compact` | 有 |
| `change_30d.shares` | 数字 | 日均新增分享数的变化比例。 | `compact` | 有 |
| `change_30d.comments` | 数字 | 日均新增评论数的变化比例。 | `compact` | 有 |
| `approximate` | 对象列表 | 这一条里哪些数是约数或下限；都是准确值时不出现。 | `compact` | 有 |
| `approximate[].field` | 文本 | 字段的路径，如 metrics.views。 | `compact` | 有 |
| `approximate[].kind` | 文本 | 约数，还是下限。取值：`approximate`、`lower_bound`。 | `compact` | 有 |

某一条本来就没有这个值时，字段给 `null`。这个接口给不了的字段不出现，统一列在 `meta.unavailable`。

每条数据的典型体积：`compact` 518 B、`standard` 518 B、`full` 518 B（按 2026-10-13 03:24 UTC 录下的那次返回量的）。

## 翻页

每次取一个对象，不翻页。

## 什么时候收费

| 情况 | 收费 |
| --- | --- |
| 返回了数据 | $0.0020，每次调用收一次 |
| 参数不合法、出错、超时 | 不收费 |
| 单次最高扣费 | $0.0020 (带 `X-Max-Price` 可以设自己的上限，超过就不执行) |

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
curl -G "https://api.dataxapi.com/v1/douyin/index/creators/metrics" \
  --data-urlencode "id=66598046050" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
# pip install dataxapi
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.douyin.index.creators.metrics(id="66598046050")
print(result["data"]["item"])
```

### TypeScript

```typescript
// npm i @dataxapi/sdk
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.douyin.index.creators.metrics({ id: "66598046050" });
console.log(result.data.item);
```

### 命令行

```bash
dataxapi call douyin.index.creators.metrics id=66598046050
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

把这段加进你的 MCP 客户端，然后让你的 AI 调用 `douyin.index.creators.metrics`。

## 返回

### 200

取自 2026-10-13 03:24 UTC 录下的真实返回。名字、正文和编号是示例，链接也是，都不是录到的原文（页面不展示任何人的个人信息）；数字是原样。长列表做了截断。请求号、游标和余额是示意。

返回大小：标准档 845 B（精简 845 B，完整 845 B）。

```jsonc
{
  "code": "ok",
  "request_id": "1aa3d06c-7ce1-486b-ad2e-5fa3fdf7449d",
  "data": {
    "item": {
      "creator_id": "62430445852",
      "average_7d": {
        "likes": 157100.7142857143,
        "follows": 3588,
        "shares": 14715.42857142857,
        "comments": 3879.8571428571427
      },
      "average_30d": {
        "likes": 300077.7,
        "follows": 6233.6,
        "shares": 17969.833333333332,
        "comments": 7351.466666666666
      },
      "change_7d": {
        "likes": -0.20028666505711482,
        "follows": -0.1607298001737619,
        "shares": 0.8577740905729795,
        "comments": -0.28813692598028945
      },
      "change_30d": {
        "likes": -0.12000717497205526,
        "follows": -0.1316211058123174,
        "shares": -0.1697698557902584,
        "comments": -0.23841359186421957
      }
    }
  },
  "warnings": [],
  "meta": {
    "capability": "douyin.index.creators.metrics",
    "result_status": "complete",
    "fetched_at": "2026-10-13T03:24:56.000Z",
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
  "request_id": "d25a2d05-7e8c-48c7-baa8-9bf81406b6eb",
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
  "request_id": "3aadf25d-37a1-4d9e-a4ee-5abaafcec30e",
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
  "request_id": "87504d99-7e40-42be-92c3-0db84f2a56e9",
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
  "request_id": "9e2c4c99-3290-4de9-84ab-b0c566b9d1a5",
  "message": "No result came back this time and nothing was charged; retry shortly",
  "message_zh": "这次没有取到结果，没有扣费，可以稍后重试",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

这份录制的返回：平台原始 JSON 544 token，DataXAPI 的 JSON 294 token，AI 通过 DataXAPI 的 MCP 读到 242 token，少 56%（2026-11-06 统计）。

[这份示例的 JSON 文件](https://dataxapi.com/apis/douyin/index/creators/metrics.example.json)

## 在你的 AI 里用它

`dataxapi setup` 给这台电脑上的 AI 代理（Claude Code、Codex、Cursor）装好 DataXAPI 的 MCP 服务和基础技能。Key 从环境变量 DATAXAPI_API_KEY 读，不写进任何文件。

MCP 服务地址：`https://api.dataxapi.com/mcp`。你的客户端要填的配置在本页请求示例的“MCP”页签里；接好后让你的 AI 调用 `douyin.index.creators.metrics`。

或者把这段话贴给任意一个 AI：

> 读一下 https://dataxapi.com/zh/apis/douyin/index/creators/metrics.md，然后帮我用 DataXAPI 的接口 douyin.index.creators.metrics（抖音巨量算数达人核心指标）。

[在 ChatGPT 里打开](https://chatgpt.com/?q=%E8%AF%BB%E4%B8%80%E4%B8%8B%20https%3A%2F%2Fdataxapi.com%2Fzh%2Fapis%2Fdouyin%2Findex%2Fcreators%2Fmetrics.md%EF%BC%8C%E7%84%B6%E5%90%8E%E5%B8%AE%E6%88%91%E7%94%A8%20DataXAPI%20%E7%9A%84%E6%8E%A5%E5%8F%A3%20douyin.index.creators.metrics%EF%BC%88%E6%8A%96%E9%9F%B3%E5%B7%A8%E9%87%8F%E7%AE%97%E6%95%B0%E8%BE%BE%E4%BA%BA%E6%A0%B8%E5%BF%83%E6%8C%87%E6%A0%87%EF%BC%89%E3%80%82) · [在 Claude 里打开](https://claude.ai/new?q=%E8%AF%BB%E4%B8%80%E4%B8%8B%20https%3A%2F%2Fdataxapi.com%2Fzh%2Fapis%2Fdouyin%2Findex%2Fcreators%2Fmetrics.md%EF%BC%8C%E7%84%B6%E5%90%8E%E5%B8%AE%E6%88%91%E7%94%A8%20DataXAPI%20%E7%9A%84%E6%8E%A5%E5%8F%A3%20douyin.index.creators.metrics%EF%BC%88%E6%8A%96%E9%9F%B3%E5%B7%A8%E9%87%8F%E7%AE%97%E6%95%B0%E8%BE%BE%E4%BA%BA%E6%A0%B8%E5%BF%83%E6%8C%87%E6%A0%87%EF%BC%89%E3%80%82)

## 相关

这是 DataXAPI 达人数据的一部分。同一把 Key 还能用：社交媒体、广告、电商。

抖音巨量算数的接口：[抖音巨量算数品牌指数趋势](https://dataxapi.com/zh/apis/douyin/index/brands/history/)、[抖音巨量算数品牌指数对比](https://dataxapi.com/zh/apis/douyin/index/brands/metrics/)、[抖音巨量算数达人热门视频](https://dataxapi.com/zh/apis/douyin/index/creators/videos/list/)、[抖音巨量算数达人粉丝画像](https://dataxapi.com/zh/apis/douyin/index/creators/audience/get/)、[抖音巨量算数达人核心指标](https://dataxapi.com/zh/apis/douyin/index/creators/metrics/)、[抖音巨量算数关键词人群画像](https://dataxapi.com/zh/apis/douyin/index/keywords/audience/get/)、[抖音巨量算数关键词热度趋势](https://dataxapi.com/zh/apis/douyin/index/keywords/history/)、[抖音巨量算数关联词](https://dataxapi.com/zh/apis/douyin/index/keywords/related/)、[抖音巨量算数实时热点](https://dataxapi.com/zh/apis/douyin/index/trends/list/)、[抖音巨量算数关键词热门视频](https://dataxapi.com/zh/apis/douyin/index/videos/search/)

抖音的接口：[抖音评论回复](https://dataxapi.com/zh/apis/douyin/comments/replies/list/)、[抖音话题视频](https://dataxapi.com/zh/apis/douyin/hashtags/videos/list/)、[抖音热榜](https://dataxapi.com/zh/apis/douyin/trends/list/)、[抖音用户资料](https://dataxapi.com/zh/apis/douyin/users/get/)、[抖音达人互动与粉丝趋势](https://dataxapi.com/zh/apis/douyin/users/history/)、[抖音用户搜索](https://dataxapi.com/zh/apis/douyin/users/search/)、[抖音用户视频](https://dataxapi.com/zh/apis/douyin/users/videos/list/)、[抖音视频评论](https://dataxapi.com/zh/apis/douyin/videos/comments/list/)、[抖音视频详情](https://dataxapi.com/zh/apis/douyin/videos/get/)、[抖音视频转文字（文案提取、逐字稿）](https://dataxapi.com/zh/apis/douyin/videos/transcript/get/)、[抖音视频播放量](https://dataxapi.com/zh/apis/douyin/videos/metrics/)、[抖音相关视频](https://dataxapi.com/zh/apis/douyin/videos/related/)、[抖音视频搜索](https://dataxapi.com/zh/apis/douyin/videos/search/)、[抖音视频榜](https://dataxapi.com/zh/apis/douyin/videos/trending/)、[抖音搜索框联想词](https://dataxapi.com/zh/apis/douyin/keywords/related/)、[抖音无水印视频和图片下载地址](https://dataxapi.com/zh/apis/douyin/videos/media/get/)、[抖音音乐详情（背景音乐 MP3 和使用人数）](https://dataxapi.com/zh/apis/douyin/music/get/)、[抖音用户视频（备用版）](https://dataxapi.com/zh/apis/douyin/backup/users/videos/list/)、[抖音视频搜索（备用版）](https://dataxapi.com/zh/apis/douyin/backup/videos/search/)

抖音星图的接口：[抖音星图达人商业报价](https://dataxapi.com/zh/apis/douyin/xingtu/creators/rates/get/)、[抖音星图达人搜索](https://dataxapi.com/zh/apis/douyin/xingtu/creators/search/)、[抖音星图达人资料](https://dataxapi.com/zh/apis/douyin/xingtu/creators/get/)、[抖音星图达人粉丝画像](https://dataxapi.com/zh/apis/douyin/xingtu/creators/audience/get/)、[抖音星图达人传播数据](https://dataxapi.com/zh/apis/douyin/xingtu/creators/metrics/)、[抖音星图达人作品表现](https://dataxapi.com/zh/apis/douyin/xingtu/creators/videos/list/)、[抖音星图达人内容热词](https://dataxapi.com/zh/apis/douyin/xingtu/creators/keywords/get/)、[抖音星图达人星图指数](https://dataxapi.com/zh/apis/douyin/xingtu/creators/scores/get/)、[抖音星图达人内容分布](https://dataxapi.com/zh/apis/douyin/xingtu/creators/content_mix/get/)、[抖音星图达人转化能力](https://dataxapi.com/zh/apis/douyin/xingtu/creators/conversion/get/)、[抖音星图营销活动日历](https://dataxapi.com/zh/apis/douyin/xingtu/campaigns/list/)、[抖音星图视频数据报告（播放量、完播率）](https://dataxapi.com/zh/apis/douyin/xingtu/videos/get/)、[抖音星图达人粉丝画像（备用版）](https://dataxapi.com/zh/apis/douyin/xingtu/backup/creators/audience/get/)

怎么做和常见问题：[抖音 sec_uid 是什么？和 uid、抖音号有什么区别？](https://dataxapi.com/zh/answers/douyin-sec-uid/)、[抖音 sec_uid 怎么转 uid，uid 怎么转回 sec_uid（2026）](https://dataxapi.com/zh/answers/douyin-sec-uid-to-uid/)

相关：[抖音巨量算数的全部接口](https://dataxapi.com/zh/apis/douyin/index/)、[抖音的全部接口](https://dataxapi.com/zh/apis/douyin/)、[达人数据](https://dataxapi.com/zh/categories/creator/)、[巨量算数达人核心指标对象的字段](https://dataxapi.com/zh/docs/objects/index_creator_metrics/)

## 常见问题

### 抖音巨量算数达人核心指标 API 多少钱？

$0.0020 一次。单次最高扣费 $0.0020。

### 什么情况下不收费？

出错和超时不收费。

### 对象不存在会怎样？

返回 404 not_found。报错里的 charged 和 amount 写明这次扣了多少。reason 写明是哪一种：not_found（不存在）或 private_or_deleted（私密或已删除）。

---

最后核对于 2026-11-28 06:28 UTC。目录修订号 ceced48b38f71468。 [网页版](https://dataxapi.com/zh/apis/douyin/index/creators/metrics/)
