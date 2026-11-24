# Exponentials, logarithms and trig

<div class="lesson-meta" markdown>
**Phase 1 · Lesson 3** · ⏱ ~3 hours · Needs: [Sets, functions and notation](sets-functions.md)
</div>

Three families of functions do most of the work in applied math:

| Family | What it describes |
|---|---|
| **Exponentials** | growth, decay and probabilities |
| **Logarithms** | information; they turn multiplication into addition |
| **Trigonometric functions** | rotation and oscillation |

This lesson rebuilds each one from its definition, so the rules stop being things to memorize.

## 1. Exponents from scratch

For a positive integer $n$, $a^n = a \cdot a \cdots a$ ($n$ times). Here $a$ is the **base** and $n$ the **exponent** (or power).

Two rules follow directly by counting factors:

$$
a^m a^n = a^{m+n}, \qquad (a^m)^n = a^{mn}.
$$

See why with small numbers:

- $a^2 \cdot a^3 = (a \cdot a)(a \cdot a \cdot a) = a^5$: two factors plus three factors is five factors.
- $(a^2)^3 = a^2 \cdot a^2 \cdot a^2 = a^6$: three groups of two factors is six factors.

Two more come from the same counting:

$$
(ab)^n = a^n b^n, \qquad \frac{a^m}{a^n} = a^{m-n}.
$$

For example, $\frac{a^5}{a^2} = \frac{a \cdot a \cdot a \cdot a \cdot a}{a \cdot a} = a^3$: two factors cancel.

Everything else is *forced* if we want these rules to keep working:

- $a^0 = 1$, because $a^0 a^n = a^{0+n} = a^n$.
- $a^{-n} = 1/a^n$, because $a^{-n} a^n = a^0 = 1$.
- $a^{1/n} = \sqrt[n]{a}$, because $(a^{1/n})^n = a^1 = a$.
- $a^{p/q} = (\sqrt[q]{a})^p$.
- $a^x$ for irrational $x$ (like $2^{\sqrt2}$) is the limit of $a^{r}$ for rationals $r \to x$. This is made precise with limits in Phase 2.

!!! example "Example: each rule with numbers"
    | Expression | Rule used | Value |
    |---|---|---|
    | $2^3 \cdot 2^4$ | add exponents | $2^7 = 128$ |
    | $(3^2)^3$ | multiply exponents | $3^6 = 729$ |
    | $5^0$ | zero power | $1$ |
    | $2^{-3}$ | negative power | $\frac{1}{2^3} = \frac18$ |
    | $9^{1/2}$ | root | $\sqrt 9 = 3$ |
    | $8^{2/3}$ | root, then power | $(\sqrt[3]{8})^2 = 2^2 = 4$ |
    | $\left(\frac{1}{4}\right)^{-1/2}$ | flip, then root | $4^{1/2} = 2$ |

!!! warning "Why the base must be positive"
    For fractional exponents we need $a > 0$. Otherwise $(-1)^{1/2} = \sqrt{-1}$ isn't a real number.

    And exponent rules don't distribute over addition: $(a + b)^2 \neq a^2 + b^2$. For example $(1 + 2)^2 = 9$, but $1^2 + 2^2 = 5$.

### Exponential functions

Now turn the exponent into the variable: $f(x) = b^x$ for a fixed base $b > 0$.

| $x$ | $-2$ | $-1$ | $0$ | $1$ | $2$ | $3$ |
|---|---|---|---|---|---|---|
| $2^x$ | $\frac14$ | $\frac12$ | $1$ | $2$ | $4$ | $8$ |
| $\left(\frac12\right)^x$ | $4$ | $2$ | $1$ | $\frac12$ | $\frac14$ | $\frac18$ |

Read off the shape:

- Every exponential passes through $(0, 1)$, since $b^0 = 1$.
- It is always **positive**: $b^x > 0$ for every $x$. It never touches zero.
- If $b > 1$ it **grows**: each step right *multiplies* by $b$ (doubling, for $b = 2$).
- If $0 < b < 1$ it **decays**: each step right multiplies by a number less than 1.

