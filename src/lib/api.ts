/**
 * API Configuration for SkillSwap Backend
 * Base URL: http://localhost:5000/api
 */

// API Base URL - can be overridden by environment variable
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

/**
 * API Endpoints
 */
export const API_ENDPOINTS = {
    // Auth endpoints
    AUTH: {
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
        LOGOUT: '/auth/logout',
        REFRESH: '/auth/refresh',
        ME: '/auth/me',
        VERIFY_EMAIL: '/auth/verify-email',
        FORGOT_PASSWORD: '/auth/forgot-password',
        RESET_PASSWORD: '/auth/reset-password',
    },
    // User endpoints
    USERS: {
        PROFILE: '/users/profile',
        UPDATE_PROFILE: '/users/profile',
        LINKEDIN_SETTINGS: '/users/linkedin-settings',
        GET_USER: (userId: string) => `/users/${userId}`,
    },
    // Skills endpoints
    SKILLS: {
        LIST: '/skills',
        OFFERED: '/skills/offered',
        WANTED: '/skills/wanted',
    },
    // Sessions endpoints
    SESSIONS: {
        LIST: '/sessions',
        CREATE: '/sessions',
        GET: (sessionId: string) => `/sessions/${sessionId}`,
        UPDATE: (sessionId: string) => `/sessions/${sessionId}`,
        CANCEL: (sessionId: string) => `/sessions/${sessionId}/cancel`,
    },
    // Matches endpoints
    MATCHES: {
        LIST: '/matches',
        SUGGEST: '/matches/suggest',
    },
} as const;

/**
 * HTTP Methods
 */
export enum HttpMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
}

/**
 * API Error class
 */
export class ApiError extends Error {
    constructor(
        public status: number,
        public message: string,
        public data?: any
    ) {
        super(message);
        this.name = 'ApiError';
    }
}

/**
 * Get auth token from localStorage
 */
function getAuthToken(): string | null {
    return localStorage.getItem('auth_token');
}

/**
 * Set auth token in localStorage
 */
export function setAuthToken(token: string): void {
    localStorage.setItem('auth_token', token);
}

/**
 * Remove auth token from localStorage
 */
export function removeAuthToken(): void {
    localStorage.removeItem('auth_token');
}

/**
 * Generic API request function
 */
export async function apiRequest<T = any>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = getAuthToken();

    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    // Add authorization header if token exists
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    try {
        const response = await fetch(url, {
            ...options,
            headers,
        });

        // Handle non-JSON responses
        const contentType = response.headers.get('content-type');
        const isJson = contentType?.includes('application/json');

        if (!response.ok) {
            const errorData = isJson ? await response.json() : { message: response.statusText };
            throw new ApiError(
                response.status,
                errorData.message || 'An error occurred',
                errorData
            );
        }

        // Return parsed JSON or null for empty responses
        return isJson ? await response.json() : null;
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }

        // Network or other errors
        throw new ApiError(
            0,
            error instanceof Error ? error.message : 'Network error occurred'
        );
    }
}

/**
 * Convenience methods for different HTTP methods
 */
export const api = {
    get: <T = any>(endpoint: string, options?: RequestInit) =>
        apiRequest<T>(endpoint, { ...options, method: HttpMethod.GET }),

    post: <T = any>(endpoint: string, data?: any, options?: RequestInit) =>
        apiRequest<T>(endpoint, {
            ...options,
            method: HttpMethod.POST,
            body: data ? JSON.stringify(data) : undefined,
        }),

    put: <T = any>(endpoint: string, data?: any, options?: RequestInit) =>
        apiRequest<T>(endpoint, {
            ...options,
            method: HttpMethod.PUT,
            body: data ? JSON.stringify(data) : undefined,
        }),

    patch: <T = any>(endpoint: string, data?: any, options?: RequestInit) =>
        apiRequest<T>(endpoint, {
            ...options,
            method: HttpMethod.PATCH,
            body: data ? JSON.stringify(data) : undefined,
        }),

    delete: <T = any>(endpoint: string, options?: RequestInit) =>
        apiRequest<T>(endpoint, { ...options, method: HttpMethod.DELETE }),
};
