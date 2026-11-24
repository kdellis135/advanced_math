# SVD and PCA

<div class="lesson-meta" markdown>
**Phase 3 · Lesson 9** · ⏱ ~4 hours · Needs: [Symmetric matrices and the spectral theorem](spectral.md)
</div>

The spectral theorem only works for symmetric matrices. The **singular value decomposition** works for *every* matrix, square or not:

> Any linear map is a rotation, then a stretch along perpendicular axes, then another rotation.

It's the most useful factorization in applied math. From one formula it gives:

- the rank;
- the best low-rank approximation;
- the pseudoinverse;
- PCA.

## 1. The statement

!!! theorem "Singular value decomposition"
    Every real $m\times n$ matrix $A$ of rank $r$ can be written

    $$
    A = U\Sigma V^\top = \sum_{i=1}^r\sigma_i\,\vv u_i\vv v_i^\top,
    $$

    where

    - $V$ ($n\times n$) is orthogonal; its columns $\vv v_i$ are the **right singular vectors** (an orthonormal basis of the input space);
    - $U$ ($m\times m$) is orthogonal; its columns $\vv u_i$ are the **left singular vectors** (an orthonormal basis of the output space);
    - $\Sigma$ ($m\times n$) is zero except for the **singular values** $\sigma_1 \geq \sigma_2 \geq \cdots \geq \sigma_r > 0$ on its diagonal.

    Equivalently: $A\vv v_i = \sigma_i\vv u_i$ for $i \leq r$, and $A\vv v_i = \vv 0$ for $i > r$.

!!! intuition "Rotate, stretch, rotate"
    Read $A\vv x = U\Sigma V^\top\vv x$ right to left:

    1. $V^\top$ rotates the input so the special directions $\vv v_i$ line up with the axes;
    2. $\Sigma$ stretches axis $i$ by $\sigma_i$ (and drops or adds dimensions);
    3. $U$ rotates into the output space.

    **Every matrix maps the unit sphere to an ellipsoid:**

    | Piece | Role in the ellipsoid |
    |---|---|
    | $\sigma_i$ | semi-axis lengths |
    | $\vv u_i$ | axis directions |
    | $\vv v_i$ | the points of the sphere that land on those axes |

<div class="viz" data-viz="svd"></div>

## 2. Where it comes from

The trick is to apply the spectral theorem to the symmetric PSD matrix $A^\top A$.

!!! proof "Proof (construction)"
    **Step 1: the $\vv v_i$.** $A^\top A$ is $n\times n$, symmetric, and positive semidefinite. By the spectral theorem it has an orthonormal eigenbasis $\vv v_1, \ldots, \vv v_n$ with eigenvalues $\lambda_1 \geq \cdots \geq \lambda_n \geq 0$. Define $\sigma_i = \sqrt{\lambda_i}$.

    **Step 2: the images are orthogonal.**

    $$
    (A\vv v_i)\cdot(A\vv v_j) = \vv v_i^\top A^\top A\vv v_j = \lambda_j\,\vv v_i\cdot\vv v_j,
    $$

    which is $0$ for $i \neq j$ and $\lambda_i = \sigma_i^2$ for $i = j$. So $\norm{A\vv v_i} = \sigma_i$.

    **Step 3: the $\vv u_i$.**

    - For each $\sigma_i > 0$, set $\vv u_i = A\vv v_i/\sigma_i$. These are orthonormal by step 2, and $A\vv v_i = \sigma_i\vv u_i$ by construction.
    - For $\sigma_i = 0$, $A\vv v_i = \vv 0$.
    - The number of nonzero $\sigma_i$ is the rank $r$ (the $\vv u_i$ for $i \leq r$ span the column space).
    - Extend $\vv u_1, \ldots, \vv u_r$ to an orthonormal basis of $\R^m$ arbitrarily.

    **Step 4.** Now $AV = U\Sigma$ column by column. Multiplying on the right by $V^\top$ gives $A = U\Sigma V^\top$.

Facts that fall out of the proof:

- $\sigma_i^2$ are the eigenvalues of $A^\top A$ (and of $AA^\top$, whose eigenvectors are the $\vv u_i$).
- $\rank A$ = the number of nonzero singular values.
- **The SVD hands you orthonormal bases for all four fundamental subspaces:**

    | Vectors | Span |
    |---|---|
    | $\vv v_1, \ldots, \vv v_r$ | row space |
    | $\vv v_{r+1}, \ldots, \vv v_n$ | null space |
    | $\vv u_1, \ldots, \vv u_r$ | column space |
    | $\vv u_{r+1}, \ldots, \vv u_m$ | left null space |

- $\sigma_1 = \max_{\norm{\vv x} = 1}\norm{A\vv x}$: the largest stretch, called the **spectral norm** $\norm A_2$.
    - Proof: $\norm{A\vv x}^2 = \vv x^\top A^\top A\vv x \leq \lambda_1$, by the Rayleigh quotient.
