---
description: "Learn to read and write mathematical proofs: logical connectives, quantifiers, direct proof, contrapositive, contradiction, induction and proving if-and-only-if."
---

# Logic and proofs

<div class="lesson-meta" markdown>
**Phase 1 · Lesson 1** · ⏱ ~3 hours · Needs: high-school algebra
</div>

A proof is an argument that leaves no room for doubt. You need proofs for two reasons:

1. They are how you *know* something, rather than hope it.
2. Every theorem in ML, algorithms and physics comes with one. Reading them is how you understand *when* a result applies.

This lesson gives you the grammar of proofs.

## 1. Statements and connectives

A **statement** (or proposition) is a sentence that is either true or false.

- "7 is prime" is a statement (true).
- "$2 + 2 = 5$" is a statement (false). Being false is fine; it just has to be one or the other.
- "$x > 3$" is not, until we know $x$.
- "Close the door" is not: a command is neither true nor false.

A sentence with a variable in it, like "$x > 3$", is called a **predicate**. We write it $P(x)$.

A predicate becomes a statement as soon as you plug in a value:

| Predicate $P(x)$: "$x > 3$" | Value | Statement | Truth |
|---|---|---|---|
| $P(5)$ | $x = 5$ | "$5 > 3$" | true |
| $P(1)$ | $x = 1$ | "$1 > 3$" | false |

Predicates matter because most theorems are about *every* $x$ or *some* $x$, which is what quantifiers (Section 2) handle.

### Connectives: building bigger statements

We build bigger statements from smaller ones:

| Symbol | Read as | True when |
|---|---|---|
| $\neg P$ | not $P$ | $P$ is false |
| $P \land Q$ | $P$ and $Q$ | both are true |
| $P \lor Q$ | $P$ or $Q$ | at least one is true (inclusive "or") |
| $P \Rightarrow Q$ | if $P$ then $Q$ / $P$ implies $Q$ | it is *not* the case that $P$ is true and $Q$ false |
| $P \Leftrightarrow Q$ | $P$ if and only if $Q$ (iff) | both have the same truth value |

!!! warning "Math 'or' is inclusive"
    In everyday English, "soup or salad" usually means one but not both.

    In math, $P \lor Q$ is true when $P$ is true, when $Q$ is true, **and** when both are true. "$x > 0$ or $x$ is even" is true for $x = 4$.

### Truth tables, built step by step

A **truth table** lists every possible combination of truth values and works out the result for each.

With two basic statements $P$ and $Q$ there are $2 \times 2 = 4$ rows. With three there are $2^3 = 8$.

The trick for complicated statements: **add one column per sub-piece**, working from the inside out.

!!! example "Example: the truth table of $\neg P \lor Q$"
    Build it in two steps. First the inner piece $\neg P$, then combine it with $Q$ using "or":

    | $P$ | $Q$ | $\neg P$ | $\neg P \lor Q$ |
    |:-:|:-:|:-:|:-:|
    | T | T | F | T |
    | T | F | F | **F** |
    | F | T | T | T |
    | F | F | T | T |

    Read each row left to right:

    - Row 2: $P$ is T, so $\neg P$ is F. Both $\neg P$ and $Q$ are F, so the "or" is F.
    - Every other row has at least one T among $\neg P$ and $Q$, so the "or" is T.

    Keep this table in mind. It will match the table for "implies" below exactly.

Two statements are **logically equivalent** if their truth tables have the same final column. They always say the same thing, just in different words.

### Implication is the important one

$P \Rightarrow Q$ is a *promise*: "whenever $P$ holds, $Q$ holds." Its truth table:

| $P$ | $Q$ | $P \Rightarrow Q$ |
|:-:|:-:|:-:|
| T | T | T |
| T | F | **F** |
| F | T | T |
| F | F | T |

!!! intuition "Why is 'false implies anything' true?"
    The promise "If it rains, I'll bring an umbrella" is only *broken* when it rains and I don't bring one. On a sunny day the promise is kept no matter what I do.

    Likewise, "if $x > 5$ then $x > 3$" is true for every $x$, including:

    - $x = 1$, where both parts are false;
    - $x = 4$, where only the conclusion holds.

Compare this table with the one for $\neg P \lor Q$ above. The final columns are identical (T, F, T, T), so

$$
(P \Rightarrow Q) \Leftrightarrow (\neg P \lor Q).
$$

In words: "if $P$ then $Q$" means "either $P$ fails, or $Q$ holds." This rewrite is handy whenever you need to negate an implication.

**In the implication $P \Rightarrow Q$:**

- $P$ is called the **hypothesis** (or assumption, or premise).
- $Q$ is called the **conclusion**.

### The many English phrasings of "implies"

