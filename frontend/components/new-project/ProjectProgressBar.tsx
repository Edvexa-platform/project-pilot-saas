"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export const steps = [
    { id: 1, title: "Basic Info" },
    { id: 2, title: "Intelligence" },
    { id: 3, title: "Customization" },
    { id: 4, title: "Review" },
];

interface ProjectProgressBarProps {
    currentStep: number;
}

export const ProjectProgressBar = ({ currentStep }: ProjectProgressBarProps) => {
    return (
        <div className="w-full py-6">
            <div className="max-w-3xl mx-auto px-4">
                <div className="relative flex justify-between">
                    {/* Progress Line */}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-zinc-200 dark:bg-zinc-800 rounded-full" />

                    <div
                        className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-foreground transition-all duration-500 ease-cinematic rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)] dark:shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                        style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                    />

                    {/* Steps */}
                    {steps.map((step) => {
                        const isCompleted = currentStep > step.id;
                        const isCurrent = currentStep === step.id;

                        return (
                            <div key={step.id} className="relative z-10 flex flex-col items-center gap-2">
                                <div
                                    className={cn(
                                        "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-500 ease-cinematic border-2",
                                        isCompleted
                                            ? "bg-foreground border-foreground text-background"
                                            : isCurrent
                                                ? "bg-background border-foreground text-foreground shadow-[0_0_15px_rgba(var(--foreground-rgb),0.3)]"
                                                : "bg-background border-zinc-200 dark:border-zinc-800 text-muted-foreground"
                                    )}
                                >
                                    {isCompleted ? <Check className="w-5 h-5" /> : step.id}
                                </div>
                                <span
                                    className={cn(
                                        "text-xs font-semibold uppercase tracking-wider transition-colors duration-300 absolute -bottom-6 w-max text-center",
                                        isCurrent ? "text-foreground" : "text-muted-foreground"
                                    )}
                                >
                                    {step.title}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
