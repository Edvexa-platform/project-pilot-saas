import { z } from "zod";

export const projectSchema = z.object({
    // Step 1: Basic Info
    title: z.string().min(5, "Title must be at least 5 characters").max(100, "Title is too long"),
    domain: z.string().min(1, "Please select a domain"),
    academicLevel: z.string().min(1, "Please select an academic level"),
    language: z.string().min(1, "Please select a programming language"),
    deadline: z.string().min(1, "Please set a deadline"), // Can refine to actual Date later
    teamType: z.enum(["individual", "team"]),

    // Step 2: Intelligence
    difficulty: z.enum(["beginner", "intermediate", "advanced"]),
    projectType: z.enum(["research", "implementation", "hybrid"]),
    features: z.object({
        dataset: z.boolean(),
        deployment: z.boolean(),
        researchRefs: z.boolean(),
        vivaPrep: z.boolean(),
    }),

    // Step 3: Customization
    customization: z.object({
        techStack: z.array(z.string()).min(1, "Select at least one technology"),
        reportFormat: z.string().min(1, "Select a report format"),
        pptTheme: z.string().min(1, "Select a PPT theme"),
        docStyle: z.string().min(1, "Select a documentation style"),
        customInstructions: z.string().max(1000, "Instructions too long").optional(),
    }),

    // Step 4: Output Options
    outputOptions: z.object({
        package: z.enum(["report_only", "report_ppt", "full_package"]),
        downloadFormat: z.enum(["pdf", "docx", "zip"]),
    }),
});

export type ProjectFormData = z.infer<typeof projectSchema>;

// Default values for the form
export const defaultProjectValues: ProjectFormData = {
    title: "",
    domain: "",
    academicLevel: "",
    language: "",
    deadline: "",
    teamType: "individual",
    difficulty: "intermediate",
    projectType: "implementation",
    features: {
        dataset: false,
        deployment: false,
        researchRefs: false,
        vivaPrep: false,
    },
    customization: {
        techStack: [],
        reportFormat: "standard",
        pptTheme: "minimal",
        docStyle: "standard",
        customInstructions: "",
    },
    outputOptions: {
        package: "full_package",
        downloadFormat: "zip",
    },
};
