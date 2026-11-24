# Several random variables

<div class="lesson-meta" markdown>
**Phase 5 · Lesson 5** · ⏱ ~3.5 hours · Needs: [The distribution zoo](distributions.md), [Multiple integrals](../multivariable/integrals.md), [Symmetric matrices](../linear-algebra/spectral.md)
</div>

Data points have many features, and the interesting questions are about how they *relate*. Does height predict weight? Is one feature redundant given another? This lesson covers joint distributions, covariance (the linear relationship between variables), the covariance matrix, and the multivariate Gaussian, which brings together everything from linear algebra and probability so far.

## 1. Joint, marginal, conditional

!!! definition "Definitions"
    For two random variables $X, Y$:

    - **Joint** distribution: $p(x, y) = P(X = x, Y = y)$ (discrete), or a density $f(x, y)$ with $P((X,Y)\in R) = \iint_Rf\,dx\,dy$.
    - **Marginal:** $p_X(x) = \sum_yp(x, y)$, or $f_X(x) = \int f(x, y)\,dy$. Sum or integrate out the other variable.
    - **Conditional:** $p(y\mid x) = \dfrac{p(x, y)}{p_X(x)}$. Take the slice at $X = x$ and renormalize.
    - **Independent:** $p(x, y) = p_X(x)p_Y(y)$ for all $x, y$. The joint factorizes.

The marginal formula is the law of total probability; the conditional formula is the definition of conditional probability, now for whole distributions. Together they give the **product rule** $p(x, y) = p(x)p(y\mid x)$ and **Bayes** $p(y\mid x) = \frac{p(x\mid y)p(y)}{p(x)}$.

!!! example "Example"
    | | $Y=0$ | $Y=1$ | $p_X$ |
    |---|---|---|---|
    | $X=0$ | 0.3 | 0.1 | 0.4 |
    | $X=1$ | 0.2 | 0.4 | 0.6 |
    | $p_Y$ | 0.5 | 0.5 | |

    Marginals are the row and column sums. $P(Y = 1\mid X = 1) = 0.4/0.6 = \frac23$. Not independent: $p(1,1) = 0.4 \neq 0.6\cdot0.5$.

**Expectation of a function of several variables:** $\E[g(X, Y)] = \sum_{x,y}g(x,y)p(x,y)$. For independent $X$ and $Y$, **$\E[XY] = \E[X]\E[Y]$**, because the double sum factorizes.

## 2. Conditional expectation

$\E[Y\mid X = x] = \sum_yy\,p(y\mid x)$ is the mean of $Y$ within the slice $X = x$. As a function of $X$ it's a random variable, $\E[Y\mid X]$.

!!! theorem "Law of total expectation"
    $$
    \E\big[\E[Y\mid X]\big] = \E[Y].
    $$

!!! proof "Proof (discrete)"
    $\sum_x p(x)\sum_y y\,p(y\mid x) = \sum_{x,y}y\,p(x, y) = \sum_y y\,p(y) = \E Y$.

Average the averages within each group, weighted by group size, and you get the overall average. The best predictor of $Y$ from $X$ under squared loss is $\E[Y\mid X]$ (the conditional version of "the mean minimizes squared error"), so **regression is the estimation of conditional expectations**.

## 3. Covariance and correlation

!!! definition "Definition: covariance"
    $$
    \Cov(X, Y) = \E\big[(X - \mu_X)(Y - \mu_Y)\big] = \E[XY] - \E[X]\E[Y].
    $$

Positive when $X$ and $Y$ tend to be above their means together, negative when one tends to be above while the other is below. $\Cov(X, X) = \Var X$. Covariance is **bilinear**: $\Cov(aX + bY, Z) = a\Cov(X, Z) + b\Cov(Y, Z)$.

!!! theorem "Variance of a sum"
    $$
    \Var(X + Y) = \Var X + \Var Y + 2\Cov(X, Y).
    $$

    In general, $\Var\left(\sum_iX_i\right) = \sum_i\Var X_i + 2\sum_{i<j}\Cov(X_i, X_j)$.

!!! proof "Proof"
    $\Var(X + Y) = \Cov(X + Y, X + Y)$; expand by bilinearity.

If $X, Y$ are independent, then $\Cov = 0$ (since $\E XY = \E X\E Y$), and **variances add**. For $n$ independent copies with variance $\sigma^2$, the sum has variance $n\sigma^2$ and the average $\bar X = \frac1n\sum X_i$ has variance $\frac{\sigma^2}{n}$. Averaging reduces noise by a factor of $\sqrt n$ in standard deviation.

