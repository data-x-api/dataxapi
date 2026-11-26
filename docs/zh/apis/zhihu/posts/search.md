# 知乎内容搜索 API

按搜索词取一页知乎的回答和文章，可只要其中一种，可按相关、最新或最多赞同排。每次约 18 条，最多 20 条；$0.0020 一次。出错和超时不收费。

- 地址：`GET https://api.dataxapi.com/v1/zhihu/posts/search`
- 编号：`zhihu.posts.search`
- 也叫：搜知乎、知乎搜索回答
- 价格：$0.0020 / 次
- 当前状态不写在这一页上（页面是快照），实时读：`GET https://api.dataxapi.com/v1/catalog/status`
- 返回：每页最多 20 条, 一页，带翻下一页的游标
- 返回标准的内容结构，各平台相同
- [在 Playground 里跑一次](https://dataxapi.com/zh/console/playground/?capability=zhihu.posts.search&params=%7B%22query%22%3A%22%E5%92%96%E5%95%A1%E6%9C%BA%E6%8E%A8%E8%8D%90%22%7D)
- 英文名：[Zhihu content search API](https://dataxapi.com/apis/zhihu/posts/search/)

## 能拿到什么

2026-10-12 19:18 UTC 录下的真实返回，这里是前 6 行。

| 字段 | 值 |
| --- | --- |
| type | article |
| published_at | 2026-03-03 08:11 UTC |
| author.followers | 10,699 |
| metrics.likes | 224 |
| metrics.comments | 3 |
| metrics.favorites | 0 |

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `query` | 文本 | 是 | 搜索词。示例：`咖啡机推荐`。 |
| `type` | 文本 |  | 只要回答，或只要文章；不写则两种都有。取值：`answer`、`article`。示例：`answer`。 |
| `sort` | 文本 |  | 按相关、最新或最多赞同排。取值：`relevance`（默认）、`latest`、`popular`。示例：`relevance`。 |
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
| `lang` | 文本 | 正文的语言。 | `standard` | 这个接口不提供 |
| `published_at` | 时间 | 发布时间。 | `compact` | 有 |
| `author` | 对象 | 作者。 | `compact` | 有 |
| `author.id` | 文本 | 作者的账号编号。 | `compact` | 有 |
| `author.username` | 文本 | 作者的账号名。 | `compact` | 有 |
| `author.name` | 文本 | 作者的显示名。 | `compact` | 有 |
| `author.avatar_url` | 链接 | 作者头像。 | `standard` | 有 |
| `author.verified` | 是否 | 作者是否认证。 | `standard` | 这个接口不提供 |
| `author.followers` | 整数 | 作者的粉丝数。 | `standard` | 有 |
| `metrics` | 对象 | 互动数。 | `compact` | 有 |
| `metrics.likes` | 整数 | 点赞数。在这个平台上：赞同数。 | `compact` | 有 |
| `metrics.comments` | 整数 | 评论数。 | `compact` | 有 |
| `metrics.shares` | 整数 | 分享数。 | `compact` | 平台没有 |
| `metrics.favorites` | 整数 | 收藏数。 | `compact` | 有 |
| `metrics.views` | 整数 | 播放或阅读数。 | `compact` | 这个接口不提供 |
| `metrics.reposts` | 整数 | 转发数。 | `compact` | 平台没有 |
| `images` | 链接列表 | 图片地址。 | `standard` | 这个接口不提供 |
| `hashtags` | 文本列表 | 话题标签，不带 #。 | `standard` | 这个接口不提供 |
| `mentions` | 对象列表 | 正文里提及的账号。 | `standard` | 这个接口不提供 |
| `mentions[].id` | 文本 | 账号编号。 | `standard` | 这个接口不提供 |
| `mentions[].username` | 文本 | 账号名。 | `standard` | 这个接口不提供 |
| `mentions[].name` | 文本 | 显示名。 | `standard` | 这个接口不提供 |
| `is_pinned` | 是否 | 是否被作者置顶。 | `standard` | 这个接口不提供 |
| `post_id` | 文本 | 它回复的那条内容所在的主帖编号；不是回复则为 null。 | `compact` | 有 |
| `parent_id` | 文本 | 它直接回复的那一条的编号；不是回复则为 null。 | `compact` | 有 |
| `root_id` | 文本 | 所在回复串里第一层那一条的编号。 | `compact` | 平台没有 |
| `approximate` | 对象列表 | 这一条里哪些数是约数或下限；都是准确值时不出现。 | `compact` | 有 |
| `approximate[].field` | 文本 | 字段的路径，如 metrics.views。 | `compact` | 有 |
| `approximate[].kind` | 文本 | 约数，还是下限。取值：`approximate`、`lower_bound`。 | `compact` | 有 |

某一条本来就没有这个值时，字段给 `null`。这个接口给不了的字段不出现，统一列在 `meta.unavailable`。

每条数据的典型体积：`compact` 1.8 KB、`standard` 10.6 KB、`full` 10.6 KB（按 2026-10-12 19:18 UTC 录下的那次返回量的）。

## 翻页

每页约 18 条，最多 20 条。每页条数由平台决定，不收 `limit`。

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
curl -G "https://api.dataxapi.com/v1/zhihu/posts/search" \
  --data-urlencode "query=咖啡机推荐" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
# pip install dataxapi
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.zhihu.posts.search(query="咖啡机推荐")
print(result["data"]["items"])
```

### TypeScript

```typescript
// npm i @dataxapi/sdk
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.zhihu.posts.search({ query: "咖啡机推荐" });
console.log(result.data.items);
```

### 命令行

```bash
dataxapi call zhihu.posts.search 'query=咖啡机推荐'
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

把这段加进你的 MCP 客户端，然后让你的 AI 调用 `zhihu.posts.search`。

## 返回

### 200

取自 2026-10-12 19:18 UTC 录下的真实返回。名字、正文和编号是示例，链接也是，都不是录到的原文（页面不展示任何人的个人信息）；数字是原样。长列表做了截断。请求号、游标和余额是示意。

返回大小：标准档 180.6 KB（精简 31.9 KB，完整 180.6 KB）。

```jsonc
{
  "code": "ok",
  "request_id": "87ee6f95-7dde-47c6-8b04-4ec1594169d0",
  "data": {
    "items": [
      {
        "id": "3250756632",
        "url": "https://www.zhihu.com/answer/3250756632",
        "type": "article",
        "title": "咖啡机推荐入门指南：一篇讲清楚",
        "text": "咖啡机推荐这件事，越简单越好",
        "published_at": "2026-03-03T08:11:12.000Z",
        "author": {
          "id": "cbf102a15e966bc955fc8f2b452b62fa",
          "username": "laozhou_gear",
          "name": "老周说装备",
          "avatar_url": "https://picx.zhimg.com/v2-671ebb705befb9d2492d_l.jpg",
          "followers": 10699
        },
        "metrics": { "likes": 224, "comments": 3, "favorites": 0 },
        "post_id": null,
        "parent_id": null
      },
      // … 另有 16 条
    ]
  },
  "page": {
    "next_cursor": "c1.Km3J8vP9d1xw85c8i-GQVxvJL7XKz0me6b3X34wR",
    "cursor_expires_at": "2026-10-12T20:18:45.000Z",
    "has_more": true,
    "returned": 17
  },
  "warnings": [],
  "meta": {
    "capability": "zhihu.posts.search",
    "result_status": "complete",
    "fetched_at": "2026-10-12T19:18:45.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "lang": "capability",
      "author.verified": "capability",
      "metrics.shares": "platform",
      "metrics.views": "capability",
      "metrics.reposts": "platform",
      "images": "capability",
      "hashtags": "capability",
      "mentions": "capability",
      "is_pinned": "capability",
      "root_id": "platform"
    },
    "billing": {
      "amount": "0.002",
      "currency": "USD",
      "balance_after": "9.998"
    }
  }
}
```

### 空结果

取自 2026-10-12 19:18 UTC 的录制，为演示这种情况人工改过。请求号和余额是示意。

返回大小：标准档 653 B（精简 653 B，完整 653 B）。

```jsonc
{
  "code": "ok",
  "request_id": "15382efd-b6f4-4024-a3f9-7df9b0c9661e",
  "data": { "items": [] },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 0
  },
  "warnings": [],
  "meta": {
    "capability": "zhihu.posts.search",
    "result_status": "empty",
    "fetched_at": "2026-10-12T19:18:45.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "lang": "capability",
      "author.verified": "capability",
      "metrics.shares": "platform",
      "metrics.views": "capability",
      "metrics.reposts": "platform",
      "images": "capability",
      "hashtags": "capability",
      "mentions": "capability",
      "is_pinned": "capability",
      "root_id": "platform"
    },
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
  "request_id": "4cfc2ced-c59a-41ba-b115-459f7013991a",
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
  "request_id": "04eda068-9894-483e-b265-44ea0cd09555",
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
  "request_id": "c67e3684-d92d-4981-843c-41ff2b3bdf1a",
  "message": "No result came back this time and nothing was charged; retry shortly",
  "message_zh": "这次没有取到结果，没有扣费，可以稍后重试",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

这份录制的返回：平台原始 JSON 19.4 万 token，DataXAPI 的 JSON 5.7 万 token，AI 通过 DataXAPI 的 MCP 读到 9,901 token，少 95%（2026-11-06 统计）。

[这份示例的 JSON 文件](https://dataxapi.com/apis/zhihu/posts/search.example.json)

## 在你的 AI 里用它

`dataxapi setup` 给这台电脑上的 AI 代理（Claude Code、Codex、Cursor）装好 DataXAPI 的 MCP 服务和基础技能。Key 从环境变量 DATAXAPI_API_KEY 读，不写进任何文件。

MCP 服务地址：`https://api.dataxapi.com/mcp`。你的客户端要填的配置在本页请求示例的“MCP”页签里；接好后让你的 AI 调用 `zhihu.posts.search`。

或者把这段话贴给任意一个 AI：

> 读一下 https://dataxapi.com/zh/apis/zhihu/posts/search.md，然后帮我用 DataXAPI 的接口 zhihu.posts.search（知乎内容搜索）。

[在 ChatGPT 里打开](https://chatgpt.com/?q=%E8%AF%BB%E4%B8%80%E4%B8%8B%20https%3A%2F%2Fdataxapi.com%2Fzh%2Fapis%2Fzhihu%2Fposts%2Fsearch.md%EF%BC%8C%E7%84%B6%E5%90%8E%E5%B8%AE%E6%88%91%E7%94%A8%20DataXAPI%20%E7%9A%84%E6%8E%A5%E5%8F%A3%20zhihu.posts.search%EF%BC%88%E7%9F%A5%E4%B9%8E%E5%86%85%E5%AE%B9%E6%90%9C%E7%B4%A2%EF%BC%89%E3%80%82) · [在 Claude 里打开](https://claude.ai/new?q=%E8%AF%BB%E4%B8%80%E4%B8%8B%20https%3A%2F%2Fdataxapi.com%2Fzh%2Fapis%2Fzhihu%2Fposts%2Fsearch.md%EF%BC%8C%E7%84%B6%E5%90%8E%E5%B8%AE%E6%88%91%E7%94%A8%20DataXAPI%20%E7%9A%84%E6%8E%A5%E5%8F%A3%20zhihu.posts.search%EF%BC%88%E7%9F%A5%E4%B9%8E%E5%86%85%E5%AE%B9%E6%90%9C%E7%B4%A2%EF%BC%89%E3%80%82)

## 相关

这是 DataXAPI 社交媒体数据的一部分。同一把 Key 还能用：达人、广告、电商。

同一件事的其他平台：[B站视频搜索](https://dataxapi.com/zh/apis/bilibili/videos/search/)、[抖音视频搜索](https://dataxapi.com/zh/apis/douyin/videos/search/)、[快手视频搜索](https://dataxapi.com/zh/apis/kuaishou/videos/search/)、[LinkedIn 帖子搜索](https://dataxapi.com/zh/apis/linkedin/posts/search/)、[Threads 帖子搜索](https://dataxapi.com/zh/apis/threads/posts/search/)、[TikTok 视频搜索](https://dataxapi.com/zh/apis/tiktok/videos/search/)、[微博实时搜索](https://dataxapi.com/zh/apis/weibo/posts/search/)、[X 帖子搜索](https://dataxapi.com/zh/apis/x/posts/search/)、[小红书笔记搜索](https://dataxapi.com/zh/apis/xiaohongshu/notes/search/)、[YouTube 视频搜索](https://dataxapi.com/zh/apis/youtube/videos/search/)、[微信搜一搜视频号视频搜索](https://dataxapi.com/zh/apis/wechat_channels/videos/search/)、[微信搜一搜综合搜索](https://dataxapi.com/zh/apis/wechat/posts/search/)、[微信搜一搜综合搜索（备用版）](https://dataxapi.com/zh/apis/wechat/backup/posts/search/)、[微信搜一搜视频号视频搜索（备用版）](https://dataxapi.com/zh/apis/wechat_channels/backup/videos/search/)、[Reddit 帖子搜索](https://dataxapi.com/zh/apis/reddit/posts/search/)、[Pinterest 图钉搜索](https://dataxapi.com/zh/apis/pinterest/pins/search/)、[抖音视频搜索（备用版）](https://dataxapi.com/zh/apis/douyin/backup/videos/search/)

知乎的接口：[知乎回答评论](https://dataxapi.com/zh/apis/zhihu/answers/comments/list/)、[知乎回答详情](https://dataxapi.com/zh/apis/zhihu/answers/get/)、[知乎文章详情](https://dataxapi.com/zh/apis/zhihu/articles/get/)、[知乎专栏文章列表](https://dataxapi.com/zh/apis/zhihu/columns/articles/list/)、[知乎评论回复](https://dataxapi.com/zh/apis/zhihu/comments/replies/list/)、[知乎想法详情](https://dataxapi.com/zh/apis/zhihu/pins/get/)、[知乎内容搜索](https://dataxapi.com/zh/apis/zhihu/posts/search/)、[知乎问题回答](https://dataxapi.com/zh/apis/zhihu/questions/answers/list/)、[知乎问题详情](https://dataxapi.com/zh/apis/zhihu/questions/get/)、[知乎热榜](https://dataxapi.com/zh/apis/zhihu/trends/list/)、[知乎用户回答](https://dataxapi.com/zh/apis/zhihu/users/answers/list/)、[知乎用户文章](https://dataxapi.com/zh/apis/zhihu/users/articles/list/)、[知乎用户粉丝列表](https://dataxapi.com/zh/apis/zhihu/users/followers/list/)、[知乎用户资料](https://dataxapi.com/zh/apis/zhihu/users/get/)、[知乎用户想法](https://dataxapi.com/zh/apis/zhihu/users/pins/list/)、[知乎用户搜索](https://dataxapi.com/zh/apis/zhihu/users/search/)

怎么做和常见问题：[知乎有 API 吗？用 Python 取问题和回答（2026）](https://dataxapi.com/zh/guides/zhihu-api-python/)、[知乎 x-zse-96 是什么（2026）](https://dataxapi.com/zh/answers/zhihu-x-zse-96/)、[知乎爬虫爬不了了怎么办（2026）](https://dataxapi.com/zh/answers/zhihu-scraper-not-working/)、[怎么让 AI 读知乎、B 站、微博（2026）](https://dataxapi.com/zh/answers/ai-read-zhihu-bilibili-weibo/)、[知乎 40362 是什么意思（2026）](https://dataxapi.com/zh/answers/zhihu-40362/)、[知乎数据接口有哪些？问题、回答、评论怎么取（2026）](https://dataxapi.com/zh/answers/zhihu-data-apis/)、[知乎 MCP：在 Claude、Cursor 里查知乎问答（2026）](https://dataxapi.com/zh/answers/zhihu-mcp/)、[一个 Key 调小红书、抖音、公众号：社媒数据 API 聚合怎么选（2026）](https://dataxapi.com/zh/answers/one-key-china-social-data-api/)、[舆情监控 API 有哪些？一个关键词同时查微博、抖音、小红书等平台（2026）](https://dataxapi.com/zh/answers/social-listening-api-china/)、[给 AI 和 agent 用的知乎数据接口：返回省 token、Claude 和 Cursor 直接调（2026）](https://dataxapi.com/zh/answers/zhihu-api-for-ai-agents/)

用到这个接口的 Skills：[关键词搜索与提及](https://dataxapi.com/zh/skills/mentions/)

相关：[知乎的全部接口](https://dataxapi.com/zh/apis/zhihu/)、[社交媒体数据](https://dataxapi.com/zh/categories/social/)、[这件事在 15 个平台上的对照](https://dataxapi.com/zh/roles/posts-search/)、[内容对象的字段](https://dataxapi.com/zh/docs/objects/post/)

## 常见问题

### 知乎内容搜索 API 多少钱？

$0.0020 一次。单次最高扣费 $0.0020。

### 什么情况下不收费？

出错和超时不收费。

### 一次返回多少条？怎么翻页？

每页约 18 条，最多 20 条。每页条数由平台决定，不收 limit。取下一页时把 page.next_cursor 作为 cursor 带上；游标有效期 1 小时。最后一页的 page.has_more 是 false。

---

最后核对于 2026-11-26 12:17 UTC。目录修订号 0051cce45e9530b9。 [网页版](https://dataxapi.com/zh/apis/zhihu/posts/search/)
