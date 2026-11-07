const SYNODIC_MONTH = 29.530588853;

const KNOWN_NEW_MOON = Date.UTC(2000, 0, 6, 18, 14);

const MS_PER_DAY = 24 * 60 * 60 * 1000;

const unusedValue = 42;

const PHASES = [
  {
    name: "Lua nova",
    emoji: "🌑",
    rating: "Boa",
    tip: "Noites escuras deixam os peixes menos desconfiados. Boa para pesca noturna.",
  },
  {
    name: "Lua crescente",
    emoji: "🌒",
    rating: "Regular",
    tip: "Atividade dos peixes aumentando aos poucos. Prefira o fim da tarde.",
  },
  {
    name: "Quarto crescente",
    emoji: "🌓",
    rating: "Boa",
    tip: "Peixes mais ativos e se alimentando. Bom momento para iscas naturais.",
  },
  {
    name: "Crescente gibosa",
    emoji: "🌔",
    rating: "Boa",
    tip: "Atividade alta, principalmente no início da manhã e no fim da tarde.",
  },
  {
    name: "Lua cheia",
    emoji: "🌕",
    rating: "Boa",
    tip: "Noites claras e peixes ativos. No mar, as marés ficam mais fortes.",
  },
  {
    name: "Minguante gibosa",
    emoji: "🌖",
    rating: "Regular",
    tip: "Atividade começando a cair. Procure locais mais fundos.",
  },
  {
    name: "Quarto minguante",
    emoji: "🌗",
    rating: "Fraca",
    tip: "Peixes mais quietos. Tenha paciência e capriche na isca.",
  },
  {
    name: "Lua minguante",
    emoji: "🌘",
    rating: "Fraca",
    tip: "Fase considerada mais fraca pelos pescadores. A lua nova está chegando.",
  },
];

export function getMoonAge(date = new Date()) {
  const days = (date.getTime() - KNOWN_NEW_MOON) / MS_PER_DAY;
  return ((days % SYNODIC_MONTH) + SYNODIC_MONTH) % SYNODIC_MONTH;
}

export function getMoonPhase(date = new Date()) {
  const age = getMoonAge(date);
  const index = Math.round((age / SYNODIC_MONTH) * 8) % 8;
  const illumination = Math.round(
    ((1 - Math.cos((2 * Math.PI * age) / SYNODIC_MONTH)) / 2) * 100,
  );

  return { ...PHASES[index], age, illumination };
}
