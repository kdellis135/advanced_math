# Vector spaces, basis, rank

<div class="lesson-meta" markdown>
**Phase 3 · Lesson 4** · ⏱ ~3.5 hours · Needs: [Solving linear systems](linear-systems.md)
</div>

This lesson gives you the vocabulary for asking *how much* a matrix can do:

- which outputs it can reach;
- which inputs it destroys;
- how many "genuinely different directions" are involved.

The punchline is the **rank–nullity theorem**: dimensions in = dimensions kept + dimensions destroyed.

## 1. Subspaces and span

!!! definition "Definition: subspace"
    A **subspace** of $\R^n$ is a set $V$ of vectors that:

    1. contains $\vv 0$, and
    2. is **closed under linear combinations**: if $\vv u, \vv v \in V$, then $a\vv u + b\vv v \in V$ for all scalars $a, b$.

The subspaces of $\R^3$ are:

- $\{\vv 0\}$;
- lines through the origin;
- planes through the origin;
- $\R^3$ itself.

A line *not* through the origin is not a subspace.

Think of a subspace as a "flat" set through the origin that you can never leave by adding or scaling. Checking the two conditions on examples in $\R^2$ and $\R^3$:

!!! example "Example: subspace or not?"
    | Set | Contains $\vv 0$? | Closed under combinations? | Subspace? |
    |---|---|---|---|
    | the plane $x + y + z = 0$ in $\R^3$ | yes | yes (below) | **yes** |
    | the line $y = x + 1$ in $\R^2$ | no: $(0, 0)$ gives $0 = 1$ | | **no** |
    | the first quadrant $x \geq 0, y \geq 0$ | yes | no: $(1, 1)$ is in it, but $-1 \cdot (1, 1) = (-1, -1)$ isn't | **no** |
    | the two axes together | yes | no: $(1, 0) + (0, 1) = (1, 1)$ is on neither axis | **no** |

    Why the plane passes: take $\vv u, \vv v$ with $u_1 + u_2 + u_3 = 0$ and $v_1 + v_2 + v_3 = 0$. The coordinates of $a\vv u + b\vv v$ add up to $a(u_1 + u_2 + u_3) + b(v_1 + v_2 + v_3) = a \cdot 0 + b \cdot 0 = 0$. So it's in the plane too.

    In general: the solutions of $A\vv x = \vv 0$ always form a subspace (by the same argument). The solutions of $A\vv x = \vv b$ with $\vv b \neq \vv 0$ never do, since $\vv 0$ isn't one of them.

More generally, a **vector space** is any set where addition and scaling make sense and obey the usual rules: polynomials, functions, matrices. All the ideas in this lesson carry over. For example, the space of polynomials of degree $\leq 2$ has basis $1, x, x^2$.

!!! definition "Definition: span"
    The **span** of $\vv v_1, \ldots, \vv v_k$ is the set of all their linear combinations:

    $$
    \operatorname{span}(\vv v_1, \ldots, \vv v_k) = \{c_1\vv v_1 + \cdots + c_k\vv v_k : c_i \in \R\}.
    $$

    It is always a subspace.

The span is "everywhere you can reach" using those vectors as building blocks.

| Vectors | Span |
|---|---|
| $(1, 2)$ | the line through the origin in direction $(1, 2)$ |
| $(1, 0)$ and $(0, 1)$ | all of $\R^2$ |
| $(1, 2)$ and $(2, 4)$ | still just the line through $(1, 2)$: the second vector is parallel |
| $(1, 0, 0)$ and $(0, 1, 0)$ | the $xy$-plane in $\R^3$ |

**Is $\vv b$ in the span of $\vv v_1, \dots, \vv v_k$?** Put the $\vv v_i$ as the columns of a matrix $A$. Then the question is whether $A\vv c = \vv b$ has a solution, which elimination answers.

!!! example "Example: testing span membership"
    Is $(1, 1, 2)$ in the span of $(1, 0, 1)$ and $(0, 1, 1)$?

    We need $c_1(1, 0, 1) + c_2(0, 1, 1) = (1, 1, 2)$. The first coordinate forces $c_1 = 1$, the second forces $c_2 = 1$, and then the third is $1 + 1 = 2$. ✓ Yes.

    And $(1, 1, 3)$? The same $c_1 = c_2 = 1$ would give third coordinate $2 \neq 3$. No.

