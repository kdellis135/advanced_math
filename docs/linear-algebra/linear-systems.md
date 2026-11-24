# Solving linear systems

<div class="lesson-meta" markdown>
**Phase 3 · Lesson 3** · ⏱ ~2.5 hours · Needs: [Matrices are transformations](matrices.md)
</div>

Solving $A\vv x = \vv b$ is the most common computation in applied math. Behind every least-squares fit, every Newton step and every physics simulation there's a linear system.

This lesson covers:

- how to solve one (elimination);
- what the possible outcomes are;
- what the inverse of a matrix really is.

## 1. Two pictures of $A\vv x = \vv b$

$$
\begin{aligned} 2x - y &= 1\\ x + y &= 5\end{aligned} \qquad\Longleftrightarrow\qquad \begin{pmatrix}2 & -1\\ 1 & 1\end{pmatrix}\begin{pmatrix}x\\y\end{pmatrix} = \begin{pmatrix}1\\5\end{pmatrix}.
$$

- **Row picture:** each equation is a line, and the solution is where the lines meet: $(2, 3)$.
- **Column picture:** find the combination $x\begin{pmatrix}2\\1\end{pmatrix} + y\begin{pmatrix}-1\\1\end{pmatrix}$ that equals $\begin{pmatrix}1\\5\end{pmatrix}$. With $x = 2$, $y = 3$: $\begin{pmatrix}4 - 3\\ 2 + 3\end{pmatrix}$. ✓

To confirm $(2, 3)$ in the row picture, plug it into both equations: $2(2) - 3 = 1$ ✓ and $2 + 3 = 5$ ✓. A point is on a line exactly when it satisfies that line's equation, so $(2, 3)$ is on both lines.

Two lines in the plane can meet in three ways, and these are the only possibilities for *any* linear system:

| Lines | Example | Solutions |
|---|---|---|
| cross at one point | $x + y = 2$, $\ x - y = 0$ | one: $(1, 1)$ |
| parallel, never meet | $x + y = 2$, $\ x + y = 5$ | none |
| the same line twice | $x + y = 2$, $\ 2x + 2y = 4$ | infinitely many |

In $n$ dimensions the row picture is $n$ hyperplanes meeting.

The column picture is often more useful: **$A\vv x = \vv b$ is solvable exactly when $\vv b$ is a combination of the columns of $A$.**

## 2. Gaussian elimination

The method you learned at school, organized. Three **row operations** don't change the solution set:

1. swap two equations;
2. multiply an equation by a nonzero number;
3. add a multiple of one equation to another.

Why they're safe: each one can be **undone** by another row operation (swap back; divide by the same number; subtract the same multiple). So any solution of the old system solves the new one, and vice versa.

Use them to reach **upper triangular** form, then solve from the bottom up (**back substitution**).

**Augmented matrix notation.** Writing $x, y, z$ and $=$ over and over is tedious. Keep only the numbers: each row is one equation, each column before the bar holds the coefficients of one variable, and the column after the bar holds the right-hand sides. The system

$$
\begin{aligned} x + 2y + z &= 2\\ 3x + 8y + z &= 12\\ 4y + z &= 2\end{aligned}
$$

becomes the augmented matrix $(A \mid \vv b)$ below. "$R_2 - 3R_1$" means "replace row 2 by (row 2) minus 3 × (row 1)."

!!! example "Example"
    $$
    \left(\begin{array}{ccc|c} 1 & 2 & 1 & 2\\ 3 & 8 & 1 & 12\\ 0 & 4 & 1 & 2\end{array}\right)
    \xrightarrow{R_2 - 3R_1}
    \left(\begin{array}{ccc|c} 1 & 2 & 1 & 2\\ 0 & 2 & -2 & 6\\ 0 & 4 & 1 & 2\end{array}\right)
    \xrightarrow{R_3 - 2R_2}
    \left(\begin{array}{ccc|c} 1 & 2 & 1 & 2\\ 0 & 2 & -2 & 6\\ 0 & 0 & 5 & -10\end{array}\right)
    $$

    The arithmetic of each step:

    - $R_2 - 3R_1$: $\ (3, 8, 1, 12) - 3(1, 2, 1, 2) = (3 - 3,\ 8 - 6,\ 1 - 3,\ 12 - 6) = (0, 2, -2, 6)$. The multiplier $3$ was chosen to make the first entry $0$.
    - $R_3 - 2R_2$: $\ (0, 4, 1, 2) - 2(0, 2, -2, 6) = (0, 0, 5, -10)$. The multiplier $2 = \frac{4}{2}$ kills the entry below the second pivot.

    **The rule for multipliers:** to clear the entry below a pivot $p$, subtract $\frac{\text{entry}}{p}$ times the pivot row.

    Back substitution, from the bottom up:

    1. $5z = -10 \Rightarrow z = -2$
    2. $2y - 2z = 6 \Rightarrow 2y + 4 = 6 \Rightarrow y = 1$
    3. $x + 2y + z = 2 \Rightarrow x + 2 - 2 = 2 \Rightarrow x = 2$

    Always check in the *original* equations: $2 + 2 - 2 = 2$ ✓, $\ 6 + 8 - 2 = 12$ ✓, $\ 4 - 2 = 2$ ✓.

