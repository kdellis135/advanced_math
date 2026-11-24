# Gradient descent and friends

<div class="lesson-meta" markdown>
**Phase 7 · Lesson 2** · ⏱ ~4 hours · Needs: [Convexity and Jensen](convexity.md), [The Hessian](../multivariable/hessian.md), [Limit theorems](../probability/limit-theorems.md) (for SGD)
</div>

Gradient descent is the simplest optimization algorithm, and in its stochastic form it trains nearly every neural network. This lesson proves *why* it converges and *how fast*, explains the role of the learning rate and the condition number, and builds up the practical variants: SGD, momentum and Adam.

## 1. The algorithm

$$
\vv x_{k+1} = \vv x_k - \eta\,\nabla f(\vv x_k).
$$

We need to know two things: how large $\eta$ can be, and how quickly $f(\vv x_k)$ approaches the minimum $f^* = f(\vv x^*)$.

## 2. Smoothness and the descent lemma

!!! definition "Definition: L-smooth"
    $f$ is **$L$-smooth** if its gradient is $L$-Lipschitz: $\norm{\nabla f(\vv x) - \nabla f(\vv y)}\leq L\norm{\vv x - \vv y}$. For twice-differentiable $f$ this means the Hessian's eigenvalues are at most $L$ in absolute value: curvature is bounded.

!!! theorem "Descent lemma"
    If $f$ is $L$-smooth:

    $$
    f(\vv y)\leq f(\vv x) + \nabla f(\vv x)^\top(\vv y - \vv x) + \frac L2\norm{\vv y - \vv x}^2.
    $$

!!! proof "Proof"
    By the fundamental theorem of calculus along the segment, with $\vv d = \vv y - \vv x$:
    $f(\vv y) - f(\vv x) - \nabla f(\vv x)^\top\vv d = \int_0^1\big(\nabla f(\vv x + t\vv d) - \nabla f(\vv x)\big)^\top\vv d\,dt\leq\int_0^1Lt\norm{\vv d}^2dt = \frac L2\norm{\vv d}^2$,
    using Cauchy–Schwarz and the Lipschitz condition.

The function sits *below* a quadratic upper bound touching it at $\vv x$. Gradient descent minimizes that bound. Plug in $\vv y = \vv x - \eta\nabla f(\vv x)$:

$$
f(\vv x_{k+1})\leq f(\vv x_k) - \eta\left(1 - \frac{L\eta}{2}\right)\norm{\nabla f(\vv x_k)}^2.
$$

!!! theorem "Sufficient decrease"
    With $0 < \eta\leq\frac1L$, every step decreases $f$ by at least $\frac\eta2\norm{\nabla f(\vv x_k)}^2$.

