# Phase 3 · Linear Algebra

**Goal:** see matrices the way experts do, as **transformations of space**, and understand the decompositions (eigen, spectral, SVD) that power data science.

**Why it matters most:** if you could learn only one area of math for machine learning, it would be this one. Data is stored as matrices, a neural network layer is a matrix multiplication, embeddings are vectors, attention is dot products, and PCA, least squares and low-rank adaptation (LoRA) are pure linear algebra.

**The one big idea:** *a matrix is a function that moves vectors, and its columns tell you where the basis vectors go.* Choose a clever basis (eigenvectors, singular vectors) and the function becomes simple scaling.

**Time:** about 25–30 hours. This is the longest phase, and it's worth it.

<div class="progress-list" markdown>

1. [Vectors and the dot product](vectors.md): length, angle, Cauchy–Schwarz, cosine similarity.
2. [Matrices are transformations](matrices.md): column picture, composition, why multiplication is defined that way.
3. [Solving linear systems](linear-systems.md): elimination, LU, inverses.
4. [Vector spaces, basis, rank](vector-spaces.md): span, independence, the four fundamental subspaces, rank–nullity.
5. [Determinants](determinants.md): signed volume scaling and its properties.
6. [Orthogonality and least squares](orthogonality.md): projections, normal equations, Gram–Schmidt, QR.
7. [Eigenvalues and eigenvectors](eigen.md): directions a matrix only stretches; diagonalization and powers.
8. [Symmetric matrices and the spectral theorem](spectral.md): real eigenvalues, orthogonal eigenvectors, positive definiteness.
9. [SVD and PCA](svd.md): every matrix is rotate–stretch–rotate; best low-rank approximations.

</div>

!!! tip "Companion resources"
    Gilbert Strang's MIT 18.06 lectures and 3Blue1Brown's *Essence of Linear Algebra* videos pair perfectly with this phase. See [Free resources](../reference/resources.md).
