"use client";

import { useFormContext } from "react-hook-form";
import { ProjectFormData } from "@/utils/projectSchema";
import { Label } from "@/components/ui/label";
import { BrainCircuit, CheckCircle2, Clock, Zap } from "lucide-react";

export const FormStepReview = () => {
    const { watch, setValue } = useFormContext<ProjectFormData>();

    const title = watch("title");
    const domain = watch("domain");
    const level = watch("academicLevel");
    const techStack = watch("customization.techStack");
    const features = watch("features");
    const outputPackage = watch("outputOptions.package");

    // Simple mock intelligence calc based on features and tech
    const aiConfidence = Math.min(
        100,
        60 + (techStack?.length || 0) * 5 + (title?.length > 10 ? 10 : 0)
    );

    const estimatedTime = outputPackage === "full_package" ? "5-8 minutes" : "2-3 minutes";

    return (
        <div className="space-y-8 animate-fade-in-up">
            <div className="bg-zinc-100/50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 relative overflow-hidden">
                {/* Glow accent */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-green-500/20 rounded-full blur-[60px]" />

                <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start justify-between">
                    <div className="space-y-4 flex-1">
                        <div>
                            <h3 className="text-xl font-bold text-foreground mb-1">{title || "Untitled Project"}</h3>
                            <p className="text-muted-foreground text-sm flex items-center gap-2">
                                <span>{domain || "Any Domain"}</span> • <span>{level || "Any Level"}</span>
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {techStack?.map(tech => (
                                <span key={tech} className="px-2 py-1 bg-background rounded-md border text-xs text-foreground shrink-0">
                                    {tech}
                                </span>
                            ))}
                        </div>

                        <div className="flex items-center gap-4 text-sm mt-4">
                            <div className="flex items-center gap-1.5 text-foreground">
                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                                {Object.values(features || {}).filter(Boolean).length} Smart Features
                            </div>
                            <div className="flex items-center gap-1.5 text-foreground">
                                <Clock className="w-4 h-4 text-blue-500" />
                                ~{estimatedTime} Generation
                            </div>
                        </div>
                    </div>

                    <div className="bg-background border rounded-xl p-4 min-w-[180px] flex flex-col items-center justify-center gap-2 shadow-sm shrink-0">
                        <BrainCircuit className="w-8 h-8 text-indigo-500 mb-1" />
                        <div className="text-2xl font-bold text-foreground">{aiConfidence}%</div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">AI Confidence</div>
                        <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-1.5 rounded-full mt-2 overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-1000"
                                style={{ width: `${aiConfidence}%` }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <Label className="text-foreground text-base">Select Final Output Package</Label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                        { id: "report_only", title: "Report Only", icon: FileText, desc: "PDF/DOCX Document" },
                        { id: "report_ppt", title: "Report + PPT", icon: Presentation, desc: "Doc + Presentation" },
                        { id: "full_package", title: "Full System", icon: Zap, desc: "Everything + Code", premium: true }
                    ].map(pkg => (
                        <label
                            key={pkg.id}
                            className={`relative border rounded-xl p-4 flex flex-col items-center text-center gap-2 cursor-pointer transition-all duration-300 ${outputPackage === pkg.id
                                    ? "border-foreground bg-foreground/5 shadow-md scale-[1.02]"
                                    : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 bg-transparent"
                                }`}
                        >
                            <input
                                type="radio"
                                name="output_package"
                                value={pkg.id}
                                className="sr-only"
                                checked={outputPackage === pkg.id}
                                onChange={() => setValue("outputOptions.package", pkg.id as any)}
                            />
                            {pkg.premium && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-400 to-pink-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                                    Recommended
                                </div>
                            )}
                            <div className={`p-3 rounded-full ${outputPackage === pkg.id ? "bg-foreground text-background" : "bg-zinc-100 dark:bg-zinc-900 text-muted-foreground"}`}>
                                <pkg.icon className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="font-semibold text-foreground text-sm">{pkg.title}</div>
                                <div className="text-xs text-muted-foreground mt-0.5">{pkg.desc}</div>
                            </div>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
};
