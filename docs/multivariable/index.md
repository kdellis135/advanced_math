# Phase 4 · Multivariable Calculus

**Goal:** extend calculus to functions of many variables, which is the setting of every ML model, since a loss is a function of millions of parameters.

**The one big idea (again):** *zoom in and every smooth function looks linear.* The "linear part" changes shape:

| Function | Linear part |
|---|---|
| one input, one output | a number $f'(x)$ |
| many inputs, one output | a vector: the **gradient** |
| many inputs, many outputs | a matrix: the **Jacobian** |

The chain rule becomes matrix multiplication. Applied to a neural network, it becomes **backpropagation**.

**Time:** about 18–22 hours.

<div class="progress-list" markdown>

1. [Partial derivatives and the gradient](gradient.md): steepest ascent, contour lines, directional derivatives.
2. [Jacobians, the chain rule and backprop](chain-rule.md): computational graphs, forward vs reverse mode, a fully worked backprop example.
3. [The Hessian and second-order Taylor](hessian.md): curvature, saddle points, conditioning.
4. [Matrix calculus for ML](matrix-calculus.md): the identities you need to read (and write) gradient derivations.
5. [Multiple integrals and change of variables](integrals.md): the Jacobian determinant and the Gaussian integral.
6. [Lagrange multipliers](lagrange.md): optimizing with constraints.

</div>

!!! tip "Prerequisites"
    You need [Derivatives](../calculus/derivatives.md) (especially the chain rule and the linear-approximation view) and Phase 3 up to [Eigenvalues](../linear-algebra/eigen.md) and the [spectral theorem](../linear-algebra/spectral.md).
