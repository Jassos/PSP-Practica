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
import { ApiNotice } from "../components/ApiNotice";

function formatField(value) {
  return value === null || value === undefined ? "" : String(value);
}

export function EditarPage() {
  const [productId, setProductId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [loadingLoad, setLoadingLoad] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [message, setMessage] = useState("");
  const [warning, setWarning] = useState("");
  const [error, setError] = useState("");
  const [fieldError, setFieldError] = useState("");

  function resetStatus() {
    setError("");
    setMessage("");
    setWarning("");
    setFieldError("");
  }

  function handleCancel() {
    resetStatus();
    setProductId("");
    setName("");
    setDescription("");
    setPrice("");
    setStock("");
    setIsActive(false);
  }

  async function handleLoad(event) {
    event.preventDefault();
    resetStatus();
    setLoadingLoad(true);

    if (!productId.trim()) {
      setError("Ingrese un ID de producto válido.");
      setLoadingLoad(false);
      return;
    }

    try {
      const product = await api.getProduct(productId);
      setName(formatField(product.name));
      setDescription(formatField(product.description));
      setPrice(formatField(product.price));
      setStock(formatField(product.stock));
      setIsActive(Boolean(product.is_active));
      setMessage("Producto cargado correctamente.");
    } catch (loadError) {
      const message = loadError?.message ?? "Error inesperado en la API";
      if (message.includes("404")) {
        setError("Producto no encontrado");
      } else {
        setError(message);
      }
    } finally {
      setLoadingLoad(false);
    }
  }

  function validateForm() {
    if (!productId.trim()) {
      return "Debe cargar primero el ID del producto.";
    }
    if (!name.trim() || name.trim().length < 2) {
      return "El nombre debe tener al menos 2 caracteres.";
    }
    if (name.trim().length > 120) {
      return "El nombre no puede superar los 120 caracteres.";
    }
    if (description.trim().length > 500) {
      return "La descripción no puede superar los 500 caracteres.";
    }
    const priceValue = Number(price);
    if (!price || Number.isNaN(priceValue) || priceValue <= 0) {
      return "El precio debe ser un número mayor a 0.";
    }
    const stockValue = Number(stock);
    if (stock === "" || Number.isNaN(stockValue) || stockValue < 0 || stockValue > 10000) {
      return "El stock debe estar entre 0 y 10,000 unidades.";
    }
    return "";
  }

  async function handleUpdate(event) {
    event.preventDefault();
    resetStatus();
    const validationError = validateForm();
    if (validationError) {
      setFieldError(validationError);
      return;
    }

    setLoadingUpdate(true);

    try {
      const response = await api.updateProduct(productId, {
        name: name.trim(),
        description: description.trim(),
        price: Number(price),
        stock: Number(stock),
        is_active: isActive
      });

      setMessage("Producto actualizado correctamente.");
      setWarning(response.psp_warning ?? "");
      if (response.product) {
        setName(formatField(response.product.name));
        setDescription(formatField(response.product.description));
        setPrice(formatField(response.product.price));
        setStock(formatField(response.product.stock));
        setIsActive(Boolean(response.product.is_active));
      }
    } catch (updateError) {
      setError(updateError?.message ?? "Error inesperado en la API");
    } finally {
      setLoadingUpdate(false);
    }
  }

  return (
    <main className="panel">
      <h2>Editar producto</h2>
      <section className="visual-slot">
        <p>PUT /products/{productId || "{product_id}"}</p>

        <form className="form-grid" onSubmit={handleLoad}>
          <label>
            ID del producto
            <div className="inline-form">
              <input
                value={productId}
                onChange={(event) => setProductId(event.target.value)}
                placeholder="ej. 3"
              />
              <button type="submit" disabled={loadingLoad}>
                {loadingLoad ? "Cargando..." : "Cargar"}
              </button>
            </div>
          </label>
        </form>

        <form className="form-grid" onSubmit={handleUpdate}>
          <label>
            Nombre del producto
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Nombre del producto"
              minLength={2}
              maxLength={120}
            />
            <small>Mínimo 2 caracteres, máximo 120.</small>
          </label>

          <label>
            Descripción
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Descripción del producto"
              rows={4}
              maxLength={500}
            />
            <small>Opcional. Máximo 500 caracteres.</small>
          </label>

          <div className="form-grid" style={{ gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <label>
              Precio (USD)
              <input
                type="number"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                placeholder="0.00"
                min="0.01"
                step="0.01"
              />
              <small>Mayor a 0. Acepta decimales.</small>
            </label>

            <label>
              Stock (unidades)
              <input
                type="number"
                value={stock}
                onChange={(event) => setStock(event.target.value)}
                placeholder="0"
                min="0"
                max="10000"
                step="1"
              />
              <small>Entre 0 y 10,000 unidades.</small>
            </label>
          </div>

          <label className="switch-line">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(event) => setIsActive(event.target.checked)}
            />
            Producto activo
          </label>

          <ApiNotice
            title="Resultado"
            error={error || fieldError}
            warning={warning}
            success={message}
          />

          <div className="inline-form" style={{ justifyContent: "flex-end", gap: "0.8rem" }}>
            <button type="button" onClick={handleCancel} disabled={loadingLoad || loadingUpdate}>
              Cancelar
            </button>
            <button type="submit" disabled={loadingUpdate || loadingLoad}>
              {loadingUpdate ? "Actualizando..." : "Actualizar producto"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
