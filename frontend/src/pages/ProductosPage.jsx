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
import { useEffect, useState } from "react";

import { api } from "../api/client";

export function ProductosPage() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      setLoading(true);
      setError("");

      // OBTENER PRODUCTOS
      const data = await api.listProducts(true);

      setProducts(data);
      setFiltered(data);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // FILTRAR
  function handleSearch(value) {
    setSearch(value);

    const result = products.filter((p) =>
      p.name.toLowerCase().includes(value.toLowerCase())
    );

    setFiltered(result);
  }

  return (
    <main className="panel">
      <h2>Catálogo de productos</h2>

      <section className="visual-slot">

        {/* BUSQUEDA */}
        <div className="inline-form">
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        {/* ESTADOS */}
        {loading && <p>Cargando productos...</p>}
        {error && <p className="notice-error">{error}</p>}

        {!loading && filtered.length === 0 && (
          <p>No hay productos</p>
        )}

        {/* TABLA */}
        {!loading && filtered.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Estado</th>
                <th>Actualizado</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.name}</td>
                  <td>${p.price.toFixed(2)}</td>

                  {/* STOCK */}
                  <td>
                    <span
                      style={{
                        color: p.stock <= 5 ? "red" : "inherit",
                        fontWeight: p.stock <= 5 ? "bold" : "normal"
                      }}
                    >
                      {p.stock}
                    </span>
                  </td>

                  {/* ESTADO */}
                  <td>
                    <span
                      style={{
                        color: p.is_active ? "green" : "red",
                        fontWeight: "bold"
                      }}
                    >
                      {p.is_active ? "Activo" : "Inactivo"}
                    </span>
                  </td>

                  {/* FECHA */}
                  <td>
                    {new Date(p.updated_at).toLocaleDateString()}
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