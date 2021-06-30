/* 
 * The code containing the routes for the User endpoint.
 * Author	: Rubisetcie
 */

const router = require("express").Router();

// Importing the associated controller
const controller = require("../controller/userController");

// Retrieving user data by ID
router.get("/:id", controller.getById);

// Create a new user
router.post("/", controller.post);

module.exports = router;