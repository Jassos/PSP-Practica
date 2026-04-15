## 1. Contexto del modulo
El Equipo 6 es responsable del modulo **Ver Producto** dentro de la practica PSP sobre una aplicacion CRUD.

## 2. Objetivo general
Implementar y validar la vista de detalle de un producto para que un usuario pueda consultar toda la informacion de un producto especifico, incluyendo sus metricas, fechas de registro y posibles advertencias PSP provenientes del backend.

## 3. Alcance del Equipo 6

### Incluye
- Vista de detalle de producto en frontend (`VerProductoPage.jsx`).
- Consumo del endpoint de detalle por ID.
- Manejo de estado de carga (loading), producto no encontrado (404) y error de servidor.
- Visualizacion del campo `psp_warning` si el producto fue creado con el bug BUG-CREATE-001.
- Botones de navegacion: "Volver al listado" y "Editar producto".

### No incluye
- Editar ni eliminar el producto desde esta vista.
- Autenticacion ni sesion.
- Listado de productos.

## 4. Estado base del proyecto (punto de partida)
Actualmente ya existe:
- Endpoint de detalle: `GET /api/products/{product_id}`.
- Esquema de respuesta `ProductPublic` con todos los campos necesarios.
- Pagina `VerProductoPage.jsx` con estructura base y comentarios guia.
- Cliente API con metodo `getProduct(productId)`.
- Ruta en `App.jsx`: `/productos/:id` apuntando a `VerProductoPage`.

El equipo debe tomar esta base y desarrollar la interfaz de detalle dentro del bloque `<section className="visual-slot">`.

## 4.1 Consideracion PSP — BUG-CREATE-001
Los productos creados con el endpoint `POST /api/products` pueden tener el precio truncado a entero
por el bug intencional BUG-CREATE-001. Aunque este bug pertenece al modulo del Equipo 3, **su efecto
es visible en la vista de detalle**: el precio mostrado puede no coincidir con el valor decimal original.

La vista debe estar preparada para mostrar el campo `psp_warning` si este llega embebido en alguna
respuesta futura del backend. Por el momento el endpoint `GET /products/{id}` no devuelve `psp_warning`,
pero el equipo debe documentar la observacion si detecta precios truncados al revisar productos.

## 4.2 End-points relacionados al Equipo 6

| Modulo | Metodo | Ruta | Ubicacion | Campo | Tipo | Requerido | Regla | Descripcion |
|---|---|---|---|---|---|---|---|---|
| Productos/Detalle | GET | /api/products/{product_id} | Path | product_id | integer | Si | Debe existir en BD | ID del producto a consultar |

No forman parte del alcance de este equipo: crear, editar o eliminar productos, auth ni dashboard.

## 5. Archivos clave para trabajar

### Backend (solo lectura, no modificar)
- `backend/app/routers/products.py` — endpoint `GET /products/{product_id}`
- `backend/app/schemas.py` — esquema `ProductPublic`
- `backend/app/crud.py` — funcion `get_product_by_id`

### Frontend
- `frontend/src/pages/VerProductoPage.jsx`
- `frontend/src/api/client.js`
- `frontend/src/App.jsx` — ruta actual: `/productos/:id`

## 6. Requerimientos funcionales obligatorios
1. La vista debe mostrar el detalle completo del producto: **nombre, ID, precio, descripcion, stock, estado y fechas**.
2. Incluir un badge de estado (Activo / Inactivo) visible en el encabezado.
3. Mostrar un bloque de "Informacion del registro" con: fecha de creacion, ultima actualizacion, ID y visibilidad (`is_active`).
4. Si la API devuelve 404, mostrar un estado de "Producto no encontrado" con mensaje descriptivo.
5. Mostrar indicador de carga (loading) mientras se consulta el backend.
6. Incluir botones de navegacion: "Volver al listado" y "Editar producto".
7. Si la respuesta incluye `psp_warning`, mostrarlo como alerta visible en la parte inferior del detalle.

