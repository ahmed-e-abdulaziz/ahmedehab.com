---
title: Richardson Maturity Model
excerpt: How mature is your REST API? RMM answers that
tags:
  - REST
publishDate: 'Feb 18 2021'
isFeatured: true
seo:
  image:
    src: '/richardson-maturity-model-hero.webp'
    alt: Three flower bases with the left one blooming
---

![Three flower bases with the left one blooming](/richardson-maturity-model-hero.webp)

## Are you RESTful?

So, right now, everyone and their mother is creating REST APIs. However, are all REST APIs created as equals?
As I said in my [rest fundamentals article](https://ahmedehab.com/rest-fundamentals), **Roy Fielding**, the creator of REST, [is _getting frustrated by the number of people calling any HTTP-based interface a REST API_](https://roy.gbiv.com/untangled/2008/rest-apis-must-be-hypertext-driven).
Even so, a black-or-white scale for whether an API is RESTful can be misleading. Thus, **Leonard Richardson** designed a way to define how much an API conforms to the RESTful standards, creating the Richardson Maturity Model or RMM.

## RMM

RMM aims to describe a specific grade for how much an API conforms to the RESTful standards. Maturity here means conformity to RESTful standards. It has four levels of maturity levels from level 0 to level 3.

The great thing is that it doesn't shun away any API that is not fully RESTful. It has some specific measurements that will allow engineers to quickly assess how scalable their endpoints are according to the RESTful standards and what can be improved to reach a higher level.

![RMM Hierarchy](/RMM.webp)

## Level 0 (Swamp of POX)

In this level, a single URI can serve multiple resources and actions, and HTTP verb usage is incorrect (mostly only POST).

For example, you can have a URI that looks like this `/usersManagement`, which will serve to query, update, delete and create users using only the `POST` HTTP verb. To differentiate between the various obscure actions that the endpoint can do at this level, the body of the request will have to have the specific requirements of the request.

This level is not considered RESTful by RMM and mainly exists in the SOAP Web Services world. That's why it's called the Swamp of POX, as POX means Plain Old XML, and the level of coupling and obscurity of the endpoints in this level led to it being called a Swamp.

I have experienced integrating with SOAP services, and let me tell you that this level is awful and leads to a lot of confusion and mistakes.

## Level 1 (Resources)

At level 1, we will use different URIs for different resources but still only use one HTTP verb (generally `POST` as well), leading to better decoupling in the API.

So using the previous example, instead of having one `/usersManagement` endpoint, we will have `/usersCreate`, `/usersUpdate`, `/usersDelete`, and `/usersQuery` while using only `POST` HTTP verb for all of them. We won't be using the body to define the action, though.

Although, level 1 is much better than the previous level. It still isn't considered RESTful enough by RMM. At the start of my career, I worked on a project with an API that would primarily reside at this level, and it was extremely cumbersome to keep creating and integrating with APIs like this. Furthermore, the whole suffix I used in this example needs to be standardized. It was basically whatever the developer would think was correct, which would differ wildly per developer.

For example, someone would query users with `/usersQuery`. Still, for address querying, the endpoint would be `/addressRetrieval`, and someone else would retrieve departments using `/getDepartments`, leading to a highly fragmented API.

## Level 2 (HTTP Verbs)

Here we are at a level that is considered RESTful by a lot of RMM advocates. However, Roy Fielding believes it needs to be RESTful more. In my opinion, this level is RESTful and can provide the requirements of a RESTful API.

Anyway, now we will put HTTP verbs to actual use. Let's use the previous example. Now the users will have the following endpoint `/users`. Then to retrieve users, we will create a request with a `GET` HTTP verb to the users' endpoint. We will use the `DELETE` HTTP verb to delete a user in the request to indicate the action. To update, you can use `PUT` or `PATCH`. We can use `GET`, `POST`, `PUT`, `DELETE`, and more for other endpoints like that address or department.

The majority of Web APIs never pass this level. Mainly, that's okay; this level can provide almost all RESTful requirements. It only needs a self-descriptive API. The API dev delivers the client documentation beforehand. Thus, it will also require documentation to define the necessary endpoints for various actions on the retrieved entity.

## Level 3 (HATEOAS)

Finally, we arrive at the last level here. The HATEOAS principles reside here.
When we get the users from the `/users` endpoint with the `GET` HTTP verb, the response for getting a user will look like the following:

```json
[
  {
    "id": 1,
    "name": "Ahmed Ehab Abdulaziz",
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

As you can see, we don't need the update, delete, report, or tax-report actions to be hard coded in our code.
When we get the users array, we will get the API to do the various actions with the endpoint per user through the response as in the example.

I want to go over HATEOAS sparingly, as it deserves its article. You can find more about it in [my article here](https://ahmedehab.com/hateoas). Lastly, everyone considers this level RESTful, including **Roy Fielding**, [who regards it as a prerequisite to having a RESTful API](https://roy.gbiv.com/untangled/2008/rest-apis-must-be-hypertext-driven).

## Which level should I develop for?

**Levels 0 and 1** are still in use today, and many web applications are developed with levels 0 or 1. However, **level 2** for greenfield web API today is considered acceptable. Whether calling it a RESTful API or not, it leads to a cleaner API and does not put overhead on the developers or the API architect.

As for level 3, you need to consider the users' bandwidth. Also, the primary purpose of HATEOAS is to deal with changes in the API efficiently. Changes have never been an issue for internal applications, and the new APIs are adapted to the old ones. The other way around is much harder for this type of project. Besides, many developers don't understand or even know what HATEOAS is. Some training might be required to onboard them.
However, for SaaS-based projects or other projects with an external API exposed to many different systems, HATEOAS and Level 3 can be of immense practicality. You can easily swap out old APIs with new APIs without having to change a line of code in the integrating services.

P.S. You should read the **Roy Fielding** article that mentions that REST APIs must be hypertext. The discussions there are fascinating. You can visit it from [here](https://roy.gbiv.com/untangled/2008/rest-apis-must-be-hypertext-driven).
