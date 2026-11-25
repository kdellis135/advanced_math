---
description: "Cross-entropy, KL divergence and mutual information explained, why minimizing cross-entropy loss is maximum likelihood, forward vs reverse KL and the ELBO."
---

# Cross-entropy, KL and mutual information

<div class="lesson-meta" markdown>
**Phase 8 · Lesson 2** · ⏱ ~3.5 hours · Needs: [Entropy](entropy.md), [Estimation, MLE and MAP](../statistics/estimation.md)
</div>

Entropy measures the uncertainty of one distribution. ML is constantly *comparing* distributions:

- the model's prediction vs the truth;
- an approximate posterior vs the real one.

This lesson:

1. defines the three central comparisons: cross-entropy, KL divergence and mutual information;
2. proves the inequality that underpins them;
3. shows why minimizing cross-entropy is the right way to train a classifier.

## 1. Cross-entropy

Suppose:

- outcomes really come from $p$;
- but you believe they come from $q$;
- so you pay surprise $\log\frac1{q(x)}$ under your belief.

!!! definition "Definition: cross-entropy"
    $$
    H(p, q) = \E_{x\sim p}\left[\log\frac{1}{q(x)}\right] = -\sum_xp(x)\log q(x).
    $$

It's the average surprise when the truth is $p$ but you assign probabilities with $q$.

In coding terms ([next lesson](coding.md)), it's the average code length if you design your code for $q$ but the data follow $p$.

!!! example "Example: a weather forecaster"
    In some town it's really sunny 75% of the time: $p = (0.75, 0.25)$ for (sun, rain). Different forecasters believe different $q$:

    | Forecaster's belief $q$ | $H(p, q)$ (bits) |
    |---|---|
    | $(0.75, 0.25)$: knows the truth | $0.811 = H(p)$ |
    | $(0.9, 0.1)$: overconfident in sun | $0.944$ |
    | $(0.5, 0.5)$: no idea | $1.000$ |
    | $(0.25, 0.75)$: backwards | $1.604$ |

    For the backwards forecaster: $\ 0.75\log_2\frac{1}{0.25} + 0.25\log_2\frac{1}{0.75} = 0.75(2) + 0.25(0.415) \approx 1.604$.

    The forecaster who knows the truth has the lowest average surprise. Every wrong belief costs extra.

**With a one-hot label**, cross-entropy collapses to a single term. If the true class is $c$, then $p(c) = 1$ and $p(x) = 0$ for every other class, so

$$
H(p, q) = -\log q(c).
$$

That's the familiar classification loss: minus the log of the probability the model gave to the right answer.

## 2. KL divergence

How much worse is believing $q$ than knowing $p$?

!!! definition "Definition: Kullback–Leibler divergence"
    $$
    \KL(p\,\|\,q) = H(p, q) - H(p) = \sum_xp(x)\log\frac{p(x)}{q(x)} = \E_{x\sim p}\left[\log\frac{p(x)}{q(x)}\right].
    $$

    (For densities, replace the sum with an integral.)

KL is the **expected extra surprise** (or extra bits) from using the wrong model.

!!! example "Example: the forecasters' KL"
    Subtract $H(p) = 0.811$ from each row of the table above:

    | Belief $q$ | $\KL(p\,\Vert\,q)$ (bits) |
    |---|---|
    | $(0.75, 0.25)$ | $0$ |
    | $(0.9, 0.1)$ | $0.133$ |
    | $(0.5, 0.5)$ | $0.189$ |
    | $(0.25, 0.75)$ | $0.792$ |

    Read it as a price. The "no idea" forecaster wastes 0.189 bits per day compared to someone who knows the true odds. The backwards forecaster wastes almost 0.8 bits per day.

    The same number from the sum formula, for $q = (0.5, 0.5)$:

    $$
    0.75\log_2\frac{0.75}{0.5} + 0.25\log_2\frac{0.25}{0.5} = 0.75(0.585) + 0.25(-1) \approx 0.189.
    $$

    One term is negative: on rainy days, the "no idea" forecaster is *less* surprised than the expert. On average, though, the expert always wins. That's the next theorem.

!!! theorem "Gibbs' inequality"
    $$
    \KL(p\,\|\,q)\geq0,
    $$

    with equality iff $p = q$. Equivalently, $H(p, q)\geq H(p)$: you can never do better than the true distribution.

