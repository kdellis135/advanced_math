---
description: "Random variables, expectation, linearity of expectation, variance, and expected loss: the quantity every machine learning model is trained to minimize."
---

# Random variables and expectation

<div class="lesson-meta" markdown>
**Phase 5 · Lesson 3** · ⏱ ~3 hours · Needs: [Probability, conditioning and Bayes](foundations.md), [Integrals](../calculus/integrals.md)
</div>

A random variable attaches a number to each outcome: the number of heads, a measurement, a model's loss on a random example.

- Its **expectation** is its long-run average.
- **Linearity of expectation** is the single most useful tool in probability. It makes hard counting problems easy, and holds even when variables are dependent.

## 1. Random variables

!!! definition "Definition: random variable"
    A **random variable** is a function $X : \Omega\to\R$ that assigns a number to each outcome. We write $P(X = x)$ for $P(\{\omega : X(\omega) = x\})$.

The name is misleading: it's neither random nor a variable. It's a function.

The randomness is in which $\omega$ occurs.

!!! example "Example: a random variable, spelled out"
    Flip two fair coins. $\Omega = \{HH, HT, TH, TT\}$, each with probability $\frac14$. Let $X$ = number of heads:

    | Outcome $\omega$ | $HH$ | $HT$ | $TH$ | $TT$ |
    |---|---|---|---|---|
    | $X(\omega)$ | 2 | 1 | 1 | 0 |

    Group outcomes by the value of $X$:

    | $x$ | outcomes with $X = x$ | $P(X = x)$ |
    |---|---|---|
    | 0 | $TT$ | $\frac14$ |
    | 1 | $HT$, $TH$ | $\frac12$ |
    | 2 | $HH$ | $\frac14$ |

    That second table is the **distribution** of $X$. Once you have it, you can usually forget $\Omega$ entirely.

    Several random variables can live on the same $\Omega$: $Y$ = "1 if the first coin is heads, else 0" is another function on the same four outcomes.

### Discrete: the PMF

If $X$ takes countably many values, its **probability mass function** is $p(x) = P(X = x)$, with $p(x)\geq0$ and $\sum_xp(x) = 1$.

For the sum $S$ of two dice, counting cells in the $6\times6$ grid:

| $s$ | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| $p(s) \times 36$ | 1 | 2 | 3 | 4 | 5 | 6 | 5 | 4 | 3 | 2 | 1 |

A triangle-shaped PMF: 7 is the most likely sum, with 6 of the 36 cells. The entries add to 36, so the probabilities add to 1.

### Continuous: the PDF

A continuous $X$ has a **probability density function** $f$ with

$$
P(a \leq X \leq b) = \int_a^bf(x)\,dx, \qquad f(x)\geq0, \qquad \int_{-\infty}^\infty f(x)\,dx = 1.
$$

**Probability is area under the density curve.** Think of a histogram of many measurements, with bars scaled so their total area is 1. As you take more data and narrower bars, the histogram's outline smooths into the density.

Example: $X$ uniform on $[0, 1]$ has $f(x) = 1$ there (and 0 elsewhere). Then $P(0.2 \leq X \leq 0.5) = \int_{0.2}^{0.5}1\,dx = 0.3$, the width of the interval.

!!! warning "A density is not a probability"
    - $f(x)$ can exceed 1: uniform on $[0, \frac12]$ has $f = 2$.
    - What's a probability is *area*: $P(x \leq X \leq x + dx) \approx f(x)\,dx$.
    - For continuous $X$, $P(X = x) = 0$ for every single point.

### The CDF: works for both

The **cumulative distribution function** $F(x) = P(X \leq x)$ increases from 0 to 1.

- For continuous $X$, $F' = f$ (by the [fundamental theorem of calculus](../calculus/integrals.md#2-the-fundamental-theorem-of-calculus)).
- $P(a < X \leq b) = F(b) - F(a)$.

| Random variable | CDF $F(x) = P(X \leq x)$ | Shape |
|---|---|---|
| fair die | $0$ below 1, $\frac16$ on $[1, 2)$, $\frac26$ on $[2, 3)$, …, $1$ from 6 on | a staircase: jumps of $\frac16$ at each face |
| uniform on $[0, 1]$ | $0$ for $x < 0$, $\ x$ for $0 \leq x \leq 1$, $\ 1$ for $x > 1$ | a ramp |
| exponential, $f(x) = e^{-x}$ on $x \geq 0$ | $1 - e^{-x}$ for $x \geq 0$ | rises quickly, then levels off at 1 |

