# Solving linear systems

<div class="lesson-meta" markdown>
**Phase 3 · Lesson 3** · ⏱ ~2.5 hours · Needs: [Matrices are transformations](matrices.md)
</div>

Solving $A\vv x = \vv b$ is the most common computation in applied math. Behind every least-squares fit, every Newton step and every physics simulation there's a linear system. This lesson covers how to solve one (elimination), what the possible outcomes are, and what the inverse of a matrix really is.

## 1. Two pictures of $A\vv x = \vv b$

$$
\begin{aligned} 2x - y &= 1\\ x + y &= 5\end{aligned} \qquad\Longleftrightarrow\qquad \begin{pmatrix}2 & -1\\ 1 & 1\end{pmatrix}\begin{pmatrix}x\\y\end{pmatrix} = \begin{pmatrix}1\\5\end{pmatrix}.
$$

- **Row picture:** each equation is a line, and the solution is where the lines meet: $(2, 3)$.
- **Column picture:** find the combination $x\begin{pmatrix}2\\1\end{pmatrix} + y\begin{pmatrix}-1\\1\end{pmatrix}$ that equals $\begin{pmatrix}1\\5\end{pmatrix}$. With $x = 2$, $y = 3$: $\begin{pmatrix}4 - 3\\ 2 + 3\end{pmatrix}$. ✓

In $n$ dimensions the row picture is $n$ hyperplanes meeting. The column picture is often more useful: **$A\vv x = \vv b$ is solvable exactly when $\vv b$ is a combination of the columns of $A$.**

## 2. Gaussian elimination

The method you learned at school, organized. Three **row operations** don't change the solution set: swap two equations; multiply an equation by a nonzero number; add a multiple of one equation to another.

Use them to reach **upper triangular** form, then solve from the bottom up (**back substitution**).

!!! example "Example"
    $$
    \left(\begin{array}{ccc|c} 1 & 2 & 1 & 2\\ 3 & 8 & 1 & 12\\ 0 & 4 & 1 & 2\end{array}\right)
    \xrightarrow{R_2 - 3R_1}
    \left(\begin{array}{ccc|c} 1 & 2 & 1 & 2\\ 0 & 2 & -2 & 6\\ 0 & 4 & 1 & 2\end{array}\right)
    \xrightarrow{R_3 - 2R_2}
    \left(\begin{array}{ccc|c} 1 & 2 & 1 & 2\\ 0 & 2 & -2 & 6\\ 0 & 0 & 5 & -10\end{array}\right)
    $$

    Back substitution: $5z = -10 \Rightarrow z = -2$. $2y - 2z = 6 \Rightarrow y = 1$. $x + 2y + z = 2 \Rightarrow x = 2$.

The first nonzero entry in each row of the triangular form is a **pivot** (here $1, 2, 5$). If a pivot position holds 0, swap in a lower row. If no row has a nonzero entry there, that column has **no pivot**.

## 3. The three possible outcomes

After elimination, exactly one of these happens:

1. **Every column has a pivot** (square case): exactly **one solution**.
2. **A row reads $0 = c$ with $c \neq 0$**: **no solution** (inconsistent; $\vv b$ is not in the column space).
3. **Consistent, but some column has no pivot**: that variable is **free**, and there are **infinitely many solutions**.

!!! theorem "Theorem"
    A linear system has 0, 1, or infinitely many solutions, never exactly 2.

!!! proof "Proof"
    Suppose $\vv x_1 \neq \vv x_2$ both solve $A\vv x = \vv b$. Then for every $t$, $A\big(\vv x_1 + t(\vv x_2 - \vv x_1)\big) = \vv b + t(\vv b - \vv b) = \vv b$. That's a whole line of solutions.

## 4. Elimination is matrix multiplication: $A = LU$

Each step "subtract $\ell$ times row $j$ from row $i$" is multiplication on the left by an **elementary matrix**: the identity with $-\ell$ in position $(i, j)$. Elimination is $E_k\cdots E_2E_1A = U$ (upper triangular). Undoing the steps:

$$
A = LU,
$$

where $L$ is **lower** triangular, with ones on the diagonal and the multipliers $\ell_{ij}$ below. In the example, $\ell_{21} = 3$, $\ell_{31} = 0$, $\ell_{32} = 2$:

$$
\begin{pmatrix}1&2&1\\3&8&1\\0&4&1\end{pmatrix} = \begin{pmatrix}1&0&0\\3&1&0\\0&2&1\end{pmatrix}\begin{pmatrix}1&2&1\\0&2&-2\\0&0&5\end{pmatrix}.
$$

Why care? Once you have $L$ and $U$ (about $\frac23n^3$ operations), solving $A\vv x = \vv b$ for each new $\vv b$ takes only two cheap triangular solves ($\sim n^2$ operations): $L\vv c = \vv b$, then $U\vv x = \vv c$. This is what `numpy.linalg.solve` does internally (with row swaps for stability: $PA = LU$).

## 5. The inverse

!!! definition "Definition: inverse matrix"
    A square matrix $A$ is **invertible** if there's a matrix $A^{-1}$ with $AA^{-1} = A^{-1}A = I$. Geometrically, $A^{-1}$ undoes the transformation $A$.

