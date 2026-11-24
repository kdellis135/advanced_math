# Compression and coding

<div class="lesson-meta" markdown>
**Phase 8 · Lesson 3** · ⏱ ~2.5 hours · Needs: [Entropy](entropy.md), [Cross-entropy and KL](kl-divergence.md)
</div>

Entropy was defined as average surprise. This lesson proves it has a hard operational meaning:

> **Entropy is the minimum average number of bits per symbol needed to compress a source**, and that minimum can be reached.

That's Shannon's source coding theorem. It also explains:

- why a better predictive model means better compression;
- why language models are measured in bits.

## 1. Prefix-free codes

A **code** assigns a binary codeword to each symbol.

To decode a concatenated stream unambiguously without separators, we use **prefix-free** codes: no codeword is a prefix of another.

Example: A = `0`, B = `10`, C = `110`, D = `111`. Reading `0110100` left to right:

| Bits read | Symbol |
|---|---|
| `0` | A |
| `110` | C |
| `10` | B |
| `0` | A |

!!! warning "What goes wrong without prefix-freeness"
    Try A = `0`, B = `01`, C = `10`. Here `0` is a prefix of `01`.

    The stream `010` could be:

    - `0` `10` = A C, or
    - `01` `0` = B A.

    The receiver can't tell which. With a prefix-free code, the moment a codeword is complete you *know* it's complete, because no longer codeword starts the same way.

Prefix-free codes are exactly the leaves of a binary tree (0 = left, 1 = right).

For the code A = `0`, B = `10`, C = `110`, D = `111`, the tree looks like this:

```text
        root
       /    \
     0/      \1
     A        •
            0/ \1
            B   •
              0/ \1
              C   D
```

Each codeword is a leaf, and no leaf sits above another, which is exactly "no codeword is a prefix of another."

A codeword of length $\ell$ "uses up" a $2^{-\ell}$ fraction of the tree beneath it.

| Codeword | Length $\ell$ | Share of the tree $2^{-\ell}$ |
|---|---|---|
| A = `0` | 1 | $\frac12$ (the whole left half) |
| B = `10` | 2 | $\frac14$ |
| C = `110` | 3 | $\frac18$ |
| D = `111` | 3 | $\frac18$ |
| | **total** | $1$ |

## 2. Kraft's inequality

!!! theorem "Kraft's inequality"
    A prefix-free binary code with codeword lengths $\ell_1, \ldots, \ell_n$ exists if and only if

    $$
    \sum_{i=1}^n2^{-\ell_i}\leq1.
    $$

!!! proof "Proof"
    **(⇒)** Let $L = \max\ell_i$.

    1. In the full binary tree of depth $L$, codeword $i$ has $2^{L - \ell_i}$ descendants at depth $L$.
    2. Because the code is prefix-free, these descendant sets are disjoint.
    3. So $\sum_i2^{L-\ell_i}\leq2^L$. Divide by $2^L$.

    **(⇐)** Sort the lengths $\ell_1\leq\cdots\leq\ell_n$ and assign codewords greedily: give symbol $i$ the leftmost available node at depth $\ell_i$, then remove its subtree.

    - Before placing symbol $i$, the earlier codewords have removed $\sum_{j<i}2^{-\ell_j} < 1$ of the tree's "mass".
    - All earlier lengths are $\leq\ell_i$, so the removed part consists of whole nodes at depth $\ell_i$.
    - So a free node at depth $\ell_i$ remains.

**Short codewords are a scarce resource.** You can't make everything short: giving one symbol a 1-bit codeword uses up half the budget.

!!! example "Example: spending the budget"
    You have four symbols and a budget of 1. Each codeword of length $\ell$ costs $2^{-\ell}$.

    | Lengths | Cost | Verdict |
    |---|---|---|
    | $(2, 2, 2, 2)$ | $4 \times \frac14 = 1$ | fits exactly: `00, 01, 10, 11` |
    | $(1, 2, 3, 3)$ | $\frac12 + \frac14 + \frac18 + \frac18 = 1$ | fits exactly: `0, 10, 110, 111` |
    | $(1, 2, 3, 4)$ | $\frac12 + \frac14 + \frac18 + \frac1{16} = 0.9375$ | fits, with budget left over (wasteful) |
    | $(1, 1, 2, 2)$ | $\frac12 + \frac12 + \frac14 + \frac14 = 1.5$ | impossible |

    The last row fails for a simple reason: two 1-bit codewords `0` and `1` already use the whole tree, leaving nowhere for anything else.

    A leftover budget (third row) means some codeword could be shortened. Optimal codes use the budget exactly.

