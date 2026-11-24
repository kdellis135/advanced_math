# Constraints, KKT and duality

<div class="lesson-meta" markdown>
**Phase 7 · Lesson 3** · ⏱ ~3 hours · Needs: [Lagrange multipliers](../multivariable/lagrange.md), [Convexity and Jensen](convexity.md)
</div>

Lagrange multipliers handle equality constraints. Real problems also have **inequalities**:

- weights must be non-negative;
- a margin must be at least 1;
- a policy update must stay within a KL budget.

Two tools handle them:

| Tool | What it does |
|---|---|
| **KKT conditions** | extend Lagrange multipliers to inequalities |
| **Duality** | gives every optimization problem a twin that provides lower bounds, and is sometimes easier to solve |

Together they explain support vector machines.

## 1. The general problem

$$
\min_{\vv x}\ f(\vv x)\quad\text{subject to}\quad g_i(\vv x)\leq0\ (i = 1..m),\qquad h_j(\vv x) = 0\ (j = 1..p).
$$

The **Lagrangian** attaches a multiplier to each constraint:

$$
\mathcal L(\vv x, \boldsymbol\lambda, \boldsymbol\nu) = f(\vv x) + \sum_i\lambda_ig_i(\vv x) + \sum_j\nu_jh_j(\vv x), \qquad\lambda_i\geq0.
$$

## 2. Inequalities: active or inactive

!!! intuition "Two cases for each inequality"
    At the optimum, an inequality constraint is either:

    - **inactive** ($g_i(\vv x^*) < 0$): the optimum is strictly inside the allowed region in that respect, so the constraint doesn't matter locally. Its multiplier is $\lambda_i = 0$.
    - **active** ($g_i(\vv x^*) = 0$): the optimum is pressed against the boundary. It behaves like an equality constraint, but with a sign condition. $f$ would like to cross into $g_i > 0$, so $-\nabla f$ points outward, in the direction of $\nabla g_i$, giving $\lambda_i\geq0$.

    Both cases are captured by **complementary slackness**: $\lambda_ig_i(\vv x^*) = 0$.

!!! theorem "KKT conditions"
    Under mild regularity conditions ("constraint qualifications"), if $\vv x^*$ is optimal then there exist $\boldsymbol\lambda, \boldsymbol\nu$ such that:

    1. **Stationarity:** $\nabla f(\vv x^*) + \sum_i\lambda_i\nabla g_i(\vv x^*) + \sum_j\nu_j\nabla h_j(\vv x^*) = \vv 0$;
    2. **Primal feasibility:** $g_i(\vv x^*)\leq0$, $h_j(\vv x^*) = 0$;
    3. **Dual feasibility:** $\lambda_i\geq0$;
    4. **Complementary slackness:** $\lambda_ig_i(\vv x^*) = 0$.

    **For convex problems** ($f$, $g_i$ convex; $h_j$ affine), the KKT conditions are also **sufficient**: any point satisfying them is a global optimum.

The necessity proof generalizes the Lagrange argument using a separating-hyperplane theorem; it is outside the scope of this site.

Sufficiency for convex problems follows from the duality argument in §3.

!!! example "Example: projection onto a ball"
    Minimize $\norm{\vv x - \vv a}^2$ subject to $\norm{\vv x}^2\leq1$.

    Stationarity: $2(\vv x - \vv a) + 2\lambda\vv x = \vv 0$, so $\vv x = \frac{\vv a}{1 + \lambda}$.

    - If $\norm{\vv a}\leq1$: try $\lambda = 0$, giving $\vv x = \vv a$. Feasible, and complementary slackness holds. **Inactive**: the point is already inside.
    - If $\norm{\vv a} > 1$: the constraint must be active, $\norm{\vv x} = 1$, so $1 + \lambda = \norm{\vv a}$ and $\vv x = \vv a/\norm{\vv a}$, with $\lambda = \norm{\vv a} - 1\geq0$. ✓ **Active**: we scale back to the sphere.

    This exact operation, "rescale if the norm is too big," is **gradient clipping**.

## 3. The dual problem

For each $\boldsymbol\lambda\geq0$ and $\boldsymbol\nu$, define the **dual function**

$$
q(\boldsymbol\lambda, \boldsymbol\nu) = \min_{\vv x}\mathcal L(\vv x, \boldsymbol\lambda, \boldsymbol\nu).
$$

!!! theorem "Weak duality"
    For every $\boldsymbol\lambda\geq0$ and $\boldsymbol\nu$: $q(\boldsymbol\lambda, \boldsymbol\nu)\leq f^*$ (the optimal value of the original, **primal**, problem).

!!! proof "Proof"
    Take any feasible $\vv x$.

    1. $g_i(\vv x)\leq0$ and $\lambda_i\geq0$ make $\lambda_ig_i(\vv x)\leq0$, and $h_j(\vv x) = 0$.
    2. So $\mathcal L(\vv x, \boldsymbol\lambda, \boldsymbol\nu)\leq f(\vv x)$.
    3. Therefore $q = \min_{\vv x}\mathcal L\leq\mathcal L(\vv x, \boldsymbol\lambda, \boldsymbol\nu)\leq f(\vv x)$ for every feasible $\vv x$, including the optimal one.

