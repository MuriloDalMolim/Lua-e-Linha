import { Routes, Route } from "react-router";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Forecast from "./pages/Forecast.jsx";
import Guide from "./pages/Guide.jsx";
import NotFound from "./pages/NotFound.jsx";
import AdSlot from "./components/AdSlot.jsx";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Header />
      <AdSlot label="Anuncie aqui: lojas de pesca e pesqueiros da região" />

      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/previsao" element={<Forecast />} />
          <Route path="/guia" element={<Guide />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
