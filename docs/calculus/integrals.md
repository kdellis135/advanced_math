---
description: "Integrals as limits of sums, the fundamental theorem of calculus with proof, substitution and integration by parts, improper integrals and integrals as averages."
---

# Integrals

<div class="lesson-meta" markdown>
**Phase 2 · Lesson 4** · ⏱ ~3.5 hours · Needs: [Derivatives](derivatives.md), [Using derivatives](applications.md) (MVT)
</div>

The integral answers "how much in total?":

- total area;
- total distance from a varying speed;
- total probability;
- the average value of a quantity.

The surprise, and the central result of calculus, is that **integration undoes differentiation**. That's why you can compute integrals with antiderivatives instead of adding up infinitely many slivers.

## 1. Area as a limit of sums

To find the area under $f \geq 0$ from $a$ to $b$:

1. Cut $[a, b]$ into $n$ strips of width $\Delta x = \frac{b-a}{n}$.
2. Approximate each strip by a rectangle of height $f(x_i^*)$, for some sample point $x_i^*$ in the strip.
3. Add up the rectangles.

$$
S_n = \sum_{i=1}^{n} f(x_i^*)\,\Delta x \qquad \text{(a Riemann sum)}
$$

<div class="viz" data-viz="riemann"></div>

!!! example "Example: a Riemann sum by hand"
    Approximate the area under $f(x) = x^2$ from $0$ to $2$ with $n = 4$ strips, using the **right** endpoint of each strip.

    1. Width: $\Delta x = \frac{2 - 0}{4} = 0.5$. The strips are $[0, 0.5]$, $[0.5, 1]$, $[1, 1.5]$, $[1.5, 2]$.
    2. Right endpoints: $0.5, 1, 1.5, 2$. Heights: $0.25, 1, 2.25, 4$.
    3. Sum: $(0.25 + 1 + 2.25 + 4) \times 0.5 = 7.5 \times 0.5 = 3.75$.

    Using **left** endpoints ($0, 0.5, 1, 1.5$) instead: $(0 + 0.25 + 1 + 2.25) \times 0.5 = 1.75$.

    Since $x^2$ is increasing, right endpoints overestimate and left endpoints underestimate. The true area ($\frac83 \approx 2.67$, computed below) is in between. More strips squeeze the two estimates together.

!!! example "Example: computing an area exactly, as a limit"
    Find the area under $x^2$ from $0$ to $1$ with $n$ strips and right endpoints. The strips have width $\frac1n$, and the $i$-th right endpoint is $\frac{i}{n}$:

    $$
    S_n = \sum_{i=1}^n \left(\frac{i}{n}\right)^2 \cdot \frac1n = \frac{1}{n^3}\sum_{i=1}^n i^2.
    $$

    Use the formula $\sum_{i=1}^n i^2 = \frac{n(n+1)(2n+1)}{6}$ (proved by induction in [Logic and proofs](../foundations/logic-and-proofs.md), exercise 4):

    $$
    S_n = \frac{n(n+1)(2n+1)}{6n^3} = \frac{1}{6}\cdot\frac{n}{n}\cdot\frac{n+1}{n}\cdot\frac{2n+1}{n} = \frac16 \cdot 1 \cdot \left(1 + \frac1n\right)\left(2 + \frac1n\right) \xrightarrow{n\to\infty} \frac16 \cdot 2 = \frac13.
    $$

    So the area is exactly $\frac13$. It works, but it's laborious. The fundamental theorem below will give the same answer in one line.

!!! definition "Definition: definite integral"
    $f$ is **integrable** on $[a,b]$ if the Riemann sums converge to the same limit as the strips get thinner, whatever sample points are chosen. The limit is

    $$
    \int_a^b f(x)\,dx = \lim_{n\to\infty}\sum_{i=1}^n f(x_i^*)\,\Delta x.
    $$

The notation is a memory of the sum:

