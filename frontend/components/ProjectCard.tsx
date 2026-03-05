"use client";

import React from 'react';
import { Calendar, Folder, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
    title: string;
    category: string;
    createdAt: string;
    onOpen?: () => void;
    className?: string;
}

export const ProjectCard = ({ title, category, createdAt, onOpen, className }: ProjectCardProps) => {
    return (
        <div
            onClick={onOpen}
            className={cn(
                "group relative p-6 rounded-2xl transition-all duration-300 cursor-pointer",
                "bg-white/40 dark:bg-zinc-950/40 backdrop-blur-xl border border-white/20 dark:border-white/5",
                "hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1",
                className
            )}
        >
            <div className="flex justify-between items-start mb-4">
                <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <Folder className="w-5 h-5" />
                </div>
                <button
                    onClick={onOpen}
                    className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                    title="Open Project"
                >
                    <ExternalLink className="w-4 h-4 text-muted-foreground" />
                </button>
            </div>

            <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-1">
                {title}
            </h3>

            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-[10px] font-bold uppercase tracking-wider">
                        {category}
                    </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground/60">
                    <Calendar className="w-3 h-3" />
                    <span>Created on {new Date(createdAt).toLocaleDateString()}</span>
                </div>
            </div>

            {/* Decorative gradient blur */}
            <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />
        </div>
    );
};
