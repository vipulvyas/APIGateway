# High-Performance API Gateway with Rate Limiting and Caching

## Overview
This project implements a high-performance API Gateway designed to handle HTTP requests efficiently, enforce rate limits, and incorporate a caching layer for frequently accessed endpoints. The system prioritizes scalability, concurrency, and low latency.

## Features

### API Gateway Functionality
- Listens for HTTP requests and routes them to appropriate backend services based on URL paths.
- Returns a 500 Internal Server Error if a backend service is unavailable.

### Rate Limiting (Client-Specific)
- Enforces rate limits per client (e.g., 100 requests per minute).
- Returns a 429 Too Many Requests HTTP status when the rate limit is exceeded.
- Implements rate limiting using a sliding window or token bucket approach.

### Caching
- Caches responses for frequently accessed endpoints for a configurable duration (e.g., 10 seconds).
- Serves cached responses immediately if valid; otherwise, forwards the request to the backend, fetches the response, and caches it.

### Concurrency
- Handles multiple HTTP requests concurrently without blocking.
- Ensures correct functionality of rate limiting and caching mechanisms under concurrent load.

### Performance
- Minimizes latency and maximizes throughput.
- Ensures thread safety using appropriate synchronization mechanisms.

### Monitoring and Logging
- Logs incoming requests, routed backend responses, rate limiting events, and cache hits/misses.
- Provides metrics endpoints (e.g., `/metrics`) compatible with monitoring tools like Prometheus.

## Specifications
- The Gateway listens on various paths (e.g., `/service1`, `/service2`), each corresponding to a backend service.
- Backend services return static JSON responses (simulated).
- Rate limits are configurable per client, identified by IP address or an API key.
- Uses in-memory storage for rate limits and caching.
- Implements concurrent request handling for better scalability.

## Constraints
- Uses an in-memory store for caching and rate limits.
- Assumes clients are uniquely identified by their IP address or an API key.
- Assumes backend services return mock static data.
- Ensures the system is scalable and handles concurrent requests.

## Design Principles
- **Modular Code**: Code is structured to be easy to maintain and extend.
- **Extensibility**: New rate limiting strategies or caching policies can be added with minimal changes to the core logic.
- **Configuration**: Rate limits and cache expiry times are configurable.

## Example Scenario
1. A client with IP `192.168.0.1` sends 5 requests to `/service1` within a minute (rate limit = 10 requests per minute).
   - The first request is forwarded to the backend and cached for 10 seconds.
   - The next 4 requests are served from the cache.
   - The 11th request exceeds the rate limit and receives a 429 Too Many Requests status.

## Additional Requirements
- Include unit tests to ensure key functionalities.
- Provide flexibility to add or modify rate limiting and caching policies.
- Allow configuration of rate limits and cache expiry times.

## Installation
1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the project:
   ```bash
   npm start
   ```

3. Test the project:
   ```bash
   npm test
