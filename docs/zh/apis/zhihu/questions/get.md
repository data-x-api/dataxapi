# 知乎问题详情 API

按问题编号或链接取一个知乎问题：标题、补充说明、提问时间、回答数、关注数、浏览数。每次取一个对象；$0.0020 一次。出错和超时不收费。

- 地址：`GET https://api.dataxapi.com/v1/zhihu/questions/get`
- 编号：`zhihu.questions.get`
- 也叫：知乎问题内容、知乎提问
- 价格：$0.0020 / 次
- 当前状态不写在这一页上（页面是快照），实时读：`GET https://api.dataxapi.com/v1/catalog/status`
- 返回：1 个对象, 一个内容对象
- 返回标准的内容结构，各平台相同
- `id` 就在链接里：`zhihu.com/question/<id>`。也可以把整条链接传给 `url`。
- [在 Playground 里跑一次](https://dataxapi.com/zh/console/playground/?capability=zhihu.questions.get&params=%7B%22id%22%3A%2255043447%22%7D)
- 英文名：[Zhihu question detail API](https://dataxapi.com/apis/zhihu/questions/get/)

## 能拿到什么

2026-10-12 19:18 UTC 录下的真实返回，这里是前 4 行。

| 字段 | 值 |
| --- | --- |
| type | text |
| published_at | 2017-01-22 20:48 UTC |
| metrics.comments | 0 |
| metrics.views | 149,214 |

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | 文本 | `id`、`url` 里给且只给一个 | 问题编号，一串数字。示例：`55043447`。 |
| `url` | 文本 | `id`、`url` 里给且只给一个 | 问题的网页链接。示例：`https://zhihu.com/question/55043447`。长链接：`https://zhihu.com/question/55043447`。 |
| `view` | 文本 |  | 返回档位。三档价格相同。取值：`compact`、`standard`（默认）、`full`。 |
| `fields` | 文本列表 |  | 只要这些字段。按路径写，例如 `author.name`。 |

## 返回字段

`data.item` 是一个内容对象。稳定：字段只增不改。

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
| `author` | 对象 | 作者。 | `compact` | 平台没有 |
| `author.id` | 文本 | 作者的账号编号。 | `compact` | 平台没有 |
| `author.username` | 文本 | 作者的账号名。 | `compact` | 平台没有 |
| `author.name` | 文本 | 作者的显示名。 | `compact` | 平台没有 |
| `author.avatar_url` | 链接 | 作者头像。 | `standard` | 平台没有 |
| `author.verified` | 是否 | 作者是否认证。 | `standard` | 平台没有 |
| `author.followers` | 整数 | 作者的粉丝数。 | `standard` | 平台没有 |
| `metrics` | 对象 | 互动数。 | `compact` | 有 |
| `metrics.likes` | 整数 | 点赞数。 | `compact` | 平台没有 |
| `metrics.comments` | 整数 | 评论数。 | `compact` | 有 |
| `metrics.shares` | 整数 | 分享数。 | `compact` | 平台没有 |
| `metrics.favorites` | 整数 | 收藏数。 | `compact` | 平台没有 |
| `metrics.views` | 整数 | 播放或阅读数。 | `compact` | 有 |
| `metrics.reposts` | 整数 | 转发数。 | `compact` | 平台没有 |
| `images` | 链接列表 | 图片地址。 | `standard` | 这个接口不提供 |
| `hashtags` | 文本列表 | 话题标签，不带 #。 | `standard` | 这个接口不提供 |
| `mentions` | 对象列表 | 正文里提及的账号。 | `standard` | 这个接口不提供 |
| `mentions[].id` | 文本 | 账号编号。 | `standard` | 这个接口不提供 |
| `mentions[].username` | 文本 | 账号名。 | `standard` | 这个接口不提供 |
| `mentions[].name` | 文本 | 显示名。 | `standard` | 这个接口不提供 |
| `is_pinned` | 是否 | 是否被作者置顶。 | `standard` | 平台没有 |
| `post_id` | 文本 | 它回复的那条内容所在的主帖编号；不是回复则为 null。 | `compact` | 平台没有 |
| `parent_id` | 文本 | 它直接回复的那一条的编号；不是回复则为 null。 | `compact` | 平台没有 |
| `root_id` | 文本 | 所在回复串里第一层那一条的编号。 | `compact` | 平台没有 |
| `ext.answers` | 整数 | 问题的回答数。 | `full` | 有 |
| `ext.followers` | 整数 | 关注这个问题的人数。 | `full` | 有 |
| `approximate` | 对象列表 | 这一条里哪些数是约数或下限；都是准确值时不出现。 | `compact` | 有 |
| `approximate[].field` | 文本 | 字段的路径，如 metrics.views。 | `compact` | 有 |
| `approximate[].kind` | 文本 | 约数，还是下限。取值：`approximate`、`lower_bound`。 | `compact` | 有 |

某一条本来就没有这个值时，字段给 `null`。这个接口给不了的字段不出现，统一列在 `meta.unavailable`。

每条数据的典型体积：`compact` 249 B、`standard` 249 B、`full` 285 B（按 2026-10-12 19:18 UTC 录下的那次返回量的）。

## 翻页

每次取一个对象，不翻页。

## 什么时候收费

| 情况 | 收费 |
| --- | --- |
| 返回了数据 | $0.0020，每次调用收一次 |
| 参数不合法、出错、超时 | 不收费 |
| 单次最高扣费 | $0.0020 (带 `X-Max-Price` 可以设自己的上限，超过就不执行) |

价格读取于 2026-11-26 12:17 UTC，按价目版本 22，2026-11-25 13:46 UTC 起生效；在 Playground 里运行前会再读一次当前价格。

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
curl -G "https://api.dataxapi.com/v1/zhihu/questions/get" \
  --data-urlencode "id=55043447" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
# pip install dataxapi
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.zhihu.questions.get(id="55043447")
print(result["data"]["item"])
```

### TypeScript

```typescript
// npm i @dataxapi/sdk
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.zhihu.questions.get({ id: "55043447" });
console.log(result.data.item);
```

### 命令行

```bash
dataxapi call zhihu.questions.get id=55043447
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

把这段加进你的 MCP 客户端，然后让你的 AI 调用 `zhihu.questions.get`。

## 返回

### 200

取自 2026-10-12 19:18 UTC 录下的真实返回。名字、正文和编号是示例，链接也是，都不是录到的原文（页面不展示任何人的个人信息）；数字是原样。长列表做了截断。请求号、游标和余额是示意。

返回大小：标准档 878 B（精简 878 B，完整 914 B）。

```jsonc
{
  "code": "ok",
  "request_id": "b046c82a-5ea3-4cd7-b4e2-615ededbbc40",
  "data": {
    "item": {
      "id": "3511132586",
      "url": "https://www.zhihu.com/answer/3511132586",
      "type": "text",
      "title": "周末露营入门指南：一篇讲清楚",
      "text": null,
      "published_at": "2017-01-22T20:48:31.000Z",
      "metrics": { "comments": 0, "views": 149214 }
    }
  },
  "warnings": [],
  "meta": {
    "capability": "zhihu.questions.get",
    "result_status": "complete",
    "fetched_at": "2026-10-12T19:18:35.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "lang": "capability",
      "author": "platform",
      "metrics.likes": "platform",
      "metrics.shares": "platform",
      "metrics.favorites": "platform",
      "metrics.reposts": "platform",
      "images": "capability",
      "hashtags": "capability",
      "mentions": "capability",
      "is_pinned": "platform",
      "post_id": "platform",
      "parent_id": "platform",
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
  "request_id": "0d7610f7-f4a1-4d8e-8c00-03b2d4ecdf49",
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
  "request_id": "834e22ee-c271-4bf7-a4b2-6c2414ddf362",
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
  "request_id": "1ff87eb2-dfc5-4a65-a9c5-905d4e59d219",
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
  "request_id": "c05df8a4-6841-4fff-a7db-bc23436ddbb1",
  "message": "No result came back this time and nothing was charged; retry shortly",
  "message_zh": "这次没有取到结果，没有扣费，可以稍后重试",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

这份录制的返回：平台原始 JSON 419 token，DataXAPI 的 JSON 249 token，AI 通过 DataXAPI 的 MCP 读到 172 token，少 59%（2026-11-06 统计）。

[这份示例的 JSON 文件](https://dataxapi.com/apis/zhihu/questions/get.example.json)

## 在你的 AI 里用它

`dataxapi setup` 给这台电脑上的 AI 代理（Claude Code、Codex、Cursor）装好 DataXAPI 的 MCP 服务和基础技能。Key 从环境变量 DATAXAPI_API_KEY 读，不写进任何文件。

MCP 服务地址：`https://api.dataxapi.com/mcp`。你的客户端要填的配置在本页请求示例的“MCP”页签里；接好后让你的 AI 调用 `zhihu.questions.get`。

或者把这段话贴给任意一个 AI：

> 读一下 https://dataxapi.com/zh/apis/zhihu/questions/get.md，然后帮我用 DataXAPI 的接口 zhihu.questions.get（知乎问题详情）。

[在 ChatGPT 里打开](https://chatgpt.com/?q=%E8%AF%BB%E4%B8%80%E4%B8%8B%20https%3A%2F%2Fdataxapi.com%2Fzh%2Fapis%2Fzhihu%2Fquestions%2Fget.md%EF%BC%8C%E7%84%B6%E5%90%8E%E5%B8%AE%E6%88%91%E7%94%A8%20DataXAPI%20%E7%9A%84%E6%8E%A5%E5%8F%A3%20zhihu.questions.get%EF%BC%88%E7%9F%A5%E4%B9%8E%E9%97%AE%E9%A2%98%E8%AF%A6%E6%83%85%EF%BC%89%E3%80%82) · [在 Claude 里打开](https://claude.ai/new?q=%E8%AF%BB%E4%B8%80%E4%B8%8B%20https%3A%2F%2Fdataxapi.com%2Fzh%2Fapis%2Fzhihu%2Fquestions%2Fget.md%EF%BC%8C%E7%84%B6%E5%90%8E%E5%B8%AE%E6%88%91%E7%94%A8%20DataXAPI%20%E7%9A%84%E6%8E%A5%E5%8F%A3%20zhihu.questions.get%EF%BC%88%E7%9F%A5%E4%B9%8E%E9%97%AE%E9%A2%98%E8%AF%A6%E6%83%85%EF%BC%89%E3%80%82)

## 相关

这是 DataXAPI 社交媒体数据的一部分。同一把 Key 还能用：达人、广告、电商。

同一件事的其他平台：[B站视频详情](https://dataxapi.com/zh/apis/bilibili/videos/get/)、[抖音视频详情](https://dataxapi.com/zh/apis/douyin/videos/get/)、[快手作品详情](https://dataxapi.com/zh/apis/kuaishou/videos/get/)、[Telegram 单条消息](https://dataxapi.com/zh/apis/telegram/messages/get/)、[X 帖子详情](https://dataxapi.com/zh/apis/x/posts/get/)、[Facebook 帖子详情](https://dataxapi.com/zh/apis/facebook/posts/get/)、[LinkedIn 帖子详情](https://dataxapi.com/zh/apis/linkedin/posts/get/)、[Threads 帖子详情](https://dataxapi.com/zh/apis/threads/posts/get/)、[Instagram 帖子详情](https://dataxapi.com/zh/apis/instagram/posts/get/)、[TikTok 视频详情](https://dataxapi.com/zh/apis/tiktok/videos/get/)、[微博详情](https://dataxapi.com/zh/apis/weibo/posts/get/)、[小红书笔记详情](https://dataxapi.com/zh/apis/xiaohongshu/notes/get/)、[YouTube 视频详情](https://dataxapi.com/zh/apis/youtube/videos/get/)、[微信视频号作品详情](https://dataxapi.com/zh/apis/wechat_channels/videos/get/)、[微信公众号文章详情](https://dataxapi.com/zh/apis/wechat_mp/articles/get/)、[Reddit 帖子详情](https://dataxapi.com/zh/apis/reddit/posts/get/)、[知乎回答详情](https://dataxapi.com/zh/apis/zhihu/answers/get/)、[知乎文章详情](https://dataxapi.com/zh/apis/zhihu/articles/get/)、[知乎想法详情](https://dataxapi.com/zh/apis/zhihu/pins/get/)、[Pinterest 图钉详情](https://dataxapi.com/zh/apis/pinterest/pins/get/)

知乎的接口：[知乎回答评论](https://dataxapi.com/zh/apis/zhihu/answers/comments/list/)、[知乎回答详情](https://dataxapi.com/zh/apis/zhihu/answers/get/)、[知乎文章详情](https://dataxapi.com/zh/apis/zhihu/articles/get/)、[知乎专栏文章列表](https://dataxapi.com/zh/apis/zhihu/columns/articles/list/)、[知乎评论回复](https://dataxapi.com/zh/apis/zhihu/comments/replies/list/)、[知乎想法详情](https://dataxapi.com/zh/apis/zhihu/pins/get/)、[知乎内容搜索](https://dataxapi.com/zh/apis/zhihu/posts/search/)、[知乎问题回答](https://dataxapi.com/zh/apis/zhihu/questions/answers/list/)、[知乎问题详情](https://dataxapi.com/zh/apis/zhihu/questions/get/)、[知乎热榜](https://dataxapi.com/zh/apis/zhihu/trends/list/)、[知乎用户回答](https://dataxapi.com/zh/apis/zhihu/users/answers/list/)、[知乎用户文章](https://dataxapi.com/zh/apis/zhihu/users/articles/list/)、[知乎用户粉丝列表](https://dataxapi.com/zh/apis/zhihu/users/followers/list/)、[知乎用户资料](https://dataxapi.com/zh/apis/zhihu/users/get/)、[知乎用户想法](https://dataxapi.com/zh/apis/zhihu/users/pins/list/)、[知乎用户搜索](https://dataxapi.com/zh/apis/zhihu/users/search/)

怎么做和常见问题：[知乎爬虫爬不了了怎么办（2026）](https://dataxapi.com/zh/answers/zhihu-scraper-not-working/)、[知乎数据接口有哪些？问题、回答、评论怎么取（2026）](https://dataxapi.com/zh/answers/zhihu-data-apis/)、[知乎问题 ID、回答 ID 怎么找（2026）](https://dataxapi.com/zh/answers/zhihu-question-answer-id/)

相关：[知乎的全部接口](https://dataxapi.com/zh/apis/zhihu/)、[社交媒体数据](https://dataxapi.com/zh/categories/social/)、[这件事在 18 个平台上的对照](https://dataxapi.com/zh/roles/posts-get/)、[内容对象的字段](https://dataxapi.com/zh/docs/objects/post/)

## 常见问题

### 知乎问题详情 API 多少钱？

$0.0020 一次。单次最高扣费 $0.0020。

### 什么情况下不收费？

出错和超时不收费。

### 对象不存在会怎样？

返回 404 not_found。报错里的 charged 和 amount 写明这次扣了多少。reason 写明是哪一种：not_found（不存在）或 private_or_deleted（私密或已删除）。

---

最后核对于 2026-11-26 12:17 UTC。目录修订号 0051cce45e9530b9。 [网页版](https://dataxapi.com/zh/apis/zhihu/questions/get/)
