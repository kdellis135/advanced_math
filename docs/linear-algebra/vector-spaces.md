# Vector spaces, basis, rank

<div class="lesson-meta" markdown>
**Phase 3 · Lesson 4** · ⏱ ~3.5 hours · Needs: [Solving linear systems](linear-systems.md)
</div>

This lesson gives you the vocabulary for asking *how much* a matrix can do: which outputs it can reach, which inputs it destroys, and how many "genuinely different directions" are involved. The punchline is the **rank–nullity theorem**: dimensions in = dimensions kept + dimensions destroyed.

## 1. Subspaces and span

!!! definition "Definition: subspace"
    A **subspace** of $\R^n$ is a set $V$ of vectors that contains $\vv 0$ and is **closed under linear combinations**: if $\vv u, \vv v \in V$ then $a\vv u + b\vv v \in V$ for all scalars $a, b$.

Subspaces of $\R^3$: $\{\vv 0\}$, lines through the origin, planes through the origin, and $\R^3$ itself. A line *not* through the origin is not a subspace.

(More generally, a **vector space** is any set where addition and scaling make sense and obey the usual rules: polynomials, functions, matrices. All the ideas in this lesson carry over. For example, the space of polynomials of degree $\leq 2$ has basis $1, x, x^2$.)

!!! definition "Definition: span"
    The **span** of $\vv v_1, \ldots, \vv v_k$ is the set of all their linear combinations:
    $\operatorname{span}(\vv v_1, \ldots, \vv v_k) = \{c_1\vv v_1 + \cdots + c_k\vv v_k : c_i \in \R\}$. It is always a subspace.

## 2. Linear independence

Some vectors in a list may be redundant. In $(1,0), (0,1), (1,1)$, the third is the sum of the first two and adds nothing to the span.

!!! definition "Definition: linear independence"
    Vectors $\vv v_1, \ldots, \vv v_k$ are **linearly independent** if the only combination giving zero is the trivial one:

    $$
    c_1\vv v_1 + \cdots + c_k\vv v_k = \vv 0 \implies c_1 = \cdots = c_k = 0.
    $$

    Otherwise they are **dependent**: some $\vv v_i$ is a combination of the others.

In matrix language: the columns of $A$ are independent **iff $A\vv x = \vv 0$ has only the solution $\vv x = \vv 0$** iff every column gets a pivot in elimination.

!!! intuition "Independence = no redundancy"
    Each independent vector adds a genuinely new direction. Two vectors in $\R^2$ are independent iff they're not parallel. Three vectors in $\R^3$ are independent iff they don't lie in a common plane. And any 4 vectors in $\R^3$ are dependent: there's no room.

## 3. Basis and dimension

!!! definition "Definition: basis"
    A **basis** of a subspace $V$ is a list of vectors that is (1) linearly independent and (2) spans $V$.

Each vector in $V$ then has a **unique** representation $\vv v = c_1\vv b_1 + \cdots + c_k\vv b_k$. Existence comes from spanning. For uniqueness: if two representations existed, subtracting them would give a nontrivial combination equal to zero, contradicting independence. The numbers $c_i$ are the **coordinates** of $\vv v$ in that basis.

!!! theorem "Theorem: dimension is well defined"
    Every basis of a subspace $V$ has the same number of vectors. That number is the **dimension** $\dim V$.

??? proof "Proof (deeper)"
    Key lemma: if $\vv w_1, \ldots, \vv w_m$ lie in the span of $\vv v_1, \ldots, \vv v_k$ and $m > k$, then the $\vv w$'s are dependent. *Proof:* write each $\vv w_j = \sum_i a_{ij}\vv v_i$, so $W = VA$ where $A$ is $k\times m$. Since $A$ has more columns than rows, elimination leaves a free variable, so $A\vv c = \vv 0$ for some $\vv c \neq \vv 0$. Then $W\vv c = VA\vv c = \vv 0$: a nontrivial dependency.

    Now if two bases had sizes $k < m$, the larger one would lie in the span of the smaller and so be dependent. Contradiction.

So $\dim\R^n = n$, a plane has dimension 2, a line dimension 1, and $\{\vv 0\}$ dimension 0. In an $n$-dimensional space: any $n$ independent vectors form a basis, any $n$ spanning vectors form a basis, more than $n$ vectors are dependent, and fewer than $n$ can't span.

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

!!! theorem "Theorem: row rank = column rank"
    $\dim C(A) = \dim C(A^\top)$: the number of independent columns equals the number of independent rows.

??? proof "Proof (deeper)"
    Row operations don't change the row space (they replace rows by combinations of rows, reversibly), and they don't change which *sets of columns* are independent (they preserve the solutions of $A\vv x = \vv 0$, which encode the column dependencies). In the echelon form, the nonzero rows (one per pivot) are independent and span the row space, and the pivot columns are independent and span the column space. Both counts equal the number of pivots.

## 5. Rank–nullity

!!! theorem "Rank–nullity theorem"
    For an $m \times n$ matrix $A$:

    $$
    \rank A + \dim N(A) = n.
    $$

!!! intuition "Conservation of dimension"
    $A$ takes in $n$ dimensions. Some survive to the output (the rank); the rest are crushed to zero (the null space). Nothing else can happen to a dimension.

