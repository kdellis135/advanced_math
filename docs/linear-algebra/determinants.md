---
description: "The determinant as the factor by which a matrix scales volume: its defining properties, the formulas, the product rule and where determinants are really used."
---

# Determinants

<div class="lesson-meta" markdown>
**Phase 3 · Lesson 5** · ⏱ ~2.5 hours · Needs: [Vector spaces, basis, rank](vector-spaces.md)
</div>

The determinant is usually taught as a formula to memorize. It's really an answer to a geometric question:

> **By what factor does this transformation scale volumes?**

Every property of the determinant, including the formula, follows from that one picture.

## 1. The geometric meaning

Apply a $2\times2$ matrix $A$ to the unit square. It becomes a parallelogram spanned by the columns of $A$. Its **signed area** is $\det A$:

- the absolute value is the area;
- the sign is negative if the orientation flips (like a mirror image).

Since $A$ is linear, *every* region's area gets multiplied by the same factor $|\det A|$. Tile the region with tiny squares: each square becomes a parallelogram of area $|\det A|$ times the original.

In 3D, $\det$ is the signed volume scaling; in $n$ dimensions, $n$-volume.

!!! example "Example: reading off determinants from pictures"
    Use the gallery of maps from [Matrices](matrices.md). The unit square has area 1, so the determinant is just the (signed) area of its image.

    | Matrix | Image of the unit square | $\det$ |
    |---|---|---|
    | $\begin{pmatrix}2 & 0\\0 & 3\end{pmatrix}$ | a $2 \times 3$ rectangle | $6$ |
    | $\begin{pmatrix}1 & 1\\0 & 1\end{pmatrix}$ (shear) | a parallelogram with base 1 and height 1 | $1$ |
    | $\begin{pmatrix}0 & -1\\1 & 0\end{pmatrix}$ (rotate 90°) | the square, turned | $1$ |
    | $\begin{pmatrix}1 & 0\\0 & -1\end{pmatrix}$ (reflect) | the square, mirrored | $-1$ |
    | $\begin{pmatrix}1 & 2\\2 & 4\end{pmatrix}$ | a flat segment (parallel columns) | $0$ |

    **What the sign means.** In the unit square, turning counterclockwise from the first edge $\vv e_1$ brings you to the second edge $\vv e_2$. If the same is true of the images $A\vv e_1$ and $A\vv e_2$, orientation is preserved and $\det > 0$. If you have to turn clockwise instead, the picture has been mirrored and $\det < 0$.

Try it in the figure: the yellow parallelogram's area is the determinant shown.

<div class="viz" data-viz="lintrans" data-title="det A = signed area of the image of the unit square"></div>

## 2. Defining properties

Write $\det(\vv a_1, \ldots, \vv a_n)$ for the determinant of the matrix with these columns. Signed volume has three properties:

!!! definition "Definition: determinant (by properties)"
    The determinant is the unique function of $n$ column vectors such that:

    1. **Normalization:** $\det I = 1$ (the unit cube has volume 1).
    2. **Linear in each column:** e.g. $\det(c\vv a_1 + \vv b, \vv a_2, \ldots) = c\det(\vv a_1, \vv a_2,\ldots) + \det(\vv b, \vv a_2, \ldots)$.
        - Stretching one edge by $c$ scales the volume by $c$; areas add when you slide.
    3. **Alternating:** if two columns are equal, $\det = 0$ (a flat parallelepiped has no volume).

(A **parallelepiped** is the 3D version of a parallelogram: a slanted box whose edges are the column vectors.)

Why property 2 is reasonable, in 2D: a parallelogram's area is base × height. Keep the second edge $\vv a_2$ as the base. The height is the part of $\vv a_1$ sticking out perpendicular to that base. Doubling $\vv a_1$ doubles the height, so the area doubles. Adding two first edges adds their heights, so the areas add.

From these, everything else follows:

- **Swapping two columns flips the sign.**
    - Expand $0 = \det(\vv a + \vv b, \vv a + \vv b, \ldots)$ by linearity: $\det(\vv a,\vv a) + \det(\vv a, \vv b) + \det(\vv b, \vv a) + \det(\vv b,\vv b)$.
    - The first and last are 0, so $\det(\vv a, \vv b) = -\det(\vv b, \vv a)$.
