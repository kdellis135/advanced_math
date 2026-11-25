---
description: "Vectors as lists and as arrows: length, the dot product and angles, the Cauchy–Schwarz and triangle inequalities, and the L1, L2 and max norms used in ML."
---

# Vectors and the dot product

<div class="lesson-meta" markdown>
**Phase 3 · Lesson 1** · ⏱ ~2.5 hours · Needs: [Exponentials, logarithms and trig](../foundations/exp-log-trig.md) (cosine), high-school geometry
</div>

A vector is a list of numbers, and also an arrow. Being able to switch between the two views at will is most of the skill of linear algebra.

The dot product connects them: an algebraic formula (multiply and add) that measures something geometric (angles and lengths).

## 1. Two views of a vector

!!! definition "Definition: vector"
    A vector in $\R^n$ is an ordered list of $n$ real numbers, written as a column:

    $$
    \vv v = \begin{pmatrix} v_1 \\ v_2 \\ \vdots \\ v_n\end{pmatrix}.
    $$

    The $v_i$ are its **components**. Geometrically, $\vv v$ is the arrow from the origin to the point $(v_1, \ldots, v_n)$.

In ML a vector can be anything with $n$ numeric features:

| Thing | Vector |
|---|---|
| a house | (size, rooms, age) |
| an image | 784 pixel brightnesses |
| a word embedding | 768 coordinates |

The geometric language still applies in 768 dimensions, even though we can't draw it. "Similar" words are nearby arrows.

**Operations** (componentwise):

- **Addition:** $\vv u + \vv v = (u_1 + v_1, \ldots, u_n + v_n)$. Geometrically: put the arrows tip to tail.
- **Scalar multiplication:** $c\vv v = (cv_1, \ldots, cv_n)$. This stretches by $c$, and flips the direction if $c < 0$.
- A **linear combination** of $\vv v_1, \ldots, \vv v_k$ is $c_1\vv v_1 + \cdots + c_k\vv v_k$. This is the most important construction in the subject.

(A **scalar** is just an ordinary number, as opposed to a vector.)

!!! example "Example: the operations with numbers and pictures"
    Take $\vv u = (2, 1)$ and $\vv v = (1, 3)$ in the plane.

    | Operation | Componentwise | Picture |
    |---|---|---|
    | $\vv u + \vv v$ | $(2 + 1, 1 + 3) = (3, 4)$ | walk along $\vv u$, then along $\vv v$; you end at $(3, 4)$ |
    | $2\vv u$ | $(4, 2)$ | same direction as $\vv u$, twice as long |
    | $-\vv u$ | $(-2, -1)$ | same length, pointing the opposite way |
    | $\vv v - \vv u$ | $(1 - 2, 3 - 1) = (-1, 2)$ | the arrow from the tip of $\vv u$ to the tip of $\vv v$ |

    The last row is worth remembering: $\vv v - \vv u$ is "how to get from $\vv u$ to $\vv v$." Check: $\vv u + (\vv v - \vv u) = \vv v$.

    Order doesn't matter for addition: $\vv u + \vv v = \vv v + \vv u$. The two orders trace the two sides of a parallelogram and meet at the same corner.

!!! example "Example: a linear combination"
    Can we reach $(4, 7)$ using $\vv u = (2, 1)$ and $\vv v = (1, 3)$? We need numbers $a, b$ with $a(2, 1) + b(1, 3) = (4, 7)$, i.e.

    $$
    2a + b = 4, \qquad a + 3b = 7.
    $$

    From the first, $b = 4 - 2a$. Substitute: $a + 12 - 6a = 7$, so $a = 1$ and $b = 2$.

    Check: $1 \cdot (2, 1) + 2 \cdot (1, 3) = (2 + 2, 1 + 6) = (4, 7)$. ✓

    Asking "which combination gives this vector?" is solving a linear system, the subject of [lesson 3](linear-systems.md).

The **standard basis** vectors $\vv e_1 = (1, 0, \ldots, 0)$, …, $\vv e_n = (0, \ldots, 0, 1)$ let us write every vector as a combination:

