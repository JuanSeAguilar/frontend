import React from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const PrivatePage: React.FC = () => {
  const { auth, logout } = useAuth();
  const [msg, setMsg] = React.useState<string>("");

  const probar = async () => {
    const { data } = await api.get("/api/Demo/privado");
    setMsg(JSON.stringify(data));
  };

  return (
    <div style={{ maxWidth: 720, margin: "40px auto", fontFamily: "system-ui, sans-serif" }}>
      <p>Usuario: <b>{auth.username}</b></p>
      <p>Roles: <b>{auth.roles.join(", ") || "-"}</b></p>

      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={probar}>Probar /api/Demo/privado</button>
        <button onClick={logout}>Logout</button>
      </div>

      {msg && (
        <pre style={{ marginTop: 16, background: "#f5f5f5", padding: 12, borderRadius: 8 }}>
          {msg}
        </pre>
      )}
    </div>
  );
};

export default PrivatePage;