- **Adding a multiple of one column to another doesn't change $\det$.**
    - $\det(\vv a + c\vv b, \vv b) = \det(\vv a, \vv b) + c\det(\vv b, \vv b) = \det(\vv a, \vv b)$.
    - Geometrically: a shear preserves area.
- **Dependent columns give $\det = 0$.**
    - If one column is a combination of the others, subtract that combination (which doesn't change $\det$) to get a zero column. Linearity then gives $0$.
- **Triangular matrices:** $\det$ = product of the diagonal entries.
    - Use column operations to clear the off-diagonal entries without changing $\det$. That leaves a diagonal matrix, whose det is the product of its entries by linearity and normalization.
    - The last step, in 2D: $\det(d_1\vv e_1, d_2\vv e_2) = d_1 d_2 \det(\vv e_1, \vv e_2) = d_1d_2$, pulling out one factor per column by linearity.
    - If a diagonal entry is $0$, the triangular matrix has dependent columns and det $0$, consistent with the product being $0$.

## 3. Formulas

**$2\times2$:** $\det\begin{pmatrix}a & b\\ c & d\end{pmatrix} = ad - bc$.

*Derivation from the properties:* split each column into its basis components,

$$
(a, c) = a\vv e_1 + c\vv e_2, \qquad (b, d) = b\vv e_1 + d\vv e_2,
$$

and expand by linearity:

$$
\det = ab\det(\vv e_1, \vv e_1) + ad\det(\vv e_1, \vv e_2) + cb\det(\vv e_2, \vv e_1) + cd\det(\vv e_2,\vv e_2) = 0 + ad - cb + 0.
$$

**$3\times3$ and beyond: cofactor expansion** along the first row:

$$
\det A = \sum_{j=1}^n (-1)^{1+j}a_{1j}\det A_{1j},
$$

where $A_{1j}$ is $A$ with row 1 and column $j$ deleted. For $3\times3$:

$$
\det\begin{pmatrix}a&b&c\\d&e&f\\g&h&i\end{pmatrix} = a(ei - fh) - b(di - fg) + c(dh - eg).
$$

How to read it:

1. Go along the first row: $a$, $b$, $c$.
2. For each entry, cross out its row and column. The $2 \times 2$ that's left is its **minor**. For $a$ it's $\begin{pmatrix}e & f\\h & i\end{pmatrix}$, with determinant $ei - fh$.
3. Multiply each entry by its minor's determinant, and attach signs from the checkerboard

$$
\begin{pmatrix}+ & - & +\\ - & + & -\\ + & - & +\end{pmatrix}.
$$

The sign in position $(i, j)$ is $(-1)^{i+j}$: plus on the diagonal, alternating from there.

!!! example "Example: a $3 \times 3$ by cofactors"
    $$
    \det\begin{pmatrix}1 & 2 & 3\\0 & 4 & 5\\1 & 0 & 6\end{pmatrix} = 1\cdot\det\begin{pmatrix}4 & 5\\0 & 6\end{pmatrix} - 2\cdot\det\begin{pmatrix}0 & 5\\1 & 6\end{pmatrix} + 3\cdot\det\begin{pmatrix}0 & 4\\1 & 0\end{pmatrix}.
    $$

    The three minors: $24 - 0 = 24$, $\ 0 - 5 = -5$, $\ 0 - 4 = -4$. So

    $$
    \det = 1(24) - 2(-5) + 3(-4) = 24 + 10 - 12 = 22.
    $$

The same expansion trick as the $2\times2$ derivation, applied in $n$ dimensions, yields this formula (and the "big formula" with $n!$ terms).

**In practice:** use elimination.

1. Row-reduce to triangular form $U$, tracking row swaps.
2. Then $\det A = \pm(\text{product of pivots})$.

Why can we use *row* operations, when the properties above were about *columns*? Because $\det A^\top = \det A$ (proved in Section 4), so every column fact is also a row fact:

| Row operation | Effect on $\det$ |
|---|---|
| add a multiple of one row to another | none |
| swap two rows | flips the sign |
| multiply a row by $c$ | multiplies $\det$ by $c$ |

!!! example "Example: the same determinant by elimination"
    $$
    \begin{pmatrix}1 & 2 & 3\\0 & 4 & 5\\1 & 0 & 6\end{pmatrix}
    \xrightarrow{R_3 - R_1}
    \begin{pmatrix}1 & 2 & 3\\0 & 4 & 5\\0 & -2 & 3\end{pmatrix}
    \xrightarrow{R_3 + \frac12 R_2}
    \begin{pmatrix}1 & 2 & 3\\0 & 4 & 5\\0 & 0 & 5.5\end{pmatrix}.
    $$

    No swaps, so $\det = 1 \cdot 4 \cdot 5.5 = 22$. ✓

    Had we swapped two rows along the way, we'd multiply the final product by $-1$ once per swap.

That's $O(n^3)$, versus $O(n!)$ for cofactor expansion.

## 4. The big theorems

!!! theorem "Theorem: invertibility"
    $A$ is invertible $\iff \det A \neq 0$.

!!! proof "Proof"
    - If the columns are dependent, $\det A = 0$ (shown above).
    - If they're independent, elimination produces $n$ nonzero pivots, and $\det A = \pm$ their product $\neq 0$.

    Geometrically: $\det A = 0$ means space is squashed into a lower dimension, and you can't un-squash.

!!! theorem "Theorem: product rule"
    $$
    \det(AB) = \det A\,\det B.
    $$

!!! proof "Proof"
    *Geometric:* $B$ scales volumes by $\det B$, then $A$ scales them by $\det A$, so the composition scales by the product (signs: orientation flips compose).

    *Algebraic:* if $\det A = 0$, then $A$ squashes space, so $AB$ does too, and both sides are 0.

    Otherwise fix $A$ and consider $D(B) = \det(AB)/\det A$ as a function of the columns $\vv b_1, \ldots, \vv b_n$ of $B$. Check the three defining properties:

    1. **Linear:** column $j$ of $AB$ is $A\vv b_j$, which depends only on $\vv b_j$, and linearly. So $D$ is linear in each column of $B$.
    2. **Alternating:** if two columns of $B$ are equal, so are the corresponding columns of $AB$, and $D = 0$.
    3. **Normalized:** $D(I) = \det A/\det A = 1$.

    By uniqueness, $D(B) = \det B$.

Consequences:

- $\det(A^{-1}) = 1/\det A$, since $\det A\det A^{-1} = \det I = 1$.
- $\det(A^\top) = \det A$. So everything said about columns also holds for rows.
    - Proof: it's true for elementary matrices by inspection, and every invertible matrix is a product of them.
- $\det(cA) = c^n\det A$ for $n\times n$ $A$: every one of the $n$ edges is scaled by $c$.
    - Not $c\det A$! Doubling a square's sides quadruples its area: $\det(2I_2) = 4$.

Check the product rule with numbers: $A = \begin{pmatrix}1 & 2\\3 & 4\end{pmatrix}$ ($\det = -2$) and $B = \begin{pmatrix}5 & 6\\7 & 8\end{pmatrix}$ ($\det = -2$). In [Matrices](matrices.md) we found $AB = \begin{pmatrix}19 & 22\\43 & 50\end{pmatrix}$, and $19 \cdot 50 - 22 \cdot 43 = 950 - 946 = 4 = (-2)(-2)$. ✓

But **there is no sum rule**: $\det(A + B) \neq \det A + \det B$ in general. With $A = B = I_2$: $\det(2I) = 4$, while $\det I + \det I = 2$.
- $\det$ of an orthogonal matrix is $\pm1$: $\det(Q)^2 = \det(Q^\top Q) = \det I = 1$. Rotations preserve volume.
- $\det A$ = product of the eigenvalues ([Eigenvalues](eigen.md)).

## 5. Where determinants are actually used

!!! intuition "Determinants in practice"
    In modern applied math, determinants are rarely used to *solve* anything (elimination is better).

    They matter as **volume scaling factors**, which is precisely what probability densities need when you change variables.

**Change of variables.** Suppose $\vv y = A\vv x$ and $\vv x$ has density $p_X$.

- A small box of volume $V$ around $\vv x$ maps to a parallelepiped of volume $|\det A|\,V$ around $\vv y$.
- Probability is conserved, so density goes *down* by that factor:

$$
p_Y(\vv y) = \frac{p_X(A^{-1}\vv y)}{|\det A|}.
$$

(The $A^{-1}\vv y$ is "which $\vv x$ was sent to this $\vv y$.")

!!! example "Example: spreading out a distribution"
    Let $\vv x$ be uniform on the unit square, so $p_X = 1$ there. Apply $A = \begin{pmatrix}2 & 0\\0 & 3\end{pmatrix}$.

    The square becomes a $2 \times 3$ rectangle of area $6$. The same total probability, 1, is now spread over 6 times the area, so the density drops to $\frac{1}{6}$. That's $\frac{p_X}{\lvert\det A\rvert} = \frac{1}{6}$.

    Think of spreading a fixed amount of butter: the bigger the toast, the thinner the layer.

For nonlinear maps, $A$ is replaced by the Jacobian matrix ([Phase 4](../multivariable/integrals.md)).

!!! ml "Where this shows up"
    - **Normalizing flows** build complex distributions by pushing a simple one through invertible neural networks, and must compute $\log|\det J|$ at every layer.
        - Architectures (RealNVP, Glow) are designed so the Jacobian is triangular, making the determinant a cheap product of diagonal entries.
    - **The multivariate Gaussian** density has $\frac{1}{\sqrt{(2\pi)^n\det\Sigma}}$ in front.
        - $\sqrt{\det\Sigma}$ is the volume of the "uncertainty ellipsoid."
    - **Log-determinants** appear in Gaussian process marginal likelihoods and in the entropy of a Gaussian, $\frac12\log\det(2\pi e\Sigma)$.

## Check yourself

**1.** Compute $\det\begin{pmatrix}2 & 1 & 0\\ 1 & 3 & 1\\ 0 & 1 & 2\end{pmatrix}$ by cofactor expansion and by elimination.

??? success "Solution"
    **Cofactors:** $2(6 - 1) - 1(2 - 0) + 0 = 10 - 2 = 8$.

    **Elimination:**

    1. $R_2 - \frac12R_1$ gives $(0, 2.5, 1)$.
    2. $R_3 - 0.4R_2$ gives $(0, 0, 1.6)$.
    3. Pivots: $2 \cdot 2.5 \cdot 1.6 = 8$. ✓

**2.** If $\det A = 3$ for a $4\times4$ matrix, find $\det(2A)$, $\det(A^{-1})$, $\det(A^\top A)$, $\det(A^3)$.

??? success "Solution"
    | Expression | Value |
    |---|---|
    | $\det(2A)$ | $2^4\cdot3 = 48$ |
    | $\det(A^{-1})$ | $\frac13$ |
    | $\det(A^\top A)$ | $3\cdot3 = 9$ |
    | $\det(A^3)$ | $27$ |

**3.** Find the area of the triangle with vertices $(1,1)$, $(4,2)$, $(2,5)$.

??? success "Solution"
    - Edge vectors from $(1,1)$: $(3,1)$ and $(1,4)$.
    - The parallelogram has area $|\det| = |12 - 1| = 11$.
    - The triangle is half of it: area $5.5$.

**4.** For which $t$ is $\begin{pmatrix}1 & t\\ t & 4\end{pmatrix}$ not invertible?

??? success "Solution"
    $\det = 4 - t^2 = 0 \iff t = \pm2$.

**5.** Prove that if $A$ is invertible then $\det(A^{-1}BA) = \det B$.

??? success "Solution"
    $\det(A^{-1})\det B\det A = \frac{1}{\det A}\det B\det A = \det B$.

    Similar matrices represent the same map in different coordinates, and volume scaling doesn't depend on coordinates.

**6.** $X$ is uniform on the unit square. Let $\vv Y = A\vv X$ with $A = \begin{pmatrix}2 & 1\\ 0 & 3\end{pmatrix}$. What is the density of $\vv Y$ on its support?

??? success "Solution"
    $\det A = 6$, so $Y$ is uniform on the parallelogram $A[0,1]^2$ (area 6) with density $1/6$.
