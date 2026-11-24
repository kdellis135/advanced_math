# The distribution zoo

<div class="lesson-meta" markdown>
**Phase 5 · Lesson 4** · ⏱ ~3 hours · Needs: [Random variables and expectation](random-variables.md), [Counting](counting.md)
</div>

A handful of distributions cover most of practice. The way to remember them is through the **story** that produces each one, not the formula. From the story you can re-derive the formula, and you'll know when to use it.

<div class="viz" data-viz="distributions"></div>

## 1. Discrete distributions

### Bernoulli: one yes/no trial

$X = 1$ with probability $p$, else $0$. $\E X = p$, $\Var X = p(1-p)$ (since $X^2 = X$, $\E X^2 = p$). The building block of everything below. Variance is largest at $p = \frac12$, where the outcome is least predictable.

### Binomial: number of successes in $n$ independent trials

$$
P(X = k) = \binom nk p^k(1-p)^{n-k}, \qquad k = 0, \ldots, n.
$$

**Story → formula:** any particular sequence with $k$ successes has probability $p^k(1-p)^{n-k}$, and there are $\binom nk$ such sequences.

$X = \sum_{i=1}^nB_i$ with $B_i$ independent Bernoulli, so $\E X = np$ and $\Var X = np(1-p)$ (variances of independent variables add).

### Geometric: number of trials until the first success

$$
P(X = k) = (1-p)^{k-1}p, \qquad k = 1, 2, \ldots; \qquad \E X = \frac1p, \quad \Var X = \frac{1-p}{p^2}.
$$

(First $k - 1$ failures, then a success.) The geometric distribution is **memoryless**: $P(X > m + k\mid X > m) = P(X > k)$. Past failures don't make success "due." This is the gambler's fallacy, refuted.

### Poisson: counts of rare events

The number of emails per hour, typos per page, decays per second:

$$
P(X = k) = e^{-\lambda}\frac{\lambda^k}{k!}, \qquad k = 0, 1, 2, \ldots; \qquad \E X = \Var X = \lambda.
$$

!!! theorem "Poisson as a limit of binomials"
    If $n\to\infty$ and $p\to0$ with $np = \lambda$ fixed, then $\text{Binomial}(n, p)\to\text{Poisson}(\lambda)$.

!!! proof "Proof"
    $$
    \binom nk p^k(1-p)^{n-k} = \underbrace{\frac{n(n-1)\cdots(n-k+1)}{n^k}}_{\to1}\cdot\frac{\lambda^k}{k!}\cdot\underbrace{\left(1 - \frac\lambda n\right)^n}_{\to e^{-\lambda}}\cdot\underbrace{\left(1 - \frac\lambda n\right)^{-k}}_{\to1}.
    $$

    The story: split an hour into $n$ tiny intervals, each with a tiny chance $\lambda/n$ of an event.

### Categorical and multinomial

**Categorical:** one draw from $K$ outcomes with probabilities $p_1, \ldots, p_K$. A die, or a classifier's prediction, or the next token of a language model. **Multinomial:** counts of each outcome in $n$ draws, $P(k_1, \ldots, k_K) = \binom{n}{k_1, \ldots, k_K}p_1^{k_1}\cdots p_K^{k_K}$.

## 2. Continuous distributions

### Uniform on $[a, b]$

Density $\frac{1}{b - a}$ on the interval. $\E X = \frac{a+b}2$, $\Var X = \frac{(b-a)^2}{12}$. Every computer random number generator starts from uniform samples and transforms them into other distributions.

### Exponential: waiting time for a Poisson event

$$
f(x) = \lambda e^{-\lambda x}, \quad x\geq0; \qquad P(X > x) = e^{-\lambda x}; \qquad \E X = \frac1\lambda, \quad \Var X = \frac{1}{\lambda^2}.
$$

The continuous analog of the geometric, and also **memoryless**:

$$
P(X > s + t\mid X > s) = \frac{e^{-\lambda(s+t)}}{e^{-\lambda s}} = e^{-\lambda t} = P(X > t).
$$

A component that fails at a constant rate is "as good as new" at every moment.

### Normal (Gaussian)

$$
f(x) = \frac{1}{\sqrt{2\pi}\,\sigma}\exp\!\left(-\frac{(x - \mu)^2}{2\sigma^2}\right), \qquad X\sim\mathcal N(\mu, \sigma^2).
$$

