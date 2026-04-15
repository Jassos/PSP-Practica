/**
 * DASHBOARD
 *
 * Esta vista requiere 3 bloques funcionales y 3 endpoints:
 *
 * 1) Resumen general (cards KPI)
 *    - GET /api/dashboard/summary
 *    - Cliente sugerido: api.dashboardSummary()
 *
 * 2) Alertas de inventario (tabla izquierda)
 *    - GET /api/dashboard/stock-alerts
 *    - Cliente sugerido: api.dashboardStockAlerts()
 *
 * 3) Actividad reciente (tabla derecha)
 *    - GET /api/dashboard/recent-products
 *    - Cliente sugerido: api.dashboardRecentProducts()
 *
 * Respuesta esperada para summary:
 * {
 *   users_total: number,
 *   products_total: number,
 *   active_products: number,
 *   low_stock_products: number,
 *   psp_warning?: string
 * }
 *
 * Respuesta esperada para stock-alerts:
 * {
 *   items: [
 *     {
 *       product_id: number,
 *       product_name: string,
 *       stock: number,
 *       status: "Activo" | "Inactivo"
 *     }
 *   ],
 *   psp_warning?: string
 * }
 *
 * Respuesta esperada para recent-products:
 * {
 *   items: [
 *     {
 *       product_id: number,
 *       product_name: string,
 *       price: number,
 *       created_at: string
 *     }
 *   ],
 *   psp_warning?: string
 * }
 *
 * Manejo recomendado:
 * 1) Cargar los 3 endpoints al entrar a la vista.
 * 2) Mostrar loading por bloque (summary, alertas, actividad).
 * 3) Mostrar estado vacío cuando no haya filas.
 * 4) Mostrar errores independientes por bloque para no romper toda la vista.
 * 5) Si summary devuelve psp_warning, mostrarlo como aviso en la cabecera.
 *
 * HTML/JSX visual:
 * - Cabecera: "Resumen general" + subtítulo "GET /dashboard/summary".
 * - Fila superior: 4 cards KPI (Usuarios registrados, Productos totales,
 *   Productos activos, Stock bajo).
 * - Fila inferior: 2 tablas en paralelo:
 *   a) "Alertas de inventario" con badge de cantidad
 *      (GET /dashboard/stock-alerts)
 *   b) "Actividad reciente" con badge de cantidad
 *      (GET /dashboard/recent-products)
 * - Mantener toda la maqueta dentro de <section className="visual-slot">.
 *
 * Nota de integración:
 * - Los 3 endpoints ya están implementados en backend.
 * - stock-alerts y recent-products incluyen psp_warning por bug intencional.
 */
export function DashboardPage() {
  return (
    <main className="panel">
      <h2>Dashboard</h2>
      <section className="visual-slot">
        <p>TODO: Aquí va la interfaz visual (HTML/JSX) del tablero de métricas.</p>
      </section>
    </main>
  );
}
