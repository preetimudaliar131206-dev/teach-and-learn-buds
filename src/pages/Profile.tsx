import { useState, useEffect } from "react";
import { Edit2, Settings, Plus, Coins, Calendar, Star, Users, Linkedin, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { TrustBadge } from "@/components/TrustBadge";
import { SkillTag } from "@/components/SkillTag";
import { LinkedInSettingsDialog } from "@/components/LinkedInSettingsDialog";
import { CalendarEventDialog } from "@/components/CalendarEventDialog";
import { useAuth } from "@/contexts/AuthContext";
import { UserService } from "@/services/userService";
import { User, LinkedInVisibility } from "@/types/userTypes";
import { toast } from "sonner";

const mockProfile: Partial<User> = {
  name: "Vikram Mehta",
  email: "vikram@example.com",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
  location: "Pune, Maharashtra",
  bio: "Product manager at a fintech startup. Love teaching product management and hosting community tech talks!",
  skillsOffered: ["Product Management", "Figma", "Agile/Scrum", "User Research"],
  skillsWanted: ["Photography", "Tamil", "Cooking", "Yoga"],
  credits: 15,
  rating: 4.8,
  sessionsCompleted: 32,
  communityMeets: 8,
  isVerified: true,
  isTrusted: true,
  linkedInVerified: true,
  memberSince: "March 2024",
  linkedinUrl: "https://linkedin.com/in/vikram-mehta",
  linkedinVisibility: "public",
};

export default function Profile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Partial<User>>(mockProfile);
  const [loading, setLoading] = useState(true);
  const [isLinkedInDialogOpen, setIsLinkedInDialogOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      try {
        if (user?.id) {
          const result = await UserService.getUserProfile(user.id);
          if (result.data) {
            setProfile(result.data);
          }
        }
      } catch (error) {
        console.error("Error loading profile:", error);
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, [user]);

  const handleLinkedInUpdate = (url: string, visibility: LinkedInVisibility) => {
    setProfile(prev => ({
      ...prev,
      linkedinUrl: url,
      linkedinVisibility: visibility,
      linkedInVerified: !!url
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

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
                  <button
                    onClick={() => user?.id && setIsLinkedInDialogOpen(true)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-[#0077B5]/10 text-[#0077B5] border border-[#0077B5]/20 hover:bg-[#0077B5]/20 transition-colors"
                  >
                    <Linkedin className="w-3 h-3" />
                    {profile.linkedinUrl ? "LinkedIn Linked" : "Link LinkedIn"}
                  </button>
                </div>

                {/* Bio */}
                <p className="text-muted-foreground mt-4">{profile.bio}</p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-3 mb-6 animate-fade-in-up">
            <div className="bg-card rounded-xl p-3 shadow-soft text-center">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-2">
                <Coins className="w-4 h-4 text-primary" />
              </div>
              <div className="text-xl font-bold text-foreground">{profile.credits}</div>
              <div className="text-xs text-muted-foreground">Credits</div>
            </div>
            <div className="bg-card rounded-xl p-3 shadow-soft text-center">
              <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center mx-auto mb-2">
                <Calendar className="w-4 h-4 text-accent" />
              </div>
              <div className="text-xl font-bold text-foreground">{profile.sessionsCompleted}</div>
              <div className="text-xs text-muted-foreground">Sessions</div>
            </div>
            <div className="bg-card rounded-xl p-3 shadow-soft text-center">
              <div className="w-9 h-9 rounded-lg bg-secondary/50 flex items-center justify-center mx-auto mb-2">
                <Users className="w-4 h-4 text-foreground" />
              </div>
              <div className="text-xl font-bold text-foreground">{profile.communityMeets}</div>
              <div className="text-xs text-muted-foreground">Meetups</div>
            </div>
            <div className="bg-card rounded-xl p-3 shadow-soft text-center">
              <div className="w-9 h-9 rounded-lg bg-trust-gold/10 flex items-center justify-center mx-auto mb-2">
                <Star className="w-4 h-4 text-trust-gold" />
              </div>
              <div className="text-xl font-bold text-foreground">{profile.rating}</div>
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
              {profile.skillsOffered?.map((skill) => (
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
              {profile.skillsWanted?.map((skill) => (
                <SkillTag key={skill} skill={skill} variant="wanted" />
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 animate-fade-in-up delay-300">
            <Button variant="outline" className="flex-1">
              Edit Profile
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setIsCalendarOpen(true)}
            >
              Schedule Session
            </Button>
            <Button
              variant="hero"
              className="flex-1"
              onClick={() => user?.id && setIsLinkedInDialogOpen(true)}
            >
              LinkedIn Settings
            </Button>
          </div>
        </div>
      </main>

      {user?.id && (
        <LinkedInSettingsDialog
          open={isLinkedInDialogOpen}
          onOpenChange={setIsLinkedInDialogOpen}
          userId={user.id}
          initialUrl={profile.linkedinUrl}
          initialVisibility={profile.linkedinVisibility}
          onSuccess={handleLinkedInUpdate}
        />
      )}

      <CalendarEventDialog
        open={isCalendarOpen}
        onOpenChange={setIsCalendarOpen}
      />
    </div>
  );
}