$$
\vv v = v_1\vv e_1 + \cdots + v_n \vv e_n.
$$

## 2. Length

!!! definition "Definition: norm (length)"
    $$
    \norm{\vv v} = \sqrt{v_1^2 + v_2^2 + \cdots + v_n^2}.
    $$

In 2D this is Pythagoras; in 3D it's Pythagoras twice.

Why "twice" in 3D: to reach $(v_1, v_2, v_3)$, first go across the floor to $(v_1, v_2, 0)$, a distance $\sqrt{v_1^2 + v_2^2}$ by Pythagoras. Then go straight up by $v_3$. That's a second right triangle, with legs $\sqrt{v_1^2 + v_2^2}$ and $v_3$, so the total length is $\sqrt{v_1^2 + v_2^2 + v_3^2}$.

- A **unit vector** has length 1.
- $\vv v/\norm{\vv v}$ is the unit vector in the direction of $\vv v$ (normalizing).
- The distance between two points is $\norm{\vv u - \vv v}$.

!!! example "Example: length, normalizing, distance"
    - $\norm{(3, 4)} = \sqrt{9 + 16} = 5$.
    - Normalized: $\frac{(3, 4)}{5} = (0.6, 0.8)$. Check: $0.36 + 0.64 = 1$. ✓
    - $\norm{(1, 2, 2)} = \sqrt{1 + 4 + 4} = 3$.
    - Distance from $(1, 1)$ to $(4, 5)$: $\ \norm{(4 - 1, 5 - 1)} = \norm{(3, 4)} = 5$.

    Scaling multiplies length: $\norm{c\vv v} = \lvert c\rvert\,\norm{\vv v}$. For example $\norm{(-6, -8)} = 10 = 2 \cdot 5$.

## 3. The dot product

!!! definition "Definition: dot product"
    $$
    \vv u\cdot\vv v = u_1v_1 + u_2v_2 + \cdots + u_nv_n = \sum_{i=1}^n u_iv_i.
    $$

    In matrix notation (next lesson), $\vv u\cdot\vv v = \vv u^\top\vv v$.

Multiply matching components, then add. The result is a single **number**, not a vector.

!!! example "Example: dot products by hand"
    | $\vv u$ | $\vv v$ | $\vv u \cdot \vv v$ | sign |
    |---|---|---|---|
    | $(1, 2)$ | $(3, 1)$ | $1\cdot3 + 2\cdot1 = 5$ | positive |
    | $(1, 2)$ | $(-2, 1)$ | $-2 + 2 = 0$ | zero |
    | $(1, 2)$ | $(-1, -1)$ | $-1 - 2 = -3$ | negative |
    | $(1, 2, 3)$ | $(4, 5, 6)$ | $4 + 10 + 18 = 32$ | positive |

    Sketch the first three pairs: $(3, 1)$ points roughly the same way as $(1, 2)$, $(-2, 1)$ is at a right angle to it, and $(-1, -1)$ points roughly backwards. The sign of the dot product tracks this, as the theorem below explains.

Algebraic properties (each is one line from the definition):

| Property | Statement |
|---|---|
| symmetric | $\vv u\cdot \vv v = \vv v\cdot\vv u$ |
| linear in each argument | $(a\vv u + b\vv w)\cdot\vv v = a\,\vv u\cdot\vv v + b\,\vv w\cdot \vv v$ |
| positive | $\vv v\cdot\vv v = \norm{\vv v}^2 \geq 0$, with equality only for $\vv v = \vv 0$ |

For example, linearity in the first argument, written out in 2D:

$$
(a\vv u + b\vv w)\cdot\vv v = (au_1 + bw_1)v_1 + (au_2 + bw_2)v_2 = a(u_1v_1 + u_2v_2) + b(w_1v_1 + w_2v_2).
$$

That's just distributing and regrouping. Together with symmetry, it means **you can expand dot products like ordinary multiplication**:

$$
(\vv u + \vv v)\cdot(\vv u + \vv v) = \vv u\cdot\vv u + \vv u\cdot\vv v + \vv v\cdot\vv u + \vv v\cdot\vv v = \norm{\vv u}^2 + 2\,\vv u\cdot\vv v + \norm{\vv v}^2.
$$

This "FOIL for vectors" is used in almost every proof below.

The surprise is that this simple formula measures **angles**:

!!! theorem "Theorem: geometric meaning of the dot product"
    $$
    \vv u\cdot\vv v = \norm{\vv u}\,\norm{\vv v}\cos\theta,
    $$

    where $\theta$ is the angle between the arrows.

!!! proof "Proof"
    The vectors $\vv u$, $\vv v$ and $\vv u - \vv v$ form a triangle: two sides from the origin, and the third side joining their tips.

    The **law of cosines** from high-school geometry says that in a triangle with sides $a$, $b$ and angle $\theta$ between them, the third side $c$ satisfies $c^2 = a^2 + b^2 - 2ab\cos\theta$. (When $\theta = 90°$, $\cos\theta = 0$ and it's Pythagoras.) Here:

    $$
    \norm{\vv u - \vv v}^2 = \norm{\vv u}^2 + \norm{\vv v}^2 - 2\norm{\vv u}\norm{\vv v}\cos\theta.
    $$

    Expand the left side by "FOIL for vectors":

    $$
    \norm{\vv u - \vv v}^2 = (\vv u - \vv v)\cdot(\vv u - \vv v) = \vv u\cdot\vv u - \vv u\cdot\vv v - \vv v\cdot\vv u + \vv v\cdot\vv v = \norm{\vv u}^2 - 2\,\vv u\cdot\vv v + \norm{\vv v}^2.
    $$

    The two expressions are equal. Cancel $\norm{\vv u}^2 + \norm{\vv v}^2$ from both, then divide by $-2$: $\vv u\cdot\vv v = \norm{\vv u}\norm{\vv v}\cos\theta$.

**Recipe for the angle between two vectors:**

$$
\cos\theta = \frac{\vv u \cdot \vv v}{\norm{\vv u}\,\norm{\vv v}}, \qquad \theta = \arccos\left(\frac{\vv u \cdot \vv v}{\norm{\vv u}\,\norm{\vv v}}\right).
$$

!!! example "Example: the angle between $(1, 0)$ and $(1, 1)$"
    - Dot product: $1 \cdot 1 + 0 \cdot 1 = 1$.
    - Lengths: $1$ and $\sqrt2$.
    - $\cos\theta = \frac{1}{\sqrt 2}$, so $\theta = 45°$. That matches the picture: $(1, 1)$ points along the diagonal.

Consequences:

- $\vv u\cdot\vv v > 0$: angle less than $90°$ (roughly the same direction).
- $\vv u\cdot\vv v = 0$: **perpendicular** (orthogonal), written $\vv u \perp \vv v$.
- $\vv u\cdot\vv v < 0$: angle more than $90°$ (roughly opposite).

!!! intuition "Dot product = projection × length"
    $\norm{\vv v}\cos\theta$ is the length of the shadow of $\vv v$ on the line through $\vv u$. So

    $$
    \vv u\cdot\vv v = (\text{length of } \vv u) \times (\text{shadow of } \vv v \text{ onto } \vv u).
    $$

    If $\vv u$ is a unit vector, **$\vv u\cdot\vv v$ is just the component of $\vv v$ in direction $\vv u$.**

    You'll see the projection picture in detail in [Orthogonality](orthogonality.md).

## 4. Cauchy–Schwarz and the triangle inequality

In $\R^2$ and $\R^3$, the theorem above shows $|\vv u\cdot\vv v| \leq \norm{\vv u}\norm{\vv v}$, since $|\cos\theta| \leq 1$.

But what's an "angle" in 768 dimensions? We *define* it via

$$
\cos\theta = \frac{\vv u\cdot\vv v}{\norm{\vv u}\norm{\vv v}},
$$

and for that to make sense we need this fraction to lie in $[-1, 1]$. Proving that without geometry is the job of the most useful inequality in mathematics.

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

    (Expanded by FOIL: $(\vv u - t\vv v)\cdot(\vv u - t\vv v) = \vv u \cdot \vv u - 2t\,\vv u\cdot\vv v + t^2\,\vv v\cdot\vv v$.)

    This is a quadratic $At^2 + Bt + C$ in $t$, with

    $$
    A = \norm{\vv v}^2, \qquad B = -2(\vv u\cdot\vv v), \qquad C = \norm{\vv u}^2.
    $$

    It is never negative. Recall the quadratic formula: the roots are $\frac{-B \pm \sqrt{B^2 - 4AC}}{2A}$. If the discriminant $B^2 - 4AC$ were positive, there would be two different roots, and an upward parabola dips below zero between its two roots. That can't happen here. So the discriminant is $\leq 0$:

    $$
    4(\vv u\cdot\vv v)^2 - 4\norm{\vv u}^2\norm{\vv v}^2 \leq 0.
    $$

    Divide by 4 and rearrange: $(\vv u\cdot\vv v)^2 \leq \norm{\vv u}^2\norm{\vv v}^2$. Take square roots (both sides are non-negative).

    Equality means the quadratic touches 0, i.e. $\vv u = t\vv v$ for some $t$.

    *One-sentence summary:* a quadratic that's never negative has a non-positive discriminant.

Check it on the first exercise below: $\vv u = (1, 2, 2)$, $\vv v = (3, 0, 4)$ give $\lvert\vv u \cdot \vv v\rvert = 11$ and $\norm{\vv u}\norm{\vv v} = 3 \cdot 5 = 15$. Indeed $11 \leq 15$.

!!! theorem "Theorem: triangle inequality"
    $\norm{\vv u + \vv v} \leq \norm{\vv u} + \norm{\vv v}$.

!!! proof "Proof"
    Using Cauchy–Schwarz in the middle step:

    $$
    \norm{\vv u + \vv v}^2 = \norm{\vv u}^2 + 2\,\vv u\cdot\vv v + \norm{\vv v}^2 \leq \norm{\vv u}^2 + 2\norm{\vv u}\norm{\vv v} + \norm{\vv v}^2 = (\norm{\vv u} + \norm{\vv v})^2.
    $$

The direct path is never longer than a detour.

## 5. Other norms

The length above is the **$\ell_2$ (Euclidean) norm**. Other useful norms:

| Norm | Formula | Unit "circle" shape | Used for |
|---|---|---|---|
| $\ell_1$ | $\sum_i\lvert v_i\rvert$ | diamond | Lasso (encourages sparsity), robust losses |
| $\ell_2$ | $\sqrt{\sum_i v_i^2}$ | circle | ridge regression, distances, weight decay |
| $\ell_\infty$ | $\max_i\lvert v_i\rvert$ | square | adversarial robustness (max per-pixel change) |

!!! example "Example: three norms of the same vector"
    For $\vv v = (3, -4)$:

    - $\norm{\vv v}_1 = \lvert 3\rvert + \lvert -4\rvert = 7$: the distance walking along a city grid ("taxicab distance").
    - $\norm{\vv v}_2 = \sqrt{9 + 16} = 5$: the straight-line distance.
    - $\norm{\vv v}_\infty = \max(3, 4) = 4$: the largest single coordinate.

    Always $\norm{\vv v}_\infty \leq \norm{\vv v}_2 \leq \norm{\vv v}_1$.

The "unit circle" column describes all vectors of norm 1. In $\ell_1$, the points with $\lvert x\rvert + \lvert y\rvert = 1$ form a diamond with corners at $(\pm1, 0)$ and $(0, \pm1)$. In $\ell_\infty$, the points with $\max(\lvert x\rvert, \lvert y\rvert) = 1$ form a square with corners $(\pm1, \pm1)$.

All of them satisfy:

1. $\norm{\vv v} \geq 0$, with equality iff $\vv v = 0$;
2. $\norm{c\vv v} = |c|\norm{\vv v}$;
3. the triangle inequality.

!!! ml "Where this shows up"
    - **Cosine similarity** $\frac{\vv u\cdot\vv v}{\norm{\vv u}\norm{\vv v}}$ compares embeddings in semantic search, recommendation and retrieval-augmented generation.
        - It ignores length and compares direction only.
    - **Attention** in Transformers scores how much token $i$ attends to token $j$ by the dot product $\vv q_i\cdot\vv k_j$ of a query and a key.
        - It is scaled by $1/\sqrt d$; we'll see why in [Phase 5](../probability/joint.md).
    - **A neuron** computes $\sigma(\vv w\cdot\vv x + b)$: it measures how well the input aligns with its weight vector.
    - **Weight decay** adds $\lambda\norm{\vv w}_2^2$ to the loss; **Lasso** adds $\lambda\norm{\vv w}_1$.

## Check yourself

**1.** For $\vv u = (1, 2, 2)$ and $\vv v = (3, 0, 4)$: compute $\norm{\vv u}$, $\norm{\vv v}$, $\vv u\cdot\vv v$ and the angle between them.

??? success "Solution"
    | Quantity | Value |
    |---|---|
    | $\norm{\vv u}$ | $3$ |
    | $\norm{\vv v}$ | $5$ |
    | $\vv u\cdot \vv v$ | $3 + 0 + 8 = 11$ |
    | $\cos\theta$ | $\frac{11}{15}$ |
    | $\theta$ | $\approx 42.8°$ |

**2.** Find a nonzero vector perpendicular to both $(1, 1, 0)$ and $(0, 1, 1)$.

??? success "Solution"
    Need $x + y = 0$ and $y + z = 0$. Take $y = 1$: $(-1, 1, -1)$.

    Check: $-1 + 1 + 0 = 0$ and $0 + 1 - 1 = 0$. ✓

**3.** Prove the parallelogram law: $\norm{\vv u + \vv v}^2 + \norm{\vv u - \vv v}^2 = 2\norm{\vv u}^2 + 2\norm{\vv v}^2$.

??? success "Solution"
    Expand both: $(\norm u^2 + 2u\cdot v + \norm v^2) + (\norm u^2 - 2u\cdot v + \norm v^2)$. The cross terms cancel.

**4.** Use Cauchy–Schwarz to prove that for any reals $a_1, \ldots, a_n$: $(a_1 + \cdots + a_n)^2 \leq n(a_1^2 + \cdots + a_n^2)$.

??? success "Solution"
    Apply Cauchy–Schwarz to $\vv u = (a_1, \ldots, a_n)$ and $\vv v = (1, \ldots, 1)$:

    $$
    \Big(\sum a_i\Big)^2 = (\vv u\cdot\vv v)^2 \leq \norm{\vv u}^2\norm{\vv v}^2 = n\sum a_i^2.
    $$

    Equivalently: the mean squared is at most the mean of squares, which says variance $\geq 0$.

**5.** Compute the $\ell_1$, $\ell_2$, $\ell_\infty$ norms of $(3, -4, 0, 1)$.

??? success "Solution"
    - $\ell_1 = 8$
    - $\ell_2 = \sqrt{26} \approx 5.10$
    - $\ell_\infty = 4$

**6.** Two random vectors in $\R^{1000}$ with independent standard normal components almost always have cosine similarity near 0. Give an intuitive reason.

??? success "Solution"
    - **Numerator:** $\vv u\cdot\vv v = \sum u_iv_i$ is a sum of 1000 terms with mean 0 and variance 1, so it's typically of size $\sqrt{1000} \approx 32$.
    - **Denominator:** $\norm{\vv u}\norm{\vv v} \approx \sqrt{1000}\cdot\sqrt{1000} = 1000$.
    - **Cosine:** typically about $32/1000 \approx 0.03$.

    In high dimensions, random directions are nearly orthogonal. This fact is behind many ML phenomena.
