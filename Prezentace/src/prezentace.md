---
marp: true
theme: gaia
class: invert
math: katex
style: |
  ul li {
    padding-left: .2rem;
  }
  ol li {
    padding-left: .7rem;
  }
---

# Kvantové posezení
9\. 3. 2023

---

# Rekapitulace matiky
  * komplexní čísla
  * vektory

---

# Komplexní čísla
 * vezmeme reálná čísla
 * přidáme k nim nový symbol $\mathrm i$
 * uděláme to takovým způsobem, že $\mathrm i + 1$ se nerovná žádnému reálnému číslu ani samotnému $\mathrm i$, ale je to úplně nové číslo
   - matematici tomu říkají „volná algebra“

$$
\begin{aligned}
 (2 + \mathrm i)(-1 + 3 \mathrm i) &= 2\cdot(-1) + \mathrm i \cdot(-1) + \mathrm i ()
\end{aligned}
$$

---

# Vektory
 * „šipka, která má směr a velikost“ (ou jé!)
 * v klasické fyzice: síla, rychlost, zrychlení
 * důležité pro matematika:
   * šipky umíme skládat
     _„sčítání“_, $\vec a = \vec b + \vec c$
   * šipku umíme $s$-krát prodloužit / zkrátit
     _„násobení skalárem“_, $\vec a = s\vec b$

---
# Vektory
 * „$\vec a + \vec b$“ je sčítání _(kde $\vec a, \vec b$ jsou vektory)_
    1. $\vec a + \vec b = \vec b + \vec a$
    2. $\vec a + (\vec b + \vec c) = (\vec a + \vec b) + \vec c$
    3. $\vec a + (-\vec a) = \vec 0$
    4. $\vec a + \vec 0 = \vec a$
---
# Vektory
 * „$s\vec a$“ je násobení _(kde $s$ je skalár a $\vec a$ je vektor)_.

    5. $1\vec a = \vec a$
    6. $(st)\vec a = s(t\vec a)$
    7. $s(\vec a + \vec b) = s\vec a + s\vec b$
    8. $(s + t)\vec a = s\vec a + t\vec a$

---
# Vektory
 - pro matematiky je **vektorový prostor** všechno, co splňuje osm vyjmenovaných pravidel
 - skaláry dokonce nemusí být reálná čísla ($\mathbb R$)
    * mohou to být racionální čísla ($\mathbb Q$)
    * mohou to být komplexní čísla ($\mathbb C$)
    * mohou to být celá čísla modulo nějaké prvočíslo ($\mathbb Z_p$)
