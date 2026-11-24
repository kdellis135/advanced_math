# Partial derivatives and the gradient

<div class="lesson-meta" markdown>
**Phase 4 · Lesson 1** · ⏱ ~3 hours · Needs: [Derivatives](../calculus/derivatives.md), [Vectors and the dot product](../linear-algebra/vectors.md)
</div>

A loss function depends on many parameters at once. To decrease it we need to know:

- If I nudge the parameters, how does the loss change?
- Which nudge decreases it fastest?

The answer is a single vector, the **gradient**:

- it points uphill;
- it's perpendicular to the contour lines;
- its length is the steepness.

## 1. Functions of several variables

A function $f : \R^n \to \R$ takes a vector and returns a number. For $n = 2$ we can picture it two ways:

- as a **surface** $z = f(x, y)$;
- better, as a **contour map**: curves $f(x, y) = c$ for several levels $c$, like a hiking map.

Closely spaced contours mean steep terrain.

!!! example "Example: two functions, as surfaces and as contour maps"
    | Function | Surface | Contours $f = c$ |
    |---|---|---|
    | $f(x, y) = x + 2y$ | a tilted flat plane | parallel straight lines $x + 2y = c$ |
    | $f(x, y) = x^2 + y^2$ | a round bowl, lowest at the origin | circles of radius $\sqrt c$ |
    | $f(x, y) = x^2 + 4y^2$ | a bowl, steeper in $y$ | ellipses, squashed in the $y$-direction |

    Some values of the bowl $x^2 + y^2$, to see the circles:

    | Point | $(1, 0)$ | $(0, 1)$ | $(0.6, 0.8)$ | $(2, 0)$ | $(1.2, 1.6)$ |
    |---|---|---|---|---|---|
    | $f$ | $1$ | $1$ | $1$ | $4$ | $4$ |

    The first three points sit on the level-1 circle, the last two on the level-4 circle (radius 2). The circles for $c = 1, 4, 9, 16$ have radii $1, 2, 3, 4$: evenly spaced radii, but the height grows faster and faster, so the bowl gets steeper as you move out.

## 2. Partial derivatives

The simplest way to probe $f$: freeze all variables except one, and differentiate in that one.

!!! definition "Definition: partial derivative"
    $$
    \frac{\partial f}{\partial x_i}(\vv x) = \lim_{h\to0}\frac{f(\vv x + h\vv e_i) - f(\vv x)}{h}.
    $$

    It's the slope of $f$ when you walk in the direction of the $i$-th axis.

    Other notations: $f_{x_i}$, $\ \partial_i f$, $\ \partial_{x_i} f$. The curly $\partial$ (read "partial") signals that other variables exist and are being held fixed.

**Picture it as a slice.** Fix $y = 1$ in the bowl $f(x, y) = x^2 + y^2$. What's left is the ordinary one-variable function $g(x) = x^2 + 1$: the curve where the vertical plane $y = 1$ cuts the bowl. Its slope is $g'(x) = 2x$. That's $\frac{\partial f}{\partial x}$.

So you already know how to compute partial derivatives: **treat every other variable as a constant number, and use the ordinary rules.**

!!! example "Example"
    $f(x, y) = x^2y + \sin y$.

    - Treat $y$ as a constant: $\frac{\partial f}{\partial x} = 2xy$.
    - Treat $x$ as a constant: $\frac{\partial f}{\partial y} = x^2 + \cos y$.

    In the first, $x^2 y$ is "a constant times $x^2$," so its derivative is that constant times $2x$. And $\sin y$ doesn't involve $x$ at all, so it's a constant with derivative $0$.

!!! example "Example: more partial derivatives"
    | $f(x, y)$ | $\partial f/\partial x$ | $\partial f/\partial y$ |
    |---|---|---|
    | $3x + 5y$ | $3$ | $5$ |
    | $x^2 + 2y^2$ | $2x$ | $4y$ |
    | $xy$ | $y$ | $x$ |
    | $e^{xy}$ | $y\,e^{xy}$ (chain rule) | $x\,e^{xy}$ |
    | $\dfrac{x}{y}$ | $\dfrac1y$ | $-\dfrac{x}{y^2}$ |

    At a specific point, plug in after differentiating. For $xy$ at $(2, 3)$: $\frac{\partial f}{\partial x} = 3$ (moving in $x$, $f$ grows 3 times as fast) and $\frac{\partial f}{\partial y} = 2$.

