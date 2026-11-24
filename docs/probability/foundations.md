# Probability, conditioning and Bayes

<div class="lesson-meta" markdown>
**Phase 5 · Lesson 2** · ⏱ ~3.5 hours · Needs: [Counting](counting.md), [Sets](../foundations/sets-functions.md)
</div>

Probability theory starts from three simple axioms.

Its most important concept is **conditioning**: how probabilities change when you learn something.

Bayes' theorem, which reverses conditional probabilities, is the mathematical form of learning from evidence. It also explains why most people misjudge medical test results.

## 1. The setup

!!! definition "Definition: probability space"
    - The **sample space** $\Omega$ is the set of all possible outcomes.
    - An **event** is a subset $A\subseteq\Omega$.
    - A **probability** $P$ assigns a number to each event, satisfying the **axioms**:
        1. $P(A) \geq 0$;
        2. $P(\Omega) = 1$;
        3. if $A_1, A_2, \ldots$ are disjoint, $P(A_1\cup A_2\cup\cdots) = P(A_1) + P(A_2) + \cdots$.

!!! example "Example: sample spaces and events"
    | Experiment | Sample space $\Omega$ | An event |
    |---|---|---|
    | flip a coin | $\{H, T\}$ | "heads" $= \{H\}$ |
    | roll a die | $\{1, 2, 3, 4, 5, 6\}$ | "even" $= \{2, 4, 6\}$ |
    | roll two dice | all 36 pairs $(i, j)$ | "sum is 7" $= \{(1,6), (2,5), (3,4), (4,3), (5,2), (6,1)\}$ |
    | wait for a bus | $[0, \infty)$ (minutes) | "more than 5 minutes" $= (5, \infty)$ |

    For two dice, picture a $6 \times 6$ grid: rows for the first die, columns for the second. Every event is a set of cells. "Sum is 7" is the anti-diagonal.

**When all outcomes are equally likely** (and there are finitely many), the axioms force

$$
P(A) = \frac{\lvert A\rvert}{\lvert\Omega\rvert} = \frac{\text{favorable outcomes}}{\text{all outcomes}}.
$$

(Each of the $N$ outcomes has the same probability $p$, and axioms 2 and 3 give $Np = 1$. An event with $k$ outcomes then has probability $kp = k/N$.) For example, $P(\text{sum is 7}) = \frac{6}{36} = \frac16$. That's why [counting](counting.md) came first.

Everything else is a theorem. Events are sets, so set operations are logic:

| Set | Event |
|---|---|
| $A\cup B$ | "$A$ or $B$" |
| $A\cap B$ | "$A$ and $B$" |
| $A^c$ | "not $A$" |

!!! theorem "Basic consequences"
    1. $P(A^c) = 1 - P(A)$, and $P(\varnothing) = 0$.
    2. If $A\subseteq B$ then $P(A) \leq P(B)$.
    3. $P(A\cup B) = P(A) + P(B) - P(A\cap B)$.
    4. **Union bound:** $P(A_1\cup\cdots\cup A_n) \leq P(A_1) + \cdots + P(A_n)$.

!!! proof "Proof"
    1. $A$ and $A^c$ are disjoint with union $\Omega$, so $P(A) + P(A^c) = 1$.
    2. $B = A\cup(B\setminus A)$ disjointly, so $P(B) = P(A) + P(B\setminus A) \geq P(A)$.
    3. $A\cup B = A \cup (B\setminus A)$ disjointly, and $P(B\setminus A) = P(B) - P(A \cap B)$.
    4. From (3) by induction, since $P(A\cap B) \geq 0$.

