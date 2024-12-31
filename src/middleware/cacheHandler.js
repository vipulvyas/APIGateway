const cacheService = require('../services/cache');
const config = require('../config/config');
const logger = require('../utils/logger');

module.exports = function cacheHandler(req, res, next) {
    if (!config?.cache?.enabled) {
        next();
        return
    } 
    const cacheKey = req.originalUrl;
    const cachedResponse = cacheService.get(cacheKey);

    if (cachedResponse) {
        logger.info(`Cache hit for ${cacheKey}`);
        return res.json(cachedResponse);
    }

    // Store original send function
    const originalSend = res.json;
    
    // Override send function to cache response
    res.json = function(body) {
        cacheService.set(cacheKey, body, config.cache.ttl);
        logger.info(`Cached response for ${cacheKey}`);
        return originalSend.call(this, body);
    };

    next();
};
