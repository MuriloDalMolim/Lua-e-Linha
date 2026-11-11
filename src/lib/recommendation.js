import guide from "../data/guide.json";

export const environments = guide.environments;

export function getSpeciesByEnvironment(environmentId) {
  return guide.species.filter((species) =>
    species.environments.includes(environmentId),
  );
}

export function getRecommendation(speciesId, environmentId) {
  const species = guide.species.find((item) => item.id === speciesId);
  const environment = guide.environments.find(
    (item) => item.id === environmentId,
  );

  if (
    !species ||
    !environment ||
    !species.environments.includes(environmentId)
  ) {
    return null;
  }

  return {
    species: species.name,
    environment: environment.name,
    rod: species.rod,
    line: species.line,
    hook: species.hook,
    baits: species.baits,
    technique: species.technique,
    tip: species.tips[environmentId],
  };
}
