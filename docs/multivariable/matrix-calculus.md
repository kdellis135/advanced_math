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

## 2. The reliable method: differentials

Instead of computing partial derivatives one by one, compute the **first-order change** $df$ caused by a small change $d\vv x$, and massage it into the form

$$
df = \vv g^\top d\vv x \quad\Longrightarrow\quad \nabla f = \vv g.
$$

For matrices, use the trace inner product $\langle A, B\rangle = \tr(A^\top B) = \sum_{ij}A_{ij}B_{ij}$:

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

## 3. The core identities, derived

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
    Let $\vv r = X\vv w - \vv y$, so $d\vv r = X\,d\vv w$. Then

    $$
    d(\vv r^\top\vv r) = 2\vv r^\top d\vv r = 2\vv r^\top X\,d\vv w = \big(2X^\top\vv r\big)^\top d\vv w.
    $$

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

    **For a batch** (inputs as rows of $X$, outputs $Z = XW^\top$, error signals as rows of $\Delta$): $\nabla_WL = \Delta^\top X$, the sum of per-example outer products.

## 4. Softmax and cross-entropy: the most important gradient in ML

A classifier outputs scores (**logits**) $\vv z \in \R^K$. Softmax turns them into probabilities:

$$
p_i = \frac{e^{z_i}}{\sum_k e^{z_k}}.
$$

The cross-entropy loss for true class $c$ (one-hot vector $\vv y$) is $L = -\log p_c = -\sum_i y_i\log p_i$.

!!! theorem "Softmax Jacobian"
    $\dfrac{\partial p_i}{\partial z_j} = p_i(\delta_{ij} - p_j)$, i.e. $J = \diag(\vv p) - \vv p\vv p^\top$.

!!! proof "Proof"
    1. $\log p_i = z_i - \log\sum_k e^{z_k}$.
    2. Differentiate with respect to $z_j$: $\frac{1}{p_i}\frac{\partial p_i}{\partial z_j} = \delta_{ij} - \frac{e^{z_j}}{\sum_k e^{z_k}} = \delta_{ij} - p_j$.
    3. Multiply by $p_i$.

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

## 5. A few more identities worth knowing

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

## 6. Always check numerically

The best habit when deriving gradients: compare with **finite differences**.

$$
\frac{\partial f}{\partial x_i} \approx \frac{f(\vv x + \epsilon\vv e_i) - f(\vv x - \epsilon\vv e_i)}{2\epsilon}, \qquad \epsilon\approx10^{-5}.
$$

The central difference has error $O(\epsilon^2)$ (by Taylor: the even-order terms cancel).

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
