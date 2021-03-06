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

// Select user by email
module.exports.selectOneUser = function(email) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT dbo.users.id AS "id", "username", "usertype", "email", "password", "firstname", "lastname", "addressid", "country", "zipcode", "city", "address", "billingid", "number", "crypto", "owner" FROM dbo.users INNER JOIN dbo.useraddress ON dbo.useraddress.userid = dbo.users.id INNER JOIN dbo.address ON dbo.address.id = dbo.useraddress.addressid INNER JOIN dbo.userbilling ON dbo.userbilling.userid = dbo.users.id INNER JOIN dbo.billing ON dbo.billing.id = dbo.userbilling.billingid WHERE dbo.users.email LIKE @email';

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
        request.addParameter("email", Types.VarChar, email ? email : "%");

        connection.execSql(request);
    });
};

// Insert user
module.exports.insertUser = function(user) {
    return new Promise((resolve, reject) => {
        const statement = 'DECLARE @return_id INT; EXECUTE @return_id = dbo.createUser @username, @usertype, @email, @password, @firstname, @lastname, @country, @zipcode, @city, @address, @number, @crypto, @owner; SELECT "Return" = @return_id;';

        const request = new Request(statement, function(err, rowCount, rows) {
            try {
                if (err)
                    throw err;
                
                if (rowCount <= 0)
                    throw new ApiError("Statement returned no rows", 400);
                
                console.log("Request finished");

                resolve(rows[0][0].value);
            } catch (err) {
                reject(err);
            }
        });
        
        // Request parameters
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

// Update user
module.exports.updateUser = function(user) {
    return new Promise((resolve, reject) => {
        var statement = 'UPDATE dbo.users';
        var set = 0;
        
        // Set the columns
        if (user.username) {
            if (set === 0)  statement += ' SET';
            statement += (set > 0 ? ',' : '') + ' "username" = @username';
            set++;
        }
        
        if (user.usertype || user.usertype === 0) {
            if (set === 0)  statement += ' SET';
            statement += (set > 0 ? ',' : '') + ' "usertype" = @usertype';
            set++;
        }
        
        if (user.email) {
            if (set === 0)  statement += ' SET';
            statement += (set > 0 ? ',' : '') + ' "email" = @email';
            set++;
        }
        
        if (user.password) {
            if (set === 0)  statement += ' SET';
            statement += (set > 0 ? ',' : '') + ' "password" = @password';
            set++;
        }

        if (user.firstname) {
            if (set === 0)  statement += ' SET';
            statement += (set > 0 ? ',' : '') + ' "firstname" = @firstname';
            set++;
        }
        
        if (user.lastname) {
            if (set === 0)  statement += ' SET';
            statement += (set > 0 ? ',' : '') + ' "lastname" = @lastname';
            set++;
        }
            
        statement += ' WHERE dbo.users.id = @id;';

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
        
        // Request parameters
        request.addParameter("id", Types.BigInt, user.id);
        request.addParameter("username", Types.VarChar, user.username);
        request.addParameter("usertype", Types.TinyInt, user.usertype);
        request.addParameter("email", Types.VarChar, user.email);
        request.addParameter("password", Types.VarChar, user.password);
        request.addParameter("firstname", Types.VarChar, user.firstname);
        request.addParameter("lastname", Types.VarChar, user.lastname);

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
        // Check the user ID
        if (row[0].value !== user.id)
            return;
        
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
