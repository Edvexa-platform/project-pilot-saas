"use client";

import { useEffect, useState } from "react";
import { useTheme } from "./ThemeProvider";
import { Sun, Moon, Monitor } from "lucide-react";
import { cn } from "../lib/utils";

export const ThemeToggle = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Avoid hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const cycleTheme = () => {
        if (theme === "light") setTheme("dark");
        else if (theme === "dark") setTheme("system");
        else setTheme("light");
    };

    return (
        <button
            onClick={cycleTheme}
            className={cn(
                "relative group flex items-center justify-center p-2 rounded-full overflow-hidden transition-all duration-300",
                "bg-white/10 dark:bg-zinc-900/40 backdrop-blur-md border border-white/20 dark:border-white/5 shadow-lg",
                "hover:scale-110 active:scale-95 active:bg-white/20 dark:active:bg-zinc-800/60"
            )}
            aria-label="Toggle theme"
        >
            <div className="relative w-6 h-6 flex items-center justify-center">
                <div className={cn(
                    "absolute transition-all duration-500 ease-bounce-custom",
                    theme === "light" ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-0 opacity-0"
                )}>
                    <Sun className="w-5 h-5 text-yellow-500 fill-yellow-500/20" />
                </div>

                <div className={cn(
                    "absolute transition-all duration-500 ease-bounce-custom",
                    theme === "dark" ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
                )}>
                    <Moon className="w-5 h-5 text-indigo-400 fill-indigo-400/20" />
                </div>

                <div className={cn(
                    "absolute transition-all duration-500 ease-bounce-custom",
                    theme === "system" ? "scale-100 opacity-100" : "scale-0 opacity-0"
                )}>
                    <Monitor className="w-5 h-5 text-zinc-500" />
                </div>
            </div>

            {/* Tooltip */}
            <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none uppercase tracking-widest font-bold shadow-xl">
                {theme}
            </span>

            {/* Dynamic Glow */}
            <div className={cn(
                "absolute inset-0 rounded-full opacity-0 group-hover:opacity-40 transition-all duration-500 blur-md -z-10 bg-gradient-to-tr",
                theme === "dark" ? "from-indigo-500/50 to-purple-500/50" : "from-yellow-400/50 to-orange-400/50"
            )} />
        </button>
    );
};
