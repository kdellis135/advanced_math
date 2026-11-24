# Cross-entropy, KL and mutual information

<div class="lesson-meta" markdown>
**Phase 8 · Lesson 2** · ⏱ ~3.5 hours · Needs: [Entropy](entropy.md), [Estimation, MLE and MAP](../statistics/estimation.md)
</div>

Entropy measures the uncertainty of one distribution. ML is constantly *comparing* distributions: the model's prediction vs the truth, an approximate posterior vs the real one. This lesson defines the three central comparisons (cross-entropy, KL divergence and mutual information), proves the inequality that underpins them, and shows why minimizing cross-entropy is the right way to train a classifier.

## 1. Cross-entropy

Suppose outcomes really come from $p$, but you believe they come from $q$, and you pay surprise $\log\frac1{q(x)}$ under your belief.

!!! definition "Definition: cross-entropy"
    $$
    H(p, q) = \E_{x\sim p}\left[\log\frac{1}{q(x)}\right] = -\sum_xp(x)\log q(x).
    $$

It's the average surprise when the truth is $p$ but you assign probabilities with $q$. In coding terms ([next lesson](coding.md)), it's the average code length if you design your code for $q$ but the data follow $p$.

## 2. KL divergence

How much worse is believing $q$ than knowing $p$?

!!! definition "Definition: Kullback–Leibler divergence"
    $$
    \KL(p\,\|\,q) = H(p, q) - H(p) = \sum_xp(x)\log\frac{p(x)}{q(x)} = \E_{x\sim p}\left[\log\frac{p(x)}{q(x)}\right].
    $$

    (For densities, replace the sum with an integral.)

KL is the **expected extra surprise** (or extra bits) from using the wrong model.

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

!!! warning "KL is not a distance"
    It's not symmetric, $\KL(p\,\|\,q)\neq\KL(q\,\|\,p)$ in general, and it doesn't satisfy the triangle inequality. It can be infinite: if $q(x) = 0$ somewhere that $p(x) > 0$, you'd be infinitely surprised by an event you declared impossible.

<div class="viz" data-viz="kl"></div>

For two Gaussians there's a closed form: $\KL\big(\mathcal N(\mu_1, \sigma_1^2)\,\|\,\mathcal N(\mu_2, \sigma_2^2)\big) = \log\frac{\sigma_2}{\sigma_1} + \frac{\sigma_1^2 + (\mu_1 - \mu_2)^2}{2\sigma_2^2} - \frac12$. The figure computes it.

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
    The first equality: $H(p, q) = H(p) + \KL(p\,\|\,q)$, and $H(p_{\text{data}})$ doesn't depend on $\theta$. The second: the computation above, plus the fact that $-\log$ is decreasing.

**Training a classifier or language model with cross-entropy loss = maximum likelihood = making the model's distribution as close as possible to the data's, in KL.** The irreducible part, $H(p_{\text{data}})$, is the inherent unpredictability of the data, and no model can go below it.

## 4. Forward vs reverse KL

When approximating a complicated $p$ by a simpler $q$, the direction of the KL matters.

- **Forward KL**, $\KL(p\,\|\,q)$, averages over $p$, and is huge wherever $p > 0$ but $q\approx0$. So $q$ must **cover** all of $p$'s mass, even at the price of putting mass where $p$ has none. This is "mean-seeking" or **mass-covering**. Maximum likelihood minimizes this direction.
- **Reverse KL**, $\KL(q\,\|\,p)$, averages over $q$, and is huge wherever $q > 0$ but $p\approx0$. So $q$ avoids regions where $p$ is small, and may lock onto a **single mode** of a multimodal $p$. This is **mode-seeking**. Variational inference minimizes this direction.

In the figure, make $p$ wide and $q$ narrow (and then the reverse) to see the two directions disagree.

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
    By the chain rule, $H(Y\mid X) = H(X, Y) - H(X)$, so $I = H(X) + H(Y) - H(X,Y)$, which is symmetric in $X$ and $Y$. For the KL form, expand:
    $\sum_{x,y}p(x,y)\log\frac{p(x,y)}{p(x)p(y)} = \sum p(x,y)\log p(x,y) - \sum p(x,y)\log p(x) - \sum p(x,y)\log p(y) = -H(X,Y) + H(X) + H(Y)$.

Consequences:

- $I(X; Y)\geq0$ (it's a KL), which proves "conditioning reduces entropy" from the [previous lesson](entropy.md#4-joint-and-conditional-entropy).
- $I(X; Y) = 0$ iff $X$ and $Y$ are **independent**. Unlike correlation, mutual information detects *any* dependence, not just linear ones. For the $Y = X^2$ example in [Several random variables](../probability/joint.md#3-covariance-and-correlation), the correlation is 0 but $I(X; Y) = H(Y) > 0$.
- **Data processing inequality:** if $X\to Y\to Z$ is a Markov chain (so $Z$ depends on $X$ only through $Y$), then $I(X; Z)\leq I(X; Y)$. Processing can't create information about $X$, only lose it. Each layer of a network can only lose information about its input.

## 6. The ELBO: KL and Jensen at work

Variational autoencoders and diffusion models want to maximize $\log p_\theta(\vv x) = \log\int p_\theta(\vv x, \vv z)\,d\vv z$, an intractable integral over latent variables $\vv z$. Introduce any distribution $q(\vv z)$ and use Jensen:

$$
\log p_\theta(\vv x) = \log\E_{q}\left[\frac{p_\theta(\vv x, \vv z)}{q(\vv z)}\right]\geq\E_q\left[\log\frac{p_\theta(\vv x, \vv z)}{q(\vv z)}\right] =: \text{ELBO}.
$$

The gap is exactly a KL divergence:

$$
\log p_\theta(\vv x) = \text{ELBO} + \KL\big(q(\vv z)\,\|\,p_\theta(\vv z\mid\vv x)\big).
$$

(Check by writing $p_\theta(\vv x, \vv z) = p_\theta(\vv x)p_\theta(\vv z\mid\vv x)$ inside the ELBO.) So maximizing the ELBO simultaneously pushes up the likelihood and pulls $q$ toward the true posterior, in reverse KL. Rearranging the ELBO gives the familiar VAE loss: $\E_q[\log p_\theta(\vv x\mid\vv z)] - \KL(q(\vv z)\,\|\,p(\vv z))$, i.e. reconstruction minus a KL regularizer.

!!! ml "Where this shows up"
    - **Cross-entropy loss:** every classifier and language model.
    - **Knowledge distillation:** train a small student to minimize $\KL(p_{\text{teacher}}\,\|\,p_{\text{student}})$ on soft labels.
    - **RLHF and PPO:** a KL penalty $\KL(\pi_\theta\,\|\,\pi_{\text{ref}})$ keeps the fine-tuned model close to the original.
    - **VAEs and diffusion models:** the ELBO above.
    - **Contrastive learning (InfoNCE, CLIP):** the loss is a lower bound on the mutual information between two views of the data.

## Check yourself

**1.** $p = (\frac12, \frac12)$, $q = (\frac34, \frac14)$. Compute $H(p, q)$, $\KL(p\,\|\,q)$ and $\KL(q\,\|\,p)$ in bits.

??? success "Solution"
    $H(p, q) = \frac12\log_2\frac43 + \frac12\log_24 = 0.2075 + 1 = 1.2075$. $\KL(p\,\|\,q) = 1.2075 - 1 = 0.2075$. $\KL(q\,\|\,p) = \frac34\log_2\frac{3/4}{1/2} + \frac14\log_2\frac{1/4}{1/2} = 0.4387 - 0.25 = 0.1887$. Not equal.

**2.** A classifier assigns probability 0.8 to the correct class. What's its cross-entropy loss on that example, in nats? If it had assigned 0.01?

??? success "Solution"
    $-\ln0.8\approx0.223$. $-\ln0.01\approx4.6$. Confident mistakes are punished heavily.

**3.** Why is $\KL(p\,\|\,q) = \infty$ if $q(x) = 0$ for some $x$ with $p(x) > 0$? What does this imply for models that output exact zeros?

??? success "Solution"
    The term $p(x)\log\frac{p(x)}{0}$ is infinite. A model assigning zero probability to something that actually occurs gets infinite loss. That's why softmax outputs are strictly positive and why label smoothing and probability clipping are used.

**4.** $X$ and $Y$ are fair bits with $Y = X$. Find $I(X; Y)$. What if $Y$ is independent of $X$?

??? success "Solution"
    $Y = X$: $H(Y\mid X) = 0$, so $I = H(Y) = 1$ bit. Independent: $I = 0$.

**5.** Show that $H(p, q) = H(p) + \KL(p\,\|\,q)$.

??? success "Solution"
    $-\sum p\log q = -\sum p\log p + \sum p\log\frac pq$.

**6.** Verify the ELBO gap identity: $\log p(\vv x) - \text{ELBO} = \KL(q(\vv z)\,\|\,p(\vv z\mid\vv x))$.

??? success "Solution"
    $\text{ELBO} = \E_q[\log p(\vv x) + \log p(\vv z\mid\vv x) - \log q(\vv z)] = \log p(\vv x) - \E_q\left[\log\frac{q(\vv z)}{p(\vv z\mid\vv x)}\right] = \log p(\vv x) - \KL(q\,\|\,p(\cdot\mid\vv x))$.
