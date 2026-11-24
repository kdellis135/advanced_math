# Phase 1 · Foundations

**Goal:**

- Learn the *language* of advanced math: logic, proof, sets, functions, notation.
- Refresh the high-school functions that show up everywhere: exponentials, logarithms, trigonometry.
- Extend numbers to the complex plane.

**Why it matters:** this is where most people got lost the first time.

University courses assume you can read a proof and parse $\forall \varepsilon > 0\ \exists \delta > 0$, and almost nobody is taught to. Two weeks here pays back for the rest of the site.

**Time:** about 8–12 hours.

<div class="progress-list" markdown>

1. [Logic and proofs](logic-and-proofs.md): implication, quantifiers, and the five proof techniques you'll see everywhere.
2. [Sets, functions and notation](sets-functions.md): the vocabulary, plus summation notation, which ML papers use constantly.
3. [Exponentials, logarithms and trig](exp-log-trig.md): why $e$ is special, why logs turn products into sums, and where trig identities come from.
4. [Complex numbers](complex-numbers.md): multiplication as rotation, Euler's formula, roots of unity.

</div>

!!! ml "Where Phase 1 shows up"
    - **Logs** are everywhere in ML: log-likelihood, log-probabilities, cross-entropy, log-sum-exp.
    - **Summation notation** is how every loss function is written: $L = \frac{1}{n}\sum_{i=1}^n \ell(y_i, \hat y_i)$.
    - **Induction** is how you prove algorithms correct.
    - **Complex numbers** are behind the Fourier transform, eigenvalues of rotations, and rotary position embeddings (RoPE) in Transformers.