## 3. The gradient

!!! definition "Definition: gradient"
    The **gradient** of $f : \R^n\to\R$ is the vector of all partial derivatives:

    $$
    \nabla f(\vv x) = \begin{pmatrix}\partial f/\partial x_1\\ \vdots\\ \partial f/\partial x_n\end{pmatrix}.
    $$

For $f(x, y) = x^2 + 2y^2$: $\nabla f = (2x, 4y)$. At $(1, 1)$ it's $(2, 4)$.

($\nabla$ is read "nabla" or "del," and $\nabla f$ "grad $f$." The gradient is a **vector field**: at every point it's a different arrow.)

!!! example "Example: drawing the gradient of the bowl $x^2 + y^2$"
    $\nabla f = (2x, 2y) = 2(x, y)$.

    | Point | $\nabla f$ | Direction | Length |
    |---|---|---|---|
    | $(1, 0)$ | $(2, 0)$ | straight away from the origin | $2$ |
    | $(0, 1)$ | $(0, 2)$ | straight away from the origin | $2$ |
    | $(2, 2)$ | $(4, 4)$ | straight away from the origin | $\approx 5.66$ |
    | $(0, 0)$ | $(0, 0)$ | none: the bottom of the bowl | $0$ |

    Every arrow points directly uphill (away from the bottom), and gets longer where the bowl is steeper. Sections 5 and 6 explain why that's always true.

## 4. Differentiability: the real definition

Partial derivatives only look along the axes. What about other directions? The right notion generalizes the [linear-approximation definition](../calculus/derivatives.md#2-the-derivative-as-best-linear-approximation) of the derivative:

!!! definition "Definition: differentiable"
    $f : \R^n\to\R$ is **differentiable** at $\vv x$ if there is a vector $\vv g$ such that

    $$
    f(\vv x + \vv h) = f(\vv x) + \vv g\cdot\vv h + r(\vv h), \qquad \frac{r(\vv h)}{\norm{\vv h}} \to 0 \text{ as } \vv h \to \vv 0.
    $$

    Then $\vv g = \nabla f(\vv x)$ (take $\vv h = t\vv e_i$ to see that $g_i = \partial f/\partial x_i$).

!!! intuition "The tangent plane"
    Near $\vv x$, the surface looks like the plane

    $$
    z = f(\vv x) + \nabla f\cdot(\vv y - \vv x).
    $$

    The gradient is the "slope vector" of that plane.

In words: **change in $f$ ≈ gradient · (change in input).** Each coordinate change $h_i$ gets multiplied by its own slope $\frac{\partial f}{\partial x_i}$, and the effects add up:

$$
\Delta f \approx \frac{\partial f}{\partial x_1}h_1 + \cdots + \frac{\partial f}{\partial x_n}h_n.
$$

!!! example "Example: estimating a value with the gradient"
    Estimate $f(1.1, 0.9)$ for $f(x, y) = x^2 + 2y^2$, starting from $(1, 1)$.

    - $f(1, 1) = 3$ and $\nabla f(1, 1) = (2, 4)$.
    - The step is $\vv h = (0.1, -0.1)$.
    - $\nabla f\cdot\vv h = 2(0.1) + 4(-0.1) = -0.2$.
    - Estimate: $f(1.1, 0.9) \approx 3 - 0.2 = 2.8$.

    The true value is $1.21 + 1.62 = 2.83$. The small difference is the error term $r(\vv h)$, which shrinks faster than the step.

!!! theorem "Theorem"
    If all partial derivatives exist and are continuous near $\vv x$, then $f$ is differentiable at $\vv x$.

This is the practical test. Every function you'll differentiate in ML satisfies it, away from kinks like ReLU's.

Mere existence of partials is *not* enough. Take $f(x,y) = \frac{xy}{x^2 + y^2}$, with $f(0,0) = 0$:

- both partials equal 0 at the origin;
- yet along the diagonal it's constantly $\frac12$, so it isn't even continuous there.

## 5. Directional derivatives

!!! definition "Definition"
    For a unit vector $\vv u$, the **directional derivative** is the slope of $f$ when walking in direction $\vv u$:

    $$
    D_{\vv u}f(\vv x) = \lim_{t\to0}\frac{f(\vv x + t\vv u) - f(\vv x)}{t}.
    $$

!!! theorem "Theorem"
    If $f$ is differentiable at $\vv x$, then $D_{\vv u}f(\vv x) = \nabla f(\vv x)\cdot\vv u$.

!!! proof "Proof"
    Set $\vv h = t\vv u$ in the definition of differentiability:

    $$
    \frac{f(\vv x + t\vv u) - f(\vv x)}{t} = \nabla f\cdot\vv u + \frac{r(t\vv u)}{t}.
    $$

    Since $\norm{t\vv u} = |t|$, the last term tends to 0.

So the gradient knows the slope in *every* direction: just dot it with the direction.

!!! example "Example: slopes in several directions"
    $f(x, y) = x^2 + 2y^2$ at $(1, 1)$, where $\nabla f = (2, 4)$.

    | Direction | Unit vector $\vv u$ | Slope $\nabla f\cdot\vv u$ |
    |---|---|---|
    | east | $(1, 0)$ | $2$ (that's $\partial f/\partial x$) |
    | north | $(0, 1)$ | $4$ (that's $\partial f/\partial y$) |
    | northeast | $\frac{1}{\sqrt2}(1, 1)$ | $\frac{6}{\sqrt2} \approx 4.24$ |
    | southeast | $\frac{1}{\sqrt2}(1, -1)$ | $\frac{-2}{\sqrt2} \approx -1.41$ (downhill) |

    Remember to **normalize** the direction first. Using $(1, 1)$ instead of $\frac{1}{\sqrt2}(1, 1)$ would give $6$, which is the slope times the length of the step.

## 6. The three facts about the gradient

!!! theorem "The gradient points in the direction of steepest ascent"
    Among all unit directions $\vv u$, the slope $D_{\vv u}f = \nabla f\cdot\vv u$ is largest when $\vv u = \nabla f/\norm{\nabla f}$.

    - The maximal slope is $\norm{\nabla f}$.
    - The steepest *descent* direction is $-\nabla f$.

!!! proof "Proof"
    By Cauchy–Schwarz, $\nabla f\cdot\vv u \leq \norm{\nabla f}\norm{\vv u} = \norm{\nabla f}$, with equality iff $\vv u$ is a positive multiple of $\nabla f$.

    Equivalently, $\nabla f\cdot\vv u = \norm{\nabla f}\cos\theta$, which is maximal at $\theta = 0$.

!!! theorem "The gradient is perpendicular to the contour lines"
    If $\vv r(t)$ is a curve lying on a level set, $f(\vv r(t)) = c$, then $\nabla f(\vv r(t))\cdot\vv r'(t) = 0$.

!!! proof "Proof"
    Differentiate $f(\vv r(t)) = c$ using the multivariable chain rule ([next lesson](chain-rule.md)): $\nabla f\cdot\vv r'(t) = 0$. The velocity $\vv r'$ is tangent to the contour, so the gradient is perpendicular to it.

    Intuitively: walking along a contour, $f$ doesn't change, so the slope in that direction, $\nabla f\cdot\vv u$, is zero.

Check it on the bowl $x^2 + y^2$. The contour through $(x, y)$ is a circle around the origin, whose tangent direction is $(-y, x)$. The gradient is $(2x, 2y)$. Their dot product is $-2xy + 2xy = 0$. ✓ The gradient points along the radius, the contour runs around the circle, and those are perpendicular.

The third fact: **at a local minimum or maximum, $\nabla f = \vv 0$.** Each partial derivative is a 1D derivative at an extremum, so Fermat's theorem applies.

Points with $\nabla f = \vv 0$ are **critical points**.

<div class="viz" data-viz="gradient"></div>

## 7. Gradient descent, the first look

To minimize $f$, repeatedly step against the gradient:

$$
\vv x_{k+1} = \vv x_k - \eta\nabla f(\vv x_k),
$$

where $\eta > 0$ is the **learning rate**. Why does it work? By differentiability,

$$
f(\vv x - \eta\nabla f) = f(\vv x) - \eta\norm{\nabla f}^2 + o(\eta),
$$

so for small enough $\eta$ the function decreases (unless $\nabla f = 0$, in which case we're at a critical point).

(Plug $\vv h = -\eta\nabla f$ into the linear approximation: $\nabla f\cdot\vv h = -\eta\,\nabla f\cdot\nabla f = -\eta\norm{\nabla f}^2$. The notation $o(\eta)$, "little-o of $\eta$," means an error that is small *even compared to $\eta$*: $o(\eta)/\eta \to 0$. So for small $\eta$, the negative term $-\eta\norm{\nabla f}^2$ wins.)

!!! example "Example: two steps of gradient descent by hand"
    Minimize $f(x, y) = x^2 + 2y^2$ from $(2, 1)$ with $\eta = 0.1$. The gradient is $(2x, 4y)$.

    | Step | Point | $f$ | $\nabla f$ | Next point $= \text{point} - 0.1\nabla f$ |
    |---|---|---|---|---|
    | 0 | $(2, 1)$ | $6$ | $(4, 4)$ | $(1.6, 0.6)$ |
    | 1 | $(1.6, 0.6)$ | $3.28$ | $(3.2, 2.4)$ | $(1.28, 0.36)$ |
    | 2 | $(1.28, 0.36)$ | $1.897$ | | |

    The value drops each step, toward the minimum $0$ at the origin. Notice $y$ shrinks faster than $x$ (by factors $0.6$ vs $0.8$): the bowl is steeper in $y$, so the gradient pushes harder there.

How small $\eta$ must be, and how fast it converges, are covered in [Phase 7](../optimization/gradient-descent.md).

!!! ml "Where this shows up"
    - **Training any model:** the gradient of the loss with respect to all parameters, $\nabla_\theta L$, tells each parameter which way to move.
        - With a billion parameters, it's a billion-dimensional vector computed by backpropagation.
    - **Saliency maps:** the gradient of a class score with respect to the input pixels shows which pixels most affect the prediction.
    - **Adversarial examples:** the fast gradient sign method perturbs an image by $\epsilon\,\sgn(\nabla_{\vv x}L)$ to fool a classifier.
        - That's a step of steepest ascent in the $\ell_\infty$ geometry.

## Check yourself

**1.** Compute $\nabla f$ for $f(x,y,z) = xe^{yz}$.

??? success "Solution"
    $(e^{yz},\ xze^{yz},\ xye^{yz})$.

**2.** For $f(x, y) = x^2 + 3xy$, find the directional derivative at $(1, 2)$ in the direction of $(3, 4)$.

??? success "Solution"
    - $\nabla f = (2x + 3y, 3x) = (8, 3)$ at $(1,2)$.
    - The unit direction is $(0.6, 0.8)$.
    - $D_{\vv u}f = 8(0.6) + 3(0.8) = 4.8 + 2.4 = 7.2$.

**3.** At $(1, 2)$, in which direction does $f$ from Exercise 2 decrease fastest, and at what rate?

??? success "Solution"
    - **Direction:** $-\nabla f/\norm{\nabla f} = -(8, 3)/\sqrt{73}$.
    - **Rate:** $\sqrt{73} \approx 8.54$ per unit distance.

**4.** Find all critical points of $f(x,y) = x^3 - 3x + y^2$.

??? success "Solution"
    $\nabla f = (3x^2 - 3, 2y) = \vv 0$ at $(1, 0)$ and $(-1, 0)$.

    (The [Hessian lesson](hessian.md) shows $(1,0)$ is a minimum and $(-1, 0)$ a saddle.)

**5.** Find the tangent plane to $z = x^2 + y^2$ at $(1, 1, 2)$.

??? success "Solution"
    $\nabla f(1,1) = (2, 2)$, so the plane is

    $$
    z = 2 + 2(x - 1) + 2(y - 1) = 2x + 2y - 2.
    $$

**6.** Show that for $f(\vv x) = \vv a\cdot\vv x$, $\nabla f = \vv a$. Interpret: why is the steepest direction of a linear function the same everywhere?

??? success "Solution"
    $f = \sum a_ix_i$, so $\partial f/\partial x_i = a_i$.

    A linear function is a tilted plane with the same slope everywhere. Its contours are parallel lines (hyperplanes) perpendicular to $\vv a$.
