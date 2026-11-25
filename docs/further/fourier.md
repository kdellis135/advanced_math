---
description: "Fourier series and transforms as linear algebra: functions as vectors, coefficients as projections, the Fourier transform, convolution, the DFT and the FFT."
---

# Fourier series and transforms

<div class="lesson-meta" markdown>
**Phase 10 · Lesson 2** · ⏱ ~4 hours · Needs: [Integrals](../calculus/integrals.md), [Complex numbers](../foundations/complex-numbers.md), [Orthogonality](../linear-algebra/orthogonality.md)
</div>

Joseph Fourier claimed in 1807 that *any* periodic function, even one with jumps, can be written as a sum of sines and cosines. It sounded absurd, and it turned out to be one of the most useful ideas in science.

The key insight is pure linear algebra:

- **sines and cosines of different frequencies are orthogonal vectors**;
- so a Fourier series is just expanding a function in an orthonormal basis;
- and the coefficients are projections.

## 1. Functions as vectors

Functions on $[-\pi, \pi]$ can be added and scaled, just like vectors.

Define an **inner product**, the continuous analogue of the dot product $\sum_iu_iv_i$:

$$
\langle f, g\rangle = \int_{-\pi}^{\pi}f(x)\,g(x)\,dx.
$$

With it come:

- lengths: $\norm f = \sqrt{\langle f, f\rangle}$;
- orthogonality: $\langle f, g\rangle = 0$.

!!! intuition "Why an integral is a dot product"
    Sample $f$ and $g$ at $N$ evenly spaced points $x_1, \ldots, x_N$, with spacing $\Delta x$. Now they're ordinary vectors of length $N$, and

    $$
    \Delta x\sum_{i=1}^N f(x_i)\,g(x_i)\ \approx\ \int f(x)\,g(x)\,dx.
    $$

    The left side is a dot product (scaled by $\Delta x$). The right side is its limit as the samples get denser. A function is a vector with one coordinate for every point $x$.

    | Vectors in $\R^n$ | Functions on $[-\pi, \pi]$ |
    |---|---|
    | coordinate $u_i$ | value $f(x)$ |
    | $\sum_i u_iv_i$ | $\int f(x)g(x)\,dx$ |
    | standard basis $\vv e_1, \ldots, \vv e_n$ | $1, \cos x, \sin x, \cos 2x, \sin 2x, \ldots$ |
    | $\vv u\cdot\vv v = 0$: perpendicular | $\langle f, g\rangle = 0$: "perpendicular functions" |

!!! theorem "Orthogonality of the trigonometric system"
    For integers $m, n\geq0$:

    $$
    \int_{-\pi}^{\pi}\cos mx\cos nx\,dx = \int_{-\pi}^{\pi}\sin mx\sin nx\,dx = 0\ \ (m\neq n), \qquad\int_{-\pi}^{\pi}\sin mx\cos nx\,dx = 0.
    $$

    And $\int_{-\pi}^{\pi}\cos^2nx\,dx = \int_{-\pi}^{\pi}\sin^2nx\,dx = \pi$ for $n\geq1$.

!!! proof "Proof"
    Use the product-to-sum identities (from the angle-addition formulas):

    $$
    \cos mx\cos nx = \tfrac12[\cos(m - n)x + \cos(m + n)x].
    $$

    - **$m\neq n$:** both are cosines of nonzero integer frequencies, which integrate to 0 over a full period. The $\sin\sin$ case is the same.
    - **$\sin mx\cos nx$** is an odd function, so its integral over a symmetric interval is 0.
    - **$m = n$:** $\cos^2nx = \frac12(1 + \cos2nx)$ integrates to $\pi$.

    (A cosine of nonzero integer frequency $k$ integrates to 0 over $[-\pi, \pi]$ because it completes $k$ full waves: the parts above and below the axis cancel exactly. Formally, $\int_{-\pi}^{\pi}\cos kx\,dx = \frac{\sin k\pi - \sin(-k\pi)}{k} = 0$.)

