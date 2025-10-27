import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import api, { storage } from "../api/axios";
import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react'; // ← Agrega esto

// ... el resto del código igual

// Tipos para nuestro contexto
interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'guarda';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  hasRole: (r: string) => boolean;
  login: (username: string, password: string, remember?: boolean) => Promise<LoginResponse>;
  login: (email: string, password: string, remember: boolean) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

// Crear el contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Props para el Provider
interface AuthProviderProps {
  children: ReactNode;
}

// Provider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

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
  // Verificar si hay usuario en localStorage al cargar
  useEffect(() => {
    const checkAuth = () => {
      try {
        const savedUser = localStorage.getItem('vivigest_user');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error('Error loading auth data:', error);
        localStorage.removeItem('vivigest_user');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Función de login
  const login = async (email: string, password: string, remember: boolean): Promise<void> => {
    try {
      setLoading(true);
      
      // Simulación de login - Reemplaza con tu API real
      console.log('🔐 Attempting login:', { email, password, remember });
      
      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Validación básica (demo)
      if (email === 'admin@demo.com' && password === '123456') {
        const userData: User = {
          id: '1',
          email: email,
          name: 'Administrador',
          role: 'admin'
        };
        
        setUser(userData);
        if (remember) {
          localStorage.setItem('vivigest_user', JSON.stringify(userData));
        }
      } else if (email === 'guarda@demo.com' && password === '123456') {
        const userData: User = {
          id: '2',
          email: email,
          name: 'Guarda de Seguridad',
          role: 'guarda'
        };
        
        setUser(userData);
        if (remember) {
          localStorage.setItem('vivigest_user', JSON.stringify(userData));
        }
      } else {
        throw new Error('Credenciales inválidas');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Función de logout
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
    setUser(null);
    localStorage.removeItem('vivigest_user');
  };

  // Valor del contexto
  const contextValue: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;