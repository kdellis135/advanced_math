# Confidence intervals and tests

<div class="lesson-meta" markdown>
**Phase 6 · Lesson 3** · ⏱ ~2.5 hours · Needs: [Inequalities and limit theorems](../probability/limit-theorems.md), [Estimation](estimation.md)
</div>

An estimate without an error bar is half an answer.

"Model B is 0.8% more accurate than model A": is that real, or noise from a finite test set?

This lesson covers the two standard tools, **confidence intervals** and **hypothesis tests**. The emphasis is on what they actually mean, because they're routinely misinterpreted.

## 1. Sampling distributions and standard errors

An estimate computed from random data is itself random.

- Its distribution over hypothetical repeated datasets is its **sampling distribution**.
- Its standard deviation is the **standard error** (SE).

| Estimate | Standard error |
|---|---|
| sample mean | $\sigma/\sqrt n$, estimated by $s/\sqrt n$ |
| proportion $\hat p$ | $\sqrt{\hat p(1 - \hat p)/n}$ |

!!! example "Example: a sampling distribution you can picture"
    A fair coin, flipped 100 times. The fraction of heads $\hat p$ might come out $0.47$. Do it again: $0.53$. Again: $0.51$.

    Repeat the whole 100-flip experiment thousands of times and make a histogram of the $\hat p$ values. That histogram is the **sampling distribution** of $\hat p$:

    - it's centered at the true $p = 0.5$;
    - its standard deviation is $\sqrt{0.5 \cdot 0.5/100} = 0.05$: that's the standard error;
    - by the CLT, it's bell-shaped.

    In practice you run the experiment *once*. The standard error tells you how much your one number would have wobbled if you'd been able to repeat it.

Both formulas come from the [limit theorems lesson](../probability/limit-theorems.md): an average of $n$ independent draws has standard deviation $\sigma/\sqrt n$, and a proportion is the average of $n$ Bernoulli draws with $\sigma^2 = p(1 - p)$. Since the true $\sigma$ or $p$ is unknown, we plug in the estimate.

