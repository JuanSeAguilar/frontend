import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import api, { storage } from "../api/axios";

export type Role = "Administrador" | "Guarda" | "Residente";

export interface User {
  id: string;
  email: string;
  nombre: string;
  roles: Role[];
  role?: Role;
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

      const token = data?.token;
      const roles = (data?.roles ?? []) as Role[];

      if (!token) throw new Error("Token no recibido");
      if (!Array.isArray(roles) || roles.length === 0)
        throw new Error("El usuario no tiene roles asignados.");

      // Guardar token y header
      storage.set(token, !!remember);
      api.defaults.headers.common.Authorization = `Bearer ${token}`;

      const u: User = {
        id: "0", // no lo envías aún, lo puedes añadir después
        email: data.username ?? username,
        nombre: data.username ?? username,
        roles,
        role: roles[0],
      };

      localStorage.setItem("auth.user", JSON.stringify(u));
      setUser(u);
      setToken(token);
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
    localStorage.removeItem("auth.user");
    setUser(null);
    setToken(null);
    delete (api.defaults.headers.common as any).Authorization;
  };

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      token,
      isAuthenticated: !!token,
      hasRole: (r) => {
        const role = (typeof r === "string" ? r : r).toString();
        const roles = user?.roles ?? (user?.role ? [user.role] : []);
        return roles.includes(role as Role);
      },
      login,
      logout,
    }),
    [user, token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return ctx;
};
