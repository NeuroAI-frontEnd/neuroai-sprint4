import { Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import Home from "./pages/home";
import Sobre from "./pages/sobre";
import Faq from "./pages/faq";
import Contato from "./pages/contato";
import Integrantes from "./pages/integrantes";
import { AgendarConsulta } from "./pages/agendarConsulta";
import ConsultasMarcadas from "./pages/consultasMarcadas";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/integrantes" element={<Integrantes />} />
          <Route path="/agendarConsultas" element={<AgendarConsulta />} />
          <Route path="/consultasMarcadas" element={<ConsultasMarcadas />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}