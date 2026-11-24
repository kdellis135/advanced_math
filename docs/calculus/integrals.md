# Integrals

<div class="lesson-meta" markdown>
**Phase 2 · Lesson 4** · ⏱ ~3.5 hours · Needs: [Derivatives](derivatives.md), [Using derivatives](applications.md) (MVT)
</div>

The integral answers "how much in total?": total area, total distance from a varying speed, total probability, the average value of a quantity. The surprise, and the central result of calculus, is that **integration undoes differentiation**. That's why you can compute integrals with antiderivatives instead of adding up infinitely many slivers.

## 1. Area as a limit of sums

To find the area under $f \geq 0$ from $a$ to $b$: cut $[a, b]$ into $n$ strips of width $\Delta x = \frac{b-a}{n}$, approximate each strip by a rectangle of height $f(x_i^*)$ for some sample point $x_i^*$ in the strip, and add.

$$
S_n = \sum_{i=1}^{n} f(x_i^*)\,\Delta x \qquad \text{(a Riemann sum)}
$$

<div class="viz" data-viz="riemann"></div>

!!! definition "Definition: definite integral"
    $f$ is **integrable** on $[a,b]$ if the Riemann sums converge to the same limit as the strips get thinner, whatever sample points are chosen. The limit is

    $$
    \int_a^b f(x)\,dx = \lim_{n\to\infty}\sum_{i=1}^n f(x_i^*)\,\Delta x.
    $$

The notation is a memory of the sum: $\int$ is a stretched S (for *sum*), $f(x)\,dx$ is "height × infinitesimal width."

Every continuous function on $[a,b]$ is integrable (and so is any bounded function with finitely many jumps). Where $f < 0$, the integral counts area *negatively*: it's **signed** area.

**Properties** (all inherited from finite sums):

- Linearity: $\int_a^b (cf + g) = c\int_a^b f + \int_a^b g$.
- Additivity: $\int_a^b f + \int_b^c f = \int_a^c f$. We define $\int_b^a f = -\int_a^b f$.
- Monotonicity: if $f \leq g$ then $\int_a^b f \leq \int_a^b g$. In particular, if $m \leq f \leq M$ on $[a,b]$, then $m(b-a) \leq \int_a^b f \leq M(b-a)$.

## 2. The fundamental theorem of calculus

Define the **accumulation function** $F(x) = \int_a^x f(t)\,dt$: the area from $a$ up to $x$. How fast does it grow as $x$ moves right?

!!! intuition "The key picture"
    Increase $x$ by a tiny $h$. The area grows by a thin strip of width $h$ and height about $f(x)$. So $F(x + h) - F(x) \approx f(x)\,h$, i.e. $F'(x) = f(x)$. **The rate at which area accumulates is the height of the curve.**

!!! theorem "Fundamental theorem of calculus, part 1"
    If $f$ is continuous on $[a, b]$, then $F(x) = \int_a^x f(t)\,dt$ is differentiable and $F'(x) = f(x)$.

!!! proof "Proof"
    $F(x+h) - F(x) = \int_x^{x+h} f(t)\,dt$ by additivity. On the interval between $x$ and $x+h$, let $m_h$ and $M_h$ be the min and max of $f$ (they exist by EVT). By monotonicity,

    $$
    m_h \leq \frac{F(x+h) - F(x)}{h} \leq M_h.
    $$

    As $h \to 0$, the interval shrinks to the point $x$, and by continuity both $m_h$ and $M_h$ tend to $f(x)$. By squeeze, $F'(x) = f(x)$. (This works for $h<0$ too, with the interval on the left.)

!!! definition "Definition: antiderivative"
    $G$ is an **antiderivative** of $f$ if $G' = f$. We write $\int f(x)\,dx = G(x) + C$ (the **indefinite integral**). By the MVT corollary, any two antiderivatives differ by a constant.

