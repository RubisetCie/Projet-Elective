/* 
 * The code containing the User related queries to the database.
 * Author	: Rubisetcie
 */

// Importing the associated connector
const connector = require("../connector/sqlConnector");

// Retrieving user by ID
module.exports.getById = function(id) {
    return connector.selectById(id);
};