Theorems rarely say "$P \Rightarrow Q$" literally. All of these mean exactly the same thing:

| Phrasing | Example with $P$ = "it's a square", $Q$ = "it's a rectangle" |
|---|---|
| If $P$, then $Q$ | If it's a square, then it's a rectangle. |
| $Q$ if $P$ | It's a rectangle if it's a square. |
| $P$ only if $Q$ | It's a square only if it's a rectangle. |
| $P$ is **sufficient** for $Q$ | Being a square is enough to guarantee a rectangle. |
| $Q$ is **necessary** for $P$ | You can't be a square without being a rectangle. |
| $Q$ whenever $P$ | It's a rectangle whenever it's a square. |

!!! intuition "Necessary vs sufficient"
    - **Sufficient** = "enough on its own." Being a square is sufficient for being a rectangle.
    - **Necessary** = "required, but maybe not enough." Being a rectangle is necessary for being a square, but a $2 \times 5$ rectangle is not a square.

    "$P$ if and only if $Q$" says both at once: $P$ is necessary *and* sufficient for $Q$.

!!! warning "'Only if' trips everyone up"
    "$P$ only if $Q$" means $P \Rightarrow Q$, **not** $Q \Rightarrow P$.

    Test it: "You can vote only if you're a citizen." This says voting requires citizenship (vote $\Rightarrow$ citizen). It does not say every citizen can vote; children can't.

Three relatives of $P \Rightarrow Q$ that you must keep apart:

- **Converse:** $Q \Rightarrow P$. *Not* equivalent. ("If $x > 5$ then $x > 3$" is true; "if $x > 3$ then $x > 5$" is false.)
- **Contrapositive:** $\neg Q \Rightarrow \neg P$. *Always* equivalent to the original.
- **Inverse:** $\neg P \Rightarrow \neg Q$. Equivalent to the converse, not to the original.

!!! theorem "Theorem: an implication is equivalent to its contrapositive"
    $(P \Rightarrow Q) \Leftrightarrow (\neg Q \Rightarrow \neg P)$.

!!! proof "Proof"
    - $P \Rightarrow Q$ is false exactly when $P$ is true and $Q$ is false.
    - $\neg Q \Rightarrow \neg P$ is false exactly when $\neg Q$ is true and $\neg P$ is false, i.e. when $Q$ is false and $P$ is true.

    That's the same situation. So the two are false in the same cases, and hence true in the same cases.

**De Morgan's laws** tell you how to negate "and" and "or":

$$
\neg(P \land Q) \Leftrightarrow (\neg P \lor \neg Q), \qquad \neg(P \lor Q) \Leftrightarrow (\neg P \land \neg Q).
$$

"Not (rich and famous)" means "not rich, or not famous."

!!! example "Example: checking the first De Morgan law with a truth table"
    Build both sides, one column at a time:

    | $P$ | $Q$ | $P \land Q$ | $\neg(P \land Q)$ | $\neg P$ | $\neg Q$ | $\neg P \lor \neg Q$ |
    |:-:|:-:|:-:|:-:|:-:|:-:|:-:|
    | T | T | T | **F** | F | F | **F** |
    | T | F | F | **T** | F | T | **T** |
    | F | T | F | **T** | T | F | **T** |
    | F | F | F | **T** | T | T | **T** |

    The two bold columns match in every row, so the two sides are equivalent.

    Try the second law, $\neg(P \lor Q) \Leftrightarrow (\neg P \land \neg Q)$, yourself the same way.

And the negation of an implication. Start from the rewrite $P \Rightarrow Q \;\equiv\; \neg P \lor Q$ and apply De Morgan:

$$
\neg(P \Rightarrow Q) \;\Leftrightarrow\; \neg(\neg P \lor Q) \;\Leftrightarrow\; \neg\neg P \land \neg Q \;\Leftrightarrow\; P \land \neg Q.
$$

(The step $\neg\neg P \Leftrightarrow P$ is just "not not $P$" is $P$.)

So the negation of an implication is **not** another implication. It is an "and": $P$ happens, and $Q$ doesn't.

To show an implication fails, show a case where $P$ holds but $Q$ doesn't.

!!! example "Example"
    Claim: "If $n$ is prime, then $n$ is odd."

    Its negation is "$n$ is prime **and** $n$ is not odd." The case $n = 2$ is exactly that, so the claim is false.

## 2. Quantifiers

Statements about *all* or *some* objects use quantifiers:

- $\forall x \in S,\ P(x)$: "for every $x$ in $S$, $P(x)$ holds."
- $\exists x \in S,\ P(x)$: "there exists (at least one) $x$ in $S$ with $P(x)$."

