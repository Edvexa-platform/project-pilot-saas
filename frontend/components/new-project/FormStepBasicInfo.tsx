"use client";

import { useFormContext } from "react-hook-form";
import { ProjectFormData } from "@/utils/projectSchema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const FormStepBasicInfo = () => {
    const { register, formState: { errors }, watch, setValue } = useFormContext<ProjectFormData>();
    const teamType = watch("teamType");

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="title" className="text-foreground">Project Title</Label>
                <Input
                    id="title"
                    placeholder="e.g. AI-Powered Smart Attendance System"
                    {...register("title")}
                    className="bg-transparent border-zinc-200 dark:border-zinc-800 focus:ring-foreground"
                />
                {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="domain" className="text-foreground">Domain</Label>
                    <select
                        id="domain"
                        {...register("domain")}
                        className="flex h-10 w-full rounded-md border border-zinc-200 bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800"
                    >
                        <option value="" disabled>Select domain</option>
                        <option value="Artificial Intelligence">Artificial Intelligence</option>
                        <option value="Machine Learning">Machine Learning</option>
                        <option value="Web Development">Web Development</option>
                        <option value="IoT">Internet of Things (IoT)</option>
                        <option value="Cybersecurity">Cybersecurity</option>
                    </select>
                    {errors.domain && <p className="text-sm text-red-500">{errors.domain.message}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="academicLevel" className="text-foreground">Academic Level</Label>
                    <select
                        id="academicLevel"
                        {...register("academicLevel")}
                        className="flex h-10 w-full rounded-md border border-zinc-200 bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800"
                    >
                        <option value="" disabled>Select level</option>
                        <option value="Diploma">Diploma</option>
                        <option value="BTech / BE">BTech / BE</option>
                        <option value="MTech / ME">MTech / ME</option>
                        <option value="PhD">PhD</option>
                    </select>
                    {errors.academicLevel && <p className="text-sm text-red-500">{errors.academicLevel.message}</p>}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="language" className="text-foreground">Primary Language</Label>
                    <select
                        id="language"
                        {...register("language")}
                        className="flex h-10 w-full rounded-md border border-zinc-200 bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800"
                    >
                        <option value="" disabled>Select language</option>
                        <option value="Python">Python</option>
                        <option value="JavaScript / TypeScript">JavaScript / TypeScript</option>
                        <option value="Java">Java</option>
                        <option value="C++">C++</option>
                        <option value="Go">Go</option>
                    </select>
                    {errors.language && <p className="text-sm text-red-500">{errors.language.message}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="deadline" className="text-foreground">Submission Deadline</Label>
                    <Input
                        id="deadline"
                        type="date"
                        {...register("deadline")}
                        className="bg-transparent border-zinc-200 dark:border-zinc-800 focus:ring-foreground"
                    />
                    {errors.deadline && <p className="text-sm text-red-500">{errors.deadline.message}</p>}
                </div>
            </div>

            <div className="space-y-3 pt-4">
                <Label className="text-foreground">Team Setup</Label>
                <div className="flex bg-zinc-100 dark:bg-zinc-900/50 p-1 rounded-lg w-max">
                    <button
                        type="button"
                        onClick={() => setValue("teamType", "individual")}
                        className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-300 ${teamType === "individual" ? "bg-white dark:bg-zinc-800 shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                            }`}
                    >
                        Individual
                    </button>
                    <button
                        type="button"
                        onClick={() => setValue("teamType", "team")}
                        className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-300 ${teamType === "team" ? "bg-white dark:bg-zinc-800 shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                            }`}
                    >
                        Team
                    </button>
                </div>
            </div>
        </div>
    );
};
