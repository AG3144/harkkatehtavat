/* Importeilla tuodaan käyttöön testausfunktiot vitest-kirjastosta, ja tuodaan mukaan itse testattava koodi eli laskin.js -tiedosto. */
import { describe, test, expect, it } from 'vitest';
import ravintola from '../ravintola/ravintola.js';

describe('Ravintola- sovelluksen testaus'),
  function () {
    it('should return correct sum from laskeLasku when customer picks starter and main course and dessert and no drink', function () {
      expect(ravintola.laskeLasku(true, true, true)).toBe(17);
    });

    it('should return a value from one of the arrays in Ravintola(alkuruoat, paaruoat, jalkiruoat, juomat))', () => {
      const testiArvotaulokosta = ravintola.palautaTaulukonSatunnainenArvo(
        ravintola.juomat
      );
    });
  };
