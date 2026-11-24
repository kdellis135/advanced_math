# The Hessian and second-order Taylor

<div class="lesson-meta" markdown>
**Phase 4 · Lesson 3** · ⏱ ~3 hours · Needs: [Jacobians and the chain rule](chain-rule.md), [Symmetric matrices](../linear-algebra/spectral.md)
</div>

The gradient tells you the slope. The **Hessian** tells you the curvature: whether you're in a bowl, on a dome, or on a saddle, and how stretched the bowl is. That's what decides whether a critical point is a minimum, and how fast gradient descent can get there.

## 1. Second partial derivatives and the Hessian

Differentiate the partial derivatives again: $\frac{\partial^2 f}{\partial x_i\partial x_j} = \frac{\partial}{\partial x_i}\left(\frac{\partial f}{\partial x_j}\right)$.

!!! definition "Definition: Hessian"
    For $f : \R^n\to\R$, the **Hessian** is the $n\times n$ matrix of second partials:

    $$
    H_f(\vv x) = \begin{pmatrix}\frac{\partial^2 f}{\partial x_1^2} & \cdots & \frac{\partial^2 f}{\partial x_1\partial x_n}\\ \vdots & \ddots & \vdots\\ \frac{\partial^2 f}{\partial x_n\partial x_1} & \cdots & \frac{\partial^2 f}{\partial x_n^2}\end{pmatrix}.
    $$

    It is the Jacobian of the gradient: $H_f = J_{\nabla f}$.

!!! theorem "Theorem (Schwarz/Clairaut): mixed partials commute"
    If the second partial derivatives are continuous, then $\frac{\partial^2 f}{\partial x_i\partial x_j} = \frac{\partial^2f}{\partial x_j\partial x_i}$. So **the Hessian is symmetric**.

(The proof applies the mean value theorem twice to the "second difference" $f(x + h, y + k) - f(x+h, y) - f(x, y+k) + f(x, y)$, which is symmetric in the roles of $x$ and $y$.) Symmetry is what lets us use the [spectral theorem](../linear-algebra/spectral.md): the Hessian has real eigenvalues and perpendicular eigenvectors.

!!! example "Example"
    $f(x, y) = x^3 - 3x + y^2$: $\nabla f = (3x^2 - 3, 2y)$, $H = \begin{pmatrix}6x & 0\\0 & 2\end{pmatrix}$.

## 2. Second-order Taylor expansion

!!! theorem "Second-order Taylor expansion"
    $$
    f(\vv x + \vv h) = f(\vv x) + \nabla f(\vv x)^\top\vv h + \tfrac12\vv h^\top H_f(\vv x)\,\vv h + o(\norm{\vv h}^2).
    $$

!!! proof "Proof"
    Reduce to one variable. Let $g(t) = f(\vv x + t\vv h)$. By the chain rule, $g'(t) = \nabla f(\vv x + t\vv h)\cdot\vv h = \sum_i h_i\,\partial_if$, and differentiating again, $g''(t) = \sum_{i,j}h_ih_j\,\partial_j\partial_i f = \vv h^\top H\vv h$. The 1D Taylor expansion $g(1) = g(0) + g'(0) + \frac12g''(0) + \ldots$ gives the result.

!!! intuition "Every smooth function is locally a quadratic bowl, dome or saddle"
    Near a point, $f$ looks like a constant + a tilted plane + a quadratic form. At a **critical point** ($\nabla f = \vv 0$) the plane vanishes and the quadratic form $\frac12\vv h^\top H\vv h$ is the whole local picture. Its shape is determined by the eigenvalues of $H$.

## 3. Classifying critical points

At a critical point, write $\vv h$ in the orthonormal eigenbasis of $H$, $\vv h = \sum y_i\vv q_i$:

$$
f(\vv x + \vv h) - f(\vv x) \approx \tfrac12\sum_i\lambda_iy_i^2.
$$

!!! theorem "Second derivative test"
    At a critical point $\vv x$ (with $H$ the Hessian there):

    - all $\lambda_i > 0$ ($H$ positive definite) ⇒ **strict local minimum**;
    - all $\lambda_i < 0$ ⇒ **strict local maximum**;
    - some positive, some negative ⇒ **saddle point**: up in some directions, down in others;
    - some $\lambda_i = 0$ and the rest of one sign ⇒ inconclusive (higher-order terms decide).

!!! proof "Proof (minimum case)"
    If all $\lambda_i \geq \lambda_{\min} > 0$, then $\frac12\vv h^\top H\vv h \geq \frac12\lambda_{\min}\norm{\vv h}^2$. The remainder is $o(\norm{\vv h}^2)$, so for small enough $\vv h \neq \vv 0$ it's smaller than $\frac14\lambda_{\min}\norm{\vv h}^2$, giving $f(\vv x + \vv h) - f(\vv x) \geq \frac14\lambda_{\min}\norm{\vv h}^2 > 0$. Saddle: moving along an eigenvector with $\lambda > 0$ increases $f$, along one with $\lambda < 0$ decreases it.

!!! example "Example"
    $f = x^3 - 3x + y^2$ has critical points $(\pm1, 0)$.
    At $(1, 0)$: $H = \diag(6, 2)$, positive definite, so a local minimum.
    At $(-1, 0)$: $H = \diag(-6, 2)$, mixed signs, so a saddle.

