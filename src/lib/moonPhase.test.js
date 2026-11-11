import { describe, it, expect } from "vitest";
import { getMoonAge, getMoonPhase } from "./moonPhase.js";

const SYNODIC_MONTH = 29.530588853;
const MS_PER_DAY = 24 * 60 * 60 * 1000;

describe("getMoonPhase", () => {
  it("identifica a lua nova de referência", () => {
    const moon = getMoonPhase(new Date("2000-01-06T18:14:00Z"));
    expect(moon.name).toBe("Lua nova");
    expect(moon.illumination).toBe(0);
  });

  it("identifica o quarto crescente", () => {
    expect(getMoonPhase(new Date("2000-01-14T13:34:00Z")).name).toBe(
      "Quarto crescente",
    );
  });

  it("identifica a lua cheia", () => {
    const moon = getMoonPhase(new Date("2000-01-21T04:40:00Z"));
    expect(moon.name).toBe("Lua cheia");
    expect(moon.illumination).toBeGreaterThanOrEqual(99);
  });

  it("identifica o quarto minguante", () => {
    expect(getMoonPhase(new Date("2000-01-28T07:57:00Z")).name).toBe(
      "Quarto minguante",
    );
  });

  it("calcula corretamente datas anteriores à referência", () => {
    expect(getMoonPhase(new Date("1999-12-22T17:31:00Z")).name).toBe(
      "Lua cheia",
    );
  });

  it("usa a data atual quando nenhuma data é informada", () => {
    const moon = getMoonPhase();
    expect(moon.name).toBeTypeOf("string");
    expect(moon.illumination).toBeGreaterThanOrEqual(0);
    expect(moon.illumination).toBeLessThanOrEqual(100);
  });
});

describe("getMoonAge", () => {
  it("é zero na lua nova de referência", () => {
    expect(getMoonAge(new Date("2000-01-06T18:14:00Z"))).toBeCloseTo(0);
  });

  it("volta a zero após um ciclo lunar completo", () => {
    const oneCycleLater = new Date(
      Date.UTC(2000, 0, 6, 18, 14) + SYNODIC_MONTH * MS_PER_DAY,
    );
    const age = getMoonAge(oneCycleLater);
    expect(Math.min(age, SYNODIC_MONTH - age)).toBeCloseTo(0, 5);
  });

  it("fica sempre entre 0 e a duração do ciclo", () => {
    for (let year = 1990; year <= 2030; year++) {
      const age = getMoonAge(new Date(Date.UTC(year, 5, 15)));
      expect(age).toBeGreaterThanOrEqual(0);
      expect(age).toBeLessThan(SYNODIC_MONTH);
    }
  });
});
