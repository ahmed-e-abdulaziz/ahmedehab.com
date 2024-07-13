---
title: WTF is HATEOAS?
excerpt: ha-tay-o-as, hat-os, ha-teoas, aitch-a-tee-o-a-ess, hideous?
publishDate: 'Feb 18 2021'
isFeatured: true
tags:
  - REST
seo:
  image:
    src: '/hateoas-hero.webp'
    alt: A blueprint drawing for multiple machineries
---

![A blueprint drawing for multiple machineries](/hateoas-hero.webp)

**H**ypermedia **A**s **T**he **E**ngine **O**f **A**pplication **S**tate or HATEOAS is a significant part of REST architecture to provide a Uniform Interface, which is one of the main fundamentals of REST. You can read more about REST fundamentals in [my previous post](https://ahmedehab.com/rest-fundamentals). Here I will explain it and why it was created.

## In a Perfect World

![Perfect!](https://media.giphy.com/media/l3vRcttCynxJoxIrK/giphy.gif)

Let's say we have a system that needs to expose an API to manage the user entity. That API will do CRUD operations in addition to supporting generating a report of the user billing for the last month; thus, the following endpoints were created in the backend:

1. Get all users: `GET https://ahmedehab.com/users/`
2. Get a single user with an ID of 1: `GET https://ahmedehab.com/users/1/`
3. Create a new user: `POST https://ahmedehab.com/users/` (Or PUT for idempotency, more on that in a later post)
4. Update a user: `PUT https://ahmedehab.com/users/1/`
5. DELETE a user: `DELETE https://ahmedehab.com/users/1/`
6. Retrieve a billing report for a user: `GET https://ahmedehab.com/users/1/report`

> Now, in a perfect world, these endpoints are and will always be the go-to endpoints to manage a user. We will never need to make a new change here, or will we?

## Imperfect World

Realistically, the backend endpoints will change over time for any large project. So for our example, a new architect was hired. He doesn't believe resources (i.e., users in the example) should be in the plural form in the URIs, so instead of `/users/1/`, we would have `/user/1/` add to that the BA/PO is now requesting a new feature to generate a tax report. So we will have the following endpoints.

1. Get all users: **GET** `https://ahmedehab.com/user/`
2. Get a single user with an ID of 1: **GET** `https://ahmedehab.com/user/1/`
3. Update the user: **PUT** `https://ahmedehab.com/user/1/`
4. Delete the user: **DELETE** `https://ahmedehab.com/user/1/`
5. Get the default billing report for a user: **GET** `https://ahmedehab.com/user/1/report/default`
6. Get the tax report for a user: **GET** `https://ahmedehab.com/user/1/report/tax`

Now for the frontend part, this will be devastating if we roll this update without a coordinated deployment with the frontend to address this.
This means we are not reaping the benefit of REST endpoints which is the evolution of the server and the client independently of each other.

## HATEOAS for the rescue

![HATEOAS saves the day!](https://media.giphy.com/media/l4q8hciiYNT5RGi4w/giphy.gif)

> Now, HATEOAS was introduced to specifically mitigate this issue, the issue of ever-evolving backend APIs.

With HATEOAS, we can keep the front end running as is while quickly changing all these different APIs.
HATEOAS defines actions and their endpoints in the response of any entity. Thus we don't hardcode every API in the front end.

It is applied by adding a list of actions with their links to the entity so we can get the required link from the response to perform our action.
Initially, the response for `GET /users/` to get a list of users would look like this (assuming we have a single user in the backend) with HATEOAS:

```json
[
  {
    "id": 1,
    "name": "Ahmed Ehab Abdul-Aziz",
    "email": "ahmed.ehab5010@gmail.com",
    "links": {
      "self": {
        "href": "https://ahmedehab.com/users/1"
      },
      "update": {
        "href": "https://ahmedehab.com/users/1"
      },
      "delete": {
        "href": "https://ahmedehab.com/users/1"
      },
      "report": {
        "href": "https://ahmedehab.com/users/1/report"
      }
    }
  }
]
```

Now we can change the endpoints from `/users/` to `/user/` and add a new report like this:

```json
[
  {
    "id": 1,
    "name": "Ahmed Ehab",
    "email": "ahmed.ehab5010@gmail.com",
    "links": {
      "self": {
        "href": "https://ahmedehab.com/user/1"
      },
      "update": {
        "href": "https://ahmedehab.com/user/1"
      },
      "delete": {
        "href": "https://ahmedehab.com/user/1"
      },
      "report": {
        "href": "https://ahmedehab.com/user/1/report/default"
      },
      "tax-report": {
        "href": "https://ahmedehab.com/user/1/report/tax"
      }
    }
  }
]
```

Another step we can do is to add the HTTP method used for each link to reduce coupling further. This is different from the REST standards, though.

```json
{
  "self": {
    "href": "https://ahmedehab.com/users/1",
    "method": "GET"
  }
}
```

That can lead to, for example, changing the PUT for the update action to PATCH without breaking any changes. Nonetheless, that last step is not HATEOAS compliant.

The recommended way to do this is to keep the older structure where there is only `"href"` in action and send an `OPTIONS` request before sending the request to get the required HTTP method. Each way has its fans. **Roy T. Fielding**, the creator of REST [was one of the creators of the OPTIONS request](https://lists.w3.org/Archives/Public/ietf-http-wg-old/1997SepDec/0376.html).

Some Architects even prefer to keep the HTTP method coupled as they see that the role of HATEOAS is to follow a standard to decouple the URIs since HATEOAS is part of having a Uniform Interface for REST. So we have to get back to the API documentation to recognize the HTTP verb.

> Remember that HATEOAS is not a replacement for something like OpenAPI for API documentation.

Also, the verb should present the action it is doing. If I am retrieving a user, I will always use a GET whether I change the URI or not. You can find a lot of colliding opinions on the internet, like [this link on StackOverflow](https://stackoverflow.com/questions/19959284/where-in-a-hateoas-architecture-do-you-specify-the-http-verbs)
