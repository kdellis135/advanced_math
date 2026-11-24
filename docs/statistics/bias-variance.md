# Bias, variance and generalization

<div class="lesson-meta" markdown>
**Phase 6 · Lesson 2** · ⏱ ~3 hours · Needs: [Estimation, MLE and MAP](estimation.md), [Orthogonality and least squares](../linear-algebra/orthogonality.md)
</div>

A model that fits its training data perfectly can still be useless on new data. Why?

The **bias–variance decomposition** gives an exact answer. Test error splits into three parts:

| Part | Source |
|---|---|
| **noise** | irreducible randomness in the target |
| **bias** | systematic error from a too-simple model |
| **variance** | sensitivity to the particular training sample |

Regularization trades a little bias for a lot less variance.

## 1. The setup

- Data come from $y = f(\vv x) + \epsilon$, where $f$ is the true function and $\epsilon$ is noise with mean 0 and variance $\sigma^2$.
- We train a model $\hat f_D$ on a random training set $D$, and evaluate it at a fixed new point $\vv x$.

The randomness comes from two places:

1. which training set we happened to get;
2. the noise in the new $y$.

!!! intuition "The thought experiment behind $\E_D$"
    Imagine 1000 parallel worlds. In each, a different random training set $D$ is drawn from the same process, and the same learning algorithm is trained on it. That gives 1000 slightly different models $\hat f_D$.

    Now look at one test point $\vv x$:

    - The 1000 predictions $\hat f_D(\vv x)$ form a cloud of numbers. Its **average** is $\E_D[\hat f_D(\vv x)]$, and its **spread** is the variance.
    - **Bias** is how far that average sits from the truth $f(\vv x)$.

    In real life you only see one world. But this picture tells you what your single model is a sample *from*.

## 2. The decomposition

!!! theorem "Bias–variance decomposition"
    $$
    \E_{D,\epsilon}\Big[\big(y - \hat f_D(\vv x)\big)^2\Big] = \underbrace{\sigma^2}_{\text{noise}} + \underbrace{\Big(f(\vv x) - \E_D\big[\hat f_D(\vv x)\big]\Big)^2}_{\text{bias}^2} + \underbrace{\Var_D\big(\hat f_D(\vv x)\big)}_{\text{variance}}.
    $$

!!! proof "Proof"
    Write $\bar f = \E_D[\hat f_D(\vv x)]$, and drop the argument $\vv x$. Decompose the error into three pieces:

    $$
    y - \hat f_D = \underbrace{(y - f)}_{\epsilon} + \underbrace{(f - \bar f)}_{\text{constant}} + \underbrace{(\bar f - \hat f_D)}_{\text{mean 0}}.
    $$

    Square and take expectations. All three cross terms vanish, because:

    - the new noise $\epsilon$ is independent of $D$ and has mean 0;
    - $\bar f - \hat f_D$ has mean 0 over $D$.

    Explicitly, writing $a = \epsilon$, $b = f - \bar f$, $c = \bar f - \hat f_D$, the square is $a^2 + b^2 + c^2 + 2ab + 2ac + 2bc$, and:

    | Cross term | Expectation | Why it's zero |
    |---|---|---|
    | $2ab$ | $2b\,\E[\epsilon]$ | $b$ is a constant and $\E\epsilon = 0$ |
    | $2ac$ | $2\E[\epsilon]\E[c]$ | $\epsilon$ is independent of $D$, and $\E\epsilon = 0$ |
    | $2bc$ | $2b\,\E[c]$ | $\E_D[\bar f - \hat f_D] = \bar f - \bar f = 0$ |

    What remains is $\E\epsilon^2 + (f - \bar f)^2 + \E(\bar f - \hat f_D)^2$.

!!! example "Example: a biased estimator that wins"
    Estimate a mean $\mu = 1$ from data whose sample mean $\bar X$ has variance $\frac{\sigma^2}{n} = 1$ (small, noisy dataset). Consider the shrunken estimator $c\bar X$ for a constant $c$:

    - bias: $\E[c\bar X] - \mu = (c - 1)\mu = c - 1$;
    - variance: $c^2 \Var\bar X = c^2$;
    - MSE: $(c - 1)^2 + c^2$.

    | $c$ | bias² | variance | MSE |
    |---|---|---|---|
    | $1$ (unbiased $\bar X$) | $0$ | $1$ | $1$ |
    | $0.75$ | $0.0625$ | $0.5625$ | $0.625$ |
    | $0.5$ | $0.25$ | $0.25$ | $\mathbf{0.5}$ |
    | $0$ (always guess 0) | $1$ | $0$ | $1$ |

    Shrinking halfway toward zero halves the error. With little data, a bit of bias buys a big cut in variance. That's precisely what regularization does. (The best $c$ depends on the unknown $\mu$, which is why in practice $\lambda$ is tuned on validation data.)

