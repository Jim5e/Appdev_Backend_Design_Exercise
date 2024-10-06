const rateLimit = require('express-rate-limit');

const rateLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute window 
    max: 60, // Limit each IP to 60 requests per windowMs
    message: 'Too many requests from this IP, please try again after a minute',
    headers: true, // Send rate limit info in the headers
    handler: (req, res, next, options) => {
        res.setHeader('Retry-After', 60); // Set Retry-After header to 1 minute
        res.status(options.statusCode).send(options.message);
    },
});

module.exports = rateLimiter;

//for testing the rate limit just change the max to 5, and 60 -> 10.. then try to login 6 times in a row in postman