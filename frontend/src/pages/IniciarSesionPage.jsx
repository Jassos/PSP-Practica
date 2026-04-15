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
export function IniciarSesionPage() {
  return (
    <main className="panel">
      <h2>Iniciar Sesión</h2>
      <section className="visual-slot">
        <p>TODO: Aquí va la interfaz visual (HTML/JSX) de inicio de sesión.</p>
      </section>
    </main>
  );
}
