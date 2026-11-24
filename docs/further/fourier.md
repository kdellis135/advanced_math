# Fourier series and transforms

<div class="lesson-meta" markdown>
**Phase 10 · Lesson 2** · ⏱ ~4 hours · Needs: [Integrals](../calculus/integrals.md), [Complex numbers](../foundations/complex-numbers.md), [Orthogonality](../linear-algebra/orthogonality.md)
</div>

Joseph Fourier claimed in 1807 that *any* periodic function, even one with jumps, can be written as a sum of sines and cosines. It sounded absurd, and it turned out to be one of the most useful ideas in science. The key insight is pure linear algebra: **sines and cosines of different frequencies are orthogonal vectors**, so a Fourier series is just expanding a function in an orthonormal basis, and the coefficients are projections.

## 1. Functions as vectors

Functions on $[-\pi, \pi]$ can be added and scaled, just like vectors. Define an **inner product**, the continuous analogue of the dot product $\sum_iu_iv_i$:

$$
\langle f, g\rangle = \int_{-\pi}^{\pi}f(x)\,g(x)\,dx.
$$

With it come lengths, $\norm f = \sqrt{\langle f, f\rangle}$, and orthogonality: $\langle f, g\rangle = 0$.

!!! theorem "Orthogonality of the trigonometric system"
    For integers $m, n\geq0$:

    $$
    \int_{-\pi}^{\pi}\cos mx\cos nx\,dx = \int_{-\pi}^{\pi}\sin mx\sin nx\,dx = 0\ \ (m\neq n), \qquad\int_{-\pi}^{\pi}\sin mx\cos nx\,dx = 0.
    $$

    And $\int_{-\pi}^{\pi}\cos^2nx\,dx = \int_{-\pi}^{\pi}\sin^2nx\,dx = \pi$ for $n\geq1$.

!!! proof "Proof"
    Product-to-sum identities (from the angle-addition formulas): $\cos mx\cos nx = \frac12[\cos(m - n)x + \cos(m + n)x]$. For $m\neq n$ both are cosines of nonzero integer frequencies, which integrate to 0 over a full period. The other cases are the same, and $\sin mx\cos nx$ is an odd function, so its integral over a symmetric interval is 0. For $m = n$, $\cos^2nx = \frac12(1 + \cos2nx)$ integrates to $\pi$.

## 2. Fourier coefficients are projections

Suppose $f(x) = \frac{a_0}{2} + \sum_{n=1}^\infty\big(a_n\cos nx + b_n\sin nx\big)$. To find $a_k$, take the inner product of both sides with $\cos kx$: by orthogonality every term vanishes except one.

!!! theorem "Fourier coefficients"
    $$
    a_n = \frac1\pi\int_{-\pi}^{\pi}f(x)\cos nx\,dx, \qquad b_n = \frac1\pi\int_{-\pi}^\pi f(x)\sin nx\,dx.
    $$

