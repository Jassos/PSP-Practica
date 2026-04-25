/**
 * REGISTRARSE
 *
 * Esta vista consume 1 endpoint principal:
 * - POST /api/auth/register
 * - Cliente sugerido: api.register({ full_name, email, password })
 *
 * Payload esperado:
 * {
 *   full_name: string,
 *   email: string,
 *   password: string
 * }
 *
 * Respuesta esperada:
 * {
 *   id: number,
 *   full_name: string,
 *   email: string,
 *   created_at: string
 * }
 *
 * Reglas visuales/funcionales de la maqueta:
 * - Card centrada con:
 *   a) Título "Registro"
 *   b) Subtítulo "Crea una nueva cuenta"
 *   c) Campos: nombre completo, correo electrónico, contraseña
 *   d) Botón principal "Registrarse"
 * - Placeholder de contraseña: "Mínimo 8 caracteres".
 *
 * Manejo de estados y errores:
 * 1) Validar formato de email en cliente.
 * 2) Validar contraseña.
 * 3) Mostrar loading en el botón durante el submit.
 * 4) Si backend responde 409, mostrar toast/error visible:
 *    "El email ya está registrado" + código HTTP_409_CONFLICT.
 * 5) En éxito, limpiar formulario y mostrar confirmación.
 *
 * HTML/JSX visual:
 * - Construir toda la maqueta dentro de <section className="visual-slot">.
 * - Incluir card, formulario, botón y contenedor de notificaciones (error/success).
 */
import { useState } from "react";

import { api } from "../api/client";

export function RegistrarsePage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    // VALIDAR CAMPOS
    if (!fullName || !email || !password) {
      setError("Campos obligatorios");
      return;
    }

    if (password.length < 6) {
      setError("Mínimo 6 caracteres");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      // ENVIAR REGISTRO
      const response = await api.register({
        full_name: fullName,
        email,
        password,
      });

      // LIMPIAR FORM
      setFullName("");
      setEmail("");
      setPassword("");

      // MENSAJE EXITO
      setSuccess(`Usuario creado: ${response.email}`);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="panel">
      <h2>Registrarse</h2>

      <section className="visual-slot">
        <div className="card" style={{ maxWidth: "400px", margin: "auto" }}>
          
          <h3>Crear cuenta</h3>

          <form className="form-grid" onSubmit={handleSubmit}>

            {/* NOMBRE */}
            <label>
              Nombre completo
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </label>

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
              {loading ? "Registrando..." : "Registrarse"}
            </button>

          </form>

          {/* MENSAJES */}
          {error && <p className="notice-error">{error}</p>}
          {success && <p className="notice-success">{success}</p>}

        </div>
      </section>
    </main>
  );
}