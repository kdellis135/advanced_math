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

## 2. Partial derivatives

The simplest way to probe $f$: freeze all variables except one, and differentiate in that one.

!!! definition "Definition: partial derivative"
    $$
    \frac{\partial f}{\partial x_i}(\vv x) = \lim_{h\to0}\frac{f(\vv x + h\vv e_i) - f(\vv x)}{h}.
    $$

    It's the slope of $f$ when you walk in the direction of the $i$-th axis.

!!! example "Example"
    $f(x, y) = x^2y + \sin y$.

    - Treat $y$ as a constant: $\frac{\partial f}{\partial x} = 2xy$.
    - Treat $x$ as a constant: $\frac{\partial f}{\partial y} = x^2 + \cos y$.

## 3. The gradient

!!! definition "Definition: gradient"
    The **gradient** of $f : \R^n\to\R$ is the vector of all partial derivatives:

    $$
    \nabla f(\vv x) = \begin{pmatrix}\partial f/\partial x_1\\ \vdots\\ \partial f/\partial x_n\end{pmatrix}.
    $$

For $f(x, y) = x^2 + 2y^2$: $\nabla f = (2x, 4y)$. At $(1, 1)$ it's $(2, 4)$.

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
