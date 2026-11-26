# 在 AI 里用 X（推特）数据

问 AI X（推特）上的事，它用实时数据回答：21 个接口，通过 5 个 MCP 工具或一个技能包（Skill），一次 $0.0003 起。贴一段带 Key 的提示词就接好，失败的调用不收费。

更新于 2026-11-06

- 接口：21 (X（推特），同一种返回格式)
- 价格：$0.0003 起 (按接口各自的标价；失败不收费)
- MCP 工具：`find`, `describe`, `call`, `read_more`, `account` (其中 4 个免费，不用 Key)
- 技能包：[dataxapi-x](https://dataxapi.com/skills/dataxapi-x.zip)

## 复制这段提示词

> 读 https://dataxapi.com/agents.md，在这个 agent 里帮我接好 DataXAPI。我的 API Key 是 dx_…，之后所有 DataXAPI 的调用都用它。

贴给你的 agent. 它会去读提示词指向的那一页，自己接好。

问 X（推特）上的事：

- 今天 X（推特）日本的趋势是什么？
- 搜一下 X 上关于我们新品发布的帖子。
- X 上 @NASA 有多少粉丝？

## 问 X（推特）什么，由哪个接口回答

你的 AI 会自己挑接口，拿不准时用 `find` 找。下面是它会找到的那个，和一次调用的价格。

| 你问 | 接口 | 价格 |
| --- | --- | --- |
| 今天 X（推特）日本的趋势是什么？ | [X 趋势榜](https://dataxapi.com/zh/apis/x/trends/list/) `x.trends.list` | $0.0090 |
| 搜一下 X 上关于我们新品发布的帖子。 | [X 帖子搜索](https://dataxapi.com/zh/apis/x/posts/search/) `x.posts.search` | $0.0020 |
| X 上 @NASA 有多少粉丝？ | [X 用户资料](https://dataxapi.com/zh/apis/x/users/get/) `x.users.get` | 每条 $0.0004，每次至少 $0.0004 |

## 一句问话，两次工具调用

问一句 X（推特）上的事时发生了什么：AI 免费找到接口，只为一次调用付钱。从清单里一眼看得出该用哪个接口时，连找都省了。

> 今天 X（推特）日本的趋势是什么？

|  |  |  |
| --- | --- | --- |
| `find({ query: "今天 X（推特）日本的趋势是什么？", platform: "x" })` | 找到 x.trends.list · 一次 $0.0090 | 免费 |
| `call({ capability: "x.trends.list", max_price: "0.009" })` | 最多 30 条热点 · 精简档 | $0.0090 |

2 次工具调用 · 1 次扣费 · $0.0090. 拿到最多 30 条热点，都是标准格式。AI 据此回答，并说明这次花了多少。

## X（推特）技能包

给会读技能的 agent（Claude Code、Codex、Cursor）：一个 SKILL.md，列出 X（推特）的 21 个接口和价格，怎么用 MCP、命令行或 REST 调用，怎么翻页，以及哪个接口回答哪类问题。

对你的 AI 说：帮我从 https://dataxapi.com/skills/dataxapi-x.zip 装上 DataXAPI 技能 dataxapi-x。

## AI 能调的 X（推特）接口，全部 21 个

每一个都是 AI 传给 `call` 的接口编号。点名字进接口页：参数、字段和一份录好的返回。

| 接口 | 接口编号 | 价格 |
| --- | --- | --- |
| [X 社群帖子](https://dataxapi.com/zh/apis/x/communities/posts/list/) | `x.communities.posts.list` | 每条 $0.0003，每次至少 $0.0003 |
| [X 列表帖子](https://dataxapi.com/zh/apis/x/lists/posts/list/) | `x.lists.posts.list` | $0.0020 |
| [X 长文详情](https://dataxapi.com/zh/apis/x/posts/article/get/) | `x.posts.article.get` | $0.0020 |
| [X 帖子详情](https://dataxapi.com/zh/apis/x/posts/get/) | `x.posts.get` | $0.0003 |
| [X 帖子引用列表](https://dataxapi.com/zh/apis/x/posts/quotes/list/) | `x.posts.quotes.list` | 每条 $0.0003，每次至少 $0.0003 |
| [X 帖子回复列表](https://dataxapi.com/zh/apis/x/posts/replies/list/) | `x.posts.replies.list` | $0.0020 |
| [X 帖子转推用户](https://dataxapi.com/zh/apis/x/posts/retweeters/list/) | `x.posts.retweeters.list` | $0.0020 |
| [X 帖子搜索](https://dataxapi.com/zh/apis/x/posts/search/) | `x.posts.search` | $0.0020 |
| [X 帖子对话串](https://dataxapi.com/zh/apis/x/threads/posts/list/) | `x.threads.posts.list` | 每条 $0.0003，每次至少 $0.0003 |
| [X 趋势榜](https://dataxapi.com/zh/apis/x/trends/list/) | `x.trends.list` | $0.0090 |
| [X 用户粉丝列表](https://dataxapi.com/zh/apis/x/users/followers/list/) | `x.users.followers.list` | 每条 $0.0001，每次至少 $0.0004 |
| [X 用户关注列表](https://dataxapi.com/zh/apis/x/users/following/list/) | `x.users.following.list` | 每条 $0.0001，每次至少 $0.0004 |
| [X 用户资料](https://dataxapi.com/zh/apis/x/users/get/) | `x.users.get` | 每条 $0.0004，每次至少 $0.0004 |
| [X 用户提及](https://dataxapi.com/zh/apis/x/users/mentions/list/) | `x.users.mentions.list` | 每条 $0.0003，每次至少 $0.0003 |
| [X 用户帖子列表](https://dataxapi.com/zh/apis/x/users/posts/list/) | `x.users.posts.list` | $0.0020 |
| [X 用户搜索](https://dataxapi.com/zh/apis/x/users/search/) | `x.users.search` | 每条 $0.0004，每次至少 $0.0004 |
| [X 社群资料](https://dataxapi.com/zh/apis/x/communities/get/) | `x.communities.get` | $0.0004 |
| [X 社群成员](https://dataxapi.com/zh/apis/x/communities/members/list/) | `x.communities.members.list` | 每条 $0.0004，每次至少 $0.0004 |
| [X 列表关注者](https://dataxapi.com/zh/apis/x/lists/followers/list/) | `x.lists.followers.list` | 每条 $0.0004，每次至少 $0.0004 |
| [X 列表成员](https://dataxapi.com/zh/apis/x/lists/members/list/) | `x.lists.members.list` | 每条 $0.0004，每次至少 $0.0004 |
| [X 视频字幕](https://dataxapi.com/zh/apis/x/posts/transcript/get/) | `x.posts.transcript.get` | $0.0020 |

[X（推特）的全部价格和扣费规则 →](https://dataxapi.com/zh/pricing/x/) · [X（推特）API](https://dataxapi.com/zh/apis/x/) · [MCP 服务](https://dataxapi.com/zh/mcp/)

## 常见问题

### 在 AI 里问 X（推特）要花多少钱？

找接口、看参数、接着读已有结果都免费。一次调用 $0.0003 到 $0.0400，X（推特）的每个接口各有标价。失败的调用不收费。

### 需要 X（推特）账号吗？

不需要。不用登录 X（推特），也不用交 Cookie：AI 只用你的 DataXAPI Key。

### 哪些 AI 客户端能用？

支持 MCP 的都能用。贴上那段提示词，Claude Code、Cursor、Codex 会自己接好；其他客户端手动填服务地址和 Key。

### 有了 MCP 还要装技能包吗？

二选一就够。MCP 给 AI 工具；技能包告诉会读技能的 agent 该用哪个接口、花多少钱，在它调用之前。

### AI 会不会花超？

每把 Key 可以设每天或每月的预算，每次调用可以带 `max_price`。余额用完调用就停，不会赊账。

## 其他平台也能这样接进 AI

[抖音](https://dataxapi.com/zh/mcp/douyin/) · [B站](https://dataxapi.com/zh/mcp/bilibili/) · [快手](https://dataxapi.com/zh/mcp/kuaishou/) · [Telegram](https://dataxapi.com/zh/mcp/telegram/) · [Facebook](https://dataxapi.com/zh/mcp/facebook/) · [Google 广告](https://dataxapi.com/zh/mcp/google/) · [LinkedIn](https://dataxapi.com/zh/mcp/linkedin/) · [Meta 广告库](https://dataxapi.com/zh/mcp/meta/) · [Threads](https://dataxapi.com/zh/mcp/threads/) · [Instagram](https://dataxapi.com/zh/mcp/instagram/) · [TikTok](https://dataxapi.com/zh/mcp/tiktok/) · [微博](https://dataxapi.com/zh/mcp/weibo/) · [小红书](https://dataxapi.com/zh/mcp/xiaohongshu/) · [YouTube](https://dataxapi.com/zh/mcp/youtube/) · [微信视频号](https://dataxapi.com/zh/mcp/wechat_channels/) · [微信搜一搜](https://dataxapi.com/zh/mcp/wechat/) · [微信公众号](https://dataxapi.com/zh/mcp/wechat_mp/) · [Reddit](https://dataxapi.com/zh/mcp/reddit/) · [知乎](https://dataxapi.com/zh/mcp/zhihu/) · [Pinterest](https://dataxapi.com/zh/mcp/pinterest/)

---

按目录修订号 0051cce45e9530b9、价目版本 22生成。 [网页版](https://dataxapi.com/zh/mcp/x/)
