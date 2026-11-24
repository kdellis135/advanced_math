# Logic and proofs

<div class="lesson-meta" markdown>
**Phase 1 · Lesson 1** · ⏱ ~3 hours · Needs: high-school algebra
</div>

A proof is an argument that leaves no room for doubt. You need proofs for two reasons. First, they are how you *know* something rather than hope it. Second, and more practically, every theorem in ML, algorithms and physics comes with one, and reading them is how you understand *when* a result applies. This lesson gives you the grammar of proofs.

## 1. Statements and connectives

A **statement** (or proposition) is a sentence that is either true or false. "7 is prime" is a statement (true). "$x > 3$" is not, until we know $x$.

We build bigger statements from smaller ones:

| Symbol | Read as | True when |
|---|---|---|
| $\neg P$ | not $P$ | $P$ is false |
| $P \land Q$ | $P$ and $Q$ | both are true |
| $P \lor Q$ | $P$ or $Q$ | at least one is true (inclusive "or") |
| $P \Rightarrow Q$ | if $P$ then $Q$ / $P$ implies $Q$ | it is *not* the case that $P$ is true and $Q$ false |
| $P \Leftrightarrow Q$ | $P$ if and only if $Q$ (iff) | both have the same truth value |

### Implication is the important one

$P \Rightarrow Q$ is a *promise*: "whenever $P$ holds, $Q$ holds." Its truth table:

| $P$ | $Q$ | $P \Rightarrow Q$ |
|:-:|:-:|:-:|
| T | T | T |
| T | F | **F** |
| F | T | T |
| F | F | T |

!!! intuition "Why is 'false implies anything' true?"
    The promise "If it rains, I'll bring an umbrella" is only *broken* when it rains and I don't bring one. On a sunny day the promise is kept no matter what I do. Likewise, "if $x > 5$ then $x > 3$" is true for every $x$, including $x = 1$ (where both parts are false) and $x = 4$ (where only the conclusion holds).

Three relatives of $P \Rightarrow Q$ that you must keep apart:

- **Converse:** $Q \Rightarrow P$. *Not* equivalent. ("If $x > 5$ then $x > 3$" is true; "if $x > 3$ then $x > 5$" is false.)
- **Contrapositive:** $\neg Q \Rightarrow \neg P$. *Always* equivalent to the original.
- **Inverse:** $\neg P \Rightarrow \neg Q$. Equivalent to the converse, not to the original.

!!! theorem "Theorem: an implication is equivalent to its contrapositive"
    $(P \Rightarrow Q) \Leftrightarrow (\neg Q \Rightarrow \neg P)$.

!!! proof "Proof"
    $P \Rightarrow Q$ is false exactly when $P$ is true and $Q$ is false. $\neg Q \Rightarrow \neg P$ is false exactly when $\neg Q$ is true and $\neg P$ is false, i.e. when $Q$ is false and $P$ is true. Same situation, so the two are false in the same cases, hence true in the same cases.

**De Morgan's laws** tell you how to negate "and" and "or":

$$
\neg(P \land Q) \Leftrightarrow (\neg P \lor \neg Q), \qquad \neg(P \lor Q) \Leftrightarrow (\neg P \land \neg Q).
$$

"Not (rich and famous)" means "not rich, or not famous."

And the negation of an implication: $\neg(P \Rightarrow Q) \Leftrightarrow (P \land \neg Q)$. To show an implication fails, show a case where $P$ holds but $Q$ doesn't.

## 2. Quantifiers

Statements about *all* or *some* objects use quantifiers:

- $\forall x \in S,\ P(x)$: "for every $x$ in $S$, $P(x)$ holds."
- $\exists x \in S,\ P(x)$: "there exists (at least one) $x$ in $S$ with $P(x)$."

**Negating quantifiers** is a skill you'll use constantly (in limits, convergence, continuity):

