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
import { useState } from "react";

/**
 * PRODUCTOS
 *
 * Esta vista consume 1 endpoint principal de catálogo:
 * - GET /api/products?include_inactive=true
 * - Cliente sugerido: api.listProducts(true)
 *
 * TODO: Reemplazar MOCK_PRODUCTS con la llamada real al API cuando se integre.
 */

const MOCK_PRODUCTS = [
  { id: 1, name: "Creatina Monohidratada", price: 18.5,  stock: 3,  is_active: true,  updated_at: "2026-04-06T00:00:00" },
  { id: 2, name: "Pre-workout C4 Original", price: 35.0,  stock: 0,  is_active: true,  updated_at: "2026-04-06T00:00:00" },
  { id: 3, name: "BCAA Complex 2:1:1",      price: 22.99, stock: 45, is_active: true,  updated_at: "2026-04-07T00:00:00" },
  { id: 4, name: "Vitamina D3 + K2",        price: 12.0,  stock: 2,  is_active: true,  updated_at: "2026-04-08T00:00:00" },
  { id: 5, name: "Omega 3 Fish Oil",        price: 15.75, stock: 89, is_active: false, updated_at: "2026-04-01T00:00:00" },
  { id: 6, name: "Glutamina Pure",          price: 28.0,  stock: 15, is_active: true,  updated_at: "2026-04-09T00:00:00" },
  { id: 7, name: "Magnesio Quelado",        price: 19.99, stock: 4,  is_active: false, updated_at: "2026-04-10T00:00:00" },
];

function formatPrice(price) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(price);
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toISOString().slice(0, 10); // 2026-04-06
}

function StockBadge({ stock }) {
  const isLow = stock <= 5;
  const style = {
    display: "inline-block",
    padding: "0.18rem 0.55rem",
    borderRadius: "999px",
    fontSize: "0.82rem",
    fontWeight: 600,
    background: isLow ? "#f5a623" : "transparent",
    color: isLow ? "#fff" : "#374151",
    border: isLow ? "none" : "none",
  };
  return <span style={style}>{stock} un.</span>;
}

function EstadoBadge({ isActive }) {
  const style = {
    display: "inline-block",
    padding: "0.2rem 0.7rem",
    borderRadius: "8px",
    fontSize: "0.82rem",
    fontWeight: 600,
    background: isActive ? "#1a2233" : "#dc2626",
    color: "#fff",
  };
  return <span style={style}>{isActive ? "Activo" : "Inactivo"}</span>;
}

export function ProductosPage() {
  const [search, setSearch] = useState("");

  const products = MOCK_PRODUCTS; // TODO: reemplazar con estado real del API

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="panel">
      {/* Encabezado */}
      <div style={{ marginBottom: "1.2rem" }}>
        <h2 style={{ margin: "0 0 0.15rem", fontSize: "1.3rem", fontWeight: 700 }}>
          Catalogo de suplementos
        </h2>
        <code style={{ fontSize: "0.82rem", color: "#6b7280" }}>GET /products</code>
      </div>

      <hr style={{ border: "none", borderTop: "1px solid var(--line)", margin: "0 0 1.2rem" }} />

      {/* Búsqueda */}
      <input
        type="text"
        placeholder="Buscar por nombre..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "0.6rem 0.9rem",
          border: "1px solid var(--line)",
          borderRadius: "10px",
          fontSize: "0.95rem",
          marginBottom: "1.2rem",
          background: "#fafafa",
          color: "var(--ink)",
        }}
      />

      {/* Tabla */}
      <section className="visual-slot">
        {filtered.length === 0 ? (
          <p style={{ color: "var(--ink-soft)", textAlign: "center", padding: "2rem 0" }}>
            No se encontraron productos con ese nombre.
          </p>
        ) : (
          <table>
            <thead>
              <tr>
                {["ID", "NOMBRE", "PRECIO", "STOCK", "ESTADO", "ACTUALIZADO"].map((col) => (
                  <th
                    key={col}
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      letterSpacing: "0.07em",
                      color: "#6b7280",
                      paddingBottom: "0.6rem",
                      textAlign: col === "ID" ? "right" : "left",
                    }}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((product) => (
                <tr key={product.id}>
                  <td
                    style={{
                      color: "#9ca3af",
                      fontSize: "0.88rem",
                      textAlign: "right",
                      paddingRight: "1.2rem",
                      width: "40px",
                    }}
                  >
                    {product.id}
                  </td>
                  <td
                    style={{
                      fontWeight: product.is_active ? 700 : 400,
                      color: product.is_active ? "var(--ink)" : "#6b7280",
                      fontSize: "0.95rem",
                    }}
                  >
                    {product.name}
                  </td>
                  <td style={{ color: "#374151", fontSize: "0.92rem" }}>
                    {formatPrice(product.price)}
                  </td>
                  <td>
                    <StockBadge stock={product.stock} />
                  </td>
                  <td>
                    <EstadoBadge isActive={product.is_active} />
                  </td>
                  <td style={{ color: "#6b7280", fontSize: "0.88rem" }}>
                    {formatDate(product.updated_at)}
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

