# Determinants

<div class="lesson-meta" markdown>
**Phase 3 · Lesson 5** · ⏱ ~2.5 hours · Needs: [Vector spaces, basis, rank](vector-spaces.md)
</div>

The determinant is usually taught as a formula to memorize. It's really an answer to a geometric question: **by what factor does this transformation scale volumes?** Every property of the determinant (including the formula) follows from that one picture.

## 1. The geometric meaning

Apply a $2\times2$ matrix $A$ to the unit square. It becomes a parallelogram spanned by the columns of $A$. Its **signed area** is $\det A$: the absolute value is the area, and the sign is negative if the orientation flips (like a mirror image).

Since $A$ is linear, *every* region's area gets multiplied by the same factor $|\det A|$: tile the region with tiny squares, and each square becomes a parallelogram of area $|\det A|$ times the original. In 3D, $\det$ is the signed volume scaling; in $n$ dimensions, $n$-volume.

Try it in the figure: the yellow parallelogram's area is the determinant shown.

<div class="viz" data-viz="lintrans" data-title="det A = signed area of the image of the unit square"></div>

## 2. Defining properties

Write $\det(\vv a_1, \ldots, \vv a_n)$ for the determinant of the matrix with these columns. Signed volume has three properties:

!!! definition "Definition: determinant (by properties)"
    The determinant is the unique function of $n$ column vectors such that:

    1. **Normalization:** $\det I = 1$ (the unit cube has volume 1).
    2. **Linear in each column:** e.g. $\det(c\vv a_1 + \vv b, \vv a_2, \ldots) = c\det(\vv a_1, \vv a_2,\ldots) + \det(\vv b, \vv a_2, \ldots)$. Stretching one edge by $c$ scales the volume by $c$; areas add when you slide.
    3. **Alternating:** if two columns are equal, $\det = 0$ (a flat parallelepiped has no volume).

From these, everything else follows:

