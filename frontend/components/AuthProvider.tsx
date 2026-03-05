"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api, User } from "../services/api";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    signup: (email: string, password: string, name?: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as any);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("refresh_token");
        setUser(null);
        router.push("/login");
    };

    const handleRefresh = async () => {
        const refreshToken = localStorage.getItem("refresh_token");
        if (!refreshToken) {
            logout();
            return;
        }
        try {
            const data = await api.refreshToken(refreshToken);
            localStorage.setItem("token", data.access_token);
            localStorage.setItem("refresh_token", data.refresh_token);
        } catch (e) {
            logout();
        }
    };

    useEffect(() => {
        const initAuth = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const userData = await api.getMe();
                    setUser(userData);
                } catch (e) {
                    await handleRefresh();
                    const userData = await api.getMe().catch(() => null);
                    if (userData) setUser(userData);
                    else logout();
                }
            }
            setLoading(false);
        };
        initAuth();
    }, []);

    // Periodic refresh every 14 minutes (Access token is 15m)
    useEffect(() => {
        const interval = setInterval(() => {
            if (localStorage.getItem("token")) {
                handleRefresh();
            }
        }, 14 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    const login = async (email: string, password: string) => {
        const data = await api.login(email, password);
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("refresh_token", data.refresh_token);
        const userData = await api.getMe();
        setUser(userData);
        router.push("/dashboard");
    };

    const signup = async (email: string, password: string, name?: string) => {
        await api.register({ email, password, name });
        await login(email, password);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
