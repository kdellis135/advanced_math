# Phase 5 · Probability

**Goal:** reason precisely about uncertainty:

- conditional probability and Bayes;
- random variables and their averages;
- the standard distributions;
- how variables relate;
- why averages of many random things are so predictable.

**Why it matters:** modern ML is probabilistic at its core.

- A classifier outputs a probability distribution.
- A language model is a probability distribution over text.
- Training maximizes likelihood.
- Generative models sample from learned distributions.
- Generalization guarantees are probability inequalities.

**The one big idea:** *probability is weighted counting, and expectation is a weighted average.*

Almost every result in this phase comes down to linearity of expectation plus a clever choice of what to average.

**Time:** about 18–22 hours.

<div class="progress-list" markdown>

1. [Counting](counting.md): permutations, combinations, the binomial theorem, inclusion–exclusion.
2. [Probability, conditioning and Bayes](foundations.md): axioms, conditional probability, independence, Bayes' theorem.
3. [Random variables and expectation](random-variables.md): PMFs, PDFs, linearity of expectation, variance.
4. [The distribution zoo](distributions.md): Bernoulli to Gaussian, where each comes from and why.
5. [Several random variables](joint.md): joint distributions, covariance, the multivariate Gaussian.
6. [Inequalities and limit theorems](limit-theorems.md): Markov, Chebyshev, the law of large numbers, the central limit theorem.

</div>

!!! tip "Prerequisites"
    [Integrals](../calculus/integrals.md) for continuous distributions; [Multiple integrals](../multivariable/integrals.md) and [symmetric matrices](../linear-algebra/spectral.md) for lesson 5.
