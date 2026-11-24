// Lesson progress, stored only in this browser (localStorage).
(function () {
  var KEY = "am-progress-v1";
  var LESSON_DIRS = ["foundations", "calculus", "linear-algebra", "multivariable", "probability",
    "statistics", "optimization", "information-theory", "discrete", "further"];

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY) || "{}") || {}; } catch (e) { return {}; }
  }
  function save(s) {
    try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) { /* storage blocked */ }
  }
  // Turn any URL into a stable key like "calculus/limits"
  function keyOf(href) {
    var a = document.createElement("a");
    a.href = href;
    var parts = a.pathname.replace(/\/index\.html$/, "/").replace(/\.html$/, "/").split("/").filter(Boolean);
    for (var i = 0; i < parts.length; i++) {
      if (LESSON_DIRS.indexOf(parts[i]) >= 0 && parts[i + 1]) return parts[i] + "/" + parts[i + 1];
    }
    return null;
  }

  function addButton() {
    var key = keyOf(location.href);
    var content = document.querySelector(".md-content__inner");
    if (!key || !content || content.querySelector(".lesson-done-bar")) return;
    var bar = document.createElement("div");
    bar.className = "lesson-done-bar";
    var btn = document.createElement("button");
    var note = document.createElement("span");
    function paint() {
      var done = !!load()[key];
      btn.className = done ? "done" : "";
      btn.textContent = done ? "✓ Lesson complete" : "Mark lesson complete";
      note.textContent = done ? "Nice. Come back in a few days and redo the exercises from memory."
        : "Did the exercises without peeking? Then you own this lesson.";
    }
    btn.addEventListener("click", function () {
      var s = load();
      if (s[key]) delete s[key]; else s[key] = Date.now();
      save(s); paint();
    });
    bar.appendChild(btn); bar.appendChild(note);
    content.appendChild(bar);
    paint();
  }

  function paintLists() {
    var s = load();
    var lists = document.querySelectorAll(".progress-list");
    var total = 0, done = 0;
    lists.forEach(function (list) {
      list.querySelectorAll("a[href]").forEach(function (a) {
        var k = keyOf(a.href);
        if (!k) return;
        total++;
        if (s[k]) { done++; a.classList.add("is-done"); } else a.classList.remove("is-done");
      });
    });
    var meter = document.querySelector(".progress-meter > div");
    var label = document.querySelector(".progress-label");
    if (meter && total) meter.style.width = (100 * done / total).toFixed(1) + "%";
    if (label && total) label.textContent = done + " of " + total + " lessons complete";
  }

  function run() { addButton(); paintLists(); }
  if (window.document$ && window.document$.subscribe) window.document$.subscribe(run);
  else if (document.readyState !== "loading") run();
  else document.addEventListener("DOMContentLoaded", run);
})();
