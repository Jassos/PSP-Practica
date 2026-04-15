const teams = [
  "Dashboard",
  "Productos",
  "Agregar",
  "Editar",
  "Ver Producto",
  "Usuarios",
  "Perfil",
  "Iniciar Sesión",
  "Registrarse"
];

export function HomePage() {
  return (
    <main className="panel">
      <h2>Secciones del sistema</h2>

      <section className="card">
        <ul>
          {teams.map((team) => (
            <li key={team}>{team}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}