## 2. Linear independence

Some vectors in a list may be redundant.

In $(1,0), (0,1), (1,1)$, the third is the sum of the first two, and adds nothing to the span.

!!! definition "Definition: linear independence"
    Vectors $\vv v_1, \ldots, \vv v_k$ are **linearly independent** if the only combination giving zero is the trivial one:

    $$
    c_1\vv v_1 + \cdots + c_k\vv v_k = \vv 0 \implies c_1 = \cdots = c_k = 0.
    $$

    Otherwise they are **dependent**: some $\vv v_i$ is a combination of the others.

Why "a nontrivial combination gives zero" means "one vector is a combination of the others": for $(1,0), (0,1), (1,1)$ we have $1\cdot(1,0) + 1\cdot(0,1) - 1\cdot(1,1) = \vv 0$. Solve for any vector with a nonzero coefficient: $(1,1) = (1,0) + (0,1)$.

In matrix language, these are equivalent:

- the columns of $A$ are independent;
- **$A\vv x = \vv 0$ has only the solution $\vv x = \vv 0$**;
- every column gets a pivot in elimination.

!!! intuition "Independence = no redundancy"
    Each independent vector adds a genuinely new direction.

    - Two vectors in $\R^2$ are independent iff they're not parallel.
    - Three vectors in $\R^3$ are independent iff they don't lie in a common plane.
    - Any 4 vectors in $\R^3$ are dependent: there's no room.

!!! example "Example: testing independence by elimination"
    Are $(1, 1, 0)$, $(0, 1, 1)$, $(1, 2, 1)$ independent? Put them as columns and eliminate:

    $$
    \begin{pmatrix}1 & 0 & 1\\1 & 1 & 2\\0 & 1 & 1\end{pmatrix}
    \xrightarrow{R_2 - R_1}
    \begin{pmatrix}1 & 0 & 1\\0 & 1 & 1\\0 & 1 & 1\end{pmatrix}
    \xrightarrow{R_3 - R_2}
    \begin{pmatrix}1 & 0 & 1\\0 & 1 & 1\\0 & 0 & 0\end{pmatrix}.
    $$

    Only 2 pivots for 3 columns, so they're **dependent**. Column 3 has no pivot, so the third vector is a combination of the first two. Indeed $(1, 2, 1) = (1, 1, 0) + (0, 1, 1)$.

    Change the third vector to $(1, 0, 1)$ and the same steps give pivots in all three columns: independent.

## 3. Basis and dimension

!!! definition "Definition: basis"
    A **basis** of a subspace $V$ is a list of vectors that is (1) linearly independent and (2) spans $V$.

Each vector in $V$ then has a **unique** representation $\vv v = c_1\vv b_1 + \cdots + c_k\vv b_k$.

- **Existence** comes from spanning.
- **Uniqueness:** if two representations existed, subtracting them would give a nontrivial combination equal to zero, contradicting independence.

The numbers $c_i$ are the **coordinates** of $\vv v$ in that basis.

!!! example "Example: the same vector, two coordinate systems"
    In the standard basis, $\vv v = (3, 1)$ has coordinates $3$ and $1$: $\ \vv v = 3\vv e_1 + 1\vv e_2$.

    Now use the basis $\vv b_1 = (1, 1)$, $\vv b_2 = (1, -1)$ (two perpendicular diagonal directions). We need $c_1(1, 1) + c_2(1, -1) = (3, 1)$:

    $$
    c_1 + c_2 = 3, \qquad c_1 - c_2 = 1 \quad\Longrightarrow\quad c_1 = 2,\ c_2 = 1.
    $$

    So in this basis, $\vv v$ has coordinates $(2, 1)$. Same arrow, different description: "2 steps along $\vv b_1$, 1 step along $\vv b_2$."

    Choosing a good basis is a recurring theme: eigenvectors, the SVD and Fourier series are all clever choices of basis that make a problem simple.

**Examples of bases:**

