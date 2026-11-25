---
description: "Phase 6 of a free math-for-ML course: maximum likelihood, MAP and Bayesian inference, bias–variance and regularization, confidence intervals and hypothesis tests."
---

# Phase 6 · Statistics

**Goal:** go from data back to the process that generated it.

- **Estimate parameters:** MLE, MAP, Bayesian posteriors.
- **Understand generalization:** why models generalize or overfit (bias–variance, regularization).
- **Quantify uncertainty:** confidence intervals, tests.

**Why it matters:** *training a model is statistical estimation.*

| Deep learning practice | Statistics behind it |
|---|---|
| minimizing cross-entropy | maximum likelihood |
| weight decay | a Gaussian prior |
| overfitting | variance |

Once you see this, deep learning's design choices stop looking like arbitrary tricks.

**Time:** about 10–12 hours.

<div class="progress-list" markdown>

1. [Estimation, MLE and MAP](estimation.md): likelihood, why squared error and cross-entropy are MLE, priors as regularizers.
2. [Bias, variance and generalization](bias-variance.md): the decomposition, overfitting, ridge regression, cross-validation.
3. [Confidence intervals and tests](inference.md): quantifying uncertainty; p-values and A/B tests without the confusion.

</div>

!!! tip "Prerequisites"
    All of [Phase 5](../probability/index.md), plus [Matrix calculus](../multivariable/matrix-calculus.md) for the regression derivations.
