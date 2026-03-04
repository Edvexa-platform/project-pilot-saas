"use client";

import React, { useRef, useState, useEffect } from "react";
import { cn } from "../lib/utils";

interface PremiumCardProps {
    children: React.ReactNode;
    className?: string;
}

export const PremiumCard = ({ children, className }: PremiumCardProps) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMousePos({ x, y });

        // Calculate rotation
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (centerY - y) / 20;
        const rotateY = (x - centerX) / 20;

        cardRef.current.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
        if (cardRef.current) {
            cardRef.current.style.transform = `perspective(1200px) rotateX(0deg) rotateY(0deg)`;
        }
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={handleMouseLeave}
            className={cn(
                "relative group overflow-hidden rounded-2xl p-6 transition-all duration-500 ease-out cursor-default",
                "bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl",
                "border border-white/20 dark:border-white/5",
                "shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.6)]",
                "hover:shadow-[0_12px_48px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_12px_48px_rgba(0,0,0,0.8)]",
                className
            )}
            style={{ transformStyle: "preserve-3d" }}
        >
            {/* Shimmer Streak */}
            <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/10 dark:via-white/5 to-transparent pointer-events-none" />

            {/* Dynamic Light Reflection */}
            <div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                    background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.15) 0%, transparent 80%)`,
                }}
            />

            <div className="relative z-10" style={{ transform: "translateZ(20px)" }}>
                {children}
            </div>
        </div>
    );
};
