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
import { useState } from "react";

import { api } from "../api/client";

export function AgregarPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [warning, setWarning] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    // VALIDAR CAMPOS
    if (!name || !price || !stock) {
      setError("Campos obligatorios");
      return;
    }

    if (Number(price) <= 0) {
      setError("Precio inválido");
      return;
    }

    if (Number(stock) < 0) {
      setError("Stock inválido");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");
      setWarning("");

      // CREAR PRODUCTO
      const response = await api.createProduct({
        name,
        description,
        price: Number(price),
        stock: Number(stock),
      });

      // LIMPIAR FORM
      setName("");
      setDescription("");
      setPrice("");
      setStock("");

      // MENSAJE
      setSuccess(`Producto creado: ${response.product.name}`);

      // WARNING PSP
      if (response.psp_warning) {
        setWarning(response.psp_warning);
      }

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="panel">
      <h2>Agregar Producto</h2>

      <section className="visual-slot">
        <div className="card" style={{ maxWidth: "500px", margin: "auto" }}>

          <form className="form-grid" onSubmit={handleSubmit}>

            {/* NOMBRE */}
            <label>
              Nombre
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>

            {/* DESCRIPCION */}
            <label>
              Descripción
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
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

            {/* BOTON */}
            <button type="submit" disabled={loading}>
              {loading ? "Guardando..." : "Crear producto"}
            </button>

          </form>

          {/* MENSAJES */}
          {error && <p className="notice-error">{error}</p>}
          {success && <p className="notice-success">{success}</p>}
          {warning && <p className="notice-warning">{warning}</p>}

        </div>
      </section>
    </main>
  );
}