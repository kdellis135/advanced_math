---
description: "The epsilon-delta definition of a limit built up step by step, with limit laws, the squeeze theorem, sin(x)/x, limits of sequences and continuity."
---

# Limits and continuity

<div class="lesson-meta" markdown>
**Phase 2 · Lesson 1** · ⏱ ~3.5 hours · Needs: [Logic and proofs](../foundations/logic-and-proofs.md) (quantifiers!)
</div>

All of calculus rests on one idea: what happens to $f(x)$ as $x$ gets *close* to $a$, without caring what happens *at* $a$.

Newton and Leibniz used this idea informally for 150 years before anyone could say precisely what "close" means.

The precise version, the ε–δ definition, is the most famous stumbling block in university math. We'll build it up slowly until it feels inevitable.

## 1. The intuition

Consider $f(x) = \dfrac{x^2 - 1}{x - 1}$.

- At $x = 1$ it's $\frac00$, undefined.
- For every $x \neq 1$ we can cancel: $f(x) = x + 1$.

(Why can we cancel? Factor the top: $x^2 - 1 = (x - 1)(x + 1)$. Dividing $(x-1)(x+1)$ by $(x - 1)$ is allowed whenever $x - 1 \neq 0$, i.e. $x \neq 1$.)

Before any theory, just compute some values. Approach $1$ from both sides:

| $x$ | $0.9$ | $0.99$ | $0.999$ | $1$ | $1.001$ | $1.01$ | $1.1$ |
|---|---|---|---|---|---|---|---|
| $f(x)$ | $1.9$ | $1.99$ | $1.999$ | undefined | $2.001$ | $2.01$ | $2.1$ |

The outputs close in on $2$ from both sides. The graph of $f$ is the line $y = x + 1$ with a single missing point, a "hole," at $(1, 2)$.

So as $x$ approaches 1, $f(x)$ approaches 2, even though $f(1)$ doesn't exist. We write

$$
\lim_{x \to 1} \frac{x^2 - 1}{x - 1} = 2.
$$

Read it as "the limit of $f(x)$ as $x$ approaches 1 is 2."

The derivative will be exactly this kind of limit: a $\frac00$ expression that nonetheless approaches a definite value. (There it is $\frac{\text{change in } f}{\text{change in } x}$ as both changes shrink.)

!!! warning "A table of values suggests, it doesn't prove"
    Tables can fool you. $\sin(\pi/x)$ at $x = 0.1, 0.01, 0.001, \dots$ gives $0, 0, 0, \dots$ (since $\sin(10\pi) = \sin(100\pi) = 0$). But the limit as $x \to 0$ doesn't exist: at other points like $x = 2/21$ the value is $1$.

    That's why we need a precise definition.

## 2. Making "close" precise

### Warm-up: absolute value as distance

$|x - a|$ is the **distance** between $x$ and $a$ on the number line. For example, $|5 - 2| = 3$ and $|2 - 5| = 3$.

So an inequality like $|x - a| < \delta$ describes a **window** around $a$:

$$
|x - a| < \delta \iff -\delta < x - a < \delta \iff a - \delta < x < a + \delta.
$$

Example: $|x - 2| < 0.1$ means $1.9 < x < 2.1$.

Adding the condition $0 < |x - a|$ just says $x \neq a$: the window with its center point removed.

One fact about distances we'll use repeatedly, the **triangle inequality**:

$$
|u + v| \leq |u| + |v|.
$$

If $u$ and $v$ have the same sign it's an equality ($|3 + 4| = 7$). If they have opposite signs, they partly cancel and the left side is smaller ($|3 + (-4)| = 1 < 7$). Either way, it's never bigger.

### The definition

"$f(x)$ approaches $L$ as $x$ approaches $a$" should mean: **you can make $f(x)$ as close to $L$ as you like, by making $x$ close enough to $a$.**

Turn it into a game:

1. A skeptic names a tolerance $\varepsilon > 0$: "get $f(x)$ within $\varepsilon$ of $L$."
2. You respond with a $\delta > 0$: "fine, just keep $x$ within $\delta$ of $a$."
3. You win if *every* such $x$ (other than $a$ itself) works.

The limit is $L$ if you can win **no matter which $\varepsilon$** the skeptic picks.

!!! example "Playing a few rounds, for $f(x) = 3x + 1$ near $a = 2$, $L = 7$"
    | Skeptic's $\varepsilon$ | Your $\delta$ | Why it works |
    |---|---|---|
    | $1$ | $\frac13$ | $x \in (\frac53, \frac73)$ gives $3x + 1 \in (6, 8)$, within $1$ of $7$ |
    | $0.1$ | $\frac{0.1}{3} \approx 0.033$ | $3x + 1$ moves 3 times as much as $x$, so a third of the tolerance suffices |
    | $0.001$ | $\frac{0.001}{3}$ | same reasoning |

    A pattern appears: $\delta = \varepsilon/3$ always wins. When you can give a *formula* for $\delta$ in terms of $\varepsilon$, you've proved the limit. That's what the examples below do.

!!! definition "Definition: limit"
    $\displaystyle\lim_{x \to a} f(x) = L$ means:

    $$
    \forall \varepsilon > 0\ \ \exists \delta > 0\ \ \forall x:\quad 0 < |x - a| < \delta \ \Rightarrow\ |f(x) - L| < \varepsilon.
    $$

Read it slowly, quantifier by quantifier:

| Piece | Meaning |
|---|---|
| $\forall \varepsilon > 0$ | for every tolerance ε, |
| $\exists \delta > 0$ | there is a window δ, |
| $\forall x: 0 < \lvert x - a\rvert < \delta$ | such that every x in the window (except a itself) |
| $\Rightarrow \lvert f(x) - L\rvert < \varepsilon$ | has f(x) within the tolerance. |

The condition $0 < |x - a|$ excludes $x = a$: the value at $a$ is irrelevant.

<div class="viz" data-viz="limit"></div>

!!! intuition "Why this definition and not something simpler?"
    - **"f(x) gets closer and closer to L" is not enough.** $1/x$ gets closer and closer to $-1$ as $x$ grows, but never reaches it, and its limit is $0$.
    - **"f(x) eventually equals L" is too strict.**

    The ε–δ form says exactly "arbitrarily close, eventually," and it is checkable with algebra.

### Proving limits with ε–δ

The standard technique works *backwards*:

1. Start from $|f(x) - L| < \varepsilon$.
2. Figure out what $|x - a|$ needs to be.
3. Then write the proof forwards.

!!! example "Example: $\lim_{x\to2}(3x + 1) = 7$"
    *Scratch work:* $|f(x) - 7| = |3x - 6| = 3|x - 2|$. To make this $< \varepsilon$ we need $|x - 2| < \varepsilon/3$.

    *Proof:* Let $\varepsilon > 0$. Choose $\delta = \varepsilon/3$.

    If $0 < |x - 2| < \delta$, then $|(3x+1) - 7| = 3|x - 2| < 3\delta = \varepsilon$.

This first example was easy because $|f(x) - L|$ turned out to be a constant times $|x - a|$. For curves, the constant varies with $x$, and we need one more trick.

