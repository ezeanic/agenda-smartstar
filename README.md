Assignment 06
=============

REST API using Nodejs, Express, MongoDB and Typescript
------------------------------------------------------

# RESTful Web APIs

The goal of this week's assignment is to add an API endpoint to a REST API server.

When you check out the repository it will provide 

1. a working express.js http server providing a simple REST API for "contacts"

2. a working mongodb database providing persistence to the REST API

3. a docker-compose script that launches (1) and (2). 

The goal of this project is for you to devise a class of objects and a corresponding
API that you can test. You need to:

1. Document the attributes of your class

2. Create a corresponding `model` (code in the `models` directory)

3. Add a `controller` that interacts with mongoDB to manage instances of the `model`.

4. Provide an API available to external clients AND

5. Use a variation of src/probe.ts to check that your API is working correctly.

Sanity checking:
---------------

You can manually invoke the REST API using "curl" on the command line. For example to 
add a record to the contacts database you can use a command like this:

        curl -d '{"firstName":"Joe", "lastName":"Smith", "email":"joesmith@gmail.com", "company":"google", "phone":1234567890}' -H "Content-Type: application/json" -X POST http://server:3000/contact

Where `server` is the IP adress of your docker container (if you're using toolbox, or 127.0.0.1 if you're not).

You can retrieve records by sending a GET request to http://server:3000/contact/ where
`server` is the IP address associated with your docker container. This can be done with any browser,
or using curl like so:

        curl http://127.0.0.1:3000/contact

We'll pursue more thorough unit testing

*Reference from [Lynda.com](https://www.lynda.com/Node-js-tutorials/Next-steps/633869/671263-4.html)*

*Also: [Original Example GitHub Repo](https://github.com/dalenguyen/rest-api-node-typescript)*

