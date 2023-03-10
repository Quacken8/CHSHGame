---
marp: true
theme: gaia
class: invert
math: katex
---
<style>
  :root {
    font-size: 42px;
    font-family: Inter;
  }
  ul li {
    padding-left: .2rem;
  }
  ol li {
    padding-left: .7rem;
  }
</style>
<style scoped>
  section {
    text-align: center;
  }
  h1 {
    margin-top: 1.2em;
  }
</style>

# <!--fit--> (Pseudo)historický <br> kontext
---

# (Pseudo)historický kontext
 * Začátek 20. století
 * tři **Newtonovy zákony** pohybu oslavily 230 let
    * zrychlení v závislosti na působící síle
    * zákon akce a reakce
    * přeformulován ekvivalentně do několika nových, elegantních matematických teoríí

---
# (Pseudo)historický kontext
  - kompletní teorie **Elektřiny & Magnetizmu** oslavila 50 let
    * „vektory“ pro elegantní výpočty
<br>
  * částečné porozumění atomům a molekulám
    * a velká touha dozvědět se víc!

---
# Elektromagnetizmus
 * předměty mají „elektrický náboj“
    * opačné náboje se přitahují
    * stejné náboje se odpuzují
    * síla $\propto$ velikost náboje
---
# Elektromagnetizmus
  - existují magnety
    * mají severní a jižní pól
    * stejné póly se odpuzují
    * opačné se přitahují
---
# Elektromagnetizmus
  - elektřina ovlivňuje magnety
    * když kroužím nabitou částicí, magnety se chovají, jako kdyby tam byl magnet
---
# Elektromagnetizmus
  - magnetizmus ovlivňuje nabité částice
    * když k letící nabité částici přiložím magnet, zatočí do strany
---
# Elektromagnetizmus
  - zá se, že existují částice s elektrickým nábojem (tzv. „elektrony“ a „protony“)
  * zdá se, že **neexistují** magnetické částice
    *  všechny magnety = kroužící nabité částice?
---
# Elektromagnetizmus
  - EM působí na dálku
  * neděje se to okamžitě
  * existuje E&M pole, změny v něm se šíří rychlostí světla
  * náhoda?!
  * nemyslím si!

---
# Elektromagnetizmus
  - změny v EM poli šířící se pryč od zdroje = „EM záření“

  * světlo, rádiové vlny, mikrovlnné záření, rentgenové záření

  * pohybu magnetů/nabitých částic ⇒ EM záření
---
# Elektromagnetizmus
  - vysvětluje:
    * statickou elektřinu
    * elektrické obvody
    * magnety, elektromagnety
    * světlo
    * rádio, mikrovlnky, rentgen
---
# Atomy
 * Nejlepší představa zatím:
    * jádro = protony (+) a neutrony (Ø)
    * kolem elektrony (−)
      * elektrostat. přitažlivost ⇒ neodletí
      * odstředivá síla ⇒ nespadnou dolů
---
# Atomy
  * „planetární model“
  * elektrony létají kolem jádra jako Měsíc kolem Země nebo Země kolem Slunce
<br>
  * těleso na **vzdálenější** orbitě má **větší** energii

---
# Atomy

_Hvězdy, planety a měsíce létají po různých orbitách a navzájem se různě ovlivňují. Dokážeme nějak zkoumat orbity elektronů kolem jader?_

  * Ano, dokážeme!
---
# Vnitřní struktura atomu
  * pohyb nabitých částic produkuje EM záření
  * stejně jako pohyb planet a hvězd produkuje gravitační vlny
  * gravitace je slabá ($10^{42}$-krát slabší než EM), proto byly gravitační vlny detekovány až v 2015
  * EM je silné, proto 👀
---
# Vnitřní struktura atomu
  * pojďme se tedy podívat na to, jak atomy vyzařují!
  * _oh no...!_

---
// TODO
* podivnost: atomy v klidu nevyzařují žádné EM záření, a když je vybudíme, vyzařují jen záření o konkrétních, pevně daných vlnových délkách/frekvencích/barvách
* netušíme, jak to vysvětlit! zkusíme si tipnout, jak by to *zhruba* mohlo být:
* elektrony se nemůžou pohybovat jakkoliv, ale mají pevně dané „poličky“, na kterých sedí, a jinde být nesmí
* každá „polička“ má nějakou energii
* dokud jsou na "poličkách", nic nevyzařují
* když se přesunou mezi "poličkami", přijmou nebo vyzáří rozdíl energií

    * tahle teorie funguje!
        * = dobře predikuje pozorované vlnové délky
        * ≠ víme, co přesně se v atomu děje (a abych vás zbytečně nenapínal – to se přesně v průběhu této přednášky nedozvíme, vydáme se ale na cestu, která k odpovědi vede, a v případě zájmu můžeme např. zorganizovat přednášku, kde se k tomu dostaneme)
      * můžeme projít všechny známé prvky a sepsat si, jaké "poličky" mají, zajímavé pozorování:
        * do každého orbitalu se vejdou dva elektrony
        * orbitaly můžou být různě vysoko (→ roste jejich energie)a různě prostorově orientované
        * magnetické štěpení → je elektron malý magnetek?

---

<br>

# <!--fit--> Přestávka!
* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;& sudoku

