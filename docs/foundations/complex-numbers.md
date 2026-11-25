---
description: "Complex numbers as rotations: the complex plane, polar form, Euler's formula, roots of unity and the fundamental theorem of algebra, with interactive figures."
---

# Complex numbers

<div class="lesson-meta" markdown>
**Phase 1 · Lesson 4** · ⏱ ~2.5 hours · Needs: [Exponentials, logarithms and trig](exp-log-trig.md)
</div>

Complex numbers sound like an exotic invention. In practice they're the most convenient way to describe **rotations and oscillations**:

- They make trig identities trivial.
- They're how the Fourier transform is written.
- They appear as eigenvalues of rotation matrices.
- Quantum mechanics is built on them.

This lesson only needs one new rule.

## 0. Why invent a new number?

The equation $x^2 = -1$ has no real solution: squares of real numbers are never negative.

The same problem shows up in ordinary quadratics. Solve $x^2 + 2x + 5 = 0$ with the quadratic formula:

$$
x = \frac{-2 \pm \sqrt{4 - 20}}{2} = \frac{-2 \pm \sqrt{-16}}{2}.
$$

We're stuck at $\sqrt{-16}$. But suppose we had a number $i$ with $i^2 = -1$. Then $\sqrt{-16} = \sqrt{16}\cdot\sqrt{-1} = 4i$, and

$$
x = \frac{-2 \pm 4i}{2} = -1 \pm 2i.
$$

Check by plugging in $x = -1 + 2i$, using only ordinary algebra and $i^2 = -1$:

- $x^2 = (-1)^2 + 2(-1)(2i) + (2i)^2 = 1 - 4i + 4i^2 = 1 - 4i - 4 = -3 - 4i$.
- $2x = -2 + 4i$.
- $x^2 + 2x + 5 = (-3 - 4i) + (-2 + 4i) + 5 = 0$. ✓

It works, and nothing breaks. That's the whole idea: **pretend $\sqrt{-1}$ exists, compute with the usual rules, and everything stays consistent.** Historically, people accepted complex numbers exactly because they kept producing correct real answers.

## 1. The one new rule

!!! definition "Definition: complex numbers"
    Introduce a number $i$ with $i^2 = -1$. A **complex number** is $z = a + bi$ with $a, b \in \R$.

    - $a = \operatorname{Re} z$ is the **real part**.
    - $b = \operatorname{Im} z$ is the **imaginary part**.

    The set of all of them is $\C$.

Note that the imaginary part $b$ is a *real* number: for $z = 3 - 5i$, $\ \operatorname{Re} z = 3$ and $\operatorname{Im} z = -5$ (not $-5i$).

Every real number is complex too, with imaginary part $0$: $\ 7 = 7 + 0i$. Numbers like $4i = 0 + 4i$ are called **purely imaginary**.

### Powers of $i$ go in a cycle of four

$$
i^1 = i, \quad i^2 = -1, \quad i^3 = i^2 \cdot i = -i, \quad i^4 = (i^2)^2 = 1, \quad i^5 = i^4 \cdot i = i, \ \dots
$$

So to compute $i^n$, divide $n$ by 4 and look at the remainder. For example $i^{27} = i^{24} \cdot i^3 = 1 \cdot (-i) = -i$. Section 2 will show *why* it cycles: each multiplication by $i$ is a quarter-turn.

### Arithmetic

Arithmetic is ordinary algebra, replacing $i^2$ by $-1$ whenever it appears.

!!! example "Example: add and multiply with numbers first"
    - $(2 + 3i) + (4 - i) = (2 + 4) + (3 - 1)i = 6 + 2i$. Add real parts, add imaginary parts.
    - $(2 + 3i)(4 - i)$: expand like $(a + b)(c + d)$, four products:

    $$
    2 \cdot 4 + 2 \cdot (-i) + 3i \cdot 4 + 3i \cdot (-i) = 8 - 2i + 12i - 3i^2 = 8 + 10i + 3 = 11 + 10i.
    $$

    The only new step is $-3i^2 = -3(-1) = +3$.

In general:

$$
(a + bi) + (c + di) = (a + c) + (b + d)i,
$$

$$
(a + bi)(c + di) = ac + adi + bci + bd\,i^2 = (ac - bd) + (ad + bc)i.
$$

