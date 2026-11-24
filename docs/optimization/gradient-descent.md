# Gradient descent and friends

<div class="lesson-meta" markdown>
**Phase 7 · Lesson 2** · ⏱ ~4 hours · Needs: [Convexity and Jensen](convexity.md), [The Hessian](../multivariable/hessian.md), [Limit theorems](../probability/limit-theorems.md) (for SGD)
</div>

Gradient descent is the simplest optimization algorithm, and in its stochastic form it trains nearly every neural network.

This lesson:

1. proves *why* it converges, and *how fast*;
2. explains the role of the learning rate and the condition number;
3. builds up the practical variants: SGD, momentum and Adam.

## 1. The algorithm

$$
\vv x_{k+1} = \vv x_k - \eta\,\nabla f(\vv x_k).
$$

We need to know two things:

- how large $\eta$ can be;
- how quickly $f(\vv x_k)$ approaches the minimum $f^* = f(\vv x^*)$.

## 2. Smoothness and the descent lemma

!!! definition "Definition: L-smooth"
    $f$ is **$L$-smooth** if its gradient is $L$-Lipschitz:

    $$
    \norm{\nabla f(\vv x) - \nabla f(\vv y)}\leq L\norm{\vv x - \vv y}.
    $$

    For twice-differentiable $f$, this means the Hessian's eigenvalues are at most $L$ in absolute value: curvature is bounded.

In words: **the slope can't change too abruptly.** Moving a distance $d$ changes the gradient by at most $L d$.

Examples:

- $f(x) = \frac{a}{2}x^2$ has $f'(x) = ax$, so $\lvert f'(x) - f'(y)\rvert = a\lvert x - y\rvert$: it's $L$-smooth with $L = a$, the curvature.
- $f(x, y) = \frac12(x^2 + 10y^2)$ has Hessian $\diag(1, 10)$, so $L = 10$: set by the steepest direction.
- $f(x) = \lvert x\rvert$ is **not** smooth: its slope jumps from $-1$ to $+1$ at $0$, however close you look.

!!! theorem "Descent lemma"
    If $f$ is $L$-smooth:

    $$
    f(\vv y)\leq f(\vv x) + \nabla f(\vv x)^\top(\vv y - \vv x) + \frac L2\norm{\vv y - \vv x}^2.
    $$

!!! proof "Proof"
    By the fundamental theorem of calculus along the segment, with $\vv d = \vv y - \vv x$:

    $$
    f(\vv y) - f(\vv x) - \nabla f(\vv x)^\top\vv d = \int_0^1\big(\nabla f(\vv x + t\vv d) - \nabla f(\vv x)\big)^\top\vv d\,dt\leq\int_0^1Lt\norm{\vv d}^2dt = \frac L2\norm{\vv d}^2,
    $$

    using Cauchy–Schwarz and the Lipschitz condition.

    The first equality: $g(t) = f(\vv x + t\vv d)$ has $g'(t) = \nabla f(\vv x + t\vv d)^\top \vv d$ by the chain rule, and $f(\vv y) - f(\vv x) = g(1) - g(0) = \int_0^1 g'(t)\,dt$. Subtracting the constant $\nabla f(\vv x)^\top\vv d$ (which integrates to itself over $[0, 1]$) gives the integrand shown. The inequality: the gradient at distance $t\norm{\vv d}$ differs from $\nabla f(\vv x)$ by at most $Lt\norm{\vv d}$, and then Cauchy–Schwarz bounds the dot product with $\vv d$.

The function sits *below* a quadratic upper bound touching it at $\vv x$. Gradient descent minimizes that bound.