!!! intuition "Darts"
    - **Bias:** your throws are centered in the wrong place. The model can't represent the truth.
    - **Variance:** your throws scatter. The model changes a lot with the training sample.
    - **Noise:** the target itself wobbles, and nobody can fix that.

## 3. Underfitting and overfitting

| Model | Bias | Variance | Training error | Test error |
|---|---|---|---|---|
| **Too simple** (a line for a curved relationship) | high | low | high | high |
| **Too flexible** (degree-13 polynomial through 14 points) | low | high | tiny | large |
| **Just right** (intermediate complexity) | moderate | moderate | moderate | lowest |

- Too simple: the model is wrong in the same way on every training set.
- Too flexible: it fits the noise, so it changes wildly with the sample.
- Just right: the sum of bias² and variance is minimized.

<div class="viz" data-viz="polyfit"></div>

Play with the figure:

1. As the degree increases, training error only goes down, but test error forms a **U-shape**.
2. Then, at high degree, raise λ and watch the test error come back down.

## 4. Regularization: ridge regression

Ridge regression adds a penalty on large weights:

$$
\hat{\vv w}_\lambda = \argmin_{\vv w}\norm{X\vv w - \vv y}^2 + \lambda\norm{\vv w}^2 = (X^\top X + \lambda I)^{-1}X^\top\vv y.
$$

