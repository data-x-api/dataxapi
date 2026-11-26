# 微信公众号实时查找 API

按搜索词在微信搜一搜里找公众号和服务号，最像的排前面，后面可能跟着不太相关的账号：原始编号、微信号、名称、简介、头像、是否认证、主体名称、原创文章数。按次计费；不带粉丝和阅读数，要这些的估计值用 wechat_mp.accounts.search。每次约 8 条，最多 14 条；$0.0200 一次。出错和超时不收费。

- 地址：`GET https://api.dataxapi.com/v1/wechat/accounts/search`
- 编号：`wechat.accounts.search`
- 也叫：公众号名字查编号、公众号原始ID查询、公众号编号查询、按名字找公众号编号
- 价格：$0.0200 / 次
- 当前状态不写在这一页上（页面是快照），实时读：`GET https://api.dataxapi.com/v1/catalog/status`
- 返回：每页最多 14 条, 一页，带翻下一页的游标
- 返回标准的账号结构，各平台相同
- [在 Playground 里跑一次](https://dataxapi.com/zh/console/playground/?capability=wechat.accounts.search&params=%7B%22query%22%3A%2236%E6%B0%AA%22%7D)
- 英文名：[WeChat Official Account live search API](https://dataxapi.com/apis/wechat/accounts/search/)

## 能拿到什么

2026-11-02 11:25 UTC 录下的真实返回，这里是前 1 行。

| 字段 | 值 |
| --- | --- |
| verified | true |

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `query` | 文本 | 是 | 公众号名称或关键词。示例：`36氪`。 |
| `cursor` | 文本 |  | 上一页返回的游标。把上一页的 `page.next_cursor` 原样带上。每翻一页按一次调用收费。 |
| `view` | 文本 |  | 返回档位。三档价格相同。取值：`compact`、`standard`（默认）、`full`。 |
| `fields` | 文本列表 |  | 只要这些字段。按路径写，例如 `author.name`。 |

## 返回字段

`data.items` 是账号对象的列表。稳定：字段只增不改。

返回分三档：精简 `compact`（最常用的字段，长文本截短）、标准 `standard`（默认，全部标准字段）、完整 `full`（再加 `ext`，也就是这个平台特有的字段）。字段从表里写的那一档起出现，更大的档位也带。

| 字段 | 类型 | 说明 | 起始档位 | 这个接口 |
| --- | --- | --- | --- | --- |
| `id` | 文本 | 编号。在这个平台上：公众号原始编号，大多 gh_ 开头，也有别的开头的；可以直接传给 wechat_mp.accounts.articles.list 和 wechat_mp.accounts.get。 | `compact` | 有 |
| `username` | 文本 | 账号名。在这个平台上：微信号：在微信里搜索添加时输入的那个；没设的为 null。 | `compact` | 有 |
| `name` | 文本 | 显示名。 | `compact` | 有 |
| `url` | 链接 | 主页链接。 | `compact` | 平台没有 |
| `bio` | 文本 | 简介。长文本：精简档只保留前 500 个字符，并在 `warnings` 里写明。 | `compact` | 有 |
| `avatar_url` | 链接 | 头像。 | `standard` | 有 |
| `verified` | 是否 | 是否认证。 | `standard` | 有 |
| `created_at` | 时间 | 账号创建时间。 | `standard` | 这个接口不提供 |
| `metrics` | 对象 | 账号的数字。 | `compact` | 这个接口不提供 |
| `metrics.followers` | 整数 | 粉丝数。 | `compact` | 这个接口不提供 |
| `metrics.following` | 整数 | 关注数。 | `compact` | 这个接口不提供 |
| `metrics.posts` | 整数 | 发布的内容数。 | `compact` | 这个接口不提供 |
| `ext.owner_name` | 文本 | 账号主体的名称（公司、机构）；没显示的为 null。 | `full` | 有 |
| `ext.original_articles` | 整数 | 平台显示的原创文章数；服务号和没显示的为 null。 | `full` | 有 |
| `approximate` | 对象列表 | 这一条里哪些数是约数或下限；都是准确值时不出现。 | `compact` | 有 |
| `approximate[].field` | 文本 | 字段的路径，如 metrics.views。 | `compact` | 有 |
| `approximate[].kind` | 文本 | 约数，还是下限。取值：`approximate`、`lower_bound`。 | `compact` | 有 |

某一条本来就没有这个值时，字段给 `null`。这个接口给不了的字段不出现，统一列在 `meta.unavailable`。

每条数据的典型体积：`compact` 167 B、`standard` 335 B、`full` 422 B（按 2026-11-02 11:25 UTC 录下的那次返回量的）。

## 翻页

每页约 8 条，最多 14 条。每页条数由平台决定，不收 `limit`。

取下一页时把 `page.next_cursor` 作为 `cursor` 带上；游标有效期 1 小时。最后一页的 `page.has_more` 是 false。

## 什么时候收费

| 情况 | 收费 |
| --- | --- |
| 返回了数据 | $0.0200，每次调用收一次 |
| 每翻一页 | 按一次调用另收 |
| 参数不合法、出错、超时 | 不收费 |
| 单次最高扣费 | $0.0200 (带 `X-Max-Price` 可以设自己的上限，超过就不执行) |

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
curl -G "https://api.dataxapi.com/v1/wechat/accounts/search" \
  --data-urlencode "query=36氪" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
# pip install dataxapi
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.wechat.accounts.search(query="36氪")
print(result["data"]["items"])
```

### TypeScript

```typescript
// npm i @dataxapi/sdk
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.wechat.accounts.search({ query: "36氪" });
console.log(result.data.items);
```

### 命令行

```bash
dataxapi call wechat.accounts.search 'query=36氪'
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

把这段加进你的 MCP 客户端，然后让你的 AI 调用 `wechat.accounts.search`。

## 返回

### 200

取自 2026-11-02 11:25 UTC 录下的真实返回。名字、正文和编号是示例，链接也是，都不是录到的原文（页面不展示任何人的个人信息）；数字是原样。长列表做了截断。请求号、游标和余额是示意。

返回大小：标准档 4.1 KB（精简 2.3 KB，完整 5.0 KB）。

```jsonc
{
  "code": "ok",
  "request_id": "86788fb5-4235-48ac-b9c6-23292e637c65",
  "data": {
    "items": [
      {
        "id": "1047168840907789",
        "username": "nanfeng_0721",
        "name": "南边的风",
        "bio": "在上海，周末都在山里",
        "avatar_url": "https://wx.qlogo.cn/mmhead/xjoBFsBvyPoDjvS4DO1qBnMkqIePSAETki44ma9I/132",
        "verified": true
      },
      // … 另有 10 条
    ]
  },
  "page": {
    "next_cursor": "c1.Ew51uWdKdB0gdItoicfGl1FUa3rXNGNkJvKajjh3",
    "cursor_expires_at": "2026-11-02T12:25:07.000Z",
    "has_more": true,
    "returned": 11
  },
  "warnings": [],
  "meta": {
    "capability": "wechat.accounts.search",
    "result_status": "complete",
    "fetched_at": "2026-11-02T11:25:07.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "url": "platform",
      "created_at": "capability",
      "metrics": "capability"
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

取自 2026-11-02 11:25 UTC 的录制，为演示这种情况人工改过。请求号和余额是示意。

返回大小：标准档 470 B（精简 470 B，完整 470 B）。

```jsonc
{
  "code": "ok",
  "request_id": "28a5b7f5-264d-4dc0-92e6-d6f0bf7894e4",
  "data": { "items": [] },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 0
  },
  "warnings": [],
  "meta": {
    "capability": "wechat.accounts.search",
    "result_status": "empty",
    "fetched_at": "2026-11-02T11:25:07.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "url": "platform",
      "created_at": "capability",
      "metrics": "capability"
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
  "request_id": "ce7d6a10-6d4e-442d-9ae8-fdc84db25ebc",
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
  "request_id": "a3dede4b-1293-4bfb-8c20-7cf3dbe2d8a2",
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

### 502

按规范写的示例，不是录下的返回。

```json
{
  "code": "upstream_failed",
  "request_id": "eaf625a6-e01b-4535-b941-8dc5df648c4f",
  "message": "No result came back this time and nothing was charged; retry shortly",
  "message_zh": "这次没有取到结果，没有扣费，可以稍后重试",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

这份录制的返回：平台原始 JSON 1.2 万 token，DataXAPI 的 JSON 1,687 token，AI 通过 DataXAPI 的 MCP 读到 684 token，少 94%（2026-11-06 统计）。

[这份示例的 JSON 文件](https://dataxapi.com/apis/wechat/accounts/search.example.json)

## 在你的 AI 里用它

`dataxapi setup` 给这台电脑上的 AI 代理（Claude Code、Codex、Cursor）装好 DataXAPI 的 MCP 服务和基础技能。Key 从环境变量 DATAXAPI_API_KEY 读，不写进任何文件。

MCP 服务地址：`https://api.dataxapi.com/mcp`。你的客户端要填的配置在本页请求示例的“MCP”页签里；接好后让你的 AI 调用 `wechat.accounts.search`。

或者把这段话贴给任意一个 AI：

> 读一下 https://dataxapi.com/zh/apis/wechat/accounts/search.md，然后帮我用 DataXAPI 的接口 wechat.accounts.search（微信公众号实时查找）。

[在 ChatGPT 里打开](https://chatgpt.com/?q=%E8%AF%BB%E4%B8%80%E4%B8%8B%20https%3A%2F%2Fdataxapi.com%2Fzh%2Fapis%2Fwechat%2Faccounts%2Fsearch.md%EF%BC%8C%E7%84%B6%E5%90%8E%E5%B8%AE%E6%88%91%E7%94%A8%20DataXAPI%20%E7%9A%84%E6%8E%A5%E5%8F%A3%20wechat.accounts.search%EF%BC%88%E5%BE%AE%E4%BF%A1%E5%85%AC%E4%BC%97%E5%8F%B7%E5%AE%9E%E6%97%B6%E6%9F%A5%E6%89%BE%EF%BC%89%E3%80%82) · [在 Claude 里打开](https://claude.ai/new?q=%E8%AF%BB%E4%B8%80%E4%B8%8B%20https%3A%2F%2Fdataxapi.com%2Fzh%2Fapis%2Fwechat%2Faccounts%2Fsearch.md%EF%BC%8C%E7%84%B6%E5%90%8E%E5%B8%AE%E6%88%91%E7%94%A8%20DataXAPI%20%E7%9A%84%E6%8E%A5%E5%8F%A3%20wechat.accounts.search%EF%BC%88%E5%BE%AE%E4%BF%A1%E5%85%AC%E4%BC%97%E5%8F%B7%E5%AE%9E%E6%97%B6%E6%9F%A5%E6%89%BE%EF%BC%89%E3%80%82)

## 相关

这是 DataXAPI 社交媒体数据的一部分。同一把 Key 还能用：达人、广告、电商。

同一件事的其他平台：[抖音用户搜索](https://dataxapi.com/zh/apis/douyin/users/search/)、[快手用户搜索](https://dataxapi.com/zh/apis/kuaishou/users/search/)、[Instagram 用户搜索](https://dataxapi.com/zh/apis/instagram/users/search/)、[TikTok 用户搜索](https://dataxapi.com/zh/apis/tiktok/users/search/)、[微博用户搜索](https://dataxapi.com/zh/apis/weibo/users/search/)、[X 用户搜索](https://dataxapi.com/zh/apis/x/users/search/)、[小红书用户搜索](https://dataxapi.com/zh/apis/xiaohongshu/users/search/)、[YouTube 频道搜索](https://dataxapi.com/zh/apis/youtube/channels/search/)、[微信公众号账号搜索](https://dataxapi.com/zh/apis/wechat_mp/accounts/search/)、[微信视频号账号搜索](https://dataxapi.com/zh/apis/wechat_channels/users/search/)、[知乎用户搜索](https://dataxapi.com/zh/apis/zhihu/users/search/)

其他平台的社交媒体数据：[B站用户资料](https://dataxapi.com/zh/apis/bilibili/users/get/)、[抖音用户资料](https://dataxapi.com/zh/apis/douyin/users/get/)、[快手用户资料](https://dataxapi.com/zh/apis/kuaishou/users/get/)、[Telegram 频道资料](https://dataxapi.com/zh/apis/telegram/channels/get/)、[Facebook 主页资料](https://dataxapi.com/zh/apis/facebook/pages/get/)、[LinkedIn 公司主页](https://dataxapi.com/zh/apis/linkedin/companies/get/)、[Threads 用户资料](https://dataxapi.com/zh/apis/threads/users/get/)、[Instagram 用户资料](https://dataxapi.com/zh/apis/instagram/users/get/)、[TikTok 用户资料](https://dataxapi.com/zh/apis/tiktok/users/get/)、[微博点赞用户](https://dataxapi.com/zh/apis/weibo/posts/likers/list/)、[微博用户粉丝列表](https://dataxapi.com/zh/apis/weibo/users/followers/list/)、[微博用户资料](https://dataxapi.com/zh/apis/weibo/users/get/)、[X 帖子转推用户](https://dataxapi.com/zh/apis/x/posts/retweeters/list/)、[X 用户粉丝列表](https://dataxapi.com/zh/apis/x/users/followers/list/)

微信搜一搜的接口：[微信搜一搜综合搜索](https://dataxapi.com/zh/apis/wechat/posts/search/)、[微信搜一搜综合搜索（备用版）](https://dataxapi.com/zh/apis/wechat/backup/posts/search/)、[微信公众号实时查找](https://dataxapi.com/zh/apis/wechat/accounts/search/)、[微信指数](https://dataxapi.com/zh/apis/wechat/index/keywords/history/)、[微信搜一搜推荐词](https://dataxapi.com/zh/apis/wechat/keywords/related/)、[微信小程序搜索](https://dataxapi.com/zh/apis/wechat/miniprograms/search/)

怎么做和常见问题：[公众号文章有 API 吗？用 Python 批量取历史文章和阅读数（2026）](https://dataxapi.com/zh/guides/wechat-official-account-api-python/)、[微信数据接口有哪些？公众号、视频号、搜一搜能取什么（2026）](https://dataxapi.com/zh/answers/wechat-data-apis/)、[公众号接口报 ret=200013 freq control 怎么办（2026 年 7 月之后）](https://dataxapi.com/zh/answers/wechat-ret-200013-freq-control/)、[wechat-article-exporter 停了，还能用什么批量导出公众号文章（2026）](https://dataxapi.com/zh/answers/wechat-article-exporter-alternative/)、[公众号历史文章怎么批量导出（2026）](https://dataxapi.com/zh/answers/export-wechat-history-articles/)、[怎么让 AI 读公众号（ChatGPT、Claude、Codex，2026）](https://dataxapi.com/zh/answers/let-your-ai-read-wechat/)、[公众号怎么转 RSS（公众号 RSS，2026）](https://dataxapi.com/zh/answers/wechat-official-account-rss/)、[wewe-rss 失效了怎么办（2026）](https://dataxapi.com/zh/answers/wewe-rss-not-working/)、[监控几十个公众号，有更新推到飞书，怎么做（2026）](https://dataxapi.com/zh/answers/monitor-wechat-accounts-feishu/)、[TrendRadar 怎么加公众号、小红书数据（2026）](https://dataxapi.com/zh/answers/trendradar-wechat-xiaohongshu/)、[we-mp-rss 容器里发现挖矿程序，公众号 RSS 现在怎么办（2026）](https://dataxapi.com/zh/answers/we-mp-rss-mining-alternative/)、[公众号 fakeid 是什么（2026）](https://dataxapi.com/zh/answers/wechat-fakeid/)、[n8n 怎么自动采集公众号文章（2026）](https://dataxapi.com/zh/answers/wechat-official-account-n8n/)、[扣子怎么接公众号数据（2026）](https://dataxapi.com/zh/answers/wechat-official-account-coze/)、[公众号文章怎么自动导入 ima 知识库（2026）](https://dataxapi.com/zh/answers/wechat-articles-to-ima-knowledge-base/)、[公众号文章怎么自动存进 Obsidian（2026）](https://dataxapi.com/zh/answers/wechat-articles-to-obsidian/)、[Dify 怎么接公众号数据（MCP，2026）](https://dataxapi.com/zh/answers/wechat-official-account-dify/)、[公众号、视频号 MCP：在 Claude、Cursor 里查微信数据（2026）](https://dataxapi.com/zh/answers/wechat-mcp/)、[公众号主页的“视频”“贴图”栏怎么批量取？（2026）](https://dataxapi.com/zh/answers/wechat-official-account-videos-images/)

用到这个接口的 Skills：[找号与达人筛选](https://dataxapi.com/zh/skills/creators/)

相关：[微信搜一搜的全部接口](https://dataxapi.com/zh/apis/wechat/)、[社交媒体数据](https://dataxapi.com/zh/categories/social/)、[这件事在 12 个平台上的对照](https://dataxapi.com/zh/roles/accounts-search/)、[账号对象的字段](https://dataxapi.com/zh/docs/objects/account/)

## 常见问题

### 微信公众号实时查找 API 多少钱？

$0.0200 一次。单次最高扣费 $0.0200。

### 什么情况下不收费？

出错和超时不收费。

### 一次返回多少条？怎么翻页？

每页约 8 条，最多 14 条。每页条数由平台决定，不收 limit。取下一页时把 page.next_cursor 作为 cursor 带上；游标有效期 1 小时。最后一页的 page.has_more 是 false。

---

最后核对于 2026-11-26 12:17 UTC。目录修订号 0051cce45e9530b9。 [网页版](https://dataxapi.com/zh/apis/wechat/accounts/search/)