The first nonzero entry in each row of the triangular form is a **pivot** (here $1, 2, 5$).

- If a pivot position holds 0, swap in a lower row.
- If no row has a nonzero entry there, that column has **no pivot**.

## 3. The three possible outcomes

After elimination, exactly one of these happens:

1. **Every column has a pivot** (square case): exactly **one solution**.
2. **A row reads $0 = c$ with $c \neq 0$**: **no solution** (inconsistent; $\vv b$ is not in the column space).
3. **Consistent, but some column has no pivot**: that variable is **free**, and there are **infinitely many solutions**.

!!! example "Example: no solution"
    $$
    \left(\begin{array}{cc|c} 1 & 1 & 2\\ 1 & 1 & 5\end{array}\right) \xrightarrow{R_2 - R_1} \left(\begin{array}{cc|c} 1 & 1 & 2\\ 0 & 0 & 3\end{array}\right).
    $$

    The second row now says $0x + 0y = 3$, i.e. $0 = 3$. Impossible, so there's no solution. (These were the two parallel lines from Section 1.)

!!! example "Example: infinitely many solutions, and how to describe them"
    $$
    \left(\begin{array}{ccc|c} 1 & 2 & 1 & 4\\ 2 & 4 & 3 & 10\end{array}\right) \xrightarrow{R_2 - 2R_1} \left(\begin{array}{ccc|c} 1 & 2 & 1 & 4\\ 0 & 0 & 1 & 2\end{array}\right).
    $$

    The pivots are in columns 1 ($x$) and 3 ($z$). Column 2 ($y$) has no pivot, so $y$ is **free**: it can be anything. Call it $t$.

    1. Row 2: $z = 2$.
    2. Row 1: $x + 2t + 2 = 4$, so $x = 2 - 2t$.

    So the solutions are

    $$
    \begin{pmatrix}x\\y\\z\end{pmatrix} = \begin{pmatrix}2 - 2t\\ t\\ 2\end{pmatrix} = \underbrace{\begin{pmatrix}2\\0\\2\end{pmatrix}}_{\text{one solution}} + t\underbrace{\begin{pmatrix}-2\\1\\0\end{pmatrix}}_{\text{direction}}, \qquad t \in \R.
    $$

    That's a **line** of solutions in $\R^3$. Check $t = 1$: $(0, 1, 2)$ gives $0 + 2 + 2 = 4$ ✓ and $0 + 4 + 6 = 10$ ✓.

    Notice the direction vector solves the system with right-hand side $\vv 0$: $\ -2 + 2 + 0 = 0$ and $-4 + 4 + 0 = 0$. Every solution is "one particular solution + something $A$ sends to zero." The [next lesson](vector-spaces.md) calls that "something" the null space.

!!! theorem "Theorem"
    A linear system has 0, 1, or infinitely many solutions, never exactly 2.

!!! proof "Proof"
    Suppose $\vv x_1 \neq \vv x_2$ both solve $A\vv x = \vv b$. Then for every $t$,

    $$
    A\big(\vv x_1 + t(\vv x_2 - \vv x_1)\big) = \vv b + t(\vv b - \vv b) = \vv b.
    $$

    That's a whole line of solutions.

    (The middle step uses linearity: $A(\vv x_1 + t(\vv x_2 - \vv x_1)) = A\vv x_1 + t(A\vv x_2 - A\vv x_1)$, and both $A\vv x_1$ and $A\vv x_2$ equal $\vv b$.)

## 4. Elimination is matrix multiplication: $A = LU$

Each step "subtract $\ell$ times row $j$ from row $i$" is multiplication on the left by an **elementary matrix**: the identity with $-\ell$ in position $(i, j)$.

For example, "$R_2 - 3R_1$" on a $2 \times 2$ matrix:

$$
\underbrace{\begin{pmatrix}1 & 0\\-3 & 1\end{pmatrix}}_{E}\begin{pmatrix}2 & 1\\6 & 8\end{pmatrix} = \begin{pmatrix}2 & 1\\6 - 6 & 8 - 3\end{pmatrix} = \begin{pmatrix}2 & 1\\0 & 5\end{pmatrix}.
$$

Row 1 of $E$ is $(1, 0)$, which copies row 1. Row 2 of $E$ is $(-3, 1)$, which builds "$-3 \times$ row 1 $+$ row 2." (Recall the row picture of matrix products.)

