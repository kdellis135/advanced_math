---
description: "Convex sets and convex functions, why every local minimum of a convex function is global, a catalogue of convex losses, and Jensen's inequality with proof."
---

# Convexity and Jensen

<div class="lesson-meta" markdown>
**Phase 7 · Lesson 1** · ⏱ ~3 hours · Needs: [The Hessian](../multivariable/hessian.md), [Symmetric matrices](../linear-algebra/spectral.md)
</div>

Most optimization problems are hard. A function can have countless local minima, and no local method can tell whether a better one exists elsewhere.

**Convex** problems are the great exception:

- *every local minimum is global*;
- simple methods are guaranteed to find it.

Convexity also gives **Jensen's inequality**, one of the most-used inequalities in probability and information theory.

## 1. Convex sets

!!! definition "Definition: convex set"
    A set $C\subseteq\R^n$ is **convex** if the line segment between any two of its points stays inside: for all $\vv x, \vv y\in C$ and $t\in[0,1]$, $t\vv x + (1-t)\vv y\in C$.

**Reading $t\vv x + (1-t)\vv y$.** As $t$ runs from 0 to 1, this point slides along the segment from $\vv y$ to $\vv x$:

| $t$ | point | where |
|---|---|---|
| $0$ | $\vv y$ | one end |
| $\frac14$ | $\frac14\vv x + \frac34\vv y$ | a quarter of the way to $\vv x$ |
| $\frac12$ | $\frac{\vv x + \vv y}{2}$ | the midpoint |
| $1$ | $\vv x$ | the other end |

It's a weighted average of the two points, with weights $t$ and $1 - t$ that add to 1. For $\vv x = (4, 0)$, $\vv y = (0, 2)$ and $t = \frac12$: the midpoint $(2, 1)$.

Example of failure: the ring (annulus) $1 \leq \norm{\vv x} \leq 2$ contains $(1.5, 0)$ and $(-1.5, 0)$, but their midpoint, the origin, is in the hole. So it isn't convex. A convex set has no holes and no dents.

| Convex | Not convex |
|---|---|
| balls | an annulus |
| half-spaces $\{\vv x : \vv a^\top\vv x\leq b\}$ | a crescent |
| subspaces | the set of integers |
| the probability simplex $\{\vv p : p_i\geq0, \sum p_i = 1\}$ | |
| any intersection of convex sets | |

## 2. Convex functions

!!! definition "Definition: convex function"
    $f$ is **convex** if for all $\vv x, \vv y$ and $t\in[0,1]$:

    $$
    f\big(t\vv x + (1-t)\vv y\big)\leq t\,f(\vv x) + (1-t)\,f(\vv y).
    $$

    **The chord lies above the graph.**

    - $f$ is **strictly convex** if the inequality is strict for $\vv x\neq\vv y$ and $0<t<1$.
    - $f$ is **concave** if $-f$ is convex.

<div class="viz" data-viz="convex"></div>

In the inequality, the left side is the height of the **graph** at a point between $\vv x$ and $\vv y$. The right side is the height of the **chord** (the straight line joining $(\vv x, f(\vv x))$ and $(\vv y, f(\vv y))$) at that same point.

!!! example "Example: checking the definition with numbers"
    **$f(x) = x^2$**, with $x = 0$, $y = 2$, $t = \frac12$:

    - graph at the midpoint: $f(1) = 1$;
    - chord at the midpoint: $\frac12 f(0) + \frac12 f(2) = \frac12\cdot 0 + \frac12 \cdot 4 = 2$.

    $1 \leq 2$ ✓. The curve sags below the chord, as a bowl should.

    **$f(x) = x^3$**, with $x = -2$, $y = 0$, $t = \frac12$:

    - graph: $f(-1) = -1$;
    - chord: $\frac12(-8) + \frac12(0) = -4$.

    $-1 \leq -4$ is false, so $x^3$ is **not** convex. (On the left half, it bulges *above* its chords.)

