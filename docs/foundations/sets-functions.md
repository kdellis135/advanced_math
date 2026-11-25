---
description: "Sets, functions, injections and bijections, and summation notation, made precise, plus the notation you will meet on page one of every machine learning paper."
---

# Sets, functions and notation

<div class="lesson-meta" markdown>
**Phase 1 · Lesson 2** · ⏱ ~2.5 hours · Needs: [Logic and proofs](logic-and-proofs.md)
</div>

Sets and functions are the nouns and verbs of mathematics. You already know them informally.

This lesson makes them precise, and introduces the notation (especially $\sum$) that every ML paper uses on page one.

## 1. Sets

A **set** is an unordered collection of distinct objects, its **elements**.

- $x \in A$ means "$x$ is an element of $A$".
- $x \notin A$ means it isn't.

Ways to describe a set:

- **List:** $A = \{1, 2, 3\}$. Order and repetition don't matter: $\{1,2,3\} = \{3,1,2,2\}$.
- **Set-builder:** $\{x \in \R : x^2 < 4\}$, read "the set of real $x$ such that $x^2 < 4$", which is the interval $(-2, 2)$.

Set-builder notation has three parts: $\{\ \underbrace{x \in \R}_{\text{where } x \text{ comes from}} \ : \ \underbrace{x^2 < 4}_{\text{the condition}}\ \}$. The colon is read "such that" (some books write a bar $\mid$ instead).

More examples, so the notation becomes automatic:

| Set-builder | In words | Listed |
|---|---|---|
| $\{n \in \Z : 0 < n < 5\}$ | integers strictly between 0 and 5 | $\{1, 2, 3, 4\}$ |
| $\{2k : k \in \Z\}$ | all doubles of integers | the even numbers $\{\dots, -2, 0, 2, 4, \dots\}$ |
| $\{n \in \N : n \text{ is prime},\ n < 12\}$ | primes below 12 | $\{2, 3, 5, 7, 11\}$ |
| $\{x \in \R : x^2 = -1\}$ | real numbers squaring to $-1$ | $\varnothing$ (no elements) |

The second row shows a variant: $\{2k : k \in \Z\}$ means "everything of the form $2k$, as $k$ runs over the integers."

A set can contain other sets, or pairs, or functions. $\{\{1, 2\}, \{3\}\}$ has **two** elements, each of which is a set.

The standard number sets:

| Symbol | Name | Contents |
|---|---|---|
| $\N$ | natural numbers | $\{0, 1, 2, \dots\}$ (some authors start at $1$) |
| $\Z$ | integers | $\{\dots, -2, -1, 0, 1, 2, \dots\}$ |
| $\Q$ | rationals | fractions $p/q$ with $p, q \in \Z$, $q \neq 0$ |
| $\R$ | reals | all points on the number line |
| $\C$ | complex numbers | $a + bi$ with $a, b \in \R$ ([lesson 4](complex-numbers.md)) |

$\N \subset \Z \subset \Q \subset \R \subset \C$, and we proved in the last lesson that $\sqrt2 \in \R \setminus \Q$.

**Intervals:**

| Notation | Set | Name |
|---|---|---|
| $[a, b]$ | $\{x : a \leq x \leq b\}$ | closed |
| $(a, b)$ | $\{x : a < x < b\}$ | open |
| $[a, b)$, $(a, b]$ | one endpoint included | half-open |
| $[a, \infty)$ | $\{x : x \geq a\}$ | unbounded |
| $(-\infty, b)$ | $\{x : x < b\}$ | unbounded |

A square bracket means "endpoint included," a round one means "excluded." The side with $\infty$ always gets a round bracket, because $\infty$ is not a real number and can't be included. So $\R = (-\infty, \infty)$.

Example: $[0, 1)$ contains $0$, $0.5$ and $0.999$, but not $1$.

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

The **universe** $U$ is just "everything we're currently talking about," for example all real numbers, or all outcomes of a die roll. The complement only makes sense once $U$ is fixed.