That multiplication is the essence of exponential change: **equal steps in $x$ multiply $f$ by equal factors.** Compare a linear function, where equal steps *add* equal amounts.

!!! example "Example: half-life"
    A drug's concentration halves every 6 hours. Starting from 100 mg:

    $$
    C(t) = 100 \cdot \left(\tfrac12\right)^{t/6}.
    $$

    After 6 hours: 50 mg. After 12: 25 mg. After 18: 12.5 mg. The amount never reaches zero, it just keeps halving.

## 2. The number $e$

Put \$1 in a bank at 100% annual interest.

| Compounded | You end with |
|---|---|
| once a year | $(1 + 1)^1 = 2$ |
| twice (50% each half-year) | $(1 + \frac12)^2 = 2.25$ |
| monthly | $(1 + \frac1{12})^{12} \approx 2.613$ |
| daily | $(1 + \frac1{365})^{365} \approx 2.7146$ |
| every second | $(1 + \frac1{31{,}536{,}000})^{31{,}536{,}000} \approx 2.71828$ |
| $n$ times | $(1 + \frac1n)^n$ |

Why $(1 + \frac1n)^n$? Each of the $n$ periods pays interest at rate $\frac{100\%}{n}$, which multiplies your money by $1 + \frac1n$. Doing that $n$ times multiplies it by $(1 + \frac1n)^n$.

More compounding always helps, but with rapidly diminishing returns. The amount doesn't blow up; it levels off at a definite number.

As $n$ grows:

$$
\left(1 + \frac1n\right)^n \xrightarrow{\ n \to \infty\ } e = 2.718281828\ldots
$$

So $e$ is what you get from *continuous* compounding. More generally, $\left(1 + \frac{x}{n}\right)^n \to e^x$.

(Why $e^x$? At interest rate $x$ instead of 100%, write $n = xm$. Then $\left(1 + \frac{x}{n}\right)^n = \left(1 + \frac1m\right)^{xm} = \left[\left(1 + \frac1m\right)^m\right]^x \to e^x$, using the power rule.)

The function $e^x$ is just the exponential with base $b = e \approx 2.718$. It sits between $2^x$ and $3^x$. People also write it $\exp(x)$, which is easier to read when the exponent is long: $\exp\!\left(-\frac{x^2}{2}\right)$ rather than $e^{-x^2/2}$.

The property that makes $e$ special, proved in [Derivatives](../calculus/derivatives.md):

!!! theorem "The defining property of $e^x$"
    $e^x$ is the unique function equal to its own derivative with value $1$ at $0$: $\frac{d}{dx}e^x = e^x$, $e^0 = 1$.

So $e^x$ grows at a rate equal to its current size.

That's why it appears whenever "rate of change ∝ amount": populations, radioactive decay, interest, cooling, and the softmax and Gaussian functions of ML.

## 3. Logarithms

!!! definition "Definition: logarithm"
    For $b > 0$, $b \neq 1$, the logarithm base $b$ is the inverse of $x \mapsto b^x$:

    $$
    \log_b y = x \iff b^x = y \qquad (y > 0).
    $$

    $\ln = \log_e$ is the **natural log**. $\log_2$ is used in information theory and computer science.

$\log_b y$ answers: "*what power of $b$ gives $y$?*"

| Log | Question | Answer |
|---|---|---|
| $\log_2 8$ | $2^{?} = 8$ | $3$ |
| $\log_{10} 1000$ | $10^{?} = 1000$ | $3$ |
| $\log_{10} 0.01$ | $10^{?} = \frac{1}{100}$ | $-2$ |
| $\log_2 \frac12$ | $2^{?} = \frac12$ | $-1$ |
| $\log_9 3$ | $9^{?} = 3$ | $\frac12$ |
| $\ln 1$ | $e^{?} = 1$ | $0$ |
| $\ln e$ | $e^{?} = e$ | $1$ |

