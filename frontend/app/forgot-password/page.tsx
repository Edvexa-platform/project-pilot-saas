"use client";

import { useState } from "react";
import { api } from "@/services/api";
import Link from "next/link";
import { Mail, ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const [devResetLink, setDevResetLink] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        setDevResetLink("");
        try {
            const res = await api.forgotPassword(email);
            setSuccess(true);
            if (res.dev_reset_link) {
                setDevResetLink(res.dev_reset_link);
            }
        } catch (err: any) {
            setError(err.message || "Failed to send reset link. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background font-sans">
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse-slow" />

            <div className="relative z-10 w-full max-w-md px-4">
                <div className="flex justify-center mb-8">
                    <Logo className="scale-125" />
                </div>

                <div className="glass p-8 rounded-3xl shadow-2xl border border-white/10 backdrop-blur-xl bg-card/60">
                    <div className="mb-8">
                        <Link
                            href="/login"
                            className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors mb-4"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Login
                        </Link>
                        <h2 className="text-2xl font-bold tracking-tight">Forgot Password?</h2>
                        <p className="text-muted-foreground mt-2 text-sm">
                            Enter your email and we'll send you a link to reset your password.
                        </p>
                    </div>

                    {success ? (
                        <div className="text-center animate-in fade-in zoom-in-95 duration-500">
                            <div className="flex justify-center mb-4">
                                <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500">
                                    <CheckCircle2 className="w-8 h-8" />
                                </div>
                            </div>
                            <h3 className="text-lg font-bold">Check your email</h3>
                            <p className="text-muted-foreground text-sm mt-2">
                                If an account exists for <span className="text-foreground font-medium">{email}</span>, we've sent a password reset link.
                            </p>

                            {devResetLink && (
                                <div className="mt-6 p-5 rounded-2xl bg-primary/5 border border-primary/20 text-left">
                                    <p className="text-xs font-bold text-primary uppercase tracking-wider mb-3">Development Mode Active</p>
                                    <p className="text-sm text-muted-foreground mb-4">Click below to continue testing the password reset process.</p>
                                    <Link
                                        href={devResetLink.replace('http://localhost:3000', '')}
                                        className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-md font-semibold text-sm"
                                    >
                                        Click Here to Reset Password
                                    </Link>
                                </div>
                            )}

                            {!devResetLink && (
                                <button
                                    onClick={() => setSuccess(false)}
                                    className="mt-6 text-sm font-semibold text-primary hover:underline"
                                >
                                    Didn't receive it? Try again
                                </button>
                            )}
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {error && (
                                <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm animate-in fade-in">
                                    {error}
                                </div>
                            )}

                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider ml-1">
                                    Email Address
                                </label>
                                <div className="relative group">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-secondary/50 border border-border rounded-xl py-3 pl-10 pr-4 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200"
                                        placeholder="name@example.com"
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 disabled:opacity-50"
                            >
                                {loading ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <span className="font-semibold">Send Reset Link</span>
                                )}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
