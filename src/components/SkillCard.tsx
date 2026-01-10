import { useState } from "react";
import { X, Heart, MessageCircle, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TrustBadge } from "@/components/TrustBadge";
import { SkillTag } from "@/components/SkillTag";
import { cn } from "@/lib/utils";

interface SkillCardProps {
  user: {
    name: string;
    avatar: string;
    location: string;
    bio: string;
    skillsOffered: string[];
    skillsWanted: string[];
    rating: number;
    isVerified: boolean;
    isTrusted: boolean;
    credits: number;
    sessionDuration: string;
  };
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  className?: string;
}

export function SkillCard({ user, onSwipeLeft, onSwipeRight, className }: SkillCardProps) {
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null);

  const handleSwipe = (direction: "left" | "right") => {
    setSwipeDirection(direction);
    setTimeout(() => {
      if (direction === "left") onSwipeLeft();
      else onSwipeRight();
      setSwipeDirection(null);
    }, 300);
  };

  return (
    <div
      className={cn(
        "relative w-full max-w-sm bg-card rounded-2xl shadow-card overflow-hidden transition-all duration-300",
        swipeDirection === "left" && "animate-swipe-left",
        swipeDirection === "right" && "animate-swipe-right",
        className
      )}
    >
      {/* User Header */}
      <div className="relative h-48 gradient-hero">
        <div className="absolute inset-0 bg-gradient-to-t from-card/90 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-end gap-3">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-16 h-16 rounded-xl object-cover border-2 border-card shadow-soft"
            />
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-foreground truncate">{user.name}</h3>
              <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
                <MapPin className="w-3.5 h-3.5" />
                <span>{user.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Trust Badges */}
        <div className="flex flex-wrap gap-2">
          {user.isVerified && <TrustBadge type="verified" />}
          <TrustBadge type="rating" value={user.rating} />
          {user.isTrusted && <TrustBadge type="trusted" />}
        </div>

        {/* Bio */}
        <p className="text-sm text-muted-foreground line-clamp-2">{user.bio}</p>

        {/* Skills Offered */}
        <div>
          <p className="text-xs font-medium text-foreground mb-2">Can teach</p>
          <div className="flex flex-wrap gap-1.5">
            {user.skillsOffered.slice(0, 3).map((skill) => (
              <SkillTag key={skill} skill={skill} variant="offered" />
            ))}
            {user.skillsOffered.length > 3 && (
              <span className="text-xs text-muted-foreground self-center">
                +{user.skillsOffered.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Skills Wanted */}
        <div>
          <p className="text-xs font-medium text-foreground mb-2">Wants to learn</p>
          <div className="flex flex-wrap gap-1.5">
            {user.skillsWanted.slice(0, 3).map((skill) => (
              <SkillTag key={skill} skill={skill} variant="wanted" />
            ))}
          </div>
        </div>

        {/* Session Info */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{user.sessionDuration}</span>
          </div>
          <div className="text-sm font-medium text-primary">
            {user.credits} credits/session
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 p-4 pt-0">
        <Button
          variant="outline"
          size="lg"
          className="flex-1 border-destructive/30 text-destructive hover:bg-destructive hover:text-destructive-foreground"
          onClick={() => handleSwipe("left")}
        >
          <X className="w-5 h-5" />
          Pass
        </Button>
        <Button
          variant="hero"
          size="lg"
          className="flex-1"
          onClick={() => handleSwipe("right")}
        >
          <Heart className="w-5 h-5" />
          Connect
        </Button>
      </div>
    </div>
  );
}
