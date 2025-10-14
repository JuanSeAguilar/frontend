import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login: React.FC = () => {
  const nav = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ username: "", password: "", remember: false });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await login(form.username, form.password, form.remember); // debe devolver { token, username, roles }

      const roles = res.roles.map((r) => r.toLowerCase());

      if (roles.includes("administrador")) {
        nav("/dashboard"); // 🔽 en minúsculas (coincide con tus <Route/>)
      } else if (roles.includes("guarda")) {
        nav("/guarda/dashboard");
      } else if (roles.includes("residente")) {
        nav("/residente/dashboard");
      } else {
        nav("/unauthorized"); // fallback si no tiene ninguno
      }
    } catch (err: any) {
      const msg = err?.response?.data?.message || "Credenciales inválidas";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>🔐 ViviGest</h1>
          <p>Inicia sesión para acceder al panel de control</p>
        </div>

        <form onSubmit={onSubmit} className="login-form">
          <div className="form-group">
            <label>Correo electrónico</label>
            <input
              name="username"
              value={form.username}
              onChange={onChange}
              type="email"
              placeholder="admin@demo.com"
              required
            />
          </div>

          <div className="form-group">
            <label>Contraseña</label>
            <input
              name="password"
              value={form.password}
              onChange={onChange}
              type="password"
              placeholder="********"
              required
            />
          </div>

          <label className="remember">
            <input
              name="remember"
              type="checkbox"
              checked={form.remember}
              onChange={onChange}
            />
            Recordarme
          </label>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Ingresando..." : "Entrar"}
          </button>
        </form>
      </div>

      <style>{`
        .login-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .login-card {
          background: white;
          border-radius: 20px;
          padding: 40px 32px;
          width: 100%;
          max-width: 380px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
          animation: fadeIn 0.6s ease-in-out;
        }
        .login-header { text-align: center; margin-bottom: 28px; }
        .login-header h1 { font-size: 28px; margin: 0; color: #1e293b; }
        .login-header p { color: #64748b; font-size: 14px; margin-top: 4px; }
        .form-group { margin-bottom: 16px; }
        label { display: block; font-size: 14px; color: #334155; margin-bottom: 6px; }
        input[type="email"], input[type="password"] {
          width: 100%; padding: 10px 12px; border: 2px solid #e2e8f0; border-radius: 10px; font-size: 14px;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        input:focus { border-color: #6366f1; outline: none; box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1); }
        .remember { display: flex; align-items: center; gap: 8px; font-size: 13px; color: #475569; margin-bottom: 16px; }
        .btn-primary {
          width: 100%; padding: 12px; background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: white;
          border: none; border-radius: 10px; font-weight: 600; cursor: pointer; transition: all 0.3s ease; font-size: 15px;
        }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4); }
        .error-message { color: #ef4444; font-size: 13px; margin-bottom: 10px; text-align: center; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

export default Login;
