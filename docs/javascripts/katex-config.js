// Renders all math on the page with KaTeX (works with Material's document$ observable).
(function () {
  var macros = {
    "\\R": "\\mathbb{R}",
    "\\N": "\\mathbb{N}",
    "\\Z": "\\mathbb{Z}",
    "\\Q": "\\mathbb{Q}",
    "\\C": "\\mathbb{C}",
    "\\E": "\\mathbb{E}",
    "\\Var": "\\operatorname{Var}",
    "\\Cov": "\\operatorname{Cov}",
    "\\tr": "\\operatorname{tr}",
    "\\rank": "\\operatorname{rank}",
    "\\diag": "\\operatorname{diag}",
    "\\sgn": "\\operatorname{sgn}",
    "\\argmin": "\\operatorname*{arg\\,min}",
    "\\argmax": "\\operatorname*{arg\\,max}",
    "\\KL": "D_{\\mathrm{KL}}",
    "\\d": "\\mathrm{d}",
    "\\T": "^{\\top}",
    "\\vv": "\\mathbf{#1}",
    "\\norm": "\\left\\lVert #1 \\right\\rVert",
    "\\abs": "\\left\\lvert #1 \\right\\rvert",
    "\\inner": "\\left\\langle #1, #2 \\right\\rangle"
  };

  function render(root) {
    if (typeof renderMathInElement !== "function") return;
    renderMathInElement(root, {
      // pymdownx.arithmatex (generic mode) already rewrites $...$ / $$...$$ into
      // \( \) and \[ \], so a literal "$" in prose is never treated as math.
      delimiters: [
        { left: "\\[", right: "\\]", display: true },
        { left: "\\(", right: "\\)", display: false }
      ],
      macros: macros,
      throwOnError: false
    });
  }

  function start() {
    if (window.document$ && typeof window.document$.subscribe === "function") {
      window.document$.subscribe(function (ev) { render(ev.body || document.body); });
    } else {
      render(document.body);
    }
  }

  // auto-render is loaded after this file, so wait for the window load event.
  if (document.readyState === "complete") start();
  else window.addEventListener("load", start);
})();
