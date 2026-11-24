# Entropy

<div class="lesson-meta" markdown>
**Phase 8 · Lesson 1** · ⏱ ~3 hours · Needs: [Random variables and expectation](../probability/random-variables.md), [Convexity and Jensen](../optimization/convexity.md)
</div>

How much information is in a message? Shannon's insight was to ignore meaning and focus on **uncertainty**.

- Learning the outcome of a fair coin flip resolves a little uncertainty.
- Learning which of a million equally likely lottery tickets won resolves a lot.

Entropy measures the average uncertainty of a random variable, in bits. It turns out to be exactly the number of yes/no questions (or binary digits) needed to describe the outcome.

## 1. Surprise

We want a measure $I(p)$ of how much information we gain from observing an event of probability $p$. Reasonable requirements:

1. A certain event carries no information: $I(1) = 0$.
2. Rarer events carry more information: $I$ decreases in $p$.
3. Information from **independent** events adds: $I(pq) = I(p) + I(q)$.

The third requirement says $I$ turns products into sums, so it's a logarithm. (Any continuous function with $I(pq) = I(p) + I(q)$ is $c\log p$.)

With the first two requirements:

!!! definition "Definition: self-information (surprise)"
    $$
    I(x) = \log_2\frac{1}{p(x)} = -\log_2p(x)\quad\text{bits}.
    $$

    Using $\ln$ instead gives **nats** ($1\text{ nat} = \frac{1}{\ln2}\approx1.44$ bits).

| Event | Surprise |
|---|---|
| a fair coin flip | 1 bit |
| one of 8 equally likely outcomes | 3 bits: exactly the three yes/no questions needed to identify it |
| an event with probability $\frac{1}{1024}$ | 10 bits |

## 2. Entropy

!!! definition "Definition: entropy"
    The **entropy** of a discrete random variable $X$ with distribution $p$ is its expected surprise:

    $$
    H(X) = \E\left[\log\frac{1}{p(X)}\right] = -\sum_xp(x)\log p(x),
    $$

    with the convention $0\log0 = 0$ (justified by $\lim_{p\to0}p\log p = 0$).

!!! example "Examples"
    | Variable | Entropy |
    |---|---|
    | fair coin | $\frac12\cdot1 + \frac12\cdot1 = 1$ bit |
    | biased coin, $p = 0.9$ | $0.9\log_2\frac{1}{0.9} + 0.1\log_2\frac{1}{0.1}\approx0.137 + 0.332 = 0.469$ bits |
    | fair die | $\log_26\approx2.585$ bits |
    | deterministic variable | $0$ |

<div class="viz" data-viz="entropy"></div>

!!! intuition "Three readings of entropy"
    1. **Average surprise** per observation.
    2. **Uncertainty** before observing: how unpredictable $X$ is.
    3. **Description length:** the minimum average number of bits needed to encode outcomes of $X$, proved in [Compression and coding](coding.md).
        - A biased coin with $H = 0.469$ can be compressed to about 0.47 bits per flip, by encoding long runs cleverly.

## 3. Bounds on entropy

!!! theorem "Theorem"
    For $X$ taking $n$ possible values:

    $$
    0\leq H(X)\leq\log n,
    $$

    with $H = 0$ iff $X$ is deterministic, and $H = \log n$ iff $X$ is uniform.

!!! proof "Proof"
    **Lower bound:** each term $p\log\frac1p\geq0$, since $p\leq1$. It's 0 iff every $p(x)\in\{0, 1\}$.

    **Upper bound (Jensen):** $\log$ is concave, so

    $$
    H(X) = \E\left[\log\frac{1}{p(X)}\right]\leq\log\E\left[\frac{1}{p(X)}\right] = \log\sum_{x : p(x) > 0}p(x)\frac{1}{p(x)} \leq \log n.
    $$

    Equality in Jensen (strictly concave $\log$) requires $\frac{1}{p(X)}$ to be constant: all outcomes equally likely.

