import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:7049/', // <- ajusta aquí
  headers: { 'Content-Type': 'application/json' },
});

// === Storage helpers (sessionStorage por defecto) ===
const STORAGE_KEY = "auth.token";
const storage = {
  get: () => sessionStorage.getItem(STORAGE_KEY) || localStorage.getItem(STORAGE_KEY),
  set: (token: string, persist: boolean) =>
    persist ? localStorage.setItem(STORAGE_KEY, token) : sessionStorage.setItem(STORAGE_KEY, token),
  clear: () => {
    sessionStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STORAGE_KEY);
  },
};

// Request: agrega Authorization si hay token
api.interceptors.request.use((config) => {
  const token = storage.get();
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response: si 401 → limpieza rápida (el contexto también lo hace)
api.interceptors.response.use(
  (r) => r,
  (err) => {
    if (err?.response?.status === 401) {
      storage.clear();
      // opcional: window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default api;
export { storage, STORAGE_KEY };