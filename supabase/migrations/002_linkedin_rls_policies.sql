-- Row Level Security (RLS) policies for LinkedIn profile fields
-- Ensures users can only update their own LinkedIn settings

-- Enable RLS on users table if not already enabled
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own full profile including LinkedIn settings
CREATE POLICY "Users can view own profile"
ON users
FOR SELECT
USING (auth.uid() = id);

-- Policy: Users can update only their own LinkedIn settings
CREATE POLICY "Users can update own linkedin settings"
ON users
FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Policy: Public can view profiles with public LinkedIn visibility
-- This allows viewing name, avatar, bio, and LinkedIn URL if visibility is 'public'
CREATE POLICY "Public can view profiles with public linkedin"
ON users
FOR SELECT
USING (
  linkedin_visibility = 'public' OR
  auth.uid() = id
);

-- Grant appropriate permissions
GRANT SELECT ON users TO authenticated;
GRANT UPDATE (linkedin_url, linkedin_visibility) ON users TO authenticated;
