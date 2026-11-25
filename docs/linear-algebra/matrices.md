---
description: "Matrices are linear transformations: two ways to read a matrix times a vector, why matrix multiplication is composition, the transpose and special matrices."
---

# Matrices are transformations

<div class="lesson-meta" markdown>
**Phase 3 · Lesson 2** · ⏱ ~3 hours · Needs: [Vectors and the dot product](vectors.md), [Sets, functions](../foundations/sets-functions.md) (composition)
</div>

At school a matrix is a grid of numbers with a strange multiplication rule. That's the bookkeeping, not the idea.

The idea: **a matrix is a function that moves vectors around, in a way that keeps straight lines straight and the origin fixed.**

Once you see this, matrix multiplication stops being arbitrary: it's composition of functions.

## 1. Matrix times vector: two pictures

An $m\times n$ matrix $A$ has $m$ rows and $n$ columns. It multiplies a vector $\vv x \in \R^n$ to give $A\vv x \in \R^m$.

**Notation.** $A_{ij}$ (or $a_{ij}$) is the entry in **row $i$, column $j$**. Rows first, always. For

$$
A = \begin{pmatrix} 1 & 2 \\ 3 & 4 \\ 5 & 6\end{pmatrix},
$$

$A$ is $3 \times 2$, $\ A_{12} = 2$ (row 1, column 2), $\ A_{31} = 5$, and the columns are $\vv a_1 = (1, 3, 5)$ and $\vv a_2 = (2, 4, 6)$.

**Adding and scaling matrices** works entry by entry, exactly like vectors (only for matrices of the same size):

$$
\begin{pmatrix}1 & 2\\3 & 4\end{pmatrix} + \begin{pmatrix}0 & 1\\1 & 0\end{pmatrix} = \begin{pmatrix}1 & 3\\4 & 4\end{pmatrix}, \qquad 3\begin{pmatrix}1 & 2\\3 & 4\end{pmatrix} = \begin{pmatrix}3 & 6\\9 & 12\end{pmatrix}.
$$

Multiplication is the interesting operation. Start with a matrix times a vector.

The size rule: $A\vv x$ needs $\vv x$ to have as many entries as $A$ has **columns**. The answer has as many entries as $A$ has **rows**.

**Row picture:** each entry of $A\vv x$ is a dot product of a row of $A$ with $\vv x$:

$$
\begin{pmatrix} 1 & 2 \\ 3 & 4 \\ 5 & 6\end{pmatrix}\begin{pmatrix} x_1 \\ x_2\end{pmatrix} = \begin{pmatrix} 1x_1 + 2x_2 \\ 3x_1 + 4x_2 \\ 5x_1 + 6x_2\end{pmatrix}.
$$

**Column picture** (the important one): $A\vv x$ is a **linear combination of the columns** of $A$, with coefficients from $\vv x$:

$$
A\vv x = x_1\begin{pmatrix}1\\3\\5\end{pmatrix} + x_2\begin{pmatrix}2\\4\\6\end{pmatrix} = x_1\vv a_1 + x_2\vv a_2.
$$

Same numbers, different grouping.

!!! example "Example: one product, both pictures"
    $$
    \begin{pmatrix} 2 & 1 \\ 1 & 3 \end{pmatrix}\begin{pmatrix} 1 \\ 2\end{pmatrix}
    $$

    **Row picture.** Dot each row with $(1, 2)$:

    - Row 1: $(2, 1)\cdot(1, 2) = 2 + 2 = 4$.
    - Row 2: $(1, 3)\cdot(1, 2) = 1 + 6 = 7$.

    **Column picture.** Take 1 copy of column 1 plus 2 copies of column 2:

    $$
    1\begin{pmatrix}2\\1\end{pmatrix} + 2\begin{pmatrix}1\\3\end{pmatrix} = \begin{pmatrix}2 + 2\\1 + 6\end{pmatrix} = \begin{pmatrix}4\\7\end{pmatrix}.
    $$

    Both give $(4, 7)$. (Compare the linear-combination example in the [last lesson](vectors.md): it was this same calculation, run backwards.)

The column picture answers deep questions directly. "Which outputs can $A$ produce?" becomes "which combinations of its columns are there?"

## 2. Linear transformations

