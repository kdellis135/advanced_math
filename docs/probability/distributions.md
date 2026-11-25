---
description: "The probability distributions that matter most: Bernoulli, binomial, geometric, Poisson, uniform, exponential and Gaussian, with means, variances and an interactive explorer."
---

# The distribution zoo

<div class="lesson-meta" markdown>
**Phase 5 · Lesson 4** · ⏱ ~3 hours · Needs: [Random variables and expectation](random-variables.md), [Counting](counting.md)
</div>

A handful of distributions cover most of practice.

The way to remember them is through the **story** that produces each one, not the formula. From the story you can re-derive the formula, and you'll know when to use it.

<div class="viz" data-viz="distributions"></div>

## 1. Discrete distributions

### Bernoulli: one yes/no trial

$X = 1$ with probability $p$, else $0$.

- $\E X = p$
- $\Var X = p(1-p)$ (since $X^2 = X$, $\E X^2 = p$)

It's the building block of everything below. Variance is largest at $p = \frac12$, where the outcome is least predictable.

### Binomial: number of successes in $n$ independent trials

$$
P(X = k) = \binom nk p^k(1-p)^{n-k}, \qquad k = 0, \ldots, n.
$$

**Story → formula:**

- any particular sequence with $k$ successes has probability $p^k(1-p)^{n-k}$;
- there are $\binom nk$ such sequences.

