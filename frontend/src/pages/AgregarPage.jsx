/**
 * AGREGAR PRODUCTO
 *
 * Endpoint backend a consumir:
 * - POST /api/products
 * - Cliente sugerido: api.createProduct(data)
 *
 * Payload esperado:
 * {
 *   name: string,
 *   description: string,
 *   price: number,
 *   stock: number
 * }
 *
 * Respuesta esperada:
 * {
 *   product: { id, name, description, price, stock, is_active, created_at },
 *   psp_warning?: string
 * }
 *
 * Manejo recomendado:
 * 1) Validar formulario antes de enviar.
 * 2) Mostrar estado loading durante la petición.
 * 3) Mostrar mensaje de éxito/error/warning tras la respuesta.
 *
 * HTML/JSX visual:
 * - Implementar el formulario dentro del bloque <section className="visual-slot">.
 * - Agregar inputs para nombre, descripción, precio y stock.
 * - Agregar botón de submit y zona de mensajes.
 */
export function AgregarPage() {
  return (
    <main className="panel">
      <h2>Agregar</h2>
      <section className="visual-slot">
        <p>TODO: Aquí va la interfaz visual (HTML/JSX) para crear productos.</p>
      </section>
    </main>
  );
}
