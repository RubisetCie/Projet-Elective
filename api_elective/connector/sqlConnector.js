/* 
 * The code containing the connection procedures to the Microsoft SQL database.
 * Author	: Rubisetcie
 */

// Importing the Tedious components
const Connection = require("tedious").Connection;
const Request = require("tedious").Request;  
const Types = require("tedious").TYPES;

// Connection constants
const SERVERNAME = "elective-sql-database.database.windows.net";
const USERNAME = "rubis";
const PASSWORD = "?NN9x*Bm#F%Qhn4?ECagc_knDm+UgK4TF@G6CT?Y=hpe*4y3#4XbsLg6teqq*Z4+PrcnhH%XfHNK%g@WH^h?^-BRh92Z!U9vXR&g!$^mMnBskG7sqan3udmbuzu#4+%J";

// Options for the connection
const config = {
    server: SERVERNAME,
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

// Select entries by ID
module.exports.selectById = function(id) {
    return new Promise((resolve) => {
        const query = 'SELECT "username", "usertype", "email", "password", "firstname", "lastname", "country", "zipcode", "city", "address", "billingnumber", "billincrypto", "billinowner" FROM dbo.users WHERE "id" = @id';
        const result = [];

        const request = new Request(query, function(err, rowCount, rows) {
            if (err) {
                console.log(err);
            } else {
                rows.forEach((columns) => {
                    const res = {};

                    res["username"] = columns[0].value;
                    res["usertype"] = columns[1].value;
                    res["email"] = columns[2].value;
                    res["password"] = columns[3].value;
                    res["firstname"] = columns[4].value === null ? null : columns[4].value;
                    res["lastname"] = columns[5].value === null ? null : columns[5].value;
                    res["country"] = columns[6].value === null ? null : columns[6].value;
                    res["zipcode"] = columns[7].value === null ? null : columns[7].value;
                    res["city"] = columns[8].value === null ? null : columns[8].value;
                    res["address"] = columns[9].value === null ? null : columns[9].value;
                    res["billingnumber"] = columns[10].value === null ? null : columns[10].value;
                    res["billincrypto"] = columns[11].value === null ? null : columns[11].value;
                    res["billinowner"] = columns[12].value === null ? null : columns[12].value;

                    result.push(res);
                });

                console.log(rowCount + " rows returned");

                resolve(result);
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
          if (column.value === null) {  
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

// Trigger connection
connection.connect();
