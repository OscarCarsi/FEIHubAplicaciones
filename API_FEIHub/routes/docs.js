"use strict";

const express = require("express");
const app = express();
const path = require("path");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const swaggerOptions = {

    definition:{

        info:{

            version: "1.0.0",
            title: "APIUsers_FEIHub",
            description: "Documentation of api users to the FEIHub system",
        },
        servers: [
            {
            url: "http://localhost:9000"
            },
            {
                url: "http://localhost:9001"
            },
            {
                url: "http://localhost:9002"
            },

        ]  
    },
    apis: [`${path.join(__dirname, "../controllers/credentials.js")}`, `${path.join(__dirname, "../controllers/followers.js")}`, `${path.join(__dirname, "../controllers/Users.js")}`]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/apidocs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

module.exports = app;
