"use client";

import React, { useRef, ReactNode } from "react";
import { useParallax } from "../hooks/useParallax";
import { cn } from "../lib/utils";

interface ParallaxWrapperProps {
    children: ReactNode;
    className?: string;
    perspective?: number;
    sensitivity?: number;
}

export const ParallaxWrapper = ({
    children,
    className,
    perspective = 1500,
    sensitivity = 0.5,
}: ParallaxWrapperProps) => {
    const wrapperRef = useRef<HTMLDivElement>(null);

    // Initialize parallax tracking for this specific wrapper's context
    useParallax({ sensitivity });

    return (
        <div
            ref={wrapperRef}
            className={cn("relative overflow-hidden w-full h-full", className)}
            style={{
                perspective: `${perspective}px`,
                transformStyle: "preserve-3d",
            }}
        >
            {children}
        </div>
    );
};
