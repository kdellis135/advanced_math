# Using derivatives

<div class="lesson-meta" markdown>
**Phase 2 · Lesson 3** · ⏱ ~3 hours · Needs: [Derivatives](derivatives.md)
</div>

Derivatives earn their keep by answering three kinds of question: *where is a function largest or smallest?* (optimization), *what does local information tell us globally?* (the mean value theorem), and *how do we solve equations we can't solve by hand?* (Newton's method). This lesson covers all three, with the proofs.

## 1. Extrema and critical points

!!! definition "Definition"
    $f$ has a **local maximum** at $c$ if $f(c) \geq f(x)$ for all $x$ near $c$ (in some open interval around $c$). A **global maximum** means $f(c) \geq f(x)$ for all $x$ in the domain. Minima are defined likewise. A **critical point** is a $c$ where $f'(c) = 0$ or $f'(c)$ doesn't exist.

!!! theorem "Theorem (Fermat): extrema are flat"
    If $f$ has a local max or min at an interior point $c$ and is differentiable there, then $f'(c) = 0$.

!!! proof "Proof"
    Say $c$ is a local max. For small $h > 0$: $f(c + h) - f(c) \leq 0$, so $\frac{f(c+h) - f(c)}{h} \leq 0$, and the limit as $h \to 0^+$ gives $f'(c) \leq 0$. For small $h < 0$, the numerator is still $\leq 0$ but $h$ is negative, so the quotient is $\geq 0$, giving $f'(c) \geq 0$. Hence $f'(c) = 0$.

**Warning:** the converse is false. $f(x) = x^3$ has $f'(0) = 0$ but no extremum at $0$. Critical points are *candidates* only.

**Recipe for the global max/min of a continuous $f$ on $[a, b]$:** the extreme value theorem guarantees they exist. They occur at critical points or endpoints, so evaluate $f$ at all critical points and at $a$ and $b$, and pick the largest and smallest.

## 2. The mean value theorem

!!! theorem "Rolle's theorem"
    If $f$ is continuous on $[a,b]$, differentiable on $(a,b)$, and $f(a) = f(b)$, then $f'(c) = 0$ for some $c \in (a, b)$.

!!! proof "Proof"
    By the extreme value theorem $f$ has a max and a min on $[a,b]$. If both occur at endpoints, then $\max = \min$ (since $f(a) = f(b)$), $f$ is constant, and $f' = 0$ everywhere. Otherwise one of them occurs at an interior point $c$, and Fermat gives $f'(c) = 0$.

!!! theorem "Mean value theorem (MVT)"
    If $f$ is continuous on $[a,b]$ and differentiable on $(a,b)$, then for some $c \in (a,b)$,

    $$
    f'(c) = \frac{f(b) - f(a)}{b - a}.
    $$

!!! intuition "Picture and meaning"
    Somewhere, the tangent is parallel to the chord from $(a, f(a))$ to $(b, f(b))$. If you drove 120 km in 1 hour, at some instant your speedometer read exactly 120 km/h.

!!! proof "Proof"
    Tilt the picture so the chord becomes horizontal: let $g(x) = f(x) - \frac{f(b)-f(a)}{b-a}(x - a)$. Then $g(a) = f(a) = g(b)$, so Rolle gives $c$ with $0 = g'(c) = f'(c) - \frac{f(b) - f(a)}{b - a}$.

The MVT turns *local* information (derivatives) into *global* information (values). Three consequences you'll use all the time:

!!! theorem "Corollaries"
    On an interval:

    1. If $f' = 0$ everywhere, $f$ is constant.
    2. If $f' = g'$ everywhere, then $f = g + C$ for a constant $C$. (This is why antiderivatives are unique up to $+C$.)
    3. If $f' > 0$ everywhere, $f$ is strictly increasing; if $f' < 0$, strictly decreasing.
    4. If $|f'| \leq K$ everywhere, then $|f(x) - f(y)| \leq K|x - y|$ ($f$ is **$K$-Lipschitz**).

!!! proof "Proof"
    For any $x < y$, MVT gives $f(y) - f(x) = f'(c)(y - x)$ for some $c$ between them. (1): the right side is $0$. (2): apply (1) to $f - g$. (3): the right side has the sign of $f'(c)$. (4): take absolute values.

## 3. The second derivative: shape

- $f'' > 0$ on an interval: $f'$ is increasing, the graph bends upward (**convex**, "holds water").
- $f'' < 0$: bends downward (**concave**).
- A point where concavity changes is an **inflection point**.

