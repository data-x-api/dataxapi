# 抖音用户资料 API

按账号编号或主页链接取抖音用户资料：显示名、抖音号、简介、粉丝数、关注数、作品数、获赞总数、是否认证；完整档另有认证说明、是不是企业或店铺认证（蓝 V）、主页有没有商品橱窗、能不能直播带货、是否正在直播和直播间编号。每次取一个对象；$0.0020 一次。出错、超时、对象不存在都不收费。

- 地址：`GET https://api.dataxapi.com/v1/douyin/users/get`
- 编号：`douyin.users.get`
- 也叫：抖音账号资料、抖音主页信息、抖音博主信息、抖音作者主页
- 价格：$0.0020 / 次
- 当前状态不写在这一页上（页面是快照），实时读：`GET https://api.dataxapi.com/v1/catalog/status`
- 返回：1 个对象, 一个账号对象
- 返回标准的账号结构，各平台相同
- `id` 就在链接里：`douyin.com/user/<id>`。也可以把整条链接传给 `url`。
- [在 Playground 里跑一次](https://dataxapi.com/zh/console/playground/?capability=douyin.users.get&params=%7B%22id%22%3A%22MS4wLjABAAAAZ0aPDJzFhBrs0q3wVsp2a9WWrBuAUMsVyygoaO0bCw8%22%7D)
- 英文名：[Douyin user profile API](https://dataxapi.com/apis/douyin/users/get/)

## 能拿到什么

2026-10-12 19:01 UTC 录下的真实返回，这里是前 4 行。

| 字段 | 值 |
| --- | --- |
| verified | true |
| metrics.followers | 4,022 |
| metrics.following | 115 |
| metrics.posts | 1,094 |

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | 文本 | `id`、`url` 里给且只给一个 | 账号编号（sec_uid，MS4w 开头的那一串）。手里只有主页链接或分享文字时，填到 url。示例：`MS4wLjABAAAAZ0aPDJzFhBrs0q3wVsp2a9WWrBuAUMsVyygoaO0bCw8`。 |
| `url` | 文本 | `id`、`url` 里给且只给一个 | 账号主页链接，原样粘贴即可：网页链接 https://www.douyin.com/user/…、手机分享页链接、App 复制出来的 v.douyin.com 短链接，或含这些链接的整段分享文字。短链接由我们打开一次，看它跳到哪个账号。示例：`https://www.douyin.com/user/MS4wLjABAAAAZ0aPDJzFhBrs0q3wVsp2a9WWrBuAUMsVyygoaO0bCw8`。长链接：`https://www.douyin.com/user/MS4wLjABAAAAZ0aPDJzFhBrs0q3wVsp2a9WWrBuAUMsVyygoaO0bCw8`。带链接的分享文案：`长按复制此条消息，打开抖音搜索，查看TA的更多作品。 https://www.douyin.com/user/MS4wLjABAAAAZ0aPDJzFhBrs0q3wVsp2a9WWrBuAUMsVyygoaO0bCw8`。 |
| `view` | 文本 |  | 返回档位。三档价格相同。取值：`compact`、`standard`（默认）、`full`。 |
| `fields` | 文本列表 |  | 只要这些字段。按路径写，例如 `author.name`。 |

## 返回字段

`data.item` 是一个账号对象。稳定：字段只增不改。

返回分三档：精简 `compact`（最常用的字段，长文本截短）、标准 `standard`（默认，全部标准字段）、完整 `full`（再加 `ext`，也就是这个平台特有的字段）。字段从表里写的那一档起出现，更大的档位也带。

| 字段 | 类型 | 说明 | 起始档位 | 这个接口 |
| --- | --- | --- | --- | --- |
| `id` | 文本 | 编号。 | `compact` | 有 |
| `username` | 文本 | 账号名。 | `compact` | 有 |
| `name` | 文本 | 显示名。 | `compact` | 有 |
| `url` | 链接 | 主页链接。 | `compact` | 有 |
| `bio` | 文本 | 简介。长文本：精简档只保留前 500 个字符，并在 `warnings` 里写明。 | `compact` | 有 |
| `avatar_url` | 链接 | 头像。 | `standard` | 有 |
| `verified` | 是否 | 是否认证。 | `standard` | 有 |
| `created_at` | 时间 | 账号创建时间。 | `standard` | 平台没有 |
| `metrics` | 对象 | 账号的数字。 | `compact` | 有 |
| `metrics.followers` | 整数 | 粉丝数。 | `compact` | 有 |
| `metrics.following` | 整数 | 关注数。 | `compact` | 有 |
| `metrics.posts` | 整数 | 发布的内容数。 | `compact` | 有 |
| `ext.likes` | 整数 | 账号全部内容的获赞总数。 | `full` | 有 |
| `ext.uid` | 文本 | 账号的数字编号（uid）：抖音账号历史和巨量算数达人接口要的就是它，不是抖音号（username）。 | `full` | 有 |
| `ext.is_live` | 是否 | 取数时是否正在直播。 | `full` | 有 |
| `ext.live_room_id` | 文本 | 正在直播时的直播间编号；没在直播时为 null。 | `full` | 有 |
| `ext.has_shop` | 是否 | 主页是否有商品橱窗入口。 | `full` | 有 |
| `ext.live_commerce` | 是否 | 平台是否标了这个账号可以直播带货。 | `full` | 有 |
| `ext.verified_label` | 文本 | 认证标旁边的那行字，平台的原话，如“店铺账号”“某某官方抖音账号”；没有认证时为 null。 | `full` | 有 |
| `ext.is_business` | 是否 | 是否企业、机构或店铺认证（蓝 V），不是个人认证。 | `full` | 有 |
| `ext.ip_location` | 文本 | 平台显示的 IP 属地（省份或国家，不带“IP属地：”）；不显示的账号为 null。 | `full` | 有 |
| `approximate` | 对象列表 | 这一条里哪些数是约数或下限；都是准确值时不出现。 | `compact` | 有 |
| `approximate[].field` | 文本 | 字段的路径，如 metrics.views。 | `compact` | 有 |
| `approximate[].kind` | 文本 | 约数，还是下限。取值：`approximate`、`lower_bound`。 | `compact` | 有 |

某一条本来就没有这个值时，字段给 `null`。这个接口给不了的字段不出现，统一列在 `meta.unavailable`。

每条数据的典型体积：`compact` 442 B、`standard` 604 B、`full` 809 B（按 2026-10-12 19:01 UTC 录下的那次返回量的）。

## 翻页

每次取一个对象，不翻页。

## 什么时候收费

| 情况 | 收费 |
| --- | --- |
| 返回了数据 | $0.0020，每次调用收一次 |
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
curl -G "https://api.dataxapi.com/v1/douyin/users/get" \
  --data-urlencode "id=MS4wLjABAAAAZ0aPDJzFhBrs0q3wVsp2a9WWrBuAUMsVyygoaO0bCw8" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
# pip install dataxapi
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.douyin.users.get(id="MS4wLjABAAAAZ0aPDJzFhBrs0q3wVsp2a9WWrBuAUMsVyygoaO0bCw8")
print(result["data"]["item"])
```

### TypeScript

```typescript
// npm i @dataxapi/sdk
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.douyin.users.get({ id: "MS4wLjABAAAAZ0aPDJzFhBrs0q3wVsp2a9WWrBuAUMsVyygoaO0bCw8" });
console.log(result.data.item);
```

### 命令行

```bash
dataxapi call douyin.users.get id=MS4wLjABAAAAZ0aPDJzFhBrs0q3wVsp2a9WWrBuAUMsVyygoaO0bCw8
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

把这段加进你的 MCP 客户端，然后让你的 AI 调用 `douyin.users.get`。

## 返回

### 200

取自 2026-10-12 19:01 UTC 录下的真实返回。名字、正文和编号是示例，链接也是，都不是录到的原文（页面不展示任何人的个人信息）；数字是原样。长列表做了截断。请求号、游标和余额是示意。

返回大小：标准档 941 B（精简 779 B，完整 1.1 KB）。

```jsonc
{
  "code": "ok",
  "request_id": "853437f0-7429-4355-b2f3-7a6bc394c178",
  "data": {
    "item": {
      "id": "MS4wLjABAAAAaY2Dhj3mrpMEyELLK7-3SiyTpH3-Tutk--72pLzZBuV",
      "username": "lemon_drop_cc",
      "name": "一颗柠檬糖",
      "url": "https://www.douyin.com/user/MS4wLjABAAAAaY2Dhj3mrpMEyELLK7-3SiyTpH3-Tutk--72pLzZBuV",
      "bio": "在上海，周末都在山里",
      "avatar_url": "https://p3-pc.douyinpic.com/aweme/100x100/aweme-avatar/tos-cn-avt-0015_5b54385a08698b57bc5a.jpeg",
      "verified": true,
      "metrics": { "followers": 4022, "following": 115, "posts": 1094 }
    }
  },
  "warnings": [],
  "meta": {
    "capability": "douyin.users.get",
    "result_status": "complete",
    "fetched_at": "2026-10-12T19:01:22.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": { "created_at": "platform" },
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
  "request_id": "7dc53652-8612-4974-a72b-5f70996ac90b",
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
  "request_id": "ab2c476f-8d59-4ef0-8b2b-63435bd96ece",
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
  "request_id": "1c949090-b973-4b92-8ca9-aff6704ef1c1",
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
  "request_id": "61558be5-b341-4c88-80e0-d41821f42b06",
  "message": "No result came back this time and nothing was charged; retry shortly",
  "message_zh": "这次没有取到结果，没有扣费，可以稍后重试",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

这份录制的返回：平台原始 JSON 3,534 token，DataXAPI 的 JSON 357 token，AI 通过 DataXAPI 的 MCP 读到 236 token，少 93%（2026-11-06 统计）。

[这份示例的 JSON 文件](https://dataxapi.com/apis/douyin/users/get.example.json)

## 在你的 AI 里用它

`dataxapi setup` 给这台电脑上的 AI 代理（Claude Code、Codex、Cursor）装好 DataXAPI 的 MCP 服务和基础技能。Key 从环境变量 DATAXAPI_API_KEY 读，不写进任何文件。

MCP 服务地址：`https://api.dataxapi.com/mcp`。你的客户端要填的配置在本页请求示例的“MCP”页签里；接好后让你的 AI 调用 `douyin.users.get`。

或者把这段话贴给任意一个 AI：

> 读一下 https://dataxapi.com/zh/apis/douyin/users/get.md，然后帮我用 DataXAPI 的接口 douyin.users.get（抖音用户资料）。

[在 ChatGPT 里打开](https://chatgpt.com/?q=%E8%AF%BB%E4%B8%80%E4%B8%8B%20https%3A%2F%2Fdataxapi.com%2Fzh%2Fapis%2Fdouyin%2Fusers%2Fget.md%EF%BC%8C%E7%84%B6%E5%90%8E%E5%B8%AE%E6%88%91%E7%94%A8%20DataXAPI%20%E7%9A%84%E6%8E%A5%E5%8F%A3%20douyin.users.get%EF%BC%88%E6%8A%96%E9%9F%B3%E7%94%A8%E6%88%B7%E8%B5%84%E6%96%99%EF%BC%89%E3%80%82) · [在 Claude 里打开](https://claude.ai/new?q=%E8%AF%BB%E4%B8%80%E4%B8%8B%20https%3A%2F%2Fdataxapi.com%2Fzh%2Fapis%2Fdouyin%2Fusers%2Fget.md%EF%BC%8C%E7%84%B6%E5%90%8E%E5%B8%AE%E6%88%91%E7%94%A8%20DataXAPI%20%E7%9A%84%E6%8E%A5%E5%8F%A3%20douyin.users.get%EF%BC%88%E6%8A%96%E9%9F%B3%E7%94%A8%E6%88%B7%E8%B5%84%E6%96%99%EF%BC%89%E3%80%82)

## 相关

这是 DataXAPI 社交媒体数据的一部分。同一把 Key 还能用：达人、广告、电商。

同一件事的其他平台：[B站用户资料](https://dataxapi.com/zh/apis/bilibili/users/get/)、[快手用户资料](https://dataxapi.com/zh/apis/kuaishou/users/get/)、[Telegram 频道资料](https://dataxapi.com/zh/apis/telegram/channels/get/)、[Facebook 主页资料](https://dataxapi.com/zh/apis/facebook/pages/get/)、[LinkedIn 公司主页](https://dataxapi.com/zh/apis/linkedin/companies/get/)、[Threads 用户资料](https://dataxapi.com/zh/apis/threads/users/get/)、[Instagram 用户资料](https://dataxapi.com/zh/apis/instagram/users/get/)、[TikTok 用户资料](https://dataxapi.com/zh/apis/tiktok/users/get/)、[微博用户资料](https://dataxapi.com/zh/apis/weibo/users/get/)、[X 用户资料](https://dataxapi.com/zh/apis/x/users/get/)、[小红书用户资料](https://dataxapi.com/zh/apis/xiaohongshu/users/get/)、[YouTube 频道资料](https://dataxapi.com/zh/apis/youtube/channels/get/)、[微信视频号账号资料](https://dataxapi.com/zh/apis/wechat_channels/users/get/)、[微信公众号资料](https://dataxapi.com/zh/apis/wechat_mp/accounts/get/)、[微信视频号账号资料（备用版）](https://dataxapi.com/zh/apis/wechat_channels/backup/users/get/)、[Reddit 用户资料](https://dataxapi.com/zh/apis/reddit/users/get/)、[知乎用户资料](https://dataxapi.com/zh/apis/zhihu/users/get/)

抖音的接口：[抖音评论回复](https://dataxapi.com/zh/apis/douyin/comments/replies/list/)、[抖音话题视频](https://dataxapi.com/zh/apis/douyin/hashtags/videos/list/)、[抖音热榜](https://dataxapi.com/zh/apis/douyin/trends/list/)、[抖音用户资料](https://dataxapi.com/zh/apis/douyin/users/get/)、[抖音达人互动与粉丝趋势](https://dataxapi.com/zh/apis/douyin/users/history/)、[抖音用户搜索](https://dataxapi.com/zh/apis/douyin/users/search/)、[抖音用户视频](https://dataxapi.com/zh/apis/douyin/users/videos/list/)、[抖音视频评论](https://dataxapi.com/zh/apis/douyin/videos/comments/list/)、[抖音视频详情](https://dataxapi.com/zh/apis/douyin/videos/get/)、[抖音视频转文字（文案提取、逐字稿）](https://dataxapi.com/zh/apis/douyin/videos/transcript/get/)、[抖音视频播放量](https://dataxapi.com/zh/apis/douyin/videos/metrics/)、[抖音相关视频](https://dataxapi.com/zh/apis/douyin/videos/related/)、[抖音视频搜索](https://dataxapi.com/zh/apis/douyin/videos/search/)、[抖音视频榜](https://dataxapi.com/zh/apis/douyin/videos/trending/)、[抖音搜索框联想词](https://dataxapi.com/zh/apis/douyin/keywords/related/)、[抖音无水印视频和图片下载地址](https://dataxapi.com/zh/apis/douyin/videos/media/get/)、[抖音音乐详情（背景音乐 MP3 和使用人数）](https://dataxapi.com/zh/apis/douyin/music/get/)、[抖音用户视频（备用版）](https://dataxapi.com/zh/apis/douyin/backup/users/videos/list/)、[抖音视频搜索（备用版）](https://dataxapi.com/zh/apis/douyin/backup/videos/search/)

抖音巨量算数的接口：[抖音巨量算数品牌指数趋势](https://dataxapi.com/zh/apis/douyin/index/brands/history/)、[抖音巨量算数品牌指数对比](https://dataxapi.com/zh/apis/douyin/index/brands/metrics/)、[抖音巨量算数达人热门视频](https://dataxapi.com/zh/apis/douyin/index/creators/videos/list/)、[抖音巨量算数达人粉丝画像](https://dataxapi.com/zh/apis/douyin/index/creators/audience/get/)、[抖音巨量算数达人核心指标](https://dataxapi.com/zh/apis/douyin/index/creators/metrics/)、[抖音巨量算数关键词人群画像](https://dataxapi.com/zh/apis/douyin/index/keywords/audience/get/)、[抖音巨量算数关键词热度趋势](https://dataxapi.com/zh/apis/douyin/index/keywords/history/)、[抖音巨量算数关联词](https://dataxapi.com/zh/apis/douyin/index/keywords/related/)、[抖音巨量算数实时热点](https://dataxapi.com/zh/apis/douyin/index/trends/list/)、[抖音巨量算数关键词热门视频](https://dataxapi.com/zh/apis/douyin/index/videos/search/)

抖音星图的接口：[抖音星图达人商业报价](https://dataxapi.com/zh/apis/douyin/xingtu/creators/rates/get/)、[抖音星图达人搜索](https://dataxapi.com/zh/apis/douyin/xingtu/creators/search/)、[抖音星图达人资料](https://dataxapi.com/zh/apis/douyin/xingtu/creators/get/)、[抖音星图达人粉丝画像](https://dataxapi.com/zh/apis/douyin/xingtu/creators/audience/get/)、[抖音星图达人传播数据](https://dataxapi.com/zh/apis/douyin/xingtu/creators/metrics/)、[抖音星图达人作品表现](https://dataxapi.com/zh/apis/douyin/xingtu/creators/videos/list/)、[抖音星图达人内容热词](https://dataxapi.com/zh/apis/douyin/xingtu/creators/keywords/get/)、[抖音星图达人星图指数](https://dataxapi.com/zh/apis/douyin/xingtu/creators/scores/get/)、[抖音星图达人内容分布](https://dataxapi.com/zh/apis/douyin/xingtu/creators/content_mix/get/)、[抖音星图达人转化能力](https://dataxapi.com/zh/apis/douyin/xingtu/creators/conversion/get/)、[抖音星图营销活动日历](https://dataxapi.com/zh/apis/douyin/xingtu/campaigns/list/)、[抖音星图视频数据报告（播放量、完播率）](https://dataxapi.com/zh/apis/douyin/xingtu/videos/get/)、[抖音星图达人粉丝画像（备用版）](https://dataxapi.com/zh/apis/douyin/xingtu/backup/creators/audience/get/)

怎么做和常见问题：[抖音 sec_uid 是什么？和 uid、抖音号有什么区别？](https://dataxapi.com/zh/answers/douyin-sec-uid/)、[抖音开放平台能查别人的视频和评论吗（2026）](https://dataxapi.com/zh/answers/douyin-open-platform-api/)、[抖音低粉爆款怎么找？能批量拉吗（2026）](https://dataxapi.com/zh/answers/douyin-low-fan-viral-videos/)、[抖音接口怎么选：搜索、账号、评论各用哪个（2026）](https://dataxapi.com/zh/answers/which-douyin-api-to-use/)、[怎么用 AI 给账号做诊断和复盘（2026）](https://dataxapi.com/zh/answers/ai-account-audit-and-review/)、[抖音 sec_uid 怎么转 uid，uid 怎么转回 sec_uid（2026）](https://dataxapi.com/zh/answers/douyin-sec-uid-to-uid/)、[抖音数据接口有哪些？第三方接口和开放平台的区别，能取什么（2026）](https://dataxapi.com/zh/answers/douyin-third-party-data-apis/)、[怎么查一个抖音号有没有商品橱窗、能不能直播带货、是不是蓝 V？（2026）](https://dataxapi.com/zh/answers/douyin-account-showcase-live-selling/)、[抖音评论区的人都在哪个省？评论 IP 属地批量导出和统计（2026）](https://dataxapi.com/zh/answers/douyin-comment-ip-location-stats/)、[怎么批量查账号和评论的 IP 属地？8 个平台 28 个接口逐项对照（2026）](https://dataxapi.com/zh/answers/ip-location-by-platform/)

用到这个接口的 Skills：[账号体检](https://dataxapi.com/zh/skills/account-audit/)

相关：[抖音的全部接口](https://dataxapi.com/zh/apis/douyin/)、[社交媒体数据](https://dataxapi.com/zh/categories/social/)、[这件事在 17 个平台上的对照](https://dataxapi.com/zh/roles/accounts-get/)、[账号对象的字段](https://dataxapi.com/zh/docs/objects/account/)

## 常见问题

### 抖音用户资料 API 多少钱？

$0.0020 一次。单次最高扣费 $0.0020。

### 什么情况下不收费？

出错、超时、对象不存在都不收费。

### 对象不存在会怎样？

返回 404 not_found，不收费。reason 写明是哪一种：not_found（不存在）或 private_or_deleted（私密或已删除）。

---

最后核对于 2026-11-28 06:28 UTC。目录修订号 ceced48b38f71468。 [网页版](https://dataxapi.com/zh/apis/douyin/users/get/)
