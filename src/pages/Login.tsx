import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const Login: React.FC = () => {
  const nav = useNavigate();
  const { login, user, isAuthenticated } = useAuth();
  const [form, setForm] = useState({
    username: "",
    password: "",
    remember: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const routeByRole = (roles: string[]) => {
    if (roles.includes("Administrador")) return "/admin";
    if (roles.includes("Guarda")) return "/guarda";
    if (roles.includes("Residente")) return "/residente";
    return "/";
  };

  useEffect(() => {
    if (!isAuthenticated || !user) return;
    const roles = user.roles?.length ? user.roles : user.role ? [user.role] : [];
    nav(routeByRole(roles as string[]), { replace: true });
  }, [isAuthenticated, user, nav]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login({
        username: form.username.trim(),
        password: form.password,
        remember: form.remember,
      });
    } catch (err: any) {
      setError(err?.message || "No fue posible iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-shell">
        {/* Lado izquierdo (texto / branding) */}
        <div className="login-side login-side--info">
          <div className="login-brand">
            <div className="login-pill">
              <span className="login-pill-dot" />
              Plataforma de gestión residencial
            </div>
            <h1 className="login-title">ViviGest Pro</h1>
            <p className="login-subtitle">
              Controla residentes, visitas y autorizados desde un mismo lugar.
            </p>
          </div>

          <div className="login-bullets">
            <p className="login-bullets-title">Perfiles soportados</p>
            <ul>
              <li>
                <span className="dot dot-green" />
                <strong>Residente:</strong> gestiona personas autorizadas y
                correspondencia.
              </li>
              <li>
                <span className="dot dot-blue" />
                <strong>Guarda:</strong> valida autorizados y registra visitas.
              </li>
              <li>
                <span className="dot dot-yellow" />
                <strong>Administrador:</strong> configura el conjunto y usuarios.
              </li>
            </ul>
          </div>

          <p className="login-footer">
            © {new Date().getFullYear()} ViviGest Pro · Todos los derechos
            reservados.
          </p>
        </div>

        {/* Lado derecho (formulario) */}
        <div className="login-side login-side--form">
          <div className="login-card">
            <div className="login-card-header">
              <h2>Inicia sesión</h2>
              <p>Ingresa con tu usuario o correo y contraseña.</p>
            </div>

            {error && (
              <div className="login-alert">
                {error}
              </div>
            )}

            <form onSubmit={onSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="username">Usuario / Correo</label>
                <input
                  id="username"
                  name="username"
                  value={form.username}
                  onChange={onChange}
                  placeholder="tu_correo@dominio.com"
                  autoComplete="username"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <div className="password-wrapper">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={onChange}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              <div className="form-row">
                <label className="checkbox-label">
                  <input
                    id="remember"
                    type="checkbox"
                    name="remember"
                    checked={form.remember}
                    onChange={onChange}
                  />
                  <span>Recordarme en este dispositivo</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="login-button"
              >
                {loading ? "Ingresando..." : "Ingresar"}
              </button>
            </form>
          </div>

          {/* footer en móvil */}
          <p className="login-footer login-footer--mobile">
            © {new Date().getFullYear()} ViviGest Pro
          </p>
        </div>
      </div>
      <style>
        {`
        /* Fondo general */
.login-page {
  min-height: 100vh;
  margin: 0;
  padding: 24px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at top, #1e293b 0, #020617 55%, #000 100%);
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
  color: #0f172a;
}

/* Contenedor principal */
.login-shell {
  width: 100%;
  max-width: 1040px;
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
  gap: 24px;
}

/* Lados */
.login-side {
  border-radius: 20px;
  box-sizing: border-box;
}

.login-side--info {
  padding: 22px 22px 18px;
  background: linear-gradient(145deg, #020617 0%, #0f172a 45%, #020617 100%);
  border: 1px solid rgba(148, 163, 184, 0.35);
  box-shadow: 0 26px 80px rgba(15, 23, 42, 0.7);
  color: #e5e7eb;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.login-side--form {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* Branding y texto izquierdo */
.login-brand {
  margin-bottom: 20px;
}

.login-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(34, 197, 94, 0.12);
  border: 1px solid rgba(52, 211, 153, 0.7);
  color: #bbf7d0;
}

.login-pill-dot {
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: #4ade80;
}

.login-title {
  margin: 14px 0 4px;
  font-size: 26px;
  font-weight: 700;
  letter-spacing: 0.03em;
}

.login-subtitle {
  margin: 0;
  font-size: 13px;
  color: #cbd5f5;
}

/* Bullets info */
.login-bullets {
  margin-top: 16px;
  font-size: 13px;
}

.login-bullets-title {
  margin-bottom: 6px;
  font-weight: 600;
  color: #e5e7eb;
}

.login-bullets ul {
  margin: 0;
  padding-left: 0;
  list-style: none;
}

.login-bullets li {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 6px;
  color: #cbd5e1;
}

.login-bullets strong {
  color: #f9fafb;
}

.dot {
  margin-top: 5px;
  width: 6px;
  height: 6px;
  border-radius: 999px;
}

.dot-green {
  background: #4ade80;
}

.dot-blue {
  background: #38bdf8;
}

.dot-yellow {
  background: #facc15;
}

/* Footer */
.login-footer {
  margin-top: 16px;
  font-size: 11px;
  color: #64748b;
}

.login-footer--mobile {
  display: none;
}

/* Tarjeta del formulario */
.login-card {
  background: rgba(248, 250, 252, 0.96);
  border-radius: 20px;
  padding: 22px 22px 20px;
  border: 1px solid rgba(148, 163, 184, 0.3);
  box-shadow: 0 20px 45px rgba(15, 23, 42, 0.45);
  backdrop-filter: blur(12px);
}

.login-card-header h2 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #0f172a;
}

.login-card-header p {
  margin: 4px 0 0;
  font-size: 13px;
  color: #6b7280;
}

/* Alert error */
.login-alert {
  margin-top: 14px;
  margin-bottom: 10px;
  padding: 8px 10px;
  border-radius: 8px;
  font-size: 13px;
  background: #fef2f2;
  color: #b91c1c;
  border: 1px solid #fecaca;
}

/* Form */
.login-form {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.form-group label {
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #4b5563;
}

.form-group input {
  border-radius: 10px;
  border: 1px solid #d1d5db;
  padding: 8px 10px;
  font-size: 14px;
  outline: none;
  color: #111827;
  background: #ffffff;
  transition: border-color 0.15s ease, box-shadow 0.15s ease,
    background-color 0.15s ease;
}

.form-group input::placeholder {
  color: #9ca3af;
}

.form-group input:focus {
  border-color: #0ea5e9;
  box-shadow: 0 0 0 1px rgba(14, 165, 233, 0.25);
}

/* Password wrapper */
.password-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.password-wrapper input {
  width: 100%;
  padding-right: 34px;
}

.password-toggle {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 17px;
  opacity: 0.7;
  transition: opacity 0.15s ease, transform 0.1s ease;
}

.password-toggle:hover {
  opacity: 1;
  transform: translateY(-50%) translateY(-1px);
}

/* Checkbox row */
.form-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2px;
}

.checkbox-label {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #374151;
}

.checkbox-label input[type="checkbox"] {
  width: 15px;
  height: 15px;
  border-radius: 4px;
  border: 1px solid #9ca3af;
}

/* Botón */
.login-button {
  margin-top: 4px;
  width: 100%;
  border: none;
  border-radius: 999px;
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 600;
  background: linear-gradient(135deg, #0284c7, #0ea5e9);
  color: #f9fafb;
  cursor: pointer;
  transition: transform 0.1s ease, box-shadow 0.15s ease,
    filter 0.15s ease;
  box-shadow: 0 12px 28px rgba(37, 99, 235, 0.4);
}

.login-button:hover:not(:disabled) {
  filter: brightness(1.05);
  transform: translateY(-1px);
  box-shadow: 0 16px 34px rgba(37, 99, 235, 0.6);
}

.login-button:active:not(:disabled) {
  transform: translateY(0);
  box-shadow: 0 10px 22px rgba(37, 99, 235, 0.45);
}

.login-button:disabled {
  opacity: 0.65;
  cursor: default;
  box-shadow: 0 8px 18px rgba(148, 163, 184, 0.5);
}

/* Responsive */
@media (max-width: 900px) {
  .login-shell {
    grid-template-columns: minmax(0, 1fr);
    max-width: 480px;
  }

  .login-side--info {
    display: none;
  }

  .login-footer {
    display: none;
  }

  .login-footer--mobile {
    display: block;
    margin-top: 12px;
    text-align: center;
    font-size: 11px;
    color: #9ca3af;
  }
}

@media (max-width: 480px) {
  .login-page {
    padding: 16px 10px;
  }

  .login-card {
    padding: 18px 16px 18px;
  }
}

        `}
      </style>
    </div>
  );
};

export default Login;
