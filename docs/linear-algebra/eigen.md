# Eigenvalues and eigenvectors

<div class="lesson-meta" markdown>
**Phase 3 · Lesson 7** · ⏱ ~4 hours · Needs: [Determinants](determinants.md), [Vector spaces, basis, rank](vector-spaces.md), [Complex numbers](../foundations/complex-numbers.md)
</div>

Most vectors change direction when a matrix acts on them. A few special ones don't: they only get stretched (or flipped). These **eigenvectors** reveal the matrix's skeleton. In a basis of eigenvectors, a complicated transformation becomes "stretch axis 1 by $\lambda_1$, axis 2 by $\lambda_2$, …". This is the key to understanding repeated application ($A^{100}$), dynamics, stability, Markov chains, PageRank, and (next lessons) PCA.

## 1. Definition and picture

!!! definition "Definition: eigenvalue, eigenvector"
    A nonzero vector $\vv v$ is an **eigenvector** of a square matrix $A$ with **eigenvalue** $\lambda$ if

    $$
    A\vv v = \lambda\vv v.
    $$

    ("Eigen" is German for "own" or "characteristic.")

$A$ acts on $\vv v$ by pure scaling: $\lambda > 1$ stretches, $0 < \lambda < 1$ shrinks, $\lambda < 0$ flips, $\lambda = 0$ crushes $\vv v$ to zero (so $\vv v$ is in the null space). Any nonzero multiple of an eigenvector is also an eigenvector, so really an eigenvector is an *eigen-direction*.

<div class="viz" data-viz="eigen"></div>

Some examples without any computation:

- **Projection** onto a plane: vectors in the plane have $\lambda = 1$; vectors perpendicular to it have $\lambda = 0$.
- **Reflection** across a line: vectors on the line have $\lambda = 1$; perpendicular vectors have $\lambda = -1$.
- **Rotation** by $90°$ in the plane: no real direction is preserved, so there are no real eigenvectors (the eigenvalues are $\pm i$).

## 2. Finding eigenvalues: the characteristic equation

$A\vv v = \lambda\vv v$ means $(A - \lambda I)\vv v = \vv 0$ with $\vv v \neq \vv 0$. So $A - \lambda I$ must have a nontrivial null space, i.e. be singular:

$$
\boxed{\det(A - \lambda I) = 0.}
$$

This is a polynomial of degree $n$ in $\lambda$, the **characteristic polynomial**. Its roots are the eigenvalues. For each eigenvalue, the eigenvectors are the nonzero vectors in $N(A - \lambda I)$.

!!! example "Example"
    $A = \begin{pmatrix}2 & 1\\1 & 2\end{pmatrix}$. Then $\det\begin{pmatrix}2 - \lambda & 1\\ 1 & 2-\lambda\end{pmatrix} = (2-\lambda)^2 - 1 = \lambda^2 - 4\lambda + 3 = (\lambda - 1)(\lambda - 3)$.

    - $\lambda_1 = 3$: $A - 3I = \begin{pmatrix}-1 & 1\\1&-1\end{pmatrix}$, null space spanned by $\vv v_1 = (1, 1)$.
    - $\lambda_2 = 1$: $A - I = \begin{pmatrix}1&1\\1&1\end{pmatrix}$, null space spanned by $\vv v_2 = (1, -1)$.

    Check: $A(1,1) = (3,3)$ ✓ and $A(1,-1) = (1,-1)$ ✓. The matrix stretches the diagonal direction by 3 and leaves the anti-diagonal alone.

For $2\times2$ matrices, $\det(A - \lambda I) = \lambda^2 - (\tr A)\lambda + \det A$, where $\tr A = a + d$ is the **trace** (sum of the diagonal). So

$$
\lambda = \frac{\tr A}{2} \pm\sqrt{\left(\frac{\tr A}{2}\right)^2 - \det A}.
$$

!!! theorem "Theorem: trace and determinant"
    For any $n \times n$ matrix with eigenvalues $\lambda_1, \ldots, \lambda_n$ (with multiplicity, possibly complex):

    $$
    \lambda_1 + \cdots + \lambda_n = \tr A, \qquad \lambda_1\lambda_2\cdots\lambda_n = \det A.
    $$

!!! proof "Proof"
    By the fundamental theorem of algebra, $\det(A - \lambda I) = (\lambda_1 - \lambda)(\lambda_2 - \lambda)\cdots(\lambda_n - \lambda)$. Set $\lambda = 0$: $\det A = \lambda_1\cdots\lambda_n$.
    For the trace, compare the coefficients of $\lambda^{n-1}$. On the right it's $(-1)^{n-1}(\lambda_1 + \cdots + \lambda_n)$. On the left, expanding the determinant, only the product of the diagonal entries $(a_{11} - \lambda)\cdots(a_{nn} - \lambda)$ can contribute a $\lambda^{n-1}$ term (every other term in the expansion skips at least two diagonal entries), and that coefficient is $(-1)^{n-1}(a_{11} + \cdots + a_{nn})$.

