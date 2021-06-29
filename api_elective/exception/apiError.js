/* 
 * The object representing an error occuring during the execution of a request.
 * Author	: Rubisetcie
 */

class ApiError extends Error {
    code;
    
    constructor(message, code) {
        super(message);
        this.code = code;
    }
};

module.exports = ApiError;