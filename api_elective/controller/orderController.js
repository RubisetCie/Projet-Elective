/* 
 * The code containing functions associated with the Order's requests.
 * Author	: Rubisetcie
 */

// Importing the associated service
const service = require("../service/orderService");

// Importing the utils functions
const handleError = require("../utils/apiUtils").handleError;

// Importing the ApiError exception class
const ApiError = require("../exception/apiError");

// Retrieving multiple order data by client ID
module.exports.getByClientId = function(req, res) {
    try {
        const id = parseInt(req.params.id, 10);
        
        // Paramters verification
        if (isNaN(id))
            throw new ApiError("Parameter not recognized: id", 400);
        
        service.getByClientId(id).then((result) => {
            const json = [];
            result.forEach((r) => {
                json.push(r.toJson());
            });
            res.json(json);
        }).catch((error) => {
            handleError(error, res, "retrieving order");
        });
    } catch (err) {
        handleError(err, res, "retrieving order");
    }
};

// Retrieving multiple order data by restaurant ID
module.exports.getByRestaurantId = function(req, res) {
    try {
        const id = parseInt(req.params.id, 10);
        
        // Paramters verification
        if (isNaN(id))
            throw new ApiError("Parameter not recognized: id", 400);
        
        service.getByRestaurantId(id).then((result) => {
            const json = [];
            result.forEach((r) => {
                json.push(r.toJson());
            });
            res.json(json);
        }).catch((error) => {
            handleError(error, res, "retrieving order");
        });
    } catch (err) {
        handleError(err, res, "retrieving order");
    }
};

// Retrieving multiple order data by filter
module.exports.getAll = function(req, res) {
    try {
        // Parameters reading
        const limit = (req.query["limit"] || req.query["limit"] === 0) ? parseInt(req.query["limit"]) : null;
        const offset = (req.query["offset"] || req.query["offset"] === 0) ? parseInt(req.query["offset"]) : null;
        const status = req.query["status"] ? req.query["status"].split(';') : null;
        
        // Paramters verification
        if (limit) {
            if (isNaN(limit))   throw new ApiError("Parameter type not recognized: limit", 400);
            if (limit < 1)      throw new ApiError("Parameter below accepted value: limit below 1", 400);
        }
        
        if (offset) {
            if (isNaN(offset))  throw new ApiError("Parameter type not recognized: offset", 400);
            if (offset < 1)     throw new ApiError("Parameter below accepted value: offset below 1", 400);
        }
        
        if (status) {
            if (!Array.isArray(status))
                throw new ApiError("Parameter type not recognized: status", 400);
        }
        
        service.getAll(limit, offset, status).then((result) => {
            const json = [];
            result.forEach((r) => {
                json.push(r.toJson());
            });
            res.json(json);
        }).catch((error) => {
            handleError(error, res, "retrieving order");
        });
    } catch (err) {
        handleError(err, res, "retrieving order");
    }
};