$A \subset B$ (or $A \subsetneq B$) means a **proper** subset: $A \subseteq B$ and $A \neq B$. Every set is a subset of itself, but not a proper one.

!!! example "Example: every operation on one pair of sets"
    Take the universe $U = \{1, 2, \dots, 8\}$, with $A = \{1, 2, 3, 4\}$ and $B = \{3, 4, 5, 6\}$.

    | Operation | Rule | Result |
    |---|---|---|
    | $A \cup B$ | in $A$ or in $B$ (or both) | $\{1, 2, 3, 4, 5, 6\}$ |
    | $A \cap B$ | in both | $\{3, 4\}$ |
    | $A \setminus B$ | in $A$ but not in $B$ | $\{1, 2\}$ |
    | $B \setminus A$ | in $B$ but not in $A$ | $\{5, 6\}$ |
    | $A^c$ | in $U$ but not in $A$ | $\{5, 6, 7, 8\}$ |
    | $(A \cup B)^c$ | in neither | $\{7, 8\}$ |

    Notice $A \setminus B \neq B \setminus A$: difference is not symmetric.

    Picture it as a Venn diagram: two overlapping circles. $\{3, 4\}$ sits in the overlap, $\{1, 2\}$ only in $A$'s circle, $\{5, 6\}$ only in $B$'s, and $\{7, 8\}$ outside both.

!!! example "Example: a Cartesian product, listed"
    With $A = \{1, 2\}$ and $B = \{x, y, z\}$:

    $$
    A \times B = \{(1, x), (1, y), (1, z), (2, x), (2, y), (2, z)\}.
    $$

    That's $2 \times 3 = 6$ pairs. Order inside a pair matters: $(1, x)$ is in $A \times B$, while $(x, 1)$ is in $B \times A$.

### Proving two sets are equal: element chasing

The standard method to prove $A = B$ is to show **every element of $A$ is in $B$, and every element of $B$ is in $A$**.

You do this by "chasing" an arbitrary element:

1. "Let $x \in A$." Use the definition of $A$ to say what that means.
2. Show $x \in B$. That proves $A \subseteq B$.
3. Repeat in the other direction for $B \subseteq A$.

When every step is reversible (an "iff"), you can do both directions at once with a chain of $\iff$, as in the next proof.

!!! example "Example: a two-direction proof"
    **Claim.** $A \setminus B = A \cap B^c$.

    **($\subseteq$)** Let $x \in A \setminus B$. Then $x \in A$ and $x \notin B$. "$x \notin B$" means $x \in B^c$. So $x \in A$ and $x \in B^c$, i.e. $x \in A \cap B^c$.

    **($\supseteq$)** Let $x \in A \cap B^c$. Then $x \in A$ and $x \in B^c$, i.e. $x \notin B$. So $x \in A \setminus B$.

    Both inclusions hold, so the sets are equal. $\blacksquare$

!!! theorem "Theorem: De Morgan's laws for sets"
    $(A \cup B)^c = A^c \cap B^c \quad$ and $\quad (A \cap B)^c = A^c \cup B^c$.

!!! proof "Proof"
    We show two sets are equal by showing they have the same elements:

    $$
    x \in (A \cup B)^c \iff \neg(x \in A \lor x \in B) \iff (x \notin A) \land (x \notin B) \iff x \in A^c \cap B^c.
    $$

    Each $\iff$ is justified as follows:

    1. "$x$ is in the complement of $A \cup B$" means "it is not the case that $x \in A \cup B$," and $x \in A \cup B$ means "$x \in A$ or $x \in B$."
    2. De Morgan's law for logic: "not ($P$ or $Q$)" is "(not $P$) and (not $Q$)."
    3. "$x \notin A$" means $x \in A^c$, and likewise for $B$; "and" becomes $\cap$.

    The second identity is proved the same way.

    Check it on the example above: $(A \cup B)^c = \{7, 8\}$, and $A^c \cap B^c = \{5,6,7,8\} \cap \{1,2,7,8\} = \{7, 8\}$. ✓

