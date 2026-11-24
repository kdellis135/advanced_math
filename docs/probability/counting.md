# Counting

<div class="lesson-meta" markdown>
**Phase 5 · Lesson 1** · ⏱ ~2.5 hours · Needs: [Logic and proofs](../foundations/logic-and-proofs.md) (induction), [Sets](../foundations/sets-functions.md)
</div>

When all outcomes are equally likely, probability is counting: $P(A) = \frac{|A|}{|\Omega|}$.

Counting large sets without listing them is a skill built from:

- two rules: multiply for sequential choices, add for exclusive cases;
- one key formula: $\binom nk$.

## 1. The two basic rules

!!! theorem "Addition and multiplication principles"
    - **Addition:** if a task can be done in one of two *disjoint* ways, with $m$ and $n$ options respectively, there are $m + n$ options in total.
    - **Multiplication:** if a task is a *sequence* of steps, with $m$ options for the first and $n$ for the second (no matter what was chosen first), there are $m\cdot n$ options in total.

!!! example "Example: seeing both rules with a list"
    **Multiplication.** 3 shirts (red, blue, green) and 2 pants (jeans, khakis). An outfit is a shirt *and then* pants:

    | | jeans | khakis |
    |---|---|---|
    | red | red + jeans | red + khakis |
    | blue | blue + jeans | blue + khakis |
    | green | green + jeans | green + khakis |

    The table has $3 \times 2 = 6$ cells. Each row is one choice of shirt, and each offers the same 2 choices of pants.

    **Addition.** Lunch is *either* one of 4 sandwiches *or* one of 3 soups (not both): $4 + 3 = 7$ options.

    **Both.** A license plate is 2 letters then 3 digits: $26 \cdot 26 \cdot 10 \cdot 10 \cdot 10 = 676{,}000$.

    **Key words:** "and then" → multiply; "or" (with no overlap) → add.

Examples:

| What | Count |
|---|---|
| passwords of 8 characters from 62 symbols | $62^8 \approx 2.2\times10^{14}$ |
| binary strings of length $n$ | $2^n$ |
| subsets of an $n$-element set (in or out, for each element) | $2^n$ |

## 2. Permutations

!!! definition "Definition: permutations"
    The number of ways to **arrange** $n$ distinct objects in a row is $n! = n(n-1)\cdots2\cdot1$ (with $0! = 1$).

    The number of ways to arrange $k$ of them, chosen from $n$, in order, is

    $$
    n(n-1)\cdots(n-k+1) = \frac{n!}{(n-k)!}.
    $$

(Multiplication principle: $n$ choices for the first slot, $n - 1$ for the second, and so on.)

!!! example "Example: arrangements, listed and counted"
    The letters A, B, C can be arranged in $3! = 6$ ways:

    $$
    \text{ABC},\ \text{ACB},\ \text{BAC},\ \text{BCA},\ \text{CAB},\ \text{CBA}.
    $$

    3 choices for the first letter, then 2 for the second, then 1 for the last: $3 \cdot 2 \cdot 1$.

    **Ordered selection.** Gold, silver and bronze among 8 runners: $8 \cdot 7 \cdot 6 = 336 = \frac{8!}{5!}$. The fraction just cancels the part of $8!$ we don't use: $\frac{8 \cdot 7 \cdot 6 \cdot 5 \cdot 4 \cdot 3 \cdot 2 \cdot 1}{5 \cdot 4 \cdot 3 \cdot 2 \cdot 1}$.

Why $0! = 1$? There is exactly one way to arrange zero objects: do nothing. It's also what makes $\frac{n!}{(n - k)!}$ correct when $k = n$: $\ \frac{n!}{0!} = n!$.

$n!$ grows ferociously: $10! = 3.6$ million, and $20! \approx 2.4\times10^{18}$.

**Stirling's approximation**

$$
n! \approx \sqrt{2\pi n}\,(n/e)^n
$$

is accurate to within 1% already at $n = 10$. It gives $\log n! \approx n\log n - n$, used constantly in information theory.

## 3. Combinations and binomial coefficients

