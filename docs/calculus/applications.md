---
description: "Using derivatives: finding extrema, the mean value theorem, concavity, one-dimensional least squares, L'Hôpital's rule and Newton's method, with proofs."
---

# Using derivatives

<div class="lesson-meta" markdown>
**Phase 2 · Lesson 3** · ⏱ ~3 hours · Needs: [Derivatives](derivatives.md)
</div>

Derivatives earn their keep by answering three kinds of question:

| Question | Tool |
|---|---|
| Where is a function largest or smallest? | optimization |
| What does local information tell us globally? | the mean value theorem |
| How do we solve equations we can't solve by hand? | Newton's method |

This lesson covers all three, with the proofs.

## 1. Extrema and critical points

!!! definition "Definition"
    - $f$ has a **local maximum** at $c$ if $f(c) \geq f(x)$ for all $x$ near $c$ (in some open interval around $c$).
    - A **global maximum** means $f(c) \geq f(x)$ for all $x$ in the domain.
    - Minima are defined likewise.
    - A **critical point** is a $c$ where $f'(c) = 0$ or $f'(c)$ doesn't exist.

Picture a mountain range. Every peak is a local max: it's the highest point *in its neighborhood*. The tallest peak is the global max. A function can have many local maxima but (at most) one global maximum value.

Example: $f(x) = x^3 - 3x$ has a local max at $x = -1$ (value $2$) and a local min at $x = 1$ (value $-2$). Neither is global on all of $\R$, since $f$ goes to $+\infty$ on the right and $-\infty$ on the left.

!!! theorem "Theorem (Fermat): extrema are flat"
    If $f$ has a local max or min at an interior point $c$ and is differentiable there, then $f'(c) = 0$.

!!! proof "Proof"
    Say $c$ is a local max, so $f(c + h) - f(c) \leq 0$ for small $h$.

    - **$h > 0$:** $\frac{f(c+h) - f(c)}{h} \leq 0$. The limit as $h \to 0^+$ gives $f'(c) \leq 0$.
    - **$h < 0$:** the numerator is still $\leq 0$ but $h$ is negative, so the quotient is $\geq 0$, giving $f'(c) \geq 0$.

    Hence $f'(c) = 0$.

