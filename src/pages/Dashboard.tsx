import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    Plus,
    Coins,
    Calendar,
    Star,
    Users,
    Linkedin,
    ShieldCheck,
    ArrowRight,
    Sparkles,
    Zap,
    TrendingUp,
    MessageCircle,
    Video
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { TrustBadge } from "@/components/TrustBadge";
import { useAuth } from "@/contexts/AuthContext";
import { UserService } from "@/services/userService";
import { User } from "@/types/userTypes";
import { cn } from "@/lib/utils";

const mockRecommendations = [
    {
        name: "Priya Sharma",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
        skill: "UI/UX Design",
        rating: 4.9,
    },
    {
        name: "Arjun Reddy",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
        skill: "React & JavaScript",
        rating: 4.8,
    }
];

const upcomingSessionsPreview = [
    {
        partner: "Ananya Iyer",
        skill: "Yoga & Wellness",
        time: "Tomorrow, 7:00 AM",
        type: "learning"
    }
];

export default function Dashboard() {
    const { user } = useAuth();
    const [profile, setProfile] = useState<Partial<User> | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadProfile() {
            if (user) {
                const result = await UserService.getUserProfile(user.id);
                if (result.data) {
                    setProfile(result.data);
                }
                setLoading(false);
            }
        }
        loadProfile();
    }, [user]);

    const displayName = profile?.name || user?.email?.split('@')[0] || "User";

    return (
        <div className="min-h-screen bg-background pb-20 md:pb-0">
            <Navigation />

            <main className="pt-20 md:pt-24 px-4 pb-12">
                <div className="container max-w-4xl mx-auto space-y-8">

                    {/* Welcome Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 animate-fade-in">
                        <div>
                            <h1 className="text-3xl font-bold text-foreground">
                                Namaste, <span className="text-gradient">{displayName}</span>!
                            </h1>
                            <p className="text-muted-foreground mt-1">
                                You're making great progress in your skill-sharing journey.
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <Link to="/discover">
                                <Button variant="hero" className="shadow-premium">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Teach a Skill
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Credits Card */}
                        <div className="md:col-span-2 relative group overflow-hidden rounded-3xl gradient-hero p-8 text-primary-foreground shadow-premium animate-fade-in-up">
                            <div className="relative z-10 flex flex-col h-full justify-between">
                                <div>
                                    <div className="flex items-center gap-2 text-primary-foreground/80 mb-2">
                                        <Coins className="w-5 h-5 text-trust-gold" />
                                        <span className="font-medium">Available Credits</span>
                                    </div>
                                    <div className="text-6xl font-black">{profile?.credits || 15}</div>
                                </div>

                                <div className="mt-8 flex items-center justify-between">
                                    <div className="text-sm text-primary-foreground/70">
                                        Earn more by teaching what you know!
                                    </div>
                                    <Link to="/sessions">
                                        <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white border-0">
                                            View Transactions
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                            {/* Decorative Background */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-white/15 transition-colors" />
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary-foreground/5 rounded-full blur-2xl -translate-x-1/4 translate-y-1/4" />
                        </div>

                        {/* Trust Progress Card */}
                        <div className="bg-card rounded-3xl shadow-card p-6 border border-border/50 animate-fade-in-up delay-100">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold flex items-center gap-2">
                                    <ShieldCheck className="w-5 h-5 text-primary" />
                                    Trust Score
                                </h3>
                                <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-full">
                                    LEVEL 1
                                </span>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Progress to Verification</span>
                                    <span className="font-bold">65%</span>
                                </div>
                                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                                    <div className="h-full bg-primary rounded-full transition-all w-[65%]" />
                                </div>

                                <div className="space-y-3 pt-2">
                                    <div className="flex items-center justify-between text-xs">
                                        <div className="flex items-center gap-2">
                                            <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center">
                                                <span className="text-green-500 font-bold text-[10px]">✓</span>
                                            </div>
                                            <span className="text-muted-foreground">Email Verified</span>
                                        </div>
                                        <span className="text-green-500 font-medium">+10%</span>
                                    </div>
                                    <div className="flex items-center justify-between text-xs opacity-50">
                                        <div className="flex items-center gap-2">
                                            <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                                                <Linkedin className="w-3 h-3 text-primary" />
                                            </div>
                                            <span className="text-muted-foreground">Link LinkedIn</span>
                                        </div>
                                        <Link to="/profile" className="text-primary hover:underline">+20%</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Upcoming Sessions */}
                        <div className="lg:col-span-2 space-y-4 animate-fade-in-up delay-200">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold flex items-center gap-2">
                                    <Calendar className="w-5 h-5 text-accent" />
                                    Upcoming Sessions
                                </h2>
                                <Link to="/sessions" className="text-sm text-primary hover:underline font-medium flex items-center gap-1">
                                    View all <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>

                            {upcomingSessionsPreview.map((session, i) => (
                                <div key={i} className="bg-card rounded-2xl p-5 shadow-soft border border-border/40 hover:border-primary/20 transition-all group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                                            <Zap className="w-6 h-6" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-foreground">{session.skill}</h4>
                                            <p className="text-sm text-muted-foreground">with {session.partner} · {session.time}</p>
                                        </div>
                                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Button variant="outline" size="sm" className="h-9 w-9 p-0 rounded-lg">
                                                <MessageCircle className="w-4 h-4" />
                                            </Button>
                                            <Button variant="hero" size="sm" className="h-9 px-4 rounded-lg">
                                                <Video className="w-4 h-4 mr-2" />
                                                Join
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Quick Discover / Recommendations */}
                        <div className="space-y-4 animate-fade-in-up delay-300">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-trust-gold" />
                                Featured for You
                            </h2>

                            <div className="space-y-4">
                                {mockRecommendations.map((rec, i) => (
                                    <div key={i} className="flex items-center gap-3 p-3 rounded-2xl hover:bg-secondary/30 transition-colors cursor-pointer group">
                                        <img src={rec.avatar} className="w-12 h-12 rounded-xl object-cover shadow-soft" alt={rec.name} />
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-bold text-sm text-foreground truncate">{rec.name}</h4>
                                            <p className="text-[12px] text-muted-foreground truncate">Teaches {rec.skill}</p>
                                        </div>
                                        <div className="flex items-center gap-1 text-[12px] font-bold text-foreground">
                                            <Star className="w-3 h-3 text-trust-gold fill-trust-gold" />
                                            {rec.rating}
                                        </div>
                                    </div>
                                ))}

                                <Link to="/discover">
                                    <Button variant="ghost" className="w-full mt-4 text-xs font-bold text-primary hover:text-primary hover:bg-primary/5 uppercase tracking-wider">
                                        Explore more skills
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}
