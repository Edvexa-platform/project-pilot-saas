"use client";

import { useState } from "react";
import { useAuth } from "../../components/AuthProvider";
import Link from "next/link";
import { Mail, Lock, ArrowRight, Loader2, Sparkles } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

export default function LoginPage() {
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await login(email, password);
        } catch (err: any) {
            setError("Invalid credentials. Please check your email and password.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background selection:bg-primary/20 p-6">
            {/* Premium Background Effects */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px] animate-pulse-slow" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary/10 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }} />

            <div className="relative z-10 w-full max-w-md animate-in fade-in slide-in-from-bottom-5 duration-1000">
                {/* Logo */}
                <div className="flex justify-center mb-10">
                    <Logo className="scale-125" />
                </div>

                {/* Login Card */}
                <div className="saas-card p-8 md:p-10 border border-border/50 bg-white/80 dark:bg-card/80 backdrop-blur-xl">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-muted/50 mb-4">
                            <Sparkles className="w-3.5 h-3.5 text-secondary" />
                            <span className="text-[10px] font-bold tracking-widest uppercase text-foreground/70">Welcome Back</span>
                        </div>
                        <h2 className="text-3xl font-black tracking-tight text-foreground">
                            Sign In
                        </h2>
                        <p className="text-muted-foreground mt-3 text-sm font-medium">
                            Enter your credentials to access your workspace
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
                            <div className="flex items-center justify-between ml-1">
                                <label className="text-[11px] font-black text-muted-foreground uppercase tracking-widest">
                                    Password
                                </label>
                                <Link href="#" className="text-[11px] font-black text-primary hover:text-primary/80 uppercase tracking-widest">
                                    Forgot?
                                </Link>
                            </div>
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
                                    <span>Sign In to Pilot</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-10 text-center">
                        <p className="text-sm text-muted-foreground font-medium">
                            Don't have an account?{" "}
                            <Link href="/signup" className="text-primary hover:text-primary/80 font-bold transition-colors">
                                Sign up for free
                            </Link>
                        </p>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-[10px] font-black tracking-widest uppercase text-muted-foreground/50">
                        Secure SSL Encryption • Privacy Protected
                    </p>
                </div>
            </div>
        </div>
    );
}

