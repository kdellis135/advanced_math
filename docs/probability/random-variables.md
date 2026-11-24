# Random variables and expectation

<div class="lesson-meta" markdown>
**Phase 5 · Lesson 3** · ⏱ ~3 hours · Needs: [Probability, conditioning and Bayes](foundations.md), [Integrals](../calculus/integrals.md)
</div>

A random variable attaches a number to each outcome: the number of heads, a measurement, a model's loss on a random example. Its **expectation** is its long-run average, and **linearity of expectation** is the single most useful tool in probability. It makes hard counting problems easy and holds even when variables are dependent.

## 1. Random variables

!!! definition "Definition: random variable"
    A **random variable** is a function $X : \Omega\to\R$ that assigns a number to each outcome. We write $P(X = x)$ for $P(\{\omega : X(\omega) = x\})$.

The name is misleading: it's neither random nor a variable. It's a function. The randomness is in which $\omega$ occurs.

### Discrete: the PMF

If $X$ takes countably many values, its **probability mass function** is $p(x) = P(X = x)$, with $p(x)\geq0$ and $\sum_xp(x) = 1$.

### Continuous: the PDF

A continuous $X$ has a **probability density function** $f$ with

$$
P(a \leq X \leq b) = \int_a^bf(x)\,dx, \qquad f(x)\geq0, \qquad \int_{-\infty}^\infty f(x)\,dx = 1.
$$

!!! warning "A density is not a probability"
    $f(x)$ can exceed 1 (uniform on $[0, \frac12]$ has $f = 2$). What's a probability is *area*: $P(x \leq X \leq x + dx) \approx f(x)\,dx$. For continuous $X$, $P(X = x) = 0$ for every single point.

### The CDF: works for both

The **cumulative distribution function** $F(x) = P(X \leq x)$ increases from 0 to 1. For continuous $X$, $F' = f$ (by the [fundamental theorem of calculus](../calculus/integrals.md#2-the-fundamental-theorem-of-calculus)), and $P(a < X \leq b) = F(b) - F(a)$.

## 2. Expectation

!!! definition "Definition: expectation"
    $$
    \E[X] = \sum_x x\,p(x) \quad\text{(discrete)}, \qquad \E[X] = \int_{-\infty}^\infty x\,f(x)\,dx \quad\text{(continuous)}.
    $$

It's the **probability-weighted average** of the values: the center of mass of the distribution, and (by the law of large numbers, coming up in [Limit theorems](limit-theorems.md)) the long-run average of many independent samples.

!!! example "Example"
    A fair die: $\E[X] = \frac{1 + 2 + \cdots + 6}{6} = 3.5$. Note that the "expected value" may be impossible as an actual outcome.

!!! theorem "LOTUS (law of the unconscious statistician)"
    $$
    \E[g(X)] = \sum_xg(x)\,p(x) \qquad\text{or}\qquad \int g(x)f(x)\,dx.
    $$

You don't need the distribution of $g(X)$, just weight $g$'s values by the probabilities of $X$. (Discrete proof: group the outcomes by the value of $g(x)$.)

## 3. Linearity of expectation

!!! theorem "Linearity of expectation"
    For any random variables $X, Y$ (on the same space) and constants $a, b$:

    $$
    \E[aX + bY] = a\E[X] + b\E[Y].
    $$

    **No independence needed.**

!!! proof "Proof (discrete)"
    Sum over outcomes: $\E[aX + bY] = \sum_\omega(aX(\omega) + bY(\omega))P(\omega) = a\sum_\omega X(\omega)P(\omega) + b\sum_\omega Y(\omega)P(\omega)$. Expectation is a weighted sum, and sums are linear. (The continuous case is the same with integrals.)

### The indicator trick

The **indicator** of an event, $\mathbb 1_A$, is 1 if $A$ happens and 0 otherwise. Then $\E[\mathbb 1_A] = P(A)$. To compute the expected *number* of things that happen, write the count as a sum of indicators and use linearity.

!!! example "Expected number of fixed points of a random permutation"
    Shuffle $n$ cards. How many land in their original position, on average? Let $X = \sum_{i=1}^n\mathbb 1[\text{card } i\text{ in place}]$. Each indicator has expectation $\frac1n$. So $\E[X] = n\cdot\frac1n = 1$, **for every $n$**.

    The events are dependent (if $n-1$ cards are in place, so is the last), and computing the distribution of $X$ is hard. Linearity doesn't care.

