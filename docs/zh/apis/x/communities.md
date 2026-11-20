# X 社群 API（推特社群）

3 个接口读 X 社群：社群资料、帖子、成员。一次 $0.0003 到 $0.0080。不用登录 X，不用 Cookie；失败不收费。

也叫：X Communities

## 这组数据是什么

**X 社群（Communities）是大家围绕一个主题加入、在里面发帖的小组。**这组接口按社群编号读社群资料、社群里的一页帖子和一页成员。

社群按和 Reddit 子版块同样的社区对象返回，帖子按内容对象返回，成员按账号对象返回，读 X 其他帖子和账号的代码这里照样能用。

- **成员和管理员**：`metrics.members` 是加入的人数。完整档里，`ext.moderators` 是管理员人数，`ext.join_policy` 是加入方式，按平台原文写（比如 Open）。
- **社群编号**：一串数字，就是社群链接最后那一段。这里没有搜社群的接口，要从已知的社群开始。
- **帖子的数**：帖子的数和 X 其他帖子一样：`metrics.comments` 是回复数，`metrics.favorites` 是书签数，`metrics.reposts` 是转推数，引用另计在 `ext.quotes`。

## 这 3 个接口

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [X 社群成员](https://dataxapi.com/zh/apis/x/communities/members/list.md) | `GET /v1/x/communities/members/list` | 账号列表 | $0.0004 / 条 |
| [X 社群资料](https://dataxapi.com/zh/apis/x/communities/get.md) | `GET /v1/x/communities/get` | 社区 | $0.0004 / 次 |
| [X 社群帖子](https://dataxapi.com/zh/apis/x/communities/posts/list.md) | `GET /v1/x/communities/posts/list` | 内容列表 | $0.0003 / 条 |

## 一个典型用法，和它的账单

**盯一个社群一周。**读一次社群资料，每天读一页帖子，读一页成员。帖子和成员按返回的条数计费，所以下面的账单是最多会花的数。

| 调用 | 次数 | 花费 |
| --- | --- | --- |
| X 社群资料 | 1 × $0.0004 | $0.0004 |
| X 社群帖子 | 7 × $0.0060 (最多) | $0.0420 |
| X 社群成员 | 1 × $0.0080 (最多) | $0.0080 |
| 合计 9 次调用 |  | 最多 $0.0504 |

## 在你的 AI 里用它

> 用 DataXAPI 读这个 X 社群最新的帖子，告诉我这周成员在聊什么。

## 常见问题

### 多少钱？

按次收费，没有订阅。一次 $0.0003 到 $0.0080，每个接口的页面写明自己的价格。有 2 个接口按返回的条数计费，每次有最低和最高。拿到数据才扣费，失败不收。

### 社群编号写错了会怎样？

社群资料接口返回 `not_found`，不收费。帖子和成员列表分不清“社群不存在”和“里面没东西”：两种都返回空结果。先用社群资料接口核对编号。

### 一次返回多少帖子和成员？

每页最多各 20 条；把 `page.next_cursor` 作为 `cursor` 传回去取下一页。两个都按返回的条数计费。

### 需要 X 社群或 X 的账号吗？

不需要。你只拿一把 DataXAPI 的 Key：不用登录 X，不用 Cookie，也不用广告主账号。

## 别处的同类数据

- [X 列表 API](https://dataxapi.com/zh/apis/x/lists.md)：X 的列表：列表里的帖子、成员和关注者。

[X（推特）API](https://dataxapi.com/zh/apis/x.md)

---

怎么调用、怎么计费、怎么处理报错，所有接口都一样：https://dataxapi.com/zh/llms.txt

最后核对于 2026-11-20 07:17 UTC。目录修订号 720fc3ea8dadb865。 [网页版](https://dataxapi.com/zh/apis/x/communities/)