So every dual point gives a **lower bound** on the true optimum.

The **dual problem** looks for the best bound:

$$
d^* = \max_{\boldsymbol\lambda\geq0, \boldsymbol\nu}q(\boldsymbol\lambda, \boldsymbol\nu)\leq f^*.
$$

Two useful facts:

- $q$ is always **concave** (it's a minimum of functions that are affine in $(\boldsymbol\lambda, \boldsymbol\nu)$). So the dual is a convex problem even when the primal isn't.
- **Strong duality:** for convex problems satisfying **Slater's condition** (some strictly feasible point exists, with $g_i(\vv x) < 0$ for all $i$), $d^* = f^*$. The gap closes, and solving the dual solves the primal.

!!! intuition "Prices"
    Think of $\lambda_i$ as a price for violating constraint $i$. The Lagrangian lets you violate constraints if you pay.

    - **Weak duality:** for any prices, the cheapest unconstrained solution costs no more than the true optimum.
    - **Strong duality:** at the right prices, the unconstrained optimum chooses to obey the constraints exactly.

## 4. Support vector machines

Linearly separable data $(\vv x_i, y_i)$ with $y_i\in\{-1, +1\}$.

Among all separating hyperplanes $\vv w^\top\vv x + b = 0$, find the one with the **largest margin**.

- Scale so the closest points satisfy $y_i(\vv w^\top\vv x_i + b) = 1$.
- Then the distance from the hyperplane to the closest point is $1/\norm{\vv w}$.

So:

$$
\min_{\vv w, b}\ \tfrac12\norm{\vv w}^2\quad\text{subject to}\quad y_i(\vv w^\top\vv x_i + b)\geq1\ \ \text{for all } i.
$$

This is convex: a quadratic objective with affine constraints.

KKT stationarity with multipliers $\alpha_i\geq0$:

$$
\vv w = \sum_i\alpha_iy_i\vv x_i, \qquad\sum_i\alpha_iy_i = 0.
$$

By **complementary slackness**, $\alpha_i > 0$ only for points exactly on the margin: the **support vectors**.

- The solution depends only on these few points.
- Every other point could be moved (without crossing the margin), and nothing would change.

Substituting back gives the **dual**:

$$
\max_{\boldsymbol\alpha\geq0}\ \sum_i\alpha_i - \tfrac12\sum_{i,j}\alpha_i\alpha_jy_iy_j\,\vv x_i^\top\vv x_j\quad\text{s.t.}\ \sum_i\alpha_iy_i = 0.
$$

The data enter **only through dot products** $\vv x_i^\top\vv x_j$.

Replace them with a kernel $k(\vv x_i, \vv x_j)$, a dot product in some high-dimensional feature space, and you get nonlinear SVMs at no extra cost.

That's the **kernel trick**, and it falls out of duality.

!!! ml "Where this shows up"
    - **SVMs and kernel methods**, as derived above.
    - **Constrained policy optimization** in reinforcement learning is solved via its Lagrangian.
        - TRPO: maximize improvement subject to a KL-divergence budget.
    - **Optimal transport** (Wasserstein distances, used in WGANs) has a dual form that a neural network can approximate.
    - **Projected gradient descent** handles simple constraints: take a gradient step, then project back onto the feasible set.
        - The ball-projection example above is the most common case.

## Check yourself

**1.** Minimize $x^2$ subject to $x\geq1$. Write the KKT conditions and solve.

??? success "Solution"
    - Constraint: $g = 1 - x\leq0$.
    - Stationarity: $2x - \lambda = 0$.
    - If $\lambda = 0$, then $x = 0$: infeasible.
    - So the constraint is active: $x = 1$, $\lambda = 2\geq0$. ✓

**2.** Minimize $x^2$ subject to $x\geq-1$. Which constraint state applies?

??? success "Solution"
    **Inactive.** The unconstrained minimum $x = 0$ is feasible, so $\lambda = 0$.

**3.** Find the dual function of: minimize $x^2$ subject to $1 - x\leq0$. Verify strong duality.

??? success "Solution"
    1. $\mathcal L = x^2 + \lambda(1 - x)$, minimized at $x = \lambda/2$.
    2. So $q(\lambda) = \lambda - \lambda^2/4$.
    3. This is maximized at $\lambda = 2$, with $q = 1 = f^*$.

    Strong duality holds (Slater: $x = 2$ is strictly feasible).

**4.** Project $\vv a = (3, 4)$ onto the unit ball. What's the multiplier?

??? success "Solution"
    $\norm{\vv a} = 5 > 1$, so the constraint is active:

    - $\vv x = \vv a/\norm{\vv a} = (0.6, 0.8)$
    - $\lambda = \norm{\vv a} - 1 = 4$

**5.** In an SVM with 10,000 training points, the solution has 150 support vectors. What happens to the classifier if you delete a non-support-vector training point?

??? success "Solution"
    Nothing.

    - Its $\alpha_i = 0$, so it contributes nothing to $\vv w$.
    - The remaining problem has the same KKT solution.
