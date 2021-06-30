/* 
 * The code containing the connection procedures to the Microsoft SQL database.
 * Author	: Rubisetcie
 */

// Importing the Tedious components
const Connection = require("tedious").Connection;
const Request = require("tedious").Request;  
const Types = require("tedious").TYPES;

// Importing the models
const User = require("../model/user");
const Address = require("../model/address");
const Billing = require("../model/billing");

// Importing the ApiError exception class
const ApiError = require("../exception/apiError");

// Connection constants
const HOST = process.env.SQL_HOST;
const USERNAME = process.env.SQL_USERNAME;
const PASSWORD = process.env.SQL_PASSWORD;

// Options for the connection
const config = {
    server: HOST,
    authentication: {
        type: "default",
        options: {
            userName: USERNAME,
            password: PASSWORD
        }
    },
    options: {
        encrypt: true,
        rowCollectionOnRequestCompletion: true,
        database: "SQL-Elective"
    }
};

const connection = new Connection(config);

// Callback when connected
connection.on("connect", function(err) {
    if (err) {
        console.error("Error while connecting to Microsoft SQL Database", err);
    } else {
        console.log("Connected to Microsoft SQL Database");
    }
});

// Select user by ID
module.exports.selectUserById = function(id) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT dbo.users.id AS "id", "username", "usertype", "email", "password", "firstname", "lastname", "addressid", "country", "zipcode", "city", "address", "billingid", "number", "crypto", "owner" FROM dbo.users INNER JOIN dbo.useraddress ON dbo.useraddress.userid = dbo.users.id INNER JOIN dbo.address ON dbo.address.id = dbo.useraddress.addressid INNER JOIN dbo.userbilling ON dbo.userbilling.userid = dbo.users.id INNER JOIN dbo.billing ON dbo.billing.id = dbo.userbilling.billingid WHERE dbo.users.id = @id';

        const request = new Request(query, function(err, rowCount, rows) {
            try {
                if (err)
                    throw err;
                
                if (rowCount <= 0)
                    throw new ApiError("Query returned no rows", 400);

                const user = deserializeUser(rows);

                console.log(rowCount + " rows returned");

                resolve(user);
            } catch (err) {
                reject(err);
            }
        });
        
        // Request parameters
        request.addParameter("id", Types.BigInt, id);

        connection.execSql(request);
    });
};

// Insert user
module.exports.insertUser = function(user) {
    return new Promise((resolve, reject) => {
        const statement = 'EXECUTE dbo.createUser @username, @usertype, @email, @password, @firstname, @lastname, @country, @zipcode, @city, @address, @number, @crypto, @owner;';

        const request = new Request(statement, function(err) {
            try {
                if (err)
                    throw err;

                console.log("Request finished");

                resolve();
            } catch (err) {
                reject(err);
            }
        });
        
        // Request parameters (@username, @usertype, @email, @password, @firstname, @lastname)
        request.addParameter("username", Types.VarChar, user.username);
        request.addParameter("usertype", Types.TinyInt, user.usertype);
        request.addParameter("email", Types.VarChar, user.email);
        request.addParameter("password", Types.VarChar, user.password);
        request.addParameter("firstname", Types.VarChar, user.firstname);
        request.addParameter("lastname", Types.VarChar, user.lastname);
        request.addParameter("country", Types.VarChar, user.address.country);
        request.addParameter("zipcode", Types.VarChar, user.address.zipcode);
        request.addParameter("city", Types.VarChar, user.address.city);
        request.addParameter("address", Types.VarChar, user.address.address);
        request.addParameter("number", Types.Char, user.billing.number);
        request.addParameter("crypto", Types.Char, user.billing.crypto);
        request.addParameter("owner", Types.VarChar, user.billing.owner);

        connection.execSql(request);
    });
};

// Creates an User object from SQL data
deserializeUser = function(rows) {
    const user = new User;
    
    const firstRow = rows[0];
    const userAddresses = [];   // Workaround to prevent the inclusion of data twice
    const userBillings = [];    // Workaround to prevent the inclusion of data twice

    // Single attributes
    user.id = firstRow[0].value;
    user.username = firstRow[1].value;
    user.usertype = firstRow[2].value;
    user.email = firstRow[3].value;
    user.password = firstRow[4].value;
    user.firstname = firstRow[5].value ? firstRow[5].value : null;
    user.lastname = firstRow[6].value ? firstRow[6].value : null;

    // Multiple attributes
    rows.forEach((row) => {
        const address = new Address;
        const billing = new Billing;

        // Check if the address has already been added
        if (!userAddresses.includes(row[7].value)) {
            userAddresses.push(row[7].value);

            address.country = row[8].value;
            address.zipcode = row[9].value;
            address.city = row[10].value ? row[10].value : null;
            address.address = row[11].value ? row[11].value : null;

            user.address.push(address);
        }

        // Check if the billing has already been added
        if (!userBillings.includes(row[12].value)) {
            userBillings.push(row[12].value);

            billing.number = row[13].value ? row[13].value : null;
            billing.crypto = row[14].value ? row[14].value : null;
            billing.owner = row[15].value ? row[15].value : null;

            user.billing.push(billing);
        }
    });
    
    return user;
};

// Trigger connection
connection.connect();