!!! theorem "Fundamental theorem of calculus, part 2"
    If $f$ is continuous on $[a,b]$ and $G$ is any antiderivative of $f$, then

    $$
    \int_a^b f(x)\,dx = G(b) - G(a) =: \big[G(x)\big]_a^b.
    $$

!!! proof "Proof"
    By part 1, $F(x) = \int_a^x f$ is an antiderivative, so $G = F + C$ for some constant $C$. Then $G(b) - G(a) = F(b) - F(a) = \int_a^b f - 0$.

!!! example "Example"
    $\int_0^4(0.3x^2 - x + 2)\,dx = \big[0.1x^3 - \frac12x^2 + 2x\big]_0^4 = 6.4 - 8 + 8 = 6.4$, exactly the value the Riemann sums in the figure approach.

So infinitely many rectangles reduce to evaluating one function at two points. That is the payoff of the theorem, and the reason integration and differentiation are studied together.

## 3. Techniques: every rule is a derivative rule backwards

### Substitution (the chain rule backwards)

Since $\frac{d}{dx}G(g(x)) = G'(g(x))\,g'(x)$:

$$
\int f\big(g(x)\big)\,g'(x)\,dx = \int f(u)\,du \quad\text{with } u = g(x).
$$

Mechanically: set $u = g(x)$, write $du = g'(x)\,dx$, and convert everything to $u$. For definite integrals, convert the limits too.

!!! example "Example"
    $\displaystyle\int_0^{1} x e^{-x^2}dx$. Let $u = x^2$, $du = 2x\,dx$, and the limits $0, 1$ stay $0, 1$:
    $\displaystyle\int_0^1 \tfrac12 e^{-u}du = \tfrac12\big[-e^{-u}\big]_0^1 = \tfrac12(1 - e^{-1})$.

### Integration by parts (the product rule backwards)

Integrate $(uv)' = u'v + uv'$ and rearrange:

$$
\int u\,dv = uv - \int v\,du, \qquad \int_a^b u v'\,dx = \big[uv\big]_a^b - \int_a^b u'v\,dx.
$$

Choose $u$ to be something that gets simpler when differentiated (a polynomial, a log).

!!! example "Examples"
    - $\int xe^x\,dx$: $u = x$, $dv = e^x dx$. Then $= xe^x - \int e^x dx = (x - 1)e^x + C$.
    - $\int\ln x\,dx$: $u = \ln x$, $dv = dx$. Then $= x\ln x - \int x\cdot\frac1x dx = x\ln x - x + C$.

### A short table

| $f(x)$ | $\int f\,dx$ | | $f(x)$ | $\int f\,dx$ |
|---|---|---|---|---|
| $x^a$ ($a\neq-1$) | $\frac{x^{a+1}}{a+1}$ | | $\sin x$ | $-\cos x$ |
| $1/x$ | $\ln\lvert x\rvert$ | | $\cos x$ | $\sin x$ |
| $e^{ax}$ | $\frac1a e^{ax}$ | | $\frac{1}{1+x^2}$ | $\arctan x$ |

(Each $+\,C$.) Many integrals have **no** formula in elementary functions. The most famous is $\int e^{-x^2}dx$, the Gaussian. Its *definite* integral over all of $\R$ can still be computed exactly, with a beautiful trick in [Phase 4](../multivariable/integrals.md).

## 4. Improper integrals

Integrals over infinite intervals (or of unbounded functions) are defined as limits:

$$
\int_a^\infty f(x)\,dx = \lim_{b\to\infty}\int_a^b f(x)\,dx.
$$

!!! example "Examples"
    - $\int_0^\infty e^{-x}dx = \lim_b\big[-e^{-x}\big]_0^b = \lim_b(1 - e^{-b}) = 1$. (This is the total probability of the exponential distribution.)
    - $\int_1^\infty \frac{1}{x^p}dx$ converges iff $p > 1$: for $p \neq 1$ it's $\lim_b\frac{b^{1-p} - 1}{1 - p}$, which is $\frac{1}{p-1}$ if $p > 1$ and infinite if $p < 1$; for $p = 1$ it's $\lim\ln b = \infty$.
    - $\int_0^1\frac{1}{\sqrt x}dx = \lim_{a\to0^+}\big[2\sqrt x\big]_a^1 = 2$: finite area under an unbounded curve.

