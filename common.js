/* ===================================================================
   common.js — The PDF Mechanic
   Shared boilerplate used identically across every tool page:
   theme toggle, footer year, and service worker registration.
   Loaded with `defer`, so it runs after the DOM is parsed but never
   blocks rendering. Each tool's own conversion logic stays in that
   tool's own page — this file only holds what every page repeats.
   =================================================================== */

(function () {
  function initThemeToggle() {
    var themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    var htmlEl = document.documentElement;
    themeToggle.addEventListener('click', function () {
      htmlEl.classList.toggle('dark');
      try {
        localStorage.setItem('theme', htmlEl.classList.contains('dark') ? 'dark' : 'light');
      } catch (e) {}
    });
  }

  function initFooterYear() {
    var yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  function initServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function () {
        navigator.serviceWorker.register('/sw.js').then(
          function (registration) {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
          },
          function (err) {
            console.log('ServiceWorker registration failed: ', err);
          }
        );
      });
    }
  }

  initThemeToggle();
  initFooterYear();
  initServiceWorker();
})();