- $\int$ is a stretched S (for *sum*);
- $f(x)\,dx$ is "height × infinitesimal width."

Every continuous function on $[a,b]$ is integrable, and so is any bounded function with finitely many jumps.

Where $f < 0$, the integral counts area *negatively*: it's **signed** area.

For example, $\int_0^{2\pi}\sin x\,dx = 0$. The hump above the axis on $[0, \pi]$ and the dip below it on $[\pi, 2\pi]$ have the same size, and cancel. (Each has area $2$, as you can check after the next section.) The total *geometric* area would be $\int_0^{2\pi}\lvert\sin x\rvert\,dx = 4$.

The $x$ inside the integral is a dummy variable, just like the index of a sum: $\int_a^b f(x)\,dx = \int_a^b f(t)\,dt$.

**Properties** (all inherited from finite sums):

| Property | Statement |
|---|---|
| Linearity | $\int_a^b (cf + g) = c\int_a^b f + \int_a^b g$ |
| Additivity | $\int_a^b f + \int_b^c f = \int_a^c f$ (and we define $\int_b^a f = -\int_a^b f$) |
| Monotonicity | if $f \leq g$ then $\int_a^b f \leq \int_a^b g$ |
| Bounds | if $m \leq f \leq M$ on $[a,b]$, then $m(b-a) \leq \int_a^b f \leq M(b-a)$ |

## 2. The fundamental theorem of calculus

Define the **accumulation function** $F(x) = \int_a^x f(t)\,dt$: the area from $a$ up to $x$.

(The variable inside is renamed $t$, because $x$ is now busy being the right endpoint.)

!!! example "Example: an accumulation function you can compute by geometry"
    Take $f(t) = t$ and $a = 0$. The region under $f$ from $0$ to $x$ is a triangle with base $x$ and height $x$:

    $$
    F(x) = \int_0^x t\,dt = \frac12 \cdot x \cdot x = \frac{x^2}{2}.
    $$

    | $x$ | $1$ | $2$ | $3$ | $4$ |
    |---|---|---|---|---|
    | area so far, $F(x)$ | $0.5$ | $2$ | $4.5$ | $8$ |
    | area gained in the last step | | $1.5$ | $2.5$ | $3.5$ |

    The area grows faster and faster because the curve is getting taller. And notice $F'(x) = x = f(x)$: the rate of growth of the area *is* the height. That's the theorem below.

How fast does it grow as $x$ moves right?

!!! intuition "The key picture"
    Increase $x$ by a tiny $h$. The area grows by a thin strip of width $h$ and height about $f(x)$.

    So $F(x + h) - F(x) \approx f(x)\,h$, i.e. $F'(x) = f(x)$.

    **The rate at which area accumulates is the height of the curve.**

    A physical version: if $f(t)$ is your speed at time $t$, then $F(x)$ is the distance traveled by time $x$. The rate at which distance grows is, of course, your speed.

!!! theorem "Fundamental theorem of calculus, part 1"
    If $f$ is continuous on $[a, b]$, then $F(x) = \int_a^x f(t)\,dt$ is differentiable and $F'(x) = f(x)$.

!!! proof "Proof"
    $F(x+h) - F(x) = \int_x^{x+h} f(t)\,dt$ by additivity.

    On the interval between $x$ and $x+h$, let $m_h$ and $M_h$ be the min and max of $f$ (they exist by EVT). By monotonicity,

    $$
    m_h \leq \frac{F(x+h) - F(x)}{h} \leq M_h.
    $$

    As $h \to 0$, the interval shrinks to the point $x$, and by continuity both $m_h$ and $M_h$ tend to $f(x)$. By squeeze, $F'(x) = f(x)$.

    (This works for $h<0$ too, with the interval on the left.)

!!! definition "Definition: antiderivative"
    $G$ is an **antiderivative** of $f$ if $G' = f$. We write $\int f(x)\,dx = G(x) + C$ (the **indefinite integral**).

    By the MVT corollary, any two antiderivatives differ by a constant.

