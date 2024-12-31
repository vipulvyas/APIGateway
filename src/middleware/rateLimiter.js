const rateLimitService = require('../services/rateLimit');
const config = require('../config/config');
const logger = require('../utils/logger');

module.exports = function rateLimiter(req, res, next) {
    const clientId = req.ip; // Or use API key from headers
    const { windowMs, maxRequests, enabled } = config.rateLimit;

    if (!enabled) {
        next();
        return
    }

    if (rateLimitService.rateLimitStrategy(clientId, maxRequests, windowMs, 'slidingWindow')) {
        logger.warn(`Rate limit exceeded for client ${clientId}`);
        return res.status(429).json({
            error: 'Too Many Requests',
            retryAfter: Math.ceil(windowMs / 1000)
        });
    }

    const remaining = rateLimitService.getRemainingRequests(
        clientId,
        maxRequests,
        windowMs
    );
    
    res.setHeader('X-RateLimit-Remaining', remaining);
    next();
};
