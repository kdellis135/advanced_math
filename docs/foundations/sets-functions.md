# Sets, functions and notation

<div class="lesson-meta" markdown>
**Phase 1 · Lesson 2** · ⏱ ~2.5 hours · Needs: [Logic and proofs](logic-and-proofs.md)
</div>

Sets and functions are the nouns and verbs of mathematics. You already know them informally. This lesson makes them precise and introduces the notation (especially $\sum$) that every ML paper uses on page one.

## 1. Sets

A **set** is an unordered collection of distinct objects, its **elements**. $x \in A$ means "$x$ is an element of $A$"; $x \notin A$ means it isn't.

Ways to describe a set:

- **List:** $A = \{1, 2, 3\}$. Order and repetition don't matter: $\{1,2,3\} = \{3,1,2,2\}$.
- **Set-builder:** $\{x \in \R : x^2 < 4\}$, read "the set of real $x$ such that $x^2 < 4$", which is the interval $(-2, 2)$.

The standard number sets:

| Symbol | Name | Contents |
|---|---|---|
| $\N$ | natural numbers | $\{0, 1, 2, \dots\}$ (some authors start at $1$) |
| $\Z$ | integers | $\{\dots, -2, -1, 0, 1, 2, \dots\}$ |
| $\Q$ | rationals | fractions $p/q$ with $p, q \in \Z$, $q \neq 0$ |
| $\R$ | reals | all points on the number line |
| $\C$ | complex numbers | $a + bi$ with $a, b \in \R$ ([lesson 4](complex-numbers.md)) |

$\N \subset \Z \subset \Q \subset \R \subset \C$, and we proved in the last lesson that $\sqrt2 \in \R \setminus \Q$.

**Intervals:** $[a, b] = \{x : a \leq x \leq b\}$ (closed), $(a, b) = \{x : a < x < b\}$ (open), and the half-open $[a, b)$ and $(a, b]$.

### Operations on sets

!!! definition "Definition: set operations"
    For sets $A, B$ inside some universe $U$:

    - **Subset:** $A \subseteq B$ means every element of $A$ is in $B$: $\forall x\,(x \in A \Rightarrow x \in B)$.
    - **Union:** $A \cup B = \{x : x \in A \lor x \in B\}$.
    - **Intersection:** $A \cap B = \{x : x \in A \land x \in B\}$.
    - **Difference:** $A \setminus B = \{x : x \in A \land x \notin B\}$.
    - **Complement:** $A^c = U \setminus A$.
    - **Empty set:** $\varnothing$, the set with no elements. It is a subset of every set.
    - **Cartesian product:** $A \times B = \{(a, b) : a \in A, b \in B\}$, the set of ordered pairs. $\R^2 = \R \times \R$ is the plane; $\R^n$ is the set of $n$-tuples of reals.

!!! theorem "Theorem: De Morgan's laws for sets"
    $(A \cup B)^c = A^c \cap B^c \quad$ and $\quad (A \cap B)^c = A^c \cup B^c$.

!!! proof "Proof"
    We show two sets are equal by showing they have the same elements:
    $x \in (A \cup B)^c \iff \neg(x \in A \lor x \in B) \iff (x \notin A) \land (x \notin B) \iff x \in A^c \cap B^c$.
    The middle step is De Morgan's law for logic. The second identity is proved the same way.

Notice the pattern: **set operations are logic in disguise.** $\cup$ is "or", $\cap$ is "and", complement is "not". This is exactly the language of probability: events are sets, and $P(A \cup B)$ is the probability of "$A$ or $B$."

**Size:** $|A|$ is the number of elements of a finite set. $|A \times B| = |A|\cdot|B|$, and the **power set** $\mathcal P(A)$ (the set of all subsets of $A$) has $2^{|A|}$ elements, since each element is either in or out of a subset: two choices, $|A|$ times.

## 2. Functions

!!! definition "Definition: function"
    A **function** $f : A \to B$ assigns to *every* element $a$ of the **domain** $A$ *exactly one* element $f(a)$ of the **codomain** $B$.
    The **image** (or range) is the set of values actually hit: $f(A) = \{f(a) : a \in A\} \subseteq B$.

The two key requirements: *every* input gets an output, and each input gets *only one*. A circle $x^2 + y^2 = 1$ is not the graph of a function $y = f(x)$, because $x = 0$ would need two outputs, $y = \pm 1$.

### Injective, surjective, bijective

!!! definition "Definition"
    A function $f : A \to B$ is

    - **injective** (one-to-one) if different inputs give different outputs: $f(a_1) = f(a_2) \Rightarrow a_1 = a_2$;
    - **surjective** (onto) if every element of $B$ is hit: $\forall b \in B\ \exists a \in A : f(a) = b$;
    - **bijective** if it is both. Then it pairs up $A$ and $B$ perfectly.