## 3. The source coding theorem

!!! theorem "Shannon's source coding theorem (symbol codes)"
    For a source with distribution $p$, every prefix-free code has average length

    $$
    L = \sum_ip_i\ell_i\geq H(p)\quad\text{(in bits)},
    $$

    and there exists a prefix-free code with $L < H(p) + 1$.

!!! proof "Proof"
    **Lower bound.** Let $Z = \sum_j2^{-\ell_j}\leq1$ (Kraft), and define the distribution $q_i = 2^{-\ell_i}/Z$. Then $\ell_i = \log_2\frac{1}{q_i} - \log_2Z$, so

    $$
    L = \sum_ip_i\log_2\frac1{q_i} - \log_2Z = H(p, q) - \log_2Z\geq H(p, q)\geq H(p),
    $$

    using $-\log_2Z\geq0$ and Gibbs' inequality.

    (Why define $q$ this way: any set of lengths that satisfies Kraft secretly *is* a probability distribution, with $q_i \approx 2^{-\ell_i}$. Choosing lengths is the same as choosing a model. The average length is then a cross-entropy, and cross-entropy can't beat $H(p)$.)

    **Achievability (Shannon code).** Choose $\ell_i = \left\lceil\log_2\frac1{p_i}\right\rceil$.

    1. Then $2^{-\ell_i}\leq p_i$, so $\sum2^{-\ell_i}\leq\sum p_i = 1$, and Kraft gives a prefix-free code.
    2. Its average length is

    $$
    \sum p_i\left\lceil\log_2\frac1{p_i}\right\rceil < \sum p_i\left(\log_2\frac1{p_i} + 1\right) = H(p) + 1.
    $$

!!! example "Example: a perfect fit"
    Source $p = (\frac12, \frac14, \frac18, \frac18)$ with the code `0, 10, 110, 111`.

    | Symbol | $p$ | Surprise $\log_2\frac1p$ | Codeword | Length |
    |---|---|---|---|---|
    | A | $\frac12$ | 1 | `0` | 1 |
    | B | $\frac14$ | 2 | `10` | 2 |
    | C | $\frac18$ | 3 | `110` | 3 |
    | D | $\frac18$ | 3 | `111` | 3 |

    Average length: $\ \frac12(1) + \frac14(2) + \frac18(3) + \frac18(3) = 1.75$ bits, exactly $H(p)$.

    Each length equals the surprise, so nothing is wasted. Compare the naive 2-bit code `00, 01, 10, 11`, which spends 2 bits per symbol: 14% more.

!!! example "Example: when rounding hurts"
    A very biased coin, $p = (0.9, 0.1)$, has $H \approx 0.469$ bits. But a symbol code must use *at least 1 bit* per symbol, so $L \geq 1$: more than double the entropy.

    The fix is to encode **blocks** of flips. Pairs like `HH`, `HT`, `TH`, `TT` have probabilities $0.81, 0.09, 0.09, 0.01$, and a good code for those 4 "super-symbols" spends fewer bits per flip:

    | Block size $k$ | Best (Huffman) bits per flip |
    |---|---|
    | 1 | $1.000$ |
    | 2 | $0.645$ |
    | 3 | $0.533$ |
    | 4 | $0.493$ |
    | $\to\infty$ | $\to 0.469 = H$ |

    The rounding overhead is at most 1 bit per *block*, so at most $\frac1k$ bit per flip.

!!! intuition "The ideal code length is the surprise"
    The optimal length for a symbol of probability $p$ is $\log_2\frac1p$, its surprise. Entropy is the average of these ideal lengths.

    - The "+1" comes from rounding up to whole bits.
    - It disappears if you encode long blocks of $k$ symbols together: the overhead becomes $1/k$ bit per symbol.
    - **Arithmetic coding** gets essentially to $H$ for any distribution.

And the coding interpretation of cross-entropy: if you design the code for $q$ (lengths $\log_2\frac1{q_i}$) but the data follow $p$, your average length is

$$
H(p, q) = H(p) + \KL(p\,\|\,q).
$$

**The KL divergence is the number of bits per symbol wasted by using the wrong model.**

!!! example "Example: the price of a wrong model"
    The source is really $p = (\frac12, \frac14, \frac18, \frac18)$, but you assumed all four symbols were equally likely and used the 2-bit code.

    1. Your average length is 2 bits, because every codeword has length 2.
    2. The best possible is $H(p) = 1.75$ bits.
    3. The waste is $0.25$ bits per symbol, and indeed $\KL(p\,\Vert\,\text{uniform}) = \log_2 4 - H(p) = 2 - 1.75 = 0.25$.

    Over a million symbols, the wrong model costs 250,000 extra bits.

## 4. Huffman coding

Shannon codes are within 1 bit of optimal, but not always optimal. **Huffman's algorithm** finds the exact optimum:

1. Repeatedly merge the two least probable symbols into one node, until a single tree remains.
2. Read off the codewords from the root.

<div class="viz" data-viz="huffman"></div>

!!! example "Example: Huffman by hand"
    Five symbols: A $0.35$, B $0.2$, C $0.2$, D $0.15$, E $0.1$.

    Merge the two smallest each time:

    | Step | Merge | Remaining nodes |
    |---|---|---|
    | 1 | E $0.1$ + D $0.15$ → $0.25$ | A $0.35$, B $0.2$, C $0.2$, DE $0.25$ |
    | 2 | B $0.2$ + C $0.2$ → $0.4$ | A $0.35$, BC $0.4$, DE $0.25$ |
    | 3 | DE $0.25$ + A $0.35$ → $0.6$ | BC $0.4$, ADE $0.6$ |
    | 4 | BC $0.4$ + ADE $0.6$ → $1$ | done |

    Now walk back down from the root, writing `0` for one branch and `1` for the other:

    | Symbol | Path | Codeword | Length |
    |---|---|---|---|
    | B | BC → B | `00` | 2 |
    | C | BC → C | `01` | 2 |
    | A | ADE → A | `10` | 2 |
    | D | ADE → DE → D | `110` | 3 |
    | E | ADE → DE → E | `111` | 3 |

    Average length: $\ 0.35(2) + 0.2(2) + 0.2(2) + 0.15(3) + 0.1(3) = 2.25$ bits.

    | Code | Average length |
    |---|---|
    | entropy (the floor) | $2.20$ |
    | Huffman | $2.25$ |
    | Shannon code, lengths $\lceil\log_2\frac1p\rceil = (2, 3, 3, 3, 4)$ | $2.75$ |
    | fixed length (5 symbols need 3 bits) | $3.00$ |

    Huffman is within 0.05 bits of the floor here. The Shannon code is valid but sloppy: rounding up every length wastes half a bit.

??? proof "Why Huffman is optimal (deeper)"
    In an optimal code:

    1. More probable symbols never have longer codewords (otherwise swap them, and the average decreases).
    2. The two longest codewords have the same length (otherwise shorten the longer one).
    3. We may assume the two least probable symbols are siblings at the deepest level (rearrange).

    Merging those two siblings gives an optimal code for the reduced alphabet, whose average length is exactly $p_a + p_b$ less.

    Induction on the alphabet size completes the proof.

## 5. Prediction is compression

Combine the pieces: given any probabilistic model $q$ of a data source, arithmetic coding compresses data to about $\log_2\frac{1}{q(\text{data})}$ bits.

So:

$$
\text{compressed size of a dataset (bits)}\approx\sum_i\log_2\frac{1}{q(x_i\mid x_{<i})} = n\cdot H(p_{\text{data}}, q)\ \text{(in bits)}.
$$

**A model's cross-entropy loss is literally the length of the compressed data.**

!!! example "Example: compressing four tokens"
    A language model reads a sentence one token at a time. Before each token, it predicts a probability for it:

    | Token | Model's probability for it | Bits to encode, $\log_2\frac1q$ |
    |---|---|---|
    | "The" | $0.5$ | $1.00$ |
    | "cat" | $0.25$ | $2.00$ |
    | "sat" | $0.9$ | $0.15$ |
    | "xylophone" | $0.01$ | $6.64$ |
    | | **total** | **$9.80$** |

    - Predictable tokens ("sat" after "The cat") cost almost nothing.
    - A surprising token costs a lot.
    - The average, $9.80 / 4 \approx 2.45$ bits per token, is the model's cross-entropy on this text.

    A model that had expected "xylophone" more would have produced a smaller file. Better prediction and better compression are the same thing.

- Better prediction means smaller files, and vice versa.
- Large language models used with arithmetic coding are among the best general-purpose text compressors that exist.

**Perplexity**, the standard language-model metric, is $2^{H(p, q)}$ (with $H$ in bits), or $e^{H}$ in nats.

It's the effective number of equally likely choices the model is hesitating between at each token. A perplexity of 10 means the model is, on average, as uncertain as if choosing uniformly among 10 tokens.

Why "number of choices": if a model spreads its probability evenly over $k$ tokens and the right one is always among them, each token costs $\log_2 k$ bits, and $2^{\log_2 k} = k$. Perplexity undoes the log to turn bits back into a count.

| Cross-entropy (bits per token) | Perplexity |
|---|---|
| 0 | 1 (always certain and right) |
| 1 | 2 (a coin flip between two options) |
| 3.32 | 10 |
| 10 | 1024 |

For the four-token example above, the perplexity is $2^{2.45} \approx 5.5$.

## 6. Channels, in one paragraph

Shannon's second great theorem concerns sending information over a **noisy channel**.

- Each channel has a **capacity** $C = \max_{p(x)}I(X; Y)$, in bits per use.
- Reliable communication is possible at any rate below $C$, and impossible above it.
- For a binary channel that flips each bit with probability $\varepsilon$, $C = 1 - H_2(\varepsilon)$, where $H_2$ is the binary entropy.

Error-correcting codes that approach this limit are why phones, Wi-Fi and deep-space probes work.

!!! example "Example: the simplest error-correcting code"
    The channel flips each bit with probability $\varepsilon = 0.1$. To protect a bit, send it **three times** and let the receiver take a majority vote: `0` → `000`, `1` → `111`.

    A vote goes wrong only if at least 2 of the 3 copies are flipped:

    $$
    P(\text{error}) = \underbrace{3\varepsilon^2(1 - \varepsilon)}_{\text{exactly 2 flips}} + \underbrace{\varepsilon^3}_{\text{all 3}} = 3(0.01)(0.9) + 0.001 = 0.028.
    $$

    | Scheme | Rate (useful bits per bit sent) | Error rate |
    |---|---|---|
    | send once | $1$ | $10\%$ |
    | repeat 3 times | $\frac13$ | $2.8\%$ |
    | Shannon's limit | up to $C = 1 - H_2(0.1) \approx 0.53$ | as close to $0$ as you like |

    Repetition buys reliability by paying a lot of rate. Shannon's theorem says much cleverer codes exist: they run at more than half the raw rate with errors driven to zero. Modern codes (LDPC, polar codes) come close to that limit.

!!! ml "Where this shows up"
    - **Bits per byte / bits per character** are compression-based metrics for language models.
    - **Perplexity** is reported for every language model.
    - **Tokenization** (BPE) is a compression algorithm: frequent character sequences get their own short tokens.
    - **Minimum description length (MDL)**: the best model is the one that compresses the data (plus the model itself) the most.
        - A formal version of Occam's razor.

## Check yourself

**1.** Do lengths $(1, 2, 2, 3)$ admit a prefix-free code? What about $(1, 2, 3, 3)$?

??? success "Solution"
    | Lengths | Kraft sum | Prefix-free code? |
    |---|---|---|
    | $(1, 2, 2, 3)$ | $\frac12 + \frac14 + \frac14 + \frac18 = 1.125 > 1$ | no |
    | $(1, 2, 3, 3)$ | $\frac12 + \frac14 + \frac18 + \frac18 = 1$ | yes, e.g. `0, 10, 110, 111` |

**2.** A source has probabilities $(0.4, 0.3, 0.2, 0.1)$. Build a Huffman code and compare its average length with the entropy.

??? success "Solution"
    Merges:

    1. $0.1 + 0.2 = 0.3$
    2. $0.3 + 0.3 = 0.6$
    3. $0.4 + 0.6 = 1$

    | Probability | Length |
    |---|---|
    | 0.4 | 1 |
    | 0.3 | 2 |
    | 0.2 | 3 |
    | 0.1 | 3 |

    - $L = 0.4 + 0.6 + 0.6 + 0.3 = 1.9$ bits.
    - $H\approx1.846$ bits.

    Indeed $H\leq L < H + 1$.

**3.** A language model has a cross-entropy of 2.3 nats per token. What's its perplexity? Roughly how many bits per token would it take to compress text with it?

??? success "Solution"
    - Perplexity: $e^{2.3}\approx10$.
    - Bits per token: $2.3/\ln2\approx3.32$.

**4.** You compress English text with a code designed for uniformly random letters (26 letters, about 4.7 bits each). English has roughly 1.3 bits of entropy per letter. How many bits per letter are wasted, and what quantity is this?

??? success "Solution"
    About $4.7 - 1.3 = 3.4$ bits per letter.

    That's $\KL(p_{\text{English}}\,\|\,\text{uniform}) = \log_226 - H$, the cost of using the wrong model.

**5.** Prove that for a dyadic distribution (all $p_i = 2^{-k_i}$), the Shannon code achieves $L = H$ exactly.

??? success "Solution"
    $\ell_i = \lceil\log_2(1/p_i)\rceil = k_i$ exactly, so

    $$
    L = \sum p_ik_i = \sum p_i\log_2\frac1{p_i} = H.
    $$