Notice the pattern: **set operations are logic in disguise.**

| Set | Logic |
|---|---|
| $\cup$ | or |
| $\cap$ | and |
| complement | not |

This is exactly the language of probability: events are sets, and $P(A \cup B)$ is the probability of "$A$ or $B$."

**Size:** $|A|$ is the number of elements of a finite set.

- $|A \times B| = |A|\cdot|B|$.
- The **power set** $\mathcal P(A)$, the set of all subsets of $A$, has $2^{|A|}$ elements. Each element is either in or out of a subset: two choices, $|A|$ times.

!!! example "Example: the power set of $\{a, b, c\}$"
    Go through each element and decide "in" or "out." The 8 possibilities:

    | $a$? | $b$? | $c$? | Subset |
    |:-:|:-:|:-:|---|
    | out | out | out | $\varnothing$ |
    | in | out | out | $\{a\}$ |
    | out | in | out | $\{b\}$ |
    | out | out | in | $\{c\}$ |
    | in | in | out | $\{a, b\}$ |
    | in | out | in | $\{a, c\}$ |
    | out | in | in | $\{b, c\}$ |
    | in | in | in | $\{a, b, c\}$ |

    So $\lvert\mathcal P(\{a, b, c\})\rvert = 2^3 = 8$. Note that $\varnothing$ and the whole set both count as subsets.

    (If you read "in" as 1 and "out" as 0, the rows are the binary numbers 000 to 111. This is the link between subsets and bit strings used all over computer science.)

## 2. Functions

!!! definition "Definition: function"
    A **function** $f : A \to B$ assigns to *every* element $a$ of the **domain** $A$ *exactly one* element $f(a)$ of the **codomain** $B$.
    The **image** (or range) is the set of values actually hit: $f(A) = \{f(a) : a \in A\} \subseteq B$.

The two key requirements:

1. *Every* input gets an output.
2. Each input gets *only one*.

A circle $x^2 + y^2 = 1$ is not the graph of a function $y = f(x)$, because $x = 0$ would need two outputs, $y = \pm 1$.

Think of a function as a machine: you feed it an input from $A$, and it hands back one output in $B$. The notation $f : A \to B$ is read "$f$ goes from $A$ to $B$."

!!! example "Example: function or not?"
    Each rule below tries to be a function from $A = \{1, 2, 3\}$ to $B = \{x, y, z\}$:

    | Rule | Function? | Reason |
    |---|---|---|
    | $1 \mapsto x,\ 2 \mapsto y,\ 3 \mapsto x$ | yes | every input has exactly one output (sharing outputs is fine) |
    | $1 \mapsto x,\ 2 \mapsto y$ | no | input $3$ has no output |
    | $1 \mapsto x,\ 1 \mapsto y,\ 2 \mapsto z,\ 3 \mapsto z$ | no | input $1$ has two outputs |

    The arrow $\mapsto$ ("maps to") says where one particular input goes. For the first rule the image is $\{x, y\}$, smaller than the codomain $\{x, y, z\}$.

**Codomain vs image.** The codomain is the set you *declare* outputs live in. The image is what actually comes out.

For $f : \R \to \R$, $f(x) = x^2$: the codomain is $\R$, but the image is only $[0, \infty)$.

The **preimage** of a set $S \subseteq B$ goes the other way: $f^{-1}(S) = \{a \in A : f(a) \in S\}$, all inputs that land in $S$. For $f(x) = x^2$, the preimage of $\{4\}$ is $\{-2, 2\}$. (This notation makes sense even when $f$ has no inverse.)

The **graph** of $f$ is the set of pairs $\{(a, f(a)) : a \in A\} \subseteq A \times B$. For real functions, that's the curve you draw. The rule "each input gets one output" becomes the **vertical line test**: every vertical line meets the graph at most once (exactly once, over the domain).

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

So whether a function is injective or surjective depends on the domain and codomain, not just the formula.