!!! definition "Definition: linear transformation"
    A function $T : \R^n \to \R^m$ is **linear** if for all vectors $\vv u, \vv v$ and scalars $c$:

    $$
    T(\vv u + \vv v) = T(\vv u) + T(\vv v), \qquad T(c\vv u) = c\,T(\vv u).
    $$

    Equivalently, $T$ preserves linear combinations: $T(a\vv u + b\vv v) = aT(\vv u) + bT(\vv v)$.

Geometrically: grid lines stay parallel and evenly spaced, and the origin stays put.

- **Linear:** rotations, reflections, stretches, shears and projections.
- **Not linear:** translations $\vv x \mapsto \vv x + \vv b$, because they move the origin.

Every matrix gives a linear map $\vv x \mapsto A\vv x$ (check the two conditions from the column picture). The converse is the key theorem:

(The check, in the column picture: $A(\vv u + \vv v) = \sum_j (u_j + v_j)\vv a_j = \sum_j u_j\vv a_j + \sum_j v_j \vv a_j = A\vv u + A\vv v$, and similarly $A(c\vv u) = cA\vv u$.)

A consequence worth noticing: **every linear map sends $\vv 0$ to $\vv 0$**, because $T(\vv 0) = T(0 \cdot \vv 0) = 0 \cdot T(\vv 0) = \vv 0$. That's a one-second test for non-linearity.

!!! theorem "Theorem: every linear map is a matrix"
    If $T : \R^n \to \R^m$ is linear, then $T(\vv x) = A\vv x$ for the matrix whose $j$-th column is $T(\vv e_j)$:

    $$
    A = \Big(T(\vv e_1)\ \Big|\ T(\vv e_2)\ \Big|\ \cdots\ \Big|\ T(\vv e_n)\Big).
    $$

!!! proof "Proof"
    Write $\vv x = x_1\vv e_1 + \cdots + x_n\vv e_n$. By linearity, $T(\vv x) = x_1T(\vv e_1) + \cdots + x_nT(\vv e_n)$, which is exactly the column picture of $A\vv x$.

!!! intuition "The columns are the whole story"
    **To know a linear map, you only need to know where the basis vectors go.** Everything else follows by linearity. The columns of $A$ are those images. Play with it:

<div class="viz" data-viz="lintrans"></div>

### A gallery of 2×2 transformations

Each matrix below was built by deciding where $\vv e_1 = (1, 0)$ and $\vv e_2 = (0, 1)$ should go, and writing those as the columns.

| Matrix | $\vv e_1 \mapsto$ | $\vv e_2 \mapsto$ | What it does |
|---|---|---|---|
| $\begin{pmatrix}2 & 0\\0 & 3\end{pmatrix}$ | $(2, 0)$ | $(0, 3)$ | stretch $x$ by 2, $y$ by 3 |
| $\begin{pmatrix}1 & 0\\0 & -1\end{pmatrix}$ | $(1, 0)$ | $(0, -1)$ | reflect across the $x$-axis |
| $\begin{pmatrix}0 & -1\\1 & 0\end{pmatrix}$ | $(0, 1)$ | $(-1, 0)$ | rotate 90° counterclockwise |
| $\begin{pmatrix}1 & 1\\0 & 1\end{pmatrix}$ | $(1, 0)$ | $(1, 1)$ | shear: slide each row sideways by its height |
| $\begin{pmatrix}1 & 0\\0 & 0\end{pmatrix}$ | $(1, 0)$ | $(0, 0)$ | project onto the $x$-axis (flatten) |

Try one on a specific vector. The shear sends $(2, 3)$ to $2(1, 0) + 3(1, 1) = (5, 3)$: the height stays $3$, and the point slides right by $3$.

!!! example "Example: rotation by θ"
    Rotation sends:

    - $\vv e_1 = (1,0)$ to $(\cos\theta, \sin\theta)$;
    - $\vv e_2 = (0,1)$ to $(-\sin\theta, \cos\theta)$.

    The first is the definition of $\cos$ and $\sin$: $\vv e_1$ sits at angle $0$, and rotating it lands at angle $\theta$ on the unit circle.

    For the second: $\vv e_2$ sits at angle $90°$, so it lands at angle $\theta + 90°$, the point $(\cos(\theta + 90°), \sin(\theta + 90°))$. The angle-addition formulas simplify this to $(-\sin\theta, \cos\theta)$. (Sanity check with $\theta = 90°$: $\vv e_2$ goes to $(-1, 0)$, a quarter-turn. ✓)

    So

    $$
    R_\theta = \begin{pmatrix}\cos\theta & -\sin\theta\\ \sin\theta & \cos\theta\end{pmatrix}.
    $$

    No trigonometry memorization needed: just ask where the two basis arrows land.

