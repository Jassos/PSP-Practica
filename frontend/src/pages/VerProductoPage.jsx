/**
 * VER PRODUCTO
 *
 * Esta vista consume 1 endpoint principal:
 * - GET /api/products/{product_id}
 * - Cliente sugerido: api.getProduct(productId)
 *
 * Respuesta esperada en detalle:
 * {
 *   id: number,
 *   name: string,
 *   description: string,
 *   price: number,
 *   stock: number,
 *   is_active: boolean,
 *   created_at: string
 * }
 *
 * Reglas visuales/funcionales de la maqueta:
 * - Encabezado: "Detalle de producto" .
 * - Badge de estado en cabecera: Activo/Inactivo.
 * - Mostrar nombre, ID y precio principal destacado.
 * - Mostrar descripción del producto.
 * - Bloque de métricas:
 *   a) Stock disponible
 *   b) Estado
 *   c) Precio unitario
 * - Bloque "Información del registro":
 *   creado el, última actualización, identificador y visibilidad.
 * - Acciones al pie:
 *   "Volver al listado" y "Editar producto".
 *
 * Manejo de datos/estados:
 * 1) Cargar producto por ID al entrar a la vista (desde ruta o estado previo).
 * 2) Mostrar loading mientras se consulta.
 * 3) Si API devuelve 404, mostrar estado de "Producto no encontrado".
 * 4) Formatear precio en USD y fechas para visualización.
 *
 * Consideración PSP:
 * - Si el backend devuelve `psp_warning`, mostrar alerta visible en la parte
 *   inferior del detalle (ej. BUG-CREATE-001 por truncamiento de precio).
 *
 * HTML/JSX visual:
 * - Construir toda la maqueta dentro de <section className="visual-slot">.
 * - Incluir: header de detalle, tarjeta de información, alerta PSP y footer
 *   con botones de navegación/edición.
 */
export function VerProductoPage() {
  return (
    <main className="panel">
      <h2>Ver Producto</h2>
      <section className="visual-slot">
        <p>TODO: Aquí va la interfaz visual (HTML/JSX) para ver detalle de producto.</p>
      </section>
    </main>
  );
}
