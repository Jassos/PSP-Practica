import { useState } from "react";

import { api } from "../api/client";
import { ApiNotice } from "../components/ApiNotice";

export function LogoutPage() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [warning, setWarning] = useState("");
  const [loading, setLoading] = useState(false);
  const [simulateError, setSimulateError] = useState(true);

  async function runLogout() {
    setLoading(true);
    setError("");
    setSuccess("");
    setWarning("");

    try {
      const payload = await api.logout(simulateError);
      localStorage.removeItem("psp_session");
      setSuccess(payload.message);
      if (payload.psp_warning) {
        setWarning(payload.psp_warning);
      }
    } catch (logoutError) {
      setError(logoutError.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="panel">
      <h2>Cierre de sesion</h2>
      <p>
        Este modulo tiene un bug intencional en backend. Con el switch activo, el endpoint debe
        fallar para la practica.
      </p>

      <label className="switch-line">
        <input
          type="checkbox"
          checked={simulateError}
          onChange={(event) => setSimulateError(event.target.checked)}
        />
        Simular fallo intencional (BUG-LOGOUT-001)
      </label>

      <button type="button" onClick={runLogout} disabled={loading}>
        {loading ? "Cerrando..." : "Cerrar sesion"}
      </button>

      <ApiNotice title="Estado de logout" success={success} warning={warning} error={error} />
    </main>
  );
}
