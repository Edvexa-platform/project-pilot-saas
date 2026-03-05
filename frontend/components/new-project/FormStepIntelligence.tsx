"use client";

import { useFormContext } from "react-hook-form";
import { ProjectFormData } from "@/utils/projectSchema";
import { Label } from "@/components/ui/label";
import { Brain, Database, Rocket, BookOpen, Presentation, Code } from "lucide-react";

export const FormStepIntelligence = () => {
    const { register, watch, setValue } = useFormContext<ProjectFormData>();

    const difficulty = watch("difficulty");
    const projectType = watch("projectType");
    const features = watch("features");

    const FeatureToggle = ({ id, label, description, icon: Icon, value }: any) => (
        <label
            htmlFor={`feature-${id}`}
            className={`border rounded-xl p-4 flex gap-4 cursor-pointer transition-all duration-300 ${value
                    ? "border-foreground bg-foreground/5 shadow-[0_0_15px_rgba(var(--foreground-rgb),0.05)]"
                    : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 bg-transparent"
                }`}
        >
            <div className="flex h-5 w-5 items-center justify-center mt-1">
                <input
                    id={`feature-${id}`}
                    type="checkbox"
                    className="peer sr-only"
                    checked={value}
                    onChange={(e) => setValue(`features.${id}` as any, e.target.checked)}
                />
                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${value ? "bg-foreground border-foreground text-background" : "border-zinc-300 dark:border-zinc-700"
                    }`}>
                    {value && <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 stroke-current stroke-[2]"><path d="M3 7.5L6 10.5L11 3.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                </div>
            </div>
            <div>
                <div className="flex items-center gap-2 mb-1">
                    <Icon className="w-4 h-4 text-muted-foreground" />
                    <span className="font-semibold text-foreground">{label}</span>
                </div>
                <p className="text-sm text-muted-foreground">{description}</p>
            </div>
        </label>
    );

    return (
        <div className="space-y-8 animate-fade-in-up">
            {/* Scope Toggles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <Label className="text-foreground text-base">Difficulty Level</Label>
                    <div className="flex flex-col gap-2">
                        {[
                            { id: "beginner", title: "Beginner", desc: "Standard academic scope" },
                            { id: "intermediate", title: "Intermediate", desc: "Includes advanced modules" },
                            { id: "advanced", title: "Advanced", desc: "Production-ready scale" }
                        ].map(level => (
                            <button
                                key={level.id}
                                type="button"
                                onClick={() => setValue("difficulty", level.id as any)}
                                className={`text-left p-3 rounded-lg border transition-all duration-200 ${difficulty === level.id
                                        ? "border-foreground bg-foreground/5"
                                        : "border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900/50"
                                    }`}
                            >
                                <div className="font-medium text-foreground">{level.title}</div>
                                <div className="text-xs text-muted-foreground">{level.desc}</div>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <Label className="text-foreground text-base">Project Target Focus</Label>
                    <div className="flex flex-col gap-2">
                        {[
                            { id: "research", title: "Research Heavy", icon: BookOpen },
                            { id: "implementation", title: "Implementation Focused", icon: Code },
                            { id: "hybrid", title: "Hybrid (Research + Code)", icon: Brain }
                        ].map(type => (
                            <button
                                key={type.id}
                                type="button"
                                onClick={() => setValue("projectType", type.id as any)}
                                className={`text-left p-3 rounded-lg border transition-all duration-200 flex items-center gap-3 ${projectType === type.id
                                        ? "border-foreground bg-foreground/5"
                                        : "border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900/50"
                                    }`}
                            >
                                <type.icon className={`w-5 h-5 ${projectType === type.id ? "text-foreground" : "text-muted-foreground"}`} />
                                <div className="font-medium text-foreground">{type.title}</div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="h-px bg-zinc-200 dark:bg-zinc-800 w-full" />

            {/* Smart Toggles */}
            <div className="space-y-4">
                <Label className="text-foreground text-base">AI Intelligent Inclusions</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FeatureToggle
                        id="dataset"
                        label="Real-World Dataset"
                        description="Auto-generate or search for authentic dataset sources."
                        icon={Database}
                        value={features?.dataset}
                    />
                    <FeatureToggle
                        id="deployment"
                        label="Deployment Guide"
                        description="Include step-by-step local & cloud deployment docs."
                        icon={Rocket}
                        value={features?.deployment}
                    />
                    <FeatureToggle
                        id="researchRefs"
                        label="Research Papers"
                        description="Embed IEEE/ACM paper citations in the final report."
                        icon={BookOpen}
                        value={features?.researchRefs}
                    />
                    <FeatureToggle
                        id="vivaPrep"
                        label="Viva Assistant"
                        description="Generate a Q&A script predicting examiner questions."
                        icon={Presentation}
                        value={features?.vivaPrep}
                    />
                </div>
            </div>
        </div>
    );
};
