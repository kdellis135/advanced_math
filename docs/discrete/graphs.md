---
description: "Graph theory for computing: trees, BFS and DFS, DAGs and topological sort, Dijkstra's shortest paths algorithm, and graphs as adjacency matrices."
---

# Graphs

<div class="lesson-meta" markdown>
**Phase 9 · Lesson 3** · ⏱ ~3 hours · Needs: [Logic and proofs](../foundations/logic-and-proofs.md) (induction), [Asymptotics](asymptotics.md); [Matrices](../linear-algebra/matrices.md) and [Eigenvalues](../linear-algebra/eigen.md) for §6
</div>

A graph is the simplest structure that captures *relationships*: road networks, social networks, the web, molecules, dependencies between tasks, and the computational graph of a neural network.

This lesson covers:

1. the core vocabulary;
2. a few proofs that show how graph arguments go;
3. the fundamental search algorithms;
4. the bridge to linear algebra through the adjacency matrix.

## 1. Definitions

!!! definition "Definition: graph"
    A **graph** $G = (V, E)$ is a set of **vertices** $V$ and a set of **edges** $E$, each edge joining two vertices.

    - In a **directed** graph, edges have a direction ($u\to v$).
    - In a **weighted** graph, edges carry numbers (lengths, costs, strengths).

Vocabulary:

| Term | Meaning |
|---|---|
| **degree** $\deg(v)$ | the number of edges at $v$ |
| **path** | a sequence of vertices joined by edges, with no repeated vertex |
| **cycle** | a path that returns to its start |
| **connected** | every pair of vertices is joined by a path |
| $n$, $m$ | $\lvert V\rvert$ and $\lvert E\rvert$ |

!!! theorem "Handshake lemma"
    $\displaystyle\sum_{v\in V}\deg(v) = 2|E|$.

!!! proof "Proof"
    Each edge contributes exactly 2 to the sum, one for each endpoint.

    (Double counting again: count (vertex, edge) incidences two ways.)

!!! example "Example: checking it on a small graph"
    Edges: A–B, A–C, A–D, B–C (so $m = 4$).

    ```text
        B
       / \
      A---C
      |
      D
    ```

    | Vertex | Neighbors | Degree |
    |---|---|---|
    | A | B, C, D | 3 |
    | B | A, C | 2 |
    | C | A, B | 2 |
    | D | A | 1 |
    | | **sum** | **8** $= 2 \times 4$ ✓ |

    The odd-degree vertices are A and D: two of them, an even number.

Corollary: the number of odd-degree vertices is even.

(The even-degree vertices contribute an even amount to a sum that is even, so the odd degrees must also add up to an even number. That needs an even count of them.)

At any party, the number of people who shook an odd number of hands is even.

**Storing a graph in a computer.** Two standard choices:

| | Adjacency **list** | Adjacency **matrix** |
|---|---|---|
| what it stores | for each vertex, a list of its neighbors | an $n\times n$ table of 0s and 1s |
| memory | $O(n + m)$ | $O(n^2)$ |
| "is there an edge $u$–$v$?" | scan $u$'s list: $O(\deg u)$ | look it up: $O(1)$ |
| "list $u$'s neighbors" | $O(\deg u)$ | scan a row: $O(n)$ |
| best for | sparse graphs (most real ones) | dense graphs, and linear algebra (§6) |

A social network with a billion users, each with a few hundred friends, fits as a list. As a matrix it would need $10^{18}$ entries.

## 2. Trees

!!! definition "Definition: tree"
    A **tree** is a connected graph with no cycles.