!!! example "Example: orthogonal and not"
    | Pair | Inner product | Orthogonal? |
    |---|---|---|
    | $\sin x$, $\sin 2x$ | $0$ | yes |
    | $\sin x$, $\cos x$ | $0$ (the product $\frac12\sin2x$ is odd) | yes |
    | $\sin x$, $\sin x$ | $\pi$ | no: it's the squared length |
    | $\sin x$, $x$ | $2\pi$ (by parts; see exercise 2) | no: $x$ "contains" some $\sin x$ |

    The last row is the important one. A nonzero inner product with $\sin x$ means the function has a $\sin x$ component, and the next section measures exactly how much.

## 2. Fourier coefficients are projections

Suppose

$$
f(x) = \frac{a_0}{2} + \sum_{n=1}^\infty\big(a_n\cos nx + b_n\sin nx\big).
$$

To find $a_k$, take the inner product of both sides with $\cos kx$. By orthogonality, every term vanishes except one.

In detail, for $k\geq1$:

1. Left side: $\ \langle f, \cos kx\rangle = \int_{-\pi}^{\pi}f(x)\cos kx\,dx$.
2. Right side, term by term: $\langle\frac{a_0}{2}, \cos kx\rangle = 0$, every $\langle a_n\cos nx, \cos kx\rangle$ with $n\neq k$ is $0$, and every $\langle b_n\sin nx, \cos kx\rangle$ is $0$.
3. The one survivor: $\ \langle a_k\cos kx, \cos kx\rangle = a_k\pi$.
4. So $\int f(x)\cos kx\,dx = a_k\pi$. Divide by $\pi$.

!!! theorem "Fourier coefficients"
    $$
    a_n = \frac1\pi\int_{-\pi}^{\pi}f(x)\cos nx\,dx, \qquad b_n = \frac1\pi\int_{-\pi}^\pi f(x)\sin nx\,dx.
    $$

