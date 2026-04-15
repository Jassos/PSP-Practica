import { Navigate, Route, Routes } from "react-router-dom";

import { NavBar } from "./components/NavBar";
import { AgregarPage } from "./pages/AgregarPage";
import { DashboardPage } from "./pages/DashboardPage";
import { EditarPage } from "./pages/EditarPage";
import { HomePage } from "./pages/HomePage";
import { IniciarSesionPage } from "./pages/IniciarSesionPage";
import { LogoutPage } from "./pages/LogoutPage";
import { PerfilPage } from "./pages/PerfilPage";
import { ProductosPage } from "./pages/ProductosPage";
import { RegistrarsePage } from "./pages/RegistrarsePage";
import { UsuariosPage } from "./pages/UsuariosPage";
import { VerProductoPage } from "./pages/VerProductoPage";

export default function App() {
  return (
    <div className="layout">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/registro" element={<RegistrarsePage />} />
        <Route path="/login" element={<IniciarSesionPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/usuario" element={<UsuariosPage />} />
        <Route path="/perfil" element={<PerfilPage />} />
        <Route path="/productos/crear" element={<AgregarPage />} />
        <Route path="/productos/lista" element={<ProductosPage />} />
        <Route path="/productos/editar" element={<EditarPage />} />
        <Route path="/productos/eliminar" element={<VerProductoPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