!!! example "Example: $\lim_{x \to 2} x^2 = 4$"
    *Scratch:* $|x^2 - 4| = |x - 2|\,|x + 2|$.

    We control $|x - 2|$ (that's what $\delta$ does), but there's an extra factor $|x + 2|$. It isn't a constant, so we can't just divide by it. Instead, find an upper bound for it:

    - If we insist $|x - 2| < 1$, then $1 < x < 3$, so $|x + 2| < 5$.
    - Then $|x^2 - 4| < 5|x - 2|$, which is $< \varepsilon$ when $|x - 2| < \varepsilon/5$.

    *Proof:* Let $\varepsilon > 0$ and choose $\delta = \min(1, \varepsilon/5)$. If $0 < |x - 2| < \delta$:

    - $|x - 2| < 1$ gives $|x + 2| < 5$;
    - so $|x^2 - 4| = |x-2||x+2| < 5 \cdot \frac{\varepsilon}{5} = \varepsilon$.

    Why the $\min$? We need **both** $|x - 2| < 1$ (to bound $|x + 2|$) and $|x - 2| < \varepsilon/5$ (to finish). Taking $\delta$ to be the smaller of the two guarantees both.

    Sanity check with $\varepsilon = 0.1$: $\delta = \min(1, 0.02) = 0.02$. At the edge $x = 2.02$, $x^2 = 4.0804$, within $0.1$ of $4$. ✓

The "$\min(1, \ldots)$" trick (first restrict to a bounded window, then shrink further) handles almost every polynomial example.

!!! tip "You won't do ε–δ every day"
    The point of these proofs is to understand what a limit *means*, and to be able to read proofs in books and papers. In practice you'll compute limits with the laws and techniques in the next two sections, which are themselves proved with ε–δ once and for all.

### One-sided limits

Sometimes $f$ behaves differently on each side of $a$. We can look at one side at a time:

- $\displaystyle\lim_{x \to a^+} f(x) = L$ (**from the right**): same definition, but only for $x > a$, i.e. $a < x < a + \delta$.
- $\displaystyle\lim_{x \to a^-} f(x) = L$ (**from the left**): only for $x < a$.

The two-sided limit exists exactly when both one-sided limits exist and are equal.

!!! example "Example: three ways a limit can fail to exist"
    | Function at $0$ | From the left | From the right | Two-sided limit |
    |---|---|---|---|
    | $\dfrac{\lvert x\rvert}{x}$ ($-1$ for $x<0$, $1$ for $x>0$) | $-1$ | $1$ | doesn't exist (**jump**) |
    | $\dfrac{1}{x}$ | $-\infty$ | $+\infty$ | doesn't exist (**blow-up**) |
    | $\sin(1/x)$ | none | none | doesn't exist (**oscillation**) |

    For $\sin(1/x)$: as $x \to 0$, $1/x$ races through infinitely many full cycles, so $\sin(1/x)$ keeps hitting every value in $[-1, 1]$ and settles on nothing.

We write $\lim_{x \to 0^+} \frac{1}{x} = +\infty$ to describe *how* it fails: the values grow without bound. This is shorthand; $\infty$ is not a number, so the limit still doesn't exist in the strict sense.

## 3. Limit laws

You don't want to do ε–δ every time. Instead, prove a few general rules once.

!!! theorem "Theorem: limit laws"
    If $\lim_{x\to a} f(x) = L$ and $\lim_{x\to a} g(x) = M$, then

    1. $\lim (f + g) = L + M$
    2. $\lim (cf) = cL$
    3. $\lim (fg) = LM$
    4. $\lim (f/g) = L/M$, provided $M \neq 0$.

!!! proof "Proof of the sum law"
    Let $\varepsilon > 0$. Use the tolerance $\varepsilon/2$ for each function:

    - there is $\delta_1$ with $|f(x) - L| < \varepsilon/2$ when $0<|x-a|<\delta_1$;
    - there is $\delta_2$ with $|g(x) - M| < \varepsilon/2$ when $0<|x-a|<\delta_2$.

    (We're allowed to ask for $\varepsilon/2$: the definition of "$f \to L$" works for *every* positive tolerance, and $\varepsilon/2$ is one.)

    Let $\delta = \min(\delta_1, \delta_2)$, so both hold. First regroup the error: $(f + g)(x) - (L + M) = \big(f(x) - L\big) + \big(g(x) - M\big)$. Then apply the triangle inequality $|u + v| \leq |u| + |v|$:

    $$
    |(f + g)(x) - (L + M)| \leq |f(x) - L| + |g(x) - M| < \tfrac\varepsilon2 + \tfrac\varepsilon2 = \varepsilon.
    $$

    The key idea: **split the error budget.**

??? proof "Proof of the product law (deeper)"
    Write $fg - LM = f(g - M) + M(f - L)$, so $|fg - LM| \leq |f||g - M| + |M||f - L|$.

    Near $a$, $f$ is bounded: taking tolerance 1, $|f(x) - L| < 1$ gives $|f(x)| < |L| + 1$.

    Choose $\delta$ small enough that all three hold at once:

    - $|f(x)| < |L| + 1$,
    - $|g(x) - M| < \frac{\varepsilon}{2(|L| + 1)}$,
    - $|f(x) - L| < \frac{\varepsilon}{2(|M| + 1)}$.

    Then

    $$
    |fg - LM| < (|L|+1)\frac{\varepsilon}{2(|L|+1)} + |M|\frac{\varepsilon}{2(|M|+1)} < \frac\varepsilon2 + \frac\varepsilon2 = \varepsilon.
    $$

Since $\lim_{x \to a} x = a$ and $\lim c = c$ are obvious, the laws immediately give the limit of any polynomial or rational function by plugging in (where the denominator isn't 0).

For instance, here is $\lim_{x \to 2}(x^2 + 3x)$ built from the laws, one at a time:

$$
\lim_{x\to2}(x^2 + 3x) \overset{\text{sum}}{=} \lim x \cdot \lim x + 3 \lim x \overset{\text{product, const.}}{=} 2 \cdot 2 + 3 \cdot 2 = 10.
$$

That's the same as just plugging in $x = 2$. The laws are what *justify* plugging in.

## 4. Computing limits in practice

When plugging in gives a sensible number, that's the answer. The interesting case is when it gives $\frac{0}{0}$. This is called an **indeterminate form**: it could turn out to be anything, and you need to rewrite the expression first.

The idea behind every technique below: **find a different formula that equals $f(x)$ for all $x \neq a$ and can be plugged into.** Since the limit ignores the value at $a$, the two formulas have the same limit.

**Technique 1: factor and cancel.**

$$
\lim_{x \to 3}\frac{x^2 - 5x + 6}{x - 3} = \lim_{x \to 3}\frac{(x - 2)(x - 3)}{x - 3} = \lim_{x\to3}(x - 2) = 1.
$$

If plugging $a$ into a polynomial gives $0$, then $(x - a)$ is a factor. That's how you know what to look for.

**Technique 2: multiply by the conjugate** (for square roots).

$$
\lim_{x \to 0}\frac{\sqrt{x + 4} - 2}{x}.
$$

Plugging in gives $\frac00$. Multiply top and bottom by $\sqrt{x+4} + 2$, using $(A - B)(A + B) = A^2 - B^2$:

$$
\frac{\sqrt{x+4} - 2}{x}\cdot\frac{\sqrt{x+4}+2}{\sqrt{x+4}+2} = \frac{(x + 4) - 4}{x(\sqrt{x+4}+2)} = \frac{1}{\sqrt{x+4}+2} \xrightarrow{x\to0} \frac14.
$$

**Technique 3: combine fractions.**

$$
\lim_{x\to0}\frac{1}{x}\left(\frac{1}{2 + x} - \frac12\right) = \lim_{x\to0}\frac1x\cdot\frac{2 - (2 + x)}{2(2+x)} = \lim_{x\to0}\frac{-1}{2(2 + x)} = -\frac14.
$$

**Technique 4: squeeze**, for expressions you can trap between two simpler ones. That's the next section.

!!! warning "Not every $\frac{\text{nonzero}}{0}$ is indeterminate"
    If plugging in gives $\frac{5}{0}$, the limit doesn't exist as a number: the expression blows up. Check one-sided limits to see whether it goes to $+\infty$ or $-\infty$.

    Only $\frac00$ (and a few others like $\frac{\infty}{\infty}$, met in [Using derivatives](applications.md)) call for rewriting.

## 5. The squeeze theorem and $\frac{\sin x}{x}$

!!! theorem "Theorem: squeeze"
    If $g(x) \leq f(x) \leq h(x)$ near $a$, and $\lim g = \lim h = L$, then $\lim f = L$.

!!! proof "Proof"
    Given $\varepsilon$, pick $\delta$ so that both $g$ and $h$ are within $\varepsilon$ of $L$:

    $$
    L - \varepsilon < g(x) \leq f(x) \leq h(x) < L + \varepsilon.
    $$

    So $f$ is too.

Picture: $f$ is trapped between two functions that both funnel into the point $(a, L)$. It has nowhere else to go.

!!! example "Example: $\lim_{x \to 0} x^2\cos(1/x) = 0$"
    $\cos(1/x)$ oscillates wildly, so the laws don't apply (it has no limit at 0). But it's always between $-1$ and $1$.

    1. Multiply $-1 \leq \cos(1/x) \leq 1$ by $x^2 \geq 0$: $\ -x^2 \leq x^2\cos(1/x) \leq x^2$.
    2. Both $-x^2$ and $x^2$ tend to $0$.
    3. By squeeze, so does $x^2 \cos(1/x)$.

    The pattern "(something going to 0) × (something bounded) → 0" comes up constantly.

The most important application:

!!! theorem "Theorem"
    $$
    \lim_{x \to 0} \frac{\sin x}{x} = 1.
    $$

!!! proof "Proof"
    Take $0 < x < \pi/2$ and look at the unit circle. Compare three nested areas:

    | Shape | Area |
    |---|---|
    | triangle $(0,0), (1,0), (\cos x, \sin x)$ | $\frac12\sin x$ |
    | circular sector of angle $x$ | $\frac12 x$ |
    | larger triangle $(0,0), (1, 0), (1, \tan x)$ | $\frac12\tan x$ |

    Where the areas come from:

    - **Small triangle:** base $1$ (along the $x$-axis), height $\sin x$. Area $= \frac12 \cdot 1 \cdot \sin x$.
    - **Sector:** a full circle of radius 1 has area $\pi$ and angle $2\pi$. A sector of angle $x$ is the fraction $\frac{x}{2\pi}$ of it, so its area is $\frac{x}{2\pi}\cdot\pi = \frac{x}{2}$. (This is where radians are used.)
    - **Large triangle:** base $1$, height $\tan x$ (the line at angle $x$ meets the vertical line $X = 1$ at height $\tan x$, since $\tan$ is the slope). Area $= \frac12\tan x$.

    They are nested, so

    $$
    \frac12\sin x \ \leq\ \frac12 x \ \leq\ \frac12\tan x.
    $$

    1. Divide by $\frac12\sin x > 0$: $\ 1 \leq \frac{x}{\sin x} \leq \frac{1}{\cos x}$. (The last term is $\frac{\tan x}{\sin x} = \frac{\sin x / \cos x}{\sin x} = \frac{1}{\cos x}$.)
    2. Take reciprocals. For positive numbers, $u \leq v$ means $\frac1u \geq \frac1v$ (e.g. $2 \leq 4$ but $\frac12 \geq \frac14$), so every inequality flips: $\ \cos x \leq \frac{\sin x}{x} \leq 1$.
    3. As $x \to 0^+$, $\cos x \to 1$, so by squeeze the limit from the right is 1.
    4. Since $\frac{\sin x}{x}$ is even, the same holds from the left.

Numerically: $\frac{\sin 0.1}{0.1} \approx 0.99833$ and $\frac{\sin 0.01}{0.01} \approx 0.99998$. For small $x$, $\sin x \approx x$.

This is the fact that makes $\frac{d}{dx}\sin x = \cos x$.

It's also why radians are the natural unit: in degrees the limit would be $\pi/180$.

## 6. Limits at infinity and of sequences

$\lim_{x\to\infty} f(x) = L$ means $f(x)$ gets close to $L$ once $x$ is large enough:

$$
\forall \varepsilon > 0\ \exists N:\ x > N \Rightarrow |f(x) - L| < \varepsilon.
$$

The same definition with integers gives **limits of sequences**. $a_n \to L$ means

$$
\forall\varepsilon>0\ \exists N:\ n > N \Rightarrow |a_n - L| < \varepsilon.
$$

The skeptic's game is the same, but your answer is now a threshold $N$ ("far enough out") instead of a window $\delta$ ("close enough in").

Example: $1/n \to 0$. Given $\varepsilon$, take $N = 1/\varepsilon$; then $n > N$ gives $1/n < 1/N = \varepsilon$.

With numbers: if the skeptic says $\varepsilon = 0.01$, you answer $N = 100$. Every term after the 100th, like $\frac{1}{101}$ or $\frac{1}{5000}$, is less than $0.01$ away from $0$.

Useful facts:

- For $k > 0$, $1/x^k \to 0$.
- For rational functions, divide top and bottom by the highest power: $\frac{3x^2 + 1}{5x^2 - x} = \frac{3 + 1/x^2}{5 - 1/x} \to \frac35$.

Why divide by the highest power? It turns every lower-order term into something like $\frac{1}{x}$ or $\frac{1}{x^2}$, which goes to $0$, leaving only the leading terms. The three possible outcomes:

| Degrees | Example | Limit as $x \to \infty$ |
|---|---|---|
| top < bottom | $\dfrac{4x + 1}{x^2 + 3}$ | $0$ |
| top = bottom | $\dfrac{3x^2 + 1}{5x^2 - x}$ | ratio of leading coefficients, $\frac35$ |
| top > bottom | $\dfrac{x^3}{x^2 + 1}$ | $\infty$ |

In each case the answer is set by the **leading terms**. Big-$O$ notation in [Asymptotics](../discrete/asymptotics.md) is built on the same idea.

## 7. Continuity

!!! definition "Definition: continuity"
    $f$ is **continuous at $a$** if $\displaystyle\lim_{x\to a} f(x) = f(a)$.

    It is continuous on a set if it's continuous at every point of the set.

The definition packs three requirements:

1. $f(a)$ exists;
2. the limit exists;
3. they're equal.

Informally: *small changes in input cause small changes in output*.

By the limit laws, sums, products, quotients (where defined) and compositions of continuous functions are continuous. Polynomials, $e^x$, $\ln x$ (on $x>0$), $\sin$, $\cos$ are continuous everywhere they're defined.

For compositions this gives a handy rule: if $g(x) \to b$ and $f$ is continuous at $b$, then

$$
\lim_{x \to a} f(g(x)) = f\Big(\lim_{x \to a} g(x)\Big).
$$

You can "move the limit inside" a continuous function. For example, $\lim_{x \to 0} e^{\sin x / x} = e^{\lim \sin x/x} = e^1 = e$.

!!! example "Example: choosing a constant to make a function continuous"
    For which $c$ is this function continuous at $x = 2$?

    $$
    f(x) = \begin{cases} x^2 & x < 2 \\ c\,x & x \geq 2 \end{cases}
    $$

    Check the three requirements:

    1. $f(2) = 2c$ exists.
    2. Left limit: $\lim_{x\to2^-} x^2 = 4$. Right limit: $\lim_{x \to 2^+} cx = 2c$. These agree only if $2c = 4$, i.e. $c = 2$.
    3. With $c = 2$, the limit $4$ equals $f(2) = 4$. ✓

    So $c = 2$. For any other $c$, the graph has a jump at $x = 2$.

Typical discontinuities:

| Kind | Example |
|---|---|
| jump | $\sgn x$ at 0 |
| hole | $\frac{x^2-1}{x-1}$ at 1 |
| blow-up | $1/x$ at 0 |
| wild oscillation | $\sin(1/x)$ at 0 |

### Two big theorems about continuous functions

!!! theorem "Intermediate value theorem (IVT)"
    If $f$ is continuous on $[a, b]$ and $y$ is between $f(a)$ and $f(b)$, then $f(c) = y$ for some $c \in [a, b]$.

!!! theorem "Extreme value theorem (EVT)"
    A continuous function on a closed bounded interval $[a, b]$ attains a maximum and a minimum.

!!! intuition "What these say"
    - **IVT:** you can't get from below a line to above it without crossing it, if you draw without lifting your pen.
    - **EVT:** on a closed interval, a continuous function can't "escape to infinity" or "approach a max without reaching it."

    Both theorems fail if the interval is open ($1/x$ on $(0,1]$ has no max) or if $f$ jumps.

??? proof "Why they're true (deeper)"
    Both depend on the **completeness of the real numbers**: every non-empty set of reals that is bounded above has a least upper bound (supremum).

    This property is what distinguishes $\R$ from $\Q$. In $\Q$ there are "holes" at $\sqrt2$, and IVT fails: $x^2 - 2$ goes from $-1$ to $2$ on $[0, 2]$ but never hits $0$ at a rational point.

    *IVT sketch* (case $f(a) < y < f(b)$): let $c = \sup\{x \in [a,b] : f(x) < y\}$.

    - If $f(c) < y$: continuity keeps $f < y$ a bit to the right of $c$, contradicting that $c$ is an upper bound.
    - If $f(c) > y$: continuity keeps $f > y$ on a small interval left of $c$, so a smaller number would also be an upper bound, contradicting that $c$ is the *least* one.

    Hence $f(c) = y$.

!!! example "Example: bisection"
    $f(x) = x^3 - x - 1$ has $f(1) = -1 < 0$ and $f(2) = 5 > 0$, so by IVT it has a root in $[1, 2]$.

    Check the midpoint $1.5$: $f(1.5) = 0.875 > 0$, so the root is in $[1, 1.5]$.

    | Step | Interval | Midpoint $m$ | $f(m)$ | Keep |
    |---|---|---|---|---|
    | 1 | $[1, 2]$ | $1.5$ | $+0.875$ | left half $[1, 1.5]$ |
    | 2 | $[1, 1.5]$ | $1.25$ | $-0.297$ | right half $[1.25, 1.5]$ |
    | 3 | $[1.25, 1.5]$ | $1.375$ | $+0.225$ | left half $[1.25, 1.375]$ |

    Always keep the half where $f$ changes sign; IVT guarantees a root there. (The root is $\approx 1.3247$.)

    Each step halves the interval. This **bisection method** is a guaranteed (if slow) root-finder, and its correctness proof is exactly IVT.

## 8. One more famous limit

!!! theorem "Theorem"
    The sequence $a_n = \left(1 + \frac1n\right)^n$ increases and is bounded above by 3, so it converges. Its limit is called $e \approx 2.71828$.

??? proof "Proof sketch (deeper)"
    Expand with the binomial theorem:

    $$
    a_n = \sum_{k=0}^n \binom nk \frac{1}{n^k} = \sum_{k=0}^n \frac{1}{k!}\left(1 - \frac1n\right)\left(1 - \frac2n\right)\cdots\left(1 - \frac{k-1}{n}\right).
    $$

    - **Increasing:** as $n$ grows, each factor $(1 - j/n)$ increases and more (positive) terms appear.
    - **Bounded:** each term is at most $\frac1{k!} \leq \frac{1}{2^{k-1}}$ for $k \geq 1$, so $a_n \leq 1 + 1 + \frac12 + \frac14 + \cdots < 3$.

    An increasing sequence bounded above converges. (That's completeness again: the limit is its supremum.)

!!! ml "Where this shows up"
    - **Every derivative is a limit**, so every gradient in ML is defined by this lesson.
    - **Continuity** is what makes optimization possible at all: small parameter changes cause small loss changes.
        - ReLU is continuous but has a corner.
        - Step functions are not continuous, which is why they can't be trained with gradients.
    - **Convergence of training** ("the loss converges") is a statement about the limit of a sequence.
    - **Lipschitz continuity**, $|f(x) - f(y)| \leq K|x - y|$, is a quantitative version of continuity, used in GAN training (WGAN), robustness certificates, and the gradient descent convergence proof in Phase 7.

## Check yourself

**1.** Compute $\displaystyle\lim_{x \to 3} \frac{x^2 - 9}{x - 3}$ and $\displaystyle\lim_{x\to\infty}\frac{2x^3 - x}{7x^3 + 4}$.

??? success "Solution"
    - $\frac{(x-3)(x+3)}{x - 3} = x + 3 \to 6$.
    - Dividing by $x^3$: $\frac{2 - 1/x^2}{7 + 4/x^3} \to \frac27$.

**2.** Prove with ε–δ that $\lim_{x\to -1}(5 - 2x) = 7$.

??? success "Solution"
    $|5 - 2x - 7| = |{-2x - 2}| = 2|x + 1|$.

    Given $\varepsilon$, take $\delta = \varepsilon/2$. If $0 < |x + 1| < \delta$, then $|f(x) - 7| = 2|x+1| < \varepsilon$.

**3.** Prove with ε–δ that $\lim_{x \to 3} x^2 = 9$.

??? success "Solution"
    $|x^2 - 9| = |x - 3||x + 3|$.

    - If $|x - 3| < 1$, then $2 < x < 4$, so $|x + 3| < 7$.
    - Take $\delta = \min(1, \varepsilon/7)$. Then $|x^2 - 9| < 7 \cdot \varepsilon/7 = \varepsilon$.

**4.** Show that $\lim_{x\to 0} x\sin(1/x) = 0$, even though $\lim_{x\to0}\sin(1/x)$ doesn't exist.

??? success "Solution"
    $-|x| \leq x\sin(1/x) \leq |x|$, because $|\sin| \leq 1$.

    Both bounds tend to 0, so by squeeze the limit is 0.

**5.** Use $\lim \frac{\sin x}{x} = 1$ to compute $\lim_{x\to0}\frac{1 - \cos x}{x^2}$. (Hint: multiply by $1 + \cos x$.)

??? success "Solution"
    $\frac{1 - \cos x}{x^2}\cdot\frac{1 + \cos x}{1 + \cos x} = \frac{\sin^2 x}{x^2}\cdot\frac{1}{1 + \cos x} \to 1 \cdot \frac12 = \frac12$.

**6.** Show the equation $\cos x = x$ has a solution in $[0, \pi/2]$.

??? success "Solution"
    Let $f(x) = \cos x - x$, which is continuous.

    - $f(0) = 1 > 0$
    - $f(\pi/2) = -\pi/2 < 0$

    By IVT there's $c$ with $f(c) = 0$. (Numerically $c \approx 0.739$.)

**7.** Write the formal negation of "$f$ is continuous at $a$" and use it to show the sign function ($-1$ for $x<0$, $0$ at $0$, $1$ for $x > 0$) is not continuous at 0.

??? success "Solution"
    Negation: $\exists \varepsilon > 0\ \forall\delta > 0\ \exists x$ with $|x - a| < \delta$ and $|f(x) - f(a)| \geq \varepsilon$.

    For $\sgn$ at 0, take $\varepsilon = \frac12$. For any $\delta$, the point $x = \delta/2$ has $|\sgn(x) - \sgn(0)| = 1 \geq \frac12$.
