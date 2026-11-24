# Recurrences and divide and conquer

<div class="lesson-meta" markdown>
**Phase 9 · Lesson 2** · ⏱ ~3 hours · Needs: [Asymptotics and Big-O](asymptotics.md), induction from [Logic and proofs](../foundations/logic-and-proofs.md)
</div>

Recursive algorithms solve a problem by solving smaller copies of it. Their running time is naturally described by a **recurrence**: an equation for $T(n)$ in terms of $T$ on smaller inputs. This lesson covers how to solve recurrences with recursion trees, how to prove the solutions by induction, how to use the master theorem, and how linear recurrences connect back to eigenvalues.

## 1. Merge sort

To sort $n$ items: sort each half recursively, then merge the two sorted halves in $O(n)$ time. So

$$
T(n) = 2T(n/2) + cn, \qquad T(1) = c.
$$

### Solving it with a recursion tree

Draw the calls as a tree. The root does $cn$ work. Its 2 children each do $c\frac n2$, for $cn$ in total. The 4 grandchildren do $4\cdot c\frac n4 = cn$. **Every level does $cn$ work**, and there are $\log_2n + 1$ levels (halving until size 1). So $T(n) = cn(\log_2n + 1) = \Theta(n\log n)$.

### Proving it by induction (the substitution method)

!!! theorem "Claim"
    For $n$ a power of 2, $T(n) = cn\log_2n + cn$.

!!! proof "Proof"
    Base: $T(1) = c = c\cdot1\cdot0 + c$. ✓ Step: assume it holds for $n/2$. Then
    $T(n) = 2\left(c\tfrac n2\log_2\tfrac n2 + c\tfrac n2\right) + cn = cn(\log_2n - 1) + cn + cn = cn\log_2n + cn$. ✓

(For $n$ not a power of 2, $T(n)$ is sandwiched between the values at the neighboring powers of 2, so the $\Theta$ bound still holds.)

## 2. The master theorem

Divide-and-conquer recurrences usually look like

$$
T(n) = a\,T(n/b) + f(n):
$$

$a$ subproblems, each of size $n/b$, plus $f(n)$ work to split and combine. In the recursion tree, level $j$ has $a^j$ nodes of size $n/b^j$, and the number of leaves is $a^{\log_bn} = n^{\log_ba}$. Everything depends on comparing $f(n)$ with $n^{\log_ba}$, the **critical exponent**:

!!! theorem "Master theorem (simplified, for $f(n) = \Theta(n^d)$)"
    $$
    T(n) = \begin{cases}\Theta(n^d) & \text{if } d > \log_ba\quad\text{(root dominates)}\\ \Theta(n^d\log n) & \text{if } d = \log_ba\quad\text{(all levels equal)}\\ \Theta(n^{\log_ba}) & \text{if } d < \log_ba\quad\text{(leaves dominate)}\end{cases}
    $$

