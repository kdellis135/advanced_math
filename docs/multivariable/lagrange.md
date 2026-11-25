---
description: "Lagrange multipliers explained with the level-set picture: the method, eigenvectors as constrained optima, maximum entropy, several constraints and the meaning of λ."
---

# Lagrange multipliers

<div class="lesson-meta" markdown>
**Phase 4 · Lesson 6** · ⏱ ~2.5 hours · Needs: [Partial derivatives and the gradient](gradient.md)
</div>

Real optimization problems come with constraints:

- probabilities must sum to 1;
- a budget is fixed;
- a vector must have unit length.

Lagrange multipliers turn a constrained problem into an unconstrained one, with one extra variable per constraint.

The idea comes from one picture: **at the optimum, the level curve of the objective just touches the constraint.**

## 0. The old way, and why it isn't enough

You already solved one constrained problem in [Using derivatives](../calculus/applications.md#setting-up-an-optimization-problem): the biggest rectangle with 40 m of fence. The method was **substitution**: solve the constraint $2x + 2y = 40$ for $y = 20 - x$, plug it in, and optimize a function of one variable.

That works when the constraint is easy to solve. It gets painful or impossible when:

- the constraint is curved, like the ellipse $\frac{x^2}{4} + y^2 = 1$. Solving gives $y = \pm\sqrt{1 - x^2/4}$: two branches, square roots, and endpoints to check;
- there are many variables and constraints, like "a probability vector of length 1000 that sums to 1";
- the constraint can't be solved in closed form at all.

Lagrange multipliers avoid solving the constraint. They treat all variables symmetrically, using only gradients.

## 1. The picture

Maximize $f(x, y)$ subject to $g(x, y) = c$. Walk along the constraint curve and watch $f$.

1. At a point where $\nabla f$ has a component *along* the curve, you could walk in that direction and increase $f$. So you're not at the max.
2. At the optimum, $\nabla f$ must have no component along the curve: it must be **perpendicular to the curve**.
3. But $\nabla g$ is also perpendicular to the curve (it's a level set of $g$).
4. So the two gradients are parallel.

**Another way to see it:** draw the level lines of $f$. For $f = x + y$ they're the parallel lines $x + y = c$. Slide the line toward larger $c$. As long as it crosses the constraint curve, there are allowed points with that value. The largest allowed $c$ is the last line that still touches the curve, and there it **just grazes** it: tangent to it. Tangent curves have parallel normals, and the normals are the gradients.

<div class="viz" data-viz="lagrange"></div>

!!! theorem "Lagrange multiplier theorem"
    If $\vv x^*$ is a local extremum of $f$ subject to $g(\vv x) = c$, and $\nabla g(\vv x^*) \neq \vv 0$, then there is a number $\lambda$ (the **Lagrange multiplier**) such that

    $$
    \nabla f(\vv x^*) = \lambda\nabla g(\vv x^*).
    $$

!!! proof "Proof"
    Let $\vv r(t)$ be any smooth curve on the constraint surface with $\vv r(0) = \vv x^*$.

    1. $t = 0$ is a local extremum of $t \mapsto f(\vv r(t))$, so its derivative vanishes: $\nabla f(\vv x^*)\cdot\vv r'(0) = 0$.
    2. So $\nabla f$ is perpendicular to every tangent direction of the constraint surface.
    3. The tangent directions are exactly the vectors perpendicular to $\nabla g$. (Differentiating $g(\vv r(t)) = c$ gives $\nabla g\cdot\vv r'(0) = 0$. The condition $\nabla g \neq \vv 0$ guarantees, via the implicit function theorem, that every such vector is achieved by some curve.)
    4. A vector perpendicular to everything that's perpendicular to $\nabla g$ must be a multiple of $\nabla g$.

## 2. The method

Define the **Lagrangian** $\mathcal L(\vv x, \lambda) = f(\vv x) - \lambda\big(g(\vv x) - c\big)$. Setting all its partial derivatives to zero gives

$$
\nabla_{\vv x}\mathcal L = \nabla f - \lambda\nabla g = \vv 0, \qquad \frac{\partial\mathcal L}{\partial\lambda} = -(g(\vv x) - c) = 0.
$$

That's the tangency condition plus the constraint: $n + 1$ equations in $n + 1$ unknowns.

Solve them, then compare $f$ at the candidates.

The recipe:

1. Write the constraint as $g(\vv x) = c$, and compute $\nabla f$ and $\nabla g$.
2. Write out $\nabla f = \lambda\nabla g$ component by component.
3. Use those equations to relate the variables to each other (often by eliminating $\lambda$).
4. Substitute into the constraint to pin down the actual points.
5. Evaluate $f$ at every candidate; the largest is the max, the smallest the min.

(Some books write $\mathcal L = f + \lambda(g - c)$ instead. That just flips the sign of $\lambda$; the points found are the same.)

!!! example "Example (the figure)"
    Maximize $f = x + y$ on the ellipse $\frac{x^2}{4} + y^2 = 1$.

    Gradients: $\nabla f = (1, 1)$ and $\nabla g = \left(\frac{2x}{4}, 2y\right) = \left(\frac x2, 2y\right)$.

    1. $\nabla f = (1, 1) = \lambda\left(\frac x2, 2y\right)$ gives $x = \frac2\lambda$ and $y = \frac{1}{2\lambda}$, so $x = 4y$.
    2. Substituting: $4y^2 + y^2 = 1$, so $y = \pm\frac{1}{\sqrt5}$ and $x = \pm\frac{4}{\sqrt5}$.

    In step 1, the components read $1 = \lambda\frac{x}{2}$ and $1 = 2\lambda y$. Neither can hold with $\lambda = 0$, so we may divide by $\lambda$. Dividing the two expressions: $\frac{x}{y} = \frac{2/\lambda}{1/(2\lambda)} = 4$.

    In step 2, "substituting" means putting $x = 4y$ into the constraint: $\frac{(4y)^2}{4} + y^2 = 4y^2 + y^2 = 5y^2 = 1$.

    - **Max** $f = \frac{5}{\sqrt5} = \sqrt5$ at $\left(\frac4{\sqrt5}, \frac1{\sqrt5}\right)$.
    - **Min** $-\sqrt5$ at the opposite point.

!!! example "Example: biggest rectangle with a given perimeter"
    Maximize $A = xy$ subject to $2x + 2y = P$.

    $\nabla A = (y, x) = \lambda(2, 2)$, so $x = y$: a square, with area $P^2/16$.

    (Both components equal $2\lambda$, so $y = 2\lambda = x$. Then $4x = P$ gives $x = y = P/4$.) The same answer as the substitution method, with no solving for $y$.

## 3. Eigenvectors are Lagrange solutions

Maximize $\vv x^\top A\vv x$ ($A$ symmetric) subject to $\vv x^\top\vv x = 1$:

$$
\nabla(\vv x^\top A\vv x) = \lambda\nabla(\vv x^\top\vv x) \iff 2A\vv x = 2\lambda\vv x \iff A\vv x = \lambda\vv x.
$$

So:

- the critical points are exactly the unit **eigenvectors**;
- the multipliers are the **eigenvalues**;
- the objective value there is $\vv x^\top A\vv x = \lambda$.

The maximum is $\lambda_{\max}$. That's an independent proof of the [Rayleigh quotient theorem](../linear-algebra/spectral.md#4-the-rayleigh-quotient-optimization-with-eigenvalues), and the derivation of PCA.

## 4. Maximum entropy: why the uniform distribution

Among all distributions $(p_1, \ldots, p_n)$ on $n$ outcomes, which has the largest entropy $H = -\sum p_i\log p_i$?

Constraint: $\sum p_i = 1$.

$$
\frac{\partial}{\partial p_i}\Big[-\sum_j p_j\log p_j - \lambda\big(\textstyle\sum_jp_j - 1\big)\Big] = -\log p_i - 1 - \lambda = 0 \implies p_i = e^{-1-\lambda}.
$$

The derivative step: only the $j = i$ terms involve $p_i$. By the product rule, $\frac{d}{dp}(p\log p) = \log p + p\cdot\frac1p = \log p + 1$, so $-p_i\log p_i$ contributes $-\log p_i - 1$. The constraint term $-\lambda p_i$ contributes $-\lambda$.

All $p_i$ are equal (each equals the same number $e^{-1-\lambda}$, whatever $\lambda$ turns out to be), so the constraint $\sum p_i = 1$ forces $p_i = \frac1n$: **the uniform distribution maximizes entropy** (with $H = \log n$).

That matches intuition: a fair die is the least predictable die.

Add more constraints and the same computation gives the famous distributions:

| Constraints | Maximum-entropy distribution |
|---|---|
| $\sum p_i = 1$ only | uniform |
| plus a fixed mean $\sum_i p_i x_i = \mu$ | $p_i \propto e^{-\beta x_i}$: **Boltzmann / softmax** |
| fixed mean and variance (continuous) | **Gaussian** |

Maximum entropy explains why these distributions appear everywhere ([Entropy](../information-theory/entropy.md)).

## 5. Several constraints, and the meaning of λ

With constraints $g_1 = c_1, \ldots, g_m = c_m$:

$$
\nabla f = \lambda_1\nabla g_1 + \cdots + \lambda_m\nabla g_m.
$$

At the optimum, $\nabla f$ lies in the span of the constraint gradients.

Same reasoning as before: the allowed directions are those perpendicular to *every* $\nabla g_k$ (moving along them keeps every constraint satisfied). If $\nabla f$ had any component along an allowed direction, you could improve. So $\nabla f$ is built only from the constraint normals.

**The multiplier is a price.** If $f^*(c)$ is the optimal value as a function of the constraint level, then

$$
\frac{df^*}{dc} = \lambda.
$$

The multiplier says how much the optimum improves per unit of relaxation of the constraint.

!!! example "Example: checking $\frac{df^*}{dc} = \lambda$"
    In the rectangle problem with perimeter $P$, the best area is $A^*(P) = \frac{P^2}{16}$. So $\frac{dA^*}{dP} = \frac{P}{8}$.

    The multiplier: $y = 2\lambda$ and $y = \frac{P}{4}$, so $\lambda = \frac{P}{8}$. They match.

    With $P = 40$: $\lambda = 5$. One extra meter of fence buys about $5\ \text{m}^2$ more area. (Check: $\frac{41^2}{16} - \frac{40^2}{16} \approx 105.06 - 100 = 5.06$.)

- In economics it's a "shadow price".
- In physics, constraint forces (like the tension in a pendulum rod) are Lagrange multipliers.

**Inequality constraints** ($g(\vv x) \leq c$) lead to the **KKT conditions**, covered in [Phase 7](../optimization/constrained.md). They're the basis of support vector machines.

!!! ml "Where this shows up"
    - **PCA** is a Lagrange problem (maximize variance subject to unit length).
    - **Softmax** is the maximum-entropy distribution with fixed expected score.
    - **Support vector machines**, **constrained policy optimization** (TRPO's KL constraint) and **fairness constraints** use multipliers and their KKT generalization.
    - **Weight decay** can be viewed as the Lagrangian of "minimize loss subject to $\norm{\vv w}^2 \leq C$", with $\lambda$ the multiplier.

## Check yourself

**1.** Find the extrema of $f(x,y) = xy$ on the circle $x^2 + y^2 = 2$.

??? success "Solution"
    $(y, x) = \lambda(2x, 2y)$ gives $y = 2\lambda x$ and $x = 2\lambda y$, so $x = 4\lambda^2x$.

    - Either $x = 0$: then $y = 0$, which is not on the circle.
    - Or $\lambda = \pm\frac12$, giving $y = \pm x$.

    | Points | $f$ | |
    |---|---|---|
    | $(1,1), (-1,-1)$ | $1$ | max |
    | $(1,-1), (-1,1)$ | $-1$ | min |

**2.** Find the point on the plane $x + 2y + 2z = 9$ closest to the origin.

??? success "Solution"
    Minimize $x^2 + y^2 + z^2$.

    1. $(2x, 2y, 2z) = \lambda(1, 2, 2)$, so $(x,y,z) = \frac\lambda2(1,2,2)$.
    2. Plugging into the plane: $\frac\lambda2\cdot9 = 9$, so $\lambda = 2$.
    3. The point is $(1, 2, 2)$, at distance 3.

    The closest point is along the normal vector, as the picture says.

**3.** Maximize $x + y + z$ subject to $x^2 + y^2 + z^2 = 3$.

??? success "Solution"
    - $(1,1,1) = 2\lambda(x,y,z)$, so $x = y = z$.
    - $3x^2 = 3$ gives $x = \pm1$.
    - Max is 3, at $(1,1,1)$.

**4.** Among distributions on $\{1, 2, 3\}$ with mean 2.5, which maximizes entropy? Set up the form of the answer.

??? success "Solution"
    $p_i \propto e^{-\beta i}$ (Boltzmann form), with $\beta$ chosen so the mean is 2.5.

    - Since $2.5 > 2$ (the uniform mean), $\beta < 0$: the probabilities increase with $i$.
    - Write $r = e^{-\beta}$. The mean condition $\frac{1 + 2r + 3r^2}{1 + r + r^2} = 2.5$ becomes $r^2 - r - 3 = 0$.
    - So $r = \frac{1 + \sqrt{13}}{2} \approx 2.303$ ($\beta \approx -0.83$), and $p \approx (0.12, 0.27, 0.62)$.

**5.** A box with a square base and open top must have volume 32. Minimize its surface area $x^2 + 4xh$.

??? success "Solution"
    Constraint: $x^2h = 32$. Lagrange: $(2x + 4h, 4x) = \lambda(2xh, x^2)$.

    1. From the second component, $\lambda = 4/x$.
    2. The first then gives $2x + 4h = 8h$, so $x = 2h$.
    3. Then $4h^3 = 32$, so $h = 2$ and $x = 4$.

    The area is $16 + 32 = 48$.
