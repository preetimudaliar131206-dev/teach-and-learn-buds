import express from 'express';
import cors from 'cors';
import { google } from 'googleapis';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables from the root .env file (or .env.local if configured manually, but usually .env)
// Since we are running from potentially root or backend/, let's resolve path.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Navigate up to root to find .env if it's there
dotenv.config({ path: path.join(__dirname, '../.env') });

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize Google OAuth2 Client
const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
);

// Mock Database for Users
const users = [];

// Helper to generate a dummy JWT (basic base64 for now, or just a random string)
const generateToken = (user) => {
    return Buffer.from(JSON.stringify({ id: user.id, email: user.email })).toString('base64');
};

// Auth Endpoints
app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    // Simple mock login - accept any email/password if user exists, or just auto-create for dev
    // For "allow feck login" (fake login), we just return success.

    const user = {
        id: 'user_123',
        email: email || 'test@example.com',
        name: 'Test User',
        avatar: 'https://github.com/shadcn.png'
    };

    const token = generateToken(user);

    res.json({
        user,
        token,
        refreshToken: 'mock_refresh_token'
    });
});

app.post('/api/auth/register', (req, res) => {
    const { email, password, name } = req.body;

    const user = {
        id: `user_${Date.now()}`,
        email,
        name,
        avatar: 'https://github.com/shadcn.png'
    };

    const token = generateToken(user);

    res.json({
        user,
        token,
        refreshToken: 'mock_refresh_token'
    });
});

app.get('/api/auth/me', (req, res) => {
    // Just return a mock user if token is present
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    // In a real app, verify token. Here, just return the mock user.
    res.json({
        user: {
            id: 'user_123',
            email: 'test@example.com',
            name: 'Test User',
            avatar: 'https://github.com/shadcn.png'
        }
    });
});

app.post('/api/auth/logout', (req, res) => {
    res.json({ success: true });
});


// Calendar Event Endpoint
// Expects: title, description, startTime, endTime, and userGoogleAccessToken in body
app.post('/api/calendar/events', async (req, res) => {
    try {
        const { title, description, startTime, endTime, userGoogleAccessToken } = req.body;

        if (!userGoogleAccessToken) {
            return res.status(400).json({ error: 'Missing userGoogleAccessToken provided in request body' });
        }

        // Set credentials for this request
        oauth2Client.setCredentials({ access_token: userGoogleAccessToken });

        const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

        const event = {
            summary: title,
            description,
            start: { dateTime: startTime, timeZone: 'Asia/Kolkata' }, // Using user specific hardcoded timezone from snippet
            end: { dateTime: endTime, timeZone: 'Asia/Kolkata' }
        };

        const response = await calendar.events.insert({
            calendarId: 'primary',
            resource: event
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error adding calendar event:', error);
        res.status(500).json({ error: error.message || 'Failed to add calendar event' });
    }
});

// Basic health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(port, () => {
    console.log(`Backend server running on port ${port}`);
});