!!! proof "Proof"
    $-\log$ is strictly convex, so by Jensen:

    $$
    \KL(p\,\|\,q) = \E_p\left[-\log\frac{q(X)}{p(X)}\right]\geq-\log\E_p\left[\frac{q(X)}{p(X)}\right] = -\log\sum_{x:p(x)>0}q(x)\geq-\log1 = 0.
    $$

    Equality in Jensen requires $q(X)/p(X)$ to be constant, and since both sum to 1 the constant is 1.

    (The middle step: $\E_p\left[\frac{q(X)}{p(X)}\right] = \sum_x p(x)\cdot\frac{q(x)}{p(x)}$, and the $p(x)$ cancels in each term. Only the $x$ with $p(x) > 0$ appear in the expectation, so we get the $q$-mass of those outcomes, which is at most 1. Since $-\log$ is decreasing, $-\log(\text{something} \leq 1) \geq 0$.)

!!! warning "KL is not a distance"
    - It's not symmetric: $\KL(p\,\|\,q)\neq\KL(q\,\|\,p)$ in general.
    - It doesn't satisfy the triangle inequality.
    - It can be infinite: if $q(x) = 0$ somewhere that $p(x) > 0$, you'd be infinitely surprised by an event you declared impossible.

<div class="viz" data-viz="kl"></div>

For two Gaussians there's a closed form, which the figure computes:

$$
\KL\big(\mathcal N(\mu_1, \sigma_1^2)\,\|\,\mathcal N(\mu_2, \sigma_2^2)\big) = \log\frac{\sigma_2}{\sigma_1} + \frac{\sigma_1^2 + (\mu_1 - \mu_2)^2}{2\sigma_2^2} - \frac12.
$$

!!! example "Example: plugging in (in nats)"
    | $p$ | $q$ | $\KL(p\,\Vert\,q)$ |
    |---|---|---|
    | $\mathcal N(0, 1)$ | $\mathcal N(0, 1)$ | $0 + \frac12 - \frac12 = 0$ |
    | $\mathcal N(0, 1)$ | $\mathcal N(1, 1)$ | $0 + \frac{1 + 1}{2} - \frac12 = 0.5$ |
    | $\mathcal N(0, 1)$ | $\mathcal N(0, 2^2)$ | $\ln 2 + \frac{1}{8} - \frac12 \approx 0.318$ |
    | $\mathcal N(0, 2^2)$ | $\mathcal N(0, 1)$ | $\ln\frac12 + \frac{4}{2} - \frac12 \approx 0.807$ |

    - With equal widths, KL is $\frac{(\mu_1 - \mu_2)^2}{2\sigma^2}$: squared distance between the means, measured in units of the width.
    - The last two rows swap $p$ and $q$ and get different answers. Using a *too-narrow* $q$ (last row) is punished more than using a too-wide one: the narrow $q$ is badly surprised by $p$'s tails.

## 3. Minimizing cross-entropy is maximum likelihood

Let $p_{\text{data}}$ be the empirical distribution of a training set: $\frac1n$ on each observed example. For a model $q_\theta$:

$$
H(p_{\text{data}}, q_\theta) = -\sum_xp_{\text{data}}(x)\log q_\theta(x) = -\frac1n\sum_{i=1}^n\log q_\theta(x_i).
$$

That's the **average negative log-likelihood**. So:

!!! theorem "Theorem"
    $$
    \argmin_\theta H(p_{\text{data}}, q_\theta) = \argmin_\theta\KL(p_{\text{data}}\,\|\,q_\theta) = \argmax_\theta\prod_iq_\theta(x_i) = \hat\theta_{\text{MLE}}.
    $$

!!! proof "Proof"
    - **First equality:** $H(p, q) = H(p) + \KL(p\,\|\,q)$, and $H(p_{\text{data}})$ doesn't depend on $\theta$.
    - **Second equality:** the computation above, plus the fact that $-\log$ is decreasing.

!!! example "Example: fitting a coin by minimizing cross-entropy"
    The data are 10 flips with 7 heads, so $p_{\text{data}} = (0.7, 0.3)$. The model is a coin with heads-probability $\theta$:

    $$
    H(p_{\text{data}}, q_\theta) = -\big(0.7\log_2\theta + 0.3\log_2(1 - \theta)\big).
    $$

    | $\theta$ | $0.3$ | $0.5$ | $0.7$ | $0.9$ |
    |---|---|---|---|---|
    | cross-entropy (bits) | $1.370$ | $1.000$ | $\mathbf{0.881}$ | $1.103$ |

    - The minimum is at $\theta = 0.7$: the MLE, the observed fraction of heads.
    - The minimum value $0.881 = H(0.7, 0.3)$ is the data's own entropy. That's the floor: the KL part has been driven to 0.
    - Setting the derivative to zero gives the same answer: $\ -\frac{0.7}{\theta} + \frac{0.3}{1 - \theta} = 0$, so $\theta = 0.7$.

