# Symmetric matrices and the spectral theorem

<div class="lesson-meta" markdown>
**Phase 3 · Lesson 8** · ⏱ ~3 hours · Needs: [Eigenvalues and eigenvectors](eigen.md), [Orthogonality](orthogonality.md)
</div>

General matrices can have complex eigenvalues and skewed, non-perpendicular eigenvectors, and some can't be diagonalized at all. **Symmetric** matrices ($A^\top = A$) have none of these problems: their eigenvalues are real and their eigenvectors are perpendicular. That matters because the matrices you'll meet most often are symmetric: covariance matrices, Hessians, Gram matrices $X^\top X$, graph Laplacians, kernel matrices.

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
    No shearing, no rotation: just pick the right perpendicular axes ($\vv q_i$) and stretch each by $\lambda_i$. In 2D, a symmetric matrix maps the unit circle to an ellipse whose axes are the eigenvectors. The sum form says $A$ is a weighted sum of projections onto its eigen-directions: $\vv q_i\vv q_i^\top$ projects onto $\vv q_i$.

!!! proof "Proof of (1): real eigenvalues"
    Let $A\vv v = \lambda\vv v$ with $\vv v \neq \vv 0$, possibly complex. Take conjugates (A is real): $A\bar{\vv v} = \bar\lambda\bar{\vv v}$. Now compute $\bar{\vv v}^\top A\vv v$ two ways:

    - $\bar{\vv v}^\top(A\vv v) = \lambda\,\bar{\vv v}^\top\vv v$;
    - $(\bar{\vv v}^\top A)\vv v = (A^\top\bar{\vv v})^\top\vv v = (A\bar{\vv v})^\top\vv v = \bar\lambda\,\bar{\vv v}^\top\vv v$, using symmetry.

    Since $\bar{\vv v}^\top\vv v = \sum|v_i|^2 > 0$, we get $\lambda = \bar\lambda$, so $\lambda$ is real.

!!! proof "Proof of (2): orthogonal eigenvectors"
    Let $A\vv u = \lambda\vv u$, $A\vv v = \mu\vv v$ with $\lambda \neq \mu$. Then
    $\lambda(\vv u\cdot\vv v) = (A\vv u)\cdot\vv v = \vv u\cdot(A^\top\vv v) = \vv u\cdot(A\vv v) = \mu(\vv u\cdot\vv v)$.
    So $(\lambda - \mu)(\vv u\cdot\vv v) = 0$, which forces $\vv u\cdot\vv v = 0$.

??? proof "Proof of (3): a full orthonormal eigenbasis (deeper)"
    Induction on $n$. For $n=1$ it's trivial. By (1), $A$ has a real eigenvalue $\lambda_1$ with a unit eigenvector $\vv q_1$. Let $W = \{\vv w : \vv w\cdot\vv q_1 = 0\}$, the $(n-1)$-dimensional subspace perpendicular to $\vv q_1$.

    *$A$ maps $W$ into itself:* if $\vv w\cdot\vv q_1 = 0$ then $(A\vv w)\cdot\vv q_1 = \vv w\cdot(A\vv q_1) = \lambda_1\,\vv w\cdot\vv q_1 = 0$.

    So $A$ restricted to $W$ is a symmetric linear map on an $(n-1)$-dimensional space (in an orthonormal basis of $W$ its matrix is symmetric, by the same identity). By the induction hypothesis it has an orthonormal eigenbasis $\vv q_2, \ldots, \vv q_n$ of $W$. Together with $\vv q_1$, that's an orthonormal eigenbasis of $\R^n$. This also handles repeated eigenvalues, where (2) alone wouldn't suffice.

