---
description: "The Hessian matrix and second-order Taylor expansion: classifying critical points, curvature and condition number, and Newton's method in many dimensions."
---

# The Hessian and second-order Taylor

<div class="lesson-meta" markdown>
**Phase 4 · Lesson 3** · ⏱ ~3 hours · Needs: [Jacobians and the chain rule](chain-rule.md), [Symmetric matrices](../linear-algebra/spectral.md)
</div>

The gradient tells you the slope. The **Hessian** tells you the curvature:

- whether you're in a bowl, on a dome, or on a saddle;
- how stretched the bowl is.

That's what decides whether a critical point is a minimum, and how fast gradient descent can get there.

## 1. Second partial derivatives and the Hessian

Differentiate the partial derivatives again: $\frac{\partial^2 f}{\partial x_i\partial x_j} = \frac{\partial}{\partial x_i}\left(\frac{\partial f}{\partial x_j}\right)$.

Shorthand: $f_{xx} = \frac{\partial^2 f}{\partial x^2}$, $\ f_{yy} = \frac{\partial^2 f}{\partial y^2}$, and the **mixed** partial $f_{xy} = \frac{\partial}{\partial y}\left(\frac{\partial f}{\partial x}\right)$: first differentiate by $x$, then by $y$.

!!! example "Example: all four second partials"
    $f(x, y) = x^2y^3$.

    1. First partials: $f_x = 2xy^3$ and $f_y = 3x^2y^2$.
    2. Differentiate each again, by each variable:

    | | then by $x$ | then by $y$ |
    |---|---|---|
    | $f_x = 2xy^3$ | $f_{xx} = 2y^3$ | $f_{xy} = 6xy^2$ |
    | $f_y = 3x^2y^2$ | $f_{yx} = 6xy^2$ | $f_{yy} = 6x^2y$ |

    The two mixed partials came out equal, by two different routes. That's no accident (theorem below).

**What each one means:**

- $f_{xx}$: how the $x$-slope changes as you move in $x$. The curvature of the slice in the $x$-direction.
- $f_{yy}$: the same for $y$.
- $f_{xy}$: how the $x$-slope changes as you move in $y$. It measures **twist**. For $f = xy$, the $x$-slope is $y$: flat along the $x$-axis, uphill above it, downhill below it.

!!! definition "Definition: Hessian"
    For $f : \R^n\to\R$, the **Hessian** is the $n\times n$ matrix of second partials:

    $$
    H_f(\vv x) = \begin{pmatrix}\frac{\partial^2 f}{\partial x_1^2} & \cdots & \frac{\partial^2 f}{\partial x_1\partial x_n}\\ \vdots & \ddots & \vdots\\ \frac{\partial^2 f}{\partial x_n\partial x_1} & \cdots & \frac{\partial^2 f}{\partial x_n^2}\end{pmatrix}.
    $$

    It is the Jacobian of the gradient: $H_f = J_{\nabla f}$.

    (The gradient is a map $\R^n \to \R^n$. Row $i$ of its Jacobian differentiates the $i$-th component $\partial f/\partial x_i$ by each variable in turn.)

For two variables:

$$
H = \begin{pmatrix}f_{xx} & f_{xy}\\f_{yx} & f_{yy}\end{pmatrix}.
$$

!!! theorem "Theorem (Schwarz/Clairaut): mixed partials commute"
    If the second partial derivatives are continuous, then $\frac{\partial^2 f}{\partial x_i\partial x_j} = \frac{\partial^2f}{\partial x_j\partial x_i}$. So **the Hessian is symmetric**.

The proof applies the mean value theorem twice to the "second difference"

$$
f(x + h, y + k) - f(x+h, y) - f(x, y+k) + f(x, y),
$$

which is symmetric in the roles of $x$ and $y$.

Symmetry is what lets us use the [spectral theorem](../linear-algebra/spectral.md): the Hessian has real eigenvalues and perpendicular eigenvectors.

!!! example "Example"
    $f(x, y) = x^3 - 3x + y^2$:

    - $\nabla f = (3x^2 - 3, 2y)$
    - $H = \begin{pmatrix}6x & 0\\0 & 2\end{pmatrix}$

## 2. Second-order Taylor expansion

!!! theorem "Second-order Taylor expansion"
    $$
    f(\vv x + \vv h) = f(\vv x) + \nabla f(\vv x)^\top\vv h + \tfrac12\vv h^\top H_f(\vv x)\,\vv h + o(\norm{\vv h}^2).
    $$