!!! definition "Definition: correlation"
    $$
    \rho(X, Y) = \frac{\Cov(X, Y)}{\sigma_X\sigma_Y}.
    $$

!!! theorem "Theorem"
    $-1 \leq\rho\leq1$, with $|\rho| = 1$ iff $Y = aX + b$ exactly.

!!! proof "Proof"
    Covariance behaves like a dot product of the centered variables (bilinear, symmetric, $\Cov(X,X) \geq 0$), so the [Cauchy–Schwarz proof](../linear-algebra/vectors.md#4-cauchyschwarz-and-the-triangle-inequality) applies word for word: $|\Cov(X, Y)| \leq\sigma_X\sigma_Y$. Correlation is the cosine of the angle between the centered variables.

!!! warning "Uncorrelated does not mean independent"
    Let $X$ be uniform on $\{-1, 0, 1\}$ and $Y = X^2$. Then $\Cov(X, Y) = \E[X^3] - \E X\E X^2 = 0 - 0 = 0$, yet $Y$ is completely determined by $X$. **Correlation only measures *linear* relationships.**

## 4. The covariance matrix

For a random vector $\vv X = (X_1, \ldots, X_d)$ with mean $\boldsymbol\mu = \E\vv X$:

$$
\Sigma = \Cov(\vv X) = \E\big[(\vv X - \boldsymbol\mu)(\vv X - \boldsymbol\mu)^\top\big], \qquad \Sigma_{ij} = \Cov(X_i, X_j).
$$

!!! theorem "Properties of the covariance matrix"
    1. $\Sigma$ is symmetric and **positive semidefinite**.
    2. For a fixed vector $\vv w$: $\Var(\vv w^\top\vv X) = \vv w^\top\Sigma\vv w$.
    3. For a fixed matrix $A$: $\Cov(A\vv X + \vv b) = A\Sigma A^\top$.

!!! proof "Proof"
    (3): $A\vv X + \vv b - (A\boldsymbol\mu + \vv b) = A(\vv X - \boldsymbol\mu)$, so the covariance is $\E[A(\vv X - \boldsymbol\mu)(\vv X - \boldsymbol\mu)^\top A^\top] = A\Sigma A^\top$ by linearity.
    (2) is (3) with $A = \vv w^\top$.
    (1): symmetric because $\Cov(X_i, X_j) = \Cov(X_j, X_i)$; PSD because $\vv w^\top\Sigma\vv w = \Var(\vv w^\top\vv X)\geq0$.

The eigenvectors of $\Sigma$ are the directions of maximal and minimal variance (the principal components), and its eigenvalues are those variances. That's [PCA](../linear-algebra/svd.md#4-pca-principal-component-analysis) again, now with a probabilistic meaning.

!!! ml "Why attention divides by √d"
    A Transformer's attention score is $\vv q\cdot\vv k = \sum_{i=1}^dq_ik_i$. If the components are independent with mean 0 and variance 1, each term $q_ik_i$ has mean 0 and variance $\E[q_i^2]\E[k_i^2] = 1$, so the sum has variance $d$ and standard deviation $\sqrt d$. For $d = 64$ the scores would be around $\pm8$, pushing the softmax into saturation where gradients vanish. Dividing by $\sqrt d$ restores unit variance. Same reasoning gives **Xavier/He initialization**: choose weight variance $\propto 1/\text{fan-in}$ so each layer's outputs keep roughly unit variance.

## 5. The multivariate Gaussian

!!! definition "Definition: multivariate normal"
    $\vv X\sim\mathcal N(\boldsymbol\mu, \Sigma)$ (with $\Sigma\succ0$) has density

    $$
    f(\vv x) = \frac{1}{\sqrt{(2\pi)^d\det\Sigma}}\exp\!\left(-\tfrac12(\vv x - \boldsymbol\mu)^\top\Sigma^{-1}(\vv x - \boldsymbol\mu)\right).
    $$

Read the formula with your linear algebra:

- The exponent is a **quadratic form**, so the level sets (contours of equal density) are **ellipsoids**, with axes along the eigenvectors of $\Sigma$ and half-lengths proportional to $\sqrt{\lambda_i}$.
- $\sqrt{\det\Sigma}$ in the normalizer is the volume of the ellipsoid ([Determinants](../linear-algebra/determinants.md)).
- In the eigenbasis of $\Sigma$, the density factorizes into independent 1D Gaussians with variances $\lambda_i$.

<div class="viz" data-viz="gaussian2d"></div>

**Key properties** (each provable with the tools above):

1. **Sampling:** if $\vv Z\sim\mathcal N(\vv 0, I)$ and $\Sigma = LL^\top$ (e.g. Cholesky), then $\boldsymbol\mu + L\vv Z\sim\mathcal N(\boldsymbol\mu, \Sigma)$. (Its covariance is $LIL^\top = \Sigma$ by property 3.)
2. **Linear maps:** $A\vv X + \vv b\sim\mathcal N(A\boldsymbol\mu + \vv b, A\Sigma A^\top)$.
3. **Marginals** are Gaussian: just keep the corresponding entries of $\boldsymbol\mu$ and the block of $\Sigma$.
4. **Conditionals** are Gaussian. For a partition $\vv X = (\vv X_1, \vv X_2)$:
   $\E[\vv X_1\mid\vv X_2 = \vv x_2] = \boldsymbol\mu_1 + \Sigma_{12}\Sigma_{22}^{-1}(\vv x_2 - \boldsymbol\mu_2)$, with covariance $\Sigma_{11} - \Sigma_{12}\Sigma_{22}^{-1}\Sigma_{21}$.
   The conditional mean is *linear* in what you observed, which is why linear regression is exactly right for Gaussian data.
5. **For Gaussians, uncorrelated ⇔ independent:** if $\Sigma$ is diagonal, the density factorizes.

!!! ml "Where this shows up"
    - **Gaussian processes** do regression by conditioning a big multivariate Gaussian on observed values, using property 4.
    - **VAEs and diffusion models** use $\mathcal N(\vv 0, I)$ latents and sample with the reparameterization $\boldsymbol\mu + \boldsymbol\sigma\odot\vv z$ (property 1).
    - **Kalman filters** track a Gaussian belief through linear dynamics (properties 2 and 4).
    - **Mahalanobis distance** $\sqrt{(\vv x - \boldsymbol\mu)^\top\Sigma^{-1}(\vv x - \boldsymbol\mu)}$ measures "how many standard deviations away" in a correlated cloud, and is used for anomaly detection.

## Check yourself

**1.** For the table in §1, compute $\E X$, $\E Y$, $\E XY$ and $\Cov(X, Y)$.

??? success "Solution"
    $\E X = 0.6$, $\E Y = 0.5$, $\E XY = P(X = 1, Y = 1) = 0.4$. $\Cov = 0.4 - 0.3 = 0.1 > 0$.

**2.** $X$ and $Y$ have variances 4 and 9 and correlation $0.5$. Find $\Var(X + Y)$ and $\Var(X - Y)$.

??? success "Solution"
    $\Cov = 0.5\cdot2\cdot3 = 3$. $\Var(X + Y) = 4 + 9 + 6 = 19$; $\Var(X - Y) = 4 + 9 - 6 = 7$.

**3.** You average $n$ independent measurements, each with standard deviation 10. How large must $n$ be for the average to have standard deviation 1?

??? success "Solution"
    $10/\sqrt n = 1$, so $n = 100$. Ten times more precise costs a hundred times more data.

**4.** Let $\vv X\sim\mathcal N(\vv 0, I_2)$ and $\vv Y = A\vv X$ with $A = \begin{pmatrix}1 & 0\\1 & 1\end{pmatrix}$. Find $\Cov(\vv Y)$ and the correlation of $Y_1, Y_2$.

??? success "Solution"
    $AA^\top = \begin{pmatrix}1 & 1\\1 & 2\end{pmatrix}$. $\rho = \frac{1}{\sqrt{1\cdot2}} \approx 0.707$.

**5.** Prove $\E[XY] = \E X\,\E Y$ for independent discrete $X, Y$.

??? success "Solution"
    $\sum_{x,y}xy\,p_X(x)p_Y(y) = \left(\sum_xx\,p_X(x)\right)\left(\sum_yy\,p_Y(y)\right)$.

**6.** $(X, Y)$ is bivariate normal with means 0, variances 1 and correlation $\rho$. What is $\E[Y\mid X = x]$?

??? success "Solution"
    By property 4: $\Sigma_{12}\Sigma_{22}^{-1}x = \rho x$ (with the roles of the two blocks set so that we condition on $X$). The regression line has slope $\rho$. Since $|\rho| < 1$ the prediction is less extreme than $x$: "regression to the mean."
