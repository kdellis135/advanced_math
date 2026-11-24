# Complex numbers

<div class="lesson-meta" markdown>
**Phase 1 · Lesson 4** · ⏱ ~2.5 hours · Needs: [Exponentials, logarithms and trig](exp-log-trig.md)
</div>

Complex numbers sound like an exotic invention. In practice they're the most convenient way to describe **rotations and oscillations**. They make trig identities trivial, they're how the Fourier transform is written, they appear as eigenvalues of rotation matrices, and quantum mechanics is built on them. This lesson only needs one new rule.

## 1. The one new rule

!!! definition "Definition: complex numbers"
    Introduce a number $i$ with $i^2 = -1$. A **complex number** is $z = a + bi$ with $a, b \in \R$. $a = \operatorname{Re} z$ is the **real part** and $b = \operatorname{Im} z$ the **imaginary part**. The set of all of them is $\C$.

Arithmetic is ordinary algebra, replacing $i^2$ by $-1$ whenever it appears:

$$
(a + bi) + (c + di) = (a + c) + (b + d)i,
$$

$$
(a + bi)(c + di) = ac + adi + bci + bd\,i^2 = (ac - bd) + (ad + bc)i.
$$

!!! definition "Definition: conjugate and modulus"
    The **conjugate** of $z = a + bi$ is $\bar z = a - bi$. The **modulus** (absolute value) is $|z| = \sqrt{a^2 + b^2}$.

Key facts:

- $z\bar z = (a + bi)(a - bi) = a^2 + b^2 = |z|^2$, a non-negative real number.
- Division: multiply top and bottom by the conjugate of the bottom. $\dfrac{1}{z} = \dfrac{\bar z}{|z|^2}$.
- $\overline{zw} = \bar z\,\bar w$ and $\overline{z + w} = \bar z + \bar w$ (check by expanding).

!!! example "Example"
    $\dfrac{3 + 4i}{1 - 2i} = \dfrac{(3+4i)(1+2i)}{(1-2i)(1+2i)} = \dfrac{3 + 6i + 4i + 8i^2}{1 + 4} = \dfrac{-5 + 10i}{5} = -1 + 2i.$

!!! theorem "Theorem: the modulus is multiplicative"
    $|zw| = |z|\,|w|$.

!!! proof "Proof"
    $|zw|^2 = (zw)\overline{(zw)} = z w \bar z \bar w = (z\bar z)(w\bar w) = |z|^2|w|^2$. Take square roots (both sides are non-negative).

## 2. The complex plane and polar form

Draw $z = a + bi$ as the point $(a, b)$. Then $|z|$ is its distance from $0$, and the angle $\theta$ it makes with the positive real axis is its **argument**, $\arg z$. So

$$
z = r(\cos\theta + i\sin\theta), \qquad r = |z|, \ \theta = \arg z.
$$

Now multiply two numbers in polar form, $z = r(\cos\alpha + i\sin\alpha)$ and $w = s(\cos\beta + i\sin\beta)$:

$$
zw = rs\big[(\cos\alpha\cos\beta - \sin\alpha\sin\beta) + i(\sin\alpha\cos\beta + \cos\alpha\sin\beta)\big] = rs\big[\cos(\alpha+\beta) + i\sin(\alpha + \beta)\big].
$$

