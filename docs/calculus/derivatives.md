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

As $h \to 0$, the secant pivots into the **tangent** line. Its slope is the derivative.

<div class="viz" data-viz="tangent"></div>

!!! definition "Definition: derivative"
    $f$ is **differentiable** at $x$ if the following limit exists, and the limit is the **derivative** $f'(x)$:

    $$
    f'(x) = \lim_{h \to 0} \frac{f(x + h) - f(x)}{h}.
    $$

    Other notations: $\dfrac{df}{dx}$, $\dfrac{d}{dx}f(x)$, $Df(x)$, $\dot f$ (for time derivatives).

Three interpretations of the same number:

1. **Geometric:** slope of the tangent line.
2. **Physical:** instantaneous rate of change. If $s(t)$ is position, $s'(t)$ is velocity.
3. **Approximation:** the multiplier that converts a small input change into an output change, $\Delta f \approx f'(x)\,\Delta x$.

## 2. The derivative as best linear approximation

Rearranging the definition: define the error $r(h) = f(x + h) - f(x) - f'(x)h$. Then the definition says exactly that $r(h)/h \to 0$. So

$$
f(x + h) = f(x) + f'(x)\,h + r(h), \qquad \text{where } \frac{r(h)}{h} \to 0.
$$

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

**Powers.** For a positive integer $n$, the binomial theorem gives $(x+h)^n = x^n + nx^{n-1}h + (\text{terms with } h^2, h^3, \ldots)$. So

$$
\frac{(x+h)^n - x^n}{h} = nx^{n-1} + h\cdot(\text{stuff}) \to nx^{n-1}.
$$

**Sine.** Using the angle-addition formula:

$$
\frac{\sin(x+h) - \sin x}{h} = \sin x\cdot\frac{\cos h - 1}{h} + \cos x\cdot\frac{\sin h}{h} \to \sin x \cdot 0 + \cos x\cdot 1 = \cos x,
$$

using $\frac{\sin h}{h} \to 1$ and $\frac{\cos h - 1}{h} = -h\cdot\frac{1-\cos h}{h^2} \to 0\cdot\frac12 = 0$ ([Limits](limits.md), exercise 5). Similarly $(\cos x)' = -\sin x$.

**The exponential.**

$$
\frac{e^{x+h} - e^x}{h} = e^x\cdot\frac{e^h - 1}{h}.
$$

So the derivative of $e^x$ is $e^x$ times the constant $\lim_{h\to0}\frac{e^h-1}{h}$.

For a general base $b$, the same computation gives $(b^x)' = b^x\cdot\lim_{h \to 0}\frac{b^h - 1}{h}$.

That constant is exactly 1 when $b = e$. This is the cleanest way to see why $e$ is the natural base.

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

!!! theorem "Theorem: chain rule"
    If $g$ is differentiable at $x$ and $f$ is differentiable at $g(x)$, then

    $$
    (f \circ g)'(x) = f'\big(g(x)\big)\cdot g'(x).
    $$

!!! intuition "Rates multiply"
    If $y$ changes 3 times as fast as $u$, and $u$ changes 2 times as fast as $x$, then $y$ changes $3 \times 2 = 6$ times as fast as $x$. In Leibniz notation, $\frac{dy}{dx} = \frac{dy}{du}\frac{du}{dx}$. It looks like fractions cancelling. That's a good memory aid, not a proof.

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

**Inverse functions.** If $f$ and $f^{-1}$ are differentiable, differentiate $f(f^{-1}(y)) = y$ with the chain rule: $f'(f^{-1}(y))\cdot(f^{-1})'(y) = 1$, so

$$
(f^{-1})'(y) = \frac{1}{f'(f^{-1}(y))}.
$$

!!! example "Example: the derivative of $\ln$"
    $\ln$ is the inverse of $e^x$. With $f = \exp$: $(\ln)'(y) = \frac{1}{e^{\ln y}} = \frac1y$.

**General powers.** For any real $a$ and $x > 0$: $x^a = e^{a\ln x}$, so by the chain rule $(x^a)' = e^{a\ln x}\cdot\frac ax = x^a\cdot\frac ax = ax^{a-1}$.

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
