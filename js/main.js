(function () {
  var nav = document.getElementById('nav');
  var toggle = document.querySelector('.nav__toggle');
  var links = document.getElementById('nav-links');
  var words = document.querySelectorAll('.word-swap__word');

  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = document.body.classList.toggle('is-menu-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    });

    links.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        document.body.classList.remove('is-menu-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Abrir menú');
      });
    });
  }

  var sections = document.querySelectorAll('main section[id]');
  var navAnchors = links ? links.querySelectorAll('a') : [];

  function setActive() {
    var current = 'inicio';
    sections.forEach(function (section) {
      if (window.scrollY >= section.offsetTop - 140) {
        current = section.id;
      }
    });
    navAnchors.forEach(function (anchor) {
      var href = anchor.getAttribute('href') || '';
      anchor.classList.toggle('is-active', href === '#' + current);
    });
  }

  window.addEventListener('scroll', setActive, { passive: true });
  setActive();

  if (nav) {
    window.addEventListener(
      'scroll',
      function () {
        nav.classList.toggle('is-scrolled', window.scrollY > 8);
      },
      { passive: true }
    );
  }

  if (words.length > 1 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var index = 0;
    setInterval(function () {
      words[index].classList.remove('is-active');
      index = (index + 1) % words.length;
      words[index].classList.add('is-active');
    }, 2200);
  }

  var why = document.querySelector('.accordion');
  if (why) {
    why.addEventListener('toggle', function (event) {
      if (!event.target.open) return;
      why.querySelectorAll('details').forEach(function (item) {
        if (item !== event.target) item.open = false;
      });
    }, true);
  }
})();