The uniform distribution is the most uncertain, as we also found with [Lagrange multipliers](../multivariable/lagrange.md#4-maximum-entropy-why-the-uniform-distribution).

## 4. Joint and conditional entropy

!!! definition "Definitions"
    - **Joint entropy:** $H(X, Y) = -\sum_{x,y}p(x,y)\log p(x,y)$, the uncertainty of the pair.
    - **Conditional entropy:** the remaining uncertainty about $Y$ once $X$ is known, averaged over $X$:

    $$
    H(Y\mid X) = \sum_xp(x)\,H(Y\mid X = x) = -\sum_{x,y}p(x,y)\log p(y\mid x).
    $$

!!! theorem "Chain rule for entropy"
    $$
    H(X, Y) = H(X) + H(Y\mid X).
    $$

!!! proof "Proof"
    1. $\log p(x, y) = \log p(x) + \log p(y\mid x)$.
    2. Multiply by $-p(x, y)$ and sum over $x, y$.
    3. The first term gives $-\sum_xp(x)\log p(x) = H(X)$ (summing out $y$), and the second gives $H(Y\mid X)$.

The uncertainty of the pair = uncertainty of $X$ + remaining uncertainty of $Y$ given $X$.

In general,

$$
H(X_1, \ldots, X_n) = \sum_iH(X_i\mid X_1, \ldots, X_{i-1}),
$$

the information-theoretic twin of the probability chain rule that [language models](../probability/foundations.md#2-conditional-probability) use.

!!! theorem "Conditioning reduces entropy (on average)"
    $H(Y\mid X)\leq H(Y)$, with equality iff $X$ and $Y$ are independent. Consequently $H(X, Y)\leq H(X) + H(Y)$.

The proof: the gap $H(Y) - H(Y\mid X)$ is the mutual information, which is a KL divergence and therefore non-negative ([next lesson](kl-divergence.md)).

Knowing something can't, on average, make you more uncertain. (A *particular* observation can increase uncertainty, e.g. a surprising test result, but not on average.)

## 5. Differential entropy (continuous variables)

For a density $f$:

$$
h(X) = -\int f(x)\log f(x)\,dx.
$$

It behaves somewhat differently from discrete entropy:

- it can be negative (a uniform density on $[0, \frac12]$ has $h = \log\frac12 < 0$);
- it changes under rescaling.

But differences of differential entropies, and the KL divergence, behave just like their discrete counterparts.

!!! theorem "The Gaussian maximizes entropy"
    Among all densities with variance $\sigma^2$, the Gaussian has the largest differential entropy:

    | Case | Entropy |
    |---|---|
    | 1D, variance $\sigma^2$ | $h = \frac12\log(2\pi e\sigma^2)$ |
    | multivariate, covariance $\Sigma$ | $h = \frac12\log\det(2\pi e\Sigma)$ |

Proof sketch:

- Apply [Gibbs' inequality](kl-divergence.md) to $\KL(f\,\|\,\varphi)\geq0$, where $\varphi$ is the Gaussian with the same variance.
- The cross term $-\int f\log\varphi$ depends only on the variance, so it equals the Gaussian's own entropy.

This is one more reason Gaussians are the default "least-assumption" model for continuous noise.

!!! ml "Where this shows up"
    - **Classification confidence:** the entropy of a model's predictive distribution measures its uncertainty.
        - Used in active learning (label the examples with highest entropy) and out-of-distribution detection.
    - **Entropy regularization** in reinforcement learning (soft actor-critic, PPO's entropy bonus) keeps policies exploratory.
    - **Decision trees** split on the feature that most reduces label entropy (information gain = mutual information).
    - **Temperature sampling** in LLMs raises or lowers the entropy of the next-token distribution.

## Check yourself

**1.** Compute the entropy of the distribution $(\frac12, \frac14, \frac18, \frac18)$.

??? success "Solution"
    $\frac12\cdot1 + \frac14\cdot2 + \frac18\cdot3 + \frac18\cdot3 = 1.75$ bits.

    (Less than $\log_24 = 2$, since the distribution isn't uniform.)

**2.** A source emits letters A, B, C, D with the probabilities in exercise 1. Design a binary code with average length exactly 1.75 bits.

??? success "Solution"
    | Letter | Probability | Code |
    |---|---|---|
    | A | $\frac12$ | `0` |
    | B | $\frac14$ | `10` |
    | C | $\frac18$ | `110` |
    | D | $\frac18$ | `111` |

    Average length: $\frac12\cdot1 + \frac14\cdot2 + \frac18\cdot3\cdot2 = 1.75$. Each code length equals $\log_2\frac1p$.

**3.** $X$ is a fair die roll and $Y = X\bmod2$ (its parity). Find $H(X)$, $H(Y)$, $H(X\mid Y)$, $H(Y\mid X)$.

??? success "Solution"
    | Quantity | Value |
    |---|---|
    | $H(X)$ | $\log_26\approx2.585$ |
    | $H(Y)$ | $1$ |
    | $H(Y\mid X)$ | $0$ ($Y$ is determined by $X$) |
    | $H(X\mid Y)$ | $\log_23\approx1.585$ |

    For the last one, use the chain rule both ways: $H(X, Y) = H(X) + 0 = H(Y) + H(X\mid Y)$, so $H(X\mid Y) = \log_26 - 1 = \log_23$.

    That matches intuition: given the parity, 3 equally likely values remain.

**4.** Show that $H(X, Y) = H(X) + H(Y)$ when $X$ and $Y$ are independent.

??? success "Solution"
    $p(x,y) = p(x)p(y)$, so $\log p(x,y) = \log p(x) + \log p(y)$.

    Take $-\E$ of both sides.

**5.** What's the entropy (in bits) of a uniformly random 8-character password from 62 symbols?

??? success "Solution"
    $8\log_262\approx8\times5.954\approx47.6$ bits.

**6.** Compute $h(X)$ for $X$ uniform on $[0, a]$. When is it negative?

??? success "Solution"
    $h = -\int_0^a\frac1a\log\frac1a\,dx = \log a$.

    It's negative when $a < 1$.