To undo it, *add* back $3R_1$: the inverse of $E$ is the same matrix with $+3$ instead of $-3$.

So elimination is $E_k\cdots E_2E_1A = U$ (upper triangular). Undoing the steps:

$$
A = LU,
$$

where $L$ is **lower** triangular, with ones on the diagonal and the multipliers $\ell_{ij}$ below.

In the example, $\ell_{21} = 3$, $\ell_{31} = 0$, $\ell_{32} = 2$:

$$
\begin{pmatrix}1&2&1\\3&8&1\\0&4&1\end{pmatrix} = \begin{pmatrix}1&0&0\\3&1&0\\0&2&1\end{pmatrix}\begin{pmatrix}1&2&1\\0&2&-2\\0&0&5\end{pmatrix}.
$$

Check one row: row 2 of $LU$ is $3 \times (\text{row 1 of } U) + 1 \times (\text{row 2 of } U) = (3, 6, 3) + (0, 2, -2) = (3, 8, 1)$. ✓ That's elimination run backwards: row 2 of $A$ *was* $3R_1$ plus what's left after elimination.

**How $LU$ solves $A\vv x = \vv b$:** since $A\vv x = L(U\vv x)$, call $\vv c = U\vv x$. Then solve two triangular systems, each by simple substitution:

1. $L\vv c = \vv b$, top to bottom (**forward** substitution).
2. $U\vv x = \vv c$, bottom to top (**back** substitution).

Why care? Compare the costs:

| Step | Cost |
|---|---|
| compute $L$ and $U$ (once) | about $\frac23n^3$ operations |
| each new $\vv b$: solve $L\vv c = \vv b$, then $U\vv x = \vv c$ | $\sim n^2$ operations |

This is what `numpy.linalg.solve` does internally, with row swaps for stability: $PA = LU$.

## 5. The inverse

!!! definition "Definition: inverse matrix"
    A square matrix $A$ is **invertible** if there's a matrix $A^{-1}$ with $AA^{-1} = A^{-1}A = I$.

    Geometrically, $A^{-1}$ undoes the transformation $A$.

If $A$ is invertible, $A\vv x = \vv b$ has the unique solution $\vv x = A^{-1}\vv b$.

**When does an inverse exist?** The transformation must be undoable: it can't squash two different vectors to the same output.

For square $A$, the following are all equivalent (proved over the next two lessons):

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

Here's that check:

$$
\begin{pmatrix}a&b\\c&d\end{pmatrix}\begin{pmatrix}d & -b\\ -c & a\end{pmatrix} = \begin{pmatrix}ad - bc & -ab + ba\\ cd - dc & -cb + da\end{pmatrix} = (ad - bc)\begin{pmatrix}1 & 0\\0 & 1\end{pmatrix}.
$$

Dividing by $ad - bc$ gives $I$. The recipe: **swap the diagonal entries, negate the off-diagonal ones, divide by $ad - bc$.**

!!! example "Example: solving a system with the inverse"
    For the system in Section 1, $A = \begin{pmatrix}2 & -1\\1 & 1\end{pmatrix}$ has $ad - bc = 2 + 1 = 3$, so

    $$
    A^{-1} = \frac13\begin{pmatrix}1 & 1\\-1 & 2\end{pmatrix}, \qquad \vv x = A^{-1}\begin{pmatrix}1\\5\end{pmatrix} = \frac13\begin{pmatrix}1 + 5\\-1 + 10\end{pmatrix} = \begin{pmatrix}2\\3\end{pmatrix}. \ ✓
    $$

**Computing $A^{-1}$ in general (Gauss–Jordan):** row-reduce $(A \mid I)$ all the way to $(I \mid A^{-1})$.

This works because you're solving $A\vv x = \vv e_j$ for every column $j$ at once.

!!! example "Example: Gauss–Jordan on a $2\times2$"
    Invert $A = \begin{pmatrix}2 & 1\\6 & 8\end{pmatrix}$. Put $I$ beside it and row-reduce until the left side is $I$:

    $$
    \left(\begin{array}{cc|cc} 2 & 1 & 1 & 0\\ 6 & 8 & 0 & 1\end{array}\right)
    \xrightarrow{R_2 - 3R_1}
    \left(\begin{array}{cc|cc} 2 & 1 & 1 & 0\\ 0 & 5 & -3 & 1\end{array}\right)
    \xrightarrow{R_2 / 5}
    \left(\begin{array}{cc|cc} 2 & 1 & 1 & 0\\ 0 & 1 & -0.6 & 0.2\end{array}\right)
    $$

    $$
    \xrightarrow{R_1 - R_2}
    \left(\begin{array}{cc|cc} 2 & 0 & 1.6 & -0.2\\ 0 & 1 & -0.6 & 0.2\end{array}\right)
    \xrightarrow{R_1 / 2}
    \left(\begin{array}{cc|cc} 1 & 0 & 0.8 & -0.1\\ 0 & 1 & -0.6 & 0.2\end{array}\right).
    $$

    So $A^{-1} = \begin{pmatrix}0.8 & -0.1\\-0.6 & 0.2\end{pmatrix}$. The $2 \times 2$ formula agrees: $\frac{1}{16 - 6}\begin{pmatrix}8 & -1\\-6 & 2\end{pmatrix}$.

    Unlike plain elimination, Gauss–Jordan also clears the entries **above** each pivot, and scales each pivot to $1$.

