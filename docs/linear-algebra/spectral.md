# Symmetric matrices and the spectral theorem

<div class="lesson-meta" markdown>
**Phase 3 · Lesson 8** · ⏱ ~3 hours · Needs: [Eigenvalues and eigenvectors](eigen.md), [Orthogonality](orthogonality.md)
</div>

General matrices can be badly behaved:

- complex eigenvalues;
- skewed, non-perpendicular eigenvectors;
- some can't be diagonalized at all.

**Symmetric** matrices ($A^\top = A$) have none of these problems: their eigenvalues are real and their eigenvectors are perpendicular.

That matters because the matrices you'll meet most often are symmetric: covariance matrices, Hessians, Gram matrices $X^\top X$, graph Laplacians, kernel matrices.

See the contrast with two matrices that have the same eigenvalues, $3$ and $1$:

| Matrix | Symmetric? | Eigenvectors | Angle between them |
|---|---|---|---|
| $\begin{pmatrix}3 & 2\\0 & 1\end{pmatrix}$ | no | $(1, 0)$ and $(1, -1)$ | $45°$ |
| $\begin{pmatrix}2 & 1\\1 & 2\end{pmatrix}$ | yes | $(1, 1)$ and $(1, -1)$ | $90°$ |

(Check the first: $(1, -1) \mapsto (3 - 2, -1) = (1, -1)$, eigenvalue $1$.) The non-symmetric one stretches along skewed axes; the symmetric one along perpendicular axes. That difference is what this lesson is about.

## 1. The spectral theorem

!!! theorem "Spectral theorem"
    If $A$ is a real symmetric $n\times n$ matrix, then:

    1. all its eigenvalues are real;
    2. eigenvectors for different eigenvalues are orthogonal;
    3. it has an orthonormal basis of eigenvectors, so

    $$
    A = Q\Lambda Q^\top = \sum_{i=1}^n \lambda_i\,\vv q_i\vv q_i^\top,
    $$

    with $Q$ orthogonal (columns $\vv q_i$ = orthonormal eigenvectors) and $\Lambda$ diagonal and real.

!!! intuition "Every symmetric matrix is a stretch along perpendicular axes"
    No shearing, no rotation: just pick the right perpendicular axes ($\vv q_i$) and stretch each by $\lambda_i$.

    - In 2D, a symmetric matrix maps the unit circle to an ellipse whose axes are the eigenvectors.
    - The sum form says $A$ is a weighted sum of projections onto its eigen-directions: $\vv q_i\vv q_i^\top$ projects onto $\vv q_i$.

!!! proof "Proof of (1): real eigenvalues"
    We don't yet know $\lambda$ is real, so allow complex numbers. Let $A\vv v = \lambda\vv v$ with $\vv v \neq \vv 0$, possibly complex. $\bar{\vv v}$ means "conjugate every entry of $\vv v$."

    Take conjugates of both sides. $A$ is real, so it's unchanged: $A\bar{\vv v} = \bar\lambda\bar{\vv v}$.

    Now compute $\bar{\vv v}^\top A\vv v$ two ways:

    - $\bar{\vv v}^\top(A\vv v) = \lambda\,\bar{\vv v}^\top\vv v$;
    - $(\bar{\vv v}^\top A)\vv v = (A^\top\bar{\vv v})^\top\vv v = (A\bar{\vv v})^\top\vv v = \bar\lambda\,\bar{\vv v}^\top\vv v$, using symmetry.

    Since $\bar{\vv v}^\top\vv v = \sum \bar v_i v_i = \sum|v_i|^2 > 0$ (recall $\bar z z = \lvert z\rvert^2$ from [Complex numbers](../foundations/complex-numbers.md)), we can divide by it and get $\lambda = \bar\lambda$.

    A number equal to its own conjugate has zero imaginary part ($a + bi = a - bi$ forces $b = 0$). So $\lambda$ is real.

