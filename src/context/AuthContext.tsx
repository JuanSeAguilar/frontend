import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import api, { storage } from "../api/axios";

type LoginResponse = {
  token: string;
  username: string;
  roles: string[];
};

type AuthState = {
  token: string | null;
  username: string | null;
  roles: string[];
};

type AuthContextType = {
  auth: AuthState;
  isAuthenticated: boolean;
  hasRole: (r: string) => boolean;
  login: (username: string, password: string, remember?: boolean) => Promise<LoginResponse>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState<AuthState>({ token: null, username: null, roles: [] });

  // Carga inicial desde storage y sincroniza header Authorization
  useEffect(() => {
    const token = storage.get();
    const username = sessionStorage.getItem("auth.username") || localStorage.getItem("auth.username");

    let roles: string[] = [];
    const raw = sessionStorage.getItem("auth.roles") || localStorage.getItem("auth.roles");
    if (raw) {
      try { roles = JSON.parse(raw); } catch { roles = []; }
    }

    if (token) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
      setAuth({ token, username, roles });
    }
  }, []);

  const login = async (username: string, password: string, remember = false): Promise<LoginResponse> => {
    const { data } = await api.post<LoginResponse>("/api/Auth/login", { username, password });

    // guarda token y metadatos
    storage.set(data.token, !!remember);
    const save = remember ? localStorage : sessionStorage;
    save.setItem("auth.username", data.username);
    save.setItem("auth.roles", JSON.stringify(data.roles));

    // sincroniza header Authorization
    api.defaults.headers.common.Authorization = `Bearer ${data.token}`;

    setAuth({ token: data.token, username: data.username, roles: data.roles });
    return data;
  };

  const logout = () => {
    storage.clear();
    sessionStorage.removeItem("auth.username");
    sessionStorage.removeItem("auth.roles");
    localStorage.removeItem("auth.username");
    localStorage.removeItem("auth.roles");

    // limpia header Authorization
    delete api.defaults.headers.common.Authorization;

    setAuth({ token: null, username: null, roles: [] });
  };

  const value = useMemo<AuthContextType>(() => ({
    auth,
    isAuthenticated: !!auth.token,
    hasRole: (r) => auth.roles.some(x => x.toLowerCase() === r.toLowerCase()),
    login,
    logout,
  }), [auth]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
