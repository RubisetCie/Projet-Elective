/* 
 * The code containing the routes for the User endpoint.
 * Author	: Rubisetcie
 */

const express = require("express");
const router = express.Router();

// Importing the associated controller
const controller = require("../controller/userController");

// Retrieving user by ID
router.get('/:id', controller.getById);

module.exports = router;