- For a symmetric PSD matrix, the SVD *is* the spectral decomposition.

## 3. Low-rank approximation

The sum form $A = \sum_i\sigma_i\vv u_i\vv v_i^\top$ writes $A$ as a sum of rank-one pieces, ordered by importance.

Keep only the first $k$:

$$
A_k = \sum_{i=1}^k\sigma_i\,\vv u_i\vv v_i^\top.
$$

!!! theorem "Eckart–Young theorem"
    $A_k$ is the best rank-$k$ approximation of $A$: for every matrix $B$ of rank at most $k$,

    $$
    \norm{A - B} \geq \norm{A - A_k},
    $$

    in both of these norms:

    | Norm | Error of $A_k$ |
    |---|---|
    | spectral | $\sigma_{k+1}$ |
    | Frobenius, $\norm{M}_F = \sqrt{\sum_{ij}M_{ij}^2}$ | $\sqrt{\sigma_{k+1}^2 + \cdots + \sigma_r^2}$ |

??? proof "Proof for the spectral norm (deeper)"
    $A - A_k = \sum_{i>k}\sigma_i\vv u_i\vv v_i^\top$ has largest singular value $\sigma_{k+1}$, so the error of $A_k$ is $\sigma_{k+1}$.

    Now let $B$ have rank $\leq k$.

    1. $\dim N(B) \geq n - k$.
    2. The span of $\vv v_1, \ldots, \vv v_{k+1}$ has dimension $k + 1$.
    3. Two subspaces of $\R^n$ with dimensions adding to more than $n$ must share a nonzero vector. So there's a unit vector $\vv x = \sum_{i\leq k+1}c_i\vv v_i$ with $B\vv x = \vv 0$.
    4. Then

    $$
    \norm{(A - B)\vv x}^2 = \norm{A\vv x}^2 = \sum_{i \leq k+1}\sigma_i^2c_i^2 \geq \sigma_{k+1}^2\sum c_i^2 = \sigma_{k+1}^2.
    $$

    So $\norm{A - B}_2 \geq \sigma_{k+1}$.

!!! example "Image compression"
    A $1000\times1000$ grayscale image is a matrix with $10^6$ numbers. Real images have rapidly decaying singular values.

    - $A_{50}$ stores only $50\times(1000 + 1000 + 1) \approx 10^5$ numbers (10%).
    - It is usually visually close to the original.

    The first few terms capture broad shapes; later terms add fine detail.

## 4. PCA: principal component analysis

**Setup:**

- You have $n$ data points in $\R^d$, stacked as the rows of $X$ ($n\times d$).
- They are **centered**: subtract the mean of each column.
- You want the direction $\vv w$ ($\norm{\vv w} = 1$) along which the data varies the most.

The projection of point $\vv x_i$ onto $\vv w$ is $\vv x_i\cdot\vv w$, so the vector of all projections is $X\vv w$. Its variance (the data are centered) is

$$
\frac1n\norm{X\vv w}^2 = \vv w^\top\Big(\underbrace{\tfrac1nX^\top X}_{C}\Big)\vv w,
$$

where $C$ is the **covariance matrix**.

Maximizing $\vv w^\top C\vv w$ over unit vectors is the Rayleigh quotient problem. The answer is the top eigenvector of $C$.

!!! theorem "PCA"
    The principal components (directions of maximal variance, each perpendicular to the previous ones) are the eigenvectors of the covariance matrix $C = \frac1nX^\top X$, ordered by eigenvalue.

    - The eigenvalue $\lambda_i$ is the variance along component $i$.
    - Equivalently, the components are the right singular vectors $\vv v_i$ of the centered data matrix $X$, with $\lambda_i = \sigma_i^2/n$.

<div class="viz" data-viz="gaussian2d"></div>

**PCA as compression.** Projecting onto the top $k$ components, $X \approx XV_kV_k^\top$, is the best rank-$k$ approximation of $X$ (Eckart–Young). So PCA simultaneously:

- *maximizes the variance kept*, and
- *minimizes the squared reconstruction error*.

The fraction of variance explained by the first $k$ components is

$$
\frac{\lambda_1 + \cdots + \lambda_k}{\lambda_1 + \cdots + \lambda_d}.
$$

!!! warning "Practical notes"
    - Always **center** the data first. Otherwise the first "component" just points at the mean.
    - If features have different units, **standardize** them (divide by the standard deviation) or the large-unit features dominate.
    - In practice compute PCA with the SVD of $X$, not by forming $X^\top X$, for numerical accuracy.

## 5. The pseudoinverse

For any $A = U\Sigma V^\top$, the **pseudoinverse** is $A^+ = V\Sigma^+U^\top$, where $\Sigma^+$ inverts the nonzero singular values (and transposes the shape).

It inverts $A$ wherever that's possible:

- $A^+$ maps the column space back to the row space;
- it sends the left null space to zero.

