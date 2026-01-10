import { useState } from "react";
import { Filter, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { SkillCard } from "@/components/SkillCard";

const mockUsers = [
  {
    id: 1,
    name: "Sarah Chen",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    location: "San Francisco, CA",
    bio: "UX designer by day, watercolor artist by night. Love teaching design fundamentals!",
    skillsOffered: ["UI/UX Design", "Figma", "Watercolor Painting", "Sketching"],
    skillsWanted: ["Photography", "Spanish", "Cooking"],
    rating: 4.9,
    isVerified: true,
    isTrusted: true,
    credits: 3,
    sessionDuration: "45 min",
  },
  {
    id: 2,
    name: "Marcus Johnson",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    location: "Austin, TX",
    bio: "Full-stack developer passionate about teaching coding to beginners. Let's build something!",
    skillsOffered: ["JavaScript", "React", "Node.js", "Python"],
    skillsWanted: ["Guitar", "Public Speaking", "Marketing"],
    rating: 4.8,
    isVerified: true,
    isTrusted: false,
    credits: 2,
    sessionDuration: "60 min",
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    location: "Miami, FL",
    bio: "Professional chef with 10 years experience. I'll teach you to cook like a pro!",
    skillsOffered: ["Italian Cooking", "Pastry Making", "Meal Prep"],
    skillsWanted: ["Web Development", "Yoga", "French"],
    rating: 5.0,
    isVerified: true,
    isTrusted: true,
    credits: 4,
    sessionDuration: "90 min",
  },
];

export default function Discover() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [users, setUsers] = useState(mockUsers);

  const handleSwipeLeft = () => {
    if (currentIndex < users.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleSwipeRight = () => {
    // In a real app, this would create a connection request
    if (currentIndex < users.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const currentUser = users[currentIndex];

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Navigation />

      <main className="pt-20 md:pt-24 px-4">
        <div className="container max-w-lg mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Discover</h1>
              <p className="text-muted-foreground text-sm">
                Swipe to find your next skill match
              </p>
            </div>
            <Button variant="outline" size="icon">
              <Filter className="w-4 h-4" />
            </Button>
          </div>

          {/* Swipe Cards */}
          <div className="relative">
            {currentUser ? (
              <div className="animate-scale-in">
                <SkillCard
                  user={currentUser}
                  onSwipeLeft={handleSwipeLeft}
                  onSwipeRight={handleSwipeRight}
                />
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  You've seen everyone!
                </h3>
                <p className="text-muted-foreground mb-4">
                  Check back later for new skill swappers.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setCurrentIndex(0);
                    setUsers(mockUsers);
                  }}
                >
                  Start Over
                </Button>
              </div>
            )}
          </div>

          {/* Card Counter */}
          {currentUser && (
            <div className="text-center mt-4 text-sm text-muted-foreground">
              {currentIndex + 1} of {users.length}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
