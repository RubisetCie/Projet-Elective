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
        const query = 'SELECT "username", "usertype", "email", "password", "firstname", "lastname", "addressid", "country", "zipcode", "city", "address", "billingid", "number", "crypto", "owner" FROM dbo.users INNER JOIN dbo.useraddress ON dbo.useraddress.userid = dbo.users.id INNER JOIN dbo.address ON dbo.address.id = dbo.useraddress.addressid INNER JOIN dbo.userbilling ON dbo.userbilling.userid = dbo.users.id INNER JOIN dbo.billing ON dbo.billing.id = dbo.userbilling.billingid WHERE dbo.users.id = @id';

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

// Execute SQL statement (like 'INSERT)
/*module.exports.executeStatement = function(sql) {
    // Preparation
    const request = new Request(sql, function(err) {
        if (err) {
            console.log(err);
        }
    });
    
    var result = "";
    
    request.on("row", function(columns) {
        columns.forEach(function(column) {
          if (!column.value) {  
            console.log('NULL');  
          } else {  
            result+= column.value + " ";  
          }  
        });  
        console.log(result);  
        result ="";  
    });  

    request.on('done', function(rowCount, more) {  
    console.log(rowCount + ' rows returned');  
    });
    
    // Execution
    connection.execSql(request);
};*/

// Creates an User object from SQL data
deserializeUser = function(rows) {
    const user = new User;
    
    const firstRow = rows[0];
    const userAddresses = [];   // Workaround to prevent the inclusion of data twice
    const userBillings = [];    // Workaround to prevent the inclusion of data twice

    // Single attributes
    user.username = firstRow[0].value;
    user.usertype = firstRow[1].value;
    user.email = firstRow[2].value;
    user.password = firstRow[3].value;
    user.firstname = firstRow[4].value ? firstRow[4].value : null;
    user.lastname = firstRow[5].value ? firstRow[5].value : null;

    // Multiple attributes
    rows.forEach((row) => {
        const address = new Address;
        const billing = new Billing;

        // Check if the address has already been added
        if (!userAddresses.includes(row[6].value)) {
            userAddresses.push(row[6].value);

            address.country = row[7].value;
            address.zipcode = row[8].value;
            address.city = row[9].value ? row[9].value : null;
            address.address = row[10].value ? row[10].value : null;

            user.address.push(address);
        }

        // Check if the billing has already been added
        if (!userBillings.includes(row[11].value)) {
            userBillings.push(row[11].value);

            billing.number = row[12].value ? row[12].value : null;
            billing.crypto = row[13].value ? row[13].value : null;
            billing.owner = row[14].value ? row[14].value : null;

            user.billing.push(billing);
        }
    });
    
    return user;
};

// Trigger connection
connection.connect();
