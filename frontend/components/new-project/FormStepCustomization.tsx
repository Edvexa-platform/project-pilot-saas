"use client";

import { useFormContext } from "react-hook-form";
import { ProjectFormData } from "@/utils/projectSchema";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";

const TECH_STACK_OPTIONS = [
    "React", "Next.js", "Node.js", "Python", "FastAPI", "Django",
    "TensorFlow", "PyTorch", "OpenCV", "MongoDB", "PostgreSQL",
    "AWS", "Firebase", "Docker"
];

export const FormStepCustomization = () => {
    const { register, watch, setValue, formState: { errors } } = useFormContext<ProjectFormData>();

    const selectedStack = watch("customization.techStack") || [];
    const reportFormat = watch("customization.reportFormat");
    const pptTheme = watch("customization.pptTheme");

    const toggleTech = (tech: string) => {
        if (selectedStack.includes(tech)) {
            setValue("customization.techStack", selectedStack.filter(t => t !== tech));
        } else {
            setValue("customization.techStack", [...selectedStack, tech]);
        }
    };

    return (
        <div className="space-y-8 animate-fade-in-up">
            {/* Tech Stack Selector */}
            <div className="space-y-4">
                <div className="flex justify-between items-end">
                    <Label className="text-foreground text-base">Technology Stack</Label>
                    <span className="text-xs text-muted-foreground">{selectedStack.length} selected</span>
                </div>
                <div className="flex flex-wrap gap-2">
                    {TECH_STACK_OPTIONS.map((tech) => {
                        const isSelected = selectedStack.includes(tech);
                        return (
                            <button
                                key={tech}
                                type="button"
                                onClick={() => toggleTech(tech)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm transition-all duration-300 ${isSelected
                                        ? "bg-foreground text-background border-foreground shadow-md"
                                        : "bg-transparent text-foreground border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600"
                                    }`}
                            >
                                {tech}
                                {isSelected && <Check className="w-3 h-3" />}
                            </button>
                        );
                    })}
                </div>
                {errors.customization?.techStack && (
                    <p className="text-sm text-red-500">{errors.customization.techStack.message}</p>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="reportFormat" className="text-foreground">Report Format Standard</Label>
                    <select
                        id="reportFormat"
                        {...register("customization.reportFormat")}
                        className="flex h-10 w-full rounded-md border border-zinc-200 bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800"
                    >
                        <option value="standard">Standard College Format</option>
                        <option value="ieee">IEEE Double Column</option>
                        <option value="acm">ACM Format</option>
                        <option value="apa">APA Style</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="pptTheme" className="text-foreground">Presentation Theme</Label>
                    <select
                        id="pptTheme"
                        {...register("customization.pptTheme")}
                        className="flex h-10 w-full rounded-md border border-zinc-200 bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800"
                    >
                        <option value="minimal">Minimal / Modern</option>
                        <option value="corporate">Corporate Professional</option>
                        <option value="creative">Creative Dynamic</option>
                        <option value="dark">Dark Mode Focus</option>
                    </select>
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="customInstructions" className="text-foreground">Custom Instructions for AI (Optional)</Label>
                <textarea
                    id="customInstructions"
                    placeholder="e.g. Ensure the report mentions Professor Smith's research on neural networks in chapter 2..."
                    {...register("customization.customInstructions")}
                    className="flex min-h-[100px] w-full rounded-md border border-zinc-200 bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 resize-none"
                />
                <p className="text-xs text-muted-foreground text-right">
                    Instruct the AI on specific requirements or constraints.
                </p>
            </div>
        </div>
    );
};