!!! example "Example"
    $A = \begin{pmatrix}2&1\\1&2\end{pmatrix}$: eigenvalues 3, 1 with eigenvectors $(1,1)$ and $(1,-1)$, which are perpendicular, as promised. Normalized:

    $$
    A = \underbrace{\tfrac{1}{\sqrt2}\begin{pmatrix}1&1\\1&-1\end{pmatrix}}_{Q}\begin{pmatrix}3&0\\0&1\end{pmatrix}\underbrace{\tfrac{1}{\sqrt2}\begin{pmatrix}1&1\\1&-1\end{pmatrix}}_{Q^\top} = 3\,\vv q_1\vv q_1^\top + 1\,\vv q_2\vv q_2^\top.
    $$

## 2. Quadratic forms

A symmetric matrix defines a **quadratic form** $f(\vv x) = \vv x^\top A\vv x = \sum_{i,j}a_{ij}x_ix_j$. For example, $\begin{pmatrix}x&y\end{pmatrix}\begin{pmatrix}2&1\\1&2\end{pmatrix}\begin{pmatrix}x\\y\end{pmatrix} = 2x^2 + 2xy + 2y^2$.

In eigen-coordinates $\vv y = Q^\top\vv x$, the cross terms disappear:

$$
\vv x^\top A\vv x = \vv x^\top Q\Lambda Q^\top\vv x = \vv y^\top\Lambda\vv y = \lambda_1y_1^2 + \lambda_2y_2^2 + \cdots + \lambda_ny_n^2.
$$

This "principal axes" form shows the shape at a glance. The level set $\vv x^\top A\vv x = 1$ is an ellipse (ellipsoid) when all $\lambda_i > 0$, with semi-axis lengths $1/\sqrt{\lambda_i}$ along $\vv q_i$. Quadratic forms are what you get from the second-order Taylor expansion of any function ([Hessian](../multivariable/hessian.md)), so this is the local shape of every loss surface.

## 3. Positive definite matrices

!!! definition "Definition"
    A symmetric matrix $A$ is

    - **positive definite** ($A \succ 0$) if $\vv x^\top A\vv x > 0$ for all $\vv x \neq \vv 0$;
    - **positive semidefinite** ($A \succeq 0$) if $\vv x^\top A\vv x \geq 0$ for all $\vv x$.

!!! theorem "Theorem: tests for positive definiteness"
    For symmetric $A$, the following are equivalent:

    1. $A \succ 0$;
    2. all eigenvalues are positive;
    3. $A = B^\top B$ for some $B$ with independent columns.

    (Semidefinite: same with $\geq 0$ and any $B$.)

!!! proof "Proof"
    (1 ⇒ 2): if $A\vv q = \lambda\vv q$ with $\norm{\vv q} = 1$, then $\lambda = \vv q^\top A\vv q > 0$.
    (2 ⇒ 1): $\vv x^\top A\vv x = \sum\lambda_iy_i^2$ with $\vv y = Q^\top\vv x \neq \vv 0$, which is a sum of non-negative terms, at least one positive.
    (3 ⇒ 1): $\vv x^\top B^\top B\vv x = \norm{B\vv x}^2 > 0$ when $B\vv x \neq \vv 0$, i.e. when $\vv x \neq \vv 0$ (independent columns).
    (2 ⇒ 3): take $B = \Lambda^{1/2}Q^\top$ (invertible, since all $\lambda_i > 0$). Then $B^\top B = Q\Lambda Q^\top = A$.

Consequences: **$X^\top X$ is always positive semidefinite**, and covariance matrices are PSD (proof in [Several random variables](../probability/joint.md)). A PD matrix is invertible (no zero eigenvalue), and its quadratic form is a bowl with a unique minimum at $\vv 0$. For $2\times2$ matrices, $A \succ 0$ iff $a_{11} > 0$ and $\det A > 0$.

## 4. The Rayleigh quotient: optimization with eigenvalues

!!! theorem "Theorem: Rayleigh quotient"
    For symmetric $A$ with eigenvalues $\lambda_1 \geq \lambda_2 \geq \cdots \geq \lambda_n$:

    $$
    \max_{\norm{\vv x} = 1}\vv x^\top A\vv x = \lambda_1, \qquad \min_{\norm{\vv x} = 1}\vv x^\top A\vv x = \lambda_n,
    $$

    attained at the corresponding unit eigenvectors.

