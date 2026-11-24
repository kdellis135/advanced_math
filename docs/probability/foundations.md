# Probability, conditioning and Bayes

<div class="lesson-meta" markdown>
**Phase 5 · Lesson 2** · ⏱ ~3.5 hours · Needs: [Counting](counting.md), [Sets](../foundations/sets-functions.md)
</div>

Probability theory starts from three simple axioms. Its most important concept is **conditioning**: how probabilities change when you learn something. Bayes' theorem, which reverses conditional probabilities, is the mathematical form of learning from evidence, and it explains why most people misjudge medical test results.

## 1. The setup

!!! definition "Definition: probability space"
    - The **sample space** $\Omega$ is the set of all possible outcomes.
    - An **event** is a subset $A\subseteq\Omega$.
    - A **probability** $P$ assigns a number to each event, satisfying the **axioms**:
        1. $P(A) \geq 0$;
        2. $P(\Omega) = 1$;
        3. if $A_1, A_2, \ldots$ are disjoint, $P(A_1\cup A_2\cup\cdots) = P(A_1) + P(A_2) + \cdots$.

Everything else is a theorem. Events are sets, so set operations are logic: $A\cup B$ is "$A$ or $B$", $A\cap B$ is "$A$ and $B$", $A^c$ is "not $A$".

!!! theorem "Basic consequences"
    1. $P(A^c) = 1 - P(A)$, and $P(\varnothing) = 0$.
    2. If $A\subseteq B$ then $P(A) \leq P(B)$.
    3. $P(A\cup B) = P(A) + P(B) - P(A\cap B)$.
    4. **Union bound:** $P(A_1\cup\cdots\cup A_n) \leq P(A_1) + \cdots + P(A_n)$.

!!! proof "Proof"
    (1): $A$ and $A^c$ are disjoint with union $\Omega$, so $P(A) + P(A^c) = 1$. (2): $B = A\cup(B\setminus A)$ disjointly, so $P(B) = P(A) + P(B\setminus A) \geq P(A)$. (3): $A\cup B = A \cup (B\setminus A)$ disjointly, and $P(B\setminus A) = P(B) - P(A \cap B)$. (4): from (3) by induction, since $P(A\cap B) \geq 0$.

The **union bound** is crude but powerful: it requires no independence. It's the workhorse of learning theory ("the probability that *any* of these $n$ bad things happens is at most $n$ times the worst one").

## 2. Conditional probability

!!! definition "Definition: conditional probability"
    For $P(B) > 0$:

    $$
    P(A\mid B) = \frac{P(A\cap B)}{P(B)}.
    $$

!!! intuition "Zoom into B"
    Knowing $B$ happened shrinks the world to $B$. Within it, $A$ occupies the part $A\cap B$. Divide by $P(B)$ to renormalize so the new world has total probability 1.

!!! example "Example"
    Roll two dice. $P(\text{sum} = 8 \mid \text{first die is } 3) = \frac{P(\text{first} = 3, \text{second} = 5)}{P(\text{first} = 3)} = \frac{1/36}{1/6} = \frac16$.

Rearranging gives the **multiplication rule** $P(A\cap B) = P(B)\,P(A\mid B)$, and its extension, the **chain rule of probability**:

$$
P(A_1\cap A_2\cap\cdots\cap A_n) = P(A_1)\,P(A_2\mid A_1)\,P(A_3\mid A_1\cap A_2)\cdots P(A_n\mid A_1\cap\cdots\cap A_{n-1}).
$$

!!! ml "This is how language models work"
    An autoregressive language model writes the probability of a text $w_1w_2\ldots w_n$ using exactly the chain rule:
    $P(w_1, \ldots, w_n) = \prod_i P(w_i\mid w_1, \ldots, w_{i-1})$.
    The network predicts each conditional factor, the next token given the previous ones. Training maximizes the log of this product, a sum of per-token log-probabilities.

## 3. The law of total probability

!!! theorem "Law of total probability"
    If $B_1, \ldots, B_n$ partition $\Omega$ (disjoint, union $\Omega$), then

    $$
    P(A) = \sum_{i=1}^n P(A\mid B_i)\,P(B_i).
    $$

!!! proof "Proof"
    $A = \bigcup_i(A\cap B_i)$ disjointly, so $P(A) = \sum_iP(A\cap B_i) = \sum_iP(A\mid B_i)P(B_i)$.

Strategy: **condition on whatever would make the problem easy**, then average over the cases.

## 4. Bayes' theorem

!!! theorem "Bayes' theorem"
    $$
    P(B\mid A) = \frac{P(A\mid B)\,P(B)}{P(A)} = \frac{P(A\mid B)\,P(B)}{\sum_jP(A\mid B_j)P(B_j)}.
    $$

!!! proof "Proof"
    Both $P(B\mid A)P(A)$ and $P(A\mid B)P(B)$ equal $P(A\cap B)$. Divide by $P(A)$, and expand $P(A)$ by total probability.

In inference language: $B$ is a **hypothesis**, $A$ the **evidence**.

$$
\underbrace{P(H\mid E)}_{\text{posterior}} = \frac{\overbrace{P(E\mid H)}^{\text{likelihood}}\ \overbrace{P(H)}^{\text{prior}}}{\underbrace{P(E)}_{\text{evidence}}}.
$$