!!! intuition "Why convexity makes optimization easy"
    Picture two landscapes. A convex one is a single bowl: wherever you start, walking downhill takes you to *the* bottom. A non-convex one has several valleys: walking downhill takes you to the bottom of whichever valley you started in, which might not be the deepest.

    Every theorem in Section 3 is a precise version of "one bowl, one bottom."

### Equivalent characterizations

!!! theorem "First-order condition"
    A differentiable $f$ is convex iff its tangent planes lie below the graph:

    $$
    f(\vv y)\geq f(\vv x) + \nabla f(\vv x)^\top(\vv y - \vv x)\quad\text{for all }\vv x, \vv y.
    $$

!!! proof "Proof (⇒)"
    From the definition, for $t\in(0, 1]$:

    $$
    f(\vv x + t(\vv y - \vv x))\leq f(\vv x) + t(f(\vv y) - f(\vv x)).
    $$

    Rearranging:

    $$
    \frac{f(\vv x + t(\vv y - \vv x)) - f(\vv x)}{t}\leq f(\vv y) - f(\vv x).
    $$

    As $t\to0$, the left side tends to the directional derivative $\nabla f(\vv x)^\top(\vv y - \vv x)$.

    **(⇐)** Let $\vv z = t\vv x + (1-t)\vv y$.

    1. Apply the inequality at $\vv z$ toward $\vv x$ and toward $\vv y$.
    2. Multiply by $t$ and $1 - t$, and add.
    3. The gradient terms cancel because $t(\vv x - \vv z) + (1 - t)(\vv y - \vv z) = \vv 0$, leaving $tf(\vv x) + (1-t)f(\vv y)\geq f(\vv z)$.

!!! intuition "Local information gives global bounds"
    The first-order condition is remarkable: the gradient at *one* point gives a lower bound on $f$ *everywhere*.

    That's why convex optimization is tractable.

    Example: for $f(x) = x^2$ at $x = 1$, the tangent line is $1 + 2(y - 1) = 2y - 1$. The claim is $y^2 \geq 2y - 1$ for every $y$. Indeed $y^2 - 2y + 1 = (y - 1)^2 \geq 0$. ✓ So knowing just $f(1)$ and $f'(1)$, you know $f$ is never below the line $2y - 1$, anywhere.

!!! theorem "Second-order condition"
    A twice-differentiable $f$ is convex iff its Hessian is positive semidefinite everywhere: $H_f(\vv x)\succeq0$. (In 1D: $f''\geq0$.)

This is the practical test. In 1D:

| $f(x)$ | $f''(x)$ | Convex? |
|---|---|---|
| $x^2$ | $2$ | yes, everywhere |
| $e^x$ | $e^x > 0$ | yes |
| $-\log x$ ($x > 0$) | $\frac{1}{x^2} > 0$ | yes |
| $x^3$ | $6x$ | only on $x \geq 0$ |
| $\sin x$ | $-\sin x$ | no: changes sign |

In several variables, "PSD Hessian" means the function curves upward (or is flat) in *every* direction, the bowl or trough shapes from the [Hessian lesson](../multivariable/hessian.md).

??? proof "Proof sketch (deeper)"
    1. Restrict to lines: $f$ is convex iff every $g(t) = f(\vv x + t\vv v)$ is convex (the definition only involves segments).
    2. $g''(t) = \vv v^\top H\vv v$.
    3. In 1D, $g''\geq0$ means $g'$ is increasing. By the mean value theorem the graph then lies above its tangent lines, which is the first-order condition.

## 3. Local minima are global

!!! theorem "The fundamental theorem of convex optimization"
    If $f$ is convex:

    1. every local minimum is a global minimum;
    2. if $f$ is differentiable, $\nabla f(\vv x^*) = \vv 0$ is **sufficient** for $\vv x^*$ to be a global minimum;
    3. if $f$ is strictly convex, the minimizer (if one exists) is unique.

