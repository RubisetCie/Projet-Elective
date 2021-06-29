/* 
 * The code containing the connection procedures to the MongoDB database.
 * Author	: Rubisetcie
 */

// Importing the connector components
const MongoClient = require("mongodb");

// Importing the models
const User = require("../model/user");
const Address = require("../model/address");
const Billing = require("../model/billing");

// Connection constants
const HOST = process.env.MONGO_HOST;
const USERNAME = process.env.MONGO_USERNAME;
const PASSWORD = process.env.MONGO_PASSWORD;

const client = new MongoClient(HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Select user by ID
module.exports.selectUserById = function(id) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT "username", "usertype", "email", "password", "firstname", "lastname", "addressid", "country", "zipcode", "city", "address", "billingid", "number", "crypto", "owner" FROM dbo.users INNER JOIN dbo.useraddress ON dbo.useraddress.userid = dbo.users.id INNER JOIN dbo.address ON dbo.address.id = dbo.useraddress.addressid INNER JOIN dbo.userbilling ON dbo.userbilling.userid = dbo.users.id INNER JOIN dbo.billing ON dbo.billing.id = dbo.userbilling.billingid WHERE dbo.users.id = @id';
        const result = [];

        const request = new Request(query, function(err, rowCount, rows) {
            try {
                if (err)
                    throw err;
                
                const user = new User;

                const firstRow = rows[0];
                const userAddresses = [];   // Workaround to prevent the inclusion of data twice
                const userBillings = [];    // Workaround to prevent the inclusion of data twice

                // Single attributes
                user.username = firstRow[0].value;
                user.usertype = firstRow[1].value;
                user.email = firstRow[2].value;
                user.password = firstRow[3].value;
                user.firstname = firstRow[4].value === null ? null : firstRow[4].value;
                user.lastname = firstRow[5].value === null ? null : firstRow[5].value;

                // Multiple attributes
                rows.forEach((row) => {
                    const address = new Address;
                    const billing = new Billing;

                    // Check if the address has already been added
                    if (!userAddresses.includes(row[6].value)) {
                        userAddresses.push(row[6].value);

                        address.country = row[7].value;
                        address.zipcode = row[8].value;
                        address.city = row[9].value === null ? null : row[9].value;
                        address.address = row[10].value === null ? null : row[10].value;

                        user.address.push(address);
                    }

                    // Check if the billing has already been added
                    if (!userBillings.includes(row[11].value)) {
                        userBillings.push(row[11].value);

                        billing.number = row[12].value === null ? null : row[12].value;
                        billing.crypto = row[13].value === null ? null : row[13].value;
                        billing.owner = row[14].value === null ? null : row[14].value;

                        user.billing.push(billing);
                    }
                });

                result.push(user.toJson());

                console.log(rowCount + " rows returned");

                resolve(result);
            } catch (ex) {
                reject(ex);
            }
        });
        
        // Request parameters
        request.addParameter("id", Types.BigInt, id);

        connection.execSql(request);
    });
};

// Trigger connection
client.connect((err) => {
    if (err) {
        console.error("Error while connecting to MongoDB Database", err);
    } else {
        console.log("Connected to MongoDB Database");
    }
});
