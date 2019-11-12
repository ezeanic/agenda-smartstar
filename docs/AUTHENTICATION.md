
docker-compose up

docker exect -it agenda_mongo_1 bash

mongo testdb

show collections

mongo

show dbs

use testdb

show collections

mongoimport -d testdb -c users --type=csv --headlerline /data/exchange/authorizedUsers.csv