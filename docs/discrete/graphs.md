# Graphs

<div class="lesson-meta" markdown>
**Phase 9 · Lesson 3** · ⏱ ~3 hours · Needs: [Logic and proofs](../foundations/logic-and-proofs.md) (induction), [Asymptotics](asymptotics.md); [Matrices](../linear-algebra/matrices.md) and [Eigenvalues](../linear-algebra/eigen.md) for §6
</div>

A graph is the simplest structure that captures *relationships*: road networks, social networks, the web, molecules, dependencies between tasks, and the computational graph of a neural network. This lesson covers the core vocabulary, a few proofs that show how graph arguments go, the fundamental search algorithms, and the bridge to linear algebra through the adjacency matrix.

## 1. Definitions

!!! definition "Definition: graph"
    A **graph** $G = (V, E)$ is a set of **vertices** $V$ and a set of **edges** $E$, each edge joining two vertices. In a **directed** graph, edges have a direction ($u\to v$). In a **weighted** graph, edges carry numbers (lengths, costs, strengths).

Vocabulary: the **degree** $\deg(v)$ is the number of edges at $v$. A **path** is a sequence of vertices joined by edges, with no repeated vertex. A **cycle** is a path that returns to its start. A graph is **connected** if every pair of vertices is joined by a path. We write $n = |V|$ and $m = |E|$.

!!! theorem "Handshake lemma"
    $\displaystyle\sum_{v\in V}\deg(v) = 2|E|$.

!!! proof "Proof"
    Each edge contributes exactly 2 to the sum, one for each endpoint. (Double counting again: count (vertex, edge) incidences two ways.)

Corollary: the number of odd-degree vertices is even. At any party, the number of people who shook an odd number of hands is even.

## 2. Trees

!!! definition "Definition: tree"
    A **tree** is a connected graph with no cycles.

!!! theorem "Characterization of trees"
    For a graph with $n$ vertices, any two of the following imply the third (and then it's a tree):
    (1) connected; (2) no cycles; (3) exactly $n - 1$ edges.
    Also: in a tree, there's exactly one path between any two vertices.

!!! proof "Proof that a tree has $n - 1$ edges"
    Induction on $n$. A single vertex has 0 edges. ✓ For $n\geq2$: a tree has a **leaf** (a vertex of degree 1). To see this, follow a longest path; its endpoint can't have another neighbor on the path (that would make a cycle) or off it (that would extend the path). Remove the leaf and its edge. The rest is still connected and acyclic, so it's a tree on $n - 1$ vertices, with $n - 2$ edges by induction. Add the leaf back: $n - 1$ edges.

Trees are the minimal connected structures: remove any edge and they disconnect; add any edge and you create a cycle. Every connected graph contains a **spanning tree**, and finding a minimum-weight one (Kruskal's or Prim's algorithm) is a classic greedy problem.

## 3. Searching a graph: BFS and DFS

**Breadth-first search (BFS):** explore from a start vertex $s$ in layers, using a queue. All neighbors of $s$, then their unvisited neighbors, and so on.

!!! theorem "BFS finds shortest paths in unweighted graphs"
    The layer in which BFS first reaches $v$ equals the minimum number of edges on a path from $s$ to $v$.

!!! proof "Proof"
    By induction on the distance $d$. Vertices at distance 0 (just $s$) are in layer 0. Suppose every vertex at distance $d$ is found in layer $d$. A vertex $v$ at distance $d + 1$ has a neighbor $u$ at distance $d$ (the second-to-last vertex of a shortest path), found in layer $d$. When $u$ is processed, $v$ gets added to layer $d + 1$ unless it was found earlier. It can't have been found in a layer $\leq d$, because that would give a path from $s$ shorter than $d + 1$.

**Depth-first search (DFS):** go as deep as possible along one path before backtracking (a stack, or recursion). It detects cycles, finds connected components, and produces a **topological order** of a directed acyclic graph.

Both visit every vertex and edge once: $O(n + m)$ time.

## 4. Directed acyclic graphs and topological order

A **DAG** (directed acyclic graph) is a directed graph with no directed cycles. Examples: task dependencies, course prerequisites (like the [roadmap](../start/roadmap.md) of this site), spreadsheet formulas, and **the computational graph of a neural network**.

!!! theorem "Every DAG has a topological order"
    The vertices of a DAG can be listed so that every edge points forward ($u\to v$ implies $u$ comes before $v$).

!!! proof "Proof"
    A DAG has a vertex with no incoming edges. If not, walk backwards along incoming edges forever: with finitely many vertices you'd revisit one, which is a cycle. Put that vertex first, remove it (what's left is still a DAG), and repeat.