In plain words: at the top of a smooth hill, the ground is level. The proof just checks that the slope can't be positive (you'd go higher by stepping right) or negative (you'd go higher by stepping left).

**Warning:** the converse is false. $f(x) = x^3$ has $f'(0) = 0$ but no extremum at $0$. Critical points are *candidates* only.

Also, an extremum can sit at a point where $f'$ doesn't exist: $|x|$ has its minimum at the corner $x = 0$. That's why critical points include "$f'$ doesn't exist."

### Classifying critical points: the sign chart

The **first derivative test**: look at the sign of $f'$ just left and just right of a critical point $c$.

| $f'$ left of $c$ | $f'$ right of $c$ | $f$ goes | Conclusion |
|:-:|:-:|---|---|
| $+$ | $-$ | up, then down | local max |
| $-$ | $+$ | down, then up | local min |
| same sign | same sign | keeps going the same way | neither |

!!! example "Example: sign chart for $f(x) = x^3 - 3x$"
    1. $f'(x) = 3x^2 - 3 = 3(x - 1)(x + 1)$. Critical points: $x = -1$ and $x = 1$.
    2. They split the line into three intervals. Test one point in each:

    | Interval | test point | $f'$ there | $f$ is |
    |---|---|---|---|
    | $x < -1$ | $-2$ | $3(4) - 3 = 9 > 0$ | increasing |
    | $-1 < x < 1$ | $0$ | $-3 < 0$ | decreasing |
    | $x > 1$ | $2$ | $9 > 0$ | increasing |

    3. At $-1$: $+$ then $-$, a local max. At $1$: $-$ then $+$, a local min.

    Why can we test just one point per interval? $f'$ is continuous, so by the IVT it can only change sign by passing through $0$, i.e. at a critical point.

**Recipe for the global max/min of a continuous $f$ on $[a, b]$.** The extreme value theorem guarantees they exist, and they occur at critical points or endpoints. So:

1. Find all critical points in $(a, b)$.
2. Evaluate $f$ at each of them, and at $a$ and $b$.
3. Pick the largest and smallest values.

(Exercise 1 below works through one.)

### Setting up an optimization problem

Real problems arrive in words. The derivative step is usually the easy part; the setup is where people get stuck.

1. Name the quantity to optimize and the variables.
2. Use the constraints to write the quantity as a function of **one** variable.
3. Find the allowed range of that variable.
4. Find critical points, then compare with the endpoints.

!!! example "Example: the biggest rectangle for a fixed fence"
    You have 40 m of fence and want to enclose the largest rectangular area.

    1. Sides $x$ and $y$. Maximize the area $A = xy$.
    2. Constraint: perimeter $2x + 2y = 40$, so $y = 20 - x$. Then $A(x) = x(20 - x) = 20x - x^2$.
    3. Lengths can't be negative: $0 \leq x \leq 20$.
    4. $A'(x) = 20 - 2x = 0$ gives $x = 10$. Compare: $A(0) = 0$, $\ A(10) = 100$, $\ A(20) = 0$.

    The best rectangle is a $10 \times 10$ square, with area $100\ \text{m}^2$.

## 2. The mean value theorem

!!! theorem "Rolle's theorem"
    If $f$ is continuous on $[a,b]$, differentiable on $(a,b)$, and $f(a) = f(b)$, then $f'(c) = 0$ for some $c \in (a, b)$.

!!! proof "Proof"
    By the extreme value theorem, $f$ has a max and a min on $[a,b]$.

    - **If both occur at endpoints:** then $\max = \min$ (since $f(a) = f(b)$), so $f$ is constant and $f' = 0$ everywhere.
    - **Otherwise:** one of them occurs at an interior point $c$, and Fermat gives $f'(c) = 0$.

!!! theorem "Mean value theorem (MVT)"
    If $f$ is continuous on $[a,b]$ and differentiable on $(a,b)$, then for some $c \in (a,b)$,

    $$
    f'(c) = \frac{f(b) - f(a)}{b - a}.
    $$

!!! intuition "Picture and meaning"
    Somewhere, the tangent is parallel to the chord from $(a, f(a))$ to $(b, f(b))$.

    If you drove 120 km in 1 hour, at some instant your speedometer read exactly 120 km/h.

!!! example "Example: finding the $c$"
    $f(x) = x^2$ on $[1, 3]$.

    - Average slope (the chord): $\dfrac{f(3) - f(1)}{3 - 1} = \dfrac{9 - 1}{2} = 4$.
    - Instantaneous slope: $f'(c) = 2c$. Setting $2c = 4$ gives $c = 2$, which is indeed inside $(1, 3)$. ✓

    In practice we rarely compute $c$. The power of the MVT is knowing it **exists**.

!!! proof "Proof"
    Tilt the picture so the chord becomes horizontal. Let

    $$
    g(x) = f(x) - \frac{f(b)-f(a)}{b-a}(x - a).
    $$

    $g$ is $f$ minus the straight line that rises along the chord. Check the endpoints:

    - $g(a) = f(a) - (\text{slope}) \cdot 0 = f(a)$.
    - $g(b) = f(b) - \frac{f(b) - f(a)}{b - a}(b - a) = f(b) - \big(f(b) - f(a)\big) = f(a)$.

    So $g(a) = g(b)$, and Rolle gives $c$ with $0 = g'(c) = f'(c) - \frac{f(b) - f(a)}{b - a}$.

The MVT turns *local* information (derivatives) into *global* information (values).

Consequences you'll use all the time:

!!! theorem "Corollaries"
    On an interval:

    1. If $f' = 0$ everywhere, $f$ is constant.
    2. If $f' = g'$ everywhere, then $f = g + C$ for a constant $C$. (This is why antiderivatives are unique up to $+C$.)
    3. If $f' > 0$ everywhere, $f$ is strictly increasing; if $f' < 0$, strictly decreasing.
    4. If $|f'| \leq K$ everywhere, then $|f(x) - f(y)| \leq K|x - y|$ ($f$ is **$K$-Lipschitz**).

!!! proof "Proof"
    For any $x < y$, MVT gives $f(y) - f(x) = f'(c)(y - x)$ for some $c$ between them.

    1. The right side is $0$.
    2. Apply (1) to $f - g$.
    3. The right side has the sign of $f'(c)$.
    4. Take absolute values.

## 3. The second derivative: shape

- $f'' > 0$ on an interval: $f'$ is increasing, the graph bends upward (**convex**, "holds water").
- $f'' < 0$: bends downward (**concave**).
- A point where concavity changes is an **inflection point**.

Why "$f'$ increasing" means "bends upward": moving left to right, the tangent slopes go from steep-down to flat to steep-up, like the inside of a bowl.

!!! example "Example: the shape of $x^3 - 3x$"
    $f''(x) = 6x$.

    - For $x < 0$, $f'' < 0$: concave (an upside-down bowl). The local max at $x = -1$ is in this region.
    - For $x > 0$, $f'' > 0$: convex (a bowl). The local min at $x = 1$ is here.
    - At $x = 0$ the concavity switches: an inflection point at $(0, 0)$.

!!! theorem "Second derivative test"
    Suppose $f'(c) = 0$.

    | $f''(c)$ | Conclusion |
    |---|---|
    | $> 0$ | strict local minimum |
    | $< 0$ | strict local maximum |
    | $= 0$ | inconclusive |

!!! proof "Proof"
    Suppose $f''(c) > 0$. Then

    $$
    \frac{f'(c+h) - f'(c)}{h} = \frac{f'(c+h)}{h} \to f''(c) > 0.
    $$

    (We used $f'(c) = 0$ to drop it from the numerator.)

    If a ratio $\frac{f'(c+h)}{h}$ is positive, the top and bottom have the same sign. So for small $h$, $f'(c+h)$ has the same sign as $h$: negative just left of $c$, positive just right. $f$ decreases into $c$ and increases out of it: a local min, by the sign chart.

    Inconclusive case: $x^4$, $-x^4$ and $x^3$ all have $f'(0) = f''(0) = 0$, yet they have a min, a max and neither.

In several variables, $f''$ becomes the **Hessian matrix**, and "$f'' > 0$" becomes "all eigenvalues of the Hessian are positive" ([Phase 4](../multivariable/hessian.md)).

## 4. An optimization example: least squares in one dimension

We observe data $(x_1, y_1), \ldots, (x_n, y_n)$ and want the line through the origin $y = wx$ that fits best, in the sense of minimizing the **squared error**

$$
L(w) = \sum_{i=1}^n (y_i - wx_i)^2.
$$

Here $w$ is the unknown, and the $x_i, y_i$ are fixed numbers (the data). Each term $(y_i - wx_i)$ is the vertical miss, or **residual**, for one data point.

Differentiate one term first. It's (inner)$^2$ with inner $u = y_i - wx_i$, whose derivative with respect to $w$ is $-x_i$. By the chain rule:

$$
\frac{d}{dw}(y_i - wx_i)^2 = 2(y_i - wx_i)\cdot(-x_i) = -2x_iy_i + 2wx_i^2.
$$

The derivative of a sum is the sum of derivatives, so

$$
L'(w) = \sum_i\left(-2x_iy_i + 2wx_i^2\right) = -2\sum_i x_iy_i + 2w\sum_i x_i^2.
$$

($w$ came out of the sum because it doesn't depend on $i$.)

Setting $L'(w) = 0$ and dividing by 2: $\ w\sum_i x_i^2 = \sum_i x_iy_i$, so

$$
w^* = \frac{\sum_i x_i y_i}{\sum_i x_i^2}.
$$

$L''(w) = 2\sum_i x_i^2 > 0$ (unless all $x_i = 0$). So this is a minimum, and since $L'' > 0$ everywhere, it's the *global* minimum.

This is linear regression in one variable. [Phase 3](../linear-algebra/orthogonality.md) generalizes it to any number of features with exactly the same logic.

## 5. L'Hôpital's rule

!!! theorem "L'Hôpital's rule"
    Suppose:

    - $f(a) = g(a) = 0$ (or both tend to $\pm\infty$);
    - $f, g$ are differentiable near $a$, with $g' \neq 0$ there;
    - $\lim_{x\to a}\frac{f'(x)}{g'(x)} = L$.

    Then $\lim_{x\to a}\frac{f(x)}{g(x)} = L$.

!!! intuition "Why"
    Near $a$, both $f$ and $g$ are approximately linear:

    $$
    f(x) \approx f'(a)(x - a), \qquad g(x) \approx g'(a)(x-a).
    $$

    The ratio is about $\frac{f'(a)}{g'(a)}$.

??? proof "Proof for the 0/0 case (deeper)"
    **Cauchy's MVT:** for $f, g$ continuous on $[a, x]$ and differentiable inside, there's $c \in (a, x)$ with

    $$
    \big(f(x) - f(a)\big)g'(c) = \big(g(x) - g(a)\big)f'(c).
    $$

    (Apply Rolle to $h(t) = \big(f(x)-f(a)\big)g(t) - \big(g(x)-g(a)\big)f(t)$, which has $h(a) = h(x)$.)

    With $f(a) = g(a) = 0$ this reads $\frac{f(x)}{g(x)} = \frac{f'(c)}{g'(c)}$. As $x \to a$, $c$ is squeezed toward $a$, so the right side tends to $L$.

!!! example "Examples"
    - $\displaystyle\lim_{x\to0}\frac{e^x - 1 - x}{x^2} = \lim\frac{e^x - 1}{2x} = \lim\frac{e^x}{2} = \frac12$ (applied twice).
    - $\displaystyle\lim_{x\to\infty}\frac{\ln x}{x} = \lim\frac{1/x}{1} = 0$: logs grow slower than any line.
    - $\displaystyle\lim_{x\to\infty}\frac{x^k}{e^x} = 0$: apply $k$ times. Exponentials beat polynomials.

    In the first one, check before *each* application: at $x = 0$, $\ e^0 - 1 - 0 = 0$ and $0^2 = 0$, so $\frac00$ ✓. After one step, $\frac{e^0 - 1}{0} = \frac00$ again ✓. After two steps, $\frac{e^0}{2} = \frac12$ is no longer indeterminate, so stop.

!!! warning "Two L'Hôpital mistakes"
    1. **Using it when the limit isn't $\frac00$ or $\frac\infty\infty$.** $\lim_{x\to0}\frac{x + 1}{x + 2} = \frac12$ by plugging in. L'Hôpital would wrongly give $\frac11 = 1$.
    2. **Using the quotient rule.** You differentiate top and bottom *separately*: $\frac{f'}{g'}$, not $\left(\frac fg\right)'$.

### Other indeterminate forms

Forms like $0 \cdot \infty$ and $1^\infty$ can be turned into $\frac00$ or $\frac\infty\infty$ first:

| Form | Trick | Example |
|---|---|---|
| $0 \cdot \infty$ | rewrite $fg$ as $\dfrac{f}{1/g}$ | $x\ln x$ as $x \to 0^+$ (exercise 4) |
| $1^\infty$, $0^0$, $\infty^0$ | take $\ln$, which turns the power into a product | below |

!!! example "Example: $\displaystyle\lim_{x \to 0^+}(1 + x)^{1/x} = e$, a $1^\infty$ form"
    Let $y = (1 + x)^{1/x}$.

    1. Take logs: $\ \ln y = \frac{1}{x}\ln(1 + x) = \frac{\ln(1 + x)}{x}$. At $x = 0$ this is $\frac00$.
    2. L'Hôpital: $\ \lim\frac{\ln(1 + x)}{x} = \lim\frac{1/(1 + x)}{1} = 1$.
    3. So $\ln y \to 1$, and since $e^u$ is continuous, $y = e^{\ln y} \to e^1 = e$.

    With $x = 1/n$ this is the compound-interest limit $\left(1 + \frac1n\right)^n \to e$ from [Phase 1](../foundations/exp-log-trig.md).

## 6. Newton's method

To solve $f(x) = 0$:

1. Start with a guess $x_0$.
2. Replace $f$ by its tangent line at $x_0$.
3. Solve *that* (easy) equation.

The tangent line $y = f(x_0) + f'(x_0)(x - x_0)$ hits zero where

$$
0 = f(x_0) + f'(x_0)(x - x_0) \quad\Longrightarrow\quad x - x_0 = -\frac{f(x_0)}{f'(x_0)}.
$$

So the next guess is

$$
x_1 = x_0 - \frac{f(x_0)}{f'(x_0)}.
$$

(This needs $f'(x_0) \neq 0$. A flat tangent never hits the axis.)

Repeat: $x_{k+1} = x_k - f(x_k)/f'(x_k)$.

<div class="viz" data-viz="newton"></div>

!!! example "Computing $\sqrt2$"
    Solve $x^2 - 2 = 0$:

    $$
    x_{k+1} = x_k - \frac{x_k^2 - 2}{2x_k} = \frac12\left(x_k + \frac{2}{x_k}\right).
    $$

    (Simplify: $x_k - \frac{x_k^2}{2x_k} + \frac{2}{2x_k} = x_k - \frac{x_k}{2} + \frac{1}{x_k} = \frac{x_k}{2} + \frac{1}{x_k}$.)

    The first step by hand: $x_1 = \frac12\left(1 + \frac21\right) = 1.5$. The second: $x_2 = \frac12\left(1.5 + \frac{2}{1.5}\right) = \frac12(1.5 + 1.3333) = 1.41667$.

    | $k$ | $x_k$ | correct digits |
    |---|---|---|
    | 0 | $1$ | |
    | 1 | $1.5$ | 1 |
    | 2 | $1.41667$ | 3 |
    | 3 | $1.4142157$ | 6 |
    | 4 | $1.41421356237$ | 12 |

    The number of correct digits roughly **doubles** each step.

??? proof "Why the digits double (deeper)"
    Let $r$ be the root and $e_k = x_k - r$ the error. Taylor's theorem ([next lessons](series-taylor.md)) gives, for some $\xi$ between $x_k$ and $r$,

    $$
    0 = f(r) = f(x_k) - f'(x_k)e_k + \tfrac12f''(\xi)e_k^2.
    $$

    Divide by $f'(x_k)$ and rearrange:

    $$
    e_{k+1} = x_{k+1} - r = e_k - \frac{f(x_k)}{f'(x_k)} = \frac{f''(\xi)}{2f'(x_k)}e_k^2.
    $$

    So $|e_{k+1}| \approx C|e_k|^2$: **quadratic convergence**. If the error is $10^{-3}$, the next is about $10^{-6}$.

    This needs $f'(r) \neq 0$ and a starting point close enough. The figure shows what can go wrong otherwise.

Newton's method applied to $f'$ (to find where $f' = 0$) is an optimization algorithm:

| Setting | Update |
|---|---|
| one variable | $x \leftarrow x - f'(x)/f''(x)$ |
| many variables ([Phase 7](../optimization/gradient-descent.md)) | $x \leftarrow x - H^{-1}\nabla f$ |

!!! ml "Where this shows up"
    - **Training** is finding a minimum.
        - Fermat's theorem is why we look for zero gradients.
        - The second-derivative test (Hessian eigenvalues) is how we tell minima from saddle points.
    - **The MVT / Lipschitz bound** is the workhorse of convergence proofs: it bounds how much the loss can change in one step.
    - **Newton's method** and its approximations (L-BFGS, Gauss–Newton, natural gradient) are second-order optimizers. Adam can be viewed as a cheap diagonal approximation of second-order scaling.

## Check yourself

**1.** Find the global max and min of $f(x) = x^3 - 3x$ on $[-2, 3]$.

??? success "Solution"
    $f'(x) = 3x^2 - 3 = 0$ at $x = \pm1$. Evaluate at critical points and endpoints:

    | $x$ | $-2$ | $-1$ | $1$ | $3$ |
    |---|---|---|---|---|
    | $f(x)$ | $-2$ | $2$ | $-2$ | $18$ |

    - **Max** $18$ at $x=3$.
    - **Min** $-2$ at $x = -2$ and $x = 1$.

**2.** Prove that $e^x \geq 1 + x$ for all $x$.

??? success "Solution"
    Let $g(x) = e^x - 1 - x$.

    - $g'(x) = e^x - 1$ is negative for $x<0$ and positive for $x>0$.
    - So $g$ decreases then increases, and its minimum is $g(0) = 0$.
    - Hence $g \geq 0$.

    This inequality is used constantly, e.g. $1 - p \leq e^{-p}$ in probability bounds.

**3.** Show that $|\sin a - \sin b| \leq |a - b|$ for all $a, b$.

??? success "Solution"
    MVT: $\sin a - \sin b = \cos(c)(a - b)$ for some $c$, and $|\cos c| \leq 1$.

**4.** Compute $\displaystyle\lim_{x\to0^+} x\ln x$. (Hint: rewrite as $\frac{\ln x}{1/x}$.)

??? success "Solution"
    $\frac{\ln x}{1/x}$ is $\frac{-\infty}{\infty}$. L'Hôpital: $\frac{1/x}{-1/x^2} = -x \to 0$. So $x\ln x \to 0$.

    This is why $0\log 0$ is taken to be $0$ in the definition of entropy.

**5.** Fit $y = wx$ to the data $(1, 2), (2, 3), (3, 7)$ by least squares.

??? success "Solution"
    - $\sum x_iy_i = 2 + 6 + 21 = 29$
    - $\sum x_i^2 = 1 + 4 + 9 = 14$
    - $w^* = 29/14 \approx 2.07$

**6.** Write the Newton iteration for $\sqrt[3]{5}$ and do two steps from $x_0 = 2$.

??? success "Solution"
    $f(x) = x^3 - 5$, so

    $$
    x_{k+1} = x_k - \frac{x_k^3 - 5}{3x_k^2} = \frac{2x_k}{3} + \frac{5}{3x_k^2}.
    $$

    - $x_1 = \frac43 + \frac{5}{12} = 1.75$
    - $x_2 = 1.1667 + 0.5442 = 1.7109$ (true value: $1.70998$)

**7.** In the figure, start Newton's method at $x_0 = 0$ for $f(x) = x^3 - 2x + 2$. Verify by hand that it cycles.

??? success "Solution"
    - $f(0) = 2$, $f'(0) = -2$, so $x_1 = 0 - 2/(-2) = 1$.
    - $f(1) = 1$, $f'(1) = 1$, so $x_2 = 1 - 1 = 0$.

    Back to the start: the iteration alternates $0, 1, 0, 1, \ldots$ forever.