Finding an antiderivative means running the derivative table **backwards**: "what did I differentiate to get this?"

| $f(x)$ | think | antiderivative | check by differentiating |
|---|---|---|---|
| $x^3$ | $x^4$ gives $4x^3$; divide by 4 | $\frac{x^4}{4} + C$ | $\frac{4x^3}{4} = x^3$ ✓ |
| $\cos x$ | $\sin x$ gives $\cos x$ | $\sin x + C$ | ✓ |
| $e^{2x}$ | $e^{2x}$ gives $2e^{2x}$; divide by 2 | $\frac12 e^{2x} + C$ | ✓ |
| $\frac{1}{x}$ | $\ln x$ gives $\frac1x$ | $\ln\lvert x\rvert + C$ | ✓ |

The $+C$ is there because constants differentiate to $0$: $x^2$, $x^2 + 5$ and $x^2 - 100$ all have derivative $2x$.

You can always check an antiderivative by differentiating it. This makes integration much safer than it looks.

(Why $\ln\lvert x\rvert$ and not $\ln x$? For $x < 0$, $\ln(-x)$ has derivative $\frac{1}{-x}\cdot(-1) = \frac1x$ by the chain rule. So $\ln\lvert x\rvert$ works on both sides of $0$.)

!!! theorem "Fundamental theorem of calculus, part 2"
    If $f$ is continuous on $[a,b]$ and $G$ is any antiderivative of $f$, then

    $$
    \int_a^b f(x)\,dx = G(b) - G(a) =: \big[G(x)\big]_a^b.
    $$

!!! proof "Proof"
    By part 1, $F(x) = \int_a^x f$ is an antiderivative, so $G = F + C$ for some constant $C$.

    Then $G(b) - G(a) = F(b) - F(a) = \int_a^b f - 0$.

The notation $\big[G(x)\big]_a^b$ just means "$G(b) - G(a)$." Notice the $+C$ disappears: $(G(b) + C) - (G(a) + C) = G(b) - G(a)$. So for definite integrals, any antiderivative will do.

!!! example "Example: the area from Section 1, in one line"
    $\displaystyle\int_0^1 x^2\,dx = \left[\frac{x^3}{3}\right]_0^1 = \frac13 - 0 = \frac13$.

    The same answer as the long Riemann-sum limit. And $\int_0^2 x^2\,dx = \frac{8}{3}$, as promised in the hand computation.

!!! example "Example"
    $$
    \int_0^4(0.3x^2 - x + 2)\,dx = \Big[0.1x^3 - \tfrac12x^2 + 2x\Big]_0^4 = 6.4 - 8 + 8 = 6.4.
    $$

    Term by term: $0.3x^2 \to 0.3\cdot\frac{x^3}{3} = 0.1x^3$, $\ -x \to -\frac{x^2}{2}$, $\ 2 \to 2x$. At $x = 4$: $0.1 \cdot 64 = 6.4$, $\ \frac{16}{2} = 8$, $\ 2 \cdot 4 = 8$. At $x = 0$ everything is $0$.

    That's exactly the value the Riemann sums in the figure approach.

So infinitely many rectangles reduce to evaluating one function at two points.

That is the payoff of the theorem, and the reason integration and differentiation are studied together.

## 3. Techniques: every rule is a derivative rule backwards

### Substitution (the chain rule backwards)

Since $\frac{d}{dx}G(g(x)) = G'(g(x))\,g'(x)$:

$$
\int f\big(g(x)\big)\,g'(x)\,dx = \int f(u)\,du \quad\text{with } u = g(x).
$$

Mechanically:

1. Set $u = g(x)$.
2. Write $du = g'(x)\,dx$.
3. Convert everything to $u$. For definite integrals, convert the limits too.

**How to choose $u$:** look for a function *whose derivative is also sitting in the integrand* (up to a constant factor). Typically $u$ is the "inside" of something: the exponent, the argument of $\sin$, the expression under a root.

