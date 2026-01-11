# Frontend API Configuration Update

## Overview
The frontend has been updated to communicate with the backend API at `http://localhost:5000/api`.

## Changes Made

### 1. New API Configuration (`src/lib/api.ts`)
- Created centralized API configuration with base URL
- Implemented generic fetch wrapper with error handling
- Added auth token management (localStorage-based)
- Defined all API endpoints in a structured format

### 2. Auth Service (`src/services/authService.ts`)
- New service for backend authentication
- Supports login, register, logout operations
- Token-based authentication with JWT
- Methods for password reset and email verification

### 3. Updated User Service (`src/services/userService.ts`)
- Migrated from Supabase to backend API
- All user operations now use HTTP requests to backend
- Maintains same interface for compatibility

### 4. Updated Auth Context (`src/contexts/AuthContext.tsx`)
- Removed Supabase session management
- Now uses AuthService for authentication state
- Added `refreshUser()` method for manual user data refresh

### 5. Updated Auth Page (`src/pages/Auth.tsx`)
- Login and registration now use backend API
- OAuth temporarily disabled (needs backend configuration)
- Improved error handling and user feedback

## Environment Variables

Add to your `.env.local` file:

```bash
VITE_API_BASE_URL=http://localhost:5000/api
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user
- `POST /api/auth/refresh` - Refresh auth token

### Users
- `GET /api/users/profile` - Get current user profile
- `PATCH /api/users/profile` - Update user profile
- `GET /api/users/:userId` - Get specific user profile
- `GET /api/users/linkedin-settings` - Get LinkedIn settings
- `PATCH /api/users/linkedin-settings` - Update LinkedIn settings

## Token Management

The frontend stores the JWT token in `localStorage` under the key `auth_token`. The token is automatically included in all API requests via the `Authorization: Bearer <token>` header.

## Error Handling

All API calls return a consistent error format:
```typescript
{
  status: number,
  message: string,
  data?: any
}
```

## Migration Notes

### From Supabase to Backend API

**Before:**
```typescript
const { data, error } = await supabase.auth.signInWithPassword({
  email,
  password,
});
```

**After:**
```typescript
const response = await AuthService.login({
  email,
  password,
});
```

### Auth Context Usage

The `useAuth` hook now provides:
- `user` - Current user object (or null)
- `loading` - Loading state
- `signOut()` - Logout function
- `refreshUser()` - Refresh user data

**Note:** The `session` property has been removed as it's no longer needed with JWT-based auth.

## Next Steps

1. Ensure backend is running at `http://localhost:5000`
2. Update `.env.local` with the API base URL
3. Test authentication flow (login/register)
4. Implement OAuth if needed (requires backend support)
5. Update any remaining Supabase references in other components

## Compatibility

The changes maintain backward compatibility with existing component interfaces. Components using `useAuth` will continue to work with minimal changes.

## Testing

To test the integration:

1. Start the backend server:
   ```bash
   cd backend
   npm start
   ```

2. Start the frontend:
   ```bash
   npm run dev
   ```

3. Try logging in or registering a new account
4. Check browser DevTools Network tab to verify API calls to `http://localhost:5000/api`