!!! example "Example: 3 free throws, each made with probability 0.7"
    The sequences with exactly 2 makes (S = success, F = failure):

    | Sequence | Probability |
    |---|---|
    | SSF | $0.7 \cdot 0.7 \cdot 0.3 = 0.147$ |
    | SFS | $0.7 \cdot 0.3 \cdot 0.7 = 0.147$ |
    | FSS | $0.3 \cdot 0.7 \cdot 0.7 = 0.147$ |

    Each has two 0.7's and one 0.3 (independence lets us multiply), so they're all equal. There are $\binom32 = 3$ of them. So $P(X = 2) = 3 \times 0.147 = 0.441$.

    The full PMF:

    | $k$ | 0 | 1 | 2 | 3 |
    |---|---|---|---|---|
    | $P(X = k)$ | $0.027$ | $0.189$ | $0.441$ | $0.343$ |

    These sum to 1, as they must: by the [binomial theorem](counting.md#3-combinations-and-binomial-coefficients), $\sum_k\binom nk p^k(1-p)^{n-k} = (p + (1 - p))^n = 1$.

$X = \sum_{i=1}^nB_i$ with $B_i$ independent Bernoulli, so:

- $\E X = np$;
- $\Var X = np(1-p)$ (variances of independent variables add).

### Geometric: number of trials until the first success

$$
P(X = k) = (1-p)^{k-1}p, \qquad k = 1, 2, \ldots; \qquad \E X = \frac1p, \quad \Var X = \frac{1-p}{p^2}.
$$

(First $k - 1$ failures, then a success.)

Example: rolling a die until the first 6 ($p = \frac16$). The chance the first 6 comes on roll 3 is $\left(\frac56\right)^2\frac16 \approx 0.116$. On average it takes $\frac{1}{1/6} = 6$ rolls (exercise 5 of the [previous lesson](random-variables.md) derived this with the law of total expectation).

The geometric distribution is **memoryless**: $P(X > m + k\mid X > m) = P(X > k)$.

Past failures don't make success "due." This is the gambler's fallacy, refuted.

### Poisson: counts of rare events

The number of emails per hour, typos per page, decays per second:

$$
P(X = k) = e^{-\lambda}\frac{\lambda^k}{k!}, \qquad k = 0, 1, 2, \ldots; \qquad \E X = \Var X = \lambda.
$$

Here $\lambda$ is the average count. For a help desk that gets $\lambda = 3$ calls per hour on average:

| $k$ calls | 0 | 1 | 2 | 3 | 4 | 5 | 6+ |
|---|---|---|---|---|---|---|---|
| $P(X = k)$ | $0.050$ | $0.149$ | $0.224$ | $0.224$ | $0.168$ | $0.101$ | $0.084$ |

(For example, $P(2) = e^{-3}\frac{9}{2} \approx 0.0498 \times 4.5 = 0.224$.)

Why the probabilities sum to 1: $\sum_k\frac{\lambda^k}{k!} = e^\lambda$ is the [exponential series](../calculus/series-taylor.md#the-essential-series), and the $e^{-\lambda}$ in front cancels it.

!!! theorem "Poisson as a limit of binomials"
    If $n\to\infty$ and $p\to0$ with $np = \lambda$ fixed, then $\text{Binomial}(n, p)\to\text{Poisson}(\lambda)$.

!!! proof "Proof"
    $$
    \binom nk p^k(1-p)^{n-k} = \underbrace{\frac{n(n-1)\cdots(n-k+1)}{n^k}}_{\to1}\cdot\frac{\lambda^k}{k!}\cdot\underbrace{\left(1 - \frac\lambda n\right)^n}_{\to e^{-\lambda}}\cdot\underbrace{\left(1 - \frac\lambda n\right)^{-k}}_{\to1}.
    $$

    Where this comes from: substitute $p = \frac{\lambda}{n}$, write $\binom nk = \frac{n(n-1)\cdots(n-k+1)}{k!}$, and regroup. Then each factor's limit:

    - $\frac{n(n-1)\cdots(n-k+1)}{n^k} = 1 \cdot \left(1 - \frac1n\right)\cdots\left(1 - \frac{k-1}{n}\right)$. For fixed $k$, each of these $k$ factors tends to 1.
    - $\left(1 - \frac\lambda n\right)^n \to e^{-\lambda}$: the compound-interest limit $\left(1 + \frac xn\right)^n \to e^x$ from [Phase 1](../foundations/exp-log-trig.md#2-the-number-e), with $x = -\lambda$.
    - $\left(1 - \frac\lambda n\right)^{-k} \to 1^{-k} = 1$, since $k$ is fixed.

    The story: split an hour into $n$ tiny intervals, each with a tiny chance $\lambda/n$ of an event.

So Poisson is the right model whenever there are **many independent opportunities, each with a small chance**: many emails that *could* arrive, many atoms that *could* decay.

### Categorical and multinomial

- **Categorical:** one draw from $K$ outcomes with probabilities $p_1, \ldots, p_K$. A die, a classifier's prediction, or the next token of a language model.
- **Multinomial:** counts of each outcome in $n$ draws:

$$
P(k_1, \ldots, k_K) = \binom{n}{k_1, \ldots, k_K}p_1^{k_1}\cdots p_K^{k_K}.
$$

## 2. Continuous distributions

### Uniform on $[a, b]$

Density $\frac{1}{b - a}$ on the interval.

- $\E X = \frac{a+b}2$
- $\Var X = \frac{(b-a)^2}{12}$

(The density is $\frac{1}{b - a}$ so that the rectangle of width $b - a$ has area 1. For $[0, 1]$: $\E X = \frac12$, $\ \E X^2 = \int_0^1 x^2\,dx = \frac13$, so $\Var X = \frac13 - \frac14 = \frac{1}{12}$.)

Every computer random number generator starts from uniform samples and transforms them into other distributions.

### Exponential: waiting time for a Poisson event

$$
f(x) = \lambda e^{-\lambda x}, \quad x\geq0; \qquad P(X > x) = e^{-\lambda x}; \qquad \E X = \frac1\lambda, \quad \Var X = \frac{1}{\lambda^2}.
$$

It's the continuous analog of the geometric, and also **memoryless**:

$$
P(X > s + t\mid X > s) = \frac{e^{-\lambda(s+t)}}{e^{-\lambda s}} = e^{-\lambda t} = P(X > t).
$$

A component that fails at a constant rate is "as good as new" at every moment.

Example: light bulbs with an average life of 1000 hours, so $\lambda = \frac{1}{1000}$ per hour. The chance a bulb lasts over 2000 hours is $e^{-2000/1000} = e^{-2} \approx 13.5\%$. And a bulb that has already lasted 5000 hours still has that same 13.5% chance of lasting 2000 more.

($\lambda$ here is a rate: events per unit time. If calls arrive as Poisson with $\lambda = 3$ per hour, the waits between calls are exponential with mean $\frac13$ hour.)

### Normal (Gaussian)

$$
f(x) = \frac{1}{\sqrt{2\pi}\,\sigma}\exp\!\left(-\frac{(x - \mu)^2}{2\sigma^2}\right), \qquad X\sim\mathcal N(\mu, \sigma^2).
$$

- $\E X = \mu$ (by symmetry).
- $\Var X = \sigma^2$ (integration by parts, [Multiple integrals](../multivariable/integrals.md) exercise 4).
- The $\frac{1}{\sqrt{2\pi}\sigma}$ comes from the [Gaussian integral](../multivariable/integrals.md#3-the-gaussian-integral).
- **Standardizing:** $Z = \frac{X - \mu}{\sigma}\sim\mathcal N(0, 1)$.
- **The 68–95–99.7 rule:**

    | Within | Probability |
    |---|---|
    | $\pm1\sigma$ | about 68% |
    | $\pm2\sigma$ | about 95% |
    | $\pm3\sigma$ | about 99.7% |

- **Closed under linear combinations:** if $X, Y$ are independent normals, $aX + bY$ is normal, with mean $a\mu_X + b\mu_Y$ and variance $a^2\sigma_X^2 + b^2\sigma_Y^2$.

**Reading the formula.** The exponent $-\frac{(x - \mu)^2}{2\sigma^2}$ is $0$ at $x = \mu$ (the peak) and becomes more negative the farther $x$ is from $\mu$, measured in units of $\sigma$. So the curve is a symmetric bell centered at $\mu$, whose width is set by $\sigma$. Its steepest points (inflection points) are at $\mu \pm \sigma$.

**Computing normal probabilities.** There's no formula for $\int e^{-x^2/2}$, so we standardize and use a table (or software) for the standard normal CDF, written $\Phi(z) = P(Z \leq z)$.

!!! example "Example: exam scores $\sim\mathcal N(70, 10^2)$. What fraction score between 60 and 85?"
    1. Standardize both endpoints: $z = \frac{60 - 70}{10} = -1$ and $z = \frac{85 - 70}{10} = 1.5$.
    2. $P(-1 \leq Z \leq 1.5) = \Phi(1.5) - \Phi(-1) \approx 0.933 - 0.159 = 0.774$.

    About 77%. The key move is step 1: every normal question becomes a question about $\mathcal N(0, 1)$.

!!! intuition "Why the Gaussian is everywhere"
    1. **The central limit theorem:** sums of many small independent effects are approximately normal, whatever the individual distributions ([Limit theorems](limit-theorems.md)).
        - Measurement errors, heights and test scores are such sums.
    2. **Maximum entropy:** among all distributions with a given mean and variance, the Gaussian has the most entropy, so it assumes the least ([Lagrange multipliers](../multivariable/lagrange.md#4-maximum-entropy-why-the-uniform-distribution)).
    3. **Mathematical convenience:**
        - it's closed under sums, conditioning and marginalizing;
        - its log is a quadratic, so maximizing Gaussian likelihood is least squares.

### Beta: a distribution over probabilities

$$
f(\theta) = \frac{\theta^{\alpha-1}(1-\theta)^{\beta - 1}}{B(\alpha, \beta)}, \quad 0 \leq \theta\leq 1; \qquad \E\theta = \frac{\alpha}{\alpha + \beta}.
$$

Used as a prior belief about an unknown probability (a coin's bias, a conversion rate).

- $\text{Beta}(1,1)$ is uniform.
- Larger $\alpha + \beta$ means more concentrated, as if you had already seen $\alpha - 1$ successes and $\beta - 1$ failures.

| Parameters | Shape | Belief it expresses |
|---|---|---|
| $\text{Beta}(1, 1)$ | flat | "any bias is equally plausible" |
| $\text{Beta}(2, 2)$ | gentle hump at $\frac12$ | "probably near fair, but unsure" |
| $\text{Beta}(20, 20)$ | sharp spike at $\frac12$ | "very confident it's near fair" |
| $\text{Beta}(8, 2)$ | hump near $0.8$ | "probably biased toward heads" |

$B(\alpha, \beta)$ in the denominator is just the constant that makes the area 1.

See [Estimation](../statistics/estimation.md).

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

**Which one fits?** Ask what the quantity *is*:

| The quantity is… | Use |
|---|---|
| yes/no, once | Bernoulli |
| how many yeses in a fixed number of tries | Binomial |
| how many tries until the first yes | Geometric |
| how many events in a fixed time or space, with no fixed upper limit | Poisson |
| which of $K$ categories | Categorical |
| a waiting time with a constant rate | Exponential |
| a sum or average of many small independent effects | Normal |
| an unknown probability you're uncertain about | Beta |

!!! ml "Where this shows up"
    - **Output layers choose a distribution:**

        | Output | Distribution |
        |---|---|
        | sigmoid | Bernoulli |
        | softmax | categorical |
        | regression with squared loss | Gaussian mean |
        | Poisson regression | Poisson counts |

        The loss is the negative log-likelihood of that distribution ([Estimation](../statistics/estimation.md)).
    - **Sampling a language model** is drawing from a categorical distribution at each step, with temperature reshaping the probabilities.
    - **Weight initialization** draws from Gaussians or uniforms with carefully chosen variance (Xavier, He).
    - **Diffusion models** add Gaussian noise step by step, and learn to remove it.
    - **Dropout** multiplies activations by Bernoulli masks.

## Check yourself

**1.** A fair coin is flipped 10 times. Find $P(\text{exactly } 5\text{ heads})$ and $P(\text{at least } 9)$.

??? success "Solution"
    - Exactly 5: $\binom{10}5/2^{10} = 252/1024 \approx 0.246$.
    - At least 9: $(\binom{10}9 + \binom{10}{10})/1024 = 11/1024 \approx 0.0107$.

**2.** Typos occur at an average rate of 2 per page. What's the probability a page has no typos? At most 2?

??? success "Solution"
    Poisson(2):

    - $P(0) = e^{-2} \approx 0.135$
    - $P(\leq2) = e^{-2}(1 + 2 + 2) = 5e^{-2}\approx0.677$

**3.** Prove $\E X = 1/\lambda$ for the exponential distribution.

??? success "Solution"
    $\E X = \int_0^\infty x\lambda e^{-\lambda x}dx$. By parts:

    $$
    \big[-xe^{-\lambda x}\big]_0^\infty + \int_0^\infty e^{-\lambda x}dx = 0 + \frac1\lambda.
    $$

**4.** Heights are $\mathcal N(170, 10^2)$ cm. Roughly what fraction of people are taller than 190 cm?

??? success "Solution"
    - 190 is 2 standard deviations above the mean.
    - 95% lie within $\pm2\sigma$, so about 2.5% are above. (Exact: 2.28%.)

**5.** Show that the geometric distribution is memoryless: $P(X > m + k\mid X > m) = P(X > k)$.

??? success "Solution"
    $P(X > j) = (1-p)^j$: the first $j$ trials all fail.

    So the ratio is $\frac{(1-p)^{m+k}}{(1-p)^m} = (1-p)^k$.

**6.** If $X\sim\mathcal N(0, 1)$, what is the distribution of $3X + 2$? Of $X_1 + X_2$ for two independent copies?

??? success "Solution"
    - $3X + 2 \sim \mathcal N(2, 9)$.
    - $X_1 + X_2 \sim \mathcal N(0, 2)$, so the standard deviation is $\sqrt2$, not 2.

    Independent noises add in variance, not in standard deviation.
