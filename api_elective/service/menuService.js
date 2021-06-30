/* 
 * The code containing the Menu related queries to the database.
 * Author	: Rubisetcie
 */

// Importing the associated connector
const connector = require("../connector/mongoConnector");

// Retrieving menu data by ID
module.exports.getById = function(id) {
    return connector.selectMenuById(id);
};

// Retrieving multiple menu data by restaurant ID
module.exports.getByRestaurantId = function(id) {
    return connector.selectMenuByRestaurantId(id);
};

// Retrieving multiple menu data by filter
module.exports.getAll = function(limit, offset) {
    return connector.selectMenu(limit, offset);
};