!!! proof "Proof"
    With $\vv y = Q^\top\vv x$ (so $\norm{\vv y} = \norm{\vv x} = 1$): $\vv x^\top A\vv x = \sum_i\lambda_iy_i^2 \leq \lambda_1\sum_i y_i^2 = \lambda_1$. Equality holds for $\vv y = \vv e_1$, i.e. $\vv x = \vv q_1$. The minimum is symmetric.

**"Which direction maximizes a quadratic form?" always has the answer "the top eigenvector."** This is exactly the optimization problem behind PCA (next lesson): the direction of maximum variance in data is the top eigenvector of the covariance matrix.

!!! ml "Where this shows up"
    - **Covariance matrices** are symmetric PSD. Their eigenvectors are the principal components; their eigenvalues are the variances along them ([SVD and PCA](svd.md)).
    - **Hessians** are symmetric. At a critical point, all positive eigenvalues means a minimum, mixed signs a saddle. The condition number $\lambda_{\max}/\lambda_{\min}$ controls how fast gradient descent converges.
    - **Kernel methods** (SVMs, Gaussian processes) need the kernel matrix $K_{ij} = k(\vv x_i, \vv x_j)$ to be PSD. That's the definition of a valid kernel.
    - **Graph Laplacians** are symmetric PSD, and their smallest eigenvectors reveal clusters (spectral clustering).

## Check yourself

**1.** Diagonalize $A = \begin{pmatrix}5 & 2\\2 & 2\end{pmatrix}$ as $Q\Lambda Q^\top$.

??? success "Solution"
    $\tr = 7$, $\det = 6$: $\lambda = 6, 1$. For 6: $\begin{pmatrix}-1&2\\2&-4\end{pmatrix}$ gives $(2,1)$. For 1: $\begin{pmatrix}4&2\\2&1\end{pmatrix}$ gives $(1, -2)$. They're perpendicular. $Q = \frac1{\sqrt5}\begin{pmatrix}2&1\\1&-2\end{pmatrix}$, $\Lambda = \diag(6, 1)$.

**2.** Is $\begin{pmatrix}1 & 2\\2 & 1\end{pmatrix}$ positive definite? Find an $\vv x$ that shows it.

??? success "Solution"
    $\det = -3 < 0$, so the eigenvalues are $3$ and $-1$: not PD. $\vv x = (1,-1)$ gives $\vv x^\top A\vv x = 1 - 4 + 1 = -2 < 0$.

**3.** Write $3x^2 + 2xy + 3y^2$ as $\vv x^\top A\vv x$ and find its principal axes. What does $3x^2 + 2xy + 3y^2 = 1$ look like?

??? success "Solution"
    $A = \begin{pmatrix}3&1\\1&3\end{pmatrix}$ (split the $2xy$ evenly between the off-diagonal entries). Eigenvalues 4 along $(1,1)$ and 2 along $(1,-1)$. An ellipse with semi-axes $\frac12$ along the diagonal and $\frac1{\sqrt2}$ along the anti-diagonal.

**4.** Show that if $A \succ 0$ then $A^{-1} \succ 0$.

??? success "Solution"
    The eigenvalues of $A^{-1}$ are $1/\lambda_i > 0$, and $A^{-1}$ is symmetric. So it's PD.

**5.** Find the maximum of $2x^2 + 2xy + 2y^2$ on the unit circle, and where it's attained.

??? success "Solution"
    $A = \begin{pmatrix}2&1\\1&2\end{pmatrix}$, $\lambda_{\max} = 3$ at $\pm\frac{1}{\sqrt2}(1,1)$.

**6.** Prove that for any matrix $X$, the eigenvalues of $X^\top X$ are non-negative.

??? success "Solution"
    If $X^\top X\vv v = \lambda\vv v$ with $\norm{\vv v} = 1$: $\lambda = \vv v^\top X^\top X\vv v = \norm{X\vv v}^2 \geq 0$.
