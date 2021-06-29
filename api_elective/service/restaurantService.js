/* 
 * The code containing the Restaurant related queries to the database.
 * Author	: Rubisetcie
 */

// Importing the associated connector
const connector = require("../connector/mongoConnector");

// Retrieving restaurant data by ID
module.exports.getById = function(id) {
    return connector.selectRestaurantById(id);
};

// Retrieving multiple restaurant data by filter
module.exports.getAll = function(limit, offset, status) {
    return connector.selectRestaurant(limit, offset, status);
};