!!! theorem "Theorem: inverse of a product"
    If $A$ and $B$ are invertible, so is $AB$, and $(AB)^{-1} = B^{-1}A^{-1}$.

!!! proof "Proof"
    $(AB)(B^{-1}A^{-1}) = A(BB^{-1})A^{-1} = AA^{-1} = I$, and similarly in the other order.

    To undo "B then A", undo A first, then B.

Also $(A^\top)^{-1} = (A^{-1})^\top$ (transpose $AA^{-1} = I$).

!!! warning "In practice, don't compute inverses"
    To solve $A\vv x = \vv b$ numerically, use `solve(A, b)` (LU), never `inv(A) @ b`. Computing the inverse is about 3× slower and less accurate.

    The inverse is a wonderful *theoretical* tool and a poor *computational* one.

!!! ml "Where this shows up"
    - **Linear regression's closed form** $\hat{\vv w} = (X^\top X)^{-1}X^\top\vv y$ is solved via a linear system or a QR decomposition, never by inverting $X^\top X$ explicitly.
    - **Newton's method** solves $H\vv d = -\nabla f$ at each step.
    - **Gaussian processes and Kalman filters** solve linear systems with covariance matrices (via Cholesky, a symmetric variant of LU).
    - **Cost:** solving a dense $n\times n$ system takes $O(n^3)$ operations. That's why exact second-order methods don't scale to networks with $10^9$ parameters.

## Check yourself

**1.** Solve by elimination: $x + y + z = 6$, $2x + 3y + z = 11$, $x - y + 2z = 5$.

??? success "Solution"
    1. $R_2 - 2R_1$: $\ y - z = -1$.
    2. $R_3 - R_1$: $\ -2y + z = -1$.
    3. Add 2× the new $R_2$ to the new $R_3$: $\ -z = -3$.

    Back substitution: $z = 3$, $y = 2$, $x = 1$.

**2.** For which $k$ does $x + 2y = 3$, $2x + ky = 6$ have (a) one solution (b) infinitely many (c) none?

??? success "Solution"
    $R_2 - 2R_1$ gives $(k - 4)y = 0$.

    | Case | Result |
    |---|---|
    | (a) $k \neq 4$ | $y = 0$, $x = 3$: one solution |
    | (b) $k = 4$ | $0 = 0$, $y$ is free: infinitely many |
    | (c) none | never: the right side became 0, so the system is always consistent |

**3.** Invert $\begin{pmatrix}3 & 1\\ 5 & 2\end{pmatrix}$ and verify.

??? success "Solution"
    $ad - bc = 6 - 5 = 1$. Inverse: $\begin{pmatrix}2 & -1\\ -5 & 3\end{pmatrix}$.

    Check:

    $$
    \begin{pmatrix}3&1\\5&2\end{pmatrix}\begin{pmatrix}2&-1\\-5&3\end{pmatrix} = \begin{pmatrix}6-5 & -3+3\\ 10-10 & -5+6\end{pmatrix} = I.
    $$

**4.** Explain geometrically why $\begin{pmatrix}1 & 2\\ 2 & 4\end{pmatrix}$ has no inverse.

??? success "Solution"
    Its columns $(1,2)$ and $(2,4)$ are parallel, so every output $A\vv x$ lies on the line through $(1,2)$.

    The whole plane is squashed onto a line, and you can't recover a 2D input from a 1D output. (Also $ad - bc = 4 - 4 = 0$.)

**5.** Find the $LU$ factorization of $\begin{pmatrix}2 & 1\\ 6 & 8\end{pmatrix}$.

??? success "Solution"
    $R_2 - 3R_1$ gives $U = \begin{pmatrix}2&1\\0&5\end{pmatrix}$, with multiplier $\ell_{21} = 3$.

    So $L = \begin{pmatrix}1&0\\3&1\end{pmatrix}$.

**6.** Prove: if $A$ is invertible, then $A\vv x = \vv 0$ implies $\vv x = \vv 0$.

??? success "Solution"
    Multiply by $A^{-1}$: $\vv x = A^{-1}A\vv x = A^{-1}\vv 0 = \vv 0$.
