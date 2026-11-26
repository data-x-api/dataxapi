# 微信视频号作品评论 API

按作品编号取一页视频号作品的一级评论：正文、评论者、点赞数、发布时间、IP 属地。每次约 24 条，最多 30 条；$0.0200 一次。出错和超时不收费。

- 地址：`GET https://api.dataxapi.com/v1/wechat_channels/videos/comments/list`
- 编号：`wechat_channels.videos.comments.list`
- 也叫：视频号评论区、视频号视频评论
- 价格：$0.0200 / 次
- 当前状态不写在这一页上（页面是快照），实时读：`GET https://api.dataxapi.com/v1/catalog/status`
- 返回：每页最多 30 条, 一页，带翻下一页的游标
- 返回标准的评论结构，各平台相同
- [在 Playground 里跑一次](https://dataxapi.com/zh/console/playground/?capability=wechat_channels.videos.comments.list&params=%7B%22id%22%3A%2214559898883113486609%22%7D)
- 英文名：[WeChat Channels video comments API](https://dataxapi.com/apis/wechat_channels/videos/comments/list/)

## 能拿到什么

2026-10-13 03:25 UTC 录下的真实返回，这里是前 2 行。

| 字段 | 值 |
| --- | --- |
| published_at | 2024-12-31 20:01 UTC |
| metrics.likes | 349 |

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | 文本 | 是 | 作品编号，一串数字；作品列表和作品详情里的 id 就是它。示例：`14559898883113486609`。 |
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
| `author.username` | 文本 | 评论者的账号名。 | `compact` | 平台没有 |
| `author.name` | 文本 | 评论者的显示名。 | `compact` | 有 |
| `author.avatar_url` | 链接 | 评论者头像。 | `standard` | 有 |
| `metrics` | 对象 | 互动数。 | `compact` | 有 |
| `metrics.likes` | 整数 | 点赞数。 | `compact` | 有 |
| `metrics.comments` | 整数 | 回复数。 | `compact` | 这个接口不提供 |
| `post_id` | 文本 | 所属内容的编号。 | `compact` | 有 |
| `parent_id` | 文本 | 它直接回复的那条评论的编号；一级评论为 null。 | `compact` | 有 |
| `root_id` | 文本 | 所在回复串的一级评论编号；一级评论为 null。 | `compact` | 有 |
| `ext.ip_location` | 文本 | 平台显示的 IP 属地。 | `full` | 有 |
| `approximate` | 对象列表 | 这一条里哪些数是约数或下限；都是准确值时不出现。 | `compact` | 有 |
| `approximate[].field` | 文本 | 字段的路径，如 metrics.views。 | `compact` | 有 |
| `approximate[].kind` | 文本 | 约数，还是下限。取值：`approximate`、`lower_bound`。 | `compact` | 有 |

某一条本来就没有这个值时，字段给 `null`。这个接口给不了的字段不出现，统一列在 `meta.unavailable`。

每条数据的典型体积：`compact` 463 B、`standard` 632 B、`full` 665 B（按 2026-10-13 03:25 UTC 录下的那次返回量的）。

## 翻页

每页约 24 条，最多 30 条。每页条数由平台决定，不收 `limit`。

取下一页时把 `page.next_cursor` 作为 `cursor` 带上；游标有效期 1 小时。最后一页的 `page.has_more` 是 false。

## 什么时候收费

| 情况 | 收费 |
| --- | --- |
| 返回了数据 | $0.0200，每次调用收一次 |
| 每翻一页 | 按一次调用另收 |
| 参数不合法、出错、超时 | 不收费 |
| 单次最高扣费 | $0.0200 (带 `X-Max-Price` 可以设自己的上限，超过就不执行) |

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
| 400 | `cursor_invalid` | 游标不存在 | 未扣费 | 不能 |
| 400 | `cursor_mismatch` | 游标不是用这个接口和这组参数取得的 | 未扣费 | 改了再试 |
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
curl -G "https://api.dataxapi.com/v1/wechat_channels/videos/comments/list" \
  --data-urlencode "id=14559898883113486609" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
# pip install dataxapi
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.wechat_channels.videos.comments.list(id="14559898883113486609")
print(result["data"]["items"])
```

### TypeScript

```typescript
// npm i @dataxapi/sdk
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.wechat_channels.videos.comments.list({ id: "14559898883113486609" });
console.log(result.data.items);
```

### 命令行

```bash
dataxapi call wechat_channels.videos.comments.list id=14559898883113486609
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

把这段加进你的 MCP 客户端，然后让你的 AI 调用 `wechat_channels.videos.comments.list`。

## 返回

### 200

取自 2026-10-13 03:25 UTC 录下的真实返回。名字、正文和编号是示例，链接也是，都不是录到的原文（页面不展示任何人的个人信息）；数字是原样。长列表做了截断。请求号、游标和余额是示意。

返回大小：标准档 15.3 KB（精简 11.4 KB，完整 16.1 KB）。

```jsonc
{
  "code": "ok",
  "request_id": "4936e536-b2a8-46ef-9132-0ad7b1d40233",
  "data": {
    "items": [
      {
        "id": "14599225504823757671",
        "text": "第三个建议太实用了！",
        "published_at": "2024-12-31T20:01:33.000Z",
        "author": {
          "id": "v2_060000231003b20fa4351d5400566796ed36158bb99b591533bcfe49e950522f0446689d86@finder",
          "name": "山野咖啡馆",
          "avatar_url": "https://wx.qlogo.cn/mmhead/kIZxpOrIhPoPPWoaXrILQ45F4oZTzTPtQa6ADu6x/132"
        },
        "metrics": { "likes": 349 },
        "post_id": "14752989122976584035",
        "parent_id": null,
        "root_id": null
      },
      // … 另有 23 条
    ]
  },
  "page": {
    "next_cursor": "c1.SUxO2elUiHjFkB53f7ECZr8FM9MFD0eQZJ1J-6Rh",
    "cursor_expires_at": "2026-10-13T04:25:36.000Z",
    "has_more": true,
    "returned": 24
  },
  "warnings": [],
  "meta": {
    "capability": "wechat_channels.videos.comments.list",
    "result_status": "complete",
    "fetched_at": "2026-10-13T03:25:36.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "url": "platform",
      "author.username": "platform",
      "metrics.comments": "capability"
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

取自 2026-10-13 03:25 UTC 的录制，为演示这种情况人工改过。请求号和余额是示意。

返回大小：标准档 496 B（精简 496 B，完整 496 B）。

```jsonc
{
  "code": "ok",
  "request_id": "09772434-2305-487c-b9c9-6dc709abc40e",
  "data": { "items": [] },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 0
  },
  "warnings": [],
  "meta": {
    "capability": "wechat_channels.videos.comments.list",
    "result_status": "empty",
    "fetched_at": "2026-10-13T03:25:36.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "url": "platform",
      "author.username": "platform",
      "metrics.comments": "capability"
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
  "request_id": "439bc948-d09a-478b-a8bd-fd5fc0402527",
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
  "request_id": "9e8a22f3-02f2-4db5-9b97-ca8aa8d651ab",
  "message": "The balance is too low",
  "message_zh": "余额不足",
  "charged": false,
  "retry": "after_fix",
  "retry_after_seconds": null,
  "param": null,
  "required": "0.02",
  "available": "0",
  "top_up_url": "https://dataxapi.com/console/billing/?amount=10",
  "next_step": "The balance does not cover this call ($0.02). Top up at top_up_url: $10 at least, about 500 calls at this price; Alipay or a card, and the balance never expires. Then send the same request again, unchanged. Nothing was charged for this one.",
  "next_step_zh": "余额不够这次调用（$0.02）。到 top_up_url 充值：最低 $10，按这次的价格约够 500 次；支付宝、银行卡都能付，余额不过期。到账后把同一个请求原样再发一次。这次没有扣钱。",
  "docs_url": "https://dataxapi.com/docs/errors#insufficient_balance"
}
```

### 404

按规范写的示例，不是录下的返回。

```json
{
  "code": "not_found",
  "request_id": "37f15937-a7e7-446a-866d-9a452d99cd5b",
  "message": "The object does not exist, is private or was deleted",
  "message_zh": "对象不存在、私密或已删除",
  "charged": true,
  "amount": "0.02",
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
  "request_id": "8a3cec84-54ee-4780-90ef-9893b4a79da9",
  "message": "No result came back this time and nothing was charged; retry shortly",
  "message_zh": "这次没有取到结果，没有扣费，可以稍后重试",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

[这份示例的 JSON 文件](https://dataxapi.com/apis/wechat_channels/videos/comments/list.example.json)

## 在你的 AI 里用它

`dataxapi setup` 给这台电脑上的 AI 代理（Claude Code、Codex、Cursor）装好 DataXAPI 的 MCP 服务和基础技能。Key 从环境变量 DATAXAPI_API_KEY 读，不写进任何文件。

MCP 服务地址：`https://api.dataxapi.com/mcp`。你的客户端要填的配置在本页请求示例的“MCP”页签里；接好后让你的 AI 调用 `wechat_channels.videos.comments.list`。

或者把这段话贴给任意一个 AI：

> 读一下 https://dataxapi.com/zh/apis/wechat_channels/videos/comments/list.md，然后帮我用 DataXAPI 的接口 wechat_channels.videos.comments.list（微信视频号作品评论）。

[在 ChatGPT 里打开](https://chatgpt.com/?q=%E8%AF%BB%E4%B8%80%E4%B8%8B%20https%3A%2F%2Fdataxapi.com%2Fzh%2Fapis%2Fwechat_channels%2Fvideos%2Fcomments%2Flist.md%EF%BC%8C%E7%84%B6%E5%90%8E%E5%B8%AE%E6%88%91%E7%94%A8%20DataXAPI%20%E7%9A%84%E6%8E%A5%E5%8F%A3%20wechat_channels.videos.comments.list%EF%BC%88%E5%BE%AE%E4%BF%A1%E8%A7%86%E9%A2%91%E5%8F%B7%E4%BD%9C%E5%93%81%E8%AF%84%E8%AE%BA%EF%BC%89%E3%80%82) · [在 Claude 里打开](https://claude.ai/new?q=%E8%AF%BB%E4%B8%80%E4%B8%8B%20https%3A%2F%2Fdataxapi.com%2Fzh%2Fapis%2Fwechat_channels%2Fvideos%2Fcomments%2Flist.md%EF%BC%8C%E7%84%B6%E5%90%8E%E5%B8%AE%E6%88%91%E7%94%A8%20DataXAPI%20%E7%9A%84%E6%8E%A5%E5%8F%A3%20wechat_channels.videos.comments.list%EF%BC%88%E5%BE%AE%E4%BF%A1%E8%A7%86%E9%A2%91%E5%8F%B7%E4%BD%9C%E5%93%81%E8%AF%84%E8%AE%BA%EF%BC%89%E3%80%82)

## 相关

这是 DataXAPI 社交媒体数据的一部分。同一把 Key 还能用：达人、广告、电商。

同一件事的其他平台：[B站视频评论](https://dataxapi.com/zh/apis/bilibili/videos/comments/list/)、[抖音视频评论](https://dataxapi.com/zh/apis/douyin/videos/comments/list/)、[快手作品评论](https://dataxapi.com/zh/apis/kuaishou/videos/comments/list/)、[Facebook 帖子评论](https://dataxapi.com/zh/apis/facebook/posts/comments/list/)、[Instagram 帖子评论](https://dataxapi.com/zh/apis/instagram/posts/comments/list/)、[TikTok 视频评论](https://dataxapi.com/zh/apis/tiktok/videos/comments/list/)、[微博评论](https://dataxapi.com/zh/apis/weibo/posts/comments/list/)、[X 帖子回复列表](https://dataxapi.com/zh/apis/x/posts/replies/list/)、[小红书笔记评论](https://dataxapi.com/zh/apis/xiaohongshu/notes/comments/list/)、[YouTube 视频评论](https://dataxapi.com/zh/apis/youtube/videos/comments/list/)、[Reddit 帖子评论](https://dataxapi.com/zh/apis/reddit/posts/comments/list/)、[知乎回答评论](https://dataxapi.com/zh/apis/zhihu/answers/comments/list/)

其他平台的社交媒体数据：[抖音评论回复](https://dataxapi.com/zh/apis/douyin/comments/replies/list/)、[B站评论回复](https://dataxapi.com/zh/apis/bilibili/comments/replies/list/)

微信视频号的接口：[微信视频号账号资料](https://dataxapi.com/zh/apis/wechat_channels/users/get/)、[微信视频号作品详情](https://dataxapi.com/zh/apis/wechat_channels/videos/get/)、[微信视频号作品评论](https://dataxapi.com/zh/apis/wechat_channels/videos/comments/list/)、[微信视频号作品分享链接](https://dataxapi.com/zh/apis/wechat_channels/videos/share_link/get/)、[微信视频号账号的合集](https://dataxapi.com/zh/apis/wechat_channels/users/collections/list/)、[微信视频号合集里的视频](https://dataxapi.com/zh/apis/wechat_channels/collections/videos/list/)、[微信视频号用户作品](https://dataxapi.com/zh/apis/wechat_channels/users/videos/list/)、[微信搜一搜视频号视频搜索](https://dataxapi.com/zh/apis/wechat_channels/videos/search/)、[微信视频号账号资料（备用版）](https://dataxapi.com/zh/apis/wechat_channels/backup/users/get/)、[微信视频号用户作品（备用版）](https://dataxapi.com/zh/apis/wechat_channels/backup/users/videos/list/)、[微信搜一搜视频号视频搜索（备用版）](https://dataxapi.com/zh/apis/wechat_channels/backup/videos/search/)、[微信视频号账号搜索](https://dataxapi.com/zh/apis/wechat_channels/users/search/)、[微信视频号作品互动数据](https://dataxapi.com/zh/apis/wechat_channels/videos/metrics/)、[微信视频号评论回复](https://dataxapi.com/zh/apis/wechat_channels/comments/replies/list/)、[微信视频号直播回放](https://dataxapi.com/zh/apis/wechat_channels/users/live_replays/list/)、[视频号视频下载（文件地址和解密）](https://dataxapi.com/zh/apis/wechat_channels/videos/media/get/)、[视频号视频转文字（逐字稿）](https://dataxapi.com/zh/apis/wechat_channels/videos/transcript/get/)

怎么做和常见问题：[如何获取视频号视频评论](https://dataxapi.com/zh/guides/wechat-channels-video-comments/)、[视频号有 API 吗？用 Python 取账号作品和评论（2026）](https://dataxapi.com/zh/guides/wechat-channels-api-python/)、[视频号数据怎么获取？](https://dataxapi.com/zh/answers/how-to-get-wechat-channels-data/)、[微信数据接口有哪些？公众号、视频号、搜一搜能取什么（2026）](https://dataxapi.com/zh/answers/wechat-data-apis/)、[微信视频号评论可以导出吗（2026）](https://dataxapi.com/zh/answers/export-wechat-channels-comments/)、[公众号、视频号 MCP：在 Claude、Cursor 里查微信数据（2026）](https://dataxapi.com/zh/answers/wechat-mcp/)、[给 AI 和 agent 用的视频号数据接口：返回省 token、Claude 和 Cursor 直接调（2026）](https://dataxapi.com/zh/answers/wechat-channels-api-for-ai-agents/)、[视频号播放量在哪看？别人的视频号作品能查到哪些数据（2026）](https://dataxapi.com/zh/answers/wechat-channels-play-count/)、[怎么批量查账号和评论的 IP 属地？8 个平台 28 个接口逐项对照（2026）](https://dataxapi.com/zh/answers/ip-location-by-platform/)、[视频号数据怎么采集？视频号助手、搜一搜、数据接口怎么选（2026）](https://dataxapi.com/zh/answers/how-to-collect-wechat-channels-data/)

用到这个接口的 Skills：[评论与口碑](https://dataxapi.com/zh/skills/comments/)

相关：[微信视频号的全部接口](https://dataxapi.com/zh/apis/wechat_channels/)、[社交媒体数据](https://dataxapi.com/zh/categories/social/)、[这件事在 13 个平台上的对照](https://dataxapi.com/zh/roles/posts-comments-list/)、[评论对象的字段](https://dataxapi.com/zh/docs/objects/comment/)

## 常见问题

### 微信视频号作品评论 API 多少钱？

$0.0200 一次。单次最高扣费 $0.0200。

### 什么情况下不收费？

出错和超时不收费。

### 一次返回多少条？怎么翻页？

每页约 24 条，最多 30 条。每页条数由平台决定，不收 limit。取下一页时把 page.next_cursor 作为 cursor 带上；游标有效期 1 小时。最后一页的 page.has_more 是 false。

### 对象不存在会怎样？

返回 404 not_found。报错里的 charged 和 amount 写明这次扣了多少。reason 写明是哪一种：not_found（不存在）或 private_or_deleted（私密或已删除）。

---

最后核对于 2026-11-26 12:17 UTC。目录修订号 0051cce45e9530b9。 [网页版](https://dataxapi.com/zh/apis/wechat_channels/videos/comments/list/)
