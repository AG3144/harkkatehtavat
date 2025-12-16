import { describe, expect, it, beforeEach } from 'vitest';
import ravintola from '../ravintola/ravintola.js';

describe('Ravintola-sovelluksen testaus', function () {
  // Nollataan paikat ennen jokaista testiä, jotta testit eivät häiritse toisiaan
  beforeEach(() => {
    ravintola.generoiPaikat();
  });

  // TESTITAPAUS 1: Normaali varaus
  it('Testitapaus 1: Pitäisi onnistua (palauttaa Array), jos paikkoja on riittävästi', () => {
    // Kutsutaan funktiota argumentilla, joka on <= 15
    const tilaukset = ravintola.syoRavintolassa(5);

    expect(tilaukset).toBeInstanceOf(Array);
    expect(tilaukset.length).toBe(5);
  });

  // TESTITAPAUS 2: Ylivaraus (10 + 6)
  it('Testitapaus 2: Toisen varauksen pitäisi epäonnistua (palauttaa undefined), jos paikat loppuvat', () => {
    // 1. Varataan ensin 10 paikkaa (onnistuu, jäljellä 5)
    ravintola.syoRavintolassa(10);

    // 2. Yritetään varata 6 paikkaa lisää (ei pitäisi onnistua, koska 10+6 > 15)
    const tilaukset = ravintola.syoRavintolassa(6);

    // Funktio palauttaa undefined (eli "return;" ilman arvoa), jos tilaa ei ole.
    expect(tilaukset).toBeUndefined();
  });

  it('Pitäisi heittää TypeError, jos syöte ei ole numero', () => {
    expect(() => {
      ravintola.syoRavintolassa('kaksi'); // Väärä tyyppi (string)
    }).toThrowError(TypeError);
  });

  // TESTITAPAUS 3: Laskun laskeminen uusilla olioilla
  it('Testitapaus 3: laskeLasku laskee summan oikein ruokaolioiden hinnoista', () => {
    // Luodaan testioliot hinnoilla
    const alkuruoka = { nimi: 'TestiAlku', hinta: 5 };
    const paaruoka = { nimi: 'TestiPaa', hinta: 10 };
    const jalkiruoka = { nimi: 'TestiJalki', hinta: 4 };
    const juoma = { nimi: 'TestiJuoma', hinta: 2 };

    // Kutsutaan funktiota olioilla (ei enää boolean-arvoilla!)
    const summa = ravintola.laskeLasku(alkuruoka, paaruoka, jalkiruoka, juoma);

    // Odotettu summa: 5 + 10 + 4 + 2 = 21
    expect(summa).toBe(21);
  });

  // Alkuperäinen esimerkkitesti (päivitettynä toimimaan uuden logiikan kanssa)
  it('should return a value from one of the arrays in Ravintola', () => {
    const kohdeTaulukko = ravintola.paaruoat;
    const palautettuArvo =
      ravintola.palautaTaulukonSatunnainenArvo(kohdeTaulukko);

    expect(kohdeTaulukko).toContain(palautettuArvo);
    expect(palautettuArvo).toHaveProperty('hinta'); // Varmistetaan että oliolla on hinta
  });
});
