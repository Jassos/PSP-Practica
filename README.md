.**1\. Contexto del modulo**

El Equipo 9 es responsable del modulo **Dashboard** dentro de la practica PSP sobre una aplicacion CRUD de una tienda de suplementos deportivos.

## **2\. Objetivo general**

Implementar y validar el panel de resumen general del sistema para que el administrador visualice metricas clave de forma automatica al ingresar a la vista. Adicionalmente, el equipo debe identificar y corregir el bug intencional **BUG-DASH-001** en el endpoint de resumen, e implementar dos endpoints nuevos en el backend que alimenten las secciones de alertas de inventario y actividad reciente.

## **3\. Alcance del Equipo 9**

### **Incluye**

* Vista de dashboard en frontend con carga automatica de datos.  
* Consumo del endpoint de resumen general.  
* Implementacion de dos endpoints nuevos: `stock-alerts` y `recent-products`.  
* Cuatro tarjetas KPI con indicadores del sistema.  
* Seccion de alertas de inventario bajo.  
* Seccion de actividad reciente.  
* Correccion del bug BUG-DASH-001 en el backend.  
* Mensajes de error legibles cuando algun endpoint falla.

## **4\. Estado base del proyecto (punto de partida)**

Actualmente ya existe:

* Endpoint de resumen: `GET /api/dashboard/summary`.  
* Schema de respuesta (`users_total`, `products_total`, `active_products`, `low_stock_products`, `psp_warning`).  
* Pagina de dashboard en frontend con cuatro tarjetas y carga manual por boton.  
* Cliente API con metodo `dashboardSummary`.

El equipo debe tomar esta base, corregir el bug, agregar los dos endpoints nuevos y mejorar la vista para que la carga sea automatica y el panel quede completo.

## **4.1 End-points relacionados al Equipo 9**

| Modulo | Metodo | Ruta | Ubicacion | Campo | Tipo | Requerido | Regla | Descripcion |
| ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- |
| Dashboard/Resumen | GET | /api/dashboard/summary | — | — | — | — | — | Devuelve metricas generales del sistema |
| Dashboard/Stock | GET | /api/dashboard/stock-alerts | — | — | — | — | **Endpoint nuevo — debe implementarse** | Lista productos activos con stock menor a 5 |
| Dashboard/Recientes | GET | /api/dashboard/recent-products | — | — | — | — | **Endpoint nuevo — debe implementarse** | Devuelve los ultimos 5 productos por fecha de creacion |

No forman parte del alcance de este equipo: autenticacion, usuarios ni endpoints de productos.

## **5\. Archivos clave para trabajar**

### **Backend**

* `backend/app/routers/dashboard.py`  
* `backend/app/crud.py`  
* `backend/app/schemas.py`

### **Frontend**

* `frontend/src/pages/DashboardPage.jsx`  
* `frontend/src/api/client.js`  
* `frontend/src/App.jsx`

## **6\. Requerimientos funcionales obligatorios**

1. La vista debe cargar los datos automaticamente al montar el componente sin que el usuario presione ningun boton.  
2. El panel debe mostrar cuatro tarjetas KPI:  
   * Total de usuarios registrados.  
   * Total de productos activos e inactivos.  
   * Total de productos activos.  
   * Cantidad de productos con stock bajo (menos de 5 unidades).  
3. La seccion de alertas de inventario debe listar los productos con stock critico usando `GET /api/dashboard/stock-alerts`, mostrando nombre, stock actual y estado.  
4. La seccion de actividad reciente debe listar los ultimos 5 productos creados usando `GET /api/dashboard/recent-products`, mostrando nombre, precio y fecha.  
5. Identificar y corregir BUG-DASH-001 para que `products_total` refleje el total real incluyendo activos e inactivos.  
6. Mantener un boton de actualizacion manual que recargue todos los datos del panel.

## **7\) Requerimientos tecnicos minimos**

1. Mantener compatibilidad con el contrato actual del endpoint (`/api/dashboard/summary`).  
2. Los dos endpoints nuevos deben seguir el patron del router existente en `dashboard.py`.  
3. Respetar estilo del proyecto (componentes funcionales, fetch en cliente API, Pydantic/FastAPI en backend).  
4. La correccion del bug debe realizarse unicamente en `backend/app/routers/dashboard.py`, eliminando la linea que reemplaza el valor de `products_total` con el de `active_products`.  
5. Evitar romper rutas ya existentes en frontend.

## **8\) Flujo PSP sugerido para el equipo**

### **Fase 1 \- Planificacion**

* Revisar alcance y dividir tareas internas (correccion de bug, endpoints nuevos, UI del panel, pruebas).  
* Estimar tiempo por tarea.

### **Fase 2 \- Diseño**

