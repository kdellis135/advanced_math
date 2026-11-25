---
description: "Recurrences for divide-and-conquer algorithms: analyzing merge sort, the master theorem with proof, and solving linear recurrences like Fibonacci."
---

# Recurrences and divide and conquer

<div class="lesson-meta" markdown>
**Phase 9 · Lesson 2** · ⏱ ~3 hours · Needs: [Asymptotics and Big-O](asymptotics.md), induction from [Logic and proofs](../foundations/logic-and-proofs.md)
</div>

Recursive algorithms solve a problem by solving smaller copies of it.

Their running time is naturally described by a **recurrence**: an equation for $T(n)$ in terms of $T$ on smaller inputs.

This lesson covers:

1. solving recurrences with recursion trees;
2. proving the solutions by induction;
3. the master theorem;
4. how linear recurrences connect back to eigenvalues.

## 1. Merge sort

To sort $n$ items:

1. sort each half recursively;
2. merge the two sorted halves in $O(n)$ time.

!!! example "Example: one merge, step by step"
    Merge the sorted halves `[2, 5, 8]` and `[3, 4, 9]`. Keep a finger on the front of each and repeatedly take the smaller:

    | Step | Compare | Take | Output so far |
    |---|---|---|---|
    | 1 | 2 vs 3 | 2 | `2` |
    | 2 | 5 vs 3 | 3 | `2 3` |
    | 3 | 5 vs 4 | 4 | `2 3 4` |
    | 4 | 5 vs 9 | 5 | `2 3 4 5` |
    | 5 | 8 vs 9 | 8 | `2 3 4 5 8` |
    | 6 | left is empty | 9 | `2 3 4 5 8 9` |

    Each comparison outputs one item, so merging $n$ items takes at most $n - 1$ comparisons: $O(n)$.

So

$$
T(n) = 2T(n/2) + cn, \qquad T(1) = c.
$$

### Solving it with a recursion tree

Draw the calls as a tree:

| Level | Calls | Work per call | Total |
|---|---|---|---|
| 0 (root) | 1 | $cn$ | $cn$ |
| 1 | 2 | $c\frac n2$ | $cn$ |
| 2 | 4 | $c\frac n4$ | $cn$ |
| … | … | … | $cn$ |

**Every level does $cn$ work**, and there are $\log_2n + 1$ levels (halving until size 1).

So $T(n) = cn(\log_2n + 1) = \Theta(n\log n)$.

!!! example "Example: the tree for $n = 8$"
    ```text
    level 0:            [8]                 work 8
    level 1:       [4]        [4]           work 4 + 4 = 8
    level 2:    [2]  [2]   [2]  [2]         work 2 + 2 + 2 + 2 = 8
    level 3:   [1][1][1][1][1][1][1][1]     work 8 × 1 = 8
    ```
    With $c = 1$: 4 levels of 8 work each, $T(8) = 32$. The formula gives $8(\log_2 8 + 1) = 8 \times 4 = 32$. ✓

    The levels are equal because the two effects cancel: each level has **twice as many** pieces, each **half as big**.

### Proving it by induction (the substitution method)

!!! theorem "Claim"
    For $n$ a power of 2, $T(n) = cn\log_2n + cn$.

!!! proof "Proof"
    *Base:* $T(1) = c = c\cdot1\cdot0 + c$. ✓

    *Step:* assume it holds for $n/2$. Then

    $$
    T(n) = 2\left(c\tfrac n2\log_2\tfrac n2 + c\tfrac n2\right) + cn = cn(\log_2n - 1) + cn + cn = cn\log_2n + cn. \checkmark
    $$

    The algebra in the middle, one move at a time:

    1. Distribute the 2: $\ 2 \cdot c\frac n2\log_2\frac n2 = cn\log_2\frac n2$ and $2 \cdot c\frac n2 = cn$.
    2. Use $\log_2\frac n2 = \log_2 n - \log_2 2 = \log_2 n - 1$.
    3. So $cn\log_2\frac n2 = cn\log_2 n - cn$.
    4. Add everything: $\ (cn\log_2 n - cn) + cn + cn = cn\log_2 n + cn$.

For $n$ not a power of 2, $T(n)$ is sandwiched between the values at the neighboring powers of 2, so the $\Theta$ bound still holds.

## 2. The master theorem

Divide-and-conquer recurrences usually look like

