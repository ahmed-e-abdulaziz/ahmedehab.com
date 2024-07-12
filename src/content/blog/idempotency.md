---
title: HTTP Idempotency
excerpt: Insanity is doing the same thing over and over and expecting different results
publishDate: 'Aug 8 2021'
isFeatured: true
tags:
  - REST
seo:
  image:
    src: '/idempotency.jpg'
    alt: A person standing at the window
---

## Idempotency?

Have you accidentally clicked the order button twice on any e-commerce and still ordered a single order? Well, you have idempotency to thank for that (And the developer who implemented it 👨‍💻)!
So what is Idempotency? Although it looks like a complex term, it is a simple concept.

> Insanity is doing the same thing over and over and expecting different results. - 'Albert Einstein'

## Client-Server Idempotency

For HTTP API design, you won't run the same operation twice when an idempotent API is called twice with the same data. So if the client/frontend calls a `PUT` API twice to update a user's data, the server/backend would recognize it is the same request and update the data only once.

## Why would I need it?

The reason a client would call the server twice might mostly not be because a user clicked a button two times. It is attributed more to network failures. For example, if an acknowledgment response for the update is **NOT** returned because of a network failure, the client might automatically send the same request again. From its point of view, the update request itself has yet to arrive at the server.

![Non-Idempotent Requests versus Idempotent requests](/NonIdempVsIdemp.png)

## Safe vs. Idempotent

Another classification of HTTP methods to consider is safe methods.
Safe methods do not change any resource on the server, i.e., queries.

The difference is that idempotency concerns that we can call the same response many times and get the same answer.
While safe methods are concerned with keeping the same state of the resources on the servers with the first or the hundredth response as it treats resources in a read-only fashion.

## Idempotent, Safe and non-idempotent HTTP Method

In the following table, we can see where each commonly-used HTTP methods fall in the previous categorization.

| Method   | Safe  | Idempotent  |
| -------- | ----- | ----------- |
| `GET`    | Yes   | Yes         |
| `HEAD`   | Yes   | Yes         |
| `OPTIONS`| Yes   | Yes         |
| `TRACE`  | Yes   | Yes         |
| `PUT`    | No    | Yes         |
| `DELETE` | No    | Yes         |
| `POST`   | No    | No          |
| `PATCH`  | No    | No          |

This shows that the real difference between Safe and Idempotent concepts is evident when we look at the behavior of the `PUT` and `DELETE` methods.

The `DELETE` method is not safe as it changes the resource/server state by deletion. However, it is idempotent because if we call `DELETE` on /user/1, for example, to delete a user with an ID of 1, the server shouldn't go and delete the user with an ID of 2 if it doesn't find it. It will reply with 200/204 as well since although it didn't find it, it's still not a fault to call it twice, as we have seen earlier.

The `PUT` method follows the same idea, it replaces a whole object with another entire object or adds a new one, so it will reply with the same response each time, but each time it's doing an update query on the server.

## How will this matter to me/my team?

From a backend/server-side perspective, you have to respect the HTTP method and use them correctly according to its semantic meaning. Thus, a `GET` method, for example, must not change a state as it is safe and must not change the response type it returns as it is idempotent.

From a frontend/client-side perspective, you can call any idempotent endpoint many times with no fear of misbehavior, given your backend team is following the HTTP specs and semantics correctly.