## 3. Matrix multiplication is composition

If $B$ is $m\times n$ and $A$ is $p\times m$, then "do $B$, then $A$" is a linear map $\R^n \to \R^p$.

By the theorem above, its matrix has columns $A(B\vv e_j) = A\vv b_j$. So we **define** the product $AB$ to be that matrix:

!!! definition "Definition: matrix product"
    $$
    AB = \Big(A\vv b_1\ \Big|\ A\vv b_2\ \Big|\ \cdots\ \Big|\ A\vv b_n\Big), \qquad (AB)_{ij} = \sum_{k=1}^m A_{ik}B_{kj}.
    $$

    - The $(i,j)$ entry is the dot product of row $i$ of $A$ with column $j$ of $B$.
    - Sizes: $(p\times m)(m\times n) = p\times n$. The inner dimensions must match.

So $(AB)\vv x = A(B\vv x)$ by construction.

**The strange multiplication rule is forced by wanting products to mean composition.**

Why the inner sizes must match: $B$ outputs vectors in $\R^m$, and $A$ must accept them as inputs. "Do $B$, then $A$" only makes sense if $B$'s outputs fit into $A$.

Note the order: $AB$ means **$B$ first**, then $A$, just like $g \circ f$ means $f$ first. The matrix nearest the vector acts first.

!!! example "Example: a product, entry by entry and column by column"
    $$
    A = \begin{pmatrix}1 & 2\\3 & 4\end{pmatrix}, \qquad B = \begin{pmatrix}5 & 6\\7 & 8\end{pmatrix}.
    $$

    **Entry by entry** (row of $A$ dotted with column of $B$):

    | Entry | Row of $A$ · column of $B$ | Value |
    |---|---|---|
    | $(1,1)$ | $(1, 2)\cdot(5, 7)$ | $5 + 14 = 19$ |
    | $(1,2)$ | $(1, 2)\cdot(6, 8)$ | $6 + 16 = 22$ |
    | $(2,1)$ | $(3, 4)\cdot(5, 7)$ | $15 + 28 = 43$ |
    | $(2,2)$ | $(3, 4)\cdot(6, 8)$ | $18 + 32 = 50$ |

    $$
    AB = \begin{pmatrix}19 & 22\\43 & 50\end{pmatrix}.
    $$

    **Column by column:** the first column of $AB$ is $A$ times the first column of $B$:

    $$
    A\begin{pmatrix}5\\7\end{pmatrix} = 5\begin{pmatrix}1\\3\end{pmatrix} + 7\begin{pmatrix}2\\4\end{pmatrix} = \begin{pmatrix}19\\43\end{pmatrix}. \ ✓
    $$

!!! example "Example: composing two geometric maps, in both orders"
    Let $R = \begin{pmatrix}0 & -1\\1 & 0\end{pmatrix}$ (rotate 90°) and $F = \begin{pmatrix}1 & 0\\0 & -1\end{pmatrix}$ (reflect across the $x$-axis).

    - $FR$ (rotate, then reflect): $\ FR = \begin{pmatrix}0 & -1\\-1 & 0\end{pmatrix}$. It sends $\vv e_1 \to (0, 1) \to (0, -1)$.
    - $RF$ (reflect, then rotate): $\ RF = \begin{pmatrix}0 & 1\\1 & 0\end{pmatrix}$. It sends $\vv e_1 \to (1, 0) \to (0, 1)$.

    Different results: $FR \neq RF$. Follow $\vv e_1$ with your finger to see it. ($RF$ is the reflection across the line $y = x$, and $FR$ the reflection across $y = -x$.)

Consequences:

- **Associative:** $(AB)C = A(BC)$.
    - Proof: both represent "do $C$, then $B$, then $A$," and composition of functions is associative.
    - Checking this with index sums is a mess; the function view makes it obvious.
- **Not commutative:** $AB \neq BA$ in general. Rotate-then-shear differs from shear-then-rotate.
    - Example: $A = \begin{pmatrix}0&1\\0&0\end{pmatrix}$, $B = \begin{pmatrix}0&0\\1&0\end{pmatrix}$ give $AB = \begin{pmatrix}1&0\\0&0\end{pmatrix}$ but $BA = \begin{pmatrix}0&0\\0&1\end{pmatrix}$.
