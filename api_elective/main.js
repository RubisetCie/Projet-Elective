/* 
 * The starting point of the application.
 * Author	: Rubisetcie
 */

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const fs = require("fs");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("yamljs").load("./swagger/swagger.yaml");

const app = express();

require("dotenv").config();

// Port number
const PORT = process.env.PORT || 3000;

// Importing the different routes for every endpoint
const userRouter = require("./route/userRoute");
const restaurantRouter = require("./route/restaurantRoute");
const menuRouter = require("./route/menuRoute");
const orderRouter = require("./route/orderRoute");
const userController = require("./controller/userController");
const authenticationController = require("./controller/authenticationController");

// Options for the documentation
const swaggerOptions = {
    explorer: false
};

app.use(bodyParser.json());
app.use(cors());

// Documentation URL
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions));

// Logging middleware
app.use(morgan("common", {stream: fs.createWriteStream(__dirname + "/access.log", { flags: "a" })}));

// Login URL
app.post("/login", authenticationController.login);
app.post("/logout", authenticationController.logout);
app.post("/token", authenticationController.token);

// Add the route to create a new user before the authentication middleware
app.post("/user/", userController.post);

// Authentication handling for the API
app.use(authenticationController.authentication);

app.use("/user", userRouter);
app.use("/restaurant", restaurantRouter);
app.use("/menu", menuRouter);
app.use("/order", orderRouter);

app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
});
