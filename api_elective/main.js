/* 
 * The starting point of the application.
 * Author	: Rubisetcie
 */

const express = require("express");
//const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerDocument = require("yamljs").load("./swagger/swagger.yaml");

const PORT = 3000;

const app = express();

const swaggerOptions = {
	explorer: false
};

// Documentation URL
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions));

app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
});