Examples with $f : \R \to \R$:

- $f(x) = 2x + 1$ is bijective.
- $f(x) = x^2$ is neither: $f(-1) = f(1)$ (not injective), and $-1$ is never hit (not surjective).
- $f(x) = e^x$ is injective but not surjective onto $\R$ (it never hits $0$ or negatives). It *is* a bijection $\R \to (0, \infty)$, and that's why $\ln$ exists.

So whether a function is injective or surjective depends on the domain and codomain, not just the formula. $x^2$ is a bijection from $[0, \infty)$ to $[0, \infty)$.

### Composition and inverses

The **composition** $g \circ f$ means "do $f$, then $g$": $(g \circ f)(x) = g(f(x))$. Composition is associative, $h \circ (g \circ f) = (h \circ g) \circ f$, but usually not commutative: with $f(x) = x + 1$ and $g(x) = x^2$, $g(f(x)) = (x+1)^2$ while $f(g(x)) = x^2 + 1$.

!!! intuition "Deep networks are compositions"
    A neural network is $f = f_L \circ f_{L-1} \circ \cdots \circ f_1$: each layer is a function applied to the previous layer's output. Differentiating a composition is the chain rule, and the chain rule applied to this composition is backpropagation.

!!! definition "Definition: inverse function"
    $g : B \to A$ is an **inverse** of $f : A \to B$ if $g(f(a)) = a$ for all $a \in A$ and $f(g(b)) = b$ for all $b \in B$. We write $g = f^{-1}$.

!!! theorem "Theorem"
    $f$ has an inverse if and only if $f$ is bijective.

!!! proof "Proof"
    ($\Rightarrow$) Suppose $g$ is an inverse. *Injective:* if $f(a_1) = f(a_2)$, apply $g$: $a_1 = g(f(a_1)) = g(f(a_2)) = a_2$. *Surjective:* any $b \in B$ equals $f(g(b))$, so it is hit by $a = g(b)$.

    ($\Leftarrow$) Suppose $f$ is bijective. For each $b \in B$, surjectivity gives at least one $a$ with $f(a) = b$, and injectivity says there's only one. Define $g(b)$ to be that $a$. Then $f(g(b)) = b$ by construction, and $g(f(a)) = a$ because $a$ is the unique preimage of $f(a)$.

## 3. Summation and product notation

$$
\sum_{i=1}^{n} a_i = a_1 + a_2 + \cdots + a_n, \qquad \prod_{i=1}^{n} a_i = a_1 \cdot a_2 \cdots a_n.
$$

The index $i$ is a **dummy variable**: $\sum_{i=1}^n a_i = \sum_{k=1}^n a_k$. Read $\sum_{i=1}^n$ as a `for` loop: `total = 0; for i in 1..n: total += a[i]`.

### The rules (each is just rearranging a finite sum)

1. **Linearity:** $\displaystyle\sum_i (c\,a_i + b_i) = c\sum_i a_i + \sum_i b_i$.
2. **Constants:** $\displaystyle\sum_{i=1}^n c = nc$.
3. **Splitting:** $\displaystyle\sum_{i=1}^{n} a_i = \sum_{i=1}^{m} a_i + \sum_{i=m+1}^{n} a_i$.
4. **Swapping double sums:** $\displaystyle\sum_{i=1}^m \sum_{j=1}^n a_{ij} = \sum_{j=1}^n \sum_{i=1}^m a_{ij}$. (Add up a table row by row or column by column: same total.)
5. **Products of sums:** $\displaystyle\Big(\sum_i a_i\Big)\Big(\sum_j b_j\Big) = \sum_i\sum_j a_i b_j$. Use *different* index names!
6. **Telescoping:** $\displaystyle\sum_{i=1}^n (a_{i+1} - a_i) = a_{n+1} - a_1$.

!!! warning "Common traps"
    - $\sum_i a_i b_i \neq \left(\sum_i a_i\right)\left(\sum_i b_i\right)$ in general.
    - $\left(\sum_i a_i\right)^2 = \sum_i \sum_j a_i a_j$, which includes cross terms $a_i a_j$ with $i \neq j$. It is not $\sum_i a_i^2$.

!!! example "Example: telescoping"
    $\displaystyle\sum_{i=1}^n \frac{1}{i(i+1)} = \sum_{i=1}^n \left(\frac1i - \frac{1}{i+1}\right) = 1 - \frac{1}{n+1}.$
    (Partial fractions: $\frac{1}{i(i+1)} = \frac1i - \frac1{i+1}$, then everything cancels in pairs.)

