const {
    serviceUnavailable
} = require("../utils/response");

class MockBackendService {
    async handleRequest(service, req) {
        // Simulate backend processing delay
        await new Promise(resolve => 
            setTimeout(resolve, service.mockDelay)
        );

        // Simulate random backend failures (5% chance)
        if (Math.random() < 0.05) {
            return serviceUnavailable();
        }

        return {
            status: 200,
            data: {
                service: service.path,
                timestamp: Date.now(),
                message: `Response from ${service.path}`
            }
        };
    }
}

module.exports = new MockBackendService();