!!! proof "Proof"
    *Zero gradient ⇒ global min:* the first-order condition with $\nabla f(\vv x^*) = \vv 0$ gives $f(\vv y)\geq f(\vv x^*)$ for all $\vv y$.

    *Local ⇒ global:* suppose $\vv x^*$ is a local min but $f(\vv y) < f(\vv x^*)$ for some $\vv y$.

    - Points on the segment, $\vv z_t = (1-t)\vv x^* + t\vv y$, satisfy $f(\vv z_t)\leq(1-t)f(\vv x^*) + tf(\vv y) < f(\vv x^*)$ for every $t\in(0, 1]$.
    - That includes tiny $t$, where $\vv z_t$ is arbitrarily close to $\vv x^*$.
    - That contradicts local minimality.

    *Uniqueness:* if $\vv x\neq\vv y$ were both minimizers with value $m$, strict convexity would give $f\left(\frac{\vv x + \vv y}{2}\right) < m$.

## 4. A catalogue of convex functions

| Function | Convex? | Why |
|---|---|---|
| **linear/affine** $\vv a^\top\vv x + b$ | yes (and concave) | |
| **quadratic** $\vv x^\top A\vv x$ | iff $A\succeq0$ | the Hessian is $2A$ |
| **norms** $\norm{\vv x}$ | yes | triangle inequality and homogeneity |
| $e^x$, $-\log x$, $x\log x$ (on $x > 0$), $\lvert x\rvert^p$ for $p\geq1$ | yes | $f''\geq0$ |
| **log-sum-exp** $\log\sum_ie^{x_i}$ | yes | Hessian $\diag(\vv p) - \vv p\vv p^\top$ (the softmax Jacobian) is PSD |

**Operations that preserve convexity:**

- non-negative weighted sums;
- composition with an affine map: $f(A\vv x + \vv b)$;
- pointwise maximum of convex functions, e.g. the hinge loss $\max(0, 1 - y\,\vv w^\top\vv x)$.

!!! example "Convex ML problems"
    - **Least squares** $\norm{X\vv w - \vv y}^2$: a convex function of an affine map. Ridge adds a convex penalty.
    - **Logistic regression** $\sum_i\log(1 + e^{-y_i\vv w^\top\vv x_i})$: log-sum-exp of affine functions.
    - **Lasso**, **SVMs**: sums of convex losses and norms.

    All have no spurious local minima.

    **Neural networks are not convex** in their weights. For example, permuting hidden units gives many equivalent minima, and averaging two of them is usually not a minimum.

## 5. Jensen's inequality

!!! theorem "Jensen's inequality"
    If $f$ is convex and $X$ is a random variable,

    $$
    f\big(\E[X]\big)\leq\E\big[f(X)\big].
    $$

    For concave $f$ the inequality reverses. If $f$ is strictly convex, equality holds iff $X$ is constant.

!!! proof "Proof"
    Let $\mu = \E X$, and assume $f$ is differentiable.

    1. Take the tangent line at $\mu$. By the first-order condition, $f(x)\geq f(\mu) + f'(\mu)(x - \mu)$ for all $x$.
    2. Substitute $X$ and take expectations: $\E f(X)\geq f(\mu) + f'(\mu)(\E X - \mu) = f(\mu)$.

    (Without differentiability, use any supporting line at $\mu$; one always exists for a convex function.)

!!! example "Example: Jensen with numbers"
    $X$ is $0$ or $2$, each with probability $\frac12$, so $\E X = 1$.

    | $f$ | $f(\E X)$ | $\E f(X)$ | Jensen says |
    |---|---|---|---|
    | $x^2$ (convex) | $f(1) = 1$ | $\frac{0 + 4}{2} = 2$ | $1 \leq 2$ ✓ |
    | $e^x$ (convex) | $e^1 \approx 2.72$ | $\frac{1 + e^2}{2} \approx 4.19$ | $2.72 \leq 4.19$ ✓ |
    | $\sqrt{x}$ (concave) | $\sqrt1 = 1$ | $\frac{0 + \sqrt2}{2} \approx 0.71$ | reversed: $1 \geq 0.71$ ✓ |

    The gap between the two sides grows with the spread of $X$. If $X$ were always 1, both sides would be equal.