!!! proof "Proof"
    Level $j$ does $a^j\cdot c\left(\frac{n}{b^j}\right)^d = cn^d\left(\frac{a}{b^d}\right)^j$ work. So the total is a **geometric series** with ratio $r = a/b^d$ over $\log_bn$ levels:

    - $r < 1$ (i.e. $d > \log_ba$): dominated by the first term, $\Theta(n^d)$.
    - $r = 1$: all $\log_bn + 1$ levels are equal, $\Theta(n^d\log n)$.
    - $r > 1$: dominated by the last level, $cn^dr^{\log_bn} = cn^d\cdot\frac{a^{\log_bn}}{n^d} = c\,n^{\log_ba}$.

    (Using $b^{d\log_bn} = n^d$.) So the master theorem is just the [geometric sum rule](asymptotics.md#3-sums-the-most-common-analysis) applied to the recursion tree.

| Algorithm | Recurrence | $\log_ba$ vs $d$ | Result |
|---|---|---|---|
| Binary search | $T(n/2) + O(1)$ | $0 = 0$ | $\Theta(\log n)$ |
| Merge sort | $2T(n/2) + O(n)$ | $1 = 1$ | $\Theta(n\log n)$ |
| Karatsuba multiplication | $3T(n/2) + O(n)$ | $1.585 > 1$ | $\Theta(n^{1.585})$ |
| Strassen matrix multiply | $7T(n/2) + O(n^2)$ | $2.807 > 2$ | $\Theta(n^{2.807})$ |
| Naive recursive matrix multiply | $8T(n/2) + O(n^2)$ | $3 > 2$ | $\Theta(n^3)$ |

!!! intuition "Karatsuba's insight"
    Multiplying two $n$-digit numbers by splitting each into halves naively needs 4 half-size products: $T = 4T(n/2) + O(n) = \Theta(n^2)$, no better than school multiplication. Karatsuba found an algebraic trick that needs only **3** products: $(a + b)(c + d) - ac - bd = ad + bc$. Going from 4 to 3 subproblems changes the exponent from 2 to $\log_23\approx1.585$. **Reducing the number of subproblems matters more than speeding up the combining step.**

## 3. Linear recurrences

Recurrences like Fibonacci, $F_n = F_{n-1} + F_{n-2}$, describe counting problems and also the cost of naive recursion. Try $F_n = r^n$: dividing by $r^{n-2}$ gives the **characteristic equation** $r^2 = r + 1$, with roots $\varphi = \frac{1 + \sqrt5}2$ and $\psi = \frac{1-\sqrt5}{2}$. By linearity, every solution is $F_n = A\varphi^n + B\psi^n$, with $A, B$ fixed by the initial values. That's the eigenvalue derivation from [Eigenvalues and eigenvectors](../linear-algebra/eigen.md#4-powers-and-dynamics), seen from a different angle.

!!! theorem "General rule"
    For $a_n = c_1a_{n-1} + \cdots + c_ka_{n-k}$ with distinct characteristic roots $r_1, \ldots, r_k$ of $r^k = c_1r^{k-1} + \cdots + c_k$, the general solution is $a_n = \sum_iA_ir_i^n$. (A root of multiplicity $m$ contributes $r^n, nr^n, \ldots, n^{m-1}r^n$.)

!!! example "Naive recursive Fibonacci is exponential"
    `fib(n) = fib(n-1) + fib(n-2)` makes $C(n) = C(n-1) + C(n-2) + 1$ calls, which grows like $\varphi^n\approx1.618^n$. Computing `fib(50)` this way takes about $10^{10}$ calls. Storing each computed value (memoization, or **dynamic programming**) makes it $O(n)$. Repeated squaring of the matrix $\begin{pmatrix}1&1\\1&0\end{pmatrix}$ makes it $O(\log n)$ multiplications.

!!! ml "Where this shows up"
    - **Divide and conquer** underlies the FFT ($T = 2T(n/2) + O(n)$, so $O(n\log n)$; see [Fourier](../further/fourier.md)), tree-based indexes, and parallel reductions on GPUs.
    - **Dynamic programming** (the cure for exponential recursion) powers sequence alignment, the Viterbi algorithm for HMMs, CTC loss in speech recognition, and value iteration in reinforcement learning.
    - **Recurrences in RNNs and state-space models:** $\vv h_t = A\vv h_{t-1} + B\vv x_t$ is a linear recurrence whose behavior is governed by the eigenvalues of $A$, which is exactly the analysis above.

## Check yourself

**1.** Solve $T(n) = 4T(n/2) + n$.

??? success "Solution"
    $a = 4$, $b = 2$, $\log_24 = 2 > d = 1$: leaves dominate, $\Theta(n^2)$.

**2.** Solve $T(n) = 2T(n/2) + n^2$.

??? success "Solution"
    $\log_22 = 1 < d = 2$: the root dominates, $\Theta(n^2)$.

**3.** Solve $T(n) = T(n - 1) + n$ with $T(0) = 0$. (The master theorem doesn't apply.)

??? success "Solution"
    Unroll: $T(n) = n + (n - 1) + \cdots + 1 = \frac{n(n+1)}{2} = \Theta(n^2)$. That's the cost of quicksort with consistently terrible pivots.

**4.** Solve $a_n = 5a_{n-1} - 6a_{n-2}$ with $a_0 = 0$, $a_1 = 1$.

??? success "Solution"
    $r^2 - 5r + 6 = 0$ gives $r = 2, 3$. $a_n = A2^n + B3^n$: $A + B = 0$, $2A + 3B = 1$, so $B = 1$, $A = -1$. $a_n = 3^n - 2^n$.

**5.** Prove by induction that binary search's $T(n) = T(\lfloor n/2\rfloor) + 1$, $T(1) = 1$, satisfies $T(n)\leq\log_2n + 1$.

??? success "Solution"
    Base: $T(1) = 1 = \log_21 + 1$. Step (strong induction): $T(n) = T(\lfloor n/2\rfloor) + 1\leq\log_2\lfloor n/2\rfloor + 2\leq\log_2(n/2) + 2 = \log_2n + 1$.

**6.** An algorithm splits a problem of size $n$ into 2 subproblems of size $n/4$ and does $O(\sqrt n)$ extra work. What's its running time?

??? success "Solution"
    $a = 2$, $b = 4$, $\log_42 = \frac12 = d$: equal case, $\Theta(\sqrt n\log n)$.
