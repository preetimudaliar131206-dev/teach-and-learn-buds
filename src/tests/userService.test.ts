import { describe, it, expect } from 'vitest';

/**
 * LinkedIn URL validation function (copied from userService for testing)
 * We test the validation logic directly without needing Supabase setup
 */
function isValidLinkedInUrl(url: string | null | undefined): boolean {
    if (!url) return true; // null/empty is valid (optional field)

    const linkedInUrlPattern = /^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/;
    return linkedInUrlPattern.test(url);
}

describe('LinkedIn URL Validation', () => {
    describe('isValidLinkedInUrl', () => {
        it('should accept valid LinkedIn URLs with https and www', () => {
            expect(isValidLinkedInUrl('https://www.linkedin.com/in/johndoe')).toBe(true);
            expect(isValidLinkedInUrl('https://www.linkedin.com/in/john-doe')).toBe(true);
            expect(isValidLinkedInUrl('https://www.linkedin.com/in/john_doe')).toBe(true);
            expect(isValidLinkedInUrl('https://www.linkedin.com/in/johndoe123')).toBe(true);
        });

        it('should accept valid LinkedIn URLs with https without www', () => {
            expect(isValidLinkedInUrl('https://linkedin.com/in/johndoe')).toBe(true);
            expect(isValidLinkedInUrl('https://linkedin.com/in/jane-smith')).toBe(true);
        });

        it('should accept valid LinkedIn URLs with http', () => {
            expect(isValidLinkedInUrl('http://www.linkedin.com/in/johndoe')).toBe(true);
            expect(isValidLinkedInUrl('http://linkedin.com/in/johndoe')).toBe(true);
        });

        it('should accept LinkedIn URLs with trailing slash', () => {
            expect(isValidLinkedInUrl('https://www.linkedin.com/in/johndoe/')).toBe(true);
            expect(isValidLinkedInUrl('https://linkedin.com/in/jane-doe/')).toBe(true);
        });

        it('should accept null and undefined as valid (optional field)', () => {
            expect(isValidLinkedInUrl(null)).toBe(true);
            expect(isValidLinkedInUrl(undefined)).toBe(true);
            expect(isValidLinkedInUrl('')).toBe(true);
        });

        it('should reject invalid LinkedIn URLs', () => {
            // Wrong domain
            expect(isValidLinkedInUrl('https://www.facebook.com/johndoe')).toBe(false);
            expect(isValidLinkedInUrl('https://twitter.com/johndoe')).toBe(false);

            // Missing /in/ path
            expect(isValidLinkedInUrl('https://www.linkedin.com/johndoe')).toBe(false);
            expect(isValidLinkedInUrl('https://www.linkedin.com/company/example')).toBe(false);

            // Invalid characters in username
            expect(isValidLinkedInUrl('https://www.linkedin.com/in/john doe')).toBe(false);
            expect(isValidLinkedInUrl('https://www.linkedin.com/in/john@doe')).toBe(false);
            expect(isValidLinkedInUrl('https://www.linkedin.com/in/john.doe')).toBe(false);

            // No protocol
            expect(isValidLinkedInUrl('www.linkedin.com/in/johndoe')).toBe(false);
            expect(isValidLinkedInUrl('linkedin.com/in/johndoe')).toBe(false);

            // Empty username
            expect(isValidLinkedInUrl('https://www.linkedin.com/in/')).toBe(false);

            // Random text
            expect(isValidLinkedInUrl('not a url')).toBe(false);
            expect(isValidLinkedInUrl('johndoe')).toBe(false);
        });
    });
});