!!! intuition "The average of the function vs the function of the average"
    For a bowl-shaped $f$, averaging the outputs gives more than evaluating at the average input.

    The definition of convexity is exactly Jensen for a random variable with two values: $\vv x$ with probability $t$, $\vv y$ with probability $1 - t$.

Consequences you'll use again:

- $f(x) = x^2$: $(\E X)^2\leq\E X^2$, i.e. $\Var X\geq0$.
- **AM–GM:** $\log$ is concave, so $\log\left(\frac1n\sum a_i\right)\geq\frac1n\sum\log a_i$.
    - Exponentiating: $\frac{a_1 + \cdots + a_n}{n}\geq\sqrt[n]{a_1\cdots a_n}$.
    - (Here $X$ takes each value $a_i$ with probability $\frac1n$. The right side of the first inequality is $\log$ of the geometric mean, since $\frac1n\sum\log a_i = \log(a_1\cdots a_n)^{1/n}$.)
    - Example: for $2$ and $8$, the arithmetic mean is $5$ and the geometric mean is $\sqrt{16} = 4$.
- **Gibbs' inequality** $\KL(p\,\|\,q)\geq0$, the foundation of information theory, is Jensen applied to $-\log$ ([KL divergence](../information-theory/kl-divergence.md)).
- **The evidence lower bound (ELBO)** of variational inference is Jensen applied to $\log\E$.

!!! ml "Where this shows up"
    - **Convex losses** (squared, logistic, hinge, cross-entropy *as a function of the logits*) make linear models reliably trainable.
        - Neural networks give up convexity in the weights, but keep a convex loss on top.
    - **Convergence guarantees** for gradient descent (next lesson) are proved under convexity.
        - The intuition carries over locally to deep nets.
    - **Jensen** appears in derivations of the ELBO (VAEs, diffusion models), in proving KL ≥ 0, and in many bounds in learning theory.

## Check yourself

**1.** Which are convex on their domains: $x^3$; $e^{-x}$; $\log x$; $\max(x, x^2)$; $\norm{A\vv x - \vv b}_1$?

??? success "Solution"
    | Function | Convex? | Reason |
    |---|---|---|
    | $x^3$ | no | $f'' = 6x < 0$ for $x<0$ |
    | $e^{-x}$ | yes | $f'' = e^{-x} > 0$ |
    | $\log x$ | no | it's concave |
    | $\max(x, x^2)$ | yes | max of convex functions |
    | $\norm{A\vv x - \vv b}_1$ | yes | a norm composed with an affine map |

**2.** For which $a$ is $f(x,y) = x^2 + axy + y^2$ convex?

??? success "Solution"
    The Hessian is $\begin{pmatrix}2 & a\\a & 2\end{pmatrix}$.

    It's PSD iff $4 - a^2\geq0$, i.e. $|a|\leq2$.

**3.** Prove that the sum of two convex functions is convex.

??? success "Solution"
    Add the two defining inequalities: $(f + g)(t\vv x + (1-t)\vv y)\leq t(f + g)(\vv x) + (1-t)(f + g)(\vv y)$.

**4.** Use Jensen to show $\E[e^X]\geq e^{\E X}$. What does this say about the expected value of a stock whose log-return has mean 0?

??? success "Solution"
    $e^x$ is convex, so Jensen gives $\E[e^X]\geq e^{\E X}$.

    If $\log(\text{price ratio})$ has mean 0, the expected price ratio is still $\geq1$, strictly so if there's any volatility.

    Volatility alone raises the *mean* outcome, even though the *typical* (median) outcome is unchanged.

**5.** Show that the set of PSD matrices is convex.

??? success "Solution"
    If $A, B\succeq0$ then $\vv x^\top(tA + (1-t)B)\vv x = t\,\vv x^\top A\vv x + (1-t)\vv x^\top B\vv x\geq0$.

**6.** Use AM–GM to find the minimum of $x + \frac{4}{x}$ for $x > 0$.

??? success "Solution"
    $\frac{x + 4/x}{2}\geq\sqrt{x\cdot\frac4x} = 2$, so $x + \frac4x\geq4$.

    Equality holds when $x = 4/x$, i.e. $x = 2$.
