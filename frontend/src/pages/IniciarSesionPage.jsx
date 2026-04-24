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
import { useState } from "react"
import { api } from "../api/client"

export function IniciarSesionPage() {
  const [contrasena, setcontrasena] = useState("")
  const [email, setemail] = useState("")
  const [error, setError] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault()
    setError("")

    try {
      const response = await api.login({ email, contrasena })
      localStorage.setItem("psp_session", JSON.stringify(response))
      window.location.href = "/dashboard"
    } catch (err) {
      setError(err.messaje)

    }
  }

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "#e7e7e7",
      padding: "20px"
    }}
    >
      <main className="panel">

        <section className="visual-slot">

          <div
            style={{
              textAlign: "center"
            }}
          >
            <h2>
              login
            </h2>

            <p>
              inicia secion en tu cuenta
            </p>

          </div>

          <div
            style={{
              background: "#fff3cd"
            }}
          >
            <h3
              style={{
                color: "#c45b00"
              }}
            >
              ⚠️ Advertencia de seguridad
            </h3>

            <p
              style={{
                color: "#c45b00"
              }}
            >
              BUG-LOGIN-001: La contrasena incorrecta <br />
              no bloquea el acceso. Este fallo es <br />
              intencional para la practica.
            </p>
          </div>

          <form
            onSubmit={handleLogin}
          >
            <h3>Correo electronico</h3>
            <input
              type="text"
              onChange={(e) => setemail(e.target.value)} required
              style={{
                width: "100%"
              }}
            />

            <h3>Contraseña</h3>
            <input
              type="text"
              onChange={(e) => setcontrasena(e.target.value)} required
              style={{
                width: "100%"
              }}
            />

            <button
              style={{
                marginTop: "1.5rem",
                width: "100%",
                justifyContent: "center",
                background: "black"
              }}
            >
              Entrar al Dashboard
            </button>
          </form>
          {error && <p className="notice-error">{error}</p>}
        </section>
      </main>
    </div>
  );
}
