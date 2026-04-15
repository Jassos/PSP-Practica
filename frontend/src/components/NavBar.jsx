import { NavLink } from "react-router-dom";

const links = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/productos/lista", label: "Productos" },
  { to: "/productos/crear", label: "Agregar" },
  { to: "/productos/editar", label: "Editar" },
  { to: "/productos/eliminar", label: "Ver Producto" },
  { to: "/usuario", label: "Usuarios" },
  { to: "/perfil", label: "Perfil" },
  { to: "/login", label: "Iniciar Sesión" },
  { to: "/registro", label: "Registrarse" }
];

export function NavBar() {
  return (
    <header className="topbar">
      <div className="brand">
        <h1>VitalStore Admin</h1>
        <small>Panel de administración · Suplementos deportivos</small>
      </div>
      <nav className="nav-grid">
        {links.map((link) => (
          <NavLink
            key={`${link.to}-${link.label}`}
            to={link.to}
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
