# 抖音视频搜索 API

按搜索词取一页抖音视频，可按最新或最多点赞排序、按发布时间筛选：文案、作者及粉丝数、互动数。每次约 8 条，最多 20 条；$0.0200 一次。出错和超时不收费。

- 地址：`GET https://api.dataxapi.com/v1/douyin/videos/search`
- 编号：`douyin.videos.search`
- 也叫：抖音搜视频、抖音关键词搜索、抖音综合搜索
- 价格：$0.0200 / 次
- 当前状态不写在这一页上（页面是快照），实时读：`GET https://api.dataxapi.com/v1/catalog/status`
- 返回：每页最多 20 条, 一页，带翻下一页的游标
- 返回标准的内容结构，各平台相同
- [在 Playground 里跑一次](https://dataxapi.com/zh/console/playground/?capability=douyin.videos.search&params=%7B%22query%22%3A%22%E9%9C%B2%E8%90%A5%22%7D)
- 英文名：[Douyin video search API](https://dataxapi.com/apis/douyin/videos/search/)

## 能拿到什么

2026-10-12 19:01 UTC 录下的真实返回，这里是前 8 行。

| 字段 | 值 |
| --- | --- |
| type | video |
| lang | zh |
| published_at | 2026-09-11 01:32 UTC |
| author.followers | 2,525 |
| metrics.likes | 96,505 |
| metrics.comments | 2,219 |
| metrics.shares | 60,467 |
| metrics.favorites | 7,038 |

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `query` | 文本 | 是 | 搜索词。示例：`露营`。 |
| `sort` | 文本 |  | 排序：综合、最新发布、最多点赞。最多点赞配一天内时，抖音不支持这一组合，返回的是一天内的结果在每一页内按点赞排序。取值：`relevance`（默认）、`latest`、`popular`。示例：`relevance`。 |
| `published_within` | 文本 |  | 只要最近一天、一周或半年内发布的；不写是不限。取值：`day`、`week`、`half_year`。示例：`week`。 |
| `cursor` | 文本 |  | 上一页返回的游标。把上一页的 `page.next_cursor` 原样带上。每翻一页按一次调用收费。 |
| `view` | 文本 |  | 返回档位。三档价格相同。取值：`compact`、`standard`（默认）、`full`。 |
| `fields` | 文本列表 |  | 只要这些字段。按路径写，例如 `author.name`。 |

## 返回字段

`data.items` 是内容对象的列表。稳定：字段只增不改。

返回分三档：精简 `compact`（最常用的字段，长文本截短）、标准 `standard`（默认，全部标准字段）、完整 `full`（再加 `ext`，也就是这个平台特有的字段）。字段从表里写的那一档起出现，更大的档位也带。

| 字段 | 类型 | 说明 | 起始档位 | 这个接口 |
| --- | --- | --- | --- | --- |
| `id` | 文本 | 编号，可原样传给取详情的接口。 | `compact` | 有 |
| `url` | 链接 | 能直接打开的链接。 | `compact` | 有 |
| `type` | 文本 | 内容形态。取值：`video`、`image`、`text`、`article`。 | `compact` | 有 |
| `title` | 文本 | 标题。 | `compact` | 有 |
| `text` | 文本 | 正文。长文本：精简档只保留前 500 个字符，并在 `warnings` 里写明。 | `compact` | 有 |
| `lang` | 文本 | 正文的语言。 | `standard` | 有 |
| `published_at` | 时间 | 发布时间。 | `compact` | 有 |
| `author` | 对象 | 作者。 | `compact` | 有 |
| `author.id` | 文本 | 作者的账号编号。 | `compact` | 有 |
| `author.username` | 文本 | 作者的账号名。 | `compact` | 有 |
| `author.name` | 文本 | 作者的显示名。 | `compact` | 有 |
| `author.avatar_url` | 链接 | 作者头像。 | `standard` | 有 |
| `author.verified` | 是否 | 作者是否认证。 | `standard` | 这个接口不提供 |
| `author.followers` | 整数 | 作者的粉丝数。 | `standard` | 可能没有 |
| `metrics` | 对象 | 互动数。 | `compact` | 有 |
| `metrics.likes` | 整数 | 点赞数。 | `compact` | 有 |
| `metrics.comments` | 整数 | 评论数。 | `compact` | 有 |
| `metrics.shares` | 整数 | 分享数。 | `compact` | 有 |
| `metrics.favorites` | 整数 | 收藏数。 | `compact` | 有 |
| `metrics.views` | 整数 | 播放或阅读数。 | `compact` | 这个接口不提供 |
| `metrics.reposts` | 整数 | 转发数。 | `compact` | 平台没有 |
| `images` | 链接列表 | 图片地址。 | `standard` | 有 |
| `hashtags` | 文本列表 | 话题标签，不带 #。 | `standard` | 有 |
| `mentions` | 对象列表 | 正文里提及的账号。 | `standard` | 这个接口不提供 |
| `mentions[].id` | 文本 | 账号编号。 | `standard` | 这个接口不提供 |
| `mentions[].username` | 文本 | 账号名。 | `standard` | 这个接口不提供 |
| `mentions[].name` | 文本 | 显示名。 | `standard` | 这个接口不提供 |
| `is_pinned` | 是否 | 是否被作者置顶。 | `standard` | 这个接口不提供 |
| `post_id` | 文本 | 它回复的那条内容所在的主帖编号；不是回复则为 null。 | `compact` | 平台没有 |
| `parent_id` | 文本 | 它直接回复的那一条的编号；不是回复则为 null。 | `compact` | 平台没有 |
| `root_id` | 文本 | 所在回复串里第一层那一条的编号。 | `compact` | 平台没有 |
| `ext.duration` | 数字 | 视频时长，秒；图文作品没有。 | `full` | 有 |
| `ext.cover_url` | 链接 | 封面图地址。 | `full` | 有 |
| `ext.video_url` | 链接 | 视频播放地址：平台签过名的地址，会过期，拿到后尽快用；图文作品没有。 | `full` | 有 |
| `ext.categories` | 文本列表 | 平台给这条内容的分类，从一级到三级，平台的原话，如 ["美食", "美食教程", "饮品教程"]；平台没分类时为 null。 | `full` | 有 |
| `approximate` | 对象列表 | 这一条里哪些数是约数或下限；都是准确值时不出现。 | `compact` | 有 |
| `approximate[].field` | 文本 | 字段的路径，如 metrics.views。 | `compact` | 有 |
| `approximate[].kind` | 文本 | 约数，还是下限。取值：`approximate`、`lower_bound`。 | `compact` | 有 |

某一条本来就没有这个值时，字段给 `null`。这个接口给不了的字段不出现，统一列在 `meta.unavailable`。

带 `query`, `sort=relevance` 时：`author.followers` 可能没有；每次返回的 `meta.unavailable` 写明这一次给不了哪些。

带 `query`, `sort=relevance`, `published_within=day` 时：`author.followers` 可能没有；每次返回的 `meta.unavailable` 写明这一次给不了哪些。

带 `query`, `sort=relevance`, `published_within=week` 时：`author.followers` 可能没有；每次返回的 `meta.unavailable` 写明这一次给不了哪些。

带 `query`, `sort=relevance`, `published_within=half_year` 时：`author.followers` 可能没有；每次返回的 `meta.unavailable` 写明这一次给不了哪些。

带 `query`, `sort=latest` 时：`author.followers` 可能没有；每次返回的 `meta.unavailable` 写明这一次给不了哪些。

带 `query`, `sort=latest`, `published_within=day` 时：`author.followers` 可能没有；每次返回的 `meta.unavailable` 写明这一次给不了哪些。

带 `query`, `sort=latest`, `published_within=week` 时：`author.followers` 可能没有；每次返回的 `meta.unavailable` 写明这一次给不了哪些。

带 `query`, `sort=latest`, `published_within=half_year` 时：`author.followers` 可能没有；每次返回的 `meta.unavailable` 写明这一次给不了哪些。

带 `query`, `sort=popular` 时：`author.followers` 可能没有；每次返回的 `meta.unavailable` 写明这一次给不了哪些。

带 `query`, `sort=popular`, `published_within=day` 时：`author.followers` 可能没有；每次返回的 `meta.unavailable` 写明这一次给不了哪些。

带 `query`, `sort=popular`, `published_within=week` 时：`author.followers` 可能没有；每次返回的 `meta.unavailable` 写明这一次给不了哪些。

带 `query`, `sort=popular`, `published_within=half_year` 时：`author.followers` 可能没有；每次返回的 `meta.unavailable` 写明这一次给不了哪些。

每条数据的典型体积：`compact` 570 B、`standard` 826 B、`full` 1.7 KB（按 2026-10-12 19:01 UTC 录下的那次返回量的）。

## 翻页

每页约 8 条，最多 20 条。每页条数由平台决定，不收 `limit`。

取下一页时把 `page.next_cursor` 作为 `cursor` 带上；游标有效期 1 小时。最后一页的 `page.has_more` 是 false。

## 什么时候收费

| 情况 | 收费 |
| --- | --- |
| 返回了数据 | $0.0200，每次调用收一次 |
| 每翻一页 | 按一次调用另收 |
| 参数不合法、出错、超时 | 不收费 |
| 单次最高扣费 | $0.0200 (带 `X-Max-Price` 可以设自己的上限，超过就不执行) |

价格读取于 2026-11-20 07:17 UTC，按价目版本 19，2026-11-17 18:04 UTC 起生效；在 Playground 里运行前会再读一次当前价格。

## 常见报错

所有报错都是同一个结构：`code`、`message`、`charged`、`retry`、`retry_after_seconds`、`param`、`docs_url`。

这个接口取不到数据时（出错、超时或接口暂停），可以改调它的备用版：参数和返回相同，$0.0300 一次；这时报错里的 `alternative` 会写明。重试请换一个新的幂等键： [抖音视频搜索（备用版）API](https://dataxapi.com/zh/apis/douyin/backup/videos/search/)

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
curl -G "https://api.dataxapi.com/v1/douyin/videos/search" \
  --data-urlencode "query=露营" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
# pip install dataxapi
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.douyin.videos.search(query="露营")
print(result["data"]["items"])
```

### TypeScript

```typescript
// npm i @dataxapi/sdk
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.douyin.videos.search({ query: "露营" });
console.log(result.data.items);
```

### 命令行

```bash
dataxapi call douyin.videos.search 'query=露营'
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

把这段加进你的 MCP 客户端，然后让你的 AI 调用 `douyin.videos.search`。

## 返回

### 200

取自 2026-10-12 19:01 UTC 录下的真实返回。名字、正文和编号是示例，链接也是，都不是录到的原文（页面不展示任何人的个人信息）；数字是原样。长列表做了截断。请求号、游标和余额是示意。

返回大小：标准档 6.3 KB（精简 4.5 KB，完整 12.5 KB）。

```jsonc
{
  "code": "ok",
  "request_id": "c4c779e7-8730-415a-ab8b-2439d70fb51a",
  "data": {
    "items": [
      {
        "id": "7732320280216651754",
        "url": "https://www.douyin.com/video/7732320280216651754",
        "type": "video",
        "title": null,
        "text": "周末的露营日常，随手记录一下",
        "lang": "zh",
        "published_at": "2026-09-11T01:32:11.000Z",
        "author": {
          "id": "MS4wLjABAAAAWo9vAvyTzp3sb2-krZmkriyZuGbWt-p4togQvkClUpj",
          "username": "weekend_lin",
          "name": "小林的周末",
          "avatar_url": "https://p3-pc.douyinpic.com/aweme/100x100/aweme-avatar/tos-cn-avt-0015_ec931a72ca043f30fa7e.jpeg",
          "followers": 2525
        },
        "metrics": {
          "likes": 96505,
          "comments": 2219,
          "shares": 60467,
          "favorites": 7038
        },
        "images": null,
        "hashtags": ["户外生活", "好物分享"]
      },
      // … 另有 6 条
    ]
  },
  "page": {
    "next_cursor": "c1.ts-YHxldZuVXCxH6Gev5iQGlxtlGILU8V8n9tjjp",
    "cursor_expires_at": "2026-10-12T20:01:55.000Z",
    "has_more": true,
    "returned": 7
  },
  "warnings": [],
  "meta": {
    "capability": "douyin.videos.search",
    "result_status": "complete",
    "fetched_at": "2026-10-12T19:01:55.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "metrics.views": "capability",
      "metrics.reposts": "platform",
      "author.verified": "capability",
      "mentions": "capability",
      "post_id": "platform",
      "parent_id": "platform",
      "root_id": "platform",
      "is_pinned": "capability"
    },
    "billing": {
      "amount": "0.02",
      "currency": "USD",
      "balance_after": "9.98"
    }
  }
}
```

### 空结果

取自 2026-10-12 19:01 UTC 的录制，为演示这种情况人工改过。请求号和余额是示意。

返回大小：标准档 605 B（精简 605 B，完整 605 B）。

```jsonc
{
  "code": "ok",
  "request_id": "151c9fde-5ad5-4873-a657-ffd3b2c55e92",
  "data": { "items": [] },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 0
  },
  "warnings": [],
  "meta": {
    "capability": "douyin.videos.search",
    "result_status": "empty",
    "fetched_at": "2026-10-12T19:01:55.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "metrics.views": "capability",
      "metrics.reposts": "platform",
      "author.verified": "capability",
      "mentions": "capability",
      "post_id": "platform",
      "parent_id": "platform",
      "root_id": "platform",
      "is_pinned": "capability"
    },
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
  "request_id": "03ff01a5-e70b-475b-b653-ff53e31ef2a7",
  "message": "A parameter is invalid",
  "message_zh": "参数不合法",
  "charged": false,
  "retry": "after_fix",
  "retry_after_seconds": null,
  "param": null,
  "problems": ["query is required"],
  "docs_url": "https://dataxapi.com/docs/errors#invalid_params"
}
```

### 402

按规范写的示例，不是录下的返回。

```json
{
  "code": "insufficient_balance",
  "request_id": "06774065-9ad2-4720-8172-2a419b482fe5",
  "message": "The balance is too low",
  "message_zh": "余额不足",
  "charged": false,
  "retry": "after_fix",
  "retry_after_seconds": null,
  "param": null,
  "required": "0.02",
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
  "request_id": "0cd0ee01-ff3c-4ff3-a746-c690689f6c9d",
  "message": "No result came back this time and nothing was charged; retry shortly",
  "message_zh": "这次没有取到结果，没有扣费，可以稍后重试",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

这份录制的返回：平台原始 JSON 18.7 万 token，DataXAPI 的 JSON 2,329 token，AI 通过 DataXAPI 的 MCP 读到 1,622 token，少 99%（2026-11-06 统计）。

[这份示例的 JSON 文件](https://dataxapi.com/apis/douyin/videos/search.example.json)

## 在你的 AI 里用它

`dataxapi setup` 给这台电脑上的 AI 代理（Claude Code、Codex、Cursor）装好 DataXAPI 的 MCP 服务和基础技能。Key 从环境变量 DATAXAPI_API_KEY 读，不写进任何文件。

MCP 服务地址：`https://api.dataxapi.com/mcp`。你的客户端要填的配置在本页请求示例的“MCP”页签里；接好后让你的 AI 调用 `douyin.videos.search`。

或者把这段话贴给任意一个 AI：

> 读一下 https://dataxapi.com/zh/apis/douyin/videos/search.md，然后帮我用 DataXAPI 的接口 douyin.videos.search（抖音视频搜索）。

[在 ChatGPT 里打开](https://chatgpt.com/?q=%E8%AF%BB%E4%B8%80%E4%B8%8B%20https%3A%2F%2Fdataxapi.com%2Fzh%2Fapis%2Fdouyin%2Fvideos%2Fsearch.md%EF%BC%8C%E7%84%B6%E5%90%8E%E5%B8%AE%E6%88%91%E7%94%A8%20DataXAPI%20%E7%9A%84%E6%8E%A5%E5%8F%A3%20douyin.videos.search%EF%BC%88%E6%8A%96%E9%9F%B3%E8%A7%86%E9%A2%91%E6%90%9C%E7%B4%A2%EF%BC%89%E3%80%82) · [在 Claude 里打开](https://claude.ai/new?q=%E8%AF%BB%E4%B8%80%E4%B8%8B%20https%3A%2F%2Fdataxapi.com%2Fzh%2Fapis%2Fdouyin%2Fvideos%2Fsearch.md%EF%BC%8C%E7%84%B6%E5%90%8E%E5%B8%AE%E6%88%91%E7%94%A8%20DataXAPI%20%E7%9A%84%E6%8E%A5%E5%8F%A3%20douyin.videos.search%EF%BC%88%E6%8A%96%E9%9F%B3%E8%A7%86%E9%A2%91%E6%90%9C%E7%B4%A2%EF%BC%89%E3%80%82)

## 相关

这是 DataXAPI 社交媒体数据的一部分。同一把 Key 还能用：达人、广告、电商。

同一件事的其他平台：[B站视频搜索](https://dataxapi.com/zh/apis/bilibili/videos/search/)、[快手视频搜索](https://dataxapi.com/zh/apis/kuaishou/videos/search/)、[LinkedIn 帖子搜索](https://dataxapi.com/zh/apis/linkedin/posts/search/)、[Threads 帖子搜索](https://dataxapi.com/zh/apis/threads/posts/search/)、[TikTok 视频搜索](https://dataxapi.com/zh/apis/tiktok/videos/search/)、[微博实时搜索](https://dataxapi.com/zh/apis/weibo/posts/search/)、[X 帖子搜索](https://dataxapi.com/zh/apis/x/posts/search/)、[小红书笔记搜索](https://dataxapi.com/zh/apis/xiaohongshu/notes/search/)、[YouTube 视频搜索](https://dataxapi.com/zh/apis/youtube/videos/search/)、[微信搜一搜视频号视频搜索](https://dataxapi.com/zh/apis/wechat_channels/videos/search/)、[微信搜一搜综合搜索](https://dataxapi.com/zh/apis/wechat/posts/search/)、[微信搜一搜综合搜索（备用版）](https://dataxapi.com/zh/apis/wechat/backup/posts/search/)、[微信搜一搜视频号视频搜索（备用版）](https://dataxapi.com/zh/apis/wechat_channels/backup/videos/search/)、[Reddit 帖子搜索](https://dataxapi.com/zh/apis/reddit/posts/search/)、[知乎内容搜索](https://dataxapi.com/zh/apis/zhihu/posts/search/)、[Pinterest 图钉搜索](https://dataxapi.com/zh/apis/pinterest/pins/search/)、[抖音视频搜索（备用版）](https://dataxapi.com/zh/apis/douyin/backup/videos/search/)

抖音的接口：[抖音评论回复](https://dataxapi.com/zh/apis/douyin/comments/replies/list/)、[抖音话题视频](https://dataxapi.com/zh/apis/douyin/hashtags/videos/list/)、[抖音热榜](https://dataxapi.com/zh/apis/douyin/trends/list/)、[抖音用户资料](https://dataxapi.com/zh/apis/douyin/users/get/)、[抖音达人互动与粉丝趋势](https://dataxapi.com/zh/apis/douyin/users/history/)、[抖音用户搜索](https://dataxapi.com/zh/apis/douyin/users/search/)、[抖音用户视频](https://dataxapi.com/zh/apis/douyin/users/videos/list/)、[抖音视频评论](https://dataxapi.com/zh/apis/douyin/videos/comments/list/)、[抖音视频详情](https://dataxapi.com/zh/apis/douyin/videos/get/)、[抖音视频播放量](https://dataxapi.com/zh/apis/douyin/videos/metrics/)、[抖音相关视频](https://dataxapi.com/zh/apis/douyin/videos/related/)、[抖音视频搜索](https://dataxapi.com/zh/apis/douyin/videos/search/)、[抖音视频榜](https://dataxapi.com/zh/apis/douyin/videos/trending/)、[抖音搜索框联想词](https://dataxapi.com/zh/apis/douyin/keywords/related/)、[抖音用户视频（备用版）](https://dataxapi.com/zh/apis/douyin/backup/users/videos/list/)、[抖音视频搜索（备用版）](https://dataxapi.com/zh/apis/douyin/backup/videos/search/)

抖音巨量算数的接口：[抖音巨量算数品牌指数趋势](https://dataxapi.com/zh/apis/douyin/index/brands/history/)、[抖音巨量算数品牌指数对比](https://dataxapi.com/zh/apis/douyin/index/brands/metrics/)、[抖音巨量算数达人热门视频](https://dataxapi.com/zh/apis/douyin/index/creators/videos/list/)、[抖音巨量算数达人粉丝画像](https://dataxapi.com/zh/apis/douyin/index/creators/audience/get/)、[抖音巨量算数达人核心指标](https://dataxapi.com/zh/apis/douyin/index/creators/metrics/)、[抖音巨量算数关键词人群画像](https://dataxapi.com/zh/apis/douyin/index/keywords/audience/get/)、[抖音巨量算数关键词热度趋势](https://dataxapi.com/zh/apis/douyin/index/keywords/history/)、[抖音巨量算数关联词](https://dataxapi.com/zh/apis/douyin/index/keywords/related/)、[抖音巨量算数实时热点](https://dataxapi.com/zh/apis/douyin/index/trends/list/)、[抖音巨量算数关键词热门视频](https://dataxapi.com/zh/apis/douyin/index/videos/search/)

抖音星图的接口：[抖音星图达人商业报价](https://dataxapi.com/zh/apis/douyin/xingtu/creators/rates/get/)、[抖音星图达人搜索](https://dataxapi.com/zh/apis/douyin/xingtu/creators/search/)、[抖音星图达人资料](https://dataxapi.com/zh/apis/douyin/xingtu/creators/get/)、[抖音星图达人粉丝画像](https://dataxapi.com/zh/apis/douyin/xingtu/creators/audience/get/)、[抖音星图达人传播数据](https://dataxapi.com/zh/apis/douyin/xingtu/creators/metrics/)、[抖音星图达人作品表现](https://dataxapi.com/zh/apis/douyin/xingtu/creators/videos/list/)、[抖音星图达人内容热词](https://dataxapi.com/zh/apis/douyin/xingtu/creators/keywords/get/)、[抖音星图达人星图指数](https://dataxapi.com/zh/apis/douyin/xingtu/creators/scores/get/)、[抖音星图达人内容分布](https://dataxapi.com/zh/apis/douyin/xingtu/creators/content_mix/get/)、[抖音星图达人转化能力](https://dataxapi.com/zh/apis/douyin/xingtu/creators/conversion/get/)、[抖音星图营销活动日历](https://dataxapi.com/zh/apis/douyin/xingtu/campaigns/list/)、[抖音星图视频数据报告（播放量、完播率）](https://dataxapi.com/zh/apis/douyin/xingtu/videos/get/)

怎么做和常见问题：[如何批量导出抖音视频评论](https://dataxapi.com/zh/guides/douyin-video-comments/)、[抖音有 API 吗？用 Python 拉取视频和评论（2026）](https://dataxapi.com/zh/guides/douyin-api-python/)、[抖音数据怎么导出？](https://dataxapi.com/zh/answers/export-douyin-data/)、[抖音开放平台能查别人的视频和评论吗（2026）](https://dataxapi.com/zh/answers/douyin-open-platform-api/)、[DataXAPI 和阿里的 DataX 是一回事吗（2026）](https://dataxapi.com/zh/answers/dataxapi-is-not-datax/)、[小红书 Skill、抖音 Skill 怎么接（2026）](https://dataxapi.com/zh/answers/xiaohongshu-douyin-skill/)、[抖音评论怎么批量导出，挖用户需求（2026）](https://dataxapi.com/zh/answers/export-douyin-comments-user-needs/)、[BettaFish 没有数据怎么办：怎么接小红书、抖音的公开数据（2026）](https://dataxapi.com/zh/answers/bettafish-data-source/)、[蝉妈妈、千瓜、新榜有 API 吗？想要原始数据怎么办（2026）](https://dataxapi.com/zh/answers/chanmama-qiangua-newrank-api/)、[抖音低粉爆款怎么找？能批量拉吗（2026）](https://dataxapi.com/zh/answers/douyin-low-fan-viral-videos/)、[用第三方接口采集小红书、抖音的公开数据合法吗（2026）](https://dataxapi.com/zh/answers/is-public-social-data-collection-legal/)、[抖音 a_bogus 和 x-bogus 是什么（2026）](https://dataxapi.com/zh/answers/douyin-a-bogus-x-bogus/)、[抖音 msToken 是什么（2026）](https://dataxapi.com/zh/answers/douyin-mstoken/)、[用数据接口会封我的小红书、抖音账号吗（2026）](https://dataxapi.com/zh/answers/will-data-api-get-my-account-banned/)、[DataXAPI 这类数据接口合规吗（2026）](https://dataxapi.com/zh/answers/is-dataxapi-compliant/)、[DataXAPI 可靠吗、靠谱吗？能自己核对的事实（2026）](https://dataxapi.com/zh/answers/is-dataxapi-reliable/)、[抖音接口怎么选：搜索、账号、评论各用哪个（2026）](https://dataxapi.com/zh/answers/which-douyin-api-to-use/)、[抖音热点数据怎么用程序拉（2026）](https://dataxapi.com/zh/answers/douyin-hot-topics-by-program/)、[抖音 ttwid 是什么（2026）](https://dataxapi.com/zh/answers/douyin-ttwid/)、[抖音数据接口有哪些？第三方接口和开放平台的区别，能取什么（2026）](https://dataxapi.com/zh/answers/douyin-third-party-data-apis/)、[抖音 MCP：在 Claude、Cursor 里查抖音视频和评论（2026）](https://dataxapi.com/zh/answers/douyin-mcp/)、[一个 Key 调小红书、抖音、公众号：社媒数据 API 聚合怎么选（2026）](https://dataxapi.com/zh/answers/one-key-china-social-data-api/)、[中文社媒品牌监测怎么做？微博、抖音、小红书一起查（2026）](https://dataxapi.com/zh/answers/chinese-social-media-brand-monitoring/)、[用户口碑怎么批量取？小红书、抖音评论和电商评价（2026）](https://dataxapi.com/zh/answers/product-reviews-chinese-social-media/)、[舆情监控 API 有哪些？一个关键词同时查微博、抖音、小红书等平台（2026）](https://dataxapi.com/zh/answers/social-listening-api-china/)、[社媒数据接口常见问题：按平台说清能取什么、不能取什么（2026）](https://dataxapi.com/zh/answers/social-media-data-api-faq/)、[哪个社媒数据接口最适合接给 AI？看一次返回占多少 token（2026）](https://dataxapi.com/zh/answers/social-media-api-for-ai-agents/)、[社媒接口返回太长，AI 上下文被塞满、token 烧得快怎么办？](https://dataxapi.com/zh/answers/api-response-too-many-tokens/)、[在 Claude Code、Codex 里怎么取抖音、公众号、小红书数据？（2026）](https://dataxapi.com/zh/answers/claude-code-codex-china-social-data/)、[社媒数据接口给 AI 用要多少 token？每个接口逐个实测（2026）](https://dataxapi.com/zh/answers/social-media-api-token-benchmark/)、[给 AI 和 agent 用的抖音数据接口：返回省 token、Claude 和 Cursor 直接调（2026）](https://dataxapi.com/zh/answers/douyin-api-for-ai-agents/)、[抖音视频的播放地址（下载链接）怎么用 API 拿到？（2026）](https://dataxapi.com/zh/answers/douyin-video-play-url-api/)

用到这个接口的 Skills：[关键词搜索与提及](https://dataxapi.com/zh/skills/mentions/)

相关：[抖音的全部接口](https://dataxapi.com/zh/apis/douyin/)、[社交媒体数据](https://dataxapi.com/zh/categories/social/)、[这件事在 15 个平台上的对照](https://dataxapi.com/zh/roles/posts-search/)、[内容对象的字段](https://dataxapi.com/zh/docs/objects/post/)

## 常见问题

### 抖音视频搜索 API 多少钱？

$0.0200 一次。单次最高扣费 $0.0200。

### 什么情况下不收费？

出错和超时不收费。

### 一次返回多少条？怎么翻页？

每页约 8 条，最多 20 条。每页条数由平台决定，不收 limit。取下一页时把 page.next_cursor 作为 cursor 带上；游标有效期 1 小时。最后一页的 page.has_more 是 false。

---

最后核对于 2026-11-20 07:17 UTC。目录修订号 720fc3ea8dadb865。 [网页版](https://dataxapi.com/zh/apis/douyin/videos/search/)
