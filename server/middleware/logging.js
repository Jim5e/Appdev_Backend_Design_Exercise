const morgan = require('morgan');

// Create a custom token to log the timestamp
morgan.token('timestamp', () => new Date().toISOString());

const loggingFormat = ':method :url :status :res[content-length] - :response-time ms :timestamp'; //this is the logging format

// Create the logging middleware
const loggingMiddleware = morgan(loggingFormat);

module.exports = loggingMiddleware;

//Sample output for this would be found in your terminal (see below)
//GET /api/getAllUsers 429 63 - 0.461 ms 2024-10-06T05:42:22.066Z
