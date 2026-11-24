# Vectors and the dot product

<div class="lesson-meta" markdown>
**Phase 3 · Lesson 1** · ⏱ ~2.5 hours · Needs: [Exponentials, logarithms and trig](../foundations/exp-log-trig.md) (cosine), high-school geometry
</div>

A vector is a list of numbers, and also an arrow. Being able to switch between the two views at will is most of the skill of linear algebra. The dot product connects them: an algebraic formula (multiply and add) that measures something geometric (angles and lengths).

## 1. Two views of a vector

!!! definition "Definition: vector"
    A vector in $\R^n$ is an ordered list of $n$ real numbers, written as a column:

    $$
    \vv v = \begin{pmatrix} v_1 \\ v_2 \\ \vdots \\ v_n\end{pmatrix}.
    $$

    The $v_i$ are its **components**. Geometrically, $\vv v$ is the arrow from the origin to the point $(v_1, \ldots, v_n)$.

In ML a vector can be anything with $n$ numeric features: a house (size, rooms, age), an image (784 pixel brightnesses), a word embedding (768 coordinates). The geometric language still applies in 768 dimensions even though we can't draw it. "Similar" words are nearby arrows.

**Operations** (componentwise):

- **Addition:** $\vv u + \vv v = (u_1 + v_1, \ldots, u_n + v_n)$. Geometrically: put the arrows tip to tail.
- **Scalar multiplication:** $c\vv v = (cv_1, \ldots, cv_n)$. This stretches by $c$, and flips the direction if $c < 0$.
- A **linear combination** of $\vv v_1, \ldots, \vv v_k$ is $c_1\vv v_1 + \cdots + c_k\vv v_k$. This is the most important construction in the subject.

The **standard basis** vectors $\vv e_1 = (1, 0, \ldots, 0)$, …, $\vv e_n = (0, \ldots, 0, 1)$ let us write every vector as a combination: $\vv v = v_1\vv e_1 + \cdots + v_n \vv e_n$.

## 2. Length

!!! definition "Definition: norm (length)"
    $$
    \norm{\vv v} = \sqrt{v_1^2 + v_2^2 + \cdots + v_n^2}.
    $$

In 2D this is Pythagoras; in 3D it's Pythagoras twice. A **unit vector** has length 1; $\vv v/\norm{\vv v}$ is the unit vector in the direction of $\vv v$ (normalizing). The distance between two points is $\norm{\vv u - \vv v}$.

## 3. The dot product

!!! definition "Definition: dot product"
    $$
    \vv u\cdot\vv v = u_1v_1 + u_2v_2 + \cdots + u_nv_n = \sum_{i=1}^n u_iv_i.
    $$

    In matrix notation (next lesson), $\vv u\cdot\vv v = \vv u^\top\vv v$.

Algebraic properties (each one line from the definition): symmetric ($\vv u\cdot \vv v = \vv v\cdot\vv u$), linear in each argument ($(a\vv u + b\vv w)\cdot\vv v = a\,\vv u\cdot\vv v + b\,\vv w\cdot \vv v$), and $\vv v\cdot\vv v = \norm{\vv v}^2 \geq 0$, with equality only for $\vv v = \vv 0$.

The surprise is that this simple formula measures **angles**:

!!! theorem "Theorem: geometric meaning of the dot product"
    $$
    \vv u\cdot\vv v = \norm{\vv u}\,\norm{\vv v}\cos\theta,
    $$

    where $\theta$ is the angle between the arrows.

!!! proof "Proof"
    The vectors $\vv u$, $\vv v$ and $\vv u - \vv v$ form a triangle. The **law of cosines** says $\norm{\vv u - \vv v}^2 = \norm{\vv u}^2 + \norm{\vv v}^2 - 2\norm{\vv u}\norm{\vv v}\cos\theta$. Expand the left side using bilinearity:

    $$
    \norm{\vv u - \vv v}^2 = (\vv u - \vv v)\cdot(\vv u - \vv v) = \norm{\vv u}^2 - 2\,\vv u\cdot\vv v + \norm{\vv v}^2.
    $$

    Compare the two expressions: $\vv u\cdot\vv v = \norm{\vv u}\norm{\vv v}\cos\theta$.