## 7. Requerimientos tecnicos minimos
1. Obtener el `product_id` desde la URL (parametro de ruta).
2. Llamar a `api.getProduct(productId)` al montar la vista.
3. Mantener compatibilidad con el contrato actual del endpoint (`/api/products/{product_id}`).
4. Respetar estilo del proyecto: componentes funcionales React, fetch a traves del cliente API.
5. No romper rutas ya existentes en `App.jsx`.
6. Formatear precio en USD y fechas en formato legible.

## 8. Flujo PSP sugerido para el equipo

### Fase 1 - Planificacion
- Revisar alcance y dividir tareas internas: estructura HTML/JSX, logica de carga, manejo de errores, navegacion.
- Estimar tiempo por tarea.

### Fase 2 - Diseño
- Definir comportamiento de la vista en los casos:
  - carga exitosa del producto,
  - producto no encontrado (404),
  - error de red o servidor,
  - producto con precio potencialmente truncado (BUG-CREATE-001).

### Fase 3 - Desarrollo
- Implementar lectura del ID desde la URL o estado de navegacion.
- Construir la tarjeta de detalle con todos los campos requeridos.
- Agregar indicador de loading y manejo de errores.
- Agregar navegacion a listado y a edicion.
- Agregar zona de alerta PSP si `psp_warning` esta presente.

### Fase 4 - Pruebas
- Ejecutar pruebas manuales guiadas por checklist.
- Registrar defectos detectados y correcciones aplicadas.

### Fase 5 - Postmortem PSP
- Comparar tiempo estimado vs real.
- Documentar causas de desviaciones.
- Listar lecciones aprendidas para el siguiente modulo.

## 9. Checklist de pruebas manuales
1. La vista carga y muestra correctamente el detalle de un producto existente.
2. El badge de estado muestra "Activo" o "Inactivo" segun corresponda.
3. El precio se muestra con formato de moneda (ej. $19.00 USD).
4. Las fechas de creacion y actualizacion se muestran en formato legible.
5. Se muestra indicador de loading mientras se realiza la peticion.
6. Si el producto no existe (ID invalido), se muestra "Producto no encontrado".
7. Se muestra mensaje de error cuando la API no responde.
8. Los botones "Volver al listado" y "Editar producto" navegan correctamente.
9. Si el producto fue creado con precio decimal y tiene precio truncado, se observa la discrepancia (documentar como hallazgo PSP).

## 10. Entregables del Equipo 6
1. Codigo funcional de `VerProductoPage.jsx` con detalle completo, loading, manejo de 404 y zona de alerta PSP.
2. Evidencia de pruebas manuales (capturas o bitacora de casos).
3. Resumen PSP breve:
   - plan inicial,
   - tiempo real invertido,
   - defectos encontrados,
   - acciones correctivas.

## 11. Criterios de aceptacion
- La vista muestra todos los campos requeridos con formato correcto.
- El estado de loading, el 404 y el error de red tienen representacion visual clara.
- El boton de retorno al listado funciona sin errores.
- La zona de alerta PSP se renderiza cuando `psp_warning` esta presente.
- El codigo queda legible y mantenible.
- La evidencia PSP y de pruebas esta completa.

## 12. Formato esperado/ideal

### Response del detalle — exito (200)

```json
{
  "id": 5,
  "name": "Creatina Monohidratada",
  "description": "Suplemento para rendimiento muscular.",
  "price": 19.0,
  "stock": 50,
  "is_active": true,
  "created_at": "2026-04-15T18:20:00",
  "updated_at": "2026-04-15T18:20:00"
}
```

> Nota: si el producto fue creado mientras BUG-CREATE-001 estaba activo, `price` aparecera
> como entero (ej. `19.0` en lugar de `19.99`). Esta es la evidencia observable del bug.

### Response esperada — producto no encontrado (404)

```json
{
  "detail": "Producto no encontrado."
}
```

### Criterios de formato ideal

- `price` debe formatearse como moneda: `$19.00 USD`.
- `is_active: true` → badge "Activo"; `is_active: false` → badge "Inactivo" en rojo.
- `created_at` y `updated_at` formateados en espanol o formato legible (ej. `15/04/2026 18:20`).
- Si `psp_warning` no es null, debe mostrarse como alerta en la parte inferior de la vista.
- El ID del producto debe obtenerse de la URL; no hardcodearlo en el componente.
