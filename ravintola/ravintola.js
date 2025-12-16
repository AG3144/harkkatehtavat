/*
TIKO RAVINTOLA
OHJELMAKOODI
*/

const Ravintola = function () {
  this.alkuruoat = [
    { nimi: 'Tomaattikeitto', hinta: 5 },
    { nimi: 'Leipä', hinta: 2 },
    { nimi: 'Vihersalaatti', hinta: 4 },
    { nimi: 'Salsa', hinta: 3 },
  ];
  this.paaruoat = [
    { nimi: 'Kalakeitto', hinta: 10 },
    { nimi: 'Makaroonilaatikko', hinta: 8 },
    { nimi: 'Kasvispihvi', hinta: 12 },
    { nimi: 'Kanasalaatti', hinta: 9 },
  ];
  this.jalkiruoat = [
    { nimi: 'Hedelmäsalaatti', hinta: 5 },
    { nimi: 'Jäätelö', hinta: 4 },
    { nimi: 'Pulla', hinta: 3 },
    { nimi: 'Donitsi', hinta: 2 },
  ];
  this.juomat = [
    { nimi: 'Tee', hinta: 2 },
    { nimi: 'Kahvi', hinta: 3 },
    { nimi: 'Maito', hinta: 1 },
    { nimi: 'Mehu', hinta: 2 },
  ];

  this.paikkojenMaara = 15;
  this.paikat; // Tähän muuttujaan paikkojen taulukko
};
/**
 * Palauttaa satunnaisen boolean arvon
 * @return {boolean} Randomized boolean
 */
function generoiBoolean() {
  return Math.random() < 0.5;
}

/**
 * Jos 'asiakkaidenMaara' on pienempi tai yhtäsuuri kuin 'paikkojenMaara', luo taulukon 'tilaukset'
 * johon tallennetaan yksittäisen asiakkaan tilaus.
 */
Ravintola.prototype.syoRavintolassa = function (asiakkaidenMaara) {
  // Tarkistetaan ensin syötteen oikeellisuus (negatiiviset luvut jne.)
  if (!this.tarkistaPaikkojenMaara(asiakkaidenMaara)) {
    return;
  }

  // Tämä tarkistaa onko vapaata tilaa ja muuttaa false -> true.
  if (!this.varaaPaikat(asiakkaidenMaara)) {
    console.log(
      'Valitettavasti ravintolassa ei ole juuri nyt tarpeeksi vapaita paikkoja.'
    );
    return;
  }

  const tilaukset = [];

  for (let i = 0; i < asiakkaidenMaara; i++) {
    console.log('-------------------------------------------------------');
    console.log(
      'Tarjoillaan asiakasta numero ' + (i + 1) + '. Mitä teille saisi olla?'
    );
    tilaukset.push(
      this.tilaaAteria(generoiBoolean(), generoiBoolean(), generoiBoolean())
    );
    console.log('Asiakkaalle tarjoiltu. Hyvää ruokahalua!');
  }
  console.log('-------------------------------------------------------');
  console.log('Kaikille asiakkaille tarjoiltu!');

  return tilaukset;
};

/**
 * Tarkistusfunktio syötteelle ja teoreettiselle maksimikoolle
 */
Ravintola.prototype.tarkistaPaikkojenMaara = function (asiakkaidenMaara) {
  if (typeof asiakkaidenMaara !== 'number') {
    throw new TypeError();
  }
  if (asiakkaidenMaara <= 0) {
    console.log(
      'Ikävä kyllä emme voi tarjoilla ' + asiakkaidenMaara + ' asiakkaalle.'
    );
    return false;
  } else if (asiakkaidenMaara <= this.paikkojenMaara) {
    console.log(
      'Tilaa on ' + asiakkaidenMaara + ' asiakkaalle. Tervetuloa ravintolaamme!'
    );
    return true;
  } else {
    console.log(
      'Ikävä kyllä ravintolaamme ei mahdu ' + asiakkaidenMaara + ' asiakasta.'
    );
    return false;
  }
};

