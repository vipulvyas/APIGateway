class Metrics {
    constructor() {
        this.metrics = {
            requests: {
                total: 0,
                success: 0,
                failed: 0
            },
            rateLimiting: {
                total: 0,
                blocked: 0
            },
            cache: {
                hits: 0,
                misses: 0
            },
            latency: {
                sum: 0,
                count: 0
            },
            serviceHealth: new Map()
        };
    }

    incrementRequests(success = true) {
        this.metrics.requests.total++;
        if (success) {
            this.metrics.requests.success++;
        } else {
            this.metrics.requests.failed++;
        }
    }

    recordRateLimiting(blocked = false) {
        this.metrics.rateLimiting.total++;
        if (blocked) {
            this.metrics.rateLimiting.blocked++;
        }
    }

    recordCacheHit(hit = true) {
        if (hit) {
            this.metrics.cache.hits++;
        } else {
            this.metrics.cache.misses++;
        }
    }

    recordLatency(ms) {
        this.metrics.latency.sum += ms;
        this.metrics.latency.count++;
    }

    updateServiceHealth(serviceName, healthy) {
        this.metrics.serviceHealth.set(serviceName, {
            healthy,
            lastChecked: Date.now()
        });
    }

    getMetrics() {
        return {
            requests: this.metrics.requests,
            rateLimiting: this.metrics.rateLimiting,
            cache: {
                ...this.metrics.cache,
                hitRate: this.metrics.cache.hits / 
                    (this.metrics.cache.hits + this.metrics.cache.misses || 1)
            },
            latency: {
                ...this.metrics.latency,
                average: this.metrics.latency.sum / 
                    (this.metrics.latency.count || 1)
            },
            serviceHealth: Object.fromEntries(this.metrics.serviceHealth)
        };
    }

    reset() {
        this.metrics = {
            requests: {
                total: 0,
                success: 0,
                failed: 0
            },
            rateLimiting: {
                total: 0,
                blocked: 0
            },
            cache: {
                hits: 0,
                misses: 0
            },
            latency: {
                sum: 0,
                count: 0
            },
            serviceHealth: new Map()
        };
    }
}

module.exports = new Metrics();
