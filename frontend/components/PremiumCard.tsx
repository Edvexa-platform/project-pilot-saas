"use client";

import React, { useRef, useState } from "react";
import { cn } from "../lib/utils";

interface PremiumCardProps {
    children: React.ReactNode;
    className?: string;
}

export const PremiumCard = ({ children, className }: PremiumCardProps) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMousePos({ x, y });

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (centerY - y) / 25;
        const rotateY = (x - centerX) / 25;

        cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseLeave = () => {
        if (cardRef.current) {
            cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
        }
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={cn(
                "relative group overflow-hidden rounded-2xl p-8 transition-all duration-500 ease-out cursor-default",
                "glass dark:bg-zinc-900/40",
                "border border-white/20 dark:border-white/5",
                "shadow-2xl shadow-black/5 hover:shadow-black/10 dark:shadow-none",
                "hover:-translate-y-1 hover:border-primary/20 transition-all duration-500",
                className
            )}
            style={{ transformStyle: "preserve-3d" }}
        >
            {/* Shimmer Streak */}
            <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/20 dark:via-white/5 to-transparent pointer-events-none" />

            {/* Dynamic Light Reflection */}
            <div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    background: `radial-gradient(circle 120px at ${mousePos.x}px ${mousePos.y}px, hsl(var(--primary) / 0.05), transparent)`,
                }}
            />

            <div className="relative z-10" style={{ transform: "translateZ(30px)" }}>
                {children}
            </div>
        </div>
    );
};