- **Distributive:** $A(B + C) = AB + AC$.
- **Identity:** $I$ (ones on the diagonal) does nothing: $AI = IA = A$.
    - Its columns are $\vv e_1, \dots, \vv e_n$, so it sends each basis vector to itself. For example $I_2 = \begin{pmatrix}1 & 0\\0 & 1\end{pmatrix}$.
- **Powers:** $A^2 = AA$ means "apply $A$ twice." For the 90° rotation, $R^2$ is a 180° rotation, $R^2 = -I$, and $R^4 = I$.

### Four ways to see a product

1. Entry by entry: $(AB)_{ij} = (\text{row } i \text{ of } A)\cdot(\text{column } j\text{ of }B)$.
2. Column by column: column $j$ of $AB$ is $A$ times column $j$ of $B$.
3. Row by row: row $i$ of $AB$ is (row $i$ of $A$) times $B$.
4. **Sum of outer products:** $AB = \sum_k (\text{column } k \text{ of } A)(\text{row } k\text{ of } B)$. Each term is a rank-one matrix (see the SVD lesson).

## 4. Transpose

!!! definition "Definition: transpose"
    $A^\top$ is $A$ flipped over its diagonal: $(A^\top)_{ij} = A_{ji}$. An $m\times n$ matrix becomes $n\times m$.

In practice: **the rows of $A$ become the columns of $A^\top$.**

$$
A = \begin{pmatrix}1 & 2 & 3\\4 & 5 & 6\end{pmatrix} \quad\Longrightarrow\quad A^\top = \begin{pmatrix}1 & 4\\2 & 5\\3 & 6\end{pmatrix}.
$$

Transposing twice gets you back: $(A^\top)^\top = A$.

A vector is an $n\times1$ matrix, so:

| Expression | Shapes | Result |
|---|---|---|
| $\vv u^\top\vv v$ | $(1\times n)(n\times1)$ | a number: the dot product |
| $\vv u\vv v^\top$ | $(n\times1)(1\times n)$ | an $n\times n$ matrix: the **outer product** |

With numbers, $\vv u = (1, 2)$ and $\vv v = (3, 4)$:

$$
\vv u^\top\vv v = \begin{pmatrix}1 & 2\end{pmatrix}\begin{pmatrix}3\\4\end{pmatrix} = 11, \qquad \vv u\vv v^\top = \begin{pmatrix}1\\2\end{pmatrix}\begin{pmatrix}3 & 4\end{pmatrix} = \begin{pmatrix}3 & 4\\6 & 8\end{pmatrix}.
$$

Each entry of the outer product is $u_iv_j$. Notice every row is a multiple of $(3, 4)$ and every column a multiple of $(1, 2)$.

!!! theorem "Theorem"
    $(AB)^\top = B^\top A^\top$.

!!! proof "Proof"
    $\big((AB)^\top\big)_{ij} = (AB)_{ji} = \sum_k A_{jk}B_{ki} = \sum_k (B^\top)_{ik}(A^\top)_{kj} = (B^\top A^\top)_{ij}$.

(Like putting on socks then shoes, and taking off shoes then socks: the order reverses.)

A useful identity:

$$
(A\vv x)\cdot\vv y = (A\vv x)^\top\vv y = \vv x^\top A^\top\vv y = \vv x\cdot(A^\top\vv y).
$$

**The transpose is what moves a matrix to the other side of a dot product.**

## 5. Special matrices

| Type | Definition | Geometric meaning |
|---|---|---|
| Diagonal | $A_{ij} = 0$ for $i\neq j$ | stretch each axis independently |
| Symmetric | $A^\top = A$ | stretch along perpendicular axes ([spectral theorem](spectral.md)) |
| Orthogonal | $Q^\top Q = I$ | rotation or reflection: preserves lengths and angles |
| Triangular | zeros below (or above) the diagonal | arises from elimination |
| Projection | $P^2 = P$ | flattening onto a subspace: doing it twice = once |

Examples of each, from this lesson:

- **Diagonal:** $\begin{pmatrix}2 & 0\\0 & 3\end{pmatrix}$, the stretch.
- **Symmetric:** $\begin{pmatrix}2 & 1\\1 & 3\end{pmatrix}$. The entry above the diagonal mirrors the one below.
- **Orthogonal:** the rotation $R_\theta$. Its columns are unit vectors at right angles to each other, which is exactly what $Q^\top Q = I$ says (entry $(i, j)$ of $Q^\top Q$ is column $i$ dotted with column $j$).
- **Triangular:** $\begin{pmatrix}1 & 1\\0 & 1\end{pmatrix}$, the shear.
- **Projection:** $\begin{pmatrix}1 & 0\\0 & 0\end{pmatrix}$. Flattening onto the $x$-axis twice is the same as once.

!!! ml "Where this shows up"
    - **A dense neural network layer** is $\vv h = \sigma(W\vv x + \vv b)$: a linear map, a shift, then a nonlinearity.
        - Without the nonlinearity, stacking layers would be pointless: $W_2(W_1\vv x) = (W_2W_1)\vv x$ is a single linear map.
    - **Batches:** stack $B$ inputs as rows of $X$ ($B\times d$). Then $XW^\top$ applies the layer to all of them in one matrix product.
        - That's why GPUs, which are fast at matrix multiplication, dominate deep learning.
    - **Attention** computes $QK^\top$: all query–key dot products at once.
    - **Embeddings:** looking up a token's embedding is multiplying a one-hot vector by the embedding matrix, i.e. selecting a column.

## Check yourself

**1.** Compute $\begin{pmatrix}1&2\\0&1\end{pmatrix}\begin{pmatrix}3\\-1\end{pmatrix}$ with both the row and the column picture.

??? success "Solution"
    - **Rows:** $(3 - 2,\ 0 - 1) = (1, -1)$.
    - **Columns:** $3\begin{pmatrix}1\\0\end{pmatrix} - 1\begin{pmatrix}2\\1\end{pmatrix} = \begin{pmatrix}1\\-1\end{pmatrix}$.

**2.** Find the matrix that reflects $\R^2$ across the line $y = x$.

??? success "Solution"
    $\vv e_1 \mapsto (0,1)$ and $\vv e_2 \mapsto (1, 0)$. So the matrix is $\begin{pmatrix}0&1\\1&0\end{pmatrix}$.

**3.** Show that $R_\alpha R_\beta = R_{\alpha+\beta}$ by multiplying the matrices. What identities did you just re-derive?

??? success "Solution"
    - Top-left entry: $\cos\alpha\cos\beta - \sin\alpha\sin\beta = \cos(\alpha+\beta)$.
    - Bottom-left entry: $\sin\alpha\cos\beta + \cos\alpha\sin\beta = \sin(\alpha + \beta)$.
    - The others follow similarly.

    Composing rotations adds angles, so the matrix product *is* the angle-addition formulas.

**4.** Is $T(x, y) = (x + y, 2x, xy)$ linear? What about $T(x,y) = (x+1, y)$?

??? success "Solution"
    No in both cases.

    - **First:** $T(2\cdot(1,1)) = (4, 4, 4)$, but $2T(1,1) = (4, 4, 2)$.
    - **Second:** it moves the origin. $T(0,0) = (1, 0) \neq (0,0)$, and every linear map sends $0$ to $0$.

**5.** If $A$ is $3\times5$ and $B$ is $5\times2$, which of $AB$, $BA$, $A^\top B$, $B^\top A^\top$ are defined, and what are their sizes?

??? success "Solution"
    | Product | Shapes | Result |
    |---|---|---|
    | $AB$ | $(3\times5)(5\times2)$ | $3\times2$ |
    | $BA$ | $(5\times2)(3\times5)$ | not defined |
    | $A^\top B$ | $(5\times3)(5\times2)$ | not defined |
    | $B^\top A^\top = (AB)^\top$ | $(2\times5)(5\times3)$ | $2\times3$ |

**6.** Prove that the product of two orthogonal matrices is orthogonal.

??? success "Solution"
    $(Q_1Q_2)^\top(Q_1Q_2) = Q_2^\top Q_1^\top Q_1Q_2 = Q_2^\top I Q_2 = I$.

**7.** Show that two linear layers without activation, $W_2(W_1\vv x + \vv b_1) + \vv b_2$, equal a single layer $W\vv x + \vv b$. Find $W$ and $\vv b$.

??? success "Solution"
    Expanding gives $W_2W_1\vv x + W_2\vv b_1 + \vv b_2$, so:

    - $W = W_2W_1$
    - $\vv b = W_2\vv b_1 + \vv b_2$

    Depth gives no extra expressive power without nonlinearities.