!!! definition "Definition: binomial coefficient"
    The number of ways to **choose** $k$ objects from $n$, when order doesn't matter, is

    $$
    \binom nk = \frac{n!}{k!\,(n-k)!} \qquad\text{("n choose k")}.
    $$

!!! proof "Why the formula"
    Count ordered selections of $k$ from $n$ in two ways:

    1. **Directly:** $\frac{n!}{(n-k)!}$.
    2. **In two stages:** first choose the set ($\binom nk$ ways), then order it ($k!$ ways).

    So $\binom nk k! = \frac{n!}{(n-k)!}$.

    This "count the same thing two ways" technique is the most powerful idea in combinatorics.

!!! example "Example: choosing 2 from {A, B, C, D}"
    **Ordered** pairs (first pick, second pick): $4 \cdot 3 = 12$.

    $$
    \text{AB, BA, AC, CA, AD, DA, BC, CB, BD, DB, CD, DC}.
    $$

    **Unordered** (just the team): each team appears twice above, as AB and BA. So there are $\frac{12}{2!} = 6$:

    $$
    \{A,B\},\ \{A,C\},\ \{A,D\},\ \{B,C\},\ \{B,D\},\ \{C,D\}.
    $$

    The formula agrees: $\binom42 = \frac{4!}{2!\,2!} = \frac{24}{4} = 6$.

**Computing by hand:** cancel before multiplying. $\binom{10}{3} = \frac{10 \cdot 9 \cdot 8}{3 \cdot 2 \cdot 1} = \frac{720}{6} = 120$. (Top: $k$ factors counting down from $n$. Bottom: $k!$.)

### Which formula? A decision guide

Ask two questions: **does order matter?** and **can items repeat?**

| | order matters | order doesn't matter |
|---|---|---|
| **no repetition** | $\frac{n!}{(n-k)!}$ (podium finishes) | $\binom nk$ (committees, poker hands) |
| **repetition allowed** | $n^k$ (PIN codes, passwords) | $\binom{n + k - 1}{k}$ (scoops of ice cream, stars and bars below) |

For example, with $n = 3$ flavors and $k = 2$ scoops: ordered without repeats gives 6, unordered without repeats 3, ordered with repeats 9, and unordered with repeats 6 (AA, BB, CC, AB, AC, BC).

Properties, each with a counting proof:

| Property | Statement | Counting proof |
|---|---|---|
| **Symmetry** | $\binom nk = \binom n{n-k}$ | choosing who's in is the same as choosing who's out |
| **Pascal's rule** | $\binom nk = \binom{n-1}{k-1} + \binom{n-1}{k}$ | fix one special object: a $k$-subset either contains it ($\binom{n-1}{k-1}$) or doesn't ($\binom{n-1}{k}$) |
| **Row sums** | $\sum_{k=0}^n\binom nk = 2^n$ | both sides count all subsets |

**Pascal's triangle** lays out the binomial coefficients, row $n$ holding $\binom n0, \binom n1, \dots, \binom nn$. Pascal's rule says each entry is the sum of the two above it:

$$
\begin{array}{c}
1\\
1 \quad 1\\
1 \quad 2 \quad 1\\
1 \quad 3 \quad 3 \quad 1\\
1 \quad 4 \quad 6 \quad 4 \quad 1\\
1 \quad 5 \quad 10 \quad 10 \quad 5 \quad 1
\end{array}
$$

Read off $\binom42 = 6$ (row 4, position 2, counting from 0). Each row is symmetric, and row 4 sums to $16 = 2^4$.

!!! theorem "Binomial theorem"
    $$
    (x + y)^n = \sum_{k=0}^n\binom nk x^ky^{n-k}.
    $$

!!! proof "Proof"
    Expand $(x + y)(x + y)\cdots(x + y)$.

    - Each term of the result comes from choosing $x$ or $y$ from each of the $n$ factors.
    - The term $x^ky^{n-k}$ arises once for each way to choose which $k$ factors contribute $x$: $\binom nk$ ways.

    For $n = 3$, the 8 choices (one letter from each factor) are $xxx, xxy, xyx, yxx, xyy, yxy, yyx, yyy$. Group by how many $x$'s:

    $$
    (x + y)^3 = x^3 + 3x^2y + 3xy^2 + y^3.
    $$

    The coefficients $1, 3, 3, 1$ are row 3 of Pascal's triangle. For example, $x^2y$ appears 3 times because there are $\binom32 = 3$ ways to choose which two factors give the $x$.