For example, $x^2$ *is* a bijection from $[0, \infty)$ to $[0, \infty)$.

!!! intuition "Pictures for each property"
    Draw $A$ on the left, $B$ on the right, and an arrow from each input to its output.

    | Property | Arrow picture | Graph test (real functions) |
    |---|---|---|
    | injective | no two arrows land on the same point | every *horizontal* line hits the graph at most once |
    | surjective | every point of $B$ receives at least one arrow | every horizontal line at a height in $B$ hits the graph at least once |
    | bijective | every point of $B$ receives exactly one arrow | every such horizontal line hits exactly once |

    For finite sets this gives a counting fact: an injection $A \to B$ needs $\lvert A\rvert \leq \lvert B\rvert$, a surjection needs $\lvert A\rvert \geq \lvert B\rvert$, and a bijection needs $\lvert A\rvert = \lvert B\rvert$.

### How to prove a function is injective or surjective

The definitions tell you exactly what to write.

- **Injective:** "Suppose $f(a_1) = f(a_2)$." Do algebra until you reach $a_1 = a_2$.
- **Surjective:** "Let $b \in B$ be arbitrary." Solve $f(a) = b$ for $a$, then check that this $a$ really lies in $A$.
- **Not injective:** find two different inputs with the same output.
- **Not surjective:** find one $b \in B$ that is never hit, and explain why.

!!! example "Example: $f(x) = 2x + 1$ from $\R$ to $\R$ is a bijection"
    **Injective.** Suppose $f(a_1) = f(a_2)$:

    1. $2a_1 + 1 = 2a_2 + 1$.
    2. Subtract 1: $\ 2a_1 = 2a_2$.
    3. Divide by 2: $\ a_1 = a_2$. ✓

    **Surjective.** Let $b \in \R$. We want $a$ with $2a + 1 = b$.

    1. Solve: $a = \frac{b - 1}{2}$.
    2. Check it's in the domain: $\frac{b-1}{2}$ is a real number. ✓
    3. Check it works: $f\!\left(\frac{b-1}{2}\right) = 2 \cdot \frac{b-1}{2} + 1 = b$. ✓

!!! example "Example: the same formula, different sets"
    Consider $g(n) = 2n + 1$ as a function $\Z \to \Z$.

    - It's still injective (same algebra).
    - It's **not** surjective: to hit $b = 2$ we'd need $n = \frac{1}{2}$, which isn't an integer. In fact $g$ only hits odd numbers.

    The "check it's in the domain" step is exactly what fails here.

### Composition and inverses

The **composition** $g \circ f$ means "do $f$, then $g$": $(g \circ f)(x) = g(f(x))$.

- Composition is **associative**: $h \circ (g \circ f) = (h \circ g) \circ f$.
- It is usually **not commutative**. With $f(x) = x + 1$ and $g(x) = x^2$: $g(f(x)) = (x+1)^2$, while $f(g(x)) = x^2 + 1$.

Read $g \circ f$ from **right to left**: the function nearest the input acts first. Plugging in $x = 3$ with the functions above:

| Composition | Step 1 | Step 2 | Result |
|---|---|---|---|
| $(g \circ f)(3)$ | $f(3) = 4$ | $g(4) = 16$ | $16$ |
| $(f \circ g)(3)$ | $g(3) = 9$ | $f(9) = 10$ | $10$ |

For $g \circ f$ to make sense, the outputs of $f$ must be valid inputs of $g$: if $f : A \to B$, then $g$ must be defined on $B$.

!!! intuition "Deep networks are compositions"
    A neural network is $f = f_L \circ f_{L-1} \circ \cdots \circ f_1$: each layer is a function applied to the previous layer's output.

    Differentiating a composition is the chain rule. The chain rule applied to this composition is backpropagation.

!!! definition "Definition: inverse function"
    $g : B \to A$ is an **inverse** of $f : A \to B$ if $g(f(a)) = a$ for all $a \in A$ and $f(g(b)) = b$ for all $b \in B$. We write $g = f^{-1}$.