$$
\neg\big(\forall x,\ P(x)\big) \Leftrightarrow \exists x,\ \neg P(x), \qquad \neg\big(\exists x,\ P(x)\big) \Leftrightarrow \forall x,\ \neg P(x).
$$

To negate, **flip every quantifier and negate the inner statement**.

!!! example "Example: negating a limit-style statement"
    Statement: $\forall \varepsilon > 0\ \exists \delta > 0\ \forall x:\ |x - a| < \delta \Rightarrow |f(x) - L| < \varepsilon$.

    Negation: $\exists \varepsilon > 0\ \forall \delta > 0\ \exists x:\ |x - a| < \delta \land |f(x) - L| \geq \varepsilon$.

    In words: "there is some tolerance $\varepsilon$ such that no matter how close you force $x$ to be to $a$, some such $x$ still gives $f(x)$ at least $\varepsilon$ away from $L$." That is precisely what "the limit is *not* $L$" means. You'll meet this in [Limits](../calculus/limits.md).

!!! warning "Order of quantifiers matters"
    $\forall x\ \exists y:\ y > x$ ("every number has a bigger number") is true for real numbers.
    $\exists y\ \forall x:\ y > x$ ("some number is bigger than every number") is false.
    Same symbols, different order, opposite truth values. In the first, $y$ may depend on $x$. In the second, one $y$ must work for all $x$.

## 3. The five proof techniques

### 3.1 Direct proof

Assume $P$, chain together known facts, arrive at $Q$.

!!! theorem "Theorem"
    The sum of two odd integers is even.

!!! proof "Proof"
    Let $m$ and $n$ be odd. By definition of odd, $m = 2a + 1$ and $n = 2b + 1$ for some integers $a, b$. Then $m + n = 2a + 2b + 2 = 2(a + b + 1)$, which is $2$ times an integer, so it is even.

The key move: **unpack the definitions.** Most early proofs are nothing more than "write down what the words mean, then do algebra."

### 3.2 Proof by contrapositive

To prove $P \Rightarrow Q$, prove $\neg Q \Rightarrow \neg P$ instead (equivalent, by the theorem above). Useful when $\neg Q$ gives you something concrete to work with.

!!! theorem "Theorem"
    For an integer $n$: if $n^2$ is even, then $n$ is even.

!!! proof "Proof"
    We prove the contrapositive: if $n$ is odd, then $n^2$ is odd. Let $n = 2k+1$. Then $n^2 = 4k^2 + 4k + 1 = 2(2k^2 + 2k) + 1$, which is odd.

