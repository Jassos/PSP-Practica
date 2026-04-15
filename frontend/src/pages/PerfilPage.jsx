/**
 * PERFIL
 *
 * Esta vista se alimenta principalmente de la sesión iniciada:
 * - Origen de sesión: respuesta de POST /api/auth/login
 * - Fuente local: localStorage("psp_session")
 *
 * Endpoint opcional de refresco:
 * - GET /api/users/{user_id}
 * - Cliente sugerido: api.getUser(userId)
 *
 * Datos que debe mostrar la maqueta:
 * 1) Cabecera de vista:
 *    - Título: "Mi perfil"
 * 2) Tarjeta principal de perfil:
 *    - Avatar con iniciales (ej. "SR")
 *    - Nombre completo
 *    - Correo electrónico
 *    - Badge/estado: "USUARIO REGISTRADO"
 * 3) Sección "INFORMACION DE LA CUENTA":
 *    - ID de usuario
 *    - Nombre completo
 *    - Correo electrónico
 *    - Miembro desde (fecha de creación)
 *
 * Flujo funcional recomendado:
 * 1) Al montar la vista, leer sesión desde localStorage.
 * 2) Si no hay sesión, mostrar estado vacío o redirigir a /login.
 * 3) Si hay sesión, pintar datos inmediatamente.
 * 4) Opcional: refrescar con GET /api/users/{id} para sincronizar datos.
 * 5) Manejar errores sin romper la tarjeta (mensaje discreto en la vista).
 *
 * Consideración PSP:
 * - Si se usa GET /api/users/{id}, el backend puede devolver campos sensibles
 *   (BUG-USER-001). No renderizar `password_hash` en la interfaz.
 *
 * HTML/JSX visual:
 * - Construir toda la maqueta en <section className="visual-slot">.
 * - Incluir: cabecera de perfil, banda oscura decorativa, avatar circular,
 *   bloque de identidad y grid de información de cuenta.
 */
export function PerfilPage() {
	return (
		<main className="panel">
			<h2>Perfil</h2>
			<section className="visual-slot">
				<p>TODO: Aquí va la interfaz visual (HTML/JSX) del perfil de usuario.</p>
			</section>
		</main>
	);
}
