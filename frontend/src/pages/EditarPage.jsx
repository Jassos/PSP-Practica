/**
 * EDITAR PRODUCTO
 *
 * Esta vista requiere 2 endpoints principales:
 *
 * 1) Cargar producto por ID (botón "Cargar"):
 *    - GET /api/products/{product_id}
 *    - Cliente sugerido: api.getProduct(productId)
 *
 * 2) Actualizar producto (botón "Actualizar producto"):
 *    - PUT /api/products/{product_id}
 *    - Cliente sugerido: api.updateProduct(productId, data)
 *
 * Payload de actualización (PUT):
 * {
 *   name: string,
 *   description: string,
 *   price: number,
 *   stock: number,
 *   is_active: boolean
 * }
 *
 * Respuesta esperada del GET:
 * {
 *   id, name, description, price, stock, is_active, created_at
 * }
 *
 * Respuesta esperada del PUT:
 * {
 *   product: { id, name, description, price, stock, is_active, created_at },
 *   psp_warning?: string
 * }
 *
 * Reglas visuales/funcionales de la maqueta:
 * - Encabezado: "Editar producto" + subtítulo "PUT /products/{product_id}".
 * - Bloque superior con input "ID del producto" + botón "Cargar".
 * - Formulario con campos:
 *   a) Nombre del producto (mínimo 2, máximo 120)
 *   b) Descripción (opcional, máximo 500)
 *   c) Precio (USD) > 0, acepta decimales
 *   d) Stock (unidades) entre 0 y 10,000
 *   e) Checkbox "Producto activo"
 * - Acciones al pie: botón "Cancelar" y botón "Actualizar producto".
 *
 * Manejo de estados y errores:
 * 1) Si GET devuelve 404, mostrar "Producto no encontrado".
 * 2) Mostrar loading independiente para "Cargar" y para "Actualizar".
 * 3) Mostrar errores de validación y de red sin perder los datos del formulario.
 * 4) Renderizar warning PSP cuando exista en la respuesta.
 *
 * Bug PSP esperado en esta vista:
 * - BUG-UPDATE-001: el backend ignora el campo stock aunque se envíe.
 * - Debe mostrarse una alerta visible en el formulario cuando llegue psp_warning.
 *
 * HTML/JSX visual:
 * - Construir toda la maqueta dentro de <section className="visual-slot">.
 * - Incluir: buscador por ID, formulario completo, alerta de bug PSP y footer de acciones.
 */
export function EditarPage() {
  return (
    <main className="panel">
      <h2>Editar</h2>
      <section className="visual-slot">
        <p>TODO: Aquí va la interfaz visual (HTML/JSX) para editar productos.</p>
      </section>
    </main>
  );
}