This is the formula "coordinate = dot product with the basis vector" from [orthonormal bases](../linear-algebra/orthogonality.md#4-orthonormal-bases-make-everything-easy), divided by $\pi$ because the basis vectors have squared length $\pi$, not 1. **The $n$-th coefficient measures how much of frequency $n$ is in $f$.**

!!! example "The square wave"
    $f(x) = 1$ on $(0, \pi)$, $-1$ on $(-\pi, 0)$. It's odd, so all $a_n = 0$. And
    $b_n = \frac2\pi\int_0^\pi\sin nx\,dx = \frac{2}{\pi n}(1 - \cos n\pi)$, which is $\frac{4}{\pi n}$ for odd $n$ and 0 for even $n$. So

    $$
    f(x) = \frac4\pi\left(\sin x + \frac{\sin3x}{3} + \frac{\sin5x}{5} + \cdots\right).
    $$

<div class="viz" data-viz="fourier"></div>

**Convergence.** For piecewise smooth $f$, the series converges to $f(x)$ wherever $f$ is continuous, and to the midpoint of the jump at discontinuities. Near a jump, partial sums overshoot by about 9% of the jump size no matter how many terms you take. That's the **Gibbs phenomenon**, visible in the figure. Smooth functions have rapidly decaying coefficients, while jumps make them decay slowly (like $1/n$). **Smoothness in space ↔ decay in frequency.**

!!! theorem "Parseval's identity"
    $$
    \frac1\pi\int_{-\pi}^{\pi}f(x)^2\,dx = \frac{a_0^2}{2} + \sum_{n=1}^\infty(a_n^2 + b_n^2).
    $$

This is Pythagoras in infinite dimensions: the squared length of a vector is the sum of its squared coordinates in an orthonormal basis. Energy is the same whether measured in time or in frequency.

## 3. The complex form

Euler's formula packs $\cos$ and $\sin$ into one exponential. The functions $e^{inx}$ ($n\in\Z$) are orthogonal under the complex inner product $\langle f, g\rangle = \int f\bar g$, and

$$
f(x) = \sum_{n=-\infty}^{\infty}c_ne^{inx}, \qquad c_n = \frac{1}{2\pi}\int_{-\pi}^\pi f(x)e^{-inx}\,dx.
$$

Each term is a point rotating around a circle at frequency $n$. A Fourier series literally builds a shape out of rotating circles.

## 4. The Fourier transform

For non-periodic functions on all of $\R$, let the period go to infinity. The discrete frequencies $n$ become a continuum $\xi$:

$$
\hat f(\xi) = \int_{-\infty}^{\infty}f(x)\,e^{-2\pi i\xi x}\,dx, \qquad f(x) = \int_{-\infty}^\infty\hat f(\xi)\,e^{2\pi i\xi x}\,d\xi.
$$

$\hat f(\xi)$ is the amount (and phase) of frequency $\xi$ in $f$. Key facts:

- **Derivatives become multiplication:** $\widehat{f'}(\xi) = 2\pi i\xi\,\hat f(\xi)$. (Integrate by parts.) Differential equations with constant coefficients become algebraic equations.
- **The Gaussian is its own transform:** $e^{-\pi x^2}\mapsto e^{-\pi\xi^2}$. A narrow Gaussian has a wide transform and vice versa: the **uncertainty principle**. A signal can't be sharply localized in both time and frequency. (In quantum mechanics this is Heisenberg's uncertainty principle, since momentum is the Fourier dual of position.)

## 5. Convolution

!!! definition "Definition: convolution"
    $$
    (f * g)(x) = \int_{-\infty}^\infty f(y)\,g(x - y)\,dy.
    $$

It's a sliding weighted average: blur, smoothing, echo, moving averages, and the sum of independent random variables (whose density is the convolution of their densities).

!!! theorem "Convolution theorem"
    $$
    \widehat{f * g} = \hat f\cdot\hat g.
    $$

!!! proof "Proof"
    $\widehat{f*g}(\xi) = \iint f(y)g(x - y)e^{-2\pi i\xi x}\,dy\,dx$. Substitute $x = y + u$ and split the exponential: $e^{-2\pi i\xi(y + u)} = e^{-2\pi i\xi y}e^{-2\pi i\xi u}$. By Fubini the double integral factors into $\int f(y)e^{-2\pi i\xi y}dy\cdot\int g(u)e^{-2\pi i\xi u}du$.

**Convolution in time is multiplication in frequency.** A filter that removes high frequencies is a convolution with a smoothing kernel. Linear, time-invariant systems (audio effects, circuits, optics) are exactly convolutions, and they act on each frequency independently. Complex exponentials are their eigenfunctions, just as eigenvectors are for a matrix.

## 6. The discrete Fourier transform and the FFT

For a sampled signal $x_0, \ldots, x_{N-1}$:

$$
X_k = \sum_{n=0}^{N-1}x_n\,\omega^{-kn}, \qquad\omega = e^{2\pi i/N}.
$$

This is multiplication by an $N\times N$ matrix whose columns are orthogonal (by the [roots-of-unity theorem](../foundations/complex-numbers.md#4-roots-of-unity)): a change to the frequency basis. Done naively, it's $O(N^2)$.

The **Fast Fourier Transform** splits the sum into even- and odd-indexed samples:

$$
X_k = \underbrace{\sum_m x_{2m}\,\omega^{-2mk}}_{E_k:\ \text{DFT of evens, size }N/2} + \omega^{-k}\underbrace{\sum_mx_{2m+1}\,\omega^{-2mk}}_{O_k:\ \text{DFT of odds, size }N/2},
$$

and $X_{k + N/2} = E_k - \omega^{-k}O_k$ reuses the same half-size results (because $\omega^{-N/2} = -1$). So $T(N) = 2T(N/2) + O(N)$, which the [master theorem](../discrete/recurrences.md#2-the-master-theorem) solves as $O(N\log N)$. For $N = 10^6$, that's about 50,000 times faster than the naive method. It's often called the most important algorithm of the 20th century.

!!! ml "Where this shows up"
    - **CNNs** compute convolutions. For large kernels they can be computed via FFT (the convolution theorem), and the theory of what CNNs learn is often phrased in frequency terms. CNNs tend to learn low frequencies first ("spectral bias").
    - **Transformer positional encodings** use $\sin(\omega_kp)$ and $\cos(\omega_kp)$ at geometrically spaced frequencies, a Fourier feature basis for positions. **RoPE** rotates query/key pairs by $e^{ip\theta_k}$.
    - **Fourier features / NeRF:** mapping inputs through $[\sin(2\pi Bx), \cos(2\pi Bx)]$ lets networks represent high-frequency detail.
    - **Audio and speech models** work on spectrograms (short-time Fourier transforms). **Fourier neural operators** solve PDEs in the frequency domain.
    - **Signal processing everywhere:** JPEG (a cosine transform), MP3, MRI reconstruction, Wi-Fi (OFDM).

## Check yourself

**1.** Verify $\int_{-\pi}^\pi\sin2x\sin3x\,dx = 0$ using the product-to-sum identity.

??? success "Solution"
    $\sin2x\sin3x = \frac12[\cos x - \cos5x]$, and both integrate to 0 over $[-\pi, \pi]$.

**2.** Find the Fourier series of $f(x) = x$ on $(-\pi, \pi)$.

??? success "Solution"
    $f$ is odd, so $a_n = 0$. $b_n = \frac1\pi\int_{-\pi}^\pi x\sin nx\,dx = \frac2\pi\int_0^\pi x\sin nx\,dx = \frac{2(-1)^{n+1}}{n}$ (by parts). So $x = 2\left(\sin x - \frac{\sin2x}{2} + \frac{\sin3x}{3} - \cdots\right)$, the sawtooth in the figure.

**3.** Use Parseval on the result of exercise 2 to prove $\sum_{n=1}^\infty\frac{1}{n^2} = \frac{\pi^2}{6}$.

??? success "Solution"
    Left side: $\frac1\pi\int_{-\pi}^\pi x^2dx = \frac{2\pi^2}{3}$. Right side: $\sum b_n^2 = \sum\frac{4}{n^2}$. So $\sum\frac1{n^2} = \frac{2\pi^2}{3}\cdot\frac14 = \frac{\pi^2}{6}$. (This was Euler's famous "Basel problem.")

**4.** Why do the square wave's coefficients decay like $1/n$ while the triangle wave's decay like $1/n^2$?

??? success "Solution"
    The square wave has jumps; the triangle wave is continuous with only corners (its derivative is a square wave). Each degree of smoothness buys one power of $n$ of decay: integrating divides the coefficients by $in$.

**5.** Two independent random variables have densities $f$ and $g$. How would you compute the density of their sum using the FFT?

??? success "Solution"
    The density of the sum is $f * g$. Sample both on a grid, FFT both, multiply pointwise, then inverse FFT. That's $O(N\log N)$ instead of $O(N^2)$.

**6.** How many operations does a naive DFT of $N = 2^{20}$ samples need, compared with an FFT?

??? success "Solution"
    Naive: $N^2\approx1.1\times10^{12}$. FFT: $N\log_2N\approx2.1\times10^7$. About 50,000 times fewer.