!!! proof "Proof"
    Reduce to one variable. Let $g(t) = f(\vv x + t\vv h)$.

    1. By the chain rule, $g'(t) = \nabla f(\vv x + t\vv h)\cdot\vv h = \sum_i h_i\,\partial_if$.
    2. Differentiating again, $g''(t) = \sum_{i,j}h_ih_j\,\partial_j\partial_i f = \vv h^\top H\vv h$.
    3. The 1D Taylor expansion $g(1) = g(0) + g'(0) + \frac12g''(0) + \ldots$ gives the result.

    (Step 2 differentiates each $\partial_i f(\vv x + t\vv h)$ by the same chain rule as step 1, giving $\sum_j h_j\,\partial_j\partial_i f$. A double sum $\sum_{i,j}h_i M_{ij} h_j$ is exactly $\vv h^\top M\vv h$.)

In two variables, with $\vv h = (h_1, h_2)$, the quadratic term written out is

$$
\tfrac12\vv h^\top H\vv h = \tfrac12\left(f_{xx}h_1^2 + 2f_{xy}h_1h_2 + f_{yy}h_2^2\right).
$$

(The $2f_{xy}$ appears because the two off-diagonal entries each contribute one $h_1h_2$, as in the [quadratic forms](../linear-algebra/spectral.md#2-quadratic-forms) section.) With one variable it's the familiar $\frac12 f''h^2$.

!!! example "Example: a second-order approximation, with numbers"
    Approximate $f(x, y) = x^2y$ near $(1, 2)$, where $f = 2$.

    - $\nabla f = (2xy, x^2) = (4, 1)$.
    - $f_{xx} = 2y = 4$, $\ f_{xy} = 2x = 2$, $\ f_{yy} = 0$.

    For a step $\vv h = (0.1, 0.1)$:

    | Order | Formula | Value |
    |---|---|---|
    | 0 | $f$ | $2$ |
    | 1 | $+\ 4(0.1) + 1(0.1)$ | $2.5$ |
    | 2 | $+\ \frac12\big(4(0.01) + 2\cdot2(0.01) + 0\big)$ | $2.54$ |

    The true value is $f(1.1, 2.1) = 1.21 \cdot 2.1 = 2.541$. Each order gets closer.

!!! intuition "Every smooth function is locally a quadratic bowl, dome or saddle"
    Near a point, $f$ looks like a constant + a tilted plane + a quadratic form.

    At a **critical point** ($\nabla f = \vv 0$) the plane vanishes, and the quadratic form $\frac12\vv h^\top H\vv h$ is the whole local picture. Its shape is determined by the eigenvalues of $H$.

## 3. Classifying critical points

At a critical point, write $\vv h$ in the orthonormal eigenbasis of $H$, $\vv h = \sum y_i\vv q_i$:

$$
f(\vv x + \vv h) - f(\vv x) \approx \tfrac12\sum_i\lambda_iy_i^2.
$$

!!! theorem "Second derivative test"
    At a critical point $\vv x$ (with $H$ the Hessian there):

    | Eigenvalues of $H$ | Conclusion |
    |---|---|
    | all $\lambda_i > 0$ ($H$ positive definite) | **strict local minimum** |
    | all $\lambda_i < 0$ | **strict local maximum** |
    | some positive, some negative | **saddle point**: up in some directions, down in others |
    | some $\lambda_i = 0$, the rest of one sign | inconclusive (higher-order terms decide) |

!!! proof "Proof (minimum case)"
    **Minimum.** If all $\lambda_i \geq \lambda_{\min} > 0$:

    1. $\frac12\vv h^\top H\vv h \geq \frac12\lambda_{\min}\norm{\vv h}^2$.
    2. The remainder is $o(\norm{\vv h}^2)$, so for small enough $\vv h \neq \vv 0$ it's smaller than $\frac14\lambda_{\min}\norm{\vv h}^2$.
    3. So $f(\vv x + \vv h) - f(\vv x) \geq \frac14\lambda_{\min}\norm{\vv h}^2 > 0$.

    **Saddle.** Moving along an eigenvector with $\lambda > 0$ increases $f$; along one with $\lambda < 0$ it decreases $f$.

!!! example "Example"
    $f = x^3 - 3x + y^2$ has critical points $(\pm1, 0)$.

    | Point | $H$ | Conclusion |
    |---|---|---|
    | $(1, 0)$ | $\diag(6, 2)$: positive definite | local minimum |
    | $(-1, 0)$ | $\diag(-6, 2)$: mixed signs | saddle |

    (A diagonal matrix's eigenvalues are its diagonal entries.) At $(-1, 0)$: moving in $x$ goes down ($\lambda = -6$), moving in $y$ goes up ($\lambda = 2$).

!!! example "Example: when the Hessian isn't diagonal"
    $f(x, y) = x^2 + 4xy + y^2$ has $\nabla f = (2x + 4y,\ 4x + 2y)$, which is zero only at the origin.

    $$
    H = \begin{pmatrix}2 & 4\\4 & 2\end{pmatrix}, \qquad \tr H = 4,\ \det H = -12, \qquad \lambda = 6, -2.
    $$

    Mixed signs: a **saddle**. The eigenvectors say which way is which:

    - along $(1, 1)$ ($\lambda = 6$): $\ f(t, t) = t^2 + 4t^2 + t^2 = 6t^2$, going up;
    - along $(1, -1)$ ($\lambda = -2$): $\ f(t, -t) = t^2 - 4t^2 + t^2 = -2t^2$, going down.

    Notice both diagonal entries are positive ($f$ curves up along each *axis*), yet it's still a saddle. Checking only $f_{xx}$ and $f_{yy}$ is a classic mistake. The cross term matters.

!!! example "Example: the inconclusive case"
    At the origin, $x^4 + y^4$ (a minimum), $-x^4 - y^4$ (a maximum) and $x^4 - y^4$ (a saddle) all have $H = 0$. The Hessian can't tell them apart; you have to look at higher-order terms.

For $2\times2$ Hessians, a shortcut:

| Condition | Conclusion |
|---|---|
| $\det H > 0$ and $f_{xx} > 0$ | min |
| $\det H > 0$ and $f_{xx} < 0$ | max |
| $\det H < 0$ | saddle (the eigenvalues have opposite signs, because their product is negative) |

!!! intuition "Saddles dominate in high dimensions"
    For a random critical point of a function of $n$ variables, being a minimum requires *all* $n$ eigenvalues to be positive. If each sign were a coin flip, that's probability $2^{-n}$.

    - In neural networks with millions of parameters, most critical points with high loss are saddles, not bad local minima.
    - Gradient descent with noise tends to escape them, which is part of why training works.

## 4. Curvature and conditioning

Near a minimum, $f(\vv x^* + \vv h) \approx f(\vv x^*) + \frac12\vv h^\top H\vv h$.

The contours are ellipses with axes along the eigenvectors, and semi-axes proportional to $1/\sqrt{\lambda_i}$.

- Large $\lambda$: steep, narrow direction.
- Small $\lambda$: flat, wide direction.

The **condition number** $\kappa = \lambda_{\max}/\lambda_{\min}$ measures how elongated the bowl is.

**Where $\eta < 2/\lambda$ comes from.** Along one eigen-direction, the bowl is just $\frac12\lambda h^2$, with derivative $\lambda h$. One gradient step does

$$
h \leftarrow h - \eta\lambda h = (1 - \eta\lambda)\,h.
$$

So each step multiplies the distance from the minimum by $1 - \eta\lambda$.

| $\eta\lambda$ | factor $1 - \eta\lambda$ | behavior |
|---|---|---|
| $0.1$ | $0.9$ | slow, steady approach |
| $1$ | $0$ | lands exactly on the minimum in one step |
| $1.5$ | $-0.5$ | overshoots, but the overshoots shrink |
| $2.5$ | $-1.5$ | overshoots grow: diverges |

It converges exactly when $\lvert 1 - \eta\lambda\rvert < 1$, i.e. $0 < \eta\lambda < 2$, i.e. $\eta < 2/\lambda$.

Gradient descent struggles when $\kappa$ is large:

1. The learning rate must be small enough not to overshoot in the steep direction: $\eta < 2/\lambda_{\max}$.
2. That makes progress along the flat direction painfully slow: its factor is $1 - \eta\lambda_{\min} \approx 1 - 2/\kappa$, barely below 1.
3. You get the characteristic **zigzag**: bouncing across the steep direction while crawling along the flat one.

Try a learning rate near 0.2 on the "narrow valley" in the [gradient descent figure](../optimization/gradient-descent.md#3-why-ill-conditioning-hurts).

## 5. Newton's method in n dimensions

Minimize the quadratic model $f(\vv x) + \nabla f^\top\vv h + \frac12\vv h^\top H\vv h$ exactly.

Its gradient in $\vv h$ is $\nabla f + H\vv h$, which is zero at

$$
\vv h = -H^{-1}\nabla f, \qquad \vv x_{k+1} = \vv x_k - H^{-1}\nabla f(\vv x_k).
$$

(This is the $n$-dimensional version of $x - f'(x)/f''(x)$ from [Using derivatives](../calculus/applications.md#6-newtons-method): dividing by $f''$ becomes multiplying by $H^{-1}$.)

Newton's method rescales each eigen-direction by $1/\lambda_i$, undoing the elongation of the bowl. On a quadratic it reaches the minimum in **one step**, regardless of the condition number.

!!! example "Example: one Newton step on an elongated bowl"
    $f(x, y) = x^2 + 50y^2$ (so $\kappa = 50$), starting at $(2, 1)$.

    - $\nabla f = (2x, 100y) = (4, 100)$ and $H = \diag(2, 100)$, so $H^{-1}\nabla f = (4/2, 100/100) = (2, 1)$.
    - Newton step: $(2, 1) - (2, 1) = (0, 0)$. The minimum, in one step.

    Gradient descent would need $\eta < 2/100 = 0.02$, and then the $x$-coordinate shrinks only by the factor $1 - 0.02 \cdot 2 = 0.96$ per step.

The catch: forming and solving with $H$ costs $O(n^2)$ memory and $O(n^3)$ time.

That's impossible for $n = 10^9$. So deep learning uses first-order methods with cheap curvature approximations (Adam, Shampoo, K-FAC).

!!! ml "Where this shows up"
    - **Loss landscape analysis:** the top Hessian eigenvalue $\lambda_{\max}$ ("sharpness") is studied in connection with generalization.
        - At the "edge of stability", training self-tunes to $\lambda_{\max} \approx 2/\eta$.
    - **Learning rate limits** come from $\eta < 2/\lambda_{\max}$.
    - **Batch normalization, feature standardization and preconditioning** all aim to reduce the condition number of the effective Hessian.
    - **Laplace approximation** in Bayesian deep learning approximates the posterior by a Gaussian whose covariance is $H^{-1}$ at the optimum.

## Check yourself

**1.** Compute the Hessian of $f(x,y) = x^2y + y^3$ and verify it's symmetric.

??? success "Solution"
    - First partials: $f_x = 2xy$, $f_y = x^2 + 3y^2$.
    - Second partials: $f_{xx} = 2y$, $f_{xy} = 2x = f_{yx}$, $f_{yy} = 6y$.

    $$
    H = \begin{pmatrix}2y & 2x\\2x & 6y\end{pmatrix}.
    $$

**2.** Find and classify the critical points of $f(x,y) = x^2 + xy + y^2 - 3x$.

??? success "Solution"
    - $\nabla f = (2x + y - 3, x + 2y) = 0$ gives $x = 2$, $y = -1$.
    - $H = \begin{pmatrix}2&1\\1&2\end{pmatrix}$, with eigenvalues 3 and 1 (both positive).

    So $(2, -1)$ is a minimum.

**3.** Classify the critical point of $f(x, y) = xy$ at the origin.

??? success "Solution"
    $H = \begin{pmatrix}0&1\\1&0\end{pmatrix}$ with eigenvalues $\pm1$: a saddle.

    $f > 0$ along $y = x$, and $f<0$ along $y = -x$.

**4.** Show that for $f(\vv x) = \frac12\vv x^\top A\vv x - \vv b^\top\vv x$ with $A$ symmetric, $\nabla f = A\vv x - \vv b$ and $H = A$. Then show Newton's method from any start lands on the minimum in one step.

??? success "Solution"
    Expand exactly:

    $$
    f(\vv x + \vv h) = f(\vv x) + (A\vv x - \vv b)^\top\vv h + \tfrac12\vv h^\top A\vv h.
    $$

    This identifies the gradient and Hessian.

    Newton step: $\vv x - A^{-1}(A\vv x - \vv b) = A^{-1}\vv b$, which is where the gradient vanishes.

**5.** A quadratic bowl has Hessian eigenvalues 100 and 0.01. What's its condition number, and what's the largest stable learning rate for gradient descent?

??? success "Solution"
    - $\kappa = 10^4$.
    - Need $\eta < 2/100 = 0.02$.
    - Along the flat direction, each step then shrinks the error only by a factor $1 - 0.02\cdot0.01 = 0.9998$: tens of thousands of steps.

**6.** Use the second-order Taylor expansion to approximate $f(x, y) = e^{x}\cos y$ near $(0, 0)$.

??? success "Solution"
    At the origin:

    - $f(0,0) = 1$
    - $\nabla f = (1, 0)$
    - $H = \begin{pmatrix}1 & 0\\0 & -1\end{pmatrix}$

    So $f \approx 1 + x + \frac12x^2 - \frac12y^2$.
