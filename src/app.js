const express = require('express');
const helmet = require('helmet');
const gateway = require('./routes/gateway');
const logger = require('./utils/logger');
const config = require('./config/config');

const app = express();

// Security middleware
app.use(helmet());

// Request logging
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
});

// Gateway routes
app.use('/', gateway);

// Error handler
app.use((err, req, res, next) => {
    logger.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(config.port, () => {
    logger.info(`API Gateway listening on port ${config.port}`);
});

module.exports = app;