---
<!-- backgroundColor: #476647 -->
<style scoped>
  section {
    text-align: center;
    line-height: 170%;
  }
  h1 {
    margin-top: 0.5em;
  }
</style>

# <!--fit--> „Magnetická&nbsp;&nbsp;&nbsp;<br>vlastnost<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;elektronu“


---

## „Magnetická vlastnost elektronu“
  - otázka: je elektron malý magnetek?!
  * jak na to?
    * to je jednoduché!
    * stačí ho dát do magnetického pole!
---
## „Magnetická vlastnost elektronu“
  - není to tak jednoduché:
    * v rovnoměrném magnetickém poli se magnet jen otáčí, ale nezrychluje
    * ⇒ použijeme nerovnoměrné pole
---
## „Magnetická vlastnost elektronu“
  - není to tak jednoduché:
    - nabitá částice v magnetickém poli krouží
    * → musíme proto použít neutrální částici

---
<style scoped>
  .columns {
    display: grid;
    grid-template-columns: 1fr max-content;
  }
  .columns div {
    margin-top: -0.5em;
  }
  img {
    width: 10em;
    margin: -3em -2em -0.5em -0.5em;
    clip-path: inset(10%);
  }
</style>
<div class="columns">
  <div>

## „Magnetická vlastnost elektronu“
- musíme použít neutrální částici
* atom stříbra nebo draslíku
  * každý mají všechny elektrony krásně spárované – kromě jednoho volného
  * pro skeptiky: neutron

  </div>
  <div>

![](https://upload.wikimedia.org/wikipedia/commons/c/ce/Electron_shell_047_Silver.svg)
![](https://upload.wikimedia.org/wikipedia/commons/d/db/Electron_shell_019_Potassium.svg)

  </div>
</div>

---
# Experiment
![bg 80%](./img/sg_single_0.png)

---
# Experiment
![bg 80%](./img/sg_single_1.png)

---
# Experiment
![bg 80%](./img/sg_single_2.png)

---
# Experiment
![bg 80%](./img/sg_single_3.png)

---
# Hypotézy
 - jaký vzor na stínítku očekáváme?

---
# Hypotézy
![bg height:70%](./img/sg_hypoteza_magnet.png)

---
<style scoped>
  section > :not(h1) {
    font-size: 0.8em;
  }
</style>
# Hypotézy
  1. není magnetický ⇒ poletí přímo dopředu ⇒ rozmazaná tečka
  2. je magnetický, těžké otáčet ⇒ náhodný směr ⇒ rozmazaná tečka
  3. je magnetický, jednoduché otáčet, bez tření ⇒ oscilace, náhodný směr ⇒ rozmazaná tečka
  4. je magnetický, jednoduché otáčet, se třením ⇒ atom se zarovná shodně s polem ⇒ rozmazaná tečka

---
# Výsledek experimentu

![bg 70%](./img/sg_single_vysledek_padded.png)

---
# Výsledek experimentu
  - dva body!!!
  * intenzita 50% : 50%
  * možné vysvětlení:
    - _Atom se velmi rychle zarovná shodně nebo opačně s magnetickým polem._

  * prozkoumat detailněji!
---
# Vylepšený experiment

---
# Vylepšený experiment
![bg 80%](./img/sg_double_0.png)

---
# Vylepšený experiment
![bg 80%](./img/sg_double_1.png)

---
# Vylepšený experiment
![bg 80%](./img/sg_double_2.png)

---
# Vylepšený experiment
![bg 80%](./img/sg_double_3.png)

---
# Vylepšený experiment
![bg 80%](./img/sg_double_4.png)

---
<style scoped>
  img {
    margin: 2.5em 0 0 -1em;
  }
</style>

![width:14em](https://upload.wikimedia.org/wikipedia/commons/6/64/Stern-Gerlach_Analyzer_Sequential_Series_E1.png)
![bg left 90%](./img/sg_double.png)

---
# Vylepšený experiment
- jaký výsledek očekáváme tentokrát?

---
<style scoped>
  .chart-wrapper {
    margin-top: 1em;
    height: 50%;
    display: flex;
    justify-content: center;
  }
</style>
# Výsledek experimentu
$$I(\alpha) = \left( \cos \frac{\alpha}{2} \right)^2$$

<div class="chart-wrapper">
  <canvas id="sg-double-chart"></canvas>
</div>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="./scripts/sg_double_chart.js"></script>


![bg right:20% fit](./img/sg_sequential_targets.png)

---

![bg fit](./img/%3F%3F%3F.png)

---

# <!--fit--> Přestávka!
* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;& sudoku

---
<!-- backgroundColor: #66474e -->

# Vektory
  1. vektor jako šipka
  2. vektor jako $n$-tice čísel
  3. délka vektoru (Pythagorova věta), jednotkový vektor
  4. délka vektoru v nějakém směru (projekce, geometricky)
  5. vektor otočený nějakým směrem ($\sin$, $\cos$)
  6. délka vektoru ve směru jiného (jednotkového) vektoru (skalární součin)
---
# Vektory
![](https://media0.giphy.com/media/mCdhhsCLGluNi/giphy.gif)

---

# Polarizace
  * TODO
 

# Sekvenční SG s více kroky
  * TODO
  * atom "zapomene" v jakém byl stavu

# Interpretace
  * TODO
  *


# Provázaný stav
 * TODO
