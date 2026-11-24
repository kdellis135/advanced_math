# Estimation, MLE and MAP

<div class="lesson-meta" markdown>
**Phase 6 · Lesson 1** · ⏱ ~4 hours · Needs: [The distribution zoo](../probability/distributions.md), [Matrix calculus](../multivariable/matrix-calculus.md)
</div>

You have data and a family of models with unknown parameters. Which parameters are best? **Maximum likelihood** answers: the ones under which the observed data is most probable. This principle gives you, as special cases, least-squares regression, logistic regression, and the cross-entropy loss used to train every classifier and language model. Adding a **prior** gives MAP estimation, which turns out to be regularization.

## 1. Estimators and their quality

A **statistical model** is a family of distributions $p(x\mid\theta)$ indexed by a parameter $\theta$. Given i.i.d. data $x_1, \ldots, x_n$, an **estimator** $\hat\theta$ is any function of the data meant to approximate $\theta$. Since the data are random, $\hat\theta$ is a random variable, and we judge it by its behavior:

!!! definition "Definition: bias, variance, MSE"
    - **Bias:** $\E[\hat\theta] - \theta$. Unbiased if 0.
    - **Variance:** $\Var(\hat\theta)$.
    - **Mean squared error:** $\text{MSE} = \E[(\hat\theta - \theta)^2]$.

!!! theorem "MSE decomposition"
    $$
    \text{MSE}(\hat\theta) = \text{Bias}(\hat\theta)^2 + \Var(\hat\theta).
    $$

!!! proof "Proof"
    Write $\hat\theta - \theta = (\hat\theta - \E\hat\theta) + (\E\hat\theta - \theta)$. Square and take expectations. The cross term is $2(\E\hat\theta - \theta)\E[\hat\theta - \E\hat\theta] = 0$.

An estimator can be biased yet better (lower MSE) than an unbiased one if it has much less variance. This trade-off is the subject of the [next lesson](bias-variance.md).

!!! example "The sample mean and variance"
    $\bar X = \frac1n\sum X_i$ is unbiased for $\mu$, with variance $\sigma^2/n$.

    The sample variance needs a correction: $\E\left[\sum_i(X_i - \bar X)^2\right] = (n - 1)\sigma^2$, so the unbiased estimator is $s^2 = \frac{1}{n-1}\sum_i(X_i - \bar X)^2$.

??? proof "Why $n - 1$ (deeper)"
    $\sum_i(X_i - \bar X)^2 = \sum_i(X_i - \mu)^2 - n(\bar X - \mu)^2$ (expand $X_i - \mu = (X_i - \bar X) + (\bar X - \mu)$; the cross term sums to zero because $\sum_i(X_i - \bar X) = 0$). Taking expectations: $n\sigma^2 - n\cdot\frac{\sigma^2}{n} = (n - 1)\sigma^2$.
    Intuition: deviations from $\bar X$ are systematically smaller than deviations from the true $\mu$, because $\bar X$ is fitted to the same data. One "degree of freedom" is used up estimating the mean.

## 2. Maximum likelihood

!!! definition "Definition: likelihood and MLE"
    For i.i.d. data, the **likelihood** of $\theta$ is the probability (or density) of the observed data as a function of $\theta$:

    $$
    L(\theta) = \prod_{i=1}^np(x_i\mid\theta).
    $$

    The **maximum likelihood estimate** is $\hat\theta_{\text{MLE}} = \argmax_\theta L(\theta) = \argmax_\theta\sum_{i=1}^n\log p(x_i\mid\theta)$.

We maximize the **log-likelihood** because log is increasing (same maximizer) and turns the product into a sum, which is easier to differentiate and numerically stable.

!!! warning "Likelihood is not a probability of θ"
    $L(\theta)$ is the probability of the *data* given $\theta$, read as a function of $\theta$. It doesn't integrate to 1 over $\theta$. Turning it into a distribution over $\theta$ requires a prior and Bayes' theorem (§5).

!!! example "Coin flips (Bernoulli)"
    Data: $k$ heads in $n$ flips. $\log L(\theta) = k\log\theta + (n - k)\log(1-\theta)$.
    $\frac{d}{d\theta}\log L = \frac k\theta - \frac{n-k}{1-\theta} = 0 \implies\hat\theta = \frac kn$.
    The MLE is the observed frequency, as intuition says.

