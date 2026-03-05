"use client";

import React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { NewProjectForm } from '@/components/NewProjectForm';
import { useEffect, useState, Suspense } from 'react';

function NewProjectContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const projectId = searchParams.get('id');
    const [projectData, setProjectData] = useState<any>(null);
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        if (projectId) {
            const projects = JSON.parse(localStorage.getItem('user_projects') || '[]');
            const project = projects.find((p: any) => p.id === projectId);
            if (project) {
                setProjectData(project);
                setIsEdit(true);
            }
        }
    }, [projectId]);

    return (
        <div className="max-w-3xl mx-auto">
            {/* Header Section */}
            <div className="mb-10 flex items-center justify-between">
                <button
                    onClick={() => router.push('/dashboard')}
                    className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-all duration-300"
                >
                    <div className="p-2 rounded-full border border-border group-hover:scale-110 transition-transform">
                        <ArrowLeft className="w-4 h-4" />
                    </div>
                    Back to Dashboard
                </button>

                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary animate-fade-in text-xs font-bold uppercase tracking-widest">
                    <Sparkles className="w-3 h-3" />
                    {isEdit ? 'Edit Mode' : 'New Project'}
                </div>
            </div>

            {/* Form Container */}
            <div className="relative p-8 rounded-3xl ios-card bg-white/40 dark:bg-zinc-950/40 backdrop-blur-2xl border border-white/20 dark:border-white/5 shadow-2xl animate-fade-in-up">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">
                        {isEdit ? 'Edit Project' : 'Create New Project'}
                    </h1>
                    <p className="text-muted-foreground text-sm">
                        {isEdit
                            ? 'Update your project details and specifications.'
                            : 'Fill in the details below to start your next academic journey with AI.'}
                    </p>
                </div>

                <NewProjectForm initialData={projectData} isEdit={isEdit} />
            </div>
        </div>
    );
}

export default function NewProjectPage() {
    return (
        <div className="min-h-screen bg-transparent pt-8 pb-20 px-4">
            <Suspense fallback={<div className="max-w-3xl mx-auto p-8 text-center text-muted-foreground">Loading...</div>}>
                <NewProjectContent />
            </Suspense>

            {/* Decorative elements */}
            <div className="fixed top-1/4 -right-20 w-80 h-80 bg-primary/5 rounded-full blur-[100px] -z-10" />
            <div className="fixed bottom-1/4 -left-20 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px] -z-10" />
        </div>
    );
}
