# Exponentials, logarithms and trig

<div class="lesson-meta" markdown>
**Phase 1 · Lesson 3** · ⏱ ~3 hours · Needs: [Sets, functions and notation](sets-functions.md)
</div>

Three families of functions do most of the work in applied math. **Exponentials** describe growth, decay and probabilities. **Logarithms** measure information and turn multiplication into addition. **Trigonometric functions** describe rotation and oscillation. This lesson rebuilds each one from its definition, so the rules stop being things to memorize.

## 1. Exponents from scratch

For a positive integer $n$, $a^n = a \cdot a \cdots a$ ($n$ times). Two rules follow directly by counting factors:

$$
a^m a^n = a^{m+n}, \qquad (a^m)^n = a^{mn}.
$$

Everything else is *forced* if we want these rules to keep working:

- $a^0 = 1$, because $a^0 a^n = a^{0+n} = a^n$.
- $a^{-n} = 1/a^n$, because $a^{-n} a^n = a^0 = 1$.
- $a^{1/n} = \sqrt[n]{a}$, because $(a^{1/n})^n = a^1 = a$.
- $a^{p/q} = (\sqrt[q]{a})^p$.
- $a^x$ for irrational $x$ (like $2^{\sqrt2}$) is the limit of $a^{r}$ for rationals $r \to x$. This is made precise with limits in Phase 2.

## 2. The number $e$

Put \$1 in a bank at 100% annual interest. Compounded once a year you get \$2. Compounded twice (50% each half-year): $(1 + \frac12)^2 = 2.25$. Monthly: $(1 + \frac1{12})^{12} \approx 2.613$. Compounded $n$ times:

$$
\left(1 + \frac1n\right)^n \xrightarrow{\ n \to \infty\ } e = 2.718281828\ldots
$$

So $e$ is what you get from *continuous* compounding. More generally, $\left(1 + \frac{x}{n}\right)^n \to e^x$.

The property that makes $e$ special, proved in [Derivatives](../calculus/derivatives.md):

!!! theorem "The defining property of $e^x$"
    $e^x$ is the unique function equal to its own derivative with value $1$ at $0$: $\frac{d}{dx}e^x = e^x$, $e^0 = 1$.

So $e^x$ grows at a rate equal to its current size. That's why it appears whenever "rate of change ∝ amount": populations, radioactive decay, interest, cooling, and the softmax and Gaussian functions of ML.

## 3. Logarithms

!!! definition "Definition: logarithm"
    For $b > 0$, $b \neq 1$, the logarithm base $b$ is the inverse of $x \mapsto b^x$:

    $$
    \log_b y = x \iff b^x = y \qquad (y > 0).
    $$

    $\ln = \log_e$ is the **natural log**. $\log_2$ is used in information theory and computer science.

$\log_b y$ answers: "*what power of $b$ gives $y$?*" $\log_2 8 = 3$, $\log_{10} 0.01 = -2$, $\ln 1 = 0$.

!!! theorem "Theorem: the log rules"
    For $x, y > 0$:

    1. $\log_b(xy) = \log_b x + \log_b y$
    2. $\log_b(x/y) = \log_b x - \log_b y$
    3. $\log_b(x^r) = r\log_b x$
    4. Change of base: $\log_b x = \dfrac{\ln x}{\ln b}$

!!! proof "Proof"
    Let $u = \log_b x$ and $v = \log_b y$, so $b^u = x$ and $b^v = y$.

    1. $xy = b^u b^v = b^{u+v}$, so $\log_b(xy) = u + v$.
    2. $x/y = b^u/b^v = b^{u-v}$.
    3. $x^r = (b^u)^r = b^{ur}$, so $\log_b(x^r) = ru$.
    4. Take $\ln$ of $b^u = x$ using rule 3: $u\ln b = \ln x$.

    Every log rule is an exponent rule read backwards.

!!! intuition "What a logarithm really measures"
    $\log_2 n$ is roughly "how many times can you halve $n$ before reaching 1?", or equivalently "how many binary digits does $n$ need?", or "how many yes/no questions identify one of $n$ options?" That last reading is the start of [information theory](../information-theory/entropy.md): an event of probability $p$ carries $\log_2(1/p)$ bits of surprise.

