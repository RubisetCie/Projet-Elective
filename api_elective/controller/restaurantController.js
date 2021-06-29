/* 
 * The code containing functions associated with the Restaurant's requests.
 * Author	: Rubisetcie
 */

// Importing the associated service
const service = require("../service/restaurantService");

// Importing the utils functions
const handleError = require("../utils/apiUtils").handleError;

// Importing the ApiError exception class
const ApiError = require("../exception/apiError");

// Retrieving restaurant data by ID
module.exports.getById = function(req, res) {
    try {
        const id = parseInt(req.params.id, 10);

        // Paramters verification
        if (isNaN(id))
            throw new ApiError("Parameter not recognized: id", 400);
        
        service.getById(id).then((result) => {
            res.json(result.toJson());
        }).catch((error) => {
            handleError(error, res, "retrieving resturant");
        });
    } catch (err) {
        handleError(err, res, "retrieving resturant");
    }
};

// Retrieving multiple restaurant data by filter
module.exports.getAll = function(req, res) {
    try {
        const limit = req.body["limit"];
        const offset = req.body["offset"];
        const status = req.body["status"];
        
        // Paramters verification
        if (Number.isInteger(limit))    throw new ApiError("Parameter type not recognized: limit", 400);
        if (limit < 1)                  throw new ApiError("Parameter below accepted value: limit below 1", 400);
        
        if (Number.isInteger(offset))   throw new ApiError("Parameter type not recognized: offset", 400);
        if (offset < 0)                 throw new ApiError("Parameter below accepted value: offset below 0", 400);
        
        if (Array.isArray(status))      throw new ApiError("Parameter type not recognized: status", 400);
        
        service.getAll(limit, offset, status).then((result) => {
            res.json(result.toJson());
        }).catch((error) => {
            handleError(error, res, "retrieving resturant");
        });
    } catch (err) {
        handleError(err, res, "retrieving resturant");
    }
};