$$
T(n) = a\,T(n/b) + f(n):
$$

- $a$ subproblems, each of size $n/b$;
- plus $f(n)$ work to split and combine.

In the recursion tree:

- level $j$ has $a^j$ nodes of size $n/b^j$;
- the number of leaves is $a^{\log_bn} = n^{\log_ba}$.

Everything depends on comparing $f(n)$ with $n^{\log_ba}$, the **critical exponent**:

!!! theorem "Master theorem (simplified, for $f(n) = \Theta(n^d)$)"
    $$
    T(n) = \begin{cases}\Theta(n^d) & \text{if } d > \log_ba\quad\text{(root dominates)}\\ \Theta(n^d\log n) & \text{if } d = \log_ba\quad\text{(all levels equal)}\\ \Theta(n^{\log_ba}) & \text{if } d < \log_ba\quad\text{(leaves dominate)}\end{cases}
    $$

!!! proof "Proof"
    Level $j$ does $a^j\cdot c\left(\frac{n}{b^j}\right)^d = cn^d\left(\frac{a}{b^d}\right)^j$ work.

    So the total is a **geometric series** with ratio $r = a/b^d$ over $\log_bn$ levels:

    - $r < 1$ (i.e. $d > \log_ba$): dominated by the first term, $\Theta(n^d)$.
    - $r = 1$: all $\log_bn + 1$ levels are equal, $\Theta(n^d\log n)$.
    - $r > 1$: dominated by the last level, $cn^dr^{\log_bn} = cn^d\cdot\frac{a^{\log_bn}}{n^d} = c\,n^{\log_ba}$.

    (Using $b^{d\log_bn} = n^d$.)

    So the master theorem is just the [geometric sum rule](asymptotics.md#3-sums-the-most-common-analysis) applied to the recursion tree.

!!! example "Example: the three cases, level by level"
    Work at each level of the tree (with $c = 1$):

    | Recurrence | $r = a/b^d$ | Level 0 | Level 1 | Level 2 | Which level wins | Total |
    |---|---|---|---|---|---|---|
    | $2T(n/2) + n^2$ | $\frac24 = \frac12$ | $n^2$ | $\frac{n^2}{2}$ | $\frac{n^2}{4}$ | the root | $\Theta(n^2)$ |
    | $2T(n/2) + n$ | $\frac22 = 1$ | $n$ | $n$ | $n$ | all tie | $\Theta(n\log n)$ |
    | $4T(n/2) + n$ | $\frac42 = 2$ | $n$ | $2n$ | $4n$ | the leaves | $\Theta(n^2)$ |

    - **Row 1:** the work shrinks by half at each level, so the root's $n^2$ is more than half the total.
    - **Row 3:** the work doubles at each level. The bottom level has $4^{\log_2 n} = n^2$ leaves, and they swamp everything above.

**The recipe:**

1. Read off $a$ (number of subproblems), $b$ (shrink factor) and $d$ (the combine step is $\Theta(n^d)$).
2. Compute the critical exponent $\log_b a$.
3. Compare: $d$ bigger means the root wins, equal means a $\log n$ factor, smaller means the leaves win.

!!! warning "When the master theorem doesn't apply"
    | Recurrence | Problem | What to do |
    |---|---|---|
    | $T(n) = T(n - 1) + n$ | subtracts instead of dividing | unroll it (exercise 3) |
    | $T(n) = T(n/3) + T(2n/3) + n$ | unequal pieces | recursion tree: each level is still $\leq n$, and there are $O(\log n)$ levels, so $\Theta(n\log n)$ |
    | $T(n) = 2T(n/2) + n\log n$ | $f$ isn't a plain power $n^d$ | recursion tree: level $j$ does about $n\log\frac{n}{2^j}$ work, and the total is $\Theta(n\log^2 n)$ |

| Algorithm | Recurrence | $\log_ba$ vs $d$ | Result |
|---|---|---|---|
| Binary search | $T(n/2) + O(1)$ | $0 = 0$ | $\Theta(\log n)$ |
| Merge sort | $2T(n/2) + O(n)$ | $1 = 1$ | $\Theta(n\log n)$ |
| Karatsuba multiplication | $3T(n/2) + O(n)$ | $1.585 > 1$ | $\Theta(n^{1.585})$ |
| Strassen matrix multiply | $7T(n/2) + O(n^2)$ | $2.807 > 2$ | $\Theta(n^{2.807})$ |
| Naive recursive matrix multiply | $8T(n/2) + O(n^2)$ | $3 > 2$ | $\Theta(n^3)$ |

!!! intuition "Karatsuba's insight"
    Multiplying two $n$-digit numbers by splitting each into halves naively needs 4 half-size products: $T = 4T(n/2) + O(n) = \Theta(n^2)$. That's no better than school multiplication.

    Karatsuba found an algebraic trick that needs only **3** products:

    $$
    (a + b)(c + d) - ac - bd = ad + bc.
    $$

    Going from 4 to 3 subproblems changes the exponent from 2 to $\log_23\approx1.585$.

    **Try it on $12 \times 34$.** Split $12$ into $a = 1$, $b = 2$ and $34$ into $c = 3$, $d = 4$, so the product is $ac \cdot 100 + (ad + bc)\cdot 10 + bd$.

    1. $ac = 3$
    2. $bd = 8$
    3. $(a + b)(c + d) = 3 \times 7 = 21$, so $ad + bc = 21 - 3 - 8 = 10$
    4. Total: $3 \times 100 + 10 \times 10 + 8 = 408$. ✓

    Three multiplications instead of four. The extra additions are cheap, $O(n)$, and the saving compounds at every level of the recursion.

    **Reducing the number of subproblems matters more than speeding up the combining step.**

## 3. Linear recurrences

Recurrences like Fibonacci, $F_n = F_{n-1} + F_{n-2}$, describe counting problems, and also the cost of naive recursion.

1. Try $F_n = r^n$. Dividing by $r^{n-2}$ gives the **characteristic equation** $r^2 = r + 1$.
2. Its roots are $\varphi = \frac{1 + \sqrt5}2$ and $\psi = \frac{1-\sqrt5}{2}$.
3. By linearity, every solution is $F_n = A\varphi^n + B\psi^n$, with $A, B$ fixed by the initial values.

That's the eigenvalue derivation from [Eigenvalues and eigenvectors](../linear-algebra/eigen.md#4-powers-and-dynamics), seen from a different angle.

!!! example "Example: finding $A$ and $B$ for Fibonacci"
    With $F_0 = 0$ and $F_1 = 1$:

    1. $n = 0$: $\ A + B = 0$, so $B = -A$.
    2. $n = 1$: $\ A\varphi + B\psi = A(\varphi - \psi) = 1$.
    3. $\varphi - \psi = \sqrt5$, so $A = \frac{1}{\sqrt5}$ and $B = -\frac{1}{\sqrt5}$.

    This gives **Binet's formula**:

    $$
    F_n = \frac{\varphi^n - \psi^n}{\sqrt5}.
    $$

    Since $\lvert\psi\rvert\approx0.618 < 1$, the $\psi^n$ term shrinks to nothing, and $F_n$ is just $\frac{\varphi^n}{\sqrt5}$ rounded:

    | $n$ | $F_n$ | $\varphi^n/\sqrt5$ |
    |---|---|---|
    | 5 | 5 | $4.960$ |
    | 10 | 55 | $55.004$ |
    | 20 | 6765 | $6765.00003$ |

    A formula full of irrational numbers that always produces integers: the $\sqrt5$'s cancel exactly.

!!! theorem "General rule"
    For $a_n = c_1a_{n-1} + \cdots + c_ka_{n-k}$ with distinct characteristic roots $r_1, \ldots, r_k$ of $r^k = c_1r^{k-1} + \cdots + c_k$, the general solution is

    $$
    a_n = \sum_iA_ir_i^n.
    $$

    (A root of multiplicity $m$ contributes $r^n, nr^n, \ldots, n^{m-1}r^n$.)

!!! example "Example: a repeated root"
    $a_n = 4a_{n-1} - 4a_{n-2}$, with $a_0 = 1$, $a_1 = 4$.

    1. Characteristic equation: $r^2 - 4r + 4 = (r - 2)^2 = 0$. The root $r = 2$ appears twice.
    2. So $a_n = (A + Bn)\,2^n$.
    3. $n = 0$: $A = 1$. $\ n = 1$: $(1 + B)\cdot 2 = 4$, so $B = 1$.
    4. $a_n = (n + 1)\,2^n$.

    Check: $a_2 = 4(4) - 4(1) = 12$, and the formula gives $3 \cdot 4 = 12$. ✓

!!! example "Naive recursive Fibonacci is exponential"
    `fib(n) = fib(n-1) + fib(n-2)` makes $C(n) = C(n-1) + C(n-2) + 1$ calls, which grows like $\varphi^n\approx1.618^n$.

    The waste is easy to see in the call tree for `fib(5)`:

    ```text
                        fib(5)
                 /                  \
            fib(4)                  fib(3)
           /      \                /      \
       fib(3)    fib(2)        fib(2)    fib(1)
       /    \     /   \        /   \
    fib(2) fib(1) f(1) f(0)  f(1) f(0)
    /   \
    f(1) f(0)
    ```

    `fib(3)` is computed twice and `fib(2)` three times: 15 calls to produce 5 different values. The repetition compounds:

    | $n$ | 5 | 10 | 20 | 30 | 50 |
    |---|---|---|---|---|---|
    | calls | 15 | 177 | 21,891 | 2.7 million | 41 billion |

    Storing each value the first time it's computed (memoization) cuts this to one call per value.

    | Method | Cost of `fib(n)` |
    |---|---|
    | naive recursion | $\sim1.618^n$ calls (`fib(50)`: about $10^{10}$) |
    | memoization / **dynamic programming** (store each computed value) | $O(n)$ |
    | repeated squaring of $\begin{pmatrix}1&1\\1&0\end{pmatrix}$ | $O(\log n)$ multiplications |

!!! ml "Where this shows up"
    - **Divide and conquer** underlies:
        - the FFT ($T = 2T(n/2) + O(n)$, so $O(n\log n)$; see [Fourier](../further/fourier.md));
        - tree-based indexes;
        - parallel reductions on GPUs.
    - **Dynamic programming** (the cure for exponential recursion) powers sequence alignment, the Viterbi algorithm for HMMs, CTC loss in speech recognition, and value iteration in reinforcement learning.
    - **Recurrences in RNNs and state-space models:** $\vv h_t = A\vv h_{t-1} + B\vv x_t$ is a linear recurrence.
        - Its behavior is governed by the eigenvalues of $A$, exactly as in the analysis above.

## Check yourself

**1.** Solve $T(n) = 4T(n/2) + n$.

??? success "Solution"
    - $a = 4$, $b = 2$, $d = 1$.
    - $\log_24 = 2 > d$: leaves dominate.
    - $T(n) = \Theta(n^2)$.

**2.** Solve $T(n) = 2T(n/2) + n^2$.

??? success "Solution"
    - $\log_22 = 1 < d = 2$: the root dominates.
    - $T(n) = \Theta(n^2)$.

**3.** Solve $T(n) = T(n - 1) + n$ with $T(0) = 0$. (The master theorem doesn't apply.)

??? success "Solution"
    Unroll: $T(n) = n + (n - 1) + \cdots + 1 = \frac{n(n+1)}{2} = \Theta(n^2)$.

    That's the cost of quicksort with consistently terrible pivots.

**4.** Solve $a_n = 5a_{n-1} - 6a_{n-2}$ with $a_0 = 0$, $a_1 = 1$.

??? success "Solution"
    1. $r^2 - 5r + 6 = 0$ gives $r = 2, 3$.
    2. So $a_n = A2^n + B3^n$.
    3. Initial values: $A + B = 0$ and $2A + 3B = 1$, so $B = 1$, $A = -1$.

    $a_n = 3^n - 2^n$.

**5.** Prove by induction that binary search's $T(n) = T(\lfloor n/2\rfloor) + 1$, $T(1) = 1$, satisfies $T(n)\leq\log_2n + 1$.

??? success "Solution"
    *Base:* $T(1) = 1 = \log_21 + 1$. ✓

    *Step (strong induction):*

    $$
    T(n) = T(\lfloor n/2\rfloor) + 1\leq\log_2\lfloor n/2\rfloor + 2\leq\log_2(n/2) + 2 = \log_2n + 1.
    $$

**6.** An algorithm splits a problem of size $n$ into 2 subproblems of size $n/4$ and does $O(\sqrt n)$ extra work. What's its running time?

??? success "Solution"
    - $a = 2$, $b = 4$, $d = \frac12$.
    - $\log_42 = \frac12 = d$: the equal case.
    - $T(n) = \Theta(\sqrt n\log n)$.