- **Swapping two columns flips the sign.** Expand $0 = \det(\vv a + \vv b, \vv a + \vv b, \ldots)$ by linearity: $\det(\vv a,\vv a) + \det(\vv a, \vv b) + \det(\vv b, \vv a) + \det(\vv b,\vv b)$. The first and last are 0, so $\det(\vv a, \vv b) = -\det(\vv b, \vv a)$.
- **Adding a multiple of one column to another doesn't change $\det$:** $\det(\vv a + c\vv b, \vv b) = \det(\vv a, \vv b) + c\det(\vv b, \vv b) = \det(\vv a, \vv b)$. Geometrically: a shear preserves area.
- **Dependent columns give $\det = 0$:** if one column is a combination of the others, subtract that combination (which doesn't change $\det$) to get a zero column, and linearity then gives $0$.
- **Triangular matrices:** $\det$ = product of the diagonal entries. (Use column operations to clear the off-diagonal entries without changing $\det$, leaving a diagonal matrix whose det is the product of its entries by linearity and normalization.)

## 3. Formulas

**$2\times2$:** $\det\begin{pmatrix}a & b\\ c & d\end{pmatrix} = ad - bc$.

*Derivation from the properties:* split each column into its basis components, $(a, c) = a\vv e_1 + c\vv e_2$ and $(b, d) = b\vv e_1 + d\vv e_2$, and expand by linearity:
$\det = ab\det(\vv e_1, \vv e_1) + ad\det(\vv e_1, \vv e_2) + cb\det(\vv e_2, \vv e_1) + cd\det(\vv e_2,\vv e_2) = 0 + ad - cb + 0.$

**$3\times3$ and beyond: cofactor expansion** along the first row:

$$
\det A = \sum_{j=1}^n (-1)^{1+j}a_{1j}\det A_{1j},
$$

where $A_{1j}$ is $A$ with row 1 and column $j$ deleted. For $3\times3$:

$$
\det\begin{pmatrix}a&b&c\\d&e&f\\g&h&i\end{pmatrix} = a(ei - fh) - b(di - fg) + c(dh - eg).
$$

The same expansion trick as the $2\times2$ derivation, applied in $n$ dimensions, yields this formula (and the "big formula" with $n!$ terms).

**In practice:** use elimination. Row-reduce to triangular form $U$ (track swaps), and then $\det A = \pm(\text{product of pivots})$. That's $O(n^3)$, versus $O(n!)$ for cofactor expansion.

## 4. The big theorems

!!! theorem "Theorem: invertibility"
    $A$ is invertible $\iff \det A \neq 0$.

!!! proof "Proof"
    If the columns are dependent, $\det A = 0$ (shown above). If they're independent, elimination produces $n$ nonzero pivots, and $\det A = \pm$ their product $\neq 0$.
    Geometrically: $\det A = 0$ means space is squashed into a lower dimension, and you can't un-squash.

!!! theorem "Theorem: product rule"
    $$
    \det(AB) = \det A\,\det B.
    $$

!!! proof "Proof"
    *Geometric:* $B$ scales volumes by $\det B$, then $A$ scales them by $\det A$, so the composition scales by the product (signs: orientation flips compose).

    *Algebraic:* if $\det A = 0$ then $A$ squashes space, so $AB$ does too, and both sides are 0. Otherwise fix $A$ and consider $D(B) = \det(AB)/\det A$ as a function of the columns $\vv b_1, \ldots, \vv b_n$ of $B$. Column $j$ of $AB$ is $A\vv b_j$, which depends only on $\vv b_j$, and linearly. So $D$ is linear in each column of $B$. If two columns of $B$ are equal, so are the corresponding columns of $AB$, and $D = 0$. And $D(I) = \det A/\det A = 1$. So $D$ satisfies the three defining properties, and by uniqueness $D(B) = \det B$.

Consequences:

- $\det(A^{-1}) = 1/\det A$, since $\det A\det A^{-1} = \det I = 1$.
- $\det(A^\top) = \det A$. (Proof: true for elementary matrices by inspection, and every invertible matrix is a product of them.) So everything said about columns also holds for rows.
- $\det(cA) = c^n\det A$ for $n\times n$ $A$: every one of the $n$ edges is scaled by $c$.
- $\det$ of an orthogonal matrix is $\pm1$: $\det(Q)^2 = \det(Q^\top Q) = \det I = 1$. Rotations preserve volume.
- $\det A$ = product of the eigenvalues ([Eigenvalues](eigen.md)).

## 5. Where determinants are actually used

!!! intuition "Determinants in practice"
    In modern applied math, determinants are rarely used to *solve* anything (elimination is better). They matter as **volume scaling factors**, which is precisely what probability densities need when you change variables.

**Change of variables.** If $\vv y = A\vv x$ and $\vv x$ has density $p_X$, then a small box of volume $V$ around $\vv x$ maps to a parallelepiped of volume $|\det A|\,V$ around $\vv y$. Probability is conserved, so density goes *down* by that factor:

$$
p_Y(\vv y) = \frac{p_X(A^{-1}\vv y)}{|\det A|}.
$$

For nonlinear maps, $A$ is replaced by the Jacobian matrix ([Phase 4](../multivariable/integrals.md)).

!!! ml "Where this shows up"
    - **Normalizing flows** build complex distributions by pushing a simple one through invertible neural networks, and must compute $\log|\det J|$ at every layer. Architectures (RealNVP, Glow) are designed so the Jacobian is triangular, making the determinant a cheap product of diagonal entries.
    - **The multivariate Gaussian** density has $\frac{1}{\sqrt{(2\pi)^n\det\Sigma}}$ in front: $\sqrt{\det\Sigma}$ is the volume of the "uncertainty ellipsoid."
    - **Log-determinants** appear in Gaussian process marginal likelihoods and in the entropy of a Gaussian, $\frac12\log\det(2\pi e\Sigma)$.

## Check yourself

**1.** Compute $\det\begin{pmatrix}2 & 1 & 0\\ 1 & 3 & 1\\ 0 & 1 & 2\end{pmatrix}$ by cofactor expansion and by elimination.

??? success "Solution"
    Cofactors: $2(6 - 1) - 1(2 - 0) + 0 = 10 - 2 = 8$.
    Elimination: $R_2 - \frac12R_1$ gives $(0, 2.5, 1)$; $R_3 - 0.4R_2$ gives $(0, 0, 1.6)$. Pivots $2 \cdot 2.5 \cdot 1.6 = 8$. ✓

**2.** If $\det A = 3$ for a $4\times4$ matrix, find $\det(2A)$, $\det(A^{-1})$, $\det(A^\top A)$, $\det(A^3)$.

??? success "Solution"
    $2^4\cdot3 = 48$; $\frac13$; $3\cdot3 = 9$; $27$.

**3.** Find the area of the triangle with vertices $(1,1)$, $(4,2)$, $(2,5)$.

??? success "Solution"
    Edge vectors from $(1,1)$: $(3,1)$ and $(1,4)$. The parallelogram has area $|\det| = |12 - 1| = 11$, so the triangle has area $5.5$.

**4.** For which $t$ is $\begin{pmatrix}1 & t\\ t & 4\end{pmatrix}$ not invertible?

??? success "Solution"
    $\det = 4 - t^2 = 0 \iff t = \pm2$.

**5.** Prove that if $A$ is invertible then $\det(A^{-1}BA) = \det B$.

??? success "Solution"
    $\det(A^{-1})\det B\det A = \frac{1}{\det A}\det B\det A = \det B$. (Similar matrices represent the same map in different coordinates, and volume scaling doesn't depend on coordinates.)

**6.** $X$ is uniform on the unit square. Let $\vv Y = A\vv X$ with $A = \begin{pmatrix}2 & 1\\ 0 & 3\end{pmatrix}$. What is the density of $\vv Y$ on its support?

??? success "Solution"
    $\det A = 6$, so $Y$ is uniform on the parallelogram $A[0,1]^2$ (area 6) with density $1/6$.