### Logs grow slowly; exponentials grow fast

For any $k > 0$ and $b > 1$, eventually

$$
\log n \ll n^k \ll b^n.
$$

$\log_2(10^9) \approx 30$, so binary search on a billion items takes 30 steps. $2^{30} \approx 10^9$, so a brute-force search over 30 binary choices takes a billion steps. We prove this hierarchy in [Asymptotics](../discrete/asymptotics.md).

!!! ml "Where logs show up in ML"
    - **Log-likelihood:** $\log \prod_i p(x_i) = \sum_i \log p(x_i)$. Products of many probabilities underflow to $0$ in floating point; sums of logs don't.
    - **Cross-entropy loss:** $-\log p_\text{model}(\text{correct class})$.
    - **Log-sum-exp trick:** $\log\sum_i e^{z_i} = m + \log\sum_i e^{z_i - m}$ with $m = \max_i z_i$. This avoids overflow and is how softmax is computed in practice. (Proof: factor out $e^m$ and use rule 1.)
    - **Log scales** for learning rates ($10^{-4}$ vs $10^{-3}$) because what matters is the *ratio*.

## 4. Trigonometry, rebuilt from the circle

### Radians

An angle measured in **radians** is the arc length it cuts out on a circle of radius 1. A full turn is $2\pi$ radians ($= 360°$), a right angle is $\pi/2$. Radians are the natural unit: with them, $\frac{d}{dx}\sin x = \cos x$ exactly (in degrees there would be an ugly factor $\pi/180$).

### Sine and cosine are coordinates

!!! definition "Definition: sine and cosine"
    Walk a distance $\theta$ counterclockwise around the unit circle, starting from $(1, 0)$. The point you reach is $(\cos\theta, \sin\theta)$. Also, $\tan\theta = \sin\theta/\cos\theta$.

<div class="viz" data-viz="unitcircle"></div>

Immediate consequences of the definition:

- $\sin^2\theta + \cos^2\theta = 1$ (the point is on the unit circle: Pythagoras).
- Periodicity: $\sin(\theta + 2\pi) = \sin\theta$, $\cos(\theta + 2\pi) = \cos\theta$.
- Symmetry: $\cos(-\theta) = \cos\theta$ (even), $\sin(-\theta) = -\sin\theta$ (odd). Reflecting across the $x$-axis flips $y$.
- $\sin(\theta + \pi/2) = \cos\theta$: the sine wave is the cosine wave shifted.

### The angle-addition formulas

These are the only trig identities worth memorizing, because every other identity follows from them.

!!! theorem "Theorem: angle addition"
    $$
    \cos(\alpha - \beta) = \cos\alpha\cos\beta + \sin\alpha\sin\beta
    $$

    and consequently

    $$
    \cos(\alpha + \beta) = \cos\alpha\cos\beta - \sin\alpha\sin\beta, \qquad \sin(\alpha + \beta) = \sin\alpha\cos\beta + \cos\alpha\sin\beta.
    $$

!!! proof "Proof"
    Take the points $A = (\cos\alpha, \sin\alpha)$ and $B = (\cos\beta, \sin\beta)$ on the unit circle. The angle between them is $\alpha - \beta$. Compute the squared distance $|AB|^2$ two ways.

    *With coordinates:*
    $|AB|^2 = (\cos\alpha - \cos\beta)^2 + (\sin\alpha - \sin\beta)^2 = 2 - 2(\cos\alpha\cos\beta + \sin\alpha\sin\beta)$,
    using $\cos^2 + \sin^2 = 1$ twice.

    *By rotating:* distance doesn't change if we rotate both points by $-\beta$. Then $B$ moves to $(1, 0)$ and $A$ to $(\cos(\alpha - \beta), \sin(\alpha - \beta))$, so
    $|AB|^2 = (\cos(\alpha-\beta) - 1)^2 + \sin^2(\alpha - \beta) = 2 - 2\cos(\alpha - \beta)$.

    Setting the two equal gives the first formula. For $\cos(\alpha+\beta)$, replace $\beta$ by $-\beta$ and use the symmetries. For $\sin(\alpha + \beta)$, use $\sin x = \cos(\pi/2 - x)$:
    $\sin(\alpha+\beta) = \cos\big((\pi/2 - \alpha) - \beta\big) = \cos(\pi/2 - \alpha)\cos\beta + \sin(\pi/2-\alpha)\sin\beta = \sin\alpha\cos\beta + \cos\alpha\sin\beta$.