/**
 * Luo Ravintolan paikat-muuttujaan uuden taulukon
 */
Ravintola.prototype.generoiPaikat = function () {
  this.paikat = new Array(this.paikkojenMaara).fill(false);
};

/**
 * Varaa halutun määrän paikkoja
 */
Ravintola.prototype.varaaPaikat = function (varauksenMaara) {
  if (!this.paikat || !Array.isArray(this.paikat)) {
    this.generoiPaikat();
  }

  if (varauksenMaara === undefined) {
    varauksenMaara = 1;
  }

  var vapaitaJaljella = 0;
  for (var i = 0; i < this.paikat.length; i++) {
    if (this.paikat[i] === false) {
      vapaitaJaljella++;
    }
  }

  if (vapaitaJaljella < varauksenMaara) {
    return false;
  }

  var varattujaNyt = 0;
  for (var j = 0; j < this.paikat.length; j++) {
    if (varattujaNyt === varauksenMaara) {
      break;
    }
    if (this.paikat[j] === false) {
      this.paikat[j] = true;
      varattujaNyt++;
    }
  }

  return true;
};

Ravintola.prototype.tilaaAteria = function (
  ottaaAlkuruoan,
  ottaaJalkiruoan,
  ottaaJuoman
) {
  if (
    typeof ottaaAlkuruoan !== 'boolean' ||
    typeof ottaaJalkiruoan !== 'boolean' ||
    typeof ottaaJuoman !== 'boolean'
  ) {
    throw new TypeError();
  }

  const ruoat = [];
  let alkuruoka = null;
  let paaruoka = null;
  let jalkiruoka = null;
  let juoma = null;

  // Käytetään nyt .nimi -ominaisuutta tulostuksessa
  if (ottaaAlkuruoan) {
    alkuruoka = this.palautaTaulukonSatunnainenArvo(this.alkuruoat);
    console.log('Ottaisin alkuruoaksi: ' + alkuruoka.nimi);
    ruoat.push(alkuruoka.nimi);
  }

  // Pääruoka otetaan aina
  paaruoka = this.palautaTaulukonSatunnainenArvo(this.paaruoat);
  console.log('Ottaisin pääruoaksi: ' + paaruoka.nimi);
  ruoat.push(paaruoka.nimi);

  if (ottaaJalkiruoan) {
    jalkiruoka = this.palautaTaulukonSatunnainenArvo(this.jalkiruoat);
    console.log('Ottaisin jälkiruoaksi: ' + jalkiruoka.nimi);
    ruoat.push(jalkiruoka.nimi);
  }

  if (ottaaJuoman) {
    juoma = this.palautaTaulukonSatunnainenArvo(this.juomat);
    console.log('Ottaisin juomaksi: ' + juoma.nimi);
    ruoat.push(juoma.nimi);
  }

  // Kutsutaan laskeLasku funktiota valituilla olioilla
  const summa = this.laskeLasku(alkuruoka, paaruoka, jalkiruoka, juoma);

  return { summa, ruoat };
};

Ravintola.prototype.palautaTaulukonSatunnainenArvo = function (taulukko) {
  return taulukko[Math.floor(Math.random() * taulukko.length)];
};

Ravintola.prototype.laskeLasku = function (
  alkuruoka,
  paaruoka,
  jalkiruoka,
  juoma
) {
  let loppuSumma = 0;

  // Pääruoka on aina
  if (paaruoka) loppuSumma += paaruoka.hinta;

  if (alkuruoka) {
    loppuSumma += alkuruoka.hinta;
  }

  if (jalkiruoka) {
    loppuSumma += jalkiruoka.hinta;
  }

  if (juoma) {
    loppuSumma += juoma.hinta;
  }

  return loppuSumma;
};

// Export
const ravintola = new Ravintola();
export default ravintola;