**Training a classifier or language model with cross-entropy loss**

= maximum likelihood

= making the model's distribution as close as possible to the data's, in KL.

The irreducible part, $H(p_{\text{data}})$, is the inherent unpredictability of the data. No model can go below it.

## 4. Forward vs reverse KL

When approximating a complicated $p$ by a simpler $q$, the direction of the KL matters.

| | **Forward KL** $\KL(p\,\Vert\,q)$ | **Reverse KL** $\KL(q\,\Vert\,p)$ |
|---|---|---|
| averages over | $p$ | $q$ |
| huge wherever | $p > 0$ but $q\approx0$ | $q > 0$ but $p\approx0$ |
| so $q$ | must **cover** all of $p$'s mass, even putting mass where $p$ has none | avoids regions where $p$ is small; may lock onto a **single mode** |
| nickname | mean-seeking, **mass-covering** | **mode-seeking** |
| minimized by | maximum likelihood | variational inference |

In the figure, make $p$ wide and $q$ narrow (and then the reverse) to see the two directions disagree.

!!! example "Example: a two-humped $p$, in numbers"
    Three outcomes (left, middle, right). The truth has two humps: $p = (0.49, 0.02, 0.49)$. Compare two simple approximations:

    | Candidate $q$ | Forward $\KL(p\,\Vert\,q)$ | Reverse $\KL(q\,\Vert\,p)$ |
    |---|---|---|
    | spread out: $(\frac13, \frac13, \frac13)$ | $\mathbf{0.464}$ | $0.982$ |
    | one hump: $(0.96, 0.02, 0.02)$ | $1.786$ | $\mathbf{0.839}$ |

    (bits; bold marks the winner in each column)

    - **Forward KL prefers spreading out.** The one-hump $q$ gives the right hump only $0.02$, but $p$ puts $0.49$ there. Averaging over $p$, that miss is expensive.
    - **Reverse KL prefers one hump.** The spread-out $q$ puts $\frac13$ on the middle, where $p$ is only $0.02$. Averaging over $q$, wasted mass in the valley is expensive.

!!! intuition "Who is doing the averaging?"
    The expectation is always taken under the *first* argument.

    - $\KL(p\,\Vert\,q)$ looks at the places where $p$ lives and asks: "is $q$ there too?" Missing any part of $p$ costs a lot.
    - $\KL(q\,\Vert\,p)$ looks at the places where $q$ lives and asks: "is $p$ there too?" Going anywhere $p$ isn't costs a lot. Staying home on one safe hump is cheap.

## 5. Mutual information

How much does knowing $X$ tell you about $Y$?

!!! definition "Definition: mutual information"
    $$
    I(X; Y) = H(Y) - H(Y\mid X).
    $$

!!! theorem "Equivalent forms"
    $$
    I(X; Y) = H(X) - H(X\mid Y) = H(X) + H(Y) - H(X, Y) = \KL\big(p(x,y)\,\|\,p(x)\,p(y)\big).
    $$

!!! proof "Proof"
    By the chain rule, $H(Y\mid X) = H(X, Y) - H(X)$, so $I = H(X) + H(Y) - H(X,Y)$, which is symmetric in $X$ and $Y$.

    For the KL form, expand:

    $$
    \sum_{x,y}p(x,y)\log\frac{p(x,y)}{p(x)p(y)} = \sum p(x,y)\log p(x,y) - \sum p(x,y)\log p(x) - \sum p(x,y)\log p(y) = -H(X,Y) + H(X) + H(Y).
    $$

