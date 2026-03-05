"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectSchema, ProjectFormData, defaultProjectValues } from "../utils/projectSchema";

const LOCAL_STORAGE_KEY = "project_pilot_draft";

export const useProjectForm = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    // Initialize React Hook Form
    const form = useForm<ProjectFormData>({
        resolver: zodResolver(projectSchema),
        defaultValues: defaultProjectValues,
        mode: "onChange",
    });

    const { watch, reset, getValues } = form;

    // Load draft from localStorage on mount
    useEffect(() => {
        const savedDraft = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (savedDraft) {
            try {
                const parsed = JSON.parse(savedDraft);
                reset(parsed);
            } catch (e) {
                console.error("Failed to parse saved draft", e);
            }
        }
        setIsLoaded(true);
    }, [reset]);

    // Auto-save to localStorage on every change
    useEffect(() => {
        if (!isLoaded) return;

        const subscription = watch((value) => {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(value));
        });

        return () => subscription.unsubscribe();
    }, [watch, isLoaded]);

    // Handle manual draft saving
    const saveDraft = () => {
        const currentValues = getValues();
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(currentValues));
        // Here we would typically also dispatch a toast notification
    };

    // Handle clearing draft
    const clearDraft = () => {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        reset(defaultProjectValues);
    };

    return {
        form,
        isLoaded,
        saveDraft,
        clearDraft,
    };
};
