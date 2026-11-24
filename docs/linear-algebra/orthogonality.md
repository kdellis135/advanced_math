# Orthogonality and least squares

<div class="lesson-meta" markdown>
**Phase 3 · Lesson 6** · ⏱ ~3.5 hours · Needs: [Vector spaces, basis, rank](vector-spaces.md), [Vectors and the dot product](vectors.md)
</div>

Real data never fits a model exactly. The system $A\vv x = \vv b$ usually has *no* solution because $\vv b$ (the measurements) isn't in the column space of $A$ (what the model can produce). The best we can do is find the point in the column space **closest** to $\vv b$. That point is a perpendicular projection, and finding it is **least squares**, the foundation of regression.

## 1. Projection onto a line

Given a direction $\vv a$ and a vector $\vv b$, what's the closest point to $\vv b$ on the line through $\vv a$? Call it $\vv p = \hat x\,\vv a$. The error $\vv e = \vv b - \vv p$ should be **perpendicular** to the line (if it weren't, you could slide along the line and get closer).

$$
\vv a\cdot(\vv b - \hat x\vv a) = 0 \quad\Longrightarrow\quad \hat x = \frac{\vv a\cdot\vv b}{\vv a\cdot\vv a}, \qquad \vv p = \frac{\vv a\cdot\vv b}{\vv a\cdot\vv a}\,\vv a.
$$

<div class="viz" data-viz="projection"></div>

!!! theorem "Theorem: the projection is the closest point"
    For every point $t\vv a$ on the line, $\norm{\vv b - t\vv a} \geq \norm{\vv b - \vv p}$, with equality only at $t\vv a = \vv p$.

!!! proof "Proof"
    $\vv b - t\vv a = \vv e + (\vv p - t\vv a)$, and the second part is along $\vv a$, so it is perpendicular to $\vv e$. By Pythagoras (for perpendicular vectors, $\norm{\vv u + \vv v}^2 = \norm{\vv u}^2 + \norm{\vv v}^2$, since the cross term $2\vv u\cdot\vv v$ vanishes):
    $\norm{\vv b - t\vv a}^2 = \norm{\vv e}^2 + \norm{\vv p - t\vv a}^2 \geq \norm{\vv e}^2$.

As a matrix: $\vv p = P\vv b$ with $P = \dfrac{\vv a\vv a^\top}{\vv a^\top\vv a}$. Check $P^2 = P$: projecting twice is the same as projecting once.

## 2. Projection onto a subspace

Now project $\vv b$ onto the column space of an $m\times n$ matrix $A$ (independent columns). We seek $\vv p = A\hat{\vv x}$ with error $\vv e = \vv b - A\hat{\vv x}$ perpendicular to **every column** of $A$:

$$
A^\top(\vv b - A\hat{\vv x}) = \vv 0 \quad\Longrightarrow\quad \boxed{A^\top A\,\hat{\vv x} = A^\top\vv b.}
$$

These are the **normal equations**. If the columns of $A$ are independent, $A^\top A$ is invertible (proof below), so

$$
\hat{\vv x} = (A^\top A)^{-1}A^\top\vv b, \qquad \vv p = A(A^\top A)^{-1}A^\top\vv b = P\vv b.
$$

!!! theorem "Theorem"
    If $A$ has independent columns, $A^\top A$ is invertible.

!!! proof "Proof"
    Suppose $A^\top A\vv x = \vv 0$. Multiply by $\vv x^\top$: $\vv x^\top A^\top A\vv x = \norm{A\vv x}^2 = 0$, so $A\vv x = \vv 0$, and independence gives $\vv x = \vv 0$. So $N(A^\top A) = \{\vv 0\}$, and a square matrix with trivial null space is invertible.

The same Pythagoras argument shows $\vv p$ is the closest point of $C(A)$ to $\vv b$: for any $A\vv x$, $\vv b - A\vv x = \vv e + A(\hat{\vv x} - \vv x)$ with the two parts perpendicular.

## 3. Least squares regression

