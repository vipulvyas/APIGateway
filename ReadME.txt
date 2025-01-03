Problem Statement: High-Performance API Gateway with Rate Limiting and Caching
Overview
Build a high-performance API Gateway that routes HTTP requests to backend services, implements rate limiting to prevent abuse, and incorporates a caching layer to store responses for frequently accessed endpoints. The system should be designed for scalability, concurrency, and low latency.
Requirements
API Gateway Functionality:
Implement an API Gateway that listens for HTTP requests.
Route requests to appropriate backend services based on URL paths.
If a backend service is unavailable, return a 500 Internal Server Error.
Rate Limiting (Client-Specific):
Implement rate limiting on a per-client basis (e.g., 100 requests per minute).
If a client exceeds the limit, respond with a 429 Too Many Requests HTTP status.
Implement rate limiting using a sliding window or token bucket approach.
Caching:
Cache responses for frequently accessed endpoints for a specified duration (e.g., 10 seconds).
Serve cached responses immediately if valid; otherwise, forward the request to the backend, fetch the response, and cache it.
Concurrency:
Handle multiple HTTP requests concurrently without blocking.
Ensure that rate limiting and caching mechanisms work correctly under concurrent load.
Performance:
Minimize latency and maximize throughput.
Use appropriate synchronization mechanisms for thread safety where necessary.
Monitoring and Logging:
Implement logging of incoming requests, routed backend responses, rate limiting events, and cache hits/misses.
Provide metrics endpoints (e.g., /metrics) compatible with monitoring tools like Prometheus.
Specifications
The Gateway listens on various paths (e.g., /service1, /service2), each corresponding to a backend service.
Backend services return static JSON responses (simulated).
Rate limits are configurable per client, identified by IP address or an API key.
Use in-memory storage for rate limits and caching.
Implement concurrent request handling for better scalability.
Constraints
Use an in-memory store for caching and rate limits.
Assume clients are uniquely identified by their IP address or an API key.
Assume backend services return mock static data.
Ensure the system is scalable and can handle concurrent requests.
The code should be extensible: easily change rate limiting strategies or add new caching policies with minimal modification to the core logic.
Additional Requirements
Code should be modular, easy to maintain, and extendable.
Implement unit tests for key components (rate limiting, caching).
Ensure flexibility to add or modify rate limiting and caching policies without major code changes.
Allow configuration of rate limits and cache expiry times.
Example Scenario
Client IP: 192.168.0.1 sends 5 requests to /service1 within a minute (rate limit = 10 requests per minute).
The first request is forwarded to the backend and cached for 10 seconds.
The next 4 requests are served from the cache.
The 11th request exceeds the rate limit and receives a 429 Too Many Requests status.
Evaluation Criteria
Functionality: Does the API Gateway route requests correctly, enforce rate limits, and handle caching?
Concurrency: Does the system handle concurrent requests efficiently?
Code Structure: Is the code modular, clean, and easy to maintain?
Extensibility: How easy is it to extend the system (e.g., add new rate limiting strategies or caching policies)?
Testing: Are unit tests included for key parts of the system?

