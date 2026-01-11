/**
 * User type definitions for SkillSwap application
 */

export type LinkedInVisibility = 'public' | 'connections' | 'private';

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
  communityMeets?: number;
  isVerified?: boolean;
  isTrusted?: boolean;
  linkedInVerified?: boolean;
  memberSince?: string;
  
  // LinkedIn profile fields
  linkedinUrl?: string;
  linkedinVisibility?: LinkedInVisibility;
  
  // Timestamps
  createdAt?: string;
  updatedAt?: string;
}

export interface UpdateLinkedInSettingsParams {
  linkedinUrl?: string | null;
  linkedinVisibility?: LinkedInVisibility;
}

export interface LinkedInSettings {
  linkedinUrl: string | null;
  linkedinVisibility: LinkedInVisibility;
}
