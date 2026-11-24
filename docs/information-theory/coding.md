# Compression and coding

<div class="lesson-meta" markdown>
**Phase 8 · Lesson 3** · ⏱ ~2.5 hours · Needs: [Entropy](entropy.md), [Cross-entropy and KL](kl-divergence.md)
</div>

Entropy was defined as average surprise. This lesson proves it has a hard operational meaning: **it is the minimum average number of bits per symbol needed to compress a source**, and that minimum can be reached. That's Shannon's source coding theorem. It also explains why a better predictive model means better compression, and why language models are measured in bits.

## 1. Prefix-free codes

A **code** assigns a binary codeword to each symbol. To decode a concatenated stream unambiguously without separators, we use **prefix-free** codes: no codeword is a prefix of another. Example: A = `0`, B = `10`, C = `110`, D = `111`. Reading `0110100` left to right: `0`→A, `110`→C, `10`→B, `0`→A.

Prefix-free codes are exactly the leaves of a binary tree (0 = left, 1 = right). A codeword of length $\ell$ "uses up" a $2^{-\ell}$ fraction of the tree beneath it.

## 2. Kraft's inequality

!!! theorem "Kraft's inequality"
    A prefix-free binary code with codeword lengths $\ell_1, \ldots, \ell_n$ exists if and only if

    $$
    \sum_{i=1}^n2^{-\ell_i}\leq1.
    $$

!!! proof "Proof"
    (⇒) Let $L = \max\ell_i$. In the full binary tree of depth $L$, codeword $i$ has $2^{L - \ell_i}$ descendants at depth $L$, and because the code is prefix-free these descendant sets are disjoint. So $\sum_i2^{L-\ell_i}\leq2^L$. Divide by $2^L$.

    (⇐) Sort the lengths $\ell_1\leq\cdots\leq\ell_n$ and assign codewords greedily: give symbol $i$ the leftmost available node at depth $\ell_i$, then remove its subtree. Before placing symbol $i$, the earlier codewords have removed $\sum_{j<i}2^{-\ell_j} < 1$ of the tree's "mass", and since all earlier lengths are $\leq\ell_i$, the removed part consists of whole nodes at depth $\ell_i$. So a free node at depth $\ell_i$ remains.

**Short codewords are a scarce resource.** You can't make everything short: giving one symbol a 1-bit codeword uses up half the budget.

## 3. The source coding theorem

!!! theorem "Shannon's source coding theorem (symbol codes)"
    For a source with distribution $p$, every prefix-free code has average length

    $$
    L = \sum_ip_i\ell_i\geq H(p)\quad\text{(in bits)},
    $$

    and there exists a prefix-free code with $L < H(p) + 1$.

!!! proof "Proof"
    *Lower bound.* Let $Z = \sum_j2^{-\ell_j}\leq1$ (Kraft) and define the distribution $q_i = 2^{-\ell_i}/Z$. Then $\ell_i = \log_2\frac{1}{q_i} - \log_2Z$, so

    $$
    L = \sum_ip_i\log_2\frac1{q_i} - \log_2Z = H(p, q) - \log_2Z\geq H(p, q)\geq H(p),
    $$

    using $-\log_2Z\geq0$ and Gibbs' inequality.

    *Achievability (Shannon code).* Choose $\ell_i = \left\lceil\log_2\frac1{p_i}\right\rceil$. Then $2^{-\ell_i}\leq p_i$, so $\sum2^{-\ell_i}\leq\sum p_i = 1$ and Kraft gives a prefix-free code. Its average length is $\sum p_i\left\lceil\log_2\frac1{p_i}\right\rceil < \sum p_i\left(\log_2\frac1{p_i} + 1\right) = H(p) + 1$.

!!! intuition "The ideal code length is the surprise"
    The optimal length for a symbol of probability $p$ is $\log_2\frac1p$, its surprise. Entropy is the average of these ideal lengths. The "+1" comes from rounding up to whole bits, and it disappears if you encode long blocks of $k$ symbols together: the overhead becomes $1/k$ bit per symbol. **Arithmetic coding** gets essentially to $H$ for any distribution.

And the coding interpretation of cross-entropy: if you design the code for $q$ (lengths $\log_2\frac1{q_i}$) but the data follow $p$, your average length is $H(p, q) = H(p) + \KL(p\,\|\,q)$. **The KL divergence is the number of bits per symbol wasted by using the wrong model.**

## 4. Huffman coding

