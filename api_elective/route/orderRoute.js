/* 
 * The code containing the routes for the Order endpoint.
 * Author	: Rubisetcie
 */

const router = require("express").Router();

// Importing the associated controller
const controller = require("../controller/orderController");

// Retrieving multiple order data by filter
router.get("/", controller.getAll);

// Retrieving multiple order data by client ID
router.get("/client/:id", controller.getByClientId);

// Retrieving multiple order data by restaurant ID
router.get("/restaurant/:id", controller.getByRestaurantId);

// Create an order
router.post("/", controller.post);

// Update an order
router.put("/", controller.put);

module.exports = router;