!!! definition "Definition: conjugate and modulus"
    For $z = a + bi$:

    - The **conjugate** is $\bar z = a - bi$.
    - The **modulus** (absolute value) is $|z| = \sqrt{a^2 + b^2}$.

For example, $z = 3 + 4i$ has $\bar z = 3 - 4i$ and $|z| = \sqrt{9 + 16} = 5$.

Key facts:

- $z\bar z = (a + bi)(a - bi) = a^2 + b^2 = |z|^2$, a non-negative real number.
- $z + \bar z = 2a = 2\operatorname{Re} z$ and $z - \bar z = 2bi$. So the conjugate lets you extract the real and imaginary parts.
- Division: multiply top and bottom by the conjugate of the bottom. $\dfrac{1}{z} = \dfrac{\bar z}{|z|^2}$.
- $\overline{zw} = \bar z\,\bar w$ and $\overline{z + w} = \bar z + \bar w$ (check by expanding).

Let's expand the first one, since everything else depends on it:

$$
(a + bi)(a - bi) = a^2 - abi + abi - b^2 i^2 = a^2 - b^2(-1) = a^2 + b^2.
$$

The middle terms cancel, and the $i^2$ turns $-b^2$ into $+b^2$. The result has no $i$ in it.

**Why division works this way.** A fraction like $\frac{1}{3 + 4i}$ has an $i$ in the denominator, which we can't simplify directly. Multiplying top and bottom by $3 - 4i$ (which doesn't change the value, since it's multiplying by $1$) turns the denominator into the *real* number $3^2 + 4^2 = 25$:

$$
\frac{1}{3 + 4i} = \frac{3 - 4i}{(3+4i)(3-4i)} = \frac{3 - 4i}{25} = \frac{3}{25} - \frac{4}{25}i.
$$

!!! example "Example"
    $$
    \frac{3 + 4i}{1 - 2i} = \frac{(3+4i)(1+2i)}{(1-2i)(1+2i)} = \frac{3 + 6i + 4i + 8i^2}{1 + 4} = \frac{-5 + 10i}{5} = -1 + 2i.
    $$

!!! theorem "Theorem: the modulus is multiplicative"
    $|zw| = |z|\,|w|$.

!!! proof "Proof"
    $$
    |zw|^2 = (zw)\overline{(zw)} = z w \bar z \bar w = (z\bar z)(w\bar w) = |z|^2|w|^2.
    $$

    Take square roots (both sides are non-negative).

## 2. The complex plane and polar form

Draw $z = a + bi$ as the point $(a, b)$. Then:

- $|z|$ is its distance from $0$;
- the angle $\theta$ it makes with the positive real axis is its **argument**, $\arg z$.

Some landmarks: $1$ sits at $(1, 0)$, $\ i$ at $(0, 1)$, $\ -1$ at $(-1, 0)$, $\ -i$ at $(0, -1)$. The horizontal axis is the **real axis**, the vertical one the **imaginary axis**.

The conjugate $\bar z = a - bi$ is the point $(a, -b)$: the **mirror image** of $z$ across the real axis.

A point at distance $r$ and angle $\theta$ from the origin has coordinates $(r\cos\theta, r\sin\theta)$, by the unit-circle definition of sine and cosine scaled up by $r$. So

$$
z = r(\cos\theta + i\sin\theta), \qquad r = |z|, \ \theta = \arg z.
$$

This is the **polar form**. The two forms describe the same point in two ways:

| Form | Describes $z$ by | Good for |
|---|---|---|
| $a + bi$ (rectangular) | horizontal and vertical position | adding |
| $r(\cos\theta + i\sin\theta)$ (polar) | distance and direction | multiplying, powers, roots |

### Converting between the forms

- **Polar to rectangular:** $a = r\cos\theta$, $\ b = r\sin\theta$.
- **Rectangular to polar:** $r = \sqrt{a^2 + b^2}$, and $\theta$ is the angle with $\cos\theta = a/r$, $\ \sin\theta = b/r$.

!!! example "Example: $z = 1 + i$ to polar form"
    1. $r = \sqrt{1^2 + 1^2} = \sqrt2$.
    2. $\cos\theta = \frac{1}{\sqrt2}$ and $\sin\theta = \frac{1}{\sqrt2}$, both positive, so $\theta = \frac{\pi}{4}$ (45°).
    3. So $1 + i = \sqrt2\left(\cos\frac{\pi}{4} + i \sin\frac{\pi}{4}\right)$.