- $\R^n$: the standard basis $\vv e_1, \dots, \vv e_n$.
- The line through $(1, 2)$: the single vector $(1, 2)$ (or any nonzero multiple of it).
- The plane $x + y + z = 0$: for example $(1, -1, 0)$ and $(1, 0, -1)$. Both lie in the plane, they aren't parallel, and two independent vectors fill out a plane.

!!! theorem "Theorem: dimension is well defined"
    Every basis of a subspace $V$ has the same number of vectors. That number is the **dimension** $\dim V$.

??? proof "Proof (deeper)"
    **Key lemma:** if $\vv w_1, \ldots, \vv w_m$ lie in the span of $\vv v_1, \ldots, \vv v_k$ and $m > k$, then the $\vv w$'s are dependent.

    *Proof of the lemma:*

    1. Write each $\vv w_j = \sum_i a_{ij}\vv v_i$, so $W = VA$ where $A$ is $k\times m$. (Here $V$ is the matrix with columns $\vv v_i$ and $W$ the matrix with columns $\vv w_j$. The column picture says column $j$ of $VA$ is $V$ times column $j$ of $A$, i.e. $\sum_i a_{ij}\vv v_i = \vv w_j$.)
    2. $A$ has more columns than rows, so elimination leaves a free variable: $A\vv c = \vv 0$ for some $\vv c \neq \vv 0$.
    3. Then $W\vv c = VA\vv c = \vv 0$: a nontrivial dependency.

    Now if two bases had sizes $k < m$, the larger one would lie in the span of the smaller and so be dependent. Contradiction.

So $\dim\R^n = n$, a plane has dimension 2, a line dimension 1, and $\{\vv 0\}$ dimension 0.

In an $n$-dimensional space:

- any $n$ independent vectors form a basis;
- any $n$ spanning vectors form a basis;
- more than $n$ vectors are dependent;
- fewer than $n$ vectors can't span.

## 4. The four fundamental subspaces

For an $m\times n$ matrix $A$ (a map $\R^n \to \R^m$):

| Subspace | Definition | Lives in | Meaning |
|---|---|---|---|
| **Column space** $C(A)$ | all $A\vv x$ (span of columns) | $\R^m$ | outputs $A$ can produce |
| **Null space** $N(A)$ | all $\vv x$ with $A\vv x = \vv 0$ | $\R^n$ | inputs $A$ destroys |
| Row space $C(A^\top)$ | span of rows | $\R^n$ | input directions $A$ "sees" |
| Left null space $N(A^\top)$ | all $\vv y$ with $A^\top\vv y = \vv 0$ | $\R^m$ | output directions $A$ can't reach |

!!! definition "Definition: rank"
    The **rank** of $A$ is $\dim C(A)$, the number of independent columns. It equals the number of pivots.

!!! example "Example: all four subspaces of a small matrix"
    $$
    A = \begin{pmatrix}1 & 2\\2 & 4\end{pmatrix}.
    $$

    The second column is twice the first, and the second row is twice the first. Elimination ($R_2 - 2R_1$) leaves one pivot, so $\rank A = 1$.

    | Subspace | How to find it | Answer |
    |---|---|---|
    | column space | span of the columns $(1, 2)$, $(2, 4)$ | the line through $(1, 2)$ |
    | null space | solve $x + 2y = 0$ | the line through $(-2, 1)$ |
    | row space | span of the rows $(1, 2)$, $(2, 4)$ | the line through $(1, 2)$ |
    | left null space | solve $A^\top\vv y = \vv 0$, i.e. $y_1 + 2y_2 = 0$ | the line through $(-2, 1)$ |

    Every output $A\vv x = x_1(1, 2) + x_2(2, 4) = (x_1 + 2x_2)(1, 2)$ is a multiple of $(1, 2)$. So $A$ squashes the whole plane onto one line, and the direction $(-2, 1)$ is crushed to zero: $A(-2, 1) = (-2 + 2, -4 + 4) = (0, 0)$.

    Notice $(1, 2) \cdot (-2, 1) = 0$: the null space is perpendicular to the row space. Section 7 explains why that always happens.

**How to find bases in general:**

- **Column space:** eliminate, see which columns have pivots, then take *those columns of the original $A$* (not of the eliminated matrix, since row operations change the columns).
- **Null space:** the special solutions (see the proof of rank–nullity below, and exercise 2).
- **Row space:** the nonzero rows of the eliminated matrix.

