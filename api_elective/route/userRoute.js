/* 
 * The code containing the routes for the User endpoint.
 * Author	: Rubisetcie
 */

const router = require("express").Router();

// Importing the associated controller
const controller = require("../controller/userController");

// Retrieving a single user by filter
router.get("/one/", controller.getOne);

// Retrieving user data by ID
router.get("/:id", controller.getById);

// Updates an existing user
router.put("/", controller.put);

module.exports = router;