Shannon codes are within 1 bit of optimal but not always optimal. **Huffman's algorithm** finds the exact optimum: repeatedly merge the two least probable symbols into one node, until a single tree remains. Then read off the codewords from the root.

<div class="viz" data-viz="huffman"></div>

??? proof "Why Huffman is optimal (deeper)"
    In an optimal code, (a) more probable symbols never have longer codewords (otherwise swap them and the average decreases), (b) the two longest codewords have the same length (otherwise shorten the longer one), and (c) we may assume the two least probable symbols are siblings at the deepest level (rearrange). Merging those two siblings gives an optimal code for the reduced alphabet, whose average length is exactly $p_a + p_b$ less. Induction on the alphabet size completes the proof.

## 5. Prediction is compression

Combine the pieces: given any probabilistic model $q$ of a data source, arithmetic coding compresses data to about $\log_2\frac{1}{q(\text{data})}$ bits. So:

$$
\text{compressed size of a dataset (bits)}\approx\sum_i\log_2\frac{1}{q(x_i\mid x_{<i})} = n\cdot H(p_{\text{data}}, q)\ \text{(in bits)}.
$$

**A model's cross-entropy loss is literally the length of the compressed data.** Better prediction means smaller files, and vice versa. Large language models used with arithmetic coding are among the best general-purpose text compressors that exist.

**Perplexity**, the standard language-model metric, is $2^{H(p, q)}$ (with $H$ in bits), or $e^{H}$ in nats. It's the effective number of equally likely choices the model is hesitating between at each token. A perplexity of 10 means the model is, on average, as uncertain as if choosing uniformly among 10 tokens.

## 6. Channels, in one paragraph

Shannon's second great theorem concerns sending information over a **noisy channel**. Each channel has a **capacity** $C = \max_{p(x)}I(X; Y)$ (in bits per use), and reliable communication is possible at any rate below $C$, and impossible above it. For a binary channel that flips each bit with probability $\varepsilon$, $C = 1 - H_2(\varepsilon)$, where $H_2$ is the binary entropy. Error-correcting codes that approach this limit are why phones, Wi-Fi and deep-space probes work.

!!! ml "Where this shows up"
    - **Bits per byte / bits per character** are compression-based metrics for language models.
    - **Perplexity** is reported for every language model.
    - **Tokenization** (BPE) is a compression algorithm: frequent character sequences get their own short tokens.
    - **Minimum description length (MDL)**: the best model is the one that compresses the data (plus the model itself) the most, a formal version of Occam's razor.

## Check yourself

**1.** Do lengths $(1, 2, 2, 3)$ admit a prefix-free code? What about $(1, 2, 3, 3)$?

??? success "Solution"
    $\frac12 + \frac14 + \frac14 + \frac18 = 1.125 > 1$: no. $\frac12 + \frac14 + \frac18 + \frac18 = 1$: yes, e.g. `0, 10, 110, 111`.

**2.** A source has probabilities $(0.4, 0.3, 0.2, 0.1)$. Build a Huffman code and compare its average length with the entropy.

??? success "Solution"
    Merge 0.1 + 0.2 = 0.3; merge 0.3 + 0.3 = 0.6; merge 0.4 + 0.6. Lengths: 0.4→1, 0.3→2, 0.2→3, 0.1→3. $L = 0.4 + 0.6 + 0.6 + 0.3 = 1.9$ bits. $H\approx1.846$ bits. Indeed $H\leq L < H + 1$.

**3.** A language model has a cross-entropy of 2.3 nats per token. What's its perplexity? Roughly how many bits per token would it take to compress text with it?

??? success "Solution"
    Perplexity $e^{2.3}\approx10$. Bits per token: $2.3/\ln2\approx3.32$.

**4.** You compress English text with a code designed for uniformly random letters (26 letters, about 4.7 bits each). English has roughly 1.3 bits of entropy per letter. How many bits per letter are wasted, and what quantity is this?

??? success "Solution"
    About $4.7 - 1.3 = 3.4$ bits per letter. That's $\KL(p_{\text{English}}\,\|\,\text{uniform}) = \log_226 - H$, the cost of using the wrong model.

**5.** Prove that for a dyadic distribution (all $p_i = 2^{-k_i}$), the Shannon code achieves $L = H$ exactly.

??? success "Solution"
    $\ell_i = \lceil\log_2(1/p_i)\rceil = k_i$ exactly, so $L = \sum p_ik_i = \sum p_i\log_2\frac1{p_i} = H$.
