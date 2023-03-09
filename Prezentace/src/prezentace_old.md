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
## Rekapitulace matiky
  * vektory
  * komplexní čísla
  * vnitřní součin

---
## Vektory
 * „šipka, která má směr a velikost“ (ou jé!)
 * v klasické fyzice: síla, rychlost, zrychlení
 * důležité pro matematika:
   * šipky umíme skládat
     _„sčítání“_, $\vec a = \vec b + \vec c$
   * šipku umíme $s$-krát prodloužit / zkrátit
     _„násobení skalárem“_, $\vec a = s\vec b$

---
## Vektory
 * „$\vec a + \vec b$“ je sčítání _(kde $\vec a, \vec b$ jsou vektory)_
    1. $\vec a + \vec b = \vec b + \vec a$
    2. $\vec a + (\vec b + \vec c) = (\vec a + \vec b) + \vec c$
    3. $\vec a + (-\vec a) = \vec 0$
    4. $\vec a + \vec 0 = \vec a$
---
## Vektory
 * „$s\vec a$“ je násobení _(kde $s$ je skalár a $\vec a$ je vektor)_.

    5. $1\vec a = \vec a$
    6. $(st)\vec a = s(t\vec a)$
    7. $s(\vec a + \vec b) = s\vec a + s\vec b$
    8. $(s + t)\vec a = s\vec a + t\vec a$

---
## Vektory
 - pro matematiky je **vektorový prostor** všechno, co splňuje osm vyjmenovaných pravidel
 - skaláry dokonce nemusí být reálná čísla ($\mathbb R$)
    * mohou to být racionální čísla ($\mathbb Q$)
    * mohou to být komplexní čísla ($\mathbb C$)
    * mohou to být celá čísla modulo nějaké prvočíslo ($\mathbb Z_p$)

---
## Vektory
 - $n$-tice čísel, které se sčítají po složkách:
$$
  \begin{pmatrix}a\\b\\c\end{pmatrix} +
  \begin{pmatrix}e\\f\\g\end{pmatrix} =
  \begin{pmatrix}a + e\\b + f\\c + g\end{pmatrix}
$$
… a skalárem se násobí všechny složky najednou:
$$
  s \, \begin{pmatrix}a\\b\\c\end{pmatrix} = \begin{pmatrix}sa\\sb\\sc\end{pmatrix}
$$

---
## Vektory
 - takové $n$-tice splňují definici vektorového prostoru

<div style="text-align: center">
  vektory jako šipky ve 2D ⟷ dvojice reálných čísel<br/>
  vektory jako šipky ve 3D ⟷ trojice reálných čísel
</div>

 * izomorfismus:
$$
\begin{matrix}
  V & \hspace{-1em}\xleftrightarrow{f}\hspace{-1em} & W \\[.3em]
  \quad\downarrow^\text{lin.} & & \quad\downarrow^\text{lin.} \\[.2em]
  V & \hspace{-1em}\xleftrightarrow{f}\hspace{-1em} & W
\end{matrix}
$$

---
## Vektory
 * všechny vektorové prostory stejné dimenze nad stejným tělesem jsou izomorfní
 * je tedy jedno, jestli provádíme výpočty s šipkami, nebo $n$-ticemi čísel, nebo to dokonce měníme v průběhu výpočtu
 * podobnost: je jedno, jestli aritmetický výpočet provedu v arabských nebo římských číslicích

---
## Komplexní čísla
 * vezmeme reálná čísla
 * přidáme k nim nový symbol $\mathrm i$
 * uděláme to takovým způsobem, že $\mathrm i + 1$ se nerovná žádnému reálnému číslu ani samotnému $\mathrm i$, ale je to úplně nové číslo
   - matematici tomu říkají „volná algebra“

$$
\begin{aligned}
 (2 + \mathrm i)(-1 + 3 \mathrm i)
 &= (2)(-1) + (2)(3\mathrm i) + (\mathrm i)(-1) + (\mathrm i)(3\mathrm i) \\
 &= -2 + 5\mathrm i + 3\mathrm i^2
