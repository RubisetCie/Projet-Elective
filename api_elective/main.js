/* 
 * The starting point of the application.
 * Author	: Rubisetcie
 */

const express = require("express");
const swaggerUi = require("swagger-ui-express");

const swaggerDocument = require("./swagger/api.json");

const PORT = 1234;

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
});
