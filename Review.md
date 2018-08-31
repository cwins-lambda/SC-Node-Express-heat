# Review Questions

## What is Node.js?
Node.js is a runtime environment that allows us to execute JavaScript applications outside of the browser.
## What is Express?
Express is a web app framework that sits atop of Node.js. It gives us extra functionality like middleware and routing.  
## Mention two parts of Express that you learned about this week.
Two parts of Express we learned about this week are middleware and routing.
## What is Middleware?
Middleware is an array of functions that get executed in the order they are introduced.  They allow us to add extra features, both custom and built in.
## What is a Resource?
According to REST architecture, everything is a Resource.  Resources are accessible via a URI and can have multiple representations.  Resources are managed by HTTP methods.
## What can the API return to help clients know if a request was successful?
An API can return a message vie a json object or a statuscode to indicate a successful request.
## How can we partition our application into sub-applications?
We can partition our app into sub-apps by using Express Routers.
## What is express.json() and why do we need it?
express.json is a built in middleware that allows us to parse json content from the req.body.