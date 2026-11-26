# Weibo API

13 endpoints read Weibo: posts, users, comments, trends. From $0.0020 a call. No Weibo login and no cookie; a failed call is free.

> 13 endpoints. How to call, pay and handle errors is the same everywhere: https://dataxapi.com/llms.txt

Generated from catalog revision 0051cce45e9530b9, price book 22.

## weibo.comments.replies.list

Get a page of replies to a Weibo comment by comment ID: text, replier, likes, what it answers, time posted, IP location. Up to 20 items a call; $0.0020 per call. Errors and timeouts are not charged.

- Name: Weibo comment replies API
- Request: `GET /v1/weibo/comments/replies/list`
- Parameters: `id` (required), `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/weibo/comments/replies/list.md

## weibo.posts.comments.list

Get a page of comments on a Weibo post by post ID: text, commenter, likes, reply count, time posted, IP location. Up to 20 items a call; $0.0020 per call. Errors and timeouts are not charged.

- Name: Weibo post comments API
- Request: `GET /v1/weibo/posts/comments/list`
- Parameters: `id`, `url`, `cursor`, `view`, `fields`; give exactly one of id, url
- Whole contract: https://dataxapi.com/apis/weibo/posts/comments/list.md

## weibo.posts.get

Get one Weibo post by ID: the whole text (of a long post too), author, likes, comments, reposts, reads (plays on a video post), pictures, topics, IP location. One object a call; $0.0020 per call. Errors and timeouts are not charged.

- Name: Weibo post detail API
- Request: `GET /v1/weibo/posts/get`
- Parameters: `id`, `url`, `view`, `fields`; give exactly one of id, url
- Whole contract: https://dataxapi.com/apis/weibo/posts/get.md

## weibo.posts.transcript.get

Give a Weibo video post's link, share text or ID and get what is said in its video: the whole text, each sentence with its start and end time, and ready SRT subtitles, with the post's text, author and length; speakers can be told apart. Charged a call, plus by the minute of video when its speech is recognised; nothing when nobody speaks. A video of up to 5 minutes comes back as text; one over 5 minutes and up to 2 hours is answered at once with a job: call again with it a little later for the text, charged by its actual minutes and only when the text is delivered. One object a call; $0.0020 a call, plus $0.0038 a minute when the speech is recognised (a part minute counts as one); none when the platform's own captions are used; at most $0.0210 a call for a video of up to 5 minutes, a longer one, up to 2 hours, by its actual minutes. Errors, timeouts and objects that do not exist are not charged.

- Name: Weibo video transcript (video to text) API
- Request: `GET /v1/weibo/posts/transcript/get`
- Parameters: `id`, `url`, `speakers`, `job`, `view`, `fields`; give exactly one of id, url, job
- Whole contract: https://dataxapi.com/apis/weibo/posts/transcript/get.md

## weibo.posts.likers.list

Get the accounts that most recently liked a Weibo post by post ID, about 50 at a time: name, bio, avatar, verification and its kind, follower and following counts, number of posts, the gender and region their profiles give. About 50 items a call, 100 at most; $0.0020 per call. Errors, timeouts and objects that do not exist are not charged.

- Name: Weibo post likers API
- Request: `GET /v1/weibo/posts/likers/list`
- Parameters: `id`, `url`, `view`, `fields`; give exactly one of id, url
- Whole contract: https://dataxapi.com/apis/weibo/posts/likers/list.md

## weibo.posts.search

Get a page of Weibo posts for search terms, newest first: text (a long post is cut short here), author and follower count, likes, comments, reposts, video plays, pictures, topics. About 10 items a call, 20 at most; $0.0020 per call. Errors and timeouts are not charged.

- Name: Weibo realtime search API
- Request: `GET /v1/weibo/posts/search`
- Parameters: `query` (required), `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/weibo/posts/search.md

## weibo.trends.list

Get Weibo's current hot search list, 50 terms, with rank, heat and label (new, hot and the like). About 50 items a call, 51 at most; $0.0020 per call. Errors and timeouts are not charged.

- Name: Weibo hot search board API
- Request: `GET /v1/weibo/trends/list`
- Parameters: `board`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/weibo/trends/list.md