!!! example "Example: an indefinite integral"
    $\displaystyle\int 2x\cos(x^2)\,dx$.

    1. The inside of $\cos$ is $x^2$, and its derivative $2x$ is right there. Let $u = x^2$.
    2. $du = 2x\,dx$.
    3. The integral becomes $\int \cos u\,du = \sin u + C = \sin(x^2) + C$.

    Check by differentiating: $\frac{d}{dx}\sin(x^2) = \cos(x^2) \cdot 2x$. ✓

!!! example "Example: fixing a constant factor"
    $\displaystyle\int_0^{1} x e^{-x^2}dx$. Let $u = x^2$, so $du = 2x\,dx$.

    We have $x\,dx$, not $2x\,dx$. That's fine: $x\,dx = \frac12du$. The limits: $x = 0$ gives $u = 0$, and $x = 1$ gives $u = 1$.

    $$
    \int_0^1 \tfrac12 e^{-u}du = \tfrac12\big[-e^{-u}\big]_0^1 = \tfrac12(1 - e^{-1}).
    $$

!!! example "Example: the limits change"
    $\displaystyle\int_0^{2} \frac{x}{x^2 + 1}\,dx$. Let $u = x^2 + 1$, so $du = 2x\,dx$ and $x\,dx = \frac12du$.

    New limits: $x = 0 \Rightarrow u = 1$, and $x = 2 \Rightarrow u = 5$.

    $$
    \int_1^5 \frac{1}{u}\cdot\frac12\,du = \frac12\big[\ln u\big]_1^5 = \frac12\ln 5.
    $$

    Once everything is in terms of $u$, never go back to the old $x$-limits.

### Integration by parts (the product rule backwards)

Integrate $(uv)' = u'v + uv'$ and rearrange:

$$
\int u\,dv = uv - \int v\,du, \qquad \int_a^b u v'\,dx = \big[uv\big]_a^b - \int_a^b u'v\,dx.
$$

Here "$dv$" is shorthand for $v'(x)\,dx$, and "$du$" for $u'(x)\,dx$.

The derivation in detail: the product rule says $(uv)' = u'v + uv'$. Integrate both sides; the integral of a derivative is the function itself, so $uv = \int u'v\,dx + \int uv'\,dx$. Move one integral to the other side.

Choose $u$ to be something that gets simpler when differentiated (a polynomial, a log), and $dv$ something you can integrate.

**The method:** fill in a small table, then plug into $uv - \int v\,du$.

!!! example "Example: $\int x e^x\,dx$, fully worked"
    | | differentiate ↓ | | integrate ↓ |
    |---|---|---|---|
    | $u = x$ | $du = dx$ | $dv = e^x\,dx$ | $v = e^x$ |

    Plug in:

    $$
    \int xe^x\,dx = \underbrace{x e^x}_{uv} - \int \underbrace{e^x}_{v}\,\underbrace{dx}_{du} = xe^x - e^x + C = (x - 1)e^x + C.
    $$

    Check: $\frac{d}{dx}(x - 1)e^x = e^x + (x - 1)e^x = xe^x$. ✓

    What if we'd chosen the other way, $u = e^x$, $dv = x\,dx$? Then $v = \frac{x^2}{2}$ and we'd get $\int \frac{x^2}{2}e^x\,dx$, which is *harder*. A bad choice makes the power go up instead of down.

!!! example "Examples"
    | Integral | Choice | Result |
    |---|---|---|
    | $\int xe^x\,dx$ | $u = x$, $dv = e^x dx$ | $xe^x - \int e^x dx = (x - 1)e^x + C$ |
    | $\int\ln x\,dx$ | $u = \ln x$, $dv = dx$ | $x\ln x - \int x\cdot\frac1x dx = x\ln x - x + C$ |
    | $\int x^2 e^x\,dx$ | $u = x^2$, $dv = e^x dx$ | $x^2e^x - \int 2xe^x\,dx = x^2 e^x - 2(x-1)e^x + C$ (parts twice) |

    The $\ln x$ trick is worth remembering: when there's no obvious product, take $dv = dx$ (so $v = x$).

