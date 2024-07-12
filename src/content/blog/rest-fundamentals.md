---
title: REST Fundamentals
excerpt: The Why, What, and How of REST
tags:
  - REST
publishDate: 'Feb 18 2021'
isFeatured: true
seo:
  image:
    src: '/rest-fundamentals-hero.jpg'
    alt: A person standing at the window
---

![rest-fundamentals-hero.jpg](/rest-fundamentals-hero.jpg)

REST has been a cornerstone of backend programming for quite a while now. However, many developers have a vague idea of what REST is or confuse it with HTTP. In this post, I will shed some light on what exactly constitutes REST and how it compares to HTTP.

## Why use REST?

REST enforces a good separation of concerns between clients and servers. The more our REST endpoints are mature, the more we can evolve our client (frontend) or server (backend) with no issues with scalability or coupling.

## What is REST?

REST: Stands for **RE**presentational **S**tate **T**ransfer. Firstly defined in the year 2000. It is an architectural style that standardizes communication between web services and systems. To say we have REST web services, we must follow the REST standards (i.e., become RESTful).

REST became wildly popular as a replacement for SOAP protocols requiring a lengthier set of requirements. However, note that REST **_doesn't dictate the data transfer protocol_**. It focuses instead on the architecture of endpoints and how to name them. Thus, it's a software architecture/pattern, not a protocol. Nonetheless, HTTP is recommended as the go-to protocol to apply REST, but you can use it with other protocols like MQTT.

## How to apply REST

This is the part of REST that, unfortunately, needs to be fully understood or followed, which leads to calling HTTP APIs REST APIs. However, REST is required to be followed correctly. Just check **Roy T. Fielding** [article](https://roy.gbiv.com/untangled/2008/rest-apis-must-be-hypertext-driven) from 2008, where he rants about how he is _getting frustrated by the number of people calling any HTTP-based interface a REST API_.

I will go over each of the basic fundamentals in the following point that leads to an actual REST endpoint, not just a regular HTTP one.

### Client and Server Separation

In REST, the client and server are separated, leading to less coupling between the client and server. Thus we gain flexibility and a stateless server.

### Statelessness

REST advocates statelessness, meaning that the server doesn't keep the client's state. So the server doesn't keep track of the user's session. This leads to great scalability, as any new server instance is not required to keep track of old sessions.

### Caching

If a request is following REST, the request must detail if it's cacheable or not. Applying caching to client and server requests leads to a significantly reduced number of requests. Or even the elimination of requests altogether over a while.

### Layers

If a client is connecting to a server and a new layer is introduced (e.g., proxy/load balancer), this must not affect how the client or the server behaves. So we can add proxies, load balancers, firewalls, and more without affecting the system's behavior.

### Uniform Interface

Having a uniform interface is a must in the REST architectural style. This enables each part (client/server) to change sides over time separately from each other. Four rules must be followed to have a uniform interface between clients and servers.

1. **Resource identification in requests**

   Resources (endpoints) should be identified in the request. Such as using URIs. For example, the user resource should be stated in the HTTP URI that the users are what is required here, like this `https://example.com/users/`.

   The resource for the server side is separate from the representations returned to the client. Many resources and entities represent this user endpoint in the backend. This is coupled away from the client/front end.

2. **Resource manipulation through representations**

   When a client receives a resource (with headers and other metadata), it has enough information to modify or delete. So if the frontend retrieves users from `https://example.com/users/`, it can follow a simple structure to manipulate any user in the list without asking the backend how to request a type of this change.

   In HTTP-based REST endpoints, this is achieved by HTTP verbs such as GET to retrieve, POST to create a new resource, PUT to create/update a complete resource, PATCH to modify a part of a resource, DELETE to delete a resource, and so on. This is accompanied by other data that can help in this, for example, returning each user ID.

3. **Self-descriptive messages**

   The response message should describe itself with no requirement to go back to the backend to retrieve the message's meaning. For example, an attribute must be attached to explain the file type if a file is returned in a binary format. If the response is in JSON, an attribute must exist to explain it's in JSON.

   In HTTP-based REST APIs, `https://example.com/annual-report/`, the response must have a media type header that explains that the returning blob is a pdf like this `Content-Type: application/pdf`.

   Also, in HTTP, the response should have a status code that describes the state of this response, whether it's an error or a successful one, like response 200 (OK) or 400 (BAD REQUEST).

4. **Hypermedia as the engine of application state (HATEOAS)**

   HATEOAS requires that when requesting a URI for a REST endpoint, the response should include links provided by the backend to discover all available resources in the response dynamically.

   This leads to a decoupled client from the backend endpoints leading to more freedom in changing the backend structure and endpoints.

   ```json
   {
     "id": 1,
     "name": "Ahmed Ehab",
     "email": "ahmed.ehab5010@gmail.com",
     "_links": {
       "self": {
         "href": "https://ahmedehab.com/users/1"
       },
       "report": {
         "href": "https://ahmedehab.com/users/1/report"
       }
     }
   }
   ```

   HATEOES is a big topic; I might write a post discussing it precisely. To keep this post short, I won't be going into HATEOES.

## Richardson Maturity Model

RMM is a maturity model described by Leonard Richardson in 2008. It tells how much an application adheres to REST specifications and puts it in one of four levels.This model is well suited to show us how much our endpoints conform to the REST architectural style, so it can state that our API is not a fully mature REST API, but partially a REST endpoint.
