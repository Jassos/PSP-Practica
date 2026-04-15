/**
 * PRODUCTOS
 *
 * Esta vista consume 1 endpoint principal de catálogo:
 * - GET /api/products?include_inactive=true
 * - Cliente sugerido: api.listProducts(true)
 *
 * Nota:
 * - La maqueta muestra productos activos e inactivos, por eso se recomienda
 *   consultar con include_inactive=true.
 *
 * Respuesta esperada del listado:
 * [
 *   { id, name, description, price, stock, is_active, created_at }
 * ]
 *
 * Reglas visuales/funcionales de la maqueta:
 * - Encabezado: "Catalogo de suplementos".
 * - Input de búsqueda: "Buscar por nombre..." (filtro en frontend por name).
 * - Tabla con columnas:
 *   ID | NOMBRE | PRECIO | STOCK | ESTADO | ACTUALIZADO
 * - Estado con badge:
 *   Activo (oscuro) / Inactivo (rojo).
 * - Stock con badge de alerta visual cuando sea bajo (ej. <= 5 unidades).
 *
 * Manejo de datos/estados:
 * 1) Cargar productos al montar la vista.
 * 2) Filtrar en cliente por texto de búsqueda (name incluye término). (Ejemplo: si el usuario escribe crea, coincide con Creatina Monohidratada.)
 * 3) Formatear precio con moneda (USD) y fecha de actualización.
 * 4) Mostrar estado vacío si no hay coincidencias.
 * 5) Mostrar error de API si la consulta falla.
 *
 * HTML/JSX visual:
 * - Construir toda la maqueta dentro de <section className="visual-slot">.
 * - Incluir: barra de búsqueda, tabla de catálogo y badges de stock/estado.
 */
export function ProductosPage() {
  return (
    <main className="panel">
      <h2>Productos</h2>
      <section className="visual-slot">
        <p>TODO: Aquí va la interfaz visual (HTML/JSX) del listado de productos.</p>
      </section>
    </main>
  );
}
