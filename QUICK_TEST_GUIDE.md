# Quick Test Guide - LinkedIn Profile Backend

## Test Credentials
- **Email**: nitishvermar565658@gmail.com
- **Password**: Nitish@123

---

## Step-by-Step Testing

### 1. Sign Up / Login

Open your browser console on `http://localhost:5173` and run:

```javascript
import { supabase } from './src/lib/supabase';

// Sign up (if first time)
const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
  email: 'nitishvermar565658@gmail.com',
  password: 'Nitish@123',
});

console.log('Sign up result:', signUpData, signUpError);

// OR Login (if already signed up)
const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
  email: 'nitishvermar565658@gmail.com',
  password: 'Nitish@123',
});

console.log('Login result:', loginData, loginError);
```

### 2. Get Your User ID

```javascript
const { data: { user } } = await supabase.auth.getUser();
console.log('Your User ID:', user?.id);
console.log('Your Email:', user?.email);
```

**Save your User ID** - you'll need it for testing!

---

## Test LinkedIn Profile Features

### Test 1: Update LinkedIn URL with Public Visibility

```javascript
import { UserService } from './src/services/userService';

// Get your user ID first
const { data: { user } } = await supabase.auth.getUser();
const userId = user?.id;

// Update LinkedIn settings
const result = await UserService.updateLinkedInSettings(userId, {
  linkedinUrl: 'https://linkedin.com/in/nitishverma',
  linkedinVisibility: 'public'
});

console.log('✅ Update Result:', result);
// Expected: { data: { linkedinUrl: '...', linkedinVisibility: 'public' }, error: null }
```

### Test 2: Verify Data in Supabase

Go to Supabase Dashboard → Table Editor → users table
- Find your user (search by email)
- Check `linkedin_url` = 'https://linkedin.com/in/nitishverma'
- Check `linkedin_visibility` = 'public'

### Test 3: Update to Private Visibility

```javascript
const result = await UserService.updateLinkedInSettings(userId, {
  linkedinVisibility: 'private'
});

console.log('✅ Visibility changed to private:', result);
```

### Test 4: Try Invalid LinkedIn URL (Should Fail)

```javascript
const result = await UserService.updateLinkedInSettings(userId, {
  linkedinUrl: 'https://facebook.com/invalid'
});

console.log('❌ Should fail:', result);
// Expected: error message about invalid LinkedIn URL
```

### Test 5: Get Your Profile

```javascript
const result = await UserService.getUserProfile(userId);

console.log('✅ My Profile:', result.data);
// Should show your LinkedIn URL (you can always see your own)
```

### Test 6: Get My LinkedIn Settings

```javascript
const result = await UserService.getMyLinkedInSettings();

console.log('✅ My LinkedIn Settings:', result.data);
// Expected: { linkedinUrl: '...', linkedinVisibility: '...' }
```

### Test 7: Clear LinkedIn URL

```javascript
const result = await UserService.updateLinkedInSettings(userId, {
  linkedinUrl: null
});

console.log('✅ LinkedIn URL cleared:', result);
```

---

## Test Authorization (Security)

### Test 8: Try to Update Another User's Profile (Should Fail)

```javascript
// Use a different/fake user ID
const fakeUserId = '00000000-0000-0000-0000-000000000000';

const result = await UserService.updateLinkedInSettings(fakeUserId, {
  linkedinUrl: 'https://linkedin.com/in/hacker'
});

console.log('❌ Should be unauthorized:', result);
// Expected: error about unauthorized access
```

---

## Quick One-Line Tests

Copy-paste these for quick testing:

```javascript
// Get current user
await supabase.auth.getUser().then(r => console.log('User:', r.data.user?.email, r.data.user?.id));

// Update LinkedIn
await UserService.updateLinkedInSettings((await supabase.auth.getUser()).data.user.id, { linkedinUrl: 'https://linkedin.com/in/nitishverma', linkedinVisibility: 'public' }).then(r => console.log('Updated:', r));

// Get my settings
await UserService.getMyLinkedInSettings().then(r => console.log('Settings:', r.data));

// Test invalid URL
await UserService.updateLinkedInSettings((await supabase.auth.getUser()).data.user.id, { linkedinUrl: 'https://facebook.com/test' }).then(r => console.log('Invalid URL:', r.error));
```

---

## Validation Tests

### Valid LinkedIn URLs (Should Work):
```javascript
const validUrls = [
  'https://www.linkedin.com/in/nitishverma',
  'https://linkedin.com/in/nitishverma',
  'http://www.linkedin.com/in/nitishverma',
  'https://linkedin.com/in/nitish-verma',
  'https://linkedin.com/in/nitish_verma',
  'https://linkedin.com/in/nitishverma123',
];

for (const url of validUrls) {
  const result = await UserService.updateLinkedInSettings(userId, { linkedinUrl: url });
  console.log(`✅ ${url}:`, result.error ? '❌ Failed' : '✅ Passed');
}
```

### Invalid LinkedIn URLs (Should Fail):
```javascript
const invalidUrls = [
  'https://facebook.com/nitish',
  'https://linkedin.com/company/test',
  'linkedin.com/in/nitish',
  'https://linkedin.com/in/',
  'https://linkedin.com/in/nitish.verma',
];

for (const url of invalidUrls) {
  const result = await UserService.updateLinkedInSettings(userId, { linkedinUrl: url });
  console.log(`❌ ${url}:`, result.error ? '✅ Correctly rejected' : '❌ Should have failed');
}
```

---

## Expected Results Summary

| Test | Expected Result |
|------|----------------|
| Login with credentials | ✅ Success, receive auth token |
| Update with valid LinkedIn URL | ✅ Success, data updated |
| Update with invalid URL | ❌ Error: "Invalid LinkedIn URL" |
| Update another user's profile | ❌ Error: "Unauthorized" |
| View own profile | ✅ Always see own LinkedIn URL |
| Change visibility to private | ✅ Success |
| Clear LinkedIn URL (null) | ✅ Success |

---

## Troubleshooting

**"User not authenticated"**
- Run the login step again
- Check: `await supabase.auth.getUser()` returns a user

**"Missing Supabase environment variables"**
- Check `.env.local` exists with correct credentials
- Restart dev server: Stop and run `npm run dev`

**"Failed to update LinkedIn settings"**
- Check Supabase Dashboard → Table Editor → users table exists
- Verify migrations were run successfully
- Check RLS policies are enabled

**Database constraint violation**
- Verify URL format matches pattern
- Verify visibility is 'public', 'connections', or 'private'

---

## Sign Out

When done testing:

```javascript
await supabase.auth.signOut();
console.log('✅ Signed out');
```

---

## Success Criteria

✅ Logged in successfully  
✅ Updated LinkedIn URL  
✅ Changed visibility settings  
✅ Invalid URLs are rejected  
✅ Unauthorized access is blocked  
✅ Data persists in Supabase  

**All tests passing = Backend fully functional!** 🎉
