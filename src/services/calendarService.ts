import { api } from '@/lib/api';

export interface CalendarEvent {
    title: string;
    description: string;
    startTime: string; // ISO string 2023-10-27T10:00:00Z
    endTime: string;   // ISO string 2023-10-27T11:00:00Z
}

export class CalendarService {
    /**
     * Add an event to the user's primary Google Calendar
     */
    static async addEvent(event: CalendarEvent): Promise<any> {
        const userGoogleAccessToken = localStorage.getItem('google_access_token');

        if (!userGoogleAccessToken) {
            throw new Error('Google Calendar access not authorized. Please login with Google again.');
        }

        try {
            const response = await api.post('/calendar/events', {
                ...event,
                userGoogleAccessToken
            });
            return response;
        } catch (error) {
            console.error('Error adding calendar event:', error);
            throw error;
        }
    }
}
