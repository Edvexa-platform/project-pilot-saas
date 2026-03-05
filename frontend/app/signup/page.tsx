"use client";

import { useState } from "react";
import { useAuth } from "../../components/AuthProvider";
import Link from "next/link";
import { Mail, Lock, Loader2, UserPlus, Sparkles } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

export default function SignupPage() {
    const { signup } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await signup(email, password);
        } catch (err: any) {
            setError(err.message || "Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background selection:bg-primary/20 p-6">
            {/* Premium Background Effects */}
            <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/10 rounded-full blur-[120px] animate-pulse-slow" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }} />

            <div className="relative z-10 w-full max-w-md animate-in fade-in slide-in-from-bottom-5 duration-1000">
                {/* Logo */}
                <div className="flex justify-center mb-10">
                    <Logo className="scale-125" />
                </div>

                {/* Register Card */}
                <div className="saas-card p-8 md:p-10 border border-border/50 bg-white/80 dark:bg-card/80 backdrop-blur-xl">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-muted/50 mb-4">
                            <Sparkles className="w-3.5 h-3.5 text-primary" />
                            <span className="text-[10px] font-bold tracking-widest uppercase text-foreground/70">Join the Future</span>
                        </div>
                        <h2 className="text-3xl font-black tracking-tight text-foreground">
                            Create Account
                        </h2>
                        <p className="text-muted-foreground mt-3 text-sm font-medium">
                            Empowering students with clinical-grade AI
                        </p>
                    </div>

                    {error && (
                        <div className="mb-8 p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm font-bold flex items-center gap-3 animate-in fade-in">
                            <div className="w-1.5 h-1.5 rounded-full bg-destructive animate-pulse" />
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2.5">
                            <label className="text-[11px] font-black text-muted-foreground uppercase tracking-widest ml-1">
                                Email Address
                            </label>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-muted/30 border border-border rounded-xl py-3.5 pl-12 pr-4 text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
                                    placeholder="name@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2.5">
                            <label className="text-[11px] font-black text-muted-foreground uppercase tracking-widest ml-1">
                                Password
                            </label>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                                    <Lock className="w-5 h-5" />
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-muted/30 border border-border rounded-xl py-3.5 pl-12 pr-4 text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                            <p className="text-[10px] text-muted-foreground font-medium ml-1">
                                Minimum 8 characters with at least one number
                            </p>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn-gradient-glow flex items-center justify-center gap-2 h-14 mt-4 font-black"
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    <span>Get Started Free</span>
                                    <UserPlus className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-10 text-center">
                        <p className="text-sm text-muted-foreground font-medium">
                            Already have an account?{" "}
                            <Link href="/login" className="text-primary hover:text-primary/80 font-bold transition-colors">
                                Sign in here
                            </Link>
                        </p>
                    </div>
                </div>

                <div className="mt-8 text-center px-4">
                    <p className="text-[10px] font-medium text-muted-foreground leading-relaxed">
                        By signing up, you agree to our <span className="font-bold text-foreground underline decoration-primary/30">Terms of Service</span> and <span className="font-bold text-foreground underline decoration-primary/30">Privacy Policy</span>.
                    </p>
                </div>
            </div>
        </div>
    );
}

