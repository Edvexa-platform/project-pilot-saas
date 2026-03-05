"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ProjectStepCardProps {
    children: ReactNode;
    title: string;
    description: string;
    className?: string;
}

export const ProjectStepCard = ({ children, title, description, className }: ProjectStepCardProps) => {
    return (
        <div className={cn("w-full max-w-4xl mx-auto", className)}>
            <div className="mb-8 text-center animate-fade-in-up">
                <h2 className="text-3xl font-bold tracking-tight text-foreground mb-2">{title}</h2>
                <p className="text-muted-foreground">{description}</p>
            </div>

            <div className="relative p-8 rounded-3xl ios-card bg-white/40 dark:bg-zinc-950/40 backdrop-blur-2xl border border-white/20 dark:border-white/5 shadow-2xl overflow-hidden min-h-[400px]">
                {/* Subtle inner top glow */}
                <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />

                <div className="relative z-10 h-full">
                    {children}
                </div>
            </div>
        </div>
    );
};