The brackets are exactly the [angle-addition formulas](exp-log-trig.md#the-angle-addition-formulas).

!!! theorem "Theorem: multiplication is rotate-and-scale"
    When multiplying complex numbers, **moduli multiply and arguments add**:
    $|zw| = |z||w|$ and $\arg(zw) = \arg z + \arg w$ (up to multiples of $2\pi$).

<div class="viz" data-viz="complexmul"></div>

In particular, multiplying by $i$ (modulus 1, argument $\pi/2$) **rotates by 90°**. That is what $i^2 = -1$ means geometrically: two quarter-turns make a half-turn, which flips $1$ to $-1$.

## 3. Euler's formula

Look at the rule "arguments add when you multiply." That's how *exponents* behave: $e^{a}e^{b} = e^{a+b}$. This suggests writing $\cos\theta + i\sin\theta$ as an exponential.

!!! theorem "Theorem: Euler's formula"
    $$
    e^{i\theta} = \cos\theta + i\sin\theta.
    $$

What could $e^{i\theta}$ even mean? Use the compound-interest definition from last lesson, $e^x = \lim (1 + x/n)^n$, with $x = i\theta$. Each factor $1 + i\theta/n$ is a tiny step at right angles to the current position: a tiny rotation by about $\theta/n$, with a stretch that vanishes as $n \to \infty$. Composing $n$ of them rotates by $\theta$ in total:

<div class="viz" data-viz="euler"></div>

!!! proof "Proof"
    A short rigorous proof needs power series, so it's in [Series and Taylor expansions](../calculus/series-taylor.md#5-eulers-formula), where we plug $i\theta$ into the series for $e^x$ and watch it split into the series for $\cos$ and $\sin$. For now, treat the figure above as a convincing preview. The formula is exactly what makes "$\arg$ adds when you multiply" consistent with "exponents add when you multiply."

Consequences, all one-liners:

- **Polar form becomes** $z = re^{i\theta}$, and $zw = rs\,e^{i(\alpha + \beta)}$.
- **Euler's identity:** $e^{i\pi} = -1$, i.e. $e^{i\pi} + 1 = 0$.
- **Trig from exponentials:** adding and subtracting $e^{i\theta}$ and $e^{-i\theta}$ gives
  $\cos\theta = \dfrac{e^{i\theta} + e^{-i\theta}}{2}$ and $\sin\theta = \dfrac{e^{i\theta} - e^{-i\theta}}{2i}$.
- **De Moivre:** $(\cos\theta + i\sin\theta)^n = \cos n\theta + i\sin n\theta$, since $(e^{i\theta})^n = e^{in\theta}$.

!!! intuition "Why physicists and engineers love this"
    A rotating point $e^{i\omega t}$ has real part $\cos\omega t$. So any oscillation can be treated as the shadow of a rotation. Rotations are *multiplication* by $e^{i\omega t}$, and differentiating $e^{i\omega t}$ just multiplies by $i\omega$. Calculus with oscillations turns into algebra, which is the key trick behind [differential equations](../further/differential-equations.md) and [Fourier analysis](../further/fourier.md).

## 4. Roots of unity

Which complex numbers satisfy $z^n = 1$? Write $z = re^{i\theta}$. Then $z^n = r^n e^{in\theta} = 1$ forces $r = 1$ and $n\theta$ a multiple of $2\pi$:

$$
z_k = e^{2\pi i k/n}, \qquad k = 0, 1, \dots, n-1.
$$

These are $n$ points evenly spaced around the unit circle: the **$n$-th roots of unity**. For $n = 4$: $1, i, -1, -i$.

!!! theorem "Theorem"
    For $n \geq 2$, the $n$-th roots of unity sum to zero: $\displaystyle\sum_{k=0}^{n-1} e^{2\pi i k/n} = 0$.

!!! proof "Proof"
    Let $\omega = e^{2\pi i/n} \neq 1$. The sum is the geometric series $1 + \omega + \cdots + \omega^{n-1} = \dfrac{1 - \omega^n}{1 - \omega} = \dfrac{1 - 1}{1 - \omega} = 0$.
    (Geometrically: $n$ unit vectors evenly spread around a circle balance perfectly.)

This cancellation is the heart of the **Fast Fourier Transform**, one of the most important algorithms ever discovered.

## 5. Every polynomial has a root

!!! theorem "Fundamental theorem of algebra"
    Every non-constant polynomial with complex coefficients has at least one complex root. Consequently a degree-$n$ polynomial factors completely as $c(z - z_1)(z - z_2)\cdots(z - z_n)$, with roots counted with multiplicity.

The proof needs complex analysis, which is outside the scope of this site, and it's safe to take the result on trust. The consequence you'll use: **every $n \times n$ matrix has exactly $n$ complex eigenvalues** (counted with multiplicity), because eigenvalues are roots of a degree-$n$ polynomial ([Eigenvalues](../linear-algebra/eigen.md)). Also, for a polynomial with *real* coefficients, complex roots come in conjugate pairs $a \pm bi$: conjugating $p(z) = 0$ gives $p(\bar z) = 0$.

!!! ml "Where this shows up"
    - **Fourier transform and FFT:** signals are decomposed into $e^{i\omega t}$ components (Phase 10). Convolutions in CNNs and audio models can be computed via the FFT.
    - **Rotary position embeddings (RoPE)** in LLMs treat pairs of coordinates as complex numbers and multiply by $e^{i m\theta}$ to encode position $m$. The attention score then depends only on *relative* position, because $e^{im\theta}\overline{e^{in\theta}} = e^{i(m-n)\theta}$.
    - **Eigenvalues** of real matrices can be complex, and a complex pair $a \pm bi$ signals rotation, e.g. oscillating dynamics in recurrent networks.
    - **Quantum computing:** amplitudes are complex numbers, and probabilities are $|z|^2$.

## Check yourself

**1.** Compute $(2 - 3i)(1 + 4i)$ and $\dfrac{1}{1 + i}$.

??? success "Solution"
    $(2-3i)(1+4i) = 2 + 8i - 3i - 12i^2 = 14 + 5i$. $\frac{1}{1+i} = \frac{1 - i}{(1+i)(1-i)} = \frac{1-i}{2}$.

**2.** Write $z = -1 + i\sqrt3$ in polar form and compute $z^6$.

??? success "Solution"
    $|z| = \sqrt{1 + 3} = 2$, $\arg z = 2\pi/3$ (second quadrant, $\tan\theta = -\sqrt3$). So $z = 2e^{2\pi i/3}$ and $z^6 = 64e^{4\pi i} = 64$.

**3.** Use Euler's formula to derive the triple-angle formula $\cos3\theta = 4\cos^3\theta - 3\cos\theta$.

??? success "Solution"
    $\cos3\theta = \operatorname{Re}(e^{3i\theta}) = \operatorname{Re}\big((c + is)^3\big)$ with $c = \cos\theta, s = \sin\theta$. Expanding, $(c+is)^3 = c^3 + 3ic^2s - 3cs^2 - is^3$, so the real part is $c^3 - 3cs^2 = c^3 - 3c(1 - c^2) = 4c^3 - 3c$.

**4.** Find all solutions of $z^3 = 8i$.

??? success "Solution"
    $8i = 8e^{i\pi/2}$. Write $z = re^{i\theta}$: $r^3 = 8$ gives $r = 2$, and $3\theta = \pi/2 + 2\pi k$ gives $\theta = \pi/6 + 2\pi k/3$. So $z = 2e^{i\pi/6} = \sqrt3 + i$, $z = 2e^{5i\pi/6} = -\sqrt3 + i$, and $z = 2e^{3i\pi/2} = -2i$.

**5.** Show that $|z + w|^2 = |z|^2 + |w|^2 + 2\operatorname{Re}(z\bar w)$.

??? success "Solution"
    $|z+w|^2 = (z+w)(\bar z + \bar w) = z\bar z + w\bar w + z\bar w + \bar z w$. And $\bar z w = \overline{z \bar w}$, so $z\bar w + \overline{z\bar w} = 2\operatorname{Re}(z\bar w)$.

**6.** In the RoPE example, show that the real part of $(q\,e^{im\theta})\,\overline{(k\,e^{in\theta})}$ depends on $m$ and $n$ only through $m - n$.

??? success "Solution"
    $(q e^{im\theta})\overline{(k e^{in\theta})} = q\bar k\, e^{im\theta}e^{-in\theta} = q\bar k\, e^{i(m-n)\theta}$. Only $m - n$ appears, so its real part (the attention contribution) depends only on the relative position.
