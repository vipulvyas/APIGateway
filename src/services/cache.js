class CacheService {
    constructor() {
        this.cache = new Map();
        this.metrics = {
            hits: 0,
            misses: 0
        };
    }

    set(key, value, ttl) {
        const expiresAt = Date.now() + ttl;
        this.cache.set(key, {
            value,
            expiresAt
        });
    }

    get(key) {
        const data = this.cache.get(key);
        if (!data) {
            this.metrics.misses++;
            return null;
        }

        if (Date.now() > data.expiresAt) {
            this.cache.delete(key);
            this.metrics.misses++;
            return null;
        }

        this.metrics.hits++;
        return data.value;
    }

    clearCache() {
        this.cache.clear();
    }

    getMetrics() {
        return this.metrics;
    }
}

module.exports = new CacheService();
