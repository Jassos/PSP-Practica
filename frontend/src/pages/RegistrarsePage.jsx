import React, { useState } from "react";
import { api } from "../api/client";

export function RegistrarsePage() {
const [formData, setFormData] = useState({
full_name: "",
email: "",
password: ""
});
const [loading, setLoading] = useState(false);
const [message, setMessage] = useState({ type: "", text: "" });

const handleChange = (e) => {
const { name, value } = e.target;
setFormData((prev) => ({ ...prev, [name]: value }));
};

const handleSubmit = async (e) => {
e.preventDefault();
setLoading(true);
setMessage({ type: "", text: "" });

try {
  await api.register(formData);
  setMessage({ type: "success", text: "Cuenta creada con exito. Ya puedes iniciar sesion." });
  setFormData({ full_name: "", email: "", password: "" });
} catch (error) {
  let errorText = error.message;
  if (errorText.includes("409")) {
    errorText = "El email ya esta registrado (Error 409)";
  }
  setMessage({ type: "error", text: errorText });
} finally {
  setLoading(false);
}
};

return (
<main className="panel">
<section className="visual-slot">
<div className="card">
<h2>Registro</h2>
<p>Crea una nueva cuenta</p>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>Nombre Completo</label>
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            required
            placeholder="Tu nombre"
          />
        </div>

        <div className="field">
          <label>Correo Electronico</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="ejemplo@correo.com"
          />
        </div>

        <div className="field">
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Minimo 6 caracteres"
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Registrando..." : "Registrarse"}
        </button>
      </form>

      {message.text && (
       <div className={`notice-${message.type}`}>
         {message.text}
       </div>
)}
      
    </div>
  </section>
</main>
);
}