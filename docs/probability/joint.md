# Several random variables

<div class="lesson-meta" markdown>
**Phase 5 · Lesson 5** · ⏱ ~3.5 hours · Needs: [The distribution zoo](distributions.md), [Multiple integrals](../multivariable/integrals.md), [Symmetric matrices](../linear-algebra/spectral.md)
</div>

Data points have many features, and the interesting questions are about how they *relate*:

- Does height predict weight?
- Is one feature redundant given another?

This lesson covers:

1. joint distributions;
2. covariance, the linear relationship between variables;
3. the covariance matrix;
4. the multivariate Gaussian, which brings together everything from linear algebra and probability so far.

## 1. Joint, marginal, conditional

!!! definition "Definitions"
    For two random variables $X, Y$:

    - **Joint** distribution: $p(x, y) = P(X = x, Y = y)$ (discrete), or a density $f(x, y)$ with $P((X,Y)\in R) = \iint_Rf\,dx\,dy$.
    - **Marginal:** $p_X(x) = \sum_yp(x, y)$, or $f_X(x) = \int f(x, y)\,dy$. Sum or integrate out the other variable.
    - **Conditional:** $p(y\mid x) = \dfrac{p(x, y)}{p_X(x)}$. Take the slice at $X = x$ and renormalize.
    - **Independent:** $p(x, y) = p_X(x)p_Y(y)$ for all $x, y$. The joint factorizes.

- The marginal formula is the law of total probability.
- The conditional formula is the definition of conditional probability, now for whole distributions.

Together they give:

| Rule | Formula |
|---|---|
| **product rule** | $p(x, y) = p(x)p(y\mid x)$ |
| **Bayes** | $p(y\mid x) = \frac{p(x\mid y)p(y)}{p(x)}$ |

!!! example "Example"
    | | $Y=0$ | $Y=1$ | $p_X$ |
    |---|---|---|---|
    | $X=0$ | 0.3 | 0.1 | 0.4 |
    | $X=1$ | 0.2 | 0.4 | 0.6 |
    | $p_Y$ | 0.5 | 0.5 | |

    - **Marginals** are the row and column sums.
    - **Conditional:** $P(Y = 1\mid X = 1) = 0.4/0.6 = \frac23$.
    - **Not independent:** $p(1,1) = 0.4 \neq 0.6\cdot0.5$.

    The whole conditional distribution of $Y$ given $X$, one row at a time (divide each row by its total):

    | | $Y = 0$ | $Y = 1$ |
    |---|---|---|
    | given $X = 0$ | $\frac{0.3}{0.4} = 0.75$ | $\frac{0.1}{0.4} = 0.25$ |
    | given $X = 1$ | $\frac{0.2}{0.6} = \frac13$ | $\frac{0.4}{0.6} = \frac23$ |

    Each row now sums to 1. Learning $X$ changes our prediction for $Y$, which is exactly what "not independent" means.

    For contrast, here's an independent table with the same marginals. Every cell is (row total) × (column total):

    | | $Y=0$ | $Y=1$ | $p_X$ |
    |---|---|---|---|
    | $X=0$ | 0.2 | 0.2 | 0.4 |
    | $X=1$ | 0.3 | 0.3 | 0.6 |
    | $p_Y$ | 0.5 | 0.5 | |

    Here both conditional rows are $(0.5, 0.5)$: knowing $X$ tells you nothing about $Y$.

**Continuous version.** If $(X, Y)$ is uniform on the unit square, $f(x, y) = 1$ there. The marginal $f_X(x) = \int_0^1 1\,dy = 1$: uniform on $[0, 1]$. And $f(x, y) = 1 = f_X(x)f_Y(y)$, so $X$ and $Y$ are independent. If instead $(X, Y)$ is uniform on the triangle $0 \leq y \leq x \leq 1$ (density 2), they're dependent: knowing $X = 0.1$ forces $Y \leq 0.1$.

**Expectation of a function of several variables:** $\E[g(X, Y)] = \sum_{x,y}g(x,y)p(x,y)$.

For independent $X$ and $Y$, **$\E[XY] = \E[X]\E[Y]$**, because the double sum factorizes.

## 2. Conditional expectation

$\E[Y\mid X = x] = \sum_yy\,p(y\mid x)$ is the mean of $Y$ within the slice $X = x$.

As a function of $X$, it's a random variable, $\E[Y\mid X]$.