The exponential row, computed: $F(x) = \int_0^x e^{-t}\,dt = \big[-e^{-t}\big]_0^x = 1 - e^{-x}$. And differentiating gives back $f(x) = e^{-x}$.

Discrete CDFs jump, by $P(X = x)$ at each value $x$. Continuous CDFs rise smoothly, with slope $f(x)$.

## 2. Expectation

!!! definition "Definition: expectation"
    $$
    \E[X] = \sum_x x\,p(x) \quad\text{(discrete)}, \qquad \E[X] = \int_{-\infty}^\infty x\,f(x)\,dx \quad\text{(continuous)}.
    $$

It's the **probability-weighted average** of the values:

- the center of mass of the distribution;
- the long-run average of many independent samples (by the law of large numbers, coming up in [Limit theorems](limit-theorems.md)).

!!! example "Example"
    A fair die: $\E[X] = \frac{1 + 2 + \cdots + 6}{6} = 3.5$.

    Note that the "expected value" may be impossible as an actual outcome.

!!! example "Example: when the outcomes aren't equally likely"
    A raffle ticket wins 10 dollars with probability $0.1$ and nothing otherwise. It costs 1 dollar. Your net gain $X$ is $+9$ (prob $0.1$) or $-1$ (prob $0.9$):

    $$
    \E[X] = 9(0.1) + (-1)(0.9) = 0.9 - 0.9 = 0.
    $$

    A fair game: on average you break even. Each value is weighted by how often it happens, so the rare big win and the common small loss balance.

!!! example "Example: a continuous expectation"
    $X$ uniform on $[0, 1]$: $\ \E[X] = \int_0^1 x \cdot 1\,dx = \frac12$, the midpoint, as symmetry suggests.

    The integral $\int x f(x)\,dx$ is the continuous version of $\sum x\,p(x)$: each value $x$ weighted by its probability $f(x)\,dx$.

!!! theorem "LOTUS (law of the unconscious statistician)"
    $$
    \E[g(X)] = \sum_xg(x)\,p(x) \qquad\text{or}\qquad \int g(x)f(x)\,dx.
    $$

You don't need the distribution of $g(X)$. Just weight $g$'s values by the probabilities of $X$.

(Discrete proof: group the outcomes by the value of $g(x)$.)

For a fair die, $\E[X^2] = \frac{1 + 4 + 9 + 16 + 25 + 36}{6} = \frac{91}{6} \approx 15.17$.

!!! warning "$\E[g(X)] \neq g(\E[X])$ in general"
    $\E[X^2] \approx 15.17$, but $(\E X)^2 = 3.5^2 = 12.25$. You can't move a nonlinear function in or out of an expectation.

    It does work for linear functions: $\E[aX + b] = a\E[X] + b$. That's the next section. (And for convex $g$ there's an inequality, Jensen's, in [Phase 7](../optimization/convexity.md).)

## 3. Linearity of expectation

!!! theorem "Linearity of expectation"
    For any random variables $X, Y$ (on the same space) and constants $a, b$:

    $$
    \E[aX + bY] = a\E[X] + b\E[Y].
    $$

    **No independence needed.**

!!! proof "Proof (discrete)"
    Sum over outcomes:

    $$
    \E[aX + bY] = \sum_\omega(aX(\omega) + bY(\omega))P(\omega) = a\sum_\omega X(\omega)P(\omega) + b\sum_\omega Y(\omega)P(\omega).
    $$

    Expectation is a weighted sum, and sums are linear. (The continuous case is the same with integrals.)

!!! example "Example: the sum of two dice, two ways"
    **The hard way:** use the triangle PMF from Section 1:

    $$
    \E[S] = \frac{2\cdot1 + 3\cdot2 + 4\cdot3 + 5\cdot4 + 6\cdot5 + 7\cdot6 + 8\cdot5 + 9\cdot4 + 10\cdot3 + 11\cdot2 + 12\cdot1}{36} = \frac{252}{36} = 7.
    $$

    **The easy way:** $S = X_1 + X_2$, so $\E[S] = \E[X_1] + \E[X_2] = 3.5 + 3.5 = 7$.

    Linearity skipped the distribution of $S$ entirely. And it would still work if the dice were somehow glued together so they always showed the same face.

