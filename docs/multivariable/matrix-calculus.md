---
description: "Matrix calculus for machine learning: layout conventions, the differential method, core gradient identities, the softmax cross-entropy gradient and numerical gradient checks."
---

# Matrix calculus for ML

<div class="lesson-meta" markdown>
**Phase 4 · Lesson 4** · ⏱ ~3 hours · Needs: [Jacobians, the chain rule and backprop](chain-rule.md), [Hessian](hessian.md)
</div>

ML papers write gradients of vector and matrix expressions in one line:

$$
\nabla_{\vv w}\norm{X\vv w - \vv y}^2 = 2X^\top(X\vv w - \vv y).
$$

This lesson gives you:

- a reliable method to derive such formulas yourself;
- the dozen identities that cover almost everything you'll read.

## 1. Conventions

- For scalar $f$ and vector $\vv x \in \R^n$, $\nabla_{\vv x}f$ is an $n$-vector, **the same shape as $\vv x$**.
- For scalar $f$ and matrix $W$ ($m\times n$), $\nabla_Wf$ is the $m\times n$ matrix with entries $\frac{\partial f}{\partial W_{ij}}$, again **the same shape as $W$**.
- Vector-to-vector derivatives are Jacobians ($\text{outputs} \times \text{inputs}$).

Some texts use the transposed "numerator layout". If a formula looks transposed compared to another source, this is usually why. The shape rule above always disambiguates.

## 2. The brute-force method, to see what's going on

You can always fall back on writing everything in components and taking ordinary partial derivatives. It's slow, but it shows where the formulas come from.

!!! example "Example: $\nabla(\vv a^\top \vv x)$ in components"
    In 2D, $\vv a^\top\vv x = a_1x_1 + a_2x_2$. The partial derivatives are $a_1$ and $a_2$. So $\nabla(\vv a^\top\vv x) = (a_1, a_2) = \vv a$.

    That's the vector version of $\frac{d}{dx}(ax) = a$.

!!! example "Example: $\nabla(\vv x^\top A\vv x)$ in components"
    With $A = \begin{pmatrix}a & b\\c & d\end{pmatrix}$ (not necessarily symmetric):

    $$
    \vv x^\top A\vv x = ax_1^2 + (b + c)x_1x_2 + dx_2^2.
    $$

    Partial derivatives:

    $$
    \frac{\partial}{\partial x_1} = 2ax_1 + (b + c)x_2, \qquad \frac{\partial}{\partial x_2} = (b + c)x_1 + 2dx_2.
    $$

    Now compare with the matrix $(A + A^\top)\vv x = \begin{pmatrix}2a & b + c\\b + c & 2d\end{pmatrix}\begin{pmatrix}x_1\\x_2\end{pmatrix}$. The same two entries. So $\nabla(\vv x^\top A\vv x) = (A + A^\top)\vv x$, and $2A\vv x$ when $A$ is symmetric. It's the vector version of $\frac{d}{dx}(ax^2) = 2ax$.

This works, but in $n$ dimensions the sums get unwieldy. The method below gets the same answers without ever writing an index.

## 3. The reliable method: differentials

Instead of computing partial derivatives one by one, compute the **first-order change** $df$ caused by a small change $d\vv x$, and massage it into the form

$$
df = \vv g^\top d\vv x \quad\Longrightarrow\quad \nabla f = \vv g.
$$

