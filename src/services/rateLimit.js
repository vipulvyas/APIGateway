class RateLimitService {
    constructor() {
        this.clients = new Map();
    }

    rateLimitStrategy(clientId, limit, windowMs, startegy) {
        // Fectory pattern
        if (startegy === 'slidingWindow') {
            return this.slidingWindowRateLimiter(clientId, limit, windowMs);
        } else {
            return this.tokenBucketRateLimiter(clientId, limit, windowMs)
        }
    }

    tokenBucketRateLimiter(clientId, limit, windowMs) {

    }

    /**
     * The function `slidingWindowRateLimiter` checks if a client has exceeded a request limit within a specified
     * time window. Sliding window
     * @param clientId - The `clientId` parameter is a unique identifier for a client making requests.
     * It is used to track the requests made by a specific client.
     * @param limit - The `limit` parameter in the `slidingWindowRateLimiter` function represents the maximum
     * number of requests allowed within a specified time window (`windowMs`). If the number of
     * requests made by a client within the time window exceeds this limit, the function will return
     * `true` indicating that the client is rate-l
     * @param windowMs - The `windowMs` parameter represents the time window in milliseconds within
     * which the rate limiting is applied. Requests made within this time window are counted towards
     * the limit specified.
     * @returns The function `slidingWindowRateLimiter` returns a boolean value - `true` if the client has
     * exceeded the request limit within the specified window, and `false` if the client is within the
     * allowed limit and a new request can be added.
     */
    slidingWindowRateLimiter(clientId, limit, windowMs) {
        const now = Date.now();
        const clientData = this.clients.get(clientId) || { requests: [], windowStart: now };

        // Remove expired requests
        clientData.requests = clientData.requests.filter(
            timestamp => timestamp > now - windowMs
        );

        // Check if limit exceeded
        if (clientData.requests.length >= limit) {
            return true;
        }

        // Add new request
        clientData.requests.push(now);
        this.clients.set(clientId, clientData);
        return false;
    }

    /**
     * The function `getRemainingRequests` calculates the remaining number of requests a client can
     * make within a specified time window.
     * @param clientId - A unique identifier for the client making the requests.
     * @param limit - The `limit` parameter represents the maximum number of requests allowed for a
     * specific client within a given time window.
     * @param windowMs - The `windowMs` parameter represents the time window in milliseconds within
     * which the requests are considered for rate limiting. Any requests made within this time window
     * will be counted towards the limit.
     * @returns the remaining number of requests that the client with the given `clientId` can make
     * within the specified `windowMs` time window, based on the `limit` provided.
     */
    getRemainingRequests(clientId, limit, windowMs) {
        const clientData = this.clients.get(clientId);
        if (!clientData) return limit;

        const now = Date.now();
        const validRequests = clientData.requests.filter(
            timestamp => timestamp > now - windowMs
        );
        return Math.max(0, limit - validRequests.length);
    }
}

module.exports = new RateLimitService();
