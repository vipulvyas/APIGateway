module.exports = {
    port: process.env.PORT || 3000,
    rateLimit: {
        enabled: true,
        windowMs: 60 * 1000, // 1 minute
        maxRequests: 10,
        statusCode: 429,
        message: 'Too many requests, please try again later.',
        headers: true
    },
    cache: {
        enabled: true,
        ttl: 100 * 1000 // 10 seconds
    },
    services: {
        service1: {
            path: '/service1',
            mockDelay: 100
        },
        service2: {
            path: '/service2',
            mockDelay: 150
        }
    }
};