Here $S$ is the **domain**: the collection of things $x$ is allowed to be. ($x \in S$ is read "$x$ is in $S$"; sets are covered properly in the [next lesson](sets-functions.md).) Common domains:

| Symbol | Meaning |
|---|---|
| $\mathbb{N}$ | natural numbers $1, 2, 3, \dots$ (some books include $0$) |
| $\mathbb{Z}$ | integers $\dots, -2, -1, 0, 1, 2, \dots$ |
| $\mathbb{Q}$ | rational numbers (fractions $p/q$) |
| $\mathbb{R}$ | real numbers |

### Warm-up: reading quantified statements

| Statement | In words | True? | Why |
|---|---|---|---|
| $\forall x \in \mathbb{R},\ x^2 \geq 0$ | every real number has a non-negative square | true | squares are never negative |
| $\exists x \in \mathbb{R},\ x^2 = 2$ | some real number squares to 2 | true | $x = \sqrt 2$ |
| $\exists x \in \mathbb{Q},\ x^2 = 2$ | some fraction squares to 2 | false | proved below ($\sqrt 2$ is irrational) |
| $\forall n \in \mathbb{N},\ n \geq 1$ | every natural number is at least 1 | true | that's where $\mathbb{N}$ starts |

Notice rows 2 and 3: **the same predicate can be true or false depending on the domain.** Always check what $x$ ranges over.

**How to prove each kind:**

- To prove $\forall x,\ P(x)$: take an *arbitrary* $x$ ("let $x$ be any real number") and show $P(x)$ using only what you know about every such $x$.
- To prove $\exists x,\ P(x)$: exhibit one specific $x$ that works, and check it.

### Negating quantifiers

**Negating quantifiers** is a skill you'll use constantly (in limits, convergence, continuity).

Start with an everyday example. The statement "every student passed" is false exactly when "**some** student did **not** pass." And "some student cheated" is false exactly when "**every** student did **not** cheat."

In symbols:

$$
\neg\big(\forall x,\ P(x)\big) \Leftrightarrow \exists x,\ \neg P(x), \qquad \neg\big(\exists x,\ P(x)\big) \Leftrightarrow \forall x,\ \neg P(x).
$$

To negate, **flip every quantifier and negate the inner statement**.

With several quantifiers, push the $\neg$ inward one quantifier at a time. Each time it passes a quantifier, that quantifier flips.

!!! example "Example: negating two quantifiers, one step at a time"
    Statement: "every number has a bigger number," $\ \forall x\ \exists y:\ y > x$.

    1. Start: $\neg\big(\forall x\ \exists y:\ y > x\big)$.
    2. Push past $\forall x$, which flips to $\exists x$: $\ \exists x\ \neg\big(\exists y:\ y > x\big)$.
    3. Push past $\exists y$, which flips to $\forall y$: $\ \exists x\ \forall y\ \neg(y > x)$.
    4. Simplify the inside: $\neg(y > x)$ is $y \leq x$. Result: $\ \exists x\ \forall y:\ y \leq x$.

    In words: "some number is at least as big as every number," i.e. there is a largest number. That's the opposite of the original, as it should be.

!!! example "Example: negating a limit-style statement"
    Statement: $\forall \varepsilon > 0\ \exists \delta > 0\ \forall x:\ |x - a| < \delta \Rightarrow |f(x) - L| < \varepsilon$.

    Apply the same steps:

    1. The three quantifiers flip: $\forall \varepsilon \to \exists \varepsilon$, $\ \exists \delta \to \forall \delta$, $\ \forall x \to \exists x$.
    2. The inside is an implication "$A \Rightarrow B$", whose negation is "$A \land \neg B$" (from Section 1).
    3. $\neg\big(|f(x) - L| < \varepsilon\big)$ is $|f(x) - L| \geq \varepsilon$.

    Negation: $\exists \varepsilon > 0\ \forall \delta > 0\ \exists x:\ |x - a| < \delta \land |f(x) - L| \geq \varepsilon$.

    Notice the conditions "$\varepsilon > 0$" and "$\delta > 0$" do **not** get negated. They just say which values the quantifier ranges over.

    In words: "there is some tolerance $\varepsilon$ such that, no matter how close you force $x$ to be to $a$, some such $x$ still gives $f(x)$ at least $\varepsilon$ away from $L$."

    That is precisely what "the limit is *not* $L$" means. You'll meet this in [Limits](../calculus/limits.md).

!!! warning "Order of quantifiers matters"
    | Statement | In words | Truth (reals) |
    |---|---|---|
    | $\forall x\ \exists y:\ y > x$ | every number has a bigger number | true |
    | $\exists y\ \forall x:\ y > x$ | some number is bigger than every number | false |

    Same symbols, different order, opposite truth values.

    - In the first, $y$ may depend on $x$.
    - In the second, one $y$ must work for all $x$.

