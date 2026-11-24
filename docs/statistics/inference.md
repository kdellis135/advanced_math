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

By the [CLT](../probability/limit-theorems.md#4-the-central-limit-theorem), for large $n$,

$$
\frac{\hat\theta - \theta}{\text{SE}}\approx\mathcal N(0, 1).
$$

## 2. Confidence intervals

Since $P(-1.96\leq Z\leq1.96) = 0.95$ for $Z\sim\mathcal N(0,1)$:

$$
P\big(\hat\theta - 1.96\,\text{SE}\leq\theta\leq\hat\theta + 1.96\,\text{SE}\big)\approx0.95.
$$

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

For small samples from a roughly normal population, replace 1.96 by a quantile of the **Student $t$ distribution** with $n - 1$ degrees of freedom.

- It has heavier tails, accounting for the uncertainty in estimating $\sigma$ by $s$.
- For $n > 30$ the difference is small.

## 3. Hypothesis tests

!!! definition "The setup"
    - **Null hypothesis** $H_0$: the boring explanation ("no difference", "the coin is fair").
    - **Test statistic:** a number measuring how far the data are from what $H_0$ predicts.
    - **p-value:** the probability, *assuming $H_0$ is true*, of a test statistic at least as extreme as the one observed.
    - **Decision:** reject $H_0$ if $p < \alpha$ (the significance level, conventionally 0.05).

!!! example "Is the coin fair?"
    60 heads in 100 flips. Under $H_0$ ($p = 0.5$):

    1. Mean 50, SE $= \sqrt{100\cdot0.25} = 5$.
    2. Statistic: $z = \frac{60 - 50}{5} = 2$.
    3. Two-sided p-value: $P(|Z|\geq2)\approx0.046$.

    Reject at the 5% level, barely.

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

So:

- $z\approx2.5$ and $p\approx0.012$;
- the 95% CI for the difference is $0.025\pm0.0196 = [0.5\%, 4.5\%]$.

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