!!! example "The medical test"
    A disease affects 1% of people. A test catches 90% of cases (sensitivity) and has a 9% false-positive rate. You test positive. What's the chance you're sick?

    $$
    P(\text{sick}\mid+) = \frac{0.9\times0.01}{0.9\times0.01 + 0.09\times0.99} = \frac{0.009}{0.009 + 0.0891} \approx 9.2\%.
    $$

    Only about 9%! Most doctors guess around 80–90%. The intuition: among 1000 people, about 10 are sick (9 test positive), but 990 are healthy and about 89 of them test positive. The positives are dominated by the false alarms from the big healthy group.

<div class="viz" data-viz="bayes"></div>

!!! intuition "Bayes in odds form"
    $\dfrac{P(H\mid E)}{P(\neg H\mid E)} = \dfrac{P(H)}{P(\neg H)}\times\dfrac{P(E\mid H)}{P(E\mid\neg H)}$.
    **Posterior odds = prior odds × likelihood ratio.** Here: prior odds $1:99$, likelihood ratio $0.9/0.09 = 10$, posterior odds $10:99$, i.e. about 9%. A second independent positive test multiplies the odds by 10 again: $100:99$, about 50%.

## 5. Independence

!!! definition "Definition: independence"
    $A$ and $B$ are **independent** if $P(A\cap B) = P(A)P(B)$, equivalently (when $P(B) > 0$) $P(A\mid B) = P(A)$: learning $B$ tells you nothing about $A$.
    Events $A_1, \ldots, A_n$ are (mutually) independent if $P\left(\bigcap_{i\in S}A_i\right) = \prod_{i\in S}P(A_i)$ for every subset $S$ of indices.

!!! warning "Independent ≠ disjoint"
    Disjoint events with positive probability are maximally *dependent*: if one happens, the other can't. And pairwise independence doesn't imply mutual independence. Flip two coins, and let $A$ = first is heads, $B$ = second is heads, $C$ = the coins match. Each pair is independent, but $A$ and $B$ together determine $C$.

**Conditional independence:** $P(A\cap B\mid C) = P(A\mid C)P(B\mid C)$. Two symptoms may be correlated in the population but independent *given* the disease. The **naive Bayes classifier** assumes features are conditionally independent given the class, so that

$$
P(\text{class}\mid x_1, \ldots, x_d) \propto P(\text{class})\prod_{j=1}^d P(x_j\mid\text{class}).
$$

The assumption is rarely true, but the classifier works surprisingly well for spam filtering and text classification.

## 6. A famous puzzle: Monty Hall

Three doors: a car behind one, goats behind the others. You pick door 1. The host, who knows where the car is, opens a *different* door with a goat, say door 3. Should you switch to door 2?

Condition carefully. Let $C_i$ = car behind door $i$, each with prior $\frac13$. The host's behavior: if the car is behind 1, he opens 2 or 3 at random; if it's behind 2 he must open 3; if behind 3 he must open 2. So with $O_3$ = "host opens door 3":

$$
P(C_2\mid O_3) = \frac{P(O_3\mid C_2)P(C_2)}{P(O_3)} = \frac{1\cdot\frac13}{\frac12\cdot\frac13 + 1\cdot\frac13 + 0} = \frac23.
$$

Switching wins with probability $\frac23$. The host's action carries information, because he was forced away from the car.

## Check yourself

**1.** Two cards are drawn from a deck without replacement. What's the probability both are aces?

??? success "Solution"
    Chain rule: $\frac{4}{52}\cdot\frac3{51} = \frac{1}{221}$.

**2.** A factory has machines A (60% of output, 2% defective) and B (40%, 5% defective). A random item is defective. What's the probability it came from B?

??? success "Solution"
    $P(\text{def}) = 0.6\cdot0.02 + 0.4\cdot0.05 = 0.032$. $P(B\mid\text{def}) = 0.02/0.032 = 0.625$.

**3.** Prove: if $A$ and $B$ are independent, so are $A$ and $B^c$.

??? success "Solution"
    $P(A\cap B^c) = P(A) - P(A\cap B) = P(A) - P(A)P(B) = P(A)(1 - P(B)) = P(A)P(B^c)$.

**4.** In the medical test example, what false-positive rate would be needed for a positive result to mean at least a 50% chance of disease?

??? success "Solution"
    Need $0.009 \geq f\cdot0.99$, i.e. $f \leq 0.91\%$. Rare diseases need extremely specific tests.

**5.** You flip a fair coin 10 times. Use the union bound to bound the probability that some run of 5 consecutive heads appears.

??? success "Solution"
    There are 6 starting positions, each run has probability $2^{-5}$. Union bound: $\leq 6/32 \approx 0.19$. (The exact answer is about 0.11. The union bound overcounts overlapping runs, but it's a valid upper bound.)

**6.** A spam filter sees the word "prize". $P(\text{prize}\mid\text{spam}) = 0.2$, $P(\text{prize}\mid\text{ham}) = 0.005$, and 30% of email is spam. Find $P(\text{spam}\mid\text{prize})$.

??? success "Solution"
    Odds form: prior odds $0.3/0.7$, likelihood ratio $40$, posterior odds $\approx 17.1$, so the probability is $17.1/18.1 \approx 94.5\%$.
