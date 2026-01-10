import { CheckCircle, Star, Shield, Award } from "lucide-react";
import { cn } from "@/lib/utils";

interface TrustBadgeProps {
  type: "verified" | "rating" | "trusted" | "topTeacher";
  value?: number;
  className?: string;
}

const badgeConfig = {
  verified: {
    icon: CheckCircle,
    label: "Verified",
    bgClass: "bg-trust-verified/10",
    textClass: "text-trust-verified",
    borderClass: "border-trust-verified/20",
  },
  rating: {
    icon: Star,
    label: "Rating",
    bgClass: "bg-trust-gold/10",
    textClass: "text-trust-gold",
    borderClass: "border-trust-gold/20",
  },
  trusted: {
    icon: Shield,
    label: "Trusted",
    bgClass: "bg-primary/10",
    textClass: "text-primary",
    borderClass: "border-primary/20",
  },
  topTeacher: {
    icon: Award,
    label: "Top Teacher",
    bgClass: "bg-accent/10",
    textClass: "text-accent",
    borderClass: "border-accent/20",
  },
};

export function TrustBadge({ type, value, className }: TrustBadgeProps) {
  const config = badgeConfig[type];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border",
        config.bgClass,
        config.textClass,
        config.borderClass,
        className
      )}
    >
      <Icon className="w-3.5 h-3.5" />
      <span>
        {type === "rating" && value !== undefined
          ? `${value.toFixed(1)}`
          : config.label}
      </span>
    </div>
  );
}
