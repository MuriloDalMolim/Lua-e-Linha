import { describe, it, expect } from "vitest";
import guide from "../data/guide.json";
import {
  environments,
  getRecommendation,
  getSpeciesByEnvironment,
} from "./recommendation.js";

describe("getSpeciesByEnvironment", () => {
  it("lista as espécies de rio", () => {
    const names = getSpeciesByEnvironment("rio").map((species) => species.id);
    expect(names).toContain("tilapia");
    expect(names).toContain("dourado");
    expect(names).not.toContain("robalo");
  });

  it("retorna apenas espécies que vivem no ambiente escolhido", () => {
    for (const environment of environments) {
      for (const species of getSpeciesByEnvironment(environment.id)) {
        expect(species.environments).toContain(environment.id);
      }
    }
  });

  it("retorna uma lista vazia para um ambiente inexistente", () => {
    expect(getSpeciesByEnvironment("lago-de-lava")).toEqual([]);
  });
});

describe("getRecommendation", () => {
  it("recomenda o equipamento para a espécie no ambiente", () => {
    const recommendation = getRecommendation("tilapia", "represa");
    expect(recommendation.species).toBe("Tilápia");
    expect(recommendation.environment).toBe("Represa");
    expect(recommendation.baits).toContain("Minhoca");
    expect(recommendation.tip).toBe(guide.species[0].tips.represa);
  });

  it("retorna null quando a espécie não vive no ambiente", () => {
    expect(getRecommendation("robalo", "rio")).toBeNull();
  });

  it("retorna null para espécie ou ambiente inexistente", () => {
    expect(getRecommendation("tubarao", "mar")).toBeNull();
    expect(getRecommendation("tilapia", "lago-de-lava")).toBeNull();
  });

  it("retorna null quando nada foi selecionado", () => {
    expect(getRecommendation("", "")).toBeNull();
  });
});

describe("dados do guia", () => {
  const environmentIds = environments.map((environment) => environment.id);

  it("possui todas as informações de equipamento em cada espécie", () => {
    for (const species of guide.species) {
      expect(species.rod).toBeTruthy();
      expect(species.line).toBeTruthy();
      expect(species.hook).toBeTruthy();
      expect(species.technique).toBeTruthy();
      expect(species.baits.length).toBeGreaterThan(0);
    }
  });

  it("usa apenas ambientes cadastrados", () => {
    for (const species of guide.species) {
      for (const environmentId of species.environments) {
        expect(environmentIds).toContain(environmentId);
      }
    }
  });

  it("possui uma dica para cada ambiente da espécie", () => {
    for (const species of guide.species) {
      for (const environmentId of species.environments) {
        expect(species.tips[environmentId]).toBeTruthy();
      }
    }
  });
});