Because log and exponential are inverses, they undo each other:

$$
b^{\log_b y} = y \quad (y > 0), \qquad \log_b(b^x) = x \quad (\text{any } x).
$$

Properties that follow from the exponential's shape:

- **Only positive inputs.** $b^x$ is always positive, so $\log_b y$ only exists for $y > 0$. There is no $\log 0$ or $\log(-1)$ (in the reals).
- **Sign.** For base $b > 1$: $\ \log_b y < 0$ when $0 < y < 1$, $\ \log_b 1 = 0$, and $\log_b y > 0$ when $y > 1$.
- **Graph.** The graph of $\ln x$ is the graph of $e^x$ reflected across the line $y = x$ (as with every inverse). It passes through $(1, 0)$, rises forever but ever more slowly, and plunges to $-\infty$ as $x \to 0^+$.

A few values worth knowing by heart: $\ \ln 2 \approx 0.693$, $\ \ln 10 \approx 2.303$, $\ \log_2 10 \approx 3.32$, $\ \log_2 1000 \approx 10$.

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

Check each rule with numbers (base 2):

| Rule | Check |
|---|---|
| product | $\log_2(4 \cdot 8) = \log_2 32 = 5$, and $\log_2 4 + \log_2 8 = 2 + 3 = 5$ ✓ |
| quotient | $\log_2(32/4) = \log_2 8 = 3$, and $5 - 2 = 3$ ✓ |
| power | $\log_2(8^2) = \log_2 64 = 6$, and $2 \cdot 3 = 6$ ✓ |
| change of base | $\log_2 8 = \frac{\ln 8}{\ln 2} \approx \frac{2.079}{0.693} = 3$ ✓ |

!!! warning "The log mistakes everyone makes"
    | Wrong | Why it's wrong | Counterexample |
    |---|---|---|
    | $\log(x + y) = \log x + \log y$ | the product rule is about $xy$, not $x + y$ | $\log_{10}(10 + 10) \approx 1.30$, but $1 + 1 = 2$ |
    | $\log(x) \cdot \log(y) = \log(xy)$ | logs of products add, they don't multiply | $\log_{10} 10 \cdot \log_{10} 10 = 1$, but $\log_{10} 100 = 2$ |
    | $\dfrac{\log x}{\log y} = \log(x - y)$ | that's not any rule; $\frac{\log x}{\log y}$ is change of base, $\log_y x$ | |
    | $(\log x)^2 = \log(x^2)$ | the power rule gives $\log(x^2) = 2\log x$ | $x = 10$: $\ 1 \neq 2$ |

### Solving exponential equations

Logs exist to bring a variable down from the exponent. The method:

1. Isolate the exponential.
2. Take a log of both sides.
3. Use the power rule to bring the exponent down, then solve.

!!! example "Example: solve $5 \cdot 2^{x} = 40$"
    1. Divide by 5: $\ 2^x = 8$.
    2. Take $\log_2$: $\ x = \log_2 8 = 3$.

    When the numbers aren't so friendly, use $\ln$ and the power rule instead.

!!! example "Example: when will 1000 dollars at 5% yearly interest triple?"
    1. Set up: $\ 1000 \cdot 1.05^t = 3000$.
    2. Isolate: $\ 1.05^t = 3$.
    3. Take $\ln$: $\ \ln(1.05^t) = \ln 3$, and the power rule gives $t \ln 1.05 = \ln 3$.
    4. Solve: $\ t = \dfrac{\ln 3}{\ln 1.05} \approx \dfrac{1.0986}{0.0488} \approx 22.5$ years.

!!! intuition "What a logarithm really measures"
    $\log_2 n$ answers several equivalent questions:

    - How many times can you halve $n$ before reaching 1?
    - How many binary digits does $n$ need?
    - How many yes/no questions identify one of $n$ options?

    That last reading is the start of [information theory](../information-theory/entropy.md): an event of probability $p$ carries $\log_2(1/p)$ bits of surprise.

