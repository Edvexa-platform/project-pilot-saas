"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { api } from "@/services/api";
import Link from "next/link";
import { Lock, ArrowRight, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

function ResetPasswordContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get("token");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!token) {
            setError("Invalid reset token.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        if (password.length < 8) {
            setError("Password must be at least 8 characters long.");
            return;
        }

        setLoading(true);
        try {
            await api.resetPassword(token, password);
            setSuccess(true);
            setTimeout(() => {
                router.push("/login");
            }, 3000);
        } catch (err: any) {
            setError(err.message || "Failed to reset password. The link may be expired.");
        } finally {
            setLoading(false);
        }
    };

    if (!token) {
        return (
            <div className="text-center p-8 glass rounded-3xl border border-white/10">
                <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-2xl bg-destructive/10 text-destructive">
                        <AlertCircle className="w-8 h-8" />
                    </div>
                </div>
                <h3 className="text-lg font-bold">Invalid Reset Link</h3>
                <p className="text-muted-foreground text-sm mt-2">
                    This link is invalid or has expired. Please request a new one.
                </p>
                <Link href="/forgot-password" title="Request new link" className="mt-6 block text-sm font-semibold text-primary hover:underline">
                    Request New Link
                </Link>
            </div>
        );
    }

    return (
        <div className="glass p-8 rounded-3xl shadow-2xl border border-white/10 backdrop-blur-xl bg-card/60">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold tracking-tight">Set New Password</h2>
                <p className="text-muted-foreground mt-2 text-sm">
                    Choose a strong password to secure your account.
                </p>
            </div>

            {success ? (
                <div className="text-center animate-in fade-in zoom-in-95 duration-500">
                    <div className="flex justify-center mb-4">
                        <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-500">
                            <CheckCircle2 className="w-8 h-8" />
                        </div>
                    </div>
                    <h3 className="text-lg font-bold">Password Reset Successful</h3>
                    <p className="text-muted-foreground text-sm mt-2">
                        Your password has been updated. Redirecting to login...
                    </p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm animate-in fade-in">
                            {error}
                        </div>
                    )}

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider ml-1">
                                New Password
                            </label>
                            <div className="relative group">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                                    <Lock className="w-5 h-5" />
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-secondary/50 border border-border rounded-xl py-3 pl-10 pr-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider ml-1">
                                Confirm New Password
                            </label>
                            <div className="relative group">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                                    <Lock className="w-5 h-5" />
                                </div>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full bg-secondary/50 border border-border rounded-xl py-3 pl-10 pr-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full group flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-lg"
                    >
                        {loading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <>
                                <span className="font-semibold">Reset Password</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </form>
            )}
        </div>
    );
}

export default function ResetPasswordPage() {
    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background font-sans">
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/20 rounded-full blur-[100px] animate-pulse-slow" />

            <div className="relative z-10 w-full max-w-md px-4">
                <div className="flex justify-center mb-8">
                    <Logo className="scale-125" />
                </div>

                <Suspense fallback={<div className="glass p-8 rounded-3xl text-center"><Loader2 className="w-8 h-8 animate-spin mx-auto" /></div>}>
                    <ResetPasswordContent />
                </Suspense>
            </div>
        </div>
    );
}
