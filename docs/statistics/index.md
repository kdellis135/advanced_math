# Phase 6 · Statistics

**Goal:** go from data back to the process that generated it. Estimate parameters (MLE, MAP, Bayesian posteriors), understand why models generalize or overfit (bias–variance, regularization), and quantify uncertainty (confidence intervals, tests).

**Why it matters:** *training a model is statistical estimation.* Minimizing cross-entropy is maximum likelihood, weight decay is a Gaussian prior, and overfitting is variance. Once you see this, deep learning's design choices stop looking like arbitrary tricks.

**Time:** about 10–12 hours.

<div class="progress-list" markdown>

1. [Estimation, MLE and MAP](estimation.md): likelihood, why squared error and cross-entropy are MLE, priors as regularizers.
2. [Bias, variance and generalization](bias-variance.md): the decomposition, overfitting, ridge regression, cross-validation.
3. [Confidence intervals and tests](inference.md): quantifying uncertainty; p-values and A/B tests without the confusion.

</div>

!!! tip "Prerequisites"
    All of [Phase 5](../probability/index.md), plus [Matrix calculus](../multivariable/matrix-calculus.md) for the regression derivations.
