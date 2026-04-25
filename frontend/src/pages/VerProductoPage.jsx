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
import { useState } from "react";

import { api } from "../api/client";

export function VerProductoPage() {
  const [productId, setProductId] = useState("");
  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [warning, setWarning] = useState("");

  async function handleLoad() {
    if (!productId) {
      setError("ID requerido");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setWarning("");
      setProduct(null);

      // OBTENER PRODUCTO
      const data = await api.getProduct(productId);

      setProduct(data);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="panel">
      <h2>Detalle de producto</h2>

      <section className="visual-slot">

        {/* BUSCAR */}
        <div className="inline-form">
          <input
            type="number"
            placeholder="ID del producto"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
          />
          <button onClick={handleLoad} disabled={loading}>
            {loading ? "Cargando..." : "Cargar"}
          </button>
        </div>

        {/* ERRORES */}
        {error && <p className="notice-error">{error}</p>}

        {/* DETALLE */}
        {product && (
          <div className="card">

            <h3>
              {product.name}{" "}
              <span style={{ fontSize: "0.8rem", color: "#888" }}>
                (ID: {product.id})
              </span>
            </h3>

            {/* ESTADO */}
            <p>
              Estado:{" "}
              <strong style={{ color: product.is_active ? "green" : "red" }}>
                {product.is_active ? "Activo" : "Inactivo"}
              </strong>
            </p>

            {/* PRECIO */}
            <p>
              Precio: <strong>${product.price.toFixed(2)}</strong>
            </p>

            {/* STOCK */}
            <p>
              Stock:{" "}
              <strong style={{ color: product.stock <= 5 ? "red" : "inherit" }}>
                {product.stock}
              </strong>
            </p>

            {/* DESCRIPCION */}
            <p>{product.description}</p>

            {/* INFO */}
            <hr />
            <p>
              Creado: {new Date(product.created_at).toLocaleString()}
            </p>
            <p>
              Última actualización: {new Date(product.updated_at).toLocaleString()}
            </p>

            {/* WARNING PSP */}
            {warning && <p className="notice-warning">{warning}</p>}

          </div>
        )}

      </section>
    </main>
  );
}
}