* Definir comportamiento del panel en casos:  
  * carga exitosa de los tres endpoints,  
  * fallo parcial de uno de los endpoints nuevos,  
  * error total de conexion con el servidor.  
* Definir la estructura de respuesta de los dos endpoints nuevos.

### **Fase 3 \- Desarrollo**

* Corregir BUG-DASH-001 en `dashboard.py`.  
* Implementar `GET /api/dashboard/stock-alerts` en el backend.  
* Implementar `GET /api/dashboard/recent-products` en el backend.  
* Agregar los dos nuevos metodos al cliente API en el frontend.  
* Refactorizar `DashboardPage.jsx` para carga automatica con `useEffect`.  
* Implementar seccion de alertas y seccion de actividad reciente.

### **Fase 4 \- Pruebas**

* Ejecutar pruebas manuales guiadas por checklist.  
* Registrar defectos detectados y correcciones aplicadas.

### **Fase 5 \- Postmortem PSP**

* Comparar tiempo estimado vs real.  
* Documentar causas de desviaciones.  
* Listar lecciones aprendidas para el siguiente modulo.

## **9\) Checklist de pruebas manuales**

1. Los datos del panel cargan automaticamente al ingresar sin presionar ningun boton.  
2. La tarjeta de productos totales muestra el total real incluyendo activos e inactivos tras corregir el bug.  
3. La tarjeta de stock bajo muestra el conteo correcto de productos con menos de 5 unidades.  
4. La seccion de alertas lista correctamente los productos con stock critico con nombre, cantidad y estado.  
5. La seccion de actividad reciente lista los 5 productos mas recientes ordenados por fecha descendente.  
6. El boton de actualizacion manual recarga todos los datos correctamente.  
7. Si un endpoint falla, se muestra un mensaje de error claro en la seccion correspondiente sin romper el resto del panel.

## **10\) Entregables del Equipo 9**

1. Codigo funcional del modulo Dashboard (frontend y ajustes en backend).  
2. Los dos endpoints nuevos implementados y funcionando.  
3. Evidencia de pruebas manuales (capturas o bitacora de casos).  
4. Resumen PSP breve:  
   * plan inicial,  
   * tiempo real invertido,  
   * defectos encontrados,  
   * acciones correctivas.

## **11\) Criterios de aceptacion**

* El campo `products_total` refleja el total real de productos tras la correccion del bug.  
* Los endpoints `stock-alerts` y `recent-products` responden con los datos esperados.  
* Los datos del panel cargan automaticamente sin interaccion del usuario.  
* Las cuatro secciones del panel (KPIs, alertas, recientes, actualizacion) funcionan correctamente.  
* Los mensajes de error son perceptibles cuando algun endpoint falla.  
* El codigo queda legible y mantenible.  
* La evidencia PSP y de pruebas esta completa.

## **12\) Formato Esperado/Ideal**

### **Response ideal \- resumen (200)**

json  
{  
   "users\_total": 8,  
   "products\_total": 8,  
   "active\_products": 6,  
   "low\_stock\_products": 3,  
   "psp\_warning": null  
}

### **Response ideal \- stock-alerts (200)**

json  
\[  
   { "id": 2, "name": "Creatina Monohidratada", "stock": 3, "is\_active": true },  
   { "id": 3, "name": "Pre-workout C4 Original", "stock": 0, "is\_active": true },  
   { "id": 8, "name": "Magnesio Quelado",        "stock": 4, "is\_active": true }  
\]

### **Response ideal \- recent-products (200)**

json  
\[  
   { "id": 8, "name": "Magnesio Quelado",     "price": 19.99, "created\_at": "2026-04-05T15:30:00" },  
   { "id": 7, "name": "Glutamina Pure",        "price": 28.00, "created\_at": "2026-04-01T09:55:00" },  
   { "id": 6, "name": "Omega 3 Fish Oil",      "price": 15.75, "created\_at": "2026-03-22T14:20:00" },  
   { "id": 5, "name": "Vitamina D3 \+ K2",      "price": 12.00, "created\_at": "2026-03-20T11:45:00" },  
   { "id": 4, "name": "BCAA Complex 2:1:1",    "price": 22.99, "created\_at": "2026-03-15T13:00:00" }  
\]

### **Response esperada \- bug activo en summary**

json  
{  
   "users\_total": 8,  
   "products\_total": 6,  
   "active\_products": 6,  
   "low\_stock\_products": 3,  
   "psp\_warning": "BUG-DASH-001: products\_total muestra solo activos, no el total real."  
}

### **Criterios de formato ideal**

* `products_total` debe ser mayor o igual a `active_products` una vez corregido el bug.  
* `stock-alerts` solo debe incluir productos con `is_active: true` y `stock < 5`.  
* `recent-products` debe estar ordenado por `created_at` descendente y limitado a 5 registros.  
* El campo `psp_warning` en el summary desaparece una vez corregido el bug.

