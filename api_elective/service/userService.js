/* 
 * The code containing the User related queries to the database.
 * Author	: Rubisetcie
 */

// Importing the associated connector
const connector = require("../connector/sqlConnector");

// Retrieving user data by ID
module.exports.getById = function(id) {
    return connector.selectUserById(id);
};

// Retrieving a single user by filter
module.exports.getOne = function(email) {
    return connector.selectOneUser(email);
};

// Create a new user
module.exports.post = function(user) {
    return connector.insertUser(user);
};