## weibo.users.followers.list

Get a page of the accounts following a Weibo user, 20 a page: name, bio, avatar, verification and its kind, follower and following counts, number of posts, when the account was opened, the gender and region their profiles give. Up to 20 items a call; $0.0020 per call. Errors and timeouts are not charged.

- Name: Weibo user followers API
- Request: `GET /v1/weibo/users/followers/list`
- Parameters: `id` (required), `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/weibo/users/followers/list.md

## weibo.users.get

Get a Weibo user's profile by user ID: name, bio, avatar, verification, follower and following counts, number of posts. It also gives what the verification says, the profile's totals of reposts, comments and likes, gender and region. One object a call; $0.0020 per call. Errors and timeouts are not charged.

- Name: Weibo user profile API
- Request: `GET /v1/weibo/users/get`
- Parameters: `id` (required), `view`, `fields`
- Whole contract: https://dataxapi.com/apis/weibo/users/get.md

## weibo.users.posts.list

Get a page of the posts on a Weibo user's profile (their own and their reposts) by user ID, newest first: text (a long post is cut short here), likes, comments, reposts, video plays, pictures, topics, IP location, whether pinned. About 20 items a call, 25 at most; $0.0020 per call. Errors and timeouts are not charged.

- Name: Weibo user posts API
- Request: `GET /v1/weibo/users/posts/list`
- Parameters: `id` (required), `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/weibo/users/posts/list.md

## weibo.users.search

Get a page of Weibo users for search terms: ID, name, avatar, profile link. Up to 20 items a call; $0.0020 per call. Errors and timeouts are not charged.

- Name: Weibo user search API
- Request: `GET /v1/weibo/users/search`
- Parameters: `query` (required), `cursor`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/weibo/users/search.md

## weibo.posts.media.get

Give a Weibo post by ID, link or share text and get its video in each quality the platform has (up to 4K where there is one, each with width, height, bit rate, size, whether it is watermarked and when it expires) and its cover, or each picture at its largest size. Video and picture posts only: a text post is answered as having no files. The addresses need no headers; once they expire, another call gives new ones. One object a call; $0.0020 per call. Errors and timeouts are not charged.

- Name: Weibo video and image downloader API
- Request: `GET /v1/weibo/posts/media/get`
- Parameters: `id`, `url`, `view`, `fields`; give exactly one of id, url
- Whole contract: https://dataxapi.com/apis/weibo/posts/media/get.md

## weibo.backup.trends.list

The backup of the Weibo hot search board, to call when the original cannot serve: the same parameters and result, at a higher price. About 50 items a call, 51 at most; $0.0300 per call. Errors and timeouts are not charged.

- Name: Weibo hot search board (backup) API
- Request: `GET /v1/weibo/backup/trends/list`
- Parameters: `board`, `view`, `fields`
- Whole contract: https://dataxapi.com/apis/weibo/backup/trends/list.md

## How this differs from Weibo's official open platform

Weibo's open platform lists reads about the authorising user: statuses/user_timeline returns the posts the authorised user published, and comments/show notes that it returns only the authorised user's comments. Topic search (2/search/topics) is marked an advanced interface that needs authorisation and is no longer in the main list. An app not yet reviewed can authorise only 15 test accounts, and use beyond the standard limits is through commercial interfaces.

It is built for an app whose users sign in with Weibo and post from it. DataXAPI reads public Weibo posts and accounts by keyword, any post's comments and likers, any account's posts and followers, and the trending list, with no app review and no Weibo account of yours.

Read on 2026-10-29 in the platform's own documents:

- [Weibo Open Platform: API list](https://open.weibo.com/wiki/%E5%BE%AE%E5%8D%9AAPI)
- [Weibo Open Platform: comments/show](https://open.weibo.com/wiki/2/comments/show)
- [Weibo Open Platform: search/topics](https://open.weibo.com/wiki/2/search/topics)
- [Weibo Open Platform: call limits](https://open.weibo.com/wiki/%E6%8E%A5%E5%8F%A3%E8%AE%BF%E9%97%AE%E9%A2%91%E6%AC%A1%E6%9D%83%E9%99%90)
