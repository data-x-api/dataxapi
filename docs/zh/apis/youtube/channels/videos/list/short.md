# YouTube 频道短视频 API

这是 YouTube 频道视频 API 带 `type=short` 的用法。按频道编号或账号名取一页该 YouTube 频道的视频或 Shorts，可按最新或最热排：标题、简介、发布时间、播放数、点赞数、时长。每次约 30 条，最多 60 条；$0.0020 一次。出错和超时不收费。

- 地址：`GET https://api.dataxapi.com/v1/youtube/channels/videos/list`
- 编号：`youtube.channels.videos.list`
- 所属接口：[YouTube 频道视频 API](https://dataxapi.com/zh/apis/youtube/channels/videos/list/), `type=short`
- 价格：$0.0020 / 次
- 当前状态不写在这一页上（页面是快照），实时读：`GET https://api.dataxapi.com/v1/catalog/status`
- 返回：每页最多 60 条, 一页，带翻下一页的游标
- 返回标准的内容结构，各平台相同
- [在 Playground 里跑一次](https://dataxapi.com/zh/console/playground/?capability=youtube.channels.videos.list&params=%7B%22id%22%3A%22UC_x5XG1OV2P6uZZ5FSM9Ttw%22%2C%22type%22%3A%22short%22%7D)
- 英文名：[YouTube channel Shorts API](https://dataxapi.com/apis/youtube/channels/videos/list/short/)

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | 文本 | `id`、`username` 里给且只给一个 | 频道编号，UC 开头。示例：`UC_x5XG1OV2P6uZZ5FSM9Ttw`。 |
| `username` | 文本 | `id`、`username` 里给且只给一个 | 频道的账号名，不带 @。示例：`NASA`。 |
| `type` | 文本 |  | 这一页固定为 `type=short`。取普通视频，还是 Shorts。取值：`video`（默认）、`short`。示例：`short`。 |
| `sort` | 文本 |  | 按最新排，或按播放数排。取值：`latest`（默认）、`popular`。示例：`latest`。 |
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
| `text` | 文本 | 正文。在这个平台上：视频简介。长文本：精简档只保留前 500 个字符，并在 `warnings` 里写明。 | `compact` | 有 |
| `lang` | 文本 | 正文的语言。 | `standard` | 这个接口不提供 |
| `published_at` | 时间 | 发布时间。 | `compact` | 有 |
| `author` | 对象 | 作者。 | `compact` | 看请求形式 |
| `author.id` | 文本 | 作者的账号编号。 | `compact` | 看请求形式 |
| `author.username` | 文本 | 作者的账号名。 | `compact` | 看请求形式 |
| `author.name` | 文本 | 作者的显示名。 | `compact` | 看请求形式 |
| `author.avatar_url` | 链接 | 作者头像。 | `standard` | 看请求形式 |
| `author.verified` | 是否 | 作者是否认证。 | `standard` | 这个接口不提供 |
| `author.followers` | 整数 | 作者的粉丝数。 | `standard` | 这个接口不提供 |
| `metrics` | 对象 | 互动数。 | `compact` | 有 |
| `metrics.likes` | 整数 | 点赞数。 | `compact` | 有 |
| `metrics.comments` | 整数 | 评论数。 | `compact` | 看请求形式 |
| `metrics.shares` | 整数 | 分享数。 | `compact` | 平台没有 |
| `metrics.favorites` | 整数 | 收藏数。 | `compact` | 平台没有 |
| `metrics.views` | 整数 | 播放或阅读数。 | `compact` | 有 |
| `metrics.reposts` | 整数 | 转发数。 | `compact` | 平台没有 |
| `images` | 链接列表 | 图片地址。在这个平台上：视频封面。 | `standard` | 有 |
| `hashtags` | 文本列表 | 话题标签，不带 #。 | `standard` | 这个接口不提供 |
| `mentions` | 对象列表 | 正文里提及的账号。 | `standard` | 这个接口不提供 |
| `mentions[].id` | 文本 | 账号编号。 | `standard` | 这个接口不提供 |
| `mentions[].username` | 文本 | 账号名。 | `standard` | 这个接口不提供 |
| `mentions[].name` | 文本 | 显示名。 | `standard` | 这个接口不提供 |
| `is_pinned` | 是否 | 是否被作者置顶。 | `standard` | 平台没有 |
| `post_id` | 文本 | 它回复的那条内容所在的主帖编号；不是回复则为 null。 | `compact` | 平台没有 |
| `parent_id` | 文本 | 它直接回复的那一条的编号；不是回复则为 null。 | `compact` | 平台没有 |
| `root_id` | 文本 | 所在回复串里第一层那一条的编号。 | `compact` | 平台没有 |
| `ext.duration` | 数字 | 视频时长，秒。 | `full` | 有 |
| `approximate` | 对象列表 | 这一条里哪些数是约数或下限；都是准确值时不出现。 | `compact` | 有 |
| `approximate[].field` | 文本 | 字段的路径，如 metrics.views。 | `compact` | 有 |
| `approximate[].kind` | 文本 | 约数，还是下限。取值：`approximate`、`lower_bound`。 | `compact` | 有 |

某一条本来就没有这个值时，字段给 `null`。这个接口给不了的字段不出现，统一列在 `meta.unavailable`。

带 `id`, `type=video`, `sort=latest` 时：不返回 `metrics.comments`。

带 `id`, `type=video`, `sort=popular` 时：不返回 `metrics.comments`。

带 `id`, `type=short`, `sort=latest` 时：不返回 `author`。

带 `id`, `type=short`, `sort=popular` 时：不返回 `author`。

带 `username`, `type=video`, `sort=latest` 时：不返回 `metrics.comments`。

带 `username`, `type=video`, `sort=popular` 时：不返回 `metrics.comments`。

带 `username`, `type=short`, `sort=latest` 时：不返回 `author`。

带 `username`, `type=short`, `sort=popular` 时：不返回 `author`。

## 翻页

每页约 30 条，最多 60 条。每页条数由平台决定，不收 `limit`。

取下一页时把 `page.next_cursor` 作为 `cursor` 带上；游标有效期 1 小时。最后一页的 `page.has_more` 是 false。

带 `id`, `type=short`, `sort=latest` 时：一次给全，不翻页。

带 `id`, `type=short`, `sort=popular` 时：一次给全，不翻页。

带 `username`, `type=short`, `sort=latest` 时：一次给全，不翻页。

带 `username`, `type=short`, `sort=popular` 时：一次给全，不翻页。

## 什么时候收费

| 情况 | 收费 |
| --- | --- |
| 返回了数据 | $0.0020，每次调用收一次 |
| 每翻一页 | 按一次调用另收 |
| 参数不合法、出错、超时 | 不收费 |
| 单次最高扣费 | $0.0020 (带 `X-Max-Price` 可以设自己的上限，超过就不执行) |

价格读取于 2026-11-26 12:17 UTC，按价目版本 22，2026-11-25 13:46 UTC 起生效；在 Playground 里运行前会再读一次当前价格。

## 对象不存在时

分不清“频道不存在”和“频道没有这类视频”：两种情况都返回空结果，不返回 404。

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
curl -G "https://api.dataxapi.com/v1/youtube/channels/videos/list" \
  --data-urlencode "id=UC_x5XG1OV2P6uZZ5FSM9Ttw" \
  --data-urlencode "type=short" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
# pip install dataxapi
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.youtube.channels.videos.list(id="UC_x5XG1OV2P6uZZ5FSM9Ttw", type="short")
print(result["data"]["items"])
```

### TypeScript

```typescript
// npm i @dataxapi/sdk
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.youtube.channels.videos.list({ id: "UC_x5XG1OV2P6uZZ5FSM9Ttw", type: "short" });
console.log(result.data.items);
```

### 命令行

```bash
dataxapi call youtube.channels.videos.list id=UC_x5XG1OV2P6uZZ5FSM9Ttw type=short
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

把这段加进你的 MCP 客户端，然后让你的 AI 调用 `youtube.channels.videos.list`。

## 返回

还没有带 `type=short` 录制的返回。接口自己的页面上有一份带 `type=video` 录制的；这个取值的返回结构相同。

### 400

按规范写的示例，不是录下的返回。

```json
{
  "code": "invalid_params",
  "request_id": "e358e7fd-ba84-41cf-afd2-7df6468a8d6f",
  "message": "A parameter is invalid",
  "message_zh": "参数不合法",
  "charged": false,
  "retry": "after_fix",
  "retry_after_seconds": null,
  "param": null,
  "problems": ["give exactly one of id, username"],
  "docs_url": "https://dataxapi.com/docs/errors#invalid_params"
}
```

### 402

按规范写的示例，不是录下的返回。

```json
{
  "code": "insufficient_balance",
  "request_id": "779ba882-96e8-4b0e-b67a-c0e5a5de8a7a",
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
  "request_id": "d46700fb-ea03-4481-b0dd-3523826ce33b",
  "message": "No result came back this time and nothing was charged; retry shortly",
  "message_zh": "这次没有取到结果，没有扣费，可以稍后重试",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

## 在你的 AI 里用它

`dataxapi setup` 给这台电脑上的 AI 代理（Claude Code、Codex、Cursor）装好 DataXAPI 的 MCP 服务和基础技能。Key 从环境变量 DATAXAPI_API_KEY 读，不写进任何文件。

MCP 服务地址：`https://api.dataxapi.com/mcp`。你的客户端要填的配置在本页请求示例的“MCP”页签里；接好后让你的 AI 调用 `youtube.channels.videos.list`。

或者把这段话贴给任意一个 AI：

> 读一下 https://dataxapi.com/zh/apis/youtube/channels/videos/list/short.md，然后帮我用 DataXAPI 的接口 youtube.channels.videos.list（YouTube 频道短视频）。

[在 ChatGPT 里打开](https://chatgpt.com/?q=%E8%AF%BB%E4%B8%80%E4%B8%8B%20https%3A%2F%2Fdataxapi.com%2Fzh%2Fapis%2Fyoutube%2Fchannels%2Fvideos%2Flist%2Fshort.md%EF%BC%8C%E7%84%B6%E5%90%8E%E5%B8%AE%E6%88%91%E7%94%A8%20DataXAPI%20%E7%9A%84%E6%8E%A5%E5%8F%A3%20youtube.channels.videos.list%EF%BC%88YouTube%20%E9%A2%91%E9%81%93%E7%9F%AD%E8%A7%86%E9%A2%91%EF%BC%89%E3%80%82) · [在 Claude 里打开](https://claude.ai/new?q=%E8%AF%BB%E4%B8%80%E4%B8%8B%20https%3A%2F%2Fdataxapi.com%2Fzh%2Fapis%2Fyoutube%2Fchannels%2Fvideos%2Flist%2Fshort.md%EF%BC%8C%E7%84%B6%E5%90%8E%E5%B8%AE%E6%88%91%E7%94%A8%20DataXAPI%20%E7%9A%84%E6%8E%A5%E5%8F%A3%20youtube.channels.videos.list%EF%BC%88YouTube%20%E9%A2%91%E9%81%93%E7%9F%AD%E8%A7%86%E9%A2%91%EF%BC%89%E3%80%82)

## 相关

这是 DataXAPI 社交媒体数据的一部分。同一把 Key 还能用：达人、广告、电商。

同一件事的其他平台：[B站用户投稿](https://dataxapi.com/zh/apis/bilibili/users/videos/list/)、[抖音用户视频](https://dataxapi.com/zh/apis/douyin/users/videos/list/)、[快手用户作品](https://dataxapi.com/zh/apis/kuaishou/users/videos/list/)、[Telegram 频道消息](https://dataxapi.com/zh/apis/telegram/channels/messages/list/)、[Facebook 主页帖子](https://dataxapi.com/zh/apis/facebook/pages/posts/list/)、[LinkedIn 公司帖子](https://dataxapi.com/zh/apis/linkedin/companies/posts/list/)、[Threads 用户帖子](https://dataxapi.com/zh/apis/threads/users/posts/list/)、[Instagram 用户帖子](https://dataxapi.com/zh/apis/instagram/users/posts/list/)、[TikTok 用户作品](https://dataxapi.com/zh/apis/tiktok/users/videos/list/)、[微博用户微博](https://dataxapi.com/zh/apis/weibo/users/posts/list/)、[X 用户帖子列表](https://dataxapi.com/zh/apis/x/users/posts/list/)、[小红书用户笔记](https://dataxapi.com/zh/apis/xiaohongshu/users/notes/list/)、[微信视频号用户作品](https://dataxapi.com/zh/apis/wechat_channels/users/videos/list/)、[微信公众号文章列表](https://dataxapi.com/zh/apis/wechat_mp/accounts/articles/list/)、[微信视频号用户作品（备用版）](https://dataxapi.com/zh/apis/wechat_channels/backup/users/videos/list/)、[Reddit 用户帖子](https://dataxapi.com/zh/apis/reddit/users/posts/list/)、[知乎用户回答](https://dataxapi.com/zh/apis/zhihu/users/answers/list/)、[知乎用户文章](https://dataxapi.com/zh/apis/zhihu/users/articles/list/)、[知乎用户想法](https://dataxapi.com/zh/apis/zhihu/users/pins/list/)、[B站用户投稿（备用版）](https://dataxapi.com/zh/apis/bilibili/backup/users/videos/list/)、[抖音用户视频（备用版）](https://dataxapi.com/zh/apis/douyin/backup/users/videos/list/)

YouTube的接口：[YouTube 频道资料](https://dataxapi.com/zh/apis/youtube/channels/get/)、[YouTube 频道搜索](https://dataxapi.com/zh/apis/youtube/channels/search/)、[YouTube 频道视频](https://dataxapi.com/zh/apis/youtube/channels/videos/list/)、[YouTube 评论回复](https://dataxapi.com/zh/apis/youtube/comments/replies/list/)、[YouTube 视频评论](https://dataxapi.com/zh/apis/youtube/videos/comments/list/)、[YouTube 视频详情](https://dataxapi.com/zh/apis/youtube/videos/get/)、[YouTube 视频搜索](https://dataxapi.com/zh/apis/youtube/videos/search/)、[YouTube 视频字幕](https://dataxapi.com/zh/apis/youtube/videos/transcript/get/)、[YouTube 频道帖子](https://dataxapi.com/zh/apis/youtube/channels/posts/list/)、[YouTube 帖子详情](https://dataxapi.com/zh/apis/youtube/posts/get/)

用到这个接口的 Skills：[竞品账号监测](https://dataxapi.com/zh/skills/competitors/)、[账号体检](https://dataxapi.com/zh/skills/account-audit/)、[博主视频转文字](https://dataxapi.com/zh/skills/creator-transcripts/)

所属接口和其他取值：[YouTube 频道视频 API](https://dataxapi.com/zh/apis/youtube/channels/videos/list/)

相关：[YouTube的全部接口](https://dataxapi.com/zh/apis/youtube/)、[社交媒体数据](https://dataxapi.com/zh/categories/social/)、[这件事在 17 个平台上的对照](https://dataxapi.com/zh/roles/accounts-posts-list/)、[内容对象的字段](https://dataxapi.com/zh/docs/objects/post/)

## 常见问题

### YouTube 频道短视频 API 多少钱？

$0.0020 一次。单次最高扣费 $0.0020。

### 什么情况下不收费？

出错和超时不收费。

### 一次返回多少条？怎么翻页？

每页约 30 条，最多 60 条。每页条数由平台决定，不收 limit。取下一页时把 page.next_cursor 作为 cursor 带上；游标有效期 1 小时。最后一页的 page.has_more 是 false。

### 对象不存在会怎样？

分不清“频道不存在”和“频道没有这类视频”：两种情况都返回空结果，不返回 404。

---

最后核对于 2026-11-26 12:17 UTC。目录修订号 0051cce45e9530b9。 [网页版](https://dataxapi.com/zh/apis/youtube/channels/videos/list/short/)