### The indicator trick

The **indicator** of an event, $\mathbb 1_A$, is 1 if $A$ happens and 0 otherwise. Then $\E[\mathbb 1_A] = P(A)$.

To compute the expected *number* of things that happen:

1. write the count as a sum of indicators;
2. use linearity.

!!! example "Expected number of fixed points of a random permutation"
    Shuffle $n$ cards. How many land in their original position, on average?

    - Let $X = \sum_{i=1}^n\mathbb 1[\text{card } i\text{ in place}]$.
    - Each indicator has expectation $\frac1n$.
    - So $\E[X] = n\cdot\frac1n = 1$, **for every $n$**.

    The events are dependent (if $n-1$ cards are in place, so is the last), and computing the distribution of $X$ is hard. Linearity doesn't care.

!!! example "Expected number of heads"
    $n$ flips of a coin with $P(\text{heads}) = p$: $\E[\#\text{heads}] = \sum_i\E[\mathbb 1_{\text{flip } i}] = np$.

    Why $\E[\mathbb 1_A] = P(A)$: the indicator is 1 with probability $P(A)$ and 0 otherwise, so $\E = 1 \cdot P(A) + 0 \cdot (1 - P(A)) = P(A)$.

### The law of total expectation

The expectation version of the [law of total probability](foundations.md#3-the-law-of-total-probability): if $B_1, \dots, B_n$ partition the sample space,

$$
\E[X] = \sum_{i}\E[X \mid B_i]\,P(B_i).
$$

Here $\E[X\mid B]$ is the average of $X$ computed as if $B$ were the whole world (using probabilities $P(\cdot \mid B)$).

Example: in a class, 60% of students are in section A with average score 70, and 40% in section B with average 85. The overall average is $0.6 \cdot 70 + 0.4 \cdot 85 = 76$. Averages of groups, weighted by group size. Exercise 5 uses the same idea, with the cases "first roll is a 6" and "it isn't."

## 4. Variance

The expectation is the center. **Variance** measures the spread around it.

Two games with the same mean:

| Game | Outcomes | Mean |
|---|---|---|
| A | 4 or 6, each with probability $\frac12$ | 5 |
| B | 0 or 10, each with probability $\frac12$ | 5 |

Game B is much riskier. To measure that, look at how far outcomes land from the mean, squared (so that misses on both sides count as positive): in A, $(4-5)^2 = (6-5)^2 = 1$; in B, $(0 - 5)^2 = (10 - 5)^2 = 25$. Averaging gives $\Var = 1$ for A and $25$ for B. That's the definition below.

!!! definition "Definition: variance and standard deviation"
    $$
    \Var(X) = \E\big[(X - \mu)^2\big], \quad \mu = \E[X]; \qquad \sigma_X = \sqrt{\Var(X)}.
    $$

The standard deviation has the same units as $X$ and is the typical size of the deviation from the mean.

For the games: $\sigma_A = 1$ and $\sigma_B = 5$. Each game's outcomes are exactly one standard deviation from the mean. (If $X$ is in meters, $\Var X$ is in square meters, which is why we take the square root to get back to meters.)

!!! theorem "Computational formula"
    $$
    \Var(X) = \E[X^2] - (\E[X])^2.
    $$

!!! proof "Proof"
    Expand and use linearity, remembering that $\mu$ is a constant: $\E[X^2 - 2\mu X + \mu^2] = \E[X^2] - 2\mu\E[X] + \mu^2 = \E[X^2] - \mu^2$.

    (The middle term: $\E[X] = \mu$, so $-2\mu\E[X] = -2\mu^2$, and $-2\mu^2 + \mu^2 = -\mu^2$.)

Check on game B: $\E[X^2] = \frac{0 + 100}{2} = 50$, and $50 - 5^2 = 25$. ✓

Since $\Var\geq0$, this shows $\E[X^2]\geq(\E X)^2$, a first glimpse of [Jensen's inequality](../optimization/convexity.md).

!!! theorem "Scaling"
    $\Var(aX + b) = a^2\Var(X)$ and $\sigma_{aX+b} = |a|\sigma_X$.

!!! proof "Proof"
    $aX + b$ has mean $a\mu + b$, so

    $$
    \Var(aX + b) = \E[(aX + b - a\mu - b)^2] = a^2\E[(X - \mu)^2].
    $$

    - Shifting doesn't change spread.
    - Scaling by $a$ scales spread by $|a|$.

**Standardization:** $Z = \frac{X - \mu}{\sigma}$ has mean 0 and variance 1. It measures "how many standard deviations from the mean."

(By the scaling rule with $a = \frac1\sigma$, $b = -\frac{\mu}{\sigma}$: the mean becomes $\frac{\mu - \mu}{\sigma} = 0$, and the variance $\frac{1}{\sigma^2}\sigma^2 = 1$.) Example: exam scores with mean 70 and $\sigma = 10$. A score of 85 has $Z = 1.5$: one and a half standard deviations above average.

For sums, variance adds only for **independent** (more precisely, uncorrelated) variables: $\Var(X + Y) = \Var X + \Var Y$ in that case.

The general formula, with a covariance term, is in [Several random variables](joint.md).

## 5. Expected loss: the core of ML

A model $f_\theta$ makes a loss $\ell(f_\theta(X), Y)$ on a random example $(X, Y)$ drawn from the data distribution.

What we actually want to minimize is the **risk** (expected loss):

$$
R(\theta) = \E\big[\ell(f_\theta(X), Y)\big],
$$

But we can't compute it, since we don't know the distribution. Instead we minimize its sample average, the **empirical risk**:

$$
\hat R(\theta) = \frac1n\sum_i\ell(f_\theta(x_i), y_i).
$$

- Each term has expectation $R(\theta)$, so by linearity $\E[\hat R(\theta)] = R(\theta)$.
- Whether the minimizer of $\hat R$ is also good for $R$ is the question of generalization ([Bias, variance and generalization](../statistics/bias-variance.md)).

!!! example "Why squared error predicts the mean"
    Which constant $c$ minimizes $\E[(X - c)^2]$?

    - Expand: $\E[X^2] - 2c\E X + c^2$.
    - This is minimized at $c = \E[X]$, with minimum value $\Var X$.

    So **the mean is the best predictor under squared loss**, and the leftover error is the variance.

    | Loss | Best constant prediction |
    |---|---|
    | squared, $\E(X - c)^2$ | mean |
    | absolute, $\E\lvert X - c\rvert$ | median |

    This is why regression with squared loss estimates conditional means.

## Check yourself

**1.** $X$ has density $f(x) = 2x$ on $[0,1]$. Find $\E[X]$, $\E[X^2]$, $\Var(X)$ and $P(X > \frac12)$.

??? success "Solution"
    | Quantity | Computation | Value |
    |---|---|---|
    | $\E X$ | $\int_0^1 2x^2dx$ | $\frac23$ |
    | $\E X^2$ | $\int_0^12x^3dx$ | $\frac12$ |
    | $\Var X$ | $\frac12 - \frac49$ | $\frac1{18}$ |
    | $P(X > \frac12)$ | $\int_{1/2}^12x\,dx$ | $\frac34$ |

**2.** Roll 10 dice. What's the expected sum? The expected number of sixes?

??? success "Solution"
    - Expected sum: $10\times3.5 = 35$.
    - Expected number of sixes: $10\times\frac16 = \frac53$.

**3.** $n$ people each throw their hat into a box and draw one at random. What's the expected number of people who get their own hat back?

??? success "Solution"
    The answer is 1. It's the same as the number of fixed points of a random permutation.

**4.** For a fair die, compute $\Var(X)$.

??? success "Solution"
    - $\E X^2 = \frac{1 + 4 + 9 + 16 + 25 + 36}{6} = \frac{91}6$.
    - $\Var = \frac{91}{6} - \frac{49}4 = \frac{182 - 147}{12} = \frac{35}{12} \approx 2.92$.

**5.** You keep rolling a die until you see a 6. Use the law of total expectation to find the expected number of rolls. (Condition on the first roll: $\E[N] = 1 + \frac56\E[N]$.)

??? success "Solution"
    - With probability $\frac16$ you're done after 1 roll.
    - Otherwise you've used 1 roll, and the situation restarts.

    So $\E N = 1 + \frac56\E N$, giving $\E N = 6$.

**6.** A random graph on $n$ vertices includes each of the $\binom n2$ possible edges independently with probability $p$. What's the expected number of triangles?

??? success "Solution"
    Each of the $\binom n3$ triples is a triangle with probability $p^3$.

    By linearity, $\E = \binom n3p^3$.
