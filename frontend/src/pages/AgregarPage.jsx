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
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: ""
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [pspWarning, setPspWarning] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const validate = () => {
    let errors = {};

    if (!form.name || form.name.length < 2) {
      errors.name = "El nombre debe tener al menos 2 caracteres";
    }

    if (!form.price || Number(form.price) <= 0) {
      errors.price = "El precio debe ser mayor a 0";
    }

    if (
      form.stock === "" ||
      Number(form.stock) < 0 ||
      Number(form.stock) > 10000
    ) {
      errors.stock = "El stock debe estar entre 0 y 10000";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);
    setSuccess(null);
    setFieldErrors({});
    setPspWarning(null);

    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setLoading(true);

    try {
      const payload = {
        name: form.name,
        description: form.description || "",
        price: parseFloat(form.price),
        stock: parseInt(form.stock)
      };

      const res = await api.createProduct(payload);

      setSuccess(`Producto creado con ID: ${res.product.id}`);

      if (res.psp_warning) {
        setPspWarning(res.psp_warning);
      }

      // limpiar formulario
      setForm({
        name: "",
        description: "",
        price: "",
        stock: ""
      });

    } catch (err) {
      if (err.response && err.response.status === 422) {
        const backendErrors = {};
        err.response.data.detail.forEach((e) => {
          backendErrors[e.loc[1]] = e.msg;
        });
        setFieldErrors(backendErrors);
      } else {
        setError("Ocurrió un error inesperado. Intenta nuevamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="panel">
      <h2>Agregar</h2>

      <section className="visual-slot">
        <h3>Crear Producto</h3>

        {success && <div>{success}</div>}
        {pspWarning && <div>{pspWarning}</div>}
        {error && <div>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div>
            <label>Nombre</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
            {fieldErrors.name && <p>{fieldErrors.name}</p>}
          </div>

          <div>
            <label>Descripción</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Precio</label>
            <input
              type="number"
              step="0.01"
              name="price"
              value={form.price}
              onChange={handleChange}
            />
            {fieldErrors.price && <p>{fieldErrors.price}</p>}
          </div>

          <div>
            <label>Stock</label>
            <input
              type="number"
              name="stock"
              value={form.stock}
              onChange={handleChange}
            />
            {fieldErrors.stock && <p>{fieldErrors.stock}</p>}
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Guardando..." : "Crear Producto"}
          </button>
        </form>
      </section>
    </main>
  );
}