!!! example "Example: the complement trick"
    Roll a die 4 times. What's the probability of at least one six?

    "At least one" splits into many cases (exactly one six, exactly two, …). The complement, "no sixes at all," is a single case:

    $$
    P(\text{no six}) = \left(\tfrac56\right)^4 \approx 0.482, \qquad P(\text{at least one six}) = 1 - 0.482 = 0.518.
    $$

    (Each roll avoids a six with probability $\frac56$, and the rolls don't affect each other, so the probabilities multiply. Section 5 makes "don't affect each other" precise.)

    **Whenever you see "at least one," try the complement.**

The **union bound** is crude but powerful: it requires no independence.

It's the workhorse of learning theory: "the probability that *any* of these $n$ bad things happens is at most $n$ times the worst one."

## 2. Conditional probability

!!! definition "Definition: conditional probability"
    For $P(B) > 0$:

    $$
    P(A\mid B) = \frac{P(A\cap B)}{P(B)}.
    $$

    Read $P(A \mid B)$ as "the probability of $A$ **given** $B$."

!!! intuition "Zoom into B"
    1. Knowing $B$ happened shrinks the world to $B$.
    2. Within it, $A$ occupies the part $A\cap B$.
    3. Divide by $P(B)$ to renormalize, so the new world has total probability 1.

!!! example "Example"
    Roll two dice.

    $$
    P(\text{sum} = 8 \mid \text{first die is } 3) = \frac{P(\text{first} = 3, \text{second} = 5)}{P(\text{first} = 3)} = \frac{1/36}{1/6} = \frac16.
    $$

    In the grid picture: knowing the first die is 3 restricts us to one row of 6 cells. Only the cell $(3, 5)$ has sum 8. So it's 1 out of 6.

    Without the information, $P(\text{sum} = 8) = \frac{5}{36}$ (the cells $(2,6), (3,5), (4,4), (5,3), (6,2)$). Learning the first die changed the probability from $\frac{5}{36} \approx 0.14$ to $\frac16 \approx 0.17$.

!!! example "Example: conditioning in a table"
    200 emails, classified two ways:

    | | contains a link | no link | total |
    |---|---|---|---|
    | spam | 45 | 15 | 60 |
    | not spam | 35 | 105 | 140 |
    | total | 80 | 120 | 200 |

    - $P(\text{spam}) = \frac{60}{200} = 0.3$.
    - $P(\text{spam} \mid \text{link}) = \frac{45}{80} \approx 0.56$: restrict to the "link" column.
    - $P(\text{link} \mid \text{spam}) = \frac{45}{60} = 0.75$: restrict to the "spam" row.

!!! warning "$P(A\mid B)$ and $P(B \mid A)$ are different"
    In the table, $P(\text{link}\mid\text{spam}) = 0.75$ but $P(\text{spam}\mid\text{link}) \approx 0.56$. They share the numerator (45) but divide by different totals.

    A starker example: most professional basketball players are tall, so $P(\text{tall} \mid \text{NBA})$ is near 1. But $P(\text{NBA}\mid\text{tall})$ is tiny. Confusing the two is called the **prosecutor's fallacy**. Bayes' theorem (Section 4) is the correct way to convert one into the other.

Rearranging gives the **multiplication rule** $P(A\cap B) = P(B)\,P(A\mid B)$.

Its extension is the **chain rule of probability**:

$$
P(A_1\cap A_2\cap\cdots\cap A_n) = P(A_1)\,P(A_2\mid A_1)\,P(A_3\mid A_1\cap A_2)\cdots P(A_n\mid A_1\cap\cdots\cap A_{n-1}).
$$

!!! ml "This is how language models work"
    An autoregressive language model writes the probability of a text $w_1w_2\ldots w_n$ using exactly the chain rule:

    $$
    P(w_1, \ldots, w_n) = \prod_i P(w_i\mid w_1, \ldots, w_{i-1}).
    $$

    - The network predicts each conditional factor: the next token given the previous ones.
    - Training maximizes the log of this product, a sum of per-token log-probabilities.

## 3. The law of total probability

!!! theorem "Law of total probability"
    If $B_1, \ldots, B_n$ partition $\Omega$ (disjoint, union $\Omega$), then

    $$
    P(A) = \sum_{i=1}^n P(A\mid B_i)\,P(B_i).
    $$

!!! proof "Proof"
    $A = \bigcup_i(A\cap B_i)$ disjointly, so $P(A) = \sum_iP(A\cap B_i) = \sum_iP(A\mid B_i)P(B_i)$.

Strategy: **condition on whatever would make the problem easy**, then average over the cases.

Picture it as a **tree**: first branch on which $B_i$ happens (with probabilities $P(B_i)$), then on whether $A$ happens (with probabilities $P(A\mid B_i)$). Multiply along each path, and add the paths that end in $A$.

!!! example "Example: two bags of marbles"
    Flip a fair coin. Heads: draw from bag 1 (3 red, 1 blue). Tails: draw from bag 2 (1 red, 3 blue). What's $P(\text{red})$?

    | Path | Probability |
    |---|---|
    | heads, then red | $\frac12 \cdot \frac34 = \frac38$ |
    | tails, then red | $\frac12 \cdot \frac14 = \frac18$ |

    $P(\text{red}) = \frac38 + \frac18 = \frac12$.

    Without conditioning on the coin, the problem is awkward. Given the coin, each bag is trivial.

## 4. Bayes' theorem

!!! theorem "Bayes' theorem"
    $$
    P(B\mid A) = \frac{P(A\mid B)\,P(B)}{P(A)} = \frac{P(A\mid B)\,P(B)}{\sum_jP(A\mid B_j)P(B_j)}.
    $$

!!! proof "Proof"
    Both $P(B\mid A)P(A)$ and $P(A\mid B)P(B)$ equal $P(A\cap B)$.

    Divide by $P(A)$, and expand $P(A)$ by total probability.

In inference language: $B$ is a **hypothesis**, $A$ the **evidence**.

Continuing the marble example: you drew a red marble. What's the probability the coin was heads? The tree already has the numbers:

$$
P(\text{heads}\mid\text{red}) = \frac{P(\text{heads, then red})}{P(\text{red})} = \frac{3/8}{1/2} = \frac34.
$$

Red marbles are more common in bag 1, so seeing red shifts belief toward heads, from $\frac12$ to $\frac34$. That shift is Bayes' theorem in action.

$$
\underbrace{P(H\mid E)}_{\text{posterior}} = \frac{\overbrace{P(E\mid H)}^{\text{likelihood}}\ \overbrace{P(H)}^{\text{prior}}}{\underbrace{P(E)}_{\text{evidence}}}.
$$

!!! example "The medical test"
    | Fact | Value |
    |---|---|
    | disease prevalence | 1% |
    | test catches (sensitivity) | 90% of cases |
    | false-positive rate | 9% |

    You test positive. What's the chance you're sick?

    Step by step:

    1. Hypotheses: sick ($P = 0.01$) or healthy ($P = 0.99$).
    2. Likelihoods of the evidence "+": $P(+\mid\text{sick}) = 0.9$, $\ P(+\mid\text{healthy}) = 0.09$.
    3. Total probability of "+": $\ 0.9 \times 0.01 + 0.09 \times 0.99 = 0.009 + 0.0891 = 0.0981$.
    4. Bayes: the "sick" path's share of that total.

    $$
    P(\text{sick}\mid+) = \frac{0.9\times0.01}{0.9\times0.01 + 0.09\times0.99} = \frac{0.009}{0.009 + 0.0891} \approx 9.2\%.
    $$

    Only about 9%! Most doctors guess around 80–90%.

    The intuition, among 1000 people:

    | Group | People | Test positive |
    |---|---|---|
    | sick | 10 | 9 |
    | healthy | 990 | 89 |

    The positives are dominated by the false alarms from the big healthy group.

<div class="viz" data-viz="bayes"></div>

!!! intuition "Bayes in odds form"
    The **odds** of an event are $\frac{p}{1 - p}$: "for every 1 time it fails, how many times does it happen?" Probability $0.2$ is odds $0.25$, written $1:4$. To convert back, $p = \frac{\text{odds}}{1 + \text{odds}}$: odds $10:99$ means $p = \frac{10}{109} \approx 0.092$.

    Divide Bayes' theorem for $H$ by Bayes' theorem for $\neg H$ ("not $H$"). The awkward denominator $P(E)$ cancels:

    $$
    \frac{P(H\mid E)}{P(\neg H\mid E)} = \frac{P(H)}{P(\neg H)}\times\frac{P(E\mid H)}{P(E\mid\neg H)}.
    $$

    **Posterior odds = prior odds × likelihood ratio.** Here:

    - prior odds: $1:99$;
    - likelihood ratio: $0.9/0.09 = 10$;
    - posterior odds: $10:99$, i.e. about 9%.

    A second independent positive test multiplies the odds by 10 again: $100:99$, about 50%.

## 5. Independence

!!! definition "Definition: independence"
    $A$ and $B$ are **independent** if $P(A\cap B) = P(A)P(B)$.

    Equivalently (when $P(B) > 0$), $P(A\mid B) = P(A)$: learning $B$ tells you nothing about $A$.

    Events $A_1, \ldots, A_n$ are (mutually) independent if $P\left(\bigcap_{i\in S}A_i\right) = \prod_{i\in S}P(A_i)$ for every subset $S$ of indices.

!!! example "Example: checking independence with two dice"
    - $A$ = "first die is even" ($P = \frac12$), $B$ = "second die is 6" ($P = \frac16$). $A \cap B$ has 3 cells: $(2,6), (4,6), (6,6)$, so $P = \frac{3}{36} = \frac{1}{12} = \frac12\cdot\frac16$. **Independent.** (Physically separate dice.)
    - $A$ = "first die is 6" ($P = \frac16$), $C$ = "sum is at least 10" ($P = \frac{6}{36} = \frac16$). $A\cap C = \{(6,4), (6,5), (6,6)\}$, so $P = \frac{3}{36} = \frac{1}{12} \neq \frac{1}{36}$. **Dependent:** a high first die makes a high sum more likely. Indeed $P(C\mid A) = \frac12$, three times $P(C)$.

    Independence is a numerical fact you check, not something you can always see. But when events come from physically unconnected processes (separate dice, separate coin flips), it's a safe modeling assumption.

!!! warning "Independent ≠ disjoint"
    - Disjoint events with positive probability are maximally *dependent*: if one happens, the other can't.
    - Pairwise independence doesn't imply mutual independence. Flip two coins, and let $A$ = first is heads, $B$ = second is heads, $C$ = the coins match. Each pair is independent, but $A$ and $B$ together determine $C$.

**Conditional independence:** $P(A\cap B\mid C) = P(A\mid C)P(B\mid C)$.

Two symptoms may be correlated in the population, but independent *given* the disease.

The **naive Bayes classifier** assumes features are conditionally independent given the class, so that

$$
P(\text{class}\mid x_1, \ldots, x_d) \propto P(\text{class})\prod_{j=1}^d P(x_j\mid\text{class}).
$$

The assumption is rarely true. But the classifier works surprisingly well for spam filtering and text classification.

## 6. A famous puzzle: Monty Hall

Three doors: a car behind one, goats behind the others.

1. You pick door 1.
2. The host, who knows where the car is, opens a *different* door with a goat, say door 3.
3. Should you switch to door 2?

Condition carefully. Let $C_i$ = car behind door $i$, each with prior $\frac13$. The host's behavior:

| Car is behind | Host opens | $P(O_3\mid C_i)$ |
|---|---|---|
| door 1 | 2 or 3 at random | $\frac12$ |
| door 2 | must open 3 | $1$ |
| door 3 | must open 2 | $0$ |

So with $O_3$ = "host opens door 3":

$$
P(C_2\mid O_3) = \frac{P(O_3\mid C_2)P(C_2)}{P(O_3)} = \frac{1\cdot\frac13}{\frac12\cdot\frac13 + 1\cdot\frac13 + 0} = \frac23.
$$

Switching wins with probability $\frac23$.

(The denominator is the total probability of $O_3$, adding the three rows of the table, each weighted by $\frac13$.)

The host's action carries information, because the host was forced away from the car.

!!! intuition "The 100-door version"
    Suppose there are 100 doors. You pick one. The host opens 98 others, all goats, leaving your door and one other.

    Your first pick had a $\frac{1}{100}$ chance. The other door collects the remaining $\frac{99}{100}$: the host had to avoid the car while opening 98 doors, so if the car was anywhere else, it's behind that one door. Switching is now obviously right. Three doors is the same logic, just less dramatic.

## Check yourself

**1.** Two cards are drawn from a deck without replacement. What's the probability both are aces?

??? success "Solution"
    Chain rule: $\frac{4}{52}\cdot\frac3{51} = \frac{1}{221}$.

**2.** A factory has machines A (60% of output, 2% defective) and B (40%, 5% defective). A random item is defective. What's the probability it came from B?

??? success "Solution"
    - Total probability: $P(\text{def}) = 0.6\cdot0.02 + 0.4\cdot0.05 = 0.032$.
    - Bayes: $P(B\mid\text{def}) = 0.02/0.032 = 0.625$.

**3.** Prove: if $A$ and $B$ are independent, so are $A$ and $B^c$.

??? success "Solution"
    $P(A\cap B^c) = P(A) - P(A\cap B) = P(A) - P(A)P(B) = P(A)(1 - P(B)) = P(A)P(B^c)$.

**4.** In the medical test example, what false-positive rate would be needed for a positive result to mean at least a 50% chance of disease?

??? success "Solution"
    Need $0.009 \geq f\cdot0.99$, i.e. $f \leq 0.91\%$.

    Rare diseases need extremely specific tests.

**5.** You flip a fair coin 10 times. Use the union bound to bound the probability that some run of 5 consecutive heads appears.

??? success "Solution"
    - There are 6 starting positions, and each run has probability $2^{-5}$.
    - Union bound: $\leq 6/32 \approx 0.19$.

    The exact answer is about 0.11. The union bound overcounts overlapping runs, but it's a valid upper bound.

**6.** A spam filter sees the word "prize". $P(\text{prize}\mid\text{spam}) = 0.2$, $P(\text{prize}\mid\text{ham}) = 0.005$, and 30% of email is spam. Find $P(\text{spam}\mid\text{prize})$.

??? success "Solution"
    Odds form:

    - prior odds: $0.3/0.7$;
    - likelihood ratio: $0.2/0.005 = 40$;
    - posterior odds: $\approx 17.1$.

    So the probability is $17.1/18.1 \approx 94.5\%$.
