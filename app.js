// load The things we need
require("dotenv").config();
const routes = require('./server/routes/routes');
const express = require('express');
const bodyParser = require('body-parser');
const loggingMiddleware = require('./server/middleware/logging');
const rateLimiter = require('./server/middleware/rateLimiter');
const app = express();

// load "global application" middlewares - i.e. where it can intercept all incoming requests
app.use(rateLimiter);
app.use(loggingMiddleware);
app.use(bodyParser.json());

// Use the routes defined in routes.js
app.use('/api', routes);

// Default route
app.get("/", (req, res) => {
    res.send("Lawrence James Clarit: AppDev Backend Exercise");
});

// Start server on port 3001 or .env
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});