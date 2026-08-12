// EXTASIS — nav behavior: mobile menu toggle, scroll shadow, scrollspy.
// Plain DOM APIs only, no dependencies.

(function () {
  var nav = document.getElementById("nav");
  var toggle = document.getElementById("nav-toggle");
  var mobileMenu = document.getElementById("nav-mobile-menu");

  // --- mobile menu toggle ---------------------------------------------
  function setMenuOpen(open) {
    mobileMenu.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  }

  toggle.addEventListener("click", function () {
    setMenuOpen(!mobileMenu.classList.contains("is-open"));
  });

  mobileMenu.querySelectorAll("[data-close-menu]").forEach(function (link) {
    link.addEventListener("click", function () {
      setMenuOpen(false);
    });
  });

  // --- scroll shadow ----------------------------------------------------
  function onScroll() {
    nav.classList.toggle("nav--scrolled", window.scrollY > 24);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // --- scrollspy ----------------------------------------------------------
  var desktopLinks = document.querySelectorAll(".nav__link[data-nav-link]");
  var sections = Array.prototype.slice
    .call(desktopLinks)
    .map(function (link) {
      return document.getElementById(link.getAttribute("href").slice(1));
    })
    .filter(Boolean);

  function setActiveSection(id) {
    desktopLinks.forEach(function (link) {
      var isActive = link.getAttribute("href").slice(1) === id;
      link.classList.toggle("nav__link--active", isActive);
    });
  }

  var observer = new IntersectionObserver(
    function (entries) {
      var visible = entries.filter(function (entry) {
        return entry.isIntersecting;
      });
      if (visible.length === 0) return;
      var topMost = visible.reduce(function (a, b) {
        return a.boundingClientRect.top < b.boundingClientRect.top ? a : b;
      });
      setActiveSection(topMost.target.id);
    },
    { rootMargin: "-96px 0px -70% 0px", threshold: 0 },
  );

  sections.forEach(function (section) {
    observer.observe(section);
  });
})();
