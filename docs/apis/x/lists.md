# X Lists API (X 列表)

3 endpoints read X Lists (X 列表): list posts, members, followers. From $0.0004 to $0.0080 a call. No X login and no cookie; a failed call is free.

Also known as: twitter lists, 推特列表

## What this data is

**A list on X (Twitter) is a set of accounts someone has gathered under one name, and its timeline shows their posts.** These endpoints read the timeline, newest first and about 100 posts a page, the accounts the list is made of and the accounts that follow it, by the list's ID.

Posts come back as Post and accounts as Account, the same objects as everywhere on X. A list someone else keeps is a ready-made watch list: one call reads what all its accounts posted.

- **Timeline**: Newest first, about 100 posts a page and one price a call, however many come back; `page.next_cursor` leads to older posts.
- **Members and followers**: Members are the accounts the list is made of, 20 a page. Followers are accounts that follow the list: up to 20, one page only.
- **List ID**: A string of digits. No endpoint here searches lists, so start from a list you know.

## The 3 endpoints

| Endpoint | Request | Returns | Price |
| --- | --- | --- | --- |
| [X list members](https://dataxapi.com/apis/x/lists/members/list.md) | `GET /v1/x/lists/members/list` | Account list | $0.0004 / item |
| [X list followers](https://dataxapi.com/apis/x/lists/followers/list.md) | `GET /v1/x/lists/followers/list` | Account list | $0.0004 / item |
| [X list posts](https://dataxapi.com/apis/x/lists/posts/list.md) | `GET /v1/x/lists/posts/list` | Post list | $0.0020 / call |

## A typical use, with its bill

**Read a curated list every day.** One call a day returns up to 100 posts of the list; read its members once. Members are charged by the item returned, so that row is the most it can come to.

| Call | Times | Cost |
| --- | --- | --- |
| X list posts | 7 × $0.0020 | $0.0140 |
| X list members | 1 × $0.0080 (at most) | $0.0080 |
| In all, 8 calls |  | at most $0.0220 |

## Use it in your AI

> Use DataXAPI to read today's posts of this X list and give me the five most engaged ones.

## Questions

### How much does it cost?

Per call, no subscription. From $0.0004 to $0.0080 a call; each endpoint's page shows its own price. 2 endpoints are charged by the item returned, with a least and a most a call. You are charged when data comes back; a failed call costs nothing.

### Can I read every follower of a list?

No, the first 20 only. When it was recorded, the next page the platform offered came back empty, so no next page is offered. A list's members page on as they should.

### What if the list does not exist?

The timeline does not answer with a 404: the source only says the request failed, so it comes back as an upstream error that may be retried once, and is not charged. The members and followers lists come back empty and are charged as an empty result.

### Do I need a X Lists or X account?

No. You hold one DataXAPI key: no X login, no cookie, no advertiser account.

## The same kind of data elsewhere

- [X Communities API](https://dataxapi.com/apis/x/communities.md): Communities on X: a community's profile, its posts and its members.

[X (Twitter) API](https://dataxapi.com/apis/x.md)

---

How to call, pay and handle errors is the same everywhere: https://dataxapi.com/llms.txt

Last checked 2026-10-18 19:59 UTC. Catalog revision c48ce454ae6c4c65. [HTML version](https://dataxapi.com/apis/x/lists/)