!!! warning "The quadrant trap"
    It's tempting to use $\theta = \arctan(b/a)$. But $\arctan$ only returns angles between $-\frac{\pi}{2}$ and $\frac{\pi}{2}$, i.e. points on the *right* half of the plane.

    For $z = -1 - i$: $\ \arctan\frac{-1}{-1} = \arctan 1 = \frac{\pi}{4}$. Wrong! That's the direction of $1 + i$. The point $-1 - i$ is in quadrant III, so $\theta = \frac{\pi}{4} + \pi = \frac{5\pi}{4}$ (or equivalently $-\frac{3\pi}{4}$).

    **Always sketch the point first** to see which quadrant it's in. (Programming languages provide `atan2(b, a)`, which handles the quadrants for you.)

The argument is only defined up to adding multiples of $2\pi$: angles $\frac{\pi}{4}$ and $\frac{\pi}{4} + 2\pi$ point the same way.

### Multiplying in polar form

Now multiply two numbers in polar form, $z = r(\cos\alpha + i\sin\alpha)$ and $w = s(\cos\beta + i\sin\beta)$.

Expand $(\cos\alpha + i\sin\alpha)(\cos\beta + i\sin\beta)$ term by term:

$$
\cos\alpha\cos\beta + i\cos\alpha\sin\beta + i\sin\alpha\cos\beta + i^2\sin\alpha\sin\beta.
$$

Replace $i^2$ by $-1$ and collect the real and imaginary parts:

$$
zw = rs\big[(\cos\alpha\cos\beta - \sin\alpha\sin\beta) + i(\sin\alpha\cos\beta + \cos\alpha\sin\beta)\big] = rs\big[\cos(\alpha+\beta) + i\sin(\alpha + \beta)\big].
$$

