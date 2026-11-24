# Series and Taylor expansions

<div class="lesson-meta" markdown>
**Phase 2 · Lesson 5** · ⏱ ~4 hours · Needs: [Integrals](integrals.md), [Using derivatives](applications.md)
</div>

The derivative gives the best *linear* approximation of a function. Why stop there?

- The second derivative gives the best *quadratic* approximation.
- The third gives the best cubic, and so on.

Taking this to its limit, many functions are *exactly* infinite polynomials:

$$
e^x = 1 + x + \frac{x^2}{2} + \frac{x^3}{6} + \cdots
$$

This lesson makes sense of infinite sums, then builds Taylor series and proves Euler's formula.

## 1. Infinite series

!!! definition "Definition: series"
    Given numbers $a_1, a_2, \ldots$, the **partial sums** are $S_N = \sum_{n=1}^N a_n$.

    - The series $\sum_{n=1}^\infty a_n$ **converges** to $S$ if $S_N \to S$.
    - Otherwise it **diverges**.

An infinite sum is a limit of finite sums, nothing more mysterious.

!!! example "Example: watching partial sums"
    $\frac12 + \frac14 + \frac18 + \frac1{16} + \cdots$

    | $N$ | $S_N$ | distance from 1 |
    |---|---|---|
    | 1 | $0.5$ | $0.5$ |
    | 2 | $0.75$ | $0.25$ |
    | 3 | $0.875$ | $0.125$ |
    | 4 | $0.9375$ | $0.0625$ |
    | 10 | $0.99902$ | $\approx 0.001$ |

    Each term covers half of the remaining gap to 1. The gap halves forever, so $S_N \to 1$. Picture walking toward a wall, each step going half of the way that's left.

The two questions about any series:

1. **Does it converge?** (Often answerable with a test, even when the sum is unknown.)
2. **If so, to what?** (Often much harder. Only a few families, like the geometric series, have a simple formula.)

!!! theorem "Theorem: geometric series"
    For $|r| < 1$: $\displaystyle\sum_{n=0}^\infty r^n = \frac{1}{1-r}$. For $|r| \geq 1$ the series diverges.

