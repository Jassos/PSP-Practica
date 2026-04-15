## 1. Contexto del modulo
El Equipo 1 es responsable del modulo **Registro de usuario** dentro de la practica PSP sobre una aplicación CRUD

## 2. Objetivo general
Implementar y validar el flujo de registro para que un usuario nuevo pueda crear su cuenta desde la vista de Registro y persistirla en base de datos, mostrando mensajes claros de éxito o error.

## 3. Alcance del Equipo 1

### Incluye
- Vista de registro en frontend.
- Consumo del endpoint de registro.
- Validaciones minimas de formulario (cliente).
- Mensajes de error/exito legibles para usuario.

## 4. Estado base del proyecto (punto de partida)
Actualmente ya existe:
- Endpoint de registro: `POST /api/auth/register`.
- Esquema de entrada de usuario (`full_name`, `email`, `password`).
- Pagina de registro en frontend.
- Cliente API con metodo `register`.

El equipo debe tomar esta base y mejorarla para que el flujo quede completo y estable.

## 4.1 End-point relacionado al Equipo 1 (unico)

Para este documento del Equipo 1, solo se considera el end-point de Registro:

| Modulo | Metodo | Ruta | Ubicacion | Campo | Tipo | Requerido | Regla | Descripcion |
|---|---|---|---|---|---|---|---|---|
| Auth/Registro | POST | /api/auth/register | Body | full_name | string | Si | Min 2, max 120 caracteres | Nombre completo del usuario |
| Auth/Registro | POST | /api/auth/register | Body | email | email | Si | Formato de correo valido | Correo unico de la cuenta |
| Auth/Registro | POST | /api/auth/register | Body | password | string | Si | Min 6, max 128 caracteres | Contrasena en texto plano para alta |

No forman parte del alcance de este equipo: login, logout, usuarios, productos ni dashboard.

## 5. Archivos clave para trabajar

### Backend
- `backend/app/routers/auth.py`
- `backend/app/crud.py`
- `backend/app/schemas.py`

### Frontend
- `frontend/src/pages/RegistrarsePage.jsx`
- `frontend/src/api/client.js`
- `frontend/src/App.jsx`

## 6. Requerimientos funcionales obligatorios
1. El formulario de registro debe pedir:
   - Nombre completo.
   - Correo.
   - Contrasena.
2. Si los datos son validos, debe crear usuario y mostrar confirmacion.
3. Si el correo ya existe, debe mostrar error entendible para usuario final.

## 7) Requerimientos tecnicos minimos
1. Mantener compatibilidad con el contrato actual del endpoint (`/api/auth/register`).
2. Respetar estilo del proyecto (componentes funcionales, fetch en cliente API, Pydantic/FastAPI en backend).
3. Evitar romper rutas ya existentes en frontend.

## 8) Flujo PSP sugerido para el equipo

### Fase 1 - Planificacion
- Revisar alcance y dividir tareas internas (UI, validaciones, integracion, pruebas).
- Estimar tiempo por tarea.

### Fase 2 - Diseño
- Definir comportamiento del formulario en casos:
	- exito,
	- correo duplicado,
	- error inesperado de red/servidor.

### Fase 3 - Desarrollo
- Implementar mejoras de validacion y UX en la pagina de registro.
- Ajustar manejo de errores en cliente API solo si es necesario.
- Verificar consistencia de payload con backend.

### Fase 4 - Pruebas
- Ejecutar pruebas manuales guiadas por checklist.
- Registrar defectos detectados y correcciones aplicadas.

### Fase 5 - Postmortem PSP
- Comparar tiempo estimado vs real.
- Documentar causas de desviaciones.
- Listar lecciones aprendidas para el siguiente modulo.

## 9) Checklist de pruebas manuales
1. Registro exitoso con datos validos.
2. Registro rechazado por correo repetido.
3. Error por correo invalido.
4. Error por contrasena demasiado corta.
5. Verificacion de limpieza del formulario tras exito.
6. Verificacion de mensaje de error cuando API no responde.

## 10) Entregables del Equipo 1
1. Codigo funcional del modulo de Registro (frontend y ajustes backend si aplican).
2. Evidencia de pruebas manuales (capturas o bitacora de casos).
3. Resumen PSP breve:
   - plan inicial,
   - tiempo real invertido,
   - defectos encontrados,
   - acciones correctivas.

## 11) Criterios de aceptacion
- Los errores son perceptibles y comprensibles.
- El codigo queda legible y mantenible.
- La evidencia PSP y de pruebas esta completa.

## 12) Formato Esperado/Ideal

### Request ideal (registro)

```json
{
   "full_name": "Ana Perez",
   "email": "ana.perez@correo.com",
   "password": "ClaveSegura123"
}
```

### Response ideal - exito (201)

```json
{
   "id": 10,
   "full_name": "Ana Perez",
   "email": "ana.perez@correo.com",
   "created_at": "2026-04-15T18:20:00"
}
```

### Response esperada - correo duplicado (409)

```json
{
   "detail": "El email ya esta registrado."
}
```

### Response esperada - error de validacion (422)

```json
{
   "detail": [
      {
         "type": "string_too_short",
         "loc": ["body", "password"],
         "msg": "String should have at least 6 characters",
         "input": "123",
         "ctx": {"min_length": 6}
      }
   ]
}
```

### Criterios de formato ideal

- Enviar siempre `Content-Type: application/json`.
- `full_name` no debe enviarse vacio ni con menos de 2 caracteres.
- `email` debe ser valido y no repetido.
- `password` debe tener al menos 6 caracteres.

