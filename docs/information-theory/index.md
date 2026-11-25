---
description: "Phase 8 of a free math-for-ML course: entropy, cross-entropy, KL divergence, mutual information and Shannon's source coding theorem."
---

# Phase 8 · Information Theory

**Goal:** measure information. Learn:

- what entropy is, and why it's defined with a logarithm;
- what cross-entropy and KL divergence measure;
- what mutual information captures;
- why entropy is the hard limit on compression.

**Why it matters:**

- The loss function of nearly every classifier and every language model is a cross-entropy.
- VAEs and diffusion models optimize bounds involving KL divergences.
- Perplexity, bits-per-byte, distillation, the information bottleneck and contrastive learning (InfoNCE) are all information-theoretic.

Claude Shannon's 1948 theory is the language these ideas are written in.

**The one big idea:** *the information in an event is the log of how surprising it is,* $\log\frac{1}{p}$.

Entropy is the average surprise. Everything else is built from comparing surprises.

**Time:** about 8–10 hours.

<div class="progress-list" markdown>

1. [Entropy](entropy.md): surprise, bits, maximum entropy, joint and conditional entropy.
2. [Cross-entropy, KL and mutual information](kl-divergence.md): Gibbs' inequality, why cross-entropy loss is MLE, forward vs reverse KL, the ELBO.
3. [Compression and coding](coding.md): Kraft's inequality, Shannon's source coding theorem, Huffman codes, perplexity.

</div>

!!! tip "Prerequisites"
    [Random variables and expectation](../probability/random-variables.md), [logarithms](../foundations/exp-log-trig.md), and [Jensen's inequality](../optimization/convexity.md#5-jensens-inequality).