### Logs grow slowly; exponentials grow fast

For any $k > 0$ and $b > 1$, eventually

$$
\log n \ll n^k \ll b^n.
$$

- $\log_2(10^9) \approx 30$, so binary search on a billion items takes 30 steps.
- $2^{30} \approx 10^9$, so a brute-force search over 30 binary choices takes a billion steps.

We prove this hierarchy in [Asymptotics](../discrete/asymptotics.md).

!!! ml "Where logs show up in ML"
    - **Log-likelihood:** $\log \prod_i p(x_i) = \sum_i \log p(x_i)$. Products of many probabilities underflow to $0$ in floating point; sums of logs don't.
    - **Cross-entropy loss:** $-\log p_\text{model}(\text{correct class})$.
    - **Log-sum-exp trick:** $\log\sum_i e^{z_i} = m + \log\sum_i e^{z_i - m}$ with $m = \max_i z_i$.
        - This avoids overflow, and is how softmax is computed in practice.
        - Proof: factor out $e^m$ and use rule 1.
    - **Log scales** for learning rates ($10^{-4}$ vs $10^{-3}$) because what matters is the *ratio*.

## 4. Trigonometry, rebuilt from the circle

### Radians

An angle measured in **radians** is the arc length it cuts out on a circle of radius 1.

| Angle | Radians | Degrees |
|---|---|---|
| full turn | $2\pi$ | $360°$ |
| half turn | $\pi$ | $180°$ |
| right angle | $\pi/2$ | $90°$ |

Since a full turn is both $360°$ and $2\pi$ radians, convert by multiplying by the right ratio:

$$
\text{radians} = \text{degrees} \times \frac{\pi}{180}, \qquad \text{degrees} = \text{radians} \times \frac{180}{\pi}.
$$

For example, $60° = 60 \cdot \frac{\pi}{180} = \frac{\pi}{3}$, and $1$ radian $= \frac{180}{\pi} \approx 57.3°$.

Why "arc length"? On a circle of radius $r$, the arc cut out by an angle $\theta$ (in radians) has length $r\theta$. On the unit circle ($r = 1$), the arc length *is* the angle. The full circumference $2\pi \cdot 1 = 2\pi$ matches the full turn.

Radians are the natural unit. With them, $\frac{d}{dx}\sin x = \cos x$ exactly; in degrees there would be an ugly factor $\pi/180$.

### Sine and cosine are coordinates

!!! definition "Definition: sine and cosine"
    Walk a distance $\theta$ counterclockwise around the unit circle, starting from $(1, 0)$. The point you reach is $(\cos\theta, \sin\theta)$.

    Also, $\tan\theta = \sin\theta/\cos\theta$.

<div class="viz" data-viz="unitcircle"></div>

Immediate consequences of the definition:

- $\sin^2\theta + \cos^2\theta = 1$ (the point is on the unit circle: Pythagoras).
- Periodicity: $\sin(\theta + 2\pi) = \sin\theta$, $\cos(\theta + 2\pi) = \cos\theta$.
- Symmetry: $\cos(-\theta) = \cos\theta$ (even), $\sin(-\theta) = -\sin\theta$ (odd). Reflecting across the $x$-axis flips $y$.
- $\sin(\theta + \pi/2) = \cos\theta$: the sine wave is the cosine wave shifted.

### Connection to right triangles (SOH CAH TOA)

If you learned trig with triangles, here's the link. Draw the point $(\cos\theta, \sin\theta)$ and drop a vertical line to the $x$-axis. You get a right triangle with:

- hypotenuse $1$ (the radius),
- horizontal side $\cos\theta$ (adjacent to the angle),
- vertical side $\sin\theta$ (opposite the angle).

Scaling the triangle up to hypotenuse $h$ multiplies every side by $h$, which gives the familiar ratios:

$$
\sin\theta = \frac{\text{opposite}}{\text{hypotenuse}}, \qquad \cos\theta = \frac{\text{adjacent}}{\text{hypotenuse}}, \qquad \tan\theta = \frac{\text{opposite}}{\text{adjacent}}.
$$

The circle definition is better because it works for *every* angle, including obtuse and negative ones, where there's no triangle.

$\tan\theta$ has a meaning of its own: it is the **slope** of the line from the origin at angle $\theta$ (rise $\sin\theta$ over run $\cos\theta$).

### The special angles

Two triangles give exact values that come up constantly.

- **Half a square** (45°–45°–90°). Legs $1$ and $1$, hypotenuse $\sqrt 2$ by Pythagoras. So $\sin 45° = \cos 45° = \frac{1}{\sqrt2} = \frac{\sqrt2}{2}$.
- **Half an equilateral triangle** (30°–60°–90°). Cut an equilateral triangle of side $2$ in half. The pieces have hypotenuse $2$, short side $1$, and tall side $\sqrt{4 - 1} = \sqrt3$. So $\sin 30° = \frac12$ and $\cos 30° = \frac{\sqrt3}{2}$, and the reverse for $60°$.

| $\theta$ | $0$ | $\frac{\pi}{6}$ (30°) | $\frac{\pi}{4}$ (45°) | $\frac{\pi}{3}$ (60°) | $\frac{\pi}{2}$ (90°) |
|---|:-:|:-:|:-:|:-:|:-:|
| $\sin\theta$ | $0$ | $\frac12$ | $\frac{\sqrt2}{2}$ | $\frac{\sqrt3}{2}$ | $1$ |
| $\cos\theta$ | $1$ | $\frac{\sqrt3}{2}$ | $\frac{\sqrt2}{2}$ | $\frac12$ | $0$ |
| $\tan\theta$ | $0$ | $\frac{1}{\sqrt3}$ | $1$ | $\sqrt3$ | undefined |

(Memory trick: the sine row is $\frac{\sqrt0}{2}, \frac{\sqrt1}{2}, \frac{\sqrt2}{2}, \frac{\sqrt3}{2}, \frac{\sqrt4}{2}$. The cosine row is the same, backwards.)

### Signs in the four quadrants

Since $\cos\theta$ is the $x$-coordinate and $\sin\theta$ the $y$-coordinate, their signs depend on which quarter of the plane you're in:

| Quadrant | Angles | $\cos$ | $\sin$ | $\tan$ |
|---|---|:-:|:-:|:-:|
| I | $0$ to $\frac{\pi}{2}$ | $+$ | $+$ | $+$ |
| II | $\frac{\pi}{2}$ to $\pi$ | $-$ | $+$ | $-$ |
| III | $\pi$ to $\frac{3\pi}{2}$ | $-$ | $-$ | $+$ |
| IV | $\frac{3\pi}{2}$ to $2\pi$ | $+$ | $-$ | $-$ |

Example: $\cos\frac{2\pi}{3}$. The angle $\frac{2\pi}{3} = 120°$ is in quadrant II, $60°$ short of $180°$. By the mirror symmetry of the circle it has the same size as $\cos 60°$ but negative $x$: $\ \cos\frac{2\pi}{3} = -\frac12$.

### Inverse trig functions

To go from a value back to an angle, use the inverse functions. Since $\sin$ repeats, it isn't injective, so we restrict it to a range where it is (as in the [last lesson](sets-functions.md)):

| Function | Answers | Output range |
|---|---|---|
| $\arcsin y$ | which angle has sine $y$? | $[-\frac{\pi}{2}, \frac{\pi}{2}]$ |
| $\arccos y$ | which angle has cosine $y$? | $[0, \pi]$ |
| $\arctan y$ | which angle has slope $y$? | $(-\frac{\pi}{2}, \frac{\pi}{2})$ |