## 5. Integrals as averages

The **average value** of $f$ on $[a,b]$ is $\displaystyle\bar f = \frac{1}{b-a}\int_a^b f(x)\,dx$: the height of the rectangle with the same area. Compare with the discrete average $\frac1n\sum f(x_i)$, which is literally the Riemann sum with equal strips, divided by the total width.

This is exactly how **expectation** works for continuous random variables ([Phase 5](../probability/random-variables.md)): if $p(x)$ is a probability density, then $\E[g(X)] = \int g(x)\,p(x)\,dx$ is a weighted average of $g$, with weights $p(x)\,dx$.

!!! ml "Where this shows up"
    - **Probabilities and expectations** of continuous variables are integrals: $P(a \leq X \leq b) = \int_a^b p(x)\,dx$, and the expected loss is $\int \ell(x)\,p(x)\,dx$.
    - **Normalization:** a density must integrate to 1, which is where the $\frac{1}{\sqrt{2\pi}\sigma}$ in the Gaussian comes from.
    - **Monte Carlo:** when an integral is too hard, approximate it by an average over random samples, $\int g\,p \approx \frac1n\sum g(x_i)$ with $x_i \sim p$. This is how diffusion models, VAEs and reinforcement learning estimate their objectives.
    - **Diffusion models and neural ODEs** integrate a learned velocity field over time.

## Check yourself

**1.** Compute $\int_1^e\frac{\ln x}{x}dx$.

??? success "Solution"
    $u = \ln x$, $du = dx/x$, limits $0$ to $1$: $\int_0^1 u\,du = \frac12$.

**2.** Compute $\int_0^\pi x\sin x\,dx$.

??? success "Solution"
    Parts with $u = x$, $dv = \sin x\,dx$: $\big[-x\cos x\big]_0^\pi + \int_0^\pi\cos x\,dx = \pi + 0 = \pi$.

**3.** Find $\frac{d}{dx}\int_0^{x^2} e^{-t^2}dt$.

??? success "Solution"
    With $F(u) = \int_0^u e^{-t^2}dt$, we want $\frac{d}{dx}F(x^2) = F'(x^2)\cdot 2x = 2x e^{-x^4}$ (FTC part 1 plus the chain rule).

**4.** Compute $\int_0^\infty x e^{-x}\,dx$. (This is the mean of the exponential distribution with rate 1.)

??? success "Solution"
    Parts: $\big[-xe^{-x}\big]_0^\infty + \int_0^\infty e^{-x}dx = 0 + 1 = 1$. (Uses $xe^{-x} \to 0$ as $x \to \infty$, from L'Hôpital.)

**5.** For which $p$ does $\int_0^1 x^{-p}\,dx$ converge?

??? success "Solution"
    For $p \neq 1$: $\big[\frac{x^{1-p}}{1-p}\big]_a^1 = \frac{1 - a^{1-p}}{1-p}$. As $a \to 0^+$ this converges iff $1 - p > 0$, i.e. $p < 1$ (value $\frac1{1-p}$). For $p = 1$, $-\ln a \to \infty$. So: converges iff $p < 1$, the opposite of the $[1,\infty)$ case.

**6.** Show that the average value of $\sin^2 x$ over a full period $[0, 2\pi]$ is $\frac12$.

??? success "Solution"
    $\sin^2x = \frac{1 - \cos2x}{2}$, so $\frac{1}{2\pi}\int_0^{2\pi}\frac{1 - \cos 2x}{2}dx = \frac{1}{2\pi}\cdot\frac{2\pi}{2} = \frac12$ (the cosine integrates to 0 over full periods). This is why AC power uses the "RMS" value $V_\text{peak}/\sqrt2$.
