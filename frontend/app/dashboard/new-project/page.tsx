"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ArrowLeft, Sparkles, Check, MonitorPlay, Layers, FileText } from 'lucide-react';
import { NewProjectForm } from '@/components/NewProjectForm';
import { api } from '@/services/api';
import { Button } from '@/components/ui/button';

function NewProjectContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const projectId = searchParams.get('id');
    const [projectData, setProjectData] = useState<any>(null);
    const [isEdit, setIsEdit] = useState(false);

    // Generation States
    const [generating, setGenerating] = useState(false);
    const [genStatus, setGenStatus] = useState('');
    const [genProgress, setGenProgress] = useState(0);

    useEffect(() => {
        const fetchProject = async () => {
            if (projectId) {
                try {
                    const project = await api.getProject(parseInt(projectId));
                    setProjectData(project);
                    setIsEdit(true);
                } catch (error) {
                    console.error("Failed to fetch project:", error);
                }
            }
        };
        fetchProject();
    }, [projectId]);

    const handleGenerate = async () => {
        if (!projectId) return;
        setGenerating(true);
        setGenProgress(10);
        setGenStatus('Connecting to AI Engine...');

        try {
            // Simulate progress phases
            const progressSteps = [
                { status: 'Analyzing requirements...', progress: 20 },
                { status: 'Generating abstract and problem statement...', progress: 40 },
                { status: 'Designing system architecture...', progress: 60 },
                { status: 'Composing technology stack details...', progress: 75 },
                { status: 'Building project codebase structure...', progress: 90 },
            ];

            let i = 0;
            const interval = setInterval(() => {
                if (i < progressSteps.length) {
                    setGenStatus(progressSteps[i].status);
                    setGenProgress(progressSteps[i].progress);
                    i++;
                } else {
                    clearInterval(interval);
                }
            }, 2000);

            // Fetch API key if needed (assuming backend handles if empty for now or falls back)
            const apiKey = localStorage.getItem('groq_api_key') || '';

            await api.triggerProjectGeneration(parseInt(projectId), apiKey);

            clearInterval(interval);
            setGenProgress(100);
            setGenStatus('Generation Complete!');

            // Refresh project data
            const updated = await api.getProject(parseInt(projectId));
            setProjectData(updated);

            setTimeout(() => setGenerating(false), 1500);
        } catch (error) {
            console.error("Generation failed:", error);
            setGenStatus('Generation Failed');
            alert("Project generation failed. Please check your AI API key setting.");
            setGenerating(false);
        }
    };

    const handleDownload = async (type: 'report' | 'ppt' | 'code') => {
        if (!projectId) return;
        try {
            let blob;
            if (type === 'report') blob = await api.downloadReport(parseInt(projectId));
            else if (type === 'ppt') blob = await api.downloadPPT(parseInt(projectId));
            else blob = await api.downloadCode(parseInt(projectId));

            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${projectData?.title || 'project'}_${type}.${type === 'report' ? 'docx' : type === 'ppt' ? 'pptx' : 'zip'}`;
            document.body.appendChild(a);
            a.click();
            a.remove();
        } catch (error) {
            console.error("Download failed:", error);
            alert("Failed to download file.");
        }
    };

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
                    {isEdit ? 'Project Hub' : 'New Project'}
                </div>
            </div>

            {/* Main Container */}
            <div className="relative p-8 rounded-3xl ios-card bg-white/40 dark:bg-zinc-950/40 backdrop-blur-2xl border border-white/20 dark:border-white/5 shadow-2xl animate-fade-in-up">
                <div className="mb-8 flex flex-col md:flex-row justify-between items-start gap-4">
                    <div className="max-w-md">
                        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">
                            {isEdit ? projectData?.title || 'Project Details' : 'Create New Project'}
                        </h1>
                        <p className="text-muted-foreground text-sm">
                            {isEdit
                                ? 'Review requirements or generate project artifacts below.'
                                : 'Define your project details to start your AI-powered generation.'}
                        </p>
                    </div>

                    {isEdit && (
                        <Button
                            onClick={handleGenerate}
                            disabled={generating}
                            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl px-6 py-6 shadow-xl shadow-primary/20 group transition-all duration-500 hover:scale-105 active:scale-95"
                        >
                            {generating ? (
                                <span className="flex items-center gap-3">
                                    <div className="w-5 h-5 border-3 border-white/20 border-t-white rounded-full animate-spin" />
                                    Processing...
                                </span>
                            ) : (
                                <span className="flex items-center gap-2">
                                    <Sparkles className="w-5 h-5 animate-pulse" />
                                    Generate Files
                                </span>
                            )}
                        </Button>
                    )}
                </div>

                {/* Progress UI */}
                {generating && (
                    <div className="mb-8 p-6 rounded-2xl bg-primary/5 border border-primary/10 overflow-hidden relative">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-semibold text-primary">{genStatus}</span>
                            <span className="text-xs font-medium text-primary/60">{genProgress}%</span>
                        </div>
                        <div className="w-full h-3 bg-primary/10 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-primary transition-all duration-700 ease-out"
                                style={{ width: `${genProgress}%` }}
                            />
                        </div>
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 translate-x-[-100%] animate-[shimmer_2s_infinite]" />
                    </div>
                )}

                {/* Success/Download UI */}
                {isEdit && projectData?.generated_at && !generating && (
                    <div className="mb-8 p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 flex flex-col sm:flex-row gap-6 items-center animate-in zoom-in-95 duration-500">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold mb-1">
                                <div className="p-1 rounded-full bg-emerald-500 text-white">
                                    <Check className="w-3 h-3" />
                                </div>
                                Project Built Successfully
                            </div>
                            <p className="text-xs text-muted-foreground ml-7">
                                Last built: {new Date(projectData.generated_at).toLocaleString()}
                            </p>
                        </div>
                        <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
                            {[
                                { id: 'report', label: 'Report', icon: FileText, color: 'blue' },
                                { id: 'ppt', label: 'PPT', icon: MonitorPlay, color: 'orange' },
                                { id: 'code', label: 'Code', icon: Layers, color: 'indigo' }
                            ].map(item => (
                                <Button
                                    key={item.id}
                                    size="sm"
                                    variant="outline"
                                    className="rounded-xl flex-1 sm:flex-none h-12 px-4 border-emerald-500/20 hover:bg-emerald-500/10 hover:border-emerald-500/40 transition-all"
                                    onClick={() => handleDownload(item.id as any)}
                                >
                                    <item.icon className={`w-4 h-4 mr-2 text-${item.color}-500`} />
                                    {item.label}
                                </Button>
                            ))}
                        </div>
                    </div>
                )}

                <div className={`${generating ? 'opacity-50 pointer-events-none grayscale' : ''} transition-all duration-500`}>
                    <NewProjectForm initialData={projectData} isEdit={isEdit} />
                </div>
            </div>
        </div>
    );
}

export default function NewProjectPage() {
    return (
        <div className="min-h-screen bg-transparent pt-8 pb-20 px-4">
            <Suspense fallback={<div className="max-w-3xl mx-auto p-12 text-center">
                <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4" />
                <p className="text-muted-foreground animate-pulse">Loading project workspace...</p>
            </div>}>
                <NewProjectContent />
            </Suspense>

            {/* Decorative backgrounds */}
            <div className="fixed top-1/4 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -z-10 animate-pulse" />
            <div className="fixed bottom-1/4 -left-20 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] -z-10 animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
    );
}
