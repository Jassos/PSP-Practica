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
export function RegistrarsePage() {
  return (
    <main className="panel">
      <h2>Registrarse</h2>
      <section className="visual-slot">
        <p>TODO: Aquí va la interfaz visual (HTML/JSX) de registro.</p>
      </section>
    </main>
  );
}