## 4. Multinomials and "stars and bars"

**Repeated letters.** Start small. The letters A, A, B have only 3 distinct arrangements: AAB, ABA, BAA. If the A's were different (A₁, A₂), there would be $3! = 6$. Each real arrangement appears $2! = 2$ times among those 6 (swap A₁ and A₂), so there are $\frac{3!}{2!} = 3$.

Arrangements of MISSISSIPPI (11 letters: one M, four I's, four S's, two P's):

$$
\frac{11!}{1!\,4!\,4!\,2!} = 34{,}650.
$$

Divide out the rearrangements of identical letters. In general, the **multinomial coefficient**

$$
\binom{n}{k_1, \ldots, k_m} = \frac{n!}{k_1!\cdots k_m!}
$$

counts ways to split $n$ objects into labeled groups of sizes $k_1, \ldots, k_m$.

**Stars and bars.** The number of ways to put $n$ identical balls into $k$ boxes is $\binom{n + k - 1}{k - 1}$.

Arrange $n$ stars and $k - 1$ bars in a row: the bars split the stars into $k$ groups.

!!! example "Example: 4 identical balls into 3 boxes"
    Each arrangement of 4 stars and 2 bars is one distribution:

    | Row of symbols | Box 1 | Box 2 | Box 3 |
    |---|---|---|---|
    | ★★│★│★ | 2 | 1 | 1 |
    | ★★★★││ | 4 | 0 | 0 |
    | │★★│★★ | 0 | 2 | 2 |
    | ★│││ (not allowed: 3 bars) | | | |

    There are 6 symbols in a row, and we choose which 2 of the 6 positions hold bars: $\binom{6}{2} = 15$ distributions. That's $\binom{n + k - 1}{k - 1}$ with $n = 4$, $k = 3$.

    Empty boxes are allowed (two bars next to each other). If every box must get at least one ball, first put one ball in each box, then distribute the remaining $n - k$ freely.

## 5. Inclusion–exclusion

!!! theorem "Inclusion–exclusion"
    $$
    |A\cup B| = |A| + |B| - |A\cap B|,
    $$

    $$
    |A\cup B\cup C| = |A| + |B| + |C| - |A\cap B| - |A\cap C| - |B\cap C| + |A\cap B\cap C|.
    $$

!!! proof "Proof (two sets)"
    $|A| + |B|$ counts every element of $A\cap B$ twice, so subtract it once.

    (For three sets, check that an element in exactly $j$ of the sets is counted $\binom j1 - \binom j2 + \binom j3 = 1$ times.)

    For example, an element in all three sets ($j = 3$) is added 3 times (once per set), subtracted 3 times (once per pair), and added back once: $3 - 3 + 1 = 1$. ✓

!!! example "Example: a class survey"
    In a class of 30, 18 study French, 12 study Spanish, and 5 study both. How many study at least one?

    $$
    18 + 12 - 5 = 25.
    $$

    The 5 who take both were counted in the 18 *and* in the 12, so they were counted twice. Subtracting once fixes it. That leaves $30 - 25 = 5$ students studying neither.

!!! example "Example: derangements"
    In how many orderings of $n$ letters does *no* letter end up in its own envelope?

    With $A_i$ = "letter $i$ is in place", inclusion–exclusion over all $n$ sets gives

    $$
    n!\sum_{k=0}^n\frac{(-1)^k}{k!}.
    $$

    So the probability of no match tends to $e^{-1} \approx 0.368$, independent of $n$!

    Check $n = 3$ by listing. Of the 6 orderings of ABC, only BCA and CAB move every letter. The formula: $3!\left(1 - 1 + \frac12 - \frac16\right) = 6 \cdot \frac13 = 2$. ✓

    (The sum $\sum\frac{(-1)^k}{k!}$ is the start of the series for $e^x$ at $x = -1$, from [Series](../calculus/series-taylor.md). That's where $e^{-1}$ comes from.)

## 6. The birthday problem

How many people are needed for a better-than-even chance that two share a birthday? Count the complement, all distinct:

$$
P(\text{all distinct}) = \frac{365}{365}\cdot\frac{364}{365}\cdots\frac{365 - n + 1}{365} = \prod_{i=0}^{n-1}\left(1 - \frac{i}{365}\right).
$$

Using $1 - x \approx e^{-x}$:

$$
P(\text{all distinct}) \approx \exp\left(-\sum_{i<n}\frac{i}{365}\right) = \exp\left(-\frac{n(n-1)}{730}\right).
$$

(The steps: the probability is a product of terms $1 - \frac{i}{365}$, each $\approx e^{-i/365}$. A product of exponentials is the exponential of the sum, and $\sum_{i=0}^{n-1} i = \frac{n(n-1)}{2}$.)

This drops below $\frac12$ when $n(n-1) > 730\ln2 \approx 506$, i.e. **$n = 23$**.

| People $n$ | $P(\text{some shared birthday})$ |
|---|---|
| 10 | $\approx 12\%$ |
| 23 | $\approx 51\%$ |
| 30 | $\approx 71\%$ |
| 50 | $\approx 97\%$ |
| 70 | $\approx 99.9\%$ |

!!! intuition "Why so few?"
    It's not about matching *your* birthday. There are $\binom{23}{2} = 253$ *pairs*, each with a $1/365$ chance.

    In general, collisions among $N$ equally likely values become likely after about $\sqrt N$ draws.

!!! ml "Where this shows up"
    - **Hash collisions:** with $N$ possible hash values, expect a collision after about $\sqrt N$ items (the "birthday bound").
        - That's why cryptographic hashes need 256 bits for 128 bits of collision security.
    - **Binomial coefficients** appear in the binomial distribution, in combinatorial bounds in learning theory, and in counting the $\binom{n}{k}$ possible sparse supports (a reason sparse recovery is hard in general).
    - **Stirling's formula** gives $\log\binom{n}{k} \approx nH(k/n)$, connecting counting directly to [entropy](../information-theory/entropy.md).

## Check yourself

**1.** How many 5-card poker hands are there? How many are a flush (all one suit)?

??? success "Solution"
    - **All hands:** $\binom{52}{5} = 2{,}598{,}960$.
    - **Flushes:** choose the suit (4), then 5 of its 13 cards: $4\binom{13}5 = 5148$ (including straight flushes).
    - **Probability** of a flush: about 0.2%.

**2.** Prove $\sum_{k=0}^n(-1)^k\binom nk = 0$ for $n\geq1$.

??? success "Solution"
    Binomial theorem with $x = -1$, $y = 1$: $(1 - 1)^n = 0$.

    (Equivalently: a nonempty set has as many even-size as odd-size subsets.)

**3.** How many non-negative integer solutions does $x_1 + x_2 + x_3 = 10$ have?

??? success "Solution"
    Stars and bars: $\binom{12}{2} = 66$.

**4.** How many integers in $1..1000$ are divisible by 3 or 5?

??? success "Solution"
    - Multiples of 3: $333$
    - Multiples of 5: $200$
    - Multiples of both (15), counted twice: $66$

    Total: $333 + 200 - 66 = 467$.

**5.** Prove $k\binom nk = n\binom{n-1}{k-1}$ by a counting argument.

??? success "Solution"
    Count (committee of $k$ people, with a chair) two ways:

    - **Left side:** choose the committee, then the chair from among its $k$ members.
    - **Right side:** choose the chair from all $n$, then the remaining $k - 1$ members from the other $n - 1$.

**6.** A random hash has $2^{32}$ possible values. Roughly how many items until a collision is more likely than not?

??? success "Solution"
    About $\sqrt{2\ln2\cdot2^{32}} \approx 1.18\times2^{16} \approx 77{,}000$.

    Surprisingly few for a 4-billion-value hash.
