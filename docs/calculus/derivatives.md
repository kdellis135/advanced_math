# Derivatives

<div class="lesson-meta" markdown>
**Phase 2 · Lesson 2** · ⏱ ~4 hours · Needs: [Limits and continuity](limits.md)
</div>

You probably remember the derivative rules. This lesson proves them.

More importantly, it gives you the definition of the derivative that **generalizes to many dimensions**: the derivative is the *best linear approximation*.

Gradients, Jacobians and backpropagation are all this one idea, applied to functions of many variables.

## 1. Slope of a curve

The slope of a line through $(x_0, f(x_0))$ and $(x_0 + h, f(x_0 + h))$, a **secant** line, is the **difference quotient**

$$
\frac{f(x_0 + h) - f(x_0)}{h}.
$$

(It's just "rise over run": the rise is $f(x_0 + h) - f(x_0)$, the run is $(x_0 + h) - x_0 = h$.)

As $h \to 0$, the secant pivots into the **tangent** line. Its slope is the derivative.

<div class="viz" data-viz="tangent"></div>

Try it with numbers before any theory. Take $f(x) = x^2$ at $x_0 = 3$, where $f(3) = 9$:

| $h$ | $f(3 + h)$ | secant slope $\dfrac{f(3+h) - 9}{h}$ |
|---|---|---|
| $1$ | $16$ | $7$ |
| $0.1$ | $9.61$ | $6.1$ |
| $0.01$ | $9.0601$ | $6.01$ |
| $0.001$ | $9.006001$ | $6.001$ |
| $-0.01$ | $8.9401$ | $5.99$ |

The slopes close in on $6$ from both sides. So the slope of $x^2$ at $x = 3$ should be $6$. The definition below turns this guess into a calculation.

!!! definition "Definition: derivative"
    $f$ is **differentiable** at $x$ if the following limit exists, and the limit is the **derivative** $f'(x)$:

    $$
    f'(x) = \lim_{h \to 0} \frac{f(x + h) - f(x)}{h}.
    $$

    Other notations: $\dfrac{df}{dx}$, $\dfrac{d}{dx}f(x)$, $Df(x)$, $\dot f$ (for time derivatives).

Notice this is exactly a $\frac00$ limit from the [last lesson](limits.md): at $h = 0$ both top and bottom vanish. The work is always to **simplify until the $h$ in the denominator cancels**, then let $h \to 0$.

!!! example "Example: the derivative of $x^2$, from the definition"
    1. Write the difference quotient: $\ \dfrac{(x + h)^2 - x^2}{h}$.
    2. Expand $(x + h)^2 = x^2 + 2xh + h^2$: $\ \dfrac{x^2 + 2xh + h^2 - x^2}{h} = \dfrac{2xh + h^2}{h}$.
    3. Every term on top has a factor $h$, so cancel it (allowed, since $h \neq 0$ inside the limit): $\ 2x + h$.
    4. Let $h \to 0$: $\ f'(x) = 2x$.

    At $x = 3$ that's $6$, matching the table.

!!! example "Example: the derivative of $\sqrt x$, from the definition"
    1. $\dfrac{\sqrt{x + h} - \sqrt x}{h}$. Plugging in $h = 0$ gives $\frac00$.
    2. Multiply by the conjugate $\frac{\sqrt{x+h} + \sqrt x}{\sqrt{x+h} + \sqrt x}$ (Technique 2 in [Limits](limits.md#4-computing-limits-in-practice)): the top becomes $(x + h) - x = h$.
    3. So the quotient is $\dfrac{h}{h(\sqrt{x+h} + \sqrt x)} = \dfrac{1}{\sqrt{x+h} + \sqrt x}$.
    4. Let $h \to 0$: $\ f'(x) = \dfrac{1}{2\sqrt x}$ (for $x > 0$).

**The derivative is a function.** For each $x$ it gives a number, so $f'$ is a new function. For $f(x) = x^2$, $f'(x) = 2x$:

- where $f'(x) > 0$ (here, $x > 0$), $f$ is going **up**;
- where $f'(x) < 0$ (here, $x < 0$), $f$ is going **down**;
- where $f'(x) = 0$ (here, $x = 0$), the tangent is flat: the bottom of the parabola.

**The tangent line.** The tangent at $x = a$ passes through $(a, f(a))$ with slope $f'(a)$. Point-slope form gives its equation:

$$
y = f(a) + f'(a)(x - a).
$$

For $f(x) = x^2$ at $a = 3$: $\ y = 9 + 6(x - 3) = 6x - 9$.

Three interpretations of the same number:

1. **Geometric:** slope of the tangent line.
2. **Physical:** instantaneous rate of change. If $s(t)$ is position, $s'(t)$ is velocity.
3. **Approximation:** the multiplier that converts a small input change into an output change, $\Delta f \approx f'(x)\,\Delta x$.

## 2. The derivative as best linear approximation

Rearranging the definition: define the error $r(h) = f(x + h) - f(x) - f'(x)h$. Then the definition says exactly that $r(h)/h \to 0$. So

$$
f(x + h) = f(x) + f'(x)\,h + r(h), \qquad \text{where } \frac{r(h)}{h} \to 0.
$$

Why does the definition say that? Divide $r(h)$ by $h$:

$$
\frac{r(h)}{h} = \frac{f(x+h) - f(x)}{h} - f'(x).
$$

The first term tends to $f'(x)$ by definition, so the difference tends to $0$.

!!! example "Example: watching the error shrink, for $f(x) = x^2$ at $x = 3$"
    The linear approximation is $9 + 6h$. The true value is $(3 + h)^2 = 9 + 6h + h^2$. So the error is exactly $r(h) = h^2$.

    | $h$ | error $r(h) = h^2$ | $r(h)/h$ |
    |---|---|---|
    | $0.1$ | $0.01$ | $0.1$ |
    | $0.01$ | $0.0001$ | $0.01$ |
    | $0.001$ | $0.000001$ | $0.001$ |

    Each time $h$ shrinks 10×, the error shrinks 100×. The error is small *even compared to $h$*. That's what "$r(h)/h \to 0$" means.

!!! intuition "This is the definition to remember"
    Near $x$, $f$ looks like the linear function $h \mapsto f(x) + f'(x)h$, and the error shrinks *faster than $h$ itself*. Zoom in on any differentiable function and it becomes a straight line.

    In $n$ dimensions only the shapes change:

    - $f'(x)$ becomes a vector (the gradient) or a matrix (the Jacobian).
    - "$f'(x)\,h$" becomes a dot product or a matrix–vector product.

    The definition itself stays the same.

!!! theorem "Theorem: differentiable implies continuous"
    If $f$ is differentiable at $x$, it is continuous at $x$.

!!! proof "Proof"
    $f(x+h) - f(x) = \frac{f(x+h)-f(x)}{h}\cdot h \to f'(x)\cdot 0 = 0$ as $h \to 0$.

The converse is false. $|x|$ is continuous at 0, but its difference quotient $\frac{|h|}{h}$ is:

- $+1$ for $h>0$,
- $-1$ for $h<0$,

so no limit exists. The graph has a corner, and no single line approximates it.

ReLU, $\max(0, x)$, has the same corner. In practice, frameworks just pick a value (0) for the derivative there.

## 3. Derivatives from the definition

**Constants and $x$ itself.** The two simplest cases:

- $f(x) = c$: the difference quotient is $\frac{c - c}{h} = 0$, so $(c)' = 0$. A flat line has slope 0.
- $f(x) = x$: the difference quotient is $\frac{(x+h) - x}{h} = 1$, so $(x)' = 1$. The line $y = x$ has slope 1.

**Powers.** Look at the pattern for small $n$ first:

$$
\begin{aligned}
(x+h)^2 &= x^2 + 2xh + h^2, \\
(x+h)^3 &= x^3 + 3x^2h + 3xh^2 + h^3.
\end{aligned}
$$

In each case, the term with exactly one $h$ is $n x^{n-1} h$, and every other term after $x^n$ has $h^2$ or more. (There are $n$ ways to pick the single $h$ from the $n$ factors $(x + h)$; the [binomial theorem](../probability/counting.md) makes this precise.)

For a positive integer $n$, then, $(x+h)^n = x^n + nx^{n-1}h + (\text{terms with } h^2, h^3, \ldots)$. So

$$
\frac{(x+h)^n - x^n}{h} = nx^{n-1} + h\cdot(\text{stuff}) \to nx^{n-1}.
$$

For example, $(x^3)' = 3x^2$ and $(x^{10})' = 10x^9$.

**Sine.** The angle-addition formula gives $\sin(x + h) = \sin x\cos h + \cos x \sin h$. Substitute it, then group the $\sin x$ terms:

$$
\frac{\sin(x+h) - \sin x}{h} = \frac{\sin x\cos h - \sin x + \cos x\sin h}{h} = \sin x\cdot\frac{\cos h - 1}{h} + \cos x\cdot\frac{\sin h}{h}.
$$

Now take the limit of each piece:

$$
\to \sin x \cdot 0 + \cos x\cdot 1 = \cos x,
$$

using $\frac{\sin h}{h} \to 1$ and $\frac{\cos h - 1}{h} = -h\cdot\frac{1-\cos h}{h^2} \to 0\cdot\frac12 = 0$ ([Limits](limits.md), exercise 5). Similarly $(\cos x)' = -\sin x$.

**The exponential.**

$$
\frac{e^{x+h} - e^x}{h} = e^x\cdot\frac{e^h - 1}{h}.
$$

So the derivative of $e^x$ is $e^x$ times the constant $\lim_{h\to0}\frac{e^h-1}{h}$.

(The step uses $e^{x+h} = e^x e^h$, then factors out $e^x$, which doesn't depend on $h$.)

For a general base $b$, the same computation gives $(b^x)' = b^x\cdot\lim_{h \to 0}\frac{b^h - 1}{h}$.

That constant is exactly 1 when $b = e$. This is the cleanest way to see why $e$ is the natural base.

You can see it numerically with $h = 0.001$:

| base $b$ | $\dfrac{b^{0.001} - 1}{0.001}$ |
|---|---|
| $2$ | $\approx 0.693$ |
| $e \approx 2.718$ | $\approx 1.000$ |
| $3$ | $\approx 1.099$ |

The values for $2$ and $3$ are $\ln 2$ and $\ln 3$. That's no coincidence: once we have the chain rule, we'll see $(b^x)' = b^x \ln b$.

??? proof "Why $\lim_{h\to0}\frac{e^h - 1}{h} = 1$ (deeper)"
    With $e = \lim(1 + 1/n)^n$, one can show $1 + h \leq e^h \leq \frac{1}{1-h}$ for small $|h|$ (for $h<1$). These follow from Bernoulli's inequality applied to $(1 + h/n)^n$.

    Then for $0<h<1$: $1 \leq \frac{e^h - 1}{h} \leq \frac{1}{1-h}$, and the squeeze theorem gives the limit 1 from the right. The left side is similar.

    Alternatively, many textbooks *define* $\exp$ as the solution of $y' = y,\ y(0) = 1$, or by its power series, and prove $\exp(x) = e^x$ afterwards. All routes lead to the same function.

## 4. The rules, with proofs

!!! theorem "Theorem: linearity"
    $(af + bg)' = af' + bg'$.

!!! proof "Proof"
    The difference quotient of $af + bg$ is $a$ times that of $f$ plus $b$ times that of $g$; apply the limit laws.

!!! theorem "Theorem: product rule"
    $(fg)' = f'g + fg'$.

!!! proof "Proof"
    Add and subtract $f(x+h)g(x)$ in the numerator:

    $$
    \frac{f(x+h)g(x+h) - f(x)g(x)}{h} = f(x+h)\,\frac{g(x+h) - g(x)}{h} + g(x)\,\frac{f(x+h) - f(x)}{h}.
    $$

    As $h \to 0$: $f(x+h) \to f(x)$ (differentiable implies continuous), and the quotients tend to $g'(x)$ and $f'(x)$.

!!! intuition "Picture"
    $fg$ is the area of an $f \times g$ rectangle. Grow both sides a little: the area gains a strip $f\,\Delta g$, a strip $g\,\Delta f$, and a tiny corner $\Delta f\,\Delta g$ that is negligible (it's second order).

!!! warning "The derivative of a product is not the product of derivatives"
    $(fg)' \neq f'g'$. Check with $f = g = x$: $\ (x \cdot x)' = (x^2)' = 2x$, but $f'g' = 1 \cdot 1 = 1$.

!!! example "Example: product rule"
    $\dfrac{d}{dx}\big(x^3 \sin x\big)$. Label $f = x^3$, $g = \sin x$, so $f' = 3x^2$, $g' = \cos x$:

    $$
    f'g + fg' = 3x^2\sin x + x^3\cos x.
    $$

!!! theorem "Theorem: chain rule"
    If $g$ is differentiable at $x$ and $f$ is differentiable at $g(x)$, then

    $$
    (f \circ g)'(x) = f'\big(g(x)\big)\cdot g'(x).
    $$

!!! intuition "Rates multiply"
    If $y$ changes 3 times as fast as $u$, and $u$ changes 2 times as fast as $x$, then $y$ changes $3 \times 2 = 6$ times as fast as $x$. In Leibniz notation, $\frac{dy}{dx} = \frac{dy}{du}\frac{du}{dx}$. It looks like fractions cancelling. That's a good memory aid, not a proof.

**How to use it.** Most of the work is spotting the inner and outer function.

1. Ask: "what is the *last* operation I'd do to compute this on a calculator?" That's the **outer** function $f$. Everything inside it is the **inner** function $g$.
2. Differentiate the outer function, leaving the inside untouched: $f'(g(x))$.
3. Multiply by the derivative of the inside: $g'(x)$.

!!! example "Example: four chain-rule computations"
    | Function | Outer $f(u)$ | Inner $u = g(x)$ | $f'(u)\cdot g'(x)$ |
    |---|---|---|---|
    | $(3x + 1)^5$ | $u^5$ | $3x + 1$ | $5(3x+1)^4 \cdot 3$ |
    | $e^{x^2}$ | $e^u$ | $x^2$ | $e^{x^2}\cdot 2x$ |
    | $\sin^2 x = (\sin x)^2$ | $u^2$ | $\sin x$ | $2\sin x \cdot \cos x$ |
    | $\ln(\cos x)$ | $\ln u$ | $\cos x$ | $\frac{1}{\cos x}\cdot(-\sin x) = -\tan x$ |

    For three layers, peel one at a time from the outside. For $\sin(e^{2x})$:

    $$
    \frac{d}{dx}\sin(e^{2x}) = \cos(e^{2x}) \cdot \frac{d}{dx}e^{2x} = \cos(e^{2x}) \cdot e^{2x} \cdot 2.
    $$

!!! example "Example: now we can do $b^x$"
    Write $b = e^{\ln b}$, so $b^x = e^{x \ln b}$. The inner function $x \ln b$ has derivative $\ln b$ (a constant). So

    $$
    (b^x)' = e^{x\ln b} \cdot \ln b = b^x \ln b.
    $$

    For $b = 2$: $(2^x)' = 2^x \ln 2 \approx 0.693 \cdot 2^x$, matching the numerical table above.

!!! proof "Proof (via linear approximation)"
    Write $u = g(x)$ and $k = g(x + h) - g(x)$, the change in the inner function. Since $f$ is differentiable at $u$, we can write
    $f(u + k) - f(u) = \big(f'(u) + \eta(k)\big)\,k$, where $\eta(k) \to 0$ as $k \to 0$ (define $\eta(0) = 0$).
    This form is valid even when $k = 0$. Then

    $$
    \frac{f(g(x+h)) - f(g(x))}{h} = \big(f'(u) + \eta(k)\big)\cdot\frac{k}{h} = \big(f'(u) + \eta(k)\big)\cdot\frac{g(x+h) - g(x)}{h}.
    $$

    As $h \to 0$: $k \to 0$ (since $g$ is continuous), so $\eta(k) \to 0$, and the last fraction tends to $g'(x)$. The limit is $f'(u)\,g'(x)$.

    (The naive proof, multiplying and dividing by $k$, fails when $k = 0$ for some small $h$. Writing the error as $\eta(k)\,k$ sidesteps this. This is a classic subtle point that textbooks often skip.)

**Quotient rule** follows from the product and chain rules: $\frac{f}{g} = f\cdot g^{-1}$, and $(g^{-1})' = -g^{-2}g'$, so

$$
\left(\frac fg\right)' = \frac{f'}{g} - \frac{fg'}{g^2} = \frac{f'g - fg'}{g^2}.
$$

Where $(g^{-1})' = -g^{-2}g'$ comes from: $g^{-1}$ is the outer function $u^{-1}$ applied to $u = g(x)$. The power rule gives $(u^{-1})' = -u^{-2}$, and the chain rule multiplies by $g'$.

In the last step, $\frac{f'}{g}$ was rewritten as $\frac{f'g}{g^2}$ to get a common denominator.

!!! example "Example: quotient rule"
    $\dfrac{d}{dx}\dfrac{x^2}{x + 1}$, with $f = x^2$, $g = x + 1$:

    $$
    \frac{f'g - fg'}{g^2} = \frac{2x(x+1) - x^2 \cdot 1}{(x+1)^2} = \frac{x^2 + 2x}{(x+1)^2}.
    $$

    Memory aid: "low d-high minus high d-low, over low squared." The order matters, because of the minus sign.

**Inverse functions.** If $f$ and $f^{-1}$ are differentiable, differentiate $f(f^{-1}(y)) = y$ with the chain rule: $f'(f^{-1}(y))\cdot(f^{-1})'(y) = 1$, so

$$
(f^{-1})'(y) = \frac{1}{f'(f^{-1}(y))}.
$$

Picture: the graph of $f^{-1}$ is the graph of $f$ mirrored across $y = x$. Mirroring swaps rise and run, so slopes get flipped to their reciprocals.

!!! example "Example: the derivative of $\ln$"
    $\ln$ is the inverse of $e^x$. With $f = \exp$: $(\ln)'(y) = \frac{1}{e^{\ln y}} = \frac1y$.

    Step by step: $f'(u) = e^u$, and we evaluate it at $u = f^{-1}(y) = \ln y$, giving $e^{\ln y} = y$. So the slope of $\ln$ at $y$ is $\frac{1}{y}$.

**General powers.** For any real $a$ and $x > 0$: $x^a = e^{a\ln x}$, so by the chain rule $(x^a)' = e^{a\ln x}\cdot\frac ax = x^a\cdot\frac ax = ax^{a-1}$.

So the power rule works for every exponent, not just positive integers:

| $f(x)$ | rewrite | $f'(x)$ |
|---|---|---|
| $\dfrac1x$ | $x^{-1}$ | $-x^{-2} = -\dfrac{1}{x^2}$ |
| $\sqrt x$ | $x^{1/2}$ | $\frac12 x^{-1/2} = \dfrac{1}{2\sqrt x}$ (matches the earlier example) |
| $\dfrac{1}{x^3}$ | $x^{-3}$ | $-3x^{-4}$ |

### Implicit differentiation

Sometimes $y$ is tied to $x$ by an equation instead of a formula, like the circle $x^2 + y^2 = 25$.

The method: **differentiate both sides with respect to $x$, treating $y$ as a function of $x$** (so the chain rule produces a $y'$ whenever you differentiate something with $y$ in it). Then solve for $y'$.

!!! example "Example: the slope of a circle"
    Differentiate $x^2 + y^2 = 25$:

    1. $\frac{d}{dx}x^2 = 2x$.
    2. $\frac{d}{dx}y^2 = 2y \cdot y'$ (chain rule: outer $u^2$, inner $y(x)$).
    3. $\frac{d}{dx}25 = 0$.

    So $2x + 2yy' = 0$, giving $y' = -\dfrac{x}{y}$.

    At the point $(3, 4)$ the slope is $-\frac34$. (Check: the radius to $(3, 4)$ has slope $\frac43$, and the tangent is perpendicular to it.)

The "logarithmic differentiation" example below uses the same idea.

## 5. The table

| $f(x)$ | $f'(x)$ | | $f(x)$ | $f'(x)$ |
|---|---|---|---|---|
| $x^a$ | $ax^{a-1}$ | | $\sin x$ | $\cos x$ |
| $e^x$ | $e^x$ | | $\cos x$ | $-\sin x$ |
| $b^x$ | $b^x\ln b$ | | $\tan x$ | $1/\cos^2 x$ |
| $\ln x$ | $1/x$ | | $\arctan x$ | $1/(1+x^2)$ |
| $\log_b x$ | $1/(x\ln b)$ | | $\arcsin x$ | $1/\sqrt{1-x^2}$ |

Every entry is derived above or follows from the rules (try $\tan = \sin/\cos$ and $\arctan$ as an inverse).

## 6. Worked examples from ML

!!! example "The sigmoid"
    The logistic sigmoid $\sigma(x) = \dfrac{1}{1 + e^{-x}}$ squashes $\R$ into $(0, 1)$. Its derivative, by the chain rule on $(1 + e^{-x})^{-1}$:

    $$
    \sigma'(x) = -(1 + e^{-x})^{-2}\cdot(-e^{-x}) = \frac{e^{-x}}{(1 + e^{-x})^2} = \frac{1}{1 + e^{-x}}\cdot\frac{e^{-x}}{1 + e^{-x}} = \sigma(x)\big(1 - \sigma(x)\big).
    $$

    The last step uses $1 - \sigma = \frac{e^{-x}}{1 + e^{-x}}$. Two things to notice:

    - The derivative is written in terms of the function's own value, so the backward pass can reuse the forward pass.
    - $\sigma' \leq \frac14$ everywhere. This is one reason deep sigmoid networks suffer from **vanishing gradients**: chain-ruling through many layers multiplies many factors $\leq \frac14$.

!!! example "Softplus and tanh"
    - $\operatorname{softplus}(x) = \ln(1 + e^x)$ has derivative $\frac{e^x}{1 + e^x} = \sigma(x)$.
    - $\tanh x = \frac{e^x - e^{-x}}{e^x + e^{-x}}$ has derivative $1 - \tanh^2 x$ (quotient rule; try it).

!!! example "Logarithmic differentiation"
    $f(x) = x^x$.

    1. Take logs: $\ln f = x\ln x$.
    2. Differentiate both sides (chain rule on the left): $\frac{f'}{f} = \ln x + 1$.
    3. Multiply by $f$: $f'(x) = x^x(\ln x + 1)$.

## 7. Higher derivatives

$f''$ is the derivative of $f'$, and so on; $f^{(n)}$ is the $n$-th derivative.

For example, with $f(x) = x^4$: $\ f' = 4x^3$, $\ f'' = 12x^2$, $\ f''' = 24x$, $\ f^{(4)} = 24$, and every derivative after that is $0$. With $f(x) = \sin x$ the derivatives cycle: $\cos x, -\sin x, -\cos x, \sin x, \dots$

In Leibniz notation, $f'' = \dfrac{d^2 f}{dx^2}$.

- **Physics:** $s''(t)$ is acceleration.
- **Geometry:** $f''$ measures **curvature**, how fast the slope changes.

The next lesson uses $f''$ to classify maxima and minima. The [Taylor lesson](series-taylor.md) uses all the derivatives at once.

!!! ml "Where this shows up"
    - **Gradient descent** updates $\theta \leftarrow \theta - \eta f'(\theta)$: move against the slope. The linear approximation $f(\theta - \eta f') \approx f(\theta) - \eta f'(\theta)^2$ shows this decreases $f$ for small $\eta$.
    - **Backpropagation** is the chain rule applied systematically through a composition of layers ([Phase 4](../multivariable/chain-rule.md)).
    - **Activation function design** is largely about derivatives: ReLU's derivative is exactly 1 on the positive side, so gradients don't vanish; sigmoid's is at most $\frac14$.
    - **Automatic differentiation** libraries (PyTorch, JAX) implement exactly the table and rules above, applied mechanically.

## Check yourself

**1.** Differentiate from the definition: $f(x) = 1/x$.

??? success "Solution"
    $\frac{\frac{1}{x+h} - \frac1x}{h} = \frac{x - (x+h)}{hx(x+h)} = \frac{-1}{x(x+h)} \to -\frac{1}{x^2}$.

**2.** Differentiate: (a) $x^2e^{3x}$ (b) $\ln(x^2 + 1)$ (c) $\sin(e^{x})$ (d) $\dfrac{x}{1 + x^2}$.

??? success "Solution"
    - **(a)** $2xe^{3x} + 3x^2e^{3x}$
    - **(b)** $\frac{2x}{x^2+1}$
    - **(c)** $e^x\cos(e^x)$
    - **(d)** $\frac{(1 + x^2) - x\cdot2x}{(1+x^2)^2} = \frac{1 - x^2}{(1+x^2)^2}$

**3.** Show $\frac{d}{dx}\tanh x = 1 - \tanh^2 x$.

??? success "Solution"
    With $u = e^x - e^{-x}$, $v = e^x + e^{-x}$: $u' = v$, $v' = u$. Quotient rule: $\frac{u'v - uv'}{v^2} = \frac{v^2 - u^2}{v^2} = 1 - \frac{u^2}{v^2} = 1 - \tanh^2x$.

**4.** Using the linear approximation, estimate $\sqrt{4.1}$ without a calculator.

??? success "Solution"
    $f(x) = \sqrt x$, $f'(x) = \frac{1}{2\sqrt x}$. At $x = 4$: $\sqrt{4.1} \approx 2 + \frac14\cdot 0.1 = 2.025$. (True value: $2.02485\ldots$)

**5.** Derive $(\arctan x)' = \frac{1}{1+x^2}$ from the inverse function rule.

??? success "Solution"
    $f = \tan$, $f' = 1/\cos^2 = 1 + \tan^2$. So $(\arctan)'(y) = \frac{1}{1 + \tan^2(\arctan y)} = \frac{1}{1 + y^2}$.

**6.** A two-layer "network" computes $y = \sigma(w_2\,\sigma(w_1 x))$. Find $\frac{\partial y}{\partial w_1}$ in terms of $h = \sigma(w_1x)$ and $y$.

??? success "Solution"
    Chain rule, outside in:

    $$
    \frac{dy}{dw_1} = \sigma'(w_2h)\cdot w_2\cdot\sigma'(w_1x)\cdot x = y(1-y)\cdot w_2\cdot h(1-h)\cdot x.
    $$

    Every factor reuses the forward-pass values $h$ and $y$. That is backpropagation in miniature.

**7.** Where is $f(x) = |x^2 - 1|$ not differentiable? Why?

??? success "Solution"
    At $x = \pm1$, where $x^2 - 1$ changes sign.

    At $x = 1$, the left slope is $\frac{d}{dx}(1 - x^2) = -2$ and the right slope is $+2$, so there's a corner. The same happens at $-1$.
