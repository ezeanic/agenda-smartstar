Agenda API Server
==================

This is the code for the `Agenda` REST API server.

The easiest way to run tests for the server right now is to 
launch the application from one terminal window, and then 
run the tests from another window. So from the root:

    docker-compose up

and then in the 'server' directory:

    docker run --rm -it --net agenda_default --link agenda_api_1:api -v $PWD:/work -v /work/node_modules -e "API_URL=http://api:3001/contact" agenda_api sh
    # yarn test

or:

    docker run --rm -it --net agenda_default --link agenda_api_1:api -v $PWD:/work -v /work/node_modules -e "API_URL=http://api:3001/contact" agenda_api yarn test

If you want to debug using the chrome debugger tools, from the 'agenda' direectory,  you can try:

    docker-compose run -p 3001:3001 -p 9229:9229 api node --require ts-node/register --inspect-brk=0.0.0.0:9229 src/server.ts 
   
You use curl to test voting:

    curl -v --cookie "usertag=testuser" http://127.0.0.1:3001/vote/upVote/5bd43947ce5f85003a572ead
    curl -v --cookie "usertag=testuser" http://127.0.0.1:3001/vote/upVote/5bd43947ce5f85003a572ead
    curl -v --cookie "usertag=testuser" http://127.0.0.1:3001/vote/downVote/5bd43947ce5f85003a572ead

You can also run the mongodb server with docker compose, cd into 'server' and then run the server manually:

from 'agenda':

    (agenda) $ docker-compose run mongo

then cd to 'server':

    (server) $ docker run --rm -it --net agenda_default --link agenda_mongo_run_1:mongo -v "$PWD":/work -p 9229:9229 -p 3001:3001 -v /work/node_modules agenda_api sh
    /work # node --require ts-node/register --inspect-brk=0.0.0.0:9229 src/server.ts 

