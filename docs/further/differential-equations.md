---
description: "Differential equations explained: exponential growth and decay, separable and linear first-order equations, oscillations, systems via eigenvalues and Euler's method."
---

# Differential equations

<div class="lesson-meta" markdown>
**Phase 10 · Lesson 1** · ⏱ ~4 hours · Needs: [Derivatives](../calculus/derivatives.md), [Complex numbers](../foundations/complex-numbers.md), [Eigenvalues and eigenvectors](../linear-algebra/eigen.md)
</div>

A differential equation describes a system by its **rule of change**: how fast the population grows given its size, how a spring accelerates given its stretch. The solution is the trajectory that obeys the rule.

Just three ideas cover a lot:

1. exponentials solve $y' = ky$;
2. complex exponentials turn oscillations into algebra;
3. eigenvalues decouple systems of equations.

## 1. The most important equation: $y' = ky$

"The rate of change is proportional to the amount": population growth, radioactive decay, compound interest, cooling, charging capacitors.

!!! theorem "Theorem"
    The solutions of $y'(t) = ky(t)$ are exactly $y(t) = Ce^{kt}$, with $C = y(0)$.

!!! proof "Proof"
    **It works:** the derivative of $Ce^{kt}$ is $kCe^{kt}$.

    **Nothing else works:** take any solution $y$, and consider $g(t) = y(t)e^{-kt}$.

    1. $g' = y'e^{-kt} - ky\,e^{-kt} = (y' - ky)e^{-kt} = 0$.
    2. So $g$ is constant (by the [MVT corollary](../calculus/applications.md#2-the-mean-value-theorem)).
    3. So $y = g\cdot e^{kt}$.

| $k$ | Behavior | Characteristic time |
|---|---|---|
| $k > 0$ | exponential growth | doubling time $\frac{\ln2}{k}$ |
| $k < 0$ | exponential decay | half-life $\frac{\ln2}{\lvert k\rvert}$ |

Where the doubling time comes from: $Ce^{kt} = 2C$ means $e^{kt} = 2$, so $kt = \ln 2$ and $t = \frac{\ln 2}{k}$. It doesn't depend on $C$. The time to double is the same whether you start with 10 bacteria or 10 million.

!!! intuition "One rule, many solutions"
    The equation $y' = ky$ is a rule: "at every moment, the slope equals $k$ times the height." It doesn't say where you start.

    Every $C$ gives a curve that obeys the rule. The **initial condition** $y(0)$ picks one of them:

    | Start $y(0)$ | Solution of $y' = 0.5y$ |
    |---|---|
    | $1$ | $e^{0.5t}$ |
    | $3$ | $3e^{0.5t}$ |
    | $0$ | $0$ (stays at zero forever) |
    | $-1$ | $-e^{0.5t}$ (runs away downward) |

    This is typical. A first-order equation plus one starting value pins down a unique solution. A second-order equation (§3) needs two: a starting position and a starting velocity.

!!! example "Example: carbon dating"
    Carbon-14 decays with a half-life of 5730 years, so $k = -\frac{\ln 2}{5730}$.

    What fraction is left after 10,000 years?

    $$
    e^{kt} = e^{-\frac{\ln 2}{5730}\cdot10000} = 2^{-10000/5730} = 2^{-1.745}\approx0.298.
    $$

    About 30% remains. Run this backwards: measure the fraction left in a bone, and solve for $t$.

## 2. First-order equations: two techniques

**Separable equations** $y' = f(t)g(y)$: separate and integrate,

$$
\int\frac{dy}{g(y)} = \int f(t)\,dt.
$$

!!! example "Logistic growth"
    $y' = ky(1 - y)$: growth slowed by limited resources, with capacity 1.

    Separating with partial fractions gives $y(t) = \frac{1}{1 + Ae^{-kt}}$, which is the **sigmoid** function! It starts out exponential, then saturates.

    The steps:

    1. Separate: $\ \dfrac{dy}{y(1 - y)} = k\,dt$.
    2. Partial fractions: $\ \dfrac{1}{y(1 - y)} = \dfrac1y + \dfrac{1}{1 - y}$. (Check by adding the right side over a common denominator.)
    3. Integrate both sides: $\ \ln y - \ln(1 - y) = kt + c$.
    4. Combine the logs: $\ \ln\dfrac{y}{1 - y} = kt + c$, so $\dfrac{y}{1 - y} = Be^{kt}$ with $B = e^c$.
    5. Solve for $y$: $\ y = \dfrac{Be^{kt}}{1 + Be^{kt}} = \dfrac{1}{1 + Ae^{-kt}}$, with $A = \frac1B$ (divide top and bottom by $Be^{kt}$).

    Step 4 says the **log-odds** $\ln\frac{y}{1-y}$ grow linearly in time. That's exactly the relationship between a logit and a probability in [logistic regression](../statistics/estimation.md).

**Linear equations** $y' + a(t)y = b(t)$:

1. Multiply by the **integrating factor** $\mu = e^{\int a\,dt}$.
2. The left side becomes $(\mu y)'$ (product rule).
3. So $\mu y = \int\mu b\,dt$.

Why step 2 works: $(\mu y)' = \mu y' + \mu' y$, and $\mu' = a\mu$ (the chain rule on $e^{\int a}$). So $(\mu y)' = \mu(y' + ay)$, which is exactly the left side times $\mu$.

!!! example "Example: $y' + 2y = e^{-t}$"
    1. Integrating factor: $\ \mu = e^{\int 2\,dt} = e^{2t}$.
    2. Multiply through: $\ e^{2t}y' + 2e^{2t}y = e^{2t}e^{-t} = e^{t}$.
    3. The left side is $(e^{2t}y)'$, so $\ (e^{2t}y)' = e^t$.
    4. Integrate: $\ e^{2t}y = e^t + C$.
    5. Divide: $\ y = e^{-t} + Ce^{-2t}$.

    Check: $y' = -e^{-t} - 2Ce^{-2t}$, and $y' + 2y = -e^{-t} - 2Ce^{-2t} + 2e^{-t} + 2Ce^{-2t} = e^{-t}$. ✓

!!! example "Newton's law of cooling"
    $T' = -k(T - T_{\text{room}})$.

    The substitution $u = T - T_{\text{room}}$ gives $u' = -ku$, so

    $$
    T(t) = T_{\text{room}} + (T_0 - T_{\text{room}})e^{-kt}.
    $$

    Coffee approaches room temperature exponentially.

    With $T_0 = 90$°C, $T_{\text{room}} = 20$°C and $k = 0.1$ per minute:

    | Minutes | 0 | 5 | 10 | 20 | 30 |
    |---|---|---|---|---|---|
    | Temperature (°C) | 90 | 62.5 | 45.8 | 29.5 | 23.5 |

    It's the *gap* to room temperature that decays exponentially: 70°, then 42.5°, 25.8°, 9.5°, 3.5°. The coffee cools fast at first and slowly at the end.

    When is it drinkable at 60°C? Solve $20 + 70e^{-0.1t} = 60$: $\ e^{-0.1t} = \frac47$, so $t = 10\ln\frac74\approx5.6$ minutes.

## 3. Second-order linear equations: oscillations

A mass $m$ on a spring (stiffness $k$) with friction (damping $c$), by Newton's second law:

$$
mx'' + cx' + kx = 0\quad\Longleftrightarrow\quad x'' + 2\zeta\omega x' + \omega^2x = 0,
$$

with natural frequency $\omega = \sqrt{k/m}$ and damping ratio $\zeta = \frac{c}{2\sqrt{km}}$.

**Method:** guess $x = e^{rt}$.

- Then $x' = re^{rt}$ and $x'' = r^2e^{rt}$.
- Dividing by $e^{rt}$ gives the **characteristic equation**:

$$
r^2 + 2\zeta\omega r + \omega^2 = 0\quad\Longrightarrow\quad r = -\zeta\omega\pm\omega\sqrt{\zeta^2 - 1}.
$$

The equation is linear, so sums of solutions are solutions. The general solution is $x = Ae^{r_1t} + Be^{r_2t}$ (when $r_1\neq r_2$).

Three regimes:

| Regime | Roots | Behavior |
|---|---|---|
| **Overdamped** ($\zeta > 1$) | two negative reals | slow return, no oscillation |
| **Critically damped** ($\zeta = 1$) | double root $r = -\omega$; solution $(A + Bt)e^{-\omega t}$ | fastest return without overshooting (what car suspensions aim for) |
| **Underdamped** ($\zeta < 1$) | complex: $r = -\zeta\omega\pm i\omega_d$, $\ \omega_d = \omega\sqrt{1 - \zeta^2}$ | oscillation inside a decaying envelope |

!!! example "Example: the three regimes with $\omega = 1$"
    The characteristic equation is $r^2 + 2\zeta r + 1 = 0$, so $r = -\zeta\pm\sqrt{\zeta^2 - 1}$.

    | $\zeta$ | Roots | Solution | Behavior |
    |---|---|---|---|
    | $2$ | $-0.27$ and $-3.73$ | $Ae^{-0.27t} + Be^{-3.73t}$ | creeps back; the slow root $-0.27$ dominates |
    | $1$ | $-1$ (double) | $(A + Bt)e^{-t}$ | returns fastest with no overshoot |
    | $0.5$ | $-0.5\pm0.866i$ | $e^{-0.5t}(A\cos0.866t + B\sin0.866t)$ | swings past zero, smaller each time |
    | $0$ | $\pm i$ | $A\cos t + B\sin t$ | oscillates forever (no friction) |

    Overdamping is *slower* than critical damping: too much friction makes the spring sluggish. That's the first row's $-0.27$ versus the second row's $-1$.

In the underdamped case, [Euler's formula](../foundations/complex-numbers.md#3-eulers-formula) gives $e^{rt} = e^{-\zeta\omega t}(\cos\omega_dt\pm i\sin\omega_dt)$, and the real solutions are

$$
x(t) = e^{-\zeta\omega t}\big(A\cos\omega_dt + B\sin\omega_dt\big):
$$

<div class="viz" data-viz="ode"></div>

**Fitting the constants.** Pull the spring to $x(0) = 1$ and let go, so $x'(0) = 0$. With $\zeta = 0.5$, $\omega = 1$ (so $\omega_d\approx0.866$):

1. At $t = 0$: $\ x(0) = A = 1$.
2. Differentiate: $\ x'(t) = e^{-0.5t}\big((-0.5A + 0.866B)\cos0.866t + (-0.866A - 0.5B)\sin0.866t\big)$.
3. At $t = 0$: $\ x'(0) = -0.5A + 0.866B = 0$, so $B = \frac{0.5}{0.866}\approx0.577$.

So $x(t) = e^{-0.5t}(\cos0.866t + 0.577\sin0.866t)$. Two unknowns, two starting conditions.

!!! intuition "Complex exponentials turn calculus into algebra"
    - The real part of the root sets the decay rate.
    - The imaginary part sets the oscillation frequency.

    Differentiating $e^{rt}$ just multiplies by $r$, so a differential equation becomes a polynomial equation.

    This is the same trick behind Laplace and Fourier transforms, and the reason electrical engineers work with complex impedances.

## 4. Systems: eigenvalues decouple everything

Many interacting quantities: $\vv x' = A\vv x$.

- Guess $\vv x = e^{\lambda t}\vv v$.
- Then $\lambda e^{\lambda t}\vv v = Ae^{\lambda t}\vv v$, i.e. $A\vv v = \lambda\vv v$.

**Exponential solutions correspond to eigenvectors.**

!!! theorem "Solution of $\vv x' = A\vv x$"
    If $A$ has eigenvalues $\lambda_i$ with independent eigenvectors $\vv v_i$, then

    $$
    \vv x(t) = c_1e^{\lambda_1t}\vv v_1 + \cdots + c_ne^{\lambda_nt}\vv v_n,
    $$

    where the $c_i$ are the coordinates of $\vv x(0)$ in the eigenbasis.

    In matrix form, $\vv x(t) = e^{At}\vv x(0)$ with $e^{At} = Ve^{\Lambda t}V^{-1}$.

In the eigenbasis, the coupled system splits into $n$ independent copies of $y' = \lambda y$.

!!! example "Example: two rooms sharing heat"
    $x_1, x_2$ are the temperatures of two rooms (above outdoors). Each loses heat outside and exchanges heat with the other:

    $$
    \vv x' = \begin{pmatrix}-2 & 1\\1 & -2\end{pmatrix}\vv x, \qquad \vv x(0) = \begin{pmatrix}1\\0\end{pmatrix}.
    $$

    1. **Eigenvalues:** $\det(A - \lambda I) = (\lambda + 2)^2 - 1 = 0$, so $\lambda = -1$ or $-3$.
    2. **Eigenvectors:** $\lambda = -1$ gives $\vv v_1 = (1, 1)$ (both rooms equal). $\lambda = -3$ gives $\vv v_2 = (1, -1)$ (one warm, one cold).
    3. **Start in the eigenbasis:** $(1, 0) = \frac12(1, 1) + \frac12(1, -1)$, so $c_1 = c_2 = \frac12$.
    4. **Solution:**

    $$
    \vv x(t) = \tfrac12e^{-t}\begin{pmatrix}1\\1\end{pmatrix} + \tfrac12e^{-3t}\begin{pmatrix}1\\-1\end{pmatrix}.
    $$

    Read it physically:

    - The **average** temperature decays at rate 1 (heat leaking outdoors).
    - The **difference** between the rooms decays at rate 3: three times faster, because the rooms also equalize with each other.

    After a short while the $e^{-3t}$ term is gone, and both rooms cool together as $\frac12e^{-t}$.

Compare with the discrete version $\vv x_{k+1} = A\vv x_k$ from [Eigenvalues](../linear-algebra/eigen.md#4-powers-and-dynamics), where $\lambda^k$ played the role of $e^{\lambda t}$.

**Stability:** $\vv x(t)\to\vv 0$ for every start iff **every eigenvalue has negative real part**.

| Eigenvalue | Effect |
|---|---|
| negative real part | decay |
| positive real part | growth |
| nonzero imaginary part | rotation or oscillation |

(Discrete-time stability needs $|\lambda| < 1$ instead.)

The oscillator above is the system

$$
\begin{pmatrix}x\\v\end{pmatrix}' = \begin{pmatrix}0 & 1\\-\omega^2 & -2\zeta\omega\end{pmatrix}\begin{pmatrix}x\\v\end{pmatrix},
$$

whose eigenvalues are exactly the characteristic roots. (The first row says $x' = v$, which just defines the velocity. The second row says $v' = -\omega^2x - 2\zeta\omega v$, which is the spring equation. Its characteristic polynomial is $\det\begin{pmatrix}-\lambda & 1\\-\omega^2 & -2\zeta\omega - \lambda\end{pmatrix} = \lambda^2 + 2\zeta\omega\lambda + \omega^2$.)

Every higher-order equation can be rewritten this way, as a first-order system, by adding the derivatives as extra variables. The right panel of the figure shows the trajectory in this $(x, v)$ phase plane: a spiral when the eigenvalues are complex.

## 5. Solving numerically: Euler's method

Most differential equations have no closed-form solution.

The simplest numerical method follows the tangent line for a small step $h$:

$$
\vv x_{k+1} = \vv x_k + h\,\vv f(\vv x_k)\qquad\text{for }\vv x' = \vv f(\vv x).
$$

| Method | Error per step | Accumulated error |
|---|---|---|
| Euler | $O(h^2)$ (Taylor) | $O(h)$ |
| **Runge–Kutta 4** (used by the figure above) | $O(h^5)$ | $O(h^4)$ |

Runge–Kutta gets its accuracy by sampling the slope at several points per step.

!!! example "Example: Euler's method on $y' = -y$, $y(0) = 1$"
    Each step is $y_{k+1} = y_k + h(-y_k) = (1 - h)\,y_k$. The exact answer is $e^{-t}$.

    With $h = 0.5$:

    | $t$ | 0.5 | 1.0 | 1.5 | 2.0 |
    |---|---|---|---|---|
    | Euler | $0.5$ | $0.25$ | $0.125$ | $0.0625$ |
    | exact | $0.607$ | $0.368$ | $0.223$ | $0.135$ |

    At $t = 2$, the error for each step size:

    | Step $h$ | Euler at $t = 2$ | Error |
    |---|---|---|
    | $0.5$ | $0.0625$ | $0.073$ |
    | $0.2$ | $0.8^{10}\approx0.107$ | $0.028$ |
    | $0.1$ | $0.9^{20}\approx0.122$ | $0.014$ |

    Halving $h$ roughly halves the error: that's the $O(h)$ accumulated error.

    With $h = 2.5$, the multiplier is $1 - 2.5 = -1.5$. The iterates go $-1.5, 2.25, -3.375, \ldots$, blowing up even though the true solution decays. That's the instability in the next box: $h\cdot\lvert\lambda\rvert = 2.5 > 2$.

!!! intuition "Gradient descent is Euler's method"
    The **gradient flow** ODE $\vv x' = -\nabla f(\vv x)$ moves continuously downhill.

    - Euler's method with step $h = \eta$ gives $\vv x_{k+1} = \vv x_k - \eta\nabla f(\vv x_k)$: exactly gradient descent.
    - Euler's method is unstable when $h$ times the largest $|\lambda|$ exceeds 2.
    - That's the learning-rate limit $\eta < 2/L$ from [Phase 7](../optimization/gradient-descent.md#3-why-ill-conditioning-hurts), seen from the ODE side.

!!! ml "Where this shows up"
    - **Diffusion models** generate images by solving a learned ODE or stochastic differential equation backward in time, from noise to data.
        - Faster samplers are better numerical integrators.
    - **Neural ODEs** define a network's hidden state as the solution of $\vv h' = f_\theta(\vv h, t)$.
        - A ResNet's $\vv h_{k+1} = \vv h_k + f(\vv h_k)$ is Euler's method for such an ODE.
    - **State-space models** (S4, Mamba) are discretized linear ODEs $\vv x' = A\vv x + B\vv u$.
        - Their long-range memory depends on the eigenvalues of $A$ having real parts close to (but below) zero.
    - **Physics-informed ML** and simulation surrogates learn solutions of differential equations from data.

## Check yourself

**1.** A bacteria culture doubles every 3 hours. Find $k$ in $y' = ky$, and how long until it is 1000 times its initial size.

??? success "Solution"
    - $k = \frac{\ln2}{3}\approx0.231$ per hour.
    - $1000 = e^{kt}$ gives $t = \frac{\ln1000}{k} = 3\log_21000\approx29.9$ hours.

    That's about 10 doublings, since $2^{10}\approx1000$.

**2.** Solve $y' = -2y + 4$ with $y(0) = 0$.

??? success "Solution"
    1. Let $u = y - 2$. Then $u' = -2u$ and $u(0) = -2$.
    2. So $u = -2e^{-2t}$, and $y = 2 - 2e^{-2t}$.

    It approaches 2.

**3.** Classify $x'' + 4x' + 4x = 0$ and $x'' + 2x' + 5x = 0$, and solve the second.

??? success "Solution"
    | Equation | Roots | Regime | Solution |
    |---|---|---|---|
    | $x'' + 4x' + 4x = 0$ | $(r + 2)^2 = 0$: double root | critically damped | $(A + Bt)e^{-2t}$ |
    | $x'' + 2x' + 5x = 0$ | $r = -1\pm2i$ | underdamped | $e^{-t}(A\cos2t + B\sin2t)$ |

**4.** Solve $\vv x' = \begin{pmatrix}-1 & 0\\0 & -3\end{pmatrix}\vv x$ with $\vv x(0) = (1, 1)$. Is the origin stable?

??? success "Solution"
    The matrix is diagonal, so the system is already decoupled: $\vv x(t) = (e^{-t}, e^{-3t})$.

    - Stable: both eigenvalues are negative.
    - The second coordinate decays faster.

**5.** For which $\eta$ is Euler's method on $y' = -10y$ stable? Relate this to gradient descent on $f(y) = 5y^2$.

??? success "Solution"
    - Euler: $y_{k+1} = (1 - 10\eta)y_k$, stable iff $|1 - 10\eta| < 1$, i.e. $0 < \eta < 0.2$.
    - Gradient descent on $f = 5y^2$ (with $f' = 10y$, $L = 10$) is the same iteration, with the same limit $2/L$.

**6.** The eigenvalues of a system matrix are $-0.1\pm5i$. Describe the motion.

??? success "Solution"
    - **Imaginary part 5:** oscillation with angular frequency 5 (period $2\pi/5\approx1.26$).
    - **Real part $-0.1$:** slow decay, with time constant 10.

    It spirals inward in the phase plane.
