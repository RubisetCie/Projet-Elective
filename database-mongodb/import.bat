:: Import the restaurants
mongoimport --uri "mongodb+srv://cluster-elective.n6ixa.mongodb.net/elective?authSource=%%24external&authMechanism=MONGODB-X509" --ssl --sslPEMKeyFile "..\..\X509-mongodb-admin.pem" --collection restaurants --file "restaurant.json"

:: Import the orders
mongoimport --uri "mongodb+srv://cluster-elective.n6ixa.mongodb.net/elective?authSource=%%24external&authMechanism=MONGODB-X509" --ssl --sslPEMKeyFile "..\..\X509-mongodb-admin.pem" --collection orders --file "order.json"