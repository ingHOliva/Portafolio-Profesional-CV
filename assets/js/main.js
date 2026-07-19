(function () {
  "use strict";

  var tabButtons = Array.prototype.slice.call(document.querySelectorAll(".tab-btn"));
  var inicioPanel = document.getElementById("panel-inicio");
  var dynamicPanel = document.getElementById("panel-dynamic");
  var navToggle = document.getElementById("navToggle");
  var tabNav = document.getElementById("tabNav");

  var cache = {}; // Evita volver a pedir el mismo archivo si el usuario regresa a una pestaña

  function setSelectedButton(tabName) {
    tabButtons.forEach(function (btn) {
      btn.setAttribute("aria-selected", btn.getAttribute("data-tab") === tabName ? "true" : "false");
    });
  }

  function focusAndScroll(container) {
    var heading = container.querySelector("h1, h2");
    if (heading) {
      heading.setAttribute("tabindex", "-1");
      heading.focus({ preventScroll: false });
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function closeMobileMenu() {
    if (tabNav && tabNav.classList.contains("open")) {
      tabNav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  }

  function showInicio() {
    inicioPanel.hidden = false;
    dynamicPanel.hidden = true;
    focusAndScroll(inicioPanel);
  }

  function showDynamic(tabName) {
    inicioPanel.hidden = true;
    dynamicPanel.hidden = false;
    dynamicPanel.setAttribute("aria-labelledby", "tabbtn-" + tabName);

    if (cache[tabName]) {
      dynamicPanel.innerHTML = cache[tabName];
      focusAndScroll(dynamicPanel);
      return;
    }

    dynamicPanel.innerHTML = '<p class="loading-msg">Cargando contenido…</p>';

    fetch("pages/" + tabName + ".html")
      .then(function (res) {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.text();
      })
      .then(function (html) {
        cache[tabName] = html;
        dynamicPanel.innerHTML = html;
        focusAndScroll(dynamicPanel);
      })
      .catch(function () {
        dynamicPanel.innerHTML =
          '<p class="error-msg">No se pudo cargar esta sección. ' +
          'Verifica tu conexión e intenta de nuevo. ' +
          '<button class="link-btn" data-retry="' + tabName + '">Reintentar</button></p>';
      });
  }

  function activateTab(tabName, updateHash) {
    var known = tabButtons.some(function (btn) {
      return btn.getAttribute("data-tab") === tabName;
    });
    if (!known) tabName = "inicio";

    setSelectedButton(tabName);

    if (tabName === "inicio") {
      showInicio();
    } else {
      showDynamic(tabName);
    }

    if (updateHash !== false) {
      history.replaceState(null, "", "#" + tabName);
    }

    closeMobileMenu();
  }

  tabButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      activateTab(btn.getAttribute("data-tab"), true);
    });
  });

  // Delegación de eventos: botones "ir a" (data-goto) y "reintentar" (data-retry),
  // incluidos los que llegan dentro del HTML cargado dinámicamente.
  document.addEventListener("click", function (e) {
    var goto = e.target.closest("[data-goto]");
    if (goto) {
      activateTab(goto.getAttribute("data-goto"), true);
      return;
    }
    var retry = e.target.closest("[data-retry]");
    if (retry) {
      var tab = retry.getAttribute("data-retry");
      delete cache[tab];
      showDynamic(tab);
    }
  });

  if (navToggle && tabNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = tabNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  function tabFromHash() {
    var hash = window.location.hash.replace("#", "");
    return hash || "inicio";
  }

  window.addEventListener("hashchange", function () {
    activateTab(tabFromHash(), false);
  });

  activateTab(tabFromHash(), false);

  var yearEl = document.getElementById("footYear");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();