Examples: $\arcsin\frac12 = \frac{\pi}{6}$, $\ \arccos 0 = \frac{\pi}{2}$, $\ \arctan 1 = \frac{\pi}{4}$. (Calculators label these $\sin^{-1}$ and so on. Again, that means inverse, not $1/\sin$.)

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
    Take the points $A = (\cos\alpha, \sin\alpha)$ and $B = (\cos\beta, \sin\beta)$ on the unit circle. The angle between them is $\alpha - \beta$.

    Compute the squared distance $|AB|^2$ two ways.

    **1. With coordinates** (using $\cos^2 + \sin^2 = 1$ twice):

    $$
    |AB|^2 = (\cos\alpha - \cos\beta)^2 + (\sin\alpha - \sin\beta)^2.
    $$

    Expand both squares:

    $$
    = \cos^2\alpha - 2\cos\alpha\cos\beta + \cos^2\beta + \sin^2\alpha - 2\sin\alpha\sin\beta + \sin^2\beta.
    $$

    Group $\cos^2\alpha + \sin^2\alpha = 1$ and $\cos^2\beta + \sin^2\beta = 1$:

    $$
    |AB|^2 = 2 - 2(\cos\alpha\cos\beta + \sin\alpha\sin\beta).
    $$

    **2. By rotating.** Distance doesn't change if we spin the whole circle. Rotate both points clockwise by $\beta$, which subtracts $\beta$ from each angle.

    - $B$, at angle $\beta$, moves to angle $0$: the point $(1, 0)$.
    - $A$, at angle $\alpha$, moves to angle $\alpha - \beta$: the point $(\cos(\alpha - \beta), \sin(\alpha - \beta))$.

    So, expanding and using $\cos^2 + \sin^2 = 1$ again,

    $$
    |AB|^2 = (\cos(\alpha-\beta) - 1)^2 + \sin^2(\alpha - \beta) = \cos^2(\alpha - \beta) - 2\cos(\alpha-\beta) + 1 + \sin^2(\alpha-\beta) = 2 - 2\cos(\alpha - \beta).
    $$

    Setting the two equal gives the first formula. The other two follow:

    - For $\cos(\alpha+\beta)$, replace $\beta$ by $-\beta$ and use the symmetries $\cos(-\beta) = \cos\beta$, $\sin(-\beta) = -\sin\beta$:

    $$
    \cos(\alpha + \beta) = \cos(\alpha - (-\beta)) = \cos\alpha\cos(-\beta) + \sin\alpha\sin(-\beta) = \cos\alpha\cos\beta - \sin\alpha\sin\beta.
    $$
    - For $\sin(\alpha + \beta)$, use $\sin x = \cos(\pi/2 - x)$:

    $$
    \sin(\alpha+\beta) = \cos\big((\pi/2 - \alpha) - \beta\big) = \cos(\pi/2 - \alpha)\cos\beta + \sin(\pi/2-\alpha)\sin\beta = \sin\alpha\cos\beta + \cos\alpha\sin\beta.
    $$

Special case $\alpha = \beta$ gives the **double-angle formulas**:

$$
\sin 2\theta = 2\sin\theta\cos\theta, \qquad \cos2\theta = \cos^2\theta - \sin^2\theta = 1 - 2\sin^2\theta.
$$

In [Complex numbers](complex-numbers.md) you'll see an even shorter proof: these formulas are just $e^{i(\alpha+\beta)} = e^{i\alpha}e^{i\beta}$.

### Waves

$A\sin(\omega t + \varphi)$ is a wave with:

| Symbol | Name | Meaning |
|---|---|---|
| $A$ | amplitude | height of the peaks |
| $\omega$ | angular frequency | period is $2\pi/\omega$ |
| $\varphi$ | phase | horizontal shift |

Why is the period $2\pi/\omega$? The sine repeats when its input grows by $2\pi$. The input $\omega t$ grows by $2\pi$ when $t$ grows by $2\pi/\omega$. The **frequency** (cycles per unit time) is the reciprocal, $\omega / 2\pi$.

