"use client";

import { useEffect, useState } from "react";

interface DynamicBlurOptions {
    minBlur?: number;
    maxBlur?: number;
    scrollThreshold?: number;
}

export const useDynamicBlur = ({
    minBlur = 8,
    maxBlur = 24,
    scrollThreshold = 300,
}: DynamicBlurOptions = {}) => {
    const [blurValue, setBlurValue] = useState(minBlur);

    useEffect(() => {
        let ticking = false;

        const updateBlur = () => {
            const scrollY = window.scrollY;

            // Calculate blur based on scroll progress against the threshold
            const progress = Math.min(scrollY / scrollThreshold, 1);
            const currentBlur = minBlur + (maxBlur - minBlur) * progress;

            setBlurValue(currentBlur);

            // Update css variable globally
            document.documentElement.style.setProperty('--glass-blur', `${currentBlur}px`);

            ticking = false;
        };

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(updateBlur);
                ticking = true;
            }
        };

        // Initial calculation
        updateBlur();

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [minBlur, maxBlur, scrollThreshold]);

    return blurValue;
};
