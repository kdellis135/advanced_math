# Phase 2 · Calculus

**Goal:** understand single-variable calculus *properly*:

- what a limit really is;
- why the derivative rules are true;
- why integration undoes differentiation;
- how any smooth function can be approximated by polynomials.

**The one big idea:** *zoom in far enough and every smooth curve looks like a straight line.*

The derivative is the slope of that line. Nearly everything in this phase, and in Phase 4, is a consequence of taking this idea seriously.

**Time:** about 14–18 hours.

<div class="progress-list" markdown>

1. [Limits and continuity](limits.md): the ε–δ definition, and why it's exactly the right definition.
2. [Derivatives](derivatives.md): the derivative as the best linear approximation, and proofs of the product and chain rules.
3. [Using derivatives](applications.md): optimization, the mean value theorem, L'Hôpital, Newton's method.
4. [Integrals](integrals.md): Riemann sums, the fundamental theorem of calculus, substitution and parts.
5. [Series and Taylor expansions](series-taylor.md): infinite sums, power series, Taylor's theorem, and a proof of Euler's formula.

</div>

!!! ml "Where Phase 2 shows up"
    - **Training a model = following derivatives downhill.** Gradient descent is the derivative used as a compass.
    - **The chain rule is backpropagation.** You'll prove it here in one variable; Phase 4 generalizes it.
    - **Integrals are expectations.** Every average over a continuous distribution is an integral.
    - **Taylor expansions** explain why gradient descent works for small steps, why Newton's method is fast, and why $\log(1+x) \approx x$ shows up in so many derivations.
