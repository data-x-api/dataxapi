# X Communities API (X 社群)

3 endpoints read X Communities (X 社群): community profile, posts, members. From $0.0003 to $0.0080 a call. No X login and no cookie; a failed call is free.

Also known as: twitter communities, x community, twitter community, 推特社群

## What this data is

**Communities on X (Twitter) are groups that people join to post around one subject.** These endpoints read a community's profile, a page of the posts in it and a page of its members, all by the community's ID.

The community comes back as the same Community object as a subreddit, its posts as Post and its members as Account, so the code that reads X posts and accounts elsewhere reads these too.

- **Members and moderators**: `metrics.members` is how many have joined. In the full view, `ext.moderators` counts the moderators and `ext.join_policy` says how people join, as the platform words it (Open, for one).
- **Community ID**: A string of digits: the end of the community's link. No endpoint here searches communities, so start from one you know.
- **Post counts**: A post has the counts of any X post: `metrics.comments` are replies, `metrics.favorites` bookmarks, `metrics.reposts` retweets, with quotes apart in `ext.quotes`.

## The 3 endpoints

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [X community members](https://dataxapi.com/apis/x/communities/members/list.md) | `GET /v1/x/communities/members/list` | Account list | $0.0004 / item |
| [X community profile](https://dataxapi.com/apis/x/communities/get.md) | `GET /v1/x/communities/get` | Community | $0.0004 / call |
| [X community posts](https://dataxapi.com/apis/x/communities/posts/list.md) | `GET /v1/x/communities/posts/list` | Post list | $0.0003 / item |

## A typical use, with its bill

**Follow one community for a week.** Read its profile once, a page of its posts every day and a page of its members once. Posts and members are charged by the item returned, so the bill below is the most it can come to.

| Call | Times | Cost |
| --- | --- | --- |
| X community profile | 1 × $0.0004 | $0.0004 |
| X community posts | 7 × $0.0060 (at most) | $0.0420 |
| X community members | 1 × $0.0080 (at most) | $0.0080 |
| In all, 9 calls |  | at most $0.0504 |

## Use it in your AI

> Use DataXAPI to read the latest posts of this X community and tell me what its members are talking about this week.

## Questions

### How much does it cost?

Per call, no subscription. From $0.0003 to $0.0080 a call; each endpoint's page shows its own price. 2 endpoints are charged by the item returned, with a least and a most a call. You are charged when data comes back; a failed call costs nothing.

### What if the community ID is wrong?

The profile answers `not_found`, which is not charged. The posts and members lists cannot tell a community that does not exist from one with nothing in it: both come back empty and are charged as an empty result. Check the ID with the profile first.

### How many posts and members come back?

Up to 20 of each a page; pass `page.next_cursor` back as `cursor` for the next. Both are charged by the item returned.

### Do I need a X Communities or X account?

No. You hold one DataXAPI key: no X login, no cookie, no advertiser account.

## The same kind of data elsewhere

- [X Lists API](https://dataxapi.com/apis/x/lists.md): Lists on X: the posts of a list, its members and its followers.

[X (Twitter) API](https://dataxapi.com/apis/x.md)

---

How to call, pay and handle errors is the same everywhere: https://dataxapi.com/llms.txt

Last checked 2026-10-18 19:59 UTC. Catalog revision c48ce454ae6c4c65. [HTML version](https://dataxapi.com/apis/x/communities/)