!!! theorem "Theorem"
    $f$ has an inverse if and only if $f$ is bijective.

!!! proof "Proof"
    **($\Rightarrow$)** Suppose $g$ is an inverse.

    - *Injective:* if $f(a_1) = f(a_2)$, apply $g$: $a_1 = g(f(a_1)) = g(f(a_2)) = a_2$.
    - *Surjective:* any $b \in B$ equals $f(g(b))$, so it is hit by $a = g(b)$.

    **($\Leftarrow$)** Suppose $f$ is bijective. For each $b \in B$, surjectivity gives at least one $a$ with $f(a) = b$, and injectivity says there's only one. Define $g(b)$ to be that $a$.

    - $f(g(b)) = b$ by construction.
    - $g(f(a)) = a$ because $a$ is the unique preimage of $f(a)$.

In words: $f^{-1}$ "undoes" $f$. If $f$ sends $a$ to $b$, then $f^{-1}$ sends $b$ back to $a$.

!!! warning "$f^{-1}(x)$ is not $1/f(x)$"
    The $-1$ here means "inverse function," not "reciprocal." For $f(x) = 2x + 1$, $\ f^{-1}(x) = \frac{x-1}{2}$, while $\frac{1}{f(x)} = \frac{1}{2x+1}$. Completely different.

### Computing an inverse

Recipe:

1. Write $y = f(x)$.
2. Solve for $x$ in terms of $y$.
3. That expression is $f^{-1}(y)$. (Rename $y$ to $x$ if you like.)

!!! example "Example: invert $f(x) = \dfrac{x}{x + 1}$, from $(-1, \infty)$ to $(-\infty, 1)$"
    1. $y = \dfrac{x}{x+1}$.
    2. Multiply by $x + 1$: $\ y(x + 1) = x$, so $yx + y = x$.
    3. Collect the $x$ terms on one side: $\ y = x - yx = x(1 - y)$.
    4. Divide by $1 - y$ (allowed, since $y < 1$): $\ x = \dfrac{y}{1 - y}$.

    So $f^{-1}(y) = \dfrac{y}{1 - y}$.

    **Check** with a number: $f(1) = \frac{1}{2}$, and $f^{-1}\!\left(\frac12\right) = \frac{1/2}{1/2} = 1$. ✓

**Graph picture.** Swapping the roles of input and output reflects the graph across the diagonal line $y = x$. So the graph of $f^{-1}$ is the mirror image of the graph of $f$. You'll see this with $e^x$ and $\ln x$ in the next lesson.

## 3. Summation and product notation

$$
\sum_{i=1}^{n} a_i = a_1 + a_2 + \cdots + a_n, \qquad \prod_{i=1}^{n} a_i = a_1 \cdot a_2 \cdots a_n.
$$

Each piece of $\displaystyle\sum_{i=1}^{n} a_i$ has a job:

| Piece | Name | Job |
|---|---|---|
| $\sum$ | capital sigma ("S" for sum) | add things up |
| $i = 1$ (below) | index and starting value | $i$ starts at 1 |
| $n$ (above) | upper limit | $i$ stops at $n$ (included) |
| $a_i$ | the term | what to add, for each $i$ |

The index $i$ is a **dummy variable**: $\sum_{i=1}^n a_i = \sum_{k=1}^n a_k$. Its name doesn't matter, just like the loop variable in code.

Read $\sum_{i=1}^n$ as a `for` loop:

```python
total = 0
for i in range(1, n + 1):
    total += a[i]
```

### Expanding sums by hand

When a sum looks scary, **write out the first few terms**. Here are some, fully expanded:

