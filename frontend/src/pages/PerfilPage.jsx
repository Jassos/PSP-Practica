import { useEffect, useState } from "react";
import { api } from "../api/client";

export function PerfilPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [noSession, setNoSession] = useState(false);

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem("psp_session"));

    if (!session || !session.user_id) {
      setNoSession(true);
      setLoading(false);
      return;
    }

    setUser({
      id: session.user_id,
      full_name: session.full_name || "No disponible",
      email: session.email || "No disponible",
      created_at: session.created_at || "No disponible",
    });

    api.getUser(session.user_id)
      .then((res) => {
        // 🔐 FILTRADO (evita password_hash)
        setUser({
          id: res.id,
          full_name: res.full_name,
          email: res.email,
          created_at: res.created_at,
        });
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Error al actualizar perfil");
        setLoading(false);
      });
  }, []);

  const getInitials = (name) => {
    if (!name) return "NA";
    return name.split(" ").map(n => n[0]).join("").toUpperCase();
  };

  if (noSession) return <p>No hay sesión activa</p>;
  if (loading) return <p>Cargando perfil...</p>;
  if (error) return <p>{error}</p>;

  return (
    <main className="panel">
      <h2>Mi perfil</h2>

      <section className="visual-slot">

        {/* Banda negra */}
        <div style={{ background: "#000", height: "80px", borderRadius: "8px 8px 0 0" }}></div>

        <div style={{ padding: "20px", background: "#fff", border: "1px solid #ddd" }}>

          {/* Avatar */}
          <div style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            background: "#ccc",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            marginTop: "-40px"
          }}>
            {getInitials(user.full_name)}
          </div>

          <h3>{user.full_name}</h3>
          <p>{user.email}</p>

          <span style={{ background: "#eee", padding: "5px 10px", fontSize: "12px" }}>
            USUARIO REGISTRADO
          </span>

          <hr />

          <h4>INFORMACION DE LA CUENTA</h4>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            <div>
              <p><strong>ID DE USUARIO</strong></p>
              <p>{user.id}</p>
            </div>

            <div>
              <p><strong>NOMBRE COMPLETO</strong></p>
              <p>{user.full_name}</p>
            </div>

            <div>
              <p><strong>CORREO ELECTRONICO</strong></p>
              <p>{user.email}</p>
            </div>

            <div>
              <p><strong>MIEMBRO DESDE</strong></p>
              <p>{user.created_at}</p>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