Quick sanity checks: in the example, $3 + 1 = 4 = \tr A$ and $3 \cdot 1 = 3 = \det A$. ✓ And **$A$ is invertible iff 0 is not an eigenvalue** (since $\det A$ is the product of the eigenvalues).

## 3. Diagonalization

!!! theorem "Theorem: eigenvectors for distinct eigenvalues are independent"
    If $\vv v_1, \ldots, \vv v_k$ are eigenvectors with distinct eigenvalues $\lambda_1, \ldots, \lambda_k$, they are linearly independent.

!!! proof "Proof"
    Suppose not, and take the *shortest* nontrivial dependency, $c_1\vv v_1 + \cdots + c_m\vv v_m = \vv 0$ (relabeling so it involves the first $m$, all $c_i \neq 0$; $m \geq 2$ since eigenvectors are nonzero). Apply $A$: $\sum c_i\lambda_i\vv v_i = \vv 0$. Subtract $\lambda_m$ times the original: $\sum_{i<m} c_i(\lambda_i - \lambda_m)\vv v_i = \vv 0$. The coefficients are nonzero (distinct eigenvalues), so this is a *shorter* dependency. Contradiction.

So if $A$ ($n\times n$) has $n$ distinct eigenvalues, its eigenvectors form a basis. Put them as columns of $V$ and the eigenvalues on the diagonal of $\Lambda$. The equations $A\vv v_i = \lambda_i\vv v_i$, all at once, read $AV = V\Lambda$, so:

!!! theorem "Diagonalization"
    If $A$ has $n$ independent eigenvectors, then

    $$
    A = V\Lambda V^{-1}.
    $$

!!! intuition "Read it right to left"
    $A\vv x = V\Lambda V^{-1}\vv x$: (1) $V^{-1}$ converts $\vv x$ into eigenvector coordinates; (2) $\Lambda$ scales each coordinate by its eigenvalue; (3) $V$ converts back. **In the eigenbasis, $A$ is just a diagonal stretch.**

Not every matrix can be diagonalized. The shear $\begin{pmatrix}1&1\\0&1\end{pmatrix}$ has $\lambda = 1$ twice but only one eigen-direction, $(1, 0)$. Such "defective" matrices are rare: an arbitrarily small perturbation makes the eigenvalues distinct.

## 4. Powers and dynamics

Diagonalization makes powers trivial, because the $V^{-1}V$ pairs cancel:

$$
A^k = V\Lambda^kV^{-1}, \qquad \Lambda^k = \diag(\lambda_1^k, \ldots, \lambda_n^k).
$$

Equivalently: write the starting vector in the eigenbasis, $\vv x_0 = c_1\vv v_1 + \cdots + c_n\vv v_n$. Then

$$
A^k\vv x_0 = c_1\lambda_1^k\vv v_1 + \cdots + c_n\lambda_n^k\vv v_n.
$$

**As $k\to\infty$ the term with the largest $|\lambda|$ dominates.** Components with $|\lambda| < 1$ die out; components with $|\lambda| > 1$ explode.

!!! example "Example: Fibonacci in closed form"
    $F_{k+2} = F_{k+1} + F_k$ can be written as $\begin{pmatrix}F_{k+1}\\F_k\end{pmatrix} = \begin{pmatrix}1&1\\1&0\end{pmatrix}\begin{pmatrix}F_k\\F_{k-1}\end{pmatrix}$. The characteristic equation is $\lambda^2 - \lambda - 1 = 0$, so $\lambda = \frac{1\pm\sqrt5}{2}$: the golden ratio $\varphi \approx 1.618$ and $\psi \approx -0.618$. Hence $F_k = c_1\varphi^k + c_2\psi^k$, and from $F_0 = 0$, $F_1 = 1$:

    $$
    F_k = \frac{\varphi^k - \psi^k}{\sqrt5}.
    $$

    Since $|\psi| < 1$, $F_k$ is the integer nearest $\varphi^k/\sqrt5$, and $F_{k+1}/F_k \to \varphi$.

!!! example "Example: Markov chains and steady states"
    Each day, 90% of city dwellers stay and 10% move to the suburbs; 30% of suburbanites move to the city and 70% stay. With $\vv x = (\text{city}, \text{suburbs})$:

    $$
    \vv x_{k+1} = M\vv x_k, \qquad M = \begin{pmatrix}0.9 & 0.3\\ 0.1 & 0.7\end{pmatrix}.
    $$

    Columns sum to 1, so $\lambda = 1$ is an eigenvalue. (The rows of $M - I$ sum to zero, so $M - I$ is singular.) $\tr M = 1.6$ gives the other eigenvalue $\lambda_2 = 0.6$. The eigenvector for $\lambda = 1$ solves $-0.1x + 0.3y = 0$: $(3, 1)$, normalized to $(0.75, 0.25)$. Since $0.6^k \to 0$, **every starting distribution converges to 75% city, 25% suburbs.** (Pick the "Markov matrix" preset in the figure above.)

