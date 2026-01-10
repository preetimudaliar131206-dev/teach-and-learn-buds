import { Link } from "react-router-dom";
import { ArrowRight, Users, Sparkles, Shield, Zap, Heart, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";

const features = [
  {
    icon: BookOpen,
    title: "Teach & Earn",
    description: "Share your expertise in short sessions and earn skill credits.",
  },
  {
    icon: Sparkles,
    title: "Learn Anything",
    description: "Spend credits to learn from passionate teachers in your community.",
  },
  {
    icon: Shield,
    title: "Trust First",
    description: "Verified profiles, ratings, and trust scores keep the community safe.",
  },
  {
    icon: Zap,
    title: "Swipe to Match",
    description: "Discover skills you want to learn with our intuitive swipe interface.",
  },
];

const stats = [
  { value: "10K+", label: "Active Users" },
  { value: "500+", label: "Skills Shared" },
  { value: "25K+", label: "Sessions Completed" },
  { value: "4.9", label: "Avg. Rating" },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-soft delay-1000" />

        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in">
              <Heart className="w-4 h-4" />
              <span>No money. Just skills.</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 animate-fade-in-up">
              Swap Skills,{" "}
              <span className="text-gradient">Grow Together</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in-up delay-100">
              SkillSwap is a trust-first community where you teach what you know and learn what you love—powered by credits, not cash.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-200">
              <Link to="/auth">
                <Button variant="hero" size="xl" className="gap-2">
                  Start Swapping
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/discover">
                <Button variant="outline" size="xl">
                  Explore Skills
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-2xl mx-auto animate-fade-in-up delay-300">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center p-4 rounded-xl bg-card shadow-soft"
                style={{ animationDelay: `${300 + index * 100}ms` }}
              >
                <div className="text-2xl md:text-3xl font-bold text-gradient">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How SkillSwap Works
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              A simple credit system that values everyone's time equally.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                step: "1",
                title: "Create Your Profile",
                description: "List skills you can teach and skills you want to learn. Get verified to build trust.",
              },
              {
                step: "2",
                title: "Discover & Match",
                description: "Swipe through skill cards to find the perfect match. Connect with teachers and learners.",
              },
              {
                step: "3",
                title: "Book & Exchange",
                description: "Schedule sessions via Google Meet. Earn credits by teaching, spend them to learn.",
              },
            ].map((item, index) => (
              <div
                key={item.step}
                className="relative p-6 rounded-2xl bg-card shadow-card animate-fade-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="absolute -top-3 -left-3 w-10 h-10 rounded-xl gradient-hero flex items-center justify-center text-primary-foreground font-bold">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why People Love SkillSwap
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="p-6 rounded-2xl bg-card shadow-soft hover:shadow-card transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="relative rounded-3xl gradient-hero p-8 md:p-12 text-center overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-primary-foreground/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-primary-foreground/10 rounded-full translate-x-1/4 translate-y-1/4" />

            <div className="relative">
              <Users className="w-12 h-12 text-primary-foreground/80 mx-auto mb-4" />
              <h2 className="text-2xl md:text-4xl font-bold text-primary-foreground mb-4">
                Join 10,000+ Skill Swappers
              </h2>
              <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
                Start your journey today. Teach what you know, learn what you love.
              </p>
              <Link to="/auth">
                <Button
                  variant="secondary"
                  size="xl"
                  className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                >
                  Get Started Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-hero flex items-center justify-center">
                <span className="text-primary-foreground font-bold">S</span>
              </div>
              <span className="font-semibold text-foreground">SkillSwap</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 SkillSwap. Share skills, grow together.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
