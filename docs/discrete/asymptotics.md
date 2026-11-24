# Asymptotics and Big-O

<div class="lesson-meta" markdown>
**Phase 9 · Lesson 1** · ⏱ ~2.5 hours · Needs: [Logic and proofs](../foundations/logic-and-proofs.md), [Exponentials and logarithms](../foundations/exp-log-trig.md); L'Hôpital from [Using derivatives](../calculus/applications.md) helps
</div>

How fast is an algorithm? Wall-clock time depends on the machine, the language and the compiler.

What doesn't depend on them is how the running time **grows** with the input size $n$.

Big-O notation captures exactly that growth, ignoring constant factors and small inputs. It's precise enough to prove things with.

## 1. The definitions

!!! definition "Definition: O, Ω, Θ"
    For functions $f, g$ of positive integers (with positive values):

    | Notation | Read as | Meaning (for some $c > 0$, all $n\geq n_0$) |
    |---|---|---|
    | $f = O(g)$ | $f$ grows at most as fast as $g$ | $f(n)\leq c\,g(n)$ |
    | $f = \Omega(g)$ | at least as fast | $f(n)\geq c\,g(n)$ |
    | $f = \Theta(g)$ | same growth rate | both hold |
    | $f = o(g)$ | strictly slower | $f(n)/g(n)\to0$ |
    | $f = \omega(g)$ | strictly faster | $f(n)/g(n)\to\infty$ |

The quantifiers say:

- *eventually*: past some $n_0$;
- *up to a constant factor*: $c$.

Read "$=$" as "is in the class": $f = O(g)$ is really $f\in O(g)$.

!!! example "Proving a Θ bound"
    Claim: $3n^2 + 5n + 7 = \Theta(n^2)$.

    - **Upper:** for $n\geq1$, $5n\leq5n^2$ and $7\leq7n^2$, so $3n^2 + 5n + 7\leq15n^2$. Take $c = 15$, $n_0 = 1$.
    - **Lower:** $3n^2 + 5n + 7\geq3n^2$ for all $n$. Take $c = 3$.

**The rule of thumb this proves:** for a polynomial, only the highest power matters.

