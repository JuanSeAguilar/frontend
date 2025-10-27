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
      await login(form.username, form.password, form.remember);
      nav("/correspondencia");
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
    <div className="min-h-screen bg-gradient-login flex items-center justify-center p-4">
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl gap-8">
        
        {/* Tarjeta Fiery Ocean - Solo visible en desktop */}
        <div className="hidden md:block fiery-ocean-card">
          <div className="fiery-ocean-bg"></div>
          
          <div className="fiery-ocean-decoration fiery-ocean-circle-1"></div>
          <div className="fiery-ocean-decoration fiery-ocean-circle-2"></div>
          <div className="fiery-ocean-wave"></div>
          <div className="fiery-ocean-accent"></div>
          
          <div className="fiery-ocean-content">
            <div className="fiery-ocean-header">
              <h1 className="fiery-ocean-title">Fiery Ocean</h1>
              <p className="fiery-ocean-subtitle">ViviGest Pro</p>
            </div>
            
            <div className="fiery-ocean-footer">
              <div className="fiery-ocean-stat">
                <div className="fiery-ocean-stat-value">34.6K</div>
                <div className="fiery-ocean-stat-label">Usuarios</div>
              </div>
              
              <div className="fiery-ocean-stat">
                <div className="fiery-ocean-stat-value">99.7%</div>
                <div className="fiery-ocean-stat-label">Uptime</div>
              </div>
            </div>
          </div>
        </div>

        {/* Formulario de Login */}
        <div className="card max-w-md w-full">
          {/* Header */}
          <div className="text-center mb-6">
            <div style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px'
            }}>
              <span style={{color: 'white', fontSize: '24px'}}>📬</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-800">ViviGest</h1>
            <p className="text-gray-600 mt-2">Sistema de Gestión</p>
          </div>

          <form onSubmit={onSubmit}>
            {/* Email */}
            <div className="mb-4">
              <label className="text-gray-800 font-semibold block mb-2">
                Correo electrónico
              </label>
              <input
                name="username"
                value={form.username}
                onChange={onChange}
                type="email"
                placeholder="admin@demo.com"
                required
                className="input"
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="text-gray-800 font-semibold block mb-2">
                Contraseña
              </label>
              <input
                name="password"
                value={form.password}
                onChange={onChange}
                type="password"
                required
                className="input"
              />
            </div>

            {/* Remember Me */}
            <div className="mb-6 flex items-center gap-2">
              <input 
                name="remember" 
                type="checkbox" 
                checked={form.remember} 
                onChange={onChange} 
                className="rounded"
              />
              <label className="text-gray-800 text-sm">
                Recordarme
              </label>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full"
              style={{ 
                opacity: loading ? 0.7 : 1,
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? "Ingresando..." : "Iniciar Sesión"}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-center text-gray-600 text-sm">
              <strong>Demo:</strong> admin@demo.com / 123456
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;