!!! example "Example: Gauss's trick, again"
    $S = \sum_{i=1}^n i$. Write the sum forwards and backwards and add:
    $2S = \sum_{i=1}^n \big(i + (n + 1 - i)\big) = \sum_{i=1}^n (n+1) = n(n+1)$. So $S = \frac{n(n+1)}{2}$.

### Logs turn products into sums

Since $\log(ab) = \log a + \log b$ (proved in [the next lesson](exp-log-trig.md)):

$$
\log \prod_{i=1}^n a_i = \sum_{i=1}^n \log a_i.
$$

This one identity is why ML works with **log-likelihoods**. The likelihood of $n$ independent data points is a product of $n$ probabilities, which is numerically tiny and awkward to differentiate. Its log is a sum, which is easy to handle.

## 4. Notation you'll meet in ML papers

| Notation | Meaning |
|---|---|
| $x \in \R^d$ | $x$ is a vector of $d$ real numbers |
| $x_i$ or $x^{(i)}$ | the $i$-th coordinate, or the $i$-th data point (context decides!) |
| $\{(x_i, y_i)\}_{i=1}^n$ | a dataset of $n$ input–label pairs |
| $f : \R^d \to \R$ | a function from vectors to numbers (e.g. a loss) |
| $f_\theta$ | a function with parameters $\theta$ (e.g. a network's weights) |
| $\argmin_\theta L(\theta)$ | the $\theta$ that minimizes $L$ (not the minimum value itself) |
| $:=$ | "is defined as" |
| $\mathbb 1[\text{condition}]$ | indicator: $1$ if true, $0$ if false |

!!! ml "Where this shows up"
    The **empirical risk** that every supervised model minimizes:

    $$
    \hat\theta = \argmin_\theta \ \frac1n \sum_{i=1}^n \ell\big(f_\theta(x_i), y_i\big).
    $$

    You can now read every symbol: the dataset has $n$ pairs; $f_\theta$ is the model; $\ell$ measures the error on one example; we average the errors and pick the parameters that make the average smallest.

## Check yourself

**1.** Let $A = \{1,2,3,4\}$, $B = \{3,4,5\}$. Compute $A \cup B$, $A \cap B$, $A \setminus B$, $|A \times B|$, $|\mathcal P(B)|$.

??? success "Solution"
    $A \cup B = \{1,2,3,4,5\}$, $A \cap B = \{3,4\}$, $A \setminus B = \{1,2\}$, $|A\times B| = 4 \cdot 3 = 12$, $|\mathcal P(B)| = 2^3 = 8$.

**2.** Prove: $A \cap (B \cup C) = (A \cap B) \cup (A \cap C)$.

??? success "Solution"
    $x \in A \cap (B \cup C) \iff x \in A \land (x \in B \lor x \in C) \iff (x \in A \land x \in B) \lor (x \in A \land x \in C) \iff x \in (A\cap B) \cup (A \cap C)$. The middle step is the distributive law of "and" over "or", which you can check with a truth table.

**3.** Is $f : \R \to \R$, $f(x) = x^3 - x$ injective? Surjective?

??? success "Solution"
    Not injective: $f(0) = f(1) = f(-1) = 0$. Surjective: yes. $f$ is continuous and $f(x) \to \pm\infty$ as $x \to \pm\infty$, so by the intermediate value theorem ([Limits](../calculus/limits.md)) it hits every real value.

**4.** Prove that if $f : A \to B$ and $g : B \to C$ are both injective, so is $g \circ f$.

??? success "Solution"
    Suppose $g(f(a_1)) = g(f(a_2))$. Since $g$ is injective, $f(a_1) = f(a_2)$. Since $f$ is injective, $a_1 = a_2$.

**5.** Compute $\displaystyle\sum_{i=1}^{n}\sum_{j=1}^{n} (i + j)$.

??? success "Solution"
    By linearity, $\sum_i\sum_j i + \sum_i\sum_j j = n\sum_i i + n \sum_j j = 2n \cdot \frac{n(n+1)}{2} = n^2(n+1)$.

**6.** Show that $\left(\sum_{i=1}^n a_i\right)^2 = \sum_{i=1}^n a_i^2 + 2\sum_{i<j} a_i a_j$.

??? success "Solution"
    $\left(\sum_i a_i\right)^2 = \sum_i\sum_j a_i a_j$. Split the pairs $(i, j)$ into $i = j$ (giving $\sum_i a_i^2$), $i < j$, and $i > j$. The last two groups have the same sum by symmetry ($a_i a_j = a_j a_i$), giving $2\sum_{i<j} a_i a_j$.
