# Lagrange multipliers

<div class="lesson-meta" markdown>
**Phase 4 · Lesson 6** · ⏱ ~2.5 hours · Needs: [Partial derivatives and the gradient](gradient.md)
</div>

Real optimization problems come with constraints: probabilities must sum to 1, a budget is fixed, a vector must have unit length. Lagrange multipliers turn a constrained problem into an unconstrained one with one extra variable per constraint. The idea comes from one picture: **at the optimum, the level curve of the objective just touches the constraint.**

## 1. The picture

Maximize $f(x, y)$ subject to $g(x, y) = c$. Walk along the constraint curve and watch $f$. At a point where $\nabla f$ has a component *along* the curve, you could walk in that direction and increase $f$, so you're not at the max. At the optimum, $\nabla f$ must have no component along the curve: it must be **perpendicular to the curve**. But $\nabla g$ is also perpendicular to the curve (it's a level set of $g$). So the two gradients are parallel.

<div class="viz" data-viz="lagrange"></div>

!!! theorem "Lagrange multiplier theorem"
    If $\vv x^*$ is a local extremum of $f$ subject to $g(\vv x) = c$, and $\nabla g(\vv x^*) \neq \vv 0$, then there is a number $\lambda$ (the **Lagrange multiplier**) such that

    $$
    \nabla f(\vv x^*) = \lambda\nabla g(\vv x^*).
    $$