- $\E X = \mu$ (by symmetry), $\Var X = \sigma^2$ (integration by parts, [Multiple integrals](../multivariable/integrals.md) exercise 4). The $\frac{1}{\sqrt{2\pi}\sigma}$ comes from the [Gaussian integral](../multivariable/integrals.md#3-the-gaussian-integral).
- **Standardizing:** $Z = \frac{X - \mu}{\sigma}\sim\mathcal N(0, 1)$.
- **The 68–95–99.7 rule:** the probability of landing within 1, 2, 3 standard deviations of the mean is about 68%, 95% and 99.7%.
- **Closed under linear combinations:** if $X, Y$ are independent normals, $aX + bY$ is normal with mean $a\mu_X + b\mu_Y$ and variance $a^2\sigma_X^2 + b^2\sigma_Y^2$.

!!! intuition "Why the Gaussian is everywhere"
    1. **The central limit theorem:** sums of many small independent effects are approximately normal, whatever the individual distributions ([Limit theorems](limit-theorems.md)). Measurement errors, heights and test scores are such sums.
    2. **Maximum entropy:** among all distributions with a given mean and variance, the Gaussian has the most entropy, so it assumes the least ([Lagrange multipliers](../multivariable/lagrange.md#4-maximum-entropy-why-the-uniform-distribution)).
    3. **Mathematical convenience:** it's closed under sums, conditioning and marginalizing, and its log is a quadratic, so maximizing Gaussian likelihood is least squares.

### Beta: a distribution over probabilities

$$
f(\theta) = \frac{\theta^{\alpha-1}(1-\theta)^{\beta - 1}}{B(\alpha, \beta)}, \quad 0 \leq \theta\leq 1; \qquad \E\theta = \frac{\alpha}{\alpha + \beta}.
$$

Used as a prior belief about an unknown probability (a coin's bias, a conversion rate). $\text{Beta}(1,1)$ is uniform. Larger $\alpha + \beta$ means more concentrated, as if you had already seen $\alpha - 1$ successes and $\beta - 1$ failures. See [Estimation](../statistics/estimation.md).

## 3. Summary table

| Distribution | Story | Mean | Variance |
|---|---|---|---|
| Bernoulli$(p)$ | one trial | $p$ | $p(1-p)$ |
| Binomial$(n,p)$ | successes in $n$ trials | $np$ | $np(1-p)$ |
| Geometric$(p)$ | trials until first success | $1/p$ | $(1-p)/p^2$ |
| Poisson$(\lambda)$ | count of rare events | $\lambda$ | $\lambda$ |
| Uniform$(a,b)$ | "no preference" | $(a+b)/2$ | $(b-a)^2/12$ |
| Exponential$(\lambda)$ | waiting time | $1/\lambda$ | $1/\lambda^2$ |
| Normal$(\mu,\sigma^2)$ | sum of many small effects | $\mu$ | $\sigma^2$ |
| Beta$(\alpha,\beta)$ | belief about a probability | $\frac{\alpha}{\alpha+\beta}$ | $\frac{\alpha\beta}{(\alpha+\beta)^2(\alpha+\beta+1)}$ |

!!! ml "Where this shows up"
    - **Output layers choose a distribution:** a sigmoid output is a Bernoulli, softmax is a categorical, a regression output with squared loss is a Gaussian mean, and Poisson regression models counts. The loss is the negative log-likelihood of that distribution ([Estimation](../statistics/estimation.md)).
    - **Sampling a language model** is drawing from a categorical distribution at each step, with temperature reshaping the probabilities.
    - **Weight initialization** draws from Gaussians or uniforms with carefully chosen variance (Xavier, He).
    - **Diffusion models** add Gaussian noise step by step, and learn to remove it.
    - **Dropout** multiplies activations by Bernoulli masks.

## Check yourself

**1.** A fair coin is flipped 10 times. Find $P(\text{exactly } 5\text{ heads})$ and $P(\text{at least } 9)$.

??? success "Solution"
    $\binom{10}5/2^{10} = 252/1024 \approx 0.246$. $(\binom{10}9 + \binom{10}{10})/1024 = 11/1024 \approx 0.0107$.

**2.** Typos occur at an average rate of 2 per page. What's the probability a page has no typos? At most 2?

??? success "Solution"
    Poisson(2): $P(0) = e^{-2} \approx 0.135$. $P(\leq2) = e^{-2}(1 + 2 + 2) = 5e^{-2}\approx0.677$.

**3.** Prove $\E X = 1/\lambda$ for the exponential distribution.

??? success "Solution"
    $\int_0^\infty x\lambda e^{-\lambda x}dx$. Parts: $\big[-xe^{-\lambda x}\big]_0^\infty + \int_0^\infty e^{-\lambda x}dx = 0 + \frac1\lambda$.

**4.** Heights are $\mathcal N(170, 10^2)$ cm. Roughly what fraction of people are taller than 190 cm?

??? success "Solution"
    190 is 2 standard deviations above the mean. 95% lie within $\pm2\sigma$, so about 2.5% are above. (Exact: 2.28%.)

**5.** Show that the geometric distribution is memoryless: $P(X > m + k\mid X > m) = P(X > k)$.

??? success "Solution"
    $P(X > j) = (1-p)^j$ (the first $j$ trials all fail). So the ratio is $\frac{(1-p)^{m+k}}{(1-p)^m} = (1-p)^k$.

**6.** If $X\sim\mathcal N(0, 1)$, what is the distribution of $3X + 2$? Of $X_1 + X_2$ for two independent copies?

??? success "Solution"
    $\mathcal N(2, 9)$. $\mathcal N(0, 2)$, so the standard deviation is $\sqrt2$, not 2. Independent noises add in variance, not in standard deviation.
