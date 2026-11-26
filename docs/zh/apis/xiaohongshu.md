# 小红书 API

33 个接口读小红书：视频、笔记、图片、话题、用户、评论、热榜、关键词、蒲公英、小红书商城。一次 $0.0200 起。不用登录小红书，不用 Cookie；失败不收费。

也叫：Xiaohongshu (RedNote)、小红薯

## 小红书的 33 个接口，各取什么

- [小红书图片搜索](https://dataxapi.com/zh/apis/xiaohongshu/images/search.md)：按搜索词取一页小红书图片，每条是一张图片和它所在的笔记：图片地址、笔记的标题、正文、作者、点赞、评论、收藏、分享数。分享数在这里给不了（总是 0，不交付），要看分享数请用笔记详情 xiaohongshu.notes.get。
- [小红书笔记详情](https://dataxapi.com/zh/apis/xiaohongshu/notes/get.md)：按笔记编号或链接取一篇小红书笔记：标题、正文、作者、互动数、图片，以及是不是报备过的品牌合作笔记。
- [小红书评论回复](https://dataxapi.com/zh/apis/xiaohongshu/comments/replies/list.md)：按评论编号和它所在的笔记编号取一页回复：正文、回复者、点赞数、发布时间、回复的是哪一条。
- [小红书笔记评论](https://dataxapi.com/zh/apis/xiaohongshu/notes/comments/list.md)：按笔记编号或链接取一页小红书一级评论，按时间从新到旧，也可按最热：正文、评论者、点赞数、回复数、发布时间。
- [小红书笔记搜索](https://dataxapi.com/zh/apis/xiaohongshu/notes/search.md)：按搜索词取一页小红书笔记：标题、正文、作者、互动数、图片，链接带访问令牌可直接打开；标明哪条是报备过的品牌合作笔记。可按综合、最新、最多点赞、最多评论、最多收藏排，可只要视频或图文笔记、只要一天、一周或半年内发布的。
- [小红书蒲公英关键词逐日搜索指数](https://dataxapi.com/zh/apis/xiaohongshu/pgy/keywords/history.md)：按一个关键词取它在小红书上最近约三个月逐日的搜索指数（蒲公英），并带每天和这个词有关的笔记数、曝光数、阅读数和互动数。时间范围由平台定，不能选；搜索指数是平台算出的指数，不是搜索次数；日期是中国时间（UTC+8）的自然日。
- [小红书蒲公英关联词](https://dataxapi.com/zh/apis/xiaohongshu/pgy/keywords/related.md)：按一个关键词取小红书用户搜它之前和之后还会搜的词（蒲公英），各带相关度名次、搜索指数、相关笔记数和阅读数，用来拓词选题。搜索指数是平台算出的指数，不是搜索次数；平台不给数的词，这几项为 null。
- [小红书话题笔记](https://dataxapi.com/zh/apis/xiaohongshu/topics/notes/list.md)：按话题页编号取该话题下的热门笔记：标题、正文、作者、互动数、图片、话题标签。
- [小红书话题详情](https://dataxapi.com/zh/apis/xiaohongshu/topics/get.md)：按话题页编号取一个小红书话题：名称、简介、浏览数、讨论数、分享链接。
- [小红书热点](https://dataxapi.com/zh/apis/xiaohongshu/trends/list.md)：取小红书创作灵感里的热点话题：名称和平台给的热度值。
- [小红书用户资料](https://dataxapi.com/zh/apis/xiaohongshu/users/get.md)：按用户编号或主页链接取小红书账号资料：昵称、小红书号、简介、粉丝数、关注数、笔记数、是否认证，以及主页显示的性别和自填地区。
- [小红书用户笔记](https://dataxapi.com/zh/apis/xiaohongshu/users/notes/list.md)：按用户编号或主页链接取一页该账号发布的小红书笔记：标题、正文、互动数、图片、是否置顶。
- [小红书用户搜索](https://dataxapi.com/zh/apis/xiaohongshu/users/search.md)：按搜索词取一页小红书账号：用户编号、小红书号、昵称、头像、是否认证。
- [小红书商品详情](https://dataxapi.com/zh/apis/xiaohongshu/shop/products/get.md)：按商品编号取小红书商城的一件商品：标题、现价和原价（人民币）、图片、评分、评价数、店铺。看到的是 App 海外地区版本的商品页（地区每次可能不同），促销和能不能买可能和国内用户看到的不一样。
- [小红书商品评价](https://dataxapi.com/zh/apis/xiaohongshu/shop/products/reviews/list.md)：按商品编号取小红书商城这件商品排在最前的一页买家评价：正文、评分、买的规格、晒图、点赞数。
- [小红书商品搜索](https://dataxapi.com/zh/apis/xiaohongshu/shop/products/search.md)：按搜索词取一页小红书商城的商品：标题、现价和原价（人民币）、已售件数、图片、店铺。看到的是 App 海外地区版本的商城（地区每次可能不同），促销和能不能买可能和国内用户看到的不一样。
- [小红书蒲公英博主搜索](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/search.md)：按搜索词找蒲公英上的小红书博主（按博主写的内容匹配）：博主编号、昵称、小红书号、所在地、内容类目、粉丝数，完整档另有图文和视频报价、阅读和互动中位数。也可以按蒲公英找博主的筛选条件找，或和搜索词一起用：粉丝数、报价、预估 CPM、日常和合作笔记的阅读与互动中位数、主做图文或视频、博主类目、擅长内容、人设、所在地、性别、粉丝性别和年龄、近期合作行业，可剔除低活跃和掉粉的；按粉丝数、报价、阅读、互动、外溢进店、阅读单价、回复率、涨粉、完播率等排序。一次搜索最多翻到前 5000 位。其他蒲公英接口要的博主编号从这里取。
- [小红书蒲公英博主详情](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/get.md)：按蒲公英博主编号取这位小红书博主在蒲公英上的资料：昵称、小红书号、所在地、内容类目、粉丝数，完整档另有图文和视频报价、最低报价、接不接图文和视频合作、商业笔记数和近 30 天合作笔记数、阅读和互动中位数、性别、内容特征和人设标签、合作过的行业、签约机构（MCN）、获赞与收藏。
- [小红书蒲公英博主粉丝画像](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/audience/get.md)：按蒲公英博主编号取这位小红书博主的粉丝画像：性别、年龄、省份、城市、兴趣、设备各段的占比，和数据是哪一天的。
- [小红书蒲公英博主数据表现](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/metrics.md)：按蒲公英博主编号取这位小红书博主近 30 天或 90 天日常笔记或合作笔记的数据表现：笔记数和视频笔记数，曝光、阅读、互动、涨粉的中位数，互动率，完播率，点赞过百和过千的笔记占比，和超过了多少同类博主；曝光和阅读来自发现页、搜索、关注页等入口的占比。完整档另有逐篇笔记的曝光、阅读、互动和比中位数高出多少，以及长效笔记（约半年前发布的笔记）近期和长效阅读的数和来源。
- [小红书蒲公英博主笔记](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/notes/list.md)：按蒲公英博主编号取一页这位小红书博主的笔记（蒲公英的“笔记案例”），带蒲公英给的数据：阅读数、点赞数、收藏数、外溢进店人数、是否商业合作和合作品牌、是否带过付费推广流量。可只看合作笔记、跨域合作笔记、图文或视频，按最新、阅读最多或互动最多排，按内容特征或类目筛，阅读数可只算自然流量。
- [小红书搜索框联想词](https://dataxapi.com/zh/apis/xiaohongshu/keywords/related.md)：按关键词取小红书搜索框里输入这个词时给的联想词（下拉补全），按小红书列出的顺序排，一次约 10 个。只有词和名次，没有指数。
- [小红书视频笔记详情（视频地址和字幕）](https://dataxapi.com/zh/apis/xiaohongshu/videos/get.md)：按笔记编号或链接取一篇小红书视频笔记：标题、正文、作者、互动数，加上视频文件地址、时长、封面、平台生成的中文字幕（SRT，可当文字稿），以及是不是报备过的品牌合作笔记。只用于视频笔记；图文笔记用笔记详情。
- [小红书视频转文字（文案提取、逐字稿）](https://dataxapi.com/zh/apis/xiaohongshu/videos/transcript/get.md)：给一篇小红书视频笔记的链接、分享文案或编号，返回视频里说的话：全文、每一句的起止时间和现成的 SRT 字幕，连同标题、作者和时长；平台给视频生成了字幕的直接用字幕，没有的识别语音，可以区分说话人。每次收费，识别语音的另按视频分钟数收，用平台字幕的不另收，没人说话不收。5 分钟以内的视频直接返回文字；超过 5 分钟、2 小时以内的先回一个凭证（job），过一会儿带着它再调这个接口取文字，按实际分钟数收，只在取到文字时收。
- [小红书蒲公英博主粉丝趋势](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/followers/history.md)：按蒲公英博主编号取这位小红书博主最近 30 天或 60 天每天的粉丝数，以及这段时间净增多少、涨了百分之几。看博主有没有在涨粉、有没有突然掉粉或刷粉。
- [小红书蒲公英相似博主](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/related.md)：给一个蒲公英博主编号，取蒲公英推荐的和他相似的小红书博主：博主编号、昵称、小红书号、所在地、内容类目、粉丝数，完整档另有报价和阅读、互动中位数。一次 4 位（蒲公英一页就 4 位），通常共几位到几十位，可以翻页。
- [小红书蒲公英内容广场热门笔记](https://dataxapi.com/zh/apis/xiaohongshu/pgy/notes/trending.md)：取蒲公英内容广场的热门笔记榜：小红书热门、产品种草、电商推广、蒲公英合作等 8 个榜，看整榜或只看和某个词有关的，近 3、7、14、30 天，可只要图文或视频。每条有标题、发布时间、阅读、点赞、收藏、评论、图片，和博主的编号、昵称、粉丝数。不用给编号，适合找爆款和选题。
- [小红书蒲公英博主合作成本和数据概览](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/costs/metrics.md)：按蒲公英博主编号取这位小红书博主的合作成本：图文和视频的预估 CPM、预估互动单价、预估阅读单价、预估外溢进店单价，每项都带优于多少同行；还有单篇笔记曝光、阅读、互动、外溢进店的中位数，近 30 天粉丝增长率和发布笔记数，邀约 48 小时回复率和“好联系”标记，近 7 天活跃天数和“活跃”标记，蒲公英标的优势，内容类型占比和合作过的行业。可看日常笔记或合作笔记两种口径。
- [小红书蒲公英博主粉丝概览](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/followers/metrics.md)：按蒲公英博主编号取这位小红书博主粉丝的质量：粉丝数和近 30 天净增，活跃粉丝、互动粉丝、阅读粉丝、购买粉丝各有多少、占全部粉丝的比例，和超过了多少同类博主。看粉丝是不是真的在看、在买。
- [小红书蒲公英博主核心数据趋势](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/costs/history.md)：按蒲公英博主编号取这位小红书博主最近 30 天或 90 天每天的核心数据：CPM、CPE（互动单价）、CPV（阅读单价）、外溢进店单价，和单篇笔记曝光、阅读、互动、外溢进店人数的中位数，以及整段的汇总。可看日常笔记或合作笔记两种口径，看博主的投放性价比是在变好还是变差。
- [小红书蒲公英笔记数据](https://dataxapi.com/zh/apis/xiaohongshu/pgy/notes/get.md)：按笔记编号取蒲公英给品牌看的这篇小红书笔记的数据：曝光、阅读、点赞、收藏、评论、分享、带来的涨粉，报备的合作品牌，品牌组件（评论区、正文、底部）的点击率档位，以及标题、正文、图片、发布时间和博主编号。合作笔记结案、核对博主交付用。蒲公英只给自己博主的笔记数据，取不到数据的笔记（如品牌自己发的）返回 404。
- [小红书无水印原图和实况图下载地址](https://dataxapi.com/zh/apis/xiaohongshu/notes/media/get.md)：给一篇小红书图文笔记的编号、链接或分享文字，返回每张图片的无水印原图地址（平台保存的最大尺寸，带宽高和格式），实况图另给那段视频的地址；地址不用带请求头，过期了再调一次即可。只用于图文笔记，视频笔记用 xiaohongshu.videos.media.get。
- [小红书无水印视频下载地址（各档清晰度和字幕）](https://dataxapi.com/zh/apis/xiaohongshu/videos/media/get.md)：给一篇小红书视频笔记的编号、链接或分享文字，返回无水印视频的全部文件地址：每种编码（H.264、H.265 等）的每档清晰度，带宽高、码率和大小，另有备用地址，以及封面和平台生成的字幕文件（SRT，按语言给）；地址不用带请求头，取不到了再调一次即可。只用于视频笔记，图文笔记用 xiaohongshu.notes.media.get。

## 接口

### 视频 (3)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [小红书视频笔记详情（视频地址和字幕）](https://dataxapi.com/zh/apis/xiaohongshu/videos/get.md) | `GET /v1/xiaohongshu/videos/get` | 内容 | $0.0200 / 次 |
| [小红书无水印视频下载地址（各档清晰度和字幕）](https://dataxapi.com/zh/apis/xiaohongshu/videos/media/get.md) | `GET /v1/xiaohongshu/videos/media/get` | 视频和图片文件 | $0.0200 / 次 |
| [小红书视频转文字（文案提取、逐字稿）](https://dataxapi.com/zh/apis/xiaohongshu/videos/transcript/get.md) | `GET /v1/xiaohongshu/videos/transcript/get` | 逐字稿 | $0.0200 / 次 |

### 笔记 (4)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [小红书笔记搜索](https://dataxapi.com/zh/apis/xiaohongshu/notes/search.md) | `GET /v1/xiaohongshu/notes/search` | 内容列表 | $0.0200 / 次 |
| [小红书笔记详情](https://dataxapi.com/zh/apis/xiaohongshu/notes/get.md) | `GET /v1/xiaohongshu/notes/get` | 内容 | $0.0200 / 次 |
| [小红书无水印原图和实况图下载地址](https://dataxapi.com/zh/apis/xiaohongshu/notes/media/get.md) | `GET /v1/xiaohongshu/notes/media/get` | 视频和图片文件 | $0.0200 / 次 |
| [小红书笔记评论](https://dataxapi.com/zh/apis/xiaohongshu/notes/comments/list.md) | `GET /v1/xiaohongshu/notes/comments/list` | 评论列表 | $0.0200 / 次 |

### 图片 (1)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [小红书图片搜索](https://dataxapi.com/zh/apis/xiaohongshu/images/search.md) | `GET /v1/xiaohongshu/images/search` | 内容列表 | $0.0200 / 次 |

### 话题 (2)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [小红书话题详情](https://dataxapi.com/zh/apis/xiaohongshu/topics/get.md) | `GET /v1/xiaohongshu/topics/get` | 话题 | $0.0200 / 次 |
| [小红书话题笔记](https://dataxapi.com/zh/apis/xiaohongshu/topics/notes/list.md) | `GET /v1/xiaohongshu/topics/notes/list` | 内容列表 | $0.0200 / 次 |

### 用户 (3)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [小红书用户搜索](https://dataxapi.com/zh/apis/xiaohongshu/users/search.md) | `GET /v1/xiaohongshu/users/search` | 账号列表 | $0.0200 / 次 |
| [小红书用户资料](https://dataxapi.com/zh/apis/xiaohongshu/users/get.md) | `GET /v1/xiaohongshu/users/get` | 账号 | $0.0200 / 次 |
| [小红书用户笔记](https://dataxapi.com/zh/apis/xiaohongshu/users/notes/list.md) | `GET /v1/xiaohongshu/users/notes/list` | 内容列表 | $0.0200 / 次 |

### 评论 (1)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [小红书评论回复](https://dataxapi.com/zh/apis/xiaohongshu/comments/replies/list.md) | `GET /v1/xiaohongshu/comments/replies/list` | 评论列表 | $0.0200 / 次 |

### 热榜 (1)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [小红书热点](https://dataxapi.com/zh/apis/xiaohongshu/trends/list.md) | `GET /v1/xiaohongshu/trends/list` | 热点列表 | $0.0200 / 次 |

### 关键词 (1)

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [小红书搜索框联想词](https://dataxapi.com/zh/apis/xiaohongshu/keywords/related.md) | `GET /v1/xiaohongshu/keywords/related` | 关联词列表 | $0.0200 / 次 |

### [蒲公英](https://dataxapi.com/zh/apis/xiaohongshu/pgy.md) (14)

小红书官方的博主合作平台：博主搜索、报价、粉丝画像和数据表现，以及关键词搜索指数。

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [小红书蒲公英博主搜索](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/search.md) | `GET /v1/xiaohongshu/pgy/creators/search` | 达人列表 | $0.0400 / 次 |
| [小红书蒲公英博主粉丝画像](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/audience/get.md) | `GET /v1/xiaohongshu/pgy/creators/audience/get` | 粉丝画像 | $0.0400 / 次 |
| [小红书蒲公英博主详情](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/get.md) | `GET /v1/xiaohongshu/pgy/creators/get` | 达人 | $0.0400 / 次 |
| [小红书蒲公英笔记数据](https://dataxapi.com/zh/apis/xiaohongshu/pgy/notes/get.md) | `GET /v1/xiaohongshu/pgy/notes/get` | 蒲公英笔记详情 | $0.0400 / 次 |
| [小红书蒲公英博主核心数据趋势](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/costs/history.md) | `GET /v1/xiaohongshu/pgy/creators/costs/history` | 蒲公英博主核心数据趋势 | $0.0400 / 次 |
| [小红书蒲公英博主合作成本和数据概览](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/costs/metrics.md) | `GET /v1/xiaohongshu/pgy/creators/costs/metrics` | 蒲公英博主合作成本和数据概览 | $0.0400 / 次 |
| [小红书蒲公英博主粉丝趋势](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/followers/history.md) | `GET /v1/xiaohongshu/pgy/creators/followers/history` | 粉丝数变化 | $0.0400 / 次 |
| [小红书蒲公英博主粉丝概览](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/followers/metrics.md) | `GET /v1/xiaohongshu/pgy/creators/followers/metrics` | 蒲公英博主粉丝概览 | $0.0400 / 次 |
| [小红书蒲公英博主数据表现](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/metrics.md) | `GET /v1/xiaohongshu/pgy/creators/metrics` | 蒲公英博主数据表现 | $0.0400 / 次 |
| [小红书蒲公英博主笔记](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/notes/list.md) | `GET /v1/xiaohongshu/pgy/creators/notes/list` | 蒲公英博主笔记列表 | $0.0400 / 次 |
| [小红书蒲公英相似博主](https://dataxapi.com/zh/apis/xiaohongshu/pgy/creators/related.md) | `GET /v1/xiaohongshu/pgy/creators/related` | 达人列表 | $0.0400 / 次 |
| [小红书蒲公英关键词逐日搜索指数](https://dataxapi.com/zh/apis/xiaohongshu/pgy/keywords/history.md) | `GET /v1/xiaohongshu/pgy/keywords/history` | 关键词指数历史 | $0.0400 / 次 |
| [小红书蒲公英关联词](https://dataxapi.com/zh/apis/xiaohongshu/pgy/keywords/related.md) | `GET /v1/xiaohongshu/pgy/keywords/related` | 关联词列表 | $0.0400 / 次 |
| [小红书蒲公英内容广场热门笔记](https://dataxapi.com/zh/apis/xiaohongshu/pgy/notes/trending.md) | `GET /v1/xiaohongshu/pgy/notes/trending` | 内容列表 | $0.0400 / 次 |

### [小红书商城](https://dataxapi.com/zh/apis/xiaohongshu/shop.md) (3)

小红书商城的公开商品数据：商品搜索、商品详情和买家评价。

| 接口 | 请求 | 返回 | 价格 |
| --- | --- | --- | --- |
| [小红书商品搜索](https://dataxapi.com/zh/apis/xiaohongshu/shop/products/search.md) | `GET /v1/xiaohongshu/shop/products/search` | 商品列表 | $0.0200 / 次 |
| [小红书商品详情](https://dataxapi.com/zh/apis/xiaohongshu/shop/products/get.md) | `GET /v1/xiaohongshu/shop/products/get` | 商品 | $0.0200 / 次 |
| [小红书商品评价](https://dataxapi.com/zh/apis/xiaohongshu/shop/products/reviews/list.md) | `GET /v1/xiaohongshu/shop/products/reviews/list` | 评价列表 | $0.0200 / 次 |

## 调用前要知道的

- **每页条数**：列表每页 4 到 120 条，各接口不同。16 个列表里有 12 个能翻页：把 `page.next_cursor` 作为 `cursor` 传回，每一页是一次单独的调用。其余只有一页。
- **给不了的字段**：33 个接口里有 23 个填不满它返回的对象。每个接口的页面列出了给不了哪些，每次返回也在 `meta.unavailable` 里再写一遍：缺的字段不会被悄悄写成 0。
- **对象不存在时读起来像空结果**：小红书评论回复、小红书蒲公英关联词、小红书话题笔记、小红书商品评价、小红书蒲公英博主笔记、小红书搜索框联想词、小红书蒲公英相似博主：对象不存在和对象下面没有东西分不出来，所以返回空结果而不是 404。
- **预览结构**：有 18 个接口返回的是预览结构，字段还可能调整；其余返回统一的结构，所有平台都一样。
- **快照**：小红书热点、小红书蒲公英内容广场热门笔记：榜单是每 10 分钟刷新一次的快照，`meta.fetched_at` 写明是什么时候取的。

## 调用结果不对时先看这里

- **编号都是 24 位**：笔记、用户、话题、商品的编号都是 24 位十六进制。笔记链接最后一段就是编号（/explore/编号 或 /discovery/item/编号）；短链和分享口令不收。
- **搜索结果只是摘录**：搜索返回的是结果卡片，不是笔记本身：正文是摘录，标题里的表情被去掉了。用户笔记列表只给正文前 100 个字。要全文，用笔记详情。
- **能打开的链接**：搜索结果里的链接带着网页要的访问令牌，能直接打开。用户笔记列表不给链接，拿笔记编号取一次详情就有了。
- **没有浏览量**：笔记不带浏览量，平台本身不给。
- **蒲公英博主编号**：蒲公英的接口用蒲公英博主编号，从蒲公英博主搜索里取。这个搜索按博主写的内容匹配，没有博主对得上的词，也会给出沾边的博主，不返回空。

## 常见问题

### 小红书有官方 API 吗？

有，但面向电商。小红书开放平台的文档讲订单、售后、商品、库存、物流和财务，没有笔记、评论或搜索。应用要先过资质审核；商家自用应用绑定店铺主账号，店铺不能是个人店，也只有店铺主账号能授权。新服务商默认每个应用每秒 100 次、每个方法 200 次。

### 通过 API 能拿到小红书的哪些数据？

33 个接口：视频、笔记、图片、话题、用户、评论、热榜、关键词、蒲公英、小红书商城。每个接口的页面写明参数、返回字段，并附一份录制的真实返回。

### 怎么调用小红书 API？

注册拿一把 Key，放进请求头 `Authorization: Bearer <key>`，按接口的地址发请求，比如 `GET https://api.dataxapi.com/v1/xiaohongshu/images/search`。也可以把 DataXAPI 接进 Claude、Cursor 或 ChatGPT（MCP），用一句话让 AI 去调。注册可免费试用，不用绑卡。

### 小红书接口的返回给 AI 用，占多少 token？

小红书的 21 个接口各取一份录制的真实返回，平台原始 JSON 合计 48 万 token，AI 通过 DataXAPI 的 MCP 读到的只有 3.6 万 token，少 92%；直接调接口拿到的 JSON 也少 85%（2026-11-06 统计）。所有平台同一套字段名，用 fields 还能只取你要的字段。

### 小红书 API 怎么收费？

按次收费，没有订阅。一次 $0.0200 到 $0.0400，每个接口的页面写明自己的价格。拿到数据才扣费，失败不收。

### 需要小红书账号或 Cookie 吗？

不需要。你只拿一把 DataXAPI 的 Key：不用登录小红书，不用 Cookie，也不用养设备。接口只返回公开可见的数据。

### 数据是实时的吗？

每次调用都当场去小红书取，`meta.fetched_at` 写明取到的时间。小红书热点、小红书蒲公英内容广场热门笔记：榜单是每 10 分钟刷新一次的快照。结果保留 24 小时，带同一个 `Idempotency-Key` 重试不会再扣一次。

### 小红书改版了怎么办？

调用失败不管什么原因都不扣费。被暂停的接口返回 `capability_paused`，同样不扣费；`GET /v1/catalog/status` 写着现在哪些能用。

## 怎么做和常见问题

- [如何批量获取小红书笔记评论](https://dataxapi.com/zh/guides/xiaohongshu-note-comments.md)
- [如何查小红书蒲公英博主报价和粉丝画像](https://dataxapi.com/zh/guides/xiaohongshu-pgy-creator-rates.md)
- [如何按关键词搜索并导出小红书笔记](https://dataxapi.com/zh/guides/xiaohongshu-search-export-notes.md)
- [如何查小红书蒲公英关键词的搜索指数和关联词](https://dataxapi.com/zh/guides/xiaohongshu-pgy-keywords.md)
- [小红书有 API 吗？用 Python 拉取笔记和评论（2026）](https://dataxapi.com/zh/guides/xiaohongshu-api-python.md)
- [小红书数据怎么导出？](https://dataxapi.com/zh/answers/export-xiaohongshu-data.md)
- [ChatGPT 能读小红书吗？](https://dataxapi.com/zh/answers/can-chatgpt-read-xiaohongshu.md)
- [小红书 xsec_token 是什么？](https://dataxapi.com/zh/answers/xiaohongshu-xsec-token.md)
- [小红书笔记编号和 xhslink 短链接是什么？](https://dataxapi.com/zh/answers/xiaohongshu-note-id-and-xhslink.md)
- [小红书蒲公英 CPE 和抖音星图 CPE 有什么不同？](https://dataxapi.com/zh/answers/xiaohongshu-pgy-cpe-vs-xingtu-cpe.md)
- [小红书蒲公英是什么？通过 API 能拿到哪些博主数据？](https://dataxapi.com/zh/answers/what-is-xiaohongshu-pgy.md)
- [小红书数据接口哪个好？官方开放平台、第三方接口、自己爬怎么选（2026）](https://dataxapi.com/zh/answers/best-xiaohongshu-data-api.md)
- [小红书开放平台能拿到笔记和评论吗（2026）](https://dataxapi.com/zh/answers/xiaohongshu-open-platform-api.md)
- [DataXAPI 和阿里的 DataX 是一回事吗（2026）](https://dataxapi.com/zh/answers/dataxapi-is-not-datax.md)
- [不开年费，怎么让 AI 每周盯同行的公众号、小红书和抖音（2026）](https://dataxapi.com/zh/answers/track-competitors-with-ai-pay-per-lookup.md)
- [投放前怎么看抖音、小红书的关键词热度（2026）](https://dataxapi.com/zh/answers/douyin-xiaohongshu-keyword-heat.md)
- [xiaohongshu-mcp 登录老失效，有不用登录的小红书 MCP 吗（2026）](https://dataxapi.com/zh/answers/xiaohongshu-mcp-without-login.md)
- [Claude Code、Cursor、Codex 怎么读小红书，不用 Cookie（2026）](https://dataxapi.com/zh/answers/claude-code-cursor-codex-read-xiaohongshu.md)
- [小红书 Skill、抖音 Skill 怎么接（2026）](https://dataxapi.com/zh/answers/xiaohongshu-douyin-skill.md)
- [小红书博主全部笔记怎么导出 Excel（2026）](https://dataxapi.com/zh/answers/export-xiaohongshu-creator-notes-excel.md)
- [小红书笔记评论怎么批量导出，分析用户痛点（2026）](https://dataxapi.com/zh/answers/export-xiaohongshu-comments-pain-points.md)
- [投后怎么批量回收小红书笔记互动数据（2026）](https://dataxapi.com/zh/answers/collect-xiaohongshu-note-metrics-after-campaign.md)
- [小红书笔记搜索排名怎么批量查（2026）](https://dataxapi.com/zh/answers/xiaohongshu-search-rank-tracking.md)
- [BettaFish 没有数据怎么办：怎么接小红书、抖音的公开数据（2026）](https://dataxapi.com/zh/answers/bettafish-data-source.md)
- [TrendRadar 怎么加公众号、小红书数据（2026）](https://dataxapi.com/zh/answers/trendradar-wechat-xiaohongshu.md)
- [小红书 MCP 报 300011 账号异常、海外服务器跳 rednote 怎么办（2026）](https://dataxapi.com/zh/answers/xiaohongshu-mcp-300011.md)
- [不写代码，怎么让 AI 帮你取公众号、小红书、抖音数据（可复制的话，2026）](https://dataxapi.com/zh/answers/get-social-data-with-ai-no-code.md)
- [MediaCrawler 抓小红书被封、报 461，换什么（2026）](https://dataxapi.com/zh/answers/mediacrawler-alternative.md)
- [蝉妈妈、千瓜、新榜有 API 吗？想要原始数据怎么办（2026）](https://dataxapi.com/zh/answers/chanmama-qiangua-newrank-api.md)
- [用第三方接口采集小红书、抖音的公开数据合法吗（2026）](https://dataxapi.com/zh/answers/is-public-social-data-collection-legal.md)
- [小红书接口返回 461 是什么意思（2026）](https://dataxapi.com/zh/answers/xiaohongshu-461-status-code.md)
- [n8n 怎么接小红书数据（2026）](https://dataxapi.com/zh/answers/xiaohongshu-n8n.md)
- [飞书多维表格怎么同步小红书笔记数据（2026）](https://dataxapi.com/zh/answers/xiaohongshu-feishu-base.md)
- [Dify 怎么接小红书数据（MCP，2026）](https://dataxapi.com/zh/answers/xiaohongshu-dify.md)
- [用数据接口会封我的小红书、抖音账号吗（2026）](https://dataxapi.com/zh/answers/will-data-api-get-my-account-banned.md)
- [DataXAPI 这类数据接口合规吗（2026）](https://dataxapi.com/zh/answers/is-dataxapi-compliant.md)
- [DataXAPI 可靠吗、靠谱吗？能自己核对的事实（2026）](https://dataxapi.com/zh/answers/is-dataxapi-reliable.md)
- [小红书爆款选题怎么批量找（2026）](https://dataxapi.com/zh/answers/xiaohongshu-hit-topic-ideas.md)
- [小红书选品怎么查：哪些单品卖得好、买家怎么说（2026）](https://dataxapi.com/zh/answers/xiaohongshu-product-research.md)
- [怎么低成本发现小红书上关于自己品牌的负面（2026）](https://dataxapi.com/zh/answers/spot-xiaohongshu-brand-complaints.md)
- [小红书爬虫总被封，自己维护和按次调用各要花多少（2026）](https://dataxapi.com/zh/answers/xiaohongshu-scraper-blocked-cost.md)
- [怎么用 AI 给账号做诊断和复盘（2026）](https://dataxapi.com/zh/answers/ai-account-audit-and-review.md)
- [蒲公英博主怎么批量导出（2026）](https://dataxapi.com/zh/answers/export-xiaohongshu-pgy-creators.md)
- [小红书 x-s、x-t 是什么（2026）](https://dataxapi.com/zh/answers/xiaohongshu-x-s-x-t.md)
- [小红书 300011、300012、300013 错误码是什么意思（2026）](https://dataxapi.com/zh/answers/xiaohongshu-300011-300013-error-codes.md)
- [扣子怎么接小红书数据（2026）](https://dataxapi.com/zh/answers/xiaohongshu-coze.md)
- [有没有能让 Claude 查小红书、抖音、公众号的 MCP？（2026）](https://dataxapi.com/zh/answers/china-social-data-mcp.md)
- [一个 Key 调小红书、抖音、公众号：社媒数据 API 聚合怎么选（2026）](https://dataxapi.com/zh/answers/one-key-china-social-data-api.md)
- [中文社媒品牌监测怎么做？微博、抖音、小红书一起查（2026）](https://dataxapi.com/zh/answers/chinese-social-media-brand-monitoring.md)
- [热榜 API：抖音热搜、微博热搜、知乎热榜、B站热门怎么用程序取（2026）](https://dataxapi.com/zh/answers/china-trending-api.md)
- [抖音、小红书达人数据怎么批量取？KOL 资料、作品和报价（2026）](https://dataxapi.com/zh/answers/douyin-xiaohongshu-creator-data.md)
- [用户口碑怎么批量取？小红书、抖音评论和电商评价（2026）](https://dataxapi.com/zh/answers/product-reviews-chinese-social-media.md)
- [舆情监控 API 有哪些？一个关键词同时查微博、抖音、小红书等平台（2026）](https://dataxapi.com/zh/answers/social-listening-api-china.md)
- [社媒数据接口常见问题：按平台说清能取什么、不能取什么（2026）](https://dataxapi.com/zh/answers/social-media-data-api-faq.md)
- [中国社媒营销数据工具大全：巨量算数、蒲公英、星图、微信指数等官方工具和数据接口（2026）](https://dataxapi.com/zh/answers/chinese-social-media-marketing-data-tools.md)
- [哪个社媒数据接口最适合接给 AI？看一次返回占多少 token（2026）](https://dataxapi.com/zh/answers/social-media-api-for-ai-agents.md)
- [社媒接口返回太长，AI 上下文被塞满、token 烧得快怎么办？](https://dataxapi.com/zh/answers/api-response-too-many-tokens.md)
- [在 Claude Code、Codex 里怎么取抖音、公众号、小红书数据？（2026）](https://dataxapi.com/zh/answers/claude-code-codex-china-social-data.md)
- [写论文要采集微博评论、小红书笔记，不会写代码怎么办？（2026）](https://dataxapi.com/zh/answers/social-media-data-for-thesis-research.md)
- [用中国社媒数据做投研（另类数据）：能取哪些信号，怎么取（2026）](https://dataxapi.com/zh/answers/chinese-social-media-alternative-data.md)
- [微信搜一搜联想词（下拉词）怎么批量取？（2026）](https://dataxapi.com/zh/answers/wechat-search-suggestions-api.md)
- [社媒数据接口给 AI 用要多少 token？每个接口逐个实测（2026）](https://dataxapi.com/zh/answers/social-media-api-token-benchmark.md)
- [给 AI 和 agent 用的小红书数据接口：返回省 token、Claude 和 Cursor 直接调（2026）](https://dataxapi.com/zh/answers/xiaohongshu-api-for-ai-agents.md)
- [小红书视频怎么用 API 拿到视频地址和字幕？（2026）](https://dataxapi.com/zh/answers/xiaohongshu-video-url-subtitles-api.md)
- [小红书视频怎么转文字？用平台字幕直接拿文字稿（2026）](https://dataxapi.com/zh/answers/xiaohongshu-video-to-text.md)
- [抖音、小红书搜索框的联想词（下拉词）怎么用 API 批量取？（2026）](https://dataxapi.com/zh/answers/douyin-xiaohongshu-search-suggestions-api.md)
- [怎么看一个小红书博主每天的涨粉、掉粉？（2026）](https://dataxapi.com/zh/answers/xiaohongshu-creator-follower-growth.md)
- [怎么找和某个小红书博主相似的博主？（2026）](https://dataxapi.com/zh/answers/find-similar-xiaohongshu-creators.md)
- [小红书爆款笔记榜怎么用 API 拿到？（2026）](https://dataxapi.com/zh/answers/xiaohongshu-trending-notes-api.md)
- [怎么查小红书博主的 CPM、互动单价和阅读单价？（2026）](https://dataxapi.com/zh/answers/xiaohongshu-creator-cpm-cost.md)
- [小红书“外溢进店单价”是什么，怎么查？（2026）](https://dataxapi.com/zh/answers/xiaohongshu-spillover-store-visit-cost.md)
- [怎么看小红书博主的粉丝是不是真粉？活跃、阅读、购买粉丝怎么查（2026）](https://dataxapi.com/zh/answers/xiaohongshu-creator-follower-quality.md)
- [小红书博主的 CPM 每天怎么变？蒲公英核心数据趋势怎么拿（2026）](https://dataxapi.com/zh/answers/xiaohongshu-creator-cpm-trend.md)
- [MCN 和品牌怎么批量给小红书博主选号、建达人库？（2026）](https://dataxapi.com/zh/answers/xiaohongshu-kol-selection-api.md)
- [小红书蒲公英达人页上的每个数据，API 都能取到吗？逐项对照（2026）](https://dataxapi.com/zh/answers/xiaohongshu-pgy-creator-page-fields.md)
- [蒲公英笔记的自然流量和推广流量有什么区别？怎么只看自然阅读（2026）](https://dataxapi.com/zh/answers/xiaohongshu-pgy-organic-vs-promoted-reads.md)
- [怎么只看一个小红书博主的合作笔记（商单）？（2026）](https://dataxapi.com/zh/answers/xiaohongshu-creator-sponsored-notes.md)
- [小红书合作笔记的结案数据（曝光、阅读、涨粉）怎么用 API 取？（2026）](https://dataxapi.com/zh/answers/xiaohongshu-sponsored-note-campaign-report.md)
- [怎么看小红书博主好不好联系、活不活跃？（2026）](https://dataxapi.com/zh/answers/xiaohongshu-creator-easy-to-reach-active.md)
- [小红书博主笔记的流量来自哪里？发现页、搜索、关注占比怎么查（2026）](https://dataxapi.com/zh/answers/xiaohongshu-note-traffic-sources.md)
- [小红书报备的品牌合作笔记怎么识别？（2026）](https://dataxapi.com/zh/answers/xiaohongshu-sponsored-note-detection.md)
- [蒲公英找博主的筛选条件，能用 API 调吗？（2026）](https://dataxapi.com/zh/answers/xiaohongshu-pgy-find-creator-filters-api.md)

---

怎么调用、怎么计费、怎么处理报错，所有接口都一样：https://dataxapi.com/zh/llms.txt

最后核对于 2026-11-26 12:17 UTC。目录修订号 0051cce45e9530b9。 [网页版](https://dataxapi.com/zh/apis/xiaohongshu/)
