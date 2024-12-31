const express = require('express');
const router = express.Router();
const rateLimiter = require('../middleware/rateLimiter');
const cacheHandler = require('../middleware/cacheHandler');
const mockBackend = require('../services/mockBackend');
const config = require('../config/config');
const logger = require('../utils/logger');
const cacheService = require('../services/cache');

// Apply rate limiting and caching middleware to all routes
router.use(rateLimiter);
router.use(cacheHandler);

// Dynamic route handler for all services
Object.values(config.services).forEach(service => {
    router.get(service.path, async (req, res) => {
        try {
            const response = await mockBackend.handleRequest(service, req);
            res.json(response);
        } catch (error) {
            logger.error(`Error handling request to ${service.path}: ${error.message}`);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
});

// Metrics endpoint
router.get('/metrics', (req, res) => {
    const cacheMetrics = cacheService.getMetrics();
    res.json({
        cache: {
            hits: cacheMetrics.hits,
            misses: cacheMetrics.misses,
            hitRate: cacheMetrics.hits / (cacheMetrics.hits + cacheMetrics.misses)
        }
    });
});

module.exports = router;
