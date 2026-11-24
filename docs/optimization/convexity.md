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

!!! theorem "Second-order condition"
    A twice-differentiable $f$ is convex iff its Hessian is positive semidefinite everywhere: $H_f(\vv x)\succeq0$. (In 1D: $f''\geq0$.)

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

!!! intuition "The average of the function vs the function of the average"
    For a bowl-shaped $f$, averaging the outputs gives more than evaluating at the average input.

    The definition of convexity is exactly Jensen for a random variable with two values: $\vv x$ with probability $t$, $\vv y$ with probability $1 - t$.

Consequences you'll use again:

- $f(x) = x^2$: $(\E X)^2\leq\E X^2$, i.e. $\Var X\geq0$.
- **AM–GM:** $\log$ is concave, so $\log\left(\frac1n\sum a_i\right)\geq\frac1n\sum\log a_i$.
    - Exponentiating: $\frac{a_1 + \cdots + a_n}{n}\geq\sqrt[n]{a_1\cdots a_n}$.
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
