# Bias, variance and generalization

<div class="lesson-meta" markdown>
**Phase 6 · Lesson 2** · ⏱ ~3 hours · Needs: [Estimation, MLE and MAP](estimation.md), [Orthogonality and least squares](../linear-algebra/orthogonality.md)
</div>

A model that fits its training data perfectly can still be useless on new data. Why? The **bias–variance decomposition** gives an exact answer: test error splits into irreducible noise, systematic error from a too-simple model (bias), and sensitivity to the particular training sample (variance). Regularization trades a little bias for a lot less variance.

## 1. The setup

Data come from $y = f(\vv x) + \epsilon$, where $f$ is the true function and $\epsilon$ is noise with mean 0 and variance $\sigma^2$. We train a model $\hat f_D$ on a random training set $D$ and evaluate it at a fixed new point $\vv x$. The randomness comes from two places: which training set we happened to get, and the noise in the new $y$.

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

    Square and take expectations. The new noise $\epsilon$ is independent of $D$ and has mean 0, and $\bar f - \hat f_D$ has mean 0 over $D$, so all three cross terms vanish. What remains is $\E\epsilon^2 + (f - \bar f)^2 + \E(\bar f - \hat f_D)^2$.

!!! intuition "Darts"
    **Bias:** your throws are centered in the wrong place (the model can't represent the truth). **Variance:** your throws scatter (the model changes a lot with the training sample). **Noise:** the target itself wobbles, and nobody can fix that.

## 3. Underfitting and overfitting

- **Too simple** (e.g. a line for a curved relationship): high bias, low variance. The model is wrong in the same way on every training set. Training and test errors are both high.
- **Too flexible** (e.g. a degree-13 polynomial through 14 points): low bias, high variance. It fits the noise, so it changes wildly with the sample. Training error is tiny, test error is large.
- **Just right:** the sum of bias² and variance is minimized at intermediate complexity.

<div class="viz" data-viz="polyfit"></div>

Play with the figure: as the degree increases, training error only goes down, but test error forms a **U-shape**. Then, at high degree, raise λ and watch the test error come back down.

## 4. Regularization: ridge regression

Ridge regression adds a penalty on large weights:

$$
\hat{\vv w}_\lambda = \argmin_{\vv w}\norm{X\vv w - \vv y}^2 + \lambda\norm{\vv w}^2 = (X^\top X + \lambda I)^{-1}X^\top\vv y.
$$

(Derived in [Matrix calculus](../multivariable/matrix-calculus.md); it's MAP with a Gaussian prior, from [the previous lesson](estimation.md#regularization-is-a-prior).)

**Why it reduces variance, seen through the SVD.** Write $X = U\Sigma V^\top$ with singular values $\sigma_i$. Then

$$
\hat{\vv w}_\lambda = \sum_i\frac{\sigma_i}{\sigma_i^2 + \lambda}(\vv u_i^\top\vv y)\,\vv v_i.
$$

Ordinary least squares ($\lambda = 0$) uses the factor $\frac{1}{\sigma_i}$, which **explodes for small singular values**. Directions in which the data barely varies get huge, noise-driven coefficients. Ridge replaces $\frac1{\sigma_i}$ by $\frac{\sigma_i}{\sigma_i^2 + \lambda}$, which is close to $\frac1{\sigma_i}$ when $\sigma_i^2\gg\lambda$ and close to $0$ when $\sigma_i^2\ll\lambda$. It keeps the well-determined directions and shrinks the noisy ones. That adds a little bias and removes a lot of variance.

??? proof "Derivation of the SVD form (deeper)"
    $X^\top X + \lambda I = V(\Sigma^\top\Sigma + \lambda I)V^\top$ and $X^\top\vv y = V\Sigma^\top U^\top\vv y$. Since $V$ is orthogonal, $(X^\top X + \lambda I)^{-1} = V(\Sigma^\top\Sigma + \lambda I)^{-1}V^\top$. Multiplying, the diagonal factor for direction $i$ is $\frac{\sigma_i}{\sigma_i^2 + \lambda}$.

Other regularizers: **Lasso** ($\ell_1$) drives some weights exactly to zero (feature selection); **early stopping** limits how far gradient descent travels from the initialization (for linear models it behaves much like ridge); **dropout**, **data augmentation** and **weight decay** play the same role in deep networks.

## 5. Choosing complexity: validation and cross-validation

You can't choose the degree or $\lambda$ by training error, which always prefers the most complex model. Hold out data:

- **Train / validation / test split:** fit on train, tune on validation, report once on test.
- **$k$-fold cross-validation:** split the data into $k$ folds; train on $k - 1$, evaluate on the remaining one, rotate through all $k$, and average. Uses all the data for both purposes, at $k$ times the cost.

Why a held-out estimate is trustworthy: it's an average of losses on examples the model never saw, so its expectation is the true risk, and by [Hoeffding](../probability/limit-theorems.md#5-concentration-inequalities-hoeffding) it concentrates around it. But only if you don't tune against it too many times: each peek leaks information.

## 6. Deep learning and "double descent"

Modern networks have far more parameters than training examples, interpolate the training data (zero training error), and still generalize well, seemingly contradicting the U-curve. Experiments show **double descent**: test error rises as the model approaches the interpolation threshold (just enough parameters to fit the data exactly), then *falls again* as the model grows beyond it.

The explanation is still an active research area. A key ingredient: among the infinitely many interpolating solutions (recall the huge [null space](../linear-algebra/vector-spaces.md)), gradient descent from a small initialization finds a particular one, often close to the **minimum-norm** solution (the [pseudoinverse](../linear-algebra/svd.md#5-the-pseudoinverse) solution in the linear case). Low norm acts as an implicit regularizer. The bias–variance decomposition is still true; what changes is how variance behaves in the overparameterized regime.

!!! ml "Where this shows up"
    - **Every hyperparameter search** (learning rate, weight decay, depth, width, number of epochs) is navigating the bias–variance trade-off with a validation set.
    - **Ensembles** (random forests, model averaging, bagging) reduce variance: averaging $M$ models with uncorrelated errors cuts the variance term by up to a factor of $M$.
    - **Data scaling:** more data reduces variance (estimates converge like $1/\sqrt n$), which is one reason larger datasets allow larger models.

## Check yourself

**1.** An estimator always outputs the constant 5, whatever the data. What are its bias and variance for a true value $\theta$?

??? success "Solution"
    Bias $5 - \theta$, variance 0. It's perfect if $\theta = 5$ and useless otherwise: the extreme of low variance and high bias.

**2.** You average $M$ models, each with variance $v$ at a point, with pairwise correlation $\rho$ between their predictions. What's the variance of the average?

??? success "Solution"
    $\Var\left(\frac1M\sum\hat f_m\right) = \frac{1}{M^2}\left(Mv + M(M-1)\rho v\right) = \rho v + \frac{1-\rho}{M}v$. As $M\to\infty$ it tends to $\rho v$: averaging only removes the *uncorrelated* part of the variance, which is why random forests decorrelate their trees.

**3.** Training error 2%, validation error 25%. Bias or variance problem? What would you try?

??? success "Solution"
    Variance (overfitting). Try more data, augmentation, stronger regularization (more weight decay or dropout), a smaller model, or early stopping.

**4.** Training error 20%, validation error 21%, and humans achieve 2%. Bias or variance?

??? success "Solution"
    Bias (underfitting). Try a bigger or more expressive model, better features, longer training, or less regularization.

**5.** Show that ridge regression's solution always exists, even when $X^\top X$ is singular.

??? success "Solution"
    $X^\top X$ is PSD with eigenvalues $\geq0$, so $X^\top X + \lambda I$ has eigenvalues $\geq\lambda > 0$ and is invertible.

**6.** In the SVD form, compute the ridge shrinkage factor $\frac{\sigma^2}{\sigma^2 + \lambda}$ (relative to least squares) for $\sigma = 10$ and $\sigma = 0.1$ with $\lambda = 1$.

??? success "Solution"
    $\frac{100}{101}\approx0.99$: barely shrunk. $\frac{0.01}{1.01}\approx0.0099$: almost entirely removed.
