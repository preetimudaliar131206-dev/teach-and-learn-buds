import { cn } from "@/lib/utils";

interface SkillTagProps {
  skill: string;
  variant?: "offered" | "wanted";
  className?: string;
}

export function SkillTag({ skill, variant = "offered", className }: SkillTagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200",
        variant === "offered"
          ? "bg-primary/10 text-primary border border-primary/20 hover:bg-primary/15"
          : "bg-accent/10 text-accent border border-accent/20 hover:bg-accent/15",
        className
      )}
    >
      {skill}
    </span>
  );
}
