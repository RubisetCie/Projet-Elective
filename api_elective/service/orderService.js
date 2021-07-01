/* 
 * The code containing the Order related queries to the database.
 * Author	: Rubisetcie
 */

// Importing the associated connector
const connector = require("../connector/mongoConnector");

// Retrieving multiple orders data by client ID
module.exports.getByClientId = function(id) {
    return connector.selectOrderByClientId(id);
};

// Retrieving multiple orders data by restaurant ID
module.exports.getByRestaurantId = function(id) {
    return connector.selectOrderByRestaurantId(id);
};

// Retrieving multiple orders data by filter
module.exports.getAll = function(limit, offset, clientId, status) {
    return connector.selectOrder(limit, offset, clientId, status);
};

// Create an order
module.exports.post = function(order) {
    return connector.insertOrder(order);
};