| Sum | Expanded | Value |
|---|---|---|
| $\displaystyle\sum_{i=1}^{4} i^2$ | $1 + 4 + 9 + 16$ | $30$ |
| $\displaystyle\sum_{k=0}^{3} 2^k$ | $1 + 2 + 4 + 8$ | $15$ |
| $\displaystyle\sum_{i=2}^{5} (2i - 1)$ | $3 + 5 + 7 + 9$ | $24$ |
| $\displaystyle\sum_{j=1}^{3} 5$ | $5 + 5 + 5$ | $15$ |
| $\displaystyle\prod_{i=1}^{4} i$ | $1 \cdot 2 \cdot 3 \cdot 4$ | $24 = 4!$ |

Things to notice:

- The index can start anywhere (row 2 starts at $0$, row 3 at $2$).
- The number of terms in $\sum_{i=m}^{n}$ is $n - m + 1$. Row 3 has $5 - 2 + 1 = 4$ terms.
- A term that doesn't involve the index (row 4) is just added repeatedly.
- $n! = \prod_{i=1}^n i$ ("$n$ factorial"), and by convention $0! = 1$.

**Shifting the index.** You can rename the index and adjust the limits to match. Substituting $j = i - 1$ (so $i = j + 1$):

$$
\sum_{i=1}^{n} a_{i} = \sum_{j=0}^{n-1} a_{j+1}.
$$

When $i$ runs from $1$ to $n$, $j = i - 1$ runs from $0$ to $n - 1$. Both sides list the same terms $a_1, \dots, a_n$.

### The rules (each is just rearranging a finite sum)

1. **Linearity:** $\displaystyle\sum_i (c\,a_i + b_i) = c\sum_i a_i + \sum_i b_i$.
2. **Constants:** $\displaystyle\sum_{i=1}^n c = nc$.
3. **Splitting:** $\displaystyle\sum_{i=1}^{n} a_i = \sum_{i=1}^{m} a_i + \sum_{i=m+1}^{n} a_i$.
4. **Swapping double sums:** $\displaystyle\sum_{i=1}^m \sum_{j=1}^n a_{ij} = \sum_{j=1}^n \sum_{i=1}^m a_{ij}$. (Add up a table row by row or column by column: same total.)
5. **Products of sums:** $\displaystyle\Big(\sum_i a_i\Big)\Big(\sum_j b_j\Big) = \sum_i\sum_j a_i b_j$. Use *different* index names!
6. **Telescoping:** $\displaystyle\sum_{i=1}^n (a_{i+1} - a_i) = a_{n+1} - a_1$.

Why rule 1 holds: write it out for $n = 2$.

$$
(c\,a_1 + b_1) + (c\,a_2 + b_2) = c(a_1 + a_2) + (b_1 + b_2).
$$

That's just regrouping and factoring out $c$. The same regrouping works for any $n$.

!!! example "Example: using the rules together"
    Compute $\displaystyle\sum_{i=1}^{n} (3i + 2)$.

    1. Linearity splits it: $\ 3\sum_{i=1}^n i + \sum_{i=1}^n 2$.
    2. The first sum is $\frac{n(n+1)}{2}$ (proved in the last lesson). The second is $2n$ (rule 2).
    3. Total: $\ \frac{3n(n+1)}{2} + 2n$.

    Check with $n = 3$: directly, $5 + 8 + 11 = 24$. Formula: $\frac{3 \cdot 3 \cdot 4}{2} + 6 = 18 + 6 = 24$. ✓

!!! example "Example: a double sum as a table"
    $\displaystyle\sum_{i=1}^{2}\sum_{j=1}^{3} ij$ adds every entry of the table whose row $i$, column $j$ entry is $ij$:

    | | $j=1$ | $j=2$ | $j=3$ | row sum |
    |---|:-:|:-:|:-:|:-:|
    | $i = 1$ | 1 | 2 | 3 | 6 |
    | $i = 2$ | 2 | 4 | 6 | 12 |
    | column sum | 3 | 6 | 9 | **18** |

    - The inner sum (over $j$) is a row sum; then the outer sum adds the rows: $6 + 12 = 18$.
    - Swapping the order adds the columns first: $3 + 6 + 9 = 18$. Same total (rule 4).
    - Rule 5 predicts the same answer: $(1 + 2)(1 + 2 + 3) = 3 \cdot 6 = 18$.

