# DataXAPI MCP 服务：一句话把市场数据接进你的 AI

复制一段带着你 Key 的提示词，贴给你的 agent，然后直接问。它读一个页面就自己接好：5 个工具，21 个平台的 254 个接口，一次 $0.0003 起，失败的调用不收费。

更新于 2026-11-25

## 复制这段提示词

> 读 https://dataxapi.com/agents.md，在这个 agent 里帮我接好 DataXAPI。我的 API Key 是 dx_…，之后所有 DataXAPI 的调用都用它。

贴给你的 agent. 它会去读提示词指向的那一页，自己接好。 Claude Code、Cursor、Codex、n8n、Cherry Studio、Trae、扣子 Coze、Dify、ChatGPT、Claude、飞书 都有接入步骤.

现在问点什么：

- 现在抖音、微博、B站上什么在涨？
- @trailbrew 这周在 TikTok 上发了什么，哪条起来了？
- 这条视频下面，大家在夸什么、骂什么？
- 抖音和 TikTok 上，咖啡这个品类该找哪些达人？
- 现在 Meta 和 TikTok 上，“running shoes”都有哪些广告在投？

## 你的 AI 拿到的 5 个工具

还没注册，你的 AI 就能先搜、先看全部接口。只有 `call` 扣费，而且拿到数据才扣。

| 工具 | 做什么 | Key | 费用 |
| --- | --- | --- | --- |
| `find` | 按一句需求找到该用的接口。 最多 5 个，每个带单价和一条填好参数的调用。 | 不用 Key | 免费 |
| `describe` | 一次看最多 5 个接口的全部：参数、字段、价格。 还有它给不了什么、单次最高扣多少。 | 不用 Key | 免费 |
| `call` | 调用一个接口，返回一页数据。 返回里带这次扣了多少、余额，以及怎么取下一页。 | 要 Key | $0.0003 起, 按接口标价; 失败不收费 |
| `read_more` | 24 小时内重读一份结果。 长结果剩下的部分，或者换一种详略再读。 | 要 Key | 免费 |
| `account` | 余额、用量和每次调用的扣费。 还有这把 Key 的预算，以及哪些接口现在可用（这一项不用 Key）。 | 要 Key | 免费 |

## 一次对话是什么样

你用一句话问，剩下的 AI 自己做完，并告诉你花了多少。

- **需要时先找接口。** 不用记接口名：`find` 免费；从清单里一眼看得出该用哪个时，直接调。
- **先看到价格。** 还可以给这次调用设一个最高价。
- **拿到的结果放得下。** 默认精简，约 20 KB 处截断；剩下的用 `read_more` 读，不扣费。
- **会给出账单。** 两次工具调用，只有一次扣费。

> 这周 TikTok 上讲露营咖啡的视频，哪几条点赞最高？

|  |  |  |
| --- | --- | --- |
| `find({ query: "search tiktok videos by keyword" })` | 找到 tiktok.videos.search · 一次 $0.0020 | 免费 |
| `call({ capability: "tiktok.videos.search", query: "camping coffee", sort: "popular", published_within: "week", max_price: "0.01" })` | 30 条 · 精简档 | $0.0020 |

2 次工具调用 · 1 次扣费 · $0.0020

## 花多少，你说了算

能花钱的 AI 需要上限。这里有三道，都由服务端把关。

- **每把 Key 都能设预算.** 给 AI 单独一把 Key，设好每天、每月或总共能花多少。用完就停，账户里别的不受影响。
- **每次调用都能设最高价.** 带上 `max_price`，可能超过这个价的调用在扣费前就被拒绝。同一个 `idempotency_key` 的调用重发，只扣一次。
- **只读公开数据.** DataXAPI 读的是平台上人人看得到的内容。它不能发帖、发私信、登录账号，也改不了任何东西。
- 5 个工具里 4 个标为 readOnly.

## 想自己动手配？

每个客户端的接入步骤，最后连的都是同一个地址： `https://api.dataxapi.com/mcp`

- [Claude Code 的接入步骤](https://dataxapi.com/zh/integrations/claude-code/) (1 条命令)
- [Cursor 的接入步骤](https://dataxapi.com/zh/integrations/cursor/) (1 条命令)
- [Codex 的接入步骤](https://dataxapi.com/zh/integrations/codex/) (1 条命令)
- [n8n 的接入步骤](https://dataxapi.com/zh/integrations/n8n/) (4 项)
- [Cherry Studio 的接入步骤](https://dataxapi.com/zh/integrations/cherry-studio/) (4 项)
- [Trae 的接入步骤](https://dataxapi.com/zh/integrations/trae/) (1 项)
- [扣子 Coze 的接入步骤](https://dataxapi.com/zh/integrations/coze/) (5 项)
- [Dify 的接入步骤](https://dataxapi.com/zh/integrations/dify/) (4 项)
- [ChatGPT 的接入步骤](https://dataxapi.com/zh/integrations/chatgpt/) (登录授权，不用 Key)
- [Claude 的接入步骤](https://dataxapi.com/zh/integrations/claude/) (登录授权，不用 Key)
- [飞书 的接入步骤](https://dataxapi.com/zh/integrations/feishu/) (3 项)

任何 MCP 客户端：一个地址，一个请求头。能读环境变量的客户端从那里取 Key，不用把 Key 写进任何文件。 地址：`https://api.dataxapi.com/mcp`; 请求头：`Authorization: Bearer <key>`.

或者一条命令，替 Claude Code、Cursor、Codex 写好配置，并装上基础技能： `dataxapi setup`

[agent 自己接入时读的那一页](https://dataxapi.com/zh/agents/) · [Skills 广场](https://dataxapi.com/zh/skills/)

## 常见问题

### 多少钱？

接入不收费。找接口、看接口、续读结果、查账户都不收费。调用按接口的标价扣，$0.0003 起，失败不扣。

### 要装什么吗？

不用。它是一个远程服务，只有一个地址。`dataxapi setup` 只是把这一条写进客户端的配置（Claude Code、Cursor、Codex），并装上基础技能；用那段提示词，你的 agent 会替你做这件事。

### AI 会不问我就花钱吗？

`call` 没有标成只读，所以会在运行这类工具前询问的客户端，会先问你。不管问不问，Key 上的预算是硬上限。

### 加了新平台要重新接吗？

不用。5 个工具不变，新接口上线当天就能在 `find` 里搜到。

### 结果太长放不进上下文怎么办？

返回在约 20 KB 处按条目截断，并写明怎么往下读。24 小时内用 `read_more` 读剩下的，不扣费。

### ChatGPT、Claude 能用吗？

能，网页版和桌面版都行：用地址 https://api.dataxapi.com/mcp 添加一个自定义连接器。不用填 Key：它会让你登录 DataXAPI 并点同意，同意时选它通过哪把 Key 扣费、这把 Key 的花费上限是多少。ChatGPT: 网页版 ChatGPT：Plugins（插件）→ + → Add custom MCP server，填名称和 MCP 地址，认证选 OAuth，勾选风险提示后点 Create as a plugin。Claude: 网页版或桌面版：Customize → Connectors → + Add → Add custom connector，填名称和 MCP 地址，认证选 Sign in now（团队版和企业版由所有者在 Organization settings → Connectors 里先加）。

---

按目录修订号 0051cce45e9530b9、价目版本 22生成。 [网页版](https://dataxapi.com/zh/mcp/)
