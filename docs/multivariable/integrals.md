# Multiple integrals and change of variables

<div class="lesson-meta" markdown>
**Phase 4 · Lesson 5** · ⏱ ~3 hours · Needs: [Integrals](../calculus/integrals.md), [Determinants](../linear-algebra/determinants.md), [Jacobians](chain-rule.md)
</div>

Probability over several variables lives in multiple integrals:

- the probability that a 2D point lands in a region;
- the expected value of a function of several random variables;
- the normalizing constant of a multivariate Gaussian.

This lesson covers:

1. how to compute them;
2. how they behave when you change coordinates (the Jacobian determinant);
3. a beautiful application: computing $\int e^{-x^2}dx$, which has no antiderivative formula.

## 1. Double integrals

For $f(x,y)$ over a region $R$ of the plane, $\iint_R f\,dA$ is the limit of Riemann sums $\sum f(x_i, y_i)\,\Delta A_i$ over a grid of small rectangles.

For $f \geq 0$ it's the **volume** under the surface.

!!! theorem "Fubini's theorem"
    If $f$ is continuous on the rectangle $[a,b]\times[c,d]$ (or more generally, if $\iint|f| < \infty$), the double integral equals either iterated integral:

    $$
    \iint_R f\,dA = \int_a^b\left(\int_c^d f(x,y)\,dy\right)dx = \int_c^d\left(\int_a^b f(x,y)\,dx\right)dy.
    $$

!!! intuition "Slicing a loaf"
    1. Compute the area of each slice (the inner integral).
    2. Add up the slices (the outer integral).

    Slicing the other way gives the same volume. This is the continuous version of summing a table by rows or by columns.

!!! example "Example"
    $\displaystyle\int_0^1\!\!\int_0^2 xy^2\,dy\,dx = \int_0^1 x\left[\frac{y^3}{3}\right]_0^2dx = \int_0^1\frac{8x}{3}dx = \frac43.$

**Non-rectangular regions:** let the inner limits depend on the outer variable. For the triangle $0 \leq y \leq x \leq 1$:

| Slicing | Integral |
|---|---|
| $y$ inside | $\int_0^1\int_0^x f(x,y)\,dy\,dx$ |
| $x$ inside | $\int_0^1\int_y^1 f(x,y)\,dx\,dy$ |

Sketch the region to get the limits right.

**Separable functions:** if $f(x, y) = g(x)h(y)$ on a rectangle, then $\iint f = \left(\int g\right)\left(\int h\right)$.

This is exactly why the joint density of independent random variables is the product of their densities.

## 2. Change of variables

Sometimes a region or integrand is simpler in other coordinates, like polar coordinates for disks.

When we substitute $(x, y) = \vv T(u, v)$:

