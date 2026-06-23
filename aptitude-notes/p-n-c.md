Here is the structured markdown document extracted from your handwritten notes. I have transcribed the questions, mathematical steps, and answers, applying standard LaTeX formatting for all formulas and equations.

# Permutation & Combination - Math Notes

**Date:** 4/04/2026, Saturday **Day:** 5 **Topic:** Permutation & Combination 

### **Notes & Formulas:**

* 
**Permutations:** $^nP_r = \frac{n!}{(n-r)!}$ 


* 
**Combinations:** $^nC_r = \frac{n!}{r!(n-r)!}$ 


* **Shortcuts:**
* 
$^nP_0 = 1$, $^nP_1 = n$, $^nP_n = n!$ 


* 
$^nC_0 = 1$, $^nC_1 = n$, $^nC_n = 1$ 


* 
$^nC_r = ^nC_{n-r}$ 





---

### **Questions:**

**1. Find $n$ if:**


$$\frac{n}{8!} = \frac{3}{6!} + \frac{1}{4!}$$


**Ans:**


$$n = 8! [cite_start]\cdot \left(\frac{3}{6!} + \frac{1}{4!}\right)$$



$$n = \frac{8 \times 7 \times 8 \times 3}{8!} + \frac{8 \times 7 \times 6 \times 5 \times 4 \times 3 \times 2 \times 1}{24}$$

 *(Reconstructed for clarity based on numerical steps)*


$$n = 168 + 1680 = 1848$$



**2. Find $n$ if:**


$$\frac{(n+1)!}{(n-1)!} = 42$$


**Ans:**


$$\frac{(n+1)(n)(n-1)!}{(n-1)!} = 42$$



$$(n)(n+1) = 42$$



$$n^2 + n - 42 = 0$$



$$n^2 + 7n - 6n - 42 = 0$$



$$n(n+7) - 6(n+7) = 0$$



$$(n-6)(n+7) = 0$$



$$n = 6$$



**3. Find $n$ if:**


$$\frac{(17-n)!}{(14-n)!} = 5!$$


**Ans:**


$$\frac{(17-n)(16-n)(15-n)(14-n)!}{(14-n)!} = 120$$



$$(17-n)(16-n)(15-n) = 120$$


If we let $n = 11$:


$$(17-11)(16-11)(15-11) \Rightarrow (6)(5)(4) = 120$$

Therefore, $n = 11$. 

**4. Find $n$ if:**


$$\frac{(2n)!}{7!(2n-7)!} \times \frac{4!(n-4)!}{n!} = 24$$


**Ans:**


$$\frac{(2n)(2n-1)(2n-2)(2n-3)(2n-4)(2n-5)(2n-6)}{n(n-1)(n-2)(n-3)} = \frac{24 \times 7!}{4!}$$



$$n = 8$$



**5. Find $n$ if:**


$$^{12}P_{n-2} = ^{11}P_{n-1}$$


**Ans:**


$$\frac{12!}{(12-(n-2))!} = \frac{11!}{(11-(n-1))!}$$



$$\frac{12!}{(14-n)!} = \frac{11!}{(12-n)!}$$



---

**Date:** 7/04/2026, Tuesday **Day:** 6 

**1. Find $n$:**


$$^6P_2 = n \cdot ^6C_2$$


**Ans:**


$$30 = n \cdot 15 \Rightarrow n = 2$$



**2. Find $n$:**


$$^{14}C_{2n} : ^{10}C_{2n-4} = 143 : 10$$


**Ans:**


$$\frac{14!}{2n!(14-2n)!} \times \frac{(2n-4)!(14-2n)!}{10!} = \frac{143}{10}$$


Simplified down to:


$$(2n)(2n-1)(2n-2)(2n-3) = 1680$$


If $n = 4$:


$$(8)(7)(6)(5) = 1680$$



**3. Find $n, r$:**


$$^nP_r = 720, \quad ^nC_{n-r} = 120$$


**Ans:**
Since $^nC_{n-r} = ^nC_r = 120$:


$$\frac{^nP_r}{r!} = 120 \Rightarrow \frac{720}{r!} = 120$$



$$r! [cite_start]= 6 \Rightarrow r = 3$$


Substituting $r = 3$:


$$\frac{n!}{(n-3)!} = 720$$



$$(n)(n-1)(n-2) = 720$$

If $n = 10$, $(10)(9)(8) = 720$. 

**4. Find $n$:**


$$^{23}C_{3n} = ^{23}C_{2n+3}$$


**Ans:**


$$3n = 2n + 3$$



$$n = 3$$



**5. Find $n$:**


$$^{21}C_{6n} = ^{21}C_{n^2+5}$$


**Ans:**


$$6n = n^2 + 5$$



$$n^2 - 6n + 5 = 0$$



$$(n-1)(n-5) = 0$$



$$n = 1 \text{ or } 5$$



---

**Date:** 15/04/2026, Wednesday 

1. How many 3 digit numbers can be formed using the digits 2, 3, 4, 5, 6 if digits: *(a) Can be repeated.* *(b) Cannot be repeated.* 
**Ans:**
(a) $5 \times 5 \times 5 = 125$ 
(b) $5 \times 4 \times 3 = 60$ 