!!! example "Gaussian"
    $\log L(\mu, \sigma^2) = -\frac n2\log(2\pi\sigma^2) - \frac{1}{2\sigma^2}\sum_i(x_i - \mu)^2$.
    Setting $\partial/\partial\mu = 0$ gives $\hat\mu = \bar x$. Setting $\partial/\partial\sigma^2 = 0$: $-\frac{n}{2\sigma^2} + \frac{1}{2\sigma^4}\sum(x_i - \mu)^2 = 0$, so $\hat\sigma^2 = \frac1n\sum(x_i - \bar x)^2$. (That's the *biased* version, dividing by $n$: MLEs need not be unbiased.)

## 3. MLE explains the standard loss functions

This is the most important section of the phase.

### Squared error = Gaussian noise

Model: $y = f_\theta(\vv x) + \epsilon$ with $\epsilon\sim\mathcal N(0, \sigma^2)$. Then $p(y\mid\vv x, \theta) = \frac{1}{\sqrt{2\pi}\sigma}\exp\!\left(-\frac{(y - f_\theta(\vv x))^2}{2\sigma^2}\right)$ and

$$
-\log L(\theta) = \frac{1}{2\sigma^2}\sum_{i=1}^n\big(y_i - f_\theta(\vv x_i)\big)^2 + \text{const}.
$$

**Maximizing Gaussian likelihood is exactly minimizing the sum of squared errors.** For linear $f_\theta$, that's least squares, $\hat{\vv w} = (X^\top X)^{-1}X^\top\vv y$.

### Cross-entropy = categorical likelihood

Model: a classifier outputs probabilities $\vv p_\theta(\vv x)$ over $K$ classes, and the label is drawn from that categorical distribution. The likelihood of label $y_i$ is $p_\theta(\vv x_i)_{y_i}$, so

$$
-\log L(\theta) = -\sum_{i=1}^n\log p_\theta(\vv x_i)_{y_i},
$$

which is exactly the **cross-entropy loss**. With a sigmoid and two classes, it's the **logistic loss**. A language model trained with "next-token cross-entropy" is doing maximum likelihood on text.

!!! intuition "Choose the noise model, get the loss"
    | Assumed distribution of $y$ | Negative log-likelihood (loss) |
    |---|---|
    | Gaussian | squared error |
    | Laplace | absolute error (robust to outliers) |
    | Bernoulli | binary cross-entropy (logistic loss) |
    | Categorical | cross-entropy (softmax loss) |
    | Poisson | Poisson loss $\hat y - y\log\hat y$ |

    A loss function is a hidden assumption about how the data is noisy.

## 4. Properties of the MLE

Under mild regularity conditions, as $n\to\infty$ the MLE is:

- **consistent:** $\hat\theta\to\theta$ in probability;
- **asymptotically normal:** $\hat\theta\approx\mathcal N\!\left(\theta, \frac{1}{nI(\theta)}\right)$, where $I(\theta) = -\E\left[\frac{\partial^2}{\partial\theta^2}\log p(X\mid\theta)\right]$ is the **Fisher information** (the expected curvature of the log-likelihood);
- **efficient:** no unbiased estimator does better asymptotically (the Cramér–Rao bound $\Var\geq\frac{1}{nI(\theta)}$).

Intuition: a sharply peaked log-likelihood (high curvature) pins down $\theta$ precisely. (The proofs combine the LLN, the CLT and a Taylor expansion of the score; they are outside the scope of this site.)

## 5. Bayesian inference and MAP

The Bayesian view treats $\theta$ itself as uncertain, with a **prior** $p(\theta)$. After seeing data $D$, Bayes' theorem gives the **posterior**:

$$
p(\theta\mid D) = \frac{p(D\mid\theta)\,p(\theta)}{p(D)}\propto\underbrace{p(D\mid\theta)}_{\text{likelihood}}\;\underbrace{p(\theta)}_{\text{prior}}.
$$

!!! theorem "Beta–Bernoulli conjugacy"
    With prior $\theta\sim\text{Beta}(\alpha, \beta)$ and $k$ heads in $n$ flips, the posterior is $\text{Beta}(\alpha + k,\ \beta + n - k)$.

!!! proof "Proof"
    Posterior $\propto\theta^k(1-\theta)^{n-k}\cdot\theta^{\alpha-1}(1-\theta)^{\beta-1} = \theta^{\alpha+k-1}(1-\theta)^{\beta+n-k-1}$, which is the Beta form. The normalizing constant takes care of itself.

So the prior acts like $\alpha$ "pseudo-heads" and $\beta$ "pseudo-tails" added to the real data. The posterior mean $\frac{\alpha + k}{\alpha + \beta + n}$ is a compromise between the prior mean and the observed frequency, and the data wins as $n$ grows.

<div class="viz" data-viz="mle"></div>

!!! definition "Definition: MAP estimate"
    The **maximum a posteriori** estimate is the posterior's peak:
    $$
    \hat\theta_{\text{MAP}} = \argmax_\theta\big[\log p(D\mid\theta) + \log p(\theta)\big].
    $$

### Regularization is a prior

Take Gaussian-noise regression with a Gaussian prior on the weights, $\vv w\sim\mathcal N(\vv 0, \tau^2I)$, so $\log p(\vv w) = -\frac{\norm{\vv w}^2}{2\tau^2} + \text{const}$:

$$
\hat{\vv w}_{\text{MAP}} = \argmin_{\vv w}\left[\frac{1}{2\sigma^2}\sum_i(y_i - \vv w^\top\vv x_i)^2 + \frac{1}{2\tau^2}\norm{\vv w}^2\right].
$$

That's **ridge regression / weight decay** with $\lambda = \sigma^2/\tau^2$. A Laplace prior $p(\vv w)\propto e^{-\norm{\vv w}_1/b}$ gives the **Lasso** ($\ell_1$ penalty). A tight prior (small $\tau$) means strong regularization.

!!! ml "Where this shows up"
    - **Every standard training objective** is a (regularized) negative log-likelihood: cross-entropy for classification and language modeling, MSE for regression, weight decay as a Gaussian prior.
    - **Label smoothing** and **dropout** have Bayesian interpretations as well.
    - **Bayesian neural networks**, **Gaussian processes**, and **Thompson sampling** in bandits keep the full posterior instead of just its peak, which gives calibrated uncertainty.
    - **A/B testing with Beta priors** is the conjugacy result above, used directly.

## Check yourself

**1.** Find the MLE of $\lambda$ for i.i.d. Poisson data $x_1, \ldots, x_n$.

??? success "Solution"
    $\log L = \sum(x_i\log\lambda - \lambda - \log x_i!)$. Derivative $\frac{\sum x_i}{\lambda} - n = 0$, so $\hat\lambda = \bar x$.

**2.** Find the MLE of $\lambda$ for i.i.d. exponential data.

??? success "Solution"
    $\log L = n\log\lambda - \lambda\sum x_i$. Derivative $\frac n\lambda - \sum x_i = 0$, so $\hat\lambda = 1/\bar x$.

**3.** You flip a coin 3 times and get 3 heads. What are the MLE and the MAP estimate with a $\text{Beta}(2, 2)$ prior?

??? success "Solution"
    MLE $= 1$ (absurdly confident). Posterior $\text{Beta}(5, 2)$, MAP $= \frac{5 - 1}{5 + 2 - 2} = 0.8$. The prior keeps you from concluding the coin can never land tails.

**4.** Show that with Laplace noise, $p(y\mid x)\propto e^{-|y - f(x)|/b}$, maximum likelihood minimizes the sum of absolute errors.

??? success "Solution"
    $-\log L = \frac1b\sum|y_i - f(x_i)| + \text{const}$.

**5.** Show that for i.i.d. $\mathcal N(\mu, \sigma^2)$ data with known $\sigma$, the Fisher information is $I(\mu) = 1/\sigma^2$, so the asymptotic variance of $\hat\mu$ is $\sigma^2/n$.

??? success "Solution"
    $\log p = -\frac{(x - \mu)^2}{2\sigma^2} + \text{const}$, $\frac{\partial^2}{\partial\mu^2}\log p = -\frac1{\sigma^2}$, so $I = 1/\sigma^2$ and $\frac{1}{nI} = \frac{\sigma^2}{n}$, which is exactly $\Var\bar X$. The sample mean is efficient.

**6.** In MAP regression, what happens to $\hat{\vv w}$ as $\tau\to\infty$? As $\tau\to0$?

??? success "Solution"
    $\tau\to\infty$: $\lambda\to0$, a flat prior, and MAP becomes ordinary least squares (MLE). $\tau\to0$: $\lambda\to\infty$, and $\hat{\vv w}\to\vv 0$: the prior overwhelms the data.
