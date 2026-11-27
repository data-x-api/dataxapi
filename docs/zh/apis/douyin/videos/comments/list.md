# 抖音视频评论 API

按视频编号取一页抖音评论：正文、评论者、点赞数、回复数、发布时间。每次最多 20 条；$0.0020 一次。出错和超时不收费。

- 地址：`GET https://api.dataxapi.com/v1/douyin/videos/comments/list`
- 编号：`douyin.videos.comments.list`
- 也叫：抖音评论区、视频评论列表
- 价格：$0.0020 / 次
- 当前状态不写在这一页上（页面是快照），实时读：`GET https://api.dataxapi.com/v1/catalog/status`
- 返回：每页 20 条, 一页，带翻下一页的游标
- 返回标准的评论结构，各平台相同
- `id` 就在链接里：`douyin.com/video/<id>`。也可以把整条链接传给 `url`。
- [在 Playground 里跑一次](https://dataxapi.com/zh/console/playground/?capability=douyin.videos.comments.list&params=%7B%22id%22%3A%227694940173372575014%22%7D)
- 英文名：[Douyin video comments API](https://dataxapi.com/apis/douyin/videos/comments/list/)

## 能拿到什么

2026-10-16 18:31 UTC 录下的真实返回，这里是前 3 行。

| 字段 | 值 |
| --- | --- |
| published_at | 2026-10-10 07:45 UTC |
| metrics.likes | 11,209 |
| metrics.comments | 1 |

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | 文本 | `id`、`url` 里给且只给一个 | 视频编号，一串数字。手里只有链接或分享口令时，填到 url。示例：`7694940173372575014`。 |
| `url` | 文本 | `id`、`url` 里给且只给一个 | 视频链接，原样粘贴即可：网页链接 https://www.douyin.com/video/…、带 modal_id 的网页链接、手机分享页链接、App 复制出来的 v.douyin.com 短链接，或含这些链接的整段分享口令（“复制打开抖音，看看……”）。短链接由我们打开一次，看它跳到哪条视频。示例：`https://www.douyin.com/video/7694940173372575014`。长链接：`https://www.douyin.com/video/7694940173372575014`。带链接的分享文案：`7.69 复制打开抖音，看看【示例的作品】 https://www.douyin.com/video/7694940173372575014 复制此链接，打开Dou音搜索，直接观看视频！`。 |
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
| `author.name` | 文本 | 评论者的显示名。 | `compact` | 有 |
| `author.avatar_url` | 链接 | 评论者头像。 | `standard` | 有 |
| `metrics` | 对象 | 互动数。 | `compact` | 有 |
| `metrics.likes` | 整数 | 点赞数。 | `compact` | 有 |
| `metrics.comments` | 整数 | 回复数。 | `compact` | 有 |
| `post_id` | 文本 | 所属内容的编号。 | `compact` | 有 |
| `parent_id` | 文本 | 它直接回复的那条评论的编号；一级评论为 null。 | `compact` | 有 |
| `root_id` | 文本 | 所在回复串的一级评论编号；一级评论为 null。 | `compact` | 有 |
| `ext.ip_location` | 文本 | 平台显示的 IP 属地。 | `full` | 有 |
| `approximate` | 对象列表 | 这一条里哪些数是约数或下限；都是准确值时不出现。 | `compact` | 有 |
| `approximate[].field` | 文本 | 字段的路径，如 metrics.views。 | `compact` | 有 |
| `approximate[].kind` | 文本 | 约数，还是下限。取值：`approximate`、`lower_bound`。 | `compact` | 有 |

某一条本来就没有这个值时，字段给 `null`。这个接口给不了的字段不出现，统一列在 `meta.unavailable`。

每条数据的典型体积：`compact` 365 B、`standard` 521 B、`full` 553 B（按 2026-10-16 18:31 UTC 录下的那次返回量的）。

## 翻页

每页 20 条。每页条数由平台决定，不收 `limit`。

取下一页时把 `page.next_cursor` 作为 `cursor` 带上；游标有效期 1 小时。最后一页的 `page.has_more` 是 false。

## 什么时候收费

| 情况 | 收费 |
| --- | --- |
| 返回了数据 | $0.0020，每次调用收一次 |
| 每翻一页 | 按一次调用另收 |
| 参数不合法、出错、超时 | 不收费 |
| 单次最高扣费 | $0.0020 (带 `X-Max-Price` 可以设自己的上限，超过就不执行) |

价格读取于 2026-11-27 06:18 UTC，按价目版本 23，2026-11-27 06:13 UTC 起生效；在 Playground 里运行前会再读一次当前价格。

## 对象不存在时

分不清“视频不存在”和“视频下没有评论”：两种情况都返回空结果，不返回 404。

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
curl -G "https://api.dataxapi.com/v1/douyin/videos/comments/list" \
  --data-urlencode "id=7694940173372575014" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
# pip install dataxapi
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.douyin.videos.comments.list(id="7694940173372575014")
print(result["data"]["items"])
```

### TypeScript

```typescript
// npm i @dataxapi/sdk
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.douyin.videos.comments.list({ id: "7694940173372575014" });
console.log(result.data.items);
```

### 命令行

```bash
dataxapi call douyin.videos.comments.list id=7694940173372575014
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

把这段加进你的 MCP 客户端，然后让你的 AI 调用 `douyin.videos.comments.list`。

## 返回

### 200

取自 2026-10-16 18:31 UTC 录下的真实返回。名字、正文和编号是示例，链接也是，都不是录到的原文（页面不展示任何人的个人信息）；数字是原样。长列表做了截断。请求号、游标和余额是示意。

返回大小：标准档 10.6 KB（精简 7.6 KB，完整 11.2 KB）。

```jsonc
{
  "code": "ok",
  "request_id": "d42da88d-b7ed-4b0d-9190-4b171bfc73ad",
  "data": {
    "items": [
      {
        "id": "7544703737319021316",
        "text": "拍得好舒服，看了好几遍",
        "published_at": "2026-10-10T07:45:43.000Z",
        "author": {
          "id": "MS4wLjABAAAASYaIbhAX0MPyFQ_-aWJ7QWUFF8a5fMOppwdnFl0eOFd",
          "username": "nanfeng_0721",
          "name": "南边的风",
          "avatar_url": "https://p3-pc.douyinpic.com/aweme/100x100/aweme-avatar/tos-cn-avt-0015_ec3a5fcd08ca5afb5397.jpeg"
        },
        "metrics": { "likes": 11209, "comments": 1 },
        "post_id": "7654977487690830406",
        "parent_id": null,
        "root_id": null
      },
      // … 另有 19 条
    ]
  },
  "page": {
    "next_cursor": "c1.WJBi7NXZjb_3e9vNCUTP2jkcLJBy9Nk7njwbaUrK",
    "cursor_expires_at": "2026-10-16T19:31:05.000Z",
    "has_more": true,
    "returned": 20
  },
  "warnings": [],
  "meta": {
    "capability": "douyin.videos.comments.list",
    "result_status": "complete",
    "fetched_at": "2026-10-16T18:31:05.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": { "url": "platform" },
    "billing": {
      "amount": "0.002",
      "currency": "USD",
      "balance_after": "9.998"
    }
  }
}
```

### 空结果

取自 2026-10-16 18:31 UTC 录下的真实返回。请求号和余额是示意。

返回大小：标准档 426 B（精简 426 B，完整 426 B）。

```jsonc
{
  "code": "ok",
  "request_id": "a7aca082-536c-4bb4-bd39-6212e8499c00",
  "data": { "items": [] },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 0
  },
  "warnings": [],
  "meta": {
    "capability": "douyin.videos.comments.list",
    "result_status": "empty",
    "fetched_at": "2026-10-16T18:31:31.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": { "url": "platform" },
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
  "request_id": "ce62b803-7e36-4875-ad86-c744b3393e88",
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
  "request_id": "5bdb6d4c-f90e-4a94-affd-0a2d2697798d",
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
  "request_id": "6c715717-f66c-4f79-bb30-df7c5bab8aad",
  "message": "No result came back this time and nothing was charged; retry shortly",
  "message_zh": "这次没有取到结果，没有扣费，可以稍后重试",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

这份录制的返回：平台原始 JSON 2.3 万 token，DataXAPI 的 JSON 4,403 token，AI 通过 DataXAPI 的 MCP 读到 2,978 token，少 87%（2026-11-06 统计）。

[这份示例的 JSON 文件](https://dataxapi.com/apis/douyin/videos/comments/list.example.json)

## 在你的 AI 里用它

`dataxapi setup` 给这台电脑上的 AI 代理（Claude Code、Codex、Cursor）装好 DataXAPI 的 MCP 服务和基础技能。Key 从环境变量 DATAXAPI_API_KEY 读，不写进任何文件。

MCP 服务地址：`https://api.dataxapi.com/mcp`。你的客户端要填的配置在本页请求示例的“MCP”页签里；接好后让你的 AI 调用 `douyin.videos.comments.list`。

或者把这段话贴给任意一个 AI：

> 读一下 https://dataxapi.com/zh/apis/douyin/videos/comments/list.md，然后帮我用 DataXAPI 的接口 douyin.videos.comments.list（抖音视频评论）。

[在 ChatGPT 里打开](https://chatgpt.com/?q=%E8%AF%BB%E4%B8%80%E4%B8%8B%20https%3A%2F%2Fdataxapi.com%2Fzh%2Fapis%2Fdouyin%2Fvideos%2Fcomments%2Flist.md%EF%BC%8C%E7%84%B6%E5%90%8E%E5%B8%AE%E6%88%91%E7%94%A8%20DataXAPI%20%E7%9A%84%E6%8E%A5%E5%8F%A3%20douyin.videos.comments.list%EF%BC%88%E6%8A%96%E9%9F%B3%E8%A7%86%E9%A2%91%E8%AF%84%E8%AE%BA%EF%BC%89%E3%80%82) · [在 Claude 里打开](https://claude.ai/new?q=%E8%AF%BB%E4%B8%80%E4%B8%8B%20https%3A%2F%2Fdataxapi.com%2Fzh%2Fapis%2Fdouyin%2Fvideos%2Fcomments%2Flist.md%EF%BC%8C%E7%84%B6%E5%90%8E%E5%B8%AE%E6%88%91%E7%94%A8%20DataXAPI%20%E7%9A%84%E6%8E%A5%E5%8F%A3%20douyin.videos.comments.list%EF%BC%88%E6%8A%96%E9%9F%B3%E8%A7%86%E9%A2%91%E8%AF%84%E8%AE%BA%EF%BC%89%E3%80%82)

## 相关

这是 DataXAPI 社交媒体数据的一部分。同一把 Key 还能用：达人、广告、电商。

同一件事的其他平台：[B站视频评论](https://dataxapi.com/zh/apis/bilibili/videos/comments/list/)、[快手作品评论](https://dataxapi.com/zh/apis/kuaishou/videos/comments/list/)、[Facebook 帖子评论](https://dataxapi.com/zh/apis/facebook/posts/comments/list/)、[Instagram 帖子评论](https://dataxapi.com/zh/apis/instagram/posts/comments/list/)、[TikTok 视频评论](https://dataxapi.com/zh/apis/tiktok/videos/comments/list/)、[微博评论](https://dataxapi.com/zh/apis/weibo/posts/comments/list/)、[X 帖子回复列表](https://dataxapi.com/zh/apis/x/posts/replies/list/)、[小红书笔记评论](https://dataxapi.com/zh/apis/xiaohongshu/notes/comments/list/)、[YouTube 视频评论](https://dataxapi.com/zh/apis/youtube/videos/comments/list/)、[微信视频号作品评论](https://dataxapi.com/zh/apis/wechat_channels/videos/comments/list/)、[Reddit 帖子评论](https://dataxapi.com/zh/apis/reddit/posts/comments/list/)、[知乎回答评论](https://dataxapi.com/zh/apis/zhihu/answers/comments/list/)

抖音的接口：[抖音评论回复](https://dataxapi.com/zh/apis/douyin/comments/replies/list/)、[抖音话题视频](https://dataxapi.com/zh/apis/douyin/hashtags/videos/list/)、[抖音热榜](https://dataxapi.com/zh/apis/douyin/trends/list/)、[抖音用户资料](https://dataxapi.com/zh/apis/douyin/users/get/)、[抖音达人互动与粉丝趋势](https://dataxapi.com/zh/apis/douyin/users/history/)、[抖音用户搜索](https://dataxapi.com/zh/apis/douyin/users/search/)、[抖音用户视频](https://dataxapi.com/zh/apis/douyin/users/videos/list/)、[抖音视频评论](https://dataxapi.com/zh/apis/douyin/videos/comments/list/)、[抖音视频详情](https://dataxapi.com/zh/apis/douyin/videos/get/)、[抖音视频转文字（文案提取、逐字稿）](https://dataxapi.com/zh/apis/douyin/videos/transcript/get/)、[抖音视频播放量](https://dataxapi.com/zh/apis/douyin/videos/metrics/)、[抖音相关视频](https://dataxapi.com/zh/apis/douyin/videos/related/)、[抖音视频搜索](https://dataxapi.com/zh/apis/douyin/videos/search/)、[抖音视频榜](https://dataxapi.com/zh/apis/douyin/videos/trending/)、[抖音搜索框联想词](https://dataxapi.com/zh/apis/douyin/keywords/related/)、[抖音无水印视频和图片下载地址](https://dataxapi.com/zh/apis/douyin/videos/media/get/)、[抖音音乐详情（背景音乐 MP3 和使用人数）](https://dataxapi.com/zh/apis/douyin/music/get/)、[抖音用户视频（备用版）](https://dataxapi.com/zh/apis/douyin/backup/users/videos/list/)、[抖音视频搜索（备用版）](https://dataxapi.com/zh/apis/douyin/backup/videos/search/)

抖音巨量算数的接口：[抖音巨量算数品牌指数趋势](https://dataxapi.com/zh/apis/douyin/index/brands/history/)、[抖音巨量算数品牌指数对比](https://dataxapi.com/zh/apis/douyin/index/brands/metrics/)、[抖音巨量算数达人热门视频](https://dataxapi.com/zh/apis/douyin/index/creators/videos/list/)、[抖音巨量算数达人粉丝画像](https://dataxapi.com/zh/apis/douyin/index/creators/audience/get/)、[抖音巨量算数达人核心指标](https://dataxapi.com/zh/apis/douyin/index/creators/metrics/)、[抖音巨量算数关键词人群画像](https://dataxapi.com/zh/apis/douyin/index/keywords/audience/get/)、[抖音巨量算数关键词热度趋势](https://dataxapi.com/zh/apis/douyin/index/keywords/history/)、[抖音巨量算数关联词](https://dataxapi.com/zh/apis/douyin/index/keywords/related/)、[抖音巨量算数实时热点](https://dataxapi.com/zh/apis/douyin/index/trends/list/)、[抖音巨量算数关键词热门视频](https://dataxapi.com/zh/apis/douyin/index/videos/search/)

抖音星图的接口：[抖音星图达人商业报价](https://dataxapi.com/zh/apis/douyin/xingtu/creators/rates/get/)、[抖音星图达人搜索](https://dataxapi.com/zh/apis/douyin/xingtu/creators/search/)、[抖音星图达人资料](https://dataxapi.com/zh/apis/douyin/xingtu/creators/get/)、[抖音星图达人粉丝画像](https://dataxapi.com/zh/apis/douyin/xingtu/creators/audience/get/)、[抖音星图达人传播数据](https://dataxapi.com/zh/apis/douyin/xingtu/creators/metrics/)、[抖音星图达人作品表现](https://dataxapi.com/zh/apis/douyin/xingtu/creators/videos/list/)、[抖音星图达人内容热词](https://dataxapi.com/zh/apis/douyin/xingtu/creators/keywords/get/)、[抖音星图达人星图指数](https://dataxapi.com/zh/apis/douyin/xingtu/creators/scores/get/)、[抖音星图达人内容分布](https://dataxapi.com/zh/apis/douyin/xingtu/creators/content_mix/get/)、[抖音星图达人转化能力](https://dataxapi.com/zh/apis/douyin/xingtu/creators/conversion/get/)、[抖音星图营销活动日历](https://dataxapi.com/zh/apis/douyin/xingtu/campaigns/list/)、[抖音星图视频数据报告（播放量、完播率）](https://dataxapi.com/zh/apis/douyin/xingtu/videos/get/)、[抖音星图达人粉丝画像（备用版）](https://dataxapi.com/zh/apis/douyin/xingtu/backup/creators/audience/get/)

怎么做和常见问题：[如何批量导出抖音视频评论](https://dataxapi.com/zh/guides/douyin-video-comments/)、[抖音有 API 吗？用 Python 拉取视频和评论（2026）](https://dataxapi.com/zh/guides/douyin-api-python/)、[抖音数据怎么导出？](https://dataxapi.com/zh/answers/export-douyin-data/)、[抖音 aweme_id、modal_id 是什么？v.douyin.com 短链接怎么用？](https://dataxapi.com/zh/answers/douyin-aweme-id-modal-id/)、[抖音开放平台能查别人的视频和评论吗（2026）](https://dataxapi.com/zh/answers/douyin-open-platform-api/)、[小红书 Skill、抖音 Skill 怎么接（2026）](https://dataxapi.com/zh/answers/xiaohongshu-douyin-skill/)、[抖音评论怎么批量导出，挖用户需求（2026）](https://dataxapi.com/zh/answers/export-douyin-comments-user-needs/)、[BettaFish 没有数据怎么办：怎么接小红书、抖音的公开数据（2026）](https://dataxapi.com/zh/answers/bettafish-data-source/)、[抖音低粉爆款怎么找？能批量拉吗（2026）](https://dataxapi.com/zh/answers/douyin-low-fan-viral-videos/)、[抖音 a_bogus 和 x-bogus 是什么（2026）](https://dataxapi.com/zh/answers/douyin-a-bogus-x-bogus/)、[抖音 msToken 是什么（2026）](https://dataxapi.com/zh/answers/douyin-mstoken/)、[抖音接口怎么选：搜索、账号、评论各用哪个（2026）](https://dataxapi.com/zh/answers/which-douyin-api-to-use/)、[抖音 ttwid 是什么（2026）](https://dataxapi.com/zh/answers/douyin-ttwid/)、[抖音 verifyFp、s_v_web_id 是什么（2026）](https://dataxapi.com/zh/answers/douyin-verifyfp-s-v-web-id/)、[抖音数据接口有哪些？第三方接口和开放平台的区别，能取什么（2026）](https://dataxapi.com/zh/answers/douyin-third-party-data-apis/)、[有没有能让 Claude 查小红书、抖音、公众号的 MCP？（2026）](https://dataxapi.com/zh/answers/china-social-data-mcp/)、[抖音 MCP：在 Claude、Cursor 里查抖音视频和评论（2026）](https://dataxapi.com/zh/answers/douyin-mcp/)、[中文社媒品牌监测怎么做？微博、抖音、小红书一起查（2026）](https://dataxapi.com/zh/answers/chinese-social-media-brand-monitoring/)、[用户口碑怎么批量取？小红书、抖音评论和电商评价（2026）](https://dataxapi.com/zh/answers/product-reviews-chinese-social-media/)、[哪个社媒数据接口最适合接给 AI？看一次返回占多少 token（2026）](https://dataxapi.com/zh/answers/social-media-api-for-ai-agents/)、[社媒接口返回太长，AI 上下文被塞满、token 烧得快怎么办？](https://dataxapi.com/zh/answers/api-response-too-many-tokens/)、[给 AI 和 agent 用的抖音数据接口：返回省 token、Claude 和 Cursor 直接调（2026）](https://dataxapi.com/zh/answers/douyin-api-for-ai-agents/)

用到这个接口的 Skills：[评论与口碑](https://dataxapi.com/zh/skills/comments/)

相关：[抖音的全部接口](https://dataxapi.com/zh/apis/douyin/)、[社交媒体数据](https://dataxapi.com/zh/categories/social/)、[这件事在 13 个平台上的对照](https://dataxapi.com/zh/roles/posts-comments-list/)、[评论对象的字段](https://dataxapi.com/zh/docs/objects/comment/)

## 常见问题

### 抖音视频评论 API 多少钱？

$0.0020 一次。单次最高扣费 $0.0020。

### 什么情况下不收费？

出错和超时不收费。

### 一次返回多少条？怎么翻页？

每页 20 条。每页条数由平台决定，不收 limit。取下一页时把 page.next_cursor 作为 cursor 带上；游标有效期 1 小时。最后一页的 page.has_more 是 false。

### 对象不存在会怎样？

分不清“视频不存在”和“视频下没有评论”：两种情况都返回空结果，不返回 404。

---

最后核对于 2026-11-27 06:18 UTC。目录修订号 0264e2d6dd4ff743。 [网页版](https://dataxapi.com/zh/apis/douyin/videos/comments/list/)
