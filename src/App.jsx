import { Routes, Route, NavLink } from "react-router";
import Home from "./pages/Home.jsx";
import Forecast from "./pages/Forecast.jsx";
import Guide from "./pages/Guide.jsx";
import NotFound from "./pages/NotFound.js";

function App() {
  return (
    <>
      <nav>
        <NavLink to="/">Início</NavLink> |{" "}
        <NavLink to="/previsao">Previsão</NavLink> |{" "}
        <NavLink to="/guia">Guia</NavLink> |{" "}
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/previsao" element={<Forecast />} />
          <Route path="/guia" element={<Guide />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