!!! theorem "Characterization of trees"
    For a graph with $n$ vertices, any two of the following imply the third (and then it's a tree):

    1. connected;
    2. no cycles;
    3. exactly $n - 1$ edges.

    Also: in a tree, there's exactly one path between any two vertices.

Why you need *two* of the three conditions, with 4 vertices:

| Graph | Connected? | No cycles? | Edges | Tree? |
|---|---|---|---|---|
| a path A–B–C–D | ✓ | ✓ | 3 | yes |
| a triangle A–B–C, plus D alone | ✗ | ✗ | 3 | no: right edge count, but the edges are "wasted" on a cycle |
| a square A–B–C–D–A | ✓ | ✗ | 4 | no: one edge too many |
| two separate edges A–B, C–D | ✗ | ✓ | 2 | no: one edge too few |

Any one condition alone can hold for a non-tree.

!!! proof "Proof that a tree has $n - 1$ edges"
    Induction on $n$. *Base:* a single vertex has 0 edges. ✓

    *Step,* for $n\geq2$:

    1. A tree has a **leaf** (a vertex of degree 1). To see this, follow a longest path. Its endpoint can't have another neighbor on the path (that would make a cycle) or off it (that would extend the path).
    2. Remove the leaf and its edge. The rest is still connected and acyclic, so it's a tree on $n - 1$ vertices, with $n - 2$ edges by induction.
    3. Add the leaf back: $n - 1$ edges.

Trees are the minimal connected structures:

- remove any edge and they disconnect;
- add any edge and you create a cycle.

Every connected graph contains a **spanning tree**. Finding a minimum-weight one (Kruskal's or Prim's algorithm) is a classic greedy problem.

## 3. Searching a graph: BFS and DFS

**Breadth-first search (BFS):** explore from a start vertex $s$ in layers, using a queue.

1. All neighbors of $s$;
2. then their unvisited neighbors;
3. and so on.

!!! example "Example: BFS on a small graph"
    Edges: $s$–$a$, $s$–$b$, $a$–$c$, $b$–$c$, $c$–$d$.

    ```text
        a
       / \
      s   c---d
       \ /
        b
    ```

    | Step | Take from queue | Newly discovered (added to queue) | Queue after |
    |---|---|---|---|
    | 0 | | $s$ (layer 0) | $s$ |
    | 1 | $s$ | $a, b$ (layer 1) | $a, b$ |
    | 2 | $a$ | $c$ (layer 2) | $b, c$ |
    | 3 | $b$ | nothing ($s$ and $c$ already seen) | $c$ |
    | 4 | $c$ | $d$ (layer 3) | $d$ |
    | 5 | $d$ | nothing | empty |

    Each vertex's layer is its distance from $s$: $d$ is 3 edges away, via $s \to a \to c \to d$.

    The queue is what makes it work: first in, first out, so all of layer 1 is processed before anything in layer 2.

!!! theorem "BFS finds shortest paths in unweighted graphs"
    The layer in which BFS first reaches $v$ equals the minimum number of edges on a path from $s$ to $v$.

!!! proof "Proof"
    By induction on the distance $d$. Vertices at distance 0 (just $s$) are in layer 0.

    Suppose every vertex at distance $d$ is found in layer $d$, and take $v$ at distance $d + 1$.

    1. $v$ has a neighbor $u$ at distance $d$ (the second-to-last vertex of a shortest path), found in layer $d$.
    2. When $u$ is processed, $v$ gets added to layer $d + 1$, unless it was found earlier.
    3. It can't have been found in a layer $\leq d$, because that would give a path from $s$ shorter than $d + 1$.

**Depth-first search (DFS):** go as deep as possible along one path before backtracking (a stack, or recursion). It:

- detects cycles;
- finds connected components;
- produces a **topological order** of a directed acyclic graph.

Both visit every vertex and edge once: $O(n + m)$ time.

On the same graph, DFS from $s$ (taking neighbors alphabetically) goes $s \to a \to c \to b$, finds $b$'s neighbors all visited, backs up to $c$, then goes to $d$. Visit order: $s, a, c, b, d$.

| | BFS | DFS |
|---|---|---|
| data structure | queue (first in, first out) | stack or recursion (last in, first out) |
| shape of exploration | ripples outward in layers | dives down one path, then backtracks |
| visit order above | $s, a, b, c, d$ | $s, a, c, b, d$ |
| good for | shortest paths (unweighted) | cycles, components, topological order |

## 4. Directed acyclic graphs and topological order

A **DAG** (directed acyclic graph) is a directed graph with no directed cycles. Examples:

- task dependencies;
- course prerequisites (like the [roadmap](../start/roadmap.md) of this site);
- spreadsheet formulas;
- **the computational graph of a neural network**.

!!! theorem "Every DAG has a topological order"
    The vertices of a DAG can be listed so that every edge points forward ($u\to v$ implies $u$ comes before $v$).

!!! proof "Proof"
    1. A DAG has a vertex with no incoming edges. If not, walk backwards along incoming edges forever: with finitely many vertices you'd revisit one, which is a cycle.
    2. Put that vertex first and remove it. What's left is still a DAG.
    3. Repeat.

!!! example "Example: ordering courses"
    Prerequisites: Calculus → Multivariable, Linear algebra → Multivariable, Multivariable → ML, Probability → ML.

    The proof is an algorithm: repeatedly take a vertex with no remaining incoming edges.

    | Step | Vertices with no incoming edges | Take | Edges removed |
    |---|---|---|---|
    | 1 | Calculus, Linear algebra, Probability | Calculus | Calculus → Multivariable |
    | 2 | Linear algebra, Probability | Linear algebra | Linear algebra → Multivariable |
    | 3 | Probability, Multivariable | Probability | Probability → ML |
    | 4 | Multivariable | Multivariable | Multivariable → ML |
    | 5 | ML | ML | |

    Order: Calculus, Linear algebra, Probability, Multivariable, ML. Every prerequisite comes before the course that needs it.

    At steps 1–3 there was a choice, so topological orders usually aren't unique.

    If the graph had a cycle (A needs B, B needs A), at some step no vertex would be free, and the algorithm would get stuck. That's how it detects cycles.

**This is exactly how backpropagation is scheduled:**

- the forward pass evaluates nodes in topological order;
- the backward pass goes in reverse topological order, so that each node's gradient is complete before it's passed on ([Jacobians and backprop](../multivariable/chain-rule.md#3-computational-graphs)).

## 5. Shortest paths with weights: Dijkstra

With non-negative edge weights, **Dijkstra's algorithm** maintains tentative distances $d(v)$:

1. Start with $d(s) = 0$, and $d(v) = \infty$ otherwise.
2. **Finalize** the unfinalized vertex $v$ with the smallest $d$.
3. **Relax** its outgoing edges: $d(w)\leftarrow\min(d(w), d(v) + \text{weight}(v, w))$.
4. Repeat steps 2–3.

!!! example "Example: Dijkstra by hand"
    Edges (directed, with weights): $s\to a$ 4, $s\to b$ 1, $b\to a$ 2, $a\to t$ 1, $b\to t$ 5.

    Each row finalizes one vertex (bold) and relaxes its edges:

    | Step | Finalize | $d(s)$ | $d(a)$ | $d(b)$ | $d(t)$ |
    |---|---|---|---|---|---|
    | start | | $0$ | $\infty$ | $\infty$ | $\infty$ |
    | 1 | $s$ | $\mathbf 0$ | $4$ | $1$ | $\infty$ |
    | 2 | $b$ | | $\min(4, 1 + 2) = 3$ | $\mathbf 1$ | $1 + 5 = 6$ |
    | 3 | $a$ | | $\mathbf 3$ | | $\min(6, 3 + 1) = 4$ |
    | 4 | $t$ | | | | $\mathbf 4$ |

    The shortest path to $t$ is $s\to b\to a\to t$, length $1 + 2 + 1 = 4$.

    The direct-looking routes are worse: $s\to a\to t$ costs 5 and $s\to b\to t$ costs 6. Dijkstra found the detour because it always expands the closest unfinished vertex first.

!!! proof "Why it's correct (sketch)"
    Invariant: when $v$ is finalized, $d(v)$ is the true distance.

    Suppose the shortest path to $v$ leaves the finalized set at some edge $x\to y$.

    1. $d(y)\leq\text{dist}(y)\leq\text{dist}(v)$, since weights are non-negative and $y$ lies on the path before $v$.
    2. $v$ was chosen with the smallest $d$, so $d(v)\leq d(y)\leq\text{dist}(v)$.
    3. $d(v)\geq\text{dist}(v)$ always holds (it's the length of an actual path).
    4. So $d(v) = \text{dist}(v)$.

    With a negative edge this argument breaks, which is why Bellman–Ford is needed then.

With a binary heap it runs in $O((n + m)\log n)$.

## 6. Graphs as matrices

The **adjacency matrix** $A$ of a graph on $n$ vertices has $A_{ij} = 1$ if there's an edge from $i$ to $j$, else 0.

It's symmetric for undirected graphs.

!!! theorem "Powers count walks"
    $(A^k)_{ij}$ is the number of walks of length $k$ from $i$ to $j$.

!!! proof "Proof"
    Induction on $k$. For $k = 1$ it's the definition. Then

    $$
    (A^{k+1})_{ij} = \sum_\ell(A^k)_{i\ell}A_{\ell j}.
    $$

    A walk of length $k + 1$ from $i$ to $j$ is a walk of length $k$ from $i$ to some $\ell$, followed by an edge $\ell\to j$. Sum over all possible $\ell$.

!!! example "Example: counting triangles with matrix powers"
    The triangle graph (3 vertices, all joined):

    $$
    A = \begin{pmatrix}0&1&1\\1&0&1\\1&1&0\end{pmatrix}, \qquad A^2 = \begin{pmatrix}2&1&1\\1&2&1\\1&1&2\end{pmatrix}, \qquad A^3 = \begin{pmatrix}2&3&3\\3&2&3\\3&3&2\end{pmatrix}.
    $$

    - $(A^2)_{11} = 2$: the walks $1\to2\to1$ and $1\to3\to1$. In general the diagonal of $A^2$ is the degrees.
    - $(A^3)_{11} = 2$: the walks $1\to2\to3\to1$ and $1\to3\to2\to1$, the triangle in both directions.

    A closed walk of length 3 *is* a triangle. Each triangle is counted once for each of its 3 starting vertices and 2 directions, so

    $$
    \text{number of triangles} = \frac{\operatorname{tr}(A^3)}{6} = \frac{6}{6} = 1.
    $$

So linear algebra answers graph questions.

The **graph Laplacian** $L = D - A$ (where $D$ is the diagonal matrix of degrees) is symmetric and PSD, since

$$
\vv x^\top L\vv x = \sum_{\text{edges } ij}(x_i - x_j)^2\geq0.
$$

Its eigenvalues reveal structure:

- The number of zero eigenvalues of $L$ equals the number of **connected components**.
    - Proof: $\vv x^\top L\vv x = 0$ forces $x_i = x_j$ across every edge, so $\vv x$ is constant on each component.
- The eigenvectors for the next-smallest eigenvalues vary slowly across the graph.
    - Using them as coordinates and clustering is **spectral clustering**.

!!! example "Example: the Laplacian of a path"
    For the path $1 - 2 - 3$, the degrees are $(1, 2, 1)$:

    $$
    L = D - A = \begin{pmatrix}1&0&0\\0&2&0\\0&0&1\end{pmatrix} - \begin{pmatrix}0&1&0\\1&0&1\\0&1&0\end{pmatrix} = \begin{pmatrix}1&-1&0\\-1&2&-1\\0&-1&1\end{pmatrix}.
    $$

    Take $\vv x = (1, 2, 4)$, a number on each vertex. The edge formula gives

    $$
    \vv x^\top L\vv x = (x_1 - x_2)^2 + (x_2 - x_3)^2 = 1 + 4 = 5.
    $$

    Read $\vv x^\top L\vv x$ as "how much $\vv x$ jumps across edges." It's 0 exactly when $\vv x$ is constant along every edge, like $(1, 1, 1)$.

    | Graph | Eigenvalues of $L$ | Zero eigenvalues | Components |
    |---|---|---|---|
    | path $1 - 2 - 3$ | $0, 1, 3$ | 1 | 1 |
    | two separate edges $1 - 2$, $3 - 4$ | $0, 0, 2, 2$ | 2 | 2 |

!!! ml "Where this shows up"
    - **Graph neural networks** update each node from its neighbors: $H' = \sigma(\hat AHW)$, where $\hat A$ is a normalized adjacency matrix.
        - One layer mixes information along edges; $k$ layers mix it along walks of length $k$ (the powers-count-walks theorem).
    - **Computational graphs** are DAGs, processed in topological order by autodiff.
    - **PageRank** is the dominant eigenvector of the web's (normalized) adjacency matrix.
    - **Knowledge graphs, molecules, recommendation (user–item bipartite graphs), and road networks for routing** are all graph problems.

## Check yourself

**1.** A graph has 10 vertices, each of degree 3. How many edges does it have?

??? success "Solution"
    $\sum\deg = 30 = 2m$, so $m = 15$.

**2.** Can a graph have 7 vertices each of degree 3?

??? success "Solution"
    No: the degree sum would be 21, which is odd, but it must be $2m$.

**3.** A connected graph has 20 vertices and 19 edges. Must it be a tree?

??? success "Solution"
    Yes: connected with $n - 1$ edges implies acyclic, by the characterization theorem.

**4.** For the path graph $1 - 2 - 3$, compute $A^2$ and interpret $(A^2)_{11}$ and $(A^2)_{13}$.

??? success "Solution"
    $$
    A = \begin{pmatrix}0&1&0\\1&0&1\\0&1&0\end{pmatrix}, \qquad A^2 = \begin{pmatrix}1&0&1\\0&2&0\\1&0&1\end{pmatrix}.
    $$

    - $(A^2)_{11} = 1$: the walk $1\to2\to1$.
    - $(A^2)_{13} = 1$: the walk $1\to2\to3$.

**5.** Give a topological order of: $a\to b$, $a\to c$, $b\to d$, $c\to d$, $d\to e$.

??? success "Solution"
    $a, b, c, d, e$ (or $a, c, b, d, e$).

**6.** Show with a small example why Dijkstra can fail with a negative edge.

??? success "Solution"
    | Edge | Weight |
    |---|---|
    | $s\to a$ | 2 |
    | $s\to b$ | 3 |
    | $b\to a$ | $-2$ |

    Dijkstra finalizes $a$ at distance 2, but the path $s\to b\to a$ has length 1.