## 3. The five proof techniques

### 3.0 The definitions we'll use

A proof can only use what words *precisely* mean. Here are the definitions the examples below rely on. Each one turns a word into an equation you can do algebra with.

!!! definition "Definitions (for integers)"
    - $n$ is **even** if $n = 2k$ for some integer $k$. (Examples: $6 = 2 \cdot 3$, $\ 0 = 2 \cdot 0$, $\ -4 = 2 \cdot (-2)$.)
    - $n$ is **odd** if $n = 2k + 1$ for some integer $k$. (Examples: $7 = 2 \cdot 3 + 1$, $\ -1 = 2 \cdot (-1) + 1$.)
    - $a$ **divides** $b$, written $a \mid b$, if $b = a k$ for some integer $k$. (Example: $3 \mid 12$ because $12 = 3 \cdot 4$.) "$a \nmid b$" means $a$ does not divide $b$.
    - An integer $p \geq 2$ is **prime** if its only positive divisors are $1$ and $p$.
    - A real number is **rational** if it equals $p/q$ for integers $p, q$ with $q \neq 0$. Otherwise it is **irrational**.

Every integer is either even or odd, never both. (Divide by 2: the remainder is 0 or 1.)

### 3.1 Direct proof

Assume $P$, chain together known facts, arrive at $Q$.

!!! theorem "Theorem"
    The sum of two odd integers is even.

!!! proof "Proof"
    Let $m$ and $n$ be odd. By definition of odd, $m = 2a + 1$ and $n = 2b + 1$ for some integers $a, b$.

    Then

    $$
    m + n = (2a + 1) + (2b + 1) = 2a + 2b + 2 = 2(a + b + 1).
    $$

    Since $a + b + 1$ is an integer, $m + n$ is $2$ times an integer, so it is even.

Notice two details:

- We used **different letters** $a$ and $b$. Writing $m = 2k+1$ and $n = 2k+1$ would secretly force $m = n$.
- The last line points back at the definition of "even": we produced exactly the form $2 \times (\text{integer})$.

The key move: **unpack the definitions.** Most early proofs are nothing more than "write down what the words mean, then do algebra."

!!! example "Example: a direct proof with 'divides'"
    **Claim.** If $a \mid b$ and $a \mid c$, then $a \mid (b + c)$ and $a \mid (b - c)$.

    **Scratch work.** Unpack the hypothesis: $b = ak$ and $c = a\ell$ for some integers $k, \ell$. We want $b + c = a \times (\text{integer})$.

    **Proof.** Since $b = ak$ and $c = a\ell$,

    $$
    b + c = ak + a\ell = a(k + \ell), \qquad b - c = a(k - \ell).
    $$

    Both $k + \ell$ and $k - \ell$ are integers, so $a$ divides both. $\blacksquare$

    (The symbol $\blacksquare$ marks the end of a proof.) We'll use this fact in Euclid's proof below.

### 3.2 Proof by contrapositive

To prove $P \Rightarrow Q$, prove $\neg Q \Rightarrow \neg P$ instead (equivalent, by the theorem above).

This is useful when $\neg Q$ gives you something concrete to work with.

!!! theorem "Theorem"
    For an integer $n$: if $n^2$ is even, then $n$ is even.

!!! proof "Proof"
    We prove the contrapositive: if $n$ is odd, then $n^2$ is odd.

    Let $n = 2k+1$. Then

    $$
    n^2 = (2k+1)^2 = 4k^2 + 4k + 1 = 2(2k^2 + 2k) + 1.
    $$

    Since $2k^2 + 2k$ is an integer, $n^2$ has the form $2(\text{integer}) + 1$, so it is odd.