This is the formula "coordinate = dot product with the basis vector" from [orthonormal bases](../linear-algebra/orthogonality.md#4-orthonormal-bases-make-everything-easy). It's divided by $\pi$ because the basis vectors have squared length $\pi$, not 1.

**The $n$-th coefficient measures how much of frequency $n$ is in $f$.**

!!! example "The square wave"
    $f(x) = 1$ on $(0, \pi)$, and $-1$ on $(-\pi, 0)$.

    - It's odd, so all $a_n = 0$.
    - $b_n = \frac2\pi\int_0^\pi\sin nx\,dx = \frac{2}{\pi n}(1 - \cos n\pi)$, which is $\frac{4}{\pi n}$ for odd $n$ and 0 for even $n$.

    So

    $$
    f(x) = \frac4\pi\left(\sin x + \frac{\sin3x}{3} + \frac{\sin5x}{5} + \cdots\right).
    $$

    **Where $b_n$ came from:**

    1. $f(x)\sin nx$ is even (odd times odd), so $\int_{-\pi}^{\pi} = 2\int_0^{\pi}$, and on $(0, \pi)$, $f = 1$. That's the $\frac2\pi$.
    2. $\int_0^\pi\sin nx\,dx = \left[-\frac{\cos nx}{n}\right]_0^\pi = \frac{1 - \cos n\pi}{n}$.
    3. $\cos n\pi = (-1)^n$, so $1 - \cos n\pi$ is $2$ for odd $n$ and $0$ for even $n$.

    | $n$ | 1 | 2 | 3 | 4 | 5 | 7 |
    |---|---|---|---|---|---|---|
    | $b_n = \frac{4}{\pi n}$ (odd $n$) | $1.273$ | $0$ | $0.424$ | $0$ | $0.255$ | $0.182$ |

    **Watching it converge at $x = \frac\pi2$**, where $f = 1$. There $\sin nx$ is $1, -1, 1, -1, \ldots$ for $n = 1, 3, 5, 7, \ldots$:

    | Terms up to | $\sin x$ | $\sin 3x$ | $\sin 5x$ | $\sin 7x$ | $\sin 9x$ |
    |---|---|---|---|---|---|
    | partial sum | $1.273$ | $0.849$ | $1.103$ | $0.922$ | $1.063$ |

    The sums swing above and below 1, closing in.

<div class="viz" data-viz="fourier"></div>

**Convergence.** For piecewise smooth $f$, the series converges:

- to $f(x)$ wherever $f$ is continuous;
- to the midpoint of the jump at discontinuities.

Near a jump, partial sums overshoot by about 9% of the jump size, no matter how many terms you take. That's the **Gibbs phenomenon**, visible in the figure.

| Function | Coefficients decay |
|---|---|
| smooth | rapidly |
| with jumps | slowly, like $1/n$ |

**Smoothness in space ↔ decay in frequency.**

!!! theorem "Parseval's identity"
    $$
    \frac1\pi\int_{-\pi}^{\pi}f(x)^2\,dx = \frac{a_0^2}{2} + \sum_{n=1}^\infty(a_n^2 + b_n^2).
    $$

This is Pythagoras in infinite dimensions: the squared length of a vector is the sum of its squared coordinates in an orthonormal basis.

Energy is the same whether measured in time or in frequency.

!!! example "Example: Parseval on the square wave"
    - **Left side:** $f^2 = 1$ everywhere, so $\frac1\pi\int_{-\pi}^{\pi}1\,dx = 2$.
    - **Right side:** $\sum_{n\text{ odd}}\left(\frac{4}{\pi n}\right)^2 = \frac{16}{\pi^2}\left(1 + \frac19 + \frac1{25} + \cdots\right)$.

    Setting them equal proves a surprising sum:

    $$
    1 + \frac19 + \frac1{25} + \frac1{49} + \cdots = \frac{\pi^2}{8}.
    $$

    It also tells you where the energy is. The first term alone carries $\frac{16/\pi^2}{2}\approx81\%$ of the total. A square wave is "mostly" a sine wave, plus sharpening harmonics.

## 3. The complex form

Euler's formula packs $\cos$ and $\sin$ into one exponential.

The functions $e^{inx}$ ($n\in\Z$) are orthogonal under the complex inner product $\langle f, g\rangle = \int f\bar g$, and

$$
f(x) = \sum_{n=-\infty}^{\infty}c_ne^{inx}, \qquad c_n = \frac{1}{2\pi}\int_{-\pi}^\pi f(x)e^{-inx}\,dx.
$$

!!! example "Example: $\sin x$ in complex form"
    From Euler's formula, $e^{ix} = \cos x + i\sin x$ and $e^{-ix} = \cos x - i\sin x$. Subtract and divide by $2i$:

    $$
    \sin x = \frac{e^{ix} - e^{-ix}}{2i} = -\frac i2\,e^{ix} + \frac i2\,e^{-ix}.
    $$

    So $c_1 = -\frac i2$, $c_{-1} = \frac i2$, and every other $c_n = 0$.

    One real frequency becomes **two** complex ones, $+1$ and $-1$, rotating in opposite directions. Their imaginary parts cancel and leave a real wave. In general, for a real $f$:

    $$
    c_n = \frac{a_n - ib_n}{2}, \qquad c_{-n} = \overline{c_n}\qquad(n\geq1).
    $$

Each term is a point rotating around a circle at frequency $n$.

A Fourier series literally builds a shape out of rotating circles.

## 4. The Fourier transform

For non-periodic functions on all of $\R$, let the period go to infinity.

The discrete frequencies $n$ become a continuum $\xi$:

$$
\hat f(\xi) = \int_{-\infty}^{\infty}f(x)\,e^{-2\pi i\xi x}\,dx, \qquad f(x) = \int_{-\infty}^\infty\hat f(\xi)\,e^{2\pi i\xi x}\,d\xi.
$$

$\hat f(\xi)$ is the amount (and phase) of frequency $\xi$ in $f$. Key facts:

- **Derivatives become multiplication:** $\widehat{f'}(\xi) = 2\pi i\xi\,\hat f(\xi)$ (integrate by parts).
    - Differential equations with constant coefficients become algebraic equations.
- **The Gaussian is its own transform:** $e^{-\pi x^2}\mapsto e^{-\pi\xi^2}$.
    - A narrow Gaussian has a wide transform, and vice versa: the **uncertainty principle**.
    - A signal can't be sharply localized in both time and frequency.
    - In quantum mechanics this is Heisenberg's uncertainty principle, since momentum is the Fourier dual of position.

!!! example "Example: a box becomes a sinc"
    Let $f(x) = 1$ on $[-\frac12, \frac12]$ and $0$ elsewhere: a single rectangular pulse.

    1. $\ \hat f(\xi) = \int_{-1/2}^{1/2}e^{-2\pi i\xi x}\,dx = \left[\frac{e^{-2\pi i\xi x}}{-2\pi i\xi}\right]_{-1/2}^{1/2} = \frac{e^{-\pi i\xi} - e^{\pi i\xi}}{-2\pi i\xi}$.
    2. Euler's formula gives $e^{\pi i\xi} - e^{-\pi i\xi} = 2i\sin\pi\xi$.
    3. So $\ \hat f(\xi) = \dfrac{\sin\pi\xi}{\pi\xi}$, the **sinc** function.

    Its main bump lies between the zeros at $\xi = \pm1$. Stretch the box to width $a$, and the bump shrinks to $\pm\frac1a$:

    | Box width | Main bump of $\hat f$ | Frequency content |
    |---|---|---|
    | $0.1$ (a short click) | $[-10, 10]$ | many frequencies |
    | $1$ | $[-1, 1]$ | moderate |
    | $10$ (a long tone) | $[-0.1, 0.1]$ | nearly one frequency |

    That's the uncertainty principle in numbers: width in time × width in frequency stays constant. A short click contains every pitch, and a pure pitch has to last a long time.

## 5. Convolution

!!! definition "Definition: convolution"
    $$
    (f * g)(x) = \int_{-\infty}^\infty f(y)\,g(x - y)\,dy.
    $$

It's a sliding weighted average. Examples:

- blur, smoothing, echo;
- moving averages;
- the sum of independent random variables, whose density is the convolution of their densities.

For sequences, the integral becomes a sum: $(f * g)_n = \sum_k f_k\,g_{n-k}$.

!!! example "Example: three convolutions you already know"
    **A moving average.** Convolve the signal $(0, 0, 6, 0, 0)$ with the kernel $(\frac13, \frac13, \frac13)$. Each output averages three neighbors:

    $$
    (0, 0, 6, 0, 0) * \left(\tfrac13, \tfrac13, \tfrac13\right) = (0, 2, 2, 2, 0).
    $$

    The spike gets smeared out: that's blurring.

    **Polynomial multiplication.** $(1 + 2x)(3 + x) = 3 + 7x + 2x^2$. The coefficient lists convolve: $(1, 2) * (3, 1) = (3, 7, 2)$. Each output coefficient collects every pair of terms whose powers add up to it.

    **Two dice.** Each die has 6 equally likely faces. The number of ways to roll each total from 2 to 12 is

    $$
    (1, 1, 1, 1, 1, 1) * (1, 1, 1, 1, 1, 1) = (1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1).
    $$

    Divide by 36 for the probabilities. The triangle shape comes from sliding one box past the other.

!!! theorem "Convolution theorem"
    $$
    \widehat{f * g} = \hat f\cdot\hat g.
    $$

!!! proof "Proof"
    1. $\widehat{f*g}(\xi) = \iint f(y)g(x - y)e^{-2\pi i\xi x}\,dy\,dx$.
    2. Substitute $x = y + u$ and split the exponential: $e^{-2\pi i\xi(y + u)} = e^{-2\pi i\xi y}e^{-2\pi i\xi u}$.
    3. By Fubini the double integral factors into $\int f(y)e^{-2\pi i\xi y}dy\cdot\int g(u)e^{-2\pi i\xi u}du$.

**Convolution in time is multiplication in frequency.**

- A filter that removes high frequencies is a convolution with a smoothing kernel.
- Linear, time-invariant systems (audio effects, circuits, optics) are exactly convolutions, and they act on each frequency independently.
- Complex exponentials are their eigenfunctions, just as eigenvectors are for a matrix.

## 6. The discrete Fourier transform and the FFT

For a sampled signal $x_0, \ldots, x_{N-1}$:

$$
X_k = \sum_{n=0}^{N-1}x_n\,\omega^{-kn}, \qquad\omega = e^{2\pi i/N}.
$$

This is multiplication by an $N\times N$ matrix whose columns are orthogonal (by the [roots-of-unity theorem](../foundations/complex-numbers.md#4-roots-of-unity)): a change to the frequency basis.

Done naively, it's $O(N^2)$.

!!! example "Example: a DFT with $N = 4$"
    For $N = 4$, $\omega = e^{2\pi i/4} = i$, so $\omega^{-kn} = i^{-kn}$, which only takes the values $1, -i, -1, i$.

    | Signal $x$ | What it is | DFT $X = (X_0, X_1, X_2, X_3)$ |
    |---|---|---|
    | $(1, 1, 1, 1)$ | constant | $(4, 0, 0, 0)$: all at frequency 0 |
    | $(1, 0, -1, 0)$ | a cosine, one cycle | $(0, 2, 0, 2)$ |
    | $(0, 1, 0, -1)$ | a sine, one cycle | $(0, -2i, 0, 2i)$ |

    For the cosine, step by step: $X_1 = 1\cdot i^0 + (-1)\cdot i^{-2} = 1 + (-1)(-1) = 2$, and $X_2 = 1\cdot i^0 + (-1)\cdot i^{-4} = 1 - 1 = 0$.

    Frequency 3 is the same as frequency $-1$ for $N = 4$. So the cosine shows up at $\pm1$, just like the complex form of §3. The sine's $\pm i$ values are the same pattern as $\sin x = -\frac i2e^{ix} + \frac i2e^{-ix}$, scaled by $N$.

The **Fast Fourier Transform** splits the sum into even- and odd-indexed samples:

$$
X_k = \underbrace{\sum_m x_{2m}\,\omega^{-2mk}}_{E_k:\ \text{DFT of evens, size }N/2} + \omega^{-k}\underbrace{\sum_mx_{2m+1}\,\omega^{-2mk}}_{O_k:\ \text{DFT of odds, size }N/2},
$$

and $X_{k + N/2} = E_k - \omega^{-k}O_k$ reuses the same half-size results (because $\omega^{-N/2} = -1$).

- So $T(N) = 2T(N/2) + O(N)$, which the [master theorem](../discrete/recurrences.md#2-the-master-theorem) solves as $O(N\log N)$.
- For $N = 10^6$, that's about 50,000 times faster than the naive method.

| $N$ | Naive $N^2$ | FFT $N\log_2N$ | Speedup |
|---|---|---|---|
| $2^{10} = 1024$ | $\approx10^6$ | $\approx10^4$ | $\approx100\times$ |
| $2^{20}\approx10^6$ | $\approx10^{12}$ | $\approx2\times10^7$ | $\approx50{,}000\times$ |

The speedup is $\frac{N}{\log_2 N}$, and it grows with $N$. The bigger the signal, the more the FFT matters.

**Fast convolution** puts the last two sections together. To convolve two length-$N$ signals:

1. FFT both: $O(N\log N)$.
2. Multiply pointwise: $O(N)$.
3. Inverse FFT: $O(N\log N)$.

That beats the direct $O(N^2)$ sum. Since multiplying polynomials (and very large integers) is a convolution, this is also how computers multiply numbers with millions of digits.

It's often called the most important algorithm of the 20th century.

!!! ml "Where this shows up"
    - **CNNs** compute convolutions.
        - For large kernels they can be computed via FFT (the convolution theorem).
        - The theory of what CNNs learn is often phrased in frequency terms: they tend to learn low frequencies first ("spectral bias").
    - **Transformer positional encodings** use $\sin(\omega_kp)$ and $\cos(\omega_kp)$ at geometrically spaced frequencies, a Fourier feature basis for positions.
        - **RoPE** rotates query/key pairs by $e^{ip\theta_k}$.
    - **Fourier features / NeRF:** mapping inputs through $[\sin(2\pi Bx), \cos(2\pi Bx)]$ lets networks represent high-frequency detail.
    - **Audio and speech models** work on spectrograms (short-time Fourier transforms).
    - **Fourier neural operators** solve PDEs in the frequency domain.
    - **Signal processing everywhere:** JPEG (a cosine transform), MP3, MRI reconstruction, Wi-Fi (OFDM).

## Check yourself

**1.** Verify $\int_{-\pi}^\pi\sin2x\sin3x\,dx = 0$ using the product-to-sum identity.

??? success "Solution"
    $\sin2x\sin3x = \frac12[\cos x - \cos5x]$.

    Both terms integrate to 0 over $[-\pi, \pi]$.

**2.** Find the Fourier series of $f(x) = x$ on $(-\pi, \pi)$.

??? success "Solution"
    - $f$ is odd, so $a_n = 0$.
    - By parts: $b_n = \frac1\pi\int_{-\pi}^\pi x\sin nx\,dx = \frac2\pi\int_0^\pi x\sin nx\,dx = \frac{2(-1)^{n+1}}{n}$.

    So

    $$
    x = 2\left(\sin x - \frac{\sin2x}{2} + \frac{\sin3x}{3} - \cdots\right),
    $$

    the sawtooth in the figure.

**3.** Use Parseval on the result of exercise 2 to prove $\sum_{n=1}^\infty\frac{1}{n^2} = \frac{\pi^2}{6}$.

??? success "Solution"
    - **Left side:** $\frac1\pi\int_{-\pi}^\pi x^2dx = \frac{2\pi^2}{3}$.
    - **Right side:** $\sum b_n^2 = \sum\frac{4}{n^2}$.
    - So $\sum\frac1{n^2} = \frac{2\pi^2}{3}\cdot\frac14 = \frac{\pi^2}{6}$.

    This was Euler's famous "Basel problem."

**4.** Why do the square wave's coefficients decay like $1/n$ while the triangle wave's decay like $1/n^2$?

??? success "Solution"
    - The square wave has jumps.
    - The triangle wave is continuous, with only corners (its derivative is a square wave).

    Each degree of smoothness buys one power of $n$ of decay: integrating divides the coefficients by $in$.

**5.** Two independent random variables have densities $f$ and $g$. How would you compute the density of their sum using the FFT?

??? success "Solution"
    The density of the sum is $f * g$.

    1. Sample both densities on a grid.
    2. FFT both.
    3. Multiply pointwise.
    4. Inverse FFT.

    That's $O(N\log N)$ instead of $O(N^2)$.

**6.** How many operations does a naive DFT of $N = 2^{20}$ samples need, compared with an FFT?

??? success "Solution"
    | Method | Operations |
    |---|---|
    | naive | $N^2\approx1.1\times10^{12}$ |
    | FFT | $N\log_2N\approx2.1\times10^7$ |

    About 50,000 times fewer.