If $A$ is invertible, $A\vv x = \vv b$ has the unique solution $\vv x = A^{-1}\vv b$.

**When does an inverse exist?** The transformation must be undoable: it can't squash two different vectors to the same output. For square $A$ the following are all equivalent (proved over the next two lessons):

- $A$ is invertible;
- $A\vv x = \vv b$ has exactly one solution for every $\vv b$;
- $A\vv x = \vv 0$ only for $\vv x = \vv 0$;
- elimination finds $n$ pivots;
- the columns are linearly independent ([next lesson](vector-spaces.md));
- $\det A \neq 0$ ([Determinants](determinants.md));
- 0 is not an eigenvalue ([Eigenvalues](eigen.md)).

**The $2\times 2$ formula:**

$$
\begin{pmatrix}a&b\\c&d\end{pmatrix}^{-1} = \frac{1}{ad - bc}\begin{pmatrix}d & -b\\ -c & a\end{pmatrix}, \qquad \text{provided } ad - bc \neq 0.
$$

(Check by multiplying. The number $ad - bc$ is the determinant.)

**Computing $A^{-1}$ in general (Gauss–Jordan):** row-reduce $(A \mid I)$ all the way to $(I \mid A^{-1})$. This works because you're solving $A\vv x = \vv e_j$ for every column $j$ at once.

!!! theorem "Theorem: inverse of a product"
    If $A$ and $B$ are invertible, so is $AB$, and $(AB)^{-1} = B^{-1}A^{-1}$.

!!! proof "Proof"
    $(AB)(B^{-1}A^{-1}) = A(BB^{-1})A^{-1} = AA^{-1} = I$, and similarly in the other order. To undo "B then A", undo A first, then B.

Also $(A^\top)^{-1} = (A^{-1})^\top$ (transpose $AA^{-1} = I$).

!!! warning "In practice, don't compute inverses"
    To solve $A\vv x = \vv b$ numerically, use `solve(A, b)` (LU), never `inv(A) @ b`. Computing the inverse is about 3× slower and less accurate. The inverse is a wonderful *theoretical* tool and a poor *computational* one.

!!! ml "Where this shows up"
    - **Linear regression's closed form** $\hat{\vv w} = (X^\top X)^{-1}X^\top\vv y$ is solved via a linear system or a QR decomposition, never by inverting $X^\top X$ explicitly.
    - **Newton's method** solves $H\vv d = -\nabla f$ at each step.
    - **Gaussian processes and Kalman filters** solve linear systems with covariance matrices (via Cholesky, a symmetric variant of LU).
    - **Cost:** solving a dense $n\times n$ system takes $O(n^3)$ operations. That's why exact second-order methods don't scale to networks with $10^9$ parameters.

## Check yourself

**1.** Solve by elimination: $x + y + z = 6$, $2x + 3y + z = 11$, $x - y + 2z = 5$.

??? success "Solution"
    $R_2 - 2R_1$: $y - z = -1$. $R_3 - R_1$: $-2y + z = -1$. Add 2× the new $R_2$ to the new $R_3$: $-z = -3$, so $z = 3$, $y = 2$, $x = 1$.

**2.** For which $k$ does $x + 2y = 3$, $2x + ky = 6$ have (a) one solution (b) infinitely many (c) none?

??? success "Solution"
    $R_2 - 2R_1$: $(k - 4)y = 0$. If $k \neq 4$: $y = 0$, $x = 3$, one solution. If $k = 4$: $0 = 0$, $y$ is free, infinitely many. Never none (the right side became 0, so the system is always consistent).

**3.** Invert $\begin{pmatrix}3 & 1\\ 5 & 2\end{pmatrix}$ and verify.

??? success "Solution"
    $ad - bc = 6 - 5 = 1$. Inverse: $\begin{pmatrix}2 & -1\\ -5 & 3\end{pmatrix}$. Check: $\begin{pmatrix}3&1\\5&2\end{pmatrix}\begin{pmatrix}2&-1\\-5&3\end{pmatrix} = \begin{pmatrix}6-5 & -3+3\\ 10-10 & -5+6\end{pmatrix} = I$.

**4.** Explain geometrically why $\begin{pmatrix}1 & 2\\ 2 & 4\end{pmatrix}$ has no inverse.

??? success "Solution"
    Its columns $(1,2)$ and $(2,4)$ are parallel, so every output $A\vv x$ lies on the line through $(1,2)$. The whole plane is squashed onto a line, and you can't recover a 2D input from a 1D output. (Also $ad - bc = 4 - 4 = 0$.)

**5.** Find the $LU$ factorization of $\begin{pmatrix}2 & 1\\ 6 & 8\end{pmatrix}$.

??? success "Solution"
    $R_2 - 3R_1$ gives $U = \begin{pmatrix}2&1\\0&5\end{pmatrix}$, multiplier $\ell_{21} = 3$, so $L = \begin{pmatrix}1&0\\3&1\end{pmatrix}$.

**6.** Prove: if $A$ is invertible, then $A\vv x = \vv 0$ implies $\vv x = \vv 0$.

??? success "Solution"
    Multiply by $A^{-1}$: $\vv x = A^{-1}A\vv x = A^{-1}\vv 0 = \vv 0$.
