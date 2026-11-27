# X（推特）趋势榜 API

取 X 当前的趋势榜前 30 条，带名次；可以取全球的，也可以取某个国家的。每次最多 30 条；$0.0090 一次。出错和超时不收费。

- 地址：`GET https://api.dataxapi.com/v1/x/trends/list`
- 编号：`x.trends.list`
- 也叫：推特热搜、推特趋势、X 热门话题、X 趋势榜单
- 价格：$0.0090 / 次
- 当前状态不写在这一页上（页面是快照），实时读：`GET https://api.dataxapi.com/v1/catalog/status`
- 返回：每页 30 条, 一次给全，不翻页
- 返回标准的热点结构，各平台相同
- [在 Playground 里跑一次](https://dataxapi.com/zh/console/playground/?capability=x.trends.list)
- 英文名：[X trends API](https://dataxapi.com/apis/x/trends/list/)

## 能拿到什么

2026-10-13 03:29 UTC 录下的真实返回，这里是前 1 行。

| 字段 | 值 |
| --- | --- |
| rank | 1 |

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `board` | 文本 |  | 选哪个榜：现在只有趋势榜。取值：`trends`（默认）。示例：`trends`。 |
| `region` | 文本 |  | 取哪个国家的趋势，两个字母的代码：US、GB、CA、AU、IN、JP、DE、FR、BR、MX；不写是全球。示例：`US`。 |
| `view` | 文本 |  | 返回档位。三档价格相同。取值：`compact`、`standard`（默认）、`full`。 |
| `fields` | 文本列表 |  | 只要这些字段。按路径写，例如 `author.name`。 |

## 返回字段

`data.items` 是热点对象的列表。稳定：字段只增不改。

返回分三档：精简 `compact`（最常用的字段，长文本截短）、标准 `standard`（默认，全部标准字段）、完整 `full`（再加 `ext`，也就是这个平台特有的字段）。字段从表里写的那一档起出现，更大的档位也带。

| 字段 | 类型 | 说明 | 起始档位 | 这个接口 |
| --- | --- | --- | --- | --- |
| `id` | 文本 | 平台给这个热点的编号。 | `compact` | 平台没有 |
| `name` | 文本 | 热点的名称。 | `compact` | 有 |
| `rank` | 整数 | 榜上的名次，从 1 起；置顶条没有名次。 | `compact` | 有 |
| `heat` | 整数 | 平台给的热度值。 | `compact` | 这个接口不提供 |
| `approximate` | 对象列表 | 这一条里哪些数是约数或下限；都是准确值时不出现。 | `compact` | 有 |
| `approximate[].field` | 文本 | 字段的路径，如 metrics.views。 | `compact` | 有 |
| `approximate[].kind` | 文本 | 约数，还是下限。取值：`approximate`、`lower_bound`。 | `compact` | 有 |

某一条本来就没有这个值时，字段给 `null`。这个接口给不了的字段不出现，统一列在 `meta.unavailable`。

每条数据的典型体积：`compact` 36 B、`standard` 36 B、`full` 36 B（按 2026-10-13 03:29 UTC 录下的那次返回量的）。

## 翻页

每页 30 条。每页条数由平台决定，不收 `limit`。

一次给全，不发游标。

结果来自共享快照，每 5 分钟更新一次；`meta.cached` 会标明，`meta.fetched_at` 是取数时间。

## 什么时候收费

| 情况 | 收费 |
| --- | --- |
| 返回了数据 | $0.0090，每次调用收一次 |
| 参数不合法、出错、超时 | 不收费 |
| 单次最高扣费 | $0.0090 (带 `X-Max-Price` 可以设自己的上限，超过就不执行) |

价格读取于 2026-11-27 06:18 UTC，按价目版本 23，2026-11-27 06:13 UTC 起生效；在 Playground 里运行前会再读一次当前价格。

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
curl "https://api.dataxapi.com/v1/x/trends/list" \
  -H "Authorization: Bearer $DATAXAPI_API_KEY"
```

### Python

```python
# pip install dataxapi
from dataxapi import DataXAPI

dx = DataXAPI()  # reads DATAXAPI_API_KEY
result = dx.x.trends.list()
print(result["data"]["items"])
```

### TypeScript

```typescript
// npm i @dataxapi/sdk
import { DataXAPI } from "@dataxapi/sdk";

const dx = new DataXAPI(); // reads DATAXAPI_API_KEY
const result = await dx.x.trends.list();
console.log(result.data.items);
```

### 命令行

```bash
dataxapi call x.trends.list
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

把这段加进你的 MCP 客户端，然后让你的 AI 调用 `x.trends.list`。

## 返回

### 200

取自 2026-10-13 03:29 UTC 录下的真实返回。名字、正文和编号是示例，链接也是，都不是录到的原文（页面不展示任何人的个人信息）；数字是原样。长列表做了截断。请求号、游标和余额是示意。

返回大小：标准档 1.5 KB（精简 1.5 KB，完整 1.5 KB）。

```jsonc
{
  "code": "ok",
  "request_id": "86caa2be-f053-4926-a0ef-f572a73d938b",
  "data": {
    "items": [
      { "name": "Weekend hiking", "rank": 1 },
      // … 另有 29 条
    ]
  },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 30
  },
  "warnings": [],
  "meta": {
    "capability": "x.trends.list",
    "result_status": "complete",
    "fetched_at": "2026-10-13T03:29:53.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": { "id": "platform", "heat": "capability" },
    "billing": {
      "amount": "0.009",
      "currency": "USD",
      "balance_after": "9.991"
    }
  }
}
```

### 空结果

取自 2026-10-13 03:29 UTC 的录制，为演示这种情况人工改过。请求号和余额是示意。

返回大小：标准档 431 B（精简 431 B，完整 431 B）。

```jsonc
{
  "code": "ok",
  "request_id": "100d1b17-e9a9-4b88-8c1f-b741a6affbf3",
  "data": { "items": [] },
  "page": {
    "next_cursor": null,
    "cursor_expires_at": null,
    "has_more": false,
    "returned": 0
  },
  "warnings": [],
  "meta": {
    "capability": "x.trends.list",
    "result_status": "empty",
    "fetched_at": "2026-10-13T03:29:53.000Z",
    "cached": false,
    "replayed": false,
    "unavailable": { "id": "platform", "heat": "capability" },
    "billing": { "amount": "0", "currency": "USD", "balance_after": "10" }
  }
}
```

### 400

按规范写的示例，不是录下的返回。

```json
{
  "code": "invalid_params",
  "request_id": "a4d39566-ac90-42da-a36c-6f5a7c621c45",
  "message": "A parameter is invalid",
  "message_zh": "参数不合法",
  "charged": false,
  "retry": "after_fix",
  "retry_after_seconds": null,
  "param": null,
  "problems": ["board must be one of trends"],
  "docs_url": "https://dataxapi.com/docs/errors#invalid_params"
}
```

### 402

按规范写的示例，不是录下的返回。

```json
{
  "code": "insufficient_balance",
  "request_id": "91948995-aaf5-4927-aaca-982ef4f79980",
  "message": "The balance is too low",
  "message_zh": "余额不足",
  "charged": false,
  "retry": "after_fix",
  "retry_after_seconds": null,
  "param": null,
  "required": "0.009",
  "available": "0",
  "top_up_url": "https://dataxapi.com/console/billing/?amount=10",
  "next_step": "The balance does not cover this call ($0.009). Top up at top_up_url: $10 at least, about 1,111 calls at this price; Alipay or a card, and the balance never expires. Then send the same request again, unchanged. Nothing was charged for this one.",
  "next_step_zh": "余额不够这次调用（$0.009）。到 top_up_url 充值：最低 $10，按这次的价格约够 1,111 次；支付宝、银行卡都能付，余额不过期。到账后把同一个请求原样再发一次。这次没有扣钱。",
  "docs_url": "https://dataxapi.com/docs/errors#insufficient_balance"
}
```

### 502

按规范写的示例，不是录下的返回。

```json
{
  "code": "upstream_failed",
  "request_id": "07ce42ae-4f09-42ea-ac4b-806118ac8027",
  "message": "No result came back this time and nothing was charged; retry shortly",
  "message_zh": "这次没有取到结果，没有扣费，可以稍后重试",
  "charged": false,
  "retry": "yes",
  "retry_after_seconds": null,
  "param": null,
  "docs_url": "https://dataxapi.com/docs/errors#upstream_failed"
}
```

[这份示例的 JSON 文件](https://dataxapi.com/apis/x/trends/list.example.json)

## 在你的 AI 里用它

`dataxapi setup` 给这台电脑上的 AI 代理（Claude Code、Codex、Cursor）装好 DataXAPI 的 MCP 服务和基础技能。Key 从环境变量 DATAXAPI_API_KEY 读，不写进任何文件。

MCP 服务地址：`https://api.dataxapi.com/mcp`。你的客户端要填的配置在本页请求示例的“MCP”页签里；接好后让你的 AI 调用 `x.trends.list`。

或者把这段话贴给任意一个 AI：

> 读一下 https://dataxapi.com/zh/apis/x/trends/list.md，然后帮我用 DataXAPI 的接口 x.trends.list（X（推特）趋势榜）。

[在 ChatGPT 里打开](https://chatgpt.com/?q=%E8%AF%BB%E4%B8%80%E4%B8%8B%20https%3A%2F%2Fdataxapi.com%2Fzh%2Fapis%2Fx%2Ftrends%2Flist.md%EF%BC%8C%E7%84%B6%E5%90%8E%E5%B8%AE%E6%88%91%E7%94%A8%20DataXAPI%20%E7%9A%84%E6%8E%A5%E5%8F%A3%20x.trends.list%EF%BC%88X%EF%BC%88%E6%8E%A8%E7%89%B9%EF%BC%89%E8%B6%8B%E5%8A%BF%E6%A6%9C%EF%BC%89%E3%80%82) · [在 Claude 里打开](https://claude.ai/new?q=%E8%AF%BB%E4%B8%80%E4%B8%8B%20https%3A%2F%2Fdataxapi.com%2Fzh%2Fapis%2Fx%2Ftrends%2Flist.md%EF%BC%8C%E7%84%B6%E5%90%8E%E5%B8%AE%E6%88%91%E7%94%A8%20DataXAPI%20%E7%9A%84%E6%8E%A5%E5%8F%A3%20x.trends.list%EF%BC%88X%EF%BC%88%E6%8E%A8%E7%89%B9%EF%BC%89%E8%B6%8B%E5%8A%BF%E6%A6%9C%EF%BC%89%E3%80%82)

## 相关

这是 DataXAPI 社交媒体数据的一部分。同一把 Key 还能用：达人、广告、电商。

同一件事的其他平台：[B站热搜榜](https://dataxapi.com/zh/apis/bilibili/trends/list/)、[抖音热榜](https://dataxapi.com/zh/apis/douyin/trends/list/)、[快手热榜](https://dataxapi.com/zh/apis/kuaishou/trends/list/)、[微博热搜榜](https://dataxapi.com/zh/apis/weibo/trends/list/)、[小红书热点](https://dataxapi.com/zh/apis/xiaohongshu/trends/list/)、[Reddit 趋势搜索词](https://dataxapi.com/zh/apis/reddit/trends/list/)、[知乎热榜](https://dataxapi.com/zh/apis/zhihu/trends/list/)、[微博热搜榜（备用版）](https://dataxapi.com/zh/apis/weibo/backup/trends/list/)

其他平台的社交媒体数据：[抖音巨量算数实时热点](https://dataxapi.com/zh/apis/douyin/index/trends/list/)、[抖音评论回复](https://dataxapi.com/zh/apis/douyin/comments/replies/list/)

X（推特）的接口：[X 长文详情](https://dataxapi.com/zh/apis/x/posts/article/get/)、[X 帖子详情](https://dataxapi.com/zh/apis/x/posts/get/)、[X 帖子引用列表](https://dataxapi.com/zh/apis/x/posts/quotes/list/)、[X 帖子回复列表](https://dataxapi.com/zh/apis/x/posts/replies/list/)、[X 帖子转推用户](https://dataxapi.com/zh/apis/x/posts/retweeters/list/)、[X 帖子搜索](https://dataxapi.com/zh/apis/x/posts/search/)、[X 帖子对话串](https://dataxapi.com/zh/apis/x/threads/posts/list/)、[X 趋势榜](https://dataxapi.com/zh/apis/x/trends/list/)、[X 用户粉丝列表](https://dataxapi.com/zh/apis/x/users/followers/list/)、[X 用户关注列表](https://dataxapi.com/zh/apis/x/users/following/list/)、[X 用户资料](https://dataxapi.com/zh/apis/x/users/get/)、[X 用户提及](https://dataxapi.com/zh/apis/x/users/mentions/list/)、[X 用户帖子列表](https://dataxapi.com/zh/apis/x/users/posts/list/)、[X 用户搜索](https://dataxapi.com/zh/apis/x/users/search/)、[X 视频字幕](https://dataxapi.com/zh/apis/x/posts/transcript/get/)

X 社群的接口：[X 社群帖子](https://dataxapi.com/zh/apis/x/communities/posts/list/)、[X 社群资料](https://dataxapi.com/zh/apis/x/communities/get/)、[X 社群成员](https://dataxapi.com/zh/apis/x/communities/members/list/)

X 列表的接口：[X 列表帖子](https://dataxapi.com/zh/apis/x/lists/posts/list/)、[X 列表关注者](https://dataxapi.com/zh/apis/x/lists/followers/list/)、[X 列表成员](https://dataxapi.com/zh/apis/x/lists/members/list/)

怎么做和常见问题：[如何获取 X（推特）各国热门话题](https://dataxapi.com/zh/guides/x-trends-by-country/)、[怎么查某个国家的 X 热搜？](https://dataxapi.com/zh/answers/how-to-get-x-trends-for-a-country/)

用到这个接口的 Skills：[热点与选题](https://dataxapi.com/zh/skills/trends/)

用这个接口做的工具：[X（推特）趋势：全球热门话题](https://dataxapi.com/zh/tools/hot-search/x/worldwide/)、[X（推特）趋势：美国热门话题](https://dataxapi.com/zh/tools/hot-search/x/)、[X（推特）趋势：英国热门话题](https://dataxapi.com/zh/tools/hot-search/x/gb/)、[X（推特）趋势：加拿大热门话题](https://dataxapi.com/zh/tools/hot-search/x/ca/)、[X（推特）趋势：澳大利亚热门话题](https://dataxapi.com/zh/tools/hot-search/x/au/)、[X（推特）趋势：印度热门话题](https://dataxapi.com/zh/tools/hot-search/x/in/)、[X（推特）趋势：日本热门话题](https://dataxapi.com/zh/tools/hot-search/x/jp/)、[X（推特）趋势：德国热门话题](https://dataxapi.com/zh/tools/hot-search/x/de/)、[X（推特）趋势：法国热门话题](https://dataxapi.com/zh/tools/hot-search/x/fr/)、[X（推特）趋势：巴西热门话题](https://dataxapi.com/zh/tools/hot-search/x/br/)、[X（推特）趋势：墨西哥热门话题](https://dataxapi.com/zh/tools/hot-search/x/mx/)

相关：[X（推特）的全部接口](https://dataxapi.com/zh/apis/x/)、[社交媒体数据](https://dataxapi.com/zh/categories/social/)、[这件事在 8 个平台上的对照](https://dataxapi.com/zh/roles/trends-list/)、[热点对象的字段](https://dataxapi.com/zh/docs/objects/trend/)

## 常见问题

### X（推特）趋势榜 API 多少钱？

$0.0090 一次。单次最高扣费 $0.0090。

### 什么情况下不收费？

出错和超时不收费。

### 一次返回多少条？怎么翻页？

每页 30 条。每页条数由平台决定，不收 limit。一次给全，不发游标。

---

最后核对于 2026-11-27 06:18 UTC。目录修订号 0264e2d6dd4ff743。 [网页版](https://dataxapi.com/zh/apis/x/trends/list/)