!!! theorem "Second derivative test"
    If $f'(c) = 0$ and $f''(c) > 0$, then $c$ is a strict local minimum. If $f'(c) = 0$ and $f''(c) < 0$, it's a strict local maximum. If $f''(c) = 0$, the test is inconclusive.

!!! proof "Proof"
    Suppose $f''(c) > 0$. Then $\frac{f'(c+h) - f'(c)}{h} = \frac{f'(c+h)}{h} \to f''(c) > 0$, so for small $h$, $f'(c+h)$ has the same sign as $h$: negative just left of $c$, positive just right. So $f$ decreases into $c$ and increases out of it. Local min. (Inconclusive case: $x^4$, $-x^4$ and $x^3$ all have $f'(0) = f''(0) = 0$, with a min, a max and neither.)

In several variables, $f''$ becomes the **Hessian matrix**, and "$f'' > 0$" becomes "all eigenvalues of the Hessian are positive" ([Phase 4](../multivariable/hessian.md)).

## 4. An optimization example: least squares in one dimension

We observe data $(x_1, y_1), \ldots, (x_n, y_n)$ and want the line through the origin $y = wx$ that fits best, in the sense of minimizing the **squared error**

$$
L(w) = \sum_{i=1}^n (y_i - wx_i)^2.
$$

Differentiate (chain rule on each term): $L'(w) = \sum_i 2(y_i - wx_i)(-x_i) = -2\sum_i x_iy_i + 2w\sum_i x_i^2$.

Setting $L'(w) = 0$:

$$
w^* = \frac{\sum_i x_i y_i}{\sum_i x_i^2}.
$$

$L''(w) = 2\sum_i x_i^2 > 0$ (unless all $x_i = 0$), so this is a minimum, and since $L'' > 0$ everywhere it's the *global* minimum. This is linear regression in one variable. [Phase 3](../linear-algebra/orthogonality.md) generalizes it to any number of features with exactly the same logic.

## 5. L'Hôpital's rule

!!! theorem "L'Hôpital's rule"
    If $f(a) = g(a) = 0$ (or both tend to $\pm\infty$), $f, g$ are differentiable near $a$ with $g' \neq 0$ there, and $\lim_{x\to a}\frac{f'(x)}{g'(x)} = L$, then $\lim_{x\to a}\frac{f(x)}{g(x)} = L$.

!!! intuition "Why"
    Near $a$, both $f$ and $g$ are approximately linear: $f(x) \approx f'(a)(x - a)$ and $g(x) \approx g'(a)(x-a)$. The ratio is about $\frac{f'(a)}{g'(a)}$.

??? proof "Proof for the 0/0 case (deeper)"
    **Cauchy's MVT:** for $f, g$ continuous on $[a, x]$ and differentiable inside, there's $c \in (a, x)$ with $\big(f(x) - f(a)\big)g'(c) = \big(g(x) - g(a)\big)f'(c)$. (Apply Rolle to $h(t) = \big(f(x)-f(a)\big)g(t) - \big(g(x)-g(a)\big)f(t)$, which has $h(a) = h(x)$.)
    With $f(a) = g(a) = 0$ this reads $\frac{f(x)}{g(x)} = \frac{f'(c)}{g'(c)}$. As $x \to a$, $c$ is squeezed toward $a$, so the right side tends to $L$.

!!! example "Examples"
    - $\displaystyle\lim_{x\to0}\frac{e^x - 1 - x}{x^2} = \lim\frac{e^x - 1}{2x} = \lim\frac{e^x}{2} = \frac12$ (applied twice).
    - $\displaystyle\lim_{x\to\infty}\frac{\ln x}{x} = \lim\frac{1/x}{1} = 0$: logs grow slower than any line.
    - $\displaystyle\lim_{x\to\infty}\frac{x^k}{e^x} = 0$: apply $k$ times. Exponentials beat polynomials.

## 6. Newton's method

To solve $f(x) = 0$: start with a guess $x_0$, replace $f$ by its tangent line at $x_0$, and solve *that* (easy) equation. The tangent line $y = f(x_0) + f'(x_0)(x - x_0)$ hits zero at

$$
x_1 = x_0 - \frac{f(x_0)}{f'(x_0)}.
$$

Repeat: $x_{k+1} = x_k - f(x_k)/f'(x_k)$.

<div class="viz" data-viz="newton"></div>

!!! example "Computing $\sqrt2$"
    Solve $x^2 - 2 = 0$: $x_{k+1} = x_k - \frac{x_k^2 - 2}{2x_k} = \frac12\left(x_k + \frac{2}{x_k}\right)$. From $x_0 = 1$: $1.5$, $1.41667$, $1.4142157$, $1.41421356237$. The number of correct digits roughly **doubles** each step ($1, 3, 6, 12$).

??? proof "Why the digits double (deeper)"
    Let $r$ be the root and $e_k = x_k - r$ the error. Taylor's theorem ([next lessons](series-taylor.md)) gives $0 = f(r) = f(x_k) - f'(x_k)e_k + \frac12f''(\xi)e_k^2$ for some $\xi$ between $x_k$ and $r$. Divide by $f'(x_k)$ and rearrange:
    $e_{k+1} = x_{k+1} - r = e_k - \frac{f(x_k)}{f'(x_k)} = \frac{f''(\xi)}{2f'(x_k)}e_k^2.$
    So $|e_{k+1}| \approx C|e_k|^2$: **quadratic convergence**. If the error is $10^{-3}$, the next is about $10^{-6}$. This needs $f'(r) \neq 0$ and a starting point close enough. The figure shows what can go wrong otherwise.

Newton's method applied to $f'$ (to find where $f' = 0$) is the optimization algorithm $x \leftarrow x - f'(x)/f''(x)$. In many dimensions it becomes $x \leftarrow x - H^{-1}\nabla f$ ([Phase 7](../optimization/gradient-descent.md)).

!!! ml "Where this shows up"
    - **Training** is finding a minimum. Fermat's theorem is why we look for zero gradients; the second-derivative test (Hessian eigenvalues) is how we tell minima from saddle points.
    - **The MVT / Lipschitz bound** is the workhorse of convergence proofs: it bounds how much the loss can change in one step.
    - **Newton's method** and its approximations (L-BFGS, Gauss–Newton, natural gradient) are second-order optimizers. Adam can be viewed as a cheap diagonal approximation of second-order scaling.

## Check yourself

**1.** Find the global max and min of $f(x) = x^3 - 3x$ on $[-2, 3]$.

??? success "Solution"
    $f'(x) = 3x^2 - 3 = 0$ at $x = \pm1$. Values: $f(-2) = -2$, $f(-1) = 2$, $f(1) = -2$, $f(3) = 18$. Max $18$ at $x=3$, min $-2$ at $x = -2$ and $x = 1$.

**2.** Prove that $e^x \geq 1 + x$ for all $x$.

??? success "Solution"
    Let $g(x) = e^x - 1 - x$. $g'(x) = e^x - 1$ is negative for $x<0$ and positive for $x>0$, so $g$ decreases then increases, and its minimum is $g(0) = 0$. Hence $g \geq 0$. (This inequality is used constantly, e.g. $1 - p \leq e^{-p}$ in probability bounds.)

**3.** Show that $|\sin a - \sin b| \leq |a - b|$ for all $a, b$.

??? success "Solution"
    MVT: $\sin a - \sin b = \cos(c)(a - b)$ for some $c$, and $|\cos c| \leq 1$.

**4.** Compute $\displaystyle\lim_{x\to0^+} x\ln x$. (Hint: rewrite as $\frac{\ln x}{1/x}$.)

??? success "Solution"
    $\frac{\ln x}{1/x}$ is $\frac{-\infty}{\infty}$. L'Hôpital: $\frac{1/x}{-1/x^2} = -x \to 0$. So $x\ln x \to 0$. This is why $0\log 0$ is taken to be $0$ in the definition of entropy.

**5.** Fit $y = wx$ to the data $(1, 2), (2, 3), (3, 7)$ by least squares.

??? success "Solution"
    $\sum x_iy_i = 2 + 6 + 21 = 29$, $\sum x_i^2 = 1 + 4 + 9 = 14$. $w^* = 29/14 \approx 2.07$.

**6.** Write the Newton iteration for $\sqrt[3]{5}$ and do two steps from $x_0 = 2$.

??? success "Solution"
    $f(x) = x^3 - 5$: $x_{k+1} = x_k - \frac{x_k^3 - 5}{3x_k^2} = \frac{2x_k}{3} + \frac{5}{3x_k^2}$. $x_1 = \frac43 + \frac{5}{12} = 1.75$, $x_2 = 1.1667 + 0.5442 = 1.7109$. (True: $1.70998$.)

**7.** In the figure, start Newton's method at $x_0 = 0$ for $f(x) = x^3 - 2x + 2$. Verify by hand that it cycles.

??? success "Solution"
    $f(0) = 2$, $f'(0) = -2$, so $x_1 = 0 - 2/(-2) = 1$. $f(1) = 1$, $f'(1) = 1$, so $x_2 = 1 - 1 = 0$. Back to the start: the iteration alternates $0, 1, 0, 1, \ldots$ forever.
