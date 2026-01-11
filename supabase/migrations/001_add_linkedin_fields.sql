-- Add LinkedIn profile fields to users table
-- This migration adds support for LinkedIn profile sharing

-- Add linkedin_url column
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS linkedin_url VARCHAR(255);

-- Add linkedin_visibility column with default 'private'
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS linkedin_visibility VARCHAR(20) DEFAULT 'private';

-- Add constraint to ensure visibility is one of the allowed values
ALTER TABLE users 
ADD CONSTRAINT valid_linkedin_visibility 
CHECK (linkedin_visibility IN ('public', 'connections', 'private'));

-- Add constraint for LinkedIn URL format validation
-- Validates URLs like: https://www.linkedin.com/in/username or https://linkedin.com/in/username
ALTER TABLE users 
ADD CONSTRAINT valid_linkedin_url 
CHECK (
  linkedin_url IS NULL OR 
  linkedin_url ~* '^https?://(www\.)?linkedin\.com/in/[a-zA-Z0-9_-]+/?$'
);

-- Add index for faster lookups when filtering by visibility
CREATE INDEX IF NOT EXISTS idx_users_linkedin_visibility 
ON users(linkedin_visibility);

-- Add comment for documentation
COMMENT ON COLUMN users.linkedin_url IS 'User LinkedIn profile URL';
COMMENT ON COLUMN users.linkedin_visibility IS 'LinkedIn profile visibility: public, connections, or private';
