## **1\. Contexto del modulo**

El Equipo 7 es responsable del modulo **Editar Producto** dentro de la practica PSP sobre una aplicacion CRUD de una tienda de suplementos deportivos.

## **2\. Objetivo general**

Implementar y validar el flujo de edicion de producto para que un administrador pueda cargar un producto existente por su ID, modificar sus campos y persistir los cambios en base de datos, mostrando mensajes claros de exito, advertencia o error. Adicionalmente, el equipo debe identificar y corregir el bug intencional **BUG-UPDATE-001** presente en el endpoint de actualizacion.

## **3\. Alcance del Equipo 7**

### **Incluye**

* Vista de edicion de producto en frontend.  
* Consumo del endpoint de consulta individual para precargar el formulario.  
* Consumo del endpoint de actualizacion para persistir cambios.  
* Validaciones minimas de formulario del lado del cliente.  
* Visualizacion del aviso BUG-UPDATE-001 en la interfaz.  
* Correccion del bug en el backend.  
* Mensajes de exito, advertencia y error legibles para el usuario.

## **4\. Estado base del proyecto (punto de partida)**

Actualmente ya existe:

* Endpoint de consulta individual: `GET /api/products/{product_id}`.  
* Endpoint de actualizacion: `PUT /api/products/{product_id}`.  
* Esquema de entrada (`name`, `description`, `price`, `stock`, `is_active`).  
* Pagina de edicion en frontend con precarga por ID y formulario basico.  
* Cliente API con metodos `getProduct` y `updateProduct`.

El equipo debe tomar esta base, corregir el bug y mejorar la vista para que el flujo quede completo y estable.

## **4.1 End-points relacionados al Equipo 7**

| Modulo | Metodo | Ruta | Ubicacion | Campo | Tipo | Requerido | Regla | Descripcion |
| ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- |
| Productos/Consulta | GET | /api/products/{product\_id} | Path | product\_id | int | Si | Entero positivo | ID del producto a consultar |
| Productos/Edicion | PUT | /api/products/{product\_id} | Path | product\_id | int | Si | Entero positivo | ID del producto a actualizar |
| Productos/Edicion | PUT | /api/products/{product\_id} | Body | name | string | No | Min 2, max 120 caracteres | Nuevo nombre del producto |
| Productos/Edicion | PUT | /api/products/{product\_id} | Body | description | string | No | Max 500 caracteres | Nueva descripcion del producto |
| Productos/Edicion | PUT | /api/products/{product\_id} | Body | price | float | No | Mayor a 0 | Nuevo precio en USD |
| Productos/Edicion | PUT | /api/products/{product\_id} | Body | stock | int | No | Entre 0 y 10000 — **BUG-UPDATE-001: campo ignorado por el endpoint** | Nuevas unidades en inventario |
| Productos/Edicion | PUT | /api/products/{product\_id} | Body | is\_active | boolean | No | true / false | Nuevo estado activo o inactivo |

No forman parte del alcance de este equipo: autenticacion, usuarios, dashboard ni otros endpoints de productos.

## **5\. Archivos clave para trabajar**

### **Backend**

* `backend/app/routers/products.py`  
* `backend/app/crud.py`  
* `backend/app/schemas.py`

### **Frontend**

* `frontend/src/pages/UpdateProductPage.jsx`  
* `frontend/src/api/client.js`  
* `frontend/src/App.jsx`

## **6\. Requerimientos funcionales obligatorios**

1. El flujo debe tener dos pasos secuenciales:  
   * Ingresar el ID del producto y presionar Cargar para precargar el formulario.  
   * Modificar los campos deseados y presionar Actualizar para guardar.  
2. El formulario debe incluir los siguientes campos precargados con los datos actuales:  
   * Nombre del producto.  
   * Descripcion.  
   * Precio (USD).  
   * Stock (unidades).  
   * Estado activo/inactivo.  
3. Si la actualizacion es exitosa, mostrar confirmacion con el ID del producto actualizado.  
4. Si el ID no existe, mostrar el error 404 de forma comprensible para el usuario.  
5. Mostrar el aviso de BUG-UPDATE-001 junto al campo de stock, incluso despues de corregir el bug en el backend.  
6. Una vez corregido el bug, el campo stock debe actualizarse correctamente en la base de datos.

## **7\) Requerimientos tecnicos minimos**

1. Mantener compatibilidad con el contrato actual de los endpoints (`/api/products/{id}`).  
2. Respetar estilo del proyecto (componentes funcionales, fetch en cliente API, Pydantic/FastAPI en backend).  
3. Evitar romper rutas ya existentes en frontend.  
4. La correccion del bug debe realizarse unicamente en `backend/app/routers/products.py`, eliminando las lineas que descartan el campo `stock` del payload antes de pasarlo a la capa de datos.