2. How many 3 digits numbers can be formed from 0, 1, 3, 5, 6 if digits repetition: *(a) Is allowed.* *(b) Is not allowed.* 
**Ans:**
(a) $4 \times 5 \times 5 = 100$ 
(b) $4 \times 4 \times 3 = 48$ 

3. A "Lock" contains 3 rings and each ring contains 5 different letters. Determine the max no. of false trials that can be made before the lock is opened. 
**Ans:**
Total combinations = $5 \times 5 \times 5 = 125$ False trials = $125 - 1 = 124$ 

4. How many numbers between a hundred and one thousand will have 4 in units place: *(a) Repeated.* *(b) Not repeated.* 
**Ans:**
(a) $9 \times 10 \times 1 = 90$ 
(b) $8 \times 8 \times 1 = 64$ 

5. If numbers are formed using digits 2, 3, 4, 5, 6 without repetition, how many of them will exceed 400? 
**Ans:**

* 5 digit numbers: $5 \times 4 \times 3 \times 2 \times 1 = 120$ 


* 4 digit numbers: $5 \times 4 \times 3 \times 2 = 120$ 


* 3 digit numbers (>400): $3 \times 4 \times 3 = 36$ 


* Total = $120 + 120 + 36 = 276$ 



6. How many numbers between 100 and 1000 will have 7 exactly once if repetition of digits: *(a) Allowed.* *(b) Not allowed.* 
**Ans:**
(a) Repetition Allowed:

* 
$\_ \ 7 \ \_$ = $8 \times 1 \times 9 = 72$ 


* 
$\_ \ \_ \ 7$ = $8 \times 9 \times 1 = 72$ 


* 
$7 \ \_ \ \_$ = $1 \times 9 \times 9 = 81$ 


* Total = 225 



(b) Repetition Not Allowed:

* 
$\_ \ 7 \ \_$ = $8 \times 1 \times 8 = 64$ 


* 
$\_ \ \_ \ 7$ = $8 \times 8 \times 1 = 64$ 


* 
$7 \ \_ \ \_$ = $1 \times 9 \times 8 = 72$ 


* Total = 200 



7. How many 5 digits numbers formed using the digits 0, 1, 2, 3, 4, 5 which are divisible by 5 if digits are not repeated. 
**Ans:**

* Ending in 5: $4 \times 4 \times 3 \times 2 = 96$ 


* Ending in 0: $5 \times 4 \times 3 \times 2 = 120$ 


* Total = 216 



8. Find the no. of ways so that letters of the word 'HISTORY' can be arranged such that 'Y' and 'T' are always together. 
**Ans:**
Treating 'YT' as one unit: $6! \times 2! [cite_start]= 1440$ 

**Word arrangements with repeating letters:**

* VIRAT = $5!$ 


* JEFF = $\frac{4!}{2!} = 12$ 


* TAMIM = $\frac{5!}{2!} = 60$ 



---

**Date:** 21/04/2026, Tuesday **Day:** 7 

1. Find no. of four letter words from the word "MADHURI". If letters: *(a) Can repeat.* *(b) Cannot repeat.* 
**Ans:**
(a) $7^4 = 7 \times 7 \times 7 \times 7 = 2401$ 
(b) $7 \times 6 \times 5 \times 4 = 840$ 

2. Determine the no. of arrangements of letters of the word "ALGORITHM", if: *(a) Vowels are always together.* *(b) No 2 vowels are together.* *(c) Consonants are at even position.* *(d) "O" is first and "T" is last.* 
**Ans:**
(a) $7! \times 3! [cite_start]= 840 \times 36 = 30240$ 
(b) $^7P_3 \times 6! = 7 \times 6 \times 5 \times 6! [cite_start]= 210 \times 720 = 151200$ 
(c) Vowels get 5 places to sit. Consonants = $^6P_4 = \frac{6!}{2!} = 360$. $360 \times 5! [cite_start]= 360 \times 120 = 43200$ 
(d) $7! [cite_start]= 5040$ 

3. A group contains 9 men & 6 women. A team of 6 is to be selected. How many of possible selections will have atleast 3 women. **Ans:** $(w \ge 3)$ 

* 
$^6C_3 \times ^9C_3 = \frac{6!}{3!3!} \times \frac{9!}{6!3!} = 1680$ 


* 
$^6C_4 \times ^9C_2 = \frac{6!}{4!2!} \times \frac{9!}{7!2!} = 540$ 


* 
$^6C_5 \times ^9C_1 = \frac{6!}{5!1!} \times \frac{9!}{8!1!} = 54$ 


* 
$^6C_6 \times ^9C_0 = 1$ 


* Total = $1680 + 540 + 54 + 1 = 2275$ 



4. Find the no. of arrangements of the letters in the word SOLAPUR, so that consonants & vowels are placed alternately. 
**Ans:**
Structure: $C - V - C - V - C - V - C$ 

$$4! \times 3! [cite_start]= 24 \times 6 = 144$$