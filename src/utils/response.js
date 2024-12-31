const successResponse = (res, statusCode, message, data) => {
    return res.status(statusCode).json({
        success: true,
        message,
        data
    });
};

const errorResponse = (res, statusCode, message) => {
    return res.status(statusCode).json({
        success: false,
        message
    });
};

const serviceUnavailable = (res) => {
    return errorResponse(res, 503, 'Service Temporarily Unavailable');
};

const tooManyRequests = (res, retryAfter) => {
    res.setHeader('Retry-After', retryAfter);
    return errorResponse(res, 429, 'Too Many Requests');
};

module.exports = {
    successResponse,
    errorResponse,
    serviceUnavailable,
    tooManyRequests
};
