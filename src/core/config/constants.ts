export const API_ENDPOINTS = {
    APPLY: "/api/apply",
};

// Local Storage Keys
export const STORAGE_KEYS = {
    ACCESS_TOKEN: 'access_token',
    REFRESH_TOKEN: 'refresh_token',
} as const;

// Application Routes
export const ROUTES = {
    PUBLIC: {
        HOME: '/',
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
        FORGOT_PASSWORD: '/auth/forgot-password',
        RESET_PASSWORD: '/auth/reset-password',
    },
} as const;

// Form Validation Constants
export const VALIDATION = {
    PASSWORD: {
        MIN_LENGTH: 8,
        MAX_LENGTH: 32,
        REGEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        MESSAGE: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    },
    EMAIL: {
        REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        MESSAGE: 'Please enter a valid email address',
    },
} as const;


// Export all constants as a single object if needed
export const CONSTANTS = {
    STORAGE_KEYS,
    ROUTES,
    VALIDATION,
} as const;

export type ApiEndpoints = typeof API_ENDPOINTS;
export type Routes = typeof ROUTES;