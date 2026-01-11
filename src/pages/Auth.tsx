<<<<<<< HEAD
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
=======
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
>>>>>>> 24226fc711e6b38cd1ddbeadba56989d21124e4d
import { Mail, Lock, User, ArrowLeft, Chrome, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
<<<<<<< HEAD
import { AuthService } from "@/services/authService";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
=======
import { useAuth } from "@/hooks/useAuth";
>>>>>>> 24226fc711e6b38cd1ddbeadba56989d21124e4d

export default function Auth() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
<<<<<<< HEAD
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState(false);
  const navigate = useNavigate();
  const { refreshUser } = useAuth();

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setSocialLoading(true);
      try {
        console.log("Google Login Success:", tokenResponse);
        // Store the google access token for Calendar usage
        localStorage.setItem("google_access_token", tokenResponse.access_token);

        // In a real app, send this to backend. 
        // Here we just mimic a successful login to our app by calling the "fakelogin" endpoint or just reusing the manual login flow.
        // Let's call our mock backend login endpoint to get an app token
        await AuthService.login({
          email: "google-user@example.com",
          password: "dummy-password"
        });

        toast.success("Google Login Successful!");
        await refreshUser();
        navigate("/profile");
      } catch (error: any) {
        console.error("Google Login Logic Error:", error);
        toast.error("Failed to process Google Login");
      } finally {
        setSocialLoading(false);
      }
    },
    onError: (error) => {
      console.error("Google Login Failed:", error);
      toast.error("Google Login Failed");
      setSocialLoading(false);
    },
    scope: 'https://www.googleapis.com/auth/calendar.events'
  });

  const handleGoogleLogin = () => {
    loginWithGoogle();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === "signup") {
        await AuthService.register({
          email,
          password,
          name,
        });
        toast.success("Account created successfully!");
        await refreshUser();
        navigate("/profile");
      } else {
        await AuthService.login({
          email,
          password,
        });
        toast.success("Welcome back!");
        await refreshUser();
        navigate("/profile");
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred during authentication");
    } finally {
      setLoading(false);
=======
  const [isLoading, setIsLoading] = useState(false);
  
  const { user, signIn, signUp, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/discover');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (mode === "login") {
        await signIn(email, password);
      } else {
        await signUp(email, password, name);
      }
      navigate('/discover');
    } catch (error) {
      // Error is already handled in useAuth
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signInWithGoogle();
    } catch (error) {
      // Error is already handled in useAuth
    } finally {
      setIsLoading(false);
>>>>>>> 24226fc711e6b38cd1ddbeadba56989d21124e4d
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel - Decorative */}
      <div className="hidden lg:flex lg:w-1/2 gradient-hero relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-foreground/10 rounded-full blur-2xl" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-primary-foreground/10 rounded-full blur-2xl" />

        <div className="relative z-10 flex flex-col justify-center p-12 text-primary-foreground">
          <Link to="/" className="flex items-center gap-2 mb-12">
            <div className="w-10 h-10 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">S</span>
            </div>
            <span className="text-2xl font-bold">SkillSwap</span>
          </Link>

          <h1 className="text-4xl font-bold mb-4">
            {mode === "login" ? "Welcome back!" : "Join the community"}
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-md">
            {mode === "login"
              ? "Continue your skill-sharing journey. Your credits and connections are waiting."
              : "Start trading skills today. No money, just knowledge exchange."}
          </p>

          <div className="mt-12 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center text-sm font-medium">
                ✓
              </div>
              <span>100% free to join</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center text-sm font-medium">
                ✓
              </div>
              <span>Earn credits by teaching</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center text-sm font-medium">
                ✓
              </div>
              <span>Learn anything you want</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Auth Form */}
      <div className="flex-1 flex flex-col justify-center p-6 md:p-12">
        <div className="w-full max-w-md mx-auto">
          {/* Mobile Back Button */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 lg:hidden"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>

          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">S</span>
            </div>
            <span className="text-2xl font-bold text-foreground">SkillSwap</span>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {mode === "login" ? "Sign in to your account" : "Create your account"}
            </h2>
            <p className="text-muted-foreground">
              {mode === "login" ? (
                <>
                  Don't have an account?{" "}
                  <button
                    onClick={() => setMode("signup")}
                    className="text-primary hover:underline font-medium"
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    onClick={() => setMode("login")}
                    className="text-primary hover:underline font-medium"
                  >
                    Sign in
                  </button>
                </>
              )}
            </p>
          </div>

          {/* Social Login */}
          <div className="space-y-3 mb-6">
<<<<<<< HEAD
            <Button
              variant="social"
              className="w-full gap-3"
              onClick={handleGoogleLogin}
              disabled={socialLoading || loading}
=======
            <Button 
              variant="social" 
              className="w-full gap-3"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
>>>>>>> 24226fc711e6b38cd1ddbeadba56989d21124e4d
            >
              <Chrome className="w-5 h-5" />
              {socialLoading ? "Connecting to Google..." : "Continue with Google"}
            </Button>
            <Button 
              variant="social" 
              className="w-full gap-3 bg-[#0077B5]/10 hover:bg-[#0077B5]/20 border-[#0077B5]/30"
              disabled
            >
              <Linkedin className="w-5 h-5 text-[#0077B5]" />
              Continue with LinkedIn (Coming Soon)
            </Button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with email
              </span>
            </div>
          </div>

          {/* Email Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Rahul Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                  minLength={6}
                />
              </div>
            </div>

            {mode === "login" && (
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </button>
              </div>
            )}

<<<<<<< HEAD
            <Button variant="hero" type="submit" className="w-full" disabled={loading || socialLoading}>
              {(loading) ? "Processing..." : (mode === "login" ? "Sign in" : "Create account")}
=======
            <Button variant="hero" type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Loading..." : mode === "login" ? "Sign in" : "Create account"}
>>>>>>> 24226fc711e6b38cd1ddbeadba56989d21124e4d
            </Button>
          </form>

          <p className="text-xs text-muted-foreground text-center mt-6">
            By continuing, you agree to our{" "}
            <a href="#" className="text-primary hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-primary hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
