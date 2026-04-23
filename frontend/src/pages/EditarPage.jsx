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

/* Consumo del endpoint */
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

  async function handleLoad(event) {
    event.preventDefault();
    setLoadingLoad(true);
    setError("");
    setWarning("");
    setMessage("");

    try {
      const product = await api.getProduct(productId);
      setName(product.name ?? "");
      setDescription(product.description ?? "");
      setPrice(product.price ?? "");
      setStock(product.stock ?? "");
      setIsActive(Boolean(product.is_active));
      setMessage("Producto cargado");
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

  async function handleUpdate(event) {
    event.preventDefault();
    setLoadingUpdate(true);
    setError("");
    setWarning("");
    setMessage("");

    try {
      const response = await api.updateProduct(productId, {
        name,
        description,
        price: Number(price),
        stock: Number(stock),
        is_active: isActive
      });
      setMessage("Producto actualizado");
      setWarning(response.psp_warning ?? "");
      if (response.product) {
        setName(response.product.name ?? "");
        setDescription(response.product.description ?? "");
        setPrice(response.product.price ?? "");
        setStock(response.product.stock ?? "");
        setIsActive(Boolean(response.product.is_active));
      }
    } catch (updateError) {
      setError(updateError?.message ?? "Error inesperado en la API");
    } finally {
      setLoadingUpdate(false);
    }
  }
}