### Partial fractions, briefly

A fraction of polynomials can often be split into simpler fractions you can integrate directly. You met this for sums in [Phase 1](../foundations/sets-functions.md): $\frac{1}{x(x+1)} = \frac1x - \frac{1}{x+1}$. So

$$
\int\frac{dx}{x(x+1)} = \ln\lvert x\rvert - \ln\lvert x+1\rvert + C = \ln\left\lvert\frac{x}{x+1}\right\rvert + C.
$$

Check the split by recombining: $\frac1x - \frac1{x+1} = \frac{(x+1) - x}{x(x+1)} = \frac{1}{x(x+1)}$. ✓

### A short table

| $f(x)$ | $\int f\,dx$ | | $f(x)$ | $\int f\,dx$ |
|---|---|---|---|---|
| $x^a$ ($a\neq-1$) | $\frac{x^{a+1}}{a+1}$ | | $\sin x$ | $-\cos x$ |
| $1/x$ | $\ln\lvert x\rvert$ | | $\cos x$ | $\sin x$ |
| $e^{ax}$ | $\frac1a e^{ax}$ | | $\frac{1}{1+x^2}$ | $\arctan x$ |

(Each $+\,C$.)

Many integrals have **no** formula in elementary functions. The most famous is $\int e^{-x^2}dx$, the Gaussian.

Its *definite* integral over all of $\R$ can still be computed exactly, with a beautiful trick in [Phase 4](../multivariable/integrals.md).

## 4. Improper integrals

Integrals over infinite intervals (or of unbounded functions) are defined as limits:

$$
\int_a^\infty f(x)\,dx = \lim_{b\to\infty}\int_a^b f(x)\,dx.
$$

!!! example "Examples"
    - $\int_0^\infty e^{-x}dx = \lim_b\big[-e^{-x}\big]_0^b = \lim_b(1 - e^{-b}) = 1$.
        - This is the total probability of the exponential distribution.
    - $\int_1^\infty \frac{1}{x^p}dx$ converges iff $p > 1$:

        | Case | Value |
        |---|---|
        | $p > 1$ | $\lim_b\frac{b^{1-p} - 1}{1 - p} = \frac{1}{p-1}$ |
        | $p < 1$ | $\infty$ |
        | $p = 1$ | $\lim\ln b = \infty$ |

    - $\int_0^1\frac{1}{\sqrt x}dx = \lim_{a\to0^+}\big[2\sqrt x\big]_a^1 = 2$: a finite area under an unbounded curve.

    For $p > 1$, the antiderivative of $x^{-p}$ is $\frac{x^{1-p}}{1-p}$. The exponent $1 - p$ is negative, so $b^{1-p} \to 0$ as $b \to \infty$, leaving $\frac{0 - 1}{1 - p} = \frac{1}{p - 1}$. For $p < 1$ the exponent is positive and $b^{1-p} \to \infty$.

!!! intuition "Why $p = 1$ is the dividing line"
    An infinite region can have finite area only if the curve drops to zero *fast enough*.

    - $\frac{1}{x^2}$ drops fast: the tail beyond $x = 10$ has area $\frac{1}{10}$, beyond $x = 100$ only $\frac{1}{100}$.
    - $\frac{1}{x}$ drops too slowly: every doubling of the interval, $[1, 2], [2, 4], [4, 8], \dots$, adds the same area $\ln 2$. Infinitely many equal pieces add up to infinity.

    The same dividing line appears for the series $\sum \frac{1}{n^p}$ in the [next lesson](series-taylor.md).

## 5. Integrals as averages

The **average value** of $f$ on $[a,b]$ is

$$
\bar f = \frac{1}{b-a}\int_a^b f(x)\,dx,
$$