!!! warning "Common traps"
    - $\sum_i a_i b_i \neq \left(\sum_i a_i\right)\left(\sum_i b_i\right)$ in general.
    - $\left(\sum_i a_i\right)^2 = \sum_i \sum_j a_i a_j$, which includes cross terms $a_i a_j$ with $i \neq j$. It is not $\sum_i a_i^2$.

    A two-term check catches both: with $a = (1, 2)$ and $b = (3, 4)$,

    - $\sum_i a_i b_i = 1\cdot3 + 2\cdot4 = 11$, but $(\sum a_i)(\sum b_i) = 3 \cdot 7 = 21$.
    - $(\sum a_i)^2 = 3^2 = 9$, but $\sum a_i^2 = 1 + 4 = 5$. The gap, $4 = 2 \cdot 1 \cdot 2$, is the cross terms.

!!! example "Example: telescoping"
    $$
    \sum_{i=1}^n \frac{1}{i(i+1)} = \sum_{i=1}^n \left(\frac1i - \frac{1}{i+1}\right) = 1 - \frac{1}{n+1}.
    $$

    **Step 1, split the fraction.** Check that $\frac1i - \frac1{i+1} = \frac{(i+1) - i}{i(i+1)} = \frac{1}{i(i+1)}$. ✓ (This splitting is called *partial fractions*.)

    **Step 2, write out the terms** and watch them cancel:

    $$
    \left(1 - \tfrac12\right) + \left(\tfrac12 - \tfrac13\right) + \left(\tfrac13 - \tfrac14\right) + \cdots + \left(\tfrac1n - \tfrac{1}{n+1}\right).
    $$

    Each $-\frac1k$ is cancelled by the $+\frac1k$ right after it. Only the very first and very last pieces survive: $1 - \frac{1}{n+1}$.

    The name comes from a collapsing telescope: a long sum folds down to two terms.

!!! example "Example: Gauss's trick, again"
    $S = \sum_{i=1}^n i$. Write the sum forwards and backwards and add:

    $$
    2S = \sum_{i=1}^n \big(i + (n + 1 - i)\big) = \sum_{i=1}^n (n+1) = n(n+1).
    $$

    So $S = \frac{n(n+1)}{2}$.

### Logs turn products into sums

Since $\log(ab) = \log a + \log b$ (proved in [the next lesson](exp-log-trig.md)):

$$
\log \prod_{i=1}^n a_i = \sum_{i=1}^n \log a_i.
$$

This one identity is why ML works with **log-likelihoods**:

- The likelihood of $n$ independent data points is a *product* of $n$ probabilities. It is numerically tiny and awkward to differentiate.
- Its log is a *sum*, which is easy to handle.

### Two sums you'll see in every statistics formula

The **mean** (average) of numbers $x_1, \dots, x_n$, and the **variance** (average squared distance from the mean):

$$
\bar x = \frac{1}{n}\sum_{i=1}^n x_i, \qquad \sigma^2 = \frac{1}{n}\sum_{i=1}^n (x_i - \bar x)^2.
$$

!!! example "Example: reading the two formulas with numbers"
    Data: $x = (2, 4, 9)$, so $n = 3$.

    1. Mean: $\bar x = \frac{1}{3}(2 + 4 + 9) = 5$.
    2. Distances from the mean: $2 - 5 = -3$, $\ 4 - 5 = -1$, $\ 9 - 5 = 4$.
    3. Squared: $9, 1, 16$. Their average: $\sigma^2 = \frac{26}{3} \approx 8.67$.

    A useful fact, by linearity: the distances always add to zero.

    $$
    \sum_{i=1}^n (x_i - \bar x) = \sum_i x_i - n \bar x = n\bar x - n\bar x = 0.
    $$

    Check: $-3 - 1 + 4 = 0$. ✓

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

