/**
 * USUARIOS
 *
 * Esta vista consume 2 endpoints principales:
 * - GET /api/users           -> directorio/listado lateral
 * - GET /api/users/{user_id} -> detalle del usuario seleccionado
 * - Cliente sugerido: api.listUsers(), api.getUser(userId)
 *
 * Respuesta esperada en listado:
 * [
 *   { id, full_name, email, created_at }
 * ]
 *
 * Respuesta esperada en detalle:
 * {
 *   id, full_name, email, created_at,
 *   password_hash?,
 *   psp_warning?
 * }
 *
 * Reglas visuales/funcionales de la maqueta:
 * - Layout en dos columnas:
 *   a) Izquierda: "DIRECTORIO DE USUARIOS" con lista clickeable.
 *   b) Derecha: tarjeta de detalle del usuario activo.
 * - En el detalle mostrar:
 *   nombre completo, correo, ID visible (badge), fecha de creación.
 * - Resaltar visualmente el usuario seleccionado en el directorio.
 *
 * Flujo recomendado:
 * 1) Cargar listado al montar la vista.
 * 2) Seleccionar automáticamente el primer usuario y cargar su detalle.
 * 3) Al hacer click en otro usuario, consultar su detalle por ID.
 * 4) Mostrar loading por panel de detalle durante cambios de selección.
 * 5) Manejar estado vacío si no hay usuarios.
 *
 * Consideración PSP / seguridad:
 * - El endpoint de detalle puede devolver `password_hash` (BUG-USER-001).
 * - NO renderizar `password_hash` en UI.
 *
 * HTML/JSX visual:
 * - Construir toda la maqueta dentro de <section className="visual-slot">.
 * - Incluir: sidebar de directorio, tarjeta de detalle
 */

import { useState, useEffect } from "react";
import { api } from "../api/client.js";

export function UsuariosPage() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loadingList, setLoadingList] = useState(true);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [error, setError] = useState(null);

  // 1) Cargar listado al montar la vista
  useEffect(() => {
    setLoadingList(true);
    api
      .listUsers()
      .then((data) => {
        setUsers(data);
        // 2) Seleccionar automáticamente el primer usuario
        if (data.length > 0) {
          loadUserDetail(data[0].id);
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoadingList(false));
  }, []);

  // 3) Cargar detalle por ID
  function loadUserDetail(userId) {
    setLoadingDetail(true);
    api
      .getUser(userId)
      .then((data) => setSelectedUser(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoadingDetail(false));
  }

  return (
    <main className="panel">
      <h2>Usuarios</h2>
      <section
        className="visual-slot"
        style={{ display: "flex", alignItems: "stretch" }}
      >
        {/* ── SIDEBAR: Directorio de usuarios ── */}
        <div
          style={{
            width: "300px",
            flexShrink: 0,
            background: "#ffffff",
            borderRight: "1px solid var(--line)",
            padding: "1.4rem",
          }}
        >
          <p
            style={{
              margin: "0 0 0.6rem",
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.09em",
              color: "var(--ink-soft)",
              textTransform: "uppercase",
            }}
          >
            Directorio de usuarios
          </p>

          {loadingList && (
            <p style={{ color: "var(--ink-soft)", fontSize: "0.9rem" }}>
              Cargando usuarios…
            </p>
          )}

          {/* 5) Estado vacío */}
          {!loadingList && users.length === 0 && !error && (
            <p style={{ color: "var(--ink-soft)", fontSize: "0.9rem" }}>
              No hay usuarios registrados.
            </p>
          )}

          {error && (
            <p className="notice-error" style={{ fontSize: "0.9rem" }}>
              {error}
            </p>
          )}

          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {users.map((user) => {
              const isActive = selectedUser?.id === user.id;
              return (
                <li
                  key={user.id}
                  onClick={() => loadUserDetail(user.id)}
                  style={{
                    padding: "0.6rem 0.8rem",
                    borderRadius: "10px",
                    marginBottom: "0.2rem",
                    cursor: "pointer",
                    background: isActive ? "var(--bg-base)" : "transparent",
                    transition: "background 0.15s",
                  }}
                >
                  <div
                    style={{
                      fontWeight: isActive ? 700 : 400,
                      fontSize: "0.95rem",
                      color: "var(--ink)",
                    }}
                  >
                    {user.full_name}
                  </div>
                  <div
                    style={{ fontSize: "0.82rem", color: "var(--ink-soft)" }}
                  >
                    {user.email}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* ── DETALLE del usuario seleccionado ── */}
        <div
          style={{
            flex: 1,
            background: "#f9fafb",
            padding: "2rem",
            minHeight: "400px",
          }}
        >
          {/* 4) Loading durante cambio de selección */}
          {loadingDetail && (
            <p style={{ color: "var(--ink-soft)", fontSize: "0.9rem" }}>
              Cargando detalle…
            </p>
          )}

          {!loadingDetail && selectedUser && (
            <div
              style={{
                background: "#ffffff",
                border: "1px solid var(--line)",
                borderRadius: "12px",
                padding: "1.5rem",
              }}
            >
              {/* Nombre + badge de ID */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "0.2rem",
                }}
              >
                <div>
                  <h3
                    style={{
                      margin: "0 0 0.2rem",
                      fontSize: "1.6rem",
                      fontWeight: 700,
                    }}
                  >
                    {selectedUser.full_name}
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "0.95rem",
                      color: "var(--ink-soft)",
                    }}
                  >
                    {selectedUser.email}
                  </p>
                </div>
                <span
                  style={{
                    background: "var(--bg-base)",
                    border: "1px solid var(--line)",
                    borderRadius: "8px",
                    padding: "0.3rem 0.8rem",
                    fontSize: "0.85rem",
                    color: "var(--ink-soft)",
                    whiteSpace: "nowrap",
                    fontWeight: 500,
                  }}
                >
                  ID: {selectedUser.id}
                </span>
              </div>

              <hr style={{ border: "none", borderTop: "1px solid var(--line)", margin: "1rem 0" }} />

              {/* Fecha de creación */}
              <div style={{ marginBottom: "1rem" }}>
                <p
                  style={{
                    margin: "0 0 0.25rem",
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--ink-soft)",
                  }}
                >
                  Fecha de creación
                </p>
                <p style={{ margin: 0, fontWeight: 700, fontSize: "1rem" }}>
                  {selectedUser.created_at}
                </p>
              </div>

              {/* BUG-USER-001: Advertencia PSP si llega password_hash — NO se renderiza su valor */}
              {selectedUser.psp_warning && (
                <div
                  style={{
                    marginTop: "0.5rem",
                    background: "#fff5f5",
                    border: "1px solid #f5c0bb",
                    borderRadius: "10px",
                    padding: "0.85rem 1rem",
                  }}
                >
                  <p
                    style={{
                      margin: "0 0 0.4rem",
                      fontWeight: 700,
                      color: "var(--danger)",
                      fontSize: "0.95rem",
                    }}
                  >
                    ⚠️ Exposición de Datos Sensibles (PSP Debug)
                  </p>
                  <p
                    style={{
                      margin: 0,
                      color: "var(--danger)",
                      fontSize: "0.9rem",
                    }}
                  >
                    <strong>BUG-USER-001:</strong> {selectedUser.psp_warning}
                  </p>
                </div>
              )}
            </div>
          )}

          {!loadingDetail && !selectedUser && !loadingList && (
            <p style={{ color: "var(--ink-soft)" }}>
              Selecciona un usuario del directorio.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