the height of the rectangle with the same area.

For example, the average of $x^2$ on $[0, 3]$ is $\frac{1}{3}\int_0^3 x^2\,dx = \frac13\cdot\frac{27}{3} = 3$. A rectangle of height $3$ over $[0, 3]$ has area $9$, the same as the area under the parabola.

Compare with the discrete average $\frac1n\sum f(x_i)$. It is literally the Riemann sum with equal strips, divided by the total width.

This is exactly how **expectation** works for continuous random variables ([Phase 5](../probability/random-variables.md)). If $p(x)$ is a probability density, then $\E[g(X)] = \int g(x)\,p(x)\,dx$ is a weighted average of $g$, with weights $p(x)\,dx$.

!!! ml "Where this shows up"
    - **Probabilities and expectations** of continuous variables are integrals: $P(a \leq X \leq b) = \int_a^b p(x)\,dx$, and the expected loss is $\int \ell(x)\,p(x)\,dx$.
    - **Normalization:** a density must integrate to 1, which is where the $\frac{1}{\sqrt{2\pi}\sigma}$ in the Gaussian comes from.
    - **Monte Carlo:** when an integral is too hard, approximate it by an average over random samples, $\int g\,p \approx \frac1n\sum g(x_i)$ with $x_i \sim p$.
        - This is how diffusion models, VAEs and reinforcement learning estimate their objectives.
    - **Diffusion models and neural ODEs** integrate a learned velocity field over time.

## Check yourself

**1.** Compute $\int_1^e\frac{\ln x}{x}dx$.

??? success "Solution"
    $u = \ln x$, $du = dx/x$, limits $0$ to $1$: $\int_0^1 u\,du = \frac12$.

**2.** Compute $\int_0^\pi x\sin x\,dx$.

??? success "Solution"
    Parts with $u = x$, $dv = \sin x\,dx$:

    $$
    \big[-x\cos x\big]_0^\pi + \int_0^\pi\cos x\,dx = \pi + 0 = \pi.
    $$

**3.** Find $\frac{d}{dx}\int_0^{x^2} e^{-t^2}dt$.

??? success "Solution"
    Let $F(u) = \int_0^u e^{-t^2}dt$. By FTC part 1 plus the chain rule:

    $$
    \frac{d}{dx}F(x^2) = F'(x^2)\cdot 2x = 2x e^{-x^4}.
    $$

**4.** Compute $\int_0^\infty x e^{-x}\,dx$. (This is the mean of the exponential distribution with rate 1.)

??? success "Solution"
    Parts: $\big[-xe^{-x}\big]_0^\infty + \int_0^\infty e^{-x}dx = 0 + 1 = 1$.

    (This uses $xe^{-x} \to 0$ as $x \to \infty$, from L'Hôpital.)

**5.** For which $p$ does $\int_0^1 x^{-p}\,dx$ converge?

??? success "Solution"
    - **$p \neq 1$:** $\big[\frac{x^{1-p}}{1-p}\big]_a^1 = \frac{1 - a^{1-p}}{1-p}$. As $a \to 0^+$ this converges iff $1 - p > 0$, i.e. $p < 1$ (value $\frac1{1-p}$).
    - **$p = 1$:** $-\ln a \to \infty$.

    So it converges iff $p < 1$: the opposite of the $[1,\infty)$ case.

**6.** Show that the average value of $\sin^2 x$ over a full period $[0, 2\pi]$ is $\frac12$.

??? success "Solution"
    $\sin^2x = \frac{1 - \cos2x}{2}$, so

    $$
    \frac{1}{2\pi}\int_0^{2\pi}\frac{1 - \cos 2x}{2}dx = \frac{1}{2\pi}\cdot\frac{2\pi}{2} = \frac12,
    $$

    because the cosine integrates to 0 over full periods.

    This is why AC power uses the "RMS" value $V_\text{peak}/\sqrt2$.
