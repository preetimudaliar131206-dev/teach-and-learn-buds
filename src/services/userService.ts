import { api, API_ENDPOINTS } from '@/lib/api';
import type { User, UpdateLinkedInSettingsParams, LinkedInSettings } from '@/types/userTypes';

/**
 * Validates a LinkedIn profile URL
 * @param url - The LinkedIn URL to validate
 * @returns true if valid, false otherwise
 */
export function isValidLinkedInUrl(url: string | null | undefined): boolean {
    if (!url) return true; // null/empty is valid (optional field)

    const linkedInUrlPattern = /^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/;
    return linkedInUrlPattern.test(url);
}

/**
 * Service class for user-related operations using the backend API
 */
export class UserService {
    /**
     * Updates a user's LinkedIn profile settings
     * @param userId - The ID of the user to update
     * @param params - LinkedIn URL and visibility settings
     * @returns Updated LinkedIn settings or error
     */
    static async updateLinkedInSettings(
        userId: string,
        params: UpdateLinkedInSettingsParams
    ): Promise<{ data: LinkedInSettings | null; error: Error | null }> {
        try {
            // Validate LinkedIn URL if provided
            if (params.linkedinUrl !== undefined && params.linkedinUrl !== null) {
                if (!isValidLinkedInUrl(params.linkedinUrl)) {
                    return {
                        data: null,
                        error: new Error(
                            'Invalid LinkedIn URL. Expected format: https://linkedin.com/in/username'
                        ),
                    };
                }
            }

            // Validate visibility if provided
            if (params.linkedinVisibility) {
                const validVisibilities = ['public', 'connections', 'private'];
                if (!validVisibilities.includes(params.linkedinVisibility)) {
                    return {
                        data: null,
                        error: new Error(
                            'Invalid visibility. Must be one of: public, connections, private'
                        ),
                    };
                }
            }

            // Update the user's LinkedIn settings via backend API
            const response = await api.patch<{ linkedinSettings: LinkedInSettings }>(
                API_ENDPOINTS.USERS.LINKEDIN_SETTINGS,
                {
                    userId,
                    linkedinUrl: params.linkedinUrl,
                    linkedinVisibility: params.linkedinVisibility,
                }
            );

            return {
                data: response.linkedinSettings,
                error: null,
            };
        } catch (err) {
            return {
                data: null,
                error: err instanceof Error ? err : new Error('Unknown error occurred'),
            };
        }
    }

    /**
     * Gets a user's profile
     * @param userId - The ID of the user to fetch
     * @returns User profile data respecting visibility settings
     */
    static async getUserProfile(userId: string): Promise<{ data: User | null; error: Error | null }> {
        try {
            const response = await api.get<{ user: User }>(
                API_ENDPOINTS.USERS.GET_USER(userId)
            );

            return {
                data: response.user,
                error: null,
            };
        } catch (err) {
            return {
                data: null,
                error: err instanceof Error ? err : new Error('Unknown error occurred'),
            };
        }
    }

    /**
     * Gets the current user's profile
     * @returns Current user's profile data
     */
    static async getMyProfile(): Promise<{ data: User | null; error: Error | null }> {
        try {
            const response = await api.get<{ user: User }>(
                API_ENDPOINTS.USERS.PROFILE
            );

            return {
                data: response.user,
                error: null,
            };
        } catch (err) {
            return {
                data: null,
                error: err instanceof Error ? err : new Error('Unknown error occurred'),
            };
        }
    }

    /**
     * Updates the current user's profile
     * @param updates - Profile fields to update
     * @returns Updated user profile
     */
    static async updateProfile(updates: Partial<User>): Promise<{ data: User | null; error: Error | null }> {
        try {
            const response = await api.patch<{ user: User }>(
                API_ENDPOINTS.USERS.UPDATE_PROFILE,
                updates
            );

            return {
                data: response.user,
                error: null,
            };
        } catch (err) {
            return {
                data: null,
                error: err instanceof Error ? err : new Error('Unknown error occurred'),
            };
        }
    }

    /**
     * Gets the current user's LinkedIn settings
     * @returns Current user's LinkedIn settings
     */
    static async getMyLinkedInSettings(): Promise<{
        data: LinkedInSettings | null;
        error: Error | null;
    }> {
        try {
            const response = await api.get<{ linkedinSettings: LinkedInSettings }>(
                API_ENDPOINTS.USERS.LINKEDIN_SETTINGS
            );

            return {
                data: response.linkedinSettings,
                error: null,
            };
        } catch (err) {
            return {
                data: null,
                error: err instanceof Error ? err : new Error('Unknown error occurred'),
            };
        }
    }
}