!!! theorem "Theorem: row rank = column rank"
    $\dim C(A) = \dim C(A^\top)$: the number of independent columns equals the number of independent rows.

??? proof "Proof (deeper)"
    Row operations:

    - don't change the row space (they replace rows by combinations of rows, reversibly);
    - don't change which *sets of columns* are independent (they preserve the solutions of $A\vv x = \vv 0$, which encode the column dependencies).

    In the echelon form:

    - the nonzero rows (one per pivot) are independent and span the row space;
    - the pivot columns are independent and span the column space.

    Both counts equal the number of pivots.

## 5. Rank–nullity

!!! theorem "Rank–nullity theorem"
    For an $m \times n$ matrix $A$:

    $$
    \rank A + \dim N(A) = n.
    $$

!!! intuition "Conservation of dimension"
    $A$ takes in $n$ dimensions.

    - Some survive to the output (the rank).
    - The rest are crushed to zero (the null space).

    Nothing else can happen to a dimension.

Check it on examples:

| Matrix | $n$ (inputs) | rank | $\dim N(A)$ | |
|---|---|---|---|---|
| $\begin{pmatrix}1 & 2\\2 & 4\end{pmatrix}$ above | 2 | 1 | 1 | $1 + 1 = 2$ ✓ |
| the $2 \times 2$ identity | 2 | 2 | 0 | nothing destroyed |
| projection onto the $x$-axis in $\R^3$ | 3 | 1 | 2 | the $y$ and $z$ directions are crushed |
| exercise 2 below ($2 \times 4$) | 4 | 2 | 2 | |

!!! proof "Proof"
    Elimination on $A\vv x = \vv 0$ gives $r = \rank A$ pivot variables and $n - r$ free variables.

    - Setting one free variable to 1 and the others to 0 determines the pivot variables uniquely. That gives one **special solution** for each free variable.
    - These $n - r$ special solutions are independent: each has a 1 where the others have 0.
    - Every null space vector is a combination of them, since it's determined by its free-variable values.

    So $\dim N(A) = n - r$.

## 6. The complete solution of $A\vv x = \vv b$

!!! theorem "Theorem: structure of solutions"
    If $\vv x_p$ is any one solution of $A\vv x = \vv b$ (a *particular* solution), then **all** solutions are

    $$
    \vv x = \vv x_p + \vv x_n, \qquad \vv x_n \in N(A).
    $$

!!! proof "Proof"
    - If $A\vv x = \vv b$, then $A(\vv x - \vv x_p) = \vv b - \vv b = \vv 0$, so $\vv x - \vv x_p \in N(A)$.
    - Conversely, $A(\vv x_p + \vv x_n) = \vv b + \vv 0 = \vv b$.

So the solution set is the null space shifted to pass through $\vv x_p$: a point, a line, a plane…

You already saw this in [the last lesson](linear-systems.md): the line of solutions $(2, 0, 2) + t(-2, 1, 0)$ was a particular solution plus multiples of a null space vector.

!!! example "Example: complete solution"
    Solve $\begin{pmatrix}1 & 2\\2 & 4\end{pmatrix}\vv x = \begin{pmatrix}3\\6\end{pmatrix}$.

    1. Particular solution: guess $\vv x_p = (3, 0)$. Check: $(3 + 0, 6 + 0) = (3, 6)$. ✓
    2. Null space: multiples of $(-2, 1)$, found above.
    3. All solutions: $\vv x = (3, 0) + t(-2, 1)$.

    Geometrically, it's the line $x + 2y = 3$: a copy of the null-space line, shifted to pass through $(3, 0)$.

The same structure appears in differential equations: general solution = particular + homogeneous.

## 7. Orthogonality of the fundamental subspaces

!!! theorem "Theorem"
    Every vector in the null space is perpendicular to every vector in the row space.

!!! proof "Proof"
    $A\vv x = \vv 0$ says that each row of $A$ dotted with $\vv x$ is 0. So $\vv x$ is perpendicular to each row, and hence to every combination of rows.

So each space splits into two perpendicular pieces:

| Space | Piece 1 | Piece 2 | Dimensions |
|---|---|---|---|
| $\R^n$ (inputs) | row space | null space | $r + (n - r) = n$ |
| $\R^m$ (outputs) | column space | left null space | $r + (m - r) = m$ |

This picture (Strang's "big picture of linear algebra") is the map for everything in the next lessons.

## 8. The invertible matrix theorem

For a **square** $n\times n$ matrix, all of these are equivalent:

1. $A$ is invertible.
2. $\rank A = n$ (full rank).
3. $N(A) = \{\vv 0\}$.
4. The columns are independent; the columns span $\R^n$; the columns form a basis.
5. $A\vv x = \vv b$ has exactly one solution for every $\vv b$.

*Why they're equivalent:*

- By rank–nullity, (2) ⇔ (3).
- For a square matrix, $n$ independent columns in $\R^n$ automatically span $\R^n$ (from §3). So a solution of (5) exists, and it's unique because the null space is trivial.

Section 4 of [Determinants](determinants.md) adds "$\det A \neq 0$" to the list.

!!! ml "Where this shows up"
    - **Low rank is everywhere.** A $1000\times1000$ weight update of rank 8 has only $2\cdot1000\cdot8$ free parameters instead of $10^6$. That's the idea of **LoRA** fine-tuning.
    - **Collinear features** (one feature a combination of others) make $X$ rank-deficient.
        - $X^\top X$ isn't invertible, and regression coefficients aren't unique.
        - Ridge regression fixes this.
    - **Null spaces explain non-identifiability:** if $\vv x_n \in N(X)$, then weights $\vv w$ and $\vv w + \vv x_n$ make identical predictions on the training data.
    - **Overparameterized models** (more parameters than data points) have huge null spaces.
        - Infinitely many weight settings fit the training data perfectly.
        - *Which one* training finds is what determines generalization.

## Check yourself

**1.** Are $(1, 2, 3)$, $(4, 5, 6)$, $(7, 8, 9)$ independent?

??? success "Solution"
    No: $(7, 8, 9) = 2(4,5,6) - (1,2,3)$.

    Elimination gives only 2 pivots. They span a plane.

**2.** Find a basis for the null space of $A = \begin{pmatrix}1 & 2 & 0 & 1\\ 2 & 4 & 1 & 4\end{pmatrix}$ and verify rank–nullity.

??? success "Solution"
    $R_2 - 2R_1$ gives the row $(0, 0, 1, 2)$.

    - Pivots are in columns 1 and 3, so $x_2, x_4$ are free.
    - From the rows: $x_3 = -2x_4$ and $x_1 = -2x_2 - x_4$.

    Special solutions:

    | Free values | Special solution |
    |---|---|
    | $x_2 = 1, x_4 = 0$ | $(-2, 1, 0, 0)$ |
    | $x_2 = 0, x_4 = 1$ | $(-1, 0, -2, 1)$ |

    Rank $2$ + nullity $2$ = $4$ columns. ✓

**3.** Show that if $A$ is $m\times n$ with $n > m$, then $A\vv x = \vv 0$ has a nonzero solution.

??? success "Solution"
    $\rank A \leq m$ (at most one pivot per row), so $\dim N(A) = n - \rank A \geq n - m > 0$.

**4.** What is the rank of the outer product $\vv u\vv v^\top$ (for nonzero $\vv u, \vv v$)?

??? success "Solution"
    The rank is 1.

    Column $j$ is $v_j\vv u$, so every column is a multiple of $\vv u$, and the column space is the line through $\vv u$.

**5.** Prove $\rank(AB) \leq \rank A$.

??? success "Solution"
    Every column of $AB$ is $A$ times a column of $B$, so it lies in $C(A)$.

    Hence $C(AB) \subseteq C(A)$, and $\dim C(AB) \leq \dim C(A)$.

    (Similarly $\rank(AB) \leq \rank B$, using rows.)

**6.** A dataset has 100 examples and 500 features ($X$ is $100\times500$). How many different weight vectors $\vv w$ satisfy $X\vv w = \vv y$, if any do?

??? success "Solution"
    $\rank X \leq 100$, so $\dim N(X) \geq 400$.

    If one solution exists, adding any null space vector gives another. So there are infinitely many, forming at least a 400-dimensional family.
