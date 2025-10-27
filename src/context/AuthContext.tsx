import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import api, { storage } from "../api/axios";

export type Role = "Administrador" | "Guarda" | "Residente";

export interface User {
  id: string;
  email: string;
  nombre: string;
  roles: Role[];
  role?: Role; // compatibilidad
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  hasRole: (role: Role | string) => boolean;
  login: (params: { username: string; password: string; remember?: boolean }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(storage.get());

  useEffect(() => {
    const t = storage.get();
    if (t) {
      api.defaults.headers.common.Authorization = `Bearer ${t}`;
      setToken(t);
      const raw = localStorage.getItem("auth.user");
      if (raw) {
        try { setUser(JSON.parse(raw)); } catch {}
      }
    }
  }, []);

  const login: AuthContextType["login"] = async ({ username, password, remember = false }) => {
    try {
      const { data } = await api.post("/api/Auth/login", { username, password });
      const t: string = data?.token || data?.accessToken;
      if (!t) throw new Error("Token no recibido");

      storage.set(t, !!remember);
      api.defaults.headers.common.Authorization = `Bearer ${t}`;

      const u: User = {
        id: data?.usuario?.id ?? "0",
        email: data?.usuario?.email ?? username,
        nombre: data?.usuario?.nombre ?? username,
        roles: (data?.usuario?.roles as Role[]) ?? ["Administrador"],
        role: ((data?.usuario?.roles?.[0]) as Role) ?? "Administrador",
      };

      localStorage.setItem("auth.user", JSON.stringify(u));
      setUser(u);
      setToken(t);
    } catch (e: any) {
      const msg =
        e?.response?.data?.message ||
        e?.response?.data?.error ||
        e?.message ||
        "Credenciales inválidas";
      throw new Error(msg);
    }
  };

  const logout = () => {
    storage.clear();
    setUser(null);
    setToken(null);
    localStorage.removeItem("auth.user");
  };

  const value = useMemo<AuthContextType>(() => ({
    user,
    token,
    isAuthenticated: !!token,
    hasRole: (r) => {
      const rr = (typeof r === "string" ? r : r).toString();
      const roles = user?.roles ?? (user?.role ? [user.role] : []);
      return roles.includes(rr as Role);
    },
    login,
    logout,
  }), [user, token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return ctx;
};
