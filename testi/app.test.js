import { describe, expect, it } from 'vitest';
import ravintola from '../ravintola/ravintola.js';

describe('Ravintola- sovelluksen testaus', function () {
  it('should return correct sum from laskeLasku when customer picks starter and main course and dessert and no drink', function () {
    expect(ravintola.laskeLasku(true, true, true)).toBe(17);
  });

  it('should return a value from one of the arrays in Ravintola (e.g. juomat)', () => {
    const kohdeTaulukko = ravintola.paaruoat;
    const palautettuArvo =
      ravintola.palautaTaulukonSatunnainenArvo(kohdeTaulukko);
    expect(kohdeTaulukko).toContain(palautettuArvo);
  });
  it('should return an Array of orders', () => {
    const tilaukset = ravintola.syoRavintolassa(3);
    expect(tilaukset).toBeInstanceOf(Array);
  });
  it;
});