!!! example "Fitting a line"
    Data: $(1, 1), (2, 2), (3, 2)$. We want $y = c + mx$. Three equations, two unknowns:

    $$
    \underbrace{\begin{pmatrix}1&1\\1&2\\1&3\end{pmatrix}}_{A}\begin{pmatrix}c\\m\end{pmatrix} = \underbrace{\begin{pmatrix}1\\2\\2\end{pmatrix}}_{\vv b}\qquad\text{(no exact solution)}.
    $$

    Normal equations: $A^\top A = \begin{pmatrix}3 & 6\\6 & 14\end{pmatrix}$, $A^\top\vv b = \begin{pmatrix}5\\11\end{pmatrix}$. Solving: $3c + 6m = 5$, $6c + 14m = 11$ gives $m = \frac12$, $c = \frac23$.

    Best line: $y = \frac23 + \frac12x$. The residuals $\vv e = \vv b - A\hat{\vv x} = (-\frac16, \frac13, -\frac16)$ are perpendicular to both columns: their sum is $0$, and $1\cdot(-\frac16) + 2\cdot\frac13 + 3\cdot(-\frac16) = 0$.

Why is this called "least squares"? Because $\norm{\vv b - A\vv x}^2 = \sum_i (b_i - (A\vv x)_i)^2$ is the sum of squared vertical errors, and the projection minimizes it. You can also derive the normal equations by calculus: setting the gradient of $\norm{A\vv x - \vv b}^2$ to zero gives $2A^\top(A\vv x - \vv b) = \vv 0$ ([Matrix calculus](../multivariable/matrix-calculus.md)). Geometry and calculus agree.

<div class="viz" data-viz="leastsquares"></div>

!!! intuition "Two equivalent views"
    **Geometry:** $\vv b$ lives in $\R^m$ (one axis per data point). The model's possible predictions form a flat subspace $C(A)$. Least squares drops a perpendicular from $\vv b$ to that subspace.
    **Calculus:** minimize the bowl-shaped function $\norm{A\vv x - \vv b}^2$ by setting its derivative to zero.

## 4. Orthonormal bases make everything easy

!!! definition "Definition"
    Vectors $\vv q_1, \ldots, \vv q_n$ are **orthonormal** if $\vv q_i\cdot\vv q_j = 0$ for $i\neq j$ and $\norm{\vv q_i} = 1$. Stacked as columns of $Q$, this says $Q^\top Q = I$. A *square* $Q$ with orthonormal columns is an **orthogonal matrix**, and then $Q^{-1} = Q^\top$.

With an orthonormal basis:

- **Coordinates are dot products:** if $\vv v = \sum c_i\vv q_i$, then $c_i = \vv q_i\cdot\vv v$ (dot both sides with $\vv q_i$; the other terms vanish). No system to solve.
- **Projection is simple:** onto $C(Q)$ it's $P = QQ^\top$, since $(Q^\top Q)^{-1} = I$.
- **Lengths and angles are preserved:** $\norm{Q\vv x}^2 = \vv x^\top Q^\top Q\vv x = \norm{\vv x}^2$, and $(Q\vv x)\cdot(Q\vv y) = \vv x\cdot\vv y$. Orthogonal matrices are rotations and reflections.

This is why the eigenvector bases of [symmetric matrices](spectral.md) and the singular vectors of the [SVD](svd.md) are so valuable: they're orthonormal.

## 5. Gram–Schmidt and QR

Any independent vectors $\vv a_1, \ldots, \vv a_n$ can be straightened into an orthonormal basis of the same span: **subtract from each vector its projections onto the previous ones, then normalize.**

$$
\begin{aligned}
\vv u_1 &= \vv a_1, & \vv q_1 &= \vv u_1/\norm{\vv u_1},\\
\vv u_2 &= \vv a_2 - (\vv q_1\cdot\vv a_2)\vv q_1, & \vv q_2 &= \vv u_2/\norm{\vv u_2},\\
\vv u_3 &= \vv a_3 - (\vv q_1\cdot\vv a_3)\vv q_1 - (\vv q_2\cdot\vv a_3)\vv q_2, & \vv q_3 &= \vv u_3/\norm{\vv u_3},
\end{aligned}
$$

