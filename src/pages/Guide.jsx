import { useState } from "react";
import AdSlot from "../components/AdSlot.jsx";
import {
  environments,
  getRecommendation,
  getSpeciesByEnvironment,
} from "../lib/recommendation.js";

function Guide() {
  const [environmentId, setEnvironmentId] = useState("");
  const [speciesId, setSpeciesId] = useState("");

  const speciesOptions = getSpeciesByEnvironment(environmentId);
  const recommendation = getRecommendation(speciesId, environmentId);

  function handleEnvironmentChange(id) {
    setEnvironmentId(id);
    setSpeciesId("");
  }

  return (
    <section>
      <h1>Guia de equipamentos</h1>
      <p>
        Escolha onde e o que você quer pescar e veja o equipamento recomendado.
      </p>

      <fieldset className="guide-environments">
        <legend>Onde você vai pescar?</legend>
        {environments.map((environment) => (
          <button
            key={environment.id}
            type="button"
            className={environment.id === environmentId ? "is-selected" : ""}
            aria-pressed={environment.id === environmentId}
            onClick={() => handleEnvironmentChange(environment.id)}
          >
            {environment.name}
          </button>
        ))}
      </fieldset>

      {environmentId && (
        <label className="guide-species">
          Qual peixe?
          <select
            value={speciesId}
            onChange={(event) => setSpeciesId(event.target.value)}
          >
            <option value="">Selecione uma espécie</option>
            {speciesOptions.map((species) => (
              <option key={species.id} value={species.id}>
                {species.name}
              </option>
            ))}
          </select>
        </label>
      )}

      {recommendation && (
        <article className="guide-card">
          <h2>
            {recommendation.species} · {recommendation.environment}
          </h2>
          <dl>
            <dt>Vara</dt>
            <dd>{recommendation.rod}</dd>
            <dt>Linha</dt>
            <dd>{recommendation.line}</dd>
            <dt>Anzol</dt>
            <dd>{recommendation.hook}</dd>
            <dt>Iscas</dt>
            <dd>{recommendation.baits.join(", ")}</dd>
            <dt>Técnica</dt>
            <dd>{recommendation.technique}</dd>
          </dl>
          <p className="guide-card__tip">💡 {recommendation.tip}</p>
        </article>
      )}

      <AdSlot
        label="Links de afiliado: compre o equipamento recomendado"
        size="card"
      />
    </section>
  );
}

export default Guide;
