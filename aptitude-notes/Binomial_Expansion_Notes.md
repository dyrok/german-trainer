# Binomial Expansion - Math Notes

**Date:** 21/05/2026, Thursday  
**Day:** 15  
**Topic:** Binomial Expansion

## Pascal's Triangle & Basics
*Note: In an expansion, you always get ONE MORE value (term) than the power.*
*Example: $(a+b)^5$ has a power of 5, so its expansion will have 6 terms.*

$(a+b)^2 = a^2 + 2ab + b^2$
$(a+b)^3 = a^3 + 3a^2b + 3ab^2 + b^3$
$(a-b)^3 = a^3 - 3a^2b + 3ab^2 - b^3$

Using Pascal's triangle for $(a+b)^5$:
$$a^5 + 5a^4b + 10a^3b^2 + 10a^2b^3 + 5ab^4 + b^5$$

---

## General Term Formula
To find the value of a specific term:
$$T_{r+1} = ^nC_r \cdot a^{n-r} \cdot b^r$$
*(Reminder: $r$ is always ONE LESS than the term asked for. $^nC_r = \frac{n!}{r!(n-r)!}$)*

**Q1. Find the 3rd term of $(a+b)^5$**
**Ans:**
$n = 5, r = 2$
$$T_3 = ^5C_2 \cdot a^{5-2} \cdot b^2 = \frac{5 \times 4}{2 \times 1} a^3 b^2 = 10a^3b^2$$

**Q2. Find the 5th term of $(2x+3y)^6$**
**Ans:**
$n = 6, r = 4$
$$T_5 = ^6C_4 \cdot a^2 \cdot b^4$$
$$^6C_4 = \frac{6!}{2!4!} = 15$$
$$T_5 = 15(2x)^2(3y)^4 = 15(4x^2)(81y^4) = 4860x^2y^4$$

**Q3. Find the 6th term of $(2x - \frac{1}{x^2})^7$**
**Ans:**
$n = 7, r = 5$
$$T_6 = ^7C_5 \cdot a^2 \cdot b^5 = 21 \cdot (2x)^2 \cdot \left(\frac{-1}{x^2}\right)^5$$
$$T_6 = 21(4x^2)\left(\frac{-1}{x^{10}}\right) = \frac{-84}{x^8}$$

**Q4. Find the middle term of $(3x + \frac{1}{\sqrt{x}})^6$**
**Ans:**
Number of terms = $n + 1 = 6 + 1 = 7$.
The middle term of 7 terms is the 4th term.
$n = 6, r = 3$
$$T_4 = ^6C_3 \cdot (3x)^3 \cdot \left(\frac{1}{\sqrt{x}}\right)^3$$
$$^6C_3 = \frac{6 \times 5 \times 4}{3 \times 2 \times 1} = 20$$
$$T_4 = 20(27x^3)\left(\frac{1}{x^{3/2}}\right) = 540x^{3 - 1.5} = 540x^{3/2} = 540x\sqrt{x}$$

**Q5. Find the middle term of $(\frac{3x^2 - 1}{2x})^7$**
**Ans:**
$n = 7 \implies$ total no. of terms = 8.
Middle terms are the 4th and 5th terms.
*For 4th term ($r=3$):*
$$T_4 = ^7C_3 \cdot (3x^2)^4 \cdot \left(\frac{-1}{2x}\right)^3 = 35(81x^8)\left(\frac{-1}{8x^3}\right) = \frac{-2835}{8}x^5$$
*For 5th term ($r=4$):*
$$T_5 = ^7C_4 \cdot (3x^2)^3 \cdot \left(\frac{-1}{2x}\right)^4 = 35(27x^6)\left(\frac{1}{16x^4}\right) = \frac{945}{16}x^2$$

---

## Decimal Expansion

**Q6. Expand $(1.1)^4$**
**Ans:**
$$(1 + 0.1)^4 = 1^4 + 4(1^3)(0.1) + 6(1^2)(0.1)^2 + 4(1)(0.1)^3 + (0.1)^4$$
$$= 1 + 0.4 + 0.06 + 0.004 + 0.0001 = 1.4641$$

**Q7. Expand $(0.9)^5$**
**Ans:**
$$(1 - 0.1)^5 = 1^5 - 5(1^4)(0.1) + 10(1^3)(0.1)^2 - 10(1^2)(0.1)^3 + 5(1)(0.1)^4 - (0.1)^5$$
$$= 1 - 0.5 + 0.1 - 0.01 + 0.0005 - 0.00001 = 0.59049$$
