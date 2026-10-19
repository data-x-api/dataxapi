# Post object

81 endpoints on 19 platforms return the Post object with the same 28 fields, so code written for one platform reads the others unchanged. A call costs $0.0003 to $0.0200.

For machines: [post schema](https://dataxapi.com/openapi.json#/components/schemas/post), [openapi.json](https://dataxapi.com/openapi.json), [Object table (JSON)](https://api.dataxapi.com/v1/catalog/objects), [llms.txt](https://dataxapi.com/llms.txt)

A Post is one piece of published content: a video, a note, a tweet, an article, a message in a channel. Every platform's posts come back with the same fields, so `text`, `author`, `published_at` and the likes in `metrics` sit in the same place on Douyin and on YouTube.

A post's `author` is the account that published it, with its `id` and `username`; comments under it point back with `post_id`, and so does the transcript of a video post. On X (Twitter) a reply is itself a post, and its `post_id`, `parent_id` and `root_id` say which thread it hangs in.

## Fields

A field the platform cannot give is left out of the item and named in `meta.unavailable`. It is never filled with a guess or a zero.

| Field | Type | From view | Description |
| --- | --- | --- | --- |
| `id` | text | `compact` | ID; pass it unchanged to the get endpoint |
| `url` | link | `compact` | Link that opens the post |
| `type` | text | `compact` | Content format: `video`, `image`, `text`, `article` |
| `title` | text | `compact` | Title |
| `text` | text | `compact` | Body text |
| `lang` | text | `standard` | Language of the text |
| `published_at` | time | `compact` | When it was published |
| `author` | object | `compact` | Author |
| `author.id` | text | `compact` | Author's account ID |
| `author.username` | text | `compact` | Author's handle |
| `author.name` | text | `compact` | Author's display name |
| `author.avatar_url` | link | `standard` | Author's avatar |
| `author.verified` | yes/no | `standard` | Whether the author is verified |
| `author.followers` | integer | `standard` | Author's follower count |
| `metrics` | object | `compact` | Engagement counts |
| `metrics.likes` | integer | `compact` | Likes |
| `metrics.comments` | integer | `compact` | Comments |
| `metrics.shares` | integer | `compact` | Shares |
| `metrics.favorites` | integer | `compact` | Saves |
| `metrics.views` | integer | `compact` | Views |
| `metrics.reposts` | integer | `compact` | Reposts |
| `images` | list of link | `standard` | Image addresses |
| `hashtags` | list of text | `standard` | Hashtags, without the # |
| `mentions` | list of object | `standard` | Accounts mentioned in the text |
| `mentions[].id` | text | `standard` | Account ID |
| `mentions[].username` | text | `standard` | Handle |
| `mentions[].name` | text | `standard` | Display name |
| `is_pinned` | yes/no | `standard` | Whether the author pinned it |
| `post_id` | text | `compact` | ID of the thread's root post when this is a reply; otherwise null |
| `parent_id` | text | `compact` | ID of the item it replies to directly; otherwise null |
| `root_id` | text | `compact` | ID of the first-level reply its thread hangs under |

## Where each number comes from

The same field name does not always mean the same act on every platform. This table says which of the platform's own numbers goes into the field.

| Field | What it holds there | On |
| --- | --- | --- |
| `id` | The channel's handle and the message's number, as in telegram/401; pass it unchanged to the message endpoint | Telegram |
| `id` | The encrypted ID WeChat Search gives the video (starting with export/), as given: not the numeric ID the Channels video and comment endpoints take, and not promised to be the same for the same video in a later search | WeChat Channels |
| `id` | An article: made of the __biz, mid and idx of its long link, the same as the Official Account article list gives, and an article is fetched by its url; a video: the encrypted ID WeChat Search gives it (starting with export/), as given, not the numeric ID the Channels video endpoint takes, and not promised to be the same for the same video in a later search | WeChat Search |
| `id` | Made of the __biz, mid and idx of the article's long link; an article is fetched by its url, not by this | WeChat Official Accounts |
| `id` | Made of the __biz, mid and idx of the long link given | WeChat Official Accounts |
| `url` | The author's profile page opened on this video | Douyin |
| `url` | The article's link; a Channels video has no web link, so null | WeChat Search |
| `type` | video for a post that carries a video, image for one with pictures only, text otherwise | YouTube |
| `title` | The title as the result card shows it, without emoji | Xiaohongshu (RedNote) |
| `title` | The article's title, without the keyword highlighting; a video has no title apart from its description, so null | WeChat Search |
| `text` | The excerpt the result card shows, not the whole text; the note itself has all of it | Xiaohongshu (RedNote) |
| `text` | The first 100 characters of the text; the note itself has all of it | Xiaohongshu (RedNote) |
| `text` | The video's description | YouTube |
| `text` | The video's description, without the keyword highlighting | WeChat Channels |
| `text` | An article's digest (not its whole text) or a video's description, without the keyword highlighting | WeChat Search |
| `text` | The article's digest, not its whole text | WeChat Official Accounts |
| `text` | The pin's description | Pinterest |
| `published_at` | The platform gives the day of publication only (a calendar day in China time), written as midnight UTC of that date: not the moment it was published | Douyin |
| `author.username` | Handle of the channel the message is in | Telegram |
| `author.name` | The account's name; WeChat Search gives no account ID | WeChat Channels |
| `author.name` | The name of the Official Account or Channels account; WeChat Search gives no account ID | WeChat Search |
| `author.avatar_url` | The Channels account's avatar; an article's result has none, so null | WeChat Search |
| `author.verified` | Whether whoever pinned it carries the platform's verified mark; null when it does not | Pinterest |
| `author.followers` | The author's follower count | LinkedIn |
| `metrics.likes` | All reactions together (like, love, haha and the rest) | Facebook |
| `metrics.likes` | All reactions together (like, celebrate, support and the rest) | LinkedIn |
| `metrics.likes` | Likes; from a thousand up the platform shows a rounded number | YouTube |
| `metrics.likes` | The likes the card shows; one written like 1.4万 is approximate and 10万+ a lower bound; null when the card shows no count | WeChat Channels |
| `metrics.likes` | The likes a video's card shows, one written like 1.4万 approximate and 10万+ a lower bound, null when the card shows no count; an article's result has no counts, so null | WeChat Search |
| `metrics.likes` | Upvotes | Zhihu |
| `metrics.likes` | All reactions together | Pinterest |
| `metrics.comments` | Replies | X (Twitter) |
| `metrics.comments` | Direct replies | Threads |
| `metrics.comments` | Comments on the content, other people's copies of the pin included | Pinterest |
| `metrics.shares` | Times it was shared (sent on) | Threads |
| `metrics.favorites` | Bookmarks | X (Twitter) |
| `metrics.favorites` | The card's other count, the same count as the saves of the Channels video lists; approximate, lower bound and null as for likes | WeChat Channels |
| `metrics.favorites` | A video card's other count, the same count as the saves of the Channels video lists, approximate, lower bound and null as for likes; null for an article | WeChat Search |
| `metrics.favorites` | Times this pin was saved on; the total for the same content is in ext.saves | Pinterest |
| `metrics.views` | Views; the popular order sorts by it | Bilibili |
| `metrics.views` | Views; from a thousand up the platform shows a rounded number | Telegram |
| `metrics.views` | Views of the video; null on a post that is not a video | Facebook |
| `metrics.views` | Reads; null on a post that shows no read count | Weibo |
| `metrics.views` | Reads; above 100,000 the platform says only "100k+", and this is a lower bound | WeChat Official Accounts |
| `metrics.reposts` | Retweets; quotes are counted apart, in ext.quotes | X (Twitter) |
| `metrics.reposts` | Reposts; quotes are counted apart, in ext.quotes | Threads |
| `metrics.reposts` | Reposts | Weibo, Zhihu |
| `images` | The one picture the search matched, at its full size; the address expires. The note's other pictures come with the note itself | Xiaohongshu (RedNote) |
| `images` | The video's cover | YouTube |
| `images` | The pin's picture at full size | Pinterest |
| `hashtags` | The post's topic tag; a post has at most one | Threads |
| `is_pinned` | Whether it is pinned on the profile asked for | Instagram |
| `post_id` | ID of the conversation's root post | X (Twitter) |

## What a platform cannot give

A platform stands against a field when none of its endpoints gives it.

| Field | Not available on |
| --- | --- |
| `url` | WeChat Channels |
| `type` | Kuaishou, LinkedIn |
| `title` | Kuaishou, Telegram, Facebook, LinkedIn, Threads, Instagram, TikTok, Weibo, WeChat Channels |
| `lang` | Bilibili, Kuaishou, Telegram, Facebook, LinkedIn, Instagram, Weibo, YouTube, WeChat Channels, WeChat Search, WeChat Official Accounts, Zhihu, Pinterest |
| `author.id` | Telegram, LinkedIn, WeChat Search |
| `author.username` | Bilibili, Weibo, WeChat Channels, WeChat Search |
| `author.name` | Reddit |
| `author.avatar_url` | Telegram |
| `author.verified` | Douyin, Telegram, LinkedIn, TikTok, YouTube, WeChat Channels, WeChat Search, WeChat Official Accounts, Reddit, Zhihu |
| `author.followers` | Kuaishou, Telegram, Facebook, Threads, Instagram, Xiaohongshu (RedNote), YouTube, WeChat Channels, WeChat Search, WeChat Official Accounts, Reddit |
| `metrics.likes` | Telegram, Reddit |
| `metrics.comments` | Telegram, WeChat Search |
| `metrics.shares` | Telegram, X (Twitter), LinkedIn, Instagram, Weibo, YouTube, WeChat Search, Zhihu |
| `metrics.favorites` | Telegram, Facebook, LinkedIn, Threads, Instagram, Weibo, YouTube, Reddit |
| `metrics.views` | LinkedIn, Xiaohongshu (RedNote), WeChat Channels, WeChat Search, Reddit, Pinterest |
| `metrics.reposts` | Douyin, Bilibili, Kuaishou, Telegram, Facebook, LinkedIn, Instagram, TikTok, Xiaohongshu (RedNote), YouTube, WeChat Channels, WeChat Search, WeChat Official Accounts, Reddit, Pinterest |
| `images` | Bilibili, Kuaishou, TikTok, WeChat Channels, WeChat Search, WeChat Official Accounts |
| `hashtags` | Kuaishou, Telegram, Facebook, LinkedIn, Instagram, YouTube, WeChat Channels, WeChat Search, WeChat Official Accounts, Reddit, Zhihu, Pinterest |
| `mentions[].id` | Douyin, Bilibili, Kuaishou, Telegram, Facebook, LinkedIn, Threads, Instagram, Weibo, YouTube, WeChat Channels, WeChat Search, WeChat Official Accounts, Reddit, Zhihu, Pinterest |
| `mentions[].username` | Douyin, Bilibili, Kuaishou, Telegram, Facebook, LinkedIn, Threads, Instagram, TikTok, Weibo, Xiaohongshu (RedNote), YouTube, WeChat Channels, WeChat Search, WeChat Official Accounts, Reddit, Zhihu, Pinterest |
| `mentions[].name` | Douyin, Bilibili, Kuaishou, Telegram, Facebook, LinkedIn, Threads, Instagram, TikTok, Weibo, YouTube, WeChat Channels, WeChat Search, WeChat Official Accounts, Reddit, Zhihu, Pinterest |
| `is_pinned` | Bilibili, Kuaishou, Telegram, X (Twitter), Facebook, LinkedIn, YouTube, WeChat Channels, WeChat Search, WeChat Official Accounts, Pinterest |
| `post_id` | Douyin, Bilibili, Kuaishou, Telegram, Facebook, LinkedIn, Threads, Instagram, TikTok, Weibo, Xiaohongshu (RedNote), YouTube, WeChat Channels, WeChat Search, WeChat Official Accounts, Reddit, Pinterest |
| `parent_id` | Douyin, Bilibili, Kuaishou, Telegram, Facebook, LinkedIn, Threads, Instagram, TikTok, Weibo, Xiaohongshu (RedNote), YouTube, WeChat Channels, WeChat Search, WeChat Official Accounts, Reddit, Pinterest |
| `root_id` | Douyin, Bilibili, Kuaishou, Telegram, X (Twitter), Facebook, LinkedIn, Threads, Instagram, TikTok, Weibo, Xiaohongshu (RedNote), YouTube, WeChat Channels, WeChat Search, WeChat Official Accounts, Reddit, Zhihu, Pinterest |

One endpoint may still leave out a field another gives: each endpoint's page lists what it cannot give, and every answer says so in `meta.unavailable`.

## Endpoints that return Post

### Douyin

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [Douyin hashtag videos](https://dataxapi.com/apis/douyin/hashtags/videos/list.md) | `GET /v1/douyin/hashtags/videos/list` | Post list | $0.0020 / call |
| [Douyin trend-index creator top videos](https://dataxapi.com/apis/douyin/index/creators/videos/list.md) | `GET /v1/douyin/index/creators/videos/list` | Post list | $0.0020 / call |
| [Douyin trend-index keyword hot videos](https://dataxapi.com/apis/douyin/index/videos/search.md) | `GET /v1/douyin/index/videos/search` | Post list | $0.0020 / call |
| [Douyin user videos](https://dataxapi.com/apis/douyin/users/videos/list.md) | `GET /v1/douyin/users/videos/list` | Post list | $0.0020 / call |
| [Douyin video detail](https://dataxapi.com/apis/douyin/videos/get.md) | `GET /v1/douyin/videos/get` | Post | $0.0020 / call |
| [Douyin video play count](https://dataxapi.com/apis/douyin/videos/metrics.md) | `GET /v1/douyin/videos/metrics` | Post | $0.0020 / call |
| [Douyin related videos](https://dataxapi.com/apis/douyin/videos/related.md) | `GET /v1/douyin/videos/related` | Post list | $0.0020 / call |
| [Douyin video search](https://dataxapi.com/apis/douyin/videos/search.md) | `GET /v1/douyin/videos/search` | Post list | $0.0200 / call |
| [Douyin trending videos](https://dataxapi.com/apis/douyin/videos/trending.md) | `GET /v1/douyin/videos/trending` | Post list | $0.0020 / call |

### Bilibili

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [Bilibili user videos](https://dataxapi.com/apis/bilibili/users/videos/list.md) | `GET /v1/bilibili/users/videos/list` | Post list | $0.0020 / call |
| [Bilibili video detail](https://dataxapi.com/apis/bilibili/videos/get.md) | `GET /v1/bilibili/videos/get` | Post | $0.0020 / call |
| [Bilibili video search](https://dataxapi.com/apis/bilibili/videos/search.md) | `GET /v1/bilibili/videos/search` | Post list | $0.0020 / call |
| [Bilibili popular videos](https://dataxapi.com/apis/bilibili/videos/trending.md) | `GET /v1/bilibili/videos/trending` | Post list | $0.0020 / call |

### Kuaishou

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [Kuaishou user videos](https://dataxapi.com/apis/kuaishou/users/videos/list.md) | `GET /v1/kuaishou/users/videos/list` | Post list | $0.0200 / call |
| [Kuaishou video detail](https://dataxapi.com/apis/kuaishou/videos/get.md) | `GET /v1/kuaishou/videos/get` | Post | $0.0020 / call |
| [Kuaishou video search](https://dataxapi.com/apis/kuaishou/videos/search.md) | `GET /v1/kuaishou/videos/search` | Post list | $0.0200 / call |

### Telegram

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [Telegram channel messages](https://dataxapi.com/apis/telegram/channels/messages/list.md) | `GET /v1/telegram/channels/messages/list` | Post list | $0.0020 / call |
| [Telegram message detail](https://dataxapi.com/apis/telegram/messages/get.md) | `GET /v1/telegram/messages/get` | Post | $0.0020 / call |

### X (Twitter)

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [X community posts](https://dataxapi.com/apis/x/communities/posts/list.md) | `GET /v1/x/communities/posts/list` | Post list | $0.0003 / item |
| [X list posts](https://dataxapi.com/apis/x/lists/posts/list.md) | `GET /v1/x/lists/posts/list` | Post list | $0.0020 / call |
| [X article detail](https://dataxapi.com/apis/x/posts/article/get.md) | `GET /v1/x/posts/article/get` | Post | $0.0020 / call |
| [X post detail](https://dataxapi.com/apis/x/posts/get.md) | `GET /v1/x/posts/get` | Post | $0.0003 / call |
| [X post quotes](https://dataxapi.com/apis/x/posts/quotes/list.md) | `GET /v1/x/posts/quotes/list` | Post list | $0.0003 / item |
| [X post replies](https://dataxapi.com/apis/x/posts/replies/list.md) | `GET /v1/x/posts/replies/list` | Post list | $0.0020 / call |
| [X post search](https://dataxapi.com/apis/x/posts/search.md) | `GET /v1/x/posts/search` | Post list | $0.0020 / call |
| [X thread context](https://dataxapi.com/apis/x/threads/posts/list.md) | `GET /v1/x/threads/posts/list` | Post list | $0.0003 / item |
| [X user mentions](https://dataxapi.com/apis/x/users/mentions/list.md) | `GET /v1/x/users/mentions/list` | Post list | $0.0003 / item |
| [X user posts](https://dataxapi.com/apis/x/users/posts/list.md) | `GET /v1/x/users/posts/list` | Post list | $0.0020 / call |

### Facebook

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [Facebook page posts](https://dataxapi.com/apis/facebook/pages/posts/list.md) | `GET /v1/facebook/pages/posts/list` | Post list | $0.0020 / call |
| [Facebook post detail](https://dataxapi.com/apis/facebook/posts/get.md) | `GET /v1/facebook/posts/get` | Post | $0.0020 / call |

### LinkedIn

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [LinkedIn company posts](https://dataxapi.com/apis/linkedin/companies/posts/list.md) | `GET /v1/linkedin/companies/posts/list` | Post list | $0.0020 / call |
| [LinkedIn post detail](https://dataxapi.com/apis/linkedin/posts/get.md) | `GET /v1/linkedin/posts/get` | Post | $0.0020 / call |
| [LinkedIn post search](https://dataxapi.com/apis/linkedin/posts/search.md) | `GET /v1/linkedin/posts/search` | Post list | $0.0020 / call |

### Threads

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [Threads post detail](https://dataxapi.com/apis/threads/posts/get.md) | `GET /v1/threads/posts/get` | Post | $0.0020 / call |
| [Threads post search](https://dataxapi.com/apis/threads/posts/search.md) | `GET /v1/threads/posts/search` | Post list | $0.0020 / call |
| [Threads user posts](https://dataxapi.com/apis/threads/users/posts/list.md) | `GET /v1/threads/users/posts/list` | Post list | $0.0020 / call |

### Instagram

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [Instagram hashtag posts](https://dataxapi.com/apis/instagram/hashtags/posts/list.md) | `GET /v1/instagram/hashtags/posts/list` | Post list | $0.0020 / call |
| [Instagram post detail](https://dataxapi.com/apis/instagram/posts/get.md) | `GET /v1/instagram/posts/get` | Post | $0.0020 / call |
| [Instagram user posts](https://dataxapi.com/apis/instagram/users/posts/list.md) | `GET /v1/instagram/users/posts/list` | Post list | $0.0020 / call |

### TikTok

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [TikTok hashtag videos](https://dataxapi.com/apis/tiktok/hashtags/videos/list.md) | `GET /v1/tiktok/hashtags/videos/list` | Post list | $0.0020 / call |
| [TikTok user videos](https://dataxapi.com/apis/tiktok/users/videos/list.md) | `GET /v1/tiktok/users/videos/list` | Post list | $0.0020 / call |
| [TikTok video detail](https://dataxapi.com/apis/tiktok/videos/get.md) | `GET /v1/tiktok/videos/get` | Post | $0.0020 / call |
| [TikTok video search](https://dataxapi.com/apis/tiktok/videos/search.md) | `GET /v1/tiktok/videos/search` | Post list | $0.0020 / call |

### Weibo

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [Weibo post detail](https://dataxapi.com/apis/weibo/posts/get.md) | `GET /v1/weibo/posts/get` | Post | $0.0020 / call |
| [Weibo realtime search](https://dataxapi.com/apis/weibo/posts/search.md) | `GET /v1/weibo/posts/search` | Post list | $0.0020 / call |
| [Weibo user posts](https://dataxapi.com/apis/weibo/users/posts/list.md) | `GET /v1/weibo/users/posts/list` | Post list | $0.0020 / call |

### Xiaohongshu (RedNote)

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [Xiaohongshu image search](https://dataxapi.com/apis/xiaohongshu/images/search.md) | `GET /v1/xiaohongshu/images/search` | Post list | $0.0200 / call |
| [Xiaohongshu note detail](https://dataxapi.com/apis/xiaohongshu/notes/get.md) | `GET /v1/xiaohongshu/notes/get` | Post | $0.0200 / call |
| [Xiaohongshu note search](https://dataxapi.com/apis/xiaohongshu/notes/search.md) | `GET /v1/xiaohongshu/notes/search` | Post list | $0.0200 / call |
| [Xiaohongshu topic notes](https://dataxapi.com/apis/xiaohongshu/topics/notes/list.md) | `GET /v1/xiaohongshu/topics/notes/list` | Post list | $0.0200 / call |
| [Xiaohongshu user notes](https://dataxapi.com/apis/xiaohongshu/users/notes/list.md) | `GET /v1/xiaohongshu/users/notes/list` | Post list | $0.0200 / call |

### YouTube

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [YouTube channel videos](https://dataxapi.com/apis/youtube/channels/videos/list.md) | `GET /v1/youtube/channels/videos/list` | Post list | $0.0020 / call |
| [YouTube video detail](https://dataxapi.com/apis/youtube/videos/get.md) | `GET /v1/youtube/videos/get` | Post | $0.0020 / call |
| [YouTube video search](https://dataxapi.com/apis/youtube/videos/search.md) | `GET /v1/youtube/videos/search` | Post list | $0.0020 / call |
| [YouTube channel posts](https://dataxapi.com/apis/youtube/channels/posts/list.md) | `GET /v1/youtube/channels/posts/list` | Post list | $0.0020 / call |
| [YouTube post detail](https://dataxapi.com/apis/youtube/posts/get.md) | `GET /v1/youtube/posts/get` | Post | $0.0020 / call |

### WeChat Channels

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [WeChat Channels video detail](https://dataxapi.com/apis/wechat_channels/videos/get.md) | `GET /v1/wechat_channels/videos/get` | Post | $0.0200 / call |
| [WeChat Channels collection videos](https://dataxapi.com/apis/wechat_channels/collections/videos/list.md) | `GET /v1/wechat_channels/collections/videos/list` | Post list | $0.0200 / call |
| [WeChat Channels account videos](https://dataxapi.com/apis/wechat_channels/users/videos/list.md) | `GET /v1/wechat_channels/users/videos/list` | Post list | $0.0200 / call |
| [WeChat Channels video search](https://dataxapi.com/apis/wechat_channels/videos/search.md) | `GET /v1/wechat_channels/videos/search` | Post list | $0.0200 / call |

### WeChat Search

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [WeChat Search articles and videos](https://dataxapi.com/apis/wechat/posts/search.md) | `GET /v1/wechat/posts/search` | Post list | $0.0200 / call |

### WeChat Official Accounts

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [WeChat Official Account articles](https://dataxapi.com/apis/wechat_mp/accounts/articles/list.md) | `GET /v1/wechat_mp/accounts/articles/list` | Post list | $0.0200 / call |
| [WeChat Official Account article detail](https://dataxapi.com/apis/wechat_mp/articles/get.md) | `GET /v1/wechat_mp/articles/get` | Post | $0.0200 / call |
| [WeChat Official Account article stats](https://dataxapi.com/apis/wechat_mp/articles/metrics.md) | `GET /v1/wechat_mp/articles/metrics` | Post | $0.0200 / call |

### Reddit

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [Reddit post detail](https://dataxapi.com/apis/reddit/posts/get.md) | `GET /v1/reddit/posts/get` | Post | $0.0020 / call |
| [Reddit post search](https://dataxapi.com/apis/reddit/posts/search.md) | `GET /v1/reddit/posts/search` | Post list | $0.0020 / call |
| [Reddit popular posts](https://dataxapi.com/apis/reddit/posts/trending.md) | `GET /v1/reddit/posts/trending` | Post list | $0.0020 / call |
| [Reddit community posts](https://dataxapi.com/apis/reddit/subreddits/posts/list.md) | `GET /v1/reddit/subreddits/posts/list` | Post list | $0.0020 / call |
| [Reddit user posts](https://dataxapi.com/apis/reddit/users/posts/list.md) | `GET /v1/reddit/users/posts/list` | Post list | $0.0020 / call |

### Zhihu

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [Zhihu answer detail](https://dataxapi.com/apis/zhihu/answers/get.md) | `GET /v1/zhihu/answers/get` | Post | $0.0020 / call |
| [Zhihu article detail](https://dataxapi.com/apis/zhihu/articles/get.md) | `GET /v1/zhihu/articles/get` | Post | $0.0020 / call |
| [Zhihu column articles](https://dataxapi.com/apis/zhihu/columns/articles/list.md) | `GET /v1/zhihu/columns/articles/list` | Post list | $0.0020 / call |
| [Zhihu pin detail](https://dataxapi.com/apis/zhihu/pins/get.md) | `GET /v1/zhihu/pins/get` | Post | $0.0020 / call |
| [Zhihu content search](https://dataxapi.com/apis/zhihu/posts/search.md) | `GET /v1/zhihu/posts/search` | Post list | $0.0020 / call |
| [Zhihu question answers](https://dataxapi.com/apis/zhihu/questions/answers/list.md) | `GET /v1/zhihu/questions/answers/list` | Post list | $0.0020 / call |
| [Zhihu question detail](https://dataxapi.com/apis/zhihu/questions/get.md) | `GET /v1/zhihu/questions/get` | Post | $0.0020 / call |
| [Zhihu user answers](https://dataxapi.com/apis/zhihu/users/answers/list.md) | `GET /v1/zhihu/users/answers/list` | Post list | $0.0020 / call |
| [Zhihu user articles](https://dataxapi.com/apis/zhihu/users/articles/list.md) | `GET /v1/zhihu/users/articles/list` | Post list | $0.0020 / call |
| [Zhihu user pins](https://dataxapi.com/apis/zhihu/users/pins/list.md) | `GET /v1/zhihu/users/pins/list` | Post list | $0.0020 / call |

### Pinterest

| Endpoint | Path | Returns | Price |
| --- | --- | --- | --- |
| [Pinterest pin detail](https://dataxapi.com/apis/pinterest/pins/get.md) | `GET /v1/pinterest/pins/get` | Post | $0.0020 / call |
| [Pinterest pin search](https://dataxapi.com/apis/pinterest/pins/search.md) | `GET /v1/pinterest/pins/search` | Post list | $0.0020 / call |

## Example

One item from `douyin.hashtags.videos.list`, as recorded 2026-10-12 18:42 UTC. Names, text, IDs and links are examples; the figures are as recorded.

```jsonc
{
  "id": "7963545807100437923",
  "url": "https://www.douyin.com/video/7963545807100437923",
  "type": "video",
  "title": null,
  "text": "周末的周末露营日常，随手记录一下",
  "lang": "zh",
  "published_at": "2026-10-12T07:11:10.000Z",
  "author": {
    "id": "MS4wLjABAAAABGZA0lkiz3H7A-lxzB5Grql28u6Ykbup22O6ze_0pro",
    "username": "orange_soda22",
    "name": "橘子汽水不加冰",
    "avatar_url": "https://p3-pc.douyinpic.com/aweme/100x100/aweme-avatar/tos-cn-avt-0015_9aa5b7cd5493d4d36c71.jpeg"
  },
  "metrics": {
    "likes": 11911,
    "comments": 190,
    "shares": 131,
    "favorites": 1081
  },
  "images": null,
  "hashtags": [
    "周末去哪儿",
    "户外生活",
    // … 3 more
  ]
}
```

[The whole response is on the endpoint's page →](https://dataxapi.com/apis/douyin/hashtags/videos/list.md)

## Related

- [Post detail API](https://dataxapi.com/roles/posts-get/): The same action on 18 platforms, with a per-platform field table.
- [Account posts API](https://dataxapi.com/roles/accounts-posts-list/): The same action on 17 platforms, with a per-platform field table.
- [Post search API](https://dataxapi.com/roles/posts-search/): The same action on 15 platforms, with a per-platform field table.
- [Comments API](https://dataxapi.com/roles/posts-comments-list/): The same action on 13 platforms, with a per-platform field table.
- [Hashtag posts API](https://dataxapi.com/roles/topics-posts-list/): The same action on 4 platforms, with a per-platform field table.
- [Trending posts API](https://dataxapi.com/roles/posts-trending/): The same action on 3 platforms, with a per-platform field table.
- [Post metrics API](https://dataxapi.com/roles/posts-metrics/): The same action on 2 platforms, with a per-platform field table.
- [Community posts API](https://dataxapi.com/roles/communities-posts-list/): The same action on 2 platforms, with a per-platform field table.
- [All endpoints](https://dataxapi.com/apis/): The directory lists what every endpoint returns, with its price.

## Other objects

[Comment object](https://dataxapi.com/docs/objects/comment/), [Account object](https://dataxapi.com/docs/objects/account/), [Trend object](https://dataxapi.com/docs/objects/trend/), [Transcript object](https://dataxapi.com/docs/objects/transcript/), [Creator rates object](https://dataxapi.com/docs/objects/creator_rates/), [Community object](https://dataxapi.com/docs/objects/community/), [Product object](https://dataxapi.com/docs/objects/product/), [Review object](https://dataxapi.com/docs/objects/review/), [Keyword index history object](https://dataxapi.com/docs/objects/keyword_history/), [Related keyword object](https://dataxapi.com/docs/objects/keyword_related/), [Keyword audience object](https://dataxapi.com/docs/objects/keyword_audience/), [Account recent change object](https://dataxapi.com/docs/objects/account_history/), [Brand index history object](https://dataxapi.com/docs/objects/brand_history/), [Brand index averages object](https://dataxapi.com/docs/objects/brand_metrics/), [Creator object](https://dataxapi.com/docs/objects/creator/), [Audience object](https://dataxapi.com/docs/objects/audience/), [Xingtu creator metrics object](https://dataxapi.com/docs/objects/xingtu_creator_metrics/), [Xingtu creator video object](https://dataxapi.com/docs/objects/xingtu_creator_post/), [PGY creator metrics object](https://dataxapi.com/docs/objects/pgy_creator_metrics/), [PGY creator note object](https://dataxapi.com/docs/objects/pgy_creator_post/), [Ad object](https://dataxapi.com/docs/objects/ad/), [Advertiser object](https://dataxapi.com/docs/objects/advertiser/), [Douyin trend-index creator metrics object](https://dataxapi.com/docs/objects/index_creator_metrics/), [Xingtu creator content keywords object](https://dataxapi.com/docs/objects/xingtu_creator_keywords/), [Xingtu creator scores object](https://dataxapi.com/docs/objects/xingtu_creator_scores/), [Xingtu creator content mix object](https://dataxapi.com/docs/objects/xingtu_creator_content_mix/), [Xingtu creator conversion object](https://dataxapi.com/docs/objects/xingtu_creator_conversion/), [Xingtu campaign object](https://dataxapi.com/docs/objects/xingtu_campaign/), [Channels collection object](https://dataxapi.com/docs/objects/channels_collection/), [Topic object](https://dataxapi.com/docs/objects/topic/)

---

Last checked 2026-10-18 19:59 UTC. Catalog revision c48ce454ae6c4c65. [HTML version](https://dataxapi.com/docs/objects/post/)