!!! proof "Proof of (2): orthogonal eigenvectors"
    Let $A\vv u = \lambda\vv u$ and $A\vv v = \mu\vv v$ with $\lambda \neq \mu$. Then

    $$
    \lambda(\vv u\cdot\vv v) = (A\vv u)\cdot\vv v = \vv u\cdot(A^\top\vv v) = \vv u\cdot(A\vv v) = \mu(\vv u\cdot\vv v).
    $$

    So $(\lambda - \mu)(\vv u\cdot\vv v) = 0$, which forces $\vv u\cdot\vv v = 0$.

    (The second equality is the "transpose moves across the dot product" identity from [Matrices](matrices.md). Symmetry, $A^\top = A$, is used exactly once, in the third equality. For the non-symmetric matrix above, this step fails, and so does the conclusion.)

??? proof "Proof of (3): a full orthonormal eigenbasis (deeper)"
    Induction on $n$. For $n=1$ it's trivial.

    By (1), $A$ has a real eigenvalue $\lambda_1$ with a unit eigenvector $\vv q_1$. Let $W = \{\vv w : \vv w\cdot\vv q_1 = 0\}$, the $(n-1)$-dimensional subspace perpendicular to $\vv q_1$.

    *$A$ maps $W$ into itself:* if $\vv w\cdot\vv q_1 = 0$ then $(A\vv w)\cdot\vv q_1 = \vv w\cdot(A\vv q_1) = \lambda_1\,\vv w\cdot\vv q_1 = 0$.

    So $A$ restricted to $W$ is a symmetric linear map on an $(n-1)$-dimensional space. (In an orthonormal basis of $W$ its matrix is symmetric, by the same identity.)

    - By the induction hypothesis, it has an orthonormal eigenbasis $\vv q_2, \ldots, \vv q_n$ of $W$.
    - Together with $\vv q_1$, that's an orthonormal eigenbasis of $\R^n$.

    This also handles repeated eigenvalues, where (2) alone wouldn't suffice.

!!! example "Example"
    $A = \begin{pmatrix}2&1\\1&2\end{pmatrix}$ has eigenvalues 3, 1 with eigenvectors $(1,1)$ and $(1,-1)$. They are perpendicular, as promised.

    Normalized:

    $$
    A = \underbrace{\tfrac{1}{\sqrt2}\begin{pmatrix}1&1\\1&-1\end{pmatrix}}_{Q}\begin{pmatrix}3&0\\0&1\end{pmatrix}\underbrace{\tfrac{1}{\sqrt2}\begin{pmatrix}1&1\\1&-1\end{pmatrix}}_{Q^\top} = 3\,\vv q_1\vv q_1^\top + 1\,\vv q_2\vv q_2^\top.
    $$

    (Normalizing: $\norm{(1, 1)} = \sqrt2$, so $\vv q_1 = \frac{1}{\sqrt2}(1, 1)$ and $\vv q_2 = \frac{1}{\sqrt 2}(1, -1)$. Here $Q$ happens to equal its own transpose.)

    Verify the sum form, using outer products from [Matrices](matrices.md):

    $$
    3\cdot\frac12\begin{pmatrix}1 & 1\\1 & 1\end{pmatrix} + 1\cdot\frac12\begin{pmatrix}1 & -1\\-1 & 1\end{pmatrix} = \begin{pmatrix}1.5 + 0.5 & 1.5 - 0.5\\1.5 - 0.5 & 1.5 + 0.5\end{pmatrix} = \begin{pmatrix}2 & 1\\1 & 2\end{pmatrix}. \ ✓
    $$

    Each piece $\vv q_i\vv q_i^\top$ is the projection matrix onto the line through $\vv q_i$ (Section 1 of [Orthogonality](orthogonality.md), with $\vv q_i^\top \vv q_i = 1$). So $A$ = "3 × (project onto the diagonal) + 1 × (project onto the anti-diagonal)."

## 2. Quadratic forms

A symmetric matrix defines a **quadratic form**

$$
f(\vv x) = \vv x^\top A\vv x = \sum_{i,j}a_{ij}x_ix_j.
$$

For example:

$$
\begin{pmatrix}x&y\end{pmatrix}\begin{pmatrix}2&1\\1&2\end{pmatrix}\begin{pmatrix}x\\y\end{pmatrix} = 2x^2 + 2xy + 2y^2.
$$

Step by step: first $A\vv x = (2x + y,\ x + 2y)$. Then dot with $\vv x$:

$$
x(2x + y) + y(x + 2y) = 2x^2 + xy + xy + 2y^2 = 2x^2 + 2xy + 2y^2.
$$

The two off-diagonal entries each contribute one $xy$. So in reverse:

| Polynomial term | Goes into |
|---|---|
| $ax^2$ | diagonal entry $a_{11} = a$ |
| $cy^2$ | diagonal entry $a_{22} = c$ |
| $bxy$ | split evenly: $a_{12} = a_{21} = \frac{b}{2}$ |

For example, $x^2 + 6xy + 4y^2$ has matrix $\begin{pmatrix}1 & 3\\3 & 4\end{pmatrix}$.

In eigen-coordinates $\vv y = Q^\top\vv x$, the cross terms disappear:

$$
\vv x^\top A\vv x = \vv x^\top Q\Lambda Q^\top\vv x = \vv y^\top\Lambda\vv y = \lambda_1y_1^2 + \lambda_2y_2^2 + \cdots + \lambda_ny_n^2.
$$

This "principal axes" form shows the shape at a glance.

!!! example "Example: removing the cross term"
    For $A = \begin{pmatrix}2 & 1\\1 & 2\end{pmatrix}$, the new coordinates are $y_1 = \vv q_1\cdot\vv x = \frac{x + y}{\sqrt2}$ and $y_2 = \vv q_2\cdot\vv x = \frac{x - y}{\sqrt 2}$. The claim is

    $$
    2x^2 + 2xy + 2y^2 = 3y_1^2 + 1y_2^2.
    $$

    Check: $3\cdot\frac{(x+y)^2}{2} + \frac{(x - y)^2}{2} = \frac{3x^2 + 6xy + 3y^2 + x^2 - 2xy + y^2}{2} = \frac{4x^2 + 4xy + 4y^2}{2}$. ✓

    In the rotated coordinates there's no $y_1y_2$ term: the shape is lined up with the new axes.

- The level set $\vv x^\top A\vv x = 1$ is an ellipse (ellipsoid) when all $\lambda_i > 0$.
- Its semi-axis lengths are $1/\sqrt{\lambda_i}$ along $\vv q_i$.

Why $1/\sqrt{\lambda_i}$: walking along $\vv q_1$ means $y_2 = 0$, so the equation becomes $\lambda_1 y_1^2 = 1$, i.e. $y_1 = 1/\sqrt{\lambda_1}$. A big eigenvalue means the form grows fast in that direction, so you reach level 1 sooner: a short axis.

For our example, $3y_1^2 + y_2^2 = 1$ is an ellipse with semi-axis $\frac{1}{\sqrt3} \approx 0.58$ along the diagonal and $1$ along the anti-diagonal.

Quadratic forms are what you get from the second-order Taylor expansion of any function ([Hessian](../multivariable/hessian.md)). So this is the local shape of every loss surface.

## 3. Positive definite matrices

!!! definition "Definition"
    A symmetric matrix $A$ is

    - **positive definite** ($A \succ 0$) if $\vv x^\top A\vv x > 0$ for all $\vv x \neq \vv 0$;
    - **positive semidefinite** ($A \succeq 0$) if $\vv x^\top A\vv x \geq 0$ for all $\vv x$.

Picture the graph $z = \vv x^\top A\vv x$ over the plane. In eigen-coordinates it's $\lambda_1 y_1^2 + \lambda_2 y_2^2$, so the signs of the eigenvalues decide the shape:

| Eigenvalues | Example | Shape | Name |
|---|---|---|---|
| both $> 0$ | $x^2 + y^2$ | bowl, minimum at $\vv 0$ | positive definite |
| both $< 0$ | $-x^2 - y^2$ | upside-down bowl | negative definite |
| one $> 0$, one $< 0$ | $x^2 - y^2$ | saddle (up one way, down the other) | indefinite |
| one $> 0$, one $= 0$ | $x^2$ | trough, flat along the $y$-axis | positive semidefinite |

This table is the second-derivative test in two variables, as you'll see in [The Hessian](../multivariable/hessian.md).

!!! theorem "Theorem: tests for positive definiteness"
    For symmetric $A$, the following are equivalent:

    1. $A \succ 0$;
    2. all eigenvalues are positive;
    3. $A = B^\top B$ for some $B$ with independent columns.

    (Semidefinite: same with $\geq 0$ and any $B$.)

!!! proof "Proof"
    - **(1 ⇒ 2):** if $A\vv q = \lambda\vv q$ with $\norm{\vv q} = 1$, then $\lambda = \vv q^\top A\vv q > 0$.
    - **(2 ⇒ 1):** $\vv x^\top A\vv x = \sum\lambda_iy_i^2$ with $\vv y = Q^\top\vv x \neq \vv 0$. That's a sum of non-negative terms, at least one positive.
    - **(3 ⇒ 1):** $\vv x^\top B^\top B\vv x = \norm{B\vv x}^2 > 0$ when $B\vv x \neq \vv 0$, i.e. when $\vv x \neq \vv 0$ (independent columns).
    - **(2 ⇒ 3):** take $B = \Lambda^{1/2}Q^\top$ (invertible, since all $\lambda_i > 0$). Then $B^\top B = Q\Lambda Q^\top = A$.

Consequences:

- **$X^\top X$ is always positive semidefinite**, and covariance matrices are PSD (proof in [Several random variables](../probability/joint.md)).
- A PD matrix is invertible (no zero eigenvalue), and its quadratic form is a bowl with a unique minimum at $\vv 0$.
- For $2\times2$ matrices: $A \succ 0$ iff $a_{11} > 0$ and $\det A > 0$.
    - Why: $\det A = \lambda_1\lambda_2 > 0$ means the eigenvalues have the same sign. Then $a_{11} = \vv e_1^\top A\vv e_1 > 0$ rules out both negative.
    - Example: $\begin{pmatrix}2 & 1\\1 & 2\end{pmatrix}$ has $a_{11} = 2 > 0$ and $\det = 3 > 0$, so it's positive definite.

## 4. The Rayleigh quotient: optimization with eigenvalues

!!! theorem "Theorem: Rayleigh quotient"
    For symmetric $A$ with eigenvalues $\lambda_1 \geq \lambda_2 \geq \cdots \geq \lambda_n$:

    $$
    \max_{\norm{\vv x} = 1}\vv x^\top A\vv x = \lambda_1, \qquad \min_{\norm{\vv x} = 1}\vv x^\top A\vv x = \lambda_n,
    $$

    attained at the corresponding unit eigenvectors.

!!! proof "Proof"
    Let $\vv y = Q^\top\vv x$, so $\norm{\vv y} = \norm{\vv x} = 1$. Then

    $$
    \vv x^\top A\vv x = \sum_i\lambda_iy_i^2 \leq \lambda_1\sum_i y_i^2 = \lambda_1.
    $$

    Equality holds for $\vv y = \vv e_1$, i.e. $\vv x = \vv q_1$. The minimum is symmetric.

    (The inequality replaces every $\lambda_i$ by the largest one, $\lambda_1$, which can only make the sum bigger. And $\sum y_i^2 = 1$ because $\vv y$ is a unit vector.)

!!! example "Example: walking around the unit circle"
    For $f(\vv x) = 2x^2 + 2xy + 2y^2$, put $\vv x = (\cos\theta, \sin\theta)$:

    $$
    f = 2(\cos^2\theta + \sin^2\theta) + 2\cos\theta\sin\theta = 2 + \sin 2\theta.
    $$

    | $\theta$ | $0$ | $45°$ | $90°$ | $135°$ |
    |---|---|---|---|---|
    | $f$ | $2$ | $3$ (max) | $2$ | $1$ (min) |

    The maximum $3$ is at $45°$, the direction $(1, 1)$. The minimum $1$ is at $135°$, the direction $(-1, 1)$. Exactly the two eigenvalues and eigenvectors.