For $2\times2$ Hessians, a shortcut: $\det H > 0$ and $f_{xx} > 0$ means min; $\det H > 0$ and $f_{xx} < 0$ means max; $\det H < 0$ means saddle (the eigenvalues have opposite signs because their product is negative).

!!! intuition "Saddles dominate in high dimensions"
    For a random critical point of a function of $n$ variables, being a minimum requires *all* $n$ eigenvalues to be positive. If each sign were a coin flip, that's probability $2^{-n}$. In neural networks with millions of parameters, most critical points with high loss are saddles, not bad local minima. Gradient descent with noise tends to escape them, which is part of why training works.

## 4. Curvature and conditioning

Near a minimum, $f(\vv x^* + \vv h) \approx f(\vv x^*) + \frac12\vv h^\top H\vv h$. The contours are ellipses with axes along the eigenvectors, and semi-axes proportional to $1/\sqrt{\lambda_i}$.

- Large $\lambda$: steep, narrow direction.
- Small $\lambda$: flat, wide direction.

The **condition number** $\kappa = \lambda_{\max}/\lambda_{\min}$ measures how elongated the bowl is. Gradient descent struggles when $\kappa$ is large: the learning rate must be small enough not to overshoot in the steep direction ($\eta < 2/\lambda_{\max}$), which makes progress along the flat direction painfully slow. You get the characteristic **zigzag**. Try a learning rate near 0.2 on the "narrow valley" in the [gradient descent figure](../optimization/gradient-descent.md#3-why-ill-conditioning-hurts).

## 5. Newton's method in n dimensions

Minimize the quadratic model $f(\vv x) + \nabla f^\top\vv h + \frac12\vv h^\top H\vv h$ exactly. Its gradient in $\vv h$ is $\nabla f + H\vv h$, which is zero at

$$
\vv h = -H^{-1}\nabla f, \qquad \vv x_{k+1} = \vv x_k - H^{-1}\nabla f(\vv x_k).
$$

Newton's method rescales each eigen-direction by $1/\lambda_i$, undoing the elongation of the bowl. On a quadratic it reaches the minimum in **one step**, regardless of the condition number. The catch: forming and solving with $H$ costs $O(n^2)$ memory and $O(n^3)$ time. That's impossible for $n = 10^9$, which is why deep learning uses first-order methods with cheap curvature approximations (Adam, Shampoo, K-FAC).

!!! ml "Where this shows up"
    - **Loss landscape analysis:** the top Hessian eigenvalue $\lambda_{\max}$ ("sharpness") is studied in connection with generalization and the "edge of stability", where training self-tunes to $\lambda_{\max} \approx 2/\eta$.
    - **Learning rate limits** come from $\eta < 2/\lambda_{\max}$.
    - **Batch normalization, feature standardization and preconditioning** all aim to reduce the condition number of the effective Hessian.
    - **Laplace approximation** in Bayesian deep learning approximates the posterior by a Gaussian whose covariance is $H^{-1}$ at the optimum.

## Check yourself

**1.** Compute the Hessian of $f(x,y) = x^2y + y^3$ and verify it's symmetric.

??? success "Solution"
    $f_x = 2xy$, $f_y = x^2 + 3y^2$. $f_{xx} = 2y$, $f_{xy} = 2x = f_{yx}$, $f_{yy} = 6y$. $H = \begin{pmatrix}2y & 2x\\2x & 6y\end{pmatrix}$.

**2.** Find and classify the critical points of $f(x,y) = x^2 + xy + y^2 - 3x$.

??? success "Solution"
    $\nabla f = (2x + y - 3, x + 2y) = 0$ gives $x = 2$, $y = -1$. $H = \begin{pmatrix}2&1\\1&2\end{pmatrix}$ with eigenvalues 3 and 1 (both positive), so a minimum.

**3.** Classify the critical point of $f(x, y) = xy$ at the origin.

??? success "Solution"
    $H = \begin{pmatrix}0&1\\1&0\end{pmatrix}$, eigenvalues $\pm1$: a saddle. $f > 0$ along $y = x$ and $f<0$ along $y = -x$.

**4.** Show that for $f(\vv x) = \frac12\vv x^\top A\vv x - \vv b^\top\vv x$ with $A$ symmetric, $\nabla f = A\vv x - \vv b$ and $H = A$. Then show Newton's method from any start lands on the minimum in one step.

??? success "Solution"
    Expand $f(\vv x + \vv h) = f(\vv x) + (A\vv x - \vv b)^\top\vv h + \frac12\vv h^\top A\vv h$ exactly, which identifies the gradient and Hessian. Newton step: $\vv x - A^{-1}(A\vv x - \vv b) = A^{-1}\vv b$, which is where the gradient vanishes.

**5.** A quadratic bowl has Hessian eigenvalues 100 and 0.01. What's its condition number, and what's the largest stable learning rate for gradient descent?

??? success "Solution"
    $\kappa = 10^4$. Need $\eta < 2/100 = 0.02$. Along the flat direction each step then shrinks the error only by a factor $1 - 0.02\cdot0.01 = 0.9998$: tens of thousands of steps.

**6.** Use the second-order Taylor expansion to approximate $f(x, y) = e^{x}\cos y$ near $(0, 0)$.

??? success "Solution"
    $f(0,0) = 1$, $\nabla f = (1, 0)$, $H = \begin{pmatrix}1 & 0\\0 & -1\end{pmatrix}$ at the origin. So $f \approx 1 + x + \frac12x^2 - \frac12y^2$.
