/* 
 * The code containing functions associated with the User's requests.
 * Author	: Rubisetcie
 */

// Importing the associated service
const service = require("../service/userService");

// Importing the utils functions
const handleError = require("../utils/apiUtils").handleError;

// Importing the ApiError exception class
const ApiError = require("../exception/apiError");

// Retrieving user data by ID
module.exports.getById = function(req, res) {
    try {
        const id = parseInt(req.params.id, 10);

        // Paramters verification
        if (isNaN(id))
            throw new ApiError("Parameter type not recognized: id", 400);

        service.getById(id).then((result) => {
            res.json(result.toJson());
        }).catch((error) => {
            handleError(error, res, "retrieving user");
        });
    } catch (err) {
        handleError(err, res, "retrieving user");
    }
};