- a tiny rectangle $du\times dv$ in the $(u, v)$-plane maps to a tiny parallelogram;
- its area is scaled by the local area factor $|\det J_{\vv T}|$ ([Determinants](../linear-algebra/determinants.md), [Jacobians](chain-rule.md#1-the-jacobian-derivative-of-a-vector-function)).

!!! theorem "Change of variables formula"
    If $\vv T$ is a smooth one-to-one map from a region $S$ onto $R$ with continuous Jacobian, then

    $$
    \iint_R f(x,y)\,dx\,dy = \iint_S f\big(\vv T(u,v)\big)\,\big|\det J_{\vv T}(u,v)\big|\,du\,dv.
    $$

This is the multivariable version of substitution:

- in 1D, $dx = g'(u)\,du$;
- in $n$D, the stretching factor $g'(u)$ becomes $|\det J|$.

**Polar coordinates.** $x = r\cos\theta$, $y = r\sin\theta$, with $|\det J| = r$ (computed in the [Jacobian lesson](chain-rule.md)). So

$$
dx\,dy = r\,dr\,d\theta.
$$

Geometrically, the polar "rectangle" between radii $r$ and $r + dr$ and angles $\theta$ and $\theta + d\theta$ is approximately a rectangle of sides $dr$ and $r\,d\theta$ (arc length).

Cells far from the origin are bigger, hence the factor $r$.

!!! example "Example: area of a disk"
    $\iint_{x^2+y^2\leq R^2}1\,dA = \int_0^{2\pi}\int_0^R r\,dr\,d\theta = 2\pi\cdot\frac{R^2}{2} = \pi R^2$.

## 3. The Gaussian integral

$e^{-x^2}$ has no elementary antiderivative. Yet:

!!! theorem "The Gaussian integral"
    $$
    \int_{-\infty}^{\infty}e^{-x^2}dx = \sqrt\pi.
    $$

!!! proof "Proof (Poisson's trick)"
    Let $I = \int_{-\infty}^\infty e^{-x^2}dx$. Square it, and use a different variable name in the second copy:

    $$
    I^2 = \int_{-\infty}^\infty e^{-x^2}dx\int_{-\infty}^\infty e^{-y^2}dy = \iint_{\R^2}e^{-(x^2 + y^2)}\,dx\,dy.
    $$

    The integrand depends only on $r^2 = x^2 + y^2$, so switch to polar coordinates:

    $$
    I^2 = \int_0^{2\pi}\!\!\int_0^\infty e^{-r^2}\,r\,dr\,d\theta = 2\pi\left[-\tfrac12e^{-r^2}\right]_0^\infty = 2\pi\cdot\tfrac12 = \pi.
    $$

    The factor $r$ from the Jacobian is exactly what makes the inner integral doable ($u = r^2$).

    Since $I > 0$, $I = \sqrt\pi$.

**Consequence: the normal density integrates to 1.** Substituting $x = \frac{t - \mu}{\sqrt2\sigma}$ (so $dx = \frac{dt}{\sqrt2\sigma}$):

$$
\int_{-\infty}^\infty e^{-(t-\mu)^2/(2\sigma^2)}dt = \sqrt{2\sigma^2}\cdot\sqrt\pi = \sqrt{2\pi}\,\sigma.
$$

So

$$
p(t) = \frac{1}{\sqrt{2\pi}\,\sigma}e^{-(t-\mu)^2/(2\sigma^2)}
$$

is a valid probability density. That's where the famous $\frac{1}{\sqrt{2\pi}}$ comes from.

**In $n$ dimensions:**

- $\int_{\R^n}e^{-\frac12\vv x^\top\vv x}d\vv x = (2\pi)^{n/2}$, a product of $n$ one-dimensional integrals.
- For a general covariance, substitute $\vv x = L\vv u$ with $\Sigma = LL^\top$. The Jacobian determinant $|\det L| = \sqrt{\det\Sigma}$ appears.
- That gives the normalizer $\frac{1}{\sqrt{(2\pi)^n\det\Sigma}}$ of the multivariate Gaussian.

## 4. Change of variables for probability densities

Suppose $\vv X$ has density $p_X$ and $\vv Y = \vv T(\vv X)$ for an invertible smooth $\vv T$.

- Probability mass is conserved.
- Volumes are stretched by $|\det J_{\vv T}|$.

So

$$
p_Y(\vv y) = p_X\big(\vv T^{-1}(\vv y)\big)\,\left|\det J_{\vv T^{-1}}(\vv y)\right| = \frac{p_X(\vv x)}{|\det J_{\vv T}(\vv x)|}\Bigg|_{\vv x = \vv T^{-1}(\vv y)}.
$$

!!! example "Example: log-normal"
    $X\sim\mathcal N(0,1)$ and $Y = e^X$. Then $T^{-1}(y) = \ln y$ with derivative $1/y$, so

    $$
    p_Y(y) = \frac{1}{y\sqrt{2\pi}}e^{-(\ln y)^2/2}, \qquad y > 0.
    $$

!!! ml "Where this shows up"
    - **Normalizing flows** generate data by $\vv x = \vv T(\vv z)$ with $\vv z$ Gaussian.
        - They train by maximizing $\log p_X(\vv x) = \log p_Z(\vv z) - \log|\det J_{\vv T}(\vv z)|$, which is exactly the formula above.
    - **The reparameterization trick** in VAEs writes $\vv z = \boldsymbol\mu + \boldsymbol\sigma\odot\boldsymbol\epsilon$ with $\boldsymbol\epsilon\sim\mathcal N(0, I)$.
        - It's a change of variables that makes sampling differentiable.
    - **Expectations** over several variables, like $\E[f(X, Y)] = \iint f(x,y)p(x,y)\,dx\,dy$, are double integrals.
        - Fubini is what lets you integrate out one variable at a time ("marginalization").

## Check yourself

**1.** Compute $\int_0^1\int_0^1(x + y)^2\,dx\,dy$.

??? success "Solution"
    Expand: $\iint x^2 + 2xy + y^2 = \frac13 + 2\cdot\frac12\cdot\frac12 + \frac13 = \frac76$.

**2.** Reverse the order of integration in $\int_0^1\int_x^1 e^{y^2}dy\,dx$ and evaluate.

??? success "Solution"
    The region is $0 \leq x \leq y \leq 1$. Reversed:

    $$
    \int_0^1\int_0^y e^{y^2}dx\,dy = \int_0^1ye^{y^2}dy = \tfrac12(e - 1).
    $$

    (The original order is impossible to do by hand.)

**3.** Compute $\iint_{x^2+y^2\leq1}(x^2 + y^2)\,dA$.

??? success "Solution"
    Polar: $\int_0^{2\pi}\int_0^1 r^2\cdot r\,dr\,d\theta = 2\pi\cdot\frac14 = \frac\pi2$.

**4.** Compute $\int_{-\infty}^\infty x^2e^{-x^2/2}dx$. (Hint: parts with $u = x$.)

??? success "Solution"
    $$
    \big[-xe^{-x^2/2}\big]_{-\infty}^\infty + \int e^{-x^2/2}dx = 0 + \sqrt{2\pi}.
    $$

    Dividing by $\sqrt{2\pi}$ shows the standard normal has variance 1.

**5.** $X$ is uniform on $[0,1]$. Find the density of $Y = -\ln X$.

??? success "Solution"
    - $X = e^{-Y}$, so $|dx/dy| = e^{-y}$.
    - So $p_Y(y) = 1\cdot e^{-y}$ for $y \geq 0$: the exponential distribution.

    This is how computers sample exponentials from uniform random numbers.

**6.** Find the Jacobian determinant of spherical coordinates $(r, \theta, \varphi) \mapsto (r\sin\varphi\cos\theta,\ r\sin\varphi\sin\theta,\ r\cos\varphi)$ and use it to get the volume of a ball of radius $R$.

??? success "Solution"
    $|\det J| = r^2\sin\varphi$ (expand the $3\times3$ determinant). So

    $$
    \text{Volume} = \int_0^{2\pi}\!\!\int_0^\pi\!\!\int_0^R r^2\sin\varphi\,dr\,d\varphi\,d\theta = 2\pi\cdot2\cdot\frac{R^3}{3} = \frac43\pi R^3.
    $$
