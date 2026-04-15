## 1. Contexto del modulo
El Equipo 5 es responsable del modulo **Agregar Producto** dentro de la practica PSP sobre una aplicacion CRUD.

## 2. Objetivo general
Implementar y validar el flujo de creacion de productos para que un usuario pueda llenar el formulario, enviarlo al backend y recibir confirmacion clara de exito, error de validacion o error de servidor. El equipo tambien debe detectar y documentar el bug intencional PSP presente en este endpoint.

## 3. Alcance del Equipo 5

### Incluye
- Vista de formulario de creacion en frontend (`AgregarPage.jsx`).
- Consumo del endpoint de creacion de producto.
- Validaciones minimas de formulario en el cliente.
- Manejo y visualizacion del campo `psp_warning` en la respuesta del backend.
- Mensajes de exito, error de validacion y error inesperado legibles para el usuario.

### No incluye
- Editar ni eliminar productos existentes.
- Autenticacion ni sesion.
- Subida de imagenes u otros campos fuera del schema actual.

## 4. Estado base del proyecto (punto de partida)
Actualmente ya existe:
- Endpoint de creacion: `POST /api/products`.
- Esquema de entrada `ProductCreate` con campos `name`, `description`, `price` y `stock`.
- Esquema de respuesta `ProductMutationResponse` que incluye `product` y `psp_warning`.
- Pagina `AgregarPage.jsx` con estructura base y comentarios guia.
- Cliente API con metodo `createProduct(data)`.

El equipo debe tomar esta base y desarrollar el formulario funcional dentro del bloque `<section className="visual-slot">`.

## 4.1 Bug intencional PSP — BUG-CREATE-001
El router de productos contiene un bug intencional en el endpoint de creacion:

> **BUG-CREATE-001:** El precio (`price`) se trunca a entero al momento de guardar.
> Por ejemplo, enviar `price: 19.99` resulta en que el producto queda con `price: 19`.

El backend devuelve el campo `psp_warning` en la respuesta cuando ocurre este bug.
El equipo **debe detectar este comportamiento** y mostrar la advertencia al usuario de forma visible.

## 4.2 End-points relacionados al Equipo 5

| Modulo | Metodo | Ruta | Ubicacion | Campo | Tipo | Requerido | Regla | Descripcion |
|---|---|---|---|---|---|---|---|---|
| Productos/Crear | POST | /api/products | Body | name | string | Si | Min 2, max 120 caracteres | Nombre del producto |
| Productos/Crear | POST | /api/products | Body | description | string | No | Max 500 caracteres, default "" | Descripcion del producto |
| Productos/Crear | POST | /api/products | Body | price | float | Si | Mayor a 0 | Precio unitario |
| Productos/Crear | POST | /api/products | Body | stock | integer | Si | Min 0, max 10000 | Unidades disponibles |

No forman parte del alcance de este equipo: listar, editar o eliminar productos, auth ni dashboard.

## 5. Archivos clave para trabajar

### Backend (solo lectura, no modificar)
- `backend/app/routers/products.py` — endpoint `POST /products`
- `backend/app/schemas.py` — esquemas `ProductCreate` y `ProductMutationResponse`
- `backend/app/crud.py` — funcion `create_product`

### Frontend
- `frontend/src/pages/AgregarPage.jsx`
- `frontend/src/api/client.js`
- `frontend/src/App.jsx` — ruta: `/productos/crear`

## 6. Requerimientos funcionales obligatorios
1. El formulario debe pedir: **Nombre**, **Descripcion** (opcional), **Precio** y **Stock**.
2. Si los datos son validos, debe crear el producto y mostrar mensaje de confirmacion con el ID asignado.
3. Si la respuesta incluye `psp_warning`, debe mostrarse como una alerta visible e identificable.
4. Si hay error de validacion del backend (422), debe mostrarse el mensaje de campo especifico.
5. Si hay error inesperado de red o servidor, debe mostrarse un mensaje generico comprensible.

## 7. Requerimientos tecnicos minimos
1. Mantener compatibilidad con el contrato actual del endpoint (`/api/products`).
2. Enviar siempre `Content-Type: application/json` (ya manejado por el cliente API).
3. Respetar estilo del proyecto: componentes funcionales React, fetch a traves del cliente API (`api.createProduct`).
4. No romper rutas ya existentes en `App.jsx`.
5. El campo `price` debe enviarse como numero (`float`), no como string.

