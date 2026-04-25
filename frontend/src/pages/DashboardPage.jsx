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
import { useEffect, useState } from "react";

import { api } from "../api/client";

export function DashboardPage() {
  const [summary, setSummary] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [recent, setRecent] = useState([]);

  const [loadingSummary, setLoadingSummary] = useState(true);
  const [loadingAlerts, setLoadingAlerts] = useState(true);
  const [loadingRecent, setLoadingRecent] = useState(true);

  const [errorSummary, setErrorSummary] = useState("");
  const [errorAlerts, setErrorAlerts] = useState("");
  const [errorRecent, setErrorRecent] = useState("");

  const [warningSummary, setWarningSummary] = useState("");
  const [warningAlerts, setWarningAlerts] = useState("");
  const [warningRecent, setWarningRecent] = useState("");

  useEffect(() => {
    loadSummary();
    loadAlerts();
    loadRecent();
  }, []);

  async function loadSummary() {
    try {
      setLoadingSummary(true);
      setErrorSummary("");

      const data = await api.dashboardSummary();

      setSummary(data);

      if (data.psp_warning) {
        setWarningSummary(data.psp_warning);
      }

    } catch (err) {
      setErrorSummary(err.message);
    } finally {
      setLoadingSummary(false);
    }
  }

  async function loadAlerts() {
    try {
      setLoadingAlerts(true);
      setErrorAlerts("");

      const data = await api.dashboardStockAlerts();

      setAlerts(data.items);

      if (data.psp_warning) {
        setWarningAlerts(data.psp_warning);
      }

    } catch (err) {
      setErrorAlerts(err.message);
    } finally {
      setLoadingAlerts(false);
    }
  }

  async function loadRecent() {
    try {
      setLoadingRecent(true);
      setErrorRecent("");

      const data = await api.dashboardRecentProducts();

      setRecent(data.items);

      if (data.psp_warning) {
        setWarningRecent(data.psp_warning);
      }

    } catch (err) {
      setErrorRecent(err.message);
    } finally {
      setLoadingRecent(false);
    }
  }

  return (
    <main className="panel">
      <h2>Dashboard</h2>

      <section className="visual-slot">

        {/* WARNING GLOBAL */}
        {warningSummary && (
          <p className="notice-warning">{warningSummary}</p>
        )}

        {/* SUMMARY */}
        <h3>Resumen general</h3>

        {loadingSummary && <p>Cargando...</p>}
        {errorSummary && <p className="notice-error">{errorSummary}</p>}

        {summary && (
          <div className="card-grid">
            <div className="metric-card">
              <small>Usuarios</small>
              <p>{summary.users_total}</p>
            </div>

            <div className="metric-card">
              <small>Productos totales</small>
              <p>{summary.products_total}</p>
            </div>

            <div className="metric-card">
              <small>Productos activos</small>
              <p>{summary.active_products}</p>
            </div>

            <div className="metric-card">
              <small>Stock bajo</small>
              <p>{summary.low_stock_products}</p>
            </div>
          </div>
        )}

        {/* ALERTAS */}
        <h3 style={{ marginTop: "2rem" }}>
          Alertas de inventario ({alerts.length})
        </h3>

        {loadingAlerts && <p>Cargando...</p>}
        {errorAlerts && <p className="notice-error">{errorAlerts}</p>}
        {warningAlerts && <p className="notice-warning">{warningAlerts}</p>}

        {!loadingAlerts && alerts.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Producto</th>
                <th>Stock</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {alerts.map((a) => (
                <tr key={a.product_id}>
                  <td>{a.product_id}</td>
                  <td>{a.product_name}</td>
                  <td style={{ color: "red", fontWeight: "bold" }}>
                    {a.stock}
                  </td>
                  <td>{a.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* ACTIVIDAD */}
        <h3 style={{ marginTop: "2rem" }}>
          Actividad reciente ({recent.length})
        </h3>

        {loadingRecent && <p>Cargando...</p>}
        {errorRecent && <p className="notice-error">{errorRecent}</p>}
        {warningRecent && <p className="notice-warning">{warningRecent}</p>}

        {!loadingRecent && recent.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Producto</th>
                <th>Precio</th>
                <th>Creado</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((r) => (
                <tr key={r.product_id}>
                  <td>{r.product_id}</td>
                  <td>{r.product_name}</td>
                  <td>${r.price.toFixed(2)}</td>
                  <td>
                    {new Date(r.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

      </section>
    </main>
  );
}
