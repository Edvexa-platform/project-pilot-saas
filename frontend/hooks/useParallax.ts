"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface ParallaxOptions {
    sensitivity?: number;
    friction?: number;
    mobileEnabled?: boolean;
}

export const useParallax = (options: ParallaxOptions = {}) => {
    const {
        sensitivity = 0.5,
        friction = 0.1,
        mobileEnabled = false,
    } = options;

    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [scrollPos, setScrollPos] = useState(0);

    // Target values to lerp towards
    const targetX = useRef(0);
    const targetY = useRef(0);
    const targetScroll = useRef(0);

    // Current interpolated values
    const currentX = useRef(0);
    const currentY = useRef(0);
    const currentScroll = useRef(0);

    const requestRef = useRef<number>();

    const isMobile = typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches;
    const prefersReducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const animate = useCallback(() => {
        // Linear interpolation (lerp) for smooth movement
        currentX.current += (targetX.current - currentX.current) * friction;
        currentY.current += (targetY.current - currentY.current) * friction;
        currentScroll.current += (targetScroll.current - currentScroll.current) * friction;

        setMousePos({ x: currentX.current, y: currentY.current });
        setScrollPos(currentScroll.current);

        requestRef.current = requestAnimationFrame(animate);
    }, [friction]);

    useEffect(() => {
        if (prefersReducedMotion || (isMobile && !mobileEnabled)) return;

        const handleMouseMove = (e: MouseEvent) => {
            // Normalize mouse coordinates from -1 to 1
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = (e.clientY / window.innerHeight) * 2 - 1;
            targetX.current = x * sensitivity;
            targetY.current = y * sensitivity;
        };

        const handleScroll = () => {
            targetScroll.current = window.scrollY;
        };

        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        window.addEventListener("scroll", handleScroll, { passive: true });

        requestRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("scroll", handleScroll);
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [isMobile, mobileEnabled, prefersReducedMotion, animate, sensitivity]);

    return { mousePos, scrollPos };
};
