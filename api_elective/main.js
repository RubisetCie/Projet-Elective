/* 
 * The starting point of the application.
 * Author	: Rubisetcie
 */

const express = require("express");
const cors = require("cors");
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

// Options for the documentation
const swaggerOptions = {
    explorer: false
};

app.use(cors());

// Documentation URL
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions));

app.use("/user", userRouter);
app.use("/restaurant", restaurantRouter);
app.use("/menu", menuRouter);

app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
});
