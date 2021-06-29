/* 
 * The code containing various utils functions.
 * Author	: Rubisetcie
 */

// Importing the ApiError exception class
const ApiError = require("../exception/apiError");

// Handle exceptions caught in during a request
module.exports.handleError = function(err, res, action) {
    if (err instanceof ApiError) {
        console.error("Error caught while " + action + ":", err);
        res.status(err.code).send();
    } else {
        console.error("Unexpected error caught while " + action + ":", err);
        res.status(500).send();
    }
};