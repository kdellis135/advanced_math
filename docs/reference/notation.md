# Notation cheat sheet

Every symbol used on this site, with where it's introduced.

## Logic and sets

| Symbol | Meaning | Lesson |
|---|---|---|
| $\forall$, $\exists$ | for all, there exists | [Logic](../foundations/logic-and-proofs.md) |
| $\Rightarrow$, $\Leftrightarrow$ | implies, if and only if | [Logic](../foundations/logic-and-proofs.md) |
| $\land$, $\lor$, $\neg$ | and, or, not | [Logic](../foundations/logic-and-proofs.md) |
| $x\in A$, $A\subseteq B$ | element of, subset of | [Sets](../foundations/sets-functions.md) |
| $A\cup B$, $A\cap B$, $A\setminus B$, $A^c$ | union, intersection, difference, complement | [Sets](../foundations/sets-functions.md) |
| $\N, \Z, \Q, \R, \C$ | naturals, integers, rationals, reals, complex numbers | [Sets](../foundations/sets-functions.md) |
| $\R^n$ | $n$-tuples of reals (vectors) | [Vectors](../linear-algebra/vectors.md) |
| $f : A\to B$ | function from $A$ to $B$ | [Sets](../foundations/sets-functions.md) |
| $g\circ f$ | composition: $f$ first, then $g$ | [Sets](../foundations/sets-functions.md) |
| $:=$ | is defined as | |

## Sums, limits, calculus

| Symbol | Meaning | Lesson |
|---|---|---|
| $\sum_{i=1}^n a_i$, $\prod_{i=1}^n a_i$ | sum, product | [Sets](../foundations/sets-functions.md) |
| $\lim_{x\to a}f(x)$ | limit | [Limits](../calculus/limits.md) |
| $f'(x)$, $\frac{df}{dx}$ | derivative | [Derivatives](../calculus/derivatives.md) |
| $\frac{\partial f}{\partial x_i}$ | partial derivative | [Gradient](../multivariable/gradient.md) |
| $\nabla f$ | gradient (vector of partials) | [Gradient](../multivariable/gradient.md) |
| $J_{\vv f}$ | Jacobian matrix | [Chain rule](../multivariable/chain-rule.md) |
| $H_f$, $\nabla^2f$ | Hessian matrix | [Hessian](../multivariable/hessian.md) |
| $\int_a^b f(x)\,dx$ | definite integral | [Integrals](../calculus/integrals.md) |
| $O(\cdot)$, $\Omega(\cdot)$, $\Theta(\cdot)$, $o(\cdot)$ | growth rates | [Asymptotics](../discrete/asymptotics.md) |
| $\argmin_x f(x)$ | the $x$ minimizing $f$ | [Sets](../foundations/sets-functions.md) |

## Linear algebra

| Symbol | Meaning | Lesson |
|---|---|---|
| $\vv v$, $v_i$ | vector, its $i$-th component | [Vectors](../linear-algebra/vectors.md) |
| $\vv u\cdot\vv v = \vv u^\top\vv v$ | dot product | [Vectors](../linear-algebra/vectors.md) |
| $\norm{\vv v}$, $\norm{\vv v}_1$, $\norm{\vv v}_\infty$ | Euclidean, $\ell_1$, $\ell_\infty$ norms | [Vectors](../linear-algebra/vectors.md) |
| $A^\top$ | transpose | [Matrices](../linear-algebra/matrices.md) |
| $A^{-1}$ | inverse | [Linear systems](../linear-algebra/linear-systems.md) |
| $I$ | identity matrix | [Matrices](../linear-algebra/matrices.md) |
| $C(A)$, $N(A)$ | column space, null space | [Vector spaces](../linear-algebra/vector-spaces.md) |
| $\rank A$ | rank | [Vector spaces](../linear-algebra/vector-spaces.md) |
| $\det A$ | determinant | [Determinants](../linear-algebra/determinants.md) |
| $\tr A$ | trace (sum of diagonal) | [Eigenvalues](../linear-algebra/eigen.md) |
| $\lambda$, $\Lambda$ | eigenvalue, diagonal matrix of eigenvalues | [Eigenvalues](../linear-algebra/eigen.md) |
| $A\succ0$, $A\succeq0$ | positive definite, semidefinite | [Spectral theorem](../linear-algebra/spectral.md) |
| $U\Sigma V^\top$, $\sigma_i$ | SVD, singular values | [SVD](../linear-algebra/svd.md) |
| $A^+$ | pseudoinverse | [SVD](../linear-algebra/svd.md) |
| $\odot$ | elementwise product | [Chain rule](../multivariable/chain-rule.md) |

## Probability and statistics

| Symbol | Meaning | Lesson |
|---|---|---|
| $P(A)$, $P(A\mid B)$ | probability, conditional probability | [Probability](../probability/foundations.md) |
| $X\sim p$ | $X$ has distribution $p$ | [Random variables](../probability/random-variables.md) |
| $\E[X]$, $\Var(X)$ | expectation, variance | [Random variables](../probability/random-variables.md) |
| $\Cov(X, Y)$, $\rho$ | covariance, correlation | [Several variables](../probability/joint.md) |
| $\mathcal N(\mu, \sigma^2)$, $\mathcal N(\boldsymbol\mu, \Sigma)$ | normal distribution (1-D, multivariate) | [Distributions](../probability/distributions.md) |
| $\mathbb 1[\cdot]$ | indicator (1 if true, else 0) | [Random variables](../probability/random-variables.md) |
| i.i.d. | independent and identically distributed | [Limit theorems](../probability/limit-theorems.md) |
| $\hat\theta$ | an estimate of $\theta$ | [Estimation](../statistics/estimation.md) |
| $\binom nk$ | binomial coefficient | [Counting](../probability/counting.md) |

## Information theory

| Symbol | Meaning | Lesson |
|---|---|---|
| $H(X)$, $H(p)$ | entropy | [Entropy](../information-theory/entropy.md) |
| $H(Y\mid X)$ | conditional entropy | [Entropy](../information-theory/entropy.md) |
| $H(p, q)$ | cross-entropy | [KL](../information-theory/kl-divergence.md) |
| $\KL(p\,\Vert\,q)$ | Kullback–Leibler divergence | [KL](../information-theory/kl-divergence.md) |
| $I(X;Y)$ | mutual information | [KL](../information-theory/kl-divergence.md) |

## Greek letters

| | | | | | |
|---|---|---|---|---|---|
| $\alpha$ alpha | $\beta$ beta | $\gamma$ gamma | $\delta, \Delta$ delta | $\varepsilon$ epsilon | $\zeta$ zeta |
| $\eta$ eta | $\theta$ theta | $\kappa$ kappa | $\lambda, \Lambda$ lambda | $\mu$ mu | $\nu$ nu |
| $\xi$ xi | $\pi$ pi | $\rho$ rho | $\sigma, \Sigma$ sigma | $\tau$ tau | $\varphi, \phi$ phi |
| $\chi$ chi | $\psi$ psi | $\omega, \Omega$ omega | | | |

Common conventions in ML papers: $\theta$ for parameters, $\eta$ for the learning rate, $\lambda$ for regularization strength (or eigenvalues), $\sigma$ for standard deviation (or the sigmoid), $\epsilon$ for noise or small constants, $\mu$ for means.