(A direct proof is awkward here: "$n^2 = 2m$" doesn't easily tell you anything about $n$.)

### 3.3 Proof by contradiction

To prove $Q$, assume $\neg Q$ and derive something impossible. Since a true assumption can't lead to a falsehood, $\neg Q$ must be false.

!!! theorem "Theorem: $\sqrt 2$ is irrational"
    There are no integers $p, q$ with $q \neq 0$ and $(p/q)^2 = 2$.

!!! proof "Proof"
    Suppose, for contradiction, that $\sqrt 2 = p/q$ with integers $p, q$. We may cancel common factors, so assume the fraction is in lowest terms: $p$ and $q$ share no factor other than $1$.

    Squaring gives $p^2 = 2q^2$, so $p^2$ is even. By the previous theorem, $p$ is even: $p = 2r$. Substituting, $4r^2 = 2q^2$, so $q^2 = 2r^2$, which makes $q^2$ even and hence $q$ even.

    Now both $p$ and $q$ are even, contradicting "lowest terms." So no such $p, q$ exist.

!!! theorem "Theorem (Euclid): there are infinitely many primes"

!!! proof "Proof"
    Suppose there were only finitely many, $p_1, p_2, \dots, p_k$. Consider $N = p_1 p_2 \cdots p_k + 1$. $N > 1$, so it has some prime factor $p$ (every integer greater than 1 does; we prove this below by strong induction). This $p$ must be one of the $p_i$. But $p_i$ divides $p_1 \cdots p_k$, and if it also divided $N$ it would divide their difference, $1$. Impossible. Contradiction.

### 3.4 Proof by induction

To prove $P(n)$ for every integer $n \geq 1$:

1. **Base case:** prove $P(1)$.
2. **Inductive step:** prove that for every $k \geq 1$, $P(k) \Rightarrow P(k+1)$.

Then $P(1)$ holds, so $P(2)$ holds, so $P(3)$ holds, and so on, like an infinite line of dominoes.

!!! theorem "Theorem"
    For every $n \geq 1$: $\quad 1 + 2 + \cdots + n = \dfrac{n(n+1)}{2}$.

!!! proof "Proof"
    *Base case* $n=1$: the left side is $1$, the right side is $\frac{1 \cdot 2}{2} = 1$. ✓

    *Inductive step:* assume the formula holds for $n = k$ (the **inductive hypothesis**): $1 + \cdots + k = \frac{k(k+1)}{2}$. Then

    $$
    1 + \cdots + k + (k+1) = \frac{k(k+1)}{2} + (k+1) = (k+1)\left(\frac{k}{2} + 1\right) = \frac{(k+1)(k+2)}{2},
    $$

    which is the formula for $n = k+1$.

!!! theorem "Theorem: geometric sum"
    For $r \neq 1$ and $n \geq 0$: $\quad 1 + r + r^2 + \cdots + r^n = \dfrac{1 - r^{n+1}}{1 - r}$.

!!! proof "Proof (direct, the 'shift and subtract' trick)"
    Let $S = 1 + r + \cdots + r^n$. Then $rS = r + r^2 + \cdots + r^{n+1}$. Subtracting, almost everything cancels: $S - rS = 1 - r^{n+1}$. Divide by $1 - r$.

This formula will reappear in series, in compound interest, in Markov chains, and in analyzing algorithms.

**Strong induction** lets you assume $P(1), \dots, P(k)$ all hold when proving $P(k+1)$. It's logically equivalent, just more convenient sometimes.

!!! theorem "Theorem"
    Every integer $n \geq 2$ is a product of primes (a prime itself counts as a product of one prime).

!!! proof "Proof (strong induction)"
    $n = 2$ is prime. ✓ Suppose every integer from $2$ to $k$ is a product of primes, and consider $k+1$. If $k+1$ is prime, done. Otherwise $k+1 = ab$ with $2 \leq a, b \leq k$. By the hypothesis, $a$ and $b$ are each products of primes, so $ab$ is too.

### 3.5 Counterexample

To show a "for all" statement is false, one example suffices.

> *Claim: $n^2 + n + 41$ is prime for every $n \geq 0$.* It holds for $n = 0, 1, \dots, 39$! But at $n = 40$: $40^2 + 40 + 41 = 41^2$. False.

!!! warning "Checking examples is not a proof"
    The example above is a famous reminder: 40 confirming cases prove nothing about the 41st. Examples are for *building intuition* and *finding counterexamples*, never for proving universal statements.

## 4. Proving "if and only if" and equality of sets

- To prove $P \Leftrightarrow Q$: prove $P \Rightarrow Q$ **and** $Q \Rightarrow P$ (two separate proofs).
- To prove two sets are equal, $A = B$: prove $A \subseteq B$ and $B \subseteq A$.
- To prove "there exists a unique $x$": show one exists, then show that any two such $x$ are equal.

## 5. How to write a proof

1. State what you're assuming and what you'll show.
2. Name things: "Let $n$ be an odd integer, so $n = 2k + 1$ for some integer $k$."
3. Every line should follow from previous lines, definitions or known theorems. Say which.
4. End by stating that you've reached the goal.

!!! ml "Where this shows up"
    - **Convergence proofs** for gradient descent (Phase 7) are direct proofs with inequalities.
    - **Correctness proofs** of algorithms are induction on the loop counter (a *loop invariant*) or on input size.
    - **Impossibility results** (e.g. "no compression scheme beats entropy", Phase 8) are proofs by contradiction.
    - Reading any ML theory paper means parsing nested quantifiers: "for all $\delta > 0$, with probability at least $1 - \delta$, for all hypotheses $h$…"

## Check yourself

**1.** Write the contrapositive and the converse of: "If a function is differentiable, then it is continuous." Which one is guaranteed to be true (given the original is true, which it is)?

??? success "Solution"
    Contrapositive: "If a function is not continuous, then it is not differentiable." Equivalent to the original, so true.
    Converse: "If a function is continuous, then it is differentiable." Not guaranteed, and in fact false: $|x|$ is continuous but not differentiable at $0$.

**2.** Negate: "For every $\varepsilon > 0$ there exists $N$ such that for all $n > N$, $|a_n - L| < \varepsilon$."

??? success "Solution"
    "There exists $\varepsilon > 0$ such that for every $N$ there is some $n > N$ with $|a_n - L| \geq \varepsilon$." (Meaning: the sequence keeps returning at least $\varepsilon$ away from $L$, so it does not converge to $L$.)

**3.** Prove that $\sqrt 3$ is irrational. (You'll need: if $3 \mid n^2$ then $3 \mid n$. Prove that too, by contrapositive, considering $n = 3k+1$ and $n = 3k+2$.)

??? success "Solution"
    Lemma: if $3 \nmid n$ then $n = 3k+1$ or $3k+2$, so $n^2 = 9k^2 + 6k + 1 = 3(3k^2+2k) + 1$ or $n^2 = 9k^2 + 12k + 4 = 3(3k^2 + 4k + 1) + 1$. Either way $3 \nmid n^2$. Contrapositive: $3 \mid n^2 \Rightarrow 3 \mid n$.

    Main proof: suppose $\sqrt 3 = p/q$ in lowest terms. Then $p^2 = 3q^2$, so $3 \mid p^2$, so $3 \mid p$, say $p = 3r$. Then $9r^2 = 3q^2$, so $q^2 = 3r^2$, so $3 \mid q$. Both divisible by 3: contradiction.

**4.** Prove by induction: $1^2 + 2^2 + \cdots + n^2 = \dfrac{n(n+1)(2n+1)}{6}$.

??? success "Solution"
    Base: $n = 1$: $1 = \frac{1\cdot2\cdot3}{6}$. ✓ Step: assume true for $k$. Then
    $\frac{k(k+1)(2k+1)}{6} + (k+1)^2 = \frac{(k+1)\left[k(2k+1) + 6(k+1)\right]}{6} = \frac{(k+1)(2k^2 + 7k + 6)}{6} = \frac{(k+1)(k+2)(2k+3)}{6}$,
    which is the formula for $k+1$ (since $2(k+1)+1 = 2k+3$).

**5.** Prove Bernoulli's inequality: for $x \geq -1$ and every integer $n \geq 1$, $(1 + x)^n \geq 1 + nx$.

??? success "Solution"
    Base: $n = 1$: equality. Step: assume $(1+x)^k \geq 1 + kx$. Since $1 + x \geq 0$ we may multiply both sides by it without flipping the inequality:
    $(1+x)^{k+1} \geq (1 + kx)(1 + x) = 1 + (k+1)x + kx^2 \geq 1 + (k+1)x$, because $kx^2 \geq 0$.

**6.** What's wrong with this "proof" that all horses are the same color? *Base: one horse is the same color as itself. Step: given $k+1$ horses, remove one; the remaining $k$ are the same color. Put it back and remove another; those $k$ are the same color. So all $k+1$ match.*

??? success "Solution"
    The step from $k = 1$ to $k + 1 = 2$ fails. With 2 horses, removing one leaves $\{A\}$, removing the other leaves $\{B\}$, and these two groups don't overlap, so nothing forces $A$ and $B$ to match. The argument silently needs an overlap, which only exists when $k \geq 2$. **An inductive step must work for every $k$, starting from the base case.**