(In 1D: the bound is a parabola with curvature $L$ that touches $f$ at $x$ and lies above it everywhere. Since $f$ curves *at most* as much as $L$, it can't escape above.)

Plug in $\vv y = \vv x - \eta\nabla f(\vv x)$, so $\vv y - \vv x = -\eta\nabla f$. Writing $\vv g = \nabla f(\vv x_k)$:

- the linear term is $\vv g^\top(-\eta\vv g) = -\eta\norm{\vv g}^2$;
- the quadratic term is $\frac L2\norm{-\eta\vv g}^2 = \frac{L\eta^2}{2}\norm{\vv g}^2$.

Together:

$$
f(\vv x_{k+1})\leq f(\vv x_k) - \eta\left(1 - \frac{L\eta}{2}\right)\norm{\nabla f(\vv x_k)}^2.
$$

With $\eta \leq \frac1L$, the bracket is at least $1 - \frac12 = \frac12$, which gives the next theorem.

!!! theorem "Sufficient decrease"
    With $0 < \eta\leq\frac1L$, every step decreases $f$ by at least $\frac\eta2\norm{\nabla f(\vv x_k)}^2$.

This holds **even for non-convex $f$**. Summing over $k$ steps gives

$$
\min_{i<k}\norm{\nabla f(\vv x_i)}^2\leq\frac{2(f(\vv x_0) - f^*)}{\eta k}.
$$

(The decreases add up: $\frac\eta2\sum_{i<k}\norm{\nabla f(\vv x_i)}^2 \leq f(\vv x_0) - f(\vv x_k) \leq f(\vv x_0) - f^*$. You can't descend more than the total height available. The smallest of $k$ terms is at most their average, so divide by $k$.)

Gradient descent always finds an approximately stationary point, at rate $O(1/k)$.

That's all you can say without convexity: the point could be a saddle or a local minimum.

## 3. Why ill-conditioning hurts

Take the quadratic $f(\vv x) = \frac12\vv x^\top A\vv x$ with $A\succ0$, and eigenvalues from $\lambda_{\min} = \mu$ to $\lambda_{\max} = L$.

Then $\nabla f = A\vv x$, and gradient descent is

$$
\vv x_{k+1} = (I - \eta A)\vv x_k.
$$

In the eigenbasis of $A$, each coordinate evolves independently:

$$
y_{i,k+1} = (1 - \eta\lambda_i)\,y_{i,k}.
$$

(Write $\vv x_k = \sum_i y_{i,k}\vv q_i$ with orthonormal eigenvectors $\vv q_i$. Then $(I - \eta A)\vv q_i = (1 - \eta\lambda_i)\vv q_i$, so each component just gets multiplied by its own factor, exactly as for powers of a matrix in [Eigenvalues](../linear-algebra/eigen.md#4-powers-and-dynamics).)

!!! example "Example: watching the two coordinates"
    $f(x, y) = \frac12(x^2 + 10y^2)$, so $\lambda = 1$ for $x$ and $\lambda = 10$ for $y$. Start at $(1, 1)$.

    | $\eta$ | factor for $x$ | factor for $y$ | after 10 steps $(x, y)$ |
    |---|---|---|---|
    | $0.05$ | $0.95$ | $0.5$ | $(0.60, 0.001)$ |
    | $0.15$ | $0.85$ | $-0.5$ | $(0.20, 0.001)$ |
    | $0.19$ | $0.81$ | $-0.9$ | $(0.12, 0.35)$ |
    | $0.21$ | $0.79$ | $-1.1$ | $(0.09, 2.59)$: diverging |

    A bigger $\eta$ helps the slow $x$-direction, but the fast $y$-direction sets the ceiling at $\eta < 0.2$. Negative factors mean $y$ flips sign each step: that's the zigzag.

So:

- **Stability:** we need $|1 - \eta\lambda_i| < 1$ for all $i$, i.e. $0 < \eta < \frac{2}{L}$.
    - Above $\frac2L$, the steepest direction oscillates with growing amplitude and diverges.
- **Speed:** the slowest coordinate shrinks by $|1 - \eta\mu|$ per step.
    - Even with the best choice $\eta = \frac{2}{L + \mu}$, the contraction factor is

$$
\frac{L - \mu}{L + \mu} = \frac{\kappa - 1}{\kappa + 1}, \qquad\kappa = \frac L\mu\ \text{(the condition number)}.
$$

Where the best $\eta$ comes from: the overall speed is set by the *worse* of the two extreme factors, $\lvert 1 - \eta\mu\rvert$ (slowest direction) and $\lvert 1 - \eta L\rvert$ (steepest direction). Increasing $\eta$ improves the first and worsens the second. The best compromise makes them equal: $1 - \eta\mu = \eta L - 1$, so $\eta = \frac{2}{L + \mu}$, and then the common factor is $1 - \frac{2\mu}{L + \mu} = \frac{L - \mu}{L + \mu}$.

With $\kappa = 100$ that's $0.98$ per step: about 115 steps to gain each factor of 10. (Solve $0.98^k = 0.1$: $k = \frac{\ln 0.1}{\ln 0.98} \approx 114$.)

**Gradient descent's speed is governed by the condition number:**

- the learning rate is capped by the steepest direction;
- progress is limited by the flattest.

<div class="viz" data-viz="gd"></div>

!!! intuition "The zigzag"
    In a long narrow valley, the gradient points mostly *across* the valley (steep walls), not *along* it (gentle floor). Steps bounce from wall to wall while creeping along the floor.

    Try $\eta\approx0.15$–$0.19$ on the narrow valley above, and then $\eta > 0.2$.

## 4. Convergence theorems

!!! theorem "Convex, L-smooth"
    If $f$ is convex and $L$-smooth, and $\eta = \frac1L$:

    $$
    f(\vv x_k) - f^*\leq\frac{L\norm{\vv x_0 - \vv x^*}^2}{2k}.
    $$

!!! proof "Proof"
    Write $\vv g = \nabla f(\vv x_k)$ and combine two facts:

    - sufficient decrease: $f(\vv x_{k+1})\leq f(\vv x_k) - \frac\eta2\norm{\vv g}^2$;
    - convexity: $f(\vv x_k)\leq f^* + \vv g^\top(\vv x_k - \vv x^*)$.

    Together:

    $$
    f(\vv x_{k+1}) - f^*\leq\vv g^\top(\vv x_k - \vv x^*) - \frac\eta2\norm{\vv g}^2 = \frac{1}{2\eta}\Big(\norm{\vv x_k - \vv x^*}^2 - \norm{\vv x_k - \vv x^* - \eta\vv g}^2\Big).
    $$

    (Expand the right side to check. With $\vv a = \vv x_k - \vv x^*$: $\ \norm{\vv a}^2 - \norm{\vv a - \eta\vv g}^2 = \norm{\vv a}^2 - \norm{\vv a}^2 + 2\eta\,\vv g^\top\vv a - \eta^2\norm{\vv g}^2$. Dividing by $2\eta$ gives $\vv g^\top\vv a - \frac\eta2\norm{\vv g}^2$, the left side.)

    Since $\vv x_k - \eta\vv g = \vv x_{k+1}$, the bracket is $\norm{\vv x_k - \vv x^*}^2 - \norm{\vv x_{k+1} - \vv x^*}^2$. It **telescopes** when summed over the steps:

    $$
    \sum_{i=1}^{k}\big(f(\vv x_i) - f^*\big)\leq\frac{1}{2\eta}\norm{\vv x_0 - \vv x^*}^2.
    $$

    The values $f(\vv x_i)$ decrease, so the left side is at least $k(f(\vv x_k) - f^*)$.

    Divide by $k$.

!!! theorem "Strongly convex: linear convergence"
    If additionally $f$ is **$\mu$-strongly convex** (Hessian eigenvalues $\geq\mu > 0$), then with $\eta = \frac1L$,

    $$
    f(\vv x_k) - f^*\leq\left(1 - \frac{\mu}{L}\right)^k\big(f(\vv x_0) - f^*\big).
    $$

The error shrinks geometrically. This is called "linear convergence," because the number of correct digits grows linearly with $k$.

The rate $1 - 1/\kappa$ matches the quadratic analysis in §3: the number of steps needed scales with $\kappa$.

## 5. Stochastic gradient descent

The loss is an average over $n$ examples, $f(\vv x) = \frac1n\sum_if_i(\vv x)$, so computing the full gradient costs $n$ gradient evaluations.

**SGD** uses a random mini-batch $B$ instead:

$$
\vv x_{k+1} = \vv x_k - \eta\,\vv g_k, \qquad\vv g_k = \frac1{|B|}\sum_{i\in B}\nabla f_i(\vv x_k).
$$

- **Unbiased:** $\E[\vv g_k] = \nabla f(\vv x_k)$ (linearity of expectation).
- **Noisy:** its variance is $\propto\frac{1}{|B|}$ ([limit theorems](../probability/limit-theorems.md)).

!!! example "Example: noisy but right on average"
    Fit a single number $x$ to data $a = (1, 2, 3, 6)$ by minimizing $f(x) = \frac14\sum_i\frac12(x - a_i)^2$. The full gradient is $x - \bar a = x - 3$, and the minimum is at $x = 3$.

    At $x = 0$, the full gradient is $-3$. Using a single random example as the "batch," the gradient is $x - a_i = -a_i$:

    | example picked | $a_1 = 1$ | $a_2 = 2$ | $a_3 = 3$ | $a_4 = 6$ |
    |---|---|---|---|---|
    | gradient | $-1$ | $-2$ | $-3$ | $-6$ |

    Each guess is off, but their average is $-3$: unbiased. Every one of them still points the right way (toward larger $x$). Averaging over a batch of 2 or 3 examples would cut the scatter.

Because of the noise, SGD with a constant learning rate doesn't converge exactly. It bounces around the minimum, in a region whose size is proportional to $\eta$.

Hence **learning rate schedules**: decay $\eta$ over time (step decay, cosine decay), typically after a short **warmup**.

The noise isn't purely harmful:

- it helps escape saddle points and sharp minima;
- it is thought to contribute to generalization.

**Why SGD wins on big data:**

- one full-gradient step costs as much as $n/|B|$ SGD steps;
- early in training, each noisy step makes nearly as much progress.

## 6. Momentum

Gradient descent forgets its history. **Momentum** (the "heavy ball") accumulates a velocity:

$$
\vv v_{k+1} = \beta\vv v_k - \eta\nabla f(\vv x_k), \qquad\vv x_{k+1} = \vv x_k + \vv v_{k+1}.
$$

Unroll the recursion (starting from $\vv v_0 = \vv 0$) to see what the velocity is:

$$
\vv v_{k+1} = -\eta\left(\vv g_k + \beta\vv g_{k-1} + \beta^2\vv g_{k-2} + \cdots\right).
$$

A weighted sum of all past gradients, with older ones discounted by powers of $\beta$. With $\beta = 0.9$ the weights are $1, 0.9, 0.81, 0.73, \dots$, so roughly the last 10 gradients matter.

- If the gradients keep pointing the same way, the sum is a geometric series: $1 + \beta + \beta^2 + \cdots = \frac{1}{1 - \beta} = 10$. **The effective step is 10× larger.**
- If they alternate, $\vv g, -\vv g, \vv g, \dots$, the sum is $1 - \beta + \beta^2 - \cdots = \frac{1}{1 + \beta} \approx 0.53$. **The oscillation is damped.**

In the narrow valley:

- the across-valley gradient components alternate in sign, and cancel in the velocity;
- the along-valley components consistently agree, and accumulate.

Momentum damps the zigzag and accelerates along the floor.

With well-tuned parameters on a quadratic, the number of steps scales with $\sqrt\kappa$ instead of $\kappa$. For $\kappa = 10^4$ that's 100 times fewer steps.

Try $\beta = 0.9$ in the figure above.

## 7. Adaptive methods: Adam

Different parameters may need very different step sizes (a rarely active feature vs a common one).

**Adam** keeps running averages of the gradient and of its elementwise square:

$$
\begin{aligned}
\vv m_k &= \beta_1\vv m_{k-1} + (1 - \beta_1)\vv g_k & &\text{(momentum)}\\
\vv s_k &= \beta_2\vv s_{k-1} + (1 - \beta_2)\vv g_k^2 & &\text{(per-coordinate scale)}\\
\vv x_{k+1} &= \vv x_k - \eta\,\frac{\hat{\vv m}_k}{\sqrt{\hat{\vv s}_k} + \epsilon}
\end{aligned}
$$

where $\hat{\vv m}_k = \vv m_k/(1 - \beta_1^k)$ and $\hat{\vv s}_k = \vv s_k/(1 - \beta_2^k)$ correct the bias from initializing at zero.

(Here $\vv g_k^2$ and the square root are taken entry by entry, and the division is entry by entry too. So each coordinate gets its own step size.)

**Exponential moving averages.** Each line has the form "new average = $\beta$ × old average + $(1 - \beta)$ × new value." With $\beta = 0.9$, the newest value gets weight $0.1$, the one before $0.09$, then $0.081$, and so on: a smoothed recent average.

**Why bias correction?** Starting from $\vv m_0 = \vv 0$, the first average is $\vv m_1 = 0.1\,\vv g_1$, only a tenth of the gradient, because the zero start is still weighing it down. Dividing by $1 - \beta_1^1 = 0.1$ restores $\vv g_1$. As $k$ grows, $\beta_1^k \to 0$ and the correction fades away.

**Why divide by $\sqrt{\vv s}$?** $\vv s$ tracks the typical squared size of each coordinate's gradient. A coordinate whose gradients are consistently around $100$ gets $\sqrt{s} \approx 100$, and its step $\frac{m}{\sqrt s}$ is about 1. A coordinate with gradients around $0.01$ gets the same step size. Large and small gradients are put on an equal footing.

| Hyperparameter | Typical value |
|---|---|
| $\beta_1$ | $0.9$ |
| $\beta_2$ | $0.999$ |
| $\epsilon$ | $10^{-8}$ |

Dividing by the root-mean-square gradient makes each coordinate's step roughly $\eta$ in size, regardless of the gradient's scale.

- It acts like a cheap **diagonal preconditioner**, a crude approximation of Newton's rescaling.
- **AdamW** applies weight decay directly to the weights instead of mixing it into the gradient. That works better with adaptive scaling.

## 8. Newton's method

As in the [Hessian lesson](../multivariable/hessian.md#5-newtons-method-in-n-dimensions): $\vv x_{k+1} = \vv x_k - H^{-1}\nabla f(\vv x_k)$.

- **Pro:** it is invariant to the conditioning (it rescales every eigen-direction by $1/\lambda_i$).
- **Pro:** it converges **quadratically** near the optimum.
- **Con:** each step costs $O(n^3)$.

Quasi-Newton methods (BFGS, L-BFGS) build a Hessian approximation from successive gradients. They are the method of choice for medium-sized smooth problems, like logistic regression with thousands of features.

!!! ml "Where this shows up"
    - **Learning rate tuning** is about the $\eta < 2/L$ limit and the trade-off between speed and noise.
        - Warmup avoids instability early, when the curvature can be large.
    - **Normalization layers, good initialization and residual connections** improve the conditioning of the loss landscape.
        - That makes gradient descent faster and more stable.
    - **AdamW + cosine schedule + warmup** is the default recipe for training Transformers.
        - Every piece of it was explained in this lesson.
    - **Gradient clipping** caps $\norm{\vv g}$ to avoid huge steps in regions of high curvature.

## Check yourself

**1.** For $f(x, y) = \frac12(x^2 + 10y^2)$, find $L$, $\mu$, $\kappa$, and the largest stable learning rate.

??? success "Solution"
    The Hessian is $\diag(1, 10)$:

    | Quantity | Value |
    |---|---|
    | $L$ | $10$ |
    | $\mu$ | $1$ |
    | $\kappa$ | $10$ |
    | stable learning rates | $\eta < 0.2$ |

    Exactly as the figure shows.

**2.** With $\eta = 0.1$ on that function, what happens to the $y$-coordinate each step? The $x$-coordinate?

??? success "Solution"
    - **$y$:** $y\leftarrow(1 - 0.1\cdot10)y = 0$. It's solved in one step.
    - **$x$:** $x\leftarrow(1 - 0.1)x = 0.9x$. Slow decay: about 22 steps per factor of 10.

**3.** Show that gradient descent on $f(x) = x^2$ with $\eta = 1$ oscillates forever, and with $\eta = 1.1$ diverges.

??? success "Solution"
    $x\leftarrow x - 2\eta x = (1 - 2\eta)x$.

    | $\eta$ | Factor | Behavior |
    |---|---|---|
    | $1$ | $-1$ | $x$ flips sign forever |
    | $1.1$ | $-1.2$ | $\lvert x\rvert$ grows |

    Here $L = 2$, so the threshold is $2/L = 1$.

**4.** In the convex convergence bound, how many steps guarantee $f(\vv x_k) - f^*\leq\varepsilon$?

??? success "Solution"
    $k\geq\frac{L\norm{\vv x_0 - \vv x^*}^2}{2\varepsilon}$.

    - That's $O(1/\varepsilon)$: each extra digit of accuracy costs 10× more steps.
    - Strong convexity improves this to $O(\kappa\log(1/\varepsilon))$.

**5.** Why is the SGD gradient an unbiased estimate of the full gradient? What would make it biased?

??? success "Solution"
    - **Unbiased:** if the batch is drawn uniformly at random, each $\nabla f_i$ appears with equal probability. By linearity, the expected batch gradient is the full average.
    - **Biased:** if sampling isn't uniform, e.g. if the data are sorted by class and not shuffled.

**6.** Adam's first step: $\vv m_0 = \vv s_0 = 0$, gradient $\vv g_1$. Show that with bias correction the update is $\approx -\eta\,\sgn(\vv g_1)$.

??? success "Solution"
    - $\vv m_1 = (1 - \beta_1)\vv g_1$, so $\hat{\vv m}_1 = \vv g_1$.
    - $\vv s_1 = (1 - \beta_2)\vv g_1^2$, so $\hat{\vv s}_1 = \vv g_1^2$.
    - The update is $-\eta\frac{\vv g_1}{|\vv g_1| + \epsilon}\approx-\eta\,\sgn(\vv g_1)$.

    Each coordinate moves by about $\eta$, regardless of the gradient's magnitude.