## **8\) Flujo PSP sugerido para el equipo**

### **Fase 1 \- Planificacion**

* Revisar alcance y dividir tareas internas (UI, correccion de bug, validaciones, integracion, pruebas).  
* Estimar tiempo por tarea.

### **Fase 2 \- Diseño**

* Definir comportamiento del formulario en casos:  
  * carga exitosa del producto,  
  * ID no encontrado (404),  
  * actualizacion exitosa,  
  * actualizacion con advertencia PSP,  
  * error inesperado de red/servidor.

### **Fase 3 \- Desarrollo**

* Corregir BUG-UPDATE-001 en el router del backend.  
* Implementar precarga del formulario al cargar un producto por ID.  
* Mejorar visualizacion del aviso de bug y mensajes de respuesta.  
* Verificar consistencia del payload con el schema del backend.

### **Fase 4 \- Pruebas**

* Ejecutar pruebas manuales guiadas por checklist.  
* Registrar defectos detectados y correcciones aplicadas.

### **Fase 5 \- Postmortem PSP**

* Comparar tiempo estimado vs real.  
* Documentar causas de desviaciones.  
* Listar lecciones aprendidas para el siguiente modulo.

## **9\) Checklist de pruebas manuales**

1. Carga exitosa de un producto existente al ingresar su ID.  
2. Error 404 visible al ingresar un ID que no existe.  
3. Actualizacion exitosa de nombre, descripcion y precio.  
4. Verificacion de que el stock se actualiza correctamente tras corregir BUG-UPDATE-001.  
5. Verificacion de que el aviso BUG-UPDATE-001 es visible junto al campo stock.  
6. Cambio de estado activo/inactivo y persistencia del cambio.  
7. Comportamiento del boton Cancelar: limpia el formulario sin recargar la pagina.  
8. Verificacion de mensaje de error cuando API no responde.

## **10\) Entregables del Equipo 7**

1. Codigo funcional del modulo de Edicion de Producto (frontend y correccion en backend).  
2. Evidencia de pruebas manuales (capturas o bitacora de casos).  
3. Resumen PSP breve:  
   * plan inicial,  
   * tiempo real invertido,  
   * defectos encontrados,  
   * acciones correctivas.

## **11\) Criterios de aceptacion**

* El campo `stock` se actualiza correctamente en la base de datos tras la correccion del bug.  
* El formulario precarga correctamente los datos del producto consultado.  
* Los mensajes de error, exito y advertencia son perceptibles y comprensibles.  
* El aviso de BUG-UPDATE-001 es visible junto al campo de stock.  
* El codigo queda legible y mantenible.  
* La evidencia PSP y de pruebas esta completa.

## **12\) Formato Esperado/Ideal**

### **Request ideal (cargar producto)**

GET /api/products/3

### **Response ideal \- producto encontrado (200)**

json  
{  
   "id": 3,  
   "name": "Pre-workout C4 Original",  
   "description": "Formula energizante con cafeina y beta-alanina.",  
   "price": 35.0,  
   "stock": 0,  
   "is\_active": true,  
   "created\_at": "2026-03-10T08:30:00",  
   "updated\_at": "2026-04-06T16:05:00"  
}

### **Request ideal (actualizar producto)**

json  
{  
   "name": "Pre-workout C4 Original",  
   "description": "Formula energizante con cafeina y beta-alanina.",  
   "price": 32.99,  
   "stock": 50,  
   "is\_active": true  
}

### **Response ideal \- actualizacion exitosa (200)**

json  
{  
   "product": {  
      "id": 3,  
      "name": "Pre-workout C4 Original",  
      "description": "Formula energizante con cafeina y beta-alanina.",  
      "price": 32.99,  
      "stock": 0,  
      "is\_active": true,  
      "created\_at": "2026-03-10T08:30:00",  
      "updated\_at": "2026-04-15T10:00:00"  
   },  
   "psp\_warning": "BUG-UPDATE-001: El campo stock se ignora durante la edicion. Fallo intencional para la practica."  
}

### **Response esperada \- producto no encontrado (404)**

json  
{  
   "detail": "Producto no encontrado."  
}

### **Criterios de formato ideal**

* Enviar siempre `Content-Type: application/json`.  
* `name` no debe enviarse vacio ni con menos de 2 caracteres si se incluye en el payload.  
* `price` debe ser mayor a 0 si se incluye en el payload.  
* `stock` debe estar entre 0 y 10000 si se incluye en el payload.  
* El campo `psp_warning` en la respuesta desaparece una vez corregido el bug.