!!! example "Example: reading a wave"
    $y = 3\sin(4t + 1)$:

    - Peaks at $y = 3$ and troughs at $y = -3$ (amplitude 3).
    - One full cycle takes $2\pi/4 = \pi/2 \approx 1.57$ time units.
    - It completes $4/(2\pi) \approx 0.64$ cycles per time unit.
    - Writing $4t + 1 = 4(t + \frac14)$ shows it's the plain wave $3\sin 4t$ shifted left by $\frac14$.

Sound, light, alternating current, springs and quantum wavefunctions are all built from these.

[Fourier analysis](../further/fourier.md) says *every* reasonable periodic signal is a sum of them.

!!! ml "Where trig shows up"
    - **Cosine similarity** between embeddings: $\cos\theta = \frac{a \cdot b}{\|a\|\|b\|}$ ([Vectors](../linear-algebra/vectors.md)).
    - **Positional encodings** in the original Transformer use $\sin$ and $\cos$ at many frequencies; **RoPE** encodes positions as rotations.
    - **Rotation matrices** $\begin{pmatrix}\cos\theta & -\sin\theta\\ \sin\theta & \cos\theta\end{pmatrix}$ are built directly from the angle-addition formulas.

## Check yourself

**1.** Simplify $\log_2 48 - \log_2 3$ and $\ln(e^5\sqrt e)$.

??? success "Solution"
    - $\log_2(48/3) = \log_2 16 = 4$
    - $\ln(e^{5}e^{1/2}) = \ln e^{5.5} = 5.5$

**2.** Solve $3 \cdot 2^{x} = 5^{x-1}$ for $x$.

??? success "Solution"
    1. Take $\ln$: $\ln 3 + x\ln 2 = (x-1)\ln 5$.
    2. Collect $x$: $x(\ln5 - \ln 2) = \ln 3 + \ln 5$.
    3. So $x = \dfrac{\ln 15}{\ln(5/2)} \approx 2.955$.

**3.** Prove the log-sum-exp identity $\log\sum_i e^{z_i} = m + \log\sum_i e^{z_i - m}$ for any constant $m$. Why choose $m = \max_i z_i$?

??? success "Solution"
    $\sum_i e^{z_i} = \sum_i e^{m}e^{z_i - m} = e^m\sum_i e^{z_i - m}$.

    Taking logs: $\log(e^m) + \log\sum_i e^{z_i - m} = m + \log\sum_i e^{z_i-m}$.

    Why $m = \max z_i$:

    - Every exponent $z_i - m \leq 0$, so nothing overflows.
    - At least one term equals $e^0 = 1$, so the sum is at least 1 and its log doesn't underflow.

**4.** Use the angle-addition formulas to find $\cos 75°$ exactly.

??? success "Solution"
    $$
    \cos(45° + 30°) = \cos45°\cos30° - \sin45°\sin30° = \frac{\sqrt2}{2}\cdot\frac{\sqrt3}{2} - \frac{\sqrt2}{2}\cdot\frac12 = \frac{\sqrt6 - \sqrt2}{4} \approx 0.2588.
    $$

**5.** Derive $\cos^2\theta = \frac{1 + \cos2\theta}{2}$. (This identity is used constantly in integration.)

??? success "Solution"
    $\cos2\theta = \cos^2\theta - \sin^2\theta = \cos^2\theta - (1 - \cos^2\theta) = 2\cos^2\theta - 1$. Solve for $\cos^2\theta$.

**6.** An investment grows 7% per year. Using logs, how many years until it doubles? Compare with the "rule of 72" estimate $72/7$.

??? success "Solution"
    $1.07^t = 2 \Rightarrow t = \frac{\ln2}{\ln1.07} \approx \frac{0.6931}{0.0677} \approx 10.24$ years.

    The rule of 72 gives $10.29$. Why it works:

    - $\ln(1 + r) \approx r$ for small $r$, so $t \approx 0.693/r$.
    - 72 is used instead of 69.3 because it has many divisors, and it partly corrects for the approximation.
