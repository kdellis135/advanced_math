# Inequalities and limit theorems

<div class="lesson-meta" markdown>
**Phase 5 · Lesson 6** · ⏱ ~3.5 hours · Needs: [Several random variables](joint.md), [Series and Taylor](../calculus/series-taylor.md)
</div>

Individual random events are unpredictable. Averages of many of them are almost certain. This lesson proves it: simple inequalities bound how far a random variable strays from its mean, the **law of large numbers** says averages converge to the expectation, and the **central limit theorem** says the fluctuations around it are Gaussian. These results are why statistics, Monte Carlo methods and stochastic gradient descent work at all.

## 1. Markov's inequality

!!! theorem "Markov's inequality"
    If $X\geq0$ and $a > 0$:

    $$
    P(X\geq a)\leq\frac{\E[X]}{a}.
    $$

!!! proof "Proof"
    $X\geq a\cdot\mathbb 1[X\geq a]$ (if $X\geq a$ the right side is $a\leq X$; otherwise it's $0\leq X$). Take expectations: $\E X\geq a\,P(X\geq a)$.

If the average income is \$50k, at most 10% of people can earn \$500k or more. It's crude, but it uses nothing except non-negativity and the mean.

## 2. Chebyshev's inequality

!!! theorem "Chebyshev's inequality"
    For any $X$ with mean $\mu$ and variance $\sigma^2$, and any $k > 0$:

    $$
    P(|X - \mu|\geq k\sigma)\leq\frac1{k^2}.
    $$

!!! proof "Proof"
    Apply Markov to the non-negative variable $(X - \mu)^2$ with $a = k^2\sigma^2$:
    $P(|X - \mu| \geq k\sigma) = P\big((X - \mu)^2\geq k^2\sigma^2\big)\leq\frac{\E(X - \mu)^2}{k^2\sigma^2} = \frac{1}{k^2}$.

For *any* distribution, at most 25% of the mass lies 2 or more standard deviations away from the mean, and at most 11% lies 3 or more away. For a Gaussian the true numbers are 4.6% and 0.3%. Chebyshev is weak but universal.

## 3. The law of large numbers

!!! theorem "Weak law of large numbers"
    Let $X_1, X_2, \ldots$ be independent with the same mean $\mu$ and variance $\sigma^2 < \infty$, and let $\bar X_n = \frac1n\sum_{i=1}^nX_i$. Then for every $\varepsilon > 0$:

    $$
    P\big(|\bar X_n - \mu|\geq\varepsilon\big)\to0\quad\text{as }n\to\infty.
    $$

!!! proof "Proof"
    $\E\bar X_n = \mu$ by linearity, and $\Var\bar X_n = \frac{1}{n^2}\cdot n\sigma^2 = \frac{\sigma^2}{n}$ by independence. Chebyshev gives

    $$
    P(|\bar X_n - \mu|\geq\varepsilon)\leq\frac{\sigma^2}{n\varepsilon^2}\to0.
    $$

<div class="viz" data-viz="lln"></div>

!!! intuition "The √n law"
    The proof shows more than convergence: the typical error of an average of $n$ samples is $\sigma/\sqrt n$. To halve the error you need four times the data. This **$1/\sqrt n$ rate** is everywhere: polling margins, Monte Carlo integration, and the noise in a mini-batch gradient.

(The **strong law** says $\bar X_n\to\mu$ with probability 1, a stronger form of convergence; its proof is harder and the practical content is the same.)

## 4. The central limit theorem

The LLN says $\bar X_n - \mu$ shrinks like $1/\sqrt n$. Magnify the error by $\sqrt n$ to see its *shape*. The astonishing answer: the shape is always the same.

!!! theorem "Central limit theorem (CLT)"
    Let $X_1, X_2, \ldots$ be independent and identically distributed with mean $\mu$ and variance $\sigma^2 \in (0, \infty)$. Then

    $$
    Z_n = \frac{\sum_{i=1}^nX_i - n\mu}{\sigma\sqrt n} = \frac{\bar X_n - \mu}{\sigma/\sqrt n}\ \longrightarrow\ \mathcal N(0, 1)\quad\text{in distribution,}
    $$

    meaning $P(Z_n\leq z)\to\Phi(z)$ (the standard normal CDF) for every $z$.

<div class="viz" data-viz="clt"></div>

!!! intuition "Why should the shape be universal?"
    Adding independent variables smooths out their individual quirks. The Gaussian is the only shape that's stable under this process: the sum of two independent Gaussians is Gaussian, with variances adding. So repeated adding and rescaling has the Gaussian as its fixed point, and every starting distribution with finite variance gets pulled into it.

??? proof "Proof sketch via moment generating functions (deeper)"
    The **moment generating function** $M_X(t) = \E[e^{tX}]$ determines the distribution (when it exists near 0), and for independent variables $M_{X+Y} = M_XM_Y$ (since $\E[e^{tX}e^{tY}] = \E e^{tX}\E e^{tY}$).

    WLOG $\mu = 0$, $\sigma = 1$. By Taylor, $M_X(t) = 1 + t\E X + \frac{t^2}{2}\E X^2 + o(t^2) = 1 + \frac{t^2}{2} + o(t^2)$. Then

    $$
    M_{Z_n}(t) = M_X\!\left(\frac{t}{\sqrt n}\right)^n = \left(1 + \frac{t^2}{2n} + o\!\left(\frac1n\right)\right)^n\to e^{t^2/2},
    $$

    using $(1 + a/n)^n\to e^a$. And $e^{t^2/2}$ is exactly the MGF of $\mathcal N(0,1)$ (complete the square in $\int e^{tx}e^{-x^2/2}dx/\sqrt{2\pi}$). A continuity theorem turns MGF convergence into convergence in distribution. Note that only the mean and variance survived the limit. All other features of the distribution were washed out in the $o(1/n)$ terms.

**Practical use:** for large $n$, $\bar X_n\approx\mathcal N(\mu, \sigma^2/n)$. With 95% probability, the sample mean is within $1.96\,\sigma/\sqrt n$ of the true mean. That's the basis of **confidence intervals** ([Statistics](../statistics/inference.md)).

!!! example "Example: polling"
    1000 voters, true support $p = 0.5$. The count of supporters is a sum of 1000 Bernoullis, so the sample proportion is approximately normal with standard deviation $\sqrt{0.25/1000}\approx0.0158$. The 95% margin of error is $\pm1.96\times0.0158\approx\pm3.1\%$, the "±3 points" quoted with most polls.

## 5. Concentration inequalities: Hoeffding

Chebyshev gives polynomial tails ($1/k^2$). For bounded variables, the truth is exponentially better:

!!! theorem "Hoeffding's inequality"
    If $X_1, \ldots, X_n$ are independent with $a\leq X_i\leq b$, then

    $$
    P\big(|\bar X_n - \E\bar X_n|\geq\varepsilon\big)\leq2\exp\!\left(-\frac{2n\varepsilon^2}{(b - a)^2}\right).
    $$

(The proof applies Markov to $e^{\lambda(\bar X_n - \mu)}$ and optimizes over $\lambda$; it is outside the scope of this site, and the result is a standard, safe-to-use tool.) Unlike the CLT, this is a guarantee for every $n$, not just an approximation for large $n$.

!!! ml "Where this shows up"
    - **Generalization bounds.** A model's test error on $n$ held-out examples is an average of bounded losses, so by Hoeffding it's within $\varepsilon$ of the true error with probability at least $1 - 2e^{-2n\varepsilon^2}$. With a union bound over $|\mathcal H|$ candidate models this becomes the classic PAC bound: $n \gtrsim\frac{\log|\mathcal H| + \log(1/\delta)}{\varepsilon^2}$ examples suffice.
    - **Stochastic gradient descent.** A mini-batch gradient is an average of $B$ per-example gradients: unbiased for the full gradient, with noise $\propto1/\sqrt B$. That's the LLN and CLT at work in every training step.
    - **Monte Carlo estimation** (of expectations in RL, VAEs, diffusion) converges at rate $1/\sqrt n$ regardless of dimension. This is why sampling beats grid-based integration in high dimensions.
    - **Evaluation:** reporting a benchmark accuracy without its $\pm1.96\sqrt{\hat p(1-\hat p)/n}$ error bar is reporting half the result.

## Check yourself

**1.** The average waiting time is 5 minutes. Bound $P(\text{wait}\geq20)$ using only that information.

??? success "Solution"
    Markov: $\leq5/20 = 0.25$.

**2.** A variable has mean 100 and standard deviation 10. Bound $P(X\notin(70, 130))$.

??? success "Solution"
    That's $|X - 100|\geq3\sigma$. Chebyshev: $\leq1/9\approx0.11$.

**3.** How many fair coin flips are needed for Chebyshev to guarantee $P(|\bar X_n - 0.5|\geq0.01)\leq0.05$?

??? success "Solution"
    $\frac{\sigma^2}{n\varepsilon^2} = \frac{0.25}{n\cdot10^{-4}}\leq0.05$, so $n\geq50{,}000$. (The CLT says about $9{,}600$ actually suffice. Chebyshev is loose.)

**4.** You roll 100 dice. Approximate the probability the sum exceeds 380.

??? success "Solution"
    Mean 350, variance $100\cdot\frac{35}{12}\approx291.7$, standard deviation $\approx17.1$. $z = 30/17.1\approx1.75$; $P(Z > 1.75)\approx4\%$.

**5.** A classifier gets 870 of 1000 test examples right. Give a 95% interval for its true accuracy.

??? success "Solution"
    $\hat p = 0.87$, standard error $\sqrt{0.87\cdot0.13/1000}\approx0.0106$. Interval $0.87\pm0.021$, i.e. about $[0.849, 0.891]$.

**6.** Why does doubling the batch size in SGD not halve the gradient noise?

??? success "Solution"
    The noise standard deviation scales as $1/\sqrt B$. Doubling $B$ reduces it by a factor of $\sqrt2\approx1.41$, not 2.
