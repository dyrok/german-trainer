# Statistics - Graphical Representation & Data Analysis

**Date:** 27/04/2026, Monday  
**Day:** 12 & 13 & 14  
**Topic:** Graphical Representation, Mean, Median, Mode

---

## 1. Graphical Representation (Pie Diagrams)

**Q1. The marks obtained by a student in different subjects are shown. Draw a pie diagram showing the info.**

| Subject | Marks | Central Angle Calculation | Angle |
| :--- | :--- | :--- | :--- |
| English | 50 | $\frac{50}{400} \times 360$ | $45^\circ$ |
| Marathi | 70 | $\frac{70}{400} \times 360$ | $63^\circ$ |
| Science | 80 | $\frac{80}{400} \times 360$ | $72^\circ$ |
| Math | 90 | $\frac{90}{400} \times 360$ | $81^\circ$ |
| Social Science | 60 | $\frac{60}{400} \times 360$ | $54^\circ$ |
| Hindi | 50 | $\frac{50}{400} \times 360$ | $45^\circ$ |
| **Total** | **400** | | **$360^\circ$** |

*(To check: $45^\circ + 63^\circ + 72^\circ + 81^\circ + 54^\circ + 45^\circ = 360^\circ$)*

**Q2. If total workers are 1000, find how many of them are in the field of:**
*(a) Construction (Given angle = $72^\circ$)*
*(b) Administration (Given angle = $48^\circ$)*

**Ans:**
* Total = 1000
* **(a)** Construction: $\frac{72}{360} \times 1000 = 200 \text{ workers}$
* **(b)** Administration: $\frac{48}{360} \times 1000 = 133.33 \approx 133 \text{ workers}$

**Q3. The annual investments of a family are shown in a pie diagram. Answer the following:**
*(Shares = $60^\circ$, Mutual Funds = $60^\circ$, Immovable Property = $120^\circ$, Bank Deposit = $90^\circ$, Post = $30^\circ$)*

**(a) If the investment in shares is ₹2000, find total investment.**
$\frac{60}{360} \times \text{Total} = 2000 \implies \text{Total} = \frac{2000 \times 360}{60} = \text{₹}12,000$

**(b) How much amount is deposited in bank?**
$\frac{90}{360} \times 12000 = \text{₹}3000$

**(c) How much more money is invested in immovable property than in mutual funds?**
* Immovable property: $\frac{120}{360} \times 12000 = \text{₹}4000$
* Mutual funds: $\frac{60}{360} \times 12000 = \text{₹}2000$
* Difference = $4000 - 2000 = \text{₹}2000 \text{ more.}$

**(d) How much amount is invested in post?**
$\frac{30}{360} \times 12000 = \text{₹}1000$

---

## 2. Mean

**Raw Data Formula:**
$$\bar{x} = \frac{\sum x_i}{n}$$
*Example:* $7, 6, 5, 4, 8, 3, 9 \implies \bar{x} = \frac{42}{7} = 6$

**Grouped / Ungrouped Frequency Distribution Formula:**
$$\bar{x} = \frac{\sum f_i x_i}{\sum f_i}$$

**Q1. Find the mean for the following distribution:**
| Weight (Class) | No. of Items ($f_i$) | $x_i$ (Midpoint) | $f_i x_i$ |
| :--- | :--- | :--- | :--- |
| 10-15 | 7 | 12.5 | 87.5 |
| 15-20 | 12 | 17.5 | 210.0 |
| 20-25 | 16 | 22.5 | 360.0 |
| 25-30 | 10 | 27.5 | 275.0 |
| 30-35 | 8 | 32.5 | 260.0 |
| 35-40 | 12 | 37.5 | 450.0 |
| **Total** | **$\sum f_i = 65$** | | **$\sum f_i x_i = 1642.5$** |

**Ans:** $\bar{x} = \frac{1642.5}{65} \approx 25.27$

---

## 3. Median

**Raw Data:**
* **Odd $n$:** Median = $(\frac{n+1}{2})^\text{th} \text{ value}$
* **Even $n$:** Median = $\frac{(\frac{n}{2})^\text{th} + (\frac{n}{2} + 1)^\text{th}}{2}$

**Grouped Frequency Distribution Formula:**
$$Median = L + \left[ \frac{\frac{n}{2} - cf}{f_m} \right] \times c$$
*(Where $L$ = lower limit of median class, $cf$ = cumulative frequency of preceding class, $f_m$ = frequency of median class, $c$ = class interval)*

**Q1. Calculate the median expenses:**
| Expenses | No. of Families ($f_i$) | Cumulative Freq ($C.F.$) |
| :--- | :--- | :--- |
| 50-100 | 33 | 33 |
| 100-150 | 30 | 63 ($cf$) |
| **150-200** | **90 ($f_m$)** | **153 (Median Class)** |
| 200-250 | 80 | 233 |
| 250-300 | 17 | 250 |

**Ans:**
$n = 250 \implies \frac{n}{2} = 125$
Median = $150 + \left[ \frac{125 - 63}{90} \right] \times 50 = 150 + \left(\frac{62}{90}\right) \times 50 = 150 + 34.44 = 184.44$

---

## 4. Mode

**Grouped Frequency Distribution Formula:**
$$Mode = L + \left[ \frac{f_m - f_1}{2f_m - f_1 - f_2} \right] \times c$$

**Q1. Electricity used by some families. Find the mode:**
| Electricity Use | No. of Families |
| :--- | :--- |
| 0-20 | 13 |
| 20-40 | 50 |
| 40-60 | 70 ($f_1$) |
| **60-80** | **100 ($f_m$) (Modal Class)** |
| 80-100 | 80 ($f_2$) |
| 100-120 | 17 |

**Ans:**
Mode = $60 + \left[ \frac{100 - 70}{2(100) - 70 - 80} \right] \times 20 = 60 + \left[ \frac{30}{50} \right] \times 20 = 60 + 12 = 72$
