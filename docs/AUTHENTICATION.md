# Authentication

# Importing Authorized User Data to a Database

For authentication, we had to import a csv file into mongo so that when a user is prompted to enter their credentials, it searches a database for the correct username and hashed password. The csv file that contains authorized user information is under data->authorizedUsers.csv. Too add/delete users, change the csv file & re-import it to mongo db.
How to do this:

Enter Mongo DB shell

    docker-compose up

    docker exec -it agenda_mongo_1 bash

    mongo testdb

See what collections are in testdb

    show collections

Display what is in the collection "users"

    db.users.find()

Delete everything that is in "users"

        db.users.deleteMany({})

Then control + D back into root & import data using 

    mongoimport -d testdb -c users --type=csv --headerline /data/exchange/authorizedUsers.csv

Go back into Mongo DB shell to check if csv file was imported by displaying the data in "users"

        mongo testdb

        show collections

        db.users.find() 

---

# Creating A Hashed Password Using Node.js

1. Open Node.js

2. To access the module, type in:

        const crypto = require('crypto')

3. Create your password:

        const mypass = 'Mynewpass123'

4. Hash the password that you have made:

        const hashed = crypto.createHmac('sha256', mypass).digest('hex')

5. Display the hashed password:

        console.log(hashed)

The hashed version of your password should be displayed & you can insert it into the csv file under the password headerline.

# Authentication Process
