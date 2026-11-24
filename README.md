# advanced_math

**Advanced Math, Properly**: the math foundation for machine learning, deep learning, algorithms, information theory and physics, rebuilt from the ground up with intuition, precise definitions, proofs, worked examples and interactive figures.

🌐 **Live site:** https://kdellis135.github.io/advanced_math/

## What's inside

Ten phases, 45 lessons, each with exercises and hidden solutions:

1. **Foundations**: logic and proofs, sets and functions, exponentials/logs/trig, complex numbers
2. **Calculus**: limits (ε–δ), derivatives, the mean value theorem, integrals, Taylor series
3. **Linear Algebra**: vectors, matrices as transformations, rank, determinants, least squares, eigenvalues, the spectral theorem, SVD and PCA
4. **Multivariable Calculus**: gradients, Jacobians and backpropagation, Hessians, matrix calculus, change of variables, Lagrange multipliers
5. **Probability**: counting, Bayes, random variables, distributions, covariance, LLN and CLT
6. **Statistics**: MLE, MAP, bias–variance, regularization, confidence intervals and tests
7. **Optimization**: convexity, Jensen, gradient descent convergence, SGD, momentum, Adam, KKT and duality
8. **Information Theory**: entropy, cross-entropy, KL divergence, mutual information, source coding
9. **Discrete Math & Algorithms**: Big-O, recurrences and the master theorem, graphs, number theory and RSA
10. **Signals & Dynamics**: differential equations, Fourier series and transforms, the FFT

## Running locally

```bash
python -m venv .venv
.venv/Scripts/pip install -r requirements.txt   # on macOS/Linux: .venv/bin/pip
.venv/Scripts/mkdocs serve                       # then open http://127.0.0.1:8000/advanced_math/
```

## How it's built

- [MkDocs Material](https://squidfunk.github.io/mkdocs-material/) for the site, with lessons in Markdown under `docs/`
- [KaTeX](https://katex.org/) for math (`docs/javascripts/katex-config.js`)
- Interactive figures are plain canvas JavaScript in `docs/javascripts/viz.js`, embedded with `<div class="viz" data-viz="name"></div>`
- Lesson progress is stored in the reader's browser (`docs/javascripts/progress.js`)
- Every push to `main` builds with `mkdocs build --strict` and deploys to GitHub Pages (`.github/workflows/deploy.yml`)