(Derived in [Matrix calculus](../multivariable/matrix-calculus.md). It's MAP with a Gaussian prior, from [the previous lesson](estimation.md#regularization-is-a-prior).)

**One feature first.** With a single feature and no intercept, least squares gave $w = \frac{\sum x_iy_i}{\sum x_i^2}$ ([Using derivatives](../calculus/applications.md#4-an-optimization-example-least-squares-in-one-dimension)). Ridge gives

$$
w_\lambda = \frac{\sum x_iy_i}{\sum x_i^2 + \lambda}.
$$

The extra $\lambda$ in the denominator shrinks the slope toward 0. With the data $(1, 2), (2, 3), (3, 7)$ from that lesson: $w_0 = \frac{29}{14} \approx 2.07$, $\ w_1 = \frac{29}{15} \approx 1.93$, $\ w_{14} = \frac{29}{28} \approx 1.04$.

The shrinkage matters most when $\sum x_i^2$ is small, i.e. when the data say little about the slope. When $\sum x_i^2$ is huge, adding $\lambda$ barely changes anything. The SVD view below is this same idea, applied direction by direction.

**Why it reduces variance, seen through the SVD.** Write $X = U\Sigma V^\top$ with singular values $\sigma_i$. Then

$$
\hat{\vv w}_\lambda = \sum_i\frac{\sigma_i}{\sigma_i^2 + \lambda}(\vv u_i^\top\vv y)\,\vv v_i.
$$

Ordinary least squares ($\lambda = 0$) uses the factor $\frac{1}{\sigma_i}$, which **explodes for small singular values**. Directions in which the data barely varies get huge, noise-driven coefficients.

Ridge replaces $\frac1{\sigma_i}$ by $\frac{\sigma_i}{\sigma_i^2 + \lambda}$:

| Direction | Ridge factor | Effect |
|---|---|---|
| $\sigma_i^2\gg\lambda$ (well-determined) | $\approx\frac1{\sigma_i}$ | kept |
| $\sigma_i^2\ll\lambda$ (noisy) | $\approx 0$ | shrunk away |

That adds a little bias and removes a lot of variance.

??? proof "Derivation of the SVD form (deeper)"
    1. $X^\top X + \lambda I = V(\Sigma^\top\Sigma + \lambda I)V^\top$ and $X^\top\vv y = V\Sigma^\top U^\top\vv y$.
    2. Since $V$ is orthogonal, $(X^\top X + \lambda I)^{-1} = V(\Sigma^\top\Sigma + \lambda I)^{-1}V^\top$.
    3. Multiplying, the diagonal factor for direction $i$ is $\frac{\sigma_i}{\sigma_i^2 + \lambda}$.

Other regularizers:

| Regularizer | Effect |
|---|---|
| **Lasso** ($\ell_1$) | drives some weights exactly to zero (feature selection) |
| **early stopping** | limits how far gradient descent travels from the initialization; for linear models it behaves much like ridge |
| **dropout**, **data augmentation**, **weight decay** | play the same role in deep networks |

## 5. Choosing complexity: validation and cross-validation

You can't choose the degree or $\lambda$ by training error, which always prefers the most complex model. Hold out data:

- **Train / validation / test split:** fit on train, tune on validation, report once on test.
- **$k$-fold cross-validation:** split the data into $k$ folds; train on $k - 1$, evaluate on the remaining one, rotate through all $k$, and average. Uses all the data for both purposes, at $k$ times the cost.

!!! example "Example: 5-fold cross-validation to choose $\lambda$"
    1000 examples, split into 5 folds of 200.

    1. For each candidate $\lambda \in \{0.01, 0.1, 1, 10\}$:
        - train on folds 2–5, measure error on fold 1;
        - train on folds 1, 3–5, measure error on fold 2;
        - … and so on, 5 times in all;
        - average the 5 errors.
    2. Pick the $\lambda$ with the lowest average error.
    3. Retrain on all 1000 examples with that $\lambda$.

    Every example is used for validation exactly once, and for training 4 times.

Why a held-out estimate is trustworthy:

- It's an average of losses on examples the model never saw, so its expectation is the true risk.
- By [Hoeffding](../probability/limit-theorems.md#5-concentration-inequalities-hoeffding), it concentrates around it.

But only if you don't tune against it too many times: each peek leaks information.

## 6. Deep learning and "double descent"

Modern networks seem to contradict the U-curve:

- they have far more parameters than training examples;
- they interpolate the training data (zero training error);
- and they still generalize well.

Experiments show **double descent**:

1. Test error rises as the model approaches the interpolation threshold (just enough parameters to fit the data exactly).
2. Then it *falls again* as the model grows beyond it.

The explanation is still an active research area. A key ingredient:

- There are infinitely many interpolating solutions (recall the huge [null space](../linear-algebra/vector-spaces.md)).
- Gradient descent from a small initialization finds a particular one, often close to the **minimum-norm** solution (the [pseudoinverse](../linear-algebra/svd.md#5-the-pseudoinverse) solution in the linear case).
- Low norm acts as an implicit regularizer.

The bias–variance decomposition is still true. What changes is how variance behaves in the overparameterized regime.

!!! ml "Where this shows up"
    - **Every hyperparameter search** (learning rate, weight decay, depth, width, number of epochs) is navigating the bias–variance trade-off with a validation set.
    - **Ensembles** (random forests, model averaging, bagging) reduce variance.
        - Averaging $M$ models with uncorrelated errors cuts the variance term by up to a factor of $M$.
    - **Data scaling:** more data reduces variance (estimates converge like $1/\sqrt n$).
        - That's one reason larger datasets allow larger models.

## Check yourself

**1.** An estimator always outputs the constant 5, whatever the data. What are its bias and variance for a true value $\theta$?

??? success "Solution"
    - Bias: $5 - \theta$.
    - Variance: 0.

    It's perfect if $\theta = 5$ and useless otherwise: the extreme of low variance and high bias.

**2.** You average $M$ models, each with variance $v$ at a point, with pairwise correlation $\rho$ between their predictions. What's the variance of the average?

??? success "Solution"
    $$
    \Var\left(\frac1M\sum\hat f_m\right) = \frac{1}{M^2}\left(Mv + M(M-1)\rho v\right) = \rho v + \frac{1-\rho}{M}v.
    $$

    As $M\to\infty$ it tends to $\rho v$. Averaging only removes the *uncorrelated* part of the variance, which is why random forests decorrelate their trees.

**3.** Training error 2%, validation error 25%. Bias or variance problem? What would you try?

??? success "Solution"
    **Variance** (overfitting). Try:

    - more data, or augmentation;
    - stronger regularization (more weight decay or dropout);
    - a smaller model;
    - early stopping.

**4.** Training error 20%, validation error 21%, and humans achieve 2%. Bias or variance?

??? success "Solution"
    **Bias** (underfitting). Try:

    - a bigger or more expressive model;
    - better features;
    - longer training;
    - less regularization.

**5.** Show that ridge regression's solution always exists, even when $X^\top X$ is singular.

??? success "Solution"
    - $X^\top X$ is PSD, with eigenvalues $\geq0$.
    - So $X^\top X + \lambda I$ has eigenvalues $\geq\lambda > 0$, and is invertible.

**6.** In the SVD form, compute the ridge shrinkage factor $\frac{\sigma^2}{\sigma^2 + \lambda}$ (relative to least squares) for $\sigma = 10$ and $\sigma = 0.1$ with $\lambda = 1$.

??? success "Solution"
    | $\sigma$ | Factor | Effect |
    |---|---|---|
    | 10 | $\frac{100}{101}\approx0.99$ | barely shrunk |
    | 0.1 | $\frac{0.01}{1.01}\approx0.0099$ | almost entirely removed |