!!! example "Example: min vs argmin, and the indicator"
    Let $L(\theta) = (\theta - 3)^2 + 1$.

    - $\min_\theta L(\theta) = 1$: the **smallest value** the function takes.
    - $\argmin_\theta L(\theta) = 3$: **where** that smallest value happens.

    Training a model is about finding the argmin (the best weights), not the min (the best loss).

    The indicator counts things inside sums. For predictions $\hat y = (1, 0, 1, 1)$ and labels $y = (1, 1, 1, 0)$, the accuracy is

    $$
    \frac{1}{4}\sum_{i=1}^4 \mathbb 1[\hat y_i = y_i] = \frac14(1 + 0 + 1 + 0) = 0.5.
    $$

!!! ml "Where this shows up"
    The **empirical risk** that every supervised model minimizes:

    $$
    \hat\theta = \argmin_\theta \ \frac1n \sum_{i=1}^n \ell\big(f_\theta(x_i), y_i\big).
    $$

    You can now read every symbol:

    - the dataset has $n$ pairs;
    - $f_\theta$ is the model;
    - $\ell$ measures the error on one example;
    - we average the errors, and pick the parameters that make the average smallest.

## Check yourself

**1.** Let $A = \{1,2,3,4\}$, $B = \{3,4,5\}$. Compute $A \cup B$, $A \cap B$, $A \setminus B$, $|A \times B|$, $|\mathcal P(B)|$.

??? success "Solution"
    | Expression | Value |
    |---|---|
    | $A \cup B$ | $\{1,2,3,4,5\}$ |
    | $A \cap B$ | $\{3,4\}$ |
    | $A \setminus B$ | $\{1,2\}$ |
    | $\lvert A\times B\rvert$ | $4 \cdot 3 = 12$ |
    | $\lvert\mathcal P(B)\rvert$ | $2^3 = 8$ |

**2.** Prove: $A \cap (B \cup C) = (A \cap B) \cup (A \cap C)$.

??? success "Solution"
    $$
    \begin{aligned}
    x \in A \cap (B \cup C) &\iff x \in A \land (x \in B \lor x \in C) \\
    &\iff (x \in A \land x \in B) \lor (x \in A \land x \in C) \\
    &\iff x \in (A\cap B) \cup (A \cap C).
    \end{aligned}
    $$

    The middle step is the distributive law of "and" over "or", which you can check with a truth table.

**3.** Is $f : \R \to \R$, $f(x) = x^3 - x$ injective? Surjective?

??? success "Solution"
    - **Not injective:** $f(0) = f(1) = f(-1) = 0$.
    - **Surjective: yes.** $f$ is continuous and $f(x) \to \pm\infty$ as $x \to \pm\infty$, so by the intermediate value theorem ([Limits](../calculus/limits.md)) it hits every real value.

**4.** Prove that if $f : A \to B$ and $g : B \to C$ are both injective, so is $g \circ f$.

??? success "Solution"
    Suppose $g(f(a_1)) = g(f(a_2))$. Since $g$ is injective, $f(a_1) = f(a_2)$. Since $f$ is injective, $a_1 = a_2$.

**5.** Compute $\displaystyle\sum_{i=1}^{n}\sum_{j=1}^{n} (i + j)$.

??? success "Solution"
    By linearity, $\sum_i\sum_j i + \sum_i\sum_j j = n\sum_i i + n \sum_j j = 2n \cdot \frac{n(n+1)}{2} = n^2(n+1)$.

**6.** Show that $\left(\sum_{i=1}^n a_i\right)^2 = \sum_{i=1}^n a_i^2 + 2\sum_{i<j} a_i a_j$.

??? success "Solution"
    $\left(\sum_i a_i\right)^2 = \sum_i\sum_j a_i a_j$. Split the pairs $(i, j)$ into three groups:

    - $i = j$, giving $\sum_i a_i^2$;
    - $i < j$;
    - $i > j$.

    The last two groups have the same sum by symmetry ($a_i a_j = a_j a_i$), giving $2\sum_{i<j} a_i a_j$.
