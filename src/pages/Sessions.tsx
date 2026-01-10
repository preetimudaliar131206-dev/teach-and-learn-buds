import { useState } from "react";
import { Calendar, Clock, Video, MessageCircle, Star, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { TrustBadge } from "@/components/TrustBadge";
import { cn } from "@/lib/utils";

type SessionStatus = "upcoming" | "completed" | "pending";

interface Session {
  id: string;
  partner: {
    name: string;
    avatar: string;
  };
  skill: string;
  type: "teaching" | "learning";
  date: string;
  time: string;
  duration: string;
  status: SessionStatus;
  credits: number;
  meetLink?: string;
}

const mockSessions: Session[] = [
  {
    id: "1",
    partner: {
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    },
    skill: "UI/UX Design",
    type: "learning",
    date: "Today",
    time: "3:00 PM",
    duration: "45 min",
    status: "upcoming",
    credits: 3,
    meetLink: "https://meet.google.com/abc-defg-hij",
  },
  {
    id: "2",
    partner: {
      name: "Marcus Johnson",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    },
    skill: "Music Production",
    type: "teaching",
    date: "Tomorrow",
    time: "10:00 AM",
    duration: "60 min",
    status: "upcoming",
    credits: 2,
    meetLink: "https://meet.google.com/xyz-uvwx-yz",
  },
  {
    id: "3",
    partner: {
      name: "Elena Rodriguez",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    },
    skill: "Italian Cooking",
    type: "learning",
    date: "Jan 5",
    time: "2:00 PM",
    duration: "90 min",
    status: "completed",
    credits: 4,
  },
  {
    id: "4",
    partner: {
      name: "James Wilson",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    },
    skill: "Photography",
    type: "learning",
    date: "Jan 8",
    time: "4:00 PM",
    duration: "60 min",
    status: "pending",
    credits: 2,
  },
];

const tabs = [
  { id: "upcoming", label: "Upcoming" },
  { id: "completed", label: "Completed" },
  { id: "pending", label: "Pending" },
];

export default function Sessions() {
  const [activeTab, setActiveTab] = useState<SessionStatus>("upcoming");

  const filteredSessions = mockSessions.filter(
    (session) => session.status === activeTab
  );

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Navigation />

      <main className="pt-20 md:pt-24 px-4">
        <div className="container max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground">Sessions</h1>
            <p className="text-muted-foreground text-sm">
              Manage your teaching and learning sessions
            </p>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 bg-secondary/50 p-1 rounded-xl">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as SessionStatus)}
                className={cn(
                  "flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200",
                  activeTab === tab.id
                    ? "bg-card text-foreground shadow-soft"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Sessions List */}
          <div className="space-y-4">
            {filteredSessions.length > 0 ? (
              filteredSessions.map((session, index) => (
                <div
                  key={session.id}
                  className="bg-card rounded-2xl shadow-soft p-4 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={session.partner.avatar}
                      alt={session.partner.name}
                      className="w-14 h-14 rounded-xl object-cover shadow-soft"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-semibold text-foreground">
                            {session.skill}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            with {session.partner.name}
                          </p>
                        </div>
                        <TrustBadge
                          type={session.type === "teaching" ? "topTeacher" : "trusted"}
                          className={
                            session.type === "teaching"
                              ? "bg-accent/10 text-accent border-accent/20"
                              : ""
                          }
                        />
                      </div>

                      <div className="flex flex-wrap items-center gap-3 mt-3 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4" />
                          <span>{session.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4" />
                          <span>
                            {session.time} · {session.duration}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                        <div className="text-sm">
                          <span
                            className={cn(
                              "font-medium",
                              session.type === "teaching"
                                ? "text-accent"
                                : "text-primary"
                            )}
                          >
                            {session.type === "teaching" ? "+" : "-"}
                            {session.credits} credits
                          </span>
                        </div>

                        <div className="flex gap-2">
                          {session.status === "upcoming" && session.meetLink && (
                            <>
                              <Button variant="outline" size="sm">
                                <MessageCircle className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="hero"
                                size="sm"
                                onClick={() =>
                                  window.open(session.meetLink, "_blank")
                                }
                              >
                                <Video className="w-4 h-4 mr-1.5" />
                                Join
                              </Button>
                            </>
                          )}
                          {session.status === "completed" && (
                            <Button variant="outline" size="sm">
                              <Star className="w-4 h-4 mr-1.5" />
                              Rate
                            </Button>
                          )}
                          {session.status === "pending" && (
                            <>
                              <Button variant="outline" size="sm">
                                Decline
                              </Button>
                              <Button variant="hero" size="sm">
                                <CheckCircle className="w-4 h-4 mr-1.5" />
                                Accept
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-card rounded-2xl shadow-soft">
                <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-1">
                  No {activeTab} sessions
                </h3>
                <p className="text-sm text-muted-foreground">
                  {activeTab === "upcoming"
                    ? "Book a session from the Discover page!"
                    : activeTab === "completed"
                    ? "Your completed sessions will appear here."
                    : "Pending session requests will appear here."}
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
