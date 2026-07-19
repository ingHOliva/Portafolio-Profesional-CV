(function () {
  "use strict";

  var tabButtons = Array.prototype.slice.call(document.querySelectorAll(".tab-btn"));
  var panels = Array.prototype.slice.call(document.querySelectorAll(".panel"));
  var navToggle = document.getElementById("navToggle");
  var tabNav = document.getElementById("tabNav");

  function activateTab(tabName, updateHash) {
    var found = false;

    tabButtons.forEach(function (btn) {
      var isMatch = btn.getAttribute("data-tab") === tabName;
      btn.setAttribute("aria-selected", isMatch ? "true" : "false");
      if (isMatch) found = true;
    });

    if (!found) return; // Unknown tab name: do nothing (keeps current state safe)

    panels.forEach(function (panel) {
      var panelTab = panel.id.replace("panel-", "");
      if (panelTab === tabName) {
        panel.hidden = false;
      } else {
        panel.hidden = true;
      }
    });

    if (updateHash !== false) {
      history.replaceState(null, "", "#" + tabName);
    }

    // Move focus to the panel heading for keyboard/screen-reader users
    var activePanel = document.getElementById("panel-" + tabName);
    if (activePanel) {
      var heading = activePanel.querySelector("h1, h2");
      if (heading) {
        heading.setAttribute("tabindex", "-1");
        heading.focus({ preventScroll: false });
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // Close mobile menu after selecting a tab
    if (tabNav && tabNav.classList.contains("open")) {
      tabNav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  }

  tabButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      activateTab(btn.getAttribute("data-tab"), true);
    });
  });

  // Buttons inside content that link to another tab (e.g. "Ver SENNOVA 2024")
  Array.prototype.slice.call(document.querySelectorAll("[data-goto]")).forEach(function (el) {
    el.addEventListener("click", function () {
      activateTab(el.getAttribute("data-goto"), true);
    });
  });

  // Mobile menu toggle
  if (navToggle && tabNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = tabNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  // Deep-link support: open the tab indicated by the URL hash on load
  function tabFromHash() {
    var hash = window.location.hash.replace("#", "");
    return hash || "inicio";
  }

  window.addEventListener("hashchange", function () {
    activateTab(tabFromHash(), false);
  });

  activateTab(tabFromHash(), false);

  // Footer year
  var yearEl = document.getElementById("footYear");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();