!!! proof "Proof"
    From [Logic and proofs](../foundations/logic-and-proofs.md#34-proof-by-induction), $S_N = \frac{1 - r^{N+1}}{1-r}$.

    - **$|r|<1$:** $r^{N+1} \to 0$, so $S_N \to \frac{1}{1-r}$.
    - **$|r| \geq 1$:** the terms $r^n$ don't tend to 0. No series whose terms don't tend to 0 can converge: if $S_N \to S$, then $a_N = S_N - S_{N-1} \to S - S = 0$.

So:

- $\frac12 + \frac14 + \frac18 + \cdots = 1$;
- $0.999\ldots = \frac{9}{10}\cdot\frac{1}{1 - 1/10} = 1$.

How the second one works. The decimal $0.999\ldots$ *means* the series $\frac{9}{10} + \frac{9}{100} + \frac{9}{1000} + \cdots$. Factor out the first term: $\frac{9}{10}\left(1 + \frac{1}{10} + \frac{1}{100} + \cdots\right)$. The bracket is geometric with $r = \frac{1}{10}$, so it equals $\frac{1}{1 - 1/10} = \frac{10}{9}$. Then $\frac{9}{10} \cdot \frac{10}{9} = 1$.

**A general shortcut:** a geometric series that starts at a term $a$ and has ratio $r$ (with $\lvert r\rvert < 1$) sums to

$$
a + ar + ar^2 + \cdots = \frac{a}{1 - r} = \frac{\text{first term}}{1 - \text{ratio}}.
$$

!!! theorem "Theorem: the harmonic series diverges"
    $1 + \frac12 + \frac13 + \frac14 + \cdots = \infty$, even though the terms tend to 0.

!!! proof "Proof"
    Group the terms:

    $$
    1 + \frac12 + \left(\frac13 + \frac14\right) + \left(\frac15 + \cdots + \frac18\right) + \cdots
    $$

    Each group of $2^{k-1}$ terms is at least $2^{k-1}\cdot\frac{1}{2^k} = \frac12$. Infinitely many groups each contributing $\geq \frac12$ make the sum infinite.

So "terms → 0" is **necessary but not sufficient** for convergence.

In fact $\sum_{n=1}^N \frac1n \approx \ln N + 0.577$: it grows without bound, but very slowly.

### Convergence tests (the two you need)

!!! theorem "Comparison test"
    If $0 \leq a_n \leq b_n$ and $\sum b_n$ converges, so does $\sum a_n$. If $\sum a_n$ diverges, so does $\sum b_n$.

(Partial sums of $\sum a_n$ increase and are bounded by $\sum b_n$, and an increasing bounded sequence converges.)

In words: a series of positive terms smaller than a convergent one converges; one bigger than a divergent one diverges.

!!! example "Example: comparison"
    - $\sum \frac{1}{n^2 + 1}$: since $n^2 + 1 > n^2$, we have $\frac{1}{n^2+1} < \frac{1}{n^2}$. And $\sum \frac{1}{n^2}$ converges (shown below). So $\sum\frac{1}{n^2+1}$ converges.
    - $\sum \frac{1}{\sqrt n}$: since $\sqrt n \leq n$, we have $\frac{1}{\sqrt n} \geq \frac1n$. The harmonic series diverges, so this one does too.

    The skill is choosing what to compare with. Usually: keep only the dominant part of the term ($n^2 + 1 \approx n^2$).

!!! theorem "Ratio test"
    Suppose $\left|\frac{a_{n+1}}{a_n}\right| \to L$.

    | $L$ | Conclusion |
    |---|---|
    | $L < 1$ | $\sum a_n$ converges (absolutely) |
    | $L > 1$ | diverges |
    | $L = 1$ | no conclusion |

!!! proof "Proof idea"
    If $L < 1$, pick $r$ with $L < r < 1$. Eventually $|a_{n+1}| \leq r|a_n|$, so the terms are bounded by a geometric series $C r^n$, which converges. Apply comparison.

The ratio test asks: "eventually, does each term shrink by a fixed factor?" If so, the series behaves like a geometric series.

!!! example "Example: ratio test on $\sum \frac{1}{n!}$"
    Recall $n! = 1 \cdot 2 \cdots n$, so $(n+1)! = (n+1) \cdot n!$.

    $$
    \frac{a_{n+1}}{a_n} = \frac{1/(n+1)!}{1/n!} = \frac{n!}{(n+1)!} = \frac{1}{n+1} \to 0 < 1.
    $$

    Converges. (We'll see below that the sum is $e - 1$, or $e$ if we start at $n = 0$.)

!!! warning "Why $L = 1$ tells you nothing"
    Both $\sum\frac1n$ and $\sum\frac{1}{n^2}$ have ratio $\to 1$:

    $$
    \frac{1/(n+1)}{1/n} = \frac{n}{n+1} \to 1, \qquad \frac{1/(n+1)^2}{1/n^2} = \left(\frac{n}{n+1}\right)^2 \to 1.
    $$

    But the first diverges and the second converges. So $L = 1$ can't decide.

Also useful:

- $\sum\frac{1}{n^p}$ converges iff $p > 1$ (compare with $\int_1^\infty x^{-p}dx$ from the previous lesson).
- A series **converges absolutely** if $\sum|a_n|$ converges.
    - Absolute convergence implies convergence.
    - Absolutely convergent series can be rearranged freely.

Why the integral comparison works: the sum $\frac{1}{2^p} + \frac{1}{3^p} + \cdots$ is the total area of rectangles of width 1 that fit *under* the curve $y = x^{-p}$ from $x = 1$ onward. If the area under the curve is finite ($p > 1$), so is the sum. In particular $\sum\frac{1}{n^2}$ converges. (Its sum is famously $\frac{\pi^2}{6}$.)

**Alternating series** like $1 - \frac12 + \frac13 - \frac14 + \cdots$ can converge even when $\sum\lvert a_n\rvert$ doesn't. Each new term partly cancels the previous one. This one converges (to $\ln 2$, exercise 6) but not absolutely, since $\sum\frac1n$ diverges.

## 2. Power series

A **power series** is an "infinite polynomial" $\sum_{n=0}^\infty c_n(x - a)^n$.

Written out: $c_0 + c_1(x - a) + c_2(x-a)^2 + \cdots$. The $c_n$ are fixed numbers (coefficients), $a$ is the **center**, and $x$ is the variable.

For each value of $x$ you get an ordinary series of numbers, which may or may not converge. So the question becomes: **for which $x$ does it converge?**

!!! theorem "Radius of convergence"
    For every power series there is an $R \in [0, \infty]$ such that the series:

    - converges absolutely for $|x - a| < R$;
    - diverges for $|x - a| > R$.

    Inside this interval, it can be differentiated and integrated term by term.

So the set where it converges is an interval centered at $a$, of half-width $R$ (plus possibly its endpoints, which need separate checking).

Examples:

- $\sum x^n = \frac{1}{1-x}$ has $R = 1$.
- The ratio test on $\sum\frac{x^n}{n!}$ gives $\left|\frac{x}{n+1}\right| \to 0 < 1$ for every $x$, so $R = \infty$.

!!! example "Example: finding $R$ with the ratio test"
    $\displaystyle\sum_{n=1}^\infty \frac{x^n}{n}$. Treat $x$ as a fixed number and compute the ratio of consecutive terms:

    $$
    \left\lvert\frac{x^{n+1}/(n+1)}{x^n/n}\right\rvert = \lvert x\rvert\cdot\frac{n}{n+1} \to \lvert x\rvert.
    $$

    The ratio test says: converges if $\lvert x\rvert < 1$, diverges if $\lvert x\rvert > 1$. So $R = 1$.

    The endpoints need their own check. At $x = 1$ it's the harmonic series (diverges). At $x = -1$ it's alternating, $-1 + \frac12 - \frac13 + \cdots$ (converges). So it converges exactly on $[-1, 1)$.

**Term-by-term differentiation** is what makes power series so useful. For example, differentiating $\sum_{n\ge0}\frac{x^n}{n!}$ term by term:

$$
\frac{d}{dx}\left(1 + x + \frac{x^2}{2} + \frac{x^3}{6} + \cdots\right) = 0 + 1 + x + \frac{x^2}{2} + \cdots
$$

The series reproduces itself, exactly as $e^x$ should. (Each $\frac{x^n}{n!}$ differentiates to $\frac{n x^{n-1}}{n!} = \frac{x^{n-1}}{(n-1)!}$, the previous term.)

## 3. Taylor polynomials

Which polynomial best imitates $f$ near $a$? Ask it to **match $f$ and its first $n$ derivatives at $a$**.

- Write $T(x) = \sum_{k=0}^n c_k(x-a)^k$.
- Differentiating $k$ times and setting $x = a$ kills every term except $k!\,c_k$.
- So matching $T^{(k)}(a) = f^{(k)}(a)$ forces $c_k = \frac{f^{(k)}(a)}{k!}$.

See the "kills every term" step with a cubic at $a = 0$: $T(x) = c_0 + c_1 x + c_2 x^2 + c_3x^3$.

| Derivative | Formula | At $x = 0$ |
|---|---|---|
| $T(x)$ | $c_0 + c_1x + c_2x^2 + c_3x^3$ | $c_0$ |
| $T'(x)$ | $c_1 + 2c_2x + 3c_3x^2$ | $c_1$ |
| $T''(x)$ | $2c_2 + 6c_3x$ | $2c_2$ |
| $T'''(x)$ | $6c_3$ | $6c_3 = 3!\,c_3$ |

Each derivative strips the lowest term, and setting $x = 0$ wipes out everything that still has an $x$. What's left is $k!\,c_k$.

To make $T^{(k)}(0) = f^{(k)}(0)$, we need $k!\,c_k = f^{(k)}(0)$, i.e. $c_k = \frac{f^{(k)}(0)}{k!}$.

!!! definition "Definition: Taylor polynomial and series"
    The degree-$n$ **Taylor polynomial** of $f$ at $a$ is

    $$
    T_n(x) = \sum_{k=0}^n \frac{f^{(k)}(a)}{k!}(x - a)^k = f(a) + f'(a)(x-a) + \frac{f''(a)}{2}(x-a)^2 + \cdots
    $$

    Letting $n \to \infty$ gives the **Taylor series**. At $a = 0$ it's also called the **Maclaurin series**.

- $T_1$ is the tangent line.
- $T_2$ adds the curvature.
- Each extra term corrects the previous approximation more and more finely near $a$.

<div class="viz" data-viz="taylor"></div>

!!! example "Example: building Taylor polynomials of $e^x$ at $0$, and watching them improve"
    Every derivative of $e^x$ is $e^x$, which equals $1$ at $x = 0$. So $c_k = \frac{1}{k!}$:

    $$
    T_0 = 1, \quad T_1 = 1 + x, \quad T_2 = 1 + x + \frac{x^2}{2}, \quad T_3 = 1 + x + \frac{x^2}{2} + \frac{x^3}{6}.
    $$

    Evaluate at $x = 0.5$, where the true value is $e^{0.5} = 1.648721\ldots$:

    | $n$ | $T_n(0.5)$ | error |
    |---|---|---|
    | 0 | $1$ | $0.649$ |
    | 1 | $1.5$ | $0.149$ |
    | 2 | $1.625$ | $0.024$ |
    | 3 | $1.645833$ | $0.0029$ |
    | 4 | $1.648438$ | $0.00028$ |

    Each extra term shrinks the error roughly tenfold here. Try the same at $x = 3$ and you'll need many more terms: the approximation is best near the center.

### The essential series

Compute the derivatives at 0 and read off coefficients:

| Function | Series | Converges for |
|---|---|---|
| $e^x$ | $\displaystyle\sum_{n\ge0}\frac{x^n}{n!} = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \cdots$ | all $x$ |
| $\sin x$ | $\displaystyle x - \frac{x^3}{3!} + \frac{x^5}{5!} - \cdots$ | all $x$ |
| $\cos x$ | $\displaystyle 1 - \frac{x^2}{2!} + \frac{x^4}{4!} - \cdots$ | all $x$ |
| $\frac{1}{1-x}$ | $1 + x + x^2 + x^3 + \cdots$ | $\lvert x\rvert<1$ |
| $\ln(1+x)$ | $\displaystyle x - \frac{x^2}{2} + \frac{x^3}{3} - \cdots$ | $-1 < x \leq 1$ |
| $(1+x)^\alpha$ | $\displaystyle 1 + \alpha x + \frac{\alpha(\alpha-1)}{2!}x^2 + \cdots$ | $\lvert x\rvert<1$ |

Where the coefficients come from:

- **$e^x$:** every derivative is $e^x$, which is 1 at 0, so $c_n = 1/n!$.
- **$\sin$:** the derivatives cycle $\sin, \cos, -\sin, -\cos$, giving values $0, 1, 0, -1$ at 0.
- **$\ln(1 + x)$:** integrate $\frac{1}{1+x} = 1 - x + x^2 - \cdots$ term by term.

The sine case in full:

| $k$ | $f^{(k)}(x)$ | $f^{(k)}(0)$ | $c_k = f^{(k)}(0)/k!$ |
|---|---|---|---|
| 0 | $\sin x$ | $0$ | $0$ |
| 1 | $\cos x$ | $1$ | $1$ |
| 2 | $-\sin x$ | $0$ | $0$ |
| 3 | $-\cos x$ | $-1$ | $-\frac{1}{3!}$ |
| 4 | $\sin x$ | $0$ | $0$ (and the cycle repeats) |

Only odd powers survive, with alternating signs. That matches $\sin$ being an odd function. Cosine works the same way and keeps only even powers.

The $\ln(1 + x)$ case in full:

1. $\frac{1}{1 + x} = \frac{1}{1 - (-x)}$ is a geometric series with ratio $-x$: $\ 1 - x + x^2 - x^3 + \cdots$ for $\lvert x\rvert < 1$.
2. $\ln(1 + x)$ is the antiderivative of $\frac{1}{1+x}$ that equals $0$ at $x = 0$. Integrate each term: $x - \frac{x^2}{2} + \frac{x^3}{3} - \cdots$

The binomial series $(1 + x)^\alpha$ comes from the derivatives $\alpha(1+x)^{\alpha-1}$, $\ \alpha(\alpha-1)(1+x)^{\alpha-2}$, $\dots$, which equal $\alpha$, $\alpha(\alpha - 1)$, $\dots$ at $0$. When $\alpha$ is a positive integer the series stops, and you get the ordinary binomial theorem.

## 4. How good is the approximation? Taylor's theorem

!!! theorem "Taylor's theorem (Lagrange remainder)"
    If $f$ has $n+1$ continuous derivatives on an interval containing $a$ and $x$, then

    $$
    f(x) = T_n(x) + R_n(x), \qquad R_n(x) = \frac{f^{(n+1)}(\xi)}{(n+1)!}(x - a)^{n+1}
    $$

    for some $\xi$ between $a$ and $x$.

So the error looks like *the next term*, evaluated at some unknown point $\xi$.

If $|f^{(n+1)}| \leq M$ between $a$ and $x$, then

$$
|R_n(x)| \leq \frac{M|x - a|^{n+1}}{(n+1)!}.
$$

For $n = 0$ this is just the mean value theorem: $f(x) = f(a) + f'(\xi)(x - a)$. Taylor's theorem is the MVT extended to higher degrees.

!!! example "Example: how accurate is $\sin x \approx x$?"
    $T_1(x) = x$ for $\sin$ at $0$. But $T_2$ is also just $x$ (the $x^2$ coefficient is $0$), so we may use the remainder of $T_2$, which involves $f''' = -\cos$, bounded by $M = 1$:

    $$
    \lvert\sin x - x\rvert \leq \frac{\lvert x\rvert^3}{3!} = \frac{\lvert x\rvert^3}{6}.
    $$

    At $x = 0.1$ (about 5.7°): the error is at most $\frac{0.001}{6} \approx 0.00017$. Indeed $\sin 0.1 = 0.0998334$, off by $0.0001666$.

    So the "small-angle approximation" in physics is accurate to better than 0.2% for angles under 6°.

??? proof "Proof (deeper)"
    Fix $x \neq a$. Define

    $$
    g(t) = f(x) - \sum_{k=0}^n \frac{f^{(k)}(t)}{k!}(x - t)^k - K(x - t)^{n+1},
    $$

    choosing the constant $K$ so that $g(a) = 0$. Also $g(x) = 0$ directly. By Rolle, $g'(\xi) = 0$ for some $\xi$ between $a$ and $x$.

    Differentiate $g$ in $t$. By the product rule, the derivative of $\frac{f^{(k)}(t)}{k!}(x-t)^k$ is

    $$
    \frac{f^{(k+1)}(t)}{k!}(x-t)^k - \frac{f^{(k)}(t)}{(k-1)!}(x-t)^{k-1}.
    $$

    Consecutive terms cancel (the sum telescopes), leaving only $\frac{f^{(n+1)}(t)}{n!}(x-t)^n$. So

    $$
    g'(t) = -\frac{f^{(n+1)}(t)}{n!}(x-t)^n + (n+1)K(x-t)^n.
    $$

    $g'(\xi) = 0$ gives $K = \frac{f^{(n+1)}(\xi)}{(n+1)!}$, and $g(a) = 0$ is exactly the claimed formula.

!!! example "Example: the exponential series really equals $e^x$"
    For $f = e^x$ at $a = 0$:

    $$
    |R_n(x)| = \frac{e^\xi}{(n+1)!}|x|^{n+1} \leq \frac{e^{|x|}|x|^{n+1}}{(n+1)!}.
    $$

    For fixed $x$, the factorial eventually crushes the power: $\frac{|x|^{n+1}}{(n+1)!} \to 0$, since each new factor $\frac{|x|}{k} < \frac12$ once $k > 2|x|$.

    So $R_n(x) \to 0$, and $e^x = \sum\frac{x^n}{n!}$ for **every** real $x$. The same argument works for $\sin$ and $\cos$, whose derivatives are all bounded by 1.

    Plug in $x = 1$: $e = 1 + 1 + \frac12 + \frac16 + \frac1{24} + \cdots \approx 2.71828$.

### Big-O notation for approximations

We often write Taylor's theorem as

$$
f(a + h) = f(a) + f'(a)h + \tfrac12 f''(a)h^2 + O(h^3),
$$

where $O(h^3)$ means "a term bounded by $C|h|^3$ for small $h$."

Common ones to know by heart:

| Function | Expansion |
|---|---|
| $e^h$ | $1 + h + O(h^2)$ |
| $\ln(1 + h)$ | $h - \tfrac{h^2}{2} + O(h^3)$ |
| $\sqrt{1 + h}$ | $1 + \tfrac h2 + O(h^2)$ |
| $\tfrac{1}{1 - h}$ | $1 + h + O(h^2)$ |

Each is just the first terms of a series from the table above. For example, $\sqrt{1 + h} = (1 + h)^{1/2}$ is the binomial series with $\alpha = \frac12$: $\ 1 + \frac12 h + \cdots$

Big-O terms combine by simple rules: $O(h^2) + O(h^3) = O(h^2)$ (the bigger one wins for small $h$), and $h \cdot O(h^2) = O(h^3)$.

## 5. Euler's formula

Now we can prove the formula previewed in [Complex numbers](../foundations/complex-numbers.md).

1. **Define** $e^z$ for complex $z$ by the same series $\sum\frac{z^n}{n!}$. It converges for every complex $z$, by the ratio test.
2. Put $z = i\theta$ and use $i^2 = -1$, $i^3 = -i$, $i^4 = 1$. The powers of $i\theta$ are:

| $n$ | $0$ | $1$ | $2$ | $3$ | $4$ | $5$ |
|---|---|---|---|---|---|---|
| $(i\theta)^n$ | $1$ | $i\theta$ | $-\theta^2$ | $-i\theta^3$ | $\theta^4$ | $i\theta^5$ |

The pattern of signs and $i$'s repeats every four steps. Divide each by $n!$ and add:

$$
\begin{aligned}
e^{i\theta} &= 1 + i\theta - \frac{\theta^2}{2!} - i\frac{\theta^3}{3!} + \frac{\theta^4}{4!} + i\frac{\theta^5}{5!} - \cdots \\
&= \left(1 - \frac{\theta^2}{2!} + \frac{\theta^4}{4!} - \cdots\right) + i\left(\theta - \frac{\theta^3}{3!} + \frac{\theta^5}{5!} - \cdots\right) \\
&= \cos\theta + i\sin\theta.
\end{aligned}
$$

Splitting into real and imaginary parts is allowed because the series converges absolutely.

This proves **Euler's formula**: $e^{i\theta} = \cos\theta + i\sin\theta$.

## 6. Why Taylor expansions matter so much

!!! intuition "The universal method"
    Most "approximations" in science and ML are a Taylor expansion truncated after one or two terms:

    - **Physics:** a pendulum's restoring force $\propto \sin\theta \approx \theta$ for small swings. That turns a hard equation into simple harmonic motion.
    - **Optimization:** $L(\theta + h) \approx L(\theta) + \nabla L\cdot h + \frac12 h^\top H h$.
        - Gradient descent trusts the linear term.
        - Newton's method minimizes the quadratic one.
    - **Statistics:** the delta method, Laplace approximation and Fisher information are second-order expansions of a log-likelihood.

!!! ml "Where this shows up"
    - **Why gradient descent works:** $L(\theta - \eta g) = L(\theta) - \eta\|g\|^2 + O(\eta^2)$.
        - For small enough $\eta$, the negative first-order term wins, so the loss decreases.
    - **$\log(1 + x) \approx x$** turns many products into sums in derivations: compound growth, perplexity, and the KL divergence between nearby distributions.
    - **GELU and other activations** are often computed with polynomial or tanh approximations derived from Taylor-like expansions.
    - **Softmax with temperature:** as the temperature grows, $e^{z/T} \approx 1 + z/T$, and the softmax approaches uniform.

## Check yourself

**1.** Find $\sum_{n=0}^\infty \frac{2^n}{3^n}$ and $\sum_{n=1}^\infty\frac{1}{4^n}$.

??? success "Solution"
    - $\frac{1}{1 - 2/3} = 3$
    - $\frac{1/4}{1 - 1/4} = \frac13$

**2.** Does $\sum_{n=1}^\infty\frac{n}{2^n}$ converge? Use the ratio test.

??? success "Solution"
    $\frac{a_{n+1}}{a_n} = \frac{n+1}{2n} \to \frac12 < 1$. Converges.

    Its sum is 2:

    1. Differentiate $\sum x^n = \frac{1}{1-x}$ to get $\sum nx^{n-1} = \frac{1}{(1-x)^2}$.
    2. Multiply by $x$.
    3. Set $x = \frac12$.

**3.** Find the degree-2 Taylor polynomial of $\sqrt{x}$ at $a = 4$, and use it to estimate $\sqrt{4.1}$.

??? success "Solution"
    | | $f$ | $f'$ | $f''$ |
    |---|---|---|---|
    | formula | $x^{1/2}$ | $\frac12x^{-1/2}$ | $-\frac14x^{-3/2}$ |
    | at $x = 4$ | $2$ | $\frac14$ | $-\frac1{32}$ |

    So $T_2(x) = 2 + \frac14(x-4) - \frac{1}{64}(x-4)^2$, and

    $$
    T_2(4.1) = 2 + 0.025 - 0.00015625 = 2.02484.
    $$

    (True value: $2.0248457\ldots$)

**4.** How many terms of $\sum\frac{1}{n!}$ guarantee $e$ to within $10^{-6}$?

??? success "Solution"
    - Remainder after $T_n(1)$: $\leq \frac{e}{(n+1)!} < \frac{3}{(n+1)!}$.
    - Need $(n+1)! > 3\times10^6$.
    - $10! = 3{,}628{,}800$, so $n = 9$ suffices (terms $k = 0, \ldots, 9$).

**5.** Use series to compute $\lim_{x\to0}\frac{\sin x - x}{x^3}$.

??? success "Solution"
    $\sin x - x = -\frac{x^3}{6} + O(x^5)$, so the ratio tends to $-\frac16$.

**6.** Show that $\ln 2 = 1 - \frac12 + \frac13 - \frac14 + \cdots$, and explain why the widget's $\ln(1+x)$ approximations are useless at $x = 2$.

??? success "Solution"
    - **$\ln 2$:** set $x = 1$ in the $\ln(1 + x)$ series. (It's valid at the endpoint $x = 1$; that requires a slightly finer argument, but it holds.)
    - **$x = 2$:** we're outside the radius of convergence $R = 1$. The terms $\frac{2^n}{n}$ grow, so the partial sums oscillate wildly. No number of terms helps.

**7.** Using $e^{i\theta}$, prove $\sin^2\theta + \cos^2\theta = 1$ in one line.

??? success "Solution"
    $\cos^2\theta + \sin^2\theta = |e^{i\theta}|^2 = e^{i\theta}\overline{e^{i\theta}} = e^{i\theta}e^{-i\theta} = e^0 = 1$.
