/* 
 * The code containing the authentication related queries to the database.
 * Author	: Rubisetcie
 */

// Importing the associated connector
const connector = require("../connector/sqlConnector");

// Retrieving a single user by filter
module.exports.getUserByEmail = function(email) {
    return connector.selectOneUser(email);
};
