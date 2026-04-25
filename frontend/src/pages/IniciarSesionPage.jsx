/**
 * INICIAR SESIÓN
 *
 * Esta vista consume 1 endpoint principal:
 * - POST /api/auth/login
 * - Cliente sugerido: api.login({ email, password })
 *
 * Payload esperado:
 * {
 *   email: string,
 *   password: string
 * }
 *
 * Respuesta esperada:
 * {
 *   access_token: string,
 *   user: { id, full_name, email, created_at },
 *   psp_warning?: string
 * }
 *
 * Reglas visuales/funcionales de la maqueta:
 * - Mostrar card centrada con:
 *   a) Título "Login"
 *   b) Subtítulo "Inicia sesión en tu cuenta"
 *   c) Formulario con 2 campos: correo electrónico y contraseña
 *   d) Botón principal "Entrar al Dashboard"
 * - Mostrar una alerta de seguridad en color amarillo para el warning PSP.
 *
 * Manejo de estados y errores:
 * 1) Mostrar loading en el botón mientras se envía el formulario.
 * 2) Si login es exitoso, guardar payload en localStorage (ej. "psp_session").
 * 3) Navegar a /dashboard después de iniciar sesión correctamente.
 * 4) Si backend responde error (ej. 404 usuario no encontrado), mostrar mensaje.
 * 5) Si la respuesta trae psp_warning, renderizarlo en la alerta.
 *
 * Bug PSP esperado:
 * - BUG-LOGIN-001: contraseña incorrecta puede permitir acceso.
 * - La UI debe advertirlo explícitamente cuando llegue psp_warning.
 *
 * HTML/JSX visual:
 * - Construir toda la maqueta dentro de <section className="visual-slot">.
 * - Incluir card centrada, alerta de seguridad, formulario y botón principal.
 */
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { api } from "../api/client";

export function IniciarSesionPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [warning, setWarning] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    // VALIDAR CAMPOS
    if (!email || !password) {
      setError("Campos obligatorios");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setWarning("");

      // ENVIAR LOGIN
      const response = await api.login({ email, password });

      // GUARDAR SESION
      localStorage.setItem("psp_session", JSON.stringify(response));

      // MOSTRAR WARNING PSP
      if (response.psp_warning) {
        setWarning(response.psp_warning);
      }

      // REDIRIGIR
      setTimeout(() => {
        navigate("/dashboard");
      }, 800);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="panel">
      <h2>Iniciar Sesión</h2>

      <section className="visual-slot">
        <div className="card" style={{ maxWidth: "400px", margin: "auto" }}>
          
          <h3>Login</h3>

          <form className="form-grid" onSubmit={handleSubmit}>

            {/* EMAIL */}
            <label>
              Correo electrónico
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            {/* PASSWORD */}
            <label>
              Contraseña
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            {/* BOTON */}
            <button type="submit" disabled={loading}>
              {loading ? "Entrando..." : "Entrar al Dashboard"}
            </button>

          </form>

          {/* MENSAJES */}
          {error && <p className="notice-error">{error}</p>}
          {warning && <p className="notice-warning">{warning}</p>}

        </div>
      </section>
    </main>
  );
}
