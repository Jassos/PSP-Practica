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
import { useState } from "react";

import { api } from "../api/client";

export function EditarPage() {
  const [productId, setProductId] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [isActive, setIsActive] = useState(true);

  const [loadingLoad, setLoadingLoad] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [warning, setWarning] = useState("");

  async function handleLoad() {
    if (!productId) {
      setError("ID requerido");
      return;
    }

    try {
      setLoadingLoad(true);
      setError("");
      setSuccess("");
      setWarning("");

      // OBTENER PRODUCTO
      const product = await api.getProduct(productId);

      // LLENAR FORM
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setStock(product.stock);
      setIsActive(product.is_active);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingLoad(false);
    }
  }

  async function handleUpdate(e) {
    e.preventDefault();

    if (!productId) {
      setError("Cargar producto primero");
      return;
    }

    try {
      setLoadingUpdate(true);
      setError("");
      setSuccess("");
      setWarning("");

      // ACTUALIZAR PRODUCTO
      const response = await api.updateProduct(productId, {
        name,
        description,
        price: Number(price),
        stock: Number(stock),
        is_active: isActive
      });

      setSuccess(`Producto actualizado: ${response.product.name}`);

      // WARNING PSP
      if (response.psp_warning) {
        setWarning(response.psp_warning);
      }

    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingUpdate(false);
    }
  }

  return (
    <main className="panel">
      <h2>Editar producto</h2>

      <section className="visual-slot">

        {/* BUSCAR */}
        <div className="inline-form">
          <input
            type="number"
            placeholder="ID del producto"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
          />
          <button onClick={handleLoad} disabled={loadingLoad}>
            {loadingLoad ? "Cargando..." : "Cargar"}
          </button>
        </div>

        {/* FORM */}
        <form className="form-grid" onSubmit={handleUpdate}>

          {/* NOMBRE */}
          <label>
            Nombre
            <input value={name} onChange={(e) => setName(e.target.value)} />
          </label>

          {/* DESCRIPCION */}
          <label>
            Descripción
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
          </label>

          {/* PRECIO */}
          <label>
            Precio
            <input
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>

          {/* STOCK */}
          <label>
            Stock
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </label>

          {/* ESTADO */}
          <label className="switch-line">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
            />
            Producto activo
          </label>

          {/* BOTONES */}
          <button type="submit" disabled={loadingUpdate}>
            {loadingUpdate ? "Actualizando..." : "Actualizar producto"}
          </button>

        </form>

        {/* MENSAJES */}
        {error && <p className="notice-error">{error}</p>}
        {success && <p className="notice-success">{success}</p>}
        {warning && <p className="notice-warning">{warning}</p>}

      </section>
    </main>
  );
}