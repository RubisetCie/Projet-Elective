/* 
 * The code containing functions associated with the Restaurant's requests.
 * Author	: Rubisetcie
 */

// Importing the associated service
const service = require("../service/restaurantService");

// Retrieving user data by ID
module.exports.getById = function(req, res, next) {
    const id = parseInt(req.params.id, 10);
    
    // Paramters verification
    if (isNaN(id)) {
        console.log("Parameter not recognized: ", id);
        return next();
    }
    
    service.getById(id).then((result) => {
        res.json(result);
    }).catch((error) => {
        console.error("Exception caught while retrieving resturant: ", error);
        res.status(400).send();
    });
};