Consequences:

- $\vv u\cdot\vv v > 0$: angle less than $90°$ (roughly the same direction).
- $\vv u\cdot\vv v = 0$: **perpendicular** (orthogonal), written $\vv u \perp \vv v$.
- $\vv u\cdot\vv v < 0$: angle more than $90°$ (roughly opposite).

!!! intuition "Dot product = projection × length"
    $\norm{\vv v}\cos\theta$ is the length of the shadow of $\vv v$ on the line through $\vv u$. So $\vv u\cdot\vv v$ = (length of $\vv u$) × (shadow of $\vv v$ onto $\vv u$). If $\vv u$ is a unit vector, **$\vv u\cdot\vv v$ is just the component of $\vv v$ in direction $\vv u$.** You'll see the projection picture in detail in [Orthogonality](orthogonality.md).

## 4. Cauchy–Schwarz and the triangle inequality

In $\R^2$ and $\R^3$, the theorem above shows $|\vv u\cdot\vv v| \leq \norm{\vv u}\norm{\vv v}$ since $|\cos\theta| \leq 1$. But what's an "angle" in 768 dimensions? We *define* it via $\cos\theta = \frac{\vv u\cdot\vv v}{\norm{\vv u}\norm{\vv v}}$, and for that to make sense we need this fraction to lie in $[-1, 1]$. Proving that without geometry is the job of the most useful inequality in mathematics.

!!! theorem "Theorem: Cauchy–Schwarz inequality"
    For all $\vv u, \vv v \in \R^n$:

    $$
    |\vv u\cdot\vv v| \leq \norm{\vv u}\,\norm{\vv v},
    $$

    with equality iff one vector is a multiple of the other.

!!! proof "Proof"
    If $\vv v = \vv 0$, both sides are 0. Otherwise, for every real $t$ the squared length of $\vv u - t\vv v$ is non-negative:

    $$
    0 \leq \norm{\vv u - t\vv v}^2 = \norm{\vv u}^2 - 2t\,(\vv u\cdot\vv v) + t^2\norm{\vv v}^2.
    $$

    This is a quadratic in $t$ that is never negative, so it has at most one real root, and its discriminant is $\leq 0$:

    $$
    4(\vv u\cdot\vv v)^2 - 4\norm{\vv u}^2\norm{\vv v}^2 \leq 0.
    $$

    Rearrange and take square roots. Equality means the quadratic touches 0, i.e. $\vv u = t\vv v$ for some $t$.

    *One-sentence summary:* a quadratic that's never negative has a non-positive discriminant.

!!! theorem "Theorem: triangle inequality"
    $\norm{\vv u + \vv v} \leq \norm{\vv u} + \norm{\vv v}$.

!!! proof "Proof"
    $\norm{\vv u + \vv v}^2 = \norm{\vv u}^2 + 2\,\vv u\cdot\vv v + \norm{\vv v}^2 \leq \norm{\vv u}^2 + 2\norm{\vv u}\norm{\vv v} + \norm{\vv v}^2 = (\norm{\vv u} + \norm{\vv v})^2$, using Cauchy–Schwarz in the middle.

The direct path is never longer than a detour.

## 5. Other norms

The length above is the **$\ell_2$ (Euclidean) norm**. Other useful norms:

| Norm | Formula | Unit "circle" shape | Used for |
|---|---|---|---|
| $\ell_1$ | $\sum_i\lvert v_i\rvert$ | diamond | Lasso (encourages sparsity), robust losses |
| $\ell_2$ | $\sqrt{\sum_i v_i^2}$ | circle | ridge regression, distances, weight decay |
| $\ell_\infty$ | $\max_i\lvert v_i\rvert$ | square | adversarial robustness (max per-pixel change) |

