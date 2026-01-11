import { api, API_ENDPOINTS, setAuthToken, removeAuthToken } from '@/lib/api';

/**
 * Auth Service - Handles authentication with the backend API
 */

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterCredentials {
    email: string;
    password: string;
    name: string;
}

export interface AuthResponse {
    user: {
        id: string;
        email: string;
        name: string;
        avatar?: string;
    };
    token: string;
    refreshToken?: string;
}

export interface User {
    id: string;
    email: string;
    name: string;
    avatar?: string;
    location?: string;
    bio?: string;
    skillsOffered?: string[];
    skillsWanted?: string[];
    credits?: number;
    rating?: number;
    sessionsCompleted?: number;
    linkedinUrl?: string;
    linkedinVisibility?: 'public' | 'connections' | 'private';
}

export class AuthService {
    /**
     * Login with email and password
     */
    static async login(credentials: LoginCredentials): Promise<AuthResponse> {
        try {
            const response = await api.post<AuthResponse>(
                API_ENDPOINTS.AUTH.LOGIN,
                credentials
            );

            // Store the auth token
            if (response.token) {
                setAuthToken(response.token);
            }

            return response;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }

    /**
     * Register a new user
     */
    static async register(credentials: RegisterCredentials): Promise<AuthResponse> {
        try {
            const response = await api.post<AuthResponse>(
                API_ENDPOINTS.AUTH.REGISTER,
                credentials
            );

            // Store the auth token
            if (response.token) {
                setAuthToken(response.token);
            }

            return response;
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    }

    /**
     * Logout the current user
     */
    static async logout(): Promise<void> {
        try {
            await api.post(API_ENDPOINTS.AUTH.LOGOUT);
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            // Always remove the token, even if the API call fails
            removeAuthToken();
        }
    }

    /**
     * Get the current authenticated user
     */
    static async getCurrentUser(): Promise<User> {
        try {
            const response = await api.get<{ user: User }>(API_ENDPOINTS.AUTH.ME);
            return response.user;
        } catch (error) {
            console.error('Get current user error:', error);
            throw error;
        }
    }

    /**
     * Refresh the auth token
     */
    static async refreshToken(refreshToken: string): Promise<{ token: string }> {
        try {
            const response = await api.post<{ token: string }>(
                API_ENDPOINTS.AUTH.REFRESH,
                { refreshToken }
            );

            // Update the stored token
            if (response.token) {
                setAuthToken(response.token);
            }

            return response;
        } catch (error) {
            console.error('Token refresh error:', error);
            throw error;
        }
    }

    /**
     * Verify email with token
     */
    static async verifyEmail(token: string): Promise<void> {
        try {
            await api.post(API_ENDPOINTS.AUTH.VERIFY_EMAIL, { token });
        } catch (error) {
            console.error('Email verification error:', error);
            throw error;
        }
    }

    /**
     * Request password reset
     */
    static async forgotPassword(email: string): Promise<void> {
        try {
            await api.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
        } catch (error) {
            console.error('Forgot password error:', error);
            throw error;
        }
    }

    /**
     * Reset password with token
     */
    static async resetPassword(token: string, newPassword: string): Promise<void> {
        try {
            await api.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, {
                token,
                password: newPassword,
            });
        } catch (error) {
            console.error('Reset password error:', error);
            throw error;
        }
    }

    /**
     * Check if user is authenticated (has a valid token)
     */
    static isAuthenticated(): boolean {
        return localStorage.getItem('auth_token') !== null;
    }
}