Special cases ($\alpha = \beta$): the **double-angle formulas** $\sin 2\theta = 2\sin\theta\cos\theta$ and $\cos2\theta = \cos^2\theta - \sin^2\theta = 1 - 2\sin^2\theta$.

In [Complex numbers](complex-numbers.md) you'll see an even shorter proof: these formulas are just $e^{i(\alpha+\beta)} = e^{i\alpha}e^{i\beta}$.

### Waves

$A\sin(\omega t + \varphi)$ is a wave with **amplitude** $A$, **angular frequency** $\omega$ (period $2\pi/\omega$) and **phase** $\varphi$. Sound, light, alternating current, springs and quantum wavefunctions are all built from these, and [Fourier analysis](../further/fourier.md) says *every* reasonable periodic signal is a sum of them.

!!! ml "Where trig shows up"
    - **Cosine similarity** between embeddings: $\cos\theta = \frac{a \cdot b}{\|a\|\|b\|}$ ([Vectors](../linear-algebra/vectors.md)).
    - **Positional encodings** in the original Transformer use $\sin$ and $\cos$ at many frequencies; **RoPE** encodes positions as rotations.
    - **Rotation matrices** $\begin{pmatrix}\cos\theta & -\sin\theta\\ \sin\theta & \cos\theta\end{pmatrix}$ are built directly from the angle-addition formulas.

## Check yourself

**1.** Simplify $\log_2 48 - \log_2 3$ and $\ln(e^5\sqrt e)$.

??? success "Solution"
    $\log_2(48/3) = \log_2 16 = 4$. $\ln(e^{5}e^{1/2}) = \ln e^{5.5} = 5.5$.

**2.** Solve $3 \cdot 2^{x} = 5^{x-1}$ for $x$.

??? success "Solution"
    Take $\ln$: $\ln 3 + x\ln 2 = (x-1)\ln 5$, so $x(\ln5 - \ln 2) = \ln 3 + \ln 5$, and $x = \dfrac{\ln 15}{\ln(5/2)} \approx 2.955$.

**3.** Prove the log-sum-exp identity $\log\sum_i e^{z_i} = m + \log\sum_i e^{z_i - m}$ for any constant $m$. Why choose $m = \max_i z_i$?

??? success "Solution"
    $\sum_i e^{z_i} = \sum_i e^{m}e^{z_i - m} = e^m\sum_i e^{z_i - m}$. Taking logs, $\log(e^m) + \log\sum_i e^{z_i - m} = m + \log\sum_i e^{z_i-m}$. With $m = \max z_i$ every exponent $z_i - m \leq 0$, so nothing overflows, and at least one term equals $e^0 = 1$, so the sum is at least 1 and its log doesn't underflow.

**4.** Use the angle-addition formulas to find $\cos 75°$ exactly.

??? success "Solution"
    $\cos(45° + 30°) = \cos45°\cos30° - \sin45°\sin30° = \frac{\sqrt2}{2}\cdot\frac{\sqrt3}{2} - \frac{\sqrt2}{2}\cdot\frac12 = \frac{\sqrt6 - \sqrt2}{4} \approx 0.2588$.

**5.** Derive $\cos^2\theta = \frac{1 + \cos2\theta}{2}$. (This identity is used constantly in integration.)

??? success "Solution"
    $\cos2\theta = \cos^2\theta - \sin^2\theta = \cos^2\theta - (1 - \cos^2\theta) = 2\cos^2\theta - 1$. Solve for $\cos^2\theta$.

**6.** An investment grows 7% per year. Using logs, how many years until it doubles? Compare with the "rule of 72" estimate $72/7$.

??? success "Solution"
    $1.07^t = 2 \Rightarrow t = \frac{\ln2}{\ln1.07} \approx \frac{0.6931}{0.0677} \approx 10.24$ years. The rule of 72 gives $10.29$. It works because $\ln(1 + r) \approx r$ for small $r$, so $t \approx 0.693/r$; 72 is used instead of 69.3 because it has many divisors and partly corrects for the approximation.