!!! example "Example: disproving a bound"
    Claim: $n^2 \neq O(n)$.

    1. Suppose it were true: some $c$ and $n_0$ with $n^2 \leq cn$ for all $n \geq n_0$.
    2. Divide by $n$: $\ n \leq c$ for all $n \geq n_0$.
    3. But $n = \max(n_0, \lceil c\rceil + 1)$ breaks this. Contradiction.

    The pattern: to show $f \neq O(g)$, show that $f/g$ is unbounded, so no constant $c$ can cap it. (This is the [negation of a "there exists, for all" statement](../foundations/logic-and-proofs.md#negating-quantifiers) in action.)

**Rules that save you from going back to the definition:**

| Rule | Example |
|---|---|
| constants vanish: $c\cdot f = O(f)$ | $7n^2 = O(n^2)$ |
| sums keep the biggest term: $O(f) + O(g) = O(\max(f, g))$ | $n^2 + n\log n = O(n^2)$ |
| products multiply: $O(f)\cdot O(g) = O(fg)$ | a loop of $n$ steps, each $O(\log n)$, is $O(n\log n)$ |
| transitivity: $f = O(g)$ and $g = O(h)$ give $f = O(h)$ | $\log n = O(n)$ and $n = O(n^2)$ |

!!! theorem "Limit test"
    If $\lim_{n\to\infty}\frac{f(n)}{g(n)} = L$, then:

    | $L$ | Conclusion |
    |---|---|
    | $0$ | $f = o(g)$ |
    | $0 < L < \infty$ | $f = \Theta(g)$ |
    | $\infty$ | $f = \omega(g)$ |

(If the ratio tends to $L$, it's eventually between $L/2$ and $2L$, which gives the constants.)

!!! example "Example: the limit test in use"
    | $f$ | $g$ | $\frac{f}{g}$ as $n\to\infty$ | Conclusion |
    |---|---|---|---|
    | $2n^2 + n$ | $n^2$ | $2 + \frac1n \to 2$ | $\Theta$ |
    | $n\log n$ | $n^{1.5}$ | $\frac{\log n}{\sqrt n}\to 0$ | $o$ |
    | $2^n$ | $n^{10}$ | $\to\infty$ (next theorem) | $\omega$ |

    The test is usually faster than hunting for $c$ and $n_0$. It can fail only when the ratio has no limit (it oscillates), and then you go back to the definition.

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
    **Logs vs powers.** By L'Hôpital,

    $$
    \lim_{x\to\infty}\frac{\ln x}{x^k} = \lim\frac{1/x}{kx^{k-1}} = \lim\frac{1}{kx^k} = 0.
    $$

    For $(\log n)^a$: $\frac{(\ln n)^a}{n^k} = \left(\frac{\ln n}{n^{k/a}}\right)^a\to0$.

    **Powers vs exponentials.** For $\frac{n^k}{b^n}$, apply L'Hôpital $\lceil k\rceil$ times.

    - Each time, the power of $n$ drops by 1, while $b^n$ just gains a factor $\ln b$.
    - The numerator becomes bounded, and the denominator still grows.

    (Alternatively: $\ln(n^k/b^n) = k\ln n - n\ln b\to-\infty$.)

**The base of a logarithm doesn't matter:** $\log_an = \frac{\log_bn}{\log_ba}$, a constant multiple. So we write $O(\log n)$ without a base.

**The base of an exponential *does* matter:** $3^n/2^n = 1.5^n\to\infty$, so $3^n\neq O(2^n)$.

<div class="viz" data-viz="growth"></div>

**What the hierarchy means in seconds.** Suppose a computer does $10^9$ simple steps per second and $n = 10^6$ (a million items):

| Running time | Steps | Wall-clock |
|---|---|---|
| $\log_2 n$ | $20$ | 20 nanoseconds |
| $n$ | $10^6$ | 1 millisecond |
| $n\log_2 n$ | $2\times10^7$ | 20 milliseconds |
| $n^2$ | $10^{12}$ | about 17 minutes |
| $n^3$ | $10^{18}$ | about 32 years |
| $2^n$ | $2^{1{,}000{,}000}$ | far longer than the age of the universe |

The jump from $n\log n$ to $n^2$ is the difference between "instant" and "go get lunch." That's why the class of an algorithm matters more than its constant.

!!! intuition "Why constant factors are ignored, and when not to"
    A $100n$ algorithm beats an $n^2$ algorithm for all $n > 100$, and the gap keeps growing.

    Asymptotics tells you what wins *eventually*, and for large data, eventually arrives fast.

    But constants matter in practice for moderate $n$: an $O(n^3)$ matrix multiply with excellent constants on a GPU often beats asymptotically faster algorithms.

## 3. Sums: the most common analysis

Nested loops produce sums. The tools:

| Sum | Growth | Note |
|---|---|---|
| **arithmetic** $\sum_{i=1}^ni$ | $\frac{n(n+1)}{2} = \Theta(n^2)$ | more generally $\sum_{i=1}^ni^k = \Theta(n^{k+1})$ |
| **geometric** $\sum_{i=0}^nr^i$, $r > 1$ | $\Theta(r^n)$ | the last term dominates |
| **geometric**, $r < 1$ | $\Theta(1)$ | the first term dominates |
| **geometric**, $r = 1$ | $n + 1$ | |
| **harmonic** $\sum_{i=1}^n\frac1i$ | $\Theta(\log n)$ | |

!!! proof "Proof of the harmonic bound (comparison with an integral)"
    $\frac1x$ is decreasing, so on $[i, i+1]$ we have $\frac{1}{i+1}\leq\frac1x\leq\frac1i$. Integrating over each interval and summing:

    $$
    \sum_{i=2}^{n}\frac1i\leq\int_1^n\frac{dx}{x} = \ln n\leq\sum_{i=1}^{n-1}\frac1i.
    $$

    So $\ln n\leq H_n\leq1 + \ln n$.

**Integrals bound sums of monotone functions.** This is the general technique.

It also proves $\log n! = \sum\log i = \Theta(n\log n)$.

!!! example "Example: a triangular loop"
    ```
    for i in 1..n:
        for j in 1..i:
            constant work
    ```
    Total work $\sum_{i=1}^ni = \Theta(n^2)$.

    It does about half the work of a full $n\times n$ double loop ($\frac{n^2}{2}$ instead of $n^2$), but half is a constant factor, so the class is the same.

!!! example "Example: a harmonic loop"
    ```
    for i in 1..n:
        for j in 0, i, 2i, 3i, ... up to n:
            constant work
    ```
    The inner loop runs about $\frac{n}{i}$ times. Total:

    $$
    \sum_{i=1}^n\frac ni = n\sum_{i=1}^n\frac1i = n H_n = \Theta(n\log n).
    $$

    | $i$ | 1 | 2 | 3 | ... | $n$ |
    |---|---|---|---|---|---|
    | inner steps | $n$ | $\frac n2$ | $\frac n3$ | ... | $1$ |

    This pattern (visit every multiple of $i$) is the heart of the Sieve of Eratosthenes in [Number theory](number-theory.md).

!!! example "Example: a halving loop"
    ```
    i = n
    while i >= 1:
        do i units of work
        i = i // 2
    ```
    Total work $n + \frac n2 + \frac n4 + \cdots \leq 2n = \Theta(n)$: a geometric sum with $r = \frac12$, dominated by its first term.

    Compare exercise 4: the *number of iterations* is $\Theta(\log n)$, but the *work* is $\Theta(n)$, because the first iteration is the expensive one.

!!! example "Example: amortized analysis of a dynamic array"
    A list that doubles its capacity when full copies $1 + 2 + 4 + \cdots + 2^k < 2n$ elements in total over $n$ appends. That's a geometric sum dominated by its last term.

    So appends take **$O(1)$ amortized** time, even though an individual append can cost $O(n)$.

    For $n = 17$ appends starting from capacity 1:

    | Capacity full at | 1 | 2 | 4 | 8 | 16 |
    |---|---|---|---|---|---|
    | elements copied | 1 | 2 | 4 | 8 | 16 |

    Total copies $1 + 2 + 4 + 8 + 16 = 31 < 2 \times 17$. Fewer than 2 copies per append, on average.

    **Growing by a fixed amount instead** (say +10 slots each time) is a classic bug: the copies are $10 + 20 + 30 + \cdots$, an arithmetic sum, $\Theta(n^2)$ in total. Doubling is what makes it work.

## 4. Lower bounds: sorting needs $n\log n$

- Big-O bounds an algorithm from above.
- Lower bounds say no algorithm can do better.

!!! theorem "Comparison sorting lower bound"
    Any sorting algorithm that only compares elements needs $\Omega(n\log n)$ comparisons in the worst case.

!!! proof "Proof"
    1. The algorithm's comparisons form a binary decision tree whose leaves are the possible outputs.
    2. To sort every input correctly, it needs a different leaf for each of the $n!$ orderings.
    3. A binary tree of height $h$ has at most $2^h$ leaves, so $2^h\geq n!$.
    4. So $h\geq\log_2n! = \Theta(n\log n)$.

    This is an information-theoretic argument: identifying one of $n!$ possibilities requires $\log_2n!$ bits, and each comparison yields at most 1 bit.

!!! example "Example: sorting three items"
    Three items $a, b, c$ can be in $3! = 6$ orders.

    - With 2 comparisons, each with two possible answers, you can distinguish at most $2^2 = 4$ cases. Not enough for 6.
    - So some input needs at least 3 comparisons, and indeed $\lceil\log_2 6\rceil = 3$.

    For 10 items: $\log_2 10! = \log_2 3{,}628{,}800 \approx 21.8$, so every comparison sort needs at least 22 comparisons on some input. Merge sort uses at most 25.

So merge sort's $O(n\log n)$ (proved in the [next lesson](recurrences.md)) is optimal.

!!! warning "The lower bound has fine print"
    It only covers algorithms that learn about the data *by comparing pairs*.

    Counting sort and radix sort look at the values directly (e.g. "which bucket does this digit go in?"). For integers in a limited range they run in $O(n)$, without contradicting the theorem.

!!! ml "Where this shows up"
    - **Attention is $O(n^2)$** in sequence length $n$: every token attends to every token.
        - This quadratic cost is why long contexts are expensive.
        - It motivates linear-attention, sparse-attention and state-space alternatives.
    - **Training cost** scales as $O(\text{parameters}\times\text{tokens})$, roughly $6ND$ FLOPs for a Transformer.
        - Scaling laws are written in this language.
    - **Nearest-neighbor search** is $O(n)$ per query by brute force.
        - Approximate methods (HNSW, product quantization) get to roughly $O(\log n)$, which is what makes vector databases practical.
    - **Matrix multiplication** is $O(n^3)$ naively. Dense linear algebra cost dominates most ML compute.

## Check yourself

**1.** Order by growth: $n\log n$, $n^{1.5}$, $2^{\log_2n}$, $(\log n)^{10}$, $1.01^n$, $n!$.

??? success "Solution"
    $(\log n)^{10}\ll2^{\log_2n} = n\ll n\log n\ll n^{1.5}\ll1.01^n\ll n!$.

**2.** Prove $\log(n!) = \Theta(n\log n)$.

??? success "Solution"
    - **Upper:** $n!\leq n^n$, so $\log n!\leq n\log n$.
    - **Lower:** the largest $n/2$ factors of $n!$ are each $\geq n/2$, so $n!\geq(n/2)^{n/2}$, and $\log n!\geq\frac n2\log\frac n2 = \Omega(n\log n)$.

**3.** True or false: $2^{n+1} = O(2^n)$; $2^{2n} = O(2^n)$.

??? success "Solution"
    - $2^{n+1} = O(2^n)$: **true**, since $2^{n+1} = 2\cdot2^n$.
    - $2^{2n} = O(2^n)$: **false**, since $2^{2n}/2^n = 2^n\to\infty$.

**4.** What's the running time of this loop?
```
i = n
while i > 1:
    i = i // 2
```

??? success "Solution"
    $\Theta(\log n)$.

    $i$ halves each iteration, and you can halve $n$ about $\log_2n$ times before reaching 1.

**5.** Show $\sum_{i=1}^n\sqrt i = \Theta(n^{3/2})$.

??? success "Solution"
    Integral comparison:

    $$
    \int_0^n\sqrt x\,dx = \tfrac23n^{3/2}\leq\sum_{i=1}^n\sqrt i\leq\int_1^{n+1}\sqrt x\,dx\leq\tfrac23(n+1)^{3/2}.
    $$

**6.** A Transformer processes a 4,000-token context. By what factor does attention cost grow if the context grows to 128,000 tokens?

??? success "Solution"
    $(128000/4000)^2 = 32^2 = 1024$ times.
