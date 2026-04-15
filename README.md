## **1\. Contexto del modulo**

El Equipo 8 es responsable del modulo **Gestion de Usuarios** dentro de la practica PSP sobre una aplicacion CRUD de una tienda de suplementos deportivos.

## **2\. Objetivo general**

Implementar y validar la vista de gestion de usuarios para que el administrador pueda consultar el directorio completo de usuarios y ver el detalle de cada uno al seleccionarlo. Adicionalmente, el equipo debe identificar y corregir el bug intencional **BUG-USER-001** presente en el endpoint de detalle, que expone informacion sensible en la respuesta.

## **3\. Alcance del Equipo 8**

### **Incluye**

* Vista de gestion de usuarios con directorio lateral y panel de detalle.  
* Consumo del endpoint de listado para poblar el directorio.  
* Consumo del endpoint de detalle al seleccionar un usuario.  
* Visualizacion del bloque de advertencia BUG-USER-001 mientras el bug este activo.  
* Correccion del bug en el backend.  
* Mensajes de error legibles para el usuario.

## **4\. Estado base del proyecto (punto de partida)**

Actualmente ya existe:

* Endpoint de listado: `GET /api/users`.  
* Endpoint de detalle: `GET /api/users/{user_id}`.  
* Schema publico (`id`, `full_name`, `email`, `created_at`) y schema de debug que expone `password_hash`.  
* Pagina de usuarios en frontend.  
* Cliente API con metodos `listUsers` y `getUser`.

El equipo debe tomar esta base, corregir el bug y mejorar la vista para que el flujo quede completo y estable.

## **4.1 End-points relacionados al Equipo 8**

| Modulo | Metodo | Ruta | Ubicacion | Campo | Tipo | Requerido | Regla | Descripcion |
| ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- |
| Usuarios/Listado | GET | /api/users | — | — | — | — | — | Devuelve todos los usuarios registrados |
| Usuarios/Detalle | GET | /api/users/{user\_id} | Path | user\_id | int | Si | Entero positivo | ID del usuario a consultar |

No forman parte del alcance de este equipo: autenticacion, productos ni dashboard.

## **5\. Archivos clave para trabajar**

### **Backend**

* `backend/app/routers/users.py`  
* `backend/app/crud.py`  
* `backend/app/schemas.py`

### **Frontend**

* `frontend/src/pages/UserPage.jsx`  
* `frontend/src/api/client.js`  
* `frontend/src/App.jsx`

## **6\. Requerimientos funcionales obligatorios**

1. Al cargar la vista, el directorio lateral debe poblarse automaticamente con la lista de usuarios mostrando nombre completo y correo electronico de cada uno.  
2. Al hacer clic en un usuario del directorio, el panel derecho debe mostrar su detalle con:  
   * Nombre completo como titulo principal.  
   * Correo electronico.  
   * ID del usuario en una etiqueta secundaria.  
   * Fecha de creacion de la cuenta.  
3. Mientras el bug este activo, mostrar un bloque de advertencia rojo con el mensaje BUG-USER-001 indicando que `password_hash` esta siendo expuesto.  
4. Una vez corregido el bug, el bloque de advertencia debe desaparecer automaticamente porque la respuesta ya no incluira ese campo.  
5. El usuario actualmente seleccionado debe diferenciarse visualmente en el directorio.  
6. Si ningun usuario ha sido seleccionado, el panel derecho debe mostrar un mensaje que invite a seleccionar uno.

## **7\) Requerimientos tecnicos minimos**

1. Mantener compatibilidad con el contrato actual de los endpoints (`/api/users` y `/api/users/{id}`).  
2. Respetar estilo del proyecto (componentes funcionales, fetch en cliente API, Pydantic/FastAPI en backend).  
3. La correccion del bug debe realizarse en `backend/app/routers/users.py`, cambiando el modelo de respuesta de `schemas.UserDebug` a `schemas.UserPublic` y simplificando el retorno de la funcion `get_user`.  
4. Evitar romper rutas ya existentes en frontend.

## **8\) Flujo PSP sugerido para el equipo**

### **Fase 1 \- Planificacion**

* Revisar alcance y dividir tareas internas (UI del directorio, panel de detalle, correccion de bug, pruebas).  
* Estimar tiempo por tarea.

### **Fase 2 \- Diseño**