!!! proof "Proof"
    Let $\vv r(t)$ be any smooth curve on the constraint surface with $\vv r(0) = \vv x^*$. Then $t = 0$ is a local extremum of $t \mapsto f(\vv r(t))$, so its derivative vanishes: $\nabla f(\vv x^*)\cdot\vv r'(0) = 0$. So $\nabla f$ is perpendicular to every tangent direction of the constraint surface.

    The tangent directions are exactly the vectors perpendicular to $\nabla g$. (Differentiating $g(\vv r(t)) = c$ gives $\nabla g\cdot\vv r'(0) = 0$; the condition $\nabla g \neq \vv 0$ guarantees, via the implicit function theorem, that every such vector is achieved by some curve.) A vector perpendicular to everything that's perpendicular to $\nabla g$ must be a multiple of $\nabla g$.

## 2. The method

Define the **Lagrangian** $\mathcal L(\vv x, \lambda) = f(\vv x) - \lambda\big(g(\vv x) - c\big)$. Setting all its partial derivatives to zero gives

$$
\nabla_{\vv x}\mathcal L = \nabla f - \lambda\nabla g = \vv 0, \qquad \frac{\partial\mathcal L}{\partial\lambda} = -(g(\vv x) - c) = 0.
$$

That's the tangency condition plus the constraint: $n + 1$ equations in $n + 1$ unknowns. Solve, then compare $f$ at the candidates.

!!! example "Example (the figure)"
    Maximize $f = x + y$ on the ellipse $\frac{x^2}{4} + y^2 = 1$.
    $\nabla f = (1, 1) = \lambda\left(\frac x2, 2y\right)$ gives $x = \frac2\lambda$, $y = \frac{1}{2\lambda}$, so $x = 4y$. Substituting: $4y^2 + y^2 = 1$, so $y = \pm\frac{1}{\sqrt5}$, $x = \pm\frac{4}{\sqrt5}$.
    Max $f = \frac{5}{\sqrt5} = \sqrt5$ at $\left(\frac4{\sqrt5}, \frac1{\sqrt5}\right)$; min $-\sqrt5$ at the opposite point.

!!! example "Example: biggest rectangle with a given perimeter"
    Maximize $A = xy$ subject to $2x + 2y = P$. $\nabla A = (y, x) = \lambda(2, 2)$, so $x = y$: a square, with area $P^2/16$.

## 3. Eigenvectors are Lagrange solutions

Maximize $\vv x^\top A\vv x$ ($A$ symmetric) subject to $\vv x^\top\vv x = 1$:

$$
\nabla(\vv x^\top A\vv x) = \lambda\nabla(\vv x^\top\vv x) \iff 2A\vv x = 2\lambda\vv x \iff A\vv x = \lambda\vv x.
$$

The critical points are exactly the unit **eigenvectors**, the multipliers are the **eigenvalues**, and the objective value there is $\vv x^\top A\vv x = \lambda$. So the maximum is $\lambda_{\max}$, an independent proof of the [Rayleigh quotient theorem](../linear-algebra/spectral.md#4-the-rayleigh-quotient-optimization-with-eigenvalues), and the derivation of PCA.

## 4. Maximum entropy: why the uniform distribution

Among all distributions $(p_1, \ldots, p_n)$ on $n$ outcomes, which has the largest entropy $H = -\sum p_i\log p_i$? Constraint: $\sum p_i = 1$.

$$
\frac{\partial}{\partial p_i}\Big[-\sum_j p_j\log p_j - \lambda\big(\textstyle\sum_jp_j - 1\big)\Big] = -\log p_i - 1 - \lambda = 0 \implies p_i = e^{-1-\lambda}.
$$

All $p_i$ are equal, so $p_i = \frac1n$: **the uniform distribution maximizes entropy** (with $H = \log n$). Add a constraint on the mean, $\sum_i p_i x_i = \mu$, and the same computation gives $p_i \propto e^{-\beta x_i}$, the **Boltzmann/softmax distribution**. Fix the mean and variance of a continuous distribution and you get the **Gaussian**. Maximum entropy explains why these distributions appear everywhere ([Entropy](../information-theory/entropy.md)).

## 5. Several constraints, and the meaning of λ

With constraints $g_1 = c_1, \ldots, g_m = c_m$:

$$
\nabla f = \lambda_1\nabla g_1 + \cdots + \lambda_m\nabla g_m.
$$

At the optimum, $\nabla f$ lies in the span of the constraint gradients.

**The multiplier is a price.** If $f^*(c)$ is the optimal value as a function of the constraint level, then $\frac{df^*}{dc} = \lambda$: the multiplier says how much the optimum improves per unit of relaxation of the constraint. In economics it's a "shadow price"; in physics, constraint forces (like the tension in a pendulum rod) are Lagrange multipliers.

**Inequality constraints** ($g(\vv x) \leq c$) lead to the **KKT conditions**, covered in [Phase 7](../optimization/constrained.md). They're the basis of support vector machines.

!!! ml "Where this shows up"
    - **PCA** is a Lagrange problem (maximize variance subject to unit length).
    - **Softmax** is the maximum-entropy distribution with fixed expected score.
    - **Support vector machines**, **constrained policy optimization** (TRPO's KL constraint) and **fairness constraints** use multipliers and their KKT generalization.
    - **Weight decay** can be viewed as the Lagrangian of "minimize loss subject to $\norm{\vv w}^2 \leq C$", with $\lambda$ the multiplier.

## Check yourself

**1.** Find the extrema of $f(x,y) = xy$ on the circle $x^2 + y^2 = 2$.

??? success "Solution"
    $(y, x) = \lambda(2x, 2y)$ gives $y = 2\lambda x$, $x = 2\lambda y$, so $x = 4\lambda^2x$. Either $x = 0$ (then $y = 0$, not on the circle) or $\lambda = \pm\frac12$, giving $y = \pm x$. Points: $(1,1), (-1,-1)$ with $f = 1$ (max) and $(1,-1), (-1,1)$ with $f = -1$ (min).

**2.** Find the point on the plane $x + 2y + 2z = 9$ closest to the origin.

??? success "Solution"
    Minimize $x^2 + y^2 + z^2$: $(2x, 2y, 2z) = \lambda(1, 2, 2)$, so $(x,y,z) = \frac\lambda2(1,2,2)$. Plugging in: $\frac\lambda2\cdot9 = 9$, so $\lambda = 2$ and the point is $(1, 2, 2)$, at distance 3. (The closest point is along the normal vector, as the picture says.)

**3.** Maximize $x + y + z$ subject to $x^2 + y^2 + z^2 = 3$.

??? success "Solution"
    $(1,1,1) = 2\lambda(x,y,z)$, so $x = y = z$, and $3x^2 = 3$ gives $x = \pm1$. Max 3 at $(1,1,1)$.

**4.** Among distributions on $\{1, 2, 3\}$ with mean 2.5, which maximizes entropy? Set up the form of the answer.

??? success "Solution"
    $p_i \propto e^{-\beta i}$ (Boltzmann form), with $\beta$ chosen so the mean is 2.5. Since $2.5 > 2$ (the uniform mean), $\beta < 0$: the probabilities increase with $i$. Writing $r = e^{-\beta}$, the mean condition $\frac{1 + 2r + 3r^2}{1 + r + r^2} = 2.5$ becomes $r^2 - r - 3 = 0$, so $r = \frac{1 + \sqrt{13}}{2} \approx 2.303$ ($\beta \approx -0.83$) and $p \approx (0.12, 0.27, 0.62)$.

**5.** A box with a square base and open top must have volume 32. Minimize its surface area $x^2 + 4xh$.

??? success "Solution"
    Constraint $x^2h = 32$. $(2x + 4h, 4x) = \lambda(2xh, x^2)$. From the second component, $\lambda = 4/x$. The first then gives $2x + 4h = 8h$, so $x = 2h$. Then $4h^3 = 32$, $h = 2$, $x = 4$, and the area is $16 + 32 = 48$.