!!! example "Example: the joint table from the entropy lesson"
    | | $Y=0$ | $Y=1$ | $p_X$ |
    |---|---|---|---|
    | $X=0$ | 0.3 | 0.1 | 0.4 |
    | $X=1$ | 0.2 | 0.4 | 0.6 |
    | $p_Y$ | 0.5 | 0.5 | |

    **Route 1: entropies.** The [entropy lesson](entropy.md#4-joint-and-conditional-entropy) found $H(Y) = 1$ and $H(Y\mid X) \approx 0.875$, so

    $$
    I(X; Y) = 1 - 0.875 \approx 0.125 \text{ bits.}
    $$

    **Route 2: KL from independence.** If $X$ and $Y$ were independent, the table would be $p(x)p(y)$:

    | | $Y=0$ | $Y=1$ |
    |---|---|---|
    | $X=0$ | 0.2 | 0.2 |
    | $X=1$ | 0.3 | 0.3 |

    Compare the real table cell by cell:

    $$
    0.3\log_2\tfrac{0.3}{0.2} + 0.1\log_2\tfrac{0.1}{0.2} + 0.2\log_2\tfrac{0.2}{0.3} + 0.4\log_2\tfrac{0.4}{0.3} \approx 0.175 - 0.100 - 0.117 + 0.166 \approx 0.125.
    $$

    Both routes agree. Mutual information measures how far the joint table is from the "no relationship" table.

!!! example "Example: a noisy channel"
    Send a fair bit $X$. The receiver gets $Y$, which equals $X$ except that it's flipped with probability $\varepsilon$.

    Given $X$, the only uncertainty about $Y$ is whether a flip happened, so $H(Y\mid X) = H(\varepsilon)$. Also $Y$ is still a fair bit, so $H(Y) = 1$, and

    $$
    I(X; Y) = 1 - H(\varepsilon).
    $$

    | Flip probability $\varepsilon$ | $0$ | $0.01$ | $0.1$ | $0.25$ | $0.5$ |
    |---|---|---|---|---|---|
    | bits that get through, $I(X; Y)$ | $1$ | $0.919$ | $0.531$ | $0.189$ | $0$ |

    At $\varepsilon = 0.5$ the output is a coin flip unrelated to the input: nothing gets through. This $1 - H(\varepsilon)$ is the **capacity** of the channel, the subject of Shannon's noisy-channel theorem.

Consequences:

- $I(X; Y)\geq0$ (it's a KL), which proves "conditioning reduces entropy" from the [previous lesson](entropy.md#4-joint-and-conditional-entropy).
- $I(X; Y) = 0$ iff $X$ and $Y$ are **independent**.
    - Unlike correlation, mutual information detects *any* dependence, not just linear ones.
    - For the $Y = X^2$ example in [Several random variables](../probability/joint.md#3-covariance-and-correlation), the correlation is 0 but $I(X; Y) = H(Y) > 0$.
- **Data processing inequality:** if $X\to Y\to Z$ is a Markov chain (so $Z$ depends on $X$ only through $Y$), then $I(X; Z)\leq I(X; Y)$.
    - Processing can't create information about $X$, only lose it.
    - Each layer of a network can only lose information about its input.

## 6. The ELBO: KL and Jensen at work

Variational autoencoders and diffusion models want to maximize

$$
\log p_\theta(\vv x) = \log\int p_\theta(\vv x, \vv z)\,d\vv z,
$$

an intractable integral over latent variables $\vv z$. Introduce any distribution $q(\vv z)$ and use Jensen:

$$
\log p_\theta(\vv x) = \log\E_{q}\left[\frac{p_\theta(\vv x, \vv z)}{q(\vv z)}\right]\geq\E_q\left[\log\frac{p_\theta(\vv x, \vv z)}{q(\vv z)}\right] =: \text{ELBO}.
$$

The gap is exactly a KL divergence:

$$
\log p_\theta(\vv x) = \text{ELBO} + \KL\big(q(\vv z)\,\|\,p_\theta(\vv z\mid\vv x)\big).
$$

(Check by writing $p_\theta(\vv x, \vv z) = p_\theta(\vv x)p_\theta(\vv z\mid\vv x)$ inside the ELBO. Exercise 6 does this.)

Where the first equation came from, step by step:

1. Multiply and divide by $q(\vv z)$ inside the integral: $\ \int p_\theta(\vv x, \vv z)\,d\vv z = \int q(\vv z)\,\frac{p_\theta(\vv x, \vv z)}{q(\vv z)}\,d\vv z$.
2. An integral of "$q(\vv z)$ times something" is an expectation under $q$, so this is $\E_q\left[\frac{p_\theta(\vv x, \vv z)}{q(\vv z)}\right]$.
3. $\log$ is concave, so by [Jensen](../optimization/convexity.md), $\log\E[\,\cdot\,]\geq\E[\log\,\cdot\,]$.

The point of the trick: the right side is an average under $q$, which we choose to be easy to sample from. We can estimate it by drawing a few $\vv z$'s, even though the original integral was hopeless.

So maximizing the ELBO simultaneously:

- pushes up the likelihood;
- pulls $q$ toward the true posterior, in reverse KL.

Rearranging the ELBO gives the familiar VAE loss, reconstruction minus a KL regularizer:

$$
\E_q[\log p_\theta(\vv x\mid\vv z)] - \KL(q(\vv z)\,\|\,p(\vv z)).
$$

To get there, split the joint the other way, $p_\theta(\vv x, \vv z) = p_\theta(\vv x\mid\vv z)\,p(\vv z)$:

$$
\text{ELBO} = \E_q\left[\log p_\theta(\vv x\mid\vv z) + \log\frac{p(\vv z)}{q(\vv z)}\right] = \E_q[\log p_\theta(\vv x\mid\vv z)] - \E_q\left[\log\frac{q(\vv z)}{p(\vv z)}\right].
$$

The second expectation is $\KL(q\,\Vert\,p(\vv z))$ by definition.

| Term | What it asks | In a VAE |
|---|---|---|
| $\E_q[\log p_\theta(\vv x\mid\vv z)]$ | Can the code $\vv z$ rebuild $\vv x$? | reconstruction loss of the decoder |
| $\KL(q(\vv z)\,\Vert\,p(\vv z))$ | Does the code stay close to the prior? | regularizer on the encoder, usually toward $\mathcal N(\vv 0, I)$ |

!!! ml "Where this shows up"
    - **Cross-entropy loss:** every classifier and language model.
    - **Knowledge distillation:** train a small student to minimize $\KL(p_{\text{teacher}}\,\|\,p_{\text{student}})$ on soft labels.
    - **RLHF and PPO:** a KL penalty $\KL(\pi_\theta\,\|\,\pi_{\text{ref}})$ keeps the fine-tuned model close to the original.
    - **VAEs and diffusion models:** the ELBO above.
    - **Contrastive learning (InfoNCE, CLIP):** the loss is a lower bound on the mutual information between two views of the data.

## Check yourself

**1.** $p = (\frac12, \frac12)$, $q = (\frac34, \frac14)$. Compute $H(p, q)$, $\KL(p\,\|\,q)$ and $\KL(q\,\|\,p)$ in bits.

??? success "Solution"
    | Quantity | Computation | Value (bits) |
    |---|---|---|
    | $H(p, q)$ | $\frac12\log_2\frac43 + \frac12\log_24 = 0.2075 + 1$ | $1.2075$ |
    | $\KL(p\,\Vert\,q)$ | $1.2075 - H(p) = 1.2075 - 1$ | $0.2075$ |
    | $\KL(q\,\Vert\,p)$ | $\frac34\log_2\frac{3/4}{1/2} + \frac14\log_2\frac{1/4}{1/2} = 0.4387 - 0.25$ | $0.1887$ |

    The two KLs are not equal.

**2.** A classifier assigns probability 0.8 to the correct class. What's its cross-entropy loss on that example, in nats? If it had assigned 0.01?

??? success "Solution"
    - $-\ln0.8\approx0.223$
    - $-\ln0.01\approx4.6$

    Confident mistakes are punished heavily.

**3.** Why is $\KL(p\,\|\,q) = \infty$ if $q(x) = 0$ for some $x$ with $p(x) > 0$? What does this imply for models that output exact zeros?

??? success "Solution"
    The term $p(x)\log\frac{p(x)}{0}$ is infinite.

    A model assigning zero probability to something that actually occurs gets infinite loss. That's why:

    - softmax outputs are strictly positive;
    - label smoothing and probability clipping are used.

**4.** $X$ and $Y$ are fair bits with $Y = X$. Find $I(X; Y)$. What if $Y$ is independent of $X$?

??? success "Solution"
    - **$Y = X$:** $H(Y\mid X) = 0$, so $I = H(Y) = 1$ bit.
    - **Independent:** $I = 0$.

**5.** Show that $H(p, q) = H(p) + \KL(p\,\|\,q)$.

??? success "Solution"
    $-\sum p\log q = -\sum p\log p + \sum p\log\frac pq$.

**6.** Verify the ELBO gap identity: $\log p(\vv x) - \text{ELBO} = \KL(q(\vv z)\,\|\,p(\vv z\mid\vv x))$.

??? success "Solution"
    $$
    \begin{aligned}
    \text{ELBO} &= \E_q[\log p(\vv x) + \log p(\vv z\mid\vv x) - \log q(\vv z)] \\
    &= \log p(\vv x) - \E_q\left[\log\frac{q(\vv z)}{p(\vv z\mid\vv x)}\right] \\
    &= \log p(\vv x) - \KL(q\,\|\,p(\cdot\mid\vv x)).
    \end{aligned}
    $$