By the [CLT](../probability/limit-theorems.md#4-the-central-limit-theorem), for large $n$,

$$
\frac{\hat\theta - \theta}{\text{SE}}\approx\mathcal N(0, 1).
$$

## 2. Confidence intervals

Since $P(-1.96\leq Z\leq1.96) = 0.95$ for $Z\sim\mathcal N(0,1)$:

$$
P\big(\hat\theta - 1.96\,\text{SE}\leq\theta\leq\hat\theta + 1.96\,\text{SE}\big)\approx0.95.
$$

How we got there, by rearranging the inequality inside the probability:

1. $\frac{\hat\theta - \theta}{\text{SE}}$ is approximately $Z$, so $P\left(-1.96 \leq \frac{\hat\theta - \theta}{\text{SE}} \leq 1.96\right) \approx 0.95$.
2. Multiply through by SE: $\ -1.96\,\text{SE} \leq \hat\theta - \theta \leq 1.96\,\text{SE}$. In words: "$\hat\theta$ lands within $1.96$ SE of $\theta$."
3. That's the same as "$\theta$ lies within $1.96$ SE of $\hat\theta$": $\ \hat\theta - 1.96\,\text{SE} \leq \theta \leq \hat\theta + 1.96\,\text{SE}$.

The distance between two points is the same measured from either end. So if the estimate is usually close to the truth, then the truth is usually close to the estimate, and we can build an interval around the number we actually have.

!!! definition "Definition: confidence interval"
    A **95% confidence interval** is a procedure that produces an interval from the data, such that the interval contains the true parameter in 95% of repeated experiments.

    The standard large-sample interval is $\hat\theta\pm z\,\text{SE}$:

    | Confidence | $z$ |
    |---|---|
    | 90% | $1.645$ |
    | 95% | $1.96$ |
    | 99% | $2.576$ |

!!! warning "What a confidence interval does *not* mean"
    The 95% describes the **procedure**, not a particular interval.

    - Once computed, $[0.849, 0.891]$ either contains the true accuracy or it doesn't. The parameter isn't random in this framework.
    - "There's a 95% probability the true value is in this interval" is a *Bayesian* statement about a credible interval, which requires a prior ([Estimation](estimation.md#5-bayesian-inference-and-map)).

    With lots of data and weak priors the two usually agree numerically, which is why the confusion persists.

!!! intuition "100 researchers"
    Imagine 100 researchers, each collecting their own dataset and computing a 95% interval. About 95 of the intervals capture the true value and about 5 miss it. Each researcher only sees their own interval and can't tell which group they're in. "95%" is the success rate of the method.

**What controls the width** ($\pm z\cdot\text{SE}$):

| Change | Effect on the interval |
|---|---|
| more confidence (95% → 99%) | wider ($z$: 1.96 → 2.576) |
| 4× more data | half as wide (SE has $\sqrt n$ in the denominator) |
| noisier data (bigger $\sigma$) | wider |

For small samples from a roughly normal population, replace 1.96 by a quantile of the **Student $t$ distribution** with $n - 1$ degrees of freedom.

- It has heavier tails, accounting for the uncertainty in estimating $\sigma$ by $s$.
- For $n > 30$ the difference is small.

| Sample size $n$ | 95% multiplier |
|---|---|
| 5 | $2.78$ |
| 10 | $2.26$ |
| 30 | $2.05$ |
| 100 | $1.98$ |
| $\infty$ | $1.96$ (the normal value) |

With only 5 data points, you must widen the interval by about 40% to be honest about the extra uncertainty.

## 3. Hypothesis tests

!!! definition "The setup"
    - **Null hypothesis** $H_0$: the boring explanation ("no difference", "the coin is fair").
    - **Test statistic:** a number measuring how far the data are from what $H_0$ predicts.
    - **p-value:** the probability, *assuming $H_0$ is true*, of a test statistic at least as extreme as the one observed.
    - **Decision:** reject $H_0$ if $p < \alpha$ (the significance level, conventionally 0.05).

!!! intuition "A courtroom"
    $H_0$ is "innocent." The test asks: *if* the defendant were innocent, how surprising would this evidence be? If very surprising (small p-value), we reject innocence. If not, we don't convict, but that's "not proven guilty," not "proven innocent." Failing to reject $H_0$ never shows $H_0$ is true.

**The recipe for a large-sample test:**

1. State $H_0$ and what it predicts for the estimate (its mean and SE under $H_0$).
2. Compute $z = \frac{\text{observed} - \text{expected under } H_0}{\text{SE}}$: how many standard errors away the data landed.
3. Find the p-value: $P(\lvert Z\rvert \geq \lvert z\rvert)$ for a **two-sided** test (any difference counts), or $P(Z \geq z)$ for a **one-sided** test (only one direction counts).
4. Compare with $\alpha$, and report the effect size and a confidence interval too.

Why "at least as extreme," not "exactly this"? The probability of any *exact* outcome is tiny even when $H_0$ is true (exactly 50 heads in 100 flips has probability only 8%). The question is whether the data are *out in the tail*.

!!! example "Is the coin fair?"
    60 heads in 100 flips. Under $H_0$ ($p = 0.5$):

    1. Mean 50, SE $= \sqrt{100\cdot0.25} = 5$.
    2. Statistic: $z = \frac{60 - 50}{5} = 2$.
    3. Two-sided p-value: $P(|Z|\geq2)\approx0.046$.

    Reject at the 5% level, barely.

    (Step 1: the number of heads is Binomial$(100, 0.5)$ under $H_0$, with variance $np(1-p) = 25$. Step 3: $P(Z \geq 2) \approx 0.023$, doubled for both tails.)

**Tests and intervals are two views of the same thing.** A two-sided test at level 5% rejects $H_0: \theta = \theta_0$ exactly when $\theta_0$ falls outside the 95% confidence interval. For the coin: $\hat p = 0.6$, SE $\approx\sqrt{0.6 \cdot 0.4/100} \approx 0.049$, so the interval is $0.6 \pm 0.096 = [0.504, 0.696]$. It just barely excludes $0.5$, matching the borderline p-value.

!!! warning "What a p-value is not"
    - It is **not** the probability that $H_0$ is true.
        - That would be $P(H_0\mid\text{data})$, but the p-value is (roughly) $P(\text{data this extreme}\mid H_0)$.
        - Confusing them is the same mistake as in the [medical test example](../probability/foundations.md#4-bayes-theorem).
    - It is **not** the size of the effect.
        - With enough data, a 0.01% difference becomes "highly significant."
        - Always report the effect size with a confidence interval.
    - $p = 0.06$ and $p = 0.04$ are not meaningfully different evidence.

**Two types of error:**

| Error | Meaning | Probability |
|---|---|---|
| *Type I* (false positive) | rejecting a true $H_0$ | $\alpha$, by design |
| *Type II* (false negative) | missing a real effect | $1 - \text{power}$ |

The **power** grows with sample size and effect size. Before running an experiment, compute the $n$ needed to detect the effect you care about.

!!! example "Example: the power of the coin test"
    Suppose the coin really lands heads 60% of the time. How often would our 100-flip test catch it?

    1. The test rejects when $\lvert\text{heads} - 50\rvert \geq 1.96 \times 5 = 9.8$, i.e. at 60 or more heads (or 40 or fewer).
    2. With the true $p = 0.6$, heads has mean 60 and SD $\sqrt{100 \cdot 0.6 \cdot 0.4} \approx 4.9$.
    3. $P(\text{heads} \geq 59.8) \approx P\left(Z \geq \frac{59.8 - 60}{4.9}\right) = P(Z \geq -0.04) \approx 0.52$.

    Power is only about 52%: a coin biased 60/40 would slip past this test about half the time. With 400 flips, the same calculation gives a power of about 98%.

## 4. A/B testing: comparing two proportions

| Variant | Conversions | Rate |
|---|---|---|
| A | $200/2000$ | $\hat p_A = 10\%$ |
| B | $250/2000$ | $\hat p_B = 12.5\%$ |

Is B better?

The difference $\hat p_B - \hat p_A = 0.025$ has standard error (independent samples, so variances add)

$$
\text{SE} = \sqrt{\frac{\hat p_A(1 - \hat p_A)}{n_A} + \frac{\hat p_B(1-\hat p_B)}{n_B}} = \sqrt{\frac{0.09}{2000} + \frac{0.109}{2000}}\approx0.00998.
$$

(The numerators: $0.1 \times 0.9 = 0.09$ and $0.125 \times 0.875 \approx 0.109$. Adding variances is the [variance-of-a-sum rule](../probability/joint.md#3-covariance-and-correlation) with zero covariance, since the two groups of users are independent. A difference $\hat p_B - \hat p_A$ is a sum with a minus sign, and $\Var(-X) = \Var X$.)

So:

- $z = \frac{0.025}{0.00998} \approx 2.5$, and $p = P(\lvert Z\rvert \geq 2.5)\approx0.012$;
- the 95% CI for the difference is $0.025\pm1.96 \times 0.00998 = 0.025\pm0.0196$, i.e. $[0.5\%, 4.5\%]$.

B is probably better, but the true improvement could be anywhere from tiny to substantial.

## 5. The multiple comparisons trap

Test 20 useless features at $\alpha = 0.05$ and you expect one "significant" result by pure chance.

More precisely, $P(\text{at least one false positive}) = 1 - 0.95^{20}\approx64\%$.

Fixes:

- **Bonferroni:** use $\alpha/m$ for each of $m$ tests. By the [union bound](../probability/foundations.md#1-the-setup), the chance of any false positive is then at most $\alpha$.
- **Pre-register** the hypothesis and the analysis before looking at the data.
- **Hold out a test set** you look at only once.

!!! ml "Where this shows up"
    - **Benchmark comparisons:** on a 1000-example test set, accuracy has a standard error of about 1%.
        - Differences smaller than that are noise. Report seeds and error bars.
    - **Leaderboard overfitting:** repeatedly evaluating against the same test set is multiple comparisons in disguise.
        - Each submission leaks information, and models end up overfit to the benchmark itself.
    - **Online A/B tests** decide which model ships.
        - "Peeking" at results and stopping early when $p < 0.05$ inflates the false-positive rate dramatically.
        - Use sequential testing methods designed for continuous monitoring.

## Check yourself

**1.** A sample of 400 has mean 52 and standard deviation 10. Give a 95% CI for the population mean.

??? success "Solution"
    - SE $= 10/\sqrt{400} = 10/20 = 0.5$.
    - CI: $52\pm1.96(0.5) = 52\pm0.98 = [51.02, 52.98]$.

**2.** Which statement is correct about a 95% CI of $[51, 53]$? (a) There's a 95% chance $\mu$ is in $[51, 53]$. (b) 95% of intervals constructed this way contain $\mu$.

??? success "Solution"
    (b). Statement (a) is a Bayesian credible-interval statement, which needs a prior.

**3.** Model A gets 85.0% and model B gets 85.6% on the same 2000 test examples. Is this convincing?

??? success "Solution"
    Each accuracy has SE $\approx\sqrt{0.85\cdot0.15/2000}\approx0.8\%$. A 0.6% difference is well within noise.

    Because both models are evaluated on the *same* examples, a paired test like McNemar's (which looks only at examples where they disagree) is more powerful. Still, without more evidence this isn't convincing.

**4.** How many samples are needed for a 95% CI of half-width 1% on a proportion near 50%?

??? success "Solution"
    $1.96\sqrt{0.25/n} = 0.01$, so $n = (1.96\cdot0.5/0.01)^2\approx9604$.

**5.** You test 100 hyperparameter settings and the best beats the baseline with $p = 0.01$. Should you be impressed?

??? success "Solution"
    No.

    - With 100 tries, about one setting is expected to reach $p\leq0.01$ by chance alone.
    - Bonferroni would require $p < 0.0005$.

    Confirm the result on fresh data.