!!! example "Expected number of heads"
    $n$ flips of a coin with $P(\text{heads}) = p$: $\E[\#\text{heads}] = \sum_i\E[\mathbb 1_{\text{flip } i}] = np$.

## 4. Variance

The expectation is the center. **Variance** measures the spread around it.

!!! definition "Definition: variance and standard deviation"
    $$
    \Var(X) = \E\big[(X - \mu)^2\big], \quad \mu = \E[X]; \qquad \sigma_X = \sqrt{\Var(X)}.
    $$

The standard deviation has the same units as $X$ and is the typical size of the deviation from the mean.

!!! theorem "Computational formula"
    $$
    \Var(X) = \E[X^2] - (\E[X])^2.
    $$

!!! proof "Proof"
    Expand and use linearity, remembering that $\mu$ is a constant: $\E[X^2 - 2\mu X + \mu^2] = \E[X^2] - 2\mu\E[X] + \mu^2 = \E[X^2] - \mu^2$.

Since $\Var\geq0$, this shows $\E[X^2]\geq(\E X)^2$, a first glimpse of [Jensen's inequality](../optimization/convexity.md).

!!! theorem "Scaling"
    $\Var(aX + b) = a^2\Var(X)$ and $\sigma_{aX+b} = |a|\sigma_X$.

!!! proof "Proof"
    $aX + b$ has mean $a\mu + b$, so $\Var(aX + b) = \E[(aX + b - a\mu - b)^2] = a^2\E[(X - \mu)^2]$. Shifting doesn't change spread; scaling by $a$ scales spread by $|a|$.

**Standardization:** $Z = \frac{X - \mu}{\sigma}$ has mean 0 and variance 1. It measures "how many standard deviations from the mean."

For sums, variance is linear only for **independent** (more precisely, uncorrelated) variables: $\Var(X + Y) = \Var X + \Var Y$ in that case. The general formula, with a covariance term, is in [Several random variables](joint.md).

## 5. Expected loss: the core of ML

A model $f_\theta$ makes a loss $\ell(f_\theta(X), Y)$ on a random example $(X, Y)$ drawn from the data distribution. What we actually want to minimize is the **risk** (expected loss)

$$
R(\theta) = \E\big[\ell(f_\theta(X), Y)\big],
$$

but we can't compute it, since we don't know the distribution. We minimize its sample average, the **empirical risk** $\hat R(\theta) = \frac1n\sum_i\ell(f_\theta(x_i), y_i)$, instead. Each term has expectation $R(\theta)$, so by linearity $\E[\hat R(\theta)] = R(\theta)$. Whether the minimizer of $\hat R$ is also good for $R$ is the question of generalization ([Bias, variance and generalization](../statistics/bias-variance.md)).

!!! example "Why squared error predicts the mean"
    Which constant $c$ minimizes $\E[(X - c)^2]$? Expand: $\E[X^2] - 2c\E X + c^2$, minimized at $c = \E[X]$, with minimum value $\Var X$. So **the mean is the best predictor under squared loss**, and the leftover error is the variance. (Under absolute loss $\E|X - c|$, the best constant is the median.) This is why regression with squared loss estimates conditional means.

## Check yourself

**1.** $X$ has density $f(x) = 2x$ on $[0,1]$. Find $\E[X]$, $\E[X^2]$, $\Var(X)$ and $P(X > \frac12)$.

??? success "Solution"
    $\E X = \int_0^1 2x^2dx = \frac23$. $\E X^2 = \int_0^12x^3dx = \frac12$. $\Var = \frac12 - \frac49 = \frac1{18}$. $P(X > \frac12) = \int_{1/2}^12x\,dx = \frac34$.

**2.** Roll 10 dice. What's the expected sum? The expected number of sixes?

??? success "Solution"
    $10\times3.5 = 35$. $10\times\frac16 = \frac53$.

**3.** $n$ people each throw their hat into a box and draw one at random. What's the expected number of people who get their own hat back?

??? success "Solution"
    1. Same as the fixed points of a random permutation.

**4.** For a fair die, compute $\Var(X)$.

??? success "Solution"
    $\E X^2 = \frac{1 + 4 + 9 + 16 + 25 + 36}{6} = \frac{91}6$. $\Var = \frac{91}{6} - \frac{49}4 = \frac{182 - 147}{12} = \frac{35}{12} \approx 2.92$.

**5.** You keep rolling a die until you see a 6. Use the law of total expectation to find the expected number of rolls. (Condition on the first roll: $\E[N] = 1 + \frac56\E[N]$.)

??? success "Solution"
    With probability $\frac16$ you're done after 1 roll; otherwise you've used 1 roll and the situation restarts. So $\E N = 1 + \frac56\E N$, giving $\E N = 6$.

**6.** A random graph on $n$ vertices includes each of the $\binom n2$ possible edges independently with probability $p$. What's the expected number of triangles?

??? success "Solution"
    Each of the $\binom n3$ triples is a triangle with probability $p^3$. By linearity, $\E = \binom n3p^3$.
