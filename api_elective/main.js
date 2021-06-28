/* 
 * The starting point of the application.
 * Author	: Rubisetcie
 */

const express = require("express");
const swaggerUi = require("swagger-ui-express");

const swaggerDocument = require("yamljs").load("./swagger/swagger.yaml");

const app = express();

require("dotenv").config();

// Port number
const PORT = process.env.PORT || 3000;

// Importing the different routes for every endpoint
const userRouter = require("./route/userRoute");

// Options for the documentation
const swaggerOptions = {
    explorer: false
};

// Documentation URL
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions));

app.use("/user", userRouter);

app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
});
