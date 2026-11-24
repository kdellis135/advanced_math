/* Interactive figures for "Advanced Math, Properly".
 * Usage in Markdown:  <div class="viz" data-viz="tangent"></div>
 * Every figure is plain canvas + DOM, no dependencies.                        */
(function () {
  "use strict";
  var REG = {}, MOUNTED = [];
  var C = { blue: "#2f6fde", orange: "#e8590c", green: "#12a37f", red: "#d6336c", purple: "#8a4fd8", gray: "#868e96", yellow: "#e0a800", teal: "#1098ad" };
  var SERIES = [C.blue, C.orange, C.green, C.red, C.purple, C.teal];
  var PI = Math.PI;

  /* ------------------------------------------------------------------ utils */
  function isDark() { return document.body.getAttribute("data-md-color-scheme") === "slate"; }
  function theme() {
    var d = isDark();
    var bg = getComputedStyle(document.body).getPropertyValue("--md-default-bg-color").trim() || (d ? "#1e2129" : "#ffffff");
    return {
      dark: d, bg: bg, fg: d ? "#e3e6ee" : "#1f2430", muted: d ? "#9aa3b5" : "#5c6475",
      grid: d ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)",
      axis: d ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)",
      faint: d ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.16)"
    };
  }
  function alpha(hex, a) { var n = parseInt(hex.slice(1), 16); return "rgba(" + (n >> 16 & 255) + "," + (n >> 8 & 255) + "," + (n & 255) + "," + a + ")"; }
  function niceStep(raw) { var p = Math.pow(10, Math.floor(Math.log10(raw))), m = raw / p; return (m < 1.5 ? 1 : m < 3.5 ? 2 : m < 7.5 ? 5 : 10) * p; }
  function fmt(v, d) {
    if (!isFinite(v)) return v > 0 ? "∞" : v < 0 ? "−∞" : "undefined";
    d = d == null ? 3 : d;
    if (Math.abs(v) >= 1e7 || (Math.abs(v) < 1e-4 && v !== 0 && Math.abs(v) < Math.pow(10, -d))) return v.toExponential(2).replace("-", "−");
    var s = (+v).toFixed(d);
    if (s.indexOf(".") >= 0) s = s.replace(/0+$/, "").replace(/\.$/, "");
    if (s === "-0") s = "0";
    return s.replace("-", "−");
  }
  var SUP = { "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹", "-": "⁻" };
  function sup(n) { return String(n).split("").map(function (c) { return SUP[c] || c; }).join(""); }
  function piLabel(x) {
    var k = Math.round(x / (PI / 2));
    if (k === 0) return "0";
    if (k % 2 === 0) { var m = k / 2; return (m === 1 ? "π" : m === -1 ? "−π" : String(m).replace("-", "−") + "π"); }
    return (k === 1 ? "π/2" : k === -1 ? "−π/2" : String(k).replace("-", "−") + "π/2");
  }
  function fact(k) { var r = 1; for (var i = 2; i <= k; i++) r *= i; return r; }
  function lnfact(k) { var r = 0; for (var i = 2; i <= k; i++) r += Math.log(i); return r; }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function rng(seed) {
    var a = seed >>> 0;
    return function () { a |= 0; a = a + 0x6D2B79F5 | 0; var t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
  }
  function gauss(r) { var u = 1 - r(), v = r(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * PI * v); }
  function npdf(x, m, s) { return Math.exp(-0.5 * ((x - m) / s) * ((x - m) / s)) / (s * Math.sqrt(2 * PI)); }
  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }

  /* ------------------------------------------------------------------ plot */
  function Plot(holder, o) {
    o = o || {};
    this.holder = holder;
    this.canvas = document.createElement("canvas");
    holder.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");
    this.aspect = o.aspect || 0.62; this.maxH = o.maxH || 440; this.equal = !!o.equal;
    this.v = { xmin: o.xmin != null ? o.xmin : -5, xmax: o.xmax != null ? o.xmax : 5, ymin: o.ymin != null ? o.ymin : -3, ymax: o.ymax != null ? o.ymax : 3 };
    this.t = theme();
    this.resize();
  }
  var P = Plot.prototype;
  P.resize = function () {
    var w = Math.max(200, Math.floor(this.holder.clientWidth || 600));
    var h = Math.min(this.maxH, Math.round(w * this.aspect));
    var dpr = window.devicePixelRatio || 1;
    this.canvas.width = Math.round(w * dpr); this.canvas.height = Math.round(h * dpr);
    this.canvas.style.height = h + "px";
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.w = w; this.h = h; this.fit();
  };
  P.fit = function () {
    var v = this.v;
    this.xmin = v.xmin; this.xmax = v.xmax; this.ymin = v.ymin; this.ymax = v.ymax;
    if (this.equal) {
      var s = Math.max((v.xmax - v.xmin) / this.w, (v.ymax - v.ymin) / this.h);
      var cx = (v.xmin + v.xmax) / 2, cy = (v.ymin + v.ymax) / 2;
      this.xmin = cx - s * this.w / 2; this.xmax = cx + s * this.w / 2;
      this.ymin = cy - s * this.h / 2; this.ymax = cy + s * this.h / 2;
    }
  };
  P.view = function (xmin, xmax, ymin, ymax) { this.v = { xmin: xmin, xmax: xmax, ymin: ymin, ymax: ymax }; this.fit(); };
  P.X = function (x) { return (x - this.xmin) / (this.xmax - this.xmin) * this.w; };
  P.Y = function (y) { return this.h - (y - this.ymin) / (this.ymax - this.ymin) * this.h; };
  P.ix = function (px) { return this.xmin + px / this.w * (this.xmax - this.xmin); };
  P.iy = function (py) { return this.ymin + (this.h - py) / this.h * (this.ymax - this.ymin); };
  P.clear = function () { this.t = theme(); this.ctx.clearRect(0, 0, this.w, this.h); };
  P.axes = function (o) {
    o = o || {};
    var c = this.ctx, t = this.t, x, y;
    var sx = o.xstep || niceStep((this.xmax - this.xmin) / 9);
    var sy = o.ystep || (this.equal ? sx : niceStep((this.ymax - this.ymin) / 6));
    if (o.grid !== false) {
      c.lineWidth = 1; c.strokeStyle = t.grid; c.setLineDash([]); c.beginPath();
      for (x = Math.ceil(this.xmin / sx) * sx; x <= this.xmax; x += sx) { var px = Math.round(this.X(x)) + 0.5; c.moveTo(px, 0); c.lineTo(px, this.h); }
      for (y = Math.ceil(this.ymin / sy) * sy; y <= this.ymax; y += sy) { var py = Math.round(this.Y(y)) + 0.5; c.moveTo(0, py); c.lineTo(this.w, py); }
      c.stroke();
    }
    var y0 = clamp(this.Y(0), 0, this.h), x0 = clamp(this.X(0), 0, this.w);
    c.strokeStyle = t.axis; c.lineWidth = 1; c.beginPath();
    if (this.ymin <= 0 && this.ymax >= 0) { c.moveTo(0, Math.round(y0) + 0.5); c.lineTo(this.w, Math.round(y0) + 0.5); }
    if (this.xmin <= 0 && this.xmax >= 0) { c.moveTo(Math.round(x0) + 0.5, 0); c.lineTo(Math.round(x0) + 0.5, this.h); }
    c.stroke();
    if (o.labels === false) return;
    c.fillStyle = t.muted; c.font = "11px system-ui, sans-serif";
    c.textAlign = "center"; c.textBaseline = "top";
    var ly = Math.min(y0 + 4, this.h - 14);
    for (x = Math.ceil(this.xmin / sx) * sx; x <= this.xmax; x += sx) {
      if (Math.abs(x) < sx / 2 && this.xmin < 0) continue;
      c.fillText(o.xfmt ? o.xfmt(x) : fmt(x, 4), this.X(x), ly);
    }
    c.textAlign = "right"; c.textBaseline = "middle";
    var lx = Math.max(x0 - 4, 30);
    for (y = Math.ceil(this.ymin / sy) * sy; y <= this.ymax; y += sy) {
      if (Math.abs(y) < sy / 2) continue;
      c.fillText(o.yfmt ? o.yfmt(y) : fmt(y, 4), lx, this.Y(y));
    }
  };
  P.func = function (f, color, width, o) {
    o = o || {};
    var c = this.ctx, a = o.from != null ? o.from : this.xmin, b = o.to != null ? o.to : this.xmax;
    if (b <= a) return;
    c.strokeStyle = color; c.lineWidth = width || 2; c.setLineDash(o.dash || []); c.lineJoin = "round"; c.beginPath();
    var n = Math.max(2, Math.ceil(this.w * (b - a) / (this.xmax - this.xmin))), pen = false, last = null;
    for (var i = 0; i <= n; i++) {
      var x = a + (b - a) * i / n, y = f(x), py = this.Y(y);
      if (!isFinite(y) || Math.abs(py) > 1e5 || (last !== null && Math.abs(py - last) > this.h * 2.5)) { pen = false; last = null; continue; }
      if (!pen) { c.moveTo(this.X(x), py); pen = true; } else c.lineTo(this.X(x), py);
      last = py;
    }
    c.stroke(); c.setLineDash([]);
  };
  P.fillFunc = function (f, color, from, to) {
    var a = from != null ? from : this.xmin, b = to != null ? to : this.xmax, n = 300, pts = [[a, 0]];
    for (var i = 0; i <= n; i++) { var x = a + (b - a) * i / n, y = f(x); pts.push([x, isFinite(y) ? y : 0]); }
    pts.push([b, 0]);
    this.poly(pts, color);
  };
  P.line = function (x1, y1, x2, y2, color, width, dash) {
    var c = this.ctx; c.strokeStyle = color; c.lineWidth = width || 1.5; c.setLineDash(dash || []);
    c.beginPath(); c.moveTo(this.X(x1), this.Y(y1)); c.lineTo(this.X(x2), this.Y(y2)); c.stroke(); c.setLineDash([]);
  };
  P.infLine = function (px, py, dx, dy, color, width, dash) {
    var n = Math.hypot(dx, dy); if (n < 1e-12) return;
    var L = 4 * ((this.xmax - this.xmin) + (this.ymax - this.ymin));
    this.line(px - dx / n * L, py - dy / n * L, px + dx / n * L, py + dy / n * L, color, width, dash);
  };
  P.arrow = function (x1, y1, x2, y2, color, width, head) {
    var c = this.ctx, X1 = this.X(x1), Y1 = this.Y(y1), X2 = this.X(x2), Y2 = this.Y(y2);
    var L = Math.hypot(X2 - X1, Y2 - Y1); if (L < 0.5) return;
    var hs = Math.min(head || 11, L * 0.5), ang = Math.atan2(Y2 - Y1, X2 - X1);
    c.strokeStyle = color; c.fillStyle = color; c.lineWidth = width || 2.2; c.setLineDash([]);
    c.beginPath(); c.moveTo(X1, Y1); c.lineTo(X2 - hs * 0.7 * Math.cos(ang), Y2 - hs * 0.7 * Math.sin(ang)); c.stroke();
    c.beginPath(); c.moveTo(X2, Y2);
    c.lineTo(X2 - hs * Math.cos(ang - 0.38), Y2 - hs * Math.sin(ang - 0.38));
    c.lineTo(X2 - hs * Math.cos(ang + 0.38), Y2 - hs * Math.sin(ang + 0.38));
    c.closePath(); c.fill();
  };
  P.dot = function (x, y, r, color, hollow) {
    var c = this.ctx; c.beginPath(); c.arc(this.X(x), this.Y(y), r || 4, 0, 2 * PI);
    if (hollow) { c.fillStyle = this.t.bg; c.fill(); c.strokeStyle = color; c.lineWidth = 2; c.stroke(); }
    else { c.fillStyle = color; c.fill(); }
  };
  P.text = function (s, x, y, color, o) {
    o = o || {}; var c = this.ctx;
    c.fillStyle = color || this.t.fg; c.font = (o.bold ? "600 " : "") + (o.size || 12) + "px system-ui, sans-serif";
    c.textAlign = o.align || "left"; c.textBaseline = o.base || "middle";
    c.fillText(s, this.X(x) + (o.dx || 0), this.Y(y) + (o.dy || 0));
  };
  P.poly = function (pts, fill, stroke, width) {
    var c = this.ctx, self = this; if (!pts.length) return;
    c.beginPath();
    pts.forEach(function (p, i) { if (i) c.lineTo(self.X(p[0]), self.Y(p[1])); else c.moveTo(self.X(p[0]), self.Y(p[1])); });
    c.closePath();
    if (fill) { c.fillStyle = fill; c.fill(); }
    if (stroke) { c.strokeStyle = stroke; c.lineWidth = width || 1.5; c.setLineDash([]); c.stroke(); }
  };
  P.path = function (pts, color, width, dash) {
    var c = this.ctx, self = this; if (pts.length < 2) return;
    c.strokeStyle = color; c.lineWidth = width || 2; c.setLineDash(dash || []); c.lineJoin = "round"; c.beginPath();
    pts.forEach(function (p, i) { if (i) c.lineTo(self.X(p[0]), self.Y(p[1])); else c.moveTo(self.X(p[0]), self.Y(p[1])); });
    c.stroke(); c.setLineDash([]);
  };
  P.rect = function (x, y, w, h, fill, stroke, width) { this.poly([[x, y], [x + w, y], [x + w, y + h], [x, y + h]], fill, stroke, width || 1); };
  P.circle = function (cx, cy, r, color, width, fill) {
    var c = this.ctx; c.beginPath();
    c.ellipse(this.X(cx), this.Y(cy), Math.abs(r * this.w / (this.xmax - this.xmin)), Math.abs(r * this.h / (this.ymax - this.ymin)), 0, 0, 2 * PI);
    if (fill) { c.fillStyle = fill; c.fill(); }
    if (color) { c.strokeStyle = color; c.lineWidth = width || 1.5; c.setLineDash([]); c.stroke(); }
  };
  P.arc = function (cx, cy, rpx, a0, a1, color, width) {
    var c = this.ctx; c.beginPath(); c.strokeStyle = color; c.lineWidth = width || 1.5;
    c.arc(this.X(cx), this.Y(cy), rpx, -a0, -a1, a1 > a0); c.stroke();
  };

  // Banded heat map (viridis-like) of f(x,y), used for contour pictures.
  var VIR = [[68, 1, 84], [59, 82, 139], [33, 145, 140], [94, 201, 98], [253, 231, 37]];
  function heat(p, f, o) {
    o = o || {};
    var res = 4, cols = Math.ceil(p.w / res), rows = Math.ceil(p.h / res), tf = o.tf || Math.asinh;
    var vals = new Float64Array(cols * rows), lo = Infinity, hi = -Infinity, i, j, k;
    for (j = 0; j < rows; j++) for (i = 0; i < cols; i++) {
      var v = tf(f(p.ix((i + 0.5) * res), p.iy((j + 0.5) * res)));
      vals[j * cols + i] = v;
      if (isFinite(v)) { if (v < lo) lo = v; if (v > hi) hi = v; }
    }
    var off = document.createElement("canvas"); off.width = cols; off.height = rows;
    var oc = off.getContext("2d"), img = oc.createImageData(cols, rows), bands = o.bands || 16, A = p.t.dark ? 150 : 120;
    for (k = 0; k < vals.length; k++) {
      var t = (vals[k] - lo) / ((hi - lo) || 1);
      if (!isFinite(t)) { img.data[4 * k + 3] = 0; continue; }
      t = Math.min(bands - 1, Math.floor(t * bands)) / (bands - 1);
      var s = t * (VIR.length - 1), q = Math.min(VIR.length - 2, Math.floor(s)), r = s - q;
      for (var ch = 0; ch < 3; ch++) img.data[4 * k + ch] = VIR[q][ch] * (1 - r) + VIR[q + 1][ch] * r;
      img.data[4 * k + 3] = A;
    }
    oc.putImageData(img, 0, 0);
    p.ctx.imageSmoothingEnabled = false;
    p.ctx.drawImage(off, 0, 0, cols * res, rows * res);
    p.ctx.imageSmoothingEnabled = true;
  }

  /* -------------------------------------------------------------- controls */
  function slider(parent, label, min, max, step, value, onInput, f) {
    var lab = el("label"); lab.appendChild(document.createTextNode(label));
    var inp = el("input"); inp.type = "range"; inp.min = min; inp.max = max; inp.step = step; inp.value = value;
    var val = el("span", "val");
    function upd() { val.textContent = f ? f(+inp.value) : fmt(+inp.value, 3); }
    inp.addEventListener("input", function () { upd(); onInput(+inp.value); });
    lab.appendChild(inp); lab.appendChild(val); parent.appendChild(lab); upd();
    return { el: inp, label: lab, get: function () { return +inp.value; }, set: function (v) { inp.value = v; upd(); } };
  }
  function select(parent, label, options, value, onChange) {
    var lab = el("label"); if (label) lab.appendChild(document.createTextNode(label));
    var s = el("select");
    options.forEach(function (o) { var op = el("option", null, o[1]); op.value = o[0]; s.appendChild(op); });
    s.value = value;
    s.addEventListener("change", function () { onChange(s.value); });
    lab.appendChild(s); parent.appendChild(lab); return s;
  }
  function button(parent, text, onClick) { var b = el("button", null, text); b.type = "button"; b.addEventListener("click", onClick); parent.appendChild(b); return b; }
  function checkbox(parent, label, value, onChange) {
    var lab = el("label"), c = el("input"); c.type = "checkbox"; c.checked = value;
    c.addEventListener("change", function () { onChange(c.checked); });
    lab.appendChild(c); lab.appendChild(document.createTextNode(label)); parent.appendChild(lab); return c;
  }
  function animator(step) {
    var id = null, last = 0, self = { onchange: null };
    function loop(t) {
      var dt = last ? Math.min(0.05, (t - last) / 1000) : 0.016; last = t;
      if (step(dt) === false) { id = null; last = 0; if (self.onchange) self.onchange(); return; }
      id = requestAnimationFrame(loop);
    }
    self.start = function () { if (id == null) { last = 0; id = requestAnimationFrame(loop); if (self.onchange) self.onchange(); } };
    self.stop = function () { if (id != null) cancelAnimationFrame(id); id = null; last = 0; if (self.onchange) self.onchange(); };
    self.isRunning = function () { return id != null; };
    return self;
  }
  function playButton(parent, anim) {
    var b = button(parent, "▶ Play", function () { if (anim.isRunning()) anim.stop(); else anim.start(); });
    anim.onchange = function () { b.textContent = anim.isRunning() ? "❚❚ Pause" : "▶ Play"; };
    return b;
  }
  // Drag handles. handles() -> [[x,y],...]; onDrag(i, x, y). opts.onTap(x,y) for clicks on empty space.
  function draggable(p, handles, onDrag, opts) {
    opts = opts || {};
    var cv = p.canvas, active = -1;
    cv.style.touchAction = "none";
    function pos(e) { var r = cv.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; }
    function nearest(q) {
      var best = -1, bd = 20;
      handles().forEach(function (h, i) { var d = Math.hypot(p.X(h[0]) - q[0], p.Y(h[1]) - q[1]); if (d < bd) { bd = d; best = i; } });
      return best;
    }
    cv.addEventListener("pointerdown", function (e) {
      var q = pos(e), i = nearest(q);
      if (i < 0) { if (opts.onTap) opts.onTap(p.ix(q[0]), p.iy(q[1])); return; }
      active = i; cv.setPointerCapture(e.pointerId); e.preventDefault();
      cv.style.cursor = "grabbing";
      onDrag(active, p.ix(q[0]), p.iy(q[1]));
    });
    cv.addEventListener("pointermove", function (e) {
      var q = pos(e);
      if (active < 0) { cv.style.cursor = nearest(q) >= 0 ? "grab" : (opts.onTap ? "crosshair" : "default"); return; }
      onDrag(active, p.ix(q[0]), p.iy(q[1]));
    });
    function up() { active = -1; cv.style.cursor = "default"; }
    cv.addEventListener("pointerup", up); cv.addEventListener("pointercancel", up);
  }
  function matSliders(W, M, onChange) {
    return ["a", "b", "c", "d"].map(function (nm, i) {
      return slider(W.controls, nm, -3, 3, 0.05, M()[i], function (v) { M()[i] = v; onChange(); }, function (v) { return fmt(v, 2); });
    });
  }
  function matStr(a, b, c, d) { return "[[" + fmt(a, 2) + ", " + fmt(b, 2) + "], [" + fmt(c, 2) + ", " + fmt(d, 2) + "]]"; }

  /* ------------------------------------------------------------- lifecycle */
  function def(name, title, hint, fn) { REG[name] = { title: title, hint: hint, fn: fn }; }
  function mount(node) {
    if (node.__viz) return;
    var name = node.getAttribute("data-viz"), d = REG[name];
    if (!d) return;
    node.innerHTML = "";
    var title = node.getAttribute("data-title") || d.title;
    if (title) node.appendChild(el("div", "viz-title", title));
    var holder = el("div", "viz-canvas"); node.appendChild(holder);
    var controls = el("div", "viz-controls"); node.appendChild(controls);
    var readout = el("div", "viz-readout"); node.appendChild(readout);
    if (d.hint) node.appendChild(el("div", "viz-hint", d.hint));
    var W = {
      node: node, holder: holder, controls: controls, readout: readout, plots: [], draw: function () {},
      plot: function (o, parent) { var p = new Plot(parent || holder, o); W.plots.push(p); return p; },
      row: function (n, basis) {
        holder.style.display = "flex"; holder.style.gap = "10px"; holder.style.flexWrap = "wrap";
        var cells = [];
        for (var i = 0; i < n; i++) { var c = el("div"); c.style.flex = "1 1 " + (basis || 240) + "px"; c.style.minWidth = "0"; holder.appendChild(c); cells.push(c); }
        return cells;
      },
      say: function (s) { readout.textContent = s; }
    };
    node.__viz = W;
    try { d.fn(W); W.draw(); }
    catch (err) { console.error("[viz] " + name, err); node.appendChild(el("div", "viz-hint", "(this figure failed to load)")); return; }
    MOUNTED.push(W);
    if (window.ResizeObserver) {
      var lw = node.clientWidth;
      new ResizeObserver(function () {
        if (Math.abs(node.clientWidth - lw) > 1) { lw = node.clientWidth; W.plots.forEach(function (p) { p.resize(); }); W.draw(); }
      }).observe(node);
    }
  }
  function scan() { document.querySelectorAll(".viz[data-viz]").forEach(mount); }

  /* ============================================================== FIGURES */

  def("limit", "ε–δ: you pick ε, a δ always exists", "Shrink ε as much as you like. There is always a δ-window around x = 2 whose curve stays inside the ε-band. That is what lim f(x) = 2 means.", function (W) {
    var p = W.plot({ xmin: -0.3, xmax: 3.8, ymin: -0.4, ymax: 4.6 });
    var a = 2, L = 2, eps = 0.8, f = function (x) { return x * x / 2; };
    slider(W.controls, "ε ", 0.02, 1.5, 0.01, eps, function (v) { eps = v; W.draw(); });
    W.draw = function () {
      var d = Math.min(a - Math.sqrt(2 * (L - eps)), Math.sqrt(2 * (L + eps)) - a);
      p.clear(); p.axes();
      p.rect(p.xmin, L - eps, p.xmax - p.xmin, 2 * eps, alpha(C.orange, 0.14));
      p.rect(a - d, p.ymin, 2 * d, p.ymax - p.ymin, alpha(C.blue, 0.14));
      [L - eps, L + eps].forEach(function (y) { p.line(p.xmin, y, p.xmax, y, alpha(C.orange, 0.8), 1, [5, 4]); });
      [a - d, a + d].forEach(function (x) { p.line(x, p.ymin, x, p.ymax, alpha(C.blue, 0.8), 1, [5, 4]); });
      p.func(f, p.t.muted, 2);
      p.func(f, C.green, 4.5, { from: a - d, to: a + d });
      p.dot(a, L, 5, C.green, true);
      p.text("L + ε", p.xmin, L + eps, C.orange, { dx: 34, dy: -9 });
      p.text("L − ε", p.xmin, L - eps, C.orange, { dx: 34, dy: 10 });
      p.text("2 − δ", a - d, p.ymin, C.blue, { align: "right", dx: -4, dy: -10 });
      p.text("2 + δ", a + d, p.ymin, C.blue, { dx: 4, dy: -10 });
      W.say("f(x) = x²/2,  a = 2,  L = 2\nε = " + fmt(eps, 2) + "   →   δ = " + fmt(d, 4) +
        "\nEvery x with 0 < |x − 2| < δ gives |f(x) − 2| < ε  ✓");
    };
  });

  def("tangent", "From secant to tangent", "Drag the blue point along the curve. Shrink h (or press the button) and watch the secant line turn into the tangent line.", function (W) {
    var p = W.plot({ xmin: -4, xmax: 4, ymin: -3, ymax: 5 });
    var f = function (x) { return 0.15 * x * x * x - x + 1; }, df = function (x) { return 0.45 * x * x - 1; };
    var x0 = -1.2, h = 2;
    var hs = slider(W.controls, "h ", 0.01, 2.5, 0.01, h, function (v) { h = v; W.draw(); });
    var anim = animator(function (dt) { h = Math.max(0.01, h * Math.pow(0.3, dt)); hs.set(h); W.draw(); return h > 0.0101; });
    button(W.controls, "Animate h → 0", function () { h = 2.5; anim.start(); });
    draggable(p, function () { return [[x0, f(x0)]]; }, function (i, x) { x0 = clamp(x, -3.6, 3.3); W.draw(); });
    W.draw = function () {
      var y0 = f(x0), x1 = x0 + h, y1 = f(x1), ms = (y1 - y0) / h, mt = df(x0);
      p.clear(); p.axes();
      p.func(f, p.t.fg, 2.5);
      p.infLine(x0, y0, 1, mt, alpha(C.green, 0.9), 2, [7, 5]);
      p.infLine(x0, y0, 1, ms, C.orange, 2.2);
      p.line(x0, y0, x1, y0, C.gray, 1, [3, 3]); p.line(x1, y0, x1, y1, C.gray, 1, [3, 3]);
      p.text("h", (x0 + x1) / 2, y0, p.t.muted, { dy: y1 > y0 ? 11 : -11, align: "center" });
      p.text("Δy", x1, (y0 + y1) / 2, p.t.muted, { dx: 6 });
      p.dot(x1, y1, 5, C.orange); p.dot(x0, y0, 7, C.blue);
      W.say("x₀ = " + fmt(x0, 2) + "     h = " + fmt(h, 3) +
        "\nsecant slope  [f(x₀+h) − f(x₀)] / h = " + fmt(ms, 4) +
        "\ntangent slope f′(x₀)               = " + fmt(mt, 4) + "     gap = " + fmt(ms - mt, 4) + "  (shrinks like h)");
    };
  });

  def("riemann", "Riemann sums converge to the area", "Increase n. Whatever sample point you choose, the total area of the rectangles converges to the exact integral, 6.4.", function (W) {
    var p = W.plot({ xmin: -0.5, xmax: 4.6, ymin: -0.4, ymax: 3.4 });
    var f = function (x) { return 0.3 * x * x - x + 2; }, n = 6, mode = "left";
    slider(W.controls, "n ", 1, 100, 1, n, function (v) { n = v; W.draw(); }, function (v) { return String(v); });
    select(W.controls, "sample point ", [["left", "left"], ["right", "right"], ["mid", "midpoint"]], mode, function (v) { mode = v; W.draw(); });
    W.draw = function () {
      p.clear(); p.axes();
      var dx = 4 / n, s = 0;
      for (var i = 0; i < n; i++) {
        var xl = i * dx, xs = mode === "left" ? xl : mode === "right" ? xl + dx : xl + dx / 2, y = f(xs);
        s += y * dx;
        p.rect(xl, 0, dx, y, alpha(C.blue, 0.22), n <= 60 ? alpha(C.blue, 0.75) : null, 1);
        if (n <= 30) p.dot(xs, y, 2.5, C.blue);
      }
      p.func(f, C.orange, 2.5);
      W.say("f(x) = 0.3x² − x + 2 on [0, 4]     n = " + n + "   Δx = " + fmt(dx, 4) +
        "\nsum of rectangles = " + fmt(s, 6) + "\nexact integral    = 6.4        error = " + fmt(s - 6.4, 6));
    };
  });

  def("taylor", "Taylor polynomials hugging a function", "Raise the degree. Near the center the fit is excellent. For ln(1+x) and 1/(1−x), no degree helps beyond distance 1 from the center: that's the radius of convergence.", function (W) {
    var p = W.plot({});
    function sgn(k) { return k % 2 ? -1 : 1; }
    var F = {
      sin: { f: Math.sin, c: function (k) { return k % 2 ? sgn((k - 1) / 2) / fact(k) : 0; }, v: [-8, 8, -3, 3], t: function (k) { return k === 1 ? "x" : "x" + sup(k) + "/" + k + "!"; } },
      cos: { f: Math.cos, c: function (k) { return k % 2 ? 0 : sgn(k / 2) / fact(k); }, v: [-8, 8, -3, 3], t: function (k) { return k === 0 ? "1" : "x" + sup(k) + "/" + k + "!"; } },
      exp: { f: Math.exp, c: function (k) { return 1 / fact(k); }, v: [-5, 3.5, -1.5, 10], t: function (k) { return k === 0 ? "1" : k === 1 ? "x" : "x" + sup(k) + "/" + k + "!"; } },
      log: { f: function (x) { return x > -1 ? Math.log(1 + x) : NaN; }, c: function (k) { return k === 0 ? 0 : -sgn(k) / k; }, v: [-1.6, 3, -3, 2.5], t: function (k) { return k === 1 ? "x" : "x" + sup(k) + "/" + k; } },
      geo: { f: function (x) { return 1 / (1 - x); }, c: function () { return 1; }, v: [-2.2, 2.2, -3, 6], t: function (k) { return k === 0 ? "1" : k === 1 ? "x" : "x" + sup(k); } }
    };
    var key = "sin", n = 3;
    select(W.controls, "f(x) = ", [["sin", "sin x"], ["cos", "cos x"], ["exp", "eˣ"], ["log", "ln(1+x)"], ["geo", "1/(1−x)"]], key, function (v) { key = v; W.draw(); });
    slider(W.controls, "degree n ", 0, 25, 1, n, function (v) { n = v; W.draw(); }, String);
    W.draw = function () {
      var G = F[key]; p.view(G.v[0], G.v[1], G.v[2], G.v[3]);
      p.clear(); p.axes();
      var T = function (x) { var s = 0, xp = 1; for (var k = 0; k <= n; k++) { s += G.c(k) * xp; xp *= x; } return s; };
      p.func(G.f, p.t.fg, 3.2);
      p.func(T, C.orange, 2.2);
      var terms = [];
      for (var k = 0; k <= n; k++) { var c = G.c(k); if (c !== 0) terms.push([c > 0 ? "+" : "−", G.t(k)]); }
      var shown = terms.slice(0, 6).map(function (t, i) { return (i === 0 ? (t[0] === "−" ? "−" : "") : " " + t[0] + " ") + t[1]; }).join("");
      if (terms.length > 6) shown += " + …";
      if (!terms.length) shown = "0";
      W.say("T" + String(n).split("").map(function (d) { return "₀₁₂₃₄₅₆₇₈₉"[+d]; }).join("") + "(x) = " + shown +
        "\nerror at x = 0.5:  f(0.5) − Tₙ(0.5) = " + fmt(G.f(0.5) - T(0.5), 8));
    };
  });

  def("unitcircle", "The unit circle generates sine and cosine", "The point at angle θ on the unit circle has coordinates (cos θ, sin θ). Tracking each coordinate over time draws the two waves.", function (W) {
    var cells = W.row(2);
    var pc = W.plot({ xmin: -1.35, xmax: 1.35, ymin: -1.35, ymax: 1.35, equal: true, aspect: 0.85 }, cells[0]);
    var pw = W.plot({ xmin: -0.3, xmax: 2 * PI + 0.3, ymin: -1.35, ymax: 1.35, aspect: 0.85 }, cells[1]);
    var th = 0.8;
    var s = slider(W.controls, "θ ", 0, 360, 1, 46, function (v) { th = v * PI / 180; W.draw(); }, function (v) { return v + "°"; });
    var anim = animator(function (dt) { th = (th + dt * 0.9) % (2 * PI); s.set(Math.round(th * 180 / PI)); W.draw(); });
    playButton(W.controls, anim);
    W.draw = function () {
      var c = Math.cos(th), sn = Math.sin(th);
      pc.clear(); pc.axes({ xstep: 0.5 });
      pc.circle(0, 0, 1, pc.t.muted, 1.5);
      pc.arc(0, 0, 22, 0, th, C.purple, 2);
      pc.line(0, 0, c, sn, pc.t.fg, 2);
      pc.line(c, 0, c, sn, C.blue, 3.5);
      pc.line(0, 0, c, 0, C.orange, 3.5);
      pc.dot(c, sn, 6, C.purple);
      pc.text("θ", 0.3 * Math.cos(th / 2), 0.3 * Math.sin(th / 2), C.purple, { align: "center" });
      pw.clear(); pw.axes({ xstep: PI / 2, ystep: 0.5, xfmt: piLabel });
      pw.func(Math.sin, alpha(C.blue, 0.9), 2.2); pw.func(Math.cos, alpha(C.orange, 0.9), 2.2);
      pw.line(th, -1.35, th, 1.35, pw.t.faint, 1, [4, 4]);
      pw.dot(th, sn, 5, C.blue); pw.dot(th, c, 5, C.orange);
      W.say("θ = " + fmt(th * 180 / PI, 0) + "° = " + fmt(th, 4) + " rad\ncos θ = " + fmt(c, 4) + " (orange)    sin θ = " + fmt(sn, 4) + " (blue)    tan θ = sin/cos = " + (Math.abs(c) < 1e-6 ? "undefined" : fmt(sn / c, 4)));
    };
  });

  def("euler", "Euler's formula as compound growth: (1 + iθ/n)ⁿ → eⁱᶿ", "Each step multiplies by (1 + iθ/n), a tiny rotation plus a tiny stretch. As n grows the stretching disappears and you land exactly on the unit circle at angle θ. With θ = π you land on −1.", function (W) {
    var p = W.plot({ xmin: -1.7, xmax: 1.7, ymin: -1.25, ymax: 1.7, equal: true, aspect: 0.72 });
    var n = 4, th = PI;
    slider(W.controls, "n ", 1, 200, 1, n, function (v) { n = v; W.draw(); }, String);
    slider(W.controls, "θ ", 0, 6.28, 0.01, th, function (v) { th = v; W.draw(); }, function (v) { return fmt(v, 2) + " rad"; });
    W.draw = function () {
      p.clear(); p.axes({ xstep: 0.5 });
      p.circle(0, 0, 1, p.t.muted, 1.5);
      var re = 1, im = 0, b = th / n, pts = [[1, 0]];
      for (var k = 0; k < n; k++) { var r2 = re - im * b, i2 = re * b + im; re = r2; im = i2; pts.push([re, im]); }
      p.path(pts, C.orange, 2);
      if (n <= 50) pts.forEach(function (q) { p.dot(q[0], q[1], 2.6, C.orange); });
      p.dot(Math.cos(th), Math.sin(th), 7, C.green, true);
      p.dot(re, im, 4.5, C.orange);
      W.say("(1 + iθ/n)ⁿ = " + fmt(re, 4) + (im >= 0 ? " + " : " − ") + fmt(Math.abs(im), 4) + "i     |·| = " + fmt(Math.hypot(re, im), 4) +
        "\neⁱᶿ = cos θ + i sin θ = " + fmt(Math.cos(th), 4) + (Math.sin(th) >= 0 ? " + " : " − ") + fmt(Math.abs(Math.sin(th)), 4) + "i  (green circle)");
    };
  });

  def("complexmul", "Multiplying complex numbers: lengths multiply, angles add", "Drag z (blue) and w (green). The product zw (orange) has length |z|·|w| and angle arg z + arg w. Put w on the unit circle and multiplication becomes pure rotation.", function (W) {
    var p = W.plot({ xmin: -3.2, xmax: 3.2, ymin: -2.4, ymax: 2.4, equal: true, aspect: 0.7 });
    var z = [1.3, 0.6], w = [0.5, 1.0];
    draggable(p, function () { return [z, w]; }, function (i, x, y) { var t = i ? w : z; t[0] = x; t[1] = y; W.draw(); });
    W.draw = function () {
      var pr = [z[0] * w[0] - z[1] * w[1], z[0] * w[1] + z[1] * w[0]];
      var az = Math.atan2(z[1], z[0]), aw = Math.atan2(w[1], w[0]), ap = Math.atan2(pr[1], pr[0]);
      p.clear(); p.axes({ xstep: 1 });
      p.circle(0, 0, 1, p.t.faint, 1.2);
      p.arc(0, 0, 26, 0, az, C.blue, 2); p.arc(0, 0, 34, 0, aw, C.green, 2); p.arc(0, 0, 42, 0, az + aw, C.orange, 2);
      p.arrow(0, 0, pr[0], pr[1], C.orange, 3); p.arrow(0, 0, z[0], z[1], C.blue, 3); p.arrow(0, 0, w[0], w[1], C.green, 3);
      p.text("z", z[0], z[1], C.blue, { dx: 8, bold: true }); p.text("w", w[0], w[1], C.green, { dx: 8, bold: true }); p.text("zw", pr[0], pr[1], C.orange, { dx: 8, bold: true });
      function deg(a) { return fmt(a * 180 / PI, 1) + "°"; }
      function cs(q) { return fmt(q[0], 2) + (q[1] >= 0 ? " + " : " − ") + fmt(Math.abs(q[1]), 2) + "i"; }
      W.say("z  = " + cs(z) + "    |z| = " + fmt(Math.hypot(z[0], z[1]), 3) + "   arg z = " + deg(az) +
        "\nw  = " + cs(w) + "    |w| = " + fmt(Math.hypot(w[0], w[1]), 3) + "   arg w = " + deg(aw) +
        "\nzw = " + cs(pr) + "    |zw| = " + fmt(Math.hypot(pr[0], pr[1]), 3) + " = |z|·|w|   arg zw = " + deg(ap) + " (≡ arg z + arg w)");
    };
  });

  def("lintrans", "A matrix is a transformation of the plane", "Move the sliders or pick a preset. The columns of the matrix are where the basis vectors land: green = first column = A(1,0), red = second column = A(0,1). The yellow unit square becomes a parallelogram of area |det A|.", function (W) {
    var p = W.plot({ xmin: -4.5, xmax: 4.5, ymin: -3.2, ymax: 3.2, equal: true, aspect: 0.68 });
    var c30 = Math.cos(PI / 6), s30 = Math.sin(PI / 6);
    var presets = { shear: [1, 1, 0, 1], rotate: [c30, -s30, s30, c30], rot90: [0, -1, 1, 0], scale: [2, 0, 0, 0.5], reflect: [1, 0, 0, -1], project: [1, 0, 0, 0], singular: [1, 2, 0.5, 1], general: [1.5, -0.5, 0.7, 1.2] };
    var M = presets.shear.slice(), t = 1;
    var sl = matSliders(W, function () { return M; }, function () { t = 1; W.draw(); });
    var anim = animator(function (dt) { t = Math.min(1, t + dt * 0.7); W.draw(); return t < 1; });
    select(W.controls, "preset ", [["shear", "shear"], ["rotate", "rotate 30°"], ["rot90", "rotate 90°"], ["scale", "stretch"], ["reflect", "reflect"], ["project", "project onto x-axis"], ["singular", "singular (det 0)"], ["general", "general"]], "shear",
      function (v) { M = presets[v].slice(); sl.forEach(function (s, i) { s.set(M[i]); }); t = 0; anim.start(); });
    button(W.controls, "Animate from identity", function () { t = 0; anim.start(); });
    W.draw = function () {
      var a = 1 + (M[0] - 1) * t, b = M[1] * t, c = M[2] * t, d = 1 + (M[3] - 1) * t;
      function T(x, y) { return [a * x + b * y, c * x + d * y]; }
      p.clear(); p.axes({ labels: false });
      for (var k = -8; k <= 8; k++) {
        var A1 = T(k, -8), A2 = T(k, 8), B1 = T(-8, k), B2 = T(8, k), col = alpha(C.blue, k === 0 ? 0.75 : 0.3), lw = k === 0 ? 1.8 : 1;
        p.line(A1[0], A1[1], A2[0], A2[1], col, lw); p.line(B1[0], B1[1], B2[0], B2[1], col, lw);
      }
      var sq = [T(0, 0), T(1, 0), T(1, 1), T(0, 1)];
      p.poly(sq, alpha(C.yellow, 0.35), alpha(C.yellow, 0.95), 1.5);
      var e1 = T(1, 0), e2 = T(0, 1);
      p.arrow(0, 0, e1[0], e1[1], C.green, 3.2); p.arrow(0, 0, e2[0], e2[1], C.red, 3.2);
      var det = a * d - b * c;
      W.say("A = " + matStr(a, b, c, d) + "\nA(1,0) = (" + fmt(a, 2) + ", " + fmt(c, 2) + ")   A(0,1) = (" + fmt(b, 2) + ", " + fmt(d, 2) + ")" +
        "\ndet A = ad − bc = " + fmt(det, 3) + "  →  areas scale by " + fmt(Math.abs(det), 3) + (det < -1e-9 ? ", orientation flipped" : "") +
        (Math.abs(det) < 1e-9 ? "\nThe plane collapses onto a line (or a point). Information is lost, so A has no inverse." : ""));
    };
  });

  function eigvec(a, b, c, d, l) {
    if (Math.abs(b) > 1e-9) return [b, l - a];
    if (Math.abs(c) > 1e-9) return [l - d, c];
    return Math.abs(l - a) < 1e-9 ? [1, 0] : [0, 1];
  }

  def("eigen", "Hunting for eigenvectors", "Blue v sweeps around the unit circle (press Play, or drag it). Orange is Av. When the two line up, Av = λv and v is an eigenvector. The purple dashed lines are the eigen-directions; the dotted curve is where Av travels.", function (W) {
    var p = W.plot({ xmin: -4, xmax: 4, ymin: -3.2, ymax: 3.2, equal: true, aspect: 0.7 });
    var presets = { sym: [2, 1, 1, 2], tri: [3, 1, 0, 2], shear: [1, 1, 0, 1], rot: [0, -1, 1, 0], neg: [1, 2, 2, -2], markov: [0.9, 0.3, 0.1, 0.7] };
    var M = presets.sym.slice(), ang = 0.35;
    var sl = matSliders(W, function () { return M; }, function () { W.draw(); });
    select(W.controls, "preset ", [["sym", "symmetric [[2,1],[1,2]]"], ["tri", "triangular"], ["shear", "shear (one eigen-direction)"], ["rot", "rotation (none real)"], ["neg", "negative eigenvalue"], ["markov", "Markov matrix"]], "sym",
      function (v) { M = presets[v].slice(); sl.forEach(function (s, i) { s.set(M[i]); }); W.draw(); });
    var anim = animator(function (dt) { ang = (ang + dt * 0.5) % (2 * PI); W.draw(); });
    playButton(W.controls, anim);
    draggable(p, function () { return [[Math.cos(ang), Math.sin(ang)]]; }, function (i, x, y) { ang = Math.atan2(y, x); W.draw(); });
    W.draw = function () {
      var a = M[0], b = M[1], c = M[2], d = M[3];
      p.clear(); p.axes();
      var pts = [];
      for (var k = 0; k <= 120; k++) { var t = 2 * PI * k / 120; pts.push([a * Math.cos(t) + b * Math.sin(t), c * Math.cos(t) + d * Math.sin(t)]); }
      p.path(pts, alpha(C.orange, 0.45), 1.5, [3, 4]);
      p.circle(0, 0, 1, p.t.faint, 1.5);
      var tr = a + d, det = a * d - b * c, disc = tr * tr / 4 - det, txt;
      if (disc >= -1e-12) {
        var s = Math.sqrt(Math.max(0, disc)), l1 = tr / 2 + s, l2 = tr / 2 - s;
        [l1, l2].forEach(function (l) { var v = eigvec(a, b, c, d, l); p.infLine(0, 0, v[0], v[1], alpha(C.purple, 0.65), 1.6, [7, 5]); });
        txt = "eigenvalues: λ₁ = " + fmt(l1, 3) + ",  λ₂ = " + fmt(l2, 3) + "   (λ₁ + λ₂ = trace = " + fmt(tr, 3) + ",  λ₁λ₂ = det = " + fmt(det, 3) + ")";
      } else txt = "eigenvalues: " + fmt(tr / 2, 3) + " ± " + fmt(Math.sqrt(-disc), 3) + "i (complex). No real direction is kept: A rotates every vector.";
      var vx = Math.cos(ang), vy = Math.sin(ang), ax = a * vx + b * vy, ay = c * vx + d * vy;
      var cross = vx * ay - vy * ax, aligned = Math.abs(cross) < 0.05 * Math.max(0.3, Math.hypot(ax, ay));
      p.arrow(0, 0, ax, ay, C.orange, 3.2);
      p.arrow(0, 0, vx, vy, aligned ? C.green : C.blue, 3.2);
      W.say("A = " + matStr(a, b, c, d) + "\nv = (" + fmt(vx, 2) + ", " + fmt(vy, 2) + ")   Av = (" + fmt(ax, 2) + ", " + fmt(ay, 2) + ")" +
        (aligned ? "   ← aligned!  Av ≈ " + fmt(vx * ax + vy * ay, 2) + "·v" : "") + "\n" + txt);
    };
  });

  def("projection", "Projecting b onto the line through a", "Drag the tips of a (green) and b (blue). The projection p is the closest point to b on the line, and the error e = b − p (red) is always perpendicular to a.", function (W) {
    var p = W.plot({ xmin: -1.5, xmax: 5, ymin: -1.2, ymax: 3.8, equal: true, aspect: 0.62 });
    var A = [4, 1], B = [1.8, 3];
    draggable(p, function () { return [A, B]; }, function (i, x, y) { var t = i ? B : A; t[0] = x; t[1] = y; W.draw(); });
    W.draw = function () {
      var aa = A[0] * A[0] + A[1] * A[1], ab = A[0] * B[0] + A[1] * B[1], k = aa > 1e-9 ? ab / aa : 0, Pp = [k * A[0], k * A[1]];
      var e = [B[0] - Pp[0], B[1] - Pp[1]], el2 = Math.hypot(e[0], e[1]), al = Math.sqrt(aa);
      p.clear(); p.axes();
      p.infLine(0, 0, A[0], A[1], p.t.faint, 1.2, [5, 5]);
      if (el2 > 0.08 && al > 0.01) {
        var s = 0.18, u = [A[0] / al * s, A[1] / al * s], v = [e[0] / el2 * s, e[1] / el2 * s];
        p.path([[Pp[0] + u[0], Pp[1] + u[1]], [Pp[0] + u[0] + v[0], Pp[1] + u[1] + v[1]], [Pp[0] + v[0], Pp[1] + v[1]]], p.t.muted, 1.2);
      }
      p.line(B[0], B[1], Pp[0], Pp[1], C.red, 2.2, [5, 4]);
      p.arrow(0, 0, Pp[0], Pp[1], C.orange, 5);
      p.arrow(0, 0, A[0], A[1], C.green, 2.5);
      p.arrow(0, 0, B[0], B[1], C.blue, 2.5);
      p.text("a", A[0], A[1], C.green, { dx: 8, bold: true }); p.text("b", B[0], B[1], C.blue, { dx: 8, bold: true });
      p.text("p", Pp[0], Pp[1], C.orange, { dy: 14, bold: true }); p.text("e", (B[0] + Pp[0]) / 2, (B[1] + Pp[1]) / 2, C.red, { dx: 8, bold: true });
      W.say("a·b = " + fmt(ab, 3) + "    a·a = " + fmt(aa, 3) + "\np = (a·b / a·a) a = " + fmt(k, 3) + "·a = (" + fmt(Pp[0], 3) + ", " + fmt(Pp[1], 3) + ")" +
        "\ne = b − p = (" + fmt(e[0], 3) + ", " + fmt(e[1], 3) + ")    e·a = " + fmt(e[0] * A[0] + e[1] * A[1], 6) + "  (always 0)");
    };
  });

  def("leastsquares", "Least squares: minimize the total squared error", "Drag the points. Each yellow square has area (residual)²; the orange line is the unique line making their total area smallest.", function (W) {
    var p = W.plot({ xmin: -0.3, xmax: 10.3, ymin: -0.6, ymax: 7.2, equal: true, aspect: 0.6 });
    var base = [[1, 1.2], [2, 2.6], [3, 2.0], [4, 3.7], [5, 3.0], [6, 4.5], [7, 4.1], [8, 5.7], [9, 5.0]];
    var pts = base.map(function (q) { return q.slice(); }), showSq = true;
    draggable(p, function () { return pts; }, function (i, x, y) { pts[i] = [x, y]; W.draw(); });
    checkbox(W.controls, " show squared residuals", true, function (v) { showSq = v; W.draw(); });
    button(W.controls, "Reset", function () { pts = base.map(function (q) { return q.slice(); }); W.draw(); });
    W.draw = function () {
      var n = pts.length, sx = 0, sy = 0, sxx = 0, sxy = 0;
      pts.forEach(function (q) { sx += q[0]; sy += q[1]; sxx += q[0] * q[0]; sxy += q[0] * q[1]; });
      var den = n * sxx - sx * sx, m = Math.abs(den) > 1e-12 ? (n * sxy - sx * sy) / den : 0, c = (sy - m * sx) / n, sse = 0;
      p.clear(); p.axes();
      pts.forEach(function (q) {
        var yh = m * q[0] + c, r = q[1] - yh; sse += r * r;
        if (showSq) p.rect(q[0], Math.min(yh, q[1]), Math.abs(r), Math.abs(r), alpha(C.yellow, 0.3), alpha(C.yellow, 0.9), 1);
        p.line(q[0], q[1], q[0], yh, C.red, 1.6);
      });
      p.infLine(0, c, 1, m, C.orange, 2.5);
      pts.forEach(function (q) { p.dot(q[0], q[1], 6, C.blue); });
      W.say("best line:  ŷ = " + fmt(m, 3) + "·x " + (c >= 0 ? "+ " : "− ") + fmt(Math.abs(c), 3) +
        "\nsum of squared residuals = " + fmt(sse, 4) + "   (any other line gives a larger number)");
    };
  });

  function svd2(a, b, c, d) {
    var p = a * a + c * c, q = a * b + c * d, r = b * b + d * d;
    var th = 0.5 * Math.atan2(2 * q, p - r), m = (p + r) / 2, h = Math.sqrt((p - r) * (p - r) / 4 + q * q);
    return { th: th, v1: [Math.cos(th), Math.sin(th)], v2: [-Math.sin(th), Math.cos(th)], s1: Math.sqrt(Math.max(0, m + h)), s2: Math.sqrt(Math.max(0, m - h)) };
  }

  def("svd", "SVD: every matrix maps the unit circle to an ellipse", "Left: the unit circle with the right singular vectors v₁, v₂, which are perpendicular. Right: the image of the circle under A, an ellipse whose axes are Av₁ = σ₁u₁ and Av₂ = σ₂u₂, also perpendicular. Colored dots show where each point goes.", function (W) {
    var cells = W.row(2);
    var pl = W.plot({ xmin: -1.6, xmax: 1.6, ymin: -1.6, ymax: 1.6, equal: true, aspect: 0.9 }, cells[0]);
    var pr = W.plot({ xmin: -3.6, xmax: 3.6, ymin: -3.6, ymax: 3.6, equal: true, aspect: 0.9 }, cells[1]);
    var M = [1.5, 1, 0.3, 1.2];
    matSliders(W, function () { return M; }, function () { W.draw(); });
    W.draw = function () {
      var a = M[0], b = M[1], c = M[2], d = M[3], S = svd2(a, b, c, d), k;
      function A(v) { return [a * v[0] + b * v[1], c * v[0] + d * v[1]]; }
      pl.clear(); pl.axes({ xstep: 0.5 }); pr.clear(); pr.axes({ xstep: 1 });
      pl.circle(0, 0, 1, pl.t.muted, 1.5);
      var ell = []; for (k = 0; k <= 100; k++) ell.push(A([Math.cos(2 * PI * k / 100), Math.sin(2 * PI * k / 100)]));
      pr.path(ell, pr.t.muted, 1.5);
      for (k = 0; k < 24; k++) {
        var t = 2 * PI * k / 24, q = [Math.cos(t), Math.sin(t)], Aq = A(q), col = "hsl(" + (k * 15) + ",70%,55%)";
        pl.dot(q[0], q[1], 3.5, col); pr.dot(Aq[0], Aq[1], 3.5, col);
      }
      var u1 = A(S.v1), u2 = A(S.v2);
      pl.arrow(0, 0, S.v1[0], S.v1[1], C.orange, 3); pl.arrow(0, 0, S.v2[0], S.v2[1], C.green, 3);
      pl.text("v₁", S.v1[0], S.v1[1], C.orange, { dx: 6, bold: true }); pl.text("v₂", S.v2[0], S.v2[1], C.green, { dx: 6, bold: true });
      pr.arrow(0, 0, u1[0], u1[1], C.orange, 3); pr.arrow(0, 0, u2[0], u2[1], C.green, 3);
      pr.text("σ₁u₁", u1[0], u1[1], C.orange, { dx: 6, bold: true }); pr.text("σ₂u₂", u2[0], u2[1], C.green, { dx: 6, bold: true });
      W.say("A = " + matStr(a, b, c, d) + "\nσ₁ = " + fmt(S.s1, 3) + " (longest stretch)   σ₂ = " + fmt(S.s2, 3) + " (shortest stretch)" +
        "\nσ₁·σ₂ = " + fmt(S.s1 * S.s2, 3) + " = |det A| = " + fmt(Math.abs(a * d - b * c), 3) + (S.s2 < 1e-6 ? "\nσ₂ = 0: the ellipse is flat, A has rank 1." : ""));
    };
  });

  function numGrad(f) { return function (x, y) { var h = 1e-5; return [(f(x + h, y) - f(x - h, y)) / (2 * h), (f(x, y + h) - f(x, y - h)) / (2 * h)]; }; }

  def("gradient", "The gradient points uphill, at right angles to the contour lines", "Drag the white point (or click anywhere). Bands are contour levels: brighter means higher. Turn the direction u: the slope ∇f·u is largest when u points along ∇f and zero along the contour.", function (W) {
    var p = W.plot({ xmin: -3, xmax: 3, ymin: -2.2, ymax: 2.2, equal: true, aspect: 0.66 });
    var hills = function (x, y) { return Math.exp(-((x - 1) * (x - 1) + y * y)) + 0.8 * Math.exp(-1.5 * ((x + 1.2) * (x + 1.2) + (y - 0.6) * (y - 0.6))); };
    var F = {
      bowl: { f: function (x, y) { return x * x + 2 * y * y; }, n: "f = x² + 2y²" },
      saddle: { f: function (x, y) { return x * x - y * y; }, n: "f = x² − y²" },
      hills: { f: hills, n: "f = two Gaussian hills" }
    };
    var key = "bowl", Q = [1.3, 0.8], ua = 30, field = true;
    select(W.controls, "function ", [["bowl", "bowl x² + 2y²"], ["saddle", "saddle x² − y²"], ["hills", "two hills"]], key, function (v) { key = v; W.draw(); });
    slider(W.controls, "direction u ", 0, 360, 1, ua, function (v) { ua = v; W.draw(); }, function (v) { return v + "°"; });
    checkbox(W.controls, " gradient field", true, function (v) { field = v; W.draw(); });
    draggable(p, function () { return [Q]; }, function (i, x, y) { Q = [x, y]; W.draw(); }, { onTap: function (x, y) { Q = [x, y]; W.draw(); } });
    W.draw = function () {
      var f = F[key].f, g = numGrad(f), x, y;
      p.clear(); heat(p, f); p.axes({ labels: true });
      if (field) {
        var gm = 0, G = [];
        for (x = -3; x <= 3.01; x += 0.5) for (y = -2; y <= 2.01; y += 0.5) { var v = g(x, y), m = Math.hypot(v[0], v[1]); gm = Math.max(gm, m); G.push([x, y, v, m]); }
        G.forEach(function (e) { if (e[3] < 1e-9) return; var L = 0.38 * Math.sqrt(e[3] / gm); p.arrow(e[0], e[1], e[0] + e[2][0] / e[3] * L, e[1] + e[2][1] / e[3] * L, alpha(p.t.dark ? "#ffffff" : "#000000", 0.4), 1.2, 6); });
      }
      var gq = g(Q[0], Q[1]), gl = Math.hypot(gq[0], gq[1]), sc = Math.min(1.4, gl * 0.5) / (gl || 1);
      var u = [Math.cos(ua * PI / 180), Math.sin(ua * PI / 180)], du = gq[0] * u[0] + gq[1] * u[1];
      if (gl > 1e-9) p.infLine(Q[0], Q[1], -gq[1], gq[0], alpha("#ffffff", 0.6), 1.2, [4, 4]);
      p.arrow(Q[0], Q[1], Q[0] + gq[0] * sc, Q[1] + gq[1] * sc, C.orange, 3.4);
      p.arrow(Q[0], Q[1], Q[0] + 0.8 * u[0], Q[1] + 0.8 * u[1], C.blue, 2.6);
      p.dot(Q[0], Q[1], 6, "#ffffff"); p.dot(Q[0], Q[1], 3, "#000000");
      W.say(F[key].n + "    at (" + fmt(Q[0], 2) + ", " + fmt(Q[1], 2) + "):  f = " + fmt(f(Q[0], Q[1]), 3) +
        "\n∇f = (" + fmt(gq[0], 3) + ", " + fmt(gq[1], 3) + ")  (orange)   |∇f| = " + fmt(gl, 3) +
        "\nslope in direction u (blue):  ∇f·u = " + fmt(du, 3) + "  = |∇f|·cos(angle)   (max " + fmt(gl, 3) + " when u ∥ ∇f; 0 along the dashed contour)");
    };
  });

  def("gd", "Gradient descent: learning rate and momentum", "Click anywhere to choose a start, then press Play. On the narrow valley, any learning rate above 0.2 diverges. Small rates crawl. Momentum speeds up the crawl but can overshoot.", function (W) {
    var p = W.plot({ equal: true, aspect: 0.62 });
    var F = {
      valley: { f: function (x, y) { return 0.5 * (x * x + 10 * y * y); }, g: function (x, y) { return [x, 10 * y]; }, v: [-4.5, 4.5, -2.6, 2.6], s: [-4, 1.6] },
      banana: { f: function (x, y) { return (1 - x) * (1 - x) + 5 * (y - x * x) * (y - x * x); }, g: function (x, y) { return [-2 * (1 - x) - 20 * x * (y - x * x), 10 * (y - x * x)]; }, v: [-2.2, 2.2, -1.2, 3], s: [-1.8, 2.6] },
      wells: { f: function (x, y) { return (x * x - 1) * (x * x - 1) + 0.5 * y * y + 0.3 * x; }, g: function (x, y) { return [4 * x * (x * x - 1) + 0.3, y]; }, v: [-2, 2, -1.6, 1.6], s: [1.7, 1.3] }
    };
    var key = "valley", lr = 0.1, beta = 0, path, vel, acc = 0, dead = false;
    function reset(start) { path = [(start || F[key].s).slice()]; vel = [0, 0]; dead = false; }
    function step() {
      if (dead) return;
      var q = path[path.length - 1], g = F[key].g(q[0], q[1]);
      vel = [beta * vel[0] - lr * g[0], beta * vel[1] - lr * g[1]];
      var nq = [q[0] + vel[0], q[1] + vel[1]];
      if (!isFinite(nq[0]) || !isFinite(nq[1]) || Math.hypot(nq[0], nq[1]) > 1e6) { dead = true; return; }
      path.push(nq);
    }
    reset();
    select(W.controls, "landscape ", [["valley", "narrow valley ½(x² + 10y²)"], ["banana", "Rosenbrock banana"], ["wells", "two wells (non-convex)"]], key, function (v) { key = v; anim.stop(); reset(); W.draw(); });
    slider(W.controls, "learning rate η ", -3, -0.3, 0.01, -1, function (v) { lr = Math.pow(10, v); }, function (v) { return fmt(Math.pow(10, v), 4); });
    slider(W.controls, "momentum β ", 0, 0.95, 0.05, 0, function (v) { beta = v; }, function (v) { return fmt(v, 2); });
    var anim = animator(function (dt) { acc += dt; while (acc > 0.035) { acc -= 0.035; step(); } W.draw(); return path.length < 400 && !dead; });
    playButton(W.controls, anim);
    button(W.controls, "Step", function () { step(); W.draw(); });
    button(W.controls, "Reset", function () { anim.stop(); reset(); W.draw(); });
    draggable(p, function () { return []; }, function () {}, { onTap: function (x, y) { anim.stop(); reset([x, y]); W.draw(); } });
    W.draw = function () {
      var G = F[key]; p.view(G.v[0], G.v[1], G.v[2], G.v[3]);
      p.clear(); heat(p, G.f); p.axes();
      p.path(path, C.orange, 2);
      path.forEach(function (q, i) { if (i < 200) p.dot(q[0], q[1], 2.4, C.orange); });
      p.dot(path[0][0], path[0][1], 6, "#ffffff");
      var q = path[path.length - 1], g = G.g(q[0], q[1]);
      p.dot(q[0], q[1], 5, C.red);
      W.say("η = " + fmt(lr, 4) + "   β = " + fmt(beta, 2) + "   step " + (path.length - 1) +
        (dead ? "\nDIVERGED: the steps grew without bound. Lower η." : "\nf = " + fmt(G.f(q[0], q[1]), 6) + "    |∇f| = " + fmt(Math.hypot(g[0], g[1]), 6)) +
        "\nupdate:  v ← βv − η∇f(x),   x ← x + v");
    };
  });

  def("bayes", "Bayes' theorem with 1000 people", "Each dot is a person. Red = sick and tests positive, pale red = sick but missed, orange = healthy but tests positive, gray = healthy and negative. When a disease is rare, most positives come from the huge healthy group.", function (W) {
    var p = W.plot({ xmin: 0, xmax: 40, ymin: 0, ymax: 25, aspect: 0.6 });
    var prev = 0.01, sens = 0.9, fpr = 0.09;
    function pct(v) { return fmt(100 * v, 1) + "%"; }
    slider(W.controls, "prevalence P(sick) ", 0.001, 0.3, 0.001, prev, function (v) { prev = v; W.draw(); }, pct);
    slider(W.controls, "sensitivity P(+|sick) ", 0.5, 1, 0.01, sens, function (v) { sens = v; W.draw(); }, pct);
    slider(W.controls, "false-positive rate P(+|healthy) ", 0, 0.3, 0.005, fpr, function (v) { fpr = v; W.draw(); }, pct);
    W.draw = function () {
      var N = 1000, sick = Math.round(N * prev), tp = Math.round(sick * sens), fn = sick - tp, healthy = N - sick, fp = Math.round(healthy * fpr), tn = healthy - fp;
      p.clear();
      var cats = [[tp, C.red], [fn, alpha(C.red, 0.3)], [fp, C.orange], [tn, p.t.faint]], k = 0;
      var r = Math.min(p.w / 40, p.h / 25) * 0.36;
      cats.forEach(function (cat) { for (var i = 0; i < cat[0]; i++, k++) p.dot(k % 40 + 0.5, 25 - Math.floor(k / 40) - 0.5, r, cat[1]); });
      var post = prev * sens / (prev * sens + (1 - prev) * fpr);
      W.say("Of 1000 people: " + sick + " sick (" + tp + " test +), " + healthy + " healthy (" + fp + " test + anyway)" +
        "\nP(sick | +) ≈ " + tp + " / (" + tp + " + " + fp + ") = " + (tp + fp ? fmt(tp / (tp + fp), 3) : "—") +
        "\nexact Bayes: P(+|sick)P(sick) / P(+) = " + fmt(post, 4));
    };
  });

  def("clt", "The central limit theorem in action", "Pick a starting distribution (even a lopsided one) and the number n of draws to add up. The histogram shows the standardized sum (Sₙ − nμ)/(σ√n). As n grows, it becomes the bell curve.", function (W) {
    var p = W.plot({ xmin: -4, xmax: 4, ymin: 0, ymax: 0.62 });
    var D = {
      expo: { s: function (r) { return -Math.log(1 - r()); }, mu: 1, sd: 1 },
      uniform: { s: function (r) { return r(); }, mu: 0.5, sd: Math.sqrt(1 / 12) },
      coin: { s: function (r) { return r() < 0.2 ? 1 : 0; }, mu: 0.2, sd: 0.4 },
      die: { s: function (r) { return 1 + Math.floor(r() * 6); }, mu: 3.5, sd: Math.sqrt(35 / 12) }
    };
    var key = "expo", n = 1, B = 64, bins = new Array(B).fill(0), count = 0, R = rng(7), bw = 8 / B;
    function reset() { bins.fill(0); count = 0; }
    function sample() {
      var d = D[key], s = 0; for (var i = 0; i < n; i++) s += d.s(R);
      var z = (s - n * d.mu) / (d.sd * Math.sqrt(n)), idx = Math.floor((z + 4) / bw);
      if (idx >= 0 && idx < B) bins[idx]++; count++;
    }
    var anim = animator(function () { for (var k = 0; k < 250; k++) sample(); W.draw(); return count < 50000; });
    select(W.controls, "each draw is ", [["expo", "exponential (skewed)"], ["uniform", "uniform on [0,1]"], ["coin", "biased coin, p = 0.2"], ["die", "fair die"]], key, function (v) { key = v; reset(); anim.start(); });
    slider(W.controls, "n (draws summed) ", 1, 60, 1, n, function (v) { n = v; reset(); anim.start(); }, String);
    button(W.controls, "Resample", function () { reset(); anim.start(); });
    W.draw = function () {
      p.clear(); p.axes({ ystep: 0.1 });
      for (var i = 0; i < B; i++) if (bins[i]) { var h = bins[i] / (Math.max(1, count) * bw); p.rect(-4 + i * bw, 0, bw, Math.min(h, 0.62), alpha(C.blue, 0.45), alpha(C.blue, 0.8), 0.8); }
      p.func(function (x) { return npdf(x, 0, 1); }, C.orange, 2.5);
      W.say("n = " + n + "    samples drawn: " + count + "\norange = standard normal density  (1/√(2π)) e^(−z²/2)");
    };
    anim.start();
  });

  def("lln", "The law of large numbers", "Each line is one person flipping a coin over and over, tracking the fraction of heads so far. Early on they disagree wildly; eventually all are squeezed toward p. Dashed: p ± 2σ/√n.", function (W) {
    var p = W.plot({ xmin: 0, xmax: 1000, ymin: 0, ymax: 1, aspect: 0.5 });
    var prob = 0.5, runs = [], seed = 1;
    function gen() {
      var R = rng(seed++); runs = [];
      for (var r = 0; r < 6; r++) { var h = 0, arr = []; for (var k = 1; k <= 1000; k++) { h += R() < prob ? 1 : 0; arr.push([k, h / k]); } runs.push(arr); }
    }
    slider(W.controls, "p = P(heads) ", 0.05, 0.95, 0.05, prob, function (v) { prob = v; gen(); W.draw(); }, function (v) { return fmt(v, 2); });
    button(W.controls, "Flip again", function () { gen(); W.draw(); });
    gen();
    W.draw = function () {
      p.clear(); p.axes({ ystep: 0.1 });
      var s = Math.sqrt(prob * (1 - prob));
      p.func(function (n) { return prob + 2 * s / Math.sqrt(n); }, p.t.muted, 1.2, { from: 1, dash: [4, 4] });
      p.func(function (n) { return prob - 2 * s / Math.sqrt(n); }, p.t.muted, 1.2, { from: 1, dash: [4, 4] });
      runs.forEach(function (arr, i) { p.path(arr, alpha(SERIES[i % SERIES.length], 0.85), 1.6); });
      p.line(0, prob, 1000, prob, p.t.fg, 1.5);
      W.say("final averages after 1000 flips: " + runs.map(function (a) { return fmt(a[999][1], 3); }).join(", ") + "    (true p = " + fmt(prob, 2) + ")");
    };
  });

  def("gaussian2d", "A 2-D Gaussian and its covariance matrix", "The ellipses are the 1σ and 2σ contours. Their axes point along the eigenvectors of Σ with half-lengths √λ: exactly what PCA computes.", function (W) {
    var p = W.plot({ xmin: -4.5, xmax: 4.5, ymin: -3.3, ymax: 3.3, equal: true, aspect: 0.66 });
    var sx = 1.5, sy = 0.8, rho = 0.6, R = rng(3), Z = [];
    for (var i = 0; i < 700; i++) Z.push([gauss(R), gauss(R)]);
    slider(W.controls, "σₓ ", 0.2, 2.5, 0.05, sx, function (v) { sx = v; W.draw(); });
    slider(W.controls, "σᵧ ", 0.2, 2.5, 0.05, sy, function (v) { sy = v; W.draw(); });
    slider(W.controls, "correlation ρ ", -0.95, 0.95, 0.01, rho, function (v) { rho = v; W.draw(); });
    W.draw = function () {
      var a = sx * sx, b = rho * sx * sy, d = sy * sy;
      var th = 0.5 * Math.atan2(2 * b, a - d), m = (a + d) / 2, h = Math.sqrt((a - d) * (a - d) / 4 + b * b), l1 = m + h, l2 = m - h;
      var e1 = [Math.cos(th), Math.sin(th)], e2 = [-Math.sin(th), Math.cos(th)];
      p.clear(); p.axes();
      var dc = alpha(C.blue, 0.45), q = Math.sqrt(1 - rho * rho);
      Z.forEach(function (z) { p.dot(sx * z[0], sy * (rho * z[0] + q * z[1]), 2.2, dc); });
      [1, 2].forEach(function (k) {
        var pts = [];
        for (var j = 0; j <= 100; j++) { var t = 2 * PI * j / 100, u = k * Math.sqrt(l1) * Math.cos(t), v = k * Math.sqrt(Math.max(0, l2)) * Math.sin(t); pts.push([u * e1[0] + v * e2[0], u * e1[1] + v * e2[1]]); }
        p.path(pts, k === 1 ? C.orange : alpha(C.orange, 0.5), 2);
      });
      p.arrow(0, 0, Math.sqrt(l1) * e1[0], Math.sqrt(l1) * e1[1], C.red, 3);
      p.arrow(0, 0, Math.sqrt(Math.max(0, l2)) * e2[0], Math.sqrt(Math.max(0, l2)) * e2[1], C.green, 3);
      W.say("Σ = [[" + fmt(a, 3) + ", " + fmt(b, 3) + "], [" + fmt(b, 3) + ", " + fmt(d, 3) + "]]" +
        "\neigenvalues λ₁ = " + fmt(l1, 3) + ", λ₂ = " + fmt(l2, 3) + "   → first principal component (red) explains " + fmt(100 * l1 / (l1 + l2), 1) + "% of the variance");
    };
  });

  function H2(q) { return q <= 0 || q >= 1 ? 0 : -q * Math.log2(q) - (1 - q) * Math.log2(1 - q); }

  def("entropy", "Entropy of a coin", "Entropy is the average surprise. A fair coin is the least predictable coin: 1 bit per flip. A coin that almost always lands heads carries almost no information.", function (W) {
    var cells = W.row(2);
    var pl = W.plot({ xmin: -0.05, xmax: 1.05, ymin: -0.08, ymax: 1.15, aspect: 0.75 }, cells[0]);
    var pb = W.plot({ xmin: 0, xmax: 2, ymin: 0, ymax: 1.25, aspect: 0.75 }, cells[1]);
    var q = 0.2;
    slider(W.controls, "p = P(heads) ", 0.001, 0.999, 0.001, q, function (v) { q = v; W.draw(); });
    W.draw = function () {
      var H = H2(q);
      pl.clear(); pl.axes({ xstep: 0.2, ystep: 0.2 });
      pl.func(H2, C.blue, 2.5, { from: 0, to: 1 });
      pl.line(q, 0, q, H, C.gray, 1, [4, 4]); pl.dot(q, H, 6, C.orange);
      pl.text("H(p) in bits", 0.02, 1.08, pl.t.muted);
      pb.clear(); pb.axes({ labels: false, grid: false });
      [[0.5, q, "heads", C.orange], [1.5, 1 - q, "tails", C.blue]].forEach(function (b) {
        pb.rect(b[0] - 0.3, 0, 0.6, b[1], alpha(b[3], 0.55), b[3], 1.5);
        pb.text(b[2] + "  p = " + fmt(b[1], 3), b[0], b[1], pb.t.fg, { align: "center", dy: -26 });
        pb.text("surprise " + fmt(-Math.log2(b[1]), 2) + " bits", b[0], b[1], pb.t.muted, { align: "center", dy: -11, size: 11 });
      });
      W.say("H = p·log₂(1/p) + (1−p)·log₂(1/(1−p)) = " + fmt(q, 3) + "×" + fmt(-Math.log2(q), 3) + " + " + fmt(1 - q, 3) + "×" + fmt(-Math.log2(1 - q), 3) + " = " + fmt(H, 4) + " bits");
    };
  });

  def("kl", "KL divergence between two Gaussians, and why it isn't symmetric", "p is blue, q is orange. KL(p‖q) asks: if the truth is p but I believe q, how many extra nats do I pay per sample? Make q narrow and p wide (or the reverse) to see the asymmetry.", function (W) {
    var p = W.plot({ xmin: -7, xmax: 7, ymin: 0, ymax: 1, aspect: 0.48 });
    var mp = -1, sp = 1, mq = 1, sq = 1.5;
    slider(W.controls, "μₚ ", -4, 4, 0.1, mp, function (v) { mp = v; W.draw(); });
    slider(W.controls, "σₚ ", 0.3, 3, 0.05, sp, function (v) { sp = v; W.draw(); });
    slider(W.controls, "μ_q ", -4, 4, 0.1, mq, function (v) { mq = v; W.draw(); });
    slider(W.controls, "σ_q ", 0.3, 3, 0.05, sq, function (v) { sq = v; W.draw(); });
    function kl(m1, s1, m2, s2) { return Math.log(s2 / s1) + (s1 * s1 + (m1 - m2) * (m1 - m2)) / (2 * s2 * s2) - 0.5; }
    W.draw = function () {
      var top = Math.max(npdf(0, 0, sp), npdf(0, 0, sq)) * 1.15;
      p.view(-7, 7, 0, top);
      p.clear(); p.axes();
      p.fillFunc(function (x) { return npdf(x, mp, sp); }, alpha(C.blue, 0.2));
      p.fillFunc(function (x) { return npdf(x, mq, sq); }, alpha(C.orange, 0.2));
      p.func(function (x) { return npdf(x, mp, sp); }, C.blue, 2.5);
      p.func(function (x) { return npdf(x, mq, sq); }, C.orange, 2.5);
      var a = kl(mp, sp, mq, sq), b = kl(mq, sq, mp, sp), Hp = 0.5 * Math.log(2 * PI * Math.E * sp * sp);
      W.say("KL(p‖q) = " + fmt(a, 4) + " nats     KL(q‖p) = " + fmt(b, 4) + " nats   (different!)" +
        "\nH(p) = " + fmt(Hp, 4) + "    cross-entropy H(p, q) = H(p) + KL(p‖q) = " + fmt(Hp + a, 4));
    };
  });

  function sawf(x) { return x - 2 * PI * Math.floor((x + PI) / (2 * PI)); }

  def("fourier", "Building waves out of sines and cosines", "Each extra term adds one more frequency. The partial sums converge to the wave, but near a jump they overshoot by about 9% no matter how many terms you take (the Gibbs phenomenon); the overshoot just gets narrower.", function (W) {
    var p = W.plot({ aspect: 0.48 });
    var Wv = {
      square: { f: function (x) { return Math.sign(Math.sin(x)); }, c0: 0, term: function (k, x) { var m = 2 * k - 1; return 4 / (PI * m) * Math.sin(m * x); }, v: [-1.7, 1.7], n: "square wave = (4/π)[sin x + sin 3x/3 + sin 5x/5 + …]" },
      saw: { f: sawf, c0: 0, term: function (k, x) { return 2 * (k % 2 ? 1 : -1) / k * Math.sin(k * x); }, v: [-4.2, 4.2], n: "sawtooth = 2[sin x − sin 2x/2 + sin 3x/3 − …]" },
      tri: { f: function (x) { return Math.abs(sawf(x)); }, c0: PI / 2, term: function (k, x) { var m = 2 * k - 1; return -4 / (PI * m * m) * Math.cos(m * x); }, v: [-0.6, 3.9], n: "triangle = π/2 − (4/π)[cos x + cos 3x/9 + cos 5x/25 + …]" }
    };
    var key = "square", N = 3, show = true;
    select(W.controls, "wave ", [["square", "square"], ["saw", "sawtooth"], ["tri", "triangle"]], key, function (v) { key = v; W.draw(); });
    slider(W.controls, "terms N ", 1, 60, 1, N, function (v) { N = v; W.draw(); }, String);
    checkbox(W.controls, " show individual terms", true, function (v) { show = v; W.draw(); });
    W.draw = function () {
      var G = Wv[key];
      p.view(-2 * PI - 0.4, 2 * PI + 0.4, G.v[0], G.v[1]);
      p.clear(); p.axes({ xstep: PI, xfmt: piLabel });
      p.func(G.f, p.t.muted, 1.5, { dash: [5, 4] });
      if (show && N <= 10) for (var k = 1; k <= N; k++) (function (k) { p.func(function (x) { return G.term(k, x); }, alpha(SERIES[k % SERIES.length], 0.4), 1.2); })(k);
      p.func(function (x) { var s = G.c0; for (var k = 1; k <= N; k++) s += G.term(k, x); return s; }, C.orange, 2.4);
      W.say(G.n + "\nshowing the first " + N + " term" + (N > 1 ? "s" : ""));
    };
  });

  def("convex", "Convexity: the chord lies above the graph", "Drag the two points. For a convex function the chord never dips below the curve: f(tx + (1−t)y) ≤ t·f(x) + (1−t)·f(y). Try the non-convex ones to find a violation.", function (W) {
    var p = W.plot({ xmin: -2.6, xmax: 2.6, ymin: -1.6, ymax: 4.2 });
    var F = {
      sq: [function (x) { return x * x; }, "x² (convex)"], exp: [function (x) { return Math.exp(x) - 1; }, "eˣ − 1 (convex)"], abs: [Math.abs, "|x| (convex)"],
      w: [function (x) { return x * x * x * x - 2 * x * x; }, "x⁴ − 2x² (not convex)"], sin: [function (x) { return 1.5 * Math.sin(1.5 * x); }, "sine (not convex)"]
    };
    var key = "sq", x1 = -1.6, x2 = 1.3, t = 0.4;
    select(W.controls, "f(x) = ", Object.keys(F).map(function (k) { return [k, F[k][1]]; }), key, function (v) { key = v; W.draw(); });
    slider(W.controls, "t ", 0, 1, 0.01, t, function (v) { t = v; W.draw(); });
    draggable(p, function () { var f = F[key][0]; return [[x1, f(x1)], [x2, f(x2)]]; }, function (i, x) { x = clamp(x, -2.5, 2.5); if (i) x2 = x; else x1 = x; W.draw(); });
    W.draw = function () {
      var f = F[key][0], xm = t * x1 + (1 - t) * x2, ch = t * f(x1) + (1 - t) * f(x2), fv = f(xm), ok = fv <= ch + 1e-9;
      p.clear(); p.axes();
      p.func(f, p.t.fg, 2.5);
      p.line(x1, f(x1), x2, f(x2), C.orange, 2.2);
      p.line(xm, fv, xm, ch, ok ? C.green : C.red, 3);
      p.dot(xm, ch, 5, C.orange); p.dot(xm, fv, 5, ok ? C.green : C.red);
      p.dot(x1, f(x1), 7, C.blue); p.dot(x2, f(x2), 7, C.blue);
      W.say("f(tx + (1−t)y) = " + fmt(fv, 3) + "     t·f(x) + (1−t)·f(y) = " + fmt(ch, 3) + "     " + (ok ? "≤ ✓  curve below chord" : "> ✗  curve ABOVE chord: not convex"));
    };
  });

  def("distributions", "The distribution zoo", "Pick a distribution and move its parameters. The dashed line marks the mean; the readout shows mean and variance from the formulas.", function (W) {
    var p = W.plot({ aspect: 0.5 });
    function binom(k, n, q) { return Math.exp(lnfact(n) - lnfact(k) - lnfact(n - k)) * Math.pow(q, k) * Math.pow(1 - q, n - k); }
    var D = {
      bernoulli: { d: 1, ps: [["p", 0, 1, 0.01, 0.3]], f: function (k, a) { return k === 0 ? 1 - a[0] : k === 1 ? a[0] : 0; }, r: function () { return [0, 1]; }, m: function (a) { return a[0]; }, v: function (a) { return a[0] * (1 - a[0]); } },
      binomial: { d: 1, ps: [["n", 1, 60, 1, 10], ["p", 0, 1, 0.01, 0.4]], f: function (k, a) { return binom(k, a[0], a[1]); }, r: function (a) { return [0, a[0]]; }, m: function (a) { return a[0] * a[1]; }, v: function (a) { return a[0] * a[1] * (1 - a[1]); } },
      geometric: { d: 1, ps: [["p", 0.05, 1, 0.01, 0.3]], f: function (k, a) { return k >= 1 ? Math.pow(1 - a[0], k - 1) * a[0] : 0; }, r: function () { return [1, 30]; }, m: function (a) { return 1 / a[0]; }, v: function (a) { return (1 - a[0]) / (a[0] * a[0]); } },
      poisson: { d: 1, ps: [["λ", 0.1, 25, 0.1, 4]], f: function (k, a) { return Math.exp(-a[0] + k * Math.log(a[0]) - lnfact(k)); }, r: function () { return [0, 40]; }, m: function (a) { return a[0]; }, v: function (a) { return a[0]; } },
      uniform: { d: 0, ps: [["a", -5, 4, 0.1, -1], ["b", -4, 5, 0.1, 2]], f: function (x, a) { return a[1] > a[0] && x >= a[0] && x <= a[1] ? 1 / (a[1] - a[0]) : 0; }, r: function () { return [-6, 6]; }, m: function (a) { return (a[0] + a[1]) / 2; }, v: function (a) { return (a[1] - a[0]) * (a[1] - a[0]) / 12; } },
      normal: { d: 0, ps: [["μ", -4, 4, 0.1, 0], ["σ", 0.2, 4, 0.05, 1]], f: function (x, a) { return npdf(x, a[0], a[1]); }, r: function () { return [-9, 9]; }, m: function (a) { return a[0]; }, v: function (a) { return a[1] * a[1]; } },
      exponential: { d: 0, ps: [["λ", 0.2, 5, 0.05, 1]], f: function (x, a) { return x >= 0 ? a[0] * Math.exp(-a[0] * x) : 0; }, r: function () { return [-0.5, 8]; }, m: function (a) { return 1 / a[0]; }, v: function (a) { return 1 / (a[0] * a[0]); } }
    };
    var key = "binomial", args = [];
    var box = el("span"); box.style.display = "contents";
    select(W.controls, "distribution ", Object.keys(D).map(function (k) { return [k, k]; }), key, function (v) { key = v; build(); W.draw(); });
    W.controls.appendChild(box);
    function build() {
      box.innerHTML = ""; args = [];
      D[key].ps.forEach(function (ps, i) { args[i] = ps[4]; slider(box, ps[0] + " ", ps[1], ps[2], ps[3], ps[4], function (v) { args[i] = v; W.draw(); }, function (v) { return fmt(v, 2); }); });
    }
    build();
    W.draw = function () {
      var G = D[key], rg = G.r(args), top = 0, x, k;
      if (G.d) { for (k = rg[0]; k <= rg[1]; k++) top = Math.max(top, G.f(k, args)); p.view(rg[0] - 1, rg[1] + 1, 0, Math.max(0.05, top * 1.2)); }
      else { for (x = rg[0]; x <= rg[1]; x += (rg[1] - rg[0]) / 400) top = Math.max(top, G.f(x, args)); p.view(rg[0], rg[1], 0, Math.max(0.05, top * 1.2)); }
      p.clear(); p.axes();
      if (G.d) { for (k = rg[0]; k <= rg[1]; k++) { var y = G.f(k, args); p.rect(k - 0.35, 0, 0.7, y, alpha(C.blue, 0.5), C.blue, 1); } }
      else { p.fillFunc(function (x) { return G.f(x, args); }, alpha(C.blue, 0.2)); p.func(function (x) { return G.f(x, args); }, C.blue, 2.5); }
      var m = G.m(args), v = G.v(args);
      if (isFinite(m)) p.line(m, 0, m, p.ymax, C.orange, 2, [6, 4]);
      W.say((G.d ? "PMF (bars = P(X = k))" : "PDF (area = probability)") + "\nmean E[X] = " + fmt(m, 4) + "     variance Var(X) = " + fmt(v, 4) + "     std dev = " + fmt(Math.sqrt(v), 4) +
        (key === "uniform" && args[1] <= args[0] ? "\n(need a < b)" : ""));
    };
  });

  def("ode", "The damped harmonic oscillator", "x″ + 2ζω x′ + ω² x = 0, released from x = 1 at rest. ζ < 1 oscillates inside a decaying envelope, ζ = 1 (critical damping) returns fastest without overshoot, ζ > 1 creeps back. Right: the same motion in the phase plane (x, x′).", function (W) {
    var cells = W.row(2, 300);
    var pt = W.plot({ xmin: 0, xmax: 20, ymin: -1.2, ymax: 1.2, aspect: 0.6 }, cells[0]);
    var pp = W.plot({ xmin: -1.3, xmax: 1.3, ymin: -3.2, ymax: 3.2, aspect: 0.6 }, cells[1]);
    var z = 0.15, w = 1.5;
    slider(W.controls, "damping ζ ", 0, 2, 0.01, z, function (v) { z = v; W.draw(); });
    slider(W.controls, "natural frequency ω ", 0.5, 3, 0.05, w, function (v) { w = v; W.draw(); });
    W.draw = function () {
      var x = 1, v = 0, dt = 0.01, X = [[0, 1]], V = [[1, 0]];
      function acc(x, v) { return -2 * z * w * v - w * w * x; }
      for (var t = 0; t < 20; t += dt) {
        var k1x = v, k1v = acc(x, v), k2x = v + dt / 2 * k1v, k2v = acc(x + dt / 2 * k1x, v + dt / 2 * k1v);
        var k3x = v + dt / 2 * k2v, k3v = acc(x + dt / 2 * k2x, v + dt / 2 * k2v), k4x = v + dt * k3v, k4v = acc(x + dt * k3x, v + dt * k3v);
        x += dt / 6 * (k1x + 2 * k2x + 2 * k3x + k4x); v += dt / 6 * (k1v + 2 * k2v + 2 * k3v + k4v);
        X.push([t + dt, x]); V.push([x, v]);
      }
      pt.clear(); pt.axes({ ystep: 0.5 });
      if (z < 1) { pt.func(function (t) { return Math.exp(-z * w * t); }, pt.t.muted, 1.2, { dash: [4, 4], from: 0 }); pt.func(function (t) { return -Math.exp(-z * w * t); }, pt.t.muted, 1.2, { dash: [4, 4], from: 0 }); }
      pt.path(X, C.blue, 2.2);
      pp.clear(); pp.axes({ xstep: 0.5, ystep: 1 });
      pp.path(V, C.purple, 2); pp.dot(1, 0, 5, C.purple);
      var regime = z < 1 ? (z === 0 ? "undamped: oscillates forever" : "underdamped: decaying oscillation") : Math.abs(z - 1) < 0.005 ? "critically damped" : "overdamped";
      var roots = z < 1 ? "r = " + fmt(-z * w, 3) + " ± " + fmt(w * Math.sqrt(1 - z * z), 3) + "i" : "r = " + fmt(-z * w + w * Math.sqrt(z * z - 1), 3) + ", " + fmt(-z * w - w * Math.sqrt(z * z - 1), 3);
      W.say(regime + "\ncharacteristic equation r² + 2ζωr + ω² = 0  →  " + roots);
    };
  });

  def("growth", "How fast do common running times grow?", "Slide n up. On a linear axis n³ and 2ⁿ leave the chart almost instantly. Switch on the log scale: polynomials flatten out, while 2ⁿ stays a steep straight line.", function (W) {
    var p = W.plot({ aspect: 0.55 });
    var nmax = 20, logy = false;
    var fs = [["log₂ n", function (n) { return Math.log2(n); }, function (n) { return Math.log10(Math.log2(n)); }, C.gray],
      ["n", function (n) { return n; }, function (n) { return Math.log10(n); }, C.blue],
      ["n log₂ n", function (n) { return n * Math.log2(n); }, function (n) { return Math.log10(n * Math.log2(n)); }, C.green],
      ["n²", function (n) { return n * n; }, function (n) { return 2 * Math.log10(n); }, C.orange],
      ["n³", function (n) { return n * n * n; }, function (n) { return 3 * Math.log10(n); }, C.red],
      ["2ⁿ", function (n) { return Math.pow(2, n); }, function (n) { return n * Math.LOG10E * Math.LN2; }, C.purple]];
    slider(W.controls, "n up to ", 0.7, 3, 0.01, Math.log10(20), function (v) { nmax = Math.round(Math.pow(10, v)); W.draw(); }, function (v) { return String(Math.round(Math.pow(10, v))); });
    checkbox(W.controls, " log scale", false, function (v) { logy = v; W.draw(); });
    W.draw = function () {
      if (logy) { var top = fs[5][2](nmax); p.view(0, nmax * 1.08, -0.5, top * 1.08); }
      else p.view(0, nmax * 1.08, -0.05 * nmax * nmax, nmax * nmax * 1.1);
      p.clear(); p.axes(logy ? { yfmt: function (y) { return "10" + sup(Math.round(y)); }, ystep: niceStep((p.ymax + 0.5) / 6) } : {});
      fs.forEach(function (f) {
        p.func(logy ? f[2] : f[1], f[3], 2.4, { from: 1, to: nmax });
        var yv = logy ? f[2](nmax) : f[1](nmax);
        if (yv < p.ymax) p.text(f[0], nmax, yv, f[3], { dx: 4, bold: true });
      });
      W.say("at n = " + nmax + ":   " + fs.map(function (f) { var v = f[1](nmax); return f[0] + " = " + (isFinite(v) ? (v < 1e7 ? fmt(v, 1) : v.toExponential(2)) : "≈ 10^" + Math.round(f[2](nmax))); }).join("   "));
    };
  });

  def("lagrange", "Lagrange multipliers: at the optimum the gradients are parallel", "Move the point around the constraint ellipse x²/4 + y² = 1 and watch f = x + y. At the maximum, the level line of f just touches the ellipse, so ∇f (orange) and ∇g (blue) point the same way.", function (W) {
    var p = W.plot({ xmin: -3.2, xmax: 3.2, ymin: -2, ymax: 2, equal: true, aspect: 0.6 });
    var s = 60;
    var sl = slider(W.controls, "position on ellipse ", 0, 360, 1, s, function (v) { s = v; W.draw(); }, function (v) { return v + "°"; });
    var anim = animator(function (dt) { s = (s + dt * 40) % 360; sl.set(Math.round(s)); W.draw(); });
    playButton(W.controls, anim);
    W.draw = function () {
      var t = s * PI / 180, x = 2 * Math.cos(t), y = Math.sin(t), f = x + y;
      p.clear(); p.axes();
      for (var c = -4; c <= 4; c += 0.5) p.infLine(c, 0, 1, -1, p.t.faint, 1);
      p.infLine(x, y, 1, -1, alpha(C.orange, 0.8), 1.8, [6, 4]);
      var e = []; for (var k = 0; k <= 120; k++) e.push([2 * Math.cos(2 * PI * k / 120), Math.sin(2 * PI * k / 120)]);
      p.path(e, C.blue, 2.4);
      var r5 = Math.sqrt(5);
      p.dot(4 / r5, 1 / r5, 6, C.green, true); p.dot(-4 / r5, -1 / r5, 6, C.red, true);
      var gf = [1, 1], gg = [x / 2, 2 * y], nf = Math.hypot(gf[0], gf[1]), ng = Math.hypot(gg[0], gg[1]);
      p.arrow(x, y, x + 0.8 * gf[0] / nf, y + 0.8 * gf[1] / nf, C.orange, 3);
      p.arrow(x, y, x + 0.8 * gg[0] / ng, y + 0.8 * gg[1] / ng, C.blue, 3);
      p.dot(x, y, 5, p.t.fg);
      var ang = Math.acos(clamp((gf[0] * gg[0] + gf[1] * gg[1]) / (nf * ng), -1, 1)) * 180 / PI;
      W.say("point (" + fmt(x, 3) + ", " + fmt(y, 3) + ")   f = x + y = " + fmt(f, 4) + "\nangle between ∇f and ∇g = " + fmt(ang, 1) + "°" +
        "\nmax f = √5 ≈ 2.2361 at (4/√5, 1/√5) (green), min f = −√5 (red): there ∇f = λ∇g");
    };
  });

  def("newton", "Newton's method: follow the tangent down to the axis", "Drag the starting point x₀ along the axis. Most starts converge in a handful of steps. Start near 0 and the method falls into a 2-cycle forever.", function (W) {
    var p = W.plot({ xmin: -3, xmax: 3, ymin: -5, ymax: 8 });
    var f = function (x) { return x * x * x - 2 * x + 2; }, df = function (x) { return 3 * x * x - 2; };
    var x0 = -2.6, steps = 5;
    slider(W.controls, "steps ", 1, 12, 1, steps, function (v) { steps = v; W.draw(); }, String);
    draggable(p, function () { return [[x0, 0]]; }, function (i, x) { x0 = clamp(x, -2.9, 2.9); W.draw(); });
    W.draw = function () {
      p.clear(); p.axes();
      p.func(f, p.t.fg, 2.5);
      var x = x0, xs = [x0];
      for (var k = 0; k < steps; k++) {
        var y = f(x), d = df(x); if (Math.abs(d) < 1e-9) break;
        var xn = x - y / d;
        p.line(x, 0, x, y, C.gray, 1, [3, 3]);
        p.line(x, y, xn, 0, alpha(C.orange, 0.9), 1.8);
        p.dot(x, y, 3.5, C.orange);
        x = xn; xs.push(x);
      }
      p.dot(-1.76929, 0, 5, C.green, true);
      p.dot(x0, 0, 7, C.blue);
      W.say("f(x) = x³ − 2x + 2,   xₖ₊₁ = xₖ − f(xₖ)/f′(xₖ)\niterates: " + xs.map(function (v) { return fmt(v, 6); }).join(" → ") + "\ntrue root ≈ −1.769292 (green)");
    };
  });

  def("huffman", "Huffman coding: short codes for common symbols", "Type any text. The table shows each symbol's optimal prefix-free code. The average code length L always satisfies H ≤ L < H + 1.", function (W) {
    var ta = el("textarea"); ta.value = "abracadabra! a banana bandana";
    ta.style.cssText = "width:100%;min-height:3.2rem;font:inherit;font-family:var(--md-code-font-family);font-size:.75rem;padding:.4rem;border-radius:.3rem;border:1px solid var(--md-default-fg-color--lighter);background:var(--md-default-bg-color);color:var(--md-default-fg-color);box-sizing:border-box";
    var out = el("div"); out.style.overflowX = "auto";
    W.holder.appendChild(ta); W.holder.appendChild(out);
    ta.addEventListener("input", function () { W.draw(); });
    W.draw = function () {
      var s = ta.value, cnt = {};
      for (var i = 0; i < s.length; i++) cnt[s[i]] = (cnt[s[i]] || 0) + 1;
      var syms = Object.keys(cnt);
      if (!syms.length) { out.textContent = ""; W.say("type something"); return; }
      var nodes = syms.map(function (c) { return { w: cnt[c], sym: c }; }), codes = {};
      while (nodes.length > 1) {
        nodes.sort(function (a, b) { return a.w - b.w; });
        var a = nodes.shift(), b = nodes.shift(); nodes.push({ w: a.w + b.w, l: a, r: b });
      }
      (function walk(n, code) { if (n.sym != null) { codes[n.sym] = code || "0"; return; } walk(n.l, code + "0"); walk(n.r, code + "1"); })(nodes[0], "");
      var N = s.length, H = 0, L = 0;
      syms.sort(function (a, b) { return cnt[b] - cnt[a]; });
      var rows = syms.map(function (c) { var q = cnt[c] / N; H -= q * Math.log2(q); L += q * codes[c].length; return "<tr><td><code>" + (c === " " ? "␣" : c.replace(/&/g, "&amp;").replace(/</g, "&lt;")) + "</code></td><td>" + cnt[c] + "</td><td>" + fmt(q, 3) + "</td><td>" + fmt(-Math.log2(q), 2) + "</td><td><code>" + codes[c] + "</code></td></tr>"; });
      out.innerHTML = "<table><thead><tr><th>symbol</th><th>count</th><th>p</th><th>log₂(1/p)</th><th>Huffman code</th></tr></thead><tbody>" + rows.join("") + "</tbody></table>";
      W.say(syms.length + " distinct symbols, " + N + " characters\nentropy H = " + fmt(H, 4) + " bits/symbol    Huffman average L = " + fmt(L, 4) + " bits/symbol    fixed-length code = " + Math.max(1, Math.ceil(Math.log2(syms.length))) + " bits/symbol" +
        "\ntotal: " + Math.round(L * N) + " bits with Huffman vs " + 8 * N + " bits as 8-bit ASCII");
    };
  });

  function solve(A, b) {
    var n = b.length, M = A.map(function (r, i) { return r.concat([b[i]]); });
    for (var c = 0; c < n; c++) {
      var piv = c; for (var r = c + 1; r < n; r++) if (Math.abs(M[r][c]) > Math.abs(M[piv][c])) piv = r;
      var tmp = M[c]; M[c] = M[piv]; M[piv] = tmp;
      if (Math.abs(M[c][c]) < 1e-14) M[c][c] = 1e-14;
      for (r = c + 1; r < n; r++) { var f = M[r][c] / M[c][c]; for (var k = c; k <= n; k++) M[r][k] -= f * M[c][k]; }
    }
    var x = new Array(n);
    for (var i = n - 1; i >= 0; i--) { var s = M[i][n]; for (var j = i + 1; j < n; j++) s -= M[i][j] * x[j]; x[i] = s / M[i][i]; }
    return x;
  }

  def("polyfit", "Underfitting vs overfitting", "Blue: training data. Orange rings: fresh test data from the same process. Raise the degree: training error keeps falling, but test error falls then rises (overfitting). Then raise the ridge penalty λ to tame a high-degree fit.", function (W) {
    var p = W.plot({ xmin: -1.1, xmax: 1.1, ymin: -2.2, ymax: 2.2, aspect: 0.55 });
    var truth = function (x) { return Math.sin(2.5 * x) + 0.3 * x; }, deg = 3, lam = 0, seed = 11, tr, te;
    function gen() {
      var R = rng(seed++); tr = []; te = [];
      for (var i = 0; i < 14; i++) { var x = -1 + 2 * (i + 0.5) / 14 + (R() - 0.5) * 0.08; tr.push([x, truth(x) + 0.3 * gauss(R)]); }
      for (i = 0; i < 60; i++) { x = -1 + 2 * R(); te.push([x, truth(x) + 0.3 * gauss(R)]); }
    }
    gen();
    slider(W.controls, "degree ", 0, 13, 1, deg, function (v) { deg = v; W.draw(); }, String);
    slider(W.controls, "ridge λ ", -8, 1, 0.1, -8, function (v) { lam = v <= -7.95 ? 0 : Math.pow(10, v); W.draw(); }, function (v) { return v <= -7.95 ? "0" : fmt(Math.pow(10, v), 4); });
    button(W.controls, "New data", function () { gen(); W.draw(); });
    W.draw = function () {
      var d = deg + 1, A = [], b = [], i, j;
      for (i = 0; i < d; i++) { A.push(new Array(d).fill(0)); b.push(0); }
      tr.forEach(function (q) { var ph = []; for (var k = 0; k < d; k++) ph.push(Math.pow(q[0], k)); for (i = 0; i < d; i++) { b[i] += ph[i] * q[1]; for (j = 0; j < d; j++) A[i][j] += ph[i] * ph[j]; } });
      for (i = 1; i < d; i++) A[i][i] += lam + 1e-10;
      var w = solve(A, b), fit = function (x) { var s = 0, xp = 1; for (var k = 0; k < d; k++) { s += w[k] * xp; xp *= x; } return s; };
      function mse(D) { var s = 0; D.forEach(function (q) { var r = fit(q[0]) - q[1]; s += r * r; }); return s / D.length; }
      p.clear(); p.axes();
      p.func(truth, p.t.muted, 1.5, { dash: [5, 4] });
      te.forEach(function (q) { p.dot(q[0], q[1], 3, C.orange, true); });
      p.func(fit, C.purple, 2.6, { from: -1.05, to: 1.05 });
      tr.forEach(function (q) { p.dot(q[0], q[1], 5, C.blue); });
      W.say("degree " + deg + ",  λ = " + (lam ? fmt(lam, 5) : "0") + "\ntraining MSE = " + fmt(mse(tr), 4) + "     test MSE = " + fmt(mse(te), 4) + "     (noise level σ² = 0.09)");
    };
  });

  def("mle", "Likelihood, prior and posterior for a coin's bias", "Blue: likelihood of the data (k heads in n flips) as a function of the bias θ. Gray dashed: the Beta(α, β) prior. Orange: the posterior ∝ likelihood × prior. With few flips the prior matters; with many, the data wins.", function (W) {
    var p = W.plot({ xmin: -0.02, xmax: 1.02, ymin: 0, ymax: 1.15, aspect: 0.5 });
    var n = 10, k = 7, a = 2, b = 2;
    var ks;
    slider(W.controls, "flips n ", 0, 200, 1, n, function (v) { n = v; ks.el.max = n; if (k > n) { k = n; } ks.set(k); W.draw(); }, String);
    ks = slider(W.controls, "heads k ", 0, n, 1, k, function (v) { k = v; W.draw(); }, String);
    slider(W.controls, "prior α ", 1, 30, 0.5, a, function (v) { a = v; W.draw(); }, function (v) { return fmt(v, 1); });
    slider(W.controls, "prior β ", 1, 30, 0.5, b, function (v) { b = v; W.draw(); }, function (v) { return fmt(v, 1); });
    function xlog(c, v) { return c === 0 ? 0 : c * Math.log(v); }
    function curve(f) {
      var xs = [], m = -Infinity, i;
      for (i = 0; i <= 400; i++) { var t = 0.0005 + 0.999 * i / 400, v = f(t); xs.push([t, v]); if (v > m) m = v; }
      return xs.map(function (q) { return [q[0], Math.exp(q[1] - m)]; });
    }
    W.draw = function () {
      p.clear(); p.axes({ xstep: 0.1, ystep: 0.25 });
      p.path(curve(function (t) { return xlog(a - 1, t) + xlog(b - 1, 1 - t); }), p.t.muted, 2, [6, 4]);
      p.path(curve(function (t) { return xlog(k, t) + xlog(n - k, 1 - t); }), C.blue, 2.4);
      p.path(curve(function (t) { return xlog(k + a - 1, t) + xlog(n - k + b - 1, 1 - t); }), C.orange, 2.6);
      var mle = n ? k / n : NaN, map = (k + a - 1) / (n + a + b - 2), pm = (k + a) / (n + a + b);
      if (n) p.line(mle, 0, mle, 1, alpha(C.blue, 0.6), 1, [3, 3]);
      W.say("curves scaled to height 1\nMLE θ̂ = k/n = " + (n ? fmt(mle, 4) : "undefined (no data)") + "     MAP = (k+α−1)/(n+α+β−2) = " + (isFinite(map) ? fmt(map, 4) : "any (flat)") + "     posterior mean = (k+α)/(n+α+β) = " + fmt(pm, 4));
    };
  });

  /* ------------------------------------------------------------- startup */
  function start() {
    scan();
    if (window.MutationObserver) new MutationObserver(function () { MOUNTED.forEach(function (W) { W.draw(); }); })
      .observe(document.body, { attributes: true, attributeFilter: ["data-md-color-scheme"] });
  }
  if (window.document$ && window.document$.subscribe) window.document$.subscribe(scan);
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
})();