!!! theorem "Law of total expectation"
    $$
    \E\big[\E[Y\mid X]\big] = \E[Y].
    $$

!!! proof "Proof (discrete)"
    $\sum_x p(x)\sum_y y\,p(y\mid x) = \sum_{x,y}y\,p(x, y) = \sum_y y\,p(y) = \E Y$.

Average the averages within each group, weighted by group size, and you get the overall average.

!!! example "Example: conditional expectations from the table"
    Using the conditional rows above:

    - $\E[Y\mid X = 0] = 0 \cdot 0.75 + 1\cdot 0.25 = 0.25$.
    - $\E[Y\mid X = 1] = 0\cdot\frac13 + 1\cdot\frac23 = \frac23$.

    So $\E[Y\mid X]$ is a random variable: it equals $0.25$ when $X = 0$ (probability 0.4) and $\frac23$ when $X = 1$ (probability 0.6). Its average:

    $$
    \E\big[\E[Y\mid X]\big] = 0.4 \cdot 0.25 + 0.6\cdot\tfrac23 = 0.1 + 0.4 = 0.5 = \E[Y]. \ ✓
    $$

The best predictor of $Y$ from $X$ under squared loss is $\E[Y\mid X]$. (That's the conditional version of "the mean minimizes squared error".)

So **regression is the estimation of conditional expectations**.

## 3. Covariance and correlation

!!! definition "Definition: covariance"
    $$
    \Cov(X, Y) = \E\big[(X - \mu_X)(Y - \mu_Y)\big] = \E[XY] - \E[X]\E[Y].
    $$

- **Positive** when $X$ and $Y$ tend to be above their means together.
- **Negative** when one tends to be above while the other is below.
- $\Cov(X, X) = \Var X$.
- Covariance is **bilinear**: $\Cov(aX + bY, Z) = a\Cov(X, Z) + b\Cov(Y, Z)$.

Why the sign works: the product $(X - \mu_X)(Y - \mu_Y)$ is positive when both are above their means *or* both below, and negative when they're on opposite sides. Covariance averages that product. Picture a scatter plot cut into four quadrants at the means: points in the top-right and bottom-left push the covariance up; the other two quadrants push it down.

The second formula comes from expanding and using linearity: $\E[XY - \mu_YX - \mu_XY + \mu_X\mu_Y] = \E[XY] - \mu_X\mu_Y - \mu_X\mu_Y + \mu_X\mu_Y = \E[XY] - \mu_X\mu_Y$.

!!! example "Example: covariance step by step"
    Four equally likely $(x, y)$ pairs: $(1, 2), (2, 3), (3, 5), (4, 6)$. Means: $\mu_X = 2.5$, $\mu_Y = 4$.

    | $x$ | $y$ | $x - 2.5$ | $y - 4$ | product |
    |---|---|---|---|---|
    | 1 | 2 | $-1.5$ | $-2$ | $3$ |
    | 2 | 3 | $-0.5$ | $-1$ | $0.5$ |
    | 3 | 5 | $0.5$ | $1$ | $0.5$ |
    | 4 | 6 | $1.5$ | $2$ | $3$ |

    $\Cov(X, Y) = \frac{3 + 0.5 + 0.5 + 3}{4} = 1.75$. Positive: big $x$ goes with big $y$.

    Check with the other formula: $\E[XY] = \frac{2 + 6 + 15 + 24}{4} = 11.75$, and $11.75 - 2.5 \cdot 4 = 1.75$. ✓

!!! theorem "Variance of a sum"
    $$
    \Var(X + Y) = \Var X + \Var Y + 2\Cov(X, Y).
    $$

    In general, $\Var\left(\sum_iX_i\right) = \sum_i\Var X_i + 2\sum_{i<j}\Cov(X_i, X_j)$.

!!! proof "Proof"
    $\Var(X + Y) = \Cov(X + Y, X + Y)$; expand by bilinearity.

    Like FOIL: $\Cov(X + Y, X + Y) = \Cov(X, X) + \Cov(X, Y) + \Cov(Y, X) + \Cov(Y, Y) = \Var X + 2\Cov(X, Y) + \Var Y$.

    It's the same algebra as $(a + b)^2 = a^2 + 2ab + b^2$, and as $\norm{\vv u + \vv v}^2$ in [Vectors](../linear-algebra/vectors.md).

If $X, Y$ are independent, then $\Cov = 0$ (since $\E XY = \E X\E Y$), and **variances add**.

For $n$ independent copies with variance $\sigma^2$:

- **Sum:** all covariances vanish, so $\Var(X_1 + \cdots + X_n) = \sigma^2 + \cdots + \sigma^2 = n\sigma^2$.
- **Average:** $\bar X$ is the sum times $\frac1n$, and scaling by $\frac1n$ multiplies variance by $\frac{1}{n^2}$. So $\Var\bar X = \frac{n\sigma^2}{n^2} = \frac{\sigma^2}{n}$.

| Quantity | Variance |
|---|---|
| the sum | $n\sigma^2$ |
| the average $\bar X = \frac1n\sum X_i$ | $\frac{\sigma^2}{n}$ |

Averaging reduces noise by a factor of $\sqrt n$ in standard deviation.

!!! definition "Definition: correlation"
    $$
    \rho(X, Y) = \frac{\Cov(X, Y)}{\sigma_X\sigma_Y}.
    $$

Dividing by the standard deviations removes the units. Covariance between height in cm and weight in kg is in "cm·kg" and changes if you switch to inches. Correlation is a pure number.

For the four points above: $\Var X = \frac{2.25 + 0.25 + 0.25 + 2.25}{4} = 1.25$ and $\Var Y = \frac{4 + 1 + 1 + 4}{4} = 2.5$, so

$$
\rho = \frac{1.75}{\sqrt{1.25}\sqrt{2.5}} = \frac{1.75}{1.768} \approx 0.99.
$$

Nearly perfectly linear, as the points suggest.

| $\rho$ | scatter plot looks like |
|---|---|
| $1$ | points exactly on a rising line |
| $0.7$ | a rising, cigar-shaped cloud |
| $0$ | no linear trend (a round blob, or a nonlinear pattern) |
| $-0.7$ | a falling cigar |
| $-1$ | points exactly on a falling line |

!!! theorem "Theorem"
    $-1 \leq\rho\leq1$, with $|\rho| = 1$ iff $Y = aX + b$ exactly.

!!! proof "Proof"
    Covariance behaves like a dot product of the centered variables: bilinear, symmetric, and $\Cov(X,X) \geq 0$.

    So the [Cauchy–Schwarz proof](../linear-algebra/vectors.md#4-cauchyschwarz-and-the-triangle-inequality) applies word for word: $|\Cov(X, Y)| \leq\sigma_X\sigma_Y$.

    Correlation is the cosine of the angle between the centered variables.

!!! warning "Uncorrelated does not mean independent"
    Let $X$ be uniform on $\{-1, 0, 1\}$ and $Y = X^2$.

    - $\Cov(X, Y) = \E[X^3] - \E X\E X^2 = 0 - 0 = 0$,
    - yet $Y$ is completely determined by $X$.

    **Correlation only measures *linear* relationships.**

## 4. The covariance matrix

For a random vector $\vv X = (X_1, \ldots, X_d)$ with mean $\boldsymbol\mu = \E\vv X$:

$$
\Sigma = \Cov(\vv X) = \E\big[(\vv X - \boldsymbol\mu)(\vv X - \boldsymbol\mu)^\top\big], \qquad \Sigma_{ij} = \Cov(X_i, X_j).
$$

(The expectation of a matrix means the expectation of each entry. The outer product $(\vv X - \boldsymbol\mu)(\vv X - \boldsymbol\mu)^\top$ has $(i, j)$ entry $(X_i - \mu_i)(X_j - \mu_j)$, whose expectation is $\Cov(X_i, X_j)$.)

So the variances sit on the diagonal and the covariances off it. For the four points above:

$$
\Sigma = \begin{pmatrix}\Var X & \Cov(X, Y)\\\Cov(Y, X) & \Var Y\end{pmatrix} = \begin{pmatrix}1.25 & 1.75\\1.75 & 2.5\end{pmatrix}.
$$

!!! theorem "Properties of the covariance matrix"
    1. $\Sigma$ is symmetric and **positive semidefinite**.
    2. For a fixed vector $\vv w$: $\Var(\vv w^\top\vv X) = \vv w^\top\Sigma\vv w$.
    3. For a fixed matrix $A$: $\Cov(A\vv X + \vv b) = A\Sigma A^\top$.

!!! proof "Proof"
    - **(3):** $A\vv X + \vv b - (A\boldsymbol\mu + \vv b) = A(\vv X - \boldsymbol\mu)$, so by linearity the covariance is $\E[A(\vv X - \boldsymbol\mu)(\vv X - \boldsymbol\mu)^\top A^\top] = A\Sigma A^\top$.
    - **(2)** is (3) with $A = \vv w^\top$.
    - **(1):** symmetric because $\Cov(X_i, X_j) = \Cov(X_j, X_i)$; PSD because $\vv w^\top\Sigma\vv w = \Var(\vv w^\top\vv X)\geq0$.

Property 2 in action: with the $\Sigma$ above, the variance of $X + Y$ (take $\vv w = (1, 1)$) is

$$
\vv w^\top\Sigma\vv w = 1.25 + 1.75 + 1.75 + 2.5 = 7.25,
$$

which matches the formula $\Var X + \Var Y + 2\Cov = 1.25 + 2.5 + 3.5$. The quadratic form is the variance-of-a-sum rule for any weights at once.

- The eigenvectors of $\Sigma$ are the directions of maximal and minimal variance: the principal components.
- Its eigenvalues are those variances.

That's [PCA](../linear-algebra/svd.md#4-pca-principal-component-analysis) again, now with a probabilistic meaning.

!!! ml "Why attention divides by √d"
    A Transformer's attention score is $\vv q\cdot\vv k = \sum_{i=1}^dq_ik_i$. Suppose the components are independent with mean 0 and variance 1.

    1. Each term $q_ik_i$ has mean 0 and variance $\E[q_i^2]\E[k_i^2] = 1$.
    2. So the sum has variance $d$ and standard deviation $\sqrt d$.
    3. For $d = 64$ the scores would be around $\pm8$, pushing the softmax into saturation where gradients vanish.
    4. Dividing by $\sqrt d$ restores unit variance.

    The same reasoning gives **Xavier/He initialization**: choose weight variance $\propto 1/\text{fan-in}$, so each layer's outputs keep roughly unit variance.

## 5. The multivariate Gaussian

!!! definition "Definition: multivariate normal"
    $\vv X\sim\mathcal N(\boldsymbol\mu, \Sigma)$ (with $\Sigma\succ0$) has density

    $$
    f(\vv x) = \frac{1}{\sqrt{(2\pi)^d\det\Sigma}}\exp\!\left(-\tfrac12(\vv x - \boldsymbol\mu)^\top\Sigma^{-1}(\vv x - \boldsymbol\mu)\right).
    $$

With $d = 1$, $\Sigma$ is just the number $\sigma^2$, and the formula is the familiar $\frac{1}{\sqrt{2\pi\sigma^2}}e^{-(x - \mu)^2/(2\sigma^2)}$: the quadratic form $(x - \mu)\frac{1}{\sigma^2}(x - \mu)$ is the old exponent.

**The 2D independent case.** If $\Sigma = \begin{pmatrix}\sigma_1^2 & 0\\0 & \sigma_2^2\end{pmatrix}$, then $\Sigma^{-1}$ is diagonal with entries $\frac{1}{\sigma_1^2}, \frac{1}{\sigma_2^2}$, and $\det\Sigma = \sigma_1^2\sigma_2^2$. The density becomes

$$
f(x_1, x_2) = \frac{1}{\sqrt{2\pi}\sigma_1}e^{-\frac{(x_1 - \mu_1)^2}{2\sigma_1^2}} \cdot \frac{1}{\sqrt{2\pi}\sigma_2}e^{-\frac{(x_2 - \mu_2)^2}{2\sigma_2^2}},
$$

a product of two 1D Gaussians. (An exponential of a sum is a product of exponentials.) Off-diagonal entries in $\Sigma$ tilt and stretch the bell into a slanted ellipse.

Read the formula with your linear algebra:

- The exponent is a **quadratic form**, so the level sets (contours of equal density) are **ellipsoids**, with axes along the eigenvectors of $\Sigma$ and half-lengths proportional to $\sqrt{\lambda_i}$.
- $\sqrt{\det\Sigma}$ in the normalizer is the volume of the ellipsoid ([Determinants](../linear-algebra/determinants.md)).
- In the eigenbasis of $\Sigma$, the density factorizes into independent 1D Gaussians with variances $\lambda_i$.

<div class="viz" data-viz="gaussian2d"></div>

**Key properties** (each provable with the tools above):

1. **Sampling:** if $\vv Z\sim\mathcal N(\vv 0, I)$ and $\Sigma = LL^\top$ (e.g. Cholesky), then $\boldsymbol\mu + L\vv Z\sim\mathcal N(\boldsymbol\mu, \Sigma)$.
    - Its covariance is $LIL^\top = \Sigma$, by property 3.
2. **Linear maps:** $A\vv X + \vv b\sim\mathcal N(A\boldsymbol\mu + \vv b, A\Sigma A^\top)$.
3. **Marginals** are Gaussian: just keep the corresponding entries of $\boldsymbol\mu$ and the block of $\Sigma$.
4. **Conditionals** are Gaussian. For a partition $\vv X = (\vv X_1, \vv X_2)$:

    $$
    \E[\vv X_1\mid\vv X_2 = \vv x_2] = \boldsymbol\mu_1 + \Sigma_{12}\Sigma_{22}^{-1}(\vv x_2 - \boldsymbol\mu_2), \qquad \Cov = \Sigma_{11} - \Sigma_{12}\Sigma_{22}^{-1}\Sigma_{21}.
    $$

    - The conditional mean is *linear* in what you observed. That's why linear regression is exactly right for Gaussian data.
5. **For Gaussians, uncorrelated ⇔ independent:** if $\Sigma$ is diagonal, the density factorizes.

!!! ml "Where this shows up"
    - **Gaussian processes** do regression by conditioning a big multivariate Gaussian on observed values, using property 4.
    - **VAEs and diffusion models** use $\mathcal N(\vv 0, I)$ latents and sample with the reparameterization $\boldsymbol\mu + \boldsymbol\sigma\odot\vv z$ (property 1).
    - **Kalman filters** track a Gaussian belief through linear dynamics (properties 2 and 4).
    - **Mahalanobis distance** $\sqrt{(\vv x - \boldsymbol\mu)^\top\Sigma^{-1}(\vv x - \boldsymbol\mu)}$ measures "how many standard deviations away" in a correlated cloud.
        - It is used for anomaly detection.

## Check yourself

**1.** For the table in §1, compute $\E X$, $\E Y$, $\E XY$ and $\Cov(X, Y)$.

??? success "Solution"
    - $\E X = 0.6$
    - $\E Y = 0.5$
    - $\E XY = P(X = 1, Y = 1) = 0.4$
    - $\Cov = 0.4 - 0.3 = 0.1 > 0$

**2.** $X$ and $Y$ have variances 4 and 9 and correlation $0.5$. Find $\Var(X + Y)$ and $\Var(X - Y)$.

??? success "Solution"
    - $\Cov = 0.5\cdot2\cdot3 = 3$
    - $\Var(X + Y) = 4 + 9 + 6 = 19$
    - $\Var(X - Y) = 4 + 9 - 6 = 7$

**3.** You average $n$ independent measurements, each with standard deviation 10. How large must $n$ be for the average to have standard deviation 1?

??? success "Solution"
    $10/\sqrt n = 1$, so $n = 100$.

    Ten times more precise costs a hundred times more data.

**4.** Let $\vv X\sim\mathcal N(\vv 0, I_2)$ and $\vv Y = A\vv X$ with $A = \begin{pmatrix}1 & 0\\1 & 1\end{pmatrix}$. Find $\Cov(\vv Y)$ and the correlation of $Y_1, Y_2$.

??? success "Solution"
    - $\Cov(\vv Y) = AA^\top = \begin{pmatrix}1 & 1\\1 & 2\end{pmatrix}$.
    - $\rho = \frac{1}{\sqrt{1\cdot2}} \approx 0.707$.

**5.** Prove $\E[XY] = \E X\,\E Y$ for independent discrete $X, Y$.

??? success "Solution"
    $\sum_{x,y}xy\,p_X(x)p_Y(y) = \left(\sum_xx\,p_X(x)\right)\left(\sum_yy\,p_Y(y)\right)$.

**6.** $(X, Y)$ is bivariate normal with means 0, variances 1 and correlation $\rho$. What is $\E[Y\mid X = x]$?

??? success "Solution"
    By property 4: $\Sigma_{12}\Sigma_{22}^{-1}x = \rho x$ (with the roles of the two blocks set so that we condition on $X$).

    - The regression line has slope $\rho$.
    - Since $|\rho| < 1$, the prediction is less extreme than $x$: "regression to the mean."