!!! proof "Proof"
    Elimination on $A\vv x = \vv 0$ gives $r = \rank A$ pivot variables and $n - r$ free variables. Setting one free variable to 1 and the others to 0 determines the pivot variables uniquely, giving one **special solution** for each free variable. These $n - r$ special solutions are independent (each has a 1 where the others have 0), and every null space vector is a combination of them (it's determined by its free-variable values). So $\dim N(A) = n - r$.

## 6. The complete solution of $A\vv x = \vv b$

!!! theorem "Theorem: structure of solutions"
    If $\vv x_p$ is any one solution of $A\vv x = \vv b$ (a *particular* solution), then **all** solutions are

    $$
    \vv x = \vv x_p + \vv x_n, \qquad \vv x_n \in N(A).
    $$

!!! proof "Proof"
    If $A\vv x = \vv b$ then $A(\vv x - \vv x_p) = \vv b - \vv b = \vv 0$, so $\vv x - \vv x_p \in N(A)$. Conversely, $A(\vv x_p + \vv x_n) = \vv b + \vv 0 = \vv b$.

So the solution set is the null space shifted to pass through $\vv x_p$: a point, a line, a plane… The same structure appears in differential equations: general solution = particular + homogeneous.

## 7. Orthogonality of the fundamental subspaces

!!! theorem "Theorem"
    Every vector in the null space is perpendicular to every vector in the row space.

!!! proof "Proof"
    $A\vv x = \vv 0$ says that each row of $A$ dotted with $\vv x$ is 0. So $\vv x$ is perpendicular to each row, and hence to every combination of rows.

So $\R^n$ splits into two perpendicular pieces: row space (dimension $r$) and null space (dimension $n - r$), and the dimensions add up to $n$. Likewise $\R^m$ splits into the column space and the left null space. This picture (Strang's "big picture of linear algebra") is the map for everything in the next lessons.

## 8. The invertible matrix theorem

For a **square** $n\times n$ matrix, all of these are equivalent:

1. $A$ is invertible.
2. $\rank A = n$ (full rank).
3. $N(A) = \{\vv 0\}$.
4. The columns are independent; the columns span $\R^n$; the columns form a basis.
5. $A\vv x = \vv b$ has exactly one solution for every $\vv b$.

*Why they're equivalent:* by rank–nullity, (2) ⇔ (3). For a square matrix, $n$ independent columns in $\R^n$ automatically span $\R^n$ (from §3), so a solution of (5) exists, and it's unique because the null space is trivial. Section 4 of [Determinants](determinants.md) adds "$\det A \neq 0$" to the list.

!!! ml "Where this shows up"
    - **Low rank is everywhere.** A $1000\times1000$ weight update of rank 8 has only $2\cdot1000\cdot8$ free parameters instead of $10^6$. That's the idea of **LoRA** fine-tuning.
    - **Collinear features** (one feature a combination of others) make $X$ rank-deficient: $X^\top X$ isn't invertible and regression coefficients aren't unique. Ridge regression fixes this.
    - **Null spaces explain non-identifiability:** if $\vv x_n \in N(X)$, then weights $\vv w$ and $\vv w + \vv x_n$ make identical predictions on the training data.
    - **Overparameterized models** (more parameters than data points) have huge null spaces, so infinitely many weight settings fit the training data perfectly, and *which one* training finds is what determines generalization.

## Check yourself

**1.** Are $(1, 2, 3)$, $(4, 5, 6)$, $(7, 8, 9)$ independent?

??? success "Solution"
    No: $(7, 8, 9) = 2(4,5,6) - (1,2,3)$. Elimination gives only 2 pivots. They span a plane.

**2.** Find a basis for the null space of $A = \begin{pmatrix}1 & 2 & 0 & 1\\ 2 & 4 & 1 & 4\end{pmatrix}$ and verify rank–nullity.

??? success "Solution"
    $R_2 - 2R_1$: $(0, 0, 1, 2)$. Pivots are in columns 1 and 3; $x_2, x_4$ are free. From the rows: $x_3 = -2x_4$ and $x_1 = -2x_2 - x_4$. Special solutions: $x_2 = 1, x_4 = 0$ gives $(-2, 1, 0, 0)$; $x_2 = 0, x_4 = 1$ gives $(-1, 0, -2, 1)$. Rank $2$ + nullity $2$ = $4$ columns. ✓

**3.** Show that if $A$ is $m\times n$ with $n > m$, then $A\vv x = \vv 0$ has a nonzero solution.

??? success "Solution"
    $\rank A \leq m$ (at most one pivot per row), so $\dim N(A) = n - \rank A \geq n - m > 0$.

**4.** What is the rank of the outer product $\vv u\vv v^\top$ (for nonzero $\vv u, \vv v$)?

??? success "Solution"
    1. Column $j$ is $v_j\vv u$, so every column is a multiple of $\vv u$, and the column space is the line through $\vv u$.

**5.** Prove $\rank(AB) \leq \rank A$.

??? success "Solution"
    Every column of $AB$ is $A$ times a column of $B$, so it lies in $C(A)$. Hence $C(AB) \subseteq C(A)$ and $\dim C(AB) \leq \dim C(A)$. (Similarly $\rank(AB) \leq \rank B$, using rows.)

**6.** A dataset has 100 examples and 500 features ($X$ is $100\times500$). How many different weight vectors $\vv w$ satisfy $X\vv w = \vv y$, if any do?

??? success "Solution"
    $\rank X \leq 100$, so $\dim N(X) \geq 400$. If one solution exists, adding any null space vector gives another: infinitely many, forming at least a 400-dimensional family.