Think of $d\vv x$ as a tiny step and $df$ as the resulting tiny change in $f$, keeping only terms of first order (anything with two $d$'s multiplied together is dropped as negligible). Once you've written the change as "(some vector) $\cdot\ d\vv x$," that vector is the gradient, because "change ≈ gradient · step" is what the gradient *means*.

For example, $f(\vv x) = \norm{\vv x}^2 = \vv x^\top\vv x$. Change $\vv x$ to $\vv x + d\vv x$:

$$
(\vv x + d\vv x)^\top(\vv x + d\vv x) = \vv x^\top\vv x + 2\vv x^\top d\vv x + \underbrace{d\vv x^\top d\vv x}_{\text{second order, drop}}.
$$

So $df = 2\vv x^\top d\vv x$ and $\nabla f = 2\vv x$.

For matrices we need a "dot product of matrices." The **trace** of a square matrix is the sum of its diagonal entries, $\tr M = \sum_i M_{ii}$. The trace inner product $\langle A, B\rangle = \tr(A^\top B) = \sum_{ij}A_{ij}B_{ij}$ multiplies matching entries and adds them up: exactly the dot product, if you unroll each matrix into one long vector.

For example, with $A = \begin{pmatrix}1 & 2\\3 & 4\end{pmatrix}$ and $B = \begin{pmatrix}5 & 6\\7 & 8\end{pmatrix}$: $\ \sum A_{ij}B_{ij} = 5 + 12 + 21 + 32 = 70$, and $\tr(A^\top B) = 70$ too.

So the matrix version of "change = gradient · step" reads:

$$
df = \tr(G^\top dW) \quad\Longrightarrow\quad \nabla_Wf = G.
$$

This is just the definition of differentiability ([gradient lesson](gradient.md#4-differentiability-the-real-definition)) written in shorthand.

Differentials obey the familiar rules:

- $d(A\vv x) = A\,d\vv x$ for constant $A$;
- product rule: $d(\vv u^\top\vv v) = d\vv u^\top\vv v + \vv u^\top d\vv v$.

**Trace tricks** you'll need:

| Trick | Statement |
|---|---|
| cyclic | $\tr(ABC) = \tr(CAB) = \tr(BCA)$ |
| transpose | $\tr(A^\top) = \tr(A)$ |
| scalar = its own trace | $\vv a^\top\vv b = \tr(\vv a^\top\vv b) = \tr(\vv b\vv a^\top)$ |

Notes on these:

- **Cyclic** means you can move the last factor to the front (or the first to the back), but not swap arbitrary factors. The sizes must still multiply: if $A$ is $1 \times n$, $B$ is $n \times n$ and $C$ is $n \times 1$, then $ABC$ is $1 \times 1$ and $CAB$ is $n \times n$, yet they have the same trace.
- A $1 \times 1$ matrix *is* a number, and its trace is that number. That's why you can wrap any scalar in $\tr(\cdot)$ for free, then use the cyclic rule to rearrange.
- Similarly, a scalar equals its own transpose: $\vv u^\top M\vv v = (\vv u^\top M\vv v)^\top = \vv v^\top M^\top\vv u$. This trick is used constantly.

## 4. The core identities, derived

!!! theorem "Linear function"
    $\nabla_{\vv x}(\vv a^\top\vv x) = \vv a$.

!!! proof "Proof"
    $d(\vv a^\top\vv x) = \vv a^\top d\vv x$.

!!! theorem "Quadratic form"
    $\nabla_{\vv x}(\vv x^\top A\vv x) = (A + A^\top)\vv x$, which is $2A\vv x$ when $A$ is symmetric.

!!! proof "Proof"
    1. Product rule: $d(\vv x^\top A\vv x) = d\vv x^\top A\vv x + \vv x^\top A\,d\vv x$.
    2. The first term is a scalar, so it equals its transpose, $\vv x^\top A^\top d\vv x$.
    3. Total: $\vv x^\top(A^\top + A)\,d\vv x$, so the gradient is $(A + A^\top)\vv x$.

    Special case $A = I$: $\nabla\norm{\vv x}^2 = 2\vv x$, just like $\frac{d}{dx}x^2 = 2x$.

!!! theorem "Least squares"
    $\nabla_{\vv w}\norm{X\vv w - \vv y}^2 = 2X^\top(X\vv w - \vv y)$, and the Hessian is $2X^\top X$.

!!! proof "Proof"
    Let $\vv r = X\vv w - \vv y$, so $d\vv r = X\,d\vv w$ (the constant $\vv y$ doesn't change). Then

    $$
    d(\vv r^\top\vv r) = 2\vv r^\top d\vv r = 2\vv r^\top X\,d\vv w = \big(2X^\top\vv r\big)^\top d\vv w.
    $$

    Step by step:

    1. Product rule: $d(\vv r^\top\vv r) = d\vv r^\top\vv r + \vv r^\top d\vv r$. Both terms are the same number (a dot product is symmetric), so the total is $2\vv r^\top d\vv r$.
    2. Substitute $d\vv r = X\,d\vv w$.
    3. Rewrite $2\vv r^\top X$ as $(2X^\top\vv r)^\top$, using $(AB)^\top = B^\top A^\top$, to put it in the form $\vv g^\top d\vv w$.

    This is the chain rule in disguise: "outer derivative $2\vv r$, times the inner Jacobian $X$," with the transpose putting it in the right shape.

Setting this gradient to zero gives the **normal equations** $X^\top X\vv w = X^\top\vv y$, exactly what geometry gave in [Orthogonality](../linear-algebra/orthogonality.md).

The Hessian $2X^\top X$ is PSD, so this critical point is a global minimum ([Convexity](../optimization/convexity.md)).

!!! theorem "Ridge regression"
    $\nabla_{\vv w}\big(\norm{X\vv w - \vv y}^2 + \lambda\norm{\vv w}^2\big) = 2X^\top(X\vv w - \vv y) + 2\lambda\vv w$, so $\hat{\vv w} = (X^\top X + \lambda I)^{-1}X^\top\vv y$.

!!! theorem "Gradient with respect to a weight matrix"
    For $L = f(\vv z)$ with $\vv z = W\vv x$: $\nabla_WL = \boldsymbol\delta\,\vv x^\top$, where $\boldsymbol\delta = \nabla_{\vv z}L$.

!!! proof "Proof"
    $$
    dL = \boldsymbol\delta^\top d\vv z = \boldsymbol\delta^\top(dW)\vv x = \tr(\boldsymbol\delta^\top dW\,\vv x) = \tr(\vv x\boldsymbol\delta^\top dW) = \tr\big((\boldsymbol\delta\vv x^\top)^\top dW\big).
    $$

    The moves, one per equals sign:

    1. Definition of $\boldsymbol\delta$: change in $L$ = gradient $\cdot$ change in $\vv z$.
    2. $\vv z = W\vv x$ with $\vv x$ fixed, so $d\vv z = (dW)\vv x$.
    3. It's a scalar, so wrap it in a trace.
    4. Cyclic rule: move $\vv x$ from the back to the front.
    5. $\vv x\boldsymbol\delta^\top = (\boldsymbol\delta\vv x^\top)^\top$. Now it has the form $\tr(G^\top dW)$ with $G = \boldsymbol\delta\vv x^\top$.

    Sanity check against components: $z_i = \sum_j W_{ij}x_j$, so $\frac{\partial L}{\partial W_{ij}} = \delta_i x_j$, which is the $(i, j)$ entry of $\boldsymbol\delta\vv x^\top$. ✓ (This matches the backprop equations in the [previous lesson](chain-rule.md).)

    **For a batch** (inputs as rows of $X$, outputs $Z = XW^\top$, error signals as rows of $\Delta$): $\nabla_WL = \Delta^\top X$, the sum of per-example outer products.

## 5. Softmax and cross-entropy: the most important gradient in ML

A classifier outputs scores (**logits**) $\vv z \in \R^K$. Softmax turns them into probabilities:

$$
p_i = \frac{e^{z_i}}{\sum_k e^{z_k}}.
$$

The cross-entropy loss for true class $c$ (one-hot vector $\vv y$) is $L = -\log p_c = -\sum_i y_i\log p_i$.

Softmax with numbers: logits $\vv z = (1, 2, 3)$ give $e^{\vv z} \approx (2.72, 7.39, 20.09)$, which sum to $30.19$. Dividing: $\vv p \approx (0.09, 0.24, 0.67)$. The exponential makes everything positive, and dividing by the total makes the entries sum to 1. The largest logit gets the largest probability.

A **one-hot** vector has a single 1 and zeros elsewhere: true class 3 of 3 is $\vv y = (0, 0, 1)$. So $-\sum_i y_i\log p_i$ just picks out $-\log p_c$. Here $L = -\log 0.67 \approx 0.40$.

The formulas below use the **Kronecker delta**: $\delta_{ij} = 1$ if $i = j$ and $0$ otherwise. It's just the entries of the identity matrix, and $y_j = \delta_{jc}$.

!!! theorem "Softmax Jacobian"
    $\dfrac{\partial p_i}{\partial z_j} = p_i(\delta_{ij} - p_j)$, i.e. $J = \diag(\vv p) - \vv p\vv p^\top$.

!!! proof "Proof"
    1. $\log p_i = z_i - \log\sum_k e^{z_k}$. (Log of a quotient is a difference, and $\log e^{z_i} = z_i$.)
    2. Differentiate with respect to $z_j$: $\frac{1}{p_i}\frac{\partial p_i}{\partial z_j} = \delta_{ij} - \frac{e^{z_j}}{\sum_k e^{z_k}} = \delta_{ij} - p_j$.
    3. Multiply by $p_i$.

    In step 2, each piece separately:

    - Left side: chain rule on $\log p_i$ gives $\frac{1}{p_i}\cdot\frac{\partial p_i}{\partial z_j}$.
    - $\frac{\partial z_i}{\partial z_j}$ is $1$ if $i = j$, else $0$: that's $\delta_{ij}$.
    - $\frac{\partial}{\partial z_j}\log S$ with $S = \sum_k e^{z_k}$ is $\frac{1}{S}\cdot\frac{\partial S}{\partial z_j} = \frac{e^{z_j}}{S}$, since only the $k = j$ term of the sum involves $z_j$.

    (Differentiating the log first, instead of using the quotient rule on $p_i$ directly, is a standard trick: it turns the quotient into a difference.)

!!! theorem "Softmax + cross-entropy gradient"
    $$
    \nabla_{\vv z}L = \vv p - \vv y.
    $$

!!! proof "Proof"
    $L = -z_c + \log\sum_k e^{z_k}$. Then

    $$
    \frac{\partial L}{\partial z_j} = -\delta_{jc} + \frac{e^{z_j}}{\sum_ke^{z_k}} = p_j - y_j.
    $$

!!! intuition "Why this is beautiful"
    The gradient is simply **prediction minus truth**. If the model gives the correct class probability 0.7:

    - the gradient on the correct logit is $-0.3$ (push it up);
    - every wrong class gets $+p_j$ (push it down in proportion to its probability).

    It's bounded, never vanishes while the model is wrong, and is trivial to compute.

    The same form, $\hat y - y$, appears elsewhere:

    | Model | Output + loss |
    |---|---|
    | logistic regression | sigmoid + binary cross-entropy |
    | linear regression | identity + squared error |

    That's no coincidence: they're all "canonical link" generalized linear models ([Estimation](../statistics/estimation.md)).

## 6. A few more identities worth knowing

| $f$ | $\nabla f$ | Notes |
|---|---|---|
| $\vv a^\top X\vv b$ | $\nabla_X = \vv a\vv b^\top$ | |
| $\tr(AX)$ | $\nabla_X = A^\top$ | |
| $\tr(X^\top AX)$ | $\nabla_X = (A + A^\top)X$ | |
| $\norm{X}_F^2$ | $\nabla_X = 2X$ | weight decay |
| $\log\det X$ ($X\succ0$) | $\nabla_X = X^{-1}$ | Gaussian likelihoods |
| $\log\sum_i e^{x_i}$ | $\nabla_{\vv x} = \operatorname{softmax}(\vv x)$ | |
| $\norm{\vv x}_2$ | $\vv x/\norm{\vv x}$ | for $\vv x\neq\vv 0$ |

??? proof "Proof of $\nabla\log\det X = X^{-1}$ for symmetric positive definite $X$ (deeper)"
    1. $\log\det(X + dX) = \log\det X + \log\det(I + X^{-1}dX)$.
    2. For small $E$, $\det(I + E) = 1 + \tr E + O(\norm E^2)$: the product of the eigenvalues $1 + \epsilon_i$ is $1 + \sum\epsilon_i$ to first order.
    3. And $\log(1 + t) \approx t$.
    4. So $d\log\det X = \tr(X^{-1}dX)$, which gives $\nabla = (X^{-1})^\top = X^{-1}$.

## 7. Always check numerically

The best habit when deriving gradients: compare with **finite differences**.

$$
\frac{\partial f}{\partial x_i} \approx \frac{f(\vv x + \epsilon\vv e_i) - f(\vv x - \epsilon\vv e_i)}{2\epsilon}, \qquad \epsilon\approx10^{-5}.
$$

The central difference has error $O(\epsilon^2)$ (by Taylor: the even-order terms cancel).

In detail: $f(x \pm \epsilon) = f(x) \pm \epsilon f'(x) + \frac{\epsilon^2}{2}f''(x) \pm \frac{\epsilon^3}{6}f'''(x) + \cdots$ Subtracting, the $f(x)$ and $\epsilon^2$ terms cancel, leaving $2\epsilon f'(x) + O(\epsilon^3)$. Divide by $2\epsilon$.

!!! example "Example: checking $\nabla\norm{\vv x}^2 = 2\vv x$ numerically"
    At $\vv x = (1, 2)$ the formula predicts $(2, 4)$. With $\epsilon = 0.001$, the first component:

    $$
    \frac{\norm{(1.001, 2)}^2 - \norm{(0.999, 2)}^2}{0.002} = \frac{5.002001 - 4.998001}{0.002} = 2.000. \ ✓
    $$

    In code, you'd loop over every coordinate, nudge it both ways, and compare against your analytic gradient.

If your analytic gradient and this estimate disagree beyond about $10^{-6}$ relative error, there's a bug. This "gradient check" has saved countless ML implementations.

!!! ml "Where this shows up"
    - **Every model's training loop.** $\vv p - \vv y$ is literally what flows backward from the output of every classifier and every language model at every token.
    - **Closed-form solutions:** linear regression, ridge, Gaussian MLE for $\Sigma$ (uses the $\log\det$ identity), and LDA all come from setting a matrix gradient to zero.
    - **Reading papers:** derivations in optimization, Gaussian processes and variational inference are chains of these identities.

## Check yourself

**1.** Find $\nabla_{\vv x}\big(\vv x^\top A\vv x + \vv b^\top\vv x + c\big)$ for symmetric $A$, and the minimizer when $A \succ 0$.

??? success "Solution"
    - Gradient: $2A\vv x + \vv b$.
    - Setting it to zero: $\vv x^* = -\frac12A^{-1}\vv b$.

**2.** Derive the ridge regression solution from the gradient above.

??? success "Solution"
    $$
    2X^\top X\vv w - 2X^\top\vv y + 2\lambda\vv w = 0 \quad\Rightarrow\quad (X^\top X + \lambda I)\vv w = X^\top\vv y.
    $$

    The matrix is invertible for $\lambda > 0$, because its eigenvalues are $\geq\lambda > 0$.

**3.** Logistic regression: $p = \sigma(\vv w^\top\vv x)$, $L = -[y\log p + (1 - y)\log(1-p)]$. Show $\nabla_{\vv w}L = (p - y)\vv x$.

??? success "Solution"
    Chain rule, one factor at a time:

    1. $\frac{\partial L}{\partial p} = -\frac yp + \frac{1-y}{1-p} = \frac{p - y}{p(1-p)}$.
    2. $\frac{\partial p}{\partial(\vv w^\top\vv x)} = p(1-p)$.
    3. Multiply: $p - y$.
    4. Then $\nabla_{\vv w}(\vv w^\top\vv x) = \vv x$.

**4.** Logits $\vv z = (2, 1, 0)$, true class 1 (the first). Compute $\vv p$ and the gradient.

??? success "Solution"
    | | class 1 | class 2 | class 3 |
    |---|---|---|---|
    | $e^{z_i}$ | $7.389$ | $2.718$ | $1$ |
    | $p_i$ (divide by $11.107$) | $0.665$ | $0.245$ | $0.090$ |
    | gradient $p_i - y_i$ | $-0.335$ | $0.245$ | $0.090$ |

    The components sum to 0, as they always do (since $\sum p_i = \sum y_i = 1$).

**5.** Verify that the softmax Jacobian $\diag(\vv p) - \vv p\vv p^\top$ has $(1, \ldots, 1)$ in its null space. Why must it?

??? success "Solution"
    $$
    (\diag(\vv p) - \vv p\vv p^\top)\mathbf 1 = \vv p - \vv p(\vv p^\top\mathbf 1) = \vv p - \vv p = \vv 0.
    $$

    It must: adding the same constant to all logits doesn't change the softmax, so the derivative in that direction is zero.

**6.** For $f(W) = \norm{W\vv x - \vv y}^2$, find $\nabla_W f$.

??? success "Solution"
    With $\vv r = W\vv x - \vv y$:

    $$
    df = 2\vv r^\top dW\vv x = \tr\big((2\vv r\vv x^\top)^\top dW\big),
    $$

    so $\nabla_Wf = 2(W\vv x - \vv y)\vv x^\top$.
