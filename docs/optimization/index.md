---
description: "Phase 7 of a free math-for-ML course: convexity and Jensen's inequality, gradient descent convergence, SGD, momentum, Adam, KKT conditions and duality."
---

# Phase 7 · Optimization

**Goal:** understand the algorithms that train models:

- when minimization is easy (convexity);
- why gradient descent converges, and how fast;
- what SGD, momentum and Adam add;
- how constraints are handled (KKT, duality).

**Why it matters:** "training" *is* optimization. Knowing the theory tells you:

- why learning rates have upper limits;
- why ill-conditioned problems zigzag;
- why momentum helps;
- what a convergence guarantee can and cannot promise for a non-convex network.

**Time:** about 10–14 hours.

<div class="progress-list" markdown>

1. [Convexity and Jensen](convexity.md): convex sets and functions, local = global, Jensen's inequality.
2. [Gradient descent and friends](gradient-descent.md): convergence proofs, conditioning, SGD, momentum, Adam, Newton.
3. [Constraints, KKT and duality](constrained.md): Lagrangians with inequalities, complementary slackness, the dual problem, SVMs.

</div>

!!! tip "Prerequisites"
    [Phase 4](../multivariable/index.md) (gradients, Hessians, Lagrange multipliers) and the [spectral theorem](../linear-algebra/spectral.md).
