---
title: "Math for Machine Learning, from the Ground Up"
description: "A free course in the math behind machine learning: calculus, linear algebra, probability, statistics, optimization and information theory, with proofs, worked examples and interactive figures."
hide:
  - navigation
  - toc
---

# Advanced Math, Properly

**The math behind machine learning, algorithms, information theory and physics, rebuilt from the ground up.**

Each idea comes with:

1. the intuition first;
2. then a precise definition;
3. a proof you can actually follow;
4. worked examples;
5. an interactive figure you can play with.

This site is for people who were good at high-school math, drifted through university math, and now want to *really* understand it.

No hand-waving, and no detours into material you will never use.

[Start here :material-arrow-right:](start/index.md){ .md-button .md-button--primary }
[See the roadmap](start/roadmap.md){ .md-button }

---

## The idea

Most advanced math is three or four big ideas used over and over:

| Big idea | In one line | Where it appears |
|---|---|---|
| **Linear approximation** | near any point, a smooth function looks like a linear one | derivatives, gradients, Jacobians, backprop, Newton's method |
| **Linear structure** | matrices are transformations, and the right basis makes them simple | eigenvectors, SVD, PCA, least squares, Fourier |
| **Averages under uncertainty** | probability is just weighted counting, and averages concentrate | expectation, LLN, CLT, MLE |
| **Measuring information** | surprise is a logarithm | entropy, cross-entropy loss, KL divergence, compression |

Every lesson tells you which of these ideas it is using, so the pieces connect instead of piling up.

## The ten phases

<div class="grid cards" markdown>

-   :material-alpha-f-box:{ .lg } **1 · Foundations**

    Logic and proof, sets and functions, exponentials and logs, trig, complex numbers. The language everything else is written in.

    [:octicons-arrow-right-24: Begin](foundations/index.md)

-   :material-chart-bell-curve-cumulative:{ .lg } **2 · Calculus**

    Limits, derivatives, integrals and Taylor series, done properly with ε–δ and full proofs of the rules you memorized.

    [:octicons-arrow-right-24: Begin](calculus/index.md)

-   :material-matrix:{ .lg } **3 · Linear Algebra**

    Vectors, matrices as transformations, rank, determinants, projections, eigenvectors, the spectral theorem, SVD and PCA.

    [:octicons-arrow-right-24: Begin](linear-algebra/index.md)

-   :material-axis-arrow:{ .lg } **4 · Multivariable Calculus**

    Gradients, Jacobians, the chain rule as backpropagation, Hessians, matrix calculus, change of variables, Lagrange multipliers.

    [:octicons-arrow-right-24: Begin](multivariable/index.md)

-   :material-dice-multiple:{ .lg } **5 · Probability**

    Counting, Bayes, random variables, the key distributions, covariance, the law of large numbers and the central limit theorem.

    [:octicons-arrow-right-24: Begin](probability/index.md)

-   :material-chart-scatter-plot:{ .lg } **6 · Statistics**

    Maximum likelihood, MAP, bias–variance, regularization, confidence intervals and hypothesis tests.

    [:octicons-arrow-right-24: Begin](statistics/index.md)

-   :material-image-filter-hdr:{ .lg } **7 · Optimization**

    Convexity, Jensen, gradient descent with convergence proofs, SGD, momentum, Adam, KKT and duality.

    [:octicons-arrow-right-24: Begin](optimization/index.md)

-   :material-information-variant:{ .lg } **8 · Information Theory**

    Entropy, cross-entropy, KL divergence, mutual information, and Shannon's source coding theorem.

    [:octicons-arrow-right-24: Begin](information-theory/index.md)

-   :material-graph:{ .lg } **9 · Discrete Math & Algorithms**

    Big-O, recurrences and the master theorem, graphs, and the number theory behind hashing and cryptography.

    [:octicons-arrow-right-24: Begin](discrete/index.md)

-   :material-sine-wave:{ .lg } **10 · Signals & Dynamics**

    Differential equations and Fourier analysis: the bridge to physics, signal processing and modern ML.

    [:octicons-arrow-right-24: Begin](further/index.md)

</div>

## What you'll be able to do at the end

- Read a machine learning paper's math section **line by line**: the loss, the gradient derivation, the probabilistic model, the KL term.
- Derive backpropagation, least squares, PCA, logistic regression and the VAE objective **yourself, on paper**.
- Know *why* gradient descent converges, *why* cross-entropy is the right loss, and *why* averages become Gaussian.
- Analyze an algorithm's running time and prove it.
- Pick up quantum mechanics, signal processing, control theory or any graduate ML text without hitting a wall of unfamiliar math.

## How each lesson is built

| Box | What it's for |
|---|---|
| :material-lightbulb: **Intuition** | The picture to hold in your head. Read these first. |
| :material-book: **Definition** | The precise meaning. Learn these word for word. |
| :material-star: **Theorem** | What's true. |
| :material-check-circle: **Proof** | Why it's true. Collapsed proofs marked *deeper* are safe to skip on a first pass. |
| :material-chip: **Where this shows up** | The link to ML, algorithms or physics. |
| :material-help-circle: **Check yourself** | Exercises with hidden solutions. Do them. That's where the learning happens. |

Your progress (the **Mark lesson complete** button at the bottom of each lesson) is saved in your browser only.
