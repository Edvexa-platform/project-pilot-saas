"use client";

import { useEffect, useState } from "react";
import { useTheme } from "./ThemeProvider";

export const AnimatedGradientBackground = () => {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
            {/* Primary Floating Gradient */}
            <div
                className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] mix-blend-soft-light animate-float"
                style={{
                    background: "var(--gradient-1)",
                    transition: "background 1s ease-in-out"
                }}
            />

            {/* Secondary Floating Gradient */}
            <div
                className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] mix-blend-soft-light animate-float"
                style={{
                    background: "var(--gradient-2)",
                    animationDelay: "2s",
                    transition: "background 1s ease-in-out"
                }}
            />

            {/* Center Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] opacity-20 blur-[150px] bg-primary/10" />
        </div>
    );
};