**"Which direction maximizes a quadratic form?" always has the answer "the top eigenvector."**

This is exactly the optimization problem behind PCA (next lesson): the direction of maximum variance in data is the top eigenvector of the covariance matrix.

!!! ml "Where this shows up"
    - **Covariance matrices** are symmetric PSD. Their eigenvectors are the principal components; their eigenvalues are the variances along them ([SVD and PCA](svd.md)).
    - **Hessians** are symmetric.
        - At a critical point, all positive eigenvalues means a minimum; mixed signs mean a saddle.
        - The condition number $\lambda_{\max}/\lambda_{\min}$ controls how fast gradient descent converges.
    - **Kernel methods** (SVMs, Gaussian processes) need the kernel matrix $K_{ij} = k(\vv x_i, \vv x_j)$ to be PSD.
        - That's the definition of a valid kernel.
    - **Graph Laplacians** are symmetric PSD, and their smallest eigenvectors reveal clusters (spectral clustering).

## Check yourself

**1.** Diagonalize $A = \begin{pmatrix}5 & 2\\2 & 2\end{pmatrix}$ as $Q\Lambda Q^\top$.

??? success "Solution"
    $\tr = 7$, $\det = 6$: $\lambda = 6, 1$.

    | $\lambda$ | $A - \lambda I$ | Eigenvector |
    |---|---|---|
    | 6 | $\begin{pmatrix}-1&2\\2&-4\end{pmatrix}$ | $(2,1)$ |
    | 1 | $\begin{pmatrix}4&2\\2&1\end{pmatrix}$ | $(1, -2)$ |

    They're perpendicular. So $Q = \frac1{\sqrt5}\begin{pmatrix}2&1\\1&-2\end{pmatrix}$ and $\Lambda = \diag(6, 1)$.

**2.** Is $\begin{pmatrix}1 & 2\\2 & 1\end{pmatrix}$ positive definite? Find an $\vv x$ that shows it.

??? success "Solution"
    $\det = -3 < 0$, so the eigenvalues are $3$ and $-1$: not PD.

    $\vv x = (1,-1)$ gives $\vv x^\top A\vv x = 1 - 4 + 1 = -2 < 0$.

**3.** Write $3x^2 + 2xy + 3y^2$ as $\vv x^\top A\vv x$ and find its principal axes. What does $3x^2 + 2xy + 3y^2 = 1$ look like?

??? success "Solution"
    $A = \begin{pmatrix}3&1\\1&3\end{pmatrix}$ (split the $2xy$ evenly between the off-diagonal entries).

    - Eigenvalue 4 along $(1,1)$.
    - Eigenvalue 2 along $(1,-1)$.

    The curve is an ellipse with semi-axes $\frac12$ along the diagonal and $\frac1{\sqrt2}$ along the anti-diagonal.

**4.** Show that if $A \succ 0$ then $A^{-1} \succ 0$.

??? success "Solution"
    The eigenvalues of $A^{-1}$ are $1/\lambda_i > 0$, and $A^{-1}$ is symmetric.

    So it's PD.

**5.** Find the maximum of $2x^2 + 2xy + 2y^2$ on the unit circle, and where it's attained.

??? success "Solution"
    $A = \begin{pmatrix}2&1\\1&2\end{pmatrix}$, $\lambda_{\max} = 3$ at $\pm\frac{1}{\sqrt2}(1,1)$.

**6.** Prove that for any matrix $X$, the eigenvalues of $X^\top X$ are non-negative.

??? success "Solution"
    If $X^\top X\vv v = \lambda\vv v$ with $\norm{\vv v} = 1$, then

    $$
    \lambda = \vv v^\top X^\top X\vv v = \norm{X\vv v}^2 \geq 0.
    $$