This holds **even for non-convex $f$**. Summing over $k$ steps gives $\min_{i<k}\norm{\nabla f(\vv x_i)}^2\leq\frac{2(f(\vv x_0) - f^*)}{\eta k}$: gradient descent always finds an approximately stationary point, at rate $O(1/k)$. (That's all you can say without convexity: the point could be a saddle or a local minimum.)

## 3. Why ill-conditioning hurts

Take the quadratic $f(\vv x) = \frac12\vv x^\top A\vv x$ with $A\succ0$, eigenvalues $\lambda_{\min} = \mu$ to $\lambda_{\max} = L$. Then $\nabla f = A\vv x$, and gradient descent is

$$
\vv x_{k+1} = (I - \eta A)\vv x_k.
$$

In the eigenbasis of $A$, each coordinate evolves independently: $y_{i,k+1} = (1 - \eta\lambda_i)\,y_{i,k}$. So:

- **Stability:** we need $|1 - \eta\lambda_i| < 1$ for all $i$, i.e. $0 < \eta < \frac{2}{L}$. Above $\frac2L$, the steepest direction oscillates with growing amplitude and diverges.
- **Speed:** the slowest coordinate shrinks by $|1 - \eta\mu|$ per step. Even with the best choice $\eta = \frac{2}{L + \mu}$, the contraction factor is

$$
\frac{L - \mu}{L + \mu} = \frac{\kappa - 1}{\kappa + 1}, \qquad\kappa = \frac L\mu\ \text{(the condition number)}.
$$

With $\kappa = 100$ that's $0.98$ per step: about 115 steps to gain each factor of 10. **Gradient descent's speed is governed by the condition number.** The learning rate is capped by the steepest direction, and progress is limited by the flattest.

<div class="viz" data-viz="gd"></div>

!!! intuition "The zigzag"
    In a long narrow valley, the gradient points mostly *across* the valley (steep walls), not *along* it (gentle floor). Steps bounce from wall to wall while creeping along the floor. Try $\eta\approx0.15$–$0.19$ on the narrow valley above, and then $\eta > 0.2$.

## 4. Convergence theorems

!!! theorem "Convex, L-smooth"
    If $f$ is convex and $L$-smooth, and $\eta = \frac1L$:

    $$
    f(\vv x_k) - f^*\leq\frac{L\norm{\vv x_0 - \vv x^*}^2}{2k}.
    $$

!!! proof "Proof"
    Combine sufficient decrease, $f(\vv x_{k+1})\leq f(\vv x_k) - \frac\eta2\norm{\vv g}^2$ (writing $\vv g = \nabla f(\vv x_k)$), with convexity, $f(\vv x_k)\leq f^* + \vv g^\top(\vv x_k - \vv x^*)$:

    $$
    f(\vv x_{k+1}) - f^*\leq\vv g^\top(\vv x_k - \vv x^*) - \frac\eta2\norm{\vv g}^2 = \frac{1}{2\eta}\Big(\norm{\vv x_k - \vv x^*}^2 - \norm{\vv x_k - \vv x^* - \eta\vv g}^2\Big).
    $$

    (Expand the right side to check.) Since $\vv x_k - \eta\vv g = \vv x_{k+1}$, the bracket is $\norm{\vv x_k - \vv x^*}^2 - \norm{\vv x_{k+1} - \vv x^*}^2$, which **telescopes** when summed over the steps:

    $$
    \sum_{i=1}^{k}\big(f(\vv x_i) - f^*\big)\leq\frac{1}{2\eta}\norm{\vv x_0 - \vv x^*}^2.
    $$

    The values $f(\vv x_i)$ decrease, so the left side is at least $k(f(\vv x_k) - f^*)$. Divide by $k$.

!!! theorem "Strongly convex: linear convergence"
    If additionally $f$ is **$\mu$-strongly convex** (Hessian eigenvalues $\geq\mu > 0$), then with $\eta = \frac1L$,

    $$
    f(\vv x_k) - f^*\leq\left(1 - \frac{\mu}{L}\right)^k\big(f(\vv x_0) - f^*\big).
    $$

The error shrinks geometrically ("linear convergence," because the number of correct digits grows linearly with $k$). The rate $1 - 1/\kappa$ matches the quadratic analysis in §3: the number of steps needed scales with $\kappa$.

## 5. Stochastic gradient descent

The loss is an average over $n$ examples, $f(\vv x) = \frac1n\sum_if_i(\vv x)$, and computing the full gradient costs $n$ gradient evaluations. **SGD** uses a random mini-batch $B$ instead:

$$
\vv x_{k+1} = \vv x_k - \eta\,\vv g_k, \qquad\vv g_k = \frac1{|B|}\sum_{i\in B}\nabla f_i(\vv x_k).
$$

- **Unbiased:** $\E[\vv g_k] = \nabla f(\vv x_k)$ (linearity of expectation).
- **Noisy:** its variance is $\propto\frac{1}{|B|}$ ([limit theorems](../probability/limit-theorems.md)).

Because of the noise, SGD with a constant learning rate doesn't converge exactly. It bounces around the minimum in a region whose size is proportional to $\eta$. Hence **learning rate schedules**: decay $\eta$ over time (step decay, cosine decay), typically after a short **warmup**. The noise isn't purely harmful: it helps escape saddle points and sharp minima, and is thought to contribute to generalization.

**Why SGD wins on big data:** one full-gradient step costs as much as $n/|B|$ SGD steps, and early in training the noisy steps make nearly as much progress each.

## 6. Momentum

Gradient descent forgets its history. **Momentum** (the "heavy ball") accumulates a velocity:

$$
\vv v_{k+1} = \beta\vv v_k - \eta\nabla f(\vv x_k), \qquad\vv x_{k+1} = \vv x_k + \vv v_{k+1}.
$$

In the narrow valley, the across-valley gradient components alternate in sign and cancel in the velocity, while the along-valley components consistently agree and accumulate. Momentum damps the zigzag and accelerates along the floor. With well-tuned parameters on a quadratic, the number of steps scales with $\sqrt\kappa$ instead of $\kappa$. For $\kappa = 10^4$ that's 100 times fewer steps. Try $\beta = 0.9$ in the figure above.

## 7. Adaptive methods: Adam

Different parameters may need very different step sizes (a rarely active feature vs a common one). **Adam** keeps running averages of the gradient and of its elementwise square:

$$
\begin{aligned}
\vv m_k &= \beta_1\vv m_{k-1} + (1 - \beta_1)\vv g_k & &\text{(momentum)}\\
\vv s_k &= \beta_2\vv s_{k-1} + (1 - \beta_2)\vv g_k^2 & &\text{(per-coordinate scale)}\\
\vv x_{k+1} &= \vv x_k - \eta\,\frac{\hat{\vv m}_k}{\sqrt{\hat{\vv s}_k} + \epsilon}
\end{aligned}
$$

where $\hat{\vv m}_k = \vv m_k/(1 - \beta_1^k)$ and $\hat{\vv s}_k = \vv s_k/(1 - \beta_2^k)$ correct the bias from initializing at zero. Typical values: $\beta_1 = 0.9$, $\beta_2 = 0.999$, $\epsilon = 10^{-8}$.

Dividing by the root-mean-square gradient makes each coordinate's step roughly $\eta$ in size, regardless of the gradient's scale. It acts like a cheap **diagonal preconditioner**, a crude approximation of Newton's rescaling. **AdamW** applies weight decay directly to the weights instead of mixing it into the gradient, which works better with adaptive scaling.

## 8. Newton's method

As in the [Hessian lesson](../multivariable/hessian.md#5-newtons-method-in-n-dimensions): $\vv x_{k+1} = \vv x_k - H^{-1}\nabla f(\vv x_k)$. It is invariant to the conditioning (it rescales every eigen-direction by $1/\lambda_i$) and converges **quadratically** near the optimum, but each step costs $O(n^3)$. Quasi-Newton methods (BFGS, L-BFGS) build a Hessian approximation from successive gradients and are the method of choice for medium-sized smooth problems, like logistic regression with thousands of features.

!!! ml "Where this shows up"
    - **Learning rate tuning** is about the $\eta < 2/L$ limit and the trade-off between speed and noise. Warmup avoids instability early, when the curvature can be large.
    - **Normalization layers, good initialization and residual connections** improve the conditioning of the loss landscape, making gradient descent faster and more stable.
    - **AdamW + cosine schedule + warmup** is the default recipe for training Transformers. Every piece of it was explained in this lesson.
    - **Gradient clipping** caps $\norm{\vv g}$ to avoid huge steps in regions of high curvature.

## Check yourself

**1.** For $f(x, y) = \frac12(x^2 + 10y^2)$, find $L$, $\mu$, $\kappa$, and the largest stable learning rate.

??? success "Solution"
    Hessian $\diag(1, 10)$: $L = 10$, $\mu = 1$, $\kappa = 10$. Stable iff $\eta < 0.2$, exactly as the figure shows.

**2.** With $\eta = 0.1$ on that function, what happens to the $y$-coordinate each step? The $x$-coordinate?

??? success "Solution"
    $y\leftarrow(1 - 0.1\cdot10)y = 0$: it's solved in one step. $x\leftarrow(1 - 0.1)x = 0.9x$: slow decay, about 22 steps per factor of 10.

**3.** Show that gradient descent on $f(x) = x^2$ with $\eta = 1$ oscillates forever, and with $\eta = 1.1$ diverges.

??? success "Solution"
    $x\leftarrow x - 2\eta x = (1 - 2\eta)x$. With $\eta = 1$: factor $-1$, so $x$ flips sign forever. With $\eta = 1.1$: factor $-1.2$, so $|x|$ grows. Here $L = 2$, so the threshold is $2/L = 1$.

**4.** In the convex convergence bound, how many steps guarantee $f(\vv x_k) - f^*\leq\varepsilon$?

??? success "Solution"
    $k\geq\frac{L\norm{\vv x_0 - \vv x^*}^2}{2\varepsilon}$. That's $O(1/\varepsilon)$: each extra digit of accuracy costs 10× more steps. Strong convexity improves this to $O(\kappa\log(1/\varepsilon))$.

**5.** Why is the SGD gradient an unbiased estimate of the full gradient? What would make it biased?

??? success "Solution"
    If the batch is drawn uniformly at random, each $\nabla f_i$ appears with equal probability, so by linearity the expected batch gradient is the full average. It's biased if sampling isn't uniform, e.g. if the data are sorted by class and not shuffled.

**6.** Adam's first step: $\vv m_0 = \vv s_0 = 0$, gradient $\vv g_1$. Show that with bias correction the update is $\approx -\eta\,\sgn(\vv g_1)$.

??? success "Solution"
    $\vv m_1 = (1 - \beta_1)\vv g_1$, so $\hat{\vv m}_1 = \vv g_1$. $\vv s_1 = (1 - \beta_2)\vv g_1^2$, so $\hat{\vv s}_1 = \vv g_1^2$. The update is $-\eta\frac{\vv g_1}{|\vv g_1| + \epsilon}\approx-\eta\,\sgn(\vv g_1)$. Each coordinate moves by about $\eta$ regardless of the gradient's magnitude.
