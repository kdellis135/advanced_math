# Asymptotics and Big-O

<div class="lesson-meta" markdown>
**Phase 9 · Lesson 1** · ⏱ ~2.5 hours · Needs: [Logic and proofs](../foundations/logic-and-proofs.md), [Exponentials and logarithms](../foundations/exp-log-trig.md); L'Hôpital from [Using derivatives](../calculus/applications.md) helps
</div>

How fast is an algorithm? Wall-clock time depends on the machine, the language and the compiler. What doesn't depend on them is how the running time **grows** with the input size $n$. Big-O notation captures exactly that growth, ignoring constant factors and small inputs, and it's precise enough to prove things with.

## 1. The definitions

!!! definition "Definition: O, Ω, Θ"
    For functions $f, g$ of positive integers (with positive values):

    - $f = O(g)$ ("$f$ grows at most as fast as $g$") if there are constants $c > 0$ and $n_0$ such that $f(n)\leq c\,g(n)$ for all $n\geq n_0$.
    - $f = \Omega(g)$ ("at least as fast") if $f(n)\geq c\,g(n)$ for all $n\geq n_0$, for some $c > 0$.
    - $f = \Theta(g)$ ("same growth rate") if both hold.

    And the strict versions: $f = o(g)$ if $f(n)/g(n)\to0$, and $f = \omega(g)$ if $f(n)/g(n)\to\infty$.

The quantifiers say: *eventually* (past some $n_0$), *up to a constant factor* ($c$). Read "$=$" as "is in the class"; $f = O(g)$ is really $f\in O(g)$.

!!! example "Proving a Θ bound"
    Claim: $3n^2 + 5n + 7 = \Theta(n^2)$.
    *Upper:* for $n\geq1$, $5n\leq5n^2$ and $7\leq7n^2$, so $3n^2 + 5n + 7\leq15n^2$. Take $c = 15$, $n_0 = 1$.
    *Lower:* $3n^2 + 5n + 7\geq3n^2$ for all $n$. Take $c = 3$.

**The rule of thumb this proves:** for a polynomial, only the highest power matters.

!!! theorem "Limit test"
    If $\lim_{n\to\infty}\frac{f(n)}{g(n)} = L$, then: $L = 0$ ⇒ $f = o(g)$; $0 < L < \infty$ ⇒ $f = \Theta(g)$; $L = \infty$ ⇒ $f = \omega(g)$.

