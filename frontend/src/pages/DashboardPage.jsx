import { useEffect, useState, useCallback } from "react";
import { api } from "../api/client";
import { ApiNotice } from "../components/ApiNotice";

export function DashboardPage() {
  // Estados para el bloque 1: Resumen General
  const [summaryData, setSummaryData] = useState(null);
  const [summaryLoading, setSummaryLoading] = useState(true);
  const [summaryError, setSummaryError] = useState("");
  const [summaryWarning, setSummaryWarning] = useState("");

  // Estados para el bloque 2: Alertas de Stock
  const [stockData, setStockData] = useState([]);
  const [stockLoading, setStockLoading] = useState(true);
  const [stockError, setStockError] = useState("");
  const [stockWarning, setStockWarning] = useState("");

  // Estados para el bloque 3: Actividad Reciente
  const [recentData, setRecentData] = useState([]);
  const [recentLoading, setRecentLoading] = useState(true);
  const [recentError, setRecentError] = useState("");
  const [recentWarning, setRecentWarning] = useState("");

  // Funciones de carga independientes
  const loadSummary = async () => {
    setSummaryLoading(true);
    setSummaryError("");
    setSummaryWarning("");
    try {
      const response = await api.dashboardSummary();
      setSummaryData(response);
      if (response.psp_warning) setSummaryWarning(response.psp_warning);
    } catch (error) {
      setSummaryError(error.message);
    } finally {
      setSummaryLoading(false);
    }
  };

  const loadStockAlerts = async () => {
    setStockLoading(true);
    setStockError("");
    setStockWarning("");
    try {
      const response = await api.dashboardStockAlerts();
      setStockData(Array.isArray(response) ? response : response.items || []);
      if (response.psp_warning) setStockWarning(response.psp_warning);
    } catch (error) {
      setStockError(error.message);
    } finally {
      setStockLoading(false);
    }
  };

  const loadRecentProducts = async () => {
    setRecentLoading(true);
    setRecentError("");
    setRecentWarning("");
    try {
      const response = await api.dashboardRecentProducts();
      setRecentData(Array.isArray(response) ? response : response.items || []);
      if (response.psp_warning) setRecentWarning(response.psp_warning);
    } catch (error) {
      setRecentError(error.message);
    } finally {
      setRecentLoading(false);
    }
  };

  // Carga general
  const loadAll = useCallback(() => {
    loadSummary();
    loadStockAlerts();
    loadRecentProducts();
  }, []);

  // Carga automática al montar el componente
  useEffect(() => {
    loadAll();
  }, [loadAll]);

  // Utilidad para formatear fechas (ej. "10 abr 2026")
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <main className="panel">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
        <div>
          <h2 style={{ marginBottom: "0.2rem" }}>Resumen general</h2>
          <small style={{ color: "#5b6b81" }}>GET /dashboard/summary</small>
        </div>
        <button onClick={loadAll} type="button">
          Actualizar datos
        </button>
      </div>

      <section className="visual-slot">
        <ApiNotice warning={summaryWarning} error={summaryError} />

        {/* --- rectangulos superiores --- */}
        <div className="card-grid" style={{ marginBottom: "2rem", marginTop: "1rem" }}>
          <div className="metric-card" style={{ background: "#f5f6f8" }}>
            <small style={{ color: "#5b6b81", fontWeight: "bold"}}>USUARIOS REGISTRADOS</small>
            <p>{summaryLoading ? "..." : summaryData?.users_total ?? "-"}</p>
            <small style={{ color: "#5b6b81" }}>Total en el sistema</small>
          </div>
          
          <div className="metric-card" style={{ background: "#f5f6f8" }}>
            <small style={{ color: "#5b6b81", fontWeight: "bold"}}>PRODUCTOS TOTALES</small>
            <p>{summaryLoading ? "..." : summaryData?.products_total ?? "-"}</p>
            <small style={{ color: "#5b6b81" }}>Activos e inactivos</small>
          </div>
          
          <div className="metric-card" style={{ background: "#f5f6f8" }}>
            <small style={{ color: "#5b6b81", fontWeight: "bold"}}>PRODUCTOS ACTIVOS</small>
            <p>{summaryLoading ? "..." : summaryData?.active_products ?? "-"}</p>
            <small style={{ color: "#5b6b81" }}>Disponibles en catalogo</small>
          </div>
          
          <div className="metric-card" style={{ background: "#f5f6f8" }}>
            <small style={{ color: "#5b6b81", fontWeight: "bold"}}>STOCK BAJO</small>
            <p style={{ color: "var(--danger)" }}>
              {summaryLoading ? "..." : summaryData?.low_stock_products ?? "-"}
            </p>
            <small style={{ color: "#5b6b81" }}>Menos de 5 unidades</small>
          </div>
        </div>

        {/* --- las tablas con resultados --- */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1rem" }}>
          
          {/* Tabla de inventario */}
          <div className="card" style={{ background: "#f5f6f8", border: "none" }}>
            <h3 style={{ fontSize: "1rem", display: "flex", alignItems: "center", gap: "0.5rem", color: "#5b6b81", marginBottom: "0.2rem" }}>
              ALERTAS DE INVENTARIO
              <span style={{ background: "var(--danger)", color: "#fff", padding: "0.1rem 0.4rem", borderRadius: "50%"}}>
                {stockData.length}
              </span>
            </h3>
            <small style={{ color: "#5b6b81", display: "block", marginBottom: "1rem" }}>GET /dashboard/stock-alerts</small>
            
            <ApiNotice warning={stockWarning} error={stockError} />
            
            {stockLoading ? (
              <p>Cargando alertas...</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th style={{ color: "#5b6b81"}}>PRODUCTO</th>
                    <th style={{ color: "#5b6b81"}}>STOCK</th>
                    <th style={{ color: "#5b6b81"}}>ESTADO</th>
                  </tr>
                </thead>
                <tbody>
                  {stockData.length === 0 ? (
                    <tr>
                      <td colSpan="3">No hay productos con stock bajo</td>
                    </tr>
                  ) : (
                    stockData.map((item) => (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>
                          <span style={{ background: "#fbcf33", color: "#8a4f13", padding: "0.2rem 0.5rem", borderRadius: "4px", fontWeight: "bold", fontSize: "0.85rem" }}>
                            {item.stock} un.
                          </span>
                        </td>
                        <td>
                          <span style={{ background: "#101b2f", color: "#fff", padding: "0.2rem 0.5rem", borderRadius: "4px", fontSize: "0.85rem" }}>
                            {item.is_active ? "Activo" : "Inactivo"}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>

          {/* Tabla de actividad reciente */}
          <div className="card" style={{ background: "#f5f6f8", border: "none" }}>
            <h3 style={{ fontSize: "1rem", display: "flex", alignItems: "center", gap: "0.5rem", color: "#5b6b81", marginBottom: "0.2rem" }}>
              ACTIVIDAD RECIENTE
              <span style={{ background: "#101b2f", color: "#fff", padding: "0.1rem 0.4rem", borderRadius: "50%"}}>
                {recentData.length}
              </span>
            </h3>
            <small style={{ color: "#5b6b81", display: "block", marginBottom: "1rem" }}>GET /dashboard/recent-products</small>
            
            <ApiNotice warning={recentWarning} error={recentError} />
            
            {recentLoading ? (
              <p>Cargando actividad...</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th style={{ color: "#5b6b81"}}>PRODUCTO</th>
                    <th style={{ color: "#5b6b81"}}>PRECIO</th>
                    <th style={{ color: "#5b6b81"}}>FECHA</th>
                  </tr>
                </thead>
                <tbody>
                  {recentData.length === 0 ? (
                    <tr>
                      <td colSpan="3">No hay actividad reciente.</td>
                    </tr>
                  ) : (
                    recentData.map((item) => (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>${item.price}</td>
                        <td>{formatDate(item.created_at)}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>

        </div>
      </section>
    </main>
  );
}
