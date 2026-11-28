# Instagram 帖子评论 API

按帖子短码或链接取一页 Instagram 评论，每页约 15 条，最新在前：正文、评论者、点赞数、发布时间。每次最多 15 条；$0.0020 一次。出错、超时、对象不存在都不收费。

- 地址：`GET https://api.dataxapi.com/v1/instagram/posts/comments/list`
- 编号：`instagram.posts.comments.list`
- 也叫：Instagram 评论区、ins 评论列表
- 价格：$0.0020 / 次
- 当前状态不写在这一页上（页面是快照），实时读：`GET https://api.dataxapi.com/v1/catalog/status`
- 返回：每页 15 条, 一页，带翻下一页的游标
- 返回标准的评论结构，各平台相同
- `id` 就在链接里：`instagram.com/p/<id>/`。也可以把整条链接传给 `url`。
- [在 Playground 里跑一次](https://dataxapi.com/zh/console/playground/?capability=instagram.posts.comments.list&params=%7B%22id%22%3A%22DeCPVhERA8e%22%7D)
- 英文名：[Instagram post comments API](https://dataxapi.com/apis/instagram/posts/comments/list/)

## 能拿到什么

2026-10-12 18:57 UTC 录下的真实返回，这里是前 2 行。

| 字段 | 值 |
| --- | --- |
| published_at | 2026-10-12 18:11 UTC |
| metrics.likes | 0 |

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | 文本 | `id`、`url` 里给且只给一个 | 帖子短码，链接里 /p/ 或 /reel/ 后面那一段。示例：`DeCPVhERA8e`。 |
| `url` | 文本 | `id`、`url` 里给且只给一个 | 帖子或 Reel 的网页链接。示例：`https://www.instagram.com/p/DeCPVhERA8e/`。长链接：`https://www.instagram.com/p/DeCPVhERA8e/`。 |
| `cursor` | 文本 |  | 上一页返回的游标。把上一页的 `page.next_cursor` 原样带上。每翻一页按一次调用收费。 |
| `view` | 文本 |  | 返回档位。三档价格相同。取值：`compact`、`standard`（默认）、`full`。 |
| `fields` | 文本列表 |  | 只要这些字段。按路径写，例如 `author.name`。 |

## 返回字段

`data.items` 是评论对象的列表。稳定：字段只增不改。

返回分三档：精简 `compact`（最常用的字段，长文本截短）、标准 `standard`（默认，全部标准字段）、完整 `full`（再加 `ext`，也就是这个平台特有的字段）。字段从表里写的那一档起出现，更大的档位也带。

| 字段 | 类型 | 说明 | 起始档位 | 这个接口 |
| --- | --- | --- | --- | --- |
| `id` | 文本 | 编号。 | `compact` | 有 |
| `url` | 链接 | 能直接打开的链接。 | `compact` | 平台没有 |
| `text` | 文本 | 正文。长文本：精简档只保留前 500 个字符，并在 `warnings` 里写明。 | `compact` | 有 |
| `published_at` | 时间 | 发布时间。 | `compact` | 有 |
| `author` | 对象 | 评论者。 | `compact` | 有 |
| `author.id` | 文本 | 评论者的账号编号。 | `compact` | 有 |
| `author.username` | 文本 | 评论者的账号名。 | `compact` | 有 |
| `author.name` | 文本 | 评论者的显示名。 | `compact` | 这个接口不提供 |
| `author.avatar_url` | 链接 | 评论者头像。 | `standard` | 有 |
| `metrics` | 对象 | 互动数。 | `compact` | 有 |
| `metrics.likes` | 整数 | 点赞数。 | `compact` | 有 |
| `metrics.comments` | 整数 | 回复数。 | `compact` | 这个接口不提供 |
| `post_id` | 文本 | 所属内容的编号。 | `compact` | 这个接口不提供 |
| `parent_id` | 文本 | 它直接回复的那条评论的编号；一级评论为 null。 | `compact` | 有 |
| `root_id` | 文本 | 所在回复串的一级评论编号；一级评论为 null。 | `compact` | 有 |
| `approximate` | 对象列表 | 这一条里哪些数是约数或下限；都是准确值时不出现。 | `compact` | 有 |
| `approximate[].field` | 文本 | 字段的路径，如 metrics.views。 | `compact` | 有 |
| `approximate[].kind` | 文本 | 约数，还是下限。取值：`approximate`、`lower_bound`。 | `compact` | 有 |

某一条本来就没有这个值时，字段给 `null`。这个接口给不了的字段不出现，统一列在 `meta.unavailable`。

每条数据的典型体积：`compact` 250 B、`standard` 756 B、`full` 756 B（按 2026-10-12 18:57 UTC 录下的那次返回量的）。

## 翻页

每页 15 条。每页条数由平台决定，不收 `limit`。

取下一页时把 `page.next_cursor` 作为 `cursor` 带上；游标有效期 1 小时。最后一页的 `page.has_more` 是 false。

## 什么时候收费

| 情况 | 收费 |
| --- | --- |
| 返回了数据 | $0.0020，每次调用收一次 |
| 每翻一页 | 按一次调用另收 |
| 对象不存在（404） | 不收费 |
| 参数不合法、出错、超时 | 不收费 |
| 单次最高扣费 | $0.0020 (带 `X-Max-Price` 可以设自己的上限，超过就不执行) |

价格读取于 2026-11-28 06:28 UTC，按价目版本 30，2026-11-28 04:43 UTC 起生效；在 Playground 里运行前会再读一次当前价格。

## 对象不存在时

返回 404 `not_found`，不收费。`reason` 写明是哪一种：`not_found`（不存在）或 `private_or_deleted`（私密或已删除）。

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
| 404 | `not_found` | 对象不存在、私密或已删除 | 未扣费 | 不能 |
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
curl -G "https://api.dataxapi.com/v1/instagram/posts/comments/list" \
  --data-urlencode "id=DeCPVhERA8e" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
# pip install dataxapi
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.instagram.posts.comments.list(id="DeCPVhERA8e")
print(result["data"]["items"])
```

### TypeScript

```typescript
// npm i @dataxapi/sdk
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.instagram.posts.comments.list({ id: "DeCPVhERA8e" });
console.log(result.data.items);
```

### 命令行

```bash
dataxapi call instagram.posts.comments.list id=DeCPVhERA8e
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

把这段加进你的 MCP 客户端，然后让你的 AI 调用 `instagram.posts.comments.list`。

## 返回

### 200

取自 2026-10-12 18:57 UTC 录下的真实返回。名字、正文和编号是示例，链接也是，都不是录到的原文（页面不展示任何人的个人信息）；数字是原样。长列表做了截断。请求号、游标和余额是示意。

返回大小：标准档 11.6 KB（精简 4.2 KB，完整 11.6 KB）。

```jsonc
{
  "code": "ok",
  "request_id": "26544c27-ca21-4ab8-8bb6-d4d38efa2a35",
  "data": {
    "items": [
      {
        "id": "18777006597784877",
        "text": "Saving this for the weekend.",
        "published_at": "2026-10-12T18:11:33.000Z",
        "author": {
          "id": "57288959895",
          "username": "northside_coffee",
          "avatar_url": "https://scontent.cdninstagram.com/v/t51.2885-19/419276717_15679784272961466_n.jpg"
        },
        "metrics": { "likes": 0 },
        "parent_id": null,
        "root_id": null
      },
      // … 另有 14 条
    ]
  },
  "page": {
    "next_cursor": "c1.TYGSDCOBtTmfqU4tPNqw4QdJ8TU7mqPvshSF2xKz",
    "cursor_expires_at": "2026-10-12T19:57:37.000Z",
    "has_more": true,
    "returned": 15
  },
  "warnings": [],
  "meta": {
    "capability": "instagram.posts.comments.list",
    "result_status": "complete",
    "fetched_at": "2026-10-12T18:57:37.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "url": "platform",
      "author.name": "capability",
      "metrics.comments": "capability",
      "post_id": "capability"
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

取自 2026-10-12 18:57 UTC 的录制，为演示这种情况人工改过。请求号和余额是示意。

返回大小：标准档 510 B（精简 510 B，完整 510 B）。

```jsonc
{
  "code": "ok",
  "request_id": "f0359124-e354-467e-a268-badf1fdb1553",
  "data": { "items": [] },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 0
  },
  "warnings": [],
  "meta": {
    "capability": "instagram.posts.comments.list",
    "result_status": "empty",
    "fetched_at": "2026-10-12T18:57:37.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "url": "platform",
      "author.name": "capability",
      "metrics.comments": "capability",
      "post_id": "capability"
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
  "request_id": "6ecb58b9-d2f9-4771-a4eb-05ef971d856f",
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
  "request_id": "ce1ba474-8d3f-4ecd-881b-408e0759af18",
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
  "request_id": "ca254c3f-5a67-49f8-8489-29527d3f8da5",
  "message": "The object does not exist, is private or was deleted",
  "message_zh": "对象不存在、私密或已删除",
  "charged": false,
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
  "request_id": "41aacf70-2232-4b28-8be1-2c509ebb3c1d",
  "message": "No result came back this time and nothing was charged; retry shortly",
  "message_zh": "这次没有取到结果，没有扣费，可以稍后重试",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

这份录制的返回：平台原始 JSON 5,620 token，DataXAPI 的 JSON 5,476 token，AI 通过 DataXAPI 的 MCP 读到 1,287 token，少 77%（2026-11-06 统计）。

[这份示例的 JSON 文件](https://dataxapi.com/apis/instagram/posts/comments/list.example.json)

## 在你的 AI 里用它

`dataxapi setup` 给这台电脑上的 AI 代理（Claude Code、Codex、Cursor）装好 DataXAPI 的 MCP 服务和基础技能。Key 从环境变量 DATAXAPI_API_KEY 读，不写进任何文件。

MCP 服务地址：`https://api.dataxapi.com/mcp`。你的客户端要填的配置在本页请求示例的“MCP”页签里；接好后让你的 AI 调用 `instagram.posts.comments.list`。

或者把这段话贴给任意一个 AI：

> 读一下 https://dataxapi.com/zh/apis/instagram/posts/comments/list.md，然后帮我用 DataXAPI 的接口 instagram.posts.comments.list（Instagram 帖子评论）。

[在 ChatGPT 里打开](https://chatgpt.com/?q=%E8%AF%BB%E4%B8%80%E4%B8%8B%20https%3A%2F%2Fdataxapi.com%2Fzh%2Fapis%2Finstagram%2Fposts%2Fcomments%2Flist.md%EF%BC%8C%E7%84%B6%E5%90%8E%E5%B8%AE%E6%88%91%E7%94%A8%20DataXAPI%20%E7%9A%84%E6%8E%A5%E5%8F%A3%20instagram.posts.comments.list%EF%BC%88Instagram%20%E5%B8%96%E5%AD%90%E8%AF%84%E8%AE%BA%EF%BC%89%E3%80%82) · [在 Claude 里打开](https://claude.ai/new?q=%E8%AF%BB%E4%B8%80%E4%B8%8B%20https%3A%2F%2Fdataxapi.com%2Fzh%2Fapis%2Finstagram%2Fposts%2Fcomments%2Flist.md%EF%BC%8C%E7%84%B6%E5%90%8E%E5%B8%AE%E6%88%91%E7%94%A8%20DataXAPI%20%E7%9A%84%E6%8E%A5%E5%8F%A3%20instagram.posts.comments.list%EF%BC%88Instagram%20%E5%B8%96%E5%AD%90%E8%AF%84%E8%AE%BA%EF%BC%89%E3%80%82)

## 相关

这是 DataXAPI 社交媒体数据的一部分。同一把 Key 还能用：达人、广告、电商。

同一件事的其他平台：[B站视频评论](https://dataxapi.com/zh/apis/bilibili/videos/comments/list/)、[抖音视频评论](https://dataxapi.com/zh/apis/douyin/videos/comments/list/)、[快手作品评论](https://dataxapi.com/zh/apis/kuaishou/videos/comments/list/)、[Facebook 帖子评论](https://dataxapi.com/zh/apis/facebook/posts/comments/list/)、[TikTok 视频评论](https://dataxapi.com/zh/apis/tiktok/videos/comments/list/)、[微博评论](https://dataxapi.com/zh/apis/weibo/posts/comments/list/)、[X 帖子回复列表](https://dataxapi.com/zh/apis/x/posts/replies/list/)、[小红书笔记评论](https://dataxapi.com/zh/apis/xiaohongshu/notes/comments/list/)、[YouTube 视频评论](https://dataxapi.com/zh/apis/youtube/videos/comments/list/)、[微信视频号作品评论](https://dataxapi.com/zh/apis/wechat_channels/videos/comments/list/)、[Reddit 帖子评论](https://dataxapi.com/zh/apis/reddit/posts/comments/list/)、[知乎回答评论](https://dataxapi.com/zh/apis/zhihu/answers/comments/list/)

其他平台的社交媒体数据：[抖音评论回复](https://dataxapi.com/zh/apis/douyin/comments/replies/list/)、[B站评论回复](https://dataxapi.com/zh/apis/bilibili/comments/replies/list/)、[快手评论回复](https://dataxapi.com/zh/apis/kuaishou/comments/replies/list/)、[TikTok 评论回复](https://dataxapi.com/zh/apis/tiktok/comments/replies/list/)、[微博评论回复](https://dataxapi.com/zh/apis/weibo/comments/replies/list/)、[小红书评论回复](https://dataxapi.com/zh/apis/xiaohongshu/comments/replies/list/)、[YouTube 评论回复](https://dataxapi.com/zh/apis/youtube/comments/replies/list/)、[微信公众号文章评论](https://dataxapi.com/zh/apis/wechat_mp/articles/comments/list/)、[微信公众号评论回复](https://dataxapi.com/zh/apis/wechat_mp/comments/replies/list/)、[微信视频号评论回复](https://dataxapi.com/zh/apis/wechat_channels/comments/replies/list/)

Instagram的接口：[Instagram 评论回复](https://dataxapi.com/zh/apis/instagram/comments/replies/list/)、[Instagram 话题帖子](https://dataxapi.com/zh/apis/instagram/hashtags/posts/list/)、[Instagram 帖子评论](https://dataxapi.com/zh/apis/instagram/posts/comments/list/)、[Instagram 帖子详情](https://dataxapi.com/zh/apis/instagram/posts/get/)、[Instagram 视频字幕](https://dataxapi.com/zh/apis/instagram/posts/transcript/get/)、[Instagram 用户资料](https://dataxapi.com/zh/apis/instagram/users/get/)、[Instagram 用户帖子](https://dataxapi.com/zh/apis/instagram/users/posts/list/)、[Instagram 用户搜索](https://dataxapi.com/zh/apis/instagram/users/search/)、[Instagram 视频和图片下载地址](https://dataxapi.com/zh/apis/instagram/posts/media/get/)

用到这个接口的 Skills：[评论与口碑](https://dataxapi.com/zh/skills/comments/)

相关：[Instagram的全部接口](https://dataxapi.com/zh/apis/instagram/)、[社交媒体数据](https://dataxapi.com/zh/categories/social/)、[这件事在 13 个平台上的对照](https://dataxapi.com/zh/roles/posts-comments-list/)、[评论对象的字段](https://dataxapi.com/zh/docs/objects/comment/)

## 常见问题

### Instagram 帖子评论 API 多少钱？

$0.0020 一次。单次最高扣费 $0.0020。

### 什么情况下不收费？

出错、超时、对象不存在都不收费。

### 一次返回多少条？怎么翻页？

每页 15 条。每页条数由平台决定，不收 limit。取下一页时把 page.next_cursor 作为 cursor 带上；游标有效期 1 小时。最后一页的 page.has_more 是 false。

### 对象不存在会怎样？

返回 404 not_found，不收费。reason 写明是哪一种：not_found（不存在）或 private_or_deleted（私密或已删除）。

---

最后核对于 2026-11-28 06:28 UTC。目录修订号 ceced48b38f71468。 [网页版](https://dataxapi.com/zh/apis/instagram/posts/comments/list/)