$\vv x^+ = A^+\vv b$ is the **minimum-norm least-squares solution**: among all $\vv x$ minimizing $\norm{A\vv x - \vv b}$, it's the shortest.

When $A$ has independent columns, $A^+ = (A^\top A)^{-1}A^\top$, the least-squares formula from [Orthogonality](orthogonality.md).

!!! ml "Where this shows up"
    - **PCA** for visualization, denoising and preprocessing. "Explained variance" plots are the singular values squared.
    - **LoRA** fine-tunes a large model by learning a low-rank update $\Delta W = BA$.
        - It works because useful weight updates have rapidly decaying singular values.
    - **Recommender systems:** the user × item ratings matrix is approximately low-rank ("users have a few taste dimensions").
        - The truncated SVD fills in missing ratings. This was the core of the Netflix Prize solutions.
    - **Latent semantic analysis and word embeddings:** truncated SVD of word co-occurrence matrices gives word vectors.
    - **Condition number** $\sigma_1/\sigma_r$ measures how sensitive $A\vv x = \vv b$ is to noise. Large values mean ill-conditioned problems and slow optimization.
    - **Spectral normalization** in GANs divides each weight matrix by $\sigma_1$ to control the network's Lipschitz constant.

## Check yourself

**1.** Find the SVD of $A = \begin{pmatrix}3 & 0\\ 4 & 5\end{pmatrix}$. (Hint: $A^\top A = \begin{pmatrix}25 & 20\\20 & 25\end{pmatrix}$.)

??? success "Solution"
    Eigenvalues of $A^\top A$:

    | $\lambda$ | $\vv v$ | $\sigma = \sqrt\lambda$ | $\vv u = A\vv v/\sigma$ |
    |---|---|---|---|
    | 45 | $\frac{1}{\sqrt2}(1,1)$ | $3\sqrt5$ | $\frac{1}{\sqrt2}(3, 9)/(3\sqrt5) = \frac{1}{\sqrt{10}}(1, 3)$ |
    | 5 | $\frac{1}{\sqrt2}(1,-1)$ | $\sqrt5$ | $\frac{1}{\sqrt2}(3, -1)/\sqrt5 = \frac{1}{\sqrt{10}}(3, -1)$ |

    Check: $\sigma_1\sigma_2 = 15 = |\det A|$. ✓

**2.** What are the singular values of an orthogonal matrix? Of a diagonal matrix $\diag(3, -5)$?

??? success "Solution"
    - **Orthogonal:** $Q^\top Q = I$, so all singular values are 1.
    - **Diagonal:** $|3|, |-5|$, sorted as $5, 3$. Singular values are never negative; the sign goes into $U$.

**3.** A matrix has singular values $10, 5, 1, 0.1$. What's its rank? What's the spectral-norm error of the best rank-2 approximation? What fraction of the squared Frobenius norm does it keep?

??? success "Solution"
    - **Rank:** 4.
    - **Error:** $\sigma_3 = 1$.
    - **Kept:** $\frac{100 + 25}{100 + 25 + 1 + 0.01} = \frac{125}{126.01} \approx 99.2\%$.

**4.** Show that $\norm{A}_F^2 = \sum_i\sigma_i^2$. (Hint: $\norm A_F^2 = \tr(A^\top A)$.)

??? success "Solution"
    - $\tr(A^\top A) = \sum_{ij}A_{ij}^2 = \norm{A}_F^2$.
    - The trace is the sum of the eigenvalues of $A^\top A$, which are $\sigma_i^2$.

**5.** Data points $(2, 2), (-2, -2), (1, -1), (-1, 1)$ (already centered). Find the covariance matrix and the first principal component.

??? success "Solution"
    $$
    X^\top X = \begin{pmatrix}4 + 4 + 1 + 1 & 4 + 4 - 1 - 1\\ \cdot & 10\end{pmatrix} = \begin{pmatrix}10 & 6\\6 & 10\end{pmatrix}, \qquad C = \tfrac14X^\top X = \begin{pmatrix}2.5 & 1.5\\1.5 & 2.5\end{pmatrix}.
    $$

    - Eigenvalue $4$ along $(1,1)/\sqrt2$.
    - Eigenvalue $1$ along $(1,-1)/\sqrt2$.

    PC1 is the diagonal direction, explaining $80\%$ of the variance.

**6.** Why does LoRA with rank $r = 8$ on a $4096\times4096$ weight matrix train only about 0.4% as many parameters as full fine-tuning?

??? success "Solution"
    $\Delta W = BA$ with $B$ being $4096\times8$ and $A$ being $8\times4096$.

    | Approach | Parameters |
    |---|---|
    | LoRA | $2\cdot4096\cdot8 = 65{,}536$ |
    | full fine-tuning | $4096^2 \approx 16.8$ million |

    The ratio is $\frac{16}{4096} \approx 0.39\%$.