**PageRank** is exactly this: the web is a giant Markov chain (a random surfer clicking links), and a page's rank is its component in the $\lambda = 1$ eigenvector. Google computed it with **power iteration**: start anywhere and keep multiplying by $M$. The dominant eigenvector emerges because the other components decay like $|\lambda_2|^k$.

## 5. Complex eigenvalues mean rotation

A real matrix may have complex eigenvalues, which come in conjugate pairs $a \pm bi$. Write $a \pm bi = re^{\pm i\theta}$. Then the matrix acts like **rotation by $\theta$ combined with scaling by $r$** in some plane. The rotation matrix $R_\theta$ has eigenvalues $e^{\pm i\theta}$. For dynamics $\vv x_{k+1} = A\vv x_k$, complex eigenvalues produce **oscillation**, spiraling in if $r < 1$ and out if $r > 1$.

!!! ml "Where this shows up"
    - **Exploding and vanishing gradients:** in a recurrent network, gradients get multiplied by (roughly) the same matrix at every step, so they behave like $\lambda_{\max}^k$. If the largest $|\lambda|$ is above 1 they explode; below 1 they vanish. This motivated LSTMs, gradient clipping, and careful initialization.
    - **Optimization speed:** gradient descent on a quadratic converges at a rate set by the ratio of the largest to smallest Hessian eigenvalues ([Phase 7](../optimization/gradient-descent.md)).
    - **Spectral clustering and graph neural networks** use eigenvectors of graph matrices ([Graphs](../discrete/graphs.md)).
    - **PageRank, stationary distributions, MCMC mixing:** dominant eigenvectors, with convergence speed governed by $|\lambda_2|$.

## Check yourself

**1.** Find the eigenvalues and eigenvectors of $\begin{pmatrix}4 & 1\\ 2 & 3\end{pmatrix}$.

??? success "Solution"
    $\tr = 7$, $\det = 10$: $\lambda^2 - 7\lambda + 10 = 0$, so $\lambda = 5, 2$. For 5: $(A - 5I) = \begin{pmatrix}-1&1\\2&-2\end{pmatrix}$, giving $(1,1)$. For 2: $\begin{pmatrix}2&1\\2&1\end{pmatrix}$, giving $(1,-2)$.

**2.** What are the eigenvalues of a triangular matrix? Why?

??? success "Solution"
    Its diagonal entries. $A - \lambda I$ is triangular, so its determinant is $\prod(a_{ii} - \lambda)$.

**3.** If $A\vv v = \lambda\vv v$, show that $A^2\vv v = \lambda^2\vv v$ and, if $A$ is invertible, $A^{-1}\vv v = \frac1\lambda\vv v$.

??? success "Solution"
    $A^2\vv v = A(\lambda\vv v) = \lambda A\vv v = \lambda^2\vv v$. For the inverse, apply $A^{-1}$ to $A\vv v = \lambda\vv v$: $\vv v = \lambda A^{-1}\vv v$. Since $\lambda \neq 0$ (invertible), $A^{-1}\vv v = \frac1\lambda\vv v$.

**4.** Compute $A^{10}$ for $A = \begin{pmatrix}2&1\\1&2\end{pmatrix}$ using diagonalization.

??? success "Solution"
    $V = \begin{pmatrix}1&1\\1&-1\end{pmatrix}$, $\Lambda = \diag(3, 1)$, $V^{-1} = \frac12\begin{pmatrix}1&1\\1&-1\end{pmatrix}$.
    $A^{10} = \frac12\begin{pmatrix}3^{10} + 1 & 3^{10} - 1\\ 3^{10} - 1 & 3^{10} + 1\end{pmatrix} = \begin{pmatrix}29525 & 29524\\29524 & 29525\end{pmatrix}$.

**5.** Show that $A$ and $A^\top$ have the same eigenvalues.

??? success "Solution"
    $\det(A^\top - \lambda I) = \det\big((A - \lambda I)^\top\big) = \det(A - \lambda I)$: same characteristic polynomial. (The eigenvectors can differ.)

**6.** A matrix has eigenvalues $0.5$ and $1.2$. For a generic starting vector, what happens to $A^k\vv x_0$? What if the eigenvalues were $0.5$ and $0.9$?

??? success "Solution"
    First case: the $1.2^k$ component dominates, and $A^k\vv x_0$ grows without bound along the eigenvector for $1.2$. Second case: both components decay, so $A^k\vv x_0 \to \vv 0$, eventually like $0.9^k$, along the eigenvector for $0.9$.

**7.** Find the eigenvalues of the rotation $R_\theta$ and confirm they have modulus 1.

??? success "Solution"
    $\tr = 2\cos\theta$, $\det = 1$: $\lambda = \cos\theta \pm\sqrt{\cos^2\theta - 1} = \cos\theta \pm i\sin\theta = e^{\pm i\theta}$, with $|\lambda| = 1$. Rotations neither grow nor shrink anything.
