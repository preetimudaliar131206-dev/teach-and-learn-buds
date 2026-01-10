import { useState } from "react";
import { Edit2, Settings, Plus, Coins, Calendar, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { TrustBadge } from "@/components/TrustBadge";
import { SkillTag } from "@/components/SkillTag";

const mockProfile = {
  name: "Alex Thompson",
  email: "alex@example.com",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
  location: "New York, NY",
  bio: "Product designer with a passion for music production. Always eager to learn new creative skills!",
  skillsOffered: ["Product Design", "Figma", "Music Production", "Ableton Live"],
  skillsWanted: ["Photography", "Spanish", "Cooking", "Yoga"],
  credits: 12,
  rating: 4.8,
  sessionsCompleted: 24,
  isVerified: true,
  isTrusted: true,
  memberSince: "January 2024",
};

export default function Profile() {
  const [profile] = useState(mockProfile);

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Navigation />

      <main className="pt-20 md:pt-24 px-4">
        <div className="container max-w-2xl mx-auto">
          {/* Profile Header */}
          <div className="bg-card rounded-2xl shadow-card overflow-hidden mb-6 animate-fade-in">
            {/* Cover / Gradient */}
            <div className="h-24 gradient-hero relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-3 right-3 bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground"
              >
                <Settings className="w-4 h-4" />
              </Button>
            </div>

            <div className="px-6 pb-6">
              {/* Avatar */}
              <div className="relative -mt-12 mb-4">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-24 h-24 rounded-2xl object-cover border-4 border-card shadow-card"
                />
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute bottom-0 right-0 w-8 h-8 rounded-full shadow-soft"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </Button>
              </div>

              {/* Name & Info */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">{profile.name}</h1>
                  <p className="text-muted-foreground">{profile.location}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Member since {profile.memberSince}
                  </p>
                </div>

                {/* Trust Badges */}
                <div className="flex flex-wrap gap-2">
                  {profile.isVerified && <TrustBadge type="verified" />}
                  <TrustBadge type="rating" value={profile.rating} />
                  {profile.isTrusted && <TrustBadge type="trusted" />}
                </div>
              </div>

              {/* Bio */}
              <p className="text-muted-foreground mt-4">{profile.bio}</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-4 mb-6 animate-fade-in-up">
            <div className="bg-card rounded-xl p-4 shadow-soft text-center">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-2">
                <Coins className="w-5 h-5 text-primary" />
              </div>
              <div className="text-2xl font-bold text-foreground">{profile.credits}</div>
              <div className="text-xs text-muted-foreground">Credits</div>
            </div>
            <div className="bg-card rounded-xl p-4 shadow-soft text-center">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mx-auto mb-2">
                <Calendar className="w-5 h-5 text-accent" />
              </div>
              <div className="text-2xl font-bold text-foreground">{profile.sessionsCompleted}</div>
              <div className="text-xs text-muted-foreground">Sessions</div>
            </div>
            <div className="bg-card rounded-xl p-4 shadow-soft text-center">
              <div className="w-10 h-10 rounded-lg bg-trust-gold/10 flex items-center justify-center mx-auto mb-2">
                <Star className="w-5 h-5 text-trust-gold" />
              </div>
              <div className="text-2xl font-bold text-foreground">{profile.rating}</div>
              <div className="text-xs text-muted-foreground">Rating</div>
            </div>
          </div>

          {/* Skills Offered */}
          <div className="bg-card rounded-2xl shadow-soft p-6 mb-6 animate-fade-in-up delay-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Skills I Can Teach</h2>
              <Button variant="ghost" size="sm" className="gap-1.5 text-primary">
                <Plus className="w-4 h-4" />
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {profile.skillsOffered.map((skill) => (
                <SkillTag key={skill} skill={skill} variant="offered" />
              ))}
            </div>
          </div>

          {/* Skills Wanted */}
          <div className="bg-card rounded-2xl shadow-soft p-6 mb-6 animate-fade-in-up delay-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Skills I Want to Learn</h2>
              <Button variant="ghost" size="sm" className="gap-1.5 text-accent">
                <Plus className="w-4 h-4" />
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {profile.skillsWanted.map((skill) => (
                <SkillTag key={skill} skill={skill} variant="wanted" />
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 animate-fade-in-up delay-300">
            <Button variant="outline" className="flex-1">
              Edit Profile
            </Button>
            <Button variant="hero" className="flex-1">
              View Public Profile
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
