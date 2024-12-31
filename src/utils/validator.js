const validateRequest = (req) => {
    // Validate required headers
    const requiredHeaders = ['content-type'];
    const missingHeaders = requiredHeaders.filter(
        header => !req.headers[header]
    );

    if (missingHeaders.length > 0) {
        return {
            valid: false,
            error: `Missing required headers: ${missingHeaders.join(', ')}`
        };
    }

    return { valid: true };
};

const validateApiKey = (apiKey) => {
    // Simple API key validation
    return apiKey && apiKey.length >= 32;
};

const sanitizeInput = (input) => {
    // Basic input sanitization
    if (typeof input === 'string') {
        return input.trim().replace(/[<>]/g, '');
    }
    return input;
};

module.exports = {
    validateRequest,
    validateApiKey,
    sanitizeInput
};
