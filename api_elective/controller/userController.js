/* 
 * The controller for the User endpoint.
 * Author	: Rubisetcie
 */

const express = require("express");
const router = express.Router();

// Retrieving user by ID
module.exports.getById = function(req, res, next) {
    const id = req.params.id;
    
    // Paramters verification
    if (!parseInt(id, 10))
        return next();
    
    res.send("Test");
};