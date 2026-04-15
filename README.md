## 1. Contexto del modulo
El Equipo 4 es responsable del modulo **Pagina de Productos** dentro de la practica PSP sobre una aplicacion CRUD.

## 2. Objetivo general
Implementar y validar la vista de listado de productos para que un usuario pueda consultar el catalogo completo, buscarlo por nombre y distinguir visualmente el estado y stock de cada producto.

## 3. Alcance del Equipo 4

### Incluye
- Vista de listado de productos en frontend (`ProductosPage.jsx`).
- Consumo del endpoint de listado con el parametro `include_inactive`.
- Filtrado por nombre en el cliente (sin peticion adicional al backend).
- Badges visuales de estado (Activo / Inactivo) y alerta de stock bajo.
- Mensajes de estado vacío y error de API.

### No incluye
- Crear, editar ni eliminar productos.
- Autenticacion ni sesion.
- Paginacion (fuera del alcance de esta practica).

## 4. Estado base del proyecto (punto de partida)
Actualmente ya existe:
- Endpoint de listado: `GET /api/products`.
- Esquema de respuesta (`ProductPublic`) con todos los campos necesarios.
- Pagina `ProductosPage.jsx` con estructura base y comentarios guia.
- Cliente API con metodo `listProducts(includeInactive)`.

El equipo debe tomar esta base y desarrollar la interfaz funcional dentro del bloque `<section className="visual-slot">`.

## 4.1 End-points relacionados al Equipo 4

| Modulo | Metodo | Ruta | Ubicacion | Campo | Tipo | Requerido | Regla | Descripcion |
|---|---|---|---|---|---|---|---|---|
| Productos/Listado | GET | /api/products | Query | include_inactive | boolean | No | Default: true | Si es true retorna productos activos e inactivos |

No forman parte del alcance de este equipo: crear, editar, eliminar productos, auth ni dashboard.

## 5. Archivos clave para trabajar

### Backend (solo lectura, no modificar)
- `backend/app/routers/products.py` — endpoint `GET /products`
- `backend/app/schemas.py` — esquema `ProductPublic`
- `backend/app/crud.py` — funcion `list_products`

### Frontend
- `frontend/src/pages/ProductosPage.jsx`
- `frontend/src/api/client.js`
- `frontend/src/App.jsx` — ruta: `/productos/lista`

## 6. Requerimientos funcionales obligatorios
1. La vista debe mostrar una tabla con las columnas: **ID | NOMBRE | PRECIO | STOCK | ESTADO | ACTUALIZADO**.
2. Incluir un campo de busqueda que filtre la tabla en tiempo real por nombre del producto.
3. Los productos inactivos deben diferenciarse visualmente (badge rojo "Inactivo").
4. El stock bajo (≤ 5 unidades) debe mostrarse con una alerta visual (badge o color distinto).
5. Si la API falla, mostrar un mensaje de error legible.
6. Si no hay coincidencias de busqueda, mostrar un estado vacio con mensaje descriptivo.

## 7. Requerimientos tecnicos minimos
1. Llamar al endpoint con `include_inactive=true` para mostrar todo el catalogo.
2. El filtro de busqueda debe operar sobre los datos ya cargados en memoria (sin nueva peticion al backend).
3. Mantener compatibilidad con el contrato actual del endpoint (`/api/products`).
4. Respetar estilo del proyecto: componentes funcionales React, fetch a traves del cliente API (`api.listProducts`), sin librerias de UI externas.
5. No romper rutas ya existentes en `App.jsx`.

## 8. Flujo PSP sugerido para el equipo

### Fase 1 - Planificacion
- Revisar alcance y dividir tareas internas: estructura HTML/JSX, logica de filtrado, badges, integracion API.
- Estimar tiempo por tarea.

### Fase 2 - Diseño
- Definir comportamiento en los casos:
  - carga exitosa con productos,
  - busqueda sin coincidencias,
  - lista vacia desde API,
  - error de red o servidor.

### Fase 3 - Desarrollo
- Implementar llamada al API y almacenar resultado en estado.
- Construir tabla con formato de precio (USD) y fecha de actualizacion.
- Agregar campo de busqueda y logica de filtrado.
- Agregar badges de estado y stock.

### Fase 4 - Pruebas
- Ejecutar pruebas manuales guiadas por checklist.
- Registrar defectos detectados y correcciones aplicadas.

### Fase 5 - Postmortem PSP
- Comparar tiempo estimado vs real.
- Documentar causas de desviaciones.
- Listar lecciones aprendidas para el siguiente modulo.

## 9. Checklist de pruebas manuales
1. La tabla carga y muestra productos al montar la vista.
2. El filtro de busqueda reduce la tabla correctamente al escribir.
3. Al borrar el texto de busqueda se restaura la lista completa.
4. Los productos inactivos muestran el badge "Inactivo" en rojo.
5. Los productos con stock ≤ 5 muestran la alerta visual de stock bajo.
6. El precio se muestra con formato de moneda (ej. $9.99 USD).
7. La fecha "Actualizado" se muestra en formato legible.
8. Se muestra estado vacio cuando la busqueda no tiene resultados.
9. Se muestra mensaje de error cuando la API no responde.

## 10. Entregables del Equipo 4
1. Codigo funcional de `ProductosPage.jsx` con tabla, filtro y badges.
2. Evidencia de pruebas manuales (capturas o bitacora de casos).
3. Resumen PSP breve:
   - plan inicial,
   - tiempo real invertido,
   - defectos encontrados,
   - acciones correctivas.

## 11. Criterios de aceptacion
- La tabla muestra todos los campos requeridos con formato correcto.
- El filtro funciona sin recargar pagina ni volver a llamar al backend.
- Los estados visuales (activo/inactivo, stock bajo) son claros y comprensibles.
- El codigo queda legible y mantenible.
- La evidencia PSP y de pruebas esta completa.

## 12. Formato esperado/ideal

### Response del listado — exito (200)

```json
[
  {
    "id": 1,
    "name": "Creatina Monohidratada",
    "description": "Suplemento para rendimiento muscular.",
    "price": 19.99,
    "stock": 3,
    "is_active": true,
    "created_at": "2026-04-10T10:00:00",
    "updated_at": "2026-04-14T15:30:00"
  },
  {
    "id": 2,
    "name": "Proteina Whey",
    "description": "Proteina de suero de leche.",
    "price": 35.00,
    "stock": 20,
    "is_active": false,
    "created_at": "2026-04-11T08:00:00",
    "updated_at": "2026-04-13T12:00:00"
  }
]
```

### Response cuando no hay productos (200 lista vacia)

```json
[]
```

### Response de error de servidor (500)

```json
{
  "detail": "Internal Server Error"
}
```

### Criterios de formato ideal

- Siempre llamar con `include_inactive=true` para no perder productos del catalogo.
- `price` debe formatearse como moneda: `$19.99 USD`.
- `is_active: false` → badge "Inactivo" en rojo; `is_active: true` → badge "Activo" en oscuro.
- `stock ≤ 5` → badge o texto de alerta visible (ej. "Stock bajo").
- Fechas formateadas en español o formato legible (ej. `14/04/2026`).
