"use client";

import React, { ReactNode } from "react";
import { useParallax } from "../hooks/useParallax";
import { cn } from "../lib/utils";

interface ParallaxLayerProps {
    children: ReactNode;
    className?: string;
    depth?: number; // Distance on Z axis (larger = further away/slower)
    scale?: number; // Base scale compensation for depth
}

export const ParallaxLayer = ({
    children,
    className,
    depth = 1,
    scale = 1.1,
}: ParallaxLayerProps) => {
    const { mousePos, scrollPos } = useParallax();

    // Calculate parallax offsets based on depth ratio
    const invertDepth = 1 / depth;
    const xOffset = mousePos.x * 20 * invertDepth;
    const yOffset = mousePos.y * 20 * invertDepth;

    // Vertical scroll parallax (moves slower the further it is)
    const scrollOffset = scrollPos * 0.2 * invertDepth;

    return (
        <div
            className={cn(
                "absolute inset-0 w-full h-full will-change-transform",
                className
            )}
            style={{
                transform: `translate3d(${xOffset}px, ${yOffset - scrollOffset}px, -${depth * 100}px) scale(${scale + depth * 0.05})`,
                transformStyle: "preserve-3d",
            }}
        >
            {children}
        </div>
    );
};