The brackets are exactly the [angle-addition formulas](exp-log-trig.md#the-angle-addition-formulas).

!!! theorem "Theorem: multiplication is rotate-and-scale"
    When multiplying complex numbers, **moduli multiply and arguments add**:

    $$
    |zw| = |z||w|, \qquad \arg(zw) = \arg z + \arg w \quad (\text{up to multiples of } 2\pi).
    $$

<div class="viz" data-viz="complexmul"></div>

!!! example "Example: $(1 + i)^2$ both ways"
    **Rectangular:** $(1 + i)^2 = 1 + 2i + i^2 = 2i$.

    **Polar:** $1 + i$ has $r = \sqrt2$ and $\theta = \frac{\pi}{4}$. Squaring multiplies the moduli, $\sqrt2 \cdot \sqrt2 = 2$, and adds the angles, $\frac{\pi}{4} + \frac{\pi}{4} = \frac{\pi}{2}$. Length 2, pointing straight up: that's $2i$. ✓

In particular, multiplying by $i$ (modulus 1, argument $\pi/2$) **rotates by 90°**.

Watch it happen to the point $2 + i$:

| Multiply by $i$ | Result | Point |
|---|---|---|
| start | $2 + i$ | $(2, 1)$ |
| $\times i$ | $2i + i^2 = -1 + 2i$ | $(-1, 2)$ |
| $\times i$ | $-i + 2i^2 = -2 - i$ | $(-2, -1)$ |
| $\times i$ | $-2i - i^2 = 1 - 2i$ | $(1, -2)$ |
| $\times i$ | $i - 2i^2 = 2 + i$ | back to $(2, 1)$ |

Four quarter-turns bring you home, which is why the powers of $i$ cycle with period 4.

That is what $i^2 = -1$ means geometrically: two quarter-turns make a half-turn, which flips $1$ to $-1$.

## 3. Euler's formula

Look at the rule "arguments add when you multiply." That's how *exponents* behave: $e^{a}e^{b} = e^{a+b}$.

This suggests writing $\cos\theta + i\sin\theta$ as an exponential.

!!! theorem "Theorem: Euler's formula"
    $$
    e^{i\theta} = \cos\theta + i\sin\theta.
    $$

What could $e^{i\theta}$ even mean? Use the compound-interest definition from last lesson, $e^x = \lim (1 + x/n)^n$, with $x = i\theta$.

- Each factor $1 + i\theta/n$ is a tiny step at right angles to the current position.
- That's a tiny rotation by about $\theta/n$, with a stretch that vanishes as $n \to \infty$.
- Composing $n$ of them rotates by $\theta$ in total:

<div class="viz" data-viz="euler"></div>

!!! proof "Proof"
    A short rigorous proof needs power series, so it's in [Series and Taylor expansions](../calculus/series-taylor.md#5-eulers-formula). There we plug $i\theta$ into the series for $e^x$ and watch it split into the series for $\cos$ and $\sin$.

    For now, treat the figure above as a convincing preview. The formula is exactly what makes "$\arg$ adds when you multiply" consistent with "exponents add when you multiply."

$e^{i\theta}$ is the point at angle $\theta$ on the **unit circle**. Plugging in a few angles:

| $\theta$ | $\cos\theta + i \sin\theta$ | $e^{i\theta}$ |
|---|---|---|
| $0$ | $1 + 0i$ | $1$ |
| $\frac{\pi}{2}$ | $0 + 1i$ | $i$ |
| $\pi$ | $-1 + 0i$ | $-1$ |
| $\frac{3\pi}{2}$ | $0 - 1i$ | $-i$ |
| $2\pi$ | $1 + 0i$ | $1$ (full circle) |

Its modulus is always $\lvert e^{i\theta}\rvert = \sqrt{\cos^2\theta + \sin^2\theta} = 1$.

Consequences, all one-liners:

- **Polar form becomes** $z = re^{i\theta}$, and $zw = rs\,e^{i(\alpha + \beta)}$.
- **Euler's identity:** $e^{i\pi} = -1$, i.e. $e^{i\pi} + 1 = 0$.
- **Trig from exponentials:** adding and subtracting $e^{i\theta}$ and $e^{-i\theta}$ gives
  $\cos\theta = \dfrac{e^{i\theta} + e^{-i\theta}}{2}$ and $\sin\theta = \dfrac{e^{i\theta} - e^{-i\theta}}{2i}$.
- **De Moivre:** $(\cos\theta + i\sin\theta)^n = \cos n\theta + i\sin n\theta$, since $(e^{i\theta})^n = e^{in\theta}$.

The "trig from exponentials" step, spelled out. Using $\cos(-\theta) = \cos\theta$ and $\sin(-\theta) = -\sin\theta$:

$$
\begin{aligned}
e^{i\theta} &= \cos\theta + i \sin\theta, \\
e^{-i\theta} &= \cos\theta - i\sin\theta.
\end{aligned}
$$

Add the lines: the $\sin$ terms cancel, leaving $e^{i\theta} + e^{-i\theta} = 2\cos\theta$. Subtract them: the $\cos$ terms cancel, leaving $e^{i\theta} - e^{-i\theta} = 2i\sin\theta$. Divide.

!!! example "Example: $(1 + i)^{8}$ without expanding"
    $1 + i = \sqrt2\, e^{i\pi/4}$. So

    $$
    (1 + i)^8 = (\sqrt2)^8\, e^{i \cdot 8\pi/4} = 16\, e^{2\pi i} = 16.
    $$

    Multiplying out eight factors by hand would take a while. In polar form it's one line.

!!! intuition "Why physicists and engineers love this"
    A rotating point $e^{i\omega t}$ has real part $\cos\omega t$. So any oscillation can be treated as the shadow of a rotation.

    - Rotations are *multiplication* by $e^{i\omega t}$.
    - Differentiating $e^{i\omega t}$ just multiplies by $i\omega$.

    Calculus with oscillations turns into algebra. That's the key trick behind [differential equations](../further/differential-equations.md) and [Fourier analysis](../further/fourier.md).

## 4. Roots of unity

Which complex numbers satisfy $z^n = 1$? In the reals, only $1$ (and $-1$ if $n$ is even). In $\C$ there are more.

Write $z = re^{i\theta}$. Then $z^n = r^n e^{in\theta}$, and we need this to equal $1 = 1 \cdot e^{i \cdot 0}$. Compare length and angle separately:

- **Lengths:** $r^n = 1$. Since $r$ is a positive real number, $r = 1$.
- **Angles:** $n\theta$ must point in the same direction as $0$, so $n\theta = 2\pi k$ for some integer $k$. That gives $\theta = \frac{2\pi k}{n}$.

So

$$
z_k = e^{2\pi i k/n}, \qquad k = 0, 1, \dots, n-1.
$$

Why stop at $k = n - 1$? Because $k = n$ gives $e^{2\pi i} = 1$ again, the same as $k = 0$. From there the values repeat. So there are exactly $n$ different roots.

These are $n$ points evenly spaced around the unit circle: the **$n$-th roots of unity**.

For $n = 4$ they are $1, i, -1, -i$. Check: $i^4 = 1$ and $(-i)^4 = 1$.

!!! example "Example: the cube roots of unity"
    $n = 3$, so the angles are $0$, $\frac{2\pi}{3}$ (120°) and $\frac{4\pi}{3}$ (240°):

    | $k$ | angle | $z_k$ |
    |---|---|---|
    | 0 | $0$ | $1$ |
    | 1 | $120°$ | $\cos 120° + i\sin 120° = -\frac12 + \frac{\sqrt3}{2}i$ |
    | 2 | $240°$ | $\cos 240° + i\sin 240° = -\frac12 - \frac{\sqrt3}{2}i$ |

    They form an equilateral triangle on the unit circle.

    Add them: the real parts give $1 - \frac12 - \frac12 = 0$, and the imaginary parts cancel. So the sum is $0$, a preview of the next theorem.

!!! theorem "Theorem"
    For $n \geq 2$, the $n$-th roots of unity sum to zero: $\displaystyle\sum_{k=0}^{n-1} e^{2\pi i k/n} = 0$.

!!! proof "Proof"
    Let $\omega = e^{2\pi i/n}$. Then $z_k = e^{2\pi i k/n} = \omega^k$, so the roots are $1, \omega, \omega^2, \dots, \omega^{n-1}$.

    Two facts about $\omega$: $\ \omega^n = e^{2\pi i} = 1$, and $\omega \neq 1$ (its angle $2\pi/n$ is strictly between $0$ and $2\pi$ when $n \geq 2$).

    The sum is a geometric series, and the [geometric sum formula](logic-and-proofs.md#34-proof-by-induction) works for complex $r \neq 1$ too (its proof used only algebra):

    $$
    1 + \omega + \cdots + \omega^{n-1} = \frac{1 - \omega^n}{1 - \omega} = \frac{1 - 1}{1 - \omega} = 0.
    $$

    Geometrically: $n$ unit vectors evenly spread around a circle balance perfectly.

This cancellation is the heart of the **Fast Fourier Transform**, one of the most important algorithms ever discovered.

## 5. Every polynomial has a root

!!! theorem "Fundamental theorem of algebra"
    Every non-constant polynomial with complex coefficients has at least one complex root.

    Consequently, a degree-$n$ polynomial factors completely as $c(z - z_1)(z - z_2)\cdots(z - z_n)$, with roots counted with multiplicity.

The proof needs complex analysis, which is outside the scope of this site. It's safe to take the result on trust.

**Multiplicity** means a root can count more than once: $z^2 - 2z + 1 = (z - 1)^2$ has the root $1$ with multiplicity 2.

!!! example "Example: factoring polynomials that have no real roots"
    - $z^2 + 1 = (z - i)(z + i)$. Check: $(z - i)(z + i) = z^2 - i^2 = z^2 + 1$. ✓
    - $z^2 + 2z + 5 = (z - (-1 + 2i))(z - (-1 - 2i))$, using the roots from Section 0.
    - $z^3 - 1 = (z - 1)\left(z - \omega\right)\left(z - \omega^2\right)$, where $1, \omega, \omega^2$ are the cube roots of unity.

    Over the reals, these polynomials can't be fully factored into linear pieces. Over $\C$, every polynomial can.

The consequences you'll use:

- **Every $n \times n$ matrix has exactly $n$ complex eigenvalues** (counted with multiplicity), because eigenvalues are roots of a degree-$n$ polynomial ([Eigenvalues](../linear-algebra/eigen.md)).
- For a polynomial with *real* coefficients, complex roots come in **conjugate pairs** $a \pm bi$: conjugating $p(z) = 0$ gives $p(\bar z) = 0$.

Why the conjugate pairs? Take $p(z) = c_n z^n + \cdots + c_1 z + c_0$ with real $c_j$, and suppose $p(z) = 0$. Conjugate both sides. Conjugation passes through sums and products, and leaves real numbers alone ($\bar c_j = c_j$), so

$$
0 = \overline{p(z)} = c_n \bar z^{\,n} + \cdots + c_1 \bar z + c_0 = p(\bar z).
$$

So $\bar z$ is a root too. You saw this in Section 0: the roots of $x^2 + 2x + 5$ were $-1 + 2i$ and $-1 - 2i$.

!!! ml "Where this shows up"
    - **Fourier transform and FFT:** signals are decomposed into $e^{i\omega t}$ components (Phase 10). Convolutions in CNNs and audio models can be computed via the FFT.
    - **Rotary position embeddings (RoPE)** in LLMs treat pairs of coordinates as complex numbers, and multiply by $e^{i m\theta}$ to encode position $m$.
        - The attention score then depends only on *relative* position, because $e^{im\theta}\overline{e^{in\theta}} = e^{i(m-n)\theta}$.
    - **Eigenvalues** of real matrices can be complex, and a complex pair $a \pm bi$ signals rotation, e.g. oscillating dynamics in recurrent networks.
    - **Quantum computing:** amplitudes are complex numbers, and probabilities are $|z|^2$.

## Check yourself

**1.** Compute $(2 - 3i)(1 + 4i)$ and $\dfrac{1}{1 + i}$.

??? success "Solution"
    - $(2-3i)(1+4i) = 2 + 8i - 3i - 12i^2 = 14 + 5i$
    - $\frac{1}{1+i} = \frac{1 - i}{(1+i)(1-i)} = \frac{1-i}{2}$

**2.** Write $z = -1 + i\sqrt3$ in polar form and compute $z^6$.

??? success "Solution"
    - $|z| = \sqrt{1 + 3} = 2$.
    - $\arg z = 2\pi/3$ (second quadrant, $\tan\theta = -\sqrt3$).
    - So $z = 2e^{2\pi i/3}$, and $z^6 = 64e^{4\pi i} = 64$.

**3.** Use Euler's formula to derive the triple-angle formula $\cos3\theta = 4\cos^3\theta - 3\cos\theta$.

??? success "Solution"
    Write $c = \cos\theta$, $s = \sin\theta$. Then $\cos3\theta = \operatorname{Re}(e^{3i\theta}) = \operatorname{Re}\big((c + is)^3\big)$.

    Expanding: $(c+is)^3 = c^3 + 3ic^2s - 3cs^2 - is^3$.

    So the real part is $c^3 - 3cs^2 = c^3 - 3c(1 - c^2) = 4c^3 - 3c$.

**4.** Find all solutions of $z^3 = 8i$.

??? success "Solution"
    $8i = 8e^{i\pi/2}$. Write $z = re^{i\theta}$:

    - $r^3 = 8$ gives $r = 2$.
    - $3\theta = \pi/2 + 2\pi k$ gives $\theta = \pi/6 + 2\pi k/3$.

    | $k$ | $z$ |
    |---|---|
    | 0 | $2e^{i\pi/6} = \sqrt3 + i$ |
    | 1 | $2e^{5i\pi/6} = -\sqrt3 + i$ |
    | 2 | $2e^{3i\pi/2} = -2i$ |

**5.** Show that $|z + w|^2 = |z|^2 + |w|^2 + 2\operatorname{Re}(z\bar w)$.

??? success "Solution"
    $|z+w|^2 = (z+w)(\bar z + \bar w) = z\bar z + w\bar w + z\bar w + \bar z w$.

    And $\bar z w = \overline{z \bar w}$, so $z\bar w + \overline{z\bar w} = 2\operatorname{Re}(z\bar w)$.

**6.** In the RoPE example, show that the real part of $(q\,e^{im\theta})\,\overline{(k\,e^{in\theta})}$ depends on $m$ and $n$ only through $m - n$.

??? success "Solution"
    $$
    (q e^{im\theta})\overline{(k e^{in\theta})} = q\bar k\, e^{im\theta}e^{-in\theta} = q\bar k\, e^{i(m-n)\theta}.
    $$

    Only $m - n$ appears, so its real part (the attention contribution) depends only on the relative position.
