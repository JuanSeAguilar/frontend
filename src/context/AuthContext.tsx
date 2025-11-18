import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import api, { storage } from "../api/axios";
import { jwtDecode } from "jwt-decode";

export type Role = "Administrador" | "Guarda" | "Residente";

export interface User {
  id: string;      // IdUsuario (GUID del backend)
  email: string;   // correo
  nombre: string;  // nombre a mostrar (por ahora uso el correo)
  roles: Role[];
  role?: Role;
}

export interface LoginResponse {
  token: string;
  username: string;
  roles: string[];
}

interface JwtPayload {
  id?: string;
  sub?: string;
  userId?: string;
  uid?: string;
  pid?: string;
  email?: string;
  [key: string]: any;
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

  // Hidratar estado desde storage
  useEffect(() => {
    const t = storage.get();
    if (t) {
      api.defaults.headers.common.Authorization = `Bearer ${t}`;
      setToken(t);
      try {
        const raw = localStorage.getItem("auth.user");
        if (raw) {
          const parsed = JSON.parse(raw) as User;
          setUser(parsed);
        }
      } catch {
        localStorage.removeItem("auth.user");
      }
    }
  }, []);

  const login: AuthContextType["login"] = async ({ username, password, remember = false }) => {
    try {
      const { data } = await api.post<LoginResponse>("/api/Auth/login", { username, password });

      const token = data?.token;
      const rawRoles = data?.roles ?? [];

      if (!token) throw new Error("Token no recibido");
      if (!Array.isArray(rawRoles) || rawRoles.length === 0)
        throw new Error("El usuario no tiene roles asignados.");

      // Filtrar a los roles que conoce el frontend
      const validRoles: Role[] = rawRoles.filter((r): r is Role =>
        ["Administrador", "Guarda", "Residente"].includes(r)
      );

      if (validRoles.length === 0)
        throw new Error("El usuario no tiene roles válidos para esta aplicación.");

      // Guardar token y header
      storage.set(token, !!remember);
      api.defaults.headers.common.Authorization = `Bearer ${token}`;

      // Decodificar JWT para sacar id / email reales
      let userId = "";
      let emailFromToken = "";

      try {
        const payload = jwtDecode<JwtPayload>(token);
        userId = payload.id || payload.sub || payload.userId || payload.uid || "";
        emailFromToken = payload.email ?? "";
      } catch {
        // Si falla el decode, usamos los datos del response
      }

      const email = emailFromToken || data.username || username;

      const u: User = {
        id: userId || "0",
        email,
        nombre: email, // luego lo puedes cambiar por nombre real si lo devuelves en el backend
        roles: validRoles,
        role: validRoles[0],
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
      hasRole: (role) => {
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