and so on. Each $\vv u_k$ is perpendicular to the previous $\vv q$'s by construction (the projections have been removed), and it's nonzero because $\vv a_k$ is independent of the earlier vectors.

Recording the coefficients gives the **QR decomposition** $A = QR$: $Q$ has orthonormal columns and $R$ is upper triangular (each $\vv a_k$ is a combination of $\vv q_1, \ldots, \vv q_k$ only). Least squares then becomes $R\hat{\vv x} = Q^\top\vv b$, a triangular solve. This is numerically much more stable than forming $A^\top A$, because forming $A^\top A$ squares the condition number. It's what good regression libraries do.

!!! ml "Where this shows up"
    - **Linear regression** *is* least squares: $\hat{\vv w} = (X^\top X)^{-1}X^\top\vv y$. The residuals are orthogonal to every feature column, which is why the residuals of a model with an intercept always sum to zero.
    - **Ridge regression** solves $(X^\top X + \lambda I)\vv w = X^\top\vv y$. Adding $\lambda I$ makes it invertible even with collinear features ([Bias and variance](../statistics/bias-variance.md)).
    - **Orthogonal weight initialization** and orthogonality constraints keep signals from exploding or vanishing in deep and recurrent networks, because $\norm{Q\vv x} = \norm{\vv x}$.
    - **Projection** is the geometric core of PCA, of "projecting out" a bias direction from embeddings, and of attention viewed as soft projection onto the values.

## Check yourself

**1.** Project $\vv b = (1, 2, 3)$ onto the line through $\vv a = (1, 1, 1)$. Verify the error is perpendicular to $\vv a$.

??? success "Solution"
    $\hat x = \frac{6}{3} = 2$, $\vv p = (2,2,2)$, $\vv e = (-1, 0, 1)$, and $\vv e\cdot\vv a = 0$. ✓ (Projecting onto $(1,\ldots,1)$ replaces every entry by the mean.)

**2.** Show that $P = A(A^\top A)^{-1}A^\top$ satisfies $P^2 = P$ and $P^\top = P$.

??? success "Solution"
    $P^2 = A(A^\top A)^{-1}(A^\top A)(A^\top A)^{-1}A^\top = A(A^\top A)^{-1}A^\top = P$. Transpose: $(A^\top)^\top\big((A^\top A)^{-1}\big)^\top A^\top = A(A^\top A)^{-1}A^\top$, since $A^\top A$ is symmetric and so is its inverse.

**3.** Fit $y = c + mx$ to $(0, 6), (1, 0), (2, 0)$.

??? success "Solution"
    $A^\top A = \begin{pmatrix}3 & 3\\3 & 5\end{pmatrix}$, $A^\top\vv b = (6, 0)$. Solve $3c + 3m = 6$, $3c + 5m = 0$: $m = -3$, $c = 5$. Line $y = 5 - 3x$.

**4.** Apply Gram–Schmidt to $\vv a_1 = (1, 1, 0)$, $\vv a_2 = (1, 0, 1)$.

??? success "Solution"
    $\vv q_1 = \frac{1}{\sqrt2}(1,1,0)$. $\vv q_1\cdot\vv a_2 = \frac1{\sqrt2}$. $\vv u_2 = (1,0,1) - \frac12(1,1,0) = (\frac12, -\frac12, 1)$, with $\norm{\vv u_2} = \sqrt{\frac32}$. $\vv q_2 = \frac{1}{\sqrt6}(1, -1, 2)$. Check: $\vv q_1\cdot\vv q_2 = 0$. ✓

**5.** Show that the least-squares residual vector is orthogonal to the fitted values $\hat{\vv y} = A\hat{\vv x}$.

??? success "Solution"
    $\hat{\vv y}^\top\vv e = \hat{\vv x}^\top A^\top\vv e = \hat{\vv x}^\top\vv 0 = 0$ by the normal equations.

**6.** If $Q$ is orthogonal, what is the least-squares solution of $Q\vv x = \vv b$?

??? success "Solution"
    $Q^\top Q = I$, so the normal equations give $\hat{\vv x} = Q^\top\vv b$. For a square orthogonal $Q$ this solves the system exactly.