**This is exactly how backpropagation is scheduled:** the forward pass evaluates nodes in topological order, and the backward pass in reverse topological order, so that each node's gradient is complete before it's passed on ([Jacobians and backprop](../multivariable/chain-rule.md#3-computational-graphs)).

## 5. Shortest paths with weights: Dijkstra

With non-negative edge weights, **Dijkstra's algorithm** maintains tentative distances $d(v)$, starting with $d(s) = 0$ and $d(v) = \infty$ otherwise. It repeatedly **finalizes** the unfinalized vertex with the smallest $d$, then **relaxes** its outgoing edges: $d(w)\leftarrow\min(d(w), d(v) + \text{weight}(v, w))$.

!!! proof "Why it's correct (sketch)"
    Invariant: when $v$ is finalized, $d(v)$ is the true distance. Suppose the shortest path to $v$ leaves the finalized set at some edge $x\to y$. Then $d(y)\leq\text{dist}(y)\leq\text{dist}(v)$, since weights are non-negative and $y$ lies on the path before $v$. But $v$ was chosen with the smallest $d$, so $d(v)\leq d(y)\leq\text{dist}(v)$. And $d(v)\geq\text{dist}(v)$ always holds (it's the length of an actual path). So $d(v) = \text{dist}(v)$. (With a negative edge, this argument breaks, which is why Bellman–Ford is needed then.)

With a binary heap it runs in $O((n + m)\log n)$.

## 6. Graphs as matrices

The **adjacency matrix** $A$ of a graph on $n$ vertices has $A_{ij} = 1$ if there's an edge from $i$ to $j$, else 0. It's symmetric for undirected graphs.

!!! theorem "Powers count walks"
    $(A^k)_{ij}$ is the number of walks of length $k$ from $i$ to $j$.

!!! proof "Proof"
    Induction on $k$. For $k = 1$ it's the definition. $(A^{k+1})_{ij} = \sum_\ell(A^k)_{i\ell}A_{\ell j}$: a walk of length $k + 1$ from $i$ to $j$ is a walk of length $k$ from $i$ to some $\ell$, followed by an edge $\ell\to j$. Sum over all possible $\ell$.

So linear algebra answers graph questions. The **graph Laplacian** $L = D - A$ (where $D$ is the diagonal matrix of degrees) is symmetric and PSD, since $\vv x^\top L\vv x = \sum_{\text{edges } ij}(x_i - x_j)^2\geq0$. Its eigenvalues reveal structure:

- The number of zero eigenvalues of $L$ equals the number of **connected components**. (Proof: $\vv x^\top L\vv x = 0$ forces $x_i = x_j$ across every edge, so $\vv x$ is constant on each component.)
- The eigenvectors for the next-smallest eigenvalues vary slowly across the graph. Using them as coordinates and clustering is **spectral clustering**.

!!! ml "Where this shows up"
    - **Graph neural networks** update each node from its neighbors: $H' = \sigma(\hat AHW)$, where $\hat A$ is a normalized adjacency matrix. One layer mixes information along edges, $k$ layers along walks of length $k$ (that's the powers-count-walks theorem).
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
    $A = \begin{pmatrix}0&1&0\\1&0&1\\0&1&0\end{pmatrix}$, $A^2 = \begin{pmatrix}1&0&1\\0&2&0\\1&0&1\end{pmatrix}$. $(A^2)_{11} = 1$: the walk $1\to2\to1$. $(A^2)_{13} = 1$: the walk $1\to2\to3$.

**5.** Give a topological order of: $a\to b$, $a\to c$, $b\to d$, $c\to d$, $d\to e$.

??? success "Solution"
    $a, b, c, d, e$ (or $a, c, b, d, e$).

**6.** Show with a small example why Dijkstra can fail with a negative edge.

??? success "Solution"
    $s\to a$ with weight 2, $s\to b$ with weight 3, $b\to a$ with weight $-2$. Dijkstra finalizes $a$ at distance 2, but the path $s\to b\to a$ has length 1.
