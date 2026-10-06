(function () {
  var root = document.documentElement;
  var toggle = document.getElementById("toggle");
  var entriesEl = document.getElementById("entries");
  var emptyEl = document.getElementById("empty");
  var searchEl = document.getElementById("search");
  var filterBtns = document.querySelectorAll(".filter");
  var checklistEl = document.getElementById("checklist");

  var groupNames = { places: "place", past: "his past", habits: "habit", people: "people" };
  var activeGroup = "all";

  // ---------- Glasses on / off ----------
  function setMode(mode) {
    root.setAttribute("data-mode", mode);
    toggle.setAttribute("aria-pressed", mode === "off" ? "true" : "false");
    try { localStorage.setItem("lucien-mode", mode); } catch (e) {}
  }

  toggle.addEventListener("click", function () {
    var next = root.getAttribute("data-mode") === "on" ? "off" : "on";
    if (next === "off") {
      root.classList.remove("flicker");
      void root.offsetWidth; // restart the animation
      root.classList.add("flicker");
    }
    setMode(next);
  });

  try {
    var saved = localStorage.getItem("lucien-mode");
    if (saved === "on" || saved === "off") setMode(saved);
  } catch (e) {}

  // ---------- Checklist ----------
  CHECKLIST.forEach(function (c, i) {
    var li = document.createElement("li");
    if (c.failed) li.className = "failed";
    var id = "check-" + i;
    li.innerHTML =
      '<input type="checkbox" id="' + id + '"' + (c.done ? " checked" : "") + (c.failed ? " disabled" : "") + ">" +
      '<label for="' + id + '"><span class="item"></span></label>' +
      (c.note ? '<span class="note"></span>' : "");
    li.querySelector(".item").textContent = c.item;
    if (c.note) li.querySelector(".note").textContent = c.note;
    checklistEl.appendChild(li);
  });

  // ---------- Lore ----------
  function render() {
    var q = searchEl.value.trim().toLowerCase();
    var shown = 0;
    entriesEl.innerHTML = "";

    LORE.forEach(function (e) {
      if (activeGroup !== "all" && e.group !== activeGroup) return;
      if (q && (e.title + " " + e.text).toLowerCase().indexOf(q) === -1) return;
      shown++;

      var art = document.createElement("article");
      art.className = "entry" + (e.secret ? " secret" : "");

      var tag = document.createElement("span");
      tag.className = "tag";
      tag.textContent = groupNames[e.group];

      var h3 = document.createElement("h3");
      h3.textContent = e.title;

      var p = document.createElement("p");
      p.className = "entry-text";
      p.textContent = e.text;

      art.appendChild(tag);
      art.appendChild(h3);
      art.appendChild(p);

      if (e.secret) {
        var lock = document.createElement("p");
        lock.className = "lock";
        lock.textContent = "Take his glasses off to read this one.";
        art.appendChild(lock);
      }
      entriesEl.appendChild(art);
    });

    emptyEl.hidden = shown !== 0;
  }

  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      activeGroup = btn.getAttribute("data-group");
      filterBtns.forEach(function (b) {
        var on = b === btn;
        b.classList.toggle("is-active", on);
        b.setAttribute("aria-pressed", on ? "true" : "false");
      });
      render();
    });
  });

  searchEl.addEventListener("input", render);
  render();
})();
