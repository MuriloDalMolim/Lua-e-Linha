import { useState } from "react";
import { getMoonPhase } from "../lib/moonPhase.js";
import AdSlot from "../components/AdSlot.jsx";

// Formata uma data como "AAAA-MM-DD", o formato do <input type="date">
function toInputValue(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function Forecast() {
  const [selectedDate, setSelectedDate] = useState(toInputValue(new Date()));

  // Meio-dia local, para a data não "pular" de dia por causa do fuso horário
  const moon = getMoonPhase(new Date(`${selectedDate}T12:00:00`));

  return (
    <section>
      <h1>Previsão de pesca</h1>
      <p>
        Escolha uma data e veja como a fase da lua pode influenciar a pescaria.
      </p>

      <label className="date-field">
        Data da pescaria
        <input
          type="date"
          value={selectedDate}
          onChange={(event) => setSelectedDate(event.target.value)}
        />
      </label>

      <article className="moon-card">
        <span className="moon-card__emoji" aria-hidden="true">
          {moon.emoji}
        </span>
        <div>
          <h2>{moon.name}</h2>
          <p>{moon.illumination}% iluminada</p>
          <p className="moon-card__rating">
            Pesca: <strong>{moon.rating}</strong>
          </p>
          <p>{moon.tip}</p>
        </div>
      </article>

      <AdSlot label="Anuncie aqui: iscas e equipamentos" size="card" />
    </section>
  );
}

export default Forecast;