\end{aligned}
$$

---
## Komplexní čísla
* zavedeme pravidlo: $\mathrm i^2 = -1$
  * proč? hlavně pro srandu
  * a protože žádné reálné číslo takovou vlastnost nemá

$$
\begin{aligned}
 (2 + \mathrm i)(-1 + 3 \mathrm i)
 &= -2 + 5\mathrm i + 3\mathrm i^2 \\
 &= -2 + 5\mathrm i - 3 \\
 &= -5 + 5\mathrm i
\end{aligned}
$$

---
## Komplexní čísla
Zajímavé pozorování:
Když si komplexní čísla zakreslíme do soustavy souřadnic, sčítání vypadá jako sčítání vektorů a při násobení se násobí délky a sčítají úhly.

Délku komplexního čísla $z$ budeme značit $|z|$.

![bg right 80%](https://cdn1.byjus.com/wp-content/uploads/2021/06/multiplication-of-complex-numbers-in-polar-form.png)

---
## Komplexní čísla
Zavádíme operaci _„sdružení“_:
$$
 \mathrm i \mapsto -\mathrm i
 \\[.2em]
 a + b\mathrm i \mapsto a - b\mathrm i
 \\[.2em]
 z \mapsto \bar z
$$
Je to zrcadlení podle reálné osy. Zajímavost: je to nová operace – nejde ji provést jen pomocí sčítání a násobení.

![bg right 50%](https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Complex_conjugate_picture.svg/1200px-Complex_conjugate_picture.svg.png)

---
## Komplexní čísla
 * Funguje dělení?
   - tj. existuje ke každému číslu _inverze_?

 * $(-\mathrm i)(\mathrm i) = -(\mathrm i^2) = -(-1) = 1$
   - inverze k $\mathrm i$ je $-\mathrm i$

 * $(a + b\mathrm i) \left( \dfrac{a - b\mathrm i}{a^2 + b^2} \right) = \frac{(a + b\mathrm i)(a - b\mathrm i)}{a^2 + b^2} = \frac{a^2 + ab\mathrm i - ab\mathrm i + b^2}{a^2 + b^2} =$
   $= \frac{a^2 + b^2}{a^2 + b^2} = 1$
    - inverze k $z \neq 0$ je $\frac{\bar z}{|z|^2}$

---
## Vnitřní součin
 * nový druh násobení, kterým můžeme „vybavit“ náš vektorový prostor, je to binární operace dvou vektorů, jejíž výsledek je skalár
 * také nazývaný _„skalární součin“_ – neplést s násobením vektoru skalárem (což je operace mezi skalárem a vektorem a její výsledek je vektor)

$$
  \begin{pmatrix}a\\b\\c\end{pmatrix} \cdot \begin{pmatrix}d\\e\\f\end{pmatrix}
  = ad + be + cf
$$

---
## Vnitřní součin
 * vnitřní součin vektoru se sebou samým = čtverec jeho délky
$$
  \begin{pmatrix}a\\b\\c\end{pmatrix} \cdot \begin{pmatrix}a\\b\\c\end{pmatrix}
  = a^2 + b^2 + c^2
  =: \left\lVert \begin{pmatrix}a\\b\\c\end{pmatrix} \right\rVert^2
$$

---
## Vnitřní součin
 * u komplexních čísel neplatí $x^2 \geq 0$, proto skalární součin trochu upravíme:
$$
  \begin{pmatrix}a\\b\\c\end{pmatrix} \cdot \begin{pmatrix}d\\e\\f\end{pmatrix}
  = \bar ad + \bar be + \bar cf
$$
$$
  \begin{pmatrix}a\\b\\c\end{pmatrix} \cdot \begin{pmatrix}a\\b\\c\end{pmatrix}
  = \bar aa + \bar bb + \bar cc
  = |a|^2 + |b|^2 + |c|^2
  =: \left\lVert \begin{pmatrix}a\\b\\c\end{pmatrix} \right\rVert^2
$$

---
# Kvantovka
 *  asdf
