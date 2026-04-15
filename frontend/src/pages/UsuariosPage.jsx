/**
 * USUARIOS
 *
 * Esta vista consume 2 endpoints principales:
 * - GET /api/users           -> directorio/listado lateral
 * - GET /api/users/{user_id} -> detalle del usuario seleccionado
 * - Cliente sugerido: api.listUsers(), api.getUser(userId)
 *
 * Respuesta esperada en listado:
 * [
 *   { id, full_name, email, created_at }
 * ]
 *
 * Respuesta esperada en detalle:
 * {
 *   id, full_name, email, created_at,
 *   password_hash?,
 *   psp_warning?
 * }
 *
 * Reglas visuales/funcionales de la maqueta:
 * - Layout en dos columnas:
 *   a) Izquierda: "DIRECTORIO DE USUARIOS" con lista clickeable.
 *   b) Derecha: tarjeta de detalle del usuario activo.
 * - En el detalle mostrar:
 *   nombre completo, correo, ID visible (badge), fecha de creación.
 * - Resaltar visualmente el usuario seleccionado en el directorio.
 *
 * Flujo recomendado:
 * 1) Cargar listado al montar la vista.
 * 2) Seleccionar automáticamente el primer usuario y cargar su detalle.
 * 3) Al hacer click en otro usuario, consultar su detalle por ID.
 * 4) Mostrar loading por panel de detalle durante cambios de selección.
 * 5) Manejar estado vacío si no hay usuarios.
 *
 * Consideración PSP / seguridad:
 * - El endpoint de detalle puede devolver `password_hash` (BUG-USER-001).
 * - NO renderizar `password_hash` en UI.
 *
 * HTML/JSX visual:
 * - Construir toda la maqueta dentro de <section className="visual-slot">.
 * - Incluir: sidebar de directorio, tarjeta de detalle
 */
export function UsuariosPage() {
  return (
    <main className="panel">
      <h2>Usuarios</h2>
      <section className="visual-slot">
        <p>TODO: Aquí va la interfaz visual (HTML/JSX) de usuarios y detalle.</p>
      </section>
    </main>
  );
}
