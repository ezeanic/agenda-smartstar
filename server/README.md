Agenda API Server
==================

This is the code for the `Agenda` REST API server.

The easiest way to run tests for the server right now is to 
launch the application from one terminal window, and then 
run the tests from another window. So from the root:

    docker-compose up

and then in the 'server' directory:

    docker run --rm -it --net agenda_default --link agenda_api_1 -v $PWD:/work -v /work/node_modules -e "API_URL=http://api:3001/contact" agenda_api sh
    # yarn test

or:

    docker run --rm -it --net agenda_default --link agenda_api_1 -v $PWD:/work -v /work/node_modules -e "API_URL=http://api:3001/contact" agenda_api yarn test