## 8. Flujo PSP sugerido para el equipo

### Fase 1 - Planificacion
- Revisar alcance y dividir tareas internas: estructura del formulario, validaciones, integracion, pruebas.
- Estimar tiempo por tarea.

### Fase 2 - Diseño
- Definir comportamiento del formulario en los casos:
  - exito con y sin `psp_warning`,
  - error de validacion de campo,
  - producto con precio decimal (para detectar BUG-CREATE-001),
  - error inesperado de red/servidor.

### Fase 3 - Desarrollo
- Implementar el formulario con sus campos y controles de estado.
- Agregar validaciones minimas en cliente antes de enviar.
- Mostrar respuesta del backend: exito, warning PSP y errores.
- Verificar que `price` se envia como numero y que `description` permite enviarse vacio.

### Fase 4 - Pruebas
- Ejecutar pruebas manuales guiadas por checklist.
- Registrar defectos detectados (incluido BUG-CREATE-001) y correcciones aplicadas.

### Fase 5 - Postmortem PSP
- Comparar tiempo estimado vs real.
- Documentar causas de desviaciones.
- Listar lecciones aprendidas para el siguiente modulo.

## 9. Checklist de pruebas manuales
1. Creacion exitosa con todos los campos validos.
2. Creacion exitosa con descripcion vacia (campo opcional).
3. Creacion con precio decimal (ej. 19.99) → verificar BUG-CREATE-001 en la respuesta y mostrar `psp_warning`.
4. Error de validacion por nombre demasiado corto (menos de 2 caracteres).
5. Error de validacion por precio igual a 0 o negativo.
6. Error de validacion por stock mayor a 10000.
7. Verificacion de limpieza o deshabilitacion del formulario tras envio exitoso.
8. Verificacion de mensaje de error cuando la API no responde.

## 10. Entregables del Equipo 5
1. Codigo funcional de `AgregarPage.jsx` con formulario, validaciones y manejo de `psp_warning`.
2. Evidencia de pruebas manuales (capturas o bitacora de casos), incluyendo la deteccion de BUG-CREATE-001.
3. Resumen PSP breve:
   - plan inicial,
   - tiempo real invertido,
   - defectos encontrados,
   - acciones correctivas.

## 11. Criterios de aceptacion
- El formulario crea productos correctamente y muestra confirmacion con ID.
- El campo `psp_warning` se renderiza de forma visible cuando el backend lo devuelve.
- Los errores de validacion son perceptibles y comprensibles.
- El codigo queda legible y mantenible.
- La evidencia PSP y de pruebas esta completa, incluyendo la observacion del bug intencional.

## 12. Formato esperado/ideal

### Request ideal (crear producto)

```json
{
  "name": "Creatina Monohidratada",
  "description": "Suplemento para rendimiento muscular.",
  "price": 19.99,
  "stock": 50
}
```

### Response ideal — exito (201) sin bug

```json
{
  "product": {
    "id": 5,
    "name": "Creatina Monohidratada",
    "description": "Suplemento para rendimiento muscular.",
    "price": 19.99,
    "stock": 50,
    "is_active": true,
    "created_at": "2026-04-15T18:20:00",
    "updated_at": "2026-04-15T18:20:00"
  },
  "psp_warning": null
}
```

### Response real — exito (201) con BUG-CREATE-001

```json
{
  "product": {
    "id": 5,
    "name": "Creatina Monohidratada",
    "description": "Suplemento para rendimiento muscular.",
    "price": 19,
    "stock": 50,
    "is_active": true,
    "created_at": "2026-04-15T18:20:00",
    "updated_at": "2026-04-15T18:20:00"
  },
  "psp_warning": "BUG-CREATE-001: El precio se trunca a entero al guardar. Fallo de logica intencional."
}
```

### Response esperada — error de validacion (422)

```json
{
  "detail": [
    {
      "type": "greater_than",
      "loc": ["body", "price"],
      "msg": "Input should be greater than 0",
      "input": 0,
      "ctx": { "gt": 0 }
    }
  ]
}
```

### Criterios de formato ideal

- `name` no debe enviarse vacio ni con menos de 2 caracteres.
- `price` debe enviarse como numero flotante mayor a 0 (no como string).
- `stock` debe enviarse como entero entre 0 y 10000.
- `description` puede omitirse o enviarse como string vacio.
- Si `psp_warning` no es null, debe mostrarse como alerta en la interfaz.