(A direct proof is awkward here: "$n^2 = 2m$" doesn't easily tell you anything about $n$. You'd need a square root, and $\sqrt{2m}$ isn't obviously an integer, let alone an even one.)

!!! intuition "When to reach for the contrapositive"
    Look at the hypothesis and the negated conclusion. Use whichever gives you an **equation to start from**.

    - Hypothesis "$n^2$ is even" gives $n^2 = 2m$: an equation about $n^2$, not $n$. Hard to use.
    - Negated conclusion "$n$ is odd" gives $n = 2k + 1$: an equation about $n$ itself. Easy to square.

### 3.3 Proof by contradiction

To prove $Q$, assume $\neg Q$ and derive something impossible.

Since a true assumption can't lead to a falsehood, $\neg Q$ must be false.

The template:

1. "Suppose, for contradiction, that [the opposite of what we want]."
2. Reason forward, using definitions and known facts.
3. Reach a statement that contradicts something (a known fact, or one of your own assumptions).
4. "This is a contradiction, so [what we wanted] is true."

!!! example "Warm-up: there is no largest integer"
    1. Suppose, for contradiction, that some integer $N$ is the largest.
    2. Then $N + 1$ is also an integer, and $N + 1 > N$.
    3. That contradicts "$N$ is the largest."
    4. So no largest integer exists. $\blacksquare$

The next proof follows the same four steps, with more algebra in step 2.

Before it, one fact about fractions: **every fraction can be reduced to lowest terms**, where the numerator and denominator have no common factor except $1$. (Keep cancelling common factors; the numbers shrink each time, so this must stop.) For example, $\frac{12}{18} = \frac{2}{3}$.

!!! theorem "Theorem: $\sqrt 2$ is irrational"
    There are no integers $p, q$ with $q \neq 0$ and $(p/q)^2 = 2$.

!!! proof "Proof"
    Suppose, for contradiction, that $\sqrt 2 = p/q$ with integers $p, q$. We may cancel common factors, so assume the fraction is in lowest terms: $p$ and $q$ share no factor other than $1$.

    1. Squaring both sides of $\sqrt 2 = p/q$ gives $2 = p^2/q^2$. Multiply by $q^2$: $\ p^2 = 2q^2$. So $p^2$ is $2 \times (\text{integer})$, i.e. even.
    2. By the previous theorem (if $n^2$ is even then $n$ is even), $p$ is even: $p = 2r$ for some integer $r$.
    3. Substitute $p = 2r$ into $p^2 = 2q^2$: $\ (2r)^2 = 2q^2$, so $4r^2 = 2q^2$. Divide by 2: $\ q^2 = 2r^2$. That makes $q^2$ even, and hence (same theorem) $q$ even.

    Now both $p$ and $q$ are even, so $2$ is a common factor. That contradicts "lowest terms." So no such $p, q$ exist. $\blacksquare$

!!! theorem "Theorem (Euclid): there are infinitely many primes"

!!! proof "Proof"
    Suppose there were only finitely many, $p_1, p_2, \dots, p_k$. Consider

    $$
    N = p_1 p_2 \cdots p_k + 1.
    $$

    For example, if the primes were only $2, 3, 5$, then $N = 2 \cdot 3 \cdot 5 + 1 = 31$.

    - $N > 1$, so it has some prime factor $p$. (Every integer greater than 1 does; we prove this below by strong induction.)
    - Our list contains *every* prime, so this $p$ must be one of the $p_i$.
    - That $p_i$ divides the product $p_1 \cdots p_k$. If it also divided $N$, then by the "divides" example above it would divide their difference, $N - p_1 \cdots p_k = 1$. But no prime divides $1$.

    Contradiction. So the list can't be complete: there are infinitely many primes. $\blacksquare$

!!! warning "A common misreading"
    The proof does **not** claim $N$ itself is prime. For instance $2 \cdot 3 \cdot 5 \cdot 7 \cdot 11 \cdot 13 + 1 = 30031 = 59 \cdot 509$.

    It only claims $N$ has a prime factor that is missing from the list. Here $59$ and $509$ are both missing from $\{2, 3, 5, 7, 11, 13\}$.

### 3.4 Proof by induction

To prove $P(n)$ for every integer $n \geq 1$:

1. **Base case:** prove $P(1)$.
2. **Inductive step:** prove that for every $k \geq 1$, $P(k) \Rightarrow P(k+1)$.

Then $P(1)$ holds, so $P(2)$ holds, so $P(3)$ holds, and so on, like an infinite line of dominoes.

Spelled out, the chain of reasoning is:

| We know | Because |
|---|---|
| $P(1)$ | base case |
| $P(2)$ | step with $k = 1$: $P(1) \Rightarrow P(2)$ |
| $P(3)$ | step with $k = 2$: $P(2) \Rightarrow P(3)$ |
| $\vdots$ | $\vdots$ |

Any particular $n$ is reached after finitely many steps, so $P(n)$ holds for every $n$.

!!! warning "The inductive step is an implication, not a claim"
    In the step you **assume** $P(k)$ and use it to prove $P(k+1)$. This feels like cheating at first ("aren't we assuming what we want?").

    It isn't. We are not claiming $P(k)$ is true. We're proving the *promise* "if $P(k)$ is true, then so is $P(k+1)$." The base case is what actually starts the chain.

**The template for the step:**

1. Write down $P(k)$, the thing you may assume.
2. Write down $P(k+1)$, the thing you must reach. (Substitute $k+1$ for $n$ everywhere.)
3. Find the $P(k)$ inside $P(k+1)$, replace it using the assumption, and simplify toward the goal.

!!! theorem "Theorem"
    For every $n \geq 1$: $\quad 1 + 2 + \cdots + n = \dfrac{n(n+1)}{2}$.

Before proving it, check a case: $n = 4$ gives $1 + 2 + 3 + 4 = 10$ and $\frac{4 \cdot 5}{2} = 10$. ✓

!!! proof "Proof"
    *Base case* $n=1$: the left side is $1$, the right side is $\frac{1 \cdot 2}{2} = 1$. ✓

    *Inductive step.*

    - May assume (the **inductive hypothesis**): $\ 1 + \cdots + k = \frac{k(k+1)}{2}$.
    - Must show: $\ 1 + \cdots + k + (k+1) = \frac{(k+1)(k+2)}{2}$.

    The left side of the goal contains $1 + \cdots + k$. Replace it using the hypothesis:

    $$
    \underbrace{1 + \cdots + k}_{= \, k(k+1)/2} + (k+1) = \frac{k(k+1)}{2} + (k+1).
    $$

    Both terms contain the factor $(k+1)$. Write the second as $\frac{2(k+1)}{2}$ to get a common denominator, then factor out $(k+1)$:

    $$
    \frac{k(k+1)}{2} + \frac{2(k+1)}{2} = \frac{(k+1)(k + 2)}{2}.
    $$

    That is exactly the goal. $\blacksquare$

!!! intuition "A second proof, by pairing (Gauss's trick)"
    Write the sum forwards and backwards and add the two lines column by column:

    $$
    \begin{array}{rcccccc}
    S &=& 1 &+& 2 &+ \cdots +& n \\
    S &=& n &+& (n-1) &+ \cdots +& 1 \\ \hline
    2S &=& (n+1) &+& (n+1) &+ \cdots +& (n+1)
    \end{array}
    $$

    That's $n$ copies of $(n+1)$, so $2S = n(n+1)$. Induction *verifies* a formula; tricks like this one help you *discover* it.

!!! example "Example: induction with an inequality, and a base case other than 1"
    **Claim.** $2^n > n^2$ for every integer $n \geq 5$.

    Check small cases first: $n = 4$ gives $16 > 16$, false. $\ n = 5$ gives $32 > 25$, true. So the base case is $n = 5$, and the step only has to work for $k \geq 5$.

    *Base* $n = 5$: $32 > 25$. ✓

    *Step.* Assume $2^k > k^2$ for some $k \geq 5$. We need $2^{k+1} > (k+1)^2$.

    1. $2^{k+1} = 2 \cdot 2^k > 2k^2$, using the hypothesis.
    2. It remains to show $2k^2 \geq (k+1)^2$, i.e. $2k^2 \geq k^2 + 2k + 1$, i.e. $k^2 \geq 2k + 1$.
    3. Since $k \geq 5$: $\ k^2 = k \cdot k \geq 5k = 2k + 3k \geq 2k + 15 > 2k + 1$. ✓

    Chaining 1–3: $2^{k+1} > 2k^2 \geq (k+1)^2$. $\blacksquare$

    With inequalities, you often split the goal into "use the hypothesis" plus "a separate small inequality" (step 2).

!!! theorem "Theorem: geometric sum"
    For $r \neq 1$ and $n \geq 0$: $\quad 1 + r + r^2 + \cdots + r^n = \dfrac{1 - r^{n+1}}{1 - r}$.

!!! proof "Proof (direct, the 'shift and subtract' trick)"
    Let $S = 1 + r + \cdots + r^n$. Then $rS = r + r^2 + \cdots + r^{n+1}$.

    Line the two up so that equal powers sit in the same column:

    $$
    \begin{aligned}
    S &= 1 + r + r^2 + \cdots + r^n \\
    rS &= \phantom{1 + {}} r + r^2 + \cdots + r^n + r^{n+1}
    \end{aligned}
    $$

    Subtracting, every middle term cancels: $S - rS = 1 - r^{n+1}$.

    Factor the left side: $S(1 - r) = 1 - r^{n+1}$. Since $r \neq 1$, we can divide by $1 - r$. $\blacksquare$

Check with numbers: $r = 2$, $n = 3$ gives $1 + 2 + 4 + 8 = 15$, and $\frac{1 - 2^4}{1 - 2} = \frac{-15}{-1} = 15$. ✓

(Why $r \neq 1$? When $r = 1$ the formula would divide by zero. But then the sum is just $1 + 1 + \cdots + 1 = n + 1$.)

This formula will reappear in series, in compound interest, in Markov chains, and in analyzing algorithms.

**Strong induction** lets you assume $P(1), \dots, P(k)$ all hold when proving $P(k+1)$.

It's logically equivalent to ordinary induction, just more convenient sometimes.

Use it when $P(k+1)$ depends on some smaller case, but you don't know in advance which one. In the next proof, $k+1$ splits into factors $a$ and $b$, which can be any smaller numbers, not necessarily $k$.

!!! theorem "Theorem"
    Every integer $n \geq 2$ is a product of primes (a prime itself counts as a product of one prime).

!!! proof "Proof (strong induction)"
    *Base:* $n = 2$ is prime. ✓

    *Step:* suppose every integer from $2$ to $k$ is a product of primes, and consider $k+1$.

    - If $k+1$ is prime, we're done.
    - Otherwise $k+1 = ab$ with $2 \leq a, b \leq k$. By the hypothesis, $a$ and $b$ are each products of primes, so $ab$ is too.

    For example, at $k + 1 = 60$: $\ 60 = 6 \cdot 10$, and the hypothesis already gave $6 = 2 \cdot 3$ and $10 = 2 \cdot 5$. So $60 = 2 \cdot 3 \cdot 2 \cdot 5$. $\blacksquare$

### 3.5 Counterexample

To show a "for all" statement is false, one example suffices.

> *Claim: $n^2 + n + 41$ is prime for every $n \geq 0$.*
>
> It holds for $n = 0, 1, \dots, 39$! But at $n = 40$: $40^2 + 40 + 41 = 41^2$. False.

!!! warning "Checking examples is not a proof"
    The example above is a famous reminder: 40 confirming cases prove nothing about the 41st.

    Examples are for *building intuition* and *finding counterexamples*, never for proving universal statements.

## 4. Proving "if and only if" and equality of sets

- To prove $P \Leftrightarrow Q$: prove $P \Rightarrow Q$ **and** $Q \Rightarrow P$ (two separate proofs).
- To prove two sets are equal, $A = B$: prove $A \subseteq B$ and $B \subseteq A$. (Set notation is in the [next lesson](sets-functions.md).)
- To prove "there exists a unique $x$": show one exists, then show that any two such $x$ are equal.

!!! example "Example: an 'if and only if' proof"
    **Claim.** For an integer $n$: $\ n$ is even $\iff$ $n^2$ is even.

    Split it into the two directions and prove each separately.

    **($\Rightarrow$) If $n$ is even, then $n^2$ is even.** Direct proof. Write $n = 2k$. Then $n^2 = 4k^2 = 2(2k^2)$, which is even.

    **($\Leftarrow$) If $n^2$ is even, then $n$ is even.** This is the contrapositive theorem from 3.2, already proved.

    Both directions hold, so the "iff" holds. $\blacksquare$

!!! example "Example: proving uniqueness"
    **Claim.** The equation $3x + 2 = 11$ has exactly one real solution.

    - **Existence:** $x = 3$ works, since $3 \cdot 3 + 2 = 11$.
    - **Uniqueness:** suppose $x_1$ and $x_2$ both work. Then $3x_1 + 2 = 3x_2 + 2$. Subtract 2 and divide by 3: $x_1 = x_2$. So any two solutions are the same one. $\blacksquare$

## 5. How to write a proof

1. State what you're assuming and what you'll show.
2. Name things: "Let $n$ be an odd integer, so $n = 2k + 1$ for some integer $k$."
3. Every line should follow from previous lines, definitions or known theorems. Say which.
4. End by stating that you've reached the goal.

**Scratch work is allowed, and expected.** Mathematicians rarely find a proof in the order it's written. The usual process:

1. Write the hypothesis and the goal as equations (unpack definitions).
2. Work *backwards* from the goal on scratch paper: "to get this, it would be enough to have that."
3. Once the two ends meet, write the clean proof *forwards*.

!!! example "Example: from scratch work to a finished proof"
    **Claim.** If $n$ is odd, then $n^2 - 1$ is divisible by 8.

    **Scratch work.**

    - Hypothesis: $n = 2k + 1$.
    - Goal: $n^2 - 1 = 8 \times (\text{integer})$.
    - Compute: $n^2 - 1 = 4k^2 + 4k = 4k(k+1)$. I have a $4$; I need one more factor of $2$.
    - Idea: $k(k+1)$ is a product of two consecutive integers, so one of them is even. That gives the extra $2$.

    **Clean proof.** Let $n = 2k + 1$. Then $n^2 - 1 = 4k^2 + 4k = 4k(k+1)$.

    Of the consecutive integers $k$ and $k+1$, one is even, so $k(k+1) = 2m$ for some integer $m$.

    Hence $n^2 - 1 = 4 \cdot 2m = 8m$. $\blacksquare$

    Check: $n = 5$ gives $24 = 8 \cdot 3$; $\ n = 7$ gives $48 = 8 \cdot 6$. ✓

!!! tip "When you're stuck"
    - Re-read the definitions and write them as equations.
    - Try small examples to see *why* the claim is true.
    - Try the contrapositive, or contradiction.
    - Ask: which hypothesis haven't I used yet? (Every hypothesis is usually needed.)

!!! ml "Where this shows up"
    - **Convergence proofs** for gradient descent (Phase 7) are direct proofs with inequalities.
    - **Correctness proofs** of algorithms are induction on the loop counter (a *loop invariant*) or on input size.
    - **Impossibility results** (e.g. "no compression scheme beats entropy", Phase 8) are proofs by contradiction.
    - Reading any ML theory paper means parsing nested quantifiers: "for all $\delta > 0$, with probability at least $1 - \delta$, for all hypotheses $h$…"

## Check yourself

**1.** Write the contrapositive and the converse of: "If a function is differentiable, then it is continuous." Which one is guaranteed to be true (given the original is true, which it is)?

??? success "Solution"
    - **Contrapositive:** "If a function is not continuous, then it is not differentiable." Equivalent to the original, so true.
    - **Converse:** "If a function is continuous, then it is differentiable." Not guaranteed, and in fact false: $|x|$ is continuous but not differentiable at $0$.

**2.** Negate: "For every $\varepsilon > 0$ there exists $N$ such that for all $n > N$, $|a_n - L| < \varepsilon$."

??? success "Solution"
    "There exists $\varepsilon > 0$ such that for every $N$ there is some $n > N$ with $|a_n - L| \geq \varepsilon$."

    Meaning: the sequence keeps returning at least $\varepsilon$ away from $L$, so it does not converge to $L$.

**3.** Prove that $\sqrt 3$ is irrational. (You'll need: if $3 \mid n^2$ then $3 \mid n$. Prove that too, by contrapositive, considering $n = 3k+1$ and $n = 3k+2$.)

??? success "Solution"
    **Lemma.** If $3 \nmid n$, then $n = 3k+1$ or $n = 3k+2$:

    - $n = 3k+1$: $\ n^2 = 9k^2 + 6k + 1 = 3(3k^2+2k) + 1$.
    - $n = 3k+2$: $\ n^2 = 9k^2 + 12k + 4 = 3(3k^2 + 4k + 1) + 1$.

    Either way $3 \nmid n^2$. Contrapositive: $3 \mid n^2 \Rightarrow 3 \mid n$.

    **Main proof.** Suppose $\sqrt 3 = p/q$ in lowest terms.

    1. $p^2 = 3q^2$, so $3 \mid p^2$, so $3 \mid p$. Say $p = 3r$.
    2. Then $9r^2 = 3q^2$, so $q^2 = 3r^2$, so $3 \mid q$.
    3. Both are divisible by 3: contradiction.

**4.** Prove by induction: $1^2 + 2^2 + \cdots + n^2 = \dfrac{n(n+1)(2n+1)}{6}$.

??? success "Solution"
    *Base* $n = 1$: $1 = \frac{1\cdot2\cdot3}{6}$. ✓

    *Step:* assume true for $k$. Then

    $$
    \frac{k(k+1)(2k+1)}{6} + (k+1)^2 = \frac{(k+1)\left[k(2k+1) + 6(k+1)\right]}{6} = \frac{(k+1)(2k^2 + 7k + 6)}{6} = \frac{(k+1)(k+2)(2k+3)}{6},
    $$

    which is the formula for $k+1$ (since $2(k+1)+1 = 2k+3$).

**5.** Prove Bernoulli's inequality: for $x \geq -1$ and every integer $n \geq 1$, $(1 + x)^n \geq 1 + nx$.

??? success "Solution"
    *Base* $n = 1$: equality. ✓

    *Step:* assume $(1+x)^k \geq 1 + kx$. Since $1 + x \geq 0$, we may multiply both sides by it without flipping the inequality:

    $$
    (1+x)^{k+1} \geq (1 + kx)(1 + x) = 1 + (k+1)x + kx^2 \geq 1 + (k+1)x,
    $$

    because $kx^2 \geq 0$.

**6.** What's wrong with this "proof" that all horses are the same color? *Base: one horse is the same color as itself. Step: given $k+1$ horses, remove one; the remaining $k$ are the same color. Put it back and remove another; those $k$ are the same color. So all $k+1$ match.*

??? success "Solution"
    The step from $k = 1$ to $k + 1 = 2$ fails.

    With 2 horses, removing one leaves $\{A\}$ and removing the other leaves $\{B\}$. These two groups don't overlap, so nothing forces $A$ and $B$ to match.

    The argument silently needs an overlap, which only exists when $k \geq 2$.

    **An inductive step must work for every $k$, starting from the base case.**
