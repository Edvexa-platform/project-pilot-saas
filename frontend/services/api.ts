
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

export interface User {
    id: number;
    email: string;
    is_active: boolean;
    email_verified: boolean;
    role: string;
    plan: string;
    created_at: string;
    updated_at: string;
    name?: string;
    last_login?: string;
    avatar_url?: string;
}

export interface TokenResponse {
    access_token: string;
    refresh_token: string;
    token_type: string;
}

export interface ProjectRequest {
    api_key: string;
    domain: string;
    topic?: string;
    difficulty: string;
    tech_stack: string;
    year: string;
}

// Helper to get token
const getToken = () => typeof window !== 'undefined' ? localStorage.getItem('token') : null;

const authHeaders = () => ({
    "Content-Type": "application/json",
    "Authorization": `Bearer ${getToken()}`
})

export const api = {
    // Auth
    login: async (email: string, password: string): Promise<TokenResponse> => {
        const formData = new URLSearchParams();
        formData.append('username', email); // OAuth2 form uses 'username' for email
        formData.append('password', password);

        const res = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: formData,
        });
        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.detail || 'Login failed');
        }
        return res.json();
    },

    register: async (data: { email: string; password: string; name?: string }): Promise<User> => {
        const res = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.detail || 'Registration failed');
        }
        return res.json();
    },

    refreshToken: async (refresh_token: string): Promise<TokenResponse> => {
        const res = await fetch(`${API_BASE_URL}/auth/refresh`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refresh_token }),
        });
        if (!res.ok) throw new Error('Session expired');
        return res.json();
    },

    forgotPassword: async (email: string) => {
        const res = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        });
        if (!res.ok) throw new Error('Failed to send reset email');
        return res.json();
    },

    resetPassword: async (token: string, new_password: string) => {
        const res = await fetch(`${API_BASE_URL}/auth/reset-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token, new_password }),
        });
        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.detail || 'Password reset failed');
        }
        return res.json();
    },

    getMe: async () => {
        const res = await fetch(`${API_BASE_URL}/users/me`, {
            headers: authHeaders(),
        });
        if (!res.ok) throw new Error('Not authorized');
        return res.json();
    },

    updatePassword: async (currentPassword: string, newPassword: string) => {
        const res = await fetch(`${API_BASE_URL}/users/me/password`, {
            method: 'PUT',
            headers: authHeaders(),
            body: JSON.stringify({ current_password: currentPassword, new_password: newPassword }),
        });
        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.detail || 'Password update failed');
        }
        return res.json();
    },

    // Project CRUD
    getProjects: async () => {
        const res = await fetch(`${API_BASE_URL}/projects/`, {
            headers: authHeaders(),
        });
        if (!res.ok) throw new Error('Failed to fetch projects');
        return res.json();
    },

    getProject: async (id: number) => {
        const res = await fetch(`${API_BASE_URL}/projects/${id}`, {
            headers: authHeaders(),
        });
        if (!res.ok) throw new Error('Failed to fetch project');
        return res.json();
    },

    createProject: async (data: any) => {
        const res = await fetch(`${API_BASE_URL}/projects/`, {
            method: 'POST',
            headers: authHeaders(),
            body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error('Failed to create project');
        return res.json();
    },

    updateProject: async (id: number, data: any) => {
        const res = await fetch(`${API_BASE_URL}/projects/${id}`, {
            method: 'PUT',
            headers: authHeaders(),
            body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error('Failed to update project');
        return res.json();
    },

    deleteProject: async (id: number) => {
        const res = await fetch(`${API_BASE_URL}/projects/${id}`, {
            method: 'DELETE',
            headers: authHeaders(),
        });
        if (!res.ok) throw new Error('Failed to delete project');
        return true;
    },

    // Project Generation
    generateProject: async (data: ProjectRequest) => {
        const response = await fetch(`${API_BASE_URL}/projects/generate-raw`, {
            method: "POST",
            headers: authHeaders(),
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || "Generation failed");
        }
        return response.json();
    },

    triggerProjectGeneration: async (projectId: number, apiKey: string) => {
        const response = await fetch(`${API_BASE_URL}/projects/${projectId}/generate?api_key=${encodeURIComponent(apiKey)}`, {
            method: "POST",
            headers: authHeaders(),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || "Generation trigger failed");
        }
        return response.json();
    },

    // Downloads
    downloadReport: async (projectData: any) => {
        // If projectData is a number, it's a projectId for the new endpoint
        const url = typeof projectData === 'number'
            ? `${API_BASE_URL}/projects/${projectData}/download/report`
            : `${API_BASE_URL}/projects/download/report`;

        const options: any = {
            method: typeof projectData === 'number' ? "GET" : "POST",
            headers: typeof projectData === 'number' ? authHeaders() : { "Content-Type": "application/json" },
        };
        if (typeof projectData !== 'number') options.body = JSON.stringify(projectData);

        const response = await fetch(url, options);
        if (!response.ok) throw new Error("Report download failed");
        return response.blob();
    },

    downloadPPT: async (projectData: any) => {
        const url = typeof projectData === 'number'
            ? `${API_BASE_URL}/projects/${projectData}/download/ppt`
            : `${API_BASE_URL}/projects/download/ppt`;

        const options: any = {
            method: typeof projectData === 'number' ? "GET" : "POST",
            headers: typeof projectData === 'number' ? authHeaders() : { "Content-Type": "application/json" },
        };
        if (typeof projectData !== 'number') options.body = JSON.stringify(projectData);

        const response = await fetch(url, options);
        if (!response.ok) throw new Error("PPT download failed");
        return response.blob();
    },

    downloadCode: async (projectData: any) => {
        const url = typeof projectData === 'number'
            ? `${API_BASE_URL}/projects/${projectData}/download/code`
            : `${API_BASE_URL}/projects/download/code`;

        const options: any = {
            method: typeof projectData === 'number' ? "GET" : "POST",
            headers: typeof projectData === 'number' ? authHeaders() : { "Content-Type": "application/json" },
        };
        if (typeof projectData !== 'number') options.body = JSON.stringify(projectData);

        const response = await fetch(url, options);
        if (!response.ok) throw new Error("Code download failed");
        return response.blob();
    }
};
