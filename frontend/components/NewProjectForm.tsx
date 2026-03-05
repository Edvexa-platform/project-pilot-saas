"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, Calendar, Tag, Layers, FileText, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { api } from '@/services/api';

interface NewProjectFormProps {
    initialData?: {
        id?: number;
        title: string;
        description: string;
        category: string;
        tech_stack: string;
        deadline: string;
    };
    isEdit?: boolean;
}

export const NewProjectForm = ({ initialData, isEdit = false }: NewProjectFormProps) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        description: initialData?.description || '',
        category: initialData?.category || '',
        tech_stack: initialData?.tech_stack || '',
        deadline: initialData?.deadline || '',
    });

    const categories = [
        "Artificial Intelligence", "Machine Learning", "Web Development",
        "IoT", "Cybersecurity", "Blockchain", "Data Science"
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title || !formData.category) return;

        setLoading(true);

        try {
            if (isEdit && initialData?.id) {
                await api.updateProject(initialData.id, formData);
            } else {
                await api.createProject(formData);
            }
            setLoading(false);
            router.push('/dashboard?refresh=true');
        } catch (error) {
            console.error("Save failed:", error);
            setLoading(false);
            alert("Failed to save project. Please check your connection.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="title">Project Title</Label>
                <div className="relative">
                    <FileText className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                        id="title"
                        placeholder="e.g. Smart Attendance System"
                        className="pl-10 bg-white/50 dark:bg-zinc-900/50"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="description">Project Description</Label>
                <textarea
                    id="description"
                    placeholder="Briefly describe your project goals..."
                    className="flex min-h-[100px] w-full rounded-md border border-input bg-white/50 dark:bg-zinc-900/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <div className="relative">
                        <Tag className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                        <select
                            id="category"
                            className="flex h-10 w-full rounded-md border border-input bg-white/50 dark:bg-zinc-900/50 px-9 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 appearance-none"
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            required
                        >
                            <option value="" disabled>Select category</option>
                            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="techStack">Tech Stack</Label>
                    <div className="relative">
                        <Layers className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                        <Input
                            id="techStack"
                            placeholder="e.g. React, Python, OpenCV"
                            className="pl-10 bg-white/50 dark:bg-zinc-900/50"
                            value={formData.tech_stack}
                            onChange={(e) => setFormData({ ...formData, tech_stack: e.target.value })}
                            required
                        />
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="deadline">Deadline</Label>
                <div className="relative">
                    <Calendar className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                        id="deadline"
                        type="date"
                        className="pl-10 bg-white/50 dark:bg-zinc-900/50"
                        value={formData.deadline}
                        onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                        required
                    />
                </div>
            </div>

            <div className="flex gap-4 pt-4">
                <Button
                    type="button"
                    variant="outline"
                    className="flex-1 rounded-xl"
                    onClick={() => router.push('/dashboard')}
                >
                    <X className="w-4 h-4 mr-2" /> Cancel
                </Button>
                <Button
                    type="submit"
                    disabled={loading}
                    className="flex-1 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground group"
                >
                    {loading ? (
                        isEdit ? "Saving..." : "Creating..."
                    ) : (
                        <>
                            <Check className="w-4 h-4 mr-2" /> {isEdit ? "Save Changes" : "Create Project"}
                            <Sparkles className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </>
                    )}
                </Button>
            </div>
        </form>
    );
};