(If the ratio tends to $L$, it's eventually between $L/2$ and $2L$, which gives the constants.)

## 2. The growth hierarchy

$$
1\ \ll\ \log n\ \ll\ \sqrt n\ \ll\ n\ \ll\ n\log n\ \ll\ n^2\ \ll\ n^3\ \ll\ 2^n\ \ll\ n!\ \ll\ n^n.
$$

Each is $o$ of the next. The key comparisons:

!!! theorem "Logs lose to powers, powers lose to exponentials"
    For any constants $a > 0$, $k > 0$ and $b > 1$:

    $$
    (\log n)^a = o(n^k), \qquad n^k = o(b^n).
    $$

!!! proof "Proof"
    $\lim_{x\to\infty}\frac{\ln x}{x^k} = \lim\frac{1/x}{kx^{k-1}} = \lim\frac{1}{kx^k} = 0$ by L'Hôpital. For $(\log n)^a$: $\frac{(\ln n)^a}{n^k} = \left(\frac{\ln n}{n^{k/a}}\right)^a\to0$.
    For exponentials: $\frac{n^k}{b^n}$; apply L'Hôpital $\lceil k\rceil$ times. Each time the power of $n$ drops by 1 while $b^n$ just gains a factor $\ln b$. The numerator becomes bounded and the denominator still grows. (Alternatively: $\ln(n^k/b^n) = k\ln n - n\ln b\to-\infty$.)

**The base of a logarithm doesn't matter:** $\log_an = \frac{\log_bn}{\log_ba}$, a constant multiple. So we write $O(\log n)$ without a base. But the base of an exponential *does* matter: $3^n/2^n = 1.5^n\to\infty$, so $3^n\neq O(2^n)$.

<div class="viz" data-viz="growth"></div>

!!! intuition "Why constant factors are ignored, and when not to"
    A $100n$ algorithm beats a $n^2$ algorithm for all $n > 100$, and the gap keeps growing. Asymptotics tells you what wins *eventually*, and for large data, eventually arrives fast. But constants matter in practice for moderate $n$: an $O(n^3)$ matrix multiply with excellent constants on a GPU often beats asymptotically faster algorithms.

## 3. Sums: the most common analysis

Nested loops produce sums. The tools:

- **Arithmetic:** $\sum_{i=1}^ni = \frac{n(n+1)}{2} = \Theta(n^2)$; more generally $\sum_{i=1}^ni^k = \Theta(n^{k+1})$.
- **Geometric:** $\sum_{i=0}^nr^i = \Theta(r^n)$ if $r > 1$ (the last term dominates), $\Theta(1)$ if $r < 1$ (the first term dominates), and $n + 1$ if $r = 1$.
- **Harmonic:** $\sum_{i=1}^n\frac1i = \Theta(\log n)$.

!!! proof "Proof of the harmonic bound (comparison with an integral)"
    $\frac1x$ is decreasing, so on $[i, i+1]$ we have $\frac{1}{i+1}\leq\frac1x\leq\frac1i$. Integrating over each interval and summing:
    $\sum_{i=2}^{n}\frac1i\leq\int_1^n\frac{dx}{x} = \ln n\leq\sum_{i=1}^{n-1}\frac1i$.
    So $\ln n\leq H_n\leq1 + \ln n$.

**Integrals bound sums of monotone functions.** This is the general technique, and it also proves $\log n! = \sum\log i = \Theta(n\log n)$.

!!! example "Example: a triangular loop"
    ```
    for i in 1..n:
        for j in 1..i:
            constant work
    ```
    Total work $\sum_{i=1}^ni = \Theta(n^2)$.

!!! example "Example: amortized analysis of a dynamic array"
    A list that doubles its capacity when full copies $1 + 2 + 4 + \cdots + 2^k < 2n$ elements in total over $n$ appends: a geometric sum dominated by its last term. So appends take **$O(1)$ amortized** time, even though an individual append can cost $O(n)$.

## 4. Lower bounds: sorting needs $n\log n$

Big-O bounds an algorithm from above. Lower bounds say no algorithm can do better.

!!! theorem "Comparison sorting lower bound"
    Any sorting algorithm that only compares elements needs $\Omega(n\log n)$ comparisons in the worst case.

!!! proof "Proof"
    The algorithm's comparisons form a binary decision tree whose leaves are the possible outputs. To sort every input correctly, it needs a different leaf for each of the $n!$ orderings. A binary tree of height $h$ has at most $2^h$ leaves, so $2^h\geq n!$, giving $h\geq\log_2n! = \Theta(n\log n)$. This is an information-theoretic argument: identifying one of $n!$ possibilities requires $\log_2n!$ bits, and each comparison yields at most 1 bit.

So merge sort's $O(n\log n)$ (proved in the [next lesson](recurrences.md)) is optimal.

!!! ml "Where this shows up"
    - **Attention is $O(n^2)$** in sequence length $n$ (every token attends to every token). This quadratic cost is why long contexts are expensive, and it motivates linear-attention, sparse-attention and state-space alternatives.
    - **Training cost** scales as $O(\text{parameters}\times\text{tokens})$, roughly $6ND$ FLOPs for a Transformer. Scaling laws are written in this language.
    - **Nearest-neighbor search** is $O(n)$ per query by brute force; approximate methods (HNSW, product quantization) get to roughly $O(\log n)$, which is what makes vector databases practical.
    - **Matrix multiplication** is $O(n^3)$ naively; dense linear algebra cost dominates most ML compute.

## Check yourself

**1.** Order by growth: $n\log n$, $n^{1.5}$, $2^{\log_2n}$, $(\log n)^{10}$, $1.01^n$, $n!$.

??? success "Solution"
    $(\log n)^{10}\ll2^{\log_2n} = n\ll n\log n\ll n^{1.5}\ll1.01^n\ll n!$.

**2.** Prove $\log(n!) = \Theta(n\log n)$.

??? success "Solution"
    Upper: $n!\leq n^n$, so $\log n!\leq n\log n$. Lower: the largest $n/2$ factors of $n!$ are each $\geq n/2$, so $n!\geq(n/2)^{n/2}$ and $\log n!\geq\frac n2\log\frac n2 = \Omega(n\log n)$.

**3.** True or false: $2^{n+1} = O(2^n)$; $2^{2n} = O(2^n)$.

??? success "Solution"
    True: $2^{n+1} = 2\cdot2^n$. False: $2^{2n}/2^n = 2^n\to\infty$.

**4.** What's the running time of this loop?
```
i = n
while i > 1:
    i = i // 2
```

??? success "Solution"
    $\Theta(\log n)$: $i$ halves each iteration, and you can halve $n$ about $\log_2n$ times before reaching 1.

**5.** Show $\sum_{i=1}^n\sqrt i = \Theta(n^{3/2})$.

??? success "Solution"
    Integral comparison: $\int_0^n\sqrt x\,dx = \frac23n^{3/2}\leq\sum_{i=1}^n\sqrt i\leq\int_1^{n+1}\sqrt x\,dx\leq\frac23(n+1)^{3/2}$.

**6.** A Transformer processes a 4,000-token context. By what factor does attention cost grow if the context grows to 128,000 tokens?

??? success "Solution"
    $(128000/4000)^2 = 32^2 = 1024$ times.