All satisfy: $\norm{\vv v} \geq 0$ with equality iff $\vv v = 0$; $\norm{c\vv v} = |c|\norm{\vv v}$; and the triangle inequality.

!!! ml "Where this shows up"
    - **Cosine similarity** $\frac{\vv u\cdot\vv v}{\norm{\vv u}\norm{\vv v}}$ compares embeddings in semantic search, recommendation and retrieval-augmented generation. It ignores length and compares direction only.
    - **Attention** in Transformers scores how much token $i$ attends to token $j$ by the dot product $\vv q_i\cdot\vv k_j$ of a query and a key, scaled by $1/\sqrt d$ (we'll see why in [Phase 5](../probability/joint.md)).
    - **A neuron** computes $\sigma(\vv w\cdot\vv x + b)$: it measures how well the input aligns with its weight vector.
    - **Weight decay** adds $\lambda\norm{\vv w}_2^2$ to the loss; **Lasso** adds $\lambda\norm{\vv w}_1$.

## Check yourself

**1.** For $\vv u = (1, 2, 2)$ and $\vv v = (3, 0, 4)$: compute $\norm{\vv u}$, $\norm{\vv v}$, $\vv u\cdot\vv v$ and the angle between them.

??? success "Solution"
    $\norm{\vv u} = 3$, $\norm{\vv v} = 5$, $\vv u\cdot \vv v = 3 + 0 + 8 = 11$, $\cos\theta = \frac{11}{15}$, $\theta \approx 42.8°$.

**2.** Find a nonzero vector perpendicular to both $(1, 1, 0)$ and $(0, 1, 1)$.

??? success "Solution"
    Need $x + y = 0$ and $y + z = 0$. Take $y = 1$: $(-1, 1, -1)$. Check: $-1 + 1 + 0 = 0$, $0 + 1 - 1 = 0$. ✓

**3.** Prove the parallelogram law: $\norm{\vv u + \vv v}^2 + \norm{\vv u - \vv v}^2 = 2\norm{\vv u}^2 + 2\norm{\vv v}^2$.

??? success "Solution"
    Expand both: $(\norm u^2 + 2u\cdot v + \norm v^2) + (\norm u^2 - 2u\cdot v + \norm v^2)$. The cross terms cancel.

**4.** Use Cauchy–Schwarz to prove that for any reals $a_1, \ldots, a_n$: $(a_1 + \cdots + a_n)^2 \leq n(a_1^2 + \cdots + a_n^2)$.

??? success "Solution"
    Apply Cauchy–Schwarz to $\vv u = (a_1, \ldots, a_n)$ and $\vv v = (1, \ldots, 1)$: $(\sum a_i)^2 = (\vv u\cdot\vv v)^2 \leq \norm{\vv u}^2\norm{\vv v}^2 = n\sum a_i^2$. (Equivalently: the mean squared is at most the mean of squares, which says variance $\geq 0$.)

**5.** Compute the $\ell_1$, $\ell_2$, $\ell_\infty$ norms of $(3, -4, 0, 1)$.

??? success "Solution"
    $\ell_1 = 8$, $\ell_2 = \sqrt{26} \approx 5.10$, $\ell_\infty = 4$.

**6.** Two random vectors in $\R^{1000}$ with independent standard normal components almost always have cosine similarity near 0. Give an intuitive reason.

??? success "Solution"
    $\vv u\cdot\vv v = \sum u_iv_i$ is a sum of 1000 terms with mean 0 and variance 1, so it's typically of size $\sqrt{1000} \approx 32$. Meanwhile $\norm{\vv u}\norm{\vv v} \approx \sqrt{1000}\cdot\sqrt{1000} = 1000$. The cosine is typically about $32/1000 \approx 0.03$. In high dimensions, random directions are nearly orthogonal, a fact behind many ML phenomena.
