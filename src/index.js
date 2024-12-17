const express = require("express");
require("./db/mongoose.js");
const userRoute = require("./routes/userRoute");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const app = express();
const port = process.env.PORT || 8080;

// Swagger configuration
const path = require("path");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API-App Project",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:8080/",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: [path.join(__dirname, "./routes/*.js")],
};

const swaggerSpec = swaggerJSDoc(options);

// Middlewares
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.use(express.json());
app.use(userRoute);

// Start the server
app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
