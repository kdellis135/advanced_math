# Number theory for computing

<div class="lesson-meta" markdown>
**Phase 9 · Lesson 4** · ⏱ ~3 hours · Needs: [Logic and proofs](../foundations/logic-and-proofs.md)
</div>

Integers and remainders are the native arithmetic of computers:

- fixed-width integers wrap around modulo $2^{64}$;
- hash tables index modulo a table size;
- public-key cryptography is built on modular arithmetic with huge numbers.

This lesson builds the toolkit (divisibility, Euclid's algorithm, modular inverses, Fermat's little theorem) and ends with RSA, which you'll be able to verify yourself.

## 1. Divisibility and the division algorithm

$a\mid b$ ("$a$ divides $b$") means $b = ak$ for some integer $k$.

!!! theorem "Division algorithm"
    For integers $a$ and $b > 0$, there are unique integers $q$ (quotient) and $r$ (remainder) with $a = qb + r$ and $0\leq r < b$. We write $r = a\bmod b$.

A **prime** is an integer $p\geq2$ whose only positive divisors are 1 and $p$.

- Every integer $\geq2$ factors into primes ([proved by strong induction](../foundations/logic-and-proofs.md#34-proof-by-induction)), uniquely up to order.
- There are infinitely many primes (Euclid, same lesson).

## 2. GCD and Euclid's algorithm

The **greatest common divisor** $\gcd(a, b)$ is the largest integer dividing both.

!!! theorem "Euclid's key lemma"
    $\gcd(a, b) = \gcd(b, a\bmod b)$.

!!! proof "Proof"
    Let $r = a - qb$.

    - Any common divisor of $a$ and $b$ divides $r$ (it divides both terms).
    - Conversely, any common divisor of $b$ and $r$ divides $a = qb + r$.

    So the two pairs have the same set of common divisors, hence the same greatest one.

**Euclid's algorithm:** repeat $(a, b)\leftarrow(b, a\bmod b)$ until $b = 0$; then $a$ is the gcd.

!!! example "Example"
    $\gcd(252, 105)$:

    1. $252 = 2\cdot105 + 42$
    2. $105 = 2\cdot42 + 21$
    3. $42 = 2\cdot21 + 0$

    So the gcd is 21.

**It's fast:** every two steps at least halve the larger number.

- If $b\leq a/2$, then $a\bmod b < b\leq a/2$.
- Otherwise, $a\bmod b = a - b < a/2$.

So it takes $O(\log a)$ steps, even for 2048-bit numbers. That's what makes RSA practical.

!!! theorem "Bézout's identity"
    There are integers $x, y$ with $ax + by = \gcd(a, b)$.

**Extended Euclid** finds them by running the algorithm backwards. From the example:

$$
21 = 105 - 2\cdot42 = 105 - 2(252 - 2\cdot105) = 5\cdot105 - 2\cdot252.
$$

## 3. Modular arithmetic

!!! definition "Definition: congruence"
    $a\equiv b\pmod n$ means $n\mid(a - b)$: $a$ and $b$ have the same remainder mod $n$.

Congruence respects addition and multiplication: if $a\equiv a'$ and $b\equiv b'$, then

- $a + b\equiv a' + b'$;
- $ab\equiv a'b'$. (Proof: $ab - a'b' = a(b - b') + b'(a - a')$, and both terms are multiples of $n$.)

So **you can reduce mod $n$ at every step** of a computation, keeping numbers small.

- Clock arithmetic is mod 12.
- Unsigned 64-bit integer arithmetic is mod $2^{64}$.

**Fast exponentiation:** compute $a^k\bmod n$ by repeated squaring.

1. Compute $a\to a^2\to a^4\to a^8\to\cdots$ (mod $n$).
2. Multiply together the powers that match the binary digits of $k$.

That's $O(\log k)$ multiplications. $3^{100}\bmod7$ needs only about 8.

### Inverses

!!! theorem "Modular inverse"
    $a$ has a multiplicative inverse mod $n$ (some $x$ with $ax\equiv1\pmod n$) if and only if $\gcd(a, n) = 1$.

!!! proof "Proof"
    - If $\gcd(a, n) = 1$, Bézout gives $ax + ny = 1$, so $ax\equiv1\pmod n$.
    - Conversely, if $ax\equiv1$, then $ax - 1 = ny$, and any common divisor of $a$ and $n$ divides 1.

So if $p$ is prime, every nonzero number mod $p$ is invertible.

Arithmetic mod $p$ is a **field**: you can add, subtract, multiply and divide.

## 4. Fermat's little theorem

!!! theorem "Fermat's little theorem"
    If $p$ is prime and $p\nmid a$, then $a^{p-1}\equiv1\pmod p$.

!!! proof "Proof"
    Consider the $p - 1$ numbers $a, 2a, 3a, \ldots, (p-1)a$ mod $p$.

    - They're all nonzero, since $p\nmid a$ and $p\nmid k$.
    - They're all distinct: if $ia\equiv ja$, multiply by $a^{-1}$ to get $i\equiv j$.
    - So they are $1, 2, \ldots, p-1$ in some order.

    Multiply them all together:

    $$
    a^{p-1}\,(p-1)!\equiv(p-1)!\pmod p.
    $$

    $(p-1)!$ is invertible mod $p$ (a product of invertibles), so cancel it.

**Euler's generalization:** if $\gcd(a, n) = 1$, then $a^{\varphi(n)}\equiv1\pmod n$.

- $\varphi(n)$ counts the integers in $1..n$ coprime to $n$.
- The same proof works, using only those integers.
- For $n = pq$ with distinct primes, $\varphi(n) = (p-1)(q-1)$.

## 5. RSA

**Key generation:**

1. Pick large primes $p, q$.
2. Set $n = pq$ and $\varphi = (p-1)(q-1)$.
3. Choose $e$ coprime to $\varphi$ (commonly 65537).
4. Compute $d = e^{-1}\bmod\varphi$ with extended Euclid.

| Key | Value |
|---|---|
| **public** | $(n, e)$ |
| **private** | $d$ |

| Operation | Formula |
|---|---|
| **encrypt** | $c = m^e\bmod n$ |
| **decrypt** | $m = c^d\bmod n$ |

!!! theorem "RSA decrypts correctly"
    $(m^e)^d\equiv m\pmod n$.

!!! proof "Proof (for $\gcd(m, n) = 1$)"
    1. $ed\equiv1\pmod\varphi$, so $ed = 1 + k\varphi$ for some $k$.
    2. Then $m^{ed} = m\cdot(m^{\varphi})^k\equiv m\cdot1^k = m\pmod n$, by Euler's theorem.

    (The case $\gcd(m, n) > 1$ works too, using the Chinese remainder theorem. It's vanishingly unlikely in practice.)

!!! example "Toy RSA"
    | Step | Value |
    |---|---|
    | primes | $p = 5$, $q = 11$ |
    | modulus | $n = 55$, $\varphi = 40$ |
    | public exponent | $e = 3$ |
    | private exponent | $d = 27$, since $3\cdot27 = 81 = 2\cdot40 + 1$ |
    | encrypt $m = 7$ | $7^3 = 343 = 6\cdot55 + 13$, so $c = 13$ |
    | decrypt | $13^{27}\bmod55 = 7$ (verify with repeated squaring!) |

**Why it's secure:**

- Computing $d$ requires $\varphi(n)$, which requires factoring $n$.
- Multiplying two 1024-bit primes is instant; factoring their product is believed infeasible for classical computers.

Shor's algorithm on a large quantum computer would break it, using the Fourier transform to find periods. That's why post-quantum cryptography is being deployed.

!!! ml "Where this shows up"
    - **Hashing:** hash tables, Bloom filters and the "hashing trick" for features use $h(x)\bmod m$.
        - Random hash families like $((ax + b)\bmod p)\bmod m$ with prime $p$ have provable collision guarantees.
    - **Pseudo-random number generators** (behind every random initialization and dropout mask) are built from modular arithmetic and bit operations.
    - **Cryptography for ML:** secure aggregation in federated learning and homomorphic encryption for private inference rely on modular arithmetic over large primes and polynomial rings.
    - **Error-correcting codes and checksums** (CRC, Reed–Solomon) are arithmetic in finite fields.

## Check yourself

**1.** Compute $\gcd(1071, 462)$ with Euclid's algorithm, and find Bézout coefficients.

??? success "Solution"
    1. $1071 = 2\cdot462 + 147$
    2. $462 = 3\cdot147 + 21$
    3. $147 = 7\cdot21$

    The gcd is 21. Back-substitute:

    $$
    21 = 462 - 3\cdot147 = 462 - 3(1071 - 2\cdot462) = 7\cdot462 - 3\cdot1071.
    $$

**2.** Find the inverse of 7 mod 26.

??? success "Solution"
    Euclid:

    1. $26 = 3\cdot7 + 5$
    2. $7 = 5 + 2$
    3. $5 = 2\cdot2 + 1$

    Back-substitute:

    $$
    1 = 5 - 2\cdot2 = 5 - 2(7 - 5) = 3\cdot5 - 2\cdot7 = 3(26 - 3\cdot7) - 2\cdot7 = 3\cdot26 - 11\cdot7.
    $$

    So $7^{-1}\equiv-11\equiv15$. Check: $7\cdot15 = 105 = 4\cdot26 + 1$. ✓

**3.** Compute $3^{100}\bmod7$ using Fermat.

??? success "Solution"
    - Fermat: $3^6\equiv1\pmod 7$.
    - $100 = 6\cdot16 + 4$.
    - So $3^{100}\equiv3^4 = 81\equiv4\pmod 7$.

**4.** What day of the week will it be 1000 days after a Monday?

??? success "Solution"
    - $1000\bmod7 = 6$, since $7\cdot142 = 994$.
    - Monday + 6 days = Sunday.

**5.** In the toy RSA example, verify that decrypting $c = 13$ gives back 7.

??? success "Solution"
    Repeated squaring mod 55:

    | Power | Value mod 55 |
    |---|---|
    | $13^2 = 169$ | $4$ |
    | $13^4$ | $16$ |
    | $13^8 = 256$ | $36$ |
    | $13^{16} = 1296$ | $31$ |

    $27 = 16 + 8 + 2 + 1$, so $13^{27}\equiv31\cdot36\cdot4\cdot13$:

    1. $31\cdot36 = 1116\equiv16$
    2. $16\cdot4 = 64\equiv9$
    3. $9\cdot13 = 117\equiv7$ ✓

**6.** Why must $e$ be coprime to $\varphi(n)$ in RSA?

??? success "Solution"
    So that $e$ has an inverse $d$ mod $\varphi(n)$ (modular inverse theorem).

    Without one, decryption isn't possible.
