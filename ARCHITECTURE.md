# Frontend Architecture - API Integration

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND (React)                         │
│                     http://localhost:5173                        │
└─────────────────────────────────────────────────────────────────┘
                                │
                                │
                    ┌───────────┴───────────┐
                    │                       │
                    ▼                       ▼
        ┌──────────────────┐    ┌──────────────────┐
        │   Components     │    │   Pages          │
        │   - Navigation   │    │   - Auth         │
        │   - TrustBadge   │    │   - Dashboard    │
        │   - SkillTag     │    │   - Profile      │
        └────────┬─────────┘    └────────┬─────────┘
                 │                       │
                 └───────────┬───────────┘
                             │
                             ▼
                ┌────────────────────────┐
                │   Contexts             │
                │   - AuthContext        │
                │     • user             │
                │     • loading          │
                │     • signOut()        │
                │     • refreshUser()    │
                └────────┬───────────────┘
                         │
                         ▼
        ┌────────────────────────────────────┐
        │   Services                         │
        │   - AuthService                    │
        │     • login()                      │
        │     • register()                   │
        │     • logout()                     │
        │     • getCurrentUser()             │
        │   - UserService                    │
        │     • getUserProfile()             │
        │     • updateProfile()              │
        │     • updateLinkedInSettings()     │
        └────────┬───────────────────────────┘
                 │
                 ▼
        ┌────────────────────────────────────┐
        │   API Layer (src/lib/api.ts)       │
        │   - API_BASE_URL                   │
        │   - API_ENDPOINTS                  │
        │   - apiRequest()                   │
        │   - Token Management               │
        │     • getAuthToken()               │
        │     • setAuthToken()               │
        │     • removeAuthToken()            │
        └────────┬───────────────────────────┘
                 │
                 │ HTTP Requests (fetch)
                 │ Authorization: Bearer <token>
                 │
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                      BACKEND API (Express)                       │
│                    http://localhost:5000/api                     │
│                                                                  │
│   Routes:                                                        │
│   - POST   /auth/login                                          │
│   - POST   /auth/register                                       │
│   - POST   /auth/logout                                         │
│   - GET    /auth/me                                             │
│   - GET    /users/profile                                       │
│   - PATCH  /users/profile                                       │
│   - GET    /users/:userId                                       │
│   - GET    /users/linkedin-settings                             │
│   - PATCH  /users/linkedin-settings                             │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
                        ┌───────────────┐
                        │   Database    │
                        │  (PostgreSQL) │
                        └───────────────┘
```

## Data Flow

### 1. User Login Flow
```
User enters credentials
        │
        ▼
Auth.tsx (Login form)
        │
        ▼
AuthService.login()
        │
        ▼
api.post('/auth/login', credentials)
        │
        ▼
Backend validates & returns JWT
        │
        ▼
Token stored in localStorage
        │
        ▼
AuthContext.refreshUser()
        │
        ▼
User state updated
        │
        ▼
Navigate to /profile
```

### 2. Protected Page Access Flow
```
User visits /profile
        │
        ▼
Profile.tsx renders
        │
        ▼
useAuth() hook called
        │
        ▼
AuthContext checks localStorage for token
        │
        ├─ No token → user = null
        │
        └─ Has token → AuthService.getCurrentUser()
                │
                ▼
        api.get('/auth/me') with token
                │
                ▼
        Backend validates token & returns user
                │
                ▼
        User state updated
                │
                ▼
        Profile page displays user data
```

### 3. API Request Flow
```
Component needs data
        │
        ▼
UserService.getUserProfile(userId)
        │
        ▼
api.get('/users/:userId')
        │
        ├─ Get token from localStorage
        │
        ├─ Add Authorization header
        │
        └─ Send fetch request
                │
                ▼
        Backend receives request
                │
                ├─ Validates JWT token
                │
                ├─ Checks permissions
                │
                └─ Returns data
                        │
                        ▼
                Component receives data
                        │
                        ▼
                State updated & UI renders
```

## Token Management

```
┌─────────────────────────────────────────┐
│         localStorage                     │
│                                          │
│   Key: 'auth_token'                     │
│   Value: 'eyJhbGciOiJIUzI1NiIsInR5...' │
│                                          │
│   Set on: Login/Register                │
│   Used by: All API requests             │
│   Cleared on: Logout                    │
└─────────────────────────────────────────┘
```

## Component Hierarchy

```
App.tsx
  │
  ├─ AuthProvider (Context)
  │   │
  │   └─ Provides: user, loading, signOut, refreshUser
  │
  └─ Routes
      │
      ├─ Auth.tsx
      │   └─ Uses: AuthService.login(), AuthService.register()
      │
      ├─ Dashboard.tsx
      │   ├─ Uses: useAuth()
      │   └─ Uses: UserService.getUserProfile()
      │
      └─ Profile.tsx
          ├─ Uses: useAuth()
          └─ Uses: UserService.getUserProfile()
```

## Key Differences from Supabase

### Before (Supabase)
```typescript
// Direct Supabase client usage
const { data, error } = await supabase.auth.signInWithPassword({
  email,
  password
});

// Session-based auth
const { data: { session } } = await supabase.auth.getSession();
```

### After (Backend API)
```typescript
// Service layer abstraction
const response = await AuthService.login({
  email,
  password
});

// Token-based auth
const user = await AuthService.getCurrentUser();
```

## Security Considerations

1. **JWT Tokens**: Stored in localStorage (consider httpOnly cookies for production)
2. **HTTPS**: Use in production to encrypt token transmission
3. **Token Expiry**: Implement refresh token mechanism
4. **CORS**: Backend must allow frontend origin
5. **XSS Protection**: Sanitize user inputs
6. **CSRF Protection**: Consider CSRF tokens for state-changing operations
