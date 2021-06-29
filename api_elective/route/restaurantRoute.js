/* 
 * The code containing the routes for the Restaurant endpoint.
 * Author	: Rubisetcie
 */

const router = require("express").Router();

// Importing the associated controller
const controller = require("../controller/restaurantController");

// Retrieving restaurant data by ID
router.get('/:id', controller.getById);

module.exports = router;