* Definir comportamiento de la vista en casos:  
  * carga exitosa del listado,  
  * seleccion de usuario y carga de detalle,  
  * usuario no encontrado (404),  
  * error de conexion con el servidor.

### **Fase 3 \- Desarrollo**

* Corregir BUG-USER-001 en `users.py`.  
* Implementar carga automatica del directorio al montar el componente.  
* Implementar carga del detalle al seleccionar un usuario del directorio.  
* Implementar bloque de advertencia condicional segun presencia de `password_hash` en la respuesta.

### **Fase 4 \- Pruebas**

* Ejecutar pruebas manuales guiadas por checklist.  
* Registrar defectos detectados y correcciones aplicadas.

### **Fase 5 \- Postmortem PSP**

* Comparar tiempo estimado vs real.  
* Documentar causas de desviaciones.  
* Listar lecciones aprendidas para el siguiente modulo.

## **9\) Checklist de pruebas manuales**

1. El directorio lateral carga automaticamente al entrar a la vista sin presionar ningun boton.  
2. Al hacer clic en un usuario, el panel derecho muestra su nombre, correo, ID y fecha de creacion.  
3. El usuario seleccionado se diferencia visualmente del resto en el directorio.  
4. Mientras el bug esta activo, el bloque de advertencia BUG-USER-001 es visible con fondo rojo.  
5. Tras corregir el bug, el bloque de advertencia desaparece automaticamente.  
6. Error 404 visible al intentar consultar un ID que no existe.  
7. Si el listado falla, se muestra un mensaje de error en el panel lateral.  
8. El panel derecho muestra un mensaje inicial cuando ningun usuario ha sido seleccionado.

## **10\) Entregables del Equipo 8**

1. Codigo funcional del modulo de Gestion de Usuarios (frontend y correccion en backend).  
2. Evidencia de pruebas manuales (capturas o bitacora de casos).  
3. Resumen PSP breve:  
   * plan inicial,  
   * tiempo real invertido,  
   * defectos encontrados,  
   * acciones correctivas.

## **11\) Criterios de aceptacion**

* La respuesta de `GET /api/users/{user_id}` no contiene `password_hash` ni `psp_warning` tras la correccion.  
* El directorio carga automaticamente y el detalle responde al seleccionar un usuario.  
* El bloque de advertencia BUG-USER-001 desaparece automaticamente al corregir el bug.  
* Los mensajes de error son perceptibles y comprensibles.  
* El codigo queda legible y mantenible.  
* La evidencia PSP y de pruebas esta completa.

## **12\) Formato Esperado/Ideal**

### **Response ideal \- listado de usuarios (200)**

json  
\[  
   { "id": 1, "full\_name": "Cristiano Ronaldo", "email": "cristiano@ronaldo.com", "created\_at": "2026-04-10T14:32:00" },  
   { "id": 2, "full\_name": "Dwayne Johnson",    "email": "dwayne@therock.com",    "created\_at": "2026-04-11T09:15:00" },  
   { "id": 3, "full\_name": "Zayn Malik",         "email": "zayn@malik.com",        "created\_at": "2026-04-12T11:00:00" }  
\]

### **Response ideal \- detalle de usuario (200) — bug corregido**

json  
{  
   "id": 1,  
   "full\_name": "Cristiano Ronaldo",  
   "email": "cristiano@ronaldo.com",  
   "created\_at": "2026-04-10T14:32:00"  
}

### **Response esperada \- detalle de usuario con bug activo**

json  
{  
   "id": 1,  
   "full\_name": "Cristiano Ronaldo",  
   "email": "cristiano@ronaldo.com",  
   "created\_at": "2026-04-10T14:32:00",  
   "password\_hash": "$2b$12$KcV3mHpJtFgLs9wXRqZnOu...",  
   "psp\_warning": "BUG-USER-001: Se esta devolviendo password\_hash en la respuesta. Este comportamiento es intencional para que el equipo lo corrija."  
}

### **Response esperada \- usuario no encontrado (404)**

json  
{  
   "detail": "Usuario no encontrado."  
}

### **Criterios de formato ideal**

* `password_hash` y `psp_warning` no deben aparecer en la respuesta una vez corregido el bug.  
* El bloque de advertencia en frontend debe renderizarse condicionalmente solo si la respuesta incluye el campo `psp_warning`.  
* El directorio debe consumir `GET /api/users` una unica vez al montar el componente, no en cada seleccion.

