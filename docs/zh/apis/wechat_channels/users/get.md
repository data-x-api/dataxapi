# 微信视频号账号资料 API

按视频号账号编号取资料：名称、简介、头像、IP 属地、作品数。每次取一个对象；$0.0200 一次。出错、超时、对象不存在都不收费。

- 地址：`GET https://api.dataxapi.com/v1/wechat_channels/users/get`
- 编号：`wechat_channels.users.get`
- 也叫：视频号主页、视频号账号信息、视频号作者主页
- 价格：$0.0200 / 次
- 当前状态不写在这一页上（页面是快照），实时读：`GET https://api.dataxapi.com/v1/catalog/status`
- 返回：1 个对象, 一个账号对象
- 返回标准的账号结构，各平台相同
- [在 Playground 里跑一次](https://dataxapi.com/zh/console/playground/?capability=wechat_channels.users.get&params=%7B%22id%22%3A%22v2_060000231003b20faec8c5e5811dc3ddce02ec30b0772029a703e1b9f446ba147658bbcfab81%40finder%22%7D)
- 英文名：[WeChat Channels account profile API](https://dataxapi.com/apis/wechat_channels/users/get/)

## 能拿到什么

2026-10-12 19:03 UTC 录下的真实返回，这里是前 1 行。

| 字段 | 值 |
| --- | --- |
| metrics.posts | 12,415 |

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | 文本 | 是 | 视频号账号编号，v2_ 开头、@finder 结尾。可以用 wechat_channels.users.search 按名称找，也可以用 wechat_channels.videos.get 查这个账号的作品（传分享链接或搜索结果的 export_id），返回的 author.id 就是它。App 里显示的 sph 开头的视频号 ID 不能用。示例：`v2_060000231003b20faec8c5e5811dc3ddce02ec30b0772029a703e1b9f446ba147658bbcfab81@finder`。 |
| `view` | 文本 |  | 返回档位。三档价格相同。取值：`compact`、`standard`（默认）、`full`。 |
| `fields` | 文本列表 |  | 只要这些字段。按路径写，例如 `author.name`。 |

## 返回字段

`data.item` 是一个账号对象。稳定：字段只增不改。

返回分三档：精简 `compact`（最常用的字段，长文本截短）、标准 `standard`（默认，全部标准字段）、完整 `full`（再加 `ext`，也就是这个平台特有的字段）。字段从表里写的那一档起出现，更大的档位也带。

| 字段 | 类型 | 说明 | 起始档位 | 这个接口 |
| --- | --- | --- | --- | --- |
| `id` | 文本 | 编号。 | `compact` | 有 |
| `username` | 文本 | 账号名。 | `compact` | 平台没有 |
| `name` | 文本 | 显示名。 | `compact` | 有 |
| `url` | 链接 | 主页链接。 | `compact` | 平台没有 |
| `bio` | 文本 | 简介。长文本：精简档只保留前 500 个字符，并在 `warnings` 里写明。 | `compact` | 有 |
| `avatar_url` | 链接 | 头像。 | `standard` | 有 |
| `verified` | 是否 | 是否认证。 | `standard` | 这个接口不提供 |
| `created_at` | 时间 | 账号创建时间。 | `standard` | 这个接口不提供 |
| `metrics` | 对象 | 账号的数字。 | `compact` | 有 |
| `metrics.followers` | 整数 | 粉丝数。 | `compact` | 这个接口不提供 |
| `metrics.following` | 整数 | 关注数。 | `compact` | 平台没有 |
| `metrics.posts` | 整数 | 发布的内容数。 | `compact` | 有 |
| `ext.ip_location` | 文本 | 平台显示的 IP 属地。 | `full` | 有 |
| `approximate` | 对象列表 | 这一条里哪些数是约数或下限；都是准确值时不出现。 | `compact` | 有 |
| `approximate[].field` | 文本 | 字段的路径，如 metrics.views。 | `compact` | 有 |
| `approximate[].kind` | 文本 | 约数，还是下限。取值：`approximate`、`lower_bound`。 | `compact` | 有 |

某一条本来就没有这个值时，字段给 `null`。这个接口给不了的字段不出现，统一列在 `meta.unavailable`。

每条数据的典型体积：`compact` 187 B、`standard` 336 B、`full` 368 B（按 2026-10-12 19:03 UTC 录下的那次返回量的）。

## 翻页

每次取一个对象，不翻页。

## 什么时候收费

| 情况 | 收费 |
| --- | --- |
| 返回了数据 | $0.0200，每次调用收一次 |
| 对象不存在（404） | 不收费 |
| 参数不合法、出错、超时 | 不收费 |
| 单次最高扣费 | $0.0200 (带 `X-Max-Price` 可以设自己的上限，超过就不执行) |

价格读取于 2026-11-20 07:17 UTC，按价目版本 19，2026-11-17 18:04 UTC 起生效；在 Playground 里运行前会再读一次当前价格。

## 对象不存在时

返回 404 `not_found`，不收费。`reason` 写明是哪一种：`not_found`（不存在）或 `private_or_deleted`（私密或已删除）。

## 常见报错

所有报错都是同一个结构：`code`、`message`、`charged`、`retry`、`retry_after_seconds`、`param`、`docs_url`。

这个接口取不到数据时（出错、超时或接口暂停），可以改调它的备用版：参数和返回相同，$0.0300 一次；这时报错里的 `alternative` 会写明。重试请换一个新的幂等键： [微信视频号账号资料（备用版）API](https://dataxapi.com/zh/apis/wechat_channels/backup/users/get/)

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
curl -G "https://api.dataxapi.com/v1/wechat_channels/users/get" \
  --data-urlencode "id=v2_060000231003b20faec8c5e5811dc3ddce02ec30b0772029a703e1b9f446ba147658bbcfab81@finder" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
# pip install dataxapi
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.wechat_channels.users.get(id="v2_060000231003b20faec8c5e5811dc3ddce02ec30b0772029a703e1b9f446ba147658bbcfab81@finder")
print(result["data"]["item"])
```

### TypeScript

```typescript
// npm i @dataxapi/sdk
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.wechat_channels.users.get({ id: "v2_060000231003b20faec8c5e5811dc3ddce02ec30b0772029a703e1b9f446ba147658bbcfab81@finder" });
console.log(result.data.item);
```

### 命令行

```bash
dataxapi call wechat_channels.users.get id=v2_060000231003b20faec8c5e5811dc3ddce02ec30b0772029a703e1b9f446ba147658bbcfab81@finder
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

把这段加进你的 MCP 客户端，然后让你的 AI 调用 `wechat_channels.users.get`。

## 返回

### 200

取自 2026-10-12 19:03 UTC 录下的真实返回。名字、正文和编号是示例，链接也是，都不是录到的原文（页面不展示任何人的个人信息）；数字是原样。长列表做了截断。请求号、游标和余额是示意。

返回大小：标准档 811 B（精简 662 B，完整 843 B）。

```jsonc
{
  "code": "ok",
  "request_id": "d6d6f66b-c375-4a2f-9949-11fe1b2c1052",
  "data": {
    "item": {
      "id": "v2_060000231003b20fadaab9d0dce2d5f0e671a9d94276bb814c12ed4aa5cc522c32e4b8f9bc@finder",
      "name": "阿杰爱折腾",
      "bio": "记录生活里的小确幸｜合作请私信",
      "avatar_url": "https://wx.qlogo.cn/mmhead/hycpkY259bVagZ2jedv2eNX0gku55yt0HATagxPX/132",
      "metrics": { "posts": 12415 }
    }
  },
  "warnings": [],
  "meta": {
    "capability": "wechat_channels.users.get",
    "result_status": "complete",
    "fetched_at": "2026-10-12T19:03:55.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": {
      "username": "platform",
      "url": "platform",
      "verified": "capability",
      "created_at": "capability",
      "metrics.followers": "capability",
      "metrics.following": "platform"
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
  "request_id": "3f7a1ba1-6f0f-4509-ba3b-5f76c95a058d",
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
  "request_id": "08b04777-409c-485b-8a80-902c83c22561",
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

### 404

按规范写的示例，不是录下的返回。

```json
{
  "code": "not_found",
  "request_id": "a15b5119-e4f6-4634-be94-7cf5053f8930",
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
  "request_id": "c6341a0d-551c-4502-8d6f-8a2dd8a07a7e",
  "message": "No result came back this time and nothing was charged; retry shortly",
  "message_zh": "这次没有取到结果，没有扣费，可以稍后重试",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

这份录制的返回：平台原始 JSON 555 token，DataXAPI 的 JSON 272 token，AI 通过 DataXAPI 的 MCP 读到 138 token，少 75%（2026-11-06 统计）。

[这份示例的 JSON 文件](https://dataxapi.com/apis/wechat_channels/users/get.example.json)

## 在你的 AI 里用它

`dataxapi setup` 给这台电脑上的 AI 代理（Claude Code、Codex、Cursor）装好 DataXAPI 的 MCP 服务和基础技能。Key 从环境变量 DATAXAPI_API_KEY 读，不写进任何文件。

MCP 服务地址：`https://api.dataxapi.com/mcp`。你的客户端要填的配置在本页请求示例的“MCP”页签里；接好后让你的 AI 调用 `wechat_channels.users.get`。

或者把这段话贴给任意一个 AI：

> 读一下 https://dataxapi.com/zh/apis/wechat_channels/users/get.md，然后帮我用 DataXAPI 的接口 wechat_channels.users.get（微信视频号账号资料）。

[在 ChatGPT 里打开](https://chatgpt.com/?q=%E8%AF%BB%E4%B8%80%E4%B8%8B%20https%3A%2F%2Fdataxapi.com%2Fzh%2Fapis%2Fwechat_channels%2Fusers%2Fget.md%EF%BC%8C%E7%84%B6%E5%90%8E%E5%B8%AE%E6%88%91%E7%94%A8%20DataXAPI%20%E7%9A%84%E6%8E%A5%E5%8F%A3%20wechat_channels.users.get%EF%BC%88%E5%BE%AE%E4%BF%A1%E8%A7%86%E9%A2%91%E5%8F%B7%E8%B4%A6%E5%8F%B7%E8%B5%84%E6%96%99%EF%BC%89%E3%80%82) · [在 Claude 里打开](https://claude.ai/new?q=%E8%AF%BB%E4%B8%80%E4%B8%8B%20https%3A%2F%2Fdataxapi.com%2Fzh%2Fapis%2Fwechat_channels%2Fusers%2Fget.md%EF%BC%8C%E7%84%B6%E5%90%8E%E5%B8%AE%E6%88%91%E7%94%A8%20DataXAPI%20%E7%9A%84%E6%8E%A5%E5%8F%A3%20wechat_channels.users.get%EF%BC%88%E5%BE%AE%E4%BF%A1%E8%A7%86%E9%A2%91%E5%8F%B7%E8%B4%A6%E5%8F%B7%E8%B5%84%E6%96%99%EF%BC%89%E3%80%82)

## 相关

这是 DataXAPI 社交媒体数据的一部分。同一把 Key 还能用：达人、广告、电商。

同一件事的其他平台：[B站用户资料](https://dataxapi.com/zh/apis/bilibili/users/get/)、[抖音用户资料](https://dataxapi.com/zh/apis/douyin/users/get/)、[快手用户资料](https://dataxapi.com/zh/apis/kuaishou/users/get/)、[Telegram 频道资料](https://dataxapi.com/zh/apis/telegram/channels/get/)、[Facebook 主页资料](https://dataxapi.com/zh/apis/facebook/pages/get/)、[LinkedIn 公司主页](https://dataxapi.com/zh/apis/linkedin/companies/get/)、[Threads 用户资料](https://dataxapi.com/zh/apis/threads/users/get/)、[Instagram 用户资料](https://dataxapi.com/zh/apis/instagram/users/get/)、[TikTok 用户资料](https://dataxapi.com/zh/apis/tiktok/users/get/)、[微博用户资料](https://dataxapi.com/zh/apis/weibo/users/get/)、[X 用户资料](https://dataxapi.com/zh/apis/x/users/get/)、[小红书用户资料](https://dataxapi.com/zh/apis/xiaohongshu/users/get/)、[YouTube 频道资料](https://dataxapi.com/zh/apis/youtube/channels/get/)、[微信公众号资料](https://dataxapi.com/zh/apis/wechat_mp/accounts/get/)、[微信视频号账号资料（备用版）](https://dataxapi.com/zh/apis/wechat_channels/backup/users/get/)、[Reddit 用户资料](https://dataxapi.com/zh/apis/reddit/users/get/)、[知乎用户资料](https://dataxapi.com/zh/apis/zhihu/users/get/)

微信视频号的接口：[微信视频号账号资料](https://dataxapi.com/zh/apis/wechat_channels/users/get/)、[微信视频号作品详情](https://dataxapi.com/zh/apis/wechat_channels/videos/get/)、[微信视频号作品评论](https://dataxapi.com/zh/apis/wechat_channels/videos/comments/list/)、[微信视频号作品分享链接](https://dataxapi.com/zh/apis/wechat_channels/videos/share_link/get/)、[微信视频号账号的合集](https://dataxapi.com/zh/apis/wechat_channels/users/collections/list/)、[微信视频号合集里的视频](https://dataxapi.com/zh/apis/wechat_channels/collections/videos/list/)、[微信视频号用户作品](https://dataxapi.com/zh/apis/wechat_channels/users/videos/list/)、[微信搜一搜视频号视频搜索](https://dataxapi.com/zh/apis/wechat_channels/videos/search/)、[微信视频号账号资料（备用版）](https://dataxapi.com/zh/apis/wechat_channels/backup/users/get/)、[微信视频号用户作品（备用版）](https://dataxapi.com/zh/apis/wechat_channels/backup/users/videos/list/)、[微信搜一搜视频号视频搜索（备用版）](https://dataxapi.com/zh/apis/wechat_channels/backup/videos/search/)、[微信视频号账号搜索](https://dataxapi.com/zh/apis/wechat_channels/users/search/)、[微信视频号作品互动数据](https://dataxapi.com/zh/apis/wechat_channels/videos/metrics/)、[微信视频号评论回复](https://dataxapi.com/zh/apis/wechat_channels/comments/replies/list/)、[微信视频号直播回放](https://dataxapi.com/zh/apis/wechat_channels/users/live_replays/list/)

怎么做和常见问题：[视频号数据怎么获取？](https://dataxapi.com/zh/answers/how-to-get-wechat-channels-data/)、[视频号的 …@finder 账号编号和 export 编号是什么？](https://dataxapi.com/zh/answers/wechat-channels-finder-id/)、[微信数据接口有哪些？公众号、视频号、搜一搜能取什么（2026）](https://dataxapi.com/zh/answers/wechat-data-apis/)、[公众号关联的视频号怎么查？同一家的公众号和视频号一起盯（2026）](https://dataxapi.com/zh/answers/wechat-official-account-linked-channels/)、[视频号播放量在哪看？别人的视频号作品能查到哪些数据（2026）](https://dataxapi.com/zh/answers/wechat-channels-play-count/)、[怎么批量查账号和评论的 IP 属地？8 个平台 28 个接口逐项对照（2026）](https://dataxapi.com/zh/answers/ip-location-by-platform/)

用到这个接口的 Skills：[账号体检](https://dataxapi.com/zh/skills/account-audit/)

相关：[微信视频号的全部接口](https://dataxapi.com/zh/apis/wechat_channels/)、[社交媒体数据](https://dataxapi.com/zh/categories/social/)、[这件事在 17 个平台上的对照](https://dataxapi.com/zh/roles/accounts-get/)、[账号对象的字段](https://dataxapi.com/zh/docs/objects/account/)

## 常见问题

### 微信视频号账号资料 API 多少钱？

$0.0200 一次。单次最高扣费 $0.0200。

### 什么情况下不收费？

出错、超时、对象不存在都不收费。

### 对象不存在会怎样？

返回 404 not_found，不收费。reason 写明是哪一种：not_found（不存在）或 private_or_deleted（私密或已删除）。

---

最后核对于 2026-11-20 07:17 UTC。目录修订号 720fc3ea8dadb865。 [网页版](https://dataxapi.com/zh/apis/wechat_channels/users/get/)
